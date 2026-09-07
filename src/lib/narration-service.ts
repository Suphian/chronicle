import { createHash } from "node:crypto";
import type { Chapter } from "../content/types";
import { getNarrationPassages, narrationPassageSource, narrationRequestHash, providerInputs, NARRATION_FORMAT, NARRATION_MODEL, type NarrationPassage } from "./narration-passages.ts";

export class NarrationError extends Error {
  status: number;
  constructor(status: number, message: string) { super(message); this.status = status; }
}

export interface CachedNarration {
  audio: string;
  generatedAt: string;
  tier: string;
  characters: number;
  model: string;
  voiceIds: string[];
}

export type AudioCache = (key: string, generate: () => Promise<CachedNarration>) => Promise<CachedNarration>;
type Dependencies = {
  chapter: (slug: string) => Chapter | undefined;
  cache: AudioCache;
  apiKey: () => string | undefined;
  fetch?: typeof fetch;
  now?: () => number;
};

interface SharedNarration {
  promise: Promise<CachedNarration>;
  controller: AbortController;
  subscribers: number;
  settled: boolean;
}

/** A canceled listener detaches immediately; another listener may still need the recording. */
function subscribeToNarration(work: SharedNarration, signal: AbortSignal, onEmpty: () => void): Promise<CachedNarration> {
  work.subscribers++;
  return new Promise((resolve, reject) => {
    let finished = false;
    const finish = (result?: CachedNarration, error?: unknown) => {
      if (finished) return;
      finished = true;
      signal.removeEventListener("abort", cancel);
      work.subscribers--;
      if (!work.subscribers && !work.settled) {
        onEmpty();
        work.controller.abort();
      }
      if (error !== undefined) reject(error);
      else resolve(result!);
    };
    const cancel = () => finish(undefined, new DOMException("Playback canceled", "AbortError"));
    work.promise.then((result) => finish(result), (error) => finish(undefined, error));
    signal.addEventListener("abort", cancel, { once: true });
    if (signal.aborted) cancel();
  });
}

const digest = (text: string) => createHash("sha256").update(text).digest("hex");

async function smallJson(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new NarrationError(415, "Use a JSON narration request.");
  const reader = request.body?.getReader();
  if (!reader) throw new NarrationError(400, "Choose a chapter passage.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 512) { await reader.cancel(); throw new NarrationError(413, "Narration requests contain only a chapter and passage reference."); }
    chunks.push(value);
  }
  try {
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || Array.isArray(body) || typeof body !== "object") throw new Error();
    return body;
  } catch { throw new NarrationError(400, "Choose a valid chapter passage."); }
}

async function providerAudio(passage: NarrationPassage, apiKey: string, signal: AbortSignal, fetcher: typeof fetch): Promise<CachedNarration> {
  const headers = { "xi-api-key": apiKey };
  const allowance = await fetcher("https://api.elevenlabs.io/v1/user/subscription", { headers, signal, cache: "no-store" });
  if (!allowance.ok) throw new NarrationError(allowance.status === 429 ? 429 : 503, "The narration account could not be checked. Try again later or choose device voices in Settings.");
  const subscription = await allowance.json();
  if (!Number.isFinite(subscription.character_limit) || !Number.isFinite(subscription.character_count)) throw new NarrationError(503, "Narration allowance is unavailable. Choose device voices in Settings for now.");
  if (subscription.character_limit - subscription.character_count < passage.characters) throw new NarrationError(402, "The included ElevenLabs allowance is used up. Saved passages still play. Device voices are available in Settings.");
  const response = await fetcher(`https://api.elevenlabs.io/v1/text-to-dialogue/stream?output_format=${NARRATION_FORMAT}`, {
    method: "POST", headers: { ...headers, "Content-Type": "application/json" }, signal, cache: "no-store",
    body: JSON.stringify({ model_id: NARRATION_MODEL, inputs: providerInputs(passage), language_code: "en", seed: 42 }),
  });
  if (!response.ok) {
    const message = response.status === 429 ? "ElevenLabs is busy or its allowance is exhausted. Try again later or choose device voices in Settings."
      : response.status === 401 || response.status === 403 ? "The narration account needs attention. Choose device voices in Settings for now."
      : "ElevenLabs could not finish this passage. It was not retried automatically. Press Play to retry.";
    throw new NarrationError(response.status === 429 ? 429 : 502, message);
  }
  if (!response.headers.get("content-type")?.startsWith("audio/") || !response.body) throw new NarrationError(502, "The voice service returned no audio. The request was not retried.");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.length;
    // Keep the encoded cache record below Next Data Cache's 2 MB entry limit.
    if (bytes > 1_200_000) { await reader.cancel(); throw new NarrationError(502, "The voice service returned an unexpectedly long passage. It was not retried."); }
    chunks.push(value);
  }
  if (bytes < 1000) throw new NarrationError(502, "The passage recording was incomplete. It was not retried.");
  return { audio: Buffer.concat(chunks).toString("base64"), generatedAt: new Date().toISOString(), tier: typeof subscription.tier === "string" ? subscription.tier : "unknown", characters: passage.characters, model: NARRATION_MODEL, voiceIds: [...new Set(passage.inputs.map((input) => input.voice_id))] };
}

/** Same-origin, canonical-only endpoint. Generation never happens during page reads. */
export function createNarrationHandler(dependencies: Dependencies) {
  const fetcher = dependencies.fetch ?? fetch;
  const now = dependencies.now ?? Date.now;
  const inFlight = new Map<string, SharedNarration>();
  let generating = false;
  let windowStart = 0;
  let requests = 0;
  let generated = 0;
  return async (request: Request): Promise<Response> => {
    try {
      if (request.method !== "POST") throw new NarrationError(405, "Narration begins when you press Play.");
      if (request.headers.get("origin") !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") throw new NarrationError(403, "Open the chapter on this site to listen.");
      if (now() - windowStart > 60_000) { windowStart = now(); requests = 0; generated = 0; }
      if (++requests > 120) throw new NarrationError(429, "Too many playback requests. Wait a minute before trying again.");
      const body = await smallJson(request);
      if (Object.keys(body).sort().join(",") !== "chapter,passageId,sourceHash" || typeof body.chapter !== "string" || typeof body.passageId !== "string" || typeof body.sourceHash !== "string") throw new NarrationError(400, "Choose a chapter passage; custom narration requests are not supported.");
      const chapter = dependencies.chapter(body.chapter);
      if (!chapter) throw new NarrationError(404, "This chapter was not found.");
      if (body.sourceHash !== await narrationRequestHash(chapter)) throw new NarrationError(409, "This chapter’s narration has changed. Reload it before pressing Play.");
      const passage = getNarrationPassages(chapter).find((part) => part.id === body.passageId);
      if (!passage) throw new NarrationError(404, "This passage was not found.");
      if (passage.inputs.some((input) => !input.voice_id)) throw new NarrationError(503, "A voice for this passage still needs casting. Choose device voices in Settings for now.");
      const apiKey = dependencies.apiKey();
      if (!apiKey) throw new NarrationError(503, "ElevenLabs is not connected on this site yet. Choose device voices in Settings.");
      // Account namespace prevents sharing recordings across different account/licence origins.
      const key = digest(`${digest(apiKey)}:${narrationPassageSource(passage)}`);
      request.signal.throwIfAborted();
      let work = inFlight.get(key);
      if (!work) {
        const controller = new AbortController();
        const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(105_000)]);
        const created: SharedNarration = {
          controller, subscribers: 0, settled: false,
          // Defer startup until the first subscriber has attached.
          promise: Promise.resolve().then(() => dependencies.cache(key, async () => {
            signal.throwIfAborted();
            if (generating || generated >= 12) throw new NarrationError(429, "Another passage is being prepared. Wait a moment, then press Play again.");
            generating = true;
            generated++;
            try { return await providerAudio(passage, apiKey, signal, fetcher); }
            finally { generating = false; }
          })).finally(() => {
            created.settled = true;
            if (inFlight.get(key) === created) inFlight.delete(key);
          }),
        };
        work = created;
        inFlight.set(key, work);
      }
      const result = await subscribeToNarration(work, request.signal, () => {
        if (inFlight.get(key) === work) inFlight.delete(key);
      });
      request.signal.throwIfAborted();
      return new Response(Buffer.from(result.audio, "base64"), { headers: {
        "Content-Type": "audio/mpeg", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff",
        "X-Narration-Key": key, "X-Narration-Generated": result.generatedAt,
      } });
    } catch (error) {
      if (request.signal.aborted) return new Response(null, { status: 499 });
      const known = error instanceof NarrationError;
      const message = known ? error.message : "The passage could not finish. It was not retried automatically; press Play to retry or choose device voices in Settings.";
      return Response.json({ error: message }, { status: known ? error.status : 502, headers: { "Cache-Control": "no-store" } });
    }
  };
}

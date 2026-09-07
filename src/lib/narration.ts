import type { Chapter, Scene } from "../content/types";
import { dialogueRevisions, dialogueSpeakers, voiceCast, dialogueCue } from "../content/narration.ts";

const quotedSpeech = /“[^”]*”|‘[^’]*’|"[^"\n]*"/gu;

export function dialogueSignature(scene: Scene): string {
  let hash = 2166136261;
  for (const character of JSON.stringify(scene.text ?? [])) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  return hash.toString(16).padStart(8, "0");
}

export interface NarrationSegment {
  id: string;
  sceneId: string;
  paragraphIndex: number;
  text: string;
  speaker: string;
}

export interface NarrationChunk {
  src: string;
  sceneId: string;
  paragraphIndex: number;
  speaker: string;
}

export interface NarrationManifest {
  version: 1;
  sourceHash: string;
  provider: "ElevenLabs";
  complete: boolean;
  chunks: NarrationChunk[];
}

/** Dialogue attribution is editorial metadata; the manuscript remains the only prose source. */
export function getNarrationSegments(chapter: Chapter): NarrationSegment[] {
  return chapter.scenes.filter((scene) => scene.kind !== "title").flatMap((scene) => {
    const sceneKey = `${chapter.slug}/${scene.id}`;
    const cast = dialogueRevisions[sceneKey] === dialogueSignature(scene) ? dialogueSpeakers[sceneKey] ?? [] : [];
    let dialogueIndex = 0;
    return (scene.text ?? []).flatMap((paragraph, paragraphIndex) => {
      const parts: NarrationSegment[] = [];
      const add = (text: string, speaker = "narrator") => {
        if (text) parts.push({ id: `${scene.id}:${paragraphIndex}:${parts.length}`, sceneId: scene.id, paragraphIndex, text, speaker });
      };
      let cursor = 0;
      for (const quote of paragraph.matchAll(quotedSpeech)) {
        const start = quote.index!;
        add(paragraph.slice(cursor, start));
        const speaker = cast[dialogueIndex++] ?? "narrator";
        add(quote[0], Object.hasOwn(voiceCast, speaker) ? speaker : "narrator");
        cursor = start + quote[0].length;
      }
      add(paragraph.slice(cursor));
      return parts;
    });
  });
}

export function narrationText(chapter: Chapter): string {
  return JSON.stringify(getNarrationSegments(chapter).map(segment => ({ ...segment,
    voiceId: voiceCast[segment.speaker]?.elevenLabsVoiceId,
    cue: dialogueCue(chapter.slug, segment.sceneId, segment.speaker),
  })));
}

export async function narrationSourceHash(chapter: Chapter): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(narrationText(chapter)));
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

/** Reject stale recordings and unexpected URLs before creating any audio element. */
export function validateNarrationManifest(value: unknown, chapter: Chapter, sourceHash: string): NarrationManifest | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<NarrationManifest>;
  if (candidate.version !== 1 || candidate.provider !== "ElevenLabs" || candidate.sourceHash !== sourceHash || typeof candidate.complete !== "boolean" || !Array.isArray(candidate.chunks) || !candidate.chunks.length) return null;
  const prefix = `/audio/narration/${chapter.slug}/`;
  const scenes = new Map(chapter.scenes.map((scene) => [scene.id, scene]));
  for (const chunk of candidate.chunks) {
    if (!chunk || typeof chunk.src !== "string" || !chunk.src.startsWith(prefix) || !/^[a-zA-Z0-9_-]+\.(mp3|wav|ogg|m4a)$/.test(chunk.src.slice(prefix.length))) return null;
    const scene = scenes.get(chunk.sceneId);
    if (!scene || scene.kind === "title" || !Number.isInteger(chunk.paragraphIndex) || chunk.paragraphIndex < 0 || chunk.paragraphIndex >= (scene.text?.length ?? 0) || typeof chunk.speaker !== "string") return null;
  }
  return candidate as NarrationManifest;
}

/** Bound utterance size at whitespace, retaining every character and avoiding long browser queues. */
export function splitSpeechText(text: string, maxLength = 220): string[] {
  const parts: string[] = [];
  let rest = text;
  while (rest.length > maxLength) {
    const window = rest.slice(0, maxLength + 1);
    const sentence = [...window.matchAll(/[.!?;:]\s+/g)].at(-1);
    let end = sentence ? sentence.index! + sentence[0].length : window.lastIndexOf(" ") + 1;
    if (end <= 0) end = maxLength;
    parts.push(rest.slice(0, end));
    rest = rest.slice(end);
  }
  if (rest) parts.push(rest);
  return parts;
}

import type { Chapter } from "../content/types";
import { voiceCast, dialogueCue } from "../content/narration.ts";
import { getNarrationSegments, splitSpeechText } from "./narration.ts";

export const PASSAGE_CHARACTER_LIMIT = 700;
export const OPENING_PASSAGE_CHARACTER_LIMIT = 240;
export const NARRATION_MODEL = "eleven_v3";
export const NARRATION_FORMAT = "mp3_44100_128";

export interface NarrationPassage {
  id: string;
  sceneId: string;
  paragraphIndex: number;
  speaker: "cast";
  characters: number;
  inputs: { text: string; voice_id: string; cue?: string }[];
}

/** Stable, bounded requests assembled from canonical prose, never browser-supplied text. */
export function getNarrationPassages(chapter: Chapter): NarrationPassage[] {
  const passages: NarrationPassage[] = [];
  let passage: NarrationPassage | undefined;
  let previousParagraph = "";
  let whitespace = "";
  for (const segment of getNarrationSegments(chapter)) {
    const voiceId = voiceCast[segment.speaker]?.elevenLabsVoiceId ?? "";
    const cue = dialogueCue(chapter.slug, segment.sceneId, segment.speaker);
    const paragraph = `${segment.sceneId}:${segment.paragraphIndex}`;
    const prose = whitespace + (previousParagraph && previousParagraph !== paragraph ? `\n\n${segment.text}` : segment.text);
    previousParagraph = paragraph;
    // Spaces between adjacent dialogue parts belong to the next spoken input.
    if (!prose.trim()) { whitespace = prose; continue; }
    whitespace = "";
    for (const text of splitSpeechText(prose, PASSAGE_CHARACTER_LIMIT - cue.length - 1)) {
      if (!text.trim()) continue;
      if (!passage || passage.sceneId !== segment.sceneId || passage.characters + text.length + cue.length > PASSAGE_CHARACTER_LIMIT || (!passage.inputs.some((input) => input.voice_id === voiceId) && new Set(passage.inputs.map((input) => input.voice_id)).size >= 10)) {
        passage = { id: `${segment.sceneId}:${passages.length}`, sceneId: segment.sceneId, paragraphIndex: segment.paragraphIndex, speaker: "cast", characters: 0, inputs: [] };
        passages.push(passage);
      }
      const prior = passage.inputs.at(-1);
      if (prior?.voice_id === voiceId && (prior.cue ?? "") === cue) prior.text += text;
      else { passage.inputs.push({ text, voice_id: voiceId, ...(cue ? { cue } : {}) }); passage.characters += cue.length; }
      passage.characters += text.length;
    }
  }
  const seenScenes = new Set<string>();
  return passages.flatMap((part) => {
    if (seenScenes.has(part.sceneId)) return [part];
    seenScenes.add(part.sceneId);
    return splitOpeningPassage(part);
  }).map((part, index) => ({ ...part, id: `${part.sceneId}:${index}` }));
}

/** Shorten only each scene's first clip; later existing clip content retains its cache key. */
function splitOpeningPassage(passage: NarrationPassage): NarrationPassage[] {
  if (passage.characters <= OPENING_PASSAGE_CHARACTER_LIMIT) return [passage];
  const opening: NarrationPassage = { ...passage, characters: 0, inputs: [] };
  const remainder: NarrationPassage = { ...passage, characters: 0, inputs: [] };
  let full = false;
  for (const input of passage.inputs) {
    const cueLength = input.cue?.length ?? 0;
    if (full) { remainder.inputs.push(input); remainder.characters += input.text.length + cueLength; continue; }
    const room = OPENING_PASSAGE_CHARACTER_LIMIT - opening.characters - cueLength;
    if (input.text.length <= room) {
      opening.inputs.push(input);
      opening.characters += input.text.length + cueLength;
      continue;
    }
    // Prefer a full sentence, then a word boundary; avoid filling a nearly full clip with a fragment.
    const head = room >= 40 || !opening.characters ? splitSpeechText(input.text, room - 1)[0] : "";
    if (head) { opening.inputs.push({ ...input, text: head }); opening.characters += head.length + cueLength; }
    const tail = input.text.slice(head.length);
    remainder.inputs.push({ ...input, text: tail });
    remainder.characters += tail.length + cueLength;
    full = true;
  }
  return [opening, remainder];
}

/** Only the provider receives performance tags; reader text stays verbatim. */
export function providerInputs(passage: NarrationPassage): { text: string; voice_id: string }[] {
  return passage.inputs.map(({ text, voice_id, cue }) => ({ text: (cue ?? "") + text, voice_id }));
}

/** Includes text, model, format, and casting, so revised audio cannot reuse an old cache entry. */
export function narrationPassageSource(passage: NarrationPassage): string {
  return JSON.stringify({ model: NARRATION_MODEL, format: NARRATION_FORMAT, inputs: passage.inputs });
}

/** Bind a page's passage IDs to their exact schedule, including packing and casting. */
export async function narrationRequestHash(chapter: Chapter): Promise<string> {
  const source = JSON.stringify({ model: NARRATION_MODEL, format: NARRATION_FORMAT, passages: getNarrationPassages(chapter) });
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

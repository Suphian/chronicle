import type { Chapter } from "../content/types";
import { voiceCast } from "../content/narration.ts";
import { getNarrationSegments, splitSpeechText } from "./narration.ts";

export const PASSAGE_CHARACTER_LIMIT = 700;
export const NARRATION_MODEL = "eleven_v3";
export const NARRATION_FORMAT = "mp3_44100_128";

export interface NarrationPassage {
  id: string;
  sceneId: string;
  paragraphIndex: number;
  speaker: "cast";
  characters: number;
  inputs: { text: string; voice_id: string }[];
}

/** Stable, bounded requests assembled from canonical prose, never browser-supplied text. */
export function getNarrationPassages(chapter: Chapter): NarrationPassage[] {
  const passages: NarrationPassage[] = [];
  let passage: NarrationPassage | undefined;
  let previousParagraph = "";
  for (const segment of getNarrationSegments(chapter)) {
    const voiceId = voiceCast[segment.speaker]?.elevenLabsVoiceId ?? "";
    const paragraph = `${segment.sceneId}:${segment.paragraphIndex}`;
    const prose = previousParagraph && previousParagraph !== paragraph ? `\n\n${segment.text}` : segment.text;
    previousParagraph = paragraph;
    for (const text of splitSpeechText(prose, PASSAGE_CHARACTER_LIMIT - 1)) {
      if (!text.trim()) continue;
      if (!passage || passage.sceneId !== segment.sceneId || passage.characters + text.length > PASSAGE_CHARACTER_LIMIT || (!passage.inputs.some((input) => input.voice_id === voiceId) && new Set(passage.inputs.map((input) => input.voice_id)).size >= 10)) {
        passage = { id: `${segment.sceneId}:${passages.length}`, sceneId: segment.sceneId, paragraphIndex: segment.paragraphIndex, speaker: "cast", characters: 0, inputs: [] };
        passages.push(passage);
      }
      const prior = passage.inputs.at(-1);
      if (prior?.voice_id === voiceId) prior.text += text;
      else passage.inputs.push({ text, voice_id: voiceId });
      passage.characters += text.length;
    }
  }
  return passages;
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

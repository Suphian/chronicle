import type { Chapter } from "../types";
import { prologue } from "./prologue";

/**
 * Chapter registry. Add a new chapter file, import it, and push it here.
 * Ordering on the home page uses `chapter.order`.
 */
export const chapters: Chapter[] = [prologue].sort((a, b) => a.order - b.order);

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}

export function getAdjacent(slug: string): { prev?: Chapter; next?: Chapter } {
  const i = chapters.findIndex((c) => c.slug === slug);
  return { prev: chapters[i - 1], next: chapters[i + 1] };
}

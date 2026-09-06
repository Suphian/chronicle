import type { Chapter } from "../types";
import { theConqueror } from "./00-the-conqueror";
import { marketAwnings } from "./01-market-awnings";
import { bitterApprenticeship } from "./02-bitter-apprenticeship";
import { journeys } from "./03-journeys";
import { giftOfLysandria } from "./04-gift-of-lysandria";
import { theCure } from "./05-the-cure";
import { shadowsAndAccusations } from "./06-shadows-and-accusations";
import { risingInfluence } from "./07-rising-influence";
import { aDarkTurn } from "./08-a-dark-turn";
import { shadowsClosingIn } from "./09-shadows-closing-in";

/**
 * Chapter registry. Add a new chapter file, import it, and push it here.
 * Ordering on the home page uses `chapter.order`.
 */
export const chapters: Chapter[] = [
  theConqueror,
  marketAwnings,
  bitterApprenticeship,
  journeys,
  giftOfLysandria,
  theCure,
  shadowsAndAccusations,
  risingInfluence,
  aDarkTurn,
  shadowsClosingIn,
].sort((a, b) => a.order - b.order);

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}

export function getAdjacent(slug: string): { prev?: Chapter; next?: Chapter } {
  const i = chapters.findIndex((c) => c.slug === slug);
  return { prev: chapters[i - 1], next: chapters[i + 1] };
}

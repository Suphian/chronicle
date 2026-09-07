import type { Chapter } from "@/content/types";

export function chapterWords(chapter: Chapter): number {
  return chapter.scenes.filter((scene) => scene.kind !== "title")
    .flatMap((scene) => [...(scene.text ?? []), scene.quote?.text ?? ""])
    .join(" ").trim().split(/\s+/).filter(Boolean).length;
}

export function chapterStage(chapter: Chapter): string {
  return chapter.status === "final" ? "Revised chapter" : chapter.status === "draft" ? "Prose draft" : "Story sketch";
}

export function isProse(chapter: Chapter): boolean {
  return chapter.status === "draft" || chapter.status === "final";
}

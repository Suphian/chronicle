"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { chapters } from "@/content/chapters";
import type { Chapter } from "@/content/types";
import { isProse } from "@/lib/reading";

const numberedChapters = chapters.filter((chapter) => chapter.order > 0);
const historicalTales = chapters.filter((chapter) => chapter.order === 0);

export function ChapterContents({ slug }: { slug: string }) {
  const contents = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (contents.current && !contents.current.contains(event.target as Node)) contents.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && contents.current?.open) {
        contents.current.open = false;
        contents.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  return <details ref={contents} className="book-contents" onToggle={(event) => revealCurrentChapter(event.currentTarget)}>
    <summary>Contents</summary>
    <nav aria-label="Chapters" onClick={(event) => {
      if ((event.target as Element).closest("a") && contents.current) contents.current.open = false;
    }}>
      <ol className="book-chapter-list">{numberedChapters.map((chapter) => <li key={chapter.slug}><ChapterContentsLink chapter={chapter} current={chapter.slug === slug} /></li>)}</ol>
      {historicalTales.length > 0 && <div className="book-historical-tales"><p>Optional historical tale</p>{historicalTales.map((chapter) => <ChapterContentsLink key={chapter.slug} chapter={chapter} current={chapter.slug === slug} />)}</div>}
    </nav>
  </details>;
}

function ChapterContentsLink({ chapter, current }: { chapter: Chapter; current: boolean }) {
  return <Link href={`/chapters/${chapter.slug}`} aria-current={current ? "page" : undefined}>
    <span className="book-chapter-number" aria-hidden="true">{chapter.order > 0 ? String(chapter.order).padStart(2, "0") : "✦"}</span>
    <span className="book-chapter-label"><span className="sr-only">{chapter.order > 0 ? `Chapter ${chapter.order}: ` : "Historical tale: "}</span><span className="book-chapter-title">{chapter.title}</span>{!isProse(chapter) && <span className="book-chapter-stage">Story sketch</span>}{current && <span className="book-chapter-current">Reading now</span>}</span>
  </Link>;
}

/** Keep the active link inside the contents scrollport without moving the manuscript. */
function revealCurrentChapter(details: HTMLDetailsElement) {
  if (!details.open) return;
  const list = details.querySelector("nav");
  const current = list?.querySelector('[aria-current="page"]');
  if (!list || !current) return;
  const listBounds = list.getBoundingClientRect();
  const currentBounds = current.getBoundingClientRect();
  if (currentBounds.bottom > listBounds.bottom) list.scrollTop += currentBounds.bottom - listBounds.bottom + 6;
  else if (currentBounds.top < listBounds.top) list.scrollTop += currentBounds.top - listBounds.top - 6;
}

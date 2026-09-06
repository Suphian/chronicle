import Link from "next/link";
import type { Chapter } from "@/content/types";
import { moods } from "@/lib/moods";

export function ChapterCard({ chapter, index }: { chapter: Chapter; index: number }) {
  const mood = moods[chapter.mood];
  return (
    <Link
      href={`/chapters/${chapter.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-parchment/10 transition hover:border-parchment/40"
    >
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={{ background: chapter.cover ? undefined : mood.background }}
      >
        {chapter.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={chapter.cover}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <p className="font-display text-[10px] tracking-[0.35em] uppercase" style={{ color: mood.accent }}>
            {chapter.subtitle ?? `Chapter ${index}`}
          </p>
          <h3 className="font-display text-2xl text-parchment md:text-3xl">{chapter.title}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="font-serif leading-relaxed text-parchment/75">{chapter.summary}</p>
        <p className="font-display mt-4 text-[10px] tracking-[0.3em] text-parchment/40 uppercase">
          {chapter.scenes.length} scenes{chapter.when ? ` · ${chapter.when}` : ""}
        </p>
      </div>
    </Link>
  );
}

import Link from "next/link";
import Image from "next/image";
import { chapters } from "@/content/chapters";
import { character } from "@/content/character";
import { ChapterCard } from "@/components/ChapterCard";
import { moods } from "@/lib/moods";
import { ResumeReading } from "@/components/ResumeReading";

export default function Home() {
  const first = chapters[0];
  const hero = moods[first?.mood ?? "ember"];

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[65vh] items-center justify-center overflow-hidden px-6 pt-32 pb-16" style={{ background: hero.background }}>
        <Image src="/images/chronicle/house-of-measures.webp" alt="" fill sizes="100vw" preload className="object-cover object-[60%_center]" />
        <div className="pointer-events-none absolute inset-0 bg-black/50" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent,rgba(0,0,0,0.6))]" />
        <div className="relative max-w-3xl text-center">
          <p className="font-display text-xs tracking-[0.5em] text-parchment/50 uppercase">The Chronicle of</p>
          <h1 className="font-display mt-4 text-5xl leading-tight text-parchment md:text-8xl">{character.name}</h1>
          {character.epithet && (
            <p className="font-display mt-3 text-sm tracking-[0.4em] uppercase" style={{ color: hero.accent }}>
              {character.epithet}
            </p>
          )}
          <p className="font-serif mx-auto mt-8 max-w-xl text-xl leading-relaxed text-parchment/80 md:text-2xl">
            {character.tagline}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {first && (
              <Link href={`/chapters/${first.slug}`} className="btn-primary">
                Begin reading
              </Link>
            )}
            <Link href="#chapters" className="btn-ghost">
              Browse chapters ↓
            </Link>
            <Link href="/outline" className="btn-ghost">Story outline →</Link>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section id="chapters" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-16">
        <ResumeReading />
        <p className="mb-10 max-w-2xl text-xl leading-relaxed text-parchment/85">Read the chronicle chapter by chapter, like a book. Keep the character guide nearby, or follow a place into the world map. Each chapter also has an optional cinematic view.</p>
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="font-display text-xs tracking-[0.4em] text-parchment/50 uppercase">Chapters</p>
            <h2 className="font-display mt-2 text-3xl text-parchment md:text-4xl">The story so far</h2>
          </div>
          <p className="font-serif hidden text-parchment/50 italic sm:block">
            {chapters.length} chapter{chapters.length === 1 ? "" : "s"} written
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c, i) => (
            <ChapterCard key={c.slug} chapter={c} index={i} />
          ))}
        </div>
      </section>

      {/* Footer strip */}
      <section className="border-t border-parchment/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
          <Link href="/character" className="group">
            <p className="font-display text-xs tracking-[0.4em] text-parchment/50 uppercase">The character</p>
            <h3 className="font-display mt-2 text-2xl text-parchment group-hover:underline underline-offset-8">
              Who is {character.name.split(" ")[0]}?
            </h3>
            <p className="font-serif mt-3 text-parchment/70">{character.bio[0]}</p>
          </Link>
          <Link href="/world" className="group">
            <p className="font-display text-xs tracking-[0.4em] text-parchment/50 uppercase">The world</p>
            <h3 className="font-display mt-2 text-2xl text-parchment group-hover:underline underline-offset-8">
              An explorable map
            </h3>
            <p className="font-serif mt-3 text-parchment/70">
              Every place the story touches, pinned and linked back to the scenes where it happens.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}

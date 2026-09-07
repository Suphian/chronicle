"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Chapter } from "@/content/types";
import { chapters } from "@/content/chapters";
import { codex } from "@/content/codex";
import { worldById } from "@/content/world";
import { useAudio } from "@/lib/audio";
import { saveReadingPlace } from "./ResumeReading";

export function BookReader({ chapter, prev, next, initialSceneId }: {
  chapter: Chapter; prev?: Chapter; next?: Chapter; initialSceneId?: string;
}) {
  const [largeText, setLargeText] = useState(false);
  const { playAmbient } = useAudio();
  const scenes = chapter.scenes.filter((scene) => scene.kind !== "title");
  const text = scenes.flatMap((scene) => [scene.heading, ...(scene.text ?? []), scene.quote?.text]).join(" ");
  const people = codex.filter((entry) => entry.kind === "person" && text.includes(entry.name.split(" ").filter((word) => !["Master", "Lord", "General", "Magistra"].includes(word))[0]));
  const places = [...new Set(scenes.map((scene) => scene.location).filter(Boolean))].map((id) => worldById[id!]).filter(Boolean);
  const minutes = Math.max(1, Math.ceil(text.split(/\s+/).length / 200));

  useEffect(() => { playAmbient(undefined); }, [playAmbient]);
  useEffect(() => {
    if (initialSceneId) document.getElementById(initialSceneId)?.scrollIntoView();
    saveReadingPlace(chapter.slug, initialSceneId && chapter.scenes.some((scene) => scene.id === initialSceneId) ? initialSceneId : chapter.scenes[0].id);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) saveReadingPlace(chapter.slug, entry.target.id);
    }, { rootMargin: "-20% 0px -65% 0px" });
    document.querySelectorAll(".book-title, .book-scene").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [chapter, initialSceneId]);

  return (
    <main className="book-shell">
      <div className="book-layout">
        <aside className="book-sidebar">
          <Link href="/#chapters" className="book-eyebrow">The Chronicle / Contents</Link>
          <details className="book-contents" open>
            <summary>Chapters <span>{chapters.findIndex((c) => c.slug === chapter.slug) + 1} of {chapters.length}</span></summary>
            <nav aria-label="Chapters">
              {chapters.map((c) => <Link key={c.slug} href={`/chapters/${c.slug}`} aria-current={c.slug === chapter.slug ? "page" : undefined}>
                <span>{c.order === 0 ? "Prologue" : `Chapter ${c.order}`}</span>{c.title}
              </Link>)}
            </nav>
          </details>
          <div className="book-reference">
            <p className="book-eyebrow">Beside the story</p>
            <p>Look up a name or explore a place, then return here to keep reading.</p>
            <Link href="/codex#person">Character guide →</Link>
            <Link href="/world">World & places →</Link>
          </div>
        </aside>

        <div className="book-page">
          <div className="book-tools">
            <span>{minutes} min read</span>
            <button aria-pressed={largeText} onClick={() => setLargeText(!largeText)}>{largeText ? "Standard text" : "Larger text"}</button>
            <Link href={`/chapters/${chapter.slug}?mode=cinematic`}>Cinematic mode</Link>
          </div>
          <article className={`book-prose${largeText ? " book-prose-large" : ""}`}>
            <header id="title" className="book-title">
              <p className="book-eyebrow">{chapter.subtitle ?? (chapter.order === 0 ? "Prologue" : `Chapter ${chapter.order}`)}</p>
              <h1>{chapter.title}</h1>
              {chapter.when && <p className="book-when">{chapter.when}</p>}
              <p className="book-intro">{chapter.summary}</p>
              {chapter.cover && <div className="book-illustration"><Image src={chapter.cover} alt={`Illustration for ${chapter.title}`} fill sizes="(min-width: 1024px) 720px, 100vw" preload className="object-cover" /></div>}
            </header>
            <nav aria-label="In this chapter" className="book-sections">
              <p className="book-eyebrow">In this chapter</p>
              {scenes.map((scene, i) => <a key={scene.id} href={`#${scene.id}`}>{scene.heading ?? `Passage ${i + 1}`}</a>)}
            </nav>
            {scenes.map((scene) => <section id={scene.id} key={scene.id} className="book-scene">
              {scene.heading && <h2>{scene.heading}</h2>}
              {scene.text?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              {scene.quote && <blockquote><p>“{scene.quote.text}”</p>{scene.quote.by && <cite>— {scene.quote.by}</cite>}</blockquote>}
              {scene.location && worldById[scene.location] && <Link className="book-location" href={`/world?at=${scene.location}`}>Explore {worldById[scene.location].name} →</Link>}
            </section>)}
            <footer className="book-end">
              <p className="book-eyebrow">End of {chapter.order === 0 ? "the prologue" : `chapter ${chapter.order}`}</p>
              <nav aria-label="Continue reading" className="book-adjacent">
                {prev && <Link href={`/chapters/${prev.slug}`}><span>← Previous chapter</span>{prev.title}</Link>}
                {next ? <Link href={`/chapters/${next.slug}`}><span>Next chapter →</span>{next.title}</Link> : <p>You’ve reached the end of the story so far.</p>}
              </nav>
              <Link className="book-location" href="/#chapters">All chapters</Link>
            </footer>
          </article>
          <aside className="book-companion" aria-label="Chapter companion">
            <h2>People & places in this chapter</h2>
            <p>Reference entries describe the full story and may reveal later events.</p>
            <div className="book-companion-grid">
              {people.length > 0 && <div><h3>People</h3>{people.map((person) => <Link key={person.id} href={`/codex#${person.id}`}>{person.name} →</Link>)}</div>}
              {places.length > 0 && <div><h3>Places</h3>{places.map((place) => <Link key={place.id} href={`/world?at=${place.id}`}>{place.name} →</Link>)}</div>}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

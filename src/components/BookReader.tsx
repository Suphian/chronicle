"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Chapter, Scene } from "@/content/types";
import { bookPlates, type BookPlate } from "@/content/illustrations";
import { chapters } from "@/content/chapters";
import { codex } from "@/content/codex";
import { worldById } from "@/content/world";
import { saveReadingPlace } from "./ResumeReading";
import { chapterWords, chapterStage, isProse } from "@/lib/reading";

export function BookReader({ chapter, prev, next, initialSceneId }: {
  chapter: Chapter; prev?: Chapter; next?: Chapter; initialSceneId?: string;
}) {
  const [largeText, setLargeText] = useState(false);
  const contents = useRef<HTMLDetailsElement>(null);
  const prose = isProse(chapter);
  const scenes = chapter.scenes.filter((scene) => scene.kind !== "title");
  const text = scenes.flatMap((scene) => [scene.heading, ...(scene.text ?? []), scene.quote?.text]).join(" ");
  const people = codex.filter((entry) => entry.kind === "person" && text.includes(entry.name.split(" ").filter((word) => !["Master", "Lord", "General", "Magistra"].includes(word))[0]));
  const places = [...new Set(scenes.map((scene) => scene.location).filter(Boolean))].map((id) => worldById[id!]).filter(Boolean);
  const words = chapterWords(chapter);
  const minutes = Math.max(1, Math.ceil(words / 200));

  useEffect(() => {
    const compact = window.matchMedia("(max-width: 900px)");
    const update = () => { if (contents.current) contents.current.open = !compact.matches; };
    update();
    compact.addEventListener("change", update);
    return () => compact.removeEventListener("change", update);
  }, []);

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
    <main className="book-shell book-folio">
      <div className="book-layout">
        <aside className="book-sidebar">
          <Link href="/story" className="book-eyebrow">The Chronicle / Story</Link>
          <details ref={contents} className="book-contents" open>
            <summary>Contents <span>{chapter.order === 0 ? "Historical tale" : `${chapter.order} of ${chapters.filter((c) => c.order > 0).length}`}</span></summary>
            <nav aria-label="Chapters">
              {[...chapters.filter((c) => c.order > 0), ...chapters.filter((c) => c.order === 0)].map((c) => <Link key={c.slug} href={`/chapters/${c.slug}`} aria-current={c.slug === chapter.slug ? "page" : undefined}>
                <span>{c.order === 0 ? "Optional historical tale" : `Chapter ${c.order}`} · {chapterStage(c)}</span>{c.title}
              </Link>)}
            </nav>
          </details>
          <div className="book-reference">
            <p className="book-eyebrow">Beside the story</p>
            <p>Look up a name or explore a place, then return here to keep reading.</p>
            <Link href="/people">Character guide →</Link>
            <Link href="/world">World & places →</Link>
            <Link href={`/workshop#${chapter.slug}`}>Chapter plan →</Link>
          </div>
        </aside>

        <div className="book-page">
          <div className="book-tools">
            <span>{chapterStage(chapter)} · {minutes} min · {words.toLocaleString()} words</span>
            <button aria-pressed={largeText} onClick={() => setLargeText(!largeText)}>{largeText ? "Standard text" : "Larger text"}</button>
            <Link href="/library/story/overall-outline">Overall story outline</Link>
          </div>
          {!prose && <div className="sketch-notice"><strong>This is a story sketch.</strong><p>These are planned beats awaiting narrative development. <Link href="/story">Read available prose drafts →</Link></p></div>}
          <article className={`book-prose${largeText ? " book-prose-large" : ""}${prose ? " book-narrative" : ""}`}>
            <header id="title" className="book-title">
              <p className="book-eyebrow">{chapter.subtitle ?? (chapter.order === 0 ? "Prologue" : `Chapter ${chapter.order}`)}</p>
              <h1>{chapter.title}</h1>
              {chapter.when && <p className="book-when">{chapter.when}</p>}
              {!prose && <p className="book-intro">{chapter.summary}</p>}
            </header>
            <details className="book-sections">
              <summary>{prose ? "Jump to a passage" : "Planned scenes"}</summary>
              <nav aria-label="In this chapter">
              {scenes.map((scene, i) => <a key={scene.id} href={`#${scene.id}`}>{scene.heading ?? `Passage ${i + 1}`}</a>)}
              </nav>
            </details>
            {scenes.map((scene, sceneIndex) => <section id={scene.id} key={scene.id} className="book-scene">
              {prose && sceneIndex > 0 && <div className="scene-divider" aria-hidden="true">✦</div>}
              {scene.pov && (sceneIndex === 0 || scene.pov !== scenes[sceneIndex - 1].pov) && <p className="scene-pov">{scene.pov}</p>}
              {scene.heading && <h2 className={prose ? "sr-only" : undefined}>{scene.heading}</h2>}
              <SceneProse scene={scene} plate={bookPlates[`${chapter.slug}/${scene.id}`]} />
              {scene.quote && <blockquote><p>“{scene.quote.text}”</p>{scene.quote.by && <cite>— {scene.quote.by}</cite>}</blockquote>}
              {!prose && scene.location && worldById[scene.location] && <Link className="book-location" href={`/world?at=${scene.location}`}>Explore {worldById[scene.location].name} →</Link>}
            </section>)}
            <footer className="book-end">
              <p className="book-eyebrow">End of {chapter.order === 0 ? "the prologue" : `chapter ${chapter.order}`}</p>
              <nav aria-label="Continue reading" className="book-adjacent">
                {prev && <Link href={`/chapters/${prev.slug}`}><span>← Previous chapter</span>{prev.title}</Link>}
                {next ? <Link href={`/chapters/${next.slug}`}><span>{isProse(next) ? "Next chapter" : "Next story sketch"} →</span>{next.title}</Link> : <p>You’ve reached the end of this first pass. The larger story remains open.</p>}
              </nav>
              <Link className="book-location" href="/story">All chapters</Link>
              {prose && <details className="book-sections"><summary>Chapter synopsis & editing plan</summary><p>{chapter.summary}</p><Link className="book-location" href={`/workshop#${chapter.slug}`}>Open the chapter plan →</Link></details>}
            </footer>
          </article>
          <aside className="book-companion" aria-label="Chapter companion">
            <h2>People & places in this chapter</h2>
            <p>Reference entries describe the full story and may reveal later events.</p>
            <div className="book-companion-grid">
              {people.length > 0 && <div><h3>People</h3>{people.map((person) => <Link key={person.id} href={`/library/characters/${person.id}`}>{person.name} →</Link>)}</div>}
              {places.length > 0 && <div><h3>Places</h3>{places.map((place) => <Link key={place.id} href={`/world?at=${place.id}`}>{place.name} →</Link>)}</div>}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function SceneProse({ scene, plate }: { scene: Scene; plate?: BookPlate }) {
  const paragraphs = scene.text ?? [];
  if (!plate) return paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>);

  // A continuous passage beside the plate; remaining prose returns to the reading column.
  let wordCount = 0;
  let split = 0;
  while (split < paragraphs.length && wordCount < 190) {
    wordCount += paragraphs[split].split(/\s+/).length;
    split++;
  }
  return <>
    <div className="illustrated-spread">
      <div className="spread-prose">{paragraphs.slice(0, split).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
      <figure className="book-plate">
        <Image src={plate.src} alt={plate.alt} width={1024} height={1536} sizes="(min-width: 1300px) 500px, (min-width: 1000px) 40vw, 90vw" />
        <figcaption><span>Plate {plate.number}</span>{plate.caption}<small>Ink & watercolor · The Chronicle</small></figcaption>
      </figure>
    </div>
    {paragraphs.slice(split).map((paragraph, i) => <p key={i}>{paragraph}</p>)}
  </>;
}

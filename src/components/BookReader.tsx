"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import type { Chapter, Scene } from "@/content/types";
import { bookPlates, type BookPlate } from "@/content/illustrations";
import { livingVignettes, livingBookPlates } from "@/content/living-vignettes";
import { LivingLandscape } from "./LivingLandscape";
import { codex } from "@/content/codex";
import { worldById } from "@/content/world";
import { saveReadingPlace } from "./ResumeReading";
import { isProse } from "@/lib/reading";
import { ChapterNarration } from "./ChapterNarration";
import { useReaderPreferences } from "@/lib/reader-preferences";

export function BookReader({ chapter, prev, next, initialSceneId }: {
  chapter: Chapter; prev?: Chapter; next?: Chapter; initialSceneId?: string;
}) {
  const { largeText } = useReaderPreferences();
  const [narrating, setNarrating] = useState<string | null>(null);
  const prose = isProse(chapter);
  const scenes = chapter.scenes.filter((scene) => scene.kind !== "title");
  const text = scenes.flatMap((scene) => [scene.heading, ...(scene.text ?? []), scene.quote?.text]).join(" ");
  const people = codex.filter((entry) => entry.kind === "person" && text.includes(entry.name.split(" ").filter((word) => !["Master", "Lord", "General", "Magistra"].includes(word))[0]));
  const places = [...new Set(scenes.map((scene) => scene.location).filter(Boolean))].map((id) => worldById[id!]).filter(Boolean);

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
        <div className="book-page">
          {!prose && <div className="sketch-notice"><strong>This is a story sketch.</strong><p>These are planned beats awaiting narrative development. <Link href="/story">Read available prose drafts →</Link></p></div>}
          <article className={`book-prose${largeText ? " book-prose-large" : ""}${prose ? " book-narrative" : ""}`}>
            <header id="title" className="book-title">
              <p className="book-eyebrow">{chapter.subtitle ?? (chapter.order === 0 ? "Prologue" : `Chapter ${chapter.order}`)}</p>
              <h1>{chapter.title}</h1>
              {chapter.when && <p className="book-when">{chapter.when}</p>}
              {!prose && <p className="book-intro">{chapter.summary}</p>}
            </header>
            <ChapterNarration chapter={chapter} initialSceneId={initialSceneId} onActiveParagraph={setNarrating} />
            {scenes.map((scene, sceneIndex) => <section id={scene.id} key={scene.id} className="book-scene">
              {prose && sceneIndex > 0 && <div className="scene-divider" aria-hidden="true">✦</div>}
              {scene.pov && (sceneIndex === 0 || scene.pov !== scenes[sceneIndex - 1].pov) && <p className="scene-pov">{scene.pov}</p>}
              {scene.heading && <h2 className={prose ? "sr-only" : undefined}>{scene.heading}</h2>}
              <SceneProse scene={scene} plates={bookPlates[`${chapter.slug}/${scene.id}`]} vignette={livingVignettes[`${chapter.slug}/${scene.id}`]} livingPlate={livingBookPlates[`${chapter.slug}/${scene.id}`]} narrating={narrating} />
              {scene.quote && <blockquote><p>“{scene.quote.text}”</p>{scene.quote.by && <cite>— {scene.quote.by}</cite>}</blockquote>}
              {!prose && scene.location && worldById[scene.location] && <Link className="book-location" href={`/world?at=${scene.location}`}>Explore {worldById[scene.location].name} →</Link>}
            </section>)}
            <footer className="book-end">
              <nav aria-label="Continue reading" className="book-adjacent">
                {prev && <Link href={`/chapters/${prev.slug}`}><span>← Previous chapter</span>{prev.title}</Link>}
                {next ? <Link href={`/chapters/${next.slug}`}><span>{isProse(next) ? "Next chapter" : "Next story sketch"} →</span>{next.title}</Link> : <p>End of the current draft.</p>}
              </nav>
              <Link className="book-location" href="/story">All chapters</Link>
            </footer>
          </article>
          <aside className="book-companion" aria-label="Chapter companion">
            <details><summary>People & places <span>Full-story spoilers</span></summary>
            <div className="book-companion-grid">
              {people.length > 0 && <div><h3>People</h3>{people.map((person) => <Link key={person.id} href={`/library/characters/${person.id}`}>{person.name} →</Link>)}</div>}
              {places.length > 0 && <div><h3>Places</h3>{places.map((place) => <Link key={place.id} href={`/world?at=${place.id}`}>{place.name} →</Link>)}</div>}
            </div>
            </details>
            <div className="book-reference">
              <Link href="/people">Character guide →</Link>
              <Link href="/world">World & places →</Link>
              <Link href="/settings">Reading settings →</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function SceneProse({ scene, plates = [], vignette, livingPlate, narrating }: { scene: Scene; plates?: BookPlate[]; vignette?: (typeof livingVignettes)[string]; livingPlate?: BookPlate["artwork"]; narrating: string | null }) {
  const paragraphs = scene.text ?? [];
  const passage = (start: number, end: number) => paragraphs.slice(start, end).map((paragraph, i) =>
    <Fragment key={start + i}>
      <p data-prose-id={`${scene.id}:${start + i}`} data-narrating={narrating === `${scene.id}:${start + i}` ? true : undefined}>{paragraph}</p>
      {vignette?.afterParagraph === start + i + 1 && <LivingLandscape artwork={vignette.artwork} headingLevel={3} />}
    </Fragment>);
  let cursor = 0;
  const blocks: ReactNode[] = [];
  for (let index = 0; index < plates.length; index++) {
      const plate = plates[index];
      const before = passage(cursor, plate.afterParagraph);
      cursor = plate.afterParagraph;
      if (plate.layout !== "folio") {
        blocks.push(<Fragment key={plate.artwork}>{before}{plate.artwork === livingPlate ? <LivingLandscape artwork={plate.artwork} title={plate.caption} headingLevel={3} /> : <PlateFigure plate={plate} />}</Fragment>);
        continue;
      }
      // Never split a paragraph or consume text belonging to the next illustration.
      const start = cursor;
      const limit = plates[index + 1]?.afterParagraph ?? paragraphs.length;
      let words = 0;
      while (cursor < limit && words < 190) {
        words += paragraphs[cursor].split(/\s+/).length;
        cursor++;
      }
      blocks.push(<Fragment key={plate.artwork}>{before}<div className="illustrated-spread">
        <div className="spread-prose">{passage(start, cursor)}</div>
        <PlateFigure plate={plate} />
      </div></Fragment>);
  }
  return <>{blocks}{passage(cursor, paragraphs.length)}</>;
}

function PlateFigure({ plate }: { plate: BookPlate }) {
  return <figure className={`book-plate book-plate-${plate.layout}`}>
    <Image src={plate.src} alt={plate.alt} width={plate.width} height={plate.height} loading="lazy"
      sizes={plate.layout === "wide" ? "(min-width: 1300px) 900px, (min-width: 901px) 70vw, 95vw"
        : plate.layout === "vignette" ? "(min-width: 600px) 440px, 90vw"
        : "(min-width: 1300px) 500px, (min-width: 1101px) 40vw, (min-width: 600px) 430px, 90vw"} />
    <figcaption>{plate.caption}</figcaption>
  </figure>;
}

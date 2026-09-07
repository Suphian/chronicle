"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Chapter } from "@/content/types";
import { worldById } from "@/content/world";
import { useAudio } from "@/lib/audio";
import { moods } from "@/lib/moods";
import { SceneBackdrop } from "./SceneBackdrop";

interface Props {
  chapter: Chapter;
  next?: Chapter;
  initialSceneId?: string;
}

const PAGE_SFX = "/audio/sfx-page.wav";

/**
 * The slideshow reader. One scene at a time, full-screen, with keyboard,
 * tap, and button navigation. The final "page" is an end card.
 */
export function SceneReader({ chapter, next, initialSceneId }: Props) {
  const audio = useAudio();
  const scenes = chapter.scenes;
  const startIndex = Math.max(0, scenes.findIndex((s) => s.id === initialSceneId));
  const [index, setIndex] = useState(startIndex);
  const [started, setStarted] = useState(false);

  const atEnd = index >= scenes.length;
  const scene = atEnd ? scenes[scenes.length - 1] : scenes[index];
  const mood = moods[scene.mood ?? chapter.mood];

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => Math.min(scenes.length, Math.max(0, i + delta)));
    },
    [scenes.length],
  );

  // Keyboard navigation.
  useEffect(() => {
    if (!started) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as Element)?.closest("a, button, input, textarea, select, summary, [contenteditable]")) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, go]);

  // Audio + URL sync on scene change.
  useEffect(() => {
    if (!started) return;
    if (atEnd) {
      audio.playAmbient(chapter.music);
      return;
    }
    audio.playAmbient(scene.ambient ?? chapter.music);
    audio.playSfx(scene.sfx ?? PAGE_SFX, scene.sfx ? 0.6 : 0.25);
    const url = new URL(window.location.href);
    url.searchParams.set("scene", scene.id);
    window.history.replaceState(null, "", url.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, started]);

  const location = scene.location ? worldById[scene.location] : undefined;
  const isTitle = scene.kind === "title";

  const begin = () => {
    audio.unlock();
    setStarted(true);
  };

  const dots = useMemo(() => scenes.map((s) => s.id), [scenes]);

  return (
    <div className="fixed inset-0 select-none" style={{ ["--accent" as string]: mood.accent }}>
      <SceneBackdrop scene={scene} fallbackMood={chapter.mood} cover={chapter.cover} />
      <Link href={`/chapters/${chapter.slug}?scene=${scene.id}`} className="absolute right-6 top-28 z-40 rounded-full bg-ink px-4 py-2 text-sm text-parchment underline">Read as a book</Link>

      {/* Begin gate: needed so the browser lets us play audio. */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="gate"
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <div className="mx-6 max-w-xl text-center">
              {chapter.subtitle && (
                <p className="font-display text-xs tracking-[0.4em] text-parchment/60 uppercase">
                  {chapter.subtitle}
                </p>
              )}
              <h1 className="font-display mt-3 text-5xl text-parchment md:text-7xl">{chapter.title}</h1>
              {chapter.when && <p className="mt-3 text-sm italic text-parchment/50">{chapter.when}</p>}
              <p className="font-serif mt-6 text-lg leading-relaxed text-parchment/80">{chapter.summary}</p>
              <button
                onClick={begin}
                className="font-display mt-10 rounded-full border border-parchment/40 px-8 py-3 text-sm tracking-[0.3em] text-parchment uppercase transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Begin
              </button>
              <p className="mt-6 text-xs text-parchment/40">
                Headphones recommended · → or tap to advance · ← to go back
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene content */}
      <div
        className="absolute inset-0 z-10 flex cursor-pointer items-end justify-center px-6 pb-28 pt-24 md:items-center md:pb-24"
        onClick={() => started && go(1)}
      >
        <AnimatePresence mode="wait">
          {atEnd ? (
            <motion.div
              key="end"
              className="max-w-xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-display text-xs tracking-[0.4em] text-parchment/60 uppercase">End of</p>
              <h2 className="font-display mt-2 text-4xl text-parchment md:text-5xl">{chapter.title}</h2>
              <div className="mt-10 flex flex-col items-center gap-3">
                {next ? (
                    <Link href={`/chapters/${next.slug}?mode=cinematic`} className="btn-primary">
                    Continue → {next.title}
                  </Link>
                ) : (
                  <p className="font-serif text-parchment/60 italic">The next chapter is still being written.</p>
                )}
                <Link href="/world" className="btn-ghost">
                  Explore the world
                </Link>
                <Link href="/" className="btn-ghost">
                  Back to the chronicle
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.article
              key={scene.id}
              className={isTitle ? "max-w-3xl text-center" : "w-full max-w-2xl"}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.5 } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {scene.heading && (
                <motion.h2
                  className={
                    isTitle
                      ? "font-display text-6xl leading-none text-parchment drop-shadow-lg md:text-8xl"
                      : "font-display mb-6 text-2xl text-[var(--accent)] md:text-3xl"
                  }
                  initial={{ opacity: 0, letterSpacing: "0.2em" }}
                  animate={{ opacity: 1, letterSpacing: isTitle ? "0.08em" : "0.02em" }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                >
                  {scene.heading}
                </motion.h2>
              )}
              {scene.text?.map((p, i) => (
                <motion.p
                  key={i}
                  className={
                    isTitle
                      ? "font-display mt-6 text-sm tracking-[0.5em] text-parchment/70 uppercase"
                      : "font-serif mb-5 text-xl leading-relaxed text-parchment/90 md:text-2xl"
                  }
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.7, duration: 1 }}
                >
                  {p}
                </motion.p>
              ))}
              {scene.quote && (
                <motion.blockquote
                  className="mt-8 border-l-2 border-[var(--accent)]/60 pl-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + (scene.text?.length ?? 0) * 0.7 + 0.4, duration: 1 }}
                >
                  <p className="font-serif text-lg italic text-parchment/80">“{scene.quote.text}”</p>
                  {scene.quote.by && (
                    <footer className="font-display mt-2 text-xs tracking-widest text-parchment/50 uppercase">
                      — {scene.quote.by}
                    </footer>
                  )}
                </motion.blockquote>
              )}
              {location && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  <Link
                    href={`/world?at=${location.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="font-display inline-flex items-center gap-2 text-xs tracking-[0.25em] text-parchment/60 uppercase transition hover:text-[var(--accent)]"
                  >
                    <span aria-hidden>◆</span> {location.name} · view on map
                  </Link>
                </motion.div>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      {/* Chrome: chapter label, prev/next, progress */}
      {started && (
        <>
          <div className="pointer-events-none absolute top-16 left-6 z-20 md:top-20 md:left-10">
            <p className="font-display text-[10px] tracking-[0.35em] text-parchment/40 uppercase">
              {chapter.subtitle ? `${chapter.subtitle} · ` : ""}
              {chapter.title}
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-4 px-6 pb-6">
            <div className="flex items-center gap-2">
              {dots.map((id, i) => (
                <button
                  key={id}
                  aria-label={`Go to scene ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === index ? 28 : 8,
                    background: i <= index ? mood.accent : "rgba(232,220,196,0.25)",
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => go(-1)}
                disabled={index === 0}
                className="font-display text-xs tracking-[0.3em] text-parchment/60 uppercase transition hover:text-parchment disabled:opacity-20"
              >
                ← Back
              </button>
              <button
                onClick={() => go(1)}
                disabled={atEnd}
                className="font-display text-xs tracking-[0.3em] text-parchment/60 uppercase transition hover:text-parchment disabled:opacity-20"
              >
                Next →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

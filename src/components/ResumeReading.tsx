"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getChapter } from "@/content/chapters";

const key = "chronicle:reading-place";
const event = "chronicle:reading-place-changed";
const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(event, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(event, callback); };
};
const snapshot = () => { try { return localStorage.getItem(key) ?? ""; } catch { return ""; } };

export function saveReadingPlace(chapter: string, scene: string) {
  try { localStorage.setItem(key, JSON.stringify({ chapter, scene })); window.dispatchEvent(new Event(event)); } catch {}
}

export function ResumeReading() {
  const saved = useSyncExternalStore(subscribe, snapshot, () => "");
  let place: { chapter?: string; scene?: string } | null;
  try {
    place = JSON.parse(saved);
  } catch { return null; }
  const chapter = typeof place?.chapter === "string" ? getChapter(place.chapter) : undefined;
  const scene = place?.scene;
  if (!chapter || typeof scene !== "string" || !chapter.scenes.some((entry) => entry.id === scene)) return null;
  return <Link className="resume-reading" href={`/chapters/${chapter.slug}?scene=${encodeURIComponent(scene)}`}>Return to reading: {chapter.title} →</Link>;
}

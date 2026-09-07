"use client";

import { useMemo, useSyncExternalStore } from "react";

export const playbackSpeeds = [0.75, 0.9, 1, 1.1, 1.25, 1.5] as const;
export type ReaderPreferences = { narration: "ondemand" | "device"; rate: number; largeText: boolean };
const storageKey = "chronicle:reader-preferences";
const changeEvent = "chronicle:reader-preferences-changed";
const defaults: ReaderPreferences = { narration: "ondemand", rate: 1, largeText: false };

function readSnapshot() {
  try { return window.localStorage.getItem(storageKey) ?? ""; } catch { return ""; }
}

function subscribe(notify: () => void) {
  const onStorage = (event: StorageEvent) => { if (event.key === storageKey || event.key === null) notify(); };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, notify);
  return () => { window.removeEventListener("storage", onStorage); window.removeEventListener(changeEvent, notify); };
}

export function parseReaderPreferences(value: string): ReaderPreferences {
  try {
    const saved = JSON.parse(value);
    return {
      narration: saved?.narration === "device" ? "device" : "ondemand",
      rate: playbackSpeeds.some((speed) => speed === saved?.rate) ? saved.rate : 1,
      largeText: saved?.largeText === true,
    };
  } catch { return defaults; }
}

export function useReaderPreferences() {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => "");
  return useMemo(() => parseReaderPreferences(snapshot), [snapshot]);
}

export function saveReaderPreferences(preferences: ReaderPreferences) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(preferences));
    window.dispatchEvent(new Event(changeEvent));
    return true;
  } catch { return false; }
}

"use client";

import { Howl, Howler } from "howler";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Global audio layer.
 *
 * - Browsers refuse to play sound until the user interacts, so nothing plays
 *   until `unlock()` is called (the "Begin" button on a chapter does this).
 * - One ambient loop plays at a time and cross-fades when it changes.
 * - Sound effects are fire-and-forget.
 * - Missing files fail silently, so you can reference audio before it exists.
 */

interface AudioApi {
  unlocked: boolean;
  muted: boolean;
  unlock: () => void;
  toggleMute: () => void;
  playAmbient: (src?: string) => void;
  playSfx: (src?: string, volume?: number) => void;
}

const AudioContext = createContext<AudioApi | null>(null);

const AMBIENT_VOLUME = 0.45;
const FADE_MS = 1800;
const STORAGE_KEY = "chronicle:muted";

// Tiny external store so the mute preference survives reloads without a
// hydration mismatch (the server always renders "unmuted").
const listeners = new Set<() => void>();
const readMuted = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};
const subscribeMuted = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const writeMuted = (v: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
  } catch {}
  listeners.forEach((l) => l());
};

export function AudioProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const muted = useSyncExternalStore(subscribeMuted, readMuted, () => false);
  const current = useRef<{ src: string; howl: Howl } | null>(null);
  const pending = useRef<string | undefined>(undefined);

  useEffect(() => {
    Howler.mute(muted);
  }, [muted]);

  const startAmbient = useCallback((src: string) => {
    const old = current.current;
    if (old?.src === src) return;
    if (old) {
      const h = old.howl;
      h.fade(h.volume(), 0, FADE_MS);
      setTimeout(() => h.unload(), FADE_MS + 50);
    }
    const howl = new Howl({
      src: [src],
      loop: true,
      volume: 0,
      onloaderror: () => {
        if (current.current?.howl === howl) current.current = null;
      },
    });
    howl.play();
    howl.fade(0, AMBIENT_VOLUME, FADE_MS);
    current.current = { src, howl };
  }, []);

  const playAmbient = useCallback(
    (src?: string) => {
      if (!src) {
        pending.current = undefined;
        const old = current.current;
        if (old) {
          old.howl.fade(old.howl.volume(), 0, FADE_MS);
          setTimeout(() => old.howl.unload(), FADE_MS + 50);
          current.current = null;
        }
        return;
      }
      if (!unlocked) {
        pending.current = src;
        return;
      }
      startAmbient(src);
    },
    [unlocked, startAmbient],
  );

  const playSfx = useCallback(
    (src?: string, volume = 0.6) => {
      if (!src || !unlocked) return;
      const h = new Howl({ src: [src], volume, onend: () => h.unload(), onloaderror: () => h.unload() });
      h.play();
    },
    [unlocked],
  );

  const unlock = useCallback(() => {
    if (unlocked) return;
    // Howler resumes its AudioContext on the first user gesture; this call is that gesture.
    Howler.ctx?.resume?.();
    setUnlocked(true);
    if (pending.current) {
      startAmbient(pending.current);
      pending.current = undefined;
    }
  }, [unlocked, startAmbient]);

  const toggleMute = useCallback(() => writeMuted(!readMuted()), []);

  const api = useMemo<AudioApi>(
    () => ({ unlocked, muted, unlock, toggleMute, playAmbient, playSfx }),
    [unlocked, muted, unlock, toggleMute, playAmbient, playSfx],
  );

  return <AudioContext.Provider value={api}>{children}</AudioContext.Provider>;
}

export function useAudio(): AudioApi {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./HeroArtwork.module.css";

const motes = Array.from({ length: 12 }, (_, index) => ({
  left: `${8 + (index * 23) % 84}%`,
  top: `${28 + (index * 17) % 52}%`,
  "--duration": `${12 + (index * 7) % 13}s`,
  "--delay": `${-index * 2.7}s`,
} as CSSProperties));

/** Motion belongs to the painting; the title and reading controls stay still. */
export function HeroArtwork() {
  const artwork = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(true);
  const [choice, setChoice] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const wantsMotion = choice ?? !reduced;
  const running = wantsMotion && visible && onScreen;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    const updatePreference = () => {
      setReduced(preference.matches);
      // A new system preference takes precedence over an earlier play choice.
      setChoice(null);
    };
    const updateVisibility = () => setVisible(document.visibilityState === "visible");
    queueMicrotask(() => {
      if (!active) return;
      updatePreference();
      updateVisibility();
    });
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      ([entry]) => { if (active) setOnScreen(entry.isIntersecting); },
    );
    if (observer && artwork.current) observer.observe(artwork.current);
    else queueMicrotask(() => { if (active) setOnScreen(true); });
    return () => {
      active = false;
      observer?.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return <>
    <div id="hero-artwork" className={`home-art ${styles.artwork}`} ref={artwork} data-motion={running ? "running" : "paused"}>
      <Image src="/images/plates/carthara-market-hero-v3.webp" alt="A panoramic ink and watercolor view of Carthara: Black families and traders beneath shaded market awnings, planted terraces, and intricate limestone arcades" fill sizes="(max-width: 700px) 1500px, 100vw" preload className={styles.painting} />
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.air} aria-hidden="true">{motes.map((style, index) => <i className={styles.mote} key={index} style={style} />)}</div>
    </div>
    <button type="button" className={styles.control} aria-controls="hero-artwork" aria-pressed={wantsMotion} onClick={() => setChoice(!wantsMotion)}>
      <svg viewBox="0 0 20 20" aria-hidden="true">{wantsMotion ? <path d="M6 4v12M14 4v12" fill="none" stroke="currentColor" strokeWidth="2" /> : <path d="m6 3 11 7-11 7z" fill="currentColor" />}</svg>
      {wantsMotion ? "Pause picture" : "Animate picture"}
    </button>
  </>;
}

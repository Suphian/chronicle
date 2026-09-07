"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import styles from "./LivingLandscape.module.css";
import { livingArtwork, type LivingArtworkId } from "@/content/living-vignettes";

const motes = Array.from({ length: 14 }, (_, index) => ({
  left: `${12 + (index * 29) % 76}%`,
  top: `${14 + (index * 17) % 65}%`,
  "--duration": `${5 + (index * 7) % 5}s`,
  "--delay": `${-index * 3.7}s`,
  "--drift": `${140 + (index * 11) % 100}px`,
} as CSSProperties));

/** Original painted atmosphere with separately controlled fabric, light and air. */
export function LivingLandscape({ artwork = "lysandria-terrace", title, headingLevel = 2 }: { artwork?: LivingArtworkId; title?: string; headingLevel?: 2 | 3 }) {
  const art = livingArtwork(artwork);
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const picture = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const identifier = useId().replace(/:/g, "");
  const titleId = `${identifier}-title`;
  const linenId = `${identifier}-linen`;
  const pictureId = `${identifier}-picture`;
  const wantsMotion = userChoice ?? (reducedMotion === false);
  const running = wantsMotion && onScreen && pageVisible;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = true;
    const updatePreference = () => { if (active) { setReducedMotion(preference.matches); setUserChoice(null); } };
    const updateVisibility = () => { if (active) setPageVisible(document.visibilityState === "visible"); };
    queueMicrotask(() => { updatePreference(); updateVisibility(); });
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(
      ([entry]) => { if (active) setOnScreen(entry.isIntersecting); },
    );
    if (observer && picture.current) observer.observe(picture.current);
    else queueMicrotask(() => { if (active) setOnScreen(true); });
    return () => {
      active = false;
      observer?.disconnect();
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return <section className={`${styles.landscape}${art.night ? ` ${styles.night}` : ""}`} aria-labelledby={titleId} data-living-vignette={artwork} data-motion={running ? "running" : "paused"}>
    <div className={styles.heading}>
      <div><p className={styles.eyebrow}>A living vignette</p><Heading className={styles.title} id={titleId}>{title ?? art.title}</Heading></div>
      <button className={styles.control} type="button" aria-controls={pictureId} aria-pressed={wantsMotion} onClick={() => setUserChoice(!wantsMotion)}>
        <svg viewBox="0 0 20 20" aria-hidden="true">{wantsMotion ? <path d="M6 4v12M14 4v12" fill="none" stroke="currentColor" strokeWidth="2" /> : <path d="m6 3 11 7-11 7z" fill="currentColor" />}</svg>
        {wantsMotion ? "Pause motion" : "Play motion"}
      </button>
    </div>
    {reducedMotion && userChoice === null && <p className={styles.motionNote}>Motion is off to match your device preference. Choose Play motion to animate this picture.</p>}
    <figure className={styles.figure}>
      <div id={pictureId} ref={picture} className={`${styles.window} ${running ? styles.running : ""}`} style={{ aspectRatio: `${art.width} / ${art.height}` }}>
        <Image src={art.src} alt={art.alt} fill sizes="(min-width: 1300px) 900px, (min-width: 901px) 70vw, 95vw" className={styles.painting} />
        <div className={styles.sunlight} aria-hidden="true" />
        <div className={styles.air} aria-hidden="true">{motes.map((style, index) => <span className={styles.mote} style={style} key={index} />)}</div>
        {art.curtain && <svg className={styles.curtain} viewBox="0 0 260 660" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <defs><linearGradient id={linenId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f5edda" stopOpacity=".82" /><stop offset=".18" stopColor="#fffbed" stopOpacity=".48" />
            <stop offset=".35" stopColor="#e6dcc4" stopOpacity=".7" /><stop offset=".53" stopColor="#fffdf4" stopOpacity=".32" />
            <stop offset=".7" stopColor="#eee5cf" stopOpacity=".66" /><stop offset=".86" stopColor="#fffbed" stopOpacity=".34" />
            <stop offset="1" stopColor="#fff9e9" stopOpacity=".72" />
          </linearGradient></defs>
          <path d="M0 0H166C146 112 150 191 182 276C215 366 245 405 241 488C238 561 202 616 180 660H0Z" fill={`url(#${linenId})`} />
          <g fill="none" stroke="#fffdf5" strokeWidth="2" opacity=".36">
            <path d="M35 0C27 145 73 216 84 326S121 529 66 660" />
            <path d="M77 0C62 129 88 217 122 311S174 530 123 660" />
            <path d="M124 0C104 129 128 201 163 296S220 496 167 643" />
          </g>
          <path d="M166 0C146 112 150 191 182 276C215 366 245 405 241 488C238 561 202 616 180 660" fill="none" stroke="#fff8e8" strokeWidth="3" opacity=".62" />
        </svg>}
        <div className={styles.sill} aria-hidden="true" />
      </div>
      <figcaption className={styles.caption}>{art.caption && <span>{art.caption}</span>}<span className={styles.study}>{art.note}</span></figcaption>
    </figure>
  </section>;
}

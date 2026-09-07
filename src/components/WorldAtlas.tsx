"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { world, worldById } from "@/content/world";
import { getChapter } from "@/content/chapters";

export function WorldAtlas({ initialAt }: { initialAt?: string }) {
  const [selected, setSelected] = useState(initialAt && worldById[initialAt] ? initialAt : "carthara");
  const [panelOpen, setPanelOpen] = useState(Boolean(initialAt && worldById[initialAt]));
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const [route, setRoute] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | SVGElement | null>(null);
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const place = worldById[selected];
  const pick = (id: string, trigger: HTMLElement | SVGElement) => {
    opener.current = trigger;
    setSelected(id);
    setPanelOpen(true);
    const url = new URL(window.location.href);
    url.searchParams.set("at", id);
    window.history.replaceState(null, "", url);
    stage.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    // Also focus when choosing the already-open location again.
    requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
  };
  const close = () => {
    setPanelOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("at");
    window.history.replaceState(null, "", url);
    const trigger = opener.current ?? svg.current?.querySelector<SVGElement>(`[data-place="${selected}"]`);
    trigger?.focus({ preventScroll: trigger instanceof SVGElement });
  };
  useEffect(() => {
    if (panelOpen && opener.current) closeButton.current?.focus({ preventScroll: true });
  }, [panelOpen, selected]);
  useEffect(() => {
    if (!initialAt || !worldById[initialAt]) return;
    const frame = requestAnimationFrame(() => stage.current?.scrollIntoView({ block: "start", behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, [initialAt]);
  const zoom = (factor: number) => setView((v) => {
    const k = Math.min(3, Math.max(1, v.k * factor));
    return { x: 600 - ((600 - v.x) / v.k) * k, y: 400 - ((400 - v.y) / v.k) * k, k };
  });
  const point = (x: number, y: number) => {
    const matrix = svg.current?.getScreenCTM();
    return matrix ? new DOMPoint(x, y).matrixTransform(matrix.inverse()) : new DOMPoint(x, y);
  };
  return <div className="atlas" onKeyDown={(event) => { if (panelOpen && event.key === "Escape") { event.preventDefault(); close(); } }}>
    <div className="atlas-toolbar">
      <p>Choose a place on the map or in the directory below.</p>
      <button aria-pressed={route} onClick={() => setRoute(!route)}>{route ? "Hide" : "Show"} Hanno’s travels</button>
    </div>
    <div ref={stage} className="atlas-map">
      <div className="atlas-viewport">
      <svg ref={svg} viewBox="0 0 1200 800" role="group" aria-label="Map of the Chronicle" style={{ touchAction: view.k > 1 ? "none" : "pan-x pan-y" }}
        onPointerDown={(e) => { if (view.k === 1 || (e.target as Element).closest('[role="button"]')) return; const p = point(e.clientX, e.clientY); drag.current = { x: p.x, y: p.y, vx: view.x, vy: view.y }; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={(e) => { if (!drag.current) return; const p = point(e.clientX, e.clientY); setView((v) => ({ ...v, x: drag.current!.vx + p.x - drag.current!.x, y: drag.current!.vy + p.y - drag.current!.y })); }}
        onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
        <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
          <image href="/images/world/atlas-island-v2.webp" width="1200" height="800" />
          {route && <path d={`M ${["carthara", "tengeri-wastes", "sidrat-al-muntaha", "lysandria"].map((id) => `${worldById[id].x},${worldById[id].y}`).join(" L ")}`} fill="none" stroke="#852f23" strokeWidth={3 / view.k} strokeDasharray="8 6" />}
          {world.map((location) => <g key={location.id} role="button" tabIndex={0} data-place={location.id} aria-label={`Explore ${location.name}`} aria-pressed={panelOpen && selected === location.id} aria-expanded={panelOpen && selected === location.id} aria-controls="atlas-place-details"
            onClick={(e) => pick(location.id, e.currentTarget)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(location.id, e.currentTarget); } }}
            transform={`translate(${location.x} ${location.y}) scale(${1 / view.k})`} className="atlas-pin">
            <circle r="11" fill={selected === location.id ? "#893529" : "#f9efd9"} stroke="#493b28" strokeWidth="2" />
            <circle r="3" fill={selected === location.id ? "#fff4df" : "#493b28"} />
            <rect x={-(location.name.length * 4 + 13)} y="17" width={location.name.length * 8 + 26} height="30" rx="4" fill="#fcf3df" stroke="#97825b" />
            <text y="37" textAnchor="middle" fill="#30281c" fontFamily="Georgia, serif" fontSize="16">{location.name}</text>
          </g>)}
        </g>
      </svg>
      </div>
      <div className="atlas-controls">
        <button onClick={() => zoom(1.4)} aria-label="Zoom in">+</button>
        <button onClick={() => zoom(1 / 1.4)} aria-label="Zoom out">−</button>
        <button onClick={() => setView({ x: 0, y: 0, k: 1 })}>Reset</button>
      </div>
      <section id="atlas-place-details" className="atlas-detail" data-open={panelOpen} aria-labelledby="atlas-place-title" aria-hidden={!panelOpen} inert={!panelOpen}>
        <div className="atlas-detail-heading"><p className="book-eyebrow">{place.type}</p><button ref={closeButton} onClick={close} aria-label="Close place details">Close <span aria-hidden="true">×</span></button></div>
        <div className="atlas-detail-body" key={selected}>
          <h2 id="atlas-place-title">{place.name}</h2>
          <p className="atlas-tagline">{place.tagline}</p><p>{place.description}</p>
          <Link href={`/library/places/${place.id}`}>History, institutions & open questions →</Link>
          <h3>Read the story here</h3>
          {place.appearsIn?.map((ref, i) => { const chapter = getChapter(ref.chapter); return chapter && <Link key={i} href={`/chapters/${chapter.slug}${ref.scene ? `?scene=${ref.scene}` : ""}`}>{chapter.title}{ref.label ? ` · ${ref.label}` : ""} →</Link>; })}
        </div>
      </section>
    </div>
    {route && <p className="atlas-caption">Hanno’s travels: Carthara → Tengeri Wastes → Sidrat Al Muntaha → Lysandria. The line shows narrative order, not exact roads.</p>}
    <div className="atlas-directory">
      <nav aria-label="Places"><h2>Place directory</h2><div className="atlas-place-list">{world.map((location) => <button key={location.id} aria-pressed={panelOpen && selected === location.id} aria-expanded={panelOpen && selected === location.id} aria-controls="atlas-place-details" onClick={(e) => pick(location.id, e.currentTarget)}>{location.name}<span>{location.type}</span></button>)}</div></nav>
    </div>
    <p className="atlas-caption">This atlas covers the current story’s locations. <Link className="book-location" href="/library/geography-reconciliation">Explore the recovered geography of Ruhania, Sidrat, and the Leonin Khanate →</Link></p>
  </div>;
}

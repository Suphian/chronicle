"use client";

import Link from "next/link";
import Image from "next/image";
import { locationArt, mapPictures } from "@/content/mizan-art";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { world, worldById } from "@/content/world";
import { getChapter } from "@/content/chapters";
import { mapName, mizan, mizanById, regionStory, sourceCharacters, storyAnchors, type MizanKind } from "@/content/mizan";
import styles from "./MizanAtlas.module.css";
import terrain from "@/content/mizan-terrain.json";
import { distanceMiles, elevationFeet, terrainAt, type MapPoint } from "@/lib/mizan-measure";
import { MizanTravel } from "./MizanTravel";

const W = mizan.width;
const H = mizan.height;
const categories = [["all", "Everything"], ["region", "Regions"], ["settlement", "Settlements"], ["landmark", "Landmarks"], ["person", "People"]] as const;
const labelOffsets: Record<string, [number, number]> = { "region-3": [-60, -18], "region-4": [-35, 20], "region-5": [0, 26], "region-6": [25, 0] };
const travel = ["carthara", "tengeri-wastes", "sidrat-al-muntaha", "lysandria"];
function bounded(v: { x: number; y: number; k: number }) {
  return { ...v, x: Math.min(0, Math.max(W * (1 - v.k), v.x)), y: Math.min(0, Math.max(H * (1 - v.k), v.y)) };
}

export function WorldAtlas({ initialAt, sourceNotes = {}, atlasNotes = {} }: { initialAt?: string; sourceNotes?: Record<string, string>; atlasNotes?: Record<string, string> }) {
  const validInitial = initialAt && (worldById[initialAt] || mizanById[initialAt]) ? initialAt : null;
  const [selected, setSelected] = useState<string | null>(validInitial);
  const [panelOpen, setPanelOpen] = useState(Boolean(validInitial));
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const [route, setRoute] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | MizanKind>("all");
  const [layer, setLayer] = useState("elevation");
  const [measuring, setMeasuring] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<MapPoint[]>([]);
  const [probeData, setProbeData] = useState<Uint8Array | null>(null);
  const [probeError, setProbeError] = useState(false);
  const [probe, setProbe] = useState<MapPoint | null>(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [fullScreenFallback, setFullScreenFallback] = useState(false);
  const atlasRoot = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | SVGElement | null>(null);
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const sourceId = selected ? storyAnchors[selected] ?? selected : null;
  const sourcePlace = sourceId ? mizanById[sourceId] : undefined;
  const storyId = selected && worldById[selected] ? selected : sourceId ? regionStory[sourceId] : undefined;
  const storyPlace = storyId ? worldById[storyId] : undefined;
  const title = selected && worldById[selected] ? worldById[selected].name : sourcePlace ? mapName(sourcePlace) : "";
  const art = locationArt(selected);
  const note = sourcePlace?.loreSlug ? sourceNotes[sourcePlace.loreSlug] : undefined;
  const atlasNoteId = selected && atlasNotes[selected] ? selected : sourceId;
  const atlasNote = atlasNoteId ? atlasNotes[atlasNoteId] : undefined;
  const outlineAnchor = atlasNote?.match(/\[Areas to think about\]\(\.\.\/story\/area-development\.md(#[^)]+)\)/)?.[1] ?? "";
  const linkedCharacter = sourceId ? sourceCharacters[sourceId] : undefined;
  const measuredMiles = measurePoints.length === 2 ? distanceMiles(measurePoints[0], measurePoints[1]) : null;
  const probeValue = probe && probeData ? terrainAt(probeData, probe) : null;
  const crossesWater = useMemo(() => {
    if (!probeData || measurePoints.length !== 2) return false;
    const [a, b] = measurePoints;
    const steps = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 2));
    for (let i = 0; i <= steps; i++) if (terrainAt(probeData, { x: a.x + (b.x - a.x) * i / steps, y: a.y + (b.y - a.y) * i / steps }).height < 20) return true;
    return false;
  }, [probeData, measurePoints]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/images/world/mizan-terrain.bin", { signal: controller.signal }).then((r) => {
      if (!r.ok) throw new Error("Terrain unavailable");
      return r.arrayBuffer();
    }).then((data) => {
      if (data.byteLength !== terrain.probeWidth * terrain.probeHeight * 4) throw new Error("Incomplete terrain data");
      setProbeData(new Uint8Array(data));
    }).catch(() => { if (!controller.signal.aborted) setProbeError(true); });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const changed = () => setFullScreen(document.fullscreenElement === atlasRoot.current);
    document.addEventListener("fullscreenchange", changed);
    return () => document.removeEventListener("fullscreenchange", changed);
  }, []);
  useEffect(() => {
    if (!fullScreenFallback) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [fullScreenFallback]);
  async function toggleFullScreen() {
    if (fullScreenFallback) { setFullScreenFallback(false); return; }
    if (document.fullscreenElement) { await document.exitFullscreen(); return; }
    try {
      if (!atlasRoot.current?.requestFullscreen) throw new Error("Use full-window mode");
      await atlasRoot.current.requestFullscreen();
    } catch { setFullScreenFallback(true); }
  }
  function addMeasurement(p: MapPoint) {
    setPanelOpen(false);
    setMeasurePoints((old) => old.length >= 2 ? [p] : [...old, p]);
    setProbe(p);
  }
  const scaleMiles = 10 ** Math.floor(Math.log10(150 * terrain.distanceScale / view.k));
  const scaleWidth = scaleMiles / terrain.distanceScale * view.k;
  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return mizan.places.filter((p) => (category === "all" || p.kind === category) &&
      (!needle || `${mapName(p)} ${p.name} ${sourceNotes[p.loreSlug] ?? ""} ${atlasNotes[p.id] ?? ""}`.toLocaleLowerCase().includes(needle)));
  }, [category, query, sourceNotes, atlasNotes]);
  const resultIds = useMemo(() => new Set(results.map((p) => p.id)), [results]);
  const pins = mizan.places.filter((p) => p.id === sourceId || resultIds.has(p.id) &&
    (category !== "all" || query.trim() || p.kind === "region" || view.k >= (p.kind === "landmark" ? 1.7 : 2.5)));

  const focusMap = (id: string) => {
    const p = mizanById[storyAnchors[id] ?? id];
    if (p) setView(bounded({ x: W * .35 - p.x * 2.5, y: H * .48 - p.y * 2.5, k: 2.5 }));
  };
  const pick = (id: string, trigger: HTMLElement | SVGElement) => {
    opener.current = trigger;
    setSelected(id); setPanelOpen(true); focusMap(id);
    const url = new URL(window.location.href);
    url.searchParams.set("at", id); url.hash = "atlas";
    window.history.replaceState(null, "", url);
    stage.current?.scrollIntoView({ block: "start", behavior: "instant" });
    requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
  };
  const close = () => {
    setPanelOpen(false);
    opener.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (!validInitial) return;
    const frame = requestAnimationFrame(() => {
      focusMap(validInitial);
      stage.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [validInitial]);
  const zoom = (factor: number) => setView((v) => {
    const k = Math.min(8, Math.max(1, v.k * factor));
    return bounded({ x: W / 2 - ((W / 2 - v.x) / v.k) * k, y: H / 2 - ((H / 2 - v.y) / v.k) * k, k });
  });
  const point = (x: number, y: number) => {
    const matrix = svg.current?.getScreenCTM();
    return matrix ? new DOMPoint(x, y).matrixTransform(matrix.inverse()) : new DOMPoint(x, y);
  };
  return <div ref={atlasRoot} className={`atlas ${styles.atlas} ${fullScreenFallback ? styles.fullWindow : ""}`} onKeyDown={(e) => { if (e.key === "Escape") { if (panelOpen) { e.preventDefault(); close(); } else if (fullScreenFallback) setFullScreenFallback(false); } }}>
    <div className={styles.intro}>
      <div><p className="book-eyebrow">An atlas to build a world around</p><p>From coastlines to the lives within them. Choose a region, zoom into its settlements, or search the map notes and recovered lore.</p></div>
      <div className={styles.stats}><strong>{mizan.places.length}<span>mapped entries</span></strong><strong>{Object.keys(atlasNotes).length}<span>atlas descriptions</span></strong><strong>{Object.keys(sourceNotes).length}<span>source lore notes</span></strong></div>
    </div>
    <div className="atlas-toolbar"><p>Zoom and drag to explore. Right-click twice to plan a journey.</p><div className={styles.toolbarActions}><button aria-pressed={route} onClick={() => setRoute(!route)}>{route ? "Hide" : "Show"} Hanno’s travels</button><button onClick={toggleFullScreen}>{fullScreen || fullScreenFallback ? "Exit full screen" : "Full screen"}</button></div></div>
    <div className={styles.layerBar}><div className={styles.layers} aria-label="Map layers">{[["geography", "Regions"], ["elevation", "Elevation"], ["temperature", "Temperature"], ["precipitation", "Precipitation"], ["biomes", "Biomes"]].map(([id, label]) => <button key={id} aria-pressed={layer === id} onClick={() => setLayer(id)}>{label}</button>)}</div><button className={styles.modeButton} aria-pressed={measuring} onClick={() => { setMeasuring(!measuring); setPanelOpen(false); }}>{measuring ? "Stop selecting" : "Measure a journey"}</button></div>
    <div ref={stage} className="atlas-map">
      <div className="atlas-viewport">
        <svg ref={svg} viewBox={`0 0 ${W} ${H}`} role="group" aria-label="Mizan world atlas" style={{ touchAction: view.k > 1 ? "none" : "pan-x pan-y" }}
          onContextMenu={(e) => { e.preventDefault(); const p = point(e.clientX, e.clientY); const x = (p.x - view.x) / view.k, y = (p.y - view.y) / view.k; if (x >= 0 && x <= W && y >= 0 && y <= H) addMeasurement({ x, y }); }}
          onClick={(e) => { if ((e.target as Element).closest('[role="button"]')) return; const p = point(e.clientX, e.clientY); const x = (p.x - view.x) / view.k, y = (p.y - view.y) / view.k; if (x < 0 || x > W || y < 0 || y > H) return; if (measuring) addMeasurement({ x, y }); else setProbe({ x, y }); }}
          onPointerDown={(e) => { if (e.button !== 0 || measuring || view.k === 1 || (e.target as Element).closest('[role="button"]')) return; const p = point(e.clientX, e.clientY); drag.current = { x: p.x, y: p.y, vx: view.x, vy: view.y }; e.currentTarget.setPointerCapture(e.pointerId); }}
          onPointerMove={(e) => { if (!drag.current) return; const p = point(e.clientX, e.clientY); setView((v) => bounded({ ...v, x: drag.current!.vx + p.x - drag.current!.x, y: drag.current!.vy + p.y - drag.current!.y })); }}
          onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
          <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
            <image href={layer === "geography" ? "/images/world/mizan-geography.svg" : `/images/world/mizan-${layer}.webp`} width={W} height={H} />
            {route && <path d={`M ${travel.map((id) => { const p = mizanById[storyAnchors[id]]; return `${p.x},${p.y}`; }).join(" L ")}`} fill="none" stroke="#762f22" strokeWidth={3 / view.k} strokeDasharray={`${9 / view.k} ${6 / view.k}`} />}
            {pins.map((p) => {
              const active = p.id === sourceId && panelOpen;
              const label = active || p.kind === "region" || view.k >= 4 || query.trim();
              const [dx, dy] = !active && p.kind === "region" ? labelOffsets[p.id] ?? [0, 0] : [0, 0];
              return <g key={p.id} role="button" tabIndex={0} data-place={p.id} aria-label={`Explore ${mapName(p)}`} aria-pressed={active} aria-expanded={active} aria-controls="atlas-place-details"
                onClick={(e) => measuring ? addMeasurement(p) : pick(p.id, e.currentTarget)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (measuring) addMeasurement(p); else pick(p.id, e.currentTarget); } }}
                transform={`translate(${p.x} ${p.y}) scale(${1 / view.k})`} className={`atlas-pin ${styles.pin}`}>
                <title>{mapName(p)}</title><circle r="21" fill="transparent" />
                <circle r={p.kind === "region" ? 10 : 7} fill={active ? "#903c2b" : p.kind === "person" ? "#655182" : "#fbf0d9"} stroke="#294f53" strokeWidth="2" />
                {p.kind === "region" && <circle r="3" fill={active ? "#fff4df" : "#294f53"} />}
                {label && <text x={dx} y={dy + 29} textAnchor="middle" fill="#183c40" stroke="#f5ecd9" strokeWidth="5" paintOrder="stroke" strokeLinejoin="round" fontFamily="Georgia, serif" fontWeight={p.kind === "region" ? 600 : 400} fontSize={p.kind === "region" ? 21 : 18}>{mapName(p)}</text>}
              </g>;
            })}
            {measurePoints.length === 2 && <path d={`M${measurePoints[0].x},${measurePoints[0].y} L${measurePoints[1].x},${measurePoints[1].y}`} fill="none" stroke="#fff8e5" strokeWidth={7 / view.k} />}
            {measurePoints.length === 2 && <path d={`M${measurePoints[0].x},${measurePoints[0].y} L${measurePoints[1].x},${measurePoints[1].y}`} fill="none" stroke="#a33124" strokeWidth={3 / view.k} strokeDasharray={`${10 / view.k} ${5 / view.k}`} />}
            {measurePoints.map((p, i) => <g key={i} transform={`translate(${p.x} ${p.y}) scale(${1 / view.k})`} pointerEvents="none"><circle r="14" fill="#fff8e5" stroke="#a33124" strokeWidth="3" /><text textAnchor="middle" y="6" fontSize="18" fill="#7a241a">{i + 1}</text></g>)}
          </g>
          <g transform={`translate(45 ${H - 48})`} aria-label={`${scaleMiles} mile scale`}><rect x="-15" y="-31" width={scaleWidth + 30} height="55" rx="3" fill="#faf3e3" opacity=".95" /><path d={`M0 -6 V4 H${scaleWidth} V-6`} fill="none" stroke="#23474b" strokeWidth="3" /><text x={scaleWidth / 2} y="-13" textAnchor="middle" fill="#23474b" fontSize="18">{scaleMiles} mi</text></g>
          <g aria-hidden="true" fill="#e9e1c8" transform="translate(1830 94)"><path d="M0 -28 9 8 0 2 -9 8Z" /><text y="-38" textAnchor="middle" fontSize="18" fontFamily="Georgia">N</text></g>
        </svg>
      </div>
      <div className="atlas-controls"><button onClick={() => zoom(1.5)} disabled={view.k >= 8} aria-label="Zoom in">+</button><button onClick={() => zoom(1 / 1.5)} disabled={view.k <= 1} aria-label="Zoom out">−</button><button onClick={() => setView({ x: 0, y: 0, k: 1 })}>Whole world</button></div>
      {measurePoints.length > 0 && <div className={styles.rulerReadout} role="status">{measuredMiles === null ? "Start set · right-click the destination" : <><strong>{measuredMiles.toLocaleString("en-US", { maximumFractionDigits: 1 })} miles</strong><button onClick={() => atlasRoot.current?.querySelector("#mizan-travel-title")?.scrollIntoView({ block: "start", behavior: "instant" })}>See travel times ↓</button></>}</div>}
      <section id="atlas-place-details" className={`atlas-detail ${styles.detail}`} data-open={panelOpen} aria-labelledby="atlas-place-title" aria-hidden={!panelOpen} inert={!panelOpen}>
        <div className="atlas-detail-heading"><p className="book-eyebrow">{sourcePlace?.kind ?? "Story place"}</p><button ref={closeButton} onClick={close} aria-label="Close place details">Close <span aria-hidden="true">×</span></button></div>
        <div className="atlas-detail-body" key={selected}>
          <h2 id="atlas-place-title">{title}</h2>
          {panelOpen && art && <figure className={styles.locationArt}><a href={art.src} target="_blank" rel="noreferrer" aria-label={`Open full picture: ${art.alt}`}><Image key={art.src} src={art.src} alt={art.alt} width={art.width} height={art.height} sizes="(max-width: 700px) 90vw, 480px" /></a><figcaption>{art.caption}. Select the picture to open it full size.</figcaption></figure>}
          {atlasNote && <div className={styles.atlasNotes}><h3>{sourcePlace?.kind === "person" ? "Role & authority" : "Area & control"}</h3><ReactMarkdown>{atlasNote.replace(/^# .+\r?\n+/, "").replace(/^Basis: .+$/m, "")}</ReactMarkdown><p><Link href={`/library/atlas-notes/${atlasNoteId}`}>Open these map notes →</Link></p><p><Link href={`/library/story/area-development${outlineAnchor}`}>Areas to think about in the outline →</Link></p></div>}
          {sourcePlace?.terrain && <div className={styles.terrainStats}><p className={styles.badge}>Saved terrain & climate</p><dl><dt>Elevation / depth</dt><dd>{elevationFeet(sourcePlace.terrain.height).toLocaleString()} ft</dd><dt>Model temperature</dt><dd>{Math.round(sourcePlace.terrain.temperatureC * 9 / 5 + 32)}°F / {sourcePlace.terrain.temperatureC}°C</dd><dt>Model precipitation</dt><dd>{sourcePlace.terrain.precipitationMm.toLocaleString()} mm</dd><dt>Biome</dt><dd>{terrain.biomes[sourcePlace.terrain.biome]}</dd></dl><p>Nearest source cell to this marker. Regional anchors do not summarize the climate of an entire region.</p></div>}
          {storyPlace && <><p className={styles.badge}>Current story</p><p className="atlas-tagline">{storyPlace.tagline}</p><p>{storyPlace.description}</p><Link href={`/library/places/${storyPlace.id}`}>Open the current place dossier →</Link>
            {storyPlace.appearsIn && <><h3>Read the story here</h3>{storyPlace.appearsIn.map((ref, i) => { const chapter = getChapter(ref.chapter); return chapter && <Link key={i} href={`/chapters/${chapter.slug}${ref.scene ? `?scene=${ref.scene}` : ""}`}>{ref.label ?? chapter.title} →</Link>; })}</>}
          </>}
          {sourceId === "region-6" && <p className={styles.sourceNote}>The original map names this region “Cathara” and its inland capital Tijara. It anchors the wider setting here; the current coastal city of Carthara and its districts still need exact sites.</p>}
          {sourceId === "region-4" && <p className={styles.sourceNote}>The author placed Tengeri in this former “Leonin Tribes” region, southwest of Carthara. The current refugee-camp history supersedes the old nomadic-homeland account. This is a regional anchor, not a surveyed camp.</p>}
          {!sourcePlace && storyPlace && <p className={styles.sourceNote}>This place is in the story, but its position is not identified in the Mizan file yet.</p>}
          {sourcePlace?.kind === "person" && <p className={styles.sourceNote}>This person’s marker comes from the early map. It does not establish their current home or a chapter event.</p>}
          {linkedCharacter && <Link href={`/library/characters/${linkedCharacter.id}`}>Read {linkedCharacter.name}’s current profile →</Link>}
          {sourcePlace && <div className={styles.sourceLore}><p className={styles.badge}>Early world notes · 2023</p>
            {note ? <><ReactMarkdown>{note.replace(/^# .+\n+/, "")}</ReactMarkdown><Link href={`/library/${sourcePlace.loreSlug}`}>Open this lore as a full page →</Link></> : <p>The 2023 map preserves this {sourcePlace.kind}’s name and position without a substantial written source note.</p>}
            {sourcePlace.regionId && mizanById[sourcePlace.regionId] && <button className={styles.textButton} onClick={(e) => pick(sourcePlace.regionId!, e.currentTarget)}>Explore {mapName(mizanById[sourcePlace.regionId])} →</button>}
          </div>}
        </div>
      </section>
    </div>
    <div className={styles.legend}>
      {layer === "elevation" && <p><span style={{ background: "linear-gradient(90deg,#135575,#b5c69a,#a18a75,#f6f2e7)" }} /> Sea depths → lowlands → highlands → peaks · saved heights, shaded relief</p>}
      {layer === "temperature" && <p><span style={{ background: "linear-gradient(90deg,#343d83,#d1e1da,#e9d490,#933d34)" }} /> −38°C / −36°F → 36°C / 97°F · model temperature</p>}
      {layer === "precipitation" && <p><span style={{ background: "linear-gradient(90deg,#e5d0a0,#79b4ba,#252d58)" }} /> 0 → 25,500 mm · saved model precipitation</p>}
      {layer === "biomes" && <div className={styles.biomeLegend}>{terrain.biomes.map((name, i) => <span key={name}><i style={{ background: terrain.biomeColors[i] }} />{name}</span>)}</div>}
    </div>
    <p className={styles.probe} role="status">{probeValue ? `Terrain at selected point: ${elevationFeet(probeValue.height).toLocaleString()} ft · ${Math.round(probeValue.temperatureC * 9 / 5 + 32)}°F · ${probeValue.precipitationMm.toLocaleString()} mm precipitation · ${terrain.biomes[probeValue.biome]}` : probeError ? "Terrain probing could not load. Saved climate values remain available on each place." : "Click open terrain to inspect its elevation, temperature, precipitation, and biome."}</p>
    <MizanTravel points={measurePoints} setPoints={setMeasurePoints} measuring={measuring} setMeasuring={(v) => { setMeasuring(v); setPanelOpen(false); }} crossesWater={crossesWater} />
    <p className="atlas-caption">Mizan’s coastlines, islands, region shapes, and source markers come from your November 2023 map. Colors distinguish source regions; they do not settle present borders or political control. <Link href="/library/geography-reconciliation">Geography & current decisions →</Link></p>
    {route && <p className="atlas-caption">Hanno’s travels: Carthara → Tengeri Wastes → Sidrat Al Muntaha → Lysandria. Regional anchors show narrative order, not exact roads, ports, or distances.</p>}
    <div className={styles.explorer} id="mizan-directory">
      <div className={styles.explorerHeading}><div><p className="book-eyebrow">The places, the people, the possibilities</p><h2>Explore the world notes</h2></div><label className={styles.search}>Search Mizan<input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="A place, a person, a piece of lore…" /></label></div>
      <div className={styles.filters} aria-label="Filter map entries">{categories.map(([id, label]) => <button key={id} aria-pressed={category === id} onClick={() => setCategory(id)}>{label}<span>{id === "all" ? mizan.places.length : mizan.places.filter((p) => p.kind === id).length}</span></button>)}</div>
      <p className={styles.count} role="status">{results.length} {results.length === 1 ? "entry" : "entries"}{query ? ` matching “${query}”` : " in the atlas"}</p>
      <div className={styles.entries}>{results.map((p) => <button key={p.id} aria-pressed={sourceId === p.id && panelOpen} onClick={(e) => pick(p.id, e.currentTarget)}>{mapPictures[p.id] && <Image className={styles.entryPicture} src={mapPictures[p.id].src} alt="" width={mapPictures[p.id].width} height={mapPictures[p.id].height} sizes="(max-width: 700px) 90vw, 300px" />}<span className={styles.entryKind}>{p.kind}{atlasNotes[p.id] ? " · new map notes" : p.loreSlug ? " · lore available" : " · map entry"}</span><strong>{mapName(p)}</strong><span className={styles.entryAction}>Explore →</span></button>)}</div>
      {!results.length && <p>No matching entries. Try another name or search term.</p>}
    </div>
    <nav className={`atlas-directory ${styles.storyDirectory}`} aria-label="Story places"><h2>Places in the current story</h2><p>The novel’s places keep their chapter links and current dossiers. Their local geography can develop alongside the wider world.</p><div className="atlas-place-list">{world.map((p) => <button key={p.id} aria-pressed={selected === p.id && panelOpen} onClick={(e) => pick(p.id, e.currentTarget)}>{p.name}<span>{storyAnchors[p.id] ? "Region located · local site open" : "Position to develop"}</span></button>)}</div></nav>
  </div>;
}

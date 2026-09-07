"use client";

import { useState } from "react";
import { mizan, mapName } from "@/content/mizan";
import { distanceMiles, travelDefaults, travelEstimate, type MapPoint } from "@/lib/mizan-measure";
import styles from "./MizanAtlas.module.css";

export function MizanTravel({ points, setPoints, measuring, setMeasuring, crossesWater }: {
  points: MapPoint[]; setPoints: (p: MapPoint[]) => void;
  measuring: boolean; setMeasuring: (v: boolean) => void; crossesWater: boolean;
}) {
  const [modes, setModes] = useState(travelDefaults);
  const signature = JSON.stringify(points);
  const [selection, setSelection] = useState({ from: "", to: "", signature });
  const placeAt = (p: MapPoint | undefined) => p ? mizan.places.find((place) => place.x === p.x && place.y === p.y)?.id ?? "" : "";
  const from = selection.signature === signature ? selection.from : placeAt(points[0]);
  const to = selection.signature === signature ? selection.to : placeAt(points[1]);
  const miles = points.length === 2 ? distanceMiles(points[0], points[1]) : null;
  const number = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 1 });
  function choose(start: string, end: string) {
    const a = mizan.places.find((p) => p.id === start), b = mizan.places.find((p) => p.id === end);
    const next = a && b ? [{ x: a.x, y: a.y }, { x: b.x, y: b.y }] : [];
    setSelection({ from: start, to: end, signature: JSON.stringify(next) });
    setPoints(next);
  }
  return <section className={styles.travel} aria-labelledby="mizan-travel-title">
    <div className={styles.explorerHeading}><div><p className="book-eyebrow">Across Mizan</p><h2 id="mizan-travel-title">How long is the journey?</h2></div><button className={styles.modeButton} aria-pressed={measuring} onClick={() => setMeasuring(!measuring)}>{measuring ? "Finish selecting points" : "Select points on the map"}</button></div>
    <p>Right-click a starting point, then a destination. On a phone, choose “Select points” and tap twice. You can also choose named places below.</p>
    <div className={styles.endpoints}>{[["From", from], ["To", to]].map(([label, value], i) => <label key={label}>{label}<select aria-label={label} value={value} onChange={(e) => choose(i === 0 ? e.target.value : from, i === 1 ? e.target.value : to)}><option value="">Choose a map entry</option>{mizan.places.map((p) => <option key={p.id} value={p.id}>{mapName(p)} · {p.kind}</option>)}</select></label>)}<button className={styles.modeButton} onClick={() => { setPoints([]); setSelection({ from: "", to: "", signature: "[]" }); }}>Clear measurement</button></div>
    <p className={styles.distance} role="status">{miles !== null ? <><strong>{number(miles)} miles</strong><span>{number(miles * 1.609344)} km · straight-line map distance</span></> : points.length ? "Starting point set. Choose the destination." : "Choose two points to measure a journey."}</p>
    {miles !== null && <>
      <div className={styles.travelTable}><table><caption>Travel estimates — adjust each assumption</caption><thead><tr><th>Travel by</th><th>Speed (mph)</th><th>Hours / day</th><th>Moving time</th><th>Travel days</th></tr></thead><tbody>{modes.map((mode, i) => {
        const estimate = travelEstimate(miles, mode.speed, mode.hoursPerDay);
        return <tr key={mode.id}><th scope="row">{mode.name}</th><td><input aria-label={`${mode.name} speed in miles per hour`} type="number" min="0.1" max="200" step="0.1" value={mode.speed || ""} onChange={(e) => setModes(modes.map((m, n) => n === i ? { ...m, speed: Number(e.target.value) } : m))} /></td><td><input aria-label={`${mode.name} travel hours per day`} type="number" min="1" max="24" value={mode.hoursPerDay || ""} onChange={(e) => setModes(modes.map((m, n) => n === i ? { ...m, hoursPerDay: Number(e.target.value) } : m))} /></td><td>{estimate ? `${number(estimate.hours)} hours` : "Check inputs"}</td><td>{estimate ? number(estimate.days) : "—"}</td></tr>;
      })}</tbody></table></div>
      {crossesWater && <p className={styles.sourceNote}>This straight line crosses water. Walking, horse, and driving times only make sense for a viable land route or a journey with crossings arranged.</p>}
      <p className={styles.sourceNote}>These are planning estimates using your speeds and daily travel hours. The ruler does not find roads or navigable sea routes, or add penalties for slopes, weather, borders, overnight stops, or changing horses. A boat route may need to go around land. “Driving” is a comparison option, not an adopted technology in the story.</p>
    </>}
  </section>;
}

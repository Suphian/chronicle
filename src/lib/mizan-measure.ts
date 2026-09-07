import terrain from "@/content/mizan-terrain.json";

export type MapPoint = { x: number; y: number };
export const travelDefaults = [
  { id: "walking", name: "Walking", speed: 3, hoursPerDay: 8 },
  { id: "horse", name: "Horse", speed: 4, hoursPerDay: 8 },
  { id: "boat", name: "Boat", speed: 6, hoursPerDay: 12 },
  { id: "driving", name: "Driving", speed: 30, hoursPerDay: 8 },
];
export function distanceMiles(a: MapPoint, b: MapPoint) {
  return Math.hypot(b.x - a.x, b.y - a.y) * terrain.distanceScale;
}
export function travelEstimate(miles: number, speedMph: number, hoursPerDay: number) {
  if (!Number.isFinite(miles) || miles < 0 || !Number.isFinite(speedMph) || speedMph <= 0 || !Number.isFinite(hoursPerDay) || hoursPerDay <= 0 || hoursPerDay > 24) return null;
  const hours = miles / speedMph;
  return { hours, days: hours / hoursPerDay };
}
export function elevationFeet(h: number) {
  const meters = h >= 20 ? (h - 18) ** terrain.heightExponent : h > 0 ? (h - 20) / h * 50 : -990;
  return Math.round(meters * 3.281);
}
export function terrainAt(data: Uint8Array, p: MapPoint) {
  const x = Math.min(terrain.probeWidth - 1, Math.max(0, Math.floor(p.x / terrain.probeStep)));
  const y = Math.min(terrain.probeHeight - 1, Math.max(0, Math.floor(p.y / terrain.probeStep)));
  const index = (y * terrain.probeWidth + x) * 4;
  return { height: data[index], temperatureC: data[index + 1] - 128, precipitationMm: data[index + 2] * 100, biome: data[index + 3] };
}

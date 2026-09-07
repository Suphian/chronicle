import source from "./mizan-source.json";

export type MizanKind = "region" | "settlement" | "landmark" | "person";
export interface MizanPlace {
  id: string;
  name: string;
  kind: MizanKind;
  x: number;
  y: number;
  sourceId: string;
  regionId?: string;
  loreSlug: string;
  terrain: { height: number; temperatureC: number; precipitationMm: number; biome: number };
}
export const mizan = { ...source, places: source.places as MizanPlace[] };
export const mizanById = Object.fromEntries(mizan.places.map((p) => [p.id, p]));

/** Region anchors are not surveyed city, household or camp coordinates. */
export const storyAnchors: Record<string, string> = {
  carthara: "region-6",
  "carthara-harbor": "region-6",
  "carthara-garrison": "region-6",
  "numarius-fields": "region-6",
  "tengeri-wastes": "region-4",
  "sidrat-al-muntaha": "region-3",
  lysandria: "region-1",
};
export const regionStory: Record<string, string> = {
  "region-6": "carthara",
  "region-4": "tengeri-wastes",
  "region-3": "sidrat-al-muntaha",
  "region-1": "lysandria",
};
export const sourceCharacters: Record<string, { id: string; name: string }> = {
  marker8: { id: "hanno", name: "Hanno" },
  marker10: { id: "chuluun", name: "Chuluun" },
  marker12: { id: "numarius", name: "Numarius" },
  marker13: { id: "alethea", name: "Alethea" },
};
export function mapName(place: MizanPlace) {
  return place.id === "region-4" ? "Tengeri Wastes" : place.name;
}

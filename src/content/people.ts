import { codex } from "./codex";
import { mapName, mizan, mizanById, sourceCharacters } from "./mizan";

export type CharacterImportance = "major" | "minor";
export type CharacterStatus = "Current draft" | "Imported lore" | "Proposed";
export interface PersonListing {
  id: string;
  name: string;
  group: string;
  importance: CharacterImportance;
  status: CharacterStatus;
}

// Reading emphasis in this draft, not a permanent judgment of a person's worth.
const majorCharacters = new Set(["hanno", "dyia", "adil", "amara", "alethea", "virello", "numarius", "chuluun"]);
const groups: Record<string, string> = { hanno: "The Averroes family", dyia: "The Averroes family", adil: "The Averroes family", amara: "The Averroes family", alethea: "Family & Lysandria", virello: "Carthara · The apprenticeship", numarius: "Carthara · The Three Seats", corvo: "Carthara · The Three Seats", vael: "Carthara · The Three Seats", phylios: "Lysandria", chuluun: "The Leonin · Tengeri Wastes", iskandar: "The old histories · Bakhtar", rukhsana: "The old histories · Bakhtar" };

// These names already exist in the atlas proposals. Their offices remain proposed.
export const proposedPeople = [
  ["leora-venn", "First Syndic Leora Venn", "Zeon", "region-2"],
  ["safiya-nural", "Queen Safiya Nural", "Sidrat Al Muntaha", "region-3"],
  ["samira-daran", "Queen Samira Daran", "Ruhania", "region-5"],
  ["wen-suyin", "Empress Wen Suyin", "Yáolán", "region-7"],
  ["ayame-seiran", "Sovereign Ayame Seiran", "Hikari no Kuni", "region-9"],
  ["neris-thale", "Lady Neris Thale", "The Groves · Fairy", "region-12"],
  ["maelin-rusk", "Speaker Maelin Rusk", "League of Free Houses · Heretics", "region-15"],
  ["sava-orun", "Governor Sava Orun", "Hemaris · V B", "region-18"],
  ["veyra-sen", "Warden Veyra Sen", "Bingraleton · V W", "region-19"],
  ["nahla-qadir", "Governor Nahla Qadir", "Al-Rutbah · Ruhania", "burg-9"],
  ["farid-nassar", "Governor Farid Nassar", "Tijara · Cathara", "burg-10"],
  ["ren-tal", "Governor Ren Tal", "Sipopos · Yáolán", "burg-11"],
  ["salma-vey", "Gate Magistrate Salma Vey", "Majlis Gate", "burg-13"],
  ["damaris-theron", "Marshal Damaris Theron", "Titanus", "burg-14"],
  ["ione-sere", "Chancellor Ione Sere", "Pallas", "burg-15"],
  ["cassia-meret", "Lady Cassia Meret", "Lustria", "burg-16"],
  ["saran-del", "Provincial Steward Saran Del", "Egeleukemi · Zorig", "burg-22"],
  ["toma-seki", "Bridge Warden Toma Seki", "Castford · Hikari no Kuni", "burg-26"],
  ["edda-voss", "Warden Edda Voss", "Stanskirk", "burg-28"],
  ["mara-velen", "Duchess Mara Velen", "Lenaicorint · Juklena · Esmos", "burg-32"],
  ["orena-vask", "Lady Orena Vask", "Henekionti · Suriris", "burg-36"],
  ["idrane-qasem", "Desert Governor Idrane Qasem", "Qalb Al-Sahra · Ruhania", "burg-41"],
  ["tarek-solan", "Highland Steward Tarek Solan", "Oncheracra · Ruhania", "burg-42"],
  ["amineh-rafi", "Chief Librarian Amineh Rafi", "The Grand Codexium · Ruhania", "marker47"],
] as const;

export const people: PersonListing[] = [
  ...codex.filter((entry) => entry.kind === "person").map((entry): PersonListing => ({
    id: entry.id, name: entry.name, group: groups[entry.id] ?? "The Chronicle",
    importance: majorCharacters.has(entry.id) ? "major" : "minor", status: "Current draft",
  })),
  ...mizan.places.filter((place) => place.kind === "person" && !sourceCharacters[place.id]).map((place): PersonListing => ({
    // Retain the source marker ID so imports and existing atlas links stay stable.
    id: place.id,
    name: place.id === "marker30" ? "Bilegt Mergen" : place.name.replace(/ \(meaning .+\)$/, ""),
    group: mizanById[place.regionId ?? ""] ? mapName(mizanById[place.regionId!]) : "Mizan atlas",
    importance: "minor", status: "Imported lore",
  })),
  ...proposedPeople.map(([id, name, group]): PersonListing => ({ id, name, group, importance: "minor", status: "Proposed" })),
];

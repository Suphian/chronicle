/** Artwork is shared across returning places; placement is curated against the manuscript. */
export interface PlateArtwork {
  src: string;
  alt: string;
  caption: string;
  number: string;
  width: number;
  height: number;
}

export const plateArtwork = {
  "carthara-market": { src: "/images/plates/carthara-market.webp", caption: "Carthara · Beneath the market awnings", alt: "Ink and watercolor: Fruit stalls beneath red awnings, with carved arcades, hanging gardens, and green domes rising above Carthara.", width: 1024, height: 1536, number: "01" },
  "apothecary": { src: "/images/plates/apothecary.webp", caption: "Carthara · An apothecary’s workshop", alt: "Ink and watercolor: Ceramic vessels, brass balances, carved wooden screens, and an arched passage into a fountain courtyard.", width: 1024, height: 1536, number: "02" },
  "pottery-room": { src: "/images/plates/pottery-room.webp", caption: "Carthara · The pottery room", alt: "Ink and watercolor: A potter’s wheel beside a window, with blue-banded jugs, shelves, clay, and tools in a lived-in workshop.", width: 1536, height: 1024, number: "03" },
  "petition-court": { src: "/images/plates/petition-court.webp", caption: "Carthara · The petition court", alt: "Ink and watercolor: Petitioners waiting beneath a richly carved court arcade, with clerks behind a long table.", width: 1536, height: 1024, number: "04" },
  "unfinished-bowls": { src: "/images/plates/unfinished-bowls.webp", caption: "Amara’s work · Five unfinished bowls", alt: "Ink and watercolor: Five uneven handmade clay bowls on a worn wooden bench, with fingerprints and tool marks visible.", width: 1254, height: 1254, number: "05" },
  "case-notebook": { src: "/images/plates/case-notebook.webp", caption: "The healer’s table · A record of care", alt: "Ink and watercolor: An open case notebook beside ceramic vessels and brass weights; its handwritten marks are indistinct.", width: 1536, height: 1024, number: "06" },
  "clinic-courtyard": { src: "/images/plates/clinic-courtyard.webp", caption: "Carthara · A place to wait and be treated", alt: "Ink and watercolor: Patients waiting on benches around an airy clinic courtyard, with clean cloths, water jugs, and shaded treatment rooms.", width: 1536, height: 1024, number: "07" },
  "lantern-alley": { src: "/images/plates/lantern-alley.webp", caption: "Carthara · After the lamps are lit", alt: "Ink and watercolor: Amber lanterns illuminate a narrow night alley lined with carved masonry, wooden screens, and hanging fabric.", width: 1536, height: 1024, number: "08" },
  "sealed-cargo": { src: "/images/plates/sealed-cargo.webp", caption: "Carthara · Cargo at the harbor", alt: "Ink and watercolor: Sealed ceramic bottles cushioned in straw inside a wooden shipping crate, with cord and brass scales nearby.", width: 1536, height: 1024, number: "09" },
  "courtyard-garden": { src: "/images/plates/courtyard-garden.webp", caption: "Carthara · The garden at dusk", alt: "Ink and watercolor: A quiet walled garden with a small fountain, climbing plants, red and yellow flowers, a bench, and a wooden gate.", width: 1536, height: 1024, number: "10" },
  "threshold": { src: "/images/plates/threshold.webp", caption: "Carthara · A threshold", alt: "Ink and watercolor: A partly open wooden door, its carved stone surround and worn threshold lit by a warm interior light.", width: 1024, height: 1536, number: "11" },
  "bakhtar-cliffs": { src: "/images/plates/bakhtar-cliffs.webp", caption: "Bakhtar · The cliff paths", alt: "Ink and watercolor: Monumental cliff stairs and homes carved into pale rock, with small figures moving between inhabited terraces.", width: 1536, height: 1024, number: "12" },
  "highland-council": { src: "/images/plates/highland-council.webp", caption: "Bakhtar · The valley council", alt: "Ink and watercolor: A woman taking part in a highland gathering beneath a cliff arcade, with grain sacks and seated listeners.", width: 1536, height: 1024, number: "13" },
  "tengeri-shelters": { src: "/images/plates/tengeri-shelters.webp", caption: "Tengeri · Lives within the shelters", alt: "Ink and watercolor: Leonin adults and children repairing shelters, tending daily work, and mending cloth in a crowded refugee settlement.", width: 1536, height: 1024, number: "14" },
  "lake-siraj": { src: "/images/plates/lake-siraj.webp", caption: "Sidrat Al Muntaha · Lake Siraj", alt: "Ink and watercolor: Luminous plants, terraces, and bridges around a still lake at dusk, rendered in fine ink and muted watercolor.", width: 1536, height: 1024, number: "15" },
  "lysandria-harbor": { src: "/images/plates/lysandria-harbor.webp", caption: "Lysandria · The island of two mountains", alt: "Ink and watercolor: An island seen across the harbor, with two immense mountains rising behind white courts, terraces, and waterworks.", width: 1536, height: 1024, number: "16" },
  "three-seats-hall": { src: "/images/plates/three-seats-hall.webp", caption: "Carthara · The hall of the Three Seats", alt: "Ink and watercolor: Three equal chairs on a civic dais, surrounded by carved architecture, clerks’ tables, and papers.", width: 1536, height: 1024, number: "17" },
  "banquet-court": { src: "/images/plates/banquet-court.webp", caption: "Carthara · The banquet court", alt: "Ink and watercolor: An opulent colonnaded dining court with water channels, patterned textiles, laden tables, and distant guests.", width: 1536, height: 1024, number: "18" },
  "moonlit-wedding": { src: "/images/plates/moonlit-wedding.webp", caption: "The Moonlit Isle · A wedding by the water", alt: "Ink and watercolor: A couple seen from behind in a moonlit shore garden, with a red and yellow flower and the sea beyond.", width: 1536, height: 1024, number: "19" },
  "zaharaz-staff": { src: "/images/plates/zaharaz-staff.webp", caption: "Zaharaz · A traveling staff", alt: "Ink and watercolor: A plain wooden staff with a worn grip and blunt metal ferrule rests beside a travel bag and books.", width: 1254, height: 1254, number: "20" },
} satisfies Record<string, PlateArtwork>;

export type PlateId = keyof typeof plateArtwork;
export interface BookPlate extends PlateArtwork {
  artwork: PlateId;
  layout: "folio" | "wide" | "vignette";
  /** Number of complete paragraphs read before this illustration or illustrated passage. */
  afterParagraph: number;
}

function plate(artwork: PlateId, layout: BookPlate["layout"], afterParagraph: number): BookPlate {
  return { ...plateArtwork[artwork], artwork, layout, afterParagraph };
}

/** Multiple plates may belong to a scene; keep them in paragraph order. Captions add no events. */
export const bookPlates: Record<string, BookPlate[]> = {
  "the-conqueror/the-graveyard-of-empires": [plate("bakhtar-cliffs", "wide", 5)],
  "the-conqueror/iskandar": [plate("highland-council", "wide", 9)],
  "market-awnings/the-fruit-stall": [plate("carthara-market", "folio", 0)],
  "market-awnings/above-the-pottery-shop": [plate("pottery-room", "wide", 3)],
  "market-awnings/the-sentencing": [plate("petition-court", "wide", 4)],
  "bitter-apprenticeship/a-world-unto-itself": [plate("apothecary", "folio", 0)],
  "bitter-apprenticeship/respect-every-ingredient": [plate("case-notebook", "vignette", 8)],
  "bitter-apprenticeship/the-alleys": [plate("lantern-alley", "wide", 2)],
  "journeys/tengeri-wastes": [plate("tengeri-shelters", "wide", 12)],
  "journeys/lake-siraj": [plate("lake-siraj", "wide", 3)],
  "journeys/toward-lysandria": [plate("lysandria-harbor", "wide", 2)],
  "gift-of-lysandria/the-spear": [plate("zaharaz-staff", "vignette", 6)],
  "gift-of-lysandria/the-elysian-flower": [plate("moonlit-wedding", "wide", 5)],
  "gift-of-lysandria/hand-in-hand": [plate("lysandria-harbor", "wide", 6)],
  "the-cure/return": [plate("apothecary", "vignette", 4)],
  "the-cure/trials": [plate("case-notebook", "vignette", 4)],
  "the-cure/the-savior-of-carthara": [plate("clinic-courtyard", "wide", 2)],
  "shadows-and-accusations/false-kindness": [plate("unfinished-bowls", "vignette", 2)],
  "shadows-and-accusations/whispers": [plate("case-notebook", "vignette", 4)],
  "shadows-and-accusations/the-shipment": [plate("sealed-cargo", "wide", 3)],
  "rising-influence/the-heart-of-carthara": [plate("clinic-courtyard", "wide", 6)],
  "rising-influence/the-clinic-ledger": [plate("case-notebook", "vignette", 17)],
  "rising-influence/courtesies": [plate("banquet-court", "wide", 2)],
  "a-dark-turn/fertilizer": [plate("banquet-court", "wide", 11)],
  "a-dark-turn/elysian-dust": [plate("courtyard-garden", "wide", 2)],
  "a-dark-turn/a-network-of-shadows": [plate("sealed-cargo", "vignette", 3)],
  "shadows-closing-in/dead-ends": [plate("sealed-cargo", "wide", 3)],
  "shadows-closing-in/numarius-stirs": [plate("three-seats-hall", "wide", 14)],
  "shadows-closing-in/alethea-watches": [plate("case-notebook", "vignette", 3)],
  "the-flower-in-her-hair/the-clinic": [plate("clinic-courtyard", "wide", 3)],
  "the-flower-in-her-hair/the-garden": [plate("courtyard-garden", "wide", 7)],
  "the-flower-in-her-hair/the-door-again": [plate("threshold", "vignette", 5)],
};

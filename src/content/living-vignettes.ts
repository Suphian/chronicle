import { plateArtwork, type PlateId } from "./illustrations";

export type LivingArtworkId = PlateId | "lysandria-terrace";

export function livingArtwork(id: LivingArtworkId) {
  if (id === "lysandria-terrace") return {
    src: "/images/living/lysandria-terrace.webp",
    alt: "A sunlit pottery terrace above turquoise water, with blue-banded jugs, leafy vines, white coastal homes, and Lysandria’s two enormous mountains beneath summer clouds.",
    title: "A moment in Lysandria",
    caption: "Sea air through an open curtain. A potter’s work waiting in the sun.",
    note: "Lysandria · An imagined pottery terrace",
    width: 1672, height: 941, curtain: true, night: false,
  };
  const plate = plateArtwork[id];
  return { ...plate, title: plate.caption, caption: "", note: "Ink & watercolor · The Chronicle", curtain: false, night: ["lantern-alley", "lake-siraj", "courtyard-garden", "moonlit-wedding"].includes(id) };
}

/** Atmospheric artwork placements; paragraph counts are one-based. */
export const livingVignettes: Record<string, { artwork: "lysandria-terrace"; afterParagraph: number }> = {
  "gift-of-lysandria/ancient-guardians": { artwork: "lysandria-terrace", afterParagraph: 2 },
};

/** Animate an existing plate in place, keeping its manuscript position and caption. */
export const livingBookPlates: Record<string, PlateId> = {
  "the-conqueror/the-graveyard-of-empires": "bakhtar-cliffs",
  "market-awnings/above-the-pottery-shop": "pottery-room",
  "bitter-apprenticeship/the-alleys": "lantern-alley",
  "journeys/lake-siraj": "lake-siraj",
  "the-cure/the-savior-of-carthara": "clinic-courtyard",
  "shadows-and-accusations/the-shipment": "sealed-cargo",
  "rising-influence/courtesies": "banquet-court",
  "a-dark-turn/hollow": "courtyard-garden",
  "shadows-closing-in/reckoning": "lantern-alley",
  "the-flower-in-her-hair/a-stranger-at-the-table": "courtyard-garden",
};

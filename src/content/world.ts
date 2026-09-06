import type { WorldLocation } from "./types";

/**
 * Locations on the world map. Coordinates are on a 1200 x 800 canvas
 * (see src/components/WorldMap.tsx). Add new places here and they appear
 * as pins automatically.
 */
export const world: WorldLocation[] = [
  {
    id: "ashvale",
    name: "Ashvale",
    tagline: "A hamlet that survives only in memory.",
    description:
      "A highland village of forty souls in the Grey Reaches. Sheep, peat fires, and a small shrine to no god in particular. It burned in a single night. The ground there still refuses to grow anything but heather.",
    x: 300,
    y: 220,
    type: "ruin",
    appearsIn: [{ chapter: "prologue", scene: "the-fire", label: "The night it burned" }],
  },
  {
    id: "thornmere",
    name: "Thornmere",
    tagline: "The Old Oak and the oath sworn beneath it.",
    description:
      "A drowned forest where the trees stand knee-deep in still black water. The Old Oak at its heart is older than any kingdom. Druids, hedge-witches, and the occasional lost paladin come here to make promises.",
    x: 520,
    y: 420,
    type: "wild",
    appearsIn: [{ chapter: "prologue", scene: "the-oath", label: "The oath" }],
  },
  {
    id: "vellmar",
    name: "Vellmar",
    tagline: "The city of a thousand lanterns.",
    description:
      "A river-port and trade capital built on seven bridges. Its guilds are rich, its watch is tired, and its lantern-lighters know more than any spymaster. Corvin arrives here at the start of the chronicle.",
    x: 820,
    y: 560,
    type: "city",
    appearsIn: [{ chapter: "prologue", scene: "vellmar", label: "Arrival" }],
  },
  {
    id: "grey-reaches",
    name: "The Grey Reaches",
    tagline: "Highlands of heather and old stone.",
    description:
      "Wind-scoured moors and broken hillforts. Few roads, fewer inns. The kind of country that makes people quiet.",
    x: 260,
    y: 130,
    type: "landmark",
  },
  {
    id: "sundering-sea",
    name: "The Sundering Sea",
    tagline: "Nothing that sails west comes back the same.",
    description:
      "The great western ocean. Its storms are said to have opinions.",
    x: 120,
    y: 560,
    type: "sea",
  },
];

export const worldById = Object.fromEntries(world.map((w) => [w.id, w])) as Record<
  string,
  WorldLocation
>;

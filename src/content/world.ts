import type { WorldLocation } from "./types";

/**
 * Locations on the world map. Coordinates are on a 1200 x 800 canvas
 * (see src/components/WorldMap.tsx). Add new places here and they appear
 * as pins automatically.
 */
export const world: WorldLocation[] = [
  {
    id: "carthara",
    name: "Carthara",
    tagline: "Markets, awnings, and a thousand quiet debts.",
    description:
      "A sun-scorched trade city on the southern coast, ruled by Lord Numarius and taxed to the bone. Its markets are loud, its alleys are quiet, and beneath both runs the Silken Chain. Hanno was born here, cured it once, and is now poisoning it.",
    x: 600,
    y: 540,
    type: "city",
    appearsIn: [
      { chapter: "market-awnings", scene: "the-fruit-stall", label: "The fruit stall" },
      { chapter: "the-cure", scene: "return", label: "The return" },
      { chapter: "a-dark-turn", scene: "fertilizer", label: "The banquet" },
    ],
  },
  {
    id: "numarius-fields",
    name: "The Fields of Numarius",
    tagline: "Where debtors go, and do not come back.",
    description:
      "Endless plantations east of the city walls, worked by the indentured. Adil Averroes was taken here the morning his stall was seized. He died here, and was buried where he fell, to feed the crop.",
    x: 720,
    y: 610,
    type: "ruin",
    appearsIn: [{ chapter: "market-awnings", scene: "the-fields", label: "Adil is taken" }],
  },
  {
    id: "tengeri-wastes",
    name: "The Tengeri Wastes",
    tagline: "Wind-carved canyons and the Leonin clans.",
    description:
      "A barren country far to the east where the wind cuts canyons through jagged cliffs. The Leonin who live here taught Hanno to track, to survive, and to shoot arrows that sing.",
    x: 980,
    y: 300,
    type: "wild",
    appearsIn: [{ chapter: "journeys", scene: "tengeri-wastes", label: "Archery among the Leonin" }],
  },
  {
    id: "sidrat-al-muntaha",
    name: "Sidrat Al Muntaha",
    tagline: "Lake Siraj and the glowing roads.",
    description:
      "A land of luminous landscapes and sacred lakes. Beneath the soft light of Lake Siraj, master swordsmen teach that the blade and the mind must be balanced. Bioluminescent plants line moss-covered bridges.",
    x: 820,
    y: 170,
    type: "landmark",
    appearsIn: [{ chapter: "journeys", scene: "lake-siraj", label: "The sword" }],
  },
  {
    id: "bakhtar",
    name: "Bakhtar",
    tagline: "The graveyard of empires.",
    description:
      "Highlands north of the last road: villages cut into cliff faces, valleys that close like fists, caves that play flutes at night. Every empire that marched in broke here except one. Iskandar the conqueror is buried in a cave nobody will name. Amara came down from these mountains and never spoke of them.",
    x: 640,
    y: 270,
    type: "wild",
    appearsIn: [{ chapter: "the-conqueror", scene: "the-graveyard-of-empires", label: "The legend" }],
  },
  {
    id: "lysandria",
    name: "Lysandria",
    tagline: "Mountains, rare metals, and the phalanx.",
    description:
      "A rugged mountain kingdom whose warriors prize balance above all. General Phylios rules here. Hanno trained with the spear for five years, healed the general's son, and was given Zaharaz.",
    x: 300,
    y: 210,
    type: "landmark",
    appearsIn: [
      { chapter: "journeys", scene: "toward-lysandria", label: "The approach" },
      { chapter: "gift-of-lysandria", scene: "the-spear", label: "Zaharaz" },
    ],
  },
  {
    id: "moonlit-isle",
    name: "The Moonlit Isle",
    tagline: "Where the Elysian flower grows.",
    description:
      "A secluded island off the Lysandrian coast. Hanno and Alethea were married here under moonlight. He placed a red-and-yellow flower behind her ear that night, and recognised at once what else it could be used for.",
    x: 110,
    y: 340,
    type: "wild",
    appearsIn: [
      { chapter: "gift-of-lysandria", scene: "the-elysian-flower", label: "The wedding" },
      { chapter: "a-dark-turn", scene: "elysian-dust", label: "Elysian Dust" },
    ],
  },
];

export const worldById = Object.fromEntries(world.map((w) => [w.id, w])) as Record<
  string,
  WorldLocation
>;

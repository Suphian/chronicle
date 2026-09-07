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
      "A sun-scorched trade city on the southern coast, ruled by the Three Seats: Numarius holds the fields, Corvo the harbor, and Vael the garrison. Its markets are loud, its alleys are quiet, and beneath both runs the Silken Chain. Hanno was born here, cured it once, and is now poisoning it.",
    x: 580,
    y: 510,
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
      "Endless plantations east of the city walls, worked by the indentured. Idris Averroes was taken here the morning his stall was seized. He died here, and was buried where he fell, to feed the crop.",
    x: 720,
    y: 420,
    type: "ruin",
    appearsIn: [{ chapter: "market-awnings", scene: "the-fields", label: "Idris is taken" }],
  },
  {
    id: "tengeri-wastes",
    name: "The Tengeri Wastes",
    tagline: "Leonin refugee camps beneath the bombardment.",
    description:
      "Canyon camps far east of Carthara shelter Leonin driven from their homeland by the power now ruled under Numarius's name. Enslavement, enforced labor transfers, restricted movement, and repeated bombardment shape daily life. Displaced Leonin also live across the world, each carrying the lost home's flag. Camp councils, peace advocates, armed resistance, and diaspora networks disagree about the future. Chuluun is a displaced elder under a labor account himself; Hanno learns limited practical skills while helping his hosts.",
    x: 1000,
    y: 300,
    type: "landmark",
    appearsIn: [{ chapter: "journeys", scene: "tengeri-wastes", label: "Chuluun and the refugee camps" }],
  },
  {
    id: "sidrat-al-muntaha",
    name: "Sidrat Al Muntaha",
    tagline: "Lake Siraj and the glowing roads.",
    description:
      "A land of luminous landscapes and sacred lakes. Beneath the soft light of Lake Siraj, master swordsmen teach that the blade and the mind must be balanced. Bioluminescent plants line moss-covered bridges.",
    x: 820,
    y: 135,
    type: "landmark",
    appearsIn: [{ chapter: "journeys", scene: "lake-siraj", label: "The sword" }],
  },
  {
    id: "bakhtar",
    name: "Bakhtar",
    tagline: "The graveyard of empires.",
    description:
      "Highland cliff settlements, difficult routes, and caves with distinctive acoustics. Iskandar and Rukhsana's story survives in conflicting tellings. Earlier notes connect Amara's ancestry to Bakhtar, but her home is now established as the island of Lysandria; that lineage relationship remains unresolved.",
    x: 640,
    y: 215,
    type: "wild",
    appearsIn: [{ chapter: "the-conqueror", scene: "the-graveyard-of-empires", label: "The legend" }],
  },
  {
    id: "lysandria",
    name: "Lysandria",
    tagline: "An island beneath two enormous mountains.",
    description:
      "Amara's island home, dominated by two massive mountain peaks. Its settlements connect harbors, potters, healing rooms, and the households of General Phylios's soldiers. Hanno spends years studying here, gains modest self-defense skills, helps save the general's son, and receives Zaharaz, a travelling staff. He meets Alethea here. Map placement remains schematic.",
    x: 285,
    y: 285,
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
    y: 365,
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

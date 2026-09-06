import type { Chapter } from "../types";

export const aDarkTurn: Chapter = {
  slug: "a-dark-turn",
  order: 8,
  title: "A Dark Turn",
  subtitle: "Chapter Eight",
  summary:
    "At a banquet, Numarius tells the whole city what became of Hanno's father. That night, Hanno takes the flower from his wedding and begins turning it into Elysian Dust.",
  mood: "ember",
  when: "The breaking point",
  music: "/audio/ambient-ember.wav",
  scenes: [
    { id: "title", kind: "title", heading: "A Dark Turn", text: ["Chapter Eight"], mood: "ember" },
    {
      id: "hollow",
      heading: "Hollow",
      mood: "gold",
      ambient: "/audio/ambient-market.wav",
      text: [
        "Success does not quiet the anger. It feeds it. Every accolade is a reminder of the past Hanno has not avenged, and the glittering city feels hollow.",
      ],
    },
    {
      id: "fertilizer",
      heading: "Fertilizer in My Fields",
      mood: "ember",
      location: "carthara",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "The breaking point is a banquet. Numarius rises to celebrate Carthara's prosperity and, between compliments, belittles those he considers beneath him.",
        "He mentions a forgotten debtor whose only lasting contribution was as fertilizer in his fields. His cold eyes find Hanno's across the hall. He has always known exactly whose father he was describing.",
        "The elite laugh politely. Hanno stands frozen. Before the evening ends, Numarius orders several debtor families punished: children taken into labor, parents sent to the fields. A cruel echo of a morning Hanno has never stopped living.",
      ],
      quote: { text: "His only lasting contribution was as fertilizer in my fields.", by: "Lord Numarius" },
    },
    {
      id: "elysian-dust",
      heading: "Elysian Dust",
      mood: "void",
      location: "moonlit-isle",
      ambient: "/audio/ambient-night.wav",
      text: [
        "Hanno's hatred reignites into something he no longer tries to control.",
        "He remembers the flower he placed behind Alethea's ear, red and yellow, a symbol of love and harmony. He remembers what else it can do.",
        "With methodical precision he extracts from it a compound of devastating addictiveness. Euphoria, and an irresistible escape from reality, with a ruinous price. He names it Elysian Dust.",
      ],
    },
    {
      id: "a-network-of-shadows",
      heading: "A Network of Shadows",
      mood: "night",
      text: [
        "Quietly, he builds a network of seemingly unrelated merchants, each carrying legitimate goods with the Dust hidden inside. The merchants do not know what they carry. No thread leads back to him.",
        "His intent is exact: dismantle Numarius's empire from within, and expose the elite to the same ruin they permitted. He does not tell Alethea.",
        "As Elysian Dust seeps beneath Carthara's prosperity, Hanno feels a grim satisfaction. Across the city, a guard captain begins seeing cases of a drug no one can name, and resolves to find its source.",
      ],
    },
  ],
};

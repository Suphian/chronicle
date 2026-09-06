import type { Chapter } from "../types";

/**
 * A legend told before the story begins: the highlands nobody could hold,
 * the one man who did, and the blood that came down the mountain to Carthara.
 */
export const theConqueror: Chapter = {
  slug: "the-conqueror",
  order: 0,
  title: "The Conqueror",
  subtitle: "Chapter Zero · A Legend of the Highlands",
  summary:
    "North of the last road lies Bakhtar, where every empire breaks. One man took it, fell in love with it, and was abandoned there by fifty thousand soldiers. His blood came down the mountain to a pottery shop in Carthara.",
  mood: "storm",
  when: "Long before Hanno",
  status: "draft",
  music: "/audio/ambient-wind.wav",
  scenes: [
    { id: "title", kind: "title", heading: "The Conqueror", text: ["A Legend of the Highlands"], mood: "storm" },
    {
      id: "the-graveyard-of-empires",
      heading: "The Graveyard of Empires",
      mood: "storm",
      location: "bakhtar",
      text: [
        "North of Carthara, past the last road, the land rises into Bakhtar. Villages are cut into the cliff faces. Valleys close like fists.",
        "Every empire that marched in broke there. The sea-kings. The horse-lords of the east. The Lysandrian phalanx, once, before Lysandria learned better.",
        "The Bakhtari do not build cities. They have never had a decade of peace long enough to try. They build nothing that cannot be carried into a cave.",
      ],
    },
    {
      id: "the-flutes",
      heading: "The Flutes",
      mood: "night",
      ambient: "/audio/ambient-night.wav",
      text: [
        "At night the caves play. Flutes carved from the bone of the cliffs, blown in passages that carry sound for miles, so a song begun in one valley finishes in another.",
        "Outsiders hear it and turn back. The Bakhtari say the mountain is counting them.",
      ],
    },
    {
      id: "iskandar",
      heading: "Iskandar",
      mood: "gold",
      ambient: "/audio/ambient-ember.wav",
      text: [
        "Only one man ever took Bakhtar. Iskandar, the boy-king from the west, who had already taken everything else there was to take.",
        "He came with fifty thousand and fought for three years and lost more men in those valleys than in all his other wars together.",
        "He won, in the end, by learning the songs.",
      ],
    },
    {
      id: "rukhsana",
      heading: "Rukhsana",
      mood: "dawn",
      text: [
        "He fell in love with the people, and then with one of them. Rukhsana, a flute-player of the cliffs, elven-blooded, who had counted his army from a cave mouth on the first night and told him the number to his face.",
        "He married her in the highland way, underground, with the whole mountain listening. His generals called it madness. He began wearing their wool.",
      ],
      quote: { text: "He took the mountain. The mountain took him back.", by: "Bakhtari saying" },
    },
    {
      id: "the-mutiny",
      heading: "The Mutiny",
      mood: "void",
      text: [
        "When he ordered the march east, the army refused. They had followed him to the edge of the world. They would not follow him past it for a mountain wife.",
        "They marched home without him. Fifty thousand men, and not one stayed.",
      ],
    },
    {
      id: "he-stayed",
      heading: "He Stayed",
      mood: "ember",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "Iskandar stayed. He died in Bakhtar, of a fever or a knife. The song does not agree. He is buried in a cave nobody will name.",
        "The empire he built came apart within a year of his leaving it, which the Bakhtari consider the mountain's final word on empires.",
      ],
    },
    {
      id: "the-line",
      heading: "The Line",
      mood: "forest",
      location: "carthara",
      text: [
        "His line went on in the cliffs through Rukhsana, and thinned, and scattered, and came down at last out of the mountains to a pottery shop in Carthara.",
        "There a woman named Amara hummed the cave songs over the clay, and never told her sons what they were.",
        "Hanno carries the conqueror's blood, and the mountain's. He has never been there.",
      ],
    },
  ],
};

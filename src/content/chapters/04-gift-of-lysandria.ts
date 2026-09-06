import type { Chapter } from "../types";

export const giftOfLysandria: Chapter = {
  slug: "gift-of-lysandria",
  order: 4,
  title: "The Gift of Lysandria",
  subtitle: "Chapter Four",
  summary:
    "A general's son is dying. Hanno works through the night, and walks out of Lysandria with a spear called Zaharaz, a wife called Alethea, and a flower that can heal or kill.",
  mood: "storm",
  when: "Five years in the mountains",
  status: "draft",
  music: "/audio/ambient-wind.wav",
  scenes: [
    { id: "title", kind: "title", heading: "The Gift of Lysandria", text: ["Chapter Four"], mood: "storm" },
    {
      id: "ancient-guardians",
      heading: "Ancient Guardians",
      mood: "storm",
      location: "lysandria",
      text: [
        "The mountains of Lysandria loom like guardians of old secrets. The kingdom is famous for its warriors and for rare metals coveted by every alchemist alive. Hanno comes for the metals.",
        "General Phylios, grey-eyed, stern and fair, sees something else in him.",
      ],
      quote: {
        text: "True balance requires mastery of oneself. To grasp the materials you seek, you must first understand their origins and strength.",
        by: "General Phylios",
      },
    },
    {
      id: "the-spear",
      heading: "Zaharaz",
      mood: "gold",
      location: "lysandria",
      ambient: "/audio/ambient-ember.wav",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "Hanno trains beside the Lysandrian warriors, learning the spear. The rigor strengthens his body and sharpens his mind.",
        "Then one evening illness strikes Phylios's young son. The healers cannot cure it. Hanno works through the night, blending rare herbs, minerals, and extracts with delicate precision. By morning the boy is whole.",
        "Before the gathered Lysandrians, Phylios presents him with a double-bladed spear, its edges engraved with symbols of harmony and duality. Its name is Zaharaz. Read forwards or backwards, it is the same word.",
      ],
      quote: { text: "You have brought balance and healing to my family. Let it forever remind you of the harmony you have restored.", by: "General Phylios" },
    },
    {
      id: "alethea",
      heading: "Alethea",
      mood: "dawn",
      text: [
        "In the celebration afterwards, Hanno notices a young woman standing apart from the crowd, serene and captivating. Her name is Alethea. She is a healer, and the Lysandrians speak of her wisdom with something close to reverence.",
        "Their conversation flows without effort: harmony, healing, the complexities of a life. He feels a connection unlike anything he has known.",
        "In the weeks that follow, it deepens into love. She teaches him that true strength is not in the spear or the vial, but in understanding and compassion.",
        "What she fell in love with, she will say later, to no one, was a student. A man who worked through the night for a boy he did not know and wept when the fever broke. She would spend the rest of her life waiting for him to come back.",
      ],
    },
    {
      id: "the-elysian-flower",
      heading: "The Elysian Flower",
      mood: "night",
      location: "moonlit-isle",
      ambient: "/audio/ambient-night.wav",
      text: [
        "They are married in a quiet ceremony on a secluded island, under moonlight, with the leaves rustling and the sea whispering.",
        "There, Hanno finds a rare flower with delicate red and yellow petals. He knows it at once: the Elysian flower, potent in alchemy, capable of healing and capable of killing.",
        "He places it gently behind Alethea's ear. A symbol of the beauty and balance they have found in each other.",
      ],
    },
    {
      id: "hand-in-hand",
      heading: "Hand in Hand",
      mood: "dawn",
      text: [
        "When it is time to leave Lysandria, Alethea goes with him.",
        "Spear in his hand, her hand in his other, they set out for Carthara, ready for whatever lies ahead.",
      ],
    },
  ],
};

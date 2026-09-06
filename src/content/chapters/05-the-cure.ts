import type { Chapter } from "../types";

export const theCure: Chapter = {
  slug: "the-cure",
  order: 5,
  title: "A Cure and Its Consequences",
  subtitle: "Chapter Five",
  summary:
    "Hanno comes home to a city drowning in Ravash and a mother who is barely there. He finds the antidote, becomes the savior of Carthara, and makes two very dangerous enemies without noticing.",
  mood: "forest",
  when: "The return",
  status: "draft",
  music: "/audio/ambient-market.wav",
  cover: "/images/chronicle/apothecary.webp",
  scenes: [
    { id: "title", kind: "title", heading: "A Cure and Its Consequences", text: ["Chapter Five"], mood: "forest" },
    {
      id: "return",
      heading: "The Return",
      mood: "gold",
      location: "carthara",
      image: "/images/chronicle/carthara.webp",
      text: [
        "Carthara looks unchanged. The markets bustle, the streets crowd. It is Hanno who is different.",
        "Master Virello welcomes him back with thinly veiled greed, counting the rare materials before he counts the years. Hanno is no longer blind. He begins, carefully, to pull away, and sets up a discreet workshop of his own with Alethea beside him.",
      ],
    },
    {
      id: "a-city-in-despair",
      heading: "A City in Despair",
      mood: "void",
      ambient: "/audio/ambient-night.wav",
      text: [
        "Beneath the bustle, the darkness has grown. Ravash is everywhere: broken families, empty eyes, streets full of despair. The Silkers are richer than ever.",
        "His mother's fall is still fresh in his memory. Hanno vows to end it. He turns his whole mind to an antidote.",
      ],
    },
    {
      id: "trials",
      heading: "Trials",
      mood: "forest",
      text: [
        "He tests his first attempts on Amara herself, whose health has collapsed under the drug. Some mixtures ease her symptoms for an hour. Others cause reactions that leave him anguished and guilt-ridden.",
        "Alethea steadies him. He refines. He tries again.",
        "Then one day the tremor in his mother's hands stops, and her eyes clear, and she looks at him and knows him.",
      ],
    },
    {
      id: "the-savior-of-carthara",
      heading: "The Savior of Carthara",
      mood: "gold",
      text: [
        "Word of the antidote spreads through the city like water through sand. The addicted seek him out in their hundreds. The discreet workshop becomes a thriving business, and the business becomes wealth, and the wealth becomes a name.",
        "He recognizes them. The faces from the doorways. The vendors who out-shouted his father. They call him savior now, and he lets them.",
        "For the first time in years, Hanno feels he has done something that matters. He does not examine why their gratitude tastes the way it does.",
      ],
    },
    {
      id: "seeds-of-conflict",
      heading: "Seeds of Conflict",
      mood: "storm",
      text: [
        "Virello watches his apprentice eclipse him, and envy curdles into something colder. Their encounters turn frosty, loaded with silent accusation.",
        "Lord Numarius honors Hanno at banquets and ceremonies. In private, the Three Seats of Carthara have a problem. Numarius's fields, Magistra Corvo's harbor, and General Vael's garrison all grew rich on Ravash, quietly, through the Silken Chain. The antidote is ruining it.",
        "Hanno, buoyed by admiration, sees none of it. The seeds have been sown.",
      ],
    },
  ],
};

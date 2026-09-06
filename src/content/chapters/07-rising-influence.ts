import type { Chapter } from "../types";

export const risingInfluence: Chapter = {
  slug: "rising-influence",
  order: 7,
  title: "Rising Influence and Lingering Shadows",
  subtitle: "Chapter Seven",
  summary:
    "With Virello gone, Hanno's workshop becomes the heart of a booming city-state. Numarius basks in the glory. Adris's investigation goes cold. Nothing is resolved; everything is waiting.",
  mood: "gold",
  when: "The golden years",
  status: "draft",
  music: "/audio/ambient-market.wav",
  scenes: [
    { id: "title", kind: "title", heading: "Rising Influence", text: ["Chapter Seven"], mood: "gold" },
    {
      id: "the-heart-of-carthara",
      heading: "The Heart of Carthara",
      mood: "gold",
      location: "carthara",
      text: [
        "Hanno's workshop grows into a prominent establishment at the center of the city, crowded with patrons seeking remedies. His wealth and influence make him indispensable.",
        "With Ravash gone, Carthara flourishes into an economic powerhouse, a city-state in all but name. Trade surges. Numarius takes the credit, invites Hanno to every prestigious gathering, and basks in the reflected light.",
      ],
    },
    {
      id: "courtesies",
      heading: "Courtesies",
      mood: "void",
      text: [
        "Every courteous exchange with Numarius reminds Hanno of a man dragged to the fields at dawn. He has neither forgotten nor forgiven.",
        "He conceals it beneath a composed exterior. He needs the relationship. He uses it to climb.",
      ],
    },
    {
      id: "patient-vigilance",
      heading: "Patient Vigilance",
      mood: "night",
      ambient: "/audio/ambient-night.wav",
      text: [
        "Adris has climbed too. His reputation in the guard is for ruthless efficiency and unwavering justice. The Silker operations he dismantled have faded from public memory.",
        "But he never found the powerful figure he is sure sat behind the trade. Without evidence, he waits.",
        "The brothers keep an uneasy distance. Neither suspects the other. Their estrangement settles into a cautious neutrality that feels, from the outside, almost like peace.",
      ],
    },
  ],
};

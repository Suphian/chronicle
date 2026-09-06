import type { Chapter } from "../types";

export const shadowsAndAccusations: Chapter = {
  slug: "shadows-and-accusations",
  order: 6,
  title: "Shadows and Accusations",
  subtitle: "Chapter Six",
  summary:
    "Virello kills Amara with a dose disguised as her son's cure, then blames the cure. Hanno's answer is a shipment from Lysandria that his old master cannot resist stealing.",
  mood: "void",
  when: "The betrayal",
  music: "/audio/ambient-night.wav",
  scenes: [
    { id: "title", kind: "title", heading: "Shadows and Accusations", text: ["Chapter Six"], mood: "void" },
    {
      id: "false-kindness",
      heading: "False Kindness",
      mood: "void",
      text: [
        "Virello visits Amara, feigning concern and friendship. With false kindness he convinces her that a stronger dose of Hanno's cure will free her from Ravash for good.",
        "Trusting and hopeful, she agrees.",
        "What he gives her is not the cure. It is Ravash, dangerously potent, masked to look like her son's remedy.",
      ],
    },
    {
      id: "amara",
      heading: "Amara",
      mood: "night",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "She dies of the overdose within the hour.",
        "To the public, it looks like proof that the savior's antidote is flawed, and deadly.",
      ],
    },
    {
      id: "whispers",
      heading: "Whispers",
      mood: "storm",
      text: [
        "Virello moves fast. In influential circles he whispers that Hanno, ashamed of a mother who could not stay clean, poisoned her to protect his rising status. The cure is unreliable, he says. Distance yourselves.",
        "Lord Numarius, privately skeptical, publicly says nothing. He lets the accusations spread. It costs him nothing to let the savior shrink a little.",
        "When Hanno learns how his mother died, grief and rage consume him together. The betrayal by his old mentor, and the use made of her death, demand an answer.",
      ],
    },
    {
      id: "the-shipment",
      heading: "The Shipment",
      mood: "ember",
      ambient: "/audio/ambient-ember.wav",
      text: [
        "He does not use the spear. He uses his mind.",
        "He lets slip rumors of a shipment arriving from Lysandria: a rare ingredient, invaluable, secret, revolutionary. He makes sure the whisper reaches Virello, and that it sounds like everything the old man has ever wanted.",
        "Greed overtakes caution. Virello intercepts the shipment and steals it. He does not know that Hanno prepared its contents to be enticing, and subtly, lethally toxic.",
      ],
    },
    {
      id: "a-public-demise",
      heading: "A Public Demise",
      mood: "ember",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "Certain he has bested his apprentice again, Virello shows off his stolen discovery to the elite, and demonstrates its properties personally.",
        "His death is dramatic, public, and irreversible. The theft is exposed. To Carthara, it looks like a greedy man undone by his own dishonesty. Hanno, publicly saddened and privately satisfied, has avenged his mother without a shadow of suspicion.",
        "Numarius expresses sorrow. Privately, he has finally understood what kind of man Hanno is, and begins to tread carefully.",
      ],
    },
  ],
};

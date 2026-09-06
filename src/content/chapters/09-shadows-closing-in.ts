import type { Chapter } from "../types";

export const shadowsClosingIn: Chapter = {
  slug: "shadows-closing-in",
  order: 9,
  title: "Shadows Closing In",
  subtitle: "Chapter Nine",
  summary:
    "Elysian Dust hollows out the ruling class. Adris hunts a mastermind through dead ends and misdirection, never suspecting that the trail is being erased by his own brother.",
  mood: "night",
  when: "Now",
  status: "draft",
  music: "/audio/ambient-night.wav",
  scenes: [
    { id: "title", kind: "title", heading: "Shadows Closing In", text: ["Chapter Nine"], mood: "night" },
    {
      id: "beneath-the-veneer",
      heading: "Beneath the Veneer",
      mood: "void",
      text: [
        "The network gains momentum. Beneath the shimmering veneer of prosperity, addiction takes hold among the city's influential families. Discreetly at first. Then not.",
      ],
    },
    {
      id: "dead-ends",
      heading: "Dead Ends",
      mood: "night",
      location: "carthara",
      text: [
        "Adris becomes consumed. He tracks distribution patterns, conducts interrogations, pieces together clues. Every lead dissolves. The network behind the Dust is sophisticated, elusive, and frighteningly efficient.",
        "He does not know that his brother watches every step of his investigation, hiding evidence and bending trails. Watching Adris's persistence fills Hanno with pride, sadness, and fear, all at once.",
        "He feels the collision coming. His vengeance has become the thing he lives for. It outweighs even blood.",
      ],
    },
    {
      id: "numarius-stirs",
      heading: "Numarius Stirs",
      mood: "storm",
      ambient: "/audio/ambient-wind.wav",
      text: [
        "Numarius notices the rot at last: instability among the ruling class, productivity falling, whispers he cannot silence. Indifferent no longer, he presses Adris to end it.",
        "In public he demands justice. In private he is afraid for his empire.",
        "The other two Seats watch him press. Corvo and Vael have begun to speak of Numarius the way one speaks of a horse that has gone lame.",
      ],
    },
    {
      id: "closer-than-he-imagines",
      heading: "Closer Than He Imagines",
      mood: "void",
      text: [
        "Slowly, Adris uncovers unsettling connections: whispers of betrayal, signs that someone deeply influential sits behind the epidemic. With dread, he begins to suspect Numarius's own circle.",
        "He does not imagine that the man he is hunting is closer than that.",
        "Each night, Hanno weighs the cost of what he has done. He is haunted by the morality he abandoned, and by the brother he may soon have to face.",
      ],
    },
    {
      id: "alethea-watches",
      heading: "Alethea",
      mood: "dawn",
      text: [
        "Alethea has stopped asking about the harbor. She treats the city's new sickness in her clinic and comes home to a husband who is courteous and attentive and somewhere else.",
        "She married a student. She is a healer, and she knows what a closed door in a body means, and she does not say it.",
      ],
    },
    {
      id: "reckoning",
      heading: "Reckoning",
      mood: "ember",
      ambient: "/audio/ambient-ember.wav",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "Shadows close in around the brothers. Hanno's calculated cruelty and Adris's unwavering pursuit are two edges of the same spear.",
        "Zaharaz. Read it forwards, read it backwards. It is the same word.",
        "The reckoning is coming. It will not come from where he is looking.",
      ],
    },
  ],
};

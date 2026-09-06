import type { Chapter } from "../types";

export const theFlowerInHerHair: Chapter = {
  slug: "the-flower-in-her-hair",
  order: 10,
  title: "The Flower in Her Hair",
  subtitle: "Chapter Ten",
  summary:
    "Alethea married a student. The man who came back from the banquet is someone else. The Dust gives her the student back for an hour at a time, and Hanno, watching everyone but his own house, does not see it until the garden.",
  mood: "void",
  when: "The reckoning",
  status: "draft",
  music: "/audio/ambient-night.wav",
  cover: "/images/chronicle/apothecary.webp",
  scenes: [
    { id: "title", kind: "title", heading: "The Flower in Her Hair", text: ["Chapter Ten"], mood: "void" },
    {
      id: "a-stranger-at-the-table",
      heading: "A Stranger at the Table",
      mood: "dawn",
      text: [
        "Alethea fell in love with a student. A man who worked through the night for a boy he did not know, and wept when the fever broke, and did not think anyone had seen.",
        "The man who came back from the banquet is someone else. He is courteous. He is attentive. He sleeps. But there is a room in him now that she is not allowed into, and she is a healer, and she knows what a closed door in a body means.",
        "She does not say it. She was raised in Lysandria. She waits for balance to return.",
      ],
    },
    {
      id: "the-clinic",
      heading: "The Clinic",
      mood: "forest",
      text: [
        "It comes to her the way everything in Carthara comes to her: through the sick. The Dust arrives in her clinic by the handful, confiscated from the children of magistrates, and she studies it as a healer studies anything, to know what she is treating.",
        "She recognizes the petals. Red and yellow. She has seen this flower once before, on an island, in a mirror, behind her own ear.",
        "She decides it is a coincidence. She is a healer. She decides a great many things are coincidences.",
      ],
    },
    {
      id: "relief",
      heading: "Relief",
      mood: "night",
      ambient: "/audio/ambient-night.wav",
      text: [
        "The first time is a healer's test. A grain, to know the effect. It is exactly what they say it is. For an hour the closed door in her husband opens, and the student is at the table again, and she is on the island.",
        "The second time is the night he does not come home from the harbor. The third time she stops counting.",
        "Elysian Dust does not take. It gives. That is the whole design of it. She knows this better than anyone in the city, and it does not help her at all.",
      ],
    },
    {
      id: "he-does-not-see",
      heading: "He Does Not See",
      mood: "void",
      text: [
        "Hanno watches Adris. He watches the Seats. He watches the harbor, the merchants, the trails he has to erase. He is the most perceptive man in Carthara, and he does not look at his own house, because his house is the one place he is not lying.",
        "She hides it as well as he hides his. Two people, in the same bed, keeping the same secret from each other, and neither of them knows it is the same secret.",
      ],
      quote: { text: "You can read a whole tavern in a glance. You never once read me.", by: "Alethea, to no one" },
    },
    {
      id: "the-garden",
      heading: "The Garden",
      mood: "ember",
      ambient: "/audio/ambient-ember.wav",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "He finds her in the garden, among the herbs she planted the first week they came to the city.",
        "She is sitting against the wall with her eyes closed and her face turned toward the sun, the way she sat on the island. There is Dust on her lips. There is a flower in her hair, red and yellow, that she must have put there herself.",
        "She has been gone for some time.",
      ],
    },
    {
      id: "the-mirror",
      heading: "The Mirror",
      mood: "void",
      text: [
        "He understands all of it at once. There is no part of it he can pretend not to understand. He built the thing that killed her, petal by petal, and he built it out of her wedding night.",
        "Every scale he thought he was balancing was this scale. The city he sentenced was her city. The verdict was on her.",
        "He goes inside, and for the first time since the night he found his mother in the street, he stands in front of a mirror and looks. He had thought he would see the devil he had been dancing with. He sees a man in wool, whose army has gone home.",
      ],
      quote: { text: "He took the mountain. The mountain took him back.", by: "Bakhtari saying" },
    },
    {
      id: "the-door-again",
      heading: "The Door",
      mood: "storm",
      ambient: "/audio/ambient-wind.wav",
      text: [
        "Someone is knocking. It is not a merchant's knock.",
        "He knows before he opens it. He has known, in some room of himself, since the sentencing. He opens it anyway.",
        "It is Adris.",
      ],
    },
  ],
};

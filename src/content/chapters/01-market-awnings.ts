import type { Chapter } from "../types";

export const marketAwnings: Chapter = {
  slug: "market-awnings",
  order: 1,
  title: "Beneath the Market Awnings",
  subtitle: "Chapter One",
  summary:
    "A fruit stall, a drought, and a debt that cannot be paid. Lord Numarius's agents come for Adil Averroes, and then they come back, and the brother who stayed behind steps aside.",
  mood: "gold",
  when: "Hanno's childhood",
  status: "draft",
  music: "/audio/ambient-market.wav",
  cover: "/images/chronicle/carthara.webp",
  scenes: [
    { id: "title", kind: "title", heading: "Beneath the Market Awnings", text: ["Chapter One"], mood: "gold" },
    {
      id: "the-fruit-stall",
      heading: "The Fruit Stall",
      mood: "gold",
      location: "carthara",
      image: "/images/chronicle/carthara.webp",
      text: [
        "The markets of Carthara bustle beneath a scorching sun, awnings billowing as merchants shout to entice passersby. Amid the cacophony stands a modest fruit stall, piled high with figs, pomegranates, and dates.",
        "Adil Averroes, a thin but proud man with a warm, weary smile, calls out to customers. His voice is earnest, and it is drowned by louder vendors.",
        "From a small stool behind the stand, young Hanno watches his father closely. Even at a tender age he understands the sadness behind the enthusiasm. Each day is a balancing act: earn enough to eat, and never enough to escape the debts and taxes of Lord Numarius.",
      ],
    },
    {
      id: "above-the-pottery-shop",
      heading: "Above the Pottery Shop",
      mood: "dawn",
      text: [
        "Home is two cramped rooms above a pottery shop, and they are warm. Amara, Hanno's mother, shapes clay with hands that are rough but gentle, humming as she works. The tune is strange and old and does not belong to Carthara. She never says where it is from.",
        "Hanno's younger brother, Dyia, plays nearby. Despite everything, their humble life holds small joys and steady love.",
      ],
    },
    {
      id: "the-drought",
      heading: "The Drought",
      mood: "storm",
      ambient: "/audio/ambient-wind.wav",
      text: [
        "Then one summer the rains do not come. The orchards wither, fruit grows scarce and expensive, and Adil's earnings dwindle beneath his mounting debts.",
        "When he cannot pay, Numarius's agents arrive at dawn. They take the stall. They take the merchandise. Adil pleads for mercy, and his pride shatters in front of his sons.",
      ],
      quote: { text: "One more season. I will repay all.", by: "Adil Averroes" },
    },
    {
      id: "the-fields",
      heading: "Beyond Mercy",
      mood: "void",
      location: "numarius-fields",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "Numarius's agent stares coldly. \"Your debts are beyond mercy now, fruit-seller.\"",
        "In a moment etched forever into Hanno's memory, Adil is dragged away, condemned to servitude in the harsh fields outside the city.",
        "Along the awnings, the other vendors go on shouting their prices. Faces watch from doorways. Nobody says a word.",
        "Adil reaches out. His eyes lock with Hanno's, full of sorrowful apologies that are never spoken.",
      ],
    },
    {
      id: "the-apothecary",
      heading: "Master Virello",
      mood: "forest",
      text: [
        "With their father gone, the family crumbles. Amara cannot provide even basic sustenance. In quiet desperation she arranges for Hanno to apprentice with an apothecary named Master Virello, hoping her eldest son's quick mind might be their salvation.",
        "The shop is dim, lined with shelves of mysterious vials and dusty herbs. The air is thick with strange scents. It quickly becomes the place where Hanno finds solace, and purpose.",
        "He shows a remarkable talent for alchemy, creating potions that amaze even the seasoned healer. Virello is cunning. He sells the boy's inventions and lets the boy toil on in quiet poverty, oblivious.",
      ],
    },
    {
      id: "ravash",
      heading: "Ravash",
      mood: "night",
      ambient: "/audio/ambient-night.wav",
      text: [
        "Dyia grows bitter and restless at home, left alone while Hanno spends long hours at the apothecary. He watches their mother's health deteriorate.",
        "He sees her slip quietly into the night. He sees the tremors, the quiet sobs, the silent shame. The name of it is Ravash, and it is the most addictive thing in Carthara.",
        "Each night Dyia's resentment grows, and with it a burning desire for justice and order. When a captain of the city guard sees him handle a sword in the market and offers him a post, Dyia takes it. Inside the system that took his father, he tells himself, he can protect what is left.",
      ],
    },
    {
      id: "the-door",
      heading: "The Door",
      mood: "void",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "The debt is not settled by the stall. Numarius's men come a second time, for the rooms above the pottery shop and everything in them, and Dyia is on the detail.",
        "His sergeant gives him the choice plainly. The post, or his mother's door.",
        "Dyia steps aside. Amara does not say his name as they carry her wheel down the stairs. He tells himself he will fix it from inside. He never does.",
      ],
    },
    {
      id: "the-sentencing",
      heading: "The Sentencing",
      mood: "storm",
      text: [
        "At a crowded sentencing, Hanno watches helplessly as their father is formally condemned. Beside the magistrate, in a new guard's uniform, stands Dyia, impassive.",
        "Dyia's eyes fall to the ground. Ashamed, but unmoving. Hanno does not know about the door yet. He only knows his brother is wearing their colors.",
        "The crowd is silent. It is a large crowd. Hanno will remember that too.",
        "That day marks the permanent fracture between the brothers. Their paths will collide again. Neither of them knows it yet.",
      ],
    },
  ],
};

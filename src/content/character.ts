import type { CharacterProfile } from "./types";

/**
 * The protagonist of this chronicle: Hanno Averroes.
 * Source: the owner's character sheet. Everything on the site that mentions
 * the hero reads from this one file.
 */
export const character: CharacterProfile = {
  name: "Hanno Averroes",
  epithet: "The Savior of Carthara",
  race: "Half-Elf",
  class: "Alchemist Artificer / Fighter",
  alignment: "Neutral Evil",
  portrait: undefined, // e.g. "/images/character/portrait.jpg"
  tagline:
    "He cured a city of one poison and then, quietly, gave it another. This is the story of how a fruit-seller's son became the most dangerous man in Carthara.",
  bio: [
    "Hanno was born above a pottery shop in the market quarter of Carthara, the eldest son of Adil, who sold figs and pomegranates from a stall he could never quite pay for, and Amara, who shaped clay with rough, gentle hands.",
    "He was apprenticed to an apothecary as a boy and discovered a gift for alchemy that his master stole from him for years. He crossed the Tengeri Wastes with the Leonin, trained beneath the glowing waters of Lake Siraj, and spent five years among the spear-fighters of Lysandria, where he was given the spear Zaharaz and met his wife, Alethea.",
    "He returned home, cured his mother, ended the Ravash epidemic, and was celebrated as the savior of Carthara. Then Lord Numarius reminded him, in front of the whole city, whose father was fertilizer in his fields.",
    "Hanno keeps a garden. He avoids mirrors. He has never told his wife what is in the shipments.",
  ],
  traits: [
    { label: "Age", value: "115" },
    { label: "Height", value: "6'1\"" },
    { label: "Eyes", value: "Deep green, flecked with gold" },
    { label: "Weapon", value: "Zaharaz, a double-bladed spear" },
    { label: "Faith", value: "Aetherium Harmonia" },
    { label: "Hobby", value: "Gardening and herbalism" },
  ],
  bonds: [
    "Amara, his mother. He cured her once. He could not save her twice.",
    "Alethea, his wife, a healer of Lysandria. She knows everything about him except the one thing that matters.",
    "Adris, his younger brother, who stayed when Hanno left, and stepped aside when Numarius's men came to their mother's door. Now a captain in the city guard, hunting the man behind Elysian Dust without knowing it is him.",
    "Adil, his father, buried without a name in Lord Numarius's fields.",
  ],
  ideals: [
    "Equilibrium. The universe seeks balance in all things, and so must he.",
    "Duality. Every blade has two edges. Every flower can heal or kill. Both are necessary.",
    "The end justifies the means. He tells himself this every night.",
  ],
  flaws: [
    "He believes everyone in power is corrupt, and so he has become what he hates.",
    "He cannot look in a mirror. He saw a stranger there once and never forgave him.",
    "He is terrified of losing the people he loves to his own actions, and he is doing it anyway.",
  ],
  timeline: [
    { when: "Childhood", what: "Born in Carthara to Adil, a fruit-seller, and Amara, a potter. A younger brother, Adris, follows.", chapter: "market-awnings" },
    { when: "The Drought", what: "Adil defaults on his debts to Lord Numarius and is dragged to the fields. Hanno is apprenticed to Master Virello.", chapter: "market-awnings" },
    { when: "The Door", what: "Adris joins the guard to protect the family from inside, and steps aside when they come for Amara's rooms.", chapter: "market-awnings" },
    { when: "Apprenticeship", what: "His talent for alchemy outpaces his master. His mother turns to Ravash. The brothers come to blows, each accusing the other of abandoning the family.", chapter: "bitter-apprenticeship" },
    { when: "The Journeys", what: "Archery among the Leonin of the Tengeri Wastes; the sword beneath Lake Siraj in Sidrat Al Muntaha.", chapter: "journeys" },
    { when: "Lysandria", what: "Heals General Phylios's son, receives the spear Zaharaz, and marries Alethea beneath the Elysian flower.", chapter: "gift-of-lysandria" },
    { when: "The Cure", what: "Returns to Carthara, cures Amara, ends the Ravash epidemic, and is named the city's savior.", chapter: "the-cure" },
    { when: "The Betrayal", what: "Virello poisons Amara and blames the cure. Hanno answers with a shipment that kills his old master.", chapter: "shadows-and-accusations" },
    { when: "The Banquet", what: "Numarius names his father as fertilizer in front of the elite. Hanno distills Elysian Dust.", chapter: "a-dark-turn" },
    { when: "Now", what: "Elysian Dust hollows out Carthara. Adris closes in on a mastermind he does not know is his brother.", chapter: "shadows-closing-in" },
  ],
};

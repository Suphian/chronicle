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
  class: "Alchemist",
  alignment: "Neutral Evil",
  portrait: "/images/chronicle/hanno.webp",
  tagline:
    "His skill brings relief to Carthara. His pride and careful calculations turn the city's trust into the means of his revenge.",
  bio: [
    "Hanno was born above a pottery shop in Carthara, the eldest son of Idris, who had built a fruit business from a basket into a stall and hoped to expand it, and Amara, a potter from the island of Lysandria. His mother's stories of its two enormous mountains belonged to his childhood long before he traveled there himself.",
    "Sinna's apprenticeship reveals his strongest talent: understanding materials, learning from failure, and finding applications others have missed. Travel brings knowledge and relationships, including Chuluun and the displaced Leonin of Tengeri. Hanno learns enough self-defense to fight competently, but his power comes from expertise, preparation, bargaining, and deception. He spends five years studying and working on Lysandria, helps save Phylios's son, receives the ordinary staff Zaharaz, and meets Alethea.",
    "He returns to Carthara with Alethea and helps Amara recover from Ravash. Their treatment and continuing care bring relief to many people. Public gratitude gives him influence and an appetite for recognition. Numarius's later humiliation of him at a banquet makes the old hierarchy visible again, but Hanno chooses what to do with his anger.",
    "So Hanno passed a verdict on all of them. He sells the cure by day and the poison by night to the same people, and he needs both transactions: the poison is the sentence, and the adoration is the only version of himself he can stand to look at. That is why he is a merchant. That is why he cannot look in a mirror.",
    "He keeps a garden and records observations carefully. He can plan a killing while describing it to himself as restoring a balance. The people closest to him know his patient, attentive work; he relies on that trust to conceal what he is doing. Neither his calculations nor his grief make him infallible.",
  ],
  traits: [
    { label: "Age", value: "115" },
    { label: "Height", value: "6'1\"" },
    { label: "Eyes", value: "Deep green, flecked with gold" },
    { label: "Staff", value: "Zaharaz, an ordinary wooden traveling staff" },
    { label: "Strength", value: "Alchemy, calculation, negotiation, and preparation" },
    { label: "Fighting", value: "Competent self-defense; no exceptional martial ability" },
    { label: "Faith", value: "Aetherium Harmonia" },
    { label: "Hobby", value: "Gardening and herbalism" },
  ],
  bonds: [
    "Amara, his mother. He cured her once. He could not save her twice.",
    "Alethea, his wife, a healer of Lysandria. She fell in love with a student and waited for him to come back. She died in their garden with Elysian Dust on her lips and the flower in her hair.",
    "Dyia, his younger brother, who stayed when Hanno left, and stepped aside when Numarius's men came to their mother's door. Now a captain in the city guard, hunting the man behind Elysian Dust without knowing it is him.",
    "Idris, his father, buried without a name in Lord Numarius's fields.",
  ],
  ideals: [
    "Equilibrium. The universe seeks balance in all things, and so must he.",
    "Duality. He treats a substance's capacity to help or harm as an excuse to believe both uses are necessary.",
    "The end justifies the means. He tells himself this every night.",
  ],
  flaws: [
    "He poisons the people whose love he needs, and he needs it more than he needs the poison.",
    "He believes everyone in power is corrupt, and so he has become what he hates.",
    "He cannot look in a mirror. He saw a stranger there once and never forgave him.",
    "He was terrified of losing the people he loved to his own actions. He did it anyway.",
  ],
  lies: [
    "That vengeance balances the scales. He calls it equilibrium. It is a cycle, and he is inside it.",
    "That the city deserves what he is doing to it. His judgment of its rulers does not make its people collectively guilty.",
    "That no one in power can be good. He has met Phylios. He has met Alethea. He does not count them.",
  ],
  timeline: [
    { when: "The old legend", what: "A highland tale tells of Iskandar and Rukhsana. Its claimed connection to the family remains unsettled alongside Amara's Lysandrian origin.", chapter: "the-conqueror" },
    { when: "Childhood", what: "Born in Carthara to Idris, a fruit-seller, and Amara, a potter. A younger brother, Dyia, follows.", chapter: "market-awnings" },
    { when: "The Drought", what: "Idris defaults on his debts to Lord Numarius and is dragged to the fields. Hanno is apprenticed to Master Sinna.", chapter: "market-awnings" },
    { when: "The Door", what: "Dyia joins the guard to protect the family from inside, and steps aside when they come for Amara's rooms.", chapter: "market-awnings" },
    { when: "Apprenticeship", what: "His talent for alchemy outpaces his master. His mother turns to Ravash. The brothers come to blows, each accusing the other of abandoning the family.", chapter: "bitter-apprenticeship" },
    { when: "The Journeys", what: "Learns from displaced Leonin in Tengeri and practitioners beside Lake Siraj; gains knowledge and practical self-defense without becoming a master fighter.", chapter: "journeys" },
    { when: "Lysandria", what: "Spends five years on the island in alchemical study and work, helps heal Phylios's son, receives the staff Zaharaz, and marries Alethea on the nearby Moonlit Isle.", chapter: "gift-of-lysandria" },
    { when: "The Cure", what: "Returns to Carthara, develops treatment with Alethea, supports Amara's recovery, and receives the city's gratitude.", chapter: "the-cure" },
    { when: "The Betrayal", what: "Sinna poisons Amara and blames the cure. Hanno answers with a shipment that kills his old master.", chapter: "shadows-and-accusations" },
    { when: "The Banquet", what: "Numarius names his father as fertilizer in front of the elite. Hanno distills Elysian Dust.", chapter: "a-dark-turn" },
    { when: "The Closing", what: "Elysian Dust hollows out Carthara. Dyia closes in on a mastermind he does not know is his brother.", chapter: "shadows-closing-in" },
    { when: "Now", what: "Alethea dies of the Dust in their garden. Hanno looks in a mirror. Dyia knocks.", chapter: "the-flower-in-her-hair" },
  ],
};

/**
 * The Codex: people, factions, places, substances, and artifacts of the
 * chronicle. Short entries; the chapters carry the story. Add freely.
 */
export type CodexKind = "person" | "faction" | "place" | "substance" | "artifact";

export interface CodexEntry {
  id: string;
  name: string;
  kind: CodexKind;
  /** One line, shown under the name. */
  role: string;
  /** A short paragraph. */
  body: string;
  /** World map location id, if this is a place. */
  location?: string;
  /** Chapter slug most relevant to this entry. */
  chapter?: string;
}

export const codex: CodexEntry[] = [
  // ---- People
  { id: "hanno", name: "Hanno Averroes", kind: "person", role: "The savior of Carthara. Alchemist, merchant, poisoner.", body: "Eldest son of Adil and Amara. Apprenticed to Virello, trained across the world, married in Lysandria, celebrated at home for the Ravash cure. Now the unseen hand behind Elysian Dust. He keeps a garden and avoids mirrors.", chapter: "market-awnings" },
  { id: "adris", name: "Adris Averroes", kind: "person", role: "Hanno's younger brother. Captain in the city guard.", body: "The one who stayed. He took a guard post to protect the family from inside, then stepped aside when Numarius's men came for his mother's door. He has been protecting everyone else's door since. He is hunting the man behind Elysian Dust and does not know it is his brother.", chapter: "bitter-apprenticeship" },
  { id: "adil", name: "Adil Averroes", kind: "person", role: "Hanno's father. Fruit-seller. Dead.", body: "A thin, proud man who sold figs and pomegranates from a stall he could never pay for. Taken to the fields for his debts and buried there without a name.", chapter: "market-awnings" },
  { id: "amara", name: "Amara Averroes", kind: "person", role: "Hanno's mother. Potter, Bakhtari, dead.", body: "Came down from the highlands and never spoke of it. Hummed the cave songs over the clay. Fell to Ravash while her sons were busy saving her, was cured by Hanno, and was killed by Virello with a dose disguised as her son's remedy.", chapter: "shadows-and-accusations" },
  { id: "alethea", name: "Alethea", kind: "person", role: "Hanno's wife. Healer of Lysandria. Dead.", body: "Serene, respected, and wiser than her husband. She fell in love with a student and left the mountains with him. When he came back from the banquet as someone else, the Dust gave her the student back an hour at a time. She died in their garden with the Elysian flower in her hair.", chapter: "the-flower-in-her-hair" },
  { id: "virello", name: "Master Virello", kind: "person", role: "Apothecary. Hanno's master. Dead.", body: "Took a gifted boy, sold his inventions as his own, and sent him across the world for ingredients. When the boy outgrew him he murdered the boy's mother and blamed the cure. Died demonstrating a stolen shipment that Hanno had prepared for him.", chapter: "shadows-and-accusations" },
  { id: "numarius", name: "Lord Numarius", kind: "person", role: "First Seat of Carthara. Holder of the fields.", body: "The man who took Adil. He owns the plantations east of the city and every debtor who works them. Publicly Hanno's patron; privately the one who told the whole banquet what became of a certain fruit-seller. One of the three Seats, and increasingly the one the other two would like to be rid of.", chapter: "a-dark-turn" },
  { id: "corvo", name: "Magistra Ilvane Corvo", kind: "person", role: "Second Seat of Carthara. Holder of the harbor.", body: "Controls the docks, the customs house, and everything that passes through them. The Silken Chain has never once been caught moving Ravash by sea. Nobody has asked her why.", chapter: "the-cure" },
  { id: "vael", name: "General Tarquin Vael", kind: "person", role: "Third Seat of Carthara. Holder of the garrison.", body: "Commands the city guard, and therefore Adris. A soldier who believes order is worth any price and has never had to name the price out loud.", chapter: "shadows-closing-in" },
  { id: "phylios", name: "General Phylios", kind: "person", role: "Leader of Lysandria.", body: "Grey-eyed, stern, fair. Hanno healed his son; he gave Hanno the spear Zaharaz and the words he lives by.", chapter: "gift-of-lysandria" },
  { id: "chuluun", name: "Chuluun", kind: "person", role: "Leonin elder of the Tengeri Wastes.", body: "Taught Hanno the bow and the sentence about strength and compassion that he has not yet managed to live up to.", chapter: "journeys" },
  { id: "iskandar", name: "Iskandar", kind: "person", role: "The conqueror. Hanno's ancestor.", body: "The boy-king from the west who took everything, then took Bakhtar, then fell in love with it. His army abandoned him at the edge of the world. He stayed, and died there, and his blood came down the mountain.", chapter: "the-conqueror" },
  { id: "rukhsana", name: "Rukhsana", kind: "person", role: "Flute-player of the cliffs. Iskandar's wife.", body: "Counted his army from a cave mouth on the first night and told him the number to his face. Elven-blooded. The source of the Averroes line.", chapter: "the-conqueror" },

  // ---- Factions
  { id: "the-three-seats", name: "The Three Seats", kind: "faction", role: "The triumvirate that rules Carthara.", body: "Fields, harbor, garrison: Numarius, Corvo, and Vael. Each holds a third of the city and each would take the other two-thirds if the moment came. Ravash made all three rich. Elysian Dust is making all three afraid.", chapter: "the-cure" },
  { id: "the-silken-chain", name: "The Silken Chain", kind: "faction", role: "Carthara's hidden trade in addiction. Its people are called Silkers.", body: "Moved Ravash through the alleys for a generation under the protection of people who were never named. Broken by Hanno's cure and Adris's patrols. Its head was never found.", chapter: "bitter-apprenticeship" },
  { id: "the-city-guard", name: "The City Guard", kind: "faction", role: "Numarius's law, Vael's soldiers, Adris's life.", body: "Keeps order in Carthara and collects its debts. Adris rose through it on ruthless efficiency and a private list of Silkers who did not reach trial.", chapter: "journeys" },
  { id: "the-leonin", name: "The Leonin Clans", kind: "faction", role: "Lion-folk of the Tengeri Wastes.", body: "Fierce, proud, reverent of nature. They accepted Hanno as one of their own and taught him to shoot.", chapter: "journeys" },
  { id: "the-phalanx", name: "The Lysandrian Phalanx", kind: "faction", role: "Spear-fighters of the mountains.", body: "A warrior society that prizes balance above victory. Hanno trained with them for five years and became the best spear in the region.", chapter: "gift-of-lysandria" },
  { id: "the-bakhtari", name: "The Bakhtari", kind: "faction", role: "The highland people nobody has held.", body: "Cliff-dwellers, cave-players, elven-blooded. They have fought every empire and built no cities. Amara was one of them.", chapter: "the-conqueror" },

  // ---- Places
  { id: "carthara", name: "Carthara", kind: "place", role: "The city. Markets, awnings, a thousand debts.", body: "Sun-scorched trade capital ruled by the Three Seats. Hanno was born here, cured it once, and is now poisoning it.", location: "carthara", chapter: "market-awnings" },
  { id: "bakhtar", name: "Bakhtar", kind: "place", role: "The highlands. The graveyard of empires.", body: "Cliff villages and closed valleys north of the last road, where the caves play flutes at night. Iskandar is buried here somewhere.", location: "bakhtar", chapter: "the-conqueror" },
  { id: "lysandria", name: "Lysandria", kind: "place", role: "Mountain kingdom of the phalanx.", body: "Rare metals, disciplined warriors, and Alethea.", location: "lysandria", chapter: "gift-of-lysandria" },
  { id: "tengeri-wastes", name: "The Tengeri Wastes", kind: "place", role: "Wind-carved canyons of the Leonin.", body: "Where Hanno learned the bow.", location: "tengeri-wastes", chapter: "journeys" },
  { id: "sidrat-al-muntaha", name: "Sidrat Al Muntaha", kind: "place", role: "Luminous lakes and glowing roads.", body: "Where Hanno learned the sword, and equilibrium.", location: "sidrat-al-muntaha", chapter: "journeys" },
  { id: "the-fields", name: "The Fields of Numarius", kind: "place", role: "Where debtors go.", body: "Adil died here and feeds the crop.", location: "numarius-fields", chapter: "market-awnings" },

  // ---- Substances
  { id: "ravash", name: "Ravash", kind: "substance", role: "The old poison. One puff, a lifetime.", body: "Smoked. Ruinously addictive. Sold by the Silken Chain, cured by Hanno, and used by Virello to murder Amara.", chapter: "the-cure" },
  { id: "elysian-dust", name: "Elysian Dust", kind: "substance", role: "Hanno's poison. Euphoria at a ruinous price.", body: "Distilled from the Elysian flower that Hanno placed in his wife's hair. Moved through a network of merchants who do not know what they carry. It hollowed out the ruling class of Carthara, and then it reached the one house Hanno was not watching.", chapter: "a-dark-turn" },
  { id: "elysian-flower", name: "The Elysian Flower", kind: "substance", role: "Red and yellow. Heals or kills.", body: "Grows on the Moonlit Isle off Lysandria. A wedding gift, and the source of Elysian Dust.", location: "moonlit-isle", chapter: "gift-of-lysandria" },

  // ---- Artifacts
  { id: "zaharaz", name: "Zaharaz", kind: "artifact", role: "Hanno's double-bladed spear.", body: "Given by General Phylios for healing his son. Engraved with symbols of harmony and duality. The name reads the same forwards and backwards, which is the point.", chapter: "gift-of-lysandria" },
];

export const codexKinds: { kind: CodexKind; label: string }[] = [
  { kind: "person", label: "People" },
  { kind: "faction", label: "Factions" },
  { kind: "place", label: "Places" },
  { kind: "substance", label: "Substances" },
  { kind: "artifact", label: "Artifacts" },
];

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
  { id: "hanno", name: "Hanno Averroes", kind: "person", role: "Alchemist, merchant, and schemer.", body: "Eldest son of Idris and Amara. A gifted practitioner whose danger comes from preparation, manipulation, and his willingness to harm. He can defend himself with a staff, but an experienced fighter can outmatch him. Celebrated for treating Ravash dependence, he becomes the concealed maker of Elysian Dust.", chapter: "market-awnings" },
  { id: "dyia", name: "Dyia Averroes", kind: "person", role: "Hanno's younger brother. Captain in the city guard.", body: "The one who stayed. He took a guard post to protect the family from inside, then stepped aside when Numarius's men came for his mother's door. He has been protecting everyone else's door since. He is hunting the man behind Elysian Dust and does not know it is his brother.", chapter: "bitter-apprenticeship" },
  { id: "adil", name: "Idris Averroes", kind: "person", role: "Hanno's father. Fruit-seller. Dead.", body: "Built a livelihood from a basket of fruit into a stall with regular customers. Proud of that real achievement, he dreams of a second counter but misjudges the bargaining power and returns that larger orders will bring. Drought and coercive debt take him to the fields, where he dies and is buried without a name.", chapter: "market-awnings" },
  { id: "amara", name: "Amara Averroes", kind: "person", role: "Potter from Lysandria. Hanno and Dyia's mother. Dead.", body: "Remembers pottery work on the island beneath two enormous mountains. In Carthara she bargains for her sons and struggles to retain her own livelihood. Treatment lets her return to paid pottery work before Sinna kills her with a false remedy. Her earlier Bakhtari ancestry remains a separate unresolved draft question.", chapter: "shadows-and-accusations" },
  { id: "alethea", name: "Alethea", kind: "person", role: "Healer from Lysandria. Hanno's wife. Dead in this draft.", body: "Leaves an established practice on the island to build a life with Hanno. In Carthara she insists on clinical records, access for poor patients, and authority independent of his business. As their marriage deteriorates, her own encounter with Dust becomes dependence. She arranges care beyond herself before the current garden tragedy.", chapter: "the-flower-in-her-hair" },
  { id: "virello", name: "Master Sinna", kind: "person", role: "Apothecary. Hanno's master. Dead.", body: "A capable scholar and teacher who appropriates Hanno's inventions. His apprentice's innovations and trade routes enlarge his business, but the suppliers know Hanno personally. When Hanno's cure eclipses him, Sinna murders Amara and attacks its credibility. Dies demonstrating a stolen shipment prepared by Hanno.", chapter: "shadows-and-accusations" },
  { id: "numarius", name: "Lord Numarius", kind: "person", role: "First Seat of Carthara. Holder of the fields.", body: "The man who took Idris. He owns the plantations east of the city and every debtor who works them. Publicly Hanno's patron; privately the one who told the whole banquet what became of a certain fruit-seller. One of the three Seats, and increasingly the one the other two would like to be rid of.", chapter: "a-dark-turn" },
  { id: "corvo", name: "Magistra Ilvane Corvo", kind: "person", role: "Second Seat of Carthara. Holder of the harbor.", body: "Controls the docks, the customs house, and everything that passes through them. The Silken Chain has never once been caught moving Ravash by sea. Nobody has asked her why.", chapter: "the-cure" },
  { id: "vael", name: "General Tarquin Vael", kind: "person", role: "Third Seat of Carthara. Holder of the garrison.", body: "Commands the city guard, and therefore Dyia. A soldier who believes order is worth any price and has never had to name the price out loud.", chapter: "shadows-closing-in" },
  { id: "phylios", name: "General Phylios", kind: "person", role: "Leader of Lysandria.", body: "A military ruler of the island. Hanno's care helps save his son, and he gives the healer Zaharaz, a travelling staff. Gratitude does not make Hanno a great warrior or resolve the limits of the general's authority.", chapter: "gift-of-lysandria" },
  { id: "chuluun", name: "Chuluun", kind: "person", role: "Leonin teacher and resistance leader under enforced labor obligations.", body: "Teaches children and adults between compulsory shifts in the Tengeri camps. Former pupils and fighters bring him requests, while households limit what he may promise in their name. He keeps one shelter row's missing-person records, helps the Return Councils, and carries his homeland's flag. His leadership does not make him commander of every Leonin faction; he asks Hanno to bear truthful witness.", chapter: "journeys" },
  { id: "iskandar", name: "Iskandar", kind: "person", role: "The conqueror. Hanno's ancestor.", body: "The boy-king from the west who took everything, then took Bakhtar, then fell in love with it. His army abandoned him at the edge of the world. He stayed, and died there, and his blood came down the mountain.", chapter: "the-conqueror" },
  { id: "rukhsana", name: "Rukhsana", kind: "person", role: "Flute-player of the cliffs. Iskandar's wife.", body: "Counted his army from a cave mouth on the first night and told him the number to his face. Elven-blooded. The source of the Averroes line.", chapter: "the-conqueror" },

  // ---- Factions
  { id: "the-three-seats", name: "The Three Seats", kind: "faction", role: "The triumvirate that rules Carthara.", body: "Fields, harbor, garrison: Numarius, Corvo, and Vael. Each holds a third of the city and each would take the other two-thirds if the moment came. Ravash made all three rich. Elysian Dust is making all three afraid.", chapter: "the-cure" },
  { id: "the-silken-chain", name: "The Silken Chain", kind: "faction", role: "Carthara's hidden trade in addiction. Its people are called Silkers.", body: "Moved Ravash through the alleys for a generation under the protection of people who were never named. Broken by Hanno's cure and Dyia's patrols. Its head was never found.", chapter: "bitter-apprenticeship" },
  { id: "the-city-guard", name: "The City Guard", kind: "faction", role: "Numarius's law, Vael's soldiers, Dyia's life.", body: "Keeps order in Carthara and collects its debts. Dyia rose through it on ruthless efficiency and a private list of Silkers who did not reach trial.", chapter: "journeys" },
  { id: "the-leonin", name: "The Leonin Clans", kind: "faction", role: "Displaced Leonin, divided in politics and joined by a lost home.", body: "The Leonin once welcomed Numarius's people as refugees after their homeland was destroyed, then suffered dispossession by the people they had sheltered. Many are enslaved; the Tengeri camps endure bombardment, while diaspora communities live throughout the world. Every Leonin carries the lost home's flag. Some seek negotiated peace, others resistance to the death; councils and diaspora networks have their own priorities. Powerful interests spread false accounts and apply the terrorist label to the whole people.", chapter: "journeys" },
  { id: "the-phalanx", name: "The Lysandrian Phalanx", kind: "faction", role: "The island's disciplined military formation.", body: "Soldiers whose collective skill exceeds any traveler's self-defense. Hanno learns basic footwork and staff use alongside years of medical study; he is not a phalanx champion. Their obligations, funding, and relationship to civilian life remain subjects for development.", chapter: "gift-of-lysandria" },
  { id: "the-bakhtari", name: "The Bakhtari", kind: "faction", role: "Highland communities whose history is contested in song.", body: "Cliff settlements, craft, and traditions of resistance. The tale of Iskandar and Rukhsana presents one account of their past. An earlier draft connects Amara's ancestry to them; how that relates to her adopted Lysandrian origin remains unresolved.", chapter: "the-conqueror" },

  // ---- Places
  { id: "carthara", name: "Carthara", kind: "place", role: "The city. Markets, awnings, a thousand debts.", body: "Sun-scorched trade capital ruled by the Three Seats. Hanno was born here, cured it once, and is now poisoning it.", location: "carthara", chapter: "market-awnings" },
  { id: "carthara-harbor", name: "Corvo’s Harbor", kind: "place", role: "Carthara's docks and customs house. The Second Seat.", body: "Magistra Ilvane Corvo holds the harbor. Hanno departs through its shipping traffic and returns with Alethea to a customs charge. Working berths, duties, and disputed repairs tie the port to the other Seats.", location: "carthara-harbor", chapter: "the-cure" },
  { id: "carthara-garrison", name: "Vael’s Garrison", kind: "place", role: "Carthara's city guard. The Third Seat.", body: "General Tarquin Vael commands the guard, including Dyia. Its offices keep records, hold detainees, and receive claims from people whose lives its officers have changed. A woman's missing belongings bring Dyia face to face with the cost of his methods.", location: "carthara-garrison", chapter: "rising-influence" },
  { id: "bakhtar", name: "Bakhtar", kind: "place", role: "The highlands. The graveyard of empires.", body: "Cliff villages and closed valleys north of the last road, where the caves play flutes at night. Iskandar is buried here somewhere.", location: "bakhtar", chapter: "the-conqueror" },
  { id: "lysandria", name: "Lysandria", kind: "place", role: "An island with two enormous mountains.", body: "Amara's home, and the island where Hanno studies, meets Alethea, and receives a staff from Phylios. Its healing rooms, potters, harbors, and military households connect mountain life to the sea.", location: "lysandria", chapter: "gift-of-lysandria" },
  { id: "tengeri-wastes", name: "The Tengeri Wastes", kind: "place", role: "Refugee camps southwest of Carthara.", body: "The Leonin's refuge after dispossession, not their freely chosen ancestral homeland. Families endure repeated bombardment, enforced labor, and barriers to movement. Chuluun helps one shelter row keep its records and people alive. Official claims of empty militant sites and voluntary labor conflict with the inhabited camp Hanno witnesses.", location: "tengeri-wastes", chapter: "journeys" },
  { id: "sidrat-al-muntaha", name: "Sidrat Al Muntaha", kind: "place", role: "Luminous lakes and glowing roads.", body: "Where Hanno learned the sword, and equilibrium.", location: "sidrat-al-muntaha", chapter: "journeys" },
  { id: "the-fields", name: "The Fields of Numarius", kind: "place", role: "Where debtors go.", body: "Idris died here and feeds the crop.", location: "numarius-fields", chapter: "market-awnings" },

  // ---- Substances
  { id: "ravash", name: "Ravash", kind: "substance", role: "The established drug trade in Carthara.", body: "Sold by the Silken Chain and associated with dependence and harm. Hanno and Alethea develop a treatment requiring ongoing care; it does not erase every consequence. Sinna also uses Ravash in Amara's false remedy.", chapter: "the-cure" },
  { id: "elysian-dust", name: "Elysian Dust", kind: "substance", role: "Hanno's later invention, and a deliberate source of harm.", body: "Made from the Elysian flower associated with his wedding. Its trade depends on intermediaries with different degrees of knowledge. It reaches well beyond the wealthy people Hanno resents and eventually his own household.", chapter: "a-dark-turn" },
  { id: "elysian-flower", name: "The Elysian Flower", kind: "substance", role: "The red-and-yellow plant behind Elysian Dust.", body: "Grows on the Moonlit Isle off Lysandria. A wedding memory and the source plant for Dust, not a separate named drug readers must track.", location: "moonlit-isle", chapter: "gift-of-lysandria" },

  // ---- Artifacts
  { id: "zaharaz", name: "Zaharaz", kind: "artifact", role: "Hanno's travelling staff.", body: "Given by General Phylios in gratitude for treating his son. A useful staff with personal meaning, not a bladed weapon or a source of exceptional fighting ability.", chapter: "gift-of-lysandria" },
];

export const codexKinds: { kind: CodexKind; label: string }[] = [
  { kind: "person", label: "People" },
  { kind: "faction", label: "Factions" },
  { kind: "place", label: "Places" },
  { kind: "substance", label: "Substances" },
  { kind: "artifact", label: "Artifacts" },
];

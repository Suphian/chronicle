import type { Chapter } from "../types";

/** An optional Bakhtari legend, kept outside the main novel's opening sequence. */
export const theConqueror: Chapter = {
  slug: "the-conqueror",
  order: 0,
  title: "The Conqueror",
  subtitle: "A Legend of the Highlands",
  summary:
    "One telling of Rukhsana and the western king: a threatened valley, a costly settlement, a marriage, and an army that refuses another war. The song preserves claims and disagreements, not a verified history.",
  mood: "storm",
  when: "Long before Hanno · dates and details disputed",
  status: "draft",
  music: "/audio/ambient-wind.wav",
  cover: "/images/chronicle/bakhtar.webp",
  scenes: [
    { id: "title", kind: "title", heading: "The Conqueror", text: ["A Legend of the Highlands"], mood: "storm" },
    {
      id: "the-graveyard-of-empires",
      heading: "The Graveyard of Empires",
      mood: "storm",
      pov: "rukhsana",
      location: "bakhtar",
      image: "/images/chronicle/bakhtar.webp",
      text: [
        "In this telling, Rukhsana takes the door off its hinges before she carries anything else into the cave.",
        "Her aunt wants the grain brought up first. Rukhsana points to the door. It is a good one, seasoned wood with a sound latch. They can sleep on it above the wet cave floor, and when they come back they will have something to close behind them.",
        "“If there is a house to put it on,” her aunt says.",
        "“Then we will need the wood.”",
        "They carry it between them up the steps cut into the cliff. Below, the valley terraces hold the last of the standing crop. Nobody has time to finish harvesting. At the far end of the path a boy drives goats ahead of him, losing one whenever he turns to collect another. Rukhsana puts down her end and helps him get them through the narrow gate.",
        "By dusk the cave is full of possessions that do not fit together: seed sacks, rolled bedding, a loom too large to stand upright. People who have shared a courtyard for years quarrel over a place to sit.",
        "The old songs call Bakhtar the graveyard of empires. They count sea-kings, horse-lords, even a Lysandrian phalanx among the dead. The people climbing that evening have other things to count. Rukhsana checks the bundles against the families arriving. A woman has brought her cooking pot but left its lid. Someone must go back for the sick man who cannot manage the steps."
      ],
    },
    {
      id: "the-flutes",
      heading: "The Flutes",
      mood: "night",
      pov: "rukhsana",
      ambient: "/audio/ambient-night.wav",
      text: [
        "After dark, Rukhsana walks to the outer passage with her flute. Beneath her, lights move along the valley floor. Each little group pauses where the road narrows, then stretches out again. She counts until her eyes ache.",
        "A guard has been posted at the cave mouth. He wants her to sound the warning once more.",
        "“They heard it.”",
        "“Then tell them how many.”",
        "She holds out the flute. “With this?”",
        "He does not take it. The warning is a short sequence, familiar even to children, but it is not a language in which she can describe every wagon and horse. She tells him what she has counted. He repeats it until he has it, then goes to find someone willing to carry the message over the ridge.",
        "Alone in the passage, she begins a different song, one her aunt sings while setting the loom. The first notes come back thinly from the far wall. She shifts her feet and tries again until the sound opens.",
        "From another cave comes an answer, slightly late. She knows the player by the way he hurries a difficult turn. His household has reached shelter. She lets her last note hang long enough for him to hear.",
        "The soldiers below will tell their own children that the mountains played flutes at them. Here, above the lights, she plays until the guard returns and asks her to stop. A child in the inner chamber has finally fallen asleep."
      ],
    },
    {
      id: "iskandar",
      heading: "Iskandar",
      mood: "gold",
      pov: "rukhsana",
      ambient: "/audio/ambient-ember.wav",
      text: [
        "The singers give Iskandar fifty thousand men. Rukhsana, brought before him during the first truce, gives him the number she counted passing her valley. He asks how she knows.",
        "“I watched you.”",
        "He is younger than she expected, with a strap mark across his forehead and dust worked into the seams of his boots. An officer repeats her answer as though its simplicity must conceal an insult.",
        "She has come about the grain seized from the abandoned houses. Iskandar offers payment. She asks where she is supposed to buy another harvest.",
        "He returns part of it. His men keep the rest. The truce ends.",
        "Three campaigning years occupy a short passage in the song. In the valley they require three seed stores, three attempts to repair the lower watercourse, three winters in which the absent have to be left out of the household count. The western army loses men on the roads and in the passes. Highland families lose fields, animals, and people whose names do not enter the king's account.",
        "At the last negotiation, Iskandar asks Rukhsana to play. She refuses until the grain terms have been read back.",
        "He listens afterward. He has learned enough to recognize the tune, badly played by one of his own men on a captured flute. Now he asks where that man heard it, and discovers that a soldier he has rewarded for taking a storehouse also took the family sheltering there.",
        "Learning the songs wins Bakhtar, says the verse. In this telling there are also released prisoners, provisions returned, and agreements about which armed men may enter which lanes. Iskandar calls it conquest. Rukhsana's aunt asks whether she can put her door back. Nobody sends a proclamation to answer her."
      ],
    },
    {
      id: "rukhsana",
      heading: "Rukhsana",
      mood: "dawn",
      pov: "rukhsana",
      text: [
        "Rukhsana sees him again beside the damaged watercourse. He has promised men to help clear it, and she has come because promises made at a table often disappear on the road.",
        "He arrives late. She puts a basket in his hands.",
        "“Your men are waiting for you to start.”",
        "“They obey orders.”",
        "“Then order them.”",
        "He looks along the line of watching soldiers, takes off his cloak, and carries the first load. Later, eating beside the channel, he asks whether she means to make him do this every day.",
        "“Only until it works.”",
        "They meet through the following season. He brings questions she sometimes refuses to answer. She discovers that he can tolerate being corrected in private and becomes angry when it happens before his officers. When he asks her to marry him, she says she will not go west to be displayed as the woman who surrendered the highlands.",
        "He says he will stay.",
        "Her aunt wants to know who will make him keep that promise. She has another objection, harder to dismiss: some of the households sharing the repaired channel are mourning people his soldiers killed.",
        "“I know,” Rukhsana says.",
        "“You will eat with them afterward.”",
        "The marriage takes place underground, as the song insists. Some neighbors come; others do not. Rukhsana notices the empty places. Iskandar wears local wool because the cave is cold, and because she has asked him to leave his armor outside. While they exchange their promises, water drips into a basin near the entrance. Her aunt rises to move it before it overflows."
      ],
      quote: { text: "He took the mountain. The mountain took him back.", by: "A refrain in the Bakhtari legend" },
    },
    {
      id: "the-mutiny",
      heading: "The Mutiny",
      mood: "void",
      pov: "iskandar",
      text: [
        "When Iskandar orders the march east, no one moves to carry the orders out.",
        "He lays his finger on the route. There are supplies to collect beyond the pass, allies waiting, victories that will pay what he owes. His officers have heard these promises before. One asks which men he intends to send.",
        "“The army.”",
        "The officer draws a folded strength return from his belt. There are companies on it that have scarcely enough men to carry their own wounded.",
        "Iskandar tells him to put it away.",
        "Outside the tent, soldiers have assembled without their weapons. That unsettles him more than a raised spear would. They have brought worn sandals, discharge requests, letters from households that no longer resemble the ones they left.",
        "He speaks of what they have accomplished. A man near the front asks to go home.",
        "Iskandar knows how to punish that man. He does not know what to do when the others repeat the request.",
        "The army leaves. Fifty thousand come down the road in the refrain, just as fifty thousand once went up. A singer who is challenged may say the dead are marching with them. It is the song's returning number, not a reliable count of survivors.",
        "On the morning they depart, Iskandar stands at the edge of the camp and waits for an officer to turn back. Carts creak past him. Men lower their eyes or look directly at him, according to what they have come to believe he owes them. At last the space where the tents stood is empty."
      ],
    },
    {
      id: "he-stayed",
      heading: "He Stayed",
      mood: "ember",
      pov: "rukhsana",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "He stays. That is the part on which the tellings agree.",
        "In the fever version, Rukhsana changes the cloth beside his bed and argues with a healer who wants the room kept warmer. He calls for an officer who has gone west. She tells him the man's name when he cannot remember it.",
        "In the knife version, she wakes to voices at the door. Someone has carried him through the village on a shutter. There is blood on another person's sleeve, and nobody will give the same account twice.",
        "The song will not settle it. Neither will this telling.",
        "Afterward, envoys want his seals. Men who would not enter her house while he lived come to ask who has the authority to make agreements. Rukhsana makes them wait while the household prepares him for burial.",
        "She refuses the demand that his body be sent west. In the song he lies in a cave whose name the singer will not give. Whether the place was concealed from enemies, forgotten, or never known to the person singing is another question without a shared answer.",
        "The empire breaks apart quickly in the verses. Its fragments take longer to reach the valley: competing claims, disputed payments, travelers seeking a road through. Rukhsana sends for the people who witnessed the grain agreement. Whatever is happening to the king's inheritance, there is still a harvest to divide."
      ],
    },
    {
      id: "the-line",
      heading: "The Line",
      mood: "forest",
      location: "carthara",
      image: "/images/chronicle/carthara.webp",
      text: [
        "Some singers finish with the burial. Others follow Rukhsana's household into later generations, choosing one marriage out of many, one departure down a pass, until the line reaches a coast the conqueror never saw.",
        "Here, one telling carries that line as far as Amara Averroes. The song cannot supply all the missing names, or explain how the highland lineage reaches a potter who calls the island of Lysandria home.",
        "In Carthara, she works above a pottery shop. A bowl turns between her hands. Sometimes she hums a melody that seems about to end and begins another phrase instead.",
        "Her sons hear it from the next room. They know which sound means she is working easily, and which silence means a pot has gone wrong. They do not know the verses about the army, the grain, or the door carried uphill.",
        "Hanno has never seen Bakhtar. If someone asks him where that tune comes from, he can only say that his mother sings it."
      ],
    },
  ],
};

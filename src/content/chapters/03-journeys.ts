import type { Chapter } from "../types";

export const journeys: Chapter = {
  slug: "journeys",
  order: 3,
  title: "Journeys into the Unknown",
  subtitle: "Chapter Three",
  summary:
    "Virello sends Hanno across the world for rare ingredients. He comes back with a bow, a sword, and a philosophy. Dyia, patrolling the alleys at home, comes back with blood on his hands.",
  mood: "dawn",
  when: "The years abroad",
  music: "/audio/ambient-wind.wav",
  scenes: [
    { id: "title", kind: "title", heading: "Journeys into the Unknown", text: ["Chapter Three"], mood: "dawn" },
    {
      id: "sent-away",
      heading: "Sent Away",
      mood: "gold",
      text: [
        "The years pass in cycles of alchemy, training, and quiet desperation. Eventually Virello, recognizing what his apprentice is worth, begins sending him on distant expeditions to gather rare ingredients.",
        "For Hanno, each journey is an escape from Carthara's hardships. He still does not understand what his master is really doing with the things he brings home.",
      ],
    },
    {
      id: "tengeri-wastes",
      heading: "The Tengeri Wastes",
      mood: "dawn",
      location: "tengeri-wastes",
      text: [
        "The wind has carved canyons through the jagged cliffs of the Wastes. Among the Leonin clans, fierce and proud and reverent of nature, Hanno learns to survive, to track silently, and to loose arrows that sing through the air.",
        "They accept him as one of their own. He trades for Leonin herbs, bone-crafted artifacts, and desert minerals, all of it sent back to Carthara for Virello's mysterious use.",
      ],
      quote: {
        text: "Strength and wisdom must always be balanced. The greatest warriors wield compassion as skillfully as their blades.",
        by: "Chuluun, Leonin elder",
      },
    },
    {
      id: "lake-siraj",
      heading: "Lake Siraj",
      mood: "night",
      location: "sidrat-al-muntaha",
      ambient: "/audio/ambient-night.wav",
      text: [
        "Sidrat Al Muntaha is a land of luminous landscapes and sacred lakes. Beneath the soft glow of Lake Siraj, Hanno trains with master swordsmen who pair martial prowess with philosophy.",
        "The discipline of the sword matches the discipline of alchemy: care, balance, respect. Among moss-covered bridges and roads lined with glowing plants, he begins to understand equilibrium as a way to live, not just a way to mix.",
        "He buys bioluminescent plants and glowing minerals found nowhere else, and ships them home.",
      ],
    },
    {
      id: "toward-lysandria",
      heading: "Toward Lysandria",
      mood: "storm",
      location: "lysandria",
      text: [
        "Finally his path bends toward Lysandria, a rugged mountain kingdom of disciplined warriors devoted to harmony. As the peaks rise ahead of him, he feels an inexplicable sense of destiny.",
        "Thoughts of home never fade entirely. Guilt for his absences, for his blindness, travels with him. One day he will return, carrying enough skill and knowledge to mend what was broken.",
      ],
    },
    {
      id: "nightly-patrols",
      heading: "Nightly Patrols",
      mood: "void",
      location: "carthara",
      text: [
        "In Carthara, Dyia rises through the guard, solitary and relentless. He patrols the alleys alone, arresting the men who prey on the vulnerable. Every captured Silker brings satisfaction, and deepens the rage underneath it.",
        "Sometimes the rage wins. He dispenses justice swiftly and brutally, bypassing trials. Sometimes he takes lives.",
        "One of them is a man he recognizes: the Silker who sold Ravash to his mother. That killing haunts him. He tells himself it was necessary. Some evils, he decides, are beyond redemption.",
      ],
    },
    {
      id: "collision-course",
      heading: "Collision Course",
      mood: "night",
      text: [
        "In distant lands and shadowed streets, the brothers chase the same things without knowing it: mastery, justice, an elusive sense of balance.",
        "Every step forward carries them further apart, and sets them on a course neither of them can see.",
      ],
    },
  ],
};

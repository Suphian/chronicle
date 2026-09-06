import type { Chapter } from "../types";

export const bitterApprenticeship: Chapter = {
  slug: "bitter-apprenticeship",
  order: 2,
  title: "The Bitter Apprenticeship",
  subtitle: "Chapter Two",
  summary:
    "Inside Virello's labyrinth of vials, Hanno's gift outgrows his master. Outside it, Dyia follows their mother into the alleys and finds the Silken Chain waiting.",
  mood: "forest",
  when: "Hanno's youth",
  music: "/audio/ambient-night.wav",
  scenes: [
    { id: "title", kind: "title", heading: "The Bitter Apprenticeship", text: ["Chapter Two"], mood: "void" },
    {
      id: "a-world-unto-itself",
      heading: "A World Unto Itself",
      mood: "void",
      text: [
        "Master Virello's apothecary is a labyrinth of shelves: mysterious powders, dried herbs, and shimmering vials that catch the light like captured stars.",
        "The air is heavy with lavender, sulfur, and anise, mesmerizing and oppressive at once. For Hanno, stepping inside is like entering another realm, one filled with infinite possibilities.",
      ],
    },
    {
      id: "respect-every-ingredient",
      heading: "Respect Every Ingredient",
      mood: "forest",
      text: [
        "The reality of the apprenticeship is harsh. Each morning begins before dawn: scrubbing cauldrons, grinding herbs, mixing under Virello's critical eye.",
        "Hanno absorbs every lesson. His talent soon outpaces his master's expectations, and he begins to concoct remedies no one in Carthara has seen.",
        "He does not know that Virello sells them to the city's elite and claims every one as his own.",
      ],
      quote: {
        text: "Alchemy is precise. Each component balanced meticulously. The slightest error can shift healing into harm.",
        by: "Master Virello",
      },
    },
    {
      id: "the-alleys",
      heading: "Into the Alleys",
      mood: "night",
      text: [
        "At home, Hanno's absences grow longer. He does not notice how Amara's strength drains away. He does not see Dyia's isolation hardening into something else.",
        "One evening Dyia follows their mother into the shadows of Carthara's alleys. Hidden, heart heavy, he watches her trade a few desperate coins for a vial of Ravash.",
        "The anger that surges in him is not at her. It is at the shadowy figures who sold it. Silkers, people call them. Operatives of the Silken Chain.",
      ],
    },
    {
      id: "something-breaking",
      heading: "Something Breaking",
      mood: "ember",
      ambient: "/audio/ambient-ember.wav",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "Hanno comes home late to shouting and the sound of something breaking. He bursts in to find Dyia confronting their mother, rage and despair twisted together in his face.",
        "\"You abandoned us!\" Dyia shouts. \"Do you even see what she has become? How could you be so blind?\"",
        "\"I did this for us!\" Hanno pleads. \"To save our family. To provide for us. I never meant...\"",
        "Dyia lunges. The blow sends Hanno into the wall, scattering pottery and herbs across the floor. The brothers grapple, raw and primal, years of unspoken pain in every hold. It ends with Hanno pinning Dyia to the wall, both of them breathing hard, eyes locked in mutual shock.",
      ],
    },
    {
      id: "go-then",
      heading: "Go, Then",
      mood: "ember",
      text: [
        "\"Go then,\" Dyia finally spits, shoving Hanno away. \"Chase your dreams of glory and wealth. I'll clean up the mess you left behind.\"",
        "He storms out into the night. Hanno stands in the wreckage of their home with a fracture between them that will not close.",
        "Dyia's path is clear now. He will protect the vulnerable and burn the Silken Chain out of Carthara's streets. Joining Numarius's guard is no longer an escape. It is his mission.",
        "Brothers in blood. Strangers in spirit.",
      ],
    },
  ],
};

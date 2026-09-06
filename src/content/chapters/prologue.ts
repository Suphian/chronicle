import type { Chapter } from "../types";

/**
 * PROLOGUE — a template chapter showing every scene type.
 *
 * Copy this file to start a new chapter, then register it in ./index.ts.
 */
export const prologue: Chapter = {
  slug: "prologue",
  order: 0,
  title: "Ashfall",
  subtitle: "Prologue",
  summary:
    "A village burns, a boy walks out of the smoke, and a promise is made that will take a lifetime to keep.",
  mood: "ember",
  when: "Eight years before the chronicle",
  music: "/audio/ambient-ember.wav",
  cover: undefined, // e.g. "/images/prologue/cover.jpg"
  scenes: [
    {
      id: "title",
      kind: "title",
      heading: "Ashfall",
      text: ["Prologue"],
      mood: "ember",
      sfx: "/audio/sfx-ember.wav",
    },
    {
      id: "before",
      heading: "Before",
      mood: "dawn",
      location: "ashvale",
      text: [
        "Ashvale was forty houses, one well, and a shrine that nobody had swept in a generation.",
        "Corvin was nineteen and believed, in the way that only nineteen-year-olds can, that the world ended at the ridge line.",
        "He was wrong about that. He was wrong about a great many things that year.",
      ],
    },
    {
      id: "the-fire",
      heading: "The Fire",
      mood: "ember",
      location: "ashvale",
      sfx: "/audio/sfx-ember.wav",
      text: [
        "It came from the north, and it came at night, and it did not come alone.",
        "He remembers the sound more than the light: the way thatch screams when it burns, the way silence follows.",
        "He remembers a sword in the mud that belonged to someone who no longer needed it. He remembers picking it up.",
      ],
      quote: {
        text: "You can't outrun fire. You can only decide what you carry out of it.",
        by: "Mira Thorne",
      },
    },
    {
      id: "two-years",
      heading: "Two Lost Years",
      mood: "forest",
      text: [
        "The hedge-witch found him three days later, face down in a stream, still holding the sword.",
        "She did not ask his name. He did not offer one. For two years, that was the arrangement.",
        "She taught him which mushrooms to trust, how to set a bone, and that grief is a thing that can be carried but never set down.",
      ],
    },
    {
      id: "the-oath",
      heading: "The Oath",
      mood: "night",
      location: "thornmere",
      ambient: "/audio/ambient-night.wav",
      text: [
        "Thornmere is a forest that drowned and refused to notice.",
        "Beneath the Old Oak, in water to his knees, Corvin swore the only oath he has ever kept: to be the light, to shelter the light, and to preserve his own.",
        "Something in the tree answered. He has never been sure it was a blessing.",
      ],
    },
    {
      id: "vellmar",
      heading: "Vellmar",
      mood: "gold",
      location: "vellmar",
      text: [
        "Eight years after the fire, a man with grey eyes and a sword called Vigil walks across the seventh bridge into the city of a thousand lanterns.",
        "He has a list in his pocket with forty names on it.",
        "This is where the chronicle begins.",
      ],
    },
  ],
};

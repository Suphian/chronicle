import type { CharacterProfile } from "./types";

/**
 * The protagonist of this chronicle.
 *
 * PLACEHOLDER: replace every field with your actual character. Everything in
 * the site that mentions the hero reads from this one file.
 */
export const character: CharacterProfile = {
  name: "Corvin Ashvale",
  epithet: "the Unburnt",
  race: "Human (Variant)",
  class: "Paladin — Oath of the Ancients",
  level: 5,
  alignment: "Neutral Good",
  portrait: undefined, // e.g. "/images/character/portrait.jpg"
  tagline:
    "A fire took his village, his name, and very nearly his faith. Everything that followed was the slow work of deciding what to rebuild.",
  bio: [
    "Corvin was raised in the highland hamlet of Ashvale, a place that no longer exists on any map but this one.",
    "He does not talk about the night it burned. He talks about the morning after, when he walked out of the smoke carrying a sword that was not his and a promise he had not yet learned how to keep.",
    "He has been keeping it, badly and then better, ever since.",
  ],
  traits: [
    { label: "Age", value: "27" },
    { label: "Height", value: "6'1\"" },
    { label: "Eyes", value: "Grey, one clouded" },
    { label: "Deity", value: "None named; he swears by the old oaks" },
    { label: "Weapon", value: "A longsword called Vigil" },
  ],
  bonds: [
    "The people of Ashvale who did not make it out. He carries a list.",
    "Mira Thorne, the hedge-witch who nursed him back and never asked for thanks.",
  ],
  ideals: [
    "Light is a thing you carry, not a thing you find.",
    "Nobody is beyond a second chance — including him.",
  ],
  flaws: [
    "He will walk into a burning building. Every time. Ask him why and he will change the subject.",
    "He trusts too easily, then too little, and rarely in the right order.",
  ],
  timeline: [
    { when: "Age 0", what: "Born in Ashvale, a hamlet in the Grey Reaches." },
    { when: "Age 19", what: "The burning of Ashvale.", chapter: "prologue" },
    { when: "Age 19–21", what: "Two lost years in the wilds with Mira Thorne." },
    { when: "Age 24", what: "Swears the Oath of the Ancients beneath the Old Oak at Thornmere." },
    { when: "Age 27", what: "Arrives in the city of Vellmar. The chronicle begins." },
  ],
};

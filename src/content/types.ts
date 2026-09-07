/**
 * Core content model for the Chronicle.
 *
 * A Chapter is a sequence of Scenes read as continuous illustrated prose.
 * Each Scene can carry text, an image, a video, ambient music, a sound effect,
 * and a link to a location on the world map.
 */

/** Named colour atmospheres used when a scene has no image or video. */
export type Mood =
  | "ember"   // deep reds and orange embers – firelight, forge, battle
  | "night"   // indigo and cold blue – camps, stars, quiet dread
  | "forest"  // mossy greens – wilds, druids, growth
  | "storm"   // slate greys and lightning teal – sea, weather, dread
  | "dawn"    // rose and gold – hope, beginnings, relief
  | "void"    // near-black with violet – the unknown, the planes, death
  | "gold";   // warm amber – cities, taverns, celebration

export type SceneKind = "title" | "text" | "image" | "video";

export interface Scene {
  /** Stable id, used for deep links (`/chapters/<slug>?scene=<id>`) and map pins. */
  id: string;
  /** Layout hint. Defaults to "text"; "title" renders a big centred heading. */
  kind?: SceneKind;
  heading?: string;
  /** Viewpoint label when a narrative scene changes perspective. */
  pov?: string;
  /** Narrative paragraphs. Full prose scenes may contain many paragraphs and dialogue. */
  text?: string[];
  /** Optional pull-quote shown beneath the text. */
  quote?: { text: string; by?: string };
  /** Path under /public, e.g. "/images/prologue/ashfall.jpg". */
  image?: string;
  /** Path under /public, e.g. "/video/prologue/intro.mp4". Loops silently behind the text. */
  video?: string;
  /** Colour atmosphere when no image/video is present. Falls back to the chapter mood. */
  mood?: Mood;
  /** Ambient loop for this scene. Overrides the chapter's music while the scene is visible. */
  ambient?: string;
  /** One-shot sound effect played when the scene appears. */
  sfx?: string;
  /** Id of a location in `src/content/world.ts`. Adds a "View on map" link. */
  location?: string;
}

export interface Chapter {
  /** URL slug: /chapters/<slug> */
  slug: string;
  /** Reading order on the home page. */
  order: number;
  title: string;
  subtitle?: string;
  /** One or two sentences for the chapter card. */
  summary: string;
  mood: Mood;
  /** Ambient loop that plays for the whole chapter unless a scene overrides it. */
  music?: string;
  /** Cover image for the chapter card and title scene. */
  cover?: string;
  /** Rough in-world date or age of the character; free text. */
  when?: string;
  /** outline = sketch; draft = sustained prose; final = revised chapter. */
  status?: "outline" | "draft" | "final";
  scenes: Scene[];
}

export interface WorldLocation {
  id: string;
  name: string;
  /** Short flavour line shown on hover. */
  tagline: string;
  /** Longer description shown in the side panel. */
  description: string;
  /** Position on the 1200x800 map canvas. */
  x: number;
  y: number;
  /** Type controls the pin glyph. */
  type: "city" | "ruin" | "wild" | "landmark" | "sea";
  /** Chapters/scenes that happen here, for cross-linking. */
  appearsIn?: { chapter: string; scene?: string; label?: string }[];
}

export interface CharacterProfile {
  name: string;
  epithet?: string;
  race: string;
  class: string;
  level?: number;
  alignment?: string;
  portrait?: string;
  /** One-paragraph hook shown on the home page. */
  tagline: string;
  bio: string[];
  traits: { label: string; value: string }[];
  bonds: string[];
  ideals: string[];
  flaws: string[];
  /** Things he believes that are not true. */
  lies?: string[];
  /** Big beats of the character's life, oldest first. */
  timeline: { when: string; what: string; chapter?: string }[];
}

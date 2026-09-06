import type { Mood } from "@/content/types";

export interface MoodStyle {
  /** CSS background for the full-screen backdrop. */
  background: string;
  /** Accent colour for headings, particles, and UI highlights. */
  accent: string;
  /** Particle system to overlay. */
  particles: "embers" | "stars" | "motes" | "rain" | "none";
}

export const moods: Record<Mood, MoodStyle> = {
  ember: {
    background:
      "radial-gradient(ellipse 80% 60% at 50% 100%, #4a140c 0%, #1c0806 45%, #070304 100%)",
    accent: "#ff8a4c",
    particles: "embers",
  },
  night: {
    background:
      "radial-gradient(ellipse 90% 70% at 50% 0%, #131a4a 0%, #0a0d24 50%, #04050d 100%)",
    accent: "#9db4ff",
    particles: "stars",
  },
  forest: {
    background:
      "radial-gradient(ellipse 80% 70% at 30% 80%, #123a24 0%, #0a1f13 45%, #040a06 100%)",
    accent: "#8fe0a8",
    particles: "motes",
  },
  storm: {
    background:
      "radial-gradient(ellipse 100% 60% at 50% 20%, #26313f 0%, #121820 50%, #07090d 100%)",
    accent: "#9fe3e3",
    particles: "rain",
  },
  dawn: {
    background:
      "radial-gradient(ellipse 90% 60% at 50% 100%, #6b2f45 0%, #2f1522 45%, #140910 100%)",
    accent: "#ffc19a",
    particles: "motes",
  },
  void: {
    background:
      "radial-gradient(ellipse 70% 70% at 50% 50%, #241040 0%, #0f0620 50%, #030205 100%)",
    accent: "#c9a0ff",
    particles: "stars",
  },
  gold: {
    background:
      "radial-gradient(ellipse 80% 60% at 50% 100%, #5a3d10 0%, #261a06 45%, #0f0902 100%)",
    accent: "#ffd77f",
    particles: "embers",
  },
};

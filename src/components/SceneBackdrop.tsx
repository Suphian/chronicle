"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Mood, Scene } from "@/content/types";
import { moods } from "@/lib/moods";
import { Particles } from "./Particles";

/**
 * Full-bleed background for a scene: video > image > mood gradient, always
 * with a vignette and (unless a video is playing) a particle overlay.
 */
export function SceneBackdrop({ scene, fallbackMood, cover }: { scene: Scene; fallbackMood: Mood; cover?: string }) {
  const mood = moods[scene.mood ?? fallbackMood];
  const reducedMotion = useReducedMotion();
  const image = scene.image ?? (scene.kind === "title" ? cover : undefined);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: mood.background }}>
      {scene.video ? (
        <video
          key={scene.video}
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          src={scene.video}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : image ? (
        <motion.div
          key={image}
          className="absolute inset-0"
          initial={{ scale: 1, opacity: reducedMotion ? 1 : 0 }}
          animate={{ scale: reducedMotion ? 1 : 1.06, opacity: 1 }}
          transition={{ scale: { duration: 24, ease: "linear" }, opacity: { duration: reducedMotion ? 0 : 1.4 } }}
        >
          <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
      ) : null}

      {!scene.video && <Particles variant={mood.particles} color={mood.accent} />}

      {image && <div className="pointer-events-none absolute inset-0 bg-black/45" />}

      {/* vignette + bottom fade so text stays legible over any art */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 40%, transparent 0%, rgba(0,0,0,0.55) 100%), linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)",
        }}
      />
    </div>
  );
}

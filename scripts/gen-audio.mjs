/**
 * Generates small placeholder sound files so the audio layer works out of the box.
 * Replace anything in /public/audio with real music and SFX whenever you like.
 *
 *   node scripts/gen-audio.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const RATE = 22050;

function wav(samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(RATE, 24);
  buf.writeUInt32LE(RATE * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }
  return buf;
}

// Deterministic noise so the files are reproducible.
let seed = 1337;
const rand = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296 - 0.5;
};

function drone({ seconds, tones, noise, lfoHz, crackle }) {
  const n = RATE * seconds;
  const out = new Float32Array(n);
  let lp = 0;
  for (let i = 0; i < n; i++) {
    const t = i / RATE;
    let v = 0;
    for (const [hz, amp] of tones) v += Math.sin(2 * Math.PI * hz * t) * amp;
    const lfo = 0.75 + 0.25 * Math.sin(2 * Math.PI * lfoHz * t);
    v *= lfo;
    // one-pole low-passed noise = wind
    lp += (rand() - lp) * 0.02;
    v += lp * noise;
    if (crackle && rand() > 0.4985) v += rand() * 0.35;
    out[i] = v;
  }
  return out;
}

function burst({ seconds, decay, tone }) {
  const n = Math.floor(RATE * seconds);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / RATE;
    const env = Math.exp(-t * decay);
    let v = rand() * 0.9;
    if (tone) v += Math.sin(2 * Math.PI * tone * t) * 0.3;
    out[i] = v * env;
  }
  return out;
}

mkdirSync("public/audio", { recursive: true });

writeFileSync(
  "public/audio/ambient-ember.wav",
  wav(drone({ seconds: 8, tones: [[55, 0.18], [82.5, 0.1], [110, 0.05]], noise: 0.5, lfoHz: 0.125, crackle: true })),
);
writeFileSync(
  "public/audio/ambient-night.wav",
  wav(drone({ seconds: 8, tones: [[65.4, 0.15], [98, 0.08], [196, 0.03]], noise: 0.9, lfoHz: 0.25, crackle: false })),
);
writeFileSync(
  "public/audio/ambient-market.wav",
  wav(drone({ seconds: 8, tones: [[110, 0.12], [165, 0.07], [220, 0.04]], noise: 1.1, lfoHz: 0.5, crackle: false })),
);
writeFileSync(
  "public/audio/ambient-wind.wav",
  wav(drone({ seconds: 8, tones: [[49, 0.12], [73.4, 0.05]], noise: 1.6, lfoHz: 0.125, crackle: false })),
);
writeFileSync("public/audio/sfx-ember.wav", wav(burst({ seconds: 0.7, decay: 6, tone: 0 })));
writeFileSync("public/audio/sfx-page.wav", wav(burst({ seconds: 0.25, decay: 22, tone: 0 })));

console.log("wrote public/audio/{ambient-ember,ambient-night,ambient-market,ambient-wind,sfx-ember,sfx-page}.wav");

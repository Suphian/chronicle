import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { voiceCast } from "@/content/narration";
import { voiceDesigns } from "@/content/voice-designs";
import { designedVoices } from "@/content/designed-voices";

export const metadata = { title: "Character voices | The Chronicle" };

export default function CharacterVoicesPage() {
  const auditions: Record<string, { file: string; title: string }> = {};
  for (const id of Object.keys(voiceDesigns)) {
    const file = path.join(process.cwd(), "public/audio/voices", id, "audition.json");
    if (fs.existsSync(file)) {
      const audition = JSON.parse(fs.readFileSync(file, "utf8"));
      if (audition.inputs?.every((input: { voice_id: string }) => input.voice_id === voiceCast[id].elevenLabsVoiceId)) auditions[id] = audition;
    }
  }
  return <main id="main-content" className="section-shell"><div className="section-inner">
    <Link className="book-location" href="/workshop/materials">← Writing room materials</Link>
    <p className="book-eyebrow">The speaking cast</p><h1>Character voices</h1>
    <p className="section-lead">Each named character has a separate ElevenLabs voice. Performance choices come from the character profiles, with delivery changing to fit the scene.</p>
    <p className="section-footnote">The current cast uses stock voices with performance cues. Custom voice-design briefs are prepared for all thirteen characters; creating them through the ElevenLabs API requires a paid account and enough voice slots. These are casting interpretations, including the proposed accents and vocal ages.</p>
    <section className="section-block"><h2>Idris: the fruit seller</h2>
      <p>Warm, weathered and persuasive. His stall voice welcomes customers; at home, pride and affection coexist. As debt closes in, warmth gives way to strain and firm insistence.</p>
      <p>The narrator uses George. Idris currently uses Daniel, with directions applied to his dialogue. A custom Idris voice is still pending.</p>
    </section>
    <div className="voice-cast">{Object.entries(voiceDesigns).map(([id, design]) => <section key={id} className="section-block">
      <h2>{voiceCast[id].name}</h2>
      <p className="book-eyebrow">{designedVoices[id] ? "Saved custom voice" : "Distinct stock voice · custom design pending"}</p>
      <p>{voiceCast[id].direction}</p>
      {auditions[id] && <figure><audio controls preload="none" aria-label={`${voiceCast[id].name} voice audition`} src={`/audio/voices/${id}/${auditions[id].file}`} /><figcaption>{auditions[id].title} · Selected manuscript lines; audition for review.</figcaption></figure>}
      <details><summary>Voice design brief</summary><p>{design.description}</p></details>
      <Link className="book-location" href={`/library/characters/${design.profile}`}>Character profile →</Link>
    </section>)}</div>
    <p className="section-footnote">Voices by <a href="https://elevenlabs.io">elevenlabs.io</a>. <Link href="/library/narration">Recording progress and sources</Link></p>
  </div></main>;
}

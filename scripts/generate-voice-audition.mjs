// A short profile-directed audition, using reviewed dialogue from the manuscript.
// Node 24+: node --env-file=.env.local scripts/generate-voice-audition.mjs adil --generate
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { voiceCast, dialogueCue } from '../src/content/narration.ts';
import { getNarrationSegments } from '../src/lib/narration.ts';

const speaker = process.argv[2];
assert(voiceCast[speaker], 'Choose a stable cast ID.');
const inputs = [], sources = [];
for (const file of fs.readdirSync('src/content/chapters').filter(file => /^\d.*\.ts$/.test(file))) {
  const chapterModule = await import(pathToFileURL(path.resolve('src/content/chapters', file)).href);
  const chapter = Object.values(chapterModule).find(value => value?.slug && value?.scenes);
  for (const segment of getNarrationSegments(chapter).filter(segment => segment.speaker === speaker)) {
    inputs.push({ text: dialogueCue(chapter.slug, segment.sceneId, speaker) + segment.text, voice_id: voiceCast[speaker].elevenLabsVoiceId });
    sources.push({ chapter: chapter.slug, scene: segment.sceneId, paragraphIndex: segment.paragraphIndex });
    if (inputs.reduce((sum, input) => sum + input.text.length, 0) >= 180) break;
  }
  if (inputs.reduce((sum, input) => sum + input.text.length, 0) >= 180) break;
}
const characters = inputs.reduce((sum, input) => sum + input.text.length, 0);
assert(characters > 0 && characters <= 1000, 'Audition exceeds the short-sample budget.');
const body = { model_id: 'eleven_v3', inputs, language_code: 'en', seed: 42 };
const hash = createHash('sha256').update(JSON.stringify(body)).digest('hex');
const folder = path.resolve('public/audio/voices', speaker);
const file = `audition-${hash.slice(0,16)}.mp3`;
console.log(`${voiceCast[speaker].name}: ${characters} characters, ${file}`);
if (!process.argv.includes('--generate')) process.exit(0);
if (fs.existsSync(path.join(folder, file))) { console.log('Reusing saved audition.'); process.exit(0); }
assert(process.env.ELEVENLABS_API_KEY);
const headers = { 'xi-api-key': process.env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json' };
const allowance = await fetch('https://api.elevenlabs.io/v1/user/subscription', {headers});
assert(allowance.ok);
const subscription = await allowance.json();
assert(subscription.character_limit - subscription.character_count >= characters, 'Insufficient included allowance.');
const response = await fetch('https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128', {
  method: 'POST', headers, body: JSON.stringify(body), signal: AbortSignal.timeout(60000),
});
assert(response.ok, `Audition failed, HTTP ${response.status}. No automatic retry.`);
assert(response.headers.get('content-type')?.startsWith('audio/'));
const audio = Buffer.from(await response.arrayBuffer());
assert(audio.length > 1000);
fs.mkdirSync(folder, {recursive:true});
fs.writeFileSync(path.join(folder,file),audio);
fs.writeFileSync(path.join(folder, 'audition.json'), JSON.stringify({ provider:'ElevenLabs', file, inputHash:hash,
  title:`${voiceCast[speaker].name} voice audition · elevenlabs.io`, generatedAt:new Date().toISOString(),
  ...body, sources, characters, bytes:audio.length, tier:subscription.tier,
  license:subscription.tier === 'free' ? 'Noncommercial only; attribution elevenlabs.io in published title.' : 'Generated under account paid plan; see ElevenLabs terms.',
  licenseSource:'https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform',
}, null, 2)+'\n');
console.log(`Saved ${path.join(folder,file)}`);

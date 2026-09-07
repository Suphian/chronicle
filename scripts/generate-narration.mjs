// Node 24+: node --env-file=.env.local scripts/generate-narration.mjs market-awnings --scene the-fruit-stall --generate
// Default is a dry run. No secret reaches the website; playback uses prepared local audio.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { voiceCast, dialogueSpeakers, dialogueRevisions, dialogueCue } from '../src/content/narration.ts';
import { getNarrationSegments, narrationSourceHash, dialogueSignature, splitSpeechText } from '../src/lib/narration.ts';

const args = process.argv.slice(2);
const slug = args[0];
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const sceneId = option('--scene', undefined);
const maxCharacters = Number(option('--max-characters', '6000'));
assert(slug && /^[a-z0-9-]+$/.test(slug), 'Provide a chapter slug.');
assert(Number.isInteger(maxCharacters) && maxCharacters > 0, 'Invalid character budget.');
const files = fs.readdirSync('src/content/chapters').filter(file => /^\d.*\.ts$/.test(file));
const chapters = [];
for (const file of files) {
  const chapterModule = await import(pathToFileURL(path.resolve('src/content/chapters', file)).href);
  chapters.push(...Object.values(chapterModule).filter(value => value?.slug && value?.scenes));
}
const chapter = chapters.find(chapter => chapter.slug === slug);
assert(chapter, 'Unknown chapter.');
assert(!sceneId || chapter.scenes.some(scene => scene.id === sceneId && scene.kind !== 'title'), 'Unknown prose scene.');
for (const scene of chapter.scenes.filter(scene => scene.kind !== 'title' && (!sceneId || scene.id === sceneId))) {
  const quotes = (scene.text ?? []).flatMap(text => [...text.matchAll(/“[^”]*”|‘[^’]*’|"[^"\n]*"/gu)]);
  const key = `${slug}/${scene.id}`;
  if (quotes.length) {
    assert.equal(dialogueRevisions[key], dialogueSignature(scene), `Review casting before generation: ${key}`);
    assert.equal(dialogueSpeakers[key]?.length, quotes.length, `Incomplete dialogue cast: ${key}`);
  }
}
const allSegments = getNarrationSegments(chapter);
const selected = allSegments.filter(segment => !sceneId || segment.sceneId === sceneId);
const batches = [];
let batch;
for (const segment of selected) {
  const voice = voiceCast[segment.speaker];
  assert(voice?.elevenLabsVoiceId, `Choose an ElevenLabs voice for ${voice?.name ?? segment.speaker} before generating.`);
  const cue = dialogueCue(slug, segment.sceneId, segment.speaker);
  for (const prose of splitSpeechText(segment.text, 1750 - cue.length)) {
    if (!prose.trim()) continue;
    const text = cue + prose;
    if (!batch || batch.sceneId !== segment.sceneId || batch.characters + text.length > 1800 || (!batch.voices.has(voice.elevenLabsVoiceId) && batch.voices.size === 10)) {
      batch = { inputs: [], sceneId: segment.sceneId, paragraphIndex: segment.paragraphIndex, characters: 0, voices: new Set() };
      batches.push(batch);
    }
    batch.inputs.push({ text, voice_id: voice.elevenLabsVoiceId });
    batch.characters += text.length;
    batch.voices.add(voice.elevenLabsVoiceId);
  }
}
const total = batches.reduce((sum, batch) => sum + batch.characters, 0);
assert(total <= maxCharacters, `This request needs ${total} characters, above the ${maxCharacters} limit. Narrow --scene or explicitly raise --max-characters.`);
const outputDir = path.resolve('public/audio/narration', slug);
const sourceHash = await narrationSourceHash(chapter);
const manifestPath = path.join(outputDir, 'manifest.json');
const priorManifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : null;
const model = 'eleven_v3';
for (const batch of batches) {
  batch.hash = createHash('sha256').update(JSON.stringify({ model, inputs: batch.inputs })).digest('hex');
  batch.file = `${batch.sceneId}-${batch.hash.slice(0, 16)}.mp3`;
  batch.cached = fs.existsSync(path.join(outputDir, batch.file));
}
const needed = batches.filter(batch => !batch.cached).reduce((sum, batch) => sum + batch.characters, 0);
console.log(`${chapter.title}: ${selected.length} narrator/character parts; ${batches.length} clips; ${total} characters (${needed} uncached).`);
if (!args.includes('--generate')) {
  console.log('Dry run only. Add --generate to use ElevenLabs credits.');
  process.exit(0);
}
assert(process.env.ELEVENLABS_API_KEY, 'Set ELEVENLABS_API_KEY in ignored .env.local. Never put a key in public code.');
const headers = { 'xi-api-key': process.env.ELEVENLABS_API_KEY };
const subscriptionResponse = await fetch('https://api.elevenlabs.io/v1/user/subscription', { headers, signal: AbortSignal.timeout(30000) });
assert(subscriptionResponse.ok, `Could not check generation allowance (HTTP ${subscriptionResponse.status}).`);
const subscription = await subscriptionResponse.json();
assert(Number.isFinite(subscription.character_limit) && Number.isFinite(subscription.character_count), 'Generation allowance unavailable.');
assert(needed <= subscription.character_limit - subscription.character_count, 'Insufficient included allowance. No purchase or overage was started.');
fs.mkdirSync(outputDir, { recursive: true });
const provenancePath = path.join(outputDir, 'provenance.json');
const previous = fs.existsSync(provenancePath) ? JSON.parse(fs.readFileSync(provenancePath, 'utf8')) : { assets: [] };
const assets = [...previous.assets];
for (const [index, batch] of batches.entries()) {
  if (!batch.cached) {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128', {
      method: 'POST', headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model_id: model, inputs: batch.inputs, language_code: 'en', seed: 42 }),
      signal: AbortSignal.timeout(120000),
    });
    // Do not automatically retry a billed request with an uncertain result.
    assert(response.ok, `Clip ${index + 1} generation failed (HTTP ${response.status}). Earlier clips are cached; manifest was not replaced.`);
    assert(response.headers.get('content-type')?.startsWith('audio/'), 'Expected audio response.');
    const buffer = Buffer.from(await response.arrayBuffer());
    assert(buffer.length > 1000, 'Empty or incomplete audio response.');
    fs.writeFileSync(path.join(outputDir, batch.file), buffer);
    assets.push({ file: batch.file, inputHash: batch.hash, bytes: buffer.length, characters: batch.characters,
      generatedAt: new Date().toISOString(), model, voiceIds: [...batch.voices], tier: subscription.tier,
      license: subscription.tier === 'free' ? 'Noncommercial only; attribution elevenlabs.io in published title.' : 'Generated under the account paid plan; see ElevenLabs terms.',
      licenseSource: 'https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform' });
    fs.writeFileSync(provenancePath, JSON.stringify({ provider: 'ElevenLabs', assets }, null, 2) + '\n');
  } else assert(assets.some(asset => asset.file === batch.file), `Cached clip lacks provenance: ${batch.file}`);
  console.log(`Clip ${index + 1}/${batches.length}: ${batch.cached ? 'reused' : 'generated'}.`);
}
const proseSceneIds = chapter.scenes.filter(scene => scene.kind !== 'title' && scene.text?.length).map(scene => scene.id);
const keepPrevious = sceneId && priorManifest?.version === 1 && priorManifest.sourceHash === sourceHash;
const completedScenes = [...new Set([
  ...(keepPrevious ? priorManifest.complete ? proseSceneIds : priorManifest.completedScenes ?? [] : []),
  ...(sceneId ? [sceneId] : proseSceneIds),
])];
const chunks = [
  ...(keepPrevious ? priorManifest.chunks.filter(chunk => chunk.sceneId !== sceneId) : []),
  ...batches.map(batch => ({ src: `/audio/narration/${slug}/${batch.file}`, sceneId: batch.sceneId,
    paragraphIndex: batch.paragraphIndex, speaker: 'cast' })),
].sort((left, right) => proseSceneIds.indexOf(left.sceneId) - proseSceneIds.indexOf(right.sceneId) || left.paragraphIndex - right.paragraphIndex);
const complete = proseSceneIds.every(id => completedScenes.includes(id));
const manifest = { version: 1, sourceHash, provider: 'ElevenLabs', complete, completedScenes,
  title: `${complete ? chapter.title : 'Cast recording sample'} · elevenlabs.io`, chunks };
const temporaryManifest = path.join(outputDir, 'manifest.pending.json');
fs.writeFileSync(temporaryManifest, JSON.stringify(manifest, null, 2) + '\n');
fs.renameSync(temporaryManifest, manifestPath);
console.log(`Saved ${manifest.complete ? 'complete recording' : 'cast sample'} to public/audio/narration/${slug}/manifest.json.`);

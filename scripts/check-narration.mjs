// Node 24+: exercise manuscript fidelity, cast drift protection, and recording validation.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';

const { getNarrationSegments, narrationText, narrationSourceHash, dialogueSignature, splitSpeechText, validateNarrationManifest } = await import('../src/lib/narration.ts');
const { voiceCast, dialogueSpeakers, dialogueRevisions } = await import('../src/content/narration.ts');
const { getNarrationPassages, OPENING_PASSAGE_CHARACTER_LIMIT, PASSAGE_CHARACTER_LIMIT } = await import('../src/lib/narration-passages.ts');

let paragraphCount = 0;
let characterParts = 0;
let recordings = 0;
const chapters = [];
for (const file of fs.readdirSync('src/content/chapters').filter((file) => /^\d.*\.ts$/.test(file))) {
  const chapterModule = await import(pathToFileURL(path.resolve('src/content/chapters', file)).href);
  const chapter = Object.values(chapterModule).find((value) => value?.slug && value?.scenes);
  chapters.push(chapter);
  const segments = getNarrationSegments(chapter);
  const passages = getNarrationPassages(chapter);
  let previousParagraph = '';
  const canonicalText = segments.map(segment => {
    const paragraph = `${segment.sceneId}:${segment.paragraphIndex}`;
    const text = previousParagraph && previousParagraph !== paragraph ? `\n\n${segment.text}` : segment.text;
    previousParagraph = paragraph;
    return text;
  }).join('');
  assert.equal(passages.flatMap(part => part.inputs.map(input => input.text)).join(''), canonicalText, chapter.slug + ': passage splitting must preserve exact prose and paragraph spacing');
  for (const sceneId of new Set(passages.map(part => part.sceneId))) {
    const scenePassages = passages.filter(part => part.sceneId === sceneId);
    assert(scenePassages[0].characters <= OPENING_PASSAGE_CHARACTER_LIMIT, `${chapter.slug}/${sceneId}: opening should prepare a short clip`);
    assert(scenePassages.every(part => part.characters > 0 && part.characters <= PASSAGE_CHARACTER_LIMIT), `${chapter.slug}/${sceneId}: all clips remain bounded and nonempty`);
  }
  assert.equal(new Set(segments.map((segment) => segment.id)).size, segments.length, 'segment IDs must be unique');
  assert(segments.every((segment) => voiceCast[segment.speaker]), 'all parts have a known speaker');
  characterParts += segments.filter((segment) => segment.speaker !== 'narrator').length;
  for (const scene of chapter.scenes.filter((scene) => scene.kind !== 'title')) {
    (scene.text ?? []).forEach((paragraph, paragraphIndex) => {
      const parts = segments.filter((segment) => segment.sceneId === scene.id && segment.paragraphIndex === paragraphIndex);
      assert.equal(parts.map((part) => part.text).join(''), paragraph, `${chapter.slug}/${scene.id}:${paragraphIndex}: narration changed prose`);
      paragraphCount++;
    });
    const sceneKey = chapter.slug + '/' + scene.id;
    if (dialogueSpeakers[sceneKey]) {
      assert.equal(dialogueRevisions[sceneKey], dialogueSignature(scene), sceneKey + ': cast attribution is stale');
      const quotes = (scene.text ?? []).flatMap((paragraph) => [...paragraph.matchAll(/“[^”]*”|‘[^’]*’|"[^"\n]*"/gu)]);
      assert.equal(dialogueSpeakers[sceneKey].length, quotes.length, sceneKey + ': attribution must cover each quote');
      for (const speaker of dialogueSpeakers[sceneKey]) assert(voiceCast[speaker], sceneKey + ': unknown cast member ' + speaker);
    }
  }
  const hash = await narrationSourceHash(chapter);
  assert.equal(hash, createHash('sha256').update(narrationText(chapter)).digest('hex'), 'browser and generation hashes agree');
  const manifestPath = path.resolve('public/audio/narration', chapter.slug, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert(validateNarrationManifest(manifest, chapter, hash), chapter.slug + ': invalid or stale recording manifest');
    for (const chunk of manifest.chunks) assert(fs.statSync(path.resolve('public', '.' + chunk.src)).size > 0, 'recording is empty');
    recordings++;
  }
}
assert(characterParts > 0, 'cast must include character dialogue');
const sentenceFixture = structuredClone(chapters[0]);
sentenceFixture.scenes = [{ id: 'quick-start', kind: 'prose', text: ['A short opening sentence. ' + 'The rest of the account continues with ordinary words and a clear ending. '.repeat(15)] }];
const fixturePassages = getNarrationPassages(sentenceFixture);
assert.match(fixturePassages[0].inputs.map(input => input.text).join(''), /\.\s*$/, 'opening clips prefer a complete sentence when one fits');
sentenceFixture.scenes[0].text = ['An unusually long sentence ' + 'with more words '.repeat(60) + 'finally ends.'];
assert.equal(getNarrationPassages(sentenceFixture).flatMap(part => part.inputs.map(input => input.text)).join(''), sentenceFixture.scenes[0].text[0], 'a long first sentence loses no words when bounded');
const example = chapters.find((chapter) => getNarrationSegments(chapter).some((part) => part.speaker !== 'narrator'));
const revised = structuredClone(example);
const voiced = getNarrationSegments(example).find((part) => part.speaker !== 'narrator');
const scene = revised.scenes.find((scene) => scene.id === voiced.sceneId);
scene.text.unshift('“A newly inserted line.”');
assert(getNarrationSegments(revised).filter((part) => part.sceneId === scene.id).every((part) => part.speaker === 'narrator'), 'changed dialogue must not inherit stale cast positions');
assert.notEqual(await narrationSourceHash(revised), await narrationSourceHash(example));
const reassigned = structuredClone(example);
reassigned.scenes.find((scene) => scene.id === voiced.sceneId).text.unshift('An attribution outside dialogue has changed.');
assert(getNarrationSegments(reassigned).filter((part) => part.sceneId === voiced.sceneId).every((part) => part.speaker === 'narrator'), 'changes outside quoted text also invalidate attribution');
const sample = { version: 1, sourceHash: await narrationSourceHash(example), provider: 'ElevenLabs', complete: false, chunks: [{ src: `/audio/narration/${example.slug}/sample.mp3`, sceneId: voiced.sceneId, paragraphIndex: voiced.paragraphIndex, speaker: 'cast' }] };
assert(validateNarrationManifest(sample, example, sample.sourceHash));
assert.equal(validateNarrationManifest(sample, revised, await narrationSourceHash(revised)), null, 'reject stale audio');
assert.equal(validateNarrationManifest({ ...sample, complete: undefined }, example, sample.sourceHash), null, 'sample/full status is mandatory');
for (const src of ['https://untrusted.example/track.mp3', `/audio/narration/${example.slug}/../other.mp3`, `/audio/narration/${example.slug}/track.mp3?key=secret`]) {
  assert.equal(validateNarrationManifest({ ...sample, chunks: [{ ...sample.chunks[0], src }] }, example, sample.sourceHash), null, 'reject unexpected audio URL');
}
const longSpeech = '“First, listen carefully.” Then she paused. '.repeat(100) + 'x'.repeat(440);
const phrases = splitSpeechText(longSpeech);
assert.equal(phrases.join(''), longSpeech);
assert(phrases.every((phrase) => phrase.length > 0 && phrase.length <= 221));
console.log(`Verified ${paragraphCount} unchanged paragraphs, ${characterParts} character parts, ${recordings} recordings, cast drift protection, and audio URL validation.`);

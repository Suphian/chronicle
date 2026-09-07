// Run with Node 24+: checks connections across the manuscript, notebook, and website.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { world } from '../src/content/world.ts';
import { codex } from '../src/content/codex.ts';
import sharp from 'sharp';
import { bookPlates, plateArtwork } from '../src/content/illustrations.ts';
import { getBibleEntries } from '../src/lib/worldbuilding.ts';

const directory = path.resolve('src/content/chapters');
const chapters = [];
for (const file of fs.readdirSync(directory).filter(file => /^\d.*\.ts$/.test(file))) {
  const chapterModule = await import(pathToFileURL(path.join(directory, file)).href);
  chapters.push(...Object.values(chapterModule).filter(value => value?.slug && value?.scenes));
}
const unique = (values, label) => assert.equal(new Set(values).size, values.length, `Duplicate ${label}`);
unique(chapters.map(c => c.slug), 'chapter slug');
unique(chapters.map(c => c.order), 'chapter order');
unique(world.map(p => p.id), 'world ID');
unique(codex.map(p => p.id), 'codex ID');
const chapterBySlug = Object.fromEntries(chapters.map(c => [c.slug, c]));
const locationIds = new Set(world.map(p => p.id));
const asset = (file) => { if (file) assert(fs.existsSync(path.join('public', file)), `Missing asset: ${file}`); };
let total = 0;
for (const chapter of chapters) {
  unique(chapter.scenes.map(s => s.id), `${chapter.slug} scene ID`);
  asset(chapter.cover); asset(chapter.music);
  for (const scene of chapter.scenes) {
    assert(!scene.location || locationIds.has(scene.location), `${chapter.slug}/${scene.id}: unknown place`);
    [scene.image, scene.video, scene.ambient, scene.sfx].forEach(asset);
  }
  const words = chapter.scenes.filter(s => s.kind !== 'title').flatMap(s => [...(s.text ?? []), s.quote?.text ?? '']).join(' ').trim().split(/\s+/).length;
  total += words;
  console.log(`${chapter.order}. ${chapter.title}: ${words.toLocaleString()} words (${chapter.status})`);
}
for (const place of world) for (const ref of place.appearsIn ?? []) {
  const chapter = chapterBySlug[ref.chapter];
  assert(chapter, `${place.id}: unknown chapter ${ref.chapter}`);
  assert(!ref.scene || chapter.scenes.some(s => s.id === ref.scene), `${place.id}: unknown scene ${ref.scene}`);
}
for (const entry of codex) {
  assert(!entry.chapter || chapterBySlug[entry.chapter], `${entry.id}: unknown chapter`);
  assert(!entry.location || locationIds.has(entry.location), `${entry.id}: unknown place`);
  if (entry.kind === 'person') assert(fs.existsSync(`worldbuilding/characters/${entry.id}.md`), `${entry.id}: missing profile`);
}
for (const [id, artwork] of Object.entries(plateArtwork)) {
  asset(artwork.src);
  const metadata = await sharp(path.join('public', artwork.src)).metadata();
  assert.equal(artwork.width, metadata.width, `${id}: incorrect image width`);
  assert.equal(artwork.height, metadata.height, `${id}: incorrect image height`);
  assert(artwork.alt && artwork.caption, `${id}: missing accessible description`);
}
for (const [key, plates] of Object.entries(bookPlates)) {
  const [chapter, sceneId] = key.split('/');
  const scene = chapterBySlug[chapter]?.scenes.find(s => s.id === sceneId);
  assert(scene && scene.kind !== 'title', `Unknown plate placement ${key}`);
  unique(plates.map(p => p.artwork), `${key} illustration`);
  let previous = -1;
  for (const plate of plates) {
    assert(Number.isInteger(plate.afterParagraph) && plate.afterParagraph >= 0 && plate.afterParagraph <= (scene.text?.length ?? 0), `${key}: image falls outside its passage`);
    assert(plate.afterParagraph > previous, `${key}: illustrations must be in reading order`);
    if (plate.layout === 'folio') assert(plate.afterParagraph < scene.text.length, `${key}: folio needs accompanying prose`);
    previous = plate.afterParagraph;
  }
}
for (const chapter of chapters) {
  const plates = chapter.scenes.flatMap(s => bookPlates[`${chapter.slug}/${s.id}`] ?? []);
  assert(plates.length >= (chapter.order === 0 ? 2 : 3), `${chapter.slug}: needs more illustrations`);
  unique(plates.map(p => p.artwork), `${chapter.slug} illustration`);
}
const entries = getBibleEntries();
const notebookPaths = new Set(entries.map(e => `/library/${e.slug}`));
for (const entry of entries) {
  for (const [, raw] of entry.content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = raw.split('#')[0];
    if (!href || /^(https?:|mailto:)/.test(href)) continue;
    if (href.startsWith('/library/')) assert(notebookPaths.has(href), `${entry.slug}: missing notebook link ${href}`);
    else if (!href.startsWith('/')) assert(fs.existsSync(path.resolve('worldbuilding', path.dirname(entry.slug), href)), `${entry.slug}: missing local link ${href}`);
  }
}
console.log(`Verified ${chapters.length} chapters, ${world.length} places, ${entries.length} notebook pages, ${Object.keys(plateArtwork).length} artworks across ${Object.values(bookPlates).flat().length} placements; ${total.toLocaleString()} total words including the optional legend.`);

// Integration check against a running Next build: node scripts/check-reader.mjs http://localhost:3002
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { bookPlates } from '../src/content/illustrations.ts';

const base = process.argv[2] ?? 'http://localhost:3002';
const decode = (text) => text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, entity) => {
  if (entity.startsWith('#x')) return String.fromCodePoint(parseInt(entity.slice(2), 16));
  if (entity.startsWith('#')) return String.fromCodePoint(Number(entity.slice(1)));
  return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[entity];
});
let checked = 0;
let illustrations = 0;
for (const file of fs.readdirSync('src/content/chapters').filter(file => /^\d.*\.ts$/.test(file))) {
  const chapterModule = await import(pathToFileURL(path.resolve('src/content/chapters', file)).href);
  const chapter = Object.values(chapterModule).find(value => value?.slug && value?.scenes);
  const response = await fetch(new URL('/chapters/' + chapter.slug, base));
  assert.equal(response.status, 200, chapter.slug);
  const html = await response.text();
  const expected = chapter.scenes.filter(scene => scene.kind !== 'title').flatMap(scene =>
    (scene.text ?? []).map((text, i) => ({ id: scene.id + ':' + i, text })));
  const rendered = [...html.matchAll(/<p data-prose-id="([^"]+)">([\s\S]*?)<\/p>/g)]
    .map(([, id, text]) => ({ id: decode(id), text: decode(text) }));
  assert.deepEqual(rendered, expected, chapter.slug + ': paragraphs changed, missing, duplicated, or reordered');
  const expectedPlates = chapter.scenes.flatMap(scene => bookPlates[chapter.slug + '/' + scene.id] ?? []);
  const figures = [...html.matchAll(/<figure class="book-plate book-plate-[^"]+">([\s\S]*?)<\/figure>/g)];
  assert.equal(figures.length, expectedPlates.length, chapter.slug + ': missing illustration');
  for (let i = 0; i < figures.length; i++) {
    assert(figures[i][1].includes(encodeURIComponent(expectedPlates[i].src)), chapter.slug + ': wrong illustration order');
    assert(figures[i][1].includes('loading="lazy"'), chapter.slug + ': illustration should load on approach');
  }
  checked += rendered.length;
  illustrations += figures.length;
}
console.log('Verified ' + checked + ' unchanged, ordered paragraphs and ' + illustrations + ' illustrations in the running reader.');

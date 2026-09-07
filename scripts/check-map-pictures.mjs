import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import sharp from 'sharp';

const atlas = JSON.parse(fs.readFileSync('src/content/mizan-source.json', 'utf8'));
const pictures = JSON.parse(fs.readFileSync('src/content/mizan-pictures.json', 'utf8'));
const storyIds = [...fs.readFileSync('src/content/world.ts', 'utf8').matchAll(/^    id: "([^"]+)"/gm)].map(m => m[1]);
const expected = [...atlas.places.map(p => p.id), ...storyIds];
const pending = expected.filter(id => !pictures[id]);
if (!process.argv.includes('--partial')) assert.deepEqual(pending, [], 'Every atlas point and story place needs a dedicated picture');
const hashes = new Set();
for (const [id, picture] of Object.entries(pictures)) {
  assert(expected.includes(id), `Unknown point ${id}`);
  assert(picture.src.startsWith('/images/'), `${id}: local image path required`);
  assert(picture.alt.trim() && picture.caption.trim(), `${id}: accessible description required`);
  const bytes = fs.readFileSync(`public${picture.src}`);
  const hash = crypto.createHash('sha256').update(bytes).digest('hex');
  assert(!hashes.has(hash), `${id}: picture reused by another point`);
  hashes.add(hash);
  const metadata = await sharp(bytes).metadata();
  assert.equal(picture.width, metadata.width, `${id}: wrong width`);
  assert.equal(picture.height, metadata.height, `${id}: wrong height`);
  if (picture.src.includes('/points/')) {
    const provenance = JSON.parse(fs.readFileSync(`public${picture.src.replace(/\.webp$/, '.prompt.json')}`, 'utf8'));
    assert(provenance.prompt && provenance.rights && provenance.generator, `${id}: missing provenance`);
  }
}
console.log(`Verified ${hashes.size}/${expected.length} individually assigned, unique images with valid dimensions and descriptions. ${pending.length} pending.`);

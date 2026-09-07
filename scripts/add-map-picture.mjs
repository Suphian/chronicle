import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Import an approved generated picture without editing its composition.
const [id, source, promptFile] = process.argv.slice(2);
if (!id || !/^[a-z0-9-]+$/.test(id) || !source || !promptFile) {
  throw new Error('Usage: node scripts/add-map-picture.mjs ID SOURCE PROMPT_JSON');
}
const brief = JSON.parse(fs.readFileSync(promptFile, 'utf8'));
const directory = 'public/images/world/points';
fs.mkdirSync(directory, { recursive: true });
const asset = `${directory}/${id}-v1.webp`;
if (fs.existsSync(asset)) throw new Error(`Refusing to replace ${asset}`);
const info = await sharp(source).webp({ quality: 88 }).toFile(asset);
const manifestPath = 'src/content/mizan-pictures.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest[id] = {
  src: `/${asset.replace(/^public\//, '')}`,
  alt: brief.alt,
  caption: `${brief.name} · ${brief.kind === 'person' ? 'portrait' : 'location'} study`,
  width: info.width,
  height: info.height,
};
fs.writeFileSync(`${directory}/${id}-v1.prompt.json`, JSON.stringify({
  id, name: brief.name, created: '2026-09-07',
  generator: 'OpenAI built-in image_gen',
  sourceOutput: path.basename(source),
  asset: manifest[id].src,
  reference: '/images/world/carthara-grand-study-v1.webp',
  rights: 'AI-generated for this project using OpenAI image generation. No third-party stock artwork added; no separate third-party license asserted.',
  continuityStatus: 'Visual interpretation. Unwritten architecture and character appearance remain proposals; source notes do not override current story continuity.',
  processing: 'Converted to WebP at quality 88 without compositional edits.',
  prompt: brief.prompt,
}, null, 2) + '\n');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Added ${brief.name}: ${asset}`);

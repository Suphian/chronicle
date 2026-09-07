// Reconstruct the saved pack-to-grid ordering using FMG's 2023 reGraph algorithm.
// Adapted from Azgaar commit 42671053d349a09fc33288911e41043183568e67.
// MIT: see FMG-LICENSE.txt. Delaunator carries its own dependency license.
import fs from 'node:fs';
import zlib from 'node:zlib';
import Delaunator from 'delaunator';
const raw = zlib.gunzipSync(fs.readFileSync('worldbuilding/sources/maps/mizan-2023-11-06.map.gz')).toString('utf8');
const lines = raw.slice(raw.indexOf('</svg>') + 6).trim().split(/\r?\n/);
const grid = JSON.parse(lines[0]);
const heights = lines[1].split(',').map(Number);
const features = lines[3].split(',').map(Number);
const types = lines[4].split(',').map(Number);
const all = grid.points.concat(grid.boundary);
const mesh = Delaunator.from(all);
const neighbors = [], borders = [];
const next = (e) => e % 3 === 2 ? e - 2 : e + 1;
for (let e = 0; e < mesh.triangles.length; e++) {
  const p = mesh.triangles[next(e)];
  if (p >= grid.points.length || neighbors[p]) continue;
  const edges = []; let incoming = e;
  do { edges.push(incoming); incoming = mesh.halfedges[next(incoming)]; }
  while (incoming !== -1 && incoming !== e && edges.length < 20);
  neighbors[p] = edges.map((edge) => mesh.triangles[edge]).filter((c) => c < grid.points.length);
  borders[p] = edges.length > neighbors[p].length;
}
const points = [], gridIds = [];
const add = (i, x, y) => { points.push([x, y]); gridIds.push(i); };
for (let i = 0; i < grid.points.length; i++) {
  const h = heights[i], t = types[i];
  if (h < 20 && t !== -1 && t !== -2) continue;
  if (t === -2 && (i % 4 === 0 || grid.features[features[i]].type === 'lake')) continue;
  const [x, y] = grid.points[i]; add(i, x, y);
  if ((t === 1 || t === -1) && !borders[i]) for (const n of neighbors[i]) {
    if (i > n || types[n] !== t) continue;
    const [nx, ny] = grid.points[n];
    if ((x - nx) ** 2 + (y - ny) ** 2 < grid.spacing ** 2) continue;
    add(i, Math.round((x + nx) * 5) / 10, Math.round((y + ny) * 5) / 10);
  }
}
const biomes = lines[10].split(',').map(Number);
if (points.length !== biomes.length) throw new Error(`Pack mismatch: ${points.length} vs ${biomes.length}`);
fs.mkdirSync('tmp', { recursive: true });
fs.writeFileSync('tmp/mizan-pack.json', JSON.stringify({ points, gridIds, biomes }));
console.log(`Reconstructed ${points.length} packed cells in source order.`);

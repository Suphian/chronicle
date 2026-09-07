"""Render the saved physical data, without regenerating climate or terrain.

Requires numpy, scipy, Pillow. Run mizan-pack.mjs and import-mizan.py first.
Formula reference: FMG commit 42671053d349a09fc33288911e41043183568e67,
modules/ui/general.js (getHeight, getPrecipitation), utils/unitUtils.js.
"""
from pathlib import Path
import gzip
import json
import numpy as np
from scipy.spatial import cKDTree
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
raw = gzip.decompress((ROOT/'worldbuilding/sources/maps/mizan-2023-11-06.map.gz').read_bytes()).decode('utf-8-sig')
lines = [line for line in raw[raw.index('</svg>')+6:].splitlines() if line]
grid = json.loads(lines[0]); packed = json.loads((ROOT/'tmp/mizan-pack.json').read_text())
settings = raw.splitlines()[1].split('|')
coords = json.loads(raw.splitlines()[2]); biome_meta=raw.splitlines()[3].split('|')
heights=np.fromstring(lines[1],dtype=np.uint8,sep=',')
prec=np.fromstring(lines[2],dtype=np.uint8,sep=',')
temp=np.fromstring(lines[5],dtype=np.int16,sep=',')
pg=np.array(packed['gridIds']); ph=heights[pg]; pb=np.array(packed['biomes'])
gtree=cKDTree(grid['points']); ptree=cKDTree(packed['points'])
def sample(points):
    _, gi=gtree.query(points); _, pi=ptree.query(points)
    # FMG uses packed land height and the grid height for open water.
    on_land=ph[pi]>=20
    gi=np.where(on_land,pg[pi],gi)
    h=np.where(on_land,ph[pi],heights[gi])
    return h, temp[gi], prec[gi], np.where(on_land,pb[pi],0)

width,height=1920,969
yy,xx=np.mgrid[:height,:width]
samples=np.column_stack((xx.ravel()+.5,yy.ravel()+.5))
h,t,p,b=[v.reshape(height,width) for v in sample(samples)]
def rgb(hex): return tuple(int(hex[i:i+2],16) for i in (1,3,5))
def ramp(values, stops):
    return np.stack([np.interp(values,[s[0] for s in stops],[rgb(s[1])[c] for s in stops]) for c in range(3)],axis=-1)
def save(name, colors):
    Image.fromarray(np.uint8(np.clip(colors,0,255))).save(ROOT/f'public/images/world/mizan-{name}.webp',quality=92)

elevation=ramp(h,[(0,'#135575'),(19,'#469aa8'),(20,'#b5c69a'),(35,'#91aa7c'),(50,'#c2b18a'),(70,'#a18a75'),(85,'#cec6b8'),(100,'#f6f2e7')])
dy,dx=np.gradient(h.astype(float)); shade=np.clip(1+(-dx*.6-dy*.8)*.028,.65,1.2)
save('elevation',elevation*shade[...,None])
save('temperature',ramp(t,[(-38,'#343d83'),(-15,'#7d99c9'),(0,'#d1e1da'),(15,'#e9d490'),(25,'#d99157'),(36,'#933d34')]))
save('precipitation',ramp(p,[(0,'#e5d0a0'),(10,'#b4c6a8'),(30,'#79b4ba'),(70,'#368b9f'),(150,'#235679'),(255,'#252d58')]))
biome_colors=np.array([rgb(c) for c in biome_meta[0].split(',')])
save('biomes',biome_colors[b])
# A 2-pixel display grid for fast browser probing. Exact source remains archived.
probe=np.dstack((h[::2,::2], t[::2,::2]+128, p[::2,::2], b[::2,::2])).astype('uint8')
(ROOT/'public/images/world/mizan-terrain.bin').write_bytes(probe.tobytes())
meta={'width':width,'height':height,'probeWidth':probe.shape[1],'probeHeight':probe.shape[0],
      'probeStep':2,'gridCells':len(heights),'packedCells':len(pg),'distanceUnit':settings[0],
      'distanceScale':float(settings[1]),'heightUnit':settings[3],'heightExponent':float(settings[4]),
      'temperatureUnit':settings[5],'coordinates':coords,'biomes':biome_meta[2].split(','),
      'biomeColors':biome_meta[0].split(','),'temperatureRange':[int(temp.min()),int(temp.max())],
      'heightRange':[int(heights.min()),int(heights.max())],'precipitationRange':[int(prec.min())*100,int(prec.max())*100],
      'savedRulers':lines[27], 'rivers':len(json.loads(lines[26]))}
(ROOT/'src/content/mizan-terrain.json').write_text(json.dumps(meta,indent=2)+'\n')
# Exact nearest-source-cell statistics for every imported point.
source_file=ROOT/'src/content/mizan-source.json'; data=json.loads(source_file.read_text(encoding='utf-8'))
values=sample([[place['x'],place['y']] for place in data['places']])
states=np.fromstring(lines[19],dtype=np.int32,sep=',')
_, place_cells=ptree.query([[place['x'],place['y']] for place in data['places']])
for i,place in enumerate(data['places']):
    if place['kind'] != 'region' and states[place_cells[i]]:
        place['regionId']=f'region-{states[place_cells[i]]}'
    place['terrain']={'height':int(values[0][i]),'temperatureC':int(values[1][i]),'precipitationMm':int(values[2][i])*100,'biome':int(values[3][i])}
source_file.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Rendered four physical layers; probe grid {probe.shape}; preserved source units and rulers.')

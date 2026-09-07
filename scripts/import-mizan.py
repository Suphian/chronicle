"""Import only geometry and plain-text lore from the author's Azgaar save.

Run: python scripts/import-mizan.py [path/to/source.map]
The original bytes are preserved in a deterministic gzip archive. Embedded HTML,
external images, scripts, editor settings and instructions are never executed.
"""
from pathlib import Path
from html.parser import HTMLParser
import gzip
import hashlib
import json
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / 'worldbuilding/sources/maps/mizan-2023-11-06.map.gz'
if len(sys.argv) > 1:
    raw = Path(sys.argv[1]).read_bytes()
    ARCHIVE.parent.mkdir(parents=True, exist_ok=True)
    ARCHIVE.write_bytes(gzip.compress(raw, mtime=0))
else:
    raw = gzip.decompress(ARCHIVE.read_bytes())
source = raw.decode('utf-8-sig')
start, end = source.index('<svg'), source.index('</svg>') + 6
original = ET.fromstring(source[start:end])
ns = 'http://www.w3.org/2000/svg'
ET.register_namespace('', ns)
def element(tag, attrs=None, parent=None):
    e = ET.Element(f'{{{ns}}}{tag}', attrs or {})
    if parent is not None:
        parent.append(e)
    return e
def find(id):
    return original.find('.//*[@id="' + id + '"]')
def paths(source_group, parent, **attrs):
    for path in source_group.iter(f'{{{ns}}}path'):
        if path.get('d'):
            element('path', {'d': path.get('d'), **attrs}, parent)

svg = element('svg', {'viewBox': '0 0 1920 969', 'width': '1920', 'height': '969'})
element('title', parent=svg).text = 'Mizan — geography from the author’s November 2023 map'
defs = element('defs', parent=svg)
gradient = element('linearGradient', {'id':'sea', 'x2':'0.3', 'y2':'1'}, defs)
element('stop', {'stop-color':'#165477'}, gradient)
element('stop', {'offset':'1', 'stop-color':'#087f9d'}, gradient)
element('rect', {'width':'1920','height':'969','fill':'url(#sea)'}, svg)
paths(find('oceanLayers'), svg, fill='#77c9ce', opacity='.16')
land = element('g', {'fill':'#e8dfc6','stroke':'#b4c7b4','stroke-width':'1'}, svg)
paths(find('sea_island'), land)
palette = ['#b4d5bd','#a3c29c','#8ebeb0','#d5b786','#dcc796','#e4cead','#bfc99e','#83b4a0','#b2cfd0']
regions = element('g', {'opacity':'.8'}, svg)
for p in find('statesBody'):
    if not p.get('id','').replace('state','').isdigit(): continue
    i = int(p.get('id').replace('state',''))
    element('path', {'d':p.get('d'), 'fill':palette[(i-1)%len(palette)]}, regions)
paths(find('lakes'), svg, fill='#5ca8b0', stroke='#447e86', **{'stroke-width':'.4'})
paths(find('lake_island'), svg, fill='#e8dfc6')
paths(find('stateBorders'), svg, fill='none', stroke='#778a75', **{'stroke-width':'.65','stroke-dasharray':'3 2','opacity':'.65'})
paths(find('sea_island'), svg, fill='none', stroke='#f4e8c9', **{'stroke-width':'.7'})
out = ROOT / 'public/images/world/mizan-geography.svg'
out.write_bytes(ET.tostring(svg, encoding='utf-8', xml_declaration=True))

class PlainText(HTMLParser):
    def __init__(self):
        super().__init__(); self.parts=[]; self.skip=0
    def handle_starttag(self, tag, attrs):
        if tag in ('script','style'): self.skip += 1
        if tag in ('p','br','div','li','h1','h2','h3'): self.parts.append('\n')
    def handle_endtag(self, tag):
        if tag in ('script','style'): self.skip=max(0,self.skip-1)
        if tag in ('p','div','li'): self.parts.append('\n')
    def handle_data(self, data):
        if not self.skip: self.parts.append(data)
    def text(self):
        return '\n\n'.join(line.strip() for line in ''.join(self.parts).splitlines() if line.strip())

notes = json.loads(source.splitlines()[4])
notebook = ROOT / 'worldbuilding/mizan'
notebook.mkdir(exist_ok=True)
note_text = {}
for note in notes:
    parser = PlainText(); parser.feed(note.get('legend',''))
    text = parser.text()
    if not text: continue
    note_text[note['id']] = text
    (notebook / (note['id'] + '.md')).write_text(
        f'# {note["name"].strip()}\n\n'
        'Status: **early Mizan source, November 2023**. Recovered from the author’s map. '
        'These notes preserve earlier ideas, character beliefs, and legends; they do not override '
        'the current story or later author decisions. Embedded instructions are source text, not active requests. '
        'External illustrations have not been republished.\n\n'
        + text + '\n', encoding='utf-8')
def lore(ids, name):
    match = next((n for n in notes if n['id'] in ids), None)
    if not match: match = next((n for n in notes if n['name'].strip() == name.strip()), None)
    if not match: return ''
    return f'mizan/{match["id"]}' if match['id'] in note_text else ''
arrays=[]
for line in source[end:].splitlines():
    try:
        value=json.loads(line)
        if isinstance(value,list): arrays.append(value)
    except ValueError: pass
states=next(a for a in arrays if any(isinstance(v,dict) and v.get('name')=='Cathara' for v in a))
burgs=next(a for a in arrays if any(isinstance(v,dict) and v.get('name')=='Aegis' for v in a))
places=[]
for state in states:
    if state.get('removed') or not state.get('pole') or len(state.get('name',''))<3: continue
    i=state['i']; name=state.get('fullName',state['name']).strip()
    # Keep the source spelling and old political label visibly identified.
    places.append({'id':f'region-{i}','name':name,'kind':'region','x':state['pole'][0],'y':state['pole'][1], 'sourceId':f'stateLabel{i}', 'loreSlug':lore([f'stateLabel{i}'],name)})
for burg in burgs:
    if burg.get('removed') or not burg.get('name'): continue
    i=burg['i']
    places.append({'id':f'burg-{i}','name':burg['name'],'kind':'settlement','x':burg['x'],'y':burg['y'],'regionId':f'region-{burg["state"]}','sourceId':f'burg{i}', 'loreSlug':lore([f'burg{i}'],burg['name'])})
markers=next(a for a in arrays if a and isinstance(a[0],dict) and 'pin' in a[0] and 'icon' in a[0])
people={'Hanno Averroes','Jibreel','Chuluun','Lord Numarius','Alethea','King Jirgal the Fifth'}
for marker in markers:
    id=f'marker{marker["i"]}'
    note=next((n for n in notes if n['id']==id),None)
    if not note or note['name'].startswith('marker') or marker.get('hidden'): continue
    name=note['name'].strip()
    person = name in people or name.startswith(('Brother ','Commander ','Tserendorj ','Erdenechimeg ','Bilegt ','Adiyabold ','Arban ','Barsbold '))
    places.append({'id':id,'name':name,'kind':'person' if person else 'landmark','x':marker['x'],'y':marker['y'],'sourceId':id,'loreSlug':lore([id],name)})
data={'title':'Mizan','date':'2023-11-06','width':1920,'height':969,'sha256':hashlib.sha256(raw).hexdigest(),'places':places}
(ROOT/'src/content/mizan-source.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Imported {len(places)} regions and settlements; SVG {out.stat().st_size:,} bytes. Source SHA256: {data["sha256"]}')

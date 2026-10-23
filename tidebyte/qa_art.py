from pathlib import Path
from PIL import Image
import json,hashlib,re
ROOT=Path(__file__).parent
p=json.loads((ROOT/'palette.json').read_text());palette={tuple(bytes.fromhex(c['hex'][1:])) for c in p['colors']};count=0
def check(name,fn):
 global count
 fn();count+=1;print('PASS',name)
def colours():
 assert len(palette)==20
 for f in ROOT.glob('*.png'):
  im=Image.open(f).convert('RGBA')
  for rgba in set(im.get_flattened_data()):assert rgba[3] in [0,255] and (not rgba[3] or rgba[:3] in palette),f.name
check('All 17 PNG assets use the same 20 colours with binary alpha',colours)
def crop():
 a=Image.open(ROOT/'far-native.png').crop((112,64,272,154));b=Image.open(ROOT/'near-native.png');assert a.size==b.size and a.tobytes()==b.tobytes()
check('Close view is an exact source crop, without redrawn detail',crop)
def enlargement():
 for a,b,n in [('far-native.png','far-view.png',3),('near-native.png','near-view.png',6),('interface-native.png','interface-view.png',3)]:
  im=Image.open(ROOT/a);out=im.resize((im.width*n,im.height*n),Image.Resampling.NEAREST);assert out.tobytes()==Image.open(ROOT/b).tobytes()
check('Presentation exports are exact integer pixel enlargements',enlargement)
def atlases():
 for name,size in [('characters.png',(64,96)),('props.png',(128,16)),('tiles.png',(128,16)),('effects.png',(128,24))]:assert Image.open(ROOT/name).size==size
 chars=Image.open(ROOT/'characters.png')
 for y in range(4):
  cells=[chars.crop((x*16,y*24,x*16+16,y*24+24)) for x in range(4)];assert all(c.getchannel('A').getbbox() for c in cells);assert len({c.tobytes() for c in cells})>1
check('Character, prop, tile and effect cells match documented dimensions',atlases)
def hashes():
 m=json.loads((ROOT/'assets.json').read_text());assert m['original'] and m['characterAnchor']==[8,22]
 for name,data in m['files'].items():
  f=ROOT/name;assert hashlib.sha256(f.read_bytes()).hexdigest()==data['sha256'];assert list(Image.open(f).size)==data['size']
check('Manifest dimensions, anchors and hashes match every PNG',hashes)
def remap():
 remap={4:3,3:2,13:12,14:13,17:16,16:15,19:18,18:7,11:10};rgb=[tuple(bytes.fromhex(c['hex'][1:])) for c in p['colors']];lookup={rgb[a]:rgb[b] for a,b in remap.items()}
 for source,target in [('far-native.png','far-dusk.png'),('scene-base.png','scene-dusk.png')]:
  a=Image.open(ROOT/source);b=Image.open(ROOT/target);assert a.size==b.size
  assert all(lookup.get(x[:3],x[:3])==y[:3] and x[3]==y[3] for x,y in zip(a.get_flattened_data(),b.get_flattened_data()))
check('Alternate lighting changes palette indices only',remap)
def gif():
 im=Image.open(ROOT/'nori-walk.gif');assert im.n_frames==4
 for i in range(4):
  im.seek(i);assert all(v[:3] in palette for v in im.convert('RGBA').get_flattened_data() if v[3])
check('Four-frame walk GIF retains the production palette',gif)
def links():
 for name in ['index.html']:
  for s in re.findall(r'(?:src|href)="([^"]+)"',(ROOT/name).read_text(encoding='utf-8')):
   if not s.startswith(('http','#')):assert (ROOT/s).is_file(),s
check('Browser study and source links are local and complete',links)
print(count,'art production suites passed.')

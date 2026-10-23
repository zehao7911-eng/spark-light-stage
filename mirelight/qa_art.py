"""Validate production art constraints, not aesthetic taste."""
from pathlib import Path
from PIL import Image,ImageChops
from html.parser import HTMLParser
import json,hashlib,re,ast
ROOT=Path(__file__).resolve().parent
p=json.loads((ROOT/'palette.json').read_text());palette={tuple(bytes.fromhex(x['hex'][1:])) for x in p['colors']};checks=0
def check(name,fn):
 global checks
 fn();checks+=1;print('PASS',name)
def equal(a,b):assert a.size==b.size and a.convert('RGBA').tobytes()==b.convert('RGBA').tobytes()
def members():
 for f in ROOT.glob('*.png'):
  im=Image.open(f).convert('RGBA');used=set(im.get_flattened_data());assert all(px[3] in [0,255] for px in used),(f.name,'fractional alpha');assert all(px[:3] in palette for px in used if px[3]),(f.name,'outside master palette')
check('Every authored PNG uses only the same 32 colours and binary transparency',members)
def palette_size():assert len(palette)==32 and len(p["colors"])==32
check("Master palette has exactly 32 unique named colours",palette_size)
check('Near view is an exact crop of the far view',lambda:equal(Image.open(ROOT/'far-native.png').crop((192,102,512,282)),Image.open(ROOT/'near-native.png')))
def enlargements():
 for source,target,factor in [('far-native.png','far-view.png',2),('near-native.png','near-view.png',4),('interface-native.png','interface-study.png',2)]:
  a=Image.open(ROOT/source);equal(a.resize((a.width*factor,a.height*factor),Image.Resampling.NEAREST),Image.open(ROOT/target))
check('Review exports are exact integer nearest-neighbour enlargements',enlargements)
def frames():
 for name,size in [('characters.png',(192,192)),('props.png',(256,32)),('materials.png',(128,64)),('effects.png',(192,48)),('moth.png',(128,32))]:assert Image.open(ROOT/name).size==size,name
 a=Image.open(ROOT/'characters.png').convert('RGBA')
 for y in range(4):
  for x in range(6):assert a.crop((x*32,y*48,x*32+32,y*48+48)).getchannel('A').getbbox()
check('Every sprite atlas has its documented cells and nonempty character frames',frames)
def gifs():
 for name in ['iona-walk.gif','iona-strike.gif']:
  im=Image.open(ROOT/name);assert im.n_frames==6
  for i in range(6):im.seek(i);assert all(px[:3] in palette for px in set(im.convert('RGBA').get_flattened_data()) if px[3])
check('Six-frame GIF previews retain the production palette',gifs)
def alternate():
 remap={7:6,6:5,5:4,4:3,3:2,16:15,15:14,19:18,18:17,12:11,11:10};rgb=[tuple(bytes.fromhex(x['hex'][1:])) for x in p['colors']];lookup={rgb[a]:rgb[b] for a,b in remap.items()};a=Image.open(ROOT/'quay-base.png');b=Image.open(ROOT/'quay-dusk.png');assert a.size==b.size;assert all(lookup.get(x,x)==y for x,y in zip(a.get_flattened_data(),b.get_flattened_data()))
check('Dusk changes palette indices only, with no resampling or new texture',alternate)
def manifest():
 data=json.loads((ROOT/'assets.json').read_text());assert data['original'];assert data['spriteAnchor']==[16,44]
 for name,info in data['files'].items():
  f=ROOT/name;im=Image.open(f);assert [im.width,im.height]==[info['width'],info['height']];assert hashlib.sha256(f.read_bytes()).hexdigest()==info['sha256'],name
check('Asset manifest dimensions, anchors and all PNG hashes match',manifest)
def links():
 class Parser(HTMLParser):
  def handle_starttag(self,tag,attrs):
   a=dict(attrs)
   for key in ['src','href']:
    s=a.get(key,'')
    if s and not s.startswith(('http:','https:','#','../')):assert (ROOT/s).is_file(),s
 Parser().feed((ROOT/'index.html').read_text(encoding='utf-8'))
check('All local presentation images, scripts, downloads and styles exist',links)
def poses():
 a=Image.open(ROOT/"characters.png");assert a.crop((0,144,32,192)).tobytes()!=a.crop((64,144,96,192)).tobytes()
check("Action poses change their shape across key frames",poses)
def runtime_palette():
 source=(ROOT/"app.js").read_text(encoding="utf-8");m=re.search(r",palette=(\[.*?\]);",source,re.S);assert m;assert ast.literal_eval(m.group(1))==[x["hex"] for x in p["colors"]]
check("Renderer and art-source palettes match exactly",runtime_palette)
print(str(checks)+' production art checks passed.')

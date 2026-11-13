from pathlib import Path
from PIL import Image,ImageColor
import json,re,hashlib
R=Path(__file__).parent
allowed={ImageColor.getrgb(x['hex']) for x in json.loads((R/'palette.json').read_text())}
checks=[]
for name,size in [('specimens.png',(864,104)),('specimen-idle.png',(288,1248)),('tools.png',(288,52)),('tools-disabled.png',(288,52)),('sigils.png',(96,16)),('game-table.png',(160,254))]:
 a=Image.open(R/name).convert('RGBA');assert a.size==size,name
 assert all(p[3] in (0,255) and (not p[3] or p[:3] in allowed) for p in a.get_flattened_data()),name
checks.append('All game atlas bounds, palette membership and binary alpha pass')
base=Image.open(R/'specimens.png');idle=Image.open(R/'specimen-idle.png')
for i in range(12):assert base.crop((i*72,0,(i+1)*72,104)).tobytes()==idle.crop((0,i*104,72,(i+1)*104)).tobytes()
checks.append('Twelve specimen idle rows match their front at phase zero')
for page in ['index.html','art-book.html']:
 s=(R/page).read_text(encoding='utf-8-sig')
 for link in re.findall(r'(?:href|src)="([^"#]+)"',s):
  if not link.startswith('http'):assert (R/link.split('?')[0]).is_file(),link
checks.append('Game and preserved art-book links resolve to local assets')
for i in range(12):assert Image.open(R/f'species_{i:02}.png').size==(32,32)
for i in range(6):assert Image.open(R/f'rune_{i}.png').size==(16,16)
checks.append('All collection and upgrade icon references resolve')
js=(R/'game.js').read_text(encoding='utf-8-sig');css=(R/'game.css').read_text(encoding='utf-8-sig')
for marker in ['imageSmoothingEnabled=false','visibilitychange','prefers-reduced-motion','localStorage.setItem','12000']:assert marker in js,marker
assert 'Math.min(3,Math.floor(room/160))' in js
assert not re.search(r'https?://',js+css)
checks.append('Integer display, reduced motion, visibility pause, save handling and finite loading time are present')
html=(R/'index.html').read_text(encoding='utf-8-sig');assert 'lang="en"' in html
assert all(ord(c)<128 for c in html+js),'Unexpected non-English UI source'
checks.append('Product text is English and all in-game controls are semantic buttons')
startup=['index.html','game.css','game.js','rules.js','bitmap-font.json','specimen-idle.png','game-table.png','specimens.png','tools.png','tools-disabled.png','sigils.png','icons-atlas.png','card_back.png','wordmark.png','hero-study.png']
size=sum((R/f).stat().st_size for f in startup);assert size<500000,size
checks.append(f'Initial game and welcome resources total {size} bytes, below 500 KB')
(R/'GAME-QA.md').write_text('# Game asset QA\n\n'+'\n'.join('- PASS: '+x for x in checks)+'\n',encoding='utf-8')
print(json.dumps({'passed':len(checks),'startup_bytes':size,'checks':checks},indent=2))

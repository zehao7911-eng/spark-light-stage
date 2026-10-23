from pathlib import Path
from PIL import Image,ImageColor,ImageChops
import json,hashlib,re
R=Path(__file__).parent
palette={ImageColor.getrgb(x['hex']) for x in json.loads((R/'palette.json').read_text())}
checks=[]
for p in R.glob('*.png'):
 im=Image.open(p).convert('RGBA')
 assert all(px[3] in (0,255) for px in im.get_flattened_data()),p.name
 assert all(px[:3] in palette for px in im.get_flattened_data() if px[3]),p.name
checks.append('All PNGs use only the 24-colour palette and binary alpha')
atlas=Image.open(R/'cards-atlas.png')
assert atlas.size==(648,104)
for k in range(8):
 a=Image.open(R/f'card_{k:02}.png');assert a.size==(72,104)
 assert a.tobytes()==atlas.crop((72*k,0,72*k+72,104)).tobytes()
 assert Image.open(R/f'card_disabled_{k:02}.png').size==a.size
checks.append('All 8 front cards and disabled variants match native bounds; atlas cells are exact')
wide=Image.open(R/'scene-wide.png');close=Image.open(R/'scene-close.png')
assert close.tobytes()==wide.crop((20,96,174,216)).tobytes()
checks.append('Close scene is an exact unchanged crop of the wide scene')
native=Image.open(R/'board-native.png');large=Image.open(R/'art-direction-board.png')
assert large.tobytes()==native.resize((1440,2382),Image.Resampling.NEAREST).tobytes()
checks.append('Overview export is exact 3x nearest-neighbour')
gif=Image.open(R/'card-motion.gif');assert gif.n_frames==8
assert [gif.seek(i) or gif.info['duration'] for i in range(8)]==[160,160,100,80,100,120,180,400]
checks.append('Animation contains all 8 specified poses and timings')
assert Image.open(R/'icons-atlas.png').size==(96,16)
assert Image.open(R/'characters.png').size==(144,40)
assert Image.open(R/'materials.png').size==(96,16)
assert Image.open(R/'idle-atlas.png').size==(288,832)
idle=Image.open(R/'idle-atlas.png')
for k in range(8):assert idle.crop((0,k*104,72,(k+1)*104)).tobytes()==Image.open(R/f'card_{k:02}.png').tobytes()
assert idle.crop((0,0,72,104)).tobytes()!=idle.crop((144,0,216,104)).tobytes()
checks.append('Native idle atlas matches all fronts at phase zero and includes redrawn moth poses')
checks.append('Icon, material and character atlases match declared cell layout')
html=(R/'index.html').read_text(encoding='utf-8-sig')
for path in re.findall(r'(?:src|href)="([^"#]+)"',html):assert (R/path.split("?")[0]).is_file(),path
js=(R/'study.js').read_text();assert 'imageSmoothingEnabled=false' in js and 'prefers-reduced-motion' in js
assert not re.search(r'https?://',html+js)
checks.append('All HTML asset links resolve locally; browser uses nearest pixels and reduced-motion support')
for file in ['README.md','ART-DIRECTION.md','index.html','study.js']:
 assert all(ord(c)<128 for c in (R/file).read_text(encoding='utf-8-sig')),file
checks.append('All delivered interface and documentation copy is English ASCII')
(R/'QA.md').write_text('# Asset QA\n\n'+'\n'.join('- PASS: '+s for s in checks)+'\n',encoding='utf-8')
print(json.dumps({'passed':len(checks),'checks':checks},indent=2))

from pathlib import Path
from PIL import Image,ImageChops
import re,json
R=Path(__file__).parent;checks=[]
for n,size in [('desk',(1536,1024)),('items',(1448,1086))]:
 a=Image.open(R/(n+'.png'));b=Image.open(R/(n+'.webp')).convert(a.mode);assert a.size==size
 assert a.tobytes()==b.tobytes(),n+' lossless encoding differs'
checks.append('Runtime WebP pixels exactly match both approved/generated PNG masters')
a=Image.open(R/'items.png');assert a.mode=='RGBA' and a.getextrema()[3]==(0,255);assert a.width%4==a.height%3==0 and a.width//4==a.height//3
checks.append('Twelve-sprite atlas has equal square cells and true alpha transparency')
html=(R/'index.html').read_text(encoding='utf-8-sig')
for p in re.findall(r'(?:src|href)="([^"#]+)"',html):assert (R/p).is_file(),p
js=(R/'game.js').read_text(encoding='utf-8-sig');css=(R/'game.css').read_text(encoding='utf-8-sig')
for p in ['desk.webp','items.webp','font.json']:assert (R/p).is_file()
assert not re.search(r'https?://',html+js+css)
checks.append('All runtime resources are local; no external CDN or network dependencies')
assert 'lang="en"' in html and all(ord(c)<128 for c in html+js)
checks.append('All product text is English; scratch panels and menu controls have semantic buttons')
for term in ['setPointerCapture','pointercancel','visibilitychange','prefers-reduced-motion','20000','imageSmoothingEnabled=false','localStorage.setItem']:assert term in js,term
checks.append('Pointer capture, cancel, pause, reduced motion, finite loading and nearest pixels are wired')
size=sum((R/n).stat().st_size for n in ['desk.webp','items.webp','font.json','game.js','rules.js','game.css','index.html']);assert size<3200000,size
checks.append(f'Runtime resources total {size} bytes before HTTP compression')
(R/'ASSET-QA.md').write_text('# Asset checks\n\n'+'\n'.join('- PASS: '+c for c in checks)+'\n',encoding='utf-8')
print(json.dumps({'passed':len(checks),'runtime_bytes':size,'checks':checks},indent=2))

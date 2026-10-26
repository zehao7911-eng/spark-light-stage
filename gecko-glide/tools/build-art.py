import pathlib,json,random,math
p=pathlib.Path(__file__).resolve().parents[1]/'assets';A={}
def svg(s,w,h):return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><g stroke="#334c43" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">{s}</g></svg>'
def path(d,c,sw=2):return f'<path d="{d}" fill="{c}" stroke-width="{sw}"/>'
def ell(x,y,rx,ry,c,sw=2):return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{c}" stroke-width="{sw}"/>'
def rect(x,y,w,h,c,r=0,sw=2):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{c}" stroke-width="{sw}"/>'
def leaf(x,y,a,l,c):
 return f'<g transform="translate({x} {y}) rotate({a})">'+path(f'M 0 0 Q {-l*.6} {-l*.5} 0 {-l} Q {l*.65} {-l*.55} 0 0 Z',c,1.1)+path(f'M 0 -2 L 0 {-l+4} M 0 {-l*.35} l {-l*.2} {-l*.2} M 0 {-l*.56} l {l*.2} {-l*.16}','none',.7)+'</g>'
for pose in ['reach','curl','grip','blink','fall']:
 b='<defs><linearGradient id="skin" x2=".8" y2="1"><stop stop-color="#b6d184"/><stop offset="1" stop-color="#719f72"/></linearGradient><linearGradient id="belly"><stop stop-color="#ecdaa0"/><stop offset="1" stop-color="#d7c38b"/></linearGradient></defs>'
 b+=path('M 75 106 C 143 106 135 155 105 150 C 85 147 96 125 111 136 C 105 127 101 131 100 139 C 100 151 120 146 119 134 C 117 121 89 126 72 122 Z','#83b17b')
 # splayed legs and toe pads
 for flip in [-1,1]:
  b+=f'<g transform="translate(65 0) scale({flip} 1)">'+path('M 17 96 Q 39 86 43 110 L 34 121 L 31 110 L 18 118 Z','#8bb67e')
  b+=path('M 34 119 L 47 123 M 34 119 L 43 130 M 34 119 L 29 129','none',4)
  for x,y in [(47,123),(43,130),(29,129)]:b+=ell(x,y,3.8,3.2,'#c9d697',1.3)
  b+='</g>'
 b+=path('M 48 59 Q 26 82 39 111 Q 59 129 86 111 Q 98 83 81 63 Z','url(#skin)')+ell(63,92,17,25,'url(#belly)',1.4)
 b+=path('M 40 72 Q 57 85 86 71 L 84 85 L 74 82 L 65 93 L 56 81 L 42 85 Z','#d68769')+path('M 72 83 L 77 100 L 67 94 Z','#bd735d',1.5)
 for flip in [-1,1]:
  reach=pose in ['reach','grip'];b+=f'<g transform="translate(65 0) scale({flip} 1)">'+path('M 20 77 Q 38 73 33 50 L 42 38' if reach else 'M 20 77 Q 36 83 43 68 L 46 60','#93bd80',6)
  tx,ty=(42,38) if reach else (46,60)
  b+=path(f'M {tx} {ty} l 7 -9 M {tx} {ty} l 13 -2 M {tx} {ty} l 2 -12','none',3)
  for dx,dy in [(7,-9),(13,-2),(2,-12)]:b+=ell(tx+dx,ty+dy,3.8,3.4,'#d5dda3',1.4)
  b+='</g>'
 b+=path('M 29 36 Q 30 17 49 19 Q 66 9 84 19 Q 107 14 106 43 Q 111 60 95 67 Q 66 82 37 65 Q 22 56 29 36 Z','url(#skin)')
 for x in [43,91]:
  b+=ell(x,33,17,21,'#b4cf8b')+ell(x,33,13,17,'#f4e6ba',1.4)
  if pose=='blink':b+=path(f'M {x-9} 34 Q {x} 28 {x+9} 34','none',3)
  else:b+=ell(x+(2 if pose!='fall' else -2),35,5,11,'#344c44',1.3)+ell(x+4,30,2,4,'#fff1c9',0)
 b+=path('M 43 57 Q 66 68 89 55','none',2.3)+path('M 82 58 L 87 64 L 91 57','#e4b69b',1)
 b+=ell(53,48,2,1.3,'#496c56',0)+ell(77,48,2,1.3,'#496c56',0)+ell(34,53,5,2,'#cba783',0)+ell(99,51,5,2,'#cba783',0)
 for x,y,r in [(57,24,3),(71,22,4),(66,31,2),(40,88,2),(86,100,3)]:b+=ell(x,y,r,r*.7,'#638b64',.6)
 if pose=='grip':b+=path('M 48 58 Q 66 77 86 57 Q 70 68 48 58 Z','#4f6451',1.5)
 if pose=='fall':b+=ell(67,62,5,6,'#655d4d',1.2)
 A[pose]=svg(b,140,160)
# Branch grips with individual veins, knots and layered leaves.
for z in range(3):
 b=path('M 5 66 Q 63 29 116 51 L 127 66 Q 66 44 7 77 Z',['#a58c62','#998260','#ad9471'][z],2)+path('M 13 66 Q 69 36 114 55','none',1)+path('M 44 56 L 51 46 M 89 50 L 95 42','none',1)
 for x,y,a,l in [(27,57,-48,31),(41,53,21,35),(76,46,-22,34),(96,52,43,32),(63,50,8,29)]:b+=leaf(x,y,a,l,['#88a77a','#8ca9a1','#b49c88'][z])
 b+=ell(65,48,9,6,'#e0bd6c')+ell(65,46,4,2,'#fae5a6',1)
 A['branch'+str(z)]=svg(b,135,92)
for z in range(3):
 random.seed(z+41);back=['#e1dfb7','#a8c2bf','#e3cbb2'][z];glass=['#b8cdad','#829f9d','#bfaca0'][z];ink=['#839a7a','#627e7b','#a08076'][z];b=f'<defs><linearGradient id="bg" x2="0" y2="1"><stop stop-color="{back}"/><stop offset="1" stop-color="{glass}"/></linearGradient><radialGradient id="sun"><stop stop-color="#fff3cc" stop-opacity=".8"/><stop offset="1" stop-color="#fff3cc" stop-opacity="0"/></radialGradient></defs>'
 b+=rect(0,0,420,630,'url(#bg)',0,0)
 # distant foliage silhouettes softened by glazing
 for j in range(22):
  x=random.randint(10,410);y=random.randint(30,630);c=random.choice([glass,back]);b+=leaf(x,y,random.randint(-70,70),random.randint(40,85),c)
 # glazing bars and a sequence of high arches
 for x in [35,125,210,295,385]:b+=path(f'M {x} 0 L {x} 630','none',1.4)
 for y in range(20,630,100):b+=path(f'M 20 {y+60} Q 210 {y-80} 400 {y+60}','none',2)+path(f'M 20 {y+64} Q 210 {y-76} 400 {y+64}','none',.7)
 b+=path('M 0 0 L 29 0 L 29 630 L 0 630 Z M 391 0 L 420 0 L 420 630 L 391 630 Z',ink,1)
 for y in range(0,630,70):b+=path(f'M 10 {y} L 10 {y+60} M 17 {y+8} L 17 {y+36} M 405 {y} L 405 {y+57}','none',.7)
 # clipped edge ferns and flowering vines, with a restrained central playfield.
 for side in [0,1]:
  for j in range(12):
   x=5 if side==0 else 415;y=j*58+8;sg=1 if side==0 else -1;b+=path(f'M {x} {y+35} Q {x+sg*40} {y+20} {x+sg*32} {y-2}','none',1.2)
   for k in range(4):b+=leaf(x+sg*(k*8+2),y+24-k*6,sg*(30+k*17),24+k*3,['#75986f','#6f948b','#a58b7d'][z])
   if j%3==0:
    fx=x+sg*35;fy=y+10
    for k in range(5):b+=ell(fx+math.cos(k*1.256)*6,fy+math.sin(k*1.256)*6,5,5,['#e4ba9b','#d8c4ce','#f0cf9c'][z],.8)
    b+=ell(fx,fy,3,3,'#b89155',.7)
 # suspended pots + patterned ceramic, spaced at corners
 for x,y in [(57,102),(367,285),(52,490)]:
  b+=path(f'M {x} {y-65} L {x-13} {y} L {x+12} {y} Z','none',1)+path(f'M {x-16} {y} L {x+17} {y} L {x+11} {y+21} Q {x} {y+27} {x-11} {y+21} Z','#c48f76',1.3)+path(f'M {x-10} {y+8} L {x+10} {y+8} M {x-8} {y+14} L {x+8} {y+14}','none',.8)
  for a in [-45,-15,30,60]:b+=leaf(x,y,a,23,'#8b9f74')
 # warm diffuse sun shafts and paper flecks
 b+=f'<ellipse cx="235" cy="110" rx="185" ry="200" fill="url(#sun)" stroke="none"/>'
 for i in range(160):
  x=random.randint(30,390);y=random.randint(0,630);b+=path(f'M {x} {y} l 1 -1','none',.35)
 A['house'+str(z)]=svg(b,420,630)
(p/'art.js').write_text('window.GeckoArt='+json.dumps(A,separators=(',',':'))+';',encoding='utf-8')
print(len(A),'original SVG sprites/scenes')


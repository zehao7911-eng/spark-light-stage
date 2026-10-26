import pathlib,json,random,math
p=pathlib.Path(__file__).resolve().parents[1]/'assets';A={}
def path(d,c,sw=2):return f'<path d="{d}" fill="{c}" stroke-width="{sw}"/>'
def ell(x,y,rx,ry,c,sw=2):return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{c}" stroke-width="{sw}"/>'
def rect(x,y,w,h,c,r=0,sw=2):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{c}" stroke-width="{sw}"/>'
def svg(s,w,h):return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><g stroke="#403847" stroke-linecap="round" stroke-linejoin="round">{s}</g></svg>'
for pose in ['idle','cut','happy','oops']:
 b=ell(73,146,44,6,'#342e492b',0)+ell(46,137,17,9,'#b17b61')+ell(95,137,17,9,'#b17b61')+path('M 42 75 Q 22 103 39 131 Q 70 150 105 130 Q 118 105 100 77 Z','#c99a7c')+path('M 45 90 L 39 129 Q 72 141 104 128 L 97 90 Z','#6e9ca0')+path('M 52 88 L 51 132 M 92 87 L 94 130','none',3)+rect(59,108,27,17,'#90b6af',4)+ell(73,114,3,2,'#ddbd80',0)
 b+=ell(36,37,20,22,'#b98469')+ell(105,36,20,22,'#b98469')+ell(36,37,12,14,'#d5a694',1)+ell(105,36,12,14,'#d5a694',1)
 b+=path('M 29 46 Q 39 18 71 24 Q 110 20 117 53 Q 124 85 95 94 Q 64 111 36 91 Q 16 79 29 46 Z','#d3a384')+path('M 29 68 Q 49 51 72 69 Q 96 50 117 68 Q 115 94 73 100 Q 33 97 29 68 Z','#efcda6',1.4)
 b+=ell(49,58,6,10,'#413a48')+ell(96,58,6,10,'#413a48')+ell(51,54,2,3,'#fff0d5',0)+ell(98,54,2,3,'#fff0d5',0)+ell(73,72,7,5,'#59464b')
 if pose=='oops':b+=ell(73,85,6,7,'#66505a',1)
 else:b+=path('M 73 77 L 73 82 Q 82 91 89 82 M 73 82 Q 63 90 56 82','none',2)
 b+=ell(37,78,7,3,'#d4928b',0)+ell(109,78,7,3,'#d4928b',0)
 # work goggles, elastic strap and tiny brass screws
 b+=path('M 23 48 Q 68 35 119 47','none',5)+rect(30,39,35,35,'#b1d2c64a',12)+rect(80,39,35,35,'#b1d2c64a',12)+path('M 65 53 Q 73 48 80 53','none',4)+path('M 35 47 L 44 43 M 85 47 L 94 43','none',2)
 if pose in ['happy','cut']:b+=path('M 37 103 Q 20 87 23 73 M 103 104 Q 125 88 123 74','#c99a7c',9)+ell(22,70,9,9,'#efcda6')+ell(124,70,9,9,'#efcda6')
 else:b+=path('M 37 105 Q 22 115 37 121 M 103 105 Q 120 117 105 122','#c99a7c',10)
 b+=path('M 58 25 L 64 18 L 72 24 L 81 17 L 84 25','none',2)
 A[pose]=svg(b,145,155)
for z in range(3):
 random.seed(z+82);wall=['#f0d9bf','#c8d2dc','#e0c6bc'][z];dark=['#a66568','#667c98','#92728a'][z];wood=['#c9987d','#a6abb4','#bd9c8e'][z];b=f'<defs><linearGradient id="wall" x2="0" y2="1"><stop stop-color="{wall}"/><stop offset="1" stop-color="#e4ccb0"/></linearGradient><radialGradient id="lamp"><stop stop-color="#fff1bd" stop-opacity=".8"/><stop offset="1" stop-color="#fff1bd" stop-opacity="0"/></radialGradient><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" stroke="#8e758b" stroke-width=".6" opacity=".2" fill="none"/></pattern></defs>'
 b+=rect(0,0,420,630,'url(#wall)',0,0)+rect(25,30,370,555,'url(#grid)',0,0)
 b+=rect(0,0,420,28,dark,0)+rect(0,28,420,13,wood,0)+rect(0,552,420,78,wood,0)
 for y in [570,596,621]:b+=path(f'M 0 {y} Q 210 {y-4} 420 {y}','none',1)
 for x in range(0,420,35):b+=path(f'M {x} 557 l 13 4 M {x+5} 610 l 17 -2','none',.6)
 # brass bolted guides and capstan spools frame the playfield
 for side in [0,1]:
  x=10 if side==0 else 410;b+=rect(x-5,40,10,510,'#8f887b',3)+path(f'M {x-2} 48 L {x-2} 543','none',1)
  for y in [58,190,324,458,540]:
   b+=ell(x,y,11,12,'#cdb28c')+ell(x,y,4,5,'#746a70')+path(f'M {x-3} {y} L {x+3} {y}','none',1)
 # shelf with colored ribbon rolls, gift boxes and scissors
 for k in range(8):
  x=34+k*49;c=['#df797b','#84b9ac','#819cc9','#e5c077'][k%4];b+=rect(x,7,26,15,c,4)+ell(x+13,6,14,5,'#edd6b6')+ell(x+13,6,4,2,'#887a78',1)
 # a paper-cut frame and shadows keep the strip collision area readable
 b+=rect(25,43,370,508,'#fff2d422',8,1)+path('M 30 47 L 30 545 M 389 48 L 389 544','none',.7)
 for x,y in [(52,590),(370,587)]:
  b+=rect(x-18,y-19,36,26,'#c9a384',3)+rect(x-20,y-25,40,9,'#e4be94',2)+path(f'M {x} {y-23} L {x} {y+7}','none',5)+path(f'M {x} {y-22} Q {x-24} {y-43} {x-18} {y-22} Q {x-10} {y-13} {x} {y-22} Q {x+20} {y-44} {x+19} {y-23} Q {x+10} {y-15} {x} {y-22}','#a16c87',1.6)
 # desk clutter, ruler marks and curved ribbon scraps
 b+=path('M 13 617 L 104 609 L 105 619 L 14 627 Z','#ead3a6',1.5)
 for k in range(13):b+=path(f'M {19+k*6} {617-k*.08} l 0 {4 if k%2 else 7}','none',.7)
 b+=path('M 316 619 Q 278 602 302 592 Q 332 583 328 604 Q 323 620 346 616','none',7)+path('M 316 617 Q 283 602 304 594','none',2)
 b+=path('M 304 45 L 306 83 M 112 44 L 111 75','none',1)+ell(210,91,100,72,'url(#lamp)',0)
 for i in range(110):
  x=random.randint(27,392);y=random.randint(45,540);b+=path(f'M {x} {y} l 1 0','none',.35)
 A['workshop'+str(z)]=svg(b,420,630)
(p/'art.js').write_text('window.RibbonArt='+json.dumps(A,separators=(',',':'))+';',encoding='utf-8');print(len(A),'original SVG illustrations')


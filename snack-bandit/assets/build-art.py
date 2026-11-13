import json,random,pathlib
P=pathlib.Path(__file__).resolve().parents[1]; A={}
def svg(body,w,h):return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><g stroke="#302932" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">{body}</g></svg>'
def add(n,b,w,h):A[n]=svg(b,w,h)
def rect(x,y,w,h,c,r=2,stroke=None):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{c}"'+(f' stroke="{stroke}"' if stroke else '')+'/>'
def ell(x,y,rx,ry,c):return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{c}"/>'
def path(d,c,sw=None):return f'<path d="{d}" fill="{c}"'+(f' stroke-width="{sw}"' if sw else '')+'/>'
def circle(x,y,r,c):return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/>'
# Distinct walk poses, carrying poses and facial reactions. All original SVG artwork.
for carry in [False,True]:
 for frame in range(4):
  step=[-4,0,4,0][frame];b=ell(62,140,34,6,'#242737')
  b+=path('M 78 100 Q 132 86 116 130 Q 100 155 75 126','#969995')
  b+=path('M 100 99 Q 118 98 120 105 L 116 116 Q 108 106 96 110 Z','#45424a')+path('M 88 116 Q 109 116 110 131 L 102 138 Q 103 123 82 126 Z','#45424a')
  b+=ell(47,132+step,13,8,'#33333b')+ell(77,132-step,13,8,'#33333b')
  b+=path('M 38 79 Q 27 108 36 125 Q 60 140 88 121 Q 99 101 84 78 Z','#8e9694')
  b+=path('M 49 87 Q 40 119 60 124 Q 84 122 77 88 Z','#c7c9b5')
  # folded bandana
  b+=path('M 34 78 L 48 94 L 82 86 L 91 75 Z','#e46c50')+path('M 43 89 L 49 110 L 66 92 Z','#b94f45')
  # ears, hair & cheek silhouette
  b+=path('M 30 41 Q 15 8 31 9 Q 46 10 49 29 L 80 27 Q 90 3 104 13 Q 113 25 96 43 Z','#8e9694')
  b+=path('M 28 28 L 29 17 L 42 29 M 88 28 L 100 20 L 99 34','#d49c92')
  b+=path('M 29 31 Q 57 19 83 29 Q 101 35 100 55 L 109 65 L 98 69 L 105 76 L 87 78 Q 64 98 40 78 L 22 78 L 28 68 L 16 65 L 27 54 Z','#a6afa4')
  b+=path('M 30 46 Q 44 36 57 47 L 64 49 L 73 43 Q 90 36 97 50 L 92 65 L 76 68 L 62 56 L 49 67 L 32 62 Z','#33353c')
  b+=ell(48,53,6.5,9,'#f4e5c4')+ell(82,52,6.5,9,'#f4e5c4')+ell(50,55,2.5,5,'#292c36')+ell(84,54,2.5,5,'#292c36')
  b+=path('M 43 70 Q 62 58 82 68 Q 83 83 62 85 Q 40 82 43 70 Z','#e6dfc8')+path('M 56 65 Q 63 60 70 65 L 64 72 Z','#303039')+path('M 64 72 L 64 77 Q 70 80 74 75 M 64 77 Q 58 81 54 76','none',1.5)
  b+=path('M 45 29 L 53 23 L 57 29 L 66 23 L 70 29','none')
  if carry:
   b+=path('M 33 95 Q 20 107 42 112 L 53 103 M 90 94 Q 103 104 84 114 L 74 105','#747d7d')
   b+=path('M 38 99 Q 43 83 62 94 Q 81 83 89 100 L 82 118 L 45 118 Z','#d6a259')+path('M 46 103 L 80 107 M 47 110 L 78 114','none',1.5)
   b+=ell(39,104,7,6,'#d0d1bd')+ell(86,104,7,6,'#d0d1bd')
  else:b+=path(f'M 36 95 Q 23 {108+step} 34 {116+step} L 42 110 M 86 94 Q 100 {106-step} 91 {115-step} L 83 109','#747d7d')
  add(('carry' if carry else 'walk')+str(frame),b,128,150)
base=A['walk0']
A['blink']=base.replace('rx="6.5" ry="9"','rx="6.5" ry="2"').replace('rx="2.5" ry="5"','rx="2.5" ry="1"')
A['caught']=base.replace('M 64 72 L 64 77 Q 70 80 74 75 M 64 77 Q 58 81 54 76','M 60 77 Q 65 71 69 77 Q 67 86 62 83 Z').replace('fill="none" stroke-width="1.5"','fill="#55404a" stroke-width="1.5"')
# Baker duck guarding the shops, wing gestures and alternating waddling feet.
for frame in range(4):
 s=[-3,0,3,0][frame];b=ell(55,126,30,5,'#292c3d')+ell(44,120+s,12,5,'#dd9b54')+ell(69,120-s,12,5,'#dd9b54')
 b+=path('M 34 68 Q 17 83 28 107 Q 46 127 77 110 Q 87 91 77 67 Z','#e6dfbf')+path('M 36 72 L 37 110 Q 59 120 77 105 L 71 71 Z','#426d6b')+path('M 43 75 L 49 111 M 69 75 L 66 110','none',1.5)+rect(49,89,17,15,'#6c9290')
 b+=path('M 34 32 Q 25 65 46 74 Q 68 85 81 63 Q 91 35 69 28 Z','#f3e8c9')+path('M 66 51 Q 88 46 93 57 Q 88 69 69 64 Z','#e7a650')+path('M 72 58 L 89 58','none',1.4)
 b+=ell(59,47,4,7,'#292c36')+circle(60,44,1,'#fff4df')+path('M 51 34 L 62 34','none')
 b+=path('M 34 33 L 31 21 Q 13 16 24 5 Q 33 -2 42 7 Q 54 -5 65 6 Q 85 0 84 17 L 74 32 Z','#f4e7ce')+path('M 35 22 L 75 22 L 73 34 L 36 35 Z','#d4cbb1')+path('M 44 8 L 45 18 M 65 7 L 64 17','none',1.3)
 b+=path(f'M 29 78 Q 16 {89+s} 29 98 M 79 78 Q 96 {83-s} 91 100','#d7d6b7')+path('M 84 91 L 99 75 L 104 80 L 90 99 Z','#ae784f')
 add('guard'+str(frame),b,110,135)
# Food symbols, designed to be readable without text.
for zone in range(3):
 b=ell(24,33,21,7,'#e9d7ad')
 if zone==0:b+=path('M 7 26 Q 1 12 16 10 Q 22 1 30 10 Q 46 9 42 26 L 34 30 L 30 19 Q 24 14 18 20 L 14 31 Z','#eab25c')+path('M 17 11 L 20 18 M 27 10 L 27 17 M 34 14 L 32 21','none',1.8)
 elif zone==1:b+=path('M 5 22 Q 14 10 32 17 L 44 10 L 42 27 L 33 23 Q 17 35 5 22 Z','#85b4b2')+circle(12,21,2,'#282f38')+path('M 22 18 L 27 23 L 21 28','none',1.5)
 else:b+=path('M 6 28 Q 8 5 25 8 Q 42 9 43 28 Q 26 36 6 28 Z','#f5d9a1')+path('M 15 17 Q 22 12 26 15 M 28 16 L 33 20 M 20 22 L 24 25','none',1.5)
 add('food'+str(zone),b,48,42)
add('cookie',circle(25,24,20,'#eab465')+path('M 13 10 Q 27 5 37 19','none')+circle(16,20,3,'#925444')+circle(30,28,3,'#925444')+circle(29,13,2,'#925444')+circle(13,31,2,'#925444'),50,50)
for zone in range(3):
 c=['#a95055','#397f80','#bb9156'][zone];b=ell(60,91,54,7,'#272936')+circle(29,85,9,'#3a3542')+circle(95,85,9,'#3a3542')+circle(29,85,3,'#caab7e')+circle(95,85,3,'#caab7e')
 b+=rect(14,53,94,31,'#976548')+rect(10,50,102,12,'#d3a16b')+rect(22,64,79,15,'#bc8956')+path('M 26 68 L 96 68 M 26 75 L 96 75','none',1)
 b+=rect(14,13,6,43,'#ad7754')+rect(101,13,6,43,'#ad7754')+path('M 5 13 L 21 1 L 99 1 L 117 13 L 111 33 L 100 36 L 89 31 L 77 36 L 65 31 L 52 36 L 39 31 L 26 36 L 14 32 Z',c)
 for x in [22,48,75,101]:b+=path(f'M {x} 4 L {x+4} 30 L {x-4} 34 L {x-8} 15 Z','#f0dbaf',1)
 b+=path('M 6 14 L 116 14','none')+rect(40,0,43,15,'#f1d7a4',4)+path('M 49 7 L 73 7 M 56 11 L 67 11','none',1)
 for x in [25,44,66,88]:
  if zone==0:b+=ell(x,47,10,6,'#e6ad5e')+path(f'M {x-3} 43 L {x+1} 48','none',1)
  elif zone==1:b+=path(f'M {x-8} 49 Q {x} 37 {x+8} 45 L {x+12} 40 L {x+11} 51 L {x+6} 49 Q {x} 54 {x-8} 49 Z','#93beb5',1.5)
  else:b+=path(f'M {x-8} 50 Q {x-8} 37 {x} 38 Q {x+9} 38 {x+9} 50 Z','#f4dca9',1.5)
 add('cart'+str(zone),b,122,102)
b=ell(38,43,33,10,'#253837')
for x,y,r in [(13,31,11),(25,22,15),(42,20,15),(57,29,13),(40,36,17),(22,38,13)]:b+=circle(x,y,r,'#3c6756')
b+=path('M 12 28 L 20 22 M 34 14 L 40 10 M 49 28 L 56 23 M 25 37 L 32 31','none',1.5)+circle(23,26,2,'#d97c55')+circle(47,35,2,'#d97c55');add('bush',b,76,58)
add('bell',ell(31,59,25,6,'#29303b')+rect(13,7,5,47,'#946c56')+path('M 13 10 L 48 10 L 48 17','none',4)+path('M 35 25 Q 35 12 46 14 Q 55 14 54 28 L 59 34 Q 45 41 30 34 Z','#e7b85f')+circle(45,36,4,'#b47d49')+rect(7,49,22,8,'#ba915e'),64,68)
# Layered market backdrops, hand-authored shop silhouettes and seeded irregular paving.
for z in range(3):
 random.seed(31+z);ground=['#514f68','#465e65','#68515e'][z];wall=['#655c75','#5c7374','#7f646c'][z];trim=['#bd7c69','#87a39a','#c29371'][z];awning=['#b65a62','#477f88','#bc8b54'][z]
 b=f'<defs><radialGradient id="glow"><stop stop-color="#ffdc8c" stop-opacity=".5"/><stop offset="1" stop-color="#ffc66e" stop-opacity="0"/></radialGradient><linearGradient id="road" x2=".8" y2="1"><stop stop-color="{ground}"/><stop offset="1" stop-color="#333c52"/></linearGradient></defs>'
 b+=rect(0,0,420,640,'url(#road)',0)
 for row in range(25):
  for col in range(11):
   x=col*43-(row%2)*21+random.randint(-3,3);y=72+row*23+random.randint(-2,2)
   tone=random.choice(['#5d5b70','#55566d','#606176','#4c5267',ground,ground]);b+=path(f'M {x+2} {y+1} l 29 -2 l 9 5 l -1 13 l -31 3 l -7 -5 Z',tone,.7)
   if random.random()<.25:b+=path(f'M {x+8} {y+3} l 12 -1','none',.55)
 for j in range(170):
  x=random.randint(45,375);y=random.randint(85,610);c=random.choice(['#afa28530','#c2ad8340','#282d3c33']);b+=path(f'M {x} {y} l {random.randint(1,5)} -1',c,.55)
 for x,y in [(64,160),(341,177),(72,345),(340,540),(140,535),(284,120),(184,290)]:
  b+=path(f'M {x} {y} l 6 3 l -1 8 l 7 2 l -3 8 M {x+5} {y+11} l -5 4','none',.8)
 for j in range(24):
  x=random.randint(45,375);y=random.randint(90,580);b+=path(f'M {x} {y} q 5 -5 9 1 q -3 6 -9 -1 Z',random.choice(['#97774d','#ad8058','#797a50']),.6)
 # vertical side shops, angled roofs, ledges, shutters, flowerboxes and warm windows
 for side in [0,1]:
  for j in range(4):
   y=55+j*134;x=-45 if side==0 else 379
   b+=rect(x,y,87,126,wall,0)+path(f'M {x-5} {y+4} L {x+72} {y-20} L {x+93} {y+4} L {x+14} {y+26} Z','#303c54')
   for k in range(5):b+=path(f'M {x-1} {y+k*5+1} L {x+72} {y+k*5-20} L {x+90} {y+k*5+3}','none',1)
   for k in range(3):b+=path(f'M {x+8} {y+55+k*19} L {x+76} {y+55+k*19}','none',1)
   b+=rect(x+22,y+35,45,44,'#292f43')+rect(x+26,y+39,36,35,'#dca56f')+rect(x+30,y+43,28,26,'#f6cf89')+path(f'M {x+44} {y+38} L {x+44} {y+76} M {x+25} {y+57} L {x+62} {y+57}','none',3)
   b+=rect(x+20,y+78,50,7,trim)+rect(x+25,y+91,40,23,'#323b4c')+path(f'M {x+28} {y+97} L {x+60} {y+97} M {x+28} {y+104} L {x+60} {y+104}','none',1)
   # Masonry, hanging shop plaques and timber beams.
   b+=path(f'M {x+16} {y+34} L {x+16} {y+119} M {x+75} {y+34} L {x+75} {y+119}','none',3)
   for k in range(4):b+=path(f'M {x+3} {y+41+k*18} L {x+13} {y+41+k*18} M {x+72} {y+50+k*18} L {x+86} {y+50+k*18}','none',.7)
   if j%2==0:
    sx=x+70 if side==0 else x+13
    b+=path(f'M {sx} {y+29} l {20 if side==0 else -20} 0 l 0 13','none',2)
    sx+=12 if side==0 else -12
    b+=rect(sx-13,y+41,26,29,trim,7)+ell(sx,y+55,8,5,'#edc88a')+path(f'M {sx-4} {y+53} l 4 -5 l 4 5','none',1)
   # striped little canopy
   b+=path(f'M {x+15} {y+21} l 52 0 l 8 15 l -67 0 Z',awning)
   for k in range(4):b+=path(f'M {x+22+k*13} {y+22} l 7 0 l 5 14 l -10 0 Z','#e7c5a0',1)
   for k in range(5):b+=ell(x+25+k*8,y+88,7,4,'#426e57')
 # Decorative produce baskets and street furniture along the edge, not in active lanes.
 for x,y in [(34,230),(387,465),(32,485),(387,300)]:
  b+=ell(x,y+7,15,6,'#232c3b')+path(f'M {x-13} {y-8} L {x+13} {y-8} L {x+10} {y+7} L {x-10} {y+7} Z','#b48658')
  for k in range(4):b+=path(f'M {x-9+k*6} {y-6} l 0 11','none',.8)
  for dx,dy in [(-7,-8),(0,-11),(7,-7),(-3,-5),(4,-4)]:b+=circle(x+dx,y+dy,4,'#b96d59' if z!=1 else '#9aa763')
 # top district arch with signboard
 b+=rect(0,0,420,54,'#273346',0)+path('M 0 55 L 50 79 L 50 26 L 370 26 L 370 79 L 420 54 L 420 0 L 0 0 Z',wall)
 for x in range(8,420,23):b+=path(f'M {x} 5 L {x+12} 5 L {x+8} 20 L {x-5} 20 Z','#384659',1)
 b+=rect(111,18,198,40,'#302f3a',7)+rect(118,24,184,28,'#d3ad76',4)
 label=['BUTTER LANE','FISHERMAN’S ROW','MIDNIGHT MARKET'][z];b+=f'<text x="210" y="43" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="#403647" stroke="none">{label}</text>'
 b+=path('M 37 62 Q 210 106 383 62','none',1.5)
 for k in range(9):
  x=55+k*39;y=64+int(22*(1-abs(k-4)/4));b+=circle(x,y,5,'#ffd38b')
 for side in [0,1]:
  for y in [145,350,545]:
   x=37 if side==0 else 383
   b+=f'<circle cx="{x}" cy="{y+10}" r="57" fill="url(#glow)" stroke="none"/>'
   b+=path(f'M {x} {y+30} L {x} {y-5} l {8 if side==0 else -8} -7','none',3)+rect(x-6,y-15,12,18,'#efc379',2)+path(f'M {x-8} {y-16} L {x} {y-23} L {x+8} {y-16} Z','#344052')
 # peripheral crates, garden bits, no collision in playable lanes
 for x,y in [(12,246),(393,442),(12,575),(395,190)]:
  b+=rect(x-10,y-16,20,24,'#95694f')+path(f'M {x-8} {y-14} L {x+8} {y+6} M {x+8} {y-14} L {x-8} {y+6}','none',1.5)
 for j in range(45):
  x=random.choice([random.uniform(15,42),random.uniform(378,408)]);y=random.uniform(90,610);b+=path(f'M {x:.1f} {y:.1f} l -3 -7 l 5 4 l 4 -6 l -1 9 Z','#6f875d',1)
 # home tunnel, picnic blanket and foreground framing
 b+=ell(210,605,46,14,'#243342')+path('M 175 613 L 175 593 Q 176 564 210 565 Q 245 564 247 593 L 247 613 Z','#8b775f')+path('M 184 612 L 184 595 Q 184 577 210 578 Q 237 577 238 596 L 238 612 Z','#272f3d')+path('M 176 592 L 185 594 M 183 576 L 192 584 M 210 566 L 210 578 M 237 576 L 229 585 M 246 592 L 238 594','none',2)
 b+=rect(164,613,93,25,'#c17b69',3)
 for x in range(170,253,12):b+=path(f'M {x} 614 L {x+7} 614 L {x+7} 637 L {x} 637 Z','#d5a98a',.5)
 b+=path('M 165 624 L 257 624 M 165 632 L 257 632','none',.5)
 for x in [5,65,315,395]:
  b+=path(f'M {x-25} 640 Q {x-35} 596 {x} 608 Q {x+10} 580 {x+24} 609 Q {x+54} 608 {x+43} 640 Z','#304c46')+path(f'M {x} 629 L {x+9} 613 M {x+14} 633 L {x+28} 616','none',1)
 add('market'+str(z),b,420,640)
(P/'assets/art.js').write_text('window.SnackArt='+json.dumps(A,separators=(',',':'))+';',encoding='utf8')
(P/'assets/ART-NOTES.txt').write_text('Original code-authored SVG illustration. Separate 4-frame walking and carrying raccoon poses, four baker duck poses, three market scenes and stalls, food, bushes, bell and cookie. No third-party game art, source-video frames or AI-generated images used. SVG source is embedded in art.js for reliable offline use.\n')
print(len(A),'illustrations',sum(len(s) for s in A.values()),'SVG bytes')


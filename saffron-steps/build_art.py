"""SAFFRON STEPS. Original integer-pixel art; Pillow, no external assets."""
from pathlib import Path
from PIL import Image, ImageDraw
from font import FONT
import json
R=Path(__file__).parent
P=['#222438','#39364e','#575069','#817387','#aca0a1','#e1c9aa','#fff0cf','#dca66c','#ad704f','#764a47','#d77859','#f4ad77','#a14453','#712f4b','#527578','#7baba0','#afd2b0','#354f55','#4e725c','#73945e','#a4b96d','#e3c34d','#fff09a','#91a8bc']
def img(w,h,c=0):return Image.new('RGBA',(w,h),P[c] if c is not None else (0,0,0,0))
def poly(a,pts,c):ImageDraw.Draw(a).polygon(pts,fill=P[c])
def box(a,x,y,w,h,c):ImageDraw.Draw(a).rectangle((x,y,x+w-1,y+h-1),fill=P[c])
def line(a,pts,c):ImageDraw.Draw(a).line(pts,fill=P[c],width=1)
def text(a,s,x,y,c=6):
 for ch in s.upper():
  for yy,row in enumerate(FONT.get(ch,[])):
   for xx,on in enumerate(row):
    if on=='1':box(a,x+xx,y+yy,1,1,c)
  x+=6
def save(a,n):a.save(R/n)
def scale(a,n):return a.resize((a.width*n,a.height*n),Image.Resampling.NEAREST)
def q(x,y,z=0):return (round(240+(x-y)*16),round(65+(x+y)*8-z))
def face(a,coords,c):poly(a,[q(*v) for v in coords],c)
def cube(a,x,y,w,d,z,h,colors):
 t,l,r=colors
 face(a,[(x,y+d,z),(x+w,y+d,z),(x+w,y+d,z+h),(x,y+d,z+h)],l)
 face(a,[(x+w,y,z),(x+w,y+d,z),(x+w,y+d,z+h),(x+w,y,z+h)],r)
 face(a,[(x,y,z+h),(x+w,y,z+h),(x+w,y+d,z+h),(x,y+d,z+h)],t)
 # Roof / rim edges share the same 2:1 projection.
 line(a,[q(x,y+d,z+h),q(x,y,z+h),q(x+w,y,z+h)],t)
def person(role,f=0):
 a=img(24,32,None);b=f%2
 if role==0: # Iri: wide saffron cap, triangular plum apron
  box(a,7,5+b,11,8,9);box(a,5,4+b,14,4,21);box(a,8,1+b,8,4,7);box(a,8,8+b,9,7,5);box(a,14,9+b,1,2,0)
  poly(a,[(8,15),(16,15),(19,25),(5,25)],12);box(a,8,16,8,2,11);box(a,4,17,3,6,5);box(a,17,17,3,6,5)
 elif role==1: # Mallow: bulky pot-carrying gardener
  box(a,6,6+b,12,10,8);box(a,4,4+b,16,4,18);box(a,7,2+b,10,3,20);box(a,8,9+b,9,6,5);box(a,14,10+b,1,2,0);box(a,5,16,14,10,14);box(a,7,18,11,7,7);box(a,6,17,13,2,11);box(a,10,13,3,5,18)
 else: # Pin: small clockwork finch, tail/crest silhouette
  poly(a,[(4,22),(9,16),(12,10),(18,12),(19,19),(15,24),(7,25)],15);box(a,12,7+b,6,6,21);box(a,15,9+b,1,1,0);box(a,18,11+b,4,2,11);box(a,3,22,7,3,14);box(a,10,17,5,5,6)
 for x in ([8,14] if role<2 else [11,15]):box(a,x+(b if x==8 else -b),26,3,3,0)
 if role==0:
  box(a,7,5+b,11,1,11);box(a,9,2+b,5,1,22);box(a,8,7+b,2,3,8)
  box(a,10,12+b,3,1,11);box(a,12,10+b,1,1,9);box(a,15,12+b,2,1,10)
  box(a,8,18,2,5,13);box(a,9,24,7,1,13);box(a,12,18,3,3,5);box(a,13,18,1,1,6)
  box(a,5,23,2,2,10);box(a,8,28,4,1,8);box(a,14,28,4,1,8)
 elif role==1:
  box(a,6,5+b,12,1,20);box(a,8,3+b,6,1,16);box(a,7,8+b,2,4,9)
  box(a,8,12+b,3,2,8);box(a,15,13+b,2,1,11);box(a,6,17,2,6,17)
  box(a,8,20,8,1,11);box(a,9,23,7,1,8);box(a,11,15,3,2,20)
 else:
  box(a,12,17,2,3,14);box(a,14,19,2,2,14);box(a,13,8+b,2,1,22)
  box(a,7,23,3,1,16);box(a,10,21,2,1,6)
 return a
def prop(k):
 a=img(32,32,None)
 if k==0: # teapot
  poly(a,[(9,12),(22,12),(25,23),(21,26),(10,26),(7,22)],8);box(a,10,13,11,3,11);box(a,12,8,8,4,7);box(a,14,6,4,2,21);poly(a,[(7,16),(1,12),(3,20),(9,23)],7);line(a,[(23,15),(29,15),(29,23),(24,23)],21)
 elif k==1: # dye roll
  poly(a,[(4,15),(17,8),(28,14),(15,21)],11);poly(a,[(4,15),(15,21),(15,28),(4,22)],12);poly(a,[(15,21),(28,14),(28,21),(15,28)],13);line(a,[(8,15),(17,11),(24,15),(15,19),(11,17),(18,14)],6)
 elif k==2: # herb planter
  poly(a,[(6,20),(24,20),(21,29),(9,29)],8);box(a,5,18,21,4,10)
  for x,y in [(8,12),(15,7),(22,12)]:box(a,x,y,2,10,18);poly(a,[(x,y+3),(x-4,y),(x-4,y-3),(x,y)],20);poly(a,[(x+1,y+5),(x+6,y+1),(x+6,y-2),(x+1,y+1)],19)
 elif k==3: # lantern
  box(a,13,3,6,3,8);box(a,11,5,10,3,21);box(a,8,8,16,17,0);box(a,10,9,12,14,7);box(a,12,10,8,10,22);box(a,15,9,2,14,6);box(a,9,24,14,3,8)
 elif k==4: # scale
  box(a,14,7,3,20,8);box(a,7,26,18,3,21);box(a,4,7,24,2,7)
  for x in [7,24]:line(a,[(x,8),(x-3,17),(x+3,17),(x,8)],5);box(a,x-4,17,9,2,21)
 else: # tea cup
  box(a,7,14,15,11,5);box(a,8,13,13,3,6);box(a,10,15,9,3,8);line(a,[(22,15),(27,15),(27,21),(22,21)],6);box(a,5,26,21,2,7)
 if k==0:
  line(a,[(11,18),(13,20),(17,20),(19,18)],21);box(a,10,15,2,4,6);box(a,20,20,2,3,9);box(a,14,9,4,1,6)
 elif k==1:
  for x,y in [(8,20),(11,22),(17,23),(20,21)]:box(a,x,y,2,1,21)
 elif k==2:
  box(a,9,23,12,1,11);box(a,10,27,10,1,9)
  for x,y in [(5,10),(12,5),(20,9)]:box(a,x,y,3,1,16)
 elif k==3:
  box(a,10,12,2,8,21);box(a,20,12,2,8,8);box(a,12,22,8,1,11)
 elif k==4:box(a,12,23,7,1,6);box(a,14,10,1,10,21)
 else:box(a,8,18,2,5,6);box(a,19,18,2,6,7);box(a,9,25,12,1,8)
 return a
def house(a,x,y,w,d,h,kind):
 z=8+h
 cube(a,x,y,w,d,8,h,(5,5,8))
 cube(a,x,y,w,d,8,4,(7,8,9))
 # Warm plaster with isolated masonry repairs, not a wallpaper of noise.
 for u,zz in [(.15,17),(.35,32),(w-.55,15),(w-.4,35)]:
  face(a,[(x+u,y+d,zz),(x+u+.25,y+d,zz),(x+u+.25,y+d,zz+2),(x+u,y+d,zz+2)],7)
 for u in [0,w]:
  X,Y=q(x+u,y+d,12);line(a,[(X,Y),(X,Y-h+5)],8)
 for zz in [15,z-5]:line(a,[q(x,y+d,zz),q(x+w,y+d,zz)],7)
 # Recessed timber windows, two panes, cream lintel and planted sill.
 for u in [.42,w-1.05]:
  face(a,[(x+u,y+d,21),(x+u+.58,y+d,21),(x+u+.58,y+d,34),(x+u,y+d,34)],9)
  face(a,[(x+u+.08,y+d,23),(x+u+.48,y+d,23),(x+u+.48,y+d,32),(x+u+.08,y+d,32)],21)
  face(a,[(x+u+.08,y+d,27),(x+u+.26,y+d,27),(x+u+.26,y+d,32),(x+u+.08,y+d,32)],22)
  line(a,[q(x+u+.29,y+d,23),q(x+u+.29,y+d,33)],8)
  line(a,[q(x+u-.06,y+d,35),q(x+u+.64,y+d,35)],6)
  cube(a,x+u-.1,y+d,.75,.22,19,3,(7,8,9))
  for t in [.05,.3,.55]:
   X,Y=q(x+u+t,y+d+.14,23);box(a,X,Y-2,3,3,18);box(a,X,Y-3,2,1,20)
 # Side door with board seams, steps and a tiny brass handle.
 face(a,[(x+w,y+.6,12),(x+w,y+1.35,12),(x+w,y+1.35,32),(x+w,y+.6,32)],9)
 for v in [.72,.9,1.08,1.26]:line(a,[q(x+w,y+v,14),q(x+w,y+v,30)],7)
 X,Y=q(x+w,y+1.1,21);box(a,X,Y,2,2,21)
 cube(a,x+w,y+.55,.4,.9,8,3,(5,7,8))
 # Gabled roof, ridge follows X; each shingle is a coherent projected cluster.
 rx,ry=x-.22,y-.22;rw,rd=w+.44,d+.44;ridge=13
 face(a,[(rx,ry,z),(rx+rw,ry,z),(rx+rw,ry+rd/2,z+ridge),(rx,ry+rd/2,z+ridge)],12 if kind==0 else 14)
 face(a,[(rx,ry+rd/2,z+ridge),(rx+rw,ry+rd/2,z+ridge),(rx+rw,ry+rd,z),(rx,ry+rd,z)],10 if kind==0 else 15)
 face(a,[(rx+rw,ry,z),(rx+rw,ry+rd,z),(rx+rw,ry+rd/2,z+ridge)],9 if kind==0 else 17)
 rows=4
 for r in range(rows):
  v0=rd/2+r*rd/(2*rows);v1=v0+rd/(2*rows);z0=z+ridge*(1-r/rows);z1=z+ridge*(1-(r+1)/rows)
  line(a,[q(rx,ry+v1,z1),q(rx+rw,ry+v1,z1)],12 if kind==0 else 14)
  for t in range(int(rw*3)):
   u=.15+t*.34+(r%2)*.17
   if u>=rw:continue
   line(a,[q(rx+u,ry+v0,z0),q(rx+u,ry+v1,z1)],11 if kind==0 else 16)
 line(a,[q(rx,ry+rd/2,z+ridge),q(rx+rw,ry+rd/2,z+ridge)],11 if kind==0 else 16)
 line(a,[q(rx,ry+rd,z),q(rx+rw,ry+rd,z)],9 if kind==0 else 17)
 cube(a,x+.35,y+.4,.42,.42,z+7,12,(7,8,9));cube(a,x+.25,y+.3,.62,.62,z+18,2,(5,8,9))
 # Hanging sign on a visible bracket; tiny original cup mark.
 X,Y=q(x+w,y+d,35);line(a,[(X,Y-8),(X+12,Y-8),(X+12,Y)],9)
 box(a,X+4,Y-1,17,12,9);box(a,X+5,Y,15,10,21);box(a,X+9,Y+3,6,4,6);line(a,[(X+15,Y+3),(X+17,Y+3),(X+17,Y+5),(X+15,Y+5)],6)

def flowering_tree(a,x,y,z=0):
 X,Y=q(x,y,z)
 poly(a,[(X-13,Y),(X,Y-5),(X+15,Y),(X,Y+6)],8)
 line(a,[(X,Y),(X-1,Y-28),(X-7,Y-40)],9);line(a,[(X-1,Y-19),(X+8,Y-34)],8)
 for dx,dy,w,h,c in [(-17,-48,18,12,18),(-9,-57,19,13,19),(3,-49,19,15,18),(-14,-45,22,14,19),(-5,-48,19,12,20)]:
  poly(a,[(X+dx+3,Y+dy),(X+dx+w-4,Y+dy),(X+dx+w,Y+dy+4),(X+dx+w,Y+dy+h-3),(X+dx+w-4,Y+dy+h),(X+dx+3,Y+dy+h),(X+dx,Y+dy+h-4),(X+dx,Y+dy+4)],c)
 for dx,dy in [(-11,-48),(-3,-54),(8,-46),(-6,-38),(12,-39)]:box(a,X+dx,Y+dy,3,2,11);box(a,X+dx+1,Y+dy-1,1,1,6)

def barrel(a,x,y,z=0):
 cube(a,x,y,.6,.6,z,11,(7,8,9))
 for zz in [2,8]:line(a,[q(x,y+.6,z+zz),q(x+.6,y+.6,z+zz),q(x+.6,y,z+zz)],9)
 line(a,[q(x+.15,y+.6,z+3),q(x+.15,y+.6,z+7)],7)
def scene(frame=0,game=False):
 a=img(480,320,1)
 # Quiet stepped atmosphere, still only indexed solid pixel clusters.
 poly(a,[(0,195),(80,155),(240,235),(400,155),(480,195),(480,320),(0,320)],0)
 for x,y in [(23,88),(436,115),(72,250),(408,253),(370,37)]:
  box(a,x,y,2,1,3)
 # Distant architecture, reduced contrast and no microtexture.
 for x,y,w,d,h in [(1,0,3,2,27),(5,-1,3,2,36),(9,0,2,2,24)]:cube(a,x,y,w,d,-1,h,(3,2,1))
 for y in range(11):
  for x in range(11):
   if (x<2 and y>8) or (x>9 and y<2):continue
   h=8 if y<5 else 0
   cube(a,x,y,1,1,-10,10+h,(5,8,9))
   # Mortar follows the tile axes. Worn chips appear only on selected edges.
   line(a,[q(x,y+1,h),q(x+1,y+1,h),q(x+1,y,h)],7)
   if (x*3+y)%7==0:
    X,Y=q(x+.3,y+.4,h);box(a,X,Y,3,1,7)
 # Draw joints only after all ground tops: later tiles must not erase them.
 for y in range(11):
  for x in range(11):
   if (x<2 and y>8) or (x>9 and y<2):continue
   h=8 if y<5 else 0
   # Two-pixel inset broken joints read as large worn pavers, not graph paper.
   line(a,[q(x+.13,y+.95,h),q(x+.7,y+.95,h)],7)
   line(a,[q(x+.95,y+.14,h),q(x+.95,y+.65,h)],7)
 # Long building shadows are restrained solid clusters beneath all props.
 for x,y,w,d in [(1,1,3,2),(7,1,2,3)]:
  face(a,[(x+w,y,8),(x+w+.65,y+.6,8),(x+w+.65,y+d+.8,8),(x,y+d+.8,8),(x,y+d,8),(x+w,y+d,8)],7)
 # A suspended dye line occupies the gap between roofs, clear of actor heads.
 line(a,[q(4.2,2,35),q(5.5,2,32),q(6.9,2,35)],9)
 for x,c in [(4.6,12),(5.3,15),(6,21)]:
  face(a,[(x,2,33),(x+.4,2,33),(x+.4,2,25),(x,2,25)],c)
  X,Y=q(x+.15,2,33);box(a,X,Y-2,1,3,7)
 # Retaining wall course; darker lower edge gives the quarter physical weight.
 for x in range(2,11):
  line(a,[q(x,11,-5),q(x+1,11,-5)],9)
  line(a,[q(x+.5,11,-5),q(x+.5,11,-9)],8)
 # Low walled herb beds, flowers held away from the main walking lane.
 for x,y in [(.25,4.8),(8.6,9.6)]:
  cube(a,x,y,1.5,.65,0,5,(7,8,9))
  for u in [.2,.65,1.1]:
   X,Y=q(x+u,y+.3,7);box(a,X-2,Y-3,5,3,18);box(a,X,Y-5,3,3,20);box(a,X+1,Y-6,2,2,11)
 # tier transition: four clear stone risers, continuous 2:1 edges
 for j in range(4):cube(a,4+j*.25,4.7,0.25,1.4,0,8-j*2,(6,7,8))
 # Furnishings and cast sorted by their front footpoints.
 objects=[(1,1,3,2,37,0),(7,1,2,3,43,1)]
 items=[(2.5,6.5,0),(8,6.5,1),(6.5,8.5,2),(3,3.5,3),(9,5.5,4),(5,7.5,5),(1,5.5,2),(9.5,8,3)]
 entries=[(x+y+d,0,(x,y,w,d,h,k)) for x,y,w,d,h,k in objects]
 entries += [(x+y,1,(x,y,k)) for x,y,k in items]
 if not game:entries += [(x+y,2,(x,y,r)) for x,y,r in [(4.6,6.3,0),(7,7.3,1),(5.6,4,2)]]
 entries += [(x+y,4,(x,y,z)) for x,y,z in [(1,6.5,0),(7.7,10.2,0)]]
 entries += [(x+y+1,5,(x,y,z)) for x,y,z in [(4.4,2.8,8),(4.9,2.8,8),(9.4,3.7,8)]]
 # striped textile stall
 entries.append((13.8,3,(8,5,0)))
 for _,typ,v in sorted(entries,key=lambda e:e[0]):
  if typ==0:house(a,*v)
  elif typ==1:
   x,y,k=v;X,Y=q(x,y,8 if y<5 else 0)
   if k in [0,1,4,5]:a.alpha_composite(prop(k).resize((22,22),Image.Resampling.NEAREST),(X-11,Y-20))
   else:a.alpha_composite(prop(k),(X-16,Y-29))
  elif typ==2:
   x,y,r=v;X,Y=q(x,y,8 if y<5 else 0);poly(a,[(X-7,Y),(X,Y-3),(X+7,Y),(X,Y+3)],8);a.alpha_composite(person(r,frame),(X-12,Y-29))
  elif typ==4:flowering_tree(a,*v)
  elif typ==5:barrel(a,*v)
  else:
   x,y,_=v;cube(a,x,y,1.8,.9,0,15,(7,8,9))
   for u in [0,1.7]:
    X,Y=q(x+u,y+.8,0);line(a,[(X,Y),(X,Y-36)],9)
   cube(a,x-.1,y-.1,2,1,33,2,(5,12,13))
   for u in range(4):face(a,[(x+u*.5,y-.1,35),(x+u*.5+.25,y-.1,35),(x+u*.5+.25,y+.9,35),(x+u*.5,y+.9,35)],12)
   for u in [.2,.7,1.2]:
    X,Y=q(x+u,y+.8,17);box(a,X-3,Y-4,6,5,21 if u<1 else 10)
   # scalloped cloth edge, tassels and diagonal weave marks
   for u in [.15,.5,.85,1.2,1.55]:
    X,Y=q(x+u,y+.9,33);box(a,X-1,Y,4,3,11);box(a,X,Y+3,1,3,21)
   for zz in [5,9]:line(a,[q(x,y+.9,zz),q(x+1.8,y+.9,zz)],7)
 # curated small life details: patterned rug, brass drains, fence, vine
 face(a,[(3,7,1),(4.5,7,1),(4.5,8.5,1),(3,8.5,1)],12)
 for k in range(4):line(a,[q(3+k*.4,7,2),q(3+k*.4,8.5,2)],11)
 for u in [.12,1.32]:line(a,[q(3+u,7,2),q(3+u,8.5,2)],21)
 for v in [.12,1.32]:line(a,[q(3,7+v,2),q(4.5,7+v,2)],21)
 for u in range(6):
  X,Y=q(1+u*.5,9.8,0);box(a,X,Y-12,2,13,8)
 line(a,[q(1,9.8,10),q(3.5,9.8,10)],7)
 for x,y,h in [(1,1,37),(7,1,43)]:
  X,Y=q(x+.6,y+.6,h+36)
  for t in range(3):
   dx=[0,1,1,0][(frame+t)%4];dy=t*5+frame%2
   box(a,X+dx,Y-dy,4+t,2,4 if t<2 else 3)
 # A tea table, stools and drain remain below the front actors.
 cube(a,2.3,8.5,1.3,.7,0,9,(7,8,9))
 X,Y=q(2.9,8.8,9);a.alpha_composite(prop(5).resize((18,18),Image.Resampling.NEAREST),(X-9,Y-16))
 for x,y in [(2.1,9.4),(3.7,8.4)]:cube(a,x,y,.4,.4,0,5,(11,8,9))
 for k in range(4):line(a,[q(7+k*.14,9,1),q(7+k*.14,9.5,1)],8)
 # Individual petals drift with small integer offsets, never screen-filling FX.
 for x,y,t in [(1.4,6.7,0),(2,7.1,2),(9.1,8.1,1)]:
  X,Y=q(x,y,8+(frame+t)%4);box(a,X+(frame+t)%3,Y,2,1,11)
 # Gold corner ticks make a finished diorama card without covering the street.
 for x,y,s in [(10,58,1),(468,58,-1),(10,260,1),(468,260,-1)]:
  line(a,[(x+s*7,y),(x,y),(x,y+(-7 if y>200 else 7))],3)
 if game:return a
 # border framing and native UI
 box(a,12,12,147,22,0);line(a,[(12,18),(12,12),(23,12)],7);line(a,[(147,33),(158,33),(158,27)],7);text(a,'SAFFRON STEPS',20,18,6);text(a,'A TINY LIVING QUARTER',20,26,15)
 box(a,340,278,126,29,0);a.alpha_composite(prop(5),(343,277));text(a,'TEA / 03',377,287,6);text(a,'READY TO SERVE',377,297,21)
 text(a,'THE TEA QUARTER',16,282,5);text(a,'SUNLIT COURTYARD / 01',16,294,15)
 return a
def build():
 for f in range(4):save(scene(f,True),f'quarter-{f}.png')
 frames=[scene(f) for f in range(4)];save(frames[0],'wide.png');save(frames[0].crop((168,115,328,235)),'close.png')
 frames[0].save(R/'living-quarter.gif',save_all=True,append_images=frames[1:],duration=220,loop=0,disposal=2)
 atlas=img(192,64,None)
 for r in range(3):
  for f in range(4):atlas.alpha_composite(person(r,f),(r*64+(f%2)*24,(f//2)*32))
 save(atlas,'cast.png')
 silhouettes=atlas.copy();silhouettes.paste(P[6],(0,0,192,64),atlas.getchannel('A'));save(silhouettes,'silhouettes.png')
 props=img(192,32,None)
 for k in range(6):props.alpha_composite(prop(k),(k*32,0))
 save(props,'props.png')
 poses=img(192,48,None)
 for f in range(4):
  p=person(0,0);p.alpha_composite(prop(5).resize((16,16),Image.Resampling.NEAREST),(8,12-[0,5,8,1][f]));poses.alpha_composite(p,(f*48+12,6))
  if f==2:
   for x,y in [(f*48+34,12),(f*48+39,19),(f*48+29,7)]:box(poses,x,y,2,2,22)
 save(poses,'serve-poses.png')
 dusk=frames[0].copy();mapping={tuple(bytes.fromhex(c[1:])):tuple(bytes.fromhex(P[j][1:])) for c,j in zip(P,[0,0,1,2,3,4,6,8,9,1,12,10,13,1,17,14,15,0,17,18,19,21,22,3])}
 dusk.putdata([(*mapping[p[:3]],p[3]) for p in dusk.getdata()]);save(dusk,'dusk.png')
 ui=img(320,120,0);text(ui,'TEA / 03',14,12,6)
 for i in range(6):
  xx=12+i*50
  box(ui,xx,32,44,44,21 if i==0 else 2);box(ui,xx+1,33,42,42,0);box(ui,xx+3,35,38,38,17 if i==0 else 1)
  line(ui,[(xx+3,41),(xx+3,35),(xx+10,35)],6 if i==0 else 3)
  line(ui,[(xx+34,72),(xx+40,72),(xx+40,66)],7 if i==0 else 2)
  ui.alpha_composite(prop(i),(18+i*50,38));text(ui,str(i+1),xx+34,66,6 if i==0 else 4)
 text(ui,'SELECTED',12,86,21);text(ui,'READY',118,86,16);text(ui,'LOCKED',222,86,4);box(ui,12,103,180,5,2);box(ui,12,103,132,5,21);save(ui,'ui.png')
 materials=img(480,120,0)
 for k,cols in enumerate([(5,7,8),(11,10,12),(16,15,14),(20,19,18),(7,8,9)]):
  cell=img(480,320,None);cube(cell,0,0,1.5,1.5,0,20,cols)
  crop=cell.crop((212,20,268,80));materials.alpha_composite(crop,(16+k*92,20));text(materials,['STONE','TILE','GLAZE','LEAF','WOOD'][k],16+k*92,99,5)
 save(materials,'materials.png')
 board=img(1024,1336,0);text(board,'SAFFRON STEPS / ISOMETRIC PIXEL WORLD',32,23,6);text(board,'01 / WIDE VIEW - 480 X 320 - FIXED 2:1 PROJECTION',32,48,15)
 board.alpha_composite(scale(frames[0],2),(32,66))
 text(board,'02 / EXACT CLOSE CROP',32,730,21);board.alpha_composite(scale(frames[0].crop((168,115,328,235)),3),(32,748))
 text(board,'03 / 24 X 32 CAST',548,730,21);board.alpha_composite(scale(atlas,2),(548,750))
 text(board,'SILHOUETTES / SAME FOOT PIVOT',548,898,15);board.alpha_composite(scale(silhouettes,2),(548,916))
 text(board,'04 / LIVING PROPS',548,1064,21);board.alpha_composite(scale(props,2),(548,1084))
 text(board,'05 / MATERIAL RAMPS',32,1130,21);board.alpha_composite(materials,(32,1145))
 for k,c in enumerate(P):box(board,32+k*40,1285,34,18,k)
 text(board,'24 COLORS / INTEGER PIXELS / LEFT LIGHT / RIGHT SHADE',32,1315,6);save(board,'art-board.png')
 detail=img(720,512,0);text(detail,'SAFFRON STEPS / CRAFT & LIGHT STUDY',24,20,6)
 detail.alpha_composite(scale(frames[0].crop((200,34,320,154)),3),(24,42));text(detail,'SHINGLES / PLASTER / JOINERY',24,410,15)
 detail.alpha_composite(scale(person(0,0),4),(436,52));detail.alpha_composite(scale(person(1,0),4),(564,52))
 text(detail,'CLOTH / APRON / HAT / GLAZE',408,196,15)
 detail.alpha_composite(scale(props,1),(438,220));detail.alpha_composite(ui,(392,286));detail.alpha_composite(scale(poses,1),(440,416))
 text(detail,'PREPARE  >  CONTACT  >  SETTLE',408,478,21);save(detail,'craft-study.png')
 save(scale(frames[0],3),'wide-3x.png')
 palette=[{'index':i,'hex':c} for i,c in enumerate(P)];(R/'palette.json').write_text(json.dumps(palette,indent=2))
 (R/'atlas.json').write_text(json.dumps({'tile':[32,16],'height_step':8,'projection':'screen=(originX+16*(x-y),originY+8*(x+y)-z)','cast':{'cell':[24,32],'pivot':[12,29],'roles':['Iri / tea apprentice','Mallow / gardener','Pin / clockwork finch'],'frames':4},'props':{'cell':[32,32],'pivot':[16,29],'ids':['teapot','dye roll','herbs','lantern','scale','cup']},'close_crop':[168,115,328,235]},indent=2))
if __name__=='__main__':build()

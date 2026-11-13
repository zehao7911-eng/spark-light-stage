"""Original native-grid pixel assets. Pillow primitives only, no antialias/noise filters."""
from PIL import Image, ImageDraw
from pathlib import Path
import math,json,hashlib
ROOT=Path(__file__).resolve().parent
COLORS=[
 ('Ink','#14202b'),('Night','#20333e'),('Deep water','#2c4851'),('Slate','#42606a'),
 ('Mist','#65818a'),('Rain','#92a6a8'),('Pearl','#c6ccbb'),('Linen','#ede1bc'),
 ('Moss shade','#293e3b'),('Pine','#3b5547'),('Fern','#57725a'),('Sage','#81916a'),
 ('Leaf light','#b0b58a'),('Peat','#493e3c'),('Bark','#655048'),('Timber','#886752'),
 ('Oak edge','#b18a65'),('Brick shade','#6d4e48'),('Terracotta','#986950'),('Clay','#bc8960'),
 ('Copper shade','#6e573e'),('Bronze','#a67c48'),('Brass','#d5ab64'),('Lamplight','#f2cf88'),
 ('Cloak shade','#293f58'),('Indigo','#3e5d78'),('Cornflower','#63859a'),('Skin shade','#b88068'),
 ('Skin','#dbad87'),('Rose shade','#75546b'),('Rose','#a77c8d'),('Glint','#f9edcc')]
P=[c for _,c in COLORS]
FONT={}
_rows={
'A':'01110/10001/10001/11111/10001/10001/10001','B':'11110/10001/10001/11110/10001/10001/11110','C':'01111/10000/10000/10000/10000/10000/01111','D':'11110/10001/10001/10001/10001/10001/11110','E':'11111/10000/10000/11110/10000/10000/11111','F':'11111/10000/10000/11110/10000/10000/10000','G':'01111/10000/10000/10111/10001/10001/01111','H':'10001/10001/10001/11111/10001/10001/10001','I':'111/010/010/010/010/010/111','J':'00111/00010/00010/00010/10010/10010/01100','K':'10001/10010/10100/11000/10100/10010/10001','L':'10000/10000/10000/10000/10000/10000/11111','M':'10001/11011/10101/10101/10001/10001/10001','N':'10001/11001/10101/10011/10001/10001/10001','O':'01110/10001/10001/10001/10001/10001/01110','P':'11110/10001/10001/11110/10000/10000/10000','Q':'01110/10001/10001/10001/10101/10010/01101','R':'11110/10001/10001/11110/10100/10010/10001','S':'01111/10000/10000/01110/00001/00001/11110','T':'11111/00100/00100/00100/00100/00100/00100','U':'10001/10001/10001/10001/10001/10001/01110','V':'10001/10001/10001/10001/10001/01010/00100','W':'10001/10001/10001/10101/10101/10101/01010','X':'10001/10001/01010/00100/01010/10001/10001','Y':'10001/10001/01010/00100/00100/00100/00100','Z':'11111/00001/00010/00100/01000/10000/11111',
'0':'01110/10001/10011/10101/11001/10001/01110','1':'010/110/010/010/010/010/111','2':'01110/10001/00001/00010/00100/01000/11111','3':'11110/00001/00001/01110/00001/00001/11110','4':'00010/00110/01010/10010/11111/00010/00010','5':'11111/10000/10000/11110/00001/00001/11110','6':'01110/10000/10000/11110/10001/10001/01110','7':'11111/00001/00010/00100/01000/01000/01000','8':'01110/10001/10001/01110/10001/10001/01110','9':'01110/10001/10001/01111/00001/00001/01110',
'-':'00000/00000/00000/11111/00000/00000/00000','.':'0/0/0/0/0/0/1',':':'0/1/1/0/1/1/0','/':'00001/00001/00010/00100/01000/10000/10000','+':'00000/00100/00100/11111/00100/00100/00000','>':'100/010/001/010/100/000/000','!':'1/1/1/1/1/0/1','?':'01110/10001/00001/00010/00100/00000/00100',' ':'000/000/000/000/000/000/000'}
FONT={k:v.split('/') for k,v in _rows.items()}
def text(im,xy,s,col=6,scale=1):
 d=ImageDraw.Draw(im);x,y=xy
 for ch in s.upper():
  rows=FONT.get(ch,FONT['?']);w=len(rows[0])
  for j,row in enumerate(rows):
   for i,z in enumerate(row):
    if z=='1':d.rectangle((x+i*scale,y+j*scale,x+(i+1)*scale-1,y+(j+1)*scale-1),fill=P[col])
  x+=(w+1)*scale
 return x
def rect(im,xy,col):
 xy=tuple(round(n) for n in xy)
 if xy[2]>=xy[0] and xy[3]>=xy[1]:ImageDraw.Draw(im).rectangle(xy,fill=P[col] if isinstance(col,int) else col)
def line(im,pts,col,width=1):ImageDraw.Draw(im).line([(round(x),round(y)) for x,y in pts],fill=P[col],width=width)
def poly(im,pts,col):ImageDraw.Draw(im).polygon([(round(x),round(y)) for x,y in pts],fill=P[col])
def ellipse(im,xy,col):ImageDraw.Draw(im).ellipse(tuple(round(n) for n in xy),fill=P[col])
def frame(im,box,fill=1,edge=21):
 x,y,w,h=box;rect(im,(x+2,y,x+w-3,y+h-1),0);rect(im,(x,y+2,x+w-1,y+h-3),0);rect(im,(x+2,y+2,x+w-3,y+h-3),edge);rect(im,(x+3,y+3,x+w-4,y+h-4),fill);line(im,[(x+5,y+4),(x+w-6,y+4)],16);line(im,[(x+4,y+5),(x+4,y+h-6)],16)
def fern(im,x,y,s=1,pal=(9,10,11),flip=1):
 for branch in range(5):
  a=-2.6+branch*.5;length=(11+(branch%3)*4)*s
  ex=x+math.cos(a)*length*flip;ey=y+math.sin(a)*length
  line(im,[(x,y),(ex,ey)],pal[0])
  for j in range(2,7):
   f=j/7;xx=x+(ex-x)*f;yy=y+(ey-y)*f;l=(1-f)*7*s+1
   for side in [-1,1]:
    poly(im,[(xx,yy),(xx+side*l*flip,yy-2*s),(xx+side*l*.6*flip,yy-4*s),(xx+flip,yy-2*s)],pal[1+(j+branch)%2])
def vine(im,x,y,n=14):
 for i in range(n):
  xx=x+(i%5<2)*2;yy=y+i*3;rect(im,(xx,yy,xx+1,yy+3),9)
  poly(im,[(xx,yy),(xx-5,yy-1),(xx-6,yy+2),(xx-2,yy+3)],10 if i%3 else 11)
  if i%2:poly(im,[(xx+1,yy+1),(xx+6,yy),(xx+5,yy+4),(xx+2,yy+4)],10)
def bricks(im,box,pal=(17,18,19),unit=12):
 x,y,w,h=map(int,box);rect(im,(x,y,x+w-1,y+h-1),pal[0])
 for row,yy in enumerate(range(y+1,y+h-1,unit//2+1)):
  for col,xx in enumerate(range(x-unit+(row%2)*unit//2,x+w,unit)):
   l=max(x+1,xx);r=min(x+w-2,xx+unit-2);b=min(y+h-2,yy+unit//2-1)
   if r<l:continue
   rect(im,(l,yy,r,b),pal[1]);line(im,[(l+1,yy),(r-1,yy)],pal[2] if (row+col)%4 else pal[1]);
   if (row*3+col)%7==0 and r-l>5:line(im,[(r-3,b-1),(r-1,b-1)],pal[0])
def planks(im,box,horizontal=False,pal=(13,14,15,16)):
 x,y,w,h=map(int,box);rect(im,(x,y,x+w-1,y+h-1),pal[0])
 for i in range(0,h if horizontal else w,7):
  if horizontal:
   rect(im,(x+1,y+i+1,x+w-2,min(y+h-2,y+i+6)),pal[1+i//7%2]);line(im,[(x+3,y+i+2),(x+w-4,y+i+2)],pal[3]);line(im,[(x+9,y+i+4),(x+w//2,y+i+4)],pal[0])
  else:
   rect(im,(x+i+1,y+1,min(x+w-2,x+i+6),y+h-2),pal[1+i//7%2]);line(im,[(x+i+2,y+3),(x+i+2,y+h-4)],pal[3]);line(im,[(x+i+4,y+8),(x+i+4,y+h//2)],pal[0])
def roof(im,x,y,w,h):
 # Long 3-5 pixel shingle clusters form readable rows, not random stippling.
 poly(im,[(x,y+h),(x+w*.28,y),(x+w*.85,y),(x+w,y+h)],0)
 for row in range(h//5):
  yy=y+row*5+2;l=int(x+w*.28*(1-row/(h/5)));r=int(x+w*.85+w*.15*row/(h/5))
  for k,xx in enumerate(range(l,r,9)):
   rect(im,(xx,yy,min(xx+8,r),yy+3),[2,3,4][(k+row)%3 if (k+row)%6==0 else 1]);line(im,[(xx+1,yy),(min(xx+6,r),yy)],4);rect(im,(xx+7,yy+3,min(xx+8,r),yy+4),1)
 line(im,[(x+int(w*.28),y),(x+int(w*.85),y)],6,2);line(im,[(x,y+h),(x+w,y+h)],1,3);line(im,[(x+2,y+h-2),(x+w-2,y+h-2)],4)
def window(im,x,y,w=25,h=33,lit=True):
 rect(im,(x,y,x+w,y+h),0);rect(im,(x+2,y+2,x+w-2,y+h-2),20 if lit else 2)
 if lit:
  rect(im,(x+3,y+3,x+w-3,y+h-3),22);rect(im,(x+4,y+4,x+w-4,y+h//2),23);rect(im,(x+5,y+4,x+w-5,y+6),7)
 else:line(im,[(x+4,y+5),(x+4,y+h-5),(x+12,y+h-5)],4)
 line(im,[(x+w//2,y+1),(x+w//2,y+h-1)],14,2);line(im,[(x+1,y+h//2),(x+w-1,y+h//2)],14,2);rect(im,(x-2,y+h+1,x+w+2,y+h+4),16);line(im,[(x-2,y+h+5),(x+w+3,y+h+5)],13)
def bell(im,x,y,s=1,active=True):
 p=lambda a,b:(x+a*s,y+b*s)
 line(im,[p(9,0),p(9,4)],20, max(1,s));poly(im,[p(6,3),p(12,3),p(16,7),p(16,14),p(19,17),p(19,19),p(0,19),p(0,17),p(3,14),p(3,7)],0)
 poly(im,[p(6,4),p(12,4),p(15,8),p(15,14),p(17,17),p(2,17),p(4,14),p(4,8)],21 if active else 20)
 poly(im,[p(6,6),p(9,5),p(9,15),p(4,15)],23 if active else 21);rect(im,(*p(10,7),*p(12,14)),22 if active else 20);rect(im,(*p(1,17),*p(18,18)),22 if active else 21);rect(im,(*p(8,19),*p(11,21)),20);rect(im,(*p(8,19),*p(9,20)),23 if active else 21)
def prop(kind):
 im=Image.new('RGBA',(32,32));d=ImageDraw.Draw(im)
 if kind==0:bell(im,6,4)
 elif kind==1:
  poly(im,[(9,8),(15,2),(20,6),(18,11),(15,11),(13,8),(5,19),(2,17)],0);poly(im,[(10,8),(15,4),(17,5),(15,8),(14,7),(4,18),(3,17)],6);rect(im,(9,16,12,28),14);poly(im,[(8,13),(22,13),(24,17),(8,17)],20);line(im,[(9,14),(21,14)],22);rect(im,(9,18,10,25),16)
 elif kind==2:
  rect(im,(7,6,24,28),0);planks(im,(8,7,16,20));rect(im,(10,10,21,18),20);rect(im,(11,11,20,17),23);line(im,[(9,5),(9,3),(22,3),(22,5)],21);rect(im,(6,26,25,28),20);line(im,[(14,10),(14,18)],16)
 elif kind==3:
  ellipse(im,(3,3,28,28),20);ellipse(im,(5,5,26,26),22);ellipse(im,(8,8,23,23),20);ellipse(im,(11,11,20,20),1)
  for i in range(8):
   a=i*math.pi/4;xx=round(15+math.cos(a)*12);yy=round(15+math.sin(a)*12);rect(im,(xx-2,yy-2,xx+2,yy+2),21);rect(im,(xx-1,yy-2,xx+1,yy),23)
 elif kind==4:
  rect(im,(8,20,24,29),0);poly(im,[(9,21),(23,21),(21,28),(11,28)],18);line(im,[(9,21),(23,21)],19);fern(im,16,22,.8);line(im,[(16,23),(18,9)],10);rect(im,(16,7,20,10),30);rect(im,(17,6,19,8),7)
 elif kind==5:
  rect(im,(5,6,25,26),0);planks(im,(6,7,19,18));line(im,[(8,8),(22,23),(22,8),(8,23)],16,2);rect(im,(3,7,7,26),14);rect(im,(23,7,27,26),14)
 elif kind==6:
  poly(im,[(5,12),(10,6),(22,6),(27,12),(26,26),(5,26)],0);rect(im,(7,12,24,25),14);rect(im,(8,12,23,20),15);line(im,[(8,12),(24,12)],16);rect(im,(13,15,17,19),21);line(im,[(11,5),(11,3),(21,3),(21,6)],14,2)
 elif kind==7:
  poly(im,[(5,10),(15,4),(27,10),(27,26),(16,29),(5,24)],0);poly(im,[(6,11),(15,7),(15,26),(6,23)],6);poly(im,[(17,7),(26,11),(26,24),(17,27)],7);line(im,[(8,13),(13,11)],4);line(im,[(8,17),(13,15)],4);line(im,[(19,12),(24,14)],18);line(im,[(19,16),(23,18)],18)
 return im
def character(frame_index=0,role=0,facing=1,action=False):
 im=Image.new('RGBA',(32,48));d=ImageDraw.Draw(im);bob=[0,-1,0,0,-1,0][frame_index%6];step=[0,-2,-1,0,2,1][frame_index%6]
 coat=[25,18,10][role];shade=[24,17,9][role];light=[26,19,11][role]
 # Three distinct silhouettes share the same head/body unit and selective edge treatment.
 def R(b,c):rect(im,(b[0],b[1]+bob,b[2],b[3]+bob),c)
 def L(p,c,w=1):line(im,[(x,y+bob) for x,y in p],c,w)
 def G(p,c):poly(im,[(x,y+bob) for x,y in p],c)
 R((9,36,14,43+step),0);R((18,36,23,43-step),0);R((10,35,13,41+step),14);R((19,35,22,41-step),14);R((8,42+step,14,44+step),0);R((18,42-step,25,44-step),0);R((9,42+step,13,42+step),16);R((19,42-step,23,42-step),16)
 G([(10,19),(22,19),(26,33),(23,38),(9,38),(6,33)],0);G([(11,20),(21,20),(24,33),(21,36),(9,35),(8,32)],shade);G([(13,20),(20,20),(21,33),(18,36),(10,34)],coat);G([(12,21),(16,20),(15,32),(11,33)],light);L([(16,22),(16,34)],shade);R((15,27,16,28),21);R((15,32,16,33),22)
 # Short ivory cape and a diagonal leather satchel strap are the protagonist signatures.
 G([(9,18),(21,17),(24,24),(19,27),(15,23),(9,25),(6,23)],14 if role else 6);G([(9,18),(20,18),(21,23),(16,24),(14,21),(8,23)],16 if role else 7);L([(21,21),(11,35)],14,2);L([(21,21),(12,34)],16)
 R((4,25,8,33),shade);R((5,26,6,31),light);R((5,33,8,35),27);R((6,33,8,34),28);R((23,25,26,32),shade);R((24,26,25,30),coat);R((23,32,26,34),28)
 R((5,31,12,38),13);R((6,31,11,36),15);R((6,31,11,32),16);R((8,34,9,35),22)
 G([(10,6),(22,6),(25,10),(24,18),(20,21),(12,19),(8,14)],0);G([(11,7),(21,7),(23,11),(22,17),(19,20),(12,18),(10,14)],27);R((12,10,22,15),28);R((16,16,21,17),28);R((17,18,19,18),19)
 G([(9,6),(12,3),(21,3),(25,7),(24,12),(20,11),(18,8),(17,12),(12,10),(11,16),(8,13)],14 if role else 0);L([(11,6),(15,4),(21,4),(23,6)],16 if role else 3,2)
 R((19 if facing>0 else 12,12,20 if facing>0 else 13,13),0);R((21 if facing>0 else 10,15,22 if facing>0 else 11,15),19)
 if role==1:
  G([(8,4),(12,0),(22,1),(25,7),(28,8),(28,10),(6,10),(5,8)],0);G([(9,5),(13,1),(22,3),(23,7),(26,8),(7,8)],15);L([(10,5),(21,5)],22);R((17,18,22,22),6)
 if role==2:
  R((7,7,10,13),17);G([(10,5),(11,1),(15,2),(17,5)],18);G([(20,5),(23,1),(26,2),(25,8)],18);R((12,5,21,9),19);R((9,17,13,20),7)
 if action:
  hx,hy,tx,ty=[(24,19,21,9),(23,16,18,5),(28,26,29,23),(28,29,29,29),(26,27,28,27),(25,25,28,22)][frame_index%6]
  G([(22,25),(hx,hy),(hx+2,hy+2),(hx+1,hy+5),(23,29)],coat);R((hx-1,hy,hx+1,hy+2),28);L([(hx,hy),(tx,ty)],16,2);R((tx-3,ty-1,tx+2,ty+2),22);R((tx-3,ty-1,tx+1,ty-1),31 if frame_index%6==2 else 23)
 return im
def moth(frame=0):
 im=Image.new('RGBA',(32,32));d=ImageDraw.Draw(im);wing=3+frame%3*2
 poly(im,[(15,12),(6,4+wing),(2,9+wing),(3,18),(12,21),(15,17)],24);poly(im,[(17,12),(26,4+wing),(30,9+wing),(29,18),(20,21),(17,17)],24)
 poly(im,[(14,12),(6,7+wing),(4,10+wing),(5,16),(12,19),(14,17)],26);poly(im,[(18,12),(26,7+wing),(28,10+wing),(27,16),(20,19),(18,17)],26);rect(im,(14,9,17,22),20);rect(im,(15,10,16,19),22);rect(im,(12,11,13,13),23);rect(im,(18,11,19,13),23);line(im,[(15,10),(12,6)],16);line(im,[(17,10),(20,6)],16)
 return im
def save(im,name,scale=1):
 if scale!=1:im=im.resize((im.width*scale,im.height*scale),Image.Resampling.NEAREST)
 im.save(ROOT/name,optimize=True)
def building(im,x,y,w,h,kind=0):
 # Facades read as broad plaster planes; narrow material ramps stay within 3-4 values.
 rect(im,(x+8,y+30,x+w+8,y+h+5),1);bricks(im,(x,y+30,w,h-30),(13,14,15) if kind==1 else (17,18,19),14)
 rect(im,(x+5,y+32,x+w-5,y+h-5),14 if kind==1 else 16)
 # Selective large plaster remnants keep microtexture subordinate to the silhouette.
 poly(im,[(x+8,y+34),(x+w-8,y+34),(x+w-8,y+65),(x+w-17,y+65),(x+w-17,y+72),(x+8,y+72)],15 if kind==1 else 6)
 for xx in [x+4,x+w//2,x+w-6]:rect(im,(xx,y+31,xx+3,y+h-2),13);line(im,[(xx,y+33),(xx,y+h-4)],16)
 rect(im,(x,y+h-7,x+w,y+h),13);line(im,[(x+1,y+h-7),(x+w-1,y+h-7)],16)
 roof(im,x-8,y,w+16,40)
 for xx in [x+14,x+w-39]:window(im,xx,y+48,24,31,kind!=1)
 # Window boxes, bent brackets and individual broad leaf clusters.
 for xx in [x+12,x+w-42]:
  planks(im,(xx,y+82,32,9),True)
  for k in range(5):
   xxx=xx+4+k*6;poly(im,[(xxx,y+83),(xxx-3,y+77),(xxx,y+75),(xxx+3,y+81)],10 if k%2 else 11);rect(im,(xxx,y+75,xxx+2,y+77),30 if kind==0 else 12)
  line(im,[(xx+4,y+91),(xx+7,y+94),(xx+7,y+91)],13);line(im,[(xx+25,y+91),(xx+27,y+94),(xx+27,y+91)],13)
 # Sparse plaster fractures follow edges; exposed masonry uses existing brick groups.
 if w>120:
  line(im,[(x+8,y+45),(x+12,y+45),(x+12,y+52),(x+17,y+55)],15)
  line(im,[(x+w-11,y+64),(x+w-17,y+64),(x+w-17,y+71)],15)
 rect(im,(x+7,y+40,x+w-7,y+42),13);line(im,[(x+8,y+40),(x+w-8,y+40)],16)
 # Door, jamb and shallow step reveal grounded character scale.
 rect(im,(x+w//2-16,y+h-46,x+w//2+17,y+h-1),0);planks(im,(x+w//2-13,y+h-44,27,43));rect(im,(x+w//2-8,y+h-38,x+w//2+8,y+h-23),2);line(im,[(x+w//2-7,y+h-36),(x+w//2+6,y+h-36)],4);rect(im,(x+w//2+8,y+h-16,x+w//2+9,y+h-14),23);rect(im,(x+w//2-20,y+h,x+w//2+23,y+h+3),4);line(im,[(x+w//2-19,y+h),(x+w//2+22,y+h)],6)
 if kind==0:
  rect(im,(x+22,y+85,x+w-22,y+101),0);planks(im,(x+24,y+87,w-47,13),True);text(im,(x+31,y+90),'BELLWRIGHT',7);rect(im,(x+4,y+81,x+7,y+108),20);rect(im,(x+w-7,y+81,x+w-4,y+108),20)
  # Hand-built bay awning, patched fabric and folded edge.
  poly(im,[(x+9,y+105),(x+w-10,y+105),(x+w-2,y+118),(x+2,y+118)],0)
  for j in range(8):
   xx=x+4+j*(w-7)//8;poly(im,[(xx+2,y+106),(xx+(w-7)//8,y+106),(xx+(w-7)//8+2,y+116),(xx,y+116)],25 if j%2 else 6)
  line(im,[(x+3,y+117),(x+w-2,y+117)],0,2)
  # Two small shop display windows are deliberately distinct from the upper windows.
  for xx in [x+12,x+w-49]:
   rect(im,(xx,y+123,xx+35,y+h-10),0);rect(im,(xx+2,y+125,xx+33,y+h-12),2);rect(im,(xx+3,y+126,xx+31,y+132),3)
   line(im,[(xx+5,y+127),(xx+17,y+138)],4);line(im,[(xx+10,y+126),(xx+25,y+141)],3)
   rect(im,(xx+2,y+h-18,xx+32,y+h-16),14);line(im,[(xx+3,y+h-18),(xx+31,y+h-18)],16)
   bell(im,xx+4,y+h-40,1,True)
   rect(im,(xx+24,y+h-30,xx+28,y+h-19),20);line(im,[(xx+25,y+h-29),(xx+25,y+h-20)],22)
   rect(im,(xx-1,y+h-10,xx+37,y+h-8),16)
  # Patched cloth keeps a clear folded edge, with one intentionally visible repair.
  rect(im,(x+25,y+109,x+33,y+114),24);line(im,[(x+26,y+109),(x+32,y+109)],26)
  for xx in [x+27,x+w-26]:
   line(im,[(xx,y+119),(xx,y+123),(xx+3,y+123)],13)
 # Modular corner stonework changes the facade silhouette and grounds the wall.
 for j in range(5):
  yy=y+h-35+j*7
  for xx in [x-2,x+w-5]:rect(im,(xx,yy,xx+7,yy+5),3);line(im,[(xx,yy),(xx+6,yy)],4)
 vine(im,x+w-4,y+37,16);vine(im,x+3,y+42,9)
 # Brick chimney, copper flashing, soot cap.
 bricks(im,(x+w-34,y-12,16,31),(13,17,18),8);rect(im,(x+w-37,y-14,x+w-16,y-11),0);line(im,[(x+w-36,y-14),(x+w-17,y-14)],4)
def scene():
 im=Image.new('RGB',(640,360),P[3]);d=ImageDraw.Draw(im)
 # Three deliberate depth bands, no fog blur or anti-aliasing.
 rect(im,(0,0,639,55),4);rect(im,(0,56,639,115),3);rect(im,(0,116,639,224),2)
 for band,(base,col) in enumerate([(93,3),(119,2),(149,1)]):
  for i in range(11):
   x=i*67-15+(band%2)*23;h=22+(i*19+band*11)%31;poly(im,[(x,base),(x,base-h+8),(x+14,base-h),(x+45,base-h),(x+58,base-h+9),(x+58,base)],col)
   if band==0:
    for xx in range(x+9,x+44,12):rect(im,(xx,base-h+14,xx+3,base-h+20),4)
 # Towering waterworks and thin aqueduct tie the distant city into this original harbour.
 rect(im,(435,11,457,112),2);poly(im,[(429,13),(446,1),(463,13)],3);line(im,[(446,0),(446,5)],6);rect(im,(441,33,450,47),3)
 for xx in range(2,640,58):
  rect(im,(xx,104,xx+5,164),3);line(im,[(xx,106),(xx+5,106)],4);poly(im,[(xx,109),(xx+7,99),(xx+45,99),(xx+54,109)],3)
 line(im,[(0,99),(639,99)],4,2);line(im,[(0,101),(639,101)],2,2)
 # Main quay has wide light-value groups, each slab built from 2-3 connected clusters.
 poly(im,[(0,204),(640,204),(640,281),(0,281)],3)
 for row in range(10):
  yy=207+row*8
  for i in range(36):
   xx=i*20-(row%2)*10;col=4 if (i+row*2)%7 else 3;rect(im,(xx+1,yy,xx+18,yy+6),col);line(im,[(xx+2,yy),(xx+12,yy)],5 if (i+row)%8==0 else col)
 # Wet stone patches span several slabs; each has an intelligible border and reflection.
 for x,y,w in [(63,260,35),(214,246,28),(362,264,40),(500,259,31),(23,235,21)]:
  poly(im,[(x,y),(x+6,y-2),(x+w-5,y-2),(x+w,y),(x+w-2,y+3),(x+3,y+4)],3);line(im,[(x+6,y),(x+w-7,y)],5);line(im,[(x+12,y+2),(x+w-10,y+2)],4)
 # Foundation, buttresses and canal retaining wall.
 bricks(im,(0,278,640,33),(1,2,3),16);rect(im,(0,277,639,280),5);line(im,[(0,281),(639,281)],0)
 for xx in range(0,640,69):rect(im,(xx,281,xx+9,315),1);line(im,[(xx+1,283),(xx+1,307)],3)
 rect(im,(0,311,639,342),2)
 # Long water bands form clustered reflections; fixed motifs avoid grain.
 for row in range(7):
  yy=313+row*4
  for i in range(18):
   xx=(i*47+row*19)%640;w=8+(i*3+row)%20;line(im,[(xx,yy),(xx+w,yy)],3 if (i+row)%3 else 4)
 for x in [99,320,548]:
  for j in range(7):rect(im,(x-j%3*4,314+j*4,x+11+(j%3)*3,315+j*4),21 if j%3 else 16)
 # Architecture: restrained sky silhouettes, high-detail playable facades.
 building(im,53,87,140,128,1);building(im,250,69,161,153,0)
 building(im,438,115,101,99,1)
 # Bell tower, glass cage and narrow silhouette with signature copper crown.
 bricks(im,(548,82,58,143),(13,14,15),12);rect(im,(544,78,609,85),0);rect(im,(545,77,608,79),22)
 poly(im,[(543,75),(577,30),(612,75)],0);poly(im,[(547,73),(577,35),(607,73)],21)
 for j in range(5):line(im,[(554+j*5,71-j*6),(603-j*4,71-j*6)],22 if j%2 else 20)
 rect(im,(570,21,583,34),20);rect(im,(572,20,580,28),22);line(im,[(576,12),(576,21)],22);poly(im,[(576,11),(588,16),(576,18)],23)
 rect(im,(553,89,601,153),0);rect(im,(556,91,598,150),2);rect(im,(557,92,560,146),4);line(im,[(559,94),(591,144)],3);bell(im,559,101,2)
 for xx in [548,599]:rect(im,(xx,83,xx+5,158),20);line(im,[(xx,84),(xx,155)],22)
 rect(im,(546,155,607,160),20);line(im,[(547,155),(606,155)],22);window(im,563,173,25,30,False);vine(im,604,164,13)
 # Visible pipes share stepped brass highlights with tool icons and bells.
 for xx,yy,h in [(235,139,75),(420,151,74),(26,173,53)]:
  rect(im,(xx,yy,xx+5,yy+h),0);rect(im,(xx+1,yy+1,xx+3,yy+h),20);line(im,[(xx+1,yy+2),(xx+1,yy+h-1)],22)
  for y in range(yy+6,yy+h,18):rect(im,(xx-1,y,xx+6,y+3),20);line(im,[(xx,y),(xx+5,y)],21)
 # Small workshop object group; props retain the same atlas pixels in all views.
 placements=[(5,215,216),(6,220,239),(4,278,233),(4,394,232),(2,420,229),(5,508,224),(4,520,251),(4,39,243),(5,100,229)]
 for k,x,y in placements:im.paste(prop(k),(x,y),prop(k))
 # Market counter, metalwork, hanging bell sign and quiet story clues.
 planks(im,(82,205,112,28),True);rect(im,(80,202,195,206),13);line(im,[(81,202),(194,202)],16)
 for i in range(5):bell(im,91+i*18,182,1,i%2==0)
 # A handwheel and covered shelf supply useful, coherent material silhouettes.
 ellipse(im,(205,190,228,213),0);ellipse(im,(207,192,226,211),20);ellipse(im,(210,195,223,208),13)
 for j in range(6):a=j*math.pi/3;line(im,[(216,202),(216+math.cos(a)*8,202+math.sin(a)*8)],21)
 ellipse(im,(213,199,219,205),22);rect(im,(214,215,219,227),14)
 planks(im,(477,190,42,33),True);rect(im,(476,188,520,191),13);line(im,[(478,188),(519,188)],16)
 for j in range(4):
  xx=480+j*9;rect(im,(xx,194,xx+5,203),[18,25,6,20][j]);rect(im,(xx,194,xx+5,195),[19,26,7,22][j]);rect(im,(xx,207,xx+5,216),[20,14,25,18][j])
 # Sconce repeats the exact lantern construction used by the item atlas.
 for xx,yy in [(256,166),(403,166),(59,174)]:
  line(im,[(xx,yy-12),(xx-5,yy-12),(xx-5,yy-6)],20);pr=prop(2);im.paste(pr,(xx-20,yy-10),pr)
 line(im,[(250,130),(220,130),(220,145)],20,2);frame(im,(205,144,32,35),2,20);bell(im,211,149)
 # Clothesline repeats cloth seams, never arbitrary speckles.
 line(im,[(193,135),(222,140),(251,133)],14)
 for xx,col in [(198,6),(212,25),(228,30)]:poly(im,[(xx,138),(xx+10,138),(xx+11,154),(xx+2,156)],col);line(im,[(xx+3,140),(xx+3,152)],5 if col==6 else 24)
 # Plant masses are grouped into broad shade shapes with readable leaf fans.
 for x,y,s in [(12,233,2),(24,226,1.6),(45,224,1),(201,220,1.1),(433,226,1),(617,245,2),(632,224,2),(13,279,1),(528,279,1)]:fern(im,x,y,s)
 # Bridge spans the canal; its 8px planks imply perspective through structured spacing.
 planks(im,(418,279,60,65),True);rect(im,(416,277,421,345),13);rect(im,(475,277,480,345),13);line(im,[(417,278),(417,342)],16);line(im,[(476,278),(476,342)],16)
 for xx in [417,476]:
  for yy in [278,309,341]:rect(im,(xx-2,yy-13,xx+4,yy),0);rect(im,(xx-1,yy-13,xx+3,yy-11),16);rect(im,(xx,yy-10,xx+2,yy),14)
 # Foreground density is deliberately higher than rear city density.
 bricks(im,(0,342,640,18),(0,13,14),18)
 for x,y,s in [(0,355,2.7),(25,360,2.7),(55,365,2.4),(85,362,2),(610,360,2.6),(640,350,3)]:fern(im,x,y,s,(8,9,10))
 for xx in [145,220,349,552]:rect(im,(xx,263,xx+3,279),0);rect(im,(xx,262,xx+3,263),16)
 line(im,[(145,269),(220,269)],14,2);line(im,[(349,269),(405,269)],14,2);line(im,[(487,269),(552,269)],14,2)
 return im
def atlas_and_boards():
 save(prop(0),'icon.png')
 font=Image.new('RGBA',(96,32));chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.:/+>!? '
 for i,ch in enumerate(chars):text(font,((i%16)*6,(i//16)*8),ch,7)
 save(font,'font.png');(ROOT/'font.json').write_text(json.dumps({'chars':chars,'cell':[6,8],'columns':16}),encoding='utf-8')
 chars_im=Image.new('RGBA',(192,192))
 for row in range(4):
  for f in range(6):chars_im.paste(character(f,min(row,2),1,row==3),(f*32,row*48))
 save(chars_im,'characters.png');props=Image.new('RGBA',(256,32))
 for i in range(8):props.paste(prop(i),(i*32,0))
 save(props,'props.png');mot=Image.new('RGBA',(128,32))
 for i in range(4):mot.paste(moth(i),(i*32,0))
 save(mot,'moth.png')
 tiles=Image.new('RGB',(128,64),P[0])
 for i in range(8):
  tile=Image.new('RGB',(32,32),P[0])
  if i==0:bricks(tile,(0,0,32,32),(17,18,19),12)
  elif i==1:planks(tile,(0,0,32,32))
  elif i==2:
   rect(tile,(0,0,31,31),2)
   for j in range(5):line(tile,[(2+(j%2)*6,j*7),(19+(j%3)*5,j*7)],3);line(tile,[(11,j*7+1),(17,j*7+1)],4)
  elif i==3:
   rect(tile,(0,0,31,31),20)
   for j in range(4):rect(tile,(j*8,0,j*8+1,31),21);line(tile,[(j*8+2,1),(j*8+2,30)],22);rect(tile,(j*8+3,6,j*8+4,8),23)
  elif i==4:
   rect(tile,(0,0,31,31),2);line(tile,[(2,3),(24,25)],3,3);line(tile,[(8,0),(30,22)],4);rect(tile,(0,0,31,1),20);rect(tile,(0,0,1,31),21)
  elif i==5:
   rect(tile,(0,0,31,31),25)
   for j in range(4):rect(tile,(j*9,0,j*9+2,31),24);line(tile,[(j*9+3,1),(j*9+3,30)],26)
   line(tile,[(2,27),(29,27)],6);line(tile,[(2,29),(29,29)],24)
  elif i==6:
   rect(tile,(0,0,31,31),8);fern(tile,16,35,1.8);fern(tile,25,23,.7)
  else:bricks(tile,(0,0,32,32),(2,3,4),16)
  tiles.paste(tile,((i%4)*32,(i//4)*32))
 save(tiles,'materials.png')
 # A real animation strip: anticipation, contact, six-pixel arc, restrained recovery.
 effects=Image.new('RGBA',(192,48))
 for f in range(6):
  x=f*32;rad=[3,6,11,15,12,7][f];col=[21,22,31,23,22,21][f]
  if f>0:
   pts=[]
   for j in range(15):a=-2.5+j/14*2.6;pts.append((x+16+math.cos(a)*rad,24+math.sin(a)*rad))
   line(effects,pts,col,1 if f>3 else 2)
  if f in [1,2,3]:
   for i in range(4):xx=x+16+[-8,9,-2,6][i]*(f/2);yy=22+[-9,-6,7,8][i]*(f/2);rect(effects,(xx,yy,xx+1,yy+1),31 if f==2 else 22)
 save(effects,'effects.png')
 action_board=Image.new('RGB',(640,200),P[0]);text(action_board,(24,20),'MIRELIGHT / ACTION READABILITY',7);text(action_board,(24,36),'PREPARE - WIND UP - CONTACT - FOLLOW THROUGH - RECOVER - SETTLE',4)
 for i,name in enumerate(['PREPARE','WIND UP','CONTACT','FOLLOW','RECOVER','SETTLE']):
  sp=character(i,0,1,True).resize((64,96),Image.Resampling.NEAREST);action_board.paste(sp,(28+i*102,60),sp);text(action_board,(26+i*102,165),name,22 if i==2 else 6)
 text(action_board,(24,186),'CONTACT ACCENT IS 2PX / THE FACE AND FOOTING STAY VISIBLE',4);save(action_board,'action-study.png',2)
 # GIF previews use the very same sprite frames and exact palette.
 gif_palette=[v for _,h in COLORS for v in bytes.fromhex(h[1:])]+[0,0,0]*224
 for filename,is_action in [('iona-walk.gif',False),('iona-strike.gif',True)]:
  fs=[]
  for i in range(6):
   rgba=character(i,0,1,is_action).resize((96,144),Image.Resampling.NEAREST);rgb_to_index={tuple(bytes.fromhex(h[1:])):j for j,(_,h) in enumerate(COLORS)};out=Image.new('P',rgba.size,32);out.putpalette(gif_palette);out.putdata([rgb_to_index[p[:3]] if p[3] else 32 for p in rgba.get_flattened_data()]);fs.append(out)
  fs[0].save(ROOT/filename,save_all=True,append_images=fs[1:],duration=120,loop=0,transparency=32,disposal=2,optimize=False)
 # Character silhouette checks, exact-size prop samples and value-group explanations.
 board=Image.new('RGB',(640,360),P[0]);text(board,(22,19),'MIRELIGHT / SHAPE LANGUAGE',7);text(board,(22,33),'32 X 48 FRAMES - SAME PIXELS IN EVERY VIEW',4)
 for r,(title,caption) in enumerate([('IONA / BELLWRIGHT','IVORY CAPE - INDIGO - BRASS HOOK'),('ORREN / FERRY KEEPER','LOW HAT - BROAD SHOULDERS - OAK'),('TAMSIN / TINKER','TWIN TUFTS - MOSS COAT')]):
  y=65+r*87;text(board,(24,y),title,22);text(board,(24,y+14),caption,5)
  for f in range(6):board.paste(character(f,r),(355+f*40,y-4),character(f,r))
  sil=character(0,r);silcolor=Image.new('RGBA',sil.size,P[6]);silcolor.putalpha(sil.getchannel('A'));board.paste(silcolor,(290,y-4),silcolor)
 text(board,(24,332),'SELECTIVE DARK EDGES / NO SOFT SHADOW / 3-4 VALUE RAMPS',4)
 save(board,'character-study.png',2)
 board=Image.new('RGB',(640,360),P[0]);text(board,(22,18),'MIRELIGHT / MATERIAL AND OBJECT LIBRARY',7)
 labels=['FIRED BRICK','SALT OAK','CANAL WATER','AGED BRASS','WET GLASS','WOVEN CLOTH','FERN MASS','QUAY STONE']
 for i,name in enumerate(labels):
  x=24+i%4*154;y=54+i//4*108;tile=tiles.crop(((i%4)*32,(i//4)*32,(i%4+1)*32,(i//4+1)*32));board.paste(tile.resize((64,64),Image.Resampling.NEAREST),(x,y));text(board,(x,y+73),name,6)
 for i in range(8):pr=prop(i);board.paste(pr,(25+i*75,284),pr)
 text(board,(24,334),'SHARED 1PX GLINTS / STRUCTURE BEFORE TEXTURE / NO RANDOM NOISE',4);save(board,'material-study.png',2)
 board=Image.new('RGB',(640,248),P[0]);text(board,(22,18),'MIRELIGHT / MASTER PALETTE / 32 COLOURS',7)
 for i,(name,color) in enumerate(COLORS):
  x=22+(i%8)*77;y=48+(i//8)*45;rect(board,(x,y,x+59,y+20),i);text(board,(x,y+26),color[1:],5)
 text(board,(22,232),'BLUE-GREEN SPACE / EARTH MATERIALS / IVORY HERO / BRASS INTERACTION',4);save(board,'palette-study.png',2)
 (ROOT/'palette.json').write_text(json.dumps({'name':'Mirelight32','colors':[{'index':i,'name':n,'hex':h} for i,(n,h) in enumerate(COLORS)],'ramps':{'masonry':[17,18,19],'oak':[13,14,15,16],'brass':[20,21,22,23],'cloth':[24,25,26],'leaf':[8,9,10,11,12],'water':[1,2,3,4]},'light':'upper left','glintBudget':'31 is reserved for contact, UI focus and tiny glints'},indent=2),encoding='utf-8')
def composite(scene_im,positions=True):
 im=scene_im.copy()
 for bx,by in [(133,241),(330,239),(459,247)]:
  spr=prop(0);im.paste(spr,(bx-16,by-28),spr)
 for role,x,y in [(1,185,240),(2,492,244),(0,306,251)]:
  spr=character(0,role);im.paste(spr,(x-16,y-44),spr)
 spr=moth();im.paste(spr,(324,190),spr)
 return im
def ui(im):
 im=im.copy();frame(im,(12,12,144,31),1,20);pr=prop(0);im.paste(pr,(15,12),pr);text(im,(50,19),'RAIN QUARTER',7);text(im,(50,30),'BELLS 0 / 3',4)
 # Matching tile edges and icon assets are reused in the inventory and dialogue.
 frame(im,(14,304,230,44),1,20);text(im,(25,313),'ORREN',22);text(im,(25,327),'THE THIRD BELL HAS LOST ITS VOICE.',6)
 for i in range(3):frame(im,(506+i*40,310,36,36),1,22 if i==0 else 3);pr=prop(i);im.paste(pr,(508+i*40,312),pr)
 return im
def main():
 atlas_and_boards();base=scene();save(base,'quay-base.png');world=composite(base);save(world,'far-native.png');save(world,'far-view.png',2)
 # Near is an exact 2x crop: it cannot quietly invent larger pixels or extra texture.
 crop=world.crop((192,102,512,282));save(crop,'near-native.png');save(crop,'near-view.png',4)
 save(ui(world),'interface-native.png');save(ui(world),'interface-study.png',2)
 # Palette-index remapping keeps dusk strictly inside the same 32-colour language.
 mapping={7:6,6:5,5:4,4:3,3:2,16:15,15:14,19:18,18:17,12:11,11:10}
 rgbmap={tuple(bytes.fromhex(P[k][1:])):tuple(bytes.fromhex(P[v][1:])) for k,v in mapping.items()}
 dusk=base.copy();dusk.putdata([rgbmap.get(px,px) for px in dusk.get_flattened_data()]);save(dusk,'quay-dusk.png');save(composite(dusk),'dusk-study.png',2)
 # Unified review board is composed from the same actual reusable assets.
 board=Image.new('RGB',(960,720),P[0]);text(board,(24,19),'MIRELIGHT',7,3);text(board,(25,51),'THE BELLWRIGHT / ORIGINAL PIXEL WORLD / ART DIRECTION 01',4)
 board.paste(world,(20,80));text(board,(20,451),'01 / RAIN QUAY - NATIVE 640 X 360',22)
 board.paste(world.crop((285,180,425,259)).resize((280,158),Image.Resampling.NEAREST),(680,80))
 text(board,(680,249),'02 / EXACT CROP',22);text(board,(680,264),'RENDER IN INTEGER ZOOMS',4)
 # Board close-up is an exact native crop enlarged by 2x.
 for i in range(3):spr=character(0,i).resize((64,96),Image.Resampling.NEAREST);board.paste(spr,(688+i*82,290),spr)
 text(board,(682,399),'03 / CAST AND TOOL SCALE',22)
 for i in range(8):pr=prop(i);board.paste(pr,(690+i%4*61,422+i//4*40),pr)
 for i in range(8):tile=Image.open(ROOT/'materials.png').crop(((i%4)*32,(i//4)*32,(i%4+1)*32,(i//4+1)*32));board.paste(tile.resize((64,64),Image.Resampling.NEAREST),(24+i*78,482))
 text(board,(24,556),'04 / BRICK - OAK - WATER - BRASS - GLASS - CLOTH - FERN - STONE',4)
 for i in range(32):x=25+i%16*39;y=582+i//16*22;rect(board,(x,y,x+31,y+15),i)
 text(board,(25,636),'05 / 32 COLOURS - ONE LIGHT DIRECTION - SHARED 1PX MATERIAL EDGES',4)
 text(board,(25,666),'16PX TILES / 32 X 48 ACTORS / 32PX PROPS / 6-FRAME ACTIONS',6)
 text(board,(25,687),'BACKGROUND DENSITY 1 : MIDGROUND 2 : FOREGROUND 4',4);save(board,'art-direction-board.png',2)
 assets={}
 for file in sorted(ROOT.glob('*.png')):
  im=Image.open(file);assets[file.name]={'width':im.width,'height':im.height,'sha256':hashlib.sha256(file.read_bytes()).hexdigest()}
 (ROOT/'assets.json').write_text(json.dumps({'version':1,'original':True,'palette':'palette.json','spriteAnchor':[16,44],'characters':{'file':'characters.png','cell':[32,48],'columns':6,'rows':['Iona walk','Orren walk','Tamsin walk','Iona strike']},'props':{'file':'props.png','cell':[32,32],'names':['bell','tools','lantern','gear','fern pot','crate','satchel','field book']},'moth':{'file':'moth.png','cell':[32,32],'frames':4},'effects':{'file':'effects.png','cell':[32,48],'frames':6},'walkBand':[226,270],'bells':[{'x':133,'y':241,'note':0},{'x':330,'y':239,'note':2},{'x':459,'y':247,'note':4}],'files':assets},indent=2),encoding='utf-8')
 print('Built',len(assets),'original pixel PNGs. 32-colour palette. No imported art.')
if __name__=='__main__':main()

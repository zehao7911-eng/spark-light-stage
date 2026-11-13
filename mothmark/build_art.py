"""MOTHMARK: original pixel-card art direction. Rebuild with Python + Pillow."""
from PIL import Image, ImageDraw
from pathlib import Path
import json, hashlib
ROOT=Path(__file__).parent
P=['#171522','#292336','#403149','#61465a','#8b6470','#bd8e87','#e2bba0','#f5dfb5','#fff1cf','#664c3e','#987147','#c29b58','#ebc77c','#243d40','#3d6660','#6e9c83','#a7c9a0','#d9e6b5','#4e476d','#78658d','#a58cb0','#d5b2cd','#9c535f','#df8290']
N=['Night','Velvet','Plum','Mulberry','Dust rose','Clay','Parchment shade','Parchment','Ivory','Umber','Brass shade','Brass','Gold','Pine ink','Patina','Sage','Mint','Pollen','Indigo','Lilac shade','Lilac','Petal','Seal','Coral']
FONT={
'A':['01110','10001','11111','10001','10001'],'B':['11110','10001','11110','10001','11110'],'C':['01111','10000','10000','10000','01111'],'D':['11110','10001','10001','10001','11110'],'E':['11111','10000','11110','10000','11111'],'F':['11111','10000','11110','10000','10000'],'G':['01111','10000','10111','10001','01110'],'H':['10001','10001','11111','10001','10001'],'I':['111','010','010','010','111'],'J':['00111','00010','00010','10010','01100'],'K':['10001','10010','11100','10010','10001'],'L':['10000','10000','10000','10000','11111'],'M':['10001','11011','10101','10001','10001'],'N':['10001','11001','10101','10011','10001'],'O':['01110','10001','10001','10001','01110'],'P':['11110','10001','11110','10000','10000'],'Q':['01110','10001','10101','10010','01101'],'R':['11110','10001','11110','10010','10001'],'S':['01111','10000','01110','00001','11110'],'T':['11111','00100','00100','00100','00100'],'U':['10001','10001','10001','10001','01110'],'V':['10001','10001','10001','01010','00100'],'W':['10001','10001','10101','11011','10001'],'X':['10001','01010','00100','01010','10001'],'Y':['10001','01010','00100','00100','00100'],'Z':['11111','00010','00100','01000','11111'],
'0':['01110','10011','10101','11001','01110'],'1':['010','110','010','010','111'],'2':['11110','00001','01110','10000','11111'],'3':['11110','00001','01110','00001','11110'],'4':['10010','10010','11111','00010','00010'],'5':['11111','10000','11110','00001','11110'],'6':['01111','10000','11110','10001','01110'],'7':['11111','00001','00010','00100','00100'],'8':['01110','10001','01110','10001','01110'],'9':['01110','10001','01111','00001','11110'],'/':['00001','00010','00100','01000','10000'],':':['0','1','0','1','0'],'-':['000','000','111','000','000'],'.':['0','0','0','0','1'],'!':['1','1','1','0','1'],'+':['000','010','111','010','000'],'?':['1110','0001','0110','0000','0100'],'>':['100','010','001','010','100']}
def image(w,h,c=0): return Image.new('RGBA',(w,h),P[c] if c is not None else (0,0,0,0))
def box(im,x,y,w,h,c):
 if w>0 and h>0: ImageDraw.Draw(im).rectangle((x,y,x+w-1,y+h-1),fill=P[c])
def poly(im,pts,c): ImageDraw.Draw(im).polygon(pts,fill=P[c])
def line(im,pts,c,w=1): ImageDraw.Draw(im).line(pts,fill=P[c],width=w)
def text(im,s,x,y,c=7):
 for ch in s.upper():
  for yy,row in enumerate(FONT.get(ch,[])):
   for xx,v in enumerate(row):
    if v=='1': box(im,x+xx,y+yy,1,1,c)
  x+=6

def border(im,x,y,w,h,c=11):
 box(im,x,y,w,h,c);box(im,x+1,y+1,w-2,h-2,0)
def paste(im,a,x,y): im.alpha_composite(a,(x,y))
def save(im,n): im.save(ROOT/n)
def enlarged(im,k): return im.resize((im.width*k,im.height*k),Image.Resampling.NEAREST)
def star(im,x,y,c=12):
 box(im,x-2,y,5,1,c);box(im,x,y-2,1,5,c)
def moth(im,x,y,kind=0,phase=0):
 light,mid,shade,dark=[(17,16,15,14),(21,20,19,18),(8,12,11,9)][kind%3]
 spread=[0,-1,-2,-1][phase%4]
 for side in [-1,1]:
  def pt(dx,dy):return (x+side*dx,y+dy)
  poly(im,[pt(1,1),pt(7,-7),pt(16+spread,-12),pt(22+spread,-12),pt(19,-3),pt(15,2),pt(11,4),pt(16,10),pt(12,13),pt(10,16),pt(6,13),pt(2,8)],13 if kind==0 else 0)
  poly(im,[pt(2,2),pt(8,-6),pt(19+spread,-10),pt(18,-3),pt(13,2),pt(9,4),pt(14,10),pt(10,14),pt(6,11)],dark)
  poly(im,[pt(3,2),pt(9,-4),pt(17+spread,-8),pt(15,-1),pt(9,3),pt(12,9),pt(9,11),pt(5,8)],shade)
  poly(im,[pt(4,1),pt(9,-3),pt(16+spread,-6),pt(13,-1),pt(8,3),pt(10,8),pt(8,9),pt(5,6)],mid)
  line(im,[pt(3,1),pt(9,-5),pt(18+spread,-9)],light)
  line(im,[pt(4,3),pt(8,5),pt(11,9)],dark)
  # The eye marks are stepped rings, with a single lit pixel.
  poly(im,[pt(11,-5),pt(14,-4),pt(14,-1),pt(12,1),pt(9,-1),pt(9,-3)],dark)
  box(im,x+side*12-1,y-3,2,2,light)
  for dx,dy in [(17,-5),(15,-1),(12,8),(9,12)]:box(im,x+side*dx,y+dy,1,1,light)
  line(im,[pt(2,5),pt(5,9),pt(8,11)],light)
 box(im,x-1,y-5,3,16,9);box(im,x,y-4,1,15,11)
 for yy in [-2,2,6,10]:box(im,x,y+yy,1,1,12)
 box(im,x-1,y-5,3,2,12);box(im,x,y-6,1,1,8)
 line(im,[(x,y-5),(x-4,y-10),(x-6,y-10)],11);line(im,[(x+1,y-5),(x+4,y-10),(x+6,y-10)],11)


def keeper(im,x,y,k=0,solid=False):
 c=lambda v: 8 if solid else v
 # 24 x 32 silhouette, head / hat / collar / coat / two boots.
 poly(im,[(x+5,y+8),(x+12,y if k else y+2),(x+16,y+2),(x+19,y+8)],c(18 if k else 14))
 box(im,x+3,y+8,19,3,c(19 if k else 15));box(im,x+8,y+11,10,7,c(6))
 box(im,x+10,y+13,1,2,c(0));box(im,x+15,y+13,1,2,c(0))
 box(im,x+7,y+18,12,3,c(7));poly(im,[(x+7,y+20),(x+18,y+20),(x+22,y+29),(x+3,y+29)],c(18 if k else 13))
 box(im,x+7,y+29,5,3,c(9));box(im,x+15,y+29,5,3,c(9));box(im,x+11,y+22,2,6,c(12))
 box(im,x+1,y+21,4,5,c(6));box(im,x+21,y+22,3,5,c(6))
 if not solid:box(im,x+18,y+22,4,5,11);box(im,x+19,y+23,2,3,17)

 if not solid:
  coat,fold,trim=(18,19,20) if k else (13,14,15)
  line(im,[(x+7,y+22),(x+5,y+27),(x+9,y+27)],fold)
  line(im,[(x+17,y+22),(x+19,y+28),(x+15,y+28)],fold)
  box(im,x+8,y+11,2,5,9);box(im,x+17,y+11,1,5,9)
  box(im,x+10,y+17,6,1,5);box(im,x+12,y+16,2,1,5)
  box(im,x+6,y+8,13,1,trim);box(im,x+9,y+5,5,1,fold)
  box(im,x+8,y+19,3,2,8);box(im,x+14,y+19,3,2,7)
  box(im,x+12,y+23,1,1,8);box(im,x+12,y+26,1,1,8)
  box(im,x+8,y+30,3,1,10);box(im,x+16,y+30,3,1,10)
  box(im,x+18,y+22,4,1,12);box(im,x+18,y+26,4,1,10)

def prop(im,x,y,k=0):
 if k==0: # lantern
  border(im,x+8,y,8,5,11);box(im,x+5,y+5,14,2,12);border(im,x+6,y+7,12,15,11);box(im,x+8,y+9,8,10,14);box(im,x+10,y+11,4,6,17);box(im,x+5,y+22,14,3,10)
 elif k==1: # specimen jar
  box(im,x+5,y+2,15,4,11);border(im,x+4,y+7,17,18,14);box(im,x+6,y+9,13,13,13);box(im,x+7,y+9,2,10,16);poly(im,[(x+12,y+15),(x+8,y+11),(x+8,y+18),(x+12,y+16),(x+17,y+18),(x+17,y+11)],16);box(im,x+12,y+12,1,8,12);box(im,x+6,y+24,13,2,15)
 elif k==2: # magnifier
  poly(im,[(x+2,y+3),(x+13,y+3),(x+17,y+7),(x+17,y+16),(x+13,y+20),(x+2,y+20),(x-2,y+16),(x-2,y+7)],11)
  box(im,x+2,y+7,11,9,14);box(im,x+3,y+8,2,5,17);line(im,[(x+14,y+18),(x+22,y+26)],9,4);line(im,[(x+15,y+18),(x+23,y+26)],12)
 elif k==3: # album
  box(im,x+1,y+2,22,25,9);box(im,x+3,y+2,19,23,18);box(im,x+5,y+4,15,19,19);box(im,x+9,y+10,7,7,11);star(im,x+12,y+13,17);box(im,x+3,y+25,19,2,7)
 else: # sprig
  line(im,[(x+12,y+27),(x+12,y+4)],15,2)
  for yy in [6,12,18]:
   poly(im,[(x+12,y+yy+4),(x+3,y+yy),(x+4,y+yy-3),(x+10,y+yy-1)],14)
   poly(im,[(x+13,y+yy+2),(x+22,y+yy-3),(x+19,y+yy-5),(x+14,y+yy-3)],16)

def icon(k):
 a=image(16,16,None)
 if k==0:
  poly(a,[(8,1),(14,5),(14,11),(8,15),(2,11),(2,5)],11);box(a,5,5,6,6,12);box(a,7,6,2,4,9)
 elif k==1:
  poly(a,[(2,2),(6,2),(8,5),(10,2),(14,2),(14,9),(8,14),(2,9)],23)
 elif k==2:star(a,8,8,17);box(a,3,3,2,2,15);box(a,12,11,2,2,15)
 elif k==3:
  border(a,4,7,9,8,11);border(a,6,2,5,7,11);box(a,7,10,3,2,0)
 elif k==4:
  poly(a,[(2,7),(6,12),(14,3),(14,7),(6,15),(2,11)],16)
 else:
  box(a,3,3,10,10,19);box(a,5,5,6,6,21);box(a,7,1,2,14,20);box(a,1,7,14,2,20)
 if k==0:
  line(a,[(4,5),(4,9)],8);box(a,6,3,4,1,8);box(a,6,12,4,1,10)
 if k==1:
  box(a,3,3,2,2,21);box(a,11,8,2,2,22)
 if k==3:
  box(a,5,8,1,5,12);box(a,7,3,2,1,7)
 if k==5:
  box(a,3,3,2,2,21);box(a,11,11,2,2,18)
 return a

TITLES=['MINTWING','DUSKKEEP','LANTERN','FIELD JAR','NIGHTGLASS','HERBARIUM','MOON SEAL','VIOLETWING']
TYPES=['SPECIMEN','ARCHIVIST','TOOL','VESSEL','TOOL','ARCHIVE','EVENT','SPECIMEN']
def engraving(im,x,y,side=1,c=11):
 line(im,[(x,y+6),(x,y),(x+side*6,y)],c)
 line(im,[(x+side*2,y+5),(x+side*2,y+2),(x+side*5,y+2)],c)
 box(im,x+side*5,y+5,1,1,c)

def illustration(a,k,phase):
 # Architecture stays behind the subject; sparse clusters replace texture noise.
 box(a,6,18,60,53,1)
 poly(a,[(11,61),(11,32),(17,24),(24,20),(48,20),(55,24),(61,32),(61,61)],3)
 poly(a,[(13,60),(13,33),(19,26),(25,22),(47,22),(53,26),(59,33),(59,60)],2)
 poly(a,[(16,59),(16,34),(21,29),(26,26),(46,26),(51,29),(56,34),(56,59)],0)
 # Quiet leaf engravings in the two upper corners.
 for side in [-1,1]:
  xx=36+side*23
  line(a,[(xx,57),(xx-side*2,48),(xx,39)],4)
  for yy in [43,49,54]:poly(a,[(xx,yy),(xx+side*3,yy-3),(xx+side*3,yy),(xx,yy+2)],3)
 box(a,13,62,46,3,3);box(a,17,61,38,1,4);box(a,19,65,34,1,1)
 if k in [0,7]:
  # Small distant constellation, kept behind the specimen.
  for xx,yy in [(27,29),(43,28),(49,34),(23,34)]:box(a,xx,yy,1,1,4)
  moth(a,36,44,0 if k==0 else 1,phase)
 elif k==1:
  box(a,25,58,25,3,1);keeper(a,24,28,1)
 elif k==2:
  # Suspended lantern: curved-by-steps handle, machined cap, flame and reflection.
  line(a,[(32,28),(32,24),(40,24),(40,28)],10)
  line(a,[(33,27),(33,25),(39,25),(39,27)],12)
  poly(a,[(25,32),(29,28),(43,28),(47,32)],10);box(a,26,32,20,2,12)
  border(a,27,34,18,24,11);box(a,29,35,14,21,13)
  box(a,30,36,1,16,15);box(a,41,36,1,18,14)
  poly(a,[(35,51),(33,47),(36,39-phase%2),(37,43),(40,47),(38,52)],16)
  poly(a,[(35,49),(36,43-phase%2),(38,47),(37,50)],17)
  box(a,34,53,6,2,10);box(a,26,57,20,2,12);box(a,28,59,16,2,9)
  box(a,36,35,1,4,10);box(a,32,29,8,1,11)
 elif k==3:
  box(a,26,26,20,4,9);box(a,27,26,18,1,12)
  for xx in range(28,45,4):box(a,xx,27,1,2,11)
  poly(a,[(25,31),(47,31),(50,36),(50,57),(46,61),(26,61),(22,57),(22,36)],14)
  box(a,24,36,24,20,13);box(a,25,36,2,15,16);box(a,28,34,15,1,15)
  box(a,45,37,1,17,14);box(a,26,57,20,2,15)
  poly(a,[(36,44),(30,39),(28,39),(30,46),(34,48),(31,52),(35,53),(37,47),(42,51),(44,47),(41,44),(44,39),(40,40)],15)
  box(a,36,42,1,11,12);box(a,30,42,2,2,17);box(a,41,42,2,2,17)
  box(a,29,54,2,1,11);box(a,41,55,2,1,11)
 elif k==4:
  # Lens rim uses discrete nested octagons, never an ellipse raster filter.
  for rr,c in [(14,9),(13,12),(11,10),(10,14),(8,13)]:
   poly(a,[(32-rr+3,42-rr),(32+rr-3,42-rr),(32+rr,42-rr+3),(32+rr,42+rr-3),(32+rr-3,42+rr),(32-rr+3,42+rr),(32-rr,42+rr-3),(32-rr,42-rr+3)],c)
  line(a,[(26,35),(23,39),(23,43)],16);line(a,[(28,34),(25,38)],17)
  line(a,[(42,52),(52,61)],9,5);line(a,[(43,51),(53,60)],11,2)
  box(a,34,42,3,1,15);box(a,35,41,1,3,15)
 elif k==5:
  poly(a,[(22,32),(29,29),(49,32),(49,59),(29,57),(22,60)],9)
  poly(a,[(24,33),(29,31),(46,33),(46,56),(29,54),(24,57)],6)
  box(a,28,32,1,23,11)
  for yy in range(35,54,4):line(a,[(31,yy),(43,yy+1)],7)
  line(a,[(37,52),(37,36)],14)
  for yy in [39,44,49]:
   poly(a,[(37,yy),(32,yy-3),(31,yy-1),(37,yy+2)],15)
   poly(a,[(38,yy),(43,yy-4),(44,yy-2),(38,yy+2)],16)
  box(a,22,32,2,28,19);box(a,24,55,2,1,12)
 else:
  # Wax seal, raised moon, broken orbit and hanging silk ribbons.
  poly(a,[(29,49),(28,64),(34,61),(37,64),(38,50)],18)
  poly(a,[(39,48),(40,63),(44,60),(47,61),(44,47)],19)
  poly(a,[(36,26),(44,28),(50,34),(52,43),(47,51),(39,55),(30,52),(23,45),(22,36),(28,29)],18)
  poly(a,[(36,29),(44,32),(48,39),(46,47),(38,51),(30,48),(26,41),(28,34)],20)
  line(a,[(30,34),(36,31),(43,34)],21)
  poly(a,[(37,34),(32,38),(32,44),(37,47),(42,45),(37,44),(35,41),(35,38)],17)
  box(a,41,38,2,2,8);box(a,29,43,1,1,21)


def card(k,state='normal',phase=0):
 a=image(72,104,None);edge=12 if state=='selected' else 10
 box(a,2,0,68,104,edge);box(a,0,2,72,100,edge);box(a,2,2,68,100,7);box(a,4,4,64,96,6)
 box(a,5,5,62,10,0);text(a,TITLES[k],7,8,8)
 box(a,5,17,62,55,1);box(a,6,18,60,53,2)
 illustration(a,k,phase)
 # Letterpress frame: dark lower bevel, pale upper edge, quiet corner tooling.
 box(a,1,4,1,96,8);box(a,70,4,1,96,9)
 box(a,4,1,64,1,8);box(a,4,102,64,1,9)
 for xx,side in [(3,1),(68,-1)]:
  engraving(a,xx,18,side,11);engraving(a,xx,67,side,11)
 for xx in range(9,65,8):box(a,xx,71,3,1,10)
 box(a,6,74,60,1,10);text(a,TYPES[k],7,78,9);paste(a,icon(0),6,86);text(a,str(2+k),25,92,0);paste(a,icon(2),43,86);text(a,str(1+k%3),60,92,0)
 for xx,yy in [(3,3),(67,3),(3,99),(67,99)]:box(a,xx,yy,2,2,8)
 if state=='disabled':
  # Discrete palette remap; lock is a second, non-colour-only cue.
  data=[]
  for rgba in a.get_flattened_data():
   if rgba[3]==0:data.append(rgba)
   else:
    v=sum(rgba[:3])//3;data.append(tuple(bytes.fromhex(P[[0,1,2,3,4][min(4,v//52)]][1:]))+(255,))
  a.putdata(data);paste(a,icon(3),28,37)
 return a

def back():
 a=image(72,104,None);border(a,1,1,70,102,11);border(a,3,3,66,98,9);border(a,5,5,62,94,19)
 for y in range(10,96,8):
  for x in range(11,63,8):
   line(a,[(x,y),(x+2,y+2),(x,y+4),(x-2,y+2),(x,y)],2)
 for xx,side in [(8,1),(63,-1)]:
  engraving(a,xx,8,side,11);engraving(a,xx,88,side,11)
 for yy in [17,85]:
  line(a,[(17,yy),(29,yy),(36,yy-4),(43,yy),(55,yy)],11);box(a,35,yy,3,2,12)
 poly(a,[(36,24),(59,40),(59,65),(36,81),(13,65),(13,40)],9)
 poly(a,[(36,27),(56,42),(56,63),(36,78),(16,63),(16,42)],11)
 poly(a,[(36,30),(53,44),(53,61),(36,75),(19,61),(19,44)],0)
 moth(a,36,49,2)
 box(a,35,66,3,3,12);star(a,36,36,11)
 return a

cards=image(72*9,104,None)
for k in range(8):
 a=card(k);save(a,f'card_{k:02}.png');paste(cards,a,k*72,0)
paste(cards,back(),576,0);save(back(),'card_back.png');save(cards,'cards-atlas.png')
icons=image(16*6,16,None)
for k in range(6):paste(icons,icon(k),k*16,0)
save(icons,'icons-atlas.png')
actors=image(144,40,None)
for k in range(2):keeper(actors,4+k*36,4,k);keeper(actors,76+k*32,4,k,True)
save(actors,'characters.png')
props=image(160,40,None)
for k in range(5):prop(props,4+k*32,5,k)
save(props,'props.png')
materials=image(96,16)
for k in range(6):
 x=k*16;base=[7,1,9,13,10,18][k];box(materials,x,0,16,16,base)
 if k==0:box(materials,x+2,3,9,1,6);box(materials,x+4,10,10,1,8)
 if k==1:
  for y in [2,8,14]:line(materials,[(x,y),(x+5,y+3),(x+10,y),(x+15,y+3)],2)
 if k==2:line(materials,[(x,3),(x+15,3)],10);line(materials,[(x+2,9),(x+12,9),(x+15,12)],10)
 if k==3:box(materials,x+2,1,2,12,15);box(materials,x+5,1,1,7,16);box(materials,x,14,16,2,14)
 if k==4:box(materials,x,0,16,2,12);box(materials,x+1,2,2,10,11);box(materials,x,14,16,2,9)
 if k==5:box(materials,x+2,2,12,2,19);box(materials,x+2,4,2,10,19)
save(materials,'materials.png')

wide=image(400,248,0)
# Establishing scene: cabinets in low contrast, table in foreground.
for x in [8,90,306]:
 border(wide,x,10,76,49,2)
 for y in [16,36]:
  box(wide,x+4,y+16,68,2,3)
  for j in range(5):box(wide,x+8+j*12,y,7,14,1);box(wide,x+9+j*12,y+2,5,1,3)
border(wide,174,9,52,50,3);box(wide,177,12,46,44,18);box(wide,198,12,3,44,2);box(wide,177,33,46,3,2)
box(wide,187,17,8,8,20);box(wide,189,16,8,6,18)
box(wide,8,69,384,169,9);box(wide,12,73,376,161,10);box(wide,16,77,368,153,1);border(wide,20,81,360,145,3)
for xx,side in [(24,1),(375,-1)]:
 engraving(wide,xx,99,side,10);engraving(wide,xx,215,side,10)
for xx in [8,90,306]:
 for yy in [17,37]:
  for j in range(5):
   bx=xx+8+j*12
   box(wide,bx,yy,1,12,2);box(wide,bx+2,yy+2,3,1,4);box(wide,bx+2,yy+9,3,1,3)
text(wide,'THE NOCTURNE ARCHIVE',26,88,11);text(wide,'NIGHT 01',318,88,5)
for k,x in enumerate([30,110,190,270]):
 box(wide,x+3,108,72,104,0);paste(wide,card(k),x,104)
keeper(wide,19,34);prop(wide,354,39,0)
save(wide,'scene-wide.png');close=wide.crop((20,96,174,216));save(close,'scene-close.png')
states=image(400,132,0)
for k,state in enumerate(['normal','selected','stacked','disabled','resolve']):
 x=4+k*80;y=10
 if state=='stacked':paste(states,back(),x+4,y+4);paste(states,back(),x+2,y+2)
 paste(states,card(0,'disabled' if state=='disabled' else 'selected' if state=='selected' else 'normal'),x,y-2 if state=='selected' else y)
 if state=='resolve':
  for px,py in [(x+3,3),(x+35,1),(x+68,13)]:star(states,px,py)
 text(states,{'normal':'IDLE','selected':'FOCUS','stacked':'STACK','disabled':'LOCK','resolve':'STAMP'}[state],x+9,121,12)
save(states,'states.png')
ui=image(400,92,0)
border(ui,4,4,124,84,11);text(ui,'ARCHIVE',15,15,12)
for yy,label in [(29,'COLLECTION'),(46,'SETTINGS'),(63,'CONTINUE')]:
 border(ui,12,yy,108,13,19 if yy!=63 else 12);text(ui,label,18,yy+4,7)
border(ui,136,4,260,43,11);paste(ui,actors.crop((0,0,36,40)),140,6);text(ui,'THE LAMPS ARE READY.',182,15,7);text(ui,'CHOOSE A SPECIMEN.',182,29,16)
for k in range(6):
 border(ui,138+k*43,55,38,33,14 if k!=2 else 12);paste(ui,icon(k),149+k*43,59);text(ui,str(k+1),155+k*43,79,7)
save(ui,'interface.png')
frames=[];strip=image(400,120,0)
for t in range(8):
 fr=image(92,120,0);lift=[0,0,-1,-2,-2,-1,0,0][t];paste(fr,card(0,'selected' if t in [2,3,4] else 'normal',t),10,8+lift)
 if t in [3,4,5]:
  for x,y in [(5,9),(85,17),(46,3)]:star(fr,x,y,17)
 if t==4:box(fr,14,10+lift,64,1,8)
 frames.append(enlarged(fr,3).convert('RGB'))
 if t in [0,2,4,7]:paste(strip,fr,4+[0,2,4,7].index(t)*100,0)
save(strip,'action-strip.png');frames[0].save(ROOT/'card-motion.gif',save_all=True,append_images=frames[1:],duration=[160,160,100,80,100,120,180,400],loop=0,disposal=2)
# Curated art-direction board: native 480px, exported exact 3x.
board=image(480,794,0)
text(board,'MOTHMARK',20,18,12);text(board,'THE NOCTURNE ARCHIVE',20,30,7);text(board,'PIXEL CARDS / ART DIRECTION 02',20,44,16)
text(board,'01 / ESTABLISHING TABLE',20,65,12);paste(board,wide,40,78)
text(board,'02 / SHARED PALETTE',20,340,12)
for i in range(24):
 x=20+(i%12)*37;y=354+(i//12)*22;box(board,x,y,29,12,i);text(board,f'{i:02}',x,y+14,7)
text(board,'03 / CAST AND TOOLS',20,407,12);paste(board,actors,24,421);paste(board,props,236,421)
text(board,'04 / CARD STATES',20,475,12);paste(board,states,40,488)
text(board,'05 / INTERFACE FAMILY',20,632,12);paste(board,ui,40,645)
text(board,'72 X 104 CARDS / 16 X 16 ICONS / 1PX EDGES',20,754,16)
text(board,'ONE PALETTE. ONE GRID. ORIGINAL WORLD.',20,769,7)
save(board,'board-native.png');save(enlarged(board,3),'art-direction-board.png')
# Close-up and material sheet, all identical 1x pixel scale before integer export.
study=image(400,290,0);text(study,'CLOSE STUDY / SAME SOURCE PIXELS',8,8,12);paste(study,close,8,24)
text(study,'MATERIALS',184,26,12);paste(study,enlarged(materials,2),184,40)
for i,label in enumerate(['PAPER','VELVET','WOOD','GLASS','BRASS','INK']):text(study,label,184+(i%2)*90,83+(i//2)*12,7)
text(study,'PREPARE / LIFT / STAMP / SETTLE',8,156,12);paste(study,strip,0,168)
save(enlarged(study,3),'close-material-study.png')
(ROOT/'palette.json').write_text(json.dumps([{'index':i,'name':n,'hex':p} for i,(n,p) in enumerate(zip(N,P))],indent=2))
(ROOT/'assets.json').write_text(json.dumps({'card':{'width':72,'height':104,'padding':4,'title':[5,5,62,10],'art':[5,17,62,55],'footer':[6,86,60,16]},'cards':[{'id':i,'name':n,'type':TYPES[i],'atlas':[i*72,0,72,104]} for i,n in enumerate(TITLES)],'icons':{'size':16,'names':['currency','vitality','pollen','locked','confirmed','archive']},'character_size':[24,32],'palette':'palette.json','close_crop':[20,96,174,216],'motion_ms':[160,160,100,80,100,120,180,400]},indent=2))


collection=image(344,252,0)
text(collection,'THE FIRST EIGHT / SHARED CARD FRAME',8,8,12)
for k in range(8):paste(collection,card(k),12+(k%4)*84,24+(k//4)*114)
save(enlarged(collection,3),'collection-study.png')
mobile=image(288,300,0)
box(mobile,8,18,272,278,9);box(mobile,12,22,264,270,1);border(mobile,16,26,256,262,3)
for xx,side in [(21,1),(266,-1)]:
 engraving(mobile,xx,48,side,10);engraving(mobile,xx,275,side,10)
text(mobile,'THE NOCTURNE ARCHIVE',28,35,12)
for k in range(4):paste(mobile,card(k),52+(k%2)*112,58+(k//2)*114)
save(mobile,'scene-mobile.png')
for label in ['FLIP','STAMP','LOCK','STACK','RESET','PREVIOUS','NEXT']:
 a=image(56,9,None);text(a,label,(56-len(label)*6)//2,2,7);save(a,'label_'+label.lower()+'.png')

for k in range(8):save(card(k,'disabled'),f'card_disabled_{k:02}.png')

idle=image(288,832,None)
for k in range(8):
 for t in range(4):paste(idle,card(k,phase=t),t*72,k*104)
save(idle,'idle-atlas.png')
hero=image(320,180,0)
text(hero,'MOTHMARK',18,14,12);text(hero,'CABINET OF LIVING LIGHT',18,25,16)
for k in range(3):
 paste(hero,back(),30+k*94,53+k*2)
 paste(hero,card([0,3,6][k]),26+k*94,49+k*2)
text(hero,'THE NOCTURNE ARCHIVE / EDITION 02',18,168,7)
save(enlarged(hero,4),'hero-study.png')

mark=image(144,32,None)
letters=image(48,5,None);text(letters,'MOTHMARK',0,0,12);paste(mark,enlarged(letters,2),24,10)
line(mark,[(8,13),(15,13),(18,16),(15,19),(8,19)],11)
line(mark,[(136,13),(129,13),(126,16),(129,19),(136,19)],11)
box(mark,15,15,2,2,17);box(mark,128,15,2,2,17)
save(mark,'wordmark.png')

metadata=json.loads((ROOT/'assets.json').read_text())
metadata.update({'edition':2,'idle_atlas':{'file':'idle-atlas.png','cell':[72,104],'columns':4,'rows':8,'frame_ms':240},'hero':{'native':[320,180],'export_scale':4}})
(ROOT/'assets.json').write_text(json.dumps(metadata,indent=2))
print('Built',len(list(ROOT.glob('*.png'))),'PNGs + animated GIF')

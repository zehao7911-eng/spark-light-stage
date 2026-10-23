"""Extend the original MOTHMARK art family for the complete browser game."""
from pathlib import Path
import runpy,json
ns=runpy.run_path(str(Path(__file__).with_name('build_art.py')))
ROOT=ns['ROOT'];image=ns['image'];box=ns['box'];poly=ns['poly'];line=ns['line'];text=ns['text'];paste=ns['paste'];moth=ns['moth'];save=ns['save'];card=ns['card'];border=ns['border'];P=ns['P']
SPECIES=[
 ('MINTWING',[0,1],1,6,0),('DEWTAIL',[1,0],1,7,0),('AMBERMOTH',[0,0],2,8,2),('VIOLETWING',[2,1],2,9,1),
 ('ROSEVEIL',[1,1],3,10,1),('FERNSKIP',[1,0,1],4,12,0),('MOONMOTH',[2,2,0],5,15,1),('COPPERFIN',[0,1,0],6,16,2),
 ('GLASSWING',[2,1,2],7,18,0),('STARDUST',[0,2,0],8,20,2),('SILKMOON',[2,1,0],10,24,1),('AURORA',[0,1,2,0],12,32,0)]
TOOLS=[('LANTERN',2,0),('HERBS',5,1),('LENS',4,2),('FIELD JAR',3,3),('DUSKKEEP',1,4),('MOON SEAL',6,5)]
def sigil(i):
 a=image(16,16,None)
 if i==0:
  poly(a,[(8,1),(9,5),(13,3),(11,7),(15,8),(11,9),(13,13),(9,11),(8,15),(7,11),(3,13),(5,9),(1,8),(5,7),(3,3),(7,5)],11)
  poly(a,[(8,4),(10,7),(12,8),(9,10),(8,12),(6,9),(4,8),(7,6)],12);box(a,7,7,2,2,8)
 elif i==1:
  poly(a,[(2,3),(9,3),(14,1),(14,8),(10,13),(5,13),(2,9)],14)
  poly(a,[(4,4),(10,4),(12,3),(12,8),(9,11),(5,11),(4,8)],16)
  line(a,[(3,14),(10,6)],17);line(a,[(7,10),(6,6)],15)
 elif i==2:
  poly(a,[(9,1),(5,2),(2,6),(2,10),(5,14),(10,15),(14,12),(9,12),(6,9),(6,5)],19)
  poly(a,[(8,2),(4,5),(3,8),(5,12),(9,14),(12,13),(7,11),(5,8),(6,4)],21)
  box(a,11,3,2,2,17)
 elif i==3:
  poly(a,[(8,1),(14,8),(8,15),(2,8)],11);poly(a,[(8,4),(12,8),(8,12),(4,8)],16);box(a,7,6,2,4,17)
 elif i==4:
  for x,y in [(1,5),(7,2),(11,8)]:box(a,x,y,4,6,19);box(a,x+1,y+1,2,2,21)
 else:
  poly(a,[(8,1),(13,4),(15,9),(11,14),(5,14),(1,9),(3,4)],19);poly(a,[(8,4),(11,6),(11,10),(8,12),(5,10),(5,6)],21);box(a,7,6,2,4,17)
 return a
sigils=image(96,16,None)
for i in range(6):paste(sigils,sigil(i),i*16,0)
save(sigils,'sigils.png')
atlas=image(72*12,104,None)
def specimen(i,phase=0):
 name,needs,night,reward,kind=SPECIES[i]
 ns['TITLES'][0]=name;a=card(0)
 # Preserve template; repaint the shared alcove before drawing a species.
 ns['illustration'](a,1,0)
 # Clear the archivist area to its quiet recess, leaving architectural rim.
 box(a,19,29,34,31,0);box(a,17,61,38,1,4)
 # Specimen family has 12 distinct grouped wing details, not outside images.
 moth(a,36,43,kind,(phase+(2 if i in [5,8] else 0))%4)
 if i in [1,6,10]:
  for side in [-1,1]:
   line(a,[(36+side*10,54),(36+side*12,61),(36+side*9,63)],16 if i==1 else 20)
 if i in [2,7,9]:
  for side in [-1,1]:line(a,[(36+side*6,40),(36+side*14,38),(36+side*18,34)],12)
 if i==4:
  # Rose ramp maps the whole creature, not the card frame.
  for yy in range(30,60):
   for xx in range(16,57):
    v=a.getpixel((xx,yy))
    for old,new in [(18,22),(19,4),(20,23),(21,21)]:
     if v==tuple(bytes.fromhex(P[old][1:]))+(255,):a.putpixel((xx,yy),tuple(bytes.fromhex(P[new][1:]))+(255,));break
 if i==5:
  for side in [-1,1]:line(a,[(36+side*5,43),(36+side*11,46),(36+side*8,49)],17)
 if i==8:
  for side in [-1,1]:line(a,[(36+side*7,36),(36+side*13,35),(36+side*10,39)],8)
 if i==9:
  for xx,yy in [(27,36),(43,36),(31,48),(42,51)]:ns['star'](a,xx,yy,17)
 if i==10:
  for side in [-1,1]:line(a,[(36+side*5,39),(36+side*13,37),(36+side*11,40)],8)
 if i==11:
  for side in [-1,1]:
   line(a,[(36+side*6,39),(36+side*14,36)],21);line(a,[(36+side*5,47),(36+side*11,50)],12)
 box(a,6,76,60,9,6);text(a,['COMMON','UNCOMMON','RARE','MYTHIC'][min(3,(night-1)//3)],7,78,9)
 box(a,23,89,16,9,6);text(a,str(reward),25,92,0)
 return a
idle=image(288,1248,None)
for i in range(12):
 paste(atlas,specimen(i),i*72,0)
 for phase in range(4):paste(idle,specimen(i,phase),phase*72,i*104)
save(idle,'specimen-idle.png')
save(atlas,'specimens.png')
# Three rows of compact tool cards: full art at the same source pixel size.
tools=image(48*6,52,None)
for i,(name,art,rune) in enumerate(TOOLS):
 a=image(48,52,7);border(a,0,0,48,52,11);box(a,2,2,44,48,6);box(a,3,3,42,8,0)
 text(a,['LANTERN','HERBS','LENS','JAR','KEEPER','SEAL'][i],4,5,8);box(a,3,12,42,23,1)
 source=card(art);paste(a,source.crop((16,30,56,53)),4,12)
 paste(a,sigil(rune),5,35);text(a,'1',31,41,0);paste(tools,a,48*i,0)
save(tools,'tools.png')
# Collection icons retain native moth silhouettes and panel framing.
thumbs=image(32*12,32,None)
for i in range(12):
 a=image(32,32,1);border(a,0,0,32,32,10)
 # Exact pixel crop rather than scaling the specimen to a different grid.
 paste(a,atlas.crop((i*72+21,30,i*72+51,59)),1,1)
 paste(thumbs,a,32*i,0)
save(thumbs,'collection-icons.png')
(ROOT/'species.json').write_text(json.dumps([{'id':i,'name':n,'needs':r,'night':d,'reward':v,'kind':k} for i,(n,r,d,v,k) in enumerate(SPECIES)],indent=2))
print('Game expansion: 12 specimens, 6 tools, 6 sigils')

(ROOT/'bitmap-font.json').write_text(json.dumps(ns['FONT']))
table=image(160,254,0)
box(table,1,21,158,230,9);box(table,3,23,154,226,10);box(table,5,25,150,222,1)
for xx,side in [(7,1),(152,-1)]:
 for yy in [152,231]:ns['engraving'](table,xx,yy,side,10)
box(table,6,166,148,1,3);box(table,6,229,148,1,3)
save(table,'game-table.png')
disabled=tools.copy()
data=[]
for rgba in disabled.get_flattened_data():
 if not rgba[3]:data.append(rgba)
 else:
  v=sum(rgba[:3])//3;data.append(tuple(bytes.fromhex(P[[0,1,2,3,4][min(4,v//52)]][1:]))+(255,))
disabled.putdata(data);save(disabled,'tools-disabled.png')

for i in range(12):save(thumbs.crop((i*32,0,(i+1)*32,32)),f'species_{i:02}.png')
for i in range(6):save(sigil(i),f'rune_{i}.png')
save(ns['icon'](5),'ui_book.png');save(sigil(2),'ui_moon.png')
lamp=image(16,16,None);border(lamp,6,0,4,4,11);box(lamp,3,4,10,1,12);border(lamp,4,5,8,9,11);box(lamp,6,7,4,5,17);box(lamp,3,14,10,2,10);save(lamp,'ui_lamp.png')

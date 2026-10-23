"""TIDEBYTE original art kit. Pillow, hard integer pixels, no raster filters."""
from pathlib import Path
from PIL import Image,ImageDraw
import json,hashlib
ROOT=Path(__file__).parent
P=['#172e42','#294b62','#47748b','#80a2ab','#c3d8cd','#fff0c2','#f9c56b','#db8b49','#aa5746','#713f4a','#e57b65','#f4aa89','#397d86','#54a5a4','#8cc8bc','#42664e','#708f56','#a5b86a','#e9db9a','#f7e9d8']
N=['Ink','Deep sea','Blue slate','Distant mist','Cloud shade','Warm cream','Signal yellow','Ochre','Clay shadow','Plum shadow','Coral','Peach','Lagoon shade','Lagoon','Shallow mint','Leaf shade','Leaf','Young leaf','Sand','Paper']
FONT={
'A':['01110','10001','11111','10001','10001'],'B':['11110','10001','11110','10001','11110'],'C':['01111','10000','10000','10000','01111'],'D':['11110','10001','10001','10001','11110'],'E':['11111','10000','11110','10000','11111'],'F':['11111','10000','11110','10000','10000'],'G':['01111','10000','10111','10001','01110'],'H':['10001','10001','11111','10001','10001'],'I':['111','010','010','010','111'],'J':['00111','00010','00010','10010','01100'],'K':['10001','10010','11100','10010','10001'],'L':['10000','10000','10000','10000','11111'],'M':['10001','11011','10101','10001','10001'],'N':['10001','11001','10101','10011','10001'],'O':['01110','10001','10001','10001','01110'],'P':['11110','10001','11110','10000','10000'],'Q':['01110','10001','10101','10010','01101'],'R':['11110','10001','11110','10010','10001'],'S':['01111','10000','01110','00001','11110'],'T':['11111','00100','00100','00100','00100'],'U':['10001','10001','10001','10001','01110'],'V':['10001','10001','10001','01010','00100'],'W':['10001','10001','10101','11011','10001'],'X':['10001','01010','00100','01010','10001'],'Y':['10001','01010','00100','00100','00100'],'Z':['11111','00010','00100','01000','11111'],
'0':['01110','10011','10101','11001','01110'],'1':['010','110','010','010','111'],'2':['11110','00001','01110','10000','11111'],'3':['11110','00001','01110','00001','11110'],'4':['10010','10010','11111','00010','00010'],'5':['11111','10000','11110','00001','11110'],'6':['01111','10000','11110','10001','01110'],'7':['11111','00001','00010','00100','00100'],'8':['01110','10001','01110','10001','01110'],'9':['01110','10001','01111','00001','11110'],'/':['00001','00010','00100','01000','10000'],':':['0','1','0','1','0'],'-':['000','000','111','000','000'],'.':['0','0','0','0','1'],'!':['1','1','1','0','1'],'+':['000','010','111','010','000'],'?':['1110','0001','0110','0000','0100'],'>':['100','010','001','010','100']}
def canvas(w,h,col=0):return Image.new('RGBA',(w,h),P[col] if col is not None else (0,0,0,0))
def rect(im,x,y,w,h,col):ImageDraw.Draw(im).rectangle((x,y,x+w-1,y+h-1),fill=P[col])
def poly(im,pts,col):ImageDraw.Draw(im).polygon(pts,fill=P[col])
def text(im,s,x,y,col=5):
 for ch in s.upper():
  glyph=FONT.get(ch)
  if glyph:
   for yy,row in enumerate(glyph):
    for xx,on in enumerate(row):
     if on=='1':rect(im,x+xx,y+yy,1,1,col)
  x+=6
def frame(im,x,y,w,h,col=3):rect(im,x,y,w,h,col);rect(im,x+1,y+1,w-2,h-2,0)
def save(im,name):im.save(ROOT/name)
def zoom(im,n):return im.resize((im.width*n,im.height*n),Image.Resampling.NEAREST)
def tile(i):
 im=canvas(16,16,[13,18,16,2,7,8,4,0][i])
 if i==0:
  rect(im,2,3,8,2,14);rect(im,10,11,6,2,12)
 if i==1:rect(im,0,0,16,3,5);rect(im,2,8,4,2,6)
 if i==2:
  rect(im,0,0,16,4,17);rect(im,0,4,16,2,15);rect(im,8,9,4,3,15)
 if i==3:
  rect(im,0,0,16,2,3);rect(im,0,8,16,2,1);rect(im,6,2,2,6,1);rect(im,12,10,2,6,1)
 if i==4:
  for yy in [0,7,14]:rect(im,0,yy,16,2,8)
  rect(im,3,3,7,2,6)
 if i==5:
  rect(im,0,0,16,3,10);rect(im,0,8,16,3,10);rect(im,6,3,2,5,9);rect(im,12,11,2,5,9)
 if i==6:
  rect(im,0,0,16,2,19);rect(im,0,0,2,16,19);rect(im,3,10,9,2,3)
 if i==7:
  rect(im,3,0,10,3,6);rect(im,0,3,3,10,6);rect(im,13,3,3,10,6);rect(im,3,13,10,3,6)
 return im
T=[tile(i) for i in range(8)]
def prop(i):
 im=canvas(16,16,None)
 if i==0: # parcel
  rect(im,2,4,12,10,0);rect(im,3,4,10,8,18);rect(im,7,4,2,8,7);rect(im,3,7,10,2,7);rect(im,10,5,2,2,19)
 if i==1: # mailbox
  rect(im,6,9,4,7,8);rect(im,2,2,12,10,0);rect(im,3,2,10,8,10);rect(im,4,3,8,2,11);rect(im,5,6,6,2,0);rect(im,12,0,2,5,6)
 if i==2: # ticket
  rect(im,3,2,10,12,0);rect(im,3,2,8,10,19);rect(im,5,4,4,2,10);rect(im,5,8,4,2,3)
 if i==3: # tide gauge
  rect(im,6,0,4,16,0);rect(im,7,1,2,14,5)
  for y in [3,7,11]:rect(im,9,y,4,2,7)
  rect(im,3,10,6,3,14)
 if i==4: # reed
  rect(im,7,5,2,11,15);rect(im,3,3,3,8,16);rect(im,10,0,3,10,17);rect(im,5,10,7,3,16)
 if i==5: # lantern
  rect(im,6,1,4,3,7);rect(im,3,4,10,9,0);rect(im,5,5,6,6,6);rect(im,7,5,2,6,5);rect(im,4,13,8,2,7)
 if i==6: # boat
  rect(im,1,9,14,3,0);rect(im,3,12,10,2,8);rect(im,4,6,8,4,10);rect(im,6,2,5,5,5);rect(im,7,3,3,3,1)
 if i==7: # heart
  poly(im,[(2,3),(6,3),(8,5),(10,3),(14,3),(14,8),(8,14),(2,8)],10);rect(im,3,4,3,2,11)
 return im
PROPS=[prop(i) for i in range(8)]
def person(role,f):
 im=canvas(16,24,None);bob=1 if f in [1,3] else 0
 if role==0: # Nori: broad coral hood, dark teal coat, parcel silhouette
  rect(im,3,4+bob,10,9,0);rect(im,2,5+bob,12,5,10);rect(im,4,3+bob,8,3,10);rect(im,4,5+bob,8,2,11);rect(im,5,8+bob,7,4,5);rect(im,10,9+bob,1,2,0);rect(im,4,13+bob,8,6,12);rect(im,3,14+bob,2,4,14);rect(im,11,14+bob,3,5,18);rect(im,6,13+bob,4,2,6)
  rect(im,4+(f%2),19,3,3,0);rect(im,9-(f%2),19,3,3,0)
 elif role==1: # Bex: blocky crab porter
  rect(im,2,10+bob,12,7,8);rect(im,3,8+bob,10,7,10);rect(im,4,6+bob,2,4,11);rect(im,10,6+bob,2,4,11);rect(im,4,6+bob,1,2,0);rect(im,10,6+bob,1,2,0);rect(im,0,10+bob,3,4,10);rect(im,13,8+bob,3,4,10);rect(im,4,16,8,3,12)
  for x in [2,6,10,13]:rect(im,x,19-(f%2),2,3,8)
 else: # Uma: heron postkeeper, high cream neck, cap
  rect(im,6,3+bob,6,5,5);rect(im,10,5+bob,5,2,7);rect(im,9,4+bob,1,1,0);rect(im,5,1+bob,7,3,12);rect(im,8,8+bob,3,6,5);rect(im,4,12+bob,8,7,12);rect(im,3,13+bob,3,4,14);rect(im,6,13+bob,5,2,6);rect(im,5,19,2,4,7);rect(im,10,19,2,4,7)
 return im
CH=[[person(role,f) for f in range(4)] for role in range(3)]
def send_pose(f):
 im=person(0,0)
 # Four deliberate silhouettes: prepare, release, contact/hold, settle.
 if f==0:rect(im,1,14,4,3,14);im.alpha_composite(PROPS[0],(-2,5))
 if f==1:rect(im,11,11,5,3,14);rect(im,12,10,3,2,5)
 if f==2:rect(im,11,9,5,3,14);rect(im,12,8,3,2,5)
 if f==3:rect(im,11,14,3,3,14)
 return im
SEND=[send_pose(f) for f in range(4)]
def house(im,x,y,w=48,h=38,roofcol=10):
 rect(im,x+4,y+h-3,w-4,5,0);rect(im,x+2,y+14,w-4,h-14,18);rect(im,x+2,y+14,4,h-14,7)
 poly(im,[(x-2,y+16),(x-2,y+10),(x+6,y+10),(x+6,y+5),(x+14,y+5),(x+14,y),(x+w-14,y),(x+w-14,y+5),(x+w-6,y+5),(x+w-6,y+10),(x+w+2,y+10),(x+w+2,y+16)],0)
 poly(im,[(x,y+13),(x,y+10),(x+8,y+10),(x+8,y+5),(x+16,y+5),(x+16,y+2),(x+w-16,y+2),(x+w-16,y+5),(x+w-8,y+5),(x+w-8,y+10),(x+w,y+10),(x+w,y+13)],roofcol)
 rect(im,x+8,y+20,10,10,0);rect(im,x+10,y+22,6,6,14);rect(im,x+26,y+21,12,h-21,8);rect(im,x+28,y+23,8,h-23,9);rect(im,x+27,y+h-2,12,3,7)
def tree(im,x,y):
 rect(im,x+6,y+14,4,15,8);poly(im,[(x,y+18),(x,y+8),(x+4,y+8),(x+4,y+2),(x+13,y+2),(x+13,y+5),(x+18,y+5),(x+18,y+18)],15);rect(im,x+3,y+6,10,10,16);rect(im,x+6,y+3,5,5,17)
def world(cast=True):
 im=canvas(320,180,4);rect(im,0,42,320,138,13)
 for x,y in [(12,15),(124,7),(257,19)]:
  rect(im,x,y+4,35,6,19);rect(im,x+8,y,19,12,19)
 # Quiet background architecture: two colours, no texture.
 for x in [0,52,224,278]:
  poly(im,[(x,53),(x,37),(x+8,37),(x+8,30),(x+24,30),(x+24,37),(x+38,37),(x+38,53)],3)
 for yy in range(48,180,16):
  for xx in range(0,320,16):im.alpha_composite(T[0],(xx,yy))
 # Tile-authored island mass, sand apron and grass top.
 cells={(x,y) for y in range(5,9) for x in range(2,17)}|{(x,4) for x in range(4,15)}|{(x,9) for x in range(4,16)}
 for x,y in sorted(cells,key=lambda v:v[1]):
  im.alpha_composite(T[1],(x*16,y*16+8));im.alpha_composite(T[2],(x*16,y*16))
 # Connected stone road, complete tiles rather than scattered decorative dots.
 for x in range(3,17):im.alpha_composite(T[3],(x*16,112))
 for y in range(7,10):im.alpha_composite(T[3],(10*16,y*16))
 for x in range(10,19):im.alpha_composite(T[4],(x*16,144))
 rect(im,160,160,144,3,8)
 for x in [164,204,244,292]:rect(im,x,156,3,12,9)
 house(im,65,59,48,47);house(im,132,48,64,52,12);house(im,226,72,48,40)
 rect(im,139,86,49,10,0);text(im,'POST',150,89,5)
 rect(im,168,28,4,21,8);poly(im,[(172,29),(189,29),(185,35),(172,35)],6)
 for x,y in [(42,66),(204,55),(271,95),(42,119)]:tree(im,x,y)
 for i,x,y in [(1,122,103),(3,289,132),(4,29,137),(4,273,157),(5,205,96),(0,184,133),(0,201,132)]:im.alpha_composite(PROPS[i],(x,y))
 poly(im,[(129,94),(132,97),(129,100),(126,97)],6)
 # Docked amphibious mail boat and broad readable wake.
 rect(im,261,167,42,3,12);rect(im,272,171,24,2,14)
 boat=zoom(PROPS[6],2);im.alpha_composite(boat,(267,146))
 if cast:
  for role,f,x,y in [(0,0,150,101),(1,1,79,100),(2,0,203,89)]:im.alpha_composite(CH[role][f],(x,y))
 return im
def ui():
 im=canvas(320,104,0);frame(im,1,1,318,102,3);rect(im,4,4,312,96,1)
 im.alpha_composite(PROPS[2],(12,10));text(im,'04/08',34,15);im.alpha_composite(PROPS[7],(104,10));text(im,'03',126,15);im.alpha_composite(PROPS[3],(170,9));text(im,'LOW TIDE',193,15,14)
 frame(im,10,34,198,58,4);im.alpha_composite(CH[2][0],(16,41));text(im,'UMA',40,42,6);text(im,'A PARCEL FOR THE',40,57);text(im,'LIGHTHOUSE. THANK YOU!',40,68)
 frame(im,220,34,88,58,6);im.alpha_composite(PROPS[0],(227,43));text(im,'SEND',251,48,6);text(im,'HOLD >',239,73)
 return im
def effects():
 sheet=canvas(128,24,None)
 for f in range(4):
  im=canvas(32,24,None);r=2+f*2
  for dx,dy in [(0,-1),(1,0),(0,1),(-1,0)]:
   x,y=15+dx*r,11+dy*r;rect(im,x,y,3,3,5 if f<2 else 6)
  if f<3:im.alpha_composite(PROPS[0],(8,4-f))
  sheet.alpha_composite(im,(f*32,0))
 return sheet
def build():
 far=world();near=far.crop((112,64,272,154));save(far,'far-native.png');save(world(False),'scene-base.png');save(near,'near-native.png');save(zoom(far,3),'far-view.png');save(zoom(near,6),'near-view.png')
 chars=canvas(64,96,None)
 for role in range(3):
  for f in range(4):chars.alpha_composite(CH[role][f],(f*16,role*24))
 for f in range(4):chars.alpha_composite(SEND[f],(f*16,72))
 save(chars,'characters.png');props=canvas(128,16,None)
 for i,p in enumerate(PROPS):props.alpha_composite(p,(i*16,0))
 save(props,'props.png');tiles=canvas(128,16)
 for i,t in enumerate(T):tiles.alpha_composite(t,(i*16,0))
 save(tiles,'tiles.png');interface=ui();save(interface,'interface-native.png');save(zoom(interface,3),'interface-view.png');fx=effects();save(fx,'effects.png')
 # Same pixel scale and colour vocabulary in palette, silhouettes and production examples.
 board=canvas(672,716,0);text(board,'TIDEBYTE / A SMALL WORLD WITH A BIG TIDE',16,14,5);text(board,'01 WIDE / 320 X 180',16,34,14);text(board,'02 CLOSE / EXACT 160 X 90 CROP',352,34,14)
 board.alpha_composite(far,(16,48));board.alpha_composite(zoom(near,2),(352,48))
 text(board,'03 TIDEBYTE20 / MATERIAL RAMPS',16,246,14)
 for i,color in enumerate(P):
  x=16+i%10*64;y=261+i//10*29;rect(board,x,y,28,18,i);text(board,f'{i:02}',x+34,y+6,5)
 text(board,'04 CAST / 16 X 24 CELLS',16,333,14);text(board,'05 POCKET OBJECTS / 16 X 16',352,333,14)
 for role,name in enumerate(['NORI','BEX','UMA']):
  x=26+role*104;board.alpha_composite(zoom(CH[role][0],3),(x,350));text(board,name,x,428)
 for i in range(8):
  x=352+i%4*80;y=352+i//4*56;board.alpha_composite(zoom(PROPS[i],2),(x,y));text(board,f'{i+1:02}',x+37,y+12,5)
 text(board,'06 TILES / REPEAT IN 16 PX STEPS',16,469,14);board.alpha_composite(zoom(tiles,2),(16,487));text(board,'WATER SAND GRASS STONE',16,530);text(board,'WOOD CLAY GLASS SIGNAL',16,541)
 text(board,'07 UI / SAME GRID AND ICONS',352,469,14);board.alpha_composite(interface,(352,487))
 text(board,'08 SEND / PREPARE-CONTACT-RECOVER',16,578,14)
 for f in range(4):
  board.alpha_composite(zoom(SEND[f],2),(16+f*76,598));board.alpha_composite(zoom(fx.crop((f*32,0,f*32+32,24)),1),(43+f*76,603))
 text(board,'THE YELLOW DIAMOND MEANS INTERACT.',352,610,6);text(board,'THE OUTLINE AND SHAPE STILL READ',352,624);text(board,'WHEN COLOUR IS REMOVED.',352,638)
 text(board,'1 WORLD PIXEL. INTEGER ZOOM. NO BLUR. NO RANDOM NOISE.',16,674,14);text(board,'ORIGINAL WORLD / CHARACTERS / GRAPHICS / EXPANDABLE SOURCE',16,690,3)
 save(zoom(board,2),'art-direction-board.png')
 # A second lighting condition swaps palette entries, not drawing methods.
 remap={4:3,3:2,13:12,14:13,17:16,16:15,19:18,18:7,11:10}
 dusk=far.copy();lookup={tuple(bytes.fromhex(P[k][1:])):tuple(bytes.fromhex(P[v][1:])) for k,v in remap.items()}
 dusk.putdata([(*lookup.get(p[:3],p[:3]),p[3]) for p in far.get_flattened_data()]);save(dusk,'far-dusk.png')
 base=world(False);base.putdata([(*lookup.get(p[:3],p[:3]),p[3]) for p in base.get_flattened_data()]);save(base,'scene-dusk.png')
 compare=canvas(672,220);text(compare,'DAY / CLEAR MATERIAL GROUPS',16,15,14);text(compare,'LATE TIDE / PALETTE SWAP ONLY',352,15,14);compare.alpha_composite(far,(16,32));compare.alpha_composite(dusk,(352,32));save(zoom(compare,2),'lighting-study.png')
 silhouettes=canvas(224,88);text(silhouettes,'COLOUR / SILHOUETTE',8,7,14)
 for role in range(3):
  silhouettes.alpha_composite(zoom(CH[role][0],2),(8+role*72,20));sil=CH[role][0].copy();sil.putdata([tuple(bytes.fromhex(P[5][1:]))+(a[3],) for a in sil.get_flattened_data()]);silhouettes.alpha_composite(zoom(sil,2),(40+role*72,20));text(silhouettes,['NORI','BEX','UMA'][role],12+role*72,77)
 save(zoom(silhouettes,3),'silhouette-study.png')
 # GIF animation retains a single palette and binary transparency.
 palette=[v for h in P for v in bytes.fromhex(h[1:])]+[0]*(768-60)
 frames=[]
 for f in range(4):
  src=zoom(CH[0][f],4);indexed=Image.new('P',src.size,255);indexed.putpalette(palette);inv={tuple(bytes.fromhex(h[1:])):i for i,h in enumerate(P)}
  indexed.putdata([inv[p[:3]] if p[3] else 255 for p in src.get_flattened_data()]);frames.append(indexed)
 frames[0].save(ROOT/'nori-walk.gif',save_all=True,append_images=frames[1:],duration=150,loop=0,transparency=255,disposal=2,optimize=False)
 save(zoom(PROPS[1],2),'icon.png')
 (ROOT/'palette.json').write_text(json.dumps({'name':'Tidebyte20','colors':[{'index':i,'name':n,'hex':h} for i,(n,h) in enumerate(zip(N,P))]},indent=2),encoding='utf-8')
 files={f.name:{'size':list(Image.open(f).size),'sha256':hashlib.sha256(f.read_bytes()).hexdigest()} for f in sorted(ROOT.glob('*.png'))}
 (ROOT/'assets.json').write_text(json.dumps({'original':True,'world':[320,180],'tile':[16,16],'characterCell':[16,24],'characterAnchor':[8,22],'propCell':[16,16],'nearCrop':[112,64,272,154],'characters':['Nori / courier','Bex / crab porter','Uma / heron postkeeper'],'props':['Parcel','Mailbox','Ticket','Tide gauge','Reeds','Lantern','Mail boat','Heart'],'tiles':['Water','Sand','Grass','Stone','Wood','Clay','Glass','Signal'],'files':files},indent=2),encoding='utf-8')
 print('Built',len(files),'original PNG assets and a four-frame GIF.')
if __name__=='__main__':build()

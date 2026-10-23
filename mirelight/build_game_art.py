"""District extensions built with the established Mirelight32 pixel grammar."""
from build_art import *
def sky():
 im=Image.new('RGB',(640,360),P[3]);rect(im,(0,0,639,57),4)
 for band,col in [(94,3),(127,2),(163,1)]:
  for i in range(12):
   x=i*61-10;h=20+(i*17)%35;poly(im,[(x,band),(x,band-h+9),(x+13,band-h),(x+43,band-h),(x+58,band-h+9),(x+58,band)],col)
 return im
def ground(im):
 rect(im,(0,207,639,282),3)
 for row in range(10):
  for i in range(34):
   x=i*20-(row%2)*10;y=208+row*8;rect(im,(x+1,y,x+18,y+6),4 if (row+i)%7 else 3)
   if (row+i)%6==0:line(im,[(x+2,y),(x+9,y)],5)
 bricks(im,(0,281,640,32),(1,2,3),16);rect(im,(0,279,639,281),5);rect(im,(0,313,639,359),2)
 for i in range(90):
  x=(i*83)%640;y=315+i%11*4;line(im,[(x,y),(x+7+i%9,y)],3 if i%4 else 4)
 for x in [18,615]:fern(im,x,278,2.3);fern(im,x,362,3,(8,9,10))
def pipe(im,x,y,w,h):
 line(im,[(x,y+h),(x,y),(x+w,y),(x+w,y+h//2)],0,7);line(im,[(x,y+h),(x,y),(x+w,y),(x+w,y+h//2)],20,5);line(im,[(x-1,y+h-2),(x-1,y+1),(x+w-1,y+1)],22)
 for xx in range(x+10,x+w,22):rect(im,(xx,y-4,xx+3,y+4),21);line(im,[(xx,y-4),(xx+2,y-4)],23)
def districts_art():
 a=sky();ground(a);building(a,32,87,130,129,1);building(a,436,86,154,133,0)
 bricks(a,(184,109,211,105),(13,17,18),12);roof(a,179,80,222,36)
 rect(a,(202,129,381,169),1)
 for xx in range(208,375,28):window(a,xx,134,17,23,False)
 text(a,(232,185),'CANAL WORKS',7);pipe(a,18,66,593,102)
 for xx in [165,402]:bricks(a,(xx,151,15,72),(13,17,18),8)
 # Raised pump wheel, sluice gauge and a tiny ferry landing.
 ellipse(a,(205,126,286,207),0);ellipse(a,(210,131,281,202),20);ellipse(a,(215,136,276,197),2)
 for i in range(10):
  t=i*math.pi/5;line(a,[(245,167),(245+math.cos(t)*32,167+math.sin(t)*32)],21,3)
 ellipse(a,(236,158,254,176),20);ellipse(a,(240,162,250,172),22)
 pipe(a,305,123,70,82);rect(a,(322,140,341,175),0);rect(a,(325,143,338,171),4);rect(a,(326,155,337,170),22)
 planks(a,(386,288,112,45),True);line(a,[(383,286),(502,286)],16,2)
 poly(a,[(364,326),(507,326),(492,344),(376,344)],0);poly(a,[(370,328),(501,328),(489,341),(379,341)],15);line(a,[(380,331),(489,331)],16)
 for x,y in [(15,238),(195,235),(417,232),(601,239)]:fern(a,x,y,1.3)
 save(a,'district-1.png')
 a=sky();ground(a);building(a,30,92,113,124,1)
 # Conservatory: structured leaded panes and plant masses behind glass.
 rect(a,(174,103,497,217),0);rect(a,(179,108,492,212),2)
 for x in range(187,488,39):
  rect(a,(x,112,x+30,205),3);line(a,[(x+2,114),(x+26,140)],4);line(a,[(x+3,116),(x+27,143)],2)
  fern(a,x+16,204,1.8);fern(a,x+22,178,1.1)
  rect(a,(x-4,105,x,215),20);line(a,[(x-3,108),(x-3,211)],22)
 for y in [134,171,207]:line(a,[(178,y),(493,y)],20,3);line(a,[(179,y-1),(492,y-1)],21)
 poly(a,[(165,104),(226,56),(451,56),(506,104)],0);poly(a,[(173,100),(228,62),(448,62),(497,100)],3)
 for x in range(225,452,28):line(a,[(x,62),(x-22,100)],20,2);line(a,[(x+3,64),(x-18,99)],4)
 line(a,[(228,62),(448,62)],22,2);line(a,[(175,101),(497,101)],22)
 planks(a,(302,162,62,56));window(a,310,168,46,34,True);rect(a,(298,210,368,216),16)
 text(a,(257,117),'GLASS GARDENS',7);building(a,530,116,85,99,1)
 for i in range(11):
  x=159+i*33;pr=prop(4);a.paste(pr,(x,219+(i%2)*5),pr)
 for x in [21,158,512,623]:fern(a,x,275,2)
 save(a,'district-2.png')
 a=sky();ground(a)
 # Monumental bell crown: large quiet stone planes behind precise brass machinery.
 bricks(a,(230,30,165,190),(1,2,3),18);roof(a,218,0,188,42);rect(a,(245,49,379,154),0);rect(a,(249,53,375,150),1)
 bell(a,280,63,3,False);rect(a,(237,158,387,166),20);line(a,[(239,158),(385,158)],22)
 window(a,281,178,62,34,False)
 for x in [48,464]:
  bricks(a,(x,112,115,105),(1,2,3),14);roof(a,x-7,77,128,41);window(a,x+35,128,40,50,False);vine(a,x+106,119,18)
 for x in [25,188,424,605]:
  rect(a,(x,109,x+8,242),0);rect(a,(x+2,111,x+5,241),20);line(a,[(x+2,113),(x+2,238)],22)
  bell(a,x-5,115,1,False)
 for i in range(10):
  x=32+i*61;line(a,[(x,269),(x+43,269)],14,2);rect(a,(x,262,x+3,280),20);rect(a,(x,262,x+3,264),22)
 pipe(a,65,197,504,32)
 for x in [10,217,402,628]:fern(a,x,277,1.8)
 save(a,'district-3.png')
 # Keep the approved starting street exactly as authored.
 save(Image.open(ROOT/'quay-base.png'),'district-0.png')
 for i in range(4):
  im=Image.open(ROOT/f'district-{i}.png').convert('RGB');alive=im.copy()
  for x in [36,166,371,524,603]:
   fern(alive,x,276,1.2)
   for j in range(3):rect(alive,(x-8+j*6,264-j%2*3,x-6+j*6,266-j%2*3),30);rect(alive,(x-7+j*6,264-j%2*3,x-7+j*6,264-j%2*3),7)
  for j in range(7):
   x=110+j*65;line(alive,[(x,53+(j%2)*6),(x+52,53+((j+1)%2)*6)],16);poly(alive,[(x+8,55+(j%2)*6),(x+20,55+(j%2)*6),(x+14,69+(j%2)*6)],25 if j%2 else 30)
  save(alive,f'district-{i}-alive.png')
 # Exact colour replacements: new capes remain in the master palette.
 base=Image.open(ROOT/'characters.png').convert('RGBA')
 for name,mapping in [('rose',{24:29,25:30,26:28}),('moss',{24:9,25:10,26:11}),('brass',{24:20,25:21,26:22})]:
  m={tuple(bytes.fromhex(P[k][1:])):tuple(bytes.fromhex(P[v][1:])) for k,v in mapping.items()};out=base.copy();out.putdata([(*m.get(px[:3],px[:3]),px[3]) for px in base.get_flattened_data()]);save(out,'characters-'+name+'.png')
 # Eight clockwork wheel frames, drawn on the source grid rather than rotated at runtime.
 atlas=Image.new('RGBA',(512,64))
 for f in range(8):
  w=Image.new('RGBA',(64,64));ellipse(w,(2,2,61,61),0);ellipse(w,(4,4,59,59),20);ellipse(w,(8,8,55,55),21);ellipse(w,(11,11,52,52),2)
  for j in range(8):
   ang=j*math.pi/4+f*math.pi/32;line(w,[(32,32),(32+math.cos(ang)*24,32+math.sin(ang)*24)],20,4);line(w,[(32,31),(32+math.cos(ang)*23,31+math.sin(ang)*23)],22)
  ellipse(w,(25,25,39,39),20);ellipse(w,(29,29,35,35),23);atlas.paste(w,(f*64,0))
 save(atlas,'machinery.png')
 print('Built four original districts, restoration states, three capes and machinery animation.')
if __name__=='__main__':districts_art()

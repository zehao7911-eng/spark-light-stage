"""Extend the original Tidebyte20 native-grid art into a traversable archipelago."""
from build_art import *
from collections import deque
W,H=48,30
zones=[[-1]*W for _ in range(H)]
for region,(x0,y0,x1,y1) in enumerate([(2,13,17,26),(25,17,42,26),(26,2,41,11),(3,2,17,10)]):
 for y in range(y0,y1+1):
  for x in range(x0,x1+1):
   if (x in [x0,x1] and y in [y0,y1]) or (region==0 and y<15 and (x<4 or x>15)):continue
   zones[y][x]=region
bars={(x,y) for x in range(18,25) for y in [21,22]}|{(x,y) for x in [32,33] for y in range(12,17)}|{(x,y) for x in [9,10] for y in range(11,13)}|{(x,y) for x in range(18,26) for y in [6,7]}
depots=[(10,21),(33,23),(33,9),(10,8)]
addresses=[[(5,24),(15,19),(15,25),(6,16)],[(28,20),(39,21),(39,25),(28,25)],[(28,6),(38,7),(38,11),(33,4),(28,10)],[(6,6),(14,6),(7,10),(14,10),(10,4)]]
names=[['Bex','Uma','Finch','Old Moss'],['Mina','Kelp Twins','Otto','Jun'],['Aster','Luma','Pip','Keeper Sol','Nell'],['Pebble','Wren','Taro','Fenn','Grandma Rue']]
blocked=set();buildings=[]
for region,points in enumerate([[depots[i]]+addresses[i] for i in range(4)]):
 for i,(x,y) in enumerate(points):
  xx=x*16+8-24;yy=y*16+8-52
  buildings.append((region,i,xx,yy,48,47))
  for cy in range(H):
   for cx in range(W):
    if xx-1<=cx*16+8<xx+49 and yy+1<=cy*16+8<yy+48:blocked.add((cx,cy))
def path(start,end):
 q=deque([start]);prev={start:None}
 while q:
  p=q.popleft()
  if p==end:break
  for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]:
   n=(p[0]+dx,p[1]+dy)
   if 0<=n[0]<W and 0<=n[1]<H and n not in prev and n not in blocked and zones[n[1]][n[0]]>=0:prev[n]=p;q.append(n)
 if end not in prev:raise RuntimeError(('No ground path',start,end))
 out=[];cur=end
 while cur is not None:out.append(cur);cur=prev[cur]
 return out
roads=set()
for region in range(4):
 for addr in addresses[region]:roads.update(path(depots[region],addr))
# Connect each district's roads to every tide route landing.
for region,landing in [(0,(17,21)),(0,(10,13)),(1,(25,21)),(1,(33,17)),(2,(33,11)),(2,(26,6)),(3,(17,6)),(3,(10,10))]:roads.update(path(depots[region],landing))
im=canvas(W*16,H*16,13)
for y in range(H):
 for x in range(W):
  im.alpha_composite(T[0],(x*16,y*16))
  region=zones[y][x]
  if region>=0:
   coast=any(not(0<=x+dx<W and 0<=y+dy<H) or zones[y+dy][x+dx]<0 for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)])
   im.alpha_composite(T[1] if coast else T[2],(x*16,y*16))
   if region==2 and not coast:rect(im,x*16,y*16,16,16,18);rect(im,x*16+4,y*16+8,6,2,6)
   if region==3 and not coast:rect(im,x*16,y*16,16,4,17)
for x,y in roads:im.alpha_composite(T[3],(x*16,y*16))
for region,i,x,y,w,h in buildings:
 house(im,x,y,w,h,[10,12,7,10][region])
 if i==0:rect(im,x+3,y+21,42,10,0);text(im,'POST',x+12,y+24,5);im.alpha_composite(PROPS[1],(x+w-4,y+h-9))
 else:im.alpha_composite(PROPS[1],(x+w-3,y+h-9))
# Sparse grouped foliage, kept away from walking roads and building footprints.
for region in range(4):
 for y in range(2,H-2):
  for x in range(2,W-2):
   if zones[y][x]==region and (x*7+y*13)%19==0 and (x,y) not in roads and all((x+dx,y+dy) not in blocked for dx,dy in [(0,0),(0,-1),(1,0)]):
    tree(im,x*16,y*16-16)
    blocked.add((x,y))
# Landmark silhouettes: lighthouse, reed ferry, orchard mill. All integer pixels.
x,y=650,40
rect(im,x+4,y+8,16,55,5);rect(im,x+4,y+25,16,9,10);rect(im,x+4,y+48,16,9,10);rect(im,x,y+63,24,5,7);rect(im,x+1,y,22,12,0);rect(im,x+4,y+2,16,7,6);rect(im,x+10,y+2,3,7,5);poly(im,[(x-2,y),(x+12,y-9),(x+26,y)],12)
blocked.update({(xx,yy) for xx in [40,41] for yy in range(2,7)})
x,y=52,36
rect(im,x+9,y+21,15,30,18);rect(im,x+7,y+49,20,4,7);rect(im,x+7,y+14,20,12,10);rect(im,x+14,y+1,5,39,8);rect(im,x-3,y+17,39,5,8);rect(im,x+13,y+15,8,8,6)
blocked.update({(xx,yy) for xx in [3,4] for yy in range(2,5)}|{(4,5)})
for xx in range(443,628,16):im.alpha_composite(T[4],(xx//16*16,432))
im.alpha_composite(zoom(PROPS[6],2),(562,430));text(im,'REED REACH',467,449,5);text(im,'POST CAY',110,440,5);text(im,'LANTERN POINT',474,198,5);text(im,'CLOUD ORCHARD',73,190,5)
save(im,'world.png')
sb=canvas(W*16,H*16,None)
for x,y in sorted(bars):sb.alpha_composite(T[1],(x*16,y*16))
save(sb,'sandbars.png')
glyphs='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/:.-+!? >'
for name,col in [('font-ink.png',0),('font-light.png',5)]:
 atlas=canvas(96,18,None)
 for i,ch in enumerate(glyphs):text(atlas,ch,i%16*6,i//16*6,col)
 save(atlas,name)
for name,replacements in [('coral',{12:10,14:11}),('moss',{12:16,14:17}),('gold',{12:7,14:6})]:
 atlas=Image.open(ROOT/'characters.png').convert('RGBA');lookup={tuple(bytes.fromhex(P[a][1:])):tuple(bytes.fromhex(P[b][1:])) for a,b in replacements.items()}
 atlas.putdata([(*lookup.get(px[:3],px[:3]),px[3]) for px in atlas.get_flattened_data()]);save(atlas,'characters-'+name+'.png')
data={'width':W,'height':H,'tile':16,'zones':zones,'bars':[list(v) for v in sorted(bars)],'blocked':[list(v) for v in sorted(blocked)],'depots':[list(v) for v in depots],'addresses':[[list(v) for v in a] for a in addresses],'names':names,'regions':['Post Cay','Reed Reach','Lantern Point','Cloud Orchard']}
(ROOT/'world.json').write_text(json.dumps(data,separators=(',',':')),encoding='utf-8')
# A local JavaScript data file also works under file:// without fetch.
(ROOT/'world-data.js').write_text('globalThis.TIDE_WORLD='+json.dumps(data,separators=(',',':'))+';\n',encoding='utf-8')
(ROOT/'game-assets.json').write_text(json.dumps({f:{'size':list(Image.open(ROOT/f).size),'sha256':hashlib.sha256((ROOT/f).read_bytes()).hexdigest()} for f in ['world.png','sandbars.png','font-ink.png','font-light.png','characters-coral.png','characters-moss.png','characters-gold.png']},indent=2),encoding='utf-8')
print('Built four connected districts,',len(blocked),'building collision cells and',len(bars),'sandbar tiles.')

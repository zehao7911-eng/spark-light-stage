/*
 * Thimbleguard: selected Ending rule-engine port and adaptation.
 * Original: Aaron Steed, robotacid.com, https://github.com/st33d/Ending
 * Original revision ebb2b276bc4d0665cbce0f14a14f0b71be53a272.
 * GPL-2.0; distributed with full corresponding source and original AS3.
 * Ported/modified 2026-10-25. See NOTICE.md for scope and changes.
 */
// Retain Ending's property layout, including direction memory. This is a compact
// port of the movement/combat tier, not an emulator of the Flash renderer.
export const R={EMPTY:0,UP:1,RIGHT:2,DOWN:4,LEFT:8,M_UP:16,M_RIGHT:32,M_DOWN:64,M_LEFT:128,ATTACK:256,BLOCKED:512,WALL:1024,PLAYER:2048,ENEMY:4096,DOOR:8192,MOVER:16384,KILLER:32768,INCREMENT:65536,TURNER:131072,PUSHED:262144,TRAP:524288,SWAP:1048576,GENERATOR:2097152,ALLY:67108864,VOID:134217728,BOMB:268435456,INDESTRUCTIBLE:536870912};
export const DIRS=[R.UP,R.RIGHT,R.DOWN,R.LEFT];
export const VECTORS=[[0,-1],[1,0],[0,1],[-1,0]];
export const directionName=['up','right','down','left'];
export const clone=x=>JSON.parse(JSON.stringify(x));
export class EndingCore {
 constructor(map,player){this.map=clone(map);this.height=map.length;this.width=map[0].length;this.player={...player};this.events=[];this.hp=4;this.ward=0;this.guard=false;this.hitThisTurn=false;this.turns=0;this.map[player.y][player.x]=R.PLAYER|R.ALLY;}
 inside(x,y){return x>=0&&y>=0&&x<this.width&&y<this.height;}
 // Room.create2DArray and fill: the same row-major bitfield grid as upstream.
 static create2DArray(w,h,value=0){return Array.from({length:h},()=>Array(w).fill(value));}
 static fill(x,y,w,h,target,value){for(let r=y;r<y+h;r++)for(let c=x;c<x+w;c++)target[r][c]=value;}
 static oppositeDirection(d){return ((d<<2)|(d>>2))&15;}
 static rotateBits(n,amount,rangeMask,width){let rest=n&~rangeMask;n&=rangeMask;let a=Math.abs(amount)%width;if(amount<0)n=(n<<a)|(n>>(width-a));else if(amount>0)n=(n>>a)|(n<<(width-a));return (n&rangeMask)|rest;}
 empty(x,y,dir){let i=DIRS.indexOf(dir);if(i<0)return false;let [dx,dy]=VECTORS[i];return this.inside(x+dx,y+dy)&&this.map[y+dy][x+dx]===R.EMPTY;}
 blockedDir(dir){let i=DIRS.indexOf(dir);if(i<0)return true;let[dx,dy]=VECTORS[i],x=this.player.x+dx,y=this.player.y+dy;return !this.inside(x,y)||!!((this.map[y][x]&(R.WALL|R.VOID))&&!(this.map[y][x]&R.SWAP));}
 // LevelData.getCheck: directional immediate threats, with the same exclusions.
 getCheck(x,y){for(let i=0;i<4;i++){let[dx,dy]=VECTORS[i],nx=x-dx,ny=y-dy;if(!this.inside(nx,ny))continue;let p=this.map[ny][nx];if(!(p&R.ENEMY)||p&(R.GENERATOR))continue;if((p&R.TURNER&&p&DIRS[i])||(p&(R.TRAP|R.MOVER)&&p&(DIRS[i]<<4)))return true;}return false;}
 // LevelData.flushStatus retains a turner's facing and clears transient status.
 flushStatus(x,y,radius){for(let r=y-radius;r<=y+radius;r++)for(let c=x-radius;c<=x+radius;c++)if(this.inside(c,r)){let p=this.map[r][c];if(!(p&R.TURNER))p&=~15;else p&=~240;p&=~(R.ATTACK|R.BLOCKED|R.PUSHED);this.map[r][c]=p;}}
 swap(sx,sy,tx,ty){let source=this.map[sy][sx]&~(15|R.BLOCKED),target=this.map[ty][tx]&~(15|R.BLOCKED);let i=tx>sx?1:tx<sx?3:ty>sy?2:0;this.map[ty][tx]=source|DIRS[i];this.map[sy][sx]=target|EndingCore.oppositeDirection(DIRS[i]);this.events.push({kind:'swap',x:tx,y:ty});}
 // Four upstream branches are unified using the original compass order.
 move(x,y,dir,friendly){let property=this.map[y][x],i=DIRS.indexOf(dir);if(i<0)return{x,y};
  if((property&R.TURNER)&&property&15){property&=~240;property|=(property&15)<<4;property&=~15;}
  property|=dir;this.map[y][x]=property|R.BLOCKED;let[dx,dy]=VECTORS[i],nx=x+dx,ny=y+dy;
  if(!this.inside(nx,ny))return{x,y};let target=this.map[ny][nx];
  if((property&R.TURNER)&&!(property&(dir<<4))){this.map[y][x]=property;this.events.push({kind:'turn',x,y,dir});}
  else if((property&R.PLAYER)&&(target&R.SWAP)){this.swap(x,y,nx,ny);return{x:nx,y:ny};}
  else if(target&R.WALL){}else if(target===R.EMPTY){this.map[ny][nx]=property;this.map[y][x]=0;this.events.push({kind:'move',x:nx,y:ny,from:{x,y},hero:!!(property&R.PLAYER)});return{x:nx,y:ny};}
  else if((target&(R.ENEMY|R.ALLY))&&!(target&friendly)){
   this.map[y][x]=property|R.ATTACK|((target&R.PLAYER)?R.KILLER:0);
   this.events.push({kind:'attack',x:nx,y:ny,from:{x,y},hero:!!(property&R.PLAYER)});this.kill(nx,ny,dir);
  }return{x,y};
 }
 // LevelData.kill/explode: clear before recursively propagating bomb destruction.
 // HP and shield replace the original immediate player death. Empty tiles do
 // not score, walls block the blast, and a visited set bounds explosion chains.
 kill(x,y,dir,explosion=0,visited=new Set()){
  if(!this.inside(x,y))return;let p=this.map[y][x];if(!p||p&(R.INDESTRUCTIBLE|R.VOID))return;
  if(p&R.PLAYER){if(this.hitThisTurn)return;this.hitThisTurn=true;if(this.guard||this.ward>0){if(!this.guard)this.ward--;this.events.push({kind:'shield',x,y});}else{this.hp--;this.events.push({kind:'hurt',x,y});}return;}
  const key=x+','+y;if(visited.has(key))return;visited.add(key);this.map[y][x]=0;
  this.events.push({kind:p&R.BOMB?'blast':p&R.ENEMY?'defeat':'break',x,y,property:p,explosion});
  if(p&R.BOMB)this.explode(x,y,dir,explosion+1,visited);
 }
 explode(x,y,dir,explosion=1,visited=new Set()){
  let opposite=EndingCore.oppositeDirection(dir);
  for(let i=0;i<4;i++){let[dx,dy]=VECTORS[i],nx=x+dx,ny=y+dy;if(this.inside(nx,ny)&&!(this.map[ny][nx]&(R.INDESTRUCTIBLE|R.VOID|R.DOOR))&&!(opposite&DIRS[i])){this.events.push({kind:'spark',x:nx,y:ny});this.kill(nx,ny,DIRS[i],explosion+1,visited);}}
 }
 // LevelData.fillPathMap: wave propagation from the player, traversing floor;
 // list order preserves nearest-first entity resolution and U/R/D/L tie breaks.
 fillPathMap(x,y){let distances=EndingCore.create2DArray(this.width,this.height,Number.MAX_SAFE_INTEGER),q=[{x,y}];distances[y][x]=0;let list=[];
  for(let i=0;i<q.length;i++){let p=q[i];for(let d=0;d<4;d++){let[dx,dy]=VECTORS[d],nx=p.x+dx,ny=p.y+dy;if(!this.inside(nx,ny)||distances[ny][nx]!==Number.MAX_SAFE_INTEGER)continue;distances[ny][nx]=distances[p.y][p.x]+1;let v=this.map[ny][nx];if(v&R.ENEMY)list.push({x:nx,y:ny});if(!(v&(R.WALL|R.VOID)))q.push({x:nx,y:ny});}}
  return {distances,list};
 }
 moveEntities(list,distances){for(const p of list){let{x,y}=p,property=this.map[y][x];if(!(property&R.ENEMY))continue;let dir=0,best=Number.MAX_SAFE_INTEGER;
   if(property&R.TRAP){for(let i=0;i<4;i++){let[dx,dy]=VECTORS[i];if(property&(DIRS[i]<<4)&&this.inside(x+dx,y+dy)&&this.map[y+dy][x+dx]&R.ALLY){dir=DIRS[i];break;}}}
   else for(let i=0;i<4;i++){let[dx,dy]=VECTORS[i],nx=x+dx,ny=y+dy;if(!this.inside(nx,ny))continue;let dest=this.map[ny][nx],v=distances[ny][nx];if(!(dest&(R.WALL|R.ENEMY))&&v<best&&!((property&R.MOVER)&&!(property&(DIRS[i]<<4)))){dir=DIRS[i];best=v;}}
   if(dir)this.move(x,y,dir,R.ENEMY);
  }}
 playerTurn(dir){if(this.blockedDir(dir))return false;this.events=[];this.hitThisTurn=false;this.guard=false;this.flushStatus(this.player.x,this.player.y,10);this.player=this.move(this.player.x,this.player.y,dir,R.ALLY);this.turns++;return true;}
 enemyTurn(){const {list,distances}=this.fillPathMap(this.player.x,this.player.y);this.moveEntities(list,distances);this.guard=false;}
 fullTurn(dir){if(!this.playerTurn(dir))return false;this.enemyTurn();return true;}
 enemies(){let out=[];for(let y=0;y<this.height;y++)for(let x=0;x<this.width;x++)if(this.map[y][x]&R.ENEMY)out.push({x,y,property:this.map[y][x]});return out;}
 snapshot(){return clone({map:this.map,player:this.player,hp:this.hp,ward:this.ward,turns:this.turns});}
 static restore(s){let e=new EndingCore(s.map,s.player);e.map=clone(s.map);e.hp=s.hp;e.ward=s.ward;e.turns=s.turns;return e;}
}

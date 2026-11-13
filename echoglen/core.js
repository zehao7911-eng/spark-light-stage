import {generateSquareMaze} from './source-maze.js';
export const C=64,OX=72,OY=64,W=720,H=960;
export const cell=(x,y)=>({x:OX+(x+.5)*C,y:OY+(y+.5)*C});
export const tile=(x,y)=>({x:Math.floor((x-OX)/C),y:Math.floor((y-OY)/C)});
export const CHAPTERS=['THE LANTERN WOODS','THE MOON LIBRARY','THE AMBER GLASSHOUSE'];
const defs=[
 {name:'A Little Help',hint:'Leave an echo on the moon pad.',start:[4,10],slots:1,required:['a'],grid:[
 '#########','#.......#','#...e...#','#...m...#','#.......#','####A####','#.......#','#...m...#','#.......#','#...m...#','#...a...#','#.......#','#########']},
 {name:'The Long Way',hint:'Your echo keeps the way open.',start:[2,10],slots:1,required:['a'],grid:[
 '#########','#.......#','#.....e.#','#....m..#','#.......#','######A##','#m......#','#.#####.#','#......m#','#.......#','#.a.....#','#.......#','#########']},
 {name:'A Breath of Wind',hint:'Wait for the breeze, then cross.',start:[4,10],slots:1,required:['a'],wind:[{x:3,y:7,dx:1,dy:0,length:4,phase:0}],grid:[
 '#########','#.......#','#.....e.#','#.m.....#','####A####','#.......#','#.....m.#','#.......#','#.......#','#...m...#','#...a...#','#.......#','#########']},
 {name:'Two Little Shadows',hint:'Two pads. Two helpful echoes.',start:[2,10],slots:2,required:['a','b'],grid:[
 '#########','#...e...#','#.....m.#','####C####','#.......#','#.......#','#.....b.#','#..m....#','####A####','#.......#','#.a..m..#','#.......#','#########']},
 {name:'Folded Moonlight',hint:'Bellflowers fold the room in two.',start:[2,10],slots:1,required:['a'],grid:[
 '#########','#...e...#','#.u...m.#','#########','#.......#','#m....v.#','####A####','#.......#','#....m..#','#.......#','#.a.....#','#.......#','#########']},
 {name:'The Borrowed Key',hint:'Leave both lanterns shining.',start:[2,10],slots:2,required:['a','b'],wind:[{x:2,y:6,dx:1,dy:0,length:4,phase:1.2}],grid:[
 '#########','#.....e.#','#.m...u.#','####C####','#.......#','#.....b.#','#.v.....#','#...m...#','####A####','#.......#','#.a..m..#','#.......#','#########']},
 {name:'Sleepy Dreamkeepers',hint:'Give the drifting dreams some room.',start:[4,10],slots:1,required:['a'],hazards:[{a:[2,8],b:[6,8],phase:0,speed:.7},{a:[2,3],b:[6,3],phase:2,speed:.6}],grid:[
 '#########','#.......#','#.....e.#','#.m.....#','#.......#','####A####','#.......#','#.....m.#','#.......#','#...m...#','#...a...#','#.......#','#########']},
 {name:'A Shadow to Spare',hint:'Move your echo to the next pad.',start:[2,10],slots:1,required:['b'],grid:[
 '#########','#...e...#','#.....m.#','####B####','#.......#','#.....b.#','#.m.....#','#.......#','####A####','#.......#','#.a..m..#','#.......#','#########']},
 {name:'The Moon Bell',hint:'A little courage. A little help.',start:[2,10],slots:2,required:['a','b'],wind:[{x:2,y:6,dx:1,dy:0,length:5,phase:.7}],hazards:[{a:[2,5],b:[6,5],phase:0,speed:.6},{a:[3,2],b:[6,2],phase:1.5,speed:.5}],grid:[
 '#########','#...e...#','#.u...m.#','####C####','#.......#','#.....b.#','#.m...v.#','#.......#','####A####','#.......#','#.a..m..#','#.......#','#########']}
];
export const LEVELS=defs.map((l,i)=>parse({...l,id:i,chapter:Math.floor(i/3)}));
function parse(l){const pads=[],gates=[],moths=[],portals=[],walls=[];let exit;
 if(l.grid.length!==13||l.grid.some(r=>r.length!==9))throw Error('Bad room '+l.name);
 for(let y=0;y<13;y++)for(let x=0;x<9;x++){const ch=l.grid[y][x];if(ch==='#')walls.push({x,y});if('abc'.includes(ch))pads.push({id:ch,x,y});if('ABC'.includes(ch))gates.push({id:ch,x,y,requires:ch==='C'?['a','b']:[ch.toLowerCase()]});if(ch==='m')moths.push({x,y});if(ch==='e')exit={x,y};if(ch==='u'||ch==='v')portals.push({id:ch,x,y});}
 return {...l,pads,gates,moths,portals,walls,exit,wind:l.wind||[],hazards:l.hazards||[]};
}
export function dream(seed=1){let r=seed>>>0||1;const random=()=>{r=(Math.imul(r,1664525)+1013904223)>>>0;return r/4294967296;};const maze=generateSquareMaze(9,random),rows=Array.from({length:13},()=>Array(9).fill('#'));
 for(let y=0;y<9;y++)for(let x=0;x<9;x++)if(!maze[x][y])rows[y+2][x]='.';
 const path=searchGrid(rows,[1,3],[7,9]);rows[3][1]='a';rows[9][7]='e';const g=path[Math.floor(path.length*.5)];rows[g[1]][g[0]]='A';for(const t of [.22,.68,.82]){const p=path[Math.floor(path.length*t)];if(rows[p[1]][p[0]]==='.')rows[p[1]][p[0]]='m';}
 return parse({id:9,seed,name:'A Dream Beyond',hint:'A new path, a familiar little light.',start:[1,3],slots:1,required:['a'],grid:rows.map(r=>r.join('')),chapter:seed%3,wind:[],hazards:[]});
}
function searchGrid(grid,start,end){const q=[start],prev=new Map([[start.join(','),null]]);for(let i=0;i<q.length;i++){const [x,y]=q[i];if(x===end[0]&&y===end[1]){const out=[];let k=end.join(',');while(k){out.push(k.split(',').map(Number));k=prev.get(k);}return out.reverse();}for(const [dx,dy] of [[0,-1],[1,0],[0,1],[-1,0]]){const nx=x+dx,ny=y+dy,k=nx+','+ny;if(grid[ny]?.[nx]!==undefined&&grid[ny][nx]!=='#'&&!prev.has(k)){prev.set(k,x+','+y);q.push([nx,ny]);}}}return [];}
export class World {
 constructor(id=0,seed=1){this.level=id===9?dream(seed):LEVELS[id];if(!this.level)throw Error('Unknown glade');this.id=id;this.seed=seed;const p=cell(...this.level.start);this.hero={...p,dir:0,walk:0};this.echoes=[];this.moths=0;this.hearts=3;this.hits=0;this.echoUses=0;this.time=0;this.distance=0;this.status='playing';this.invincible=0;this.portalLatch=-1;this.path=[];this.goal=null;this.fog=[];this.events=[];this.updateFog();}
 standing(){return this.level.pads.find(p=>Math.hypot(this.hero.x-cell(p.x,p.y).x,this.hero.y-cell(p.x,p.y).y)<25);}
 held(id){const p=this.level.pads.find(p=>p.id===id);if(!p)return false;return this.echoes.includes(id);}
 gateOpen(g){const p=tile(this.hero.x,this.hero.y);return g.requires.every(k=>this.held(k))||(p.x===g.x&&p.y===g.y);}
 solid(x,y){if(x<0||x>=9||y<0||y>=13||this.level.grid[y][x]==='#')return true;const g=this.level.gates.find(g=>g.x===x&&g.y===y);return g?!this.gateOpen(g):false;}
 actionLabel(){const p=this.standing();if(p&&!this.echoes.includes(p.id))return this.echoes.length>=this.level.slots?'MOVE ECHO':'LEAVE ECHO';return this.echoes.length?'RECALL':'ECHO';}
 echo(){if(this.status!=='playing')return [];const p=this.standing();this.path=[];this.goal=null;
  if(p&&!this.echoes.includes(p.id)){const moved=this.echoes.length>=this.level.slots?this.echoes.shift():null;this.echoes.push(p.id);this.echoUses++;return [{type:'echo',id:p.id,moved,...cell(p.x,p.y)}];}
  if(this.echoes.length){this.echoes=[];return [{type:'recall',...this.hero}];}
  return [{type:'guide',text:'Stand on a moon pad to leave an echo.'}];
 }
 routeTo(x,y,resolvePortal=true){if(this.status!=='playing')return false;let t=tile(x,y);if(this.solid(t.x,t.y))return false;
  const targetPortal=this.level.portals.findIndex(p=>p.x===t.x&&p.y===t.y);if(resolvePortal&&targetPortal>=0&&this.level.portals.length===2){const p=this.level.portals[1-targetPortal];t={x:p.x,y:p.y};}
  const from=tile(this.hero.x,this.hero.y),q=[{x:from.x,y:from.y,path:[],cost:0}],best=new Map([[from.x+','+from.y,0]]);
  while(q.length){q.sort((a,b)=>a.cost-b.cost);const cur=q.shift();if(cur.cost!==best.get(cur.x+','+cur.y))continue;if(cur.x===t.x&&cur.y===t.y){this.path=cur.path;this.goal={x:t.x,y:t.y};return true;}
   for(const [dx,dy] of [[0,-1],[1,0],[0,1],[-1,0]]){const nx=cur.x+dx,ny=cur.y+dy;if(this.solid(nx,ny))continue;if(nx===this.level.exit.x&&ny===this.level.exit.y&&(t.x!==nx||t.y!==ny))continue;let ex=nx,ey=ny,steps=[[nx,ny]];const pi=this.level.portals.findIndex(p=>p.x===nx&&p.y===ny);if(pi>=0&&this.level.portals.length===2){const dest=this.level.portals[1-pi];ex=dest.x;ey=dest.y;steps.push([ex,ey]);}const key=ex+','+ey;const alongDream=dx!==0&&this.level.hazards.some(h=>h.a[1]===ny&&h.b[1]===ny&&nx>=Math.min(h.a[0],h.b[0])&&nx<=Math.max(h.a[0],h.b[0]));const cost=cur.cost+1+(alongDream?35:0);if(cost<(best.get(key)??Infinity)){best.set(key,cost);q.push({x:ex,y:ey,path:cur.path.concat(steps),cost});}}
  }return false;
 }
 collision(x,y){const r=13;for(let gy=Math.floor((y-OY-r)/C);gy<=Math.floor((y-OY+r)/C);gy++)for(let gx=Math.floor((x-OX-r)/C);gx<=Math.floor((x-OX+r)/C);gx++){if(!this.solid(gx,gy))continue;const ax=OX+gx*C,ay=OY+gy*C,px=Math.max(ax,Math.min(x,ax+C)),py=Math.max(ay,Math.min(y,ay+C));if(Math.hypot(x-px,y-py)<r)return true;}return false;}
 updateFog(){this.fog=this.level.hazards.map(h=>{const p=cell(...h.a),q=cell(...h.b),t=(Math.sin(this.time*h.speed+h.phase)+1)/2;return {x:p.x+(q.x-p.x)*t,y:p.y+(q.y-p.y)*t};});}
 step(dt=1/60,input=null){if(this.status!=='playing')return [];dt=Math.max(0,Math.min(.05,dt));const ev=[],openBefore=this.level.gates.map(g=>this.gateOpen(g));this.time+=dt;this.invincible=Math.max(0,this.invincible-dt);let dx=input?.x||0,dy=input?.y||0;
  if(Math.hypot(dx,dy)>.05){this.path=[];this.goal=null;}else if(this.path.length){let q=cell(...this.path[0]);const d=Math.hypot(q.x-this.hero.x,q.y-this.hero.y);if(d<4){this.hero.x=q.x;this.hero.y=q.y;this.path.shift();q=this.path.length?cell(...this.path[0]):this.hero;}dx=q.x-this.hero.x;dy=q.y-this.hero.y;}
  const len=Math.hypot(dx,dy),speed=174;if(len>.01){dx/=len;dy/=len;if(Math.abs(dx)>Math.abs(dy))this.hero.dir=dx>0?2:3;else this.hero.dir=dy>0?0:1;const old={x:this.hero.x,y:this.hero.y};const nx=this.hero.x+dx*speed*dt;if(!this.collision(nx,this.hero.y))this.hero.x=nx;const ny=this.hero.y+dy*speed*dt;if(!this.collision(this.hero.x,ny))this.hero.y=ny;const dist=Math.hypot(this.hero.x-old.x,this.hero.y-old.y);this.distance+=dist;this.hero.walk+=dist*.075;}
  for(const [i,w] of this.level.wind.entries()){const active=((this.time+w.phase)%4)<1.7;if(!active)continue;const p=cell(w.x,w.y);if(this.hero.x>p.x-22&&this.hero.x<p.x+w.length*C&&Math.abs(this.hero.y-p.y)<25){const nx=this.hero.x+w.dx*74*dt,ny=this.hero.y+w.dy*74*dt;if(!this.collision(nx,ny)){this.hero.x=nx;this.hero.y=ny;}}}
  this.updateFog();for(const f of this.fog){if(!this.invincible&&Math.hypot(f.x-this.hero.x,f.y-this.hero.y)<31){this.hearts--;this.hits++;this.invincible=2;ev.push({type:'hit',x:this.hero.x,y:this.hero.y});Object.assign(this.hero,cell(...this.level.start));this.path=[];this.goal=null;if(!this.hearts){this.status='lost';ev.push({type:'lose'});}break;}}
  this.level.moths.forEach((m,i)=>{const p=cell(m.x,m.y);if(!(this.moths&(1<<i))&&Math.hypot(p.x-this.hero.x,p.y-this.hero.y)<28){this.moths|=1<<i;ev.push({type:'moth',i,...p});}});
  const ps=this.level.portals;const onPortal=ps.findIndex(p=>Math.hypot(cell(p.x,p.y).x-this.hero.x,cell(p.x,p.y).y-this.hero.y)<22);
  if(this.portalLatch>=0){const p=cell(ps[this.portalLatch].x,ps[this.portalLatch].y);if(Math.hypot(p.x-this.hero.x,p.y-this.hero.y)>38)this.portalLatch=-1;}
  if(onPortal>=0&&this.portalLatch<0&&ps.length===2){const dst=1-onPortal;Object.assign(this.hero,cell(ps[dst].x,ps[dst].y));this.portalLatch=dst;const goal=this.goal;this.path=[];if(goal)this.routeTo(cell(goal.x,goal.y).x,cell(goal.x,goal.y).y,false);ev.push({type:'portal',...this.hero});}
  const e=cell(this.level.exit.x,this.level.exit.y);if(this.status==='playing'&&Math.hypot(e.x-this.hero.x,e.y-this.hero.y)<28){if(this.level.required.every(k=>this.held(k))){this.status='won';this.path=[];this.goal=null;ev.push({type:'win',...e});}else if(!this.exitHint||this.time-this.exitHint>3){ev.push({type:'guide',text:'Leave an echo on each needed lantern.'});this.exitHint=this.time;}}
  this.level.gates.forEach((g,i)=>{if(this.gateOpen(g)!==openBefore[i])ev.push({type:'gate',open:this.gateOpen(g),...cell(g.x,g.y)});});return ev;
 }
 count(){return this.moths.toString(2).split('1').length-1;}
 stars(){return this.status==='won'?1+(this.count()===this.level.moths.length?1:0)+(this.hits===0?1:0):0;}
 score(){return this.status==='won'?300+this.count()*100+Math.max(0,100-this.hits*25):0;}
 save(){return {version:1,id:this.id,seed:this.seed,hero:{...this.hero},echoes:[...this.echoes],moths:this.moths,hearts:this.hearts,hits:this.hits,echoUses:this.echoUses,time:this.time,distance:this.distance,invincible:this.invincible,portalLatch:this.portalLatch,status:this.status};}
}
export function restore(s){if(!s||s.version!==1||!Number.isInteger(s.id)||s.id<0||s.id>9||!Number.isSafeInteger(s.seed)||s.seed<0||s.seed>1e9||s.status!=='playing')throw Error('Invalid journey');const w=new World(s.id,s.seed),p=s.hero;if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<OX||p.x>OX+9*C||p.y<OY||p.y>OY+13*C||!Number.isInteger(p.dir)||p.dir<0||p.dir>3||!Number.isFinite(p.walk)||p.walk<0)throw Error('Invalid fox');if(!Array.isArray(s.echoes)||s.echoes.length>w.level.slots||new Set(s.echoes).size!==s.echoes.length||s.echoes.some(id=>!w.level.pads.some(p=>p.id===id)))throw Error('Invalid echoes');for(const k of ['moths','hearts','hits','echoUses'])if(!Number.isSafeInteger(s[k])||s[k]<0||s[k]>1e6)throw Error('Invalid progress');if(s.hearts<1||s.hearts>3||s.moths>=(1<<w.level.moths.length)||s.portalLatch< -1||s.portalLatch>=w.level.portals.length||!Number.isInteger(s.portalLatch))throw Error('Invalid collectible');for(const k of ['time','distance','invincible'])if(!Number.isFinite(s[k])||s[k]<0||s[k]>1e9)throw Error('Invalid clock');Object.assign(w,{hero:{...p},echoes:[...s.echoes],moths:s.moths,hearts:s.hearts,hits:s.hits,echoUses:s.echoUses,time:s.time,distance:s.distance,invincible:Math.min(2,s.invincible),portalLatch:s.portalLatch});w.updateFog();return w;}

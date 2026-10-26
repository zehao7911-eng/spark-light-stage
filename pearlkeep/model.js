import {orbium} from './source-engine.js';
export const EMPTY=-1;
export const NAMES=['A Little Gift','Sea Glass','Moon Drops','The Pearl Exchange','Golden Hour','Tidal Treasures','Velvet Evening','The Grand Keepsake'];
export const TITLES=['Coral','Sea glass','Moonstone','Honey'];
export function rng(seed){let s=seed>>>0;return ()=>{s=(s+0x6D2B79F5)>>>0;let t=Math.imul(s^s>>>15,1|s);t^=t+Math.imul(t^t>>>7,61|t);return ((t^t>>>14)>>>0)/4294967296;};}
export function neighbor(i,d){let x=i%2,y=i>>1;return d===0?(y?i-2:-1):d===1?(x?-1:i+1):d===2?(y?-1:i+2):(x?i-1:-1);}
export const copy=x=>JSON.parse(JSON.stringify(x));
export function rotateGrid(a,i){const b=copy(a);b[i]=[a[i][1],a[i][2],a[i][3],a[i][0]];return b;}
export function transferGrid(a,i,d){let j=neighbor(i,d),op=(d+2)%4;if(j<0||a[i][d]<0||a[j][op]>=0)return null;const b=copy(a);b[j][op]=b[i][d];b[i][d]=-1;return b;}
function normalize(a){return a.map(row=>row.every(c=>c>=0&&c===row[0])?[-1,-1,-1,-1]:row.slice());}
export function makePuzzle(level=0,seed=341,attempt=0){
 if(level===0)return {active:[0,1],grid:[[0,-1,0,0],[-1,-1,-1,0],[-1,-1,-1,-1],[-1,-1,-1,-1]],guide:[{kind:'send',i:1,d:3}],par:1,groups:1};
 const active=level===1?[0,1,2]:[0,1,2,3],groups=active.length-1;
 const rand=rng(seed+level*21973+attempt*91393);let grid=Array.from({length:4},()=>[-1,-1,-1,-1]),history=[];
 const colors=level<3?[0,1,2]:[level%4,(level+1)%4,(level+2)%4];
 for(let k=0;k<groups;k++)grid[active[k]]=Array(4).fill(colors[k]);
 const rounds=level===1?16:24+Math.min(level,12)*4;
 for(let k=0;k<rounds;k++){
  const available=[];
  for(const i of active)for(let d=0;d<4;d++){const j=neighbor(i,d);if(active.includes(j)&&grid[i][d]>=0&&grid[j][(d+2)%4]<0)available.push({kind:'send',i,d});}
  // Rotation opens new routes; do not spend the whole scramble spinning.
  let action=available.length&&rand()<.76?available[Math.floor(rand()*available.length)]:{kind:'rotate',i:active[Math.floor(rand()*active.length)]};
  if(action.kind==='rotate'){grid=rotateGrid(grid,action.i);history.push(action);}else{grid=transferGrid(grid,action.i,action.d);history.push(action);}
 }
 // Inverting the actual legal scramble guarantees a route. Cleared whole colors
 // can be omitted from the reverse route without affecting any other color.
 let guide=[];
 for(const a of history.reverse())if(a.kind==='rotate')for(let j=0;j<3;j++)guide.push({...a});else guide.push({kind:'send',i:neighbor(a.i,a.d),d:(a.d+2)%4});
 // Reduce adjacent inverse rotations and simulate the guide with automatic clears.
 const reduced=[];for(const a of guide){const tail=reduced.slice(-3);if(a.kind==='rotate'&&tail.length===3&&tail.every(x=>x.kind==='rotate'&&x.i===a.i))reduced.splice(-3);else reduced.push(a);}
 let sim=normalize(grid),real=[];
 for(const a of reduced){if(a.kind==='rotate'){if(sim[a.i].some(c=>c>=0)){sim=rotateGrid(sim,a.i);real.push(a);}}else{const b=transferGrid(sim,a.i,a.d);if(b){sim=normalize(b);real.push(a);}}}
 if(sim.flat().some(c=>c>=0))throw Error('Invalid generated reverse route');
 // Remove repeated states (including moving the same pearl out and back) so
 // the optional route teaches purposeful moves rather than the scramble history.
 let route=[],states=[normalize(grid)];
 for(const a of real){const current=states.at(-1),next=normalize(a.kind==='rotate'?rotateGrid(current,a.i):transferGrid(current,a.i,a.d));const seen=states.findIndex(b=>JSON.stringify(b)===JSON.stringify(next));if(seen>=0){route=route.slice(0,seen);states=states.slice(0,seen+1);}else{route.push(a);states.push(next);}}
 if(attempt<100&&(grid.some(row=>row[0]>=0&&row.every(c=>c===row[0]))||route.length<Math.min(3+level,10)))return makePuzzle(level,seed,attempt+1);
 return {active,grid,guide:route,par:route.length,groups};
}
export class Session{
 constructor(level=0,seed=341,saved=null){if(!Number.isInteger(level)||level<0||level>1000||!Number.isInteger(seed)||seed<0||seed>4294967295)throw Error('Invalid puzzle');this.level=level;this.seed=seed;this.puzzle=makePuzzle(level,seed);this.moves=0;this.groups=0;this.collection=[];this.score=0;this.undos=0;this.helped=false;this.status='playing';this.t=0;this.events=[];this.history=[];this.guideIndex=0;this.guided=false;
  this.bind();this.tiles=Array.from({length:4},(_,i)=>new orbium.Rotator(i,i%2,i>>1));this.marbles=[];this.matcher=null;this.sequencer=null;this.counter={isLaunchAllowed:()=>true,countActiveMarbles:()=>{}};
  this.tiles.forEach((t,i)=>{t.hasPaths=Array.from({length:4},(_,d)=>this.puzzle.active.includes(i)&&this.puzzle.active.includes(neighbor(i,d)));this.setWorldSlots(t,this.puzzle.grid[i]);});
  if(saved)this.restore(saved);else this.checkRotatorsFull();
 }
 bind(){orbium.machine=this;orbium.player={play:()=>{}};}
 setWorldSlots(tile,slots){tile.setState({count:tile.count,orientation:0,dockees:slots.map((c,p)=>c<0?null:{pos:p,color:c,frame:0}).filter(Boolean)});}
 slots(i){const t=this.tiles[i],a=[-1,-1,-1,-1];for(const d of t.view())a[(d.pos+t.orientation)%4]=d.color;return a;}
 allSlots(){return this.tiles.map((_,i)=>this.slots(i));}
 busy(){return this.marbles.length>0||this.tiles.some(t=>t.busy());}
 onMatch(tile,color){this.groups++;this.collection.push(color);this.score+=400+this.groups*100;this.events.push({type:'match',i:tile.count,color,groups:this.groups});}
 checkRotatorsFull(){this.bind();for(const t of this.tiles)t.checkFull();}
 checkLevelComplete(){if(this.status==='playing'&&!this.busy()&&this.tiles.every(t=>!t.view().length)){this.status='won';this.events.push({type:'win'});}}
 act(action){
  if(this.status!=='playing'||this.busy()||!this.puzzle.active.includes(action.i))return false;
  this.bind();const t=this.tiles[action.i];
  if(action.kind==='send'){
   const j=neighbor(action.i,action.d);if(!this.puzzle.active.includes(j)||this.slots(action.i)[action.d]<0||this.slots(j)[(action.d+2)%4]>=0)return false;
  }else if(action.kind!=='rotate'||!t.view().length)return false;
  const previous=this.snapshot(false);this.history.push(previous);if(this.history.length>80)this.history.shift();this.moves++;
  if(action.kind==='rotate')t.rotate(false);else if(!t.launchDirection(action.d,false))throw Error('Source rejected validated transfer');
  this.events.push({type:action.kind,i:action.i,d:action.d});return true;
 }
 step(dt){if(this.status!=='playing')return;this.bind();this.t+=dt;for(const t of this.tiles)t.update(dt);
  for(const m of this.marbles){m.update(dt);for(const t of this.tiles)if(!m.stale)t.influence(m);}
  this.marbles=this.marbles.filter(m=>!m.stale);this.checkLevelComplete();
 }
 stars(){return this.status==='won'?1+(this.undos===0&&!this.helped?1:0)+(this.moves<=this.puzzle.par+4?1:0):0;}
 snapshot(withHistory=true){return copy({v:1,level:this.level,seed:this.seed,moves:this.moves,groups:this.groups,collection:this.collection,score:this.score,undos:this.undos,helped:this.helped,status:this.status,t:this.t,guideIndex:this.guideIndex,guided:this.guided,tiles:this.tiles.map(t=>({state:t.getState(),anim:t.animState()})),marbles:this.marbles.map(m=>m.getState()),history:withHistory?this.history:[]});}
 restore(s){if(!s||s.v!==1||s.level!==this.level||s.seed!==this.seed||!Array.isArray(s.tiles)||s.tiles.length!==4)throw Error('Invalid save');this.bind();
  for(const key of ['moves','groups','score','undos','t','guideIndex'])if(!Number.isFinite(s[key])||s[key]<0)throw Error('Invalid counters');
  if(!['playing','won'].includes(s.status)||s.moves>100000||s.groups>3)throw Error('Invalid progress');
  for(const row of s.tiles){if(![0,1,2,3].includes(row.state.orientation))throw Error('Invalid rotation');const ps=new Set();for(const d of row.state.dockees||[]){if(![0,1,2,3].includes(d.pos)||ps.has(d.pos)||![0,1,2,3].includes(d.color))throw Error('Invalid pearl');ps.add(d.pos);}for(const key of ['judderc','blockc','fullc','stage'])if(!Number.isFinite(row.anim[key])||row.anim[key]<-1||row.anim[key]>1000)throw Error('Invalid animation');}
  if(!Array.isArray(s.marbles)||s.marbles.length>1)throw Error('Invalid flight');for(const m of s.marbles)if(!Number.isFinite(m.xpos)||!Number.isFinite(m.ypos)||![0,1,2,3].includes(m.direction)||![0,1,2,3].includes(m.color))throw Error('Invalid moving pearl');
  if(!Array.isArray(s.collection)||s.collection.length!==s.groups||s.collection.some(c=>![0,1,2,3].includes(c)))throw Error('Invalid collection');this.collection=s.collection.slice();
  for(const key of ['moves','groups','score','undos','helped','status','t','guideIndex','guided'])this[key]=s[key];
  s.tiles.forEach((row,i)=>{this.tiles[i].setState(row.state);this.tiles[i].restoreAnim(row.anim);});this.marbles=s.marbles.map(m=>{const a=new orbium.Marble(m.xpos,m.ypos,m.color,m.frame,m.direction,false);a.frame=m.frame;a.framec=m.framec;return a;});this.history=Array.isArray(s.history)?s.history.slice(-80):[];this.events=[];
 }
 undo(){if(this.busy()||!this.history.length||this.status!=='playing')return false;const stack=this.history.slice(),s=stack.pop(),count=this.undos+1;try{this.restore(s);}catch{this.history=[];return false;}this.history=stack;this.undos=count;this.guided=false;this.events.push({type:'undo'});return true;}
 startGuide(){const undos=this.undos;const fresh=new Session(this.level,this.seed);this.restore(fresh.snapshot());this.undos=undos;this.helped=true;this.guided=true;this.guideIndex=0;}
 nextGuide(){if(!this.guided||this.busy()||this.status!=='playing')return null;const plan=this.puzzle.guide;while(this.guideIndex<plan.length){const a=plan[this.guideIndex];if(a.kind==='send'&&this.slots(a.i)[a.d]<0){this.guideIndex++;continue;}return a;}return null;}
 guideAct(action){const guide=this.nextGuide();if(guide&&(guide.kind!==action.kind||guide.i!==action.i||(guide.kind==='send'&&guide.d!==action.d)))return false;const ok=this.act(action);if(ok&&guide)this.guideIndex++;return ok;}
}
export function profile(raw){const p={stars:Array(8).fill(0),best:Array(8).fill(0),mute:true,skin:0,expedition:0};try{if(!raw||!Array.isArray(raw.stars)||raw.stars.length!==8)return p;p.stars=raw.stars.map(n=>Number.isInteger(n)?Math.max(0,Math.min(3,n)):0);p.best=p.best.map((_,i)=>Math.max(0,Math.min(1e8,Number(raw.best?.[i])||0)));p.mute=raw.mute!==false;p.skin=[0,1,2].includes(raw.skin)?raw.skin:0;p.expedition=Math.max(0,Math.min(999,raw.expedition|0));}catch{}return p;}
export function award(p,s){if(s.status!=='won')return;const i=s.level;if(i<8){p.stars[i]=Math.max(p.stars[i],s.stars());p.best[i]=Math.max(p.best[i],s.score);}else p.expedition=Math.max(p.expedition,i-7);}

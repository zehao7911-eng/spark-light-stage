import {Beat,hitDrums,DIRS} from './source-beat.js';
// Authored routes, independent of the original game's 32x32 levels/assets.
const paths=[
 [[0,2],[2,2],[2,0]],
 [[0,3],[3,3],[3,1],[1,1]],
 [[0,1],[2,1],[2,3],[4,3],[4,0]],
 [[0,4],[1,4],[1,1],[4,1],[4,3],[2,3]],
 [[0,0],[3,0],[3,4],[1,4],[1,2],[4,2]],
 [[0,2],[1,2],[1,0],[4,0],[4,4],[2,4],[2,2]],
 [[0,4],[4,4],[4,1],[1,1],[1,3],[3,3],[3,0]],
 [[0,1],[4,1],[4,4],[0,4],[0,3],[2,3],[2,0]],
 [[0,3],[3,3],[3,0],[1,0],[1,2],[4,2],[4,4]],
 [[0,0],[4,0],[4,3],[2,3],[2,1],[0,1],[0,4],[3,4]],
 [[0,4],[4,4],[4,0],[0,0],[0,2],[2,2],[2,1]],
 [[0,2],[2,2],[2,4],[4,4],[4,0],[0,0],[0,3],[1,3],[1,1]]
];
const names=['A little spark','A duet for two','Round the corner','The winding waltz','Copper cadence','Pocket sonata','Velvet steps','Moonlight loop','A golden detour','The grand tour','Music in the walls','One last lullaby'];
export const PALETTES=[{name:'COPPER ROOM',bg:'#261f30',wood:'#57382f',felt:'#254853',rim:'#bd8d61',accent:'#efaa84',ink:'#f9e9cf'}, {name:'VELVET HOUR',bg:'#201e35',wood:'#453451',felt:'#384468',rim:'#c39a6e',accent:'#c9a6e5',ink:'#f7e4d4'}, {name:'MOON GARDEN',bg:'#182d32',wood:'#324a47',felt:'#315b5e',rim:'#c2a775',accent:'#9ed5c1',ink:'#f4e8c6'}];
export const COLORS=['#ee9b7e','#e8bf6e','#9ecdb9','#aeb8e2','#dba8cd','#a5d2df','#e8cb9d','#d5a4a1'];
function direction(a,b){return DIRS.findIndex(d=>Math.sign(b[0]-a[0])===d.x&&Math.sign(b[1]-a[1])===d.y);}
export const LEVELS=paths.map((vertices,id)=>{
 const route=[vertices[0]],rotors=[],bells=[];
 for(let s=0;s<vertices.length-1;s++){
  const a=vertices[s],b=vertices[s+1],dir=direction(a,b),d=DIRS[dir],n=Math.abs(b[0]-a[0])+Math.abs(b[1]-a[1]),prefix=route.length;
  for(let t=1;t<=n;t++)route.push([a[0]+d.x*t,a[1]+d.y*t]);
  if(s<vertices.length-2)rotors.push({x:b[0],y:b[1],correct:direction(b,vertices[s+2])});
  // Each segment has a voice, including short segments (a rotor can also chime).
  const candidates=route.slice(prefix).filter(p=>!route.slice(0,prefix).some(q=>q[0]===p[0]&&q[1]===p[1]));
  const mid=[a[0]+d.x*Math.ceil(n/2),a[1]+d.y*Math.ceil(n/2)];
  const p=candidates.sort((a,b)=>Math.abs(a[0]-mid[0])+Math.abs(a[1]-mid[1])-Math.abs(b[0]-mid[0])-Math.abs(b[1]-mid[1]))[0];
  if(!p)throw Error('A phrase needs a fresh note');
  bells.push({x:p[0],y:p[1],note:s});
 }
 const start={x:vertices[0][0],y:vertices[0][1]},end={x:vertices.at(-1)[0],y:vertices.at(-1)[1]};
 return {id,name:names[id],chapter:Math.floor(id/4),start,end,dir:direction(vertices[0],vertices[1]),rotors,bells,route};
});
export class Puzzle {
 constructor(id=0,seed=0){this.id=id;this.seed=seed;this.level=LEVELS[id];if(!this.level)throw Error('Invalid tune');this.dirs=this.level.rotors.map((r,i)=>(r.correct+(id===0?3:1+(i+id+seed)%3))%4);this.initial=[...this.dirs];this.moves=0;this.hints=0;this.attempts=0;this.history=[];this.won=false;this.status='ready';this.par=this.dirs.reduce((n,d,i)=>n+(this.level.rotors[i].correct-d+4)%4,0);this.resetRun();}
 resetRun(){this.beat=new Beat(this.level.start,this.level.dir);this.seen=[];this.visited=[];this.steps=0;this.from={...this.level.start};this.to={...this.level.start};this.events=[];}
 rotate(i){if(this.won||this.status==='playing'||!Number.isInteger(i)||i<0||i>=this.dirs.length)return false;this.history.push([...this.dirs]);this.dirs[i]=(this.dirs[i]+1)%4;this.moves++;this.status='ready';return true;}
 undo(){if(this.won||this.status==='playing'||!this.history.length)return false;this.dirs=this.history.pop();this.moves=Math.max(0,this.moves-1);this.status='ready';return true;}
 hint(){if(this.won||this.status==='playing')return -1;const i=this.dirs.findIndex((d,j)=>d!==this.level.rotors[j].correct);if(i<0)return -1;this.history.push([...this.dirs]);this.dirs[i]=this.level.rotors[i].correct;this.hints++;this.status='ready';return i;}
 play(){if(this.won||this.status==='playing')return false;this.resetRun();this.status='playing';this.attempts++;return true;}
 tick(){if(this.status!=='playing')return [];const ev=[];this.from={...this.beat.grid};this.beat.updateBeat();this.to={...this.beat.grid};this.steps++;
  if(!this.beat.alive){this.status='miss';return [{type:'miss',reason:'edge',...this.to}];}
  const drums=this.level.rotors.map((r,i)=>({...r,bounceDir:this.dirs[i],rotor:i})).concat(this.level.bells.map(b=>({...b,bounceDir:null})));
  for(const h of hitDrums(this.beat,drums)){
   if(h.rotor!==undefined)ev.push({type:'turn',i:h.rotor,x:h.x,y:h.y});
   if(h.note!==undefined&&!this.seen.includes(h.note)){if(h.note!==this.seen.length){this.status='miss';return [...ev,{type:'miss',reason:'order',x:h.x,y:h.y}];}this.seen.push(h.note);ev.push({type:'note',note:h.note,x:h.x,y:h.y});}
  }
  const key=`${this.to.x},${this.to.y},${this.beat.vel.x},${this.beat.vel.y}`;
  if(this.visited.includes(key)){this.status='miss';ev.push({type:'miss',reason:'loop',...this.to});return ev;}this.visited.push(key);
  if(this.to.x===this.level.end.x&&this.to.y===this.level.end.y){if(this.seen.length===this.level.bells.length){this.status='won';this.won=true;ev.push({type:'win',...this.to});}else{this.status='miss';ev.push({type:'miss',reason:'bells',...this.to});}}
  return ev;
 }
 stars(){return this.won?1+(this.hints===0?1:0)+(this.hints===0&&this.moves<=this.par+2?1:0):0;}
 save(){return {id:this.id,seed:this.seed,dirs:[...this.dirs],moves:this.moves,hints:this.hints,attempts:this.attempts,won:this.won};}
}
export function restore(s){if(!s||!Number.isInteger(s.id)||!LEVELS[s.id]||!Number.isSafeInteger(s.seed)||s.seed<0||s.seed>1e6)throw Error('Invalid save');const p=new Puzzle(s.id,s.seed);if(!Array.isArray(s.dirs)||s.dirs.length!==p.dirs.length||s.dirs.some(d=>!Number.isInteger(d)||d<0||d>3))throw Error('Invalid directions');for(const k of ['moves','hints','attempts'])if(!Number.isSafeInteger(s[k])||s[k]<0||s[k]>1e7)throw Error('Invalid count');p.dirs=[...s.dirs];p.moves=s.moves;p.hints=s.hints;p.attempts=s.attempts;/* A restored tune is always ready to replay, never silently completed. */return p;}

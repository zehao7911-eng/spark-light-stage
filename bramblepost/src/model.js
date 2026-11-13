import {Board} from './core/board';
import {setRandom} from './core/native';
import * as triples from './core/triples';
import {evaluate} from './core/evaluate';

export const ITEMS=['Tea','Berries','Honey','Letters','Plums','Moonflowers'];
export const PLACES=['Fern Hollow','Willow Crossing','Honeybank','Glasswood','Plum Orchard','Mothlight Vale','Bluebell Halt','Copper Falls','Moonflower Hill','Starling Grove','Old Observatory','The Last Lantern'];
export const REGIONS=['MORNING POST','THE AMBER LINE','BLUE HOUR MAIL','LANTERNS HOME'];
export const COSTS=[45,110,220,380];
export class Post {
 constructor(data=null,seed=Date.now()) {
  this.state={v:1,seed:seed>>>0,station:0,order:0,coins:0,seals:0,deliveries:0,matches:0,bestChain:0,stock:[0,0,0,0,0,0],gear:[0,0,0],charge:0,mode:'play',reward:false,moves:0,tool:'',companion:0,seen:false};
  if(data?.v===1 && Array.isArray(data.grid)&&data.grid.length===6&&data.grid.every(row=>Array.isArray(row)&&row.length===6&&row.every(n=>Number.isInteger(n)&&n>=0&&n<6))&&Number.isInteger(data.station)&&data.station>=0&&Number.isInteger(data.order)&&data.order>=0&&data.order<=3&&Array.isArray(data.stock)&&data.stock.length===6&&Array.isArray(data.gear)&&data.gear.length===3){
   this.state={...this.state,...JSON.parse(JSON.stringify(data))};this.grid=this.state.grid;delete this.state.grid;this.state.tool='';
  } else this.newBoard();
 }
 random(){let x=this.state.seed;x^=x<<13;x^=x>>>17;x^=x<<5;this.state.seed=(x>>>0)||0x9e3779b9;return this.state.seed/4294967296;}
 get types(){return this.state.station>=5?6:this.state.station>=2?5:4;}
 get place(){return PLACES[this.state.station%12];}
 get limit(){return 18+this.state.gear[0]*3;}
 newBoard(){setRandom(()=>this.random());let b=new Board(6,6,Array.from({length:this.types},(_,i)=>i),false);this.grid=b.orbs;this.ensureMove();}
 snapshot(){return JSON.parse(JSON.stringify({...this.state,grid:this.grid}));}
 shiftGrid(grid,axis,line,amount){
  let g=grid.map(r=>r.slice());let k=((amount%6)+6)%6;
  for(let i=0;i<6;i++)if(axis==='row')g[line][(i+k)%6]=grid[line][i];else g[(i+k)%6][line]=grid[i][line];return g;
 }
 hint(){for(const axis of ['row','col'])for(let line=0;line<6;line++)for(const amount of [1,-1,2,-2,3]){
  const g=this.shiftGrid(this.grid,axis,line,amount);if(triples.find(g).length)return {axis,line,amount};
 }return null;}
 ensureMove(){for(let i=0;i<20;i++) {if(this.hint())return false;setRandom(()=>this.random());const b=new Board(6,6,Array.from({length:this.types},(_,i)=>i),false);this.grid=b.orbs;}throw new Error('No route through this board');}
 needs(){if(this.state.order>=3)return [];let s=this.state.station,o=this.state.order,t=this.types;
  if(s===0&&o===0)return [[0,3]];
  let a=(s+o)%t,b=(a+2+Math.floor(s/4))%t;if(b===a)b=(a+1)%t;
  return [[a,Math.min(9,3+Math.floor(s/3))],[b,Math.min(9,3+Math.floor((s+o)/5))]];
 }
 get ready(){return this.state.mode==='play'&&this.needs().every(([t,n])=>this.state.stock[t]>=n);}
 resolve(extra=null){
  let frames=[],depth=0,initial=extra;
  while(depth<32){let groups=initial?[initial]:triples.combine(triples.find(this.grid));initial=null;if(!groups.length)break;
   let before=this.grid.map(r=>r.slice());const coords=[...new Map(groups.flat().map(c=>[c.join(','),c])).values()];
   let counts=Array(6).fill(0);for(const [r,c]of coords)counts[before[r][c]]++;
   // Use the upstream match marking, gravity and attic-refill pipeline.
   setRandom(()=>this.random());let attic=Array.from({length:6},()=>Array.from({length:6},()=>Math.floor(this.random()*this.types)));
   [this.grid]=evaluate(this.grid,groups,attic);
   depth++;let gain=0;
   for(let t=0;t<6;t++)if(counts[t]){let n=counts[t]+(counts[t]>=4?this.state.gear[1]:0);this.state.stock[t]=Math.min(60,this.state.stock[t]+n);gain+=counts[t];}
   const coins=gain+(depth>1?depth*2:0)+(this.state.station>=6?2:0);
   this.state.coins+=coins;this.state.matches+=gain;
   this.state.charge=Math.min(this.limit,this.state.charge+gain+(this.state.companion===1?1:0));
   frames.push({before,after:this.grid.map(r=>r.slice()),coords,counts,coins,depth});
  }
  // A pathological RNG cascade is bounded. Rebuild only after all counted steps.
  let reshuffled=false;if(triples.find(this.grid).length){this.newBoard();reshuffled=true;}else reshuffled=this.ensureMove();
  this.state.bestChain=Math.max(this.state.bestChain,depth);return {frames,reshuffled,final:this.grid.map(r=>r.slice())};
 }
 shift(axis,line,amount){if(this.state.mode!=='play'||!['row','col'].includes(axis)||!Number.isInteger(line)||line<0||line>5||!Number.isInteger(amount)||amount%6===0)return null;
  this.grid=this.shiftGrid(this.grid,axis,line,amount);this.state.moves++;return this.resolve();
 }
 burst(r,c){if(this.state.station<1||this.state.mode!=='play'||this.state.charge<this.limit||!Number.isInteger(r)||!Number.isInteger(c)||r<0||r>5||c<0||c>5)return null;
  this.state.charge=0;let cells=[];for(let i=0;i<6;i++){cells.push([r,i]);if(i!==r)cells.push([i,c]);}return this.resolve(cells);
 }
 stamp(){if(this.state.station<3||this.state.mode!=='play'||this.state.charge<this.limit)return null;
  this.state.charge=0;const t=this.needs().find(([t,n])=>this.state.stock[t]<n)?.[0]??0;
  const r=Math.floor(this.random()*6);for(let c=0;c<6;c++)this.grid[r][c]=t;return this.resolve();
 }
 deliver(){if(!this.ready)return false;let needs=this.needs();for(const[t,n]of needs)this.state.stock[t]-=n;
  let coins=16+Math.min(30,this.state.station*2)+this.state.gear[2]*4+(this.state.companion===2?6:0);
  this.state.coins+=coins;this.state.deliveries++;this.state.order++;
  if(this.state.order===3){this.state.mode='reward';this.state.seals+=3;this.state.reward=true;}
  return coins;
 }
 next(){if(this.state.mode!=='reward'||!this.state.reward)return false;this.state.station++;this.state.order=0;this.state.mode='play';this.state.reward=false;this.state.charge=Math.min(this.limit,6+this.state.gear[0]*2);this.newBoard();return true;}
 buy(i){if(!Number.isInteger(i)||i<0||i>2)return false;let level=this.state.gear[i],cost=COSTS[level];if(cost===undefined||this.state.coins<cost)return false;this.state.coins-=cost;this.state.gear[i]++;return true;}
 companion(i){if(!Number.isInteger(i)||i<0||i>2||this.state.station<[0,3,7][i])return false;this.state.companion=i;return true;}
}

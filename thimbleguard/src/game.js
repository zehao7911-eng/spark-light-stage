import {EndingCore,R,DIRS,VECTORS,clone} from './ending-core';
export const TITLES=['The little gate','Copper wings','A lesson in sparks','Needle & wind','The moth gallery','Porcelain watch','Light in the roots','A turn of gears','The quiet fountain','Under moon glass','The last sentries','The waking garden'];
// Original 6x6 authored layouts, not Ending's bundled levels.
export const ROOMS=[
 ['.....E','....B.','..oo..','......','..B...','P.....'],
 ['.....E','..#O..','..B...','.o.o..','...B..','P.....'],
 ['....OE','..oo..','...B..','.#..#.','..B...','P.....'],
 ['.....E','.B.#..','..oB..','..o...','.B....','P.....'],
 ['..#..E','....M.','.oo...','...B..','..#...','P..B..'],
 ['.....E','.O..O.','..oo..','......','.B.#..','P.....'],
 ['.....E','.M.#..','..ooB.','..oo..','.#..B.','P.....'],
 ['..#..E','.B.O..','...o..','.o....','..B.M.','P.....'],
 ['....OE','..#...','.oBo..','......','.M..B.','P.....'],
 ['.....E','..B.M.','.o.o..','...O..','.B....','P.....'],
 ['....BE','.O....','..oo..','..#M..','...B..','P.....'],
 ['....OE','.B....','..ooB.','.oo...','.M..B.','P.....']
];
export const GIFTS=[
 {id:'heart',name:'Acorn heart',text:'+1 maximum heart',symbol:'♥',max:3},
 {id:'ward',name:'Silver shell',text:'+1 shield each room',symbol:'◈',max:3},
 {id:'dash',name:'Swift ribbon',text:'+1 dash charge',symbol:'➜',max:3},
 {id:'lamp',name:'Moth lantern',text:'+1 pulse charge',symbol:'✦',max:2},
 {id:'gem',name:'Crystal charm',text:'+2 coins per crystal',symbol:'♦',max:3},
 {id:'bounty',name:'Copper clover',text:'+2 coins per sentry',symbol:'♧',max:3},
 {id:'reach',name:'Long needle',text:'Dash travels 3 stones',symbol:'↠',max:1},
 {id:'bloom',name:'Dew pendant',text:'First crystal heals 1',symbol:'❀',max:1}
];
function makeCore(index,build){let rows=ROOMS[index%12],map=EndingCore.create2DArray(6,6),player,exit;
 for(let y=0;y<6;y++)for(let x=0;x<6;x++){let c=rows[y][x];if(c==='P')player={x,y};if(c==='E')exit={x,y};map[y][x]=c==='#'?R.WALL|R.INDESTRUCTIBLE:c==='B'?R.ENEMY|R.TURNER|R.DOWN:c==='M'?R.ENEMY|R.MOVER|R.M_LEFT|R.M_RIGHT:c==='O'?R.ENEMY|R.TRAP|240:c==='o'?R.ENEMY|R.TRAP|R.BOMB:0;}
 let core=new EndingCore(map,player);core.hp=4+(build.heart||0);core.ward=build.ward||0;return {core,exit};}
export class Game {
 constructor(data=null){this.profile={room:0,completed:0,coins:0,stars:0,build:{},records:{},sound:false};this.history=[];
  if(data?.v===1&&data.profile&&Number.isInteger(data.profile.room)&&data.profile.room>=0&&data.core?.map?.length===6&&data.core.map.every(r=>r.length===6&&r.every(Number.isInteger))){this.profile={...this.profile,...clone(data.profile)};this.core=EndingCore.restore(data.core);this.meta=clone(data.meta);this.exit=clone(data.exit);this.history=clone(data.history||[]).slice(-40);}
  else this.startRoom();
 }
 get room(){return this.profile.room;}
 get maxHP(){return 4+(this.profile.build.heart||0);}
 get alive(){return this.core.hp>0;}
 get sentries(){return this.core.enemies().filter(e=>!(e.property&R.BOMB));}
 get open(){return this.sentries.length===0;}
 startRoom(){let{core,exit}=makeCore(this.room,this.profile.build);this.core=core;this.exit=exit;this.meta={stage:'play',gems:[],turns:0,coins:0,damaged:0,kills:0,dash:2+(this.profile.build.dash||0),pulse:1+(this.profile.build.lamp||0),bloom:false,hinted:false};this.history=[];
  // Three optional crystals, deterministically placed on free floor, away from exit.
  let spots=[[4,4],[0,2],[3,1],[1,3],[4,3],[2,5],[1,1],[5,4]];for(let k=0;k<spots.length&&this.meta.gems.length<3;k++){let[x,y]=spots[(k+this.room)%spots.length];if(this.core.map[y][x]===0&&(x!==exit.x||y!==exit.y))this.meta.gems.push({x,y});}
 }
 snapshot(){return clone({v:1,profile:this.profile,core:this.core.snapshot(),meta:this.meta,exit:this.exit,history:this.history});}
 checkpoint(){return clone({core:this.core.snapshot(),meta:this.meta});}
 undo(){let s=this.history.pop();if(!s)return false;this.core=EndingCore.restore(s.core);this.meta=s.meta;return true;}
 act(dir,mode='walk'){
  if(this.meta.stage!=='play'||!this.alive)return false;
  if(mode!=='guard'&&mode!=='pulse'&&!DIRS.includes(dir))return false;
  if(mode==='dash'&&(this.room<3||this.meta.dash<1))return false;
  if(mode==='pulse'&&(this.room<6||this.meta.pulse<1))return false;
  if((mode==='walk'||mode==='dash')&&this.core.blockedDir(dir))return false;
  const before=this.checkpoint(),hp=this.core.hp;this.history.push(before);this.history=this.history.slice(-40);
  this.core.events=[];this.core.hitThisTurn=false;this.core.guard=false;this.core.flushStatus(this.core.player.x,this.core.player.y,10);
  if(mode==='guard'){this.core.guard=true;this.core.events.push({kind:'guard',...this.core.player});}
  else if(mode==='pulse'){this.meta.pulse--;let{x,y}=this.core.player;for(let i=0;i<4;i++){let[dx,dy]=VECTORS[i];this.core.events.push({kind:'spark',x:x+dx,y:y+dy});this.core.kill(x+dx,y+dy,DIRS[i]);}}
  else if(mode==='dash'){
   this.meta.dash--;let length=this.profile.build.reach?3:2;
   for(let i=0;i<length;i++){if(this.core.blockedDir(dir))break;let old={...this.core.player};this.core.player=this.core.move(old.x,old.y,dir,R.ALLY);this.collect();if(old.x===this.core.player.x&&old.y===this.core.player.y)break;}
  }else this.core.player=this.core.move(this.core.player.x,this.core.player.y,dir,R.ALLY);
  this.core.turns++;this.meta.turns++;this.collect();
  this.core.enemyTurn();this.collect();this.meta.damaged+=Math.max(0,hp-this.core.hp);
  const defeated=this.core.events.filter(e=>e.kind==='defeat');this.meta.kills+=defeated.length;this.meta.coins+=defeated.length*(3+(this.profile.build.bounty||0)*2);
  if(this.open&&this.core.player.x===this.exit.x&&this.core.player.y===this.exit.y&&this.alive)this.meta.stage='reward';
  if(!this.alive)this.meta.stage='fallen';
  return {events:clone(this.core.events),before,after:this.checkpoint()};
 }
 collect(){for(let i=this.meta.gems.length-1;i>=0;i--){let g=this.meta.gems[i];if(g.x===this.core.player.x&&g.y===this.core.player.y){this.meta.gems.splice(i,1);this.meta.coins+=5+(this.profile.build.gem||0)*2;this.core.events.push({kind:'gem',...g});if(this.profile.build.bloom&&!this.meta.bloom){this.core.hp=Math.min(this.maxHP,this.core.hp+1);this.meta.bloom=true;}}}}
 offers(){let pool=GIFTS.filter(g=>(this.profile.build[g.id]||0)<g.max&&!(g.id==='lamp'&&this.room<4));if(!pool.length)return [];let n=(this.room*3)%pool.length;return [pool[n],pool[(n+1)%pool.length],pool[(n+2)%pool.length]].filter((x,i,a)=>a.indexOf(x)===i);}
 claim(id){if(this.meta.stage!=='reward')return false;const offers=this.offers();if(offers.length&&!offers.some(g=>g.id===id))return false;
  const stars=1+(this.meta.gems.length===0?1:0)+(this.meta.damaged===0?1:0);let old=this.profile.records[this.room]||0;this.profile.stars+=Math.max(0,stars-old);this.profile.records[this.room]=Math.max(old,stars);this.profile.completed++;
  this.profile.coins+=this.meta.coins+15+this.room;let gift=GIFTS.find(g=>g.id===id);if(gift)this.profile.build[id]=(this.profile.build[id]||0)+1;
  this.profile.room++;this.startRoom();return true;
 }
 restart(){this.startRoom();}
 forge(id){if(!['heart','ward','dash'].includes(id))return false;let level=this.profile.build[id]||0,cost=(level+1)*60;if(level>=3||this.profile.coins<cost)return false;this.profile.coins-=cost;this.profile.build[id]=level+1;return cost;}
}
// A local state-space search supplies a short safe hint and validates authored
// rooms. It uses only the same legal actions as the player, never hidden RNG.
export function solve(snapshot,{limit=35000,maxDepth=80}={}){
 const initial=new Game(snapshot);if(initial.meta.stage==='reward')return [];
 const q=[],seen=new Map();
 const heuristic=g=>{const p=g.core.player,foes=g.sentries;return foes.length?foes.length*6+Math.min(...foes.map(e=>Math.abs(e.x-p.x)+Math.abs(e.y-p.y))):Math.abs(g.exit.x-p.x)+Math.abs(g.exit.y-p.y);};
 const push=n=>{q.push(n);let i=q.length-1;while(i){let p=(i-1)>>1;if(q[p].score<=n.score)break;q[i]=q[p];i=p;}q[i]=n;};
 const pop=()=>{let first=q[0],last=q.pop();if(q.length){let i=0;while(i*2+1<q.length){let c=i*2+1;if(c+1<q.length&&q[c+1].score<q[c].score)c++;if(q[c].score>=last.score)break;q[i]=q[c];i=c;}q[i]=last;}return first;};
 const key=g=>g.core.player.x+','+g.core.player.y+'|'+g.core.map.flat().map(n=>n&~(R.ATTACK|R.BLOCKED|R.PUSHED|R.KILLER)).join(',')+'|'+g.core.hp+'|'+g.meta.dash+'|'+g.meta.pulse;
 seen.set(key(initial),0);push({g:initial,path:[],score:heuristic(initial)});
 for(let i=0;q.length&&i<limit;i++){
  const {g,path}=pop();if(path.length>=maxDepth)continue;
  const actions=DIRS.map(d=>({dir:d,mode:'walk'})).concat({dir:0,mode:'guard'});
  if(g.room>=3&&g.meta.dash)actions.push(...DIRS.map(d=>({dir:d,mode:'dash'})));
  if(g.room>=6&&g.meta.pulse)actions.push({dir:0,mode:'pulse'});
  for(const action of actions){let n=new Game(g.snapshot());n.history=[];if(!n.act(action.dir,action.mode)||!n.alive)continue;let p=path.concat(action);if(n.meta.stage==='reward')return p;let k=key(n);if((seen.get(k)??Infinity)>p.length){seen.set(k,p.length);if(q.length<limit*2)push({g:n,path:p,score:p.length+heuristic(n)*1.5+(n.maxHP-n.core.hp)*2});}}
 }
 return null;
}

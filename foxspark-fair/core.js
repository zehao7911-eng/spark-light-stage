import {SourceBomb,detectBombCollision,possibleTargets} from './source-bomb.js';
export const W=9,H=11,DIRS=[[0,-1],[1,0],[0,1],[-1,0]];
export const LEVELS=[
 {name:'A Little Spark',theme:0,cages:[[3,9]],boxes:[[5,7],[3,5],[5,3]],seal:[5,5],enemies:[],hint:'Pop the cage. Free the bird.'},
 {name:'Crate Parade',theme:0,cages:[[7,9],[3,3]],boxes:[[3,9],[5,7],[3,7],[5,5],[7,5],[3,1]],seal:[1,1],enemies:[[7,3]],hint:'Two birds. One bright exit.'},
 {name:'Chainlight Lane',theme:0,cages:[[7,7],[1,1]],boxes:[[3,9],[5,3],[3,5]],primed:[[3,7],[5,7]],seal:[7,1],enemies:[[5,1]],hint:'One spark can start a chain.'},
 {name:'Glasshouse Leap',theme:1,cages:[[3,7],[7,3]],boxes:[[5,9],[3,3],[5,1]],water:[[1,5],[3,5],[4,5],[5,5],[7,5]],springs:[[1,6],[7,4]],seal:[1,3],enemies:[[5,3]],hint:'Springboards jump the blue gaps.'},
 {name:'Ripple Rescue',theme:1,cages:[[7,7],[1,1]],boxes:[[3,3],[5,7],[3,9]],primed:[[5,1]],water:[[1,5],[3,5],[5,5],[7,5]],springs:[[1,6],[7,6]],seal:[5,3],enemies:[[3,1]],hint:'Water stops sparks. Find another way.'},
 {name:'Petal Popworks',theme:1,cages:[[3,9],[7,5],[3,1]],boxes:[[5,7],[5,3],[1,3]],primed:[[3,7],[5,5]],water:[[3,5],[7,7]],springs:[[3,6],[7,8]],seal:[7,1],enemies:[[5,1],[1,7]],hint:'Save the flock. Keep the sparks moving.'},
 {name:'Starlit Key',theme:2,cages:[[3,9],[7,3]],boxes:[[5,5],[1,3],[5,7]],key:[5,5],seal:[1,1],enemies:[[7,7]],hint:'Find the brass key inside a crate.'},
 {name:'Echo Arcade',theme:2,cages:[[7,7],[1,3],[5,1]],boxes:[[3,3],[3,9],[5,9]],primed:[[3,7],[5,7],[7,5]],key:[3,3],seal:[7,1],enemies:[[5,3],[1,7]],hint:'Link the red fireworks for a bigger burst.'},
 {name:'The Grand Fair',theme:2,cages:[[7,9],[1,1],[7,3]],boxes:[[3,9],[3,3],[5,5],[5,7]],primed:[[3,7],[5,7]],key:[5,5],water:[[1,5],[7,5]],springs:[[1,6],[7,6]],seal:[5,1],enemies:[[5,3],[1,7]],hint:'Bring every little light home.'}
];
for(const l of LEVELS){for(const [x,y] of [...(l.springs||[])])for(const [dx,dy] of DIRS)if((l.water||[]).some(q=>q[0]===x+dx&&q[1]===y+dy)){const end=[x+2*dx,y+2*dy];if(end[0]>0&&end[0]<8&&end[1]>0&&end[1]<10&&!l.springs.some(q=>q[0]===end[0]&&q[1]===end[1]))l.springs.push(end)}}
export const key=(x,y)=>x+','+y,eq=(a,b)=>a.x===b.x&&a.y===b.y;
export function create(level=0,kit=0,seed=13579){
 const l=LEVELS[level],grid=Array.from({length:H},(_,y)=>Array.from({length:W},(_,x)=>x===0||y===0||x===W-1||y===H-1||x%2===0&&y%2===0?1:0));
 for(const [x,y] of l.boxes||[])grid[y][x]=2;for(const [x,y] of l.cages)grid[y][x]=3;for(const [x,y] of l.water||[])grid[y][x]=4;
 return bind({v:1,level,kit,seed:seed>>>0,grid,player:{x:1,y:9,fromX:1,fromY:9,dir:2,move:0,moveMax:.17,hop:false,escapeBomb:null},hp:kit===3?4:3,maxhp:kit===3?4:3,invul:level===0?4:1,guard:kit===3?1:0,bombs:[],fires:[],enemies:(l.enemies||[]).map(([x,y],i)=>({id:i,x,y,fromX:x,fromY:y,dir:0,move:0,cool:4+i,alive:true})),birds:0,required:l.cages.length,sealed:false,hasKey:!l.key,pickups:[{x:l.seal[0],y:l.seal[1],type:'seal'}],collected:[],hurt:0,score:0,time:0,bombId:1,chain:0,bestChain:0,lastBlast:-99,planted:0,broken:0,won:false,lost:false,ended:false,events:[],history:[],world:null},true);
}
function bind(s,init=false){
 const world={get bombs(){return s.bombs},getTileMaterial(p){const v=s.grid[p.y]?.[p.x];return v===0?'grass':v===2||v===3?'wood':'wall'},onBlast(b){s.chain=s.time-s.lastBlast<.8?s.chain+1:1;s.lastBlast=s.time;s.bestChain=Math.max(s.bestChain,s.chain);s.score+=30*s.chain;s.events.push({type:'blast',x:b.position.x,y:b.position.y,chain:s.chain})},fire(p,b){s.fires.push({x:p.x,y:p.y,ttl:.58,id:b.id})},removeTile(p,b){const v=s.grid[p.y][p.x];s.grid[p.y][p.x]=0;s.broken++;s.score+=20;if(v===3){s.birds++;s.hp=Math.min(s.maxhp,s.hp+1);s.score+=100*s.chain;s.events.push({type:'bird',x:p.x,y:p.y,score:100*s.chain});if(s.birds===s.required)s.events.push({type:'open',x:4,y:1})}else{s.events.push({type:'crate',x:p.x,y:p.y});if(LEVELS[s.level].key?.[0]===p.x&&LEVELS[s.level].key?.[1]===p.y&&!s.hasKey&&!s.pickups.some(q=>q.type==='key'))s.pickups.push({...p,type:'key'})}},removeBomb(b){}};
 s.world=world;
 if(init)for(const [x,y] of LEVELS[s.level].primed||[])s.bombs.push(new SourceBomb(world,{x,y},2,s.bombId++,true));
 else s.bombs=s.bombs.map(b=>{const n=new SourceBomb(world,b.position,b.strength,b.id,b.primed);n.timer=b.timer;n.timerMax=b.timerMax;n.exploded=b.exploded;return n});
 return s;
}
export function material(s,x,y){return s.world.getTileMaterial({x,y})}
export function rng(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296}
export function walkable(s,x,y,escape=null){return s.grid[y]?.[x]===0&&!detectBombCollision(s.bombs,{x,y},escape)}
export function imminent(s,x,y){return s.fires.some(f=>f.ttl>0&&f.x===x&&f.y===y)||s.bombs.some(b=>!b.primed&&b.timerMax-b.timer<.8&&b.getDangerPositions().some(p=>p.x===x&&p.y===y))}
export function plant(s){if(s.ended||s.bombs.filter(b=>!b.exploded&&!b.primed).length>=(s.kit===3?1:2)||s.bombs.some(b=>!b.exploded&&eq(b.position,s.player)))return false;const b=new SourceBomb(s.world,s.player,s.kit===1?3:2,s.bombId++);s.bombs.push(b);s.player.escapeBomb=b.id;s.planted++;s.events.push({type:'plant',x:s.player.x,y:s.player.y,id:b.id});return true}
export function move(s,dir){if(s.ended||s.player.move>0||!Number.isInteger(dir)||dir<0||dir>3)return false;const p=s.player,[dx,dy]=DIRS[dir];p.dir=dir;let x=p.x+dx,y=p.y+dy,hop=false;
 if(s.grid[y]?.[x]===4&&(LEVELS[s.level].springs||[]).some(q=>q[0]===p.x&&q[1]===p.y)&&walkable(s,x+dx,y+dy)){x+=dx;y+=dy;hop=true}
 if(!walkable(s,x,y))return false;p.fromX=p.x;p.fromY=p.y;p.x=x;p.y=y;p.moveMax=(s.kit===2?.125:.17)*(hop?1.8:1);p.move=p.moveMax;p.hop=hop;p.escapeBomb=null;if(hop)s.events.push({type:'hop',x:p.fromX,y:p.fromY});return true}
function hit(s,cause){if(s.invul>0||s.ended)return;if(s.guard){s.guard--;s.invul=2;s.events.push({type:'shield',x:s.player.x,y:s.player.y});return}s.hp--;s.hurt++;s.invul=2;s.events.push({type:'hurt',x:s.player.x,y:s.player.y,cause});if(s.hp<=0){s.lost=s.ended=true;s.events.push({type:'loss'});return}s.player.x=s.player.fromX=1;s.player.y=s.player.fromY=9;s.player.move=0;s.player.escapeBomb=null}
export function step(s,dt=1/60,dir=null){if(s.ended)return;s.time+=dt;s.invul=Math.max(0,s.invul-dt);s.player.move=Math.max(0,s.player.move-dt);if(dir!==null)move(s,dir);
 for(const b of [...s.bombs])b.update(dt);
 s.bombs=s.bombs.filter(b=>!b.exploded);s.fires.forEach(f=>f.ttl-=dt);s.fires=s.fires.filter(f=>f.ttl>0);
 const p=s.player;
 for(const e of s.enemies){if(!e.alive)continue;e.move=Math.max(0,e.move-dt);if(s.fires.some(f=>eq(f,e))){e.alive=false;s.score+=75;s.events.push({type:'enemy',x:e.x,y:e.y});continue}e.cool-=dt;if(e.cool<=0){let choices=possibleTargets(e,q=>walkable(s,q.x,q.y)&&!imminent(s,q.x,q.y));if(choices.length){let next=choices[Math.floor(rng(s)*choices.length)];e.fromX=e.x;e.fromY=e.y;e.x=next.x;e.y=next.y;e.dir=DIRS.findIndex(([dx,dy])=>dx===e.x-e.fromX&&dy===e.y-e.fromY);e.move=.36}e.cool=.6+rng(s)*.35}if(eq(e,p))hit(s,'soot')}
 if(s.fires.some(f=>eq(f,p)))hit(s,'spark');
 if(p.move===0){for(const q of [...s.pickups])if(eq(q,p)){if(q.type==='seal'){s.sealed=true;s.score+=150}else{s.hasKey=true;s.score+=50}s.collected.push(q.type);s.pickups=s.pickups.filter(a=>a!==q);s.events.push({type:q.type,x:q.x,y:q.y})}
 if(p.x===4&&p.y===1&&s.birds>=s.required&&s.hasKey){s.won=s.ended=true;s.score+=300;s.events.push({type:'win',x:4,y:1})}}
 s.events=s.events.slice(-100);
}
export function drain(s){const ev=s.events;s.events=[];return ev}
export function snapshot(s){return {...s,world:undefined,events:[],history:[],bombs:s.bombs.map(b=>({position:b.position,strength:b.strength,id:b.id,primed:b.primed,timer:b.timer,timerMax:b.timerMax,exploded:b.exploded,fires:[]}))}}
export function restore(d){try{const s=typeof d==='string'?JSON.parse(d):structuredClone(d);if(s.v!==1||!LEVELS[s.level]||![0,1,2,3].includes(s.kit)||s.grid?.length!==H||!s.grid.every(row=>row.length===W&&row.every(v=>Number.isInteger(v)&&v>=0&&v<=4))||!s.player||!['x','y','move','moveMax','dir','fromX','fromY'].every(k=>Number.isFinite(s.player[k]))||s.player.x<1||s.player.x>=W-1||s.player.y<1||s.player.y>=H-1||!Number.isInteger(s.hp)||s.hp<0||s.hp>4||!['time','score','birds','invul','hurt','seed','bombId'].every(k=>Number.isFinite(s[k]))||s.birds>LEVELS[s.level].cages.length||!Array.isArray(s.bombs)||s.bombs.length>16||!s.bombs.every(b=>b.position&&[b.position.x,b.position.y,b.timer,b.timerMax,b.strength,b.id].every(Number.isFinite))||!Array.isArray(s.fires)||s.fires.length>120||!s.fires.every(f=>[f.x,f.y,f.ttl].every(Number.isFinite))||!Array.isArray(s.enemies)||s.enemies.length>6||!s.enemies.every(e=>[e.x,e.y,e.cool,e.move,e.fromX,e.fromY].every(Number.isFinite))||!Array.isArray(s.pickups)||s.pickups.length>8)return null;s.events=[];s.history=[];return bind(s)}catch{return null}}
export function stars(s){return s.won?1+Number(s.sealed)+Number(s.hurt===0):0}
export function reward(profile,s){if(!s.won)return;profile.best[s.level]=Math.max(profile.best[s.level],stars(s));profile.scores[s.level]=Math.max(profile.scores[s.level],s.score);profile.unlocked=Math.max(profile.unlocked,Math.min(8,s.level+1))}
export function total(p){return p.best.reduce((a,b)=>a+b,0)}
export function route(s,goal,avoid=true){const start={x:s.player.x,y:s.player.y},queue=[start],prev=new Map([[key(start.x,start.y),null]]);while(queue.length){const a=queue.shift();if(eq(a,goal)){let out=[],cur=a;while(prev.get(key(cur.x,cur.y))){out.unshift(cur);cur=prev.get(key(cur.x,cur.y))}return out}for(const n of neighbors(s,a,avoid)){const k=key(n.x,n.y);if(!prev.has(k)){prev.set(k,a);queue.push(n)}}}return null}

export function neighbors(s,a,avoid=false){return DIRS.map(([dx,dy])=>{let x=a.x+dx,y=a.y+dy;if(s.grid[y]?.[x]===4&&(LEVELS[s.level].springs||[]).some(q=>q[0]===a.x&&q[1]===a.y)){x+=dx;y+=dy}return {x,y}}).filter(q=>walkable(s,q.x,q.y)&&(!avoid||!imminent(s,q.x,q.y)))}

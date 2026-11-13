export const TYPES=['pea','frost','melon','fume','spike'];
export const ENEMIES=['basic','cone','bucket','boss'];
export const COLS=5,ROWS=4;
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function random(state){let x=state>>>0||1;x^=x<<13;x^=x>>>17;x^=x<<5;return x>>>0}
export function cluster(board,index){if(!Number.isInteger(index)||index<0||index>=20)return[];let type=board[index],seen=new Set([index]),queue=[index];for(let i=0;i<queue.length;i++){let n=queue[i];for(let m of [n%5? n-1:-1,n%5<4?n+1:-1,n-5,n+5])if(m>=0&&m<20&&!seen.has(m)&&board[m]===type){seen.add(m);queue.push(m)}}return queue}
export function groups(board){let seen=new Set(),out=[];for(let i=0;i<20;i++)if(!seen.has(i)){let g=cluster(board,i);g.forEach(n=>seen.add(n));if(g.length>=2)out.push(g)}return out}
export function profile(raw={}){const n=(k,max=1e9)=>Number.isSafeInteger(raw?.[k])&&raw[k]>=0?Math.min(raw[k],max):0;return{schema:1,serial:n('serial'),coins:n('coins'),credited:n('credited'),power:n('power',3),ward:n('ward',2),barrage:n('barrage',1),bestRaid:n('bestRaid',999),stars:Array.from({length:9},(_,i)=>Number.isInteger(raw?.stars?.[i])?clamp(raw.stars[i],0,3):0),sound:raw?.sound!==false,gentle:raw?.gentle===true,found:Array.isArray(raw?.found)?[...new Set(raw.found.filter(x=>ENEMIES.includes(x)))]:[]}}
export function maxStage(p){let first=p.stars.findIndex(n=>n===0);return first<0?Math.max(10,p.bestRaid+1):first+1}
export class Garden{
 constructor(id,seed,stage=1,p={}){this.schema=1;this.id=id;this.seed=seed>>>0||1;this.rng=this.seed;this.stage=clamp(stage,1,999);this.power=p.power||0;this.ward=p.ward||0;this.barrage=p.barrage||0;this.life=3+this.ward;this.phase='ready';this.turn=0;this.kills=0;this.escaped=0;this.score=0;this.earned=0;this.total=stage===1?6:Math.min(24,6+stage*2);this.spawned=0;this.mowers=[true,true,true];this.mowersUsed=0;this.shuffles=3;this.board=Array.from({length:20},()=>this.roll(5));this.plants=[0,0,0];this.enemies=[];this.events=[];this.remaining=0;this.lastType=0;this.lastGroup=[];this.reward=0;this.found=[];this.ensure();if(stage===1){this.board.splice(0,7,0,0,0,1,2,0,0)}this.spawn(3)}
 roll(n){this.rng=random(this.rng);return Math.floor(this.rng/4294967296*n)}
 ensure(){if(!groups(this.board).length)this.board[1]=this.board[0]}
 spawn(n){for(let i=0;i<n&&this.spawned<this.total&&this.enemies.length<12;i++){let order=this.spawned,kind=this.stage<3?'basic':this.stage%3===0&&order===this.total-1?'boss':this.stage>=5&&order%5===3?'bucket':order%3===1?'cone':'basic',lane=this.stage===1?order%3:(order+this.roll(3))%3;let hp=kind==='boss'?10+Math.min(10,this.stage):kind==='bucket'?6:kind==='cone'?4:2;this.enemies.push({id:this.spawned++,kind,lane,x:8.8+(i%3)*.6,hp,maxHp:hp,frozen:0});}}
 get maxLife(){return 3+this.ward}
 get threshold(){return 5-this.barrage}
 get par(){return this.stage===1?5:Math.ceil(this.total*.8)+2}
 get stars(){return this.phase==='win'?1+(this.escaped===0&&this.mowersUsed===0?1:0)+(this.turn<=this.par?1:0):0}
 pop(index){if(this.phase!=='ready')return false;let group=cluster(this.board,index);if(group.length<2)return false;let type=this.board[index],large=group.length>=this.threshold;this.events=[];this.lastType=type;this.lastGroup=group;this.turn++;this.plants=this.plants.slice();let targets=[...this.enemies].sort((a,b)=>a.x-b.x||a.id-b.id),first=targets[0];let lanes=large?[0,1,2]:[first?.lane??0];
  for(let lane of lanes){this.plants[lane]=type;let list=this.enemies.filter(e=>e.lane===lane).sort((a,b)=>a.x-b.x||a.id-b.id);if(!list.length)continue;let hits=type===3?list:[list[0]];for(let e of hits){let damage=group.length+this.power+(type===4?2:0),old=e.hp;e.hp=Math.max(0,e.hp-damage);if(type===1)e.frozen=2;this.events.push({kind:'hit',id:e.id,lane:e.lane,x:e.x,damage:old-e.hp,type,dead:e.hp===0});if(type===2)for(let other of list.slice(1)){let old=other.hp;other.hp=Math.max(0,other.hp-Math.max(1,Math.floor(damage/2)));this.events.push({kind:'hit',id:other.id,lane:other.lane,x:other.x,damage:old-other.hp,type,dead:other.hp===0})}}
  }
  this.score+=group.length*5+(large?50:0);this.events.push({kind:'pop',cells:group,type,large});this.removeDead();let selected=new Set(group);for(let c=0;c<5;c++){let col=[];for(let row=3;row>=0;row--){let i=row*5+c;if(!selected.has(i))col.push(this.board[i])}while(col.length<4)col.push(this.roll(5));for(let row=3;row>=0;row--)this.board[row*5+c]=col[3-row]}this.ensure();this.phase='resolve';this.remaining=.48;return true;
 }
 removeDead(){for(let e of this.enemies.filter(e=>e.hp<=0)){this.kills++;this.score+=e.kind==='boss'?500:100;this.earned+=e.kind==='boss'?5:1;if(!this.found.includes(e.kind))this.found.push(e.kind)}this.enemies=this.enemies.filter(e=>e.hp>0)}
 tick(dt){if(this.phase!=='resolve')return false;if(!Number.isFinite(dt)||dt<=0)return false;this.remaining-=dt;if(this.remaining>0)return false;this.events=[];let breaches=[];for(let e of this.enemies){let step=e.kind==='boss'?.62:e.kind==='bucket'?.75:.95;if(e.frozen){step*=.35;e.frozen--}e.x-=step;if(e.x<=.55)breaches.push(e)}
  for(let e of breaches){if(!this.enemies.some(x=>x.id===e.id))continue;if(this.mowers[e.lane]){this.mowers[e.lane]=false;this.mowersUsed++;this.events.push({kind:'mower',lane:e.lane});for(let x of this.enemies.filter(x=>x.lane===e.lane)){x.hp=0}this.removeDead()}else{this.life--;this.escaped++;this.enemies=this.enemies.filter(x=>x.id!==e.id);this.events.push({kind:'breach',lane:e.lane})}}
  this.spawn(this.turn%3===0?3:2);this.phase='ready';this.remaining=0;
  if(this.life<=0){this.life=0;this.phase='lost';this.events.push({kind:'lost'})}else if(this.spawned===this.total&&this.enemies.length===0){this.phase='win';this.reward=12+this.stage*3;this.earned+=this.reward;this.events.push({kind:'win'})}return true;
 }
 shuffle(){if(this.phase!=='ready'||!this.shuffles)return false;this.shuffles--;this.board=Array.from({length:20},()=>this.roll(5));this.ensure();return true}
 save(){return JSON.parse(JSON.stringify(this))}
 static restore(x){if(!x||x.schema!==1||!['ready','resolve','win','lost'].includes(x.phase))return null;
  for(let[k,min,max]of[['id',1,1e9],['seed',1,4294967295],['rng',1,4294967295],['stage',1,999],['power',0,3],['ward',0,2],['barrage',0,1],['life',0,5],['turn',0,100000],['kills',0,24],['escaped',0,24],['score',0,1e9],['earned',0,1e9],['total',6,24],['spawned',0,24],['mowersUsed',0,3],['shuffles',0,3],['lastType',0,4],['reward',0,1e5]])if(!Number.isSafeInteger(x[k])||x[k]<min||x[k]>max)return null;
  if(x.life>3+x.ward||!Number.isFinite(x.remaining)||x.remaining<0||x.remaining>.48||x.total!==(x.stage===1?6:Math.min(24,6+x.stage*2))||x.spawned>x.total||x.kills+x.escaped+x.enemies?.length!==x.spawned)return null;
  if(!Array.isArray(x.board)||x.board.length!==20||x.board.some(n=>!Number.isInteger(n)||n<0||n>4)||!groups(x.board).length||!Array.isArray(x.plants)||x.plants.length!==3||x.plants.some(n=>!Number.isInteger(n)||n<0||n>4))return null;
  if(!Array.isArray(x.enemies)||x.enemies.length>12||new Set(x.enemies.map(e=>e.id)).size!==x.enemies.length||x.enemies.some(e=>!Number.isInteger(e.id)||e.id<0||e.id>=x.spawned||!ENEMIES.includes(e.kind)||!Number.isInteger(e.lane)||e.lane<0||e.lane>2||!Number.isFinite(e.x)||e.x<0||e.x>12||!Number.isInteger(e.hp)||e.hp<1||e.hp>e.maxHp||!Number.isInteger(e.maxHp)||e.maxHp<2||e.maxHp>20||!Number.isInteger(e.frozen)||e.frozen<0||e.frozen>2))return null;
  if(!Array.isArray(x.mowers)||x.mowers.length!==3||x.mowers.some(n=>typeof n!=='boolean')||x.mowers.filter(n=>!n).length!==x.mowersUsed||!Array.isArray(x.found)||x.found.some(k=>!ENEMIES.includes(k))||!Array.isArray(x.lastGroup)||x.lastGroup.some(n=>!Number.isInteger(n)||n<0||n>19)||!Array.isArray(x.events))return null;
  if(x.phase==='win'&&(x.life===0||x.enemies.length||x.spawned!==x.total)||x.phase==='lost'&&x.life!==0||x.phase==='ready'&&x.remaining!==0||x.phase==='resolve'&&x.remaining<=0)return null;
  let r=new Garden(x.id,x.seed,x.stage);for(let k of Object.keys(r)){if(k==='events'){r.events=[];continue}r[k]=JSON.parse(JSON.stringify(x[k]))}return r;
 }
}
export function fresh(p,stage,seed){p.serial++;p.credited=0;return new Garden(p.serial,seed,Math.min(maxStage(p),Math.max(1,stage)),p)}
export function record(p,r){if(r.id!==p.serial)return;p.coins+=Math.max(0,r.earned-p.credited);p.credited=Math.max(p.credited,r.earned);p.found=[...new Set([...p.found,...r.found])];if(r.phase==='win'){if(r.stage<=9)p.stars[r.stage-1]=Math.max(p.stars[r.stage-1],r.stars);else p.bestRaid=Math.max(p.bestRaid,r.stage)}}
export function price(p,key){return key==='power'?55+p.power*65:key==='ward'?45+p.ward*80:key==='barrage'?100:Infinity}
export function buy(p,key){let cap={power:3,ward:2,barrage:1}[key],cost=price(p,key);if(!cap||p[key]>=cap||p.coins<cost)return false;p.coins-=cost;p[key]++;return true}

const assert=require('node:assert/strict'),{Game,level}=require('./engine.js');let checks=0;
function check(v,msg){assert.ok(v,msg);checks++}
function route(l,a,b){let q=[a],prev={[a]:-1};for(let x of q){if(x===b)break;for(let y of l.adj[x])if(prev[y]===undefined){prev[y]=x;q.push(y)}}let p=[b];while(p[0]!==a)p.unshift(prev[p[0]]);return p}
function cell(g){let l=g.l;return Math.round(g.z/2+(l.n-1)/2)*l.n+Math.round(g.x/2+(l.n-1)/2)}
function drive(g,id){let total=0;for(let step=0;step<30000&&g.stage==='play';step++){let here=cell(g),p=g.l.pos(id);if(Math.hypot(g.x-p.x,g.z-p.z)<.22)return total;
 let next=route(g.l,here,id)[1]??id,at=g.l.pos(here);if(Math.hypot(g.x-at.x,g.z-at.z)>.15&&g.target){let toward=g.target; if(Math.hypot(toward.x-g.x,toward.z-g.z)>.18){g.step(1/120);total++;continue}}
 let point=g.l.pos(next);g.aim(point.x,point.z);for(let j=0;j<20&&g.stage==='play';j++){g.step(1/120);total++}
 }check(g.stage==='won','route should converge');return total}
for(let i=0;i<8;i++){let g=new Game({unlocked:7});g.load(i);let l=g.l;check(new Set(l.adj.flat()).size===l.n*l.n,'connected maze');check(l.seeds.every(x=>x!==l.start&&x!==l.goal),'collectible positions');g.finish();check(g.stage==='ready','cannot settle ready');g.go();g.finish();check(g.stage==='play','locked goal');
 drive(g,l.cache);for(let s of l.seeds)if(!g.collected.includes(s))drive(g,s);drive(g,l.goal);check(g.stage==='won','garden '+i+' completable');check(g.cache,'hidden bloom');check(g.collected.length===l.seeds.length,'all seeds');let snap=JSON.stringify(g.snapshot());for(let j=0;j<100;j++)g.step(1/120);check(snap===JSON.stringify(g.snapshot()),'won state immutable');let r=Game.restore(JSON.parse(snap));check(r.stage==='won'&&r.profile.stars[i]===g.rating,'won restore');console.log('Garden',i+1,'clear',g.time.toFixed(2),'rating',g.rating,'par',l.par,'bumps',g.bumps)}
let g=new Game;g.go();g.aim(0,2);for(let i=0;i<60;i++)g.step(1/120);g.pause();let s=JSON.stringify(g.snapshot());for(let i=0;i<50;i++)g.step(1/120);check(s===JSON.stringify(g.snapshot()),'paused exact');let r=Game.restore(JSON.parse(s));check(r.x===g.x&&r.z===g.z&&r.time===g.time&&r.stage==='paused','exact mid-run restore');r.go();g.go();for(let i=0;i<100;i++){g.step(1/120);r.step(1/120)}check(Math.abs(g.x-r.x)<1e-10,'continuation');
let locked=new Game;locked.load(7);check(locked.l.index===0,'locked route');let bad=Game.restore({v:1,x:Infinity,z:0,vx:0,vz:0,time:0});check(Number.isFinite(bad.x)&&bad.stage==='ready','bad save fallback');
let p=new Game({stars:[3,3,3,3]});check(p.cycleSkin()===3&&p.profile.skin===1,'cosmetic unlock');p.cycleSkin();check(p.profile.skin===2,'second cosmetic');
let portal=new Game({unlocked:7});portal.load(5);portal.go();let pp=portal.l.portalPos(portal.l.portals[0]);portal.x=pp.x;portal.z=pp.z;portal.step(1/120);let x=portal.x,z=portal.z;for(let i=0;i<600;i++)portal.step(1/120);check(portal.x===x&&portal.z===z,'portal does not ping-pong at rest');let restore=Game.restore(portal.snapshot());check(restore.portalArmed===false,'portal latch persisted');
console.log('PASS',checks,'checks');

for(let i=0;i<8;i++){let a=new Game({unlocked:7});a.load(i);a.go();for(let t=0;t<16000;t++){let k=Math.floor(t/240)%4;a.step(1/120,{x:k===0?1:k===2?-1:0,z:k===1?1:k===3?-1:0});check(Number.isFinite(a.x)&&Number.isFinite(a.z)&&Math.abs(a.x)<a.l.n&&Math.abs(a.z)<a.l.n,'collision confinement');check(a.events.length<=40,'bounded event queue')} }
console.log('STRESS PASS',checks,'checks');

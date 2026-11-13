const assert=require('node:assert/strict');require('./model.js');const C=globalThis.Caper;let cases=0;
function check(a,s){assert(a,s);cases++;}
let save=C.fresh();let sessions=[];
for(let level=0;level<6;level++)for(let seed=1;seed<=5;seed++)for(let hz of [30,60]){
 let g=new C.Game(level,seed),events=[],steps=0,target=null;
 while(!g.finished&&steps++<hz*62){
  if(!target||target.hit||target.z-g.p.z>-.2||target.z-g.p.z< -45){let options=g.entities.filter(e=>!e.hit&&e.z-g.p.z< -4&&e.z-g.p.z> -40),wanted=options.filter(e=>g.taskProgress()<g.cfg.count?(g.cfg.task==='types'?!g.targetKinds.has(e.kind):e.kind===g.cfg.task):e.kind==='car');target=(wanted.length?wanted:options).sort((a,b)=>Math.abs(a.z-g.p.z)+Math.abs(a.x-g.p.x)*.4-Math.abs(b.z-g.p.z)-Math.abs(b.x-g.p.x)*.4)[0];}
  let dx=target?target.x-g.p.x:0;g.input(C.clamp(dx*1.3-g.p.vx*.25,-1,1),0,true);if(g.charge>=4&&(!target||Math.abs(dx)<4))g.special();g.tick(1/hz);for(let e of g.drain()){events.push(e);if(e.type==='hit'){assert(e.y>=C.INFO[e.kind].y);assert(e.points>0);}if(e.type==='splat')assert(e.y>=(Math.abs(e.x)>6.45?.29:.12));}assert(g.p.x>=-7.4&&g.p.x<=7.4&&g.p.y>=4.4&&g.p.y<=8);assert(g.drops.length<=32);if(steps%hz===0){let cars=g.entities.filter(e=>e.kind==='car');for(let a=0;a<cars.length;a++)for(let b=a+1;b<cars.length;b++)if(Math.abs(cars[a].x-cars[b].x)<.2)assert(Math.abs(cars[a].z-cars[b].z)>3.2,'same-lane cars never overlap');}}
 check(g.finished&&g.time===0,'finite 60-second session');check(g.score>=g.cfg.goal&&g.taskProgress()>=g.cfg.count,`public steering/fire/frenzy clears outing ${level+1}: ${g.score}/${g.cfg.goal}, ${g.taskProgress()}/${g.cfg.count}`);check(events.filter(e=>e.type==='finish').length===1,'one terminal event');check(g.hits>5&&g.specials>0,'natural contact and special action');
 const before=JSON.stringify(g);g.tick(.05);g.input(1,1,true);g.fire();g.special();g.finish();check(JSON.stringify(g)===before,'terminal state cannot be farmed');save=g.commit(save);sessions.push({level,seed,hz,score:g.score,hits:g.hits,stars:g.stars});
}
check(C.unlock(save)===6,'all outings unlock');check(C.hats(save)>=3,'star cosmetics unlock');
let g=new C.Game();g.input(0,0,true);while(g.hits===0&&g.t<3)g.tick(1/120);check(g.hits===1&&g.t<2,'first reward arrives within two seconds');
g=new C.Game();check(!g.special()&&g.specials===0,'special costs four earned hits');g.fire();let shot=g.shots;g.fire();check(g.shots===shot,'cooldown blocks double-fire');
g=new C.Game();g.input(1,-1,false);for(let i=0;i<500;i++)g.tick(.05);check(g.p.x===7.4&&g.p.y===8,'flight corridor clamps at edges');g.input(-1,1,false);for(let i=0;i<500;i++)g.tick(.05);check(g.p.x===-7.4&&g.p.y===4.4,'lower bounds remain outside street props');
g=new C.Game();let before=g.t;g.tick(NaN);g.tick(-1);check(g.t===before,'malformed dt ignored');g.input(NaN,Infinity,false);check(g.control.x===0&&g.control.y===0,'bad controls ignored');
let bad=C.clean({v:1,stars:[Infinity,999,-8],best:[NaN,900],hat:Infinity});check(bad.stars[0]===0&&bad.stars[1]===3&&bad.stars[2]===0&&bad.hat===0,'corrupted storage sanitized');
// A narrow moving target must be hit at its actual plane, not after falling through it.
g=new C.Game();g.entities=[g.make('person',0,-5,0)];g.p.y=5.2;g.fire(g.entities[0],true);while(!g.hits&&g.t<2)g.tick(1/120);check(g.hits===1,'moving-person swept contact');
check(C.fallTime(5,2)>0&&C.fallTime(5,2)<C.fallTime(5,.1),'height-correct fall prediction');
console.log(JSON.stringify({passed:true,cases,sessions:sessions.length,scoreRange:[Math.min(...sessions.map(x=>x.score)),Math.max(...sessions.map(x=>x.score))]}));

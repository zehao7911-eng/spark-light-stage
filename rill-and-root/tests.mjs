import assert from 'node:assert/strict';
import{Garden}from './model.js';import{LEVELS}from './levels.js';
import{contours,area,smooth}from './terrain.js';
let checks=0;const ok=(v,m)=>{assert.ok(v,m);checks++;};
for(let level=0;level<12;level++){
 let g=new Garden(level),r=LEVELS[level].route;g.beginStroke();for(let i=1;i<r.length;i++)g.carve(...r[i-1],...r[i]);
 for(let t=0;t<120*90&&!g.won;t++)g.step(1/120);
 console.log(JSON.stringify({level:level+1,received:g.received,seeds:g.seeds,wheel:g.wheel,cups:g.cups.map(x=>x.open),time:g.time.toFixed(2),won:g.won}));
 ok(g.won,'ordinary carved route must complete '+level);ok(g.water.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)),'finite');
 const a=JSON.stringify(g.save());g.step(1);ok(JSON.stringify(g.save())===a,'won state stable');
}
let a=new Garden(4);a.beginStroke();a.carve(0,1,0,9.4);for(let i=0;i<177;i++)a.step(1/120);let b=Garden.restore(a.save());ok(b,'restore');for(let i=0;i<300;i++){a.step(1/120);b.step(1/120);}assert.deepEqual(b.save(),a.save());checks++;
let u=new Garden();const before=Array.from(u.soil);u.beginStroke();u.carve(0,1,0,7);ok(u.undo(),'undo');assert.deepEqual(Array.from(u.soil),before);checks++;
let n=new Garden();for(let i=0;i<600;i++)n.step(1/120);ok(n.water.length===0&&n.received===0,'no idle win');ok(n.carve(NaN,0,0,2)===0,'reject invalid input');let bad=n.save();bad.water=[{id:1,x:Infinity,y:2,vx:0,vy:0,age:0,held:-1}];ok(!Garden.restore(bad),'reject nonfinite save');
let full=new Garden();full.beginStroke();full.carve(-99,-99,99,99);ok(full.soil.every(v=>v===0||v===1),'clamped input');
// A closed cut creates a genuine hole, and the boundary area equals occupied soil.
let hole=new Garden();hole.beginStroke();hole.carve(0,5);let loops=contours(hole.soil,84,104);ok(loops.some(p=>area(p)<0),'interior cut is a hole');ok(loops.reduce((sum,p)=>sum+area(p),0)===hole.soil.reduce((a,b)=>a+b,0),'boundary conserves soil area');ok(loops.every(p=>smooth(p).every(q=>q.every(Number.isFinite))),'smooth cut geometry is finite');
// No wheel motion or reward without physical water passing through it.
let wheel=new Garden(4);for(let i=0;i<600;i++)wheel.step(1/120);ok(wheel.wheel===0&&wheel.wheelTurn===0,'idle wheel stays still');
let cup=new Garden(6),route=LEVELS[6].route;for(let i=1;i<route.length;i++)cup.carve(...route[i-1],...route[i]);let held=false,poured=false;
for(let t=0;t<2000&&!cup.won;t++){cup.step(1/120);if(!held&&cup.water.some(p=>p.held>=0)){held=true;let saved=cup.save(),copy=Garden.restore(saved);ok(copy,'held water restore');for(let j=0;j<7;j++){copy.step(1/120);cup.step(1/120);}assert.deepEqual(copy.save(),cup.save());checks++;}if(cup.events.some(e=>e.type==='pour'))poured=true;}
ok(held&&poured&&cup.won,'cup actually stores then pours and completes');ok(cup.cups[0].released,'cup release is recorded');
console.log('Passed '+checks+' checks.');

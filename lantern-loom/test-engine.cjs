'use strict';
const assert=require('node:assert/strict');
const {Game,PERKS,blank}=require('./engine.js'),B=require('./bridge.js');
let chambers=0,delivered=0;
function run(g,dt=1/60){g.release();for(let i=0;i<3000&&g.status==='flow';i++)g.step(dt);assert.notEqual(g.status,'flow','bounded completion');return g;}
// Geometry from the actual upstream Bar.ts, including a vertical drag.
assert.deepEqual(B.geometry({x:0,y:0},{x:30,y:40},100),{x:15,y:20,angle:Math.atan2(40,30),width:50,a:{x:0,y:0},b:{x:30,y:40}});
assert.equal(B.geometry({x:4,y:7},{x:4,y:107},25).width,25);
let bus=B.bus(),calls=0;const fn=()=>calls++;bus.subscribe('x',fn);bus.subscribe('x',fn);bus.publish('x');assert.equal(calls,1);bus.unsubscribe('x',fn);bus.publish('x');assert.equal(calls,1);
// Six silhouettes, three seasons, wind and moving bells, with multiple builds.
for(let seed=1;seed<=8;seed++){
 const g=new Game(blank(),seed);
 for(let r=1;r<=30;r++){
  assert.equal(g.round,r);g.guide();const used=g.used();assert(used<=g.capacity());run(g,r%2?1/60:1/30);
  // Failed lights can be sent again without a dead end or lost permanent growth.
  if(g.status==='plan')run(g);
  assert.equal(g.status,'reward',`round ${r} seed ${seed}`);assert(g.delivered>=3);chambers++;delivered+=g.delivered;
  const before=g.meta.pollen;g.step(1/60);assert.equal(g.meta.pollen,before,'reward is not paid twice');
  const restored=Game.restore(JSON.parse(JSON.stringify(g.serialize())));assert.equal(restored.status,'reward');assert.deepEqual(restored.choices,g.choices);assert.equal(restored.meta.clears,g.meta.clears);
  const chosen=g.choices[Math.floor(g.rng()*g.choices.length)];assert(g.choose(chosen));assert.equal(g.status,'plan');assert.equal(g.delivered,0);assert.equal(g.rails.length,0);
 }
 assert.equal(g.meta.album.length,12);assert.equal(g.meta.clears,30);
}
// The garden cannot pay a delivery without the body physically reaching the bowl.
let g=new Game();run(g);assert.equal(g.delivered,0);assert.equal(g.status,'plan');assert.equal(g.meta.clears,0);assert.equal(g.meta.pollen,3,'only the real firefly in the falling path pays');
// Undo and invalid bridges do not consume thread or corrupt the world.
g=new Game();assert(!g.draw({x:110,y:180},{x:111,y:181}));assert.equal(g.used(),0);g.guide();const n=g.ctx.world.bodies.length;assert(g.undo());assert.equal(g.ctx.world.bodies.length,n-1);
g.release();assert(!g.undo());assert(!g.choose('twin'));assert(!g.shop(0));
// All permanent tools are bounded, priced, and retained across chamber restarts.
g=new Game({...blank(),pollen:100000});for(let i=0;i<3;i++){for(let j=0;j<4;j++)assert(g.shop(i));assert(!g.shop(i));}const meta=JSON.stringify(g.meta);g.restart();assert.equal(JSON.stringify(g.meta),meta);assert.equal(g.capacity(),385);
// Every perk has a gameplay effect, not just a badge.
g=new Game();g.perks.silk=2;assert.equal(g.capacity(),355);g.perks.twin=3;g.release();assert.equal(g.spawnLeft,7);
g=new Game();g.round=3;g.resetChamber();g.release();g.step(1/60);const s=g.spirits[0];s.body.position[0]=g.bells[0].x;s.body.position[1]=g.bells[0].y;assert(g.pulse(g.bells[0].x,g.bells[0].y));assert(!g.pulse(g.bells[0].x,g.bells[0].y));assert(s.body.velocity[0]>0);
// Corrupt save data never creates a malformed p2 body or unbounded upgrade.
g=Game.restore({round:Infinity,meta:{v:1,pollen:-5,levels:[99,-4,'x'],album:[1,1,-1,100]},perks:{silk:99},rails:[{a:{x:NaN,y:0},b:{x:4,y:5}}]});assert.equal(g.round,999);assert.deepEqual(g.meta.levels,[4,0,0]);assert.equal(g.meta.pollen,0);assert.deepEqual(g.meta.album,[1]);assert.equal(g.perks.silk,4);assert.equal(g.rails.length,0);
console.log(JSON.stringify({passed:true,chambers,physicalDeliveries:delivered,builds:8,roundsPerBuild:30,checks:['upstream geometry and bus','finite physics','all biomes and mechanisms','draft and save restore','no duplicate rewards','bounded tools','real pulse','invalid saves']}));

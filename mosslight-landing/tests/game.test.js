import test from 'node:test';
import assert from 'node:assert/strict';
import {Landing,LEVELS} from '../src/model.js';
import {integrate,safeLanding,dock} from '../src/physics.js';

test('all twelve authored routes are reachable with physical input',()=>{
 const g=new Landing();
 for(let level=0;level<12;level++){
  assert.equal(g.load(level),true);g.start();let phase=0,next=g.run.next;
  for(let i=0;i<30000&&g.run.state==='play';i++){
   const r=g.run,s=r.s,p=g.pad(r.next);if(next!==r.next){phase=0;next=r.next;}
   if(phase===0){g.input({target:{x:s.x,y:55}});if(s.y<70)phase=1;}
   if(phase===1){g.input({target:{x:p.x,y:55}});if(Math.abs(s.x-p.x)<6&&Math.abs(s.vx)<.35)phase=2;}
   if(phase===2){g.input({target:{x:p.x,y:p.y-39}});if(Math.abs(s.y-(p.y-39))<8&&Math.abs(s.vy)<.55)phase=3;}
   if(phase===3)g.release();g.tick(1/60);
  }
  assert.equal(g.run.state,'won',`route ${level+1}`);assert.equal(g.run.bumps,0);assert.ok(g.claim());assert.equal(g.claim(),null);
 }
 assert.equal(Object.keys(g.profile.best).length,12);assert.equal(g.profile.unlocked,11);
});
test('locked routes cannot be loaded',()=>{let g=new Landing();assert.equal(g.load(1),false);assert.equal(g.load(-1),false);});
test('thrust opposes gravity and wind changes horizontal speed',()=>{let a={x:0,y:0,vx:0,vy:0},b={...a};integrate(a,0);integrate(b,.105,90,.01);assert.ok(a.vy>0&&b.vy<0&&b.vx>0);});
test('landing requires both feet, crossing and safe velocity',()=>{let p={x:100,y:100,w:60},s={x:100,y:86,vy:1,vx:0};assert.equal(safeLanding(s,p,85),'safe');assert.equal(safeLanding({...s,x:126},p,85),null);assert.equal(safeLanding({...s,vy:2},p,85),'hard');assert.equal(safeLanding({...s,vy:-1},p,85),null);assert.equal(safeLanding({...s,vy:1.8},p,85,3),'safe');});
test('docking cancels motion and caps refuel',()=>{let s={fuel:98,vx:3,vy:3,rotation:40,rotationForce:4};dock(s,{y:100},100);assert.equal(s.fuel,100);assert.equal(s.vx,0);assert.equal(s.rotation,90);assert.equal(s.y,86);});
test('fixed steps are invariant across frame batches',()=>{let a=new Landing(),b=new Landing();a.start();b.start();a.input({lift:true});b.input({lift:true});for(let i=0;i<60;i++)a.tick(1/60);for(let i=0;i<30;i++)b.tick(1/30);assert.deepEqual(a.run.s,b.run.s);});
test('checkpoint retry preserves collected seeds and route progress',()=>{let g=new Landing();g.start();g.run.checkpoint=1;g.run.done=[0,1];g.run.next=2;g.run.seeds=[0];for(let i=0;i<3;i++){g.run.recover=0;g.bump('test');}assert.equal(g.run.state,'failed');assert.ok(g.retryCheckpoint());assert.equal(g.run.landed,1);assert.equal(g.run.next,2);assert.deepEqual(g.run.seeds,[0]);assert.equal(g.run.hearts,3);});
test('save restores exact position but releases input',()=>{let g=new Landing();g.start();g.input({lift:true});g.tick(.2);let h=new Landing(g.snapshot());assert.deepEqual(h.run.s,g.run.s);assert.equal(h.run.input.lift,false);assert.equal(h.run.state,'play');});
test('shield unlock, cooldown and event',()=>{let g=new Landing();g.start();assert.equal(g.shield(),false);g.profile.unlocked=7;assert.ok(g.shield());assert.equal(g.shield(),false);assert.equal(g.run.shield,3);});
test('upgrades charge once and cannot be bought during flight',()=>{let g=new Landing();g.profile.coins=100;assert.ok(g.buy('fuel'));assert.equal(g.profile.coins,88);assert.equal(g.maxFuel,125);g.start();assert.equal(g.buy('feet'),false);assert.equal(g.profile.coins,88);});
test('replay cannot reduce medals or grade or mint duplicate rewards',()=>{let g=new Landing();g.run.state='won';g.run.seeds=[0,1,2];g.run.time=10;let a=g.claim(),coins=g.profile.coins;assert.equal(a.grade,'S');g.load(0);g.run.state='won';g.run.time=100;g.run.bumps=2;g.claim();assert.equal(g.profile.best[0].grade,'S');assert.equal(g.profile.best[0].stars,3);assert.equal(g.profile.coins,coins);});
test('moving docks and shutter states change over time',()=>{let g=new Landing({profile:{unlocked:11}});g.load(7);assert.notEqual(g.pad(1,0).x,g.pad(1,2).x);g.load(5);let o=g.level.rocks[0];let states=new Set();for(let t=0;t<10;t++){g.run.time=t;states.add(g.gateClosed(o));}assert.equal(states.size,2);});
test('paused and invalid ticks do not advance simulation',()=>{let g=new Landing();g.tick(1);assert.equal(g.run.frame,0);g.start();g.tick(NaN);g.tick(-1);assert.equal(g.run.frame,0);});
test('all routes have unique names and three optional seeds',()=>{assert.equal(new Set(LEVELS.map(x=>x.name)).size,12);for(let l of LEVELS){assert.equal(l.seeds.length,3);assert.ok(l.pads.length>=3);}});

import assert from 'node:assert/strict';
import {Game,cleanProfile,reward,TOYS,clone} from './model.js';
let count=0;const eq=(a,b)=>{assert.deepEqual(a,b);count++;},ok=v=>{assert.ok(v);count++;};
function settle(g,n=160){for(let k=0;k<n;k++)g.step(1/120);}
function choose(g,p){return g.bodies.filter(b=>{const h=g.candidate(b.x,b.z);return h?.body.id===b.id&&h.quality>.9;}).sort((a,b)=>(p.owned[a.type]>0)-(p.owned[b.type]>0)||b.y-a.y)[0];}
for(let seed=720;seed<725;seed++){
 const p=cleanProfile(),g=new Game(seed);settle(g);for(let round=0;round<45&&p.owned.filter(Boolean).length<12;round++){
  let target=choose(g,p);ok(target);g.aim(target.x,target.z);settle(g,80);ok(g.grab());eq(g.grab(),false);
  let restoreTested=false;
  for(let k=0;k<900&&g.phase!=='result';k++){
   if(g.phase==='close')g.tighten();g.step(1/120);
   if(g.phase==='carry'&&!restoreTested){const snap=g.snapshot(),r=new Game(seed,[],snap);eq(r.snapshot(),snap);for(let j=0;j<70;j++){g.step(1/120);r.step(1/120);}eq(r.snapshot(),g.snapshot());restoreTested=true;}
   for(const b of g.bodies){ok(Number.isFinite(b.x+b.y+b.z));if(!b.held)ok(Math.abs(b.x)<=2.001&&Math.abs(b.z)<=1.651);}
  }
  eq(g.phase,'result');ok(g.result.won);ok(g.events.some(e=>e.type==='prize'&&e.toyType===g.result.type));reward(p,g);const before=clone(p);reward(p,g);eq(p,before);const r=new Game(seed,[],g.snapshot());reward(p,r);eq(p,before);const frozen=g.snapshot();g.step(1);eq(g.snapshot(),frozen);g.next();settle(g,140);
 }
 eq(p.owned.filter(Boolean).length,12);ok(p.wins>=12);
}
const miss=new Game();settle(miss);miss.aim(-1.9,1.6);settle(miss,70); // Choose a provably empty corner if the random pile reaches this one.
for(let x of [-1.9,1.9])for(let z of [-1.55,1.6])if(!miss.candidate(x,z)){miss.aim(x,z);miss.clawX=x;miss.clawZ=z;}
ok(miss.grab());for(let n=0;n<900&&miss.phase!=='result';n++)miss.step(1/120);eq(miss.phase,'result');const p=cleanProfile();reward(p,miss);eq(p.attempts,1);
const approach=new Game();settle(approach);approach.aim(1.7,-1.2);approach.grab();eq(approach.phase,'approach');approach.step(.1);const restored=new Game(1,[],approach.snapshot());for(let n=0;n<70;n++){approach.step(1/120);restored.step(1/120);}eq(restored.snapshot(),approach.snapshot());
eq(cleanProfile({owned:[1]}).owned,Array(12).fill(0));eq(cleanProfile({theme:2}).theme,0);
for(const tweak of [s=>s.bodies[0].x=NaN,s=>s.phase='oops',s=>s.bodies.push({...s.bodies[0]})]){let s=new Game().snapshot();tweak(s);assert.throws(()=>new Game(1,[],s));count++;}
console.log(`${count} assertions passed; five complete 12-friend collections, deterministic transit restore, repeat-reward guard, bounds, empty grab and corrupt-save handling.`);

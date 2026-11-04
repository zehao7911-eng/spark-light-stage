import assert from 'node:assert/strict';
import * as C from './core.mjs';
const step=(s,p,n=1)=>{for(let i=0;i<n;i++)C.tick(s,1/120,p);};
let routes=[];
function play(bout,comfort=true,upgrades=[0,0,0]){let p=C.profile({comfort,stars:Array(9).fill(3),upgrades}),s=C.makeRun(bout);C.hold(s,true,p);let guard=0;while(s.mode==='playing'&&guard++<120*160){if(s.phase==='windup'&&!s.held)C.hold(s,true,p);if(s.phase==='counter'&&s.held)C.hold(s,false,p);step(s,p);}assert.equal(s.mode,'won',`Bout ${bout+1}, comfort ${comfort}, upgrades ${upgrades}: ${JSON.stringify(s)}`);assert.equal(C.stars(s),3);return s;}
for(let comfort of[true,false])for(let upgrades of[[0,0,0],[1,1,1],[3,3,3]])for(let i=0;i<9;i++){let s=play(i,comfort,upgrades);routes.push({bout:i+1,comfort,upgrades,punches:s.punches,hurt:s.hurt,seconds:+s.t.toFixed(2)});}
let p=C.profile(),idle=C.makeRun();step(idle,p,12000);assert.equal(idle.mode,'ready');assert.equal(idle.t,0);
let held=C.makeRun();C.hold(held,true,p);for(let i=0;i<120*100&&held.mode==='playing';i++)step(held,p);assert.equal(held.mode,'lost');assert.equal(held.enemy,4);assert.equal(held.punches,0);
let spam=C.makeRun();for(let i=0;i<120*40;i++){C.hold(spam,true,p);C.hold(spam,false,p);step(spam,p);}assert.equal(spam.enemy,4);assert.equal(spam.mode,'lost');
let s=C.makeRun();C.hold(s,true,p);while(s.phase!=='counter')step(s,p);assert.equal(s.enemy,4);C.hold(s,false,p,false);assert.equal(s.phase,'counter');assert.equal(s.punches,0);C.hold(s,true,p);C.hold(s,false,p);assert.equal(s.phase,'strike');assert.equal(s.enemy,4);step(s,p,16);assert.equal(s.enemy,2);assert.equal(s.punches,1);
let snap=C.clone(s);snap.held=true;let restored=C.restore(snap);assert.equal(restored.held,false);for(let k of['phase','hp','enemy','energy','heat','left','t'])assert.equal(restored[k],snap[k]);assert.equal(C.restore({...snap,hp:99}),null);assert.equal(C.restore({...snap,left:NaN}),null);
let won=play(0),amount=C.bank(p,won);assert.equal(amount,10);assert.equal(C.bank(p,won),0);assert.equal(C.wallet(p),10);assert(C.buy(p,0));assert.equal(C.wallet(p),6);assert(!C.buy(p,0));assert(!C.buy(p,3));assert.equal(C.profile({upgrades:[3,3,3]}).upgrades.join(), '0,0,0');
let other=C.profile({stars:[0,3],upgrades:[0,1,0]}),merged=C.mergeProfile(p,other);assert.deepEqual(merged.stars.slice(0,2),[3,3]);assert(C.spent(merged)<=C.earned(merged));assert.equal(C.unlocked(merged),2);assert.equal(C.profile({look:2}).look,0);
let double=C.makeRun(2);C.hold(double,true,C.profile());while(double.index===0)step(double,p);assert.equal(double.phase,'windup');C.hold(double,false,p);assert.equal(double.enemy,8);assert.equal(double.whiffs,1);assert.equal(double.events[0].double,true);
console.log(JSON.stringify({pass:true,routes:routes.length,allNineWinnableWithoutUpgrades:true,allRoutesNoHullDamage:true,idleDoesNotAdvance:true,holdingAndSpamDoNotWin:true,cancelDoesNotCounter:true,contactDamageDelayed:true,bestOnlyRewards:true,restoreClearsHeldInput:true,routeDetails:routes}));

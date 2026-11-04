import assert from 'node:assert/strict';
import {pose} from './art.mjs';
import {makeRun} from './core.mjs';
let poses=0,maxError=0;
for(let side of[0,1])for(let phase of['windup','counter','strike','stagger'])for(let k=0;k<=40;k++){
 let s=makeRun();s.mode='playing';s.side=side;s.phase=phase;s.t=5;s.duration=1;s.left=k/40;s.lastAttack=phase==='counter'?s.t-k/120:-10;s.lastPunch=phase==='strike'?s.t-k/120:-10;s.lastImpact=phase==='stagger'?s.t-k/120:-10;
 let r=pose(s);for(let a of r.arms)for(let [x,y,length]of[[a.shoulder,a.elbow,68],[a.elbow,a.hand,76]]){let error=Math.abs(Math.hypot(x.x-y.x,x.y-y.y)-length);maxError=Math.max(maxError,error);assert(error<.05,`Arm reach ${phase} ${k}: ${error}`);}
 for(let l of r.legs){assert(Math.abs(Math.hypot(l.hip.x-l.knee.x,l.hip.y-l.knee.y)-45)<.05);assert(Math.abs(Math.hypot(l.ankle.x-l.knee.x,l.ankle.y-l.knee.y)-43)<.05);assert.equal(l.ankle.y+12,470);}
 for(let a of r.arms)assert(Object.values(a.hand).every(Number.isFinite));poses++;
}
for(let side of[0,1]){let s=makeRun();s.phase='counter';s.side=side;s.t=s.lastAttack=2;let r=pose(s),hand=r.arms[side].hand;assert(Math.abs(hand.x-(side?42:-42))<.001);assert.equal(hand.y,424);}
console.log(JSON.stringify({pass:true,poses,limbLengthsStable:true,maxArmLengthError:maxError,contactMatchesGuard:true,feetOnGround:true}));

import assert from 'node:assert/strict';
import * as C from '../core.mjs';
let checks=0;const ok=(v,m)=>{assert.ok(v,m);checks++;},eq=(a,b,m)=>{assert.deepEqual(a,b,m);checks++;};
function wait(s,n=3){C.input(s,0,0);for(let i=0;i<n*60&&s.phase==='play';i++){C.step(s,1/60);C.drain(s);}}
function move(s,x,z){for(let i=0;i<1800&&s.phase==='play';i++){let d=Math.hypot(x-s.x,z-s.z);if(d<.12)break;let oldx=s.x,oldz=s.z;C.input(s,(x-s.x)/d,(z-s.z)/d);C.step(s,1/60);C.drain(s);if(i>4&&Math.hypot(s.x-oldx,s.z-oldz)<.001)break;}C.stop(s);}
function play(index,weapon){let s=C.create(index,weapon,index>2);C.input(s,0,0);
 for(let z=4;z<=(C.MISSIONS[index].length+1)&&s.phase==='play';z+=2){
   // Use cover, stop-fire and small retreats. No health or enemy-state mutation.
   move(s,0,z);wait(s,index===3?4:3);
   if(index===1){for(let p of s.people)if(p.state==='waiting'&&Math.abs(p.z-z)<1.1){move(s,p.x*.76,z);move(s,p.x,p.z);wait(s,1);move(s,0,z);}}
   if(index===2&&z===24){move(s,-5.5,25);wait(s,1.2);move(s,5.5,25);wait(s,3);move(s,0,25);}
   if(index===3&&z===36){move(s,-4.3,36);wait(s,4);move(s,4.3,36);wait(s,4);move(s,0,36);}
 }
 if(index===2){for(let i=0;i<25&&s.phase==='play';i++){move(s,0,58);wait(s,1);}}
 return s;
}
let save=C.fresh(),reports=[];
for(let i=0;i<4;i++){let s=play(i,Math.min(i,2));reports.push({index:i,phase:s.phase,hp:s.hp,kills:s.kills,x:s.x,z:s.z,t:s.t,rescued:s.rescued,bridge:s.bridge,truck:s.truck});ok(s.phase==='won',JSON.stringify(reports));ok(C.bank(save,s));let stars=[...save.stars];ok(!C.bank(save,s));eq(save.stars,stars);}
eq(save.unlocked,3);eq(save.weapon,2);ok(save.stars.every(v=>v>0));
let s=C.create();let before=structuredClone(s);for(let i=0;i<60;i++)C.step(s,1/60);eq(s,before,'ready state does not run');
C.input(s,0,1);for(let i=0;i<50;i++)C.step(s,1/60);let resumed=C.decode(C.encode(C.fresh(),s)).run;ok(resumed);eq(resumed.vx,0);eq(resumed.vz,0);C.stop(s);C.drain(s);eq(resumed,s,'snapshot preserves gameplay but releases input');for(let i=0;i<240;i++){C.step(s,1/60);C.step(resumed,1/60);}eq(resumed,s,'resumed simulation stays deterministic');
let bridge=C.create(2);ok(C.solid(bridge,0,31),'closed bridge blocks drive');bridge.bridge=1;ok(!C.solid(bridge,0,31),'lowered bridge is traversable');ok(C.solid(bridge,6,31),'open bridge does not permit driving over water');
let boss=C.create(3),e=boss.units.find(u=>u.type==='boss'),hp=e.hp;C.damageUnit(boss,e,999);eq(e.hp,hp,'generators shield boss');for(let p of boss.props.filter(p=>p.kind==='generator'))C.damageProp(boss,p,99);C.damageUnit(boss,e,999);ok(e.dead,'destroyed generators remove shield');
let chain=C.create(),barrel=chain.props.find(p=>p.kind==='barrel');let old=chain.units.reduce((n,u)=>n+u.hp,0);C.damageProp(chain,barrel,1);ok(barrel.dead);ok(chain.units.reduce((n,u)=>n+u.hp,0)<old,'fuel blast causes actual damage');
let dozer=C.create(3,2,true);C.input(dozer,0,0);ok(C.hurt(dozer));eq(dozer.shield,2);eq(dozer.hp,7);ok(!C.hurt(dozer),'invulnerability window');
let loser=C.create();C.input(loser,0,0);for(let i=0;i<7;i++){loser.cool=0;C.hurt(loser);}eq(loser.phase,'lost');eq(loser.hp,0);ok(!C.bank(C.fresh(),loser));let retry=C.create(loser.index);eq(retry.hp,7);eq(retry.kills,0);
for(let raw of ['null','{}','bad','[]',JSON.stringify({...C.fresh(),unlocked:10}),JSON.stringify({...C.fresh(),stars:[-1,0,0,0]})])eq(C.decode(raw),C.fresh());
console.log(JSON.stringify({checks,reports},null,2));

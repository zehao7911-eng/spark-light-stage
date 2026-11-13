import assert from 'node:assert/strict';
import * as Flight from './core.mjs';

const input = (run, step) => {
  const drop = Flight.destination(run);
  const remaining = (Flight.world.landing - run.y) / Math.max(109, run.vy);
  const target = Flight.platformAt(drop,run.time + remaining);
  const wind = Flight.windAt(drop,run.time,run.y) * 1.17;
  return {open:true,steer:Math.max(-1,Math.min(1,(target-run.x)*.045 - run.vx*.014 - wind/150))};
};
let checks=0, routes=0, drops=0;
function test(expression,message){assert.ok(expression,message);checks++;}
function settle(run, step, controls, host){
  for(let i=0;i<900;i++){
    const result=Flight.tick(run,step,controls(run,step),host);
    if(result)return result;
  }
  throw Error('Flight did not settle');
}
for(const rate of [30,60,120]){
  const pilot=Flight.profile();
  for(let index=0;index<Flight.routes.length;index++){
    let starts=0,ends=0;
    const host={start:()=>starts++,end:()=>ends++}, run=Flight.newRoute(index);
    for(let parcel=0;parcel<3;parcel++){
      test(Flight.takeOff(run,host),'launch only from ready');
      test(!Flight.takeOff(run,host),'ignore duplicate launch');
      const result=settle(run,1/rate,input,host);
      test(result==='perfect', 'route '+index+', parcel '+parcel+', rate '+rate+', x '+run.x);
      test(run.drop===parcel+1&&run.perfect===parcel+1,'successful delivery recorded');
      test(Flight.tick(run,1,{},host)===null,'receipt does not advance');
      if(parcel<2)test(Flight.nextDrop(run),'launch next parcel');
      drops++;
    }
    test(run.phase==='done'&&starts===3&&ends===1,'three accepted starts, single route end');
    test(Flight.earn(run,pilot)===3&&pilot.stars[index]===3,'three star route earned');
    const restored=Flight.restore(JSON.parse(JSON.stringify(Flight.checkpoint(run))),pilot);
    test(restored.phase==='done'&&restored.drop===3&&restored.perfect===3,'final receipt reloads');
    routes++;
  }
}
const pilot=Flight.profile();
const retry=Flight.newRoute();
Flight.takeOff(retry);
test(settle(retry,1/120,()=>({open:true,steer:-1}))==='miss','miss outside pad');
test(retry.misses===1&&retry.drop===0&&retry.phase==='receipt','miss can retry same parcel');
test(Flight.nextDrop(retry)&&retry.misses===1,'retry preserves route miss count');
Flight.takeOff(retry);
test(settle(retry,1/120,input)==='perfect','retry can land normally');
const checkpoint=Flight.checkpoint(retry);
const ready=Flight.restore(checkpoint,pilot);
test(ready.phase==='ready'&&ready.drop===1&&ready.perfect===1&&ready.misses===1,'reload between deliveries preserves checkpoint');
Flight.takeOff(ready);
for(let i=0;i<40;i++)Flight.tick(ready,1/120,{open:true,steer:.5});
const airborne=Flight.restore(Flight.checkpoint(ready),pilot);
test(airborne.phase==='ready'&&airborne.drop===1&&airborne.y===Flight.world.startY,'reload mid-flight restarts that parcel only');
test(Flight.restore({index:5,drop:2,perfect:2,misses:0},pilot).index===0,'locked checkpoint rejected');
test(Flight.restore({index:0,drop:3,perfect:3,misses:0},pilot).drop===0,'corrupt unearned receipt rejected');
const merged=Flight.mergeProfile({stars:[3],best:[3],sound:false,skin:'mint'},{stars:[1,2],best:[1,2],rewards:{like:true}});
test(merged.stars[0]===3&&merged.stars[1]===2&&merged.best[0]===3&&merged.skin==='mint'&&!merged.sound&&merged.rewards.like,'merge preserves local settings and best progress');
console.log(JSON.stringify({checks,routes,drops}));


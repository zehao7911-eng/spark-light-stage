import assert from 'node:assert/strict';
import {JOBS,TOYS,profile,start,capacity,wind,step,buy,cost,deliver,result,save,restore,clone} from '../core.mjs';
let checks=0;function ok(v,msg){assert.ok(v,msg);checks++;}function eq(a,b,msg){assert.deepEqual(a,b,msg);checks++;}
function tick(s,p,n){for(let i=0;i<n;i++)step(s,p,1/60);}
function full(s,p){wind(s,p,true);tick(s,p,Math.ceil(capacity(p)/7*60)+3);wind(s,p,false);}
function run(s,p){let n=0;while(s.packed.length<JOBS[s.job].kinds.length&&n++<150){full(s,p);tick(s,p,110);ok(s.items.length+s.packed.length===s.nextId,'Every spawned toy is accounted for');ok(s.energy>=0&&s.energy<=capacity(p),'Spring is bounded');}ok(n<150,'Normal wind/release route finishes');return result(s);}
let campaign=profile(),routes=[];
for(let level=0;level<8;level++){
 let s=start(level),r=run(s,campaign);eq(r.stars,3,'Full winding produces all shiny toys');eq(s.packed.map(x=>x.kind),JOBS[level].kinds,'The actual requested toy sequence reaches the truck');eq(s.items.length,0);let paid=deliver(s,campaign);ok(paid.paid>0);eq(s.status,'won');eq(deliver(s,campaign),null,'Duplicate dispatch cannot pay');let old=save(s,campaign);tick(s,campaign,600);eq(save(s,campaign),old,'Terminal state freezes');ok(restore(old),'Completed save is valid');routes.push({level:level+1,winds:s.winds,shiny:r.shiny,stars:r.stars});
 if(level===0)ok(buy(campaign,1),'First order pays for a visible gear upgrade');
 if(level===1)ok(buy(campaign,2),'Earned coins buy an auto-winding helper');
 if(level===2)ok(buy(campaign,0),'Earned coins buy a larger spring');
}
eq(campaign.records.reduce((a,r)=>a+r.stars,0),24);
for(let lv=0;lv<=3;lv++)for(let j=0;j<8;j++){
 let p=profile();p.upgrades=[lv,lv,lv];let s=start(j);run(s,p);eq(result(s).stars,3,'All authored orders finish with all upgrade configurations');let raw=save(s,p);ok(restore(raw));
}
// Save and exact continuation while a formed, partly painted batch is moving.
let p=profile(),s=start(4);full(s,p);tick(s,p,160);let a=restore(save(s,p));ok(a);eq(a.s.items,s.items);for(let i=0;i<120;i++){step(s,p,1/60);step(a.s,a.p,1/60);}eq(save(s,p),save(a.s,a.p),'Moving spring, queue and stages resume exactly once');
let p2=profile(),s2=start();tick(s2,p2,600);eq(s2.nextId,0,'No progress before first gesture');wind(s2,p2,true);tick(s2,p2,600);eq(s2.nextId,0,'Belt is held while winding');eq(s2.energy,6,'Long hold caps spring');wind(s2,p2,false);ok(s2.boost>0);tick(s2,p2,80);ok(s2.nextId>0);let pending=restore(save(s2,p2));ok(pending);eq(pending.s.holding,false);
let short=start(),sp=profile();wind(short,sp,true);tick(short,sp,3);wind(short,sp,false);eq(short.boost,0,'Short winding has no full spring boost');ok(short.energy>0);let near=start();wind(near,sp,true);tick(near,sp,39);wind(near,sp,false);ok(near.boost===0);tick(short,sp,300);ok(short.energy>=0);ok(short.nextId>0);
let idleHelper=start(),hp=profile();hp.upgrades[2]=3;tick(idleHelper,hp,3600);eq(idleHelper.nextId,0,'Helpers wait until player starts');wind(idleHelper,hp,true);tick(idleHelper,hp,2);wind(idleHelper,hp,false);tick(idleHelper,hp,5400);eq(idleHelper.packed.length,3,'Purchased helper really powers production');
let max=profile();max.coins=9999;for(let i=0;i<3;i++){for(let j=0;j<3;j++){let c=cost(max,i),old=max.coins;ok(buy(max,i));eq(max.coins,old-c);}eq(buy(max,i),false);}eq(max.upgrades,[3,3,3]);eq(buy(profile(),0),false);eq(buy(max,-1),false);eq(buy(max,4),false);
let pr=clone(campaign),replay=start(0);run(replay,pr);let before=pr.coins;eq(deliver(replay,pr).paid,0,'Repeating same quality cannot farm upgrade currency');eq(pr.coins,before);
let bad=['','{}','null','{"v":1}',save(start(),profile()).replace('"energy":0','"energy":-1'),save(start(),profile()).replace('"nextId":0','"nextId":5'),save(start(),profile()).replace('"stage":0','"stage":7')];for(let raw of bad.slice(0,-1))eq(restore(raw),null,'Malformed saves fail closed');
for(let mutate of [a=>a.s.job=8,a=>a.s.boost=9,a=>a.s.spawn=99,a=>a.p.upgrades[0]=5,a=>a.p.records[0].shiny=7,a=>a.p.coins=-1,a=>a.s.status='won',a=>a.s.items.push({id:0,kind:0,x:2,stage:3,shiny:true})]){let a=JSON.parse(save(start(),profile()));mutate(a);eq(restore(JSON.stringify(a)),null);}
let invalid=start();let snap=save(invalid,profile());step(invalid,profile(),NaN);step(invalid,profile(),-1);eq(save(invalid,profile()),snap);eq(deliver(invalid,profile()),null);
console.log(JSON.stringify({checks,routes,upgradeRoutes:32,status:'PASS'},null,2));

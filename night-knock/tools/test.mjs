import assert from 'node:assert/strict';
import {Shift,profile,fresh,record,buy,price,deck,RESIDENTS,MONSTERS} from '../core.mjs';
let checks=0;const eq=(a,b)=>{assert.deepEqual(a,b);checks++};
let p=profile(),r=fresh(p,531);eq(r.phase,'visit');eq(r.cases.length,6);eq(r.visitor.kind,'human');eq(r.decide(null),false);
for(let n=1;n<=25;n++){
 for(let i=0;i<r.cases.length;i++){
  let v=r.visitor,result=r.decide(v.kind==='human');eq(result.correct,true);eq(r.decide(false),false);let credits=r.credits;record(p,r);record(p,r);eq(p.coins,credits);eq(Shift.restore(r.save()).save(),r.save());eq(r.advance(),true);record(p,r);
 }
 eq(r.phase,'report');eq(r.done,n);eq(r.life,r.maxLife);eq(r.stamps,n*2);eq(Shift.restore(r.save()).save(),r.save());let stamp=p.stamps;record(p,r);eq(p.stamps,stamp);eq(r.advance(),false);eq(r.next(),true);eq(r.night,n+1);eq(Shift.restore(r.save()).save(),r.save());
}
eq(p.perfect,25);eq(p.nights,25);eq(p.found.sort(),['double','intruder','unit']);eq(p.people.length,8);let old=r,coins=p.coins;let newRun=fresh(p,532);record(p,old);eq(p.coins,coins);eq(newRun.night,1);eq(buy(p,'fuse'),true);eq(p.fuse,1);eq(buy(p,'fuse'),true);eq(buy(p,'fuse'),false);eq(buy(p,'pay'),true);eq(buy(p,'nope'),false);eq(newRun.maxLife,3);let upgraded=fresh(p,533);eq(upgraded.maxLife,5);eq(upgraded.pay,1);
for(let seed=1;seed<=150;seed++)for(let night=1;night<12;night++){
 let d=deck(night,seed);eq(d,deck(night,seed));eq(d.length,night===1?6:8);eq(night===1?d.filter(v=>v.kind==='human').length===3:d.filter(v=>v.kind==='human').length>=2&&d.filter(v=>v.kind==='human').length<=5,true);
 for(let v of d){eq(v.identity>=0&&v.identity<8,true);eq(v.kind==='unit'?v.claimed!==v.unit:v.claimed===v.unit,true);if(v.kind==='double')eq(v.face!==v.identity,true);if(v.kind==='intruder')eq(MONSTERS.includes(RESIDENTS[v.face].id),true)}
}
let bad=new Shift(8,77);for(let i=0;i<3;i++){eq(bad.decide(bad.visitor.kind!=='human').correct,false);bad.advance()}eq(bad.phase,'over');eq(bad.life,0);eq(bad.decide(true),false);eq(bad.next(),false);eq(Shift.restore(bad.save()).save(),bad.save());
let partial=new Shift(1,20);partial.decide(true);partial.advance();partial.decide(true);partial.advance();eq(partial.life,2);while(partial.phase==='visit'){partial.decide(partial.visitor.kind==='human');partial.advance()}eq(partial.stamps,1);eq(partial.phase,'report');partial.next();eq(partial.life,3);
let raw=upgraded.save();for(let x of [null,{}, {...raw,phase:'hack'},{...raw,schema:9},{...raw,life:99},{...raw,seed:0},{...raw,cases:[]},{...raw,credits:Infinity},{...raw,index:8},{...raw,found:['weird']},{...raw,people:['fake']},{...raw,result:{}}])eq(Shift.restore(x),null);
let poison={...raw,decide:'bad',save:'bad'};eq(typeof Shift.restore(poison).decide,'function');eq(profile(null).coins,0);eq(profile({coins:Infinity,fuse:100,pay:-9}).fuse,2);eq(profile({coins:Infinity}).coins,0);eq(price(profile(),'fuse'),70);
console.log(`PASS ${checks} gameplay checks: 25 perfect shifts, 150 seeded decks across 11 nights, failures, saving, rewards, upgrades and corrupt data.`);

import assert from'node:assert/strict';import{fresh,start,tour,begin,release,boost,cancel,step,bank,buy,price,stars,encode,decode}from'../core.mjs';
let checks=0;const ok=(v,m)=>{assert.ok(v,m);checks++},eq=(a,b,m)=>{assert.deepEqual(a,b,m);checks++};
function shot(save,i,charge=.9,mode='perfect'){let s=start(save,i);ok(begin(s));while(s.charge<charge)step(s,1/120);ok(release(s));for(let j=0;j<4000&&s.phase==='flying';j++){if(mode==='perfect'&&s.vy<0&&s.y<9&&s.boosts&&s.cool<=0)boost(s);else if(mode==='early'&&s.t>.4&&s.boosts&&s.cool<=0)boost(s);step(s,1/120)}ok(s.phase==='result');return s}
const report=[];
for(let level of [0,1,3]){let p=fresh();p.levels=[level,Math.min(level,3),Math.min(level,3)];p.unlocked=10;for(let world of [0,1,2]){let s=shot(p,world*3,.9);report.push({level,world,distance:Math.floor(s.x),time:s.t,perfects:s.perfects,rings:s.collected});ok(s.perfects===3);ok(s.x>tour(world*3).goal);eq(stars(s),3)}}
let p=fresh();for(let i=0;i<9;i++){let s=shot(p,i);ok(s.x>=s.goal,'campaign '+i+' reachable without grind');ok(bank(p,s));let raw=encode(p,s),coins=p.coins;ok(!bank(p,s));eq(p.coins,coins);let r=decode(raw);eq(r.coins,p.coins);ok(!bank(r,r.flight));eq(r.unlocked,i+1);eq(r.lastPaid,s.id);eq(r.shots,i+1);eq(r.flight.x,s.x)}eq(p.unlocked,9);ok(p.stars.every(n=>n>=1));
// Every automatic flight ends, even with no boost or badly timed boosts.
for(let mode of ['none','early','perfect'])for(let i=0;i<12;i++)for(let q of [.12,.45,.9]){let a=fresh();a.unlocked=i;let s=shot(a,i,q,mode);ok(s.t<=23.04&&Number.isFinite(s.x));ok(s.earned>=8);ok(s.boosts>=0&&s.boosts<=3);ok(s.perfects<=3)}
// Save-flight restore follows the identical deterministic fixed steps.
for(let i=0;i<9;i++){let a=fresh();a.unlocked=i;let s=start(a,i);begin(s);for(let n=0;n<140;n++)step(s,1/120);release(s);for(let n=0;n<160;n++)step(s,1/120);let b=decode(encode(a,s)),r=b.flight;ok(r?.phase==='flying');s.events=[];eq(s,r);for(let n=0;n<200;n++){step(s,1/120);step(r,1/120)}eq(s,r)}
let a=fresh(),s=start(a);ok(!boost(s));ok(!release(s));ok(begin(s));ok(!begin(s));step(s,.02);ok(cancel(s));eq(s.phase,'ready');ok(!cancel(s));begin(s);step(s,.02);let d=decode(encode(a,s));eq(d.flight.phase,'ready');eq(d.flight.charge,0);
a.coins=10000;for(let k=0;k<3;k++){for(let l=0;l<[5,3,3][k];l++){let old=a.coins,c=price(k,l);ok(buy(a,k));eq(a.coins,old-c)}ok(!buy(a,k))}ok(!buy(a,-1));ok(!buy(a,3));ok(!buy(a,.5));let b=fresh();ok(!buy(b,0));
for(let raw of ['null','{}','[]','oops',JSON.stringify({...fresh(),coins:-2}),JSON.stringify({...fresh(),levels:[8,0,0]}),JSON.stringify({...fresh(),stars:[1]}),JSON.stringify({...fresh(),unlocked:999})])eq(decode(raw),fresh());
// State doesn't drift while awaiting input, and invalid deltas do nothing.
s=start(fresh());let before=structuredClone(s);for(let i=0;i<300;i++)step(s,1/60);eq(s,before);for(let dt of [NaN,Infinity,-1,0])step(s,dt);eq(s,before);
console.log(JSON.stringify({checks,report,campaignStars:p.stars.reduce((a,b)=>a+b,0)},null,2));

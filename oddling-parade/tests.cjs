'use strict';
const assert=require('node:assert/strict');
const {Game,REQUESTS,profile,cleanProfile,award,nameOf}=require('./core.js');
let checks=0;
const ok=(a,b=true)=>{assert.deepEqual(a,b);checks++;};
const tick=(g,n=1)=>{for(let i=0;i<n;i++)g.step(1/60);};
function pinFamily(g,f){
  // The first request waits on its first pin. Unpinning starts normal moving practice.
  if(!g.started&&g.nearest().family!==f){g.pin();g.undo();}
  let ticks=0;
  while(g.nearest().family!==f||g.nearest().error>.145){
    if(!g.started)break;
    tick(g);if(++ticks>4000)throw Error('Could not reach part '+f);
  }
  ok(g.pin());
}
function stitch(g,parts){parts.forEach(f=>pinFamily(g,f));ok(g.phase,'sew');tick(g,90);ok(g.phase,'result');ok(g.result.parts,parts);return g.result;}
const opening=new Game();tick(opening,1200);ok(opening.started,false);ok(opening.active,0);ok(opening.offsets,[0,0,0]);
opening.pin();tick(opening,6);opening.pin();tick(opening,6);opening.pin();tick(opening,90);
ok(opening.result.stars,3);ok(opening.result.matches,3);ok(opening.result.parts,[0,0,0]);
const fixed=opening.snapshot();tick(opening,300);ok(opening.snapshot(),fixed);ok(opening.pin(),false);ok(opening.undo(),false);
const p=profile(),requests=[];
for(let i=0;i<12;i++){
  const g=new Game(i),r=stitch(g,REQUESTS[i].parts);
  ok(r.stars,3);ok(r.matches,3);ok(g.available,i<3?3:i<6?4:5);
  const a=award(p,g);ok(a.fresh);ok(p.unlocked,i+1);ok(p.stars[i],3);
  const saved=JSON.stringify(p);ok(award(p,g).fresh,false);ok(JSON.stringify(p),saved);
  const restored=Game.restore(g.snapshot());ok(restored.snapshot(),g.snapshot());ok(restored.result,g.result);
  requests.push({request:i+1,parts:r.parts,score:r.score});
}
ok(p.unlocked,12);ok(p.stars.reduce((a,b)=>a+b,0),36);
const all=profile();
for(let a=0;a<5;a++)for(let b=0;b<5;b++)for(let c=0;c<5;c++){
  const g=new Game(12),r=stitch(g,[a,b,c]);const added=award(all,g);ok(added.fresh);ok(r.stars,0);ok(nameOf(r.parts).length>5);
}
ok(Object.keys(all.specimens).length,125);
const undo=new Game(4);pinFamily(undo,0);ok(undo.active,1);ok(undo.undo());ok(undo.active,0);ok(undo.chosen,[]);ok(undo.undo(),false);
const tug=new Game();ok(tug.nudge(-1));ok(tug.nearest().family,1);ok(tug.started);tug.dragging=true;const tugOffset=tug.offsets[0];tick(tug,60);ok(tug.offsets[0],tugOffset);ok(tug.nudge(NaN),false);ok(Game.restore(tug.snapshot()).dragging,false);tug.nudge(1);ok(tug.nearest().family,0);tug.dragging=false;
const tugSave=tug.snapshot();tug.nudge(Infinity);ok(tug.snapshot(),tugSave);ok(opening.nudge(1),false);
const slow=new Game(3),normal=Game.restore(slow.snapshot());slow.slow=true;tick(slow,30);tick(normal,30);
ok(Math.abs((slow.offsets[0]-3.18)/.22-(normal.offsets[0]-3.18))<1e-9);
const slowSave=Game.restore(slow.snapshot());ok(slowSave.slow,false);ok(slowSave.offsets,slow.offsets);
const partial=new Game(8);pinFamily(partial,3);tick(partial,71);partial.events=[];
const continued=Game.restore(partial.snapshot());ok(continued.snapshot(),partial.snapshot());
tick(partial,213);tick(continued,213);ok(continued.snapshot(),partial.snapshot());
pinFamily(partial,2);pinFamily(partial,1);tick(partial,31);
const sewn=Game.restore(partial.snapshot());ok(sewn.snapshot(),partial.snapshot());tick(partial,70);tick(sewn,70);ok(sewn.snapshot(),partial.snapshot());ok(sewn.result,partial.result);
const remix=new Game(2);stitch(remix,[0,1,0]);ok(remix.result.stars,1);const less=award(p,remix);ok(p.stars[2],3);ok(p.unlocked,12);ok(p.specimens[less.key]>0);
const valid=new Game(3).snapshot();
for(const change of [
  {job:-1},{job:13},{phase:'hidden'},{offsets:[Infinity,0,0]},{offsets:[4,0,0]},
  {chosen:[-1],active:1,quality:[0]},{chosen:[4],active:1,quality:[0]},
  {chosen:[0],active:0,quality:[0]},{chosen:[0],active:1,quality:[NaN]},
  {phase:'result',chosen:[],active:0,quality:[]},{age:Infinity},{time:-1}
])ok(Game.restore({...valid,...change}),null);
ok(Game.restore(null),null);ok(Game.restore({}),null);
const clean=cleanProfile({stars:[99,-2,2],scores:[Infinity,-20,50000],unlocked:999,specimens:{'000':22,'444':20,'999':9,'hello':2},last:[[0,0,8]]});
ok(clean.stars.slice(0,3),[3,0,2]);ok(clean.unlocked,12);ok(Object.keys(clean.specimens).sort(),['000','444']);ok(clean.last[0],null);
console.log(JSON.stringify({passed:true,checks,request_routes:requests,combinations:125,coverage:'12 requested perfect assemblies and all125 free combinations through ordinary step/pin/undo controls; idempotent awards, unlocks, slower ribbons, exact partial/sewing/result restore, invalid snapshots. Controller routes are not human play evidence.'}));

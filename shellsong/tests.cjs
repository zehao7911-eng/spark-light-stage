/* Node tests exercise the shipped model; no libraries or installation needed. */
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path'),C=require('./core.js');
vm.runInThisContext(fs.readFileSync(path.join(__dirname,'levels.js'),'utf8'));const L=ShellLevels;let checks=0;
function eq(a,b){assert.deepEqual(a,b);checks++;}function ok(a){assert.ok(a);checks++;}
// Deliberately independent ring oracle, without plan/frame helpers.
function oracle(start,source){let a=[...start,0],hand=a[source],where=source;a[source]=0;while(hand){where++;if(where===7)where=0;a[where]++;hand--;}return{pits:a.slice(0,6),bank:a[6]};}
let seed=18819;function rand(n){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n;}
for(let trial=0;trial<900;trial++){
 let p=[0,0,0,0,0,0],total=1+rand(12);for(let k=0;k<total;k++)p[rand(6)]++;
 for(let source=0;source<6;source++){if(!p[source])continue;let q=C.plan(p,source),o=oracle(p,source);eq({pits:q.pits,bank:q.bank},o);eq(C.sum(q.pits)+q.bank,total);eq(p.reduce((a,b)=>a+b,0),total);
  for(let t=0;t<q.duration+.04;t+=.047){let f=C.frame(p,source,t);eq(C.sum(f.pits)+f.bank+f.held+Number(!!f.flight),total);ok(f.held>=0);}
  const s={...C.fresh({pits:p}),bank:0};ok(C.begin(s,source));ok(!C.begin(s,source));eq(C.restore(JSON.parse(JSON.stringify(s)),{pits:p}),s);C.finish(s);eq(s.pits,o.pits);eq(s.bank,o.bank);s.hinted=true;ok(C.undo(s));eq(s.pits,p);eq(s.moves,0);eq(s.hinted,true);
 }
}
eq(L.length,12);const seen=new Set();let prev=0,turns=0;
for(const l of L){ok(C.valid(l.pits));ok(!seen.has(l.pits.join()));seen.add(l.pits.join());ok(l.par>=prev);prev=l.par;const route=C.solve(l.pits);eq(route.length,l.par);eq(route,l.solution);const s=C.fresh(l);for(const source of route){ok(C.begin(s,source));const q=C.plan(s.pits,source);s.pending.age=q.duration*.6;const copy=C.restore(JSON.parse(JSON.stringify(s)),l);eq(copy,s);C.finish(s);turns++;eq(C.sum(s.pits)+s.bank,C.sum(l.pits));}eq(C.sum(s.pits),0);eq(s.bank,C.sum(l.pits));eq(C.stars(s.moves,l.par,false),3);
 // Deviate from the opening route; the actual current board must still be solved.
 const first=l.pits.findIndex(Boolean),q=C.plan(l.pits,first),adapt=C.solve(q.pits);ok(Array.isArray(adapt));let p=q.pits;for(const m of adapt)p=C.plan(p,m).pits;eq(C.sum(p),0);
}
eq(L[0].pits,[0,0,0,0,0,1]);eq(L[0].par,1);eq(C.solve([0,0,0,0,0,0]),[]);eq(C.solve([13,0,0,0,0,0]),null);eq(C.plan([1,0,0,0,0,0],6),null);
for(const bad of[null,{},[],{pits:[NaN,0,0,0,0,0]}, {...C.fresh(L[1]),bank:9}, {...C.fresh(L[1]),moves:-1}])eq(C.restore(bad,L[1]),C.fresh(L[1]));
eq(C.stars(1,1,true),1);eq(C.stars(3,1,false),3);eq(C.stars(4,1,false),2);
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'assets/art-manifest.json')));eq(manifest.assets.length,7);eq(manifest.boxes.keepsakes.length,12);eq(manifest.boxes.props.length,4);for(const[name,boxes]of Object.entries(manifest.boxes)){const im=manifest.assets.find(a=>a.file===name+'.webp');for(const b of boxes){ok(b.x>0&&b.y>0&&b.w>0&&b.h>0&&b.x+b.w<im.width&&b.y+b.h<im.height);}}
for(const file of['index.html','style.css','app.js','core.js','art.js','art-data.js','levels.js','solver-worker.js'])ok(fs.statSync(path.join(__dirname,file)).size>50);
console.log(JSON.stringify({result:'PASS',checks,levels:12,optimalCampaignTurns:turns,tests:'Independent sowing oracle, randomized conservation including every flight, pause/restore/undo, adaptive solving, campaign, malformed saves and bounded art crops'},null,2));

import assert from'node:assert/strict';import{LEVELS,fresh,start,resume,extend,commit,cancel,undo,guide,connected,delivered,sprinkles,stars,score,snapshot,restore}from'./core.js';
let checks=0;const ok=(a,m)=>{assert.ok(a,m);checks++;},eq=(a,b)=>{assert.deepEqual(a,b);checks++;};
function route(s,r){ok(start(s,r[0]),'start');for(let c of r.slice(1))ok(extend(s,c),'legal route');ok(commit(s),'commit');}
for(let i=0;i<12;i++){let l=LEVELS[i],s=fresh(i);eq(s.paths.length,l.pairCount);for(let r of l.routes){let before=snapshot(s);ok(start(s,r[0]));if(r.length>2)ok(extend(s,r[1]));ok(cancel(s));eq(snapshot(s),before);route(s,r);eq(snapshot(restore(snapshot(s))),snapshot(s));}ok(s.won);eq(delivered(s),l.pairCount);eq(sprinkles(s),2);eq(stars(s),3);eq(score(s),l.pairCount*200+600);let ended=snapshot(s);ok(!start(s,l.routes[0][0]));ok(!resume(s,0));ok(!guide(s));ok(!undo(s));eq(snapshot(s),ended);
 // Opposite endpoints are a valid orientation. Per-cell tapping can resume a ribbon.
 s=fresh(i);for(let r of l.routes){r=[...r].reverse();ok(start(s,r[0]));ok(commit(s));for(let c of r.slice(1)){ok(resume(s,s.paths.findIndex(a=>a[0]===r[0])));ok(extend(s,c));ok(commit(s));}}ok(s.won);eq(stars(s),3);
 // Guide does not change a tile or deliver a treat, and undo cannot erase its use.
 s=fresh(i);let before=snapshot(s);ok(guide(s));eq(s.paths,before.paths);eq(delivered(s),0);route(s,l.routes[0]);if(!s.won){ok(undo(s));eq(s.hints,1);eq(s.paths,before.paths);}for(let r of l.routes)route(s,r);eq(stars(s),2);
}
let s=fresh();ok(!start(s,0));ok(!extend(s,6));ok(start(s,5));ok(!start(s,17));ok(!extend(s,11),'diagonal rejected');ok(!extend(s,17),'other endpoint rejected');ok(extend(s,6));ok(extend(s,5),'backtrack');eq(s.paths[0],[5]);ok(extend(s,6));ok(commit(s));eq(s.paths[0],[5,6]);let stable=snapshot(s);ok(resume(s,0));ok(extend(s,7));ok(cancel(s));eq(snapshot(s),stable);eq(snapshot(restore(stable)),stable);ok(undo(s));eq(s.paths[0],[]);
route(s,[5,6,7]);ok(start(s,17));ok(extend(s,12));ok(extend(s,11));ok(!extend(s,6),'ribbons cannot cross');ok(cancel(s));route(s,[17,18,19]);ok(s.won);eq(stars(s),3);ok(new Set(s.paths.flat()).size<25,'no fill-all condition');
for(let a of[null,{}, {i:99}, {...stable,paths:[[5,11],[]]}, {...stable,paths:[[5,6,5],[]]}, {...stable,paths:[[5,6,7,8],[]]}, {...stable,paths:[[5,6],[17,12,7,6]]},{...stable,hints:-1},{...stable,moves:Infinity}])eq(snapshot(restore(a)),snapshot(fresh()));
// Illegal occupied wood cells remain outside the drawable graph.
s=fresh(2);const hole=LEVELS[2].holes[0];ok(LEVELS[2].routes.every(r=>!r.includes(hole)));
console.log(JSON.stringify({checks,courses:12,all_three_star:true,reversed_tap_routes:true,cancel_restore:true,crossing_rejected:true,guide_undo_sticky:true}));

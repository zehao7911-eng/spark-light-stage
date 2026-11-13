import assert from 'node:assert/strict';
import {create,profile,dash,trace,step,suggest,stars,award,restore,restoreProfile,unlocked,pointSegment,seedNext,walls} from './model.mjs';
let checks=0;const ok=(x,m)=>{assert(x,m);checks++;};const equal=(a,b,m)=>{assert.deepEqual(a,b,m);checks++;};const clone=a=>JSON.parse(JSON.stringify(a));
function settle(s){for(let i=0;i<150&&!s.finished&&s.phase!=='ready';i++)step(s,1/60);ok(s.finished||s.phase==='ready','a stroke settles');}
function finish(s){let moves=0;while(!s.finished&&moves<130){const q=suggest(s);ok(q,'a recovery line exists');ok(dash(s,q),'suggested gesture commits');settle(s);moves++;}ok(s.finished,'ordinary gestures complete garden');return moves;}
const routes=[],p=profile();
for(let i=0;i<8;i++){
 const s=create(i);const idle=JSON.stringify(s);for(let t=0;t<1200;t++)step(s,1/60);equal(JSON.stringify(s),idle,'no idle harm or free progress');
 ok(!dash(s,s.hero));ok(!dash(s,{x:NaN,y:0}));const moves=finish(s);ok(stars(s)===3,'plain brush has a three-petal route');award(s,p);const before=clone(p);award(s,p);equal(p,before,'best awards idempotent');const frozen=clone(s);ok(!dash(s,{x:50,y:140}));for(let t=0;t<60;t++)step(s,.1);equal(s,frozen,'terminal state immutable');routes.push({garden:i+1,dashes:moves,chain:s.bestChain,bumps:s.bumps,petals:stars(s)});
}
ok(p.stars.reduce((a,b)=>a+b,0)===24);ok(unlocked(p,'leaf')&&unlocked(p,'bloom')&&unlocked(p,'bell'));ok(!unlocked(profile(),'leaf'));
// A shield's visible right-facing side really blocks a front approach.
{
 const s=create();s.enemies=[{...s.enemies[0],x:180,y:200,originX:180,originY:200,type:'guard',face:0}];s.hero={x:250,y:200};ok(dash(s,{x:105,y:200}));ok(s.pending.blocked.length===1&&s.enemies.length===1);settle(s);s.hero={x:105,y:200};ok(dash(s,{x:250,y:200}));ok(!s.enemies.length,'back approach removes shield');
}
// The boulder clips the stroke before a target behind it; no tunnelling.
{
 const s=create(3);s.hero={x:104,y:330};s.enemies=[{...s.enemies[0],x:104,y:180,type:'wisp',hp:1,maxHp:1}];const tr=trace(s,{x:104,y:128});ok(tr.wall&&tr.end.y>259&&tr.end.y<263);ok(dash(s,{x:104,y:128}));ok(s.kills===0&&s.enemies.length===1);
}
// Danger is checked at the landing, not against the protected travelling body.
for(const charm of ['brush','bell']){
 const s=create(0,charm);s.hero={x:180,y:250};s.enemies=[{...s.enemies[2],x:180,y:200,type:'wisp',hp:1}];ok(dash(s,{x:180,y:230}));ok(s.kills===0);ok(charm==='bell'?s.bumps===0&&s.shield===1:s.bumps===1);
}
// The three earned charms change actual collision reach, propagation or defence.
{
 for(const charm of ['brush','leaf']){const s=create(0,charm);s.enemies=[{...s.enemies[0],x:180,y:145}];ok(dash(s,{x:180,y:128}));ok(charm==='leaf'?s.kills===1:s.kills===0);}
 for(const charm of ['brush','bloom']){const s=create(0,charm);s.enemies=s.enemies.map((e,i)=>({...e,x:i===2?225:180,y:i===1?245:300}));ok(dash(s,{x:180,y:180}));ok(s.kills===(charm==='bloom'?3:2));}
}
// Interrupted dash and between-round states resume the same committed outcome.
for(let level=0;level<8;level++)for(const charm of ['brush','leaf','bloom','bell']){
 const s=create(level,charm),q=suggest(s);ok(dash(s,q));for(let t=0;t<7;t++)step(s,1/60);const restored=restore(JSON.stringify(s));ok(restored,'dash save accepted');equal(restored,s,'exact pending state');for(let t=0;t<130;t++){step(s,1/60);step(restored,1/60);}equal(restored,s,'same resumed result');const n=finish(s);ok(n<130);ok(stars(s)>=2);award(s,p);
}
// Off-route moves can always be recovered using the ordinary visible Hint action.
let rng=12345;
for(let level=0;level<8;level++)for(let seed=0;seed<4;seed++){
 const s=create(level);for(let k=0;k<7;k++){rng=seedNext(rng);const x=45+rng%270;rng=seedNext(rng);const y=128+rng%265;if(dash(s,{x,y}))settle(s);if(s.finished)break;}
 finish(s);ok(stars(s)>=1);const record=p.stars[level];award(s,p);ok(p.stars[level]>=record,'worse replay cannot lose reward');
}
const wild=[];for(const seed of [1,37,991]){const s=create(7,'leaf',seed,true);const dashes=finish(s);award(s,p);wild.push({seed,dashes,score:s.score});}ok(p.wildBest>0);
// Independent dense point sampling checks continuous segment distances.
for(let i=0;i<90;i++){
 rng=seedNext(rng);const a={x:rng%320,y:(rng>>>8)%400};rng=seedNext(rng);const b={x:rng%320,y:(rng>>>8)%400};rng=seedNext(rng);const c={x:rng%320,y:(rng>>>8)%400};let sampled=Infinity;
 for(let k=0;k<=2000;k++){const t=k/2000;sampled=Math.min(sampled,Math.hypot(c.x-a.x-(b.x-a.x)*t,c.y-a.y-(b.y-a.y)*t));}
 const exact=pointSegment(c.x,c.y,a.x,a.y,b.x,b.y);ok(exact.d<=sampled+1e-8&&sampled-exact.d<.2,'swept distance agrees with sampled oracle');
}
for(const raw of [null,'bad',{}, {...create(),level:9},{...create(),phase:'win',finished:false},{...create(),hero:{x:NaN,y:180}},{...create(),hero:{x:1000,y:0}},{...create(),phase:'dash',pending:null},{...create(),enemies:[{type:'wisp'}]}])ok(!restore(raw),'invalid saves rejected');
equal(restoreProfile(null),profile());const locked=profile();locked.charm='bell';ok(restoreProfile(locked).charm==='brush');
console.log(JSON.stringify({checks,routes,wild,campaignPetals:p.stars.reduce((a,b)=>a+b,0),scope:'Pure model and deterministic ordinary actions; native browser play is tested separately.'}));

import assert from 'node:assert/strict';
import {STAGES,create,legal,counts,move,undo,choose,stars,reward,total,restore,put,advance} from './core.js';
let assertions=0;function check(v,msg){assert.ok(v,msg);assertions++}function eq(a,b,msg){assert.deepEqual(a,b,msg);assertions++}
// Independent 8-ray oracle: does not use the source Board or capture pairs.
function oracle(b,p){const n=b.length,out=[];for(let x=0;x<n;x++)for(let y=0;y<n;y++){if(b[x][y])continue;const flips=[];for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){if(!dx&&!dy)continue;let i=x+dx,j=y+dy,ray=[];while(i>=0&&j>=0&&i<n&&j<n&&b[i][j]===3-p){ray.push([i,j]);i+=dx;j+=dy}if(ray.length&&i>=0&&j>=0&&i<n&&j<n&&b[i][j]===p)flips.push(...ray)}if(flips.length)out.push({x,y,flips})}return out}
function canonical(ms){return ms.map(m=>[m.x,m.y,m.flips.map(q=>q.join(',')).sort()]).sort((a,b)=>a[0]-b[0]||a[1]-b[1])}
let seed=34234;function rand(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
for(const n of [4,6,8])for(let k=0;k<700;k++){const b=Array.from({length:n},()=>Array.from({length:n},()=>Math.floor(rand()*3)));for(const p of [1,2])eq(canonical(legal(b,p)),canonical(oracle(b,p)),`source/oracle n${n} case${k} player${p}`)}
const t=create();eq(legal(t.b,1).find(m=>m.x===3&&m.y===1).flips.length,2,'first 5 second capture');const first=move(t,3,1);eq(first.flips.length,2);check(t.ended&&t.result==='win');eq(stars(t),3);const snap=JSON.stringify(t);eq(move(t,0,0),null);eq(JSON.stringify(t),snap,'terminal guard');
const b=Array.from({length:6},()=>Array(6).fill(0));for(const [x,y] of [[0,2],[2,0],[4,2],[2,4],[0,0],[4,4],[0,4],[4,0]])b[x][y]=1;for(const [x,y] of [[1,2],[2,1],[3,2],[2,3],[1,1],[3,3],[1,3],[3,1]])b[x][y]=2;eq(put(b,2,2,1).flips.length,8,'all eight rays captured');eq(counts(b)[1],17);
const bad=create(1);const before=JSON.stringify(bad);eq(move(bad,0,0),null);eq(JSON.stringify(bad),before);
let wins=[],passes=0,losses=0,draws=0,maxTime=0;const profile={best:Array(6).fill(0),unlocked:0,outfit:0};
for(let stage=1;stage<6;stage++)for(let k=0;k<12;k++){
 const s=create(stage,123+k),beg=performance.now();let loops=0;
 while(!s.ended&&loops++<40){const ms=legal(s.b,s.turn);check(ms.length>0,'advance never leaves a stuck turn');const p=s.turn;const m=choose(s,p===1?3:STAGES[stage].depth);check(m&&oracle(s.b,p).some(q=>q.x===m.x&&q.y===m.y),'AI legal');const placed=move(s,m.x,m.y);check(placed?.flips.length>0,'capture happened');if(s.passed)passes++;const re=restore(JSON.stringify(s));check(re,'saved state accepted');eq(re.b,s.b,'board exact restore');eq(re.turn,s.turn);eq(re.seed,s.seed);}
 check(s.ended,'complete duel');maxTime=Math.max(maxTime,performance.now()-beg);if(s.result==='win'){wins.push(stage);reward(profile,s)}else if(s.result==='draw')draws++;else losses++;
 const replay=total(profile);reward(profile,s);eq(total(profile),replay,'repeat reward cannot farm');
}
for(let stage=1;stage<6;stage++)check(wins.includes(stage),'test player can beat stage '+stage);
reward(profile,t);eq(total(profile),18,'all 18 best stars reachable');eq(profile.unlocked,5,'all gardens unlocked');
const u=create(2,888);const u0=JSON.stringify(u);const m=choose(u,1);move(u,m.x,m.y);if(u.turn===2&&!u.ended){const ai=choose(u,1);move(u,ai.x,ai.y)}check(undo(u),'undo before human turn');eq(u.b,JSON.parse(u0).b);eq(u.undos,1);eq(u.turn,1);eq(u.history.length,0);check(!undo(u),'no nonexistent undo');
const tie={...create(1),b:[[1,2,1,2],[2,1,2,1],[1,2,1,2],[2,1,2,1]]};advance(tie);eq(tie.result,'draw');eq(stars(tie),0);
const full={...create(1),b:Array.from({length:4},()=>Array(4).fill(2))};advance(full);eq(full.result,'loss');eq(stars(full),0);
const restored=restore(JSON.stringify(create(3,123)));const re2=restore(JSON.stringify(restored));const c1=choose(restored,2),c2=choose(re2,2);eq(c1,c2,'AI exact RNG continuation');
for(const v of [null,'oops',{}, {...create(),b:[[4]]},{...create(),turn:3},{...create(),seed:-2.2},{...create(),moves:Infinity}])eq(restore(v),null,'reject malformed save');
console.log(JSON.stringify({assertions,oracleCases:4200,completeDuels:60,winningStages:[...new Set(wins)],wins:wins.length,losses,draws,passes,maxGameSearchMs:Math.round(maxTime),maxStars:total(profile)},null,2));

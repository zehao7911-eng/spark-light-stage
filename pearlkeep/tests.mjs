import assert from 'node:assert/strict';
import {Session,makePuzzle,profile,award} from './model.js';
let checks=0;const eq=(a,b)=>{assert.deepEqual(a,b);checks++;};
function settle(s){for(let n=0;s.busy()&&n<500;n++)s.step(1/120);assert.ok(!s.busy(),'Source must settle');s.step(1/120);checks++;}
for(let level=0;level<18;level++)for(let seed=341;seed<346;seed++){
 const s=new Session(level,seed);settle(s);s.events=[];
 for(const a of s.puzzle.guide){if(s.status==='won')break;if(a.kind==='send'&&s.slots(a.i)[a.d]<0)continue;if(a.kind==='rotate'&&!s.tiles[a.i].view().length)continue;
  assert.ok(s.act(a),`Rejected ${level}/${seed}: ${JSON.stringify(a)} ${JSON.stringify(s.allSlots())}`);s.step(1/120);
  const snapshot=s.snapshot(),r=new Session(level,seed,snapshot);eq(r.snapshot(),snapshot);for(let t=0;t<90;t++){s.step(1/120);r.step(1/120);}eq(r.snapshot(),s.snapshot());settle(s);
 }
 eq(s.status,'won');eq(s.groups,s.puzzle.groups);eq(s.marbles.length,0);eq(s.allSlots().flat().filter(c=>c>=0).length,0);eq(s.stars(),3);
 const p=profile();award(p,s);const before=JSON.stringify(p);award(p,s);eq(JSON.stringify(p),before);const snap=s.snapshot();s.step(50);eq(s.snapshot(),snap);
}
const s=new Session();eq(s.act({kind:'send',i:1,d:1}),false);eq(s.moves,0);eq(s.act({kind:'send',i:1,d:3}),true);eq(s.act({kind:'rotate',i:1}),false);settle(s);eq(s.groups,1);eq(s.status,'won');eq(s.score,500);
const u=new Session(4);settle(u);const slots=u.allSlots();let a={kind:'rotate',i:u.tiles.findIndex(t=>t.view().length)};eq(u.act(a),true);settle(u);eq(u.undo(),true);eq(u.allSlots(),slots);eq(u.undos,1);
const guide=new Session(5);guide.startGuide();settle(guide);for(let n=0;n<500&&guide.status!=='won';n++){const a=guide.nextGuide();assert.ok(a);assert.ok(guide.guideAct(a));settle(guide);}eq(guide.status,'won');eq(guide.stars(),2);
for(const mutate of [x=>x.tiles[0].state.orientation=8,x=>x.marbles.push({}),x=>x.score=NaN]){const bad=new Session().snapshot();mutate(bad);assert.throws(()=>new Session(0,341,bad));checks++;}
eq(profile({stars:Array(8).fill(99)}).stars,Array(8).fill(3));
console.log(`${checks} assertions passed: 90 full actual-engine puzzle routes, mid-flight/rotation restore, win/award/undo/guide/corrupt-save guards.`);

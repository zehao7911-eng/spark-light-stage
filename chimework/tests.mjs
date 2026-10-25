import assert from 'node:assert/strict';
import {Puzzle,LEVELS,restore} from './core.js';
import {Beat,hitDrums} from './source-beat.js';
let checks=0;const check=(v,message)=>{assert.ok(v,message);checks++;};
for(const [grid,dir] of [[{x:4,y:2},0],[{x:0,y:1},2],[{x:2,y:0},3],[{x:3,y:4},1]]){const b=new Beat(grid,dir);b.updateBeat();check(!b.alive,'All four bounds checked');}
{const b=new Beat({x:0,y:1},0);b.updateBeat();const h=hitDrums(b,[{x:1,y:1,bounceDir:3},{x:1,y:1,note:0,bounceDir:null}]);check(h.length===2,'Combined chime/direction hit');b.updateBeat();assert.deepEqual(b.grid,{x:1,y:0});checks++;}
const results=[];
for(let id=0;id<12;id++)for(const seed of [0,17,283]){
 let p=new Puzzle(id,seed);
 // Independent route reader: infer outgoing direction from authored path neighbors.
 for(let i=0;i<p.level.rotors.length;i++){
  const r=p.level.rotors[i],ri=p.level.route.findIndex(q=>q[0]===r.x&&q[1]===r.y),next=p.level.route[ri+1];
  const dx=next[0]-r.x,dy=next[1]-r.y,dir=dx===1?0:dy===1?1:dx===-1?2:3;
  for(let n=0;n<4&&p.dirs[i]!==dir;n++)check(p.rotate(i),'Real clockwise input');
 }
 const original=p.save();p=restore(JSON.parse(JSON.stringify(original)));assert.deepEqual(p.save(),original);checks++;
 check(p.play(),'Start');check(!p.rotate(0)&&!p.play()&&p.hint()===-1&&!p.undo(),'Inputs blocked during travel');
 let hits=[];for(let i=0;i<100&&p.status==='playing';i++)hits.push(...p.tick());
 check(p.won,`Tune ${id+1} seed ${seed} solved`);check(hits.filter(e=>e.type==='win').length===1,'Single settlement');
 check(hits.filter(e=>e.type==='note').length===p.level.bells.length,'All unique notes');check(p.stars()===3,'Minimum-turn three stars');
 const snapshot=JSON.stringify(p.save());p.tick();p.rotate(0);p.undo();p.hint();p.play();check(JSON.stringify(p.save())===snapshot,'Finished state immutable');
 if(seed===0)results.push({tune:id+1,turns:p.moves,steps:p.steps,bells:p.seen.length,stars:p.stars()});
}
{let p=new Puzzle(0);check(p.rotate(0),'First interaction solves one dial');check(p.dirs[0]===p.level.rotors[0].correct,'One-turn opening');check(p.undo()&&p.moves===0,'Undo');p.hint();p.play();while(p.status==='playing')p.tick();check(p.stars()===1,'Assisted result is honest');}
{const p=new Puzzle(0);p.play();for(let i=0;i<50&&p.status==='playing';i++)p.tick();check(p.status==='miss'&&!p.won,'Wrong direction fails softly');check(p.play(),'Retry is free');}
assert.throws(()=>restore({id:0,seed:0,dirs:[9],moves:0,hints:0,attempts:0}));checks++;
assert.throws(()=>restore({id:99,seed:0,dirs:[],moves:0,hints:0,attempts:0}));checks++;
assert.throws(()=>restore({id:0,seed:0,dirs:[1],moves:-1,hints:0,attempts:0}));checks++;
{const p=new Puzzle(0);for(let i=0;i<5;i++)p.rotate(0);p.play();while(p.status==='playing')p.tick();check(p.stars()===2,'Extra turns have two stars');}
{const p=new Puzzle(0);p.level={...p.level,bells:[...p.level.bells].reverse().map((b,i)=>({...b,note:i}))};p.rotate(0);p.play();let ev=[];while(p.status==='playing')ev.push(...p.tick());check(ev.some(e=>e.reason==='order'),'Wrong note order is rejected');}
{const p=new Puzzle(0);p.level={start:{x:0,y:0},end:{x:4,y:4},bells:[],rotors:[{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:0,y:0}]};p.dirs=[1,2,3,0];p.play();let ev=[];for(let i=0;i<40&&p.status==='playing';i++)ev.push(...p.tick());check(ev.some(e=>e.reason==='loop'),'A repeated position/direction ends a loop');}
console.log(JSON.stringify({passed:true,checks,campaign:results,remixSeeds:[17,283]},null,2));

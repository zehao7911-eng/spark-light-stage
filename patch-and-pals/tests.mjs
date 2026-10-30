import assert from 'node:assert/strict';
import {JOBS,create,items,pull,pump,releasePump,placePatch,step,stars,finish,restore} from './model.mjs';
let checks=0;const ok=(x,msg)=>{assert(x,msg);checks++;};let book=Array(9).fill(0),routes=[];
for(let j=0;j<9;j++){
 const s=create(j);ok(!placePatch(s,180,325),'no premature patch');ok(!pump(s,.1),'no premature stuffing');ok(!pull(s,99,90,90));
 for(const it of items(s)){
  ok(!pull(s,it.id,2,2),'short drags return');ok(!pull(s,it.id,NaN,90));
  ok(pull(s,it.id,it.length,0),'valid drag');ok(!pull(s,it.id,it.length*2,0),'no double item');ok(!!restore(JSON.stringify(s)),'plucked save');
 }
 ok(s.stage==='puff');ok(releasePump(s)==='more');
 while(s.fill<JOBS[j].target)pump(s,1/60);
 const mid=restore(JSON.stringify(s));ok(mid&&mid.fill===s.fill,'exact fill save');
 ok(releasePump(s)==='perfect');ok(s.stage==='patch');ok(!placePatch(s,2,2),'bad drop returns');ok(placePatch(s,180,325));ok(!placePatch(s,180,325));
 for(let i=0;i<40;i++)step(s,1/60);
 const re=restore(JSON.stringify(s));ok(re&&re.patchProgress===s.patchProgress,'mid stitch continuation');
 for(let i=0;i<120;i++){step(s,1/60);step(re,1/60);}ok(JSON.stringify(s)===JSON.stringify(re));ok(s.stage==='done'&&s.finished);ok(stars(s)===3);finish(s,book);ok(book[j]===3);finish(s,book);ok(book[j]===3,'idempotent best');const frozen=JSON.stringify(s);ok(!pump(s,.1));ok(!pull(s,0,100,100));ok(!placePatch(s,180,325));step(s,1);ok(frozen===JSON.stringify(s),'terminal immutable');routes.push({job:JOBS[j].name,pulls:s.pulls,hearts:stars(s)});
 const q=create(j);for(const it of items(q))pull(q,it.id,100,100);for(let i=0;i<300;i++)pump(q,1/60);ok(q.fill===1);ok(releasePump(q)==='puff'&&q.overs===1&&q.fill===.3,'recoverable overstuff');while(q.fill<JOBS[j].target)pump(q,1/60);releasePump(q);placePatch(q,180,325);for(let i=0;i<100;i++)step(q,1/60);ok(stars(q)===2);finish(q,book);ok(book[j]===3,'best never lowered');
}
for(const raw of ['bad',null,{}, {...create(),job:NaN},{...create(),removed:[0,0]},{...create(),fill:Infinity},{...create(),stage:'done',finished:true},{...create(),stage:'puff'}])ok(!restore(raw),'reject invalid');
// Every valid pull direction works: touch is not a hidden directional puzzle.
for(let angle=0;angle<32;angle++){const s=create();const a=angle*Math.PI/16;ok(pull(s,0,48*Math.cos(a),48*Math.sin(a)));}
ok(book.every(x=>x===3));
console.log(JSON.stringify({checks,routes,hearts:book.reduce((a,b)=>a+b,0),scope:'Pure model via ordinary actions; native browser verification is separate.'}));

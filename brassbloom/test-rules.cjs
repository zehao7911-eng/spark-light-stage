const assert=require('node:assert/strict'),R=require('./rules.js');
let fixed=0,bridges=0,total=0;
for(let id=0;id<1200;id++){
 const s=R.fresh();s.at=id;s.stars=Array(id).fill(0);const l=R.load(s);assert.deepEqual(l,R.level(id));assert.equal(new Set(l.path).size,l.path.length);assert.equal(l.path[0],l.start);assert.equal(l.path.at(-1),l.end);
 for(let k=1;k<l.path.length;k++){let a=l.path[k-1],b=l.path[k];assert.equal(Math.abs(a%l.n-b%l.n)+Math.abs(Math.floor(a/l.n)-Math.floor(b/l.n)),1,'broken generated path '+id);}
 for(const t of l.tiles){t.rot=t.solution;if(t.locked)fixed++;if(t.kind==='bridge')bridges++;}const tr=R.trace(l);assert.equal(tr.ok,true,'unsolvable '+id+' '+tr.reason);assert.equal(tr.bells.length,l.bells);if(l.ordered)assert.deepEqual(tr.bells,Array.from({length:l.bells},(_,i)=>i+1));
 R.remember(s,l);const before=s.coins,r=R.finish(s,l);assert.equal(r.ok,true);assert(s.coins>before);const paid=s.coins;R.finish(s,l);assert.equal(s.coins,paid,'duplicate reward');assert.deepEqual(R.restore(JSON.stringify(s)),s);assert(R.next(s));assert.equal(s.at,id+1);assert.equal(s.rot,null);total++;
}
{
 const s=R.fresh(),l=R.load(s);assert(!R.trace(l).ok);assert(!R.next(s));const i=R.hint(s,l);assert(i>=0);assert(R.trace(l).ok);assert.equal(R.finish(s,l).stars,1);assert.equal(R.hint(s,l),-1);
 const b=s.coins;s.coins=9999;assert(R.buy(s,0));assert.equal(s.up[0],1);assert.equal(s.coins,9999-55);assert(!R.buy(s,8));s.coins=0;assert(!R.buy(s,1));assert.equal(s.up[1],0);
}
assert.equal(R.restore('oops'),null);assert.equal(R.restore(JSON.stringify({...R.fresh(),coins:-1})),null);assert.equal(R.restore(JSON.stringify({...R.fresh(),rot:[3]})),null);
console.log('PASS',total,'deterministic solvable levels;',fixed,'fixed pieces;',bridges,'bridges. Settlement, hints, progression, purchases and saves verified.');

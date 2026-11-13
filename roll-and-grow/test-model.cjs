const assert=require('node:assert/strict');require('./model.js');const M=global.RollModel;
for(let n=0;n<3;n++){
 let a=M.state(n),b=M.state(n);assert.deepEqual(a,b);assert.equal(a.items.length,71);assert.equal(a.cm,48);assert.equal(a.seconds,M.rooms[n].time);
 let large=a.items.find(x=>x.tier===3);assert.equal(M.collect(a,large),false);assert.equal(a.count,0);
 for(let tier=0;tier<4;tier++)for(let item of a.items.filter(x=>x.tier===tier)){assert.equal(M.collect(a,item),true);let c=a.count;assert.equal(M.collect(a,item),false);assert.equal(a.count,c);}
 assert(a.cm>=M.rooms[n].goal);assert.equal(a.count,71);assert.equal(M.stars(a),3);a.ended=true;assert.equal(M.collect(a,{tier:0,collected:false}),false);
}
console.log('All 3 room inventories, thresholds, growth, completion and duplicate/terminal guards passed.');

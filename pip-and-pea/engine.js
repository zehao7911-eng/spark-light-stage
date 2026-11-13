(function(root){
 'use strict';
 const DIRS=[[0,-1],[1,0],[0,1],[-1,0]],clone=s=>JSON.parse(JSON.stringify(s)),same=(a,b)=>a[0]===b[0]&&a[1]===b[1];
 const ground=(s,p)=>p[0]<0||p[0]>=s.w||p[1]<0||s.grid[p[1]]?.[p[0]]==='#';
 const fruitAt=(s,p)=>s.fruit.findIndex(f=>same(f,p));
 function settle(s){
  const events=[];let falls=0;
  function resolve(){
   for(const b of s.birds){if(b.done)continue;if(b.body.some(p=>p[1]>=s.h||s.grid[p[1]]?.[p[0]]==='!')){s.failed=true;events.push({type:'fall',bird:b.id,pos:[...b.body[0]]});return false}}
   if(!s.fruit.length)for(const b of s.birds)if(!b.done&&same(b.body[0],s.nest)){events.push({type:'home',bird:b.id,pos:[...b.body[0]],body:clone(b.body)});b.done=true;b.body=[]}
   s.won=s.birds.every(b=>b.done);if(s.won)return false;return true;
  }
  for(let count=0;count<s.h*3;count++){
   if(!resolve())break;
   const alive=s.birds.filter(b=>!b.done),can=new Set(alive.map(b=>b.id)),deps=new Map();
   for(const b of alive){const dep=new Set();for(const p of b.body){const q=[p[0],p[1]+1];if(ground(s,q)||fruitAt(s,q)>=0)can.delete(b.id);for(const other of alive)if(other.id!==b.id&&other.body.some(o=>same(o,q)))dep.add(other.id)}deps.set(b.id,dep)}
   let altered=true;while(altered){altered=false;for(const id of [...can])if([...deps.get(id)].some(d=>!can.has(d))){can.delete(id);altered=true}}
   if(!can.size)break;for(const b of alive)if(can.has(b.id)){b.body=b.body.map(p=>[p[0],p[1]+1]);events.push({type:'drop',bird:b.id});falls++}
  }
  if(!s.failed&&!s.won)resolve();if(!s.birds.some(b=>b.id===s.active&&!b.done))s.active=s.birds.find(b=>!b.done)?.id??0;
  if(falls&&!s.failed)events.push({type:'land',amount:falls});return events;
 }
 function move(input,birdId,dir){
  if(input.failed||input.won)return{s:clone(input),changed:false,events:[]};const s=clone(input),bird=s.birds.find(b=>b.id===birdId&&!b.done);if(!bird)return{s,changed:false,events:[]};const [dx,dy]=DIRS[dir],next=[bird.body[0][0]+dx,bird.body[0][1]+dy];if(ground(s,next))return{s,changed:false,events:[]};const eating=fruitAt(s,next),grow=eating>=0;
  const own=grow?bird.body:bird.body.slice(0,-1);if(own.some(p=>same(p,next)))return{s,changed:false,events:[]};
  // Whole companions can be pushed. Their shape stays intact; translation chains
  // must be clear of the mover's retained body and of every solid cliff tile.
  const moved=new Set(),retained=own;
  function push(other,trail){if(moved.has(other.id))return true;if(trail.has(other.id))return false;const visited=new Set(trail);visited.add(other.id);const shifted=other.body.map(p=>[p[0]+dx,p[1]+dy]);
   if(shifted.some(p=>ground(s,p)||fruitAt(s,p)>=0||retained.some(o=>same(o,p))))return false;
   for(const b of s.birds)if(!b.done&&b.id!==other.id&&b.id!==bird.id&&shifted.some(p=>b.body.some(o=>same(o,p))))if(!push(b,visited))return false;
   other.body=shifted;moved.add(other.id);return true;
  }
  const hit=s.birds.find(b=>!b.done&&b.id!==bird.id&&b.body.some(p=>same(p,next)));if(hit&&!push(hit,new Set()))return{s:clone(input),changed:false,events:[]};
  bird.body.unshift(next);if(!grow)bird.body.pop();else s.fruit.splice(eating,1);bird.face=dir;s.active=bird.id;s.moves++;
  const events=[];if(grow)events.push({type:'eat',bird:bird.id,pos:next,amount:bird.body.length});if(moved.size)events.push({type:'push',amount:moved.size});events.push(...settle(s));return{s,changed:true,events};
 }
 function key(s){return s.birds.map(b=>b.done?'X':b.body.map(p=>p.join(',')).join(';')).join('|')+'#'+s.fruit.map(p=>p.join(',')).sort().join(';')}
 function solve(initial,limit=100000){
  const s=clone(initial);settle(s);if(s.failed)return null;if(s.won)return[];const queue=[{s,parent:-1,action:null}],seen=new Set([key(s)]);let cursor=0;
  while(cursor<queue.length&&queue.length<limit){const node=queue[cursor];for(const b of node.s.birds)if(!b.done)for(let d=0;d<4;d++){const out=move(node.s,b.id,d);if(!out.changed||out.s.failed)continue;const k=key(out.s);if(seen.has(k))continue;seen.add(k);const item={s:out.s,parent:cursor,action:[b.id,d]};queue.push(item);if(out.s.won){const path=[];let n=item;while(n.parent>=0){path.push(n.action);n=queue[n.parent]}return path.reverse()}}cursor++}return null;
 }
 const api={DIRS,clone,same,ground,fruitAt,settle,move,key,solve};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.WeaveEngine=api;
})(typeof window!=='undefined'?window:globalThis);

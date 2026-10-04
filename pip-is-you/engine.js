(function(root){
 'use strict';
 const N=['DUCK','ROCK','WALL','FLAG','WATER','LAVA','KEY','DOOR'];
 const P=['YOU','WIN','STOP','PUSH','SINK','HOT','MELT','OPEN','SHUT'];
 const DIRS=[[0,-1],[1,0],[0,1],[-1,0]];
 const clone=s=>JSON.parse(JSON.stringify(s));
 function rules(s){
  const map=new Map(),active=new Set(),list=[];
  for(const e of s.entities){if(!e.word)continue;const k=e.x+','+e.y;if(!map.has(k))map.set(k,[]);map.get(k).push(e)}
  for(const a of s.entities){if(!N.includes(a.word))continue;for(const [dx,dy] of [[1,0],[0,1]]){
   const mids=map.get((a.x+dx)+','+(a.y+dy))||[],ends=map.get((a.x+2*dx)+','+(a.y+2*dy))||[];
   for(const b of mids)if(b.word==='IS')for(const c of ends)if(N.includes(c.word)||P.includes(c.word)){
    const key=a.word+' IS '+c.word;if(!list.includes(key))list.push(key);active.add(a.id);active.add(b.id);active.add(c.id);
   }
  }}
  const props={},trans={};for(const n of N)props[n]=new Set();
  for(const text of list){const [a,,b]=text.split(' ');if(P.includes(b))props[a].add(b);else{(trans[a]??=[]).push(b)}}
  return{props,trans,list,active};
 }
 function is(r,e,p){return !e.word&&r.props[e.kind]?.has(p)}
 function settle(s){
  let r=rules(s);const events=[];
  const next=[];
  for(const e of s.entities){const targets=!e.word&&r.trans[e.kind];if(targets&&!targets.includes(e.kind)){
   targets.forEach((t,i)=>next.push({...e,id:i?++s.seq:e.id,kind:t}));events.push({type:'transform',x:e.x,y:e.y});
  }else next.push(e)}s.entities=next;r=rules(s);
  const cells=new Map();for(const e of s.entities){if(e.word)continue;const k=e.x+','+e.y;(cells.get(k)||cells.set(k,[]).get(k)).push(e)}
  const dead=new Set();for(const es of cells.values()){
   if(es.length>1&&es.some(e=>is(r,e,'SINK'))){es.forEach(e=>dead.add(e.id));events.push({type:'splash',x:es[0].x,y:es[0].y});continue}
   if(es.some(e=>is(r,e,'HOT')))for(const e of es)if(is(r,e,'MELT')){dead.add(e.id);events.push({type:'melt',x:e.x,y:e.y})}
   const opens=es.filter(e=>is(r,e,'OPEN')),shuts=es.filter(e=>is(r,e,'SHUT'));if(opens.length&&shuts.length){[...opens,...shuts].forEach(e=>dead.add(e.id));events.push({type:'unlock',x:es[0].x,y:es[0].y})}
  }
  s.entities=s.entities.filter(e=>!dead.has(e.id));r=rules(s);
  s.won=s.entities.some(e=>is(r,e,'YOU')&&s.entities.some(o=>o.x===e.x&&o.y===e.y&&is(r,o,'WIN')));
  s.stranded=!s.entities.some(e=>is(r,e,'YOU'));return events;
 }
 function move(input,dir){
  const s=clone(input);if(s.won)return{s,changed:false,events:[]};const [dx,dy]=DIRS[dir],r=rules(s),moved=new Set(),removed=new Set(),events=[];
  const at=(x,y)=>s.entities.filter(e=>!removed.has(e.id)&&e.x===x&&e.y===y);
  const hard=(x,y)=>x<0||y<0||x>=s.w||y>=s.h||s.terrain[y][x]==='#';
  function push(e,trail){
   if(moved.has(e.id)||removed.has(e.id))return true;if(trail.has(e.id))return false;
   const nx=e.x+dx,ny=e.y+dy;if(hard(nx,ny))return false;
   const nextTrail=new Set(trail);nextTrail.add(e.id);
   const snapshot=s.entities.map(o=>[o,o.x,o.y]),m0=new Set(moved),d0=new Set(removed),len=events.length;
   for(const o of at(nx,ny)){
    if(o.id===e.id)continue;
    if(!o.word&&((is(r,e,'OPEN')&&is(r,o,'SHUT'))||(is(r,e,'SHUT')&&is(r,o,'OPEN')))){
     removed.add(e.id);removed.add(o.id);events.push({type:'unlock',x:nx,y:ny});continue;
    }
    if(o.word&&!o.locked||is(r,o,'PUSH')){if(!push(o,nextTrail)){restore();return false}}
    else if(o.locked||is(r,o,'STOP')||is(r,o,'SHUT')){restore();return false}
   }
   if(!removed.has(e.id)){e.x=nx;e.y=ny;e.face=dir;moved.add(e.id)}return true;
   function restore(){snapshot.forEach(([o,x,y])=>{o.x=x;o.y=y});moved.clear();m0.forEach(v=>moved.add(v));removed.clear();d0.forEach(v=>removed.add(v));events.length=len}
  }
  const actors=s.entities.filter(e=>is(r,e,'YOU')).sort((a,b)=>(b.x-a.x)*dx+(b.y-a.y)*dy);
  for(const e of actors)push(e,new Set());s.entities=s.entities.filter(e=>!removed.has(e.id));
  const changed=moved.size>0||removed.size>0;
  if(changed){s.moves++;events.push(...settle(s));const after=rules(s);if(r.list.join('|')!==after.list.join('|'))events.push({type:'rule'});s.last=dir}
  return{s,changed,events};
 }
 function key(s){return s.entities.map(e=>[e.word||e.kind,e.x,e.y,e.locked?'!':''].join(':')).sort().join('|')}
 const api={N,P,DIRS,clone,rules,is,settle,move,key};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PipEngine=api;
})(typeof window!=='undefined'?window:globalThis);

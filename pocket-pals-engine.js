'use strict';
const PocketPuzzle=(()=>{
 const groups=[[0,1,4,3],[1,2,5,4],[3,4,7,6],[4,5,8,7]];
 function rotate(state,group,direction=1){if(!groups[group])throw Error('Unknown turn');const next=state.slice(),cells=groups[group];cells.forEach((cell,k)=>{next[cells[(k+(direction===1?1:3))%4]]=state[cell]});return next}
 function keyTurn(key,move){const a=key.split('');return rotate(a,move>>1,move%2?-1:1).join('')}
 function solve(start,target){const begin=start.join(''),end=target.join('');if(begin===end)return[];if(begin.split('').sort().join('')!==end.split('').sort().join(''))return null;
  const a=new Map([[begin,{p:null,m:-1}]]),z=new Map([[end,{p:null,m:-1}]]);let fa=[begin],fz=[end];
  function route(meet){const first=[];let node=meet;while(a.get(node).p!==null){const v=a.get(node);first.push(v.m);node=v.p}first.reverse();node=meet;while(z.get(node).p!==null){const v=z.get(node);first.push(v.m^1);node=v.p}return first}
  while(fa.length&&fz.length){const forward=fa.length<=fz.length,map=forward?a:z,other=forward?z:a,front=forward?fa:fz,next=[];for(const state of front)for(let move=0;move<8;move++){const q=keyTurn(state,move);if(map.has(q))continue;map.set(q,{p:state,m:move});if(other.has(q))return route(q);next.push(q)}if(forward)fa=next;else fz=next}return null;
 }
 function make(level,bank){const advanced=Math.min(40,bank.length-1),count=bank.length-advanced,index=level<=bank.length?level-1:advanced+(level-bank.length-1)%count,src=bank[index],cycle=level<=bank.length?0:1+Math.floor((level-bank.length-1)/count);let initial=src.initial.slice(),target=src.target.slice();
  for(let k=0;k<cycle%4;k++){const spin=a=>Array.from({length:9},(_,i)=>a[(2-i%3)*3+Math.floor(i/3)]);initial=spin(initial);target=spin(target)}return{level,initial,target,types:src.types,par:src.par};
 }
 const matched=(state,target)=>state.reduce((n,v,i)=>n+Number(v===target[i]),0);
 return{groups,rotate,solve,make,matched,keyTurn};
})();

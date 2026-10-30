/* SHELLSONG — deterministic solitaire sowing, no renderer dependencies. */
(function(root){
'use strict';
const SIZE=6, STEP=0.17, LIFT=0.18;
function valid(p){return Array.isArray(p)&&p.length===SIZE&&p.every(n=>Number.isInteger(n)&&n>=0&&n<=12)&&p.reduce((a,b)=>a+b,0)<=12;}
function sum(p){return p.reduce((a,b)=>a+b,0);}
function plan(p,source){
 if(!valid(p)||!Number.isInteger(source)||source<0||source>=SIZE||!p[source])return null;
 let counts=p.slice(),drops=[],bank=0,slot=source;const held=counts[source];counts[source]=0;
 for(let i=0;i<held;i++){slot=(slot+1)%7;if(slot===6)bank++;else counts[slot]++;drops.push(slot);}
 return{source,count:held,drops,pits:counts,bank,duration:LIFT+held*STEP+0.18};
}
function frame(p,source,age){
 const q=plan(p,source);if(!q)return null;
 const counts=p.slice();if(age<LIFT)return{pits:counts,bank:0,held:0,flight:null,landed:0};
 counts[source]=0;let bank=0;const t=Math.max(0,age-LIFT),landed=Math.min(q.count,Math.floor((t+1e-7)/STEP));
 for(let i=0;i<landed;i++){const d=q.drops[i];if(d===6)bank++;else counts[d]++;}
 const flying=landed<q.count,phase=(t-landed*STEP)/STEP;
 return{pits:counts,bank,held:q.count-landed-(flying?1:0),flight:flying?{from:landed?q.drops[landed-1]:source,to:q.drops[landed],phase}:null,landed};
}
function solve(start,limit=50000){
 if(!valid(start))return null;if(!sum(start))return[];
 const states=[start.slice()],parents=[-1],actions=[-1],seen=new Set([start.join(',')]);
 for(let head=0;head<states.length&&head<limit;head++){
  for(let s=5;s>=0;s--){if(!states[head][s])continue;const next=plan(states[head],s).pits,key=next.join(',');if(seen.has(key))continue;
   const idx=states.length;states.push(next);parents.push(head);actions.push(s);seen.add(key);
   if(!sum(next)){const route=[];for(let j=idx;parents[j]>=0;j=parents[j])route.push(actions[j]);return route.reverse();}
  }
 }return null;
}
function stars(moves,par,hinted){return 1+Number(!hinted)+Number(!hinted&&moves<=par+2);}
function fresh(level){return{pits:level.pits.slice(),bank:0,moves:0,hinted:false,history:[],pending:null};}
function stateOK(s,total){return s&&valid(s.pits)&&Number.isInteger(s.bank)&&s.bank>=0&&sum(s.pits)+s.bank===total&&Number.isInteger(s.moves)&&s.moves>=0&&s.moves<=100000&&typeof s.hinted==='boolean';}
function restore(raw,level){
 if(!stateOK(raw,sum(level.pits)))return fresh(level);
 const s={pits:raw.pits.slice(),bank:raw.bank,moves:raw.moves,hinted:raw.hinted,history:[],pending:null};
 if(Array.isArray(raw.history))s.history=raw.history.slice(-100).filter(h=>stateOK(h,sum(level.pits))&&!h.pending).map(h=>({pits:h.pits.slice(),bank:h.bank,moves:h.moves,hinted:h.hinted}));
 if(raw.pending){const q=plan(s.pits,raw.pending.source);if(q&&Number.isFinite(raw.pending.age)&&raw.pending.age>=0&&raw.pending.age<q.duration)s.pending={source:q.source,age:raw.pending.age};}
 return s;
}
function begin(s,source){if(s.pending||!sum(s.pits))return false;const p=plan(s.pits,source);if(!p)return false;s.pending={source,age:0};return true;}
function finish(s){if(!s.pending)return false;const q=plan(s.pits,s.pending.source);s.history.push({pits:s.pits.slice(),bank:s.bank,moves:s.moves,hinted:s.hinted});if(s.history.length>100)s.history.shift();s.pits=q.pits;s.bank+=q.bank;s.moves++;s.pending=null;return true;}
function undo(s){if(s.pending)return false;const h=s.history.pop();if(!h)return false;const hinted=s.hinted;s.pits=h.pits.slice();s.bank=h.bank;s.moves=h.moves;s.hinted=hinted||h.hinted;return true;}
const api={SIZE,STEP,LIFT,valid,sum,plan,frame,solve,stars,fresh,restore,stateOK,begin,finish,undo};root.ShellCore=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);

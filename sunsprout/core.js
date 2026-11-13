(function(r){'use strict';
const dirs=[[-1,0],[0,-1],[0,1],[1,0]],opposite=[3,2,1,0],ROLL=.32,FALL=.55;
function cells(p){return p.o===1?[[p.x,p.y],[p.x+1,p.y]]:p.o===2?[[p.x,p.y],[p.x,p.y+1]]:[[p.x,p.y]];}
function raw(p,d){let{x,y,o}=p;const[dx,dy]=dirs[d];if(o===0){if(dx)x+=dx<0?-2:1;else y+=dy<0?-2:1;o=dx?1:2;}else if(o===1){if(dx){x+=dx<0?-1:2;o=0;}else y+=dy;}else{if(dy){y+=dy<0?-1:2;o=0;}else x+=dx;}return{x,y,o};}
function floor(l,x,y){return y>=0&&y<l.grid.length&&x>=0&&x<l.grid[0].length&&l.grid[y][x]!==' ';}
function valid(l,p){return p&&Number.isInteger(p.x)&&Number.isInteger(p.y)&&[0,1,2].includes(p.o)&&cells(p).every(([x,y])=>floor(l,x,y));}
function move(l,p,d){if(!Number.isInteger(d)||d<0||d>3||!valid(l,p))return null;const next=raw(p,d);return{next,safe:valid(l,next),win:next.o===0&&next.x===l.goal[0]&&next.y===l.goal[1]};}
function key(p){return p.x+','+p.y+','+p.o;}
function isWin(l,p){return p.o===0&&p.x===l.goal[0]&&p.y===l.goal[1];}
function solve(l,start=l.start){if(!valid(l,start))return null;if(isWin(l,start))return[];const nodes=[start],parent=[-1],action=[-1],seen=new Set([key(start)]);for(let head=0;head<nodes.length;head++)for(let d=0;d<4;d++){let q=move(l,nodes[head],d);if(!q.safe||seen.has(key(q.next)))continue;let ix=nodes.length;nodes.push(q.next);parent.push(head);action.push(d);seen.add(key(q.next));if(q.win){let a=[];for(let j=ix;parent[j]>=0;j=parent[j])a.push(action[j]);return a.reverse();}}return null;}
function fresh(l){return{pos:{...l.start},moves:0,falls:0,hinted:false,history:[],pending:null};}
function stateOK(l,s){return s&&valid(l,s.pos)&&Number.isInteger(s.moves)&&s.moves>=0&&s.moves<=100000&&Number.isInteger(s.falls)&&s.falls>=0&&s.falls<=100000&&typeof s.hinted==='boolean';}
function restore(raw,l){if(!stateOK(l,raw))return fresh(l);const s={pos:{...raw.pos},moves:raw.moves,falls:raw.falls,hinted:raw.hinted,history:[],pending:null};if(Array.isArray(raw.history))s.history=raw.history.slice(-100).filter(h=>stateOK(l,h)&&!h.pending).map(h=>({pos:{...h.pos},moves:h.moves,falls:h.falls,hinted:h.hinted}));if(raw.pending){const q=move(l,s.pos,raw.pending.dir);if(q&&Number.isFinite(raw.pending.age)&&raw.pending.age>=0&&raw.pending.age<duration(q))s.pending={dir:raw.pending.dir,age:raw.pending.age};}return s;}
function duration(q){return ROLL+(q.safe?0:FALL)+(q.win?.58:0);}
function begin(l,s,d){if(s.pending||isWin(l,s.pos))return false;const q=move(l,s.pos,d);if(!q)return false;s.pending={dir:d,age:0};return true;}
function finish(l,s){if(!s.pending)return null;const q=move(l,s.pos,s.pending.dir);s.pending=null;if(!q.safe){s.falls++;return q;}s.history.push({pos:{...s.pos},moves:s.moves,falls:s.falls,hinted:s.hinted});if(s.history.length>100)s.history.shift();s.pos=q.next;s.moves++;return q;}
function undo(s){if(s.pending||!s.history.length)return false;const h=s.history.pop(),hint=s.hinted,falls=s.falls;s.pos={...h.pos};s.moves=h.moves;s.falls=Math.max(h.falls,falls);s.hinted=hint||h.hinted;return true;}
function stars(s,l){return 1+Number(s.moves<=l.par+2)+Number(!s.hinted&&s.falls<=1);}
const api={dirs,opposite,ROLL,FALL,cells,raw,floor,valid,move,key,isWin,solve,fresh,stateOK,restore,duration,begin,finish,undo,stars};r.SproutCore=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);

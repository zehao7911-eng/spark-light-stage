(function(root){'use strict';const key=(x,y)=>x+','+y,dirs=[[1,0],[0,1],[-1,0],[0,-1]];
const specs=[
 {name:'First light',s:3,m:[[2,3,0]],t:[[2,0]]},
 {name:'A little detour',s:5,m:[[2,5,0],[2,2,0],[5,2,0]],t:[[5,0]]},
 {name:'Sun staircase',s:5,m:[[1,5,0],[1,3,0],[3,3,0],[3,1,0]],t:[[6,1]]},
 {name:'Twin sparks',s:2,p:[[2,2]],m:[[5,2,0],[2,5,1]],t:[[5,0],[5,5]]},
 {name:'Around the mist',s:4,m:[[1,4,0],[1,1,0],[4,1,1],[4,5,1],[6,5,0]],t:[[6,2]],b:[[3,4],[3,3]]},
 {name:'Long afternoon',s:5,m:[[1,5,0],[1,2,0],[3,2,1],[3,4,1],[5,4,0],[5,0,0]],t:[[6,0]]},
 {name:'A gentle fork',s:1,p:[[2,1]],m:[[5,1,1],[5,4,1],[2,5,1]],t:[[6,4],[4,5]]},
 {name:'Crystal chorus',s:3,p:[[2,3],[4,3]],m:[[2,6,1],[4,5,1],[6,3,0]],t:[[3,6],[5,5],[6,0]]},
 {name:'Quiet switchback',s:6,m:[[1,6,0],[1,1,0],[3,1,1],[3,5,1],[5,5,0],[5,2,0]],t:[[6,2]],b:[[2,3],[4,3]]},
 {name:'Three wishes',s:2,p:[[2,2],[4,2]],m:[[2,5,1],[4,4,1],[6,2,0]],t:[[5,5],[6,4],[6,0]]},
 {name:'Rose circuit',s:6,m:[[1,6,0],[1,2,0],[3,2,0],[3,0,0],[5,0,1],[5,5,1],[6,5,0]],t:[[6,3]],b:[[4,4],[2,4]]},
 {name:'The glasshouse',s:3,p:[[2,3],[4,3]],m:[[2,6,1],[5,6,0],[5,4,0],[4,5,1],[6,3,0]],t:[[6,4],[6,5],[6,0]],b:[[1,1],[3,5]]}
];
// 0 is /, 1 is \. A prism keeps the straight ray and adds a clockwise ray.
function level(n){let a=specs[n%12];return{name:a.name,source:a.s,mirrors:a.m.map(([x,y,solution],i)=>({x,y,solution,state:1-solution})),prisms:(a.p||[]).map(([x,y])=>({x,y})),targets:a.t.map(([x,y])=>({x,y})),blocks:(a.b||[]).map(([x,y])=>({x,y}))}}
function trace(l,states){let mir=new Map(l.mirrors.map((a,i)=>[key(a.x,a.y),states[i]])),pr=new Set(l.prisms.map(a=>key(a.x,a.y))),tar=new Map(l.targets.map((a,i)=>[key(a.x,a.y),i])),blocks=new Set(l.blocks.map(a=>key(a.x,a.y))),seen=new Set(),lit=Array(l.targets.length).fill(false),segments=[],queue=[{x:-.5,y:l.source,d:0,hue:0}];let capped=false;
while(queue.length&&segments.length<90){let r=queue.shift(),start={x:r.x,y:r.y},x=r.x,y=r.y,d=r.d;for(let step=0;step<60;step++){let dx=dirs[d][0],dy=dirs[d][1];if(x===-.5)x=0;else{x+=dx;y+=dy}if(x<0||x>6||y<0||y>6){segments.push({a:start,b:{x:x<0?-.5:x>6?6.5:x,y:y<0?-.5:y>6?6.5:y},hue:r.hue});break}let k=key(x,y),visit=k+','+d+','+r.hue;if(seen.has(visit)){segments.push({a:start,b:{x,y},hue:r.hue});break}seen.add(visit);if(tar.has(k)){lit[tar.get(k)]=true;segments.push({a:start,b:{x,y},hue:r.hue});break}if(blocks.has(k)){segments.push({a:start,b:{x,y},hue:r.hue});break}if(mir.has(k)){segments.push({a:start,b:{x,y},hue:r.hue});let s=mir.get(k);d=s===0?[3,2,1,0][d]:[1,0,3,2][d];start={x,y};continue}if(pr.has(k)){segments.push({a:start,b:{x,y},hue:r.hue});queue.push({x,y,d,hue:r.hue},{x,y,d:(d+1)%4,hue:(r.hue+1)%3});break}}
}if(queue.length)capped=true;return{lit,segments,solved:lit.every(Boolean),capped}}
class Game{constructor(s){this.day=s?.day||0;this.level=level(this.day);this.states=Array.isArray(s?.states)&&s.states.length===this.level.mirrors.length?s.states.slice():this.level.mirrors.map(a=>a.state);this.phase=s?.phase||'play';this.moves=s?.moves||0;this.assisted=s?.assisted||false;this.book=s?.book||[];this.finish=s?.finish||0;this.mute=s?.mute||false;this.undoStack=[]}get rays(){return trace(this.level,this.states)}turn(i,to){if(this.phase!=='play'||i<0||i>=this.states.length)return false;let next=to===undefined?1-this.states[i]:to;if(next===this.states[i]||![0,1].includes(next))return false;this.undoStack.push(this.states.slice());this.undoStack=this.undoStack.slice(-30);this.states[i]=next;this.moves++;return true}undo(){if(this.phase!=='play')return false;let h=this.undoStack.pop();if(!h)return false;this.states=h;this.moves=Math.max(0,this.moves-1);return true}hint(){this.assisted=true;let i=this.states.findIndex((s,i)=>s!==this.level.mirrors[i].solution);return i}reset(){if(this.phase!=='play')return;this.states=this.level.mirrors.map(a=>a.state);this.moves=0;this.undoStack=[]}win(){if(this.phase!=='play'||!this.rays.solved)return false;let stars=this.assisted?1:this.moves<=this.states.length+2?3:2;this.phase='win';this.book.push({day:this.day,stars,finish:this.finish,moves:this.moves});this.book=this.book.slice(-36);this.undoStack=[];return true}next(){if(this.phase!=='win')return;this.day++;this.level=level(this.day);this.states=this.level.mirrors.map(a=>a.state);this.phase='play';this.moves=0;this.assisted=false;this.undoStack=[]}snapshot(){return{day:this.day,states:this.states,phase:this.phase,moves:this.moves,assisted:this.assisted,book:this.book,finish:this.finish,mute:this.mute}}}
const api={Game,level,trace,specs,dirs};if(typeof module!=='undefined')module.exports=api;root.Lucent=api;})(typeof window!=='undefined'?window:globalThis);



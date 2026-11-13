(function(root){'use strict';const names=['Hello, little friend','A soft beginning','The carrot corner','Footprints at noon','Juniper lane','The narrow gate','A warm scarf','Moonlit courtyard','The frosted fountain','Three little wishes','Winter lanterns','A garden of friends'];
const levels=[
{p:14,b:[[12,3],[12,2],[13,1]],snow:[],walls:[0,4,20,24]},
{p:14,b:[[11,3],[13,1],[8,1]],snow:[12],walls:[0,4,20,24]},
{p:16,b:[[11,1],[13,1],[8,1]],snow:[6,7,12,17],walls:[0,4,20,24]},
{p:12,b:[[6,2],[8,1],[18,2]],snow:[7,11,13,16],walls:[0,4,20,24,2]},
{p:17,b:[[6,1],[8,1],[13,2]],snow:[7,11,12,16,18],walls:[0,4,20,24,10]},
{p:16,b:[[6,2],[8,1],[18,1]],snow:[7,11,12,13,17],walls:[0,4,20,24,22]},
{p:12,b:[[6,1],[8,1],[16,1]],snow:[7,11,13,17,18],walls:[0,4,20,24,22]},
{p:17,b:[[6,2],[8,1],[13,1]],snow:[7,11,12,18],walls:[0,4,20,24]},
{p:11,b:[[7,1],[8,1],[18,2]],snow:[6,12,13,16,17],walls:[0,4,20,24,22]},
{p:12,b:[[6,1],[8,2],[18,1]],snow:[7,11,13,16,17],walls:[0,4,20,24,10]},
{p:17,b:[[6,1],[8,1],[12,1]],snow:[7,11,13,16,18],walls:[0,4,20,24,22]},
{p:12,b:[[6,1],[8,1],[18,1]],snow:[7,11,13,16,17],walls:[0,4,20,24]}];
const dirs={up:-5,down:5,left:-1,right:1};
function fresh(n=0){const a=levels[n];return{v:1,n,p:a.p,balls:a.b.map(([p,z],id)=>({id,p,z})),snow:a.snow.slice(),steps:0,pushes:0,won:false,history:[],prints:[]};}
function stack(s,p){return s.balls.filter(b=>b.p===p).sort((a,b)=>b.z-a.z);}
function target(p,d){const q=p+dirs[d];return q>=0&&q<25&&(d==='left'||d==='right'?Math.floor(q/5)===Math.floor(p/5):true)?q:-1;}
function snap(s){const{history,...a}=s;return JSON.parse(JSON.stringify(a));}
function move(s,d){if(s.won||!(d in dirs))return{ok:false};const q=target(s.p,d),walls=levels[s.n].walls;if(q<0||walls.includes(q))return{ok:false};const a=stack(s,q),before=snap(s);let roll=null,grow=false,stacked=false;if(a.length){const b=a[a.length-1],dest=target(q,d),other=stack(s,dest);if(dest<0||walls.includes(dest)||other.length&&b.z>=other[other.length-1].z)return{ok:false};roll={id:b.id,from:q,to:dest,was:b.z};b.p=dest;if(!other.length&&s.snow.includes(dest)){s.snow=s.snow.filter(p=>p!==dest);if(b.z<3){b.z++;grow=true;}}stacked=other.length>0;s.pushes++;if(a.length===1)s.p=q;}else s.p=q;s.history.push(before);if(s.history.length>180)s.history.shift();s.steps++;s.prints.push({p:s.p,d});s.prints=s.prints.slice(-24);s.won=s.balls.every(b=>b.p===s.balls[0].p)&&s.balls.map(b=>b.z).sort().join('')==='123';return{ok:true,roll,grow,stacked,won:s.won};}
function undo(s){if(!s.history.length)return false;const old=s.history.pop(),h=s.history;Object.assign(s,old,{history:h});return true;}
function restore(a){if(!a||a.v!==1||!Number.isInteger(a.n)||a.n<0||a.n>=12||!Number.isInteger(a.p)||a.p<0||a.p>=25||levels[a.n].walls.includes(a.p)||!Array.isArray(a.balls)||a.balls.length!==3||a.balls.some(b=>!b||!Number.isInteger(b.p)||b.p<0||b.p>=25||levels[a.n].walls.includes(b.p)||![1,2,3].includes(b.z)||![0,1,2].includes(b.id))||new Set(a.balls.map(b=>b.id)).size!==3||!Array.isArray(a.snow)||a.snow.some(p=>!Number.isInteger(p)||p<0||p>=25||levels[a.n].walls.includes(p))||new Set(a.snow).size!==a.snow.length||!Number.isInteger(a.steps)||a.steps<0||!Number.isInteger(a.pushes)||a.pushes<0)return null;
for(let p=0;p<25;p++){const bs=stack(a,p);if(new Set(bs.map(b=>b.z)).size!==bs.length||p===a.p&&bs.length)return null;}const s=JSON.parse(JSON.stringify(a));s.won=s.balls.every(b=>b.p===s.balls[0].p)&&s.balls.map(b=>b.z).sort().join('')==='123';s.history=(Array.isArray(a.history)?a.history:[]).slice(-180).map(h=>restore({...h,history:[]})).filter(Boolean).map(snap);s.prints=(Array.isArray(a.prints)?a.prints:[]).filter(p=>Number.isInteger(p.p)&&p.p>=0&&p.p<25&&p.d in dirs).slice(-24);return s;}
const api={names,levels,dirs,fresh,stack,target,snap,move,undo,restore};if(typeof module!=='undefined')module.exports=api;else root.Frost=api;
})(typeof window==='undefined'?globalThis:window);

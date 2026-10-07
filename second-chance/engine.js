(function(root){'use strict';
const clone=x=>JSON.parse(JSON.stringify(x)),T={battery:1,wire:5,corner:3,tee:7,cross:15,speaker:8,bulb:8,motor:8,lens:8},names=['Sunday radio','Pocket camera','Little lantern','Wind-up friend','Cassette summer','Cloud projector','Desk fan','Midnight stereo'];
// Grid ports: E=1, S=2, W=4, N=8. Every powered connection must be reciprocal.
const layouts=[
[[0,1,'battery',0],[1,1,'wire',0],[2,1,'speaker',2]],
[[0,0,'battery',0],[1,0,'corner',1],[1,1,'wire',1],[1,2,'corner',3],[2,2,'lens',2]],
[[0,2,'battery',0],[1,2,'corner',2],[1,1,'corner',0],[2,1,'bulb',2]],
[[0,0,'battery',0],[1,0,'wire',0],[2,0,'corner',1],[2,1,'wire',1],[2,2,'motor',3]],
[[0,1,'battery',0],[1,1,'tee',0],[2,1,'speaker',2],[1,2,'bulb',3]],
[[0,0,'battery',0],[1,0,'corner',1],[1,1,'tee',3],[2,1,'lens',2],[1,2,'motor',3]],
[[0,2,'battery',0],[1,2,'corner',2],[1,1,'wire',1],[1,0,'corner',0],[2,0,'motor',2]],
[[0,1,'battery',0],[1,1,'cross',0],[2,1,'speaker',2],[1,0,'corner',0],[2,0,'bulb',2],[1,2,'motor',3]]
];
// End components have a single inlet, initially facing east like the battery.
for(const k of ['speaker','bulb','motor','lens'])T[k]=1;
const jobs=layouts.map((a,i)=>({name:names[i],slots:a.map(([x,y,type,r],id)=>({x,y,type,r,id})),color:['#d98968','#6e9790','#bba36c','#8d9ca8','#b6757c','#91a1a4','#92a585','#aa866c'][i]}));
function mask(type,r){let v=T[type];for(let i=0;i<r;i++)v=((v<<1)&15)|(v>>3);return v}
function make(level=0){const job=jobs[level];return{level,phase:'closed',screws:[0,0,0,0],parts:job.slots.map((v,i)=>({id:i,type:v.type,slot:-1,r:(i+level+1)%4})),undo:[],hints:0,tests:0,done:false,paid:false,t:0,seal:0}}
function remember(s){s.undo.push(clone({parts:s.parts,screws:s.screws,phase:s.phase}));if(s.undo.length>24)s.undo.shift()}
function screw(s,id,amount=.34){if(s.phase!=='closed'||id<0||id>3)return false;s.screws[id]=Math.min(1,s.screws[id]+Math.abs(amount));if(s.screws.every(v=>v>=1))s.phase='fit';return true}
function place(s,id,slot){if(s.phase!=='fit')return false;const p=s.parts[id],v=jobs[s.level].slots[slot];if(!p||!v||p.type!==v.type||s.parts.some(q=>q.id!==id&&q.slot===slot))return false;if(p.slot===slot)return false;remember(s);p.slot=slot;return true}
function rotate(s,id){if(s.phase!=='fit'||!s.parts[id])return false;remember(s);s.parts[id].r=(s.parts[id].r+1)%4;return true}
function remove(s,id){if(s.phase!=='fit'||!s.parts[id]||s.parts[id].slot<0)return false;remember(s);s.parts[id].slot=-1;return true}
function undo(s){const v=s.undo.pop();if(!v||s.phase!=='fit')return false;Object.assign(s,v);return true}
function power(s){const slots=jobs[s.level].slots,by=new Map(s.parts.filter(p=>p.slot>=0).map(p=>[p.slot,p])),seen=new Set(),queue=[];for(const [id,p]of by)if(p.type==='battery'){seen.add(id);queue.push(id)};const dirs=[[1,0,1,4],[0,1,2,8],[-1,0,4,1],[0,-1,8,2]];while(queue.length){const id=queue.shift(),v=slots[id],p=by.get(id),m=mask(p.type,p.r);for(const [dx,dy,a,b]of dirs){if(!(m&a))continue;const n=slots.findIndex(q=>q.x===v.x+dx&&q.y===v.y+dy),other=by.get(n);if(other&&!seen.has(n)&&(mask(other.type,other.r)&b)){seen.add(n);queue.push(n)}}}return[...seen]}
function test(s){if(s.phase!=='fit')return false;const lit=power(s),goal=jobs[s.level].slots.filter(v=>!['wire','corner','tee','cross','battery'].includes(v.type));const ok=s.parts.every(p=>p.slot>=0)&&goal.every(v=>lit.includes(v.id));if(ok){s.phase='seal';s.seal=0;s.undo=[]}else s.tests++;return ok}
function hint(s){if(s.phase!=='fit')return null;s.hints++;const job=jobs[s.level];for(const slot of job.slots){let p=s.parts.find(v=>v.slot===slot.id);if(!p){p=s.parts.find(v=>v.type===slot.type&&v.slot<0);if(p)return{part:p.id,slot:slot.id,r:slot.r}}else if(mask(p.type,p.r)!==mask(slot.type,slot.r))return{part:p.id,slot:slot.id,r:slot.r}}return null}
function step(s,dt,holding=false){s.t+=Math.min(dt,.05);if(s.done)return;if(s.phase==='seal'){s.seal=Math.min(1,s.seal+(holding?dt/1.4:0));if(s.seal>=1){s.done=true;s.phase='done'}}}
function profile(){return{stars:Array(8).fill(0),coins:0,bench:0,owned:[0],mute:false,cards:[]}}
function award(s,p){if(!s.done||s.paid)return 0;s.paid=true;const stars=1+(s.hints===0)+(s.tests===0),old=p.stars[s.level],gain=old?Math.max(0,stars-old):5+stars;p.stars[s.level]=Math.max(stars,old);p.coins+=gain;return gain}
function buy(p,i){if(i<0||i>3)return false;if(p.owned.includes(i)){p.bench=i;return true}const n=[0,12,18,24][i];if(p.coins<n)return false;p.coins-=n;p.owned.push(i);p.bench=i;return true}
const api={clone,jobs,T,mask,make,screw,place,rotate,remove,undo,power,test,hint,step,profile,award,buy};root.RepairEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);

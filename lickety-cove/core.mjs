export const FLAVOURS=[
 {name:'Vanilla Cloud',col:['#fff0c4','#ffbba5','#e4d5a9'],shape:0,venue:0},
 {name:'Berry Best Friends',col:['#ef9fbd','#ffe6ca','#bf6e98'],shape:1,venue:0},
 {name:'Minty Mountain',col:['#97d2bd','#e4f5cf','#5b9b99'],shape:2,venue:0},
 {name:'Cocoa Orbit',col:['#b27e69','#f0c194','#765a5b'],shape:3,venue:1},
 {name:'Peachy Heart',col:['#f3a783','#ffe3a6','#dd7b85'],shape:4,venue:1},
 {name:'Blueberry Moon',col:['#a9addb','#e5d8f6','#7975af'],shape:5,venue:1},
 {name:'Cookie Comet',col:['#e7c67b','#fff0c0','#b68d5f'],shape:6,venue:2},
 {name:'Melon Blossom',col:['#b2d990','#f4ecc4','#70af9e'],shape:7,venue:2},
 {name:'Rainbow Reef',col:['#a6daed','#f7b2c4','#b7dfb6'],shape:8,venue:2}
];
const ball=(x,y,z,a,b,c,r)=>Math.hypot(x-a,y-b,z-c)-r;
export function field(k,x,y,z){switch(k){
 case 0:return ball(x,y,z,0,.5,0,.54);
 case 1:return Math.min(ball(x,y,z,-.27,.45,0,.43),ball(x,y,z,.27,.45,0,.43));
 case 2:return Math.min(ball(x,y,z,0,.32,0,.47),ball(x,y,z,0,.79,0,.39),ball(x,y,z,0,1.19,0,.29));
 case 3:return Math.hypot(Math.hypot(x,y-.58)-.43,z)-.24;
 case 4:return Math.min(ball(x,y,z,-.24,.66,0,.37),ball(x,y,z,.24,.66,0,.37),ball(x,y,z,0,.38,0,.39));
 case 5:return Math.max(ball(x,y,z,0,.62,0,.6),-ball(x,y,z,.28,.88,.1,.52));
 case 6:{let a=Math.atan2(y-.66,x),r=.49+.12*Math.cos(a*5);return Math.max(Math.hypot(x,y-.66)-r,Math.abs(z)-.27);}
 case 7:{let d=ball(x,y,z,0,.62,0,.28);for(let i=0;i<5;i++){let a=i*Math.PI*2/5;d=Math.min(d,ball(x,y,z,Math.cos(a)*.37,.62+Math.sin(a)*.37,0,.27));}return d;}
 default:return Math.min(ball(x,y,z,0,.36,0,.46),ball(x,y,z,-.25,.83,0,.34),ball(x,y,z,.25,.83,0,.34),ball(x,y,z,0,1.17,0,.26));}}
const cellsCache=new Map();
const adjacencyCache=new Map();
export function cells(level){if(!cellsCache.has(level)){let a=[];for(let iy=0;iy<15;iy++)for(let iz=-4;iz<=4;iz++)for(let ix=-6;ix<=6;ix++){let x=ix*.13,y=iy*.12,z=iz*.13;if(field(FLAVOURS[level].shape,x,y,z)<-.035)a.push({x,y,z});}cellsCache.set(level,a);}return cellsCache.get(level);}
export const clone=x=>JSON.parse(JSON.stringify(x));
function looseCells(level,dead){let all=cells(level),adj=adjacencyCache.get(level);if(!adj){let keys=new Map(all.map((c,i)=>[`${Math.round(c.x/.13)},${Math.round(c.y/.12)},${Math.round(c.z/.13)}`,i]));adj=all.map(c=>{let x=Math.round(c.x/.13),y=Math.round(c.y/.12),z=Math.round(c.z/.13);return [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]].map(d=>keys.get(`${x+d[0]},${y+d[1]},${z+d[2]}`)).filter(i=>i!==undefined);});adjacencyCache.set(level,adj);}let seen=new Set(),parts=[],largest=[];for(let i=0;i<all.length;i++)if(!dead.has(i)&&!seen.has(i)){let part=[i];seen.add(i);for(let j=0;j<part.length;j++)for(let n of adj[part[j]])if(!dead.has(n)&&!seen.has(n)){seen.add(n);part.push(n);}parts.push(part);if(part.length>largest.length)largest=part;}return parts.filter(p=>p!==largest).flat();}
export function profile(){return {v:1,records:FLAVOURS.map(()=>({stars:0,score:0})),scarf:0,sound:true,gentle:false,simple:false};}
export function start(level=0){if(!Number.isInteger(level)||level<0||level>8)throw Error('Invalid flavour');return {level,status:'active',gone:[],cuts:[],held:false,holdTime:0,lickClock:0,pending:0,target:null,pendingTarget:null,cooldown:0,clock:0,started:false,bites:0,licks:0,misses:0,tokens:[],drops:[],spilled:[],tidy:0,emitted:0,chew:0,events:[],awarded:false};}
export function down(s,target=null){if(s.status!=='active'||s.held)return false;s.held=true;s.holdTime=0;s.started=true;s.target=validTarget(target)?clone(target):null;if(s.cooldown<=0&&s.gone.length<cells(s.level).length){s.pending=.14;s.pendingTarget=clone(s.target);s.cooldown=.28;s.chew=.55;s.events.push({type:'anticipate'});}return true;}
export function up(s){s.held=false;s.holdTime=0;s.lickClock=0;s.target=null;}
export function validTarget(v){return v&&['x','y','z'].every(k=>Number.isFinite(v[k]))&&Math.abs(v.x)<=1.1&&v.y>=-.3&&v.y<=2&&Math.abs(v.z)<=1.1;}
export function aim(s,target){if(s.held&&validTarget(target))s.target=clone(target);}
function eat(s,r,kind,target=null){let all=cells(s.level),dead=new Set(s.gone),best=-1,score=-1e6;for(let i=0;i<all.length;i++)if(!dead.has(i)){let v=target?-((all[i].x-target.x)**2+(all[i].y-target.y)**2+(all[i].z-target.z)**2):all[i].y+all[i].z*.5;if(v>score){score=v;best=i;}}if(best<0)return;let v=all[best],cut={x:v.x,y:v.y-.06,z:v.z+.03,r};let ids=[];for(let i=0;i<all.length;i++)if(!dead.has(i)){let c=all[i];if((c.x-cut.x)**2+(c.y-cut.y)**2+(c.z-cut.z)**2<r*r)ids.push(i);}if(!ids.length)ids=[best];s.gone.push(...ids);s.cuts.push(cut);if(kind==='bite')s.bites++;else s.licks++;s.events.push({type:kind,n:ids.length,x:v.x,y:v.y,z:v.z});
 for(let i of ids)dead.add(i);let loose=looseCells(s.level,dead);s.gone.push(...loose);if(loose.length)s.events.push({type:'crumb',n:loose.length});
 let f=s.gone.length/all.length;while(s.emitted<3&&f>=[.2,.48,.77][s.emitted]){s.drops.push({id:s.emitted,age:0});s.emitted++;s.events.push({type:'drop'});}}
export function stars(s){return 1+(s.tokens.length===3?1:0)+(s.misses===0?1:0);}
export function score(s){return cells(s.level).length*2+s.tokens.length*100+Math.max(0,3-s.misses)*50+Math.min(s.bites,25)*5;}
export function tick(s,p,dt){if(s.status!=='active'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,.1);s.clock+=dt;s.cooldown=Math.max(0,s.cooldown-dt);s.chew=Math.max(0,s.chew-dt);
 if(s.pending>0){s.pending=Math.max(0,s.pending-dt);if(s.pending===0){eat(s,.34,'bite',s.pendingTarget);s.pendingTarget=null;}}
 let licking=false;if(s.held){s.holdTime+=dt;licking=s.holdTime>=.28;if(licking){s.lickClock+=dt;if(s.lickClock>=.28){s.lickClock-=.28;eat(s,.22,'lick',s.target);}}}
 for(const d of s.drops)d.age+=dt;
 let keep=[];for(const d of s.drops){if(licking&&d.age>=.22){s.tokens.push(d.id);s.events.push({type:'catch',id:d.id});}else if(d.age>=1.6){s.spilled.push(d.id);s.misses++;s.events.push({type:'spill',id:d.id});}else keep.push(d);}s.drops=keep;
 if(licking&&s.spilled.length){s.tidy+=dt;if(s.tidy>=.45){s.tidy=0;let id=s.spilled.shift();s.tokens.push(id);s.events.push({type:'tidy',id});}}else s.tidy=0;
 if(s.gone.length===cells(s.level).length&&s.tokens.length===3&&!s.drops.length){s.status='won';up(s);s.events.push({type:'finish'});}}
export function award(s,p){if(s.status!=='won'||s.awarded)return false;let r=p.records[s.level];r.stars=Math.max(r.stars,stars(s));r.score=Math.max(r.score,score(s));s.awarded=true;return true;}
export function unlocked(p){let i=p.records.findIndex(r=>!r.stars);return i<0?8:i;}
// Input events flush elapsed time BEFORE changing a held gesture. Rendering
// can be throttled independently without losing the end of a lick or treating
// time before a press as though the finger was already down.
export class SimClock{
 constructor(s,p,stamp=0){this.bind(s,p,stamp);}
 bind(s,p,stamp){this.s=s;this.p=p;this.stamp=stamp;this.acc=0;}
 advance(stamp,active=true){if(!Number.isFinite(stamp)||stamp<this.stamp)return;let dt=Math.min(1.1,(stamp-this.stamp)/1000);this.stamp=stamp;if(!active)return;this.acc+=dt;while(this.acc+1e-9>=1/60){tick(this.s,this.p,1/60);this.acc=Math.max(0,this.acc-1/60);}}
}
export function save(s,p){let c=clone(s);up(c);c.events=[];return JSON.stringify({v:1,s:c,p});}
export function restore(raw){try{let a=JSON.parse(raw),s=a.s,p=a.p;if(a.v!==1||p.v!==1||!Array.isArray(p.records)||p.records.length!==9||p.records.some(r=>!Number.isInteger(r.stars)||r.stars<0||r.stars>3||!Number.isFinite(r.score)||r.score<0||r.score>10000)||![0,1,2].includes(p.scarf)||['sound','gentle','simple'].some(k=>typeof p[k]!=='boolean')||!Number.isInteger(s.level)||s.level<0||s.level>8||!['active','won'].includes(s.status))return null;let all=cells(s.level);if(s.target!==null&&!validTarget(s.target)||s.pendingTarget!==null&&!validTarget(s.pendingTarget))return null;if(!Array.isArray(s.gone)||new Set(s.gone).size!==s.gone.length||s.gone.some(i=>!Number.isInteger(i)||i<0||i>=all.length)||!Array.isArray(s.cuts)||s.cuts.length>all.length||s.cuts.some(c=>['x','y','z','r'].some(k=>!Number.isFinite(c[k]))||Math.abs(c.x)>1||c.y<-.15||c.y>2||Math.abs(c.z)>1||![.22,.34].includes(c.r)))return null;
 if(['pending','cooldown','clock','chew','tidy'].some(k=>!Number.isFinite(s[k])||s[k]<0)||s.pending>.14||s.cooldown>.28||s.chew>.55||s.tidy>.46||['bites','licks','misses','emitted'].some(k=>!Number.isInteger(s[k])||s[k]<0)||s.emitted>3||s.misses>3||s.bites+s.licks!==s.cuts.length||typeof s.started!=='boolean'||typeof s.awarded!=='boolean')return null;
 if(!Array.isArray(s.tokens)||!Array.isArray(s.drops)||!Array.isArray(s.spilled)||s.drops.some(d=>!Number.isFinite(d.age)||d.age<0||d.age>1.61))return null;let ids=[...s.tokens,...s.spilled,...s.drops.map(d=>d.id)];if(ids.length!==s.emitted||new Set(ids).size!==ids.length||ids.some(i=>!Number.isInteger(i)||i<0||i>=s.emitted))return null;
 if(s.status==='won'&&(s.gone.length!==all.length||s.tokens.length!==3)||s.status==='active'&&s.awarded)return null;up(s);s.events=[];return {s,p};}catch{return null;}}

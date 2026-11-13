export const TAU=Math.PI*2;
export const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const GUESTS=[
 {name:'Ari',job:'Too many tabs.',kind:0,room:0,spots:[0,1,2],turns:[1,1,1]},
 {name:'June',job:'One very long shift.',kind:1,room:0,spots:[1,3,0,2],turns:[1,1,1.25,1]},
 {name:'Otis',job:'Carried the whole band.',kind:2,room:1,spots:[0,1,2,3],turns:[1.25,1.25,1,1.5]},
 {name:'Noor',job:'The deadline can wait.',kind:3,room:1,spots:[2,0,3,1,2],turns:[1.25,1.5,1.25,1.5,1]},
 {name:'Milo',job:'Forgot to take a break.',kind:4,room:2,spots:[1,0,3,2,1],turns:[1.5,1.25,1.5,1.25,1.5]},
 {name:'Bea',job:'A little less hustle.',kind:5,room:2,spots:[0,2,1,3,0,1],turns:[1.5,1.25,1.5,1.5,1.5,1.5]}
];
export const SPOTS=['LEFT SHOULDER','RIGHT SHOULDER','LEFT FOREARM','RIGHT FOREARM'];
export function fresh(){return{best:Array(6).fill(0),records:Array(6).fill(null),photos:Array(6).fill(''),serial:0,claimed:[],kit:0,wrap:0,rewards:{like:false,comment:false},settings:{sound:true,light:false,gentle:false}};}
export const stars=p=>p.best.reduce((a,b)=>a+b,0);
const num=(v,a,b)=>typeof v==='number'&&Number.isFinite(v)&&v>=a&&v<=b;
const int=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b;
export function clean(raw){let p=fresh();if(!raw||typeof raw!=='object')return p;
 p.best=p.best.map((_,i)=>int(raw.best?.[i],0,3)?raw.best[i]:0);p.serial=int(raw.serial,0,1e9)?raw.serial:0;p.claimed=Array.isArray(raw.claimed)?raw.claimed.filter(v=>int(v,1,1e9)).slice(-80):[];
 p.kit=int(raw.kit,0,2)&&stars(p)>=[0,6,12][raw.kit]?raw.kit:0;p.wrap=int(raw.wrap,0,2)&&stars(p)>=[0,6,12][raw.wrap]?raw.wrap:0;
 for(let k of ['like','comment'])p.rewards[k]=raw.rewards?.[k]===true;for(let k of ['sound','light','gentle'])if(typeof raw.settings?.[k]==='boolean')p.settings[k]=raw.settings[k];
 p.photos=p.photos.map((_,i)=>typeof raw.photos?.[i]==='string'&&/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(raw.photos[i])&&raw.photos[i].length<55000?raw.photos[i]:'');
 p.records=p.records.map((_,i)=>raw.records?.[i]&&int(raw.records[i].score,0,1e6)&&num(raw.records[i].accuracy,0,100)?{score:raw.records[i].score,accuracy:raw.records[i].accuracy}:null);return p;}
export function merge(local,cloud){let a=clean(local),b=clean(cloud);a.best=a.best.map((v,i)=>Math.max(v,b.best[i]));a.serial=Math.max(a.serial,b.serial);a.claimed=[...new Set([...a.claimed,...b.claimed])].slice(-80);a.photos=a.photos.map((v,i)=>v||b.photos[i]);a.records=a.records.map((v,i)=>!v||b.records[i]?.score>v.score?b.records[i]:v);for(let k of ['like','comment'])a.rewards[k]||=b.rewards[k];return a;}
export function create(level,p){let g=GUESTS[level];if(!g)throw Error('Unknown visit');return{id:++p.serial,level,kit:p.kit,phase:'ready',index:0,arc:0,totalArc:0,waste:0,reversals:0,strokes:0,pops:[],score:0,started:false,assisted:false,held:false,auto:false,last:null,direction:0,angle:0,t:0,popT:0,receipt:null};}
export function required(r){return GUESTS[r.level].turns[r.index]*TAU*(r.kit===2?.8:1);}
export function tolerance(r){return r.kit===1?[.25,1.85]:[.45,1.55];}
export const progress=r=>r.phase==='win'?1:clamp(r.arc/required(r));
export function stroke(r,angle,rad,auto=false){if(!['ready','active'].includes(r.phase)||!num(angle,-1e7,1e7)||!num(rad,0,10))return false;
 let [lo,hi]=tolerance(r);if(rad<lo||rad>hi)return false;r.phase='active';r.started=true;r.held=true;r.auto=auto;r.assisted||=auto;r.last=angle;r.angle=angle;r.direction=0;r.strokes++;return true;}
export function release(r){r.held=false;r.auto=false;r.last=null;r.direction=0;}
export function trace(r,angle,rad){if(r.phase!=='active'||!r.held||r.auto||!num(angle,-1e7,1e7)||!num(rad,0,10))return[];let [lo,hi]=tolerance(r);
 if(rad<lo||rad>hi){r.last=null;r.waste+=.018;return[{type:'outside'}];}if(r.last===null){r.last=angle;return[];}
 let d=Math.atan2(Math.sin(angle-r.last),Math.cos(angle-r.last));r.last=angle;r.angle=angle;if(Math.abs(d)>.65){r.waste+=.08;return[];}if(Math.abs(d)<.002)return[];
 if(!r.direction)r.direction=Math.sign(d);let a=d*r.direction;if(a<-.01){r.reversals++;r.waste+=Math.abs(a)*.12;r.arc=Math.max(0,r.arc+a*.2);return[{type:'reverse'}];}if(a>0){r.arc+=a;r.totalArc+=a;}return checkPop(r);
}
function checkPop(r){if(r.arc+1e-6<required(r))return[];let accuracy=clamp(1-r.waste/Math.max(2,r.totalArc)),points=Math.round(300+accuracy*200);r.score+=points;r.pops.push({spot:GUESTS[r.level].spots[r.index],points});r.phase='pop';r.popT=0;release(r);return[{type:'pop',spot:GUESTS[r.level].spots[r.index],points}];}
export function advance(r,dt){if(!num(dt,0,.1)||r.phase==='win')return[];r.t+=dt;
 if(r.phase==='active'&&r.held&&r.auto){r.angle+=dt*4.8;r.arc+=dt*4.8;r.totalArc+=dt*4.8;return checkPop(r);}
 if(r.phase==='pop'){r.popT+=dt;if(r.popT>=.75){r.index++;r.arc=0;r.waste=Math.max(0,r.waste);r.phase=r.index>=GUESTS[r.level].spots.length?'win':'ready';
  if(r.phase==='win'){let accuracy=Math.round(clamp(1-r.waste/Math.max(2,r.totalArc))*100),n=accuracy>=96?3:accuracy>=80?2:1;if(r.assisted)n=Math.min(2,n);r.receipt={id:r.id,level:r.level,score:r.score,accuracy,stars:n,knots:r.pops.length,assisted:r.assisted};return[{type:'win',receipt:r.receipt}];}return[{type:'next'}];}}
 return[];}
export function settle(p,r){if(r.phase!=='win'||!r.receipt||p.claimed.includes(r.id))return false;p.best[r.level]=Math.max(p.best[r.level],r.receipt.stars);if(!p.records[r.level]||r.score>p.records[r.level].score)p.records[r.level]={score:r.score,accuracy:r.receipt.accuracy};p.claimed.push(r.id);p.claimed=p.claimed.slice(-80);return true;}
export function pack(r){return JSON.parse(JSON.stringify(r));}
export function decode(x){if(!x||!int(x.level,0,5)||!int(x.id,1,1e9)||!int(x.kit,0,2)||!['ready','active','pop','win'].includes(x.phase))return null;let n=GUESTS[x.level].spots.length;
 if(!int(x.index,0,n)||!num(x.arc,0,TAU*3)||!num(x.totalArc,0,1e6)||!num(x.waste,0,1e5)||!int(x.reversals,0,1e8)||!int(x.strokes,0,1e8)||!int(x.score,0,1e6)||!num(x.angle,-1e7,1e7)||!num(x.t,0,1e9)||!num(x.popT,0,1)||!Array.isArray(x.pops)||x.pops.length>n||typeof x.started!=='boolean'||typeof x.assisted!=='boolean')return null;
 if(x.index===n&&x.phase!=='win'||x.phase==='win'&&x.index!==n)return null;let expected=x.index+(x.phase==='pop'?1:0);if(x.pops.length!==expected)return null;
 let sum=0;for(let i=0;i<x.pops.length;i++){let p=x.pops[i];if(p.spot!==GUESTS[x.level].spots[i]||!int(p.points,300,500))return null;sum+=p.points;}if(sum!==x.score)return null;if(x.phase==='ready'&&x.arc!==0||x.phase==='pop'&&x.arc+1e-6<required(x))return null;
 let r=pack(x);release(r);r.receipt=null;if(r.phase==='win'){let accuracy=Math.round(clamp(1-r.waste/Math.max(2,r.totalArc))*100),s=accuracy>=96?3:accuracy>=80?2:1;r.receipt={id:r.id,level:r.level,score:r.score,accuracy,stars:r.assisted?Math.min(2,s):s,knots:n,assisted:r.assisted};}return r;}

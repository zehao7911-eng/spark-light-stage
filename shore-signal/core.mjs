export const SHORES=[
 {name:'The First Bleep',place:'SANDBAR BAY',set:0,items:[[0,2.3,0],[-2,-.5,1],[1.7,-3.0,2]]},
 {name:'Pocket Change',place:'SANDBAR BAY',set:0,items:[[-1.7,2,3],[1.8,.5,0],[-1.6,-2.7,4],[1.4,-4,5]]},
 {name:'Between the Pools',place:'TIDEPOOL COVE',set:1,items:[[-2,1.7,2],[1.8,1,4],[0,-1.7,1],[-1.8,-4,3]]},
 {name:'A Little History',place:'TIDEPOOL COVE',set:1,items:[[1.7,2.5,5],[-1.9,.2,0],[1.8,-1.8,3],[-.8,-4,1]]},
 {name:'After the Picnic',place:'LANTERN STRAND',set:2,items:[[0,2.5,1],[-2,.8,5],[1.9,-.4,2],[-1.5,-2.2,4],[1.3,-4.1,0]]},
 {name:'Last Light, Lost Things',place:'LANTERN STRAND',set:2,items:[[-1.7,2.3,4],[1.9,1.4,3],[-.9,-.5,0],[1.7,-2.5,1],[-1.9,-4,5]]}
];
export const TYPES=['Sun coin','Old key','Tide ring','Pocket watch','Little sailboat','Heart locket'];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const finite=(v,a,b)=>Number.isFinite(v)&&v>=a&&v<=b;
export function makeProfile(raw={}){let p={best:Array(6).fill(0),scores:Array(6).fill(0),found:[],unlocked:1,kit:0,coat:0,sound:true,light:false,motion:true,rewards:{like:false,comment:false}};if(!raw||typeof raw!=='object')return p;for(let i=0;i<6;i++){p.best[i]=Number.isInteger(raw.best?.[i])?clamp(raw.best[i],0,3):0;p.scores[i]=finite(raw.scores?.[i],0,1e7)?Math.floor(raw.scores[i]):0;}for(let i=0;i<6;i++)if(p.best[i]>0)p.unlocked=Math.min(6,i+2);p.found=[...new Set(Array.isArray(raw.found)?raw.found.filter(v=>Number.isInteger(v)&&v>=0&&v<25):[])].sort((a,b)=>a-b);for(let k of ['sound','light','motion'])if(typeof raw[k]==='boolean')p[k]=raw[k];p.rewards={like:raw.rewards?.like===true,comment:raw.rewards?.comment===true};let stars=p.best.reduce((a,b)=>a+b,0);for(let k of ['kit','coat'])p[k]=[0,1,2].includes(raw[k])&&(raw[k]===0||stars>=(raw[k]===1?6:12))?raw[k]:0;return p;}
export function mergeProfile(a,b){let p=makeProfile(a),q=makeProfile(b);p.best=p.best.map((v,i)=>Math.max(v,q.best[i]));p.scores=p.scores.map((v,i)=>Math.max(v,q.scores[i]));p.found=[...new Set([...p.found,...q.found])];p.rewards={like:p.rewards.like||q.rewards.like,comment:p.rewards.comment||q.rewards.comment};return makeProfile(p);}
export function makeRun(shore=0){shore=clamp(Math.floor(shore)||0,0,5);let offset=SHORES.slice(0,shore).reduce((a,s)=>a+s.items.length,0);return{v:1,shore,phase:'ready',time:0,age:0,x:0,z:2.65,tx:0,tz:2.65,held:false,pending:false,found:0,score:0,misses:0,streak:0,bestStreak:0,last:-1,lastPrecision:0,pulseAt:-20,pulses:0,dug:false,holes:[],events:[],items:SHORES[shore].items.map(([x,z,kind],i)=>({id:offset+i,x,z,kind,variant:shore%3,found:false,at:-1,precision:0}))};}
export function nearest(s){let result=null,distance=Infinity;for(let item of s.items){if(item.found)continue;let d=Math.hypot(s.x-item.x,s.z-item.z);if(d<distance){result=item;distance=d;}}return{item:result,distance};}
export function recoveryRadius(kit=0){return kit===2?.64:.46;}
export function traySlot(s,item){return s.items.filter(i=>i.found&&(i.at<item.at||(i.at===item.at&&i.id<item.id))).length;}
export function signal(s,kit=0){let d=nearest(s).distance,range=kit>=1?4.0:3.2;return clamp(1-d/range,0,1);}
function start(s){if(s.phase==='ready'){s.phase='search';s.events.push({type:'start'});}}
export function move(s,x,z){if(!['ready','search'].includes(s.phase)||!finite(x,-30,30)||!finite(z,-30,30))return false;start(s);s.tx=clamp(x,-2.85,2.85);s.tz=clamp(z,-4.5,3.2);s.held=true;s.pending=false;return true;}
export function release(s){if(s.phase!=='search'||!s.held)return false;s.held=false;s.pending=true;s.tx=s.x;s.tz=s.z;return true;}
export function tap(s,x,z){if(!move(s,x,z))return false;s.held=false;s.pending=true;return true;}
export function cancel(s){if(s.held){s.held=false;s.pending=false;s.tx=s.x;s.tz=s.z;}return true;}
export function pulse(s){if(!['ready','search'].includes(s.phase)||s.time-s.pulseAt<4)return false;start(s);s.pulseAt=s.time;s.pulses++;s.events.push({type:'pulse',x:s.x,z:s.z});return true;}
export function digHere(s){if(!['ready','search'].includes(s.phase))return false;start(s);s.held=false;s.pending=true;s.tx=s.x;s.tz=s.z;return true;}
export function tick(s,dt,kit=0){if(!finite(dt,0,.1)||s.phase==='ready'||s.phase==='won')return;s.time+=dt;
 if(s.phase==='search'){let dx=s.tx-s.x,dz=s.tz-s.z,d=Math.hypot(dx,dz),step=Math.min(d,dt*6.2);if(d>.001){s.x+=dx/d*step;s.z+=dz/d*step;}if(s.pending&&d<.055){s.pending=false;s.phase='dig';s.age=0;s.dug=false;s.events.push({type:'dig',x:s.x,z:s.z});}return;}
 s.age+=dt;
 if(s.phase==='dig'&&!s.dug&&s.age>=.42){s.dug=true;let n=nearest(s),success=n.distance<=recoveryRadius(kit),hole={x:s.x,z:s.z,at:s.time,success};s.holes.push(hole);if(s.holes.length>32)s.holes.shift();if(success){let item=n.item;item.found=true;item.at=s.time;item.precision=clamp(1-n.distance/.8,0,1);s.last=s.items.indexOf(item);s.lastPrecision=item.precision;s.found++;s.streak++;s.bestStreak=Math.max(s.bestStreak,s.streak);let gain=250+Math.round(item.precision*100)+Math.min(5,s.streak)*25;s.score+=gain;s.events.push({type:'find',id:item.id,index:s.last,x:s.x,z:s.z,kind:item.kind,gain,precision:item.precision});}else{s.misses++;s.streak=0;s.last=-1;s.events.push({type:'miss',x:s.x,z:s.z});}}
 if(s.phase==='dig'&&s.age>=.85){s.phase='reveal';s.age=0;}
 if(s.phase==='reveal'&&s.age>=1.0){if(s.found===s.items.length){s.phase='won';s.age=0;s.events.push({type:'win'});}else{s.phase='search';s.age=0;}}
}
export function result(s){return{score:s.score,found:s.found,total:s.items.length,misses:s.misses,streak:s.bestStreak,stars:s.phase==='won'?1+(s.misses<=2?1:0)+(s.misses===0?1:0):0};}
export function award(p,s){for(let item of s.items)if(item.found&&!p.found.includes(item.id))p.found.push(item.id);if(s.phase!=='won')return false;let r=result(s);p.best[s.shore]=Math.max(p.best[s.shore],r.stars);p.scores[s.shore]=Math.max(p.scores[s.shore],r.score);p.unlocked=Math.max(p.unlocked,Math.min(6,s.shore+2));return true;}
export function restore(raw){if(!raw||raw.v!==1||!Number.isInteger(raw.shore)||raw.shore<0||raw.shore>5)return null;let s=makeRun(raw.shore);if(!['ready','search','dig','reveal','won'].includes(raw.phase)||!Array.isArray(raw.items)||raw.items.length!==s.items.length||!Array.isArray(raw.holes)||raw.holes.length>32)return null;
 for(let k of ['found','score','misses','streak','bestStreak','pulses'])if(!Number.isInteger(raw[k]))return null;
 for(let k of ['time','age','score','found','misses','streak','bestStreak','pulses','lastPrecision'])if(!finite(raw[k],0,k==='lastPrecision'?1:1e7))return null;for(let k of ['x','tx'])if(!finite(raw[k],-2.851,2.851))return null;for(let k of ['z','tz'])if(!finite(raw[k],-4.501,3.201))return null;if(!Number.isInteger(raw.last)||raw.last<-1||raw.last>=s.items.length||typeof raw.dug!=='boolean'||typeof raw.pending!=='boolean')return null;if(!finite(raw.pulseAt,-20,raw.time+.1))return null;
 let found=0;for(let i=0;i<s.items.length;i++){let item=raw.items[i];if(typeof item.found!=='boolean'||!finite(item.at,-1,raw.time+.1)||!finite(item.precision,0,1))return null;Object.assign(s.items[i],{found:item.found,at:item.at,precision:item.precision});if(item.found)found++;}
 if(found!==raw.found||raw.streak>found||raw.bestStreak>found||raw.phase==='won'&&found!==s.items.length)return null;for(let hole of raw.holes)if(!finite(hole.x,-2.851,2.851)||!finite(hole.z,-4.501,3.201)||!finite(hole.at,0,raw.time+.1)||typeof hole.success!=='boolean')return null;
 for(let k of ['phase','time','age','x','z','tx','tz','pending','found','score','misses','streak','bestStreak','last','lastPrecision','pulseAt','pulses','dug'])s[k]=raw[k];s.held=false;if(raw.held){s.pending=false;s.tx=s.x;s.tz=s.z;}s.holes=raw.holes.map(v=>({...v}));s.events=[];return s;
}

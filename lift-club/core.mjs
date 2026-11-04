export const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
export const MEETS=[
 {name:'First flex',load:'Plate stack',prop:0,set:0,reps:3,mass:1,pace:1,prize:24},
 {name:'Can-do attitude',load:'Twin paint drums',prop:1,set:0,reps:4,mass:1.17,pace:1,prize:32},
 {name:'Turn it up',load:'Bass cabinets',prop:2,set:1,reps:4,mass:1.35,pace:1.05,prize:38},
 {name:'Snack attack',load:'Vending machines',prop:3,set:1,reps:5,mass:1.58,pace:1.12,prize:45},
 {name:'Rocket shoulders',load:'Jet engines',prop:4,set:2,reps:5,mass:1.85,pace:1.18,prize:54},
 {name:'Heavy traffic',load:'Monster trucks',prop:5,set:2,reps:6,mass:2.12,pace:1.22,prize:65}
];
export function fresh(){return {v:1,best:Array(6).fill(0),records:Array(6).fill(null),coins:0,total:0,serial:0,claimed:0,strength:0,control:0,paint:0,rewards:{like:false,comment:false},settings:{sound:true,light:false,gentle:false,easy:true}};}
const integer=(v,a=0,b=1e8)=>Number.isInteger(v)&&v>=a&&v<=b;
export function clean(raw){let p=fresh();if(!raw||typeof raw!=='object')return p;
 for(let k of ['coins','total','serial','claimed'])if(integer(raw[k]))p[k]=raw[k];p.claimed=Math.min(p.claimed,p.serial);
 for(let k of ['strength','control'])if(integer(raw[k],0,3))p[k]=raw[k];
 for(let i=0;i<6;i++){if(integer(raw.best?.[i],0,3))p.best[i]=raw.best[i];let r=raw.records?.[i];if(r&&Number.isFinite(r.time)&&r.time>=0&&r.time<36000&&integer(r.smooth,0,MEETS[i].reps)&&integer(r.resets,0,10000))p.records[i]={time:r.time,smooth:r.smooth,resets:r.resets};}
 for(let k of Object.keys(p.settings))if(typeof raw.settings?.[k]==='boolean')p.settings[k]=raw.settings[k];
 for(let k of ['like','comment'])p.rewards[k]=raw.rewards?.[k]===true;
 let stars=p.best.reduce((s,n)=>s+n,0);if(integer(raw.paint,0,2)&&raw.paint<=Math.floor(stars/6))p.paint=raw.paint;
 return p;
}
export function merge(a,b){a=clean(a);b=clean(b);let n=a.serial>=b.serial?a:b,p=clean(n);p.best=a.best.map((v,i)=>Math.max(v,b.best[i]));p.strength=Math.max(a.strength,b.strength);p.control=Math.max(a.control,b.control);p.total=Math.max(a.total,b.total);p.claimed=Math.max(a.claimed,b.claimed);for(let k of ['like','comment'])p.rewards[k]=a.rewards[k]||b.rewards[k];return p;}
export function stars(p){return p.best.reduce((s,n)=>s+n,0);}
export function unlocked(p){let n=p.best.findIndex(x=>x===0);return n===-1?5:n;}
export const cost=(p,k)=>k==='strength'?20+p.strength*35:18+p.control*32;
export function upgrade(p,k){if(!['strength','control'].includes(k)||p[k]>=3||p.coins<cost(p,k))return false;p.coins-=cost(p,k);p[k]++;return true;}
export function create(level=0,p=fresh(),lap=0){level=integer(level,0,5)?level:0;return {v:1,id:++p.serial,level,lap:clamp(Math.floor(lap),0,3),phase:'ready',t:0,h:0,vh:0,target:0,peak:0,step:'up',rep:0,smooth:0,streak:0,bestStreak:0,resets:0,topHold:0,bottomHold:0,grip:0,wobble:0,impact:0,pulse:0,effort:0,announced:false,started:false,strength:p.strength,control:p.control,easy:p.settings.easy,history:[],receipt:null};}
export function setTarget(r,v){if(!Number.isFinite(v)||!['ready','play'].includes(r.phase))return false;r.target=clamp(v);if(r.phase==='ready'&&v>.1){r.phase='play';r.started=true;}return true;}
export function cancel(r){if(r.phase==='play'||r.phase==='ready'){r.target=r.h;r.vh=0;}}
function event(out,type,extra={}){out.push({type,...extra});}
export function advance(r,dt){let out=[];if(r.phase!=='play'||!Number.isFinite(dt)||dt<=0)return out;
 dt=Math.min(dt,.05);r.t+=dt;let m=MEETS[r.level],force=(r.easy?1.12:1)*(1+r.strength*.19)/(m.mass*(1+r.lap*.08));
 let speed=.60+.34*force,old=r.h;
 // Critically damped load: target position controls force, not teleportation.
 let accel=(r.target-r.h)*(25+force*10)-r.vh*(10+r.control*.7);
 r.vh=clamp(r.vh+accel*dt,-speed*(1.07+r.control*.04),speed);
 r.h=clamp(r.h+r.vh*dt);if((r.h===0&&r.vh<0)||(r.h===1&&r.vh>0))r.vh=0;
 r.wobble+=(Math.abs(accel)*.004-r.wobble*3)*dt;r.wobble=clamp(r.wobble,0,.12);
 r.impact=Math.max(0,r.impact-dt*3.4);r.pulse=Math.max(0,r.pulse-dt*2);
 r.effort=clamp(r.h*.55+Math.abs(r.vh)*.42);
 if(r.step==='up'){r.peak=Math.max(r.peak,r.h);
  if(r.h>.94){r.topHold+=dt;if(r.topHold>=.16){r.step='down';r.topHold=0;r.grip=0;event(out,'lockout');}}
  else r.topHold=0;
 }else{
  if(r.h>.87)r.grip+=dt;
  if(r.h<.07){r.bottomHold+=dt;
   if(r.bottomHold>=.12){let slam=Math.abs(r.vh)>(.68+r.control*.12)*(r.easy?1.20:1),smooth=!slam&&!r.announced;
    r.rep++;if(smooth){r.smooth++;r.streak++;}else r.streak=0;r.bestStreak=Math.max(r.bestStreak,r.streak);
    r.history.push({time:r.t,smooth,slam});r.impact=slam?1:.45;r.pulse=1;r.step='up';r.peak=0;r.topHold=0;r.bottomHold=0;r.grip=0;r.announced=false;event(out,'rep',{rep:r.rep,smooth,slam});
    if(r.rep>=m.reps){r.phase='win';r.target=0;r.receipt={id:r.id,level:r.level,lap:r.lap,reps:r.rep,smooth:r.smooth,resets:r.resets,time:r.t,stars:1+(r.smooth>=Math.ceil(m.reps*.6)?1:0)+(r.smooth===m.reps&&r.resets===0?1:0),coins:m.prize+r.smooth*3+r.bestStreak*2};event(out,'win',{...r.receipt});}
   }
  }else r.bottomHold=0;
 }
 if(r.step==='up'&&r.peak>.20&&r.h<.06&&r.target<.1){r.resets++;r.peak=0;r.topHold=0;event(out,'short');}
 return out;
}
export function settle(p,r){if(r.phase!=='win'||!r.receipt||r.id<=p.claimed)return false;let a=r.receipt;p.claimed=r.id;p.coins+=a.coins;p.total+=a.reps;p.best[r.level]=Math.max(p.best[r.level],a.stars);let old=p.records[r.level];if(!old||a.smooth>old.smooth||(a.smooth===old.smooth&&a.time<old.time))p.records[r.level]={time:a.time,smooth:a.smooth,resets:a.resets};return true;}
export function decode(raw){if(!raw||raw.v!==1||!integer(raw.id,1)||!integer(raw.level,0,5)||!integer(raw.lap,0,3)||!['ready','play','win'].includes(raw.phase))return null;
 let m=MEETS[raw.level];for(let k of ['t','h','vh','target','peak','topHold','bottomHold','grip','wobble','impact','pulse','effort'])if(!Number.isFinite(raw[k])||Math.abs(raw[k])>40000)return null;
 if(raw.t<0||raw.h<0||raw.h>1||raw.target<0||raw.target>1||Math.abs(raw.vh)>3||!['up','down'].includes(raw.step))return null;
 for(let k of ['rep','smooth','streak','bestStreak'])if(!integer(raw[k],0,m.reps))return null;
 if(raw.smooth>raw.rep||!integer(raw.resets,0,10000)||!integer(raw.strength,0,3)||!integer(raw.control,0,3)||!Array.isArray(raw.history)||raw.history.length!==raw.rep||typeof raw.easy!=='boolean')return null;
 let p=fresh(),r=create(raw.level,p,raw.lap);for(let k of Object.keys(r))if(k in raw)r[k]=JSON.parse(JSON.stringify(raw[k]));
 if(r.phase==='win'){
  if(r.rep!==m.reps)return null;
  // Recompute receipt; untrusted storage cannot invent prizes.
  r.receipt={id:r.id,level:r.level,lap:r.lap,reps:r.rep,smooth:r.smooth,resets:r.resets,time:r.t,stars:1+(r.smooth>=Math.ceil(m.reps*.6)?1:0)+(r.smooth===m.reps&&r.resets===0?1:0),coins:m.prize+r.smooth*3+r.bestStreak*2};
 }else r.receipt=null;
 r.target=r.h;return r;
}

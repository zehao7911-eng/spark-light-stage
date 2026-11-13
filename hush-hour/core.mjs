export const VERSION=1;
export const NIGHTS=[
 {name:'The Borrowed Bell',set:0,length:25,safe:[0,6,12,18,25],guards:[{z:9,kind:0},{z:20.7,kind:0}],drain:14,speed:2.6},
 {name:'Eyes Wide Shut',set:0,length:29,safe:[0,6,13,20,29],guards:[{z:9.6,kind:1},{z:24.5,kind:0}],drain:15,speed:2.6},
 {name:'Room for Silence',set:1,length:32,safe:[0,7,15,23,32],guards:[{z:10.8,kind:1},{z:19,kind:0},{z:27.7,kind:1}],drain:15,speed:2.7},
 {name:'The Squeaky Suite',set:1,length:34,safe:[0,7,16,25,34],guards:[{z:11.4,kind:1},{z:20.2,kind:1},{z:29.8,kind:0}],drain:16,speed:2.7,creak:[12.5,21]},
 {name:'Midnight Museum',set:2,length:37,safe:[0,8,18,27,37],guards:[{z:12.6,kind:1},{z:22.8,kind:1},{z:32.3,kind:1}],drain:16,speed:2.8,creak:[13.8,23.4]},
 {name:'One Last Whisper',set:2,length:40,safe:[0,8,18.5,29,40],guards:[{z:13,kind:1},{z:24.3,kind:1},{z:34.8,kind:1}],drain:17,speed:2.8,creak:[14,25.3,35.6]}
];
export const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
export const pathX=z=>Math.sin(z*.23)*.78;
export function fresh(){return {v:VERSION,best:Array(6).fill(0),scores:Array(6).fill(0),sound:true,gentle:false,light:false,coat:0,rewards:{like:false,comment:false},run:null};}
export function stars(p){return p.best.reduce((a,b)=>a+b,0);}
export function create(night=0,gear=0,lap=0){const m=NIGHTS[night];if(!m)throw Error('Invalid night');return {v:VERSION,night,gear,lap,z:0,t:0,air:100,alert:0,hearts:3,catches:0,checkpoint:0,notes:0,phase:'ready',react:0,elapsed:0,rests:0,restMark:-1,peak:0,waiting:false,started:false,receipt:null};}
export function safeIndex(s){return NIGHTS[s.night].safe.findIndex(z=>Math.abs(s.z-z)<=1.25);}
export function safe(s){return safeIndex(s)>=0;}
export function awake(s,i){const g=NIGHTS[s.night].guards[i];if(!g||g.kind===0)return false;return ((s.t+i*1.7+s.night*.4)%8.4)<2.5;}
export function nextSafe(s){const list=NIGHTS[s.night].safe;return list.find(z=>z>s.z+1.25)??list.at(-1);}
export function rating(s){return 1+(s.catches===0?1:0)+(s.notes===3?1:0);}
export function advance(s,dt,held){
 const events=[];if(!Number.isFinite(dt)||dt<=0||dt>.25||!['ready','play','bonk'].includes(s.phase))return events;
 const m=NIGHTS[s.night];
 if(s.phase==='ready'){if(!held)return events;s.phase='play';s.started=true;events.push({type:'start'});}
 if(s.phase==='bonk'){s.react-=dt;if(s.react<=0){s.z=m.safe[s.checkpoint];s.air=100;s.alert=0;s.waiting=false;s.phase='play';s.notes=Math.min(3,s.checkpoint);events.push({type:'reset'});}return events;}
 s.t+=dt;s.elapsed+=dt;
 const isSafe=safe(s),idx=safeIndex(s),oldZ=s.z;
 if(held&&!s.waiting){
  s.air=clamp(s.air-m.drain*dt*(s.gear>=1?.85:1),0,100);
  s.z=Math.min(m.length,s.z+m.speed*dt*(s.gear===2?1.12:1)*(1+Math.min(s.lap,3)*.06));
  const stop=m.safe.find(z=>z>oldZ&&z<m.length&&s.z>=z);
  if(stop!=null){s.z=stop;s.waiting=true;events.push({type:'lamp'});}
 }else if(!held){s.waiting=false;s.air=clamp(s.air+(isSafe?56:25)*dt,0,100);}
 let danger=0;
 for(let i=0;i<m.guards.length;i++){
  const g=m.guards[i],d=Math.abs(s.z-g.z);
  if(!safe(s)&&d<3.1){
   if(awake(s,i))danger=Math.max(danger,49);
   else if(!held)danger=Math.max(danger,33+(100-s.air)*.18);
  }
 }
 for(const z of m.creak||[])if(oldZ<z&&s.z>=z){s.alert+=27;events.push({type:'creak',z});}
 if(s.air<=.01&&held&&!s.waiting){danger=115;events.push({type:'gasp'});}
 s.alert=clamp(s.alert+(danger||-65)*dt,0,100);s.peak=Math.max(s.peak,s.alert);
 if(isSafe&&!held&&s.air>=99&&idx>s.checkpoint){s.checkpoint=idx;s.rests++;s.restMark=idx;events.push({type:'rest'});}
 // Keepsakes live just before each intermediate resting alcove.
 const pickups=m.safe.slice(1,4).map(z=>z-.6);
 const count=pickups.filter(z=>s.z>=z).length;
 if(count>s.notes){s.notes=count;events.push({type:'pickup',count});}
 if(s.alert>=100){s.hearts--;s.catches++;s.react=1.3;events.push({type:'caught'});if(s.hearts<=0){s.phase='lose';s.receipt={score:0,stars:0,notes:s.notes,catches:s.catches};events.push({type:'end'});}else{s.phase='bonk';}return events;}
 if(s.z>=m.length){s.phase='win';s.receipt={score:Math.max(100,600+s.notes*100-s.catches*140+Math.round(Math.max(0,150-s.elapsed))),stars:rating(s),notes:s.notes,catches:s.catches};events.push({type:'win'},{type:'end'});}
 return events;
}
export function bank(p,s){if(s.phase!=='win'||!s.receipt)return false;let n=s.night;p.best[n]=Math.max(p.best[n],s.receipt.stars);p.scores[n]=Math.max(p.scores[n],s.receipt.score);return true;}
export function mergeProfile(a,b){const p=decode(b),r=decode(a);r.best=r.best.map((x,i)=>Math.max(x,p.best[i]));r.scores=r.scores.map((x,i)=>Math.max(x,p.scores[i]));for(const k of ['like','comment'])r.rewards[k]=r.rewards[k]||p.rewards[k];return r;}
export function decode(raw){let a;try{a=typeof raw==='string'?JSON.parse(raw):raw;}catch{}let p=fresh();if(!a||typeof a!=='object'||a.v!==VERSION)return p;
 for(let k of ['best','scores'])if(Array.isArray(a[k]))for(let i=0;i<6;i++)p[k][i]=Number.isFinite(a[k][i])?clamp(Math.floor(a[k][i]),0,k==='best'?3:3000):0;
 for(let k of ['sound','gentle','light'])if(typeof a[k]==='boolean')p[k]=a[k];p.coat=[0,1,2].includes(a.coat)?a.coat:0;
 p.rewards={like:a.rewards?.like===true,comment:a.rewards?.comment===true};
 let s=a.run;
 if(s&&s.v===VERSION&&Number.isInteger(s.night)&&NIGHTS[s.night]&&['ready','play','bonk','win','lose'].includes(s.phase)&&[0,1,2].includes(s.gear)&&Number.isInteger(s.lap)&&s.lap>=0&&s.lap<=999){
  let m=NIGHTS[s.night],valid=true;
  for(let [k,lo,hi]of [['z',0,m.length],['t',0,1e7],['air',0,100],['alert',0,100],['hearts',0,3],['catches',0,3],['checkpoint',0,m.safe.length-1],['notes',0,3],['react',-1,2],['elapsed',0,1e7],['rests',0,1e5],['peak',0,100],['restMark',-1,10]])if(!Number.isFinite(s[k])||s[k]<lo||s[k]>hi)valid=false;
  for(let k of ['hearts','catches','checkpoint','notes','rests','restMark'])if(!Number.isInteger(s[k]))valid=false;
  if(s.waiting===undefined)s={...s,waiting:false};
  if(typeof s.waiting!=='boolean'||(s.waiting&&!m.safe.some(z=>Math.abs(z-s.z)<.001)))valid=false;
  if(s.hearts+s.catches!==3||typeof s.started!=='boolean'||s.z+1.3<m.safe[s.checkpoint])valid=false;
  if(s.phase==='win'&&(s.z!==m.length||!s.receipt||!Number.isFinite(s.receipt.score)||s.receipt.stars!==rating(s)))valid=false;
  if(s.phase==='lose'&&(s.hearts!==0||s.receipt?.stars!==0))valid=false;
  if(['ready','play','bonk'].includes(s.phase)&&s.hearts===0)valid=false;
  if(valid)p.run=JSON.parse(JSON.stringify(s));
 }
 return p;
}

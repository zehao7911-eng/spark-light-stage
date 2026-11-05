export const CLIENTS=[
 {name:'PIP',species:'Crocodile',color:0x7fbe95,accent:0x418f7b,n:6,gums:[1],caps:[],dirt:.65,target:70,story:'A little too much marshmallow.'},
 {name:'MOMO',species:'Hippo',color:0xb5a5d0,accent:0x8173ad,n:8,gums:[2,6],caps:[],dirt:.85,target:95,story:'The midnight blueberry incident.'},
 {name:'TANGO',species:'Dragon',color:0xe9ac7d,accent:0xc17a64,n:8,gums:[1,4],caps:[6],dirt:.9,target:100,story:'Caramel is tougher than dragon fire.'},
 {name:'BASIL',species:'Crocodile',color:0x83baa8,accent:0x367f78,n:10,gums:[0,5,8],caps:[3],dirt:1,target:120,story:'A picnic worth smiling about.'},
 {name:'LUNA',species:'Hippo',color:0x9aabd4,accent:0x647bb3,n:10,gums:[2,5,9],caps:[0,7],dirt:1,target:130,story:'One last treat before the moonrise.'},
 {name:'SUNNY',species:'Dragon',color:0xe9c16a,accent:0xc28c5b,n:10,gums:[1,4,7],caps:[2,6,9],dirt:1,target:140,story:'The festival needs its brightest smile.'}
];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function toothPos(i,n){let a=-Math.PI*.90+i/(n-1)*Math.PI*.80;return{x:Math.cos(a)*3.5,z:Math.sin(a)*-2.1+.15,y:1.85};}
export function profile(v={}){return{stars:CLIENTS.map((_,i)=>clamp(Math.floor(Number(v.stars?.[i])||0),0,3)),best:CLIENTS.map((_,i)=>clamp(Number(v.best?.[i])||0,0,100000)),rewards:{gold:v.rewards?.gold===true,confetti:v.rewards?.confetti===true}};}
export function unlocked(p){let i=0;while(i<5&&p.stars[i]>0)i++;return i;}
export function merge(a,b){let p=profile(b);for(let i=0;i<6;i++){p.stars[i]=Math.max(p.stars[i],a.stars[i]);p.best[i]=Math.max(p.best[i],a.best[i]);}for(let k of['gold','confetti'])p.rewards[k] ||= a.rewards[k];return p;}
export function claim(p,k){if(!['gold','confetti'].includes(k)||p.rewards[k])return false;p.rewards[k]=true;return true;}
export function makeRun(job=0,p=profile()){let c=CLIENTS[job];return{job,phase:'ready',stage:'brush',started:false,elapsed:0,teeth:Array.from({length:c.n},(_,i)=>({dirt:clamp(c.dirt-(i%3)*.08,.2,1),gummy:c.gums.includes(i),cap:c.caps.includes(i),pull:0})),score:0,combo:0,maxCombo:0,lastClean:-100,serial:0,event:null,burst:0,foam:unlocked(p)>=4,wide:unlocked(p)>=2,usedFoam:false};}
export function emit(s,type,i=-1){s.serial++;s.event={type,i};}
export function stageCheck(s){let old=s.stage;if(s.teeth.some(t=>t.dirt>.0001))s.stage='brush';else if(s.teeth.some(t=>t.gummy))s.stage='pluck';else if(s.teeth.some(t=>t.cap))s.stage='crown';else{s.stage='done';s.phase='end';}if(old!==s.stage)emit(s,s.stage==='done'?'finish':'stage');}
export function start(s){if(s.phase==='end')return false;s.phase='play';s.started=true;return true;}
export function clean(s,i,amount){let t=s.teeth[i];if(!t||t.dirt<=0)return false;let before=t.dirt;t.dirt=Math.max(0,t.dirt-amount);if(t.dirt===0&&before>0){s.combo=s.elapsed-s.lastClean<4?s.combo+1:1;s.maxCombo=Math.max(s.maxCombo,s.combo);s.lastClean=s.elapsed;s.score+=100+Math.min(5,s.combo)*20;emit(s,'shine',i);}return true;}
export function brush(s,i,dt){if(s.stage!=='brush'||s.phase==='end'||!Number.isInteger(i)||!s.teeth[i]||s.teeth[i].dirt<=0)return false;start(s);clean(s,i,clamp(dt,0,.08)*.72);if(s.wide){for(let j of[i-1,i+1])if(s.teeth[j])clean(s,j,clamp(dt,0,.08)*.22);}stageCheck(s);return true;}
export function pull(s,i,amount){if(s.stage!=='pluck'||s.phase==='end'||!s.teeth[i]?.gummy||!Number.isFinite(amount))return false;start(s);let t=s.teeth[i];t.pull=clamp(t.pull+clamp(amount,0,1),0,1);if(t.pull>=1){t.gummy=false;s.score+=180;emit(s,'pop',i);stageCheck(s);}return true;}
export function release(s){for(let t of s.teeth)if(t.gummy)t.pull=0;}
export function crown(s,i){if(s.stage!=='crown'||s.phase==='end'||!s.teeth[i]?.cap)return false;start(s);s.teeth[i].cap=false;s.score+=250;emit(s,'crown',i);stageCheck(s);return true;}
export function foam(s){if(!s.foam||s.stage!=='brush'||s.burst>0||s.phase==='end')return false;start(s);s.burst=10;s.usedFoam=true;for(let i=0;i<s.teeth.length;i++)clean(s,i,.36);emit(s,'foam');stageCheck(s);return true;}
export function tick(s,dt){if(s.phase!=='play')return;dt=clamp(dt,0,.05);s.elapsed+=dt;s.burst=Math.max(0,s.burst-dt);}
export function progress(s){let c=CLIENTS[s.job],total=c.n+c.gums.length+c.caps.length;return(s.teeth.reduce((n,t,i)=>n+clamp(1-t.dirt/clamp(c.dirt-(i%3)*.08,.2,1),0,1),0)+c.gums.length-s.teeth.filter(t=>t.gummy).length+c.caps.length-s.teeth.filter(t=>t.cap).length)/total;}
export function stars(s){return s.phase==='end'?1+(s.elapsed<CLIENTS[s.job].target?1:0)+(s.maxCombo>=3?1:0):0;}
export function record(p,s){if(s.phase!=='end')return false;let old=JSON.stringify(p);p.stars[s.job]=Math.max(p.stars[s.job],stars(s));p.best[s.job]=Math.max(p.best[s.job],s.score);return old!==JSON.stringify(p);}
export function restore(v,p=profile()){if(!v||!Number.isInteger(v.job)||v.job<0||v.job>unlocked(p)||!Array.isArray(v.teeth)||v.teeth.length!==CLIENTS[v.job].n)return null;let s=makeRun(v.job,p);for(let i=0;i<s.teeth.length;i++){let t=v.teeth[i],c=CLIENTS[v.job];if(!t||!Number.isFinite(t.dirt)||t.dirt<0||t.dirt>1||typeof t.gummy!=='boolean'||typeof t.cap!=='boolean'||(t.gummy&&!c.gums.includes(i))||(t.cap&&!c.caps.includes(i)))return null;s.teeth[i]={dirt:t.dirt,gummy:t.gummy,cap:t.cap,pull:0};}s.elapsed=clamp(Number(v.elapsed)||0,0,100000);s.score=clamp(Number(v.score)||0,0,100000);s.maxCombo=clamp(Number(v.maxCombo)||0,0,100);s.started=v.started===true;s.usedFoam=v.usedFoam===true;s.burst=clamp(Number(v.burst)||0,0,10);stageCheck(s);s.event=null;if(s.phase!=='end')s.phase='ready';return s;}

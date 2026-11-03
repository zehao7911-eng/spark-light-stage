(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.QuartetCore=api})(typeof window==='object'?window:globalThis,()=>{'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const songs=[
 {name:'A Little Hello',venue:'SUNROOM SESSIONS',theme:0,seq:[[0,1],[0,1,2],[0,2,1,3],[0,1,2,3]]},
 {name:'Tea for Four',venue:'SUNROOM SESSIONS',theme:0,seq:[[1,1,3],[0,1,0,3],[1,2,1,3],[0,1,2,1,3]]},
 {name:'Leaf & Light',venue:'GLASSHOUSE GROOVES',theme:1,seq:[[2,0,2],[2,1,0,3],[0,2,3,1,2],[2,0,1,2,3]]},
 {name:'The Rain Waltz',venue:'GLASSHOUSE GROOVES',theme:1,seq:[[3,1,3,0],[1,2,3,2],[3,0,1,0,3],[0,1,3,2,1,3]]},
 {name:'Velvet Moon',venue:'MIDNIGHT ENCORE',theme:2,seq:[[0,3,2,1],[2,0,1,3,2],[0,2,0,3,1],[3,2,1,0,2,3]]},
 {name:'One More Song',venue:'MIDNIGHT ENCORE',theme:2,seq:[[0,1,3,2],[0,2,1,3,0],[2,1,0,3,2,1],[0,1,2,3,2,0]]}
];
const fresh=()=>({best:[0,0,0,0,0,0],unlock:1,kit:0,sound:true,light:false,guide:false,jade:false,rose:false});
function create(song=0,guide=false){song=clamp(Number.isInteger(song)?song:0,0,5);return{song,guide:!!guide,assisted:!!guide,credited:[0,0,0,0],phase:'ready',time:0,phrase:0,cursor:0,demo:0,wait:0,slips:0,replays:0,score:0,streak:0,notes:0,won:false,events:[],pulse:-1,pulseUntil:0,debounce:0}}
function emit(s,e){s.events.push(e);if(s.events.length>48)s.events.shift()}
function start(s){if(s.phase!=='ready'||s.won)return false;beginDemo(s);return true}
function beginDemo(s){s.phase='watch';s.demo=0;s.cursor=0;s.wait=.3;s.pulse=-1;emit(s,{type:'watch'})}
function replay(s){if(s.won||!['play','watch'].includes(s.phase))return false;s.replays++;beginDemo(s);return true}
function setGuide(s,value){if(s.won)return false;s.guide=!!value;if(value)s.assisted=true;return true}
function tick(s,dt){if(!Number.isFinite(dt)||dt<=0||s.won)return;dt=Math.min(dt,.05);s.time+=dt;s.debounce=Math.max(0,s.debounce-dt);if(s.pulse>=0&&s.time>s.pulseUntil)s.pulse=-1;
 if(['watch','oops','between','finale'].includes(s.phase)){s.wait=Math.max(0,s.wait-dt);if(s.wait>1e-8)return;
 if(s.phase==='oops'){beginDemo(s);return}
 if(s.phase==='between'){s.phrase++;beginDemo(s);return}
 if(s.phase==='finale'){s.won=true;s.phase='won';emit(s,{type:'win'});return}
 const seq=songs[s.song].seq[s.phrase];if(s.demo<seq.length){const key=seq[s.demo++];s.pulse=key;s.pulseUntil=s.time+.32;s.wait=.56;emit(s,{type:'note',key,demo:true})}else{s.phase='play';s.cursor=0;s.pulse=-1;emit(s,{type:'yourTurn'})}
 }}
function input(s,key){if(!Number.isInteger(key)||key<0||key>3||s.won||s.phase!=='play')return false;const seq=songs[s.song].seq[s.phrase];s.pulse=key;s.pulseUntil=s.time+.3;
 if(seq[s.cursor]!==key){s.slips++;s.streak=0;s.phase='oops';s.wait=.75;s.cursor=0;emit(s,{type:'oops',key});return true}
 s.cursor++;const first=s.cursor>s.credited[s.phrase];if(first){s.streak++;s.credited[s.phrase]=s.cursor;s.notes++;}const bonus=first&&s.streak%5===0?100:0;if(first)s.score+=50+bonus;emit(s,{type:'note',key,demo:false,bonus});
 if(s.cursor===seq.length){s.score+=200;s.phase=s.phrase===3?'finale':'between';s.wait=s.phrase===3?1.25:.95;emit(s,{type:'phrase',last:s.phrase===3});}return true}
function stars(s){return s.won?(s.assisted?1:s.slips<=2?3:2):0}
function award(profile,s){if(!s.won)return false;profile.best[s.song]=Math.max(profile.best[s.song]||0,stars(s));profile.unlock=Math.max(profile.unlock,Math.min(6,s.song+2));return true}
function cleanProfile(p){const d=fresh();if(!p||typeof p!=='object')return d;for(const k of ['sound','light','guide','jade','rose'])if(typeof p[k]==='boolean')d[k]=p[k];d.best=d.best.map((_,i)=>clamp(Math.floor(Number(p.best?.[i])||0),0,3));d.unlock=clamp(Math.floor(Number(p.unlock)||1),1,6);let byBest=1;for(let i=0;i<5;i++)if(d.best[i])byBest=i+2;d.unlock=Math.max(d.unlock,byBest);const n=d.best.reduce((a,b)=>a+b,0);d.kit=[0,1,2].includes(p.kit)&&(!p.kit||p.kit===1&&n>=6||p.kit===2&&n>=12)?p.kit:0;return d}
function restore(a){try{if(!a||!Number.isInteger(a.song)||a.song<0||a.song>5)return null;let s=create(a.song,a.guide);if(!['ready','watch','play','oops','between','finale','won'].includes(a.phase)||!Number.isInteger(a.phrase)||a.phrase<0||a.phrase>3)return null;for(let k of ['time','wait','slips','replays','score','streak','notes','pulseUntil','debounce']){if(!Number.isFinite(a[k])||a[k]<0||a[k]>1e7)return null;s[k]=a[k]}Object.assign(s,{phase:a.phase,phrase:a.phrase,cursor:a.cursor,demo:a.demo,pulse:a.pulse,won:a.phase==='won'});s.assisted=!!a.assisted||s.guide;if(!Array.isArray(a.credited)||a.credited.length!==4||a.credited.some((v,i)=>!Number.isInteger(v)||v<0||v>songs[s.song].seq[i].length))return null;s.credited=[...a.credited];const len=songs[s.song].seq[s.phrase].length;if(!Number.isInteger(s.cursor)||s.cursor<0||s.cursor>len||!Number.isInteger(s.demo)||s.demo<0||s.demo>len||!Number.isInteger(s.pulse)||s.pulse< -1||s.pulse>3)return null;if(s.phase==='won'&&(s.phrase!==3||s.cursor!==len))return null;return s}catch(e){return null}}
return{songs,fresh,create,start,tick,input,replay,setGuide,stars,award,cleanProfile,restore};});

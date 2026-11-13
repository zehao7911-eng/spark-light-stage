(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.Ward=api})(typeof window!=='undefined'?window:this,function(){'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)),W=8,H=11;
const stations={recovery:{id:'recovery',type:'station',x:1,z:0,name:'RECOVERY'},coffee:{id:'coffee',type:'station',x:3,z:0,name:'COFFEE'},reception:{id:'reception',type:'station',x:4,z:0,name:'RECEPTION'}};
const blocked=new Set(['0,0','0,1','7,1','0,4','7,4','1,4','6,4','0,7','7,7','1,7','6,7','1,0','3,0','4,0','6,10','1,10']);
const names=['The Quiet Hours','Something in the Hall','A Pipe Dream','Lights Out','Double Rounds','The Night Nursery','Unseen Company','Until Daybreak'];
const specs=[
[['slime',3,3],['patient',1,5],['coffee',0,0],['badge',1,2]],
[['slime',5,2],['slime',4,6],['patient',1,8],['coffee',0,0],['badge',6,5]],
[['slime',3,4],['pipe',6,5],['patient',1,8],['coffee',0,0],['badge',2,2]],
[['breaker',6,8],['slime',1,5],['slime',4,8],['patient',6,2],['coffee',0,0],['badge',6,9]],
[['pipe',1,8],['slime',6,5],['patient',6,8],['patient',1,5],['coffee',0,0],['badge',2,9]],
[['breaker',1,8],['pipe',6,2],['slime',3,8],['patient',6,8],['patient',1,3],['coffee',0,0],['badge',6,9]],
[['uv',6,8],['uv',1,5],['pipe',6,5],['patient',1,8],['coffee',0,0],['badge',6,2]],
[['breaker',6,8],['uv',1,8],['pipe',6,5],['slime',3,5],['patient',1,5],['patient',6,2],['coffee',0,0],['badge',6,9]]
];
const labels={slime:'SLIME',patient:'SLEEPY PATIENT',coffee:'COFFEE RUN',pipe:'LEAKING PIPE',breaker:'POWER BREAKER',uv:'SHY SPIRIT',badge:'STAFF BADGE'};
const levels=specs.map((a,i)=>({name:names[i],tasks:a.map((t,j)=>({id:'t'+j,type:t[0],x:t[1],z:t[2],name:labels[t[0]],progress:0,done:false})),monster:i>0,speed:.82+Math.min(i,6)*.055,night:i===3||i===5||i===7,unlock:i===2?'MAINTENANCE TOOLS':i===3?'POWER RESTORATION':i===6?'ULTRAVIOLET LAMP':null}));
function valid(x,z){return Number.isInteger(x)&&Number.isInteger(z)&&x>=0&&x<W&&z>=0&&z<H&&!blocked.has(x+','+z)}
function connects(a,b){if(Math.abs(a.x-b.x)+Math.abs(a.z-b.z)!==1)return false;if(a.x!==b.x&&[2,4].includes(Math.min(a.x,b.x))&&![2,5,8].includes(a.z))return false;if(a.z!==b.z&&[3,6].includes(Math.min(a.z,b.z))&&![3,4].includes(a.x))return false;return true}
function edge(a,b){return valid(b.x,b.z)&&connects(a,b)}
function solid(s){return new Set(s.tasks.filter(t=>['pipe','breaker'].includes(t.type)||t.type==='patient'&&!t.done&&s.carry?.id!==t.id).map(t=>t.x+','+t.z))}
function neighbors(a){return[[1,0],[-1,0],[0,1],[0,-1]].map(([x,z])=>({x:a.x+x,z:a.z+z})).filter(b=>edge(a,b))}
function path(from,to,adjacent=false,obstacles=new Set()){let start={x:Math.round(from.x),z:Math.round(from.z)};if(!valid(start.x,start.z))return null;let queue=[start],parents=new Map([[start.x+','+start.z,null]]),end=null;for(let k=0;k<queue.length;k++){let a=queue[k],same=a.x===to.x&&a.z===to.z;if(adjacent?connects(a,to)&&(to.x<3?a.x<3:to.x>4?a.x>4:true):same){end=a;break}for(let b of neighbors(a)){let key=b.x+','+b.z;if(!parents.has(key)&&!obstacles.has(key)){parents.set(key,a);queue.push(b)}}}if(!end)return null;let result=[];for(let a=end;parents.get(a.x+','+a.z);a=parents.get(a.x+','+a.z))result.unshift(a);return result}
function make(level){level=clamp(Math.floor(level)||0,0,7);return{level,phase:'play',player:{x:3,z:2,angle:0},tasks:levels[level].tasks.map(t=>({...t})),selected:null,path:[],carry:null,working:false,time:0,started:false,alarm:0,catches:0,delivered:0,ghost:{x:4,z:9,to:0,wait:2.5,warn:0},invulnerable:0,stun:0,doneTime:0,events:[]}}
function emit(s,type,data={}){s.events.push({type,...data});if(s.events.length>20)s.events.shift()}
function target(s,id){if(id==='coffee'){let t=s.tasks.find(t=>t.type==='coffee'&&!t.done);return t?stations[s.carry?.type==='coffee'?'reception':'coffee']:null}if(stations[id])return stations[id];return s.tasks.find(t=>t.id===id&&!t.done)||null}
function choose(s,id){if(s.phase!=='play'||s.stun>0)return false;let t=target(s,id);if(!t)return false;if(t.type==='coffee')return choose(s,'coffee');let route=path(s.player,t,true,solid(s));if(route===null){emit(s,'hint',{text:'No clear path. Try the hallway.'});return false}s.selected=t.id;s.path=route;s.working=false;s.started=true;emit(s,'target',{id:t.id});return true}
function walk(s,x,z){if(s.phase!=='play'||s.stun>0)return false;x=Math.round(x);z=Math.round(z);let blocks=solid(s);if(!valid(x,z)||blocks.has(x+','+z))return false;let route=path(s.player,{x,z},false,blocks);if(!route)return false;s.selected=null;s.working=false;s.path=route;s.started=true;return true}
function near(s,t){if(!t||s.path.length||Math.hypot(s.player.x-t.x,s.player.z-t.z)>1.06)return false;let a={x:Math.round(s.player.x),z:Math.round(s.player.z)};return a.x===t.x&&a.z===t.z||connects(a,t)}
function canWork(s){let t=target(s,s.selected);return s.phase==='play'&&s.stun<=0&&near(s,t)&&['slime','pipe','breaker','uv'].includes(t.type)}
function work(s,held){s.working=!!held&&canWork(s);if(s.working)s.started=true;return s.working}
function taskComplete(s,t){if(t.done)return;t.done=true;t.progress=1;emit(s,'complete',{kind:t.type,id:t.id,x:t.x,z:t.z});s.selected=null;s.working=false}
function interact(s){let t=target(s,s.selected);if(!near(s,t)||s.stun>0)return;
 if(t.type==='patient'){if(s.carry){emit(s,'hint',{text:'Your hands are full. Visit Recovery or Reception first.'});s.selected=null;return}s.carry={id:t.id,type:'patient'};s.selected=null;emit(s,'pickup',{kind:'patient',x:t.x,z:t.z});return}
 if(t.id==='recovery'){if(s.carry?.type==='patient'){let p=s.tasks.find(a=>a.id===s.carry.id);s.carry=null;s.delivered++;taskComplete(s,p);emit(s,'bed',{index:s.delivered})}else{emit(s,'hint',{text:'Bring a sleepy patient here.'});s.selected=null}return}
 if(t.id==='coffee'){if(s.carry){emit(s,'hint',{text:'Your hands are full.'});s.selected=null;return}let c=s.tasks.find(a=>a.type==='coffee'&&!a.done);if(c){s.carry={id:c.id,type:'coffee'};emit(s,'pickup',{kind:'coffee',x:3,z:0})}s.selected=null;return}
 if(t.id==='reception'){if(s.carry?.type==='coffee'){let c=s.tasks.find(a=>a.id===s.carry.id);s.carry=null;taskComplete(s,c)}else{emit(s,'hint',{text:'A fresh coffee would be lovely.'});s.selected=null}return}
 if(t.type==='badge')taskComplete(s,t);
}
function step(s,dt){s.events=[];if(s.phase!=='play')return;dt=clamp(Number(dt)||0,0,.05);if(!s.started)return;s.time+=dt;s.invulnerable=Math.max(0,s.invulnerable-dt);s.stun=Math.max(0,s.stun-dt);
 if(s.stun<=0&&s.path.length){let b=s.path[0],dx=b.x-s.player.x,dz=b.z-s.player.z,dist=Math.hypot(dx,dz),speed=(s.carry?.type==='patient'?2.4:3.05)*dt;s.player.angle=Math.atan2(dx,dz);if(dist<=speed){s.player.x=b.x;s.player.z=b.z;s.path.shift()}else{s.player.x+=dx/dist*speed;s.player.z+=dz/dist*speed}}
 if(s.path.length===0)interact(s);
 if(s.working&&canWork(s)){let t=target(s,s.selected),duration={slime:1.4,pipe:2,breaker:1.7,uv:1.8}[t.type];t.progress=Math.min(1,t.progress+dt/duration);if(t.progress>=1)taskComplete(s,t)}else s.working=false;
 let def=levels[s.level],g=s.ghost;if(def.monster){if(g.warn>0&&g.warn<1.35){}else if(g.wait>0)g.wait-=dt;else{let pts=[[4,9],[4,2],[3,2],[3,9]],next=pts[g.to],dx=next[0]-g.x,dz=next[1]-g.z,len=Math.hypot(dx,dz),v=def.speed*dt;if(len<=v){g.x=next[0];g.z=next[1];g.to=(g.to+1)%4;g.wait=.8}else{g.x+=dx/len*v;g.z+=dz/len*v}}
 let distance=Math.hypot(g.x-s.player.x,g.z-s.player.z);s.alarm=distance<2.5&&s.player.x>=2.65&&s.player.x<=4.35?1-distance/2.5:0;g.warn=distance<1.3&&s.alarm>0&&s.invulnerable<=0?(g.warn||0)+dt:0;
 if(distance<.54&&g.warn>=1.35&&s.player.x>2.65&&s.player.x<4.35&&s.invulnerable<=0){s.catches++;s.carry=null;s.player.x=3;s.player.z=2;s.path=[];s.selected=null;s.working=false;s.stun=1;s.invulnerable=4;g.warn=0;emit(s,'caught',{text:'Back at the desk. Your completed duties are safe.'})}}
 if(s.tasks.every(t=>t.type==='badge'||t.done)){s.phase='won';s.doneTime=s.time;s.working=false;s.path=[];emit(s,'won',{stars:stars(s)})}
}
function stars(s){return s.phase==='won'?1+(s.catches===0?1:0)+(s.tasks.some(t=>t.type==='badge'&&t.done)?1:0):0}
function profile(raw={}){raw=raw&&typeof raw==='object'?raw:{};let best=Array.from({length:8},(_,i)=>Number.isInteger(raw.best?.[i])?clamp(raw.best[i],0,3):0);let cleared=0;while(cleared<8&&best[cleared]>0)cleared++;let total=best.reduce((a,b)=>a+b,0);return{best,cleared,sound:raw.sound!==false,gentle:!!raw.gentle,low:!!raw.low,outfit:Number.isInteger(raw.outfit)?clamp(raw.outfit,0,total>=15?2:total>=6?1:0):0}}
function award(p,s){if(s.phase!=='won')return false;let old=p.best[s.level];p.best[s.level]=Math.max(old,stars(s));p.cleared=0;while(p.cleared<8&&p.best[p.cleared]>0)p.cleared++;return p.best[s.level]>old}
function restore(raw,p){try{if(!raw||!Number.isInteger(raw.level)||raw.level<0||raw.level>Math.min(7,p.cleared))return null;let s=make(raw.level);if(!Array.isArray(raw.tasks)||raw.tasks.length!==s.tasks.length||!['play','won'].includes(raw.phase))return null;
 for(let i=0;i<s.tasks.length;i++){let a=raw.tasks[i],t=s.tasks[i];if(a.id!==t.id||a.type!==t.type||a.x!==t.x||a.z!==t.z||typeof a.done!=='boolean'||!Number.isFinite(a.progress)||a.progress<0||a.progress>1)return null;t.progress=a.progress;t.done=a.done;if(t.done&&t.progress!==1)return null}
 let x=raw.player?.x,z=raw.player?.z;if(!Number.isFinite(x)||!Number.isFinite(z)||!valid(Math.round(x),Math.round(z)))return null;s.player={x,z,angle:Number.isFinite(raw.player.angle)?raw.player.angle:0};s.time=clamp(Number(raw.time)||0,0,100000);s.started=!!raw.started;s.catches=clamp(Math.floor(raw.catches)||0,0,999);s.delivered=s.tasks.filter(t=>t.type==='patient'&&t.done).length;
 if(raw.carry){let c=s.tasks.find(t=>t.id===raw.carry.id&&!t.done&&t.type===raw.carry.type&&['patient','coffee'].includes(t.type));if(!c)return null;s.carry={id:c.id,type:c.type}}
 s.selected=typeof raw.selected==='string'&&target(s,raw.selected)?raw.selected:null;s.path=Array.isArray(raw.path)?raw.path.map(a=>({x:a.x,z:a.z})):[];let prev={x:Math.round(x),z:Math.round(z)};for(let b of s.path){if(!valid(b.x,b.z)||!(b.x===prev.x&&b.z===prev.z)&&!edge(prev,b))return null;prev=b}s.working=false;s.invulnerable=clamp(Number(raw.invulnerable)||0,0,4);s.stun=clamp(Number(raw.stun)||0,0,1);
 let g=raw.ghost;if(g&&Number.isFinite(g.x)&&Number.isFinite(g.z)&&g.x>=3&&g.x<=4&&g.z>=2&&g.z<=9)s.ghost={x:g.x,z:g.z,to:clamp(Math.floor(g.to)||0,0,3),wait:clamp(Number(g.wait)||0,0,2.5),warn:clamp(Number(g.warn)||0,0,1000)};
 if(raw.phase==='won'){if(!s.tasks.every(t=>t.type==='badge'||t.done))return null;s.phase='won';s.path=[];s.selected=null;s.doneTime=s.time}s.events=[];return s}catch(_){return null}}
return{W,H,levels,stations,labels,valid,edge,neighbors,path,make,choose,walk,near,canWork,work,step,stars,profile,award,restore,clamp};
});

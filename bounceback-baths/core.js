(function(root){'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const ROOMS=[
 ['Peach Courtyard','peach',8,0,0],['Lotus Lounge','jade',11,1,0],['Steam Arcade','violet',14,2,1],['Amber Hammam','amber',16,3,1],['Moonroof Baths','night',18,1,2],['Tidal Terrace','blue',20,4,2],['Orchid Pavilion','orchid',22,2,2],['The Grand Soak','sunset',25,5,3]
].map((r,i)=>({id:i,name:r[0],theme:r[1],goal:r[2],feature:r[3],tier:r[4]}));
function freshProfile(){return {best:Array(8).fill(0),scores:Array(8).fill(0),skin:0,mute:false,gentle:false};}
function profile(raw){let p=freshProfile();if(!raw||typeof raw!=='object')return p;for(let i=0;i<8;i++){p.best[i]=clamp(Math.floor(+raw.best?.[i]||0),0,3);p.scores[i]=clamp(Math.floor(+raw.scores?.[i]||0),0,999999);}p.skin=clamp(Math.floor(+raw.skin||0),0,2);if(p.skin>unlocked(p))p.skin=0;p.mute=!!raw.mute;p.gentle=!!raw.gentle;return p;}
function unlocked(p){let s=p.best.reduce((a,b)=>a+b,0);return s>=15?2:s>=6?1:0;}
function obstacles(i){let f=ROOMS[i].feature;return f===1?[{x:155,y:278,r:34},{x:325,y:430,r:34}]:f===4?[{x:120,y:350,r:30},{x:360,y:350,r:30},{x:240,y:240,r:28}]:f===5?[{x:110,y:310,r:27},{x:370,y:310,r:27}]:[];}
function make(i=0,seed=17){i=clamp(Math.floor(i),0,7);let s={version:1,room:i,seed:seed>>>0,t:0,status:'play',player:{x:240,y:405,vx:0,vy:0,face:0,limbs:[1,1,1,1],idle:0,inv:0,punch:0,hand:0,stretch:0},enemies:[],spawned:0,popped:0,score:0,combo:0,maxCombo:0,lastPop:-10,bursts:0,rescues:0,hits:0,spawnClock:0,restArmed:false,charge:0,pulse:null,events:[],nextId:1};
 spawn(s,0,240,320);spawn(s,0,167,360);spawn(s,0,313,360);return s;}
function rand(s){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296;}
function event(s,type,x,y,extra={}){s.events.push({type,x,y,...extra});if(s.events.length>40)s.events.shift();}
function spawn(s,type,x,y){if(s.spawned>=ROOMS[s.room].goal)return;let hp=type===3?6:type===1?2:1;s.enemies.push({id:s.nextId++,type,x,y,vx:0,vy:0,hp,maxHp:hp,r:type===3?31:type===1?24:20,age:0,wind:0,cool:1.2+rand(s),stun:.6,flash:0,phase:rand(s)*6.28});s.spawned++;}
function resolve(p,r,obs){p.x=clamp(p.x,65+r,415-r);p.y=clamp(p.y,175+r,570-r);for(const o of obs){let d=dist(p,o);if(d<r+o.r){let a=Math.atan2(p.y-o.y,p.x-o.x);p.x=o.x+Math.cos(a)*(r+o.r);p.y=o.y+Math.sin(a)*(r+o.r);}}}
function hit(s,e,power,angle){if(e.hp<=0)return;e.hp-=power;e.stun=.38;e.flash=.2;e.vx=Math.cos(angle)*180;e.vy=Math.sin(angle)*180;event(s,'hit',e.x,e.y,{typeId:e.type});if(e.hp<=0){s.popped++;s.combo=s.t-s.lastPop<1.8?s.combo+1:1;s.lastPop=s.t;s.maxCombo=Math.max(s.maxCombo,s.combo);let points=100+Math.min(8,s.combo-1)*25+(e.type===3?400:0);s.score+=points;event(s,'pop',e.x,e.y,{combo:s.combo,points,typeId:e.type});}}
function burst(s){let p=s.player;s.bursts++;s.charge=0;s.restArmed=false;s.pulse={x:p.x,y:p.y,age:0,r:0,ids:[]};p.inv=Math.max(p.inv,.8);event(s,'burst',p.x,p.y);}
function step(s,dt,input={}){if(s.status!=='play')return s;dt=clamp(Number.isFinite(dt)?dt:0,0,1/30);if(!dt)return s;s.t+=dt;s.events=[];let p=s.player,obs=obstacles(s.room),held=!!input.held;
 p.inv=Math.max(0,p.inv-dt);p.punch=Math.max(0,p.punch-dt);p.stretch=Math.max(0,p.stretch-dt*4);let dx=0,dy=0;
 if(held){if(Number.isFinite(input.x)&&Number.isFinite(input.y)){dx=input.x-p.x;dy=input.y-p.y;}else{dx=clamp(+input.dx||0,-1,1)*100;dy=clamp(+input.dy||0,-1,1)*100;}let d=Math.hypot(dx,dy),speed=Math.min(212,d*8);p.vx=d>3?dx/d*speed:0;p.vy=d>3?dy/d*speed:0;if(d>3)p.face=Math.atan2(dy,dx);p.idle=0;s.charge=0;
 }else{p.vx*=Math.exp(-dt*15);p.vy*=Math.exp(-dt*15);p.idle+=dt;if(s.restArmed){s.charge=clamp((p.idle-.12)/.86,0,1);for(let k=0;k<4;k++)p.limbs[k]=Math.min(1,p.limbs[k]+dt*1.6);if(s.charge>=1)burst(s);}else for(let k=0;k<4;k++)p.limbs[k]=Math.min(1,p.limbs[k]+dt*1.6);}
 p.x+=p.vx*dt;p.y+=p.vy*dt;resolve(p,19,obs);
 let f=ROOMS[s.room].feature;if(f===3){let push=Math.sin(s.t*.7)*24;p.x+=push*dt;resolve(p,19,obs);}if(f===2&&Math.floor(s.t/2.8)%2===1){for(const j of [150,330])if(Math.abs(p.x-j)<20){p.y-=dt*60;resolve(p,19,obs);}}
 let nearest=s.enemies.filter(e=>e.hp>0).sort((a,b)=>dist(p,a)-dist(p,b))[0];
 if(held&&p.punch<=0&&nearest&&dist(p,nearest)<100+nearest.r){let k=p.limbs.findIndex(v=>v>.9);if(k>=0){p.limbs[k]=.05;p.hand=k;p.stretch=1;p.punch=.31;s.restArmed=true;p.face=Math.atan2(nearest.y-p.y,nearest.x-p.x);hit(s,nearest,1,p.face);event(s,'punch',p.x,p.y,{angle:p.face,hand:k});}}
 if(s.pulse){let b=s.pulse;b.age+=dt;b.r=Math.min(156,b.age*420);for(const e of s.enemies)if(e.hp>0&&!b.ids.includes(e.id)&&dist(b,e)<b.r+e.r){b.ids.push(e.id);hit(s,e,2,Math.atan2(e.y-b.y,e.x-b.x));}if(b.age>.6)s.pulse=null;}
 for(const e of s.enemies){if(e.hp<=0)continue;e.age+=dt;e.flash=Math.max(0,e.flash-dt);e.stun=Math.max(0,e.stun-dt);e.cool-=dt;
  if(e.stun<=0){let a=Math.atan2(p.y-e.y,p.x-e.x);if(e.type===2&&dist(e,p)<155)a+=Math.PI;let speed=e.type===3?32:e.type===2?49:35+ROOMS[s.room].tier*7;
   if(e.cool<0&&e.wind===0){e.wind=.65;e.cool=2.8;event(s,'warn',e.x,e.y);}if(e.wind>0){e.wind-=dt;if(e.wind<=0){e.wind=-.32;e.vx=Math.cos(a)*240;e.vy=Math.sin(a)*240;event(s,'dash',e.x,e.y);}}else if(e.wind<0){e.wind=Math.min(0,e.wind+dt);}else{e.vx+=(Math.cos(a)*speed-e.vx)*dt*5;e.vy+=(Math.sin(a)*speed-e.vy)*dt*5;}
  }else{e.vx*=Math.exp(-dt*5);e.vy*=Math.exp(-dt*5);}
  e.x+=e.vx*dt;e.y+=e.vy*dt;resolve(e,e.r,obs);
  if(dist(e,p)<e.r+30&&p.inv<=0){let k=p.limbs.findIndex(v=>v>.6);if(k>=0){p.limbs[k]=0;s.hits++;p.inv=.95;let a=Math.atan2(e.y-p.y,e.x-p.x);e.vx=Math.cos(a)*180;e.vy=Math.sin(a)*180;e.stun=.6;event(s,'shed',p.x,p.y,{hand:k});}else{s.rescues++;p.limbs=[1,1,1,1];p.inv=2;s.restArmed=false;s.charge=0;event(s,'rescue',p.x,p.y);for(const n of s.enemies)if(n.hp>0){n.stun=1;n.vx=(n.x-p.x)*3;n.vy=(n.y-p.y)*3;}}}
 }
 for(const e of s.enemies){let d=dist(e,p),min=e.r+30;if(e.hp>0&&d<min){let a=Math.atan2(e.y-p.y,e.x-p.x);e.x=p.x+Math.cos(a)*min;e.y=p.y+Math.sin(a)*min;resolve(e,e.r,obs);}}
 for(let i=0;i<s.enemies.length;i++)for(let j=i+1;j<s.enemies.length;j++){let a=s.enemies[i],b=s.enemies[j];if(a.hp<=0||b.hp<=0)continue;let d=dist(a,b),min=(a.r+b.r)*.88;if(d<min){let x=(b.x-a.x)/(d||1),y=(b.y-a.y)/(d||1),h=(min-d)*.5;a.x-=x*h;a.y-=y*h;b.x+=x*h;b.y+=y*h;resolve(a,a.r,obs);resolve(b,b.r,obs);}}
 s.enemies=s.enemies.filter(e=>e.hp>0);s.spawnClock-=dt;if(s.spawnClock<=0&&s.enemies.length<6&&s.spawned<ROOMS[s.room].goal){let n=s.spawned,type=s.room===7&&n===ROOMS[s.room].goal-1?3:n%5===4&&s.room>1?2:n%3===2&&s.room>0?1:0;let a=rand(s)*6.28,x=240+Math.cos(a)*130,y=365+Math.sin(a)*155;spawn(s,type,x,y);s.spawnClock=s.room===0?1.1:.8;}
 if(s.popped===ROOMS[s.room].goal){s.status='win';s.stars=1+(s.rescues===0?1:0)+(s.bursts>=2?1:0);s.score+=s.stars*250;event(s,'win',p.x,p.y,{stars:s.stars});}
 return s;}
function settle(s,p){if(s.status!=='win')return false;let before=p.best[s.room];p.best[s.room]=Math.max(before,s.stars);p.scores[s.room]=Math.max(p.scores[s.room],s.score);return p.best[s.room]>before;}
function snapshot(s){let c=JSON.parse(JSON.stringify(s));c.events=[];return c;}
function restore(raw){try{if(!raw||raw.version!==1||!Number.isInteger(raw.room)||raw.room<0||raw.room>7)return null;let s=JSON.parse(JSON.stringify(raw)),r=ROOMS[s.room],p=s.player;if(!p||!Array.isArray(p.limbs)||p.limbs.length!==4||!Array.isArray(s.enemies)||s.enemies.length>14)return null;let nums=[s.t,s.seed,s.spawned,s.popped,s.score,s.combo,s.maxCombo,s.lastPop,s.bursts,s.rescues,s.hits,s.spawnClock,s.charge,s.nextId,p.x,p.y,p.vx,p.vy,p.face,p.idle,p.inv,p.punch,p.hand,p.stretch,...p.limbs];if(nums.some(n=>!Number.isFinite(n))||s.t<0||s.t>864000||s.spawned<3||s.spawned>r.goal||s.popped<0||s.popped>s.spawned||s.score<0||s.bursts<0||s.rescues<0||s.hits<0||p.x<60||p.x>420||p.y<170||p.y>580||p.limbs.some(v=>v<0||v>1)||!['play','win'].includes(s.status)||s.charge<0||s.charge>1)return null;
 if(s.enemies.some(e=>![e.x,e.y,e.hp,e.maxHp,e.r,e.vx,e.vy,e.age,e.wind,e.cool,e.stun,e.flash,e.phase,e.id].every(Number.isFinite)||e.hp<1||e.hp>6||e.r<15||e.r>32||e.x<60||e.x>420||e.y<170||e.y>580||!Number.isInteger(e.type)||e.type<0||e.type>3))return null;if(s.spawned-s.popped!==s.enemies.length||new Set(s.enemies.map(e=>e.id)).size!==s.enemies.length)return null;if(s.status==='win'&&(s.popped!==r.goal||![1,2,3].includes(s.stars)))return null;if(s.pulse&&(![s.pulse.x,s.pulse.y,s.pulse.age,s.pulse.r].every(Number.isFinite)||!Array.isArray(s.pulse.ids)||s.pulse.ids.length>30))return null;s.events=[];return s;}catch{return null;}}
const API={ROOMS,make,step,profile,freshProfile,unlocked,obstacles,settle,snapshot,restore,dist};if(typeof module!=='undefined')module.exports=API;else root.BathsCore=API;
})(typeof window!=='undefined'?window:this);




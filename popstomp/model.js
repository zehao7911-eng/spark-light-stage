(function(root){
'use strict';
const V=1, W=420,H=600;
const names=['Opening Pop','Cherry Chorus','The Big Squeeze','Lemon Limelight','A Little Ice','Sideways Swing','Peach Matinee','Double Trouble','Fizzy Business','Midnight Mixer','Encore, Encore','The Grand Bottling'];
const flavours=['Cherry','Lemon','Peach','Blackberry'];
const palette=['#d9584e','#edc75c','#e39365','#7a658f'];
const labels=['First Fizz','Cherry Chorus','Big Squeeze','Lemon Waltz','Frosty Fizz','Side Swing','Peach Matinee','Double Pop','Bubble Business','Velvet Mixer','Encore Elixir','Grand Reserve'];
const groups=[
 [[128,344,0,5],[268,415,0,5],[170,477,1,4]],
 [[113,351,0,6],[292,354,0,6],[205,463,1,7]],
 [[126,350,0,7],[286,382,1,6],[157,482,2,6]],
 [[108,346,1,7],[280,349,1,7],[210,467,0,8]],
 [[120,351,0,7],[287,381,1,7],[160,479,2,7]],
 [[104,344,0,7],[278,345,1,7],[108,464,2,7],[281,465,0,7]],
 [[113,351,2,8],[294,353,2,8],[202,469,3,9]],
 [[107,346,3,8],[282,344,0,8],[110,468,1,8],[285,466,2,8]],
 [[108,345,0,8],[286,346,2,8],[108,469,3,8],[287,469,1,8]],
 [[113,347,3,9],[287,349,3,9],[124,471,1,9],[281,470,0,9]],
 [[110,347,0,9],[290,350,1,9],[115,470,2,9],[287,469,3,9]],
 [[108,346,3,10],[290,348,0,10],[113,470,1,10],[289,469,2,10]]
];
function profile(raw){
 let d=raw&&typeof raw==='object'?raw:{};
 let stars=Array.from({length:12},(_,i)=>Math.max(0,Math.min(3,Math.floor(+d.stars?.[i]||0))));
 // Unlocks require a contiguous completed path; malformed saves cannot skip the show.
 let cleared=0;while(cleared<12&&stars[cleared]>0)cleared++;
 return {version:V,stars,cleared,sound:d.sound!==false,gentle:!!d.gentle,colour:['cherry','lemon','velvet'].includes(d.colour)?d.colour:'cherry'};
}
function total(p){return p.stars.reduce((a,b)=>a+b,0)}
function create(level,p){
 level=Math.max(0,Math.min(11,Math.floor(level)||0));p=profile(p);
 const fruits=[];
 groups[level].forEach(([cx,cy,type,n],g)=>{
  for(let k=0;k<n;k++){
   const ring=k===0?0:k<7?1:2,ang=(k-1)*Math.PI/3+g*.24,rad=ring===0?0:ring===1?(level>=3?36:29):62;
   const x=Math.max(61,Math.min(359,cx+Math.cos(ang)*rad)),y=Math.max(307,Math.min(503,cy+Math.sin(ang)*rad*.86));
   const frozen=level>=4 && (k===0||k%5===2||level>=7&&k%5===4);
   const spark=level>=2&&g%3===0&&k===1;
   fruits.push({id:fruits.length,x,y,type,hp:frozen?2:1,maxHp:frozen?2:1,spark,cap:g===0&&k===n-1||g===1&&k===n-1||g===2&&k===n-1,dead:false,hit:0});
  }
 });
 const par=[5,5,6,6,7,8,7,9,8,9,9,10][level];
 return {version:V,level,fruits,phase:'play',time:0,stamps:par+5,initial:par+5,par,used:0,empty:0,assisted:false,juice:0,caps:0,chain:0,bestChain:0,refills:0,chargeUnlocked:p.cleared>=2,sweepUnlocked:p.cleared>=5,refillUnlocked:p.cleared>=8,queue:[],events:[],wait:0,selected:'stomp',finished:false};
}
function event(s,type,data={}){s.events.push({type,...data});if(s.events.length>200)s.events.shift();}
function hit(s,f,damage,delay){if(f.dead)return; s.queue.push({id:f.id,at:s.time+delay,damage});}
function stomp(s,x,y,power=0,mode='stomp'){
 if(s.phase!=='play'||s.wait>0||s.queue.length||!Number.isFinite(x+y)||y<290||y>530||x<38||x>382)return false;
 let charged=s.chargeUnlocked&&power>=.55&&s.stamps>=2;
 let sweep=mode==='sweep'&&s.sweepUnlocked&&s.stamps>=2;
 const cost=charged||sweep?2:1;if(s.stamps<cost)return false;
 s.stamps-=cost;s.used+=cost;s.chain=0;s.wait=.33;
 const radius=charged?78:38,damage=charged||sweep?2:1;
 let n=0;
 for(const f of s.fruits){if(f.dead)continue;
  const distance=Math.hypot(f.x-x,(f.y-y)*1.05);
  if(sweep?Math.abs(f.y-y)<32:distance<radius+11){hit(s,f,damage,.12+(sweep?f.x/900:distance/700));n++;}
 }
 if(!n){s.empty++;event(s,'miss',{x,y});}
 event(s,'stomp',{x,y,charged,sweep,radius});
 return true;
}
function update(s,dt){
 if(s.phase!=='play')return;s.time+=Math.min(.05,Math.max(0,dt));s.wait=Math.max(0,s.wait-dt);
 for(const f of s.fruits)f.hit=Math.max(0,f.hit-dt);
 const ready=s.queue.filter(q=>q.at<=s.time);s.queue=s.queue.filter(q=>q.at>s.time);
 for(const q of ready){const f=s.fruits[q.id];if(!f||f.dead)continue;
  f.hp-=q.damage;f.hit=.35;
  if(f.hp>0){event(s,'crack',{x:f.x,y:f.y,type:f.type});continue;}
  f.hp=0;f.dead=true;s.juice++;s.chain++;s.bestChain=Math.max(s.bestChain,s.chain);if(f.cap)s.caps++;
  event(s,'pop',{x:f.x,y:f.y,kind:f.type,cap:f.cap,spark:f.spark,chain:s.chain});
  if(f.spark){event(s,'spark',{x:f.x,y:f.y});for(const other of s.fruits)if(!other.dead&&other.id!==f.id&&Math.hypot(other.x-f.x,other.y-f.y)<92)hit(s,other,1,.12+Math.hypot(other.x-f.x,other.y-f.y)/850);}
 }
 if(s.refillUnlocked&&Math.floor(s.juice/12)>s.refills){s.refills=Math.floor(s.juice/12);s.stamps++;event(s,'refill');}
 if(s.wait===0&&s.queue.length===0){
  if(s.fruits.every(f=>f.dead)){s.phase='won';event(s,'win');}
  else if(s.stamps<=0){s.phase='lost';event(s,'lost');}
 }
}
function encore(s){if(s.phase!=='lost')return false;s.phase='play';s.stamps=4;s.initial+=4;s.assisted=true;event(s,'encore');return true;}
function rating(s){return s.phase==='won'?1+(!s.assisted&&s.used<=s.par?1:0)+(!s.assisted&&s.empty===0?1:0):0;}
function award(p,s){if(s.phase!=='won'||s.finished)return false;s.finished=true;p.stars[s.level]=Math.max(p.stars[s.level],rating(s));p.cleared=0;while(p.cleared<12&&p.stars[p.cleared])p.cleared++;return true;}
function restore(raw,p){
 if(!raw||raw.version!==V||!Number.isInteger(raw.level)||raw.level<0||raw.level>Math.min(11,p.cleared))return null;
 let s=create(raw.level,p);if(!Array.isArray(raw.fruits)||raw.fruits.length!==s.fruits.length)return null;
 for(let i=0;i<s.fruits.length;i++){
  let f=raw.fruits[i];if(!f||!Number.isInteger(f.hp)||f.hp<0||f.hp>s.fruits[i].maxHp)return null;
  s.fruits[i].hp=f.hp;s.fruits[i].dead=f.hp===0;
 }
 for(const key of ['used','empty','stamps','initial','caps','bestChain','refills']){if(!Number.isInteger(raw[key])||raw[key]<0||raw[key]>999)return null;s[key]=raw[key];}
 s.assisted=!!raw.assisted;s.juice=s.fruits.filter(f=>f.dead).length;s.caps=s.fruits.filter(f=>f.dead&&f.cap).length;
 s.time=Number.isFinite(raw.time)&&raw.time>=0?Math.min(raw.time,1e6):0;
 s.wait=Number.isFinite(raw.wait)?Math.max(0,Math.min(.5,raw.wait)):0;
 s.queue=Array.isArray(raw.queue)?raw.queue.filter(q=>q&&Number.isInteger(q.id)&&q.id>=0&&q.id<s.fruits.length&&Number.isFinite(q.at)&&q.at>=s.time&&q.at<s.time+2&&[1,2].includes(q.damage)).slice(0,200).map(q=>({id:q.id,at:q.at,damage:q.damage})):[];
 if(s.fruits.every(f=>f.dead))return null;if(!s.stamps&&!s.queue.length)s.phase='lost';return s;
}
root.Popstomp={V,W,H,names,flavours,palette,labels,profile,total,create,stomp,update,encore,rating,award,restore};
if(typeof module!=='undefined')module.exports=root.Popstomp;
})(typeof globalThis!=='undefined'?globalThis:this);

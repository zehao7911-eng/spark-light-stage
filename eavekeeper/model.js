(function(root){'use strict';
const line=(...p)=>p.map(([x,y])=>({x,y})),E=(x,y,n=16,vx=0,vy=35,spread=28,delay=0)=>({x,y,n,vx,vy,spread,delay});
const levels=[
 {name:'First Little Roof',folk:[[210,459]],ink:200,par:170,emit:[E(210,100,18)],guide:[line([135,325],[285,325])]},
 {name:'Room for Two',folk:[[140,459],[280,459]],ink:290,par:240,emit:[E(140,100,13),E(280,100,13,0,35,28,.15)],guide:[line([90,330],[330,330])]},
 {name:'A Sideways Day',folk:[[265,459]],ink:240,par:200,wind:24,emit:[E(110,105,24,82,15,35)],guide:[line([155,340],[315,290])]},
 {name:'The Alley Gust',folk:[[205,459]],ink:550,par:530,emit:[E(16,315,15,205,-130,5),E(215,100,14,0,35,45,.1)],guide:[line([95,425],[95,300],[185,265],[285,300],[285,425])]},
 {name:'Two Tiny Balconies',folk:[[105,459],[315,459]],ink:280,par:245,emit:[E(105,90,16),E(315,90,16,0,40,25,.15)],guide:[line([45,340],[165,340]),line([255,340],[375,340])]},
 {name:'Crosswind Arcade',folk:[[210,459]],ink:460,par:425,emit:[E(15,340,17,210,-90,4),E(405,340,17,-210,-90,4,.14)],guide:[line([125,425],[125,310],[295,310],[295,425])]},
 {name:'Clouds on Parade',folk:[[150,459],[275,459]],ink:380,par:345,emit:[E(105,85,16,35,20,40),E(305,85,16,-35,20,40,.1)],guide:[line([65,325],[150,275],[245,325],[350,275])]},
 {name:'The Hail Pavilion',folk:[[210,459]],ink:320,par:260,heavy:true,emit:[E(205,85,32,0,115,80)],guide:[line([80,330],[340,330])]},
 {name:'A Very Full Square',folk:[[100,459],[210,459],[320,459]],ink:380,par:335,emit:[E(100,90,14),E(210,90,14,0,45,30,.1),E(320,90,14,0,45,30,.2)],guide:[line([45,325],[375,325])]},
 {name:'The Turning Weather',folk:[[145,459],[275,459]],ink:550,par:540,wind:-12,emit:[E(12,330,18,220,-105,4),E(405,325,18,-210,-90,4,.14),E(210,80,15,0,90,70,.3)],guide:[line([70,425],[70,300],[350,300],[350,425])]},
 {name:'High Street',folk:[[105,459],[210,405],[315,459]],ink:380,par:355,emit:[E(110,85,16),E(210,70,16,0,65,24,.13),E(315,85,16,0,45,25,.26)],guide:[line([50,325],[210,255],[370,325])]},
 {name:'The Grand Rain',folk:[[120,459],[210,459],[300,459]],ink:650,par:615,heavy:true,emit:[E(15,340,20,220,-100,4),E(405,340,20,-220,-100,4,.14),E(120,75,18,15,85,32,.3),E(300,75,18,-15,85,32,.45)],guide:[line([65,425],[65,275],[355,275],[355,425])]}
];
const hypot=Math.hypot,clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),finite=(v,f)=>Number.isFinite(v)?v:f;
function nearest(p,a,b){let dx=b.x-a.x,dy=b.y-a.y,t=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return{x:a.x+t*dx,y:a.y+t*dy,t}}
function length(strokes){let n=0;for(let s of strokes)for(let i=1;i<s.length;i++)n+=hypot(s[i].x-s[i-1].x,s[i].y-s[i-1].y);return n}
function profile(raw={}){if(!raw||typeof raw!=='object')raw={};let best=Array.from({length:12},(_,i)=>clamp(Math.floor(finite(raw.best?.[i],0)),0,3));let cleared=0;while(cleared<12&&best[cleared]>0)cleared++;for(let i=cleared+1;i<12;i++)best[i]=0;let tools=cleared>=8?3:cleared>=4?2:1;return{best,cleared,pen:clamp(Math.floor(finite(raw.pen,0)),0,tools-1),sound:raw.sound!==false,gentle:raw.gentle===true,skin:clamp(Math.floor(finite(raw.skin,0)),0,best.reduce((a,b)=>a+b,0)>=18?2:best.reduce((a,b)=>a+b,0)>=6?1:0)}}
function make(index=0,pen=0){let n=clamp(Math.floor(finite(index,0)),0,11);return{level:n,pen:clamp(Math.floor(pen),0,2),phase:'draw',strokes:[],elapsed:0,health:3,hits:0,deflects:0,absorbed:0,spawned:0,drops:[],bells:[false,false,false],hinted:false,history:[],events:[],endTime:0}}
function cleanStroke(s,raw){if(!Array.isArray(raw)||raw.length<2)return null;let out=[];for(let p of raw.slice(0,260)){let x=Array.isArray(p)?p[0]:p?.x,y=Array.isArray(p)?p[1]:p?.y;if(!Number.isFinite(x)||!Number.isFinite(y)||x<18||x>402||y<130||y>430)return null;let q={x,y};if(levels[s.level].folk.some(([fx,fy])=>hypot(x-fx,y-fy)<42))return null;if(out.length){let prev=out[out.length-1];if(hypot(x-prev.x,y-prev.y)<2)continue;if(levels[s.level].folk.some(([fx,fy])=>{let k=nearest({x:fx,y:fy},prev,q);return hypot(k.x-fx,k.y-fy)<42}))return null;}out.push(q)}if(out.length<2||length([out])<8)return null;return out}
function add(s,raw){if(s.phase!=='draw'||s.strokes.length>=4)return false;let a=cleanStroke(s,raw);if(!a||length(s.strokes)+length([a])>levels[s.level].ink+.01)return false;s.history.push(s.strokes.map(a=>a.map(p=>({...p}))));s.strokes.push(a);return true}
function undo(s){if(s.phase!=='draw'||!s.history.length)return false;s.strokes=s.history.pop();return true}
function clear(s){if(s.phase!=='draw'||!s.strokes.length)return false;s.history.push(s.strokes.map(a=>a.map(p=>({...p}))));s.strokes=[];return true}
function schedule(n){let l=levels[n],seed=9031+n*2017,r=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};let out=[];l.emit.forEach((e,j)=>{for(let k=0;k<e.n;k++)out.push({at:.45+e.delay+k*.23,id:j*100+k,x:e.x+(r()-.5)*e.spread*2,y:e.y+(r()-.5)*8,vx:e.vx+(r()-.5)*12,vy:e.vy+(r()-.5)*8,r:l.heavy&&k%4===0?7:5,heavy:!!l.heavy&&k%4===0})});return out.sort((a,b)=>a.at-b.at||a.id-b.id)}
function start(s){if(s.phase!=='draw'||!s.strokes.length)return false;s.phase='rain';s.elapsed=0;s.health=3;s.hits=0;s.spawned=0;s.deflects=0;s.absorbed=0;s.drops=[];s.bells=[false,false,false];s.endTime=0;return true}
function segments(s){let a=[];for(let st of s.strokes)for(let i=1;i<st.length;i++)a.push([st[i-1],st[i]]);return a}
function event(s,t,x,y,v=0){if(s.events.length<110)s.events.push({t,x,y,v})}
function step(s,dt){if(s.phase!=='rain'||!Number.isFinite(dt)||dt<=0)return;s.events=[];dt=Math.min(dt,1/30);let l=levels[s.level],plan=s._plan||(s._plan=schedule(s.level));s.elapsed+=dt;
 while(s.spawned<plan.length&&plan[s.spawned].at<=s.elapsed){let p=plan[s.spawned++];s.drops.push({...p,age:0,bounce:0,cool:0,dead:false})}
 let seg=segments(s),bellpos=[[42,479],[378,479],[210,520]];
 for(let p of s.drops){p.age+=dt;p.cool=Math.max(0,p.cool-dt);p.vx+=(l.wind||0)*dt;p.vy+=410*dt;let speed=hypot(p.vx,p.vy);if(speed>620){p.vx*=620/speed;p.vy*=620/speed}p.x+=p.vx*dt;p.y+=p.vy*dt;
  for(let [a,b] of seg){let q=nearest(p,a,b),dx=p.x-q.x,dy=p.y-q.y,dist=hypot(dx,dy),rr=p.r+4;if(dist<rr){let nx=dist>.001?dx/dist:0,ny=dist>.001?dy/dist:-1,dot=p.vx*nx+p.vy*ny;p.x=q.x+nx*(rr+.1);p.y=q.y+ny*(rr+.1);if(dot<0){if(s.pen===2&&!p.heavy){p.dead=true;s.absorbed++;event(s,'absorb',p.x,p.y);break}let bounce=s.pen===1?.86:.27;p.vx=(p.vx-(1+bounce)*dot*nx)*.96;p.vy=(p.vy-(1+bounce)*dot*ny)*.96;if(p.cool===0){p.bounce++;if(Math.abs(dot)>45){s.deflects++;event(s,'bounce',p.x,p.y,Math.abs(dot))}if(Math.abs(p.vx)<20&&Math.abs(ny)>.8)p.vx=p.x<210?-34:34;p.cool=.08}}}}
  if(p.dead)continue;for(let i=0;i<3;i++){let b=bellpos[i];if(!s.bells[i]&&hypot(p.x-b[0],p.y-b[1])<17){s.bells[i]=true;event(s,'bell',b[0],b[1],i)}}
  for(let [x,y]of l.folk){if(hypot((p.x-x)*.85,p.y-(y-13))<p.r+21){p.dead=true;if((s.invul||0)<=0){s.hits++;s.health--;s.invul=.6;event(s,'hit',x,y)}break}}
  if(p.y>512||p.x< -30||p.x>450||p.age>11||p.bounce>22){p.dead=true;event(s,'splash',p.x,Math.min(516,p.y),p.heavy?1:0)}
 }
 s.invul=Math.max(0,(s.invul||0)-dt);s.drops=s.drops.filter(p=>!p.dead);if(s.health<=0){s.phase='retry';s.drops=[];event(s,'retry',210,300)}else if(s.spawned===plan.length&&!s.drops.length){s.phase='won';s.endTime=s.elapsed;event(s,'won',210,300)}
}
function stars(s){if(s.phase!=='won')return 0;return 1+(s.hits===0?1:0)+(length(s.strokes)<=levels[s.level].par+.1&&!s.hinted?1:0)}
function award(p,s){let n=stars(s);if(!n)return null;let before=p.cleared,prev=p.best[s.level];p.best[s.level]=Math.max(n,prev);while(p.cleared<12&&p.best[p.cleared]>0)p.cleared++;return{stars:n,newBest:n>prev,newPen:before<4&&p.cleared>=4?1:before<8&&p.cleared>=8?2:null}}
function restore(raw,p){try{if(!raw||typeof raw!=='object')return null;let n=raw.level;if(!Number.isInteger(n)||n<0||n>Math.min(11,p.cleared))return null;let s=make(n,Math.min(raw.pen||0,p.cleared>=8?2:p.cleared>=4?1:0));for(let st of raw.strokes||[])if(!add(s,st))return null;s.hinted=raw.hinted===true;s.history=[];if(raw.phase==='rain'){if(!start(s))return null;let time=clamp(finite(raw.elapsed,0),0,22);for(let t=0;t<Math.round(time*120)&&s.phase==='rain';t++)step(s,1/120);s.events=[];}return s}catch(_){return null}}
const api={levels,profile,make,add,undo,clear,start,step,stars,award,restore,length,nearest,schedule};root.Eave=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

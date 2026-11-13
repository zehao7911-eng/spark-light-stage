export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const copy=v=>JSON.parse(JSON.stringify(v));
export const HOME={x:0,y:-1.55};
export const MISSIONS=[
 {name:'First Contact',place:'MOONPOST 01',theme:0,crew:[[-2.25,-.35],[2.25,.45]],rocks:[],badges:[[-1.15,.10],[1.16,.55],[0,-.55]]},
 {name:'Lost Luggage',place:'MOONPOST 02',theme:0,crew:[[-2.5,.8],[2.45,.65],[-.7,1.5]],rocks:[[0,.85,.52]],badges:[[-2.9,2.6],[2.9,2.5],[0,-.55]]},
 {name:'Radio Silence',place:'THE DRIFTYARD',theme:1,crew:[[-2.55,.8],[2.55,1.3],[0,1.7]],rocks:[[-.65,1.15,.5],[1.25,.25,.45]],badges:[[-2.95,2.6],[2.95,2.6],[0,-.55]],sweep:1},
 {name:'Extra Legroom',place:'WRECK NO. 404',theme:1,crew:[[-2.5,1.1],[2.45,1.2],[-1.3,1.5],[1.3,1.5]],rocks:[[-.75,.4,.5],[.8,.8,.48]],badges:[[-2.95,2.7],[2.95,2.7],[0,-.55]],sweep:2},
 {name:'Ring Road',place:'SATURN SIDE B',theme:2,crew:[[-2.5,.7],[2.5,1],[-1.25,1.4],[1.15,1.5]],rocks:[[0,.3,.55],[-.2,1.05,.5]],badges:[[-2.95,2.75],[2.95,2.75],[0,-.55]],sweep:3},
 {name:'Everybody Home',place:'THE LAST LIGHT',theme:2,crew:[[-2.55,.75],[2.5,.65],[-1.5,1.4],[1.5,1.5],[0,1.75]],rocks:[[-.8,.5,.48],[.8,.9,.44]],badges:[[-2.95,2.7],[2.95,2.7],[0,-.55]],sweep:4}
];
export function profile(v={}){let nums=k=>MISSIONS.map((_,i)=>Number.isFinite(v?.[k]?.[i])?Math.max(0,Math.floor(v[k][i])):0);return{v:1,stars:nums('stars').map(n=>Math.min(3,n)),best:nums('best'),clears:MISSIONS.map((_,i)=>v?.clears?.[i]===true),kit:clamp(Math.floor(+v?.kit||0),0,2),sound:v?.sound!==false,easy:v?.easy!==false,gentle:v?.gentle===true,light:v?.light!==false,rewards:{like:v?.rewards?.like===true,comment:v?.rewards?.comment===true}};}
export const total=p=>p.stars.reduce((a,b)=>a+b,0);
export function unlocked(p){let i=p.clears.indexOf(false);return i<0?5:i;}
export function mergeProfile(a,b){a=profile(a);b=profile(b);for(let i=0;i<6;i++){a.stars[i]=Math.max(a.stars[i],b.stars[i]);a.best[i]=Math.max(a.best[i],b.best[i]);a.clears[i]||=b.clears[i];}a.rewards.like||=b.rewards.like;a.rewards.comment||=b.rewards.comment;return a;}
export function makeRun(mission=0){return{v:1,mission,mode:'ready',phase:'fly',t:0,age:0,x:0,y:-1.55,vx:0,vy:0,tx:0,ty:-1.55,cargo:-1,cx:0,cy:-3,cvx:0,cvy:0,pick:0,dock:0,delivered:MISSIONS[mission].crew.map(()=>false),badges:[false,false,false],bumps:0,score:0,shield:0,combo:0,lastDelivery:-1,events:[]};}
export function hoverPoint(s,i){let c=MISSIONS[s.mission].crew[i];return c?{x:c[0],y:c[1]+2.15}:null;}
export function hazards(s){let m=MISSIONS[s.mission],a=m.rocks.map((r,i)=>({x:r[0],y:r[1],r:r[2],kind:'rock',i}));if(m.sweep){let k=m.sweep;a.push({x:Math.sin(s.t*(.32+k*.045)+k)*1.4,y:.65+k*.10,r:.34,kind:'drone',i:9});}return a;}
export function steer(s,x,y){if(!['ready','playing'].includes(s.mode)||s.phase!=='fly'||!Number.isFinite(x)||!Number.isFinite(y))return false;if(s.mode==='ready'){s.mode='playing';s.events=[{type:'start'}];}s.tx=clamp(x,-3.25,3.25);s.ty=clamp(y,-1.55,4.05);return true;}
export function stop(s){if(s.mode==='result')return;s.tx=s.x;s.ty=s.y;s.vx=s.vy=0;}
export function result(s){return{score:s.score,rescued:s.delivered.filter(Boolean).length,bumps:s.bumps,badges:s.badges.filter(Boolean).length,stars:1+(s.bumps===0?1:0)+(s.badges.every(Boolean)?1:0),time:s.t};}
export function record(p,s){if(s.mode!=='result')return;let r=result(s),i=s.mission;p.stars[i]=Math.max(p.stars[i],r.stars);p.best[i]=Math.max(p.best[i],r.score);p.clears[i]=true;}
export function restore(v){if(!v||v.v!==1||!Number.isInteger(v.mission)||!MISSIONS[v.mission]||!['ready','playing','result'].includes(v.mode)||!['fly','pickup','dock','finish','bump'].includes(v.phase))return null;let keys=['t','age','x','y','vx','vy','tx','ty','cx','cy','cvx','cvy','pick','dock','bumps','score','shield','combo'];if(!keys.every(k=>Number.isFinite(v[k]))||Math.abs(v.x)>3.3||v.y < -1.6||v.y>4.1||Math.abs(v.tx)>3.3||v.ty < -1.6||v.ty>4.1||v.t<0||v.age<0||v.age>100||v.shield<0||v.shield>5||!Number.isInteger(v.cargo)||v.cargo < -1||v.cargo>=MISSIONS[v.mission].crew.length||!['bumps','score','combo'].every(k=>Number.isInteger(v[k])&&v[k]>=0)||!Array.isArray(v.delivered)||v.delivered.length!==MISSIONS[v.mission].crew.length||!v.delivered.every(x=>typeof x==='boolean')||!Array.isArray(v.badges)||v.badges.length!==3||!v.badges.every(x=>typeof x==='boolean')||v.cargo>=0&&v.delivered[v.cargo]||['pickup','dock'].includes(v.phase)&&v.cargo<0||v.phase==='finish'&&!v.delivered.every(Boolean)||v.mode==='result'&&!v.delivered.every(Boolean)||Math.abs(v.vx)>10||Math.abs(v.vy)>10||Math.abs(v.cvx)>30||Math.abs(v.cvy)>30||Math.abs(v.cx)>10||Math.abs(v.cy)>12)return null;let s=copy(v);s.events=[];return s;}
function knock(s){if(s.shield>0)return;s.events.push({type:'bump',cargo:s.cargo});s.bumps++;s.combo=0;s.lastDelivery=-1;s.cargo=-1;s.phase='bump';s.age=0;s.shield=2;s.vx=s.vy=0;s.tx=s.x;s.ty=s.y;}
export function tick(s,dt,p={}){s.events=[];if(s.mode!=='playing'||!Number.isFinite(dt)||dt<=0)return;dt=clamp(dt,0,1/30);s.t+=dt;s.age+=dt;s.shield=Math.max(0,s.shield-dt);
 if(s.phase==='finish'){if(s.age>.9){s.mode='result';s.events.push({type:'finish'});}return;}
 if(s.phase==='bump'){if(s.age>.65){s.x=HOME.x;s.y=HOME.y;s.tx=s.x;s.ty=s.y;s.phase='fly';s.age=0;}return;}
 if(s.phase==='pickup'){if(s.age>.55){s.phase='fly';s.age=0;s.events.push({type:'lift',i:s.cargo});}return;}
 if(s.phase==='dock'){s.cx=HOME.x;s.cy=-2.62-Math.min(.22,s.age*.28);if(s.age>.9){let i=s.cargo;s.delivered[i]=true;s.lastDelivery=i;s.cargo=-1;s.combo++;let amount=300+(s.combo>=3?150:0);s.score+=amount;s.events.push({type:'home',i,amount});s.phase=s.delivered.every(Boolean)?'finish':'fly';s.age=0;s.dock=0;}return;}
 let dx=s.tx-s.x,dy=s.ty-s.y,d=Math.hypot(dx,dy),speed=(s.cargo>=0?2.35:3.2)*(p.easy!==false?.95:1),desired=Math.min(speed,d*4),ex=d>.001?dx/d*desired:0,ey=d>.001?dy/d*desired:0,k=1-Math.exp(-dt*8);s.vx+=(ex-s.vx)*k;s.vy+=(ey-s.vy)*k;s.x=clamp(s.x+s.vx*dt,-3.25,3.25);s.y=clamp(s.y+s.vy*dt,-1.55,4.05);
 if(s.cargo>=0){let ax=s.x,ay=s.y-.48,oldX=s.cx,oldY=s.cy;s.cvy-=7.5*dt;s.cvx*=Math.exp(-dt*(p.kit===2?7.0:2.5));s.cvy*=Math.exp(-dt*1.0);s.cx+=s.cvx*dt;s.cy+=s.cvy*dt;let a=s.cx-ax,b=s.cy-ay,len=Math.hypot(a,b),rope=.90;if(len>rope){s.cx=ax+a/len*rope;s.cy=ay+b/len*rope;}s.cvx=(s.cx-oldX)/dt;s.cvy=(s.cy-oldY)/dt;
  if(Math.hypot(s.x-HOME.x,s.y-HOME.y)<.38&&Math.hypot(s.vx,s.vy)<.8){s.dock+=dt;if(s.dock>.22){s.phase='dock';s.age=0;s.x=HOME.x;s.y=HOME.y;s.vx=s.vy=0;s.events.push({type:'dock'});}}else s.dock=0;
 }else{let found=-1;for(let i=0;i<s.delivered.length;i++){if(s.delivered[i])continue;let h=hoverPoint(s,i);if(Math.hypot(s.x-h.x,s.y-h.y)<(p.kit===1?.62:.42)&&Math.hypot(s.vx,s.vy)<.8){found=i;break;}}
  if(found>=0){s.pick+=dt;if(s.pick>.18){s.cargo=found;s.cx=s.x;s.cy=s.y-1.1;s.cvx=s.vx;s.cvy=s.vy;s.phase='pickup';s.age=0;s.shield=Math.max(s.shield,1.5);s.vx=s.vy=0;s.tx=s.x;s.ty=s.y;s.pick=0;s.events.push({type:'hook',i:found});}}else s.pick=0;
 }
 for(let i=0;i<3;i++){let b=MISSIONS[s.mission].badges[i];if(!s.badges[i]&&Math.hypot(s.x-b[0],s.y-b[1])<.48){s.badges[i]=true;s.score+=75;s.events.push({type:'badge',i});}}
 if(s.phase==='fly'&&s.shield<=0)for(let h of hazards(s)){let ship=Math.hypot(s.x-h.x,s.y-h.y)<h.r+(p.easy!==false?.25:.34),pass=s.cargo>=0&&Math.hypot(s.cx-h.x,s.cy-.50-h.y)<h.r+.18;if(ship||pass){knock(s);break;}}
}

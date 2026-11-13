export const TITLE='Rivet Road';
export const MISSIONS=[
 {name:'Seaside breach',place:'PORTO • MORNING',tip:'Drag to drive. Release to fire.',goal:'Clear the road',reward:'TWIN CANNON',length:53,weapon:0},
 {name:'The missing crew',place:'OLD TOWN • GOLDEN HOUR',tip:'Drive close to pick up the crew.',goal:'Rescue 4 crew',reward:'MORTAR',length:58,weapon:1},
 {name:'Bridge delivery',place:'CANAL • BLUE HOUR',tip:'Park on both winches to lower the bridge.',goal:'Escort the truck',reward:'DOZER SHIELD',length:60,weapon:2},
 {name:'Power down',place:'RAILYARD • NIGHT',tip:'Break the 2 generators. Then hit the boss.',goal:'Disable the crawler',reward:'FREE ROAM',length:62,weapon:2}
];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export function fresh(){return {version:1,unlocked:0,stars:[0,0,0,0],weapon:0,sound:true,motion:true,quality:1,run:null};}
function box(id,x,z,w,d,hp,kind){return {id,x,z,w,d,hp,max:hp,kind,dead:false};}
export function create(index=0,weapon=0,dozer=false,tour=0){
 index=clamp(index|0,0,3);let s={version:1,index,tour:clamp(tour|0,0,3),phase:'ready',t:0,x:0,z:4,angle:0,turret:0,vx:0,vz:0,speed:0,hp:7,maxHp:7,weapon:clamp(weapon|0,0,2),dozer,shield:dozer?3:0,shots:[],units:[],props:[],people:[],winches:[],bridge:0,truck:index===2?{x:0,z:4,arrived:false}:null,selected:null,fire:0,cool:0,events:[],kills:0,rescued:0,hits:0,combo:0,bestCombo:0,lastKill:-20,nextId:1000,winAt:0,banked:false,score:0};
 s.props.push(box('crate-intro',-3,8,1.8,1.8,1,'crate'));
 // The broad street and staggered courtyards remain navigable even before barriers fall.
 for(let row=0;row<6;row++)for(let side of [-1,1]){
   let z=8+row*8;if(index===2&&z>25&&z<37)continue;
   s.props.push(box('house-'+row+'-'+side,side*10.8,z,5.6,5.2,999,'building'));
 }
 const unit=(x,z,type='scout')=>{let hp=type==='boss'?28:type==='heavy'?6:3;hp+=s.tour; s.units.push({id:'u'+s.units.length,x,z,ox:x,oz:z,hp,max:hp,type,angle:Math.PI,aim:Math.PI,cool:1.3+s.units.length*.2,wind:0,tx:0,tz:0,dead:false,hit:0});};
 const prop=(x,z,kind='crate')=>s.props.push(box('p'+s.props.length,x,z,kind==='gate'?8:kind==='generator'?2.2:1.5,kind==='gate'?.8:1.5,kind==='gate'?4:kind==='generator'?5:1,kind));
 if(index===0){unit(0,13);unit(-4,23);unit(4,29,'heavy');unit(0,40);prop(-1.8,22,'barrel');prop(1,28,'barrel');prop(0,33,'gate');prop(-4,42);}
 if(index===1){unit(0,13);unit(-4,24);unit(4,27);unit(0,39,'heavy');unit(-4,47);prop(-3,20,'barrel');prop(2.8,36,'barrel');prop(0,31,'gate');s.people=[[-6,19],[6,23],[-6,39],[6,44]].map(([x,z],i)=>({id:'crew'+i,x,z,state:'waiting',jump:0}));}
 if(index===2){unit(-2,15);unit(3,22,'heavy');unit(-4,43);unit(4,49,'heavy');prop(-1.2,18,'barrel');prop(3,46,'barrel');prop(0,39,'gate');s.winches=[{x:-5.5,z:25,p:0},{x:5.5,z:25,p:0}];}
 if(index===3){unit(0,14,'heavy');unit(-4,25);unit(4,30);unit(0,49,'boss');prop(-5.6,39,'generator');prop(5.6,39,'generator');prop(-2.8,23,'barrel');prop(3,29,'barrel');prop(0,32,'gate');}
 for(let p of s.props)if(p.kind==='building')p.hp=p.max=999;
 return s;
}
export function input(s,x,z){if(!['ready','play'].includes(s.phase))return;s.phase='play';let n=Math.hypot(x,z);s.vx=n>.01?x/Math.max(1,n):0;s.vz=n>.01?z/Math.max(1,n):0;}
export function stop(s){s.vx=s.vz=0;}
export function target(s,id){if(s.units.some(e=>e.id===id&&!e.dead)||s.props.some(p=>p.id===id&&!p.dead&&p.kind!=='building'))s.selected=id;}
function event(s,type,data={}){s.events.push({type,...data});}
export function drain(s){return s.events.splice(0);}
export function solid(s,x,z,r=.76){
 if(Math.abs(x)>7.5||z<2||z>MISSIONS[s.index].length+1)return true;
 if(s.units.some(e=>!e.dead&&Math.hypot(x-e.x,z-e.z)<1.75))return true;
 if(s.index===2&&z>28&&z<34&&(s.bridge<.99||Math.abs(x)>3.1))return true;
 for(let p of s.props){if(p.dead||!['building','gate','crate','generator'].includes(p.kind))continue;if(Math.abs(x-p.x)<p.w/2+r&&Math.abs(z-p.z)<p.d/2+r)return true;}
 return false;
}
function segmentRect(x,z,nx,nz,p,pad=.12){
 let lo=0,hi=1;for(let [v,d,a,b]of [[x,nx-x,p.x-p.w/2-pad,p.x+p.w/2+pad],[z,nz-z,p.z-p.d/2-pad,p.z+p.d/2+pad]]){if(Math.abs(d)<1e-8){if(v<a||v>b)return false;}else{let t1=(a-v)/d,t2=(b-v)/d;if(t1>t2)[t1,t2]=[t2,t1];lo=Math.max(lo,t1);hi=Math.min(hi,t2);if(lo>hi)return false;}}return true;
}
export function lineClear(s,a,b){return !s.props.some(p=>!p.dead&&p.id!==b.id&&['building','gate','crate','generator'].includes(p.kind)&&segmentRect(a.x,a.z,b.x,b.z,p));}
export function damageProp(s,p,amount=1,chain=false){
 if(p.dead||p.kind==='building')return;p.hp-=amount;event(s,'impact',{x:p.x,z:p.z,kind:p.kind});
 if(p.hp<=0){p.dead=true;s.score+=p.kind==='generator'?100:15;event(s,'break',{x:p.x,z:p.z,kind:p.kind});if(p.kind==='barrel')explode(s,p.x,p.z,4.8,4,true);}
}
export function damageUnit(s,u,amount=1){
 if(u.dead)return;
 if(u.type==='boss'&&s.props.some(p=>p.kind==='generator'&&!p.dead)){event(s,'shield',{x:u.x,z:u.z});return;}
 u.hp-=amount;u.hit=.2;event(s,'hit',{x:u.x,z:u.z});
 if(u.hp<=0){u.dead=true;s.kills++;s.combo=s.t-s.lastKill<2.5?s.combo+1:1;s.bestCombo=Math.max(s.bestCombo,s.combo);s.lastKill=s.t;s.score+=u.type==='boss'?500:u.type==='heavy'?100:60;event(s,'destroy',{x:u.x,z:u.z,kind:u.type,combo:s.combo});if(s.kills>0){s.hp=Math.min(s.maxHp,s.hp+1);event(s,'repair',{x:s.x,z:s.z});}}
}
export function explode(s,x,z,r,damage,chain=false){event(s,'blast',{x,z,r});for(let u of s.units)if(!u.dead&&distance(u,{x,z})<r)damageUnit(s,u,damage);for(let p of s.props)if(!p.dead&&p.kind!=='building'&&distance(p,{x,z})<r)damageProp(s,p,damage,chain);}
export function hurt(s,amount=1){if(s.phase!=='play'||s.cool>0)return false;if(s.shield>0){s.shield--;event(s,'shield',{x:s.x,z:s.z});}else{s.hp-=amount;s.hits+=amount;event(s,'hurt',{x:s.x,z:s.z});}s.cool=1;if(s.hp<=0){s.hp=0;s.phase='lost';stop(s);event(s,'lost');}return true;}
function bestTarget(s){
 let list=[...s.units.filter(u=>!u.dead&&!(u.type==='boss'&&s.props.some(p=>p.kind==='generator'&&!p.dead))),...s.props.filter(p=>!p.dead&&p.kind!=='building')].filter(e=>distance(s,e)<13.5&&lineClear(s,s,e));
 let chosen=list.find(e=>e.id===s.selected);if(chosen)return chosen;
 list.sort((a,b)=>((a.kind?2:0)+distance(s,a))-((b.kind?2:0)+distance(s,b)));return list[0];
}
export function aimTarget(s){return bestTarget(s);}
function fire(s,u){let a=Math.atan2(u.x-s.x,u.z-s.z),muzzle=Math.min(1.7,distance(s,u)*.5);s.turret=a;s.fire=s.weapon===0?.92:s.weapon===1?.75:1.35;
 let offsets=s.weapon===1?[-.22,.22]:[0];for(let off of offsets)s.shots.push({id:s.nextId++,x:s.x+Math.sin(a)*muzzle+Math.cos(a)*off,z:s.z+Math.cos(a)*muzzle-Math.sin(a)*off,ox:s.x,oz:s.z,vx:Math.sin(a)*23,vz:Math.cos(a)*23,age:0,owner:'player',damage:s.weapon===2?3:1,mortar:s.weapon===2,tx:u.x,tz:u.z});event(s,'fire',{x:s.x,z:s.z,angle:a,weapon:s.weapon});}
export function remaining(s){return s.units.filter(e=>!e.dead).length;}
export function objective(s){if(s.index===1&&s.rescued<4)return `${s.rescued} / 4 crew`;if(s.index===2&&s.bridge<.99)return `${s.winches.filter(w=>w.p>=1).length} / 2 winches`;if(s.index===2&&s.truck&&!s.truck.arrived)return 'Lead the truck';if(s.index===3){let n=s.props.filter(p=>p.kind==='generator'&&!p.dead).length;if(n)return `${2-n} / 2 generators`;}if(remaining(s))return `${remaining(s)} hostiles`;return 'Reach the exit';}
export function canFinish(s){return remaining(s)===0&&(s.index!==1||s.rescued===4)&&(s.index!==2||s.truck.arrived);}
export function rating(s){return 1+(s.hits<=3?1:0)+(s.t<150?1:0);}
export function step(s,dt){
 if(s.phase!=='play')return;dt=clamp(dt,0,1/30);s.t+=dt;s.cool=Math.max(0,s.cool-dt);s.fire=Math.max(0,s.fire-dt);
 let moving=Math.hypot(s.vx,s.vz)>.08,sp=4.2;
 let dx=s.vx*sp*dt,dz=s.vz*sp*dt;let oldx=s.x,oldz=s.z;
 if(!solid(s,s.x+dx,s.z))s.x+=dx;if(!solid(s,s.x,s.z+dz))s.z+=dz;s.speed=Math.hypot(s.x-oldx,s.z-oldz)/dt;
 if(moving){let a=Math.atan2(s.vx,s.vz),delta=Math.atan2(Math.sin(a-s.angle),Math.cos(a-s.angle));s.angle+=delta*Math.min(1,dt*9);}
 if(s.dozer&&moving)for(let p of s.props)if(!p.dead&&['crate','gate','barrel'].includes(p.kind)&&distance(s,p)<1.8){damageProp(s,p,8);}
 for(let p of s.people){if(p.state==='waiting'&&distance(s,p)<2.15){p.state='boarding';p.jump=0;event(s,'rescue',{x:p.x,z:p.z});}if(p.state==='boarding'){p.jump+=dt;p.x+=(s.x-p.x)*dt*5;p.z+=(s.z-p.z)*dt*5;if(p.jump>.65){p.state='aboard';s.rescued++;s.score+=100;s.hp=Math.min(7,s.hp+1);}}}
 for(let w of s.winches){if(w.p<1&&distance(s,w)<2.1&&!moving){w.p=Math.min(1,w.p+dt/.9);if(w.p>=1)event(s,'winch',{x:w.x,z:w.z});}}
 if(s.index===2&&s.winches.every(w=>w.p>=1)){s.bridge=Math.min(1,s.bridge+dt*.65);}
 if(s.truck){let t=s.truck,blocked=s.units.some(u=>!u.dead&&Math.abs(u.z-t.z)<7)||s.props.some(p=>!p.dead&&p.kind==='gate'&&p.z>t.z&&p.z-t.z<3);if(!blocked&&s.z>t.z+3&&s.z-t.z<25&&(t.z<26||s.bridge>=.99)){t.z=Math.min(MISSIONS[2].length-3,t.z+dt*3.5);}if(t.z>=MISSIONS[2].length-3.1)t.arrived=true;}
 let u=bestTarget(s);if(u){let a=Math.atan2(u.x-s.x,u.z-s.z),delta=Math.atan2(Math.sin(a-s.turret),Math.cos(a-s.turret));s.turret+=delta*Math.min(1,dt*12);if(!moving&&s.fire<=0)fire(s,u);}
 for(let e of s.units){if(e.dead)continue;e.hit=Math.max(0,e.hit-dt);let d=distance(s,e);if(d<14||e.wind>0){e.aim=Math.atan2(s.x-e.x,s.z-e.z);if(e.wind>0){e.wind-=dt;if(e.wind<=0){let a=Math.atan2(e.tx-e.x,e.tz-e.z);let spread=e.type==='boss'?[-.18,0,.18]:[0];for(let off of spread)s.shots.push({id:s.nextId++,x:e.x+Math.sin(a)*1.3,z:e.z+Math.cos(a)*1.3,vx:Math.sin(a+off)*8.5,vz:Math.cos(a+off)*8.5,age:0,owner:'enemy',damage:1});e.cool=e.type==='boss'?2.2:3.6;event(s,'enemyFire',{x:e.x,z:e.z});}}else{e.cool-=dt;if(e.cool<=0){e.wind=1.15;e.tx=s.x;e.tz=s.z;}}}
 if(d<1.65)hurt(s);
 }
 for(let b of s.shots){b.age+=dt;if(b.dead)continue;let nx=b.x+b.vx*dt,nz=b.z+b.vz*dt;
 if(b.mortar&&Math.hypot(nx-b.ox,nz-b.oz)>=Math.hypot(b.tx-b.ox,b.tz-b.oz)){b.dead=true;explode(s,b.tx,b.tz,3.1,3);continue;}
 if(b.owner==='player'){if(!b.mortar){for(let p of s.props){if(!p.dead&&segmentRect(b.x,b.z,nx,nz,p)){b.dead=true;damageProp(s,p,b.damage);break;}}if(!b.dead)for(let e of s.units)if(!e.dead&&Math.hypot(nx-e.x,nz-e.z)<1.1){b.dead=true;damageUnit(s,e,b.damage);break;}}}
 else {if(Math.hypot(nx-s.x,nz-s.z)<.95){b.dead=true;hurt(s);}for(let p of s.props)if(!p.dead&&segmentRect(b.x,b.z,nx,nz,p)){b.dead=true;if(p.kind!=='building')damageProp(s,p,1);break;}}
 b.x=nx;b.z=nz;if(b.age>4||nz<0||nz>70||Math.abs(nx)>15)b.dead=true;
 }
 s.shots=s.shots.filter(b=>!b.dead);
 if(s.phase==='play'&&canFinish(s)&&s.z>MISSIONS[s.index].length-2){s.phase='won';s.winAt=s.t;stop(s);s.shots=[];event(s,'won');}
}
export function bank(save,s){if(s.phase!=='won'||s.banked)return false;s.banked=true;save.stars[s.index]=Math.max(save.stars[s.index],rating(s));save.unlocked=Math.min(3,Math.max(save.unlocked,s.index+1));save.weapon=Math.min(2,Math.max(save.weapon,s.index+1));return true;}
export function encode(save,s){let run=s?structuredClone(s):null;if(run){run.events=[];run.vx=run.vz=0;}return JSON.stringify({...save,run});}
export function decode(raw){try{
 let a=JSON.parse(raw);if(!a||a.version!==1||!Number.isInteger(a.unlocked)||a.unlocked<0||a.unlocked>3||!Array.isArray(a.stars)||a.stars.length!==4||a.stars.some(v=>!Number.isInteger(v)||v<0||v>3)||!Number.isInteger(a.weapon)||a.weapon<0||a.weapon>2)return fresh();
 let out={...fresh(),...a};for(let key of ['sound','motion'])if(typeof out[key]!=='boolean')out[key]=true;if(![0,1].includes(out.quality))out.quality=1;
 if(out.run){let r=out.run,arrays={units:16,props:40,shots:200,people:4,winches:2},valid=Number.isInteger(r.index)&&r.index>=0&&r.index<=out.unlocked&&['ready','play','won','lost'].includes(r.phase)&&['x','z','hp','t','angle','turret','fire','cool','shield','speed','bridge','kills','rescued','score','nextId','tour','weapon'].every(k=>Number.isFinite(r[k]))&&Math.abs(r.x)<=9&&r.z>=0&&r.z<=70&&r.hp>=0&&r.hp<=7&&r.shield>=0&&r.shield<=3&&r.weapon>=0&&r.weapon<=2;
 for(let [key,max]of Object.entries(arrays))if(!Array.isArray(r[key])||r[key].length>max||r[key].some(v=>!v||!Number.isFinite(v.x)||!Number.isFinite(v.z)))valid=false;
 if(r.truck&&(!Number.isFinite(r.truck.x)||!Number.isFinite(r.truck.z)))valid=false;
 if(!valid)out.run=null;else{r.events=[];stop(r);}
 }
 return out;
 }catch{return fresh();}}

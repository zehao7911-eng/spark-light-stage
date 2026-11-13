/* CRUMB CAPER — original arcade flight and swept target-plane contacts. */
(function(g){'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)),mix=(a,b,t)=>a+(b-a)*t;
const SHIFTS=[
 {name:'Sunday Stroll',goal:6000,speed:5.4,wind:0,kind:0,palette:0,task:'car',count:8},
 {name:'Market Mischief',goal:10000,speed:5.8,wind:.25,kind:1,palette:1,task:'cart',count:3},
 {name:'Umbrella Affair',goal:14000,speed:6,wind:.4,kind:2,palette:2,task:'umbrella',count:3},
 {name:'Boulevard Boogie',goal:20000,speed:6.5,wind:.6,kind:3,palette:3,task:'person',count:4},
 {name:'Golden Rush',goal:26000,speed:7,wind:.75,kind:3,palette:4,task:'types',count:3},
 {name:'The Grand Caper',goal:34000,speed:7.5,wind:.85,kind:3,palette:5,task:'types',count:4}
];
const INFO={car:{y:1.45,r:1.35,points:180},person:{y:1.96,r:.85,points:120},umbrella:{y:2.72,r:1.5,points:250},cart:{y:2.05,r:1.25,points:220}};
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
function fresh(){return{v:1,stars:[0,0,0,0,0,0],best:[0,0,0,0,0,0],hat:0,sound:true};}
function clean(o){let s=fresh();if(!o||o.v!==1)return s;for(let k of ['stars','best'])for(let i=0;i<6;i++){let v=Number(o[k]?.[i]);s[k][i]=Number.isFinite(v)?clamp(Math.floor(v),0,k==='stars'?3:999999):0;}s.sound=o.sound!==false;let h=Number(o.hat);s.hat=Number.isFinite(h)?clamp(h|0,0,3):0;return s;}
const unlock=s=>{let n=1;while(n<6&&s.stars[n-1])n++;return n;};
const hats=s=>{let n=s.stars.reduce((a,b)=>a+b,0);return 1+(n>=3?1:0)+(n>=8?1:0)+(n>=14?1:0);};
function fallTime(height,target=.12){return Math.max(0,(-1.4+Math.sqrt(1.96+19.6*Math.max(0,height-target)))/9.8);}
const groundAt=x=>Math.abs(x)>6.45?.29:.12;
class Game{
 constructor(level=0,seed=731){this.level=clamp(level|0,0,5);this.cfg=SHIFTS[this.level];this.rand=rng(seed);this.t=0;this.time=60;this.p={x:0,y:5.2,z:0,vx:0,vy:0};this.control={x:0,y:0,drop:false};this.entities=[];this.drops=[];this.events=[];this.score=0;this.hits=0;this.combo=0;this.maxCombo=0;this.charge=0;this.specials=0;this.targetKinds=new Set();this.cooldown=0;this.chainTime=0;this.finished=false;this.nextId=1;this.shots=0;this.ground=0;this.perfects=0;
 for(let i=0;i<30;i++){let kind=i%5===0&&this.cfg.kind>=1?'cart':i%5===1&&this.cfg.kind>=2?'umbrella':i%5===2?'person':'car';let x=kind==='person'?(i%2?-8.6:8.6):kind==='umbrella'||kind==='cart'?(i%2?-7:7):[-4,0,4][i%3];this.entities.push(this.make(kind,x,-9-i*3.6,i));}
 this.entities[0]={...this.entities[0],kind:'car',x:0,z:-7,vz:0,cruise:0,...INFO.car};this.entities[1]={...this.entities[1],kind:'car',x:0,z:-15,vz:0,cruise:0,...INFO.car};
 }
 make(kind,x,z,i){let cruise=kind==='car'?(x<0?1.5:-1.1):kind==='person'?.6:0;return{id:this.nextId++,kind,x,z,vz:cruise,cruise,hit:false,react:0,color:i%6,...INFO[kind]};}
 taskProgress(){return this.cfg.task==='types'?this.targetKinds.size:(this.tally?.[this.cfg.task]||0);}
 input(x,y,drop){if(this.finished)return;if(Number.isFinite(x))this.control.x=clamp(x,-1,1);if(Number.isFinite(y))this.control.y=clamp(y,-1,1);if(typeof drop==='boolean')this.control.drop=drop;}
 emit(type,data={}){this.events.push({type,...data});}
 drain(){return this.events.splice(0);}
 future(e,t){return{x:e.x,z:e.z+e.vz*t};}
 predict(target=null){let p=this.p,t=fallTime(p.y-.25,groundAt(p.x)),x=p.x+p.vx*.12*t,z=p.z-this.cfg.speed*t;let best=null,dist=Infinity;
 for(let e of target?[target]:this.entities){if(e.hit)continue;let tt=fallTime(p.y-.25,e.y),q=this.future(e,tt);let bx=p.x+p.vx*.12*tt,bz=p.z-this.cfg.speed*tt,dd=Math.hypot(q.x-bx,q.z-bz);if((target||dd<e.r+1.6)&&dd<dist&&Math.abs(e.z-p.z)<18){best=e;dist=dd;t=tt;x=q.x;z=q.z;}}
 return{x,z,y:best?best.y:groundAt(x),time:t,target:best};}
 fire(target=null,superShot=false){if(this.finished||(!superShot&&this.cooldown>0))return false;let p=this.p,pr=this.predict(target);if(pr.time<.02)return false;this.drops.push({id:this.nextId++,x:p.x,y:p.y-.25,z:p.z-.4,sx:p.x,sy:p.y-.25,sz:p.z-.4,vx:(pr.x-p.x)/pr.time,vz:(pr.z-(p.z-.4))/pr.time,age:0,superShot,locked:pr.target?.id||null});if(!superShot){this.cooldown=.52;this.shots++;}this.emit('drop',{superShot});return true;}
 special(){if(this.finished||this.charge<4)return false;const targets=this.entities.filter(e=>!e.hit&&Math.abs(e.x-this.p.x)<=5&&e.z-this.p.z<3&&e.z-this.p.z>-18).sort((a,b)=>Math.abs(a.z-this.p.z)-Math.abs(b.z-this.p.z)).slice(0,4);if(!targets.length)return false;this.charge=0;this.specials++;for(let e of targets)this.fire(e,true);this.emit('special');return true;}
 hit(e,d){e.hit=true;e.react=2.7;this.combo=this.chainTime>0?this.combo+1:1;this.chainTime=4.5;this.maxCombo=Math.max(this.maxCombo,this.combo);this.hits++;this.targetKinds.add(e.kind);this.tally=this.tally||{};this.tally[e.kind]=(this.tally[e.kind]||0)+1;this.charge=clamp(this.charge+1,0,4);let near=Math.abs(d.x-e.x)<e.r*.55,bonus=this.level>=4&&this.hits%5===0?2:1,points=e.points*Math.min(this.combo,5)*bonus+(near?40:0);if(near)this.perfects++;this.score+=points;this.emit('hit',{id:e.id,kind:e.kind,x:e.x,y:e.y,z:e.z,points,combo:this.combo,perfect:near,gold:bonus===2,superShot:d.superShot});}
 tick(dt){if(this.finished||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,.05);this.t+=dt;this.time=Math.max(0,60-this.t);let p=this.p;
 p.vx=mix(p.vx,this.control.x*8,1-Math.exp(-dt*8));p.vy=mix(p.vy,-this.control.y*4,1-Math.exp(-dt*7));p.x=clamp(p.x+(p.vx+Math.sin(this.t*.7)*this.cfg.wind)*dt,-7.4,7.4);p.y=clamp(p.y+p.vy*dt,4.4,8);p.z-=this.cfg.speed*dt;
 this.cooldown=Math.max(0,this.cooldown-dt);this.chainTime=Math.max(0,this.chainTime-dt);if(this.chainTime===0)this.combo=0;if(this.control.drop)this.fire();
 for(let e of this.entities){let v=e.cruise;if(e.kind==='car'&&v!==0&&this.entities.some(o=>o!==e&&o.kind==='car'&&Math.abs(o.x-e.x)<.2&&((v<0&&o.z<e.z&&e.z-o.z<4)||(v>0&&o.z>e.z&&o.z-e.z<4))))v=0;e.vz=v;e.z+=e.vz*dt;e.react=Math.max(0,e.react-dt);if(e.z-p.z>19){let z=p.z-85-this.rand()*30;for(let attempt=0;attempt<40&&this.entities.some(o=>o!==e&&Math.abs(o.x-e.x)<2.2&&Math.abs(o.z-z)<6.5);attempt++)z-=6.6;e.z=z;e.hit=false;e.react=0;e.id=this.nextId++;}}
 const alive=[];for(let d of this.drops){let oldY=d.y,oldAge=d.age;d.age+=dt;d.x=d.sx+d.vx*d.age;d.z=d.sz+d.vz*d.age;d.y=d.sy-1.4*d.age-4.9*d.age*d.age;let impact=null,first=Infinity;
 for(let e of this.entities)if(!e.hit&&oldY>=e.y&&d.y<=e.y){const u=(oldY-e.y)/(oldY-d.y),age=oldAge+dt*u,x=d.sx+d.vx*age,z=d.sz+d.vz*age,ez=e.z-e.vz*dt*(1-u);if(Math.abs(x-e.x)<e.r+.18&&Math.abs(z-ez)<e.r+.35&&u<first){impact=e;first=u;}}
 if(impact){d.x=d.sx+d.vx*(oldAge+dt*first);d.z=d.sz+d.vz*(oldAge+dt*first);d.y=impact.y;this.hit(impact,d);}
 else if(d.y<=groundAt(d.x)){this.ground++;this.emit('splat',{x:d.x,z:d.z,y:groundAt(d.x)});}
 else if(d.age<3)alive.push(d);
 }this.drops=alive;
 if(this.time<=0)this.finish();}
 finish(){if(this.finished)return;this.finished=true;this.control={x:0,y:0,drop:false};this.stars=this.score>=this.cfg.goal&&this.taskProgress()>=this.cfg.count?1+(this.maxCombo>=5?1:0)+(this.perfects>=8?1:0):0;this.emit('finish',{stars:this.stars});}
 commit(save){if(!this.finished)return null;let s=clean(save);s.stars[this.level]=Math.max(s.stars[this.level],this.stars);s.best[this.level]=Math.max(s.best[this.level],this.score);return s;}
}
g.Caper={Game,SHIFTS,INFO,fallTime,fresh,clean,unlock,hats,clamp};
})(typeof window==='undefined'?globalThis:window);

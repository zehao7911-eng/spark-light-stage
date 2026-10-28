(function(root){
'use strict';
const TAU=Math.PI*2, clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const COURTS=[
 {name:'First Splash',r:4.8,p:[0,1.2],foes:[[0,-2.65]],buoys:[],color:0},
 {name:'Buoy Buddies',r:4.8,p:[0,2.65],foes:[[-1.9,-2.5],[1.9,-2.5]],buoys:[[0,-.1,.67]],color:1},
 {name:'Bank Shot Bay',r:4.8,p:[0,2.7],foes:[[-2.9,-1.4],[0,-2.8],[2.9,-1.4]],buoys:[[-1,.1,.55],[1,.1,.55]],color:2},
 {name:'Little Ice Club',r:4.25,p:[0,2.3],foes:[[-2.6,-1.15],[0,-2.9],[2.6,-1.15]],buoys:[[0,-.4,.62]],color:3},
 {name:'Pearl Pinball',r:4.8,p:[0,2.6],foes:[[-3,-1.4],[-1,-3],[1,-3],[3,-1.4]],buoys:[[-1.8,.1,.48],[1.8,.1,.48],[0,-1.2,.48]],color:4},
 {name:'The Grand Splash',r:4.55,p:[0,2.4],foes:[[-2.95,-1.1],[-1.1,-2.9],[1.1,-2.9],[2.95,-1.1]],buoys:[[-1.35,.2,.52],[1.35,.2,.52]],color:5}
];
function body(id,x,z){return {id,x,z,vx:0,vz:0,r:id===0?.55:.53,m:id===0?1.3:1,alive:true,fall:0,angle:id===0?Math.PI:0,hit:0};}
class Game{
 constructor(level=0,lap=0){this.level=clamp(level|0,0,5);this.lap=Math.max(0,lap|0);this.court=COURTS[this.level];this.actors=[body(0,...this.court.p),...this.court.foes.map((p,i)=>body(i+1,...p))];this.phase='aim';this.time=0;this.clock=0;this.shots=0;this.rescues=2;this.score=0;this.chain=0;this.bestChain=0;this.banks=0;this.plans=[];this.events=[];this.reason='';}
 emit(type,data={}){this.events.push({type,...data});if(this.events.length>70)this.events.shift();}
 get player(){return this.actors[0];}
 get remaining(){return this.actors.filter(a=>a.id&&a.alive).length;}
 launch(dx,dz,power=1){if(this.phase!=='aim'||!this.player.alive||!Number.isFinite(dx)||!Number.isFinite(dz)||!Number.isFinite(power))return false;const d=Math.hypot(dx,dz);if(d<.01||power<.07)return false;const v=2+7.5*clamp(power,0,1);this.player.vx=dx/d*v;this.player.vz=dz/d*v;this.player.angle=Math.atan2(dx,dz);this.phase='slide';this.clock=0;this.shots++;this.chain=0;this.emit('launch',{x:this.player.x,z:this.player.z,power});return true;}
 physics(dt){
  for(const a of this.actors){a.hit=Math.max(0,a.hit-dt);if(!a.alive){a.fall+=dt;continue;}a.x+=a.vx*dt;a.z+=a.vz*dt;const drag=Math.exp(-1.05*dt);a.vx*=drag;a.vz*=drag;if(Math.hypot(a.vx,a.vz)>.15)a.angle=Math.atan2(a.vx,a.vz);
   for(const [x,z,r] of this.court.buoys){let dx=a.x-x,dz=a.z-z,d=Math.hypot(dx,dz),min=a.r+r;if(d<min){dx/=d||1;dz/=d||1;if(d<.001){dx=1;dz=0;}a.x=x+dx*(min+.001);a.z=z+dz*(min+.001);let vn=a.vx*dx+a.vz*dz;if(vn<0){a.vx-=2.05*vn*dx;a.vz-=2.05*vn*dz;a.hit=.2;if(a.id===0)this.banks++;this.emit('bank',{x:a.x,z:a.z,speed:-vn});}}}
  }
  for(let i=0;i<this.actors.length;i++)for(let j=i+1;j<this.actors.length;j++){let a=this.actors[i],b=this.actors[j];if(!a.alive||!b.alive)continue;let dx=b.x-a.x,dz=b.z-a.z,d=Math.hypot(dx,dz),min=a.r+b.r;if(d>=min)continue;let nx=d>.0001?dx/d:1,nz=d>.0001?dz/d:0,over=min-d+.001,ia=1/a.m,ib=1/b.m;a.x-=nx*over*ia/(ia+ib);a.z-=nz*over*ia/(ia+ib);b.x+=nx*over*ib/(ia+ib);b.z+=nz*over*ib/(ia+ib);let rel=(b.vx-a.vx)*nx+(b.vz-a.vz)*nz;if(rel<-.05){let impulse=-(1+.95)*rel/(ia+ib);a.vx-=impulse*nx*ia;a.vz-=impulse*nz*ia;b.vx+=impulse*nx*ib;b.vz+=impulse*nz*ib;a.hit=b.hit=.22;this.emit('bonk',{x:(a.x+b.x)/2,z:(a.z+b.z)/2,speed:-rel});}}
  for(const a of this.actors)if(a.alive){let v=Math.hypot(a.vx,a.vz);if(v>15){a.vx*=15/v;a.vz*=15/v;}if(Math.hypot(a.x,a.z)>this.court.r+.04){a.alive=false;a.fall=0;if(a.id){this.chain++;this.bestChain=Math.max(this.chain,this.bestChain);let points=100*this.chain;this.score+=points;this.emit('out',{x:a.x,z:a.z,id:a.id,chain:this.chain,points});}else this.emit('splash',{x:a.x,z:a.z,id:0});}}
 }
 settle(){for(const a of this.actors){a.vx=0;a.vz=0;}
  if(!this.player.alive){if(this.rescues>0){this.rescues--;let candidates=[[0,0],this.court.p,[0,2],[-2,1],[2,1],[0,-1.5]],p=candidates.find(p=>this.actors.every(a=>!a.alive||Math.hypot(a.x-p[0],a.z-p[1])>1.3)&&this.court.buoys.every(b=>Math.hypot(b[0]-p[0],b[1]-p[1])>b[2]+.7))||this.court.p;Object.assign(this.player,body(0,...p));this.emit('rescue',{x:p[0],z:p[1]});}else{this.phase='lost';this.reason='A little too splashy.';this.emit('lost');return;}}
  if(!this.remaining){this.phase='won';this.emit('won',{stars:this.stars(),score:this.score});return;}
  if(this.phase==='slide'){
   const p=this.player;this.plans=this.actors.filter(a=>a.id&&a.alive).map(a=>{let angle=Math.atan2(p.z-a.z,p.x-a.x)+Math.sin(a.id*2.7+this.shots*1.7)*(.16+this.level*.01);let speed=3.5+this.level*.22+Math.min(1,this.lap*.15);return {id:a.id,dx:Math.cos(angle),dz:Math.sin(angle),speed};});this.phase='tell';this.clock=0;
  }else{this.phase='aim';this.clock=0;this.emit('ready');}
 }
 step(dt){if(!['slide','tell','reply'].includes(this.phase))return;dt=clamp(Number.isFinite(dt)?dt:0,0,1/30);this.time+=dt;this.clock+=dt;
  if(this.phase==='tell'){for(const a of this.actors)if(!a.alive)a.fall+=dt;if(this.clock>=.85){for(const p of this.plans){const a=this.actors.find(a=>a.id===p.id);if(a?.alive){a.vx=p.dx*p.speed;a.vz=p.dz*p.speed;}}this.phase='reply';this.clock=0;this.emit('reply');}return;}
  this.physics(dt);if(this.clock>4.5||(this.clock>.38&&this.actors.every(a=>!a.alive||Math.hypot(a.vx,a.vz)<.16)))this.settle();
 }
 stars(){return 1+(this.rescues===2?1:0)+(this.shots<=this.court.foes.length+2?1:0);}
 snapshot(){const {events,court,...state}=this;return JSON.parse(JSON.stringify({v:1,...state}));}
 static restore(s){try{if(s?.v!==1||!Number.isInteger(s.level)||s.level<0||s.level>5||!Number.isInteger(s.lap)||s.lap<0||s.lap>9999)return null;const g=new Game(s.level,s.lap);if(!['aim','slide','tell','reply','won','lost'].includes(s.phase)||s.actors?.length!==g.actors.length)return null;for(let i=0;i<s.actors.length;i++){let a=s.actors[i];if(a.id!==i||typeof a.alive!=='boolean'||!['x','z','vx','vz','fall','angle','hit'].every(k=>Number.isFinite(a[k])&&Math.abs(a[k])<1000)||Math.hypot(a.x,a.z)>35||Math.hypot(a.vx,a.vz)>16||a.r!==g.actors[i].r||a.m!==g.actors[i].m)return null;}if(!['time','clock','shots','rescues','score','chain','bestChain','banks'].every(k=>Number.isFinite(s[k])&&s[k]>=0)||s.rescues>2||s.clock>10||s.shots>100000)return null;if(!Array.isArray(s.plans)||s.plans.length>4||s.plans.some(p=>!Number.isInteger(p.id)||p.id<1||p.id>=s.actors.length||!['dx','dz','speed'].every(k=>Number.isFinite(p[k]))||Math.hypot(p.dx,p.dz)>1.01||p.speed<0||p.speed>8))return null;Object.assign(g,JSON.parse(JSON.stringify(s)));g.court=COURTS[g.level];g.events=[];return g;}catch{return null;}}
}
root.FlipperCore={Game,COURTS,clamp};if(typeof module!=='undefined')module.exports=root.FlipperCore;
})(typeof window!=='undefined'?window:globalThis);

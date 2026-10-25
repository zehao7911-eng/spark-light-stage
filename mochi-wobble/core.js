import {stepPillar,stepCoin,grow,breakPillar} from './source-balance.js';
export const THEMES=[{name:'STRAWBERRY MORNING',sky:'#c1dedc',wall:'#f1dfc8',tile:'#6da69d',accent:'#dd826d',icing:'#f3d7cd'}, {name:'LAVENDER AFTERNOON',sky:'#c9cce6',wall:'#e6dce9',tile:'#8d8eae',accent:'#b49ac5',icing:'#e2d8ed'}, {name:'PISTACHIO PICNIC',sky:'#c8dfbf',wall:'#ede1c4',tile:'#86a18c',accent:'#b6bd7e',icing:'#dbe7bd'}];
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function segDist(x,y,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,t=clamp(((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(x-ax-dx*t,y-ay-dy*t);}
export class World {
 constructor(round=1,seed=round*381+17){this.round=round;this.rng=seed>>>0||1;this.pillar={x:50,vx:0,angle:0,length:20,angleVel:0};this.target=50;this.holding=false;this.wind=0;this.coins=[];this.ticks=0;this.spawnIn=35;this.spawned=0;this.nextId=1;this.score=0;this.caught=0;this.perfect=0;this.combo=0;this.bestCombo=0;this.falls=0;this.missed=0;this.status='ready';this.goal=10+Math.min(4,round-1)*2;this.difficulty=1+Math.min(7,round-1)*.045;this.cooldown=0;this.tip={x:50,y:70};}
 random(){this.rng=(Math.imul(this.rng,1664525)+1013904223)>>>0;return this.rng/4294967296;}
 start(){if(this.status!=='ready')return false;this.status='playing';return true;}
 aim(x){if(this.status!=='playing'||!Number.isFinite(x))return false;this.target=clamp(x,8,92);this.holding=true;return true;}
 release(){if(this.status!=='playing')return false;this.holding=false;this.target=this.pillar.x;return true;}
 step(){if(this.status!=='playing')return [];const ev=[];this.ticks++;if(this.cooldown>0)this.cooldown--;
  // Source seeded random wind/decay and coupled cart/pole equations.
  this.wind+=(this.random()*2-1)*.005;this.wind*=.98;
  this.tip=stepPillar(this.pillar,this.target,this.wind,this.difficulty);
  // New forgiving rule: lifting the finger braces the stack; inertia remains while dragging.
  if(!this.holding)this.pillar.angleVel-=this.pillar.angle*.00032*this.pillar.length;
  if(this.pillar.x<8||this.pillar.x>92){this.pillar.x=clamp(this.pillar.x,8,92);this.pillar.vx*=-.25;ev.push({type:'wall',x:this.pillar.x,y:90});this.tip={x:this.pillar.x+Math.sin(this.pillar.angle)*this.pillar.length,y:90-Math.cos(this.pillar.angle)*this.pillar.length};}
  if((this.tip.y>86||Math.abs(this.pillar.angle)>1.43)&&!this.cooldown){
   const oldLength=this.pillar.length;breakPillar(this.pillar);this.falls++;this.combo=0;this.pillar.length=Math.max(20,this.pillar.length);this.pillar.angle*=.15;this.pillar.angleVel=0;this.pillar.vx*=.25;this.target=this.pillar.x;this.cooldown=80;ev.push({type:'fall',x:this.tip.x,y:this.tip.y,length:oldLength});if(this.falls>=3){this.status='lost';ev.push({type:'lose'});return ev;}
  }
  this.spawnIn--;if(this.spawnIn<=0&&this.coins.length<9){
   // First berry is within reach; later fruit form a readable wandering stream.
   const phase=(this.round-1)*.7,amplitude=this.spawned<3?12:24;
   const x=this.spawned===0?50:clamp(50+Math.sin(this.spawned*.91+phase)*amplitude+(this.random()-.5)*4,12,88);
   this.coins.push({id:this.nextId++,x,y:this.spawned===0?48:5,vx:(this.random()-.5)*.16,vy:this.spawned===0?.7:0,gold:this.spawned>0&&this.spawned%5===0});this.spawned++;this.spawnIn=Math.round(75/this.difficulty);
  }
  for(const c of this.coins){stepCoin(c,this.wind);const tipDistance=Math.hypot(c.x-this.tip.x,c.y-this.tip.y),bodyDistance=segDist(c.x,c.y,this.pillar.x,88,this.tip.x,this.tip.y);
   if(!this.cooldown&&(tipDistance<8.2||bodyDistance<8.0)){
    const perfect=tipDistance<8.2;const gain=grow(this.pillar,perfect)*(c.gold?2:1);this.score+=gain;this.caught++;if(perfect){this.perfect++;this.combo++;this.bestCombo=Math.max(this.combo,this.bestCombo);}else this.combo=0;c.remove=true;ev.push({type:'catch',x:c.x,y:c.y,perfect,gold:c.gold,gain,combo:this.combo});
    if(this.caught>=this.goal){this.status='won';ev.push({type:'win'});break;}
   }else if(c.y>95){c.remove=true;this.missed++;ev.push({type:'miss',x:c.x,y:94});}
  }
  this.coins=this.coins.filter(c=>!c.remove);return ev;
 }
 stars(){return this.status==='won'?1+(this.falls===0?1:0)+(this.perfect>=3?1:0):0;}
 save(){return {version:1,round:this.round,rng:this.rng,pillar:{...this.pillar},target:this.target,holding:this.holding,wind:this.wind,coins:this.coins.map(c=>({...c})),ticks:this.ticks,spawnIn:this.spawnIn,spawned:this.spawned,nextId:this.nextId,score:this.score,caught:this.caught,perfect:this.perfect,combo:this.combo,bestCombo:this.bestCombo,falls:this.falls,missed:this.missed,status:this.status,cooldown:this.cooldown};}
}
export function restore(s){if(!s||s.version!==1||!Number.isInteger(s.round)||s.round<1||s.round>999||!['ready','playing'].includes(s.status))throw Error('Invalid shift');const w=new World(s.round);for(const k of ['rng','ticks','spawnIn','spawned','nextId','score','caught','perfect','combo','bestCombo','falls','missed','cooldown'])if(!Number.isSafeInteger(s[k])||s[k]<0||s[k]>(k==='rng'?4294967295:1e9))throw Error('Invalid counter');if(s.nextId<1||s.spawnIn>120||s.cooldown>80||s.combo>s.perfect||s.bestCombo<s.combo||s.falls>2||s.caught>=w.goal||s.perfect>s.caught||s.coins?.length>9||!Array.isArray(s.coins))throw Error('Invalid totals');for(const k of ['target','wind'])if(!Number.isFinite(s[k]))throw Error('Invalid input');if(s.target<8||s.target>92||Math.abs(s.wind)>1)throw Error('Input out of bounds');if(typeof s.holding!=='boolean')throw Error('Invalid grip');const p=s.pillar;if(!p||['x','vx','angle','length','angleVel'].some(k=>!Number.isFinite(p[k]))||p.x<0||p.x>100||p.length<20||p.length>64||Math.abs(p.vx)>100||Math.abs(p.angle)>4||Math.abs(p.angleVel)>1)throw Error('Invalid cart');const ids=new Set();for(const c of s.coins){if(typeof c.gold!=='boolean'||!Number.isSafeInteger(c.id)||c.id<1||c.id>=s.nextId||ids.has(c.id)||['x','y','vx','vy'].some(k=>!Number.isFinite(c[k]))||Math.abs(c.x)>200||c.y<-10||c.y>100||Math.abs(c.vx)>10||Math.abs(c.vy)>10)throw Error('Invalid fruit');ids.add(c.id);}for(const k of ['rng','ticks','spawnIn','spawned','nextId','score','caught','perfect','combo','bestCombo','falls','missed','cooldown','status','target','holding','wind'])w[k]=s[k];w.pillar={...s.pillar};w.coins=s.coins.map(c=>({...c}));w.tip={x:w.pillar.x+Math.sin(w.pillar.angle)*w.pillar.length,y:90-Math.cos(w.pillar.angle)*w.pillar.length};return w;}

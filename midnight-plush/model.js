export const TOYS=[
 {name:'Cocoa Bear',kind:'bear',color:0xc88e67,cream:0xffdfba,r:.42},
 {name:'Mochi Cat',kind:'cat',color:0xe8b4d2,cream:0xffedf1,r:.4},
 {name:'Snowdrop Bunny',kind:'bunny',color:0xdcd8ef,cream:0xfff0f5,r:.39},
 {name:'Pistachio Frog',kind:'frog',color:0x9dcc8a,cream:0xe4efbc,r:.42},
 {name:'Peach Fox',kind:'fox',color:0xf2a17d,cream:0xffe8cd,r:.41},
 {name:'Moon Penguin',kind:'penguin',color:0x80a8cb,cream:0xe2eff6,r:.41},
 {name:'Honey Duck',kind:'duck',color:0xf5d17c,cream:0xffe7ab,r:.41},
 {name:'Berry Panda',kind:'panda',color:0xf1d9e8,cream:0xfff1ef,r:.43},
 {name:'Lilac Axolotl',kind:'axolotl',color:0xc6a7e6,cream:0xf7d5ee,r:.44},
 {name:'Toast Capy',kind:'capy',color:0xbca18b,cream:0xe6cfaf,r:.44},
 {name:'Velvet Bat',kind:'bat',color:0xa5a6d0,cream:0xe5c2e6,r:.43},
 {name:'Starlight Cub',kind:'star',color:0xf4d7a1,cream:0xfff0ce,r:.42}
];
export const clone=x=>JSON.parse(JSON.stringify(x));
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>t*t*(3-2*t);
export function random(seed){let n=seed>>>0;return ()=>{n=(n+0x6d2b79f5)>>>0;let t=Math.imul(n^n>>>15,1|n);t^=t+Math.imul(t^t>>>7,61|t);return ((t^t>>>14)>>>0)/4294967296;};}
export function cleanProfile(raw){let p={owned:Array(12).fill(0),attempts:0,wins:0,best:0,theme:0,mute:true,seed:721};if(!raw)return p;for(const k of ['attempts','wins','best'])p[k]=clamp(Number(raw[k])||0,0,1e8)|0;if(Array.isArray(raw.owned)&&raw.owned.length===12)p.owned=raw.owned.map(n=>clamp(Number(n)||0,0,9999)|0);p.theme=[0,1,2].includes(raw.theme)?raw.theme:0;p.mute=raw.mute!==false;p.seed=Number.isInteger(raw.seed)?raw.seed>>>0:721;const unique=p.owned.filter(Boolean).length;if(unique<[0,3,7][p.theme])p.theme=0;return p;}
export class Game{
 constructor(seed=721,owned=Array(12).fill(0),saved=null){this.seed=seed>>>0;this.t=0;this.phase='aim';this.pt=0;this.round=0;this.nextId=0;this.aimX=0;this.aimZ=.65;this.clawX=0;this.clawZ=.65;this.clawY=2.85;this.bodies=[];this.targetId=null;this.grip=0;this.squeeze=false;this.result=null;this.events=[];this.resolved=false;this.known=owned.map(n=>!!n);this.refill();if(saved)this.restore(saved);}
 refill(){const rnd=random(this.seed+this.round*9187);const missing=this.known.map((n,i)=>n?-1:i).filter(i=>i>=0);for(let z=0;z<4;z++)for(let x=0;x<4;x++){const type=(z*4+x+this.round)%12;this.addBody(type,-1.45+x*.95+(rnd()-.5)*.16,-1.25+z*.8+(rnd()-.5)*.12,.43);}
  // A readable first prize, exposed at the front under the initial reticle.
  this.addBody(missing[0]??this.round%12,0,.65,1.2);
  for(let k=0;k<5;k++)this.addBody(missing[k%Math.max(1,missing.length)]??k,(-1.2+k%3*1.15),(-.9+(k>>1)*.7),1.4+(k%2)*.12);
 }
 addBody(type,x,z,y){this.bodies.push({id:this.nextId++,type,x,y,z,vx:0,vy:0,vz:0,rx:0,rz:0,held:false,r:TOYS[type].r});}
 candidate(x=this.clawX,z=this.clawZ){let best=null;for(const b of this.bodies){if(b.held)continue;const d=Math.hypot(x-b.x,z-b.z);if(d>b.r*.97)continue;const surface=b.y+Math.sqrt(Math.max(0,b.r*b.r-d*d));if(!best||surface>best.surface)best={body:b,d,surface,quality:clamp(1-d/b.r*.86,0,1)};}return best;}
 aim(x,z){if(this.phase!=='aim')return;this.aimX=clamp(x,-1.9,1.9);this.aimZ=clamp(z,-1.55,1.6);}
 grab(){if(this.phase!=='aim')return false;this.phase=Math.hypot(this.clawX-this.aimX,this.clawZ-this.aimZ)>.12?'approach':'lower';this.fromX=this.clawX;this.fromZ=this.clawZ;this.pt=0;this.round++;this.startY=this.clawY;const hit=this.candidate(this.aimX,this.aimZ);this.targetId=hit?.body.id??null;this.contactY=hit?hit.body.y+.42:.38;this.grip=hit?.quality??0;this.squeeze=false;this.resolved=false;this.result=null;this.events.push({type:'drop'});return true;}
 tighten(){if(this.phase!=='close'||this.squeeze)return false;this.squeeze=true;this.grip=clamp(this.grip+.16,0,1);this.events.push({type:'squeeze'});return true;}
 held(){return this.bodies.find(b=>b.id===this.targetId);}
 transition(p){this.phase=p;this.pt=0;}
 physics(dt){for(const b of this.bodies){if(b.held)continue;b.vy-=8.2*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.z+=b.vz*dt;const drag=Math.exp(-5*dt);b.vx*=drag;b.vz*=drag;b.rx=lerp(b.rx,clamp(b.vz*.25,-.3,.3),1-Math.exp(-9*dt));b.rz=lerp(b.rz,clamp(-b.vx*.25,-.3,.3),1-Math.exp(-9*dt));if(b.y<b.r){b.y=b.r;b.vy=Math.max(0,-b.vy*.13);}if(Math.abs(b.x)>2.0){b.x=clamp(b.x,-2,2);b.vx*=-.2;}if(Math.abs(b.z)>1.65){b.z=clamp(b.z,-1.65,1.65);b.vz*=-.2;}}
  for(let pass=0;pass<2;pass++)for(let i=0;i<this.bodies.length;i++)for(let j=i+1;j<this.bodies.length;j++){const a=this.bodies[i],b=this.bodies[j];if(a.held||b.held)continue;let dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,d=Math.hypot(dx,dy,dz),sum=(a.r+b.r)*.92;if(d>=sum)continue;if(d<.0001){dx=.001;dy=.001;d=Math.hypot(dx,dy);}const n=(sum-d)*.5;dx/=d;dy/=d;dz/=d;a.x-=dx*n;a.y=Math.max(a.r,a.y-dy*n);a.z-=dz*n;b.x+=dx*n;b.y=Math.max(b.r,b.y+dy*n);b.z+=dz*n;const rv=(b.vx-a.vx)*dx+(b.vy-a.vy)*dy+(b.vz-a.vz)*dz;if(rv<0){const impulse=-rv*.52;a.vx-=impulse*dx;a.vy-=impulse*dy;a.vz-=impulse*dz;b.vx+=impulse*dx;b.vy+=impulse*dy;b.vz+=impulse*dz;}}
  for(const b of this.bodies){b.x=clamp(b.x,-2,2);b.z=clamp(b.z,-1.65,1.65);}
 }
 step(dt){if(this.phase==='result')return;this.t+=dt;this.physics(dt);this.pt+=dt;const target=this.held();
  if(this.phase==='aim'){const a=1-Math.exp(-12*dt);this.clawX=lerp(this.clawX,this.aimX,a);this.clawZ=lerp(this.clawZ,this.aimZ,a);this.clawY=2.85;}
  else if(this.phase==='approach'){const a=ease(clamp(this.pt/.35,0,1));this.clawX=lerp(this.fromX,this.aimX,a);this.clawZ=lerp(this.fromZ,this.aimZ,a);if(this.pt>=.35)this.transition('lower');}
  else if(this.phase==='lower'){this.clawY=lerp(2.85,this.contactY,ease(clamp(this.pt/1.05,0,1)));if(this.pt>=1.05){this.events.push({type:'contact'});this.transition('close');}}
  else if(this.phase==='close'){if(this.pt>=.62){if(target&&this.grip>.12){target.held=true;this.holdDX=target.x-this.clawX;this.holdDZ=target.z-this.clawZ;this.events.push({type:'lift',quality:this.grip});}this.transition('lift');}}
  else if(this.phase==='lift'){this.clawY=lerp(this.contactY,2.85,ease(clamp(this.pt/1.25,0,1)));if(target?.held){this.attach(target);if(this.grip<.58&&this.pt>.53){target.held=false;target.vx=.45*(this.clawX>0?1:-1);target.vy=.1;this.events.push({type:'slip'});}}
   if(this.pt>=1.25){if(target?.held)this.transition('carry');else this.finish(false);}}
  else if(this.phase==='carry'){const a=ease(clamp(this.pt/1.05,0,1));this.clawX=lerp(this.aimX,-1.8,a);this.clawZ=lerp(this.aimZ,1.7,a);if(target?.held)this.attach(target);if(this.pt>=1.05){this.transition('release');this.events.push({type:'release'});}}
  else if(this.phase==='release'){if(target){target.x=-1.8;target.z=1.7;target.y=3.2-3.7*ease(clamp(this.pt/.75,0,1));target.rx=this.pt*.35;}if(this.pt>=.75)this.finish(true);}
 }
 attach(b){b.x=this.clawX+(this.holdDX||0)*.2+Math.sin(this.pt*9)*.035;b.z=this.clawZ+(this.holdDZ||0)*.2;b.y=this.clawY-.42;b.rx=Math.sin(this.pt*7)*.14;b.rz=Math.sin(this.pt*5+.7)*.13;}
 finish(won){if(this.resolved)return;const b=this.held();this.resolved=true;this.result={won,type:b?.type??null,quality:this.grip,new:won&&b&&!this.known[b.type],round:this.round};if(won&&b){this.known[b.type]=true;this.bodies=this.bodies.filter(t=>t.id!==b.id);}this.phase='result';this.pt=0;this.events.push({...this.result,toyType:this.result.type,type:won?'prize':'miss'});}
 next(){if(this.phase!=='result')return false;this.targetId=null;this.result=null;this.clawX=0;this.clawZ=.65;this.clawY=2.85;this.aimX=0;this.aimZ=.65;this.transition('aim');if(this.bodies.length<13){this.bodies=[];this.refill();this.events.push({type:'refill'});}return true;}
 reshuffle(){if(this.phase!=='aim')return false;this.bodies=[];this.round++;this.refill();this.events.push({type:'refill'});return true;}
 snapshot(){const obj={v:1};for(const k of ['seed','t','phase','pt','round','nextId','aimX','aimZ','clawX','clawZ','clawY','bodies','targetId','grip','squeeze','result','resolved','known','startY','contactY','holdDX','holdDZ','rewardedRound','fromX','fromZ'])if(this[k]!==undefined)obj[k]=clone(this[k]);return obj;}
 restore(s){if(!s||s.v!==1||!['aim','approach','lower','close','lift','carry','release','result'].includes(s.phase)||!Array.isArray(s.bodies)||s.bodies.length>30||!Array.isArray(s.known)||s.known.length!==12)throw Error('Invalid game save');const ids=new Set();for(const b of s.bodies){if(!Number.isInteger(b.id)||ids.has(b.id)||!TOYS[b.type])throw Error('Invalid toy');ids.add(b.id);for(const k of ['x','y','z','vx','vy','vz','rx','rz','r'])if(!Number.isFinite(b[k])||Math.abs(b[k])>100)throw Error('Invalid body');}for(const k of ['t','pt','round','nextId','aimX','aimZ','clawX','clawZ','clawY','grip'])if(!Number.isFinite(s[k])||Math.abs(s[k])>1e8)throw Error('Invalid state');if(s.phase==='approach'&&(!Number.isFinite(s.fromX)||!Number.isFinite(s.fromZ)))throw Error('Invalid carriage');Object.assign(this,clone(s));delete this.v;this.events=[];}
}
export function reward(p,g){if(!g.result||g.rewardedRound===g.round)return;g.rewardedRound=g.round;p.attempts++;if(g.result.won){const i=g.result.type;p.owned[i]=Math.min(9999,p.owned[i]+1);p.wins++;p.best=Math.max(p.best,Math.round(g.result.quality*100));}}


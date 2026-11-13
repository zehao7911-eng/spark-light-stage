(function(root){'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const JOBS=[
 {name:'A Sofa, a Sunny Day',theme:0,door:0,gap:3.5,parts:[['sofa',0,-.2,0]],walls:[],par:16},
 {name:'Mind the Door',theme:0,door:0,gap:1.65,parts:[['sofa',0,-1,0]],walls:[],par:26},
 {name:'Corner Café',theme:1,door:2.35,gap:1.8,parts:[['sofa',-1.7,-2.8,0],['chair',-2.5,1.7,0]],walls:[[-1.35,0,5.7,.35]],par:58},
 {name:'The Glasshouse',theme:2,door:-2.3,gap:2,parts:[['bench',.2,-2.7,0],['plant',2.5,-3.5,0]],walls:[[1.5,.1,4.4,.45],[1.3,1.7,1.1,2.4]],par:62},
 {name:'A Grand Piano',theme:3,door:0,gap:2,parts:[['piano',-2,-2.3,1],['lamp',2.5,-2.8,0]],walls:[[0,-2.2,.35,4]],par:62},
 {name:'The Big Send-off',theme:0,door:1.9,gap:1.85,parts:[['sofa',-1.9,-3,0],['cabinet',2.4,-2.9,1],['plant',-2.7,1.45,0]],walls:[[-.75,.15,6.9,.35]],par:85},
 {name:'The Long Hall',theme:3,door:-2.65,gap:2,parts:[['bench',2.25,-3.25,1],['piano',-.9,-3.4,0]],walls:[[1.3,-.6,5.8,.35],[-1.7,1.8,.35,2.2]],par:90},
 {name:'Books & Boxes',theme:0,door:2.5,gap:1.8,parts:[['cabinet',-2.45,-3.4,0],['chair',2.5,-3.3,0],['sofa',-1.5,1.4,0]],walls:[[0,-2,.35,2.1],[-1.2,-.65,5.9,.35]],par:105},
 {name:'The Last Biscuit',theme:1,door:0,gap:1.9,parts:[['bench',-2.4,-2.6,1],['cabinet',2.3,-2.6,1],['chair',0,-3.8,0]],walls:[[0,-.65,2.9,1.9]],par:95},
 {name:'A Greener Address',theme:2,door:2.5,gap:1.85,parts:[['bench',-2.4,-3.6,1],['plant',2.5,-3.5,0],['plant',-2.6,1.65,0]],walls:[[-.9,-.65,6.5,.35],[.7,1.125,.35,1.55]],par:105},
 {name:'One Last Encore',theme:3,door:-2.35,gap:1.9,parts:[['piano',2.3,-3.3,1],['cabinet',-.5,-3.4,0],['lamp',2.7,1.8,0]],walls:[[.7,-.65,6.9,.35],[-.7,1.55,.35,2.2]],par:110},
 {name:'Home, Sweet New Home',theme:0,door:0,gap:1.85,parts:[['sofa',-2.3,-3.3,0],['cabinet',2.25,-3.2,1],['plant',0,-3.8,0]],walls:[[-2.5,-1.8,3.5,.35],[2.5,1.2,3.5,.35],[-2.6,1.4,1.2,.8]],par:115}
];
const SHAPES={sofa:[2.65,1.08],bench:[2.7,.9],chair:[1.05,1.05],plant:[1.05,1.05],piano:[2.25,1.3],lamp:[.8,.8],cabinet:[1.7,.9]};
function dims(p,q=p.q){let d=SHAPES[p.type];return q%2?[d[1],d[0]]:d;}
function overlap(x,z,w,d,b,pad=.015){return Math.abs(x-b[0])<(w+b[2])/2-pad&&Math.abs(z-b[1])<(d+b[3])/2-pad;}
class Game{
 constructor(level=0){this.level=clamp(level|0,0,JOBS.length-1);this.job=JOBS[this.level];this.parts=this.job.parts.map((a,i)=>({id:i,type:a[0],x:a[1],z:a[2],q:a[3],loaded:false,flight:0,startX:0,startZ:0,bump:0}));this.selected=0;this.phase='play';this.time=0;this.bumps=0;this.turns=0;this.loaded=0;this.events=[];this.target=null;this.bumpCooldown=0;this.celebrate=0;this.started=false;}
 emit(type,data={}){this.events.push({type,...data});if(this.events.length>60)this.events.shift();}
 get walls(){let d=this.job.door,g=this.job.gap;return [...this.job.walls,[-4.4,-.75,.4,8.7],[4.4,-.75,.4,8.7],[0,-5.3,9.2,.4],[(-4.2+d-g/2)/2,3.5,d-g/2+4.2,.4],[(d+g/2+4.2)/2,3.5,4.2-d-g/2,.4]];}
 fits(p,x,z,q=p.q){if(!Number.isFinite(x)||!Number.isFinite(z)||Math.abs(x)>5||z<-5.5||z>6.5)return false;const [w,d]=dims(p,q);if(this.walls.some(b=>b[2]>.01&&overlap(x,z,w,d,b)))return false;for(const o of this.parts){if(o===p||o.loaded)continue;const [ow,od]=dims(o);if(overlap(x,z,w,d,[o.x,o.z,ow,od]))return false;}return true;}
 select(id){if(this.phase!=='play'||!Number.isInteger(id)||!this.parts[id]||this.parts[id].loaded)return false;this.selected=id;this.target=null;this.emit('select',{id});return true;}
 point(x,z){if(this.phase!=='play'||!Number.isFinite(x)||!Number.isFinite(z)||this.parts[this.selected]?.loaded)return false;this.target={x:clamp(x,-4.7,4.7),z:clamp(z,-4.9,6)};if(z>4.3&&Math.abs(x-this.job.door)<1)this.target.x=this.job.door;this.started=true;return true;}
 release(){this.target=null;}
 rotate(){const p=this.parts[this.selected];if(this.phase!=='play'||!p||p.loaded)return false;this.started=true;this.target=null;const q=1-p.q;if(!this.fits(p,p.x,p.z,q)){this.block(p);return false;}p.q=q;this.turns++;this.emit('turn',{id:p.id});return true;}
 block(p){p.bump=.22;if(this.bumpCooldown<=0){this.bumps++;this.bumpCooldown=.65;const [w,d]=dims(p);this.emit('bump',{id:p.id,x:p.x+(this.target?Math.sign(this.target.x-p.x)*w/2:0),z:p.z+(this.target?Math.sign(this.target.z-p.z)*d/2:0)});}}
 step(dt){if(this.phase==='won')return;dt=clamp(Number.isFinite(dt)?dt:0,0,1/30);if(this.started)this.time+=dt;this.bumpCooldown=Math.max(0,this.bumpCooldown-dt);for(const p of this.parts){p.bump=Math.max(0,p.bump-dt);if(p.loaded&&p.flight<1){p.flight=Math.min(1,p.flight+dt/1.0);if(p.flight===1)this.emit('packed',{id:p.id});}}
  const p=this.parts[this.selected];if(this.target&&p&&!p.loaded){let dx=this.target.x-p.x,dz=this.target.z-p.z,d=Math.hypot(dx,dz),amount=Math.min(d,5.4*dt);if(d>.008){dx=dx/d*amount;dz=dz/d*amount;const n=Math.max(1,Math.ceil(amount/.045));let stopped=false;for(let i=0;i<n;i++){let x=p.x+dx/n,z=p.z+dz/n;if(this.fits(p,x,z)){p.x=x;p.z=z;}else{let moved=false;if(Math.abs(dx/n)>.000001&&this.fits(p,x,p.z)){p.x=x;moved=true;}if(Math.abs(dz/n)>.000001&&this.fits(p,p.x,z)){p.z=z;moved=true;}if(!moved||Math.abs(dx)+Math.abs(dz)>.01)this.block(p);if(!moved)stopped=true;}}if(stopped)this.target=null;}else this.target=null;}
  for(const a of this.parts)if(!a.loaded&&a.z>4.6&&Math.abs(a.x-this.job.door)<.7){a.loaded=true;a.startX=a.x;a.startZ=a.z;a.flight=0;this.loaded++;this.emit('load',{id:a.id,x:a.x,z:a.z});if(this.selected===a.id){this.target=null;const next=this.parts.find(p=>!p.loaded);if(next){this.selected=next.id;this.emit('select',{id:next.id});}}}
  if(this.loaded===this.parts.length&&this.parts.every(p=>p.flight===1)){this.phase='won';this.target=null;this.emit('won',{stars:this.stars(),time:this.time});}
 }
 stars(){return 1+(this.bumps<=2?1:0)+(this.time<=this.job.par?1:0);}
 snapshot(){return JSON.parse(JSON.stringify({v:1,level:this.level,parts:this.parts,selected:this.selected,phase:this.phase,time:this.time,bumps:this.bumps,turns:this.turns,loaded:this.loaded,bumpCooldown:this.bumpCooldown,started:this.started}));}
 static restore(s){try{if(s?.v!==1||!Number.isInteger(s.level)||s.level<0||s.level>=JOBS.length)return null;let g=new Game(s.level);if(s.parts?.length!==g.parts.length||!['play','won'].includes(s.phase)||!Number.isInteger(s.selected)||!g.parts[s.selected])return null;for(let i=0;i<s.parts.length;i++){const p=s.parts[i];if(p.id!==i||p.type!==g.parts[i].type||![0,1].includes(p.q)||typeof p.loaded!=='boolean'||!['x','z','flight','startX','startZ','bump'].every(k=>Number.isFinite(p[k]))||Math.abs(p.x)>5||p.z<-5.5||p.z>6.5||p.flight<0||p.flight>1||p.bump<0||p.bump>1)return null;}if(!['time','bumps','turns','loaded','bumpCooldown'].every(k=>Number.isFinite(s[k])&&s[k]>=0)||s.loaded!==s.parts.filter(p=>p.loaded).length||s.loaded>g.parts.length||s.time>1e7||s.bumpCooldown>1||typeof s.started!=='boolean')return null;if(s.phase==='won'&&(s.loaded!==g.parts.length||s.parts.some(p=>p.flight!==1)))return null;Object.assign(g,JSON.parse(JSON.stringify(s)));g.job=JOBS[g.level];g.events=[];g.target=null;return g;}catch{return null;}}
}
root.PorterCore={Game,JOBS,SHAPES,dims,overlap};if(typeof module!=='undefined')module.exports=root.PorterCore;
})(typeof window!=='undefined'?window:globalThis);






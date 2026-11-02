export const TYPES={crate:'Packing crates',sofa:'Sofa',shelf:'Bookshelf',barrel:'Cooling tank',fan:'Power unit'};
export const LEVELS=[
 {name:'A very hot house',theme:0,things:[['sofa',-2.5,-1.4,1],['crate',2.5,-1.3,.95],['barrel',0,.7,1],['shelf',-2.4,2.2,.88],['crate',2.5,2.3,.8]],people:[[-3.3,3.7],[3.2,3.7]]},
 {name:'Box office disaster',theme:0,things:[['crate',-2.8,-1.6,1],['crate',0,-1.5,.9],['sofa',2.8,-1.4,1],['shelf',-2.7,1.9,.9],['barrel',0,1.4,1.15],['shelf',2.8,2,.8]],people:[[-3.4,3.7],[3.4,3.7]]},
 {name:'Overtime overtime',theme:1,things:[['crate',-2.9,-1.6,1],['fan',0,-1.6,1],['barrel',2.9,-1.4,1],['shelf',-2.9,1.9,.95],['crate',0,1.9,1.05],['crate',2.9,2.1,.9]],people:[[-3.4,3.7],[0,3.8],[3.4,3.7]]},
 {name:'The steam team',theme:1,things:[['barrel',-2.8,-1.5,1.2],['crate',0,-1.6,.95],['barrel',2.8,-1.5,1.2],['shelf',-2.8,2.0,1],['fan',0,1.8,1.15],['shelf',2.8,2,.9]],people:[[-3.4,3.7],[0,3.8],[3.4,3.7]]},
 {name:'Do not toast the toast',theme:2,things:[['sofa',-2.8,-1.6,1.1],['barrel',0,-1.5,1.1],['shelf',2.8,-1.5,.9],['fan',-2.8,1.9,1.1],['crate',0,1.8,1.1],['shelf',2.8,2.0,1.05]],people:[[-3.5,3.8],[0,3.8],[3.5,3.8]]},
 {name:'Nothing to see here',theme:2,things:[['fan',-2.9,-1.6,1.2],['barrel',0,-1.5,1.2],['shelf',2.9,-1.5,1.1],['barrel',-2.9,1.9,1.2],['sofa',0,1.9,1.1],['fan',2.9,1.9,1.1]],people:[[-3.4,3.9],[0,3.9],[3.4,3.9]]}
];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const fresh=()=>({version:1,stars:Array(6).fill(0),scores:Array(6).fill(0),unlocked:0,nozzle:0,sound:true,motion:true,quality:1,run:null});
export const stamps=p=>p.stars.reduce((a,b)=>a+b,0);
export const canNozzle=(p,n)=>n===0||(n===1&&stamps(p)>=6)||(n===2&&stamps(p)>=12);
export function create(level=0,nozzle=0){level=clamp(level|0,0,5);return {version:1,level,nozzle:clamp(nozzle|0,0,2),phase:'ready',t:0,left:90,aim:{x:0,z:0},selected:null,held:false,burst:0,score:0,reignites:0,used:0,calm:0,stars:0,banked:false,events:[],things:LEVELS[level].things.map(([kind,x,z,heat],i)=>({id:i,kind,x,z,heat,wet:0,done:false,chain:false,ever:false,flare:0})),people:LEVELS[level].people.map(([x,z],i)=>({id:i,x,z,homeX:x,homeZ:z,state:'waiting',safe:0,path:[],progress:0}))};}
export const drain=s=>s.events.splice(0);
const emit=(s,type,data={})=>s.events.push({type,...data});
export const active=s=>s.phase==='ready'||s.phase==='play';
export function aim(s,x,z,held=true){if(!active(s)||!Number.isFinite(x)||!Number.isFinite(z))return false;s.phase='play';s.aim={x:clamp(x,-4.3,4.3),z:clamp(z,-3.1,4.4)};s.held=!!held;s.selected=null;return true;}
export function select(s,id){let t=s.things[id];if(!t||t.heat<.08||!active(s))return false;aim(s,t.x,t.z,false);s.selected=id;s.burst=1.65;return true;}
export function stop(s){s.held=false;s.burst=0;s.selected=null;}
export const spraying=s=>s.phase==='play'&&(s.held||s.burst>0);
// Small navigation grid for residents. Furniture remains solid during evacuation.
export function route(s,from,to){let size=.4,n=23,m=26,pos=(i,j)=>({x:-4.4+i*size,z:-5+j*size}),cell=p=>[clamp(Math.round((p.x+4.4)/size),0,n-1),clamp(Math.round((p.z+5)/size),0,m-1)],idx=(i,j)=>j*n+i,blocked=p=>Math.abs(p.x)>4.1||p.z>4.3||p.z<-4.8||s.things.some(t=>Math.abs(p.x-t.x)<.76&&Math.abs(p.z-t.z)<.68);let [sx,sz]=cell(from),[tx,tz]=cell(to),start=idx(sx,sz),q=[start],prev=new Map([[start,-1]]),end=start,best=1e6;
 for(let k=0;k<q.length;k++){let a=q[k],i=a%n,j=Math.floor(a/n),d=Math.abs(i-tx)+Math.abs(j-tz);if(d<best){best=d;end=a;}if(!d)break;for(let [di,dj]of [[1,0],[-1,0],[0,1],[0,-1]]){let ni=i+di,nj=j+dj,b=idx(ni,nj);if(ni<0||ni>=n||nj<0||nj>=m||prev.has(b)||blocked(pos(ni,nj)))continue;prev.set(b,a);q.push(b);}}
 let path=[];for(let at=end;at!==start&&at>=0;at=prev.get(at))path.push(pos(at%n,Math.floor(at/n)));return path.reverse();}
function walk(p,dt){let budget=3.8*dt;while(p.path.length&&budget>0){let t=p.path[0],d=Math.hypot(t.x-p.x,t.z-p.z);if(d<.001){p.path.shift();continue;}let n=Math.min(d,budget);p.x+=(t.x-p.x)/d*n;p.z+=(t.z-p.z)/d*n;budget-=n;if(n===d)p.path.shift();}}
function cool(s,t,n,wet){t.heat=Math.max(0,t.heat-n);t.wet=Math.min(12,t.wet+wet);}
export function step(s,dt){if(s.phase!=='play'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,1/30);s.t+=dt;s.left=Math.max(0,s.left-dt);if(s.left<=0){s.phase='lost';stop(s);emit(s,'lost');return;}
 let sprayingNow=spraying(s),jet=[{r:.95,p:1.04,wet:3.8},{r:1.9,p:.76,wet:3.5},{r:1.25,p:.86,wet:8}][s.nozzle];s.burst=Math.max(0,s.burst-dt);if(sprayingNow)s.used+=dt;
 let old=s.things.map(t=>t.heat),fanBoost=s.things.some(t=>t.kind==='fan'&&t.heat>.25)?1.45:1;
 for(let t of s.things){t.flare=Math.max(0,t.flare-dt);t.wet=Math.max(0,t.wet-dt);if(t.chain)continue;let spread=0;for(let other of s.things){if(other===t||old[other.id]<.4)continue;let d=Math.hypot(t.x-other.x,t.z-other.z);spread+=Math.max(0,1-d/4.5)*old[other.id]*.055*fanBoost;}t.heat=Math.min(1.4,t.heat+(t.wet>.1?-.035:spread+.008)*dt);if(sprayingNow){let d=Math.hypot(t.x-s.aim.x,t.z-s.aim.z);if(d<jet.r)cool(s,t,jet.p*dt*(1-.4*d/jet.r),jet.wet*dt);}if(t.heat<.07&&(t.wet>0||!t.done))t.heat=0;
  if(t.done&&t.heat>.26){t.done=false;s.reignites++;t.flare=1;emit(s,'reignite',{id:t.id});}
  if(!t.done&&t.heat===0){t.done=true;t.flare=1;s.score+=t.ever?25:100;t.ever=true;t.wet=Math.max(t.wet,5);emit(s,'out',{id:t.id,kind:t.kind});if(t.kind==='barrel'){t.chain=true;s.score+=150;for(let b of s.things)if(b!==t&&Math.hypot(b.x-t.x,b.z-t.z)<4){cool(s,b,.48,6);}emit(s,'steam',{id:t.id});}if(t.kind==='fan')emit(s,'power',{id:t.id});}
 }
 for(let p of s.people){if(p.state==='waiting'){let near=s.things.filter(t=>Math.hypot(t.x-p.homeX,t.z-p.homeZ)<4.8);let safe=near.every(t=>t.heat<.18);p.safe=safe?p.safe+dt:0;if(p.safe>.75){p.state='escaping';p.path=route(s,p,{x:p.id%2?3.9:-3.9,z:-4.7});emit(s,'evacuate',{id:p.id});}}else if(p.state==='escaping'){walk(p,dt);if(!p.path.length){p.state='rescued';p.progress=1;s.score+=250;emit(s,'rescue',{id:p.id});}}}
 let complete=s.things.every(t=>t.heat<.08)&&s.people.every(p=>p.state==='rescued');s.calm=complete?s.calm+dt:0;if(s.calm>.6){s.phase='won';s.stars=1+(s.t<45?1:0)+(s.reignites===0?1:0);s.score+=Math.ceil(s.left)*4;stop(s);emit(s,'won');}
}
export function bank(p,s){if(s.phase!=='won'||s.banked)return false;s.banked=true;p.stars[s.level]=Math.max(p.stars[s.level],s.stars);p.scores[s.level]=Math.max(p.scores[s.level],s.score);p.unlocked=Math.min(5,Math.max(p.unlocked,s.level+1));return true;}
export function encode(p,s){let r=s?structuredClone(s):null;if(r){stop(r);r.events=[];}return JSON.stringify({...p,run:r});}
export function decode(raw){try{let p=JSON.parse(raw);if(!p||p.version!==1||!Number.isInteger(p.unlocked)||p.unlocked<0||p.unlocked>5||!Array.isArray(p.stars)||p.stars.length!==6||p.stars.some(n=>!Number.isInteger(n)||n<0||n>3)||!Array.isArray(p.scores)||p.scores.length!==6||p.scores.some(n=>!Number.isFinite(n)||n<0))return fresh();let q={...fresh(),...p};if(!Number.isInteger(q.nozzle)||!canNozzle(q,q.nozzle))q.nozzle=0;for(let k of ['sound','motion'])if(typeof q[k]!=='boolean')q[k]=true;if(![0,1].includes(q.quality))q.quality=1;
 if(q.run){let r=q.run,l=LEVELS[r.level],valid=l&&Number.isInteger(r.level)&&r.level<=q.unlocked&&['ready','play','won','lost'].includes(r.phase)&&['t','left','score','reignites','used','calm','stars'].every(k=>Number.isFinite(r[k])&&r[k]>=0)&&r.left<=90&&r.stars<=3&&Number.isInteger(r.nozzle)&&canNozzle(q,r.nozzle)&&Array.isArray(r.things)&&r.things.length===l.things.length&&r.things.every((t,i)=>t.id===i&&t.kind===l.things[i][0]&&t.x===l.things[i][1]&&t.z===l.things[i][2]&&['heat','wet','flare'].every(k=>Number.isFinite(t[k])&&t[k]>=0)&&t.heat<=1.4&&t.wet<=12&&['done','chain','ever'].every(k=>typeof t[k]==='boolean'))&&Array.isArray(r.people)&&r.people.length===l.people.length&&r.people.every((v,i)=>v.id===i&&['waiting','escaping','rescued'].includes(v.state)&&['x','z','homeX','homeZ','safe','progress'].every(k=>Number.isFinite(v[k]))&&Math.abs(v.x)<=4.5&&Math.abs(v.z)<=5.2&&Array.isArray(v.path)&&v.path.length<700&&v.path.every(n=>Number.isFinite(n.x)&&Number.isFinite(n.z)&&Math.abs(n.x)<=4.5&&Math.abs(n.z)<=5.2))&&r.aim&&Number.isFinite(r.aim.x)&&Number.isFinite(r.aim.z);if(valid){r.events=[];stop(r);}else q.run=null;}
 return q;}catch{return fresh();}}

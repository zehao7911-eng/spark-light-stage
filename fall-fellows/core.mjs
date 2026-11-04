export const FLOOR=.30;export const PIVOT=1.14;export const CUT=.80;export const FALL=1.00;
export const CROWNS=[
 [[0,0,0,.83,1,1.07,1],[-.43,-.03,.04,.54,1,1,1],[.43,-.02,-.02,.55,1,1,1],[0,.40,0,.57,1,1,1]],
 [[0,-.58,0,.83,1,.42,1],[0,-.12,0,.69,1,.53,1],[0,.30,0,.53,1,.65,1],[0,.68,0,.31,1,.85,1]],
 [[0,.10,0,.76,1.05,1,1],[-.43,-.10,.04,.58,1,1,1],[.39,-.08,-.05,.60,1,1,1],[0,.42,0,.55,1.12,.9,1]]
];
export const MEETS=[
 {name:'A Good First Fall',place:'COPPER GROVE',set:0,tip:'Aim for the gold ring.',trees:[[0,3.8,.70,0,0],[1,4.2,-.65,0,0],[2,4.0,1.5,0,0]]},
 {name:'A Little Lean',place:'COPPER GROVE',set:0,tip:'Follow the dotted landing line.',trees:[[2,4.2,-1.1,.075,0],[0,4.5,.55,-.08,0],[1,4.4,1.9,.09,0]]},
 {name:'Across the Breeze',place:'FERNFALL YARD',set:1,tip:'A little breeze. The line knows.',trees:[[1,4.4,-1.0,.03,.10],[2,4.6,.9,-.05,.13],[0,4.1,-1.8,.08,.11],[1,4.7,1.8,-.04,.14]]},
 {name:'Tall Orders',place:'FERNFALL YARD',set:1,tip:'Taller trees travel farther.',trees:[[0,4.8,.4,.09,.12],[1,5.1,-1.0,-.07,.16],[2,4.9,1.9,.08,.13],[0,5.0,-1.9,-.04,.17]]},
 {name:'The Lantern Waltz',place:'LANTERN MILL',set:2,tip:'The ring drifts. Meet its pale echo.',trees:[[2,4.3,.5,.02,.08,.12],[0,4.5,-1.0,-.05,.10,.14],[1,4.6,1.8,.06,.08,.12],[2,4.4,-1.8,-.04,.12,.16],[0,4.8,.8,.05,.09,.14]]},
 {name:'The Last Lovely Log',place:'LANTERN MILL',set:2,tip:'One good line. One lovely landing.',trees:[[1,4.8,-.6,.07,.15,.13],[2,4.6,1.3,-.07,.17,.16],[0,5.0,-1.6,.08,.16,.12],[1,5.1,1.8,-.06,.18,.15],[2,4.9,.5,.05,.17,.18]]}
];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
const finite=(v,a=-1e7,b=1e7)=>Number.isFinite(v)&&v>=a&&v<=b;
export function tree(s){return MEETS[s.meet].trees[Math.min(s.index,MEETS[s.meet].trees.length-1)];}
export function crownPoint(spec,yaw,angle){let sa=Math.sin(angle),ca=Math.cos(angle),sx=Math.sin(yaw),cz=Math.cos(yaw),lowest=null;
 for(const [x,y,z,r,rx,ry,rz] of CROWNS[spec[0]]){let yy=y+spec[1]-.65,px=x*sx+z*cz,side=x*cz-z*sx;let e=Math.sqrt((r*rx*sx*sa)**2+(r*ry*ca)**2+(r*rz*cz*sa)**2);let h=PIVOT+yy*ca-px*sa-e;
  if(!lowest||h<lowest.y){let dx=e?(r*rx)**2*(sx*sa)/e:0,dy=e?-((r*ry)**2)*ca/e:0,dz=e?(r*rz)**2*(cz*sa)/e:0;let q=(x+dx)*sx+(z+dz)*cz,t=(x+dx)*cz-(z+dz)*sx;let forward=q*ca+(yy+dy)*sa;lowest={x:forward*sx+t*cz,y:h,z:forward*cz-t*sx};}}
 return lowest;
}
export function fallPose(spec,yaw){let lo=0,hi=Math.PI*.60;for(let i=0;i<34;i++){let m=(lo+hi)/2;if(crownPoint(spec,yaw,m).y>FLOOR)lo=m;else hi=m;}let angle=(lo+hi)/2;let touch=crownPoint(spec,yaw,angle),reach=(spec[1]-.65)*Math.sin(angle);return{angle,x:Math.sin(yaw)*reach,y:FLOOR,z:Math.cos(yaw)*reach,contactX:touch.x,contactZ:touch.z};}
export function wind(s,kit=0,time=s.time){let q=tree(s);return q[3]+q[4]*Math.sin(time*.95+s.index*1.7+s.meet*.61)*(kit===2?.55:1);}
export function target(s,time=s.time){let q=tree(s),a=q[2]+(q[5]||0)*Math.sin(time*.56+s.index*1.2);return{...fallPose(q,a),yaw:a};}
export function radius(kit=0){return kit>=1?.76:.60;}
export function forecast(s,kit=0){let yaw=wrap(s.aim+wind(s,kit)),land=fallPose(tree(s),yaw),goal=target(s,s.time+CUT+FALL);return{land,goal,yaw,distance:Math.hypot(land.x-goal.x,land.z-goal.z)};}
export function makeProfile(raw={}){let p={best:Array(6).fill(0),scores:Array(6).fill(0),unlocked:1,kit:0,coat:0,sound:true,light:false,motion:true,rewards:{like:false,comment:false}};if(!raw||typeof raw!=='object')return p;for(let i=0;i<6;i++){p.best[i]=Number.isInteger(raw.best?.[i])?clamp(raw.best[i],0,3):0;p.scores[i]=finite(raw.scores?.[i],0,1e7)?Math.floor(raw.scores[i]):0;if(p.best[i])p.unlocked=Math.min(6,i+2);}let stars=p.best.reduce((a,b)=>a+b,0);for(let k of ['kit','coat'])p[k]=[0,1,2].includes(raw[k])&&(raw[k]===0||stars>=(raw[k]===1?6:12))?raw[k]:0;for(let k of ['sound','light','motion'])if(typeof raw[k]==='boolean')p[k]=raw[k];p.rewards={like:raw.rewards?.like===true,comment:raw.rewards?.comment===true};return p;}
export function mergeProfile(a,b){let p=makeProfile(a),q=makeProfile(b);p.best=p.best.map((v,i)=>Math.max(v,q.best[i]));p.scores=p.scores.map((v,i)=>Math.max(v,q.scores[i]));p.rewards={like:p.rewards.like||q.rewards.like,comment:p.rewards.comment||q.rewards.comment};return makeProfile(p);}
export function makeRun(meet=0){meet=clamp(Math.floor(meet)||0,0,5);return{v:1,meet,index:0,phase:'ready',time:0,age:0,aim:MEETS[meet].trees[0][2]+.16,held:false,guide:false,score:0,hits:0,misses:0,streak:0,bestStreak:0,precision:0,landYaw:0,landAngle:0,landX:0,landZ:0,goalX:0,goalZ:0,hit:false,strikes:0,receipts:[],events:[]};}
export function aim(s,x,z){if(!['ready','aim'].includes(s.phase)||!finite(x,-20,20)||!finite(z,-20,20)||Math.hypot(x,z)<.25)return false;s.phase='aim';s.aim=Math.atan2(x,z);s.held=true;return true;}
export function nudge(s,amount){if(!['ready','aim'].includes(s.phase)||!finite(amount,-1,1))return false;s.phase='aim';s.held=false;s.aim=wrap(s.aim+amount);return true;}
export function guide(s,kit=0){if(!['ready','aim'].includes(s.phase))return false;s.guide=true;s.phase='aim';s.aim=wrap(target(s,s.time+CUT+FALL).yaw-wind(s,kit));s.events.push({type:'guide'});return true;}
export function cancel(s){s.held=false;return true;}
export function chop(s,kit=0){if(!['ready','aim'].includes(s.phase))return false;let f=forecast(s,kit);if(!s.receipts.length&&!s.misses)s.events.push({type:'start'});s.phase='chop';s.age=0;s.held=false;s.landYaw=f.yaw;s.landAngle=f.land.angle;s.landX=f.land.x;s.landZ=f.land.z;s.goalX=f.goal.x;s.goalZ=f.goal.z;s.hit=f.distance<=radius(kit);s.precision=clamp(1-f.distance/radius(kit),0,1);s.strikes=0;s.events.push({type:'commit'});return true;}
export function retry(s){if(s.phase!=='miss')return false;s.phase='ready';s.age=0;s.held=false;s.strikes=0;s.events.push({type:'retry'});return true;}
export function tick(s,dt,kit=0){if(!finite(dt,0,.1)||s.phase==='won')return;s.time+=dt;if(['ready','aim','miss'].includes(s.phase))return;s.age+=dt;
 if(s.phase==='chop'){for(let i=s.strikes;i<3;i++)if(s.age>=[.18,.44,.70][i]){s.strikes++;s.events.push({type:'strike',strength:i+1,yaw:s.landYaw});}if(s.age>=CUT){s.phase='fall';s.age=0;s.events.push({type:'fall'});}return;}
 if(s.phase==='fall'&&s.age>=FALL){let goal=target(s);s.goalX=goal.x;s.goalZ=goal.z;let distance=Math.hypot(s.landX-goal.x,s.landZ-goal.z);s.hit=distance<=radius(kit);s.precision=clamp(1-distance/radius(kit),0,1);s.phase=s.hit?'land':'miss';s.age=0;if(s.hit){s.hits++;s.streak++;s.bestStreak=Math.max(s.bestStreak,s.streak);let gain=250+Math.round(s.precision*200)+Math.min(5,s.streak)*30;s.score+=gain;s.receipts.push({index:s.index,precision:s.precision,gain,yaw:s.landYaw});s.events.push({type:'hit',gain,precision:s.precision,x:s.landX,z:s.landZ,streak:s.streak});}else{s.misses++;s.streak=0;s.events.push({type:'miss',x:s.landX,z:s.landZ});}s.events.push({type:'thud',x:s.landX,z:s.landZ});return;}
 if(s.phase==='land'&&s.age>=1.5){if(s.index>=MEETS[s.meet].trees.length-1){s.phase='won';s.age=0;s.events.push({type:'win'});}else{s.index++;s.phase='ready';s.age=0;s.strikes=0;s.aim=tree(s)[2]+.16;s.hit=false;s.events.push({type:'next'});}}
}
export function treeAngle(s){if(s.phase==='fall'){let q=clamp(s.age/FALL,0,1);return s.landAngle*(.08*q+.92*q*q);}return ['land','miss','won'].includes(s.phase)?s.landAngle:0;}
export function swing(s){if(s.phase==='fall')return .48*clamp(s.age/.22,0,1);if(s.phase!=='chop')return .48;let a=s.age,hit=[.18,.44,.70].find(t=>a<=t+.065)??.70,d=a-hit;return d<0?1.12*Math.pow(clamp(-d/.16,0,1),.7):-.12*Math.sin(clamp(d/.065,0,1)*Math.PI);}
export function result(s){let average=s.receipts.length?s.receipts.reduce((n,r)=>n+r.precision,0)/s.receipts.length:0;return{score:s.score,hits:s.hits,total:MEETS[s.meet].trees.length,misses:s.misses,average,stars:s.phase==='won'?1+(!s.guide&&s.misses<=1?1:0)+(!s.guide&&s.misses===0&&average>=.75?1:0):0};}
export function award(p,s){if(s.phase!=='won')return false;let r=result(s);p.best[s.meet]=Math.max(p.best[s.meet],r.stars);p.scores[s.meet]=Math.max(p.scores[s.meet],r.score);p.unlocked=Math.max(p.unlocked,Math.min(6,s.meet+2));return true;}
export function restore(raw){if(!raw||raw.v!==1||!Number.isInteger(raw.meet)||raw.meet<0||raw.meet>5)return null;let s=makeRun(raw.meet);if(!Number.isInteger(raw.index)||raw.index<0||raw.index>=MEETS[raw.meet].trees.length||!['ready','aim','chop','fall','land','miss','won'].includes(raw.phase)||!Array.isArray(raw.receipts))return null;
 for(let k of ['time','age','score','hits','misses','streak','bestStreak','precision','strikes'])if(!finite(raw[k],0,k==='precision'?1:1e7))return null;for(let k of ['index','score','hits','misses','streak','bestStreak','strikes'])if(!Number.isInteger(raw[k]))return null;if(raw.strikes>3||typeof raw.guide!=='boolean'||typeof raw.hit!=='boolean')return null;
 for(let k of ['aim','landYaw'])if(!finite(raw[k],-Math.PI-.001,Math.PI+.001))return null;if(!finite(raw.landAngle,0,Math.PI*.60+.001))return null;for(let k of ['landX','landZ','goalX','goalZ'])if(!finite(raw[k],-10,10))return null;
 if(raw.hits!==raw.receipts.length||raw.hits>MEETS[raw.meet].trees.length||raw.streak>raw.hits||raw.bestStreak>raw.hits||raw.phase==='won'&&raw.hits!==MEETS[raw.meet].trees.length)return null;
 let expected=raw.index+(['land','won'].includes(raw.phase)?1:0);if(raw.hits!==expected||raw.time<raw.age||raw.phase==='won'&&raw.index!==MEETS[raw.meet].trees.length-1)return null;let seen=new Set(),score=0;for(let r of raw.receipts){if(!r||!Number.isInteger(r.index)||r.index<0||r.index>raw.index||seen.has(r.index)||!finite(r.precision,0,1)||!Number.isInteger(r.gain)||!finite(r.gain,0,800)||!finite(r.yaw,-Math.PI,Math.PI))return null;seen.add(r.index);score+=r.gain;}if(score!==raw.score)return null;
 for(let k of ['index','phase','time','age','aim','guide','score','hits','misses','streak','bestStreak','precision','landYaw','landAngle','landX','landZ','goalX','goalZ','hit','strikes'])s[k]=raw[k];s.receipts=raw.receipts.map(r=>({...r}));s.events=[];s.held=false;return s;
}

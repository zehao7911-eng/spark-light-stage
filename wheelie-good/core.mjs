export const ROUTES=[
 {name:'A Very Normal Postman',set:0,length:26,drops:[3.2,14.5,25],stamps:[2,10,20],speed:1.75,wind:.18,terrain:'flat',tag:'FIRST POST'},
 {name:'Uphill Both Ways',set:0,length:33,drops:[5,18,32],stamps:[2.5,12,25],speed:1.85,wind:.38,terrain:'hills',tag:'HILL STREET'},
 {name:'Breeze? What Breeze?',set:1,length:35,drops:[5,19,34],stamps:[2.5,12,27],speed:1.9,wind:1.15,terrain:'flat',tag:'SEA BREEZE'},
 {name:'The Wobbly Boardwalk',set:1,length:37,drops:[5,20,36],stamps:[2.5,12,29],speed:1.9,wind:.72,terrain:'boards',tag:'MIND THE JOINTS'},
 {name:'Absolutely Fine',set:2,length:39,drops:[5,21,38],stamps:[2.5,13,30],speed:1.95,wind:.68,terrain:'seesaw',tag:'THE TILTING DECK'},
 {name:'Certified One-Wheel',set:2,length:43,drops:[5,23,42],stamps:[2.5,14,33],speed:2,wind:1.05,terrain:'final',tag:'THE LAST MILE'}
];
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export const clone=x=>JSON.parse(JSON.stringify(x));
export function profile(p){if(!p||typeof p!=='object')p={};return {v:1,stars:Array.from({length:6},(_,i)=>clamp(Math.floor(+p.stars?.[i]||0),0,3)),best:Array.from({length:6},(_,i)=>clamp(+p.best?.[i]||0,0,99999)),clears:Array.from({length:6},(_,i)=>p.clears?.[i]===true),rewards:{like:p.rewards?.like===true,comment:p.rewards?.comment===true},sound:p.sound!==false,gentle:p.gentle===true,light:p.light===true,assist:p.assist===true,gear:clamp(Math.floor(+p.gear||0),0,2),coat:clamp(Math.floor(+p.coat||0),0,2)};}
export const total=p=>p.stars.reduce((a,b)=>a+b,0);
export function mergeProfile(a,b){a=profile(a);b=profile(b);a.stars=a.stars.map((n,i)=>Math.max(n,b.stars[i]));a.best=a.best.map((n,i)=>Math.max(n,b.best[i]));a.clears=a.clears.map((n,i)=>n||b.clears[i]);for(const k of ['like','comment'])a.rewards[k] ||=b.rewards[k];return a;}
export function unlocked(p){let n=p.clears.findIndex(x=>!x);return n<0?5:Math.min(5,n);}
export function ground(route,x,t=0){const kind=ROUTES[route].terrain;let y=['seesaw','final'].includes(kind)?.45:0;if(kind==='hills'||kind==='final')y+=x<7?0:Math.sin(clamp((x-7)/18,0,1)*Math.PI)*.72;if(kind==='boards'||kind==='final'){for(const c of [9,11.5,14,26,28.5,31]){const d=(x-c)/.65;if(Math.abs(d)<1)y+=.12*(1+Math.cos(d*Math.PI));}}if(kind==='seesaw'||kind==='final'){for(const c of [11.5,29.5])if(Math.abs(x-c)<2.5)y+=(x-c)*Math.sin(t*1.1)*.075*Math.sin(Math.PI*(x-c+2.5)/5);}return y;}
export function slope(route,x,t){return (ground(route,x+.06,t)-ground(route,x-.06,t))/.12;}
export function windAt(s){const r=ROUTES[s.route],phase=s.t*1.22+s.x*.18;return r.wind*(Math.sin(phase)*.65+Math.sin(phase*.47+1.1)*.35)*(s.x<6?.4:1);}
export function makeRun(route=0,lap=0){route=clamp(Math.floor(+route||0),0,5);return {v:1,route,lap:clamp(Math.floor(+lap||0),0,99),mode:'ready',t:0,x:0,theta:.065,omega:0,u:0,speed:0,delivered:0,stamps:[false,false,false],score:0,bails:0,closeCalls:0,savedThisLeg:false,scare:false,danger:0,steady:0,phase:0,events:[],checkpoint:{x:0,score:0,stamps:[false,false,false],delivered:0}};}
export function start(s){if(s.mode!=='ready')return false;s.mode='riding';return true;}
export function input(s,u){s.u=Number.isFinite(u)?clamp(u,-1,1):0;}
export function tick(s,dt,options={}){s.events=[];if(!Number.isFinite(dt)||dt<=0||s.mode==='ready'||s.mode==='result')return;dt=Math.min(.05,dt);s.t+=dt;s.phase+=dt;const r=ROUTES[s.route],gear=options.gear||0;
 if(s.mode==='bail')return;
 if(s.mode==='delivery'){s.theta*=Math.exp(-dt*5);s.omega*=Math.exp(-dt*7);s.speed*=Math.exp(-dt*5);if(s.phase>=1.15){s.delivered++;s.score+=200;s.events.push({type:'delivered',index:s.delivered-1,x:s.x});if(s.delivered===3){s.mode='result';s.phase=0;s.events.push({type:'finish'});}else{s.x+=.24;s.mode='riding';s.phase=0;s.steady=0;s.savedThisLeg=false;s.scare=false;s.checkpoint={x:s.x,score:s.score,stamps:clone(s.stamps),delivered:s.delivered};}}return;}
 const wind=windAt(s)*(gear===1?.58:1),hill=slope(s.route,s.x,s.t),prev=s.theta;
 // A damped inverted pendulum. The thumb is counter-steering torque, not a hidden solver.
 const aa=6.5*Math.sin(s.theta)-(4.5+(gear===2?1.4:0)+(options.assist?2.6:0))*s.theta-3.6*s.omega+7.2*s.u+wind+hill*1.5;
 s.omega=clamp(s.omega+aa*dt,-2.8,2.8);s.theta+=s.omega*dt;
 if(Math.abs(s.theta)>.62&&!s.scare){s.scare=true;s.events.push({type:'wobble'});}if(s.scare&&Math.abs(s.theta)<.22&&Math.abs(s.omega)<.5&&!s.savedThisLeg){s.savedThisLeg=true;s.closeCalls++;s.score+=75;s.events.push({type:'saved'});}
 s.danger=Math.abs(s.theta)>.98?s.danger+dt:Math.max(0,s.danger-dt*2);if(s.danger>.18){s.mode='bail';s.phase=0;s.bails++;s.u=0;s.events.push({type:'bail'});return;}
 const dest=r.drops[s.delivered],slow=Math.abs(s.theta)>.65?.55:1,want=r.speed*(1+Math.min(s.lap,3)*.04)*slow; s.speed+=(want-s.speed)*(1-Math.exp(-dt*3));const old=s.x;s.x=Math.min(dest,s.x+s.speed*dt);
 for(let i=0;i<3;i++)if(!s.stamps[i]&&old<=r.stamps[i]+.35&&s.x>=r.stamps[i]-.35&&Math.abs(s.theta)<.23){s.stamps[i]=true;s.score+=50;s.events.push({type:'stamp',index:i,x:r.stamps[i]});}
 if(s.x>=dest-.001){s.speed=0;s.steady=(Math.abs(s.theta)<.30&&Math.abs(s.omega)<.45)?s.steady+dt:0;if(s.steady>=.55){if(s.scare&&!s.savedThisLeg){s.savedThisLeg=true;s.closeCalls++;s.score+=75;s.events.push({type:'saved'});}s.mode='delivery';s.phase=0;s.u=0;s.events.push({type:'post',index:s.delivered,x:s.x});}}
}
export function retry(s){if(s.mode!=='bail')return false;const c=s.checkpoint;s.x=c.x;s.score=c.score;s.stamps=clone(c.stamps);s.delivered=c.delivered;s.theta=.045;s.omega=0;s.speed=0;s.u=0;s.phase=0;s.danger=0;s.steady=0;s.scare=false;s.savedThisLeg=false;s.mode='riding';s.events=[];return true;}
export function result(s){const n=s.stamps.filter(Boolean).length;return {won:s.mode==='result',stars:s.mode==='result'?1+(n===3?1:0)+(s.bails===0?1:0):0,stamps:n,score:s.score,bails:s.bails,delivered:s.delivered};}
export function record(p,s){if(s.mode!=='result')return false;const before=JSON.stringify(p),r=result(s);p.stars[s.route]=Math.max(p.stars[s.route],r.stars);p.best[s.route]=Math.max(p.best[s.route],s.score);p.clears[s.route]=true;return JSON.stringify(p)!==before;}
export function restore(v){if(!v||v.v!==1||!Number.isInteger(v.route)||v.route<0||v.route>5||!['ready','riding','delivery','bail','result'].includes(v.mode))return null;for(const k of ['t','x','theta','omega','score','bails','phase','delivered','speed','danger','steady'])if(!Number.isFinite(v[k]))return null;if(v.t<0||v.x<0||v.score<0||v.bails<0||v.phase<0||v.speed<0||v.danger<0||v.steady<0||v.x>ROUTES[v.route].length+1||Math.abs(v.theta)>2||Math.abs(v.omega)>5||!Number.isInteger(v.delivered)||v.delivered<0||v.delivered>3||v.mode==='result'&&v.delivered!==3||v.mode!=='result'&&v.delivered===3)return null;if(!v.checkpoint||!Number.isFinite(v.checkpoint.x)||v.checkpoint.x<0||v.checkpoint.x>v.x||!Number.isFinite(v.checkpoint.score)||v.checkpoint.score<0||v.checkpoint.score>v.score||!Number.isInteger(v.checkpoint.delivered)||v.checkpoint.delivered<0||v.checkpoint.delivered>v.delivered)return null;const s={...makeRun(v.route,v.lap),...clone(v)};s.u=0;s.events=[];s.stamps=Array.from({length:3},(_,i)=>v.stamps?.[i]===true);s.checkpoint.stamps=Array.from({length:3},(_,i)=>v.checkpoint.stamps?.[i]===true);return s;}

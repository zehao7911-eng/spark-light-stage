export const ROUTES=[
 {name:'Coffee First',theme:0,lanes:[4,8,12],types:['car','bike','car'],speed:.85,par:22},
 {name:'Market Mood',theme:0,lanes:[4,7,11,15],types:['bike','van','car','bike'],speed:1,par:28},
 {name:'Rain Check',theme:1,lanes:[4,8,12,16],types:['car','car','tram','van'],speed:1.05,par:32},
 {name:'Last Record Store',theme:1,lanes:[4,7,11,15,19],types:['van','bike','tram','car','bike'],speed:1.08,par:37},
 {name:'Golden Hour',theme:2,lanes:[4,8,12,16,20],types:['bike','tram','van','car','tram'],speed:1.1,par:40},
 {name:'Meet Me at Sunset',theme:2,lanes:[4,7,11,14,18,22],types:['car','bike','tram','van','bike','tram'],speed:1.12,par:45}
];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const clone=x=>JSON.parse(JSON.stringify(x));
export function profile(v={}){return{v:1,stars:ROUTES.map((_,i)=>clamp(Math.floor(+v?.stars?.[i]||0),0,3)),best:ROUTES.map((_,i)=>Math.max(0,Math.floor(Number.isFinite(+v?.best?.[i])?+v.best[i]:0))),clears:ROUTES.map((_,i)=>v?.clears?.[i]===true),coat:clamp(Math.floor(+v.coat||0),0,2),sound:v.sound!==false,gentle:v.gentle===true,light:v.light===true,easy:v.easy!==false,rewards:{like:v?.rewards?.like===true,comment:v?.rewards?.comment===true}};}
export const total=p=>p.stars.reduce((a,b)=>a+b,0);
export function unlocked(p){let n=p.clears.indexOf(false);return n<0?5:n;}
export function mergeProfile(a,b){a=profile(a);b=profile(b);for(let i=0;i<6;i++){a.stars[i]=Math.max(a.stars[i],b.stars[i]);a.best[i]=Math.max(a.best[i],b.best[i]);a.clears[i]||=b.clears[i];}a.rewards.like||=b.rewards.like;a.rewards.comment||=b.rewards.comment;return a;}
export const end=c=>ROUTES[c].lanes.at(-1)+4;
export function makeRun(route=0){return{v:1,route,mode:'ready',z:0,t:0,walk:0,held:false,safe:0,hits:0,near:0,score:0,coins:[false,false,false],passed:ROUTES[route].lanes.map(()=>false),nearred:ROUTES[route].lanes.map(()=>false),recovery:0,phase:0,impact:0,events:[]};}
export function restore(v){if(!v||v.v!==1||!Number.isInteger(v.route)||!ROUTES[v.route]||!['ready','playing','finish','result'].includes(v.mode)||!['z','t','walk','safe','hits','near','score','recovery','phase'].every(k=>Number.isFinite(v[k])&&v[k]>=0)||v.z>end(v.route)+.1||v.safe>v.z+.1||!['hits','near','score'].every(k=>Number.isInteger(v[k]))||!Array.isArray(v.coins)||v.coins.length!==3||v.coins.some(x=>typeof x!=='boolean')||!['passed','nearred'].every(k=>Array.isArray(v[k])&&v[k].length===ROUTES[v.route].lanes.length&&v[k].every(x=>typeof x==='boolean'))||(['finish','result'].includes(v.mode)&&v.z<end(v.route)))return null;let s=clone(v);s.held=false;s.events=[];s.impact=0;return s;}
export function press(s){if(!['ready','playing'].includes(s.mode)||s.recovery>0)return false;if(s.mode==='ready')s.mode='playing';s.held=true;return true;}
export function release(s){s.held=false;}
export function traffic(route,t,p={}){let c=ROUTES[route];return c.lanes.flatMap((z,i)=>{let type=c.types[i],dir=i%2?-1:1,speed=(type==='tram'?5:type==='bike'?2.7:3.2)*c.speed*(p.easy?.78:1),gap=type==='tram'?19:type==='van'?14:12,half=type==='tram'?2.7:type==='van'?1.45:type==='bike'?.63:1.05;return [-1,0,1].map(j=>({id:i+'-'+j,lane:i,z,type,dir,speed,x:(((t*speed*dir+i*3.7+j*gap+gap*1.5)%(gap*3)+gap*3)%(gap*3))-gap*1.5,half}));});}
export function danger(s,p={},ahead=0){let z=s.z+ahead;return traffic(s.route,s.t,p).some(v=>Math.abs(z-v.z)<.9&&Math.abs(v.x)<v.half+.42);}
export function gapAhead(s,p={}){let next=ROUTES[s.route].lanes.find(z=>z>s.z-.74);if(next===undefined)return true;let duration=(next+.85-s.z)/2.7;for(let t=0;t<=duration+.08;t+=.06){let z=Math.min(next+.85,s.z+t*2.7);if(traffic(s.route,s.t+t,p).some(v=>Math.abs(z-v.z)<.80&&Math.abs(v.x)<v.half+.40))return false;}return true;}
export const coinPlaces=route=>[2,Math.floor(end(route)*.48),end(route)-1.5];
export function tick(s,dt,p={}){s.events=[];if(s.mode==='result')return;dt=clamp(dt,0,.04);s.t+=dt;if(s.mode==='ready')return;s.impact=Math.max(0,s.impact-dt*2.5);if(s.mode==='finish'){s.phase+=dt;if(s.phase>=1.1){s.mode='result';s.events.push({type:'finish'});}return;}
 if(s.recovery>0){s.recovery=Math.max(0,s.recovery-dt);if(!s.recovery){s.z=s.safe;s.events.push({type:'back'});}return;}
 let old=s.z;if(s.held){s.z=Math.min(end(s.route),s.z+2.7*dt);s.walk+=dt*9;}
 const c=ROUTES[s.route],vs=traffic(s.route,s.t,p);
 for(let v of vs){if(Math.abs(s.z-v.z)<.73&&Math.abs(v.x)<v.half+.25){s.hits++;s.recovery=.85;s.held=false;s.impact=1;s.events.push({type:'bump',kind:v.type});return;}}
 c.lanes.forEach((z,i)=>{if(s.z>z+.82&&!s.passed[i]){s.passed[i]=true;s.safe=Math.min(s.z,z+1.15);s.score+=100;s.events.push({type:'cross',i});let nearest=Math.min(...vs.filter(v=>v.lane===i).map(v=>Math.abs(v.x)-v.half));if(nearest<1.5&&!s.nearred[i]){s.nearred[i]=true;s.near++;s.score+=50;s.events.push({type:'near'});}}});
 for(let [i,z]of coinPlaces(s.route).entries())if(!s.coins[i]&&old<=z&&s.z>=z){s.coins[i]=true;s.score+=150;s.events.push({type:'coin',i});}
 if(s.z>=end(s.route)){s.mode='finish';s.phase=0;s.held=false;s.events.push({type:'home'});}
}
export function result(s){return{stars:1+(s.coins.every(Boolean)?1:0)+(s.hits===0?1:0),score:s.score,coins:s.coins.filter(Boolean).length,hits:s.hits,time:s.t,near:s.near};}
export function record(p,s){if(s.mode!=='result')return false;let r=result(s);p.stars[s.route]=Math.max(p.stars[s.route],r.stars);p.best[s.route]=Math.max(p.best[s.route],r.score);p.clears[s.route]=true;return true;}

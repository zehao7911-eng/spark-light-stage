export const SIZES=[.35,.8,1.45];
export const NAMES=['SMALL','MEDIUM','LARGE'];
const gate=(kind,prop,need,extra=[])=>({kind,prop,need,extra});
export const LEVELS=[
 {name:'A Small Favour',theme:0,props:['Boulder','Mushroom'],initial:[2,0],gates:[gate('clear',0,0),gate('bridge',1,2)],par:2},
 {name:'A Change of Tide',theme:1,props:['Cloud','Mushroom','Boulder'],initial:[2,0,2],gates:[gate('stones',0,0),gate('bridge',1,2),gate('raft',0,2),gate('clear',2,0)],par:4},
 {name:'Up, Up. Down.',theme:2,props:['Balloon','Boulder','Mushroom'],initial:[0,2,0],gates:[gate('lift',0,2),gate('clear',1,0),gate('lower',0,0),gate('bridge',2,1)],par:4},
 {name:'Warm Hands, Cool Head',theme:2,props:['Sun','Cloud','Mushroom'],initial:[0,2,0],gates:[gate('ice',0,2),gate('stones',1,0),gate('bridge',2,2),gate('shade',0,0)],par:4},
 {name:'Just the Right Size',theme:0,props:['Mushroom','Boulder','Cloud'],initial:[2,2,0],gates:[gate('arch',0,1),gate('clear',1,0),gate('bridge',0,2),gate('raft',2,2)],par:4},
 {name:'The Bigger Picture',theme:1,props:['Cloud','Boulder','Balloon','Sun','Mushroom'],initial:[2,2,0,0,0],gates:[gate('stones',0,0),gate('clear',1,0),gate('lift',2,2),gate('ice',3,2),gate('bridge',4,2,[[0,0]]),gate('raft',0,2)],par:6}
];
export const copy=o=>JSON.parse(JSON.stringify(o));
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function profile(x={}){return{v:1,stars:LEVELS.map((_,i)=>clamp(Math.floor(+x?.stars?.[i]||0),0,3)),clears:LEVELS.map((_,i)=>x?.clears?.[i]===true),best:LEVELS.map((_,i)=>Math.max(0,Math.floor(+x?.best?.[i]||0))),rewards:{like:x?.rewards?.like===true,comment:x?.rewards?.comment===true},sound:x?.sound!==false,gentle:x?.gentle===true,light:x?.light===true,coat:clamp(Math.floor(+x?.coat||0),0,2)}}
export const total=p=>p.stars.reduce((a,b)=>a+b,0);
export function unlocked(p){let x=p.clears.indexOf(false);return x<0?5:x;}
export function mergeProfile(a,b){a=profile(a);b=profile(b);for(let i=0;i<6;i++){a.stars[i]=Math.max(a.stars[i],b.stars[i]);a.clears[i]||=b.clears[i];if(b.best[i]&&(!a.best[i]||b.best[i]<a.best[i]))a.best[i]=b.best[i];}a.rewards.like||=b.rewards.like;a.rewards.comment||=b.rewards.comment;return a;}
export function makeRun(level=0){level=clamp(Math.floor(level),0,5);return{v:1,level,sizes:[...LEVELS[level].initial],selected:0,node:0,phase:0,mode:'ready',moves:0,hints:0,t:0,settle:0,events:[]};}
export function restore(x){if(!x||x.v!==1||!Number.isInteger(x.level)||!LEVELS[x.level]||!Array.isArray(x.sizes)||x.sizes.length!==LEVELS[x.level].props.length||x.sizes.some(n=>!Number.isInteger(n)||n<0||n>2)||!Number.isInteger(x.node)||x.node<0||x.node>LEVELS[x.level].gates.length||!['ready','waiting','walking','finish','result'].includes(x.mode)||![x.phase,x.t,x.settle,x.moves,x.hints].every(n=>Number.isFinite(n)&&n>=0))return null;let s=copy(x);s.selected=clamp(Math.floor(s.selected||0),0,s.sizes.length-1);s.events=[];s.phase=clamp(s.phase,0,1.2);if((s.mode==='walking'||s.mode==='waiting')&&s.node>=LEVELS[s.level].gates.length)return null;return s;}
export function open(s,index=s.node){const g=LEVELS[s.level].gates[index];return !!g&&s.sizes[g.prop]===g.need&&g.extra.every(([p,n])=>s.sizes[p]===n);}
export function start(s){if(s.mode==='ready'){s.mode='waiting';s.events=[{type:'start'}];}}
export function select(s,i){if(i>=0&&i<s.sizes.length)s.selected=i;}
export function resize(s,n){if(!Number.isInteger(n)||n<0||n>2||!['ready','waiting'].includes(s.mode))return false;const i=s.selected;if(s.sizes[i]===n)return false;start(s);s.sizes[i]=n;s.moves++;s.settle=.36;s.events=[{type:'resize',prop:i,size:n}];return true;}
export function hint(s){if(!['ready','waiting'].includes(s.mode))return null;const g=LEVELS[s.level].gates[s.node];if(!g)return null;s.hints++;const missing=g.extra.find(([p,n])=>s.sizes[p]!==n);return missing?{prop:missing[0],size:missing[1]}:{prop:g.prop,size:g.need};}
export function tick(s,dt){dt=clamp(dt,0,.1);s.events=[];if(s.mode==='result'||s.mode==='ready')return;s.t+=dt;s.settle=Math.max(0,s.settle-dt);if(s.mode==='waiting'&&!s.settle&&open(s)){s.mode='walking';s.phase=0;s.events.push({type:'path'});}else if(s.mode==='walking'){s.phase+=dt/1.05;if(s.phase>=1){s.node++;s.phase=0;s.events.push({type:'arrive',node:s.node});if(s.node===LEVELS[s.level].gates.length){s.mode='finish';s.events.push({type:'home'});}else{s.mode='waiting';s.selected=LEVELS[s.level].gates[s.node].prop;}}}else if(s.mode==='finish'){s.phase+=dt;if(s.phase>=1.2){s.mode='result';s.events.push({type:'finish'});}}}
export function result(s){return{stars:1+(s.moves<=LEVELS[s.level].par?1:0)+(s.hints===0?1:0),moves:s.moves,hints:s.hints};}
export function record(p,s){if(s.mode!=='result')return false;const r=result(s);p.stars[s.level]=Math.max(p.stars[s.level],r.stars);p.clears[s.level]=true;if(!p.best[s.level]||s.moves<p.best[s.level])p.best[s.level]=s.moves;return true;}
export function reason(s){const g=LEVELS[s.level].gates[s.node];if(!g)return'HOME, SWEET TINY HOME.';return({clear:'Make room to pass.',bridge:'Grow a way across.',stones:'Lower the water to find the stones.',raft:'Raise the water. Float across.',lift:'Lift up to the high ledge.',lower:'Bring the lift down.',ice:'A little sunshine will melt the ice.',shade:'Cool the garden to open its flowers.',arch:'Not too small. Not too big.'})[g.kind];}

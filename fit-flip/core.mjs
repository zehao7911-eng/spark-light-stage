export const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
export const NAMES=['Mina','Remy','Jules'];
export const ROLES=[{name:'Chef',color:'#eee8d5',accent:'#dc644f'},{name:'Magician',color:'#7655a2',accent:'#e8bf59'},{name:'Sailor',color:'#386e99',accent:'#f4e9d5'},{name:'Aviator',color:'#b16e45',accent:'#83c8bf'},{name:'Detective',color:'#c6a16e',accent:'#3e5063'}];
// Each column is a permutation: hats, jackets, shoes. Goals are complete looks.
export const CALLS=[
 {name:'First fitting',goals:[0,1],perms:[[1,0],[0,1],[0,1]],set:0},
 {name:'Fancy footwork',goals:[2,3],perms:[[1,0],[0,1],[1,0]],set:0},
 {name:'Crew call',goals:[0,4,2],perms:[[1,2,0],[1,0,2],[0,1,2]],set:0},
 {name:'Mixed matinee',goals:[1,3,0],perms:[[2,0,1],[1,0,2],[0,2,1]],set:1},
 {name:'Quick change',goals:[4,2,1],perms:[[1,0,2],[2,0,1],[0,2,1]],set:1},
 {name:'Night flight',goals:[3,1,2],perms:[[1,2,0],[2,0,1],[1,0,2]],set:1},
 {name:'Mystery guests',goals:[4,0,3],perms:[[2,0,1],[1,0,2],[1,2,0]],set:2},
 {name:'Opening night',goals:[1,4,2],perms:[[2,0,1],[1,2,0],[2,0,1]],set:2}
];
const int=(v,a=0,b=1e8)=>Number.isInteger(v)&&v>=a&&v<=b;
export function fresh(){return {v:1,best:Array(8).fill(0),records:Array(8).fill(null),looks:Array(5).fill(false),serial:0,claimed:0,room:0,rewards:{like:false,comment:false},settings:{sound:true,light:false,gentle:false}};}
export const stars=p=>p.best.reduce((s,n)=>s+n,0);
export function clean(raw){let p=fresh();if(!raw||typeof raw!=='object')return p;for(let k of ['serial','claimed'])if(int(raw[k]))p[k]=raw[k];p.claimed=Math.min(p.claimed,p.serial);for(let i=0;i<8;i++){if(int(raw.best?.[i],0,3))p.best[i]=raw.best[i];let r=raw.records?.[i];if(r&&int(r.moves,0,10000)&&int(r.par,0,10))p.records[i]={moves:r.moves,par:r.par};}for(let i=0;i<5;i++)p.looks[i]=raw.looks?.[i]===true;for(let k of Object.keys(p.settings))if(typeof raw.settings?.[k]==='boolean')p.settings[k]=raw.settings[k];for(let k of ['like','comment'])p.rewards[k]=raw.rewards?.[k]===true;if(int(raw.room,0,2)&&stars(p)>=raw.room*9)p.room=raw.room;return p;}
export function merge(a,b){a=clean(a);b=clean(b);a.best=a.best.map((v,i)=>Math.max(v,b.best[i]));a.looks=a.looks.map((v,i)=>v||b.looks[i]);a.serial=Math.max(a.serial,b.serial);a.claimed=Math.max(a.claimed,b.claimed);for(let k of ['like','comment'])a.rewards[k]||=b.rewards[k];for(let i=0;i<8;i++)if(b.records[i]&&(!a.records[i]||b.records[i].moves<a.records[i].moves))a.records[i]=b.records[i];return a;}
export function unlocked(p){let n=p.best.findIndex(n=>n===0);return n<0?7:n;}
function copy(a){return a.map(row=>[...row]);}
export function solved(r){return r.items.every((row,i)=>row.every(x=>x===r.goals[i]));}
export function matched(r){return r.items.map((row,i)=>row.every(x=>x===r.goals[i]));}
export function remaining(r){let n=r.goals.length,total=0;for(let slot=0;slot<3;slot++){let seen=new Set();for(let a=0;a<n;a++){if(seen.has(a))continue;let length=0,i=a;while(!seen.has(i)){seen.add(i);length++;i=r.goals.indexOf(r.items[i][slot]);if(i<0)return Infinity;}total+=Math.max(0,length-1);}}return total;}
export function create(level=0,p=fresh(),remix=0){level=int(level,0,7)?level:0;let c=CALLS[level],goals=[...c.goals],items=goals.map((_,i)=>[0,1,2].map(s=>goals[c.perms[s][i]]));if(remix){goals=goals.map(x=>(x+remix)%5);items=items.map(row=>row.map(x=>(x+remix)%5));}
 let r={v:1,id:++p.serial,level,remix:clamp(Math.floor(remix),0,4),goals,items,phase:'ready',slot:0,selected:-1,moves:0,par:0,t:0,motion:null,history:[],hint:null,hints:0,receipt:null};r.par=remaining(r);return r;}
export function hint(r){if(r.motion||r.phase==='win')return null;let n=r.goals.length;for(let slot=0;slot<3;slot++)for(let a=0;a<n;a++)if(r.items[a][slot]!==r.goals[a]){let b=r.items.findIndex(row=>row[slot]===r.goals[a]);return {a,b,slot};}return null;}
export function setSlot(r,slot){if(!int(slot,0,2)||r.motion||r.phase==='win')return false;r.slot=slot;r.selected=-1;r.hint=null;return true;}
export function select(r,a){if(!int(a,0,r.goals.length-1)||r.motion||r.phase==='win')return {type:'none'};if(r.selected===a){r.selected=-1;return {type:'cancel'};}if(r.selected<0){r.selected=a;r.hint=null;return {type:'select',a,slot:r.slot};}return swap(r,r.selected,a,r.slot);}
export function swap(r,a,b,slot){if(r.motion||r.phase==='win'||!int(a,0,r.goals.length-1)||!int(b,0,r.goals.length-1)||a===b||!int(slot,0,2)||r.items[a][slot]===r.items[b][slot])return {type:'none'};
 r.history.push({items:copy(r.items),moves:r.moves});if(r.history.length>40)r.history.shift();r.moves++;r.selected=-1;r.hint=null;r.slot=slot;r.phase='play';r.motion={a,b,slot,oldA:r.items[a][slot],oldB:r.items[b][slot],t:0,dur:1.02};return {type:'swap',a,b,slot};}
export function showHint(r){let h=hint(r);if(!h)return null;r.hint=h;r.slot=h.slot;r.selected=h.a;r.hints++;return h;}
export function undo(r){if(r.phase==='win'||!r.history.length)return false;let old=r.history.pop();r.items=copy(old.items);r.moves=old.moves;r.motion=null;r.selected=-1;r.hint=null;r.phase='play';return true;}
export function cancel(r){r.selected=-1;}
export function advance(r,dt){let events=[];if(r.phase!=='play'||!Number.isFinite(dt)||dt<=0)return events;dt=Math.min(.05,dt);r.t+=dt;if(!r.motion)return events;r.motion.t+=dt;if(r.motion.t+1e-7<r.motion.dur)return events;let m=r.motion,was=matched(r);[r.items[m.a][m.slot],r.items[m.b][m.slot]]=[m.oldB,m.oldA];r.motion=null;let now=matched(r);events.push({type:'land',...m,newly:now.flatMap((v,i)=>v&&!was[i]?[i]:[]),matches:now.filter(Boolean).length});
 if(solved(r)){r.phase='win';r.receipt={id:r.id,level:r.level,moves:r.moves,par:r.par,stars:r.moves<=r.par?3:r.moves<=r.par+2?2:1,looks:[...r.goals],remix:r.remix};events.push({type:'win',...r.receipt});}return events;}
export function settle(p,r){if(r.phase!=='win'||!r.receipt||r.id<=p.claimed)return false;p.claimed=r.id;p.best[r.level]=Math.max(p.best[r.level],r.receipt.stars);for(let look of r.goals)p.looks[look]=true;if(!p.records[r.level]||r.moves<p.records[r.level].moves)p.records[r.level]={moves:r.moves,par:r.par};return true;}
function validItems(items,goals){if(!Array.isArray(items)||items.length!==goals.length)return false;for(let row of items)if(!Array.isArray(row)||row.length!==3||row.some(x=>!goals.includes(x)))return false;for(let slot=0;slot<3;slot++)if(new Set(items.map(row=>row[slot])).size!==goals.length)return false;return true;}
export function decode(x){if(!x||x.v!==1||!int(x.id,1)||!int(x.level,0,7)||!int(x.remix,0,4)||!['ready','play','win'].includes(x.phase)||!int(x.slot,0,2)||!int(x.moves,0,10000)||!int(x.par,1,6)||!Number.isFinite(x.t)||x.t<0||x.t>36000)return null;let c=CALLS[x.level],g=c.goals.map(v=>(v+x.remix)%5);if(JSON.stringify(g)!==JSON.stringify(x.goals)||!validItems(x.items,g)||!int(x.selected,-1,g.length-1)||!Array.isArray(x.history)||x.history.length>40)return null;
 for(let h of x.history)if(!h||!validItems(h.items,g)||!int(h.moves,0,x.moves))return null;
 if(x.motion){let m=x.motion;if(!int(m.a,0,g.length-1)||!int(m.b,0,g.length-1)||m.a===m.b||!int(m.slot,0,2)||m.oldA!==x.items[m.a][m.slot]||m.oldB!==x.items[m.b][m.slot]||!Number.isFinite(m.t)||m.t<0||m.t>1.02||m.dur!==1.02||x.phase!=='play')return null;}
 let p=fresh(),r=create(x.level,p,x.remix);for(let k of Object.keys(r))if(k in x)r[k]=JSON.parse(JSON.stringify(x[k]));r.par=remaining(create(x.level,fresh(),x.remix));r.selected=-1;r.hint=null;r.receipt=null;
 if(r.phase==='win'){if(!solved(r)||r.motion)return null;r.receipt={id:r.id,level:r.level,moves:r.moves,par:r.par,stars:r.moves<=r.par?3:r.moves<=r.par+2?2:1,looks:[...r.goals],remix:r.remix};}return r;}

export const mod=(n,m)=>(n%m+m)%m;
export const clone=x=>JSON.parse(JSON.stringify(x));
const defs=[
 ['A LITTLE CLICK',6,[[1]],1,0,'THE SUN IN A BOX'],
 ['TWO OF A KIND',6,[[1,0],[0,1]],2,0,'PAPER MOON'],
 ['PLUS ONE',6,[[1,-1],[0,1]],3,0,'THE TIN SONGBIRD'],
 ['THE LONG WAY ROUND',8,[[1,-1],[0,1]],4,0,'POCKET LIGHTHOUSE'],
 ['THREE LITTLE WISHES',6,[[1,0,0],[0,1,0],[0,0,1]],4,1,'A VERY SMALL WHALE'],
 ['THE BUTTERFLY EFFECT',6,[[1,-1,0],[0,1,-1],[0,0,1]],5,1,'BRASS BUTTERFLY'],
 ['FULL CIRCLE',6,[[1,-1,0],[0,1,-1],[-1,0,1]],5,1,'THE NIGHT BLOOM'],
 ['ONE THING LEADS',8,[[1,-1,0],[0,1,-1],[0,0,1]],6,1,'THE GLASSHOUSE'],
 ['GOOD THINGS COME',6,[[1,1,0],[0,1,1],[1,0,1]],6,2,'THE ORRERY'],
 ['ROUND TRIP',8,[[1,-1,0],[0,1,-1],[-1,0,1]],7,2,'THE COMET EXPRESS'],
 ['THE DOUBLE TAKE',8,[[1,1,0],[0,1,1],[1,0,1]],7,2,'THE JELLY LANTERN'],
 ['EVERY LITTLE THING',8,[[1,-1,1],[1,1,0],[0,-1,1]],8,2,'THE FOREVER CAROUSEL']
];
const maps=new Map();
function stateKey(p){return p.join(',');}
export function apply(pos,op,dir,N){return pos.map((x,i)=>mod(x+op[i]*dir,N));}
function table(N,ops){let key=N+':'+JSON.stringify(ops);if(maps.has(key))return maps.get(key);let zero=ops.map(()=>0),map=new Map([[stateKey(zero),{distance:0,path:[]}]]),queue=[zero];for(let at=0;at<queue.length;at++){let p=queue[at],v=map.get(stateKey(p));for(let i=0;i<ops.length;i++)for(let d of[1,-1]){let q=apply(p,ops[i],d,N),k=stateKey(q);if(!map.has(k)){map.set(k,{distance:v.distance+1,path:[{i,dir:-d},...v.path]});queue.push(q);}}}maps.set(key,map);return map;}
export const LOCKS=defs.map(([name,N,ops,distance,venue,treasure],i)=>{let t=table(N,ops),max=Math.max(...[...t.values()].map(x=>x.distance)),want=Math.min(distance,max),choices=[...t.entries()].filter(([k,v])=>v.distance===want),k=i===0?'5':i===1?'5,1':choices[(i*43+17)%choices.length][0],start=k.split(',').map(Number);return{name,N,ops,venue,treasure,start,par:t.get(k).distance,number:i+1};});
export function solve(s){let b=LOCKS[s.level];return clone(table(b.N,b.ops).get(stateKey(s.pos))?.path||[]);}
export function makeProfile(v={}){return{v:1,stars:LOCKS.map((_,i)=>Math.max(0,Math.min(3,Math.floor(+v?.stars?.[i]||0)))),best:LOCKS.map((_,i)=>Math.max(0,Math.min(999,Math.floor(+v?.best?.[i]||0)))),look:Math.max(0,Math.min(2,Math.floor(+v?.look||0))),sound:v?.sound!==false,gentle:v?.gentle===true,light:v?.light!==false,rewards:{like:v?.rewards?.like===true,comment:v?.rewards?.comment===true}};}
export function mergeProfile(a,b){let p=makeProfile(a),q=makeProfile(b);p.stars=p.stars.map((n,i)=>Math.max(n,q.stars[i]));p.best=p.best.map((n,i)=>n&&q.best[i]?Math.min(n,q.best[i]):n||q.best[i]);for(let k of['like','comment'])p.rewards[k] ||=q.rewards[k];return p;}
export function unlocked(p){let i=p.stars.findIndex(n=>n===0);return i<0?11:i;}
export function total(p){return p.stars.reduce((a,b)=>a+b,0);}
export function count(p){return p.stars.filter(Boolean).length;}
export function lookAllowed(p,n){return Number.isInteger(n)&&n>=0&&n<=2&&count(p)>=[0,4,8][n];}
export function makeRun(level=0){level=Number.isInteger(level)&&LOCKS[level]?level:0;let pos=clone(LOCKS[level].start);return{v:1,level,phase:'ready',pos,from:clone(pos),spin:pos.map(()=>0),elapsed:0,time:0,moves:0,undos:0,hints:0,history:[],hint:null,last:null,events:[]};}
export function turn(s,i,dir=1){let b=LOCKS[s.level];if(s.phase!=='ready'||!Number.isInteger(i)||!b.ops[i]||![1,-1].includes(dir))return false;s.events=[];s.history.push(clone(s.pos));if(s.history.length>80)s.history.shift();s.moves++;s.from=clone(s.pos);s.spin=b.ops[i].map(n=>n*dir);s.pos=apply(s.pos,b.ops[i],dir,b.N);s.elapsed=0;s.phase='turning';s.last={i,dir};s.hint=null;s.events.push({type:'turn',i,dir});return true;}
export function undo(s){if(!['ready','turning'].includes(s.phase)||!s.history.length)return false;s.pos=s.history.pop();s.from=clone(s.pos);s.spin=s.pos.map(()=>0);s.undos++;s.phase='ready';s.elapsed=0;s.hint=null;s.events=[{type:'undo'}];return true;}
export function hint(s){if(s.phase!=='ready')return null;let path=solve(s);if(!path.length)return null;s.hints++;s.hint=path[0];s.events=[{type:'hint'}];return s.hint;}
export function tick(s,dt){if(!Number.isFinite(dt)||dt<=0)return;s.events=[];dt=Math.min(dt,1/30);s.time+=dt;if(s.phase==='turning'){s.elapsed+=dt;if(s.elapsed>=.30){s.elapsed=0;s.from=clone(s.pos);s.spin=s.pos.map(()=>0);s.events.push({type:'click',aligned:s.pos.filter(n=>n===0).length});if(s.pos.every(n=>n===0)){s.phase='opening';s.events.push({type:'unlock'});}else s.phase='ready';}}else if(s.phase==='opening'){s.elapsed+=dt;if(s.elapsed>=1.8){s.elapsed=1.8;s.phase='won';s.events.push({type:'complete'});}}}
export function result(s){let b=LOCKS[s.level];return{stars:s.phase==='won'?1+(s.moves<=b.par?1:0)+(s.hints===0?1:0):0,moves:s.moves,par:b.par,hints:s.hints,undos:s.undos};}
export function award(p,s){if(s.phase!=='won')return false;let r=result(s),old=p.stars[s.level];p.stars[s.level]=Math.max(old,r.stars);p.best[s.level]=p.best[s.level]?Math.min(p.best[s.level],s.moves):s.moves;return p.stars[s.level]-old;}
export function restore(v){try{if(v?.v!==1||!Number.isInteger(v.level)||!LOCKS[v.level]||!['ready','turning','opening','won'].includes(v.phase))return null;let b=LOCKS[v.level],s=clone(v),n=b.ops.length;for(let k of['pos','from'])if(!Array.isArray(s[k])||s[k].length!==n||!s[k].every(x=>Number.isInteger(x)&&x>=0&&x<b.N))return null;if(!Array.isArray(s.spin)||s.spin.length!==n||!s.spin.every(x=>[-1,0,1].includes(x)))return null;if(!['elapsed','time','moves','hints','undos'].every(k=>Number.isFinite(s[k])&&s[k]>=0)||s.elapsed>1.81)return null;if(![s.moves,s.hints,s.undos].every(Number.isInteger)||s.moves>999)return null;if(!Array.isArray(s.history)||s.history.length>80||!s.history.every(a=>Array.isArray(a)&&a.length===n&&a.every(x=>Number.isInteger(x)&&x>=0&&x<b.N)))return null;if(['opening','won'].includes(s.phase)&&!s.pos.every(x=>x===0))return null;s.events=[];return s;}catch{return null;}}

(function(root){
function createEngine(){
'use strict';
const DIRS=[[0,-1],[1,0],[0,1],[-1,0]];
const raw=[
['First shore',['~~~~~~~','...~~~~','.*.~~.*','.pT~~G.','.*.~~..','...~~~~','~~~~~~~']],
['A little nudge',['~~~~~~~','..*~~..','..T~~*.','*#.~~..','p..~~.G','...~~..','~~~~~~~']],
['South for tea',['~.....~','~*.p.*~','~..T..~','~~~~~~~','~~~~~~~','~~*..~~','~~.G.~~']],
['Rolling meadow',['..*.~~~~','pT..~~~~','....~~~~','....~~~~','*...~~.G','..#.~~..','~~~~~~.*','~~~~~~~~']],
['Two good bridges',['.*.~~..*','p.T~~...','...~~.T.','~~~~~~~~','~~~~~~~~','~~~~~...','~~~~~*..','~~~~~..G']],
['A quiet detour',['~~~~~~~','.#.~~..','.*.~~.*','pT.~~.G','.*.~~..','...~~..','~~~~~~~']],
['The forked grove',['...~~.*','*T.~~..','...~~.G','p#.~~..','..T~~*.','...~~~~','~~~~~~~']],
['Steam and postcards',['.*.~~..*','pT.~~.T.','.#.~~...','~~~~~~~~','~~~~~~~~','~~~~~...','~~~~~*..','~~~~~..G']],
['The long way round',['.*..~~~~','....~~~~','pT..~~~~','....~~~~','*...~~.G','..#.~~..','~~~~~~.*','~~~~~~~~']],
['Last light',['.*.~~..*','p.T~~...','...~~.T.','~~~~~~~~','~~~~~~~~','~~~~~...','~~~~~*..','~~~~~..G']],
['Little museum',['~.....~','~*.p.*~','~..T..~','~~~~~~~','~~~~~~~','~~*..~~','~~.G.~~']],
['Home with treasures',['.*.~~...','p.T~~..*','...~~.T.','~~~~~~~~','~~~~~~~~','...~~...','G..~~T..','...~~.*.']]
];
// A few routes turn with the archipelago; their seeds, start and scenery vary.
function rotate(rows){const h=rows.length,w=rows[0].length;return Array.from({length:w},(_,z)=>Array.from({length:h},(_,x)=>rows[h-1-x][z]).join(''))}
raw[5][1]=rotate(raw[5][1]);raw[9][1]=rotate(rotate(raw[9][1]));raw[10][1]=rotate(raw[10][1]);
const BOARDS=raw.map(([name,rows],level)=>{const b={name,rows,w:rows[0].length,h:rows.length,land:[],rocks:[],seeds:[],goal:null,trees:[],start:null,level};rows.forEach((r,z)=>[...r].forEach((c,x)=>{if(c!=='~')b.land.push(x+','+z);if(c==='#')b.rocks.push(x+','+z);if(c==='*')b.seeds.push([x,z]);if(c==='T')b.trees.push({x,z,axis:-1,bridge:false});if(c==='G')b.goal=[x,z];if(c==='p')b.start=[x,z]}));return b});
const clone=o=>JSON.parse(JSON.stringify(o)),key=(x,z)=>x+','+z;
function cells(l){return l.axis===-1?[[l.x,l.z]]:l.axis===0?[[l.x,l.z],[l.x+1,l.z]]:[[l.x,l.z],[l.x,l.z+1]]}
function has(b,x,z){return b.land.includes(key(x,z))}
function occupied(logs,x,z,except=-1){return logs.findIndex((l,i)=>i!==except&&cells(l).some(p=>p[0]===x&&p[1]===z))}
function footprintOK(b,logs,l,except){return cells(l).every(([x,z])=>x>=0&&z>=0&&x<b.w&&z<b.h&&!b.rocks.includes(key(x,z))&&occupied(logs,x,z,except)<0)}
function walkable(b,logs,x,z){if(b.rocks.includes(key(x,z)))return false;const j=occupied(logs,x,z);if(j>=0)return logs[j].bridge;return has(b,x,z)}
function transition(b,s,dir){const [dx,dz]=DIRS[dir],x=s.x+dx,z=s.z+dz;if(b.rocks.includes(key(x,z)))return null;const j=occupied(s.logs,x,z);let logs=s.logs,pushed=false,fall=false,rolled=0;
if(j>=0&&!logs[j].bridge){let l={...logs[j]};if(l.axis===-1){fall=true;l={x:x+dx,z:z+dz,axis:dx?0:1,bridge:false};if(dx<0)l.x--;if(dz<0)l.z--;if(!footprintOK(b,logs,l,j))return null;l.bridge=cells(l).every(p=>!has(b,...p))}
else{const parallel=l.axis===0?dx!==0:dz!==0;let n={...l,x:l.x+dx,z:l.z+dz};if(!footprintOK(b,logs,n,j))return null;l=n;rolled=1;l.bridge=cells(l).every(p=>!has(b,...p));if(!parallel){while(!l.bridge){n={...l,x:l.x+dx,z:l.z+dz};if(!footprintOK(b,logs,n,j))break;l=n;rolled++;l.bridge=cells(l).every(p=>!has(b,...p))}}}
logs=logs.map((a,i)=>i===j?l:{...a});if(!walkable(b,logs,x,z))return null;pushed=true;}
else if(!walkable(b,logs,x,z))return null;
let mask=s.mask;for(let i=0;i<b.seeds.length;i++)if(b.seeds[i][0]===x&&b.seeds[i][1]===z)mask|=1<<i;
return {x,z,logs,mask,event:{pushed,fall,rolled,log:j,dir},done:x===b.goal[0]&&z===b.goal[1]}}
function make(level,round=0){const b=BOARDS[level];return {level,round,x:b.start[0],z:b.start[1],logs:clone(b.trees),mask:0,moves:0,pushes:0,hints:0,time:0,done:false,awarded:false,history:[]}}
function move(s,dir){if(s.done)return null;const b=BOARDS[s.level],n=transition(b,s,dir);if(!n)return null;s.history.push({x:s.x,z:s.z,logs:clone(s.logs),mask:s.mask,moves:s.moves,pushes:s.pushes});if(s.history.length>180)s.history.shift();Object.assign(s,{x:n.x,z:n.z,logs:n.logs,mask:n.mask,moves:s.moves+1,pushes:s.pushes+(n.event.pushed?1:0)});return n.event}
function inspect(s){const b=BOARDS[s.level];if(s.done||s.x!==b.goal[0]||s.z!==b.goal[1])return false;s.done=true;return true}
function undo(s){if(s.done||!s.history.length)return false;Object.assign(s,s.history.pop());return true}
function sig(s){return s.x+','+s.z+'|'+s.mask+'|'+s.logs.map(l=>[l.x,l.z,l.axis,l.bridge?1:0].join(',')).sort().join(';')}
function solve(state,all=true,limit=220000){const b=BOARDS[state.level],full=(1<<b.seeds.length)-1,start={x:state.x,z:state.z,logs:clone(state.logs),mask:state.mask},q=[{s:start,p:-1,d:-1}],seen=new Set([sig(start)]);for(let h=0;h<q.length&&q.length<=limit;h++){const cur=q[h];if(cur.s.x===b.goal[0]&&cur.s.z===b.goal[1]&&(!all||cur.s.mask===full)){let out=[];for(let n=h;q[n].p>=0;n=q[n].p)out.push(q[n].d);return{path:out.reverse(),visited:q.length}}for(let d=0;d<4;d++){const n=transition(b,cur.s,d);if(!n)continue;const k=sig(n);if(seen.has(k))continue;seen.add(k);q.push({s:{x:n.x,z:n.z,logs:n.logs,mask:n.mask},p:h,d})}}return{path:null,visited:q.length}}
function profile(){return{stars:Array(12).fill(0),coins:0,unlocked:0,coat:0,owned:[0],mute:false,round:0}}
function award(s,p,par){if(!s.done||s.awarded)return 0;s.awarded=true;const stars=1+(s.mask===(1<<BOARDS[s.level].seeds.length)-1?1:0)+(s.hints===0&&s.moves<=par+8?1:0),old=p.stars[s.level],pay=Math.max(0,stars-old)+(old===0?3:0);p.coins+=pay;p.stars[s.level]=Math.max(old,stars);p.unlocked=Math.max(p.unlocked,Math.min(11,s.level+1));return pay}
function buy(p,i){if(p.owned.includes(i)){p.coat=i;return true}const cost=[0,12,18,24][i];if(p.coins<cost)return false;p.coins-=cost;p.owned.push(i);p.coat=i;return true}
return{BOARDS,DIRS,clone,key,cells,has,walkable,transition,make,move,inspect,undo,solve,profile,award,buy};
}
const api=createEngine();api.workerCode='const E=('+createEngine.toString()+')();onmessage=e=>postMessage({id:e.data.id,...E.solve(e.data.state,e.data.all)});';root.TimberEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);


export const W=7,H=9,CELL=.86,VERSION=1;
export const xy=id=>({x:id%W,y:Math.floor(id/W)}),id=(x,y)=>y*W+x;
export const world=id=>{let p=xy(id);return {x:(p.x-3)*CELL,z:(p.y-4)*CELL};};
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const paper=(x,y)=>({cell:id(x,y),type:'paper',name:'Paper feeder'}),ink=(x,y)=>({cell:id(x,y),type:'ink',name:'Ink feeder'});
export const ORDERS=[
 {name:'The First Impression',set:0,goals:[4],crew:2,ideal:1,autoInk:true,autoOut:true,feed:[paper(1,6)],presses:[id(4,2)],blocks:[],poster:0},
 {name:'Just Add Ink',set:0,goals:[6],crew:3,ideal:2,autoInk:false,autoOut:true,feed:[paper(1,6),ink(5,6)],presses:[id(3,2)],blocks:[id(3,4)],poster:1},
 {name:'Special Delivery',set:1,goals:[6],crew:4,ideal:3,autoInk:false,autoOut:false,feed:[paper(1,6),ink(5,6)],presses:[id(2,2)],blocks:[id(3,4),id(3,5)],poster:2},
 {name:'Double Exposure',set:1,goals:[4,4],crew:3,ideal:2,autoInk:true,autoOut:true,feed:[paper(3,6)],presses:[id(1,2),id(5,2)],blocks:[id(2,4),id(4,4)],poster:3},
 {name:'The Colour Department',set:2,goals:[4,4],crew:5,ideal:4,autoInk:false,autoOut:true,feed:[paper(1,6),ink(5,6)],presses:[id(1,2),id(5,2)],blocks:[id(3,3),id(3,4)],poster:4},
 {name:'Everybody Prints',set:2,goals:[4,4],crew:6,ideal:6,autoInk:false,autoOut:false,feed:[paper(1,6),ink(5,6)],presses:[id(1,2),id(5,2)],blocks:[id(3,4),id(3,5)],poster:5}
];
export function stations(order){let m=ORDERS[order],a=m.feed.map(f=>({...f,kind:'feeder'}));m.presses.forEach((cell,p)=>{a.push({cell,kind:'input',press:p,type:'input',name:m.presses.length>1?'Press '+String.fromCharCode(65+p):'Printing press'});if(!m.autoOut)a.push({cell:cell+1,kind:'output',press:p,type:'poster'+p,name:'Printed posters '+String.fromCharCode(65+p)});});if(!m.autoOut)a.push({cell:id(3,7),kind:'dispatch',type:'dispatch',name:'Dispatch desk'});return a;}
export function blocked(order,cell){if(!Number.isInteger(cell)||cell<0||cell>=W*H)return true;let p=xy(cell),m=ORDERS[order];return p.y<1||m.blocks.includes(cell)||(p.y===1&&m.presses.some(c=>xy(c).x===p.x))||m.feed.some(f=>f.cell-W===cell)||(!m.autoOut&&cell===id(3,6));}
export function compatible(a,b){return a&&b&&a!==b&&((['paper','ink'].includes(a.type)&&b.kind==='input')||(a.kind==='output'&&b.kind==='dispatch'));}
export function adjacent(a,b){let p=xy(a),q=xy(b);return Math.abs(p.x-q.x)+Math.abs(p.y-q.y)===1;}
export function route(order,from,to){if(blocked(order,from)||blocked(order,to))return null;let q=[from],came=new Map([[from,null]]);for(let k=0;k<q.length;k++){let c=q[k];if(c===to)break;let p=xy(c);for(let [dx,dy]of [[0,-1],[1,0],[0,1],[-1,0]]){let x=p.x+dx,y=p.y+dy;if(x<0||x>=W||y<0||y>=H)continue;let n=id(x,y);if(!blocked(order,n)&&!came.has(n)){came.set(n,c);q.push(n);}}}if(!came.has(to))return null;let list=[];for(let c=to;c!=null;c=came.get(c))list.push(c);return list.reverse();}
export function fresh(){return {v:VERSION,best:Array(6).fill(0),scores:Array(6).fill(0),sound:true,gentle:false,light:false,paint:0,rewards:{like:false,comment:false},run:null};}
export const stars=p=>p.best.reduce((a,b)=>a+b,0);
export function create(order=0,kit=0,lap=0){if(!ORDERS[order])throw Error('Invalid order');lap=clamp(Math.floor(lap)||0,0,999);return {v:VERSION,order,kit:clamp(kit|0,0,2),lap,phase:'ready',t:0,uid:1,workers:[],presses:ORDERS[order].presses.map(()=>({paper:0,ink:0,out:0,busy:0,made:0})),done:ORDERS[order].goals.map(()=>0),recalls:0,assisted:0,receipt:null,started:false};}
export const goals=s=>ORDERS[s.order].goals.map(g=>g+Math.min(s.lap,3)*2);
export function validPath(order,path){return Array.isArray(path)&&path.length>=2&&path.length<=100&&path.every((c,i)=>!blocked(order,c)&&(i===0||adjacent(path[i-1],c)));}
function available(s,node){return node.kind==='feeder'?Infinity:node.kind==='output'?s.presses[node.press].out:0;}
function room(s,node,type){if(node.kind==='dispatch')return Infinity;if(node.kind!=='input'||!['paper','ink'].includes(type))return 0;return 12-s.presses[node.press][type];}
function take(s,node,n){if(node.kind==='output')s.presses[node.press].out-=n;}
function drop(s,node,type,n,ev){if(node.kind==='input'){s.presses[node.press][type]+=n;ev.push({type:'supply',station:node.cell,material:type,amount:n});}else{let p=Number(type.slice(6)),left=goals(s)[p]-s.done[p],credit=Math.min(left,n);s.done[p]+=credit;if(credit>0)ev.push({type:'delivered',press:p,amount:credit,station:node.cell});}}
export function add(s,path,to,assist=false){let ev=[],nodes=stations(s.order),from=nodes.findIndex(n=>n.cell===path?.[0]);if(!['ready','play'].includes(s.phase))return {ok:false,why:'Order complete',events:ev};if(s.workers.length>=ORDERS[s.order].crew)return {ok:false,why:'Crew full · recall a helper',events:ev};if(!validPath(s.order,path)||!compatible(nodes[from],nodes[to])||path.at(-1)!==nodes[to].cell)return {ok:false,why:'End at a glowing dock',events:ev};
 if(s.phase==='ready'){s.phase='play';s.started=true;ev.push({type:'start'});}let w={id:s.uid++,from,to,path:[...path],q:path.length-1,phase:'back',timer:0,carry:0,cycles:0};
 let cap=s.kit>=1?2:1,n=Math.min(cap,available(s,nodes[from]),room(s,nodes[to],nodes[from].type));
 if(n>0){take(s,nodes[from],n);drop(s,nodes[to],nodes[from].type,n,ev);w.cycles=1;}
 s.workers.push(w);if(assist)s.assisted++;ev.push({type:'copy',id:w.id,from,to});checkWin(s,ev);return {ok:true,events:ev};
}
export function recall(s,workerId){if(!['ready','play'].includes(s.phase))return false;let i=s.workers.findIndex(w=>w.id===workerId);if(i<0)return false;let w=s.workers[i],node=stations(s.order)[w.from];if(w.carry&&node.kind==='output')s.presses[node.press].out+=w.carry;s.workers.splice(i,1);s.recalls++;return true;}
export function workerPosition(s,w){let i=Math.min(w.path.length-2,Math.floor(w.q)),f=w.q-i,a=world(w.path[i]),b=world(w.path[i+1]);return {x:a.x+(b.x-a.x)*f,z:a.z+(b.z-a.z)*f};}
export function rating(s){let shortest=0;for(let w of s.workers)shortest+=(route(s.order,w.path[0],w.path.at(-1))?.length||w.path.length)-1;let actual=s.workers.reduce((n,w)=>n+w.path.length-1,0);return 1+(s.workers.length<=ORDERS[s.order].ideal?1:0)+(actual<=shortest*1.5+.01?1:0);}
function checkWin(s,ev){if(s.phase==='play'&&s.done.every((n,i)=>n>=goals(s)[i])){s.phase='win';s.receipt={stars:rating(s),score:s.done.reduce((a,b)=>a+b,0)*150+rating(s)*100,prints:s.done.reduce((a,b)=>a+b,0),crew:s.workers.length};ev.push({type:'win'},{type:'end'});}}
export function advance(s,dt){let ev=[];if(s.phase!=='play'||!Number.isFinite(dt)||dt<=0||dt>.25)return ev;let nodes=stations(s.order),m=ORDERS[s.order];s.t+=dt;let speed=2.65*(s.kit===2?1.2:1);
 for(let w of s.workers){let source=nodes[w.from],dest=nodes[w.to],end=w.path.length-1;
  if(w.phase==='take'){
   if(w.timer>0){w.timer-=dt;if(w.timer<=0)w.phase='out';}
   else{let n=Math.min(s.kit>=1?2:1,available(s,source));if(n>0){take(s,source,n);w.carry=n;w.timer=.25;ev.push({type:'take',id:w.id});}}
  }else if(w.phase==='out'){w.q=Math.min(end,w.q+speed*dt);if(w.q>=end){w.phase='drop';w.timer=.25;}}
  else if(w.phase==='drop'){w.timer=Math.max(0,w.timer-dt);if(w.timer<=0&&room(s,dest,source.type)>=w.carry){drop(s,dest,source.type,w.carry,ev);w.carry=0;w.phase='back';w.cycles++;}}
  else{w.q=Math.max(0,w.q-speed*dt);if(w.q<=0){w.phase='take';w.timer=0;}}
 }
 for(let i=0;i<s.presses.length;i++){let p=s.presses[i];if(p.busy>0){p.busy=Math.max(0,p.busy-dt);if(p.busy===0){p.made++;if(m.autoOut){if(s.done[i]<goals(s)[i]){s.done[i]++;ev.push({type:'delivered',press:i,amount:1,station:m.presses[i]});}}else p.out++;ev.push({type:'print',press:i});}}
  if(p.busy===0&&p.paper>0&&(m.autoInk||p.ink>0)&&p.out<16&&s.done[i]<goals(s)[i]){p.paper--;if(!m.autoInk)p.ink--;p.busy=1.05;ev.push({type:'press',press:i});}
 }
 checkWin(s,ev);return ev;
}
export function bank(p,s){if(s.phase!=='win'||!s.receipt)return false;p.best[s.order]=Math.max(p.best[s.order],s.receipt.stars);p.scores[s.order]=Math.max(p.scores[s.order],s.receipt.score);return true;}
export function decode(raw){let a;try{a=typeof raw==='string'?JSON.parse(raw):raw;}catch{}let p=fresh();if(!a||typeof a!=='object'||a.v!==VERSION)return p;for(let k of ['best','scores'])if(Array.isArray(a[k]))for(let i=0;i<6;i++)p[k][i]=Number.isFinite(a[k][i])?clamp(Math.floor(a[k][i]),0,k==='best'?3:10000):0;for(let k of ['sound','gentle','light'])if(typeof a[k]==='boolean')p[k]=a[k];p.paint=[0,1,2].includes(a.paint)?a.paint:0;p.rewards={like:a.rewards?.like===true,comment:a.rewards?.comment===true};
 let s=a.run;if(!s||s.v!==VERSION||!Number.isInteger(s.order)||!ORDERS[s.order]||![0,1,2].includes(s.kit)||!Number.isInteger(s.lap)||s.lap<0||s.lap>999||!['ready','play','win'].includes(s.phase))return p;
 let m=ORDERS[s.order],nodes=stations(s.order),valid=true,num=(x,lo,hi,int=false)=>Number.isFinite(x)&&x>=lo&&x<=hi&&(!int||Number.isInteger(x));
 if(!num(s.t,0,1e8)||!num(s.uid,1,1e6,true)||!num(s.recalls,0,1e6,true)||!num(s.assisted,0,1e6,true)||typeof s.started!=='boolean')valid=false;
 if(!Array.isArray(s.presses)||s.presses.length!==m.presses.length||!s.presses.every(q=>q&&['paper','ink','out','made'].every(k=>num(q[k],0,k==='made'?1e6:32,true))&&num(q.busy,0,1.05)))valid=false;
 if(!Array.isArray(s.done)||s.done.length!==m.goals.length||!s.done.every((v,i)=>num(v,0,goals(s)[i],true)))valid=false;
 if(!Array.isArray(s.workers)||s.workers.length>m.crew)valid=false;else{let ids=new Set();for(let w of s.workers){if(!w||!num(w.id,1,s.uid-1,true)||ids.has(w.id)||!Number.isInteger(w.from)||!Number.isInteger(w.to)||!compatible(nodes[w.from],nodes[w.to])||!validPath(s.order,w.path)||w.path[0]!==nodes[w.from]?.cell||w.path.at(-1)!==nodes[w.to]?.cell||!num(w.q,0,w.path.length-1)||!['take','out','drop','back'].includes(w.phase)||!num(w.timer,-.1,.25)||!num(w.carry,0,2,true)||!num(w.cycles,0,1e6,true))valid=false;ids.add(w?.id);}}
 if(s.phase==='ready'&&(s.started||!Array.isArray(s.workers)||s.workers.length))valid=false;if(valid&&s.phase==='win'&&(!s.receipt||!num(s.receipt.score,0,10000,true)||s.receipt.stars!==rating(s)||!s.done.every((v,i)=>v===goals(s)[i])))valid=false;
 if(valid)p.run=JSON.parse(JSON.stringify(s));return p;
}
export function mergeProfile(local,cloud){let a=decode(local),b=decode(cloud);a.best=a.best.map((x,i)=>Math.max(x,b.best[i]));a.scores=a.scores.map((x,i)=>Math.max(x,b.scores[i]));for(let k of ['like','comment'])a.rewards[k]=a.rewards[k]||b.rewards[k];return a;}

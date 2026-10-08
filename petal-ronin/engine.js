(function(root){'use strict';
const chapters=[
{name:'A leaf on the water',palette:0,waves:[[[0,'mask',1],[6,'mask',1]]]},
{name:'The vermilion gate',palette:1,waves:[[[0,'guard',2],[6,'mask',1]],[[1,'mask',1],[5,'guard',2]]]},
{name:'Arrows in the mist',palette:2,waves:[[[0,'archer',1],[6,'archer',1]],[[0,'mask',1],[5,'archer',1]]]},
{name:'Two bamboo shadows',palette:0,waves:[[[0,'spear',2],[6,'mask',1]],[[1,'spear',2],[6,'guard',2]]]},
{name:'Under the maple',palette:1,waves:[[[0,'guard',2],[5,'archer',1]],[[0,'spear',2],[4,'guard',2],[6,'mask',1]]]},
{name:'Moon over the bridge',palette:3,waves:[[[0,'boss',4],[6,'archer',1]],[[0,'guard',2],[5,'spear',2]]]},
{name:'The lantern procession',palette:2,waves:[[[0,'spear',2],[6,'archer',1]],[[0,'archer',1],[4,'guard',2],[6,'mask',1]],[[0,'boss',4],[6,'mask',1]]]},
{name:'The last falling petal',palette:3,waves:[[[0,'guard',2],[6,'guard',2]],[[0,'spear',2],[5,'archer',1]],[[0,'archer',1],[4,'boss',4],[6,'spear',2]]]}
];
const clone=o=>JSON.parse(JSON.stringify(o));
function plan(s){for(const e of s.enemies){const dir=s.pos>e.pos?1:-1,range=e.type==='archer'?3:e.type==='spear'||e.type==='boss'?2:1,dist=Math.abs(e.pos-s.pos);e.dir=dir;if(dist<=range){e.intent=e.ready?'attack':'charge';e.targets=Array.from({length:range},(_,i)=>e.pos+dir*(i+1)).filter(n=>n>=0&&n<7)}else{e.intent='move';e.targets=[e.pos+dir]}}}
function spawn(s){const occupied=new Set([s.pos]);s.enemies=chapters[s.level].waves[s.wave].map(([pos,type,hp],id)=>{const opts=Array.from({length:7},(_,i)=>i).sort((a,b)=>Math.abs(a-pos)-Math.abs(b-pos)||a-b);pos=opts.find(p=>!occupied.has(p));occupied.add(pos);return{id:s.wave*10+id,pos,type,hp,max:hp,ready:false,dir:1,intent:'move',targets:[]}});plan(s)}
function create(level=0){level=Math.max(0,Math.min(7,level|0));const s={v:1,level,pos:3,face:1,hp:3,damage:0,cd:0,wave:0,turn:0,kills:0,leaves:[{pos:0,found:false},{pos:3,found:true},{pos:6,found:false}],enemies:[],won:false,dead:false,rating:0,history:[],events:[]};spawn(s);return s}
function snapshot(s){const {history,events,...a}=s;return clone(a)}
function nearest(s,range){return s.enemies.filter(e=>Math.abs(e.pos-s.pos)<=range).sort((a,b)=>Math.abs(a.pos-s.pos)-Math.abs(b.pos-s.pos)||-(a.pos-b.pos)*s.face)[0]}
function act(s,a){if(s.won||s.dead)return false;let adjacent=[nearest(s,1)].filter(Boolean),target=nearest(s,3),dest=s.pos+(a==='left'?-1:1);
if(!['left','right','cut','bow','wait'].includes(a)||(['left','right'].includes(a)&&(dest<0||dest>6||s.enemies.some(e=>e.pos===dest)))||a==='cut'&&!adjacent.length||a==='bow'&&(s.cd>0||!target))return false;
s.history.push(snapshot(s));if(s.history.length>40)s.history.shift();s.turn++;s.events=[];if(s.cd>0)s.cd--;
if(a==='left'||a==='right'){const from=s.pos;s.pos=dest;s.face=a==='left'?-1:1;s.events.push({type:'step',from,to:s.pos})}
if(a==='cut'){s.events.push({type:'cut',pos:s.pos});for(const e of adjacent){e.hp--;e.intent='rest';e.ready=false;s.events.push({type:'hit',pos:e.pos,id:e.id,dead:e.hp<=0})}}
if(a==='bow'){s.face=target.pos>s.pos?1:-1;target.hp--;s.cd=3;s.events.push({type:'arrow',from:s.pos,to:target.pos},{type:'hit',pos:target.pos,id:target.id,dead:target.hp<=0})}
if(a==='wait')s.events.push({type:'wait',pos:s.pos});
let dead=s.enemies.filter(e=>e.hp<=0);s.kills+=dead.length;s.enemies=s.enemies.filter(e=>e.hp>0);
// Enemy attacks are committed telegraphs; they do not follow a dodging player.
const attackers=s.enemies.filter(e=>e.intent==='attack');let hurt=false;for(const e of attackers){s.events.push({type:'attack',from:e.pos,targets:[...e.targets],kind:e.type});if(e.targets.includes(s.pos))hurt=true;for(const other of s.enemies)if(other.id!==e.id&&e.targets.includes(other.pos)){other.hp--;s.events.push({type:'hit',pos:other.pos,id:other.id,dead:other.hp<=0,friendly:true})}e.ready=false}
if(hurt){s.hp--;s.damage++;s.events.push({type:'hurt',pos:s.pos})}
dead=s.enemies.filter(e=>e.hp<=0);s.kills+=dead.length;s.enemies=s.enemies.filter(e=>e.hp>0);
for(const e of s.enemies){if(e.intent==='charge')e.ready=true;if(e.intent==='move'){const to=e.targets[0];e.ready=false;if(to!==s.pos&&!s.enemies.some(o=>o.id!==e.id&&o.pos===to)){s.events.push({type:'enemy-step',id:e.id,from:e.pos,to});e.pos=to}}}
for(const p of s.leaves)if(p.pos===s.pos&&!p.found){p.found=true;s.events.push({type:'leaf',pos:p.pos})}
if(s.hp<=0){s.dead=true;plan(s);s.events.push({type:'defeat',pos:s.pos});return true}
if(!s.enemies.length&&s.wave+1<chapters[s.level].waves.length){s.wave++;spawn(s);s.events.push({type:'wave',wave:s.wave})}else plan(s);
if(!s.enemies.length&&s.leaves.every(p=>p.found))finish(s);return true}
function finish(s){if(s.won||s.dead||s.enemies.length||s.wave!==chapters[s.level].waves.length-1)return false;s.won=true;s.rating=1+(s.damage===0?1:0)+(s.leaves.every(p=>p.found)?1:0);s.history=[];s.events.push({type:'win',pos:s.pos});return true}
function undo(s){if(s.won||!s.history.length)return false;const history=s.history,old=history.pop();Object.assign(s,clone(old),{history,events:[{type:'undo',pos:old.pos}]});return true}
function validate(s,history=true){if(s.v!==1||!Number.isInteger(s.level)||s.level<0||s.level>7)return false;for(const k of['pos','face','hp','damage','cd','wave','turn','kills','rating'])if(!Number.isInteger(s[k]))return false;if(s.pos<0||s.pos>6||Math.abs(s.face)!==1||s.hp<0||s.hp>3||s.damage<0||s.hp+s.damage!==3||s.cd<0||s.cd>3||s.wave<0||s.wave>=chapters[s.level].waves.length||s.turn<0||s.turn>100000||s.kills<0||typeof s.won!=='boolean'||typeof s.dead!=='boolean'||s.dead!==(s.hp===0)||s.rating<0||s.rating>3)return false;
if(!Array.isArray(s.enemies)||s.enemies.length>3||!Array.isArray(s.leaves)||s.leaves.length!==3)return false;const positions=new Set([s.pos]),ids=new Set();for(const e of s.enemies){if(!Number.isInteger(e.id)||ids.has(e.id)||positions.has(e.pos)||!Number.isInteger(e.pos)||e.pos<0||e.pos>6||!['mask','guard','archer','spear','boss'].includes(e.type)||!Number.isInteger(e.hp)||e.hp<1||e.hp>4||e.hp>e.max||typeof e.ready!=='boolean'||!['move','charge','attack'].includes(e.intent)||!Array.isArray(e.targets)||e.targets.some(x=>!Number.isInteger(x)||x<0||x>6))return false;ids.add(e.id);positions.add(e.pos)}for(let i=0;i<3;i++)if(s.leaves[i].pos!==i*3||typeof s.leaves[i].found!=='boolean')return false;
if(s.won&&(s.enemies.length||s.dead||s.rating!==1+(s.damage===0?1:0)+(s.leaves.every(p=>p.found)?1:0)))return false;if(history&&(!Array.isArray(s.history)||s.history.length>40||s.history.some(h=>!validate({...h,history:[],events:[]},false))))return false;return true}
function restore(r){try{return validate(r)?clone({...r,events:[]}):null}catch{return null}}
const api={chapters,create,act,undo,finish,restore,snapshot};if(typeof module!=='undefined')module.exports=api;root.Ronin=api;
})(typeof window==='undefined'?globalThis:window);

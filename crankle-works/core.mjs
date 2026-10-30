export const JOBS=[
 {name:'The First Flock',note:'Three little birds. One big beginning.',kinds:[0,0,0],district:0},
 {name:'Pond Post',note:'A hopping parcel for the pond.',kinds:[1,1,0,1],district:0},
 {name:'Midnight Delivery',note:'Owls for the night watch.',kinds:[2,2,2,0],district:1},
 {name:'Harbour Hoppers',note:'Small claws. Very big personalities.',kinds:[3,1,3,1,3],district:1},
 {name:'Whale of a Time',note:'A pocket-sized ocean parade.',kinds:[4,4,3,4,0],district:2},
 {name:'Long-Ear Express',note:'A little spring in every step.',kinds:[5,5,1,5,2,5],district:2},
 {name:'The Mixed-Up Fair',note:'Every shelf deserves a different friend.',kinds:[0,1,2,3,4,5],district:0},
 {name:'The Grand Opening',note:'One final box for the whole neighbourhood.',kinds:[5,2,4,1,3,0,5,4],district:2}
];
export const TOYS=['Pip Bird','Pond Hopper','Night Owl','Crab Captain','Pocket Whale','Bunny Bolt'];
export const clone=x=>JSON.parse(JSON.stringify(x));
export function profile(){return {v:1,records:JOBS.map(()=>({stars:0,shiny:0,reward:0})),upgrades:[0,0,0],coins:0,sound:true,gentle:false};}
export function cost(p,i){return [12,20,28][i]*[1,2,3,5][p.upgrades[i]];}
export function buy(p,i){if(!Number.isInteger(i)||i<0||i>2||p.upgrades[i]>=3)return false;let c=cost(p,i);if(p.coins<c)return false;p.coins-=c;p.upgrades[i]++;return true;}
export function unlocked(p){return Math.min(7,p.records.findIndex(r=>!r.stars)<0?7:p.records.findIndex(r=>!r.stars));}
export function start(job=0){if(!Number.isInteger(job)||job<0||job>=JOBS.length)throw Error('Invalid job');return {job,status:'active',energy:0,boost:0,holding:false,started:false,spawn:0,items:[],packed:[],winds:0,clock:0,events:[],nextId:0,delivered:false};}
export function capacity(p){return 6+p.upgrades[0]*2;}
export function wind(s,p,on){if(s.status!=='active'||s.packed.length===JOBS[s.job].kinds.length)return false;if(on){if(s.holding)return false;s.holding=true;s.started=true;s.events.push({type:'wind'});}else{if(!s.holding)return false;s.holding=false;s.winds++;let full=s.energy>=capacity(p)*.85;if(full){s.boost=4;s.events.push({type:'boost'});}else s.events.push({type:'release'});}return true;}
export function step(s,p,dt){if(s.status!=='active'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,.1);s.clock+=dt;const goal=JOBS[s.job].kinds;
 if(s.packed.length===goal.length)return;
 if(s.holding){s.energy=Math.min(capacity(p),s.energy+dt*7);return;}
 if(!s.started)return;
 s.energy=Math.min(capacity(p),s.energy+dt*p.upgrades[2]*.38);
 let powered=Math.min(dt,s.energy);if(powered<=0)return;s.energy=Math.max(0,s.energy-powered);
 let speed=(1+p.upgrades[1]*.22)*(s.boost>0?1.65:1);s.boost=Math.max(0,s.boost-powered);
 if(s.nextId<goal.length)s.spawn-=powered*speed;else s.spawn=0;
 if(s.spawn<=0&&s.nextId<goal.length){let i=s.nextId++;s.items.push({id:i,kind:goal[i],x:0,stage:0,shiny:false});s.spawn=1.35;s.events.push({type:'blank',kind:goal[i]});}
 for(const it of s.items){let old=it.x;it.x=Math.min(1,it.x+powered*speed/5.1);
  if(old<.25&&it.x>=.25){it.stage=1;s.events.push({type:'build',kind:it.kind});}
  if(old<.56&&it.x>=.56){it.stage=2;it.shiny=s.boost>0;s.events.push({type:'paint',kind:it.kind,shiny:it.shiny});}
  if(old<.83&&it.x>=.83){it.stage=3;s.events.push({type:'wrap',kind:it.kind});}
  if(it.x>=1){s.packed.push({kind:it.kind,shiny:it.shiny});s.events.push({type:'pack',kind:it.kind,shiny:it.shiny});}
 }
 s.items=s.items.filter(it=>it.x<1);
 if(s.packed.length===goal.length){s.energy=0;s.boost=0;s.events.push({type:'ready'});}
}
export function result(s){let n=s.packed.filter(x=>x.shiny).length,total=JOBS[s.job].kinds.length;return {shiny:n,total,stars:1+(n>=Math.ceil(total/2)?1:0)+(n===total?1:0),reward:total*8+n*3};}
export function deliver(s,p){if(s.status!=='active'||s.packed.length!==JOBS[s.job].kinds.length||s.delivered)return null;let r=result(s),old=p.records[s.job],paid=Math.max(0,r.reward-old.reward);p.coins+=paid;p.records[s.job]={stars:Math.max(r.stars,old.stars),shiny:Math.max(r.shiny,old.shiny),reward:Math.max(r.reward,old.reward)};s.status='won';s.holding=false;s.delivered=true;s.events.push({type:'deliver'});return {...r,paid};}
export function save(s,p){let q=clone(s);q.holding=false;q.events=[];return JSON.stringify({v:1,s:q,p});}
export function restore(raw){try{let a=JSON.parse(raw),s=a.s,p=a.p;if(a.v!==1||p.v!==1||!Array.isArray(p.records)||p.records.length!==8||!Array.isArray(p.upgrades)||p.upgrades.length!==3||p.upgrades.some(x=>!Number.isInteger(x)||x<0||x>3)||!Number.isFinite(p.coins)||p.coins<0||p.coins>10000||typeof p.sound!=='boolean'||typeof p.gentle!=='boolean')return null;
 if(p.records.some((r,i)=>!Number.isInteger(r.stars)||r.stars<0||r.stars>3||!Number.isInteger(r.shiny)||r.shiny<0||r.shiny>JOBS[i].kinds.length||!Number.isFinite(r.reward)||r.reward<0||r.reward>JOBS[i].kinds.length*11))return null;
 if(!Number.isInteger(s.job)||s.job<0||s.job>7||!['active','won'].includes(s.status)||!Number.isFinite(s.energy)||s.energy<0||s.energy>capacity(p)+.001||!Number.isFinite(s.boost)||s.boost<0||s.boost>4||!Number.isFinite(s.clock)||s.clock<0||!Number.isInteger(s.winds)||s.winds<0||!Number.isFinite(s.spawn)||s.spawn<-.11||s.spawn>1.36||!Array.isArray(s.items)||!Array.isArray(s.packed)||!Number.isInteger(s.nextId)||s.nextId<0||s.nextId>JOBS[s.job].kinds.length||s.nextId!==s.items.length+s.packed.length||typeof s.started!=='boolean'||typeof s.delivered!=='boolean')return null;
 const g=JOBS[s.job].kinds;if(s.packed.some((it,i)=>it.kind!==g[i]||typeof it.shiny!=='boolean')||s.items.some((it,i)=>it.id!==s.packed.length+i||it.kind!==g[it.id]||!Number.isFinite(it.x)||it.x<0||it.x>=1||!Number.isInteger(it.stage)||it.stage<0||it.stage>3||it.stage!==(it.x>=.83?3:it.x>=.56?2:it.x>=.25?1:0)||typeof it.shiny!=='boolean'))return null;
 if(s.items.some((it,i)=>i&&it.x>s.items[i-1].x)||s.status==='won'&&(!s.delivered||s.packed.length!==g.length)||s.status==='active'&&s.delivered)return null;s.holding=false;s.events=[];return {s,p};}catch{return null;}}

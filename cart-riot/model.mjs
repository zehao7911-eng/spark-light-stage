export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const STREETS=[
 {name:'Market Mile',tag:'SMASH THE CRATES',length:250,smash:18,chain:6,theme:0,rule:'Wood bursts. Iron bumps. Lift to hop.',feature:'Stacks of fruit crates'},
 {name:'Cone Comedy',tag:'THREAD THE WORKS',length:310,smash:22,chain:7,theme:0,rule:'Hop the low bars. Steer around the tall ones.',feature:'Slalom works + low barriers'},
 {name:'Boardwalk Bounce',tag:'TAKE THE RAMPS',length:350,smash:25,chain:8,theme:1,rule:'Ramps give you air. Land in the crates.',feature:'Launch ramps + wide landing stacks'},
 {name:'Rush Hour',tag:'MAKE SOME ROOM',length:380,smash:26,chain:9,theme:0,rule:'Carts cross the road. Catch their wake.',feature:'Moving carts + close-pass boosts'},
 {name:'Neon Crossing',tag:'MIND THE TRAM',length:410,smash:28,chain:10,theme:2,rule:'Watch the crossing lights, then hop through.',feature:'Telegraphed tram crossings'},
 {name:'Last Checkout',tag:'ONE BIG RIOT',length:450,smash:32,chain:12,theme:2,rule:'Ramps, traffic and a very big finale.',feature:'Speed pads + mixed traffic parade'}
];
export const UPGRADES=[{name:'Spring kit',desc:'Higher hops · bigger landing smash',cost:[45,100,180]},{name:'Soft bumper',desc:'Less slowdown after a bonk',cost:[40,90,160]},{name:'Coin kite',desc:'Pull coins from the next lane',cost:[35,80,150]}];
export function makeProfile(){return{wallet:0,best:Array(6).fill(0),score:Array(6).fill(0),upgrades:[0,0,0],paint:0,bestEndless:0}}
export function rng(s){let x=s.rng|0;x^=x<<13;x^=x>>>17;x^=x<<5;s.rng=x>>>0;return s.rng/4294967296}
const emit=(s,type,data={})=>{s.events.push({type,...data});if(s.events.length>200)s.events.shift()};
export function street(index){if(index<6)return STREETS[index];let i=(index-6)%3;return{name:'After Hours '+(index-5),tag:'KEEP THE RIOT ROLLING',length:Math.min(520,350+(index-6)*12),smash:26+i*3,chain:10+i,theme:i,rule:'A fresh street. Your garage comes with you.',feature:'Seeded mixed street'}}
export function create(index=0,upgrades=[0,0,0],seed=381223){index=clamp(Math.floor(index)||0,0,998);let s={v:1,index,rng:seed>>>0||381223,phase:'ready',t:0,d:0,speed:0,x:0,vx:0,y:0,vy:0,charge:0,held:false,target:0,jumpAge:0,airTime:0,stun:0,inv:0,boost:0,riot:0,riotTime:0,combo:0,comboTime:0,bestCombo:0,smashes:0,coins:0,score:0,hops:0,bonks:0,near:0,hang:0,runEarned:0,claimed:false,upgrades:Array.from({length:3},(_,i)=>clamp(upgrades[i]|0,0,3)),entities:[],events:[],nextId:1};
 let spec=street(index),spawn=(type,x,z,a={})=>s.entities.push({id:s.nextId++,type,x,z,active:true,passed:false,...a});
 // The first meaningful impact is big, central and close to the cart.
 for(let lane of [-1,0,1])spawn('crate',lane*1.05,10,{stack:lane===0?3:2});
 for(let k=0;k<5;k++)spawn('coin',0,5+k*.7,{height:.7});
 let rows=Math.floor((spec.length-30)/12);
 for(let r=0;r<rows;r++){let z=25+r*12,phase=index>=6?Math.floor(rng(s)*6):r%6,x=index>=6?[-2.6,0,2.6][Math.floor(rng(s)*3)]:((r+index)%2?2.6:-2.6);
  if((index>=2||index>=6)&&phase===1){spawn('ramp',x,z,{w:2.1});for(let lane of [-1,0,1])spawn('crate',x+lane*.85,z+8,{stack:2+((r+index)%2)});for(let k=0;k<5;k++)spawn('coin',x,z+2+k*1.2,{height:1.8+Math.sin(k/4*Math.PI)*1.5});}
  else if((index>=3||index>=6)&&phase===3){spawn('traffic',x,z,{base:x,amplitude:2.1,rate:.65+(index%3)*.13,offset:r*.7});spawn('crate',-x,z+3,{stack:2});}
  else if(index>=4&&phase===5){spawn('tram',0,z,{offset:r*.83,rate:.7,w:1.4});for(let q of [-2.4,0,2.4])spawn('crate',q,z+6,{stack:2});}
  else if(index>=1&&(phase===2||phase===4)){spawn(phase===2?'bar':'barrier',x,z,{w:1.3});for(let q of [-2.5,0,2.5])if(Math.abs(q-x)>1)spawn('crate',q,z+3,{stack:1+(r%3)});}
  else {spawn('crate',x,z,{stack:2+r%2});if(phase===5)spawn('crate',x===0?2.6:-x,z,{stack:1});if(r%3===0)spawn('barrier',r%2?-3.4:3.4,z+5,{w:.8});}
  if(index>=5&&r%4===0)spawn('pad',-x,z+7,{w:2.2});
  for(let k=0;k<4;k++)spawn('coin',x,z+3+k*1.1,{height:.65});
 }
 for(let lane of [-3,-1.5,0,1.5,3])spawn('crate',lane,spec.length-8,{stack:3});
 return s;
}
export function press(s,target){if(!['ready','running'].includes(s.phase)||s.stun>.35)return false;if(s.phase==='ready'){s.phase='running';s.speed=8;emit(s,'start')}s.held=true;s.target=clamp(target,-3.7,3.7);return true}
export function steer(s,target){if(s.held)s.target=clamp(target,-3.7,3.7)}
export function release(s,cancel=false){if(!s.held)return false;s.held=false;if(!cancel&&s.phase==='running'&&s.y<=.03&&s.stun<=0){let c=Math.max(.25,s.charge);s.vy=6.7+c*2.4+s.upgrades[0]*.7;s.y=.035;s.hops++;s.jumpAge=0;emit(s,'hop',{power:c,x:s.x,d:s.d});s.charge=0;return true}s.charge=0;return false}
export function burst(s){if(s.phase!=='running'||s.riot<100)return false;s.riot=0;s.riotTime=2.8;s.boost=3;emit(s,'burst',{x:s.x,d:s.d});return true}
export function ex(s,e){if(e.type==='traffic')return clamp(e.base+Math.sin(s.t*e.rate+e.offset)*e.amplitude,-3.4,3.4);if(e.type==='tram')return Math.sin(s.t*e.rate+e.offset)*6;return e.x}
function chain(s,amount=1){s.combo+=amount;s.comboTime=2.2;s.bestCombo=Math.max(s.bestCombo,s.combo);s.riot=clamp(s.riot+amount*5,0,100);if(s.combo>=3)s.boost=Math.max(s.boost,.6+Math.min(1,s.combo/20));}
function smash(s,e,landing=false){if(!e.active||e.type!=='crate')return;e.active=false;let count=e.stack||1;s.smashes+=count;chain(s,count);let points=count*(20+Math.min(180,s.combo*3));s.score+=points;s.coins+=count;s.runEarned+=count;emit(s,'smash',{id:e.id,x:e.x,d:e.z,stack:count,score:points,combo:s.combo,landing});}
function coin(s,e){e.active=false;s.coins++;s.runEarned++;s.score+=15;s.riot=clamp(s.riot+1.5,0,100);emit(s,'coin',{id:e.id,x:e.x,d:e.z,height:e.height});}
export function tick(s,dt){if(s.phase!=='running')return;dt=clamp(dt,0,.05);s.t+=dt;let before=s.d;s.stun=Math.max(0,s.stun-dt);s.inv=Math.max(0,s.inv-dt);s.boost=Math.max(0,s.boost-dt);s.riotTime=Math.max(0,s.riotTime-dt);s.comboTime=Math.max(0,s.comboTime-dt);if(s.comboTime===0)s.combo=0;
 let desired=(s.held?s.target:s.x),force=s.stun>0?2:14;s.vx+=(clamp((desired-s.x)*force,-18,18)-s.vx)*Math.min(1,dt*11);s.x=clamp(s.x+s.vx*dt,-3.8,3.8);if(Math.abs(s.x)>=3.8)s.vx*=.5;
 let max=13+Math.min(3,s.index*.25)+(s.boost>0?5:0)+(s.riotTime>0?6:0);s.speed+=(max-s.speed)*dt*(s.speed<max?1.2:2.7);s.speed=Math.max(3,s.speed);if(s.held&&s.y<.04&&s.stun===0)s.charge=clamp(s.charge+dt*1.25,0,1);else if(!s.held)s.charge=Math.max(0,s.charge-dt*2);
 let airborne=s.y>0||s.vy>0;if(airborne){s.jumpAge+=dt;s.airTime+=dt;s.hang=Math.max(s.hang,s.jumpAge);s.vy-=20*dt;s.y+=s.vy*dt;if(s.y<=0){s.y=0;s.vy=0;let radius=1.2+s.upgrades[0]*.28+(s.riotTime>0?.9:0);emit(s,'land',{x:s.x,d:s.d,power:s.jumpAge,radius});for(let e of s.entities)if(e.active&&e.type==='crate'&&Math.abs(e.z-s.d)<1.6&&Math.abs(ex(s,e)-s.x)<radius)smash(s,e,true);s.jumpAge=0}}
 s.d+=s.speed*dt;
 for(let e of s.entities){if(!e.active)continue;let dz=e.z-s.d,dx=ex(s,e)-s.x,span=s.speed*dt;
  if(e.type==='coin'){let reach=1.05+s.upgrades[2]*.43;if(dz<reach&&dz>-1.1&&Math.abs(dx)<reach&&Math.abs((e.height||.7)-(s.y+.7))<2)coin(s,e);continue}
  if(e.z<before-2.4){if(!e.passed&&['barrier','traffic','tram','bar'].includes(e.type)){e.passed=true;if(Math.abs(dx)<1.9){s.near++;s.score+=40;s.boost=Math.max(s.boost,.7);emit(s,'near',{x:ex(s,e),d:e.z})}}continue}
  if(dz>1.4||dz<-.5-span)continue;
  if(e.type==='crate'){if(Math.abs(dx)<1.15+(s.riotTime>0?1:0)&&s.y<1.8+(e.stack||1)*.3)smash(s,e);}
  else if(e.type==='pad'){if(Math.abs(dx)<1.5&&s.y<.6){e.active=false;s.boost=3;s.riot=clamp(s.riot+12,0,100);emit(s,'pad',{x:e.x,d:e.z});}}
  else if(e.type==='ramp'){if(Math.abs(dx)<1.3&&s.y<.1){e.active=false;s.y=.02;s.vy=10+s.upgrades[0]*.5;s.hops++;s.jumpAge=0;emit(s,'ramp',{x:e.x,d:e.z});}}
  else {let clearHeight=e.type==='bar'?1.05:e.type==='traffic'?1.3:e.type==='tram'?2.8:2.1;
   if(Math.abs(dx)<(e.type==='tram'?1.4:.92)&&s.y<clearHeight&&s.inv===0){e.passed=true;s.bonks++;s.combo=0;s.comboTime=0;s.speed*=.33+s.upgrades[1]*.13;s.stun=Math.max(.22,.65-s.upgrades[1]*.11);s.inv=1;s.charge=0;s.vx+=(dx>0?-1:1)*3;emit(s,'bonk',{x:ex(s,e),d:e.z,type:e.type});}
  }
 }
 if(s.d>=street(s.index).length){s.d=street(s.index).length;s.phase='finish';s.held=false;s.charge=0;s.y=0;s.vy=0;emit(s,'finish',{badges:badges(s)})}
}
export function badges(s){let q=street(s.index);return s.smashes<q.smash?0:1+(s.bestCombo>=q.chain?1:0)+(s.hops>=3||s.bonks===0?1:0)}
export function claim(s,p){if(s.phase!=='finish'||s.claimed)return false;s.claimed=true;let b=badges(s),better=0;if(s.index<6){better=Math.max(0,b-p.best[s.index]);p.best[s.index]=Math.max(b,p.best[s.index]);p.score[s.index]=Math.max(p.score[s.index],Math.floor(s.score));}else p.bestEndless=Math.max(p.bestEndless,s.index-5);let earned=Math.min(100,s.runEarned)+better*15;p.wallet+=earned;s.payment={earned,better,badges:b};emit(s,'paid',{earned,better});return s.payment}
export function buy(p,i){if(!Number.isInteger(i)||i<0||i>2)return false;let level=p.upgrades[i],cost=UPGRADES[i].cost[level];if(cost===undefined||p.wallet<cost)return false;p.wallet-=cost;p.upgrades[i]++;return true}
export function unlocked(p){let n=p.best.findIndex(b=>b===0);return n<0?6:n+1}
export function medalTotal(p){return p.best.reduce((a,b)=>a+b,0)}
export function paintUnlocked(p,i){return i===0||i===1&&medalTotal(p)>=6||i===2&&medalTotal(p)>=12}
export function drain(s){return s.events.splice(0)}
export function pack(s){let out={...s,held:false,target:s.x,charge:0,events:[],upgrades:s.upgrades.slice(),entities:s.entities.map(e=>({...e}))};return out}
export function unpack(o){if(!o||o.v!==1||!Number.isInteger(o.index)||o.index<0||o.index>998||!['ready','running','finish'].includes(o.phase)||!Array.isArray(o.entities)||o.entities.length>350)return null;let s=create(o.index,o.upgrades,o.rng);for(let k of ['t','d','speed','x','vx','y','vy','jumpAge','airTime','stun','inv','boost','riot','riotTime','combo','comboTime','bestCombo','smashes','coins','score','hops','bonks','near','hang','runEarned']){if(!Number.isFinite(o[k]))return null;s[k]=o[k]}if(s.d<0||s.d>street(s.index).length+.1||Math.abs(s.x)>4||s.y<0||s.y>20||s.speed<0||s.speed>60||s.score<0)return null;s.phase=o.phase;s.rng=o.rng>>>0||1;s.claimed=!!o.claimed;s.nextId=o.nextId|0;s.payment=o.payment&&Number.isFinite(o.payment.earned)?{earned:clamp(o.payment.earned,0,145),better:clamp(o.payment.better|0,0,3),badges:clamp(o.payment.badges|0,0,3)}:null;s.entities=[];for(let e of o.entities){if(!['crate','coin','ramp','bar','barrier','traffic','tram','pad'].includes(e.type)||!Number.isFinite(e.x)||!Number.isFinite(e.z))return null;let a={id:e.id|0,type:e.type,x:clamp(e.x,-8,8),z:clamp(e.z,0,600),active:!!e.active,passed:!!e.passed};for(let k of ['stack','height','w','base','amplitude','rate','offset'])if(Number.isFinite(e[k]))a[k]=e[k];s.entities.push(a)}s.held=false;s.target=s.x;s.charge=0;s.events=[];return s}
export function profileFrom(o){let p=makeProfile();if(!o)return p;p.wallet=clamp(Number(o.wallet)||0,0,999999);p.best=Array.from({length:6},(_,i)=>clamp(o.best?.[i]|0,0,3));p.score=Array.from({length:6},(_,i)=>clamp(Number(o.score?.[i])||0,0,1e9));p.upgrades=Array.from({length:3},(_,i)=>clamp(o.upgrades?.[i]|0,0,3));p.paint=clamp(o.paint|0,0,2);if(!paintUnlocked(p,p.paint))p.paint=0;p.bestEndless=clamp(o.bestEndless|0,0,993);return p}

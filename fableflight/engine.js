(function(root){
'use strict';
const UPGRADES={
 power:{name:'Bowcraft',desc:'Stronger arrows',base:12,growth:1.43,max:24,icon:'bow'},
 speed:{name:'Quickdraw',desc:'Shorter draw time',base:22,growth:1.58,max:12,icon:'speed'},
 fortune:{name:'Golden tips',desc:'More coins per target',base:26,growth:1.55,max:12,icon:'coin'},
 multi:{name:'Splitshot',desc:'An extra arrow per volley',base:95,growth:3.1,max:3,icon:'multi'},
 pierce:{name:'Threadshot',desc:'Arrows pass through targets',base:180,growth:3.8,max:2,icon:'pierce'},
 helper:{name:'Clockwork bow',desc:'Trains automatically',base:45,growth:3.5,max:3,icon:'helper'}
};
const RUNES=[{id:'plain',name:'Oak',trial:0,cost:0,desc:'Reliable arrows. No magic needed.'},{id:'fire',name:'Ember',trial:1,cost:1,desc:'A burst hits every nearby target.'},{id:'frost',name:'Frost',trial:2,cost:2,desc:'Freeze targets. Frozen hits earn 50% more.'},{id:'storm',name:'Storm',trial:3,cost:3,desc:'Lightning jumps across the range.'}];
const QUESTS=[{name:'First feathers',desc:'Break 10 targets',key:'kills',goal:10,gold:45},{name:'A better bow',desc:'Buy 5 upgrades',key:'bought',goal:5,gold:90},{name:'Make your mark',desc:'Win the first trial',key:'best',goal:1,gold:150},{name:'A little magic',desc:'Use an elemental arrow',key:'magic',goal:1,gold:180},{name:'Small workshop',desc:'Own a clockwork bow',key:'helpers',goal:1,gold:100},{name:'Target collector',desc:'Break 100 targets',key:'kills',goal:100,gold:250},{name:'Across the valley',desc:'Win trial 3',key:'best',goal:3,gold:400},{name:'A storm of arrows',desc:'Fire 250 volleys',key:'shots',goal:250,gold:500},{name:'The master bowyer',desc:'Buy 30 upgrades',key:'bought',goal:30,gold:900},{name:'The sun gate',desc:'Win trial 6',key:'best',goal:6,gold:1600},{name:'Living legend',desc:'Win trial 10',key:'best',goal:10,gold:3000},{name:'A new beginning',desc:'Perform a renewal',key:'renewals',goal:1,gold:600}];
const AREAS=[{name:'Briar Meadow',need:0,types:[0,1],tier:1},{name:'Moonwater Grove',need:3,types:[2,3],tier:2.2},{name:'Sunspire Ruins',need:6,types:[4,5],tier:5}];
const TYPES=['Straw bundle','Oak wheel','Crystal bloom','Moon bell','Sun disc','Runestone'];
function fresh(){return {v:1,seed:20261013,coins:0,seals:0,crests:0,trial:0,best:0,area:0,rune:'plain',runes:['plain'],up:Object.fromEntries(Object.keys(UPGRADES).map(k=>[k,0])),stats:{kills:0,shots:0,bought:0,magic:0,crit:0,helpers:0,renewals:0,earned:0},claimed:[],collection:[0,0,0,0,0,0],started:false,auto:true,sound:true,motion:true,targets:[],pending:[],clock:0,cool:0,helperCool:0,focus:0,burst:0,combo:0,comboLife:0,nextId:1,challenge:null,result:null,saved:Date.now()};}
function rand(g){g.seed=(Math.imul(g.seed,1664525)+1013904223)>>>0;return g.seed/4294967296;}
function power(g){return 4*Math.pow(1.29,g.up.power)*(1+.2*g.crests);}
function interval(g){return Math.max(.24,1.05*Math.pow(.90,g.up.speed))/(g.burst>0?1.65:1);}
function cost(g,k){return Math.ceil(UPGRADES[k].base*Math.pow(UPGRADES[k].growth,g.up[k]));}
function income(g){return (1+.25*g.up.fortune)*(1+.25*g.crests);}
function reward(g,n){n=Math.max(0,Math.round(n));g.coins+=n;g.stats.earned+=n;return n;}
function target(g,i,trial=false,boss=false){const a=AREAS[g.area],type=trial?(g.challenge.level-1)%6:a.types[i%a.types.length];const hp=trial?Math.ceil((boss?90:20)*Math.pow(1.57,g.challenge.level-1)):Math.ceil((type%2?16:10)*a.tier);return{id:g.nextId++,type,x:boss?345:235+i*63,y:boss?153:150+(i%2?5:-5),hp,max:hp,boss,hit:0,frozen:0,phase:rand(g)*6.28,slot:i};}
function fill(g){if(g.challenge||g.result)return;for(let i=0;i<4;i++)if(!g.targets.some(t=>t.slot===i))g.targets.push(target(g,i));}
function buy(g,k){const u=UPGRADES[k];if(!u||g.up[k]>=u.max||g.coins<cost(g,k))return false;g.coins-=cost(g,k);g.up[k]++;g.stats.bought++;g.stats.helpers=g.up.helper;return true;}
function unlock(g,r){const u=RUNES.find(x=>x.id===r);if(!u)return false;if(!g.runes.includes(r)){if(g.best<u.trial||g.seals<u.cost)return false;g.seals-=u.cost;g.runes.push(r);}g.rune=r;return true;}
function selectArea(g,i){if(!AREAS[i]||g.best<AREAS[i].need||g.challenge||g.result)return false;g.area=i;g.targets=[];g.pending=[];fill(g);return true;}
function shoot(g,emit=()=>{},manual=true,priority=0){if(!g.started||g.result||!g.targets.length||manual&&g.cool>0)return false;if(manual)g.cool=interval(g);g.stats.shots++;g.focus=Math.min(100,g.focus+(manual?5:2));if(g.rune!=='plain')g.stats.magic++;
 let list=[...g.targets].sort((a,b)=>(a.id===priority?-1:b.id===priority?1:a.x-b.x));
 const count=Math.min(list.length,1+g.up.multi);for(let i=0;i<count;i++){const t=list[i],crit=rand(g)<.12+.012*g.up.fortune;const b={id:t.id,x:t.x,y:t.y,delay:.20+(t.x-75)/800,damage:power(g)*(crit?2:1)*(g.burst>0?1.35:1),crit,manual,rune:g.rune};g.pending.push(b);emit({type:'shot',...b});}emit({type:'draw',manual});return true;
}
function damage(g,t,n,emit,b,secondary=false){if(t.hp<=0)return;t.hp=Math.max(0,t.hp-n);t.hit=.16;emit({type:'hit',id:t.id,x:t.x,y:t.y,amount:n,crit:b.crit&&!secondary,rune:b.rune,secondary});if(t.hp>0)return;
 g.stats.kills++;g.collection[t.type]++;if(b.crit)g.stats.crit++;g.combo=Math.min(20,g.combo+1);g.comboLife=4;const gold=reward(g,(g.challenge?5:4+2*AREAS[g.area].tier)*income(g)*(1+Math.min(g.combo,10)*.04)*(t.frozen>0?1.5:1)*(b.manual?1.2:1));emit({type:'break',x:t.x,y:t.y,gold,kind:t.type,boss:t.boss});
}
function impact(g,b,emit){const t=g.targets.find(x=>x.id===b.id&&x.hp>0);if(!t)return;const others=g.targets.filter(x=>x.id!==t.id&&x.hp>0).sort((a,c)=>Math.abs(a.x-t.x)-Math.abs(c.x-t.x));
 if(b.rune==='frost')t.frozen=4;
 damage(g,t,b.damage,emit,b);
 if(b.rune==='fire'){for(const o of others.filter(o=>Math.abs(o.x-t.x)<85))damage(g,o,b.damage*.45,emit,b,true);emit({type:'blast',x:t.x,y:t.y,rune:b.rune});}
 if(b.rune==='storm'){let previous=t;for(const o of others.slice(0,2)){emit({type:'chain',x:previous.x,y:previous.y,x2:o.x,y2:o.y});damage(g,o,b.damage*.55,emit,b,true);previous=o;}}
 if(b.rune==='frost')emit({type:'blast',x:t.x,y:t.y,rune:b.rune});
 for(const o of others.slice(0,g.up.pierce)){emit({type:'pierce',x:t.x,y:t.y,x2:o.x,y2:o.y});damage(g,o,b.damage*.65,emit,b,true);}
}
function trialPower(g){const l=g.trial+1;return Math.ceil(11*Math.pow(1.57,l-1));}
function dps(g){return power(g)*(1+g.up.multi*.65)*(1+g.up.pierce*.4)*(g.rune==='fire'?1.35:g.rune==='storm'?1.65:1)/interval(g)*(g.up.helper&&g.auto?1.4+.2*g.up.helper:1);}
function spawnWave(g){g.targets=[];g.pending=[];if(g.challenge.wave===3)g.targets=[target(g,0,true,true)];else for(let i=0;i<3;i++)g.targets.push(target(g,i,true));}
function startTrial(g){if(g.challenge||g.result||!g.started)return false;g.challenge={level:g.trial+1,wave:0,time:40};g.combo=0;g.cool=0;spawnWave(g);return true;}
function endTrial(g,win,emit){const l=g.challenge.level;let gold=0,seals=0;if(win){g.trial=l;seals=l>g.best?1:0;g.best=Math.max(g.best,l);g.seals+=seals;gold=reward(g,Math.round(100*Math.pow(1.6,l-1))*income(g));}g.challenge=null;g.targets=[];g.pending=[];g.result={win,level:l,gold,seals};emit({type:win?'win':'lose',level:l,gold,seals});}
function closeResult(g){if(!g.result)return false;g.result=null;fill(g);return true;}
function burst(g){if(g.focus<100||g.result)return false;g.focus=0;g.burst=8;g.cool=0;return true;}
function questProgress(g,q){return q.key==='best'?g.best:g.stats[q.key]||0;}
function claim(g,i){const q=QUESTS[i];if(!q||g.claimed.includes(i)||questProgress(g,q)<q.goal)return false;g.claimed.push(i);reward(g,q.gold);return true;}
function renew(g){if(g.trial<8||g.challenge||g.result)return false;const gain=Math.floor(g.trial/4);g.crests+=gain;g.trial=0;g.coins=80;for(const k in g.up)g.up[k]=0;g.stats.helpers=0;g.stats.renewals++;g.targets=[];g.pending=[];g.focus=0;g.burst=0;g.cool=0;g.helperCool=0;g.area=0;fill(g);return gain;}
function step(g,dt,input={},emit=()=>{}){if(!g.started||g.result)return;dt=Math.min(.1,Math.max(0,dt));g.clock+=dt;g.cool=Math.max(0,g.cool-dt);g.helperCool=Math.max(0,g.helperCool-dt);g.burst=Math.max(0,g.burst-dt);g.comboLife=Math.max(0,g.comboLife-dt);if(!g.comboLife)g.combo=0;
 for(const t of g.targets){t.hit=Math.max(0,t.hit-dt);t.frozen=Math.max(0,t.frozen-dt);}
 const due=[];g.pending=g.pending.filter(b=>{b.delay-=dt;if(b.delay<=0){due.push(b);return false;}return true;});for(const b of due)impact(g,b,emit);g.targets=g.targets.filter(t=>t.hp>0);
 if(g.challenge){g.challenge.time-=dt;if(!g.targets.length){if(g.challenge.wave===3){endTrial(g,true,emit);return;}g.challenge.wave++;spawnWave(g);emit({type:'wave',wave:g.challenge.wave});}if(g.challenge.time<=0){endTrial(g,false,emit);return;}}
 else fill(g);
 if(input.held&&g.cool<=0)shoot(g,emit,true,input.priority);
 if(g.up.helper&&g.auto&&g.helperCool<=0){shoot(g,emit,false,input.priority);g.helperCool=interval(g)*(2.4-.45*g.up.helper);}
}
function serialize(g){return JSON.stringify({...g,saved:Date.now()});}
function restore(text){try{const d=JSON.parse(text),g=fresh(),shape=fresh();if(!d||d.v!==1||!d.up||!d.stats)return null;for(const k of Object.keys(g))if(d[k]!==undefined)g[k]=d[k];for(const k in shape){if(typeof shape[k]==='number'&&(!Number.isFinite(g[k])||g[k]<0))return null;if(typeof shape[k]==='boolean'&&typeof g[k]!=='boolean')return null;}for(const k in UPGRADES)if(!Number.isInteger(g.up[k])||g.up[k]<0||g.up[k]>UPGRADES[k].max)return null;for(const k in shape.stats)if(!Number.isFinite(g.stats[k])||g.stats[k]<0)return null;if(!AREAS[g.area]||!Number.isInteger(g.trial)||g.best<g.trial||!Array.isArray(g.runes)||!g.runes.includes(g.rune)||g.runes.some(r=>!RUNES.some(x=>x.id===r)))return null;if(!Array.isArray(g.targets)||g.targets.length>4||!Array.isArray(g.pending)||g.pending.length>64||!Array.isArray(g.claimed)||g.claimed.some(i=>!Number.isInteger(i)||!QUESTS[i])||!Array.isArray(g.collection)||g.collection.length!==6||g.collection.some(n=>!Number.isFinite(n)||n<0))return null;for(const t of g.targets)if(!Number.isInteger(t.id)||!Number.isFinite(t.hp)||!Number.isFinite(t.max)||t.hp<0||t.hp>t.max||t.max<=0||!TYPES[t.type]||!Number.isFinite(t.x)||!Number.isFinite(t.y))return null;for(const b of g.pending)if(!Number.isFinite(b.delay)||!Number.isFinite(b.damage)||b.damage<0||!RUNES.some(r=>r.id===b.rune))return null;if(g.challenge&&(!Number.isInteger(g.challenge.level)||!Number.isInteger(g.challenge.wave)||g.challenge.wave<0||g.challenge.wave>3||!Number.isFinite(g.challenge.time)||g.challenge.time<0||g.challenge.time>40))return null;if(g.result&&(typeof g.result.win!=='boolean'||!Number.isFinite(g.result.gold)||!Number.isInteger(g.result.level)))return null;return g;}catch{return null;}}
function offline(g,now=Date.now()){if(!g.started||!g.auto||!g.up.helper||g.challenge||g.result)return 0;const seconds=Math.min(7200,Math.max(0,(now-g.saved)/1000));if(seconds<60)return 0;const rate=Math.min(8+g.up.power,Math.max(.2,power(g)/20))*income(g)/(interval(g)*(2.4-.45*g.up.helper));const n=reward(g,seconds*rate*.25);g.saved=now;return n;}
const api={UPGRADES,RUNES,QUESTS,AREAS,TYPES,fresh,rand,power,interval,cost,income,reward,fill,buy,unlock,selectArea,shoot,trialPower,dps,startTrial,closeResult,burst,questProgress,claim,renew,step,serialize,restore,offline};
if(typeof module!=='undefined')module.exports=api;else root.Fable=api;
})(typeof window!=='undefined'?window:globalThis);

/* MOTHMARK pure rules. Browser and Node share this exact implementation. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.MothRules=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const VERSION=1;
const SPECIES=[
 ['MINTWING',[0,1],1,6],['DEWTAIL',[1,0],1,7],['AMBERMOTH',[0,0],2,8],['VIOLETWING',[2,1],2,9],
 ['ROSEVEIL',[1,1],3,10],['FERNSKIP',[1,0,1],4,12],['MOONMOTH',[2,2,0],5,15],['COPPERFIN',[0,1,0],6,16],
 ['GLASSWING',[2,1,2],7,18],['STARDUST',[0,2,0],8,20],['SILKMOON',[2,1,0],10,24],['AURORA',[0,1,2,0],12,32]
].map((s,id)=>({id,name:s[0],needs:s[1],night:s[2],reward:s[3]}));
const TOOLS=[{name:'LANTERN',rune:0,unlock:1},{name:'HERBS',rune:1,unlock:1},{name:'LENS',rune:2,unlock:2},{name:'FIELD JAR',rune:3,unlock:2},{name:'DUSKKEEP',rune:4,unlock:3},{name:'MOON SEAL',rune:5,unlock:5}];
const UPGRADES=[{name:'LANTERN',icon:0,description:'More Glow each level. Extra light can reach the other moth.',base:14,max:4},
{name:'HERB GARDEN',icon:1,description:'More Scent each level. Level 2 also helps the other moth.',base:18,max:4},
{name:'MOON LENS',icon:2,description:'More Moonlight each level. Extra light can reach the other moth.',base:22,max:4},
{name:'FIELD BAG',icon:3,description:'Two more tool plays every night. Level 2 adds a free sigil at dusk.',base:20,max:4}];
const EVENTS=[{name:'DEW',tip:'New discoveries earn 6 extra gold.'},{name:'POLLEN',tip:'Each Herbs play earns 3 extra gold.'},{name:'MOONRISE',tip:'Every Moon Lens play fills one extra Moon.'},{name:'LANTERN FAIR',tip:'Every third capture awards 10 extra gold.'}];
function fresh(seed){return{version:VERSION,rng:(seed===undefined?Date.now():seed)>>>0||1,night:1,coins:0,collection:Array(12).fill(0),upgrades:[0,0,0,0],total:0,best:0,started:false,run:null,sound:true,finished:false};}
function random(s){let x=s.rng>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;s.rng=x>>>0;return s.rng/4294967296;}
function pick(s,a){return a[Math.floor(random(s)*a.length)];}
function needed(v){return v.needs.filter((_,i)=>!v.filled[i]);}
function available(s){return TOOLS.map((_,i)=>i).filter(i=>TOOLS[i].unlock<=s.night);}
function spawn(s,slot,preferNew=false){const pool=SPECIES.filter(x=>x.night<=s.night&&(!s.run||!s.run.visitors.some((v,i)=>i!==slot&&v.id===x.id)));const unseen=pool.filter(x=>!s.collection[x.id]);const spec=pick(s,unseen.length&&(preferNew||random(s)<.46)?unseen:pool.length?pool:SPECIES.slice(0,2));return{id:spec.id,needs:[...spec.needs],filled:spec.needs.map(()=>false)};}
function cost(s,i){return Math.round(UPGRADES[i].base*Math.pow(1.9,s.upgrades[i]));}
function goal(s){return Math.min(6,3+Math.floor((s.night-1)/3));}
function makeHand(s){const ids=available(s);return[0,1,pick(s,ids)];}
function canTool(s,id){if(!s.run)return false;return id>=3||s.run.visitors.some(v=>needed(v).includes(id));}
function ensureHand(s){if(!s.run.hand.some(id=>canTool(s,id))){const ns=s.run.visitors.flatMap(needed);s.run.hand[0]=pick(s,ns);}}
function begin(s){if(s.run)return false;s.started=true;s.run={moves:12+s.upgrades[3]*2,maxMoves:12+s.upgrades[3]*2,caught:0,earned:0,streak:0,best:0,event:(s.night-1)%4,selected:0,visitors:[],hand:[],done:false};s.run.visitors.push(spawn(s,0,true));s.run.visitors.push(spawn(s,1,true));s.run.hand=makeHand(s);if(s.upgrades[3]>=2)s.run.visitors.forEach(v=>v.filled[0]=true);ensureHand(s);return true;}
function fill(v,rune,power){let n=0;for(let i=0;i<v.needs.length&&n<power;i++){if(!v.filled[i]&&(rune===3||v.needs[i]===rune)){v.filled[i]=true;n++;}}return n;}
function play(s,handIndex){
 const run=s.run;if(!run||run.done||handIndex<0||handIndex>2)return{ok:false};const id=run.hand[handIndex];
 if(!canTool(s,id))return{ok:false,reason:'Choose a matching sigil.'};
 const result={ok:true,tool:id,hits:[],captures:[],coins:0,unlocks:[],streak:0};
 let target=run.selected;if(id<3&&!needed(run.visitors[target]).includes(id))target=1-target;
 run.selected=target;let power=1+s.upgrades[Math.min(id,2)];if(id===2&&run.event===2)power++;
 const hit=(slot,rune,p)=>{const n=fill(run.visitors[slot],rune,p);if(n)result.hits.push({slot,count:n});return n;};
 if(id===4){hit(target,3,1);hit(1-target,3,1);}
 else if(id===5){hit(target,3,needed(run.visitors[target]).length<=2?2:1);}
 else if(id===3){hit(target,3,1);}
 else{const used=hit(target,id,power);if(power>used)hit(1-target,id,power-used);if(id===1&&s.upgrades[1]>=2)hit(1-target,1,1);}
 run.moves--;run.streak++;run.best=Math.max(run.best,run.streak);result.streak=run.streak;
 if(id===1&&run.event===1){s.coins+=3;run.earned+=3;result.coins+=3;}
 for(let slot=0;slot<2;slot++){
  const v=run.visitors[slot];if(v.filled.every(Boolean)){
   const spec=SPECIES[v.id],isNew=s.collection[v.id]===0;const chain=Math.min(5,Math.floor(run.streak/3));let reward=spec.reward+(isNew?10:0)+chain;
   if(isNew&&run.event===0)reward+=6;
   run.caught++;if(run.event===3&&run.caught%3===0)reward+=10;
   s.collection[v.id]++;s.total++;s.coins+=reward;run.earned+=reward;result.coins+=reward;
   result.captures.push({slot,id:v.id,isNew,reward});
   run.visitors[slot]=spawn(s,slot,false);
  }
 }
 run.hand[handIndex]=pick(s,available(s));ensureHand(s);
 if(run.moves===0){run.done=true;s.best=Math.max(s.best,s.night);}
 return result;
}
function select(s,i){if(s.run&&i>=0&&i<2)s.run.selected=i;}
function end(s){const r=s.run;if(!r||(!r.done&&r.caught<goal(s)))return{ok:false};const success=r.caught>=goal(s),oldNight=s.night;const bonus=success?8+s.night*2:4;const summary={ok:true,success,night:s.night,caught:r.caught,earned:r.earned+bonus,bonus,streak:r.best,newTools:[],newSpecies:[],finished:false};s.coins+=bonus;s.best=Math.max(s.best,success?s.night:Math.max(0,s.night-1));if(success)s.night++;s.run=null;if(success){summary.newTools=TOOLS.filter(t=>t.unlock===s.night).map(t=>t.name);summary.newSpecies=SPECIES.filter(t=>t.night===s.night).map(t=>t.name);}if(oldNight===12&&success&&!s.finished){s.finished=true;summary.finished=true;}return summary;}
function buy(s,i){if(s.run||i<0||i>=UPGRADES.length||s.upgrades[i]>=UPGRADES[i].max)return false;const c=cost(s,i);if(s.coins<c)return false;s.coins-=c;s.upgrades[i]++;return true;}
function restore(raw){
 try{const v=typeof raw==='string'?JSON.parse(raw):raw;if(!v||v.version!==VERSION)return null;
 const n=(x,a,b)=>Number.isInteger(x)&&x>=a&&x<=b;
 if(!n(v.rng,0,4294967295)||!n(v.night,1,999999)||!n(v.coins,0,1e12)||!Array.isArray(v.collection)||v.collection.length!==12||!v.collection.every(x=>n(x,0,1e9))||!Array.isArray(v.upgrades)||v.upgrades.length!==4||!v.upgrades.every(x=>n(x,0,4))||!n(v.total,0,1e10)||!n(v.best,0,999999)||typeof v.sound!=='boolean'||typeof v.started!=='boolean'||typeof v.finished!=='boolean')return null;
 if(v.run){const r=v.run;if(!n(r.moves,0,20)||!n(r.maxMoves,12,20)||r.moves>r.maxMoves||!n(r.caught,0,100)||!n(r.earned,0,1e9)||!n(r.event,0,3)||!n(r.selected,0,1)||!n(r.streak,0,20)||!n(r.best,0,20)||typeof r.done!=='boolean'||!Array.isArray(r.hand)||r.hand.length!==3||!r.hand.every(i=>n(i,0,5)&&TOOLS[i].unlock<=v.night)||!Array.isArray(r.visitors)||r.visitors.length!==2)return null;
 for(const t of r.visitors)if(!n(t.id,0,11)||!Array.isArray(t.needs)||JSON.stringify(t.needs)!==JSON.stringify(SPECIES[t.id].needs)||!Array.isArray(t.filled)||t.filled.length!==t.needs.length||!t.filled.every(x=>typeof x==='boolean')||SPECIES[t.id].night>v.night)return null;
 if(r.done!==(r.moves===0))return null;
 }return JSON.parse(JSON.stringify(v));
 }catch(_){return null;}
}
return{VERSION,SPECIES,TOOLS,UPGRADES,EVENTS,fresh,needed,available,goal,cost,begin,play,end,buy,select,restore,canTool};
});

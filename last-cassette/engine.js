(function(root){
'use strict';
const TYPES=['grip','focus','care','heart'];
const PLACES=[
 {name:'Pinewater',biome:'village',label:'HOME',subtitle:'One old car. A whole summer ahead.'},
 {name:'Goldfield',biome:'field',label:'FARM ROAD',subtitle:'The sunflowers turn toward the road.'},
 {name:'Fern Hollow',biome:'forest',label:'WOODLAND',subtitle:'Pine needles. Wet earth. An open window.'},
 {name:'Juniper Pass',biome:'mountain',label:'HIGH COUNTRY',subtitle:'The engine echoes between the cliffs.'},
 {name:'Saltwater',biome:'coast',label:'COAST ROAD',subtitle:'You can taste the sea in the air.'},
 {name:'Rosewood',biome:'village',label:'SMALL TOWN',subtitle:'Someone has left the diner lights on.'}
];
const EVENTS=[
 {name:'A very slow tractor',note:'A farmer waves you past. Pick your moment.',need:[2,2,0,1],biome:'field',prop:'tractor'},
 {name:'Loose gravel',note:'The rear wheels slide. Keep it smooth.',need:[3,2,0,0],biome:'mountain',prop:'gravel'},
 {name:'Rain on the windshield',note:'Wipers squeak. The bend is closer than it looks.',need:[2,2,1,0],prop:'rain'},
 {name:'The engine coughs',note:'A loose hose, a warm engine, and a little patience.',need:[0,1,3,1],prop:'hood'},
 {name:'Deer crossing',note:'Two tiny silhouettes step out of the pines.',need:[1,3,0,1],biome:'forest',prop:'deer'},
 {name:'A wrong turn',note:'The paper map has a coffee stain right here.',need:[0,3,0,2],prop:'sign'},
 {name:'Loose luggage',note:'Something on the roof is making a terrible racket.',need:[1,1,3,0],prop:'bag'},
 {name:'A lonely hitchhiker',note:'There is room for a story. Stop safely.',need:[1,1,0,3],prop:'person'},
 {name:'A roadside dog',note:'A sleepy dog has claimed the warm asphalt.',need:[1,2,0,2],prop:'dog'},
 {name:'Steep climb',note:'Low gear. Gentle throttle. Almost at the top.',need:[2,1,2,0],biome:'mountain',prop:'gravel'},
 {name:'Fog on the headland',note:'The lighthouse disappears, then appears again.',need:[1,3,1,0],biome:'coast',prop:'fog'},
 {name:'The cassette tangles',note:'Your favourite song needs a pencil and a steady hand.',need:[0,1,2,2],prop:'bag'},
 {name:'A fallen branch',note:'A little teamwork will clear the road.',need:[1,1,2,1],biome:'forest',prop:'branch'},
 {name:'A narrow bridge',note:'A delivery van is coming the other way.',need:[2,3,0,0],prop:'van'},
 {name:'An unexpected parade',note:'The whole town seems to be dancing.',need:[0,2,0,3],biome:'village',prop:'person'},
 {name:'A punctured tyre',note:'Good thing you packed more than just mixtapes.',need:[1,0,3,1],prop:'hood'}
];
const SKILLS=[
 {id:'steady',name:'Steady hands',type:'focus',pattern:[0,2,0,0],cost:3},
 {id:'gear',name:'Low gear',type:'grip',pattern:[2,0,0,0],cost:3},
 {id:'check',name:'Quick check',type:'care',pattern:[0,0,2,0],cost:3},
 {id:'breathe',name:'Deep breath',type:'heart',pattern:[0,0,0,2],cost:3}
];
const PEOPLE=[
 {id:'mara',name:'Mara',role:'MECHANIC',line:'"Every engine has its own heartbeat."',pattern:[1,0,3,0],type:'care',hair:'#8d4c31',shirt:'#78907a',skin:'#dda77a'},
 {id:'leo',name:'Leo',role:'PHOTOGRAPHER',line:'"Take the small road. Always."',pattern:[1,3,0,0],type:'focus',hair:'#3a2e28',shirt:'#c27b50',skin:'#bc8566'},
 {id:'june',name:'June',role:'MUSICIAN',line:'"I made a tape for a day like this."',pattern:[0,1,0,3],type:'heart',hair:'#ac884a',shirt:'#7391a0',skin:'#e5b08a'},
 {id:'sol',name:'Sol',role:'HIKER',line:'"A hill is just a view you have not earned yet."',pattern:[3,0,1,0],type:'grip',hair:'#4b332e',shirt:'#af6260',skin:'#a27154'}
];
function rng(seed){let x=seed>>>0;return()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function start(seed=Date.now()>>>0,destination='festival',meta={}){return{version:1,seed,destination,stage:'stop',leg:0,km:0,place:0,hour:9,day:1,fuel:82,energy:85,car:90,money:68,bag:{snack:2,tools:1,coffee:1},crew:[],visited:[0],choices:[],route:null,event:null,progress:0,perfect:0,detours:0,turns:0,worked:false,offer:PEOPLE[Math.abs(seed)%4].id,paused:false,tape:0,color:meta.color||0,history:[],ending:null}}
function routes(s){const r=rng(s.seed+s.leg*9817);let candidates=[1,2,3,4,5].filter(x=>x!==s.place);for(let j=candidates.length-1;j>0;j--){const k=Math.floor(r()*(j+1));[candidates[j],candidates[k]]=[candidates[k],candidates[j]]}if(s.leg===5)candidates=s.destination==='coast'?[4,4,4]:s.destination==='mountain'?[3,3,3]:[5,5,5];return candidates.slice(0,3).map((place,i)=>({place,kind:['country','scenic','express'][i],fuel:[12,16,10][i],wear:[3,5,7][i],hours:[2,3,1][i],km:[42,59,68][i],weather:['clear','sunset','rain'][Math.floor(r()*3)],event:Math.floor(r()*EVENTS.length),gift:i===1?'postcard':i===0?'snack':'cash'}))}
function choose(s,i){if(s.stage!=='stop'||s.paused)return false;const route=routes(s)[i];if(!route||s.fuel<route.fuel)return false;s.route=route;s.choices.push(i);s.stage='travel';s.progress=0;s.event=null;s.fuel-=route.fuel;s.car-=route.wear;s.worked=false;return true}
function encounter(s){if(s.stage!=='travel')return false;let eligible=EVENTS.map((e,i)=>({e,i})).filter(x=>!x.e.biome||x.e.biome===PLACES[s.route.place].biome);let ev=eligible[s.route.event%eligible.length];let need=ev.e.need.slice();if(s.leg>2)need[s.leg%4]++;s.event={id:ev.i,need,original:need.slice(),uses:{},turn:0,log:'Match the road symbols with a skill.',flawless:true};s.stage='event';return true}
function cards(s){let a=SKILLS.map(x=>({...x,limit:2}));for(const id of s.crew){const p=PEOPLE.find(x=>x.id===id);a.push({id:p.id,name:p.name,pattern:p.pattern,type:p.type,cost:2,limit:1})}if(s.bag.tools)a.push({id:'tools',name:'Tool roll',pattern:[1,0,3,0],type:'care',cost:0,limit:1});if(s.bag.coffee)a.push({id:'coffee',name:'Hot coffee',pattern:[0,3,0,1],type:'focus',cost:0,limit:1});if(s.bag.snack)a.push({id:'snack',name:'Trail snack',pattern:[0,0,0,3],type:'heart',cost:0,limit:1});return a}
function skill(s,id){if(s.stage!=='event'||s.paused)return null;const c=cards(s).find(x=>x.id===id),ev=s.event;if(!c||(ev.uses[id]||0)>=c.limit||s.energy<c.cost)return null;const matched=ev.need.reduce((n,v,i)=>n+Math.min(v,c.pattern[i]),0);if(!matched)return null;const before=ev.need.slice();ev.need=ev.need.map((v,i)=>Math.max(0,v-c.pattern[i]));ev.uses[id]=(ev.uses[id]||0)+1;ev.turn++;s.turns++;s.energy-=c.cost;if(id in s.bag)s.bag[id]--;if(id==='snack')s.energy=Math.min(100,s.energy+10);if(id==='coffee')s.energy=Math.min(100,s.energy+6);if(!ev.need.some(Boolean)){s.perfect+=ev.flawless?1:0;s.stage='travel';s.progress=10;ev.log='CLEAR ROAD';return{matched,before,clear:true}}if(ev.turn%2===0){s.energy=Math.max(0,s.energy-2);s.car=Math.max(0,s.car-1);ev.flawless=false}ev.log=matched+' road symbols cleared';return{matched,before,clear:false}}
function detour(s){if(s.stage!=='event'||s.paused)return false;s.fuel=Math.max(0,s.fuel-5);s.energy=Math.max(0,s.energy-5);s.detours++;s.stage='travel';s.progress=10;s.event.log='A longer way around';return true}
function tick(s,dt){if(s.stage!=='travel'||s.paused)return false;s.progress=Math.min(18,s.progress+dt);if(s.progress>=5&&!s.event)return encounter(s);if(s.progress>=18)return arrive(s);return false}
function arrive(s){s.leg++;s.km+=s.route.km;s.place=s.route.place;s.visited.push(s.place);s.hour+=s.route.hours;if(s.hour>=21){s.day++;s.hour=8}s.energy=Math.max(0,s.energy-6);s.money+=s.route.gift==='cash'?14:6;if(s.route.gift==='snack')s.bag.snack++;s.history.unshift({place:s.place,event:s.event.id,km:s.km});s.history=s.history.slice(0,6);s.offer=PEOPLE[(s.seed+s.leg)%4].id;s.stage='stop';if(s.energy<=0||s.car<=0||s.fuel<=0){s.stage='end';s.ending='rescue'}else if(s.leg>=6){s.stage='end';s.ending=s.destination}return true}
function service(s,id){if(s.stage!=='stop'||s.paused)return false;if(id==='assist'){if(s.fuel>=12&&s.car>=10)return false;s.fuel=Math.max(25,s.fuel);s.car=Math.max(25,s.car);s.energy=Math.max(25,s.energy);s.money=Math.max(0,s.money-10);s.day++;s.hour=9;s.detours++;return true}const costs={fuel:12,repair:15,rest:0,snack:5,tools:9,coffee:5};if(id==='work'){if(s.worked||s.energy<18)return false;s.money+=24;s.energy-=12;s.hour++;s.worked=true;return true}if(!(id in costs)||s.money<costs[id])return false;if((id==='fuel'&&s.fuel===100)||(id==='repair'&&s.car===100)||(id==='rest'&&s.energy===100))return false;s.money-=costs[id];if(id==='fuel')s.fuel=Math.min(100,s.fuel+38);if(id==='repair')s.car=Math.min(100,s.car+35);if(id==='rest'){s.energy=Math.min(100,s.energy+38);s.hour+=2;if(s.hour>=21){s.day++;s.hour=8}}if(id in s.bag)s.bag[id]++;return true}
function recruit(s,id){if(s.stage!=='stop'||s.paused||!PEOPLE.some(p=>p.id===id)||s.crew.includes(id))return false;if(s.crew.length>=2)return false;s.crew.push(id);return true}
function valid(s){
 if(!s||s.version!==1||!['stop','travel','event','end'].includes(s.stage)||!['festival','coast','mountain'].includes(s.destination))return false;
 if(!Number.isFinite(s.seed)||!Number.isInteger(s.leg)||s.leg<0||s.leg>6||!Number.isFinite(s.money)||s.money<0)return false;
 if(!['fuel','car','energy'].every(k=>Number.isFinite(s[k])&&s[k]>=0&&s[k]<=100))return false;
 const place=i=>Number.isInteger(i)&&i>=0&&i<PLACES.length;
 if(!place(s.place)||!Array.isArray(s.visited)||!s.visited.every(place)||!Array.isArray(s.history)||!s.history.every(x=>place(x.place)&&EVENTS[x.event]&&Number.isFinite(x.km)))return false;
 if(!Array.isArray(s.crew)||s.crew.length>2||!s.crew.every(id=>PEOPLE.some(p=>p.id===id))||new Set(s.crew).size!==s.crew.length)return false;
 if(!s.bag||!['snack','tools','coffee'].every(k=>Number.isInteger(s.bag[k])&&s.bag[k]>=0)||!Number.isInteger(s.tape)||s.tape<0||s.tape>2||!Number.isInteger(s.color)||s.color<0||s.color>3)return false;
 if(['travel','event'].includes(s.stage)&&(!s.route||!place(s.route.place)||!Number.isFinite(s.progress)))return false;
 if(s.stage==='event'&&(!s.event||!EVENTS[s.event.id]||!Array.isArray(s.event.need)||s.event.need.length!==4||!s.event.need.every(n=>Number.isInteger(n)&&n>=0)||!s.event.uses))return false;
 return s.stage!=='end'||['festival','coast','mountain','rescue'].includes(s.ending);
}
const api={TYPES,PLACES,EVENTS,SKILLS,PEOPLE,rng,start,routes,choose,encounter,cards,skill,detour,tick,arrive,service,recruit,valid};root.Road=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

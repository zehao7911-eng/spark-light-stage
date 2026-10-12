(function(root){
'use strict';
const REGIONS=['Sunken Garden','Moonfrost Pass','Eclipse Observatory'];
const RELICS=[{id:'dew',name:'Dew charm',desc:'Breaking locks restores 8 HP.',icon:11},{id:'ember',name:'Ember crest',desc:'Sun attacks deal 25% more.',icon:8},{id:'echo',name:'Echo stone',desc:'Perfect hits restore 1 energy.',icon:9},{id:'shell',name:'Stone shell',desc:'Incoming damage is reduced by 2.',icon:7},{id:'feast',name:'Warm hearth',desc:'Soup restores all HP.',icon:10},{id:'edge',name:'Dawn edge',desc:'Blade attacks deal 25% more.',icon:14}];
const cap=(v,a,b)=>Math.max(a,Math.min(b,v));
function fresh(){return {v:1,room:0,cycle:0,mode:'explore',hp:100,coins:0,xp:0,level:1,sword:0,staff:0,coat:0,berries:0,herbs:0,soup:2,relics:[],found:[],cleared:[],medals:[],perfect:0,battles:0,steps:0,opened:[],harvested:[],shrine:[],player:{x:470,y:420},battle:null,reward:null,choice:null};}
function maxHP(s){return 100+s.coat*18+(s.level-1)*6;}
function damage(s,type){return Math.round((type==='blade'?12+s.sword*4:type==='sun'?19+s.sword*5:17+s.staff*5)*(s.relics.includes(type==='sun'?'ember':type==='blade'?'edge':'none')?1.25:1));}
function enemies(s){const r=Math.floor(s.room/4),stage=s.room%4,c=1+Math.min(6,s.cycle)*.12;
 const make=(type,i,boss=false)=>{const hp=Math.round((boss?150+r*35:28+r*10+stage*3)*c);return {id:i,type,hp,max:hp,power:Math.round((boss?16+r*3:8+r*2+stage)*c),locks:boss?['blade',r%2?'moon':'sun','moon']:type===0?['blade','sun']:['moon','blade'],charge:boss?2:2,stun:false,phase:1};};
 return stage===3?[make(2,0,true)]:stage===0?[make(r%2,0)]:[make((r+stage)%2,0),make((r+stage+1)%2,1)];}
function start(s){if(s.mode!=='explore'||s.cleared.includes(s.room))return false;s.mode='battle';s.battle={enemies:enemies(s),energy:3,combo:0,turn:'player',target:0,round:0,guards:[],index:0,perfect:0};return true;}
function alive(s){return s.battle?s.battle.enemies.filter(e=>e.hp>0):[];}
function win(s){const b=s.battle,boss=s.room%4===3;const coins=20+Math.floor(s.room/4)*9+(boss?30:0),xp=boss?24:12;
 s.coins+=coins;s.xp+=xp;while(s.xp>=s.level*30){s.xp-=s.level*30;s.level++;s.hp=Math.min(maxHP(s),s.hp+25);}
 s.berries+=boss?2:1;if(s.room%2)s.herbs++;s.battles++;s.perfect+=b.perfect;
 if(!s.cleared.includes(s.room))s.cleared.push(s.room);if(b.perfect>=2&&!s.medals.includes(s.room))s.medals.push(s.room);
 s.found=Array.from(new Set([...s.found,...b.enemies.map(e=>e.type)]));s.mode='reward';s.reward={coins,xp,boss,perfect:b.perfect,room:s.room};s.battle=null;return {kind:'win',coins,xp,boss};}
function attack(s,type,target,q){const b=s.battle;if(s.mode!=='battle'||b.turn!=='player'||!['blade','sun','moon','eclipse','soup'].includes(type))return null;
 const foe=b.enemies.find(e=>e.id===target&&e.hp>0)||alive(s)[0];if(!foe)return null;
 if(type==='soup'){if(s.soup<1)return null;s.soup--;const heal=s.relics.includes('feast')?maxHP(s):Math.round(maxHP(s)*.6);s.hp=cap(s.hp+heal,0,maxHP(s));return after(s,{kind:'heal',value:heal,hits:[]});}
 const cost=type==='blade'?0:type==='eclipse'?0:2;if(b.energy<cost||type==='eclipse'&&b.combo<3)return null;
 q=cap(Number(q)||0,0,1);const perfect=q>=.85;if(perfect){b.perfect++;b.combo=cap(b.combo+1,0,3);if(s.relics.includes('echo'))b.energy=cap(b.energy+1,0,6);}
 b.energy=cap(b.energy-cost+(type==='blade'?1:0),0,6);if(type==='eclipse')b.combo=0;
 const hits=[],targets=type==='eclipse'?alive(s):[foe];
 for(const e of targets){let amount=Math.round((type==='eclipse'?32+s.sword*3+s.staff*3:damage(s,type))*(1+q*.45));const before=e.locks.length;let n=type==='eclipse'?e.locks.length:perfect?2:1;
 for(let i=e.locks.length-1;i>=0&&n>0;i--)if(type==='eclipse'||e.locks[i]===type){e.locks.splice(i,1);n--;}
 let broken=before>0&&e.locks.length===0;if(broken){amount+=8;e.stun=true;e.charge=2;if(s.relics.includes('dew'))s.hp=cap(s.hp+8,0,maxHP(s));}
 e.hp=Math.max(0,e.hp-amount);if(e.type===2&&e.hp>0&&e.hp<=e.max*.5&&e.phase===1){e.phase=2;e.locks=['sun','moon','blade'];e.charge=2;}
 hits.push({id:e.id,damage:amount,broken,dead:e.hp===0});}
 const result={kind:'attack',type,perfect,hits};if(!alive(s).length)return {...result,...win(s)};return after(s,result);}
function after(s,result){const b=s.battle;if(!alive(s).some(e=>e.id===b.target))b.target=alive(s)[0].id;b.round++;b.guards=[];for(const e of alive(s)){if(e.stun){e.stun=false;e.locks=e.type===2?['sun','moon','blade']:e.type===0?['blade','sun']:['moon','blade'];continue;}e.charge--;if(e.charge<=0){b.guards.push({id:e.id,power:e.power*(e.locks.length?1.65:1)});e.charge=2;}}
 b.index=0;b.turn=b.guards.length?'guard':'player';return {...result,next:b.turn};}
function guard(s,q){const b=s.battle;if(s.mode!=='battle'||b.turn!=='guard')return null;q=cap(Number(q)||0,0,1);const g=b.guards[b.index];let n=Math.max(1,Math.round(g.power*(1-q*.72))-(s.relics.includes('shell')?2:0));s.hp=Math.max(0,s.hp-n);if(q>=.85){b.combo=cap(b.combo+1,0,3);b.perfect++;}b.index++;if(s.hp===0){s.mode='fallen';s.battle=null;return {kind:'fallen',damage:n,id:g.id};}b.turn=b.index<b.guards.length?'guard':'player';return {kind:'guard',damage:n,perfect:q>=.85,id:g.id,next:b.turn};}
function loot(s,kind){if(s.mode!=='explore')return false;const r=s.room;
 if(kind==='chest'&&!s.opened.includes(r)){s.opened.push(r);s.coins+=12+r*2;return {kind,coins:12+r*2};}
 if(kind==='berries'&&!s.harvested.includes(r)){s.harvested.push(r);s.berries+=2;s.herbs++;return {kind,berries:2};}
 if(kind==='shrine'&&!s.shrine.includes(r)){s.shrine.push(r);const n=Math.min(maxHP(s)-s.hp,28);s.hp+=n;return {kind,heal:n};}return false;}
function next(s){if(s.mode!=='explore'||!s.cleared.includes(s.room))return false;if(s.room===11){s.mode='ending';return true;}s.room++;s.player={x:470,y:420};return true;}
function continueReward(s){if(s.mode!=='reward')return false;const boss=s.reward.boss;s.reward=null;s.mode='explore';if(boss){const pool=RELICS.filter(r=>!s.relics.includes(r.id));s.choice=pool.slice(0,3).map(r=>r.id);if(s.choice.length)s.mode='relic';}return true;}
function pick(s,id){if(s.mode!=='relic'||!s.choice.includes(id))return false;s.relics.push(id);s.choice=null;s.mode='explore';return true;}
function camp(s){if(!['explore','fallen'].includes(s.mode))return false;s.mode='camp';s.battle=null;s.hp=maxHP(s);s.player={x:440,y:385};return true;}
function leave(s){if(s.mode!=='camp')return false;s.mode='explore';s.player={x:470,y:420};return true;}
function price(s,item){return item==='soup'?0:30*(s[item]+1);}
function buy(s,item){if(s.mode!=='camp')return false;if(item==='soup'){if(s.berries<2||s.herbs<1)return false;s.berries-=2;s.herbs--;s.soup++;return true;}if(!['sword','staff','coat'].includes(item)||s[item]>=4||s.coins<price(s,item))return false;s.coins-=price(s,item);s[item]++;if(item==='coat')s.hp=maxHP(s);return true;}
function cycle(s){if(s.mode!=='ending')return false;s.cycle++;s.room=0;s.cleared=[];s.opened=[];s.harvested=[];s.shrine=[];s.mode='camp';s.hp=maxHP(s);s.player={x:440,y:385};return true;}
function restore(raw){try{const s=JSON.parse(raw);if(!s||s.v!==1||!Number.isInteger(s.room)||s.room<0||s.room>11||!Array.isArray(s.relics))return fresh();const out={...fresh(),...s};out.hp=cap(out.hp,1,maxHP(out));if(!['explore','battle','camp','fallen','reward','relic','ending'].includes(out.mode))out.mode='camp';if(out.mode==='battle'&&(!out.battle||!out.battle.enemies?.length)){out.mode='camp';out.battle=null;}return out;}catch{return fresh();}}
const API={fresh,maxHP,damage,start,attack,guard,loot,next,continueReward,pick,camp,leave,price,buy,cycle,restore,alive,REGIONS,RELICS};if(typeof module!=='undefined')module.exports=API;else root.Vale=API;
})(typeof window!=='undefined'?window:globalThis);

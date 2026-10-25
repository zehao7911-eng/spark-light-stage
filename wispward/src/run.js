import Engine from './core/index.ts';
import {PlayMode} from './core/types.ts';
import {prove,around} from './logic.js';

export const VERSION=1;
export const THEMES=[{name:'Moonwell Garden',color:'#9fbb9c',mod:'A quiet place to begin.'},{name:'The Glass Archive',color:'#9e9ac7',mod:'Old secrets glow beneath the glass.'},{name:'Starfall Sanctum',color:'#ddb77a',mod:'The last lantern waits for you.'}];
export const ROLES=[{name:'Wayfinder',art:0,unlock:0,text:'One extra Guidelight each chamber.'},{name:'Mosskeeper',art:1,unlock:3,text:'Heal 1 after a chain of 8 or more.'},{name:'Clockmender',art:2,unlock:8,text:'One extra Ward each chamber.'}];
export const ITEMS=[
 {id:'bell',name:'Dew Bell',icon:3,text:'Heal 1 after a chain of at least 6.',kind:'common'},
 {id:'compass',name:'Star Compass',icon:4,text:'Gain 1 extra Guidelight per chamber.',kind:'rare'},
 {id:'shell',name:'Pearl Shell',icon:5,text:'Gain 1 extra Ward per chamber.',kind:'common'},
 {id:'clover',name:'Silver Clover',icon:6,text:'Gain 1 extra gold from every treasure.',kind:'common'},
 {id:'needle',name:'Sun Needle',icon:7,text:'Banish gets one extra charge per chamber.',kind:'rare'},
 {id:'flask',name:'Honey Flask',icon:8,text:'Potions heal 2 additional Health.',kind:'common'},
 {id:'feather',name:'Moon Feather',icon:9,text:'Mark all foes correctly to gain 4 gold.',kind:'common'},
 {id:'book',name:'Fern Almanac',icon:10,text:'Guidelight recharges every 8 safe tiles, not 12.',kind:'rare'},
 {id:'gem',name:'Glow Crystal',icon:11,text:'Chamber clear awards 6 extra gold.',kind:'common'},
 {id:'crown',name:'Tiny Crown',icon:12,text:'Every boss clear awards 2 extra stardust.',kind:'rare'},
 {id:'heart',name:'Warm Locket',icon:13,text:'Increase maximum Health by 2; heal 2 now.',kind:'rare'},
 {id:'moth',name:'Ivory Moth',icon:14,text:'The first Guidelight in each chamber is free.',kind:'rare'},
 {id:'hourglass',name:'Soft Hourglass',icon:15,text:'Your first mistake each chamber deals 1 less damage.',kind:'common'},
 {id:'key',name:'Amber Key',icon:16,text:'Every third chamber gives an extra treasure.',kind:'common'},
 {id:'rose',name:'Night Rose',icon:17,text:'Heal 2 when you clear a boss chamber.',kind:'common'},
 {id:'boots',name:'Moss Boots',icon:18,text:'Reveal 3 safe tiles to gain gold, instead of 4.',kind:'common'},
 {id:'eye',name:'Glass Eye',icon:19,text:'Banish a foe to gain 3 gold.',kind:'rare'},
 {id:'lantern',name:'Last Lantern',icon:20,text:'Start every chamber with 2 gold and 1 Guidelight.',kind:'rare'}
];
export const MODS=[{name:'Moonlit',text:'Calm stones. Clear signs.',id:'calm'},{name:'Blooming',text:'Large chains restore 1 Health.',id:'bloom'},{name:'Gilded',text:'Treasures contain 2 extra gold.',id:'gold'},{name:'Echoing',text:'Guidelight charges twice as quickly.',id:'echo'},{name:'Guarded',text:'One extra Ward watches over you.',id:'ward'}];
export function profile(p={}){return {dust:0,clears:0,best:0,runs:0,completed:0,seen:[],...p,upgrades:{heart:0,light:0,pouch:0,...p.upgrades}};}
export function rng(r){let x=r.seed|0;x^=x<<13;x^=x>>>17;x^=x<<5;r.seed=x>>>0;return r.seed/4294967296;}
const choose=(r,x)=>x[Math.floor(rng(r)*x.length)];
export const has=(r,id)=>r.items.includes(id);
export const theme=r=>Math.min(2,Math.floor((r.stage-1)/5));
export const boss=r=>r.stage%5===0;
export function createRun(p=profile(),role=0,seed=Date.now()){
 p=profile(p);if(!ROLES[role]||p.clears<ROLES[role].unlock)throw Error('Role locked');p.runs++;
 const r={version:VERSION,seed:(seed>>>0)||73,p,role,stage:1,hp:8+p.upgrades.heart*2,maxHp:8+p.upgrades.heart*2,gold:20+p.upgrades.pouch*5,phase:'explore',items:[],potion:1,board:null,treasures:[],claimed:[],safeTotal:0,markBonus:false,hitCount:0,chainHeals:0,freeLight:false,lightProgress:0,last:null,offers:[],mod:MODS[0],victory:false};
 nextBoard(r);return r;
}
function requestedMines(r){return Math.min(11,4+Math.floor((r.stage-1)*.48)+Math.floor(r.p.completed/2));}
function connect(r,game){game.subscribe(()=>{});game.onMine=()=>{r.hitCount++;let damage=2+Math.floor(theme(r)/2);if(r.ward>0){r.ward--;damage=0;}else if(has(r,'hourglass')&&r.hitCount===1)damage=Math.max(0,damage-1);r.hp=Math.max(0,r.hp-damage);r.hitDamage=damage;return r.hp>0;};return game;}
export function nextBoard(r){
 const h=r.stage<=3?6:r.stage<=8?7:8;
 r.board=connect(r,new Engine(6,h,requestedMines(r),()=>rng(r)));r.requested=requestedMines(r);r.generation=null;
 r.phase='explore';r.claimed=[];r.treasures=[];r.safeTotal=0;r.markBonus=false;r.hitCount=0;r.hitDamage=0;r.chainHeals=0;r.freeLight=false;r.lightProgress=0;r.last=null;r.offers=[];
 r.mod=r.stage===1?MODS[0]:choose(r,MODS);
 r.light=2+r.p.upgrades.light+(r.role===0?1:0)+(has(r,'compass')?1:0)+(has(r,'lantern')?1:0);
 r.lightMax=Math.max(4,r.light);r.banish=1+(has(r,'needle')?1:0);r.ward=(r.role===2?1:0)+(has(r,'shell')?1:0)+(r.mod.id==='ward'?1:0);
 if(has(r,'lantern'))r.gold+=2;
}
function prepare(r,x,y){let best=null,attempts=0;
 for(let count=r.requested;count>=1;count--){for(let n=0;n<35;n++){
  const g=connect(r,new Engine(6,r.board.height,count,()=>rng(r)));g.prime(x,y);const proof=prove(g.grid,y*6+x);attempts++;
  if(proof.solved&&(proof.opening<=6*g.height-count-3||count===1)){best=g;r.generation={logical:true,attempts,requested:r.requested,actual:count,opening:proof.opening};break;}
 }if(best)break;}
 if(!best)throw Error('Could not create a logical chamber');r.board=best;
 const cells=best.grid.flat().map((c,i)=>({c,i})).filter(v=>!v.c.hasMine&&Math.abs(v.i%6-x)+Math.abs(Math.floor(v.i/6)-y)>1);
 const count=Math.min(cells.length,3+(has(r,'key')&&r.stage%3===0?1:0));for(let n=0;n<count;n++){let i=Math.floor(rng(r)*cells.length);r.treasures.push(cells.splice(i,1)[0].i);}
}
function grantItem(r,id){if(has(r,id))return false;r.items.push(id);if(!r.p.seen.includes(id))r.p.seen.push(id);if(id==='heart'){r.maxHp+=2;r.hp=Math.min(r.maxHp,r.hp+2);}return true;}
function loot(r,newIds){let gold=0,treasures=0;for(const i of newIds){const c=r.board.grid[Math.floor(i/6)][i%6];if(c.hasMine)continue;r.safeTotal++;r.lightProgress++;if(r.safeTotal%(has(r,'boots')?3:4)===0)gold++;
 if(r.treasures.includes(i)&&!r.claimed.includes(i)){r.claimed.push(i);gold+=4+(has(r,'clover')?1:0)+(r.mod.id==='gold'?2:0);treasures++;}
 const interval=(has(r,'book')?8:12)/(r.mod.id==='echo'?2:1);if(r.lightProgress>=interval){r.lightProgress=0;r.light=Math.min(r.lightMax,r.light+1);}
 }
 if(newIds.length>=6&&has(r,'bell'))r.hp=Math.min(r.maxHp,r.hp+1);
 if(newIds.length>=8&&r.role===1)r.hp=Math.min(r.maxHp,r.hp+1);
 if(newIds.length>=8&&r.mod.id==='bloom')r.hp=Math.min(r.maxHp,r.hp+1);
 r.gold+=gold;return {gold,treasures};
}
function cleared(r){if(r.board.mode!==PlayMode.Won)return false;
 r.phase='reward';r.p.clears++;r.p.best=Math.max(r.p.best,r.stage);r.rewardGold=10+theme(r)*3+(has(r,'gem')?6:0);r.rewardDust=1+(boss(r)?2:0)+(boss(r)&&has(r,'crown')?2:0);r.gold+=r.rewardGold;r.p.dust+=r.rewardDust;
 if(boss(r)&&has(r,'rose'))r.hp=Math.min(r.maxHp,r.hp+2);
 const pool=ITEMS.filter(i=>!has(r,i.id));r.offers=[];while(pool.length&&r.offers.length<3)r.offers.push(pool.splice(Math.floor(rng(r)*pool.length),1)[0].id);
 return true;
}
export function act(r,x,y,mode='explore'){
 if(r.phase!=='explore'||x<0||y<0||x>=6||y>=r.board.height||!Number.isInteger(x)||!Number.isInteger(y))return {ok:false};
 if(r.board.mode===PlayMode.Pending&&mode!=='explore')return {ok:false,message:'Explore the glowing stone first.'};
 if(r.board.mode===PlayMode.Pending)prepare(r,x,y);
 const c=r.board.grid[y][x];const before=new Set(r.board.grid.flat().map((c,i)=>c.revealed?i:-1).filter(i=>i>=0));const hp=r.hp,ward=r.ward;let kind='reveal';
 if(mode==='mark'){
  if(c.revealed)return {ok:false};r.board.setFlag(x,y,!c.flagged);kind='mark';
  if(has(r,'feather')&&!r.markBonus&&r.board.grid.flat().every(c=>c.hasMine===c.flagged)){r.gold+=4;r.markBonus=true;}
 }else if(mode==='banish'){
  if(r.banish<=0||c.revealed)return {ok:false,message:'No Banish charges remain.'};r.banish--;r.board.banish(x,y);kind='banish';if(c.hasMine&&has(r,'eye'))r.gold+=3;
 }else if(c.revealed){if(c.hasMine)return {ok:false};if(!r.board.attemptSurroundingReveal(x,y))return {ok:false,message:'Mark the right number of nearby wisps first.'};kind='chord';}
 else{if(c.flagged)return {ok:false,message:'This stone is marked. Unmark it to explore.'};r.board.reveal(x,y);}
 const ids=r.board.grid.flat().map((c,i)=>c.revealed&&!before.has(i)?i:-1).filter(i=>i>=0);const gains=loot(r,ids.filter(i=>!r.board.grid[Math.floor(i/6)][i%6].hasMine));r.last={ids,kind,x,y,gold:gains.gold,treasures:gains.treasures,hurt:Math.max(0,hp-r.hp),ward:ward>r.ward,chain:ids.filter(i=>!r.board.grid[Math.floor(i/6)][i%6].hasMine).length};
 if(r.hp<=0){r.phase='defeat';r.last.hurt=Math.max(0,hp-r.hp);}else cleared(r);
 return {ok:true,...r.last,cleared:r.phase==='reward'};
}
export function guide(r){if(r.phase!=='explore')return {ok:false};if(r.board.mode===PlayMode.Pending)return act(r,2,Math.floor(r.board.height/2));const free=has(r,'moth')&&!r.freeLight;if(!free&&r.light<=0)return {ok:false,message:'Guidelight recharges as you reveal safe stones.'};
 const pool=r.board.grid.flat().map((c,i)=>({c,i})).filter(v=>!v.c.hasMine&&!v.c.revealed);if(!pool.length)return {ok:false};const id=choose(r,pool).i;if(r.board.grid[Math.floor(id/6)][id%6].flagged)r.board.setFlag(id%6,Math.floor(id/6),false);if(free)r.freeLight=true;else r.light--;const out=act(r,id%6,Math.floor(id/6));if(out.ok)out.guide=true;return out;}
export function drink(r){if(r.phase!=='explore'||r.potion<=0||r.hp===r.maxHp)return false;r.potion--;r.hp=Math.min(r.maxHp,r.hp+3+(has(r,'flask')?2:0));return true;}
export function reward(r,index){if(r.phase!=='reward')return false;if(index>=0){const id=r.offers[index];if(!id)return false;grantItem(r,id);}r.offers=[];
 if(r.stage===15){r.phase='victory';r.victory=true;r.p.completed++;return true;}
 if(r.stage%3===0){r.phase='market';return true;}
 r.stage++;nextBoard(r);return true;
}
export function buy(r,type){if(r.phase!=='market')return false;
 if(type==='heal'&&r.gold>=12&&r.hp<r.maxHp){r.gold-=12;r.hp=Math.min(r.maxHp,r.hp+4);return true;}
 if(type==='potion'&&r.gold>=18&&r.potion<3){r.gold-=18;r.potion++;return true;}
 if(type==='relic'&&r.gold>=35){const pool=ITEMS.filter(i=>!has(r,i.id));if(!pool.length)return false;r.gold-=35;grantItem(r,choose(r,pool).id);return true;}
 if(type==='leave'){r.stage++;nextBoard(r);return true;}return false;
}
export function invest(p,id){p=profile(p);const level=p.upgrades[id];if(!Number.isInteger(level)||level>=3)return null;const cost=(level+1)*5;if(p.dust<cost)return null;p.dust-=cost;p.upgrades[id]++;return p;}
export function save(r){return JSON.stringify({...r,board:r.board.snapshot()});}
export function restore(text){const data=JSON.parse(text);if(data.version!==VERSION||!data.board||data.board.width!==6||![6,7,8].includes(data.board.height)||!['explore','reward','market','defeat','victory'].includes(data.phase)||!Number.isFinite(data.hp))throw Error('Invalid save');const r={...data,p:profile(data.p)};r.board=connect(r,Engine.restore(data.board,()=>rng(r)));return r;}
export {Engine,PlayMode,grantItem,around};

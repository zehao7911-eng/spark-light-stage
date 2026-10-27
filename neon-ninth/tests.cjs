const assert=require('node:assert/strict');require('./source-rules.js');require('./model.js');
const N=globalThis.Ninth;let cases=0;
function check(v,message){assert(v,message);cases++;}
check(SourceRules.award(70,720)===1720,'source left and speed award');check(SourceRules.award(260,440)===800,'source center');check(SourceRules.award(560,1200)===2900,'source double speed bonus');
function play(level,assist,seed,style='perfect'){
 const m=new N.Match(level,assist,seed);let n=0,emitted=[],hits=0,lanes=[];
 while(!m.finished&&n++<20000){
  if(m.phase==='pitch'&&!m.swung){m.aim(m.target);if(style==='perfect'&&m.age>=m.duration-.005)m.swing();if(style==='early'&&m.age>.03)m.swing();if(style==='nice'&&m.age>=m.duration-m.window()*.65)m.swing();}
  let old=m.score;m.tick(1/120);assert(m.score>=old);assert(m.ball===null||Object.values(m.ball).every(Number.isFinite));
  if(m.phase==='flight'&&m.ball){assert(m.ball.z>=-23.800001,'ball must bounce off target, never pass through board');assert(m.ball.y>=.17,'ball above deck');}
  for(let e of m.drain()){emitted.push(e);if(e.type==='hit'){hits++;lanes.push(e.lane);m.aim((m.lane+1)%3);}if(e.type==='land'){assert.equal(e.lane,lanes[lanes.length-1],'aim changes cannot move an airborne ball');}}
 }
 assert(m.finished,'finite session must end');return{m,emitted,hits};
}
let save=N.freshSave();
for(let level=0;level<6;level++)for(let seed=1;seed<=10;seed++)for(let assist of [false,true]){
 let {m,emitted,hits}=play(level,assist,seed);
 check(hits===12&&m.stars===3,`level ${level+1} both timing modes can be cleared`);
 check(emitted.filter(e=>e.type==='land').length===12,'one collision event for each outgoing ball');
 check(emitted.filter(e=>e.type==='finish').length===1,'one result');
 check(m.maxCombo===12&&m.targets===12,'combos and target progression');
 if(level===2)check(emitted.some(e=>e.type==='hit'&&e.gold),'gold balls introduced');
 if(level===1)check(emitted.some(e=>e.type==='pitch'&&e.curve),'curve introduced');
 const snap=JSON.stringify(m);m.tick(.04);m.swing();check(JSON.stringify(m)===snap,'result state frozen');
 save=m.commit(save);
}
check(N.unlocked(save)===6&&save.stars.reduce((a,b)=>a+b,0)===18,'all rooms and all stars persisted');
check(N.paintCount(save)===4,'all collectible uniforms unlock');
for(let style of ['early','idle']){let {m,hits}=play(0,true,55,style);check(m.outs===3&&m.number===9&&hits===0,'three strikes make an out, three outs stop match');check(m.score===0&&m.stars===0,'misses never reward');}
const nice=play(0,true,4,'nice').m;check(nice.hits===12&&nice.perfect===0&&nice.stars===2,'forgiving non-perfect shots also clear');
const m=new N.Match();check(!m.swing(),'no swing before pitch');m.aim(NaN);check(m.lane===1,'invalid aim ignored');m.tick(NaN);m.tick(-1);check(m.t===0,'bad dt ignored');
while(m.phase!=='pitch')m.tick(1/120);m.age=m.duration;m.ball={x:0,y:1.45,z:5};m.swing();let sc=m.score;for(let i=0;i<20;i++)m.swing();check(sc===m.score,'held and repeated input cannot double score');
const dirty=N.cleanSave({version:1,stars:[Infinity,-2,900],paint:999,best:[NaN,400]});check(dirty.stars[0]===0&&dirty.stars[1]===0&&dirty.stars[2]===3,'invalid saves sanitized');
check(N.cleanSave(null).version===1,'blocked or absent storage defaults');
console.log(JSON.stringify({passed:true,cases,perfectSessions:120,levels:6,tests:'source scoring, clearability, target contact, aim lock, golden balls, curves, misses, terminal freeze, unlocks, malformed saves'}));

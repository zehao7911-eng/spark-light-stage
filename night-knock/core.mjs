export const RESIDENTS=[
 {id:'denny',name:'DENNY HALL',unit:'102',line:'Long shift. Good to be home.'},
 {id:'gruber',name:'OTTO GRUBER',unit:'203',line:'The hallway light is out again.'},
 {id:'ilsa',name:'ILSA WEBER',unit:'304',line:'My key never works in this rain.'},
 {id:'mara',name:'MARA VOSS',unit:'105',line:'I left the kettle on upstairs.'},
 {id:'petra',name:'PETRA KLEIN',unit:'206',line:'Just let me dry off, please.'},
 {id:'sasha',name:'SASHA MOROZ',unit:'307',line:'I live here. You know me.'},
 {id:'tomas',name:'TOMAS REED',unit:'108',line:'There is someone behind me.'},
 {id:'viktor',name:'VIKTOR NEUMANN',unit:'209',line:'Cold night to be standing outside.'}
];
export const MONSTERS=['ilsa','petra','sasha','viktor'];
export const KINDS=['human','intruder','double','unit'];
export const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function rng(seed){let x=seed>>>0||1;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296}}
export function deck(night,seed){
 let rand=rng((seed+night*7919)>>>0),n=night===1?6:8,rows=[],ids=[...RESIDENTS.keys()];
 for(let i=ids.length-1;i>0;i--){let j=Math.floor(rand()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]]}
 let kinds=night===1?['human','intruder','human','double','unit','human']:['human','human','intruder','double','unit',...Array.from({length:3},()=>['human','human','double','unit'][Math.floor(rand()*4)])];
 if(night>1)for(let i=kinds.length-1;i>0;i--){let j=Math.floor(rand()*(i+1));[kinds[i],kinds[j]]=[kinds[j],kinds[i]]}
 for(let i=0;i<n;i++){
  let kind=kinds[i],identity=ids[i],face=identity;
  if(kind==='intruder'){let target=MONSTERS[Math.floor(rand()*4)];identity=RESIDENTS.findIndex(p=>p.id===target);face=identity}
  if(kind==='double'){
   let group=night>=3?([0,1,6,7].includes(identity)?[0,1,6,7]:[2,3,4].includes(identity)?[2,3,4]:[0,1,2,3,4,6,7]):[0,1,2,3,4,5,6,7];
   let others=group.filter(x=>x!==identity);face=others[Math.floor(rand()*others.length)];
  }
  let unit=RESIDENTS[identity].unit,claimed=kind==='unit'?String(Number(unit)+1):unit;
  rows.push({identity,face,kind,unit,claimed,serial:`${night}-${i}-${Math.floor(rand()*9999)}`});
 }
 return rows;
}
export function profile(raw={}){
 const num=(k,max=1e9)=>Number.isSafeInteger(raw?.[k])&&raw[k]>=0?Math.min(raw[k],max):0;
 return {schema:1,serial:num('serial'),coins:num('coins'),stamps:num('stamps'),best:num('best'),nights:num('nights'),correct:num('correct'),perfect:num('perfect'),fuse:num('fuse',2),pay:num('pay',3),seenCredits:num('seenCredits'),seenStamps:num('seenStamps'),seenCorrect:num('seenCorrect'),seenPerfect:num('seenPerfect'),found:Array.isArray(raw?.found)?[...new Set(raw.found.filter(x=>KINDS.includes(x)&&x!=='human'))]:[],people:Array.isArray(raw?.people)?[...new Set(raw.people.filter(x=>RESIDENTS.some(p=>p.id===x)))]:[],sound:raw?.sound!==false,gentle:raw?.gentle===true};
}
export class Shift{
 constructor(id,seed,p={}){this.schema=1;this.id=id;this.seed=seed>>>0||1;this.night=1;this.index=0;this.phase='visit';this.fuse=clamp(p.fuse||0,0,2);this.pay=clamp(p.pay||0,0,3);this.life=3+this.fuse;this.combo=0;this.bestCombo=0;this.score=0;this.credits=0;this.stamps=0;this.correct=0;this.perfects=0;this.nightCorrect=0;this.done=0;this.found=[];this.people=[];this.result=null;this.cases=deck(1,this.seed)}
 get visitor(){return this.cases[this.index]}
 get maxLife(){return 3+this.fuse}
 decide(admit){
  if(this.phase!=='visit'||typeof admit!=='boolean')return false;
  let v=this.visitor,correct=admit===(v.kind==='human'),reward=0;
  if(correct){this.correct++;this.nightCorrect++;this.combo++;this.bestCombo=Math.max(this.bestCombo,this.combo);reward=10+Math.min(5,this.combo-1)*2+this.pay*2;this.credits+=reward;this.score+=100+Math.min(5,this.combo-1)*25;let id=RESIDENTS[v.identity].id;if(!this.people.includes(id))this.people.push(id);if(v.kind!=='human'&&!this.found.includes(v.kind))this.found.push(v.kind)}else{this.life--;this.combo=0}
  this.phase='verdict';this.result={correct,admit,kind:v.kind,reward};return this.result;
 }
 advance(){
  if(this.phase!=='verdict')return false;
  if(this.life===0){this.phase='over';return true}
  if(this.index===this.cases.length-1){this.done=this.night;let perfect=this.nightCorrect===this.cases.length;this.stamps+=1+(perfect?1:0);if(perfect)this.perfects++;this.credits+=20+this.night*5;this.phase='report';return true}
  this.index++;this.result=null;this.phase='visit';return true;
 }
 next(){if(this.phase!=='report')return false;this.night++;this.cases=deck(this.night,this.seed);this.index=0;this.nightCorrect=0;this.result=null;this.life=Math.min(this.maxLife,this.life+1);this.phase='visit';return true}
 save(){return Object.fromEntries(Object.keys(this).map(k=>[k,JSON.parse(JSON.stringify(this[k]))]))}
 static restore(x){
  if(!x||x.schema!==1||!['visit','verdict','report','over'].includes(x.phase))return null;
  for(let [k,min,max]of [['id',1,1e9],['seed',1,4294967295],['night',1,1e6],['index',0,7],['fuse',0,2],['pay',0,3],['life',0,5],['combo',0,1e7],['bestCombo',0,1e7],['score',0,1e12],['credits',0,1e12],['stamps',0,1e9],['correct',0,1e9],['perfects',0,1e6],['nightCorrect',0,8],['done',0,1e6]])if(!Number.isSafeInteger(x[k])||x[k]<min||x[k]>max)return null;
  let rows=deck(x.night,x.seed);if(x.index>=rows.length||JSON.stringify(x.cases)!==JSON.stringify(rows)||x.life>3+x.fuse||x.nightCorrect>x.index+1||x.combo>x.correct||x.bestCombo<x.combo||x.done>x.night)return null;
  if(x.phase==='visit'&&(x.result!==null||x.life===0))return null;
  if(x.phase!=='visit'&&(!x.result||typeof x.result.correct!=='boolean'||typeof x.result.admit!=='boolean'||x.result.kind!==rows[x.index].kind||x.result.correct!==(x.result.admit===(rows[x.index].kind==='human'))||!Number.isSafeInteger(x.result.reward)||x.result.reward<0||x.result.reward>26))return null;
  if(x.phase==='over'&&x.life!==0||x.phase==='report'&&(x.index!==rows.length-1||x.life===0||x.done!==x.night))return null;
  if(!Array.isArray(x.found)||x.found.some(k=>!KINDS.includes(k)||k==='human')||new Set(x.found).size!==x.found.length||!Array.isArray(x.people)||x.people.some(k=>!RESIDENTS.some(p=>p.id===k))||new Set(x.people).size!==x.people.length)return null;
  let r=new Shift(x.id,x.seed);for(let k of Object.keys(r))r[k]=JSON.parse(JSON.stringify(x[k]));return r;
 }
}
export function fresh(p,seed){p.serial++;p.seenCredits=0;p.seenStamps=0;p.seenCorrect=0;p.seenPerfect=0;return new Shift(p.serial,seed,p)}
export function record(p,r){if(r.id!==p.serial)return;p.coins+=Math.max(0,r.credits-p.seenCredits);p.stamps+=Math.max(0,r.stamps-p.seenStamps);p.correct+=Math.max(0,r.correct-p.seenCorrect);p.perfect+=Math.max(0,r.perfects-p.seenPerfect);p.seenCredits=Math.max(p.seenCredits,r.credits);p.seenStamps=Math.max(p.seenStamps,r.stamps);p.seenCorrect=Math.max(p.seenCorrect,r.correct);p.seenPerfect=Math.max(p.seenPerfect,r.perfects);p.best=Math.max(p.best,r.score);p.nights=Math.max(p.nights,r.done);p.found=[...new Set([...p.found,...r.found])];p.people=[...new Set([...p.people,...r.people])]}
export function price(p,key){return key==='fuse'?70+p.fuse*100:key==='pay'?60+p.pay*90:Infinity}
export function buy(p,key){let cap=key==='fuse'?2:key==='pay'?3:0,cost=price(p,key);if(!cap||p[key]>=cap||p.coins<cost)return false;p.coins-=cost;p[key]++;return true}
export const EXPLANATIONS={human:'Face and apartment match.',intruder:'That face has changed from the resident photo.',double:'The face does not match the resident photo.',unit:'The visitor gave the wrong apartment.'};
export function rank(p){return p.stamps>=20?{name:'NIGHT WARDEN',next:null,level:4}:p.stamps>=8?{name:'CHIEF WATCH',next:20,level:3}:p.stamps>=3?{name:'SENIOR WATCH',next:8,level:2}:{name:'NIGHT WATCH',next:3,level:1}}

(function(root){'use strict';
const RIVALS=[
 ['Bram of the Brambles','BADGER',0,'#477f75','#d8b96c',2,'still'],
 ['Lady Thistle','HARE',0,'#bb696f','#ead39c',3,'sway'],
 ['Marshal Moss','TORTOISE',0,'#7b925e','#d6b576',4,'step'],
 ['Rook the Remarkable','RAVEN',1,'#6b709b','#c3b4d6',3,'sway'],
 ['Captain Honeycomb','BEAR',1,'#b78348','#f1cc68',4,'step'],
 ['The Moth Marquise','MOTH',1,'#9893b3','#f3bba6',4,'flutter'],
 ['Dame Ember','BOAR',2,'#b45f5c','#edbc78',4,'step'],
 ['The Silver Hound','HOUND',2,'#788fa6','#c9d8da',5,'flutter'],
 ['Queen of Feathers','OWL',2,'#77618c','#e6bd65',5,'crown']
].map((a,id)=>({id,name:a[0],species:a[1],arena:a[2],color:a[3],accent:a[4],hp:a[5],pattern:a[6]}));
const PERKS=[{id:0,name:'STEADY',detail:'Wider gold zone',icon:'◎',cap:3},{id:1,name:'PADDED',detail:'Extra armor',icon:'♥',cap:2},{id:2,name:'BREEZE',detail:'Longer approach',icon:'≈',cap:2},{id:3,name:'BOLD',detail:'Stronger perfect hit',icon:'✦',cap:1},{id:4,name:'RIBBON',detail:'One free graze',icon:'♧',cap:1},{id:5,name:'SECOND WIND',detail:'One last chance',icon:'↻',cap:1}];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function ranks(v){return PERKS.map((p,i)=>Number.isInteger(v?.[i])?clamp(v[i],0,p.cap):0);}
class Match{
 constructor(id=0,upgrades=[],lap=0){this.id=clamp(Math.floor(id)||0,0,8);this.ranks=ranks(upgrades);this.lap=clamp(Math.floor(lap)||0,0,99);this.phase='ready';this.t=0;this.clock=0;this.pass=0;this.aim=.5;this.hp=3+this.ranks[1];this.maxHP=this.hp;this.enemyHP=RIVALS[this.id].hp+Math.min(2,this.lap);this.maxEnemyHP=this.enemyHP;this.misses=0;this.perfects=0;this.hits=0;this.score=0;this.quality='';this.delta=0;this.events=[];this.ribbonUsed=false;this.windUsed=false;this.won=false;this.stars=0;}
 get rival(){return RIVALS[this.id];}
 get duration(){return Math.max(2.6,4.6-this.id*.12-Math.min(6,this.lap)*.08)+this.ranks[2]*.4;}
 get progress(){return this.phase==='ride'?clamp(this.t/this.duration,0,1):this.phase==='impact'||this.phase==='result'?1:0;}
 get perfectWindow(){return .095+this.ranks[0]*.018;}
 targetAt(time=this.t){let p=clamp(time/this.duration,0,1),seed=this.id*1.9+this.pass*2.4+this.lap*.7,base=this.id===0&&this.pass===0?.58:.28+((this.pass+this.id)%3)*.2,pattern=this.rival.pattern;
 if(pattern==='still')return base;if(pattern==='sway')return clamp(base+Math.sin(p*4+seed)*.13,.12,.88);if(pattern==='step')return clamp(base+(p>.64?.20:0),.12,.88);if(pattern==='flutter')return clamp(base+Math.sin(p*6+seed)*.15,.12,.88);return clamp(.5+Math.sin(p*5+seed)*.26,.12,.88);}
 aimAt(v){if(Number.isFinite(v)&&['ready','ride'].includes(this.phase))this.aim=clamp(v,0,1);}
 begin(){if(this.phase!=='ready')return false;this.phase='ride';this.t=0;this.events.push({type:'charge'});return true;}
 strike(){if(this.phase!=='ride')return false;let error=Math.abs(this.aim-this.targetAt(this.duration)),perfect=error<=this.perfectWindow,hit=error<=.24,graze=error<=.37;this.delta=error;this.quality=perfect?'PERFECT':hit?'SOLID HIT':graze?'GLANCING':'MISSED';let damage=perfect?2+this.ranks[3]:hit||graze?1:0;if(perfect)this.perfects++;if(damage)this.hits++;this.enemyHP=Math.max(0,this.enemyHP-damage);if(!hit){this.misses++;if(graze&&this.ranks[4]&&!this.ribbonUsed){this.ribbonUsed=true;this.events.push({type:'ribbon'});}else this.hp=Math.max(0,this.hp-1);}
 if(this.hp===0&&this.ranks[5]&&!this.windUsed){this.windUsed=true;this.hp=1;this.events.push({type:'secondWind'});}this.score+=perfect?350+this.perfects*35:hit?180:graze?70:0;this.phase='impact';this.t=0;this.events.push({type:'impact',quality:this.quality,damage,perfect,error});return true;}
 tick(dt){if(!Number.isFinite(dt))return;dt=clamp(dt,0,.05);this.clock+=dt;if(this.phase==='ride'){this.t=Math.min(this.duration,this.t+dt);if(this.t>=this.duration)this.strike();}else if(this.phase==='impact'){this.t+=dt;if(this.t>=1.4){if(this.enemyHP===0){this.won=true;this.stars=this.misses===0?3:this.misses===1?2:1;this.score+=this.hp*100;this.phase='result';this.events.push({type:'complete',id:this.id,stars:this.stars,score:this.score});}else if(this.hp===0){this.won=false;this.phase='result';this.events.push({type:'lost'});}else{this.pass++;this.phase='ready';this.t=0;this.events.push({type:'ready'});}}}}
 drain(){let e=this.events;this.events=[];return e;}
 snapshot(){let {events,...v}=this;return JSON.parse(JSON.stringify(v));}
 static restore(v){try{if(!v||!Number.isInteger(v.id)||v.id<0||v.id>8||!['ready','ride','impact','result'].includes(v.phase))return null;let g=new Match(v.id,v.ranks,v.lap);for(let k of ['t','clock','pass','aim','hp','maxHP','enemyHP','maxEnemyHP','misses','perfects','hits','score','delta','stars'])if(!Number.isFinite(v[k])||v[k]<0)return null;if(v.aim>1||v.hp>5||v.maxHP<3||v.maxHP>5||v.enemyHP>7||v.maxEnemyHP>7||v.pass>500||v.t>60||v.stars>3||v.clock>1000000||typeof v.won!=='boolean'||typeof v.ribbonUsed!=='boolean'||typeof v.windUsed!=='boolean'||!['','PERFECT','SOLID HIT','GLANCING','MISSED'].includes(v.quality))return null;return Object.assign(g,JSON.parse(JSON.stringify(v)),{ranks:ranks(v.ranks),events:[]});}catch(e){return null;}}
}
function profile(v={}){let best=RIVALS.map((_,i)=>Number.isInteger(v.best?.[i])?clamp(v.best[i],0,3):0),r=ranks(v.ranks),budget=best.filter(Boolean).length;for(let i=0;i<r.length;i++){r[i]=Math.min(r[i],budget);budget-=r[i];}return{best,ranks:r,paint:clamp(Number.isInteger(v.paint)?v.paint:0,0,2),sound:v.sound!==false,lap:clamp(Number.isInteger(v.lap)?v.lap:0,0,99),bestScore:Number.isFinite(v.bestScore)?clamp(v.bestScore,0,999999):0,active:v.active||null};}
function nextMatch(g,p){let id=p.best.findIndex(v=>!v);if(id>=0)return{id,lap:p.lap,circuit:false};if(!g.lap||g.id===8)return{id:0,lap:Math.min(99,g.lap+1),circuit:true};return{id:g.id+1,lap:g.lap,circuit:false};}
root.TT={Match,RIVALS,PERKS,profile,clamp,nextMatch};
})(typeof window==='undefined'?globalThis:window);

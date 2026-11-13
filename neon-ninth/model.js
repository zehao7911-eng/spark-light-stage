(function(g){'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const ROOFS=[
 {name:'Blue Hour',goal:6000,colors:['#242547','#f9ad7a','#65e3d3'],speed:2.15,curve:0},
 {name:'Lantern Line',goal:9000,colors:['#242034','#e67c65','#ffce78'],speed:1.95,curve:.35},
 {name:'Electric Bloom',goal:14000,colors:['#172c43','#c57ca9','#6df0de'],speed:1.8,curve:.65},
 {name:'Golden Mile',goal:18000,colors:['#302a46','#ffa759','#f5e9a6'],speed:1.7,curve:.8},
 {name:'Midnight Club',goal:22000,colors:['#131d39','#536da9','#ee8ab4'],speed:1.6,curve:1},
 {name:'Last Light',goal:26000,colors:['#252d43','#b889ae','#a2f5dc'],speed:1.5,curve:1.15}
];
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
function freshSave(){return{version:1,stars:[0,0,0,0,0,0],best:[0,0,0,0,0,0],scores:[],paint:0,sound:false,assist:true};}
function cleanSave(s){let a=freshSave();if(!s||s.version!==1)return a;for(let k of ['stars','best'])for(let i=0;i<6;i++){let v=Number(s[k]?.[i]);a[k][i]=Number.isFinite(v)?clamp(Math.floor(v),0,k==='stars'?3:1000000):0;}a.scores=Array.isArray(s.scores)?s.scores.filter(Number.isFinite).slice(0,10):[];a.sound=s.sound===true;a.assist=s.assist!==false;let p=Number(s.paint);a.paint=Number.isFinite(p)?clamp(Math.floor(p),0,3):0;return a;}
function unlocked(save){let n=1;while(n<6&&save.stars[n-1]>0)n++;return n;}
function paintCount(save){let n=save.stars.reduce((a,b)=>a+b,0);return 1+(n>=3?1:0)+(n>=8?1:0)+(n>=14?1:0);}
class Match{
 constructor(level=0,assist=true,seed=312){this.level=clamp(level|0,0,5);this.cfg=ROOFS[this.level];this.assist=assist;this.seed=seed>>>0;this.random=rng(this.seed);this.time=60;this.phase='ready';this.clock=.8;this.number=0;this.hits=0;this.perfect=0;this.score=0;this.strikes=0;this.outs=0;this.combo=0;this.maxCombo=0;this.targets=0;this.lane=1;this.target=1;this.targetHits=0;this.fever=0;this.ball=null;this.events=[];this.swingTime=-9;this.t=0;this.finished=false;this.reveal=0;this.quality='';this.lastAward=0;this.hitFreeze=0;}
 emit(type,data={}){this.events.push({type,...data});}
 drain(){return this.events.splice(0);}
 aim(lane){if(!this.finished&&Number.isFinite(lane))this.lane=clamp(Math.round(lane),0,2);}
 pitch(){this.phase='pitch';this.number++;this.age=0;this.swung=false;let slow=this.number===1&&this.level===0;this.duration=slow?3.1:this.cfg.speed+(this.random()-.5)*.3;this.curve=(this.number%3===0?this.cfg.curve:0)*(this.random()>.5?1:-1);this.gold=this.level>=2&&this.number%4===0;this.ball={x:0,y:1.45,z:-19};this.emit('pitch',{gold:this.gold,curve:!!this.curve});}
 window(){return this.assist?.27:.16;}
 swing(){if(this.phase!=='pitch'||this.swung||this.finished)return false;this.swung=true;this.swingTime=this.t;const error=(this.age-this.duration),q=Math.abs(error),win=this.window();if(q<=win){const perfect=q<=(this.assist?.115:.075);this.quality=perfect?'PERFECT':'NICE HIT';this.hits++;this.combo++;this.maxCombo=Math.max(this.maxCombo,this.combo);if(perfect)this.perfect++;const target=this.lane===this.target;const sourceX=[70,260,560][this.lane];const speed=perfect?720:440;let award=SourceRules.award(sourceX,speed);if(target){award+=500;this.targets++;this.targetHits++;}let fever=this.fever>0;if(fever)award*=2;if(this.gold)award*=2;award+=Math.min(4,this.combo-1)*120;this.score+=award;this.lastAward=award;this.fever=fever?this.fever-1:this.combo>0&&this.combo%4===0?3:0;
 const hitT=(-23.8-this.ball.z)/-29;
 this.hitLane=this.lane;this.hitTarget=target;this.landed=false;
 this.launch={x:this.ball.x,y:this.ball.y,z:this.ball.z,dx:((this.lane-1)*7-this.ball.x)/hitT,dy:(6.6-this.ball.y+3.5*hitT*hitT)/hitT,dz:-29,hitT};this.flightAge=0;this.phase='flight';this.clock=1.55;this.hitFreeze=.08;this.emit('hit',{perfect,target,award,fever,gold:this.gold,lane:this.lane});return true;}
 this.quality=error<0?'TOO EARLY':'TOO LATE';this.emit('swing',{error});return false;}
 miss(){this.combo=0;this.fever=0;SourceRules.strike(this);this.phase='wait';this.clock=1;this.quality=this.swung?this.quality:'MISSED';this.emit('miss');}
 tick(dt){if(this.finished||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,.05);this.t+=dt;if(this.hitFreeze>0){this.hitFreeze=Math.max(0,this.hitFreeze-dt);return;}
 if(this.phase==='pitch'){this.time=Math.max(0,this.time-dt);this.age+=dt;let p=this.age/this.duration;this.ball={x:Math.sin(Math.min(1,p)*Math.PI)*this.curve,y:1.45+Math.sin(p*Math.PI)*1.2,z:-19+24*p};if(p>1+this.window()/this.duration)this.miss();}
 else if(this.phase==='flight'){this.flightAge+=dt;let a=this.flightAge,b=this.launch;
 if(a<b.hitT)this.ball={x:b.x+b.dx*a,y:b.y+b.dy*a-3.5*a*a,z:b.z+b.dz*a};
 else{let u=a-b.hitT;this.ball={x:(this.hitLane-1)*7-b.dx*.12*u,y:6.6-2*u-3.5*u*u,z:-23.8+u*5};if(!this.landed){this.landed=true;this.emit('land',{lane:this.hitLane,target:this.hitTarget});}}
 this.clock-=dt;if(this.clock<=0){this.phase='wait';this.clock=.6;this.ball=null;this.target=(this.target+1+(this.level>2&&this.number%2===0?1:0))%3;}}
 else{this.clock-=dt;if(this.clock<=0){if(this.number>=12||SourceRules.ended(this))this.finish();else this.pitch();}}
 if(SourceRules.ended(this)&&this.phase!=='flight')this.finish();}
 finish(){if(this.finished)return;this.finished=true;this.phase='result';this.ball=null;this.stars=this.score>=this.cfg.goal?1+(this.perfect>=3?1:0)+(this.targets>=4?1:0):0;this.emit('finish',{stars:this.stars});}
 commit(save){if(!this.finished)return null;const s=cleanSave(save);s.stars[this.level]=Math.max(s.stars[this.level],this.stars);s.best[this.level]=Math.max(s.best[this.level],this.score);s.scores=SourceRules.rank(s.scores,this.score);return s;}
}
g.Ninth={Match,ROOFS,freshSave,cleanSave,unlocked,paintCount,clamp};
})(typeof window==='undefined'?globalThis:window);

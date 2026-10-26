/* BONKFORGE: modernized complete controller from christopherscott/whackamole.
 * Copyright 2010 Christopher Scott Hernandez, MIT; see LICENSE-UPSTREAM.txt.
 * Source live/kill/move/togglePop/reset/step/start/end lifecycle and timed-hit
 * score are retained as a deterministic model. Multi-target slots, armor,
 * friendly workers, charge, campaign and snapshots are new adaptations.
 */
(function(root){'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const JOBS=[['Warm-up Wallop',12,20,1.85,.78,1],['Bolt Bandits',15,24,1.75,.72,2],['The Bucket Brigade',17,26,1.72,.70,2],['Foundry Frenzy',19,29,1.68,.65,2],['Double Trouble',21,32,1.62,.59,3],['King of the Kiln',22,33,1.62,.58,3],['Sky Dock Shuffle',24,36,1.58,.55,3],['A Royal Ruckus',26,39,1.55,.52,3],['The Grand Bonk',28,42,1.55,.50,3]].map((a,i)=>({index:i,name:a[0],goal:a[1],limit:a[2],poppingInterval:a[3],hidingInterval:a[4],concurrent:a[5],scene:Math.floor(i/3)}));
const POS=[{x:115,y:228},{x:270,y:228},{x:425,y:228},{x:115,y:390},{x:270,y:390},{x:425,y:390},{x:115,y:552},{x:270,y:552},{x:425,y:552}];
class Game{
 constructor(index=0,seed=20261026){this.job=JOBS[clamp(index|0,0,8)];this.rng=seed>>>0||1;this.reset();}
 random(){let t=this.rng+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);this.rng>>>=0;return((t^t>>>14)>>>0)/4294967296;}
 reset(){this.mode='ready';this.time=0;this.score=0;this.hits=0;this.moles=0;this.combo=0;this.bestCombo=0;this.charge=0;this.slams=0;this.misses=0;this.hearts=5;this.workersHit=0;this.emptyHits=0;this.nextPop=.35;this.events=[];this.slots=POS.map((p,i)=>({...p,id:i,type:'grunt',mode:'hidden',age:0,duration:1.8,hp:1,maxHp:1,clicked:false,spawn:0}));this.lastSlot=-1;this.cooldown=0;this.step(0);}
 live(mole,type='grunt'){mole.type=type;mole.mode='main';mole.clicked=false;mole.age=0;mole.duration=this.job.poppingInterval+(type==='boss'?.7:type==='armor'?.5:0);mole.hp=mole.maxHp=type==='boss'?3:type==='armor'?2:1;mole.spawn=this.moles;this.events.push({type:'pop',slot:mole.id,kind:type});}
 move(){const empty=this.slots.filter(s=>s.mode==='hidden'&&s.id!==this.lastSlot);if(!empty.length)return false;const mole=empty[Math.floor(this.random()*empty.length)];this.lastSlot=mole.id;this.moles++;let type='grunt';if(this.job.index>=2&&this.moles%7===0)type='worker';else if(this.job.index>=1&&this.moles%5===0)type='armor';if(this.job.index>=2&&this.moles===Math.floor(this.job.goal*.6))type='boss';this.live(mole,type);return true;}
 togglePop(mole){if(mole.mode==='main'){if(mole.type!=='worker'){this.misses++;this.hearts=Math.max(0,this.hearts-1);this.combo=0;this.events.push({type:'escape',slot:mole.id});}mole.mode='leaving';mole.age=0;}}
 begin(){if(this.mode!=='ready')return false;this.mode='main';this.slots[4].age=.18;return true;}
 kill(mole,slam=false){if(mole.mode!=='main'||mole.clicked)return false;if(mole.type==='worker'){mole.clicked=true;mole.mode='dead';mole.age=0;this.workersHit++;this.combo=0;this.charge=0;this.hearts=Math.max(0,this.hearts-1);this.events.push({type:'worker',slot:mole.id});return true;}
  mole.hp--;if(mole.hp>0){this.events.push({type:'armor',slot:mole.id,hp:mole.hp});return true;}
  // Upstream's remaining-time scoring: floor(((pop interval-elapsed)/interval)*100)*10.
  const speed=Math.floor(clamp((mole.duration-mole.age)/mole.duration,0,1)*100)*10;
  this.score+=speed+100+Math.min(5,Math.floor(this.combo/4))*100;this.hits++;this.combo++;this.bestCombo=Math.max(this.bestCombo,this.combo);mole.clicked=true;mole.mode='dead';mole.age=0;
  this.events.push({type:'hit',slot:mole.id,kind:mole.type,combo:this.combo,points:speed+100});if(!slam){this.charge++;if(this.charge>=5){this.charge=0;this.slams++;this.events.push({type:'slam',slot:mole.id});for(const other of this.slots)if(other!==mole&&other.mode==='main'&&other.type!=='worker'){other.hp=1;this.kill(other,true);}}}return true;}
 hit(slot){if(!Number.isInteger(slot)||slot<0||slot>=9||!['ready','main'].includes(this.mode)||this.cooldown>0)return false;if(this.mode==='ready')this.begin();const s=this.slots[slot];this.cooldown=.085;if(s.mode!=='main'||s.clicked){this.emptyHits++;this.combo=0;this.events.push({type:'whiff',slot});return false;}const hit=this.kill(s);this.nextPop=Math.min(this.nextPop,.24);this.check();return hit;}
 step(dt){if(this.mode==='ready'){if(this.moles===0){this.moles=1;this.live(this.slots[4]);this.slots[4].age=.2;}return;}if(this.mode!=='main')return;dt=clamp(dt,0,.05);this.time+=dt;this.cooldown=Math.max(0,this.cooldown-dt);for(const mole of this.slots){if(mole.mode==='hidden')continue;mole.age+=dt;if(mole.mode==='main'&&mole.age>=mole.duration)this.togglePop(mole);else if(mole.mode==='dead'&&mole.age>.42||mole.mode==='leaving'&&mole.age>.22){mole.mode='hidden';mole.age=0;}}
  this.nextPop-=dt;const active=this.slots.filter(s=>s.mode==='main').length;if(this.nextPop<=0&&active<this.job.concurrent&&this.moles<this.job.limit){if(this.move())this.nextPop=this.job.hidingInterval;}this.check();}
 check(){if(this.mode!=='main')return;if(this.hits>=this.job.goal){this.mode='won';this.events.push({type:'won'});}else if(this.hearts<=0||this.moles>=this.job.limit&&this.slots.every(s=>s.mode==='hidden')){this.mode='lost';this.events.push({type:'lost'});}}
 drain(){const e=this.events;this.events=[];return e;}
 stars(){return this.mode==='won'?1+(this.hearts>=4?1:0)+(this.bestCombo>=8?1:0):0;}
 snapshot(){return{v:1,index:this.job.index,rng:this.rng,mode:this.mode,time:this.time,score:this.score,hits:this.hits,moles:this.moles,combo:this.combo,bestCombo:this.bestCombo,charge:this.charge,slams:this.slams,misses:this.misses,hearts:this.hearts,workersHit:this.workersHit,emptyHits:this.emptyHits,nextPop:this.nextPop,lastSlot:this.lastSlot,cooldown:this.cooldown,slots:this.slots.map(s=>({...s}))};}
 static restore(s){if(!s||s.v!==1||!Number.isInteger(s.index)||s.index<0||s.index>8||!Array.isArray(s.slots)||s.slots.length!==9||!['ready','main','won','lost'].includes(s.mode))throw Error('Invalid saved shift');const keys=['time','score','hits','moles','combo','bestCombo','charge','slams','misses','hearts','workersHit','emptyHits','nextPop','cooldown'];if(keys.some(k=>!Number.isFinite(s[k])||s[k]<-1)||s.hearts>5||s.charge>4||s.hits>s.moles||s.moles>JOBS[s.index].limit)throw Error('Invalid saved counters');for(let i=0;i<9;i++){const m=s.slots[i];if(!m||m.id!==i||!['main','hidden','dead','leaving'].includes(m.mode)||!['grunt','armor','worker','boss'].includes(m.type)||!Number.isFinite(m.age)||!Number.isFinite(m.duration)||!Number.isInteger(m.hp)||m.hp<0||m.hp>3)throw Error('Invalid saved target');}const g=new Game(s.index,s.rng);for(const k of [...keys,'mode','lastSlot','rng'])g[k]=s[k];g.slots=s.slots.map((m,i)=>({...m,x:POS[i].x,y:POS[i].y}));g.events=[];return g;}
}
root.BonkCore={Game,JOBS,POS,clamp};if(typeof module!=='undefined')module.exports=root.BonkCore;
})(typeof globalThis!=='undefined'?globalThis:this);

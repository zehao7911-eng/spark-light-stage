import{integrate,safeLanding,dock,clamp}from'./physics.js';import{LEVELS}from'./levels.js';export{LEVELS};
export const GEARS=[{id:'fuel',name:'Fuel Bloom',icon:'◒',detail:'More flight time between docks.',cost:[12,26,44]},{id:'feet',name:'Soft Landing Feet',icon:'⌄',detail:'A gentler safe landing speed.',cost:[12,26,44]},{id:'charm',name:'Seed Charm',icon:'✧',detail:'Gather seeds from farther away.',cost:[12,26,44]}];const copy=x=>JSON.parse(JSON.stringify(x));
export class Landing{
 constructor(saved){this.profile={unlocked:0,coins:0,best:{},gear:{fuel:0,feet:0,charm:0},...saved?.profile};this.profile.unlocked=clamp(Number(this.profile.unlocked)||0,0,11);this.profile.gear={fuel:0,feet:0,charm:0,...this.profile.gear};for(let k in this.profile.gear)this.profile.gear[k]=clamp(Number(this.profile.gear[k])||0,0,3);this.load(clamp(saved?.run?.level||0,0,this.profile.unlocked));if(saved?.run&&Array.isArray(saved.run.done)&&saved.run.level===this.run.level){this.run=copy(saved.run);this.run.input={left:false,right:false,lift:false,hover:false,target:null};this.run.events=[];}}
 get maxFuel(){return 100+this.profile.gear.fuel*25;}get level(){return LEVELS[this.run.level];}
 load(i){if(!Number.isInteger(i)||i<0||i>=12||i>this.profile.unlocked)return false;let p=LEVELS[i].pads[0];this.run={level:i,state:'ready',frame:0,accum:0,time:0,s:{x:p.x,y:p.y-14,vx:0,vy:0,rotation:90,rotationForce:0,fuel:this.maxFuel},done:[0],seeds:[],next:1,landed:0,checkpoint:0,hearts:3,bumps:0,recover:0,shield:0,cooldown:0,input:{left:false,right:false,lift:false,hover:false,target:null},events:[],claimed:false};return true;}
 start(){if(this.run.state!=='ready')return false;this.run.state='play';return true;}
 pad(id,time=this.run.time){let p=this.level.pads[id];return{...p,x:p.x+(p.move?Math.sin(time*.7+id)*p.move:0)};}
 input(values){this.run.input={...this.run.input,...values};}
 release(){this.run.input={left:false,right:false,lift:false,hover:false,target:null};}
 shield(){let r=this.run;if(r.state!=='play'||this.profile.unlocked<7||r.cooldown>0)return false;r.shield=3;r.cooldown=12;r.events.push({type:'shield'});return true;}
 tick(dt){let r=this.run;if(r.state!=='play'||!Number.isFinite(dt)||dt<=0)return;r.events=[];r.accum+=Math.min(dt,.5);while(r.accum+1e-9>=1/60&&r.state==='play'){r.accum=Math.max(0,r.accum-1/60);this.frame();}if(r.accum<1e-9)r.accum=0;}
 frame(){let r=this.run,s=r.s;r.frame++;r.time=r.frame/60;r.cooldown=Math.max(0,r.cooldown-1/60);r.shield=Math.max(0,r.shield-1/60);if(r.recover>0){r.recover-=1/60;return;}let input=r.input,dir=(input.right?1:0)-(input.left?1:0),lift=input.lift,hover=input.hover&&this.profile.unlocked>=3;
 if(input.target){let t=input.target;dir=clamp((t.x-s.x)*.045-s.vx*.75,-1,1);let wanted=clamp((t.y-s.y)*.055,-1.8,1.6);lift=s.vy>wanted;}
 if(r.landed!==null){let p=this.pad(r.landed);s.x=clamp(s.x,p.x-p.w/2+10,p.x+p.w/2-10);dock(s,p,this.maxFuel);if(lift&&s.fuel>0){r.landed=null;s.y-=2;s.vy=-.5;}else return;}
 let prev=s.y;s.rotation=90-dir*20;s.rotationForce=0;let thrust=lift&&s.fuel>0?.105:0;if(thrust)s.fuel=Math.max(0,s.fuel-.065);s.vx+=dir*.058;
 let wind=this.level.wind?Math.sin(r.time*1.2)*.012:0;integrate(s,thrust,s.rotation,wind);
 if(hover&&s.fuel>0){s.vx*=.91;s.vy*=.91;s.fuel=Math.max(0,s.fuel-.06);}
 for(let v of this.level.vents)if(Math.abs(s.x-v.x)<v.w/2&&s.y<v.y&&s.y>v.y-150)s.vy-=.027;
 let target=this.pad(r.next);if(s.vy>0&&target&&Math.abs(s.x-target.x)<target.w/2-8&&s.y<target.y&&target.y-s.y<65){s.vy*=.97;s.vx*=.88;}
 for(let seed of this.level.seeds)if(!r.seeds.includes(seed.id)&&Math.hypot(s.x-seed.x,s.y-seed.y)<17+this.profile.gear.charm*7){r.seeds.push(seed.id);r.events.push({type:'seed',x:seed.x,y:seed.y});}
 for(let p of this.level.pads.map(p=>this.pad(p.id))){let landing=safeLanding(s,p,prev,this.profile.gear.feet);if(landing==='safe'){dock(s,p,this.maxFuel);r.landed=p.id;if(p.id===r.next){r.done.push(p.id);r.checkpoint=p.id;r.next++;r.events.push({type:'dock',x:p.x,y:p.y});if(r.next>=this.level.pads.length){r.state='won';r.events.push({type:'win'});this.release();}}return;}if(landing==='hard'){this.bump('A little too fast. Try a softer landing.');return;}}
 let hit=this.level.rocks.some(o=>{if(o.type==='gate'&&!this.gateClosed(o))return false;return s.x+9>o.x-o.w/2&&s.x-9<o.x+o.w/2&&s.y+12>o.y-o.h/2&&s.y-12<o.y+o.h/2;});
 if(s.x<8||s.x>352||s.y<13||s.y>505||hit){if(r.shield>0){s.vx*=-.5;s.vy*=-.4;s.x=clamp(s.x,13,347);s.y=clamp(s.y,20,495);r.shield=0;r.events.push({type:'protected'});}else this.bump('Back to your last safe dock.');}
 }
 gateClosed(o){return Math.sin(this.run.time*.9+o.x)>-.25;}
 bump(message){let r=this.run;if(r.recover>0||r.state!=='play')return;r.bumps++;r.hearts--;r.events.push({type:'bump',message,x:r.s.x,y:r.s.y});this.release();this.respawn();r.recover=.65;if(r.hearts<=0)r.state='failed';}
 respawn(){let r=this.run,p=this.pad(r.checkpoint);r.s={x:p.x,y:p.y-14,vx:0,vy:0,rotation:90,rotationForce:0,fuel:this.maxFuel};r.landed=p.id;}
 retryCheckpoint(){if(this.run.state!=='failed')return false;this.run.hearts=3;this.run.state='play';this.run.recover=0;this.respawn();return true;}
 claim(){let r=this.run;if(r.state!=='won'||r.claimed)return null;let stars=1+(r.seeds.length===this.level.seeds.length?1:0)+(r.bumps===0?1:0),old=this.profile.best[r.level]||{stars:0,seeds:0};let reward=old.stars===0?10+stars*3+r.seeds.length*2:Math.max(0,stars-old.stars)*3+Math.max(0,r.seeds.length-old.seeds)*2;this.profile.coins+=reward;let grade=stars===3&&r.time<this.level.par?'S':stars===3?'A':stars===2?'B':'C';if(old.grade&&'CBAS'.indexOf(old.grade)>'CBAS'.indexOf(grade))grade=old.grade;this.profile.best[r.level]={stars:Math.max(old.stars,stars),seeds:Math.max(old.seeds,r.seeds.length),time:Math.min(old.time||Infinity,r.time),grade};this.profile.unlocked=Math.max(this.profile.unlocked,Math.min(11,r.level+1));r.claimed=true;return{stars,reward,grade:this.profile.best[r.level].grade};}
 buy(id){let g=GEARS.find(g=>g.id===id),lv=this.profile.gear[id];if(!g||lv>=3||this.run.state==='play'||this.profile.coins<g.cost[lv])return false;this.profile.coins-=g.cost[lv];this.profile.gear[id]++;this.load(this.run.level);return true;}
 snapshot(){let s=copy({profile:this.profile,run:this.run});s.run.events=[];s.run.input={left:false,right:false,lift:false,hover:false,target:null};return s;}
}


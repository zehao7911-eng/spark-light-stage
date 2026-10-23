(function(root){
'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const upgrades=[
 {id:'sonar',icon:'pulse',name:'Singing tide',desc:'A pulse calls distant fish.',max:3},
 {id:'wing',icon:'wing',name:'Silver wings',desc:'Wider rescue radius. Faster flight.',max:3},
 {id:'guard',icon:'shield',name:'Little guardians',desc:'A companion shields your school.',max:3},
 {id:'dash',icon:'bolt',name:'Comet wake',desc:'Dash again sooner. Scatter thorns.',max:3},
 {id:'bloom',icon:'flower',name:'Blooming sanctuary',desc:'Every homecoming restores more time.',max:3},
 {id:'echo',icon:'fish',name:'Echo school',desc:'Little fish sometimes call a friend.',max:3}
];
class CurrentGame{
 constructor(seed=8117){this.seed=seed;this.time=0;this.stage=1;this.mode='title';this.player={x:0,y:80,vx:0,vy:0,a:-Math.PI/2};this.target={x:0,y:80};this.home={x:0,y:80};this.school=[];this.fish=[];this.thorns=[];this.events=[];this.perks={sonar:0,wing:0,guard:0,dash:0,bloom:0,echo:0};this.total=0;this.score=0;this.delivered=0;this.goal=12;this.clock=85;this.dashCd=0;this.dashTime=0;this.pulseCd=0;this.invincible=0;this.combo=0;this.comboTime=0;this.choices=[];this.rescues=0;this.uid=1;this.spawn();}
 random(){this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296;}
 event(type,data={}){this.events.push({type,...data});if(this.events.length>90)this.events.shift();}
 spawn(){this.fish=[];this.thorns=[];const n=24+Math.min(20,this.stage*3);let cx=0,cy=0;for(let i=0;i<n;i++){if(i%3===0){const a=i===0?-.4:this.random()*6.283,r=i===0?195:210+this.random()*345;cx=Math.cos(a)*r;cy=Math.sin(a)*r*.79;}this.fish.push({id:this.uid++,x:cx+(this.random()-.5)*44,y:cy+(this.random()-.5)*36,phase:this.random()*6.283,kind:Math.floor(i/3)%3,group:Math.floor(i/3)});}for(let i=0;i<Math.min(14,3+this.stage);i++){const a=i*2.4+this.random(),r=290+this.random()*270;this.thorns.push({x:Math.cos(a)*r,y:Math.sin(a)*r*.8,r:21+this.random()*13,phase:this.random()*6.283,stun:0});}}
 start(){if(this.mode!=='title')return;this.mode='play';this.event('start');}
 steer(x,y){this.target={x:clamp(x,-710,710),y:clamp(y,-570,570)};}
 dash(){if(this.mode!=='play'||this.dashCd>0)return false;this.dashTime=.36;this.dashCd=Math.max(.9,2.9-this.perks.dash*.5);this.invincible=.5;this.event('dash',{x:this.player.x,y:this.player.y});return true;}
 pulse(){if(this.mode!=='play'||this.perks.sonar<1||this.pulseCd>0)return false;this.pulseCd=9-this.perks.sonar;const p=this.player;this.event('pulse',{x:p.x,y:p.y,r:180+this.perks.sonar*50});for(const f of this.fish){if(dist(f,p)<180+this.perks.sonar*50){f.x+=(p.x-f.x)*.65;f.y+=(p.y-f.y)*.65;}}return true;}
 pick(id){if(this.mode!=='reward'||!this.choices.includes(id))return false;if(this.perks[id]<3)this.perks[id]++;else this.score+=100;this.stage++;this.goal=12+Math.min(22,(this.stage-1)*3);this.delivered=0;this.clock=85+Math.min(35,this.stage*3);this.school=[];this.player.x=0;this.player.y=80;this.target={x:0,y:80};this.player.vx=this.player.vy=0;this.player.a=-Math.PI/2;this.combo=0;this.dashCd=0;this.pulseCd=0;this.spawn();this.mode='play';this.event('stage',{stage:this.stage});return true;}
 finish(){this.mode='reward';const available=upgrades.filter(u=>this.perks[u.id]<u.max);this.choices=[];if(!this.perks.sonar){this.choices.push('sonar');available.splice(available.findIndex(u=>u.id==='sonar'),1);}while(available.length&&this.choices.length<3){const i=Math.floor(this.random()*available.length);this.choices.push(available.splice(i,1)[0].id);}if(!this.choices.length){this.choices=['sonar','wing','guard'];}this.event('win');}
 step(dt){if(this.mode!=='play')return;dt=clamp(dt,0,.04);this.time+=dt;this.clock-=dt;this.dashCd=Math.max(0,this.dashCd-dt);this.pulseCd=Math.max(0,this.pulseCd-dt);this.dashTime=Math.max(0,this.dashTime-dt);this.invincible=Math.max(0,this.invincible-dt);this.comboTime-=dt;if(this.comboTime<=0)this.combo=0;
 const p=this.player,dx=this.target.x-p.x,dy=this.target.y-p.y,d=Math.hypot(dx,dy),speed=(120+this.perks.wing*13)*(this.dashTime>0?3.5:1),ease=1-Math.exp(-dt*5);
 let vx=d>4?dx/d*Math.min(speed,d*3):0,vy=d>4?dy/d*Math.min(speed,d*3):0;p.vx+=(vx-p.vx)*ease;p.vy+=(vy-p.vy)*ease;p.x=clamp(p.x+p.vx*dt,-720,720);p.y=clamp(p.y+p.vy*dt,-580,580);if(Math.hypot(p.vx,p.vy)>4){let a=Math.atan2(p.vy,p.vx),delta=Math.atan2(Math.sin(a-p.a),Math.cos(a-p.a));p.a+=delta*ease;}
 for(let i=this.fish.length-1;i>=0;i--){const f=this.fish[i];f.x+=Math.sin(this.time*.8+f.phase)*dt*8;f.y+=Math.cos(this.time*.6+f.phase)*dt*6;if(dist(f,p)<44+this.perks.wing*10){this.fish.splice(i,1);this.school.push({...f});this.rescues++;this.event('catch',{x:f.x,y:f.y,kind:f.kind});if(this.perks.echo&&this.random()<.25*this.perks.echo)this.school.push({...f,id:this.uid++});}}
 for(let i=0;i<this.school.length;i++){const f=this.school[i],lead=i<3?p:this.school[i-3],a=p.a+(i%3-1)*.5,offset=24+Math.sin(this.time*3+i)*4;const tx=lead.x-Math.cos(a)*offset,ty=lead.y-Math.sin(a)*offset,k=1-Math.exp(-dt*6);f.x+=(tx-f.x)*k;f.y+=(ty-f.y)*k;}
 for(const h of this.thorns){h.stun=Math.max(0,h.stun-dt);if(h.stun>0||dist(h,p)>h.r+20)continue;if(this.dashTime>0){h.stun=9;this.score+=30;this.event('break',{x:h.x,y:h.y});}else if(this.invincible<=0){this.invincible=2;h.stun=2;const lost=Math.min(this.school.length,Math.max(0,3-this.perks.guard));const escaped=this.school.splice(-lost||this.school.length,lost);for(const f of escaped)this.fish.push({...f,x:p.x+100*(this.random()-.5),y:p.y+100*(this.random()-.5)});this.clock-=Math.max(1,4-this.perks.guard);this.event('hit',{x:p.x,y:p.y,lost});}}
 if(dist(p,this.home)<76&&this.school.length){const count=this.school.length;this.school=[];this.delivered+=count;this.total+=count;this.combo++;this.comboTime=16;this.score+=count*10*(1+Math.min(4,this.combo)*.25);this.clock=Math.min(120,this.clock+count*(.35+this.perks.bloom*.2));this.event('home',{x:0,y:80,count,combo:this.combo});if(this.delivered>=this.goal)this.finish();}
 if(this.clock<=0&&this.mode==='play'){this.clock=0;this.mode='over';this.event('over');}
 }
}
if(typeof module!=='undefined')module.exports={CurrentGame,upgrades};else{root.CurrentGame=CurrentGame;root.CurrentUpgrades=upgrades;}
})(typeof window!=='undefined'?window:globalThis);

import Skier from './core/skier';import Sprite from './core/sprite';
export const NAMES=['Bellwood Run','Blueberry Bend','Chalet Crossing','Peachlight Ridge','Frostglass Trail','Moonberry Pines','The Quiet Summit','Lantern Descent'];
export const GEARS=[{id:'edges',name:'CARVE',icon:'⌁',detail:'Quicker turning',cost:[40,85,150]},{id:'wax',name:'WAX',icon:'↠',detail:'Longer, sooner boosts',cost:[45,95,170]},{id:'pocket',name:'MAGNET',icon:'✦',detail:'Wider token pickup',cost:[35,80,145]},{id:'mittens',name:'MITTENS',icon:'♧',detail:'Faster bump recovery',cost:[40,90,160]}];
const copy=x=>JSON.parse(JSON.stringify(x));
function rng(seed){let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};}
export function course(hill=0,seed=3719){let random=rng(seed+hill*7727),gates=[],objects=[],count=Math.min(14,6+Math.floor(hill*.8));
 for(let i=0;i<count;i++){let lane=i===0?0:Math.floor(random()*3)-1,cx=lane*160,y=720+i*760;gates.push({id:'gate'+i,x:cx,y,lane,done:false,hit:false});
  for(const side of [-1,1])objects.push({id:`tree${i}-${side}`,type:'pine',x:side*(230+random()*65),y:y-250-random()*170,hit:false,done:false,grazed:false});
  if(i%2===0)objects.push({id:'ramp'+i,type:'ramp',x:cx,y:y-170,done:false});
  if(i>0)objects.push({id:'stump'+i,type:i%3===0?'rock':'stump',x:lane===0?(i%2?160:-160):-cx,y:y-330,hit:false,done:false,grazed:false});
  for(let j=0;j<3;j++)objects.push({id:`token${i}-${j}`,type:'token',x:cx+(j-1)*32,y:y+85+j*50,done:false});
  if(i%3===1)objects.push({id:'cocoa'+i,type:'cocoa',x:cx+60,y:y+210,done:false});
 }
 return{gates,objects,finish:gates.at(-1).y+430};
}
export class Peaks {
 constructor(saved=null){this.profile={hill:0,coins:0,stars:0,gear:{edges:0,wax:0,pocket:0,mittens:0},records:{},sound:false};this.events=[];
  if(saved?.v===1&&saved.profile&&saved.run&&saved.skier){this.profile={...this.profile,...copy(saved.profile)};this.run=copy(saved.run);this.skier=Object.assign(new Skier(saved.skier.data),copy(saved.skier));this.skier._hittableObjects={};this.skier.onHitObstacleCb=()=>{};this.run.inputX=this.skier.mapPosition[0];}
  else this.newRun();
 }
 get name(){return NAMES[this.profile.hill%8];}
 get hopUnlocked(){return this.profile.stars>=3;}
 get boostUnlocked(){return this.profile.stars>=7;}
 newRun(){let c=course(this.profile.hill);this.run={...c,state:'ready',time:0,score:0,coins:0,flags:0,missed:0,chain:0,bestChain:0,bumps:0,tokens:0,near:0,tricks:0,inputX:0,brake:false,hopCooldown:0,grace:0,finishClaimed:false,jumpWasTrick:false};this.skier=new Skier({id:'puffin',parts:{},hitBoxes:{0:[0,0,24,20],1:[0,0,24,20]},zIndexesOccupied:[0]});this.skier.setMapPosition(0,0,0);this.skier.setWidth(24);this.skier.setHeight(20);this.skier._standardSpeed=4.8+Math.min(1,this.profile.hill*.07);this.skier.setSpeed(this.skier._standardSpeed);this.skier.setTurnEaseCycles(9/(1+this.profile.gear.edges*.28));this.events=[];}
 start(){if(this.run.state!=='ready')return false;this.run.state='play';return true;}
 aim(x){if(!Number.isFinite(x))return;this.run.inputX=Math.max(-245,Math.min(245,x));}
 hop(){if(this.run.state!=='play'||!this.hopUnlocked)return false;if(this.skier.isJumping)return this.skier.attemptTrick();if(this.run.hopCooldown>0)return false;if(this.skier.hasHitJump()){this.run.hopCooldown=2.8;this.events.push({kind:'jump'});return true;}return false;}
 boost(){if(this.run.state!=='play'||!this.boostUnlocked)return false;if(!this.skier.speedBoost())return false;let lv=this.profile.gear.wax;this.skier._boostLeft+=lv*300;this.skier._boostCooldown=Math.max(4000,this.skier._boostCooldown-lv*700);this.events.push({kind:'boost'});return true;}
 collider(o){let tall=o.type==='pine',w=tall?34:o.type==='rock'?38:32,h=tall?22:20;let s=new Sprite({id:o.id,parts:{},zIndexesOccupied:tall?[0,1]:[0],hitBoxes:{0:[0,0,w,h],1:[0,0,w,h]}});s.setMapPosition(o.x,o.y);s.canvasX=o.x-w/2;s.canvasY=o.y-h/2;s.width=w;s.height=h;return s;}
 step(dt=0.02){if(this.run.state!=='play'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(.04,dt);let r=this.run,p=this.skier;r.time+=dt;r.hopCooldown=Math.max(0,r.hopCooldown-dt);r.grace=Math.max(0,r.grace-dt);
  let oldY=p.mapPosition[1],wasJump=p.isJumping,wasTrick=p.isPerformingTrick;
  let landed=p.advanceTime(dt*1000);if(landed){let bonus=wasTrick?100:35;r.tricks+=wasTrick?1:0;r.score+=bonus;this.events.push({kind:wasTrick?'spin':'land',value:bonus});}
  let base=(4.8+Math.min(1,this.profile.hill*.07))*(r.brake?.55:1);p._standardSpeed=base;if(!p.hasBeenHit&&!p.isJumping)p.setSpeed(p._boostLeft>0?base*1.55:base);p.setTurnEaseCycles(9/(1+this.profile.gear.edges*.28));
  if(!p.hasBeenHit){p.isMoving=true;p.setMapPositionTarget(r.inputX,p.mapPosition[1]+1000);}
  p.cycle(dt/.02);p.mapPosition[0]=Math.max(-260,Math.min(260,p.mapPosition[0]));p.canvasX=p.mapPosition[0]-12;p.canvasY=p.mapPosition[1]-10;
  const x=p.mapPosition[0],y=p.mapPosition[1];
  for(const o of r.objects){if(o.done||Math.abs(o.y-y)>100)continue;
   if(['pine','rock','stump'].includes(o.type)){
    const s=this.collider(o);
    if(r.grace<=0&&p.hits(s)&&p.hasHitObstacle(s)){o.hit=true;r.bumps++;r.chain=0;r.grace=1.7+this.profile.gear.mittens*.35;p._stateLeft=Math.max(350,p._stateLeft-this.profile.gear.mittens*150);this.events.push({kind:'bump',x:o.x,y:o.y});}
    if(!o.grazed&&oldY<o.y&&y>=o.y){o.grazed=true;let d=Math.abs(x-o.x);if(!o.hit&&d>30&&d<85){r.near++;r.score+=30;this.events.push({kind:'near',value:30});}}
   }else if(o.type==='ramp'){if(Math.abs(x-o.x)<62&&oldY<o.y&&y>=o.y){o.done=true;if(p.hasHitJump())this.events.push({kind:'jump'});}}
   else {let radius=o.type==='token'?28+this.profile.gear.pocket*22:40;if(Math.hypot(x-o.x,y-o.y)<radius){o.done=true;if(o.type==='token'){r.tokens++;r.coins++;r.score+=10;this.events.push({kind:'token',x:o.x,y:o.y,value:10});}else{r.coins+=3;r.score+=25;r.hopCooldown=0;this.events.push({kind:'cocoa',value:25});}}}
  }
  for(const g of r.gates)if(!g.done&&oldY<g.y&&y>=g.y){g.done=true;if(Math.abs(x-g.x)<=102){g.hit=true;r.flags++;r.chain++;r.bestChain=Math.max(r.bestChain,r.chain);let score=80+Math.min(6,r.chain)*20+(p.isJumping?40:0);r.score+=score;r.coins+=2;this.events.push({kind:'gate',value:score,chain:r.chain});}else{r.missed++;r.chain=0;this.events.push({kind:'miss'});}}
  if(y>=r.finish){r.state='result';r.inputX=x;r.brake=false;this.events.push({kind:'finish'});}
 }
 medals(){return 1+(this.run.flags>=Math.ceil(this.run.gates.length*.8)?1:0)+(this.run.bumps===0?1:0);}
 claim(next=true){let r=this.run;if(r.state!=='result'||r.finishClaimed)return false;r.finishClaimed=true;let h=this.profile.hill,stars=this.medals(),old=this.profile.records[h]||{stars:0,score:0};this.profile.stars+=Math.max(0,stars-old.stars);this.profile.records[h]={stars:Math.max(stars,old.stars),score:Math.max(r.score,old.score)};this.profile.coins+=r.coins+12+Math.floor(r.flags*.5);if(next)this.profile.hill++;this.newRun();return true;}
 buy(id){let g=GEARS.find(g=>g.id===id);if(!g||this.run.state==='play')return false;let lv=this.profile.gear[id],cost=g.cost[lv];if(cost===undefined||this.profile.coins<cost)return false;this.profile.coins-=cost;this.profile.gear[id]++;return cost;}
 snapshot(){const s={};for(const[k,v]of Object.entries(this.skier))if(typeof v!=='function'&&k!=='_hittableObjects'&&v!==undefined)s[k]=v;return copy({v:1,profile:this.profile,run:this.run,skier:s});}
 flush(){let e=this.events;this.events=[];return e;}
}

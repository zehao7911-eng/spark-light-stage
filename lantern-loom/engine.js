(function(root,factory){if(typeof module==='object')module.exports=factory(require('./p2.min.js'),require('./bridge.js'));else root.Loom=factory(root.p2,root.LoomBridge);})(typeof globalThis!=='undefined'?globalThis:this,function(p2,B){
 'use strict';
 const W=384,H=576,BOX={l:70,r:314,t:114,b:438};
 const PERKS=[
  {id:'magnet',name:'Moon pull',text:'Lanterns pull nearby spirits into the bowl.',icon:'moon',max:4},
  {id:'bloom',name:'Echo blooms',text:'Every bell wakes a second ring of flowers.',icon:'flower',max:4},
  {id:'twin',name:'Twin lights',text:'One extra spirit joins every release.',icon:'twin',max:3},
  {id:'silk',name:'Golden thread',text:'Draw 35 more pixels of light bridge.',icon:'spool',max:4},
  {id:'comet',name:'Comet trail',text:'Bell hits collect nearby fireflies.',icon:'star',max:4},
  {id:'dew',name:'Dewkeeper',text:'Each delivered spirit earns extra pollen.',icon:'drop',max:4}
 ];
 function blank(){return {v:1,pollen:0,best:0,clears:0,levels:[0,0,0],album:[],sound:true};}
 function sanitize(v){const b=blank();if(!v||v.v!==1)return b;for(const k of ['pollen','best','clears'])b[k]=Math.min(1e9,Math.max(0,Math.floor(Number(v[k])||0)));b.levels=b.levels.map((_,i)=>Math.max(0,Math.min(4,Math.floor(Number(v.levels?.[i])||0))));b.album=Array.isArray(v.album)?[...new Set(v.album.filter(x=>Number.isInteger(x)&&x>=0&&x<12))]:[];b.sound=v.sound!==false;return b;}
 function recipe(n){
  const mirror=n%2===0,variant=Math.floor((n-1)/2)%3;
  const flip=x=>mirror?384-x:x;
  const src={x:flip(110),y:132};
  const goal={x:flip(180+variant*6),y:421};
  const guides=[{a:{x:flip(84),y:186},b:{x:flip(239),y:246}},{a:{x:flip(308),y:270},b:{x:flip(230),y:340+variant*6}}];
  const bells=[{x:flip(153),y:201,r:11},{x:flip(274),y:295,r:12},{x:flip(202+variant*4),y:385,r:10}];
  const seeds=[{x:flip(110),y:166},{x:flip(185),y:218},{x:flip(294),y:268},{x:flip(218),y:355}];
  // Soft updrafts and moving flower heads join later; nothing kills the player.
  return {src,goal,guides,bells,seeds,season:Math.floor((n-1)/4)%3,wind:n>=5?(mirror?-1:1)*(8+variant*3):0,moving:n>=9};
 }
 class Game{
  constructor(meta=blank(),seed=1){this.meta=sanitize(meta);this.seed=seed>>>0;this.events=[];this.bus=B.bus();this.bus.subscribe('effect',event=>this.events.push(event));this.round=1;this.perks={};this.resetChamber();}
  rng(){this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296;}
  emit(type,data={}){this.bus.publish('effect',{type,...data});}
  drain(){return this.events.splice(0);}
  capacity(){return 285+35*(this.perks.silk||0)+25*this.meta.levels[0];}
  used(){return this.rails.reduce((n,r)=>n+r.width,0);}
  resetChamber(){
   this.ctx=B.createWorld();this.layout=recipe(this.round);this.rails=[];this.spirits=[];this.time=0;this.status='plan';this.delivered=0;this.hits=0;this.sends=0;this.spawnLeft=0;this.spawnClock=0;this.failed=0;this.coins=0;this.combo=0;this.pulseAt=0;
   this.bells=this.layout.bells.map((b,i)=>({...b,id:i,cool:0,lit:false}));this.seeds=this.layout.seeds.map((s,i)=>({...s,id:i,taken:false}));
   // Walls keep the fragile lights in the playable pane.
   for(const x of [BOX.l-5,BOX.r+5]){const wall=new p2.Body({position:[x,280]});wall.addShape(new p2.Box({width:8,height:380}));this.ctx.world.addBody(wall);}
   this.emit('chamber',{round:this.round});
  }
  draw(a,b){if(this.status!=='plan'&&this.status!=='flow')return false;if(this.rails.length>=5)return false;
   const clamp=p=>({x:Math.max(BOX.l+6,Math.min(BOX.r-6,p.x)),y:Math.max(156,Math.min(402,p.y))});a=clamp(a);b=clamp(b);
   const remaining=Math.max(0,this.capacity()-this.used());if(remaining<12||Math.hypot(a.x-b.x,a.y-b.y)<12)return false;
   // Never materialize a bridge through an existing spirit.
   const g=B.geometry(a,b,Math.min(170,remaining));
   if(this.spirits.some(s=>distance(s.body.position,g.a,g.b)<11))return false;
   this.rails.push(B.makeBridge(this.ctx,a,b,Math.min(170,remaining)));this.emit('draw',{x:g.x,y:g.y});return true;
  }
  undo(){if(this.status!=='plan'||!this.rails.length)return false;const r=this.rails.pop();this.ctx.world.removeBody(r.body);this.emit('undo');return true;}
  guide(){if(this.status!=='plan')return;for(const r of this.rails)this.ctx.world.removeBody(r.body);this.rails=[];for(const g of this.layout.guides)this.draw(g.a,g.b);this.emit('guide');}
  release(){if(this.status!=='plan')return false;this.status='flow';this.sends++;this.spawnLeft=4+(this.perks.twin||0);this.spawnClock=0;this.emit('release');return true;}
  pulse(x,y){if(this.round<3||this.status!=='flow'||this.time<(this.pulseAt||0))return false;const b=this.bells.find(b=>Math.hypot(b.x-x,b.y-y)<24);if(!b)return false;this.pulseAt=this.time+2;for(const s of this.spirits){const p=s.body.position;if(Math.hypot(p[0]-b.x,p[1]-b.y)<100){s.body.velocity[0]=(this.layout.goal.x-p[0])*.7;s.body.velocity[1]=Math.max(10,s.body.velocity[1]*.45);}}this.emit('pulse',{x:b.x,y:b.y});return true;}
  spawn(){const s=this.layout.src;const body=new p2.Body({mass:1,position:[s.x,s.y],damping:0.02});const shape=new p2.Circle({radius:6});shape.material=this.ctx.ball;body.addShape(shape);this.ctx.world.addBody(body);const spirit={body,age:0,id:this.rng(),trail:[],bellTimes:[-99,-99,-99],lastBell:0};this.spirits.push(spirit);this.emit('spawn',{x:s.x,y:s.y});}
  step(dt){if(this.status!=='flow')return;dt=Math.min(1/30,Math.max(0,dt));this.time+=dt;
   if(this.spawnLeft>0){this.spawnClock-=dt;if(this.spawnClock<=0){this.spawn();this.spawnLeft--;this.spawnClock=.7;}}
   for(const b of this.bells){b.cool=Math.max(0,b.cool-dt);if(this.layout.moving&&b.id===1)b.x=this.layout.bells[b.id].x+Math.sin(this.time*1.1)*12;}
   const goal=this.layout.goal;
   for(const s of this.spirits){const p=s.body.position;s.age+=dt;s.body.force[0]+=this.layout.wind;const reach=28+(this.perks.magnet||0)*14+this.meta.levels[1]*7;
    if(p[1]>355&&Math.hypot(p[0]-goal.x,p[1]-goal.y)<reach+35){s.body.force[0]+=(goal.x-p[0])*(3+(this.perks.magnet||0));}
    for(const b of this.bells){if(Math.hypot(p[0]-b.x,p[1]-b.y)<b.r+9&&this.time-s.bellTimes[b.id]>.65){s.bellTimes[b.id]=this.time;this.hits++;this.combo=Math.min(12,this.combo+1);b.lit=true;b.cool=.5;s.body.velocity[0]+=(goal.x-p[0])*.2;s.body.velocity[1]=Math.max(12,s.body.velocity[1]*.65);this.earn(1+(this.perks.bloom||0));this.emit('bell',{x:b.x,y:b.y,id:b.id,combo:this.combo});
      if(this.perks.comet)for(const d of this.seeds)if(!d.taken&&Math.hypot(d.x-b.x,d.y-b.y)<60+this.perks.comet*15)this.take(d);
    }}
    for(const d of this.seeds)if(!d.taken&&Math.hypot(p[0]-d.x,p[1]-d.y)<15+this.meta.levels[2]*3)this.take(d);
   }
   // Four substeps prevent tunneling through thin bridges on phones.
   for(let i=0;i<4;i++)this.ctx.world.step(dt/4);
   for(let i=this.spirits.length-1;i>=0;i--){const s=this.spirits[i],p=s.body.position;
    s.body.velocity[0]=Math.max(-160,Math.min(160,s.body.velocity[0]));s.body.velocity[1]=Math.max(-160,Math.min(160,s.body.velocity[1]));
    if(p[1]>=402&&p[1]<449&&Math.abs(p[0]-goal.x)<31+(this.perks.magnet||0)*3){this.delivered++;this.earn(5+(this.perks.dew||0)*2);this.emit('deliver',{x:goal.x,y:goal.y,n:this.delivered});this.remove(i);}
    else if(p[1]>453||s.age>14){this.failed++;this.combo=0;this.emit('lost',{x:p[0],y:Math.min(433,p[1])});this.remove(i);}
   }
   if(this.spawnLeft===0&&this.spirits.length===0){if(this.delivered>=3){this.status='reward';this.meta.clears++;this.meta.best=Math.max(this.round,this.meta.best);const id=(this.round-1)%12;if(!this.meta.album.includes(id))this.meta.album.push(id);this.earn(12+this.round*2);this.choices=this.getChoices();this.emit('clear',{round:this.round,choices:this.choices});}
    else{this.status='plan';this.emit('retry',{needed:3-this.delivered});}}
  }
  remove(i){this.ctx.world.removeBody(this.spirits[i].body);this.spirits.splice(i,1);}
  earn(n){this.meta.pollen+=n;this.coins+=n;}
  take(d){d.taken=true;this.earn(3);this.emit('seed',{x:d.x,y:d.y});}
  getChoices(){let options=PERKS.filter(p=>(this.perks[p.id]||0)<p.max);const out=[];while(options.length&&out.length<3)out.push(options.splice(Math.floor(this.rng()*options.length),1)[0].id);if(!out.length)out.push('harvest');return out;}
  choose(id){if(this.status!=='reward'||!this.choices.includes(id))return false;if(id==='harvest')this.meta.pollen+=40;else this.perks[id]=(this.perks[id]||0)+1;this.round++;this.resetChamber();return true;}
  restart(){this.resetChamber();}
  shop(i){if(!Number.isInteger(i)||i<0||i>2||this.status==='flow')return false;const lv=this.meta.levels[i],cost=40*(lv+1)**2;if(lv>=4||this.meta.pollen<cost)return false;this.meta.pollen-=cost;this.meta.levels[i]++;this.emit('upgrade',{i});return true;}
  serialize(){return {meta:this.meta,round:this.round,perks:this.perks,seed:this.seed,status:this.status,choices:this.choices,coins:this.coins,rails:this.rails.map(r=>({a:r.a,b:r.b}))};}
  static restore(v){const g=new Game(v?.meta,v?.seed||1);g.round=Math.max(1,Math.min(999,Math.floor(Number(v?.round)||1)));for(const p of PERKS)g.perks[p.id]=Math.max(0,Math.min(p.max,Math.floor(Number(v?.perks?.[p.id])||0)));g.resetChamber();if(Array.isArray(v?.rails))for(const r of v.rails.slice(0,5))if([r?.a?.x,r?.a?.y,r?.b?.x,r?.b?.y].every(Number.isFinite))g.draw(r.a,r.b);if(v?.status==='reward'){g.status='reward';g.delivered=3;g.coins=Math.max(0,Math.min(1e6,Number(v.coins)||0));g.choices=Array.isArray(v.choices)?[...new Set(v.choices.filter(k=>k==='harvest'||PERKS.some(p=>p.id===k&&(g.perks[k]||0)<p.max)))].slice(0,3):[];if(!g.choices.length)g.choices=g.getChoices();}return g;}
 }
 function distance(p,a,b){const vx=b.x-a.x,vy=b.y-a.y,l=vx*vx+vy*vy;const t=l?Math.max(0,Math.min(1,((p[0]-a.x)*vx+(p[1]-a.y)*vy)/l)):0;return Math.hypot(p[0]-a.x-vx*t,p[1]-a.y-vy*t);}
 return {Game,PERKS,recipe,BOX,W,H,blank,distance};
});

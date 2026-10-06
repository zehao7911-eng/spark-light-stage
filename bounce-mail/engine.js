(function(root){'use strict';
class MailGame{
 constructor(){this.route=1;this.total=0;this.best=0;this.stamps=[];this.upgrades=[];this.seed=125981;this.start()}
 rng(){this.seed=(this.seed*1664525+1013904223)>>>0;return this.seed/4294967296}
 goal(){return 6+Math.min(10,this.route*2)}
 start(){this.route=1;this.total=0;this.begin()}
 begin(){this.state='play';this.delivered=0;this.lives=4+(this.upgrades.includes('Heart')?1:0);this.combo=0;this.maxCombo=0;this.time=0;this.spawnClock=70;this.balls=[];this.effects=[];this.paddle={x:300,target:300,w:78+(this.upgrades.includes('Wide')?20:0),bounce:0};this.id=0;this.events=[]}
 next(upgrade){if(upgrade&&!this.upgrades.includes(upgrade))this.upgrades.push(upgrade);this.route++;this.begin()}
 emit(type,x,y,color=0,label=''){this.events.push({type,x,y,color,label});this.effects.push({type,x,y,color,label,t:0})}
 spawn(){let side=this.id%2,offset=(this.rng()-.5)*160;let b={id:++this.id,x:300+offset,y:76,vx:0,vy:1.3,side,bounces:0,rot:(this.rng()-.5)*.3,trail:[],kind:this.route>=3&&this.id%5===0?'gold':'normal'};this.balls.push(b);this.emit('spawn',b.x,b.y,side);return b}
 deliver(b){this.delivered++;this.combo++;this.maxCombo=Math.max(this.maxCombo,this.combo);let gain=10+Math.min(10,this.combo)*2+(b.kind==='gold'?20:0);this.total+=gain;this.best=Math.max(this.best,this.total);this.emit('deliver',b.x,b.y,b.side,'+'+gain);if(this.combo%4===0){this.total+=25;this.emit('combo',300,150,b.side,'CHAIN '+this.combo)}if(this.delivered>=this.goal()){this.state='win';if(!this.stamps.includes((this.route-1)%4))this.stamps.push((this.route-1)%4);this.emit('win',300,300)}}
 miss(b,wrong=false){this.lives--;this.combo=0;this.emit('miss',b.x,Math.min(750,b.y),b.side,wrong?'Wrong carriage':'Missed');if(this.lives<=0){this.state='lose';this.best=Math.max(this.best,this.total)}}
 step(){if(this.state!=='play')return;this.time++;this.events=[];this.paddle.x+=(Math.max(88,Math.min(512,this.paddle.target))-this.paddle.x)*.3;this.paddle.bounce*=.82;this.effects.forEach(e=>e.t++);this.effects=this.effects.filter(e=>e.t<55);this.spawnClock--;if(this.spawnClock<=0&&this.balls.length<Math.min(3,1+Math.floor(this.route/2))){this.spawn();this.spawnClock=Math.max(100,220-this.route*14)}
 let dead=new Set;for(let b of this.balls){b.squash=(b.squash||0)*.84;let oldY=b.y;b.vy+=.22;b.x+=b.vx;b.y+=b.vy;b.rot+=b.vx*.007;b.trail.push({x:b.x,y:b.y});if(b.trail.length>10)b.trail.shift();
 if(b.vy>0&&oldY<=690&&b.y>=690&&Math.abs(b.x-this.paddle.x)<=this.paddle.w+12){let d=(b.x-this.paddle.x)/this.paddle.w;b.vx=Math.max(-8.5,Math.min(8.5,d*9));if(Math.abs(b.vx)<2.8)b.vx=(b.side===0?-1:1)*2.8;b.vy=-13.6;b.y=688;b.bounces++;b.squash=1;this.paddle.bounce=1;this.emit('bounce',b.x,700,b.side);}
 if(b.bounces>0&&(b.x<68||b.x>532)){let side=b.x<68?0:1;if(b.y>190&&b.y<610){if(side===b.side)this.deliver(b);else this.miss(b,true);dead.add(b.id)}else{b.x=Math.max(68,Math.min(532,b.x));b.vx*=-.72;this.emit('tap',b.x,b.y,b.side)}}
 if(b.y>775){this.miss(b);dead.add(b.id)}if(this.state!=='play')break;
 }this.balls=this.balls.filter(b=>!dead.has(b.id));
 }
 snapshot(){return JSON.parse(JSON.stringify({route:this.route,total:this.total,best:this.best,stamps:this.stamps,upgrades:this.upgrades,seed:this.seed,state:this.state,delivered:this.delivered,lives:this.lives,combo:this.combo,maxCombo:this.maxCombo,time:this.time,spawnClock:this.spawnClock,balls:this.balls,paddle:this.paddle,id:this.id,effects:this.effects}))}
 restore(s){for(let k of Object.keys(s))this[k]=JSON.parse(JSON.stringify(s[k]));this.events=[]}
}
if(typeof module!=='undefined')module.exports=MailGame;else root.MailGame=MailGame;
})(globalThis);

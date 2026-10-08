/* Original deterministic fixed-step escape simulation. No third-party assets. */
(function(root){'use strict';
const T=48,W=720,H=1008;
const PLANS=[
{name:'THE CAGE',color:'#cc692f',ink:'#263c2e',par:25,walls:[[1,14,5,1],[9,14,5,1],[4,6,1,5],[10,6,1,5],[1,5,4,1],[10,5,4,1]],guards:[[7,16,0],[3,12,0],[11,11,0],[7,9,0],[6,4,0],[9,3,0]],cages:[[2,17],[12,8]],crates:[[7,14],[5,10],[9,6]],glass:[[7,6]],barrels:[]},
{name:'GLASSHOUSE',color:'#cfc768',ink:'#28433b',par:30,walls:[[4,12,2,1],[9,12,2,1],[4,7,1,5],[10,7,1,5],[1,6,4,1],[10,6,4,1],[6,3,3,1]],guards:[[7,16,0],[3,14,0],[11,14,0],[7,10,1],[2,7,0],[12,7,0],[5,4,0],[10,3,0]],cages:[[2,17],[7,8],[12,3]],crates:[[2,12],[12,12],[6,6],[8,6]],glass:[[1,12],[2,12],[3,12],[11,12],[12,12],[13,12]],barrels:[[7,11]]},
{name:'THE LOADING BAY',color:'#a5bcb0',ink:'#233c3c',par:32,walls:[[3,15,1,3],[10,14,1,4],[5,11,5,1],[2,7,4,1],[9,7,4,1],[6,3,1,3]],guards:[[7,16,1],[4,14,0],[12,12,0],[3,10,0],[10,9,0],[7,7,2],[3,4,0],[10,3,0]],cages:[[2,16],[12,16],[3,3]],crates:[[5,14],[6,14],[7,14],[8,14],[3,8],[11,8]],glass:[[7,4],[8,4]],barrels:[[2,10],[11,10]]},
{name:'NIGHT SHIFT',color:'#294c57',ink:'#111e27',par:40,walls:[[1,15,9,1],[5,11,9,1],[1,7,9,1],[5,3,9,1]],guards:[[7,17,0],[12,15,1],[11,12,0],[7,13,2],[2,10,0],[3,8,1],[12,7,0],[11,5,0],[2,4,0],[3,2,0]],cages:[[2,17],[12,9],[2,5]],crates:[[11,15],[3,11],[11,7]],glass:[[4,11],[10,7]],barrels:[[8,13],[4,9]]},
{name:'HARD HATS',color:'#cf772e',ink:'#352c23',par:32,walls:[[3,13,2,4],[10,13,2,4],[6,9,3,3],[2,5,3,2],[10,4,3,2]],guards:[[7,17,2],[2,12,0],[12,12,1],[7,13,0],[4,9,2],[10,9,0],[7,6,1],[2,3,0],[12,3,0],[9,2,0]],cages:[[2,17],[12,17],[7,8]],crates:[[6,14],[7,14],[8,14],[3,8],[11,8]],glass:[[6,5],[7,5],[8,5]],barrels:[[2,10],[12,10],[7,4]]},
{name:'COLD STORAGE',color:'#88aab1',ink:'#283942',par:35,walls:[[1,14,5,1],[9,14,5,1],[4,9,7,1],[1,5,5,1],[9,5,5,1],[4,3,1,2],[10,3,1,2]],guards:[[7,16,1],[3,12,2],[11,12,0],[7,11,0],[3,8,1],[11,8,0],[7,6,2],[3,3,0],[12,3,1],[7,3,0]],cages:[[2,17],[12,17],[2,6]],crates:[[7,14],[2,9],[12,9],[7,5]],glass:[[1,9],[2,9],[3,9],[11,9],[12,9],[13,9]],barrels:[[5,12],[9,7]]},
{name:'RED ALERT',color:'#c34f34',ink:'#2e2522',par:38,walls:[[4,14,7,1],[2,10,3,2],[10,10,3,2],[6,7,3,2],[2,3,3,2],[10,3,3,2]],guards:[[7,16,2],[2,14,0],[12,14,1],[7,12,0],[3,8,1],[11,8,2],[7,6,0],[3,6,0],[11,6,1],[7,3,2],[5,2,0],[9,2,0]],cages:[[2,17],[12,17],[2,7]],crates:[[2,13],[12,13],[5,8],[9,8]],glass:[[5,5],[6,5],[7,5],[8,5],[9,5]],barrels:[[7,13],[3,7],[11,7]]},
{name:'DAYLIGHT',color:'#b7c98a',ink:'#253e36',par:40,walls:[[3,14,2,4],[10,14,2,4],[6,11,3,2],[1,7,5,1],[9,7,5,1],[4,3,1,3],[10,3,1,3]],guards:[[7,17,0],[2,13,2],[12,13,1],[7,14,0],[4,10,1],[10,10,0],[7,9,2],[2,6,0],[12,6,1],[7,5,0],[6,3,2],[9,2,1]],cages:[[2,17],[12,17],[2,4]],crates:[[7,16],[5,9],[9,9],[7,7]],glass:[[6,7],[7,7],[8,7]],barrels:[[3,9],[11,9]]}
];
const clamp=(a,b,c)=>Math.max(b,Math.min(c,a)),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
class Engine{
constructor(index=0,cycle=0){this.index=index%8;this.cycle=cycle;this.plan=PLANS[this.index];this.time=0;this.tick=0;this.state='play';this.player={x:360,y:888,r:20,vx:0,vy:0,face:-Math.PI/2,hp:4,inv:0,cool:0,held:null,steps:0};this.exit={x:360,y:76,r:38};this.walls=[];this.items=[];this.enemies=[];this.shots=[];this.events=[];this.effects=[];this.marks=[];this.friends=[];this.hits=0;this.kills=0;this.released=0;this.grabs=0;this.throws=0;this.blocks=0;this.combo=0;this.bestCombo=0;this.comboTimer=0;this.shake=0;this.stop=0;this.seq=1;this.rng=(index+1)*9137+cycle*373;this.input={x:0,y:0};
const wall=(x,y,w,h)=>this.walls.push({x:x*T,y:y*T,w:w*T,h:h*T});wall(0,0,15,1);wall(0,20,15,1);wall(0,1,1,19);wall(14,1,1,19);for(const a of this.plan.walls)wall(...a);
for(const [k,arr] of [['crate',this.plan.crates],['glass',this.plan.glass],['barrel',this.plan.barrels],['cage',this.plan.cages]])for(const [x,y]of arr){if(this.items.some(a=>a.x===x*T+24&&a.y===y*T+24))continue;this.items.push({id:this.seq++,kind:k,x:x*T+24,y:y*T+24,r:k==='cage'?23:k==='barrel'?17:22,hp:1,dead:false});}
for(const [x,y,type]of this.plan.guards)this.enemies.push({id:this.seq++,x:x*T+24,y:y*T+24,ox:x*T+24,oy:y*T+24,r:type===2?17:14,type,face:Math.PI/2,mode:'patrol',vx:0,vy:0,clock:this.rand()*2,alert:0,wind:0,reload:1,stun:0,grip:2,path:[],pathTimer:0,dead:false});
if(cycle)for(let n=0;n<Math.min(5,cycle+1);n++){let x=(2+n*2)*T+24,y=120;if(!this.blocked(x,y,16))this.enemies.push({...this.enemies[0],id:this.seq++,x,y,ox:x,oy:y,type:n%3,path:[],dead:false});}
this.emit('begin',this.player.x,this.player.y);
}
rand(){this.rng=(Math.imul(this.rng,1664525)+1013904223)>>>0;return this.rng/4294967296;}
emit(type,x,y,n=0){this.events.push({type,x,y,n});if(this.events.length>40)this.events.shift();}
wallAt(x,y,r=0){return this.walls.find(a=>x+r>a.x&&x-r<a.x+a.w&&y+r>a.y&&y-r<a.y+a.h);}
blocked(x,y,r=0,items=true){return !!this.wallAt(x,y,r)||(items&&this.items.some(a=>!a.dead&&a.kind!=='glass'&&Math.abs(x-a.x)<r+a.r&&Math.abs(y-a.y)<r+a.r));}
line(x,y,xx,yy,items=false){let d=Math.hypot(xx-x,yy-y),n=Math.ceil(d/12);for(let i=1;i<n;i++){if(this.blocked(x+(xx-x)*i/n,y+(yy-y)*i/n,2,items))return false;}return true;}
move(a,dx,dy,items=true){let hit=false;let n=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dy))/7));for(let i=0;i<n;i++){if(!this.blocked(a.x+dx/n,a.y,a.r,items))a.x+=dx/n;else hit=true;if(!this.blocked(a.x,a.y+dy/n,a.r,items))a.y+=dy/n;else hit=true;}return hit;}
nearest(range=112){let p=this.player,found=null,d=range;for(let e of this.enemies){if(e.dead||e.mode==='held'||e.mode==='flying')continue;let dd=dist(p,e);if(dd<d&&this.line(p.x,p.y,e.x,e.y)){found=e;d=dd;}}return found;}
aim(){const p=this.player,e=this.nearest(112);if(e)p.face=Math.atan2(e.y-p.y,e.x-p.x);return p.face;}
action(kind){if(this.state!=='play')return false;let p=this.player;if(p.cool>0)return false;const angle=this.aim(),dx=Math.cos(angle),dy=Math.sin(angle);
if(p.held!==null){let e=this.enemies.find(e=>e.id===p.held);p.held=null;if(e&&!e.dead){e.mode='flying';e.vx=dx*830;e.vy=dy*830;e.stun=2.2;e.wind=0;this.throws++;this.emit('throw',e.x,e.y);this.shake=5;p.cool=.22;return true;}}
if(kind==='grab'){let e=this.nearest(88);if(e){if(e.type===2&&e.stun<=0){this.emit('armour',e.x,e.y);p.cool=.12;return false;}e.mode='held';e.wind=0;e.grip=2;e.reload=.7;p.held=e.id;this.grabs++;this.emit('grab',e.x,e.y);p.cool=.18;return true;}this.emit('empty',p.x,p.y);p.cool=.12;return false;}
p.cool=.32;this.emit('shove',p.x+dx*24,p.y+dy*24,angle);this.shake=2;
let affected=0;for(let e of this.enemies){if(e.dead||e.mode==='held')continue;let d=dist(p,e),a=Math.atan2(e.y-p.y,e.x-p.x);if(d<110&&Math.cos(a-angle)>.25&&this.line(p.x,p.y,e.x,e.y)){if(e.type===2&&e.stun<=0){e.stun=2.6;e.mode='stun';this.move(e,dx*20,dy*20);this.emit('armour',e.x,e.y);affected++;}else{e.mode='flying';e.stun=1.7;e.vx=dx*690;e.vy=dy*690;e.wind=0;affected++;}}}
for(let a of this.items){if(a.dead)continue;let d=dist(p,a),an=Math.atan2(a.y-p.y,a.x-p.x);if(d<110&&Math.cos(an-angle)>.2&&this.line(p.x,p.y,a.x,a.y))this.breakItem(a);}
return !!affected;
}
breakItem(a){if(a.dead)return;a.dead=true;this.shake=Math.max(this.shake,5);this.emit(a.kind,a.x,a.y);this.mark(a.x,a.y,a.kind);if(a.kind==='cage'){this.released++;this.friends.push({x:a.x,y:a.y,r:12,phase:this.rand()*6});this.emit('rescue',a.x,a.y,this.released);}if(a.kind==='barrel'){this.emit('blast',a.x,a.y);this.shake=12;for(let e of this.enemies)if(!e.dead&&dist(e,a)<130)this.kill(e,'blast');for(let b of this.items)if(!b.dead&&dist(a,b)<100)this.breakItem(b);if(dist(a,this.player)<80)this.damage(a.x,a.y);}}
mark(x,y,kind){this.marks.push({x,y,kind,angle:this.rand()*7,seed:this.rand()});if(this.marks.length>95)this.marks.shift();}
kill(e,kind='impact'){if(e.dead)return;e.dead=true;if(this.player.held===e.id)this.player.held=null;this.kills++;this.combo=this.comboTimer>0?this.combo+1:1;this.bestCombo=Math.max(this.combo,this.bestCombo);this.comboTimer=2.5;this.shake=Math.max(this.shake,6);this.emit(kind,e.x,e.y,this.combo);this.mark(e.x,e.y,'ink');this.stop=.035;}
damage(x,y){let p=this.player;if(p.inv>0||this.state!=='play')return;p.hp--;p.inv=1.4;this.hits++;this.shake=10;this.emit('hurt',p.x,p.y);let d=Math.hypot(p.x-x,p.y-y)||1;this.move(p,(p.x-x)/d*18,(p.y-y)/d*18);if(!p.hp){this.state='lost';this.emit('lost',p.x,p.y);}}
route(a,b){const sx=Math.floor(a.x/T),sy=Math.floor(a.y/T),tx=Math.floor(b.x/T),ty=Math.floor(b.y/T),q=[[sx,sy]],prev=new Map([[sx+sy*15,null]]);let end=null;for(let n=0;n<q.length&&n<315;n++){let [x,y]=q[n];if(x===tx&&y===ty){end=x+y*15;break;}for(let [dx,dy]of [[0,-1],[1,0],[-1,0],[0,1]]){let xx=x+dx,yy=y+dy,key=xx+yy*15;if(xx<1||yy<1||xx>13||yy>19||prev.has(key)||this.blocked(xx*T+24,yy*T+24,17))continue;prev.set(key,x+y*15);q.push([xx,yy]);}}if(end===null)return[];let path=[];while(prev.get(end)!==null){path.push({x:(end%15)*T+24,y:Math.floor(end/15)*T+24});end=prev.get(end);}return path.reverse();}
update(dt,input=this.input){if(this.state!=='play')return;this.input={x:input.x||0,y:input.y||0};this.tick++;this.time+=dt;let p=this.player;p.inv=Math.max(0,p.inv-dt);p.cool=Math.max(0,p.cool-dt);this.comboTimer=Math.max(0,this.comboTimer-dt);this.shake=Math.max(0,this.shake-30*dt);if(this.stop>0){this.stop-=dt;return;}
let ix=this.input.x,iy=this.input.y,l=Math.hypot(ix,iy);if(l>1){ix/=l;iy/=l;}let speed=p.held!==null?148:198;p.vx+=(ix*speed-p.vx)*Math.min(1,dt*18);p.vy+=(iy*speed-p.vy)*Math.min(1,dt*18);this.move(p,p.vx*dt,p.vy*dt);if(Math.hypot(p.vx,p.vy)>30){p.face=Math.atan2(p.vy,p.vx);p.steps+=Math.hypot(p.vx,p.vy)*dt/20;}
// Fragile glass can be run through; crates require a shove.
for(let a of this.items)if(!a.dead&&a.kind==='glass'&&dist(p,a)<a.r+p.r)this.breakItem(a);
for(let e of this.enemies){if(e.dead)continue;e.clock+=dt;e.reload=Math.max(0,e.reload-dt);e.stun=Math.max(0,e.stun-dt);
if(e.mode==='held'){let dx=Math.cos(p.face),dy=Math.sin(p.face);e.x=p.x+dx*36;e.y=p.y+dy*36;e.face=p.face;if(!this.line(p.x,p.y,e.x,e.y)){e.x=p.x+dx*24;e.y=p.y+dy*24;}continue;}
if(e.mode==='flying'){let speed=Math.hypot(e.vx,e.vy);let collided=false;let sub=Math.ceil(speed*dt/6);for(let k=0;k<sub&&!e.dead;k++){let nx=e.x+e.vx*dt/sub,ny=e.y+e.vy*dt/sub;if(this.wallAt(nx,ny,e.r)){collided=true;break;}for(let a of this.items)if(!a.dead&&Math.abs(nx-a.x)<a.r+e.r&&Math.abs(ny-a.y)<a.r+e.r){this.breakItem(a);collided=true;}e.x=nx;e.y=ny;for(let b of this.enemies)if(b!==e&&!b.dead&&b.mode!=='held'&&dist(e,b)<e.r+b.r+4){this.kill(b);collided=true;}}
if(collided){this.kill(e);continue;}e.vx*=Math.exp(-dt*2.8);e.vy*=Math.exp(-dt*2.8);if(speed<60||e.stun<=0){e.mode='stun';e.stun=1;e.vx=e.vy=0;}continue;}
if(e.mode==='stun'){if(e.stun<=0){e.mode='alert';e.alert=4;e.reload=.8;}continue;}
let dd=dist(e,p),visible=dd<360&&this.line(e.x,e.y,p.x,p.y,true);if(visible){e.alert=4;e.mode='alert';}else e.alert=Math.max(0,e.alert-dt);
if(e.wind>0){e.wind-=dt;if(e.wind>.16&&visible)e.face=Math.atan2(p.y-e.y,p.x-e.x);if(e.wind<=0){let offsets=e.type===1?[-.13,0,.13]:[0];for(let off of offsets){if(this.shots.length>=72)break;let an=e.face+off;this.shots.push({x:e.x+Math.cos(an)*23,y:e.y+Math.sin(an)*23,vx:Math.cos(an)*330,vy:Math.sin(an)*330,life:2.3,from:e.id});}this.emit('shot',e.x,e.y,e.face);e.reload=1.6-(Math.min(this.cycle,5)*.06);}}
else if(visible&&e.reload<=0&&dd>55){e.wind=e.type===1?1.1:.9;this.emit('aim',e.x,e.y);}
else if(e.reload>.35||!visible){let target=null;if(e.alert>0){if(visible){target=p;}else{e.pathTimer-=dt;if(e.pathTimer<=0){e.path=this.route(e,p);e.pathTimer=.7;}while(e.path.length&&dist(e,e.path[0])<12)e.path.shift();target=e.path[0];}}
else{e.mode='patrol';target={x:e.ox+Math.sin(e.clock*.55)*32,y:e.oy+Math.cos(e.clock*.55)*24};}
if(target&&(dd>140||!visible)){let dx=target.x-e.x,dy=target.y-e.y,d=Math.hypot(dx,dy)||1,sp=e.alert>0?58:25;this.move(e,dx/d*sp*dt,dy/d*sp*dt);e.face=Math.atan2(dy,dx);}}
if(dd<p.r+e.r&&e.stun<=0)this.damage(e.x,e.y);
}
for(let s of this.shots){if(s.life<=0)continue;s.life-=dt;let n=Math.ceil(Math.hypot(s.vx,s.vy)*dt/6);for(let j=0;j<n&&s.life>0;j++){s.x+=s.vx*dt/n;s.y+=s.vy*dt/n;if(this.wallAt(s.x,s.y,3)){s.life=0;this.emit('spark',s.x,s.y);break;}let item=this.items.find(a=>!a.dead&&Math.abs(a.x-s.x)<a.r&&Math.abs(a.y-s.y)<a.r);if(item){this.breakItem(item);s.life=0;break;}
let held=this.enemies.find(e=>e.id===p.held);if(held&&dist(held,s)<29){s.life=0;held.grip--;this.blocks++;this.emit('block',held.x,held.y);if(held.grip<=0)this.kill(held,'shield');continue;}
let e=this.enemies.find(e=>!e.dead&&e.id!==s.from&&e.mode!=='held'&&dist(e,s)<e.r+3);if(e){s.life=0;this.kill(e,'friendly');continue;}if(dist(p,s)<p.r+3){s.life=0;this.damage(s.x-s.vx*.02,s.y-s.vy*.02);}}
}this.shots=this.shots.filter(s=>s.life>0);
for(let i=0;i<this.friends.length;i++){let f=this.friends[i],a=p.face+Math.PI+(i%2?-.4:.4),tar={x:p.x+Math.cos(a)*(55+i*18),y:p.y+Math.sin(a)*(55+i*18)},d=dist(f,tar);if(d>10)this.move(f,(tar.x-f.x)/d*Math.min(155,d*3)*dt,(tar.y-f.y)/d*Math.min(155,d*3)*dt);f.phase+=dt*9;}
if(dist(p,this.exit)<43){this.state='won';this.emit('win',p.x,p.y);}
}
snapshot(){const o={};for(let k of ['index','cycle','time','tick','state','player','items','enemies','shots','marks','friends','hits','kills','released','grabs','throws','blocks','combo','bestCombo','comboTimer','seq','rng'])o[k]=JSON.parse(JSON.stringify(this[k]));return o;}
static restore(o){if(!o||!Number.isInteger(o.index)||o.index<0||o.index>7||!o.player||!Array.isArray(o.enemies))throw Error('Invalid save');let e=new Engine(o.index,o.cycle||0);for(let k of Object.keys(e.snapshot()))if(k in o)e[k]=JSON.parse(JSON.stringify(o[k]));e.events=[];e.input={x:0,y:0};e.player.vx=e.player.vy=0;e.shake=e.stop=0;return e;}
medals(){return[this.state==='won',this.state==='won'&&this.released===this.plan.cages.length,this.state==='won'&&this.time<=this.plan.par];}
}
root.Iron={Engine,PLANS,T,W,H,dist,clamp};if(typeof module!=='undefined')module.exports=root.Iron;
})(typeof window!=='undefined'?window:globalThis);

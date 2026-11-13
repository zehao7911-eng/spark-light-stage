(function(root){'use strict';
const W=480,H=700,FLOOR=610,GRAV=430;const LEVELS=[
 {goal:3,lives:3,spawn:2.8,max:1,wind:0,basket:0,bump:0,label:'FIRST FLIGHT'},
 {goal:4,lives:3,spawn:2.3,max:2,wind:0,basket:50,bump:0,label:'BUSY SKY'},
 {goal:5,lives:3,spawn:2.1,max:2,wind:24,basket:0,bump:1,label:'BREEZY BLOCK'},
 {goal:6,lives:3,spawn:1.9,max:2,wind:-28,basket:76,bump:1,label:'WINDY WINDOWS'},
 {goal:6,lives:3,spawn:1.7,max:3,wind:0,basket:90,bump:2,label:'DOUBLE BOUNCE'},
 {goal:7,lives:4,spawn:1.65,max:3,wind:34,basket:85,bump:2,label:'SKY PARADE'}];
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}function fresh(){return {level:0,coins:0,best:0,pad:0,sound:true,stars:0}}
function safeParse(x){let p=fresh();try{let a=JSON.parse(x);for(let k of ['level','coins','best','pad','stars'])if(Number.isFinite(a[k]))p[k]=Math.max(0,Math.min(99999,Math.floor(a[k])));p.pad=Math.min(p.pad,3);if(typeof a.sound==='boolean')p.sound=a.sound}catch(_){}return p}
function config(p){let c=LEVELS[p.level%LEVELS.length];return {...c,cycle:Math.floor(p.level/LEVELS.length)}}
function newGame(p){let c=config(p);return {time:0,padX:240,padWidth:126+p.pad*12,balls:[{id:0,type:0,x:240,y:390,vx:0,vy:80,rotation:0,flash:0,bumperCd:0}],nextId:1,spawnIn:2.3,saved:0,lives:c.lives,combo:0,score:0,active:false,status:'playing',padPop:0,basketPop:0,goalX:240,misses:0};}
function setPad(s,x){s.padX=clamp(x,s.padWidth/2+8,W-s.padWidth/2-8)}
function step(s,p,dt){if(!s.active||s.status!=='playing')return [];let ev=[];dt=clamp(dt,0,.04);let c=config(p);s.time+=dt;s.padPop=Math.max(0,s.padPop-dt*2.8);s.basketPop=Math.max(0,s.basketPop-dt*2);s.goalX=240+c.basket*Math.sin(s.time*.75);s.spawnIn-=dt;
 if(s.spawnIn<=0&&s.balls.length<c.max&&s.saved+s.balls.length<c.goal){let n=s.nextId++;s.balls.push({id:n,type:n%4,x:80+(n*137%320),y:210,vx:((n%3)-1)*35,vy:70,rotation:0,flash:0,bumperCd:0});s.spawnIn=Math.max(1.3,c.spawn-Math.min(c.cycle*.08,.3));ev.push({type:'spawn'})}
 for(const b of s.balls){let prevY=b.y;b.vy+=GRAV*dt;b.vx+=c.wind*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.rotation=clamp(b.vx/750,-.22,.22);b.flash=Math.max(0,b.flash-dt*2);b.bumperCd=Math.max(0,b.bumperCd-dt);
 if(b.x<25){b.x=25;b.vx=Math.abs(b.vx)*.8}if(b.x>455){b.x=455;b.vx=-Math.abs(b.vx)*.8}if(b.y<50){b.y=50;b.vy=Math.abs(b.vy)*.65}
 if(b.vy<0&&prevY>=165&&b.y<165&&Math.abs(b.x-s.goalX)<78){b.done=true;s.saved++;s.combo++;s.score+=10+Math.min(20,s.combo*2);s.basketPop=1;ev.push({type:'save',x:b.x,y:b.y,combo:s.combo});continue}
 if(c.bump&&b.bumperCd<=0){for(let j=0;j<c.bump;j++){let bx=j?340:140,by=j?360:300,dx=b.x-bx,dy=b.y-by,dist=Math.hypot(dx,dy);if(dist<48&&dist>0){let nx=dx/dist,ny=dy/dist;b.x=bx+nx*48;b.y=by+ny*48;let dot=b.vx*nx+b.vy*ny;if(dot<0){b.vx-=1.6*dot*nx;b.vy-=1.6*dot*ny}b.bumperCd=.4;b.flash=1;ev.push({type:'bumper',x:b.x,y:b.y});break}}}
 if(b.vy>0&&prevY<=FLOOR-26&&b.y>=FLOOR-26&&Math.abs(b.x-s.padX)<s.padWidth/2+15){let offset=clamp((b.x-s.padX)/(s.padWidth/2),-1,1);b.y=FLOOR-26;b.vy=-655;b.vx=clamp((s.goalX-b.x)*1.05+offset*165,-210,210);b.flash=1;s.padPop=1;ev.push({type:'bounce',x:b.x,y:b.y})}
 if(b.y>H+35){b.done=true;s.lives--;s.misses++;s.combo=0;ev.push({type:'miss',x:b.x,y:650});if(s.lives<=0){s.status='lost';ev.push({type:'lost'});break}}
 }
 s.balls=s.balls.filter(b=>!b.done);if(s.saved>=c.goal){s.status='won';ev.push({type:'won'})}return ev;}
function award(p,s){if(s.status!=='won')return null;let stars=1+(s.misses<=1?1:0)+(s.misses===0?1:0),coins=20+s.score;p.level++;p.best=Math.max(p.best,p.level);p.coins+=coins;p.stars+=stars;return {coins,stars}}
const api={W,H,FLOOR,GRAV,LEVELS,clamp,fresh,safeParse,config,newGame,setPad,step,award};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SkyModel=api;
})(typeof window==='undefined'?globalThis:window);


(function(root,factory){if(typeof module==='object')module.exports=factory();else root.Hug=factory();})(typeof globalThis!=='undefined'?globalThis:this,()=>{
'use strict';
const names=['Laundry Day','Peach Parade','Fern & Thread','Berry Circus','Windmill Wishes','Snowbird Picnic','Moonlight Mending','The Great Hug'];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function level(n){const rings=[],base=1420;const patterns=[[-40,45,-65,35,90,-20,-90,25,80,-10,-65,10],[-70,55,100,-15,-90,15,95,20,-80,-15,85,0],[65,5,-85,-10,90,45,-65,-90,25,95,20,0],[-65,45,90,0,-80,-35,75,90,-10,-90,-25,0]];for(let i=0;i<12;i++)rings.push({id:i,x:250+patterns[n%4][i],y:base-i*99,type:i===0||i===4||i===8?'checkpoint':n>0&&i%4===2?'moving':n>2&&i%4===3?'crumb':'normal',phase:i*.9+n,amp:12+n*1.3});
 const fruits=[];[2,6,9].forEach((k,j)=>{const r=rings[k],side=r.x<250?-1:1;const b={id:rings.length,x:clamp(r.x+side*94,80,420),y:r.y+15,type:'bonus',phase:0,amp:0};rings.push(b);fruits.push({id:j,ring:b.id,x:b.x,y:b.y+68});});
 const hazards=n<2?[]:[{x:n%2?110:390,y:base-530,phase:n},{x:n%2?375:125,y:base-870,phase:n+2}];return {name:names[n],rings,fruits,hazards,height:1640,goal:11};}
class Run{
 constructor(n=0){this.n=clamp(Math.floor(n)||0,0,7);this.map=level(this.n);this.state='playing';this.t=0;this.x=this.map.rings[0].x;this.y=1494;this.vx=0;this.vy=0;this.anchor=0;this.length=74;this.hand=0;this.last=null;this.tokens=[];this.visited=[0];this.grabs=0;this.bonks=0;this.falls=0;this.invuln=0;this.grip=0;this.aim=null;this.events=[];this.chain=0;this.bestChain=0;this.chainClock=0;this.checkpoint=0;this.bank=[];this.rescue=0;this.stars=0;this.goalWait=0;}
 ring(id){const r=this.map.rings[id];return r?{...r,x:r.x+(r.type==='moving'?Math.sin(this.t*1.35+r.phase)*r.amp:0),y:r.y+(r.type==='moving'?Math.cos(this.t+r.phase)*7:0)}:null;}
 emit(type,data={}){this.events.push({type,x:this.x,y:this.y,...data});}
 candidate(x,y){let best=null,d=43;for(const r of this.map.rings){const p=this.ring(r.id),m=Math.hypot(x-p.x,y-p.y);if(m<d&&r.id!==this.anchor&&Math.hypot(p.x-this.x,p.y-this.y)<=242){best=p;d=m;}}return best;}
 point(x,y){if(this.state==='playing'&&Number.isFinite(x)&&Number.isFinite(y))this.aim={x,y};}
 cancel(){this.aim=null;}
 release(){if(!this.aim)return false;const p=this.candidate(this.aim.x,this.aim.y);this.aim=null;return p?this.grab(p.id):false;}
 grab(id){const r=this.ring(id);if(this.state!=='playing'||!r||id===this.anchor||Math.hypot(r.x-this.x,r.y-this.y)>242||this.rescue>0)return false;
 this.last=this.anchor>=0?this.ring(this.anchor):{x:this.x,y:this.y};this.anchor=id;this.hand=1-this.hand;this.length=clamp(Math.hypot(r.x-this.x,r.y-this.y),74,242);this.grip=0;this.grabs++;this.vx+=Math.sign(r.x-this.x)*45;this.vy-=30;
 const fresh=!this.visited.includes(id);if(fresh){this.visited.push(id);this.chain=this.chainClock>0?this.chain+1:1;this.chainClock=3.5;this.bestChain=Math.max(this.bestChain,this.chain);}this.emit('grab',{fresh,combo:this.chain});
 if(r.type==='checkpoint'&&id>this.checkpoint&&id<12){this.checkpoint=id;this.bank=this.tokens.slice();this.emit('checkpoint');}return true;}
 drop(){if(this.state==='playing'&&this.anchor>=0){this.last=this.ring(this.anchor);this.anchor=-1;this.vy-=80;this.vx*=1.4;this.aim=null;this.emit('drop');}}
 step(dt){if(this.state!=='playing')return;this.t+=dt;this.invuln=Math.max(0,this.invuln-dt);this.chainClock=Math.max(0,this.chainClock-dt);if(this.rescue>0){this.rescue-=dt;if(this.rescue<=0){const r=this.ring(this.checkpoint);this.x=r.x;this.y=r.y+74;this.vx=0;this.vy=0;this.anchor=r.id;this.length=74;this.grip=0;this.invuln=1.4;this.tokens=this.bank.slice();this.emit('return');}return;}
 this.vx+=(Math.sin(this.t*1.7+this.n)*28)*dt;if(this.aim)this.vx+=clamp((this.aim.x-this.x)*.55,-95,95)*dt;if(this.n>=4&&this.y<1000&&this.y>700)this.vx+=Math.sin(this.t*.8+this.n)*45*dt;this.vy+=520*dt;this.vx*=Math.pow(.994,dt*60);this.x+=this.vx*dt;this.y+=this.vy*dt;
 if(this.anchor>=0){const r=this.ring(this.anchor);this.length=Math.max(74,this.length-135*dt);const dx=this.x-r.x,dy=this.y-r.y,d=Math.hypot(dx,dy)||1;if(d>this.length){const nx=dx/d,ny=dy/d;this.x=r.x+nx*this.length;this.y=r.y+ny*this.length;const dot=this.vx*nx+this.vy*ny;if(dot>0){this.vx-=dot*nx;this.vy-=dot*ny;}}this.grip+=dt;if(r.type==='crumb'&&this.grip>3.8){this.drop();this.emit('crumble',{x:r.x,y:r.y});}}
 this.x=clamp(this.x,30,470);for(const f of this.map.fruits)if(!this.tokens.includes(f.id)&&Math.hypot(this.x-f.x,this.y-f.y)<39){this.tokens.push(f.id);this.emit('fruit',{x:f.x,y:f.y});}
 for(const h of this.map.hazards){const x=h.x+Math.sin(this.t*1.8+h.phase)*20;if(this.invuln<=0&&Math.hypot(this.x-x,this.y-h.y)<45){this.bonks++;this.invuln=1.2;this.vx=(this.x<x?-1:1)*250;this.vy=-140;this.emit('bonk');}}
 if(this.y>this.map.height+80){this.falls++;this.chain=0;this.chainClock=0;this.rescue=.8;this.aim=null;this.emit('fall');}
 if(this.anchor===this.map.goal&&this.length<=80){this.goalWait+=dt;if(this.goalWait>.55){this.state='won';this.stars=1+(this.tokens.length===3?1:0)+(this.falls===0&&this.bonks<=2?1:0);this.emit('won');}}
 }
 snapshot(){const o={};for(const k of ['n','state','t','x','y','vx','vy','anchor','length','hand','last','tokens','visited','grabs','bonks','falls','invuln','grip','chain','bestChain','chainClock','checkpoint','bank','rescue','stars','goalWait'])o[k]=this[k];return JSON.parse(JSON.stringify(o));}
 static restore(s){try{if(!s||!Number.isInteger(s.n)||s.n<0||s.n>7||!['playing','won'].includes(s.state))return null;const r=new Run(s.n);for(const k of ['t','x','y','vx','vy','length','grabs','bonks','falls','invuln','grip','chain','bestChain','chainClock','rescue','stars','goalWait'])if(!Number.isFinite(s[k])||Math.abs(s[k])>1e7)return null;if(!Number.isInteger(s.anchor)||s.anchor<-1||s.anchor>=15||![0,4,8].includes(s.checkpoint)||![0,1].includes(s.hand))return null;for(const k of ['tokens','bank'])if(!Array.isArray(s[k])||s[k].some(v=>![0,1,2].includes(v))||new Set(s[k]).size!==s[k].length)return null;if(!Array.isArray(s.visited)||s.visited.some(v=>!Number.isInteger(v)||v<0||v>=15))return null;Object.assign(r,JSON.parse(JSON.stringify(s)));r.map=level(r.n);r.aim=null;r.events=[];return r;}catch{return null;}}
}
return {Run,level,names};});

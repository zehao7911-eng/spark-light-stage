(function(root){'use strict';const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)),NAMES=['Peach Boardwalk','Mint Canopy','Rooftop Radio','Soda Dunes','Blossom Bend','Midnight Neon','Cloud Pier','Sunrise Circuit'];
function course(n){n=clamp(n|0,0,7);const starts=[[650,1490,2310],[700,1530,2460],[620,1510,2380],[760,1610,2520],[680,1580,2430],[740,1510,2550],[650,1660,2480],[710,1560,2540]][n],gaps=starts.map((x,i)=>({x,w:95+n*5+i*4}));return{n,name:NAMES[n],length:3050+n*45,gaps,cones:[350,1040,1980,2820].map((x,i)=>({x:x+(n%3)*20,h:26+i%2*7})),rails:[{x:880,w:230,y:ground(880,n)-58},{x:1800,w:240,y:ground(1800,n)-65},{x:2700,w:190,y:ground(2700,n)-55}],springs:[1190,starts[2]-85],tokens:gaps.map((a,i)=>({id:i,x:a.x+a.w*.5,y:ground(a.x,n)-160})),checkpoints:[30,1180,2180]};}
function ground(x,n){return 380+Math.sin(x/310+n*.6)*15+Math.sin(x/130+n)*7;}
class Run{
 constructor(n=0){this.map=course(n);this.n=this.map.n;this.x=55;this.y=ground(this.x,this.n);this.vy=0;this.vx=210;this.held=false;this.charge=0;this.air=false;this.coyote=.12;this.grind=-1;this.tricked=false;this.flip=0;this.airScore=0;this.combo=0;this.bestCombo=0;this.score=0;this.tokens=[];this.falls=0;this.t=0;this.state='ready';this.checkpoint=0;this.bank={score:0,tokens:[]};this.spring=-1;this.events=[];this.grindClock=0;this.immunity=0;}
 emit(type,data={}){this.events.push({type,...data});if(this.events.length>30)this.events.shift();}
 start(){if(this.state==='ready')this.state='playing';}
 press(){if(this.state!=='playing'||this.held)return;this.held=true;if(this.air&&this.grind<0&&!this.tricked){this.tricked=true;this.flip=.7;this.airScore+=150;this.emit('flip');}}
 release(cancel=false){if(!this.held)return;this.held=false;if(cancel){this.charge=0;return;}if(this.state!=='playing')return;if(this.grind>=0){this.grind=-1;this.jump(455);}else if(!this.air||this.coyote>0){this.jump(530+Math.min(1,this.charge/.65)*70);}this.charge=0;}
 jump(v){this.vy=-v;this.air=true;this.coyote=0;this.vx=210;this.tricked=false;this.flip=0;this.airScore+=50;this.emit('jump');}
 get inGap(){return this.map.gaps.some(a=>this.x>a.x&&this.x<a.x+a.w);}
 recover(){this.falls++;this.x=this.map.checkpoints[this.checkpoint]+25;this.y=ground(this.x,this.n);this.vy=0;this.vx=160;this.air=false;this.coyote=.12;this.grind=-1;this.held=false;this.charge=0;this.combo=0;this.airScore=0;this.tokens=[...this.bank.tokens];this.score=this.bank.score;this.immunity=.7;this.spring=-1;this.emit('fall');}
 land(){this.air=false;this.vy=0;this.coyote=.12;if(this.airScore){this.combo++;this.bestCombo=Math.max(this.bestCombo,this.combo);const value=this.airScore+this.combo*30+(this.held?60:0);this.score+=value;this.emit('land',{perfect:this.held,score:value,combo:this.combo});this.airScore=0;}this.tricked=false;}
 step(dt){if(this.state!=='playing')return;dt=clamp(dt,0,.035);this.t+=dt;this.immunity=Math.max(0,this.immunity-dt);this.flip=Math.max(0,this.flip-dt);this.coyote=Math.max(0,this.coyote-dt);if(this.held&&!this.air)this.charge=Math.min(.65,this.charge+dt);const speed=this.grind>=0?235:this.held&&!this.air?118:210;this.vx+=(speed-this.vx)*Math.min(1,dt*12);const oldY=this.y;this.x+=this.vx*dt;
 if(this.grind>=0){const a=this.map.rails[this.grind];this.y=a.y;this.grindClock+=dt;if(this.grindClock>.12){this.grindClock=0;this.airScore+=15;this.emit('spark');}if(!this.held||this.x>a.x+a.w){this.grind=-1;this.vy=30;}}
 if(this.grind<0){if(!this.air&&!this.inGap){this.y=ground(this.x,this.n);this.coyote=.12;}else{this.air=true;this.vy+=1050*dt;this.y+=this.vy*dt;
 if(this.held&&this.vy>0){for(let i=0;i<this.map.rails.length;i++){const a=this.map.rails[i];if(this.x>a.x&&this.x<a.x+a.w&&oldY<=a.y+8&&this.y>=a.y){this.grind=i;this.y=a.y;this.vy=0;this.airScore+=100;this.emit('grind');break;}}}
 const gy=ground(this.x,this.n);if(this.grind<0&&!this.inGap&&this.vy>=0&&oldY<=gy+9&&this.y>=gy){this.y=gy;this.land();}}}
 for(const a of this.map.cones)if(this.immunity<=0&&Math.abs(this.x-a.x)<19&&this.y>ground(a.x,this.n)-a.h-7){this.recover();break;}
 if(this.y>590){this.recover();return;}
 for(let i=0;i<this.map.springs.length;i++)if(!this.air&&this.spring!==i&&Math.abs(this.x-this.map.springs[i])<17){this.spring=i;this.jump(600);this.emit('spring');}
 for(const a of this.map.tokens)if(!this.tokens.includes(a.id)&&Math.hypot(this.x-a.x,this.y-18-a.y)<53){this.tokens.push(a.id);this.score+=300;this.emit('token',{x:a.x,y:a.y});}
 if(!this.air&&!this.inGap){for(let i=1;i<this.map.checkpoints.length;i++)if(i>this.checkpoint&&this.x>=this.map.checkpoints[i]){this.checkpoint=i;this.bank={score:this.score,tokens:[...this.tokens]};this.emit('checkpoint');}}
 if(this.x>this.map.length){this.state='won';this.held=false;this.charge=0;this.emit('won');}}
 get stars(){return this.state==='won'?1+(this.tokens.length===3?1:0)+(this.falls===0?1:0):0;}
 snapshot(){const d={};for(const k of ['n','x','y','vy','vx','charge','air','coyote','grind','tricked','flip','airScore','combo','bestCombo','score','tokens','falls','t','state','checkpoint','bank','spring','grindClock','immunity'])d[k]=this[k];d.held=false;d.charge=0;return JSON.stringify(d);}
 static restore(s){try{const d=JSON.parse(s);if(!Number.isInteger(d.n)||d.n<0||d.n>7)throw 0;const r=new Run(d.n);for(const k of ['x','y','vy','vx','charge','coyote','grind','flip','airScore','combo','bestCombo','score','falls','t','checkpoint','spring','grindClock','immunity'])if(!Number.isFinite(d[k]))throw 0;if(!['ready','playing','won'].includes(d.state)||d.x<0||d.x>r.map.length+20||d.y<0||d.y>610||d.grind<-1||d.grind>=r.map.rails.length||!Number.isInteger(d.grind)||!Number.isInteger(d.checkpoint)||d.checkpoint<0||d.checkpoint>2||d.score<0||d.falls<0||typeof d.air!=='boolean'||typeof d.tricked!=='boolean')throw 0;for(const a of [d.tokens,d.bank?.tokens])if(!Array.isArray(a)||a.length>3||new Set(a).size!==a.length||!a.every(v=>[0,1,2].includes(v)))throw 0;if(!Number.isFinite(d.bank.score)||d.bank.score<0)throw 0;Object.assign(r,d);r.held=false;r.charge=0;r.events=[];return r;}catch{return null;}}
}
const api={Run,course,ground,clamp,NAMES};if(typeof module!=='undefined')module.exports=api;else root.Kick=api;
})(typeof window==='undefined'?globalThis:window);





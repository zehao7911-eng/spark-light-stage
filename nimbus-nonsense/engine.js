(function(root){'use strict';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)),NAMES=['Picnic Panic','Market Drizzle','Laundry Day','Wedding Weather','Pool Party','Rooftop Ruckus','Fairground Fizz','Rainbow Reunion'];
function make(n){n=clamp(n|0,0,7);const objects=[];function add(type,x,y,optional=false,extra={}){objects.push({id:objects.length,type,x,y,homeX:x,homeY:y,p:0,done:false,optional,stun:0,slip:0,phase:objects.length*1.7,...extra});}
 const layout=[[[105,170],[175,190],[245,165],[325,190]],[[110,220],[180,250],[255,220],[330,250]],[[105,175],[175,200],[245,175],[320,200]],[[120,190],[190,220],[260,190],[330,220]],[[110,150],[180,170],[250,150],[320,170]],[[110,190],[180,215],[250,190],[320,215]],[[110,205],[180,235],[250,205],[320,235]],[[105,175],[175,200],[245,175],[315,200]]][n];
 const types=[['flower','flower','chalk','balloon'],['flower','balloon','balloon','chalk'],['laundry','laundry','flower','chalk'],['flower','flower','balloon','cake'],['flower','balloon','chalk','fountain'],['laundry','flower','balloon','fountain'],['balloon','balloon','balloon','flower'],['flower','laundry','fountain','cake']][n];
 layout.forEach(([x,y],i)=>add(types[i],x,y));
 for(let i=0;i<3+(n>3?1:0);i++)add('person',140+i*66,330+(i%2)*40,false,{umbrella:n>=2&&i===1,hat:i%3});
 if(n>=1)add('balloon',360,325);if(n>=3)add('flower',90,320);if(n>=5)add('chalk',330,415);
 [[75,420],[395,415],[390,125]].forEach(([x,y])=>add('duck',x,y,true));
 return{n,name:NAMES[n],objects};}
class Run{
 constructor(n=0){const m=make(n);this.n=m.n;this.name=m.name;this.objects=m.objects;this.t=0;this.cloud={x:240,y:280};this.target={...this.cloud};this.raining=false;this.state='ready';this.zapCd=0;this.chain=0;this.bestChain=0;this.lastDone=-10;this.score=0;this.zaps=0;this.events=[];this.puddles=[];this.puddleClock=0;}
 start(){if(this.state==='ready')this.state='playing';}
 emit(type,o={}){this.events.push({type,...o});if(this.events.length>40)this.events.shift();}
 rainAt(x,y){if(this.state!=='playing'||!Number.isFinite(x)||!Number.isFinite(y))return;this.target={x:clamp(x,35,445),y:clamp(y,70,460)};this.raining=true;}
 stop(){this.raining=false;this.target={...this.cloud};}
 complete(o){if(o.done)return;o.p=1;o.done=true;this.chain=this.t-this.lastDone<=4.5?this.chain+1:1;this.bestChain=Math.max(this.bestChain,this.chain);this.lastDone=this.t;this.score+=(o.optional?250:100)+this.chain*20;this.emit('done',{id:o.id,kind:o.type,x:o.x,y:o.y,chain:this.chain});if(o.type==='person')o.slip=1;}
 thunder(){if(this.state!=='playing'||this.zapCd>0)return false;this.zapCd=4;this.zaps++;this.emit('thunder',{x:this.cloud.x,y:this.cloud.y});let balloons=[];for(const o of this.objects){if(Math.hypot(o.x-this.cloud.x,o.y-this.cloud.y)<135){o.stun=5;if(o.type==='person')this.emit('startle',{x:o.x,y:o.y});if(o.type==='balloon'&&!o.done)balloons.push(o);if(o.type==='fountain')o.p=Math.min(.85,o.p+.4);}}
 // Popping balloons pass a gust to nearby balloons, including across the initial radius.
 const seen=new Set();while(balloons.length){const a=balloons.shift();if(seen.has(a.id))continue;seen.add(a.id);this.complete(a);for(const b of this.objects)if(b.type==='balloon'&&!b.done&&Math.hypot(a.x-b.x,a.y-b.y)<135)balloons.push(b);}return true;}
 step(dt){if(this.state!=='playing')return;dt=clamp(dt,0,.04);this.t+=dt;this.zapCd=Math.max(0,this.zapCd-dt);const dx=this.target.x-this.cloud.x,dy=this.target.y-this.cloud.y,d=Math.hypot(dx,dy),k=Math.min(1,dt*330/(d||1));this.cloud.x+=dx*k;this.cloud.y+=dy*k;
 for(const p of this.puddles)p.life-=dt;this.puddles=this.puddles.filter(p=>p.life>0);if(this.raining){this.puddleClock+=dt;if(this.puddleClock>.14){this.puddleClock=0;this.puddles.push({x:this.cloud.x,y:this.cloud.y,life:9,max:9});if(this.puddles.length>64)this.puddles.shift();}}
 for(const o of this.objects){o.stun=Math.max(0,o.stun-dt);o.slip=Math.max(0,o.slip-dt);if(o.type==='person'&&!o.done){let vx=0,vy=0;const d=Math.hypot(o.x-this.cloud.x,o.y-this.cloud.y);if(this.raining&&d<115&&o.stun<=0){vx=(o.x-this.cloud.x)/(d||1)*48;vy=(o.y-this.cloud.y)/(d||1)*48;}else if(o.stun<=0){vx=Math.sin(this.t*.7+o.phase)*13;vy=Math.cos(this.t*.55+o.phase)*10;}o.x=clamp(o.x+vx*dt,65,415);o.y=clamp(o.y+vy*dt,270,435);}
 if(o.done)continue;const hit=this.raining&&Math.hypot(this.cloud.x-o.x,this.cloud.y-o.y)<55;if(hit){if(o.umbrella&&o.stun<=0){if(!o.blocked){o.blocked=true;this.emit('blocked',{id:o.id,x:o.x,y:o.y});}continue;}o.blocked=false;const rates={flower:.8,chalk:.62,balloon:.85,laundry:.7,cake:.6,fountain:.55,person:.68,duck:1.1};o.p=Math.min(1,o.p+dt*rates[o.type]);if(o.p>=1)this.complete(o);}}
 }
 get goals(){return this.objects.filter(o=>!o.optional);}
 get cleared(){return this.goals.every(o=>o.done);}
 get ducks(){return this.objects.filter(o=>o.type==='duck'&&o.done).length;}
 get stars(){return this.cleared?1+(this.ducks===3?1:0)+(this.bestChain>=3?1:0):0;}
 finish(){if(this.state!=='playing'||!this.cleared)return false;this.stop();this.state='won';this.emit('won');return true;}
 snapshot(){return JSON.stringify({n:this.n,t:this.t,cloud:this.cloud,target:this.target,raining:false,state:this.state,zapCd:this.zapCd,chain:this.chain,bestChain:this.bestChain,lastDone:this.lastDone,score:this.score,zaps:this.zaps,objects:this.objects,puddles:this.puddles,puddleClock:this.puddleClock});}
 static restore(s){try{const d=JSON.parse(s);if(!Number.isInteger(d.n)||d.n<0||d.n>7)throw 0;const r=new Run(d.n);if(!['ready','playing','won'].includes(d.state)||!Array.isArray(d.objects)||d.objects.length!==r.objects.length)throw 0;for(const k of ['t','zapCd','chain','bestChain','score','zaps','puddleClock'])if(!Number.isFinite(d[k])||d[k]<0)throw 0;if(!Number.isFinite(d.lastDone))throw 0;for(const v of [d.cloud,d.target])if(!v||!Number.isFinite(v.x)||!Number.isFinite(v.y)||v.x<35||v.x>445||v.y<70||v.y>460)throw 0;d.objects.forEach((o,i)=>{const a=r.objects[i];if(o.id!==i||o.type!==a.type||o.optional!==a.optional||o.umbrella!==a.umbrella||!['x','y','p','stun','slip'].every(k=>Number.isFinite(o[k]))||o.p<0||o.p>1||o.x<0||o.x>480||o.y<0||o.y>500||o.done!==(o.p===1))throw 0;});if(!Array.isArray(d.puddles)||d.puddles.length>64||!d.puddles.every(p=>['x','y','life','max'].every(k=>Number.isFinite(p[k]))&&p.life>0&&p.life<=9))throw 0;Object.assign(r,d);r.raining=false;r.target={...r.cloud};r.events=[];if(r.state==='won'&&!r.cleared)throw 0;return r;}catch{return null;}}
}
const api={Run,make,clamp,NAMES};if(typeof module!=='undefined')module.exports=api;else root.Nimbus=api;
})(typeof window==='undefined'?globalThis:window);

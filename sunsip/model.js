(function(root){'use strict';
const FLAVORS=['Citrus Club','Berry Picnic','Peach Breeze','Grape Afterglow'];
const rows=[
 [0,3,[[0,1]],0,0,0,[],0],
 [-1.6,3.4,[[-3.3,1],[.4,1.2]],-1.6,0,0,[],0],
 [1.4,3.4,[[1.4,1.2]],1.4,.65,0,[],0],
 [-1.8,3,[[-1.8,1]],-2.8,0,0,[[-1.4,7,.65]],1],
 [1.7,3,[[1.7,1]],2.8,0,0,[[1.3,7,.65]],1],
 [0,3,[[-2,1],[2,1]],-2.2,0,0,[[.4,6.7,.65]],1],
 [-1.2,3.2,[[-1.2,1]],-.6,0,.65,[],2],
 [1.3,3.2,[[-.8,1],[3,1.4]],.7,.5,-.7,[],2],
 [0,3,[[0,1]],-1.6,.45,.7,[[.6,7,.65]],2],
 [-1.6,3,[[-3.4,1.4],[.6,1.2]],-2.8,0,.25,[[-1.2,6.4,.65]],3],
 [1.6,3,[[1.6,1]],2.8,.45,-.25,[[1.2,6.5,.65]],3],
 [0,3,[[-2.2,1],[2.2,1]],0,2.6,0,[[.35,7,.65]],3]
];
const LEVELS=rows.map((r,i)=>({id:i,x:r[0],y:r[1],anchors:r[2].map(a=>({x:a[0],y:a[1]})),cup:r[3],amplitude:r[4],wind:r[5],bumpers:r[6].map(b=>({x:b[0],y:b[1],r:b[2]})),flavor:r[7],name:['First Sip','Double Twist','On the Move','Soft Landing','The Sidekick','A Little Swing','Summer Breeze','Peach Parade','Air Mail','Velvet Bounce','Night Service','Last Call'][i]}));
const GUIDE=[[{"x":0,"y":5.084},{"x":0,"y":7.609},{"x":0,"y":9.816}],[{"x":-1.6,"y":5.085},{"x":-1.6,"y":7.632},{"x":-1.6,"y":9.76}],[{"x":1.4,"y":5.085},{"x":1.4,"y":7.632},{"x":1.4,"y":9.76}],[{"x":-1.8,"y":5.084},{"x":-3.135,"y":7.598},{"x":-3.464,"y":9.819}],[{"x":1.7,"y":5.084},{"x":3.035,"y":7.598},{"x":3.364,"y":9.819}],[{"x":0,"y":5.084},{"x":-1.317,"y":7.577},{"x":-1.6,"y":9.778}],[{"x":-1.101,"y":5.079},{"x":-0.992,"y":7.581},{"x":-0.905,"y":9.832}],[{"x":1.194,"y":5.079},{"x":1.076,"y":7.581},{"x":0.982,"y":9.832}],[{"x":0.116,"y":5.084},{"x":-1.091,"y":7.58},{"x":-1.331,"y":9.776}],[{"x":-1.558,"y":5.084},{"x":-2.664,"y":7.58},{"x":-2.837,"y":9.838}],[{"x":1.558,"y":5.084},{"x":2.621,"y":7.625},{"x":2.785,"y":9.79}],[{"x":0,"y":5.084},{"x":-1.233,"y":7.582},{"x":-1.52,"y":9.812}]];LEVELS.forEach((l,i)=>l.bubbles=GUIDE[i]);
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function pointSegment(p,a,b){let dx=b.x-a.x,dy=b.y-a.y,l=dx*dx+dy*dy,t=l?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/l)):0;return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy);}
function segments(a,b,c,d){let cross=(p,q,r)=>(q.x-p.x)*(r.y-p.y)-(q.y-p.y)*(r.x-p.x),s1=cross(a,b,c),s2=cross(a,b,d),s3=cross(c,d,a),s4=cross(c,d,b);if(s1*s2<0&&s3*s4<0)return 0;return Math.min(pointSegment(a,c,d),pointSegment(b,c,d),pointSegment(c,a,b),pointSegment(d,a,b));}
class Game{
 constructor(level=0){this.level=Math.max(0,Math.min(11,Math.floor(level)));this.def=LEVELS[this.level];this.fruit={x:this.def.x,y:this.def.y,vx:0,vy:0};this.ropes=this.def.anchors.map(a=>({x:a.x,y:a.y,length:distance(a,this.fruit),cut:false,age:0}));this.time=0;this.grace=0;this.started=false;this.over=false;this.won=false;this.cuts=0;this.bounces=0;this.collected=[false,false,false];this.bubbles=this.def.bubbles.map(p=>({...p}));this.events=[];this.cupX=this.def.cup;this.lastBump=-2;this.finishAge=0;}
 ropePoints(i){let r=this.ropes[i],f=this.fruit,d=distance(r,f),slack=Math.min(.8,Math.max(0,r.length-d)*.65),points=[];for(let n=0;n<=12;n++){let t=n/12;points.push({x:r.x+(f.x-r.x)*t,y:r.y+(f.y-r.y)*t+Math.sin(t*Math.PI)*slack});}return points;}
 cut(i){let r=this.ropes[i];if(this.over||!r||r.cut)return false;r.cut=true;r.age=0;this.started=true;this.cuts++;this.grace=this.ropes.some(r=>!r.cut)? .55 : 0;if(this.ropes.every(r=>r.cut))this.fruit.vx*=.4;this.events.push({type:'cut',index:i,x:this.fruit.x,y:this.fruit.y});return true;}
 swipe(a,b){if(this.over||![a.x,a.y,b.x,b.y].every(Number.isFinite))return 0;let n=0;for(let i=0;i<this.ropes.length;i++)if(!this.ropes[i].cut){let p=this.ropePoints(i);if(p.some((v,j)=>j&&segments(a,b,p[j-1],v)<.23))n+=this.cut(i)?1:0;}return n;}
 tick(dt){if(this.over){this.finishAge=Math.min(2,this.finishAge+Math.max(0,dt));return;}dt=Math.min(1/60,Math.max(0,dt));this.time+=dt;for(let r of this.ropes)if(r.cut)r.age+=dt;this.cupX=this.def.cup+Math.sin(this.time*1.8)*this.def.amplitude;if(!this.started)return;if(this.grace>0&&this.ropes.some(r=>!r.cut)){this.grace=Math.max(0,this.grace-dt);return;}let f=this.fruit,oldY=f.y;f.vx=(f.vx+this.def.wind*dt)*Math.pow(.99,dt*120);f.vy=(f.vy+10*dt)*Math.pow(.999,dt*120);f.x+=f.vx*dt;f.y+=f.vy*dt;
 for(let n=0;n<5;n++){for(let r of this.ropes)if(!r.cut){let dx=f.x-r.x,dy=f.y-r.y,d=Math.hypot(dx,dy);if(d>r.length){let nx=dx/d,ny=dy/d;f.x=r.x+nx*r.length;f.y=r.y+ny*r.length;let dot=f.vx*nx+f.vy*ny;if(dot>0){f.vx-=nx*dot;f.vy-=ny*dot;}}}for(let b of this.def.bumpers){let dx=f.x-b.x,dy=f.y-b.y,d=Math.hypot(dx,dy),min=b.r+.55;if(d<min&&d>1e-6){let nx=dx/d,ny=dy/d;f.x=b.x+nx*min;f.y=b.y+ny*min;let dot=f.vx*nx+f.vy*ny;if(dot<0){f.vx-=1.25*dot*nx;f.vy-=1.25*dot*ny;if(this.time-this.lastBump>.18){this.bounces++;this.lastBump=this.time;this.events.push({type:'bounce',x:b.x,y:b.y});}}}}}
 if(f.x< -4){f.x=-4;f.vx=Math.abs(f.vx)*.45;}if(f.x>4){f.x=4;f.vx=-Math.abs(f.vx)*.45;}
 for(let i=0;i<3;i++)if(!this.collected[i]&&distance(f,this.bubbles[i])<.7){this.collected[i]=true;this.events.push({type:'bubble',index:i,x:f.x,y:f.y});}
 if(f.vy>0&&oldY<=11.15&&f.y>=11.15&&Math.abs(f.x-this.cupX)<.96){this.won=true;this.over=true;this.stars=1+(this.collected.some(Boolean)?1:0)+(this.collected.every(Boolean)?1:0);this.events.push({type:'win',x:this.cupX,y:11.15});}
 else if(f.y>13.7){this.over=true;this.events.push({type:'miss',x:f.x,y:f.y});}}
 drain(){let e=this.events;this.events=[];return e;}
 snapshot(){let {def,events,...s}=this;return JSON.parse(JSON.stringify(s));}
 static restore(s){try{if(!s||(s.grace!==undefined&&(!Number.isFinite(s.grace)||s.grace<0||s.grace>.55))||!Number.isInteger(s.level)||s.level<0||s.level>11)return null;let g=new Game(s.level),f=s.fruit;if(!f||![f.x,f.y,f.vx,f.vy,s.time,s.cupX,s.finishAge,s.lastBump].every(Number.isFinite)||Math.abs(f.x)>4.3||f.y<-.5||f.y>14||Math.abs(f.vx)>100||Math.abs(f.vy)>100||s.time<0||s.time>1e7||!Array.isArray(s.ropes)||s.ropes.length!==g.ropes.length||!Array.isArray(s.collected)||s.collected.length!==3||s.collected.some(v=>typeof v!=='boolean')||['started','over','won'].some(k=>typeof s[k]!=='boolean')||!Number.isInteger(s.cuts)||s.cuts<0||s.cuts>g.ropes.length)return null;for(let i=0;i<g.ropes.length;i++){let a=s.ropes[i],b=g.ropes[i];if(typeof a.cut!=='boolean'||!Number.isFinite(a.age)||a.age<0||a.x!==b.x||a.y!==b.y||a.length!==b.length)return null;}if(s.won&&!s.over)return null;Object.assign(g,JSON.parse(JSON.stringify(s)),{def:g.def,events:[]});g.bubbles=g.def.bubbles.map(p=>({...p}));if(g.won)g.stars=1+(g.collected.some(Boolean)?1:0)+(g.collected.every(Boolean)?1:0);return g;}catch(e){return null;}}
}
class Shift{
 constructor(seed=1){this.seed=Math.abs(Math.floor(seed))%1000000;this.served=0;this.misses=0;this.score=0;this.streak=0;}
 makeGame(){let g=new Game((this.seed+this.served*7+this.misses*5)%12);g.time=((this.seed*13+this.served*199+this.misses*47)%628)/100;return g;}
 record(g){if(!g.over||g.shiftRecorded||this.misses>=3)return false;g.shiftRecorded=true;if(g.won){this.served++;this.streak++;this.score+=100+g.collected.filter(Boolean).length*25+Math.min(10,this.streak)*10;}else{this.misses++;this.streak=0;}return true;}
 snapshot(){return {seed:this.seed,served:this.served,misses:this.misses,score:this.score,streak:this.streak};}
 static restore(s){if(!s||['seed','served','misses','score','streak'].some(k=>!Number.isInteger(s[k])||s[k]<0||s[k]>1e9)||s.misses>2)return null;return Object.assign(new Shift(s.seed),s);}
}
root.SS={Game,Shift,LEVELS,FLAVORS,distance};
})(typeof window==='undefined'?globalThis:window);

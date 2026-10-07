(function(root){
'use strict';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),len=(x,y)=>Math.hypot(x,y);
const LEVELS=[
 {name:'A little nudge',n:5,seed:11,pens:[{x:360,c:0}],walls:[],berries:[[130,400],[590,370],[360,620]],limit:4},
 {name:'Through the gate',n:7,seed:32,pens:[{x:360,c:0}],walls:[[25,330,235,18],[460,330,235,18]],berries:[[140,490],[580,490],[360,290]],limit:5},
 {name:'Around the garden',n:8,seed:44,pens:[{x:360,c:0}],walls:[[285,300,150,115]],berries:[[230,340],[490,340],[360,630]],limit:6},
 {name:'Peaches & cream',n:8,seed:58,pens:[{x:200,c:0},{x:520,c:1}],walls:[],berries:[[110,400],[610,400],[360,610]],limit:7},
 {name:'The orchard path',n:10,seed:73,pens:[{x:200,c:0},{x:520,c:1}],walls:[[310,215,100,150],[120,430,100,50],[500,430,100,50]],berries:[[360,410],[130,350],[590,350]],limit:9},
 {name:'Little islands',n:10,seed:99,pens:[{x:360,c:0}],walls:[[100,290,140,80],[480,290,140,80],[290,450,140,65]],berries:[[360,360],[190,470],[530,470]],limit:8},
 {name:'The long way home',n:12,seed:118,pens:[{x:200,c:0},{x:520,c:1}],walls:[[30,300,255,18],[435,300,255,18],[330,430,60,65]],berries:[[120,220],[600,220],[360,550]],limit:10},
 {name:'Apple blossom',n:14,seed:151,pens:[{x:200,c:0},{x:520,c:1}],walls:[[310,220,100,125],[120,430,100,50],[500,430,100,50]],berries:[[260,410],[460,410],[360,620]],limit:11},
 {name:'One big family',n:18,seed:173,pens:[{x:200,c:0},{x:520,c:1}],walls:[[310,225,100,125],[30,460,225,18],[465,460,225,18]],berries:[[160,350],[560,350],[360,620]],limit:13}
];
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
function freshProfile(){return{best:Array(9).fill(0),unlocked:0,coat:0,sound:true}}
function create(index=0,profile=freshProfile()){
 index=clamp(index|0,0,8);const l=LEVELS[index],r=rng(l.seed);
 const s={v:1,index,profile:JSON.parse(JSON.stringify(profile)),phase:'play',t:0,barks:0,cool:0,dog:{x:360,y:650,vx:0,vy:0,angle:-Math.PI/2},sheep:[],berries:l.berries.map(p=>({x:p[0],y:p[1],got:false})),events:[],saved:0,won:false};
 for(let i=0;i<l.n;i++){let x,y;for(let j=0;j<100;j++){x=90+r()*540;y=500+r()*100;if(!s.sheep.some(q=>len(x-q.x,y-q.y)<37))break}s.sheep.push({id:i,x,y,vx:0,vy:0,c:l.pens.length===1?0:i%2,home:false,fear:0,angle:-Math.PI/2,seed:r()*6.28})}return s;
}
function emit(s,k,x,y,c=0){s.events.push({k,x,y,c});if(s.events.length>64)s.events.shift()}
function blocks(s){const l=LEVELS[s.index],b=l.walls.map(w=>({x:w[0],y:w[1],w:w[2],h:w[3],garden:w[3]>20}));for(const p of l.pens){b.push({x:p.x-100,y:42,w:200,h:12},{x:p.x-100,y:42,w:12,h:113},{x:p.x+88,y:42,w:12,h:113},{x:p.x-100,y:145,w:63,h:12},{x:p.x+37,y:145,w:63,h:12})}return b}
function collide(q,rad,bs){q.x=clamp(q.x,rad+25,695-rad);q.y=clamp(q.y,rad+30,675-rad);for(const b of bs){let cx=clamp(q.x,b.x,b.x+b.w),cy=clamp(q.y,b.y,b.y+b.h),dx=q.x-cx,dy=q.y-cy,d=len(dx,dy);if(d<rad){if(d<.001){let e=[{d:q.x-b.x,x:-1,y:0},{d:b.x+b.w-q.x,x:1,y:0},{d:q.y-b.y,x:0,y:-1},{d:b.y+b.h-q.y,x:0,y:1}].sort((a,b)=>a.d-b.d)[0];q.x+=e.x*(e.d+rad);q.y+=e.y*(e.d+rad)}else{q.x+=dx/d*(rad-d);q.y+=dy/d*(rad-d)}q.vx*=.5;q.vy*=.5}}}
function bark(s){if(s.phase!=='play'||s.cool>0)return false;s.cool=1.5;s.barks++;emit(s,'bark',s.dog.x,s.dog.y);for(const q of s.sheep){if(q.home)continue;const dx=q.x-s.dog.x,dy=q.y-s.dog.y,d=len(dx,dy);if(d<180){q.vx+=dx/Math.max(1,d)*180*(1-d/240);q.vy+=dy/Math.max(1,d)*180*(1-d/240);q.fear=1.1}}return true}
function tick(s,input={},dt=1/60){if(s.phase!=='play')return;dt=clamp(dt,0,.035);s.t+=dt;s.cool=Math.max(0,s.cool-dt);const bs=blocks(s),d=s.dog;let tx=0,ty=0;if(input.active){let dx=input.x-d.x,dy=input.y-d.y,dist=len(dx,dy);if(dist>3){tx=dx/dist*Math.min(220,dist*6);ty=dy/dist*Math.min(220,dist*6)}}
 d.vx+=(tx-d.vx)*Math.min(1,dt*16);d.vy+=(ty-d.vy)*Math.min(1,dt*16);d.x+=d.vx*dt;d.y+=d.vy*dt;collide(d,15,bs);if(len(d.vx,d.vy)>10)d.angle=Math.atan2(d.vy,d.vx);
 for(const b of s.berries)if(!b.got&&len(d.x-b.x,d.y-b.y)<28){b.got=true;emit(s,'berry',b.x,b.y)}
 for(const q of s.sheep){if(q.home)continue;let ax=0,ay=0,cx=0,cy=0,count=0;const dx=q.x-d.x,dy=q.y-d.y,dist=len(dx,dy);q.fear=Math.max(0,q.fear-dt);if(dist<132){const f=(1-dist/132)*460;ax+=dx/Math.max(1,dist)*f;ay+=dy/Math.max(1,dist)*f;q.fear=Math.max(q.fear,(1-dist/132)*.8)}
 for(const o of s.sheep){if(q===o||o.home)continue;const a=q.x-o.x,b=q.y-o.y,dd=len(a,b);if(dd<37){const f=(37-dd)*27;ax+=a/Math.max(1,dd)*f;ay+=b/Math.max(1,dd)*f}else if(dd<115&&q.c===o.c){cx+=o.x;cy+=o.y;count++}}
 if(count){ax+=(cx/count-q.x)*.28;ay+=(cy/count-q.y)*.28}ax+=Math.cos(q.seed+s.t*.6)*5;ay+=Math.sin(q.seed+s.t*.6)*5;
 // Sheep leave room for the dog along the outer hedges; no unrecoverable edge traps.
 ax+=Math.max(0,85-q.x)*18-Math.max(0,q.x-635)*18;ay-=Math.max(0,q.y-610)*18;
 if(!LEVELS[s.index].pens.some(p=>Math.abs(p.x-q.x)<78))ay+=Math.max(0,195-q.y)*16;
 // Gate signs attract only sheep that have already been herded to the entrance.
 const pen=LEVELS[s.index].pens.find(p=>p.c===q.c);if(Math.abs(q.x-pen.x)<78&&q.y<230&&q.y>120){ax+=(pen.x-q.x)*5;ay-=90}
 q.vx=(q.vx+ax*dt)*Math.pow(.17,dt);q.vy=(q.vy+ay*dt)*Math.pow(.17,dt);let speed=len(q.vx,q.vy),max=q.fear>.3?140:85;if(speed>max){q.vx*=max/speed;q.vy*=max/speed}q.x+=q.vx*dt;q.y+=q.vy*dt;collide(q,17,bs);
 for(const p of LEVELS[s.index].pens){if(q.x>p.x-80&&q.x<p.x+80&&q.y<133){if(q.c!==p.c){q.y=175;q.vy=45;emit(s,'wrong',q.x,q.y,q.c)}else{q.home=true;q.vx=q.vy=0;s.saved++;const n=s.sheep.filter(a=>a.home&&a.c===q.c).length-1;q.x=p.x-60+(n%5)*30;q.y=80+Math.floor(n/5)*30;emit(s,'home',q.x,q.y,q.c)}}}
 if(speed>5)q.angle=Math.atan2(q.vy,q.vx);
 }
 // Resolve wool bodies without letting repeated overlap pushes cross solid fences.
 for(let i=0;i<s.sheep.length;i++)for(let j=i+1;j<s.sheep.length;j++){const a=s.sheep[i],b=s.sheep[j];if(a.home||b.home)continue;const dx=b.x-a.x,dy=b.y-a.y,dd=len(dx,dy);if(dd<33&&dd>.01){const k=(33-dd)/2;a.x-=dx/dd*k;a.y-=dy/dd*k;b.x+=dx/dd*k;b.y+=dy/dd*k;collide(a,17,bs);collide(b,17,bs)}}
 if(s.saved===s.sheep.length){s.phase='win';s.won=true;s.rating=1+(s.berries.every(b=>b.got)?1:0)+(s.barks<=LEVELS[s.index].limit?1:0);s.profile.best[s.index]=Math.max(s.profile.best[s.index]||0,s.rating);s.profile.unlocked=Math.min(8,Math.max(s.profile.unlocked,s.index+1));emit(s,'win',360,280)}
}
function restore(raw){try{const z=typeof raw==='string'?JSON.parse(raw):raw;if(z.v!==1||!Number.isInteger(z.index)||z.index<0||z.index>8)return null;const base=create(z.index);if(!z.dog||!Array.isArray(z.sheep)||z.sheep.length!==base.sheep.length||!Array.isArray(z.berries)||z.berries.length!==3)return null;for(const q of [z.dog,...z.sheep,...z.berries])if(!Number.isFinite(q.x)||!Number.isFinite(q.y)||q.x<0||q.x>720||q.y<0||q.y>700)return null;for(const q of [z.dog,...z.sheep])if(!['vx','vy','angle'].every(k=>Number.isFinite(q[k]))||Math.abs(q.vx)>1000||Math.abs(q.vy)>1000)return null;if(!Number.isFinite(z.t)||z.t<0||!Number.isFinite(z.cool)||z.cool<0||z.cool>1.5||!Number.isInteger(z.barks)||z.barks<0)return null;for(let i=0;i<z.sheep.length;i++){const q=z.sheep[i];if(q.id!==i||q.c!==base.sheep[i].c||typeof q.home!=='boolean'||!Number.isFinite(q.seed)||!Number.isFinite(q.fear))return null}if(z.berries.some(b=>typeof b.got!=='boolean'))return null;z.saved=z.sheep.filter(q=>q.home).length;z.won=z.saved===z.sheep.length;if(z.won)z.rating=1+(z.berries.every(b=>b.got)?1:0)+(z.barks<=LEVELS[z.index].limit?1:0);z.profile={...freshProfile(),...z.profile};z.profile.best=base.profile.best.map((_,i)=>clamp(z.profile.best?.[i]|0,0,3));z.profile.unlocked=clamp(z.profile.unlocked|0,0,8);z.profile.coat=clamp(z.profile.coat|0,0,3);if(z.profile.coat&&z.profile.best.reduce((a,b)=>a+b,0)<[0,6,14,22][z.profile.coat])z.profile.coat=0;z.profile.sound=!!z.profile.sound;z.events=[];z.phase=z.won?'win':'play';return z}catch{return null}}
const api={LEVELS,create,tick,bark,blocks,restore,freshProfile};if(typeof module!=='undefined')module.exports=api;root.Pasture=api;
})(typeof window==='undefined'?globalThis:window);

(function(root){'use strict';
const specs=[['The First Light',3,932,1,0],['Honey Courtyard',3,117,2,0],['Stillwater Arcade',4,481,2,1],['The Wind Garden',4,223,3,2],['Rose Observatory',4,817,3,1],['Violet Passage',5,412,3,3],['Moonwater Cloister',5,723,3,3],['The Glass Orchard',5,193,3,3]];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
function level(index){let [name,n,seed,count,feature]=specs[index%8],r=rng(seed),open=[],seen=new Set([0]),stack=[0];
 while(stack.length){let a=stack.at(-1),x=a%n,z=Math.floor(a/n),ns=[x>0?a-1:-1,x<n-1?a+1:-1,z>0?a-n:-1,z<n-1?a+n:-1].filter(b=>b>=0&&!seen.has(b));if(!ns.length){stack.pop();continue}let b=ns[Math.floor(r()*ns.length)];open.push([a,b]);seen.add(b);stack.push(b)}
 const adj=Array.from({length:n*n},()=>[]);for(let[a,b]of open){adj[a].push(b);adj[b].push(a)}
 const start=n*(n-1),dist=Array(n*n).fill(-1),prev=Array(n*n).fill(-1),queue=[start];dist[start]=0;
 for(let a of queue)for(let b of adj[a])if(dist[b]<0){dist[b]=dist[a]+1;prev[b]=a;queue.push(b)}
 let goal=dist.indexOf(Math.max(...dist)),path=[goal];while(path[0]!==start)path.unshift(prev[path[0]]);
 let seeds=[];for(let k=1;k<=count;k++){let q=path[Math.max(1,Math.floor(k*(path.length-1)/(count+1)))];if(!seeds.includes(q))seeds.push(q)}
 const pos=id=>({x:(id%n-(n-1)/2)*2,z:(Math.floor(id/n)-(n-1)/2)*2});
 let walls=[],edge=(a,b)=>open.some(e=>e.includes(a)&&e.includes(b));
 for(let z=0;z<n;z++)for(let x=0;x<n;x++){let a=z*n+x,p=pos(a);if(x===0)walls.push({x:p.x-1,z:p.z,hx:.09,hz:1.09});if(z===0)walls.push({x:p.x,z:p.z-1,hx:1.09,hz:.09});if(x===n-1||!edge(a,a+1))walls.push({x:p.x+1,z:p.z,hx:.09,hz:1.09});if(z===n-1||!edge(a,a+n))walls.push({x:p.x,z:p.z+1,hx:1.09,hz:.09})}
 const extras=queue.filter(a=>!path.includes(a));let cache=extras.length?extras.at(-1):path.at(-2),rest=path[Math.floor(path.length*.45)],wind=path[Math.floor(path.length*.7)];
 let portals=feature===3?[path[2],path[Math.floor(path.length*.7)]]:[];
 return {index,name,n,start,goal,seeds,cache,path,adj,pos,walls,feature,rest,wind,portals,portalPos:id=>{let p=pos(id);return {x:p.x+.48,z:p.z+.48}},par:Math.ceil(path.length*2.1+6)};
}
function profile(p={}){if(!p||typeof p!=='object')p={};return {unlocked:clamp(Math.floor(+p.unlocked||0),0,7),bests:Array.from({length:8},(_,i)=>Math.max(0,+p.bests?.[i]||0)),stars:Array.from({length:8},(_,i)=>clamp(Math.floor(+p.stars?.[i]||0),0,3)),skin:clamp(Math.floor(+p.skin||0),0,2),muted:!!p.muted}}
class Game{
 constructor(p){this.profile=profile(p);this.load(0)}
 load(i){this.l=level(clamp(i|0,0,this.profile.unlocked));let p=this.l.pos(this.l.start);Object.assign(this,{x:p.x,z:p.z,vx:0,vz:0,time:0,collected:[],cache:false,stage:'ready',rating:0,target:null,portalCooldown:0,portalArmed:true,bumps:0,settled:false,events:[],slow:0});return this}
 emit(type,data={}){this.events.push({type,...data});if(this.events.length>40)this.events.shift()}
 go(){if(this.stage==='ready'||this.stage==='paused')this.stage='play'}
 pause(){if(this.stage==='play'){this.stage='paused';this.target=null}}
 aim(x,z){if(this.stage==='play'){let b=this.l.n-.25;this.target={x:clamp(x,-b,b),z:clamp(z,-b,b)}}}
 step(dt,axis){if(this.stage!=='play')return;dt=clamp(dt,0,1/60);this.time+=dt;this.portalCooldown=Math.max(0,this.portalCooldown-dt);this.slow=Math.max(0,this.slow-dt);
 let ax=0,az=0;if(axis&&(axis.x||axis.z)){ax=axis.x;az=axis.z;this.target=null}else if(this.target){let dx=this.target.x-this.x,dz=this.target.z-this.z,d=Math.hypot(dx,dz);if(d>.035){let speed=Math.min(2.45,d*5);ax=(dx/d*speed-this.vx)*3.5/11;az=(dz/d*speed-this.vz)*3.5/11}else{this.target=null}}
 const mag=Math.hypot(ax,az);if(mag>1){ax/=mag;az/=mag}this.vx+=ax*11*dt;this.vz+=az*11*dt;
 let damping=Math.exp(-(this.target||mag?1.1:6)*dt);this.vx*=damping;this.vz*=damping;let speed=Math.hypot(this.vx,this.vz),max=3;if(speed>max){this.vx*=max/speed;this.vz*=max/speed}this.x+=this.vx*dt;this.z+=this.vz*dt;
 for(let w of this.l.walls){let qx=clamp(this.x,w.x-w.hx,w.x+w.hx),qz=clamp(this.z,w.z-w.hz,w.z+w.hz),dx=this.x-qx,dz=this.z-qz,d=Math.hypot(dx,dz);if(d<.235){if(d<1e-7){dx=this.x-w.x;dz=this.z-w.z;d=Math.hypot(dx,dz)||1}let nx=dx/d,nz=dz/d,pen=.235-d;this.x+=nx*pen;this.z+=nz*pen;let v=this.vx*nx+this.vz*nz;if(v<0){if(v<-.8&&this.slow<=0){this.emit('bump',{x:this.x,z:this.z,strength:-v});this.bumps++;this.slow=.16}this.vx-=v*nx*1.25;this.vz-=v*nz*1.25}}}
 for(let id of this.l.seeds){let p=this.l.pos(id);if(!this.collected.includes(id)&&Math.hypot(p.x-this.x,p.z-this.z)<.48){this.collected.push(id);this.emit('seed',{...p,id});if(this.collected.length===this.l.seeds.length)this.emit('open')}}
 let cp=this.l.pos(this.l.cache);if(!this.cache&&Math.hypot(cp.x-this.x,cp.z-this.z)<.5){this.cache=true;this.emit('cache',cp)}
 if(this.l.feature>=1){let p=this.l.pos(this.l.rest);if(Math.hypot(p.x-this.x,p.z-this.z)<.62){this.vx*=Math.exp(-2*dt);this.vz*=Math.exp(-2*dt)}}
 if(this.l.portals.length&&this.l.portals.every(id=>{let p=this.l.portalPos(id);return Math.hypot(p.x-this.x,p.z-this.z)>.5}))this.portalArmed=true;
 if(this.l.portals.length&&this.portalCooldown===0&&this.portalArmed)for(let a=0;a<2;a++){let p=this.l.portalPos(this.l.portals[a]);if(Math.hypot(p.x-this.x,p.z-this.z)<.25){let to=this.l.portalPos(this.l.portals[1-a]);this.x=to.x;this.z=to.z;this.vx=0;this.vz=0;this.target=null;this.portalCooldown=1.8;this.portalArmed=false;this.emit('portal',to);break}}
 let gp=this.l.pos(this.l.goal);if(this.collected.length===this.l.seeds.length&&Math.hypot(this.x-gp.x,this.z-gp.z)<.43)this.finish();
 }
 finish(){if(this.settled||this.stage!=='play'||this.collected.length!==this.l.seeds.length)return;this.settled=true;this.stage='won';this.target=null;this.vx=this.vz=0;let i=this.l.index;this.rating=1+(this.cache?1:0)+(this.time<=this.l.par?1:0);this.profile.stars[i]=Math.max(this.rating,this.profile.stars[i]);this.profile.bests[i]=!this.profile.bests[i]?this.time:Math.min(this.time,this.profile.bests[i]);this.profile.unlocked=Math.max(this.profile.unlocked,Math.min(i+1,7));this.emit('win')}
 total(){return this.profile.stars.reduce((a,b)=>a+b,0)}
 cycleSkin(){let unlocked=1+(this.total()>=6?1:0)+(this.total()>=12?1:0);this.profile.skin=(this.profile.skin+1)%unlocked;return unlocked}
 snapshot(){return {v:1,profile:this.profile,index:this.l.index,x:this.x,z:this.z,vx:this.vx,vz:this.vz,time:this.time,collected:this.collected,cache:this.cache,stage:this.stage,portalCooldown:this.portalCooldown,portalArmed:this.portalArmed,bumps:this.bumps,settled:this.settled,rating:this.rating||0}}
 static restore(s){let g=new Game(s?.profile);if(!s||s.v!==1)return g;g.load(s.index);if(![s.x,s.z,s.vx,s.vz,s.time].every(Number.isFinite)||Math.abs(s.x)>g.l.n||Math.abs(s.z)>g.l.n||s.time<0)return g;for(let k of ['x','z','vx','vz','time'])g[k]=s[k];g.collected=Array.from(new Set((Array.isArray(s.collected)?s.collected:[]).filter(a=>g.l.seeds.includes(a))));g.cache=!!s.cache;g.bumps=Math.max(0,s.bumps|0);g.portalCooldown=clamp(+s.portalCooldown||0,0,1.8);g.portalArmed=s.portalArmed!==false;g.settled=!!s.settled;g.rating=clamp(s.rating|0,0,3);g.stage=s.stage==='won'&&g.settled?'won':s.stage==='ready'?'ready':'paused';return g}
}
const api={Game,level,specs};if(typeof module!=='undefined')module.exports=api;else root.Pearl=api;
})(typeof window!=='undefined'?window:globalThis);

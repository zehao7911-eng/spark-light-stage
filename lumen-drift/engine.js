/* Original force sandbox. Units are normalized world coordinates, integration is fixed-step. */
(function(root){
const SCENES=['Halo','Aurora','Bloom','Binary','Starfield','Hourglass'];
class Universe{
 constructor(n=18000,seed=1){this.n=n;this.data=new Float32Array(n*10);this.seed=seed>>>0;this.time=0;this.yaw=.24;this.scene=0;this.emit=0;this.rng=seed;this.spin=true;this.reset(0,seed)}
 random(){let x=this.rng;x^=x<<13;x^=x>>>17;x^=x<<5;this.rng=x>>>0;return (this.rng>>>0)/4294967296}
 reset(scene=0,seed=(Math.random()*4294967295)>>>0){this.scene=scene;this.seed=seed||1;this.rng=this.seed;this.time=0;this.yaw=.24;this.emit=0;for(let i=0;i<this.n;i++){let k=i*10,t=this.random()*Math.PI*2,u=this.random(),v=this.random(),x,y,z;
  if(scene===0){let r=.7+(u-.5)*.20;x=Math.cos(t)*r;y=Math.sin(t)*r*.7;z=(v-.5)*.26+Math.sin(t*3)*.08}
  if(scene===1){x=(u-.5)*1.85;let w=Math.sin(x*4.3)*.20;y=w+(v-.5)*.33;z=Math.cos(x*3.5)*.28+(this.random()-.5)*.16}
  if(scene===2){let r=.2+u*.62,petal=1.+Math.cos(t*5)*.21;x=Math.cos(t)*r*petal;y=Math.sin(t)*r*petal*.8;z=Math.sin(r*8+t*3)*.13+(v-.5)*.08}
  if(scene===3){let side=i%2===0?-1:1,r=.23+u*.2;x=side*.44+Math.cos(t)*r;y=Math.sin(t)*r*.85;z=(v-.5)*.36;}
  if(scene===4){let r=Math.pow(u,.5)*.94;x=Math.cos(t)*r;y=Math.sin(t)*r*.75;z=(v-.5)*.7}
  if(scene===5){let h=(u-.5)*1.45,r=.07+Math.abs(h)*.75+(v-.5)*.07;x=Math.cos(t)*r;y=h;z=Math.sin(t)*r*.72}
  if(i%13===0&&scene!==4){let r=1.+this.random()*.6,a=this.random()*Math.PI*2.;x=Math.cos(a)*r;y=Math.sin(a)*r*.72;z=(this.random()-.5)*.75;}this.data[k]=this.data[k+6]=x;this.data[k+1]=this.data[k+7]=y;this.data[k+2]=this.data[k+8]=z;this.data[k+3]=-y*.0005;this.data[k+4]=x*.0005;this.data[k+5]=0;this.data[k+9]=Math.max(0,Math.min(1,.5+x*.28+y*.20+(this.random()-.5)*.3));}return this}
 step(forces=[],opts={},dt=1){dt=Math.min(1.5,Math.max(.1,dt));this.time+=dt/60;if(this.spin)this.yaw+=.0010*dt;const c=Math.cos(this.yaw),s=Math.sin(this.yaw),strength=opts.strength??.9,radius=opts.radius??.7,rr=radius*radius,fields=forces.slice(0,8),drag=Math.pow(.986,dt),noiseTime=this.time*.7;
  for(const f of fields)if(f.mode==='seed'){const rate=Math.round(130*dt);for(let j=0;j<rate;j++){let i=this.emit++%this.n,k=i*10,z=(this.random()-.5)*.15,p=2.8/(2.8-z),x=f.x/p+(this.random()-.5)*.1,y=f.y/p+(this.random()-.5)*.1;this.data[k]=x*c-z*s;this.data[k+1]=y;this.data[k+2]=x*s+z*c;this.data[k+3]=(f.dx||0)*.3*c+(this.random()-.5)*.004;this.data[k+4]=(f.dy||0)*.3+(this.random()-.5)*.004;this.data[k+5]=(f.dx||0)*.3*s;this.data[k+6]=this.data[k];this.data[k+7]=y;this.data[k+8]=this.data[k+2]}}
  for(let i=0;i<this.n;i++){let k=i*10,x=this.data[k],y=this.data[k+1],z=this.data[k+2],vx=this.data[k+3],vy=this.data[k+4],vz=this.data[k+5];let px=x*c+z*s,pz=-x*s+z*c,p=2.8/(2.8-Math.max(-1.5,Math.min(1.5,pz)));let fx=(this.data[k+6]-x)*.000028,fy=(this.data[k+7]-y)*.000028,fz=(this.data[k+8]-z)*.000028;
   fx+=Math.sin(y*5.+noiseTime+this.data[k+9]*3.)*.000019;fy+=Math.cos(x*5-noiseTime)*.000016;
   for(const f of fields){if(f.mode==='seed')continue;let dx=f.x/p-px,dy=f.y/p-y,d2=dx*dx+dy*dy+.01,w=1/(1+d2/rr),factor=.006*strength*w*w;let ax=dx,ay=dy;if(f.mode==='push'){ax=-dx*1.5;ay=-dy*1.5}if(f.mode==='orbit'){let d=Math.sqrt(d2),radial=.012*(1-.10/d2);ax=(-dy/d*.023*strength+dx*radial-(vx*c+vz*s))*.13*w;ay=(dx/d*.023*strength+dy*radial-vy)*.13*w;}else{ax*=factor;ay*=factor;}ax+=(f.dx||0)*w*.09;ay+=(f.dy||0)*w*.09;fx+=ax*c;fz+=ax*s;fy+=ay;}
   vx=(vx+fx*dt)*drag;vy=(vy+fy*dt)*drag;vz=(vz+fz*dt)*drag;let speed=Math.sqrt(vx*vx+vy*vy+vz*vz);if(speed>.055){vx*=.055/speed;vy*=.055/speed;vz*=.055/speed}x+=vx*dt;y+=vy*dt;z+=vz*dt;
   if(x*x+y*y+z*z>12.25){x=this.data[k+6];y=this.data[k+7];z=this.data[k+8];vx=vy=vz=0}this.data[k]=x;this.data[k+1]=y;this.data[k+2]=z;this.data[k+3]=vx;this.data[k+4]=vy;this.data[k+5]=vz;
  }
 }
 burst(){for(let i=0;i<this.n;i++){let k=i*10,x=this.data[k],y=this.data[k+1],z=this.data[k+2],d=Math.sqrt(x*x+y*y+z*z)+.06;this.data[k+3]+=x/d*.023;this.data[k+4]+=y/d*.023;this.data[k+5]+=z/d*.012}}
 summary(){let sum=0,energy=0;for(let i=0;i<this.n;i++){let k=i*10;sum+=this.data[k]*.3+this.data[k+1]*.7+this.data[k+2]*.4;energy+=this.data[k+3]**2+this.data[k+4]**2+this.data[k+5]**2}return {n:this.n,scene:this.scene,time:this.time,yaw:this.yaw,checksum:sum,energy}}
 snapshot(){return{version:1,n:this.n,seed:this.seed,time:this.time,yaw:this.yaw,scene:this.scene,emit:this.emit,rng:this.rng,spin:this.spin,data:Array.from(this.data)}}
 restore(o){if(!o||o.version!==1||!Number.isInteger(o.n)||o.n<100||o.n>40000||!Array.isArray(o.data)||o.data.length!==o.n*10||!o.data.every(Number.isFinite)||!Number.isInteger(o.scene)||o.scene<0||o.scene>5||![o.seed,o.time,o.yaw,o.emit,o.rng].every(Number.isFinite))throw Error('Invalid bookmark');this.n=o.n;this.data=new Float32Array(o.data);this.seed=o.seed;this.time=o.time;this.yaw=o.yaw;this.scene=o.scene;this.emit=o.emit;this.rng=o.rng;this.spin=!!o.spin;return this}
}
root.Universe=Universe;root.UNIVERSE_SCENES=SCENES;if(typeof module!=='undefined')module.exports={Universe,SCENES};
})(typeof window!=='undefined'?window:globalThis);

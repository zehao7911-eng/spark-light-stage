(function(root){'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),hypot=Math.hypot;
const P=(x,w,y,yy=y,kind='road')=>({x,w,y,yy,kind}),R=(x,y,w,h,kind='roof')=>({x,y,w,h,kind});
const LEVELS=[
{name:'FIRST SCRIBBLE',theme:0,end:1900,par:38,road:[P(-400,860,520),P(460,240,520,460),P(700,300,460),P(1000,230,460,520),P(1230,900,520)],roof:[],spring:[],stars:[[500,455],[970,400],[1530,460]],flags:[[1100,448]],signs:[[320,'go'],[1370,'star']]},
{name:'SMALL IS MIGHTY',theme:1,end:2100,par:45,road:[P(-400,2800,520)],roof:[R(570,320,470,145),R(1430,280,260,185)],spring:[],stars:[[780,490],[1240,460],[1570,490]],flags:[[1200,485]],signs:[[400,'squish'],[1320,'squish']]},
{name:'AIR MAIL',theme:2,end:2280,par:50,road:[P(-400,1040,520),P(880,450,520),P(1650,980,520)],roof:[],spring:[[510,620]],stars:[[730,330],[1140,460],[1500,350]],flags:[[1100,485]],signs:[[350,'spring'],[1190,'float']]},
{name:'WOBBLE WORKSHOP',theme:3,end:2400,par:55,road:[P(-400,980,520),P(580,250,520,430),P(830,300,430,520,'soft'),P(1130,200,520),P(1590,240,460,520),P(1830,950,520)],roof:[],moving:[{x:1310,w:310,y:500,amp:46,speed:1.3}],spring:[],stars:[[700,410],[1450,410],[2070,460]],flags:[[1900,485]],signs:[[380,'bump'],[1120,'float']]},
{name:'BALLOON BOULEVARD',theme:0,end:2500,par:58,road:[P(-400,1000,520),P(870,320,410),P(1460,400,450),P(2110,800,520)],roof:[],spring:[[470,590],[1040,1160],[1730,1850]],stars:[[750,310],[1340,270],[1970,320]],flags:[[1630,415]],signs:[[360,'float'],[1520,'spring']]},
{name:'PENCIL PRESS',theme:1,end:2450,par:58,road:[P(-400,1300,520),P(900,200,520,450),P(1100,250,450),P(1580,350,450,520),P(1930,900,520)],roof:[R(540,290,330,175),R(2020,300,230,165)],spring:[[1200,1330]],stars:[[700,490],[1440,285],[2140,490]],flags:[[1760,448]],signs:[[390,'squish'],[1090,'spring'],[1880,'squish']]},
{name:'MOON NOTE',theme:4,end:2660,par:65,road:[P(-400,1000,520),P(850,330,430),P(1450,350,430),P(2050,1000,520)],roof:[R(960,230,180,145)],spring:[[470,590],[1650,1780]],stars:[[710,300],[1050,400],[1920,300]],flags:[[1570,395]],signs:[[360,'float'],[810,'squish'],[1540,'spring']]},
{name:'THE BIG DOODLE',theme:2,end:2900,par:70,road:[P(-400,1320,520),P(1140,380,460),P(1800,300,470,520),P(2400,900,520)],roof:[R(500,290,310,175),R(1240,230,180,175)],moving:[{x:2090,w:320,y:500,amp:35,speed:1.5}],spring:[[800,910],[1400,1510]],stars:[[650,490],[1640,290],[2230,390]],flags:[[1910,450]],signs:[[340,'squish'],[770,'spring'],[1140,'squish'],[1980,'float']]}
];
// A connected elastic chassis and suspended wheels. Nodes really collide with terrain.
const SHAPE=[[-48,1],[-48,-18],[-28,-23],[-17,-45],[16,-45],[29,-23],[48,-16],[48,1],[-34,14],[34,14]];
function vertices(o,time){if(o.h!==undefined)return[[o.x,o.y],[o.x+o.w,o.y],[o.x+o.w,o.y+o.h],[o.x,o.y+o.h]];let y=o.y+(o.amp?Math.sin(time*o.speed)*o.amp:0),yy=o.yy===undefined?y:o.yy+(o.amp?Math.sin(time*o.speed)*o.amp:0);return[[o.x,y],[o.x+o.w,yy],[o.x+o.w,1000],[o.x,1000]];}
function contact(x,y,r,poly){let inside=true,min=1e9,best=null;for(let i=0;i<poly.length;i++){let a=poly[i],b=poly[(i+1)%poly.length],dx=b[0]-a[0],dy=b[1]-a[1],len=hypot(dx,dy),nx=dy/len,ny=-dx/len,side=(x-a[0])*nx+(y-a[1])*ny;if(side>0)inside=false;let t=clamp(((x-a[0])*dx+(y-a[1])*dy)/(len*len),0,1),qx=a[0]+t*dx,qy=a[1]+t*dy,d=hypot(x-qx,y-qy);if(d<min){min=d;best={qx,qy,nx,ny};}}
if(inside)return{nx:best.nx,ny:best.ny,depth:r+min};if(min<r){let d=min||.0001;return{nx:(x-best.qx)/d,ny:(y-best.qy)/d,depth:r-min};}return null;}
class Engine{
constructor(index=0,remix=0){this.index=index;this.remix=remix;this.plan=LEVELS[index];this.time=0;this.state='play';this.nodes=[];this.scale=1;this.fuel=1.9;this.ground=0;this.contacts=[0,0];this.springCool=0;this.flash=0;this.resets=0;this.starred=[false,false,false];this.checkpoint={x:120,y:482};this.flagged=false;this.input={drive:0,squish:false,float:false};this.events=[];this.rotation=0;this.wheelSpin=0;this.lastVX=0;this.sfxClock=0;this.air=0;this.maxAir=0;this.squeezeTime=0;this.floatTime=0;this.springCount=0;this.lastGround=false;this.seq=0;this.create(120,482);this.links=[];for(let a=0;a<10;a++)for(let b=a+1;b<10;b++){let dx=SHAPE[b][0]-SHAPE[a][0],dy=SHAPE[b][1]-SHAPE[a][1];this.links.push({a,b,rest:hypot(dx,dy),stiff:a>=8||b>=8?.045:.06});}}
create(x,y){this.nodes=SHAPE.map(([xx,yy],i)=>({x:x+xx,y:y+yy,px:x+xx,py:y+yy,r:i>=8?19:5,contact:false}));}
get car(){let a=this.nodes[8],b=this.nodes[9],x=(a.x+b.x)/2,y=(a.y+b.y)/2-14*this.scale;return{x,y,vx:((a.x-a.px)+(b.x-b.px))/2*120,vy:((a.y-a.py)+(b.y-b.py))/2*120,angle:Math.atan2(b.y-a.y,b.x-a.x)};}
emit(type,x,y,n=0){this.events.push({type,x,y,n});if(this.events.length>35)this.events.shift();}
recall(){if(this.state!=='play')return;this.resets++;this.scale=1;this.create(this.checkpoint.x,this.checkpoint.y);this.fuel=1.9;this.flash=.4;this.air=0;this.springCool=.5;this.emit('recall',this.car.x,this.car.y);}
update(dt,input=this.input){if(this.state!=='play')return;this.time+=dt;this.input={drive:clamp(input.drive||0,-1,1),squish:!!input.squish,float:!!input.float};let it=this.input;this.scale+=( (it.squish?.61:1)-this.scale)*Math.min(1,dt*10);this.flash=Math.max(0,this.flash-dt);this.springCool=Math.max(0,this.springCool-dt);let wasGround=this.lastGround;let puff=it.float&&this.fuel>0&&!it.squish;this.fuel=clamp(this.fuel+dt*(puff?-1:this.ground>0?1.5:.1),0,1.9);if(puff)this.floatTime+=dt;if(it.squish)this.squeezeTime+=dt;
let wind=this.remix?Math.sin(this.time*.9)*60:0;this.ground=0;this.contacts=[0,0];let polygons=[...this.plan.road,...this.plan.roof,...(this.plan.moving||[])].map(o=>({p:vertices(o,this.time),o}));let impact=0;
for(let sub=0;sub<2;sub++){let h=dt/2,oldGround=this.lastGround;for(let i=0;i<10;i++){let n=this.nodes[i],vx=clamp((n.x-n.px)*.997,-2.2,2.2),vy=clamp((n.y-n.py)*.997,-7,7);n.px=n.x;n.py=n.y;let ax=it.drive*(oldGround?550:270)+wind,ay=760-(puff?1180:0);n.x+=vx+ax*h*h;n.y+=vy+ay*h*h;n.contact=false;n.r=(i>=8?19:5)*this.scale;}
// Position-based elastic springs, then continuous small-step circle collision.
for(let iteration=0;iteration<6;iteration++){
for(let l of this.links){let a=this.nodes[l.a],b=this.nodes[l.b],dx=b.x-a.x,dy=b.y-a.y,d=hypot(dx,dy)||1,k=(d-l.rest*this.scale)/d*l.stiff;let ox=dx*k*.5,oy=dy*k*.5;a.x+=ox;a.y+=oy;b.x-=ox;b.y-=oy;}
for(let i=0;i<10;i++){let n=this.nodes[i];for(let {p,o}of polygons){if(n.x+n.r<o.x||n.x-n.r>o.x+o.w)continue;let hit=contact(n.x,n.y,n.r,p);if(hit){let {nx,ny,depth}=hit,vx=n.x-n.px,vy=n.y-n.py,vn=vx*nx+vy*ny;n.x+=nx*depth;n.y+=ny*depth;if(vn<0){let restitution=i>=8?.10:.07;n.px+=nx*vn*(1+restitution);n.py+=ny*vn*(1+restitution);impact=Math.max(impact,-vn*120);}if(ny<-.3){n.contact=true;this.ground++;if(i>=8)this.contacts[i-8]++;let tangent=-ny,ty=nx,vt=(n.x-n.px)*tangent+(n.y-n.py)*ty;let friction=it.drive===0?.13:.008;n.px+=vt*tangent*friction;n.py+=vt*ty*friction;}}}}
}
// An airborne nudge is torque, so the driver can right the car before landing.
if(!oldGround&&it.drive){let a=this.nodes[8],b=this.nodes[9],an=Math.atan2(b.y-a.y,b.x-a.x),error=Math.atan2(Math.sin(an),Math.cos(an));let torque=clamp(-error*.003,-.012,.012);a.y-=torque*35;b.y+=torque*35;}
this.lastGround=this.ground>0;
}
let car=this.car;this.rotation=car.angle;this.wheelSpin+=car.vx*dt/(19*this.scale);this.lastVX=car.vx;this.air=this.ground?0:this.air+dt;this.maxAir=Math.max(this.maxAir,this.air);if(this.ground&&!wasGround&&impact>130){this.emit('land',car.x,car.y,Math.min(1,impact/600));this.flash=.08;}
for(let [a,b]of this.plan.spring){if(this.springCool<=0&&this.ground&&car.x>a&&car.x<b){for(let n of this.nodes){n.py=n.y+4.8;n.px=n.x-clamp(car.vx/120,.5,2.2);}this.springCool=1;this.springCount++;this.emit('spring',car.x,car.y);}}
for(let i=0;i<3;i++){let st=this.plan.stars[i];if(!this.starred[i]&&hypot(car.x-st[0],car.y-st[1])<64*this.scale+15){this.starred[i]=true;this.emit('star',st[0],st[1],i);}}
if(!this.flagged){let f=this.plan.flags[0];if(hypot(car.x-f[0],car.y-f[1])<80){this.flagged=true;this.checkpoint={x:f[0],y:f[1]};this.emit('flag',f[0],f[1]);}}
if(car.y>770||car.y< -350||car.x< -200||!Number.isFinite(car.x)){this.recall();return;}
if(car.x>this.plan.end&&Math.abs(car.y-482)<105){this.state='won';this.emit('win',car.x,car.y);}
this.sfxClock+=dt;if(this.ground&&Math.abs(car.vx)>50&&this.sfxClock>.22){this.sfxClock=0;this.emit('roll',car.x,car.y,Math.abs(car.vx));}
}
medals(){return[this.state==='won',this.state==='won'&&this.starred.every(Boolean),this.state==='won'&&this.resets<=1&&this.time<=this.plan.par];}
snapshot(){let o={};for(let k of ['index','remix','time','state','nodes','scale','fuel','ground','contacts','springCool','flash','resets','starred','checkpoint','flagged','rotation','wheelSpin','lastVX','sfxClock','air','maxAir','squeezeTime','floatTime','springCount','lastGround'])o[k]=JSON.parse(JSON.stringify(this[k]));return o;}
static restore(o){if(!o||!Number.isInteger(o.index)||o.index<0||o.index>=8||!Array.isArray(o.nodes)||o.nodes.length!==10||o.nodes.some(n=>!Number.isFinite(n.x)||!Number.isFinite(n.y)||!Number.isFinite(n.px)||!Number.isFinite(n.py)))throw Error('Invalid ride');let e=new Engine(o.index,o.remix||0);for(let k of Object.keys(e.snapshot()))if(k in o)e[k]=JSON.parse(JSON.stringify(o[k]));e.input={drive:0,squish:false,float:false};e.events=[];return e;}
}
root.Doodle={Engine,LEVELS,SHAPE,vertices,contact,clamp};if(typeof module!=='undefined')module.exports=root.Doodle;
})(typeof window!=='undefined'?window:globalThis);

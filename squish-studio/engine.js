(function(root){
'use strict';
const N=24,W=600,H=800;
class Studio{
 constructor(){this.bodies=[];this.grabs=new Map;this.gravity=false;this.softness=.5;this.tick=0;this.serial=0;this.effects=[];this.preset('Bonbons')}
 add(x,y,r=48,color=0,shape=0){if(this.bodies.length>=12)return null;let pts=[];for(let i=0;i<N;i++){let a=i/N*Math.PI*2,q=shape===1?1+.13*Math.cos(a*5):shape===2?1+.16*Math.cos(a*3):1;let px=x+Math.cos(a)*r*q,py=y+Math.sin(a)*r*q;pts.push({x:px,y:py,ox:px,oy:py})}let b={id:++this.serial,r,color,shape,pts,rest:[],area:0,mood:0};b.area=this.area(b);for(let i=0;i<N;i++){b.rest.push([1,2,6].map(k=>Math.hypot(pts[i].x-pts[(i+k)%N].x,pts[i].y-pts[(i+k)%N].y)))}this.bodies.push(b);return b}
 area(b){let sum=0;for(let i=0;i<N;i++){let p=b.pts[i],q=b.pts[(i+1)%N];sum+=p.x*q.y-q.x*p.y}return sum/2}
 center(b){return b.pts.reduce((a,p)=>({x:a.x+p.x/N,y:a.y+p.y/N}),{x:0,y:0})}
 hit(x,y){for(let j=this.bodies.length-1;j>=0;j--){let b=this.bodies[j],inside=false;for(let i=0,k=N-1;i<N;k=i++){let p=b.pts[i],q=b.pts[k];if((p.y>y)!==(q.y>y)&&x<(q.x-p.x)*(y-p.y)/(q.y-p.y)+p.x)inside=!inside}if(inside)return b}return null}
 grab(id,x,y,tool='Pull'){let b=this.hit(x,y);if(!b)return false;let n=0,d=1e9;b.pts.forEach((p,i)=>{let dd=Math.hypot(p.x-x,p.y-y);if(dd<d){d=dd;n=i}});this.grabs.set(id,{body:b.id,n,x,y,tool});b.mood=1;return true}
 move(id,x,y){let g=this.grabs.get(id);if(g){g.x=Math.max(24,Math.min(W-24,x));g.y=Math.max(24,Math.min(H-24,y))}}
 release(id){this.grabs.delete(id)}
 cut(b){if(!b||this.bodies.length>=12||b.area<Math.PI*26*26)return false;let c=this.center(b),r=Math.max(20,Math.min(60,Math.sqrt(Math.abs(b.area)/Math.PI)*.68));this.bodies=this.bodies.filter(x=>x!==b);for(let k of [-1,1]){let child=this.add(c.x+k*r*.6,c.y,r,b.color,0);child.pts.forEach(p=>{p.ox=p.x-k*3;p.oy=p.y+2})}this.grabs.clear();this.effects.push({x:c.x,y:c.y,age:0,color:b.color});return true}
 bounce(){this.bodies.forEach((b,i)=>b.pts.forEach(p=>{p.oy=p.y+7+i%3;p.ox=p.x+Math.sin(i*3)*3}));this.effects.push({x:W/2,y:H-25,age:0,color:1})}
 preset(name){this.bodies=[];this.grabs.clear();this.effects=[];this.tick=0;let arr=name==='Macarons'?[[180,140,60,2,0],[420,140,60,4,0],[180,390,60,0,0],[420,390,60,3,0],[300,610,60,1,0]]:name==='Starlets'?[[170,180,64,1,1],[400,180,64,3,1],[290,520,72,2,1]]:name==='Giant'?[[300,380,132,0,2]]:name==='Empty'?[]:[[170,140,58,0,0],[410,140,56,1,1],[285,365,70,2,2],[155,585,48,3,0],[430,565,55,4,0]];arr.forEach(a=>this.add(...a));this.scene=name}
 snapshot(){return JSON.parse(JSON.stringify({bodies:this.bodies,gravity:this.gravity,softness:this.softness,tick:this.tick,serial:this.serial,scene:this.scene}))}
 restore(s){for(let k of ['bodies','gravity','softness','tick','serial','scene'])this[k]=JSON.parse(JSON.stringify(s[k]));this.grabs.clear();this.effects=[]}
 step(){this.tick++;for(let b of this.bodies){b.mood*=.975;for(let p of b.pts){let vx=(p.x-p.ox)*.985,vy=(p.y-p.oy)*.985;p.ox=p.x;p.oy=p.y;p.x+=Math.max(-14,Math.min(14,vx));p.y+=Math.max(-14,Math.min(14,vy))+(this.gravity?.19:0)}}
 for(let pass=0;pass<7;pass++){
  for(let b of this.bodies){let squeezing=[...this.grabs.values()].some(g=>g.body===b.id&&g.tool==='Squish'),target=b.area*(squeezing?.66:1);
   for(let i=0;i<N;i++)for(let j=0;j<3;j++){let k=[1,2,6][j],p=b.pts[i],q=b.pts[(i+k)%N],dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy)||1,f=(d-b.rest[i][j])/d*(j===0?.45:j===1?.14:(.085-this.softness*.06));p.x+=dx*f;p.y+=dy*f;q.x-=dx*f;q.y-=dy*f}
   let ar=this.area(b),gr=[],den=0;for(let i=0;i<N;i++){let prev=b.pts[(i+N-1)%N],next=b.pts[(i+1)%N],gx=(next.y-prev.y)/2,gy=(prev.x-next.x)/2;gr.push({x:gx,y:gy});den+=gx*gx+gy*gy}let lambda=Math.max(-.09,Math.min(.09,(target-ar)/(den||1)));for(let i=0;i<N;i++){b.pts[i].x+=gr[i].x*lambda;b.pts[i].y+=gr[i].y*lambda}
  }
  for(let j=0;j<this.bodies.length;j++)for(let k=j+1;k<this.bodies.length;k++){let a=this.bodies[j],b=this.bodies[k],ca=this.center(a),cb=this.center(b),dx=cb.x-ca.x,dy=cb.y-ca.y,d=Math.hypot(dx,dy)||.1;if(d>a.r+b.r+35)continue;let ux=dx/d,uy=dy/d,ra=Math.max(...a.pts.map(p=>(p.x-ca.x)*ux+(p.y-ca.y)*uy)),rb=Math.max(...b.pts.map(p=>-(p.x-cb.x)*ux-(p.y-cb.y)*uy)),over=ra+rb-d;if(over>0){let shift=Math.min(5,over*.14);for(let p of a.pts){let face=Math.max(0,((p.x-ca.x)*ux+(p.y-ca.y)*uy)/ra);p.x-=ux*shift*(.3+face);p.y-=uy*shift*(.3+face)}for(let p of b.pts){let face=Math.max(0,-((p.x-cb.x)*ux+(p.y-cb.y)*uy)/rb);p.x+=ux*shift*(.3+face);p.y+=uy*shift*(.3+face)}}}
  for(let g of this.grabs.values()){let b=this.bodies.find(b=>b.id===g.body);if(!b)continue;if(g.tool==='Squish'){let c=this.center(b);for(let p of b.pts){p.x+=(g.x-c.x)*.14;p.y+=(g.y-c.y)*.14}}else{let p=b.pts[g.n];p.x+=(g.x-p.x)*.8;p.y+=(g.y-p.y)*.8}}
  for(let b of this.bodies)for(let p of b.pts){let nx=Math.max(28,Math.min(W-28,p.x)),ny=Math.max(28,Math.min(H-32,p.y));if(nx!==p.x){p.ox=nx+(p.x-p.ox)*.18;p.x=nx}if(ny!==p.y){p.oy=ny+(p.y-p.oy)*.18;p.ox=p.x-(p.x-p.ox)*.75;p.y=ny}}
 }
 this.effects.forEach(e=>e.age++);this.effects=this.effects.filter(e=>e.age<40);
 }
}
if(typeof module!=='undefined')module.exports=Studio;else root.Studio=Studio;
})(globalThis);

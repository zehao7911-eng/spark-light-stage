import {Fluid} from './fluid-core.js';
const RGB=h=>[parseInt(h.slice(1,3),16)/255,parseInt(h.slice(3,5),16)/255,parseInt(h.slice(5,7),16)/255];
export class Flow{
 constructor(){this.w=48;this.h=80;this.canvas=document.createElement('canvas');this.canvas.width=this.w;this.canvas.height=this.h;this.ctx=this.canvas.getContext('2d');this.image=this.ctx.createImageData(this.w,this.h);this.pending=[];this.field=null;this.fluid=new Fluid();this.fluid.setResolution(this.h,this.w);this.fluid.setIterations(5);this.fluid.setUICallback(f=>this.inject(f));this.fluid.setDisplayFunction(f=>this.display(f));}
 reset(){this.fluid.reset();this.pending=[];this.field=null;this.ctx.clearRect(0,0,this.w,this.h)}
 emit(x,y,color,vx=0,vy=0,power=1,radius=1){if(this.pending.length>=90)return;this.pending.push({x:Math.max(2,Math.min(this.w-3,Math.floor(x/360*this.w))),y:Math.max(2,Math.min(this.h-3,Math.floor(y/600*this.h))),rgb:RGB(color),vx,vy,power,radius});}
 splash(x,y,color,power=1){for(let i=0;i<12;i++){let a=i*Math.PI/6;this.emit(x+Math.cos(a)*18,y+Math.sin(a)*18,color,Math.cos(a)*14*power,Math.sin(a)*14*power,6*power,2)}}
 inject(f){for(let p of this.pending)for(let dy=-p.radius;dy<=p.radius;dy++)for(let dx=-p.radius;dx<=p.radius;dx++){let x=p.x+dx,y=p.y+dy;if(x<1||y<1||x>=this.w-1||y>=this.h-1)continue;let weight=Math.max(0,1-Math.hypot(dx,dy)/(p.radius+1));f.setDensityRGB(x,y,p.rgb.map(v=>v*p.power*weight));f.setVelocity(x,y,(p.vx-dy*1.4)*weight,(p.vy+dx*1.4)*weight)}this.pending=[];}
 display(f){this.field=f;let {r,g,bl,rowSize}=f.data,data=this.image.data;for(let y=0;y<this.h;y++)for(let x=0;x<this.w;x++){let n=x+1+(y+1)*rowSize,i=(x+y*this.w)*4;let a=Math.max(r[n],g[n],bl[n]);let strength=1-Math.exp(-a*5),bright=220*strength;
 data[i]=a>0?bright*Math.pow(Math.max(0,r[n])/a,1.6):0;
 data[i+1]=a>0?bright*Math.pow(Math.max(0,g[n])/a,1.6):0;
 data[i+2]=a>0?bright*Math.pow(Math.max(0,bl[n])/a,1.6):0;
 data[i+3]=Math.min(230,a*1500);}this.ctx.putImageData(this.image,0,0)}
 update(){this.fluid.update()}
 sample(x,y){if(!this.field)return{x:0,y:0};let ix=Math.max(1,Math.min(this.w-2,Math.floor(x/360*this.w))),iy=Math.max(1,Math.min(this.h-2,Math.floor(y/600*this.h)));return{x:this.field.getXVelocity(ix,iy)*30,y:this.field.getYVelocity(ix,iy)*30}}
}

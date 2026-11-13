import {field,FLAVOURS} from './core.mjs';
// Marching tetrahedra over a bounded scalar field. Smooth gradient normals
// keep the original scoop and the actual subtracted bite surfaces continuous.
const NX=18,NY=21,NZ=14,DX=.105,DY=.09,DZ=.105,OX=-.945,OY=-.18,OZ=-.735;
const TETS=[[0,5,1,6],[0,1,2,6],[0,2,3,6],[0,3,7,6],[0,7,4,6],[0,4,5,6]],CORNERS=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]],cache=new Map();
const index=(x,y,z)=>(y*(NZ+1)+z)*(NX+1)+x;
export function surface(level,cuts){let base=cache.get(level);if(!base){base=new Float32Array((NX+1)*(NY+1)*(NZ+1));for(let y=0;y<=NY;y++)for(let z=0;z<=NZ;z++)for(let x=0;x<=NX;x++)base[index(x,y,z)]=field(FLAVOURS[level].shape,OX+x*DX,OY+y*DY,OZ+z*DZ);cache.set(level,base);}const v=base.slice();
 for(let y=0;y<=NY;y++)for(let z=0;z<=NZ;z++)for(let x=0;x<=NX;x++){let j=index(x,y,z),xx=OX+x*DX,yy=OY+y*DY,zz=OZ+z*DZ;for(const b of cuts){let d=(xx-b.x)**2+(yy-b.y)**2+(zz-b.z)**2;if(d<(b.r+.11)**2)v[j]=Math.max(v[j],b.r-Math.sqrt(d));}}
 // Remove disconnected surface fragments left between the consumption
 // lattice and the denser visual field. Keep the largest component even at
 // the end of a scoop. The model also folds detached sample clusters into the bite.
 if(cuts.length){let seen=new Uint8Array(v.length),components=[],stride=(NX+1)*(NZ+1),largest=null;for(let j=0;j<v.length;j++)if(v[j]<0&&!seen[j]){let q=[j];seen[j]=1;for(let k=0;k<q.length;k++){let u=q[k],x=u%(NX+1),z=Math.floor(u/(NX+1))%(NZ+1),y=Math.floor(u/stride),neighbors=[];if(x>0)neighbors.push(u-1);if(x<NX)neighbors.push(u+1);if(z>0)neighbors.push(u-(NX+1));if(z<NZ)neighbors.push(u+NX+1);if(y>0)neighbors.push(u-stride);if(y<NY)neighbors.push(u+stride);for(let n of neighbors)if(v[n]<0&&!seen[n]){seen[n]=1;q.push(n);}}components.push(q);if(!largest||q.length>largest.length)largest=q;}for(let q of components)if(q!==largest)for(let j of q)v[j]=Math.abs(v[j])+.02;}
 const grad=new Float32Array(v.length*3);for(let y=0;y<=NY;y++)for(let z=0;z<=NZ;z++)for(let x=0;x<=NX;x++){let j=index(x,y,z)*3;grad[j]=(v[index(Math.min(NX,x+1),y,z)]-v[index(Math.max(0,x-1),y,z)])/(2*DX);grad[j+1]=(v[index(x,Math.min(NY,y+1),z)]-v[index(x,Math.max(0,y-1),z)])/(2*DY);grad[j+2]=(v[index(x,y,Math.min(NZ,z+1))]-v[index(x,y,Math.max(0,z-1))])/(2*DZ);}
 const pos=[],normal=[];
 function edge(a,b){let f=a.v/(a.v-b.v);return {p:a.p.map((x,i)=>x+(b.p[i]-x)*f),n:a.n.map((x,i)=>x+(b.n[i]-x)*f)};}
 function tri(a,b,c){let u=b.p.map((x,i)=>x-a.p[i]),w=c.p.map((x,i)=>x-a.p[i]);let cross=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]],n=a.n.map((x,i)=>x+b.n[i]+c.n[i]);if(cross.reduce((s,x,i)=>s+x*n[i],0)<0)[b,c]=[c,b];for(let e of [a,b,c]){pos.push(...e.p);let l=Math.hypot(...e.n)||1;normal.push(...e.n.map(x=>x/l));}}
 for(let y=0;y<NY;y++)for(let z=0;z<NZ;z++)for(let x=0;x<NX;x++){const a=CORNERS.map(q=>{let ix=x+q[0],iy=y+q[1],iz=z+q[2],j=index(ix,iy,iz);return {p:[OX+ix*DX,OY+iy*DY,OZ+iz*DZ],v:v[j],n:[grad[j*3],grad[j*3+1],grad[j*3+2]]};});if(a.every(q=>q.v>=0)||a.every(q=>q.v<0))continue;for(let tet of TETS){let inside=tet.map(i=>a[i]).filter(q=>q.v<0),out=tet.map(i=>a[i]).filter(q=>q.v>=0);if(inside.length===1)tri(...out.map(q=>edge(inside[0],q)));else if(inside.length===3)tri(...inside.map(q=>edge(out[0],q)));else if(inside.length===2){let q=[edge(inside[0],out[0]),edge(inside[0],out[1]),edge(inside[1],out[0]),edge(inside[1],out[1])];tri(q[0],q[1],q[2]);tri(q[1],q[3],q[2]);}}}
 return {positions:new Float32Array(pos),normals:new Float32Array(normal)};
}

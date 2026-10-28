// Oriented boundary tracing; physics stays on its small, fixed occupancy grid.
export function contours(soil,cols,rows){
 const edges=new Map();let total=0;
 const add=(x,y,bx,by)=>{let k=x+','+y;if(!edges.has(k))edges.set(k,[]);edges.get(k).push([bx,by]);total++;};
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){let k=y*cols+x;if(!soil[k])continue;if(y===0||!soil[k-cols])add(x,y,x+1,y);if(x===cols-1||!soil[k+1])add(x+1,y,x+1,y+1);if(y===rows-1||!soil[k+cols])add(x+1,y+1,x,y+1);if(x===0||!soil[k-1])add(x,y+1,x,y);}
 let loops=[];while(total>0){let first=edges.keys().next().value;if(first===undefined)break;let start=first.split(',').map(Number),p=start,path=[];for(let guard=0;guard<50000;guard++){let key=p[0]+','+p[1],list=edges.get(key);if(!list?.length)break;path.push(p);p=list.pop();total--;if(!list.length)edges.delete(key);if(p[0]===start[0]&&p[1]===start[1])break;}if(path.length>=3)loops.push(path);}
 return loops;
}
export const area=path=>path.reduce((s,p,i)=>{let q=path[(i+1)%path.length];return s+p[0]*q[1]-q[0]*p[1];},0)/2;
function simplifyLine(p,tolerance=.7){if(p.length<=2)return p;let a=p[0],b=p[p.length-1],dx=b[0]-a[0],dy=b[1]-a[1],d=dx*dx+dy*dy,max=0,index=-1;for(let i=1;i<p.length-1;i++){let t=d?Math.max(0,Math.min(1,((p[i][0]-a[0])*dx+(p[i][1]-a[1])*dy)/d)):0,dist=Math.hypot(p[i][0]-a[0]-t*dx,p[i][1]-a[1]-t*dy);if(dist>max){max=dist;index=i;}}if(max<=tolerance)return[a,b];let left=simplifyLine(p.slice(0,index+1),tolerance),right=simplifyLine(p.slice(index),tolerance);return left.slice(0,-1).concat(right);}
export function smooth(path){
 let far=1,max=0;for(let i=1;i<path.length;i++){let d=Math.hypot(path[i][0]-path[0][0],path[i][1]-path[0][1]);if(d>max){max=d;far=i;}}let a=simplifyLine(path.slice(0,far+1)),b=simplifyLine(path.slice(far).concat([path[0]]));path=a.slice(0,-1).concat(b.slice(0,-1));
 let corners=path.filter((p,i)=>{let a=path[(i+path.length-1)%path.length],b=path[(i+1)%path.length];return(p[0]-a[0])*(b[1]-p[1])!==(p[1]-a[1])*(b[0]-p[0]);});
 let dense=[];for(let i=0;i<corners.length;i++){let a=corners[i],b=corners[(i+1)%corners.length],d=Math.hypot(b[0]-a[0],b[1]-a[1]);dense.push(a);if(d>3){dense.push([a[0]+(b[0]-a[0])/d,a[1]+(b[1]-a[1])/d],[b[0]-(b[0]-a[0])/d,b[1]-(b[1]-a[1])/d]);}}
 for(let iteration=0;iteration<2;iteration++){let next=[];for(let i=0;i<dense.length;i++){let a=dense[i],b=dense[(i+1)%dense.length];next.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25],[a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75]);}dense=next;}return dense;
}
export function contains(poly,p){let inside=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){let a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])inside=!inside;}return inside;}

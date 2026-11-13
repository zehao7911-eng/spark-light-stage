export function canvas(w,h){let c=document.createElement('canvas');c.width=w;c.height=h;return c;}
export class Pixel{
 constructor(q){this.q=q;}r(x,y,w,h,c){this.q.fillStyle=c;this.q.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
 line(x0,y0,x1,y1,c){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);let dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,err=dx+dy;for(let n=0;n<3000;n++){this.r(x0,y0,1,1,c);if(x0===x1&&y0===y1)break;let e=2*err;if(e>=dy){err+=dy;x0+=sx;}if(e<=dx){err+=dx;y0+=sy;}}}
 poly(points,c){let lo=Math.ceil(Math.min(...points.map(p=>p[1]))),hi=Math.floor(Math.max(...points.map(p=>p[1])));for(let y=lo;y<=hi;y++){let xs=[];for(let i=0,j=points.length-1;i<points.length;j=i++){let a=points[i],b=points[j];if(a[1]<=y&&b[1]>y||b[1]<=y&&a[1]>y)xs.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));}xs.sort((a,b)=>a-b);for(let i=0;i+1<xs.length;i+=2)this.r(Math.ceil(xs[i]),y,Math.floor(xs[i+1])-Math.ceil(xs[i])+1,1,c);}}
 oval(x,y,rx,ry,c){for(let j=-ry;j<=ry;j++){let w=Math.floor(rx*Math.sqrt(Math.max(0,1-j*j/(ry*ry))));this.r(x-w,y+j,w*2+1,1,c);}}
 box(x,y,w,h,base,light,dark){this.r(x,y,w,h,dark);this.r(x+1,y+1,w-2,h-2,base);this.r(x+1,y+1,w-2,1,light);this.r(x+1,y+1,1,h-2,light);}
}

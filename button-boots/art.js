window.BootArt=(function(){let c;const palettes=[['#e8efdf','#a9c5b5','#789a86','#f4eed8'],['#eee5e3','#beaab9','#8c819e','#f6e6d3'],['#dce7ee','#97b8c6','#658b9b','#f3ecd8'],['#e7e2ce','#b5bf93','#849b72','#f8efd9']];
function rr(x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke();}}
function ellipse(x,y,rx,ry,fill){c.fillStyle=fill;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
function line(points,color,width=2){c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.beginPath();points.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.stroke();}
function bell(x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);line([[0,-14],[0,-10]],'#82744b',2);ellipse(0,-12,4,4,'#a8915e');c.fillStyle='#d8ad62';c.beginPath();c.moveTo(-10,5);c.quadraticCurveTo(-9,-10,0,-9);c.quadraticCurveTo(9,-10,10,5);c.closePath();c.fill();ellipse(0,5,12,3,'#b18146');ellipse(0,8,3,3,'#f6d796');line([[-4,-6],[-6,1]],'#f8dfa1',2);c.restore();}
function bush(x,y,k,col){ellipse(x,y,20*k,11*k,col);ellipse(x-10*k,y-6*k,12*k,11*k,col);ellipse(x+9*k,y-8*k,13*k,13*k,col);}
function tree(x,y,k,col){line([[x,y],[x+4*k,y-60*k]],'#a09a7a',6*k);line([[x+3*k,y-27*k],[x-20*k,y-45*k]],'#a09a7a',3*k);bush(x,y-67*k,k*1.5,col);bush(x-18*k,y-45*k,k*.8,col);}
function draw(ctx,g){c=ctx;const{W,H,scale:s,cam,off,state:q,time:t,drag,body,effects,theme}=g,P=palettes[Math.floor(q.n/2)%4],boots=['#dd806b','#719ca8'],hat=theme==='berry'?'#b479a0':'#7a9d7a';c.save();c.clearRect(0,0,W,H);let sky=c.createLinearGradient(0,0,0,H);sky.addColorStop(0,P[0]);sky.addColorStop(1,P[3]);c.fillStyle=sky;c.fillRect(0,0,W,H);c.scale(s,s);const vw=W/s,vh=H/s;
// Layers of paper hills and a tiny, distant village.
ellipse(vw*.76,80,43,43,'#fff7d7');ellipse(vw*.76-12,65,48,44,P[0]);
for(let layer=0;layer<3;layer++){c.fillStyle=[P[1]+'55',P[1]+'88',P[1]][layer];c.beginPath();c.moveTo(-80,vh);for(let x=-80;x<vw+100;x+=15){const world=x+cam*(.08+layer*.08);const y=vh*.57+layer*42+Math.sin(world*.009+layer)*30+Math.sin(world*.017+layer*4)*16;c.lineTo(x,y);}c.lineTo(vw+100,vh);c.fill();}
for(let i=0;i<9;i++){const x=((i*179-cam*.2)%(vw+250)+vw+250)%(vw+250)-100,y=vh*.61+Math.sin(i*4)*15;rr(x,y,28,35,5,P[2]+'44');c.fillStyle=P[3];c.beginPath();c.moveTo(x-5,y);c.lineTo(x+14,y-18);c.lineTo(x+33,y);c.fill();rr(x+10,y+15,7,12,3,P[3]);}
for(let i=0;i<7;i++){let x=((i*173-cam*.31)%(vw+250)+vw+250)%(vw+250)-100,y=vh*.56+Math.sin(i*2)*18;tree(x,y,.9+i%2*.2,P[1]+'99');if(i%2===0){rr(x+15,y-22,36,25,12,'#f5f0d77a');ellipse(x+25,y-11,3,3,P[2]+'66');}}
for(let i=0;i<4;i++){let x=((i*241-cam*.1+t*2)%(vw+300)+vw+300)%(vw+300)-100,y=105+i%2*54;bush(x,y,1.6,'#ffffff59');}
// A paper hot-air balloon and hanging wind toys travel with the distant scenery.
const balloon=((285-cam*.14)%(vw+600)+vw+600)%(vw+600)-100,byAir=vh*.27+Math.sin(t*.6)*5;
ellipse(balloon,byAir,27,35,'#dca48b66');ellipse(balloon,byAir,14,35,'#f1d9b266');line([[balloon-13,byAir+28],[balloon-8,byAir+47],[balloon+8,byAir+47],[balloon+13,byAir+28]],'#9e9e8155',1);rr(balloon-10,byAir+45,20,12,4,'#a89e7c66');
for(let i=0;i<35;i++){let x=((i*89-cam*.12)%(vw+50)+vw+50)%(vw+50),y=(i*71)%Math.max(1,vh*.75);ellipse(x,y,.7,.7,'#7f957316');}
// A stitched tabletop edge below the floating islands.
const floor=off+490;c.fillStyle=P[2]+'28';c.fillRect(0,floor,vw,vh);line([[0,floor],[vw,floor]],P[2]+'44',2);for(let i=0;i<vw/18;i++)line([[i*18,floor+12],[i*18+6,floor+12]],P[2]+'38',1);
c.translate(-cam,off);
const r=Boots.route(q.n),a=Boots.foot(q,0),b=Boots.foot(q,1),ff=[a,b];if(drag)ff[drag.k]={x:drag.x,y:drag.y};
// Dashed reach indicator appears only while a boot is lifted.
if(drag){const other=ff[1-drag.k];c.setLineDash([3,8]);c.strokeStyle='#7b8e6f55';c.lineWidth=2;c.beginPath();c.arc(other.x,other.y,242,Math.PI,Math.PI*2);c.stroke();c.setLineDash([]);}
for(let i=0;i<r.length;i++){const p=Boots.pad(q,i);if(p.x<cam-130||p.x>cam+vw+130)continue;const last=i===r.length-1,near=drag&&Math.hypot(p.x-ff[1-drag.k].x,p.y-ff[1-drag.k].y)<240,hot=drag&&(p.need===null||p.need===drag.k)&&Math.abs(drag.x-p.x)<p.w/2+8&&Math.abs(drag.y-p.y)<32&&Math.hypot(drag.x-ff[1-drag.k].x,drag.y-ff[1-drag.k].y)<=242;
ellipse(p.x,478,p.w*.58,12,'#687c6020');if(p.m){line([[p.x, p.y+70],[p.x,455]],'#899c7e66',3);ellipse(p.x,455,8,4,'#91a08366');}
rr(p.x-p.w/2,p.y+5,p.w,61,15,'#bfb99b');rr(p.x-p.w/2+5,p.y+15,p.w-10,40,8,'#d2c9a9');for(let j=0;j<3;j++)line([[p.x-p.w/2+13,p.y+24+j*9],[p.x+p.w/2-14,p.y+24+j*9]],'#baaf8f55',1);
rr(p.x-p.w/2-3,p.y-8,p.w+6,22,12,hot?'#fff0ba':last?'#d6b674':'#e9e3c8',near?'#7f9d8c':'#f9f5e4');rr(p.x-p.w/2+3,p.y-7,p.w-6,7,4,hot?'#f8cf7b':'#f7f2df');
if(p.need!==null){rr(p.x-16,p.y-6,32,8,4,boots[p.need]);ellipse(p.x-8,p.y-2,2,2,'#fff5dd');}
if(i===0){tree(p.x-30,p.y-15,.6,P[2]);}else if(last){line([[p.x+30,p.y-9],[p.x+30,p.y-93]],'#8c9579',3);c.fillStyle=boots[0];c.beginPath();c.moveTo(p.x+30,p.y-93);c.lineTo(p.x+61,p.y-82);c.lineTo(p.x+30,p.y-71);c.fill();rr(p.x-24,p.y-52,46,43,14,'#f1e5ca','#b6b18e');ellipse(p.x-9,p.y-30,3,3,'#637b6c');ellipse(p.x+9,p.y-30,3,3,'#637b6c');line([[p.x-5,p.y-21],[p.x,p.y-18],[p.x+5,p.y-21]],'#637b6c',2);}
else if(!r[i].bell&&i%3===1){bush(p.x+p.w/2-7,p.y-15,.4,P[2]);ellipse(p.x+p.w/2-8,p.y-26,4,4,'#e2a28c');}
if(r[i].bell&&!q.bells.includes(i)){let yy=p.y-52+Math.sin(t*3+i)*3;ellipse(p.x,yy,19,19,'#fff5cc66');bell(p.x,yy,.9);}
if(near){ellipse(p.x,p.y+2,5,2,hot?'#d28b5b':'#8da990');}}
// Soft articulated toy: knee direction changes with the lifted foot.
const bx=body.x,by=body.y,lean=Math.max(-.25,Math.min(.25,body.vx*.001));ellipse((a.x+b.x)/2,Math.max(a.y,b.y)+7,48,7,'#75826822');
for(let k=0;k<2;k++){const f=ff[k],hip={x:bx+(k?16:-16),y:by+30},knee={x:(hip.x+f.x)/2+(k?16:-16),y:(hip.y+f.y)/2-8};line([[hip.x,hip.y],[knee.x,knee.y],[f.x,f.y-10]],'#536960',14);line([[hip.x-2,hip.y],[knee.x-2,knee.y],[f.x-2,f.y-12]],'#e9dcb9',8);ellipse(knee.x,knee.y,8,8,boots[k]);ellipse(knee.x-2,knee.y-2,3,3,'#fff6d0');}
c.save();c.translate(bx,by);c.rotate(lean);line([[-27,4],[-40,23+Math.sin(t*3)*4],[-37,36]],'#8da493',9);line([[27,4],[40,21-Math.sin(t*3)*4],[37,34]],'#8da493',9);ellipse(-37,36,7,8,'#e1bf87');ellipse(37,34,7,8,'#e1bf87');rr(-29,-29,58,62,21,'#bac8ac','#849a82');rr(-22,-23,44,30,13,'#f7f0d8');const blink=Math.sin(t*.7)> .995;ellipse(-9,-9,3,blink?1:5,'#43594d');ellipse(9,-9,3,blink?1:5,'#43594d');ellipse(-15,-2,4,2,'#e8b29b');ellipse(15,-2,4,2,'#e8b29b');line([[-3,0],[0,2],[3,0]],'#637762',1.5);rr(-24,11,48,9,4,boots[0]);c.fillStyle=boots[0];c.beginPath();c.moveTo(21,13);c.lineTo(40,15+Math.sin(t*5)*4);c.lineTo(33,23+Math.sin(t*5)*4);c.lineTo(20,20);c.fill();rr(-8,24,16,8,3,'#e8d8af');line([[0,-29],[3,-43]],'#708d75',3);ellipse(3,-45,6,6,'#edc573');ellipse(1,-47,2,2,'#fff3be');if(theme!=='classic'){rr(-23,-32,46,7,3,hat);rr(-13,-45,26,15,4,hat);}c.restore();
for(let k=0;k<2;k++){const f=ff[k],lift=drag?.k===k;c.save();c.translate(f.x,f.y-8);c.rotate(lift?(k?-.12:.12):0);if(lift)ellipse(0,15,29,7,'#344c3917');rr(-27,-14,54,27,10,boots[k],'#fff6df');rr(-26,6,52,8,4,'#596e60');rr(-19,-12,27,7,3,'#ffffff40');for(let j=0;j<3;j++)line([[-8+j*6,-6],[-7+j*6,1]],'#fbebcb',2);ellipse(-16,-3,3,3,'#fbecc8');c.restore();}
if(!q.steps&&!drag){for(let k=0;k<2;k++){const f=ff[k];c.setLineDash([3,5]);c.strokeStyle=boots[k]+'99';c.lineWidth=2;c.beginPath();c.ellipse(f.x,f.y-4,34+Math.sin(t*3)*2,25,0,0,Math.PI*2);c.stroke();c.setLineDash([]);}const p=Boots.pad(q,1);line([[b.x+25,b.y-35],[p.x-30,p.y-55]],'#7c927866',2);line([[p.x-40,p.y-61],[p.x-30,p.y-55],[p.x-40,p.y-50]],'#7c927866',2);}
for(const e of effects){const age=t-e.t;if(age<0||age>1.2)continue;c.globalAlpha=Math.max(0,1-age/1.2);if(e.type==='ring'){c.strokeStyle=e.color;c.lineWidth=3;c.beginPath();c.ellipse(e.x,e.y,12+age*45,5+age*14,0,0,7);c.stroke();}else{const dx=Math.cos(e.seed)*age*65,dy=-Math.sin(e.seed)*age*80+age*age*55;c.save();c.translate(e.x+dx,e.y+dy);c.rotate(age*3+e.seed);rr(-3,-3,6,6,2,e.color);c.restore();}c.globalAlpha=1;}
c.restore();return{bell};}
return{draw};})();

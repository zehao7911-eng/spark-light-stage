(function(){'use strict';
let c;const W=480,H=320;let bg=null,particles=[],labels=[],ripples=[],pulse=0,building=-1,buildTime=0;
function rect(x,y,w,h,color){if(color)c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
function line(x0,y0,x1,y1,color){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);let dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,e=dx+dy;c.fillStyle=color;for(let n=0;n<1000;n++){c.fillRect(x0,y0,1,1);if(x0===x1&&y0===y1)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx;}if(e2<=dx){e+=dx;y0+=sy;}}}
function circle(x,y,r,col){c.fillStyle=col;for(let yy=-r;yy<=r;yy++){const xx=Math.floor(Math.sqrt(r*r-yy*yy));c.fillRect(Math.round(x)-xx,Math.round(y)+yy,xx*2+1,1);}}
function ellipse(x,y,rx,ry,col){c.fillStyle=col;for(let yy=-ry;yy<=ry;yy++){const xx=Math.floor(rx*Math.sqrt(1-yy*yy/(ry*ry)));c.fillRect(Math.round(x)-xx,Math.round(y)+yy,xx*2+1,1);}}
function polygon(points,color){let min=Math.min(...points.map(p=>p[1])),max=Math.max(...points.map(p=>p[1]));for(let y=Math.ceil(min);y<=max;y++){let xs=[];for(let i=0,j=points.length-1;i<points.length;j=i++){let a=points[i],b=points[j];if((a[1]>y)!==(b[1]>y))xs.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));}xs.sort((a,b)=>a-b);for(let i=0;i<xs.length;i+=2)rect(xs[i],y,xs[i+1]-xs[i]+1,1,color);}}
const FONT={A:['010','101','111','101','101'],B:['110','101','110','101','110'],C:['011','100','100','100','011'],D:['110','101','101','101','110'],E:['111','100','110','100','111'],F:['111','100','110','100','100'],G:['011','100','101','101','011'],H:['101','101','111','101','101'],I:['111','010','010','010','111'],J:['001','001','001','101','010'],K:['101','101','110','101','101'],L:['100','100','100','100','111'],M:['10001','11011','10101','10001','10001'],N:['1001','1101','1011','1001','1001'],O:['010','101','101','101','010'],P:['110','101','110','100','100'],Q:['010','101','101','011','001'],R:['110','101','110','101','101'],S:['011','100','010','001','110'],T:['111','010','010','010','010'],U:['101','101','101','101','111'],V:['101','101','101','101','010'],W:['10001','10001','10101','11011','10001'],X:['101','101','010','101','101'],Y:['101','101','010','010','010'],Z:['111','001','010','100','111'],0:['111','101','101','101','111'],1:['010','110','010','010','111'],2:['110','001','010','100','111'],3:['110','001','010','001','110'],4:['101','101','111','001','001'],5:['111','100','110','001','110'],6:['011','100','111','101','111'],7:['111','001','010','010','010'],8:['111','101','111','101','111'],9:['111','101','111','001','110'],'+':['000','010','111','010','000'],'-':['000','000','111','000','000'],'.':['0','0','0','0','1'],'!':['1','1','1','0','1'],':':['0','1','0','1','0'],'/':['001','001','010','100','100'],' ':['00','00','00','00','00']};
function text(s,x,y,color='#fff0c6',scale=1,center=false){s=String(s).toUpperCase();let width=0;for(const ch of s)width+=((FONT[ch]||FONT[' '])[0].length+1)*scale;if(center)x-=width/2;for(const ch of s){const a=FONT[ch]||FONT[' '];for(let yy=0;yy<a.length;yy++)for(let xx=0;xx<a[yy].length;xx++)if(a[yy][xx]==='1')rect(x+xx*scale,y+yy*scale,scale,scale,color);x+=(a[0].length+1)*scale;}}
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
function pine(x,y,h,col){rect(x-1,y-h,3,h,'#30384b');for(let i=0;i<5;i++){const yy=y-h+i*h*.14,ww=5+i*4;polygon([[x,yy],[x-ww,yy+h*.4],[x+ww,yy+h*.4]],col);line(x,yy+2,x-ww+3,yy+h*.4-2,'#43536a');}}
function bush(x,y,r){ellipse(x,y,r,r*.5|0,'#334657');ellipse(x-3,y-3,r-3,r*.38|0,'#52677a');rect(x-8,y-6,4,2,'#7c8e92');rect(x+3,y-4,3,2,'#8c9f96');}
function scenery(){const old=c;bg=document.createElement('canvas');bg.width=W;bg.height=H;c=bg.getContext('2d');const r=rng(3391);rect(0,0,W,H,'#56637e');
 const bands=['#282b45','#30334f','#393b5c','#454563','#58516c','#716276','#8e7681','#ab8f93','#c1a7a2'];for(let i=0;i<bands.length;i++){rect(0,i*24,480,25,bands[i]);if(i)for(let k=0;k<190;k++)rect(r()*480,i*24+r()*5,1,1,bands[i-1]);}
 circle(384,54,24,'#c1bca9');circle(390,49,24,'#363950');rect(371,61,2,2,'#e7dbb8');
 for(let i=0;i<90;i++){const x=r()*480,y=r()*146;rect(x,y,i%9===0?2:1,1,i%3?'#838394':'#b7b0b5');}
 for(let k=0;k<3;k++){let points=[[0,250]];for(let x=0;x<=500;x+=16)points.push([x,158+k*23+Math.floor(r()*25)]);points.push([480,260]);polygon(points,['#6f7088','#535f79','#3b4e65'][k]);}
 for(let i=0;i<22;i++)pine(i*24-5,258,40+r()*40,i%2?'#34485b':'#3d5265');
 polygon([[34,265],[60,250],[115,245],[152,252],[179,242],[228,246],[263,239],[300,245],[338,243],[383,254],[440,258],[461,270],[440,287],[397,298],[340,301],[306,317],[279,305],[242,319],[205,310],[163,312],[138,296],[88,292],[57,282]],'#263548');
 polygon([[35,264],[61,252],[118,248],[154,256],[179,247],[228,250],[263,244],[300,250],[339,246],[382,258],[439,261],[460,270],[430,279],[371,284],[301,286],[236,282],[165,286],[102,279],[59,274]],'#62777b');
 for(let i=0;i<300;i++){const x=53+r()*390,y=257+r()*22;rect(x,y,2+r()*5,1,r()<.5?'#8c9c8f':'#4e666e');}
 for(let i=0;i<80;i++){const x=85+r()*310,y=286+r()*18;rect(x,y,3+r()*4,2,r()<.5?'#3f4c5b':'#54606b');}
 // A softly lit moonpool, stone steps and a miniature camp.
 ellipse(103,264,42,10,'#3d5368');ellipse(103,262,36,7,'#6e92a1');ellipse(103,260,31,4,'#a4bac0');for(let i=0;i<14;i++)rect(76+r()*52,260+r()*5,3+r()*6,1,'#c5d0c4');
 for(let i=0;i<5;i++){rect(166+i*12,260-i,14,3,'#9aa198');rect(167+i*12,262-i,12,1,'#536773');}
 rect(355,250,20,15,'#5a4e5e');polygon([[348,250],[365,229],[383,250]],'#8b7180');line(365,230,365,248,'#c6a796');rect(361,250,8,15,'#363c51');rect(351,250,5,3,'#b99683');
 rect(384,251,2,18,'#726575');rect(379,248,12,3,'#9c8690');rect(381,251,8,8,'#d5b993');rect(382,252,5,5,'#f0d6a0');
 for(let i=0;i<13;i++)bush(i*39-8,277+(i%3)*5,10+r()*8);
 for(let i=0;i<45;i++){const x=r()*480,y=281+r()*24;rect(x,y,1,5,'#5a7472');rect(x-1,y,3,2,i%2?'#ada8bd':'#d3ba9b');rect(x,y-1,1,1,'#e3d4c0');}
 // Hanging roots and waterfalls beneath the floating island.
 for(let i=0;i<14;i++){const x=116+i*18;line(x,296,x+3,309+i%4*3,'#3a5258');rect(x+2,305,2,4,'#536a69');}
 rect(91,281,3,24,'#738c9a');rect(93,283,2,27,'#adc1c0');rect(391,285,2,18,'#8fa9ae');
 c=old;
}
function roof(x,y,w,color){polygon([[x-w/2-5,y+4],[x,y-18],[x+w/2+5,y+4]],'#33364d');polygon([[x-w/2,y+2],[x,y-16],[x+w/2,y+2]],color);for(let yy=0;yy<15;yy+=4)line(x-yy*2,y-14+yy,x+yy*2,y-14+yy,'#414b67');rect(x-3,y-21,6,5,'#b6a3b9');rect(x-1,y-28,2,8,'#dbc7a4');}
function mage(x,y,t,casting=false){const bob=casting?Math.sin(t*13):Math.sin(t*2)*.5;ellipse(x,y+1,8,2,'#445967');rect(x-5,y-3,4,3,'#323747');rect(x+1,y-3,5,3,'#323747');polygon([[x-4,y-16+bob],[x+4,y-16+bob],[x+7,y-3],[x-7,y-3]],'#8c819e');rect(x-3,y-14+bob,2,9,'#c0b5bd');rect(x-3,y-22+bob,8,7,'#d2ac95');rect(x+3,y-20+bob,1,2,'#424457');polygon([[x-9,y-23+bob],[x+8,y-23+bob],[x-1,y-37+bob]],'#7a718d');rect(x-7,y-24+bob,15,2,'#b9a5ad');rect(x-2,y-30+bob,2,2,'#e3c593');line(x+7,y-4,x+9,y-27,'#b79a82');circle(x+9,y-28,2,'#bce3da');if(casting)line(x+1,y-14,x+11,y-18,'#d9b39a');}
function room(g,i,t){const bottom=252-i*28,y=bottom-28,x=242,w=[78,74,80,84,72,66][i],left=x-w/2,lev=g.rooms[i],col=Spire.ROOMS[i].color;
 rect(left-2,y-1,w+4,30,'#30354a');rect(left,y,w,28,'#89929b');rect(left+1,y+1,w-3,26,'#b0b2b0');rect(left+5,y+4,w-10,21,'#3c465c');rect(left+6,y+5,w-12,18,'#4f5871');rect(left,y+25,w,3,'#666f81');rect(left-3,y+26,w+6,3,'#b5b6ac');rect(left+1,y+28,w-2,1,'#343e54');
 for(let k=0;k<4;k++){rect(left+k*21,y,18,2,'#c3c1af');rect(left+k*21,y+22,1,3,'#90999f');}
 // Window columns frame a different inhabited room on every floor.
 rect(left+3,y+3,3,21,'#8894a0');rect(left+w-6,y+3,3,21,'#8894a0');
 if(i===0){rect(x-10,y+7,20,16,'#33384d');rect(x-8,y+9,16,14,'#9e7c65');rect(x-6,y+10,12,13,'#e5bb82');rect(x-3,y+11,5,12,'#f1d39d');rect(x-9,y+23,18,2,'#b0a38e');for(let k=0;k<2;k++){rect(x-29+k*54,y+7,4,10,'#d8b581');rect(x-28+k*54,y+8,2,7,'#f1d69f');}rect(x+15,y+18,12,5,'#ac8e75');rect(x+16,y+23,2,3,'#6e6170');}
 if(i===1){line(x+10,y+21,x+16,y+10,'#c2afa1');line(x+10,y+21,x+4,y+25,'#b8a897');line(x+10,y+21,x+19,y+25,'#b8a897');polygon([[x+8,y+9],[x+12,y+5],[x+26,y+12],[x+23,y+16]],'#9bb7bf');rect(x+24,y+12,3,4,'#d6d3b2');circle(x-19,y+11,7,'#62758c');circle(x-19,y+11,5,'#b9d4cd');rect(x-23,y+18,9,3,'#b6a6a2');rect(x-29,y+22,18,2,'#8f8c9a');}
 if(i===2){for(let j=0;j<3;j++){rect(x-31+j*22,y+5,18,17,'#766879');rect(x-30+j*22,y+10,16,2,'#b69f91');rect(x-30+j*22,y+18,16,2,'#b69f91');for(let k=0;k<5;k++)rect(x-29+j*22+k*3,y+6,2,4,['#b79fae','#9db6b9','#cfba98'][k%3]);}rect(x-8,y+20,17,3,'#cfbcb2');line(x,y+20,x+1,y+17,'#f2debb');}
 if(i===3){for(let k=0;k<4;k++){const xx=x-28+k*19;rect(xx-3,y+19,9,6,'#a08079');rect(xx,y+12,2,8,'#8cba9d');ellipse(xx,y+13,6,3,'#79a898');rect(xx-3,y+9,6,3,'#b9c6ac');}line(x-35,y+4,x+35,y+4,'#a7aca8');for(let k=0;k<5;k++)rect(x-27+k*14,y+4,1,6,'#c9c9b4');}
 if(i===4){ellipse(x,y+14,20,8,'#647287');for(let k=0;k<4;k++){let a=t*.6+k*1.57;circle(x+Math.cos(a)*20,y+14+Math.sin(a)*8,2,col);}circle(x,y+14,5,'#e3c590');circle(x-1,y+13,2,'#f7e7b8');rect(x-1,y+20,2,4,'#b2a198');}
 if(i===5){polygon([[x,y+3],[x+7,y+13],[x,y+23],[x-7,y+13]],'#b5d9d2');polygon([[x,y+5],[x+1,y+14],[x-5,y+13]],'#edf0d6');line(x-20,y+23,x+20,y+23,'#b2a7bc');for(let k=0;k<3;k++)circle(x-19+k*19,y+8,2,'#d2bfd6');}
 if(lev>=3){rect(left-4,y+8,3,12,'#ad8d9e');rect(left+w+1,y+8,3,12,'#ad8d9e');}
 if(lev>=5){line(left+7,y+3,left+w-7,y+3,col);for(let k=0;k<4;k++)rect(left+10+k*15,y+2,2,3,'#e3cdab');}
 if(lev>=10){rect(left+2,y+23,w-4,1,'#e3c9a3');for(let k=0;k<5;k++)rect(left+7+k*14,y+24,2,2,col);}
 if(building===i&&buildTime>0){for(let k=0;k<8;k++)rect(left+(k*13+t*40)%w,y+26-buildTime*20,2,2,'#efddae');}
}
function spiritPosition(g,i,t){const p=g.phase[i],count=Spire.roomCount(g),targetY=241-(g.task==='study'?Math.min(1,count-1):i%count)*28;let x,y;if(p<.42){const u=p/.42;x=103+139*u;y=249+(targetY-249)*u-Math.sin(u*Math.PI)*30;}else if(p<.6){x=242+Math.sin(t*3+i)*5;y=targetY-5;}else {const u=(p-.6)/.4;x=242-139*u;y=targetY+(249-targetY)*u-Math.sin(u*Math.PI)*12;}return{x,y};}
function effect(e){if(e.type==='channel'){pulse=.22;labels.push({x:296,y:241,value:'+'+Math.round(e.value),age:0,color:'#e5dcc0'});for(let i=0;i<5;i++)particles.push({x:315,y:237,vx:(Math.random()-.5)*50,vy:-20-Math.random()*25,age:0,max:.5,color:'#c9e2d5'});}if(e.type==='deliver'){labels.push({x:242,y:240-(e.floor||0)*28,value:'+'+(e.kind==='insight'?e.value.toFixed(1):Math.round(e.value)),age:0,color:e.kind==='insight'?'#d1b4d9':'#c8e2dc'});}if(e.type==='build'){building=e.i;buildTime=1.1;}if(['build','research','claim','ascend','boost','meteor','summon'].includes(e.type)){const x=e.type==='meteor'?370:e.type==='summon'?103:242,y=e.type==='build'?225-e.i*28:170;for(let k=0;k<30;k++)particles.push({x,y,vx:(Math.random()-.5)*100,vy:-20-Math.random()*60,age:0,max:.8+Math.random()*.4,color:['#dcc5ad','#aacfc4','#bcb2d3'][k%3]});ripples.push({x,y,age:0});}particles=particles.slice(-170);labels=labels.slice(-18);ripples=ripples.slice(-8);}
function tick(dt){pulse=Math.max(0,pulse-dt);buildTime=Math.max(0,buildTime-dt);for(const a of [particles,labels,ripples])for(const p of a)p.age+=dt;particles=particles.filter(p=>p.age<p.max);labels=labels.filter(p=>p.age<1);ripples=ripples.filter(p=>p.age<.7);}
function render(ctx,g){c=ctx;if(!bg)scenery();c.drawImage(bg,0,0);const t=g.motion?g.time:0,count=Spire.roomCount(g);
 // Layered drifting clouds, tiny birds and shimmering waterfalls.
 for(let i=0;i<4;i++){const x=(t*(i%2?1.5:.8)+i*137)%580-60,y=81+i%2*40;rect(x,y,46,3,'#8c849755');rect(x+8,y-3,21,4,'#8c849755');}
 for(let i=0;i<12;i++){const x=27+i*37,y=27+(i*29)%110;if(Math.sin(t+i*3)>.4){rect(x,y,1,3,'#d3c5bb');rect(x-1,y+1,3,1,'#d3c5bb');}}
 for(let i=0;i<4;i++){const y=286+(t*12+i*7)%26;rect(93,y,1,3,'#d1d8ca');}
 for(let i=0;i<count;i++)room(g,i,t);const top=252-count*28;roof(242,top,Math.max(66,84-count*3),'#7b7c9e');
 if(count>1){rect(282,top+5,2,19,'#baa6a8');polygon([[284,top+6],[300,top+6],[297,top+17],[284,top+17]],'#ae8f9e');rect(287,top+8,3,5,'#e1c5a3');}
 if(g.stars>0){circle(242,top-32,4,'#e3d3ae');rect(241,top-38,2,2,'#e3d3ae');}
 // Free-standing channeling crystal; its halo grows during Starlight.
 ellipse(317,263,15,4,'#3c4e61');rect(309,256,17,7,'#87949a');rect(306,262,23,3,'#abb5b0');polygon([[317,221],[327,238],[320,252],[311,249],[307,237]],pulse>0?'#e1ebd5':'#93c3be');polygon([[317,223],[318,239],[311,245],[310,237]],'#c9e4cf');line(317,241,317,249,'#6ba19e');if(g.boost>0){for(let i=0;i<12;i++){const a=t+i*.52;rect(317+Math.cos(a)*20,237+Math.sin(a)*17,2,2,'#e0d2b1');}}
 mage(291,263,t,pulse>0);for(let i=0;i<g.wisps;i++){const p=spiritPosition(g,i,t),col=g.task==='study'?'#c6b1d6':'#bbdcd0';rect(p.x-4,p.y,2,2,'#718e9a');rect(p.x-6,p.y+1,1,1,'#718e9a');circle(p.x,p.y,3,'#6e9b9f');circle(p.x,p.y-1,2,col);rect(p.x,p.y-2,1,1,'#f0efd4');}
 if(g.wisps>=4){rect(126,248,14,12,'#7c8290');roof(133,246,18,'#9494ad');rect(131,250,4,7,'#ddd2b2');}
 if(g.research.library>0){rect(336,253,12,10,'#7b6c80');rect(335,252,14,2,'#c0a5ae');for(let i=0;i<3;i++)rect(338+i*3,254,2,5,['#a6c4bd','#cbb39c','#a89bbc'][i]);}
 if(g.shower>0){const u=(12-g.shower)/12,x=360+Math.sin(u*8)*30,y=50+u*70;for(let i=0;i<5;i++)rect(x+i*5,y-i*4,2,2,'#b5afbca0');circle(x,y,4,'#ead4a3');line(x-7,y,x+7,y,'#ead4a3');line(x,y-7,x,y+7,'#ead4a3');}
 for(const p of particles)rect(p.x+p.vx*p.age,p.y+p.vy*p.age+40*p.age*p.age,2,2,p.color);for(const p of labels){text(p.value,p.x+1,p.y-p.age*19+1,'#394354',1,true);text(p.value,p.x,p.y-p.age*19,p.color,1,true);}for(const p of ripples){const r=4+p.age*40;for(let i=0;i<16;i++)rect(p.x+Math.cos(i*.4)*r,p.y+Math.sin(i*.4)*r*.6,2,1,'#d9c5ac');}
}
function icon(canvas,i){const old=c;c=canvas.getContext('2d');c.clearRect(0,0,24,24);const col=typeof i==='number'?Spire.ROOMS[i].color:'#c8d6d1';if(typeof i==='number'){rect(4,9,16,13,'#808d9e');rect(6,11,12,10,'#45516a');roof(12,8,16,col);rect(10,14,4,7,col);rect(3,21,18,2,'#adb6b3');}else if(i==='spirit'){circle(12,11,7,'#6c9b9e');circle(12,10,5,'#bedbd1');rect(6,17,3,3,'#bedbd1');rect(11,17,3,5,'#bedbd1');rect(16,17,3,3,'#bedbd1');rect(9,9,1,2,'#465f75');rect(14,9,1,2,'#465f75');}else if(i==='book'){rect(3,5,18,15,'#ad94b8');rect(4,6,7,12,'#ddd0bd');rect(13,6,7,12,'#ddd0bd');rect(11,5,2,16,'#6c688a');}else{polygon([[12,1],[15,8],[23,10],[17,15],[19,23],[12,19],[5,23],[7,15],[1,10],[9,8]],'#e0caa5');}c=old;}
window.SpireArt={render,tick,effect,icon};
})();

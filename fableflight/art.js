(function(){
'use strict';
const W=480,H=270;
const PAL=[{sky:'#b7d6bc',haze:'#8fb9aa',far:'#648f87',mid:'#476e67',tree:'#294f49',dark:'#193c38',leaf:'#487e56',light:'#80a05b',grass:'#658c4a',soil:'#4d693d',shine:'#e9dba5',water:'#92b5a0'},
{sky:'#9babc3',haze:'#768fae',far:'#536987',mid:'#3c566e',tree:'#253f53',dark:'#182c40',leaf:'#3e656e',light:'#6fa091',grass:'#537f73',soil:'#36595b',shine:'#c6e5da',water:'#749eae'},
{sky:'#e7c6a0',haze:'#c4aa92',far:'#a18d83',mid:'#7c7775',tree:'#4d6060',dark:'#303f45',leaf:'#747e56',light:'#b2a15c',grass:'#a49a58',soil:'#7a7749',shine:'#ffdf9b',water:'#b8ad8e'}];
const COLORS={plain:'#e3c98f',fire:'#ef9261',frost:'#a3e7df',storm:'#d8b2f0'};
let c,pool=[],bolts=[],rings=[],texts=[],lines=[],anim=0,shake=0,area=-1,bg;
function rect(x,y,w,h,color){if(color)c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
function line(x0,y0,x1,y1,color){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);let dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,e=dx+dy;c.fillStyle=color;for(let n=0;n<1000;n++){c.fillRect(x0,y0,1,1);if(x0===x1&&y0===y1)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx;}if(e2<=dx){e+=dx;y0+=sy;}}}
function circle(x,y,r,col){c.fillStyle=col;for(let yy=-r;yy<=r;yy++){const xx=Math.floor(Math.sqrt(r*r-yy*yy));c.fillRect(Math.round(x)-xx,Math.round(y)+yy,xx*2+1,1);}}
function ellipse(x,y,rx,ry,col){c.fillStyle=col;for(let yy=-ry;yy<=ry;yy++){const xx=Math.floor(rx*Math.sqrt(1-yy*yy/(ry*ry)));c.fillRect(Math.round(x)-xx,Math.round(y)+yy,xx*2+1,1);}}
function polygon(points,color){let min=Math.min(...points.map(p=>p[1])),max=Math.max(...points.map(p=>p[1]));for(let y=Math.ceil(min);y<=max;y++){let xs=[];for(let i=0,j=points.length-1;i<points.length;j=i++){let a=points[i],b=points[j];if((a[1]>y)!==(b[1]>y))xs.push(a[0]+(y-a[1])*(b[0]-a[0])/(b[1]-a[1]));}xs.sort((a,b)=>a-b);for(let i=0;i<xs.length;i+=2)rect(xs[i],y,xs[i+1]-xs[i]+1,1,color);}}
const FONT={A:['010','101','111','101','101'],B:['110','101','110','101','110'],C:['011','100','100','100','011'],D:['110','101','101','101','110'],E:['111','100','110','100','111'],F:['111','100','110','100','100'],G:['011','100','101','101','011'],H:['101','101','111','101','101'],I:['111','010','010','010','111'],J:['001','001','001','101','010'],K:['101','101','110','101','101'],L:['100','100','100','100','111'],M:['10001','11011','10101','10001','10001'],N:['1001','1101','1011','1001','1001'],O:['010','101','101','101','010'],P:['110','101','110','100','100'],Q:['010','101','101','011','001'],R:['110','101','110','101','101'],S:['011','100','010','001','110'],T:['111','010','010','010','010'],U:['101','101','101','101','111'],V:['101','101','101','101','010'],W:['10001','10001','10101','11011','10001'],X:['101','101','010','101','101'],Y:['101','101','010','010','010'],Z:['111','001','010','100','111'],0:['111','101','101','101','111'],1:['010','110','010','010','111'],2:['110','001','010','100','111'],3:['110','001','010','001','110'],4:['101','101','111','001','001'],5:['111','100','110','001','110'],6:['011','100','111','101','111'],7:['111','001','010','010','010'],8:['111','101','111','101','111'],9:['111','101','111','001','110'],'+':['000','010','111','010','000'],'-':['000','000','111','000','000'],'.':['0','0','0','0','1'],'!':['1','1','1','0','1'],':':['0','1','0','1','0'],'/':['001','001','010','100','100'],' ':['00','00','00','00','00']};
function text(s,x,y,color='#fff0c6',scale=1,center=false){s=String(s).toUpperCase();let width=0;for(const ch of s)width+=((FONT[ch]||FONT[' '])[0].length+1)*scale;if(center)x-=width/2;for(const ch of s){const a=FONT[ch]||FONT[' '];for(let yy=0;yy<a.length;yy++)for(let xx=0;xx<a[yy].length;xx++)if(a[yy][xx]==='1')rect(x+xx*scale,y+yy*scale,scale,scale,color);x+=(a[0].length+1)*scale;}}
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
function tree(x,y,h,p,r){rect(x-3,y-h,7,h,p.dark);rect(x,y-h,2,h,'#6b6350');for(let i=0;i<4;i++){const yy=y-h+10+i*h*.14,rr=22-i*2;ellipse(x,yy,rr,rr*.65|0,p.tree);ellipse(x-7,yy-4,rr-5,rr*.46|0,p.leaf);for(let j=0;j<8;j++){const px=x+(r()-.5)*rr*1.6,py=yy+(r()-.5)*rr;rect(px,py,3+r()*4,2,p.light);}}}
function pine(x,y,h,p){rect(x-2,y-h,3,h,p.dark);for(let i=0;i<4;i++){const top=y-h+i*h*.17,ww=8+i*6;polygon([[x,top],[x-ww,top+h*.36],[x+ww,top+h*.36]],i%2?p.tree:p.mid);line(x,top+3,x-ww+3,top+h*.36-3,p.leaf);}}
function bush(x,y,s,p,r){ellipse(x,y,s,s*.48|0,p.dark);ellipse(x-2,y-2,s-3,s*.4|0,p.leaf);for(let i=0;i<8;i++)rect(x+(r()-.5)*s*1.5,y-r()*s*.5,3,2,p.light);}
function cloud(x,y){for(const [dx,dy,w,h] of [[0,5,40,5],[8,1,20,9],[20,3,28,6],[30,6,26,3]])rect(x+dx,y+dy,w,h,'#e9e6c9');}
function createScene(index){const old=c;bg=document.createElement('canvas');bg.width=W;bg.height=H;c=bg.getContext('2d');const p=PAL[index],r=rng(431+index);rect(0,0,W,H,p.sky);
 for(let i=0;i<4;i++)cloud(25+i*130,24+(i%2)*17);
 for(let k=0;k<3;k++){let points=[[0,175]];for(let x=0;x<=500;x+=20)points.push([x,90+k*21+Math.floor(r()*22)]);points.push([480,185]);polygon(points,[p.haze,p.far,p.mid][k]);}
 // A tiny distant watchtower, a bridge and a thread of falling water.
 rect(326,104,9,39,p.far);rect(323,101,15,5,p.far);rect(324,97,3,7,p.far);rect(330,97,3,7,p.far);rect(335,97,3,7,p.far);rect(329,111,2,4,p.haze);rect(329,120,2,4,p.haze);
 rect(258,139,77,4,p.haze);for(let i=0;i<6;i++){rect(261+i*13,143,3,13,p.haze);rect(261+i*13,137,2,3,p.haze);}rect(286,151,4,19,p.sky);rect(287,153,2,20,p.shine);
 rect(185,154,215,21,p.water);for(let i=0;i<38;i++)rect(200+r()*200,155+r()*18,3+r()*10,1,p.haze);
 for(let i=0;i<21;i++)pine(i*24-5,176,33+r()*35,p);
 rect(0,177,480,93,p.soil);rect(0,177,480,56,p.grass);
 for(let i=0;i<650;i++){const y=179+r()*78;rect(r()*480,y,r()<.7?2:4,1,r()<.5?p.light:p.soil);}
 // Worn stone path and individual irregular grass blades.
 for(let i=0;i<120;i++){const x=r()*480,y=212+r()*14;rect(x,y,2+r()*8,1,r()<.5?'#a49a69':'#83865b');}
 for(let x=122;x<470;x+=21){rect(x,165,3,21,'#424f40');rect(x,166,1,21,'#9c9464');}rect(120,172,355,3,'#6c7651');rect(120,173,355,1,'#a6a578');
 if(index===0){
 rect(9,138,89,69,'#263b37');rect(13,141,80,62,'#a28a58');rect(13,161,80,3,'#756246');for(let x=16;x<94;x+=13)rect(x,140,3,65,'#5b5840');
 polygon([[0,141],[26,113],[85,113],[108,141]],'#294746');for(let y=116;y<140;y+=5){rect(24-(y-116)*.8,y,65+(y-116)*1.5,3,y%2?'#486568':'#3b5559');for(let x=24;x<90;x+=12)rect(x+(y%3)*2,y,1,3,'#263b40');}
 rect(65,99,12,29,'#5a6558');rect(67,99,9,2,'#9ba18a');for(let y=103;y<124;y+=5)rect(66,y,10,1,'#424f49');
 rect(39,166,21,40,'#34473e');rect(42,169,15,36,'#273c37');rect(54,189,2,2,'#e2c27e');rect(19,154,14,17,'#404c43');rect(21,156,10,12,'#e2bb76');rect(25,155,2,15,'#65573e');rect(20,161,12,2,'#65573e');
 rect(72,154,13,17,'#3e5146');rect(74,156,9,12,'#e2bb76');rect(78,155,1,15,'#625840');
 rect(10,201,29,8,'#6a5a3d');rect(12,199,25,3,'#b39a61');for(let j=0;j<3;j++){rect(15+j*8,196,3,4,p.leaf);rect(14+j*8,194,4,3,'#d7b29b');}
 rect(39,205,24,3,'#a29b75');rect(36,208,30,3,'#7d8364');rect(34,211,34,2,'#b3ab83');
 ellipse(105,201,6,3,'#695d42');rect(99,190,12,11,'#967e4d');ellipse(105,190,6,3,'#b69b63');rect(99,193,12,2,'#53634f');rect(99,199,12,2,'#53634f');rect(104,188,2,4,'#5d674e');
 rect(9,178,11,13,'#9b8354');line(10,179,19,189,'#d4b77b');line(19,179,10,189,'#d4b77b');rect(9,177,11,2,'#5b5942');
 rect(87,140,2,26,'#b0925b');rect(85,154,6,8,'#e9c873');rect(84,153,8,2,'#5a5846');rect(84,161,8,2,'#5a5846');
 text('BOWYER',46,145,'#f2dba4',1,true);
 }else{
 for(let k=0;k<3;k++){let x=21+k*36;rect(x,123,10,81,'#5f7770');rect(x+1,124,3,78,'#9da896');for(let y=130;y<201;y+=10)rect(x,y,10,1,'#405d58');rect(x-3,119,16,6,'#b1b49b');bush(x+3,201,14,p,r);}
 if(index===1){for(let k=0;k<5;k++)circle(24+k*18,132+Math.sin(k)*8,3,'#b6e2d8');}else{polygon([[23,110],[35,87],[47,110]],'#e1c083');rect(33,108,4,20,'#b79c60');}
 }
 tree(-3,218,111,p,r);tree(476,214,104,p,r);for(let i=0;i<14;i++)bush(i*39-10,248+(i%3)*5,15+r()*10,p,r);
 for(let i=0;i<70;i++){let x=r()*480,y=228+r()*40;rect(x,y,1,4,p.leaf);rect(x-1,y,3,2,index===0?'#d8bd8c':index===1?'#a6b6da':'#e1c18e');if(i%3===0)rect(x,y-1,1,1,'#eee0b2');}
 c=old;return bg;
}
function archer(x,y,time,g,helper=false){const shooting=anim>0,frame=shooting?(anim>.21?1:2):0,bob=frame?0:Math.floor(Math.sin(time*2)*.7);y+=bob;ellipse(x,y+1,12,3,'#354d38');
 const cape=g.up.power>=8?'#566897':g.up.power>=3?'#427b70':'#52784d';
 // 24 x 35 native pixel character, articulated draw/release poses.
 rect(x-6,y-12,5,11,'#3c4941');rect(x+1,y-12,5,11,'#4b5845');rect(x-7,y-3,7,3,'#303e37');rect(x+1,y-3,8,3,'#303e37');
 polygon([[x-6,y-28],[x+2,y-24],[x-4,y-8],[x-12-(frame===2?2:0),y-10]],cape);rect(x-6,y-23,11,13,'#d7c48b');rect(x-5,y-14,12,3,'#705d3f');rect(x+1,y-14,2,2,'#e8ca76');rect(x-6,y-23,3,9,cape);
 rect(x-5,y-34,13,11,'#d7a578');rect(x+4,y-30,5,5,'#e3bb8a');rect(x+6,y-30,2,2,'#263b38');rect(x-7,y-35,13,5,'#62513c');rect(x-6,y-31,3,4,'#796044');rect(x-4,y-36,6,1,'#a48456');rect(x-7,y-24,13,3,'#557c90');rect(x-9,y-23,3,6,'#486b7d');
 const bx=x+17,by=y-21;line(bx-2,by-11,bx+3,by-7,'#cfab6a');line(bx+3,by-7,bx+5,by,'#cfab6a');line(bx+5,by,bx+3,by+8,'#a88451');line(bx+3,by+8,bx-2,by+12,'#a88451');
 const hand=frame===1?x-2:x+8;line(bx-2,by-11,hand,by,'#e8ddb5');line(hand,by,bx-2,by+12,'#e8ddb5');rect(x+4,y-24,14,4,'#cfa574');rect(x+4,y-24,5,4,'#c9bd86');rect(hand-2,by-2,4,4,'#e1b98a');
 if(frame===1){line(x-2,by,bx+10,by,'#b79666');rect(bx+9,by-1,3,3,'#e4dfba');rect(x-4,by-1,4,1,'#bcd0bc');}
 if(g.rune!=='plain'){rect(bx+4,by-1,2,3,COLORS[g.rune]);if(g.burst>0)circle(x-1,y-40,2,COLORS[g.rune]);}
 if(g.up.power>=12){rect(x-6,y-36,13,2,'#d8c174');rect(x-4,y-38,2,3,'#e6d190');rect(x+4,y-38,2,3,'#e6d190');}
}
function target(t,time,g,selected){let x=t.x,y=t.y+(t.boss?0:Math.sin(time*1.5+t.phase)*(t.type>=2?2:0));const p=PAL[g.area];if(t.hit&&g.motion)x+=Math.sin(t.hit*90)*2;
 ellipse(x,207,t.boss?18:13,3,p.soil);
 if(t.boss){rect(x-14,170,9,32,'#495950');rect(x+6,170,9,32,'#495950');rect(x-17,199,13,5,'#34473f');rect(x+4,199,13,5,'#34473f');rect(x-23,143,9,31,'#617063');rect(x+15,143,9,31,'#617063');rect(x-16,134,32,41,'#7f8b70');rect(x-15,135,8,35,'#a0a383');rect(x-11,123,23,16,'#607b68');rect(x-6,128,4,2,'#cbe8ba');rect(x+4,128,4,2,'#cbe8ba');circle(x,153,10,'#45564c');circle(x,153,7,COLORS[g.rune==='plain'?'frost':g.rune]);circle(x,153,3,'#edf2ce');for(let k=0;k<3;k++)rect(x-14+k*10,173,6,2,'#34473f');}
 else if(t.type===2||t.type===5){rect(x-7,194,14,9,'#778d76');rect(x-11,201,22,3,'#526f62');polygon([[x,131],[x+12,150],[x+5,170],[x-6,170],[x-13,151]],t.type===2?'#79b9ac':'#b3a2bf');polygon([[x,134],[x+2,151],[x-5,166],[x-10,151]],t.type===2?'#c0e8c7':'#e1c8d2');line(x,171,x,193,'#739b81');rect(x-2,185,5,5,'#b4c2a3');}
 else {const metal=t.type===1||t.type===4;rect(x-2,y+14,4,40,'#8c774f');line(x-2,y+32,x-12,204,'#615c40');line(x+1,y+32,x+12,204,'#615c40');ellipse(x,y,15,19,metal?'#5c6b5e':'#9d8552');ellipse(x-1,y-1,12,16,metal?'#d4c58f':'#d8bf7c');ellipse(x-1,y-1,9,12,t.type===3?'#678f9b':t.type===4?'#ba855b':'#ad6553');ellipse(x-1,y-1,6,8,'#e5d9a6');ellipse(x-1,y-1,3,4,t.type===3?'#6e9bb2':'#b36853');rect(x-9,y-12,2,2,'#eedba7');if(metal){for(let k=0;k<4;k++)rect(x-11+(k%2)*21,y-13+Math.floor(k/2)*26,2,2,'#efdda0');}}
 if(t.frozen>0){line(x-19,y-21,x-19,y+19,'#a4e2e0');line(x-19,y-21,x+14,y-24,'#a4e2e0');line(x+17,y-20,x+19,y+18,'#a4e2e0');}
 const yy=t.boss?112:119;rect(x-17,yy,34,4,'#263f38');rect(x-16,yy+1,32*t.hp/t.max,2,t.boss?'#e3ad72':'#c8d49c');
 if(selected){line(x-7,yy-7,x,yy-3,'#f2da91');line(x,yy-3,x+7,yy-7,'#f2da91');}
}
function helper(g,time){if(!g.up.helper)return;const x=115,y=205;rect(x-8,y-12,17,12,'#677b6e');rect(x-6,y-14,13,3,'#b6ac75');rect(x-10,y-2,4,5,'#334d43');rect(x+7,y-2,4,5,'#334d43');circle(x,y-8,4,'#d3b77a');circle(x,y-8,2,'#52766b');rect(x-2,y-26,4,13,'#a18c5c');line(x-5,y-29,x+8,y-22,'#d8c58e');line(x+8,y-22,x-5,y-16,'#d8c58e');line(x-5,y-29,x-5,y-16,'#e9deb4');rect(x-5,y-23,13,1,'#d8ccb0');if(g.auto)rect(x+Math.floor(time*5)%2,y-10,2,2,'#b8e2b4');}
function decor(g,time){if(g.up.power>=3){rect(138,184,4,21,'#755f41');rect(158,184,4,21,'#755f41');rect(138,183,24,3,'#af935c');for(let i=0;i<3;i++){line(142+i*6,189,146+i*6,196,'#d1bc7d');line(146+i*6,196,142+i*6,202,'#d1bc7d');}}
 if(g.best>=1){rect(179,169,2,36,'#ac9460');polygon([[181,171],[194,171],[194,188],[188,184],[181,188]],'#628b89');text(Math.min(g.best,99),187,175,'#eadca8',1,true);}
 if(g.best>=6){rect(432,186,8,19,'#8a805c');rect(429,183,14,4,'#c4b477');circle(436,177,6,'#e5c77e');rect(435,169,2,8,'#f4dd9d');}
 if(g.up.helper>=2){rect(101,217,24,9,'#675b40');rect(101,217,24,2,'#b59b61');for(let i=0;i<5;i++)line(105+i*4,220,108+i*4,210,'#d3bb85');}
}
function event(e){if(e.type==='draw'){if(e.manual)anim=.35;return;}if(e.type==='shot'){bolts.push({...e,age:0,duration:e.delay,ox:e.manual?94:120,oy:e.manual?184:182});return;}
 if(e.type==='hit'){texts.push({x:e.x+(Math.random()-.5)*9,y:e.y-17,txt:(e.crit?'!':'')+Math.round(e.amount),color:e.crit?'#ffe095':'#e9e4c1',age:0,max:.65});for(let i=0;i<4;i++)pool.push({x:e.x,y:e.y,vx:(Math.random()-.5)*55,vy:-Math.random()*40,col:COLORS[e.rune],age:0,max:.25});if(e.crit)shake=.09;}
 if(e.type==='break'){for(let i=0;i<18;i++)pool.push({x:e.x,y:e.y,vx:(Math.random()-.5)*110,vy:-20-Math.random()*70,col:i%3?'#c9ac6e':'#e4d294',age:0,max:.5+Math.random()*.25});texts.push({x:e.x,y:e.y-25,txt:'+'+e.gold,color:'#f1cf7c',age:0,max:1});rings.push({x:e.x,y:e.y,age:0,max:.35,color:'#e9d99a'});shake=e.boss?.2:.06;}
 if(e.type==='blast')rings.push({x:e.x,y:e.y,age:0,max:.35,color:COLORS[e.rune]});
 if(e.type==='chain'||e.type==='pierce')lines.push({...e,age:0,max:.17});
 if(e.type==='win'||e.type==='upgrade'||e.type==='burst'){for(let i=0;i<35;i++)pool.push({x:e.type==='upgrade'?85:240,y:e.type==='upgrade'?176:80,vx:(Math.random()-.5)*130,vy:-Math.random()*90,col:['#e6cc83','#a9cca5','#9cb6cf'][i%3],age:0,max:1});}
 pool=pool.slice(-180);texts=texts.slice(-30);bolts=bolts.slice(-45);rings=rings.slice(-15);lines=lines.slice(-15);
}
function tick(dt){anim=Math.max(0,anim-dt);shake=Math.max(0,shake-dt);for(const a of [pool,bolts,rings,texts,lines])for(const p of a)p.age+=dt;pool=pool.filter(p=>p.age<p.max);bolts=bolts.filter(p=>p.age<p.duration);rings=rings.filter(p=>p.age<p.max);texts=texts.filter(p=>p.age<p.max);lines=lines.filter(p=>p.age<p.max);}
function render(ctx,g,time,priority){c=ctx;if(area!==g.area){area=g.area;createScene(area);}c.save();if(g.motion&&shake>0)c.translate(Math.round((Math.random()-.5)*3),Math.round((Math.random()-.5)*2));c.drawImage(bg,0,0);
 if(g.motion){for(let i=0;i<9;i++){let x=(time*(3+i%3)+i*67)%500-10,y=70+Math.sin(time*.7+i)*17+i*12;rect(x,y,2,1,i%2?'#d7c790':'#a7ba7b');}for(let i=0;i<3;i++){let x=(time*8+i*170)%530-25,y=38+Math.sin(time+i)*3;line(x-2,y,x,y+1,PAL[g.area].mid);line(x,y+1,x+2,y,PAL[g.area].mid);}}
 decor(g,time);helper(g,time);archer(78,207,time,g);for(const t of g.targets)target(t,time,g,t.id===priority);
 for(const b of bolts){const delay=b.manual?.1:0;if(b.age<delay)continue;const u=(b.age-delay)/(b.duration-delay),x=b.ox+(b.x-b.ox)*u,y=b.oy+(b.y-b.oy)*u-Math.sin(u*Math.PI)*8,col=COLORS[b.rune];line(x-11,y+1,x,y,col);rect(x-10,y,2,3,'#e6e4bc');rect(x,y-1,3,2,col);if(b.rune!=='plain'){rect(x-6,y+3,2,1,col);rect(x-12,y+2,1,1,col);}}
 for(const l of lines){const color=l.type==='chain'?'#dcbcf2':'#e0d7a4';line(l.x,l.y,l.x2,l.y2,color);if(l.type==='chain')for(let i=0;i<4;i++){let x=l.x+(l.x2-l.x)*i/4,y=l.y+(l.y2-l.y)*i/4;line(x,y,x+5,y-5,color);}}
 for(const p of rings){const r=3+p.age/p.max*26;for(let i=0;i<16;i++){const a=i*Math.PI/8;rect(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r*.7,2,2,p.color);}}
 for(const p of pool)rect(p.x+p.vx*p.age,p.y+p.vy*p.age+100*p.age*p.age,2,p.age>.3?1:2,p.col);
 for(const p of texts){const y=p.y-p.age*20;text(p.txt,p.x+1,y+1,'#31433d',1,true);text(p.txt,p.x,y,p.color,1,true);}
 if(g.burst>0){text('OVERGROWTH',240,94,'#fff0b4',1,true);for(let i=0;i<12;i++)rect(78+Math.cos(time*4+i)*18,185+Math.sin(time*4+i)*23,1,2,'#e0d486');}
 if(g.combo>1)text('CHAIN '+g.combo,449,220,'#f6e2a5',1,true);
 // Foreground blades occlude the ground line only, never the action.
 for(let i=0;i<25;i++){const x=(i*79)%480,y=257+(i%3)*4;line(x,y,x-2,y-5,PAL[g.area].light);line(x,y,x+2,y-3,PAL[g.area].leaf);}
 c.restore();
}
function icon(canvas,name,color='#d8c18a'){const cc=canvas.getContext('2d'),old=c;c=cc;cc.clearRect(0,0,24,24);if(name==='bow'){line(7,3,17,8,color);line(17,8,19,12,color);line(19,12,17,17,color);line(17,17,7,22,color);line(7,3,7,22,'#7e9b8a');line(3,12,22,12,color);rect(20,11,3,3,color);}else if(name==='coin'){circle(12,12,9,'#7e6b43');circle(12,12,7,'#e6c887');line(12,8,12,16,'#a17d4c');rect(10,8,5,1,'#a17d4c');rect(10,16,5,1,'#a17d4c');}else if(name==='speed'){polygon([[13,2],[5,14],[12,14],[10,22],[20,9],[13,9]],color);}else if(name==='multi'){for(let i=0;i<3;i++){line(3,5+i*7,21,5+i*7,color);rect(19,4+i*7,3,3,color);}}else if(name==='pierce'){for(let i=0;i<3;i++)rect(5+i*6,3,2,18,'#648779');line(2,12,23,12,color);rect(21,11,3,3,color);}else if(name==='helper'){rect(4,11,16,9,'#759887');circle(12,15,4,color);circle(12,15,2,'#507266');line(5,3,19,7,color);line(19,7,5,11,color);line(5,3,5,11,'#9ab1a1');}else{const col=COLORS[name]||color;polygon([[12,2],[21,12],[12,22],[3,12]],col);polygon([[12,6],[16,12],[12,18],[8,12]],'#314d43');}c=old;}
window.Pixel={render,event,tick,icon,colors:COLORS};
})();

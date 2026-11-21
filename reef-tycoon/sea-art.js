const waters=[
 ['Apricot Sound','#b1d6cb','#ffe0af','#8cae9c','#4f8076','#3f9e97','#145466'],
 ['Glasswater Keys','#c4d9e5','#ffd6be','#a5adc1','#728499','#559db2','#295269'],
 ['The Blue Hollow','#90a3b5','#eac6b2','#687f94','#465e79','#34778b','#193850'],
 ['Copper Narrows','#edc7ac','#ffd9a2','#c19d82','#946f65','#689d88','#285964'],
 ['Moonlace Atoll','#baa9c4','#ffdbc6','#a499b4','#6c7595','#688fba','#354766'],
 ['Northlight Reach','#add3d3','#e3f0d7','#95b6b7','#658b94','#76abae','#295a73']
];
const inks=[['#d96845','#ffd382','#283f54'],['#308c94','#f6c86f','#204858'],['#bc6b86','#ffdcbb','#544364'],['#64865d','#e7c26e','#284e50'],['#577fac','#f1ad91','#273f63'],['#d0934e','#eee1ab','#63464a']];
function path(c,fill,d,stroke,width=1){const p=new Path2D(d);if(fill){c.fillStyle=fill;c.fill(p)}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke(p)}}
function dot(c,x,y,rx,ry,col){c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
function line(c,x,y,X,Y,col,w=1){c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(x,y);c.lineTo(X,Y);c.stroke()}
function gradient(c,top,bottom,a,b){const g=c.createLinearGradient(0,top,0,bottom);g.addColorStop(0,a);g.addColorStop(1,b);return g}
function fishArt(c,f,x,y,size,t=0,facing=1){
 const [a,b,k]=inks[(f.id+f.r)%inks.length],s=Math.sin(t*3+f.id),type=f.form;
 c.save();c.translate(x,y);c.scale(size*facing,size);c.rotate(s*.034);
 if(type==='star'||f.name==='Starfish'){
  for(let i=0;i<5;i++){c.rotate(2*Math.PI/5);path(c,a,'M-11 6 Q-8 -17 0 -35 Q7 -38 12 1 Q10 12 -11 6Z',k,1.4);for(let j=0;j<3;j++)dot(c,2,-10-j*6,2,1.5,b)}
  dot(c,0,0,11,11,a);dot(c,4,-2,2,2,k);
 }else if(['squid','jelly','octopus','nautilus'].includes(type)){
  for(let i=0;i<8;i++){const xx=-20+5*i;path(c,null,'M'+xx+' 0 q'+(s*8-i)+' 14 '+(4*s+i-4)+' 21 t'+(s*7-5)+' 14',i%2?a:b,3+i%3)}
  path(c,a,'M-28 5 C-31 -27 -5 -43 15 -28 Q31 -18 29 4 Q23 13 18 5 Q11 14 4 5 Q-3 13 -10 5 Q-19 15 -28 5Z',k,2);
  path(c,null,'M-19 -5 Q-12 -24 0 -25 M-12 -2 Q-4 -24 6 -24',b,2);dot(c,16,-7,3,4,k);
 }else if(type==='seahorse'){
  path(c,a,'M-11 18 C-35 42 3 46 4 25 Q5 14 -1 8 Q18 2 7 -12 Q5 -18 13 -19 L28 -17 27 -24 13 -25 Q8 -46 -12 -32 Q-27 -20 -15 -7 Q-4 10 -9 25 Q-13 31 -16 27Z',k,2);
  for(let i=0;i<5;i++)line(c,-12,i*5-13,-4,i*5-11,b,2);dot(c,5,-27,3,3,k);
 }else if(['ray','flatfish','sole'].includes(type)){
  path(c,a,'M37 0 Q12 -8 -8 -34 Q-16 -22 -18 -9 L-49 '+(s*6)+' Q-59 5 -20 0 Q-10 10 -7 33 Q12 17 37 0Z',k,2);
  path(c,null,'M-12 -22 Q1 -3 23 0 Q7 4 -5 21',b,2);dot(c,19,-3,2,2,k);
 }else if(['eel','serpent'].includes(type)){
  path(c,null,'M-49 '+(s*9)+' Q-34 -17 -15 0 T12 3 Q23 -8 35 -6',k,9);path(c,null,'M-49 '+(s*9)+' Q-34 -17 -15 0 T12 3 Q23 -8 35 -6',a,6);dot(c,32,-5,12,8,a);dot(c,37,-8,2,2,k);
 }else{
  const round=type==='puffer',long=['shark','marlin','gar','pike','dolphin','whale'].includes(type);
  c.scale(long?1.17:round?.79:1,round?1.32:long?.7:.86+(f.id%4)*.09);
  c.save();c.translate(-24,0);c.scale(.84+.15*s,1);path(c,b,'M4 -3 Q-9 -9 -22 -21 L-17 -1 -23 18 Q-9 13 4 3Z',k,1.7);c.restore();
  path(c,a,'M-22 -8 Q-9 -18 -6 -31 Q6 -25 10 -15Z',k,1.5);
  path(c,a,'M-28 -1 C-12 -24 17 -27 33 -9 Q45 -1 37 4 Q24 22 -1 18 Q-17 16 -28 3Z',k,2);
  path(c,b,'M-23 5 Q2 18 34 4 Q18 23 -2 17 Q-17 14 -23 5Z');
  c.save();c.clip(new Path2D('M-24 0 Q-4 -30 25 -11 Q22 10 -19 9Z'));for(let i=0;i<3+f.id%4;i++){const xx=-21+i*8;if(f.id%2)path(c,null,'M'+xx+' -18 q7 9 4 17',b,2.7);else dot(c,xx,-7+Math.sin(i*2)*3,2.5,2,b)}c.restore();
  path(c,a,'M3 1 Q-4 16 -13 16 Q-12 7 -8 2Z',k,1);path(c,null,'M19 -6 Q13 0 18 7',k,1.2);dot(c,27,-5,4,4,'#fff0bd');dot(c,28,-5,2.3,2.7,k);
  if(type==='angler'||type==='lantern'){path(c,null,'M18 -15 Q27 -42 38 -27',k,2);dot(c,38,-25,4,4,'#fff3a5')}
  if(type==='marlin')path(c,a,'M31 -7 L59 -9 36 0Z',k,1);
 }
 c.restore();
}
function tree(c,x,y,h,col){path(c,col,'M'+x+' '+(y-h)+' l'+(-h*.17)+' '+h*.48+' l'+h*.08+' -2 l'+(-h*.16)+' '+h*.36+' l'+h*.09+' -3 l'+(-h*.15)+' '+h*.29+' h'+h*.6+' l'+(-h*.18)+' '+(-h*.30)+' l'+h*.07+' 3 l'+(-h*.14)+' '+(-h*.34)+' l'+h*.07+' 2Z')}
function coastline(c,W,H,r){
 const p=waters[r],y=H*.47;
 c.fillStyle=gradient(c,0,y,p[1],p[2]);c.fillRect(0,0,W,y+2);
 const sunX=W*.66;dot(c,sunX,y*.55,Math.min(W*.081,54),Math.min(W*.081,54),'#fff3c7');
 for(let i=0;i<18;i++){let x=(i*173+28)%W,yy=y*(.18+(i%7)*.086);dot(c,x,yy,12+(i*9%40),1.5+i%3,'#fff1d580')}
 for(let layer=0;layer<3;layer++){let pts='M0 '+y;for(let x=0;x<W+8;x+=6){const u=x/W,peak=Math.pow(Math.abs(Math.sin(u*(4+layer)+r*.7+layer*1.4)),2.8);pts+=' L'+x+' '+(y-5-(.05+peak*.23)*y*(1-layer*.19)-3*Math.sin(x*.09+layer))}path(c,[p[3],p[4],p[3]][layer],pts+' L'+(W+8)+' '+(y+2)+' H0Z')}
 for(const side of [-1,1]){c.save();if(side===1){c.translate(W,0);c.scale(-1,1)}const span=W*(side===1?.18:.25);for(let i=0;i<42;i++){const x=span*i/42,h=(12+18*(1-i/42))*(.65+.35*Math.sin(i*21));tree(c,x,y-3-13*(1-i/42),h,p[4])}path(c,p[4],'M0 '+(y-24)+' Q'+span*.5+' '+(y-15)+' '+span+' '+y+' H0Z');c.restore()}
 // A regional landmark sits on the far shore, scaled against the cutter.
 c.save();c.translate(W*.81,y);const landmarkScale=Math.min(W/530,1.65,H/450);c.scale(landmarkScale,landmarkScale);
 if(r===1){path(c,p[4],'M-55 0 Q-44 -28 -29 -39 L-20 -35 Q4 -45 19 -26 L38 0 H14 Q3 -26 -14 -23 Q-30 -24 -36 0Z');path(c,null,'M-47 -9 Q-34 -42 -16 -33 Q6 -40 20 -22',p[3],3)}
 if(r===2){for(let j=0;j<5;j++){let xx=j*12-24;path(c,p[4],'M'+xx+' 0 l3 -'+(25+j*5)+' 7 3 4 33Z');dot(c,xx+7,-23-j*5,3,2,'#ebca93')}}
 if(r===3){path(c,'#8a6355','M-54 0 L-48 -21 -38 -22 -26 -54 -17 -54 -3 -17 10 -22 22 -40 35 -37 44 0Z');path(c,'#c98e66','M-38 -22 L-26 -54 -21 -54 -33 -19Z M13 -20 L22 -40 27 -39 21 -18Z')}
 if(r===4){for(let i=0;i<3;i++){let x=-17+i*13;line(c,x,0,x-4,-29-i*6,p[4],3);for(let j=0;j<5;j++){const u=j*.68;path(c,null,'M'+(x-4)+' '+(-29-i*6)+' q'+(Math.cos(u)*14)+' -10 '+(Math.cos(u)*22)+' '+(Math.sin(u)*4),p[4],2)}}}
 if(r===5){path(c,'#c4dbd3','M-55 0 L-43 -17 -36 -12 -21 -42 -12 -29 -5 -40 15 -15 24 -21 41 0Z');path(c,'#81a4ac','M-21 -42 L-26 -10 -42 0 H-6Z M-5 -40 L-8 -11 13 0Z')}
 c.restore();
 // Whitewashed signal tower and keeper's cottage on the headland.
 c.save();c.translate(W*.16,y-8);c.scale(.8,.8);path(c,'#eee3c6','M-8 0 L-5 -48 6 -48 10 0Z','#41565a',1.5);path(c,'#bd594a','M-6 -28 H7 L8 -18 H-7Z');path(c,'#254654','M-8 -49 H8 V-58 H-8Z');path(c,'#f9cd7e','M-5 -51 H5 V-56 H-5Z');path(c,'#a95742','M-10 -59 L0 -67 10 -59Z');path(c,'#dcc6a0','M11 0 V-14 H39 V0Z');path(c,'#a9563e','M8 -14 L17 -24 36 -23 43 -14Z');c.restore();
 c.fillStyle=gradient(c,y,H,p[5],p[6]);c.fillRect(0,y,W,H-y);
 for(let i=0;i<190;i++){const depth=((i*79)%191)/191,xx=((i*137)%997)/997*W,yy=y+1+depth*(H-y);line(c,xx,yy,xx+3+depth*16,yy+(i%3-1)*.65,i%3?'#c3ecd72b':'#123f462b',1+depth)}
 for(let i=0;i<28;i++){const yy=y+i*2.6,xx=sunX+Math.sin(i*24)*i*1.2;line(c,xx-i*.7,yy,xx+6+i*.8,yy,'#ffe4ad61',1.6)}
}
function cutter(c,x,y,scale,t,cast){
 c.save();c.translate(x,y+Math.sin(t*1.5)*2);c.scale(scale,scale);c.rotate(Math.sin(t*.93)*.015);dot(c,-1,13,77,6,'#183e495e');
 path(c,'#8c4f34','M-62 -6 Q-12 -1 64 -13 Q55 10 31 15 L-38 13 Q-54 10 -62 -6Z','#203f47',2);
 path(c,'#d46e46','M-58 -4 Q0 1 59 -10 Q55 -3 49 0 Q0 12 -47 6Z');path(c,null,'M-59 -6 Q0 0 63 -13','#ffcc88',3);
 path(c,'#edc48a','M-38 -7 L-34 -27 -7 -29 5 -7Z','#3c4b44',2);path(c,'#365b60','M-30 -23 H-20 V-12 H-32Z M-16 -24 H-9 L-5 -13 H-16Z');
 path(c,'#ad5840','M-40 -27 L-36 -32 -7 -34 -2 -29Z');line(c,-23,-32,-23,-65,'#684c3c',2);path(c,'#edaa59','M-23 -64 q12 -4 23 1 l-8 2 6 3 q-10 -2 -21 1Z');
 line(c,-23,-60,-51,-8,'#374f4b',.8);line(c,-23,-60,3,-10,'#374f4b',.8);
 path(c,'#284755','M12 -5 L15 -22 24 -22 30 -7Z');path(c,'#dfa552','M12 -11 Q10 -25 16 -30 L23 -29 28 -15Z','#504b46',1);dot(c,20,-35,6,7,'#cc9369');path(c,'#38515a','M12 -36 q1 -12 12 -7 l2 5 5 1 -1 2Z');line(c,23,-24,32,-22,'#d49b70',3);
 line(c,31,-22,cast?64:54,cast?-54:-61,'#674632',2);c.restore()
}
function harborDetail(c,W,H,t){
 c.save();const horizon=H*.47;const x=W*.86,y=horizon+H*.075;
 c.translate(x,y+Math.sin(t*1.4)*1.8);c.rotate(Math.sin(t*1.3)*.07);dot(c,0,2,12,2,'#173b4b55');
 path(c,'#ae5547','M-5 0 L-4 -5 -2 -7 -2 -15 2 -15 2 -7 5 -4 6 0Z');path(c,'#f7dfb1','M-4 -5 H4 L5 -3 H-4Z');dot(c,0,-16,2,1.6,'#ffd583');c.restore();
 const k=Math.min(W/420,H/600,1.45);c.save();c.translate(0,H*.855);c.scale(k,k);
 path(c,'#153d47aa','M0 6 L84 25 40 53 0 49Z');
 for(let i=0;i<6;i++){const x=i*14,y=i*3;path(c,i%2?'#947350':'#a9875c','M'+x+' '+y+' l14 3 -38 24 -16 -3Z','#685b48',1);line(c,x+2,y+4,x-21,y+18,'#c09c6b',1)}
 for(const [x,y] of [[12,0],[72,17]]){path(c,'#725940','M'+(x-4)+' '+(y-20)+' h8 v36 l-8 1Z');dot(c,x,y-20,4,2,'#d2af7d');line(c,x-4,y-13,x+4,y-12,'#d8c691',2)}
 path(c,null,'M12 -13 Q41 11 72 5','#d8c691',2);c.restore()
}

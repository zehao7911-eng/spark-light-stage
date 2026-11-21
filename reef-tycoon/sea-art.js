const waters=[
 ['Apricot Sound','#89dff2','#ffedac','#8cae9c','#4f8076','#45ceb8','#267ea2'],
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
 const [a,b]=inks[(f.id+f.r)%inks.length],k='#292622',s=Math.sin(t*3+f.id),type=f.form;
 c.save();c.translate(x,y);c.scale(size*facing*(1+.045*s),size*(1-.045*s));c.lineJoin="round";c.rotate(s*.034);
 if(naturalistFish(c,f,a,b,k,t)||fieldSpecies(c,f,a,b,k,t)){c.restore();return}
 if(type==='star'||f.name==='Starfish'){
  for(let i=0;i<5;i++){c.rotate(2*Math.PI/5);path(c,a,'M-11 6 Q-8 -17 0 -35 Q7 -38 12 1 Q10 12 -11 6Z',k,1.4);for(let j=0;j<3;j++)dot(c,2,-10-j*6,2,1.5,b)}
  dot(c,0,0,11,11,a);dot(c,4,-2,2,2,k);
 }else if(['squid','jelly','octopus','nautilus'].includes(type)){
  for(let i=0;i<8;i++){const xx=-20+5*i;path(c,null,'M'+xx+' 0 q'+(s*8-i)+' 14 '+(4*s+i-4)+' 21 t'+(s*7-5)+' 14',i%2?a:b,3+i%3)}
  path(c,gradient(c,-34,9,b,a),'M-28 5 C-31 -27 -5 -43 15 -28 Q31 -18 29 4 Q23 13 18 5 Q11 14 4 5 Q-3 13 -10 5 Q-19 15 -28 5Z',k,2);
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
 watercolorClouds(c,W,y,r);paintedHeadlands(c,W,y,r,p);
 for(const side of [-1,1]){c.save();if(side===1){c.translate(W,0);c.scale(-1,1)}const span=W*(side===1?.18:.25);for(let i=0;i<42;i++){const x=span*i/42,h=(12+18*(1-i/42))*(.65+.35*Math.sin(i*21));tree(c,x,y-3-13*(1-i/42),h,p[4])}path(c,p[4],'M0 '+(y-24)+' Q'+span*.5+' '+(y-15)+' '+span+' '+y+' H0Z');c.restore()}
 // A regional landmark sits on the far shore, scaled against the cutter.
 c.save();c.translate(W*.81,y);const landmarkScale=Math.min(W/530,1.65,H/450);c.scale(landmarkScale,landmarkScale);
 if(r===1){path(c,p[4],'M-55 0 Q-44 -28 -29 -39 L-20 -35 Q4 -45 19 -26 L38 0 H14 Q3 -26 -14 -23 Q-30 -24 -36 0Z');path(c,null,'M-47 -9 Q-34 -42 -16 -33 Q6 -40 20 -22',p[3],3)}
 if(r===2){for(let j=0;j<5;j++){let xx=j*12-24;path(c,p[4],'M'+xx+' 0 l3 -'+(25+j*5)+' 7 3 4 33Z');dot(c,xx+7,-23-j*5,3,2,'#ebca93')}}
 if(r===3){path(c,'#8a6355','M-54 0 L-48 -21 -38 -22 -26 -54 -17 -54 -3 -17 10 -22 22 -40 35 -37 44 0Z');path(c,'#c98e66','M-38 -22 L-26 -54 -21 -54 -33 -19Z M13 -20 L22 -40 27 -39 21 -18Z')}
 if(r===4){for(let i=0;i<3;i++){let x=-17+i*13;line(c,x,0,x-4,-29-i*6,p[4],3);for(let j=0;j<5;j++){const u=j*.68;path(c,null,'M'+(x-4)+' '+(-29-i*6)+' q'+(Math.cos(u)*14)+' -10 '+(Math.cos(u)*22)+' '+(Math.sin(u)*4),p[4],2)}}}
 if(r===5){path(c,'#c4dbd3','M-55 0 L-43 -17 -36 -12 -21 -42 -12 -29 -5 -40 15 -15 24 -21 41 0Z');path(c,'#81a4ac','M-21 -42 L-26 -10 -42 0 H-6Z M-5 -40 L-8 -11 13 0Z')}
 c.restore();
 c.fillStyle=gradient(c,y,H,p[5],p[6]);c.fillRect(0,y,W,H-y);
 coastalWash(c,W,H,r);
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
 for(let j=0;j<5;j++){const x=-46+j*17;line(c,x,3,x+8,2.2,'#f8c18f',.8);dot(c,x+1,6,1,1,'#6c5845')}
 for(let j=0;j<3;j++)line(c,-32+j*8,-21,-29+j*8,-23,'#e1dbab',1.1);
 c.strokeStyle='#d6b78b';c.lineWidth=1.5;for(let j=0;j<3;j++){c.beginPath();c.ellipse(3,-6-j*1.4,7,2,0,0,Math.PI*2);c.stroke()}
 c.save();c.translate(-23,-52);path(c,'#ffe8af','M-2 1 L-2 25 -24 25 Q-11 15 -2 1Z','#6c664e',.8);path(c,'#e69271','M-5 8 L-5 25 -10 25Z');c.restore();
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
function foamWipe(c,seconds){
 if(seconds>.58)return;
 const v=seconds/.58,y=H*(v*1.3-.16);
 c.save();c.globalAlpha=(1-v)*.75;c.fillStyle=gradient(c,y-68,y+14,'#d4ffe000','#eaffde');c.beginPath();c.moveTo(0,y-68);c.lineTo(W,y-68);
 for(let x=W;x>=-6;x-=6)c.lineTo(x,y+8*Math.sin(x*.034+v*5)+4*Math.sin(x*.088));c.closePath();c.fill();c.restore()
}
function drawWhirlpool(c){
 const x=castX*W,y=H*.64,k=Math.min(1.7,W/350);
 c.save();c.translate(x,y);c.scale(k,k*.43);
 for(let i=0;i<6;i++){const v=(age*.78+i/6)%1;c.globalAlpha=(1-v)*.95;c.beginPath();c.ellipse(0,0,9+46*v,9+46*v,0,t*3+i,t*3+i+4.8);c.strokeStyle=i%2?'#d6ffe1':'#81cfdd';c.lineWidth=2.4;c.stroke()}
 c.restore();dot(c,x,y-5,5,7,'#ec845a');dot(c,x,y-10,4,3,'#fff3c9');
 for(let i=0;i<6;i++){const a=i+t*2;dot(c,x+Math.cos(a)*29*k,y+Math.sin(a)*9*k-8,2,2,'#fff2a0')}
}
function drawDial(c){
 const x=W*.5,y=H*.73,r=Math.min(W*.098,H*.104,51);
 c.save();c.translate(x,y);c.lineCap='round';c.lineWidth=9;
 for(const [start,end,color] of [[0,.5,'#7ed8b5'],[.53,.76,'#f7d386'],[.79,1,'#ec8e6b']]){
 c.strokeStyle=color;c.beginPath();c.arc(0,0,r,Math.PI*(1+start),Math.PI*(1+end));c.stroke()}
 const a=Math.PI*(1+progress);line(c,0,0,Math.cos(a)*r,Math.sin(a)*r,'#f9edd8',3);dot(c,0,0,5,5,'#ffce80');
 c.fillStyle='#fff5d9';c.font='bold 13px system-ui';c.textAlign='center';c.fillText(pulls+' / '+pullsNeeded,0,19);c.restore()
}
function drawPursuit(c){
 const water=H*.58,scale=Math.min(W/420,H/560,1.55),x=W*.64,y=water+3*Math.sin(t*5);
 const sharkX=x-W*(.12+.049*lead);
 // Forward scrolling foam and a receding headland give the sprint a direction.
 for(let i=0;i<11;i++){const xx=W-((t*(24+kick*25)+i*83)%(W+70));line(c,xx,y+22+i*H*.016,xx+18+i,y+22+i*H*.016,'#d4f1db62',1.6)}
 c.save();c.translate(sharkX,y+18*scale);c.scale(scale,scale);
 const sway=Math.sin(t*6)*4;
 path(c,'#284e61','M-19 -6 Q-37 -20 -55 '+(-20+sway)+' L-46 0 -58 '+(20+sway)+' Q-39 15 -19 8Z','#1e4855',1.4);
 path(c,'#486f7c','M-32 0 Q-20 -13 -8 -12 L-15 -35 Q0 -31 7 -14 Q29 -14 42 -3 Q33 12 9 13 Q-14 16 -32 3Z','#24495b',1.7);
 path(c,'#b5c5b9','M-21 5 Q5 11 37 0 Q25 15 6 13 Q-12 15 -21 5Z');
 path(c,'#243e4b','M18 3 Q28 8 37 0 Q31 12 20 9Z');dot(c,26,-5,2.3,2,'#f1cf81');c.restore();
 c.save();c.translate(x,y);c.scale(scale,scale);const stroke=Math.sin(t*(5+kick*4));
 path(c,'#d3924f','M-24 1 Q-14 -8 1 -7 L10 0 Q-2 8 -21 6Z');dot(c,8,-8,7,7,'#ce986c');path(c,'#284858','M0 -9 Q2 -22 13 -16 L15 -11 19 -10Z');
 path(c,null,'M-5 0 Q'+(2+stroke*7)+' '+(-9-stroke*8)+' 17 '+(-1-stroke*5),'#e0ad7c',4);
 fishArt(c,byId.get(target),-20,10,.42,t,-1);c.restore();
 for(let i=0;i<9;i++){const v=(t*(1+kick*.6)+i/9)%1;dot(c,x-10*scale-v*42*scale,y+4*scale-Math.sin(v*Math.PI)*10*scale,3*(1-v)+.4,1.8,'#def7df')}
 if(lead<2){c.fillStyle='rgba(177,61,48,'+((2-lead)*.08)+')';c.fillRect(0,0,W,H)}
}
function drawArrival(c){
 const v=Math.min(1,age/1.25),x=W*.52,y=H*(.55-.16*Math.sin(v*Math.PI));
 for(let i=0;i<14;i++){const a=i*Math.PI/7+t*.35,dist=(20+v*72)*Math.min(W/360,1.6);c.save();c.translate(x+Math.cos(a)*dist,y+Math.sin(a)*dist*.65);c.rotate(a);path(c,'#ffe5a3','M0 -4 L1 -1 4 0 1 1 0 4 -1 1 -4 0 -1 -1Z');c.restore()}
 fishArt(c,byId.get(target),x,y,Math.min(W/155,H/275,2.8)*(.8+.2*Math.sin(v*Math.PI)),t);
 if(age<.58)foamWipe(c,age)
}
function reefRelief(c,w,h,region,time){
 const flow=phase==='run'?Math.min(52,(17-shore)*3):Math.sin(time*.3)*3;
 const p=waters[region];c.save();
 // Two reefs recede at different speeds, with small cutouts between the spires.
 for(let layer=0;layer<2;layer++){
  const y=h*(.81+layer*.08),stride=44-layer*9,offset=flow*(layer?.9:.34);
  c.beginPath();c.moveTo(-stride,h);
  for(let i=-2;i<w/stride+4;i++){
   const x=i*stride-offset,n=Math.sin(i*8.74+region+layer),height=(10+Math.abs(n)*26)*(layer?1:.7);
   c.lineTo(x,y-3*n);c.lineTo(x+stride*.23,y-height*.35);c.lineTo(x+stride*.38,y-height);c.lineTo(x+stride*.62,y-height*1.03);c.lineTo(x+stride*.76,y-height*.54)
  }c.lineTo(w+stride,h);c.closePath();c.fillStyle=layer?'#224f5b':p[4];c.globalAlpha=layer?.64:.27;c.fill();c.globalAlpha=1
 }
 const scale=Math.min(w/370,h/540,1.65);
 for(let j=0;j<5;j++){
  c.save();c.translate((j+.17)*w/4-flow*.5,h*(.89+.025*Math.cos(j*10)));c.scale(scale,scale);c.rotate(Math.sin(time*.8+j)*.035);
  const ink=['#bd9176','#87ac95','#ab838e'][(j+region)%3];
  for(let i=-2;i<=2;i++){
   const xx=i*7,yy=-21-(2-Math.abs(i))*6;path(c,null,'M0 0 Q'+xx+' -9 '+xx+' '+yy,ink,3.4);path(c,null,'M'+xx+' '+(yy+7)+' q-7 -2 -8 -9 M'+xx+' '+(yy+13)+' q7 -3 7 -9',ink,2.4)
  }c.restore()
 }
 c.restore()
}
function paintSeed(seed){
 let state=seed>>>0;return ()=>((state=(Math.imul(1664525,state)+1013904223)>>>0)/4294967296);
}
function pigment(c,rand,x,y,rx,ry,color){
 c.beginPath();
 for(let i=0;i<=40;i++){const a=i*Math.PI/20,noise=.91+.09*rand(),px=x+Math.cos(a)*rx*noise,py=y+Math.sin(a)*ry*noise;
  if(i)c.lineTo(px,py);else c.moveTo(px,py)}
 c.closePath();c.fillStyle=color;c.fill()
}
function paintedHeadlands(c,W,h,r,p){
 const rand=paintSeed(572+r*109);
 // Thin overlapping washes leave irregular tide marks where the ridges meet.
 for(let layer=0;layer<4;layer++){
  const points=[];for(let x=-3;x<=W+4;x+=3){
   const u=x/W,peak=Math.abs(Math.sin(u*(3.1+layer*.81)+r*.62+layer*.92));
   const yy=h-(.022+peak**2*(.31-layer*.053))*h+Math.sin(u*47+layer)*2+rand()*2;
   points.push([x,yy])
  }
  c.save();c.beginPath();c.moveTo(-3,h+2);for(const [x,y] of points)c.lineTo(x,y);c.lineTo(W+5,h+2);c.closePath();c.clip();
  c.globalAlpha=.34+layer*.13;c.fillStyle=gradient(c,h*.65,h,layer%2?p[4]:p[3],p[3]);c.fillRect(0,0,W,h+3);
  c.globalAlpha=.095;for(let j=0;j<90;j++)pigment(c,rand,rand()*W,h*(.55+.5*rand()),12+rand()*55,9+rand()*32,j%3?p[4]:'#f3dfac');
  c.globalAlpha=.31;for(let j=0;j<points.length;j+=3){const [x,y]=points[j];line(c,x,y+.7,x+3+rand()*6,y+1.4+rand()*2,p[4],.6)}
  c.restore()
 }
}
function coastalWash(c,W,H,r){
 const rand=paintSeed(1273+411*r),y=H*.47,p=waters[r];c.save();c.globalAlpha=.075;
 for(let i=0;i<120;i++){const depth=rand();pigment(c,rand,rand()*W,y+(H-y)*depth,8+depth*45,1+6*depth,i%3?p[4]:'#f3e1bb')}
 c.globalAlpha=.32;for(let i=0;i<120;i++){const xx=rand()*W,yy=y+rand()**1.6*(H-y);path(c,null,'M'+xx+' '+yy+' q5 -1.2 9 0 t8 0','#edd9a9',.52)}
 c.restore()
}
function grainPlate(seed){
 const paper=document.createElement('canvas');paper.width=180;paper.height=180;const g=paper.getContext('2d'),im=g.createImageData(180,180),rand=paintSeed(seed);
 for(let i=0;i<im.data.length;i+=4){const dark=rand()>.47;im.data[i]=dark?44:254;im.data[i+1]=dark?55:246;im.data[i+2]=dark?51:223;im.data[i+3]=Math.floor(rand()*(dark?22:37))}
 g.putImageData(im,0,0);return paper
}
function watercolorClouds(c,W,h,r){
 const rand=paintSeed(59+r);c.save();
 for(let i=0;i<9;i++){const x=rand()*W,y=(.16+rand()*.53)*h,spread=18+rand()*W*.11;
  c.globalAlpha=.18;for(let j=0;j<5;j++)pigment(c,rand,x+j*spread*.28,y-Math.sin(j*.8)*3,spread*.47,3+rand()*7,'#fff5d9')}
 c.restore()
}
function naturalistFish(c,f,a,b,k,t){
 const s=Math.sin(t*3+f.id),ray=f.form==='shark',whale=['whale','dolphin'].includes(f.form),puffer=f.form==='puffer';
 if(!ray&&!whale&&!puffer)return false;
 const outline=puffer?'M-25 2 C-30 -26 0 -34 21 -24 Q35 -18 36 -5 L40 -1 35 3 Q33 24 10 26 Q-16 32 -25 2Z':whale?'M-34 1 C-17 -4 -14 -18 12 -19 Q35 -22 41 -12 Q47 4 30 12 Q11 19 -8 12 Q-24 3 -34 6Z':'M-34 2 Q-19 -1 -11 -9 L-5 -12 -8 -28 Q1 -24 7 -12 Q24 -13 43 -3 L47 0 Q32 3 27 7 Q14 15 -7 10 L-33 5Z';
 const skin=a;
 if(puffer){path(c,b,'M-21 -3 L-42 -15 Q-36 -3 -42 13 L-21 4Z',k,1.4)}
 else{c.save();c.translate(-32,3);c.rotate(s*.14);path(c,a,whale?'M4 -1 Q-12 -18 -28 -15 Q-23 -5 -12 1 Q-26 5 -30 13 Q-10 15 4 4Z':'M4 -1 Q-13 -7 -21 -23 Q-23 -13 -15 0 L-23 13 Q-9 11 4 4Z',k,1.5);c.restore()}
 path(c,skin,outline,k,2.3);c.save();c.clip(new Path2D(outline));path(c,'#333b5260','M-52 -4 Q-16 13 6 4 L20 2 44 -5 50 32 -52 32Z');
 path(c,'#fff0c79c','M-43 2 Q0 16 50 -2 L51 33 H-42Z');
 if(puffer){for(let i=0;i<28;i++){const x=-23+i*17%56,y=-20+i*13%40;path(c,null,'M'+x+' '+y+' l1 -2 2 2',k,.75)}}
 else if(whale){for(let i=0;i<7;i++)path(c,null,'M'+(13+i*4)+' 2 q0 8 -7 14','#536c70',.8)}
 else for(let i=0;i<3;i++)path(c,null,'M'+(17-i*3)+' -3 q-2 4 0 7',k,1);
 c.restore();path(c,a,puffer?'M1 2 Q-3 12 -12 10 Q-9 4 -6 0Z':'M3 3 Q-2 14 -15 21 Q-11 11 -7 4Z',k,1.1);
 dot(c,puffer?23:29,-6,3.2,3.1,'#f7efd7');dot(c,puffer?24:30,-6,2,2,k);return true
}
function fieldSpecies(c,f,a,b,k,t){
 const name=f.name.toLowerCase();
 const disk=/tang|butterfly|clown/.test(name),needle=/anchovy|minnow|sardine|pike|gar/.test(name);
 const heavy=/grouper|cod|parrot|spikejaw|mossback/.test(name),swift=/salmon|tuna|koi|carp/.test(name);
 if(!(disk||needle||heavy||swift))return false;
 c.save();c.scale(needle?1.23:disk?.88:1,needle?.57:disk?1.16:1);
 const skin=disk&&name.includes('blue')?'#348aaf':name.includes('clown')?'#e68b49':a;
 const body=disk?'M-26 -1 Q-19 -24 0 -24 Q22 -22 29 -9 L34 -4 30 0 Q17 20 -1 22 Q-17 18 -26 4Z':heavy?'M-29 0 Q-11 -19 14 -15 Q27 -16 35 -6 L32 -1 39 0 Q33 11 20 14 Q-4 20 -29 3Z':'M-31 0 Q-10 -13 8 -13 Q23 -13 37 -4 L42 -2 34 2 Q10 16 -7 11 Q-21 6 -31 3Z';
 c.save();c.translate(-25,1);c.rotate(.14*Math.sin(t*3+f.id));path(c,disk?'#ebb956':b,heavy?'M3 -2 Q-13 -13 -19 -8 Q-22 0 -18 10 Q-9 12 3 3Z':'M2 -2 L-22 -16 -15 -1 -23 14 2 3Z',k,1.2);c.restore();
 if(heavy){path(c,skin,'M-19 -9 l2 -9 4 3 3 -6 3 4 4 -6 3 4 4 -3 7 8Z',k,1.2)}else path(c,b,disk?'M-17 -12 Q-9 -29 10 -26 L18 -16Z':'M-9 -8 L1 -22 8 -11Z',k,1.1);
 path(c,skin,body,k,1.45);
 c.save();c.clip(new Path2D(body));path(c,'#34374965','M-40 -4 L-14 5 3 3 9 6 43 -4 43 28 -40 28Z');
 if(disk){for(let i=0;i<3;i++)path(c,null,'M'+(-21+14*i)+' -26 q11 18 0 47',name.includes('clown')?'#fff0cf':'#315565',name.includes('clown')?6:2.5)}
 else if(heavy){for(let i=0;i<18;i++)dot(c,-20+i*19%51,-12+i*7%18,1.5+i%2,.9,k)}
 else{path(c,null,'M-31 1 Q4 -3 33 -2',b,2);for(let i=0;i<5;i++)line(c,-15+i*7,-8,-12+i*7,-5,k,1)}
 c.restore();path(c,skin,'M3 1 Q-4 10 -12 10 Q-8 3 -5 0Z',k,1);
 path(c,null,'M19 -7 Q14 0 19 6',k,.9);dot(c,25,-6,3.2,3.2,'#ffeabf');dot(c,26,-6,1.9,2,k);
 if(name.includes('cod'))path(c,null,'M28 9 q1 7 -2 8',k,1.4);
 c.restore();return true
}

function playfulBay(c,w,h,time){
 const y=h*.47;
 c.save();c.translate(w*.79,y*.62);const rad=Math.min(42,w*.08);for(let i=0;i<4;i++){c.beginPath();c.arc(0,0,rad-i*3,Math.PI,2*Math.PI);c.lineWidth=3;c.strokeStyle=['#fc9984','#ffda74','#95d7b8','#9dbfea'][i];c.stroke()}c.restore();
 if(data.seen.length){c.save();c.translate(w*.12,h*.846);const step=Math.sin(time*5);for(let i=0;i<3;i++){line(c,-4,0,-11-i,-3+i*3+step,'#ad5843',1.5);line(c,4,0,11+i,-3+i*3-step,'#ad5843',1.5)}dot(c,0,0,9,5,'#ff805f');for(const sign of [-1,1]){dot(c,sign*10,-6+sign*step,4,3,'#ff9c65');dot(c,sign*3,-4,1.4,2,'#303f53')}c.restore()}
 if(new Set(data.seen.map(id=>byId.get(id)?.r)).size>=3){c.save();c.translate(w*.59+Math.sin(time*.7)*12,h*.36+Math.sin(time*3)*3);dot(c,0,0,9,6,'#35495e');dot(c,3,1,5,5,'#fff0cf');path(c,'#ff9c61','M7 -2 l7 3 -7 2Z');path(c,'#35495e','M-3 0 q-14 -14 -17 -8 l13 12Z');c.restore()}
 const hop=Math.max(0,buddyUntil-time),jump=hop?Math.abs(Math.sin(hop*6))*22:0;
 c.save();c.translate(w*.78,h*.71+Math.sin(time*2)*2-jump);c.rotate(Math.sin(time*2)*.06);
 dot(c,0,5,20,4,'#216b81');dot(c,0,0,16,9,'#ffa942');dot(c,7,-9,9,10,'#ffd765');path(c,'#ee8050','M14 -10 l9 3 -10 3Z');dot(c,10,-11,1.6,2,'#263f54');dot(c,-4,0,8,4,'#ffe181');path(c,'#315e79','M-1 -16 h16 l-3 -5 -9 1Z');c.restore();
 if(hop){for(let i=0;i<4;i++){const x=w*.78+Math.sin(i*3+hop)*24,yy=h*.71-25-(1.7-hop)*18-i*4;dot(c,x,yy,2,2,'#fff1ab')}}
}
function leviathanHarbor(c,w,h,time){
 const scale=Math.min(w/357,h/545,2.05),water=h*.47;
 c.save();c.translate(w*.51,water+Math.sin(time*.65)*1.5);c.scale(scale,scale);
 // The harbor is built on the back of a sleeping pilot whale.
 const ink='#292622',edge='#47677b',ivory='#fff0bc';
 dot(c,0,6,110,5,'#9ce2c2');dot(c,-4,7,88,3,'#447e83');
 c.save();c.translate(-70,-18);c.rotate(Math.sin(time*.9)*.045);
 path(c,'#589da9','M9 12 Q-11 10 -19 -6 Q-34 -10 -40 -31 Q-23 -30 -15 -19 Q-14 -41 -5 -48 Q2 -32 -3 -16 Q-3 -1 16 2Z',ink,2);path(c,null,'M-33 -26 Q-19 -20 -10 -9 M-5 -38 Q-7 -23 -10 -14','#a0cbb7',1.6);c.restore();
 path(c,'#738c84','M-82 -17 Q-61 -15 -53 -32 Q-37 -57 -2 -54 Q38 -55 65 -39 Q93 -28 98 -11 Q102 -2 91 3 Q66 13 23 11 Q-37 13 -64 3 Q-80 -3 -82 -17Z',ink,2.3);
 path(c,'#f1ce9c','M-20 4 Q15 6 42 -2 Q62 -8 95 -8 Q102 4 77 8 Q35 16 -13 10Z');
 for(let j=0;j<9;j++)path(c,null,'M'+(13+j*8)+' 1 q2 4 -3 8','#ad927d',.8);
 path(c,'#50889b','M-27 -1 Q-33 9 -58 15 Q-51 5 -44 -3Z',ink,1.4);
 for(let j=0;j<24;j++){const x=-48+j*17%100,y=-16-j*11%16;dot(c,x,y,1.8+j%3,1.3,'#9abbb0')}
 const blink=time%4.8>4.35;
 if(blink)path(c,null,'M60 -16 q5 4 10 -1',ink,2);
 else{dot(c,65,-17,7,7,ivory);dot(c,67,-17,4.6,5.2,ink);dot(c,68,-19,1.4,1.4,'#fff8dd')}
 path(c,null,'M72 -6 Q86 -3 94 -8',ink,1.5);dot(c,59,-10,4,1.7,'#eaa592');
 path(c,'#486959','M-47 -36 Q-37 -54 -9 -57 Q19 -61 46 -47 L52 -40 Q9 -48 -25 -39Z',ink,1.4);
 path(c,'#aabc76','M-45 -38 Q-24 -56 2 -54 Q26 -56 47 -44 Q15 -48 -8 -43Z');
 for(const [x,y,k,wall,roof] of [[-29,-46,.76,'#f3c689','#cd675a'],[-15,-51,.85,'#fff1be','#558b95'],[24,-48,.82,'#ffdb97','#cf6554'],[38,-43,.56,'#eed49d','#477c88']]){
 c.save();c.translate(x,y);c.scale(k,k);path(c,wall,'M-8 0 V-12 L0 -19 9 -13 V0Z',ink,1.4);path(c,roof,'M-11 -12 L-1 -22 12 -14 10 -11 -1 -17 -8 -10Z',ink,1.2);c.fillStyle=ink;c.fillRect(-4,-8,3,4);c.fillRect(3,-8,3,8);c.restore()}
 c.save();c.translate(7,-52);path(c,'#ffecb7','M-8 1 L-5 -38 5 -38 9 1Z',ink,1.5);path(c,'#dd6651','M-6 -28 H6 L7 -19 H-7Z');path(c,'#355969','M-7 -38 V-48 H7 V-38Z',ink,1);path(c,'#ffd586','M-4 -40 V-46 H4 V-40Z');path(c,'#dd6e59','M-9 -48 L0 -55 9 -48Z',ink,1);line(c,0,-55,0,-65,ink,1);path(c,'#ffba60','M1 -65 q7 -3 13 0 l-5 2 4 1 -12 1Z');c.restore();
 for(let i=0;i<4;i++){const v=(time*.35+i*.24)%1;c.globalAlpha=(1-v)*.56;dot(c,-14-v*7,-66-v*12,1.5+v*3,1+v*2,'#fff4ce')}c.restore();
}
const cel={ink:'#24283a',paper:'#fff1d0',sun:'#ffc45c',rust:'#df674e',sea:'#76b5ad',deep:'#416b80',mist:'#bac4ae'};
function paintedSet(c,w,h,r){
 const horizon=h*.47,rand=paintSeed(399+r),sky=['#d8c9a9','#d0c6b5','#aaa9a4','#dfbd9d','#c8b7b6','#c1c7b7'][r];
 c.fillStyle=gradient(c,0,horizon,sky,cel.paper);c.fillRect(0,0,w,horizon+1);
 dot(c,w*.72,horizon*.46,Math.min(44,w*.10),Math.min(44,w*.10),'#efd09a');
 for(let j=0;j<7;j++){const x=rand()*w,y=horizon*(.19+rand()*.44),k=.55+rand()*.72;c.save();c.translate(x,y);c.scale(k,k);path(c,'#f2e4c9','M-39 5 Q-45 -1 -29 -2 Q-28 -12 -15 -9 Q-6 -26 6 -13 Q21 -16 24 -5 Q42 -6 46 2 Q23 7 -39 5Z');c.restore()}
 for(let band=0;band<3;band++){const step=w/12;let d='M-10 '+horizon;for(let i=-1;i<14;i++){const x=i*step,y=horizon-(.09+.18*Math.abs(Math.sin(i*.64+r+band*1.7)))*(1-band*.24)*horizon;d+=' Q'+x+' '+(y-13)+' '+(x+step*.5)+' '+y}path(c,['#bfb8a0','#a4aa94','#858f7e'][band],d+' L'+(w+40)+' '+horizon+' H-10Z')}
 // Dry horizontal brush marks stay behind actors.
 c.fillStyle=cel.sea;c.fillRect(0,horizon,w,h-horizon);
 path(c,'#548d91','M0 '+(h*.77)+' Q'+(w*.3)+' '+(h*.72)+' '+(w*.56)+' '+(h*.81)+' T'+w+' '+(h*.79)+' V'+h+' H0Z');
 for(let i=0;i<140;i++){const x=rand()*w,y=horizon+rand()*(h-horizon);line(c,x,y,x+3+rand()*24,y+rand()*1.5,i%4?'#e5d9b829':'#314c4940',.6+rand()*1.4)}
 for(let k=0;k<2;k++){c.save();if(k){c.translate(w,0);c.scale(-1,1)}const span=w*(k?.18:.24);path(c,'#797f6c','M0 '+(horizon-40)+' Q'+span*.4+' '+(horizon-35)+' '+span+' '+horizon+' H0Z');for(let j=0;j<14;j++)tree(c,span*j/15,horizon-2-22*(1-j/15),6+rand()*12,'#646f60');c.restore()}
}
function deckhand(c,x,y,t,cast,beat=cast?age:0){
 c.save();c.translate(x,y);const bounce=Math.sin(t*3.7),wind=cast?Math.sin(Math.min(beat/.48,1)*Math.PI):0;const thrust=cast?Math.sin(Math.max(0,Math.min(1,(beat-.18)/.62))*Math.PI):0;c.rotate(wind*-.24+thrust*.29);
 c.scale(1+.045*bounce+.10*wind,1-.045*bounce-.12*wind);c.lineCap='round';c.lineJoin='round';
 const I=cel.ink;
 path(c,cel.ink,'M-9 -11 L0 -11 -5 1 -18 2 -19 -1 -11 -5Z M1 -12 L8 -13 13 -2 20 -1 19 2 8 2Z');
 path(c,cel.rust,'M-12 -11 L-9 -24 2 -30 13 -22 11 -7 -6 -5Z',I,2.2);
 path(c,'#8b444f','M-10 -16 L-1 -11 10 -16 10 -8 -6 -6 -12 -11Z');
 path(c,cel.paper,'M-12 -39 Q-6 -52 8 -46 L16 -39 14 -36 23 -32 17 -29 15 -23 4 -20 -8 -26Z',I,2.4);
 path(c,'#d59776','M-12 -38 L-4 -32 -5 -28 4 -23 13 -24 4 -21 -7 -25Z');
 path(c,I,'M1 -38 l7 2 -6 2Z M10 -36 l5 -1 -4 3Z');dot(c,7,-33,1.4,1.8,I);
 path(c,null,'M8 -27 l7 -1',I,1.2);
 path(c,cel.sun,'M-17 -40 L-13 -49 0 -55 11 -48 12 -44 23 -42 11 -39 2 -42 -11 -37Z',I,2.3);
 path(c,I,'M-15 -40 L1 -45 12 -44 20 -42 9 -41 1 -42Z');
 path(c,cel.sea,'M-8 -27 L3 -23 -3 -18 -9 -22 -21 -16 -18 -23 -24 -25Z',I,1.6);
 const grip=22+thrust*10-wind*8;
 path(c,cel.rust,'M6 -22 L12 -20 15 -16 '+grip+' -20 l3 4 -13 7 -9 -7Z',I,1.8);
 dot(c,grip+1,-19,3.6,3.1,cel.paper);line(c,grip+1,-19,36+26*thrust-20*wind,-54+12*thrust,I,2);c.restore()
}
function pictureBoat(c,x,y,k,t,cast){
 c.save();c.translate(x,y+Math.sin(t*1.5)*2);c.scale(k,k);c.rotate(.014*Math.sin(t));const I=cel.ink;
 dot(c,-2,12,73,5,'#45675d');path(c,cel.rust,'M-68 -10 Q-19 -3 65 -14 Q56 7 39 13 Q-17 21 -49 11Z',I,2.8);
 path(c,'#974655','M-60 -3 Q-12 12 22 4 L63 -12 Q55 10 39 13 Q-19 20 -49 10Z');
 path(c,cel.paper,'M-61 -5 Q-5 2 59 -10 L55 -5 Q-9 8 -57 0Z',I,1);
 for(let j=0;j<3;j++){dot(c,-33+j*13,5,3.2,3.2,I);dot(c,-33+j*13,4.6,1.6,1.5,cel.sun)}
 path(c,cel.sun,'M-48 -9 L-43 -30 -17 -32 -7 -7Z',I,2);path(c,I,'M-40 -26 h9 v10 h-12Z M-28 -27 h8 l4 10 h-12Z');
 path(c,cel.paper,'M-50 -29 L-46 -34 -18 -37 -12 -32Z',I,2);path(c,cel.rust,'M-39 -34 L-41 -46 -34 -47 -30 -35Z',I,1.6);
 for(let j=0;j<3;j++){const q=(t*.53+j/3)%1;c.globalAlpha=.55*(1-q);dot(c,-38-q*15,-48-q*17,3+4*q,2.4+3*q,cel.paper)}c.globalAlpha=1;
 deckhand(c,22,-8,t,cast);c.restore()
}
function inkBurst(c,x,y,power){
 if(power<=.08)return;c.save();c.translate(x,y);c.globalAlpha=power;
 for(let j=0;j<7;j++){c.rotate(.90);const r=29+(1-power)*17;path(c,j%2?cel.paper:cel.sun,'M'+r+' -1 l'+(9+5*(j%3))+' -5 -4 4 6 -1 -12 5Z',cel.ink,1)}c.restore()
}

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
  path(c,gradient(c,-21,18,a,b),'M-28 -1 C-12 -24 17 -27 33 -9 Q45 -1 37 4 Q24 22 -1 18 Q-17 16 -28 3Z',k,2);
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
 // Whitewashed signal tower and keeper's cottage on the headland.
 c.save();c.translate(W*.16,y-8);c.scale(.8,.8);path(c,'#eee3c6','M-8 0 L-5 -48 6 -48 10 0Z','#41565a',1.5);path(c,'#bd594a','M-6 -28 H7 L8 -18 H-7Z');path(c,'#254654','M-8 -49 H8 V-58 H-8Z');path(c,'#f9cd7e','M-5 -51 H5 V-56 H-5Z');path(c,'#a95742','M-10 -59 L0 -67 10 -59Z');path(c,'#dcc6a0','M11 0 V-14 H39 V0Z');path(c,'#a9563e','M8 -14 L17 -24 36 -23 43 -14Z');c.restore();
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
 const skin=gradient(c,-24,25,a,b);
 if(puffer){path(c,b,'M-21 -3 L-42 -15 Q-36 -3 -42 13 L-21 4Z',k,1.4)}
 else{c.save();c.translate(-32,3);c.rotate(s*.14);path(c,a,whale?'M4 -1 Q-12 -18 -28 -15 Q-23 -5 -12 1 Q-26 5 -30 13 Q-10 15 4 4Z':'M4 -1 Q-13 -7 -21 -23 Q-23 -13 -15 0 L-23 13 Q-9 11 4 4Z',k,1.5);c.restore()}
 path(c,skin,outline,k,1.65);c.save();c.clip(new Path2D(outline));
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
 path(c,gradient(c,-19,19,skin,b),body,k,1.45);
 c.save();c.clip(new Path2D(body));
 if(disk){for(let i=0;i<3;i++)path(c,null,'M'+(-21+14*i)+' -26 q11 18 0 47',name.includes('clown')?'#fff0cf':'#315565',name.includes('clown')?6:2.5)}
 else if(heavy){for(let i=0;i<18;i++)dot(c,-20+i*19%51,-12+i*7%18,1.5+i%2,.9,k)}
 else{path(c,null,'M-31 1 Q4 -3 33 -2',b,2);for(let i=0;i<5;i++)line(c,-15+i*7,-8,-12+i*7,-5,k,1)}
 c.restore();path(c,skin,'M3 1 Q-4 10 -12 10 Q-8 3 -5 0Z',k,1);
 path(c,null,'M19 -7 Q14 0 19 6',k,.9);dot(c,25,-6,3.2,3.2,'#ffeabf');dot(c,26,-6,1.9,2,k);
 if(name.includes('cod'))path(c,null,'M28 9 q1 7 -2 8',k,1.4);
 c.restore();return true
}

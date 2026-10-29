(function(root){'use strict';
const palettes=[['#53eced','#ff6bbd','#ffce70'],['#ffb06c','#e5ed99','#ff6d9e'],['#a499ff','#6debd4','#f1b5ff'],['#fff1b2','#ff9061','#73e5ff']];
class StageArt{
 constructor(canvas){this.c=canvas;this.x=canvas.getContext('2d',{alpha:false});this.fx=[];this.pulses=[0,0,0];this.kicks=0;this.last=0;this.idle=0;this.resize();}
 resize(){let r=this.c.getBoundingClientRect();this.w=Math.max(1,r.width);this.h=Math.max(1,r.height);let d=Math.min(devicePixelRatio||1,1.5);this.c.width=Math.floor(this.w*d);this.c.height=Math.floor(this.h*d);this.x.setTransform(this.c.width/this.w,0,0,this.c.height/this.h,0,0);this.dirty=true;}
 geom(){const w=this.w,h=this.h,short=h<360;return {cx:w/2,lanes:Math.min(w*.86,540),top:Math.max(short?70:120,h*.31),hit:h-(short?90:130),end:h-24};}
 trigger(lane,q=1,combo=0){const a=this.geom(),x=a.cx+(lane-1)*a.lanes/3;this.pulses[lane]=1;this.kicks=1;for(let i=0;i<(q===1?14:8);i++){let angle=(i*2.399+combo*.4),speed=35+(i%5)*22;this.fx.push({x,y:a.hit,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-30,life:.65+i%4*.08,max:.95,lane,size:i%3+1});}if(this.fx.length>150)this.fx.splice(0,this.fx.length-150);}
 poly(points,fill,stroke,width=1){let x=this.x;x.beginPath();for(let i=0;i<points.length;i++)x[i?'lineTo':'moveTo'](...points[i]);x.closePath();if(fill){x.fillStyle=fill;x.fill();}if(stroke){x.strokeStyle=stroke;x.lineWidth=width;x.stroke();}}
 line(points,c,width=1,glow=0){let x=this.x;x.beginPath();for(let i=0;i<points.length;i++)x[i?'lineTo':'moveTo'](...points[i]);x.strokeStyle=c;x.lineWidth=width;if(glow){x.shadowBlur=glow;x.shadowColor=c;}x.stroke();x.shadowBlur=0;}
 ring(cx,cy,r,c,width=1,a=1){let x=this.x;x.globalAlpha=a;x.beginPath();x.arc(cx,cy,r,0,Math.PI*2);x.strokeStyle=c;x.lineWidth=width;x.stroke();x.globalAlpha=1;}
 symbol(cx,cy,size,lane,c,fill=false){let x=this.x;let p=lane===0?[[cx,cy-size],[cx+size,cy+size*.75],[cx-size,cy+size*.75]]:lane===1?[[cx,cy-size],[cx+size,cy],[cx,cy+size],[cx-size,cy]]:null;x.shadowColor=c;x.shadowBlur=9;if(p)this.poly(p,fill?c+'30':'#0d1731',c,1.5);else{this.ring(cx,cy,size,c,1.5);this.ring(cx,cy,size*.45,c,1);}x.shadowBlur=0;}
 robot(cx,cy,s,t,cols,power,reduced){let x=this.x,bob=reduced?0:Math.sin(t*2.2)*2;cy+=bob; x.save();x.translate(cx,cy);x.scale(s,s);
  // Faceted body, articulated forearms and a visor made of discrete light bars.
  this.poly([[-36,39],[0,22],[36,39],[47,76],[0,88],[-47,76]],'#101b39','#697596');
  this.poly([[-36,39],[0,54],[0,88],[-47,76]],'#193c50');this.poly([[0,54],[36,39],[47,76],[0,88]],'#36234c');
  this.line([[-30,42],[-3,57],[-3,78]],cols[0]+'88');this.line([[30,42],[3,57],[3,78]],cols[1]+'88');this.symbol(0,63,9,1,cols[2]);
  let swing=reduced?0:Math.sin(t*5)*power*7;
  for(let side of [-1,1]){let c=side<0?cols[0]:cols[1];this.poly([[side*36,43],[side*55,48],[side*80,66-swing*side],[side*75,78-swing*side],[side*47,63]],'#192c43',c+'77');this.poly([[side*73,67-swing*side],[side*98,70],[side*107,80],[side*85,85],[side*73,78-swing*side]],'#25354c',c);this.line([[side*86,74],[side*97,76]],c);}
  this.poly([[-27,-26],[0,-42],[27,-26],[34,11],[19,32],[-19,32],[-34,11]],'#111a33','#6d91a7',1.2);
  this.poly([[-27,-26],[0,-42],[0,-21],[-25,-9]],'#345f6d');this.poly([[0,-42],[27,-26],[25,-9],[0,-21]],'#554077');
  this.line([[-22,-25],[-2,-35],[19,-24]],cols[0]+'99',1,4);
  this.line([[-28,-10],[0,-23],[28,-10]],cols[0],1,6);this.poly([[-26,-5],[0,-14],[26,-5],[22,12],[0,21],[-22,12]],'#030b19',cols[0]+'99');
  for(let i=-5;i<=5;i++){let height=3+Math.abs(Math.sin(t*4+i*.8))*7;this.line([[i*3.8,-height*.5+3],[i*3.8,height*.5+3]],i<0?cols[0]:cols[1],1.6,3);}
  this.poly([[-13,23],[0,28],[13,23],[0,34]],'#334460');for(let side of [-1,1]){this.poly([[side*28,-17],[side*39,-13],[side*41,8],[side*32,17]],'#172d44',cols[1]);this.line([[side*36,-7],[side*37,6]],cols[2],2);}
  x.restore();
 }
 draw(g,p,dt=0,study=false){if(g?.phase==='ready')this.idle+=dt;let x=this.x,w=this.w,h=this.h,a=this.geom(),t=g?.phase==='ready'?this.idle:g?.t||0,cols=palettes[p.skin||0],d=PR.TRACKS[g?.id||0],beat=t*d.bpm/60,energy=Math.min(1,(g?.combo||0)/16),pulse=(1-(beat%1))**5,short=h<360,reduced=p.reduced;
  if(!reduced){for(let i=0;i<3;i++)this.pulses[i]=Math.max(0,this.pulses[i]-dt*4);this.kicks=Math.max(0,this.kicks-dt*5);for(let f of this.fx){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=100*dt;f.life-=dt;}this.fx=this.fx.filter(f=>f.life>0);}else{this.fx=[];this.pulses=this.pulses.map(v=>Math.max(0,v-dt*6));}
  let bg=x.createLinearGradient(0,0,0,h);bg.addColorStop(0,['#0a1028','#0e112c','#171126'][d.venue]);bg.addColorStop(.55,'#090e26');bg.addColorStop(1,'#060b18');x.fillStyle=bg;x.fillRect(0,0,w,h);
  // Receding architectural arches: hard edges, low-contrast interiors, narrow luminous seams.
  let vx=w/2,vy=h*.34,outer=Math.min(w*.46,510);
  for(let i=5;i>=0;i--){let f=.35+i*.13,ow=outer*f,yy=vy-(short?70:110)*f,base=vy+(short?80:150)*f;
   this.poly([[vx-ow,base],[vx-ow,yy+ow*.17],[vx-ow*.63,yy],[vx+ow*.63,yy],[vx+ow,yy+ow*.17],[vx+ow,base]],null,cols[i%3]+(i===0?'65':'20'),i===0?1.3:.8);
   this.line([[vx-ow,base],[vx,vy+35],[vx+ow,base]],'#30465c55');}
  if(d.venue===1){for(let i=0;i<9;i++){let r=70+i*16;this.ring(vx,vy-20,r,cols[i%3],.7,.05+(i===0?.08:0));}}
  if(d.venue===2){for(let i=0;i<12;i++){let ang=i*Math.PI/6+(reduced?0:t*.025),r1=100,r2=200;this.line([[vx+Math.cos(ang)*r1,vy+Math.sin(ang)*r1*.65],[vx+Math.cos(ang)*r2,vy+Math.sin(ang)*r2*.65]],cols[i%3]+'18');}}
  // Analogue light towers and side galleries.
  for(let side of [-1,1]){let sx=vx+side*Math.min(w*.42,460);this.poly([[sx-22,h*.27],[sx+22,h*.27],[sx+30,h*.73],[sx-30,h*.73]],'#0b1629','#1f3c53');
   for(let row=0;row<12;row++){let lit=(row<3+energy*8||((Math.floor(beat)+row)%5===0));x.fillStyle=lit?cols[row%3]+(row<3?'86':'45'):'#183046';x.fillRect(sx-12,h*.31+row*(h*.032),24,3+Math.sin(row)*1.5);}
   for(let j=0;j<3;j++){let bx=vx+side*(outer*.68+j*outer*.14),by=h*.50+j*12;this.line([[bx,by],[bx+side*25,by+13],[bx+side*25,h*.72]],cols[j]+'22');}}
  // Beams do not cross the judgement line.
  if(!reduced){for(let side of [-1,1]){let bx=vx+side*outer*.8,beamTip=vx+side*80+Math.sin(t*.65+side)*70;x.globalAlpha=.025+energy*.035;this.poly([[bx,h*.61],[beamTip-30,0],[beamTip+30,0]],cols[side<0?0:1]);x.globalAlpha=1;}}
  let floorTop=h*.53;for(let i=-6;i<=6;i++){this.line([[vx+i*17,floorTop],[vx+i*Math.min(130,w*.19),h]],'#25405a45');}for(let j=0;j<8;j++){let f=(j+(reduced?0:beat*.13%1))/8,yy=floorTop+(h-floorTop)*f*f;this.line([[0,yy],[w,yy]],'#253e5925');}
  const robotY=short?h*.30:Math.max(145,h*.255),robotScale=short?.53:Math.min(1.05,w/420,h/570);
  let halo=robotScale*90;for(let k=0;k<3;k++){let rr=halo+k*12;this.poly([[vx,robotY-rr*.75],[vx+rr,robotY],[vx,robotY+rr*.75],[vx-rr,robotY]],null,cols[k]+(energy>.5?'55':'22'),.8);}
  if(!reduced&&energy>.2){let rr=halo*(.8+(beat%4)*.15);this.ring(vx,robotY,rr,cols[Math.floor(beat/4)%3],1,(1-beat%4/4)*energy*.4);}
  this.robot(vx,robotY,robotScale,t,cols,energy,reduced);
  // Two rotating record decks, warm recessed glass and concentric grooves.
  let deckY=robotY+robotScale*85,deckW=robotScale*156;this.poly([[vx-deckW,deckY-2],[vx+deckW,deckY-2],[vx+deckW+25,deckY+28],[vx-deckW-25,deckY+28]],'#11263b','#365c71');
  for(let side of [-1,1]){x.save();x.translate(vx+side*deckW*.62,deckY+8);x.scale(1,.33);for(let k=0;k<4;k++)this.ring(0,0,29-k*5,k===0?cols[side<0?0:1]:'#294059',1.4);this.ring(0,0,4,cols[2],2);let theta=reduced?0:t*1.7;this.line([[0,0],[Math.cos(theta)*26,Math.sin(theta)*26]],cols[side<0?0:1],1.5);x.restore();}
  // Distant prismatic audience: individual stems, heads, reaching arms.
  for(let side of [-1,1])for(let row=0;row<3;row++)for(let j=0;j<6;j++){let xx=vx+side*(a.lanes*.56+j*18+row*5),yy=h*.67+row*24+(j%2)*5;if(xx<6||xx>w-6)continue;let sway=reduced?0:Math.sin(beat*Math.PI+j+row)*Math.min(5,1+energy*4);this.symbol(xx,yy+sway,3+row*.6,j%3,cols[j%3]+'88');this.line([[xx,yy+6+sway],[xx,yy+14],[xx+side*4,yy+19]],'#4a678075');if(energy>.3)this.line([[xx,yy+10],[xx+8,yy+4+sway]],cols[j%3]+'88');}
  // Runway occludes only the body; the head and hands stay readable.
  let laneW=a.lanes/3,vanishW=a.lanes*.22;
  for(let lane=0;lane<3;lane++){let left=a.cx+(lane-1.5)*laneW,right=left+laneW,topL=a.cx+(lane-1.5)*vanishW/3,topR=topL+vanishW/3;
   this.poly([[topL,a.top],[topR,a.top],[right,a.hit+7],[left,a.hit+7]],'#09152b80',cols[lane]+'33');
   let glow=this.pulses[lane];if(glow){let grad=x.createLinearGradient(0,a.hit-120,0,a.hit);grad.addColorStop(0,cols[lane]+'00');grad.addColorStop(1,cols[lane]+Math.floor(glow*60).toString(16).padStart(2,'0'));this.poly([[left,a.hit],[left+25,a.hit-120],[right-25,a.hit-120],[right,a.hit]],grad);}
   for(let j=1;j<=4;j++){let f=j/5,yy=a.top+(a.hit-a.top)*f;let lx=topL+(left-topL)*f,rx=topR+(right-topR)*f;this.line([[lx+3,yy],[rx-3,yy]],cols[lane]+'10');}
   this.line([[left+5,a.hit],[right-5,a.hit]],cols[lane],2,10);this.symbol(left+laneW/2,a.hit,10,lane,cols[lane]);
  }
  let travel=2.4;for(const n of g?.phase==='ready'?[]:g?.notes||[]){if(n.state===2||n.state===3)continue;let rel=(n.at-t)/travel;if(rel>1.1||rel<-.3)continue;let f=1-rel,yy=a.top+(a.hit-a.top)*f,xx=a.cx+(n.lane-1)*(vanishW/3+(laneW-vanishW/3)*f),size=6+Math.max(0,f)*10,c=cols[n.lane];
   if(n.length){let tailF=1-(n.at+n.length-t)/travel,ty=a.top+(a.hit-a.top)*tailF,tx=a.cx+(n.lane-1)*(vanishW/3+(laneW-vanishW/3)*tailF);x.globalAlpha=n.state===1?.9:.55;this.line([[tx,ty],[xx,n.state===1?a.hit:yy]],c,Math.max(4,size*.65),5);x.globalAlpha=1;this.symbol(tx,ty,5,n.lane,c);}
   this.symbol(xx,n.state===1?a.hit:yy,size,n.lane,c,true);if(n.state===1)this.ring(xx,a.hit,21+Math.sin(t*16)*3,c,1.5);
  }
  if(!reduced)for(let f of this.fx){x.globalAlpha=Math.min(1,f.life*2);x.fillStyle=cols[f.lane];x.fillRect(f.x,f.y,f.size*2,f.size);this.line([[f.x,f.y],[f.x-f.vx*.035,f.y-f.vy*.035]],cols[f.lane]+'77',1);}x.globalAlpha=1;
  if(g?.phase==='ready'){for(let lane=0;lane<3;lane++)this.symbol(a.cx+(lane-1)*laneW,a.top+(a.hit-a.top)*.6,15,lane,cols[lane]);}
  // Restrained set markings rather than a layer of textual instructions.
  x.font='8px Arial';x.fillStyle='#537488';x.textAlign='left';x.fillText('STEREO / '+String(d.bpm)+' BPM',15,h-9);x.textAlign='right';x.fillText('PR / 0'+(g?.id+1||1),w-15,h-9);
 }
}
root.StageArt=StageArt;root.PR_PALETTES=palettes;
})(typeof globalThis!=='undefined'?globalThis:window);

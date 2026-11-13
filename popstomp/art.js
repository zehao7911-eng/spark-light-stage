(function(){'use strict';
const M=Popstomp,ink='#292c2a',cream='#f4e6c5',white='#fff6df';
function rng(seed){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return (seed>>>0)/4294967296}}
class Art{
 constructor(canvas){this.c=canvas;this.ctx=canvas.getContext('2d');this.fx=[];this.splats=[];this.boots=[];this.rng=rng(20261030);this.time=0;this.shake=0;this.juice=0;this.makePaper();}
 makePaper(){let c=document.createElement('canvas');c.width=420;c.height=600;let p=c.getContext('2d'),r=rng(405);p.fillStyle='#e8dbbb';p.fillRect(0,0,420,600);for(let i=0;i<18000;i++){let x=r()*420,y=r()*600;p.fillStyle=r()>.5?'#795c3711':'#fff9dd33';p.fillRect(x,y,1+r()*2,.5+r()*1.5)}for(let i=0;i<130;i++){p.strokeStyle='#866b4120';p.lineWidth=.3;p.beginPath();let x=r()*420,y=r()*600;p.moveTo(x,y);p.lineTo(x+20+r()*50,y+r()*4);p.stroke()}this.paper=c;}
 reset(){this.fx=[];this.splats=[];this.boots=[];this.juice=0;this.shake=0;}
 consume(e){
  if(e.type==='stomp'){let duration=e.sweep?.66:.48;this.boots.push({...e,life:duration,max:duration});this.shake=e.charged?4:2;}
  if(e.type==='pop'){
   const col=M.palette[e.kind];this.splats.push({x:e.x,y:e.y,r:15+this.rng()*10,col,rot:this.rng()*6});if(this.splats.length>70)this.splats.shift();
   for(let i=0;i<9;i++){let a=this.rng()*6.28,v=30+this.rng()*80;this.fx.push({x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-60,life:.55+this.rng()*.25,max:.8,r:1.8+this.rng()*2.8,col,kind:'drop'});}
   this.fx.push({x:e.x,y:e.y,vx:0,vy:0,life:.7,max:.7,col,kind:'juice',sx:e.x,sy:e.y});
   if(e.cap)this.fx.push({x:e.x,y:e.y,vx:(190-e.x)*.35,vy:-90,life:1,max:1,col:'#e4b34e',kind:'cap'});
   if(e.chain>=4)this.fx.push({x:e.x,y:e.y-20,vx:0,vy:-35,life:.7,max:.7,col:cream,kind:'text',text:'×'+e.chain});
  }
  if(e.type==='crack')for(let i=0;i<9;i++)this.fx.push({x:e.x,y:e.y,vx:(this.rng()-.5)*150,vy:-30-this.rng()*80,life:.65,max:.65,r:3+this.rng()*3,col:'#b4dce1',kind:'ice'});
  if(e.type==='spark')this.fx.push({x:e.x,y:e.y,vx:0,vy:0,life:.48,max:.48,col:'#f5d471',kind:'ring'});
  if(e.type==='win')for(let i=0;i<70;i++)this.fx.push({x:this.rng()*420,y:180+this.rng()*80,vx:(this.rng()-.5)*170,vy:-120-this.rng()*100,life:1.4+this.rng(),max:2.4,r:2+this.rng()*3,col:[cream,'#d9584e','#e4b34e','#7ca69b'][i%4],kind:'confetti'});
  if(this.fx.length>240)this.fx.splice(0,this.fx.length-240);
 }
 update(dt){this.time+=dt;this.shake=Math.max(0,this.shake-dt*15);for(const b of this.boots)b.life-=dt;this.boots=this.boots.filter(b=>b.life>0);for(const p of this.fx){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.kind!=='text'&&p.kind!=='juice'&&p.kind!=='ring')p.vy+=190*dt;}this.fx=this.fx.filter(p=>p.life>0);}
 draw(s,p,aim,paused=false){
  const c=this.ctx;c.setTransform(this.c.width/420,0,0,this.c.height/600,0,0);c.clearRect(0,0,420,600);c.lineCap='round';c.lineJoin='round';c.drawImage(this.paper,0,0);
  const act=Math.floor(s.level/4),theme=act===0?['#75574a','#ab5143','#3f6c62']:act===1?['#72634d','#526e6e','#a37444']:['#59515d','#655774','#a16c60'];
  this.stage(theme,s,p);
  c.save();if(!p.gentle&&this.shake)c.translate(Math.sin(this.time*80)*this.shake,Math.cos(this.time*73)*this.shake*.5);
  this.host(205,182,s,p);
  this.bottle(359,230,Math.min(1,(this.juice+=(s.juice/s.fruits.length-this.juice)*.12)),s.level,.8);
  this.tray(theme,s);
  c.save();this.round(36,286,348,239,58);c.clip();
  for(const q of this.splats){c.save();c.translate(q.x,q.y);c.rotate(q.rot);c.globalAlpha=.24;this.blob(0,0,q.r,q.col);c.restore();}
  for(const f of s.fruits){if(f.dead)continue;this.fruit(f,s.time);}
  if(aim&&s.phase==='play'){
  c.save();c.setLineDash([5,6]);c.lineWidth=2;c.strokeStyle=cream;c.fillStyle='#f4e6c520';
   if(aim.mode==='sweep'&&s.sweepUnlocked){this.round(38,aim.y-32,344,64,20);c.fill();c.stroke();}
   else{let r=aim.power>=.55&&s.chargeUnlocked&&s.stamps>=2?78:38;c.beginPath();c.ellipse(aim.x,aim.y,r,r/1.05,0,0,6.28);c.fill();c.stroke();}
   c.restore();
  }
  c.restore();
  this.frontRim(theme);
  // Hoses pass behind the shoes; each visible shoe has a matching timed impact.
  for(const b of this.boots)this.boot(b,p.gentle);
  for(const q of this.fx)this.particle(q);
  c.restore();
  c.save();c.globalAlpha=.14;c.drawImage(this.paper,0,0);c.restore();
  c.strokeStyle=ink;c.lineWidth=3;this.round(3,3,414,594,8);c.stroke();
 }
 round(x,y,w,h,r){const c=this.ctx;r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
 shape(path,fill,stroke=ink,width=2){let c=this.ctx;c.beginPath();path(c);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke()}}
 ellipse(x,y,rx,ry,col,stroke=ink,lw=2){this.shape(c=>c.ellipse(x,y,rx,ry,0,0,Math.PI*2),col,stroke,lw)}
 line(points,col=ink,lw=2){let c=this.ctx;c.beginPath();c.moveTo(...points[0]);for(let i=1;i<points.length;i++)c.lineTo(...points[i]);c.strokeStyle=col;c.lineWidth=lw;c.stroke();}
 text(t,x,y,size=12,col=ink,font='Georgia',align='center'){let c=this.ctx;c.fillStyle=col;c.font=`bold ${size}px ${font}`;c.textAlign=align;c.fillText(t,x,y)}
 stage(theme,s,p){const c=this.ctx,t=this.time;
  c.fillStyle=theme[0]+'32';c.fillRect(0,0,420,285);
  // Painted theatre wall: stencilled diamonds, fine panel mouldings, and distant soda stills.
  for(let x=10;x<420;x+=40)for(let y=28;y<240;y+=52){c.save();c.translate(x,y);c.rotate(Math.PI/4);c.fillStyle='#533b2d10';c.fillRect(-3,-3,6,6);c.restore();}
  this.round(80,33,260,207,14);c.strokeStyle='#816b4c55';c.lineWidth=3;c.stroke();this.round(87,40,246,194,8);c.lineWidth=1;c.stroke();
  this.ellipse(206,111,91,65,'#e9d6ab','#816b4c55',2);
  this.text(['THE CHERRY CLUB','THE GOLDEN MATINEE','THE VELVET FINALE'][Math.floor(s.level/4)],207,66,10,theme[1],'Arial');
  this.text('BUBBLES',207,94,24,theme[1]);this.text('& BIG SHOES',207,110,9,theme[0],'Arial');
  // Hand-painted soda stills and pennants add a second plane behind the host.
  for(const side of [-1,1]){c.save();c.translate(210+side*96,205);c.scale(side,1);
   this.round(-12,-55,25,66,9);c.fillStyle='#c3a067';c.fill();c.strokeStyle='#5b5140';c.lineWidth=2;c.stroke();this.ellipse(0,-55,12,6,'#dac299','#5b5140',1.5);
   this.line([[-15,-14],[15,-14]],'#66553e',3);this.ellipse(0,-29,8,8,'#dfcc98','#5b5140',1.5);this.line([[0,-29],[3,-34]],'#5b5140',1.5);
   this.shape(q=>{q.moveTo(10,-49);q.bezierCurveTo(30,-51,15,-80,30,-81);q.bezierCurveTo(42,-81,38,-66,43,-64)},null,'#8d7956',5);
   for(let k=0;k<3;k++){let a=(t*.55+k*.34)%1;this.ellipse(34+Math.sin(t+k)*3,-88-a*35,3+a*4,4+a*3,'#f1e3c266',null);}
   this.line([[-15,12],[18,12]],ink,3);c.restore();}
  // Stage side curtains, scallops and ropes — painterly backdrop, crisp actors.
  for(const side of [-1,1]){c.save();c.translate(side<0?0:420,0);c.scale(-side,1);
   this.shape(q=>{q.moveTo(0,0);q.lineTo(82,0);q.bezierCurveTo(77,58,55,112,45,154);q.bezierCurveTo(42,181,52,226,37,269);q.lineTo(0,281);q.closePath()},theme[1],ink,3);
   for(let i=0;i<4;i++){c.beginPath();c.moveTo(11+i*17,3);c.bezierCurveTo(24+i*6,78,20+i*6,143,9+i*8,220);c.strokeStyle=i%2?'#fff3ca1b':'#292c2a36';c.lineWidth=7;c.stroke();}
   this.ellipse(40,177,15,7,'#d1a15b');this.line([[43,183],[57,216],[54,236]],'#9e7547',4);this.ellipse(54,236,5,9,'#c7954e');c.restore();}
  this.shape(q=>{q.moveTo(0,0);q.lineTo(420,0);q.lineTo(420,18);for(let x=420;x>=0;x-=60)q.quadraticCurveTo(x-30,45,x-60,18);q.closePath()},theme[1],ink,3);
  for(let x=30;x<420;x+=45)this.ellipse(x,22,3.5,4,'#f6d486',null);
  // Left stage assistant: a little accordion speaker with bouncing bellows.
  c.save();c.translate(58,215);c.rotate(Math.sin(t*1.7)*.025);this.round(-29,-37,58,68,8);c.fillStyle=theme[2];c.fill();c.strokeStyle=ink;c.lineWidth=3;c.stroke();
  this.ellipse(0,-8,20,22,'#e7c78e');for(let i=-12;i<=12;i+=6)this.line([[i,-23],[i,7]],'#806748',1);
  this.ellipse(-7,-10,3,5,ink,null);this.ellipse(7,-10,3,5,ink,null);this.shape(q=>{q.moveTo(-6,2);q.quadraticCurveTo(0,8,7,2)},null,ink,2);this.text('POP',0,22,8,cream,'Arial');c.restore();
  // Floor boards converge toward the back of the tiny stage.
  c.fillStyle='#b08a5c';c.fillRect(0,260,420,340);for(let i=-7;i<12;i++)this.line([[210+i*27,260],[210+i*54,600]],'#634d3780',1.5);
  for(let y=281;y<600;y+=45){this.line([[0,y],[420,y]],'#674c3545',1);for(let x=10;x<420;x+=67)this.line([[x,y+10],[x+22,y+13]],'#e6bf8126',1);}
  c.fillStyle='#eee1bf';c.fillRect(8,572,404,23);this.line([[8,572],[412,572]],ink,2);this.text(s.chargeUnlocked?'HOLD FOR A BIG STOMP':'TAP A BUNCH • MAKE A SPLASH',210,588,9,theme[0],'Arial');
  // Curly glass transfer pipe connects the barrel to the visible bottle.
  c.beginPath();c.moveTo(378,428);c.bezierCurveTo(417,430,407,310,391,289);c.bezierCurveTo(382,276,373,273,359,263);c.strokeStyle=ink;c.lineWidth=14;c.stroke();c.strokeStyle='#e2d3ae';c.lineWidth=9;c.stroke();c.strokeStyle='#fff6da99';c.lineWidth=2;c.stroke();
 }
 tray(theme,s){const c=this.ctx;
  this.ellipse(210,545,180,27,'#292c2a38',null);
  this.round(26,326,368,234,61);c.fillStyle='#93704e';c.fill();c.strokeStyle=ink;c.lineWidth=4;c.stroke();
  for(let x=55;x<390;x+=31){this.line([[x,443],[x+4,546]],'#4c3c2f',2);this.line([[x+10,454],[x+13,532]],'#d1a26988',1);}
  this.round(26,278,368,258,62);c.fillStyle='#d4b482';c.fill();c.strokeStyle=ink;c.lineWidth=4;c.stroke();
  this.round(34,287,352,238,55);c.fillStyle='#745445';c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();
  this.round(42,294,336,225,49);c.fillStyle=theme[0];c.fill();c.strokeStyle='#e4c58a';c.lineWidth=2;c.stroke();
  for(let y=318;y<520;y+=27)this.line([[50,y],[370,y]],'#382d2635',1);
  // The rim is laid behind fruit first, then a foreground lip is drawn after it.
  this.text('SMALL BATCH · BIG FEELING',210,281,8,'#533d2e','Arial');
 }
 frontRim(theme){const c=this.ctx;this.shape(q=>{q.moveTo(28,494);q.bezierCurveTo(35,551,72,562,118,563);q.lineTo(305,563);q.bezierCurveTo(355,562,388,548,392,494);q.bezierCurveTo(377,526,351,536,305,538);q.lineTo(117,538);q.bezierCurveTo(74,538,43,525,28,494);q.closePath()},'#b58b59',ink,3);
  this.line([[75,540],[75,554]],'#604b34',1.5);this.line([[338,539],[338,553]],'#604b34',1.5);
  this.round(143,538,134,23,4);c.fillStyle=cream;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();this.text('POPSTOMP & CO.',210,553,10,theme[0]);
  for(let x of [95,326])this.ellipse(x,546,3,3,'#e4bd70',ink,1);
 }
 fruit(f,time){const c=this.ctx,hot=f.hit/.35;let bob=Math.sin(time*2.3+f.id*3)*.8;
  c.save();c.translate(f.x,f.y+bob);let sx=1+hot*.2,sy=1-hot*.17;c.scale(sx,sy);
  this.ellipse(0,8,15,8,'#25221f44',null);
  let col=M.palette[f.type];
  if(f.type===0){this.ellipse(-6,0,11,12,col,ink,1.8);this.ellipse(7,2,11,12,col,ink,1.8);this.shape(q=>{q.moveTo(-5,-10);q.quadraticCurveTo(-2,-24,7,-24);q.quadraticCurveTo(13,-18,8,-9)},null,ink,2);this.ellipse(-7,-4,3,2,'#f59a7d',null);}
  else if(f.type===1){c.rotate(-.35);this.shape(q=>{q.moveTo(-20,0);q.bezierCurveTo(-13,-5,-11,-15,0,-14);q.bezierCurveTo(12,-14,13,-6,20,0);q.bezierCurveTo(12,6,11,14,0,14);q.bezierCurveTo(-12,14,-13,5,-20,0)},col,ink,1.8);this.line([[-6,-8],[4,-10]],'#f8e7a6',2);}
  else if(f.type===2){this.shape(q=>{q.moveTo(0,-13);q.bezierCurveTo(-22,-22,-25,8,-10,15);q.bezierCurveTo(-2,19,7,17,15,9);q.bezierCurveTo(25,-8,12,-21,0,-13)},col,ink,1.8);this.shape(q=>{q.moveTo(0,-12);q.quadraticCurveTo(7,0,0,11)},null,'#9f574c',1);this.shape(q=>{q.moveTo(0,-14);q.quadraticCurveTo(3,-28,15,-22);q.quadraticCurveTo(13,-14,0,-14)},'#618174',ink,1.3);}
  else{for(let j=0;j<3;j++)for(let i=0;i<3;i++)this.ellipse((i-1)*9+(j%2?3:0),(j-1)*8,6.7,6.7,col,ink,1.2);this.line([[-2,-15],[1,-24]],'#61776a',3);}
  // Tiny pie-cut eyes, different expressive eyebrows, and hand-inked smiles.
  c.save();c.translate(0,2);for(let x of [-5,6]){this.ellipse(x,-1,2.6,3.7,ink,null);this.shape(q=>{q.moveTo(x,-1);q.lineTo(x+3,-2);q.lineTo(x+3,1)},col,null);}this.shape(q=>{q.moveTo(-3,6);q.quadraticCurveTo(1,9,5,5)},null,ink,1.2);c.restore();
  if(f.spark){this.ellipse(0,-25,6,5,'#f2cb66',ink,1.4);this.line([[0,-34],[0,-38]],'#f2cb66',2);this.line([[-9,-29],[-12,-32]],'#f2cb66',2);this.line([[9,-29],[12,-32]],'#f2cb66',2);}
  if(f.cap){this.ellipse(13,11,6,6,'#e1b256',ink,1.3);this.text('✦',13,14,8,cream);}
  if(f.hp===2){this.shape(q=>{q.moveTo(-22,-7);q.lineTo(-10,-23);q.lineTo(10,-23);q.lineTo(23,-6);q.lineTo(20,13);q.lineTo(7,22);q.lineTo(-14,17);q.closePath()},'#caedf45c','#c2e0dc',2);this.line([[-16,-5],[-6,-17],[4,-16]],white,2);this.line([[11,-9],[16,2],[10,13]],'#e7fcf0',1.5);}
  c.restore();
 }
 host(x,y,s,p){const c=this.ctx,t=this.time,beat=Math.sin(t*3),act=this.boots[0],bop=act?Math.sin((1-act.life/act.max)*Math.PI):0,fill=p.colour==='lemon'?'#dbb451':p.colour==='velvet'?'#776486':'#b95345';
  c.save();c.translate(x,y-4*bop);c.rotate(beat*.025);this.ellipse(0,70,38,8,'#292c2a25',null);
  // Limber rubber-hose legs and comically oversized shoes.
  for(let side of [-1,1]){this.shape(q=>{q.moveTo(side*16,33);q.bezierCurveTo(side*25+beat*4,53,side*15,55,side*25,66)},null,ink,9);this.ellipse(side*29,67,22,10,cream,ink,3);this.line([[side*45,72],[side*11,72]],ink,3);}
  // A siphon-shaped, original show host with enamel panels and brass fixtures.
  this.round(-31,-25,62,73,22);c.fillStyle=fill;c.fill();c.strokeStyle=ink;c.lineWidth=3;c.stroke();
  this.round(-24,-13,48,45,13);c.fillStyle=cream;c.fill();c.strokeStyle=ink;c.lineWidth=2;c.stroke();this.text('PS',0,16,16,fill);
  this.ellipse(0,-29,32,29,cream,ink,3);
  let blink=(t%4.3)>4.12;
  for(let side of [-1,1]){this.ellipse(side*11,-33,8,12,white,ink,1.6);if(blink)this.line([[side*11-5,-32],[side*11+4,-32]],ink,2);else{this.ellipse(side*11+1,-32,4,7,ink,null);this.shape(q=>{q.moveTo(side*11+1,-33);q.lineTo(side*11+6,-36);q.lineTo(side*11+6,-30)},white,null);}}
  this.shape(q=>{q.moveTo(-14,-11);q.quadraticCurveTo(0,5+bop*8,16,-14);q.quadraticCurveTo(1,-8,-14,-11)},ink,ink,1);this.ellipse(1,-8,7,3,'#d77b6b',null);
  this.ellipse(-23,-21,5,2,'#cf8c70',null);this.ellipse(23,-21,5,2,'#cf8c70',null);
  // Bottle cap hat with a curved soda spout rather than a borrowed cup silhouette.
  this.shape(q=>{q.moveTo(-25,-49);q.lineTo(-19,-61);q.lineTo(-11,-58);q.lineTo(-5,-65);q.lineTo(4,-59);q.lineTo(13,-64);q.lineTo(24,-52);q.lineTo(25,-46);q.lineTo(-25,-46);q.closePath()},'#d8ae64',ink,2.5);
  this.shape(q=>{q.moveTo(24,-48);q.bezierCurveTo(38,-48,47,-60,48,-70);q.lineTo(39,-72);q.quadraticCurveTo(34,-56,23,-56);q.closePath()},cream,ink,2.5);
  // Bow tie, raised gloves, open palms and subtle finger creases.
  for(let side of [-1,1]){this.shape(q=>{q.moveTo(side*30,-2);q.bezierCurveTo(side*54,-1,side*48,-29+beat*4,side*58,-31+beat*4)},null,ink,6);c.save();c.translate(side*61,-33+beat*4);c.rotate(side*.2);this.ellipse(0,0,11,12,cream,ink,2);for(let k=-1;k<=1;k++)this.line([[k*4,-7],[k*4+1,-1]],'#7d7564',1);c.restore();
   this.shape(q=>{q.moveTo(0,-3);q.lineTo(side*12,-8);q.lineTo(side*13,3);q.closePath()},'#467971',ink,1.6);}
  this.ellipse(0,-2,3.5,3.5,'#ddb760',ink,1);c.restore();
 }
 boot(b,gentle){const c=this.ctx,elapsed=b.max-b.life,u=elapsed/b.max;let lift=b.sweep?.56:.30,fall=elapsed<.12?1-elapsed/.12:elapsed>lift?(elapsed-lift)/(b.max-lift):0;let x=b.x,y=b.y-fall*100,scale=b.charged?1.5:1;
  if(b.sweep)x=Math.max(38,Math.min(382,(b.max-b.life-.12)*900));
  c.save();c.globalAlpha=Math.min(1,b.life*8);this.ellipse(x,b.y+7,25*scale,12*scale,'#292c2a38',null);
  this.shape(q=>{q.moveTo(206,222);q.bezierCurveTo(193,239,x+25,y-40,x,y-10)},null,ink,10*scale);
  c.translate(x,y);c.scale(scale,scale);c.rotate(-.13);this.shape(q=>{q.moveTo(-9,-24);q.lineTo(12,-24);q.lineTo(13,-2);q.bezierCurveTo(27,-4,36,2,33,12);q.bezierCurveTo(16,19,-8,17,-18,11);q.quadraticCurveTo(-22,2,-10,-5);q.closePath()},cream,ink,3);
  this.line([[-16,12],[32,12]],ink,3);this.line([[3,-4],[12,-6]],'#998465',2);this.line([[4,-12],[12,-13]],'#998465',2);c.restore();
  if(b.sweep){c.save();c.strokeStyle=cream;c.lineWidth=4;c.setLineDash([12,7]);c.beginPath();c.moveTo(40,b.y);c.lineTo(380,b.y);c.stroke();c.restore();}
 }
 blob(x,y,r,col){this.shape(c=>{for(let i=0;i<=16;i++){let a=i/16*6.28,k=i%2?.6:1;let px=x+Math.cos(a)*r*k,py=y+Math.sin(a)*r*k;if(i)c.lineTo(px,py);else c.moveTo(px,py)}c.closePath()},col,null);}
 bottle(x,y,fill,index,scale=1){let c=this.ctx;c.save();c.translate(x,y);c.scale(scale,scale);
  this.shape(q=>{q.moveTo(-10,-83);q.lineTo(10,-83);q.lineTo(10,-55);q.bezierCurveTo(10,-45,24,-43,24,-30);q.lineTo(24,28);q.quadraticCurveTo(24,36,14,36);q.lineTo(-14,36);q.quadraticCurveTo(-24,36,-24,28);q.lineTo(-24,-30);q.bezierCurveTo(-24,-43,-10,-45,-10,-55);q.closePath()},'#f2e4bd',ink,3);
  c.save();this.round(-20,-37,40,69,10);c.clip();c.fillStyle=M.palette[Math.floor(index/3)%4];let yv=32-fill*68;c.beginPath();c.moveTo(-22,34);c.lineTo(-22,yv);c.quadraticCurveTo(0,yv+Math.sin(this.time*4)*3,22,yv);c.lineTo(22,34);c.fill();for(let k=0;k<6;k++){let by=33-((this.time*17+k*13)%67);if(by>yv)this.ellipse(Math.sin(k*4)*13,by,1.5,2,'#f4e6c570',null);}c.restore();
  this.round(-22,-24,44,42,3);c.fillStyle=cream;c.fill();c.strokeStyle=ink;c.lineWidth=1.5;c.stroke();this.ellipse(0,-10,12,10,M.palette[Math.floor(index/3)%4],ink,1);this.text('✦',0,-6,13,cream);this.text(String(index+1).padStart(2,'0'),0,10,12,ink);
  this.line([[-15,-37],[-15,-28]],white,3);this.line([[-16,21],[-16,26]],white,3);c.fillStyle='#b7784d';c.fillRect(-12,-88,24,9);c.strokeStyle=ink;c.lineWidth=2;c.strokeRect(-12,-88,24,9);for(let k=-8;k<12;k+=5)this.line([[k,-86],[k,-81]],'#edc682',1);c.restore();
 }
 particle(p){const c=this.ctx;let age=1-p.life/p.max;c.save();c.globalAlpha=Math.min(1,p.life*4);
  if(p.kind==='juice'){let u=Math.min(1,age),x=p.sx+(359-p.sx)*u,y=p.sy+(215-p.sy)*u-Math.sin(u*Math.PI)*90;this.ellipse(x,y,3.5*(1-u*.5),5*(1-u*.5),p.col,null);}
  else if(p.kind==='ring'){c.strokeStyle=p.col;c.lineWidth=4*(1-age);c.beginPath();c.ellipse(p.x,p.y,age*92,age*80,0,0,6.28);c.stroke();}
  else if(p.kind==='text'){this.text(p.text,p.x,p.y,23,cream);}
  else if(p.kind==='ice'||p.kind==='confetti'){c.translate(p.x,p.y);c.rotate(age*9+p.x);c.fillStyle=p.col;c.fillRect(-p.r,-p.r,p.r*2,p.r*1.4);if(p.kind==='ice'){c.strokeStyle=cream;c.lineWidth=1;c.strokeRect(-p.r,-p.r,p.r*2,p.r*1.4);}}
  else if(p.kind==='cap'){this.ellipse(p.x,p.y,7,7,p.col,ink,1.5);this.text('✦',p.x,p.y+3,9,cream);}
  else this.ellipse(p.x,p.y,p.r,p.r*1.4,p.col,null);c.restore();
 }
}
window.PopArt=Art;
})();

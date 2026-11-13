window.ChimeArt=function(c){
 const P=[['#e6d7bb','#d0baa0','#f4e8cf','#b89a74','#84705d','#c38d62'],['#d8c8bd','#c8a995','#efe1d0','#b18766','#775d58','#bfa06b'],['#c7d4cf','#a5b9b4','#e2e7d7','#8ca6a0','#5c7c7b','#c69567'],['#c8c1d7','#a9a5c2','#dfd9e8','#918fae','#666b8d','#c4a274']];
 let back=null,level=-1;const PI=Math.PI;function el(x,y,rx,ry,col){c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,PI*2);c.fill()}function box(x,y,w,h,r,col){c.fillStyle=col;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()}function line(x,y,a,b,col,w=2){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.lineTo(a,b);c.stroke()}
 function star(x,y,r,col,rot=0){c.save();c.translate(x,y);c.rotate(rot);c.fillStyle=col;c.beginPath();for(let i=0;i<10;i++){let a=i*PI/5-PI/2,d=i%2?r*.44:r;c.lineTo(Math.cos(a)*d,Math.sin(a)*d)}c.closePath();c.fill();c.restore()}
 function bolt(x,y,col){el(x,y,4,4,col);line(x-2,y+1,x+2,y-1,'#ffffff60',1)}
 function arch(x,y,w,h,col){c.fillStyle=col;c.beginPath();c.moveTo(x,y+h);c.lineTo(x,y+w/2);c.arc(x+w/2,y+w/2,w/2,PI,0);c.lineTo(x+w,y+h);c.closePath();c.fill()}
 function cache(s){const a=document.createElement('canvas');a.width=720;a.height=900;const b=a.getContext('2d'),p=P[Chime.stages[s.level].palette];
 const bg=b.createLinearGradient(0,0,0,900);bg.addColorStop(0,p[2]);bg.addColorStop(1,p[1]);b.fillStyle=bg;b.fillRect(0,0,720,900);
 for(let i=0;i<700;i++){b.fillStyle=i%3?'#fffaf515':'#5c535007';b.fillRect(i*137.7%720,i*83.3%900,2,2)}
 b.fillStyle='#614c3d25';b.beginPath();b.roundRect(41,125,638,716,38);b.fill();b.fillStyle=p[3];b.beginPath();b.roundRect(38,107,644,718,38);b.fill();b.fillStyle=p[2];b.beginPath();b.roundRect(44,109,632,704,34);b.fill();b.fillStyle=p[0];b.beginPath();b.roundRect(57,123,606,679,28);b.fill();b.strokeStyle='#fff9ed88';b.lineWidth=2;b.stroke();
 b.fillStyle=p[1];b.beginPath();b.roundRect(72,137,576,650,21);b.fill();const g=b.createRadialGradient(290,300,20,360,470,400);g.addColorStop(0,'#fff7e77a');g.addColorStop(1,'#fff7e700');b.fillStyle=g;b.fillRect(72,137,576,650);
 b.strokeStyle='#ffffff20';b.lineWidth=1;for(let y=154;y<780;y+=24){b.beginPath();b.moveTo(78,y);b.lineTo(642,y);b.stroke()}
 for(let y=155;y<780;y+=24)for(let x=88;x<640;x+=24){b.fillStyle='#74695e0c';b.beginPath();b.arc(x,y,1,0,7);b.fill()}
 // Guilloche corners and repeated engraved border ticks.
 for(let i=0;i<22;i++){b.strokeStyle='#a28b692f';b.beginPath();b.moveTo(90+i*25,129);b.lineTo(90+i*25,134);b.stroke();b.beginPath();b.moveTo(90+i*25,791);b.lineTo(90+i*25,797);b.stroke()}
 b.strokeStyle='#a68e6944';for(const[x,y]of[[92,157],[628,157],[92,767],[628,767]]){for(let r=6;r<=18;r+=6){b.beginPath();b.arc(x,y,r,0,7);b.stroke()}}
 back=a;level=s.level;
 }
 function cloud(x,y,r,col){el(x-r*.7,y,r*.65,r*.4,col);el(x,y-r*.17,r*.7,r*.5,col);el(x+r*.7,y,r*.7,r*.4,col);box(x-r*.8,y,r*1.6,r*.3,5,col)}
 function lantern(s,i){const b=s.bells[i],pos=Chime.bellPos(s,i),on=!b.left,flash=b.flash,p=P[Chime.stages[s.level].palette];c.save();c.translate(pos.x,pos.y);c.rotate(Math.sin(s.t*8+i)*flash*.22);if(on||flash>0){const g=c.createRadialGradient(0,0,2,0,0,66);g.addColorStop(0,flash?'#fff9c6aa':'#ffe4a35c');g.addColorStop(1,'#ffe4a300');c.fillStyle=g;c.fillRect(-66,-66,132,132)}
 el(3,16,27,12,'#56453620');line(0,-47,0,-32,p[4],1.3);el(0,-34,5,6,'#927752');el(0,-34,2,3,p[1]);
 const g=c.createLinearGradient(-26,0,26,0);g.addColorStop(0,on?'#ae7943':'#a58b6a');g.addColorStop(.25,on?'#edc176':'#d5bc96');g.addColorStop(.5,on?'#fff0b2':'#e4ceaa');g.addColorStop(.8,on?'#d6a359':'#bea17b');g.addColorStop(1,'#927451');c.fillStyle=g;c.beginPath();c.moveTo(-26,14);c.bezierCurveTo(-18,5,-24,-28,0,-29);c.bezierCurveTo(24,-28,18,5,26,14);c.quadraticCurveTo(0,25,-26,14);c.fill();line(-13,-15,-17,6,'#fff4ce80',3);el(0,15,26,7,on?'#b38047':'#8e7759');el(0,13,24,5,on?'#f9db95':'#d7bb8d');el(0,16,6,6,on?'#fff3c2':'#a58d66');
 if(b.left===2){el(0,-5,6,6,'#9c7f57');el(0,-5,3,3,'#d5bea2')}else if(b.left===1&&Chime.stages[s.level].bells[i][2]===2){star(0,-5,7,'#fff1b8')}
 if(on)star(0,-4,8,'#fff7d2');c.restore();
 }
 function post(x,y,r,t){el(x+4,y+10,r+1,r*.75,'#5f504b25');const g=c.createLinearGradient(x-r,0,x+r,0);g.addColorStop(0,'#957966');g.addColorStop(.45,'#d1b48d');g.addColorStop(1,'#9a7e64');el(x,y,r,r,g);el(x,y-4,r-4,r-7,'#e7d3ae');el(x,y-6,r-10,r-13,'#bb9d77');el(x,y-7,r-13,r-15,'#e5cda0');for(let i=0;i<8;i++){const a=i*PI/4+t*.2;line(x+Math.cos(a)*(r-8),y-5+Math.sin(a)*(r-11),x+Math.cos(a)*(r-3),y-5+Math.sin(a)*(r-6),'#f8e5b8',2)}bolt(x,y-6,'#9a825f')}
 function musicBox(s){const p=P[Chime.stages[s.level].palette],done=s.bells.filter(b=>!b.left).length,total=s.bells.length;c.save();c.translate(360,90);
 // A tiny toy theatre floats above the inset play board.
 cloud(-198,-17,30,'#fff3d894');cloud(211,-12,35,'#fff5df8a');line(-135,-17,135,-17,p[3],2);for(let i=0;i<total;i++){const x=-120+i*240/(total-1);line(x,-17,x,0,p[3],1);el(x,4,5,6,i<done?'#f0c46b':'#bba98e');if(i<done)el(x,4,2,3,'#fff5ba')}
 arch(-65,-65,130,86,p[3]);arch(-59,-59,118,80,p[2]);arch(-49,-49,98,70,p[1]);
 for(let i=0;i<5;i++){star(-31+i*15,-28+Math.sin(i)*5,3,'#ebd5a5',i*.2)}el(0,1,35,8,'#af92714d');box(-67,18,134,7,3,p[3]);
 // Bird automaton nods faster as the melody fills.
 const bob=Math.sin(s.t*(1+done*.6))*2;c.translate(0,bob);el(0,1,18,13,'#fff0cf');el(12,-7,10,10,'#f7e4bf');el(15,-9,1.8,1.8,'#70594c');c.fillStyle='#c08c54';c.beginPath();c.moveTo(20,-7);c.lineTo(30,-4);c.lineTo(20,-1);c.fill();el(-4,0,9,6,p[5]);line(-7,13,-7,18,'#aa8554',2);line(5,13,5,18,'#aa8554',2);c.restore();
 }
 function spool(s,skin){c.save();c.translate(s.x,s.y);c.rotate(s.t*3+(s.vx+s.vy)*.006);el(2,7,22,18,'#51433329');const colors=[['#d79771','#a96850'],['#9bb6ad','#658d88'],['#b8aed0','#8c80aa']][skin];el(0,1,23,23,colors[1]);el(0,-3,23,23,colors[0]);el(0,-4,18,18,'#f8e7c2');el(0,-4,14,14,colors[0]);for(let i=0;i<8;i++){const a=i*PI/4;line(Math.cos(a)*6,Math.sin(a)*6-4,Math.cos(a)*12,Math.sin(a)*12-4,'#fff4d680',1.5)}el(0,-4,5,5,'#f8e7c2');el(0,-4,2,2,'#a57c54');c.restore()}
 return{draw(s,fx,trail,skin,target){if(level!==s.level)cache(s);c.drawImage(back,0,0);musicBox(s);
 // Engraved paths connect the bells; illumination follows real hits.
 for(let i=1;i<s.bells.length;i++){const a=Chime.bellPos(s,i-1),b=Chime.bellPos(s,i),on=!s.bells[i-1].left&&!s.bells[i].left;c.save();c.setLineDash([2,8]);line(a.x,a.y,b.x,b.y,on?'#f9e5b291':'#82796720',on?2:1);c.restore()}
 for(const[x,y,r]of Chime.stages[s.level].posts)post(x,y,r,s.t);
 for(const a of s.stars){const[x,y]=Chime.stages[s.level].stars[a.id];if(a.found){star(x,y,7,'#fff4c666');continue}const bob=Math.sin(s.t*2+a.id)*4;el(x,y+10,13,4,'#72624f13');const g=c.createRadialGradient(x,y+bob,1,x,y+bob,27);g.addColorStop(0,'#fff1b38c');g.addColorStop(1,'#fff1b300');c.fillStyle=g;c.fillRect(x-27,y+bob-27,54,54);star(x,y+bob+2,16,'#bd914e');star(x,y+bob,15,'#f3d58c',Math.sin(s.t+a.id)*.12);star(x-1,y+bob-1,10,'#fff0b8')}
 for(let i=0;i<s.bells.length;i++)lantern(s,i);
 // Motion ribbon is capped and fades; the actual rope endpoint is the physics body.
 for(let i=1;i<trail.length;i++)line(trail[i-1].x,trail[i-1].y,trail[i].x,trail[i].y,`rgba(255,240,196,${i/trail.length*.5})`,i/trail.length*9);
 const dist=Math.hypot(s.x-s.hx,s.y-s.hy),slack=Math.max(0,s.length-dist);c.strokeStyle='#fff6df';c.lineWidth=3;c.beginPath();c.moveTo(s.hx,s.hy);c.quadraticCurveTo((s.hx+s.x)/2+Math.sin(s.t*4)*slack*.15,(s.hy+s.y)/2+slack*.6,s.x,s.y);c.stroke();c.strokeStyle='#a58a615a';c.lineWidth=1;c.stroke();
 el(s.hx+2,s.hy+5,17,12,'#6a584b22');el(s.hx,s.hy,16,12,s.reeling?'#a7bbb0':'#e1c28d');el(s.hx,s.hy-2,11,7,'#fff0cb');line(s.hx-6,s.hy-2,s.hx+6,s.hy-2,'#b9a078',2);if(target){c.save();c.setLineDash([2,5]);c.strokeStyle='#fff5d99c';c.beginPath();c.arc(target.x,target.y,19,0,7);c.stroke();c.restore()}
 spool(s,skin);
 // Side crank, feet, hinge and tiny engraved label.
 line(683,435,699,435,'#9d825f',5);line(699,435,699,411,'#b79c72',4);el(699,407,7,11,'#d5b788');bolt(51,140,'#bea480');bolt(669,140,'#bea480');bolt(51,789,'#bea480');bolt(669,789,'#bea480');box(125,826,53,13,6,'#a58b6c');box(542,826,53,13,6,'#a58b6c');box(276,838,168,27,12,'#bfa688');box(279,839,162,21,10,'#e1c79f');c.fillStyle='#8d7458';c.font='10px Georgia';c.textAlign='center';c.fillText('THE LITTLE CHIME COMPANY',360,853);for(let i=0;i<3;i++)star(340+i*20,880,4,'#c0a47a');
 for(const f of fx){c.globalAlpha=Math.min(1,f.life*2);if(f.kind==='ring'){c.strokeStyle=f.col;c.lineWidth=2;c.beginPath();c.arc(f.x,f.y,f.r,0,7);c.stroke()}else if(f.kind==='note'){c.fillStyle=f.col;c.font='bold 20px Georgia';c.fillText('♪',f.x,f.y)}else star(f.x,f.y,f.size||3,f.col,f.life*5)}c.globalAlpha=1;
 if(Chime.stages[s.level].palette===3)for(let i=0;i<10;i++)el(110+i*53+Math.sin(s.t*.7+i)*8,170+(i*79)%590+Math.cos(s.t*.8+i)*10,1.5,1.5,'#fff1ca9c');
 }};
};

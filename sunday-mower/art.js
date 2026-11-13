window.MowerArt=function(ctx){
 const c=ctx;let back=null,last=-1;const palettes=[['#65894a','#b4c877','#e6e5bd'],['#67834b','#becb82','#e8dbab'],['#8d9451','#d1c47e','#ead3a1'],['#526e69','#a6bcb0','#c8d1c1']];
 function ellipse(x,y,rx,ry,col){c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
 function box(x,y,w,h,r,col){c.fillStyle=col;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()}
 function line(x,y,a,b,col,w=2){c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.beginPath();c.moveTo(x,y);c.lineTo(a,b);c.stroke()}
 function flower(x,y,col,size=5){for(let k=0;k<5;k++)ellipse(x+Math.cos(k*1.257)*size*.7,y+Math.sin(k*1.257)*size*.7,size*.56,size*.56,col);ellipse(x,y,size*.36,size*.36,'#f5d484')}
 function bush(x,y,r){ellipse(x+3,y+8,r,r*.7,'#35584322');ellipse(x,y,r,r*.72,'#54764a');ellipse(x-6,y-5,r*.65,r*.55,'#6e9154');ellipse(x+8,y-4,r*.6,r*.5,'#759c59');for(let i=0;i<6;i++)ellipse(x+Math.sin(i*7)*r*.7,y+Math.cos(i*5)*r*.45,2.4,1.7,'#aec481')}
 function boot(x,y){c.save();c.translate(x,y);c.rotate(-.3);box(-6,-10,9,16,2,'#c88952');box(-7,0,17,6,3,'#b77843');line(-4,-6,1,-6,'#e1b687',1);c.restore()}
 function build(s){const cvs=document.createElement('canvas');cvs.width=720;cvs.height=900;const old=c; // Cache the illustrated environment separately from grass.
 const b=cvs.getContext('2d');b.fillStyle=palettes[Mower.yards[s.level].color][2];b.fillRect(0,0,720,900);
 for(let i=0;i<900;i++){const x=(i*137.3)%720,y=(i*89.7)%900;b.fillStyle=i%2?'#fff6db22':'#7e824412';b.fillRect(x,y,2,2)}
 b.fillStyle='#385a3920';b.beginPath();b.roundRect(64,142,597,663,30);b.fill();b.fillStyle='#9baf70';b.beginPath();b.roundRect(69,139,582,659,24);b.fill();
 b.fillStyle=palettes[Mower.yards[s.level].color][1];b.fillRect(80,150,560,640);
 for(let j=0;j<32;j++){b.fillStyle=j%4<2?'#fffbd30c':'#35552b0a';b.fillRect(80,150+j*20,560,20)}
 // Border stones, each with a lit upper edge and a small joint.
 for(let i=0;i<29;i++)for(const y of[127,800]){b.fillStyle='#bebaa0';b.beginPath();b.roundRect(73+i*20,y,18,15,4);b.fill();b.fillStyle='#eee3c4';b.fillRect(76+i*20,y+2,12,3)}
 for(let j=0;j<33;j++)for(const x of[56,648]){b.fillStyle='#bab69c';b.beginPath();b.roundRect(x,146+j*20,14,18,4);b.fill();b.fillStyle='#e7dec2';b.fillRect(x+2,149+j*20,3,12)}
 // Cottage wall and roof: large simple shapes, warm material detail.
 b.fillStyle='#c2c3a6';b.beginPath();b.roundRect(181,13,363,108,12);b.fill();b.fillStyle='#f0ddae';b.fillRect(188,0,350,106);
 for(let y=15;y<100;y+=19){b.fillStyle='#c2ad8828';b.fillRect(188,y,350,2)}
 b.fillStyle='#dd8760';b.beginPath();b.moveTo(160,16);b.lineTo(360,-46);b.lineTo(559,16);b.closePath();b.fill();b.strokeStyle='#aa654b';b.lineWidth=5;b.stroke();
 for(const x of[220,437]){b.fillStyle='#b8a578';b.beginPath();b.roundRect(x,34,63,57,5);b.fill();b.fillStyle='#748e80';b.fillRect(x+6,40,51,45);b.fillStyle='#e1d4ad';b.fillRect(x+29,40,4,45);b.fillRect(x+6,61,51,4);b.fillStyle='#f8efd0';b.fillRect(x+8,42,12,15);b.fillStyle='#a5744e';b.fillRect(x-3,90,70,9);b.fillStyle='#70864e';for(let k=0;k<7;k++){b.beginPath();b.arc(x+k*9,87,8,0,7);b.fill()}}
 b.fillStyle='#7e9b80';b.beginPath();b.roundRect(320,35,68,72,[30,30,0,0]);b.fill();b.fillStyle='#f1d07c';b.beginPath();b.arc(375,76,3,0,7);b.fill();b.fillStyle='#a8ac91';b.fillRect(311,107,87,8);
 // Wooden fence slats at top sides.
 for(let x=15;x<720;x+=23)if(x<175||x>555){b.fillStyle='#ad9974';b.fillRect(x,66,16,52);b.fillStyle='#e5d3a4';b.beginPath();b.moveTo(x,69);b.lineTo(x+8,58);b.lineTo(x+16,69);b.lineTo(x+16,110);b.lineTo(x,110);b.closePath();b.fill();b.fillStyle='#c2ad85';b.fillRect(x+2,83,12,5)}
 back=cvs;last=s.level;
 }
 function bed(a,b,w,h,k){const x=80+a*20,y=150+b*20;box(x+3,y+8,w*20,h*20,12,'#38553c25');box(x-4,y-4,w*20+8,h*20+8,12,'#c1b395');box(x,y,w*20,h*20,8,'#796844');box(x+4,y+4,w*20-8,h*20-8,6,'#65563c');
 for(let j=12;j<h*20;j+=20)for(let i=12;i<w*20;i+=20){ellipse(x+i,y+j+3,9,4,'#344f382b');line(x+i,y+j,x+i,y+j-7,'#93a361',2);ellipse(x+i-4,y+j-2,5,2,'#77944f');ellipse(x+i+4,y+j-5,5,2,'#94ad62');flower(x+i,y+j-9,['#ecbdab','#ead59a','#aeaaeb'][k%3],4.5)}
 }
 function trinket(p,s){if(p.found)return;const hidden=s.cells.some(t=>t.g&&Math.hypot(90+t.i*20-p.x,160+t.j*20-p.y)<24);if(hidden)return;c.save();c.translate(p.x,p.y);ellipse(0,4,12,4,'#425b3630');c.translate(0,Math.sin(s.t*3)*2);if(p.k===0){ellipse(0,0,10,8,'#de9e62');ellipse(5,-6,4,3,'#f1bc78');ellipse(6,-7,1,1,'#3a4635');box(-8,2,16,3,2,'#ca874c')}else if(p.k===1){c.rotate(.4);box(-10,-7,20,14,3,'#7d9baf');box(-4,-3,8,6,1,'#eee5bb');line(-8,-6,8,6,'#b5cdcc',1)}else{ellipse(0,0,11,11,'#e3bf5a');ellipse(0,0,7,7,'#f0d880');line(-3,-4,3,4,'#bd9449',2)}c.restore()}
 function mower(s,skin){c.save();c.translate(s.x,s.y);c.rotate(s.angle);const boost=s.turbo>0,t=s.t;
 if(boost){ellipse(-18,0,37+Math.sin(t*25)*4,29,'#ffe39c55');line(-34,-15,-49-Math.sin(t*15)*10,-15,'#fff0a5',3);line(-34,15,-53-Math.cos(t*16)*10,15,'#fff0a5',3)}
 ellipse(1,8,31,25,'#2b493a35');const col=['#ca7153','#7599aa','#d5ab52'][skin];
 for(const x of[-18,18])for(const y of[-20,20]){box(x-5,y-5,12,11,4,'#35483c');line(x-2,y-3,x-2,y+3,'#61735c',2)}
 box(-29,-20,57,40,12,'#925d41');box(-29,-24,57,40,12,col);box(-24,-21,42,29,9,'#fff1cd');box(8,-19,17,30,7,col);line(17,-13,17,4,'#efb599',2);ellipse(-3,-7,12,9,'#9b9e78');ellipse(-3,-9,9,7,'#f4e3b7');line(-8,-9,2,-9,'#b1b489',2);line(-7,-6,1,-6,'#b1b489',2);
 line(-20,-14,-40,-18,'#4b5b45',3);line(-20,9,-40,13,'#4b5b45',3);line(-40,-18,-40,13,'#d7bf8b',5);
 // Small bunny operator, with a straw sunhat, follows the mower.
 ellipse(-37,1,10,13,'#deb886');ellipse(-38,-7,10,10,'#f6ebd0');ellipse(-39,-18,3,10,'#fff2d7');ellipse(-33,-18,3,9,'#fff2d7');ellipse(-39,-18,1,6,'#d8b5a0');ellipse(-33,-18,1,5,'#d8b5a0');ellipse(-34,-8,1.2,1.5,'#3c4a3c');ellipse(-30,-5,2.5,2,'#d68c75');ellipse(-40,-13,13,4,'#d5af66');ellipse(-40,-16,8,5,'#e7c785');line(-46,-15,-34,-15,'#a87b4e',2);c.restore()}
 return{draw(s,fx,skin,target){if(last!==s.level)build(s);c.drawImage(back,0,0);const pal=palettes[Mower.yards[s.level].color];
 // Cut grass has directional rollers and stubble; remaining grass has individual blades.
 for(const q of s.cells){if(!q.max)continue;const x=90+q.i*20,y=160+q.j*20;if(q.g){c.fillStyle=pal[0];c.fillRect(x-10,y-10,20,20);const h=q.g===2?13:8;for(let k=0;k<3;k++){const a=x-7+k*6+Math.sin(q.i*17+q.j*41+k)*2,jitter=Math.sin(s.t*1.5+q.i*.7+q.j)*1.4;line(a,y+5,a-2+jitter,y-h+Math.sin(q.i*5+q.j*11+k)*2,['#84a65c','#a0b86d','#719852'][(k+q.i)%3],1.7);line(a,y+5,a+3+jitter,y-h+4,'#87a65d',1.5)}if((q.i*3+q.j)%43===0)flower(x,y-4,'#e7dfae',2)}else{c.fillStyle=q.j%4<2?'#ffffff0b':'#426c3711';c.fillRect(x-10,y-10,20,20);line(x-6,y+3,x-4,y+1,'#7f9d602c',1);line(x+5,y-4,x+6,y-6,'#7f9d602c',1)}}
 for(const p of s.spots)trinket(p,s);
 for(let k=0;k<Mower.yards[s.level].beds.length;k++)bed(...Mower.yards[s.level].beds[k],k);
 for(let k=0;k<Mower.yards[s.level].water.length;k++){const[i,j]=Mower.yards[s.level].water[k],x=90+i*20,y=160+j*20,on=Math.sin(s.t*1.2+k*2)>.1;ellipse(x,y+3,9,5,'#526b46');ellipse(x,y,6,4,'#c4ceb1');if(on){ellipse(x,y,85,85,'#9fd8d016');for(let a=0;a<10;a++){const angle=s.t*1.8+a*.628,r=20+(s.t*65+a*14)%65;line(x+Math.cos(angle)*r,y+Math.sin(angle)*r,x+Math.cos(angle)*(r+7),y+Math.sin(angle)*(r+7),'#d4f0e5aa',2)}}}
 bush(29,164,24);bush(690,309,23);bush(29,660,24);bush(690,733,22);flower(25,154,'#eeb6a0',6);flower(687,301,'#e9d5a1',6);
 // Watering can, spare boots, hand tools and the shaded bench.
 c.save();c.translate(680,458);c.rotate(.18);ellipse(0,7,18,10,'#51694c24');box(-11,-14,22,28,6,'#8eaba2');ellipse(0,-14,11,4,'#b9c8ad');line(-8,-6,-22,-19,'#84a198',6);line(-22,-19,-27,-17,'#b4c3aa',6);c.strokeStyle='#9fb5a4';c.lineWidth=4;c.beginPath();c.arc(10,-5,10,-1.5,1.5);c.stroke();c.restore();boot(27,490);boot(40,510);
 box(195,837,171,30,7,'#9c805525');for(let i=0;i<3;i++)box(191,826+i*9,170,7,2,'#c0a16c');line(208,850,208,866,'#a18656',5);line(345,850,345,866,'#a18656',5);ellipse(465,842,34,22,'#c7b98c');ellipse(465,836,27,18,'#b49e74');ellipse(465,830,21,12,'#dac69a');box(501,831,17,12,5,'#9dad93');ellipse(508,831,8,3,'#e2e3bd');
 if(target){ellipse(target.x,target.y,8,8,'#fff5ce35');c.strokeStyle='#fff2c788';c.lineWidth=1.5;c.beginPath();c.arc(target.x,target.y,13,0,7);c.stroke()}
 mower(s,skin);
 for(const p of fx){c.globalAlpha=Math.min(1,p.life*2);if(p.kind==='confetti'){c.save();c.translate(p.x,p.y);c.rotate(p.life*8);box(-3,-4,6,8,1,p.col);c.restore()}else{line(p.x,p.y,p.x+p.vx*.03,p.y-4,p.col,p.w||2)}}c.globalAlpha=1;
 if(Mower.yards[s.level].color===3){c.fillStyle='#30475d17';c.fillRect(0,0,720,900);for(let i=0;i<12;i++)ellipse(100+(i*89)%530+Math.sin(s.t+i)*15,170+(i*137)%560,2,2,'#fff0b7bb')}
 }};
};

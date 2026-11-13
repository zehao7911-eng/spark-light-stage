(function(){'use strict';
const PAL={peach:['#f6ceb6','#dc8e94','#f5f0d7','#208d87','#65c6b2','#163e50','#f07168'],jade:['#dddfb3','#8ba793','#fff0ca','#34796e','#8ac5a1','#244f52','#ef9878'],violet:['#b6bddc','#817fab','#eaddec','#4b7292','#90b6c4','#302e55','#f9b4a0'],amber:['#e9bb8a','#be7a69','#f7ddb1','#388b91','#7cc2b6','#4d4052','#de925f'],night:['#3c426d','#747195','#ad9ab8','#2d626f','#6eacb0','#282b4a','#ffba8f'],blue:['#c4d9d9','#7e9eaf','#f8e5cc','#2a889f','#89c8cc','#2a4059','#e8a593'],orchid:['#dfb9cf','#a07e9f','#f8e3dc','#3f8091','#9abfbc','#433e65','#ecac96'],sunset:['#ecb09b','#ad7889','#f8d4ac','#496f85','#91aeb0','#3d3c5f','#fa986b']};
const TAU=Math.PI*2;
function ell(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,TAU);c.fill();}
function rr(c,x,y,w,h,r,color){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,Math.max(0,r));c.fill();}
function path(c,pts,color){c.fillStyle=color;c.beginPath();for(let i=0;i<pts.length;i++)i?c.lineTo(...pts[i]):c.moveTo(...pts[i]);c.closePath();c.fill();}
function line(c,x,y,a,b,col,w=1){c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(x,y);c.lineTo(a,b);c.stroke();}
function arcdoor(c,x,y,w,h,p){rr(c,x,y,w,h,w/2,p[1]);rr(c,x+4,y+4,w-8,h-4,(w-8)/2,p[5]);rr(c,x+w*.23,y+11,w*.54,h-11,w*.27,p[1]);line(c,x+w/2,y+15,x+w/2,y+h,p[2],.8);ell(c,x+w/2+4,y+h-12,1.3,1.3,p[2]);}
function palm(c,x,y,s,p){c.save();c.translate(x,y);c.scale(s,s);path(c,[[-4,0],[1,-65],[7,-65],[6,0]],p[1]);for(let i=-2;i<=2;i++){c.save();c.translate(3,-64);c.rotate(i*.65);c.fillStyle=p[5];c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(-23,-28,-42,-3);c.quadraticCurveTo(-18,-10,0,0);c.fill();c.restore();}rr(c,-12,-5,28,13,3,p[6]);rr(c,-9,8,22,8,2,p[1]);c.restore();}
function terrain(index){let r=BathsCore.ROOMS[index],p=PAL[r.theme],c=document.createElement('canvas');c.width=480;c.height=640;let g=c.getContext('2d');g.fillStyle=p[0];g.fillRect(0,0,480,640);
 // A tiny palace, drawn in the same restrained flat colours as the play surface.
 rr(g,19,51,442,115,5,p[1]);rr(g,24,45,432,109,4,p[2]);rr(g,28,50,424,8,2,p[0]);for(let x=36;x<450;x+=32){rr(g,x,62,25,75,12,p[0]);arcdoor(g,x+4,72,17,65,p);}
 path(g,[[14,48],[52,25],[428,25],[466,48]],p[6]);rr(g,20,46,440,7,2,p[2]);for(let x=46;x<440;x+=38){rr(g,x,29,4,16,1,p[2]);ell(g,x+2,29,4,3,p[2]);}
 rr(g,188,57,104,79,3,p[1]);arcdoor(g,200,62,80,78,p);rr(g,209,115,62,11,5,p[6]);g.fillStyle=p[2];g.textAlign='center';g.font='bold 8px Trebuchet MS';g.fillText('BOUNCEBACK BATHS',240,123);
 for(const x of [20,430]){rr(g,x,30,30,120,10,p[0]);rr(g,x-3,140,36,8,2,p[2]);rr(g,x+5,50,20,83,10,p[1]);ell(g,x+15,29,22,20,p[6]);rr(g,x-7,27,44,5,2,p[2]);ell(g,x+15,7,3,5,p[2]);}
 // Terracotta terrace, tile edging, shallow water and inlaid floor.
 rr(g,20,158,440,438,28,p[1]);rr(g,28,151,424,438,26,p[2]);rr(g,41,166,398,409,24,p[0]);rr(g,53,171,374,400,20,p[3]);rr(g,60,178,360,386,17,p[4]);
 for(let y=190;y<558;y+=32)for(let x=70;x<417;x+=32){line(g,x,y,x+23,y,p[3]+'55',.6);line(g,x,y,x,y+23,p[3]+'44',.6);}
 for(let y=194;y<560;y+=44){rr(g,43,y,7,20,1,p[6]);rr(g,430,y,7,20,1,p[6]);}for(let x=72;x<410;x+=42){rr(g,x,159,21,7,1,p[6]);rr(g,x,577,21,7,1,p[6]);}
 ell(g,240,369,110,91,p[3]+'25');for(let a=0;a<TAU;a+=Math.PI/4){path(g,[[240+Math.cos(a)*61,369+Math.sin(a)*51],[240+Math.cos(a+.22)*90,369+Math.sin(a+.22)*74],[240+Math.cos(a+.44)*61,369+Math.sin(a+.44)*51]],p[2]+'50');}ell(g,240,369,24,20,p[3]+'38');
 // Side gardens, towels, stools, slippers and lemon dishes.
 palm(g,13,228,.72,p);palm(g,454,500,.71,p);palm(g,35,620,.62,p);palm(g,437,185,.57,p);
 for(const [x,y] of [[14,343],[445,309]]){rr(g,x,y,22,58,5,p[1]);rr(g,x-2,y-5,26,47,5,p[2]);for(let k=0;k<4;k++)rr(g,x,y+k*10,22,4,1,p[0]);}
 rr(g,86,604,64,11,4,p[1]);rr(g,82,598,72,13,5,p[2]);rr(g,91,595,23,9,4,p[6]);rr(g,118,595,23,9,4,p[0]);ell(g,372,606,23,10,p[1]);ell(g,372,602,23,10,p[2]);for(let k=0;k<3;k++)ell(g,361+k*10,601,5,5,'#e6b854');
 for(const o of BathsCore.obstacles(index)){ell(g,o.x+4,o.y+8,o.r+5,o.r*.75,p[3]);ell(g,o.x,o.y,o.r,o.r*.78,p[2]);ell(g,o.x,o.y-4,o.r-6,(o.r-6)*.75,p[1]);for(let a=0;a<TAU;a+=TAU/7){g.save();g.translate(o.x,o.y-8);g.rotate(a);ell(g,0,-10,6,15,p[5]);g.restore();}ell(g,o.x,o.y-10,7,7,p[6]);}
 if(r.feature===2){for(const x of [150,330]){ell(g,x,520,13,9,p[3]);ell(g,x,520,9,6,p[2]);for(let k=0;k<3;k++)ell(g,x-5+k*5,520,1,1,p[5]);}}
 if(r.feature===3){for(let y=220;y<550;y+=65)for(let x=95;x<400;x+=120)path(g,[[x,y],[x+8,y-5],[x+8,y-1],[x+27,y-1],[x+27,y+1],[x+8,y+1],[x+8,y+5]],p[2]+'55');}
 if(index===4){ell(g,390,70,13,13,'#f8d5b1');ell(g,397,64,12,12,p[0]);for(let k=0;k<12;k++)ell(g,65+k*31,20+(k%3)*8,1.4,1.4,p[2]);}
 return c;}
function star(c,x,y,r,color){let pts=[];for(let k=0;k<10;k++){let a=-Math.PI/2+k*Math.PI/5,v=k%2?r*.48:r;pts.push([x+Math.cos(a)*v,y+Math.sin(a)*v]);}path(c,pts,color);}
function duck(c,x,y,t,s=1){c.save();c.translate(x,y+Math.sin(t*2)*2);c.scale(s,s);ell(c,0,8,19,6,'#17485b25');ell(c,0,0,18,12,'#f4c859');ell(c,7,-11,10,10,'#ffdb6f');path(c,[[15,-12],[26,-9],[15,-6]],'#eb8b62');ell(c,10,-13,2,2,'#344451');ell(c,-5,0,8,5,'#eaaa4e');path(c,[[-14,-4],[-22,-10],[-17,3]],'#ffdb6f');c.restore();}
function player(c,p,t,skin=0){let colors=[['#f08c7e','#ffc3a5','#af5d78'],['#87bc9e','#d5e3b5','#548c89'],['#aaa0d2','#e2c7dd','#716d9d']][skin];c.save();c.translate(p.x,p.y);c.scale(1.18,1.18);ell(c,4,13,29,11,'#17495838');
 let breath=Math.sin(t*5)*.035;c.save();c.scale(1+breath,1-breath);for(let k=0;k<4;k++){let punching=p.stretch>.1&&p.hand===k,a=punching?p.face+Math.PI/2:k*Math.PI/2+Math.PI/4,l=punching?1:p.limbs[k],ex=punching?p.stretch*39:0;c.save();c.rotate(a);c.translate(0,-13);rr(c,-7,-(15+ex)*l,14,(22+ex)*l,7,colors[2]);ell(c,0,-(14+ex)*l,11*l+2,10*l+2,colors[1]);ell(c,-3,-(18+ex)*l,4*l,2*l,'#fff0d8');c.restore();}
 // Curved tail, cheek fins, towel turban, expressive face.
 c.fillStyle=colors[2];c.beginPath();c.moveTo(-18,10);c.quadraticCurveTo(-44,39,-47,12);c.quadraticCurveTo(-34,28,-25,4);c.fill();ell(c,-24,-6,11,8,colors[2]);ell(c,24,-6,11,8,colors[2]);ell(c,0,0,26,25,colors[0]);ell(c,0,5,21,18,colors[1]);
 for(const x of [-27,27]){path(c,[[x,-11],[x*1.22,-22],[x*.86,-14]],colors[0]);}
 let blink=Math.sin(t*1.8)>.992;for(const x of [-9,9]){ell(c,x,-4,4.8,blink?1:6,'#fcf5dd');ell(c,x+Math.cos(p.face)*1.2,-3+Math.sin(p.face),2.2,blink?.5:3.2,'#2d4055');}ell(c,-15,6,5,2,'#ee8c84');ell(c,15,6,5,2,'#ee8c84');
 c.strokeStyle='#714d66';c.lineWidth=1.6;c.beginPath();c.arc(0,6,p.stretch>.1?6:4,0,Math.PI);c.stroke();rr(c,-19,-25,38,12,6,'#fff0da');ell(c,0,-28,11,7,'#fff0da');ell(c,2,-29,5,3,'#e3b9a8');line(c,-14,-20,12,-20,'#e3b9a8',1);
 c.restore();if(p.inv>0){c.strokeStyle='#fff4d5aa';c.lineWidth=2;c.beginPath();c.ellipse(0,-2,37,38,0,0,TAU);c.stroke();}c.restore();}
function enemy(c,e,t){let cols=[['#7889b4','#adb8d7'],['#c18296','#e9acb7'],['#82af94','#c0d5a5'],['#9475a7','#d2b2c9']][e.type],wig=Math.sin(t*4+e.phase);c.save();c.translate(e.x,e.y+wig*2);c.scale(1.12,1.12);let squash=e.wind>0?1-e.wind*.22:1;ell(c,3,13,e.r*.9,e.r*.32,'#16435730');c.scale(1/squash,squash);if(e.flash>0)cols=['#fff0cc','#fff8de'];
 for(let k=-1;k<=1;k++)ell(c,k*e.r*.5,e.r*.58,7,8+wig*2,cols[0]);ell(c,0,0,e.r,e.r*.88,cols[0]);ell(c,-3,-4,e.r*.82,e.r*.72,cols[1]);ell(c,-e.r*.32,-e.r*.37,e.r*.25,e.r*.12,'#ffffff66');
 if(e.type===1){for(let k=0;k<3;k++)path(c,[[-20+k*14,-14],[-13+k*14,-26],[-7+k*14,-14]],cols[0]);}if(e.type===2){for(const x of [-1,1]){line(c,x*13,-11,x*20,-24,cols[0],5);ell(c,x*20,-25,5,5,cols[1]);}}
 if(e.type===3){rr(c,-23,-30,46,9,3,'#e1a75d');for(const x of [-18,0,18])star(c,x,-34,7,'#f8dc8a');}
 for(const x of [-7,7]){ell(c,x,-2,4,5,'#fff6de');ell(c,x,0,1.8,2.6,'#3a405d');}c.strokeStyle='#514e72';c.lineWidth=1.5;c.beginPath();c.arc(0,9,4,Math.PI,TAU);c.stroke();
 if(e.hp>1){for(let k=0;k<e.maxHp;k++)ell(c,(k-(e.maxHp-1)/2)*7,-e.r-12,2.5,2.5,k<e.hp?'#fff1cb':'#50486955');}if(e.wind>0){c.strokeStyle='#f49481';c.lineWidth=2;c.setLineDash([3,4]);c.beginPath();c.arc(0,0,e.r+10,0,TAU);c.stroke();c.setLineDash([]);}
 c.restore();}
function draw(c,s,fx,skin,gentle){let p=PAL[BathsCore.ROOMS[s.room].theme];if(!draw.cache)draw.cache={};if(!draw.cache[s.room])draw.cache[s.room]=terrain(s.room);c.drawImage(draw.cache[s.room],0,0);let t=s.t;
 c.save();rr(c,60,178,360,386,17,p[4]); // Repaint translucent water and restore static inlays below.
 c.globalAlpha=.6;c.drawImage(draw.cache[s.room],60,178,360,386,60,178,360,386);c.restore();
 c.save();c.beginPath();c.roundRect(60,178,360,386,17);c.clip();for(let k=0;k<16;k++){let x=78+(k*71)%325,y=195+(k*47)%345+Math.sin(t*.7+k)*3;c.strokeStyle='#fff4dc38';c.lineWidth=1.3;c.beginPath();c.ellipse(x,y,12+Math.sin(t+k)*3,3,0,.1,2.8);c.stroke();}
 for(let k=0;k<4;k++){let x=150+(k%2)*180,y=520-k%3*94;if(BathsCore.ROOMS[s.room].feature===2&&Math.floor(t/2.8)%2===1){c.strokeStyle='#d9f4e7aa';c.lineWidth=4;line(c,x,y,x+Math.sin(t*4+k)*8,y-48,'#d9f4e7aa',4);}}
 for(let k=0;k<Math.min(5,2+s.room%4);k++)duck(c,85+((k*97)%310),215+((k*113)%320),t+k,.62);
 if(s.pulse){let b=s.pulse;c.globalAlpha=Math.max(0,1-b.age/ .6);c.strokeStyle='#fff5d5';c.lineWidth=7;c.beginPath();c.arc(b.x,b.y,b.r,0,TAU);c.stroke();c.lineWidth=2;c.beginPath();c.arc(b.x,b.y,b.r*.8,0,TAU);c.stroke();c.globalAlpha=1;}
 let actors=[...s.enemies.map(e=>({y:e.y,draw:()=>enemy(c,e,t)})),{y:s.player.y,draw:()=>player(c,s.player,t,skin)}].sort((a,b)=>a.y-b.y);for(const e of [...s.enemies].sort((a,b)=>a.y-b.y))enemy(c,e,t);player(c,s.player,t,skin);
 if(s.charge>0){c.strokeStyle='#fff2cc';c.lineWidth=4;c.beginPath();c.arc(s.player.x,s.player.y,42,-Math.PI/2,-Math.PI/2+TAU*s.charge);c.stroke();}
 for(const f of fx){let age=f.age,life=f.life;c.save();c.globalAlpha=Math.max(0,1-age/life);if(f.kind==='word'){c.textAlign='center';c.font='900 '+(f.big?22:13)+'px Trebuchet MS';c.fillStyle='#345063';c.fillText(f.text,f.x+1,f.y-age*35+2);c.fillStyle=f.color||'#fff6d8';c.fillText(f.text,f.x,f.y-age*35);}else{let x=f.x+f.vx*age,y=f.y+f.vy*age+90*age*age;if(f.kind==='spark')star(c,x,y,Math.max(1,5*(1-age/life)),f.color);else{ell(c,x,y,Math.max(1,f.size*(1-age/life)),Math.max(1,f.size*(1-age/life)),f.color);ell(c,x-1,y-2,1,1,'#ffffff99');}}c.restore();}
 c.restore();
 // Foreground lip deliberately masks only the water edge.
 rr(c,56,565,368,8,3,p[2]);for(let x=74;x<410;x+=42)rr(c,x,567,21,3,1,p[6]);
}
window.BathsArt={draw,star,PAL};
})();






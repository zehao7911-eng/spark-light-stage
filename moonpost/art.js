window.PostArt=(()=>{let c;const themes=[['#142a3b','#254354','#6db5a6','#efbd70'],['#202644','#394161','#98a8d9','#edbd8e'],['#292838','#4c3d52','#c995a6','#edc58c'],['#123739','#285855','#81bdab','#f0ca7d']];
function ellipse(x,y,a,b,col){c.beginPath();c.ellipse(x,y,a,b,0,0,7);c.fillStyle=col;c.fill();}
function rr(x,y,w,h,r,col,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(col){c.fillStyle=col;c.fill();}if(stroke){c.lineWidth=2;c.strokeStyle=stroke;c.stroke();}}
function path(ps,col,w=2){c.beginPath();ps.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke();}
function star(x,y,r,col,rot=0){c.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5-Math.PI/2+rot,k=i%2?r*.44:r;i?c.lineTo(x+Math.cos(a)*k,y+Math.sin(a)*k):c.moveTo(x+Math.cos(a)*k,y+Math.sin(a)*k);}c.closePath();c.fillStyle=col;c.fill();}
function envelope(x,y,r,col){rr(x-r,y-r*.65,r*2,r*1.3,3,col);path([[x-r,y-r*.65],[x,y+1],[x+r,y-r*.65]],'#1b344a',1.5);path([[x-r,y+r*.65],[x-3,y+1]],'#1b344a88',1);path([[x+r,y+r*.65],[x+3,y+1]],'#1b344a88',1);}
function draw(ctx,g){c=ctx;const{W,H,state:s,time:t,skin,trail,fx}=g,P=themes[Math.floor(s.n/2)],accent=skin==='rose'?'#e4a1a0':skin==='mint'?'#8cdbbe':P[3],z=Math.min((W-16)/400,(H-28)/620),ox=(W-400*z)/2,oy=(H-620*z)/2;c.save();c.clearRect(0,0,W,H);const back=c.createRadialGradient(W*.5,H*.4,10,W*.5,H*.4,Math.max(W,H)*.7);back.addColorStop(0,P[1]);back.addColorStop(1,P[0]);c.fillStyle=back;c.fillRect(0,0,W,H);
for(let i=0;i<70;i++){let x=(i*127.73)%W,y=(i*83.97)%H;ellipse(x,y,i%9===0?1.7:.7,i%9===0?1.7:.7,'#f9e2b4'+(i%4?'33':'77'));}
// Letter-shaped constellations in the margins.
for(let side of[-1,1]){const x=W/2+side*(220*z+Math.max(16,(W-440*z)*.23));c.save();c.translate(x,H*.36);c.rotate(side*.18);c.scale(Math.max(.6,z),Math.max(.6,z));envelope(0,0,28,P[2]+'33');path([[-30,-80],[5,-42],[36,-70]],P[2]+'44',1);ellipse(-30,-80,3,3,P[3]+'55');ellipse(5,-42,2,2,P[3]+'55');ellipse(36,-70,3,3,P[3]+'55');c.restore();}
c.translate(ox,oy);c.scale(z,z);rr(10,40,380,573,42,'#081c29','#647675');rr(18,35,364,570,38,P[1],'#c3a66b');rr(26,43,348,552,30,P[0]);
let field=c.createLinearGradient(0,80,0,570);field.addColorStop(0,P[0]);field.addColorStop(1,P[1]);rr(29,68,342,520,24,field);
// Inked planet landscape printed below the transparent playfield.
ellipse(236,141,104,77,P[1]+'66');ellipse(215,113,45,27,P[0]+'77');ellipse(275,152,20,11,P[0]+'66');ellipse(197,168,13,7,P[0]+'88');
for(let i=0;i<6;i++){c.strokeStyle=P[2]+'15';c.lineWidth=1;c.beginPath();c.ellipse(200,315,150-i*17,200-i*18,.2,0,7);c.stroke();}
for(let i=0;i<24;i++){const x=50+(i*67)%300,y=86+(i*113)%435;star(x,y,i%3?1.5:3,P[3]+'44',i);}
// The post office crown: arched windows, clock, striped awnings, tiny roof flag.
rr(157,29,86,62,12,P[1],'#af9665');c.fillStyle=P[3];c.beginPath();c.moveTo(149,37);c.lineTo(200,10);c.lineTo(251,37);c.fill();path([[200,10],[200,-1],[218,2]],P[2],2);rr(166,60,18,24,8,'#dec695');rr(216,60,18,24,8,'#dec695');rr(188,58,24,33,9,'#7ba5a2');envelope(200,73,8,'#f8dd9b');ellipse(200,44,9,9,P[0]);path([[200,38],[200,44],[205,47]],'#efcf8b',1.5);for(let x=166;x<234;x+=8)rr(x,57,7,5,1,x%16?'#d59e77':'#e9ce97');
// Real collision rails use exactly these line segments.
path([[35,438],[110,535]],'#13212d',20);path([[365,438],[290,535]],'#13212d',20);path([[35,438],[110,535]],'#c6aa75',13);path([[365,438],[290,535]],'#c6aa75',13);path([[37,438],[111,533]],'#f7dca4',3);path([[363,438],[289,533]],'#f7dca4',3);
for(let side of[-1,1]){const x=200+side*135;rr(x-12,473,24,47,9,P[1],'#6b8586');for(let j=0;j<3;j++)path([[x-5,483+j*9],[x+5,483+j*9]],P[2]+'55',2);}
const cfg=Post.config(s.n);for(let i=0;i<3;i++){const p=Post.pos(s,i),done=s.hits[i]>=p.need,hit=fx.some(e=>e.type==='stamp'&&e.i===i&&t-e.t<.2),r=p.r+(hit?3:0);ellipse(p.x,p.y+6,r+5,r+3,'#06182288');ellipse(p.x,p.y,r+4,r+4,done?P[2]:'#a59065');ellipse(p.x,p.y,r,r,done?'#f0d69c':P[1]);c.strokeStyle=done?'#fff1c1':P[2]+'88';c.lineWidth=2;c.beginPath();c.arc(p.x,p.y,r-4,Math.PI*1.05,Math.PI*1.78);c.stroke();envelope(p.x,p.y-3,13,done?P[0]:'#eed39b');for(let j=0;j<p.need;j++)ellipse(p.x+(j-(p.need-1)/2)*9,p.y+15,2.5,2.5,j<s.hits[i]?done?P[0]:P[3]:'#7a8c8b');
path([[p.x-r+4,p.y+r+6],[p.x+r-4,p.y+r+6]],P[2]+'44',2);}
for(const p of cfg.bumpers){ellipse(p.x,p.y+4,p.r+4,p.r+2,'#07182488');ellipse(p.x,p.y,p.r+2,p.r+2,'#a39165');ellipse(p.x,p.y,p.r,p.r,P[2]);ellipse(p.x-5,p.y-5,4,3,'#dcf2ca88');path([[p.x-26,p.y+4],[p.x+26,p.y-4]],'#dac68a',3);ellipse(p.x+2,p.y+2,4,3,P[0]+'33');}
if(cfg.gate){const a=Math.sin(s.t*.8)*.4;path([[200-Math.cos(a)*42,278-Math.sin(a)*42],[200+Math.cos(a)*42,278+Math.sin(a)*42]],'#b7a37a',8);path([[200-Math.cos(a)*37,278-Math.sin(a)*37],[200+Math.cos(a)*37,278+Math.sin(a)*37]],'#e4c78d',2);ellipse(200,278,7,7,P[2]);ellipse(200,278,3,3,'#ecce8a');}
cfg.coins.forEach((p,i)=>{if(s.coins.includes(i))return;ellipse(p.x,p.y,19+Math.sin(t*3+i)*2,19+Math.sin(t*3+i)*2,P[3]+'10');star(p.x,p.y,10,P[3],Math.sin(t+i)*.08);star(p.x-2,p.y-2,4,'#fff2c5');});
for(let k=0;k<2;k++){const f=Post.flipper(s,k);path([[f.x+2,f.y+5],[f.tx+2,f.ty+5]],'#071721aa',24);path([[f.x,f.y],[f.tx,f.ty]],'#a38c61',22);path([[f.x,f.y-2],[f.tx,f.ty-2]],k?P[2]:accent,15);path([[f.x-1,f.y-5],[f.tx-1,f.ty-5]],'#fff6c44d',3);ellipse(f.x,f.y,10,10,'#c5aa73');ellipse(f.x,f.y,4,4,'#3c4d54');}
// Tail marks are visual only; the lit helmet is the collision body.
trail.forEach((p,i)=>ellipse(p.x,p.y,2+i*.22,2+i*.22,accent+Math.floor(i/trail.length*65).toString(16).padStart(2,'0')));
const b=s.ball;ellipse(b.x,b.y,20,20,accent+'16');ellipse(b.x,b.y+3,11,10,'#061b2988');ellipse(b.x,b.y,10,10,accent);ellipse(b.x,b.y-1,7,7,'#e8ead7');ellipse(b.x,b.y,5.8,4.8,'#263f4a');ellipse(b.x-2,b.y-1,1.1,1.3,'#e5dcab');ellipse(b.x+2,b.y-1,1.1,1.3,'#e5dcab');ellipse(b.x-4,b.y-5,2,1.5,'#fff6d8');
if(s.ready){c.setLineDash([3,6]);path([[200,478],[200,433]],P[3]+'88',2);c.setLineDash([]);path([[194,442],[200,433],[206,442]],P[3],2);}
// Lamp count makes progress readable without instructions.
for(let i=0;i<3;i++){const x=173+i*27,y=581;ellipse(x,y,8,8,s.coins.includes(i)?P[3]:'#435665');star(x,y,5,s.coins.includes(i)?'#fff2c3':'#748787');}for(let i=0;i<8;i++)ellipse(97+i*29,602,2.3,2.3,i<=s.n?P[3]:'#546467');
for(const e of fx){const age=t-e.t;if(age<0||age>1)continue;c.globalAlpha=1-age;if(e.type==='stamp'||e.type==='bump'||e.type==='coin'){c.strokeStyle=e.type==='coin'?accent:P[2];c.lineWidth=2;c.beginPath();c.arc(e.x,e.y,18+age*45,0,7);c.stroke();for(let j=0;j<8;j++)star(e.x+Math.cos(j*.785+(e.i||0))*age*65,e.y+Math.sin(j*.785+(e.i||0))*age*65,3,accent,age*3);if(e.combo>1){c.fillStyle='#f8dca3';c.font='bold 14px Georgia';c.textAlign='center';c.fillText('×'+e.combo,e.x,e.y-27-age*35);}}else if(e.type==='nudge'){c.strokeStyle=accent;c.lineWidth=3;c.setLineDash([8,10]);c.beginPath();c.arc(e.x,e.y,20+age*55,0,7);c.stroke();c.setLineDash([]);}c.globalAlpha=1;}
c.restore();}
return{draw};})();

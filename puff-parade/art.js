export const PALETTES=[
 {bg:'#e8eed9',tile:'#e2e9ca',alt:'#d8e2be',edge:'#80916b',rim:'#b9c89b',leaf:'#6e9973',flower:'#edbdad',water:'#c0d3b6'},
 {bg:'#d9eae0',tile:'#d6e7da',alt:'#c6ded2',edge:'#6d9e92',rim:'#a6ccbd',leaf:'#528a80',flower:'#f2d1c0',water:'#89b9bc'},
 {bg:'#f1e3cb',tile:'#f0dfb7',alt:'#e9d2a3',edge:'#b29162',rim:'#d6bb8d',leaf:'#91a076',flower:'#df9e7c',water:'#c9b593'},
 {bg:'#dee0ec',tile:'#d8dbe9',alt:'#cdd1e1',edge:'#7c829d',rim:'#b8bfd4',leaf:'#82959d',flower:'#d6b3cf',water:'#9aadc8'},
 {bg:'#eee7d3',tile:'#e7e2c1',alt:'#ddd8ae',edge:'#919260',rim:'#c9c699',leaf:'#8eaa7a',flower:'#e7af9e',water:'#c2cca2'}];
function ellipse(c,x,y,rx,ry,col){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=col;c.fill()}
function rr(c,x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.stroke()}}
function line(c,pts,col,width=2){c.beginPath();c.moveTo(...pts[0]);for(const p of pts.slice(1))c.lineTo(...p);c.strokeStyle=col;c.lineWidth=width;c.lineCap='round';c.stroke()}
export function leaf(c,x,y,size,angle,col){c.save();c.translate(x,y);c.rotate(angle);c.beginPath();c.moveTo(0,size*.5);c.bezierCurveTo(-size*.75,0,-size*.4,-size*.8,0,-size);c.bezierCurveTo(size*.5,-size*.7,size*.65,0,0,size*.5);c.fillStyle=col;c.fill();line(c,[[0,size*.2],[0,-size*.6]],'#ffffff35',size*.06);c.restore()}
function flower(c,x,y,r,col){for(let i=0;i<5;i++){const a=i*Math.PI*.4;ellipse(c,x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.55,r*.47,r*.47,col)}ellipse(c,x,y,r*.3,r*.3,'#f2d68f');ellipse(c,x-r*.08,y-r*.1,r*.1,r*.1,'#fff8d5')}
function stem(c,x,y,r,angle,p){c.save();c.translate(x,y);c.rotate(angle);line(c,[[0,0],[r*.15,-r],[0,-r*2]],p.leaf,3);for(let i=0;i<4;i++){leaf(c,(i%2?1:-1)*r*.23,-r*(.4+i*.4),r*.5,i%2?.7:-.7,p.leaf)}c.restore()}
export function puff(c,x,y,r,type,{outfit=0,t=0,blink=false,win=false}={}){c.save();c.translate(x,y);c.scale(r,r);ellipse(c,0,.7,.98,.3,'#3f55352b');const pink=type===1;
 // Small soft feet, then ears and the plump porcelain body.
 ellipse(c,-.45,.65,.33,.21,pink?'#d69a97':'#82b0ae');ellipse(c,.45,.65,.33,.21,pink?'#d69a97':'#82b0ae');
 if(pink){for(const a of [-1,1]){c.save();c.translate(a*.42,-.55);c.rotate(a*(.16+Math.sin(t*2+a)*.03));const g=c.createLinearGradient(-.2,-.9,.2,0);g.addColorStop(0,'#f8d5cb');g.addColorStop(1,'#d89293');ellipse(c,0,-.37,.23,.6,g);ellipse(c,-.02,-.4,.105,.38,'#d18a8c');ellipse(c,-.07,-.55,.04,.19,'#edb2ac');c.restore()}}
 else{c.save();c.rotate(-.15);leaf(c,0,-.85,.39,.35,'#83b0ad');leaf(c,-.16,-.85,.27,-.3,'#98c6bf');c.restore()}
 const g=c.createRadialGradient(-.33,-.5,.03,.15,.2,1.35);g.addColorStop(0,pink?'#ffe8db':'#e0f0e4');g.addColorStop(.48,pink?'#efb6b1':'#aad1c6');g.addColorStop(1,pink?'#ca8b8d':'#6caaa7');ellipse(c,0,-.02,.92,.84,g);
 if(!pink){ellipse(c,0,.28,.52,.45,'#d9e9d9');c.save();c.translate(-.69,.15);c.rotate(.35+Math.sin(t*3)*.05);ellipse(c,0,0,.23,.43,'#8dbdb3');line(c,[[-.08,0],[.03,.15]],'#e0f0dc70',.035);c.restore();c.save();c.translate(.69,.15);c.rotate(-.35-Math.sin(t*3)*.05);ellipse(c,0,0,.23,.43,'#8dbdb3');c.restore()}
 // Brow shine and cheek light avoid the flat disc appearance.
 ellipse(c,-.29,-.47,.3,.12,pink?'#fff0e15c':'#f0ffee5c');ellipse(c,-.46,.21,.19,.11,pink?'#df8d936e':'#e2ac9d8a');ellipse(c,.46,.21,.19,.11,pink?'#df8d936e':'#e2ac9d8a');
 for(const a of [-1,1]){if(blink||win){c.beginPath();c.arc(a*.29,-.06,.10,Math.PI,Math.PI*2);c.strokeStyle='#46534b';c.lineWidth=.055;c.stroke()}else{ellipse(c,a*.29,-.06,.065,.09,'#47534d');ellipse(c,a*.29-.018,-.09,.021,.025,'#fff5df')}}
 if(pink){ellipse(c,0,.14,.075,.045,'#bc737b');line(c,[[0,.18],[0,.25],[-.06,.29]],'#a96970',.025);line(c,[[0,.25],[.06,.29]],'#a96970',.025)}else{c.beginPath();c.moveTo(-.12,.1);c.quadraticCurveTo(0,.04,.12,.1);c.quadraticCurveTo(.1,.26,0,.28);c.quadraticCurveTo(-.08,.24,-.12,.1);c.fillStyle='#d9aa63';c.fill();line(c,[[-.08,.14],[.08,.14]],'#f2d98f',.03)}
 if(outfit&&pink){if(outfit===1){for(let i=0;i<3;i++)flower(c,-.36+i*.35,-.67+Math.abs(i-1)*.08,.18,['#e9c3a9','#f4dfa3','#d9c6df'][i]);leaf(c,-.61,-.64,.2,-.8,'#7e9c6e');leaf(c,.61,-.64,.2,.8,'#7e9c6e')}
 if(outfit===2){c.save();c.translate(.64,-.55);c.rotate(.5);ellipse(c,-.13,0,.23,.15,'#bb929f');ellipse(c,.13,0,.23,.15,'#bb929f');ellipse(c,0,0,.09,.11,'#dec3c4');c.restore()}
 if(outfit===3){c.beginPath();c.moveTo(-.46,-.65);c.lineTo(-.52,-1);c.lineTo(-.21,-.82);c.lineTo(0,-1.14);c.lineTo(.21,-.82);c.lineTo(.52,-1);c.lineTo(.46,-.65);c.closePath();c.fillStyle='#e1bb69';c.fill();line(c,[[-.4,-.7],[.4,-.7]],'#fff0ad',.06);ellipse(c,0,-.88,.07,.07,'#d38c86')}}c.restore()}
export class GardenArt{
 constructor(canvas){this.canvas=canvas;this.c=canvas.getContext('2d');this.bg=document.createElement('canvas');this.bg.width=this.bg.height=640;this.key='';this.fx=[];this.anim=[];this.elapsed=0;this.spark=0;this.preview=null;this.hint=null;this.paused=false}
 resize(){const rect=this.canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,1.5);this.canvas.width=Math.round(rect.width*dpr);this.canvas.height=Math.round(rect.height*dpr)}
 board(s,profile){const p=PALETTES[s.stage===0?0:[0,0,1,2,3,4][s.stage]],key=s.stage+'|'+profile.best.join(',');if(this.key===key)return;this.key=key;const c=this.bg.getContext('2d');c.clearRect(0,0,640,640);
 // Freestanding carved tray: multiple inset edges and a softened shadow.
 c.shadowColor='#3c5c3b30';c.shadowBlur=20;c.shadowOffsetY=15;rr(c,12,20,616,608,45,p.edge);c.shadowBlur=0;c.shadowOffsetY=0;rr(c,12,13,616,605,44,p.rim);const rim=c.createLinearGradient(0,10,640,640);rim.addColorStop(0,'#f5f1d9');rim.addColorStop(.45,p.rim);rim.addColorStop(1,p.edge);rr(c,18,14,604,600,40,rim);rr(c,25,22,590,590,32,'#edf0d1');rr(c,29,34,582,582,25,p.edge);
 const n=s.b.length,z=576/n;for(let x=0;x<n;x++)for(let y=0;y<n;y++){rr(c,32+x*z+1,38+y*z+1,z-2,z-2,Math.min(11,z*.1),((x+y)%2?p.tile:p.alt));line(c,[[32+x*z+8,38+y*z+3],[32+(x+1)*z-8,38+y*z+3]],'#ffffff4a',1.5);for(let j=0;j<3;j++){const dx=32+x*z+z*(.15+j*.3),dy=38+y*z+z*(.75+Math.sin(x+y+j)*.08);ellipse(c,dx,dy,.9,1.2,'#7b985a14')}}
 // Brass corner medallions plus foliage growing over the rim, away from hit targets.
 for(const [x,y,a] of [[24,28,.4],[615,30,1.6],[21,605,-1.1],[618,603,-2.5]]){stem(c,x,y,17,a,p);flower(c,x,y,11,p.flower);ellipse(c,x+9,y+10,2,2,'#fff3ce')}
 for(let i=0;i<6;i++){const x=102+i*86;ellipse(c,x,23,2.2,2.2,'#c0a36d');ellipse(c,x-.7,22.2,.8,.8,'#fff0b5')}
 // Themed edge details form a consistent collection instead of arbitrary new scenery.
 if(s.stage===2){for(let i=0;i<3;i++){ellipse(c,555+i*13,623,13,3.5,'#82aaa44d');leaf(c,560+i*13,620,8,1.6,p.leaf)}flower(c,589,618,7,'#f5dbd1')}
 if(s.stage===3){for(let i=0;i<3;i++){ellipse(c,60+i*15,622,9,7,'#dfac78');ellipse(c,57+i*15,619,3,1.4,'#f4d2a0')}}
 if(s.stage===4){for(let i=0;i<7;i++)ellipse(c,80+i*75,625,1.5,1.5,'#e5dcaf')}
 if(s.stage===5){line(c,[[40,13],[320,8],[600,13]],'#a3aa7d',1);for(let i=0;i<13;i++){const x=50+i*44;c.beginPath();c.moveTo(x,14);c.lineTo(x+22,14);c.lineTo(x+11,34);c.fillStyle=['#d9a497','#edce89','#a4beb0'][i%3];c.fill()}}
 }
 impact(change){const n=this.n,z=576/n;const all=[[change.x,change.y],...change.flips];for(let i=0;i<all.length;i++){const [x,y]=all[i];this.anim.push({x,y,from:i?3-change.player:0,to:change.player,age:-i*.075});for(let j=0;j<5;j++){const a=j*Math.PI*.4;this.fx.push({x:32+(x+.5)*z,y:38+(y+.5)*z,vx:Math.cos(a)*22,vy:Math.sin(a)*22-20,age:-i*.075,life:.7,col:change.player===1?'#e4a29d':'#8ebeba',r:2+j%2})}}this.fx=this.fx.slice(-160);this.spark=.7;}
 update(dt){this.elapsed+=dt;this.anim.forEach(a=>a.age+=dt);this.anim=this.anim.filter(a=>a.age<.6);for(const p of this.fx){p.age+=dt;if(p.age>0){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=44*dt}}this.fx=this.fx.filter(p=>p.age<p.life);this.spark=Math.max(0,this.spark-dt)}
 draw(s,profile,moves,active){this.board(s,profile);const c=this.c,W=this.canvas.width;c.setTransform(W/640,0,0,W/640,0,0);c.clearRect(0,0,640,640);c.drawImage(this.bg,0,0);const n=s.b.length,z=576/n;this.n=n;const p=PALETTES[[0,0,1,2,3,4][s.stage]],t=this.elapsed;
 if(active&&s.turn===1&&!s.ended)for(const m of moves){const x=32+(m.x+.5)*z,y=38+(m.y+.5)*z;const selected=this.preview?.x===m.x&&this.preview?.y===m.y||this.hint?.x===m.x&&this.hint?.y===m.y;c.save();ellipse(c,x,y+z*.08,z*.29,z*.18,selected?'#faf7d6':'#f3f3ce88');c.strokeStyle=selected?'#d39b66':'#8fa879';c.lineWidth=selected?3:1.6;c.setLineDash([3,4]);c.beginPath();c.ellipse(x,y+z*.08,z*(.25+Math.sin(t*2)*.01),z*.25,0,0,Math.PI*2);c.stroke();c.setLineDash([]);leaf(c,x-z*.07,y,z*.16,-.5,selected?'#bf8c59':'#8fa875');leaf(c,x+z*.06,y+z*.01,z*.13,.8,selected?'#cfa674':'#a5b98c');c.fillStyle='#71895b';c.font=`bold ${z*.13}px Trebuchet MS`;c.textAlign='center';c.fillText('+'+m.flips.length,x,y+z*.36);c.restore()}
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){const a=this.anim.find(a=>a.x===x&&a.y===y);let v=s.b[x][y],scale=1,hop=0,squash=1;if(a){if(a.age<0)v=a.from;else{const u=Math.min(a.age/.45,1);v=a.from?(u<.5?a.from:a.to):a.to;squash=a.from?Math.max(.08,Math.abs(Math.cos(u*Math.PI))):1;hop=-Math.sin(u*Math.PI)*z*.24;scale=a.from?1:.65+.35*Math.min(1,u*2)}}if(!v)continue;const px=32+(x+.5)*z,py=38+(y+.5)*z+z*.07+hop;
 const inpreview=active&&this.preview?.flips.some(q=>q[0]===x&&q[1]===y);if(inpreview){c.strokeStyle='#f3c77c';c.lineWidth=3;c.beginPath();c.ellipse(px,py,z*.41,z*.38,0,0,Math.PI*2);c.stroke()}
 c.save();c.translate(px,py);c.scale(squash*scale,scale);puff(c,0,0,z*.34,v,{outfit:profile.outfit,t:t+(x+y)*.3,blink:Math.sin(t*.7+x*2+y*7)>.997,win:s.ended&&s.result==='win'});c.restore();if(s.last?.x===x&&s.last?.y===y){ellipse(c,px,38+(y+1)*z-z*.07,2.2,2.2,'#f7ecc3')}}
 for(const q of this.fx){if(q.age<0)continue;c.globalAlpha=1-q.age/q.life;ellipse(c,q.x,q.y,q.r,q.r*.7,q.col)}c.globalAlpha=1;
 if(s.ended&&s.result==='win'){for(let i=0;i<14;i++){const a=i*2.4+t*.1,x=320+Math.sin(a)*296,y=320+Math.cos(a*.8)*290;flower(c,x,y,3+Math.sin(t+i),p.flower)}}
 }
}

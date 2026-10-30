(function(root){'use strict';
const W=360,H=500,P=[[104,162],[256,162],[303,274],[256,384],[104,384],[57,274],[180,274]],images={},stamp=new URL(document.currentScript.src).search;
let ready=0,errors=0;const thumbs=new Map();
for(const n of['day','dusk','night','props','keepsakes']){const im=new Image();images[n]=im;im.decoding='async';im.onload=()=>{ready++;document.documentElement.dataset.artReady=ready+'/5';window.dispatchEvent(new Event('shellartready'));};im.onerror=()=>{ready++;errors++;document.documentElement.dataset.artReady=ready+'/5';document.documentElement.dataset.artErrors=errors;};im.src='assets/'+n+'.webp'+stamp;}
const rect=(g,x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
function text(g,t,x,y,size=9,c='#fff3d6'){g.font='bold '+size+'px monospace';g.textAlign='center';g.textBaseline='middle';g.fillStyle=c;g.fillText(t,Math.round(x),Math.round(y));}
function sprite(g,name,i,x,y,w,h){const im=images[name],b=ShellSprites[name]?.[i];if(!im?.complete||!im.naturalWidth||!b)return false;const z=Math.min(w/b.w,h/b.h);g.drawImage(im,b.x,b.y,b.w,b.h,x-b.w*z/2,y-b.h*z/2,b.w*z,b.h*z);return true;}
function thumb(i){if(thumbs.has(i))return thumbs.get(i);if(!images.keepsakes?.naturalWidth)return'assets/icon.webp';const c=document.createElement('canvas');c.width=192;c.height=192;const g=c.getContext('2d');g.imageSmoothingEnabled=false;sprite(g,'keepsakes',i,96,96,178,178);const u=c.toDataURL('image/png');thumbs.set(i,u);return u;}
function pearl(g,x,y,size=15){if(!sprite(g,'props',2,x,y,size,size)){g.fillStyle='#fff2d3';g.beginPath();g.arc(x,y,size/2,0,Math.PI*2);g.fill();rect(g,x-2,y-3,3,3,'#fff');}}
function star(g,x,y,c='#ffe0a1',scale=1){rect(g,x-2*scale,y,5*scale,scale,c);rect(g,x,y-2*scale,scale,5*scale,c);rect(g,x-scale,y-scale,3*scale,3*scale,c);}
function plate(g,t,x,y,w=30,c='#173e52'){rect(g,x-w/2-1,y-9,w+2,19,'#e8d3a0');rect(g,x-w/2,y-8,w,17,c);text(g,t,x,y,10);}
function arrow(g,a,b,t,color){const dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy),ux=dx/d,uy=dy/d;const from=47,to=d-47;if(to<=from)return;g.save();g.strokeStyle=color;g.lineWidth=1.5;g.setLineDash([1.6,5]);g.lineDashOffset=-t*7;g.beginPath();g.moveTo(a[0]+ux*from,a[1]+uy*from);g.lineTo(a[0]+ux*to,a[1]+uy*to);g.stroke();g.setLineDash([]);const x=a[0]+ux*(to-1),y=a[1]+uy*(to-1);g.fillStyle=color;g.beginPath();g.moveTo(x+ux*4,y+uy*4);g.lineTo(x-ux*3-uy*3,y-uy*3+ux*3);g.lineTo(x-ux*3+uy*3,y-uy*3-ux*3);g.closePath();g.fill();g.restore();}
function draw(g,s,l,fx,t,gentle,preview=-1,guide=-1,ribbon=0){
 g.imageSmoothingEnabled=false;const bg=images[['day','dusk','night'][l.scene]];if(bg?.complete&&bg.naturalWidth)g.drawImage(bg,0,0,W,H);else{rect(g,0,0,W,H,['#aed1c8','#969ebc','#224b68'][l.scene]);for(let i=0;i<40;i++)rect(g,(i*79)%W,(i*37)%H,11,1,'#b9d7cf');}
 // Quiet inset reflection: art stays scenery; every shell, pearl and path is live.
 g.fillStyle=l.scene===2?'#0c2b4a33':'#daf0e54d';g.beginPath();g.ellipse(180,274,164,164,0,0,Math.PI*2);g.fill();
 for(let i=0;i<7;i++)arrow(g,P[i],P[(i+1)%7],gentle?0:t,l.scene===2?'#a1cfd0bb':'#527e8acc');
 let v=s.pending?ShellCore.frame(s.pits,s.pending.source,s.pending.age):{pits:s.pits,bank:0,held:0,flight:null,landed:0};const bank=s.bank+v.bank,selection=preview>=0?preview:guide;
 let q=selection>=0?ShellCore.plan(s.pits,selection):null,adds=[0,0,0,0,0,0,0];if(q)q.drops.forEach(d=>adds[d]++);
 for(let i=0;i<6;i++){
  let[x,y]=P[i];const pulse=fx.find(f=>f.kind==='land'&&f.slot===i),bounce=pulse&&!gentle?Math.sin(Math.min(1,pulse.age/.24)*Math.PI)*3:0;
  if(i===selection||(s.moves===0&&l.id===1&&i===5)){g.fillStyle='#ffe1a359';g.beginPath();g.ellipse(x,y+10,49+(gentle?0:Math.sin(t*3)*2),33,0,0,Math.PI*2);g.fill();g.strokeStyle='#fff0bd';g.lineWidth=2;g.stroke();}
  g.fillStyle='#163d5527';g.beginPath();g.ellipse(x,y+30,39,10,0,0,Math.PI*2);g.fill();
  if(!sprite(g,'props',0,x,y+bounce,92,74)){g.fillStyle='#f7dbd3';g.beginPath();g.ellipse(x,y,42,29,0,0,Math.PI*2);g.fill();g.strokeStyle='#597894';g.stroke();}
  const n=v.pits[i],size=n===1?19:13;
  for(let j=0;j<n;j++){let px=n===1?x:x+((j%4)-1.5)*13,py=n===1?y+9:y+1+Math.floor(j/4)*10;pearl(g,px,py+bounce,size);}
  plate(g,String(n),x,y+42,24,n?'#214d60':'#526e7a');text(g,String(i+1),x-39,y+28,7,l.scene===2?'#c6d6d5':'#355b6b');
  if(q&&adds[i])plate(g,'+'+adds[i],x+30,y-28,25,'#825871');
 }
 const jarPulse=fx.find(f=>f.kind==='land'&&f.slot===6);if(jarPulse){g.strokeStyle='#ffedaa'+Math.max(0,Math.round((1-jarPulse.age/.65)*180)).toString(16).padStart(2,'0');g.lineWidth=2;g.beginPath();g.ellipse(180,281,42+jarPulse.age*27,31+jarPulse.age*20,0,0,Math.PI*2);g.stroke();}
 const complete=ShellCore.sum(s.pits)===0&&!s.pending;
 if(complete){sprite(g,'props',3,180,272,97,112);}else{
  if(!sprite(g,'props',1,180,269,94,98)){rect(g,147,236,66,75,'#5d98a777');g.strokeStyle='#dfeddb';g.strokeRect(147,236,66,75);}
  g.save();g.beginPath();g.ellipse(180,278,33,29,0,0,Math.PI*2);g.clip();for(let j=0;j<bank;j++){let row=Math.floor(j/4),x=180+((j%4)-1.5)*13+(row%2?3:0),y=294-row*12;pearl(g,x,y,15);}g.restore();
  rect(g,149,262,2,20,'#f0ffff80');rect(g,153,260,2,12,'#f0ffff99');rect(g,200,280,2,9,'#c2ffff66');
 }
 if(ribbon){g.strokeStyle=ribbon===1?'#91e4da':'#e1a9ec';g.lineWidth=4;g.beginPath();g.ellipse(180,246,32,8,0,0,Math.PI*2);g.stroke();star(g,208,252,ribbon===1?'#b3fff0':'#f1cbff',1.5);}
 plate(g,bank+' / '+ShellCore.sum(l.pits),180,337,64,complete?'#2b6f70':'#173e52');text(g,'HOME',180,354,7,l.scene===2?'#c8e2d9':'#41667c');
 if(q&&adds[6])plate(g,'+'+adds[6],180,209,28,'#825871');
 if(v.held){const pos=P[s.pending.source];for(let j=0;j<v.held;j++)pearl(g,pos[0]-14+(j%5)*7,pos[1]-39-Math.floor(j/5)*7,8);}
 if(v.flight){let a=P[v.flight.from],b=P[v.flight.to],f=Math.min(1,v.flight.phase),x=a[0]+(b[0]-a[0])*f,y=a[1]+(b[1]-a[1])*f-Math.sin(f*Math.PI)*(gentle?10:27);if(!gentle){for(let z=1;z<4;z++){let ff=Math.max(0,f-z*.07);rect(g,a[0]+(b[0]-a[0])*ff,a[1]+(b[1]-a[1])*ff-Math.sin(ff*Math.PI)*27,2,2,'#fff4c9a0');}}pearl(g,x,y,17);}
 if(l.id===1&&!s.moves&&!s.pending){rect(g,75,99,210,23,'#164353e8');text(g,'TAP THE SHELL. FILL THE JAR.',180,111,8);text(g,'›',110,269,18,'#fff0bc');}
 if(guide>=0){rect(g,104,100,152,22,'#164353eb');text(g,'NEXT: SHELL '+(guide+1),180,111,9);}
 // Tiny environment animations are fixed-step, not physics or additional rules.
 if(!gentle){for(let k=0;k<7;k++){const x=28+(k*67)%310,y=49+Math.sin(t*.7+k*1.4)*4+(k%2)*404;if(Math.sin(t*1.8+k)>0.6)star(g,x,y,l.scene===2?'#b0ecdf':'#fff9d5',.6);}if(l.scene<2){for(let k=0;k<3;k++){let x=(t*5+k*123)%390-15;rect(g,x,63+k*5,5,1,'#f7efdc');rect(g,x+2,62+k*5,1,1,'#f7efdc');}}}
 for(const f of fx){if(f.kind==='spark')star(g,f.x+f.vx*f.age,f.y+f.vy*f.age+f.age*f.age*40,['#ffe0a1','#b9eee3','#e7b5dc'][f.c%3],f.age>.4?.7:1);if(f.kind==='word'){g.globalAlpha=Math.max(0,1-f.age/1.3);text(g,f.text,180,83-f.age*9,10);g.globalAlpha=1;}}
 if(complete){text(g,'A LITTLE TIDE, SAFELY HOME.',180,436,8,l.scene===2?'#d3eee4':'#315e71');}
}
root.ShellArt={W,H,P,draw,sprite,thumb};
})(globalThis);

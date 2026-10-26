import {neighbor} from './model.js';
const COLORS=['#f49a9a','#8ccab5','#bbb0df','#efd18c'];
export class Art{
 constructor(canvas,frames){this.c=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.frames=frames;this.atlas=new Image();this.fx=[];this.flights=[];this.words=[];this.visual=new Map();this.t=0;this.reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;}
 async load(){this.atlas.src='assets/atlas-1026b.webp';await this.atlas.decode();this.back=document.createElement('canvas');this.back.width=600;this.back.height=900;const keep=this.ctx;this.ctx=this.back.getContext('2d');this.background();this.ctx=keep;}
 sprite(n,x,y,w,h,rot=0){const c=this.ctx,f=this.frames[n];if(!f)return;const scale=Math.min(w/f[2],h/f[3]),dw=f[2]*scale,dh=f[3]*scale;c.save();c.translate(x,y);c.rotate(rot);c.drawImage(this.atlas,...f,-dw/2,-dh/2,dw,dh);c.restore();}
 rr(x,y,w,h,r,fill,stroke){const c=this.ctx;c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
 circle(x,y,r,fill,stroke){const c=this.ctx;c.beginPath();c.arc(x,y,r,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
 text(s,x,y,size=18,color='#eadab4',font='Georgia'){const c=this.ctx;c.fillStyle=color;c.textAlign='center';c.textBaseline='middle';c.font=`${size}px ${font}`;c.fillText(s,x,y);}
 background(){const c=this.ctx;let g=c.createLinearGradient(0,0,600,900);g.addColorStop(0,'#80583d');g.addColorStop(.5,'#b98b5e');g.addColorStop(1,'#83593e');c.fillStyle=g;c.fillRect(0,0,600,900);
  for(let k=0;k<75;k++){c.beginPath();c.strokeStyle=k%3?'#4f311c12':'#f8db991b';c.lineWidth=k%7===0?2:1;for(let y=0;y<=900;y+=12){let x=k*8+Math.sin(y*.012+k*3)*5+Math.sin(y*.003+k)*12;y?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}
  for(let y=125;y<900;y+=260){c.strokeStyle='#452d2538';c.lineWidth=3;c.beginPath();c.moveTo(0,y);c.lineTo(600,y);c.stroke();c.strokeStyle='#ffe0ab26';c.lineWidth=1;c.beginPath();c.moveTo(0,y+3);c.lineTo(600,y+3);c.stroke();}
  // Embossed leather work mat, with a quiet, readable central play area.
  c.shadowColor='#291a2066';c.shadowBlur=16;c.shadowOffsetY=9;this.rr(24,145,552,570,32,'#315d5c');c.shadowBlur=0;c.shadowOffsetY=0;
  g=c.createLinearGradient(24,145,550,720);g.addColorStop(0,'#56817a');g.addColorStop(1,'#24494c');this.rr(28,147,544,560,29,g,'#c8ab7088');c.setLineDash([3,7]);c.lineWidth=1;this.rr(37,157,526,540,22,null,'#d9c69570');c.setLineDash([]);
  // Gentle top light, stationery, natural props and ivory tool labels.
  c.save();c.translate(132,80);c.rotate(-.1);c.shadowBlur=7;c.shadowColor='#26180e55';this.rr(-91,-44,182,88,10,'#eadcbc','#b29d73');c.shadowBlur=0;for(let n=0;n<4;n++){c.strokeStyle='#84978b40';c.beginPath();c.moveTo(-66,-13+n*14);c.lineTo(64,-13+n*14);c.stroke();}c.restore();
  this.sprite(12,48,79,90,130);this.sprite(14,544,91,90,117);this.sprite(13,70,816,125,100);this.sprite(15,516,817,136,132,-.3);
  this.rr(180,859,240,26,12,'#6c5035','#d8bc7c88');this.text('THE LITTLE PEARL WORKSHOP',300,872,10,'#e8d7ad','sans-serif');
 }
 event(e,s){if(e.type==='match'){
   const x=50+(e.i%2)*250+125,y=175+(e.i>>1)*250+125;
   for(let k=0;k<4;k++)this.flights.push({x:x+Math.cos(k*Math.PI/2)*76,y:y+Math.sin(k*Math.PI/2)*76,color:e.color,t:0,delay:k*.07});
   for(let k=0;k<(this.reduce?9:32);k++){const a=Math.PI*2*k/32;this.fx.push({x,y,vx:Math.cos(a)*(35+k%7*15),vy:Math.sin(a)*(35+k%9*12),t:0,life:.7+k%5*.08,color:COLORS[e.color],size:2+k%4});}
   this.words.push({x,y,t:0,text:e.groups>1?'Another little treasure!':'A perfect little set!'});
  }else if(e.type==='send'||e.type==='rotate'){this.words=this.words.filter(w=>w.t<.5);}
  this.fx=this.fx.slice(-140);this.flights=this.flights.slice(-16);this.words=this.words.slice(-2);
 }
 update(dt){this.t+=dt;for(const f of this.fx){f.t+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=80*dt;}this.fx=this.fx.filter(f=>f.t<f.life);for(const f of this.flights)f.t+=dt;this.flights=this.flights.filter(f=>f.t<1.15+f.delay);for(const w of this.words)w.t+=dt;this.words=this.words.filter(w=>w.t<1.6);}
 draw(s,p,guide){const c=this.ctx;c.drawImage(this.back,0,0);let tint=p.skin===1?'#b993c31b':p.skin===2?'#a1e0bf16':null;if(tint){c.fillStyle=tint;c.fillRect(0,0,600,900);}
  // Mascot reacts to the actual match, and shares the exact cover/icon identity.
  const delighted=this.words.length>0,pose=delighted?9:s.busy()?10:8;this.sprite(pose,410,76+(this.reduce?0:Math.sin(this.t*1.7)*2),142,151);
  this.text('FOUR OF A KIND',152,69,13,'#526e61','sans-serif');const recipes=[...new Set(s.puzzle.grid.flat().filter(c=>c>=0))];for(let n=0;n<recipes.length;n++)this.sprite(recipes[n],108+n*43,101,30,30);
  for(let i=0;i<4;i++){const x=50+i%2*250,y=175+(i>>1)*250,active=s.puzzle.active.includes(i);if(!active){c.globalAlpha=.22;this.sprite(4,x+125,y+125,226,226);c.globalAlpha=1;this.sprite(i===2?13:15,x+125,y+125,135,135,i===2?.2:-.2);continue;}
   c.save();c.shadowColor='#102a2e66';c.shadowBlur=13;c.shadowOffsetY=9;this.circle(x+125,y+125,112,'#ead9b7');c.restore();this.sprite(p.skin===2?5:4,x+125,y+125,238,238);
   for(let d=0;d<4;d++){const px=x+125+[0,77,0,-77][d],py=y+125+[-77,0,77,0][d];this.circle(px,py,35,'#bfa88044','#b39a6c55');this.circle(px,py+2,28,'#ad9f8d1c');}
   const empty=s.tiles[i].view().length===0;
   this.circle(x+125,y+129,33,empty?'#b8c4ae':'#2d6463','#a98850');this.circle(x+125,y+125,32,empty?'#c6ceb6':'#3b7470','#e5d7ad');this.text(empty?'✧':'↶',x+125,y+123,33,empty?'#8a9b81':'#f5e3ba');
   for(const d of s.tiles[i].view()){
    const key=i+':'+d.pos;let pos=this.visual.get(key);const dest={x:50+d.x+38.5,y:175+d.y+38.5};if(!pos||s.moves===0||this.reduce){pos={...dest};this.visual.set(key,pos);}else {pos.x+=(dest.x-pos.x)*.62;pos.y+=(dest.y-pos.y)*.62;}
    c.save();c.shadowColor='#503b3655';c.shadowBlur=5;c.shadowOffsetY=4;this.sprite(d.color,pos.x,pos.y,75,75);c.restore();
    const worldDir=(d.pos+s.tiles[i].orientation)%4,j=neighbor(i,worldDir);if(!s.busy()&&s.puzzle.active.includes(j)&&s.slots(j)[(worldDir+2)%4]<0){
     const a=worldDir*Math.PI/2-Math.PI/2;const ax=dest.x+Math.cos(a)*39,ay=dest.y+Math.sin(a)*39;c.save();c.translate(ax,ay);c.rotate(a);c.fillStyle='#fff0c9';c.shadowColor='#264347';c.shadowBlur=2;c.beginPath();c.moveTo(9,0);c.lineTo(-2,-5);c.lineTo(-2,5);c.fill();c.restore();
    }
   }
  }
  for(const m of s.marbles){const x=50+m.xpos+38.5,y=175+m.ypos+38.5;c.save();c.shadowBlur=9;c.shadowColor='#ffe3a299';this.sprite(m.color,x,y,77,77,(m.frame%6)*.015);c.restore();}
  if(guide&&!s.busy()){
   const x=50+guide.i%2*250+125+(guide.kind==='send'?[0,77,0,-77][guide.d]:0),y=175+(guide.i>>1)*250+125+(guide.kind==='send'?[-77,0,77,0][guide.d]:0);
   const pulse=this.reduce?0:Math.sin(this.t*4)*3;c.lineWidth=3;this.circle(x,y,guide.kind==='send'?43+pulse:39+pulse,null,'#fff5c2');this.circle(x,y,guide.kind==='send'?48+pulse:44+pulse,null,'#f5cf7d66');this.text('↓',x,y-66,31,'#fff3bf');
  }
  this.sprite(this.flights.length||s.groups?6:7,300,787,164,150);
  if(s.groups)for(let k=0;k<s.groups;k++)this.sprite(s.collection[k],275+k*24,797,23,23);
  for(const f of this.flights){if(f.t<f.delay)continue;const t=Math.min(1,(f.t-f.delay)/.85),e=1-(1-t)**3,x=f.x+(300-f.x)*e,y=f.y+(786-f.y)*e-Math.sin(t*Math.PI)*105;this.sprite(f.color,x,y,58*(1-t*.55),58*(1-t*.55),t*.5);}
  for(const f of this.fx){c.globalAlpha=1-f.t/f.life;this.circle(f.x,f.y,f.size,f.color);c.globalAlpha=1;}
  for(const w of this.words){c.globalAlpha=Math.min(1,(1.6-w.t)*2);c.shadowColor='#102f3d';c.shadowBlur=5;this.text(w.text,w.x,w.y-60-Math.min(w.t,.8)*18,20,'#fff0c8');c.shadowBlur=0;c.globalAlpha=1;}
 }
 reset(){this.fx=[];this.words=[];this.flights=[];this.visual.clear();}
}

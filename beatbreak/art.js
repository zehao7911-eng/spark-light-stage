(()=>{'use strict';let canvas,cx,scale=1,w=480,h=640,glow,cyanGlow;const pink='#ff287b',cyan='#52edf1';
function glowTex(color){let c=document.createElement('canvas');c.width=c.height=128;let g=c.getContext('2d'),r=g.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,color+'66');r.addColorStop(.3,color+'22');r.addColorStop(1,color+'00');g.fillStyle=r;g.fillRect(0,0,128,128);return c;}
function line(x,y,tx,ty,col,width=1){cx.strokeStyle=col;cx.lineWidth=width;cx.beginPath();cx.moveTo(x,y);cx.lineTo(tx,ty);cx.stroke();}
function poly(ps,col){cx.fillStyle=col;cx.beginPath();ps.forEach((p,i)=>i?cx.lineTo(...p):cx.moveTo(...p));cx.closePath();cx.fill();}
function circle(x,y,r,col,stroke=false){cx.beginPath();cx.arc(x,y,r,0,7);if(stroke){cx.strokeStyle=col;cx.stroke();}else{cx.fillStyle=col;cx.fill();}}
function rect(x,y,w,h,col){cx.fillStyle=col;cx.fillRect(x,y,w,h);}
function viewport(){let r=canvas.getBoundingClientRect();scale=Math.min(r.width,r.height)/480;w=r.width/scale;h=r.height/scale;let dpr=Math.min(1.5,devicePixelRatio||1);let bw=Math.round(r.width*dpr),bh=Math.round(r.height*dpr);if(canvas.width!==bw||canvas.height!==bh){canvas.width=bw;canvas.height=bh;}return{w,h,scale,dpr,bw,bh};}
function shape(x,y,r,angle,skin,color){cx.save();cx.translate(x,y);cx.rotate(angle);if(skin===1){poly([[0,-r*1.4],[r*1.4,0],[0,r*1.4],[-r*1.4,0]],color);}else if(skin===2){cx.lineWidth=5;circle(0,0,r,color,true);}else rect(-r,-r,r*2,r*2,color);cx.restore();}
function draw(s,fx,trail,gesture,soft){let v=viewport();cx.setTransform(v.dpr,0,0,v.dpr,0,0);cx.clearRect(0,0,v.bw,v.bh);cx.scale(scale,scale);rect(0,0,w,h,'#080d13');let beat=s.time*BeatEngine.tracks[s.n].bpm/60,pulse=Math.pow(1-beat%1,3),sw=soft?0:s.shake*12;
 cx.save();cx.translate(sw*Math.sin(s.time*84),sw*Math.cos(s.time*65));
 // Sparse stage architecture stays quieter than every hazardous pink shape.
 let g=cx.createRadialGradient(w*.5,h*.5,20,w*.5,h*.5,Math.max(w,h)*.7);g.addColorStop(0,'#102333');g.addColorStop(1,'#080d13');cx.fillStyle=g;cx.fillRect(0,0,w,h);
 cx.globalAlpha=.09;for(let x=0;x<w;x+=48)line(x,0,x,h,'#7bced5');for(let y=0;y<h;y+=48)line(0,y,w,y,'#7bced5');cx.globalAlpha=1;
 let zone=48;for(let x=0;x<w;x+=zone){let height=4+Math.abs(Math.sin(x*.036+s.time*.8))*10+pulse*7;rect(x+7,h-height,zone-14,height,'#23404c');rect(x+7,0,zone-14,height*.4,'#182f3b');}
 cx.lineWidth=1;cx.strokeStyle='#396c7955';cx.strokeRect(8,8,w-16,h-16);for(let [x,y,sx,sy]of[[9,9,1,1],[w-9,9,-1,1],[9,h-9,1,-1],[w-9,h-9,-1,-1]]){line(x,y,x+20*sx,y,'#71dce2',2);line(x,y,x,y+20*sy,'#71dce2',2);}
 // A schematic face is the last track's rhythmic stage performer, not a hidden collision object.
 if(s.n===5){let bx=w*.5,by=h*.11,r=24+pulse*3;cx.save();cx.translate(bx,by);cx.rotate(Math.sin(beat*.25)*.09);cx.lineWidth=2;circle(0,0,r,'#ff287b55',true);poly([[-13,-5],[-5,-1],[-13,3]],'#ff287b88');poly([[13,-5],[5,-1],[13,3]],'#ff287b88');line(-10,10,10,10,'#ff4f9588',3);cx.restore();}
 for(let n of s.notesOn){let r=10+Math.sin(beat*Math.PI)*1.5;cx.globalAlpha=Math.min(1,n.life);cx.drawImage(cyanGlow,n.x-32,n.y-32,64,64);cx.lineWidth=1;circle(n.x,n.y,r+8+pulse*6,'#65e8ec55',true);shape(n.x,n.y,r,.785,1,'#6ff6ed');rect(n.x-2,n.y-6,3,12,'#caffff');cx.globalAlpha=1;}
 for(let e of s.entities){let warn=e.age<e.warn,fade=Math.min(1,e.life*5);cx.globalAlpha=fade;
 if(e.type==='laser'){let x=e.vertical?e.x:0,y=e.vertical?0:e.y,L=e.vertical?h:w;if(warn){cx.setLineDash([9,9]);let col='#ff448b'+(Math.floor((.22+.22*(e.age/e.warn))*255).toString(16).padStart(2,'0'));line(x,y,e.vertical?x:L,e.vertical?L:y,col,2);cx.setLineDash([]);let label=Math.max(1,Math.ceil((e.warn-e.age)/(60/BeatEngine.tracks[s.n].bpm)));cx.font='bold 12px monospace';cx.fillStyle='#ff9ac0';cx.fillText(label,e.vertical?x+7:10,e.vertical?22:y-9);shape(e.vertical?x:10,e.vertical?12:y,5,.785,0,'#ff4b97');}else{rect(e.vertical?x-e.width/2:0,e.vertical?0:y-e.width/2,e.vertical?e.width:w,e.vertical?h:e.width,pink);rect(e.vertical?x-2:0,e.vertical?0:y-2,e.vertical?4:w,e.vertical?h:4,'#ff9bc9');}}
 else if(e.type==='bar'){cx.save();cx.translate(e.x,e.y);cx.rotate(e.angle);if(warn){cx.setLineDash([10,8]);line(-e.r,0,e.r,0,'#ff65a1aa',2);cx.setLineDash([]);cx.lineWidth=1;circle(0,0,18+Math.sin(s.time*9)*3,'#ff65a166',true);}else{rect(-e.r,-e.width/2,e.r*2,e.width,pink);rect(-e.r,-2,e.r*2,4,'#ff9bc7');for(let x=-e.r;x<e.r;x+=36)poly([[x,-e.width/2],[x+12,-e.width/2],[x+6,-e.width/2-8]],pink);}circle(0,0,15,'#ff62a5');circle(0,0,6,'#080d13');cx.restore();}
 else{let r=e.r;if(warn){cx.lineWidth=2;circle(e.x,e.y,r+4+pulse*4,'#ff6ca799',true);circle(e.x,e.y,3,'#ff6ca7');}else{cx.drawImage(glow,e.x-r*2.5,e.y-r*2.5,r*5,r*5);if(e.type==='saw'){let ps=[];for(let i=0;i<24;i++){let a=i/24*Math.PI*2+s.time*2,rr=i%2?r*.77:r*1.1;ps.push([e.x+Math.cos(a)*rr,e.y+Math.sin(a)*rr]);}poly(ps,pink);circle(e.x,e.y,r*.48,'#080d13');circle(e.x,e.y,r*.17,'#ff80b6');}else{circle(e.x,e.y,r,pink);rect(e.x-r*.28,e.y-r*.4,r*.56,r*.24,'#ff82b3');}}}cx.globalAlpha=1;
 }
 for(let t of trail){cx.globalAlpha=t.life/t.max*.42;shape(t.x,t.y,s.p.r*(t.life/t.max),t.angle,s.profile.skin,t.dash?'#eaffff':cyan);}cx.globalAlpha=1;
 let p=s.p;if(p.inv<=0||soft||Math.floor(s.time*12)%2){cx.drawImage(cyanGlow,p.x-38,p.y-38,76,76);shape(p.x,p.y,p.r,p.dash?Math.atan2(p.dy,p.dx):Math.sin(s.time*2)*.08,s.profile.skin,p.dash?'#fff':cyan);if(p.dash){cx.lineWidth=2;circle(p.x,p.y,19,'#acffff',true);}else rect(p.x-3,p.y-4,3,3,'#d9ffff');}
 if(p.inv>0&&!p.dash){cx.lineWidth=2;circle(p.x,p.y,17,'#d5ffff99',true);}
 if(p.cool<=0){cx.lineWidth=1;circle(p.x,p.y,18+pulse*1.5,'#74f5f144',true);}
 if(gesture){cx.lineWidth=1;circle(gesture.sx,gesture.sy,26,'#8ed5e066',true);let dx=gesture.x-gesture.sx,dy=gesture.y-gesture.sy,len=Math.hypot(dx,dy),max=28;if(len>max){dx*=max/len;dy*=max/len;}circle(gesture.sx+dx,gesture.sy+dy,9,'#a8edf0aa');line(gesture.sx,gesture.sy,gesture.sx+dx,gesture.sy+dy,'#96dbde88',2);}
 for(let f of fx){let a=f.life/f.max;cx.globalAlpha=a;if(f.kind==='ring'){cx.lineWidth=2*a;circle(f.x,f.y,(1-a)*55+5,f.color,true);}else if(f.kind==='text'){cx.fillStyle=f.color;cx.font='bold 13px monospace';cx.fillText(f.text,f.x,f.y);}else shape(f.x,f.y,f.size, f.life*4,0,f.color);}cx.globalAlpha=1;cx.restore();
 if(!soft&&s.flash>0){cx.globalAlpha=s.flash*.6;rect(0,0,w,h,'#ff287b');cx.globalAlpha=1;}
}
window.BeatArt={init(c){canvas=c;cx=c.getContext('2d',{alpha:false});glow=glowTex('#ff287b');cyanGlow=glowTex('#52e8ed');},viewport,draw};
})();

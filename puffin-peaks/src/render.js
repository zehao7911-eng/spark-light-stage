export const atlas=new Image();atlas.src='sprites.webp';export const panorama=new Image();panorama.src='panorama.webp';
const SNOW=['#e9eee3','#eee2df','#d7e2ec'],SHADE=['#c9d9dd','#d1c7d6','#b6cadb'];
export function stamp(c,i,x,y,w,h=w,flip=false,alpha=1){c.save();c.globalAlpha=alpha;c.translate(Math.round(x),Math.round(y));if(flip)c.scale(-1,1);c.imageSmoothingEnabled=false;if(atlas.complete&&atlas.naturalWidth){let sw=atlas.naturalWidth/4,sh=atlas.naturalHeight/3;c.drawImage(atlas,i%4*sw,Math.floor(i/4)*sh,sw,sh,-w/2,-h,w,h);}else{c.fillStyle=i===4?'#52717e':i<4?'#d38275':'#a6bed0';c.fillRect(-w/3,-h,w*.66,h);}c.restore();}
export function draw(canvas,g,visual){const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;const W=canvas.width,H=canvas.height,s=W/720,r=g.run,p=g.skier,sy=H*.27,camY=p.mapPosition[1]-sy/s,theme=Math.floor(g.profile.hill%8/3)%3;
 const xx=x=>W/2+x*s,yy=y=>(y-camY)*s;
 c.fillStyle=SNOW[theme];c.fillRect(0,0,W,H);
 // Repeating large snow shelves and grouped flecks, not random per-frame noise.
 for(let row=Math.floor(camY/160)-1;row<(camY+H/s)/160+1;row++){let by=yy(row*160),sway=Math.sin(row*1.4)*25;c.fillStyle=SHADE[theme];c.globalAlpha=.45;c.beginPath();c.moveTo(0,by);c.lineTo(64+sway,by+9);c.lineTo(90+sway,by+22);c.lineTo(0,by+19);c.fill();c.beginPath();c.moveTo(W,by+65);c.lineTo(W-38-sway,by+68);c.lineTo(W-68-sway,by+93);c.lineTo(W,by+88);c.fill();c.globalAlpha=1;for(let j=0;j<4;j++){let x=((row*71+j*97)%340+340)%340;c.fillStyle=j%2?'#ffffff':'#becfd4';c.fillRect(x,by+45+j*17,4+j%2*4,2);}}
 for(const t of visual.tracks){const y=yy(t.y);if(y<-20||y>H+20)continue;c.fillStyle=SHADE[theme];c.globalAlpha=.66;c.fillRect(xx(t.x)-7,y,2,5);c.fillRect(xx(t.x)+6,y,2,5);}c.globalAlpha=1;
 let objects=g.run.objects.filter(o=>!o.done&&yy(o.y)>-100&&yy(o.y)<H+140).map(o=>({...o,renderY:o.y}));
 const ey=g.run.finish;if(yy(ey)>-80&&yy(ey)<H+160)objects.push({id:'chalet',type:'chalet',x:200,y:ey,renderY:ey});
 for(const gate of r.gates){const y=yy(gate.y);if(y<-40||y>H+90)continue;let a=xx(gate.x-106),b=xx(gate.x+106);c.strokeStyle=gate.hit?'#7faaa1':gate.done?'#bbbcc2':'#cb817c';c.lineWidth=2;c.setLineDash([4,4]);c.beginPath();c.moveTo(a,y-3);c.lineTo(b,y-3);c.stroke();c.setLineDash([]);stamp(c,11,a,y,20,48);stamp(c,11,b,y,20,48,true);if(!gate.done){c.fillStyle='#637c8d';c.font='14px Peaks,monospace';c.textAlign='center';c.fillText('✦',xx(gate.x),y-13);}}
 objects.push({type:'player',x:p.mapPosition[0],y:p.mapPosition[1],renderY:p.mapPosition[1]});objects.sort((a,b)=>a.renderY-b.renderY);
 for(const o of objects){let x=xx(o.x),y=yy(o.y);if(o.type==='player'){
   let h=p.isJumping?Math.sin(Math.PI*(1-p._stateLeft/1000))*26:0;let dx=r.inputX-p.mapPosition[0];let i=p.isJumping?3:dx<-13?1:dx>13?2:0;
   c.fillStyle='#8eacc044';c.fillRect(x-14,y-3,28,6);c.save();c.translate(x,y-h);if(p.isPerformingTrick)c.rotate(Math.floor((1-p._stateLeft/1000)*8)*Math.PI/4);if(p.hasBeenHit)c.rotate(-.55);stamp(c,i,0,0,57,57,false,r.grace>0&&Math.floor(r.time*9)%2===0?.6:1);c.restore();
  }else if(o.type==='pine')stamp(c,4,x,y,69,100);else if(o.type==='rock')stamp(c,5,x,y,47,37);else if(o.type==='stump')stamp(c,6,x,y,40,34);else if(o.type==='ramp')stamp(c,7,x,y,54,50);else if(o.type==='token'){stamp(c,8,x,y+Math.round(Math.sin(r.time*4+o.x)*2),21,21);}else if(o.type==='cocoa')stamp(c,9,x,y,30,36);else stamp(c,10,x,y,112,100);
 }
 for(const q of visual.particles){let y=yy(q.y);c.globalAlpha=Math.max(0,q.life);c.fillStyle=q.color;c.fillRect(xx(q.x),y,q.size,q.size);}c.globalAlpha=1;
 // Foreground drifting square flakes reinforce depth without obscuring gates.
 if(!visual.reduced){for(let i=0;i<24;i++){let x=(i*89+visual.clock*7*(i%2?1:-1)+W*3)%W,y=(i*51+visual.clock*(9+i%4*3))%H;c.fillStyle=i%3===0?'#ffffffaa':'#ffffff66';c.fillRect(Math.round(x),Math.round(y),i%3===0?3:2,2);}}
 if(g.run.state==='ready'&&panorama.complete&&panorama.naturalWidth){c.save();c.globalAlpha=.22;c.drawImage(panorama,0,0,W,H*.35);c.restore();}
 if(p._boostLeft>0){c.strokeStyle='#d9af6d';c.lineWidth=2;for(let i=0;i<5;i++){let x=i%2?W-8:8,y=(visual.clock*130+i*57)%H;c.beginPath();c.moveTo(x,y);c.lineTo(x,y+24);c.stroke();}}
}

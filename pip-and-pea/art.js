(function(root){
 'use strict';
 const SIZE=32,palettes=[{sky:'#111d19',far:'#1b2c23',soil:'#544d36',soil2:'#655c40',grass:'#709159',light:'#a1b67a',leaf:'#4a6946',water:'#263e39'},{sky:'#151f2a',far:'#1c303b',soil:'#4a5360',soil2:'#596879',grass:'#59858a',light:'#94b1a4',leaf:'#3e606d',water:'#29414d'},{sky:'#231e26',far:'#322a31',soil:'#6e574a',soil2:'#856a56',grass:'#a28d59',light:'#d1b57a',leaf:'#795f49',water:'#4d3a3f'}];
 const birdColors=[{body:'#e9e7c6',light:'#fff7d9',shade:'#c5c9a8',outline:'#324632',cheek:'#e5b59a'},{body:'#95b79d',light:'#c8ddba',shade:'#708f7e',outline:'#2d453d',cheek:'#bdc792'},{body:'#c3a7c8',light:'#ecd2dc',shade:'#9b819f',outline:'#463a4f',cheek:'#e0b6bd'}];
 const noise=(x,y)=>{let n=(x*374761393+y*668265263)>>>0;n=((n^(n>>>13))*1274126177)>>>0;return(n^(n>>>16))>>>0};
 const rect=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)};
 const star=(c,x,y,r,color)=>{rect(c,x-r,y,r*2+1,1,color);rect(c,x,y-r,1,r*2+1,color)};
 function pixelRound(c,x,y,w,h,color){rect(c,x+3,y,w-6,h,color);rect(c,x,y+3,w,h-6,color);rect(c,x+1,y+1,w-2,h-2,color)}
 function leaf(c,x,y,color){rect(c,x,y,2,6,color);rect(c,x-3,y-2,4,3,color);rect(c,x+2,y-4,4,3,color)}
 function fruit(c,x,y,type=0,t=0){c.save();c.translate(x,y+Math.round(Math.sin(t*2+x)*.8));c.globalAlpha=.13;pixelRound(c,-12,-12,24,24,'#f4ca88');c.globalAlpha=1;
  if(type===0){pixelRound(c,-7,-6,14,12,'#bc696f');rect(c,-5,6,10,3,'#bc696f');rect(c,-3,9,6,2,'#994c5c');rect(c,-5,-4,4,2,'#f2b2ac');for(const [a,b]of[[-2,-1],[4,1],[-4,4],[1,6]])rect(c,a,b,1,2,'#f5d59d');leaf(c,0,-9,'#8eaa75')}
  else if(type===1){pixelRound(c,-4,-8,8,7,'#dbbf73');pixelRound(c,-7,-2,14,12,'#d8b668');rect(c,-5,0,3,5,'#f0d797');rect(c,-4,9,9,2,'#b59556');leaf(c,1,-11,'#819a6a')}
  else{pixelRound(c,-8,-5,9,9,'#819bc6');pixelRound(c,1,-5,9,9,'#91aad1');pixelRound(c,-3,3,10,8,'#687ca7');rect(c,-6,-3,2,2,'#c2d6e5');rect(c,3,-3,2,2,'#d1dfe9');rect(c,0,5,2,2,'#bac8d7');leaf(c,0,-8,'#83a68b')}
  c.restore();
 }
 function nest(c,x,y,ready,t){c.save();c.translate(x,y);if(ready){c.globalAlpha=.12+.06*Math.sin(t*3);pixelRound(c,-21,-20,42,40,'#edd087');c.globalAlpha=1;for(let i=0;i<5;i++){const a=t*.7+i*Math.PI*.4;star(c,Math.round(Math.cos(a)*21),Math.round(Math.sin(a)*17),i%2+1,'#d6bd7b')}}
  pixelRound(c,-14,-8,28,22,'#564d3b');pixelRound(c,-12,-6,24,18,ready?'#cdb77a':'#877d5f');pixelRound(c,-9,-3,18,11,'#252e23');rect(c,-12,9,24,3,'#958752');rect(c,-10,13,20,2,'#4c543a');rect(c,-9,-6,5,2,'#e4ca8b');rect(c,5,-5,4,2,'#b9a56c');rect(c,-13,0,4,2,'#dbc58b');rect(c,9,2,4,2,'#a78f54');rect(c,-9,7,6,1,'#eddbad');rect(c,3,8,7,1,'#e3c38d');WeaveFont.text(c,'HOME',0,19,ready?'#c1b480':'#69795f',.75);if(ready){star(c,0,1,3,'#f2d895');rect(c,-3,-17,7,3,'#e5d8a6');rect(c,-6,-19,4,3,'#e5d8a6')}
  else{rect(c,-3,-2,7,6,'#829576');rect(c,-1,-5,3,3,'#bcc19b');rect(c,0,0,1,2,'#283a2c')}c.restore();
 }
 function tree(c,x,y,p,scale=1){c.save();c.translate(x,y);c.scale(scale,scale);rect(c,-2,-25,4,38,p.far);for(let i=0;i<4;i++){rect(c,-15+i*3,-49+i*11,30-i*6,9,p.far);rect(c,-11+i*2,-53+i*11,22-i*4,6,p.far)}c.restore()}
 function background(c,ch,t){const p=palettes[ch];rect(c,0,0,384,384,p.sky);for(let i=0;i<23;i++){const n=noise(i+45,ch+3),x=n%350+17,y=(n>>>8)%205+24;const alpha=.08+.055*Math.sin(t*.7+i);c.globalAlpha=alpha;star(c,x,y,i%7===0?2:1,'#dce3c3')}c.globalAlpha=1;
  tree(c,16,237,p,1.5);tree(c,362,240,p,1.2);tree(c,51,205,p,.9);tree(c,327,186,p,.85);
  c.globalAlpha=.28;for(let y=-14;y<=14;y++)for(let x=-14;x<=14;x++)if(x*x+y*y<196&&(x-7)*(x-7)+(y+4)*(y+4)>169)rect(c,287+x,52+y,1,1,ch===1?'#b8c4c8':'#bba874');star(c,265,49,1,ch===1?'#b8c4c8':'#bba874');c.globalAlpha=1;
  // The dark water is the bottom of the garden, never a hidden platform.
  rect(c,0,371,384,13,p.water);for(let i=0;i<15;i++){const a=noise(i,ch),x=(a%373+Math.floor(t*3))%384,y=374+(i%3)*3;rect(c,x,y,8+a%10,1,p.leaf)}
 }
 function terrain(c,s,ch){const p=palettes[ch];for(let y=0;y<s.h;y++)for(let x=0;x<s.w;x++){const tile=s.grid[y][x],px=x*32,py=y*32,n=noise(x+13,y+ch*59);if(tile==='#'){
   const top=s.grid[y-1]?.[x]!=='#',left=s.grid[y]?.[x-1]!=='#',right=s.grid[y]?.[x+1]!=='#';rect(c,px,py,32,32,p.soil);rect(c,px+2,py+11,28,3,p.soil2);rect(c,px+8+(n%8),py+22,4,2,p.soil2);rect(c,px+4,py+28,8,1,'#0003');rect(c,px+18,py+17,6,2,p.soil2);if(left)rect(c,px,py,3,32,'#0002');if(right)rect(c,px+29,py,3,32,'#0003');
   if(top){rect(c,px,py,32,4,p.grass);rect(c,px+2,py-2,28,3,p.grass);rect(c,px+4,py-3,8,2,p.light);rect(c,px+23,py+3,3,5,p.grass);rect(c,px+8,py+3,4,3,p.grass);for(let i=0;i<3;i++)rect(c,px+3+i*9,py-4-(n>>i&1),1,4,p.grass);if(n%5===0){leaf(c,px+20,py-7,p.leaf);rect(c,px+18,py-11,4,2,p.light)}}
   if(s.grid[y+1]?.[x]!=='#'){rect(c,px+4,py+32,4,3,p.soil);rect(c,px+5,py+35,2,4,p.soil);rect(c,px+21,py+32,2,5,p.soil2)}
  }else if(tile==='!'){rect(c,px+3,py+19,27,6,'#77576b');for(let i=0;i<3;i++){rect(c,px+5+i*8,py+11,4,9,'#d899a2');rect(c,px+6+i*8,py+7,2,6,'#edc2b8');rect(c,px+5+i*8,py+19,4,3,'#ad738b')}rect(c,px+1,py+26,30,4,'#50453f')}
 }}
 function face(c,x,y,color,dir,t,id,charm,scale=1){const p=birdColors[color%3];c.save();c.translate(x,y);c.scale(scale,scale);pixelRound(c,-15,-14,30,28,p.outline);pixelRound(c,-13,-13,26,25,p.body);rect(c,-10,-12,15,3,p.light);rect(c,-10,9,18,3,p.shade);const flip=dir===3?-1:1;c.scale(flip,1);rect(c,5,-7,3,5,'#263d33');rect(c,6,-7,1,1,'#fffae1');rect(c,5,1,4,2,p.cheek);rect(c,12,-1,8,5,'#e1b96d');rect(c,13,-2,5,2,'#f3d690');rect(c,13,4,5,1,'#ba9754');rect(c,-9,3,7,4,p.shade);rect(c,-8,2,6,1,p.light);rect(c,-6,-16,3,5,p.body);rect(c,-2,-18,4,7,p.body);if(Math.floor(t*2+id)%19===0){rect(c,5,-7,3,5,p.body);rect(c,4,-4,4,1,'#263d33')}c.restore();
  c.save();c.translate(x,y);c.scale(scale,scale);x=0;y=0;if(charm===1){leaf(c,x-1,y-18,'#9abb85');rect(c,x-3,y-24,5,2,'#c5d29b')}if(charm===2){star(c,x-3,y-23,2,'#c3bbdd');rect(c,x+4,y-24,2,5,'#e3dbeb');rect(c,x+2,y-22,2,3,'#e3dbeb')}if(charm===3){rect(c,x-7,y-20,14,5,'#dfbf78');for(let i=0;i<3;i++)rect(c,x-7+i*6,y-24-(i%2),3,5,'#f2d899');rect(c,x-1,y-20,2,2,'#c07f94')}c.restore();
 }
 function bird(c,b,positions,t,charm,selected,alpha=1){if(!positions.length)return;const p=birdColors[b.color%3];c.save();c.globalAlpha=alpha;
  // Connect the little pixel pillows before drawing the wing and face.
  for(let i=positions.length-1;i>0;i--){const a=positions[i],z=positions[i-1],ax=a[0]*32+16,ay=a[1]*32+16,zx=z[0]*32+16,zy=z[1]*32+16;c.strokeStyle=p.outline;c.lineWidth=27;c.lineCap='round';c.beginPath();c.moveTo(ax,ay);c.lineTo(zx,zy);c.stroke();c.strokeStyle=p.body;c.lineWidth=23;c.beginPath();c.moveTo(ax,ay-1);c.lineTo(zx,zy-1);c.stroke()}
  for(let i=positions.length-1;i>=1;i--){const q=positions[i],x=Math.round(q[0]*32+16),y=Math.round(q[1]*32+16);pixelRound(c,x-14,y-13,28,25,p.outline);pixelRound(c,x-12,y-12,24,22,p.body);rect(c,x-8,y-11,14,2,p.light);rect(c,x-7,y+7,14,3,p.shade);if(i===positions.length-1){rect(c,x-8,y+9,3,6,'#d7a877');rect(c,x+3,y+9,3,6,'#d7a877');rect(c,x-4,y-15,3,4,p.light)}else if(i%2===0)rect(c,x-4,y-3,5,2,p.shade)}
  const h=positions[0],x=h[0]*32+16,y=h[1]*32+16;face(c,x,y,b.color,b.face,t,b.id,charm);if(selected){c.globalAlpha=alpha*(.6+.15*Math.sin(t*3));rect(c,x-5,y-27,10,2,'#e8a3b8');rect(c,x-3,y-25,6,2,'#e8a3b8');rect(c,x-1,y-23,2,2,'#e8a3b8')}
  c.restore();
 }
 function draw(canvas,s,chapter,t,view,particles,charm,initialFruit,ghost){const c=canvas.getContext('2d');c.save();c.setTransform(2,0,0,2,0,0);c.imageSmoothingEnabled=false;background(c,chapter,t);c.translate(Math.round(Math.sin(t*68)*(view.shake||0)),Math.round(Math.cos(t*59)*(view.shake||0)));terrain(c,s,chapter);
  for(const f of s.fruit){let type=initialFruit.findIndex(o=>WeaveEngine.same(o,f));fruit(c,f[0]*32+16,f[1]*32+16,type%3,t)}nest(c,s.nest[0]*32+16,s.nest[1]*32+16,!s.fruit.length,t);
  for(const b of s.birds)if(!b.done){const points=b.body.map((p,i)=>view.positions[b.id+'-'+i]||p);bird(c,b,points,t,charm,b.id===s.active)}
  for(const d of view.departures){const f=1-d.life/d.max,points=d.body.map(p=>[p[0]+(s.nest[0]-p[0])*f,p[1]+(s.nest[1]-p[1])*f-f*.8]);bird(c,d.bird,points,t,charm,false,1-f)}
  if(ghost){const b=s.birds.find(b=>b.id===ghost[0]&&!b.done);if(b){const [dx,dy]=WeaveEngine.DIRS[ghost[1]],h=b.body[0],x=h[0]*32+16+dx*26,y=h[1]*32+16+dy*26;c.globalAlpha=.65+.15*Math.sin(t*4);pixelRound(c,x-6,y-6,13,13,'#e4c476');c.fillStyle='#304131';c.beginPath();if(dx){c.moveTo(x+dx*4,y);c.lineTo(x-dx*2,y-3);c.lineTo(x-dx*2,y+3)}else{c.moveTo(x,y+dy*4);c.lineTo(x-3,y-dy*2);c.lineTo(x+3,y-dy*2)}c.closePath();c.fill();c.globalAlpha=1}}
  for(const q of particles){c.globalAlpha=Math.max(0,q.life/q.max);if(q.type==='ring'){c.strokeStyle=q.color;c.lineWidth=1.5;c.strokeRect(q.x-q.size,q.y-q.size,q.size*2,q.size*2)}else rect(c,q.x,q.y,q.size,q.size,q.color)}c.globalAlpha=1;c.restore();
 }
 function portrait(canvas,color,charm=0){canvas.width=64;canvas.height=64;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.scale(2,2);face(c,14,18,color,1,0,0,charm,.75)}
 function hero(canvas,charm=0){canvas.width=552;canvas.height=300;const c=canvas.getContext('2d');c.scale(2,2);c.imageSmoothingEnabled=false;for(let i=0;i<9;i++)star(c,20+i*28,15+noise(i,4)%40,i%4?1:2,i%2?'#405e43':'#8c8860');rect(c,20,123,235,4,'#708d57');rect(c,20,127,235,11,'#55553c');for(let i=0;i<8;i++)rect(c,28+i*28,128,8,2,'#696445');
  bird(c,{id:0,color:0,face:1},[[3.1,3.25],[2.1,3.25],[1.1,3.25]],0,charm,false);bird(c,{id:1,color:1,face:3},[[5.6,3.25],[6.6,3.25]],0,0,false);fruit(c,140,78,0,0);leaf(c,241,115,'#92ad76');
 }
 root.WeaveArt={draw,portrait,hero,fruit,birdColors,palettes};
})(window);

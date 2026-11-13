(function(root){'use strict';
const palettes=[{sky:'#f6dba1',far:'#edbc84',wall:'#ffdfaa',side:'#e89672',pink:'#ed7691',dark:'#28515a',mint:'#93c3b2',floor:'#e8b184',pool:'#83bab4',cloud:'#729fa7'}, {sky:'#badcce',far:'#94bfb4',wall:'#f6c3aa',side:'#d98d8d',pink:'#d95d84',dark:'#254c60',mint:'#65a89e',floor:'#95c2b6',pool:'#4b999e',cloud:'#67939f'}, {sky:'#24365d',far:'#334873',wall:'#8981a2',side:'#615c86',pink:'#e47a9a',dark:'#182a4b',mint:'#7ccbbd',floor:'#485c80',pool:'#347c95',cloud:'#596f9c'}];
const penColours=['#dc537a','#8466d9','#e8ad45'];
class EaveArt{
 constructor(canvas){this.canvas=canvas;this.c=canvas.getContext('2d');this.scale=1;this.ox=0;this.oy=0;this.t=0;this.cache=[];this.flash=0;this.hitFlash=0;this.fx=[];this.reacts=[];this.seed=17;this.shake=0;}
 rnd(){this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296}
 resize(w,h,dpr){this.w=w;this.h=h;this.canvas.width=Math.round(w*dpr);this.canvas.height=Math.round(h*dpr);this.dpr=dpr;this.scale=Math.min(w/420,h/560);this.ox=(w-420*this.scale)/2;this.oy=(h-560*this.scale)/2;}
 point(x,y){return{x:(x-this.ox)/this.scale,y:(y-this.oy)/this.scale}}
 rect(x,y,w,h,col){this.c.fillStyle=col;this.c.fillRect(x,y,w,h)}
 poly(points,col){let c=this.c;c.fillStyle=col;c.beginPath();points.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath();c.fill()}
 disk(x,y,r,col){let c=this.c;c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill()}
 ellipse(x,y,rx,ry,col){let c=this.c;c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
 path(points,col,width=2,dash=[]){let c=this.c;c.strokeStyle=col;c.lineWidth=width;c.lineJoin='round';c.lineCap='round';c.setLineDash(dash);c.beginPath();points.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.stroke();c.setLineDash([])}
 arch(x,y,w,h,col){let c=this.c;c.fillStyle=col;c.beginPath();c.moveTo(x,y+h);c.lineTo(x,y+w/2);c.arc(x+w/2,y+w/2,w/2,Math.PI,0);c.lineTo(x+w,y+h);c.closePath();c.fill()}
 palm(x,y,s,p){let c=this.c;c.save();c.translate(x,y);c.scale(s,s);this.poly([[-3,0],[3,0],[8,-83],[4,-83]],p.side);for(let j=0;j<7;j++){let a=(j-3)*.43-.2;c.save();c.translate(5,-82);c.rotate(a);this.poly([[0,0],[-18,-23],[-42,-28],[-28,-17],[-18,-3],[-3,7]],j%2?p.dark:p.mint);c.restore()}c.restore()}
 building(x,y,w,h,p,variant=0){let c=this.c;this.rect(x,y,w,h,p.wall);this.poly([[x+w,y],[x+w+20,y-12],[x+w+20,y+h-12],[x+w,y+h]],p.side);this.poly([[x,y],[x+20,y-12],[x+w+20,y-12],[x+w,y]],p.pink);this.rect(x-4,y,w+8,5,p.side);this.rect(x-4,y+9,w+8,3,p.wall);let floors=Math.max(1,Math.floor(h/55)),cols=Math.max(1,Math.floor(w/36));for(let j=0;j<floors;j++)for(let i=0;i<cols;i++){let wx=x+10+i*(w-14)/cols,wy=y+19+j*53;this.arch(wx,wy,12,27,p.side);this.arch(wx+3,wy+3,6,23,p.dark);this.rect(wx-2,wy+27,16,3,p.side)}
 if(variant%2===0){let tw=w*.44,tx=x+w*.28;this.rect(tx,y-43,tw,43,p.wall);this.disk(tx+tw/2,y-43,tw/2,p.pink);this.rect(tx-4,y-26,tw+8,4,p.side);this.rect(tx+tw/2-1,y-43-tw/2-10,2,12,p.side);this.disk(tx+tw/2,y-43-tw/2-12,3,p.side)}
 for(let i=0;i<Math.floor(w/9);i++){this.rect(x+i*9,y-9,3,9,p.wall)}this.rect(x-3,y-12,w+6,3,p.side);
 }
 background(district){if(this.cache[district])return this.cache[district];let canvas=document.createElement('canvas');canvas.width=1100;canvas.height=560;let old=this.c;this.c=canvas.getContext('2d');this.c.translate(340,0);let p=palettes[district];this.rect(-340,0,1100,560,p.sky);
 // Broad distant architecture, with no borrowed screenshots or textures.
 for(let i=0;i<13;i++){let x=-330+i*85,y=105+(i*37)%73;this.rect(x,y,66,330-y,p.far);this.arch(x+14,y-24,38,45,p.far);for(let k=0;k<3;k++)this.arch(x+12+k*17,y+22,7,22,p.sky)}
 this.rect(-340,325,1100,235,p.floor);this.poly([[-340,325],[760,325],[760,385],[-340,385]],p.side);
 this.building(-170,110,150,238,p,district===1?1:0);this.building(365,65,160,285,p,district===1?1:2);this.building(-325,185,125,170,p,1);this.building(550,160,145,190,p,3);
 if(district===1){for(let [x,y,w] of [[-175,285,180],[360,265,186]]){this.poly([[x,y],[x+w,y],[x+w+10,y+34],[x-10,y+34]],p.pink);for(let j=0;j<8;j++)this.poly([[x+j*w/8,y],[x+(j+.45)*w/8,y],[x+(j+.45)*w/8+5,y+34],[x+j*w/8-5,y+34]],p.wall);this.rect(x-10,y+34,w+20,5,p.side);for(let k=0;k<3;k++){this.rect(x+k*60,y+44,42,25,p.mint);this.rect(x+k*60+3,y+48,36,17,p.dark)}}this.path([{x:-140,y:190},{x:395,y:190}],p.side,1);for(let j=0;j<15;j++)this.poly([[-135+j*37,190],[-120+j*37,190],[-127+j*37,206]],j%2?p.mint:p.pink);}
 if(district===2){this.disk(290,25,19,'#f1d594');this.disk(298,19,17,p.sky);for(let [x,y]of [[-220,35],[-140,65],[-60,27],[27,65],[100,24],[178,41],[355,24],[510,44],[650,24]])this.star(x,y,3,p.mint);for(let x of [-135,402]){this.rect(x,253,70,18,p.side);this.poly([[x-7,253],[x+35,228],[x+77,253]],p.pink);for(let j=0;j<4;j++){this.arch(x+6+j*15,276,8,30,p.dark);this.disk(x+10+j*15,287,2,'#f1d594')}}}
 this.rect(-185,338,188,16,p.wall);this.rect(375,338,185,16,p.wall);for(let i=0;i<8;i++){this.rect(-178+i*23,355,7,75,p.wall);this.rect(385+i*23,355,7,75,p.wall)}this.rect(-192,430,207,9,p.wall);this.rect(370,430,207,9,p.wall);
 // One-point tiled piazza and a side canal, flat planes instead of noisy grain.
 for(let y=388;y<560;y+=24){this.path([{x:-340,y},{x:760,y}],p.side,.7)}for(let x=-350;x<800;x+=55)this.path([{x:210+(x-210)*.24,y:325},{x,y:560}],p.side,.7);
 this.poly([[-340,456],[17,456],[-20,500],[-340,500]],p.pool);this.poly([[407,456],[760,456],[760,500],[445,500]],p.pool);this.path([{x:-340,y:451},{x:20,y:451}],p.wall,5);this.path([{x:406,y:451},{x:760,y:451}],p.wall,5);this.path([{x:-340,y:505},{x:-21,y:505}],p.wall,6);this.path([{x:444,y:505},{x:760,y:505}],p.wall,6);
 this.palm(-46,405,.95,p);this.palm(465,402,.95,p);this.palm(-244,400,.8,p);this.palm(619,430,.8,p);
 this.rect(35,494,350,8,p.wall);this.poly([[35,502],[385,502],[400,514],[20,514]],p.side);this.rect(20,514,380,5,p.wall);
 for(let x of [-20,442]){this.rect(x-13,520,26,27,p.side);this.rect(x-16,516,32,6,p.wall);for(let i=-2;i<=2;i++)this.poly([[x,518],[x+i*9,480-Math.abs(i)*5],[x+i*12+8,504]],p.dark)}
 this.c=old;this.cache[district]=canvas;return canvas;
 }
 cloud(x,y,d,p,side=false){let c=this.c;c.save();c.translate(x,y);if(side)c.rotate(d>0?-Math.PI/2:Math.PI/2);this.disk(-17,0,15,p.cloud);this.disk(4,-9,20,p.cloud);this.disk(26,0,14,p.cloud);this.rect(-16,-2,45,14,p.cloud);this.path([{x:-5,y:1},{x:5,y:1}],p.sky,1.4);for(let z of [-5,10])this.disk(z,-3,1.2,p.dark);c.restore()}
 person(x,y,k,phase,p,skin){let c=this.c,t=this.t;let bounce=phase==='won'?Math.abs(Math.sin(t*5+k))*(-5):Math.sin(t*1.7+k)*.7;let coat=[p.pink,p.mint,'#e7a34f'][skin]||p.pink;c.save();c.translate(x,y+bounce);this.ellipse(0,25,17,4,p.side);this.rect(-9,11,6,13,p.dark);this.rect(3,11,6,13,p.dark);this.ellipse(-7,24,7,3,p.dark);this.ellipse(7,24,7,3,p.dark);this.poly([[-9,-19],[10,-19],[18,15],[-17,15]],coat);this.poly([[10,-19],[18,15],[9,15],[4,-13]],p.side);this.path([{x:0,y:-7},{x:0,y:15}],p.wall,1);this.disk(0,2,1.4,p.wall);this.disk(0,9,1.4,p.wall);
 this.disk(0,-25,15,p.dark);this.disk(0,-26,11,p.wall);this.poly([[-16,-32],[0,-44],[16,-32],[15,-26],[-15,-26]],coat);this.rect(-18,-29,36,4,coat);let blink=Math.sin(t*.7+k*3)> .994;this.rect(-6,-28,2,blink?1:3,p.dark);this.rect(4,-28,2,blink?1:3,p.dark);if(phase==='retry')this.path([{x:-3,y:-20},{x:0,y:-22},{x:3,y:-20}],p.dark,1);else this.path([{x:-3,y:-21},{x:0,y:-19},{x:3,y:-21}],p.dark,1);this.poly([[-8,-14],[12,-14],[20,-8],[3,-9]],p.mint);
 let hand=phase==='won'? -17:4;this.path([{x:-10,y:-10},{x:-22,y:hand}],coat,7);this.disk(-22,hand,3,p.wall);this.path([{x:11,y:-9},{x:22,y:hand+2}],coat,7);this.disk(22,hand+2,3,p.wall);c.restore()}
 star(x,y,r,col){let pts=[];for(let i=0;i<8;i++){let a=i*Math.PI/4;pts.push([x+Math.cos(a)*(i%2?r*.33:r),y+Math.sin(a)*(i%2?r*.33:r)])}this.poly(pts,col)}
 bell(x,y,on,p){let c=this.c;c.save();c.translate(x,y);if(on)c.rotate(Math.sin(this.t*9)*.12);this.rect(-8,12,16,3,p.side);this.path([{x:-7,y:10},{x:-7,y:-10},{x:7,y:-10},{x:7,y:10}],p.wall,2);this.arch(-5,-5,10,12,on?'#ffe3a0':p.mint);this.disk(0,8,2,on?'#fff4cf':p.dark);if(on){this.star(0,-18,5,'#ffe3a0');this.path([{x:-13,y:-6},{x:-16,y:-8}],p.wall,1);this.path([{x:13,y:-6},{x:16,y:-8}],p.wall,1)}c.restore()}
 addEvents(events,gentle){for(let e of events){if(e.t==='bounce'||e.t==='absorb'){this.reacts.push({x:e.x,y:e.y,life:.35,t:e.t});let n=gentle?2:4;for(let i=0;i<n;i++)this.fx.push({x:e.x,y:e.y,vx:(this.rnd()-.5)*90,vy:-20-this.rnd()*50,life:.4+this.rnd()*.25,col:e.t==='absorb'?'#f5d180':'#c7f0eb',size:2});}if(e.t==='hit'){this.hitFlash=.5;this.shake=gentle?0:2;for(let i=0;i<5;i++)this.fx.push({x:e.x,y:e.y-20,vx:(this.rnd()-.5)*100,vy:-70-this.rnd()*50,life:.7,col:'#ef7795',size:3});}if(e.t==='bell')for(let i=0;i<10;i++)this.fx.push({x:e.x,y:e.y-10,vx:(this.rnd()-.5)*120,vy:-50-this.rnd()*80,life:.7,col:'#ffdd87',size:3});if(e.t==='won'){this.flash=.4;for(let i=0;i<65;i++)this.fx.push({x:50+this.rnd()*320,y:180+this.rnd()*160,vx:(this.rnd()-.5)*100,vy:-100-this.rnd()*100,life:1+this.rnd(),col:['#ffe4a0','#f0809c','#8cd1c2'][i%3],size:2+this.rnd()*3});}}
 if(this.fx.length>160)this.fx.splice(0,this.fx.length-160);if(this.reacts.length>30)this.reacts.splice(0,this.reacts.length-30)}
 update(dt){this.t+=dt;this.flash=Math.max(0,this.flash-dt);this.hitFlash=Math.max(0,this.hitFlash-dt);this.shake=Math.max(0,this.shake-dt*7);for(let q of this.fx){q.x+=q.vx*dt;q.y+=q.vy*dt;q.vy+=130*dt;q.life-=dt}this.fx=this.fx.filter(q=>q.life>0);for(let q of this.reacts)q.life-=dt;this.reacts=this.reacts.filter(q=>q.life>0)}
 draw(s,p,draft=null,guide=false){let c=this.c,di=Math.floor(s.level/4),pal=palettes[di],lev=Eave.levels[s.level];c.setTransform(this.dpr,0,0,this.dpr,0,0);c.fillStyle=pal.sky;c.fillRect(0,0,this.w,this.h);c.translate(this.ox,this.oy);c.scale(this.scale,this.scale);if(this.shake)c.translate(Math.sin(this.t*93)*this.shake,Math.cos(this.t*61)*this.shake);this.rect(-3000,325,6000,2000,pal.floor);let bg=this.background(di);c.drawImage(bg,-340,0);
 // Distant fountain, water glints, birds, and banners preserve the flat palette.
 this.ellipse(210,507,49,8,pal.side);this.ellipse(210,505,43,5,pal.pool);for(let k=0;k<6;k++){let x=-270+k*151+Math.sin(this.t*.6+k)*10,y=473+(k%2)*13;this.path([{x:x-11,y},{x:x+10,y}],pal.wall,1)}
 for(let k=0;k<2;k++){let x=((this.t*8+k*160)%650)-110,y=45+k*21;this.path([{x:x-5,y:y+2},{x,y},{x:x+5,y:y+2}],pal.dark,1)}
 for(let x of [-23,391]){this.rect(x,170,2,72,pal.side);let wave=Math.sin(this.t*2+x)*3;this.poly([[x+2,175],[x+21,177+wave],[x+21,215+wave],[x+12,209],[x+2,216]],pal.pink)}
 // Cloud sources and a quiet, honest trajectory preview.
 for(let e of lev.emit){this.cloud(e.x,e.y-22,Math.sign(e.vx),pal,Math.abs(e.vx)>180);if(s.phase==='draw'){let x=e.x,y=e.y,vx=e.vx,vy=e.vy,pts=[{x,y}];for(let t=0;t<.55;t+=.08){vx+=(lev.wind||0)*.08;vy+=410*.08;x+=vx*.08;y+=vy*.08;pts.push({x,y})}c.globalAlpha=.35;this.path(pts,pal.dark,1.2,[2,7]);c.globalAlpha=1;}}
 if(s.phase==='draw'){c.globalAlpha=.25;for(let [x,y,dx,dy]of [[23,145,1,1],[397,145,-1,1],[23,423,1,-1],[397,423,-1,-1]])this.path([{x:x+dx*10,y},{x,y},{x,y:y+dy*10}],pal.dark,1);c.globalAlpha=1;}
 if(guide&&s.phase==='draw'){c.globalAlpha=.65;for(let g of lev.guide)this.path(g,pal.dark,2,[4,7]);c.globalAlpha=1;}
 for(let st of s.strokes){let col=penColours[s.pen];this.path(st.map(q=>({x:q.x,y:q.y+3})),pal.side,10);this.path(st,col,8);this.path(st.map(q=>({x:q.x,y:q.y-1})),s.pen===2?'#ffe8b1':'#ffd8bc',1.1);for(let q of [st[0],st[st.length-1]]){this.disk(q.x,q.y,5.5,col);this.disk(q.x,q.y,1.5,'#fff4cf')}}
 if(draft?.length>1){c.globalAlpha=.7;this.path(draft,penColours[s.pen],8);c.globalAlpha=1;let end=draft[draft.length-1];this.disk(end.x,end.y,9,pal.wall);this.disk(end.x,end.y,5,penColours[s.pen])}
 lev.folk.forEach(([x,y],k)=>{if(y<450){this.rect(x-34,y+29,68,61,pal.wall);this.poly([[x+34,y+29],[x+46,y+22],[x+46,y+83],[x+34,y+90]],pal.side);this.rect(x-38,y+25,76,5,pal.side);this.arch(x-12,y+43,24,43,pal.side)}this.person(x,y,k,s.phase,pal,p.skin)});
 [[42,479],[378,479],[210,520]].forEach(([x,y],i)=>this.bell(x,y,s.bells[i],pal));
 for(let q of s.drops){let a=Math.atan2(q.vy,q.vx),speed=Math.hypot(q.vx,q.vy);c.save();c.translate(q.x,q.y);c.rotate(a-Math.PI/2);if(q.heavy){this.poly([[0,-8],[7,0],[0,8],[-7,0]],'#c1f1ee');this.poly([[0,-8],[7,0],[0,1]],'#ffffff');this.path([{x:0,y:-5},{x:0,y:4}],'#83b8cb',1)}else{this.ellipse(0,0,q.r*.78,q.r+Math.min(5,speed*.009),'#74b8d0');this.ellipse(-1,-2,1.1,2.4,'#e0f7ed')}c.restore()}
 for(let q of this.reacts){let a=q.life/.35;c.globalAlpha=a;let r=3+(1-a)*13;this.ellipse(q.x,q.y,r,r*.45,q.t==='absorb'?'#f2d28e':'#bde5dc');c.globalAlpha=1}
 for(let q of this.fx){c.globalAlpha=Math.min(1,q.life*3);this.star(q.x,q.y,q.size,q.col)}c.globalAlpha=1;
 // An earned street of little lights grows behind every finished roof.
 for(let i=0;i<12;i++){let x=72+i*25,y=550;this.arch(x,y-11,9,14,p.best[i]?'#ffe5a6':pal.side);if(p.best[i])this.disk(x+4.5,y-5,1.2,pal.wall)}
 if(this.hitFlash){c.globalAlpha=this.hitFlash*.12;this.rect(-340,0,1100,560,'#ff355c');c.globalAlpha=1}
 }
}
root.EaveArt=EaveArt;root.EavePalettes=palettes;
})(window);

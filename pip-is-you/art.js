(function(root){
 'use strict';
 const TILE=32,colors={DUCK:'#efcf83',ROCK:'#b7b7a0',WALL:'#a19c7a',FLAG:'#eac763',WATER:'#76b5d9',LAVA:'#df8f77',KEY:'#eed38b',DOOR:'#b9a08b',IS:'#c9cebc',YOU:'#e990ae',WIN:'#f2cf78',STOP:'#adba95',PUSH:'#baadc8',SINK:'#7fafd2',HOT:'#ef997d',MELT:'#e6b2a5',OPEN:'#edcf87',SHUT:'#b79f8c'};
 const glyphs={A:['01110','10001','10001','11111','10001','10001','10001'],B:['11110','10001','10001','11110','10001','10001','11110'],C:['01111','10000','10000','10000','10000','10000','01111'],D:['11110','10001','10001','10001','10001','10001','11110'],E:['11111','10000','10000','11110','10000','10000','11111'],F:['11111','10000','10000','11110','10000','10000','10000'],G:['01111','10000','10000','10111','10001','10001','01110'],H:['10001','10001','10001','11111','10001','10001','10001'],I:['11111','00100','00100','00100','00100','00100','11111'],J:['00111','00010','00010','00010','10010','10010','01100'],K:['10001','10010','10100','11000','10100','10010','10001'],L:['10000','10000','10000','10000','10000','10000','11111'],M:['10001','11011','10101','10101','10001','10001','10001'],N:['10001','11001','10101','10011','10001','10001','10001'],O:['01110','10001','10001','10001','10001','10001','01110'],P:['11110','10001','10001','11110','10000','10000','10000'],Q:['01110','10001','10001','10001','10101','10010','01101'],R:['11110','10001','10001','11110','10100','10010','10001'],S:['01111','10000','10000','01110','00001','00001','11110'],T:['11111','00100','00100','00100','00100','00100','00100'],U:['10001','10001','10001','10001','10001','10001','01110'],V:['10001','10001','10001','10001','10001','01010','00100'],W:['10001','10001','10001','10101','10101','11011','10001'],X:['10001','10001','01010','00100','01010','10001','10001'],Y:['10001','10001','01010','00100','00100','00100','00100'],Z:['11111','00001','00010','00100','01000','10000','11111']};
 const duck=['................','.......oooo.....','......occcco....','.....occwccco...','.....occckcco...','.....occcccoooo.','....occccccyyyo.','...occccccoooo..','.ooccccccco.....','occcccccccco....','occccwwccccco...','.occcccccccco...','..occcccccco....','...ooooooo......','....p..p........','................'];
 const rock=['................','................','.......oo.......','.....oogg oo....'.replace(' ',''),'....oggggggo....','...ogglgggggo...','..oggggggggggo..','..oggggllggggo..','.oggggggggggggo.','.oggggggddggggo.','..ogggddddgggo..','...oggggggggo...','....ooooooo.....','................','................','................'];
 const palettes=[{back:'#111a17',floor:'#16211b',leaf:'#334d35',grass:'#3e5634',brick:'#686b50',moss:'#71815a'},{back:'#141a25',floor:'#1a2431',leaf:'#354757',grass:'#3d5d60',brick:'#55677b',moss:'#78938e'},{back:'#211b29',floor:'#2b2532',leaf:'#4d4352',grass:'#69545b',brick:'#776474',moss:'#ad8890'}];
 const noise=(x,y)=>{let n=(x*374761393+y*668265263)>>>0;n=((n^(n>>>13))*1274126177)>>>0;return(n^(n>>>16))>>>0};
 function pix(c,pattern,x,y,pal,scale=1,flip=false){c.save();c.translate(x,y);if(flip){c.translate(pattern[0].length*scale,0);c.scale(-1,1)}pattern.forEach((row,yy)=>{for(let xx=0;xx<row.length;xx++){const color=pal[row[xx]];if(color){c.fillStyle=color;c.fillRect(xx*scale,yy*scale,scale,scale)}}});c.restore()}
 function text(c,t,x,y,color,scale=1){const w=(t.length*6-1)*scale;c.fillStyle=color;for(let i=0;i<t.length;i++){const g=glyphs[t[i]];if(!g)continue;g.forEach((r,yy)=>{for(let xx=0;xx<5;xx++)if(r[xx]==='1')c.fillRect(Math.round(x-w/2+i*6*scale+xx*scale),Math.round(y+yy*scale),Math.ceil(scale),Math.ceil(scale))})}}
 function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)}
 function star(c,x,y,size,color){rect(c,x-size,y,size*2+1,1,color);rect(c,x,y-size,1,size*2+1,color)}
 function bush(c,x,y,p,n){for(let j=0;j<5;j++){const a=(noise(n,j)%25)-12,b=noise(j,n)%18-8;rect(c,x+a,y+b,5,4,j%2?p.leaf:p.grass)}rect(c,x-7,y+5,14,2,p.leaf)}
 function drawObject(c,e,r,time,p,skin=0){
  const cx=e.x*TILE+16,cy=e.y*TILE+16,k=e.kind;let controlled=PipEngine.is(r,e,'YOU'),winner=PipEngine.is(r,e,'WIN'),stop=PipEngine.is(r,e,'STOP'),push=PipEngine.is(r,e,'PUSH');
  const bob=controlled?Math.round(Math.sin(time*3+e.id)*.65):0;
  if(winner){c.save();c.globalAlpha=.12+.06*Math.sin(time*3);rect(c,cx-15,cy-15,30,30,colors.WIN);c.restore();star(c,cx-12,cy-12,2,colors.WIN)}
  if(controlled){c.save();c.globalAlpha=.14;rect(c,cx-13,cy+9,26,4,colors.YOU);c.restore();rect(c,cx-5,cy+14,10,1,colors.YOU)}
  c.save();c.translate(cx,cy+bob);c.fillStyle='#0005';c.beginPath();c.ellipse(0,10,12,3,0,0,Math.PI*2);c.fill();
  if(k==='DUCK'){
   const cbody=skin===1?'#bfe0d7':skin===2?'#efd7ed':'#efebce';
   pix(c,duck,-16,-17,{o:'#343b30',c:cbody,w:'#fff9db',k:'#192222',y:'#e7bd63',p:'#dc9f79'},2,e.face===3);
   if(Math.floor(time*2+e.id)%17===0)rect(c,e.face===3?-8:6,-9,4,2,'#6d7561');
   if(skin===1){rect(c,-1,-19,2,4,'#7fad7e');rect(c,-4,-20,4,2,'#9bc584');rect(c,1,-21,4,2,'#bed49a')}
   if(skin===2){star(c,-4,-22,2,'#e0c3ec');star(c,6,-19,1,'#bdcae7')}
   if(skin===3){rect(c,-5,-21,13,5,'#edd08a');rect(c,-6,-24,3,4,'#f5dda2');rect(c,0,-25,3,4,'#f5dda2');rect(c,6,-24,3,4,'#f5dda2');rect(c,0,-21,2,2,'#d88492')}
  }else if(k==='ROCK'){
   pix(c,rock,-16,-15,{o:'#323c38',g:'#b9bb9c',l:'#dcddbc',d:'#858f7b'},2);if(controlled){rect(c,-6,-1,2,3,'#27352b');rect(c,3,-1,2,3,'#27352b')}
  }else if(k==='WALL'){
   c.globalAlpha=stop?.96:.42;rect(c,-15,-14,30,25,'#222f29');rect(c,-14,-13,28,5,p.brick);rect(c,-14,-6,28,6,p.brick);rect(c,-14,2,28,7,p.brick);rect(c,-5,-13,2,5,'#303b2f');rect(c,5,-6,2,6,'#303b2f');rect(c,-3,2,2,7,'#303b2f');rect(c,-12,-12,8,1,p.moss);rect(c,6,3,6,1,p.moss);rect(c,-15,10,30,3,'#1a2521');rect(c,-10,-14,6,2,p.leaf);rect(c,7,-14,5,3,p.leaf);
  }else if(k==='WATER'){
   const sink=PipEngine.is(r,e,'SINK');rect(c,-16,-16,32,32,sink?'#447d98':stop?'#527682':'#5c8c9b');rect(c,-16,-15,32,3,'#7bb0b8');rect(c,-16,12,32,3,'#386473');const shift=Math.floor(time*2+e.id)%5;rect(c,-10+shift,-4,8,2,'#92c4c9');rect(c,1-shift,4,9,2,'#76a7bc');rect(c,10,-10,3,1,'#acd3cc');if(controlled){rect(c,-6,-2,2,3,'#183b50');rect(c,4,-2,2,3,'#183b50');rect(c,-2,5,5,1,'#ceebdd')}
  }else if(k==='LAVA'){
   const hot=PipEngine.is(r,e,'HOT');rect(c,-16,-16,32,32,hot?'#843f3d':'#685363');rect(c,-16,-15,32,3,hot?'#c26c4b':'#937786');rect(c,-11,-6,10,2,hot?'#e1a263':'#af98a6');rect(c,1,3,11,2,hot?'#d4875f':'#947e8f');if(hot){const b=Math.floor(time*3+e.id)%4;rect(c,5-b,-11,3,5,'#edc67c');rect(c,7-b,-14,2,5,'#efac66')}
  }else if(k==='FLAG'){
   rect(c,-7,-13,2,26,'#adae8f');rect(c,-9,12,7,2,'#859476');const wave=Math.round(Math.sin(time*3+e.id));rect(c,-5,-12,17,9,'#efc978');rect(c,9,-11+wave,5,7,'#edba64');rect(c,-4,-11,6,1,'#ffe9b6');rect(c,-5,-2,11,3,'#b7934d');if(controlled){rect(c,-2,-8,2,2,'#654d33');rect(c,4,-8,2,2,'#654d33')}
  }else if(k==='KEY'){
   rect(c,-9,-7,10,3,'#f4d68d');rect(c,-12,-4,3,8,'#efc571');rect(c,-9,4,10,3,'#c69a5d');rect(c,1,-4,3,8,'#e9b76c');rect(c,4,-1,10,3,'#e8c480');rect(c,9,2,3,4,'#e8c480');rect(c,14,2,3,4,'#efcf8c');rect(c,-9,-4,10,8,'#3b4834');
  }else if(k==='DOOR'){
   rect(c,-13,-15,26,30,'#394330');rect(c,-11,-13,22,26,'#9f805d');rect(c,-9,-11,18,22,'#826b51');rect(c,-7,-9,2,17,'#b89b6d');rect(c,0,-9,2,17,'#b89b6d');rect(c,7,1,3,3,'#e3bd71');rect(c,-9,-12,18,2,'#c4a783');rect(c,-12,11,24,3,'#647054');
  }c.restore();
 }
 function drawWord(c,e,r,time){const x=e.x*TILE,y=e.y*TILE,color=colors[e.word]||'#cad4bd',active=r.active.has(e.id);c.save();
  const prop=PipEngine.P.includes(e.word),scale=e.word.length>4?1:1.15;
  if(e.locked){rect(c,x+1,y+2,30,28,'#18221f');rect(c,x+3,y+4,2,2,'#566256');rect(c,x+27,y+24,2,2,'#566256');c.globalAlpha=.86}
  else{rect(c,x+2,y+5,29,26,'#060d0d');rect(c,x+1,y+1,29,26,prop?(active?color:'#39463b'):'#303c32');rect(c,x+3,y+2,25,1,prop&&active?'#ffffff44':'#526149');rect(c,x+1,y+26,29,3,prop&&active?'#151d2044':'#18211b')}
  text(c,e.word,x+16,y+10,prop&&active&&!e.locked?'#202925':color,scale);
  if(active&&!e.locked){rect(c,x+7,y+24,18,1,prop?'#202925':color)}
  if(!active&&!e.locked){rect(c,x+15,y+23,2,1,'#6d7968')}
  c.restore();
 }
 function draw(canvas,s,chapter,time,view,particles,skin,ghost){
  const c=canvas.getContext('2d');c.save();c.setTransform(2,0,0,2,0,0);c.imageSmoothingEnabled=false;const p=palettes[chapter];rect(c,0,0,352,416,p.back);const shake=view.shake||0;c.translate(Math.round(Math.sin(time*77)*shake),Math.round(Math.cos(time*59)*shake));
  const r=PipEngine.rules(s);
  for(let y=0;y<13;y++)for(let x=0;x<11;x++){
   const n=noise(x+chapter*101,y+17),cx=x*32+16,cy=y*32+16;
   if(y>2&&y<12&&x>0&&x<10){rect(c,x*32,y*32,32,32,p.floor);if(n%3===0){rect(c,cx-8,cy+8,1,3,p.grass);rect(c,cx-11,cy+9,1,2,p.grass);rect(c,cx+9,cy-7,1,3,p.leaf)}if(n%17===0){rect(c,cx-7,cy+4,2,2,'#846957');rect(c,cx-8,cy+3,4,2,'#b39680');rect(c,cx-7,cy+3,1,1,'#d7c5a4')}}
   else if(s.terrain[y][x]==='#'&&y!==12||y===12&&!s.entities.some(e=>e.x===x&&e.y===12)){bush(c,cx,cy,p,n);if(n%3===1){rect(c,cx+8,cy-4,1,5,p.moss);rect(c,cx+6,cy-5,5,2,p.moss)}}
  }
  // Faint grid is confined to the walkable garden; the fixed rule rail sits outside it.
  c.strokeStyle='#d3e0b508';c.lineWidth=1;for(let x=1;x<=10;x++){c.beginPath();c.moveTo(x*32+.5,96);c.lineTo(x*32+.5,384);c.stroke()}for(let y=3;y<=12;y++){c.beginPath();c.moveTo(32,y*32+.5);c.lineTo(320,y*32+.5);c.stroke()}
  const pos=e=>{const v=view.positions[e.id];if(!v)return e;return{...e,x:v.x,y:v.y}};
  const es=s.entities.filter(e=>!e.word).sort((a,b)=>a.y-b.y);
  for(const e of es)if(['WATER','LAVA','WALL'].includes(e.kind))drawObject(c,pos(e),r,time,p,skin);
  for(const e of es)if(!['WATER','LAVA','WALL'].includes(e.kind))drawObject(c,pos(e),r,time,p,skin);
  for(const e of s.entities)if(e.word)drawWord(c,pos(e),r,time);
  if(ghost){const e=s.entities.find(e=>PipEngine.is(r,e,'YOU'));if(e){const [dx,dy]=PipEngine.DIRS[ghost.dir],x=e.x*32+16+dx*27,y=e.y*32+16+dy*27;c.globalAlpha=.6+.2*Math.sin(time*4);rect(c,x-5,y-5,11,11,'#e9c275');text(c,'',x,y,'#000');c.fillStyle='#203129';c.beginPath();if(dx){c.moveTo(x+dx*3,y);c.lineTo(x-dx*2,y-3);c.lineTo(x-dx*2,y+3)}else{c.moveTo(x,y+dy*3);c.lineTo(x-3,y-dy*2);c.lineTo(x+3,y-dy*2)}c.closePath();c.fill();c.globalAlpha=1}}
  for(const q of particles){c.globalAlpha=Math.max(0,q.life/q.max);if(q.type==='ring'){c.strokeStyle=q.color;c.lineWidth=1.5;c.strokeRect(q.x-q.size,q.y-q.size,q.size*2,q.size*2)}else rect(c,q.x,q.y,q.size,q.size,q.color)}c.globalAlpha=1;
  c.restore();
 }
 function hero(canvas,skin=0){canvas.width=512;canvas.height=288;const c=canvas.getContext('2d');c.scale(2,2);c.imageSmoothingEnabled=false;const p=palettes[0];bush(c,24,118,p,4);bush(c,225,122,p,12);for(let i=0;i<7;i++)star(c,28+i*31,20+(noise(i,4)%26),i%3===0?2:1,i%2?'#586846':'#a59066');const r={props:Object.fromEntries(PipEngine.N.map(k=>[k,new Set(k==='DUCK'?['YOU']:[])]))};drawObject(c,{kind:'DUCK',x:3.5,y:1.1,id:1,face:1},r,0,p,skin);const ar={active:new Set([1,2,3])};['DUCK','IS','YOU'].forEach((word,i)=>drawWord(c,{word,x:2.5+i,y:3,id:i+1},ar,0));}
 root.PipArt={draw,hero,colors,palettes};
})(window);

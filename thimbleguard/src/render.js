import {R,DIRS,VECTORS} from './ending-core';
export const sprites=new Image();sprites.src='sprites.webp';
const C=64;let floor=null,floorKey='';
const palettes=[['#344b58','#3a5360','#71856d'],['#4b485c','#56536b','#848681'],['#3b535a','#465f60','#879573']];
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(x,y,w,h);}
function tile(c,x,y,wall,tint){let[a,b,moss]=palettes[tint];rect(c,x,y,64,64,'#142d3b');rect(c,x+2,y+2,60,59,a);rect(c,x+3,y+3,58,2,'#72868a');rect(c,x+3,y+5,2,52,b);rect(c,x+5,y+57,54,3,'#233b49');
 if(wall){rect(c,x+4,y+13,56,41,'#233d4c');for(let r=0;r<3;r++)for(let i=0;i<2;i++){let bx=x+6+i*27+(r%2?5:0),by=y+10+r*14;rect(c,bx,by,Math.min(24,x+58-bx),12,b);rect(c,bx,by,Math.min(24,x+58-bx),2,'#91a097');}rect(c,x+8,y+4,47,8,'#7b8c89');rect(c,x+12,y+3,38,3,'#a1aaa0');rect(c,x+5,y+10,11,3,moss);rect(c,x+8,y+13,5,7,moss);}
 else {let n=(x*13+y*17)%5;rect(c,x+8+n*4,y+13,16,2,b);rect(c,x+10+n*4,y+15,4,5,b);rect(c,x+43,y+34,11,2,'#263e4a');rect(c,x+49,y+32,2,4,'#263e4a');rect(c,x+8,y+8,14,2,'#83948d44');rect(c,x+8,y+10,2,7,'#83948d22');rect(c,x+20,y+43,17,2,'#233b4966');rect(c,x+34,y+45,2,6,'#233b4966');rect(c,x+39,y+49,10,2,b);if((x+y)%192!==64){rect(c,x+6,y+44,11,5,moss);rect(c,x+9,y+41,4,5,moss);rect(c,x+16,y+47,5,3,'#96a17f');rect(c,x+5,y+49,5,2,'#435e58');}if((x+y)%256===0){rect(c,x+48,y+12,6,2,'#d5d3ad');rect(c,x+50,y+10,2,6,'#d5d3ad');rect(c,x+50,y+12,2,2,'#d6ac58');}}
}
function makeFloor(g){let k=g.room%12+':'+g.core.map.map(row=>row.map(p=>p&R.WALL?1:0).join('')).join('');if(k===floorKey)return;floorKey=k;floor=document.createElement('canvas');floor.width=floor.height=384;let c=floor.getContext('2d');let tint=Math.floor(g.room%12/4);for(let y=0;y<6;y++)for(let x=0;x<6;x++)tile(c,x*C,y*C,!!(g.core.map[y][x]&R.WALL),tint);}
export function sprite(c,i,x,y,size=56,alpha=1){c.save();c.globalAlpha=alpha;if(sprites.complete&&sprites.naturalWidth){let sw=sprites.naturalWidth/4,sh=sprites.naturalHeight/2;c.imageSmoothingEnabled=false;c.drawImage(sprites,(i%4)*sw,Math.floor(i/4)*sh,sw,sh,Math.round(x-size/2),Math.round(y-size/2),size,size);}else{rect(c,x-size/4,y-size/4,size/2,size/2,['#dfd5ac','#b9776b','#b8bad3','#718c83','#c79a47','#b2d4d1','#d7ac57','#b5bd9a'][i]);}c.restore();}
export function draw(canvas,g,{now=0,progress=1,events=[],mode='',hint=null,reduced=false}={}){
 let c=canvas.getContext('2d');c.imageSmoothingEnabled=false;makeFloor(g);c.clearRect(0,0,384,384);c.drawImage(floor,0,0);let hp=g.core.player;
 for(let y=0;y<6;y++)for(let x=0;x<6;x++)if(g.core.getCheck(x,y)&&!(g.core.map[y][x]&R.WALL)){rect(c,x*C+7,y*C+52,50,5,'#bc7d7155');c.strokeStyle='#c38b7a';c.lineWidth=2;c.strokeRect(x*C+5,y*C+5,54,54);for(let i=0;i<3;i++)rect(c,x*C+12+i*15,y*C+55,6,2,'#dcaa88');}
 if(mode==='dash'){for(let i=0;i<4;i++){let[dx,dy]=VECTORS[i];for(let n=1;n<=(g.profile.build.reach?3:2);n++){let x=hp.x+dx*n,y=hp.y+dy*n;if(!g.core.inside(x,y)||g.core.map[y][x]&R.WALL)break;rect(c,x*C+7,y*C+7,50,50,'#95d6d02a');}}}
 let ex=g.exit;rect(c,ex.x*C+7,ex.y*C+7,50,50,g.open?'#d4bb6b44':'#182d3d66');sprite(c,7,ex.x*C+32,ex.y*C+30,60,g.open?1:.42);
 for(const gem of g.meta.gems){let bob=reduced?0:Math.round(Math.sin(now*.003+gem.x)*1.5);sprite(c,5,gem.x*C+47,gem.y*C+20+bob,29);}
 let actors=g.core.enemies().map(e=>({...e,i:e.property&R.BOMB?4:e.property&R.TURNER?1:e.property&R.MOVER?2:3}));actors.push({...hp,i:0,hero:true});
 for(const a of actors){let cx=a.x*C+32,cy=a.y*C+31;const move=events.find(e=>e.kind==='move'&&e.x===a.x&&e.y===a.y&&!!e.hero===!!a.hero);if(move&&progress<1){let u=1-Math.pow(1-progress,3);cx=(move.from.x+(a.x-move.from.x)*u)*C+32;cy=(move.from.y+(a.y-move.from.y)*u)*C+31-Math.sin(progress*Math.PI)*7;}
  rect(c,cx-19,cy+20,38,6,'#10293899');let bob=reduced?0:Math.round(Math.sin(now*.003+a.x+a.y*2)*1.2);if(a.hero){c.strokeStyle=g.core.ward?'#acd4c8':'#cfb068';c.lineWidth=2;c.strokeRect(cx-25,cy-25,50,52);}sprite(c,a.i,cx,cy+bob,58);
  if(!a.hero&&!(a.property&R.BOMB)){c.font='21px Thimble,monospace';c.textAlign='center';c.fillStyle='#fff0b9';let text=a.property&R.TURNER?['↑','→','↓','←'][DIRS.findIndex(d=>a.property&d)]||'·':a.property&R.MOVER?'↔':'+';rect(c,a.x*C+44,a.y*C+44,18,18,'#183241dd');c.fillText(text,a.x*C+53,a.y*C+60);}
 }
 if(progress<1&&!reduced){let p=progress;for(const e of events){let x=e.x*C+32,y=e.y*C+32;if(e.kind==='defeat'||e.kind==='blast'||e.kind==='gem'){if(e.kind==='defeat')sprite(c,e.property&R.TURNER?1:e.property&R.MOVER?2:3,x,y,58*(1-p),1-p);for(let j=0;j<8;j++){let a=j*Math.PI/4,dist=p*40;rect(c,Math.round(x+Math.cos(a)*dist),Math.round(y+Math.sin(a)*dist-p*p*13),4,4,e.kind==='gem'?'#d5f0df':'#f4ce7f');}}
   if(['attack','spark','blast'].includes(e.kind)){c.strokeStyle=e.hero?'#fff0b9':'#dea389';c.lineWidth=5*(1-p)+1;c.beginPath();c.moveTo(x-16+p*20,y+19-p*20);c.lineTo(x+17,y-16);c.stroke();}
   if(['shield','guard'].includes(e.kind)){c.strokeStyle='#aed6cc';c.lineWidth=3;c.strokeRect(x-22-p*12,y-23-p*12,44+p*24,46+p*24);}
  }}
 if(hint){const p=g.core.player;let x=p.x*C+32,y=p.y*C+32;c.fillStyle='#ffe3a2';c.font='bold 40px Thimble,monospace';c.textAlign='center';let idx=DIRS.indexOf(hint.dir);if(idx>=0){let[dx,dy]=VECTORS[idx];c.fillText(['↑','→','↓','←'][idx],x+dx*42,y+dy*42+12);}else c.fillText(hint.mode==='guard'?'◈':'✦',x,y+12);}
}

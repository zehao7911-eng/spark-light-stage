import {LEVELS} from './core.js';
export const T=76,OX=58,OY=230;
export const pos=(x,y)=>[OX+(x+.5)*T,OY+(y+.5)*T];
export class Art{
 constructor(canvas,images,frames){this.c=canvas;this.g=canvas.getContext('2d');this.images=images;this.frames=frames;this.fx=[];this.shake=0;this.t=0}
 sprite(i,x,y,h,flip=false){const g=this.g,f=this.frames[i],r=f.r,k=h/r[3],ax=i<15?f.ax:r[0]+r[2]/2;g.save();g.translate(x,y);if(flip)g.scale(-1,1);g.drawImage(this.images.sprites,...r,-(ax-r[0])*k,-h,r[2]*k,h);g.restore()}
 burst(e){let [x,y]=pos(e.x||4,e.y||5);let colors=e.type==='bird'?['#a8ffff','#fff0ac','#66d6df']:e.type==='crate'?['#d1a36f','#704c45','#f9d992']:['#ffb963','#fff5b4','#f37c6a'];for(let i=0;i<(e.type==='blast'?24:12);i++){let a=Math.random()*6.28,v=50+Math.random()*150;this.fx.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-70,t:0,life:.6+Math.random()*.6,c:colors[i%3],r:3+Math.random()*6})}if(e.type==='bird')this.fx.push({x,y,bird:true,t:0,life:1.8});if(e.type==='blast')this.shake=.22;this.fx=this.fx.slice(-180)}
 draw(s,dt){this.t+=dt;const g=this.g,t=this.t;g.clearRect(0,0,800,1200);g.save();if(this.shake>0){this.shake-=dt;g.translate(Math.sin(t*83)*4,Math.cos(t*67)*3)}g.drawImage(this.images[['market','garden','observatory'][LEVELS[s.level].theme]],0,0,800,1200);
 // Warm stone inlays define traversable lanes without covering the illustration.
 for(let y=1;y<10;y++)for(let x=1;x<8;x++){const [px,py]=pos(x,y);g.fillStyle=s.grid[y][x]===4?'#184d62':'#eecf9b0c';g.beginPath();g.roundRect(px-34,py-34,68,68,10);g.fill();if(s.grid[y][x]===4){g.strokeStyle='#79c5c95c';g.lineWidth=2;g.beginPath();g.ellipse(px,py+Math.sin(t*2+x)*4,25,8,0,0,7);g.stroke()}}
 for(const [x,y] of LEVELS[s.level].springs||[]){let p=pos(x,y);this.sprite(22,p[0],p[1]+18,51)}
 let gate=pos(4,1),open=s.birds>=s.required&&s.hasKey;g.save();g.translate(...gate);g.shadowColor=open?'#9affee':'#d9b16d';g.shadowBlur=open?25:3;g.strokeStyle=open?'#b3fff0':'#b69b68';g.lineWidth=7;g.beginPath();g.arc(0,-30,30,Math.PI,0);g.lineTo(30,25);g.moveTo(-30,-30);g.lineTo(-30,25);g.stroke();g.fillStyle=open?'#a4ffdf77':'#26394177';g.fillRect(-24,-30,48,53);g.font='bold 18px Georgia';g.textAlign='center';g.fillStyle='#fff4c6';g.fillText(open?'EXIT':s.birds+'/'+s.required,0,9);g.restore();
 for(const q of s.pickups){let p=pos(q.x,q.y),bob=Math.sin(t*3)*4;if(q.type==='key')this.sprite(23,p[0],p[1]+15+bob,46);else{g.save();g.translate(p[0],p[1]+bob);g.rotate(t*.3);g.fillStyle='#f4d07d';g.shadowColor='#ffd27b';g.shadowBlur=18;g.beginPath();for(let i=0;i<12;i++){let a=i*Math.PI/6,r=i%2?12:23;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fill();g.restore()}}
 for(const b of s.bombs){if(b.primed)continue;const progress=b.timer/b.timerMax;g.fillStyle=progress>.65?'#ffb65a55':'#ffc96c19';for(const p of b.getDangerPositions()){let [x,y]=pos(p.x,p.y);g.beginPath();g.roundRect(x-32,y-32,64,64,12);g.fill()}let [x,y]=pos(b.position.x,b.position.y);g.strokeStyle='#ffe2a1';g.lineWidth=4;g.beginPath();g.arc(x,y,31,-Math.PI/2,-Math.PI/2+progress*Math.PI*2);g.stroke()}
 const objects=[];for(let y=1;y<10;y++)for(let x=1;x<8;x++){let v=s.grid[y][x];if(v===1||v===2||v===3)objects.push({x,y,i:v===1?18:v===2?17:19,h:v===1?83:v===2?68:85})}
 for(const b of s.bombs)objects.push({x:b.position.x,y:b.position.y,i:b.primed?21:15,h:b.primed?69:57+Math.sin(t*15)*2});
 const interp=(p)=>{let z=p.move>0?Math.min(1,p.move/(p.moveMax||.36)):0;return {x:p.x+(p.fromX-p.x)*z,y:p.y+(p.fromY-p.y)*z,hop:p.hop?Math.sin(z*Math.PI)*25:0}};
 for(const e of s.enemies)if(e.alive)objects.push({...interp(e),i:16,h:64+Math.sin(t*4+e.id)*3});let p=interp(s.player);objects.push({...p,i:s.won?13:s.hurt>0&&s.invul>1.55?14:s.player.move>0?(s.player.dir===0?6:0)+Math.floor(t*10)%6:12,h:102,hero:true,flip:s.player.dir===3});
 objects.sort((a,b)=>a.y-b.y);for(const o of objects){let [x,y]=pos(o.x,o.y);g.fillStyle='#081e3044';g.beginPath();g.ellipse(x,y+16,o.hero?25:28,10,0,0,7);g.fill();if(o.hero&&s.invul>0&&s.hurt>0)g.globalAlpha=.65+Math.sin(t*18)*.25;this.sprite(o.i,x,y+22-(o.hop||0),o.h,o.flip);g.globalAlpha=1}
 for(const f of s.fires){let [x,y]=pos(f.x,f.y);g.save();g.globalAlpha=Math.min(1,f.ttl*3);g.shadowBlur=25;g.shadowColor='#ff9b4e';g.fillStyle='#ffb95a';g.beginPath();g.roundRect(x-29,y-26,58,52,19);g.fill();g.fillStyle='#fff5bd';g.beginPath();g.arc(x,y,17+Math.sin(t*32)*4,0,7);g.fill();g.restore()}
 for(const f of this.fx){f.t+=dt;if(f.t>=f.life)continue;if(f.bird){let u=f.t/f.life;this.sprite(20,f.x+(gate[0]-f.x)*u,f.y+(gate[1]-f.y)*u-Math.sin(u*Math.PI)*130,42)}else{f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=190*dt;g.globalAlpha=1-f.t/f.life;g.fillStyle=f.c;g.beginPath();g.arc(f.x,f.y,f.r*(1-f.t/f.life),0,7);g.fill();g.globalAlpha=1}}this.fx=this.fx.filter(f=>f.t<f.life);
 g.restore();
 }
}

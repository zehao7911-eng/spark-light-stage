export const GLOWS={honey:'#ffd779',peach:'#ffc0ab',starlight:'#c2e9ff'};
export function points(n){let step=n===3?84:64;return Array.from({length:n*n},(_,i)=>[180+(i%n-(n-1)/2)*step,235+(Math.floor(i/n)-(n-1)/2)*step])}
const image=(url,errors)=>new Promise(resolve=>{let im=new Image(),done=false,t=setTimeout(()=>end(null),12000);function end(v){if(done)return;done=true;clearTimeout(t);if(!v)errors.push(url);resolve(v)}im.onload=()=>end(im);im.onerror=()=>end(null);im.src=url});
export class Artist{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.time=0;this.fx=[];this.preview=null;this.touch=0;this.errors=[];this.ready=this.load()}
 async load(){this.errors=[];let names=['cottage','canal','windmill'];this.backgrounds=await Promise.all(names.map(n=>image('assets/'+n+'.webp',this.errors)));this.sprites=await Promise.all(Array.from({length:16},(_,i)=>image('assets/resident-'+i+'.webp',this.errors)));return this}
 resize(w,h){let ratio=Math.min(devicePixelRatio||1,2);this.canvas.width=Math.round(w*ratio);this.canvas.height=Math.round(h*ratio)}
 burst(x,y,colour){for(let i=0;i<12;i++){let a=i*Math.PI/6;this.fx.push({x,y,vx:Math.cos(a)*27,vy:Math.sin(a)*27-15,life:.7,max:.7,colour})}if(this.fx.length>240)this.fx.splice(0,this.fx.length-240);this.touch=.45}
 update(dt){this.time+=dt;this.touch=Math.max(0,this.touch-dt);for(let f of this.fx){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=20*dt;f.life-=dt}this.fx=this.fx.filter(f=>f.life>0)}
 sprite(i,x,base,h,alpha=1){let im=this.sprites?.[i];if(!im)return;let c=this.ctx,w=h*im.width/im.height;c.save();c.globalAlpha=alpha;c.drawImage(im,x-w/2,base-h,w,h);c.restore()}
 backdrop(index){let c=this.ctx,im=this.backgrounds?.[index];if(!im){c.fillStyle='#314e60';c.fillRect(0,0,360,440);c.fillStyle='#ddc598';c.fillRect(42,93,276,276);c.fillStyle='#658377';c.beginPath();c.moveTo(22,95);c.lineTo(180,9);c.lineTo(338,95);c.fill();return}let sx=[0,.14*im.width,.86*im.width,im.width],sy=[0,.26*im.height,.72*im.height,im.height],dx=[0,48,312,360],dy=[0,98,367,440];for(let y=0;y<3;y++)for(let x=0;x<3;x++)c.drawImage(im,sx[x],sy[y],sx[x+1]-sx[x],sy[y+1]-sy[y],dx[x],dy[y],dx[x+1]-dx[x],dy[y+1]-dy[y])}
 draw(r,p,hint=null){let c=this.ctx;c.setTransform(this.canvas.width/360,0,0,this.canvas.height/440,0,0);c.clearRect(0,0,360,440);this.backdrop(r.house.scene);let pts=points(r.house.n),size=r.house.n===3?69:53,glow=GLOWS[p.glow],t=p.gentle?0:this.time;
  // Dusk washes the wall, not the interface. Illuminated panes retain their warmth.
  c.fillStyle='rgba(32,51,75,.24)';c.fillRect(0,0,360,440);
  let cross=this.preview!==null?([this.preview,...pts.map((_,i)=>i).filter(i=>Math.abs(i%r.house.n-this.preview%r.house.n)+Math.abs(Math.floor(i/r.house.n)-Math.floor(this.preview/r.house.n))===1)]):[];
  pts.forEach(([x,y],i)=>{let lit=(r.board>>i)&1;if(lit){let gr=c.createRadialGradient(x,y,1,x,y,size*.83);gr.addColorStop(0,glow+'70');gr.addColorStop(1,glow+'00');c.fillStyle=gr;c.fillRect(x-size*.83,y-size*.83,size*1.66,size*1.66)}let im=this.sprites?.[lit?15:14];c.save();c.shadowColor='#293e4f66';c.shadowBlur=5;c.shadowOffsetY=2;if(im)c.drawImage(im,x-size/2,y-size/2,size,size);else{c.fillStyle=lit?glow:'#344f62';c.fillRect(x-size/2,y-size/2,size,size);c.strokeStyle='#725b3c';c.lineWidth=5;c.strokeRect(x-size/2,y-size/2,size,size);c.beginPath();c.moveTo(x-size/2,y);c.lineTo(x+size/2,y);c.moveTo(x,y-size/2);c.lineTo(x,y+size/2);c.stroke()}c.restore();
   if(lit&&p.glow!=='honey'){c.save();c.globalCompositeOperation='screen';c.globalAlpha=.4;c.fillStyle=glow;c.fillRect(x-size*.34,y-size*.32,size*.68,size*.64);c.restore()}
   if(cross.includes(i)){c.strokeStyle='#fff2be';c.lineWidth=2;c.setLineDash([3,3]);c.strokeRect(x-size/2-3,y-size/2-3,size+6,size+6);c.setLineDash([])}
   if(i===hint||(!r.moves&&!r.index&&i===4)){let pulse=1+Math.sin(t*4)*.07;c.save();c.translate(x,y);c.scale(pulse,pulse);c.strokeStyle='#fff0ad';c.lineWidth=3;c.strokeRect(-size/2-4,-size/2-4,size+8,size+8);c.fillStyle='#fdf1b0';c.beginPath();c.moveTo(-5,-size/2-14);c.lineTo(5,-size/2-14);c.lineTo(0,-size/2-8);c.fill();c.restore()}
  });
  // Door opens when the puzzle is actually solved, then the new neighbour steps outside.
  if(r.won){let gr=c.createRadialGradient(180,393,0,180,393,72);gr.addColorStop(0,glow+'cc');gr.addColorStop(1,glow+'00');c.fillStyle=gr;c.fillRect(108,335,144,105);c.fillStyle='#ffe2a2';c.beginPath();c.roundRect(164,375,32,41,[16,16,0,0]);c.fill();let emergence=p.gentle?1:Math.min(1,this.time/1.2);this.sprite(r.index,180+24*emergence,433,83*emergence+.5,emergence)}
  this.sprite(this.touch>0?13:12,35,433,61+Math.sin(t*2)*.5);
  // A bounded ambient layer, at most twenty fireflies and twelve rain strokes.
  for(let i=0;i<20;i++){let x=12+(i*71.3+t*(3+i%3))%336,y=375+Math.sin(i*3+t*.8)*42,alpha=.25+.35*(1+Math.sin(i+t*2))/2;c.fillStyle=glow;c.globalAlpha=alpha;c.beginPath();c.arc(x,y,1.2+(i%3)*.25,0,7);c.fill()}c.globalAlpha=1;
  if(r.house.scene===1&&!p.gentle){c.strokeStyle='#dce8f333';c.lineWidth=.7;for(let i=0;i<12;i++){let x=(i*47+25)%360,y=(i*71+t*47)%440;if(x>47&&x<313&&y>95&&y<366)continue;c.beginPath();c.moveTo(x,y);c.lineTo(x-3,y+11);c.stroke()}}
  if(!p.gentle)for(let f of this.fx){c.globalAlpha=f.life/f.max;c.fillStyle=f.colour;c.beginPath();c.arc(f.x,f.y,1.5,0,7);c.fill()}c.globalAlpha=1;
 }
}

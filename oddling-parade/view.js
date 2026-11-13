(function () {
  'use strict';
  const A=OddArt, {FAMILIES:F, REQUESTS, mod}=OddCore;
  const {shape,ellipse,line,star,mark,part,creature,INK,CREAM}=A;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const smooth=n=>{n=clamp(n,0,1);return n*n*(3-2*n);};
  class View {
    constructor(canvas) {
      this.canvas=canvas;this.c=canvas.getContext('2d',{alpha:false});
      this.t=0;this.fx=[];this.flash=null;this.petT=0;this.room=-1;
      this.cache=new Map();this.resize();
    }
    resize() {
      const r=this.canvas.getBoundingClientRect();this.w=r.width;this.h=r.height;
      this.dpr=Math.min(devicePixelRatio||1,1.5);
      this.canvas.width=Math.round(r.width*this.dpr);this.canvas.height=Math.round(r.height*this.dpr);
      this.c.setTransform(this.dpr,0,0,this.dpr,0,0);this.room=-1;
      this.top=clamp(this.h*.16,50,108);this.lane=(this.h-this.top-18)/3;
      this.rows=[0,1,2].map(i=>this.top+this.lane*(i+.5));
      this.cell=clamp(this.w*.315,98,165);this.s=Math.min(this.lane/157,this.w/405,1.06);
    }
    sprite(row,family) {
      const key=row+':'+family;
      if(!this.cache.has(key)){
        const canvas=document.createElement('canvas');canvas.width=400;canvas.height=300;
        const c=canvas.getContext('2d');part(c,row,family,200,160,1.75);
        this.cache.set(key,canvas);
      }return this.cache.get(key);
    }
    tile(c,row,family,x,y,s=this.s) {
      c.drawImage(this.sprite(row,family),x-400/1.75*s/2,y-160/1.75*s,400/1.75*s,300/1.75*s);
    }
    background(room) {
      this.room=room;const w=this.w,h=this.h;
      this.bg=document.createElement('canvas');this.bg.width=this.canvas.width;this.bg.height=this.canvas.height;
      const c=this.bg.getContext('2d');c.scale(this.dpr,this.dpr);
      const P=[['#233944','#34505a','#9a6b5c','#d8b781'],['#243d46','#3d5d61','#7d6472','#b4ceba'],['#323c42','#536357','#65586a','#bac583'],['#393144','#645060','#9d5a62','#e8b981']][room];
      c.fillStyle=P[0];c.fillRect(0,0,w,h);
      // Four authored theatre facades: brass proscenium, moon windows, living bower, festival cloth.
      if(room===0){
        for(let side of [-1,1]){c.save();c.translate(w/2,0);c.scale(side,1);
          shape(c,`M${w*.5} 0L${w*.39} 0Q${w*.27} ${h*.22} ${w*.43} ${h*.71}L${w*.5} ${h*.9}Z`,'#79525a');
          line(c,`M${w*.43} 0Q${w*.32} ${h*.3} ${w*.48} ${h*.75}`,'#aa7370',4);
          for(let j=0;j<6;j++)line(c,`M${w*(.40+j*.015)} 2Q${w*(.3+j*.03)} ${h*.3} ${w*.49} ${h*.73}`,'#553e4e',1.4);
          c.restore();}
        shape(c,`M-10 0H${w+10}L${w+10} 43Q${w*.72} 15 ${w/2} 51Q${w*.28} 14-10 43Z`,P[2]);
      }else if(room===1){
        for(const x of [w*.08,w*.92]){
          shape(c,`M${x-26} ${h*.65}V72Q${x} 18 ${x+26} 72V${h*.65}Z`,'#698a83');
          line(c,`M${x} 60V${h*.62}M${x-21} 115H${x+21}M${x-21} 218H${x+21}`,P[0],5);
          mark(c,3,x,94,.75,'#d8c493');
        }
        line(c,`M0 16Q${w*.25} 76 ${w*.5} 16Q${w*.75} 76 ${w} 16`,INK,5);
      }else if(room===2){
        for(const side of [-1,1]){c.save();c.translate(w/2,0);c.scale(side,1);
          line(c,`M${w*.48} ${h}Q${w*.26} ${h*.5} ${w*.48} 0`,'#68594f',25);
          for(let i=0;i<8;i++){let y=20+i*h*.12;shape(c,`M${w*.44} ${y}Q${w*.24} ${y-26} ${w*.28} ${y+33}Q${w*.43} ${y+51} ${w*.44} ${y}`,i%2?'#6b815b':'#476c5d',INK,3);line(c,`M${w*.43} ${y+6}L${w*.31} ${y+24}`,'#253f3d',1.8);}
          c.restore();}
        shape(c,`M0 0Q${w*.2} 70 ${w*.5} 28Q${w*.8} 74 ${w} 0Z`,'#738451');
      }else{
        for(let i=0;i<8;i++){
          const x=i*w/7;shape(c,`M${x-32} 0H${x+32}L${x+18} 55L${x} 42L${x-18} 55Z`,i%2?'#b17470':'#a79769');
          ellipse(c,x,19,4,4,'#f2ce87',2);
        }
        for(const x of [w*.045,w*.955]){shape(c,`M${x-9} 30L${x+10} 30L${x+13} ${h*.88}H${x-14}Z`,'#8a6970');line(c,`M${x-4} 48L${x+4} ${h*.8}`,'#c69081',3);}
      }
      // Flat, inked floorboards and a restrained pool of light.
      shape(c,`M0 ${h*.86}Q${w*.5} ${h*.80} ${w} ${h*.86}V${h}H0Z`,P[1]);
      for(let i=-4;i<5;i++)line(c,`M${w/2+i*26} ${h*.84}L${w/2+i*85} ${h}`,P[0],2);
      ellipse(c,w/2,h*.92,w*.34,h*.045,P[0],0,null);
      c.save();c.globalAlpha=.09;shape(c,`M${w*.27} 0L${w*.92} ${h}H${w*.12}L${w*.6} 0Z`,P[3],null);c.restore();
      // Hand-cut stars, tiny moths, carved joins, a candle and gathered stitches.
      for(let i=0;i<10;i++){let x=(i%2?w*.96:w*.04),y=70+i*h*.073;star(c,x,y,3.8,P[3]);}
      for(const x of [w*.055,w*.945]){
        const y=h*.82;
        shape(c,`M${x-7} ${y}H${x+7}V${y-26}H${x-7}Z`,CREAM,INK,2.2);
        shape(c,`M${x} ${y-51}Q${x+12} ${y-37} ${x} ${y-31}Q${x-12} ${y-37} ${x} ${y-51}`,'#e9ae69',INK,2);
        ellipse(c,x,y+1,12,4,'#bd946b',2.2);
      }
      // Deterministic sparse grain belongs to the backdrop, not the moving actors.
      c.globalAlpha=.075;c.fillStyle=CREAM;
      for(let i=0;i<340;i++){const x=((i*79+19)%499)/499*w,y=((i*127+7)%503)/503*h;c.fillRect(x,y,1,1.2);}c.globalAlpha=1;
    }
    text(s,x,y,size=13,color=CREAM,align='left',font='Arial') {
      const c=this.c;c.fillStyle=color;c.textAlign=align;c.textBaseline='middle';c.font=`700 ${size}px ${font}`;c.fillText(s,x,y);
    }
    fxEvent(e) {
      if(e.type==='request'){this.fx=[];this.flash=null;this.petT=0;return;}
      if(e.type==='pin'){
        this.flash={row:e.row,age:0,perfect:e.perfect,match:e.match};
        this.burst(this.w/2-this.cell*.47,this.rows[e.row],e.match?'#e6bd76':F[e.family].color,7);
        this.burst(this.w/2+this.cell*.47,this.rows[e.row],e.match?'#e6bd76':F[e.family].color,7);
      }
      if(e.type==='hatch'){this.burst(this.w*.14,this.h*.43,'#edc57f',24);this.burst(this.w*.86,this.h*.43,'#edc57f',24);this.pet(e.result.parts);}
      if(e.type==='undo')this.flash=null;
    }
    burst(x,y,color,n,kind='star') {
      for(let i=0;i<n;i++){const a=i*2.399,sp=45+(i%8)*13;this.fx.push({x:x+Math.cos(a)*9,y:y+Math.sin(a)*9,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-35,life:.6+i%6*.13,age:0,color,r:2.3+i%3,kind});}
      if(this.fx.length>110)this.fx.splice(0,this.fx.length-110);
    }
    pet(parts) {
      this.petT=1.15;this.petFamily=parts[1];
      const kind=['star','spore','drop','moth','leaf'][parts[1]];
      this.burst(this.w*.24,this.h*.49,F[parts[1]].color,12,kind);
      this.burst(this.w*.76,this.h*.49,F[parts[1]].color,12,kind);
    }
    drawParade(parts,dt=0,motion=true) {
      if(dt>0)this.t+=dt;
      const c=this.c,w=this.w,h=this.h;
      if(this.room!==3)this.background(3);c.drawImage(this.bg,0,0,w,h);
      shape(c,`M0 ${h*.61}Q${w/2} ${h*.56} ${w} ${h*.61}V${h}H0Z`,'#68545e');
      for(let i=-5;i<=5;i++)line(c,`M${w/2+i*24} ${h*.59}L${w/2+i*112} ${h}`,'#3b3546',2.2);
      this.text('THE TROUPE TAKES A BOW',w/2,Math.max(24,h*.09),clamp(w*.036,12,19),'#e8c58a','center','Georgia');
      if(h>300)this.text('Every little oddity belongs here.',w/2,h*.15,11,'#c4c7af','center');
      const count=parts.length,space=Math.min(160,w*.39),total=Math.max(w+220,count*space);
      const scale=Math.min(w/540,h/550,.8);
      // Culling bounds rendering even after all 125 combinations have been collected.
      parts.forEach((partSet,i)=>{
        const x=mod(i*space-this.t*(motion?27:0),total)-90;
        if(x< -100||x>w+100)return;
        const s=scale*(i%2?1:.83),floor=h*(i%2?.88:.74),y=floor-s*104+(motion?Math.sin(this.t*5+i)*3:0);
        ellipse(c,x,floor,s*47,s*8,'#392e40',0,null);
        creature(c,partSet,x,y,s,motion?this.t+i:0,Math.sin(this.t+i)>.2);
      });
      line(c,`M${w*.12} ${h*.27}Q${w/2} ${h*.34} ${w*.88} ${h*.27}`,'#b89b79',2.2);
      for(let i=0;i<5;i++){const x=w*(.18+i*.16),y=h*(.28+Math.sin(i*Math.PI/4)*.027);ellipse(c,x,y,14,17,F[i].color,2.2);mark(c,i,x,y,.60,CREAM);}
      for(let i=0;i<7;i++){const x=(i+.5)*w/7;star(c,x,h*.25+Math.sin(this.t*.8+i)*4,3+(i%2),'#d7b47d');}
      if(h>300)this.text('Tap the stage for an encore',w/2,h*.96,10,'#c4c7af','center');
      for(let i=this.fx.length-1;i>=0;i--){const f=this.fx[i];if(dt>0){f.age+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=90*dt;}if(f.age>=f.life){this.fx.splice(i,1);continue;}c.save();c.globalAlpha=1-f.age/f.life;star(c,f.x,f.y,f.r,f.color);c.restore();}
    }
    draw(game,dt=0,motion=true) {
      if(dt>0){this.t+=dt;if(this.flash)this.flash.age+=dt;this.petT=Math.max(0,this.petT-dt);}
      const c=this.c,w=this.w,h=this.h,room=REQUESTS[game.job]?.room??3;
      if(room!==this.room)this.background(room);
      c.drawImage(this.bg,0,0,w,h);
      const isStage=game.phase!=='play',p=isStage?smooth(game.age/1.1):0;
      if(!isStage){
        const label=game.target?'MAKE THIS GUEST':'MIX SOMETHING NEW';
        this.text(label,23,Math.max(17,this.top*.22),h<350?8:9,'#e3c998');
        const title=REQUESTS[game.job]?.name||'Freestyle';
        let size=clamp(w*.045,15,23);c.font=`700 ${size}px Georgia`;
        while(c.measureText(title).width>w-127&&size>13){size--;c.font=`700 ${size}px Georgia`;}
        this.text(title,23,this.top*.52,size,CREAM,'left','Georgia');
        if(game.target){const sy=Math.min(this.top/300,.36);ellipse(c,w-56,this.top*.48,this.top*.39,this.top*.39,'#b99b76',2.5);creature(c,game.target,w-56,this.top*.54,sy,0);}
        if(game.job===0&&!game.started){line(c,`M${w/2+42} ${this.rows[0]-this.lane*.4}Q${w/2+78} ${this.rows[0]-this.lane*.58} ${w/2+80} ${this.rows[0]-this.lane*.27}`,CREAM,2.5);}
      }
      if(p<.75){
        c.save();c.globalAlpha=1-smooth(p/.72);
        for(let row=0;row<3;row++){
          const cy=this.rows[row],lh=this.lane*.91,active=game.phase==='play'&&row===game.active,locked=row<game.active;
          const left=12,right=w-12,up=cy-lh/2,down=cy+lh/2;
          shape(c,`M${left+7} ${up+5}L${right-5} ${up+7}L${right} ${down+5}L${left} ${down+8}Z`,'#152b34');
          shape(c,`M${left+3} ${up}L${right-5} ${up+2}L${right} ${down-2}L${left+5} ${down}Z`,active?'#ddcba6':locked?'#6f8b84':'#58717a',INK,3);
          line(c,`M${left+10} ${up+8}H${right-10}M${left+10} ${down-8}H${right-10}`,active?'#ac9175':'#344d58',1.5);
          c.save();c.beginPath();c.rect(left+3,up+3,right-left-6,lh-6);c.clip();
          c.globalAlpha*=active||locked?1:.63;
          // The centre window has a matching symbol; the remaining paper is one moving strip.
          const now=game.nearest(Math.min(row,2));
          if(active){c.save();c.globalAlpha*=.16;shape(c,`M${w/2-this.cell*.48} ${up+3}H${w/2+this.cell*.48}V${down-3}H${w/2-this.cell*.48}Z`,game.target&&now.family===game.target[row]?'#34796a':'#fff5d5',null);c.restore();}
          const ypos=cy+(row===2?this.lane*.09:this.lane*.065);
          if(locked)this.tile(c,row,game.chosen[row],w/2,ypos);
          else{
            const phase=game.offsets[row],near=Math.floor(phase);
            for(let j=near-3;j<=near+3;j++){
              const x=w/2+(j-phase)*this.cell,fa=mod(j,game.available);
              if(x< -this.cell||x>w+this.cell)continue;
              this.tile(c,row,fa,x,ypos+Math.sin(this.t*1.7+j)*1.8);
              if(this.lane>106)mark(c,fa,x,down-17,.32,'#eee0ba');
            }
          }
          c.restore();
          this.text(['HEAD','COAT','FEET'][row],25,up+16,clamp(this.lane*.076,8,10),active?INK:CREAM);
          if(game.target){mark(c,game.target[row],w-28,up+17,.40,locked?(game.chosen[row]===game.target[row]?'#b8d69b':'#d18c83'):'#ead1a0');}
          if(active){
            const x=w/2,xx=this.cell*.47,yy=lh*.36,col=game.target&&now.family===game.target[row]?'#335e51':'#fff0c7';
            line(c,`M${x-xx+9} ${cy-yy}H${x-xx}V${cy-yy+13}M${x+xx-9} ${cy-yy}H${x+xx}V${cy-yy+13}M${x-xx+9} ${cy+yy}H${x-xx}V${cy+yy-13}M${x+xx-9} ${cy+yy}H${x+xx}V${cy+yy-13}`,col,2.8);
            shape(c,`M${x-5} ${up-3}L${x+5} ${up-3}L${x} ${up+4}Z`,'#edbf72',INK,2);
          }
          if(locked){
            const py=cy-lh*.29;
            line(c,`M${w/2} ${py-5}L${w/2-4} ${py+14}`,INK,3);
            ellipse(c,w/2,py,4.5,4.5,'#e7bd75',2);
            if(row<2){c.save();c.setLineDash([4,5]);line(c,`M${w/2} ${down+2}L${w/2} ${this.rows[row+1]-this.lane*.46}`,'#dac5a0',2);c.restore();}
          }
        }
        c.restore();
      }
      if(isStage){
        const tt=motion?this.t:0,parts=game.chosen;
        const scale=Math.min(w/245,h/420)*(.8+p*.2),y=h*.59+(!motion?0:Math.sin(tt*2)*3);
        c.save();c.globalAlpha=smooth(p/.6);
        // The stage opens behind the assembled paper puppet.
        ellipse(c,w/2,h*.85,w*.30,13,'#172c34',2);
        for(let i=0;i<12;i++){const a=i*Math.PI/6;line(c,`M${w/2+Math.cos(a)*w*.31} ${h*.48+Math.sin(a)*h*.31}L${w/2+Math.cos(a)*w*.34} ${h*.48+Math.sin(a)*h*.34}`,'#9d926e',2.3);}
        const joy=motion&&this.petT>0?Math.sin(this.petT/1.15*Math.PI):0,family=this.petFamily??parts[1];
        let jump=joy*Math.min(h*.045,family===3?55:family===2?17:27),xshift=family===0?Math.sin(this.petT*11)*joy*19:0;
        c.save();c.translate(w/2+xshift,y-jump);
        if(family===1)c.rotate(Math.sin(this.petT*9)*joy*.13);
        if(family===2)c.scale(1+joy*.16,1-joy*.13);
        creature(c,parts,0,0,scale,tt*(joy>0?2.2:1),Math.sin(tt*.7)>.05||joy>0);
        c.restore();
        if(family===4&&joy>0){
          for(let i=0;i<5;i++){
            const x=w/2+(i-2)*w*.10,yy=h*.87+(i%2)*6;
            c.save();c.translate(x,yy);c.scale(joy,joy);line(c,'M0 4V-22','#b1bc79',3);
            for(let j=0;j<5;j++){const a=j*Math.PI*2/5;ellipse(c,Math.cos(a)*7,-24+Math.sin(a)*7,4.8,4.8,'#df9c89',1.6);}
            ellipse(c,0,-24,3.8,3.8,'#f1d393',1.8);c.restore();
          }
        }
        if(game.phase==='result'){
          this.text(game.result.badge,w/2,Math.max(18,h*.062),clamp(w*.033,10,15),'#e5c18b','center','Georgia');
          for(let i=0;i<3;i++)if(game.target){const x=w/2+(i-1)*27;ellipse(c,x,h*.12,8.5,8.5,game.chosen[i]===game.target[i]?'#b7c88b':'#735c66',2);if(game.chosen[i]===game.target[i])line(c,`M${x-4} ${h*.12}L${x-1} ${h*.12+3}L${x+4} ${h*.12-4}`,INK,2);}
          if(h>320)this.text('Tap your oddling',w/2,h*.96,10,'#bcc4b5','center');
        }
        c.restore();
      }
      if(this.flash&&this.flash.age<.62&&game.phase==='play'){
        const f=this.flash,age=f.age,u=Math.sin(Math.min(1,age/.14)*Math.PI/2),y=this.rows[f.row],x=w/2;
        c.save();c.globalAlpha=clamp((.65-age)*4,0,1);c.translate(x,y);c.scale(.83+.17*u,.83+.17*u);
        if(f.perfect)for(let i=0;i<6;i++){const a=i*Math.PI/3;star(c,Math.cos(a)*this.cell*.55,Math.sin(a)*this.lane*.32,4.2,'#fff0c2');}
        c.restore();
      }
      for(let i=this.fx.length-1;i>=0;i--){
        const f=this.fx[i];if(dt>0){f.age+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=90*dt;}if(f.age>=f.life){this.fx.splice(i,1);continue;}
        c.save();c.globalAlpha=1-f.age/f.life;c.translate(f.x,f.y);c.rotate(f.age*3);
        if(f.kind==='star')star(c,0,0,f.r,f.color);
        else if(f.kind==='drop')shape(c,`M0 ${-f.r*1.6}Q${f.r*2} ${f.r} 0 ${f.r}Q${-f.r*2} ${f.r} 0 ${-f.r*1.6}`,f.color,INK,1.5);
        else if(f.kind==='leaf')shape(c,`M${-f.r} ${f.r}Q${-f.r*2} ${-f.r*2} ${f.r*1.6} ${-f.r*1.4}Q${f.r*2} ${f.r*1.7} ${-f.r} ${f.r}`,f.color,INK,1.5);
        else if(f.kind==='moth'){ellipse(c,-f.r*.6,0,f.r,f.r*.7,f.color,1.4);ellipse(c,f.r*.6,0,f.r,f.r*.7,f.color,1.4);line(c,`M0 ${-f.r}V${f.r}`,INK,1.6);}
        else {ellipse(c,0,0,f.r,f.r,'#e6c290',1.4);ellipse(c,0,0,1.1,1.1,f.color,0,null);}
        c.restore();
      }
    }
  }
  window.OddView=View;
})();

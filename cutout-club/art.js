(function(){'use strict';const M=Cutout,ink='#423a43',paper='#f5eddf';
const paths={
 coat:'M178 174 L199 165 L210 177 L221 165 L243 177 L255 250 L237 258 L232 219 L229 274 L247 369 Q211 383 175 369 L190 274 L188 219 L179 257 L161 251 Z',
 overall:'M183 177 L197 174 L199 218 L224 218 L225 174 L238 178 L238 272 L229 315 L234 471 L214 475 L210 341 L204 475 L183 473 L189 314 L181 272 Z',
 suit:'M177 177 L199 167 L210 190 L221 167 L242 177 L254 271 L237 274 L228 207 L228 299 L234 470 L214 474 L209 329 L204 474 L184 471 L190 299 L191 207 L181 273 L165 268 Z',
 pleats:'M178 178 L197 168 Q210 182 222 168 L241 179 L251 248 L235 252 L228 209 L228 276 L250 398 Q211 410 171 397 L191 276 L191 209 L179 254 L164 248 Z',
 puff:'M181 179 L199 168 Q211 180 223 168 L240 180 Q258 195 244 222 L230 214 L229 275 Q243 311 257 385 Q212 407 165 384 Q180 310 191 275 L190 214 L177 223 Q162 200 181 179 Z',
 tulle:'M191 175 L201 169 L210 185 L220 169 L230 175 L231 275 Q259 302 267 384 Q212 409 156 383 Q166 309 191 275 Z',
 puffer:'M177 176 L197 160 L223 161 L244 178 L256 274 L236 280 L230 216 L232 352 Q209 361 183 351 L190 216 L179 279 L159 273 Z',
 longcoat:'M179 174 L199 163 L209 185 L223 163 L243 177 L254 271 L237 277 L229 214 L248 431 L210 422 L172 433 L190 215 L178 274 L163 269 Z',
 sailor:'M179 176 L198 164 L210 185 L222 164 L240 178 L249 230 L232 236 L228 211 L228 275 L246 386 Q210 402 173 387 L191 275 L191 211 L177 236 L163 228 Z',
 parka:'M178 177 L193 161 L226 161 L243 178 L254 270 L236 277 L230 217 L238 360 L210 350 L183 362 L190 216 L179 277 L163 269 Z',
 velvet:'M179 178 L198 166 L209 187 L222 166 L242 179 L252 251 L236 256 L229 214 L229 302 L238 467 L215 476 L210 329 L204 476 L183 470 L190 301 L190 214 L179 257 L163 250 Z',
 cape:'M198 166 L224 166 L254 213 L258 344 L232 333 L243 409 Q210 423 178 410 L188 333 L159 345 L166 211 Z'
};
function rnd(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return(seed>>>0)/4294967296}}
class Art{
 constructor(canvas){this.canvas=canvas;this.c=canvas.getContext('2d');this.time=0;this.change=null;this.confetti=[];this.flash=0;this.makePaper()}
 makePaper(){let c=document.createElement('canvas');c.width=420;c.height=600;let x=c.getContext('2d'),r=rnd(525);x.fillStyle=paper;x.fillRect(0,0,420,600);for(let i=0;i<16000;i++){x.fillStyle=i%2?'#a38a6e16':'#fffbee38';x.fillRect(r()*420,r()*600,r()*2+.3,r()*1.2+.4)}for(let i=0;i<180;i++){let a=r()*420,b=r()*600;x.strokeStyle='#98806d19';x.lineWidth=.4;x.beginPath();x.moveTo(a,b);x.lineTo(a+8+r()*25,b+2);x.stroke()}this.paper=c;}
 cut(path,col,outline=1.25){let c=this.c,p=typeof path==='string'?new Path2D(path):path;c.save();c.shadowColor='#41323b29';c.shadowOffsetX=2;c.shadowOffsetY=3;c.shadowBlur=2;c.fillStyle=col;c.fill(p);c.shadowColor='transparent';c.strokeStyle='#faf2e4';c.lineWidth=4.5;c.stroke(p);c.strokeStyle=ink;c.lineWidth=outline;c.stroke(p);c.restore();return p;}
 line(path,col=ink,w=1){let c=this.c;c.strokeStyle=col;c.lineWidth=w;c.stroke(new Path2D(path))}
 ell(x,y,rx,ry,col,stroke=null,w=1){let c=this.c;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fillStyle=col;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke()}}
 text(t,x,y,size=12,col=ink,font='Georgia',align='center'){let c=this.c;c.font=`${size}px ${font}`;c.fillStyle=col;c.textAlign=align;c.fillText(t,x,y)}
 texture(p,col,kind='weave'){let c=this.c;c.save();c.clip(p);c.strokeStyle=col;c.lineWidth=.5;
  for(let y=175;y<490;y+=kind==='stripe'?9:15){c.beginPath();if(kind==='stripe'){c.moveTo(145,y);c.lineTo(270,y)}else for(let x=157;x<260;x+=17){c.moveTo(x,y);c.lineTo(x+5,y+3);c.moveTo(x+1,y+4);c.lineTo(x+6,y+7)}c.stroke();}c.restore();}
 update(dt){this.time+=dt;this.flash=Math.max(0,this.flash-dt*2);if(this.change){this.change.t+=dt;if(this.change.t>.5)this.change=null;}for(const p of this.confetti){p.t-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=35*dt;}this.confetti=this.confetti.filter(p=>p.t>0)}
 pop(cat){this.change={cat,t:0};for(let i=0;i<12;i++)this.confetti.push({x:210,y:250,vx:Math.sin(i*3)*40,vy:-20-i*4,t:.8,col:['#c98386','#819b83','#dab366'][i%3]});}
 draw(s,p){let c=this.c;c.setTransform(this.canvas.width/420,0,0,this.canvas.height/600,0,0);this.scene(s.level);this.figure(s.look,p.char);for(const q of this.confetti){c.save();c.globalAlpha=Math.min(1,q.t*2);c.translate(q.x,q.y);c.rotate(q.t*2);c.fillStyle=q.col;c.fillRect(-2,-3,4,6);c.restore();}if(this.flash){c.fillStyle='#fff9eb';c.globalAlpha=this.flash;c.fillRect(0,0,420,600);c.globalAlpha=1;}}
 scene(level){let c=this.c,t=this.time,kind=M.briefs[level][1],bg=kind==='night'?'#b6b5c8':kind==='snow'?'#c7d0cf':kind==='sun'?'#d5d5b8':'#c2cfc5';c.clearRect(0,0,420,600);c.drawImage(this.paper,0,0);c.fillStyle=bg;c.fillRect(15,18,390,554);
  // Layered hand-cut room, sparse pencil marks and a large paper arch.
  c.strokeStyle='#776b6a';c.lineWidth=.7;for(let x=20;x<420;x+=24){c.beginPath();c.moveTo(x,18);c.lineTo(x-5,465);c.stroke();}
  this.cut('M79 512 L79 195 Q70 76 210 54 Q350 78 340 195 L340 512 Z','#e6ddcc',.8);
  c.save();c.beginPath();c.moveTo(92,504);c.lineTo(92,197);c.quadraticCurveTo(83,89,210,68);c.quadraticCurveTo(335,89,327,197);c.lineTo(327,504);c.closePath();c.clip();
  let g=c.createLinearGradient(0,80,0,500);g.addColorStop(0,kind==='night'?'#8d96ad':kind==='snow'?'#c3d0d3':'#e5d7bb');g.addColorStop(1,kind==='night'?'#d6bcaf':'#eadfca');c.fillStyle=g;c.fillRect(80,55,255,460);
  for(let i=0;i<10;i++){let x=77+i*28,h=34+(i*47%80);c.fillStyle=i%2?'#aa9b9850':'#8d99934a';c.fillRect(x,340-h,27,h+160);for(let y=348-h;y<355;y+=14){c.fillStyle=kind==='night'?'#ead3a65e':'#ded8ca65';c.fillRect(x+8,y,5,8)}}
  if(kind==='night'){this.ell(279,112,20,20,'#f1e5c6');this.ell(286,104,17,17,'#9da3b5');for(let i=0;i<13;i++)this.star(105+i*17,110+(i*37%140),2.5,'#f6e6c2')}
  if(kind==='sun'){this.ell(276,112,23,23,'#e2c485');for(let i=0;i<12;i++)this.line(`M${276+Math.cos(i*.524)*29} ${112+Math.sin(i*.524)*29}l${Math.cos(i*.524)*5} ${Math.sin(i*.524)*5}`,'#d3b779',1)}
  if(kind==='rain')for(let i=0;i<22;i++){let x=95+i*13,y=85+((t*30+i*39)%290);this.line(`M${x} ${y}l-3 11`,'#c1d1d3',1.5)}
  if(kind==='snow')for(let i=0;i<22;i++){let x=100+(i*37%220)+Math.sin(t+i)*3,y=85+((t*10+i*31)%300);this.ell(x,y,1.5,1.5,'#fcf6e6')}
  this.line('M92 362L327 362M122 89L122 504M303 90L303 504','#b2a797',1);c.restore();
  // Pencil floorboards and a paper pedestal anchor the figure.
  c.fillStyle='#d4bf9e';c.fillRect(15,465,390,107);for(let y=480;y<574;y+=19)this.line(`M15 ${y}L405 ${y+2}`,'#a8977b',.6);for(let i=0;i<8;i++)this.line(`M${30+i*57} 467L${10+i*59} 570`,'#a8977b',.5);
  this.cut('M128 487L291 487L306 505L115 505Z','#e9e0cf',.8);this.line('M117 506L305 506','#8c7d6c',1);
  this.plant(48,430,kind==='snow'?'#809b95':'#8e9d7e');this.plant(374,447,'#9ca58d');
  // Visible tape, deckled paper edge and studio annotations are part of the world.
  for(const [x,y,a] of [[31,30,-.2],[367,25,.18],[25,551,.25],[365,550,-.1]]){c.save();c.translate(x,y);c.rotate(a);c.fillStyle='#ead6aa99';c.fillRect(-17,-6,35,13);this.line('M-14 -3L15 -3','#baac8a66',.5);c.restore();}
  c.strokeStyle='#7f7164';c.lineWidth=.8;c.strokeRect(15,18,390,554);c.strokeStyle='#fffae7';c.lineWidth=2;c.strokeRect(18,21,384,548);
  this.text('C / C',43,70,12,'#7d7469');this.line('M29 76L57 76','#9a8b78',.5);this.text('PAPER',43,87,6,'#7d7469','Arial');
  this.text(String(level+1).padStart(2,'0'),375,64,18,'#766d73');this.text(M.briefs[level][0].toUpperCase(),210,558,9,'#766454','Arial');this.text('A LITTLE LOOK, A LITTLE WORLD.',210,590,7,'#8d7d6c','Arial');
 }
 plant(x,y,col){let c=this.c;this.cut(`M${x-12} ${y}l24 -2l-5 30l-15 -1Z`,'#b28c74',.7);for(let k=-2;k<=2;k++){let a=x+k*8,b=y-25-Math.abs(k)*7;this.line(`M${x} ${y}Q${a} ${b+10} ${a} ${b}`,col,1);this.cut(`M${a} ${b}q${k<0?-19:19} -22 ${k<0?-12:12} -30q${k<0?19:-19} 5 ${k<0?12:-12} 30Z`,col,.5)}}
 star(x,y,r,col){let c=this.c;c.fillStyle=col;c.beginPath();for(let i=0;i<8;i++){let a=i*Math.PI/4,rr=i%2?r*.28:r;let px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;if(i)c.lineTo(px,py);else c.moveTo(px,py)}c.closePath();c.fill()}
 figure(look,char=0){let c=this.c,skin=['#dbb39c','#9f705d','#c8a184'][char],hair=['#815a46','#483d42','#45464b'][char],t=this.time;
  this.ell(210,489,46,5,'#76655b22');
  this.cut('M184 110Q178 68 210 71Q248 72 242 119L248 180L175 179Z',hair,1);
  // Articulated paper limbs with pencil joint marks.
  this.cut('M188 176Q176 175 172 197L158 281L168 329Q170 339 178 333L179 325L174 280L191 218Z',skin,1);
  this.cut('M232 176Q244 174 249 199L262 281L252 330Q250 341 242 333L241 325L248 280L230 216Z',skin,1);
  this.cut('M190 294L210 296L207 378L201 475L186 475L185 385Z',skin,1);this.cut('M210 297L230 294L235 385L234 475L220 475L214 379Z',skin,1);
  if(['coat','puffer','parka','longcoat','cape'].includes(M.items[look.look]?.shape)){this.cut('M190 294L210 296L207 378L201 475L186 475L185 385Z','#b8b3ad',.7);this.cut('M210 297L230 294L235 385L234 475L220 475L214 379Z','#b8b3ad',.7);}
  this.line('M188 373L204 375M220 375L233 373M166 326l8 2M247 328l7 -2','#986f6255',.8);
  this.cut('M195 171L203 165L203 147L217 147L218 165L228 172L232 270L234 314Q210 323 185 314L190 269Z','#dbccba',1);
  this.item(look.look);this.item(look.feet);
  // Face has its own human silhouette and restrained, drawn details.
  this.cut('M187 113Q188 83 211 83Q234 85 235 112L231 140Q223 157 210 158Q196 153 190 139Z',skin,1);
  this.ell(191,128,5,7,skin,ink,.6);this.ell(233,128,4,7,skin,ink,.6);
  let blink=this.time%5>4.82;for(const x of [200,222]){this.line(`M${x-6} 115q6 -3 11 0`,hair,1);if(blink)this.line(`M${x-5} 123q5 3 10 0`,ink,1);else{let eye=new Path2D(`M${x-5} 123q5 -3 10 0q-5 3 -10 0Z`);c.fillStyle='#f1dfc9';c.fill(eye);c.strokeStyle=ink;c.lineWidth=.55;c.stroke(eye);this.ell(x,123,1.3,1.8,ink);this.ell(x+.5,122,.4,.5,'#fff9ef');}}
  this.line('M211 124l-3 9l4 1','#926c60',.7);this.line('M205 142q6 4 12 -1','#985b60',1.2);this.ell(197,135,4,1.6,'#ba7c702b');this.ell(226,135,4,1.6,'#ba7c702b');
  if(char===0){this.cut('M186 122Q174 86 205 78Q234 75 240 104L237 128L228 110Q210 118 202 99L195 127Z',hair,1);for(let i=0;i<6;i++)this.line(`M${187+i*7} 90q-3 9 0 18`,'#b88b655f',.7)}
  if(char===1){for(let i=0;i<10;i++){let a=i*.42+3.1,x=211+Math.cos(a)*28,y=111+Math.sin(a)*30;this.ell(x,y,9,10,hair,ink,.7);this.line(`M${x-4} ${y-2}q9 -6 5 5`,'#77615c',.7)}}
  if(char===2){this.cut('M186 122Q176 84 207 78Q238 77 241 109L231 119L225 98Q210 113 192 116Z',hair,1);for(let i=0;i<8;i++){this.ell(241-i*.8,145+i*7,6,7,hair,ink,.6);this.line(`M237 ${143+i*7}l7 3`,'#7b7775',.6)}this.line('M236 201l9 1','#c98386',3)}
  this.item(look.head);this.item(look.carry);
 }
 item(id){let i=M.items[id];if(!i)return;let c=this.c;c.save();if(this.change?.cat===i.cat){let t=this.change.t;c.translate(0,-9*Math.exp(-t*8)*Math.cos(t*14));c.globalAlpha=Math.min(1,.7+t*2);}let col=M.colours[i.col];
  if(i.cat==='look'){
   const p=this.cut(paths[i.shape],col,1.1);this.texture(p,'#40394424',i.shape==='sailor'?'stripe':'weave');
   c.save();c.clip(p);this.cut('M196 171L210 191L222 170L226 272L197 275Z',i.shape==='overall'?'#e6d6b8':'#f1e4d0',.5);c.restore();
   if(['coat','longcoat','parka','puffer','velvet','suit'].includes(i.shape)){
    this.line('M199 170L192 196L210 215L210 341M221 170L228 196L210 215','#6e5b5255',1);
    for(let y=228;y<(i.shape==='longcoat'?390:328);y+=24){this.ell(214,y,2,2,'#e7c494',ink,.6);this.line(`M218 ${y}l4 0`,'#66504477',.5)}
    this.line('M185 290l17 1l-2 14l-16 -1M221 290l14 -2l2 14l-15 2','#5f51534f',1);
   }
   if(['puff','pleats','tulle','sailor'].includes(i.shape)){
    this.line('M190 273Q210 278 230 273','#5e4e4b99',2);for(let k=-3;k<=3;k++)this.line(`M${210+k*5} 283Q${210+k*10} 331 ${210+k*12} 386`,'#54435340',.8);
    if(i.shape==='tulle'){c.save();c.clip(p);for(let y=309;y<404;y+=25)this.line(`M162 ${y}Q210 ${y+17} 261 ${y}`,'#ead5d3aa',2);c.restore();this.cut('M204 278l-14 -7l-2 17l16 -6l13 9l6 -16Z','#a76670',.7)}
    if(i.shape==='puff'){for(let k=0;k<9;k++){let a=174+k*9,b=325+(k%3)*18;this.flower(a,b,3,'#d9d7b7');}}
    if(i.shape==='sailor')this.cut('M193 170L210 193L226 170L233 190L211 215L185 191Z','#eee7d4',.7);
   }
   if(i.shape==='overall'){this.cut('M199 219L224 219L225 267Q212 274 198 266Z','#72907d',.8);this.line('M202 231l18 0l-1 18l-17 0Z','#c6d2b080',1);for(let x of [199,226])this.ell(x,214,2.2,2.2,'#d8b473',ink,.5);this.line('M193 316L199 463M224 316L226 463','#d5d2b065',1)}
   if(i.shape==='puffer')for(let y=205;y<348;y+=27)this.line(`M180 ${y}Q211 ${y+9} 241 ${y}`,'#ab9d8a88',1.4);
   if(i.shape==='cape'){this.line('M198 169L210 204L224 169M210 204L210 333M176 219L168 335M244 219L251 335','#9a774f',1);for(let y=225;y<338;y+=30)this.ell(213,y,2,2,'#eed4a0',ink,.5);this.cut('M202 171l-11 11l15 6l5 -8l11 8l8 -10l-14 -7Z','#c8807a',.7)}
   // Cut-paper tabs, hem stitches, and deliberately uneven pencil accents.
   this.line('M173 247l6 1M237 247l8 -2','#eee3c9',1);c.save();c.clip(p);this.line('M173 382L248 384M185 465L236 465','#f9efdb88',1);c.restore();
  }else if(i.cat==='head')this.head(i.shape,col);
  else if(i.cat==='carry')this.carry(i.shape,col);
  else this.feet(i.shape,col);
  c.restore();
 }
 flower(x,y,r,col){for(let a=0;a<6;a++)this.ell(x+Math.cos(a)*r,y+Math.sin(a)*r,r*.65,r*.65,col,ink,.3);this.ell(x,y,r*.55,r*.55,'#dfb968')}
 head(shape,col){
  if(shape==='bonnet'){this.cut('M179 109Q171 64 212 64Q246 66 243 109L230 103Q208 85 189 110Z',col,1);this.cut('M174 107Q207 91 247 105L245 115Q206 107 177 119Z',col,1);this.line('M181 114L190 158M239 112L232 159','#6c6875',1);this.cut('M189 156l-6 8l11 -2l4 6l3 -11Z','#d4b17a',.7)}
  if(shape==='beret'){this.cut('M181 100Q171 76 197 67Q232 57 241 84L232 102Z',col,1);this.line('M184 98Q209 91 234 97','#70545a',2);this.line('M208 69l3 -9',ink,2);this.line('M188 81l19 -8','#eed8c2',1)}
  if(shape==='moon'){this.line('M180 105Q179 70 213 69Q240 70 242 108',col,5);this.cut('M226 61Q239 62 237 76Q226 82 223 70Q230 73 231 65Z','#dbbd7a',.7);for(let x of [189,203,218])this.star(x,75,3,'#d5b97a')}
  if(shape==='straw'){this.cut('M183 95L190 66Q211 55 230 67L238 96Z',col,1);this.cut('M164 99Q208 85 254 100Q245 120 208 119Q175 117 164 99Z',col,1);for(let k=0;k<5;k++)this.line(`M${188+k*10} 72l-3 21`,'#9d83544f',.7);this.line('M183 89Q209 86 238 91','#809b83',5);this.flower(236,96,5,'#e7d2c4')}
  if(shape==='muffs'){this.line('M180 118Q175 72 209 71Q242 73 243 118',col,5);for(let x of [182,242]){this.ell(x,123,9,15,col,ink,1);for(let k=-2;k<3;k++)this.line(`M${x-6} ${120+k*4}l11 2`,'#b9aea0',.7)}}
  if(shape==='bow'){this.line('M181 112Q181 79 210 78Q241 81 240 113',col,4);this.cut('M210 81Q186 54 180 76Q182 95 207 89Q230 103 240 84Q242 62 213 81Z',col,1);this.ell(210,84,5,6,'#cab394',ink,.8);this.line('M187 74L205 84M231 81L216 85','#f5ead8',1)}
  if(shape==='flower'){this.line('M182 105Q185 76 209 76Q238 78 241 106',col,3);for(let k=0;k<4;k++)this.flower(227+k*5,79+k*7,5,k%2?col:'#e6cfc7');this.cut('M239 103l15 21l-11 15l-5 -36Z','#a7b6a167',.5)}
  if(shape==='crown'){this.cut('M182 95L180 69L195 80L207 56L221 78L239 64L237 96Z',col,1);this.line('M183 90L236 90','#8c714c',1);for(let x of [190,209,228])this.star(x,86,3,'#f4e8ce')}
 }
 carry(shape,col){
  if(shape==='umbrella'){this.line('M275 190L263 352Q260 369 249 357',ink,2);this.cut('M230 194Q242 154 281 157Q316 158 331 203Q314 192 302 202Q286 188 273 198Q250 185 230 194Z',col,1);for(let x of [248,274,302])this.line(`M281 158Q${x} 173 ${x} 198`,'#50584677',.8);this.line('M280 157l1 -10',ink,1.3);return;}
  if(shape==='bouquet'){for(let k=0;k<5;k++){this.line(`M262 370L${250+k*8} ${318+k%2*7}`,'#819b83',1.5);this.flower(250+k*8,318+k%2*7,6,['#cf9a94','#d9c795','#aab5a0'][k%3]);}this.cut('M245 338L284 336L264 381Z','#cdb8a0',.8);this.line('M253 354L273 355','#b97975',3);return;}
  if(shape==='muff'){this.cut('M244 345Q267 332 287 347L285 377Q263 386 244 376Z',col,1);for(let k=0;k<5;k++)this.line(`M${249+k*7} 347l-2 27`,'#b1a59177',.8);return;}
  this.line('M249 332Q263 310 276 334',ink,1.5);
  if(shape==='lantern'){this.cut('M251 334L278 336L281 375L247 374Z',col,.9);this.cut('M254 342L274 343L275 366L252 365Z','#eee1ae',.7);this.ell(264,354,4,9,'#e3b55e');this.line('M243 377L285 379M248 331L281 333',ink,2);return;}
  if(shape==='camera'){this.cut('M243 341L283 341L285 374L241 374Z',col,1);this.cut('M251 335L263 335L266 341L248 341Z',col,.8);this.ell(263,358,11,11,'#c2b9a7',ink,1);this.ell(263,358,6,6,'#7c8990',ink,.8);this.ell(266,355,2,2,'#d7e0d8');return;}
  let base=shape==='case'?'M243 339L284 339L285 389L242 389Z':shape==='tote'?'M242 334L282 334L288 390L239 389Z':'M241 339L283 339L284 382Q264 390 242 381Z';this.cut(base,col,1);if(shape==='satchel'||shape==='record')this.cut('M241 339L284 339L280 356L245 357Z',col,.9);this.line('M245 374L280 375','#eadbc480',1);
  if(shape==='record'){this.ell(263,369,11,11,'#4c4b5a',ink,.6);this.ell(263,369,3,3,'#c98386');}
  if(shape==='gift'){this.line('M263 342L263 384M243 360L284 361','#c98386',5);this.cut('M262 341q-19 -23 -18 -6q3 11 18 6q22 -6 17 -16q-9 -1 -17 16Z','#c98386',.7)}
  if(shape==='case'){this.line('M250 343L249 385M276 343L277 385','#576d7a',2);this.ell(247,393,3,3,ink);this.ell(279,393,3,3,ink);}
  if(shape==='tote'){this.flower(262,360,6,'#c98386');this.line('M261 365l-1 12','#819b83',1.2)}
 }
 feet(shape,col){for(let side of [-1,1]){let x=210+side*19,c=this.c;c.save();c.translate(x,0);c.scale(side,1);
   let high=['rainboot','fur','hike','star'].includes(shape),p=high?'M-8 438L8 438L8 472Q25 470 24 485L-10 486Z':'M-8 472L7 471Q25 472 24 485L-11 486Z';this.cut(p,col,.9);this.line('M-9 483L23 483','#423a4380',2);
   if(['lace','sneaker','hike'].includes(shape)){for(let y=high?452:475;y<481;y+=5)this.line(`M-4 ${y}l10 2m-10 2l10 -3`,'#ecdfc6',.8)}
   if(shape==='rainboot')this.line('M-8 441L8 441','#c6c9c3',3);
   if(shape==='fur'){this.line('M-8 441L8 441','#f3eee0',7);for(let y=446;y<477;y+=7)this.line(`M-5 ${y}l9 1`,'#b6a78e',.7)}
   if(shape==='mary'||shape==='loafer')this.line('M-4 474L9 479','#e7c8ab',3);
   if(shape==='sandal'){this.cut('M-8 471L6 472L9 480L-9 479Z','#dbb39c',.4);this.line('M-6 476L13 482M6 474L-5 482',col,3)}
   if(shape==='ribbon'){this.cut('M1 476l-8 -7l-2 8l10 1l8 6l3 -9Z','#e4b5ad',.5);this.line('M-5 448L7 471M7 448L-5 471',col,1.3)}
   if(shape==='star')this.star(0,458,5,'#f2e6cf');c.restore();}}
 icon(canvas,id){let i=M.items[id],bounds=i.cat==='look'?[150,159,122,320]:i.cat==='head'?[160,50,96,123]:i.cat==='feet'?[172,435,80,62]:i.shape==='umbrella'?[227,145,109,230]:i.shape==='bouquet'?[235,300,65,90]:[234,307,62,92],c=canvas.getContext('2d'),old=this.c;c.clearRect(0,0,canvas.width,canvas.height);let k=Math.min(canvas.width/bounds[2],canvas.height/bounds[3])*.88;c.setTransform(k,0,0,k,(canvas.width-bounds[2]*k)/2-bounds[0]*k,(canvas.height-bounds[3]*k)/2-bounds[1]*k);this.c=c;this.item(id);this.c=old;c.setTransform(1,0,0,1,0,0)}
 photo(canvas,level,entry){let oldc=this.c,oldt=this.time,change=this.change;this.c=canvas.getContext('2d');this.c.setTransform(canvas.width/420,0,0,canvas.height/600,0,0);this.time=0;this.change=null;this.scene(level);this.figure(entry.look,entry.char);this.c=oldc;this.time=oldt;this.change=change;}
}
function glyph(tag){let col=M.colours[tag]||ink,path={rain:'M5 15Q-1 7 8 5Q14 -2 19 6Q26 8 22 15ZM7 18l-2 4M14 18l-2 4M21 18l-2 4',sun:'M12 5A7 7 0 1 0 12 19A7 7 0 1 0 12 5M12 0v3M12 21v3M0 12h3M21 12h3M3 3l2 2M19 19l2 2',snow:'M12 1v22M2 6l20 12M2 18L22 6M7 3l5 4l5 -4M7 21l5 -4l5 4',night:'M19 2Q5 0 4 13Q7 27 21 19Q9 20 11 10Q12 4 19 2Z',warm:'M5 2l5 4h4l5 -4l4 7l-5 4v10H6V13L1 9ZM10 6v13M14 6v13',light:'M19 2Q2 3 4 15Q5 24 16 19Q23 12 19 2ZM5 21L16 7',smart:'M5 3l7 6l7 -6l3 5l-4 4v11H6V12L2 8ZM12 9l-2 7l2 5l2 -5Z',play:'M12 1l3 7l8 2l-6 5l1 8l-6 -4l-7 4l1 -8L0 10l9 -2Z',look:'M6 3l5 4h3l5 -4l4 6l-5 4v10H6V13L1 9Z',head:'M4 14Q0 2 12 2Q23 2 20 14ZM1 14Q12 11 23 14v4H1Z',carry:'M4 8H21V23H3ZM8 8Q6 0 13 1Q20 0 17 8',feet:'M4 2H13V14Q25 11 23 22H3Z'}[tag];return `<svg viewBox="-2 -2 28 28" aria-hidden="true"><path d="${path||'M12 2L23 12L12 23L1 12Z'}" fill="${path?'none':col}" stroke="${col}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
window.CutArt=Art;window.CutGlyph=glyph;
})();

import {world, destination, platformAt, windAt} from './core.mjs';

const skies = [
  ['#72c1ca','#d8e8ba','#ffc889','#79a18e','#5f9b88','#325f58','#d0ecce'],
  ['#f29d82','#ffd997','#ffe6b0','#a46e8a','#786f91','#3d5875','#ffebc7'],
  ['#24355d','#525581','#ef9b99','#565180','#3b4a73','#233850','#f3c6ba'],
];
const dark = '#172938';
const pi = Math.PI;
function ellipse(c,x,y,rx,ry,fill,stroke,width=2) {
  c.beginPath(); c.ellipse(x,y,rx,ry,0,0,pi*2);
  c.fillStyle=fill; c.fill();
  if(stroke){c.lineWidth=width;c.strokeStyle=stroke;c.stroke();}
}
function path(c, points, fill, stroke, width=2) {
  c.beginPath();c.moveTo(...points[0]);for(const p of points.slice(1))c.lineTo(...p);
  if(fill){c.closePath();c.fillStyle=fill;c.fill();}
  if(stroke){c.lineWidth=width;c.strokeStyle=stroke;c.stroke();}
}
function box(c,x,y,w,h,r,fill,stroke,width=2) {
  c.beginPath();c.roundRect(x,y,w,h,r);
  c.fillStyle=fill;c.fill();
  if(stroke){c.lineWidth=width;c.strokeStyle=stroke;c.stroke();}
}
function linear(c,x,y,xx,yy,a,b) {
  const g=c.createLinearGradient(x,y,xx,yy);g.addColorStop(0,a);g.addColorStop(1,b);return g;
}
function label(c,text,x,y,size,color,weight=800,align='center') {
  c.font=weight+' '+size+'px system-ui, sans-serif';
  c.textAlign=align;c.textBaseline='middle';c.fillStyle=color;c.fillText(text,x,y);
}
function random(seed) {
  return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
}
function cloud(c,x,y,s,color,shadow) {
  c.save();c.translate(x,y);c.scale(s,s);
  c.beginPath();c.moveTo(-54,10);
  c.bezierCurveTo(-80,10,-74,-12,-55,-13);c.bezierCurveTo(-52,-30,-36,-36,-20,-28);
  c.bezierCurveTo(-15,-58,24,-56,32,-31);c.bezierCurveTo(54,-36,65,-22,61,-12);
  c.bezierCurveTo(88,-4,78,13,58,13);c.closePath();c.fillStyle=color;c.fill();
  if(shadow){path(c,[[-59,9],[-27,7],[-15,1],[14,8],[56,9]],null,shadow,2);}
  c.restore();
}
function tree(c,x,y,s,leaf,shadow) {
  c.save();c.translate(x,y);c.scale(s,s);
  path(c,[[0,0],[0,-26]],null,shadow,3);
  path(c,[[0,-34],[10,-19],[6,-19],[15,-8],[-14,-8],[-7,-19],[-11,-19]],leaf,shadow,1.2);
  path(c,[[0,-32],[0,-11],[12,-9],[5,-19],[9,-19]],shadow);
  c.restore();
}
function cottage(c,x,y,s,roof,wall) {
  c.save();c.translate(x,y);c.scale(s,s);
  ellipse(c,0,2,31,6,'#132c3a40');
  path(c,[[-22,0],[-22,-24],[5,-45],[24,-24],[24,0]],wall,dark,1.4);
  path(c,[[24,0],[40,-9],[40,-30],[24,-24]],'#4a7280',dark,1.4);
  path(c,[[-27,-23],[3,-50],[32,-39],[45,-28],[22,-21],[4,-43],[-20,-21]],roof,dark,1.6);
  box(c,-6,-19,10,19,2,'#344454',dark,1);box(c,8,-24,10,9,1,'#ffd798',dark,1);
  path(c,[[13,-23],[13,-16]],null,'#9b5c58',1);
  c.restore();
}

function background(kind) {
  const img=document.createElement('canvas');img.width=400;img.height=510;
  const c=img.getContext('2d'), [top,horizon,sun,far,mid,near,puff]=skies[kind];
  const rnd=random(740+kind);
  c.fillStyle=linear(c,0,0,0,510,top,horizon);c.fillRect(0,0,400,510);
  c.lineCap='round';c.lineJoin='round';
  if(kind===2){
    for(let i=0;i<55;i++){
      const x=rnd()*400,y=rnd()*323;
      ellipse(c,x,y,i%7===0?1.4:.65,i%7===0?1.4:.65,i%4===0?'#ffc4a0':'#ede4c7a0');
    }
    ellipse(c,302,113,36,36,'#ffe1ae');ellipse(c,316,100,34,34,'#3b4771');
    ellipse(c,284,118,2,2,'#ffd49c');
  }else{
    ellipse(c,kind===1?307:308,kind===1?277:120,53,53,kind===1?'#ffefb6a0':'#ffe5ad60');
    ellipse(c,kind===1?307:308,kind===1?277:120,43,43,sun);
    for(let i=0;i<10;i++)path(c,[[4+i*39,233+i%3*13],[28+i*39,233+i%3*13]],null,'#fff4d740',1);
  }
  cloud(c,28,174,.74,puff+'80');cloud(c,363,214,.97,puff+'90');
  cloud(c,260,73,.61,puff+'80');cloud(c,127,283,.56,puff+'70');
  if(kind===0){
    path(c,[[0,397],[0,332],[56,303],[86,313],[139,265],[174,287],[218,260],[276,318],[328,285],[400,320],[400,510],[0,510]],far);
    path(c,[[0,401],[0,358],[56,365],[103,344],[146,357],[211,324],[257,349],[300,331],[400,377],[400,510],[0,510]],mid);
    path(c,[[0,448],[0,422],[68,390],[141,402],[202,380],[270,399],[335,383],[400,405],[400,510],[0,510]],near);
    path(c,[[62,510],[163,452],[176,445],[232,436],[305,419],[325,422],[231,446],[181,457],[116,510]],'#abc597');
    for(let i=0;i<33;i++){
      const x=rnd()*410,y=400+rnd()*106;
      tree(c,x,y,.27+(y-396)/140,'#698b6b','#28534d');
    }
    cottage(c,56,460,.73,'#b45d4c','#ead5a3');
    cottage(c,345,477,.96,'#bd6f50','#ebcfa0');
    cottage(c,318,450,.53,'#bf7a58','#f0dcb2');
  } else if(kind===1) {
    path(c,[[0,393],[0,348],[33,309],[65,326],[92,316],[139,369],[201,354],[263,390],[400,344],[400,510],[0,510]],far);
    c.fillStyle=linear(c,0,369,0,510,'#a18d9e','#556984');c.fillRect(0,376,400,134);
    for(let i=0;i<145;i++){
      const x=rnd()*410,y=378+rnd()*136;
      path(c,[[x,y],[x+4+rnd()*29,y]],null,i%3===0?'#f8d1a880':'#ddbad35e',.6+rnd()*1.4);
    }
    path(c,[[0,459],[0,423],[37,421],[71,429],[100,452],[73,464],[30,472],[0,470]],near);
    path(c,[[400,469],[353,479],[321,473],[301,453],[327,440],[355,416],[400,420]],near);
    cottage(c,344,451,.66,'#b55c68','#f4cea4');
    box(c,52,390,14,48,2,'#eacaa4',dark,2);
    box(c,48,390,22,8,1,'#a6495a',dark,2);
    path(c,[[46,390],[59,379],[72,390]],'#cf716e',dark,2);
    box(c,55,402,7,8,1,'#ffe3a0',dark,1);
    path(c,[[124,478],[153,477],[145,486],[130,486]],'#f5ba89',dark,1.4);
    path(c,[[137,476],[137,455],[150,474]],'#ffe7c2',dark,1);
  } else {
    path(c,[[0,390],[0,350],[53,306],[92,340],[144,323],[180,347],[234,288],[272,315],[325,287],[400,359],[400,510],[0,510]],far);
    path(c,[[0,427],[0,377],[54,365],[101,399],[165,363],[208,382],[273,361],[331,391],[400,346],[400,510],[0,510]],mid);
    c.fillStyle=near;c.fillRect(0,410,400,100);
    for(let i=0;i<34;i++){
      const x=i*12,y=408+rnd()*70,h=12+rnd()*49,w=9+rnd()*11;
      box(c,x,y,w,h,1,i%3===0?'#293852':'#202f49');
      for(let j=0;j<h-8;j+=8)if(rnd()>.36)box(c,x+3,y+j+4,2.5,3,0,'#d99f77');
    }
    path(c,[[0,494],[87,472],[161,478],[211,463],[335,470],[400,457],[400,510],[0,510]],'#1c2e43');
    for(let i=0;i<13;i++)ellipse(c,12+i*31,493-i%4*5,1,1,'#cfa885');
  }
  for(let i=0;i<12000;i++){
    c.fillStyle=i%2===0?'#14293911':'#fff7e41b';
    c.fillRect(rnd()*400,rnd()*510,1,1);
  }
  return img;
}

function blimp(c,t) {
  c.save();c.translate(101,48+Math.sin(t*1.3)*2);
  path(c,[[-48,0],[-77,-21],[-74,-1],[-74,19],[-48,12]],'#e7ad5b',dark,2);
  ellipse(c,0,0,59,28,linear(c,0,-28,0,28,'#ffdda1','#e89752'),dark,2);
  c.beginPath();c.moveTo(-59,0);c.bezierCurveTo(-32,-28,34,-32,59,0);
  c.bezierCurveTo(24,19,-29,18,-59,0);c.closePath();c.fillStyle='#ffebc8';c.fill();
  path(c,[[-57,1],[-33,11],[0,15],[31,11],[56,1]],null,'#ad643c',1);
  path(c,[[-53,-10],[-24,-19],[1,-21],[27,-17],[48,-10]],null,'#fff6df',1.4);
  label(c,'AIR POST',1,-3,12,'#283c48',900);
  path(c,[[-17,24],[-12,38],[22,38],[31,27]],'#c78258',dark,2);
  box(c,-15,30,44,9,3,'#f5bc75',dark,1.8);
  for(let i=0;i<3;i++)box(c,-9+i*12,32,7,4,1,'#608788');
  c.restore();
}
function target(c,x,w,t,landed) {
  c.save();c.translate(x,424);
  ellipse(c,0,40,w*.95,12,'#0d233c35');
  path(c,[[-w,-3],[w,-3],[w-10,15],[-w+10,15]],'#354f59',dark,2);
  box(c,-w-3,-3,w*2+6,11,4,'#f9b963',dark,2);
  path(c,[[-w+2,2],[w-2,2]],null,'#fff0af',2);
  for(let i=-w+11;i<w-5;i+=15)path(c,[[i,9],[i+5,9]],null,'#a5a28a',1.5);
  box(c,-w*.68,15,w*1.36,21,6,'#e7dfb7',dark,2);
  path(c,[[-w*.55,24],[w*.55,24]],null,'#6b8e84',1);
  for(const v of [-1,1]){
    const px=v*(w-7);
    path(c,[[px,8],[px,22]],null,dark,3);
    ellipse(c,px,23,16+Math.sin(t*44)*4,2.5,'#fbe0a080');
    ellipse(c,px,23,3.5,2.5,'#815249',dark,1);
    ellipse(c,px,-6,3.8,3.8,landed?'#b8ffd7':'#fff4bb','#594437',1);
  }
  box(c,-16,-17,32,14,4,landed?'#c9f4bc':'#254b51',dark,1.3);
  label(c,landed?'✓':'↓',0,-10,11,landed?'#25554a':'#fff2ba',900);
  label(c,'POST',0,25,9,'#28494e',900);
  c.restore();
}

function canopy(c,amount,skin) {
  const colors={sun:['#f9ad58','#d9534b','#fff0b4'],berry:['#f6a5c0','#9d506a','#ffe6bc'],mint:['#abdec1','#3a8f88','#f9efc2']};
  const [light,shade,cream]=colors[skin];
  c.save();c.translate(0,-29-amount*38);c.scale(.23+.77*amount,.35+.65*amount);
  for(const v of [-1,1]){
    path(c,[[v*55,12],[v*10,51]],null,'#2f3e4a',1);
    path(c,[[v*32,9],[v*9,51]],null,'#fbecd7',1);
  }
  c.beginPath();c.moveTo(-57,15);
  c.bezierCurveTo(-53,-14,-30,-34,0,-34);
  c.bezierCurveTo(30,-34,53,-14,57,15);
  c.quadraticCurveTo(44,5,29,11);c.quadraticCurveTo(14,3,0,9);
  c.quadraticCurveTo(-14,3,-29,11);c.quadraticCurveTo(-44,5,-57,15);
  c.fillStyle=linear(c,0,-34,0,15,light,shade);c.fill();c.lineWidth=2;c.strokeStyle=dark;c.stroke();
  c.beginPath();c.moveTo(0,-34);c.bezierCurveTo(-15,-31,-26,-9,-29,11);
  c.quadraticCurveTo(-14,3,0,9);c.quadraticCurveTo(14,3,29,11);
  c.bezierCurveTo(26,-9,15,-31,0,-34);c.fillStyle=linear(c,0,-34,0,12,cream,light);c.fill();
  c.lineWidth=1.25;c.strokeStyle='#814e506f';c.stroke();
  path(c,[[-51,9],[-36,6],[-24,6],[-11,4],[0,5],[11,4],[24,6],[36,6],[51,9]],null,'#ffe6b5b0',1.7);
  label(c,'✦',0,-9,15,'#813f43',900);
  c.restore();
}

function pilot(c,x,y,{amount=0,vx=0,t=0,skin='sun',reward=false,landed=false}) {
  c.save();c.translate(x,y);
  const tilt=landed?0:Math.max(-.23,Math.min(.23,vx/420));
  c.rotate(tilt);
  if(amount>.05)canopy(c,amount,skin);
  c.translate(0,-3+Math.sin(t*8)*(landed?0:.8));
  c.beginPath();c.moveTo(11,-13);c.bezierCurveTo(35,-5,37,-36,23,-32);c.bezierCurveTo(24,-20,12,-26,6,-17);
  c.fillStyle='#d46948';c.fill();c.strokeStyle=dark;c.lineWidth=2;c.stroke();
  c.beginPath();c.moveTo(24,-32);c.quadraticCurveTo(34,-36,34,-26);c.quadraticCurveTo(29,-20,24,-22);c.closePath();c.fillStyle='#f6dbb6';c.fill();
  const leg = Math.sin(t*10)*(landed?0:2);
  ellipse(c,-9,-2+leg,6,5,'#3c4753',dark,1.5);
  ellipse(c,10,-2-leg,6,5,'#3c4753',dark,1.5);
  box(c,-15,-33,31,29,11,linear(c,0,-32,0,-4,'#427879','#284953'),dark,2);
  path(c,[[-9,-30],[-5,-13],[4,-13],[9,-30]],null,'#edb575',2);
  path(c,[[-19,-39],[-23,-61],[-16,-63],[-6,-49]],'#d3694e',dark,2);
  path(c,[[19,-39],[23,-61],[16,-63],[6,-49]],'#d3694e',dark,2);
  path(c,[[-17,-48],[-19,-58],[-10,-51]],'#f3aa91');
  path(c,[[17,-48],[19,-58],[10,-51]],'#f3aa91');
  ellipse(c,0,-40,23,16,linear(c,0,-55,0,-23,'#f5995d','#d96847'),dark,2);
  path(c,[[-20,-37],[-9,-36],[0,-29],[9,-36],[20,-37],[17,-30],[11,-25],[0,-24],[-11,-25],[-17,-30]],'#fff0cc');
  const blink=Math.floor(t*3)%23===19;
  ellipse(c,-9,-40,2,blink?.6:2.9,dark);ellipse(c,9,-40,2,blink?.6:2.9,dark);
  ellipse(c,0,-32,4,2.6,'#523a39');
  path(c,[[-4,-29],[0,-27],[4,-29]],null,'#93554a',1.4);
  path(c,[[-14,-51],[-9,-60],[5,-61],[13,-53],[19,-51],[10,-47],[-12,-49]],'#275c60',dark,1.6);
  path(c,[[-13,-50],[13,-50],[20,-51]],null,'#f8c576',2);
  if(reward)label(c,'✦',0,-55,8,'#ffe7a2',900);
  ellipse(c,-13,-17,6,5,'#df7a52',dark,1.6);ellipse(c,13,-17,6,5,'#df7a52',dark,1.6);
  box(c,-11,-23,22,17,3,'#f5b977',dark,1.6);
  path(c,[[-10,-17],[10,-17]],null,'#a66c4c',1);
  box(c,-2,-23,5,16,1,'#ffdf9c');
  c.restore();
}

export class Scene {
  constructor(canvas) {
    this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});
    this.backdrops=new Map();this.sparks=[];this.ripple=null;
  }
  size() {
    const r=this.canvas.getBoundingClientRect();
    if(!r.width||!r.height)return;
    const d=Math.min(devicePixelRatio||1,1.5);
    const w=Math.round(r.width*d),h=Math.round(r.height*d);
    if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}
  }
  burst(x,y,perfect,comment,miss) {
    const rnd=random(Math.round(x*283+y*17));
    this.ripple={x,y,age:0,miss};
    this.sparks=Array.from({length:miss?9:perfect?34:19},(_,i)=>({
      x,y,vx:(rnd()-.5)*190,vy:-36-rnd()*117,rot:rnd()*pi,age:0,life:.42+rnd()*.75,
      color:(comment?['#f7a6bb','#aeedd5','#ffeb9e','#b9cfff']:['#ffe59d','#f9b261','#fff2c3','#e38a62'])[i%4],
      size:2+rnd()*4,
    }));
  }
  paint(run, info, t, dt, forecast) {
    const c=this.ctx,{width:w,height:h}=this.canvas;
    const scale=Math.min(w/400,h/510), vertical=Math.min(h/510,scale*1.46);
    const ox=(w-400*scale)*.5, oy=(h-510*vertical)*.5;
    c.setTransform(1,0,0,1,0,0);
    c.fillStyle=skies[info.sky][5];c.fillRect(0,0,w,h);
    c.setTransform(scale,0,0,vertical,ox,oy);c.save();c.beginPath();c.rect(0,0,400,510);c.clip();
    c.lineCap='round';c.lineJoin='round';
    if(!this.backdrops.has(info.sky))this.backdrops.set(info.sky,background(info.sky));
    c.drawImage(this.backdrops.get(info.sky),0,0);
    const drop=info.drop || destination(run);
    const tx=platformAt(drop,run.time);
    const wind=windAt(drop,run.time,run.y);
    for(let i=0;i<11;i++){
      const yy=140+i*22, xx=((80+i*71+t*(12+Math.abs(wind)*.65)*Math.sign(wind||1))%468+468)%468-35;
      path(c,[[xx,yy],[xx+18+Math.abs(wind)*.46,yy]],null,'#fff6d680',1);
    }
    if(drop.cloud){
      const [x,y]=drop.cloud;
      cloud(c,x,y-3,.58,'#455878','#a8a4bf');
      path(c,[[x+5,y+7],[x-4,y+20],[x+4,y+20],[x-3,y+32]],null,'#ffe298',2);
      for(let i=0;i<5;i++){
        const yy=y+15+(t*57+i*7)%21;
        path(c,[[x-28+i*12,yy],[x-33+i*12,yy+6]],null,'#d6d3e0',1.1);
      }
    }
    const stamp=(y,draw)=>{
      c.save();c.translate(0,y);c.scale(1,scale/vertical);c.translate(0,-y);
      draw();c.restore();
    };
    stamp(48,()=>blimp(c,t));
    if(run.phase==='ready'){
      path(c,[[101,88],[101,101],[151,101],[151,104]],null,'#fff1c48c',1.5);
    }
    const successful=!!run.outcome&&run.outcome!=='miss';
    stamp(424,()=>target(c,tx,drop.radius,t,successful));
    if(forecast){
      for(let i=0;i<forecast.length-1;i+=2)ellipse(c,forecast[i][0],forecast[i][1],i%6===0?2.2:1.4,i%6===0?2.2:1.4,'#fff6dbae');
      const [x,y,good]=forecast[forecast.length-1];
      ellipse(c,x,y-4,6.5,3,good?'#c6ffbf':'#ffe6aa',dark,1);
    }
    if(run.phase==='ready'||run.phase==='air'||successful){
      stamp(run.y,()=>pilot(c,run.x,run.y,{amount:run.phase==='ready'?0:successful?0:run.canopy,vx:run.vx,t,
        skin:info.skin,reward:info.like,landed:successful}));
    }else{
      const p=(t-info.missedAt)*110;
      if(p<110)stamp(424+p,()=>pilot(c,run.x,424+p,{t,amount:1,vx:run.vx,skin:info.skin,reward:info.like}));
    }
    if(this.ripple){
      const r=this.ripple;r.age+=dt;
      if(r.age<.58){
        c.globalAlpha=1-r.age/.58;
        ellipse(c,r.x,r.y,8+r.age*112,3+r.age*23,'#fff0bd11',r.miss?'#f8c09d':'#fff3ac',2.5);
        c.globalAlpha=1;
      }else this.ripple=null;
    }
    for(const p of this.sparks){
      p.age+=dt;if(p.age>p.life)continue;
      p.vy+=dt*165;p.x+=p.vx*dt;p.y+=p.vy*dt;
      c.save();c.translate(p.x,p.y);c.rotate(p.rot+p.age*5);
      c.globalAlpha=Math.min(1,(p.life-p.age)*4);
      path(c,[[0,-p.size],[p.size*.65,0],[0,p.size],[-p.size*.65,0]],p.color);
      c.restore();
    }
    c.restore();
  }
}


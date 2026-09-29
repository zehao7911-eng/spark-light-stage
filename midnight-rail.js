(()=>{'use strict';
const $=id=>document.getElementById(id),canvas=$('world'),ctx=canvas.getContext('2d',{alpha:false});ctx.imageSmoothingEnabled=false;
let W=480,H=270,ground=196,scale=1,last=0,frame=0,mode='intro',run=null,toastTimer=0,shake=0,flash=0,audio=null,mute=false;
const keys=new Set(),touch={left:false,right:false,dash:false},fx=[],rain=[],stars=[];
const STORAGE='last-light-express-v1';
const defaults=()=>({night:1,scrap:0,spark:0,coins:0,passengers:0,levels:{workshop:0,lantern:0,sleeper:0,engine:0},records:{runs:0,best:0},seen:[]});
let save=defaults();try{const old=JSON.parse(localStorage.getItem(STORAGE)||'null');if(old&&typeof old==='object')save={...defaults(),...old,levels:{...defaults().levels,...old.levels}};}catch{}
const stationThemes=[
 {name:'RAIN MARKET',sky:'#121d35',far:'#263c58',mid:'#2c4b5b',lit:'#efaa7a',plant:'#45a693',sign:'#e57d9c',fog:'#598391'},
 {name:'GLASS GARDEN',sky:'#0e2533',far:'#234655',mid:'#1d5d61',lit:'#ffbf82',plant:'#7dd4a0',sign:'#9aebda',fog:'#5da19c'},
 {name:'ASH PLATFORM',sky:'#261d34',far:'#524055',mid:'#614457',lit:'#ffab69',plant:'#a28aa9',sign:'#e9a3a0',fog:'#997185'}
];
function persist(){try{localStorage.setItem(STORAGE,JSON.stringify(save));}catch{}}
function resize(){const mobile=innerWidth/innerHeight<.8;W=mobile?270:480;H=mobile?480:270;ground=Math.floor(H*(mobile?.67:.73));canvas.width=W;canvas.height=H;ctx.imageSmoothingEnabled=false;scale=innerWidth/W;rain.length=0;for(let i=0;i<(mobile?95:85);i++)rain.push({x:Math.random()*W,y:Math.random()*H,v:65+Math.random()*70,d:Math.random()*3});stars.length=0;for(let i=0;i<55;i++)stars.push({x:Math.random()*W,y:Math.random()*(ground-65),a:Math.random()});}
resize();addEventListener('resize',resize);
function rng(seed){let x=seed>>>0;return()=>((x=(1664525*x+1013904223)>>>0)/4294967296);}
function color(hex,alpha=1){ctx.globalAlpha=alpha;ctx.fillStyle=hex;}
function rect(x,y,w,h,c,a=1){color(c,a);ctx.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));ctx.globalAlpha=1;}
function text(s,x,y,size=7,c='#f5e7cf',align='left'){ctx.fillStyle=c;ctx.textAlign=align;ctx.font=`bold ${size}px monospace`;ctx.fillText(s,Math.round(x),Math.round(y));ctx.textAlign='left';}
function glow(x,y,r,c,a=.4){const g=ctx.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'transparent');ctx.globalAlpha=a;ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.globalAlpha=1;}
function pop(x,y,label,c='#ffe2a2'){fx.push({x,y,life:1,type:'text',label,c,vx:(Math.random()-.5)*10,vy:-22});}
function burst(x,y,c,n=12){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=15+Math.random()*60;fx.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.4+Math.random()*.5,type:'spark',c});}}
function sfx(freq=440,dur=.1,type='square',vol=.04){if(mute)return;try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime;o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(50,freq*.62),t+dur);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g).connect(audio.destination);o.start(t);o.stop(t+dur+.01);}catch{}}
function toast(s){$('toast').textContent=s;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),1150);}
function blink(c='#ffc688',power=.32){$('screenFlash').style.background=c;$('screenFlash').style.opacity=power;setTimeout(()=>$('screenFlash').style.opacity=0,60);}
function camera(){return run?Math.max(0,Math.min(run.length-W,run.x-W*.29)):0;}
function drawSky(t,theme,cam){let g=ctx.createLinearGradient(0,0,0,ground);g.addColorStop(0,theme.sky);g.addColorStop(.75,theme.far);g.addColorStop(1,theme.mid);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
 for(const st of stars)rect(st.x-cam*.012%W,st.y,1,1,'#b4d5d2',st.a*(.4+.3*Math.sin(t*2+st.x)));
 const moonX=W*.72-cam*.025;glow(moonX,48,55,'#8fdcdd',.17);rect(moonX-8,41,16,16,'#d5e5d5');rect(moonX-4,39,9,17,'#daeae2');
 for(let layer=0;layer<3;layer++){const unit=layer===0?33:layer===1?43:58,off=cam*(.12+layer*.1),c=[theme.far,theme.mid,'#173643'][layer];for(let i=-2;i<W/unit+4;i++){const id=i+Math.floor(off/unit),r=rng(id*1325+layer*2332),w=unit*.68+r()*unit*.3,h=22+r()*(22+layer*10);const x=i*unit-off%unit;rect(x,ground-27-h,w,h,c);if(layer>0){for(let k=0;k<4;k++){const wx=x+4+(k%2)*9,wy=ground-23-h+7+Math.floor(k/2)*8;if(r()>.35)rect(wx,wy,2,3,theme.lit,.12+layer*.06);}}}}
 // Elevated rails, dripping cables and a distant train lend vertical depth.
 if(mode!=='hub'&&mode!=='intro'){
  for(let i=-1;i<6;i++){const x=i*160-cam*.36%160;rect(x,ground-105,125,3,'#64848b',.24);rect(x+15,ground-105,4,95,'#5c6669',.23);rect(x+15,ground-94,110,2,'#5c7e80',.15);}
  for(let i=-1;i<4;i++){const x=i*210-cam*.42%210;rect(x,ground-149,200,2,'#63818b',.38);for(let j=0;j<4;j++)rect(x+22+j*46,ground-147,1,5+j%2*8,'#809a9c',.24);}
  const tx=W*.25-(cam*.31%850);rect(tx,ground-113,90,19,'#142a39');rect(tx+4,ground-109,81,10,'#315664');for(let i=0;i<6;i++){rect(tx+8+i*13,ground-107,8,6,'#ffc487',.23);rect(tx+12+i*13,ground-95,3,3,'#0d1c2c');}glow(tx+45,ground-104,50,'#ffbd7b',.08);
 }
}
function drawPlatform(t,theme,cam){rect(0,ground-19,W,18,'#323b46');rect(0,ground-17,W,3,'#778b88');rect(0,ground,W,H-ground,'#1b2631');rect(0,ground+3,W,2,'#77807e');rect(0,ground+17,W,2,'#394e58');
 for(let i=-2;i<W/26+3;i++){const x=i*26-cam%26;rect(x,ground-15,1,15,'#222d39');rect(x+12,ground-2,1,18,'#4d5759');rect(x,ground+12,17,1,'#33434c');}
 rect(0,ground+29,W,2,'#131d28');rect(0,ground+42,W,2,'#52646a');for(let i=-1;i<W/30+2;i++){const x=i*30-cam*.85%30;rect(x,ground+28,2,16,'#151e26');}
 for(let i=0;i<25;i++){const x=(i*57+17-cam*.6)%W,y=ground+7+(i*17)%46;rect(x,y,12,1,theme.sign,.025+Math.sin(t*2+i)*.018);}
 const wet=ctx.createLinearGradient(0,ground,0,H);wet.addColorStop(0,'#8fadaa22');wet.addColorStop(1,'#141e2700');ctx.fillStyle=wet;ctx.fillRect(0,ground,W,H-ground);
}
function lamp(x,theme,t){rect(x-2,ground-79,4,61,'#23323e');rect(x-4,ground-81,8,5,'#ad8d6f');rect(x-3,ground-76,6,3,'#ffe1a2');glow(x,ground-74,58,theme.lit,.27+.03*Math.sin(t*4+x));rect(x-8,ground-20,16,3,'#1e303a');rect(x-1,ground+2,2,15,'#f7b57c',.1);}
function stationFacade(x,index,theme,t){const widths=[95,110,87],w=widths[index%3],h=67+(index%4)*10;rect(x,ground-19-h,w,h,'#263943');rect(x+4,ground-19-h+5,w-8,h-7,'#31505b');rect(x-4,ground-19-h,w+8,7,'#14242f');rect(x,ground-18,5,12,'#121f2b');
 for(let k=0;k<3;k++){const xx=x+13+k*28;rect(xx,ground-19-h+20,17,21,'#142f3d');rect(xx+1,ground-19-h+21,15,18,theme.lit,.14+(k===1?.12:0));rect(xx+7,ground-19-h+20,1,20,'#7a9894');rect(xx,ground-19-h+29,17,1,'#7a9894');}
 if(index%3===0){rect(x+11,ground-19-h-15,w-22,12,'#203d47');rect(x+13,ground-19-h-13,w-26,8,theme.sign);text(index%2?'NIGHT MARKET':'OLD PLATFORM',x+w/2,ground-19-h-7,5,'#152c34','center');glow(x+w/2,ground-19-h-8,35,theme.sign,.12);}else{rect(x+w/2-12,ground-18,24,2,'#cc9c72',.2);}
 for(let row=0;row<Math.floor(h/7);row++)for(let col=0;col<Math.floor(w/15);col++){const bx=x+5+col*15+(row%2)*7,by=ground-19-h+8+row*7;rect(bx,by,9,1,'#9eb8ad',.055);rect(bx+8,by+1,1,4,'#152f3d',.07);}
 rect(x+3,ground-19-h+10,2,h-15,'#789c95',.22);rect(x+w-6,ground-19-h+6,2,h-10,'#0c2430',.3);
 if(index%2===0){rect(x+w-15,ground-19-h+40,11,16,'#aa6d7a');rect(x+w-13,ground-19-h+42,7,12,'#d38e94');rect(x+w-11,ground-19-h+44,3,2,'#ffded1');}
 if(index%3===1){rect(x+10,ground-18,18,14,'#243d43');rect(x+13,ground-15,12,10,'#4b777a');rect(x+16,ground-13,6,2,theme.plant);rect(x+21,ground-14,2,8,theme.plant);}
}
function vines(x,theme,t){for(let i=0;i<5;i++){const xx=x+i*5,h=8+i*5+(i%2)*8;rect(xx,ground-18-h,2,h,theme.plant,.75);for(let j=0;j<3;j++)rect(xx+(j%2?2:-3),ground-19-h+j*7,5,2,theme.plant,.8);}}
function drawCrate(x,y,theme,rare=false){rect(x-10,y-13,20,15,rare?'#5b4d66':'#685542');rect(x-10,y-13,20,3,rare?'#bf81b9':'#c49c70');rect(x-8,y-9,16,9,rare?'#7a6091':'#906c4d');rect(x-8,y-10,2,11,'#312b35');rect(x+6,y-10,2,11,'#312b35');rect(x-2,y-11,4,9,rare?'#e0a4e4':'#eed3a0');rect(x-3,y-6,6,3,'#faf0ca');glow(x,y-7,rare?24:14,rare?'#c68df5':'#ffc286',rare?.27:.1);}
function drawPassenger(x,y,t,freed=false){rect(x-10,y+1,21,3,'#0c1720',.5);rect(x-5,y-28,10,11,'#e1bd92');rect(x-7,y-26,2,8,'#47313c');rect(x-7,y-30,13,4,'#5c3d3f');rect(x-5,y-17,10,15,freed?'#8db9a2':'#be8d70');rect(x-5,y-3,3,5,'#433644');rect(x+2,y-3,3,5,'#433644');rect(x-2,y-23,1,2,'#24333a');rect(x+2,y-23,1,2,'#24333a');if(!freed){rect(x-10,y-35,20,2,'#99b4aa');rect(x-10,y-35,2,36,'#73938e');rect(x+8,y-35,2,36,'#73938e');glow(x,y-38,12,'#ffda80',.2+.1*Math.sin(t*4));rect(x,y-39,2,2,'#fff0a4');}}
function drawHazard(x,y,t,theme){const bob=Math.sin(t*5+x)*2;glow(x,y-22+bob,30,'#ff506e',.23);rect(x-6,y-33+bob,12,26,'#1b2934');rect(x-8,y-30+bob,16,15,'#425565');rect(x-7,y-34+bob,14,5,'#223543');rect(x-5,y-24+bob,3,2,'#ff6583');rect(x+2,y-24+bob,3,2,'#ff6583');rect(x-4,y-7+bob,3,9,'#253743');rect(x+2,y-7+bob,3,9,'#253743');rect(x-12,y-18+bob,5,2,'#94646b');rect(x+7,y-18+bob,5,2,'#94646b');}
function drawRelic(x,y,t){glow(x,y-28,45,'#92eeea',.35);rect(x-7,y-25,14,22,'#31545e');rect(x-4,y-32,8,14,'#60bbba');rect(x-2,y-36,4,6,'#c4f7dd');rect(x-1,y-29,2,23,'#e7fbdf');rect(x-12,y-4,24,4,'#334b52');for(let k=0;k<4;k++)rect(x-15+k*10,y-17+Math.sin(t*3+k)*3,2,2,'#c9f4dd');}
function hero(x,y,t,moving,dashing){const bob=moving?Math.floor(Math.sin(t*14)*1.5):0;rect(x-9,y+2,20,3,'#020810',.55);if(dashing){glow(x-8,y-17,28,'#89dedd',.3);rect(x-16,y-21,12,3,'#78d0c3',.55);}const by=y+bob;
 // Boots and alternating legs.
 for(const side of [-1,1]){const step=moving?Math.round(Math.sin(t*14+side*1.5)*3):0;rect(x+side*3-2,by-8+step,4,9,'#2c3540');rect(x+side*3-3,by-1+step,5,3,'#16232d');}
 rect(x-6,by-24,12,17,'#d1a575');rect(x-7,by-25,14,4,'#e3bb82');rect(x-5,by-23,10,17,'#267980');rect(x-4,by-19,8,4,'#f5c880');rect(x-8,by-12,16,3,'#354953');
 const arm=moving?Math.round(Math.sin(t*14)*2):0;rect(x-9,by-21+arm,3,12,'#b08769');rect(x+6,by-21-arm,3,12,'#b08769');rect(x-5,by-36,10,11,'#d5aa80');rect(x-6,by-37,12,4,'#5a3e3a');rect(x-4,by-34,9,3,'#6a4944');rect(x-2,by-30,2,2,'#2b3741');rect(x+3,by-30,2,2,'#2b3741');rect(x-1,by-26,3,1,'#a06354');
 rect(x+8,by-14,3,6,'#bf9e68');rect(x+7,by-18,5,5,'#f3d38e');glow(x+10,by-16,30,'#ffc474',.23);
}
function trainScene(t,theme){drawSky(t,theme,0);drawPlatform(t,theme,0);stationFacade(W*.65,2,theme,t);lamp(W*.88,theme,t);vines(W*.69,theme,t);
 const trainY=ground-20,extra=save.levels.workshop+save.levels.lantern+save.levels.sleeper+save.levels.engine;
 rect(-10,trainY-56,W*.63+Math.min(extra,6)*20,53,'#142938');rect(-10,trainY-56,W*.63+Math.min(extra,6)*20,5,'#45646b');rect(-8,trainY-49,W*.64+Math.min(extra,6)*20,4,'#304a52');rect(-8,trainY-5,W*.65+Math.min(extra,6)*20,3,'#c4926e');
 // Locomotive and progressively restored cars.
 rect(W*.5,trainY-71,53,15,'#1e3d45');rect(W*.55,trainY-91,7,22,'#273c46');rect(W*.55-2,trainY-92,11,3,'#a3a492');rect(W*.58,trainY-58,42,50,'#254952');rect(W*.59,trainY-53,23,25,'#79a4a4');rect(W*.61,trainY-50,19,19,'#c6b98b');glow(W*.62,trainY-40,34,'#f9c67f',.16);
 rect(W*.58,trainY-58,39,3,'#d3b78e');rect(W*.585,trainY-25,36,3,'#bf936d');rect(W*.58,trainY-10,41,4,'#192d37');rect(W*.63,trainY-46,2,30,'#e1cfaa');rect(W*.65,trainY-41,3,3,'#fff3b7');glow(W*.65+2,trainY-40,48,'#ffd086',.18);for(const x of [W*.59,W*.64]){rect(x,trainY-4,8,6,'#111c27');rect(x+2,trainY-4,4,6,'#7b9794');}rect(W*.635,trainY-76,12,10,'#2d4c54');rect(W*.637,trainY-80,8,4,'#d2b985');
 for(let i=0;i<4;i++){const x=8+i*53;rect(x,trainY-49,47,39,i<extra?'#385961':'#263e48');rect(x,trainY-49,47,3,i<extra?'#d6b189':'#7e9a8e');for(let j=0;j<3;j++){const wx=x+7+j*13;rect(wx,trainY-39,9,18,'#17313b');rect(wx+1,trainY-38,7,16,i<extra?'#f2bb7e':'#547779');rect(wx+1,trainY-37,7,2,'#b1d3c9',.3);rect(wx+4,trainY-38,1,16,'#283c45');if(i<extra)glow(wx+4,trainY-30,17,'#ffd092',.13);}rect(x+5,trainY-10,38,2,'#c59770');rect(x+5,trainY-3,9,6,'#101e29');rect(x+35,trainY-3,9,6,'#101e29');}
 for(let i=0;i<3;i++)glow(W*.56-6+Math.sin(t*.8+i)*8,trainY-96-i*12,18+i*5,'#b1d3cd',.05);
 rect(0,trainY+1,W,4,'#181f28');hero(W*.75,ground-18,t,false,false);
 const titleX=W*.51,titleY=ground-121;rect(titleX-48,titleY-11,96,18,'#122c39');rect(titleX-46,titleY-9,92,14,'#c38868');text('LAST LIGHT',titleX,titleY,7,'#182a33','center');
}
function scene(t){const theme=run?run.theme:stationThemes[(save.night-1)%3],cam=camera();if(mode==='hub'||mode==='intro'||mode==='debrief'){trainScene(t,theme);return;}
 drawSky(t,theme,cam);drawPlatform(t,theme,cam);
 const first=Math.floor(cam/130)-1,last=first+Math.ceil(W/130)+3;for(let i=first;i<=last;i++){const x=i*130-cam;if(x< -150||x>W+140)continue;stationFacade(x,i,theme,t);if(i%2===0)lamp(x+105,theme,t);else vines(x+117,theme,t);}
 // Landmark at the return train; the route stretches away from it.
 if(cam<180){rect(23-cam,ground-88,66,69,'#264656');rect(25-cam,ground-83,62,4,'#537977');rect(31-cam,ground-70,52,35,'#7ea5a0');rect(38-cam,ground-64,38,27,'#e6bc7f');glow(55-cam,ground-51,40,'#ffd28e',.21);rect(24-cam,ground-20,65,3,'#c7a078');text('THE TRAIN',54-cam,ground-92,6,'#f1d4a3','center');}
 for(const obj of run.objects){const x=obj.x-cam;if(x< -35||x>W+35||obj.gone)continue;if(obj.type==='crate')drawCrate(x,ground-20,theme,obj.rare);else if(obj.type==='passenger')drawPassenger(x,ground-19,t);else if(obj.type==='hazard')drawHazard(x,ground-19,t,theme);else if(obj.type==='relic')drawRelic(x,ground-20,t);}
 for(let i=Math.floor(cam/74)-1;i<Math.floor((cam+W)/74)+2;i++){const x=i*74-cam;if(i%3===0){rect(x,ground-22,18,2,'#547770');rect(x+3,ground-24,3,4,theme.plant);rect(x+9,ground-25,2,5,theme.plant);}else if(i%5===0){rect(x,ground-21,10,3,'#849084');rect(x+2,ground-24,4,3,'#454e57');}}
 hero(run.x-cam,ground-19,t,run.moving,run.dash>0);
 for(let i=0;i<8;i++){const x=(i*72-cam*.75)%W;rect(x,ground+8,30,1,theme.lit,.03);}
}
function drawRain(dt,t){for(const r of rain){r.x-=r.v*dt*.18;r.y+=r.v*dt;if(r.y>H||r.x< -5){r.x=W+Math.random()*20;r.y=-20-Math.random()*H;}rect(r.x,r.y,1,2+r.d,'#c7e4df',.08+r.d*.025);}for(const p of fx){const x=run?p.x-camera():p.x;ctx.globalAlpha=Math.max(0,p.life);if(p.type==='text')text(p.label,x,p.y,8,p.c,'center');else rect(x,p.y,2,2,p.c);ctx.globalAlpha=1;}}
function updateFx(dt){for(let i=fx.length-1;i>=0;i--){const p=fx[i];p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=p.type==='spark'?95*dt:0;if(p.life<=0)fx.splice(i,1);}shake*=.88;if(shake<.1)shake=0;}
function newRun(){const n=save.night,r=rng(72617+n*21973),theme=stationThemes[(n-1)%3];run={theme,length:1750+Math.min(n,10)*60,x:55,charge:Math.min(140,100+save.levels.lantern*16),maxCharge:Math.min(140,100+save.levels.lantern*16),items:[],objects:[],rescued:0,hits:0,rare:0,dash:0,dashCd:0,invuln:0,moving:false,direction:1,elapsed:0,secret:false};
 let crateIndex=0;for(let x=160;x<run.length-100;x+=95+r()*90){const v=r(),rare=crateIndex===3||crateIndex>3&&v>.84;run.objects.push({x:x+r()*28,type:'crate',kind:rare?'spark':'scrap',rare,gone:false});crateIndex++;if(r()>.76)run.objects.push({x:x+49,type:'hazard',gone:false});}
 for(const x of [520,1030,1450,...Array.from({length:save.levels.sleeper},(_,i)=>720+i*255)])if(x<run.length-100)run.objects.push({x:x+r()*70,type:'passenger',gone:false});
 for(let i=0;i<5;i++)run.objects.push({x:300+i*290+r()*120,type:'hazard',gone:false});
 run.objects.push({x:run.length-80,type:'relic',gone:false});
 mode='field';$('intro').classList.add('hidden');$('debrief').classList.add('hidden');$('phase').textContent=theme.name;$('mission').textContent='SEARCH · CHOOSE WHAT TO CARRY · RETURN';$('depart').style.display='none';$('return').style.display='block';$('upgradeBtn').style.display='none';toast(theme.name);sfx(600,.25,'triangle',.06);refresh();}
function capacity(){return 5+save.levels.workshop*2;}
function itemValue(item){return item==='spark'?3:1;}
function collect(){if(mode!=='field'||!run)return;let nearest=null,dist=25;for(const obj of run.objects){if(obj.gone||obj.type==='hazard')continue;const d=Math.abs(obj.x-run.x);if(d<dist){nearest=obj;dist=d;}}
 if(!nearest){if(run.x<110)endRun(false);else toast('MOVE CLOSER');return;}
 nearest.gone=true;const px=nearest.x,py=ground-47;
 if(nearest.type==='passenger'){run.rescued++;burst(px,py,'#ffe1a2',24);pop(px,py-12,'PASSENGER SAFE');toast('PASSENGER RESCUED');sfx(720,.22,'triangle',.06);refresh();return;}
 if(nearest.type==='relic'){run.secret=true;burst(px,py,'#b9fff2',36);pop(px,py-10,'STAR CORE');toast('STAR CORE FOUND');sfx(970,.35,'sine',.08);refresh();return;}
 if(run.items.length>=capacity()){const lowest=run.items.findIndex(x=>x==='scrap');if(nearest.kind==='spark'&&lowest>=0){run.items.splice(lowest,1);toast('SWAPPED FOR SPARK');}else{nearest.gone=false;toast('BAG FULL · RETURN');sfx(120,.12);return;}}
 run.items.push(nearest.kind);if(nearest.rare)run.rare++;burst(px,py,nearest.rare?'#deaff2':'#ffd9a0',nearest.rare?24:12);pop(px,py-10,nearest.rare?'SPARK +1':'SCRAP +1',nearest.rare?'#ebbbff':'#ffe0a2');shake=nearest.rare?3:1;sfx(nearest.rare?900:520,.15,'triangle',.05);refresh();}
function dash(){if(mode!=='field'||!run||run.dashCd>0)return;run.dash=.24;run.invuln=.55;run.dashCd=2.2;shake=2;burst(run.x,ground-38,'#9ce5df',10);sfx(300,.16,'sawtooth',.045);}
function updateRun(dt,t){if(mode!=='field'||!run)return;run.elapsed+=dt;run.dash=Math.max(0,run.dash-dt);run.dashCd=Math.max(0,run.dashCd-dt);run.invuln=Math.max(0,run.invuln-dt);
 const left=keys.has('a')||keys.has('arrowleft')||touch.left,right=keys.has('d')||keys.has('arrowright')||touch.right,m=right?1:0-(left?1:0);run.moving=!!m;
 if(m){run.direction=m;run.x=Math.max(34,Math.min(run.length-32,run.x+m*(80+save.levels.engine*13)*(run.dash>0?3.4:1)*dt));}
 run.charge-=dt*(.9+(run.x>run.length*.65?.14:0));
 for(const obj of run.objects){if(obj.gone||obj.type!=='hazard')continue;if(Math.abs(obj.x-run.x)<10&&run.invuln<=0){run.invuln=1.7;run.charge=Math.max(0,run.charge-12);run.hits++;if(run.items.length){const lost=run.items.shift();pop(run.x,ground-50,'LOST '+lost.toUpperCase(),'#ff9eaa');}else pop(run.x,ground-50,'-12 CHARGE','#ff9eaa');blink('#ff7189',.36);shake=6;burst(run.x,ground-35,'#ff8fa0',16);sfx(145,.26,'sawtooth',.07);refresh();}}
 if(run.charge<=0)endRun(true);else refresh();}
function endRun(emergency=false){if(mode!=='field'||!run)return;if(!emergency&&!run.items.length&&!run.rescued&&!run.secret){toast('BRING BACK SUPPLIES');return;}mode='debrief';const lost=emergency?Math.ceil(run.items.length*.5):0;if(lost)run.items.splice(0,lost);const earnedScrap=run.items.filter(x=>x==='scrap').length,earnedSpark=run.items.filter(x=>x==='spark').length+(run.secret?1:0),earnedCoins=earnedScrap*2+earnedSpark*5+run.rescued*4;
 save.scrap+=earnedScrap;save.spark+=earnedSpark;save.coins+=earnedCoins;save.passengers+=run.rescued;save.records.runs++;save.records.best=Math.max(save.records.best,run.x);save.night++;persist();
 $('debriefEyebrow').textContent=emergency?'LANTERN EMPTY · EMERGENCY RETURN':'NIGHT COMPLETE';$('runText').textContent=emergency?'The crew lost '+lost+' parts in the dark. The train is safe.':'The train pulls away with new parts and stories.';
 $('runLoot').innerHTML='<span>⚙ '+earnedScrap+' SCRAP</span><span>✦ '+earnedSpark+' SPARK</span><span>◈ '+run.rescued+' SAVED</span><span>+'+earnedCoins+' COINS</span>';
 $('debrief').classList.remove('hidden');$('phase').textContent='ON BOARD';$('mission').textContent='REPAIR THE TRAIN · LEAVE AGAIN';$('depart').style.display='block';$('return').style.display='none';$('upgradeBtn').style.display='block';renderUpgrades();refresh();sfx(620,.25,'triangle',.075);}
const upgrades=[
 {id:'workshop',icon:'⚒',name:'WORKSHOP CAR',desc:'Carry 2 more parts each night',scrap:3,spark:0},
 {id:'lantern',icon:'◈',name:'LANTERN CAR',desc:'More time at each station',scrap:2,spark:1},
 {id:'sleeper',icon:'☽',name:'SLEEPER CAR',desc:'More passengers, warmer windows',scrap:3,spark:0},
 {id:'engine',icon:'➤',name:'ENGINE CAR',desc:'Move faster on the platform',scrap:2,spark:1}
];
function price(u){const l=save.levels[u.id];return{scrap:u.scrap+l*2,spark:u.spark+Math.floor(l/2)};}
function renderUpgrades(){const list=$('upgradeList');list.replaceChildren();for(const u of upgrades){const p=price(u),b=document.createElement('button');b.className='upgrade';b.disabled=save.scrap<p.scrap||save.spark<p.spark||save.levels[u.id]>=4;b.innerHTML='<span class="symbol">'+u.icon+'</span><span><strong>'+u.name+' · LV '+save.levels[u.id]+'</strong><small>'+u.desc+'</small></span><span class="cost">'+p.scrap+' ⚙'+(p.spark?' · '+p.spark+' ✦':'')+'</span>';b.onclick=()=>{save.scrap-=p.scrap;save.spark-=p.spark;save.levels[u.id]++;save.coins+=1;persist();renderUpgrades();refresh();blink('#ffe1a5',.22);toast(u.name+' REPAIRED');sfx(810,.3,'triangle',.07);burst(W*.32,ground-45,'#ffdc9e',24);};list.append(b);}
 const count=Object.values(save.levels).reduce((a,b)=>a+b,0);$('trainStatus').textContent=count+' RESTORED MODULES · '+save.scrap+' SCRAP · '+save.spark+' SPARK';}
function refresh(){if(!run)return;$('night').textContent=String(save.night).padStart(2,'0');$('coins').textContent=save.coins;$('batteryFill').style.width=Math.max(0,run.charge/run.maxCharge*100)+'%';$('batteryText').textContent=Math.ceil(Math.max(0,run.charge))+'%';$('bagCount').textContent=run.items.length+' / '+capacity();$('cargoLabel').textContent=run.items.length?run.items.filter(x=>x==='scrap').length+' SCRAP · '+run.items.filter(x=>x==='spark').length+' SPARK':'EMPTY';}
function controls(){addEventListener('keydown',e=>{const k=e.key.toLowerCase();if([' ','arrowleft','arrowright'].includes(k))e.preventDefault();keys.add(k);if(e.repeat)return;if(k==='e'||k==='arrowup')collect();if(k===' '||k==='shift')dash();if(k==='r'&&mode==='field')endRun(false);});addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));addEventListener('blur',()=>{keys.clear();touch.left=touch.right=false;});
 for(const [id,key] of [['left','left'],['right','right']]){const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);touch[key]=true;});for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,()=>touch[key]=false);}
 $('interact').addEventListener('pointerdown',e=>{e.preventDefault();collect();});$('dash').addEventListener('pointerdown',e=>{e.preventDefault();dash();});$('start').onclick=()=>{mode='hub';$('intro').classList.add('hidden');run=null;$('night').textContent=String(save.night).padStart(2,'0');$('coins').textContent=save.coins;$('mission').textContent='THE NEXT STATION IS WAITING';toast('ALL ABOARD');sfx(430,.33,'triangle',.06);};$('depart').onclick=newRun;$('next').onclick=newRun;$('return').onclick=()=>endRun(false);$('upgradeBtn').onclick=()=>{if(mode==='debrief')$('debrief').classList.remove('hidden');else{mode='debrief';$('debriefEyebrow').textContent='WORKSHOP';$('runText').textContent='The train remembers every repair.';$('runLoot').innerHTML='';$('debrief').classList.remove('hidden');renderUpgrades();}};
 canvas.addEventListener('pointerdown',e=>{if(mode!=='field'||innerWidth/innerHeight<.8)return;const x=e.clientX/innerWidth*W+camera(),near=run.objects.find(o=>!o.gone&&o.type!=='hazard'&&Math.abs(o.x-x)<16&&Math.abs(o.x-run.x)<27);if(near)collect();});}
function tick(ms){requestAnimationFrame(tick);let dt=Math.min((ms-last)/1000||0,.05);last=ms;frame+=dt;updateRun(dt,frame);updateFx(dt);ctx.save();if(shake>1)ctx.translate(Math.round((Math.random()-.5)*shake),Math.round((Math.random()-.5)*shake));scene(frame);drawRain(dt,frame);ctx.restore();}
controls();$('night').textContent=String(save.night).padStart(2,'0');$('coins').textContent=save.coins;$('return').style.display='none';$('upgradeBtn').style.display='none';requestAnimationFrame(tick);
if(location.hostname==='127.0.0.1'&&new URLSearchParams(location.search).has('qa'))window.railQA={state:()=>({mode,night:save.night,x:run?.x,charge:run?.charge,bag:run?.items.length,scrap:save.scrap,spark:save.spark,level:save.levels.workshop,passengers:save.passengers}),targets:type=>run?.objects.filter(o=>o.type===type&&!o.gone).map(o=>o.x),place:x=>{run.x=x;},collect,return:()=>endRun(false),clear:()=>{localStorage.removeItem(STORAGE);}};
})();

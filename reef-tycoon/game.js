'use strict';
const $=id=>document.getElementById(id),canvas=$('sea'),ctx=canvas.getContext('2d');
const key='reef-tycoon.save.v1',initial={region:0,seen:[],bag:[],pads:Array(6).fill(null),levels:Array(6).fill(1),coins:0,bank:0,rod:1,speed:1,gear:1,strength:0,rewards:{},updated:0};
let data={...initial};try{data={...initial,...JSON.parse(localStorage.getItem(key))}}catch{}
let phase='harbor',t=0,age=0,target=0,tension=.24,progress=0,held=false,drift=0,lane=0,hits=0,avoided=0,muted=false,ac,last=0,W=0,H=0,plate,school=[],rings=[],castX=.64,catchLength=0,toast='',toastUntil=0,currentPage='',saving=0;
let buddyUntil=0;let luck=0,pulls=0,pullsNeeded=8,lead=0,shore=0,kick=0,pulse=0;
const paperFiber=grainPlate(816);
let depthWash;
let selectedStand=-1,exhibitAt=-1;
function store(){try{localStorage.setItem(key,JSON.stringify(data))}catch{}}
const sdk=bridge({read:()=>data,write:(p,cloud)=>{if(cloud&&(phase!=='harbor'||p.updated<=data.updated))return;data={...initial,...p};store();if(cloud)build()},changed:e=>{if(e.type==='reward')notify('Harbor badge earned')}});
function save(){data.updated=Date.now();store();sdk.save()}
function notify(s){toast=s;toastUntil=t+2}
function tone(hz,length=.15,type='sine',delay=0){if(muted)return;try{ac??=new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume().catch(()=>{});const when=ac.currentTime+delay,n=ac.createOscillator(),g=ac.createGain();n.type=type;n.frequency.setValueAtTime(hz,when);n.frequency.exponentialRampToValueAtTime(hz*.92,when+length);g.gain.setValueAtTime(.0001,when);g.gain.exponentialRampToValueAtTime(.045,when+.012);g.gain.exponentialRampToValueAtTime(.0001,when+length);n.connect(g);g.connect(ac.destination);n.start(when);n.stop(when+length+.01)}catch{}}
function chime(){[392,494,587,784].forEach((n,i)=>tone(n,.30,'sine',i*.085))}
function build(){
 W=innerWidth;H=innerHeight;const d=Math.min(devicePixelRatio||1,1.65);
 canvas.width=Math.round(W*d);canvas.height=Math.round(H*d);ctx.setTransform(d,0,0,d,0,0);
 if(!waters[data.region])data.region=0;
 plate=document.createElement('canvas');plate.width=canvas.width;plate.height=canvas.height;const g=plate.getContext('2d');g.scale(d,d);coastline(g,W,H,data.region);g.globalAlpha=.52;g.fillStyle=g.createPattern(paperFiber,'repeat');g.fillRect(0,0,W,H);
 depthWash=document.createElement('canvas');depthWash.width=Math.ceil(W*.65);depthWash.height=Math.ceil(H*.65);
 const wash=depthWash.getContext('2d');wash.scale(.65,.65);const rand=paintSeed(72+data.region);
 wash.globalAlpha=.055;for(let i=0;i<85;i++)pigment(wash,rand,rand()*W,rand()*H,18+rand()*90,6+rand()*35,i%3?waters[data.region][4]:'#f8e8b3');
 wash.globalAlpha=.35;wash.fillStyle=wash.createPattern(paperFiber,'repeat');wash.fillRect(0,0,W,H);
 school=roster.filter(f=>f.r===data.region);$('place').textContent=waters[data.region][0];
}
function stage(p){phase=p;age=0;held=false;document.body.classList.toggle('deep',['bite','reel','run'].includes(p));updateUI()}
function updateUI(){
 const free=phase==='harbor',pull=phase==='reel',swim=phase==='run',roll=phase==='bite';
 $('pack').hidden=!free;$('book').hidden=$('pier').hidden=!free;$('meter').hidden=!(pull||swim||roll);
 $('act').hidden=phase==='landed';$('act').disabled=!$('sheet').hidden||['cast','landed','reveal'].includes(phase);
 const act=free?'Cast line':roll?'Tap for luck':pull?'Pull!':swim?'Swim!':phase==='cast'?'Casting…':'Coming ashore';
 const hint=t<toastUntil?toast:free?'Tap the water to cast':phase==='cast'?'Follow the float':roll?'Luck +'+luck:pull?names[target]+' · '+rates[target]+' shells/s':swim?Math.ceil(shore)+' m to shore':'Catch secured';
 if($('act').textContent!==act)$('act').textContent=act;if($('hud').textContent!==hint)$('hud').textContent=hint;
 const fill=$('fill');fill.style.width=(pull?100*pulls/pullsNeeded:swim?100*Math.max(0,lead)/6:luck*10)+'%';fill.style.background=swim&&lead<2?'#ff8b72':'#86dfbd';
}
function splash(x,y,n=12){for(let i=0;i<n;i++)rings.push({x,y,vx:Math.cos(i*2.4)*(8+i*3),vy:-35-i*3,life:.55+i%3*.12})}
function cast(x){
 if(phase!=='harbor'||!$('sheet').hidden)return;
 castX=Math.max(.22,Math.min(.87,x));luck=pulls=progress=kick=pulse=0;toastUntil=0;
 sdk.prepare();sdk.start();stage('cast');tone(310,.20,'triangle');
}
function hookFish(){
 const power=Math.min(.22,Math.log1p(data.strength||0)*.028);
 const score=Math.min(.999,castX*.44+Math.random()*.53+luck*.033+power);
 const bands=regions[data.region].groups.length;
 const tier=Math.min(bands-1,Math.floor(score*bands));
 const pool=school.filter(f=>f.tier===tier);
 target=pool[Math.floor(Math.random()*pool.length)].id;catchLength=Math.round((12+(target*17%75))*(.8+Math.random()*.42));
 pullsNeeded=Math.max(4,8+byId.get(target).tier*2-Math.min(5,data.rod-1));
 stage('reel');pulse=1;tone(660,.20);
}
function act(){
 if(!$('sheet').hidden)return;
 if(phase==='harbor')cast(.64);
 else if(phase==='bite'&&luck<10){luck++;pulse=1;tone(400+luck*38,.09);splash(W*castX,H*.64,7)}
 else if(phase==='reel'){pulls++;progress=pulls/pullsNeeded;pulse=1;tone(240+progress*260,.1,'triangle');
 if(pulls>=pullsNeeded){lead=3.2;shore=17;kick=.6;stage('run');tone(147,.44,'triangle')}}
 else if(phase==='run'){kick=Math.min(1.4,kick+.48);pulse=1;tone(310,.09)}
 updateUI()
}
$('act').onpointerdown=e=>{if(e.button!==0)return;e.preventDefault();$('act').setPointerCapture(e.pointerId);act()};
function release(){held=false;updateUI()}
$('act').onpointerup=$('act').onpointercancel=$('act').onlostpointercapture=release;
$('act').onclick=e=>{if(e.detail===0)act()};
addEventListener('keydown',e=>{if(e.code==='Space'&&$('sheet').hidden){e.preventDefault();if(!e.repeat)act()}});addEventListener('keyup',e=>{if(e.code==='Space')release()});
canvas.onpointerdown=e=>{if(phase==='harbor'&&Math.hypot(e.clientX-W*.78,e.clientY-H*.71)<35){buddyUntil=t+1.7;splash(W*.78,H*.71);chime();return}if(phase==='harbor')cast(e.clientX/W);else if(['bite','reel','run'].includes(phase)){canvas.setPointerCapture(e.pointerId);act()}};canvas.onpointerup=canvas.onpointercancel=release;
$('audio').onclick=()=>{muted=!muted;$('audio').textContent=muted?'♫ ×':'♪';$('audio').setAttribute('aria-label',muted?'Enable sound':'Mute sound');if(!muted)tone(660)};
function sheet(html,kind){currentPage=kind;$('page').innerHTML=html;$('sheet').hidden=false;$('act').disabled=true;$('close').focus()}
function closeSheet(){if(phase==='landed')stage('harbor');$('sheet').hidden=true;currentPage='';updateUI();$('act').focus()}
$('close').onclick=closeSheet;addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('sheet').hidden)closeSheet()});
function specimen(c,f,hidden=false){
 c.width=320;c.height=166;const g=c.getContext('2d');g.save();g.translate(160,82);
 const rand=paintSeed(481+f.id);g.globalAlpha=.09;
 for(let i=0;i<5;i++)pigment(g,rand,rand()*16-8,rand()*8-4,95+rand()*16,40+rand()*10,waters[f.r][5]);
 g.globalAlpha=1;if(hidden)g.clearRect(-160,-82,320,166);fishArt(g,f,0,-3,1.82);
 if(hidden){g.globalCompositeOperation='source-in';g.fillStyle='#667b78';g.fillRect(-160,-82,320,166)}
 g.restore();
 g.strokeStyle='#9c917b';g.lineWidth=.8;for(let i=0;i<17;i++){const x=104+i*7;line(g,x,153,x,153-(i%4===0?6:3),'#9c917b',.8)}
}
function journal(r=data.region){
 const list=roster.filter(f=>f.r===r),known=list.filter(f=>data.seen.includes(f.id)).length;
 sheet('<h2>Field journal</h2><p class="note">'+data.seen.length+' of 100 recorded</p><select aria-label="Fishing region" id="region">'+waters.map((w,i)=>'<option value="'+i+'" '+(i===r?'selected':'')+'>'+w[0]+'</option>').join('')+'</select> <b>'+known+' / '+list.length+'</b><div id="cards"></div><button class="paperAction" id="sail">Fish these waters</button><button class="paperAction" id="quay">Harbor ledger</button>','journal');
 for(const f of list){const card=document.createElement('div');card.className='card';const art=document.createElement('canvas');specimen(art,f,!data.seen.includes(f.id));if(!data.seen.includes(f.id))card.classList.add('unseen');card.append(art,document.createTextNode(data.seen.includes(f.id)?f.name:f.band));$('cards').append(card)}
 $('region').onchange=e=>journal(+e.target.value);$('sail').onclick=()=>{data.region=r;save();build();closeSheet();tone(520)};$('quay').onclick=ledger;
}
function ledger(){
 const next=data.bag[0],carrying=next!==undefined;
 sheet('<h2>Exhibit pier</h2><p class="note">'+(carrying?'Choose a stand for '+names[next]:Math.floor(data.coins)+' shells in your purse')+'</p><div id="stands"></div><p class="note" id="bank"></p><button class="paperAction" id="collect">Collect earnings</button><button class="paperAction" id="workshop">Outfitters</button>','ledger');
 for(let i=0;i<6;i++){
  const id=data.pads[i],button=document.createElement('button');button.className='stand';button.dataset.slot=i;
  if(id!==null){const c=document.createElement('canvas');specimen(c,byId.get(id));button.append(c)}
  const text=id===null?'Empty stand':names[id];button.append(document.createTextNode(selectedStand===i&&carrying?'Confirm exchange':text));
  button.title=id===null?'Place catch':text+' · '+rates[id]+' shells/s';
  button.onclick=()=>{if(!carrying)return;
   if(id!==null&&selectedStand!==i){selectedStand=i;ledger();return}
   data.pads[i]=data.bag.shift();data.levels[i]=1;if(id!==null)data.bag.push(id);
   selectedStand=-1;exhibitAt=i;save();chime();ledger()};
  if(i===exhibitAt)button.classList.add('placed');$('stands').append(button)
 }
 $('collect').onclick=()=>{const n=Math.floor(data.bank);data.bank-=n;data.coins+=n;save();tone(740);ledger()};
 $('workshop').onclick=workshop;refreshBank()
}
function refreshBank(){const e=$('bank');if(e){const value='Ready to collect · '+Math.floor(data.bank)+' shells';if(e.textContent!==value)e.textContent=value}}
$('pack').onclick=()=>{sheet('<h2>Skipper’s pack</h2><button class="paperAction" id="album">Fish album</button><button class="paperAction" id="exhibit">Exhibit pier</button><button class="paperAction" id="music"></button>','pack');$('album').onclick=()=>journal();$('exhibit').onclick=ledger;const sound=$('music');sound.textContent=muted?'Sound off':'Sound on';sound.onclick=()=>{$('audio').click();sound.textContent=muted?'Sound off':'Sound on'}};
function workshop(){
 sheet('<h2>Harbor outfitters</h2><p class="note">'+Math.floor(data.coins)+' shells · '+data.strength+' casting power</p><div id="tools"></div><button class="paperAction" id="train">Lift weights · +'+data.gear+' power</button><button class="paperAction" id="back">Exhibit pier</button>','shop');
 for(const [key,title] of [['gear','Weights'],['rod','Fishing rod'],['speed','Swim fins']]){
  const b=document.createElement('button'),price=25*data[key];b.className='paperAction';b.disabled=data.coins<price;b.textContent=title+' '+data[key]+' → '+(data[key]+1)+' · '+price;
  b.onclick=()=>{if(data.coins<price)return;data.coins-=price;data[key]++;save();chime();workshop()};$('tools').append(b)
 }
 $('train').onclick=()=>{data.strength+=data.gear;save();tone(280,.12,'triangle');workshop()};$('back').onclick=ledger
}
$('pier').onclick=()=>{selectedStand=-1;exhibitAt=-1;ledger()};

$('book').onclick=()=>journal();
function land(){
 const f=byId.get(target),fresh=!data.seen.includes(target);if(fresh)data.seen.push(target);const gain=5+f.r*3+f.tier*3+Math.floor(catchLength/12);data.coins+=gain;
 data.bag.push(target);save();sdk.end();stage('landed');chime();sheet('<div id="result"><p class="note">'+(fresh?'New field record':'Catch recorded')+'</p><canvas></canvas><h3>'+f.name+'</h3><p class="note">'+catchLength+' cm · '+rates[target]+' shells/s · +'+gain+' shells</p><button class="paperAction" id="again">Place at the pier</button></div>','catch');specimen($('result').querySelector('canvas'),f);
 $('again').onclick=()=>{stage('harbor');selectedStand=-1;exhibitAt=-1;ledger()};
}

function lose(message){sdk.end();stage('harbor');notify(message);tone(135,.35,'triangle')}
function step(dt){
 t+=dt;pulse=Math.max(0,pulse-dt*3);data.bank+=data.pads.reduce((n,id,i)=>n+(id===null?0:(rates[id]||0)*(data.levels[i]||1)),0)*dt;
 saving+=dt;if(saving>15){saving=0;save()}
 if(!$('sheet').hidden){refreshBank();return}age+=dt;
 if(phase==='cast'&&age>.84){splash(W*castX,H*.64,24);tone(195,.13);stage('bite')}
 else if(phase==='bite'&&age>2.45)hookFish();
 else if(phase==='run'){kick=Math.max(0,kick-dt*1.12);const speed=Math.min(data.speed-1,12)*.13;
 shore=Math.max(0,shore-dt*(1.8+kick*2.8+speed));lead=Math.min(6,lead+dt*(kick*1.6-.78+speed*.18));
 if(shore<=0){stage('reveal');chime()}else if(lead<=0)lose('The shark caught up · cast again')}
 else if(phase==='reveal'&&age>1.25)land();

 for(const p of rings){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=130*dt}rings=rings.filter(p=>p.life>0);updateUI()
}
function riskLane(){return (avoided+target)%2}
function surface(){
 ctx.drawImage(plate,0,0,W,H);const h=H*.47,bx=W*.32,by=h+(H-h)*.25,k=Math.min(W/340,H/470,1.9);
 for(let i=0;i<28;i++){const x=((i*103+t*(2+i%4))%(W+40))-20,y=h+4+(i*31%(H*.43));path(ctx,null,'M'+x+' '+y+' q7 2 14 0 t14 0','#e0efe044',1.1)}
 for(let i=0;i<4;i++){const x=(W*.77+i*21+t*3)%W,y=h*.68+Math.sin(i)*12;path(ctx,null,'M'+x+' '+y+' q4 -4 8 0 q5 -3 8 -1','#4e6c70',1.3)}
 playfulBay(ctx,W,H,t);harborDetail(ctx,W,H,t);cutter(ctx,bx,by,k,t,phase==='cast');
 const fx=W*castX,fy=H*.64;if(phase==='cast'){const u=Math.min(1,age/.72),x=bx+64*k+(fx-bx-64*k)*u,y=by-54*k+(fy-by+54*k)*u-Math.sin(u*Math.PI)*H*.19;path(ctx,null,'M'+(bx+64*k)+' '+(by-54*k)+' Q'+((bx+x)/2)+' '+(y-10)+' '+x+' '+y,'#e4ead2',1);dot(ctx,x,y,4,5,'#e98e5b')}
 if(phase==='harbor'){const x=W*.65,y=H*.65;for(let i=0;i<3;i++){const a=(t*.34+i/3)%1;ctx.strokeStyle='rgba(254,235,175,'+(.65*(1-a))+')';ctx.beginPath();ctx.ellipse(x,y,12+a*28,4+a*9,0,0,Math.PI*2);ctx.stroke()}}
}
function underwater(){
 const p=waters[data.region];ctx.fillStyle=gradient(ctx,0,H,p[5],p[6]);ctx.fillRect(0,0,W,H);
 ctx.drawImage(depthWash,0,0,W,H);
 for(let i=0;i<8;i++){const x=(i+.3)*W/7+Math.sin(t*.22+i)*8;path(ctx,'#e8ffd50c','M'+x+' 0 l'+(-W*.24)+' '+H+' h'+(W*.08)+' L'+(x+10)+' 0Z')}
 for(let i=0;i<38;i++){const x=i*91%W,y=H-((t*(6+i%5)+i*39)%H);dot(ctx,x+Math.sin(t+i)*4,y,1+i%3,1+i%3,'#dcf5da59')}
 reefRelief(ctx,W,H,data.region,t);
 for(let i=0;i<35;i++){const x=i*W/34,hh=H*(.06+.11*Math.abs(Math.sin(i*7)));path(ctx,null,'M'+x+' '+H+' q-11 '+(-hh*.45)+' 2 '+(-hh*.68)+' t'+(3*Math.sin(t+i))+' '+(-hh*.36),i%2?'#1c5257':'#2d6965',2+i%4)}
 if(phase==='run'){drawPursuit(ctx);return}

 const x=W*(.51+Math.sin(t*1.9)*.08),y=H*(.55+Math.cos(t*1.3)*.034-progress*.14);
 for(let i=0;i<4;i++){ctx.globalAlpha=.18;fishArt(ctx,school[(i*3+2)%school.length],((t*(8+i)+i*W*.29)%(W+100))-50,H*(.37+.08*i),.45,t+i);ctx.globalAlpha=1}
 path(ctx,null,'M'+W*.52+' 0 Q'+(W*.48+(held?4:18))+' '+H*.25+' '+x+' '+y,'#e4efd27a',1.5);
 fishArt(ctx,byId.get(target),x,y-pulse*9,Math.min(W/145,H/240,3)*(1+pulse*.04),t+progress*3);
}
function frame(now){
 const dt=Math.min(.045,(now-(last||now))/1000);last=now;
 if(!document.hidden){step(dt);drift+=(lane-drift)*(1-Math.exp(-dt*10));if(['reel','run'].includes(phase)){
 ctx.save();const zoom=1+.08*Math.exp(-age*3);ctx.translate(W/2,H*.5);ctx.scale(zoom,zoom);ctx.translate(-W/2,-H*.5);underwater();ctx.restore();
 if(phase==='reel')drawDial(ctx);foamWipe(ctx,age)
 }else{surface();if(phase==='bite')drawWhirlpool(ctx);if(phase==='reveal')drawArrival(ctx)}

 for(const p of rings)dot(ctx,p.x,p.y,2,3,'#e6f0d8')}
 requestAnimationFrame(frame)
}
build();updateUI();requestAnimationFrame(frame);addEventListener('resize',build);addEventListener('blur',release);addEventListener('pagehide',()=>{store();sdk.end();sdk.stop()});addEventListener('pageshow',e=>{if(e.persisted)location.reload()});

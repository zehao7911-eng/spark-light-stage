'use strict';
const $=id=>document.getElementById(id),canvas=$('sea'),ctx=canvas.getContext('2d');
const key='reef-tycoon.save.v1',initial={region:0,seen:[],bag:[],pads:Array(6).fill(null),levels:Array(6).fill(1),coins:0,bank:0,rod:1,speed:1,gear:1,strength:0,rewards:{},updated:0};
let data={...initial};try{data={...initial,...JSON.parse(localStorage.getItem(key))}}catch{}
let phase='harbor',t=0,age=0,target=0,tension=.24,progress=0,held=false,drift=0,lane=0,hits=0,avoided=0,muted=false,ac,last=0,W=0,H=0,plate,school=[],rings=[],castX=.64,catchLength=0,toast='',toastUntil=0,currentPage='',saving=0;
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
 plate=document.createElement('canvas');plate.width=canvas.width;plate.height=canvas.height;const g=plate.getContext('2d');g.scale(d,d);coastline(g,W,H,data.region);
 school=roster.filter(f=>f.r===data.region);$('place').textContent=waters[data.region][0];
}
function stage(p){phase=p;age=0;held=false;document.body.classList.toggle('deep',['bite','reel','run'].includes(p));updateUI()}
function updateUI(){
 const free=phase==='harbor',deep=phase==='reel',run=phase==='run';$('book').hidden=!free;
 $('meter').hidden=!deep;$('act').hidden=phase==='landed';$('act').disabled=['cast','bite','landed'].includes(phase);
 const act=free?'Cast line':phase==='cast'?'Line away…':phase==='bite'?'A bite!':deep?(held?'Release to cool':'Hold to reel'):run?'Switch wake':'Catch landed';
 if($('act').textContent!==act)$('act').textContent=act;
 const hint=t<toastUntil?toast:free?'Tap farther out for rarer fish':phase==='cast'?'Watch the float':phase==='bite'?'Get ready to reel':deep?(tension>.73?'Ease off · high tension':Math.round(progress*100)+'% aboard · watch tension'):run?'Dodge the red wake · '+avoided+'/3':'Logged in your journal';
 if($('hud').textContent!==hint)$('hud').textContent=hint;
 if(deep){$('fill').style.width=tension*100+'%';$('fill').style.background=tension>.73?'#ff8260':'#83ddc0'}
}
function splash(x,y,n=12){for(let i=0;i<n;i++)rings.push({x,y,vx:Math.cos(i*2.4)*(8+i*3),vy:-35-i*3,life:.55+i%3*.12})}
function cast(x){if(phase!=='harbor'||!$('sheet').hidden)return;castX=Math.max(.22,Math.min(.87,x));const tier=Math.min(regions[data.region].groups.length-1,Math.floor(castX*regions[data.region].groups.length));const pool=Math.random()<.78?school.filter(f=>f.tier===tier):school;
 target=pool[Math.floor(Math.random()*pool.length)].id;catchLength=Math.round((12+(target*17%75))*(.8+Math.random()*.42));tension=.24;progress=0;drift=0;lane=0;hits=avoided=0;
 sdk.prepare();sdk.start();stage('cast');tone(310,.20,'triangle')}
function act(){if(phase==='harbor')cast(.64);else if(phase==='reel'){held=true;tone(220,.08)}else if(phase==='run'){lane=1-lane;tone(320+lane*100,.1)}updateUI()}
$('act').onpointerdown=e=>{if(e.button!==0)return;e.preventDefault();$('act').setPointerCapture(e.pointerId);act()};
function release(){held=false;updateUI()}
$('act').onpointerup=$('act').onpointercancel=$('act').onlostpointercapture=release;
$('act').onclick=e=>{if(e.detail===0&&phase!=='reel')act()};
addEventListener('keydown',e=>{if(e.code==='Space'&&$('sheet').hidden){e.preventDefault();if(!e.repeat)act()}});addEventListener('keyup',e=>{if(e.code==='Space')release()});
canvas.onpointerdown=e=>{if(phase==='harbor')cast(e.clientX/W);else if(phase==='reel'||phase==='run'){canvas.setPointerCapture(e.pointerId);act()}};canvas.onpointerup=canvas.onpointercancel=release;
$('audio').onclick=()=>{muted=!muted;$('audio').textContent=muted?'♫ ×':'♪';$('audio').setAttribute('aria-label',muted?'Enable sound':'Mute sound');if(!muted)tone(660)};
function sheet(html,kind){currentPage=kind;$('page').innerHTML=html;$('sheet').hidden=false;$('act').disabled=true;$('close').focus()}
function closeSheet(){if(phase==='landed')stage('harbor');$('sheet').hidden=true;currentPage='';updateUI();$('act').focus()}
$('close').onclick=closeSheet;addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('sheet').hidden)closeSheet()});
function specimen(c,f){c.width=300;c.height=160;const g=c.getContext('2d');g.translate(150,80);fishArt(g,f,0,0,1.98)}
function journal(r=data.region){
 const list=roster.filter(f=>f.r===r),known=list.filter(f=>data.seen.includes(f.id)).length;
 sheet('<h2>Field journal</h2><p class="note">'+data.seen.length+' of 100 recorded</p><select aria-label="Fishing region" id="region">'+waters.map((w,i)=>'<option value="'+i+'" '+(i===r?'selected':'')+'>'+w[0]+'</option>').join('')+'</select> <b>'+known+' / '+list.length+'</b><div id="cards"></div><button class="paperAction" id="sail">Fish these waters</button><button class="paperAction" id="quay">Harbor ledger</button>','journal');
 for(const f of list){const card=document.createElement('div');card.className='card';const art=document.createElement('canvas');specimen(art,f);if(!data.seen.includes(f.id))art.style.filter='brightness(.4) saturate(.45)';card.append(art,document.createTextNode(data.seen.includes(f.id)?f.name:f.band));$('cards').append(card)}
 $('region').onchange=e=>journal(+e.target.value);$('sail').onclick=()=>{data.region=r;save();build();closeSheet();tone(520)};$('quay').onclick=ledger;
}
function ledger(){
 const price=25*data.rod;
 sheet('<h2>Harbor ledger</h2><p class="note">'+Math.floor(data.coins)+' shells · Rod level '+data.rod+'</p><p>Exhibit earnings: '+Math.floor(data.bank)+' shells</p><p class="note">'+data.pads.filter(id=>id!==null).map(id=>names[id]).join(' · ')+'</p><button class="paperAction" id="collect">Collect earnings</button>'+(data.bag.length?'<button class="paperAction" id="unload">Unload catch</button>' : '')+'<button class="paperAction" id="upgrade">Tune reel · '+price+'</button><button class="paperAction" id="back">Journal</button>','ledger');
 $('collect').onclick=()=>{const n=Math.floor(data.bank);data.bank-=n;data.coins+=n;save();ledger()};$('upgrade').disabled=data.coins<price;$('upgrade').onclick=()=>{if(data.coins>=price){data.coins-=price;data.rod++;save();chime();ledger()}};$('back').onclick=()=>journal()
}
$('book').onclick=()=>journal();
function land(){
 const f=byId.get(target),fresh=!data.seen.includes(target);if(fresh)data.seen.push(target);const gain=5+f.r*3+f.tier*3+Math.floor(catchLength/12);data.coins+=gain;
 const slot=data.pads.indexOf(null);if(slot>=0)data.pads[slot]=target;else{const weak=data.pads.reduce((best,id,i)=>rates[id]<rates[data.pads[best]]?i:best,0);if(rates[target]>rates[data.pads[weak]]){data.pads[weak]=target;data.levels[weak]=1}}
 save();sdk.end();stage('landed');chime();sheet('<div id="result"><p class="note">'+(fresh?'New field record':'Catch recorded')+'</p><canvas></canvas><h3>'+f.name+'</h3><p class="note">'+catchLength+' cm · '+f.band+' · +'+gain+' shells</p><button class="paperAction" id="again">Back to the water</button></div>','catch');specimen($('result').querySelector('canvas'),f);$('again').onclick=closeSheet;
}
function lose(message){sdk.end();stage('harbor');notify(message);tone(135,.35,'triangle')}
function step(dt){
 t+=dt;if(!$('sheet').hidden)return;age+=dt;data.bank+=data.pads.reduce((n,id,i)=>n+(id===null?0:(rates[id]||0)*(data.levels[i]||1)),0)*dt;saving+=dt;if(saving>15){saving=0;save()}
 if(phase==='cast'&&age>1.25){splash(W*castX,H*.64);tone(195,.13);stage('bite')}
 else if(phase==='bite'&&age>1.10){stage('reel');tone(620,.12)}
 else if(phase==='reel'){
  tension=Math.max(.08,tension+(held?.225+.065*Math.sin(age*2):- .52)*dt);
  progress=Math.max(0,progress+(held?.195+Math.min(data.rod,12)*.008:-.014)*dt);
  if(tension>=1)lose('The line snapped · try a shorter pull');else if(progress>=1){stage('run');tone(155,.4,'triangle')}
 }else if(phase==='run'&&age>=1.85){
  if(lane===riskLane()){hits++;tone(155,.26,'triangle');notify('Close call!')}else tone(680,.14);
  avoided++;age=0;if(hits>=2)lose('The shark took the catch · cast again');else if(avoided===3)land()
 }
 for(const p of rings){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=130*dt}rings=rings.filter(p=>p.life>0);updateUI()
}
function riskLane(){return (avoided+target)%2}
function surface(){
 ctx.drawImage(plate,0,0,W,H);const h=H*.47,bx=W*.32,by=h+(H-h)*.25,k=Math.min(W/340,H/470,1.9);
 for(let i=0;i<28;i++){const x=((i*103+t*(2+i%4))%(W+40))-20,y=h+4+(i*31%(H*.43));path(ctx,null,'M'+x+' '+y+' q7 2 14 0 t14 0','#e0efe044',1.1)}
 for(let i=0;i<4;i++){const x=(W*.77+i*21+t*3)%W,y=h*.68+Math.sin(i)*12;path(ctx,null,'M'+x+' '+y+' q4 -4 8 0 q5 -3 8 -1','#4e6c70',1.3)}
 harborDetail(ctx,W,H,t);cutter(ctx,bx,by,k,t,phase==='cast');
 const fx=W*castX,fy=H*.64;if(phase==='cast'){const u=Math.min(1,age/.72),x=bx+64*k+(fx-bx-64*k)*u,y=by-54*k+(fy-by+54*k)*u-Math.sin(u*Math.PI)*H*.19;path(ctx,null,'M'+(bx+64*k)+' '+(by-54*k)+' Q'+((bx+x)/2)+' '+(y-10)+' '+x+' '+y,'#e4ead2',1);dot(ctx,x,y,4,5,'#e98e5b')}
 if(phase==='harbor'){const x=W*.65,y=H*.65;for(let i=0;i<3;i++){const a=(t*.34+i/3)%1;ctx.strokeStyle='rgba(254,235,175,'+(.65*(1-a))+')';ctx.beginPath();ctx.ellipse(x,y,12+a*28,4+a*9,0,0,Math.PI*2);ctx.stroke()}}
}
function underwater(){
 const p=waters[data.region];ctx.fillStyle=gradient(ctx,0,H,p[5],p[6]);ctx.fillRect(0,0,W,H);
 for(let i=0;i<8;i++){const x=(i+.3)*W/7+Math.sin(t*.22+i)*8;path(ctx,'#e8ffd50c','M'+x+' 0 l'+(-W*.24)+' '+H+' h'+(W*.08)+' L'+(x+10)+' 0Z')}
 for(let i=0;i<38;i++){const x=i*91%W,y=H-((t*(6+i%5)+i*39)%H);dot(ctx,x+Math.sin(t+i)*4,y,1+i%3,1+i%3,'#dcf5da59')}
 for(let i=0;i<35;i++){const x=i*W/34,hh=H*(.06+.11*Math.abs(Math.sin(i*7)));path(ctx,null,'M'+x+' '+H+' q-11 '+(-hh*.45)+' 2 '+(-hh*.68)+' t'+(3*Math.sin(t+i))+' '+(-hh*.36),i%2?'#1c5257':'#2d6965',2+i%4)}
 if(phase==='run'){
  const gap=Math.min(W*.27,140),y=H*.58,route=n=>W/2+(n?gap:-gap),danger=route(riskLane());
  for(let i=0;i<2;i++){ctx.strokeStyle=i===riskLane()?'#ffad85':'#a3dfcd';ctx.globalAlpha=.42;ctx.setLineDash([5,10]);line(ctx,route(i),H*.27,route(i),H*.86,ctx.strokeStyle,2);ctx.setLineDash([]);ctx.globalAlpha=1}
  const z=Math.min(1,age/1.85);dot(ctx,danger,y,22+z*10,9,'#f8b792');fishArt(ctx,roster.find(f=>f.form==='shark'),danger,y+H*.42*(1-z),.8+z*.52,t,-1);
  fishArt(ctx,byId.get(target),W/2+(drift*2-1)*gap,y,Math.min(W/245,1.65),t);return
 }
 const x=W*(.51+Math.sin(t*1.9)*.08),y=H*(.55+Math.cos(t*1.3)*.034-progress*.14);
 for(let i=0;i<4;i++){ctx.globalAlpha=.18;fishArt(ctx,school[(i*3+2)%school.length],((t*(8+i)+i*W*.29)%(W+100))-50,H*(.37+.08*i),.45,t+i);ctx.globalAlpha=1}
 path(ctx,null,'M'+W*.52+' 0 Q'+(W*.48+(held?4:18))+' '+H*.25+' '+x+' '+y,'#e4efd27a',1.5);
 fishArt(ctx,byId.get(target),x,y,Math.min(W/145,H/240,3),t*(held?1.9:1));
}
function frame(now){
 const dt=Math.min(.045,(now-(last||now))/1000);last=now;
 if(!document.hidden){step(dt);drift+=(lane-drift)*(1-Math.exp(-dt*10));if(['bite','run','reel'].includes(phase))underwater();else surface();
 if(phase==='bite'){ctx.fillStyle='rgba(223,243,214,'+Math.max(0,.6-age)+')';ctx.fillRect(0,0,W,H)}
 for(const p of rings)dot(ctx,p.x,p.y,2,3,'#e6f0d8')}
 requestAnimationFrame(frame)
}
build();updateUI();requestAnimationFrame(frame);addEventListener('resize',build);addEventListener('blur',release);addEventListener('pagehide',()=>{store();sdk.end();sdk.stop()});addEventListener('pageshow',e=>{if(e.persisted)location.reload()});

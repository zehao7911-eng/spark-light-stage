import {JOBS,items,create,pull,pump,releasePump,placePatch,step,stars,finish,restore,clamp} from './model.mjs';
const $=s=>document.querySelector(s),cv=$('#game'),ctx=cv.getContext('2d',{alpha:false});
const KEY='patch-and-pals-v1',asset={};let book=Array(9).fill(0),s=create(),settings={sound:true,gentle:false,patch:0},paused=false,ready=false,drag=null,pumping=false,time=0,bounce=0,flash=0,fx=[],floaters=[],last=0,acc=0,drawAt=0,saved=0,activePointer=null;
let actx=null,voices=new Set(),tickSound=0,loaded=0,actionWasPuff=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify({s,book,settings}));}catch{} }
try{const d=JSON.parse(localStorage.getItem(KEY)||'null');if(d&&Array.isArray(d.book)&&d.book.length===9&&d.book.every(n=>Number.isInteger(n)&&n>=0&&n<=3)){book=d.book;s=restore(d.s)||create();settings={sound:d.settings?.sound!==false,gentle:!!d.settings?.gentle,patch:clamp(Number(d.settings?.patch)||0,0,2)};paused=true;}}catch{}
function initSound(){if(!settings.sound)return;try{actx??=new(window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();}catch{}}
function tone(f=440,kind='sine',len=.15,gain=.06,slide=1){if(!settings.sound||!actx||paused||voices.size>16)return;try{const o=actx.createOscillator(),g=actx.createGain(),t=actx.currentTime;o.type=kind;o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(Math.max(35,f*slide),t+len);g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.001,t+len);o.connect(g).connect(actx.destination);o.start();o.stop(t+len+.02);voices.add(o);o.onended=()=>voices.delete(o);}catch{}}
function hush(){for(const v of voices){try{v.stop();}catch{}}voices.clear();}
function chime(){[523,659,784,1047].forEach((f,i)=>setTimeout(()=>tone(f,'sine',.35,.055),i*90));}
function haptic(n=12){try{navigator.vibrate?.(n);}catch{}}
function puff(x,y,n=12,color='#fff3cf',kind='dot'){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=20+Math.random()*70;fx.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-30,t:0,life:.5+Math.random()*.7,r:1+Math.random()*3,color,kind});}if(fx.length>140)fx.splice(0,fx.length-140);}
function float(text,x=180,y=260,color='#fff5ce'){floaters.push({text,x,y,t:0,color});if(floaters.length>5)floaters.shift();}
const job=()=>JOBS[s.job];
function ui(){const j=job(),phase=s.stage==='pluck'?0:s.stage==='puff'?1:2;
 $('#name').textContent=j.name;$('#story').textContent=j.story;$('#jobNumber').textContent=String(s.job+1).padStart(2,'0')+' / 09';
 $('#count').textContent=book.filter(Boolean).length+' / 9';$('#hearts').textContent=s.finished?'♥'.repeat(stars(s))+'♡'.repeat(3-stars(s)):'♥'.repeat(phase)+'♡'.repeat(3-phase);
 [...$('#phases').children].forEach((e,i)=>e.className=s.finished||i<phase?'complete':i===phase?'current':'');
 const conf={pluck:['Pull it out!','Drag a glowing snag away','Grab a glowing snag, then pull.','Pull next snag'],puff:['Make me fluffy!','Hold, then let go in the gold zone','Hold the pump. Release in the gold band.','Hold to puff'],patch:['A patch of love','Drag the fabric onto the outline','Pick up the patch and tuck it onto the tummy.','Place patch'],stitch:['A little magic…','Every stitch brings a smile','Watch the little stitches hug the patch.','Stitching…'],done:['Good as new!','Tap your pal for a little happy dance','One little repair. One very happy friend.',s.job===8?'Another shift':'Next pal →']}[s.stage];
 $('#task').textContent=conf[0];$('#detail').textContent=conf[1];$('#toolHint').textContent=conf[2];$('#action').textContent=conf[3];$('#action').disabled=!ready||s.stage==='stitch';
 $('#assist').disabled=!ready||s.stage==='stitch';$('#assist').textContent=s.finished?'Take a photo':'Helping hand';$('#sound').textContent='Sound · '+(settings.sound?'On':'Off');
 cv.setAttribute('aria-label',`${j.name}. ${conf[0]} ${conf[1]}. ${s.removed.length} of ${j.items.length} snags removed. Stuffing ${Math.round(s.fill*100)} percent.`);
}
function removed(it,dx,dy){if(!pull(s,it.id,dx,dy))return false;initSound();tone(it.type==='spring'?240:590,'triangle',.17,.09,it.type==='spring'?3.2:.5);haptic();puff(it.x,it.y,18,'#f5dba4');bounce=.65;float(it.type==='spring'?'BOING!':it.type==='ribbon'?'Whoooosh!':'POP!',it.x,it.y-18);fx.push({x:it.x,y:it.y,vx:clamp(dx*3,-300,300),vy:clamp(dy*3,-400,300),t:0,life:.85,r:1,color:'#fff',kind:'object',it});if(s.stage==='puff'){chime();float('All clear!',180,205);}ui();save();return true;}
function stopPump(commit){if(!pumping)return;pumping=false;if(commit){const result=releasePump(s);if(result==='perfect'){chime();float('So fluffy!',180,210);puff(180,310,28);bounce=.9;}else if(result==='puff'){tone(170,'triangle',.32,.08,.45);puff(180,310,40);float('A tiny hiccup!',180,220);bounce=1.3;}else if(result==='more'){tone(330,'sine',.1,.04);float('A little more…',180,220);}}ui();save();}
function patch(x,y){if(placePatch(s,x,y)){bounce=.5;tone(720,'triangle',.17,.05,.7);puff(180,325,16,'#e5bd6f');ui();save();return true;}tone(250,'sine',.12,.03);return false;}
function point(e){const r=cv.getBoundingClientRect();const scale=Math.min(r.width/360,r.height/450),ox=r.left+(r.width-360*scale)/2,oy=r.top+(r.height-450*scale)/2;return {x:(e.clientX-ox)/scale,y:(e.clientY-oy)/scale};}
cv.addEventListener('pointerdown',e=>{if(!ready||paused||activePointer!==null)return;e.preventDefault();activePointer=e.pointerId;cv.setPointerCapture(e.pointerId);initSound();const p=point(e);
 if(s.stage==='pluck'){const it=items(s).filter(i=>!s.removed.includes(i.id)).sort((a,b)=>Math.hypot(p.x-a.x,p.y-a.y)-Math.hypot(p.x-b.x,p.y-b.y))[0];if(it&&Math.hypot(p.x-it.x,p.y-it.y)<34){drag={...p,start:p,it,type:'snag'};tone(260,'sine',.05,.025);}}
 else if(s.stage==='puff'){pumping=true;tone(190,'sine',.12,.03);}
 else if(s.stage==='patch'&&Math.hypot(p.x-284,p.y-382)<53){drag={...p,start:p,type:'patch'};}
 else if(s.finished){s.cuddles=clamp(s.cuddles+1,0,10000);bounce=1;puff(p.x,p.y,10,'#dc7f7d','heart');tone([523,659,784,880][s.cuddles%4],'sine',.22,.055);float(['Thank you!','Best friends!','One more hug?','So cosy!'][s.cuddles%4],180,205);haptic(6);save();}
});
cv.addEventListener('pointermove',e=>{if(e.pointerId!==activePointer||paused)return;const p=point(e);if(drag){drag.x=clamp(p.x,-50,410);drag.y=clamp(p.y,-50,500);}});
function release(e,cancel=false){if(e.pointerId!==activePointer)return;if(drag&&!cancel&&!paused){if(drag.type==='snag')removed(drag.it,drag.x-drag.start.x,drag.y-drag.start.y);else patch(drag.x,drag.y);}drag=null;activePointer=null;stopPump(!cancel&&!paused);}
cv.addEventListener('pointerup',e=>release(e));cv.addEventListener('pointercancel',e=>release(e,true));cv.addEventListener('lostpointercapture',e=>release(e,true));
$('#action').addEventListener('pointerdown',e=>{actionWasPuff=s.stage==='puff';if(actionWasPuff&&!paused){e.preventDefault();initSound();pumping=true;$('#action').setPointerCapture(e.pointerId);}});
$('#action').addEventListener('pointerup',()=>stopPump(true));$('#action').addEventListener('pointercancel',()=>stopPump(false));$('#action').addEventListener('lostpointercapture',()=>stopPump(false));
function action(){if(!ready||paused)return;initSound();if(s.stage==='pluck'){const it=items(s).find(i=>!s.removed.includes(i.id));if(it)removed(it,-it.length,-it.length);}else if(s.stage==='patch')patch(180,325);else if(s.finished)next();}
$('#action').onclick=e=>{if(actionWasPuff){actionWasPuff=false;return;}if(s.stage==='puff'){if(e.detail===0){for(let i=0;i<5;i++)pump(s,.1);pumping=true;stopPump(true);}}else action();};
$('#assist').onclick=()=>{if(!ready||paused)return;if(s.finished){photo();return;}float(s.stage==='pluck'?'Grab • pull • POP!':s.stage==='puff'?'Release in gold':'Patch → tummy',180,185);flash=1.5;initSound();tone(700,'sine',.15,.035);};
function next(){if(!s.finished)return;s=create((s.job+1)%9);fx=[];floaters=[];bounce=.7;ui();save();}
function clearInput(){drag=null;activePointer=null;pumping=false;}
function pause(show=true){if(!ready)return;clearInput();paused=true;hush();save();if(show)settingsModal();}
function resume(){if($('#modal').open)$('#modal').close();paused=false;clearInput();last=0;acc=0;initSound();save();ui();}
function show(html){clearInput();paused=true;hush();$('#modalBody').innerHTML=html;const d=$('#modal');if(!d.open)d.showModal();d.scrollTop=0;}
function settingsModal(){show(`<button class="close" id="closeModal" aria-label="Resume">×</button><h2>A little breather</h2><p>Your pal is right where you left them.</p><div class="stack"><button id="resume" class="primary">Back to the workbench</button><button id="gentle" class="setting">Gentle motion · ${settings.gentle?'On':'Off'}</button><button id="audio" class="setting">Sound · ${settings.sound?'On':'Off'}</button><button id="book">Meet your pals · ${book.filter(Boolean).length} / 9</button><button id="cover">The little atelier</button></div><p class="note">Drag to pluck · Hold to puff · Drag to patch<br>Keyboard: Enter / Space · P to pause</p><div class="row"><button id="rose">Rose patch</button><button id="sage">Sage patch</button><button id="honey">Honey patch</button></div>`);
 $('#closeModal').onclick=$('#resume').onclick=resume;$('#gentle').onclick=()=>{settings.gentle=!settings.gentle;save();settingsModal();};$('#audio').onclick=()=>{settings.sound=!settings.sound;hush();save();settingsModal();ui();};$('#book').onclick=shelf;$('#cover').onclick=()=>{show('<button class="close" id="back" aria-label="Back">×</button><h2>Patch & Pals</h2><img class="cover" src="assets/cover.webp" alt="Original illustrated game cover featuring three happy repaired plush friends"><p>A little care. A lot of heart.</p><p class="note">Original promotional illustration. The game uses the same generated atelier and plush designs.</p>');$('#back').onclick=settingsModal;};
 for(const [i,id] of ['rose','sage','honey'].entries())$('#'+id).onclick=()=>{settings.patch=i;save();resume();};
}
$('#pause').onclick=()=>pause();$('#shelf').onclick=()=>{if(ready){save();shelf();}};$('#sound').onclick=()=>{settings.sound=!settings.sound;initSound();if(!settings.sound)hush();ui();save();};
$('#modal').addEventListener('cancel',e=>{e.preventDefault();resume();});
function shelf(){const unlocked=Math.min(8,book.findIndex(v=>v===0)<0?8:book.findIndex(v=>v===0));show(`<button id="back" class="close" aria-label="Back to workshop">×</button><h2>Little lives, big stories</h2><p>${book.filter(Boolean).length} rescued pals · ${book.reduce((a,b)=>a+b,0)} hearts</p><div class="shelfgrid">${JOBS.map(j=>`<div class="pal ${j.id>unlocked?'locked':''}"><canvas class="portrait" width="160" height="156" data-animal="${j.animal}" data-pose="${book[j.id]?2:0}"></canvas><b>${j.name}</b><small>${book[j.id]?'♥'.repeat(book[j.id]):'♡ ♡ ♡'}</small><button data-job="${j.id}" ${j.id>unlocked?'disabled':''}>${book[j.id]?'Visit again':j.id>unlocked?'Soon':'Meet me'}</button></div>`).join('')}</div><p class="note">Each pal keeps their best hearts. Replaying never takes them away. Nine small stories, three original plush designs.</p>`);$('#back').onclick=resume;document.querySelectorAll('[data-job]').forEach(b=>b.onclick=()=>{s=create(Number(b.dataset.job));fx=[];floaters=[];resume();});document.querySelectorAll('.portrait').forEach(c=>{const q=c.getContext('2d');q.imageSmoothingEnabled=false;drawSprite(q,+c.dataset.animal,+c.dataset.pose,80,79,130,130);});}
window.addEventListener('keydown',e=>{if(e.code==='KeyP'||e.code==='Escape'){if($('#modal').open)resume();else pause();return;}if(paused||!ready||e.repeat)return;if(e.code==='Space'||e.code==='Enter'){if(document.activeElement?.tagName==='BUTTON'&&document.activeElement.id!=='action')return;e.preventDefault();if(s.stage==='puff'){initSound();pumping=true;}else action();}});
window.addEventListener('keyup',e=>{if(e.code==='Space'||e.code==='Enter')stopPump(!paused);});
window.addEventListener('blur',()=>{if(ready&&!paused)pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&ready&&!paused)pause();});window.addEventListener('pagehide',()=>{clearInput();save();hush();});
const bounds=[[[69,95,359,353],[60,90,354,357],[41,89,345,357]],[[69,77,329,349],[91,64,358,346],[78,60,340,349]],[[69,42,351,329],[60,33,352,330],[48,33,353,331]]];
function drawSprite(c,a,p,x,y,w,h){if(!asset.pals)return;const b=bounds[a][p],ratio=Math.min(w/(b[2]-b[0]),h/(b[3]-b[1])),dw=(b[2]-b[0])*ratio,dh=(b[3]-b[1])*ratio;c.drawImage(asset.pals,p*418+b[0],a*418+b[1],b[2]-b[0],b[3]-b[1],Math.round(x-dw/2),Math.round(y-dh/2),Math.round(dw),Math.round(dh));}
function text(t,x,y,size=13,color='#fff3d5'){ctx.font=`bold ${size}px Georgia`;ctx.textAlign='center';ctx.fillStyle='#3e302c';ctx.fillText(t,x+1,y+1);ctx.fillStyle=color;ctx.fillText(t,x,y);}
function line(x,y,x2,y2,color,w=2){ctx.strokeStyle=color;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x2,y2);ctx.stroke();}
function dot(x,y,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
function heart(x,y,size,color){ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(size/16,size/16);ctx.fillStyle=color;const pts=[[-8,-4],[-5,-7],[-1,-7],[0,-5],[2,-7],[6,-7],[9,-4],[9,0],[0,9],[-8,0]];ctx.beginPath();pts.forEach(([a,b],i)=>i?ctx.lineTo(a,b):ctx.moveTo(a,b));ctx.closePath();ctx.fill();ctx.restore();}
function patchArt(x,y,scale=1,progress=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);heart(1,2,43,'#473c32');heart(0,0,42,['#d77a77','#78986c','#d4af61'][settings.patch]);ctx.save();ctx.clip(new Path2D('M -23 -11 L -15 -20 L -3 -20 L 0 -15 L 7 -20 L 17 -20 L 24 -10 L 24 2 L 0 26 L -23 2 Z'));for(let a=-24;a<28;a+=5){line(a,-23,a,27,'#fff6cf44',1);line(-25,a,26,a,'#fff6cf33',1);}ctx.restore();dot(-8,-7,4,'#edd2a6');dot(-8,-7,1.5,'#956f44');dot(10,4,3,'#f6dfb8');line(5,-3,10,-7,'#526948',2);for(let i=0;i<Math.floor(18*progress);i++){const a=i/18*Math.PI*2;const x=Math.sin(a)*21,y=-Math.cos(a)*19;line(x,y,x*.83,y*.83,'#fff2c8',2);}ctx.restore();}
function obj(it,x=it.x,y=it.y,stretch=0,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.lineJoin='round';
 if(it.type==='twig'){line(-14,-12,14,15,'#65432c',7);line(-13,-13,13,13,'#c18a4f',3);line(0,0,4,-9,'#735036',4);dot(4,-9,2,'#e0b36a');}
 if(it.type==='burr'){for(let i=0;i<9;i++){const a=i*Math.PI*2/9;line(0,0,Math.cos(a)*17,Math.sin(a)*17,'#6b6538',3);}dot(0,0,11,'#9e874c');for(let i=0;i<5;i++)dot(Math.cos(i*3)*6,Math.sin(i*3)*5,2,'#ceba69');}
 if(it.type==='spring'){ctx.strokeStyle='#493b34';ctx.lineWidth=7;ctx.beginPath();for(let i=0;i<=30;i++){const py=-18+i*(36+stretch*.45)/30,px=Math.sin(i*.84)*8;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();ctx.strokeStyle='#b9c5ba';ctx.lineWidth=3;ctx.stroke();}
 if(it.type==='ribbon'){ctx.strokeStyle='#654148';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(-8,-17);ctx.bezierCurveTo(18,-10,-20,5,8,18+stretch*.4);ctx.stroke();ctx.strokeStyle='#d6938f';ctx.lineWidth=6;ctx.stroke();line(-7,-13,8,15,'#f3c1a4',1);}
 if(it.type==='button'){dot(2,3,16,'#534634');dot(0,0,16,'#dfb758');dot(-2,-3,12,'#f0cb79');for(const [x,y]of[[-4,-4],[4,-4],[-4,4],[4,4]])dot(x,y,2,'#695337');}
 ctx.restore();}
function arrow(x,y,dx,dy){const a=Math.atan2(dy,dx),len=24+Math.sin(time*4)*4;ctx.save();ctx.translate(x,y);ctx.rotate(a);line(0,0,len,0,'#fff6bd',3);line(len,0,len-7,-6,'#fff6bd',3);line(len,0,len-7,6,'#fff6bd',3);ctx.restore();}
function render(){
 ctx.setTransform(2,0,0,2,0,0);ctx.imageSmoothingEnabled=false;ctx.fillStyle='#7c8b66';ctx.fillRect(0,0,360,450);if(asset.atelier)ctx.drawImage(asset.atelier,0,0,360,450);
 if(!ready)return;
 const b=Math.sin(bounce*24)*bounce*(settings.gentle?1:5),fill=s.stage==='pluck'?.18:s.fill,plump=.85+fill*.2;
 ctx.fillStyle='#30372c35';ctx.beginPath();ctx.ellipse(180,381,89*plump,13,0,0,7);ctx.fill();
 ctx.save();ctx.translate(180,285+b);ctx.rotate(settings.gentle?0:Math.sin(bounce*17)*bounce*.035);ctx.scale(plump+(bounce*.018),.98-bounce*.018);
 const pose=s.finished?2:s.stage==='pluck'?0:1;drawSprite(ctx,job().animal,pose,0,0,240,240);ctx.restore();
 if(!s.finished){
 if(s.stage==='pluck'||s.stage==='puff'){ctx.fillStyle='#49332f';ctx.beginPath();ctx.ellipse(180,325,18,8,0,0,7);ctx.fill();line(161,326,199,326,'#f3c7a1',2);for(let i=0;i<5;i++){dot(168+i*6,322+(i%2)*3,4,'#fff0d0');}}
 if(['patch','stitch'].includes(s.stage)){ctx.save();ctx.setLineDash([3,3]);ctx.strokeStyle='#fef1bd';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(180,325,26,24,0,0,7);ctx.stroke();ctx.restore();}
 }else patchArt(180,325+b,.67,1);
 if(s.stage==='pluck'){
 const remaining=items(s).filter(i=>!s.removed.includes(i.id));remaining.forEach(it=>{const grabbed=drag?.it?.id===it.id;ctx.fillStyle='#362f283f';ctx.beginPath();ctx.ellipse(it.x+3,it.y+4,15,8,0,0,7);ctx.fill();const pulse=23+Math.sin(time*4)*2;ctx.strokeStyle=grabbed?'#fff5bd':'#e4c975';ctx.lineWidth=2;ctx.beginPath();ctx.arc(it.x,it.y,pulse,0,7);ctx.stroke();if(grabbed){const dx=drag.x-drag.start.x,dy=drag.y-drag.start.y,d=Math.hypot(dx,dy);line(it.x,it.y,it.x+dx*.55,it.y+dy*.55,'#fff0bb',2);obj(it,it.x+dx*.55,it.y+dy*.55,d);ctx.strokeStyle='#fff9d2';ctx.lineWidth=4;ctx.beginPath();ctx.arc(it.x,it.y,28,-Math.PI/2,-Math.PI/2+Math.min(d/it.length,1)*Math.PI*2);ctx.stroke();tweezers(drag.x,drag.y);}else obj(it);});
 if(!drag&&remaining.length){const it=remaining[0];arrow(it.x-17,it.y-20,-20,-26);if(s.pulls===0||flash>0){dot(it.x+2,it.y+3,5,'#fff9dbaa');}}
 // Small recovery tray; snag counter is tied to actual removed objects.
 ctx.fillStyle='#4e5f4d';ctx.fillRect(281,310,54,51);ctx.strokeStyle='#c4ad74';ctx.lineWidth=2;ctx.strokeRect(282,311,52,49);s.removed.forEach((id,i)=>{ctx.save();ctx.translate(291+i%2*23,324+Math.floor(i/2)*21);ctx.scale(.45,.45);obj(items(s)[id],0,0);ctx.restore();});text(s.removed.length+'/'+job().items.length,308,376,10,'#fff4cb');
 }
 if(s.stage==='puff'){
 // A squeeze-bulb, hose and a visible elastic stuffing gauge.
 ctx.save();ctx.strokeStyle='#6b4731';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(190,326);ctx.bezierCurveTo(230,362,261,312,286,365);ctx.stroke();ctx.strokeStyle='#d7b06c';ctx.lineWidth=3;ctx.stroke();ctx.translate(285,380);ctx.scale(pumping?.88:1,pumping?.9:1);dot(0,0,24,'#493a31');dot(0,-3,22,'#c28157');dot(-6,-9,11,'#e7aa75');line(-5,-18,-1,-9,'#f3c795',2);ctx.restore();
 const gx=59,gy=362,gw=184,gh=17,t=job().target;ctx.fillStyle='#342f2d';ctx.fillRect(gx-2,gy-2,gw+4,gh+4);ctx.fillStyle='#e5dcc0';ctx.fillRect(gx,gy,gw,gh);ctx.fillStyle='#e6b952';ctx.fillRect(gx+gw*(t-.075),gy,gw*.195,gh);ctx.fillStyle='#6b9066';ctx.fillRect(gx,gy+4,gw*s.fill,gh-8);line(gx+gw*s.fill,gy-5,gx+gw*s.fill,gy+gh+5,'#fff8d8',3);text(pumping?'Let go in gold':'Hold to puff',151,349,11);if(pumping&&Math.floor(time*8)%2===0&&fx.length<70)puff(188,325,1,'#fff6d8');
 }
 if(s.stage==='patch'){patchArt(drag?.type==='patch'?drag.x:284,drag?.type==='patch'?drag.y:382,.95);if(!drag)arrow(257,368,-45,-40);}
 if(s.stage==='stitch'){
 patchArt(180,325,.85,s.patchProgress);const a=s.patchProgress*Math.PI*2;const nx=180+Math.sin(a)*24,ny=325-Math.cos(a)*23;line(nx,ny,nx+19,ny-24,'#fff2c9',1);line(nx+19,ny-24,nx+12,ny-11,'#81776e',3);dot(nx,ny,2,'#ffe595');
 }
 if(s.finished){for(let i=0;i<3;i++)heart(143+i*37,166+Math.sin(time*2+i)*2,15,i<stars(s)?'#c85c64':'#b3a68b');if(s.cuddles===0)text('A little tap = a little hug',180,391,10);}
 for(const f of fx){const alpha=Math.min(1,(f.life-f.t)*3);ctx.globalAlpha=alpha;if(f.kind==='object'){obj(f.it,f.x,f.y,0,f.t*8);}else if(f.kind==='heart')heart(f.x,f.y,f.r*3+3,f.color);else{ctx.fillStyle=f.color;ctx.fillRect(Math.round(f.x),Math.round(f.y),f.r*2,f.r*2);}}ctx.globalAlpha=1;
 for(const f of floaters){ctx.globalAlpha=Math.min(1,(1.1-f.t)*3);text(f.text,f.x,f.y-f.t*22,15,f.color);}ctx.globalAlpha=1;
 // Tiny drifting lint and window glints remain behind the interface.
 if(!settings.gentle)for(let i=0;i<6;i++){const x=30+(i*61+Math.sin(time*.4+i)*8)%300,y=80+(i*37-time*3)%80;ctx.fillStyle='#fff3c35c';ctx.fillRect(Math.round(x),Math.round(y),1,1);}
}
function tweezers(x,y){line(x-6,y-35,x-3,y,'#3a4140',5);line(x+7,y-33,x+3,y,'#3a4140',5);line(x-6,y-35,x-3,y,'#c7d4c6',2);line(x+7,y-33,x+3,y,'#e7e9c5',2);}
function photo(){render();try{const a=document.createElement('a');a.download='Patch-and-Pals-'+job().name+'.png';a.href=cv.toDataURL('image/png');a.click();}catch{} }
function loop(ts){requestAnimationFrame(loop);if(!last)last=ts;const dt=Math.min((ts-last)/1000,.1);last=ts;
 if(ready&&!paused){acc+=dt;while(acc>=1/60){const d=1/60;time+=d;bounce=Math.max(0,bounce-d*2);flash=Math.max(0,flash-d);if(pumping&&s.stage==='puff'){pump(s,d);tickSound+=d;if(tickSound>.18){tickSound=0;tone(160+s.fill*400,'sine',.12,.025,1.1);}}if(step(s,d)){finish(s,book);bounce=1.1;puff(180,270,60,'#edd19a','heart');float('A new best friend!',180,205);chime();haptic([12,30,12]);ui();save();}
 for(const f of fx){f.t+=d;f.x+=f.vx*d;f.y+=f.vy*d;f.vx*=.98;f.vy+=f.kind==='heart'?-8*d:50*d;}fx=fx.filter(f=>f.t<f.life);for(const f of floaters)f.t+=d;floaters=floaters.filter(f=>f.t<1.1);acc-=d;}
 saved+=dt;if(saved>.5){saved=0;save();if(pumping)ui();}
 }
 if(ts-drawAt>=(settings.gentle?40:25)){drawAt=ts;render();}
}
async function load(){ready=false;$('#retry').hidden=true;$('#loadText').textContent='Unfolding the quilt';loaded=0;let expired=false;const timer=setTimeout(()=>{expired=true;$('#loadText').textContent='Still unpacking. Check your connection, then try again.';$('#retry').hidden=false;},18000);
 try{await Promise.all(['atelier','pals'].map(name=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>{asset[name]=im;loaded++;$('#loadText').textContent=`Unpacking illustrations · ${loaded} / 2`;resolve();};im.onerror=()=>reject(Error('Illustration unavailable'));im.src=`assets/${name}.webp`;})));clearTimeout(timer);ready=true;$('#load').hidden=true;ui();render();if(paused)settingsModal();}
 catch{clearTimeout(timer);$('#loadText').textContent='The illustrations could not load. Tap Try again.';$('#retry').hidden=false;}
}
$('#retry').onclick=()=>{Object.keys(asset).forEach(k=>delete asset[k]);load();};
ui();load();requestAnimationFrame(loop);

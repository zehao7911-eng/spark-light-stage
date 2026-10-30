(function(){'use strict';
const M=Popstomp,$=s=>document.getElementById(s),key='popstomp-v1';
let raw={};try{raw=JSON.parse(localStorage.getItem(key)||'{}')}catch(_){}
let lastHUD='',rewardBefore=null;
let p=M.profile(raw.profile),s=M.restore(raw.run,p)||M.create(Math.min(p.cleared,11),p),view='intro',paused=true,aim=null,pressed=null,keyHeld=false,last=0,acc=0,saveClock=0,toastLife=0,resultTime=0,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduced)p.gentle=true;
const art=new PopArt($('scene')),overlay=$('overlay');
class Audio{
 constructor(){this.ctx=null;this.voices=new Set();this.beat=0;this.clock=0;}
 unlock(){if(!p.sound)return;try{if(!this.ctx)this.ctx=new(window.AudioContext||window.webkitAudioContext)();if(this.ctx.state!=='running')this.ctx.resume().catch(()=>{});}catch(_){} }
 tone(freq,dur=.15,type='sine',volume=.04,end=null){let c=this.ctx;if(!p.sound||!c||c.state!=='running'||this.voices.size>=18)return;try{let o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,c.currentTime);if(end)o.frequency.exponentialRampToValueAtTime(end,c.currentTime+dur);g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(volume,c.currentTime+.008);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+dur);o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+dur+.01);this.voices.add(o);o.onended=()=>{this.voices.delete(o);o.disconnect();g.disconnect()}}catch(_){} }
 hit(e){if(e.type==='stomp')this.tone(135,.15,'triangle',.1,52);if(e.type==='pop'){let f=[262,330,392,523,659,784][Math.min(5,Math.floor(e.chain/2))];this.tone(f,.1,'sine',.05,f*1.6);if(e.cap)this.tone(1047,.3,'triangle',.035,1318)}if(e.type==='crack')this.tone(1500,.07,'triangle',.035,390);if(e.type==='spark')this.tone(220,.24,'sawtooth',.012,880);if(e.type==='miss')this.tone(90,.16,'sine',.08,55);if(e.type==='refill')this.tone(740,.25,'sine',.04,1480);if(e.type==='win'){[262,330,392,523].forEach((f,i)=>this.tone(f,.5+i*.1,'triangle',.024))}}
 update(dt){this.clock+=dt;if(this.clock>.34){this.clock-=.34;let notes=[131,196,165,196,147,220,175,220];this.tone(notes[this.beat%8],.2,'triangle',.014);if(this.beat%2===1)this.tone(notes[this.beat%8]*2,.07,'sine',.012);this.beat++;}}
 stop(){for(const o of this.voices)try{o.stop()}catch(_){}this.voices.clear();}
}
const audio=new Audio();
function save(){try{localStorage.setItem(key,JSON.stringify({profile:p,run:s.phase==='play'||s.phase==='lost'?s:null}))}catch(_){} }
function clearPress(){pressed=null;aim=null;keyHeld=false;}
function toast(t){$('callout').textContent=t;$('callout').classList.add('on');toastLife=.95;}
function updateHUD(){
 if(s.stamps<2)s.selected='stomp';
 const stamp=[s.level,s.stamps,s.juice,s.selected,s.phase,s.chargeUnlocked,s.sweepUnlocked,M.total(p),p.sound,paused,view].join('|');if(stamp===lastHUD)return;lastHUD=stamp;
 $('act').textContent='ACT '+String(s.level+1).padStart(2,'0');$('name').textContent=M.names[s.level];$('stars').textContent='☆ '+M.total(p);
 $('stamps').textContent='◉ '+s.stamps;$('juice').textContent=s.juice+'/'+s.fruits.length;
 $('mode').querySelector('b').innerHTML=s.selected==='sweep'?'↔ SWEEP':'<svg aria-hidden="true" viewBox="0 0 32 26" style="width:23px;height:19px;vertical-align:middle"><path d="M5 2H16V14Q28 10 29 19Q28 24 16 24H5Q0 21 4 16Z" fill="currentColor" stroke="#292c2a" stroke-width="1.5"/><path d="M4 21H28M9 11H16M9 7H16" fill="none" stroke="#467971" stroke-width="1.5"/></svg> STOMP';
 $('modehint').textContent=s.stamps<2?'ONE STOMP LEFT':s.sweepUnlocked?'TAP TO SWITCH':s.chargeUnlocked?'HOLD TO CHARGE':'TAP THE FRUIT';
 $('sound').setAttribute('aria-label',p.sound?'Mute sound':'Enable sound');$('sound').textContent=p.sound?'♪':'♩';
 $('mode').disabled=paused||s.phase!=='play';$('retry').disabled=view==='intro'||view==='book'||view==='bottle';
 $('hint').textContent=s.sweepUnlocked&&s.selected==='sweep'?'One sweep. Two stomps. A whole row.':s.chargeUnlocked?'Tap to stomp · hold, then release for a big stomp':'Tap a bunch. Make a splash.';
}
function panel(html){overlay.dataset.view=view;overlay.innerHTML='<div class="panel">'+html+'</div>';overlay.hidden=false;clearPress();audio.stop();updateHUD();}
function action(id,fn){$(id)?.addEventListener('click',()=>{audio.unlock();fn()})}
function hide(){overlay.hidden=true;overlay.innerHTML='';view='play';paused=false;last=0;updateHUD();}
function intro(){view='intro';paused=true;panel('<span class="eyebrow">A HAND-INKED LITTLE JOY</span><h2>Put your<br>foot in it.</h2><p>Tap a bunch of fruit.<br>Pop them all. Bottle the fizz.</p><div class="bottle-art">'+bottleSVG(s.level,true)+'</div><button id="start" class="primary full">'+(raw.run?'CONTINUE THE SHOW':'LET’S POP')+'</button><div class="note">No timer. Free retries. Big silly shoes.</div>');action('start',()=>{hide();toast(s.chargeUnlocked?'HOLD • RELEASE • POP!':'TAP THE FRUIT!')});}
function pause(){if(view!=='play')return;clearPress();paused=true;view='pause';save();panel('<span class="eyebrow">INTERMISSION</span><h2>Take a breather.</h2><p>The bubbles can wait.</p><button id="resume" class="primary full">BACK TO THE SHOW</button><button id="gentle" class="toggle">'+(p.gentle?'✓':'○')+' Gentle motion</button><div class="row"><button id="acts">ACTS & BOTTLES</button><button id="again">RETRY</button></div>');action('resume',hide);action('gentle',()=>{p.gentle=!p.gentle;save();$('gentle').textContent=(p.gentle?'✓':'○')+' Gentle motion';draw()});action('acts',book);action('again',()=>begin(s.level));}
function begin(level){if(level>p.cleared||level<0||level>11)return;s=M.create(level,p);art.reset();resultTime=0;rewardBefore=null;hide();save();toast(level===2?'GOLD FRUIT = CHAIN POPS':level===4?'ICE NEEDS TWO HITS':s.chargeUnlocked?'HOLD FOR A BIG STOMP':'TAP A BUNCH!');}
function result(){
 if(s.phase==='won'){
  const before=rewardBefore??p.cleared;M.award(p,s);save();view='result';paused=true;
  let unlock=p.cleared>before&&p.cleared===2?'BIG STOMP unlocked<br>Hold, then release. Two stomps, bigger splash.':p.cleared>before&&p.cleared===5?'SWEEP unlocked<br>Switch the green button. Clear a whole row.':p.cleared>before&&p.cleared===8?'FIZZ RETURN unlocked<br>Every 12 pops returns one stomp.':'';
  panel('<span class="eyebrow">SMALL BATCH '+String(s.level+1).padStart(2,'0')+' · BOTTLED</span><h2>'+M.labels[s.level]+'</h2><div class="rating">'+'★'.repeat(M.rating(s))+'☆'.repeat(3-M.rating(s))+'</div><div class="bottle-art">'+bottleSVG(s.level,true)+'</div><div class="stats"><div><b>'+s.juice+'</b><small>FRUIT POPPED</small></div><div><b>'+s.bestChain+'</b><small>BIGGEST CHAIN</small></div><div><b>'+s.used+'</b><small>STOMPS</small></div></div>'+(unlock?'<div class="unlock">'+unlock+'</div>':'')+'<button id="next" class="primary full">'+(s.level<11?'NEXT ACT →':'THE BOTTLE CABINET')+'</button><div class="row"><button id="shelf">COLLECTION</button><button id="again">REPLAY</button></div><div class="note">'+(s.assisted?'Encore clear · try again for bonus stars.':'Bonus stars: '+s.par+' stomps or fewer · no empty stomps.')+'</div>');
  action('next',()=>s.level<11?begin(s.level+1):book());action('shelf',book);action('again',()=>begin(s.level));
 }else if(s.phase==='lost'){
  view='result';paused=true;save();panel('<span class="eyebrow">A LITTLE INTERMISSION</span><h2>One more splash?</h2><p>'+s.juice+' / '+s.fruits.length+' fruit juiced.<br>Keep this batch with four extra stomps.</p><button id="encore" class="primary full">ENCORE +4 · FREE</button><div class="row"><button id="again">FRESH BATCH</button><button id="shelf">ACTS</button></div><div class="note">Encore clears earn one completion star.</div>');action('encore',()=>{M.encore(s);hide();toast('ENCORE!');save()});action('again',()=>begin(s.level));action('shelf',book);
 }
}
function bottleSVG(i,earned){let col=earned?M.palette[Math.floor(i/3)%4]:'#b4a78e',badge=['✦','✿','☀','◆','❄','↔','✽','✧','◉','☾','♬','★'][i];return '<svg viewBox="0 0 70 120" aria-hidden="true"><path d="M26 10H44V35Q44 41 54 47V103Q54 111 46 111H24Q16 111 16 103V47Q26 41 26 35Z" fill="'+col+'" stroke="#292c2a" stroke-width="3"/><path d="M22 61H48V94H22Z" fill="#f3e6c7" stroke="#292c2a" stroke-width="2"/><text x="35" y="77" text-anchor="middle" font-size="17" fill="'+col+'">'+badge+'</text><text x="35" y="89" text-anchor="middle" font-size="10" font-family="Georgia" font-weight="bold">'+(earned?String(i+1).padStart(2,'0'):'?')+'</text><path d="M28 45L23 49V56M23 100V104" stroke="#fff5d9" stroke-width="3" fill="none"/><path d="M24 8H46V16H24Z" fill="#d8aa60" stroke="#292c2a" stroke-width="2"/></svg>'}
function book(){paused=true;view='book';save();panel('<span class="eyebrow">THE SODA REVUE</span><h2>Acts & bottles.</h2><span class="note">'+p.cleared+' / 12 bottled · '+M.total(p)+' / 36 stars</span><div class="chapters">'+M.names.map((n,i)=>'<button id="act-'+i+'" class="chapter" '+(i>p.cleared?'disabled':'')+'><div style="height:47px">'+bottleSVG(i,p.stars[i]>0).replace('<svg ','<svg style="height:47px;width:100%" ')+'</div><small>'+String(i+1).padStart(2,'0')+' · '+n+'</small><span class="earned">'+(p.stars[i]?'★'.repeat(p.stars[i]):i<=p.cleared?'PLAY':'🔒')+'</span></button>').join('')+'</div><div class="badges"><button id="cherry" aria-label="Cherry costume" aria-pressed="'+(p.colour==='cherry')+'">●</button><button id="lemon" aria-label="Lemon costume, requires 8 stars" '+(M.total(p)<8?'disabled':'')+' aria-pressed="'+(p.colour==='lemon')+'">●</button><button id="velvet" aria-label="Velvet costume, requires 20 stars" '+(M.total(p)<20?'disabled':'')+' aria-pressed="'+(p.colour==='velvet')+'">●</button></div><div class="note">Costumes: 8 stars · 20 stars<br>2 bottles: big stomp · 5: sweep · 8: fizz return</div><button id="back" class="primary full">BACK TO THE SHOW</button>');for(let i=0;i<12;i++)action('act-'+i,()=>p.stars[i]?showBottle(i):begin(i));for(const name of ['cherry','lemon','velvet'])action(name,()=>{p.colour=name;save();book();draw()});action('back',()=>{if(s.phase==='play')hide();else result()});}
function showBottle(i){view='bottle';panel('<span class="eyebrow">BATCH '+String(i+1).padStart(2,'0')+'</span><h2>'+M.labels[i]+'</h2><div class="bottle-art" style="height:180px;width:110px">'+bottleSVG(i,true)+'</div><div class="rating">'+'★'.repeat(p.stars[i])+'</div><p>'+['Cherry bright, with a very silly kick.','Sunshine in a bottle. Best served with a grin.','A peachy little standing ovation.','The velvet finale. Sip slowly.'][Math.floor(i/3)]+'</p><button id="replay" class="primary full">REPLAY ACT '+(i+1)+'</button><button id="cabinet" class="full">BACK TO THE CABINET</button>');action('replay',()=>begin(i));action('cabinet',book);}
function point(e){let r=$('scene').getBoundingClientRect(),scale=Math.min(r.width/420,r.height/600),left=r.left+(r.width-420*scale)/2,top=r.top+(r.height-600*scale)/2;return{x:(e.clientX-left)/scale,y:(e.clientY-top)/scale};}
const canvas=$('scene');
canvas.addEventListener('pointerdown',e=>{if(paused||s.phase!=='play'||pressed)return;e.preventDefault();audio.unlock();const q=point(e);if(q.x<38||q.x>382||q.y<290||q.y>530)return;pressed={id:e.pointerId,start:performance.now()};aim={...q,power:0,mode:s.selected};canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointermove',e=>{if(!pressed||pressed.id!==e.pointerId)return;let q=point(e);aim={x:Math.max(38,Math.min(382,q.x)),y:Math.max(290,Math.min(530,q.y)),power:Math.min(1,(performance.now()-pressed.start)/650),mode:s.selected};});
canvas.addEventListener('pointerup',e=>{if(!pressed||pressed.id!==e.pointerId)return;e.preventDefault();let q=aim,charge=Math.min(1,(performance.now()-pressed.start)/650);clearPress();if(!paused&&q)M.stomp(s,q.x,q.y,charge,s.selected);});
canvas.addEventListener('pointercancel',clearPress);canvas.addEventListener('lostpointercapture',clearPress);
document.addEventListener('keydown',e=>{if(e.code==='Escape'||e.code==='KeyP'){e.preventDefault();if(view==='play')pause();else if(view==='pause')hide();return;}if(paused)return;if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Space','KeyX'].includes(e.code))e.preventDefault();if(e.code==='KeyX'&&!e.repeat&&s.sweepUnlocked){s.selected=s.selected==='sweep'?'stomp':'sweep';updateHUD();}if(e.code.startsWith('Arrow')){aim=aim||{x:128,y:344,power:0,mode:s.selected};aim.x=Math.max(38,Math.min(382,aim.x+(e.code==='ArrowRight'?15:e.code==='ArrowLeft'?-15:0)));aim.y=Math.max(290,Math.min(530,aim.y+(e.code==='ArrowDown'?15:e.code==='ArrowUp'?-15:0)));}if(e.code==='Space'&&!e.repeat){audio.unlock();keyHeld=true;pressed={id:'key',start:performance.now()};aim=aim||{x:128,y:344,power:0,mode:s.selected};}});
document.addEventListener('keyup',e=>{if(e.code==='Space'&&keyHeld){e.preventDefault();let q=aim,power=pressed?Math.min(1,(performance.now()-pressed.start)/650):0;keyHeld=false;pressed=null;if(!paused&&q)M.stomp(s,q.x,q.y,power,s.selected);if(aim)aim.power=0;}});
$('pause').addEventListener('click',()=>{audio.unlock();if(view==='play')pause();else if(view==='pause')hide()});$('book').addEventListener('click',()=>{audio.unlock();book()});$('sound').addEventListener('click',()=>{p.sound=!p.sound;if(p.sound)audio.unlock();else audio.stop();updateHUD();save()});$('mode').addEventListener('click',()=>{audio.unlock();if(s.sweepUnlocked){s.selected=s.selected==='sweep'?'stomp':'sweep';updateHUD()}else toast(s.chargeUnlocked?'HOLD • RELEASE • BIG STOMP':'TAP THE FRUIT BELOW!')});$('retry').addEventListener('click',()=>{audio.unlock();if(view==='play')pause();else begin(s.level)});
function interrupt(){clearPress();if(view==='play')pause();else audio.stop();save()}
window.addEventListener('blur',interrupt);document.addEventListener('visibilitychange',()=>{if(document.hidden)interrupt()});window.addEventListener('pagehide',save);
function resize(){let r=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,p.gentle?1:1.7);let scale=Math.min(r.width/420,r.height/600);canvas.width=Math.max(1,Math.round(420*scale*dpr));canvas.height=Math.max(1,Math.round(600*scale*dpr));draw();}
function draw(){art.draw(s,p,aim,paused)}
let lastDraw=0;
function frame(now){requestAnimationFrame(frame);if(!last){last=now;return;}let dt=Math.min(.05,(now-last)/1000);last=now;
 if(!paused){acc+=dt;while(acc>=1/60){M.update(s,1/60);acc-=1/60;}
  for(const e of s.events.splice(0)){art.consume(e);audio.hit(e);if(e.type==='spark')toast('FIZZ CHAIN!');if(e.type==='refill')toast('+1 STOMP!');if(e.type==='win'){rewardBefore=p.cleared;M.award(p,s);save();resultTime=.9;toast('BOTTLED!')}if(e.type==='lost')resultTime=.45;}
  art.update(dt);audio.update(dt);
  if(pressed&&aim)aim.power=Math.min(1,(now-pressed.start)/650);
  if(toastLife>0){toastLife-=dt;if(toastLife<=0)$('callout').classList.remove('on');}
  if(s.phase!=='play'){resultTime-=dt;if(resultTime<=0){clearPress();result();}}
  saveClock+=dt;if(saveClock>.5){saveClock=0;save();}updateHUD();
  if(now-lastDraw>(p.gentle?33:22)){draw();lastDraw=now;}
 }
}
window.addEventListener('resize',()=>{clearPress();if(view==='play')pause();resize()});
intro();resize();requestAnimationFrame(frame);
})();

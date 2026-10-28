(function () {
  'use strict';
  const $=id=>document.getElementById(id), {Game,FAMILIES:F,REQUESTS,profile:blank,cleanProfile,award,nameOf}=OddCore;
  const KEY='oddling-parade-v1', labels=['HEAD','COAT','FEET'];
  let p=blank(),g=new Game(),restored=false,paused=false,dirty=true,parading=false,ctx,master,noise,voices=0;
  let last=performance.now(),acc=0,renderAt=0,saveT=0,toastT=0,screen='',stamp=0,drag=null,ownedPage=0,tab='requests',lastUi='',lastAward=null;
  const thumbs=new Map();
  try{const s=JSON.parse(localStorage.getItem(KEY));if(s){p=cleanProfile(s.profile);const old=Game.restore(s.game);if(old){g=old;restored=true;paused=true;}}}catch{}
  const v=new OddView($('world'));
  function thumb(parts){const k=parts.join('');if(!thumbs.has(k))thumbs.set(k,OddArt.preview(parts,145));return thumbs.get(k);}
  function save(){try{localStorage.setItem(KEY,JSON.stringify({profile:p,game:g.snapshot()}));}catch{}}
  function audio(){
    try{
      if(!ctx){ctx=new(window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.connect(ctx.destination);noise=ctx.createBuffer(1,ctx.sampleRate*.12,ctx.sampleRate);const a=noise.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*Math.exp(-i/a.length*8);}
      if(ctx.state==='suspended'&&!paused)ctx.resume();master.gain.setValueAtTime(p.muted||paused?0:.24,ctx.currentTime);
    }catch{}
  }
  function tone(f,len=.16,vol=.18,type='sine',bend=.75,delay=0){
    if(!ctx||paused||p.muted||voices>=14)return;
    const o=ctx.createOscillator(),a=ctx.createGain(),t=ctx.currentTime+delay;o.type=type;o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*bend,t+len);a.gain.setValueAtTime(vol,t);a.gain.exponentialRampToValueAtTime(.001,t+len);o.connect(a);a.connect(master);o.start(t);o.stop(t+len+.01);voices++;o.onended=()=>{voices--;o.disconnect();a.disconnect();};
  }
  function tapSound(row,perfect){
    if(!ctx||paused||p.muted||voices>=14)return;
    const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=noise;f.type='lowpass';f.frequency.value=650+row*170;a.gain.value=.9;s.connect(f);f.connect(a);a.connect(master);s.start();voices++;s.onended=()=>{voices--;s.disconnect();f.disconnect();a.disconnect();};tone([330,415,494][row],.18,.22,'triangle',perfect?1.5:.82);
  }
  function toast(s){$('toast').textContent=s;$('toast').classList.add('show');toastT=.85;}
  function release(){g.slow=false;g.dragging=false;drag=null;document.body.classList.remove('slow');}
  function modal(title,eyebrow='ODDLING PARADE'){
    release();paused=true;screen=title;document.body.classList.add('paused');$('hud').inert=$('footer').inert=$('world').inert=true;
    $('modal').hidden=false;$('mtitle').textContent=title;$('eyebrow').textContent=eyebrow;$('modalBody').replaceChildren();
    if(ctx){master.gain.setValueAtTime(0,ctx.currentTime);if(ctx.state==='running')ctx.suspend();}save();dirty=true;
  }
  function button(parent,label,fn,cls=''){
    const b=document.createElement('button');b.textContent=label;b.className=cls;b.onclick=()=>{audio();fn();};parent.append(b);return b;
  }
  function resume(){paused=false;screen='';$('modal').hidden=true;document.body.classList.remove('paused');$('hud').inert=$('footer').inert=$('world').inert=false;last=performance.now();acc=0;audio();dirty=true;save();}
  function menu(){
    modal(restored?'The troupe missed you.':'A little intermission.');
    const b=$('modalBody');b.innerHTML='<p class="intro">Pin a head, a coat, and tiny feet. Match the pictured guest — or make a happy accident.</p>';
    const d=document.createElement('div');d.className='menuButtons';b.append(d);
    button(d,restored?'Continue stitching':'Back to the ribbons',()=>{restored=false;resume();});
    button(d,'Field guide',()=>guide());button(d,'How to play',help);
    button(d,p.motion?'Puppet motion: On':'Puppet motion: Gentle',()=>{p.motion=!p.motion;menu();});
    button(d,'Restart this request',()=>load(g.job));
    const f=document.createElement('p');f.className='fine';f.textContent='Every oddling is kept. Best request stars stay between visits.';b.append(f);
  }
  function help(){
    modal('Three pins. One friend.','A LITTLE MAKING MAGIC');
    $('modalBody').innerHTML='<ol class="helpSteps"><li>Look at the guest pictured above the ribbons.</li><li>Drag the bright ribbon to choose a part; release to pin it. Or tap PIN as a part crosses the centre. Head, coat, then feet.</li><li>Your oddling comes alive. Exact matches earn three stars; every remix joins your field guide.</li></ol><p class="fine">Hold the little tortoise to slow the ribbons. UNDO unpins the last part before the third pin. There is no time limit. Left / right choose · Space pins · S slows · Z unpins · Esc pauses.</p>';
    const d=document.createElement('div');d.className='menuButtons';$('modalBody').append(d);button(d,'Let’s make one',resume);
  }
  function load(job){
    parading=false;g=new Game(job);lastAward=null;v.fxEvent({type:'request'});lastUi='';release();resume();update();
    $('toast').classList.remove('show');toastT=0;
    if(job===3)toast('Luna has joined the ribbons!');if(job===6)toast('Bramble has joined the ribbons!');
  }
  function guide(which=tab){
    tab=which;modal('The field guide.','YOUR VERY OWN TROUPE');
    const body=$('modalBody'),tabs=document.createElement('div');tabs.className='tabs';body.append(tabs);
    button(tabs,'REQUESTS',()=>guide('requests'),tab==='requests'?'selected':'');button(tabs,'ODDLINGS · '+Object.keys(p.specimens).length,()=>guide('owned'),tab==='owned'?'selected':'');
    if(tab==='requests'){
      const d=document.createElement('div');d.className='requests';body.append(d);
      REQUESTS.forEach((r,i)=>{
        const b=button(d,'',()=>load(i),'request');b.disabled=i>p.unlocked;
        const img=document.createElement('img');img.src=thumb(r.parts);img.alt='';b.append(img);
        const title=document.createElement('span');title.textContent=String(i+1).padStart(2,'0')+' · '+r.name;b.append(title);
        const small=document.createElement('small');small.textContent=i>p.unlocked?'A future guest':p.stars[i]?'★'.repeat(p.stars[i])+'☆'.repeat(3-p.stars[i]):'Ready to stitch';b.append(small);
      });
      if(p.unlocked===12){const d=document.createElement('div');d.className='menuButtons';body.append(d);button(d,'Watch my parade',showParade);button(d,'Freestyle · all five families',()=>load(12));}
    }else{
      const keys=Object.keys(p.specimens);ownedPage=Math.min(ownedPage,Math.max(0,Math.ceil(keys.length/9)-1));
      if(!keys.length){const d=document.createElement('div');d.className='empty';d.textContent='Your first little oddity is three pins away.';body.append(d);}
      const d=document.createElement('div');d.className='specimens';body.append(d);
      keys.slice(ownedPage*9,ownedPage*9+9).forEach(k=>{
        const parts=k.split('').map(Number),b=button(d,'',()=>specimen(parts),'specimen'),img=document.createElement('img');img.src=thumb(parts);img.alt='';b.append(img);const s=document.createElement('span');s.textContent=nameOf(parts);b.append(s);
      });
      if(keys.length>9){const pg=document.createElement('div');pg.className='pager';body.append(pg);const a=button(pg,'←',()=>{ownedPage--;guide('owned');});a.disabled=ownedPage===0;const s=document.createElement('span');s.textContent=(ownedPage+1)+' / '+Math.ceil(keys.length/9);pg.append(s);const b=button(pg,'→',()=>{ownedPage++;guide('owned');});b.disabled=(ownedPage+1)*9>=keys.length;}
      const info=document.createElement('p');info.className='fine';info.textContent=keys.length+' / 125 possible combinations. Cinder, Morel, Puddle, Luna, and Bramble parts can all be mixed.';body.append(info);
    }
  }
  function showParade(){if(p.unlocked<12)return;parading=true;lastUi='';v.fx=[];v.burst(v.w/2,v.h*.4,'#e7bb7e',60);resume();update();}
  function specimen(parts){
    modal(nameOf(parts),'A MEMBER OF YOUR TROUPE');
    const b=$('modalBody'),img=document.createElement('img');img.src=thumb(parts);img.className='bigSpecimen';img.alt='Your '+nameOf(parts)+' oddling';b.append(img);
    const s=document.createElement('p');s.className='fine';s.style.textAlign='center';s.textContent=F[parts[0]].name+' head · '+F[parts[1]].name+' coat · '+F[parts[2]].name+' feet';b.append(s);
    const d=document.createElement('div');d.className='menuButtons';b.append(d);button(d,'Back to my oddlings',()=>guide('owned'));button(d,'Back to the ribbons',resume);
  }
  function pin(){if(paused||g.phase!=='play')return;audio();if(g.pin()){stamp++;save();update();}}
  function update(){
    const centre=g.phase==='play'?g.nearest().family:-1;
    const key=[g.job,g.phase,g.active,g.chosen.join(''),centre,p.muted,parading,lastAward?.fresh].join('|');if(key===lastUi)return;lastUi=key;
    $('chapter').textContent=parading?'THE PARADE · '+Object.keys(p.specimens).length+' ODDLINGS':g.job===12?'FREESTYLE · 125 POSSIBILITIES':'REQUEST '+String(g.job+1).padStart(2,'0')+' / 12';
    $('sound').setAttribute('aria-pressed',String(p.muted));$('sound').setAttribute('aria-label',p.muted?'Unmute sound':'Mute sound');
    $('playControls').hidden=parading||g.phase==='result';$('resultControls').hidden=parading||g.phase!=='result';$('paradeControls').hidden=!parading;
    const active=Math.min(2,g.active);$('pinLabel').textContent=g.phase==='sew'?'STITCHING…':'PIN '+labels[active];$('pinFine').textContent=(active+1)+' / 3';$('pin').disabled=g.phase!=='play';$('undo').disabled=g.phase!=='play'||!g.active;$('slow').disabled=g.phase!=='play';
    $('hint').textContent=g.phase==='sew'?'A little oddity is coming to life.':g.job===0&&!g.started?'Drag a ribbon, or tap PIN. Make a friend.':g.target?'Drag to choose · Match '+F[g.target[active]].name:'Drag a ribbon. Mix a new friend.';
    const summary=parading?'Your collected oddlings take the festival stage.':g.phase==='play'?'Pin '+labels[active].toLowerCase()+'. Requested '+(g.target?F[g.target[active]].name:'any family')+'. '+g.active+' of three parts pinned.':g.phase==='result'?g.result.name+'. '+g.result.matches+' of three requested parts matched.':'Stitching your oddling.';
    if($('assist').textContent!==summary)$('assist').textContent=summary;
    $('world').setAttribute('aria-label',parading?'Your collected oddlings walk across the festival stage. Tap for an encore.':g.phase==='play'?'Moving '+labels[active].toLowerCase()+' ribbon. Centre: '+F[centre].name+'. Requested: '+(g.target?F[g.target[active]].name:'any family')+'. Drag to choose or pin the matching part.':g.phase==='result'?g.result.name+'. Tap your oddling to see its trick.':'The three parts are being stitched together.');
    if(g.phase==='result'){
      const r=g.result;$('rname').textContent=r.name;
      $('reward').innerHTML=(g.target?'<span class="stars">'+'★'.repeat(r.stars)+'☆'.repeat(3-r.stars)+'</span> · '+r.matches+'/3 request parts · ':'')+r.score+' points'+(lastAward?.fresh?' · NEW ODDLING!':' · In your field guide');
      $('next').textContent=g.job===11?'TAKE A BOW →':g.job===12?'MAKE ANOTHER →':'NEXT GUEST →';
    }
    dirty=true;
  }
  $('pin').onclick=pin;$('undo').onclick=()=>{release();if(!paused&&g.undo()){audio();tone(220,.12);save();update();}};
  const slow=$('slow');slow.addEventListener('pointerdown',e=>{if(paused||g.phase!=='play')return;slow.setPointerCapture(e.pointerId);g.slow=true;document.body.classList.add('slow');audio();});
  for(const ev of ['pointerup','pointercancel','lostpointercapture'])slow.addEventListener(ev,release);
  $('world').addEventListener('pointerdown',e=>{
    if(paused)return;const r=$('world').getBoundingClientRect();if(parading){audio();v.burst(e.clientX-r.left,e.clientY-r.top,'#e6bc80',24);tone(392,.25,.18,'triangle',1.5);dirty=true;}else if(g.phase==='result'){audio();v.pet(g.chosen);tone(170+g.chosen[0]*45,.22,.18,'triangle',1.7);dirty=true;}else if(g.phase==='play'&&Math.abs(e.clientY-r.top-v.rows[g.active])<=v.lane*.46){
      audio();drag={id:e.pointerId,x:e.clientX,y:e.clientY,last:e.clientX,moved:false};g.dragging=true;$('world').setPointerCapture(e.pointerId);
    }
  });
  $('world').addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.last;drag.last=e.clientX;if(Math.abs(e.clientX-drag.x)>6)drag.moved=true;g.nudge(dx/v.cell);update();dirty=true;});
  $('world').addEventListener('pointerup',e=>{if(!drag||drag.id!==e.pointerId)return;const cancelled=Math.abs(e.clientY-drag.y)>45&&!drag.moved;g.nudge((e.clientX-drag.last)/v.cell);g.dragging=false;drag=null;if(!cancelled)pin();else save();});
  for(const ev of ['pointercancel','lostpointercapture'])$('world').addEventListener(ev,()=>{if(drag){g.dragging=false;drag=null;save();}});
  $('next').onclick=()=>{audio();tone(523,.12);g.job===11?showParade():load(Math.min(12,g.job+1));};$('retry').onclick=()=>load(g.job);
  $('freeplay').onclick=()=>load(12);$('paradeBook').onclick=()=>guide('owned');
  $('book').onclick=()=>guide();$('pause').onclick=menu;$('close').onclick=()=>{restored=false;resume();};
  $('sound').onclick=()=>{p.muted=!p.muted;audio();save();update();};
  window.addEventListener('keydown',e=>{
    if([' ','Escape','s','S','z','Z','ArrowLeft','ArrowRight'].includes(e.key))e.preventDefault();
    if(e.key==='Escape'){paused?resume():menu();return;}if(paused)return;
    if(e.key===' '&&!e.repeat)pin();
    if(['ArrowLeft','ArrowRight'].includes(e.key)&&!e.repeat&&g.phase==='play'){audio();g.nudge(e.key==='ArrowRight'?1:-1);tone(180,.07,.06);save();update();dirty=true;}
    if(e.key.toLowerCase()==='s'&&g.phase==='play'){g.slow=true;document.body.classList.add('slow');}
    if(e.key.toLowerCase()==='z'&&!e.repeat)$('undo').click();
  });
  window.addEventListener('keyup',e=>{if(e.key.toLowerCase()==='s')release();});
  window.addEventListener('blur',()=>{release();if(!paused)menu();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){release();if(!paused)menu();save();}});
  window.addEventListener('pagehide',save);
  window.addEventListener('resize',()=>{release();v.resize();last=performance.now();acc=0;dirty=true;});
  new ResizeObserver(()=>{const r=$('world').getBoundingClientRect();if(Math.abs(r.width-v.w)>.5||Math.abs(r.height-v.h)>.5){v.resize();dirty=true;}}).observe($('scene'));
  function events(){
    for(const e of g.events.splice(0)){
      v.fxEvent(e);
      if(e.type==='pin'){tapSound(e.row,e.perfect);toast((e.perfect?'Perfect pin!':'Pinned!')+(e.match?' ✦':''));if(navigator.vibrate)navigator.vibrate(9);}
      if(e.type==='sew'){[440,554,659].forEach((n,i)=>tone(n,.24,.09,'sine',1.05,i*.10));}
      if(e.type==='hatch'){
        lastAward=award(p,g);save();
        [262,330,392,523,659].forEach((n,i)=>tone(n,.5,.12,'triangle',1,i*.085));
        toastT=0;$('toast').classList.remove('show');$('toast').textContent='';if(navigator.vibrate)navigator.vibrate([15,30,15]);lastUi='';update();
      }
    }
  }
  function loop(now){
    requestAnimationFrame(loop);const dt=Math.min(.08,(now-last)/1000);last=now;
    if(!paused){acc+=dt;while(acc>=1/60){g.step(1/60);acc-=1/60;events();}toastT-=dt;if(toastT<=0){$('toast').classList.remove('show');$('toast').textContent='';}saveT+=dt;if(saveT>1){saveT=0;save();}update();}
    if(dirty||(!paused&&now-renderAt>=25)){const dt=paused?0:Math.min(.06,(now-renderAt)/1000);if(parading)v.drawParade(Object.keys(p.specimens).map(k=>k.split('').map(Number)),dt,p.motion);else v.draw(g,dt,p.motion);renderAt=now;dirty=false;}
  }
  if(g.phase==='result'){award(p,g);save();}
  if(restored)menu();update();requestAnimationFrame(loop);
})();

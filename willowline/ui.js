(()=>{
'use strict';
const $=id=>document.getElementById(id),cache={};
const rects={
  "angler": [
    [
      112,
      32,
      149,
      290
    ],
    [
      493,
      32,
      158,
      290
    ],
    [
      869,
      33,
      170,
      289
    ],
    [
      1262,
      32,
      155,
      290
    ],
    [
      13,
      370,
      354,
      313
    ],
    [
      386,
      363,
      346,
      320
    ],
    [
      826,
      379,
      326,
      304
    ],
    [
      1152,
      342,
      372,
      341
    ],
    [
      129,
      683,
      224,
      312
    ],
    [
      512,
      683,
      205,
      312
    ],
    [
      871,
      683,
      216,
      312
    ],
    [
      1275,
      683,
      212,
      312
    ]
  ],
  "fish": [
    [
      46,
      155,
      285,
      106
    ],
    [
      393,
      88,
      351,
      200
    ],
    [
      795,
      103,
      326,
      183
    ],
    [
      1162,
      67,
      353,
      267
    ],
    [
      27,
      429,
      346,
      167
    ],
    [
      419,
      411,
      349,
      207
    ],
    [
      768,
      446,
      384,
      149
    ],
    [
      1152,
      379,
      365,
      278
    ],
    [
      16,
      774,
      361,
      139
    ],
    [
      399,
      727,
      369,
      217
    ],
    [
      768,
      749,
      384,
      191
    ],
    [
      1152,
      769,
      371,
      160
    ]
  ],
  "props": [
    [
      13,
      210,
      371,
      158
    ],
    [
      420,
      156,
      320,
      244
    ],
    [
      804,
      156,
      320,
      244
    ],
    [
      1188,
      156,
      320,
      244
    ],
    [
      0,
      528,
      346,
      472
    ],
    [
      497,
      512,
      271,
      488
    ],
    [
      875,
      584,
      277,
      341
    ],
    [
      1152,
      729,
      374,
      180
    ]
  ]
};
let state=null,drawer='',sound=null,master=null,water=null,lastEvent=0,reelTick=0;
function html(id,value){if(cache[id]!==value){cache[id]=value;$(id).innerHTML=value}}
function fishHTML(id,w,h){const r=rects.fish[id],s=Math.min(w/r[2],h/r[3]),rw=r[2]*s,rh=r[3]*s;return `<div class="fish-sprite" style="width:${rw}px;height:${rh}px;background-size:${1536*s}px ${1024*s}px;background-position:${-r[0]*s}px ${-r[1]*s}px"></div>`}
function initAudio(){if(sound){if(sound.state==='suspended')sound.resume();return}sound=new(window.AudioContext||window.webkitAudioContext)();master=sound.createGain();master.gain.value=state?.muted?0:.55;master.connect(sound.destination);water=sound.createGain();water.gain.value=.027;water.connect(master);const buffer=sound.createBuffer(1,sound.sampleRate*4,sound.sampleRate),samples=buffer.getChannelData(0);let v=0;for(let i=0;i<samples.length;i++){v=.975*v+.025*(Math.random()*2-1);samples[i]=v*6}const src=sound.createBufferSource(),filter=sound.createBiquadFilter();src.buffer=buffer;src.loop=true;filter.type='lowpass';filter.frequency.value=850;src.connect(filter);filter.connect(water);src.start();setInterval(()=>{if(!state||state.paused||state.mode==='title'||state.muted||document.hidden)return;tone([196,220,261.63,293.66,329.63][Math.floor(Math.random()*5)],.016,2,'sine');},6500)}
function tone(freq,gain=.07,duration=.3,type='sine',delay=0,endFreq=0){if(!sound)return;const o=sound.createOscillator(),g=sound.createGain(),t=sound.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,t);if(endFreq)o.frequency.exponentialRampToValueAtTime(endFreq,t+duration);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(gain,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(master);o.start(t);o.stop(t+duration+.03)}
function noise(duration=.25,gain=.1){if(!sound)return;const n=sound.createBuffer(1,Math.ceil(sound.sampleRate*duration),sound.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);const s=sound.createBufferSource(),g=sound.createGain(),f=sound.createBiquadFilter();s.buffer=n;f.type='lowpass';f.frequency.value=1200;g.gain.value=gain;s.connect(f);f.connect(g);g.connect(master);s.start()}
function play(kind){if(!sound||state?.muted)return;switch(kind){case'cast':noise(.3,.025);tone(260,.022,.32,'sine',0,520);break;case'splash':noise(.4,.1);break;case'bite':tone(880,.06,.25);tone(1174.66,.045,.35,'sine',.12);break;case'hook':noise(.14,.06);tone(440,.06,.18,'triangle',0,660);break;case'land':noise(.5,.12);break;case'catch':case'rare':[523.25,659.25,783.99,...(kind==='rare'?[1046.5,1318.51]:[])].forEach((f,i)=>tone(f,.065,.9,'sine',i*.11));break;case'buy':tone(523,.05,.25);tone(783,.04,.5,'sine',.08);break;case'pet':tone(210,.025,.17,'triangle',0,280);break;case'slip':tone(370,.045,.5,'sine',0,170);break}}
function act(a){if(!window.wAction)return;try{initAudio()}catch(err){}window.wAction(a)}
function closeDrawer(){drawer='';$('drawer').style.display='none';act('pause:0')}
function openDrawer(which){if(!state||!['idle','sanctuary'].includes(state.mode))return;drawer=which;act('pause:1');$('drawer').style.display='grid';renderDrawer()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b||b.disabled)return;const a=b.dataset.action;if(a==='sanctuary'){closeDrawer();act(a)}else if(a.startsWith('site:')){closeDrawer();act(a)}else act(a)});
$('begin').onclick=()=>{if(!state){location.reload();return}act('begin')};$('gear').onclick=()=>openDrawer('gear');$('book').onclick=()=>openDrawer('book');$('waters').onclick=()=>openDrawer('waters');$('close-drawer').onclick=closeDrawer;
const primary=$('primary');primary.addEventListener('contextmenu',e=>e.preventDefault());primary.addEventListener('pointerdown',e=>{if(primary.disabled)return;e.preventDefault();primary.setPointerCapture(e.pointerId);if(state?.mode==='reel')act('hold:1');else if(state?.mode==='sanctuary')act('sanctuary');else act('primary')});function release(){if(state?.mode==='reel')act('hold:0')}primary.addEventListener('pointerup',release);primary.addEventListener('pointercancel',release);primary.addEventListener('lostpointercapture',release);primary.addEventListener('click',e=>{if(e.detail===0){if(state?.mode==='sanctuary')act('sanctuary');else act('primary')}});document.addEventListener('visibilitychange',()=>{if(!state||state.mode==='title')return;if(document.hidden){window.wAction?.('pause:1');sound?.suspend()}else if(!drawer){$('resume').style.display='block'}});$('resume').onclick=()=>{$('resume').style.display='none';act('pause:0')};
function renderDrawer(){if(!state||!drawer)return;const s=state;if(drawer==='gear'){$('drawer-title').textContent='The tackle box';html('drawer-body',`<div class="upgrade"><div><strong>Willow rod · ${s.rod}/3</strong><small>Less tension. Reaches the legendary fish.<br>Legends need rod 1 / 2 / 3 by water.</small></div><button data-action="rod" ${s.rod===3||s.coins<s.rodCost?'disabled':''}>${s.rod===3?'Mastered':s.rodCost+' ◈'}</button></div><div class="upgrade"><div><strong>Silk reel · ${s.reel}/3</strong><small>Brings fish closer with every turn.<br>Each level reels 18% faster.</small></div><button data-action="reel" ${s.reel===3||s.coins<s.reelCost?'disabled':''}>${s.reel===3?'Mastered':s.reelCost+' ◈'}</button></div><p class="notice-empty">New discoveries earn 15 shells. Catch 3 fish for 30 extra, then earn 40 every 5 catches. Bait is always free.</p><div class="settings"><button data-action="sound">Sound · ${s.muted?'Off':'On'}</button><button data-action="motion">Gentle motion · ${s.reduced?'On':'Off'}</button></div>`)}else if(drawer==='waters'){$('drawer-title').textContent='A change of scenery';html('drawer-body',s.sites.map((n,i)=>{const cost=i===1?90:180,can=s.unlocked[i]||(s.coins>=cost&&s.rod>=i);return `<button class="water-card" data-action="site:${i}" style="background-image:url('${['lake','fen','coast'][i]}.png')" ${!can?'disabled':''}><b>${n}</b><small>${s.unlocked[i]?(s.site===i?'YOUR QUIET CORNER':'Travel here'):`${cost} shells · Rod ${i}`} · ${s.local[i]} catches</small></button>`}).join(''))}else{$('drawer-title').textContent='Your water stories · '+s.unique+'/12';html('drawer-body',`<button class="sanctuary-btn" data-action="sanctuary">${s.mode==='sanctuary'?'Back to the lake':'Visit your sanctuary'}</button><div class="journal-grid">${s.names.map((n,i)=>`<div class="journal-fish ${s.journal[i]?'':'unknown'}">${fishHTML(i,100,52)}<b>${s.journal[i]?n:'Undiscovered'}</b><small>${s.journal[i]?`${s.journal[i]} caught · Best ${Number(s.best[i]).toFixed(2)} kg${s.kept[i]?'<br>♡ In your sanctuary':''}`:`${s.sites[Math.floor(i/4)]}${i%4===3?'<br>Legend · Rod '+(Math.floor(i/4)+1):''}`}</small></div>`).join('')}</div><p class="tiny">Discover the three local fish. With a suitable rod, every fifth local catch brings a legendary encounter.</p>`)}}
window.wState=s=>{state=s;document.body.dataset.state=JSON.stringify(s);document.body.classList.toggle('no-motion',s.reduced);$('welcome').style.display=s.mode==='title'?'grid':'none';$('begin').disabled=false;$('begin').textContent=s.pending.id!==undefined?'Return to your catch':'Take a little time';$('load-note').textContent='Touch or mouse · Space to cast / hook / reel';$('coins').textContent='◈ '+s.coins;$('site-name').textContent=s.mode==='sanctuary'?'YOUR LITTLE SANCTUARY':s.sites[s.site].toUpperCase();$('goal').textContent=s.mode==='sanctuary'?'A place to keep your favorites.':`${s.unique}/12 discoveries · ${s.caught} catches${s.rod>=s.site+1?' · Legend in '+(5-s.local[s.site]%5)+' local catches':''}`;$('w-status').textContent=s.mode==='reel'?(s.surging?'IT IS PULLING · RELEASE TO EASE THE LINE':'CALM WATER · HOLD TO REEL'):s.mode==='sanctuary'?'Your favorites, at their own pace.':s.notice;$('fight').style.display=s.mode==='reel'?'block':'none';$('tension').style.width=(s.tension*100)+'%';$('tension').style.background=s.tension>.76?'#ef9879':'#b4d2bf';$('distance').style.width=(s.progress*100)+'%';$('pull-label').textContent='LINE TENSION '+Math.round(s.tension*100)+'%';$('distance-label').textContent=Math.round(s.progress*100)+'% CLOSER';const isBusy=!['idle','sanctuary'].includes(s.mode);for(const id of ['gear','waters'])$(id).disabled=s.mode!=='idle';$('book').disabled=isBusy;for(const [i,b] of [...document.querySelectorAll('.baits button')].entries()){b.disabled=s.mode!=='idle';b.classList.toggle('selected',i===s.bait)}primary.disabled=!['idle','bite','reel','sanctuary'].includes(s.mode)||s.paused;primary.className=s.mode==='bite'?'bite':s.mode==='reel'?(s.surging?'warning':'pull'):'';let title='CAST',hint='Let the day drift.';if(s.mode==='bite'){title='HOOK!';hint='A visitor below.'}else if(s.mode==='reel'){title=s.holding?'REELING…':'HOLD TO REEL';hint=s.surging?'Let go. Give it a little room.':'Bring it a little closer.'}else if(['wait','cast'].includes(s.mode)){title='LISTEN…';hint='Watch the little float.'}else if(s.mode==='travel'){title='DRIFTING…';hint='Your next quiet corner.'}else if(s.mode==='sanctuary'){title='BACK TO LAKE';hint='They will be here.'}else if(s.mode==='land'){title='A LITTLE WONDER';hint='Here it comes.'}primary.querySelector('b').textContent=title;primary.querySelector('small').textContent=hint;
if(s.mode==='result'&&s.pending.id!==undefined){const p=s.pending;$('catch').style.display='grid';document.querySelector('.catch-card').classList.toggle('legendary',p.id%4===3);$('catch-badge').textContent=p.id%4===3?'A LEGEND IN YOUR HANDS':p.new?'A NEW LITTLE DISCOVERY':'A LOVELY CATCH';html('catch-art',fishHTML(p.id,270,150));$('catch-name').textContent=s.names[p.id];$('catch-stats').textContent=Number(p.weight).toFixed(2)+' kg · '+'★'.repeat(p.grade)+(p.record?' · Personal best':'');$('catch-bonus').textContent=p.bonus?'Discovery & milestone bonus +'+p.bonus+' ◈':'';$('sell').textContent='Sell · +'+p.price+' ◈'}else $('catch').style.display='none';if(s.event!==lastEvent){lastEvent=s.event;play(s.sound)}if(master)master.gain.value=s.muted||s.paused?0:.55;if(s.mode==='reel'&&s.holding&&performance.now()-reelTick>160){reelTick=performance.now();tone(s.surging?220:330,.018,.055,'triangle')}if(drawer)renderDrawer();};
$('begin').disabled=true;const loadingStarted=performance.now();const loadTimer=setInterval(()=>{if(state){clearInterval(loadTimer);return}const error=$('status-notice')?.textContent?.trim(),p=$('status-progress');if(error){$('load-note').textContent=error;$('begin').disabled=false;$('begin').textContent='Reload the lake';return}const pct=p?.max>0?Math.min(100,Math.round(p.value/p.max*100)):0;$('load-note').textContent=pct?'Loading the lake · '+pct+'%':'Preparing your lakeside escape…';if(performance.now()-loadingStarted>45000){$('load-note').textContent='First visit takes longer. Check your connection, or reload.';$('begin').disabled=false;$('begin').textContent='Reload the lake'}},350);
})();

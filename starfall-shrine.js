(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const el = {
    app: byId('app'), arena: byId('arena'), board: byId('board'), petals: byId('petals'),
    wallet: byId('wallet'), best: byId('best'), night: byId('night'), mood: byId('mood'),
    tip: byId('tip'), result: byId('result'), resultLabel: byId('resultLabel'),
    resultValue: byId('resultValue'), nudge: byId('nudge'), fox: byId('foxLine'),
    stakes: byId('stakes'), fever: byId('fever'), last: byId('last'),
    drop: byId('drop'), dropText: byId('dropText'), sound: byId('sound'),
    flash: byId('flash'), notice: byId('notice')
  };
  const ctx = el.board.getContext('2d', {alpha:true});
  const PALETTE = ['#90eedf','#f4c478','#dd9dff','#fa91bd','#9bbdff'];
  const REGULAR = [
    [7,2.4,.9,.35,.9,2.4,7],
    [6,1.8,.55,1.15,.55,1.8,6],
    [8,2.2,.7,.3,.7,2.2,8]
  ];
  const FEVER = [12,4,1.8,1,1.8,4,12];
  const PAD = 13;
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const rand = (a,b) => a+Math.random()*(b-a);
  const read = (key,fallback) => { try { const v=localStorage.getItem(key); return v===null?fallback:Number(v); } catch { return fallback; } };
  const save = (key,value) => { try { localStorage.setItem(key,String(value)); } catch {} };
  const tapVibrate = ms => { try { if(navigator.vibrate) navigator.vibrate(ms); } catch {} };
  let wallet = read('starfallWallet',300), best = read('starfallBest',0), drops = read('starfallDrops',0);
  let stake = 10, ball = null, W = 340, H = 430, dpr = 1, selectedX = 170;
  let pegs = [], dust = [], particles = [], labels = [], lastSlot = null;
  let time = 0, lastFrame = 0, lastPegSound = -1, shake = 0, soundOn = true, audio = null;
  let noticeTimer = 0, resultTimer = 0, dropCount = 0;
  const night = () => Math.floor(drops/5)+1;
  const isFever = () => (drops+1)%5===0;
  const multipliers = () => isFever()?FEVER:REGULAR[(night()-1)%REGULAR.length];
  function fxSound(freq,duration=.08,type='sine',vol=.035) {
    if(!soundOn) return;
    try {
      audio ||= new (window.AudioContext||window.webkitAudioContext)();
      if(audio.state==='suspended') audio.resume();
      const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime;
      o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(100,freq*.72),t+duration);
      g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+duration);
      o.connect(g).connect(audio.destination);o.start(t);o.stop(t+duration);
    } catch {}
  }
  function notify(text) {
    el.notice.textContent=text;el.notice.classList.add('show');
    clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>el.notice.classList.remove('show'),1200);
  }
  function foxSays(text) { el.fox.textContent=text; }
  function flash() { el.flash.classList.remove('on');void el.flash.offsetWidth;el.flash.classList.add('on'); }
  function sync() {
    el.wallet.textContent=Math.floor(wallet).toLocaleString('en-US');
    el.best.textContent=best.toLocaleString('en-US');
    el.night.textContent=String(night()).padStart(2,'0');
    el.fever.textContent=isFever()?'FEVER DROP!':String(5-drops%5)+' TO FEVER';
    el.fever.classList.toggle('hot',isFever());
    el.mood.textContent=ball?'STAR IN FLIGHT':isFever()?'FEVER READY':'SKY IS OPEN';
    el.dropText.textContent=ball?(ball.nudged?'STAR IN FLIGHT':'NUDGE STAR'):'DROP STAR';
    el.drop.disabled=!!(ball&&ball.nudged);
    el.nudge.classList.toggle('show',!!(ball&&!ball.nudged));
    el.tip.classList.toggle('hidden',!!ball);
    save('starfallWallet',wallet);save('starfallBest',best);save('starfallDrops',drops);
  }
  function petalDecor() {
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for(let i=0;i<13;i++) {
      const p=document.createElement('i');p.className='petal';
      p.style.left=rand(-10,100)+'%';p.style.animationDuration=rand(9,17)+'s';
      p.style.animationDelay=rand(-19,0)+'s';p.style.width=rand(4,9)+'px';p.style.height=rand(7,13)+'px';
      el.petals.appendChild(p);
    }
  }
  function rebuildPegs() {
    const rows=H<355?6:8, stepX=(W-46)/7;
    const first=H<355?76:92, last=H-104;
    pegs=[];
    for(let r=0;r<rows;r++) {
      const count=r%2?6:7;
      for(let c=0;c<count;c++) {
        const x=23+(c+(r%2?1:.5))*stepX;
        const y=first+r*(last-first)/(rows-1);
        let gold=(r===2&&c===(night()+2)%count)||(r===rows-2&&c===(night()+4)%count);
        if(isFever()&&r===Math.floor(rows/2)&&c===Math.floor(count/2)) gold=true;
        pegs.push({x,y,r:5.3,gold,claimed:false,last:-100});
      }
    }
    dust=Array.from({length:35},(_,i)=>({
      x:16+((i*71.31+Math.sin(i*48)*29)%(W-32)),
      y:20+((i*97.11)%(H-95)),r:i%6===0?1.6:.8,phase:i*1.33
    }));
  }
  function resize() {
    const rect=el.board.getBoundingClientRect();
    const prevW=W,prevH=H;
    W=Math.max(240,rect.width);H=Math.max(250,rect.height);
    dpr=Math.min(window.devicePixelRatio||1,2);
    el.board.width=Math.round(rect.width*dpr);el.board.height=Math.round(rect.height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    if(ball&&prevW&&prevH){ball.x*=W/prevW;ball.y*=H/prevH;ball.vx*=W/prevW;ball.vy*=H/prevH;}
    selectedX=clamp(selectedX*W/prevW,W*.16,W*.84);
    rebuildPegs();
  }
  function glowDot(x,y,r,color,blur=14) {
    ctx.save();ctx.shadowColor=color;ctx.shadowBlur=blur;ctx.fillStyle=color;
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  function rounded(x,y,w,h,r) {
    r=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);
    ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);
    ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);
    ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);
    ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
  }
  function drawBoard() {
    const binY=H-61,innerW=W-PAD*2,binW=innerW/7,values=multipliers();
    ctx.clearRect(0,0,W,H);
    // The engraved arch and soft star chart belong to the machine, not the backdrop.
    ctx.strokeStyle='#f0ca8050';ctx.lineWidth=1;
    ctx.beginPath();ctx.arc(W/2,18,W*.33,.08,Math.PI-.08,true);ctx.stroke();
    ctx.beginPath();ctx.arc(W/2,24,W*.29,.17,Math.PI-.17,true);ctx.stroke();
    ctx.strokeStyle='#c899ff20';ctx.beginPath();
    for(let i=0;i<5;i++){let p=dust[i*4],q=dust[i*4+3];ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y)}ctx.stroke();
    for(const s of dust){ctx.globalAlpha=.24+.35*(.5+.5*Math.sin(time*1.8+s.phase));glowDot(s.x,s.y,s.r,'#d5e9ff',3)}
    ctx.globalAlpha=1;
    // Adjustable launch orbit.
    ctx.strokeStyle='#ffd99b88';ctx.lineWidth=1;ctx.setLineDash([3,5]);
    ctx.beginPath();ctx.moveTo(W*.16,61);ctx.lineTo(W*.84,61);ctx.stroke();ctx.setLineDash([]);
    if(!ball) {
      ctx.strokeStyle='#bcf7ec58';ctx.setLineDash([2,5]);ctx.beginPath();
      ctx.moveTo(selectedX,69);ctx.lineTo(selectedX,Math.min(112,H*.23));ctx.stroke();ctx.setLineDash([]);
      glowDot(selectedX,61,7.2,'#ffdf9d',20);
      glowDot(selectedX,59,2.2,'#ffffff',5);
      ctx.strokeStyle='#ffe5ae';ctx.beginPath();ctx.moveTo(selectedX-10,51);ctx.lineTo(selectedX,45);
      ctx.moveTo(selectedX+10,51);ctx.lineTo(selectedX+15,45);ctx.stroke();
    }
    // Pegs pulse softly. Gold pegs add a visible bonus to the falling star.
    for(let i=0;i<pegs.length;i++){
      const p=pegs[i], pulse=.5+.5*Math.sin(time*3+i*.78),c=p.gold&&!p.claimed?'#ffcc70':PALETTE[(night()+i)%PALETTE.length];
      ctx.save();ctx.globalAlpha=p.gold?1:.76;ctx.shadowColor=c;ctx.shadowBlur=p.gold?13+7*pulse:7;
      ctx.fillStyle=p.gold?'#7d4b33':'#405065';ctx.strokeStyle=c;ctx.lineWidth=p.gold?1.8:1.3;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r+(p.gold?pulse*.8:0),0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle=p.gold?'#fff0bb':'#b7faf1';ctx.beginPath();ctx.arc(p.x-1,p.y-1,1.6,0,Math.PI*2);ctx.fill();ctx.restore();
      if(p.gold&&!p.claimed){ctx.fillStyle='#ffe0a4';ctx.font='11px Georgia';ctx.textAlign='center';ctx.fillText('✦',p.x,p.y-10)}
    }
    // Reward chambers are visible before the drop, so the risk is legible.
    for(let i=0;i<7;i++){
      const x=PAD+i*binW,w=binW-2,v=values[i];
      const rare=v>=5,hit=lastSlot&&lastSlot.i===i&&lastSlot.life>0;
      const g=ctx.createLinearGradient(0,binY,0,H);
      g.addColorStop(0,hit?'#edbb6488':rare?'#8d563650':'#363052a0');g.addColorStop(1,rare?'#4c2440dc':'#180e2cdd');
      ctx.fillStyle=g;rounded(x+1,binY+2,w,H-binY-6,5);ctx.fill();
      ctx.strokeStyle=hit?'#fff3c4':rare?'#edbd76ad':'#c59b8d66';ctx.lineWidth=hit?2:1;ctx.stroke();
      ctx.fillStyle=rare?'#ffe0a1':'#b7e7df';ctx.textAlign='center';ctx.font='700 '+(W<310?12:14)+'px Georgia';
      ctx.shadowColor=rare?'#ffbb63':'#8de7d6';ctx.shadowBlur=rare?10:4;
      ctx.fillText(String(v).replace(/\.0$/,'')+'×',x+binW/2,binY+36);
      ctx.shadowBlur=0;
      ctx.fillStyle=rare?'#f6bf7e':'#99a8b4';ctx.font='10px Georgia';ctx.fillText(rare?'✦':'·',x+binW/2,binY+17);
    }
    ctx.strokeStyle='#ecb9748a';ctx.beginPath();ctx.moveTo(PAD,binY);ctx.lineTo(W-PAD,binY);ctx.stroke();
    if(lastSlot&&lastSlot.life>0)lastSlot.life-=1/60;
  }
  function burst(x,y,n,color,power=125) {
    for(let i=0;i<n;i++){
      const a=rand(0,Math.PI*2),s=rand(power*.27,power);
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-30,life:rand(.35,.95),max:.95,r:rand(1.2,3.5),color:i%4?'#fff4d6':color});
    }
  }
  function floating(text,x,y,color='#ffe1a0'){
    labels.push({text,x,y,color,life:1,max:1});
  }
  function launch(x) {
    if(ball)return;
    if(wallet<5){wallet+=100;sync();notify('A GIFT OF 100 ✦');foxSays('The shrine shares.');fxSound(550,.18);return}
    if(wallet<stake){notify('CHOOSE A SMALLER STAR');fxSound(190,.12,'triangle');return}
    clearTimeout(resultTimer);el.result.classList.remove('show');
    selectedX=clamp(x,W*.16,W*.84);
    wallet-=stake;dropCount++;rebuildPegs();
    ball={x:selectedX,y:62,vx:rand(-22,22),vy:35,r:6.6,trail:[],age:0,nudged:false,bonus:0,stake};
    foxSays(isFever()?'A fever star!':'Follow the light!');
    sync();fxSound(isFever()?880:600,.19,'sine',.05);burst(selectedX,62,18,'#fff4b7',115);tapVibrate(10);
  }
  function nudge(direction) {
    if(!ball||ball.nudged)return;
    ball.nudged=true;ball.vx+=direction*195;ball.vy-=48;
    burst(ball.x,ball.y,19,'#9ef4e4',115);floating('NUDGE!',ball.x,ball.y-13,'#a9ffed');
    fxSound(680,.16,'triangle',.045);tapVibrate(13);sync();
  }
  function collect() {
    if(!ball)return;
    const binW=(W-PAD*2)/7,index=clamp(Math.floor((ball.x-PAD)/binW),0,6);
    const base=multipliers()[index],total=base+ball.bonus*.35;
    const payout=Math.max(1,Math.round(ball.stake*total)),big=total>=2,huge=total>=5;
    wallet+=payout;best=Math.max(best,payout);drops++;
    const bx=PAD+(index+.5)*binW;
    lastSlot={i:index,life:1.1};ball=null;
    el.last.textContent='+'+payout;el.last.classList.toggle('up',payout>=stake);
    el.resultLabel.textContent=huge?'STARBURST!':big?'BRILLIANT!':'WISH GRANTED';
    el.resultValue.textContent='+'+payout;
    el.result.classList.add('show');clearTimeout(resultTimer);
    resultTimer=setTimeout(()=>el.result.classList.remove('show'),1300);
    el.wallet.parentElement.classList.remove('pop');void el.wallet.parentElement.offsetWidth;el.wallet.parentElement.classList.add('pop');
    flash();shake=huge?7:big?4:2;
    burst(bx,H-48,huge?95:big?55:28,huge?'#ffe998':'#92ffdf',huge?230:150);
    for(let j=0;j<(huge?4:2);j++)setTimeout(()=>fxSound(550+j*145,.12,'sine',.045),j*85);
    tapVibrate(huge?[30,20,60]:big?25:10);
    foxSays(huge?'The moon chose you!':big?'Beautiful fall!':'Another wish?');
    if(drops%5===0){notify('NEW NIGHT UNLOCKED');foxSays('A new night begins!')}
    sync();rebuildPegs();
  }
  function physics(dt) {
    if(!ball)return;
    ball.age+=dt;
    const steps=Math.max(1,Math.ceil(dt/.009)),sub=dt/steps;
    for(let step=0;step<steps&&ball;step++){
      ball.vy+=760*sub;ball.vx*=1-.13*sub;
      if(ball.age>3.3)ball.vy=Math.max(ball.vy,150);
      ball.x+=ball.vx*sub;ball.y+=ball.vy*sub;
      if(ball.x<20+ball.r){ball.x=20+ball.r;ball.vx=Math.abs(ball.vx)*.78}
      if(ball.x>W-20-ball.r){ball.x=W-20-ball.r;ball.vx=-Math.abs(ball.vx)*.78}
      if(ball.y<ball.r+13){ball.y=ball.r+13;ball.vy=Math.abs(ball.vy)*.65}
      for(let i=0;i<pegs.length;i++){
        const p=pegs[i],dx=ball.x-p.x,dy=ball.y-p.y,min=ball.r+p.r;
        if(dx*dx+dy*dy>=min*min)continue;
        const d=Math.max(.001,Math.hypot(dx,dy)),nx=dx/d,ny=dy/d;
        ball.x=p.x+nx*(min+.4);ball.y=p.y+ny*(min+.4);
        const vn=ball.vx*nx+ball.vy*ny;
        if(vn<0){ball.vx-=1.48*vn*nx;ball.vy-=1.48*vn*ny;ball.vx+=rand(-20,20)}
        if(time-p.last>.11){
          p.last=time;
          burst(p.x,p.y,p.gold?13:5,p.gold?'#ffcb7d':'#87ebdf',p.gold?84:36);
          if(time-lastPegSound>.055){fxSound(440+(i%7)*52,.055,p.gold?'sine':'triangle',p.gold?.035:.012);lastPegSound=time}
          if(p.gold&&!p.claimed){p.claimed=true;ball.bonus++;floating('+0.35×',p.x,p.y-15,'#ffdea0');fxSound(870,.11,'sine',.05);tapVibrate(8)}
        }
      }
      if(ball.y>=H-65||ball.age>6.2){collect();break}
    }
    if(ball){ball.trail.push({x:ball.x,y:ball.y});if(ball.trail.length>20)ball.trail.shift()}
  }
  function drawMoving(dt) {
    if(ball){
      for(let i=0;i<ball.trail.length;i++){
        const p=ball.trail[i],f=(i+1)/ball.trail.length;
        ctx.globalAlpha=f*.52;glowDot(p.x,p.y,Math.max(.7,3.7*f),'#ffe7a6',11*f);
      }
      ctx.globalAlpha=1;
      ctx.save();ctx.shadowColor='#ffdd85';ctx.shadowBlur=24;
      const g=ctx.createRadialGradient(ball.x-2,ball.y-3,1,ball.x,ball.y,ball.r+5);
      g.addColorStop(0,'#ffffff');g.addColorStop(.28,'#fff0af');g.addColorStop(.68,'#f5ba6c');g.addColorStop(1,'#c35e7800');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(ball.x,ball.y,ball.r+5,0,Math.PI*2);ctx.fill();ctx.restore();
      glowDot(ball.x,ball.y,3,'#ffffff',8);
    }
    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=175*dt;p.life-=dt;
      if(p.life<=0){particles.splice(i,1);continue}
      ctx.globalAlpha=clamp(p.life/p.max,0,1);glowDot(p.x,p.y,p.r,p.color,9);ctx.globalAlpha=1;
    }
    for(let i=labels.length-1;i>=0;i--){
      const p=labels[i];p.y-=24*dt;p.life-=dt;if(p.life<=0){labels.splice(i,1);continue}
      ctx.save();ctx.globalAlpha=p.life/p.max;ctx.fillStyle=p.color;ctx.textAlign='center';ctx.font='700 14px Georgia';
      ctx.shadowColor=p.color;ctx.shadowBlur=9;ctx.fillText(p.text,p.x,p.y);ctx.restore();
    }
  }
  function frame(t) {
    const dt=Math.min(.035,(t-lastFrame)/1000||0);lastFrame=t;time+=dt;
    physics(dt);
    ctx.save();if(shake>.1){ctx.translate(rand(-shake,shake),rand(-shake,shake));shake*=.84}
    drawBoard();drawMoving(dt);ctx.restore();
    requestAnimationFrame(frame);
  }
  el.board.addEventListener('pointerdown',e=>{
    e.preventDefault();const r=el.board.getBoundingClientRect(),x=e.clientX-r.left;
    if(ball)nudge(x<W/2?-1:1);else launch(x);
  });
  el.board.addEventListener('pointermove',e=>{
    if(!ball&&e.pointerType==='mouse'){const r=el.board.getBoundingClientRect();selectedX=clamp(e.clientX-r.left,W*.16,W*.84)}
  });
  el.drop.addEventListener('click',()=>{if(ball)nudge(ball.x<W/2?-1:1);else launch(selectedX)});
  el.stakes.addEventListener('click',e=>{
    const b=e.target.closest('[data-stake]');if(!b)return;
    stake=Number(b.dataset.stake);el.stakes.querySelectorAll('button').forEach(x=>x.classList.toggle('selected',x===b));
    fxSound(440,.06,'triangle',.025);
  });
  el.sound.addEventListener('click',()=>{
    soundOn=!soundOn;el.sound.textContent=soundOn?'♫':'♪';el.sound.setAttribute('aria-pressed',String(soundOn));
    if(soundOn)fxSound(700,.09,'sine');
  });
  window.addEventListener('keydown',e=>{
    if(['Space','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();
    if(e.code==='Space'){if(ball)nudge(ball.x<W/2?-1:1);else launch(selectedX)}
    if(e.code==='ArrowLeft'||e.code==='ArrowRight'){
      const dir=e.code==='ArrowLeft'?-1:1;
      if(ball)nudge(dir);else selectedX=clamp(selectedX+dir*22,W*.16,W*.84);
    }
  });
  if('ResizeObserver' in window)new ResizeObserver(resize).observe(el.arena);
  window.addEventListener('resize',resize,{passive:true});
  el.sound.textContent=soundOn?'♫':'♪';el.sound.setAttribute('aria-pressed',String(soundOn));
  petalDecor();resize();sync();requestAnimationFrame(frame);
})();

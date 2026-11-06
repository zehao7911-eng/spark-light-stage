import * as Flight from './core.mjs';
import {Scene} from './art.mjs';
import {bridge} from './sdk.mjs';

const $ = id => document.getElementById(id);
const key = 'chute-scoot-v1';
const app = $('app'), sceneNode = $('scene'), hold = $('hold'), panel = $('panel');
const scene = new Scene($('canvas'));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const keyboard = new Set();
let pointer = null, sdk, visualDrop, missedAt = 0, clock = 0, receiptTime = 0;
let previous = 0, accumulator = 0, forecastAge = 1, forecast = null, frame = 0;
let audio, panelType = '', repaint = true, needsLayout = true;

function stored() {
  try { return JSON.parse(localStorage.getItem(key)) || {}; }
  catch { return {}; }
}

const boot = stored();
let profile = Flight.profile(boot.profile);
let run = Flight.restore(boot.active, profile);
visualDrop = Flight.destination(run);

function persist() {
  profile = Flight.mergeProfile(profile,stored().profile);
  try {
    localStorage.setItem(key, JSON.stringify({profile,active:Flight.checkpoint(run)}));
  } catch {}
}

function connect() {
  sdk = bridge({
    read:()=>profile,
    write:(incoming,merge)=>{
      profile=merge ? Flight.mergeProfile(profile,incoming) : Flight.profile(incoming);
      persist();
      repaint=true;
    },
    changed:event=>{
      needsLayout = true;
      if(event.type==='reward'){
        play('perfect');
        scene.burst(run.x,Math.max(145,run.y-20),true,event.kind==='comment',false);
      }
      if(panel.open && panelType==='settings') panelContent();
    },
  });
}

function layout() {
  needsLayout=false;
  const view=sdk?.viewport();
  app.style.width=view ? Math.min(view.width, innerWidth)+'px' : '';
  app.style.height=view ? Math.min(view.height, innerHeight)+'px' : '';
  scene.size();
  repaint=true;
}

function updateHud() {
  const route=Flight.routes[run.index];
  $('routeName').textContent=route.name;
  $('routeNumber').textContent='ROUTE '+String(run.index+1).padStart(2,'0');
  $('progress').textContent='◆ '.repeat(run.drop)+'◇ '.repeat(3-run.drop);
  $('progress').setAttribute('aria-label',run.drop+' of 3 parcels delivered');
  const wind=visualDrop.wind;
  $('wind').textContent=Math.abs(wind)<12 ? 'CALM AIR' : wind>0 ? 'WIND →' : '← WIND';
  const result=$('result'), advance=$('advance'), finished=run.phase==='done';
  const receipt=run.phase==='receipt', waiting=run.phase==='ready';
  hold.hidden=finished||receipt;
  result.hidden=!finished&&!receipt;
  advance.hidden=result.hidden;
  $('flyHint').hidden=!waiting;
  $('help').textContent=result.hidden ? 'Drag left or right to steer. Release to dive.'
    : finished ? 'Replay any cleared route from the Route book.' : 'Three parcels complete the route.';
  if(!result.hidden){
    $('resultTag').textContent=finished ? 'ROUTE COMPLETE' : run.outcome==='miss' ? 'DELIVERY RETRY' : 'AIR MAIL RECEIPT';
    $('resultTitle').textContent=finished ? 'Signed & delivered!' :
      {perfect:'Bullseye!',landed:'Parcel delivered!',miss:'A little off-course'}[run.outcome];
    $('resultNote').textContent=finished ? '★'.repeat(1+Number(!run.misses)+Number(run.perfect>=2))+' · '+run.perfect+(run.perfect===1?' precision landing':' precision landings')
      : run.outcome==='miss' ? 'Guide the dotted path onto the gold pad.' : run.drop+' of 3 parcels safely delivered';
    advance.textContent=finished ? run.index===5 ? 'Open route book →' : 'Next route →'
      : run.outcome==='miss' ? 'Retry this drop ↻' : 'Next parcel →';
  }
}

function swapRoute(index) {
  if(run.phase==='air'||run.drop>0||run.misses) sdk.end();
  sdk.prepare();
  run=Flight.newRoute(index);
  resetVisual();
  persist();
}

function resetVisual() {
  visualDrop=Flight.destination(run);
  scene.sparks=[];scene.ripple=null;
  forecastAge=1;forecast=null;repaint=true;
  updateHud();
}

function readyOrAir() { return run.phase==='ready'||run.phase==='air'; }

function initAudio() {
  if(!profile.sound)return;
  try{
    const Audio=window.AudioContext||window.webkitAudioContext;
    if(Audio && !audio) audio=new Audio();
    if(audio?.state==='suspended') audio.resume().catch(()=>{});
  }catch{}
}

function play(name) {
  if(!profile.sound||!audio||audio.state!=='running')return;
  const notes={
    open:[[196,.13,'triangle'],[392,.21,'sine']],
    dive:[[172,.17,'triangle']],
    perfect:[[523,.24,'triangle'],[659,.22,'sine'],[784,.29,'sine'],[1047,.37,'sine']],
    landed:[[330,.18,'triangle'],[523,.22,'sine']],
    miss:[[140,.19,'triangle'],[95,.16,'sine']],
    finish:[[392,.26,'triangle'],[523,.26,'triangle'],[659,.32,'sine'],[784,.44,'sine']],
  }[name];
  for(let i=0;i<notes.length;i++){
    const [hz,duration,wave]=notes[i], time=audio.currentTime+i*.075;
    const osc=audio.createOscillator(), volume=audio.createGain();
    osc.type=wave;osc.frequency.setValueAtTime(hz,time);
    osc.frequency.exponentialRampToValueAtTime(name==='open'?hz*1.38:hz*.97,time+duration);
    volume.gain.setValueAtTime(.001,time);volume.gain.exponentialRampToValueAtTime(.073,time+.019);
    volume.gain.exponentialRampToValueAtTime(.001,time+duration);
    osc.connect(volume);volume.connect(audio.destination);
    osc.start(time);osc.stop(time+duration+.01);
  }
}

function engage() {
  initAudio();
  if(Flight.takeOff(run,sdk)) updateHud();
  else if(run.phase==='air') sdk.start();
  forecastAge=1;
  play('open');
}

function startPointer(event) {
  if(panel.open||pointer||!readyOrAir()||event.button!==0)return;
  event.preventDefault();
  pointer={id:event.pointerId,base:event.clientX,x:event.clientX};
  event.currentTarget.setPointerCapture?.(event.pointerId);
  engage();
}

function movePointer(event) {
  if(pointer?.id!==event.pointerId)return;
  pointer.x=event.clientX;
}

function releasePointer(event) {
  if(pointer?.id!==event.pointerId)return;
  pointer=null;forecastAge=1;
  if(run.phase==='air'&&!panel.open)play('dive');
}

for(const element of [sceneNode,hold]){
  element.addEventListener('pointerdown',startPointer);
  element.addEventListener('pointermove',movePointer);
  element.addEventListener('pointerup',releasePointer);
  element.addEventListener('pointercancel',releasePointer);
  element.addEventListener('lostpointercapture',releasePointer);
}

function handleKey(event, down) {
  const glide=event.code==='Space'||event.code==='Enter'&&document.activeElement===hold;
  const arrow=['ArrowLeft','ArrowRight','KeyA','KeyD'].includes(event.code);
  if(panel.open||!readyOrAir()||!glide&&!arrow)return;
  if(glide&&event.code==='Space'&&document.activeElement instanceof HTMLButtonElement&&document.activeElement!==hold)return;
  event.preventDefault();
  if(down){
    if(glide && !keyboard.has(event.code))engage();
    keyboard.add(event.code);
  }else{
    keyboard.delete(event.code);
    if(glide && run.phase==='air')play('dive');
  }
}
addEventListener('keydown',event=>handleKey(event,true));
addEventListener('keyup',event=>{handleKey(event,false);keyboard.delete(event.code);});
addEventListener('blur',()=>{pointer=null;keyboard.clear();});
hold.addEventListener('click',event=>{
  if(event.detail===0&&readyOrAir()&&!keyboard.size&&run.phase==='ready') {
    // Assistive technology may activate a button without sending key/pointer events.
    engage();
    keyboard.add('AssistiveGlide');
  }else if(event.detail===0&&keyboard.has('AssistiveGlide')) {
    keyboard.delete('AssistiveGlide');play('dive');
  }
});

function input() {
  const horizontal=(Number(keyboard.has('ArrowRight')||keyboard.has('KeyD'))-
    Number(keyboard.has('ArrowLeft')||keyboard.has('KeyA')));
  const drag=pointer ? (pointer.x-pointer.base)/Math.max(32,sceneNode.clientWidth*.21) : 0;
  return {open:!!pointer||keyboard.has('Space')||keyboard.has('Enter')||keyboard.has('AssistiveGlide'),
    steer:Math.max(-1,Math.min(1,horizontal+drag))};
}

function finishFlight(outcome) {
  pointer=null;keyboard.clear();forecast=null;receiptTime=clock;missedAt=clock;
  if(run.phase==='done')Flight.earn(run,profile);
  persist();
  if(run.phase==='done')sdk.save();
  if(!reduceMotion.matches)scene.burst(run.x,run.y-5,outcome==='perfect',profile.rewards.comment,outcome==='miss');
  play(run.phase==='done'?'finish':outcome);
  if(outcome==='perfect'&&!reduceMotion.matches){try{navigator.vibrate?.(20);}catch{}}
  updateHud();
}

function refreshForecast(controls) {
  const ghost={...run};
  const states=[];
  for(let i=1;i<=240;i++){
    const outcome=Flight.tick(ghost,1/60,controls);
    if(outcome){states.push([ghost.x,ghost.y,outcome!=='miss']);break;}
    if(i%7===0)states.push([ghost.x,ghost.y,false]);
  }
  forecast=states.length>1?states:null;
}

function loop(time) {
  frame=requestAnimationFrame(loop);
  if(needsLayout)layout();
  const elapsed=previous ? (time-previous)/1000 : 0;
  if(elapsed<1/37 && previous && !repaint)return;
  previous=time;
  if(document.hidden||panel.open&&!repaint)return;
  const dt=panel.open ? 0 : Math.min(.12,elapsed);
  clock+=dt;
  if(run.phase==='air'&&!panel.open){
    const controls=input();
    accumulator+=dt;
    while(accumulator>=1/120&&run.phase==='air'){
      accumulator-=1/120;
      const outcome=Flight.tick(run,1/120,controls,sdk);
      if(outcome)finishFlight(outcome);
    }
    forecastAge+=dt;
    if(run.phase==='air'&&forecastAge>.105){forecastAge=0;refreshForecast(controls);}
  }else accumulator=0;
  scene.paint(run,{sky:Flight.routes[run.index].sky,drop:visualDrop,skin:profile.skin,
    like:profile.rewards.like,missedAt},clock,dt,forecast);
  repaint=false;
}

function rows() {
  const container=document.createElement('div');container.className='rows';return container;
}

function option(parent, label, detail, onClick, {disabled=false,selected=false}={}) {
  const button=document.createElement('button');
  button.type='button';button.className='row'+(selected?' selected':'');button.disabled=disabled;
  button.append(label);
  if(detail){const note=document.createElement('span');note.className='detail';note.textContent=detail;button.append(note);}
  button.addEventListener('click',onClick);
  parent.append(button);
}

function panelContent() {
  const body=$('panelBody'), list=rows();
  body.replaceChildren(list);
  if(panelType==='map'){
    $('panelTitle').textContent='Route book';
    Flight.routes.forEach((route,i)=>{
      const locked=i>0&&!profile.stars[i-1];
      const medals=profile.stars[i];
      option(list,String(i+1).padStart(2,'0')+'  '+route.name,
        locked?'Clear the previous route':medals?'★'.repeat(medals)+' · Best: '+profile.best[i]+' precision drops':'Three parcels',
        ()=>{swapRoute(i);panel.close();},{disabled:locked,selected:i===run.index});
    });
  }else if(panelType==='closet'){
    $('panelTitle').textContent='Canopy locker';
    const total=profile.stars.reduce((sum,n)=>sum+n,0);
    for(const [skin,name,cost] of [['sun','Apricot Post',0],['berry','Berry Courier',5],['mint','Mint Express',10]]){
      option(list,name, total<cost ? cost+' total stars to unlock' : 'Ready to wear',()=>{
        profile.skin=skin;persist();sdk.save();repaint=true;panelContent();
      },{disabled:total<cost,selected:profile.skin===skin});
    }
  }else{
    $('panelTitle').textContent='Flight paused';
    option(list,'Resume',null,()=>panel.close());
    option(list,'Sound '+(profile.sound?'on':'off'),null,()=>{
      profile.sound=!profile.sound;persist();initAudio();panelContent();
    });
    option(list,'Restart this route','Restarts the current set of three parcels.',()=>{swapRoute(run.index);panel.close();});
    const support=sdk.support();
    if(support.like)option(list,profile.rewards.like?'Gold cap badge earned':'Gold cap badge','Optional GameWave like reward.',()=>{},{disabled:true});
    if(support.comment)option(list,profile.rewards.comment?'Confetti palette earned':'Confetti palette','Optional GameWave direct comment reward.',()=>{},{disabled:true});
  }
}

function openPanel(type) {
  pointer=null;keyboard.clear();panelType=type;
  panelContent();panel.showModal();repaint=true;
}

$('menu').addEventListener('click',()=>openPanel('settings'));
$('map').addEventListener('click',()=>openPanel('map'));
$('closet').addEventListener('click',()=>openPanel('closet'));
$('close').addEventListener('click',()=>panel.close());
panel.addEventListener('close',()=>{previous=0;repaint=true;});
$('advance').addEventListener('click',()=>{
  if(run.phase==='receipt'){
    if(clock-receiptTime<.14)return;
    Flight.nextDrop(run);resetVisual();hold.focus({preventScroll:true});
  }else if(run.phase==='done'){
    if(run.index===Flight.routes.length-1)openPanel('map');
    else {swapRoute(run.index+1);hold.focus({preventScroll:true});}
  }
});

addEventListener('resize',()=>{needsLayout=true;});
new ResizeObserver(()=>{needsLayout=true;}).observe(sceneNode);
document.addEventListener('visibilitychange',()=>{
  pointer=null;keyboard.clear();previous=0;
  if(document.hidden){audio?.suspend().catch(()=>{});}
  else if(run.phase==='air'&&!panel.open)openPanel('settings');
});
addEventListener('pagehide',()=>{sdk.stop();cancelAnimationFrame(frame);});
addEventListener('pageshow',event=>{if(event.persisted){connect();previous=0;frame=requestAnimationFrame(loop);}});
connect();
updateHud();
frame=requestAnimationFrame(loop);



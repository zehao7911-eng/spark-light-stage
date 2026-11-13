import * as T from './vendor/three.module.js';
import { FBXLoader } from './vendor/FBXLoader.js';

const $ = id => document.getElementById(id);
const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
const dist = (a,b) => Math.hypot(a.x-b.x,a.z-b.z);
const mix = (a,b,t) => a+(b-a)*t;
const saveKey='pulse-city-rescue-v1';
let permanent={stars:0,best:0,shift:1,upgrades:{battery:0,shift:0,medic:0}};
try { permanent={...permanent,...JSON.parse(localStorage.getItem(saveKey)||'{}')}; permanent.upgrades={battery:0,shift:0,medic:0,...permanent.upgrades}; } catch {}
const store=()=>{try{localStorage.setItem(saveKey,JSON.stringify(permanent))}catch{}};
const mobile=matchMedia('(max-width:700px)').matches;
const scene=new T.Scene();scene.background=new T.Color(0x91ced8);scene.fog=new T.Fog(0x91ced8,45,86);
const camera=new T.OrthographicCamera(-15,15,22,-22,.1,150);
const renderer=new T.WebGLRenderer({canvas:$('view'),antialias:!mobile,alpha:false,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.4:1.8));
renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.16;
const hemi=new T.HemisphereLight(0xe9ffff,0x809b92,1.65);scene.add(hemi);
const sun=new T.DirectionalLight(0xffedcf,2.2);sun.position.set(-25,38,-15);scene.add(sun);
const mat=(c,roughness=1)=>new T.MeshStandardMaterial({color:c,roughness});
const M={ground:mat(0x9fd1b1),road:mat(0x718892),lane:mat(0xf8e8c5),walk:mat(0xd8dfcb),white:mat(0xfff9e9),red:mat(0xe87472),blue:mat(0x5e9bb1),dark:mat(0x254458),yellow:mat(0xffd689),green:mat(0x5cb89c),water:mat(0x8bcdd1),tree:mat(0x5ea88f),roof:mat(0xb76c66),window:mat(0xffe5ab)};
function box(parent,w,h,d,x,y,z,material){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);parent.add(mesh);return mesh}
function ball(parent,r,x,y,z,material,detail=0){const mesh=new T.Mesh(new T.IcosahedronGeometry(r,detail),material);mesh.position.set(x,y,z);parent.add(mesh);return mesh}
function cyl(parent,rt,rb,h,x,y,z,material,sides=8){const mesh=new T.Mesh(new T.CylinderGeometry(rt,rb,h,sides),material);mesh.position.set(x,y,z);parent.add(mesh);return mesh}
function labelTexture(text,bg='#fff8e6',fg='#184d5a') {const c=document.createElement('canvas');c.width=256;c.height=128;let g=c.getContext('2d');g.fillStyle=bg;g.beginPath();g.roundRect(6,6,244,116,22);g.fill();g.strokeStyle='#ffffff';g.lineWidth=8;g.stroke();g.fillStyle=fg;g.font='900 61px Trebuchet MS,Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(text,128,68);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t}
function billboard(text,w,h,x,y,z,bg,fg){const mesh=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:labelTexture(text,bg,fg),transparent:true,side:T.DoubleSide,depthWrite:false}));mesh.position.set(x,y,z);scene.add(mesh);return mesh}
const terrain=new T.Group();scene.add(terrain);
box(terrain,130,.12,130,0,-.12,0,M.ground);
const roads=[-54,-36,-18,0,18,36,54];
const trafficLights=[];
for(const r of roads){box(terrain,130,.08,6,0,0,r,M.road);box(terrain,6,.08,130,r,0,0,M.road)}
for(const r of roads)for(let p=-62;p<=62;p+=8){if(roads.some(q=>Math.abs(q-p)<4))continue;box(terrain,2.1,.015,.09,p,.05,r,M.lane);box(terrain,.09,.015,2.1,r,.05,p,M.lane)}
const asphaltShade=new T.MeshBasicMaterial({color:0x294e60,transparent:true,opacity:.15,depthWrite:false});
for(const x of roads)for(const z of roads){
  for(let k=-2;k<=2;k++){
    box(terrain,.42,.018,1.45,x+k*.75,.053,z-4.3,M.lane);
    box(terrain,1.45,.018,.42,x-4.3,.053,z+k*.75,M.lane);
  }
  if((x+z)%36===0){box(terrain,.18,2.4,.18,x+4.3,1.2,z+4.3,M.dark);box(terrain,.55,.9,.45,x+4.3,2.4,z+4.3,M.dark);let red=box(terrain,.36,.17,.04,x+4.3,2.68,z+4.55,M.red);box(terrain,.36,.17,.04,x+4.3,2.44,z+4.55,M.yellow);let green=box(terrain,.36,.17,.04,x+4.3,2.2,z+4.55,new T.MeshBasicMaterial({color:0x42f5a8}));green.visible=false;trafficLights.push({x,z,red,green,timer:0})}
}
let seed=98421;function rnd(){seed=(1664525*seed+1013904223)>>>0;return seed/4294967296}
const buildingColors=[0xf8e7cc,0xf3b999,0xb2d7d6,0xe6d2ad,0xaac4c8,0xdfa69a];
const buildingR=[0xa26669,0x5c8294,0xb9956c,0x4b6979];
for(let i=-3;i<3;i++)for(let j=-3;j<3;j++){
  const cx=i*18+9,cz=j*18+9;
  box(terrain,11,.15,11,cx,.1,cz,M.walk);
  if((i===-3&&j===-3)||(i===2&&j===2))continue;
  if(rnd()<.17){
    box(terrain,8,.1,8,cx,.2,cz,mat(0xa2d4b3));
    for(let t=0;t<3;t++){const ox=(rnd()-.5)*6,oz=(rnd()-.5)*6;cyl(terrain,.17,.22,1.3,cx+ox,.9,cz+oz,mat(0x886f5a));ball(terrain,.95,cx+ox,1.8,cz+oz,mat(t%2?0x7abb9d:0x66a58f),1)}
  }else{
    const h=2.8+rnd()*4.8,w=3.4+rnd()*1.4,d=3.4+rnd()*1.5;
    let ox=cx+(rnd()-.5)*2,oz=cz+(rnd()-.5)*2;
    const body=mat(buildingColors[Math.floor(rnd()*buildingColors.length)]);
    box(terrain,w+.65,.025,d+.55,ox+.8,.2,oz+.8,asphaltShade);
    box(terrain,w,h,d,ox,h/2+.23,oz,body);
    box(terrain,w+.35,.25,d+.35,ox,h+.34,oz,mat(buildingR[Math.floor(rnd()*buildingR.length)]));
    for(let k=-1;k<=1;k+=2){box(terrain,.45,.6,.035,ox+k*w*.27,Math.min(2.1,h*.6),oz+d/2+.025,M.window);box(terrain,.45,.6,.035,ox+k*w*.27,Math.min(2.1,h*.6),oz-d/2-.025,M.window)}
    box(terrain,.55,1,.035,ox,0.73,oz+d/2+.03,M.dark);
    if(rnd()<.4){box(terrain,w*.75,.12,1.1,ox,1.95,oz+d/2+.55,mat(0xf2d29d));box(terrain,w*.75,.13,.13,ox,1.91,oz+d/2+1.08,mat(0xe47e75))}
    if(rnd()<.42){let tx=cx+(rnd()<.5?-4:4),tz=cz+(rnd()<.5?-4:4);cyl(terrain,.13,.19,1.15,tx,.76,tz,mat(0x8d765d));ball(terrain,.76,tx,1.55,tz,mat(0x6eae91),1)}
  }
}
const hospital=new T.Group();hospital.position.set(-50,0,-60);scene.add(hospital);
box(hospital,7,5.6,7,0,2.9,0,M.white);box(hospital,7.4,.34,7.4,0,5.8,0,M.blue);
box(hospital,2,2.5,.1,0,2.3,3.57,M.red);box(hospital,1.2,.35,.12,0,4.3,3.65,M.red);box(hospital,.35,1.2,.12,0,4.3,3.67,M.red);
for(const x of [-2.2,2.2]){box(hospital,.9,1,.08,x,3.5,3.58,M.window);box(hospital,.9,1,.08,x,3.5,-3.58,M.window)}
const hospitalBeam=new T.Mesh(new T.CylinderGeometry(.15,1.5,13,16,1,true),new T.MeshBasicMaterial({color:0x7beedb,transparent:true,opacity:.16,side:T.DoubleSide,depthWrite:false}));hospitalBeam.position.set(-50,6.8,-60);scene.add(hospitalBeam);
billboard('H',3.5,1.75,-50,8,-60,'#fff8e6','#e86871');
const hospitalStop={x:-54,z:-54};
const patientMat=[mat(0xea7775),mat(0xe9ac66),mat(0x8eacd9)];
function patientMesh(p){const g=new T.Group();g.position.set(p.x,0,p.z);scene.add(g);cyl(g,.29,.34,1.1,0,.8,0,patientMat[p.type]);ball(g,.28,0,1.55,0,M.white,1);box(g,.58,.24,.12,0,1.9,0,M.white);box(g,.12,.5,.14,0,1.9,0,M.white);const ring=new T.Mesh(new T.TorusGeometry(1.05,.07,5,32),new T.MeshBasicMaterial({color:p.type===0?0xff6b7b:0xffce77,transparent:true,opacity:.9}));ring.rotation.x=-Math.PI/2;ring.position.y=.12;g.add(ring);p.mesh=g;p.ring=ring;const beam=new T.Mesh(new T.CylinderGeometry(.1,.85,8,14,1,true),new T.MeshBasicMaterial({color:p.type===0?0xff7882:0xffd48a,transparent:true,opacity:.11,depthWrite:false,side:T.DoubleSide}));beam.position.y=4;g.add(beam);}
const vehicle=new T.Group();scene.add(vehicle);vehicle.position.set(0,.09,0);
const shadow=new T.Mesh(new T.CircleGeometry(2.25,22),new T.MeshBasicMaterial({color:0x1c4857,transparent:true,opacity:.16,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.015;vehicle.add(shadow);
let ambulanceLoaded=false,modelError='';
try{
  new FBXLoader().load('Ambulance.fbx',model=>{
    const bounds=new T.Box3().setFromObject(model),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());
    model.position.sub(center);model.position.y+=size.y/2;model.scale.setScalar(3.65/Math.max(size.x,size.y,size.z));
    vehicle.add(model);ambulanceLoaded=true;
    model.traverse(m=>{if(m.isMesh){m.material.side=T.DoubleSide;m.material.needsUpdate=true}});
    $('fine').textContent='Your own ambulance model is on the road.';
    $('start').disabled=false;$('start').textContent='START THE SHIFT →';
  },undefined,e=>{modelError=String(e);$('description').textContent='The ambulance model could not load. Reload to try again.';$('start').disabled=true;console.error(e)});
}catch(e){modelError=String(e);$('start').disabled=true}
const redLamp=ball(vehicle,.23,-.47,2.51,-.15,new T.MeshBasicMaterial({color:0xff5a64}));
const blueLamp=ball(vehicle,.23,.47,2.51,-.15,new T.MeshBasicMaterial({color:0x69d8ff}));
const redLight=new T.PointLight(0xff555d,2,8);redLight.position.copy(redLamp.position);vehicle.add(redLight);
const blueLight=new T.PointLight(0x59c7ff,2,8);blueLight.position.copy(blueLamp.position);vehicle.add(blueLight);
const arrow=new T.Group();scene.add(arrow);const arrowMat=new T.MeshBasicMaterial({color:0xffd273,transparent:true,opacity:.9,depthWrite:false});
const arrowHead=new T.Mesh(new T.ConeGeometry(.55,1.1,6),arrowMat);arrowHead.rotation.x=Math.PI/2;arrow.add(arrowHead);
const arrowShaft=box(arrow,.17,.1,1.5,0,0,.95,arrowMat);
const particles=[];function burst(x,z,color,n=10,high=1){for(let i=0;i<n;i++){const mesh=ball(scene,.07+rnd()*.11,x,.6+rnd()*high,z,new T.MeshBasicMaterial({color,transparent:true,opacity:1}),0);particles.push({mesh,vx:(rnd()-.5)*5,vy:1+rnd()*3,vz:(rnd()-.5)*5,life:.7+rnd()*.5})}}
const cars=[];const carColors=[0x6ca7bd,0xe6ad7b,0xe79a96,0x8cc4a0,0xede3bd];
function createCar(i){const g=new T.Group();scene.add(g);const isX=i%2===0,r=roads[1+Math.floor(rnd()*5)];let pos=-48+rnd()*96;g.position.set(isX?pos:r,.09,isX?r:pos);g.rotation.y=isX?Math.PI/2:0;let body=mat(carColors[i%carColors.length]);box(g,1.6,.7,2.6,0,.48,0,body);box(g,1.3,.48,1.35,0,1.02,-.1,M.white);for(const x of [-.82,.82])for(const z of [-.75,.75]){const tire=new T.Mesh(new T.CylinderGeometry(.32,.32,.18,8),M.dark);tire.rotation.z=Math.PI/2;tire.position.set(x,.32,z);g.add(tire)}let o={g,isX,dir:i%4<2?1:-1,speed:2.3+rnd()*2.2,slowed:0,cleared:0};cars.push(o)}for(let i=0;i<13;i++)createCar(i);
let state='intro',shiftTime=100+permanent.upgrades.shift*12,saved=0,shiftStars=0,combo=0,patients=[],cargo=[],target=null,charge=1,sirenTimer=0,boostTimer=0,ring=null,greenLinks=[],last=performance.now(),stick={x:0,y:0},keys={},callsMade=0,callTimer=0,toastTimer=0,hitTimer=0,walkTime=0;
const districts=[
  {name:'HARBOR MORNING',sky:0x91ced8,light:0xffedcf,hemi:1.65,sun:2.2},
  {name:'GOLDEN HOUR',sky:0xe1b19c,light:0xffbd84,hemi:1.38,sun:2.75},
  {name:'BLUE HOUR',sky:0x6b9bb3,light:0x98bbff,hemi:1.35,sun:1.55}
];
function setDistrict(){const d=districts[(permanent.shift-1)%districts.length];scene.background.set(d.sky);scene.fog.color.set(d.sky);sun.color.set(d.light);sun.intensity=d.sun;hemi.intensity=d.hemi;$('district').textContent=`${d.name} · SHIFT ${String(permanent.shift).padStart(2,'0')}`}
let audio;function tone(freq,dur=.12,type='sine',gain=.05,at=0){try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();let o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(gain,audio.currentTime+at);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+at+dur);o.connect(g);g.connect(audio.destination);o.start(audio.currentTime+at);o.stop(audio.currentTime+at+dur+.02)}catch{}}
function melody(up=true){let notes=up?[523,659,784,1046]:[392,330,262];notes.forEach((n,i)=>tone(n,.18,'triangle',.04,i*.08))}
function toast(t){const e=$('callout');e.textContent=t;e.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove('show'),1400)}
function flash(){const e=$('fanfare');e.classList.remove('on');void e.offsetWidth;e.classList.add('on')}
function randomRoadPoint(){let p={x:roads[Math.floor(rnd()*7)],z:roads[Math.floor(rnd()*7)]};if(Math.abs(p.x-vehicle.position.x)<12&&Math.abs(p.z-vehicle.position.z)<12)return randomRoadPoint();if(dist(p,hospitalStop)<8)return randomRoadPoint();return p}
const names=['CRITICAL','INJURED','LOST CHILD'];
function makeCall(){let type=callsMade%3;let p={...randomRoadPoint(),type,id:++callsMade,life:[24,38,46][type]+permanent.upgrades.medic*6+rnd()*7,done:false};patientMesh(p);patients.push(p);if(!target)target=p;renderCalls();toast('NEW EMERGENCY · CHOOSE A CALL');tone(730,.18,'triangle',.035)}
function removePatient(p){p.done=true;scene.remove(p.mesh);patients=patients.filter(q=>q!==p);if(target===p)target=null;renderCalls()}
function renderCalls(){const wrap=$('calls');wrap.innerHTML='';let items=[];if(cargo.length)items.push({hospital:true});items.push(...patients.filter(p=>!p.done).slice(0,cargo.length?2:3));while(items.length<3)items.push({empty:true});for(const p of items){let b=document.createElement('button');b.className='call'+(target===p||p.hospital&&target==='hospital'?' active':'');if(p.empty){b.innerHTML='<span class="emoji">✦</span><b>STANDBY</b><small>—</small>';b.disabled=true}else if(p.hospital){b.innerHTML='<span class="emoji">🏥</span><b>HOSPITAL</b><small>DELIVER '+cargo.length+'</small>';b.onclick=()=>{target='hospital';renderCalls();tone(540,.08)};}else{b.innerHTML=`<span class="emoji">${['❤️','🩹','⭐'][p.type]}</span><b>${names[p.type]}</b><small>${Math.ceil(p.life)}s LEFT</small>`;b.onclick=()=>{target=p;renderCalls();tone(540,.08)}}wrap.append(b)}}
function newShift(){state='playing';shiftTime=100+permanent.upgrades.shift*12;saved=0;shiftStars=0;combo=0;cargo=[];patients.forEach(p=>scene.remove(p.mesh));patients=[];vehicle.position.set(0,.09,0);vehicle.rotation.y=0;target=null;charge=1;sirenTimer=0;boostTimer=0;hitTimer=0;callsMade=0;callTimer=0;for(let i=0;i<3;i++)makeCall();target=patients[0];renderCalls();$('overlay').classList.add('hidden');setDistrict();toast('DRIVE TO A GLOWING BEACON');tone(523,.15);tone(784,.25,'triangle',.05,.13)}
function finishShift(){state='result';permanent.stars+=shiftStars;permanent.best=Math.max(permanent.best,saved);permanent.shift++;store();$('overlay').classList.remove('hidden');$('eyebrow').textContent=saved>=7?'LEGENDARY RESCUE RUN':saved>=4?'THE CITY CHEERS FOR YOU':'ANOTHER SHIFT AWAITS';$('title').innerHTML=`${saved} LIVES<br>SAVED`; $('description').textContent=`${shiftStars} stars earned · Best shift: ${permanent.best} lives. Every new shift shuffles the calls and traffic.`;$('how').style.display='none';$('illustration').style.display='none';$('start').textContent='NEXT SHIFT →';$('fine').textContent=`TOTAL STARS: ${permanent.stars} · UPGRADES STAY WITH YOU`;renderUpgrades();melody(saved>=3)}
const upgradeTypes=[['battery','⚡','FASTER SIREN',75],['shift','⏱','LONGER SHIFT',100],['medic','❤️','MORE PATIENT TIME',110]];
function renderUpgrades(){const box=$('upgradeBox');box.innerHTML='';for(const [id,icon,name,base] of upgradeTypes){let level=permanent.upgrades[id],cost=base*(level+1);let b=document.createElement('button');b.className='upgrade';b.innerHTML=`<i>${icon}</i><b>${name} · LV ${level}</b><em>${cost} ★</em>`;b.disabled=permanent.stars<cost||level>=5;b.onclick=()=>{permanent.stars-=cost;permanent.upgrades[id]++;store();renderUpgrades();melody();updateHUD()};box.append(b)}}
function updateHUD(){$('saved').textContent=saved;$('stars').textContent=state==='playing'?shiftStars:permanent.stars;$('timebar').style.width=clamp(shiftTime/(100+permanent.upgrades.shift*12)*100,0,100)+'%';$('cargo').textContent=cargo.length?`PATIENTS ON BOARD · ${cargo.length}/2`:'EMPTY · 0/2';$('charge').textContent=charge>=.999?'READY':`${Math.floor(charge*100)}%`;$('siren').classList.toggle('ready',charge>=.999);$('siren').disabled=charge<.999||state!=='playing';let active=target==='hospital'?hospitalStop:target&&target.x!==undefined?target:null;if(active){$('targetName').textContent=target==='hospital'?'HOSPITAL':names[target.type];$('targetDistance').textContent=Math.ceil(dist(vehicle.position,active))+'m TO GO';$('compass').classList.add('on');let dx=active.x-vehicle.position.x,dz=active.z-vehicle.position.z;let angle=Math.atan2(dx,-dz)*180/Math.PI;let arrows=['↑','↗','→','↘','↓','↙','←','↖'];$('compass').textContent=arrows[(Math.round(angle/45)+8)%8]+' '+Math.ceil(Math.hypot(dx,dz))+'m'}else{$('targetName').textContent='CHOOSE A CALL';$('targetDistance').textContent='THEN DRIVE TO THE BEACON';$('compass').classList.remove('on')}}
function pointToSegment(p,a,b){let dx=b.x-a.x,dz=b.z-a.z,t=clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz),0,1);return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz)}
function siren(){
  if(state!=='playing'||charge<.999)return;charge=0;sirenTimer=1.05;boostTimer=2.8;
  ring=new T.Mesh(new T.RingGeometry(.2,.39,48),new T.MeshBasicMaterial({color:0x9dedf0,transparent:true,opacity:.8,side:T.DoubleSide,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.copy(vehicle.position);ring.position.y=.18;scene.add(ring);
  const start={x:Math.round(vehicle.position.x/18)*18,z:Math.round(vehicle.position.z/18)*18};
  let dest=target==='hospital'?hospitalStop:target&&target.x!==undefined?target:{x:start.x,z:start.z-18};
  let dx=dest.x-start.x,dz=dest.z-start.z,first=Math.abs(dx)>Math.abs(dz)?'x':'z',second=first==='x'?'z':'x';
  let points=[start];for(const axis of [first,second,first]){let prev=points.at(-1),delta=axis==='x'?dest.x-prev.x:dest.z-prev.z;if(Math.abs(delta)<1)continue;let next={...prev,[axis]:clamp(prev[axis]+Math.sign(delta)*18,-54,54)};if(next.x!==prev.x||next.z!==prev.z)points.push(next)}
  let segments=[];if(dist(vehicle.position,start)<7)for(let i=0;i<points.length-1;i++){let a=points[i],b=points[i+1],m=new T.Mesh(new T.BoxGeometry(Math.abs(b.x-a.x)+1.5,.025,Math.abs(b.z-a.z)+1.5),new T.MeshBasicMaterial({color:0x60f5c0,transparent:true,opacity:.35,depthWrite:false}));m.position.set((a.x+b.x)/2,.13,(a.z+b.z)/2);scene.add(m);greenLinks.push({mesh:m,life:3});segments.push([a,b]);for(const light of trafficLights)if(Math.hypot(light.x-b.x,light.z-b.z)<1||Math.hypot(light.x-a.x,light.z-a.z)<1)light.timer=3}
  let nearby=0;for(const c of cars){if(dist(c.g.position,vehicle.position)<10||segments.some(([a,b])=>pointToSegment(c.g.position,a,b)<4.2)){c.cleared=3.5;c.slowed=0;nearby++}}
  let reward=Math.round(nearby*12*(1+Math.min(combo,5)*.2)+segments.length*15);shiftStars+=reward;
  toast(segments.length?`GREEN CORRIDOR ×${segments.length} · +${reward} ★`:nearby?`TRAFFIC CLEARED · +${reward} ★`:'SIREN WAVE!');burst(vehicle.position.x,vehicle.position.z,0xa3f9e8,14);navigator.vibrate?.([25,30,25]);tone(660,.32,'sawtooth',.03);tone(880,.28,'sawtooth',.025,.16);updateHUD();
}
const startButton=$('start');startButton.disabled=true;startButton.textContent='LOADING YOUR AMBULANCE...';startButton.onclick=()=>{if(!ambulanceLoaded)return;newShift()};$('siren').onclick=siren;
const stickEl=$('stick'),nub=$('nub');let pointer=null;
function setStick(e){let r=stickEl.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2,lim=r.width*.34,mag=Math.hypot(dx,dy),scale=mag>lim?lim/mag:1;dx*=scale;dy*=scale;stick.x=dx/lim;stick.y=dy/lim;nub.style.setProperty('--jx',dx+'px');nub.style.setProperty('--jy',dy+'px')}
stickEl.onpointerdown=e=>{pointer=e.pointerId;stickEl.setPointerCapture(pointer);setStick(e)};stickEl.onpointermove=e=>{if(e.pointerId===pointer)setStick(e)};const release=e=>{if(e.pointerId!==pointer)return;pointer=null;stick.x=stick.y=0;nub.style.setProperty('--jx','0px');nub.style.setProperty('--jy','0px')};stickEl.onpointerup=release;stickEl.onpointercancel=release;
addEventListener('keydown',e=>{keys[e.code]=true;if(e.code==='Space'){e.preventDefault();siren()}});addEventListener('keyup',e=>{keys[e.code]=false});
function blocked(x,z){if(Math.abs(x)>58||Math.abs(z)>58)return true;let nx=Math.round(x/18)*18,nz=Math.round(z/18)*18;return Math.abs(x-nx)>5.75&&Math.abs(z-nz)>5.75}
let hudTimer=0,callListTimer=0;
function update(dt,now){
  if(state!=='playing')return;
  shiftTime-=dt;if(shiftTime<=0){shiftTime=0;finishShift();return}
  let sx=stick.x+(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0);
  let sy=stick.y+(keys.KeyS||keys.ArrowDown?1:0)-(keys.KeyW||keys.ArrowUp?1:0);
  let mag=Math.hypot(sx,sy),moving=mag>.08;
  if(moving){sx/=Math.max(1,mag);sy/=Math.max(1,mag);let speed=(hitTimer>0?4.3:8.8)*(boostTimer>0?1.4:1);let x=vehicle.position.x+sx*speed*dt,z=vehicle.position.z+sy*speed*dt;if(!blocked(x,vehicle.position.z))vehicle.position.x=x;if(!blocked(vehicle.position.x,z))vehicle.position.z=z;let wanted=Math.atan2(sx,sy),diff=Math.atan2(Math.sin(wanted-vehicle.rotation.y),Math.cos(wanted-vehicle.rotation.y));vehicle.rotation.y+=diff*Math.min(1,dt*11);}
  vehicle.position.y=.09+Math.sin(now*.012)*.025;
  hitTimer=Math.max(0,hitTimer-dt);
  charge=Math.min(1,charge+dt/(8.5-permanent.upgrades.battery*.85));
  sirenTimer=Math.max(0,sirenTimer-dt);
  boostTimer=Math.max(0,boostTimer-dt);
  for(const light of trafficLights){light.timer=Math.max(0,light.timer-dt);light.red.visible=light.timer<=0;light.green.visible=light.timer>0}
  for(let i=greenLinks.length-1;i>=0;i--){let link=greenLinks[i];link.life-=dt;link.mesh.material.opacity=.35*clamp(link.life/3,0,1);if(link.life<=0){scene.remove(link.mesh);link.mesh.geometry.dispose();link.mesh.material.dispose();greenLinks.splice(i,1)}}
  if(ring){let elapsed=1.05-sirenTimer;ring.position.x=vehicle.position.x;ring.position.z=vehicle.position.z;ring.scale.setScalar(1+elapsed*28);ring.material.opacity=.78*(1-elapsed/1.05);if(sirenTimer<=0){scene.remove(ring);ring.geometry.dispose();ring.material.dispose();ring=null}}
  for(const c of cars){c.cleared=Math.max(0,c.cleared-dt);let v=c.speed*(c.cleared>0?.18:1)*c.dir*dt;if(c.isX)c.g.position.x+=v;else c.g.position.z+=v;let a=c.isX?'x':'z';if(c.g.position[a]>59)c.g.position[a]=-59;if(c.g.position[a]<-59)c.g.position[a]=59;c.g.children[0].material.emissive?.set(c.cleared>0?0x3bdabd:0x000000);if(c.cleared<=0&&dist(c.g.position,vehicle.position)<2.2&&hitTimer===0){hitTimer=1.3;combo=0;shiftTime=Math.max(0,shiftTime-3);toast('BUMP! −3 SECONDS');burst(vehicle.position.x,vehicle.position.z,0xffd59e,8);tone(130,.2,'square',.05);navigator.vibrate?.(35)}}
  callTimer+=dt;if(callTimer>8&&patients.length<3){callTimer=0;makeCall()}
  for(const p of [...patients]){p.life-=dt;p.mesh.position.y=Math.sin(now*.004+p.id)*.12;p.ring.rotation.z+=dt*.6;p.ring.scale.setScalar(1+Math.sin(now*.005+p.id)*.08);if(p.life<=0){removePatient(p);combo=0;toast('CALL EXPIRED · KEEP MOVING');tone(240,.25,'triangle',.03);if(!target)target=cargo.length?'hospital':patients[0]||null;renderCalls()}else if(dist(vehicle.position,p)<2.8&&cargo.length<2){cargo.push(p);let b=[85,45,35][p.type]+Math.round(p.life);shiftStars+=b;combo++;removePatient(p);toast(`${names[p.type]} PICKUP · +${b} ★`);burst(p.x,p.z,0xffe59b,20,2);flash();tone(523,.12,'triangle',.05);tone(784,.15,'triangle',.05,.1);navigator.vibrate?.(20);target=cargo.length===2?'hospital':patients[0]||'hospital';renderCalls()}}
  if(cargo.length&&dist(vehicle.position,hospitalStop)<4.5){let count=cargo.length,critical=cargo.some(p=>p.type===0);cargo=[];saved+=count;let reward=80*count+Math.min(combo,7)*30+(critical?60:0);shiftStars+=reward;shiftTime=Math.min(100+permanent.upgrades.shift*12,shiftTime+Math.min(10,count*3+(critical?4:0)));charge=1;toast(`SAVED ${count} · +${reward} ★ · +TIME`);burst(vehicle.position.x,vehicle.position.z,0x9df9d5,26,3);flash();melody();navigator.vibrate?.([15,40,35]);target=patients[0]||null;renderCalls()}
  if(target&&target!=='hospital'&&target.done)target=patients[0]||null;
  let dest=target==='hospital'?hospitalStop:target;if(dest&&dest.x!==undefined){let dx=dest.x-vehicle.position.x,dz=dest.z-vehicle.position.z,len=Math.hypot(dx,dz);arrow.position.set(vehicle.position.x+dx/len*4,.45,vehicle.position.z+dz/len*4);arrow.rotation.y=Math.atan2(dx,dz)}else arrow.position.y=-100;
  for(let i=particles.length-1;i>=0;i--){let p=particles[i];p.life-=dt;p.mesh.position.x+=p.vx*dt;p.mesh.position.y+=p.vy*dt;p.mesh.position.z+=p.vz*dt;p.vy-=dt*4;p.mesh.material.opacity=clamp(p.life,0,1);if(p.life<=0){scene.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();particles.splice(i,1)}}
  hudTimer+=dt;callListTimer+=dt;if(hudTimer>.12){updateHUD();hudTimer=0}if(callListTimer>1){renderCalls();callListTimer=0}
}
function resize(){let w=$('view').clientWidth,h=$('view').clientHeight;renderer.setSize(w,h,false);let viewH=mobile?20:23,aspect=w/h;camera.left=-viewH*aspect;camera.right=viewH*aspect;camera.top=viewH;camera.bottom=-viewH;camera.updateProjectionMatrix()}
addEventListener('resize',resize);resize();
function frame(t){requestAnimationFrame(frame);let dt=Math.min((t-last)/1000,.04);last=t;update(dt,t);redLamp.material.color.set((Math.floor(t/250)%2)?0xff333c:0x70202a);blueLamp.material.color.set((Math.floor(t/250)%2)?0x1d506c:0x49c7ff);redLight.intensity=Math.floor(t/250)%2?2.2:.1;blueLight.intensity=Math.floor(t/250)%2?.1:2.2;let camTarget=new T.Vector3(vehicle.position.x,0,vehicle.position.z);let camPos=new T.Vector3(vehicle.position.x,18,vehicle.position.z+25);camera.position.lerp(camPos,.075);camera.lookAt(camTarget.x,0,camTarget.z-4);renderer.render(scene,camera)}requestAnimationFrame(frame);
updateHUD();
if(location.hostname==='127.0.0.1'||location.hostname==='localhost')window.__qa=()=>({state,loaded:ambulanceLoaded,error:modelError,saved,shiftStars,patients:patients.map(p=>({x:p.x,z:p.z,life:p.life})),cargo:cargo.length,charge,position:vehicle.position.toArray(),hospital:hospitalStop});

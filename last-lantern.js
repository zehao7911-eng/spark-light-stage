(()=>{'use strict';
const $=id=>document.getElementById(id), V=THREE.Vector3, scene=new THREE.Scene();
scene.background=new THREE.Color(0x14111b);scene.fog=new THREE.FogExp2(0x16111c,.012);
const camera=new THREE.PerspectiveCamera(69,innerWidth/innerHeight,.08,135);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);
renderer.outputEncoding=THREE.sRGBEncoding;
if(THREE.ACESFilmicToneMapping!==undefined){renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25}
$('game').appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0x8094b5,0x321c1d,.85));
const moon=new THREE.DirectionalLight(0x91b6df,.72);moon.position.set(-8,17,1);scene.add(moon);
const warm=new THREE.PointLight(0xffa55c,3.2,18,2);warm.position.set(.1,3.1,0);scene.add(warm);
const doorLight=new THREE.PointLight(0x91b7f9,.5,11,2);doorLight.position.set(0,4,-7);scene.add(doorLight);
const materials={brass:new THREE.MeshStandardMaterial({color:0x8d5c31,metalness:.82,roughness:.31}),bright:new THREE.MeshStandardMaterial({color:0xe4af62,metalness:.7,roughness:.25,emissive:0x693314,emissiveIntensity:.17}),dark:new THREE.MeshStandardMaterial({color:0x251920,metalness:.35,roughness:.75}),stone:new THREE.MeshStandardMaterial({color:0x35404b,metalness:.22,roughness:.83}),glass:new THREE.MeshStandardMaterial({color:0x9fc7e3,metalness:.2,roughness:.15,transparent:true,opacity:.43,emissive:0x356795,emissiveIntensity:.25}),glow:new THREE.MeshBasicMaterial({color:0xffbf68,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false})};
const game={ready:false,playing:false,phase:0,ticket:false,drawerOpen:false,note:false,align:false,angle:.62,goal:0,locked:false,doorOpen:false,entered:false,ending:false,yaw:0,pitch:0,keys:{},interaction:'',audio:null,last:performance.now(),messageTimer:0,clock:0,shake:0};
const world=new THREE.Group();scene.add(world);camera.position.set(0,1.65,5.7);
const doorGroup=new THREE.Group(),second=new THREE.Group(),particles=[],ghosts=[],animated=[];scene.add(doorGroup,second);
let lampMesh,shadow,beam,portal,doorLeaves=[],ticketMesh,drawerPanel,drawerGlow,finalLamp,relic,needle=$('needle');
function box(parent,w,h,d,mat,x,y,z){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);parent.add(m);return m}
function cyl(parent,r1,r2,h,mat,x,y,z,seg=20){const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg),mat);m.position.set(x,y,z);parent.add(m);return m}
function sphere(parent,r,mat,x,y,z,seg=16){const m=new THREE.Mesh(new THREE.SphereGeometry(r,seg,seg),mat);m.position.set(x,y,z);parent.add(m);return m}
function torus(parent,r,t,mat,x,y,z){const m=new THREE.Mesh(new THREE.TorusGeometry(r,t,8,48),mat);m.position.set(x,y,z);parent.add(m);return m}
function makeGlow(color='#ffc989'){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d'),gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,color);gr.addColorStop(.25,color+'bb');gr.addColorStop(1,'#00000000');g.fillStyle=gr;g.fillRect(0,0,128,128);const t=new THREE.CanvasTexture(c);return new THREE.SpriteMaterial({map:t,color:0xffffff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})}
const goldGlow=makeGlow('#ffc474'),blueGlow=makeGlow('#a4dff8');
function sprite(parent,x,y,z,size,mat){const s=new THREE.Sprite(mat);s.position.set(x,y,z);s.scale.set(size,size,size);parent.add(s);return s}
function point(parent,x,y,z,color,intensity,range){const p=new THREE.PointLight(color,intensity,range,2);p.position.set(x,y,z);parent.add(p);return p}
function ornament(parent,x,y,z){torus(parent,.4,.045,materials.brass,x,y,z);for(let i=0;i<8;i++){const a=i*Math.PI/4;const s=sphere(parent,.04,materials.bright,x+Math.cos(a)*.4,y+Math.sin(a)*.4,z+.01,8);s.scale.z=.45}}
function buildDoor(){doorGroup.position.set(0,0,-6.85);doorGroup.scale.x=.77;
 box(doorGroup,4.2,5.8,.16,materials.dark,0,2.9,0);
 box(doorGroup,4.42,.19,.28,materials.brass,0,5.85,.12);
 for(const x of [-2.14,2.14])box(doorGroup,.16,5.85,.29,materials.brass,x,2.92,.14);
 const panelMat=new THREE.MeshStandardMaterial({color:0x3a211d,metalness:.18,roughness:.84});
 for(let i=0;i<2;i++){const hinge=new THREE.Group();hinge.position.set(i?2.03:-2.03,0,.15);doorGroup.add(hinge);doorLeaves.push(hinge);const side=i?-1:1;box(hinge,2,5.46,.18,panelMat,side*1,2.75,0);for(const yy of [1.05,3.6]){box(hinge,1.66,1.95,.04,materials.brass,side*1,yy,.12);box(hinge,1.53,1.82,.05,panelMat,side*1,yy,.16)}cyl(hinge,.1,.1,.13,materials.bright,side*1.8,2.75,.23,12).rotation.x=Math.PI/2}
 ornament(doorGroup,0,4.8,.28);
 const rune=new THREE.MeshBasicMaterial({color:0xf4ca86,transparent:true,opacity:.52,blending:THREE.AdditiveBlending,depthWrite:false});
 const key=torus(doorGroup,.43,.035,rune,0,3.1,.34);key.scale.y=1.15;
 box(doorGroup,.08,.4,.04,rune,0,2.54,.35);box(doorGroup,.26,.06,.04,rune,.09,2.39,.35);
 const pc=document.createElement('canvas');pc.width=256;pc.height=512;const pg=pc.getContext('2d'),pgd=pg.createRadialGradient(128,220,20,128,250,340);pgd.addColorStop(0,'#b9d5db');pgd.addColorStop(.24,'#415c75');pgd.addColorStop(.6,'#1c263f');pgd.addColorStop(1,'#090b1c');pg.fillStyle=pgd;pg.fillRect(0,0,256,512);for(let i=0;i<110;i++){pg.fillStyle=`rgba(220,233,255,${Math.random()*.75})`;pg.beginPath();pg.arc(Math.random()*256,Math.random()*512,Math.random()*1.8,0,Math.PI*2);pg.fill()}
 portal=new THREE.Mesh(new THREE.PlaneGeometry(3.93,5.39),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(pc),transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));portal.position.set(0,2.75,.1);doorGroup.add(portal);
 const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const g=canvas.getContext('2d');let grad=g.createRadialGradient(128,128,5,128,128,125);grad.addColorStop(0,'rgba(255,222,151,.80)');grad.addColorStop(.48,'rgba(255,181,91,.25)');grad.addColorStop(1,'rgba(255,120,50,0)');g.fillStyle=grad;g.fillRect(0,0,256,256);g.globalCompositeOperation='destination-out';g.fillStyle='#000';g.beginPath();g.arc(128,128,35,0,Math.PI*2);g.fill();g.globalCompositeOperation='source-over';g.strokeStyle='#ffdfad';g.lineWidth=6;g.beginPath();g.arc(128,128,35,0,Math.PI*2);g.stroke();g.beginPath();g.moveTo(128,161);g.lineTo(128,191);g.lineTo(148,191);g.stroke();
 shadow=new THREE.Mesh(new THREE.PlaneGeometry(2.35,2.35),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(canvas),transparent:true,opacity:.74,depthWrite:false,blending:THREE.AdditiveBlending}));shadow.position.set(1,3.1,-6.36);scene.add(shadow);
 const beamMat=new THREE.MeshBasicMaterial({color:0xffac58,transparent:true,opacity:.07,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});beam=new THREE.Mesh(new THREE.CylinderGeometry(.12,1.25,1,28,1,true),beamMat);scene.add(beam);
}
function buildDesk(){const desk=new THREE.Group();desk.position.set(4.0,0,3.15);scene.add(desk);
 box(desk,2.7,.22,1.38,materials.dark,0,1.36,0);box(desk,2.9,.08,1.52,materials.brass,0,1.48,0);for(const x of [-1.17,1.17])for(const z of [-.5,.5])box(desk,.13,1.34,.13,materials.brass,x,.68,z);
 for(let i=0;i<2;i++){const x=i?.59:-.59;if(i===0){drawerPanel=new THREE.Group();drawerPanel.position.set(x,0,.73);desk.add(drawerPanel);box(drawerPanel,1.12,.53,.08,materials.brass,0,1.01,0);box(drawerPanel,1.02,.44,.09,materials.dark,0,1.01,.07);sphere(drawerPanel,.055,materials.bright,0,1.01,.14);box(drawerPanel,1.04,.07,.58,materials.dark,0,.82,-.24);for(const side of [-.5,.5])box(drawerPanel,.06,.35,.58,materials.brass,side,1.04,-.24)}else{box(desk,1.12,.53,.08,materials.brass,x,1.01,.73);box(desk,1.02,.44,.09,materials.dark,x,1.01,.79);sphere(desk,.055,materials.bright,x,1.01,.86)}}
 box(desk,.59,.04,.43,materials.stone,-.75,1.58,-.25);cyl(desk,.12,.16,.18,materials.brass,1,1.62,-.31);sprite(desk,1,1.74,-.31,.7,goldGlow);point(desk,1,1.8,-.31,0xffb76d,1.2,3);
 ticketMesh=new THREE.Group();ticketMesh.position.set(0,1.1,-.2);drawerPanel.add(ticketMesh);
 const paper=new THREE.MeshStandardMaterial({color:0xd7b382,roughness:.9,side:THREE.DoubleSide,emissive:0x492713,emissiveIntensity:.2});box(ticketMesh,.77,.018,.34,paper,0,0,0);for(let i=0;i<3;i++)box(ticketMesh,.05,.02,.13,materials.brass,-.22+i*.21,.02,0);ticketMesh.rotation.y=-.2;
 drawerGlow=sprite(drawerPanel,0,1.2,-.18,.8,goldGlow);
}
function buildGlassRoof(){const roofMat=new THREE.MeshStandardMaterial({color:0x52667b,metalness:.7,roughness:.28,transparent:true,opacity:.23,side:THREE.DoubleSide,depthWrite:false});
 for(let i=-4;i<=4;i++){const x=i*1.85;const a=box(scene,.055,.065,16.5,materials.brass,x,8,-.3);a.material=materials.brass}
 for(let i=0;i<8;i++){box(scene,16,.055,.05,materials.brass,0,8,-7.4+i*2.1)}
 const glass=new THREE.Mesh(new THREE.PlaneGeometry(16,16),roofMat);glass.rotation.x=-Math.PI/2;glass.position.set(0,8.1,-.3);scene.add(glass);
}
function buildSecond(){second.visible=false;
 const zBase=-35;
 const floorMat=new THREE.MeshStandardMaterial({color:0x2e3445,metalness:.38,roughness:.55});
 box(second,10,.42,40,floorMat,0,-.23,zBase);
 const tileA=new THREE.MeshStandardMaterial({color:0x343c4e,metalness:.46,roughness:.48}),tileB=new THREE.MeshStandardMaterial({color:0x263344,metalness:.5,roughness:.42});
 for(let iz=0;iz<36;iz++)for(let ix=0;ix<9;ix++){const tile=box(second,.91,.015,.88,(ix+iz)%2?tileA:tileB,-4+ix,-.005,-16-iz*1.1);tile.rotation.y=((ix*iz)%3-1)*.006}
 for(const x of [-3.52,3.52])box(second,.045,.018,39,materials.bright,x,.025,zBase);
 for(let i=0;i<24;i++){const z=-16.5-i*1.6;for(const x of [-3.5,3.5])cyl(second,.045,.045,.023,materials.bright,x,.05,z,8)}
 for(let i=0;i<20;i++){const z=-16-i*1.95;box(second,9.6,.025,.07,materials.brass,0,.012,z);if(i%2===0){for(const x of [-4.58,4.58])cyl(second,.08,.11,1.4,materials.brass,x,.7,z,8)}}
 for(const x of [-5.15,5.15]){box(second,.14,.22,40,materials.brass,x,.16,zBase);box(second,.23,2.2,40,materials.dark,x,-1.3,zBase);for(let i=0;i<12;i++){let z=-16-i*3.4;cyl(second,.16,.2,3,materials.brass,x,1.52,z,8);sphere(second,.26,materials.glass,x,3.03,z);point(second,x,3,z,0x8ac3ff,.5,5)}}
 for(let i=0;i<6;i++){const z=-18-i*6;const arc=new THREE.Group();second.add(arc);box(arc,.32,6,.5,materials.stone,-5,3,z);box(arc,.32,6,.5,materials.stone,5,3,z);box(arc,10.2,.34,.52,materials.brass,0,6.05,z);for(const x of [-3.3,0,3.3]){cyl(arc,.04,.04,.7,materials.brass,x,5.6,z);sphere(arc,.22,materials.glass,x,5.18,z)}
  const pts=[];for(let j=0;j<=16;j++){const t=j/16;pts.push(new V(-4.9+9.8*t,6.05+1.45*Math.sin(Math.PI*t),z+.02))}const curve=new THREE.CatmullRomCurve3(pts),arch=new THREE.Mesh(new THREE.TubeGeometry(curve,32,.095,7,false),materials.bright);arc.add(arch);ornament(arc,0,6.15,z+.28);animated.push({object:arc,type:'arch',index:i})}
 for(let i=0;i<8;i++){const z=-17-i*2.1;const step=box(second,7.4,.16,1.55,materials.stone,0,-.02,z);step.position.y=-3;step.userData.targetY=-.02;animated.push({object:step,type:'step',index:i})}
 // The last station's circular moon window and dormant lantern.
 // A ghost train waits beside the platform, beyond the railing.
 const train=new THREE.Group();train.position.set(-8.35,0,-36);second.add(train);
 const trainBody=new THREE.MeshStandardMaterial({color:0x223e4e,metalness:.55,roughness:.42}),windowMat=new THREE.MeshStandardMaterial({color:0xb4daec,metalness:.15,roughness:.12,emissive:0x74add2,emissiveIntensity:.6});
 box(train,4.5,3.3,28,trainBody,0,2.4,0);box(train,4.7,.21,28.4,materials.brass,0,4.1,0);box(train,4.6,.12,28.2,materials.brass,0,.75,0);
 for(let i=0;i<8;i++){const z=-12.2+i*3.45;box(train,.035,1.25,2.15,windowMat,2.28,2.8,z);box(train,.05,.055,2.35,materials.bright,2.31,3.45,z);box(train,.05,.055,2.35,materials.bright,2.31,2.15,z);for(const zz of [-1.15,1.15])box(train,.05,1.4,.06,materials.bright,2.31,2.8,z+zz);sprite(train,2.37,2.85,z,2.2,blueGlow);point(train,1.8,2.7,z,0x7bc2eb,.3,5)}
 for(let i=0;i<10;i++){const z=-13.3+i*2.8;const wheel=cyl(train,.4,.4,.17,materials.dark,1.75,.45,z,16);wheel.rotation.z=Math.PI/2;torus(train,.36,.045,materials.brass,1.85,.45,z).rotation.y=Math.PI/2}
 box(train,.13,.14,29,materials.bright,2.31,1.5,0);box(train,.13,.11,29,materials.bright,2.31,3.85,0);animated.push({object:train,type:'train',index:0});
 const wall=box(second,11,9,.35,materials.dark,0,4.5,-55);torus(second,3,.22,materials.brass,0,4.4,-54.75);
 const moonDisc=new THREE.Mesh(new THREE.CircleGeometry(2.75,64),new THREE.MeshBasicMaterial({color:0x7da4c8,side:THREE.DoubleSide}));moonDisc.position.set(0,4.4,-54.76);second.add(moonDisc);
 const clockHands=new THREE.Group();clockHands.position.set(0,4.4,-54.65);second.add(clockHands);box(clockHands,.085,1.47,.06,materials.dark,0,.7,0).rotation.z=.4;box(clockHands,.075,1.12,.06,materials.dark,.13,.45,.025).rotation.z=-.5;cyl(clockHands,.16,.16,.11,materials.bright,0,0,.08);
 for(let i=0;i<12;i++){const a=i*Math.PI/6,r=2.5;const mark=box(second,.095,.34,.05,materials.brass,Math.sin(a)*r,4.4+Math.cos(a)*r,-54.6);mark.rotation.z=-a}
 point(second,0,5,-53.6,0xa9d3f4,2.4,18);sprite(second,0,4.4,-54.2,8.5,blueGlow);
 for(let i=0;i<35;i++){const a=i*2.399,r=Math.sqrt(i/35)*2.6;sphere(second,.015+Math.random()*.025,materials.glow,Math.cos(a)*r,4.4+Math.sin(a)*r,-54.7,6)}
 cyl(second,1.2,1.65,.6,materials.stone,0,.3,-49.5);cyl(second,.9,1.18,.13,materials.brass,0,.65,-49.5);cyl(second,.23,.33,1.12,materials.brass,0,1.25,-49.5);finalLamp=sphere(second,.58,new THREE.MeshStandardMaterial({color:0x704728,metalness:.28,roughness:.36,emissive:0x622d0c,emissiveIntensity:.23}),0,2.04,-49.5,24);finalLamp.visible=false;
 relic=lampMesh.clone(true);relic.position.set(0,2.12,-49.5);relic.scale.setScalar(1.75);relic.rotation.y=-.3;second.add(relic);
 for(let i=0;i<3;i++){const ring=torus(second,.9+i*.12,.025,materials.bright,0,2.08,-49.5);ring.rotation.y=i*.65;ring.rotation.x=.28+i*.35}
 sprite(second,0,2.04,-49.5,2.2,goldGlow);point(second,0,2.2,-49.5,0xffc185,2.4,13);
 for(let i=0;i<65;i++){const z=-18-Math.random()*35,x=(Math.random()-.5)*8.6,y=.4+Math.random()*5;const s=sprite(second,x,y,z,.08+Math.random()*.22,i%5?blueGlow:goldGlow);particles.push({object:s,baseY:y,speed:.4+Math.random()*.8,offset:Math.random()*6.28,stage:2})}
}
function buildGhosts(){const places=[[3.7,2.3,3.2],[2.2,2.1,2],[.4,3.3,.5],[-1,2.6,-2],[-3.6,3.3,-5.7]];
 for(let i=0;i<places.length;i++){const [x,y,z]=places[i];const s=sprite(scene,x,y,z,.45,i<2?goldGlow:blueGlow);ghosts.push({object:s,x,y,z,index:i})}
 for(let i=0;i<75;i++){const x=(Math.random()-.5)*13,y=.5+Math.random()*6,z=(Math.random()-.5)*13;const s=sprite(scene,x,y,z,.055+Math.random()*.14,i%3?goldGlow:blueGlow);particles.push({object:s,baseY:y,speed:.25+Math.random()*.65,offset:Math.random()*6.28,stage:1})}
}
function updateBeam(){const x=Math.max(-6.2,Math.min(6.2,6.35*Math.tan(game.angle)));shadow.position.x=x;shadow.material.opacity=game.ticket?.78:.48;
 const start=new V(.1,2.65,0),end=new V(x,3.1,-6.38),dir=end.clone().sub(start);beam.position.copy(start).add(end).multiplyScalar(.5);beam.scale.set(1,dir.length(),1);beam.quaternion.setFromUnitVectors(new V(0,-1,0),dir.clone().normalize());
 if(lampMesh)lampMesh.rotation.y=game.angle-.62;needle.style.left=`${Math.max(3,Math.min(96,50+(game.angle-game.goal)*43))}%`;
}
function setObjective(v){$('objectiveText').textContent=v}function setChapter(v){$('chapter').textContent=v}
function message(v,time=2800){const e=$('centerMessage');e.textContent=v;e.classList.add('show');clearTimeout(game.messageTimer);game.messageTimer=setTimeout(()=>e.classList.remove('show'),time)}
function flash(a=.32){const f=$('flash');f.style.opacity=a;setTimeout(()=>f.style.opacity=0,80)}
function sound(freq=440,duration=.2,type='sine',gain=.08,slide=0){if(!game.audio)return;const ac=game.audio,o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(freq,ac.currentTime);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(30,freq+slide),ac.currentTime+duration);g.gain.setValueAtTime(.001,ac.currentTime);g.gain.exponentialRampToValueAtTime(gain,ac.currentTime+.02);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+duration);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+duration+.04)}
function chord(root){[1,1.25,1.5,2].forEach((m,i)=>setTimeout(()=>sound(root*m,.75,'sine',.045),i*140))}
function clickSound(){sound(125,.09,'triangle',.045,-50);setTimeout(()=>sound(310,.12,'sine',.03),45)}
function begin(){if(game.playing)return;game.playing=true;try{game.audio=new (window.AudioContext||window.webkitAudioContext)()}catch(_){}$('loading').classList.add('out');$('hud').classList.add('show');chord(196);message('The last night begins',2700);setTimeout(()=>$('loading').style.display='none',1050);try{renderer.domElement.requestPointerLock()}catch(_){}}
function showNote(){game.note=true;$('note').classList.add('show');document.exitPointerLock?.();clickSound();setObjective('Bring the ticket to the lantern.');message('A ticket from a forgotten journey');}
function closeNote(){game.note=false;$('note').classList.remove('show');try{renderer.domElement.requestPointerLock()}catch(_){}}
function interact(){if(!game.playing||game.note||game.ending)return;
 const a=game.interaction;
 if(a==='drawer'&&!game.drawerOpen){game.drawerOpen=true;setObjective('Take the last ticket.');message('Something was left behind.',2100);sound(130,.28,'triangle',.06,-65);return}
 if(a==='ticket'&&!game.ticket){game.ticket=true;ticketMesh.visible=false;drawerGlow.visible=false;showNote();return}
 if(a==='lamp'&&game.ticket&&!game.locked){game.align=true;document.exitPointerLock?.();$('align').style.display='block';setObjective('Aim the lantern at the door.');message('Turn the light. Find the lock.',2400);sound(220,.55,'sawtooth',.035,90);return}
 if(a==='door'&&game.locked&&!game.entered){enterPortal();return}
 if(a==='final'&&game.entered){finish();return}
}
function finishAlign(){if(!game.align)return;game.align=false;$('align').style.display='none';if(Math.abs(game.angle-game.goal)<.13){unlock()}else{message('The shadow misses the lock.',1700);sound(185,.22,'triangle',.045,-70)}try{renderer.domElement.requestPointerLock()}catch(_){}}
function unlock(){if(game.locked)return;game.locked=true;game.phase=1;setObjective('Step through the awakened door.');message('The station is waking.',3400);doorLight.color.setHex(0xffd395);doorLight.intensity=2;portal.material.opacity=1;game.shake=.12;flash(.43);chord(261.6);for(let i=0;i<26;i++){const x=(Math.random()-.5)*3.5,y=1+Math.random()*4,z=-6.6+Math.random()*.8;const s=sprite(scene,x,y,z,.2+Math.random()*.4,goldGlow);particles.push({object:s,baseY:y,speed:1+Math.random(),offset:Math.random()*6.28,stage:1})}}
function enterPortal(){game.entered=true;game.phase=2;game.align=false;message('Beyond the last departure',3700);setChapter('02 · Beyond the last departure');setObjective('Follow the lights to the last lantern.');flash(.95);game.shake=.21;chord(392);setTimeout(()=>{second.visible=true;camera.position.set(0,1.65,-16.2);game.yaw=0;game.pitch=0;scene.fog.density=.018;},350)}
function finish(){game.ending=true;flash(.95);chord(523.25);setTimeout(()=>{$('ending').classList.add('show');document.exitPointerLock?.()},800)}
function updateInteraction(){if(game.align||game.note||game.ending){$('prompt').textContent='';return}
 const pos=camera.position,forward=new V(Math.sin(game.yaw)*Math.cos(game.pitch),-Math.sin(game.pitch),-Math.cos(game.yaw)*Math.cos(game.pitch));let options=[];
 if(!game.entered){if(!game.ticket){if(!game.drawerOpen)options.push({name:'drawer',p:new V(3.41,1.04,4.0),label:'E  ·  OPEN THE DRAWER'});else options.push({name:'ticket',p:new V(3.41,1.14,4.36),label:'E  ·  TAKE THE TICKET'})}else if(!game.locked)options.push({name:'lamp',p:new V(.1,2.2,0),label:'E  ·  TURN THE LANTERN'});if(game.locked)options.push({name:'door',p:new V(0,2.8,-6.5),label:'E  ·  ENTER THE DOOR'})}else options.push({name:'final',p:new V(0,2,-49.5),label:'E  ·  RELIGHT THE STATION'});
 let best=null,score=0;for(const o of options){const v=o.p.clone().sub(pos),d=v.length(),dot=v.normalize().dot(forward),range=o.name==='door'?4.8:3.5;if(d<range&&dot>.64){const s=dot-.04*d;if(s>score){score=s;best=o}}}
 game.interaction=best?.name||'';$('prompt').textContent=best?.label||'';$('crosshair').classList.toggle('active',!!best);
}
function move(dt){if(!game.playing||game.note||game.align||game.ending)return;const k=game.keys;let dx=(k.KeyD?1:0)-(k.KeyA?1:0),dz=(k.KeyS?1:0)-(k.KeyW?1:0);const length=Math.hypot(dx,dz);if(!length)return;dx/=length;dz/=length;const speed=(k.ShiftLeft?5.1:3.05)*dt,sy=Math.sin(game.yaw),cy=Math.cos(game.yaw);
 camera.position.x+=(dx*cy+dz*sy)*speed;camera.position.z+=(dx*sy-dz*cy)*speed;
 if(!game.entered){camera.position.x=THREE.MathUtils.clamp(camera.position.x,-6.45,6.45);camera.position.z=THREE.MathUtils.clamp(camera.position.z,-6.65,6.3)}else{camera.position.x=THREE.MathUtils.clamp(camera.position.x,-4.1,4.1);camera.position.z=THREE.MathUtils.clamp(camera.position.z,-51,-15.7)}
 game.walk=Math.min(1,(game.walk||0)+dt*6);
}
let lookDrag=false,lastX=0,lastY=0,alignDrag=false;
renderer.domElement.addEventListener('click',()=>{if(!game.playing)return;if(game.interaction)interact();else if(!document.pointerLockElement&&!game.align)renderer.domElement.requestPointerLock?.()});
renderer.domElement.addEventListener('pointerdown',e=>{lookDrag=true;lastX=e.clientX;lastY=e.clientY;if(game.align)alignDrag=true});
document.addEventListener('pointerup',()=>{lookDrag=false;if(alignDrag){alignDrag=false;finishAlign()}});
document.addEventListener('mousemove',e=>{if(game.align){if(alignDrag){game.angle=THREE.MathUtils.clamp(game.angle+e.movementX*.004,-.78,.78);updateBeam();if(Math.abs(game.angle-game.goal)<.13&&Math.random()<.15)clickSound()}return}if(!game.playing||game.note||game.ending)return;if(document.pointerLockElement===renderer.domElement||lookDrag){game.yaw-=e.movementX*.0022;game.pitch=THREE.MathUtils.clamp(game.pitch+e.movementY*.0022,-1.1,1.1)}});
document.addEventListener('keydown',e=>{game.keys[e.code]=true;if(e.code==='KeyE'||e.code==='Space'){e.preventDefault();if(game.align)finishAlign();else interact()}if(game.align&&(e.code==='ArrowLeft'||e.code==='KeyA')){game.angle=THREE.MathUtils.clamp(game.angle-.045,-.78,.78);updateBeam()}if(game.align&&(e.code==='ArrowRight'||e.code==='KeyD')){game.angle=THREE.MathUtils.clamp(game.angle+.045,-.78,.78);updateBeam()}if(e.code==='Escape'&&game.align)finishAlign()});
document.addEventListener('keyup',e=>game.keys[e.code]=false);
window.addEventListener('blur',()=>game.keys={});window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
$('closeNote').onclick=closeNote;$('again').onclick=()=>location.reload();$('enter').onclick=begin;
async function load(){const loadText=$('loadText'),progress=$('progress');try{let manifest=await fetch('last-lantern-model-manifest.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Model manifest unavailable');return r.json()});let all=new Uint8Array(manifest.bytes),offset=0;for(let i=0;i<manifest.parts.length;i++){let res=await fetch(manifest.parts[i]);if(!res.ok)throw Error('Model part '+(i+1)+' unavailable');let part=new Uint8Array(await res.arrayBuffer());all.set(part,offset);offset+=part.length;progress.style.width=`${Math.round((i+1)/manifest.parts.length*88)}%`;loadText.textContent=`Loading original model · ${i+1} / ${manifest.parts.length}`;await new Promise(r=>setTimeout(r,0))}if(offset!==manifest.bytes)throw Error('Model data incomplete');loadText.textContent='Building the night';await new Promise((resolve,reject)=>new THREE.GLTFLoader().parse(all.buffer,'',g=>{const root=g.scene;root.scale.setScalar(18);root.position.set(-.58*18,-.109*18,0);world.add(root);lampMesh=root.children.find(o=>o.name.includes('南瓜'))||root.children[0];resolve()},reject));all=null;buildDoor();buildDesk();buildGlassRoof();buildSecond();buildGhosts();updateBeam();progress.style.width='100%';loadText.textContent='The station is ready';game.ready=true;$('enter').style.display='inline-block';}catch(err){console.error(err);loadText.textContent='The station could not load: '+(err.message||err);$('enter').style.display='inline-block';$('enter').textContent='RETRY';$('enter').onclick=()=>location.reload()}}
function tick(){requestAnimationFrame(tick);const now=performance.now(),dt=Math.min(.04,(now-game.last)/1000);game.last=now;game.clock+=dt;
 if(game.playing){move(dt);updateInteraction();for(const p of particles){if(p.stage===2&&!game.entered)continue;p.object.position.y=p.baseY+Math.sin(game.clock*p.speed+p.offset)*.16;p.object.material.rotation+=dt*.03}
 for(const g of ghosts){g.object.position.set(g.x+Math.sin(game.clock*.7+g.index)*.22,g.y+Math.sin(game.clock*1.3+g.index)*.25,g.z);g.object.material.opacity=g.index<2?(game.ticket?.13:.9):(game.ticket?.8:.12)}
 if(game.locked){const t=Math.min(1,dt*1.7);doorLeaves[0].rotation.y=THREE.MathUtils.lerp(doorLeaves[0].rotation.y,1.32,t);doorLeaves[1].rotation.y=THREE.MathUtils.lerp(doorLeaves[1].rotation.y,-1.32,t);portal.material.opacity=Math.min(.88,portal.material.opacity+dt*.05);portal.material.color.setHSL(.56+Math.sin(game.clock)*.015,.5,.65)}
 if(game.entered){for(const a of animated){if(a.type==='step')a.object.position.y=THREE.MathUtils.lerp(a.object.position.y,a.object.userData.targetY,dt*(2.8+a.index*.1));else a.object.scale.y=THREE.MathUtils.lerp(a.object.scale.y,1,dt*2)}}
 if(drawerPanel&&game.drawerOpen)drawerPanel.position.z=THREE.MathUtils.lerp(drawerPanel.position.z,1.32,Math.min(1,dt*6));
 warm.intensity=3.1+Math.sin(game.clock*3.2)*.28;if(relic)relic.rotation.y=-.3+Math.sin(game.clock*.5)*.08;
 const bob=(Object.values(game.keys).some(Boolean)?Math.sin(game.clock*9)*.025:0),shake=(Math.random()-.5)*game.shake;game.shake=Math.max(0,game.shake-dt*.27);camera.position.y=1.65+bob+shake;
 camera.rotation.order='YXZ';camera.rotation.y=game.yaw+shake*.2;camera.rotation.x=game.pitch+shake*.2;
 }renderer.render(scene,camera)}
tick();load();
})();

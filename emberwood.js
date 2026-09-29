(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const ui={game:$('game'),menu:$('menu'),upgrade:$('upgrade'),dead:$('dead'),start:$('start'),restart:$('restart'),choices:$('choices'),result:$('result'),hp:$('hpFill'),hpText:$('hpText'),xp:$('xpFill'),level:$('level'),gems:$('gems'),floor:$('floor'),tip:$('tip'),toast:$('toast'),flash:$('flash'),numbers:$('floatLayer'),boss:$('bossbar'),bossHp:$('bossHp'),sound:$('sound'),stick:$('stick'),nub:$('nub')};
  const mobile=matchMedia('(max-width:700px)').matches;
  const scene=new THREE.Scene();
  const camera=new THREE.OrthographicCamera(-15,15,9,-9,.1,150);
  const renderer=new THREE.WebGLRenderer({antialias:!mobile,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1:1.5));
  renderer.outputEncoding=THREE.sRGBEncoding;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=.78;
  renderer.shadowMap.enabled=!mobile;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  ui.game.appendChild(renderer.domElement);
  const ambient=new THREE.HemisphereLight(0xc9f4f2,0x283b4b,.85);scene.add(ambient);
  const sun=new THREE.DirectionalLight(0xffe2b4,1.35);sun.position.set(-12,22,14);sun.castShadow=!mobile;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-20;sun.shadow.camera.right=20;sun.shadow.camera.top=20;sun.shadow.camera.bottom=-20;sun.shadow.bias=-.001;scene.add(sun);
  const fill=new THREE.PointLight(0x58dacf,.35,32);fill.position.set(7,7,-7);scene.add(fill);
  const boxGeo=new THREE.BoxGeometry(1,1,1);
  const sphereGeo=new THREE.IcosahedronGeometry(1,1);
  const palettes=[
    {name:'EMERALD GLADE',sky:0x102f37,fog:0x1e4d56,ground:0x4b8b5b,ground2:0x34774f,path:0xb99a70,side:0x66513f,tree:0x258c6e,accent:0x57f2d1,water:0x2a9dc4,light:0xffd092},
    {name:'PRISM HOLLOW',sky:0x101d36,fog:0x273757,ground:0x4c6676,ground2:0x395567,path:0x978c9b,side:0x414359,tree:0x258eaa,accent:0x6bdfff,water:0x4d6caf,light:0x94d1ff},
    {name:'EMBER RUINS',sky:0x322032,fog:0x5a3346,ground:0x896047,ground2:0x72503f,path:0xb9936c,side:0x59424a,tree:0x8a5958,accent:0xffb96e,water:0x694963,light:0xffaa72}
  ];
  let root=new THREE.Group(),effects=new THREE.Group();scene.add(root,effects);
  let floor=1,gems=0,level=1,xp=0,xpGoal=15,playing=false,ended=false,pausedForUpgrade=false,clock=new THREE.Clock();
  let player,enemies=[],drops=[],shots=[],bursts=[],chest=null,portal=null,nextFloorPending=false,waveTimer=0,shake=0,tipTimer=0,soundOn=true,audio=null;
  const keys=new Set(),stick={x:0,y:0,id:null};
  const stats={maxHp:100,hp:100,damage:24,bolt:28,speed:4.25,armor:0,crit:.09,leech:0,boltChain:0};
  const cooldown={melee:0,bolt:0,dash:0};
  const tempV=new THREE.Vector3(),tempM=new THREE.Matrix4(),tempQ=new THREE.Quaternion(),tempS=new THREE.Vector3();
  const colors={gold:0xffd987,aqua:0x83fff1,red:0xff6a78,white:0xf7fff0,purple:0xd09bff};
  function mat(color,extra={}){return new THREE.MeshLambertMaterial({color,...extra});}
  function emissive(color,power=.55){return new THREE.MeshLambertMaterial({color,emissive:color,emissiveIntensity:power});}
  function box(parent,color,x,y,z,w,h,d,extra){const mesh=new THREE.Mesh(boxGeo,extra||mat(color));mesh.position.set(x,y,z);mesh.scale.set(w,h,d);mesh.castShadow=!mobile;mesh.receiveShadow=!mobile;parent.add(mesh);return mesh;}
  function orb(parent,color,x,y,z,size=.1){const mesh=new THREE.Mesh(sphereGeo,emissive(color,.7));mesh.position.set(x,y,z);mesh.scale.setScalar(size);parent.add(mesh);return mesh;}
  function rng(seed){let s=seed>>>0;return()=>((s=(1664525*s+1013904223)>>>0)/4294967296);}
  function disposeTree(group){group.traverse(o=>{if(o.isMesh){if(o.geometry!==boxGeo&&o.geometry!==sphereGeo)o.geometry.dispose();const ms=Array.isArray(o.material)?o.material:[o.material];for(const m of ms)m.dispose();}});}
  function flash(color='#fff',strength=.3){ui.flash.style.background=color;ui.flash.style.opacity=String(strength);setTimeout(()=>ui.flash.style.opacity='0',55);}
  function toast(text){ui.toast.textContent=text;ui.toast.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>ui.toast.classList.remove('show'),1250);}
  function number(text,position,color='#fff',crit=false){const p=position.clone().project(camera);const el=document.createElement('span');el.className='number'+(crit?' crit':'');el.textContent=text;el.style.left=((p.x+1)*innerWidth/2)+'px';el.style.top=((1-p.y)*innerHeight/2)+'px';el.style.color=color;ui.numbers.appendChild(el);setTimeout(()=>el.remove(),800);}
  function sound(freq=450,duration=.13,kind='triangle',volume=.06){if(!soundOn||!playing)return;try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime;o.type=kind;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(40,freq*.48),t+duration);g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g).connect(audio.destination);o.start(t);o.stop(t+duration+.02);}catch{}}
  function resize(){const w=innerWidth,h=innerHeight,span=mobile?15.5:18.5;camera.left=-span*w/h/2;camera.right=span*w/h/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();renderer.setSize(w,h);renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1:1.5));}
  resize();addEventListener('resize',resize);

  function makeHero(){
    const group=new THREE.Group();scene.add(group);
    const skin=mat(0xf3c7a1),shirt=mat(0x478991),pants=mat(0x2c465e),hair=mat(0xf9cd62),metal=mat(0xcce6e5),blade=emissive(0x8af8ea,.25);
    box(group,0,0,1.37,0,.69,.84,.42,shirt);
    box(group,0,0,2.13,0,.66,.66,.62,skin);
    box(group,0,0,2.52,-.05,.77,.23,.7,hair);
    box(group,0,-.3,2.23,.07,.22,.15,.1,hair);box(group,0,.3,2.23,.07,.22,.15,.1,hair);
    box(group,0,-.14,2.15,.33,.075,.08,.06,mat(0x133b4e));box(group,0,.14,2.15,.33,.075,.08,.06,mat(0x133b4e));
    box(group,0,0,1.06,-.02,.78,.19,.53,mat(0x654d56));
    const arms=[],legs=[];
    for(const side of [-1,1]){
      const arm=new THREE.Group();arm.position.set(side*.48,1.66,0);group.add(arm);
      box(arm,0,0,-.29,0,.24,.57,.3,shirt);box(arm,0,0,-.64,0,.22,.17,.23,skin);arms.push(arm);
      const leg=new THREE.Group();leg.position.set(side*.2,.96,0);group.add(leg);
      box(leg,0,0,-.34,0,.27,.68,.32,pants);box(leg,0,0,-.73,.12,.31,.18,.48,mat(0x9a5a49));legs.push(leg);
    }
    const weapon=new THREE.Group();arms[1].add(weapon);weapon.position.set(0,-.7,.1);
    box(weapon,0,0,-.2,.02,.1,.46,.12,mat(0x7c5140));
    box(weapon,0,0,-.43,.02,.45,.09,.15,mat(0xe4b76d));
    box(weapon,0,0,-.89,.02,.16,.86,.13,blade);
    const shadow=new THREE.Mesh(new THREE.CircleGeometry(.6,16),new THREE.MeshBasicMaterial({color:0x051e24,transparent:true,opacity:.27,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.04;group.add(shadow);
    return{group,arms,legs,weapon,x:0,z:0,facing:new THREE.Vector3(0,0,1),dashTime:0,invuln:0,attackTime:0,walkTime:0};
  }
  player=makeHero();

  function terrain(p,random){
    const count=25*25,tiles=new THREE.InstancedMesh(boxGeo,mat(0xffffff),count),edge=new THREE.InstancedMesh(boxGeo,mat(0xffffff),count);
    let n=0,k=0;
    for(let x=-12;x<=12;x++)for(let z=-12;z<=12;z++){
      const cliff=Math.abs(x)>10||Math.abs(z)>10;
      const h=cliff?(.75+Math.floor(random()*3)*.5):0;
      tempM.compose(new THREE.Vector3(x,h-.37,z),tempQ.set(0,0,0,1),tempS.set(1,.75+h,1));tiles.setMatrixAt(n,tempM);
      const path=Math.abs(z-Math.sin(x*.34+floor)*1.4)<1.15||Math.abs(x+z)<1.25;
      const water=x>5&&x<10&&z< -5&&z> -10&&!cliff;
      let c=new THREE.Color(water?p.water:path?p.path:random()>.5?p.ground:p.ground2);
      c.multiplyScalar(.82+random()*.33);tiles.setColorAt(n,c);n++;
      if(cliff){tempM.compose(new THREE.Vector3(x,-1.2,z),tempQ.set(0,0,0,1),tempS.set(1,2,1));edge.setMatrixAt(k,tempM);edge.setColorAt(k,new THREE.Color(p.side).multiplyScalar(.77+random()*.23));k++;}
      if(!cliff&&random()<.13&&!path&&!water){const foliage=new THREE.Group();foliage.position.set(x,0,z);root.add(foliage);for(let a=0;a<2;a++){const gx=(random()-.5)*.6,gz=(random()-.5)*.6;box(foliage,0,gx,.1,gz,.055,.2,.05,mat(random()<.2?0xe8ba7e:0x266e65));}}
      if(!cliff&&random()<.045&&!path&&!water){const flower=new THREE.Group();flower.position.set(x,0,z);root.add(flower);box(flower,0,0,.08,0,.05,.16,.05,mat(0x429970));orb(flower,random()<.5?0xffb5df:0xffe69a,0,.22,0,.095);}
    }
    tiles.count=n;tiles.instanceMatrix.needsUpdate=true;tiles.instanceColor.needsUpdate=true;tiles.receiveShadow=!mobile;root.add(tiles);
    edge.count=k;edge.instanceMatrix.needsUpdate=true;edge.instanceColor.needsUpdate=true;root.add(edge);
    const under=box(root,0,0,-2.38,0,25,1.3,25,mat(p.side));under.castShadow=false;
    for(let i=0;i<18;i++){
      const a=random()*Math.PI*2,r=7+random()*4,x=Math.cos(a)*r,z=Math.sin(a)*r;
      if(x>5&&z< -5)continue;
      makeTree(x,z,p,random);
    }
    for(let i=0;i<21;i++){
      const x=(random()-.5)*22,z=(random()-.5)*22;if(Math.abs(x)<3&&Math.abs(z)<3)continue;
      if(floor%3===2)makeCrystal(x,z,p,random);else if(floor%3===0)makeTorch(x,z,p);else makeMushroom(x,z,p,random);
    }
    for(let i=0;i<8;i++){const x=(random()-.5)*18,z=(random()-.5)*18;if(Math.abs(x)<4&&Math.abs(z)<4)continue;const stone=new THREE.Group();stone.position.set(x,0,z);root.add(stone);box(stone,0,0,.15,0,.45,.3,.48,mat(p.side));box(stone,0,.13,.33,-.12,.32,.23,.3,mat(p.path));}
  }
  function makeTree(x,z,p,random){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);const h=1.7+random()*.7;box(g,0,0,h/2,0,.43,h,.43,mat(p.side));for(const [dx,dy,dz,s] of [[0,h+.1,0,1.4],[-.45,h-.15,0,.8],[.45,h-.03,.14,.85],[0,h-.08,-.45,.85],[0,h-.08,.45,.85]])box(g,0,dx,dy,dz,s,.55,s,mat(new THREE.Color(p.tree).multiplyScalar(.84+random()*.35)));if(random()<.55)orb(g,p.accent,.38,h+.19,.48,.11);}
  function makeCrystal(x,z,p,random){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);for(let i=0;i<3;i++){const b=box(g,0,(random()-.5)*.6,.33,(random()-.5)*.6,.2,.65+random()*.5,.2,emissive(p.accent,.65));b.rotation.z=(random()-.5)*.4;}}
  function makeTorch(x,z,p){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);box(g,0,0,.32,0,.18,.64,.18,mat(p.side));orb(g,0xffbe66,0,.73,0,.19);const light=new THREE.PointLight(0xffa960,.65,4);light.position.set(0,.9,0);g.add(light);}
  function makeMushroom(x,z,p,random){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);box(g,0,0,.2,0,.14,.4,.14,mat(0xd8dac4));box(g,0,0,.45,0,.55,.2,.55,mat(random()<.5?0xfc948a:0xa67bd9));orb(g,0xffe6b3,.15,.57,.15,.06);}

  function makeEnemy(type,x,z,index){
    const group=new THREE.Group();group.position.set(x,0,z);root.add(group);
    const boss=type==='warden',w=type==='slime'?.88:boss?1.6:.74,h=type==='slime'?.65:boss?1.65:.88;
    const color=boss?0x646780:type==='slime'?0x71c9a4:0x8069a7;
    const body=box(group,0,0,.48+h/2,0,w,h,w,mat(color));
    box(group,0,-w*.19,.52+h*.55,w*.51,.12,.13,.08,mat(0x0e4050));box(group,0,w*.19,.52+h*.55,w*.51,.12,.13,.08,mat(0x0e4050));
    if(type!=='slime'){box(group,0,0,.53+h+.21,0,w*.86,.42,w*.85,mat(boss?0x555777:0x9878b0));box(group,0,-w*.18,.53+h+.25,w*.43,.12,.1,.06,emissive(boss?0xffaa6a:0x91ffec,.7));box(group,0,w*.18,.53+h+.25,w*.43,.12,.1,.06,emissive(boss?0xffaa6a:0x91ffec,.7));}
    if(boss){for(const s of [-1,1])box(group,0,s*1.1,1.35,0,.63,.8,.7,mat(0x585b78));orb(group,0xffae6d,0,1.8,.81,.2);}
    const shadow=new THREE.Mesh(new THREE.CircleGeometry(w*.65,12),new THREE.MeshBasicMaterial({color:0x0a2024,transparent:true,opacity:.25,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.03;group.add(shadow);
    const hp=boss?290+floor*36:type==='slime'?38+floor*8:58+floor*10;
    const e={group,body,x,z,hp,maxHp:hp,type,boss,hit:0,attack:1+index*.17,seed:index*2.3,dead:false,charge:0};enemies.push(e);
    if(boss){ui.boss.classList.add('show');ui.bossHp.style.setProperty('--hp','100%');}
    return e;
  }

  function makeChest(){const g=new THREE.Group();g.position.set(0,0,0);root.add(g);box(g,0,0,.36,0,.95,.68,.73,mat(0x80553e));box(g,0,0,.73,0,1.07,.25,.84,mat(0xc7894c));box(g,0,0,.68,.43,.19,.3,.08,emissive(0xffdd8e,.5));for(const x of [-.38,.38])box(g,0,x,.36,.38,.08,.69,.06,mat(0xe6bb6d));const glow=orb(g,0xffd97c,0,1.2,0,.25);glow.visible=false;chest={group:g,glow,open:false};}
  function makePortal(p){const g=new THREE.Group();g.position.set(0,0,0);root.add(g);const ring=new THREE.Mesh(new THREE.TorusGeometry(.9,.14,8,28),emissive(p.accent,.85));ring.position.y=1.25;g.add(ring);const inner=new THREE.Mesh(new THREE.CircleGeometry(.76,24),new THREE.MeshBasicMaterial({color:p.accent,transparent:true,opacity:.23,depthWrite:false,side:THREE.DoubleSide}));inner.position.set(0,1.25,-.01);g.add(inner);for(let i=0;i<8;i++){const a=i*Math.PI/4;orb(g,p.accent,Math.cos(a)*.92,1.25+Math.sin(a)*.92,.05,.1);}const light=new THREE.PointLight(p.accent,1.4,7);light.position.y=1.2;g.add(light);portal={group:g,ring,inner,t:0};}

  function buildFloor(){
    scene.remove(root);disposeTree(root);root=new THREE.Group();scene.add(root);effects.clear();
    enemies=[];drops=[];shots=[];bursts=[];chest=null;portal=null;nextFloorPending=false;waveTimer=0;
    const p=palettes[(floor-1)%palettes.length],random=rng(73419+floor*61813);
    scene.background=new THREE.Color(p.sky);scene.fog=new THREE.FogExp2(p.fog,.008);
    sun.color.setHex(p.light);ambient.color.setHex(p.accent);fill.color.setHex(p.accent);
    terrain(p,random);
    player.x=0;player.z=3;player.group.position.set(0,0,3);player.facing.set(0,0,-1);
    const count=Math.min(4+floor,11);
    for(let i=0;i<count;i++){const a=i/count*Math.PI*2+random()*.3,r=5.5+random()*3;makeEnemy(i%3===0?'mystic':'slime',Math.cos(a)*r,Math.sin(a)*r,i);}
    if(floor%3===0)makeEnemy('warden',0,-7,99);
    makeChest();
    ui.floor.textContent=String(floor).padStart(2,'0');ui.tip.textContent=p.name+' · DEFEAT THE GUARDIANS';
    ui.boss.classList.toggle('show',floor%3===0);
    toast('FLOOR '+String(floor).padStart(2,'0'));
  }

  function sparks(x,y,z,color,count=9,power=1){
    for(let i=0;i<count;i++){
      const m=new THREE.Mesh(boxGeo,new THREE.MeshBasicMaterial({color}));m.scale.setScalar(.08+Math.random()*.14);m.position.set(x,y,z);effects.add(m);
      const a=Math.random()*Math.PI*2,s=(1.4+Math.random()*3.2)*power;
      bursts.push({m,vx:Math.cos(a)*s,vy:(1+Math.random()*3)*power,vz:Math.sin(a)*s,life:.45+Math.random()*.4,max:.8});
    }
  }
  function drop(x,z,type='gem'){
    const color=type==='heart'?0xff707a:type==='xp'?0xce9dff:0xffd479;
    const g=new THREE.Group();g.position.set(x,.6,z);effects.add(g);
    const m=new THREE.Mesh(new THREE.OctahedronGeometry(type==='heart'?.22:.16),emissive(color,1));g.add(m);
    drops.push({g,type,t:Math.random()*6,vx:(Math.random()-.5)*2,vz:(Math.random()-.5)*2});
  }
  function nearest(max=99){let best=null,dist=max;for(const e of enemies){if(e.dead)continue;const d=Math.hypot(e.x-player.x,e.z-player.z);if(d<dist){best=e;dist=d;}}return best;}
  function hitEnemy(e,amount,critical=false){
    if(e.dead)return;
    e.hp-=amount;e.hit=.16;e.body.material.emissive.setHex(0xffffff);e.body.material.emissiveIntensity=.9;
    number(String(Math.round(amount)),new THREE.Vector3(e.x,2,e.z),critical?'#ffe385':'#e8ffeb',critical);
    sparks(e.x,1.25,e.z,critical?colors.gold:colors.aqua,critical?12:6,.72);
    shake=Math.max(shake,critical?.2:.09);sound(critical?600:330,.09,'square',.035);
    if(e.boss)ui.bossHp.style.setProperty('--hp',Math.max(0,e.hp/e.maxHp*100)+'%');
    if(e.hp<=0){
      e.dead=true;root.remove(e.group);sparks(e.x,1,e.z,e.boss?colors.gold:colors.purple,e.boss?40:17,1.3);
      for(let i=0;i<(e.boss?11:3);i++)drop(e.x+(Math.random()-.5)*1.5,e.z+(Math.random()-.5)*1.5,'gem');
      drop(e.x,e.z,'xp');if(Math.random()<.16||e.boss)drop(e.x+.3,e.z,'heart');
      if(e.boss){ui.boss.classList.remove('show');toast('WARDEN DEFEATED!');}
      if(enemies.every(enemy=>enemy.dead)){chest.glow.visible=true;ui.tip.textContent='CLAIM THE CHEST';toast('AREA CLEARED!');sound(850,.32,'triangle',.09);}
    }
  }
  function melee(){
    if(!playing||pausedForUpgrade||cooldown.melee>0)return;
    cooldown.melee=.43;player.attackTime=.25;
    const target=nearest(3.2);if(target){const a=Math.atan2(target.x-player.x,target.z-player.z);player.facing.set(Math.sin(a),0,Math.cos(a));}
    const a=Math.atan2(player.facing.x,player.facing.z);player.group.rotation.y=a;
    const arc=new THREE.Mesh(new THREE.TorusGeometry(1.45,.11,6,18,Math.PI*1.05),new THREE.MeshBasicMaterial({color:0xe5fff1,transparent:true,opacity:.95,side:THREE.DoubleSide}));
    arc.rotation.x=-Math.PI/2;arc.rotation.z=a-Math.PI*.53;arc.position.set(player.x,.85,player.z);effects.add(arc);bursts.push({m:arc,life:.2,max:.2,arc:true});
    let hits=0;for(const e of enemies){if(e.dead)continue;const dx=e.x-player.x,dz=e.z-player.z,d=Math.hypot(dx,dz),dot=(dx*player.facing.x+dz*player.facing.z)/(d||1);if(d<2.75&&dot>-.12){const crit=Math.random()<stats.crit;hitEnemy(e,stats.damage*(crit?1.8:1),crit);hits++;if(stats.leech)stats.hp=Math.min(stats.maxHp,stats.hp+stats.leech);}}
    if(!hits)sparks(player.x+player.facing.x*1.3,1,player.z+player.facing.z*1.3,colors.white,4,.42);
    sound(hits?380:490,.12,'sawtooth',.055);updateHud();
  }
  function bolt(){
    if(!playing||pausedForUpgrade||cooldown.bolt>0)return;
    cooldown.bolt=1.05;const e=nearest(10);let dx=player.facing.x,dz=player.facing.z;
    if(e){const d=Math.hypot(e.x-player.x,e.z-player.z);dx=(e.x-player.x)/d;dz=(e.z-player.z)/d;}
    const m=new THREE.Mesh(new THREE.OctahedronGeometry(.38),emissive(0x80ffff,1.8));m.position.set(player.x,1.25,player.z);effects.add(m);
    shots.push({m,dx,dz,life:1.4,chain:stats.boltChain});sparks(player.x,1.25,player.z,colors.aqua,9,.6);sound(890,.25,'sine',.08);
  }
  function dash(){
    if(!playing||pausedForUpgrade||cooldown.dash>0)return;
    cooldown.dash=2.1;player.dashTime=.22;player.invuln=.32;
    sparks(player.x,.8,player.z,colors.aqua,15,.7);sound(220,.22,'sine',.07);
  }
  function damagePlayer(amount){
    if(player.invuln>0||!playing||pausedForUpgrade)return;
    player.invuln=.75;stats.hp=Math.max(0,stats.hp-Math.max(1,amount-stats.armor));
    flash('#ff4160',.42);shake=.45;number('−'+Math.round(amount),new THREE.Vector3(player.x,2.6,player.z),'#ff8593',true);
    sparks(player.x,1.1,player.z,colors.red,15);sound(120,.33,'sawtooth',.08);updateHud();
    if(stats.hp<=0){playing=false;ended=true;ui.dead.classList.remove('hidden');ui.result.textContent='Floor '+String(floor).padStart(2,'0')+' · '+gems+' gems';}
  }
  const upgrades=[
    {title:'SHARPER SWORD',detail:'+35% sword damage',apply:()=>stats.damage=Math.round(stats.damage*1.35)},
    {title:'ARC STORM',detail:'+40% bolt power',apply:()=>stats.bolt=Math.round(stats.bolt*1.4)},
    {title:'SECOND WIND',detail:'+30 maximum health · full heal',apply:()=>{stats.maxHp+=30;stats.hp=stats.maxHp}},
    {title:'SWIFT BOOTS',detail:'+16% movement speed',apply:()=>stats.speed*=1.16},
    {title:'LUCKY STRIKE',detail:'+15% critical chance',apply:()=>stats.crit+=.15},
    {title:'VAMPIRIC EDGE',detail:'Sword hits restore 3 health',apply:()=>stats.leech+=3},
    {title:'GUARDIAN SHELL',detail:'Take 5 less damage',apply:()=>stats.armor+=5}
  ];
  function chooseUpgrade(){
    pausedForUpgrade=true;ui.upgrade.classList.remove('hidden');ui.choices.replaceChildren();
    const pool=[...upgrades].sort(()=>Math.random()-.5).slice(0,3);
    for(const u of pool){const b=document.createElement('button');b.type='button';b.className='choice';b.innerHTML='<strong>'+u.title+'</strong><small>'+u.detail+'</small>';b.addEventListener('click',()=>{u.apply();pausedForUpgrade=false;ui.upgrade.classList.add('hidden');updateHud();sound(950,.3,'triangle',.1);flash('#ffdf8b',.24);if(nextFloorPending){floor++;buildFloor();}});ui.choices.append(b);}
  }
  function openChest(){
    if(!chest||chest.open)return;chest.open=true;chest.group.visible=false;
    sparks(0,1,0,colors.gold,55,1.5);for(let i=0;i<12;i++)drop((Math.random()-.5)*2,(Math.random()-.5)*2,'gem');
    const heal=Math.min(stats.maxHp-stats.hp,20);stats.hp+=heal;gems+=20+floor*7;
    flash('#ffe499',.38);shake=.5;toast('TREASURE +'+(20+floor*7));sound(760,.45,'triangle',.13);
    makePortal(palettes[(floor-1)%palettes.length]);ui.tip.textContent='ENTER THE PORTAL';updateHud();
  }
  function gainXp(n){xp+=n;if(xp>=xpGoal){xp-=xpGoal;xpGoal=Math.round(xpGoal*1.33+7);level++;toast('LEVEL UP!');sparks(player.x,1.2,player.z,colors.gold,35,1.2);chooseUpgrade();}updateHud();}
  function updateHud(){ui.hp.style.width=Math.max(0,stats.hp/stats.maxHp*100)+'%';ui.hpText.textContent=Math.ceil(stats.hp)+' / '+stats.maxHp;ui.xp.style.width=Math.min(100,xp/xpGoal*100)+'%';ui.level.textContent='LEVEL '+level;ui.gems.textContent=gems;}
  function movePlayer(dt,time){
    const sx=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0)+stick.x;
    const sy=(keys.has('s')||keys.has('arrowdown')?1:0)-(keys.has('w')||keys.has('arrowup')?1:0)+stick.y;
    let x=.832*sx+.555*sy,z=-.555*sx+.832*sy;
    const mag=Math.hypot(x,z);if(mag>.1){x/=mag;z/=mag;if(player.dashTime<=0)player.facing.set(x,0,z);}
    const dash=player.dashTime>0;const speed=dash?14:stats.speed;
    if(dash){x=player.facing.x;z=player.facing.z;player.dashTime-=dt;sparks(player.x,.75,player.z,colors.aqua,2,.35);}
    player.x=THREE.MathUtils.clamp(player.x+x*speed*dt,-10.7,10.7);player.z=THREE.MathUtils.clamp(player.z+z*speed*dt,-10.7,10.7);
    player.group.position.set(player.x,Math.sin(time*13)*.055*(mag>.1?1:0),player.z);
    if(mag>.1||dash)player.group.rotation.y=Math.atan2(player.facing.x,player.facing.z);
    const swing=Math.sin(time*12)*Math.min(1,mag)*.45;player.legs[0].rotation.x=swing;player.legs[1].rotation.x=-swing;player.arms[0].rotation.x=-swing*.65;player.arms[1].rotation.x=swing*.65-(player.attackTime>0?1.7:0);
    player.attackTime=Math.max(0,player.attackTime-dt);player.invuln=Math.max(0,player.invuln-dt);
    player.group.visible=player.invuln<=0||Math.floor(time*18)%2===0;
    if(chest&&chest.glow.visible&&!chest.open&&Math.hypot(player.x,player.z)<1.5)openChest();
    if(portal&&Math.hypot(player.x,player.z)<1.05){portal=null;nextFloorPending=true;chooseUpgrade();}
  }
  function updateEnemies(dt,time){
    for(const e of enemies){if(e.dead)continue;
      const dx=player.x-e.x,dz=player.z-e.z,d=Math.hypot(dx,dz)||1;
      e.attack-=dt;e.hit=Math.max(0,e.hit-dt);if(e.hit===0)e.body.material.emissiveIntensity=0;
      const speed=e.boss?1.2:e.type==='slime'?1.45:1.75;
      if(d>(e.boss?2.05:1.2)&&d<11){e.x+=dx/d*speed*dt;e.z+=dz/d*speed*dt;}
      if(d<(e.boss?2.4:1.4)&&e.attack<=0){damagePlayer(e.boss?22:12+floor*1.5);e.attack=e.boss?1.8:1.25;}
      e.group.position.set(e.x,Math.abs(Math.sin(time*(e.boss?2.5:4)+e.seed))*.17,e.z);
      e.group.rotation.y=Math.atan2(dx,dz);if(e.boss&&d<5&&e.attack<.35)e.group.scale.setScalar(1.08);else e.group.scale.setScalar(1);
    }
  }
  function updateShots(dt){
    for(let i=shots.length-1;i>=0;i--){const s=shots[i],m=s.m;s.life-=dt;m.position.x+=s.dx*10*dt;m.position.z+=s.dz*10*dt;m.rotation.y+=dt*9;m.rotation.z+=dt*8;
      let hit=null;for(const e of enemies)if(!e.dead&&Math.hypot(e.x-m.position.x,e.z-m.position.z)<(e.boss?1.05:.65)){hit=e;break;}
      if(hit){hitEnemy(hit,stats.bolt,Math.random()<stats.crit);sparks(m.position.x,1.2,m.position.z,colors.aqua,18,1.1);s.life=0;}
      if(s.life<=0){effects.remove(m);m.geometry.dispose();m.material.dispose();shots.splice(i,1);}
    }
  }
  function updateDrops(dt,time){
    for(let i=drops.length-1;i>=0;i--){const d=drops[i],g=d.g;d.t+=dt;const dx=player.x-g.position.x,dz=player.z-g.position.z,dist=Math.hypot(dx,dz);
      if(dist<3){const rate=dt*(dist<1?12:4);g.position.x+=dx*rate;g.position.z+=dz*rate;}else{g.position.x+=d.vx*dt;g.position.z+=d.vz*dt;d.vx*=.94;d.vz*=.94;}
      g.position.y=.64+Math.sin(d.t*4)*.13;g.rotation.y+=dt*3;
      if(dist<.54){if(d.type==='gem'){gems++;sound(880,.075,'sine',.025);}else if(d.type==='heart'){stats.hp=Math.min(stats.maxHp,stats.hp+18);sound(630,.15,'sine',.05);}else{gainXp(7+floor*2);sound(740,.15,'sine',.045);}effects.remove(g);g.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});drops.splice(i,1);updateHud();}
    }
  }
  function updateBursts(dt){for(let i=bursts.length-1;i>=0;i--){const b=bursts[i];b.life-=dt;if(!b.arc){b.m.position.x+=b.vx*dt;b.m.position.y+=b.vy*dt;b.m.position.z+=b.vz*dt;b.vy-=11*dt;b.m.scale.multiplyScalar(.985);}else b.m.material.opacity=Math.max(0,b.life/b.max);if(b.life<=0){effects.remove(b.m);if(b.m.geometry!==boxGeo)b.m.geometry.dispose();b.m.material.dispose();bursts.splice(i,1);}}}
  function controls(){
    addEventListener('keydown',e=>{const k=e.key.toLowerCase();if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(k))e.preventDefault();keys.add(k);if(k==='j')melee();if(k==='k')bolt();if(k===' '||k==='l')dash();});
    addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));addEventListener('blur',()=>keys.clear());
    for(const [id,fn] of [['melee',melee],['ranged',bolt],['dash',dash],['touchSword',melee],['touchBolt',bolt],['touchDash',dash]])$(id).addEventListener('pointerdown',e=>{e.preventDefault();fn();});
    renderer.domElement.addEventListener('pointerdown',e=>{if(!playing||mobile)return;melee();});
    ui.stick.addEventListener('pointerdown',e=>{e.preventDefault();stick.id=e.pointerId;ui.stick.setPointerCapture(e.pointerId);updateStick(e);});
    ui.stick.addEventListener('pointermove',e=>{if(e.pointerId===stick.id)updateStick(e);});
    for(const name of ['pointerup','pointercancel','lostpointercapture'])ui.stick.addEventListener(name,()=>{stick.id=null;stick.x=stick.y=0;ui.nub.style.transform='translate(-50%,-50%)';});
    ui.sound.addEventListener('click',()=>{soundOn=!soundOn;ui.sound.textContent=soundOn?'♪':'♩';});
    ui.start.addEventListener('click',resetGame);ui.restart.addEventListener('click',resetGame);
  }
  function updateStick(e){const r=ui.stick.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2),d=Math.max(1,Math.hypot(x,y)),f=Math.min(1,45/d);stick.x=x*f/45;stick.y=y*f/45;ui.nub.style.transform='translate(calc(-50% + '+(x*f)+'px),calc(-50% + '+(y*f)+'px))';}
  function resetGame(){
    Object.assign(stats,{maxHp:100,hp:100,damage:24,bolt:28,speed:4.25,armor:0,crit:.09,leech:0,boltChain:0});
    floor=1;gems=0;level=1;xp=0;xpGoal=15;ended=false;pausedForUpgrade=false;nextFloorPending=false;playing=true;
    ui.menu.classList.add('hidden');ui.dead.classList.add('hidden');ui.upgrade.classList.add('hidden');
    if(audio?.state==='suspended')audio.resume();buildFloor();updateHud();
  }
  function frame(){
    requestAnimationFrame(frame);const dt=Math.min(clock.getDelta(),.05),time=clock.elapsedTime;
    if(playing&&!pausedForUpgrade){for(const k of Object.keys(cooldown))cooldown[k]=Math.max(0,cooldown[k]-dt);movePlayer(dt,time);updateEnemies(dt,time);updateShots(dt);updateDrops(dt,time);updateBursts(dt);}
    for(const [id,key,max] of [['melee','melee',.43],['ranged','bolt',1.05],['dash','dash',2.1]]){const el=$(id);el.style.setProperty('--cool',cooldown[key]/max);el.classList.toggle('hot',cooldown[key]>0);el.classList.toggle('ready',cooldown[key]<=0);}
    if(portal){portal.ring.rotation.z+=dt*.35;portal.inner.material.opacity=.22+Math.sin(time*3)*.08;}
    if(chest?.glow.visible)chest.glow.position.y=1.15+Math.sin(time*4)*.12;
    const jitter=shake?(Math.random()-.5)*shake:0;shake*=.86;if(shake<.005)shake=0;
    const target=new THREE.Vector3(player.x,0,player.z);const camPos=new THREE.Vector3(player.x+14,18,player.z+21);camera.position.lerp(camPos,.07);camera.position.x+=jitter;camera.position.y+=jitter;camera.lookAt(target);renderer.render(scene,camera);
  }
  controls();buildFloor();updateHud();frame();
})();

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
  renderer.toneMappingExposure=1.04;
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  ui.game.appendChild(renderer.domElement);
  const ambient=new THREE.HemisphereLight(0xa9cce8,0x263b33,.6);scene.add(ambient);
  const sun=new THREE.DirectionalLight(0xffd8a6,1.45);sun.position.set(-12,22,14);sun.castShadow=true;sun.shadow.mapSize.set(mobile?512:1536,mobile?512:1536);sun.shadow.camera.left=-20;sun.shadow.camera.right=20;sun.shadow.camera.top=20;sun.shadow.camera.bottom=-20;sun.shadow.bias=-.001;scene.add(sun,sun.target);
  const fill=new THREE.PointLight(0x58dacf,.35,32);fill.position.set(7,7,-7);scene.add(fill);
  const artCache=new Map();
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
  function disposeTree(group){group.traverse(o=>{if(o.isMesh){if(o.geometry!==boxGeo&&o.geometry!==sphereGeo)o.geometry.dispose();const ms=Array.isArray(o.material)?o.material:[o.material];for(const m of ms)if(!m.userData.shared)m.dispose();}});}
  function flash(color='#fff',strength=.3){ui.flash.style.background=color;ui.flash.style.opacity=String(strength);setTimeout(()=>ui.flash.style.opacity='0',55);}
  function toast(text){ui.toast.textContent=text;ui.toast.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>ui.toast.classList.remove('show'),1250);}
  function number(text,position,color='#fff',crit=false){const p=position.clone().project(camera);const el=document.createElement('span');el.className='number'+(crit?' crit':'');el.textContent=text;el.style.left=((p.x+1)*innerWidth/2)+'px';el.style.top=((1-p.y)*innerHeight/2)+'px';el.style.color=color;ui.numbers.appendChild(el);setTimeout(()=>el.remove(),800);}
  function sound(freq=450,duration=.13,kind='triangle',volume=.06){if(!soundOn||!playing)return;try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime;o.type=kind;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(Math.max(40,freq*.48),t+duration);g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g).connect(audio.destination);o.start(t);o.stop(t+duration+.02);}catch{}}
  function resize(){const w=innerWidth,h=innerHeight,span=mobile?16:17;camera.left=-span*w/h/2;camera.right=span*w/h/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();renderer.setSize(w,h);renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1:1.5));}
  resize();addEventListener('resize',resize);

  function legacy_makeHero(){
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
  // Hand-painted pixel textures and rebuilt Minecraft-style voxel assets.
  function pixelMaterial(kind,color){
    const key=kind+String(color);if(artCache.has(key))return artCache.get(key);
    const c=document.createElement('canvas');c.width=c.height=16;const ctx=c.getContext('2d'),rand=rng(915+key.length*91+Number(color));
    const base=new THREE.Color(color);
    for(let y=0;y<16;y++)for(let x=0;x<16;x++){
      let f=.87+rand()*.21;
      if(kind==='brick'&&(y%5===0||(x+(Math.floor(y/5)%2)*4)%8===0))f=.43;
      if(kind==='bark')f=(x%4===0?.4:.75)+rand()*.25;
      if(kind==='leaf'&&rand()<.12)f=.65;
      if(kind==='grass'&&y<3)f=1.1;
      ctx.fillStyle='#'+base.clone().multiplyScalar(f).getHexString();ctx.fillRect(x,y,1,1);
    }
    const tex=new THREE.CanvasTexture(c);tex.magFilter=THREE.NearestFilter;tex.minFilter=THREE.NearestFilter;tex.generateMipmaps=false;tex.encoding=THREE.sRGBEncoding;
    const m=new THREE.MeshLambertMaterial({map:tex});m.userData.shared=true;artCache.set(key,m);return m;
  }
  function faceMaterial(kind){
    const key='face-'+kind;if(artCache.has(key))return artCache.get(key);
    const c=document.createElement('canvas');c.width=c.height=8;const ctx=c.getContext('2d');
    const base=kind==='alex'?'#dba47a':kind==='creeper'?'#488633':'#547947';ctx.fillStyle=base;ctx.fillRect(0,0,8,8);
    const rand=rng(27);for(let i=0;i<20;i++){ctx.fillStyle=kind==='alex'?'#bd815e':rand()>.5?'#345d2e':'#649049';ctx.globalAlpha=.4;ctx.fillRect(Math.floor(rand()*8),Math.floor(rand()*8),1,1);}ctx.globalAlpha=1;
    if(kind==='creeper'){ctx.fillStyle='#14251a';ctx.fillRect(1,2,2,2);ctx.fillRect(5,2,2,2);ctx.fillRect(3,3,2,3);ctx.fillRect(2,5,1,2);ctx.fillRect(5,5,1,2);}
    else{ctx.fillStyle=kind==='alex'?'#a95125':'#30432c';ctx.fillRect(0,0,8,2);ctx.fillRect(0,2,2,2);ctx.fillRect(6,2,2,1);ctx.fillStyle='#f0e7d2';ctx.fillRect(1,4,2,1);ctx.fillRect(5,4,2,1);ctx.fillStyle=kind==='alex'?'#397854':'#192a21';ctx.fillRect(2,4,1,1);ctx.fillRect(5,4,1,1);ctx.fillStyle='#85583f';ctx.fillRect(3,6,2,1);}
    const tex=new THREE.CanvasTexture(c);tex.magFilter=tex.minFilter=THREE.NearestFilter;tex.encoding=THREE.sRGBEncoding;
    const m=new THREE.MeshLambertMaterial({map:tex});m.userData.shared=true;artCache.set(key,m);return m;
  }
  function makeHero(){
    const group=new THREE.Group();scene.add(group);
    const skin=pixelMaterial('skin',0xdba879),shirt=pixelMaterial('cloth',0x668141),pants=pixelMaterial('cloth',0x554736),hair=pixelMaterial('hair',0xa95020),boot=pixelMaterial('cloth',0x302a25);
    box(group,0,0,1.38,0,.64,.94,.34,shirt);
    box(group,0,0,2.18,0,.65,.65,.65,[hair,hair,hair,skin,faceMaterial('alex'),hair]);
    box(group,0,.23,1.77,-.2,.17,.55,.11,hair);box(group,0,0,1.02,.02,.66,.13,.37,pixelMaterial('belt',0x463323));
    box(group,0,.13,1.02,.22,.14,.11,.06,pixelMaterial('metal',0xc5a452));
    const arms=[],legs=[];
    for(const s of [-1,1]){const a=new THREE.Group();a.position.set(s*.47,1.82,0);group.add(a);box(a,0,0,-.2,0,.28,.4,.32,shirt);box(a,0,0,-.63,0,.26,.49,.3,skin);arms.push(a);const l=new THREE.Group();l.position.set(s*.17,.93,0);group.add(l);box(l,0,0,-.35,0,.3,.7,.32,pants);box(l,0,0,-.79,.025,.31,.2,.38,boot);legs.push(l);}
    const weapon=new THREE.Group();arms[1].add(weapon);weapon.position.set(0,-.88,0);weapon.rotation.x=-Math.PI/2;
    const blade=pixelMaterial('metal',0x75d9d2),edge=pixelMaterial('metal',0x174e52),handle=pixelMaterial('bark',0x6c492b);
    for(let i=0;i<9;i++){box(weapon,0,i*.085,-i*.085,0,.115,.115,.09,i<3?handle:blade);if(i>2)box(weapon,0,i*.085+.085,-i*.085,0,.075,.11,.09,edge);}
    box(weapon,0,.21,-.2,0,.41,.11,.12,edge);
    const shadow=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.1),shadowMaterial());shadow.rotation.x=-Math.PI/2;shadow.position.y=.025;group.add(shadow);
    return{group,arms,legs,weapon,x:0,z:0,facing:new THREE.Vector3(0,0,1),dashTime:0,invuln:0,attackTime:0,walkTime:0};
  }
  function shadowMaterial(){
    if(artCache.has('shadow'))return artCache.get('shadow');const c=document.createElement('canvas');c.width=c.height=32;const ctx=c.getContext('2d'),g=ctx.createRadialGradient(16,16,2,16,16,16);g.addColorStop(0,'rgba(0,8,12,.65)');g.addColorStop(1,'rgba(0,8,12,0)');ctx.fillStyle=g;ctx.fillRect(0,0,32,32);const m=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false});m.userData.shared=true;artCache.set('shadow',m);return m;
  }
  function terrain(p,random){
    const groups={};
    function add(kind,color,x,y,z,w,h,d){const key=kind+color;(groups[key]||(groups[key]={kind,color,items:[]})).items.push([x,y,z,w,h,d]);}
    const cave=floor%3===2,grass=cave?0x286768:0x367b52,stone=cave?0x424f66:0x84614c;
    for(let x=-19;x<=19;x++)for(let z=-19;z<=19;z++){
      const outer=Math.abs(x)>11||Math.abs(z)>11;
      const height=outer&&Math.abs(x)>2.5?1+Math.floor((Math.sin(x*.46)+Math.cos(z*.37)+2)*1.15):0;
      const path=Math.abs(x*.42+z-Math.sin(x*.28)*1.8)<2.2||Math.abs(x+z*.45)<1.25;
      add('rock',stone,x,height/2-1,z,1,height+2,1);
      add(path?'brick':'grass',path?0x958878:grass,x,height+.015,z,1,.08,1);
      if(!path&&random()<.65){for(let j=0;j<3;j++){const gx=x+(random()-.5)*.8,gz=z+(random()-.5)*.8,h=.12+random()*.32;add('leaf',random()<.15?0xbba342:0x3d9a72,gx,height+h/2+.07,gz,.045,h,.14);}}
      if(!path&&random()<.13){add('leaf',0x23654d,x,height+.2,z,.62,.36,.58);add('leaf',0x32856a,x+.18,height+.43,z-.1,.43,.2,.4);}
      if(!path&&random()<.055){add('leaf',0x49865e,x,height+.2,z,.045,.4,.045);add('flower',random()<.5?0xedb24c:0xb8d9bd,x,height+.44,z,.15,.1,.15);}
    }
    // Broken masonry frames the clearing instead of a square arena border.
    for(const side of [-1,1])for(let i=0;i<7;i++){
      const x=side*(7.5+i*.3),z=-5+i*1.1,h=1+Math.floor(random()*3);
      add('brick',0x686d64,x,h/2,z,1.2,h,1.05);add('grass',grass,x,h+.05,z,1.25,.1,1.1);
    }
    for(let i=0;i<26;i++){const a=random()*Math.PI*2,r=8+random()*8;const x=Math.cos(a)*r,z=Math.sin(a)*r;if(x>0&&z>5)continue;makeTree(x,z,p,random);}
    // Ruined dungeon gateway, pillars, stairs and hanging vines.
    for(const x of [-2.9,2.9]){for(let y=0;y<5;y++)add('brick',0x686a65,x,y*.72+.36,-8,1.05,.7,1.2);add('brick',0x949485,x,3.85,-8,1.4,.4,1.5);}
    for(let x=-2;x<=2;x++)add('brick',0x797b6f,x,4.04,-8,1,.65,1.2);
    for(let i=0;i<3;i++)add('brick',0x7d8073,0,.1+i*.13,-6.7-i*.4,4,.2,.55);
    for(let i=0;i<7;i++){const x=-2.8+random()*5.6;for(let j=0;j<3+Math.floor(random()*6);j++)add('leaf',0x29624b,x,3.8-j*.24,-7.32,.14,.27,.06);}
    for(const x of [-3.7,3.7])makeTorch(x,-6.5,p);
    makeTorch(-4,2,p);makeTorch(5,4,p);
    // Water channel with small stepping stones and a luminous falling sheet.
    add('water',0x216e83,-8,-.08,3,2,.1,9);
    for(let z=0;z<7;z+=2)add('brick',0x77877b,-8,.1,z,.9,.24,.68);
    const water=new THREE.Mesh(new THREE.PlaneGeometry(1.3,3.5),new THREE.MeshBasicMaterial({color:0x67b5cc,transparent:true,opacity:.42,side:THREE.DoubleSide}));water.position.set(-9,1.6,-2);root.add(water);
    for(const data of Object.values(groups)){const mesh=new THREE.InstancedMesh(boxGeo,pixelMaterial(data.kind,data.color),data.items.length);data.items.forEach((a,i)=>{tempM.compose(new THREE.Vector3(a[0],a[1],a[2]),tempQ.set(0,0,0,1),tempS.set(a[3],a[4],a[5]));mesh.setMatrixAt(i,tempM);});mesh.castShadow=data.kind==='brick';mesh.receiveShadow=true;root.add(mesh);}
    for(let i=0;i<18;i++)if(cave)makeCrystal((random()-.5)*18,(random()-.5)*18,p,random);
    const fireflies=new THREE.BufferGeometry(),positions=[];for(let i=0;i<75;i++)positions.push((random()-.5)*26,.5+random()*4,(random()-.5)*26);fireflies.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));root.add(new THREE.Points(fireflies,new THREE.PointsMaterial({color:0xffd27d,size:.055,transparent:true,opacity:.65})));
  }
  function makeTree(x,z,p,random){
    const g=new THREE.Group();g.position.set(x,Math.abs(x)>11||Math.abs(z)>11?2:0,z);root.add(g);
    const h=3.1+random()*2;box(g,0,0,h/2,0,.64,h,.64,pixelMaterial('bark',0x63503c));
    for(let i=0;i<7;i++){const a=i*2.4,r=i===0?0:.7+random()*.6;box(g,0,Math.cos(a)*r,h-.4+random()*1.2,Math.sin(a)*r,1.7,.85,1.7,pixelMaterial('leaf',i%2?0x246f59:0x32846a));}
    for(let i=0;i<3;i++){const a=random()*6.28;box(g,0,Math.cos(a)*.7,.15,Math.sin(a)*.7,.8,.25,.25,pixelMaterial('bark',0x554532));}
    for(let i=0;i<4;i++)box(g,0,.8,h-1-i*.25,.55,.13,.3,.13,pixelMaterial('leaf',0x3c7d50));
  }
  function makeTorch(x,z,p){
    const g=new THREE.Group();g.position.set(x,0,z);root.add(g);box(g,0,0,.55,0,.22,1.1,.22,pixelMaterial('bark',0x6b4934));box(g,0,0,1.2,0,.23,.32,.23,emissive(0xffb331,1));box(g,0,.04,1.42,0,.13,.2,.13,emissive(0xffe29a,1));
    const light=new THREE.PointLight(0xff9b42,1.7,6,2);light.position.set(x,1.5,z);root.add(light);
    const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d'),gr=ctx.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,184,69,.8)');gr.addColorStop(.2,'rgba(255,120,30,.25)');gr.addColorStop(1,'rgba(255,80,10,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,64,64);const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));sprite.position.set(0,1.4,0);sprite.scale.set(2.6,2.6,1);g.add(sprite);
  }
  function makeEnemy(type,x,z,index){
    const group=new THREE.Group();group.position.set(x,0,z);root.add(group);const boss=type==='warden',creeper=type==='slime';
    const skin=pixelMaterial('skin',boss?0x898879:creeper?0x4d9139:0x557e45),cloth=pixelMaterial('cloth',0x2d8888),dark=pixelMaterial('cloth',0x454569);
    let body;
    if(creeper){body=box(group,0,0,.93,0,.42,.87,.36,skin);box(group,0,0,1.67,0,.65,.65,.65,[skin,skin,skin,skin,faceMaterial('creeper'),skin]);for(const a of [-1,1])for(const b of [-1,1])box(group,0,a*.25,.23,b*.23,.28,.46,.35,skin);}
    else if(!boss){body=box(group,0,0,1.1,0,.64,.8,.35,cloth);box(group,0,0,1.86,0,.65,.65,.65,[skin,skin,skin,skin,faceMaterial('zombie'),skin]);for(const s of [-1,1]){box(group,0,s*.17,.38,0,.3,.76,.32,dark);box(group,0,s*.48,1.39,.36,.28,.28,.95,skin);}}
    else{body=box(group,0,0,1.7,0,1.6,1.75,.9,skin);box(group,0,0,2.9,.15,.9,.82,.8,pixelMaterial('brick',0x92917e));for(const s of [-1,1]){box(group,0,s*1.05,1.4,0,.48,1.8,.55,skin);box(group,0,s*.48,.4,0,.55,.8,.6,skin);box(group,0,s*.2,3.02,.58,.16,.12,.04,emissive(0xff4529,.6));}for(let i=0;i<6;i++)box(group,0,-.45,1.15+i*.22,.47,.16,.2,.03,pixelMaterial('leaf',0x3e653e));}
    // Per-enemy material copy keeps the hit flash local.
    body.material=body.material.clone();body.material.userData.shared=false;
    const shadow=new THREE.Mesh(new THREE.PlaneGeometry(boss?2.6:1.3,boss?2.6:1.3),shadowMaterial());shadow.rotation.x=-Math.PI/2;shadow.position.y=.06;group.add(shadow);
    const hp=boss?290+floor*36:creeper?38+floor*8:58+floor*10;
    const e={group,body,x,z,hp,maxHp:hp,type,boss,hit:0,attack:1+index*.17,seed:index*2.3,dead:false,charge:0};enemies.push(e);if(boss){ui.boss.classList.add('show');ui.bossHp.style.setProperty('--hp','100%');}return e;
  }

  player=makeHero();

  function legacy_terrain(p,random){
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
  function legacy_makeTree(x,z,p,random){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);const h=1.7+random()*.7;box(g,0,0,h/2,0,.43,h,.43,mat(p.side));for(const [dx,dy,dz,s] of [[0,h+.1,0,1.4],[-.45,h-.15,0,.8],[.45,h-.03,.14,.85],[0,h-.08,-.45,.85],[0,h-.08,.45,.85]])box(g,0,dx,dy,dz,s,.55,s,mat(new THREE.Color(p.tree).multiplyScalar(.84+random()*.35)));if(random()<.55)orb(g,p.accent,.38,h+.19,.48,.11);}
  function makeCrystal(x,z,p,random){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);for(let i=0;i<3;i++){const b=box(g,0,(random()-.5)*.6,.33,(random()-.5)*.6,.2,.65+random()*.5,.2,emissive(p.accent,.65));b.rotation.z=(random()-.5)*.4;}}
  function legacy_makeTorch(x,z,p){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);box(g,0,0,.32,0,.18,.64,.18,mat(p.side));orb(g,0xffbe66,0,.73,0,.19);const light=new THREE.PointLight(0xffa960,.65,4);light.position.set(0,.9,0);g.add(light);}
  function makeMushroom(x,z,p,random){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);box(g,0,0,.2,0,.14,.4,.14,mat(0xd8dac4));box(g,0,0,.45,0,.55,.2,.55,mat(random()<.5?0xfc948a:0xa67bd9));orb(g,0xffe6b3,.15,.57,.15,.06);}

  function legacy_makeEnemy(type,x,z,index){
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

  function makeChest(){const g=new THREE.Group();g.position.set(0,0,0);root.add(g);const wood=pixelMaterial('bark',0x9a6029),trim=pixelMaterial('metal',0x3b3025);box(g,0,0,.36,0,.95,.68,.73,wood);box(g,0,0,.73,0,1.02,.25,.8,wood);box(g,0,0,.62,.43,.13,.25,.07,pixelMaterial('metal',0xc8c4ac));for(const x of [-.43,.43])box(g,0,x,.43,.39,.075,.82,.07,trim);box(g,0,0,.61,.39,.9,.045,.065,trim);box(g,0,0,.06,.39,.9,.075,.065,trim);const glow=orb(g,0xffd97c,0,1.2,0,.25);glow.visible=false;chest={group:g,glow,open:false};}
  function makePortal(p){const g=new THREE.Group();g.position.set(0,0,0);root.add(g);const ring=new THREE.Mesh(new THREE.TorusGeometry(.9,.14,8,28),emissive(p.accent,.85));ring.position.y=1.25;g.add(ring);const inner=new THREE.Mesh(new THREE.CircleGeometry(.76,24),new THREE.MeshBasicMaterial({color:p.accent,transparent:true,opacity:.23,depthWrite:false,side:THREE.DoubleSide}));inner.position.set(0,1.25,-.01);g.add(inner);for(let i=0;i<8;i++){const a=i*Math.PI/4;orb(g,p.accent,Math.cos(a)*.92,1.25+Math.sin(a)*.92,.05,.1);}const light=new THREE.PointLight(p.accent,1.4,7);light.position.y=1.2;g.add(light);portal={group:g,ring,inner,t:0};}

  function old_buildFloor(){
    scene.remove(root);disposeTree(root);root=new THREE.Group();scene.add(root);effects.clear();
    enemies=[];drops=[];shots=[];bursts=[];chest=null;portal=null;nextFloorPending=false;waveTimer=0;
    const p=palettes[(floor-1)%palettes.length],random=rng(73419+floor*61813);
    scene.background=new THREE.Color(p.sky);scene.fog=new THREE.FogExp2(p.fog,.008);
    sun.color.setHex(p.light);ambient.color.setHex(0xa6cbd9);fill.color.setHex(p.accent);
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
  function baseHitEnemy(e,amount,critical=false){
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

    }
  }
  function baseMelee(){
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
  function old_bolt(){
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
  function baseDamagePlayer(amount){
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
  function old_openChest(){
    if(!chest||chest.open)return;chest.open=true;chest.group.visible=false;
    sparks(0,1,0,colors.gold,55,1.5);for(let i=0;i<12;i++)drop((Math.random()-.5)*2,(Math.random()-.5)*2,'gem');
    const heal=Math.min(stats.maxHp-stats.hp,20);stats.hp+=heal;gems+=20+floor*7;
    flash('#ffe499',.38);shake=.5;toast('TREASURE +'+(20+floor*7));sound(760,.45,'triangle',.13);
    makePortal(palettes[(floor-1)%palettes.length]);ui.tip.textContent='ENTER THE PORTAL';updateHud();
  }
  function old_gainXp(n){xp+=n;if(xp>=xpGoal){xp-=xpGoal;xpGoal=Math.round(xpGoal*1.33+7);level++;toast('LEVEL UP!');sparks(player.x,1.2,player.z,colors.gold,35,1.2);chooseUpgrade();}updateHud();}
  function baseUpdateHud(){ui.hp.style.width=Math.max(0,stats.hp/stats.maxHp*100)+'%';ui.hpText.textContent=Math.ceil(stats.hp)+' / '+stats.maxHp;ui.xp.style.width=Math.min(100,xp/xpGoal*100)+'%';ui.level.textContent='LEVEL '+level;ui.gems.textContent=gems;}
  function old_movePlayer(dt,time){
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
  function old_updateEnemies(dt,time){
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
  function old_updateShots(dt){
    for(let i=shots.length-1;i>=0;i--){const s=shots[i],m=s.m;s.life-=dt;m.position.x+=s.dx*10*dt;m.position.z+=s.dz*10*dt;m.rotation.y+=dt*9;m.rotation.z+=dt*8;
      let hit=null;for(const e of enemies)if(!e.dead&&Math.hypot(e.x-m.position.x,e.z-m.position.z)<(e.boss?1.05:.65)){hit=e;break;}
      if(hit){hitEnemy(hit,stats.bolt,Math.random()<stats.crit);sparks(m.position.x,1.2,m.position.z,colors.aqua,18,1.1);s.life=0;}
      if(s.life<=0){effects.remove(m);m.geometry.dispose();m.material.dispose();shots.splice(i,1);}
    }
  }
  function old_updateDrops(dt,time){
    for(let i=drops.length-1;i>=0;i--){const d=drops[i],g=d.g;d.t+=dt;const dx=player.x-g.position.x,dz=player.z-g.position.z,dist=Math.hypot(dx,dz);
      if(dist<3){const rate=dt*(dist<1?12:4);g.position.x+=dx*rate;g.position.z+=dz*rate;}else{g.position.x+=d.vx*dt;g.position.z+=d.vz*dt;d.vx*=.94;d.vz*=.94;}
      g.position.y=.64+Math.sin(d.t*4)*.13;g.rotation.y+=dt*3;
      if(dist<.54){if(d.type==='gem'){gems++;sound(880,.075,'sine',.025);}else if(d.type==='heart'){stats.hp=Math.min(stats.maxHp,stats.hp+18);sound(630,.15,'sine',.05);}else{gainXp(7+floor*2);sound(740,.15,'sine',.045);}effects.remove(g);g.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});drops.splice(i,1);updateHud();}
    }
  }
  function updateBursts(dt){for(let i=bursts.length-1;i>=0;i--){const b=bursts[i];b.life-=dt;if(!b.arc){b.m.position.x+=b.vx*dt;b.m.position.y+=b.vy*dt;b.m.position.z+=b.vz*dt;b.vy-=11*dt;b.m.scale.multiplyScalar(.985);}else b.m.material.opacity=Math.max(0,b.life/b.max);if(b.life<=0){effects.remove(b.m);if(b.m.geometry!==boxGeo)b.m.geometry.dispose();b.m.material.dispose();bursts.splice(i,1);}}}
  function baseControls(){
    addEventListener('keydown',e=>{const k=e.key.toLowerCase();if([' ','arrowup','arrowdown','arrowleft','arrowright'].includes(k))e.preventDefault();keys.add(k);if(k==='j')melee();if(k==='k')bolt();if(k===' '||k==='l')dash();});
    addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));addEventListener('blur',()=>keys.clear());
    for(const [id,fn] of [['melee',melee],['ranged',bolt],['dash',dash],['touchSword',melee],['touchBolt',bolt],['touchDash',dash]])$(id).addEventListener('pointerdown',e=>{e.preventDefault();fn();});

    ui.stick.addEventListener('pointerdown',e=>{e.preventDefault();stick.id=e.pointerId;ui.stick.setPointerCapture(e.pointerId);updateStick(e);});
    ui.stick.addEventListener('pointermove',e=>{if(e.pointerId===stick.id)updateStick(e);});
    for(const name of ['pointerup','pointercancel','lostpointercapture'])ui.stick.addEventListener(name,()=>{stick.id=null;stick.x=stick.y=0;ui.nub.style.transform='translate(-50%,-50%)';});
    ui.sound.addEventListener('click',()=>{soundOn=!soundOn;ui.sound.textContent=soundOn?'♪':'♩';});
    ui.start.addEventListener('click',resetGame);ui.restart.addEventListener('click',resetGame);
  }
  function updateStick(e){const r=ui.stick.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2),d=Math.max(1,Math.hypot(x,y)),f=Math.min(1,45/d);stick.x=x*f/45;stick.y=y*f/45;ui.nub.style.transform='translate(calc(-50% + '+(x*f)+'px),calc(-50% + '+(y*f)+'px))';}
  function baseResetGame(){
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
    sun.position.set(player.x-12,22,player.z+14);sun.target.position.set(player.x,0,player.z);
    const jitter=shake?(Math.random()-.5)*shake:0;shake*=.86;if(shake<.005)shake=0;
    const target=new THREE.Vector3(player.x,0,player.z);const camPos=new THREE.Vector3(player.x+14,18,player.z+21);camera.position.lerp(camPos,.07);camera.position.x+=jitter;camera.position.y+=jitter;camera.lookAt(target);renderer.render(scene,camera);
  }
  const quest={revives:3,rescued:0,key:false,boss:false,complete:false,cages:[],zones:[],gates:[],arrows:30,potion:0,artifact:0,points:0,combo:0,comboTime:0,held:false,target:null,bag:[],equipped:{},marker:null};
  const gearTypes=[{name:'Hunter Sword',slot:'sword',power:30},{name:'Storm Bow',slot:'bow',power:42},{name:'Guard Armor',slot:'armor',power:5}];
  function buildFloor(){
    scene.remove(root);disposeTree(root);disposeTree(effects);effects.clear();root=new THREE.Group();scene.add(root);
    enemies=[];drops=[];shots=[];bursts=[];chest=null;portal=null;quest.cages=[];quest.zones=[];quest.gates=[];quest.rescued=0;quest.key=false;quest.boss=false;quest.complete=false;quest.target=null;
    const world=root;
    for(let i=0;i<3;i++){const zone=new THREE.Group();world.add(zone);zone.position.z=-38*i;root=zone;terrain(palettes[i],rng(73419+floor*601+i*722));quest.zones.push(zone);}
    root=world;scene.background=new THREE.Color(0x132b31);scene.fog=new THREE.FogExp2(0x244b51,.012);sun.color.setHex(0xffd4a4);ambient.color.setHex(0x9bc5d9);
    player.x=0;player.z=8;player.group.position.set(0,0,8);player.facing.set(0,0,-1);player.group.visible=true;player.invuln=1;
    camera.position.set(14,18,29);camera.lookAt(player.group.position);
    const placements=[[-5,1,'mystic'],[5,-1,'slime'],[-5,-7,'mystic'],[4,-7,'slime'],[0,-34,'mystic'],[-6,-39,'slime'],[5,-42,'mystic'],[-3,-71,'mystic'],[4,-73,'slime']];
    placements.forEach(([x,z,t],i)=>{const e=makeEnemy(t,x,z,i);e.hp=e.maxHp=t==='slime'?40:64;e.alert=false;});
    const keeper=makeEnemy('mystic',0,-43,23);keeper.hp=keeper.maxHp=150;keeper.keeper=true;keeper.group.scale.setScalar(1.2);keeper.body.material.color.setHex(0xffcc86);
    const boss=makeEnemy('warden',0,-80,99);boss.hp=boss.maxHp=360+floor*30;boss.alert=false;ui.boss.classList.remove('show');
    for(const [x,z] of [[-6,-3],[6,-4],[0,-8]])makeCage(x,z);
    for(const z of [-16,-54]){const g=new THREE.Group();g.position.z=z;root.add(g);for(let i=-2;i<=2;i++)box(g,0,i,1.1,0,.16,2.2,.16,pixelMaterial('metal',0x65716c));box(g,0,0,1.6,0,4.4,.12,.2,pixelMaterial('metal',0x65716c));quest.gates.push(g);}
    makeChest();chest.group.position.set(7,0,-38);chest.glow.visible=true;
    makePortal(palettes[1]);portal.group.position.set(0,0,-85);portal.group.visible=false;
    quest.marker=new THREE.Mesh(new THREE.RingGeometry(.25,.37,20),new THREE.MeshBasicMaterial({color:0xffd479,side:THREE.DoubleSide}));quest.marker.rotation.x=-Math.PI/2;quest.marker.visible=false;root.add(quest.marker);
    ui.floor.textContent=String(floor).padStart(2,'0');ui.tip.textContent='FREE THE VILLAGERS · 0 / 3';updateHud();toast('CREEPER WOODS');
  }
  function makeCage(x,z){const g=new THREE.Group();g.position.set(x,0,z);root.add(g);const bars=new THREE.Group();g.add(bars);const iron=pixelMaterial('metal',0x657573);
    for(const s of [-1,1])for(let i=-1;i<=1;i++){box(bars,0,s*.7,1,i*.6,.07,2,.07,iron);box(bars,0,i*.6,1,s*.7,.07,2,.07,iron);}box(bars,0,0,2,0,1.6,.13,1.6,iron);
    const cloth=pixelMaterial('cloth',0x816049),skin=pixelMaterial('skin',0xb89974);box(g,0,0,.73,0,.54,1.1,.4,cloth);box(g,0,0,1.54,0,.61,.6,.6,skin);box(g,0,0,1.45,.38,.14,.3,.2,skin);for(const s of [-1,1])box(g,0,s*.15,1.6,.31,.12,.07,.03,pixelMaterial('skin',0x2c4937));
    const icon=orb(g,0xffd676,0,2.55,0,.13);quest.cages.push({g,bars,icon,x,z,freed:false});
  }
  function walkable(x,z){
    if(z>10.7||z< -87)return false;
    const room=quest.zones.some((_,i)=>Math.abs(z+38*i)<=10.7&&Math.abs(x)<=10.7);
    if(!room&&Math.abs(x)>2.15)return false;
    if(quest.rescued<3&&z< -15.5)return false;
    if(!quest.key&&z< -53.5)return false;
    return true;
  }
  function goal(){if(quest.rescued<3){const c=quest.cages.find(c=>!c.freed);return{x:c.x,z:c.z};}if(!quest.key)return{x:0,z:-43};if(!quest.boss)return{x:0,z:-80};return{x:0,z:-85};}
  function interaction(){
    if(!playing||pausedForUpgrade)return;
    const c=quest.cages.find(c=>!c.freed&&Math.hypot(player.x-c.x,player.z-c.z)<2.2);
    if(c){c.freed=true;c.bars.visible=false;c.icon.visible=false;quest.rescued++;sparks(c.x,1,c.z,colors.gold,22);sound(780,.3);toast('VILLAGER FREED');if(quest.rescued===3){quest.gates[0].visible=false;pickupGear(player.x,player.z,true);toast('THE PATH IS OPEN');}updateHud();return;}
    if(chest&&!chest.open&&Math.hypot(player.x-7,player.z+38)<2.2){openChest();return;}
    if(quest.boss&&Math.hypot(player.x,player.z+85)<2.5){quest.complete=true;pausedForUpgrade=true;ui.upgrade.classList.remove('hidden');ui.upgrade.querySelector('.eyebrow').textContent='MISSION COMPLETE';ui.upgrade.querySelector('h1').innerHTML='VILLAGE<br><em>SAVED</em>';ui.choices.innerHTML='<p>3 villagers freed · '+gems+' emeralds · '+quest.bag.length+' items found</p><button class="primary" id="nextMission">NEXT EXPEDITION →</button>';$('nextMission').onclick=()=>{floor++;stats.hp=stats.maxHp;quest.arrows+=20;pausedForUpgrade=false;ui.upgrade.classList.add('hidden');buildFloor();};}
  }
  function pickupGear(x,z,guaranteed=false){const spec=gearTypes[Math.floor(Math.random()*3)],rare=guaranteed||Math.random()<.3;const item={...spec,power:Math.round(spec.power*(1+(floor-1)*.2+(rare?.35:0))),rare,enchanted:false,id:Date.now()+Math.random()};drop(x,z,'gear');const d=drops[drops.length-1];d.item=item;d.g.children[0].material.color.setHex(rare?0xbd75ff:0x8ef7e3);d.g.scale.setScalar(1.65);}
  function hitEnemy(e,amount,critical=false){const alive=!e.dead;baseHitEnemy(e,amount,critical);if(alive&&e.dead){if(e.warning){root.remove(e.warning);e.warning.geometry.dispose();e.warning.material.dispose();}quest.arrows+=e.boss?8:2;if(e.keeper){quest.key=true;quest.gates[1].visible=false;toast('RUNE KEY ACQUIRED');pickupGear(e.x,e.z,true);}else if(e.boss){quest.boss=true;portal.group.visible=true;pickupGear(e.x,e.z,true);toast('THE VILLAGE IS SAFE');}else if(Math.random()<.38)pickupGear(e.x,e.z);updateHud();}}
  function melee(){if(!playing||pausedForUpgrade||cooldown.melee>0)return;quest.combo=quest.comboTime>0?(quest.combo+1)%3:0;quest.comboTime=1.2;const original=stats.damage;if(quest.combo===2)stats.damage*=1.65;baseMelee();stats.damage=original;if(quest.combo===2){shake=.25;sound(160,.18,'sawtooth',.08);}}
  function bolt(){if(!playing||pausedForUpgrade||cooldown.bolt>0)return;if(quest.arrows<=0){toast('NO ARROWS');return;}quest.arrows--;cooldown.bolt=.62;const e=nearest(12);let dx=player.facing.x,dz=player.facing.z;if(e){const d=Math.hypot(e.x-player.x,e.z-player.z)||1;dx=(e.x-player.x)/d;dz=(e.z-player.z)/d;}const m=new THREE.Mesh(new THREE.BoxGeometry(.075,.075,.8),pixelMaterial('bark',0xbdad84).clone());m.position.set(player.x,1.25,player.z);m.rotation.y=Math.atan2(dx,dz);effects.add(m);shots.push({m,dx,dz,life:1,damage:stats.bolt});sound(500,.08,'sawtooth',.04);updateHud();}
  function potion(){if(!playing||pausedForUpgrade||quest.potion>0||stats.hp>=stats.maxHp)return;stats.hp=Math.min(stats.maxHp,stats.hp+65);quest.potion=18;sparks(player.x,1,player.z,0xff7891,30);sound(680,.25);updateHud();}
  function artifact(){if(!playing||pausedForUpgrade||quest.artifact>0)return;quest.artifact=8;const targets=enemies.filter(e=>!e.dead&&Math.hypot(e.x-player.x,e.z-player.z)<7).slice(0,4);for(const e of targets){const m=new THREE.Mesh(new THREE.CylinderGeometry(.065,.12,7,5),new THREE.MeshBasicMaterial({color:0x92eaff,transparent:true,opacity:1}));m.position.set(e.x,3.5,e.z);effects.add(m);bursts.push({m,life:.22,max:.22,arc:true});hitEnemy(e,60+level*6,true);}sparks(player.x,1,player.z,colors.aqua,28);flash('#7ceeff',.15);sound(140,.4,'sawtooth',.09);}
  function gainXp(n){xp+=n;while(xp>=xpGoal){xp-=xpGoal;xpGoal=Math.round(xpGoal*1.3+5);level++;quest.points++;stats.maxHp+=5;stats.hp=Math.min(stats.maxHp,stats.hp+25);toast('LEVEL UP · +1 ENCHANT POINT');sparks(player.x,1,player.z,colors.gold,25);}updateHud();}
  function openChest(){if(!chest||chest.open)return;chest.open=true;chest.group.rotation.z=.12;chest.glow.visible=false;pickupGear(7,-38,true);quest.arrows+=12;for(let i=0;i<8;i++)drop(7+(Math.random()-.5),-38+(Math.random()-.5),'gem');sparks(7,1,-38,colors.gold,32);sound(760,.35);toast('RARE TREASURE');updateHud();}
  function inventory(){if(!playing||quest.complete)return;pausedForUpgrade=!pausedForUpgrade;$('inventory').classList.toggle('hidden',!pausedForUpgrade);quest.held=false;keys.clear();if(pausedForUpgrade)drawInventory();}
  function drawInventory(){const list=$('gearList');list.replaceChildren();$('enchantCount').textContent=quest.points+' ENCHANT POINTS';for(const item of quest.bag){const b=document.createElement('button');b.className='choice'+(item.rare?' rare':'');const equipped=quest.equipped[item.slot]===item.id;b.innerHTML='<strong>'+item.name+(item.enchanted?' ✦':'')+'</strong><small>'+item.slot.toUpperCase()+' · POWER '+item.power+(equipped?' · EQUIPPED':' · TAP TO EQUIP')+'</small>';b.onclick=()=>{quest.equipped[item.slot]=item.id;stats[item.slot==='sword'?'damage':item.slot==='bow'?'bolt':'armor']=item.power;drawInventory();sound(550,.12);};list.append(b);if(equipped&&!item.enchanted){const en=document.createElement('button');en.className='choice';en.textContent='✦ ENCHANT · 1 POINT';en.disabled=quest.points<1;en.onclick=()=>{if(quest.points<1)return;quest.points--;item.enchanted=true;item.power=Math.round(item.power*1.25+1);stats[item.slot==='sword'?'damage':item.slot==='bow'?'bolt':'armor']=item.power;drawInventory();sound(950,.2);};list.append(en);}}}
  function updateHud(){baseUpdateHud();if(!$('ammo'))return;$('ammo').textContent='➶ '+quest.arrows;$('potion').textContent=quest.potion>0?Math.ceil(quest.potion)+'s':'♥';$('artifact').textContent=quest.artifact>0?Math.ceil(quest.artifact)+'s':'ϟ';ui.tip.textContent=quest.rescued<3?'FREE THE VILLAGERS · '+quest.rescued+' / 3':!quest.key?'FIND THE RUNE KEEPER':!quest.boss?'DEFEAT THE STONE GOLEM':'REACH THE EXIT';}
  function movePlayer(dt,time){
    quest.potion=Math.max(0,quest.potion-dt);quest.artifact=Math.max(0,quest.artifact-dt);quest.comboTime-=dt;
    const sx=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0)+stick.x,sy=(keys.has('s')||keys.has('arrowdown')?1:0)-(keys.has('w')||keys.has('arrowup')?1:0)+stick.y;
    let x=.832*sx+.555*sy,z=-.555*sx+.832*sy;
    if(Math.hypot(x,z)>.1)quest.target=null;else if(quest.target){const enemy=quest.target.enemy;if(enemy){quest.target.x=enemy.x;quest.target.z=enemy.z;}x=quest.target.x-player.x;z=quest.target.z-player.z;if(enemy&&enemy.dead){quest.target=null;x=z=0;}else if(Math.hypot(x,z)<(enemy?2.25:.22)){if(enemy)melee();else quest.target=null;x=z=0;}}
    const mag=Math.hypot(x,z);if(mag>.1){x/=mag;z/=mag;if(player.dashTime<=0)player.facing.set(x,0,z);}
    const rolling=player.dashTime>0,speed=rolling?12:stats.speed;if(rolling){x=player.facing.x;z=player.facing.z;player.dashTime-=dt;}
    const nx=player.x+x*speed*dt,nz=player.z+z*speed*dt;if(walkable(nx,player.z))player.x=nx;if(walkable(player.x,nz))player.z=nz;
    player.group.position.set(player.x,rolling?.2:Math.sin(time*13)*.04*(mag>.1?1:0),player.z);player.group.rotation.z=rolling?Math.sin(player.dashTime/.22*Math.PI)*.7:0;
    if(mag>.1||rolling)player.group.rotation.y=Math.atan2(player.facing.x,player.facing.z);
    const swing=Math.sin(time*12)*Math.min(1,mag)*.45;player.legs[0].rotation.x=swing;player.legs[1].rotation.x=-swing;player.arms[0].rotation.x=-swing*.65;player.arms[1].rotation.x=swing*.65-(player.attackTime>0?1.7:0);player.attackTime=Math.max(0,player.attackTime-dt);player.invuln=Math.max(0,player.invuln-dt);player.group.visible=player.invuln<=0||Math.floor(time*18)%2===0;
    if(quest.held||keys.has('j'))melee();if(keys.has('k'))bolt();
    quest.zones.forEach((g,i)=>g.visible=Math.abs(player.z+38*i)<29);
    const nearCage=quest.cages.some(c=>!c.freed&&Math.hypot(player.x-c.x,player.z-c.z)<2.2),nearChest=chest&&!chest.open&&Math.hypot(player.x-7,player.z+38)<2.2,nearExit=quest.boss&&Math.hypot(player.x,player.z+85)<2.5;
    $('interact').style.display=nearCage||nearChest||nearExit?'block':'none';$('interact').textContent=nearCage?'FREE · E':nearChest?'OPEN · E':'EXIT · E';
    const g=goal(),a=Math.atan2(g.x-player.x,-(g.z-player.z));$('compass').style.transform='rotate('+a+'rad)';
    if(quest.marker){quest.marker.visible=!!quest.target;if(quest.target)quest.marker.position.set(quest.target.x,.1,quest.target.z);}
    updateHud();drawMap();
  }
  function updateEnemies(dt,time){for(const e of enemies){if(e.dead)continue;const dx=player.x-e.x,dz=player.z-e.z,d=Math.hypot(dx,dz)||1;e.hit=Math.max(0,e.hit-dt);if(e.hit===0)e.body.material.emissiveIntensity=0;
    if(!e.alert&&d<6.5){e.alert=true;if(e.boss){ui.boss.classList.add('show');ui.bossHp.style.setProperty('--hp',e.hp/e.maxHp*100+'%');toast('STONE GOLEM');}}
    if(!e.alert||d>18)continue;e.attack-=dt;
    if(e.type==='slime'&&d<2.3&&e.fuse===undefined){e.fuse=.9;const ring=new THREE.Mesh(new THREE.RingGeometry(2.8,3,28),new THREE.MeshBasicMaterial({color:0xff5944,transparent:true,opacity:.8,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(e.x,.08,e.z);root.add(ring);e.warning=ring;}
    if(e.fuse!==undefined){e.fuse-=dt;e.body.material.emissive.setHex(0xffffff);e.body.material.emissiveIntensity=Math.sin(time*35)>.1?1:0;if(e.fuse<=0){if(d<3)damagePlayer(30);sparks(e.x,1,e.z,0xffa147,35,1.5);root.remove(e.warning);hitEnemy(e,e.hp);continue;}}
    else if(e.windup!==undefined){e.windup-=dt;if(e.windup<=0){if(d<(e.boss?3.6:1.8))damagePlayer(e.boss?32:13);if(e.warning)root.remove(e.warning);e.windup=undefined;e.attack=e.boss?2.6:1.2;sparks(e.x,.3,e.z,0xd5c4a3,e.boss?25:4);}}
    else if(d<(e.boss?3:1.45)&&e.attack<=0){e.windup=e.boss?.85:.35;if(e.boss){const ring=new THREE.Mesh(new THREE.RingGeometry(3.4,3.6,28),new THREE.MeshBasicMaterial({color:0xff704b,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(e.x,.09,e.z);root.add(ring);e.warning=ring;}}
    else if(d>(e.boss?2.7:1.25)){const speed=e.boss?1.35:1.65,nx=e.x+dx/d*speed*dt,nz=e.z+dz/d*speed*dt;if(walkable(nx,nz)){e.x=nx;e.z=nz;}}
    e.group.position.set(e.x,Math.abs(Math.sin(time*5+e.seed))*.045,e.z);e.group.rotation.y=Math.atan2(dx,dz);
  }}
  function updateShots(dt){for(let i=shots.length-1;i>=0;i--){const s=shots[i];s.life-=dt;s.m.position.x+=s.dx*17*dt;s.m.position.z+=s.dz*17*dt;const e=enemies.find(e=>!e.dead&&Math.hypot(e.x-s.m.position.x,e.z-s.m.position.z)<(e.boss?1:.65));if(e){hitEnemy(e,s.damage);s.life=0;}if(s.life<=0){effects.remove(s.m);s.m.geometry.dispose();s.m.material.dispose();shots.splice(i,1);}}}
  function updateDrops(dt,time){for(let i=drops.length-1;i>=0;i--){const d=drops[i],g=d.g;d.t+=dt;const dx=player.x-g.position.x,dz=player.z-g.position.z,dist=Math.hypot(dx,dz);if(dist<2.5){g.position.x+=dx*Math.min(1,dt*7);g.position.z+=dz*Math.min(1,dt*7);}else{g.position.x+=d.vx*dt;g.position.z+=d.vz*dt;d.vx*=.94;d.vz*=.94;}g.position.y=.6+Math.sin(d.t*4)*.12;g.rotation.y+=dt*2;if(dist<.55){if(d.type==='gear'){quest.bag.push(d.item);toast(d.item.name.toUpperCase()+' · I TO EQUIP');sound(950,.3);}else if(d.type==='gem')gems++;else if(d.type==='heart')stats.hp=Math.min(stats.maxHp,stats.hp+18);else gainXp(8);effects.remove(g);g.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});drops.splice(i,1);updateHud();}}}
  function drawMap(){const ctx=$('map').getContext('2d');ctx.clearRect(0,0,76,142);ctx.fillStyle='#425651';ctx.fillRect(34,12,8,115);for(let i=0;i<3;i++){ctx.fillStyle='#56736a';ctx.fillRect(18,15+i*41,40,28);}const toMap=(x,z)=>[38+x*1.7,120+z*1.25];for(const c of quest.cages){if(c.freed)continue;const a=toMap(c.x,c.z);ctx.fillStyle='#ffe38e';ctx.fillRect(a[0]-2,a[1]-2,4,4);}const goalPos=goal(),b=toMap(goalPos.x,goalPos.z);ctx.strokeStyle='#ffcf7c';ctx.strokeRect(b[0]-3,b[1]-3,6,6);const a=toMap(player.x,player.z);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(a[0],a[1],3,0,7);ctx.fill();}
  function controls(){baseControls();addEventListener('keydown',e=>{if(e.repeat)return;const k=e.key.toLowerCase();if(k==='e')interaction();if(k==='i'||k==='escape')inventory();if(k==='q')potion();if(k==='f')artifact();});
    $('inventoryButton').onclick=inventory;$('closeInventory').onclick=inventory;$('potion').onclick=potion;$('artifact').onclick=artifact;$('interact').onclick=interaction;
    for(const id of ['touchSword','melee'])$(id).addEventListener('pointerdown',()=>quest.held=true);addEventListener('pointerup',()=>quest.held=false);addEventListener('pointercancel',()=>quest.held=false);addEventListener('blur',()=>quest.held=false);
    renderer.domElement.addEventListener('pointerdown',e=>{if(!playing||pausedForUpgrade||mobile)return;const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2),camera);const hits=ray.intersectObjects(enemies.filter(e=>!e.dead).map(e=>e.group),true);if(hits.length){const victim=enemies.find(enemy=>{let o=hits[0].object;while(o){if(o===enemy.group)return true;o=o.parent;}return false;});if(victim)quest.target={x:victim.x,z:victim.z,enemy:victim};return;}const point=new THREE.Vector3();if(ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),point)&&walkable(point.x,point.z))quest.target={x:point.x,z:point.z};});
  }
  function damagePlayer(amount){baseDamagePlayer(amount);if(ended){ui.dead.querySelector('h1').innerHTML=quest.revives>0?'BACK TO<br><em>THE FIGHT</em>':'QUEST<br><em>ENDED</em>';ui.result.textContent=quest.revives>0?quest.revives+' revives remaining · equipment kept':'No revives left';ui.restart.textContent=quest.revives>0?'REVIVE →':'NEW QUEST →';}}
  function resetGame(){if(ended&&quest.revives>0){quest.revives--;ended=false;playing=true;stats.hp=stats.maxHp;player.x=0;player.z=quest.key?-68:quest.rescued===3?-30:8;player.invuln=2;quest.target=null;quest.held=false;ui.dead.classList.add('hidden');updateHud();return;}quest.revives=3;quest.arrows=30;quest.potion=0;quest.artifact=0;quest.points=0;quest.held=false;quest.combo=0;quest.bag=[{name:'Iron Sword',slot:'sword',power:24,id:1},{name:'Hunting Bow',slot:'bow',power:28,id:2},{name:'Traveler Armor',slot:'armor',power:0,id:3}];quest.equipped={sword:1,bow:2,armor:3};$('inventory').classList.add('hidden');baseResetGame();}
  if(location.hostname==='127.0.0.1'&&new URLSearchParams(location.search).has('qa'))window.questQA={state:()=>({kills:enemies.filter(e=>e.dead).length,rescued:quest.rescued,key:quest.key,boss:quest.boss,complete:quest.complete,x:player.x,z:player.z,arrows:quest.arrows,hp:stats.hp,bag:quest.bag.length,paused:pausedForUpgrade}),place:(x,z)=>{player.x=x;player.z=z;},killKeeper:()=>hitEnemy(enemies.find(e=>e.keeper),10000),killBoss:()=>hitEnemy(enemies.find(e=>e.boss),10000),loot:()=>pickupGear(player.x,player.z,true),hurt:()=>{stats.hp=20;},xp:()=>gainXp(100),canWalk:walkable};

  controls();buildFloor();updateHud();frame();
})();

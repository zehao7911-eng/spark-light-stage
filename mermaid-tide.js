(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const ui = { loading:$('loading'), status:$('load-status'), bar:$('load-bar'), intro:$('intro'), play:$('play'), retry:$('retry'), world:$('world'), score:$('score'), level:$('level'), progress:$('progress'), toast:$('toast'), floats:$('float-layer'), sound:$('sound'), view:$('view'), hint:$('hint') };
  const mobile = matchMedia('(max-width: 700px)').matches;
  const colors = [0x8cfbed,0xffb9e3,0xffe6aa,0x91b8ff];
  const colorCSS = ['#8cfbed','#ffb9e3','#ffe6aa','#91b8ff'];
  const palettes = [
    {bg:0x041b27,fog:0x052c38,light:0x81f7df,accent:'#8cfbed'},
    {bg:0x172440,fog:0x1c3654,light:0xc3b7ff,accent:'#cabdff'},
    {bg:0x132b34,fog:0x285b59,light:0xffd99a,accent:'#ffe6aa'},
    {bg:0x1b1b3e,fog:0x303367,light:0xffaace,accent:'#ffb9e3'}
  ];
  let scene, camera, renderer, clock, mixer, dancer, reef, pearls=[], motes, score=0, caught=0, level=1, streak=0, lastCatch=0, lastColor=null, lastSlot=-1, started=false, soundOn=true, audioCtx, yaw=0, targetYaw=0, viewIndex=0, pointerStart=null, running=true, toastTimer, loadedBytes=0, totalBytes=0, aborted=false;
  const gltfLoader = new THREE.GLTFLoader();
  const pearlGeometry = new THREE.IcosahedronGeometry(.39,2);
  const ringGeometry = new THREE.TorusGeometry(.56,.025,5,36);
  const glowCanvas = document.createElement('canvas'); glowCanvas.width=64;glowCanvas.height=64;
  const glowContext = glowCanvas.getContext('2d'), gradient = glowContext.createRadialGradient(32,32,3,32,32,32);
  gradient.addColorStop(0,'rgba(255,255,255,.9)');gradient.addColorStop(.2,'rgba(255,255,255,.45)');gradient.addColorStop(1,'rgba(255,255,255,0)');
  glowContext.fillStyle=gradient;glowContext.fillRect(0,0,64,64);
  const glowTexture = new THREE.CanvasTexture(glowCanvas);

  function init3D() {
    scene = new THREE.Scene();scene.background=new THREE.Color(0x041b27);scene.fog=new THREE.FogExp2(0x052c38,.012);
    camera=new THREE.PerspectiveCamera(mobile?51:45,innerWidth/innerHeight,.08,250);
    camera.position.set(0,8,27);camera.lookAt(0,7,0);
    renderer=new THREE.WebGLRenderer({antialias:!mobile,alpha:false,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.6));renderer.setSize(innerWidth,innerHeight);
    renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.87;
    ui.world.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0x8be9f6,0x153449,1.2));
    const key=new THREE.DirectionalLight(0xb4fff2,1.55);key.position.set(-6,18,14);scene.add(key);
    const fill=new THREE.PointLight(0x7099ff,1.6,60);fill.position.set(9,10,6);scene.add(fill);
    const rim=new THREE.PointLight(0x7affda,1.4,45);rim.position.set(-7,7,-6);scene.add(rim);
    clock=new THREE.Clock();addMotes();onResize();requestAnimationFrame(tick);
  }
  function addMotes(){
    const n=mobile?120:220,positions=new Float32Array(n*3);
    for(let i=0;i<n;i++){positions[i*3]=(Math.random()-.5)*34;positions[i*3+1]=Math.random()*19;positions[i*3+2]=(Math.random()-.5)*27;}
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
    motes=new THREE.Points(geo,new THREE.PointsMaterial({color:0xaafbf0,size:.075,transparent:true,opacity:.62,depthWrite:false,blending:THREE.AdditiveBlending}));scene.add(motes);
  }
  function onResize(){if(!camera)return;camera.aspect=innerWidth/innerHeight;camera.fov=innerWidth<650?51:45;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.25:1.6));}
  function progressText(label){ui.status.textContent=label;ui.bar.style.width=Math.min(94,Math.round(loadedBytes/Math.max(1,totalBytes)*86))+'%';}
  async function fetchAsset(label,stem,signal){
    const res=await fetch(stem+'-manifest.json',{signal});if(!res.ok)throw Error('Missing '+label+' manifest ('+res.status+')');
    const manifest=await res.json();totalBytes+=manifest.bytes;
    progressText('Loading '+label+'…');
    const chunks=[];
    for(let i=0;i<manifest.parts.length;i+=2){
      const batch=manifest.parts.slice(i,i+2);
      const data=await Promise.all(batch.map(async filename=>{
        const r=await fetch(filename,{signal});if(!r.ok)throw Error('Missing '+filename+' ('+r.status+')');
        const array=new Uint8Array(await r.arrayBuffer());loadedBytes+=array.byteLength;progressText('Loading '+label+' · '+Math.round(loadedBytes/Math.max(1,totalBytes)*100)+'%');return array;
      }));chunks.push(...data);
    }
    const bytes=new Uint8Array(manifest.bytes);let offset=0;
    for(const part of chunks){bytes.set(part,offset);offset+=part.byteLength;}
    if(offset!==manifest.bytes)throw Error('Incomplete '+label+' data');
    progressText('Building '+label+'…');
    await new Promise(resolve=>requestAnimationFrame(resolve));
    return new Promise((resolve,reject)=>gltfLoader.parse(bytes.buffer,'',resolve,reject));
  }
  async function load(){
    ui.retry.hidden=true;ui.loading.classList.remove('hidden');ui.status.textContent='Preparing the water…';loadedBytes=0;totalBytes=0;aborted=false;
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),100000);
    try{
      if(!renderer)init3D();
      const environment=await fetchAsset('the reef','mermaid-reef',controller.signal);
      reef=environment.scene;scene.add(reef);
      // The original stage contains a very large flat backdrop; keep its art,
      // while the camera frames the detailed central aquarium and performer.
      reef.traverse(object=>{
        if(!object.isMesh)return;
        const name=object.name.toLowerCase();
        if(name.includes('fish')||name.includes('jelly'))object.userData.swim={y:object.position.y,x:object.position.x,phase:Math.random()*6.28};
        if(name.includes('glass_pane'))object.visible=false;
        if(/^cube|^cylinder/.test(name)||name.includes('sidewall')||name.includes('column'))object.visible=false;
        const materials=Array.isArray(object.material)?object.material:[object.material];
        for(const material of materials){if(!material||material.userData.reefGraded)continue;material.userData.reefGraded=true;if(material.color)material.color.multiply(new THREE.Color(0x4b788d));if(material.emissive)material.emissive.multiplyScalar(.24);if(material.emissiveIntensity)material.emissiveIntensity*=.43;material.needsUpdate=true;}
      });
      const character=await fetchAsset('the mermaid','mermaid-dancer',controller.signal);
      dancer=character.scene;dancer.scale.setScalar(5.1);dancer.position.set(0,7.3,1.1);scene.add(dancer);
      gradeMermaid(dancer);
      mixer=new THREE.AnimationMixer(dancer);
      for(const clip of character.animations){const action=mixer.clipAction(clip);action.setLoop(THREE.LoopRepeat,Infinity);action.play();}
      mixer.setTime(30);
      addInitialPearls();ui.bar.style.width='100%';ui.status.textContent='The reef is ready';
      setTimeout(()=>{ui.loading.classList.add('hidden');},420);
      window.__mermaidReady=true;
    }catch(error){
      if(aborted)return;
      console.error('Lumen Reef loading failed:',error);
      ui.status.textContent=error.name==='AbortError'?'The connection took too long. Try again.':'The reef could not load. Tap retry.';
      ui.retry.hidden=false;ui.bar.style.width='0%';
    }finally{clearTimeout(timeout);}
  }
  function gradeMermaid(root){
    const paint=[
      [/^(颜|肌|体|足)$/,0xeec8b7,0x402d39],[/颜2|照れ|口舌/,0xcf8199,0x472d43],
      [/睫眉|^目$/,0x183e50,0x092a3d],[/瞳/,0x57bac4,0x1b677c],[/白目|目光|齿/,0xe6fff6,0x447b7a],
      [/前髮|^髮/,0x265668,0x16445c],[/饰|珠|宝石|结晶|星目/,0x9cecd7,0x317b8c],
      [/袖/,0xa7d9da,0x476b80],[/^裙$/,0x366d89,0x23566d],[/裙2|裙饰/,0x7baebd,0x3b7185],
      [/鞋/,0x184455,0x153a51],[/麦克风/,0x5d8fa1,0x345d73]
    ];
    root.traverse(object=>{if(!object.isMesh)return;const materials=Array.isArray(object.material)?object.material:[object.material];for(const material of materials){if(!material||material.userData.mermaidGraded)continue;material.userData.mermaidGraded=true;const match=paint.find(([pattern])=>pattern.test(material.name||''));const [base,glow]=match?[match[1],match[2]]:[0x82c5c8,0x266879];if(material.color)material.color.setHex(base);if(material.emissive)material.emissive.setHex(glow);if(material.emissiveIntensity!=null)material.emissiveIntensity=.18;if(material.roughness!=null)material.roughness=.65;material.needsUpdate=true;}});
  }
  function addInitialPearls(){for(let i=0;i<4;i++)spawnPearl(i);}
  function spawnPearl(slot){
    if(!scene)return;
    const index=(slot%2+level-1)%colors.length, rare=(caught>3&&(caught+slot)%9===0), c=rare?0xffdf89:colors[index];
    const mat=new THREE.MeshPhongMaterial({color:c,emissive:c,emissiveIntensity:rare?.95:.7,shininess:110,transparent:true,opacity:.98});
    const group=new THREE.Group(),core=new THREE.Mesh(pearlGeometry,mat);group.add(core);
    const ring=new THREE.Mesh(ringGeometry,new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.75,depthWrite:false}));ring.rotation.x=.6;group.add(ring);
    const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTexture,color:c,transparent:true,opacity:.5,depthWrite:false,blending:THREE.AdditiveBlending}));glow.scale.set(2.9,2.9,1);group.add(glow);
    const anchors=[[-4.1,9.8,4.5],[4.1,10.8,3.9],[-3.35,5.7,5.5],[3.7,6.3,5.4]];
    const anchor=anchors[slot];group.position.set(anchor[0]+(Math.random()-.5)*.65,anchor[1]+(Math.random()-.5)*.7,anchor[2]);
    group.userData={slot,baseY:group.position.y,phase:Math.random()*6.28,rare,colorIndex:index,color:rare?'#ffe6aa':colorCSS[index],ring,core,glow};
    const marker=document.createElement('span');marker.className='pearl-marker';marker.style.setProperty('--pearl',group.userData.color);marker.innerHTML='<i>✧</i>';ui.floats.appendChild(marker);group.userData.marker=marker;
    scene.add(group);pearls.push(group);updateMatchHints();
  }
  function updateMatchHints(){for(const pearl of pearls)pearl.userData.marker.classList.toggle('match',lastColor!=null&&!pearl.userData.rare&&pearl.userData.colorIndex===lastColor&&pearl.userData.slot!==lastSlot);}
  function tick(){
    if(!running)return;requestAnimationFrame(tick);
    const delta=Math.min(clock.getDelta(),.05),t=clock.elapsedTime;
    if(mixer)mixer.update(delta);
    if(dancer){dancer.position.y=7.3+Math.sin(t*1.18)*.17;dancer.rotation.y=Math.sin(t*.34)*.065;}
    if(reef)reef.traverse(object=>{const s=object.userData.swim;if(s){object.position.y=s.y+Math.sin(t*.65+s.phase)*.13;object.position.x=s.x+Math.sin(t*.35+s.phase)*.18;}});
    for(const pearl of pearls){const p=pearl.userData;pearl.position.y=p.baseY+Math.sin(t*1.4+p.phase)*.3;pearl.rotation.y=t*.35+p.phase;p.ring.rotation.z=t*.53;p.core.scale.setScalar(1+Math.sin(t*3+p.phase)*.05);p.glow.material.opacity=.5+Math.sin(t*3+p.phase)*.12;const projected=pearl.position.clone().project(camera);p.marker.style.left=((projected.x+1)*innerWidth/2)+'px';p.marker.style.top=((1-projected.y)*innerHeight/2)+'px';p.marker.style.display=projected.z<0||projected.z>1?'none':'grid';}
    if(motes){motes.rotation.y=t*.002;}
    yaw+=(targetYaw-yaw)*Math.min(1,delta*3.7);camera.position.set(Math.sin(yaw)*27,8.5,Math.cos(yaw)*27);camera.lookAt(0,7.3,0);
    renderer.render(scene,camera);
  }
  function effect(x,y,text,color){
    const ring=document.createElement('i');ring.className='ring';ring.style.left=x+'px';ring.style.top=y+'px';ui.floats.appendChild(ring);setTimeout(()=>ring.remove(),680);
    for(let i=0;i<(mobile?16:23);i++){const spark=document.createElement('i');spark.className='spark';spark.style.left=x+'px';spark.style.top=y+'px';spark.style.setProperty('--color',color);const angle=i*2.399+Math.random()*.25,distance=36+Math.random()*74;spark.style.setProperty('--dx',Math.cos(angle)*distance+'px');spark.style.setProperty('--dy',Math.sin(angle)*distance+'px');ui.floats.appendChild(spark);setTimeout(()=>spark.remove(),850);}
    const label=document.createElement('span');label.className='float';label.textContent=text;label.style.left=(x-20)+'px';label.style.top=(y-33)+'px';label.style.color=color;ui.floats.appendChild(label);setTimeout(()=>label.remove(),920);
    document.body.classList.remove('impact');void document.body.offsetWidth;document.body.classList.add('impact');setTimeout(()=>document.body.classList.remove('impact'),250);
  }
  function showToast(message){clearTimeout(toastTimer);ui.toast.textContent=message;ui.toast.classList.add('show');toastTimer=setTimeout(()=>ui.toast.classList.remove('show'),1500);}
  function chime(rare=false){if(!soundOn)return;try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();const now=audioCtx.currentTime;const notes=rare?[523,784,1046]:[380+Math.min(streak,9)*37,570+Math.min(streak,9)*41];notes.forEach((frequency,index)=>{const oscillator=audioCtx.createOscillator(),gain=audioCtx.createGain();oscillator.type='sine';oscillator.frequency.setValueAtTime(frequency,now+index*.055);oscillator.frequency.exponentialRampToValueAtTime(frequency*.72,now+index*.055+.3);gain.gain.setValueAtTime(.0001,now+index*.055);gain.gain.exponentialRampToValueAtTime(.12/(index+1),now+index*.055+.015);gain.gain.exponentialRampToValueAtTime(.0001,now+index*.055+.38);oscillator.connect(gain).connect(audioCtx.destination);oscillator.start(now+index*.055);oscillator.stop(now+index*.055+.39);});}catch{}}
  function collect(pearl,x,y){
    if(!started)return;
    const p=pearl.userData;scene.remove(pearl);pearls=pearls.filter(item=>item!==pearl);
    p.marker.remove();
    p.core.material.dispose();p.ring.material.dispose();p.glow.material.dispose();
    const now=performance.now();streak=now-lastCatch<4200?streak+1:1;lastCatch=now;
    const matched=!p.rare&&lastColor===p.colorIndex&&lastSlot!==p.slot;
    const points=(100+Math.min(streak-1,8)*25)*(p.rare?3:matched?2:1);score+=points;caught++;
    if(matched||p.rare){lastColor=null;lastSlot=-1;}else{lastColor=p.colorIndex;lastSlot=p.slot;}
    updateMatchHints();
    ui.score.textContent=String(score).padStart(4,'0');
    const goal=8+Math.min(level-1,6)*2;
    ui.progress.style.width=(caught%goal)/goal*100+'%';
    effect(x,y,'+'+points,p.color);chime(p.rare||matched);if(navigator.vibrate)navigator.vibrate(p.rare||matched?[20,35,25]:13);
    if(p.rare)showToast('RARE PEARL ✦');else if(matched)showToast('PERFECT PAIR ✦');else if(streak===4||streak===8)showToast(streak+' IN A ROW ✦');
    if(caught>=goal){caught=0;level++;lastColor=null;lastSlot=-1;updateMatchHints();ui.level.textContent=String(level).padStart(2,'0');ui.progress.style.width='0%';setPalette((level-1)%palettes.length);setTimeout(()=>showToast('NEW TIDE · '+String(level).padStart(2,'0')),260);ui.hint.textContent='THE REEF IS GLOWING';setTimeout(()=>ui.hint.textContent='MATCH TWO LIGHTS',2500);}
    setTimeout(()=>spawnPearl(p.slot),380);
  }
  function setPalette(i){const p=palettes[i];scene.background.setHex(p.bg);scene.fog.color.setHex(p.fog);document.documentElement.style.setProperty('--aqua',p.accent);const lights=scene.children.filter(o=>o.isDirectionalLight||o.isPointLight);lights.forEach((light,j)=>{if(j===0)light.color.setHex(p.light);});}
  function pickPearl(x,y){let found=null,dist=Infinity;for(const pearl of pearls){const vector=pearl.position.clone().project(camera);if(vector.z<0||vector.z>1)continue;const px=(vector.x+1)*innerWidth/2,py=(1-vector.y)*innerHeight/2,d=Math.hypot(px-x,py-y);if(d<dist){found=pearl;dist=d;}}if(found&&dist<(mobile?57:47))collect(found,x,y);else if(started){effect(x,y,'', '#9cf5e8');}}
  ui.world.addEventListener('pointerdown',e=>{pointerStart={x:e.clientX,y:e.clientY,yaw:targetYaw,dragged:false};ui.world.setPointerCapture(e.pointerId);});
  ui.world.addEventListener('pointermove',e=>{if(!pointerStart)return;const dx=e.clientX-pointerStart.x;if(Math.abs(dx)>10)pointerStart.dragged=true;if(pointerStart.dragged)targetYaw=Math.max(-.44,Math.min(.44,pointerStart.yaw-dx/innerWidth*.9));});
  ui.world.addEventListener('pointerup',e=>{if(!pointerStart)return;const wasDrag=pointerStart.dragged;pointerStart=null;if(!wasDrag)pickPearl(e.clientX,e.clientY);});
  ui.play.addEventListener('click',()=>{started=true;ui.intro.classList.add('hidden');try{audioCtx=new(window.AudioContext||window.webkitAudioContext)();audioCtx.resume();}catch{}showToast('FOLLOW THE LIGHT ✦');});
  ui.sound.addEventListener('click',()=>{soundOn=!soundOn;ui.sound.style.opacity=soundOn?'1':'.35';ui.sound.setAttribute('aria-label',soundOn?'Mute sound':'Unmute sound');if(soundOn)chime();});
  ui.view.addEventListener('click',()=>{viewIndex=(viewIndex+1)%3;targetYaw=[0,-.29,.29][viewIndex];});
  ui.retry.addEventListener('click',()=>location.reload());
  addEventListener('resize',onResize);
  try{load();}catch(error){ui.status.textContent='This device cannot display the reef.';ui.retry.hidden=false;console.error(error);}
})();

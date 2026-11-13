(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const ui = {world:$('world'),loading:$('loading'),status:$('load-status'),bar:$('load-bar'),retry:$('retry'),reset:$('reset'),motion:$('motion')};
  const loader = new THREE.GLTFLoader();
  let scene, camera, renderer, clock, mixer, dancer;
  let animationTime=30, animationDirection=1, animationPaused=false;
  let yaw=0, targetYaw=0, distance=27, targetDistance=27;
  const pointers=new Map();
  let gesture=null;

  function init3D(){
    scene=new THREE.Scene();
    scene.background=new THREE.Color(0x061923);
    scene.fog=new THREE.FogExp2(0x102f3b,.009);
    camera=new THREE.PerspectiveCamera(innerWidth<650?51:45,innerWidth/innerHeight,.1,260);
    renderer=new THREE.WebGLRenderer({antialias:innerWidth>=700,powerPreference:'high-performance'});
    renderer.outputEncoding=THREE.sRGBEncoding;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=.82;
    renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.15:1.5));
    renderer.setSize(innerWidth,innerHeight);
    ui.world.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight(0xbedcf1,0x244253,1.3));
    const key=new THREE.DirectionalLight(0xe3fff5,1.45);key.position.set(-7,16,13);scene.add(key);
    const fill=new THREE.DirectionalLight(0x91c7ef,.7);fill.position.set(8,9,-5);scene.add(fill);
    clock=new THREE.Clock();
    onResize();
    requestAnimationFrame(tick);
  }

  function onResize(){
    if(!renderer)return;
    camera.aspect=innerWidth/innerHeight;
    camera.fov=innerWidth<650?51:45;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<700?1.15:1.5));
    renderer.setSize(innerWidth,innerHeight);
  }

  async function fetchModel(stem,label,from,to,signal){
    const response=await fetch(stem+'-manifest.json',{signal});
    if(!response.ok)throw new Error('Missing '+label+' manifest');
    const manifest=await response.json();
    const parts=[];
    let received=0;
    ui.status.textContent='Loading '+label+'…';
    for(let i=0;i<manifest.parts.length;i+=2){
      const batch=manifest.parts.slice(i,i+2);
      const chunk=await Promise.all(batch.map(async file=>{
        const result=await fetch(file,{signal});
        if(!result.ok)throw new Error('Missing '+file);
        return new Uint8Array(await result.arrayBuffer());
      }));
      for(const bytes of chunk){parts.push(bytes);received+=bytes.length;}
      ui.bar.style.width=(from+(to-from)*received/manifest.bytes)+'%';
    }
    if(received!==manifest.bytes)throw new Error('Incomplete '+label+' model');
    const joined=new Uint8Array(manifest.bytes);
    let offset=0;
    for(const bytes of parts){joined.set(bytes,offset);offset+=bytes.length;}
    ui.status.textContent='Preparing '+label+'…';
    await new Promise(resolve=>requestAnimationFrame(resolve));
    return new Promise((resolve,reject)=>loader.parse(joined.buffer,'',resolve,reject));
  }

  function styleStage(root){
    root.traverse(object=>{
      if(!object.isMesh)return;
      const name=object.name.toLowerCase();
      // Exported helper panels obscure the supplied stage in a browser renderer.
      if(name.includes('glass_pane')||/^cube|^cylinder/.test(name)||name.includes('sidewall')||name.includes('column'))object.visible=false;
      const materials=Array.isArray(object.material)?object.material:[object.material];
      for(const material of materials){
        if(!material||material.userData.stageAdjusted)continue;
        material.userData.stageAdjusted=true;
        if(material.color)material.color.multiply(new THREE.Color(0x6c9bb2));
        if(material.emissiveIntensity)material.emissiveIntensity*=.55;
        material.needsUpdate=true;
      }
    });
  }

  function styleCharacter(root){
    // The supplied GLB has no embedded color textures or base colors for its main mesh.
    // Keep its geometry, skin and animation while assigning restrained colors by source material name.
    const paint=[
      [/^(颜|肌|体|足)$/,0xf3cfbe],[/颜2|照れ|口舌/,0xdb8da2],
      [/睫眉|^目$/,0x183e50],[/瞳/,0x5dc3c8],[/白目|目光|齿/,0xeafff9],
      [/前髮|^髮/,0x397788],[/饰|珠|宝石|结晶|星目/,0xa4ebdc],
      [/袖/,0xb4dfe0],[/^裙$/,0x4f90a4],[/裙2|裙饰/,0x8cc3cb],
      [/鞋/,0x245368],[/麦克风/,0x688f9f]
    ];
    root.traverse(object=>{
      if(!object.isMesh)return;
      const materials=Array.isArray(object.material)?object.material:[object.material];
      for(const material of materials){
        if(!material||material.userData.colored)continue;
        material.userData.colored=true;
        const entry=paint.find(([pattern])=>pattern.test(material.name||''));
        if(material.color)material.color.setHex(entry?entry[1]:0xb8d8db);
        if(material.emissive)material.emissive.setHex(0x09242c);
        if(material.emissiveIntensity!=null)material.emissiveIntensity=.06;
        if(material.roughness!=null)material.roughness=.72;
        material.needsUpdate=true;
      }
    });
  }

  async function load(){
    ui.retry.hidden=true;
    ui.loading.classList.remove('hidden');
    ui.bar.style.width='0%';
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),100000);
    try{
      if(!renderer)init3D();
      const stage=await fetchModel('mermaid-reef','stage',0,50,controller.signal);
      styleStage(stage.scene);
      scene.add(stage.scene);
      const character=await fetchModel('mermaid-dancer','character',50,100,controller.signal);
      dancer=character.scene;
      dancer.scale.setScalar(5.1);
      // Align the dancer's shoes with the small center dais in the stage model.
      dancer.position.set(0,3.1,1.1);
      styleCharacter(dancer);
      scene.add(dancer);
      mixer=new THREE.AnimationMixer(dancer);
      if(character.animations.length){
        const action=mixer.clipAction(character.animations[0]);
        action.play();
        mixer.setTime(animationTime);
      }
      ui.bar.style.width='100%';
      ui.status.textContent='Ready';
      window.__mermaidReady=true;
      setTimeout(()=>ui.loading.classList.add('hidden'),250);
    }catch(error){
      console.error('Mermaid Stage could not load',error);
      ui.status.textContent=error.name==='AbortError'?'Loading timed out. Tap retry.':'The models could not load. Tap retry.';
      ui.retry.hidden=false;
    }finally{clearTimeout(timeout);}
  }

  function tick(){
    requestAnimationFrame(tick);
    const delta=Math.min(clock.getDelta(),.05);
    if(mixer&&!animationPaused){
      animationTime+=delta*.85*animationDirection;
      if(animationTime>=48){animationTime=48;animationDirection=-1;}
      if(animationTime<=22){animationTime=22;animationDirection=1;}
      mixer.setTime(animationTime);
    }
    yaw+=(targetYaw-yaw)*Math.min(1,delta*5);
    distance+=(targetDistance-distance)*Math.min(1,delta*5);
    camera.position.set(Math.sin(yaw)*distance,8.1,Math.cos(yaw)*distance);
    camera.lookAt(0,7.1,0);
    renderer.render(scene,camera);
  }

  ui.world.addEventListener('pointerdown',event=>{
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
    ui.world.setPointerCapture(event.pointerId);
    if(pointers.size===1)gesture={x:event.clientX,yaw:targetYaw};
    if(pointers.size===2){
      const [a,b]=[...pointers.values()];
      gesture={pinch:Math.hypot(a.x-b.x,a.y-b.y),distance:targetDistance};
    }
  });
  ui.world.addEventListener('pointermove',event=>{
    if(!pointers.has(event.pointerId))return;
    pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});
    if(pointers.size===1&&gesture&&!gesture.pinch){
      targetYaw=Math.max(-.7,Math.min(.7,gesture.yaw-(event.clientX-gesture.x)/innerWidth*1.2));
    }else if(pointers.size===2&&gesture?.pinch){
      const [a,b]=[...pointers.values()];
      const length=Math.hypot(a.x-b.x,a.y-b.y);
      targetDistance=Math.max(21,Math.min(34,gesture.distance*gesture.pinch/Math.max(1,length)));
    }
  });
  function release(event){
    pointers.delete(event.pointerId);
    const remaining=[...pointers.values()][0];
    gesture=remaining?{x:remaining.x,yaw:targetYaw}:null;
  }
  ui.world.addEventListener('pointerup',release);
  ui.world.addEventListener('pointercancel',release);
  ui.reset.addEventListener('click',()=>{targetYaw=0;targetDistance=27;});
  ui.motion.addEventListener('click',()=>{
    animationPaused=!animationPaused;
    ui.motion.textContent=animationPaused?'PLAY':'PAUSE';
    ui.motion.setAttribute('aria-label',animationPaused?'Play animation':'Pause animation');
  });
  ui.retry.addEventListener('click',()=>location.reload());
  addEventListener('resize',onResize);
  load();
})();

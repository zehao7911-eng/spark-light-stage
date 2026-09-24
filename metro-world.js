(()=>{'use strict';
const $=id=>document.getElementById(id),mobile=matchMedia('(max-width:700px)').matches;
const cfg={rx:19,rz:13,trackY:.64},stations=[
 {name:'SUNSET PLAZA',t:0,color:0xff9e73,code:'S'},
 {name:'LANTERN PARK',t:Math.PI/2,color:0xf0bd61,code:'L'},
 {name:'HARBOR POINT',t:Math.PI,color:0x69c8da,code:'H'},
 {name:'BLOSSOM ROW',t:Math.PI*1.5,color:0xf39bb7,code:'B'}
];
let scene,camera,renderer,train,trainLights=[],wheel,clouds=[],people=[],sparkles=[],targets=[],buildings=[],traffic=[];
let trainT=-1.02,speed=.03,braking=false,targetIndex=0,passengers=0,streak=0,stopCount=0,level=1,cameraMode=0,timeMode=0,soundOn=false,audioCtx=null,ready=false,lastTime=0,toastTimer,shake=0,cameraInitialized=false;
let orbit={a:.71,e:.53,d:58,drag:false,x:0,y:0},pointerCount=0,pinch=0;
const host=$('view'),colors={grass:0x6eaf81,ground:0x83be94,rail:0x33434f,sleeper:0x765353,road:0x9cb0b9};
const mat=(c,o={})=>new THREE.MeshStandardMaterial({color:c,roughness:.78,metalness:0,...o});
const m={grass:mat(colors.grass),ground:mat(colors.ground),soil:mat(0x9b6b58),road:mat(colors.road),rail:mat(colors.rail,{metalness:.63,roughness:.37}),sleeper:mat(colors.sleeper),white:mat(0xfff8df),dark:mat(0x2b5266),leaf:mat(0x65b97b),flower:mat(0xffae8b),trunk:mat(0x93745a),water:mat(0x75bccc,{metalness:.1,roughness:.32}),glow:mat(0xffeab0,{emissive:0xffd179,emissiveIntensity:.7})};
let randSeed=43;function rnd(){randSeed=(randSeed*1664525+1013904223)>>>0;return randSeed/4294967296}
function box(w,h,d,color,x,y,z,parent=scene){let mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),typeof color==='number'?mat(color):color);mesh.position.set(x,y,z);mesh.castShadow=!mobile;mesh.receiveShadow=true;parent.add(mesh);return mesh}
function ball(r,color,x,y,z,parent=scene,segments=9){let mesh=new THREE.Mesh(new THREE.IcosahedronGeometry(r,segments>8?1:0),typeof color==='number'?mat(color):color);mesh.position.set(x,y,z);mesh.castShadow=!mobile;parent.add(mesh);return mesh}
function cyl(rt,rb,h,color,x,y,z,parent=scene,n=9){let mesh=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),typeof color==='number'?mat(color):color);mesh.position.set(x,y,z);mesh.castShadow=!mobile;mesh.receiveShadow=true;parent.add(mesh);return mesh}
function path(t,offset=0){let x=(cfg.rx+offset)*Math.cos(t),z=(cfg.rz+offset)*Math.sin(t);return new THREE.Vector3(x,cfg.trackY,z)}
function tangent(t){return new THREE.Vector3(-cfg.rx*Math.sin(t),0,cfg.rz*Math.cos(t)).normalize()}
function along(t){let p=path(t),v=tangent(t);return {p,v,angle:Math.atan2(v.x,v.z)}}
function makeText(s,fg='#244758',bg='transparent',size=52){let c=document.createElement('canvas');c.width=512;c.height=128;let x=c.getContext('2d');if(bg!=='transparent'){x.fillStyle=bg;x.fillRect(0,0,c.width,c.height)}x.font=`900 ${size}px Outfit, Arial`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=fg;x.fillText(s,256,66);let tx=new THREE.CanvasTexture(c);tx.encoding=THREE.sRGBEncoding;return tx}
function sign(text,w,h,x,y,z,turn=0,bg=0xffffff,fg='#30546a'){let g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=turn;scene.add(g);box(w,h,.09,bg,0,0,0,g);let face=new THREE.Mesh(new THREE.PlaneGeometry(w*.94,h*.85),new THREE.MeshBasicMaterial({map:makeText(text,fg,'transparent',text.length>12?40:54),transparent:true,side:THREE.DoubleSide}));face.position.z=.056;g.add(face);return g}
function init(){
 scene=new THREE.Scene();scene.background=new THREE.Color(0xbfe8f3);scene.fog=new THREE.Fog(0xbfe8f3,72,130);
 camera=new THREE.PerspectiveCamera(43,innerWidth/innerHeight,.1,220);
 renderer=new THREE.WebGLRenderer({antialias:!mobile,alpha:false,powerPreference:mobile?'low-power':'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.65));renderer.setSize(innerWidth,innerHeight);renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.87;
 renderer.shadowMap.enabled=!mobile;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 host.appendChild(renderer.domElement);
 scene.add(new THREE.HemisphereLight(0xe7faff,0x6c7b78,.68));let sun=new THREE.DirectionalLight(0xfff0cf,.95);sun.position.set(-15,35,22);sun.castShadow=!mobile;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-45;sun.shadow.camera.right=45;sun.shadow.camera.top=40;sun.shadow.camera.bottom=-40;sun.shadow.normalBias=.02;scene.add(sun);scene.userData.sun=sun;
 buildWorld();setupEvents();loadTrain();requestAnimationFrame(frame);
}
function buildWorld(){
 // The diorama is a physical plinth, with a softly layered island and clean water edge.
 box(77,1.9,61,m.soil,0,-1.55,0);box(76,.25,60,m.ground,0,-.46,0);
 let edge=new THREE.Mesh(new THREE.PlaneGeometry(300,300),mat(0x9ecbd1));edge.rotation.x=-Math.PI/2;edge.position.y=-2.55;scene.add(edge);
 let park=new THREE.Mesh(new THREE.CylinderGeometry(11.6,12.8,.2,48),m.grass);park.scale.z=.75;park.position.y=-.17;park.receiveShadow=true;scene.add(park);
 for(let i=0;i<2;i++){let points=[];for(let j=0;j<=160;j++){let t=j/160*Math.PI*2;points.push(path(t,i===0?-.54:.54))}let rail=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points,true),400,.055,5,true),m.rail);rail.castShadow=false;scene.add(rail)}
 if(THREE.InstancedMesh){let ties=new THREE.InstancedMesh(new THREE.BoxGeometry(.9,.13,.18),m.sleeper,130),dummy=new THREE.Object3D();for(let j=0;j<130;j++){let t=j/130*Math.PI*2,p=path(t),v=tangent(t);dummy.position.set(p.x,.47,p.z);dummy.rotation.set(0,Math.atan2(v.x,v.z),0);dummy.updateMatrix();ties.setMatrixAt(j,dummy.matrix)}ties.instanceMatrix.needsUpdate=true;scene.add(ties)}else for(let j=0;j<130;j++){let t=j/130*Math.PI*2,p=path(t),v=tangent(t);let tie=box(.9,.13,.18,m.sleeper,p.x,.47,p.z);tie.rotation.y=Math.atan2(v.x,v.z)}
 // A scenic ribbon beyond the loop makes motion legible from the wide camera.
 for(let j=0;j<105;j++){let t=j/105*Math.PI*2,p=path(t,2.6);if(j%4===0)ball(.15,0xfff7d2,p.x,.2,p.z)}
 stations.forEach((s,i)=>buildStation(s,i));
 buildTown();buildFerrisWheel();buildPond();buildClouds();buildPeople();
 let pole=cyl(.03,.04,8,m.white,-32,3.4,-21);ball(.8,0xffeac1,-32,7.8,-21);pole.visible=true;
}
function buildStation(s,i){let p=path(s.t,3.3),v=tangent(s.t),g=new THREE.Group();g.position.set(p.x,.16,p.z);g.rotation.y=Math.atan2(-v.z,v.x);scene.add(g);s.group=g;
 box(7.5,.35,2.15,0xe9d8bb,0,0,0,g);box(7.2,.07,1.9,typeof s.color==='number'?s.color:0xffffff,0,.21,0,g);
 for(let x of [-3.1,3.1]){box(.12,2.6,.12,m.white,x,1.55,.7,g);ball(.22,m.glow,x,2.9,.7,g)}
 box(7,.18,1.6,m.white,0,2.83,.7,g);box(7.2,.25,.2,s.color,0,2.72,-.12,g);
 for(let x of [-2.2,0,2.2]){box(.1,.6,.1,m.dark,x,.61,-.5,g);box(.76,.09,.32,m.white,x,.91,-.5,g)}
 let pulse=new THREE.Mesh(new THREE.RingGeometry(1.05,1.2,36),new THREE.MeshBasicMaterial({color:s.color,transparent:true,opacity:.65,side:THREE.DoubleSide,depthWrite:false}));pulse.rotation.x=-Math.PI/2;pulse.position.y=.44;g.add(pulse);s.pulse=pulse;
 let light=new THREE.PointLight(s.color,mobile?.3:.8,8);light.position.set(0,2,.2);g.add(light);s.light=light;
 let text=sign(s.name,5.6,.62,p.x,3.24,p.z,Math.atan2(-v.z,v.x),0xffffff,'#244c5a');text.position.add(new THREE.Vector3(v.z*.6,0,-v.x*.6));
 let pointer=new THREE.Group();pointer.position.set(p.x,4.5,p.z);scene.add(pointer);s.pointer=pointer;
 let diamond=new THREE.Mesh(new THREE.OctahedronGeometry(.58),new THREE.MeshStandardMaterial({color:s.color,emissive:s.color,emissiveIntensity:.5,roughness:.25}));pointer.add(diamond);
 let ring=new THREE.Mesh(new THREE.TorusGeometry(.84,.07,6,32),new THREE.MeshBasicMaterial({color:s.color}));pointer.add(ring);
 let beam=box(.1,1.5,.1,new THREE.MeshBasicMaterial({color:s.color,transparent:true,opacity:.35,depthWrite:false}),0,-1.2,0,pointer);beam.castShadow=false;
}
function tree(x,z,scale=1,tint=0x65b97b){cyl(.12*scale,.17*scale,1.05*scale,m.trunk,x,.4*scale,z);let top=ball(.9*scale,tint,x,1.25*scale,z);top.scale.set(.94,1.1,.94);if(rnd()>.55)for(let j=0;j<3;j++)ball(.1*scale,0xffd5ca,x+(rnd()-.5)*1.1*scale,1.1*scale+rnd()*.7*scale,z+(rnd()-.5)*.8*scale)}
function building(x,z,w,h,d,color,roof){let g=new THREE.Group();g.position.set(x,0,z);scene.add(g);buildings.push(g);box(w,h,d,color,0,h/2,0,g);box(w+.4,.24,d+.4,roof,0,h+.1,0,g);
 let winmat=mat(0xffe6ae,{emissive:0xffc565,emissiveIntensity:.18});for(let yy=1;yy<h-.4;yy+=mobile?1.5:.9)for(let xx=-w/2+.48;xx<w/2-.25;xx+=mobile?1.18:.72){box(.3,.39,.035,winmat,xx,yy,d/2+.025,g);if(!mobile)box(.3,.39,.035,winmat,xx,yy,-d/2-.025,g)}
 box(.65,1,.055,m.dark,0,.5,d/2+.05,g);return g}
function buildTown(){
 let lanes=[[-28,-18],[-28,-11],[-27,11],[-26,19],[26,-19],[27,-12],[27,12],[27,19],[-14,-19],[-5,-19],[5,-19],[14,-19],[-15,19],[-5,19],[6,19],[15,19]];
 let palette=[0xdd8f8b,0xebae72,0x7fc6a8,0x80a9ca,0xbe95ca,0xe0c482],roof=[0xa65567,0x817aaa,0x448f9d,0xba6b52];
 for(let i=0;i<lanes.length;i++){let [x,z]=lanes[i],w=2.7+rnd()*1.9,h=2.2+rnd()*3.5,d=2.7+rnd()*1.3;let b=building(x,z,w,h,d,palette[i%palette.length],roof[i%roof.length]);b.userData.baseY=0}
 // Central boulevard, market stalls and a tiny riverside garden.
 box(20,.06,2.8,m.road,0,-.22,0);box(2.4,.12,14,m.road,0,-.17,0);
 for(let i=0;i<4;i++){let x=-8+i*5.4;let st=building(x,i%2?4.6:-4.5,2.35,1.6,2.1,palette[(i+2)%palette.length],roof[(i+1)%roof.length]);st.scale.set(1,1,1)}
 for(let i=0;i<11;i++){let stripe=box(.58,.015,.045,m.white,-9+i*1.8,-.175,0);stripe.castShadow=false}
 let tower=new THREE.Group();tower.position.set(2.8,0,-7.1);scene.add(tower);box(2.2,4.8,2.1,0xf5d69e,0,2.4,0,tower);box(2.75,.25,2.65,0x6198a1,0,4.9,0,tower);box(1.4,1.25,1.4,0x8cc8cb,0,5.55,0,tower);let roofTop=new THREE.Mesh(new THREE.ConeGeometry(1.25,1.3,4),mat(0xd78075));roofTop.position.y=6.78;roofTop.rotation.y=Math.PI/4;tower.add(roofTop);for(let side of [-1,1]){let face=new THREE.Mesh(new THREE.CircleGeometry(.53,24),m.white);face.position.set(0,5.58,side*.73);tower.add(face);let hand=box(.04,.38,.015,m.dark,0,5.63,side*.76,tower);hand.rotation.z=-.35}ball(.14,m.glow,0,7.52,0,tower);
 for(let i=0;i<2;i++){let x=-5+i*10,z=i?1.2:-1.2;let g=new THREE.Group();g.position.set(x,.06,z);scene.add(g);traffic.push({g,x,z,phase:i*.5});box(1.05,.48,.65,i?0xff8d78:0x68b9c0,0,.35,0,g);box(.58,.25,.55,0xf6f4d5,-.05,.69,0,g);for(let xx of [-.32,.35])for(let zz of [-.32,.32]){let wh=cyl(.13,.13,.07,m.dark,xx,.17,zz,g,8);wh.rotation.x=Math.PI/2}}
 for(let i=0;i<4;i++){let x=-5.8+i*3.6,z=8.5;box(2.2,.12,1.15,i%2?0xffb483:0x9ad4b5,x,.62,z);box(.06,.7,.06,m.white,x-1,.3,z-.48);box(.06,.7,.06,m.white,x+1,.3,z+.48);ball(.25,m.glow,x,.95,z)}
 cyl(1,1.1,.55,0xf6e3bc,-2,.18,7.7,scene,18);cyl(.8,.8,.1,m.water,-2,.51,7.7,scene,18);let fountain=new THREE.Mesh(new THREE.TorusGeometry(.36,.05,6,16),m.white);fountain.rotation.x=Math.PI/2;fountain.position.set(-2,.9,7.7);scene.add(fountain);
 for(let i=0;i<28;i++){let x=(rnd()-.5)*71,z=(rnd()-.5)*51;if(Math.abs(x)<5&&Math.abs(z)<9)continue;if(Math.abs((x/cfg.rx)**2+(z/cfg.rz)**2-1)<.28)continue;if(lanes.some(p=>Math.hypot(x-p[0],z-p[1])<4))continue;tree(x,z,.55+rnd()*.7,[0x5fad73,0x78c583,0x82bb8d,0xe9aa8f][i%4])}
 for(let i=0;i<55;i++){let x=(rnd()-.5)*71,z=(rnd()-.5)*52;ball(.04+rnd()*.08,[0xfff1aa,0xf3a0aa,0xffffff][i%3],x,.05,z,scene,3)}
 // Colorful bunting suspended over the main street.
 for(let i=0;i<15;i++){let x=-10+i*1.42;let tri=new THREE.Mesh(new THREE.ConeGeometry(.18,.4,3),mat([0xf38777,0xffd077,0x73c7b4,0x8baee0][i%4]));tri.rotation.z=Math.PI;tri.position.set(x,4.1,0);scene.add(tri)}
}
function buildFerrisWheel(){let g=new THREE.Group();g.position.set(-9,4.6,-8.2);scene.add(g);wheel=new THREE.Group();g.add(wheel);let tor=new THREE.Mesh(new THREE.TorusGeometry(3.1,.1,8,48),m.white);wheel.add(tor);let tor2=new THREE.Mesh(new THREE.TorusGeometry(2.82,.045,5,48),mat(0xffc575));wheel.add(tor2);
 for(let i=0;i<10;i++){let a=i/10*Math.PI*2;let bar=box(3.12,.055,.05,m.white,Math.cos(a)*1.55,Math.sin(a)*1.55,0,wheel);bar.rotation.z=a;let pod=new THREE.Group();pod.position.set(Math.cos(a)*3.1,Math.sin(a)*3.1,0);wheel.add(pod);ball(.34,[0xff8792,0xffc66d,0x72cbd0,0xa6b5ee][i%4],0,-.22,0,pod);pod.userData.counter=true}
 let axle=cyl(.13,.13,1.2,m.dark,-9,4.6,-8.2);axle.rotation.x=Math.PI/2;
 for(let dx of [-1.1,1.1]){let leg=box(.18,4.4,.18,m.white,-9+dx,1.9,-8.2);leg.rotation.z=dx<0?-.26:.26}
 let base=box(6,.25,2.4,0xf5d8ba,-9,.05,-8.2);base.visible=true;
}
function buildPond(){let pool=cyl(3.1,3.1,.07,m.water,10,-.1,7.3,scene,28);pool.scale.z=.62;for(let i=0;i<8;i++){let a=i/8*Math.PI*2;let reed=ball(.22,0xffffff,10+Math.cos(a)*3.3,.25,7.3+Math.sin(a)*2);reed.scale.set(.45,1.4,.45)}
 let boat=box(1.05,.24,.5,0xfff4de,10.5,.13,7.4);boat.rotation.y=-.25}
function buildClouds(){let matcloud=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.85,depthWrite:false});for(let i=0;i<7;i++){let g=new THREE.Group();g.position.set((rnd()-.5)*88,17+rnd()*8,(rnd()-.5)*75);scene.add(g);for(let j=0;j<4;j++){let c=ball(1.3+rnd()*.8,matcloud,(j-1.6)*1.55,(rnd()-.5)*.4,(rnd()-.5)*.8,g);c.scale.y=.45}clouds.push(g)}}
function buildPeople(){let coat=[0xff8a77,0x7298c7,0xf9c97a,0x8cc4a3,0xc69abc];for(let i=0;i<35;i++){let s=stations[i%4],p=path(s.t,3.1),v=tangent(s.t),u=(rnd()-.5)*5;let g=new THREE.Group();g.position.set(p.x+v.x*u,.43,p.z+v.z*u);scene.add(g);cyl(.11,.13,.48,coat[i%coat.length],0,.37,0,g,6);ball(.16,0xffdbb3,0,.73,0,g);people.push({g,phase:rnd()*6,home:g.position.clone()})}}
function loadTrain(){let timed=setTimeout(()=>{if(!ready){$('loadtext').textContent='The model is taking longer than expected.';$('retry').hidden=false}},20000);$('retry').onclick=()=>location.reload();let loader=new THREE.GLTFLoader();loader.load('metro-subway.glb',g=>{clearTimeout(timed);let model=g.scene,bounds=new THREE.Box3().setFromObject(model),c=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
 train=new THREE.Group();scene.add(train);model.position.sub(c);model.scale.setScalar(5.5/size.x);model.position.multiplyScalar(5.5/size.x);train.add(model);
 model.traverse(o=>{if(o.isMesh){o.castShadow=!mobile;o.receiveShadow=!mobile;if(o.material){let mm=Array.isArray(o.material)?o.material:[o.material];mm.forEach(ma=>{ma.side=THREE.DoubleSide;if(ma.name?.includes('玻璃')){ma.transparent=true;ma.opacity=.42;ma.depthWrite=false}ma.needsUpdate=true})}}});
 // Front is the source model's negative X end.
 for(let x of [-2.47])for(let z of [-.12,.12]){let lamp=ball(.09,m.glow,x,.65,z,train);trainLights.push(lamp)}
 ready=true;$('loadfill').style.width='100%';$('loadtext').textContent='Ready to roll!';setTimeout(()=>$('loading').classList.add('done'),450);showToast('WELCOME ABOARD · STOP AT THE GLOWING PLATFORM');updateTarget();
 },xhr=>{if(xhr.total)$('loadfill').style.width=`${Math.min(95,Math.round(xhr.loaded/xhr.total*100))}%`;$('loadtext').textContent=`Loading the train · ${Math.round(xhr.loaded/1048576)} MB`;},err=>{clearTimeout(timed);console.error(err);$('loadtext').textContent='Train could not load. Check your connection and retry.';$('retry').hidden=false});}
function deltaAngle(a,b){return ((a-b+Math.PI*3)%(Math.PI*2))-Math.PI}
function updateTarget(){let s=stations[targetIndex];$('target').textContent=s.name;$('stationdot').style.background=`#${s.color.toString(16).padStart(6,'0')}`;$('stopno').textContent=String((stopCount+1)%100).padStart(2,'0');$('missionhint').textContent='Brake when the train meets the platform';stations.forEach((q,i)=>{q.pointer.visible=i===targetIndex;q.light.intensity=i===targetIndex?(mobile?1.5:2):.2;q.pulse.material.opacity=i===targetIndex?.8:.18})}
function showToast(msg){let t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2600)}
function burst(p,color,n=30){for(let i=0;i<n;i++){let c=ball(.07+rnd()*.11,color,p.x,p.y+1+rnd(),p.z,scene,3);let a=rnd()*6.28,v=.05+rnd()*.1;sparkles.push({o:c,x:Math.cos(a)*v,y:.09+rnd()*.11,z:Math.sin(a)*v,life:1.3+rnd()*.5})}}
function chime(freq=660){if(!soundOn)return;try{audioCtx??=new(window.AudioContext||window.webkitAudioContext)();let now=audioCtx.currentTime;[1,1.25,1.5].forEach((mul,i)=>{let osc=audioCtx.createOscillator(),gain=audioCtx.createGain();osc.type='sine';osc.frequency.value=freq*mul;gain.gain.setValueAtTime(0,now+i*.095);gain.gain.linearRampToValueAtTime(.045,now+i*.095+.02);gain.gain.exponentialRampToValueAtTime(.001,now+i*.095+.4);osc.connect(gain).connect(audioCtx.destination);osc.start(now+i*.095);osc.stop(now+i*.095+.42)})}catch(e){}}
function reward(){let s=stations[targetIndex],p=path(s.t,3);let gain=8+Math.min(streak,10)*2;passengers+=gain;streak++;stopCount++;level=1+Math.floor(passengers/100);$('passengers').textContent=passengers;$('streak').textContent=streak;$('level').textContent=String(level).padStart(2,'0');showToast(`+${gain} PASSENGERS · PERFECT STOP!`);burst(p,s.color,45);chime(660+Math.min(streak,7)*50);shake=.35;
 let spots=[[-9,7],[8,-8],[-12,3],[10,4],[-4,-8],[6,8],[0,9],[-10,-3]];let spot=spots[(passengers/8|0)%spots.length];tree(spot[0],spot[1],.65+Math.min(streak,6)*.04,[0xf2a79c,0xffd58f,0x7cd1a1][streak%3]);burst(new THREE.Vector3(spot[0],.5,spot[1]),s.color,14);
 targetIndex=(targetIndex+1)%stations.length;updateTarget();if(streak%4===0){showToast(`CITY LEVEL ${level} · ALL LINES OPEN`);timeMode=(timeMode+1)%3;applyTime()}}
function miss(){streak=0;$('streak').textContent='0';showToast('PLATFORM PASSED · NEXT STOP AHEAD');targetIndex=(targetIndex+1)%stations.length;updateTarget()}
function applyTime(){let schemes=[{sky:0xbfe8f3,fog:0xbfe8f3,sun:0xfff0cf,s:.95,e:.87,label:'DAY',icon:'☀'},{sky:0xf8b79e,fog:0xf8b79e,sun:0xffad71,s:.75,e:.88,label:'DUSK',icon:'◑'},{sky:0x243d62,fog:0x334e74,sun:0x9bbbe9,s:.35,e:1.15,label:'NIGHT',icon:'☾'}],q=schemes[timeMode];scene.background.setHex(q.sky);scene.fog.color.setHex(q.fog);scene.userData.sun.color.setHex(q.sun);scene.userData.sun.intensity=q.s;renderer.toneMappingExposure=q.e;$('time').querySelector('i').textContent=q.icon;$('time').querySelector('span').textContent=q.label;document.body.style.background=`#${q.sky.toString(16)}`}
function setupEvents(){let b=$('brake');b.addEventListener('click',()=>{braking=!braking;b.classList.toggle('isbraking',braking);b.querySelector('b').textContent=braking?'GO':'BRAKE';b.querySelector('.brakeicon').textContent=braking?'▶':'▮▮';$('drivehint').textContent=braking?'Tap GO to leave the station':'Tap BRAKE near the glowing platform';chime(braking?340:490)});
 $('camera').onclick=()=>{cameraMode=(cameraMode+1)%3;let names=['ORBIT','FOLLOW','CAB'];$('camera').querySelector('span').textContent=names[cameraMode];showToast(`${names[cameraMode]} CAMERA`)};
 $('time').onclick=()=>{timeMode=(timeMode+1)%3;applyTime()};$('sound').onclick=()=>{soundOn=!soundOn;$('sound span').textContent=soundOn?'ON':'OFF';chime(660)};
 $('photo').onclick=()=>{document.body.classList.toggle('photo');$('photo').textContent=document.body.classList.contains('photo')?'◩':'◫'};
 const canvas=renderer.domElement;canvas.addEventListener('pointerdown',e=>{pointerCount++;canvas.setPointerCapture(e.pointerId);orbit.drag=true;orbit.x=e.clientX;orbit.y=e.clientY});canvas.addEventListener('pointermove',e=>{if(!orbit.drag||pointerCount>1)return;orbit.a+=(e.clientX-orbit.x)*.005;orbit.e=Math.max(.22,Math.min(1.16,orbit.e+(e.clientY-orbit.y)*.004));orbit.x=e.clientX;orbit.y=e.clientY});canvas.addEventListener('pointerup',()=>{pointerCount=Math.max(0,pointerCount-1);orbit.drag=false});canvas.addEventListener('pointercancel',()=>{pointerCount=0;orbit.drag=false});canvas.addEventListener('wheel',e=>{e.preventDefault();orbit.d=Math.max(19,Math.min(92,orbit.d+e.deltaY*.04))},{passive:false});
 canvas.addEventListener('touchmove',e=>{if(e.touches.length===2){let a=e.touches[0],b=e.touches[1],dist=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);if(pinch)orbit.d=Math.max(19,Math.min(92,orbit.d+(pinch-dist)*.09));pinch=dist}else pinch=0},{passive:true});canvas.addEventListener('touchend',()=>pinch=0);
 addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.65))});
 addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();b.click()}if(e.key==='c')$('camera').click()});}
function frame(now){requestAnimationFrame(frame);let dt=Math.min(.06,(now-lastTime)/1000||.016);lastTime=now;let elapsed=now/1000;
 if(ready){let desired=braking?0:.09;speed+=Math.sign(desired-speed)*Math.min(Math.abs(desired-speed),dt*(braking?.25:.08));trainT=(trainT+speed*dt)%(Math.PI*2);let p=path(trainT),v=tangent(trainT);train.position.set(p.x,cfg.trackY+.15+Math.sin(elapsed*15)*Math.min(speed,.1)*.08,p.z);train.rotation.y=Math.atan2(v.z,-v.x); // negative local X is the train's forward direction
 let remain=((stations[targetIndex].t-trainT+Math.PI*2)%(Math.PI*2));$('distance').textContent=`${Math.max(0,Math.round(remain*16))} m`;$('speedtext').textContent=`${Math.round(speed/.09*56)} km/h`;$('speedfill').style.width=`${Math.min(100,speed/.09*100)}%`;
 if(remain<.65&&remain>.04&&!braking){$('missionhint').textContent='BRAKE NOW!';$('mission').classList.add('urgent')}else{$('missionhint').textContent=braking?'Gliding into the platform…':'Brake when the train meets the platform';$('mission').classList.remove('urgent')}
 if(braking&&remain<.65&&remain>.035&&speed<.04){trainT+=Math.min(.11*dt,remain*.15)}
 let abs=deltaAngle(trainT,stations[targetIndex].t);if(Math.abs(abs)<.08&&speed<.03&&braking){reward()}else if(abs>.22&&abs<.25&&speed>.04){miss()}
 }
 if(wheel){wheel.rotation.z+=dt*.21;wheel.children.forEach(o=>{if(o.userData.counter)o.rotation.z=-wheel.rotation.z})}clouds.forEach((g,i)=>{g.position.x+=dt*(.15+i*.024);if(g.position.x>50)g.position.x=-50});people.forEach((p,i)=>{p.g.position.y=p.home.y+Math.abs(Math.sin(elapsed*2.4+p.phase))*.045;p.g.rotation.y=Math.sin(elapsed*.7+p.phase)*.3});traffic.forEach((v,i)=>{v.g.position.x=v.x+Math.sin(elapsed*.18+i*2)*2;v.g.rotation.y=Math.cos(elapsed*.18+i*2)<0?Math.PI:0});stations.forEach((s,i)=>{s.pulse.scale.setScalar((i===targetIndex?1.6:.85)+Math.sin(elapsed*3+i)*.12);s.pointer.position.y=4.5+Math.sin(elapsed*3+i)*.22;s.pointer.rotation.y+=dt*.8});
 for(let i=sparkles.length-1;i>=0;i--){let s=sparkles[i];s.o.position.add(new THREE.Vector3(s.x,s.y,s.z));s.y-=dt*.2;s.life-=dt;s.o.scale.setScalar(Math.max(.01,s.life));if(s.life<=0){scene.remove(s.o);s.o.geometry.dispose();sparkles.splice(i,1)}}
 let focus=new THREE.Vector3(0,0,0),pos=new THREE.Vector3();if(cameraMode===1&&ready){focus.copy(train.position);focus.y+=1;pos.copy(train.position).add(new THREE.Vector3(-Math.cos(orbit.a)*17,11,-Math.sin(orbit.a)*17))}else if(cameraMode===2&&ready){focus.copy(train.position).add(tangent(trainT).multiplyScalar(13));focus.y=1.5;pos.copy(train.position).add(new THREE.Vector3(0,2.9,0)).sub(tangent(trainT).multiplyScalar(1.5))}else{let d=orbit.d*(innerWidth<650?1.13:1);pos.set(Math.cos(orbit.a)*Math.cos(orbit.e)*d,Math.sin(orbit.e)*d,Math.sin(orbit.a)*Math.cos(orbit.e)*d);focus.set(0,0,0)}
 if(!cameraInitialized){camera.position.copy(pos);cameraInitialized=true}else camera.position.lerp(pos,Math.min(1,dt*5));camera.lookAt(focus);if(shake>0){camera.position.x+=(rnd()-.5)*shake;camera.position.y+=(rnd()-.5)*shake;shake=Math.max(0,shake-dt*.8)}renderer.render(scene,camera);
}
try{init()}catch(e){console.error(e);$('loadtext').textContent='Unable to start 3D graphics on this device.';$('retry').hidden=false;$('retry').onclick=()=>location.reload()}
})();

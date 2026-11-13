import {COLORS,PALETTES} from './core.js';
const T=window.THREE,TAU=Math.PI*2;
export function createArt(canvas){
 T.ColorManagement.legacyMode=false;
 const renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputEncoding=T.sRGBEncoding;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 const scene=new T.Scene(),cam=new T.OrthographicCamera(-6,6,6,-6,.1,80);cam.position.set(0,13,12);cam.lookAt(0,0,0);
 scene.add(new T.HemisphereLight('#fff0d4','#32324f',.95));const sun=new T.DirectionalLight('#ffe4bf',1.5);sun.position.set(-5,12,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-7;sun.shadow.camera.right=7;sun.shadow.camera.top=7;sun.shadow.camera.bottom=-7;sun.shadow.bias=-.0005;sun.shadow.normalBias=.025;scene.add(sun);const fill=new T.DirectionalLight('#99d1e6',.7);fill.position.set(7,5,-4);scene.add(fill);
 const geos=new Map(),mats=new Map();function geo(k,f){if(!geos.has(k))geos.set(k,f());return geos.get(k)}function mat(c,rough=.45,metal=0,em=0){let k=[c,rough,metal,em].join();if(!mats.has(k))mats.set(k,new T.MeshStandardMaterial({color:c,roughness:rough,metalness:metal,emissive:c,emissiveIntensity:em}));return mats.get(k)}
 const sphere=geo('sphere',()=>new T.SphereGeometry(1,20,14)),cyl=geo('cyl',()=>new T.CylinderGeometry(1,1,1,32)),cone=geo('cone',()=>new T.ConeGeometry(1,1,24));
 function mesh(g,m,p,x=0,y=0,z=0,sx=1,sy=sx,sz=sx){let o=new T.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;o.receiveShadow=true;p.add(o);return o}
 function ball(p,c,x,y,z,r,ry=r,rz=r,em=0){return mesh(sphere,mat(c,.28,.08,em),p,x,y,z,r,ry,rz)}
 function cylinder(p,c,x,y,z,r,h,metal=.6){return mesh(cyl,mat(c,.35,metal),p,x,y,z,r,h,r)}
 function torus(p,c,x,y,z,r,t){const g=geo('tor'+r+','+t,()=>new T.TorusGeometry(r,t,8,40));let o=mesh(g,mat(c,.28,.72),p,x,y,z);o.rotation.x=Math.PI/2;return o}
 function rounded(w,d,h,r=.15){return geo(`round${w},${d},${h},${r}`,()=>{const s=new T.Shape(),x=-w/2,z=-d/2;s.moveTo(x+r,z);s.lineTo(x+w-r,z);s.quadraticCurveTo(x+w,z,x+w,z+r);s.lineTo(x+w,z+d-r);s.quadraticCurveTo(x+w,z+d,x+w-r,z+d);s.lineTo(x+r,z+d);s.quadraticCurveTo(x,z+d,x,z+d-r);s.lineTo(x,z+r);s.quadraticCurveTo(x,z,x+r,z);const g=new T.ExtrudeGeometry(s,{depth:h,bevelEnabled:true,bevelSize:.045,bevelThickness:.045,bevelSegments:3,steps:1,curveSegments:6});g.rotateX(-Math.PI/2);return g;});}
 const world=new T.Group();scene.add(world);let board=null,rotors=[],bells=[],goal=null,start=null,palette=PALETTES[0],current=null;
 const marble=ball(scene,'#fff4ca',0,1.2,0,.17,.17,.17,.55);marble.visible=false;
 const halo=mesh(geo('halo',()=>new T.TorusGeometry(.22,.025,6,24)),mat('#ffdca0',.4,.1,.5),scene);halo.rotation.x=Math.PI/2;halo.visible=false;
 const light=new T.PointLight('#ffdba2',1.1,3.5);scene.add(light);
 const trail=new T.InstancedMesh(geo('trail',()=>new T.BoxGeometry(1,1,1)),mat('#f2ca8d',.3,.4,.45),70);trail.instanceMatrix.setUsage(T.DynamicDrawUsage);trail.count=0;scene.add(trail);const trailDummy=new T.Object3D();
 let fx=[];const particleGeo=geo('particle',()=>new T.SphereGeometry(1,6,4)),particleMat=mat('#ffffff',.5,.15,.15),particles=new T.InstancedMesh(particleGeo,particleMat,180);particles.instanceMatrix.setUsage(T.DynamicDrawUsage);for(let i=0;i<180;i++)particles.setColorAt(i,new T.Color('#ffffff'));particles.count=0;scene.add(particles);const dummy=new T.Object3D();
 const rings=[];for(let i=0;i<12;i++){const m=mesh(geo('ring',()=>new T.TorusGeometry(1,.025,6,40)),new T.MeshBasicMaterial({color:'#ffe7a4',transparent:true,opacity:0,depthWrite:false}),scene);m.rotation.x=Math.PI/2;m.visible=false;rings.push({mesh:m,age:10});}
 function pos(x,y){return new T.Vector3((x-2)*1.38,1.15,(y-2)*1.38)}
 function makeBell(parent,c,n,small=false){
  const o=new T.Group();parent.add(o);cylinder(o,'#cba579',0,.13,0,.34,.17);torus(o,'#f0ce8c',0,.24,0,.29,.035);
  // Continuous revolved bell profile: metal lip, curved glazed dome and clapper.
  const bellGeo=geo('bell',()=>new T.LatheGeometry([new T.Vector2(.35,0),new T.Vector2(.34,.05),new T.Vector2(.28,.12),new T.Vector2(.23,.32),new T.Vector2(.19,.42),new T.Vector2(.09,.47),new T.Vector2(0,.48)],32));
  let bell=mesh(bellGeo,mat(c,.25,.15),o,0,.27,0);torus(bell,'#f7d899',0,.04,0,.335,.023);ball(o,'#f9df97',0,.86,0,.06);ball(bell,'#765544',0,.06,0,.07);
  // A physical engraved number makes order readable without audio or color alone.
  let plate=cylinder(o,'#f3e2bd',0,.40,.43,.14,.035,.1);plate.rotation.x=Math.PI/4;const tex=labelTexture(String(n+1),'#523e43',80);const sign=new T.Mesh(geo('numberplane',()=>new T.PlaneGeometry(.23,.23)),flat(tex));sign.rotation.x=-Math.PI/4;sign.position.set(0,.425,.455);o.add(sign);
  o.userData={bell,plate,baseY:0,hit:-10,lit:false};if(small)o.scale.setScalar(.65);return o;
 }
 const textures=new Map();function labelTexture(text,color='#f4d99e',size=256){const key=text+color+size;if(textures.has(key))return textures.get(key);const c=document.createElement('canvas');c.width=size;c.height=text.length>2?100:size;const x=c.getContext('2d');x.fillStyle=color;x.textAlign='center';x.textBaseline='middle';x.font=`600 ${text.length>2?60:size*.48}px Georgia`;x.fillText(text,size/2,c.height/2);const tex=new T.CanvasTexture(c);tex.encoding=T.sRGBEncoding;textures.set(key,tex);return tex;}
 function flat(tex){const k='flat'+tex.uuid;if(!mats.has(k))mats.set(k,new T.MeshBasicMaterial({map:tex,transparent:true}));return mats.get(k);}
 function noteBadge(o,text,x,y,z,s=.5){const a=new T.Mesh(geo('label'+s,()=>new T.PlaneGeometry(s,s)),flat(labelTexture(text)));a.rotation.x=-Math.PI/2;a.position.set(x,y,z);o.add(a);return a;}
 function makeRotor(r,i,withBell){let o=new T.Group(),p=pos(r.x,r.y);o.position.set(p.x,.86,p.z);world.add(o);cylinder(o,'#312f40',0,0,0,.56,.10);cylinder(o,palette.rim,0,.08,0,.50,.1);torus(o,'#e9c788',0,.15,0,.45,.025);cylinder(o,palette.accent,0,.16,0,.40,.07,.08);
  const disk=new T.Group();disk.position.y=.23;o.add(disk);
  mesh(rounded(.48,.17,.045,.05),mat('#493b49',.5,.1),disk,.04,0,0);const arrow=mesh(cone,mat('#493b49',.5,.1),disk,.27,.02,0,.17,.28,.17);arrow.rotation.z=-Math.PI/2;
  // Rotating thumb notches and three tiny brass rivets around the socket.
  for(let k=0;k<3;k++){let a=k*TAU/3;ball(o,'#f4d79b',Math.sin(a)*.50,.14,Math.cos(a)*.50,.035);}
  if(withBell){let b=makeBell(o,COLORS[withBell.note],withBell.note,true);b.position.set(-.27,.27,-.30);}
  o.userData={disk,angle:0,hit:-10,target:0};return o;
 }
 function gear(parent,x,z,r=.4){let o=new T.Group();o.position.set(x,.48,z);parent.add(o);cylinder(o,'#b68c60',0,0,0,r,.09);cylinder(o,'#48384a',0,.06,0,r*.68,.03);for(let i=0;i<12;i++){let a=i*TAU/12;let tooth=mesh(rounded(.13,.17,.07,.025),mat('#c59e6d',.4,.7),o,Math.cos(a)*r,.015,Math.sin(a)*r);tooth.rotation.y=-a;}cylinder(o,'#e2be81',0,.09,0,.09,.07);return o;}
 const gears=[];
 function load(p){current=p;fx=[];for(const ring of rings){ring.mesh.visible=false;ring.age=10;}while(world.children.length)world.remove(world.children[0]);rotors=[];bells=[];gears.length=0;palette=PALETTES[p.level.chapter];scene.background=null;
  // Lacquered case, inset felt, continuous brass border and carved wooden feet.
  for(const x of [-3,3])for(const z of [-3,3])ball(world,'#312533',x,-.16,z,.40,.24,.40);
  board=mesh(rounded(8.2,8.2,.50,.5),mat(palette.wood,.42,.08),world,0,0,0);
  mesh(rounded(7.85,7.85,.10,.4),mat(palette.rim,.3,.65),world,0,.52,0);
  mesh(rounded(7.57,7.57,.07,.32),mat('#222d3d',.8,.1),world,0,.64,0);
  mesh(rounded(7.40,7.40,.055,.25),mat(palette.felt,.95),world,0,.73,0);
  // Engraved conducting rails, sockets, set screws, pearl corner caps.
  for(let i=0;i<5;i++){let a=(i-2)*1.38;mesh(rounded(.025,5.52,.008,.01),mat('#b9946e',.7,.45),world,a,.805,0);mesh(rounded(5.52,.025,.008,.01),mat('#b9946e',.7,.45),world,0,.805,a);}
  for(let y=0;y<5;y++)for(let x=0;x<5;x++){let v=pos(x,y);cylinder(world,'#273c49',v.x,.83,v.z,.14,.025,.2);torus(world,'#917c64',v.x,.85,v.z,.13,.012);}
  for(let x of [-3.67,3.67])for(let z of [-3.67,3.67]){ball(world,'#dbc39a',x,.73,z,.09,.05,.09);mesh(rounded(.08,.012,.01,.004),mat('#765e55'),world,x,.785,z);}
  // Decorative winding mechanism is outside the interactive grid.
  for(let i=0;i<3;i++)gears.push(gear(world,-3.65+i*.38,3.48,.28-i*.025));
  for(const x of [-2.7,2.7]){cylinder(world,'#bb986a',x,.47,-3.92,.14,.5);let hinge=cylinder(world,'#dfbc83',x,.5,-3.97,.16,.50);hinge.rotation.x=Math.PI/2;}
  mesh(rounded(2.4,.32,.04,.09),mat('#b18d62',.35,.65),world,0,.82,3.46);const logo=new T.Mesh(geo('nameplate',()=>new T.PlaneGeometry(1.9,.27)),flat(labelTexture('CHIMEWORK','#342b3a',512)));logo.rotation.x=-Math.PI/2;logo.position.set(0,.872,3.46);world.add(logo);
  // Side roll and musical tines have material variation, not uniform shine.
  for(let i=0;i<9;i++){let tine=mesh(rounded(.09,.30+(i%3)*.07,.035,.025),mat('#e0c394',.3,.7),world,2.65+i*.075,.88,3.35);}
  rotors=p.level.rotors.map((r,i)=>makeRotor(r,i,p.level.bells.find(b=>b.x===r.x&&b.y===r.y)));
  bells=p.level.bells.map(b=>{const ri=p.level.rotors.findIndex(r=>r.x===b.x&&r.y===b.y);if(ri>=0){let o=rotors[ri].children.find(c=>c.userData.bell);return o;}let o=makeBell(world,COLORS[b.note],b.note);const v=pos(b.x,b.y);o.position.set(v.x,.86,v.z);return o;});
  let sp=pos(p.level.start.x,p.level.start.y);start=new T.Group();start.position.set(sp.x,.87,sp.z);world.add(start);cylinder(start,'#ead8ac',0,0,0,.42,.12,.35);torus(start,'#ffdda2',0,.14,0,.31,.035);ball(start,'#f6d294',0,.22,0,.22,.11,.22,.3);noteBadge(start,'▶',0,.35,0,.35);
  let ep=pos(p.level.end.x,p.level.end.y);goal=new T.Group();goal.position.set(ep.x,.86,ep.z);world.add(goal);cylinder(goal,'#715847',0,.08,0,.44,.15);torus(goal,'#e9c98d',0,.21,0,.35,.05);cylinder(goal,'#2d3e49',0,.18,0,.28,.1,.1);noteBadge(goal,'★',0,.25,0,.42);
  marble.visible=false;halo.visible=false;light.intensity=0;sync(p);resize();
 }
 function sync(p){p.dirs.forEach((d,i)=>{rotors[i].userData.target=-d*Math.PI/2;});}
 function burst(x,y,c,count=18){let p=pos(x,y);for(let i=0;i<count&&fx.length<180;i++){let a=Math.random()*TAU,v=.5+Math.random()*1.5;fx.push({x:p.x,y:1.1,z:p.z,vx:Math.cos(a)*v,vy:1.8+Math.random()*2,vz:Math.sin(a)*v,age:0,life:.6+Math.random()*.6,c});}const ring=rings.find(r=>r.age>1)||rings[0];ring.age=0;ring.mesh.position.set(p.x,.91,p.z);ring.mesh.material.color.set(c);ring.mesh.visible=true;}
 function event(e,time){if(e.type==='note'){const b=bells[e.note];b.userData.hit=time;b.userData.lit=true;burst(e.x,e.y,COLORS[e.note],22);}if(e.type==='turn'){rotors[e.i].userData.hit=time;burst(e.x,e.y,palette.accent,5);}if(e.type==='rotate'){rotors[e.i].userData.hit=time;burst(e.x,e.y,palette.accent,8);}if(e.type==='win'){burst(e.x,e.y,'#ffda8f',60);}if(e.type==='miss')burst(Math.max(0,Math.min(4,e.x)),Math.max(0,Math.min(4,e.y)),'#c8b6d5',10);}
 function clearNotes(){for(const b of bells){b.userData.lit=false;b.userData.hit=-10;}}
 let size={w:1,h:1};function resize(){const r=canvas.getBoundingClientRect(),w=r.width,h=r.height;if(!w||!h)return;size={w,h};renderer.setSize(w,h,false);const aspect=w/h,half=Math.max(3.65,4.55/aspect);cam.left=-half*aspect;cam.right=half*aspect;cam.top=half;cam.bottom=-half;cam.updateProjectionMatrix();cam.updateMatrixWorld();}
 function project(x,y){const p=pos(x,y);p.y=1.1;p.project(cam);return {x:(p.x*.5+.5)*size.w,y:(-.5*p.y+.5)*size.h};}
 let last=0;function render(p,time,alpha=0,traveling=false){const dt=Math.min(.05,time-last||0);last=time;sync(p);
  for(const r of rotors){let a=r.userData.angle,t=r.userData.target;let diff=((t-a+Math.PI)%(TAU)+TAU)%TAU-Math.PI;r.userData.angle+=diff*Math.min(1,dt*15);r.userData.disk.rotation.y=r.userData.angle;const h=time-r.userData.hit;r.scale.y=1+(h<.4?Math.sin(h*20)*Math.exp(-h*10)*.15:0);}
  for(const b of bells){const h=time-b.userData.hit;b.userData.bell.rotation.z=h<1.2?Math.sin(h*28)*Math.exp(-h*4)*.25:0;b.userData.bell.material.emissiveIntensity=b.userData.lit?.26:0;b.userData.plate.material.emissiveIntensity=b.userData.lit?.16:0;}
  gears.forEach((g,i)=>g.rotation.y=time*(i%2?-.18:.18));
  const isRunning=traveling||p.status==='won';marble.visible=isRunning;halo.visible=isRunning;
  if(isRunning){const a=pos(p.from.x,p.from.y),b=pos(p.to.x,p.to.y),q=a.lerp(b,Math.min(1,alpha));marble.position.copy(q);marble.position.y=1.15+Math.sin(alpha*Math.PI)*.1;halo.position.set(q.x,.90,q.z);halo.scale.setScalar(1+Math.sin(time*6)*.08);light.position.copy(marble.position);light.intensity=1.2;}else light.intensity=0;
  // A luminous inlaid route records the actual trip, including an unsuccessful detour.
  let points=[pos(p.level.start.x,p.level.start.y),...p.visited.map(k=>{const v=k.split(',').map(Number);return pos(v[0],v[1]);})];
  if(traveling&&points.length>1)points[points.length-1]=pos(p.from.x,p.from.y).lerp(pos(p.to.x,p.to.y),alpha);
  trail.count=Math.min(69,points.length-1);for(let i=0;i<trail.count;i++){const a=points[i],b=points[i+1],len=a.distanceTo(b);trailDummy.position.copy(a).lerp(b,.5);trailDummy.position.y=.87;trailDummy.rotation.set(0,-Math.atan2(b.z-a.z,b.x-a.x),0);trailDummy.scale.set(Math.max(.001,len),.022,.055);trailDummy.updateMatrix();trail.setMatrixAt(i,trailDummy.matrix);}trail.instanceMatrix.needsUpdate=true;
  fx=fx.filter(f=>f.age<f.life);fx.forEach((f,i)=>{f.age+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.z+=f.vz*dt;f.vy-=5*dt;dummy.position.set(f.x,Math.max(.9,f.y),f.z);dummy.scale.setScalar(Math.max(.001,.045*(1-f.age/f.life)));dummy.updateMatrix();particles.setMatrixAt(i,dummy.matrix);particles.setColorAt(i,new T.Color(f.c));});particles.count=fx.length;particles.instanceMatrix.needsUpdate=true;particles.instanceColor.needsUpdate=true;
  for(const r of rings){r.age+=dt;if(r.age>1){r.mesh.visible=false;continue;}r.mesh.scale.setScalar(.22+r.age*1.5);r.mesh.material.opacity=(1-r.age)*.7;}
  if(p.won){const s=1+Math.sin(time*3)*.04;goal.scale.setScalar(s);}renderer.render(scene,cam);
 }
 return {load,resize,project,event,render,clearNotes};
}

/* Original rooftop and toy baseball cast. Procedural geometry/textures only. */
window.NinthWorld=function(canvas){
'use strict';const T=THREE,V=T.Vector3;T.ColorManagement.legacyMode=false;
const mobile=matchMedia('(pointer:coarse)').matches||innerWidth<700;
const renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.5:2));renderer.outputEncoding=T.sRGBEncoding;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;renderer.shadowMap.enabled=!mobile;renderer.shadowMap.type=T.PCFSoftShadowMap;
const scene=new T.Scene();scene.fog=new T.FogExp2('#29263e',.009);const camera=new T.PerspectiveCamera(52,1,.1,220);
const mats={},geos={};let seed=83;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const hemi=new T.HemisphereLight('#bbb5ff','#1a1f30',.85);scene.add(hemi);
const key=new T.DirectionalLight('#ffc4a1',1.7);key.position.set(-18,28,-27);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-20,right:20,top:28,bottom:-20,near:1,far:100});key.shadow.normalBias=.04;scene.add(key);
const fill=new T.DirectionalLight('#62d2e1',.6);fill.position.set(12,10,15);scene.add(fill);
function mat(c,rough=.65,metal=0,emit=0){let k=[c,rough,metal,emit].join();return mats[k]||(mats[k]=new T.MeshStandardMaterial({color:c,roughness:rough,metalness:metal,emissive:c,emissiveIntensity:emit}));}
function mesh(geo,mt,x=0,y=0,z=0,parent=scene){const m=new T.Mesh(geo,typeof mt==='string'?mat(mt):mt);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function box(x,y,z,w,h,d,c,parent=scene){let k=[w,h,d].join();return mesh(geos[k]||(geos[k]=new T.BoxGeometry(w,h,d)),c,x,y,z,parent);}
function ball(x,y,z,sx,sy,sz,c,parent=scene){let m=mesh(geos.sphere||(geos.sphere=new T.SphereGeometry(1,20,14)),c,x,y,z,parent);m.scale.set(sx,sy,sz);return m;}
function cyl(x,y,z,r1,r2,h,c,parent=scene,segments=20){let k='cy'+[r1,r2,h,segments];return mesh(geos[k]||(geos[k]=new T.CylinderGeometry(r1,r2,h,segments)),c,x,y,z,parent);}
function line(a,b,width,c,parent=scene){a=new V(...a);b=new V(...b);let d=b.clone().sub(a),m=cyl(0,0,0,width,width,d.length(),c,parent,8);m.position.copy(a.add(b).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new V(0,1,0),d.normalize());return m;}
function group(x=0,y=0,z=0,parent=scene){let g=new T.Group();g.position.set(x,y,z);parent.add(g);return g;}
function tex(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);let t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;return t;}
function label(text,color='#c7f7ed',bg='#162733',w=512,h=128){return tex(w,h,(c,W,H)=>{c.fillStyle=bg;c.fillRect(0,0,W,H);c.strokeStyle=color;c.lineWidth=4;c.strokeRect(8,8,W-16,H-16);c.fillStyle=color;c.textAlign='center';c.textBaseline='middle';c.font=`900 ${Math.floor(H*.47)}px monospace`;c.fillText(text,W/2,H*.54,W-24);});}
function sign(x,y,z,w,h,text,color,bg='#182935',parent=scene){return mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:label(text,color,bg)}),x,y,z,parent);}
const skyMap=tex(32,512,(c,w,h)=>{let g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#353954');g.addColorStop(.38,'#f3b997');g.addColorStop(.49,'#b47890');g.addColorStop(.62,'#423e65');g.addColorStop(1,'#10213b');c.fillStyle=g;c.fillRect(0,0,w,h);});
const sky=new T.Mesh(new T.SphereGeometry(180,32,24),new T.MeshBasicMaterial({map:skyMap,side:T.BackSide,depthWrite:false,fog:false}));scene.add(sky);
const moon=mesh(new T.CircleGeometry(5,48),new T.MeshBasicMaterial({color:'#ffd5a1',transparent:true,opacity:.92,fog:false}),-35,28,-100);
// A continuous city, with instanced lit windows rather than hundreds of draw calls.
const windows=[],pinks=[],buildingMats=['#293046','#313249','#34374e','#41435b','#32384e'];
for(let row=0;row<4;row++)for(let i=0;i<21;i++){
 let x=(i-10)*7.4+(random()-.5)*3,z=-40-row*19-random()*7,h=8+random()*(row?26:15),w=4+random()*3,d=5+random()*5;
 box(x,h/2-8,z,w,h,d,buildingMats[(i+row)%5]);box(x,h-7.8,z,w+.15,.3,d+.15,'#53526b');
 if(i%3===0){box(x,h-6.9,z,1,1.7,1.3,'#667080');line([x,h-6,z],[x,h-3,z],.035,'#a396a6');}
 for(let yy=-5;yy<h-9;yy+=1.2)for(let xx=-w/2+.5;xx<w/2;xx+=.9)if(random()>.32){let a=[x+xx,yy,z+d/2+.02,.3,.45];(random()>.87?pinks:windows).push(a);}
}
function instances(items,color){let geo=new T.PlaneGeometry(1,1),mt=new T.MeshBasicMaterial({color}),m=new T.InstancedMesh(geo,mt,items.length),o=new T.Object3D();items.forEach((p,i)=>{o.position.set(p[0],p[1],p[2]);o.scale.set(p[3],p[4],1);o.updateMatrix();m.setMatrixAt(i,o.matrix);});scene.add(m);return m;}
instances(windows,'#f7c29c');instances(pinks,'#ef97bc');
// Foreground neighbouring rooftops have rooftop equipment, ducts and signs.
for(let side of [-1,1])for(let i=0;i<5;i++){
 let x=side*(21+i%2*9),z=5-i*12,y=-4+random()*2;
 box(x,y-4,z,12,8,10,'#303a4e');box(x,y+.15,z,12.5,.35,10.5,'#596077');
 for(let q=0;q<3;q++){box(x-3+q*2,y+.8,z,1.5,1.3,2,'#7d8193');cyl(x-3+q*2,y+1.53,z,.47,.47,.1,'#252f42');}
 line([x-5,y+.5,z+5],[x+5,y+.5,z+5],.09,'#b59f9e');
}
// Tall electric signs, readable at a glance. No reference logos or borrowed art.
sign(-20,5,-35,8,3,'NIGHT SHIFT','#f59dbb');sign(21,7,-49,9,3,'LATE LATE','#8ce9e1');
sign(-32,16,-64,5,8,'09','#ffe1a2');
const train=group(-40,-3,-32);for(let i=0;i<5;i++){box(i*4,0,0,3.7,1.35,1.3,'#c3d6d4',train);box(i*4,-.5,.69,3.7,.18,.04,'#e7a66a',train);for(let j=0;j<3;j++)box(i*4-1+j,.2,.67,.65,.58,.03,mat('#ffe7b5',.5,0,.6),train);}
box(0,-4,-32,110,.35,2.2,'#323e51');for(let x=-45;x<50;x+=9)box(x,-9,-32,.5,10,.6,'#273348');
// Playing deck, surrounded by a physical rooftop cage.
box(0,-.5,-8,29,1,45,'#303b48');box(0,.03,-8,28,.08,44,'#336e71');
for(let z=-28;z<14;z+=4)box(0,.078,z,27.7,.012,1.98,'#367779');
box(0,.105,5,9,.06,11,'#b57466');
for(let x of [-13.8,13.8]){box(x,.28,-8,.3,.6,44,'#7c9393');box(x,.65,-8,.1,.12,44,mat('#77e5d7',.2,.3,.6));}
box(0,.24,-29,28,.5,.5,'#809598');
for(let z=-29;z<=14;z+=7.15)for(let x of [-13.6,13.6]){cyl(x,4.3,z,.09,.12,8.6,'#70818d');line([x,8.5,z],[x,8.5,Math.min(z+7.15,14)],.07,'#70818d');}
line([-13.6,8.5,-29],[13.6,8.5,-29],.08,'#70818d');line([-13.6,8.5,14],[13.6,8.5,14],.08,'#70818d');
const netGeo=new T.BufferGeometry(),verts=[];function netline(a,b){verts.push(...a,...b);}
for(let x of [-13.6,13.6]){for(let z=-29;z<14;z+=.7)netline([x,.8,z],[x,8.5,z]);for(let y=.8;y<8.6;y+=.7)netline([x,y,-29],[x,y,14]);}
for(let x=-13.6;x<13.6;x+=.7)netline([x,.8,-29],[x,8.5,-29]);for(let y=.8;y<8.6;y+=.7)netline([-13.6,y,-29],[13.6,y,-29]);
netGeo.setAttribute('position',new T.Float32BufferAttribute(verts,3));scene.add(new T.LineSegments(netGeo,new T.LineBasicMaterial({color:'#8fb1c0',transparent:true,opacity:.23})));
// Fine painted foul lines, batter box, plate and concentric contact marks.
line([-1.7,.15,6],[-11,.15,-26],.035,'#c4d5cb');line([1.7,.15,6],[11,.15,-26],.035,'#c4d5cb');
for(let x of [-2.5,2.5]){line([x-1.2,.15,2.7],[x+1.2,.15,2.7],.025,'#e3d4b7');line([x-1.2,.15,6.4],[x+1.2,.15,6.4],.025,'#e3d4b7');for(let a of [-1.2,1.2])line([x+a,.15,2.7],[x+a,.15,6.4],.025,'#e3d4b7');}
let plateShape=new T.Shape();plateShape.moveTo(-.55,-.5);plateShape.lineTo(.55,-.5);plateShape.lineTo(.55,.1);plateShape.lineTo(0,.6);plateShape.lineTo(-.55,.1);plateShape.closePath();let plate=mesh(new T.ShapeGeometry(plateShape),mat('#f6e7cc'),0,.18,5);plate.rotation.x=-Math.PI/2;
const ringMat=new T.MeshBasicMaterial({color:'#7de4d4',transparent:true,opacity:.65,side:T.DoubleSide});const ring=mesh(new T.TorusGeometry(.69,.025,7,48),ringMat,0,1.45,5);const cueRing=mesh(new T.TorusGeometry(.69,.038,7,48),new T.MeshBasicMaterial({color:'#ffe0a2',transparent:true,opacity:.8}),0,1.45,5);
// Ball machine, bucket, roller wheels and a guarded firing tube.
const machine=group(0,0,-20);box(0,1.15,0,1.35,1.7,1.5,'#dbbd95',machine);box(0,1.3,.78,1.05,.9,.1,'#314954',machine);let tube=cyl(0,1.65,.95,.28,.28,.9,mat('#293545',.4,.6),machine);tube.rotation.x=Math.PI/2;
for(let x of [-.65,.65]){let w=cyl(x,.36,0,.36,.36,.19,'#172e39',machine);w.rotation.z=Math.PI/2;box(x,2.3,0,.1,.6,1,'#6d8989',machine);}
cyl(0,2.27,-.13,.72,.5,.65,'#d7b47e',machine);for(let i=0;i<8;i++)ball((random()-.5)*.7,2.6+random()*.13,-.13+(random()-.5)*.7,.13,.13,.13,'#fff3d9',machine);
sign(0,1.18,.86,.75,.24,'09','#f7d79e','#324552',machine);
// Side benches, bat rack, hanging banners, drinks and floodlights.
for(let side of [-1,1]){
 let x=side*10.5;box(x,.8,5,3,.22,1.3,'#b98d71');for(let a of [-1,1])box(x+a,.4,5,.16,.8,1,'#455260');box(x,1.4,5.6,3,.8,.15,'#c79d7b');
 box(x,.9,-6,2,1.8,1.7,'#294552');box(x,1.85,-6,2.2,.15,1.9,'#81a1a6');for(let i=0;i<3;i++){cyl(x-.55+i*.55,2.12,-6,.16,.16,.4,i===1?'#e9b66e':'#d68499');cyl(x-.55+i*.55,2.33,-6,.12,.12,.04,'#e3d2b4');}
 let lamp=box(side*11.5,6.3,-7,2,.5,.5,mat('#ffe8b7',.3,.1,1.5));lamp.rotation.x=-.4;line([side*11.5,0,-7],[side*11.5,6.3,-7],.07,'#778d96');
 sign(side*13.25,3.4,-15,3.5,1.1,side<0?'GOOD NIGHT':'ONE MORE','#ffca90');
}
const bunting=group();for(let i=0;i<13;i++){let x=-12+i*2,y=7.8-Math.sin(i/12*Math.PI)*.7;line([x,y,0],[x+2,7.8-Math.sin((i+1)/12*Math.PI)*.7,0],.015,'#c7b2b1',bunting);let geom=new T.BufferGeometry();geom.setAttribute('position',new T.Float32BufferAttribute([x+.2,y-.05,0,x+1.5,y-.05,0,x+.85,y-.9,0],3));geom.computeVertexNormals();mesh(geom,new T.MeshStandardMaterial({color:['#e8a67e','#61b7b5','#d489a5'][i%3],side:T.DoubleSide}),0,0,0,bunting);}
const targets=[];for(let i=0;i<3;i++){
 const g=group((i-1)*7,6.4,-24);box(0,0,-.2,5.4,4.3,.4,'#172e3d',g);box(0,0,-.45,5.7,4.6,.3,'#5c7480',g);
 const face=mesh(new T.PlaneGeometry(5.1,4),mat('#264955',.6,0,.1),0,0,.02,g);
 const hoop=mesh(new T.TorusGeometry(1.35,.11,8,48),mat('#9ae4d9',.4,.2,.8).clone(),0,.2,.12,g);
 const center=mesh(new T.CircleGeometry(.7,32),mat('#f6d196',.6,0,.5).clone(),0,.2,.15,g);
 sign(0,-1.35,.05,3.2,.5,['LEFT','CENTER','RIGHT'][i],'#bddbd8','#203f4b',g);
 const bolts=[];for(let a of [-2.45,2.45])for(let b of [-1.8,1.8])ball(a,b,.08,.06,.06,.06,'#c2b4a2',g);
 targets.push({g,hoop,face,center,pulse:0});
}
sign(0,10,-26,14,1.7,'N E O N  N I N T H','#ffcf97','#283a4b');
// A lovingly jointed small vinyl batter: helmet, visor, stitched uniform and fingers.
const player=group(-1.7,0,5.1);const uniform=mat('#dc9f71',.75),helmetMat=mat('#65cfc4',.27,.3);let shoes=[];
for(let x of [-.3,.3]){box(x,.23,.05,.39,.32,.66,'#1d3541',player);box(x,.095,.05,.42,.08,.7,'#e8d9bc',player);let leg=cyl(x,.71,0,.18,.21,.85,'#e0d8be',player);shoes.push(leg);box(x,.33,-.22,.12,.05,.08,'#e1b67d',player);}
const torso=group(0,1.25,0,player);ball(0,.12,0,.52,.62,.34,uniform,torso);box(0,-.18,.31,.8,.09,.03,'#263d49',torso);sign(0,.14,.351,.36,.37,'09','#fcdec0','#a96e55',torso);
cyl(0,1.94,0,.16,.19,.23,'#e8b68f',player);ball(0,2.25,0,.4,.44,.37,'#e8b68f',player);
const helmet=group(0,2.42,0,player);ball(0,0,0,.45,.38,.43,helmetMat,helmet);box(.03,-.12,-.35,.8,.1,.43,helmetMat,helmet);ball(-.36,-.16,.02,.14,.22,.18,helmetMat,helmet);ball(.36,-.16,.02,.14,.22,.18,helmetMat,helmet);
ball(-.14,2.24,-.344,.04,.055,.025,'#26383f',player);ball(.13,2.24,-.344,.04,.055,.025,'#26383f',player);
const batPivot=group(.72,1.48,-.15,player);const bat=group(0,0,0,batPivot);let shaft=cyl(1.13,0,0,.105,.055,2.2,mat('#c5e0dc',.25,.65),bat);shaft.rotation.z=-Math.PI/2;let grip=cyl(.25,0,0,.063,.063,.48,'#384250',bat);grip.rotation.z=-Math.PI/2;ball(2.22,0,0,.1,.1,.1,'#d4ece3',bat);
for(let i=0;i<7;i++) {let wrap=cyl(.06+i*.06,0,0,.066,.066,.016,'#edbc86',bat);wrap.rotation.z=Math.PI/2;}
const arms=[line([-.37,1.7,0],[.6,1.58,-.15],.15,uniform,player),line([.37,1.7,0],[.72,1.58,-.15],.15,uniform,player)];ball(.63,1.58,-.15,.15,.14,.14,'#eed5ab',player);ball(.8,1.58,-.15,.14,.13,.13,'#eed5ab',player);
// Baseball with curved, stitched red seams.
const baseball=group();ball(0,0,0,.17,.17,.17,mat('#fff7da',.4),baseball);
for(let side of [-1,1]){let pts=[];for(let i=0;i<=36;i++){let a=i/36*Math.PI*2;pts.push(new V(.12*side*Math.sin(a*.5+.2),.164*Math.sin(a),.164*Math.cos(a)));}let c=new T.CatmullRomCurve3(pts);mesh(new T.TubeGeometry(c,36,.006,4,false),mat('#b94d60'),0,0,0,baseball);}
const ballShadow=mesh(new T.CircleGeometry(.23,24),new T.MeshBasicMaterial({color:'#102b36',transparent:true,opacity:.45,depthWrite:false}),0,.14,5);ballShadow.rotation.x=-Math.PI/2;
// Bounded pooled trails and impact confetti. No allocation during normal frames.
const pool=[];for(let i=0;i<72;i++){let m=box(0,0,0,.06,.06,.14,mat(i%2?'#ffdb9c':'#85e5d7',.4,0,.7));m.visible=false;pool.push({m,life:0,v:new V(),base:.06});}
const trail=[];for(let i=0;i<20;i++){let m=ball(0,0,0,.1,.1,.1,new T.MeshBasicMaterial({color:'#f8ce91',transparent:true,opacity:.5}));m.visible=false;trail.push(m);}
let poolIndex=0,trailIndex=0,impact=0,lastT=0,lastPhase='',look=new V(0,3.7,-15),cam=new V(0,5.2,14),shake=0,paused=false;
const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
function burst(pos,n=32){for(let i=0;i<n;i++){let p=pool[poolIndex++%pool.length];p.m.position.copy(pos);p.v.set((random()-.5)*8,random()*6,(random()-.5)*8);p.life=.6+random()*.5;p.m.visible=true;}}
function event(e,m){if(e.type==='hit'){shake=e.perfect?.075:.035;impact=1;burst(new V(m.launch.x,m.launch.y,m.launch.z),e.perfect?38:18);targets[e.lane].pulse=1;}if(e.type==='land'&&e.target){burst(new V((e.lane-1)*7,6.6,-23.5),45);targets[e.lane].pulse=1.8;}}
function resize(){let w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<h?62:50;camera.updateProjectionMatrix();}
function theme(i){let c=Ninth.ROOFS[i].colors;scene.fog.color.set(c[0]);key.color.set(c[1]);fill.color.set(c[2]);sky.material.color.set(['#ffffff','#e8c8bf','#b6c7e7','#ffe0b1','#7d85b3','#d6b5d9'][i]);}
function paint(i){helmetMat.color.set(['#65cfc4','#f3b96f','#ed96b5','#c1a7f0'][i]);uniform.color.set(['#dc9f71','#365668','#637083','#adc7b0'][i]);}
function render(m,dt=1/60,active=true){
 let t=m?m.t:lastT+dt;lastT=t;let step=active?dt:0;
 train.position.x=((t*3.1+23)%125)-62;bunting.rotation.z=Math.sin(t*.8)*.006;
 if(m&&m.ball){baseball.visible=true;baseball.position.set(m.ball.x,m.ball.y,m.ball.z);baseball.rotation.set(t*5,t*2,t*4);ballShadow.visible=m.phase==='pitch';ballShadow.position.set(m.ball.x,.15,m.ball.z);ballShadow.scale.setScalar(1+Math.max(0,m.ball.y-1.5)*.12);
 if(m.phase==='flight'&&active){let p=trail[trailIndex++%trail.length];p.position.copy(baseball.position);p.scale.setScalar(.11);p.material.opacity=.55;p.visible=true;}}
 else{baseball.visible=false;ballShadow.visible=false;}
 for(let p of trail){if(active){p.scale.multiplyScalar(.92);p.material.opacity*=.9;}if(p.material.opacity<.025)p.visible=false;}
 for(let p of pool)if(p.life>0){p.life-=step;p.v.y-=6*step;p.m.position.addScaledVector(p.v,step);p.m.rotation.x+=step*4;p.m.rotation.z+=step*3;p.m.scale.setScalar(Math.min(1,Math.max(0,p.life)*4));p.m.visible=p.life>0;}
 targets.forEach((a,i)=>{a.pulse=Math.max(0,a.pulse-step*1.7);let on=m?m.target===i:i===1;a.hoop.material.emissiveIntensity=on?1.6:.2;a.hoop.material.color.set(on?'#ffd385':'#71949a');a.hoop.material.emissive.set(on?'#f4bc75':'#71949a');a.center.material.emissiveIntensity=on?.5:.03;a.center.material.color.set(a.pulse>0?'#fff4bb':on?'#f8c67b':'#547b83');a.g.scale.setScalar(1+a.pulse*.025);});
 const swing=m?m.t-m.swingTime:99;if(swing<.52){let p=Math.min(1,swing/.16);batPivot.rotation.y=1.9-p*3.4;batPivot.rotation.z=.04-Math.sin(p*Math.PI)*.06;torso.rotation.y=-Math.sin(p*Math.PI)*.32;helmet.rotation.y=-Math.sin(p*Math.PI)*.2;}
 else{batPivot.rotation.y=1.9;batPivot.rotation.z=.3;torso.rotation.y=Math.sin(t*1.5)*.02;helmet.rotation.y=0;}
 if(m&&m.phase==='pitch'){let p=m.age/m.duration;cueRing.visible=true;cueRing.scale.setScalar(Math.max(.8,3.5-p*2.5));cueRing.material.color.set(Math.abs(m.age-m.duration)<m.window()?'#fff0b2':'#74dbd2');ringMat.opacity=.6+.15*Math.sin(t*8);}
 else cueRing.visible=false;
 let portrait=innerWidth<innerHeight;
 let desired=new V(portrait?1.1:3.6,portrait?6.2:6.0,portrait?18:16),targetLook=new V(0,portrait?2.9:2.9,-11);
 if(m?.phase==='flight'&&m.ball&&!reduced){desired.x+=m.ball.x*.12;desired.y+=Math.min(2,m.flightAge*1.8);desired.z-=Math.min(3,m.flightAge*3);targetLook.y+=m.flightAge*2;}
 if(!m&&!reduced){desired.x+=Math.sin(t*.2)*.7;}
 if(active){cam.lerp(desired,1-Math.exp(-dt*3));look.lerp(targetLook,1-Math.exp(-dt*4));shake=Math.max(0,shake-dt*.6);}
 camera.position.copy(cam);if(shake>0&&!reduced){camera.position.x+=Math.sin(t*120)*shake;camera.position.y+=Math.cos(t*130)*shake;}camera.lookAt(look);renderer.render(scene,camera);
}
// Bake stationary meshes sharing a material into a single buffer. Keep the batter,
// target panels, train, rings and particle pools separate for animation.
const dynamic=new Set([ring,cueRing,ballShadow,sky,moon]);
scene.updateMatrixWorld(true);const buckets=new Map();
for(let o of scene.children)if(o.isMesh&&!o.isInstancedMesh&&o.visible&&!dynamic.has(o)&&!Array.isArray(o.material)&&o.geometry.attributes.normal){let list=buckets.get(o.material)||[];list.push(o);buckets.set(o.material,list);}
for(let [material,list] of buckets)if(list.length>1){
 const attrs={position:[],normal:[],uv:[]};
 for(let o of list){let g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(o.matrixWorld);for(let k of Object.keys(attrs))if(g.attributes[k])attrs[k].push(g.attributes[k].array);scene.remove(o);g.dispose();}
 const merged=new T.BufferGeometry();for(let [k,arrays] of Object.entries(attrs)){let length=arrays.reduce((n,a)=>n+a.length,0),data=new Float32Array(length),offset=0;for(let a of arrays){data.set(a,offset);offset+=a.length;}merged.setAttribute(k,new T.BufferAttribute(data,k==='uv'?2:3));}merged.computeBoundingSphere();let m=new T.Mesh(merged,material);m.castShadow=true;m.receiveShadow=true;scene.add(m);
}
resize();window.addEventListener('resize',resize);return{render,event,theme,paint,resize,renderer,scene,camera};
};

const T=window.THREE;
export function makeWorld(scene){
 const palettes={sand:0xe9d4a2,stone:0xc8cfc9,grass:0x99c96a,grassDark:0x578d58,red:0xe34435,cream:0xf1f1e8,navy:0x273942,wood:0xaa7350,darkWood:0x76503a,roof:0x3b7180,metal:0x405b61,glass:0x80c6d2,gold:0xfbd074};
 const mats={};for(const [k,c]of Object.entries(palettes))mats[k]=new T.MeshStandardMaterial({color:c,roughness:k==='metal'?.42:.85});
 const boxG=new T.BoxGeometry(1,1,1),sphereG=new T.SphereGeometry(1,10,8),cylG=new T.CylinderGeometry(1,1,1,12),coneG=new T.ConeGeometry(1,1,8);
 const batches=new Map(),colliders=[],cameraBlocks=[],ramps=[],floors=[],burnables=[],coins=[],trees=[],lamps=[];let roofGroup;
 function mat(c){if(mats[c])return mats[c];const key=String(c);return mats[key]??(mats[key]=new T.MeshStandardMaterial({color:c,roughness:.8}));}
 function shape(g,c,x,y,z,sx,sy,sz,rx=0,ry=0,rz=0,parent=null){const m=mat(c);if(parent){const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.scale.set(sx,sy,sz);mesh.rotation.set(rx,ry,rz);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}const key=g.uuid+m.uuid;if(!batches.has(key))batches.set(key,{g,m,items:[]});const o=new T.Object3D();o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.rotation.set(rx,ry,rz);o.updateMatrix();batches.get(key).items.push(o.matrix.clone());}
 const box=(x,y,z,w,h,d,c='cream',ry=0,parent=null)=>shape(boxG,c,x,y,z,w,h,d,0,ry,0,parent);
 const cyl=(x,y,z,r,h,c='wood',parent=null)=>shape(cylG,c,x,y,z,r,h,r,0,0,0,parent);
 const ball=(x,y,z,sx,sy,sz,c,parent=null)=>shape(sphereG,c,x,y,z,sx,sy,sz,0,0,0,parent);
 function solid(x,y,z,w,h,d,c='cream',parent=null){const mesh=box(x,y,z,w,h,d,c,0,parent);colliders.push({x,z,y:y-h/2,w,d,h,mesh,active:true});return mesh;}
 function floor(x,z,w,d,y){floors.push({x,z,w,d,y,active:true});}
 function text(txt,x,y,z,w,h,fg='#fff2d2',bg='#294755',ry=0,parent=null){const cv=document.createElement('canvas');cv.width=512;cv.height=128;let c=cv.getContext('2d');c.fillStyle=bg;c.fillRect(0,0,512,128);c.strokeStyle=fg;c.lineWidth=4;c.strokeRect(7,7,498,114);c.fillStyle=fg;c.font='bold 43px Trebuchet MS';c.textAlign='center';c.textBaseline='middle';c.fillText(txt,256,65,478);const texture=new T.CanvasTexture(cv);texture.anisotropy=4;const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:texture}));m.position.set(x,y,z);m.rotation.y=ry;(parent||scene).add(m);return m;}
 // Sculpted coastal shelf: a pale sand edge below a grassy playable plateau.
 box(0,-1.6,0,36,2.4,34,'stone');box(0,-.48,0,35.7,.36,33.7,'sand');box(0,-.19,-.8,33.5,.36,30.4,'grass');floor(0,0,36,34,0);
 for(let i=0;i<45;i++){const a=i/45*Math.PI*2,x=Math.cos(a)*18,z=Math.sin(a)*17;ball(x,-1.3,z,1.2+(i%3)*.2,1.5,1.1,i%2?'stone':0xa8b8aa);}
 // Walking paths, inset paving joints, raised curbs.
 box(0,.015,3,4,.09,25,'sand');box(0,.03,3,3.4,.1,25,'stone');box(-5,.02,2,13,.1,3.3,'stone');box(5,.02,-6,13,.1,3.2,'stone');
 for(let z=-8;z<16;z+=1.15)for(let x=-1;x<=1;x+=1){box(x*1.08,.088,z+(x%2)*.18,1,.035,1.03,((z*10+x)|0)%3?0xdce0ce:0xc2cbbb);}
 for(let z=-9;z<15;z+=1.1){box(-1.85,.12,z,.17,.2,1.04,'cream');box(1.85,.12,z,.17,.2,1.04,'cream');}
 // Lighthouse: eight-sided shell, side entrance and an exterior switchback stair.
 const tower=new T.Group();scene.add(tower);
 for(let i=0;i<8;i++){const a=i*Math.PI/4;const x=6+Math.sin(a)*2.35,z=-7+Math.cos(a)*2.35;if(i===0){solid(x-1.05,1.65,z,.7,3.3,.38,'cream');solid(x+1.05,1.65,z,.7,3.3,.38,'cream');box(x,3.1,z,2.6,.5,.4,'cream');colliders.push({x,z,y:2.85,w:2.6,d:.4,h:4.65,active:true});}else {const m=box(x,1.7,z,2,3.4,.38,'cream',a);colliders.push({x,z,y:0,w:2,d:.38,h:7.5,ry:a,active:true});}box(x,4.1,z,2,1.4,.38,'red',a);box(x,5.65,z,2,1.7,.38,'cream',a);box(x,7,z,2,1,.4,'red',a);}
 cyl(6,.12,-7,2.8,.25,'stone');cyl(6,7.6,-7,3.35,.32,'cream');floor(6,-7,6.5,6.5,7.76);floors[floors.length-1].radius=3.3;
 cyl(6,8.6,-7,1.6,1.7,'glass');colliders.push({x:6,z:-7,y:7.76,w:3.25,d:3.25,h:2.2,active:true});for(let i=0;i<8;i++){const a=i*Math.PI/4;box(6+Math.cos(a)*1.6,8.6,-7+Math.sin(a)*1.6,.16,2,.16,'navy');}
 shape(coneG,'red',6,10,-7,2.35,1.5,2.35);cyl(6,10.9,-7,.09,.9,'gold');ball(6,11.4,-7,.18,.18,.18,'gold');
 const beacon=new T.Group();beacon.position.set(6,8.7,-7);scene.add(beacon);box(0,0,0,.65,.7,.7,'gold',0,beacon);
 const beam=new T.Mesh(new T.ConeGeometry(2,18,16,1,true),new T.MeshBasicMaterial({color:0xffedb0,transparent:true,opacity:.055,side:T.DoubleSide,depthWrite:false}));beam.rotation.z=Math.PI/2;beam.position.x=9;beacon.add(beam);
 for(let i=1;i<20;i++){let a=i/20*Math.PI*2;box(6+Math.sin(a)*3.12,8.2,-7+Math.cos(a)*3.12,.09,.8,.09,'navy');}
 // two generously sized climbing flights, clear heights and matching collision treads.
 for(let i=0;i<16;i++){const y=(i+1)*.24,z=3-i*.58;box(10,y/2,z,2,y,.59,'stone');/* continuous flight below */box(11.04,y+.52,z,.075,1.05,.075,'navy');}
 box(11,3.72,-6.1,4.2,.24,2,'stone');floor(11,-6.1,4.2,2,3.84);
 for(let i=0;i<16;i++){const y=3.84+(i+1)*.245,z=-6.1+i*.42;box(12.1,y-.12,z,2,.24,.44,'cream');/* continuous flight below */box(13.15,y+.5,z,.075,1,.075,'navy');}
 ramps.push({x:10,w:2,z0:3.3,z1:-5.7,y0:.12,y1:3.84,base:0},{x:12.1,w:2,z0:-6.32,z1:.45,y0:3.96,y1:7.76,base:3.6});
 // Collision rails follow the slope and stop sideways falls during ordinary movement.
 for(const ramp of ramps)for(const side of [-1,1])for(let i=4;i<18;i++){const t=(i+.5)/24,z=ramp.z0+(ramp.z1-ramp.z0)*t,y=ramp.y0+(ramp.y1-ramp.y0)*t;const x=ramp.x+side*1.06;box(x,y+.78,z,.09,.09,Math.abs(ramp.z1-ramp.z0)/24+.04,'navy');colliders.push({x,z,y:y+.12,w:.09,d:Math.abs(ramp.z1-ramp.z0)/24+.03,h:.72,active:true});}
 // final walkway back to gallery.
 box(8.1,7.64,.2,6.4,.24,1.6,'cream');floor(8.1,.2,6.4,1.6,7.76);box(12.2,7.64,.7,1.8,.24,.6,'cream');floor(12.2,.7,1.8,.6,7.76);box(6,7.64,-1.9,2,.24,4.8,'cream');floor(6,-1.9,2,4.8,7.76);for(let x=5;x<=13;x++){box(x,8.25,1,.075,1,.075,'navy');box(x,8.72,1,1,.08,.08,'navy');}for(let x of [8.65,13.25])box(x,3.7,.2,.18,7.4,.18,'navy');
 for(const [x,z,ww,dd]of [[9,1,8.2,.08],[9,-.6,3.8,.08],[5,-2.4,.08,3.4],[7,-2.4,.08,3.4]]){box(x,8.58,z,ww,.08,dd,'navy');colliders.push({x,z,y:7.8,w:ww,d:dd,h:.8,active:true});}
 text('LIGHTHOUSE',6,3,-4.2,2,.48);
 for(const x of [5.62,6.38])box(x,3.95,-3.98,.07,7.9,.08,'metal');for(let y=.23;y<7.9;y+=.29)box(6,y,-3.98,.8,.055,.09,'metal');
 for(let i=0;i<20;i++){if(i===0||i===19)continue;const a=i/20*Math.PI*2,b=(i+1)/20*Math.PI*2,m=(a+b)/2;box(6+Math.sin(m)*3.12,8.58,-7+Math.cos(m)*3.12,1,.08,.08,'navy',m);colliders.push({x:6+Math.sin(m)*3.12,z:-7+Math.cos(m)*3.12,y:7.8,w:1,d:.08,h:.8,ry:m,active:true});}
 for(const z of [-10.5,-8,-5.5,-3,.2])box(13.25,Math.max(1,7.5-(z+.2)*.12)/2,z,.16,Math.max(1,7.5-(z+.2)*.12),.16,'navy');
 for(let z=-11;z<11;z+=3){box(-16,.48,z,.18,.95,.18,'cream');box(16,.48,z,.18,.95,.18,'cream');}

 // Internal furniture visible through doorway.
 box(6,.4,-7,1.6,.8,1.2,'wood');box(6,.85,-7,1.8,.13,1.3,'cream');cyl(5,1,-8,.28,.6,'gold');
 function cottage(x,z,w,d,col,label,burnAt){const g=new T.Group();g.position.set(x,0,z);scene.add(g);const parts=[];
 const piece=(px,py,pz,pw,ph,pd,c)=>{const m=box(px,py,pz,pw,ph,pd,c,0,g);parts.push({m,base:m.position.clone(),rot:m.rotation.clone()});return m;};
 piece(0,.17,0,w+.4,.34,d+.4,'stone');piece(-w/2,1.6,0,.24,2.9,d,col);piece(w/2,1.6,0,.24,2.9,d,col);piece(0,1.6,-d/2,w,2.9,.24,col);piece(-w*.32,1.6,d/2,w*.32,2.9,.24,col);piece(w*.32,1.6,d/2,w*.32,2.9,.24,col);piece(0,2.8,d/2,w,.5,.24,col);
 for(let side of [-1,1]){let r=piece(side*w*.25,3.55,0,w*.57,.22,d+.65,'roof');r.rotation.z=side*.4;for(let n=0;n<8;n++)piece(side*(.2+n*w/16),3.94-n*.12,0,.06,.08,d+.7,'navy');}
 piece(0,3.94,0,.2,.18,d+.8,'navy');piece(-w/2-.03,1.45,.1,.05,1.25,1.3,'glass');piece(w/2+.03,1.45,.1,.05,1.25,1.3,'glass');
 for(let xx of [-w*.32,w*.32]){piece(xx,1.6,d/2+.14,w*.2,1.2,.1,'cream');piece(xx,1.62,d/2+.21,w*.16,.9,.06,'glass');piece(xx,1.62,d/2+.25,.055,.9,.07,'navy');piece(xx,1.62,d/2+.25,w*.16,.055,.07,'navy');piece(xx,.85,d/2+.3,w*.25,.25,.45,'wood');for(let k=0;k<4;k++)ball(xx-.3+k*.2,1.03,d/2+.3,.13,.16,.13,'grassDark',g);}
 piece(-.65,1.1,d/2+.18,.09,2.2,.14,'cream');piece(.65,1.1,d/2+.18,.09,2.2,.14,'cream');piece(0,2.15,d/2+.18,1.4,.12,.14,'cream');
 const sign=text(label,0,2.95,d/2+.3,w*.75,.52,'#fff1cf','#294755',0,g);parts.push({m:sign,base:sign.position.clone(),rot:sign.rotation.clone()});
 piece(-w*.28,3.85,-d*.25,.55,1.5,.55,'cream');piece(-w*.28,4.62,-d*.25,.75,.12,.75,'stone');
 // Interior table, crates and a rug; the house is genuinely enterable.
 piece(0,.21,0,w*.55,.04,d*.5,0xd49a6a);piece(-w*.25,.9,-d*.15,1.1,.15,.9,'wood');piece(-w*.25,.45,-d*.15,.12,.9,.12,'darkWood');piece(w*.25,.5,-d*.27,.8,1,.8,'wood');
 const roofCollider={x,z,y:2.9,w:w+.5,d:d+.5,h:1.2,active:true};cameraBlocks.push(roofCollider);colliders.push(roofCollider);const cs=[roofCollider];for(const [dx,dz,cw,cd]of [[-w/2,0,.3,d],[w/2,0,.3,d],[0,-d/2,w,.3],[-w*.33,d/2,w*.34,.3],[w*.33,d/2,w*.34,.3]]){let c={x:x+dx,z:z+dz,y:0,w:cw,d:cd,h:2.9,active:true};colliders.push(c);cs.push(c);}
 for(const [dx,dz,cw,cd,ch] of [[-w*.25,-d*.15,1.1,.9,.98],[w*.25,-d*.27,.8,.8,1]]){const c={x:x+dx,z:z+dz,y:.34,w:cw,d:cd,h:ch-.34,active:true};colliders.push(c);cs.push(c);}floor(x,z,w,d,.34);let b={x,z,w,d,g,parts,colliders:cs,burnAt,collapsed:false,collapseT:0};for(const m of g.children)if(m.isMesh&&!parts.some(p=>p.m===m))parts.push({m,base:m.position.clone(),rot:m.rotation.clone()});const materialCopies=new Map();for(const p of parts){p.rot.copy(p.m.rotation);if(!materialCopies.has(p.m.material))materialCopies.set(p.m.material,p.m.material.clone());p.m.material=materialCopies.get(p.m.material);}burnables.push(b);return b;}
 cottage(-8,-4,5.5,5,0xe4ae77,'KEEPER’S HOUSE',21);cottage(-9,6,4.5,4.2,0x7bacb7,'COASTAL SUPPLIES',4);cottage(11,8,4,4,0xf1ce89,'BOATHOUSE',38);
 // Cottage chimneys / roofs have layered edge trim rather than featureless cubes.
 // Chimneys belong to each destructible cottage, so they fall with it.
 // Harbour railings, plank dock and bollards.
 box(0,-.12,20,4.5,.35,9,'darkWood');floor(0,20,4.5,9,.055);for(let z=16;z<24.5;z+=.42)box(0,.1,z,4.5,.14,.36,'wood');
 for(let z=16;z<25;z+=2){for(let s of [-1,1]){cyl(s*2.25,-.5,z,.17,2.3,'darkWood');ball(s*2.25,.72,z,.2,.12,.2,'cream');if(z<22)box(s*2.25,.55,z+1,.09,.1,2,'cream');}}
 text('RESCUE PIER',-6,1.8,14,2.4,.5);box(-7.3,.9,14,.13,1.8,.13,'wood');box(-4.7,.9,14,.13,1.8,.13,'wood');
 // Island perimeter fence.
 for(let i=-15;i<=15;i+=2.5){for(let z of [-14.5,14]){if(z===14&&Math.abs(i)<3)continue;box(i,.65,z,.15,1.3,.15,'cream');box(i+1.2,.9,z,2.35,.12,.12,'cream');box(i+1.2,.4,z,2.35,.12,.12,'cream');}}
 // Coastal flora and basalt boulders.
 function tree(x,z,s=1){solid(x,.9*s,z,.38,1.8*s,.38,'wood');for(let k=0;k<4;k++){const a=k*2.4;ball(x+Math.sin(a)*.45*s,(2+k*.22)*s,z+Math.cos(a)*.45*s,1.05*s,.85*s,1*s,k%2?'grassDark':0x6b9f5a);}box(x,.2,z,1,.35,1,'grassDark');}
 for(const [x,z,s]of [[-14,-10,1.2],[-12,-12,.9],[-3,-12,1.3],[12,-12,1.1],[15,-5,1],[-15,1,.85],[-14,10,1],[8,13,.8]])tree(x,z,s);
 for(let i=0;i<95;i++){const x=Math.sin(i*12.312)*15,z=Math.cos(i*8.73)*13;if(Math.abs(x)<3||Math.abs(x-6)<6&&z<4||Math.abs(x+8)<4&&z>-7&&z<10||x>8&&z>5)continue;box(x,.11,z,.06,.22,.06,'grassDark');if(i%3===0){ball(x,.27,z,.11,.09,.11,i%2?0xf9d899:0xf8efe0);}else shape(coneG,'grassDark',x,.2,z,.12,.4,.12);}
 for(let i=0;i<12;i++){const x=-15+((i*7)%30),z=-13+((i*11)%26);if(Math.abs(x)<4||x>1&&z<4)continue;ball(x,.3,z,.6,.45,.5,0x92a9a1);}
 // Lamps, benches, barrels, ropes and mooring details.
 for(const [x,z]of [[-2.7,9],[2.7,5],[-2.7,-5],[3,-11]]){cyl(x,1.3,z,.065,2.6,'navy');box(x,2.65,z,.43,.55,.43,'cream');box(x,2.95,z,.6,.13,.6,'navy');shape(coneG,'navy',x,3.1,z,.42,.3,.42);}
 for(let side of [-1,1]){let x=side*4,z=10;for(let k=0;k<3;k++)box(x,.65,z+k*.2,2,.1,.16,'wood');for(let a of [-.8,.8]){box(x+a,.3,z+.2,.12,.6,.5,'navy');box(x+a,1.1,z-.15,.1,.95,.1,'navy');}box(x,1.35,z-.15,2,.25,.1,'wood');}
 for(const [x,z]of [[-5,6],[-12,3],[13,10],[9,-3]]){colliders.push({x,z,y:0,w:.75,d:.75,h:1,active:true});cyl(x,.5,z,.4,1,'wood');cyl(x,.18,z,.42,.08,'navy');cyl(x,.8,z,.42,.08,'navy');}
 // A small flag ripples, the lighthouse beam rotates, gulls circle above.
 cyl(-3,2.5,12,.055,5,'cream');const flag=new T.Mesh(new T.PlaneGeometry(1.6,.8,8,2),new T.MeshStandardMaterial({color:0xe2644c,side:T.DoubleSide}));flag.position.set(-2.2,4.4,12);scene.add(flag);
 const boat=new T.Group();boat.position.set(0,-.15,30);scene.add(boat);box(0,0,0,3,.6,5.6,'cream',0,boat);box(0,-.25,0,2.6,.4,5,'red',0,boat);box(0,.45,-.4,2.4,.35,3,'wood',0,boat);box(0,1.15,-.9,2,1.2,1.8,'cream',0,boat);box(0,1.25,.02,1.5,.6,.04,'glass',0,boat);box(0,1.8,-.9,2.3,.16,2,'roof',0,boat);for(let s of [-1,1])for(let z of [-2,1.9])ball(s*1.4,.2,z,.18,.32,.3,'navy',boat);cyl(0,2.1,-1.6,.04,.7,'navy',boat);
 const exit=new T.Mesh(new T.RingGeometry(1.25,1.5,40),new T.MeshBasicMaterial({color:0x8affd0,side:T.DoubleSide,transparent:true,opacity:.8}));exit.rotation.x=-Math.PI/2;exit.position.set(0,.22,22);exit.visible=false;scene.add(exit);
 for(const [x,y,z]of [[0,.7,4],[3.8,.7,10],[-6,.8,-4],[10,2.4,-1.6],[12.1,6,-2.8],[6,8.5,-4.5],[13,.7,-9],[-12,.7,10]]){const g=new T.Group();g.position.set(x,y,z);const m=new T.Mesh(new T.CylinderGeometry(.25,.25,.09,20),new T.MeshStandardMaterial({color:0xffd267,metalness:.65,roughness:.3}));m.rotation.x=Math.PI/2;g.add(m);const star=new T.Mesh(new T.OctahedronGeometry(.12),mat('cream'));star.position.z=.07;g.add(star);scene.add(g);coins.push({g,x,y,z,taken:false});}
 // Sky islands, soft cloud clusters, transparent water surface with moving highlights.
 for(let i=0;i<17;i++){const a=i*2.4,r=80+i%3*20;ball(Math.sin(a)*r,18+i%4*3,Math.cos(a)*r,9,2.4,3.5,0xf3f1df);ball(Math.sin(a)*r+4,20+i%4*3,Math.cos(a)*r,5,3,3.6,0xf8f5e7);}
 const sea=new T.Mesh(new T.PlaneGeometry(600,600),new T.MeshStandardMaterial({color:0x3eabb9,roughness:.45,metalness:.18}));sea.rotation.x=-Math.PI/2;sea.position.y=-1.05;scene.add(sea);
 const ripples=new T.Group();scene.add(ripples);for(let i=0;i<95;i++){let x=Math.sin(i*4.34)*65,z=Math.cos(i*3.77)*65;if(Math.abs(x)<19&&Math.abs(z)<25)continue;box(x,-1.02,z,1+(i%4)*.6,.012,.055,0x9adbd7,0,ripples);}
 // Batches dramatically reduce mobile draw calls while preserving prop details.
 for(const {g,m,items}of batches.values()){const inst=new T.InstancedMesh(g,m,items.length);items.forEach((v,i)=>inst.setMatrixAt(i,v));inst.castShadow=true;inst.receiveShadow=true;scene.add(inst);}
 function rampAt(r,x,z){if(Math.abs(x-r.x)>r.w/2+.08||z<Math.min(r.z0,r.z1)||z>Math.max(r.z0,r.z1))return null;return r.y0+(r.y1-r.y0)*(z-r.z0)/(r.z1-r.z0);}
 function height(x,z,feet=0,maxStep=.32){let h=-20;for(const f of floors){if(f.active&&(f.radius?Math.hypot(x-f.x,z-f.z)<=f.radius:Math.abs(x-f.x)<=f.w/2+.035&&Math.abs(z-f.z)<=f.d/2+.035)&&f.y<=feet+maxStep)h=Math.max(h,f.y);}for(const r of ramps){const y=rampAt(r,x,z);if(y!==null&&y<=feet+maxStep)h=Math.max(h,y);}return h;}
 function overlaps(c,x,z,r){const a=c.ry||0,dx=x-c.x,dz=z-c.z,u=dx*Math.cos(a)-dz*Math.sin(a),v=dx*Math.sin(a)+dz*Math.cos(a);return Math.abs(u)<c.w/2+r&&Math.abs(v)<c.d/2+r;}
 const cameraCollision=[...new Set([...colliders,...cameraBlocks])];function blocked(x,z,y,r=.52,forCamera=false){for(const c of forCamera?cameraCollision:colliders){if(c.active&&(forCamera?y-r<c.y+c.h&&y+r>c.y:y+.12<c.y+c.h&&y+1.95>c.y)&&overlaps(c,x,z,r))return true;}if(forCamera){for(const ramp of ramps){if(Math.abs(x-ramp.x)>ramp.w/2+r)continue;const top=rampAt(ramp,ramp.x,z);if(top!==null&&y-r<top&&y+r>(ramp.base===0?0:top-.24))return true;}for(const f of floors){if(f.y>1&&y-r<f.y&&y+r>f.y-.25&&(f.radius?Math.hypot(x-f.x,z-f.z)<f.radius+r:Math.abs(x-f.x)<f.w/2+r&&Math.abs(z-f.z)<f.d/2+r))return true;}}if(!forCamera)for(const ramp of ramps){if(Math.abs(x-ramp.x)>ramp.w/2+r)continue;const top=rampAt(ramp,ramp.x,z);if(top!==null&&y+.52<top&&y+1.95>ramp.base)return true;}return false;}
 function recover(p){for(const r of ramps){const top=rampAt(r,r.x,p.z);if(top!==null&&p.y+.52<top&&p.y+1.95>r.base&&Math.abs(p.x-r.x)<r.w/2+.53)p.x=r.x+(p.x<r.x?-1:1)*(r.w/2+.54);}}
 function ceiling(x,z,feet,next){let result=next;for(const c of colliders){if(c.active&&overlaps(c,x,z,.35)&&feet+1.95<=c.y+.02&&next+1.95>=c.y)result=Math.min(result,c.y-1.95);}return result;}
 function reset(){for(let c of coins){c.taken=false;c.g.visible=true;}for(let b of burnables){if(b.rubble){b.g.remove(b.rubble);b.rubble.children.forEach(m=>m.dispose?.());b.rubble=null;}b.parts.forEach(p=>p.m.visible=true);b.collapsed=false;b.collapseT=0;for(let c of b.colliders)c.active=true;for(let p of b.parts){p.m.position.copy(p.base);p.m.rotation.copy(p.rot);if(p.baseColor)p.m.material.color.copy(p.baseColor);if(p.m.material.emissive)p.m.material.emissiveIntensity=0;}}exit.visible=false;boat.position.set(0,-.15,30);}
 return{box,ball,mat,text,colliders,floors,burnables,coins,beacon,boat,exit,flag,ripples,height,blocked,ceiling,recover,reset,scene};
}

// Original block-proportioned streetwear characters, with a separately damped visual rig.
export function character(scene,{shirt=0x26313d,hair=0x925026,skin=0xf0c69e,hat=false}={}){
 const T=window.THREE,g=new T.Group(),rig=new T.Group(),materials=new Map();g.add(rig);
 function material(c){if(!materials.has(c))materials.set(c,new T.MeshStandardMaterial({color:c,roughness:.78}));return materials.get(c);}
 function geo(w,h,d,r=.035){const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);const z=new T.ExtrudeGeometry(s,{depth:d-2*r,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:r*.4,bevelThickness:r,curveSegments:3});z.translate(0,0,-d/2+r);return z;}
 function part(parent,x,y,z,w,h,d,c,r=.035){const m=new T.Mesh(geo(w,h,d,r),material(c));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 const torso=part(rig,0,1.13,0,.72,.7,.39,shirt);part(rig,0,.83,0,.73,.09,.41,shirt);part(rig,0,1.43,.08,.28,.08,.27,skin);part(rig,0,1.36,-.14,.5,.24,.22,shirt,.06);
 for(let side of [-1,1])part(rig,side*.12,1.32,.218,.018,.19,.025,0xe6e9df,.006);
 part(rig,0,1.01,.219,.36,.16,.035,shirt,.015);part(rig,0,.94,.241,.29,.013,.01,0x49515b,.004);
 const head=new T.Group();head.position.y=1.72;head.scale.set(1.08,1.06,1.08);rig.add(head);part(head,0,0,0,.5,.48,.45,skin,.07);for(let side of [-1,1]){part(head,side*.252,-.015,-.015,.065,.13,.13,skin,.025);part(head,side*.1,.015,.234,.044,.067,.02,0x202832,.008);part(head,side*.1,.084,.235,.078,.016,.02,hair,.005);}
 const smile=new T.QuadraticBezierCurve3(new T.Vector3(-.1,-.105,.24),new T.Vector3(0,-.185,.26),new T.Vector3(.1,-.105,.24));head.add(new T.Mesh(new T.TubeGeometry(smile,10,.009,5,false),material(0x855a45)));
 part(head,0,.23,-.04,.53,.12,.44,hair,.06);part(head,0,.1,-.22,.51,.25,.08,hair,.025);
 for(let i=0;i<7;i++){const a=i*.65;const tuft=part(head,-.23+i*.075,.245+Math.sin(a)*.06,.12,.14,.18,.29,i%3?hair:0xab6936,.035);tuft.rotation.z=-.55+i*.08;tuft.rotation.x=.18+Math.sin(a)*.15;}
 for(let s of [-1,1]){const side=part(head,s*.235,.08,-.035,.08,.24,.32,hair,.03);side.rotation.z=s*.12;}
 if(hat){part(head,0,.31,-.02,.57,.15,.48,0xe8b846);part(head,0,.26,.2,.6,.05,.5,0xe8b846,.02);}
 const limbs=[],knees=[];for(let s of [-1,1]){
  const arm=new T.Group();arm.position.set(s*.49,1.4,0);rig.add(arm);part(arm,0,-.22,0,.25,.47,.3,shirt);part(arm,0,-.46,0,.255,.07,.31,0x3c4651);part(arm,0,-.57,.012,.235,.16,.28,skin);limbs.push(arm);
  const leg=new T.Group();leg.position.set(s*.195,.8,0);rig.add(leg);part(leg,0,-.18,0,.3,.37,.34,0x293c50);const knee=new T.Group();knee.position.y=-.35;leg.add(knee);part(knee,0,-.15,0,.285,.3,.33,0x293c50);part(knee,0,-.35,.05,.315,.16,.44,0xf0f0e6);part(knee,0,-.41,.05,.32,.045,.45,0x3c4c56,.015);part(knee,0,-.30,.185,.23,.025,.1,0xadb6b7,.008);limbs.push(leg);knees.push(knee);
 }
 const shadow=new T.Mesh(new T.CircleGeometry(.48,24),new T.MeshBasicMaterial({color:0x173c42,transparent:true,opacity:.17,depthWrite:false}));shadow.rotation.x=-Math.PI/2;scene.add(shadow);scene.add(g);
 let phase=0,blend=0,lastT=null;const approach=(a,b,k)=>a+(b-a)*k;
 return{g,rig,head,limbs,shadow,animate(t,speed,air=false,dt=null,vertical=0,landing=0,climbing=false){dt=dt??Math.min(.05,Math.max(0,lastT===null?1/60:t-lastT));lastT=t;blend=approach(blend,Math.min(1,speed),1-Math.exp(-dt*12));phase+=dt*(climbing?7:10)*Math.max(.12,blend);const swing=Math.sin(phase)*blend*.65,k=1-Math.exp(-dt*18);
 const poses=climbing?[-1.7+Math.sin(phase)*.45,Math.sin(phase)*.55,-1.7-Math.sin(phase)*.45,-Math.sin(phase)*.55]:air?[-.8-Math.min(.3,vertical*.04),.23,-.8-Math.min(.3,vertical*.04),-.28]:[swing,-swing,-swing,swing];limbs.forEach((m,i)=>m.rotation.x=approach(m.rotation.x,poses[i],k));knees.forEach((m,i)=>m.rotation.x=approach(m.rotation.x,climbing?-.5:air?-.4:Math.min(0,Math.sin(phase+(i?Math.PI:0)))*blend*.42,k));
 rig.position.y=air?0:Math.abs(Math.sin(phase))*blend*.035-landing*.07;rig.scale.y=1-landing*.055;rig.scale.x=1+landing*.025;rig.rotation.x=approach(rig.rotation.x,climbing?.1:air?-.04:blend*.07,k);head.rotation.z=Math.sin(t*1.8)*.015*(1-blend);shadow.position.set(g.position.x,Math.max(.025,g.position.y-.02),g.position.z);shadow.scale.setScalar(air?.72:1);}};
}

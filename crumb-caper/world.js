/* Original painted miniature city, articulated pigeon and comic reactions. */
window.CaperWorld=function(canvas){'use strict';const T=THREE,V=T.Vector3;T.ColorManagement.legacyMode=false;
const small=innerWidth<700||matchMedia('(pointer:coarse)').matches,reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
const renderer=new T.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,small?1.5:2));renderer.outputEncoding=T.sRGBEncoding;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.91;renderer.shadowMap.enabled=!small;renderer.shadowMap.type=T.PCFSoftShadowMap;
const scene=new T.Scene();scene.background=new T.Color('#ecdfd0');scene.fog=new T.Fog('#ecdfd0',55,125);const camera=new T.PerspectiveCamera(49,1,.1,170);scene.add(new T.HemisphereLight('#fff2d7','#8a9b91',.78));const sun=new T.DirectionalLight('#ffddb0',1.65);sun.position.set(-18,32,18);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-24,right:24,top:40,bottom:-22,near:1,far:95});sun.shadow.normalBias=.035;scene.add(sun);const fill=new T.DirectionalLight('#c9ebe0',.35);fill.position.set(20,10,-15);scene.add(fill);
let seed=311;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};const mats={},geo={};
function material(c,r=.75,metal=0){let k=c+r+','+metal;return mats[k]||(mats[k]=new T.MeshStandardMaterial({color:c,roughness:r,metalness:metal}));}
function mesh(g,c,x=0,y=0,z=0,p=scene){let m=new T.Mesh(g,typeof c==='string'?material(c):c);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;p.add(m);return m;}
function box(x,y,z,w,h,d,c,p=scene){let k='b'+[w,h,d];return mesh(geo[k]||(geo[k]=new T.BoxGeometry(w,h,d)),c,x,y,z,p);}
function sphere(x,y,z,sx,sy,sz,c,p=scene){let m=mesh(geo.sp||(geo.sp=new T.SphereGeometry(1,16,12)),c,x,y,z,p);m.scale.set(sx,sy,sz);return m;}
function cyl(x,y,z,rt,rb,h,c,p=scene,n=16){let k='cy'+[rt,rb,h,n];return mesh(geo[k]||(geo[k]=new T.CylinderGeometry(rt,rb,h,n)),c,x,y,z,p);}
function group(x=0,y=0,z=0,p=scene){let g=new T.Group();g.position.set(x,y,z);p.add(g);return g;}
function line(a,b,r,c,p=scene){let va=new V(...a),vb=new V(...b),d=vb.clone().sub(va),m=cyl(0,0,0,r,r,d.length(),c,p,6);m.position.copy(va.add(vb).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new V(0,1,0),d.normalize());return m;}
function roundGeo(w,h,d,r=.15){r=Math.min(r,w*.4,h*.4,d*.4);let k='r'+[w,h,d,r];if(geo[k])return geo[k];let s=new T.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);let g=new T.ExtrudeGeometry(s,{depth:d-2*r,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:r*.45,bevelThickness:r,curveSegments:3});g.translate(0,0,-d/2+r);return geo[k]=g;}
function rounded(x,y,z,w,h,d,c,p=scene,r=.15){return mesh(roundGeo(w,h,d,r),c,x,y,z,p);}
function texture(w,h,fn){let c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);let t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;return t;}
function sign(text,w,h,color='#30545b',bg='#f1ddb7'){let t=texture(512,128,(c,W,H)=>{c.fillStyle=bg;c.fillRect(0,0,W,H);c.strokeStyle=color;c.lineWidth=5;c.strokeRect(7,7,W-14,H-14);c.fillStyle=color;c.textAlign='center';c.textBaseline='middle';c.font='bold 57px Georgia';c.fillText(text,W/2,H/2+3,W-28);});return new T.MeshBasicMaterial({map:t});}
function label(p,x,y,z,w,h,text,color,bg){return mesh(new T.PlaneGeometry(w,h),sign(text,w,h,color,bg),x,y,z,p);}
function bake(parent,exceptions=[]){parent.updateMatrixWorld(true);const inv=parent.matrixWorld.clone().invert(),bins=new Map();for(let o of [...parent.children])if(o.isMesh&&!o.isInstancedMesh&&o.visible&&!exceptions.includes(o)&&o.geometry.attributes.normal){let a=bins.get(o.material)||[];a.push(o);bins.set(o.material,a);}for(let [mat,list] of bins)if(list.length>1){let arrays={position:[],normal:[],uv:[]};for(let o of list){let g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(inv.clone().multiply(o.matrixWorld));for(let k in arrays)if(g.attributes[k])arrays[k].push(g.attributes[k].array);parent.remove(o);g.dispose();}let g=new T.BufferGeometry();for(let k in arrays){let len=arrays[k].reduce((s,a)=>s+a.length,0),all=new Float32Array(len),offset=0;for(let a of arrays[k]){all.set(a,offset);offset+=a.length;}g.setAttribute(k,new T.BufferAttribute(all,k==='uv'?2:3));}g.computeBoundingSphere();let o=new T.Mesh(g,mat);o.castShadow=true;o.receiveShadow=true;parent.add(o);}}
function bakeCity(parent){
 parent.updateMatrixWorld(true);const inv=parent.matrixWorld.clone().invert(),list=[];
 parent.traverse(o=>{if(o.isMesh&&o.material.isMeshStandardMaterial&&!o.material.map)list.push(o);});
 const attributes={position:[],normal:[],color:[]};
 for(let o of list){let g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(inv.clone().multiply(o.matrixWorld));attributes.position.push(g.attributes.position.array);attributes.normal.push(g.attributes.normal.array);let colors=new Float32Array(g.attributes.position.count*3),c=o.material.color;for(let i=0;i<colors.length;i+=3){colors[i]=c.r;colors[i+1]=c.g;colors[i+2]=c.b;}attributes.color.push(colors);o.parent.remove(o);g.dispose();}
 const merged=new T.BufferGeometry();for(let k in attributes){let size=attributes[k].reduce((s,a)=>s+a.length,0),data=new Float32Array(size),offset=0;for(let a of attributes[k]){data.set(a,offset);offset+=a.length;}merged.setAttribute(k,new T.BufferAttribute(data,3));}merged.computeBoundingSphere();let m=new T.Mesh(merged,new T.MeshStandardMaterial({color:'#ffffff',roughness:.75,vertexColors:true}));m.castShadow=true;m.receiveShadow=true;parent.add(m);
}
// The tiled boulevard, building fronts and street props recycle as complete blocks.
let paving=texture(256,256,(c,w,h)=>{c.fillStyle='#d0bfa5';c.fillRect(0,0,w,h);for(let y=0;y<256;y+=32)for(let x=-32;x<256;x+=64){let xx=x+(y/32%2)*32;c.fillStyle=['#e2d0b2','#d9c6a7','#d5c4a9'][Math.floor(rnd()*3)];c.fillRect(xx+2,y+2,60,28);c.fillStyle='#f2dec3';c.fillRect(xx+3,y+2,58,2);}});paving.wrapS=paving.wrapT=T.RepeatWrapping;paving.repeat.set(2,10);let pavement=new T.MeshStandardMaterial({map:paving,color:'#e7d7bd',roughness:1});
const blocks=[],facades=['#edc5ad','#b6c9bc','#d5c3cc','#decba3','#a8c5c8','#e1afa1'];
function tree(p,x,z,size=1){let g=group(x,0,z,p);cyl(0,1.2,0,.13,.19,2.4,'#9c7557',g);sphere(0,2.6,0,1.3,1.45,1.1,'#779b75',g);sphere(-.6,2.9,.2,.9,1.1,.9,'#9ab08a',g);sphere(.65,2.7,-.1,.85,1,.9,'#81a27d',g);cyl(0,.28,0,.72,.62,.5,'#c39879',g);g.scale.setScalar(size);return g;}
for(let row=0;row<7;row++){
 let b=group(0,0,-row*22);blocks.push(b);
 box(0,-.18,0,22,.32,22,'#899d9a',b);box(0,.01,0,12.6,.06,22,'#92a4a0',b);
 for(let side of [-1,1]){
 box(side*8.2,.12,0,3.8,.3,22,pavement,b);box(side*6.4,.21,0,.2,.42,22,'#ead8bd',b);
 let x=side*14.5,h=7+(row%3)*1.6,col=facades[(row+(side>0?2:0))%6];
 rounded(x,h/2,0,8.8,h,20,col,b,.16);box(x,h+.18,0,9.2,.32,20.4,'#eaddc4',b);
 // Mansard roof, dormer windows, chimney pots and copper gutters.
 let roof=cyl(x,h+1.05,0,5.2,6.3,1.7,'#506a71',b,4);roof.scale.z=1.82;roof.rotation.y=Math.PI/4;
 for(let dz of [-6,0,6]){box(x-side*.4,h+1.48,dz,.7,1.7,.8,'#a68d7b',b);cyl(x-side*.4,h+2.4,dz,.18,.22,.3,'#866c60',b);}
 box(x-side*4.52,h+.25,0,.16,.2,20.3,'#74878a',b);
 let fx=x-side*4.45;
 for(let floor=0;floor<3;floor++)for(let j=0;j<5;j++){
 let z=-7.5+j*3.7,y=1.5+floor*2.1;if(y>h-.7)continue;
 box(fx,y,z,.1,1.6,1.5,'#f2dfbf',b);box(fx-side*.065,y,z,.08,1.28,1.22,'#446b76',b);
 box(fx-side*.13,y,z,.12,.08,1.2,'#cfdbc8',b);box(fx-side*.13,y,z,.12,1.28,.07,'#cfdbc8',b);
 box(fx-side*.22,y-.8,z,.45,.12,1.85,'#e2d4b8',b);
 if(floor===1&&j%2===0){box(fx-side*.38,y-.65,z,.55,.3,1.8,'#8c776c',b);for(let q=-.65;q<=.65;q+=.33)sphere(fx-side*.4,y-.4,z+q,.22,.2,.22,q<0?'#c58b91':'#98ae7e',b);}
 }
 // Front-facing cornices and readable storefront plaques.
 box(x,2.6,10.13,7.3,.34,.2,'#f5e6c9',b);label(b,x,2.6,10.26,5.6,.7,['CRUMB & CO','FLOWER CLUB','CAFE COCO','SUNDAY','POST OFFICE','GOOD MORNING','THE GARDEN'][row], '#42616a','#f1dcba');
 for(let k=-2.5;k<3;k+=2.5){rounded(x+k,1.25,10.1,1.7,2.1,.15,'#4b6c70',b,.15);box(x+k,1.2,10.22,.08,2,.05,'#d6c5a2',b);}
 for(let j=0;j<8;j++)box(fx-side*.95,2.65,-3.2+j*.8,2,.15,.79,j%2?'#f5e5c9':['#ca8c7a','#80aaa2','#b397ac'][row%3],b);
 for(let j of [-3.2,3.2])line([fx-side*1.8,0,j],[fx-side*1.8,2.6,j],.035,'#8b8d76',b);
 tree(b,side*9.1,7.4,.77);tree(b,side*9.3,-7.2,.7);
 // Benches and a lamp sit outside the protected flight corridor.
 for(let z of [-4.8]){for(let q=0;q<4;q++)box(side*8.8,.65,z+q*.14,.9,.07,.12,'#b48b6b',b);for(let d of [-.1,.52])box(side*8.8,.32,z+d,.7,.64,.08,'#657d78',b);}
 cyl(side*9.85,1.9,2,.045,.08,3.8,'#526d6d',b);sphere(side*9.85,4,2,.24,.35,.24,'#ffefc2',b);cyl(side*9.85,4.4,2,.05,.3,.27,'#526d6d',b);
 }
 for(let z=-9;z<=9;z+=4)box(0,.052,z,.12,.015,1.6,'#e2ddc3',b);
 if(row%2===0)for(let x=-5.7;x<6;x+=1.1)box(x,.06,9,.6,.025,2,'#f5e6cc',b);
 if(row%3===0){for(let j=0;j<10;j++){let x=-9+j*2,y=5.8-Math.sin(j/9*Math.PI)*.9;line([x,y,-8],[x+2,5.8-Math.sin((j+1)/9*Math.PI)*.9,-8],.013,'#b39785',b);let bulb=sphere(x,y-.1,-8,.08,.1,.08,'#ffe3ad',b);}}
 bakeCity(b);
}
// Original vinyl pigeon, with layered flight feathers, iridescent collar and soft face.
const bird=group(0,5.2,4);const bodyMat=material('#7d929e',.72),wingMat=material('#586f86',.73);sphere(0,0,0,.55,.53,.88,bodyMat,bird);sphere(0,.24,-.62,.36,.5,.39,'#335f63',bird);sphere(0,.7,-.74,.37,.36,.37,'#698897',bird);
for(let side of [-1,1]){sphere(side*.29,.76,-.89,.12,.13,.08,'#fff5d9',bird);sphere(side*.32,.76,-.93,.06,.075,.04,'#293c44',bird);sphere(side*.335,.79,-.947,.019,.024,.018,'#ffffff',bird);sphere(side*.18,.48,-.86,.14,.08,.05,'#baaaa8',bird);}
let beak=mesh(new T.ConeGeometry(.14,.36,12),material('#e7bc8e'),0,.65,-1.12,bird);beak.rotation.x=-Math.PI/2;sphere(0,.7,-1.01,.13,.08,.15,'#e3d7c4',bird);
let tail=group(0,-.05,.7,bird);for(let i=0;i<5;i++){let f=sphere((i-2)*.13,0,.32,.12,.08,.53,i%2?'#6b7f8b':'#94a7af',tail);f.rotation.y=(i-2)*.1;}
const wings=[];for(let side of [-1,1]){let w=group(side*.37,.15,.05,bird);sphere(side*.48,0,.03,.64,.12,.46,wingMat,w);for(let i=0;i<6;i++){let f=sphere(side*(.74+i*.1),-.04,.15+i*.12,.13,.08,.43,i%2?'#80959e':'#9aadb2',w);f.rotation.y=side*(-.35+i*.08);}wings.push(w);}
for(let side of [-1,1]){line([side*.18,-.3,.38],[side*.18,-.58,.48],.035,'#d49c91',bird);for(let k=-1;k<=1;k++)line([side*.18,-.58,.48],[side*.18+k*.085,-.6,.32],.025,'#d49c91',bird);}
const hatGroups=[];for(let i=0;i<4;i++){let h=group(0,1.03,-.71,bird);hatGroups.push(h);if(i===1){sphere(0,0,0,.4,.09,.34,'#cf8a80',h);sphere(.19,.05,-.07,.16,.07,.17,'#cf8a80',h);}if(i===2){cyl(0,0,0,.38,.38,.06,'#d9b56f',h);cyl(0,.15,0,.22,.25,.25,'#f0d79d',h);cyl(0,.08,0,.25,.25,.06,'#697c73',h);}if(i===3){cyl(0,0,0,.27,.32,.1,'#debc73',h);for(let k=0;k<5;k++){let c=mesh(new T.ConeGeometry(.1,.25,4),material('#eccc82'),Math.sin(k/5*6.28)*.24,.17,Math.cos(k/5*6.28)*.24,h);}}h.visible=false;}
function hat(i){hatGroups.forEach((g,j)=>g.visible=j===i);}
const shadow=mesh(new T.CircleGeometry(.7,32),new T.MeshBasicMaterial({color:'#4d6d68',transparent:true,opacity:.2,depthWrite:false}),0,.08,4);shadow.rotation.x=-Math.PI/2;
// Traffic and pedestrian kits are built once, then updated from the same model entities.
const kits=[];const tones=['#edbd6f','#9bb8b3','#cf9a8e','#9babbe','#cbafbc','#ced09f'];
function car(e){let g=group(),body=group(0,0,0,g);rounded(0,.61,0,1.55,.63,3.0,tones[e.color],body,.22);rounded(0,1.02,-.12,1.28,.65,1.6,tones[e.color],body,.18);rounded(0,1.12,-.12,1.3,.43,1.63,'#496f79',body,.13);box(0,1.31,-.12,1.12,.09,1.1,tones[e.color],body);box(0,.5,-1.55,1.23,.08,.08,'#ebe3c8',body);for(let x of [-.53,.53]){sphere(x,.7,-1.5,.18,.11,.08,'#fff0c0',body);sphere(x,.66,1.5,.15,.08,.05,'#cd7b6c',body);}const wheels=[];for(let x of [-.76,.76])for(let z of [-.91,.91]){let w=cyl(x,.36,z,.3,.3,.19,'#3d5357',body,12);w.rotation.z=Math.PI/2;wheels.push(w);let cap=cyl(x*1.1,.36,z,.15,.15,.2,'#c5cfc1',body,12);cap.rotation.z=Math.PI/2;}bake(body);return{g,body,wheels};}
function person(e){let g=group(),body=group(0,0,0,g),legs=[];for(let side of [-1,1]){let l=group(side*.12,.53,0,body);cyl(0,-.2,0,.09,.08,.56,'#566d76',l);rounded(0,-.47,-.07,.18,.14,.34,'#4b6065',l,.06);legs.push(l);}sphere(0,.92,0,.3,.43,.21,tones[e.color],body);cyl(0,1.3,0,.09,.1,.12,'#e3b69a',body);sphere(0,1.55,0,.23,.27,.22,'#ecc6a2',body);sphere(0,1.69,.025,.24,.17,.22,'#877366',body);cyl(0,1.78,0,.3,.3,.05,'#dec695',body);cyl(0,1.86,0,.18,.2,.13,'#ecd8b0',body);let arms=[];for(let side of [-1,1]){let a=group(side*.3,1.15,0,body);cyl(0,-.2,0,.075,.085,.5,tones[e.color],a);sphere(0,-.48,0,.08,.1,.08,'#ecc6a2',a);arms.push(a);}return{g,body,legs,arms};}
function umbrella(e){let g=group(),body=group(0,0,0,g);cyl(0,1.16,0,.035,.055,2.3,'#9d8772',body);cyl(0,.75,0,.82,.82,.1,'#dabfa1',body);let cap=group(0,2.3,0,body);for(let i=0;i<8;i++){let m=mesh(new T.SphereGeometry(1,5,6,i*Math.PI/4,Math.PI/4,0,Math.PI/2),material(i%2?'#f5e2bd':tones[e.color]),0,0,0,cap);m.scale.set(1.5,.4,1.5);}cyl(0,2.67,0,.05,.06,.08,'#e2c7a1',body);bake(cap);return{g,body,cap};}
function cart(e){let g=group(),body=group(0,0,0,g);rounded(0,.75,0,1.65,1,1.5,'#b6ba91',body);for(let x of [-.84,.84]){let w=cyl(x,.35,0,.33,.33,.15,'#596f70',body);w.rotation.z=Math.PI/2;}for(let x of [-.7,.7])for(let z of [-.6,.6])line([x,.9,z],[x,1.9,z],.035,'#9f8e75',body);for(let i=0;i<6;i++)box(-.68+i*.27,1.95,0,.26,.16,1.8,i%2?'#f3e3be':'#bd8b7e',body);for(let i=0;i<8;i++)sphere((i%4-.5)*.3-.3,1.32,(i<4?-.3:.3),.16,.12,.12,'#d7a969',body);bake(body);return{g,body};}
const stampMat=new T.MeshBasicMaterial({color:'#fff6da',side:T.DoubleSide,transparent:true,opacity:.93,depthWrite:false});
function stamp(parent,size=.5){let g=group(0,0,0,parent);let m=mesh(new T.CircleGeometry(size,16),stampMat,0,0,0,g);m.rotation.x=-Math.PI/2;for(let k=0;k<5;k++){let a=k/5*Math.PI*2,r=size*.85,m=mesh(new T.CircleGeometry(size*.25,10),stampMat,Math.sin(a)*r,.004,Math.cos(a)*r,g);m.rotation.x=-Math.PI/2;}bake(g);return g;}
const drops=[],fx=[],stamps=[];for(let i=0;i<32;i++){let m=sphere(0,0,0,.1,.18,.1,'#fff5dd');m.visible=false;drops.push(m);}for(let i=0;i<60;i++){let m=rounded(0,0,0,.05,.04,.16,i%2?'#fff5d5':'#ead0a0',scene,.02);m.visible=false;fx.push({m,life:0,x:0,z:0,y:0,vx:0,vy:0,vz:0});}for(let i=0;i<45;i++){let s=stamp(scene,.25+rnd()*.15);s.visible=false;stamps.push({g:s,x:0,z:0,y:.08,age:0});}
const reticle=group();const aimMat=new T.MeshBasicMaterial({color:'#e9bf69',transparent:true,opacity:.8,side:T.DoubleSide});let circle=mesh(new T.TorusGeometry(.65,.045,6,40),aimMat,0,0,0,reticle);circle.rotation.x=-Math.PI/2;const arrow=mesh(new T.ConeGeometry(.17,.34,3),aimMat,0,.45,0,reticle);arrow.rotation.z=Math.PI;
let targetMeshes=new Map(),stampI=0,fxI=0,shock=0,cam=new V(8,15,21),look=new V(0,1,-9),time=0;
function reset(model){
 const previous=kits.splice(0);targetMeshes.clear();
 for(let i=0;i<model.entities.length;i++){
  const e=model.entities[i];let k=previous[i];
  if(k&&k.kind!==e.kind){scene.remove(k.g);k.g.traverse(o=>{if(o.isMesh&&!Object.values(geo).includes(o.geometry))o.geometry.dispose();});k=null;}
  if(!k){k=({car,person,umbrella,cart}[e.kind])(e);k.kind=e.kind;k.mark=stamp(k.body,e.kind==='person'?.23:.5);scene.add(k.g);}
  k.e=e;k.g.name='target-'+e.kind;k.mark.name='splat-marker';k.mark.position.y=e.y+.018;k.mark.visible=false;k.body.rotation.set(0,0,0);k.body.position.y=0;if(k.cap)k.cap.rotation.set(0,0,0);if(k.legs)k.legs.forEach(l=>l.rotation.set(0,0,0));if(k.arms)k.arms.forEach(a=>a.rotation.set(0,0,0));kits.push(k);targetMeshes.set(e.id,k);
 }
 for(let p of fx){p.life=0;p.m.visible=false;}for(let s of stamps)s.g.visible=false;drops.forEach(d=>d.visible=false);
}
function event(e,model){if(e.type==='drop'){bird.scale.set(.98,.96,1.03);}if(e.type==='special')shock=.7;if(e.type==='hit'||e.type==='splat'){
 if(e.type==='splat'){let s=stamps[stampI++%stamps.length];Object.assign(s,{x:e.x,z:e.z,y:e.y+.006,age:0});s.g.visible=true;}
 for(let i=0;i<(e.type==='hit'?18:6);i++){let f=fx[fxI++%fx.length];Object.assign(f,{x:e.x,z:e.z,y:e.y,vx:(rnd()-.5)*4,vy:1+rnd()*3,vz:(rnd()-.5)*4,life:.5+rnd()*.5});f.m.visible=true;}
 if(e.type==='hit')shock=Math.max(shock,.08);
 }}
function theme(level){let colors=['#ecdfd0','#e4decc','#dedce3','#eee0ca','#f0d6bc','#d8dce2'];scene.fog.color.set(colors[level]);scene.background.set(colors[level]);sun.color.set(['#ffddb0','#ffe6bd','#fce0ce','#ffe1ac','#ffd29d','#d8dfed'][level]);}
function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.fov=innerWidth<innerHeight?55:48;camera.updateProjectionMatrix();}resize();window.addEventListener('resize',resize);
function render(model,dt=1/60,active=true){const p=model.p;time=model.t;
 for(let i=0;i<blocks.length;i++)blocks[i].position.z=(((-i*22-p.z)+132)%154+154)%154-110;
 bird.position.set(p.x,p.y+.06*Math.sin(time*5),4);bird.rotation.set(-p.vy*.025,p.vx*.025,-p.vx*.045);bird.scale.lerp(new V(1,1,1),.2);
 wings[0].rotation.z=Math.sin(time*8)*.48;wings[1].rotation.z=-Math.sin(time*8)*.48;tail.rotation.x=Math.sin(time*8-.6)*.08;
 for(let k of kits){let e=k.e;if(!e)continue;let z=e.z-p.z+4;k.g.visible=z<25&&z>-90;k.g.position.set(e.x,0,z);k.g.rotation.y=e.kind==='car'?(e.vz>0?Math.PI:0):0;let react=e.react>0?Math.min(1,e.react):0;
 k.body.rotation.z=e.hit&&!reduced?Math.sin(e.react*20)*react*.13:0;k.body.position.y=e.hit&&!reduced?Math.abs(Math.sin(e.react*10))*react*.15:0;k.mark.visible=e.hit;
 if(k.legs)k.legs.forEach((l,i)=>l.rotation.x=Math.sin(time*(e.hit?16:4)+i*Math.PI)*(e.hit?.6:.18));if(k.arms)k.arms.forEach((a,i)=>a.rotation.z=e.hit?(i?-.9:.9)*react:0);if(k.cap)k.cap.rotation.z=e.hit?Math.sin(e.react*12)*react*.35:0;
 }
 model.drops.forEach((d,i)=>{if(i>=drops.length)return;let m=drops[i];m.visible=true;m.position.set(d.x,d.y,d.z-p.z+4);let size=d.superShot?1.6:1;m.scale.set(.1*size,.18*size,.1*size);});for(let i=model.drops.length;i<drops.length;i++)drops[i].visible=false;
 for(let f of fx)if(f.life>0){if(active){f.life-=dt;f.x+=f.vx*dt;f.z+=f.vz*dt;f.y+=f.vy*dt;f.vy-=5*dt;}f.m.position.set(f.x,f.y,f.z-p.z+4);f.m.scale.setScalar(Math.min(1,Math.max(0,f.life)*4));f.m.visible=f.life>0&&f.y>.05;}
 for(let s of stamps)if(s.g.visible){s.g.position.set(s.x,s.y,s.z-p.z+4);s.age+=active?dt:0;if(s.z-p.z>25||s.age>18)s.g.visible=false;}
 const pr=model.predict();reticle.position.set(pr.x,pr.y+.035,pr.z-p.z+4);aimMat.color.set(pr.target?'#d9a84c':'#f5e6c4');circle.scale.setScalar(pr.target?1:.65);arrow.visible=!!pr.target;arrow.position.y=.5+Math.sin(time*5)*.12;
 shadow.visible=small;shadow.position.set(p.x,.09,4);shadow.scale.set(1.2,1.2,1.2);
 let portrait=innerWidth<innerHeight,desired=new V(p.x*.42+(portrait?0:7),portrait?18:15,portrait?29:22),to=new V(p.x*.35,portrait?1.2:1,-9);
 if(active){cam.lerp(desired,1-Math.exp(-dt*3));look.lerp(to,1-Math.exp(-dt*4));shock=Math.max(0,shock-dt*1.3);}camera.position.copy(cam);if(shock>0&&!reduced)camera.position.y+=Math.sin(time*90)*Math.min(.1,shock);camera.lookAt(look);renderer.render(scene,camera);
}
return{reset,render,event,theme,hat,resize,renderer,scene,camera,bird};
};




import * as P from './primitives.mjs';
const T=window.THREE;export const FLOOR=.03;
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z),G=()=>new T.Group();
const MAT=new T.MeshStandardMaterial({vertexColors:true,roughness:.76,metalness:.07});
export const PEOPLE=[
 {skin:'#c58c68',hair:'#302a27',shirt:'#e77d51',pants:'#294b68',name:'Ari'},
 {skin:'#edbb96',hair:'#743e29',shirt:'#5d9b89',pants:'#3e4561',name:'June'},
 {skin:'#dca580',hair:'#c7c3ad',shirt:'#e4b95f',pants:'#405f74',name:'Otis'},
 {skin:'#965f4d',hair:'#25282c',shirt:'#528cbe',pants:'#354b58',name:'Noor'},
 {skin:'#e8ae80',hair:'#2f3940',shirt:'#b96c54',pants:'#374e68',name:'Milo'},
 {skin:'#d39a7a',hair:'#b18f59',shirt:'#8d8bb0',pants:'#385b5b',name:'Bea'}
];
export function bake(root,skip=new Set()){root.updateWorldMatrix(true,true);let inv=root.matrixWorld.clone().invert(),list=[],old=[];
 root.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||o.userData.ownMaterial)return;for(let p=o;p&&p!==root;p=p.parent)if(skip.has(p))return;let g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(new T.Matrix4().multiplyMatrices(inv,o.matrixWorld));let c=o.material.color||new T.Color('#fff'),a=new Float32Array(g.attributes.position.count*3);for(let i=0;i<a.length;i+=3){a[i]=c.r;a[i+1]=c.g;a[i+2]=c.b;}g.setAttribute('color',new T.BufferAttribute(a,3));list.push(g);old.push(o);});
 if(!list.length)return;let n=list.reduce((n,g)=>n+g.attributes.position.count,0),geo=new T.BufferGeometry();for(let key of ['position','normal','color']){let a=new Float32Array(n*3),offset=0;for(let g of list){a.set(g.attributes[key].array,offset);offset+=g.attributes[key].array.length;}geo.setAttribute(key,new T.BufferAttribute(a,3));}geo.computeBoundingSphere();for(let o of old){o.parent.remove(o);if(o.userData.ownGeometry)o.geometry.dispose();}for(let g of list)g.dispose();let mesh=new T.Mesh(geo,MAT);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.ownGeometry=true;root.add(mesh);return mesh;}
function lathe(parent,profile,color,x,y,z,sy=1,sx=1,sz=1){let g=new T.LatheGeometry(profile.map(p=>new T.Vector2(p[0],p[1])),28),m=new T.Mesh(g,P.material(color));m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=m.receiveShadow=true;m.userData.ownGeometry=true;parent.add(m);return m;}
function part(parent,x=0,y=0,z=0){let g=G();g.position.set(x,y,z);parent.add(g);return g;}
function seg(o,a,b,r,r2=r){let d=V().subVectors(b,a);o.position.copy(a).add(b).multiplyScalar(.5);o.quaternion.setFromUnitVectors(V(0,1,0),d.clone().normalize());o.scale.set(r,d.length(),r2);}
function chain(a,b,l1,l2){let d=b.clone().sub(a),length=Math.min(l1+l2-.00001,Math.max(.00001,d.length()));d.normalize();let along=(length*length+l1*l1-l2*l2)/(2*length),h=Math.sqrt(Math.max(0,l1*l1-along*along)),bend=V(0,0,1).addScaledVector(d,-d.z).normalize();return a.clone().addScaledVector(d,along).addScaledVector(bend,h);}
function limb(parent,color){return P.cylinder(parent,1,1,color,0,0,0,1,false,12);}
export function actor(kind=0){let root=G(),p=PEOPLE[kind%6],rig={kind,p,arms:[],legs:[],eyes:[],brows:[],spots:[],points:[]};root.userData.rig=rig;
 let hips=part(root,0,1.12,0);P.sphere(hips,.30,p.pants,0,0,.09,1.04,.62,1.1);bake(hips);rig.hips=hips;
 let body=part(root,0,1.22,0);lathe(body,[[0,0],[.28,0],[.34,.13],[.35,.48],[.44,.63],[.38,.74],[.18,.81],[0,.81]],p.shirt,0,0,0,1,1,.73);
 P.tube(body,[[-.15,.78,.12],[0,.69,.29],[.15,.78,.12]],.024,'#f4e7ce');
 P.block(body,.13,.20,.018,'#eadbc2',.21,.52,.268,.015);P.block(body,.08,.012,.025,p.shirt,.21,.56,.28,.005);
 for(let s of [-1,1])P.tube(body,[[s*.18,.15,.23],[s*.23,.28,.26],[s*.25,.42,.25]],.008,p.pants);
 P.cylinder(body,.13,.24,p.skin,0,.86,0,.12,false,18);bake(body);rig.body=body;
 let head=part(body,0,1.00,0);lathe(head,[[0,-.12],[.13,-.10],[.23,-.03],[.29,.13],[.30,.34],[.25,.49],[.12,.54],[0,.55]],p.skin,0,0,0,1,1,.90);
 for(let s of [-1,1]){P.sphere(head,.068,p.skin,s*.29,.19,-.005,.65,1,.7);P.sphere(head,.031,'#b37560',s*.318,.19,.012,.45,1,.5);P.sphere(head,.055,'#fff2da',s*.119,.23,.25,1.02,.65,.38);P.sphere(head,.027,'#373c3c',s*.119,.226,.270,.65,1,.35);P.sphere(head,.008,'#ffffff',s*.112,.235,.281,.8,.8,.4);}
 P.sphere(head,.055,p.skin,0,.15,.28,.64,.9,.9);P.sphere(head,.04,'#ad7259',0,.132,.303,.85,.2,.5);
 P.tube(head,[[-.07,.057,.255],[0,.035,.278],[.07,.057,.255]],.014,'#785448');P.sphere(head,.025,'#edc8a3',0,-.015,.23,1.6,.3,.5);
 lathe(head,[[0,.31],[.30,.33],[.31,.47],[.25,.58],[.08,.62],[0,.62]],p.hair,0,0,-.035,1,1,.94);
 if(kind===0||kind===3){for(let i=0;i<11;i++){let a=i/11*Math.PI*2;P.sphere(head,.09,p.hair,Math.cos(a)*.245,.51+Math.sin(i*2)*.035,Math.sin(a)*.22,.9,.9,.85);}}
 if(kind===1||kind===5){P.sphere(head,.15,p.hair,0,.49,-.26,1,.85,.9);for(let s of [-1,1])P.sphere(head,.10,p.hair,s*.26,.34,.045,.6,1.65,.75);}
 if(kind===2){P.tube(head,[[-.065,.1,.267],[0,.11,.295],[.065,.1,.267]],.035,p.hair);}
 if(kind===4){for(let i=0;i<4;i++){let tuft=P.sphere(head,.11,p.hair,-.16+i*.09,.56+i*.015,.12,.7,.9,.9);tuft.rotation.z=-.3;}}
 // Separate eyelids and brows; never scale the head or inflate the face to emote.
 bake(head);rig.head=head;
 for(let s of [-1,1]){let lid=part(head,s*.119,.232,.282);P.block(lid,.111,.044,.012,p.skin,0,0,0,.012);bake(lid);rig.eyes.push(lid);let brow=part(head,s*.119,.32,.263);P.block(brow,.105,.026,.024,p.hair,0,0,0,.008);bake(brow);rig.brows.push(brow);}
 if(kind===2||kind===4){let glasses=part(head);for(let s of [-1,1]){let tor=new T.Mesh(new T.TorusGeometry(.079,.009,5,18),P.material('#374c56'));tor.position.set(s*.12,.235,.282);tor.scale.y=.75;tor.userData.ownGeometry=true;glasses.add(tor);}P.block(glasses,.085,.012,.018,'#374c56',0,.24,.29,.004);bake(glasses);}
 let band=part(head,0,.414,.10);P.tube(band,[[-.285,0,-.08],[-.25,0,.10],[0,0,.18],[.25,0,.10],[.285,0,-.08]],.033,'#f0dfb9');bake(band);rig.band=band;
 for(let s of [-1,1]){let upper=limb(root,p.shirt),lower=limb(root,p.skin),elbow=P.sphere(root,.092,p.skin),hand=part(root);P.sphere(hand,.10,p.skin,0,0,0,.80,.6,1.15);for(let j=0;j<4;j++)P.sphere(hand,.025,p.skin,-.055+j*.035,0,.08,.55,.60,1.9);P.sphere(hand,.033,p.skin,s*.075,0,.02,.8,.7,1.3);bake(hand);rig.arms.push({s,upper,lower,elbow,hand});
 let thigh=limb(root,p.pants),shin=limb(root,p.pants),knee=P.sphere(root,.13,p.pants),shoe=part(root,s*.36,.16,.82);P.block(shoe,.27,.22,.46,'#e9dcc2',0,0,0,.015);P.block(shoe,.28,.035,.48,'#c3baab',0,-.104,0,.015);for(let j=0;j<3;j++)P.block(shoe,.16,.012,.015,'#617785',0,.11,-.02+j*.06,.004);bake(shoe);rig.legs.push({s,thigh,shin,knee,shoe});}
 let shadow=new T.Mesh(new T.CircleGeometry(.78,32),new T.MeshBasicMaterial({color:'#234c59',transparent:true,opacity:.13,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.set(0,FLOOR+.005,.4);shadow.userData.ownMaterial=shadow.userData.ownGeometry=true;root.add(shadow);
 pose(root,0,1,null);return root;}
export function pose(root,t,stress=1,knead=null){let r=root.userData.rig,breath=Math.sin(t*1.6)*.006,relax=1-stress,press=knead?.held?(.5+.5*Math.sin(knead.angle*2))*.02:0;r.body.position.y=1.22-relax*.055+breath;r.body.rotation.z=Math.sin(t*.7)*.012*(1-relax*.6);r.head.rotation.x=.13*stress-.05*relax;r.head.rotation.z=Math.sin(t*.5)*.018;
 for(let i=0;i<2;i++){let e=r.eyes[i];e.scale.y=1;e.position.y=.232;let closed=relax>.7?.8:(Math.sin(t*1.21+1)> .992?1:0);e.scale.y=Math.max(.06,closed);e.visible=closed>.06;r.brows[i].rotation.z=(i?1:-1)*(.18*stress-.1*relax);}
 root.updateWorldMatrix(true,true);r.points=[];
 for(let a of r.arms){let sh=V(a.s*.43,.71,0);r.body.localToWorld(sh);root.worldToLocal(sh);if(knead?.spot===(a.s<0?0:1))sh.y-=press;let wr=V(a.s*.65,1.52,.63),el=chain(sh,wr,.44,.42);seg(a.upper,sh,el,.115);seg(a.lower,el,wr,.082);a.elbow.position.copy(el);a.hand.position.copy(wr);a.hand.rotation.x=-.12;a.hand.rotation.z=-a.s*.12;r.points.push({shoulder:sh,elbow:el,wrist:wr});}
 for(let a of r.legs){let hip=V(a.s*.21,1.12,.08),ankle=V(a.s*.36,.25,.75),kn=chain(hip,ankle,.51,.50);seg(a.thigh,hip,kn,.14);seg(a.shin,kn,ankle,.11);a.knee.position.copy(kn);}
 r.spots=[r.points[0].shoulder.clone().add(V(0,.015,.16)),r.points[1].shoulder.clone().add(V(0,.015,.16)),r.points[0].elbow.clone().lerp(r.points[0].wrist,.53).add(V(0,.03,.09)),r.points[1].elbow.clone().lerp(r.points[1].wrist,.53).add(V(0,.03,.09))];root.updateWorldMatrix(true,true);
}
export function spot(root,index){return root.localToWorld(root.userData.rig.spots[index].clone());}
export function roller(kit=0,gold=false){let root=G(),ink=gold?'#c3a35b':'#3c6691';P.block(root,.32,.14,.16,'#e3e8d8',0,0,.08,.025);P.block(root,.12,.17,.10,ink,0,.1,.12,.02);let balls=[];for(let s of kit===2?[-1,1]:[0]){let g=part(root,s*.10,-.025,-.018);let c=P.cylinder(g,.09,kit===1?.42:.32,ink,0,0,0,.09,false,18);c.rotation.z=Math.PI/2;for(let x of [-.12,.12]){let stripe=P.cylinder(g,.092,.016,'#e9d6a6',x,0,0,.092,false,18);stripe.rotation.z=Math.PI/2;}bake(g);balls.push(g);}bake(root,new Set(balls));root.userData.rolls=balls;return root;}
function arch(parent,x,y,z,w,h,color){let s=new T.Shape();s.moveTo(-w/2,0);s.lineTo(-w/2,h-w/2);s.absarc(0,h-w/2,w/2,Math.PI,0,true);s.lineTo(w/2,0);s.closePath();let o=new T.Mesh(new T.ShapeGeometry(s),P.material(color));o.position.set(x,y,z);o.userData.ownGeometry=true;parent.add(o);return o;}
function plant(root,x,z,h=1){P.cylinder(root,.18,.36,'#d18c63',x,.2,z,.23,false,18);P.cylinder(root,.015,h,'#6b8b6c',x,.4+h/2,z);for(let i=0;i<7;i++){let a=i*2.2,y=.5+i*.1;let o=P.sphere(root,.19,i%2?'#6b9a77':'#91b78c',x+Math.cos(a)*.15,y,z+Math.sin(a)*.15,.45,1.4,.8);o.rotation.z=Math.cos(a)*.65;}}
export function venue(room=0){let root=G(),wall=['#d7c5a3','#cfa58a','#809ca2'][room],tile=['#c7d1bc','#c9b991','#758f98'][room];root.userData.bg=wall;
 P.block(root,11,.14,9,tile,0,-.07,-.1,0);for(let x=-4;x<=4;x++)for(let z=-3;z<=3;z++){if((x+z)%2===0)P.block(root,.98,.009,.98,room===2?'#839fa4':'#e2dbc4',x,FLOOR-.027,z,0);}
 P.block(root,11,5,.2,wall,0,2.4,-2.5,0);P.block(root,11,.12,.12,'#6b8d96',0,.35,-2.35,.02);
 for(let x of [-1.65,1.65]){arch(root,x,1.15,-2.38,1.6,2.75,room===2?'#415f70':'#b4c6bd');arch(root,x,1.25,-2.35,1.32,2.44,room===2?'#c1cfbc':'#eee4c3');P.block(root,.035,2.6,.035,'#a4997f',x,2.35,-2.29,.006);P.block(root,1.37,.035,.035,'#a4997f',x,2.46,-2.28,.006);}
 P.sphere(root,.35,room===2?'#d6cdaa':'#dbb277',0,3.78,-2.34,1,1,.10);for(let i=0;i<12;i++){let a=i*Math.PI/6,b=P.block(root,.025,.15,.025,'#d5b585',Math.cos(a)*.47,3.78+Math.sin(a)*.47,-2.3,.005);b.rotation.z=a-Math.PI/2;}
 // Upholstered chair, actual forearm pads and footrest are part of the same contact scene.
 P.block(root,1.02,.22,.94,'#385e72',0,1.05,.15,.045);P.block(root,.85,.78,.18,'#507887',0,1.46,-.28,.045);for(let x of [-.63,.63]){P.block(root,.30,.11,.73,'#e4cfaa',x,1.39,.43,.03);P.cylinder(root,.045,.65,'#927e65',x,1.04,.25);P.block(root,.1,.94,.1,'#927e65',x*.65,.55,-.09,.02);}P.block(root,.98,.065,.48,'#8b9e9a',0,.045,.8,.02);
 for(let x of [-1.7,1.7]){P.cylinder(root,.40,.12,'#e5d8b7',x,1.05,.2,.4,false,24);P.cylinder(root,.035,1.0,'#8d8f7b',x,.53,.2);P.cylinder(root,.32,.06,'#87978a',x,.04,.2);for(let i=0;i<3;i++)P.block(root,.37,.055,.23,['#e3c6a6','#e5d6b9','#abc1b3'][i],x,1.14+i*.056,.2,.016);P.cylinder(root,.095,.14,'#e0a966',x+.19,1.20,.15,.075,false,18);}
 plant(root,-2.25,-.8,1.0);plant(root,2.55,-1.4,1.6);if(room===1){for(let i=0;i<6;i++)P.block(root,.09,4,.07,'#b18363',-4.7+i*.17,2.0,-1.2,.008);P.sphere(root,.50,'#edc36e',2.4,3.6,-2.25,1,1,.08);}if(room===2){for(let i=0;i<8;i++)P.sphere(root,.035,'#f0db9e',-3.5+i,3.8+Math.sin(i)*.12,-1.8);P.cylinder(root,.32,.3,'#dfc794',2.0,2.35,.0,.2,false,24);P.cylinder(root,.025,2,'#526d6b',2,1.2,0);}
 bake(root);return root;}
export const dispose=P.dispose;

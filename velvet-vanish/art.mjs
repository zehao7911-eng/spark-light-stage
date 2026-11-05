import * as P from './primitives.mjs';
const T=window.THREE;export const FLOOR=.02;
const V=(x=0,y=0,z=0)=>new T.Vector3(x,y,z),G=()=>new T.Group();
const MAT=new T.MeshStandardMaterial({vertexColors:true,roughness:.76,metalness:.07});
export const PEOPLE=[
 {skin:'#c58c68',hair:'#302a27',shirt:'#44426b',pants:'#294b68',name:'Ari'},
 {skin:'#edbb96',hair:'#743e29',shirt:'#32746f',pants:'#3e4561',name:'June'},
 {skin:'#dca580',hair:'#c7c3ad',shirt:'#a64d5b',pants:'#405f74',name:'Otis'},
 {skin:'#965f4d',hair:'#25282c',shirt:'#315c70',pants:'#354b58',name:'Noor'},
 {skin:'#e8ae80',hair:'#2f3940',shirt:'#6c456b',pants:'#374e68',name:'Milo'},
 {skin:'#d39a7a',hair:'#b18f59',shirt:'#3f687b',pants:'#385b5b',name:'Bea'}
];
export function bake(root,skip=new Set()){root.updateWorldMatrix(true,true);let inv=root.matrixWorld.clone().invert(),list=[],old=[];
 root.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||o.userData.ownMaterial)return;for(let p=o;p&&p!==root;p=p.parent)if(skip.has(p))return;let g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.applyMatrix4(new T.Matrix4().multiplyMatrices(inv,o.matrixWorld));if(!g.attributes.color){let c=o.material.color||new T.Color('#fff'),a=new Float32Array(g.attributes.position.count*3);for(let i=0;i<a.length;i+=3){a[i]=c.r;a[i+1]=c.g;a[i+2]=c.b;}g.setAttribute('color',new T.BufferAttribute(a,3));}list.push(g);old.push(o);});
 if(!list.length)return;let n=list.reduce((n,g)=>n+g.attributes.position.count,0),geo=new T.BufferGeometry();for(let key of ['position','normal','color']){let a=new Float32Array(n*3),offset=0;for(let g of list){a.set(g.attributes[key].array,offset);offset+=g.attributes[key].array.length;}geo.setAttribute(key,new T.BufferAttribute(a,3));}geo.computeBoundingSphere();for(let o of old){o.parent.remove(o);if(o.userData.ownGeometry)o.geometry.dispose();}for(let g of list)g.dispose();let mesh=new T.Mesh(geo,MAT);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.ownGeometry=true;root.add(mesh);return mesh;}
function lathe(parent,profile,color,x,y,z,sy=1,sx=1,sz=1){let g=new T.LatheGeometry(profile.map(p=>new T.Vector2(p[0],p[1])),28),m=new T.Mesh(g,P.material(color));m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=m.receiveShadow=true;m.userData.ownGeometry=true;parent.add(m);return m;}
function part(parent,x=0,y=0,z=0){let g=G();g.position.set(x,y,z);parent.add(g);return g;}
function seg(o,a,b,r,r2=r){let d=V().subVectors(b,a);o.position.copy(a).add(b).multiplyScalar(.5);o.quaternion.setFromUnitVectors(V(0,1,0),d.clone().normalize());o.scale.set(r,d.length(),r2);}
function chain(a,b,l1,l2,side=0){let d=b.clone().sub(a),length=Math.min(l1+l2-.00001,Math.max(.00001,d.length()));d.normalize();let along=(length*length+l1*l1-l2*l2)/(2*length),h=Math.sqrt(Math.max(0,l1*l1-along*along)),guide=side?V(side*.85,-.4,.12):V(0,0,1),bend=guide.clone().addScaledVector(d,-guide.dot(d)).normalize();return a.clone().addScaledVector(d,along).addScaledVector(bend,h);}
function limb(parent,color){return P.cylinder(parent,1,1,color,0,0,0,1,false,12);}
export function actor(kind=0){let root=G(),p=PEOPLE[kind%6],rig={kind,p,arms:[],legs:[],eyes:[],brows:[],spots:[],points:[]};root.userData.rig=rig;
 let hips=part(root,0,1.12,0);P.sphere(hips,.30,p.pants,0,0,.09,1.04,.62,1.1);bake(hips);rig.hips=hips;
 let body=part(root,0,1.10,0);lathe(body,[[0,0],[.28,0],[.34,.13],[.35,.48],[.44,.63],[.38,.74],[.18,.81],[0,.81]],p.shirt,0,0,0,1,1,.73);
 P.tube(body,[[-.15,.78,.12],[0,.69,.29],[.15,.78,.12]],.024,'#f4e7ce');
 P.block(body,.13,.20,.018,'#eadbc2',.21,.52,.268,.015);P.block(body,.08,.012,.025,p.shirt,.21,.56,.28,.005);
 for(let s of [-1,1])P.tube(body,[[s*.18,.15,.23],[s*.23,.28,.26],[s*.25,.42,.25]],.008,p.pants);
 P.cylinder(body,.13,.24,p.skin,0,.86,0,.12,false,18);bake(body);rig.body=body;

 for(let sign of [-1,1]){let lapel=P.block(body,.13,.47,.03,'#222c45',sign*.16,.54,.245,.015);lapel.rotation.z=sign*.24;P.sphere(body,.07,'#e8d2a5',sign*.069,.746,.245,1,.6,.35);}
 P.block(body,.11,.48,.02,'#f4e9d4',0,.46,.269,.009);for(let i=0;i<3;i++)P.sphere(body,.017,'#d7b36b',0,.30+i*.12,.289);
 P.block(body,.20,.024,.025,'#e8c574',.225,.43,.278,.007);P.tube(body,[[.16,.43,.29],[.20,.31,.3],[.28,.32,.28]],.009,'#d7b36b');bake(body);
 let head=part(body,0,1.00,0);lathe(head,[[0,-.12],[.13,-.10],[.23,-.03],[.29,.13],[.30,.34],[.25,.49],[.12,.54],[0,.55]],p.skin,0,0,0,1,1,.90);
 for(let s of [-1,1]){P.sphere(head,.068,p.skin,s*.29,.19,-.005,.65,1,.7);P.sphere(head,.031,'#b37560',s*.318,.19,.012,.45,1,.5);P.sphere(head,.055,'#fff2da',s*.119,.23,.25,1.02,.65,.38);P.sphere(head,.027,'#373c3c',s*.119,.226,.270,.65,1,.35);P.sphere(head,.008,'#ffffff',s*.112,.235,.281,.8,.8,.4);}
 P.sphere(head,.055,p.skin,0,.15,.28,.64,.9,.9);P.sphere(head,.04,'#ad7259',0,.132,.303,.85,.2,.5);
 P.tube(head,[[-.07,.057,.255],[0,.035,.278],[.07,.057,.255]],.014,'#785448');P.sphere(head,.025,'#edc8a3',0,-.015,.23,1.6,.3,.5);
 lathe(head,[[0,.31],[.30,.33],[.31,.47],[.25,.58],[.08,.62],[0,.62]],p.hair,0,0,-.035,1,1,.94);
 if(kind===0||kind===3){for(let i=0;i<11;i++){let a=i/11*Math.PI*2;P.sphere(head,.09,p.hair,Math.cos(a)*.245,.51+Math.sin(i*2)*.035,Math.sin(a)*.22,.9,.9,.85);}}
 if(kind===1||kind===5){P.sphere(head,.15,p.hair,0,.49,-.26,1,.85,.9);for(let s of [-1,1])P.sphere(head,.10,p.hair,s*.26,.34,.045,.6,1.65,.75);}
 if(kind===2){P.tube(head,[[-.065,.1,.267],[0,.11,.295],[.065,.1,.267]],.035,p.hair);}
 if(kind===4){for(let i=0;i<4;i++){let tuft=P.sphere(head,.11,p.hair,-.16+i*.09,.56+i*.015,.12,.7,.9,.9);tuft.rotation.z=-.3;}}

 if(kind%2===0){P.cylinder(head,.36,.045,'#26314a',0,.60,0,.36,false,28);P.cylinder(head,.245,.34,'#26314a',0,.78,-.02,.28,false,28);P.cylinder(head,.254,.075,'#d8b16d',0,.66,-.02,.264,false,28);}
 // Separate eyelids and brows; never scale the head or inflate the face to emote.
 bake(head);rig.head=head;
 for(let s of [-1,1]){let lid=part(head,s*.119,.232,.282);P.block(lid,.111,.044,.012,p.skin,0,0,0,.012);bake(lid);rig.eyes.push(lid);let brow=part(head,s*.119,.32,.263);P.block(brow,.105,.026,.024,p.hair,0,0,0,.008);bake(brow);rig.brows.push(brow);}
 if(kind===2||kind===4){let glasses=part(head);for(let s of [-1,1]){let tor=new T.Mesh(new T.TorusGeometry(.079,.009,5,18),P.material('#374c56'));tor.position.set(s*.12,.235,.282);tor.scale.y=.75;tor.userData.ownGeometry=true;glasses.add(tor);}P.block(glasses,.085,.012,.018,'#374c56',0,.24,.29,.004);bake(glasses);}
 for(let s of [-1,1]){let upper=limb(root,p.shirt),lower=limb(root,p.shirt),elbow=P.sphere(root,.092,p.shirt),hand=part(root);P.sphere(hand,.10,'#f6edda',0,0,0,.80,.6,1.15);for(let j=0;j<4;j++)P.sphere(hand,.025,'#f6edda',-.055+j*.035,0,.08,.55,.60,1.9);P.sphere(hand,.033,'#f6edda',s*.075,0,.02,.8,.7,1.3);bake(hand);rig.arms.push({s,upper,lower,elbow,hand});
 let thigh=limb(root,p.pants),shin=limb(root,p.pants),knee=P.sphere(root,.13,p.pants),shoe=part(root,s*.36,.16,.82);P.block(shoe,.27,.22,.46,'#252d3a',0,0,0,.015);P.block(shoe,.28,.035,.48,'#161f31',0,-.104,0,.015);for(let j=0;j<3;j++)P.block(shoe,.16,.012,.015,'#617785',0,.11,-.02+j*.06,.004);bake(shoe);rig.legs.push({s,thigh,shin,knee,shoe});}
 let shadow=new T.Mesh(new T.CircleGeometry(.78,32),new T.MeshBasicMaterial({color:'#234c59',transparent:true,opacity:.13,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.set(0,FLOOR+.005,.4);shadow.userData.ownMaterial=shadow.userData.ownGeometry=true;root.add(shadow);
 root.position.z=-.28;pose(root,0,[],0);return root;}
export function pose(root,t,contacts=[],mood=0){let r=root.userData.rig;r.hips.position.y=1.02;r.body.position.y=1.10+Math.sin(t*1.7)*.005;r.body.rotation.z=Math.sin(t*.8)*.012;r.head.rotation.x=.06+mood*.035;r.head.rotation.z=Math.sin(t*.7)*.02;
 for(let i=0;i<2;i++){let closed=Math.sin(t*1.07+2)>.994;r.eyes[i].visible=closed;r.eyes[i].scale.y=1;r.brows[i].rotation.z=(i?1:-1)*(.05+mood*.09);}
 root.updateWorldMatrix(true,true);r.points=[];
 for(let i=0;i<2;i++){let a=r.arms[i],sh=V(a.s*.40,.70,0);r.body.localToWorld(sh);root.worldToLocal(sh);let wr=contacts[i]?contacts[i].clone():V(a.s*.59,1.48,.48);root.worldToLocal(wr);let d=wr.clone().sub(sh);if(d.length()>1.12)wr.copy(sh).add(d.setLength(1.12));let el=chain(sh,wr,.56,.58,a.s);seg(a.upper,sh,el,.113);seg(a.lower,el,wr,.085);a.elbow.position.copy(el);a.hand.position.copy(wr);a.hand.rotation.set(.12,0,-a.s*.08);r.points.push({shoulder:sh,elbow:el,wrist:wr});}
 for(let a of r.legs){let hip=V(a.s*.21,1.02,.04),ankle=V(a.s*.27,.24,.08),kn=chain(hip,ankle,.45,.44);seg(a.thigh,hip,kn,.14);seg(a.shin,kn,ankle,.105);a.knee.position.copy(kn);a.shoe.position.set(a.s*.27,.148,.10);}root.updateWorldMatrix(true,true);
}
export function cup(id=0,gold=false,finish=0){let root=G(),c=gold?'#cfa861':['#ded8c2','#85bcb4','#bfa0c5'][finish];lathe(root,[[.29,0],[.29,.045],[.255,.06],[.19,.46],[.16,.50],[0,.50]],c,0,0,0);for(let y of [.055,.40])P.cylinder(root,y>.2?.205:.287,.024,'#c99958',0,y,0,undefined,false,24);P.sphere(root,.045,'#c99958',0,.53,0,1,.7,1);for(let i=0;i<12;i++){let a=i*Math.PI/6;P.sphere(root,.012,'#ead5a6',Math.sin(a)*.236,.22,Math.cos(a)*.236,.8,1,.8);}bake(root);root.userData.id=id;return root;}
export function prize(kind=0){let root=G(),gold='#e5bb62';
 if(kind===0){let s=new T.Shape();for(let i=0;i<10;i++){let a=i*Math.PI/5+Math.PI/2,r=i%2?.10:.24,x=Math.cos(a)*r,y=Math.sin(a)*r;i?s.lineTo(x,y):s.moveTo(x,y);}s.closePath();let g=new T.ExtrudeGeometry(s,{depth:.07,bevelEnabled:true,bevelSize:.015,bevelThickness:.015,bevelSegments:1,steps:1});let o=new T.Mesh(g,P.material(gold));o.userData.ownGeometry=true;root.add(o);}
 if(kind===1){let o=new T.Mesh(new T.TorusGeometry(.105,.03,6,20),P.material(gold));o.userData.ownGeometry=true;o.position.y=.1;root.add(o);P.block(root,.045,.30,.06,gold,0,-.10,0);P.block(root,.11,.035,.06,gold,.035,-.20,0);}
 if(kind===2){let path=[];for(let i=0;i<12;i++){let a=-1.05+i/11*2.1;path.push([-.10+Math.cos(a)*.22,Math.sin(a)*.22,0]);}P.tube(root,path,.052,gold);}
 if(kind===3){P.cylinder(root,.014,.35,'#48726a',0,-.12,0);for(let i=0;i<7;i++){let a=i*2.3;P.sphere(root,.10,i%2?'#d57481':'#a83f5f',Math.cos(a)*.055,.09+i*.009,Math.sin(a)*.055,1,.7,.7);}P.sphere(root,.065,'#566f55',.065,-.08,0,1.4,.5,.5);}
 if(kind===4){P.sphere(root,.14,'#82b6b1');let tor=new T.Mesh(new T.TorusGeometry(.23,.019,5,30),P.material(gold));tor.rotation.x=.5;tor.userData.ownGeometry=true;root.add(tor);}
 if(kind===5){let o=new T.Mesh(new T.OctahedronGeometry(.23),P.material('#9cd4dc'));o.userData.ownGeometry=true;root.add(o);P.sphere(root,.032,'#f9efd1',-.09,.08,.12);}
 bake(root);return root;}
export function venue(kind=0){let root=G(),back=['#242d46','#304d52','#182f49'][kind],curtain=['#7e394e','#226c68','#53426f'][kind];root.userData.bg=back;
 P.block(root,14,.18,12,'#242c40',0,-.09,0,0);for(let z=-3;z<=3;z++)P.block(root,12,.012,.035,'#584552',0,.012,z*.5,0);
 P.block(root,12,6,.2,back,0,2.9,-2,0);for(let x=-5;x<=5;x+=.25){let wave=Math.cos(x*6)*.04;P.cylinder(root,.19,5.3,curtain,x,2.65,-1.78+wave,.19,false,10);}
 for(let s of [-1,1]){P.block(root,.25,5.7,.3,'#ba955d',s*2.35,2.8,-1.1,.03);P.block(root,.4,.17,.45,'#dfc58b',s*2.35,.16,-1.1,.03);for(let i=0;i<9;i++)P.sphere(root,.047,'#edcf94',s*2.35,.6+i*.48,-.91);for(let x=0;x<7;x++)P.cylinder(root,.15,4.5,curtain,s*(2.65+x*.24),2.3,-.7+x*.04,.15,false,10);P.tube(root,[[s*2.48,3.8,-.48],[s*2.7,2.4,-.4],[s*3.8,1.5,-.35]],.033,'#e0b96d');}
 P.block(root,5.0,.26,.38,'#bd995f',0,4.43,-1.05,.03);for(let i=0;i<11;i++)P.sphere(root,.055,'#edcf94',-2.1+i*.42,4.38,-.80);
 // Velvet table and uninterrupted top: all cups share exactly the same physical support plane.
 P.block(root,3.82,.14,1.68,'#b18b5b',0,1.205,.52,.015);P.block(root,3.70,.012,1.56,'#205d59',0,1.294,.52,0);P.block(root,3.6,.50,.07,curtain,0,.91,1.30,.025);for(let x=-1.6;x<=1.6;x+=.2)P.cylinder(root,.12,.47,curtain,x,.92,1.30,.12,false,8);P.tube(root,[[-1.8,1.23,1.37],[0,1.20,1.37],[1.8,1.23,1.37]],.022,'#d7ad6a');for(let x of [-1.4,1.4])for(let z of [-.05,1.05]){P.block(root,.12,1.2,.12,'#5e3d42',x,.6,z,.015);P.block(root,.20,.045,.20,'#b18b5b',x,.04,z,.01);}
 for(let i=0;i<3;i++){let tor=new T.Mesh(new T.TorusGeometry(.36,.009,5,36),P.material('#acb798'));tor.rotation.x=-Math.PI/2;tor.position.set((i-1)*1.1,1.305,.57);tor.userData.ownGeometry=true;root.add(tor);}
 // Framed display alcoves, spotlights and layered golden stage stars.
 for(let s of [-1,1]){P.block(root,.65,.10,.65,'#a98558',s*1.7,.50,-1.25,.02);P.cylinder(root,.06,.48,'#a98558',s*1.7,.24,-1.25);let gem=prize(kind*2+(s>0?1:0));gem.position.set(s*1.7,.88,-1.25);gem.scale.setScalar(.8);root.add(gem);}
 if(kind===1)for(let i=0;i<9;i++){let a=i*Math.PI/8;let b=P.block(root,.018,.65,.04,'#c99f69',Math.cos(a)*1.60,2.6+Math.sin(a)*1.6,-1.55,.005);b.rotation.z=a-Math.PI/2;}
 if(kind===2)for(let i=0;i<25;i++){let x=Math.sin(i*43.5)*2,y=1.8+(Math.sin(i*17.1)+1)*1.1;P.sphere(root,.018,'#e8cf94',x,y,-1.45);}
 bake(root);return root;}
export const dispose=P.dispose;

const $=id=>document.getElementById(id),T=THREE,scene=new T.Scene(),camera=new T.PerspectiveCamera(53,1,.1,200),renderer=new T.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(1.7,devicePixelRatio));document.body.prepend(renderer.domElement);scene.background=new T.Color(0x88dcff);scene.fog=new T.FogExp2(0xace8ff,.012);scene.add(new T.HemisphereLight(0xfff9da,0x84a2b6,1.15));let sun=new T.DirectionalLight(0xffedd4,1.1);sun.position.set(-9,18,8);scene.add(sun);
const box=new T.BoxGeometry(),ball=new T.SphereGeometry(1,12,9),cone=new T.ConeGeometry(1,1,5),materials=new Map();
function shape(parent,geo,color,x,y,z,w,h,d){if(!materials.has(color))materials.set(color,new T.MeshStandardMaterial({color,roughness:.76}));const o=new T.Mesh(geo,materials.get(color));o.scale.set(w,h,d);o.position.set(x,y,z);parent.add(o);return o}
const block=(...a)=>shape(a[0],box,...a.slice(1));function group(parent=scene){let g=new T.Group();parent.add(g);return g}
function label(str,x,y,z,size){let c=document.createElement('canvas');c.width=512;c.height=96;let a=c.getContext('2d');a.textAlign='center';a.font='900 53px Arial';a.lineWidth=9;a.strokeStyle='#182b39';a.strokeText(str,256,65);a.fillStyle='#fff7c0';a.fillText(str,256,65);let t=new T.CanvasTexture(c),s=new T.Sprite(new T.SpriteMaterial({map:t}));s.position.set(x,y,z);s.scale.set(size,size*.188,1);scene.add(s)}
block(scene,0xe8c97f,0,-.6,28.75,115,.8,52.5);
block(scene,0xe8c97f,0,-.6,-45.75,115,.8,18.5);
for(const bank of [-1,1])block(scene,0xe8c97f,43.25*bank,-.6,-17,28.5,.8,39);
block(scene,0x46cfee,0,-.12,-17,58,.45,39);block(scene,0x62cc40,0,-.16,23,56,.5,21);
for(let i=0;i<30;i++){let x=(i%15-7)*4.5,z=i<15?-42:40,h=5+(i*7%5)+Math.sin(i)*1.5;block(scene,0xbb7846,x,h/2-1,z,4.6,h,7);block(scene,0x64c740,x,h-1,z,4.7,.75,7.2);if(i%3===0){block(scene,0x86552d,x,h+.8,z,.7,4,.7);for(let j=0;j<6;j++){let fr=block(scene,0x339647,x+Math.cos(j)*1.4,h+2.6,z+Math.sin(j)*1.4,3.6,.5,1);fr.rotation.y=-j}}}
for(let i=0;i<25;i++){let x=Math.sin(i*17)*27,z=-3-(i*7%32);block(scene,0x86ebef,x,.13,z,1.3,.025,.09)}
for(let i=0;i<3;i++){let x=12+i*5;block(scene,0xae7941,x,1.1,9,4,2,2);for(let j=0;j<6;j++)block(scene,j%2?0xffedb8:[0x427bea,0x41bb66,0xeaa92f][i],x-2+j*.8,3.1,9,.82,.35,3.3);label(['WEIGHTS','RODS','UPGRADES'][i],x,4.1,9,6)}
const pads=[],display=[];for(let i=0;i<6;i++){let x=(i%3-1)*4.2,z=17+Math.floor(i/3)*5;block(scene,0xd6dcea,x,.15,z,3.9,.45,3.7);block(scene,0xfed847,x,.4,z,3.35,.12,3);block(scene,0x28354c,x,.52,z,3.1,.14,2.7);block(scene,0x61df2b,x,.3,z+1.9,2.7,.25,.65);pads.push(new T.Vector3(x,1.5,z))}
label('YOUR BASE',0,4,24,9);
let hero=group(),legs=[];block(hero,0x263549,0,1.4,0,.98,1.05,.58);block(hero,0xffce97,0,2.25,0,.76,.74,.7);for(let k of [-1,1]){block(hero,0xffcb96,k*.66,1.4,0,.34,.85,.4);legs.push(block(hero,0x243951,k*.27,.47,0,.45,.9,.48));block(hero,0x273146,k*.16,2.29,-.36,.08,.09,.025)}hero.position.set(0,0,5);const rod=block(hero,0x855132,.9,2,-.75,.09,.1,3);rod.rotation.x=.65;
const names=['Starfish','Blue Tang','Sun Puffer','Reef Clown','Mossback','Violet Seahorse','Spikejaw','Moon Ray','Aurora Koi','Crown Shark','Ember Nautilus','Cosmic Whale'],rates=[2,4,8,14,40,50,290,410,640,1050,1800,3000],colors=[0xff7eaa,0x38b8ff,0xffa12e,0xff6536,0xb6bd4b,0xb273ee,0x3889c7,0x79d8d9,0xff9988,0x6e86ae,0xf08d50,0x9273ce];
const regions = [
 {name:'World 1', sky:0x8cdffd, water:0x39bbd9, stone:0x987351, feature:'Coral', groups:[
 ['Common', 'Starfish|Blue Tang|Codfish|Minnow|Anchovy|Sardine|Mullet|Flatfish'],
 ['Uncommon','Sun Puffer|Reef Clown|Mossback|Violet Seahorse|Butterflyfish|Ribbon Eel|Parrotfish|Coral Grouper'],
 ['Rare','Spikejaw|Moon Ray|Aurora Koi|Crown Shark|Ember Nautilus|Cosmic Whale|Sailfin|Copper Snapper']]},
 {name:'World 2',sky:0xffdfaf,water:0x62cbb6,stone:0xc28149,feature:'Arch',groups:[
 ['Doodle','Inkfin|Crayon Carp|Chalk Ray|Brush Eel|Stencil Shark|Paper Pike|Doodle Squid|Pastel Puffer|Scribble Sole|Paintbox Perch'],
 ['Prism','Prism Fish|Glass Minnow|Opal Tang|Beryl Ray|Ruby Koi|Citrine Eel|Jade Seahorse|Amethyst Squid|Quartz Shark|Diamond Sailfish']]},
 {name:'Abyss',sky:0x343d6e,water:0x27558b,stone:0x42395c,feature:'Vent',groups:[
 ['Midnight','Lanternfish|Viperfish|Gulper Eel|Ghost Shark|Black Dragonfish|Vampire Squid|Barreleye|Fangtooth'],
 ['Trench','Voidfish|Anglerfish|Dumbo Octopus|Hatchetfish|Chimera|Sable Ray|Trench Nautilus|Coffinfish']]},
 {name:'Beasts',sky:0xffb38a,water:0x569b82,stone:0x764834,feature:'Fang',groups:[
 ['Beast','Kraken|Leviathan|Ironjaw Shark|Tusked Ray|Armored Sturgeon|Goliath Grouper|Sawtooth Eel|Titan Puffer|Hydra Pike|Ridgeback Whale|Cinder Squid|Thunder Gar|Boulderfin|Horned Marlin|Crown Serpent|Sea Deity']]},
 {name:'Events',sky:0x986fba,water:0x6a71b6,stone:0x836d9b,feature:'Moon',groups:[
 ['Moon','Moon Jelly|Lunar Ray|Crescent Shark|Eclipse Eel|Orbit Puffer|Moonstone Carp|Starlit Seahorse|Nebula Squid'],
 ['Derby','Pennant Perch|Ribbon Marlin|Trophy Tuna|Laurel Koi']]},
 {name:'Weather',sky:0x7e9db8,water:0x378aab,stone:0x5a6e85,feature:'Spire',groups:[
 ['Storm','Static Ray|Thunderhead Shark|Rain Carp|Cyclone Eel|Nimbus Puffer|Squall Sailfish'],
 ['Aurora','Polar Cod|Sunshower Tang|Frost Pike|Rainbow Salmon|Boreal Jelly|Halo Dolphin']]}
];
const forms=['eel','ray','shark','puffer','squid','jelly','octopus','seahorse','whale','dolphin','nautilus','sole','flatfish','sail','marlin','pike','gar','shark','angler','lantern','serpent','star'];
const roster=regions.flatMap((region,r)=>region.groups.flatMap(([band,list],tier)=>list.split('|').map((name,slot)=>{
 let id=names.indexOf(name);
 if(id<0){id=names.length;names.push(name);const observed={Doodle:[230000,245000,260000,278000,295000],Moon:[80000,129000,195000,250000,320000],Beast:[34000,40000,45000,55000,55000],Common:[2,4,5,7,9]};rates.push(observed[band]?.[slot]??Math.round((r+1)**3*(tier+1)*7*(1+slot*.22)));colors.push(new T.Color().setHSL(((id*.137+r*.1)%1),.72,.52).getHex())}
 const anatomy={'Kraken':'octopus','Leviathan':'serpent','Sea Deity':'serpent','Ribbon Marlin':'marlin','Chalk Ray':'ray','Viperfish':'pike','Coffinfish':'angler'};
 return {id,name,band,tier,r,slot,form:anatomy[name]||forms.find(f=>name.toLowerCase().includes(f))||'fin'};
})));
const byId=new Map(roster.map(rec=>[rec.id,rec]));
const reefSurfaces=new Map();
const reefSkin=new T.MeshStandardMaterial({vertexColors:true,roughness:.63,metalness:.04});
// Sweep a succession of elliptical cross sections along a hand-drawn centerline.
// Sections use local normal and binormal axes, so bent fins keep their thickness.
function reefSweep(parent,key,path,paint){
 let geo=reefSurfaces.get(key);
 if(!geo){
  const positions=[],colors=[],indices=[],sides=14;
  for(let i=0;i<path.length;i++){
   const [x,y,z,h,d]=path[i],a=path[Math.max(0,i-1)],b=path[Math.min(path.length-1,i+1)];
   const tangent=new T.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]).normalize();
   const ref=Math.abs(tangent.z)>.98?new T.Vector3(0,1,0):new T.Vector3(0,0,1);
   const up=new T.Vector3().crossVectors(ref,tangent).normalize(),side=new T.Vector3().crossVectors(tangent,up);
   for(let j=0;j<sides;j++){
    const angle=j*2*Math.PI/sides,co=Math.cos(angle),si=Math.sin(angle);
    positions.push(x+up.x*h*co+side.x*d*si,y+up.y*h*co+side.y*d*si,z+up.z*h*co+side.z*d*si);
    const c=paint(i/(path.length-1),co,si);colors.push(c.r,c.g,c.b);
    if(i){const k=(i-1)*sides+j,n=(i-1)*sides+(j+1)%sides;indices.push(k,n,n+sides,k,n+sides,k+sides)}
   }
  }
  geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));geo.setIndex(indices);geo.computeVertexNormals();reefSurfaces.set(key,geo);
 }
 const mesh=new T.Mesh(geo,reefSkin);parent.add(mesh);return mesh;
}
function shoalFish(id){
 const rec=byId.get(id),f=rec.form,g=group(),base=new T.Color(colors[id]),cream=new T.Color(0xffefcd),dark=new T.Color(0x153044);
 const pigment=(u,y,z)=>base.clone().lerp(y<-.25?cream:dark,y<-.25?.35-.32*y:.08+.19*Math.max(0,y)).lerp(cream,Math.max(0,Math.cos(u*(4+id%5)*Math.PI*2+z*.8)-.68)*.63);
 let serial=0;
 function sculpt(path,x=0,y=0,z=0,ink=pigment){const mesh=reefSweep(g,id+'/'+serial++,path,ink);mesh.position.set(x,y,z);return mesh}
 const finInk=(u,y)=>base.clone().lerp(cream,.22+.55*u).lerp(dark,.13*(1-y));
 const fin=(path,x,y,z)=>sculpt(path,x,y,z,finInk);
 function eyes(x,y,z,s=.10){for(const k of [-1,1]){
  shape(g,ball,0xfff0bc,x,y,k*z,s*1.27,s*1.27,s*.51);
  shape(g,ball,0x172c39,x+.014,y,k*(z+s*.34),s,s,s*.47);
  shape(g,ball,0xffffff,x+.038,y+.035,k*(z+s*.74),s*.31,s*.31,s*.16);
 }}
 const profile=(rows)=>rows.map(([x,y,h,d])=>[x,y,0,h,d]);
 if(id===0||f==='star'){
  shape(g,ball,colors[id],0,0,0,.4,.38,.19);
  for(let i=0;i<5;i++){let arm=sculpt(profile([[.18,0,.21,.17],[.45,.03,.23,.18],[.68,.08,.16,.12],[.88,.17,.08,.07],[.97,.24,.003,.003]]));arm.rotation.z=i*Math.PI*.4+.28}
  return g;
 }
 if(['eel','serpent','seahorse'].includes(f)){
  const horse=f==='seahorse';
  const path=horse?[[-.22,-.46,.008,.008],[-.41,-.43,.05,.06],[-.46,-.61,.08,.08],[-.29,-.72,.11,.11],[.02,-.57,.15,.14],[.09,-.26,.26,.24],[-.07,.12,.29,.23],[-.12,.44,.18,.17],[.02,.64,.23,.21],[.24,.64,.22,.2],[.43,.52,.09,.1],[.63,.48,.081,.09],[.65,.48,.004,.003]]:[[-1.36,-.02,.003,.003],[-1.13,-.04,.063,.07],[-.88,0,.12,.11],[-.55,.09,.16,.14],[-.18,.1,.2,.18],[.18,.05,.23,.22],[.49,.02,.27,.25],[.74,.04,.22,.21],[.94,.05,.11,.13],[1,.03,.003,.004]];
  const spine=sculpt(profile(path));if(!horse){
   const geo=spine.geometry;
   if(!geo.morphAttributes.position){
    geo.morphTargetsRelative=true;
    const verts=geo.attributes.position;
    geo.morphAttributes.position=[0,Math.PI/2].map(offset=>{
     const delta=new Float32Array(verts.count*3);
     for(let j=0;j<verts.count;j++){const back=Math.max(0,.53-verts.getX(j));delta[j*3+2]=.20*back*Math.sin(2.7*back+offset)}
     return new T.BufferAttribute(delta,3);
    });
   }
   spine.updateMorphTargets();
  }
  eyes(horse?.21:.67,horse?.70:.13,horse?.18:.21,.087);return g;
 }
 const soft=['jelly','squid','octopus','nautilus'].includes(f);
 if(soft){
  const shell=f==='nautilus',dart=f==='squid';
  const mantle=sculpt(profile([[-.72,0,.005,.005],[-.53,0,.28,.25],[-.26,.03,.47,.42],[.05,.04,.54,.47],[.32,.02,.48,.42],[.47,0,.30,.32],[.52,0,.006,.006]]));
  if(!shell)mantle.rotation.z=dart?-1.24:-1.56;
  for(let i=0;i<8;i++){const a=i*Math.PI/4,r=.31;
   const arm=fin(profile([[0,0,.10,.09],[.18,.02,.096,.082],[.37,.06,.074,.06],[.56,.02,.055,.045],[.73,-.09,.024,.023],[.84,-.16,.002,.002]]),shell?.35+Math.cos(a)*.19:Math.cos(a)*r,-.18,Math.sin(a)*r);
   arm.rotation.order='YXZ';arm.rotation.y=-a;arm.rotation.z=-1.04+.15*Math.sin(i+id);
  }eyes(shell?.34:.12,-.02,shell?.36:.43);return g;
 }
 const ray=['ray','flatfish','sole'].includes(f),round=f==='puffer',pred=['marlin','pike','gar','shark','dolphin','whale'].includes(f);
 const h=ray?.16:round?.67:pred?.31:.36+(id%5)*.036,d=ray?.44:round?.54:.28+(id%4)*.036;
 const snout=pred?1.17:round?.71:.84;
 sculpt(profile([[-.96,0,.007,.008],[-.84,.01,h*.22,d*.22],[-.62,.01,h*.43,d*.53],[-.35,.04,h*.83,d*.82],[-.07,.05,h,d],[.21,.04,h,d],[.44,.03,h*.87,d*.94],[.64,.01,h*.59,d*.72],[snout,-.018,.015,.021]]));
 for(const k of [-1,1]){
  const lobe=fin(profile([[0,0,.08,.075],[-.14,k*.11,.13,.065],[-.33,k*.23,.16,.045],[-.51,k*.36,.105,.028],[-.63,k*.47,.003,.004]]),-.82,0,0);if(f==='whale'||f==='dolphin')lobe.rotation.x=1.57;
  const wing=fin([[0,0,0,.072,.14],[-.08,.03,.2*k,.094,.17],[-.23,.015,.43*k,.068,.13],[-.35,-.045,.61*k,.038,.075],[-.46,-.085,.71*k,.002,.003]],.08,-h*.22,k*d*.72);if(ray)wing.scale.set(1.65,1.3,1.45);
 }
 fin(profile([[0,0,.055,.065],[-.12,.14,.14,.058],[-.23,.32,.12,.043],[-.32,.52,.055,.025],[-.36,.59,.002,.003]]),-.13,h*.83,0);
 eyes(.46,.04+h*.21,d*.86,round?.13:.09);
 return g;
}
/* Species art direction follows the catalogue order within each tier.
   A profile combines a silhouette detail, proportions and a swimming gait. */
const designs=[
 'dots:wheel crest:bank barb:cruise fork:dart stripe:dart spots:school twin:cruise fringe:skim',
 'spikes:bob bands:bank moss:rest crown:hover fan:bank ribbon:wave beak:bite armor:rest',
 'fang:bite crescent:flap ribbon:glide crown:prowl spiral:jet ridge:sound sail:glide barb:dart',
 'brush:dart pencil:cruise fringe:flap brush:wave stencil:prowl pencil:dart ink:jet dots:bob ribbon:skim fan:bank',
 'crystal:glide shard:dart crest:bank shard:flap gem:glide crystal:wave gem:hover shard:jet crystal:prowl sail:dart',
 'lamp:hover fang:bite jaw:wave ribbon:prowl ridge:wave cloak:jet dome:rest fang:dart',
 'halo:hover lamp:bite ears:jet keel:skim fork:glide fringe:flap spiral:rest jaw:rest',
 'crown:jet ridge:wave armor:prowl tusk:flap armor:cruise jaw:bite saw:wave spikes:bob horns:bite ridge:sound flame:jet fork:dart moss:rest horns:dart crown:wave trident:hover',
 'halo:pulse crescent:flap crescent:prowl halo:wave gem:bob shard:glide star:hover dots:jet',
 'pennant:bank ribbon:dart crown:school wreath:glide',
 'spark:flap hammer:prowl drops:cruise ribbon:wave cloud:bob sail:dart',
 'ice:cruise rays:bank shard:dart bands:school veil:pulse halo:sound'
].join(' ').split(' ');
const artProfiles=new Map(roster.map((fish,index)=>{
 const [mark,gait]=designs[index].split(':');
 return [fish.id,{mark,gait,length:.79+(index*17%37)/57,height:.78+(index*13%29)/46,
   beat:1.8+(index*23%41)/13,phase:index*2.399,depth:.08+(index*7%17)/55}];
}));
const jewelGeo=new T.OctahedronGeometry(1);
const haloGeo=new T.TorusGeometry(.52,.055,5,18);
function fish(id){
 const rec=byId.get(id), art=artProfiles.get(id);
 const body=shoalFish(id);
 const accent=new T.Color(colors[id]).lerp(new T.Color(0xffdfa0),.56).getHex();
 const dorsal=['ray','sole','flatfish'].includes(rec.form)?.17:rec.form==='seahorse'?.77:.48;
 const part=(geo,x,y,z,w,h,d,shade=accent)=>shape(body,geo,shade,x,y,z,w,h,d);
 function blade(x,y,z,w,h,d,angle=0){const mesh=part(cone,x,y,z,w,h,d);mesh.rotation.z=angle;return mesh}
 const m=art.mark;
 if(['halo','crescent','spiral','wreath'].includes(m)){
  const hoop=part(haloGeo,m==='spiral'?-.1:0,m==='spiral'?.18:dorsal+.14,m==='spiral'?.42:0,1,m==='crescent'?.55:1,1);
  if(m!=='spiral')hoop.rotation.x=1.12;
 }else if(['lamp','dome','hammer','jaw','beak','tusk','fang','pencil','trident','barb'].includes(m)){
  if(m==='hammer')part(ball,.65,.13,0,.26,.19,.88);
  else if(m==='lamp'){part(ball,.46,dorsal+.19,0,.06,.31,.06);part(ball,.49,dorsal+.5,0,.16,.16,.16,0xaaffcf)}
  else if(m==='dome')part(ball,.38,dorsal,.01,.44,.37,.39,0x9cdadd);
  else if(m==='jaw'||m==='beak')part(ball,.78,-.13,0,.48,m==='jaw'?.27:.16,.32);
  else for(const side of [-1,1])blade(.76,m==='fang'?-.21:.04,side*.22,.095,m==='pencil'?.96:.54,.09,m==='fang'?2.9:-1.1);
 }else if(['dots','spots','bands','stripe','stencil','ink','drops','gem'].includes(m)){
  const count=3+id%4;
  for(let i=0;i<count;i++)for(const side of [-1,1]){
   const x=(i/(count-1)-.5)*1.22;
   part(m==='gem'?jewelGeo:ball,x,id===0?Math.sin(i*1.5)*.25:.1*Math.cos(i),side*(id===0?.24:.4*Math.sqrt(1-x*x)),m==='bands'?.10:.065+(i%2)*.045,m==='bands'||m==='stripe'?.37:.09,.055);
  }
 }else if(['ribbon','fringe','veil','brush','cloak','fan','fork','twin','ears'].includes(m)){
  for(let i=0;i<3+id%3;i++){const a=(i-2)*.31;
   blade(m==='ears'?0:-.76,dorsal*.3+Math.sin(a)*.34,Math.sin(a)*.31,.16,m==='veil'||m==='ribbon'?.99:.61,.13,1.55+a)}
 }else{
  const count=['sail','pennant','keel'].includes(m)?2:3+id%4;
  for(let i=0;i<count;i++){const x=.5-i*.95/Math.max(1,count-1),h=.26+.44*Math.sin((i+1)*Math.PI/(count+1));
   if(['moss','cloud','armor'].includes(m))part(m==='armor'?jewelGeo:ball,x,dorsal*.86,0,.24,h*.45,.29);
   else {const geom=['shard','ice','crystal','star'].includes(m)?jewelGeo:cone;
    part(geom,x,dorsal+h*.24,Math.sin(i*2)*.11,.12+(m==='sail'?.17:0),h,.13).rotation.z=.18+i*.07}}
 }
 const wrapper=group();wrapper.add(body);body.scale.set(art.length,art.height,.9+(id%5)*.075);
 const limbs=body.children.map(o=>({o,x:o.position.x,y:o.position.y,z:o.position.z,rx:o.rotation.x,ry:o.rotation.y,rz:o.rotation.z}));
 wrapper.userData={id,body,limbs,art};
 return wrapper;
}
function swim(model,time,intensity=1){
 if(!model)return;
 const {art,body,limbs}=model.userData;
 const t=time*art.beat+art.phase,w=Math.sin(t),g=art.gait;
 const pulse=['jet','pulse','bob'].includes(g),wide=g==='flap'||g==='skim',wave=g==='wave';
 const surge=g==='dart'||g==='bite'?Math.max(0,Math.sin(t))**5:0;
 body.rotation.z=(g==='wheel'?t*.3:g==='sound'?w*.19:g==='hover'?Math.sin(t*.7)*.14:w*.055+surge*.2)*intensity;
 body.rotation.x=wide?w*.16:g==='bank'||g==='school'?Math.sin(t*.7)*.26:0;
 body.position.y=(pulse?w*.22:wide?Math.cos(t)*.08:Math.sin(t*.65)*art.depth*.35)*intensity;
 body.position.x=(surge*.29+(g==='jet'?.21*Math.max(0,w):0))*intensity;
 body.scale.y=art.height*(1+(pulse?w*.12:0));
 for(const p of limbs){if(p.o.morphTargetInfluences){p.o.morphTargetInfluences[0]=Math.cos(t)*intensity;p.o.morphTargetInfluences[1]=Math.sin(t)*intensity}
  const back=Math.min(1,Math.max(0,-p.x)),bend=Math.sin(t+2*back);
  p.o.position.z=p.z+intensity*bend*back*(wave?.51:.16);
  p.o.rotation.y=p.ry+bend*back*(wave?.53:.27);
  p.o.rotation.x=p.rx+(wide?Math.sign(p.z)*Math.abs(p.z)*w*.79:pulse&&p.y<0?Math.cos(t+p.x)*.24:0);
  p.o.rotation.z=p.rz+(g==='wheel'?Math.sin(t+p.x*4)*.07:0);
 }
}
function roam(model,i,time){
 const a=model.userData.art,t=time*(.17+a.beat*.024)+a.phase,spread=6+i%4;
 model.position.set(Math.sin(t)*spread,-.08+Math.sin(t*2)*a.depth,-6-(i%5)*3+Math.cos(t)*(1+a.depth*3));
 model.rotation.y=Math.atan2(Math.sin(t)*(1+a.depth*3),Math.cos(t)*spread);
 swim(model,time);
}
const swimmers=names.slice(0,8).map((_,i)=>fish(i)),hook=group();shape(hook,ball,0xf94946,0,.18,0,.25,.35,.25);shape(hook,ball,0xfff4cc,0,.37,0,.19,.15,.19);
const line=new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(),new T.Vector3()]),new T.LineBasicMaterial({color:0x473a49}));scene.add(line);
let ring=new T.Mesh(new T.RingGeometry(.93,1,44),new T.MeshBasicMaterial({color:0xbffaff,transparent:true,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;scene.add(ring);
const KEY='reef-tycoon.save.v1',empty=()=>({coins:0,bank:0,strength:0,levels:Array(6).fill(1),claimDay:-1,streak:0,gear:1,rod:1,speed:1,bag:[],pads:Array(6).fill(null),seen:[],rewards:{},updated:0});let data=empty();try{data={...data,...JSON.parse(localStorage.getItem(KEY))}}catch{}let phase='idle',atBase=false,clock=0,elapsed=0,taps=0,luck=0,catchId=0,prize,goal=null,walking=false,flash=0,prev=performance.now(),sfx,autoSave=0;
function local(){try{localStorage.setItem(KEY,JSON.stringify(data))}catch{}}const sdk=bridge({read:()=>data,write:(p,cloud)=>{if(!cloud||phase==='idle'&&p.updated>data.updated){data={...empty(),...p};local();syncPads();if(cloud&&regions[data.region])travel(data.region)}},changed:e=>{if(e.type==='reward')say('Badge unlocked!')}});function save(){data.updated=Date.now();local();sdk.save()}function syncPads(){display.forEach(g=>scene.remove(g));display.length=0;data.pads.forEach((n,i)=>{if(n!==null){let g=fish(n);g.position.copy(pads[i]);display.push(g)}})}syncPads();
function say(s){$('spark').textContent=s;flash=1.5}function tone(f){try{sfx??=new AudioContext();sfx.resume();let o=sfx.createOscillator(),a=sfx.createGain();o.frequency.setValueAtTime(f,sfx.currentTime);o.frequency.exponentialRampToValueAtTime(f*1.3,sfx.currentTime+.09);a.gain.setValueAtTime(.035,sfx.currentTime);a.gain.exponentialRampToValueAtTime(.001,sfx.currentTime+.14);o.connect(a);a.connect(sfx.destination);o.start();o.stop(sfx.currentTime+.15)}catch{}}
function setPhase(p){phase=p;elapsed=0}function trip(base){atBase=base;goal=new T.Vector3(0,0,base?15:4);setPhase('walk')}function panel(title,html){$('panel').hidden=false;$('panel').innerHTML='<h2>'+title+'<button id="close">×</button></h2>'+html;$('close').onclick=()=>$('panel').hidden=true}
$('index').onclick=()=>panel('Fish Index · '+data.seen.length+'/12',names.map((n,i)=>'<span class="card" style="border-color:#'+colors[i].toString(16)+'">'+(data.seen.includes(i)?n:'???')+'<br>$'+rates[i]+'/s</span>').join(''));
$('shop').onclick=()=>{panel('Harbor Shop',['gear','rod','speed'].map((k,i)=>'<button data-k="'+k+'">'+['Weights','Fishing rod','Swim speed'][i]+' Lv.'+data[k]+'<br>$'+(data[k]*25)+'</button>').join('')+'<button id="train">Lift weights</button>');document.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{let k=b.dataset.k,c=data[k]*25;if(data.coins<c)return say('Collect cash at your base');data.coins-=c;data[k]++;save();tone(700);$('shop').click()});$('train').onclick=()=>{data.strength+=data.gear;hero.rotation.z=.14;say('+'+data.gear+' casting power');tone(260);save()}}
$('base').onclick=()=>{if(phase==='idle')trip(!atBase)};
$('act').onclick=()=>{tone(360+taps*12);if(phase==='idle'){if(atBase){if(data.bag.length){let i=data.pads.indexOf(null);if(i<0)i=data.pads.reduce((best,id,j)=>rates[id]<rates[data.pads[best]]?j:best,0);if(i>=0&&data.pads[i]!==null&&rates[data.pads[i]]>=rates[data.bag[0]]){data.coins+=rates[data.bag.shift()]*5;say('Fish sold')}else{data.pads[i]=data.bag.shift();data.levels[i]=1;syncPads();say('Display earning cash!')}}else{data.coins+=Math.floor(data.bank);data.bank-=Math.floor(data.bank);say('Cash collected!')}save();return}goal=null;taps=luck=0;catchId=Math.min(11,Math.floor(Math.random()*(3+data.rod)));sdk.prepare();sdk.start();setPhase('cast')}else if(phase==='swirl'){luck++;say('+'+luck+' Luck')}else if(phase==='reel'){reelImpulse=1;taps++;if(taps>=required()){startEscape()}}else if(phase==='escape'){escapeKick=Math.min(1,escapeKick+.48);tone(480)}};
const portraits=new Map();
function portrait(id){
 if(portraits.has(id))return portraits.get(id);
 const studio=new T.Scene(), key=new T.DirectionalLight(0xffffff,1.2);
 key.position.set(-2,4,5);studio.add(key,new T.HemisphereLight(0xfff5ce,0x7aa2c0,1.25));
 const model=fish(id);studio.add(model);model.rotation.y=-.42;swim(model,.25,.4);
 const cam=new T.PerspectiveCamera(42,1,.1,20);cam.position.set(0,.4,3.6);cam.lookAt(0,0,0);
 const previous=renderer.getSize(new T.Vector2());renderer.setSize(96,96,false);
 studio.background=null;renderer.setClearColor(0x000000,0);renderer.render(studio,cam);
 const image=renderer.domElement.toDataURL();renderer.setSize(previous.x,previous.y,false);portraits.set(id,image);return image;
}
const priceLabel=value=>value>=1000?Number((value/1000).toFixed(1))+'K':String(value);
const liveHabitats=group();
function travel(r){
 liveHabitats.clear();data.region=r;const region=regions[r];scene.background.setHex(region.sky);scene.fog.color.setHex(region.sky);materials.get(0x46cfee).color.setHex(region.water);
 for(let i=0;i<12;i++){const x=(i%2?1:-1)*(6+i%4*2.4),z=-4-i*2.3;
  if(r===1){block(liveHabitats,region.stone,x,1,z,.8,3,.8);block(liveHabitats,region.stone,x+2,1,z,.8,3,.8);block(liveHabitats,0xf4d89a,x+1,2.6,z,3,.65,1)}
  else if(r===4){shape(liveHabitats,ball,0xe3d7f8,x,1,z,1.3,1.3,1.3);shape(liveHabitats,cone,0xb1a3d8,x-.6,.6,z,.7,2,.7)}
  else{const h=r===3?3.5:r===2?2:.9;shape(liveHabitats,cone,region.stone,x,.35,z,.65,h,.65);shape(liveHabitats,ball,r===2?0x65ffd3:r===5?0xc7eaff:0xffaf85,x,.6+h*.38,z,.26,.18,.26)}
 }
 swimmers.forEach(o=>scene.remove(o));swimmers.length=0;
 const local=roster.filter(f=>f.r===r);for(let i=0;i<8;i++)swimmers.push(fish(local[Math.floor(i*local.length/8)].id));
}
let indexGroup=0;
function openBook(r=data.region||0,tier=0){
 const region=regions[r],cards=roster.filter(f=>f.r===r&&f.tier===tier),tabs=regions.map((v,i)=>'<button class="fieldTab" aria-pressed="'+(r===i)+'" data-region="'+i+'">'+v.name+'</button>').join('');
 const groups=region.groups.map(([band],i)=>'<option value="'+i+'" '+(tier===i?'selected':'')+'>'+band+'</option>').join('');
 panel('Fish Index · '+data.seen.length+'/100','<div class="fieldLayout"><nav>'+tabs+'</nav><article class="fieldBody"><select id="band">'+groups+'</select><b class=bandCount>'+cards.filter(f=>data.seen.includes(f.id)).length+'/'+cards.length+'</b><div class="entries">'+cards.map(f=>'<div class="entry"><b>'+(data.seen.includes(f.id)?f.name:'???')+'</b><img alt="" style="filter:'+(data.seen.includes(f.id)?'none':'brightness(.18)')+'" src="'+portrait(f.id)+'"><strong>$'+priceLabel(rates[f.id])+'/s</strong></div>').join('')+'</div></article></div><div class="fieldFooter"><button id="sail">Fish '+region.name+'</button></div>');
 document.querySelectorAll('[data-region]').forEach(b=>b.onclick=()=>openBook(+b.dataset.region));$('band').onchange=e=>openBook(r,+e.target.value);
 $('sail').onclick=()=>{if(phase!=='idle')return;travel(r);save();$('panel').hidden=true;trip(false);say(region.name)};
}
$('index').onclick=()=>openBook();
function rollInWater(random=Math.random){
 const local=roster.filter(f=>f.r===(data.region||0));
 // Every fish has positive odds. Training and luck bias the roll toward the later bands.
 const weights=local.map(f=>(1+Math.min(castBand()+luck*.08,8)*f.tier*.25)/(1+f.slot*.08+f.tier*2));
 let pick=random()*weights.reduce((a,b)=>a+b,0);
 for(let i=0;i<local.length;i++){pick-=weights[i];if(pick<0)return local[i].id}return local.at(-1).id;
}

const openShop=$('shop').onclick;
$('shop').onclick=()=>{openShop();const labels=['Weights','Fishing rod','Swim speed'];document.querySelectorAll('[data-k]').forEach((button,i)=>{
 const k=button.dataset.k,level=data[k];
 button.className='shopCard';button.innerHTML='<b>'+labels[i]+'</b><i class="tool tool'+i+'"></i><small>Lv. '+level+'</small><strong>$'+(level*25)+'</strong>';
 });};
let reelImpulse=0;let hunter=null,lead=0,shore=0,escapeKick=0;
function startEscape(){
 setPhase('escape');lead=3.6;shore=8;escapeKick=.75;
 hunter=fish(9);hunter.scale.set(2.2,1.6,1.7);
 say('Shark! Swim to shore');
}
function finishEscape(won){
 scene.remove(hunter);hunter=null;sdk.end();
 if(won){
  data.bag.push(catchId);if(!data.seen.includes(catchId))data.seen.push(catchId);
  save();setPhase('reveal');tone(960);say(names[catchId]+' · $'+rates[catchId]+'/s');
 }else{
  scene.remove(prize);prize=null;setPhase('idle');tone(140);say('The shark took your fish!');
 }
}
const waterBands=['Common','Uncommon','Rare','Epic','Legendary','Mythic','Secret','Divine'];
function castBand(){return Math.min(7,Math.floor(Math.sqrt(data.strength/12)),data.rod-1)}
function castDepth(){return 6+castBand()*3.3+Math.min(2,data.strength*.02)}
function required(){return Math.max(4,7+byId.get(catchId).tier*3+Math.min(6,byId.get(catchId).slot)-Math.floor(data.strength/30))}
renderer.domElement.onpointerdown=e=>{if(!$('panel').hidden)return;if(phase!=='idle'){if(phase==='swirl'||phase==='reel'||phase==='escape')$('act').click();return}let ray=new T.Raycaster();ray.setFromCamera({x:e.clientX/innerWidth*2-1,y:1-e.clientY/innerHeight*2},camera);let p=new T.Vector3();if(ray.ray.intersectPlane(new T.Plane(new T.Vector3(0,1,0),0),p)){p.x=Math.max(-25,Math.min(25,p.x));p.z=Math.max(3,Math.min(27,p.z));goal=p}};
$('daily').onclick=()=>{
 const day=Math.floor(Date.now()/86400000),claimed=data.claimDay===day;
 const step=claimed?data.streak:data.claimDay===day-1?data.streak%7+1:1;
 panel('Daily rewards',Array.from({length:7},(_,i)=>'<span class="card">Day '+(i+1)+'<br>$'+((i+1)*25)+'</span>').join('')+'<button id="claimDay">'+(claimed?'Claimed today':'Claim day '+step)+'</button>');
 $('claimDay').disabled=claimed;
 $('claimDay').onclick=()=>{if(data.claimDay===day)return;data.claimDay=day;data.streak=step;data.coins+=25*step;save();tone(900);$('daily').click()};
};
function manageStands(){
 panel('Fish stands',data.pads.map((id,i)=>id===null?'<span class="card">Empty stand</span>':'<button data-stand="'+i+'">'+names[id]+' · Lv.'+data.levels[i]+'<br>Upgrade $'+(rates[id]*10*data.levels[i])+'</button>').join(''));
 document.querySelectorAll('[data-stand]').forEach(button=>button.onclick=()=>{let i=Number(button.dataset.stand),cost=rates[data.pads[i]]*10*data.levels[i];if(data.coins<cost)return say('Collect more cash');data.coins-=cost;data.levels[i]++;save();tone(790);manageStands()});
}
$('stands').onclick=manageStands;
function size(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()}onresize=size;size();camera.position.set(3,5,13);
const spray = Array.from({length:48},(_,i)=>shape(scene,ball,i%4===0?0xffa4ff:0xb6ffff,0,0,0,.06,.09,.06));
const wakes=Array.from({length:3},()=>{const m=new T.Mesh(ring.geometry,ring.material.clone());m.rotation.x=-Math.PI/2;scene.add(m);return m});
function splash(active){
 wakes.forEach((wave,i)=>{
  wave.visible=active;
  if(!active)return;
  const age=(clock*(phase==='swirl'?1.5:1)+i/3)%1;
  const center=phase==='escape'&&i===1&&hunter?hunter.position:phase==='escape'||phase==='reveal'?hero.position:hook.position;
  wave.position.set(center.x,.175+i*.008,center.z);
  wave.scale.setScalar(.3+age*(phase==='escape'?1.1:2.4));
  wave.material.opacity=(1-age)*.72;
 });
  spray.forEach((drop,i)=>{
    drop.visible=active;
    if(!active)return;
    const age=(clock*(phase==='reveal'?1.4:.85)+i*.137)%1;
    const angle=i*2.4, radius=age*(phase==='reveal'?3:1.3);
    const source=phase==='escape'&&hunter?(i%2?hunter.position:hero.position):phase==='reveal'&&prize?prize.position:hook.position;
    drop.position.set(source.x+Math.cos(angle)*radius,.28+Math.sin(age*Math.PI)*(1+i%4*.4),source.z+Math.sin(angle)*radius);
    drop.scale.setScalar((1-age)*.12+.02);
  });
}
const lagoonMaterial=materials.get(0x46cfee);
lagoonMaterial.transparent=true;lagoonMaterial.opacity=.69;lagoonMaterial.depthWrite=false;
const seabed=block(scene,0x4ea5cc,0,-1.65,-17,58,.4,39);
const waterStuds=new T.InstancedMesh(box,new T.MeshStandardMaterial({color:0x4094bc}),36*24);
const stamp=new T.Object3D();let stud=0;
for(let row=0;row<24;row++)for(let col=0;col<36;col++){
 stamp.position.set((col-17.5)*1.58,-1.42,-35.3+row*1.58);
 stamp.scale.set(.57,.13,.57);stamp.updateMatrix();waterStuds.setMatrixAt(stud++,stamp.matrix);
}
scene.add(waterStuds);
for(let i=0;i<16;i++){
 const x=(i%2?1:-1)*(8+i%6*2),z=-3-i*1.9;
 for(let n=0;n<3;n++){const weed=block(scene,n===1?0x438775:0x327b68,x+n*.3,-.86,z,.15,1+n*.25,.19);weed.rotation.z=(n-1)*.24}
}
const joystick=document.createElement('div');joystick.id='stick';joystick.innerHTML='<i></i>';document.body.append(joystick);
let stickId=null,stickX=0,stickY=0;
function stickMove(e){
 const rect=joystick.getBoundingClientRect(),radius=rect.width/2;
 const x=(e.clientX-rect.left-radius)/radius,y=(e.clientY-rect.top-radius)/radius,length=Math.max(1,Math.hypot(x,y));
 stickX=x/length;stickY=y/length;joystick.firstChild.style.transform='translate('+stickX*19+'px,'+stickY*19+'px)';
}
joystick.onpointerdown=e=>{if(stickId!==null)return;e.preventDefault();stickId=e.pointerId;joystick.setPointerCapture(stickId);stickMove(e)};
joystick.onpointermove=e=>{if(e.pointerId===stickId)stickMove(e)};
joystick.onlostpointercapture=()=>{stickId=null;stickX=stickY=0;joystick.firstChild.style.transform='none';if(phase==='idle')goal=null};

const castTrail=new T.Line(new T.BufferGeometry().setFromPoints(Array.from({length:18},()=>new T.Vector3())),new T.LineBasicMaterial({color:0xffe882,transparent:true,opacity:.9}));castTrail.frustumCulled=false;scene.add(castTrail);
function updateCastTrail(){
 castTrail.visible=phase==='cast';if(!castTrail.visible)return;
 const progress=Math.min(1,elapsed/.9),points=castTrail.geometry.attributes.position;
 for(let i=0;i<18;i++){
  const t=Math.max(0,progress-(17-i)*.012);
  points.setXYZ(i,hero.position.x,1+Math.sin(t*Math.PI)*5,(hero.position.z-1)*(1-t)-castDepth()*t);
 }
 points.needsUpdate=true;
}
const glints=group();for(let i=0;i<14;i++){const angle=i*Math.PI/7;let ray=block(glints, i%2?0xffdf73:0xc6fbff,Math.cos(angle),Math.sin(angle),0,.055,.52,.055);ray.rotation.z=angle-Math.PI/2}
function updateCatchGlints(){
 glints.visible=phase==='reveal'&&Boolean(prize);if(!glints.visible)return;
 glints.position.copy(prize.position);glints.quaternion.copy(camera.quaternion);glints.rotateZ(elapsed*.65);
 glints.scale.setScalar(1+Math.sin(elapsed*4)*.16);
}
for(let i=0;i<4;i++){const cloud=group();cloud.position.set(-27+i*18,12+(i%2)*3,-45);for(let j=0;j<3;j++)block(cloud,0xf3fbff,j*1.9,Math.sin(j)*.5,0,3.6,1.15+j*.15,2.1)}
for(let i=0;i<7;i++)block(scene,0xb78c57,19,.28,3-i*.64,3,.26,.58);
for(let i=0;i<4;i++)block(scene,0x765436,17.6+i%2*2.8,-.1,3-Math.floor(i/2)*3.8,.28,1.9,.28);

function frame(now){requestAnimationFrame(frame);let dt=Math.min(.06,(now-prev)/1000);prev=now;if(document.hidden)return;clock+=dt;elapsed+=dt;flash-=dt;if(flash<=0)$('spark').textContent='';let income=data.pads.reduce((sum,id,i)=>sum+(id===null?0:rates[id]*data.levels[i]),0);data.bank+=income*dt;if((autoSave+=dt)>8){autoSave=0;if(income)save()}joystick.hidden=phase!=='idle'||!$('panel').hidden;
 if(stickId!==null&&!joystick.hidden)goal=new T.Vector3(Math.max(-25,Math.min(25,hero.position.x+stickX*2)),0,Math.max(3,Math.min(27,hero.position.z+stickY*2)));
 walking=false;if(goal){let d=goal.clone().sub(hero.position),dist=d.length();if(dist<.15){goal=null;if(phase==='walk')setPhase('idle')}else{walking=true;hero.rotation.y=Math.atan2(-d.x,-d.z);hero.position.addScaledVector(d.normalize(),Math.min(dist,dt*(5+data.speed)));atBase=hero.position.z>12}}hero.rotation.z*=.9;legs.forEach((l,i)=>l.rotation.x=walking?Math.sin(clock*12+i*Math.PI)*.55:0);swimmers.forEach((g,i)=>roam(g,i,clock));display.forEach((g,i)=>{g.rotation.y=Math.sin(clock*.55+i)*.25;swim(g,clock,.65)});
 let fishing=!['idle','walk'].includes(phase),cx=hero.position.x,cz=hero.position.z;hook.visible=line.visible=ring.visible=fishing;let view=new T.Vector3(cx+2.8,4.7,cz+8),look=new T.Vector3(cx,1,cz-2);if(fishing){let x=cx,z=-castDepth();if(phase==='cast'){let t=Math.min(1,elapsed/.9);hook.position.set(x,1+Math.sin(t*Math.PI)*5,(cz-1)*(1-t)+z*t);if(t===1)setPhase('swirl')}else hook.position.set(x,.42+Math.sin(clock*6)*.16,z);if(phase==='swirl'&&elapsed>2.9){catchId=rollInWater();prize=fish(catchId);setPhase('reel')}if(prize){swim(prize,clock*1.6);prize.position.copy(hook.position);prize.position.y+=phase==='reveal'?2+Math.sin(elapsed*3)*.6:1;prize.rotation.y=clock*(phase==='reveal'?3:1);prize.rotation.z=Math.sin(clock*9)*.16}if(phase==='reveal'&&elapsed>2){scene.remove(prize);prize=null;trip(true)}look.copy(hook.position);look.y+=.7;reelImpulse=Math.max(0,reelImpulse-dt*4);
 if(phase==='cast'){
   const travel=Math.min(1,elapsed/.9);view.set(x+6*(1-travel),3.5+Math.sin(travel*Math.PI)*4,cz+5+(z-cz)*travel);
 }else if(phase==='reveal'){
   prize?.position.set(cx+.7,3.4+Math.sin(elapsed*3)*.22,cz);
   view.set(cx+2.5,1.1,cz+5);look.set(cx,2.4,cz);
 }else{if(phase==='reel'){
   view.set(x+.45+reelImpulse*.1,1.22,z+4.9-reelImpulse*.45);look.y+=.33;
   prize.position.y+=Math.sin(clock*7)*.12+reelImpulse*.38;
 }else{
   const impact=Math.max(0,1-elapsed/.48);
   view.set(x+.26,1.38+impact*.45,z+4.8+impact*.8);
 }}
 let pos=line.geometry.attributes.position;pos.setXYZ(0,cx+.7,2.4,cz-1);pos.setXYZ(1,...hook.position.toArray());pos.needsUpdate=true;line.frustumCulled=false;ring.position.set(x,.17,z);let t=(clock*1.5)%1;ring.scale.setScalar(.5+t*2.6);ring.material.opacity=1-t}
if(phase==='escape'){
 const swimSpeed=1.2+escapeKick*2.8+Math.min(10,data.speed)*.12;
 escapeKick=Math.max(0,escapeKick-dt*.95);shore-=swimSpeed*dt;lead+=(swimSpeed-2.85)*dt;
 const z=2-shore;hero.position.z=z;hero.rotation.y=Math.PI;
 legs.forEach((leg,i)=>leg.rotation.x=Math.sin(clock*11+i*Math.PI)*.65);
 swim(hunter,clock*1.35);hunter.position.set(cx+.3,.32,z-lead);hunter.rotation.y=-Math.PI/2+Math.sin(clock*8)*.10;
 prize.position.set(cx+.7,1.25,z);const risk=Math.max(0,1-lead/3.6);
 view.set(cx+2.1+Math.sin(clock*9)*.09*risk,1.56+risk*.42,z+5.5);
 look.set(cx,.8,z-1.2-risk*.6);
 line.visible=hook.visible=false;ring.position.set(cx,.18,z);ring.visible=true;
 if(shore<=0||lead<=.45){hero.position.z=4;finishEscape(shore<=0)}
}
$('luckBar').hidden=phase!=='swirl';
 if(phase==='swirl')$('luckFill').style.width=Math.min(100,12+luck*8)+'%';
 document.body.dataset.phase=phase;
 $('gaugeRead').textContent=taps+' / '+required();
 $('dangerEdge').style.opacity=phase==='escape'?String(Math.min(.75,Math.max(0,(3.6-lead)/3.6))):'0';
 document.body.classList.toggle('reading',!$('panel').hidden);
 splash(fishing&&phase!=='cast');camera.position.lerp(view,1-Math.exp(-dt*5));camera.lookAt(look);const targetFov=phase==='escape'?66:phase==='reveal'?43:53;
 camera.fov+=(targetFov-camera.fov)*(1-Math.exp(-dt*7));camera.updateProjectionMatrix();$('meter').hidden=phase!=='reel';$('needle').style.transform='rotate('+(-85+170*taps/required())+'deg)';$('hint').textContent=({escape:'Shark behind you! Tap to swim',cast:'Casting…',swirl:waterBands[castBand()]+' water · Tap for luck!',reel:names[catchId]+' · $'+rates[catchId]+'/s',reveal:'Catch landed!',walk:'Follow the path',idle:atBase?(data.bag.length?'Place your fish on a stand':'Collect your earnings'):'Cast into the lagoon'})[phase];$('act').textContent=({idle:atBase?(data.bag.length?'Place fish':'Collect $'+Math.floor(data.bank)):'Cast line',cast:'Casting…',escape:'Swim! '+Math.max(0,Math.ceil(shore))+' m',swirl:'Tap · + Luck',reel:'Reel! '+taps+'/'+required(),reveal:'Caught!',walk:'Walking…'})[phase];$('base').textContent=atBase?'Lagoon':'My Base';$('stands').hidden=!atBase||phase!=='idle';for(let id of ['shop','base','index','daily'])$(id).hidden=fishing||phase==='walk';$('wallet').innerHTML='$'+Math.floor(data.coins)+'<br>+'+income+'/s';updateCastTrail();updateCatchGlints();renderer.render(scene,camera)}
travel(regions[data.region]?data.region:0);requestAnimationFrame(frame);addEventListener('pagehide',()=>{local();sdk.end();sdk.stop()});

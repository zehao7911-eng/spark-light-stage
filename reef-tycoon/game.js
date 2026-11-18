const $=id=>document.getElementById(id),T=THREE,scene=new T.Scene(),camera=new T.PerspectiveCamera(53,1,.1,200),renderer=new T.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(1.7,devicePixelRatio));document.body.prepend(renderer.domElement);scene.background=new T.Color(0x88dcff);scene.fog=new T.FogExp2(0xace8ff,.012);scene.add(new T.HemisphereLight(0xfff9da,0x84a2b6,1.15));let sun=new T.DirectionalLight(0xffedd4,1.1);sun.position.set(-9,18,8);scene.add(sun);
const box=new T.BoxGeometry(),ball=new T.SphereGeometry(1,12,9),cone=new T.ConeGeometry(1,1,5),materials=new Map();
function shape(parent,geo,color,x,y,z,w,h,d){if(!materials.has(color))materials.set(color,new T.MeshStandardMaterial({color,roughness:.76}));const o=new T.Mesh(geo,materials.get(color));o.scale.set(w,h,d);o.position.set(x,y,z);parent.add(o);return o}
const block=(...a)=>shape(a[0],box,...a.slice(1));function group(parent=scene){let g=new T.Group();parent.add(g);return g}
function label(str,x,y,z,size){let c=document.createElement('canvas');c.width=512;c.height=96;let a=c.getContext('2d');a.textAlign='center';a.font='900 53px Arial';a.lineWidth=9;a.strokeStyle='#182b39';a.strokeText(str,256,65);a.fillStyle='#fff7c0';a.fillText(str,256,65);let t=new T.CanvasTexture(c),s=new T.Sprite(new T.SpriteMaterial({map:t}));s.position.set(x,y,z);s.scale.set(size,size*.188,1);scene.add(s)}
block(scene,0xe8c97f,0,-.6,0,115,.8,110);block(scene,0x46cfee,0,-.12,-17,58,.45,39);block(scene,0x62cc40,0,-.16,23,56,.5,21);
for(let i=0;i<30;i++){let x=(i%15-7)*4.5,z=i<15?-42:40,h=5+(i*7%5)+Math.sin(i)*1.5;block(scene,0xbb7846,x,h/2-1,z,4.6,h,7);block(scene,0x64c740,x,h-1,z,4.7,.75,7.2);if(i%3===0){block(scene,0x86552d,x,h+.8,z,.7,4,.7);for(let j=0;j<6;j++){let fr=block(scene,0x339647,x+Math.cos(j)*1.4,h+2.6,z+Math.sin(j)*1.4,3.6,.5,1);fr.rotation.y=-j}}}
for(let i=0;i<25;i++){let x=Math.sin(i*17)*27,z=-3-(i*7%32);block(scene,0x86ebef,x,.13,z,1.3,.025,.09)}
for(let i=0;i<3;i++){let x=12+i*5;block(scene,0xae7941,x,1.1,9,4,2,2);for(let j=0;j<6;j++)block(scene,j%2?0xffedb8:[0x427bea,0x41bb66,0xeaa92f][i],x-2+j*.8,3.1,9,.82,.35,3.3);label(['WEIGHTS','RODS','UPGRADES'][i],x,4.1,9,6)}
const pads=[],display=[];for(let i=0;i<6;i++){let x=(i%3-1)*4.2,z=17+Math.floor(i/3)*5;block(scene,0xd6dcea,x,.15,z,3.9,.45,3.7);block(scene,0xfed847,x,.4,z,3.35,.12,3);block(scene,0x28354c,x,.52,z,3.1,.14,2.7);block(scene,0x61df2b,x,.3,z+1.9,2.7,.25,.65);pads.push(new T.Vector3(x,1.5,z))}
label('YOUR BASE',0,4,24,9);
let hero=group(),legs=[];block(hero,0x263549,0,1.4,0,.98,1.05,.58);block(hero,0xffce97,0,2.25,0,.76,.74,.7);for(let k of [-1,1]){block(hero,0xffcb96,k*.66,1.4,0,.34,.85,.4);legs.push(block(hero,0x243951,k*.27,.47,0,.45,.9,.48));block(hero,0x273146,k*.16,2.29,-.36,.08,.09,.025)}hero.position.set(0,0,5);const rod=block(hero,0x855132,.9,2,-.75,.09,.1,3);rod.rotation.x=.65;
const names=['Rose Star','Blue Tang','Sun Puffer','Reef Clown','Mossback','Violet Seahorse','Spikejaw','Moon Ray','Aurora Koi','Crown Shark','Ember Nautilus','Cosmic Whale'],rates=[2,4,8,14,40,50,290,410,640,1050,1800,3000],colors=[0xff7eaa,0x38b8ff,0xffa12e,0xff6536,0xb6bd4b,0xb273ee,0x3889c7,0x79d8d9,0xff9988,0x6e86ae,0xf08d50,0x9273ce];
function fish(id){let g=group(),c=colors[id];if(id===0){shape(g,ball,c,0,0,0,.55,.5,.24);for(let i=0;i<5;i++){let a=i*Math.PI*.4;shape(g,cone,c,-Math.sin(a)*.55,Math.cos(a)*.55,0,.37,.9,.3).rotation.z=a}}else{let h=[.55,.72,.8,.6,.66,.94,.55,.23,.59,.56,.85,.73][id];shape(g,ball,c,0,0,0,1,h,id===7?.92:.48);let t=shape(g,cone,c,-1.03,0,0,.62,.82,.32);t.rotation.z=-Math.PI/2;shape(g,cone,c,-.15,h,0,.31,.52,.17);if(id===2||id===6)for(let i=0;i<7;i++)shape(g,cone,0xffdf8d,Math.cos(i)*.8,Math.sin(i)*h,.23,.11,.29,.1);if(id===3||id===8)for(let x of [-.4,.23])shape(g,ball,0xffe7c5,x,0,0,.12,h+.01,.49)}for(let k of [-1,1])shape(g,ball,0x1c2538,id===0?k*.2:.54,.12,id===0?.24:k*.38,.1,.12,.08);return g}
const swimmers=names.map((_,i)=>fish(i)),hook=group();shape(hook,ball,0xf94946,0,.18,0,.25,.35,.25);shape(hook,ball,0xfff4cc,0,.37,0,.19,.15,.19);
const line=new T.Line(new T.BufferGeometry().setFromPoints([new T.Vector3(),new T.Vector3()]),new T.LineBasicMaterial({color:0x473a49}));scene.add(line);
let ring=new T.Mesh(new T.RingGeometry(.93,1,44),new T.MeshBasicMaterial({color:0xbffaff,transparent:true,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;scene.add(ring);
const KEY='reef-tycoon.save.v1',empty=()=>({coins:0,bank:0,strength:0,levels:Array(6).fill(1),claimDay:-1,streak:0,gear:1,rod:1,speed:1,bag:[],pads:Array(6).fill(null),seen:[],rewards:{},updated:0});let data=empty();try{data={...data,...JSON.parse(localStorage.getItem(KEY))}}catch{}let phase='idle',atBase=false,clock=0,elapsed=0,taps=0,luck=0,catchId=0,prize,goal=null,walking=false,flash=0,prev=performance.now(),sfx,autoSave=0;
function local(){try{localStorage.setItem(KEY,JSON.stringify(data))}catch{}}const sdk=bridge({read:()=>data,write:(p,cloud)=>{if(!cloud||phase==='idle'&&p.updated>data.updated){data={...empty(),...p};local();syncPads()}},changed:e=>{if(e.type==='reward')say('Badge unlocked!')}});function save(){data.updated=Date.now();local();sdk.save()}function syncPads(){display.forEach(g=>scene.remove(g));display.length=0;data.pads.forEach((n,i)=>{if(n!==null){let g=fish(n);g.position.copy(pads[i]);display.push(g)}})}syncPads();
function say(s){$('spark').textContent=s;flash=1.5}function tone(f){try{sfx??=new AudioContext();sfx.resume();let o=sfx.createOscillator(),a=sfx.createGain();o.frequency.setValueAtTime(f,sfx.currentTime);o.frequency.exponentialRampToValueAtTime(f*1.3,sfx.currentTime+.09);a.gain.setValueAtTime(.035,sfx.currentTime);a.gain.exponentialRampToValueAtTime(.001,sfx.currentTime+.14);o.connect(a);a.connect(sfx.destination);o.start();o.stop(sfx.currentTime+.15)}catch{}}
function setPhase(p){phase=p;elapsed=0}function trip(base){atBase=base;goal=new T.Vector3(0,0,base?15:4);setPhase('walk')}function panel(title,html){$('panel').hidden=false;$('panel').innerHTML='<h2>'+title+'<button id="close">×</button></h2>'+html;$('close').onclick=()=>$('panel').hidden=true}
$('index').onclick=()=>panel('Fish Index · '+data.seen.length+'/12',names.map((n,i)=>'<span class="card" style="border-color:#'+colors[i].toString(16)+'">'+(data.seen.includes(i)?n:'???')+'<br>$'+rates[i]+'/s</span>').join(''));
$('shop').onclick=()=>{panel('Harbor Shop',['gear','rod','speed'].map((k,i)=>'<button data-k="'+k+'">'+['Weights','Fishing rod','Swim speed'][i]+' Lv.'+data[k]+'<br>$'+(data[k]*25)+'</button>').join('')+'<button id="train">Lift weights</button>');document.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{let k=b.dataset.k,c=data[k]*25;if(data.coins<c)return say('Collect cash at your base');data.coins-=c;data[k]++;save();tone(700);$('shop').click()});$('train').onclick=()=>{data.strength+=data.gear;hero.rotation.z=.14;say('+'+data.gear+' casting power');tone(260);save()}}
$('base').onclick=()=>{if(phase==='idle')trip(!atBase)};
$('act').onclick=()=>{tone(360+taps*12);if(phase==='idle'){if(atBase){if(data.bag.length){let i=data.pads.indexOf(null);if(i<0)i=data.pads.indexOf(Math.min(...data.pads));if(i>=0&&data.pads[i]!==null&&rates[data.pads[i]]>=rates[data.bag[0]]){data.coins+=rates[data.bag.shift()]*5;say('Fish sold')}else{data.pads[i]=data.bag.shift();data.levels[i]=1;syncPads();say('Display earning cash!')}}else{data.coins+=Math.floor(data.bank);data.bank-=Math.floor(data.bank);say('Cash collected!')}save();return}goal=null;taps=luck=0;catchId=Math.min(11,Math.floor(Math.random()*(3+data.rod)));sdk.prepare();sdk.start();setPhase('cast')}else if(phase==='swirl'){luck++;say('+'+luck+' Luck')}else if(phase==='reel'){taps++;if(taps>=required()){setPhase('reveal');data.bag.push(catchId);if(!data.seen.includes(catchId))data.seen.push(catchId);save();sdk.end();tone(960);say(names[catchId]+' · $'+rates[catchId]+'/s')}}};
const portraits=new Map();
function portrait(id){
 if(portraits.has(id))return portraits.get(id);
 const studio=new T.Scene(), key=new T.DirectionalLight(0xffffff,1.2);
 key.position.set(-2,4,5);studio.add(key,new T.HemisphereLight(0xfff5ce,0x7aa2c0,1.25));
 const model=fish(id);studio.add(model);model.rotation.y=-.35;
 const cam=new T.PerspectiveCamera(42,1,.1,20);cam.position.set(0,.4,3.6);cam.lookAt(0,0,0);
 const previous=renderer.getSize(new T.Vector2());renderer.setSize(96,96,false);
 studio.background=new T.Color(0x33485c);renderer.render(studio,cam);
 const image=renderer.domElement.toDataURL();renderer.setSize(previous.x,previous.y,false);portraits.set(id,image);return image;
}
$('index').onclick=()=>{
 panel('Fish Index · '+data.seen.length+'/12',names.map((name,id)=>{
 const owned=data.seen.includes(id);
 return '<span class="fishCard"><img style="filter:'+ (owned?'none':'brightness(.12)')+'" src="'+portrait(id)+'"><b>'+(owned?name:'???')+'</b><small>$'+rates[id]+'/s</small></span>';
 }).join(''));
};
const openShop=$('shop').onclick;
$('shop').onclick=()=>{openShop();const labels=['Weights','Fishing rod','Swim speed'];document.querySelectorAll('[data-k]').forEach((button,i)=>{
 const k=button.dataset.k,level=data[k];
 button.className='shopCard';button.innerHTML='<b>'+labels[i]+'</b><i class="tool tool'+i+'"></i><small>Lv. '+level+'</small><strong>$'+(level*25)+'</strong>';
 });};
function required(){return Math.max(4,7+catchId-Math.floor(data.strength/30))}
renderer.domElement.onpointerdown=e=>{if(phase!=='idle'){if(phase==='swirl'||phase==='reel')$('act').click();return}let ray=new T.Raycaster();ray.setFromCamera({x:e.clientX/innerWidth*2-1,y:1-e.clientY/innerHeight*2},camera);let p=new T.Vector3();if(ray.ray.intersectPlane(new T.Plane(new T.Vector3(0,1,0),0),p)){p.x=Math.max(-25,Math.min(25,p.x));p.z=Math.max(3,Math.min(27,p.z));goal=p}};
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
function splash(active){
  spray.forEach((drop,i)=>{
    drop.visible=active;
    if(!active)return;
    const age=(clock*(phase==='reveal'?1.4:.85)+i*.137)%1;
    const angle=i*2.4, radius=age*(phase==='reveal'?3:1.3);
    drop.position.set(hook.position.x+Math.cos(angle)*radius,.28+Math.sin(age*Math.PI)*(1+i%4*.4),hook.position.z+Math.sin(angle)*radius);
    drop.scale.setScalar((1-age)*.12+.02);
  });
}
function frame(now){requestAnimationFrame(frame);let dt=Math.min(.06,(now-prev)/1000);prev=now;if(document.hidden)return;clock+=dt;elapsed+=dt;flash-=dt;if(flash<=0)$('spark').textContent='';let income=data.pads.reduce((sum,id,i)=>sum+(id===null?0:rates[id]*data.levels[i]),0);data.bank+=income*dt;if((autoSave+=dt)>8){autoSave=0;if(income)save()}walking=false;if(goal){let d=goal.clone().sub(hero.position),dist=d.length();if(dist<.15){goal=null;if(phase==='walk')setPhase('idle')}else{walking=true;hero.rotation.y=Math.atan2(-d.x,-d.z);hero.position.addScaledVector(d.normalize(),Math.min(dist,dt*(5+data.speed)));atBase=hero.position.z>12}}hero.rotation.z*=.9;legs.forEach((l,i)=>l.rotation.x=walking?Math.sin(clock*12+i*Math.PI)*.55:0);swimmers.forEach((g,i)=>{g.position.set(Math.sin(clock*.23+i*3)*10,-.05+Math.sin(clock*2+i)*.18,-6-(i%5)*3);g.rotation.y=Math.cos(clock*.23+i*3)<0?Math.PI:0});display.forEach((g,i)=>g.rotation.y=Math.sin(clock+i)*.3);
let fishing=!['idle','walk'].includes(phase),cx=hero.position.x,cz=hero.position.z;hook.visible=line.visible=ring.visible=fishing;let view=new T.Vector3(cx+2.8,4.7,cz+8),look=new T.Vector3(cx,1,cz-2);if(fishing){let x=cx,z=-7-data.rod*.65-Math.min(8,data.strength*.02);if(phase==='cast'){let t=Math.min(1,elapsed/.9);hook.position.set(x,1+Math.sin(t*Math.PI)*5,(cz-1)*(1-t)+z*t);if(t===1)setPhase('swirl')}else hook.position.set(x,.42+Math.sin(clock*6)*.16,z);if(phase==='swirl'&&elapsed>2.3){catchId=Math.min(11,catchId+Math.floor(Math.random()*(luck+1)/2));prize=fish(catchId);setPhase('reel')}if(prize){prize.position.copy(hook.position);prize.position.y+=phase==='reveal'?2+Math.sin(elapsed*3)*.6:1;prize.rotation.y=clock*(phase==='reveal'?3:1);prize.rotation.z=Math.sin(clock*9)*.16}if(phase==='reveal'&&elapsed>2){scene.remove(prize);prize=null;trip(true)}view.set(x+1,phase==='cast'?5:2.5,z+6);look.copy(hook.position);look.y+=.7;let pos=line.geometry.attributes.position;pos.setXYZ(0,cx+.7,2.4,cz-1);pos.setXYZ(1,...hook.position.toArray());pos.needsUpdate=true;line.frustumCulled=false;ring.position.set(x,.17,z);let t=(clock*1.5)%1;ring.scale.setScalar(.5+t*2.6);ring.material.opacity=1-t}
splash(fishing&&phase!=='cast');camera.position.lerp(view,1-Math.exp(-dt*5));camera.lookAt(look);$('meter').hidden=phase!=='reel';$('needle').style.transform='rotate('+(-85+170*taps/required())+'deg)';$('hint').textContent=({cast:'Casting…',swirl:'Tap the splash for luck!',reel:names[catchId]+' · $'+rates[catchId]+'/s',reveal:'Catch landed!',walk:'Follow the path',idle:atBase?(data.bag.length?'Place your fish on a stand':'Collect your earnings'):'Cast into the lagoon'})[phase];$('act').textContent=({idle:atBase?(data.bag.length?'Place fish':'Collect $'+Math.floor(data.bank)):'Cast line',cast:'Casting…',swirl:'+ Luck',reel:'Reel! '+taps+'/'+required(),reveal:'Caught!',walk:'Walking…'})[phase];$('base').textContent=atBase?'Lagoon':'My Base';$('stands').hidden=!atBase||phase!=='idle';for(let id of ['shop','base','index','daily'])$(id).hidden=fishing||phase==='walk';$('wallet').innerHTML='$'+Math.floor(data.coins)+'<br>+'+income+'/s';renderer.render(scene,camera)}
requestAnimationFrame(frame);addEventListener('pagehide',()=>{local();sdk.end();sdk.stop()});

const $=id=>document.getElementById(id),T=THREE,scene=new T.Scene(),camera=new T.PerspectiveCamera(53,1,.1,200),renderer=new T.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(1.7,devicePixelRatio));document.body.prepend(renderer.domElement);scene.background=new T.Color(0x88dcff);scene.fog=new T.FogExp2(0xace8ff,.012);scene.add(new T.HemisphereLight(0xfff9da,0x84a2b6,1.15));let sun=new T.DirectionalLight(0xffedd4,1.1);sun.position.set(-9,18,8);scene.add(sun);
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
$('act').onclick=()=>{tone(360+taps*12);if(phase==='idle'){if(atBase){if(data.bag.length){let i=data.pads.indexOf(null);if(i<0)i=data.pads.indexOf(Math.min(...data.pads));if(i>=0&&data.pads[i]!==null&&rates[data.pads[i]]>=rates[data.bag[0]]){data.coins+=rates[data.bag.shift()]*5;say('Fish sold')}else{data.pads[i]=data.bag.shift();data.levels[i]=1;syncPads();say('Display earning cash!')}}else{data.coins+=Math.floor(data.bank);data.bank-=Math.floor(data.bank);say('Cash collected!')}save();return}goal=null;taps=luck=0;catchId=Math.min(11,Math.floor(Math.random()*(3+data.rod)));sdk.prepare();sdk.start();setPhase('cast')}else if(phase==='swirl'){luck++;say('+'+luck+' Luck')}else if(phase==='reel'){taps++;if(taps>=required()){startEscape()}}else if(phase==='escape'){escapeKick=Math.min(1,escapeKick+.48);tone(480)}};
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
const fieldSilhouettes={"0-0": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAA/CAYAAADXLCfMAAABQ0lEQVR4nO3csU7EMBAAUTuioKPi/z91aUBCiCICO96dnSmjFFHeOdnLnTJf396H1e46fQD2/0QEREWMm9sQURHnzW2IqIitEhEQDTEW7VMqGuJctE+paIgtExGQiIBEBPRy+gCaFTsGrFUrETe2b2rumI5XIeLG9s0tPV+V74mufgCiqx+AaJ+JCEhEwH1WxP332e0fDBH3Fk8MYCICJmgRAYkISERAIgISEZCIgEQEJCIgEQGJCEhEQCICyoZY8ve802VD9H8zAET7QyICEhGQiIBEBCQiIBEBiQhIREAiAh4Pigh4PCgiIBEBiQioI2IMWFfjoSQGpI6IOMzOiCm/LnRAfGLVxChWNcQnVs0cxcqOWG5VnOhKChdJV0Xc3Nb2VZlfb5rIBve9mQkvA+LP14NkxvutNMd78nKa5iSM4n0AJnMZs9s0AIgAAAAASUVORK5CYII=", "0-1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAA/CAYAAADXLCfMAAABmElEQVR4nO2csQ7CMAxE7aoDGxP//6lBHVgQCLU4ju98bylSwUF9uqROBX67P0ycZlgMHlFkjyjSiBFYK0TggSTmywtHEtfIC0vhgSQCJu+dbfUXaCjQowtKInACX2g6zZUXnsIDJdGwBXZP4kgca5rAzkkcRkRHiSN5vKkp7ChxsAlEXhMRpkPPGqhbEimRRAIkkQBJJEASCZBEAiSRAEkkQBIJkEQCJBFwm41B4igozb8cU0DdAF+Nvx0/nUsDMYnefHwKiStxKwiixFVroltR0CRKILhECQSXKIEEElfgBgKCxBUpdAOiusQquzOlqSxR6yC4xJUJHAZGRYlwF3E1FSUK4KcYSiBwEgfDDz07J1HySJKYnT4/+f7ysEt0a8BGLM9/nP/0GpK98V9u+YXPlGRrKpCK7CSqFwSSKFmgEleLc2vKTiCvPf9IlLwiVO4Tz0yPbo3ZijfqreVkSJxxga/UdGtOpSR+k9Fe0myJWRdYgicn0ZNq/NrUbktUs+9/tBxnxUjkxDVRSSG6sVF/1/juVNg1nmvQJeob8qB6AAAAAElFTkSuQmCC", "0-2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAA/CAYAAADXLCfMAAABoklEQVR4nO2au24DMQwEySBFulT5/09l4CLA4RAgdvTaXe70PpEaUBJl5cfnVzShTgcQEbnio++hTwVeLFNlvoUuBSbwytS4VCVWNEJRYkWzONUkVvAwbV9UOdhUNEatElvCXol1OgAEXIlnyG6V6GojlKguLZUlqstbhvdEgQtwFImuQgGJZgBLJF9KkSQuS7ADKBLNAJYosNJYogCWKIAlChzaLFEASxRonSxRACSJag1/dpR4T1xNahuJP/KSXGR2l2jEJPp/RgGJjOTuAZHe2ChUYJ4YFLESWQUeA00is8A8NTCSRAskl2iBAhJZyQDAEskFPrBEcoEPLJFc4Mpmv15InOlQkwHILIl/iWASRSVwVKKCGAn+uydaIBA+2AhgieT74YhE6KS65eRKJBc4KjGbTHCGeCWuTvD66u36Cs5MbvZzc8vxm8ia/D0qZt3YrBJZT05y3n7TSujMgw3KcpcgcVCfTlEmMZ+IAyFO6BYDZYIyxFndJyJV5R2EuKiafYQJyxBl5wvw3a1IG5G+dhPAEgXYLVFyOTuNKzH4+Qa6qCLo9EyiyAAAAABJRU5ErkJggg==", "0-3": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAA/CAYAAADXLCfMAAABwklEQVR4nO2cwW4CMQxEY8Sht576/5/qikPU1Qq1XbATz3jeBQ4rB/IYb0IQ9vH5NQQ2t90vQNSS6IF1omq1IErinPTIyZfIje303cm3wFotiJJ4nPhoJHLTwiYyjWKhRIQ0OmOyM7cYdJNVlcr7RAv+UHhgrVJUlhiJD2JuxdMzAur5IIc9iT4awCrR/yGQRvB9wRj+4vbDL9Tz0ZgVEv9C97mCEu2JmGN6WqcGPYmSlwTrwqYVkkhAxfNEcZHuSfRBQHeJFMdTkvgDrMgVEg3opN4HIEoiQXuNlnh+88cEoqRxAiMyM4nPpEkkkEQ0WdDtNeNk30gF+yjKroWNRAai1SkBOyUqjSRJlEgCiQ8kkkCiIJGoNBJIfCCRBBKR8Z2DV5JY9huR6q+/kkTUdrqdShLRDpDLpLGaRAZ89YBVJSKncTlVJaKL9JWDVZYoSCQiL3R81UDVJU4kkkAissh0kCSiivTsAdAkot4nPbM4osSJRBJIRE1lOOgSJ9a5rbJIbJ1KJomTdiIZJbaDVaKNRu2eVWKre2YXiXZ6vkNo2oafWaKdHn+7BlpkhX9ZzMQuXgP5izvmJI4XyG6zKbW/AcAyRqycwmsEAAAAAElFTkSuQmCC", "0-4": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAA/CAYAAADXLCfMAAAB+0lEQVR4nO2cvW7DMAyEKaNDt059/0dl0cGAUaRwLIk/d+QBmQLLMT8dSVl2xufXtwRIA845hFSH1JEKqSpBpAVZDeIJkgrmh8M5sgZMWerkUXzGqxDoKArvKqTf6gIRPiCIytbYRNUoFWAdCVMoRbNR2YkaCFIFVNkgXtUggSFeHdGpFRTiXzVIJ4jDuD55glQBE4ITT7Ujje6dztQvhJmuSJPm2HCh5+ddvXvMK9idVjdCjJypMA7JDHEnwNlxGuQCRIt6NhLXTxVSJ1q4YGbMduMExIwd23A4R3o3IqwT0wcRCeIwDOjKuEOK6+li/wTpHTgNmFgwmm1sdgZuZSzd+DtgNVsTq6UwFeLGZtVFqYODolWIs45seOBLjAYIDrEBgkNEB6hS/AnwtAFg0G6Ir9aQDRD01bYGB14TmW8EaMYJirCLkVEqBSAyuzGdKy2dOLtbjzYBlD2dPn2UceY4qQ7Soybeueu/7xtkon/PQIUyo5DnkLJ3p4jg1Tu9Ru1iPLlQRJDiCdIzncrNLbm7uhneBWZ9YTbTLsadQ1EdeUrRnfj0AhBdFyYPJzYQ41hk705biRb7LUM3thMJ5AWx3WgYC08nNkgjeadTxK2m9OqaSKAoiJXdqExOrAySKp1WBDnYIFYFSQfxVw2SAGIVkIMdIjvIYTXwD931WaxTqKUbAAAAAElFTkSuQmCC", "4-0": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyCAYAAABrsjQSAAABb0lEQVR4nO2asQ7CMAxE7aoDGxP//6lmQkJVhUAl9vl8T2KBobFf7KQJfrs/TPRmqx6AuM5uuMTJd14wDnj2JvLOfpNQYInfIqFka2LYYPaCxPri57kNYyOsmnj7jKCqnX5K8D8rKWwAlWviiARP2NhkrJth5KyU6BeS/O/EhxFTXYmZSQ4jBUXikXGvCSwSs6oxjAy0Y7dIqsJg6gJIlfhOZbWENWO1xHazuqNItHaKlMDoMjFR2ykyATTRYCuxC4FSnZJIIDSjncKtIWztNmtN9KEyKTc2EkkgEWpXxxJzxsZmorjU48TVlSiBCbnQyz6BSEkkQBIJkEQCJJEASSRAEgmQRAJ0FZVH2xMbkQCCRPabDV8dY7VEJxbpWXFVSjwGyCLSs2NB29h405sPr3z4Bhh0p4p0hPFm/wP826DLE9NBXmY7hQmWNRa0NREVN2AQJaJsbNyagCQRQZ5bQ6pf9l9IYHOJCAINaBw/8wQNLjSskX0HlAAAAABJRU5ErkJggg==", "4-1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyCAYAAABrsjQSAAABj0lEQVR4nO2a24qDQBBEp2Uf8pan/f9PrSUQQWTZNer0paoPhEiiOHqsnnHUHs/v0dRmiW5Ac52WSEBLJKAlEhAlEe9PcwNfI5atSAtsR2kyldNOZtEk7ulkFkrikdLZ/WaBcnq0D2yZyftE+1Bmk1DiSqeSQOKntxidyqQSz4jExLaUIZvEMzf9GOJklPiiRRJIPCsSQ5DMEs/Op0JNZnaJV4CKTGaJMjKzTYDPBKyPvbIncVaCMIhYHMvZtqwdLXEzE4NBQkQ5xYETabtlj0TaKErWcrpPrtc+S+Ih8eoV7i0S1YR6JbFiqUIVmV4SS5yMqjJnDGxSH/ANx2XsElkFph7RKs3Y0Aq9u09McWUGAaYkmlh5DU/m4vRKomJCwThjoygTHjIjBjaK5Rbvb2OcO1VLJxglriiJpJWoBFglqvSNU6pOBolKAqfQ024E/X6kRJUE2uwdRElUEGgqL0oxYNEN8JRYWZ4pPRTOLNCCty8rMVqeDQEU3rHBL7+tco+WyNd6223+Wv+//2/nB6LJUpPmDKvEAAAAAElFTkSuQmCC", "4-2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyCAYAAABrsjQSAAABM0lEQVR4nO3asW7CUBBE0X0WRbpU+f9P3YgiTZREKBi/2TtzJSoQYB/ts8Feb+8fNaD+47lV5h01vy7zCIj2URC7jKMgWkOSEG2jIXYZRkO0jIjYZRYR0Q6SimgVGbHLJDKiTUEEdAgtfV+Ps98XnwLi9x39E6b95SZ1xFdPURe8W2mHB6BM4hVLZRc4BcSraiqm+nL6ivrB1405mXJE/A+2NKjTcvpM0stwJhEwmZlEwEmSAqLMzpj63XcjSuyE6dtwOG88ZVt2T2I6oSACpjGIAMggAgoiYBqDCIDciSj119XkMomAdiNmGgGI9wIJQExPFkRAQQQURMBxPoiAggg421ZAJF0c3pICIul35Nrxoeq3LE4BXO6T+NsOCODwY+IacsxcJdBVy6kyRJ3c5XeKfwIBtyqHIZFOyQAAAABJRU5ErkJggg==", "4-3": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyCAYAAABrsjQSAAABi0lEQVR4nO2asXICMQxEV0yKdKny/5+6DB1FhnDmTt6V9BoKmLHPz2vLZ+L75xdi8MV3kdgPG27QI/4R/EpySxQlvsPINJA4y2YBie+K5KRSW+JRiKaoSzy6rBINUZe4AtEMB4krRQ7RCAeJD0ZkAYmrEA1wkrh6diSK4yTxwYgsIPGTVBFFcZP4KURBukksKdJN4lkvxolCuEk8E6IIjhLPvKYiCvCV1A6F7w0p0g/bJK7c0F+RHjqnMktimAwiYcjuJB6RmSWaMCNT4pF951nYjpTSSWZ2Et1u6gkDdiynbpUgIc6uPdFRJCGKWmGjDiHILomSg+GaykniOjIiR2IBkVPYFBC5M4luFaqsyFvnGVyl4Jk98XzYQaJciX4BrCyxurwtz5opsZPA1GfOkthRYNqzq9zs//X7SkeQEn+UwqKUaJ7iMkcM90TG1Q04SHQVGVn9dpHoRmQ25iTRIY2xo5+Zhc0ZKBY6sbsDTkmUGTS1Y5BbEiGQxIAYbkkcgQUkqk8iPn2mTbg7HlJOc42QEV0AAAAASUVORK5CYII=", "4-4": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAyCAYAAABrsjQSAAABoElEQVR4nO2cTW/DIBBEd60eeuup//+nTtUvKYqc2MYOzMzyrjEG9mUMSVDy/eMzBMDG6xmFWcIDRGFUJO5JGqIoKhL3giiIksQ8IBJRCCWJUX0D4yLxCKiSSEWJR9OIMEdRYgsIY1QltqyNCFNUJX4zNzkGEltAGKIuMRva2IlUl9iKlciqEq1YCicKLolUlziZEn+QT6N6EvOi+0iLVJd4JbIiHSRmdZEOEsvjIBEvuJ9UIhkknikaLh6LJKMl4oSQVwuEyptktMR79hatZ3ER5CyEO0vGoiGIGS2x5VE2qqAIUlglshYOhGOKt9ED+HukPisMXdHid0w0x0PYk8gMgoQp0UAki0SaR5OiSBaJ6mBk50wSldM4VCSTRAdQXeLwtUV1HkwSnUDPzqZEA5FTogEsEl3WwyHzYpE4EZfomsJun30ZJLqSVX6KOvKfbUqJzZ6dLcRFSNGv5bJ3h4wSVWTRjH0hmvRa+p5dz0aO6vjVayJ2TDAb2rCRK+u29MbmVsLaxuTR5B4V4Lbd2jU4Od4tts4A/XM/v27ncL4AxntKevVVHr8AAAAASUVORK5CYII="};
const fieldTabs=['World 1','World 2','Abyss','Beasts','Events','Weather'];
const fieldPages=[
 {name:'Common',count:8,values:[2,4,5,7,9]},
 {name:'Doodle',count:10,values:[230000,245000,260000,278000,295000]},
 null,
 {name:'Beast',count:16,values:[34000,40000,45000,55000,55000]},
 {name:'Moon',count:8,values:[80000,129000,195000,250000,320000]},
 null
];
const priceLabel=value=>value>=1000?(value/1000)+'K':String(value);
function fieldIndex(tab=0){
 const page=fieldPages[tab],ownedStar=data.seen.includes(0);
 const tabs=fieldTabs.map((name,i)=>'<button class="fieldTab" aria-pressed="'+(i===tab)+'" data-tab="'+i+'">'+name+'</button>').join('');
 let cards='';
 if(page){
  for(let i=0;i<page.count;i++){
   const star=tab===0&&i===0&&ownedStar;
   cards+='<div class="entry"><b>'+(star?'Starfish':'???')+'</b>'+(star?'<img src="'+portrait(0)+'">':fieldSilhouettes[tab+'-'+i]?'<img alt="Undiscovered" src="'+fieldSilhouettes[tab+'-'+i]+'">':'<i aria-hidden="true">?</i>')+'<strong>'+(page.values[i]?'$'+priceLabel(page.values[i])+'/s':'—')+'</strong></div>';
  }
 }
 const log=data.seen.map(id=>'<div class="entry"><b>'+names[id]+'</b><img src="'+portrait(id)+'"><strong>$'+priceLabel(rates[id])+'/s</strong></div>').join('');
 panel('Fish Index','<div class="fieldLayout"><nav>'+tabs+'</nav><article class="fieldBody"><h3>'+(page?page.name+' · '+(tab===0&&ownedStar?1:0)+'/'+page.count:fieldTabs[tab])+'</h3>'+(cards?'<div class="entries">'+cards+'</div>':'<p>Field records pending.</p>')+(tab===0&&log?'<h3>Your catches</h3><div class="entries">'+log+'</div>':'')+'</article></div><div class="fieldFooter">Recorded index · 269 fish</div>');
 document.querySelectorAll('.fieldTab').forEach(b=>b.onclick=()=>fieldIndex(Number(b.dataset.tab)));
}
$('index').onclick=()=>fieldIndex();

const openShop=$('shop').onclick;
$('shop').onclick=()=>{openShop();const labels=['Weights','Fishing rod','Swim speed'];document.querySelectorAll('[data-k]').forEach((button,i)=>{
 const k=button.dataset.k,level=data[k];
 button.className='shopCard';button.innerHTML='<b>'+labels[i]+'</b><i class="tool tool'+i+'"></i><small>Lv. '+level+'</small><strong>$'+(level*25)+'</strong>';
 });};
let hunter=null,lead=0,shore=0,escapeKick=0;
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
function required(){return Math.max(4,7+catchId-Math.floor(data.strength/30))}
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
  const center=phase==='escape'?hero.position:phase==='reveal'?hero.position:hook.position;
  wave.position.set(center.x,.175+i*.008,center.z);
  wave.scale.setScalar(.3+age*(phase==='escape'?1.1:2.4));
  wave.material.opacity=(1-age)*.72;
 });
  spray.forEach((drop,i)=>{
    drop.visible=active;
    if(!active)return;
    const age=(clock*(phase==='reveal'?1.4:.85)+i*.137)%1;
    const angle=i*2.4, radius=age*(phase==='reveal'?3:1.3);
    drop.position.set(hook.position.x+Math.cos(angle)*radius,.28+Math.sin(age*Math.PI)*(1+i%4*.4),hook.position.z+Math.sin(angle)*radius);
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
joystick.onpointerdown=e=>{e.preventDefault();stickId=e.pointerId;joystick.setPointerCapture(stickId);stickMove(e)};
joystick.onpointermove=e=>{if(e.pointerId===stickId)stickMove(e)};
joystick.onlostpointercapture=()=>{stickId=null;stickX=stickY=0;joystick.firstChild.style.transform='none';if(phase==='idle')goal=null};

function frame(now){requestAnimationFrame(frame);let dt=Math.min(.06,(now-prev)/1000);prev=now;if(document.hidden)return;clock+=dt;elapsed+=dt;flash-=dt;if(flash<=0)$('spark').textContent='';let income=data.pads.reduce((sum,id,i)=>sum+(id===null?0:rates[id]*data.levels[i]),0);data.bank+=income*dt;if((autoSave+=dt)>8){autoSave=0;if(income)save()}joystick.hidden=phase!=='idle'||!$('panel').hidden;
 if(stickId!==null&&!joystick.hidden)goal=new T.Vector3(Math.max(-25,Math.min(25,hero.position.x+stickX*2)),0,Math.max(3,Math.min(27,hero.position.z+stickY*2)));
 walking=false;if(goal){let d=goal.clone().sub(hero.position),dist=d.length();if(dist<.15){goal=null;if(phase==='walk')setPhase('idle')}else{walking=true;hero.rotation.y=Math.atan2(-d.x,-d.z);hero.position.addScaledVector(d.normalize(),Math.min(dist,dt*(5+data.speed)));atBase=hero.position.z>12}}hero.rotation.z*=.9;legs.forEach((l,i)=>l.rotation.x=walking?Math.sin(clock*12+i*Math.PI)*.55:0);swimmers.forEach((g,i)=>{g.position.set(Math.sin(clock*.23+i*3)*10,-.05+Math.sin(clock*2+i)*.18,-6-(i%5)*3);g.rotation.y=Math.cos(clock*.23+i*3)<0?Math.PI:0});display.forEach((g,i)=>g.rotation.y=Math.sin(clock+i)*.3);
let fishing=!['idle','walk'].includes(phase),cx=hero.position.x,cz=hero.position.z;hook.visible=line.visible=ring.visible=fishing;let view=new T.Vector3(cx+2.8,4.7,cz+8),look=new T.Vector3(cx,1,cz-2);if(fishing){let x=cx,z=-castDepth();if(phase==='cast'){let t=Math.min(1,elapsed/.9);hook.position.set(x,1+Math.sin(t*Math.PI)*5,(cz-1)*(1-t)+z*t);if(t===1)setPhase('swirl')}else hook.position.set(x,.42+Math.sin(clock*6)*.16,z);if(phase==='swirl'&&elapsed>2.9){catchId=Math.min(11,catchId+Math.floor(Math.random()*(luck+1)/2));prize=fish(catchId);setPhase('reel')}if(prize){prize.position.copy(hook.position);prize.position.y+=phase==='reveal'?2+Math.sin(elapsed*3)*.6:1;prize.rotation.y=clock*(phase==='reveal'?3:1);prize.rotation.z=Math.sin(clock*9)*.16}if(phase==='reveal'&&elapsed>2){scene.remove(prize);prize=null;trip(true)}look.copy(hook.position);look.y+=.7;
 if(phase==='cast'){
   const travel=Math.min(1,elapsed/.9);view.set(x+6*(1-travel),3.5+Math.sin(travel*Math.PI)*4,cz+5+(z-cz)*travel);
 }else if(phase==='reveal'){
   prize?.position.set(cx+.7,3.4+Math.sin(elapsed*3)*.22,cz);
   view.set(cx+2.5,1.1,cz+5);look.set(cx,2.4,cz);
 }else{view.set(x+.25,1.65,z+5.3);look.y+=phase==='reel'?.35:0}
 let pos=line.geometry.attributes.position;pos.setXYZ(0,cx+.7,2.4,cz-1);pos.setXYZ(1,...hook.position.toArray());pos.needsUpdate=true;line.frustumCulled=false;ring.position.set(x,.17,z);let t=(clock*1.5)%1;ring.scale.setScalar(.5+t*2.6);ring.material.opacity=1-t}
if(phase==='escape'){
 const swim=1.2+escapeKick*2.8+Math.min(10,data.speed)*.12;
 escapeKick=Math.max(0,escapeKick-dt*.95);shore-=swim*dt;lead+=(swim-2.85)*dt;
 const z=2-shore;hero.position.z=z;hero.rotation.y=Math.PI;
 legs.forEach((leg,i)=>leg.rotation.x=Math.sin(clock*11+i*Math.PI)*.65);
 hunter.position.set(cx+.3,.32,z-lead);hunter.rotation.y=-Math.PI/2+Math.sin(clock*8)*.08;
 prize.position.set(cx+.7,1.25,z);view.set(cx+2.4+Math.sin(clock*7)*.07,1.9,z+5.3);look.set(cx,.8,z-1.2);
 line.visible=hook.visible=false;ring.position.set(cx,.18,z);ring.visible=true;
 if(shore<=0||lead<=.45){hero.position.z=4;finishEscape(shore<=0)}
}
$('luckBar').hidden=phase!=='swirl';
 if(phase==='swirl')$('luckFill').style.width=Math.min(100,12+luck*8)+'%';
 document.body.classList.toggle('reading',!$('panel').hidden);
 splash(fishing&&phase!=='cast');camera.position.lerp(view,1-Math.exp(-dt*5));camera.lookAt(look);const targetFov=phase==='escape'?66:phase==='reveal'?43:53;
 camera.fov+=(targetFov-camera.fov)*(1-Math.exp(-dt*7));camera.updateProjectionMatrix();$('meter').hidden=phase!=='reel';$('needle').style.transform='rotate('+(-85+170*taps/required())+'deg)';$('hint').textContent=({escape:'Shark behind you! Tap to swim',cast:'Casting…',swirl:waterBands[castBand()]+' water · Tap for luck!',reel:names[catchId]+' · $'+rates[catchId]+'/s',reveal:'Catch landed!',walk:'Follow the path',idle:atBase?(data.bag.length?'Place your fish on a stand':'Collect your earnings'):'Cast into the lagoon'})[phase];$('act').textContent=({idle:atBase?(data.bag.length?'Place fish':'Collect $'+Math.floor(data.bank)):'Cast line',cast:'Casting…',escape:'Swim! '+Math.max(0,Math.ceil(shore))+' m',swirl:'Tap · + Luck',reel:'Reel! '+taps+'/'+required(),reveal:'Caught!',walk:'Walking…'})[phase];$('base').textContent=atBase?'Lagoon':'My Base';$('stands').hidden=!atBase||phase!=='idle';for(let id of ['shop','base','index','daily'])$(id).hidden=fishing||phase==='walk';$('wallet').innerHTML='$'+Math.floor(data.coins)+'<br>+'+income+'/s';renderer.render(scene,camera)}
requestAnimationFrame(frame);addEventListener('pagehide',()=>{local();sdk.end();sdk.stop()});

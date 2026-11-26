const $=id=>document.getElementById(id),cv=document.querySelector('canvas'),c=cv.getContext('2d'),TAU=Math.PI*2;
const worlds=[['Cinder',23,.14],['Verdigris',164,.12],['Amethyst',274,.105],['Blue Hour',207,.10],['Saffron',44,.095],['Rosewater',347,.09]];
const key='orbit-nursery.save.v1';let profile={level:0,rewards:{},updated:0};try{Object.assign(profile,JSON.parse(localStorage.getItem(key)))}catch{}
let t=0,last=0,held=false,started=false,done=false,q=0,goal=.5,width=.14,locked=[],atoms=[],spark=0,notice=0,orb,w,h,scale,world,step,clock=0,acc=0,ac;
function local(){try{localStorage.setItem(key,JSON.stringify(profile))}catch{}}
const sdk=bridge({read:()=>profile,write:(p,cloud)=>{if(cloud&&(started||p.updated<=profile.updated))return;Object.assign(profile,p);local();if(cloud)setup()}});
function sound(f,d=.18,delay=0){try{ac??=new AudioContext();ac.resume().catch(()=>{});const osc=ac.createOscillator(),gain=ac.createGain(),n=ac.currentTime+delay;osc.frequency.value=f;gain.gain.setValueAtTime(.0001,n);gain.gain.exponentialRampToValueAtTime(.045,n+.015);gain.gain.exponentialRampToValueAtTime(.0001,n+d);osc.connect(gain);gain.connect(ac.destination);osc.start(n);osc.stop(n+d+.01)}catch{}}
function globe(hue){
 const el=document.createElement('canvas');el.width=el.height=260;const g=el.getContext('2d'),im=g.createImageData(260,260);
 for(let j=0;j<260;j++)for(let i=0;i<260;i++){const x=(i-130)/128,y=(j-130)/128,r=x*x+y*y;if(r>1)continue;const z=Math.sqrt(1-r),lat=y*.92+x*.3,lon=Math.atan2(x,z),band=.5+.5*Math.sin(lat*26+2.4*Math.sin(lon*3+lat*7)+.48*Math.sin(lon*12+lat*19)),light=Math.max(.04,-x*.56-y*.53+z*.56),rim=(1-z)**3;
 const k=(j*260+i)*4;for(let n=0;n<3;n++){const pigment=.56+.32*Math.cos((hue/360-n/3)*TAU);im.data[k+n]=Math.min(255,12+((95+135*pigment)*(.62+.38*band))*light+rim*(68+n*12))}im.data[k+3]=Math.min(255,(1-Math.sqrt(r))*128*255)}
 g.putImageData(im,0,0);return el
}
function prepareRing(){q=0;held=false;goal=[.48,.68,.36][locked.length];atoms=Array.from({length:66},(_,i)=>{const a=i*2.39996;return [Math.cos(a)*1.48,(Math.random()-.5)*.74,Math.sin(a)*1.48,0,0,0,i%3]});$('zone').style.left=(goal-width)*100+'%';$('zone').style.width=width*200+'%';$('tick').style.left='0%'}
function setup(){world=worlds[profile.level%6];width=world[2];step=Math.min(3,1+Math.floor(profile.level%6/2));locked=[];started=done=false;document.body.classList.remove('done');orb=globe(world[1]);prepareRing();$('name').textContent=world[0];$('label').textContent='World '+String(profile.level+1).padStart(2,'0');$('counter').textContent='0 / '+step+' rings';$('hint').textContent='Hold to gather. Release in the green zone.';$('action').textContent='Hold gravity'}
function press(){if(done){setup();return}if(held)return;if(!started){sdk.prepare();sdk.start();started=true}held=true;clock=0;q=0;notice=0;sound(180);$('action').textContent='Release to orbit'}
function release(){if(!held)return;held=false;$('action').textContent='Hold gravity';if(Math.abs(q-goal)>width){$('hint').textContent=q<goal?'Too wide · hold a little longer':'Too tight · release sooner';notice=2;sound(130);return}
 locked.push({radius:1.48-.68*q,tilt:.35+locked.length*.57});spark=1;[360,480,720].forEach((f,i)=>sound(f,.32,i*.08));$('counter').textContent=locked.length+' / '+step+' rings';
 if(locked.length===step){done=true;started=false;profile.level++;profile.updated=Date.now();local();sdk.save();sdk.end();document.body.classList.add('done');$('action').textContent='Next world';$('hint').textContent=world[0]+' has a stable orbit.'}else{prepareRing();$('hint').textContent='Ring anchored · gather the next orbit'}
}
let finger=null;function down(e){if(finger!==null||e.button!==0)return;finger=e.pointerId;e.currentTarget.setPointerCapture(finger);press()}function up(e){if(e.pointerId!==finger)return;finger=null;release()}function cancel(){finger=null;held=false;q=0;if(!done)$('action').textContent='Hold gravity'}
for(const el of [cv,$('action')]){el.onpointerdown=down;el.onpointerup=up;el.onpointercancel=cancel}onblur=cancel;onkeydown=e=>{if(e.code==='Space'){e.preventDefault();if(!e.repeat)press()}};onkeyup=e=>{if(e.code==='Space')release()};
// Pair-force loop adapted from Hunar Ahmad's particle_life_3d.html (MIT).
// The nursery adds a spring toward a tilted orbit and a circulating target phase.
const rules=[[.001,-.0005,.0008],[-.0005,.001,.0015],[.0008,.0015,.001]];
function simulate(){const radius=1.48-.68*q,tilt=.35+locked.length*.57;
 for(let i=0;i<atoms.length;i++){const a=atoms[i];let fx=0,fy=0,fz=0;
 for(const b of atoms){const dx=a[0]-b[0],dy=a[1]-b[1],dz=a[2]-b[2],d=dx*dx+dy*dy+dz*dz;if(d>0&&d<.09){const F=rules[a[6]][b[6]]/Math.sqrt(d);fx+=F*dx;fy+=F*dy;fz+=F*dz}}
 const angle=i*2.39996+t*.32,sz=Math.sin(angle)*radius,jitter=held?.015:.13;
 a[3]=a[3]*.79+fx+(Math.cos(angle)*radius-a[0])*.025;a[4]=a[4]*.79+fy+(sz*Math.sin(tilt)+Math.sin(i+t)*jitter-a[1])*.025;a[5]=a[5]*.79+fz+(sz*Math.cos(tilt)-a[2])*.025}
 for(const a of atoms){a[0]+=a[3];a[1]+=a[4];a[2]+=a[5]}}
function resize(){w=innerWidth;h=innerHeight;const d=Math.min(1.6,devicePixelRatio);cv.width=w*d;cv.height=h*d;c.setTransform(d,0,0,d,0,0);scale=Math.min(w*.299,h*.25,210)}onresize=resize;
function ellipse(x,y,r,col){c.fillStyle=col;c.beginPath();c.arc(x,y,r,0,TAU);c.fill()}
function draw(time){const dt=Math.min(.05,(time-(last||time))/1000);last=time;requestAnimationFrame(draw);if(document.hidden)return;t+=dt;spark=Math.max(0,spark-dt);notice-=dt;if(held){clock+=dt;q=(1-Math.cos(clock*2.1))/2;$('hint').textContent=Math.abs(q-goal)<=width?'Release now':'Gathering stardust'}else if(!done&&notice<=0&&q)q=0;if(!done)$('tick').style.left=q*100+'%';acc+=dt;while(acc>=1/60){if(!done)simulate();acc-=1/60}
 const cx=w*.5,cy=h*.52;c.fillStyle='#0a1224';c.fillRect(0,0,w,h);const sky=c.createRadialGradient(cx,cy,0,cx,cy,scale*2.7);sky.addColorStop(0,'hsla('+world[1]+',55%,35%,.57)');sky.addColorStop(.58,'#23345255');sky.addColorStop(1,'#0a122400');c.fillStyle=sky;c.fillRect(0,0,w,h);
 for(let i=0;i<110;i++){const x=((i*.618034)%1)*w,y=((i*i*.137+i*.091)%1)*h;ellipse(x,y,i%9===0?1.35:.7,'rgba(226,240,230,'+(.38+.24*Math.sin(t+i))+')')}
 const points=[];function ring(r,tilt,n,col,dots){for(let i=0;i<n;i++){const a=i/n*TAU+(dots?0:t*.12);points.push([r*Math.cos(a),r*Math.sin(a)*Math.sin(tilt),r*Math.sin(a)*Math.cos(tilt),dots?1:1.6,col])}}
 if(!done)ring(1.48-.68*goal,.35+locked.length*.57,92,'#8bcfbe80',true);for(const row of locked)ring(row.radius,row.tilt,210,'#ffdd96',false);
 if(!done)for(const a of atoms)points.push([a[0],a[1],a[2],2.4,['#ffd49a','#97ecdc','#eea9cc'][a[6]]]);
 points.sort((a,b)=>a[2]-b[2]);function point(p){const k=4/(4-p[2]*.4);ellipse(cx+p[0]*scale*k,cy+p[1]*scale*k,p[3]*k*(scale/135)**.45,p[4])}
 for(const p of points)if(p[2]<0)point(p);const rad=scale*.57;c.drawImage(orb,cx-rad,cy-rad,rad*2,rad*2);for(const p of points)if(p[2]>=0)point(p);
 if(spark){c.strokeStyle='rgba(255,226,166,'+spark*.85+')';c.lineWidth=2;c.beginPath();c.ellipse(cx,cy,scale*(1.35+(1-spark)*.6),scale*(.48+(1-spark)*.35),0,0,TAU);c.stroke()}}
setup();resize();requestAnimationFrame(draw);addEventListener('pagehide',()=>{local();sdk.end();sdk.stop()});addEventListener('pageshow',e=>{if(e.persisted)location.reload()})

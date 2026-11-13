export const W=360,H=520,STEP=1/120;
export const COURTS=[
 {name:'The Invitation',tag:'PUSH THE ORB INTO THE UPPER GATE',speed:140,goal:166,rule:'A slow keeper. Your first bank shot awaits.'},
 {name:'Bone Orchard',tag:'USE THE BUMPERS',speed:175,goal:156,bumps:2,rule:'Two bone seals turn a straight shot into a surprise.'},
 {name:'Wandering Mouth',tag:'LEAD THE MOVING GATE',speed:180,goal:156,moving:42,rule:'The upper gate glides. Aim where it is going.'},
 {name:'Black Ice',tag:'LET IT GLIDE',speed:200,goal:150,ice:true,bumps:1,rule:'Less drag, longer banks. The centre seal moves.'},
 {name:'Ivory Lock',tag:'CRACK THE GATE, THEN SCORE',speed:195,goal:162,shield:1,rule:'The first goal strike cracks the ivory lock. The next scores.'},
 {name:'Crosscurrent',tag:'RIDE THE SIDEWAYS CURRENT',speed:205,goal:160,current:65,bumps:2,rule:'The violet current bends the orb, never your mallet.'},
 {name:'Mirror Passage',tag:'THE SIDE PORTALS CONNECT',speed:220,goal:158,portals:true,rule:'At the glowing side windows, the orb crosses to the other wall.'},
 {name:'The Double',tag:'SLIP BETWEEN THE KEEPERS',speed:210,goal:168,double:true,moving:28,rule:'A second spectral keeper guards a different line.'},
 {name:'Last Light',tag:'BREAK THE FINAL SEAL',speed:220,goal:168,moving:32,shield:1,bumps:1,portals:true,rule:'A locked moving gate, a drifting seal, and the mirror windows.'}
];
export const SIGILS=[{id:'spark',name:'Spark',need:0,detail:'A charged Pulse aims at the upper gate and pierces the keeper.'},{id:'ember',name:'Ember',need:2,detail:'Hits charge 50 instead of 38. Pulse also breaks through an ivory lock.'},{id:'mirror',name:'Mirror',need:4,detail:'Wall banks charge your pulse twice as fast.'},{id:'mercy',name:'Mercy',need:6,detail:'One missed goal is caught each match.'}];
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const finite=(v,d=0)=>Number.isFinite(v)?v:d;
export function create(court=0,sigil='spark',seed=1){
 court=Math.floor(clamp(finite(court),0,999));const remix=court>=9,base=COURTS[remix?((court-9)%8)+1:court];
 return {version:1,court,seed:seed>>>0,sigil:SIGILS.some(s=>s.id===sigil)?sigil:'spark',phase:'ready',time:0,t:0,score:[0,0],target:3,points:[],hits:0,banks:0,rally:0,bestRally:0,charge:0,pulseTime:0,pulseX:180,pulseHit:false,shield:base.shield||0,ward:sigil==='mercy'?1:0,puck:{x:180,y:397,vx:0,vy:0,r:11,bank:0,boost:false,pierced:0,portal:0,last:0},player:{x:180,y:459,tx:180,ty:459,vx:0,vy:0,r:24},enemy:{x:88,y:126,vx:0,vy:0,r:23},ghost:{x:270,y:202,vx:0,vy:0,r:20},cool:{p:0,e:0,g:0,b:0},goalX:180,events:[],config:{...base,speed:Math.min(220,base.speed+(remix?10:0))},countdown:0,everStarted:false,serveNumber:0};
}
export function emit(s,type,x,y,extra={}){s.events.push({type,x,y,...extra});if(s.events.length>60)s.events.shift()}
export function aim(s,x,y){if(['win','loss'].includes(s.phase))return;let p=s.player;p.tx=clamp(finite(x,p.x),49,311);p.ty=clamp(finite(y,p.y),282,462);if(s.phase==='ready'){s.phase='play';s.everStarted=true;emit(s,'start',p.x,p.y)}}
export function pulse(s){if(s.phase!=='play'||s.charge<100||s.pulseTime>0)return false;s.charge=0;s.pulseTime=.52;s.pulseX=s.player.x;s.pulseHit=false;emit(s,'pulse',s.player.x,s.player.y);return true}
export function bumps(s){let q=s.config,ts=s.time;return q.bumps===2?[{x:94,y:265,r:22},{x:266,y:265,r:22}]:q.bumps===1?[{x:180+Math.sin(ts*.8)*42,y:264,r:23}]:[]}
function move(body,tx,ty,speed,dt){let dx=tx-body.x,dy=ty-body.y,len=Math.hypot(dx,dy),f=Math.min(1,speed*dt/(len||1)),ox=body.x,oy=body.y;body.x+=dx*f;body.y+=dy*f;body.vx=(body.x-ox)/dt;body.vy=(body.y-oy)/dt}
function impact(s,b,kind){let p=s.puck,dx=p.x-b.x,dy=p.y-b.y,d=Math.hypot(dx,dy),rr=p.r+b.r;if(d>=rr)return;
 if((kind==='e'||kind==='g')&&p.boost&&p.vy<0){let bit=kind==='e'?1:2;if(!((p.pierced||0)&bit)){p.pierced=(p.pierced||0)|bit;emit(s,'guardbreak',b.x,b.y)}return}
 let nx=d>1e-6?dx/d:0,ny=d>1e-6?dy/d:(kind==='p'?-1:1);p.x=b.x+nx*(rr+.2);p.y=b.y+ny*(rr+.2);
 // When a mallet squeezes an orb against a side rail, separate along the rail.
 // Projecting it back through the wall each step otherwise creates an overlap trap.
 if(kind!=='b'&&(p.x<43||p.x>317)){p.x=clamp(p.x,43,317);let xx=p.x-b.x;p.y=b.y+(kind==='p'?-1:1)*Math.sqrt(Math.max(0,(rr+.3)**2-xx*xx));dx=p.x-b.x;dy=p.y-b.y;d=Math.hypot(dx,dy);nx=dx/d;ny=dy/d;}
 let rel=(p.vx-(b.vx||0))*nx+(p.vy-(b.vy||0))*ny;
 if(rel<0){p.vx-=1.7*rel*nx;p.vy-=1.7*rel*ny;}
 if(kind==='p'&&s.cool.p<=0){let speed=Math.max(330,Math.hypot(b.vx,b.vy)*.75,Math.hypot(p.vx,p.vy));let dirx=nx*.64+b.vx/1800,diry=Math.min(-.32,ny);let n=Math.hypot(dirx,diry);p.vx=dirx/n*speed;p.vy=diry/n*speed;p.last=1;s.hits++;s.rally++;s.bestRally=Math.max(s.rally,s.bestRally);s.charge=clamp(s.charge+(s.sigil==='ember'?50:38),0,100);s.cool.p=.12;emit(s,'hit',p.x,p.y,{rally:s.rally});}
 else if((kind==='e'||kind==='g')&&s.cool[kind]<=0){let speed=Math.max(285,Math.min(520,Math.hypot(p.vx,p.vy)*.86)),dx=(s.player.x<180?.24:-.24)+(s.court>1?Math.sin(s.time*2)*.22:0),dy=Math.max(.4,ny);let n=Math.hypot(dx,dy);p.vx=dx/n*speed;p.vy=dy/n*speed;p.last=2;s.cool[kind]=.16;emit(s,'return',p.x,p.y);}
 else if(kind==='b'&&s.cool.b<=0){let speed=Math.max(300,Math.hypot(p.vx,p.vy));p.vx=nx*speed;p.vy=ny*speed;s.cool.b=.1;s.charge=clamp(s.charge+10,0,100);emit(s,'bumper',p.x,p.y)}
}
function point(s,who){let p=s.puck;if(who===0&&s.shield>0){s.shield--;emit(s,'crack',p.x,50);if(!(p.boost&&s.sigil==='ember')){p.y=63;p.vy=Math.max(350,Math.abs(p.vy)*.68);p.vx+=(p.x-180)*.8;s.charge=clamp(s.charge+35,0,100);return}}
 if(who===1&&s.ward){s.ward=0;p.y=468;p.vy=-Math.max(430,Math.abs(p.vy));p.last=1;emit(s,'ward',p.x,480);return}
 s.score[who]++;s.points.push({who,bank:p.bank,boost:p.boost,rally:s.rally});s.bestRally=Math.max(s.bestRally,s.rally);emit(s,who===0?'goal':'concede',p.x,who===0?48:482,{bank:p.bank,boost:p.boost});s.phase=s.score[who]>=3?(who===0?'win':'loss'):'point';s.countdown=1.05;p.vx=p.vy=0;
 if(s.phase==='win')emit(s,'win',180,230,{stars:stars(s)});if(s.phase==='loss')emit(s,'loss',180,240);
}
export function stars(s){return s.phase==='win'?1+(s.score[1]<=1?1:0)+(s.points.some(p=>p.who===0&&(p.bank>0||p.boost))?1:0):0}
function serve(s){let n=++s.serveNumber;s.phase='ready';s.rally=0;s.puck={x:n%3===1?132:n%3===2?228:180,y:397,vx:0,vy:0,r:11,bank:0,boost:false,pierced:0,portal:0,last:0};Object.assign(s.player,{x:s.puck.x,y:459,tx:s.puck.x,ty:459,vx:0,vy:0});Object.assign(s.enemy,{x:s.puck.x,y:126,vx:0,vy:0});s.shield=s.config.shield||0;s.pulseTime=0;s.pulseHit=false;emit(s,'serve',s.puck.x,s.puck.y)}
export function tick(s,dt=STEP){dt=clamp(finite(dt),0,.025);s.events=s.events||[];if(['ready','win','loss'].includes(s.phase))return;
 if(s.phase==='point'){s.countdown-=dt;if(s.countdown<=0)serve(s);return}
 s.time+=dt;s.t+=dt;let q=s.config,p=s.puck,b=s.player;s.goalX=180+Math.sin(s.time*.75)*(q.moving||0);for(let k in s.cool)s.cool[k]=Math.max(0,s.cool[k]-dt);p.portal=Math.max(0,p.portal-dt);
 move(b,b.tx,b.ty,1050,dt);let prediction=p.x+(p.vx*clamp((p.y-125)/Math.max(100,-p.vy),0,.3));let ex=clamp(prediction,57,303),ey=p.y<225?clamp(p.y-30,90,207):128;
 move(s.enemy,ex,ey,s.court===0&&s.serveNumber===0&&s.time<1?0:q.speed,dt);if(q.double)move(s.ghost,clamp(360-p.x*.85,58,302),216,q.speed*.68,dt);
 if(s.pulseTime>0){s.pulseTime-=dt;if(!s.pulseHit){let speed=s.sigil==='ember'?850:700,flight=Math.max(.13,(p.y-50)/speed);p.vy=-speed;p.vx=(s.goalX-p.x)/flight;p.boost=true;p.pierced=0;p.last=1;s.pulseHit=true;emit(s,'blast',p.x,p.y)}}
 if(q.current)p.vx+=Math.sin(p.y/105+s.time*.4)*q.current*dt;
 const drag=q.ice?.045:.17;p.vx*=Math.exp(-drag*dt);p.vy*=Math.exp(-drag*dt);let sp=Math.hypot(p.vx,p.vy);if(sp>880){p.vx*=880/sp;p.vy*=880/sp}
 p.x+=p.vx*dt;p.y+=p.vy*dt;impact(s,b,'p');impact(s,s.enemy,'e');if(q.double)impact(s,s.ghost,'g');for(let o of bumps(s))impact(s,o,'b');
 let side=p.x<32+p.r?-1:p.x>328-p.r?1:0;if(side){if(q.portals&&p.y>160&&p.y<227&&p.portal<=0){p.x=side<0?328-p.r-1:32+p.r+1;p.portal=.35;s.charge=clamp(s.charge+15,0,100);emit(s,'portal',p.x,p.y)}else{p.x=clamp(p.x,32+p.r,328-p.r);p.vx=side<0?Math.abs(p.vx)*.98:-Math.abs(p.vx)*.98;p.bank++;s.banks++;s.charge=clamp(s.charge+(s.sigil==='mirror'?30:15),0,100);emit(s,'bank',p.x,p.y)}}
 if(p.y<50+p.r){if(Math.abs(p.x-s.goalX)<q.goal/2-p.r){point(s,0);return}p.y=50+p.r;p.vy=Math.abs(p.vy)*.97;emit(s,'rail',p.x,p.y)}
 if(p.y>482-p.r){if(Math.abs(p.x-180)<82-p.r){point(s,1);return}p.y=482-p.r;p.vy=-Math.abs(p.vy)*.97;emit(s,'rail',p.x,p.y)}
 sp=Math.hypot(p.vx,p.vy);if(sp<75&&s.time>1.5){p.vy+=p.y<270?85*dt:-85*dt;} // keep a nearly stalled rally alive
}
export function drain(s){return s.events.splice(0)}
export function snapshot(s){const {events,config,...safe}=s;return JSON.parse(JSON.stringify(safe))}
export function restore(raw){if(!raw||raw.version!==1)return null;let s=create(raw.court,raw.sigil,raw.seed);
 for(let k of ['time','t','charge','pulseTime','pulseX','countdown','hits','banks','rally','bestRally','shield','ward','serveNumber'])s[k]=clamp(finite(raw[k],s[k]),k==='pulseX'?0:0,k==='time'||k==='t'?1e7:10000);
 s.charge=clamp(s.charge,0,100);s.pulseTime=clamp(s.pulseTime,0,.52);s.ward=raw.ward===1?1:0;s.shield=raw.shield===1?1:0;s.pulseHit=!!raw.pulseHit;s.everStarted=!!raw.everStarted;s.phase=['ready','play','point','win','loss'].includes(raw.phase)?raw.phase:'ready';s.score=Array.isArray(raw.score)?raw.score.slice(0,2).map(x=>Math.floor(clamp(finite(x),0,3))):[0,0];if(s.score.length!==2)return null;
 for(let k of ['player','enemy','ghost','puck']){if(!raw[k])return null;for(let field of Object.keys(s[k]))if(typeof s[k][field]==='number')s[k][field]=finite(raw[k][field],s[k][field]);s[k].x=clamp(s[k].x,30,330);s[k].y=clamp(s[k].y,40,485);s[k].vx=clamp(s[k].vx,-1100,1100);s[k].vy=clamp(s[k].vy,-1100,1100);}
 s.puck.r=11;s.player.r=24;s.enemy.r=23;s.ghost.r=20;s.player.tx=clamp(s.player.tx,49,311);s.player.ty=clamp(s.player.ty,282,462);s.puck.bank=Math.floor(clamp(s.puck.bank,0,10000));s.puck.portal=clamp(s.puck.portal,0,.35);s.puck.boost=!!raw.puck.boost;s.puck.last=[0,1,2].includes(raw.puck.last)?raw.puck.last:0;
 s.points=Array.isArray(raw.points)?raw.points.slice(0,5).filter(p=>p&&[0,1].includes(p.who)).map(p=>({who:p.who,bank:clamp(finite(p.bank),0,999),boost:!!p.boost,rally:clamp(finite(p.rally),0,999)})):[];
 for(let k in s.cool)s.cool[k]=clamp(finite(raw.cool?.[k]),0,.16);s.goalX=180+Math.sin(s.time*.75)*(s.config.moving||0);return s;
}


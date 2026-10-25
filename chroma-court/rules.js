/* Paddle bounce/goal/reset logic adapted from Fluid Table Tennis by Anirudh Joshi (2012), MIT.
   Portrait coordinate system, swept collision, spin, AI, progression and scoring added for Chroma Court.
   See LICENSE-FLUID.txt and upstream/table_tennis.js. */
export const W=360,H=600,PY=548,AY=52,RADIUS=8;
export const COURTS=[
 {name:'Neon Reef',rival:'MICA',subtitle:'Find your flow',target:3,aiSpeed:125,error:51,ballSpeed:245,accent:'#ed8da6',other:'#6de0d4',bg:'#071e2b',unlocked:0},
 {name:'Amber Arcade',rival:'SOL',subtitle:'Play the angles',target:3,aiSpeed:153,error:42,ballSpeed:270,accent:'#f3bb78',other:'#78c8ec',bg:'#162637',unlocked:1},
 {name:'Velvet Garden',rival:'IRIS',subtitle:'Let it curve',target:4,aiSpeed:177,error:34,ballSpeed:290,accent:'#c5a1e9',other:'#f2a89a',bg:'#241f39',unlocked:2},
 {name:'Aurora Hall',rival:'LUMI',subtitle:'Make it luminous',target:5,aiSpeed:195,error:28,ballSpeed:305,accent:'#87eadb',other:'#f1d594',bg:'#102b32',unlocked:3}
];
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function random(r){r.seed=(Math.imul(r.seed,1664525)+1013904223)>>>0;return r.seed/4294967296;}
export function newMatch(court=0){let r={court,seed:19165+court*127,px:180,prevPx:180,pvx:0,aiX:180,aiBias:0,aiClock:0,aiFreeze:0,ball:{x:180,y:310,vx:0,vy:0,speed:COURTS[court].ballSpeed,spin:0,last:'ai'},score:0,against:0,rally:0,bestRally:0,totalHits:0,smashes:0,elapsed:0,power:0,super:0,serve:.8,nextTowardPlayer:true,phase:'play',events:[],points:0,serveId:0};return r;}
export function paddleWidth(r){return r.super>0?116:90;}
export function activate(r){if(r.phase!=='play'||r.power<100)return false;r.power=0;r.super=4;r.events.push({type:'surge',x:r.px,y:PY});return true;}
export function bounce(ball,offset,direction,moveVelocity=0,boost=false){
 // Original: theta=(paddleCenter-ballPosition)/(paddleSize/2), vx=speed*cos(theta), vy=-speed*sin(theta).
 // Axes are transposed for portrait, with a bounded movement contribution and persistent side spin.
 let theta=clamp(offset,-1,1)*1.02;ball.speed=clamp(ball.speed+15+(boost?70:0),220,540);
 ball.vx=clamp(ball.speed*Math.sin(theta)+moveVelocity*.13,-ball.speed*.87,ball.speed*.87);
 ball.vy=direction*Math.sqrt(Math.max(1,ball.speed*ball.speed-ball.vx*ball.vx));ball.spin=clamp(moveVelocity*.15+offset*55,-110,110);
}
function point(r,who){if(r.phase!=='play')return;r.points++;if(who==='player')r.score++;else r.against++;r.events.push({type:'goal',who,x:r.ball.x,y:who==='player'?0:H});r.bestRally=Math.max(r.bestRally,r.rally);r.rally=0;r.serve=1.15;r.serveId++;r.super=0;r.ball.speed=COURTS[r.court].ballSpeed;r.ball.spin=0;r.ball.x=180;r.ball.y=who==='player'?310:270;r.ball.vx=0;r.ball.vy=0;r.nextTowardPlayer=who==='player';if(r.score>=COURTS[r.court].target){r.phase='won';r.events.push({type:'won'})}else if(r.against>=COURTS[r.court].target){r.phase='lost';r.events.push({type:'lost'})}}
export function tick(r,input={},dt=1/120,flow={x:0,y:0}){if(r.phase!=='play')return;let c=COURTS[r.court];r.elapsed+=dt;r.super=Math.max(0,r.super-dt);r.prevPx=r.px;let target=Number.isFinite(input.x)?input.x:r.px;if(input.left)target=r.px-500*dt;if(input.right)target=r.px+500*dt;r.px=clamp(r.px+clamp(target-r.px,-760*dt,760*dt),paddleWidth(r)/2+3,W-paddleWidth(r)/2-3);r.pvx=clamp((r.px-r.prevPx)/dt,-760,760);
 if(r.serve>0){r.serve-=dt;let at=180;r.aiX+=(at-r.aiX)*Math.min(1,dt*2);if(r.serve<=0){let direction=r.nextTowardPlayer?1:-1;r.ball.vx=(random(r)-.5)*110;r.ball.vy=direction*Math.sqrt(r.ball.speed**2-r.ball.vx**2);r.aiBias=(random(r)-.5)*2*c.error;r.aiClock=0;r.events.push({type:'serve'})}return;}
 const b=r.ball;let aiTarget=b.vy<0?b.x+r.aiBias:180+Math.sin(r.elapsed*.9)*25;r.aiClock+=dt;let aiPace=c.aiSpeed*(r.super>0?.78:1);r.aiX=clamp(r.aiX+clamp(aiTarget-r.aiX,-aiPace*dt,aiPace*dt),34,W-34);
 b.vx+=clamp(Number.isFinite(flow.x)?flow.x:0,-30,30)*dt+b.spin*dt;b.spin*=Math.exp(-dt*1.2);b.vy+=clamp(Number.isFinite(flow.y)?flow.y:0,-25,25)*dt;
 let speed=Math.hypot(b.vx,b.vy);if(!Number.isFinite(speed)||speed<1){b.vx=40;b.vy=250;speed=Math.hypot(40,250)}let wanted=clamp(speed,b.speed*.82,b.speed*1.15);b.vx=b.vx/speed*wanted;b.vy=b.vy/speed*wanted;if(Math.abs(b.vy)<wanted*.38){b.vy=(b.vy<0?-1:1)*wanted*.38;b.vx=(b.vx<0?-1:1)*Math.sqrt(wanted**2-b.vy**2)}
 let ox=b.x,oy=b.y,nx=ox+b.vx*dt,ny=oy+b.vy*dt;
 if(nx<RADIUS&&b.vx<0){nx=RADIUS+(RADIUS-nx);b.vx=-b.vx;b.spin*=-.6;r.events.push({type:'wall',x:RADIUS,y:ny})}else if(nx>W-RADIUS&&b.vx>0){nx=W-RADIUS-(nx-(W-RADIUS));b.vx=-b.vx;b.spin*=-.6;r.events.push({type:'wall',x:W-RADIUS,y:ny})}
 // Swept contact plane prevents fast shots tunnelling through a paddle.
 if(b.vy>0&&oy<=PY-RADIUS&&ny>=PY-RADIUS){let u=(PY-RADIUS-oy)/(ny-oy),hitX=ox+(nx-ox)*u;if(Math.abs(hitX-r.px)<=paddleWidth(r)/2+RADIUS){let offset=(hitX-r.px)/(paddleWidth(r)/2);let smash=Math.abs(r.pvx)>240||r.super>0;bounce(b,offset,-1,r.pvx,smash);b.last='player';nx=hitX;ny=PY-RADIUS-1;r.rally++;r.totalHits++;r.bestRally=Math.max(r.bestRally,r.rally);r.power=Math.min(100,r.power+25);if(smash)r.smashes++;r.aiBias=(random(r)-.5)*2*c.error;r.events.push({type:'hit',who:'player',x:hitX,y:PY,smash,rally:r.rally})}}
 if(b.vy<0&&oy>=AY+RADIUS&&ny<=AY+RADIUS){let u=(AY+RADIUS-oy)/(ny-oy),hitX=ox+(nx-ox)*u;if(Math.abs(hitX-r.aiX)<=34+RADIUS){bounce(b,(hitX-r.aiX)/34,1,0,false);b.last='ai';nx=hitX;ny=AY+RADIUS+1;r.events.push({type:'hit',who:'ai',x:hitX,y:AY,smash:false,rally:r.rally})}}
 b.x=nx;b.y=ny;if(b.y<-RADIUS*2)point(r,'player');else if(b.y>H+RADIUS*2)point(r,'ai');
}
export function medals(r){return r.phase==='won'?(r.against===0?3:r.against<=1?2:1):0;}
export function validRun(r){if(!r||!Number.isInteger(r.court)||r.court<0||r.court>3||r.phase!=='play')return false;for(let k of ['px','prevPx','pvx','aiX','aiBias','aiClock','elapsed','power','super','serve','score','against','rally','totalHits','smashes','bestRally','seed','points','serveId'])if(!Number.isFinite(r[k]))return false;if(r.px<0||r.px>W||r.aiX<0||r.aiX>W||r.power<0||r.power>100||r.serve<-.1||r.serve>2||r.super<0||r.super>4||r.score<0||r.against<0||r.score>=COURTS[r.court].target||r.against>=COURTS[r.court].target)return false;if(!r.ball)return false;for(let k of ['x','y','vx','vy','speed','spin'])if(!Number.isFinite(r.ball[k]))return false;return r.ball.x>=0&&r.ball.x<=W&&r.ball.y>=-20&&r.ball.y<=H+20&&Math.abs(r.ball.vx)<=1000&&Math.abs(r.ball.vy)<=1000&&r.ball.speed>=200&&r.ball.speed<=600;}

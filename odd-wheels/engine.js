(function(root){
'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), copy=v=>JSON.parse(JSON.stringify(v));
const modes=['legs','spring','wings','sneeze','delivery','stilts','roller','party'];
const names=['A CAR WITH LEGS','BOING BOULEVARD','AIR MAIL','ACHOO AVENUE','LUNCH ON THE RUN','LONG WAY UP','ROLLER DISCO','ONE LAST WEIRD LAP'];
const colors=[['#52afa1','#297b72','#718377'],['#ecc18b','#d78362','#a88d76'],['#6cbcd0','#258aa5','#749ba0'],['#88bba0','#497e78','#73897b'],['#e9a8ad','#bd7487','#b9988e'],['#829bca','#496da4','#8b98ac'],['#c9a6cd','#7c6bba','#938aa8'],['#74bcbc','#467c8c','#809991']];
function course(n){const endless=n>=8,k=n%8,mode=modes[k],length=endless?140:112+k*5,level={n,k,mode,name:endless?'WILD LAP '+(n-7):names[k],length,colors:colors[k],width:8,platforms:[],gaps:[],coins:[],props:[],pads:[],cargo:[],checkpoints:[],gold:0};
 const gaps=k===0?[[28,32],[68,73]]:k===1?[[30,38],[73,83]]:k===2?[[27,44],[75,96]]:k===3?[[42,48],[90,97]]:k===4?[[32,37],[79,85]]:k===5?[[34,38],[71,76],[111,116]]:k===6?[[31,36],[69,75],[105,112]]:[[30,37],[70,79],[111,126]];
 let at=-18;for(const g of gaps){level.platforms.push({a:at,b:g[0],x:0,w:8});level.gaps.push({a:g[0],b:g[1]});at=g[1]}level.platforms.push({a:at,b:length+14,x:0,w:8});
 for(let z=8,i=0;z<length-7;z+=5,i++){if(gaps.some(g=>z>g[0]-2&&z<g[1]+2))continue;level.coins.push({id:'c'+i,x:i%5===0?2.5:i%5===3?-2.5:0,z,y:.8});}
 for(let i=0;i<3;i++){let z=[19,57,length-18][i];level.coins.push({id:'g'+i,x:i%2?2.65:-2.65,z,y:1.1,gold:true});}
 for(let z=18,i=0;z<length-12;z+=19,i++){if(gaps.some(g=>z>g[0]-4&&z<g[1]+4))continue;level.props.push({id:'p'+i,x:i%3===0?2.3:i%3===1?-2.2:0,z,type:(k===3||k===7)&&i%2===0?'crate':i%2?'bear':'cone',r:.7});}
 if(k===3)level.props.push({id:'wall',x:0,z:25,type:'crate',r:1.1});
 if(k===1)for(const g of gaps)level.pads.push({x:0,z:g[0]-3,type:'spring'});
 if(k===2||k===7)for(const g of gaps)if(g[1]-g[0]>10)level.pads.push({x:0,z:g[0]-3,type:'fan'});
 if(k===5)for(let z of[23,61,99])level.props.push({id:'low'+z,x:0,z,type:'bar',r:1.5});
 if(k===6)for(let z of[18,57,94])level.pads.push({x:0,z,type:'boost'});
 if(k===4)for(let z of[15,53,101])level.cargo.push({id:'b'+z,x:0,z});
 for(let z=14;z<length-8;z+=27)if(!gaps.some(g=>z>g[0]-1&&z<g[1]+1))level.checkpoints.push(z);
 level.gold=length/(mode==='roller'?8.7:7.2)+7;return level;
}
function fresh(){return{v:1,phase:'ready',n:0,x:0,z:0,y:0,vy:0,vx:0,speed:0,time:0,clock:0,mode:'legs',ground:true,coyote:.12,actionCD:0,boost:0,flash:0,hit:0,checkpoint:0,collected:[],broken:[],usedPads:[],cargo:[],falls:0,bank:0,paint:0,owned:[0],records:{},unlocked:0,bestWild:0,totalLaps:0,lastResult:null};}
function start(s,n){const meta={bank:s.bank,paint:s.paint,owned:s.owned,records:s.records,unlocked:s.unlocked,bestWild:s.bestWild,totalLaps:s.totalLaps};Object.assign(s,fresh(),meta,{n,mode:course(n).mode,phase:'run'});return s;}
function groundAt(c,x,z){return c.platforms.some(p=>z>=p.a&&z<=p.b&&Math.abs(x-p.x)<=p.w/2+.03)}
function respawn(s){s.x=0;s.z=s.checkpoint;s.y=0;s.vy=0;s.vx=0;s.speed=0;s.ground=true;s.coyote=.12;s.hit=1;s.boost=0;s.falls++;s.time+=2.5;}
function action(s,c,events){if(s.phase!=='run'||s.actionCD>0)return false;let mode=s.mode;if(mode==='party')mode=s.z<45?'spring':s.z<100?'sneeze':'wings';
 if(mode==='sneeze'){s.actionCD=.75;s.boost=.5;let broken=0;for(const p of c.props)if(!s.broken.includes(p.id)&&Math.abs(p.x-s.x)<2.2&&p.z>s.z-1&&p.z<s.z+10){s.broken.push(p.id);events.push({type:'break',id:p.id,x:p.x,z:p.z,kind:p.type});broken++}events.push({type:'sneeze',x:s.x,z:s.z,count:broken});}
 if(s.ground||s.coyote>0){s.vy=mode==='spring'?18:mode==='stilts'?11:10.2;s.ground=false;s.coyote=0;s.actionCD=Math.max(s.actionCD,.25);events.push({type:'jump',x:s.x,z:s.z});return true}return mode==='wings';
}
function step(s,c,dt,input={}){const events=[];if(s.phase!=='run')return events;dt=clamp(dt,0,.05);s.time+=dt;s.clock+=dt;s.actionCD=Math.max(0,s.actionCD-dt);s.hit=Math.max(0,s.hit-dt);s.boost=Math.max(0,s.boost-dt);s.flash=Math.max(0,s.flash-dt);if(input.action)action(s,c,events);
 const steer=clamp(input.steer||0,-1,1),target=steer*5.4;s.vx+=(target-s.vx)*Math.min(1,dt*12);s.x+=s.vx*dt;
 const base=s.mode==='roller'?8.7:7.2;const speedTarget=(s.hit>.65?3:base)+(s.boost>0?4:0);s.speed+=(speedTarget-s.speed)*Math.min(1,dt*7);s.z+=s.speed*dt;
 let mode=s.mode;if(mode==='party')mode=s.z<45?'spring':s.z<100?'sneeze':'wings';
 if(mode==='wings'&&input.hold&&s.vy<0){s.vy=Math.max(s.vy,-1.3);s.vy-=3*dt}else s.vy-=22*dt;
 s.y+=s.vy*dt;const floor=groundAt(c,s.x,s.z);if(floor&&s.y<=0&&s.vy<=0){if(!s.ground)events.push({type:'land',x:s.x,z:s.z});s.y=0;s.vy=0;s.ground=true;s.coyote=.12}else{if(s.ground){s.ground=false;s.coyote=mode==='stilts'?.64:.12;}s.coyote=Math.max(0,s.coyote-dt);if(mode==='stilts'&&s.coyote>0&&Math.abs(s.x)<4){s.y=0;s.vy=0;}}
 for(const z of c.checkpoints)if(s.z>=z&&floor&&s.y<.2)s.checkpoint=z;
 for(const p of c.pads)if(!s.usedPads.includes(p.z)&&Math.abs(s.x-p.x)<1.4&&Math.abs(s.z-p.z)<.7&&s.y<1.4){s.usedPads.push(p.z);s.vy=p.type==='fan'?14.5:p.type==='spring'?21:17;s.ground=false;s.boost=p.type==='boost'?1.3:0;events.push({type:p.type,x:s.x,z:s.z});}
 for(const p of c.props)if(!s.broken.includes(p.id)&&Math.abs(s.x-p.x)<p.r+.45&&Math.abs(s.z-p.z)<.65&&s.y<(p.type==='bar'?.9:1.25)&&s.hit<=0){s.broken.push(p.id);s.hit=.7;s.vx=(s.x>=p.x?1:-1)*3;s.speed=2.2;events.push({type:'break',id:p.id,x:p.x,z:p.z,kind:p.type});events.push({type:'bonk',x:s.x,z:s.z});}
 for(const coin of c.coins)if(!s.collected.includes(coin.id)&&Math.hypot(coin.x-s.x,coin.z-s.z)<1.25&&s.y<4){s.collected.push(coin.id);events.push({type:coin.gold?'badge':'coin',x:coin.x,z:coin.z});}
 for(const b of c.cargo)if(!s.cargo.includes(b.id)&&Math.hypot(b.x-s.x,b.z-s.z)<1.65&&s.y<3){s.cargo.push(b.id);events.push({type:'cargo',x:b.x,z:b.z});}
 if(s.y<-4||Math.abs(s.x)>5.6){events.push({type:'fall',x:s.x,z:s.z});respawn(s);}
 if(s.z>=c.length&&floor){s.phase='finish';const badges=c.coins.filter(x=>x.gold&&s.collected.includes(x.id)).length,medal=s.time<=c.gold&&s.falls===0?3:s.time<=c.gold+12&&s.falls<3?2:1;const old=s.records[s.n],first=!old,reward=first?s.collected.length+medal*5+badges*3:Math.max(0,medal-(old.medal||0))*5+Math.max(0,badges-(old.badges||0))*3;
 s.bank+=reward;s.unlocked=Math.max(s.unlocked,Math.min(8,s.n+1));s.totalLaps++;s.bestWild=Math.max(s.bestWild,s.n>=8?s.n-7:0);s.records[s.n]={time:Math.min(s.time,old?.time||1e9),medal:Math.max(medal,old?.medal||0),badges:Math.max(badges,old?.badges||0)};s.lastResult={time:s.time,medal,badges,reward,first};events.push({type:'finish',x:s.x,z:s.z});}return events;
}
function load(v){const s=fresh();try{const o=typeof v==='string'?JSON.parse(v):v;if(!o||o.v!==1)return s;Object.assign(s,o);for(const k of['x','z','y','vy','vx','speed','time','clock','n','bank','unlocked'])if(!Number.isFinite(s[k]))return fresh();s.n=Math.max(0,Math.min(999,s.n|0));s.unlocked=clamp(s.unlocked,0,8);s.paint=clamp(s.paint,0,3);s.records=s.records||{};return s;}catch{return s;}}
const api={fresh,course,start,step,action,groundAt,load,copy,colors,modes,names};if(typeof module==='object')module.exports=api;else root.OW=api;
})(typeof window!=='undefined'?window:globalThis);



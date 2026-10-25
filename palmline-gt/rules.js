import {Util} from './racer-core.js';
export const TRACKS=[
 {name:'Palm Coast',short:'COAST',sky:['#486d9a','#eda9a2','#ffdb9c'],land:'#658e83',land2:'#60877c',road:'#465967',road2:'#425461',edge:'#ecd2b4',time:57,curves:[0,1.1,-1.5,0,2.0,-1.2,0],hills:[0,5,-3,0,4,-6,0]},
 {name:'Copper Canyon',short:'CANYON',sky:['#536f94','#d5a2a0','#f2cb9f'],land:'#bf926b',land2:'#b98c65',road:'#615b62',road2:'#5a555c',edge:'#ecd7ad',time:57,curves:[0,-1.7,2.4,-2,0,1.8,0],hills:[0,9,-5,6,-7,-3,0]},
 {name:'Midnight Mile',short:'NIGHT',sky:['#101d3e','#493e6b','#c38098'],land:'#354255',land2:'#303d51',road:'#29394e',road2:'#26354b',edge:'#90b6c7',time:55,curves:[0,1.5,-2.2,1.8,-1.5,2,0],hills:[0,3,0,-3,6,-6,0]}
];
export const SEG=200,ROAD=2000,MAX=11800,PLAYERZ=1100;
export function makeRoad(theme){
 const segments=[];let last=0;
 // Adapted directly from Jake Gordon's addSegment/addRoad: eased entry/exit curves and hills.
 function addRoad(enter,hold,leave,curve,y){const start=last,end=start+y*SEG,total=enter+hold+leave;
 for(let n=0;n<total;n++){let c=n<enter?Util.easeIn(0,curve,n/enter):n<enter+hold?curve:Util.easeInOut(curve,0,(n-enter-hold)/leave);let yy=Util.easeInOut(start,end,n/total),i=segments.length;
 segments.push({index:i,curve:c,p1:{world:{y:last,z:i*SEG},camera:{},screen:{}},p2:{world:{y:yy,z:(i+1)*SEG},camera:{},screen:{}},clip:0,visible:false});last=yy;}}
 for(let i=0;i<7;i++)addRoad(30,290,30,theme.curves[i],theme.hills[i]);
 addRoad(30,60,30,0,-last/SEG);return segments;
}
export function newRace(track){const road=makeRoad(TRACKS[track]);return {track,road,length:(road.length-160)*SEG,pos:0,x:0,speed:3800,time:TRACKS[track].time,elapsed:0,energy:65,passes:0,near:0,combo:0,comboTime:0,hit:0,hitCount:0,boosting:false,draft:0,checkpoint:0,done:false,traffic:Array.from({length:70},(_,i)=>({id:i,z:4200+i*5100,x:[-.65,0,.65][i%3],speed:3000+(i%5)*420,paint:i%5,passed:false,hit:false})),events:[]};}
export function tick(r,input,dt){if(r.done)return;r.events=[];r.elapsed+=dt;r.time-=dt;r.hit=Math.max(0,r.hit-dt);r.comboTime-=dt;if(r.comboTime<=0)r.combo=0;
 const ps=r.road[Math.floor((r.pos+PLAYERZ)/SEG)%r.road.length],ratio=r.speed/MAX;
 r.boosting=!!input.boost&&r.energy>0&&r.speed>1500;
 let top=r.boosting?MAX*1.28:MAX;
 if(Math.abs(r.x)>1.02)top*=.52;
 if(input.brake)top*=.48;
 r.speed=Util.limit(Util.accelerate(r.speed,r.speed<top?4200:-11000,dt),0,top+1000);
 const steer=(input.right?1:0)-(input.left?1:0);
 r.x=Util.limit(r.x+steer*dt*(1.35+ratio*.8)-ps.curve*dt*ratio*.1,-1.45,1.45);
 r.energy=Util.limit(r.energy+dt*(r.boosting?-23:2.4),0,100);
 r.pos+=r.speed*dt;let drafting=false;
 for(const car of r.traffic){let before=car.z-(r.pos-r.speed*dt+PLAYERZ);car.z+=car.speed*dt;let gap=car.z-(r.pos+PLAYERZ),dx=Math.abs(car.x-r.x);
 if(gap>350&&gap<4200&&dx<.24){drafting=true;r.energy=Util.limit(r.energy+dt*11,0,100)}
 if(!car.passed&&gap<0){car.passed=true;if(!car.hit){r.passes++;r.combo=Math.min(9,r.combo+1);r.comboTime=5;r.energy=Util.limit(r.energy+5,0,100);let near=dx<.46&&dx>.22;if(near)r.near++;r.events.push({type:near?'near':'pass',combo:r.combo});}}
 if(!car.hit&&Math.abs(gap)<380&&dx<.225&&r.hit===0){car.hit=true;r.hitCount++;r.speed*=.48;r.hit=1.2;r.combo=0;r.events.push({type:'hit'});}
 }
 r.draft=drafting?Math.min(1,r.draft+dt*.8):Math.max(0,r.draft-dt*1.3);
 const cp=Math.min(2,Math.floor(r.pos/r.length*3));if(cp>r.checkpoint){r.checkpoint=cp;r.time+=12;r.energy=Math.min(100,r.energy+18);r.events.push({type:'checkpoint'});}
 if(r.pos>=r.length){r.done=true;r.won=true;r.events.push({type:'finish'});}else if(r.time<=0){r.done=true;r.won=false;r.time=0;r.events.push({type:'timeout'});}
}
export function reward(r,oldBest=0){const medal=!r.won?0:r.hitCount<=1&&r.elapsed<54?3:r.hitCount<=5&&r.elapsed<65?2:1;const score=r.won?Math.max(100,300+Math.round(r.time*8)+r.passes*20+r.near*30-r.hitCount*60):0;return {medal,score,credits:Math.max(0,score-oldBest)};}

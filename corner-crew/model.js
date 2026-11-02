(function(root){'use strict';
const levels=[
 {name:'Bakery Corner',goal:5,lanes:1,carEvery:4.4,pedEvery:2.1,patience:11,speed:110,slow:false},
 {name:'Bakery Rush',goal:7,lanes:1,carEvery:3.1,pedEvery:1.5,patience:9.5,speed:125,slow:false},
 {name:'Two-Way Street',goal:8,lanes:2,carEvery:3.7,pedEvery:1.6,patience:10,speed:118,slow:false},
 {name:'The School Run',goal:9,lanes:2,carEvery:3.2,pedEvery:1.3,patience:10,speed:125,slow:true},
 {name:'Festival Rush',goal:11,lanes:2,carEvery:2.6,pedEvery:1.15,patience:9,speed:140,slow:true},
 {name:'Parade Day',goal:13,lanes:2,carEvery:2.5,pedEvery:1.05,patience:8.5,speed:145,slow:true}
];
function create(level){let cfg=levels[level];if(!cfg)throw Error('Bad level');return {level,time:0,hold:false,sent:0,hearts:3,delivered:0,score:0,combo:0,passed:0,cars:[{id:1,lane:0,y:60,wait:0,kind:0}],people:[{id:1,x:93,y:326,speed:105,kind:0,state:'waiting'},{id:2,x:68,y:355,speed:105,kind:1,state:'waiting'}],nextPerson:3,nextCar:2,carClock:cfg.carEvery,pedClock:cfg.pedEvery,enterClock:0,ended:false,won:false,events:[]};}
function press(s,on){if(s.ended)return;on=!!on;if(on&&!s.hold)s.sent=0;s.hold=on}
function step(s,dt){if(s.ended)return;dt=Math.max(0,Math.min(dt,.05));let cfg=levels[s.level];s.time+=dt;s.carClock-=dt;s.pedClock-=dt;s.enterClock-=dt;
if(s.carClock<=0){let lane=(s.nextCar-1)%cfg.lanes;let near=s.cars.some(c=>c.lane===lane&&(lane===1?c.y>700:c.y<15));if(!near){s.cars.push({id:s.nextCar,lane,y:lane===1?805:-85,wait:0,kind:s.nextCar%5===0?1:0});s.nextCar++;s.carClock=cfg.carEvery}else s.carClock=.3;}
if(s.pedClock<=0&&s.delivered+s.people.length<cfg.goal+2){s.people.push({id:s.nextPerson,x:60,y:326+((s.nextPerson%3)*19),speed:cfg.slow&&s.nextPerson%4===0?75:105,kind:s.nextPerson%4,state:'waiting'});s.nextPerson++;s.pedClock=cfg.pedEvery;}
let crossing=s.people.some(p=>p.state==='crossing');let roadBusy=s.cars.some(c=>c.y>245&&c.y<465);
if(s.hold&&!roadBusy&&s.enterClock<=0&&s.sent<3){let p=s.people.find(p=>p.state==='waiting');if(p){p.state='crossing';p.x=105;s.sent++;s.enterClock=.45;s.events.push({type:'start',id:p.id})}}
for(let p of s.people){if(p.state==='crossing'){p.x+=p.speed*dt;if(p.x>=390){p.state='done';s.delivered++;s.combo++;s.score+=100+Math.min(5,s.combo)*10;s.events.push({type:'crossed',x:p.x,y:p.y,combo:s.combo});}}}
s.people=s.people.filter(p=>p.state!=='done');
for(let lane=0;lane<cfg.lanes;lane++){let reverse=lane===1,group=s.cars.filter(c=>c.lane===lane).sort((a,b)=>reverse?a.y-b.y:b.y-a.y),front=reverse?-Infinity:Infinity;for(let c of group){let limit=front+(reverse?82:-82);if(s.hold&&(reverse?c.y>=465:c.y<=245))limit=reverse?Math.max(limit,465):Math.min(limit,245);let next=c.y+(reverse?-1:1)*cfg.speed*dt;c.y=reverse?Math.max(next,limit):Math.min(next,limit);let stopped=s.hold&&(reverse?c.y<=480&&c.y>=465:c.y>=230&&c.y<=245.1);if(stopped){c.wait+=dt;if(c.wait>=cfg.patience*(c.kind?0.7:1)){s.hearts--;s.combo=0;c.wait=0;s.events.push({type:'impatient',lane});}}else c.wait=0;front=c.y;}}
// Only an actual overlapping vehicle and pedestrian causes a near-miss.
let hazard=!s.hold&&s.people.some(p=>p.state==='crossing'&&s.cars.some(c=>{let x=cfg.lanes===1?240:(c.lane===0?178:302);return Math.abs(p.x-x)<38&&Math.abs(p.y-c.y)<48}));
if(hazard){s.hearts--;s.combo=0;for(let p of s.people)if(p.state==='crossing'){p.state='waiting';p.x=75;}s.events.push({type:'oops'});}
for(let c of s.cars)if(c.y>800||c.y< -100){s.passed++;s.events.push({type:'car'});}s.cars=s.cars.filter(c=>c.y<=800&&c.y>= -100);
if(s.delivered>=cfg.goal){s.won=true;s.ended=true;s.hold=false;s.events.push({type:'win'})}else if(s.hearts<=0){s.ended=true;s.hold=false;s.events.push({type:'lose'})}}
root.CornerModel={levels,create,step,press};
})(typeof window==='undefined'?globalThis:window);

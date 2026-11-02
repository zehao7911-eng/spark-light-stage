const assert=require('node:assert/strict');require('./model.js');const M=global.CornerModel;
for(let l=0;l<M.levels.length;l++){
 let s=M.create(l);for(let k=0;k<100;k++)M.step(s,.05);assert.equal(s.delivered,0,'No idle progress');assert.equal(s.hearts,3);
 s=M.create(l);let mode='hold',hold=0,release=0;for(let i=0;i<4000&&!s.ended;i++){if(mode==='hold'){M.press(s,true);hold+=.05;if(hold>4.9&&!s.people.some(p=>p.state==='crossing')){mode='release';release=0}}else{M.press(s,false);release+=.05;if(release>3&&!s.cars.some(c=>c.y>245&&c.y<465)){mode='hold';hold=0}}M.step(s,.05);s.events=[]}assert.equal(s.won,true,`room ${l+1} must be winnable`);assert.equal(s.delivered,M.levels[l].goal);assert(s.passed>0);let old=s.delivered;M.step(s,.05);assert.equal(s.delivered,old);M.press(s,true);assert.equal(s.hold,false);}
let p=M.create(0);p.people=[{id:9,x:240,y:350,speed:100,kind:0,state:'crossing'}];p.cars=[{id:4,lane:0,y:350,wait:0,kind:0}];M.step(p,.01);assert.equal(p.hearts,2);assert.equal(p.people[0].state,'waiting');
p=M.create(0);p.people=[{id:9,x:110,y:350,speed:100,kind:0,state:'crossing'}];p.cars=[{id:4,lane:0,y:350,wait:0,kind:0}];M.step(p,.01);assert.equal(p.hearts,3,'No distant collision');
p=M.create(2);p.cars=[{id:1,lane:1,y:500,wait:0,kind:0}];M.press(p,true);for(let i=0;i<40;i++)M.step(p,.05);assert(Math.abs(p.cars[0].y-465)<.01,'upward car stops');
p=M.create(0);p.people=[];p.cars=[{id:1,lane:0,y:245,wait:0,kind:1}];M.press(p,true);for(let i=0;i<180;i++)M.step(p,.05);assert(p.hearts<3,'impatient cars penalize');
console.log('Six complete routes and idle, collision, two-way stop, impatience, and terminal checks passed.');

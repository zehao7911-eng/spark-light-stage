import assert from'node:assert/strict';import{fresh,create,aim,stop,step,pulse,bank,next,offers,buy,encode,decode,stars,reach,hurt}from'../core.mjs';
let count=0;const ok=(x,m)=>{assert.ok(x,m);count++},eq=(a,b,m)=>{assert.deepEqual(a,b,m);count++};
function play(save,room,build=[0,0,0,0,0,0],loop=0){let s=create(save,room,build,loop);for(let i=0;i<60000&&['ready','play'].includes(s.phase);i++){let u=s.units.filter(e=>!e.dead).sort((a,b)=>Math.hypot(a.x-s.x,a.y-s.y)-Math.hypot(b.x-s.x,b.y-s.y))[0];if(!u)break;let radius=u.type==='boss'?73:45;aim(s,u.x+Math.cos(s.t*3)*radius,u.y+Math.sin(s.t*3)*radius);if(s.pulse<=0&&Math.hypot(s.x-u.x,s.y-u.y)<95)pulse(s);step(s,1/120);s.events=[]}return s}
let save=fresh(),build=Array(6).fill(0),report=[];for(let i=0;i<6;i++){let s=play(save,i,build);report.push({room:i+1,phase:s.phase,time:Math.round(s.t),kills:s.killed,total:s.total,hp:s.hp,chain:s.bestChain,score:s.score,earned:s.earned});ok(s.phase==='won','ordinary six-room controller: '+JSON.stringify(report));ok(bank(save,s));let money=save.coins;ok(!bank(save,s));eq(save.coins,money);let n=offers(s)[0];if(n!==undefined)build[n]++;ok(decode(encode(save,s)).run?.phase==='won');eq(stars(s),save.stars[i])}eq(save.unlocked,5);eq(save.clears,1);
// Independent test builds exercise every relic's effect through complete rooms.
for(let k=0;k<6;k++){let a=fresh();a.unlocked=5;let b=Array(6).fill(0);b[k]=2;let s=play(a,k%6,b);ok(s.phase==='won','relic build '+k)}
// Stopped input eventually stops the angular drive; ready state has no idle kills.
let a=fresh(),s=create(a),before=structuredClone(s);for(let i=0;i<100;i++)step(s,1/60);eq(s,before);aim(s,40,50);for(let i=0;i<60;i++)step(s,1/120);stop(s);for(let i=0;i<600;i++)step(s,1/120);ok(s.spin<.001);ok(s.fx>=12&&s.fx<=348&&s.fy>=22&&s.fy<=428);
// Snapshot stores stopped input and exact logical state. Further identical input stays exact.
a=fresh();a.unlocked=2;s=create(a,2);aim(s,220,190);for(let i=0;i<200;i++)step(s,1/120);stop(s);s.events=[];let d=decode(encode(a,s));ok(!!d.run);eq(d.run,s);for(let i=0;i<100;i++){aim(s,130,100);aim(d.run,130,100);step(s,1/120);step(d.run,1/120)}eq(s,d.run);
// Shockwave cooldown, explicit defeat, single settlement, free retry.
a=fresh();s=create(a);aim(s,180,290);ok(pulse(s));ok(!pulse(s));s.iframes=0;for(let i=0;i<5;i++){s.iframes=0;ok(hurt(s))}eq(s.phase,'lost');let hp=s.hp;ok(!hurt(s));eq(s.hp,hp);ok(bank(a,s));ok(!bank(a,s));let retry=create(a,0,s.build);eq(retry.hp,5);eq(retry.id,s.id+1);
// Shop caps / costs and invalid saves.
a=fresh();a.coins=1e5;for(let k=0;k<3;k++){for(let n=0;n<3;n++)ok(buy(a,k));ok(!buy(a,k))}ok(!buy(a,-1));ok(!buy(a,3));ok(!buy(a,1.5));ok(!buy(fresh(),0));
for(let raw of ['null','{}','[]','false','bad',JSON.stringify({...fresh(),coins:-3}),JSON.stringify({...fresh(),unlocked:8}),JSON.stringify({...fresh(),levels:[9,0,0]})])eq(decode(raw),fresh());
// All six relics change an actual numeric behavior, not merely the card art.
let base=create(fresh()),long=create(fresh());long.build[0]=2;eq(reach(long)-reach(base),20);
let chain=create(fresh()),destination=chain.units[10];aim(chain,destination.x,destination.y);for(let i=0;i<160;i++)step(chain,1/120);ok(chain.killed>0,'chain contact makes tap destination smash brittle pots');
let collapse=create({...fresh(),unlocked:2},2);aim(collapse,180,300);let guardian=collapse.units.find(u=>u.type==='boss');guardian.hp=0;guardian.dead=true;collapse.killed=1;step(collapse,1/120);eq(collapse.phase,'won');eq(collapse.killed,collapse.total);ok(collapse.events.some(e=>e.type==='blast'&&e.radius===360));
let finish=create(fresh());aim(finish,180,280);finish.units.slice(0,-2).forEach(u=>u.dead=true);finish.killed=finish.total-2;finish.pulse=7;step(finish,1/120);eq(finish.pulse,0);ok(finish.finisher);finish.pulse=5;step(finish,1/120);ok(finish.pulse>4,'finisher recharge happens only once');
let healing=create(fresh());healing.build[3]=2;healing.hp=1;aim(healing,180,180);healing.units.forEach(u=>{u.x=180;u.y=384});pulse(healing);ok(healing.hp>1);ok(healing.events.some(e=>e.type==='heal'));
let fire=create(fresh());fire.build[2]=2;aim(fire,180,270);fire.units.forEach((u,i)=>{u.x=180+i*3;u.y=384});pulse(fire);ok(fire.events.some(e=>e.type==='blast'));ok(fire.killed>1);
let ghost=create(fresh());ghost.build[5]=2;aim(ghost,180,280);hurt(ghost);ok(ghost.iframes>2.5);
// Expedition transition carries chosen relic, changes room, and wraps only after room six.
a=fresh();for(let room=0;room<6;room++){let win=play(a,room);ok(bank(a,win));let off=offers(win);ok(off.length===3&&new Set(off).size===3);let after=next(a,win,off[0]);ok(!!after);eq(after.room,(room+1)%6);eq(after.loop,room===5?1:0);eq(after.build[off[0]],1);eq(after.id,win.id+1);ok(next(a,win,99)===null)}
// Bounded continuation, six-room controller, and kill conservation for multiple loops.
for(let loop of [1,3]){let a=fresh();a.unlocked=5;a.levels=[1,1,1];for(let room=0;room<6;room++){let run=play(a,room,[1,1,1,1,1,1],loop);ok(run.phase==='won','loop '+loop+' room '+room);eq(run.killed,run.units.filter(u=>u.dead).length);ok(run.shots.length<=35);ok(run.total<=30);ok(run.hp>0)}}
for(let raw of [JSON.stringify({...fresh(),run:{}}),JSON.stringify({...fresh(),stars:[0,0,0,0,0,4]})])eq(decode(raw).run,null);
console.log(JSON.stringify({assertions:count,report},null,2));

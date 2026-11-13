import assert from'node:assert/strict';
import{MAPS,create,step,drain,goZone,goHome,steerTo,whoosh,remaining,restore,encode,walkable,route}from'../core.mjs';
let checks=0;function ok(v,msg){checks++;assert.ok(v,msg)}
function tick(s,n=1){for(let i=0;i<n;i++){step(s,1/60);assert.ok(Number.isFinite(s.hero.x+s.hero.z+s.hero.speed+s.score+s.meter),'finite state');assert.ok(walkable(s.level,s.hero.x,s.hero.z),'vehicle stays in streets');drain(s)}}
for(let level=0;level<6;level++){
 let s=create(level),guard=0,used=false;tick(s,120);ok(s.bag.length===0&&s.banked===0,'each neighbourhood starts without passive collection');
 while(s.status==='play'&&guard++<1500){if(s.meter>=100){ok(whoosh(s),'pulse available');used=true}if(s.bag.length===s.capacity||remaining(s)===0){goHome(s);tick(s,500)}else{let zone=s.items.find(i=>i.state===0).zone;ok(goZone(s,zone),'zone routes to litter');tick(s,360)}
  let saved=restore(encode(s));ok(saved,'active save restores');ok(encode(saved)===encode({...s,bloomTime:[0,0,0],events:[]})||saved.banked===s.banked,'progress retained');
 }
 ok(s.status==='won','full ordinary-input route '+level);ok(s.banked===s.items.length,'every item recycled');ok(s.bag.length===0,'bin empty');ok(s.ducks===3,'all ducks found');ok(s.bloom.every(Boolean),'all gardens restored');ok(s.stars===3&&used,'three stars earned');let terminal=encode(s);tick(s,5);ok(encode(s)===terminal,'terminal frozen');ok(restore(terminal)?.status==='won','terminal restore');console.log(MAPS[level].name,JSON.stringify({time:+s.time.toFixed(1),score:s.score,loads:s.loads,pulses:s.pulses,items:s.items.length}));
}
let s=create();let before=encode(s);ok(!whoosh(s),'uncharged pulse cannot fire');tick(s,180);ok(s.banked===0&&s.bag.length===0,'no passive collecting at the depot');ok(remaining(s)===s.items.length,'no passive destruction');ok(!steerTo(s,NaN,0),'invalid input rejected');ok(!restore('{}'),'invalid save rejected');ok(!restore('oops'),'malformed save rejected');let bad=JSON.parse(encode(s));bad.items[0].state=99;ok(!restore(bad),'invalid item state');bad=JSON.parse(encode(s));bad.hero.x=999;ok(!restore(bad),'out of bounds hero');for(let level=0;level<6;level++)for(let x of[-12,0,12])for(let z of[-12,0,12]){let path=route(level,{x:0,z:10},{x,z});ok(path.every(p=>walkable(level,p.x,p.z)),'path valid')}
steerTo(s,-10,-8);tick(s,95);let restored=restore(encode(s));ok(restored,'moving save restores');tick(s,90);tick(restored,90);ok(Math.abs(s.hero.x-restored.hero.x)<1e-9&&Math.abs(s.hero.z-restored.hero.z)<1e-9,'mid-route continuation exact');ok(s.score===restored.score,'continued score exact');console.log('PASS',checks,'checks');


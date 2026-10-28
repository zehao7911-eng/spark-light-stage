import assert from 'node:assert/strict';import{Game}from './model.js';import{goalPosition}from './levels.js';let checks=0;const ok=(v,m)=>{assert.ok(v,m);checks++;};
for(let level=0;level<9;level++){
 let g=new Game(level);
 for(let round=0;round<8&&!g.won;round++){
  for(let [x,y]of g.def.chips){g.begin();g.cut(x-.65,y,x+.65,y);for(let j=0;j<4;j++)g.step(1/60);}
  for(let i=0;i<g.targets.length;i++){if(g.targets[i].released)continue;let p=goalPosition(g.def.goals[i],g.time),r=g.def.goals[i].r;g.begin();g.cut(p.x-r-.3,p.y,p.x+r+.3,p.y);g.cut(p.x,p.y-r-.3,p.x,p.y+r+.3);for(let j=0;j<8;j++)g.step(1/60);}
  for(let j=0;j<180&&!g.won;j++)g.step(1/60);
 }
 console.log(JSON.stringify({level:level+1,won:g.won,rescued:g.rescued,power:g.power,chips:g.chips,strokes:g.strokes,cuts:g.cutCount}));ok(g.won,'normal cuts complete '+level);ok(g.stars===3,'optional chips reachable '+level);ok(g.nets.every(n=>n.nodes.every(p=>[p.x,p.y,p.z].every(Number.isFinite))),'finite net');let frozen=JSON.stringify(g.save());g.step(1);g.cut(0,0,3,3);ok(JSON.stringify(g.save())===frozen,'terminal immutable');
}
let a=new Game(3);a.begin();a.cut(-1,2.1,1,2.1);for(let j=0;j<32;j++)a.step(1/60);let b=Game.restore(a.save());ok(b,'restore active');for(let j=0;j<120;j++){a.step(1/60);b.step(1/60);}assert.deepEqual(a.save(),b.save());checks++;
let idle=new Game(4);for(let j=0;j<1200;j++)idle.step(1/60);ok(idle.cutCount===0&&idle.rescued===0,'no passive free ship');ok(idle.cut(NaN,0,1,1)===0,'reject nonfinite cut');let corrupt=idle.save();corrupt.nets[0].positions[0]=Infinity;ok(!Game.restore(corrupt),'reject invalid saved positions');
let power=new Game(3);power.begin();power.cut(-1.2,-1.3,1.2,-1.3);power.cut(0,-2.6,0,0);for(let j=0;j<180;j++)power.step(1/60);ok(!power.targets[1].released,'unpowered bay holds its craft');
let double=new Game(6);double.begin();double.cut(-1.5,0,1.5,0);double.cut(0,-1.5,0,1.5);for(let j=0;j<6;j++)double.step(1/60);ok(!double.targets[0].released,'second weave needs another gesture');
console.log('Passed '+checks+' checks.');

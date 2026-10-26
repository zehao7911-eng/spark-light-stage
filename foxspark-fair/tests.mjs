import assert from 'node:assert/strict';import * as C from './core.js';import {SourceBomb} from './source-bomb.js';
let checks=0;function ok(v,m){assert.ok(v,m);checks++}function tick(s,t){for(let i=0;i<Math.ceil(t*60);i++)C.step(s,1/60);C.drain(s)}
let a=C.create();C.plant(a);ok(a.bombs[0].getDangerPositions().some(p=>p.x===3&&p.y===9),'cage hit');ok(!a.bombs[0].getDangerPositions().some(p=>p.x===4&&p.y===9),'wood stops');ok(C.move(a,0),'owner leaves');tick(a,2.9);ok(a.birds===1,'first bird rescue');let b=C.restore(JSON.stringify(C.snapshot(a)));ok(b&&b.birds===1,'restore');ok(!C.restore('{}'),'bad save');
function walk(s,p){let r=C.route(s,p,false);if(!r)return false;for(const q of r){let d=C.DIRS.findIndex(([x,y])=>x===Math.sign(q.x-s.player.x)&&y===Math.sign(q.y-s.player.y));if(!C.move(s,d))return false;tick(s,s.player.moveMax+.02);if(s.ended)break}return true}
const report=[];
for(let level=0;level<9;level++){
 let s=C.create(level,0,245+level);let loops=0;
 // Use the real movement/fuse/blast loop; remove enemies only in the deterministic map-solvability fixture.
 s.enemies=[];
 while((s.birds<s.required||!s.hasKey)&&loops++<50){
  let candidates=[];for(let y=1;y<10;y++)for(let x=1;x<8;x++)if(C.walkable(s,x,y)){
   let r=C.route(s,{x,y},false);if(!r)continue;
   let bomb=new SourceBomb(s.world,{x,y},2,-1),danger=bomb.getDangerPositions(),targets=danger.filter(p=>s.grid[p.y]?.[p.x]===2||s.grid[p.y]?.[p.x]===3);if(!targets.length)continue;
   const old=s.player;s.player={...old,x,y};let escape=null;for(let yy=1;yy<10;yy++)for(let xx=1;xx<8;xx++){if(danger.some(p=>p.x===xx&&p.y===yy))continue;let er=C.route(s,{x:xx,y:yy},false);if(er&&er.length<8&&(!escape||er.length<escape.r.length))escape={x:xx,y:yy,r:er}}s.player=old;
   if(escape)candidates.push({x,y,r,escape,n:targets.length})
  }
  candidates.sort((a,b)=>a.r.length-b.r.length||b.n-a.n);let q=candidates[0];if(!q)console.log({level,player:s.player,grid:s.grid,birds:s.birds,pickups:s.pickups});ok(q,'bomb solution level '+level);ok(walk(s,q),'approach');ok(C.plant(s),'plant');ok(walk(s,q.escape),'escape');tick(s,3);ok(!s.lost,'survive');
  let k=s.pickups.find(p=>p.type==='key');if(k)walk(s,k);
 }
 ok(s.birds===s.required&&s.hasKey,'all objectives '+level);let seal=s.pickups.find(p=>p.type==='seal');if(seal)walk(s,seal);ok(walk(s,{x:4,y:1})&&s.won,'exit '+level);let before=s.time;tick(s,5);ok(before===s.time,'terminal freeze');report.push({level:level+1,bombs:s.planted,stars:C.stars(s),hurt:s.hurt,chain:s.bestChain});
}
let p={best:Array(9).fill(0),scores:Array(9).fill(0),unlocked:0};let win=C.create();win.won=true;win.sealed=true;C.reward(p,win);C.reward(p,win);ok(C.total(p)===3,'no star farming');
let ch=C.create(2);ch.player.x=1;ch.player.y=7;C.plant(ch);tick(ch,2.3);ok(ch.bestChain>=3,'recursive chain');
console.log(JSON.stringify({checks,report},null,2));


// Additional adversarial and actor tests.
let enemy=C.create(1);let before=enemy.enemies[0].x+','+enemy.enemies[0].y;tick(enemy,8);ok(enemy.enemies.every(e=>enemy.grid[e.y][e.x]===0),'enemy stays walkable');enemy.invul=0;enemy.enemies[0].x=enemy.player.x;enemy.enemies[0].y=enemy.player.y;enemy.enemies[0].cool=2;C.step(enemy);ok(enemy.hp===2,'enemy collision hurts');let guarded=C.create(1,3);guarded.invul=0;guarded.enemies[0].x=1;guarded.enemies[0].y=9;guarded.enemies[0].cool=2;C.step(guarded);ok(guarded.hp===4&&guarded.guard===0,'guard absorbs hit');
let mid=C.create(2);C.plant(mid);tick(mid,.6);let copy=C.restore(C.snapshot(mid));ok(copy&&Math.abs(copy.bombs.find(b=>!b.primed).timer-.6)<.02,'mid fuse restore');tick(mid,2);tick(copy,2);ok(JSON.stringify(C.snapshot(mid))===JSON.stringify(C.snapshot(copy)),'restored simulation identical');
for(let l=0;l<9;l++){let r=C.create(l);for(let n=0;n<2000;n++){if(n%60===0)C.plant(r);C.step(r,1/60,n%4);C.drain(r);ok(r.player.x>0&&r.player.x<8&&r.player.y>0&&r.player.y<10,'actor bounds');ok(r.bombs.length<16&&r.fires.length<120,'bounded effects')}ok(C.restore(C.snapshot(r))!==null,'random save valid')}
console.log('PASS total assertions: '+checks);
import {Art} from './art.js';import fs from 'node:fs';const ctx=new Proxy({arc(x,y,r){ok(Number.isFinite(r)&&r>=0,'valid particle radius')}},{get(o,k){return k in o?o[k]:(()=>{})},set(o,k,v){o[k]=v;return true}});let renderer=new Art({getContext:()=>ctx},{market:{},garden:{},observatory:{},sprites:{}},JSON.parse(fs.readFileSync(new URL('./assets/frames.json',import.meta.url),'utf8')));for(let l=0;l<9;l++){let r=C.create(l);for(const type of ['blast','crate','bird','hurt','hop'])renderer.burst({type,x:3,y:3});for(let i=0;i<100;i++)renderer.draw(r,i%3===0?1:.016)}ok(renderer.fx.length===0,'expired particles retired');console.log('PASS including renderer: '+checks);

const assert=require('node:assert/strict'),R=require('./engine.js');
function tick(s,n){for(let i=0;i<n;i++){R.step(s);s.events=[];}}
// The payout comes from a body crossing the physical edge, never a click reward.
{let s=R.fresh();s.started=true;s.coins=[];R.spawn(s,180,377,1);s.coins[0].vy=100;tick(s,30);assert.equal(s.total,1);assert.equal(s.inventory[1],1);assert(s.wallet>=6);const bank=s.wallet;tick(s,60);assert.equal(s.wallet,bank);}
{let s=R.fresh();s.started=true;const bank=s.wallet,n=s.coins.length;assert(R.drop(s));assert.equal(s.wallet,bank);assert.equal(s.coins.length,n+1);assert.equal(s.stock,17);assert(!R.drop(s));tick(s,20);assert(R.drop(s));}
{let s=R.fresh();s.started=true;s.paused=true;const before=R.pack(s);tick(s,120);assert.equal(R.pack(s),before);s.paused=false;s.ready=true;s.offers=[0,1,2];const snap=R.pack(s);tick(s,120);assert.equal(R.pack(s),snap);assert(!R.advance(s,5));assert(R.advance(s,1));assert.equal(s.round,2);assert.equal(s.hand[0],2);assert.equal(s.charms[1],1);assert(!R.advance(s,1));}
{let s=R.fresh();s.started=true;s.coins=[];let a=R.spawn(s,180,200,2),b=R.spawn(s,210,200,2);a.age=.66;b.age=.1;tick(s,1);assert(a.fired&&b.fired,'adjacent bursts chain');const nn=s.coins.length;tick(s,60);assert.equal(s.coins.length,nn);s.coins=[];R.spawn(s,180,200,3);tick(s,60);assert.equal(s.coins.length,3,'twins add real bodies');}
{let s=R.fresh();s.wallet=10000;const old=R.capacity(s);assert(R.buy(s,1));assert.equal(R.capacity(s),old+4);assert.equal(s.stock,R.capacity(s));for(let i=0;i<3;i++)assert(R.buy(s,1));assert(!R.buy(s,1));assert(!R.buy(s,-1));assert(!R.buy(s,NaN));s.wallet=0;assert(!R.buy(s,0));s.ready=true;s.offers=[0,1,2];s.charms[0]=5;assert(R.advance(s,0));assert.equal(s.wallet,100,'max charms retain a usable reward');}
{let s=R.fresh();s.started=true;s.score=R.goal(s.round);s.events=Array.from({length:180},()=>({kind:'land'}));R.step(s);assert(s.events.some(e=>e.kind==='complete'),'reward prompt survives a full effects queue');s.phase=Math.PI;const oldId=s.id;R.advance(s,s.offers[0]);assert(s.coins.filter(c=>c.id>=oldId).every(c=>c.y>=R.pusher(s)+15),'restocks do not appear behind the extended plate');}
{let s=R.fresh();s.started=true;s.ready=true;s.offers=[0,1,2];s.dropCD=.2;assert(R.advance(s,0));assert(s.awaitDrop);const before=R.pack(s);tick(s,120);assert.equal(R.pack(s),before,'new round waits for a deliberate input');assert(R.drop(s),'new round clears the previous drop cooldown');assert(!s.awaitDrop);}
{let s=R.fresh();s.started=true;s.coins=[];let m=R.spawn(s,180,220,4),c=R.spawn(s,240,220,0);m.age=.6;tick(s,20);assert(c.x<240,'magnet really attracts nearby bodies');}
{let s=R.fresh();s.started=true;s.coins=[];for(const x of [168,196]){const c=R.spawn(s,x,377,5);c.vy=100;}tick(s,45);assert.equal(s.inventory[5],2);assert(s.wallet>=48,'simultaneous neighboring pearls retain their synergy');}
{let s=R.fresh();s.started=true;s.coins=[];const bell=R.spawn(s,180,377,6),other=R.spawn(s,180,220,0);bell.vy=100;tick(s,20);assert.equal(s.inventory[6],1);assert(other.y>220,'collected bell pushes the remaining pile');}
{let s=R.fresh();s.started=true;s.coins=[];const crown=R.spawn(s,180,377,7);crown.vy=100;tick(s,20);assert.equal(s.inventory[7],1);assert.equal(s.coins.filter(c=>c.type===1).length,3,'crown creates three real silver bodies');}
let rounds=0,payouts=0,drops=0,types=new Set();const started=performance.now();
for(let seed=1;seed<=16;seed++){
 const s=R.fresh(seed*1837);s.started=true;
 for(let k=0;k<60*180;k++){
  if(k%23===0){s.aim=18+(k*37+seed*17)%324;if(R.drop(s,k%3))drops++;}
  if(k%160===0)R.shake(s);
  R.step(s);s.events=[];
  if(k%180===0){const restored=R.restore(R.pack(s));assert(restored,'valid physics snapshot restores seed '+seed+' tick '+k);assert.equal(R.pack(restored),R.pack(s));}
  if(s.ready){rounds++;R.advance(s,s.offers[(k+seed)%3]);for(let j=0;j<6;j++)if(s.wallet>R.price(s,j))R.buy(s,j);}
  assert(s.coins.length<=160);assert(s.stock>=0&&s.wallet>=0);
  for(const c of s.coins){assert(Number.isFinite(c.x+c.y+c.vx+c.vy+c.z));assert(c.x>=0&&c.x<=360);types.add(c.type);}
 }
 assert(s.round>=9,'all coin unlock milestones reachable');payouts+=s.total;
}
assert.equal(types.size,8);assert.equal(R.restore('invalid'),null);assert.equal(R.restore(JSON.stringify({...R.fresh(),wallet:-1})),null);
console.log('PASS',rounds,'round clears;',payouts,'physical payouts;',drops,'valid drops; all 8 types; 16 seeded 3-minute runs. CPU seconds',((performance.now()-started)/1000).toFixed(2));

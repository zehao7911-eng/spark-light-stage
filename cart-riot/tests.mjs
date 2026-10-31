import assert from 'node:assert/strict';
import * as M from './model.mjs';
let checks=0;const check=(v,msg)=>{assert.ok(v,msg);checks++},same=(a,b,msg)=>{assert.deepEqual(a,b,msg);checks++};
function advance(s,seconds){for(let i=0;i<seconds*60;i++)M.tick(s,1/60)}
function drive(index,kit=[0,0,0],seed=381223){let s=M.create(index,kit,seed);M.press(s,0);let log=[],nextHop=0;for(let f=0;f<6000&&s.phase!=='finish';f++){
 let targets=s.entities.filter(e=>e.active&&e.type==='crate'&&e.z>s.d+1.2&&e.z<s.d+24).sort((a,b)=>(a.z-s.d)*1.3+Math.abs(a.x-s.x)*.4-((b.z-s.d)*1.3+Math.abs(b.x-s.x)*.4));let target=targets[0];if(target){if(!s.held)M.press(s,target.x);M.steer(s,target.x)}
 let obstacle=s.entities.find(e=>e.active&&['bar','barrier','traffic','tram'].includes(e.type)&&e.z-s.d>1&&e.z-s.d<5.5&&Math.abs(M.ex(s,e)-s.x)<1.1);if(obstacle&&s.y===0&&s.stun===0&&s.t>nextHop){M.release(s);nextHop=s.t+1.2}
 if(s.riot>=100&&s.entities.filter(e=>e.active&&e.type==='crate'&&e.z>s.d&&e.z<s.d+15).length>1)M.burst(s);
 M.tick(s,1/60);log.push(...M.drain(s));
 }return{s,log}}
let campaign=[],p=M.makeProfile();for(let index=0;index<6;index++){let {s,log}=drive(index);check(s.phase==='finish','street reaches checkout '+index);check(M.badges(s)>0,'normal steering clears quota '+index+' '+s.smashes);check(s.entities.length<350,'bounded entity set');check(s.smashes>=M.street(index).smash,'visible quota matched');check(s.score>0&&s.coins>0,'actual earned rewards');let reward=M.claim(s,p);check(reward.earned>0,'clear reward');let wallet=p.wallet;check(!M.claim(s,p)&&p.wallet===wallet,'no duplicate receipt');campaign.push({street:index+1,smashes:s.smashes,chain:s.bestCombo,hops:s.hops,bonks:s.bonks,badges:M.badges(s),score:s.score});}
check(M.unlocked(p)===6&&p.best[5]>0,'all campaign routes unlock');check(M.paintUnlocked(p,1),'earned lagoon paint');
let idle=M.create();M.press(idle,0);M.release(idle,true);advance(idle,60);check(idle.phase==='finish'&&M.badges(idle)===0,'idle centre line cannot clear quota');
function fixture(type,x=0,z=5){let s=M.create();s.entities=[{id:1,type,x,z,active:true,passed:false,stack:2}];M.press(s,0);return s}
let ground=fixture('bar');advance(ground,1);check(ground.bonks===1,'ground cart bonks low bar');let jumper=fixture('bar');advance(jumper,.2);M.release(jumper);advance(jumper,.8);check(jumper.bonks===0&&jumper.hops===1,'physical hop clears low bar');
let low=M.create(0,[0,0,0]),high=M.create(0,[3,0,0]);low.entities=[];high.entities=[];M.press(low,0);M.press(high,0);advance(low,.7);advance(high,.7);M.release(low);M.release(high);advance(low,.35);advance(high,.35);check(high.y>low.y+.5,'spring kit changes apex');
let a=fixture('barrier'),b=fixture('barrier');b.upgrades[1]=3;advance(a,.7);advance(b,.7);check(b.speed>a.speed&&b.stun<a.stun,'bumper changes recovery');
let c=fixture('coin',1.8),d=fixture('coin',1.8);d.upgrades[2]=3;advance(c,1);advance(d,1);check(d.coins>c.coins,'coin kite changes capture radius');
let narrow=fixture('crate',1.75,2),wide=fixture('crate',1.75,2);wide.riot=100;check(M.burst(wide),'full riot accepted');check(!M.burst(wide),'riot cannot repeat before recharge');advance(narrow,.5);advance(wide,.5);check(wide.smashes>narrow.smashes,'riot widens actual smash reach');
let ramp=fixture('ramp',0,2);advance(ramp,.35);check(ramp.y>0&&ramp.hops===1,'ramp really launches cart');
let pad=fixture('pad',0,2);advance(pad,.35);check(pad.boost>0&&pad.riot>=12&&!pad.entities[0].active,'speed pad really boosts and charges');
let wildA=M.create(6,[0,0,0],123),wildB=M.create(6,[0,0,0],456);check(JSON.stringify(wildA.entities)!==JSON.stringify(wildB.entities),'after-hours seed changes actual layouts');
let active=M.create(2,[1,0,0]);M.press(active,1.5);advance(active,.4);M.release(active);advance(active,.15);let packed=M.pack(active),restored=M.unpack(JSON.parse(JSON.stringify(packed)));check(restored&&restored.y>0,'midair restore');same(M.pack(restored),{...packed,payment:null},'restored physical fields exact');advance(active,.5);advance(restored,.5);same(M.pack(restored),{...M.pack(active),payment:null},'restored trajectory stays exact');
check(M.unpack({v:1})===null,'reject incomplete saves');check(M.unpack({...packed,entities:[{type:'evil',x:0,z:0}]})===null,'reject unknown object types');check(M.unpack({...packed,y:Infinity})===null,'reject impossible physics');
let finished=drive(0).s,profile=M.makeProfile();M.claim(finished,profile);let received=M.unpack(M.pack(finished));same(received.payment,finished.payment,'receipt survives reload');check(!M.claim(received,profile),'reload never repays receipt');
let bank=M.makeProfile();bank.wallet=1000;for(let i=0;i<3;i++){let wallet=bank.wallet;check(M.buy(bank,i),'purchase permitted');check(bank.upgrades[i]===1&&bank.wallet===wallet-M.UPGRADES[i].cost[0],'purchase charges exact price')}check(!M.buy(bank,-1)&&!M.buy(bank,9),'invalid upgrades ignored');let broke=M.makeProfile();check(!M.buy(broke,0)&&broke.wallet===0,'no negative wallet');
let endings=[];for(let i of [6,7,8]){let {s}=drive(i,[1,1,1],1024+i);check(M.badges(s)>0,'after-hours route remains playable '+i);endings.push({index:i,smashes:s.smashes,badges:M.badges(s)})}
console.log(JSON.stringify({checks,campaign,idleCrates:idle.smashes,idleBadges:M.badges(idle),endings,scope:'Simulation controllers and isolated physical interactions. Native UI play and visual review are separate.'}));

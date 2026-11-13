(function(root){
'use strict';
const RIVALS=[
 {name:'SIDE-EYE CAT',type:'cat',hp:0.095,rate:2.8,charge:.9,theme:'THE PARK',quirk:'Steady pull'},
 {name:'SNEAKER SHARK',type:'shark',hp:0.11,rate:2.65,charge:.85,theme:'THE PIER',quirk:'Quick surges'},
 {name:'CAPPUCCINO',type:'coffee',hp:0.14,rate:3.2,charge:1.1,theme:'THE CAFÉ',quirk:'Double pull'},
 {name:'BANANA CAT',type:'banana',hp:0.15,rate:2.55,charge:.9,theme:'THE FAIR',quirk:'Slippery grip'},
 {name:'TUNG TUG',type:'wood',hp:0.16,rate:2.8,charge:.8,theme:'THE DOCK',quirk:'Heavy beats'},
 {name:'FINAL BOSS',type:'coffee',hp:0.20,rate:2.8,charge:1,theme:'THE FINALS',quirk:'Big finish'}
];
function clamp(x,a,b){return Math.max(a,Math.min(b,x))}
function fresh(){return {round:0,wins:0,coins:0,best:0,upgrades:0,sound:true}}
function match(profile){return {lead:0,energy:1,combo:0,clock:0,nextPull:1.5,warning:0,outcome:'playing',impact:0,move:0,opponent:0,guard:0,hype:0,rivalHits:0,followup:false};}
function pull(s,p,power){if(s.outcome!=='playing')return null;if(Number.isFinite(s.lastPull)&&s.clock-s.lastPull<.22)return {blocked:true};let quality=clamp(power,.3,1),exhausted=s.energy<.13;let cost=.14+.09*quality;let strength=(.11+quality*.105)*(exhausted?.38:.55+s.energy*.45)*(1+p.upgrades*.07);s.energy=clamp(s.energy-cost,0,1);s.combo=s.clock-s.lastPull<1.5?(s.combo||0)+1:1;s.lastPull=s.clock;if(p.round%6===3&&s.energy<.35)strength*=.78;let bonus=quality>.7&&s.warning>0?1.35:1;let superPull=s.hype>=1;if(superPull){strength*=1.75;s.hype=0}else s.hype=clamp(s.hype+.19,0,1);s.lead=clamp(s.lead-strength*bonus,-1,1);s.impact=1;s.move=1;s.guard=bonus>1?.32:0;let win=s.lead<=-1;if(win)s.outcome='won';return {strength,win,perfect:bonus>1,combo:s.combo,superPull};}
function step(s,p,dt){if(s.outcome!=='playing')return null;dt=clamp(dt,0,.05);s.clock+=dt;s.energy=clamp(s.energy+dt*.12,0,1);s.impact=Math.max(0,s.impact-dt*2.2);s.move=Math.max(0,s.move-dt*2.7);s.opponent=Math.max(0,s.opponent-dt*1.6);s.guard=Math.max(0,s.guard-dt);let rival=RIVALS[p.round%RIVALS.length],cycle=Math.floor(p.round/RIVALS.length);s.nextPull-=dt;s.warning=clamp((rival.charge-s.nextPull)/rival.charge,0,1);if(s.nextPull<=0){s.rivalHits++;let sharkRush=rival.type==='shark'&&s.rivalHits%3===0;let shock=(rival.hp+Math.min(.07,cycle*.01))*(sharkRush?1.55:1)*(rival.type==='wood'&&s.rivalHits%2===0?1.35:1)*(s.followup?.52:1)*(s.guard>0?.55:1);s.lead=clamp(s.lead+shock,-1,1);s.opponent=1;s.impact=.8;if(rival.type==='coffee'&&!s.followup){s.nextPull=.65;s.followup=true}else{s.nextPull=rival.rate;s.followup=false;}if(s.lead>=1){s.outcome='lost';return {type:'lose'}}return {type:'rival'};}return null;}
function finish(p,s){if(s.outcome!=='won')return false;p.wins++;p.coins+=30+Math.min(20,s.combo*3);p.best=Math.max(p.best,p.round+1);p.round++;return true}
function load(value){let p=fresh();try{let o=JSON.parse(value);if(o&&typeof o==='object'){for(let k of ['round','wins','coins','best','upgrades'])if(Number.isFinite(o[k]))p[k]=Math.max(0,Math.min(999999,Math.floor(o[k])));if(typeof o.sound==='boolean')p.sound=o.sound;p.upgrades=Math.min(5,p.upgrades)}}catch(_){}return p}
const api={RIVALS,clamp,fresh,match,pull,step,finish,load};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TugModel=api;
})(typeof window!=='undefined'?window:globalThis);

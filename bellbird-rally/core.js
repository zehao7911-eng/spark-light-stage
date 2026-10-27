(function(root){'use strict';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const COURTS=[
 {name:'Apricot Hour',guest:'Pip',bird:'#edb16a',wing:'#bd6654',sky:'#dca9a4',water:'#89b3a9',leaf:'#718c6b',need:8,speed:2.65,breeze:0},
 {name:'Bluebell Pool',guest:'Luma',bird:'#a8bdde',wing:'#657ba7',sky:'#aaa7d0',water:'#7baebc',leaf:'#65848a',need:10,speed:2.95,breeze:.16},
 {name:'Peach Orchard',guest:'Momo',bird:'#e7a1a4',wing:'#b86f7d',sky:'#e5beb2',water:'#91b5a1',leaf:'#879b70',need:12,speed:3.1,breeze:-.25},
 {name:'Jade Afterglow',guest:'Fig',bird:'#aac7aa',wing:'#668d80',sky:'#97b7b1',water:'#609e9b',leaf:'#577b6d',need:14,speed:3.25,breeze:.32},
 {name:'Plum Moon',guest:'Bramble',bird:'#bda8c8',wing:'#7e668f',sky:'#b39eae',water:'#868da8',leaf:'#6d7c80',need:16,speed:3.45,breeze:-.38},
 {name:'Golden Hush',guest:'Sol',bird:'#efcf7c',wing:'#ca9760',sky:'#d3b0a0',water:'#9ba89b',leaf:'#859078',need:18,speed:3.6,breeze:.44}
];
function rng(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
class Game{
 constructor(index=0){this.index=clamp(index|0,0,5);this.court=COURTS[this.index];this.time=0;this.phase='incoming';this.paddle=0;this.target=0;this.pv=0;this.focus=0;this.x=.55;this.z=-2.8;this.vx=0;this.vz=this.court.speed;this.travel=0;this.arc=1;this.hits=0;this.misses=0;this.combo=0;this.bestCombo=0;this.perfects=0;this.lights=0;this.bell=1.3;this.chorus=0;this.sequence=0;this.wait=0;this.impact=0;this.events=[];this.trail=[];this.mode='playing';this.hitX=.55;this.lastAccuracy=0;}
 move(x){if(this.mode!=='playing'||!Number.isFinite(x))return false;this.target=clamp(x,-2.48,2.48);this.focus=2.5;return true}
 drain(){return this.events.splice(0)}
 serve(){this.phase='incoming';this.sequence++;const r=rng(833+this.index*321+this.sequence*991);this.z=-2.8;this.x=clamp(this.x,-2.3,2.3);this.hitX=this.index===2?(this.sequence%2?-1:1)*(1.3+r()*.8):(r()-.5)*4.2;this.vz=(this.court.speed+Math.min(.8,this.hits*.025))*(this.index===1&&this.sequence%2?.8:this.index===4&&this.sequence%2?1.15:1);this.arc=this.index===1?1.5:this.index===4&&this.sequence%2?.6:1;this.vx=(this.hitX-this.x)/((2.8-this.z)/this.vz);this.travel=0;this.bell=(r()>.5?1:-1)*(1+r()*.85);this.events.push({type:'serve',x:this.x});}
 step(dt){if(this.mode!=='playing'||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(dt,1/30);this.time+=dt;this.focus=Math.max(0,this.focus-dt);this.impact=Math.max(0,this.impact-dt*3);this.chorus=Math.max(0,this.chorus-dt);const old=this.paddle;this.paddle+=(this.target-this.paddle)*(1-Math.exp(-dt*20));this.pv=(this.paddle-old)/dt;
  if(this.phase==='rest'){this.wait-=dt;if(this.wait<=0)this.serve();return}
  const prevZ=this.z;this.z+=this.vz*dt;this.x+=this.vx*dt;this.travel+=Math.abs(this.vz*dt);
  if(this.phase==='incoming'){this.x+=Math.sin(this.travel*1.2)*this.court.breeze*dt;this.hitX=clamp(this.x+this.vx*Math.max(0,(2.8-this.z)/this.vz),-2.55,2.55)}
  if(Math.abs(this.x)>2.72){this.x=clamp(this.x,-2.72,2.72);this.vx*=-1}
  this.trail.push([this.x,this.z]);if(this.trail.length>18)this.trail.shift();
  if(this.phase==='incoming'&&prevZ<2.8&&this.z>=2.8){const offset=this.x-this.paddle,acc=1-Math.abs(offset)/.9;
   if(Math.abs(offset)<=.91&&this.focus>0){this.hits++;this.combo++;this.bestCombo=Math.max(this.bestCombo,this.combo);this.lastAccuracy=acc;const perfect=Math.abs(offset)<.26;if(perfect)this.perfects++;this.lights++;this.impact=1;this.phase='outgoing';this.z=2.8;this.vz=-(this.court.speed+1);this.vx=clamp(offset*3+this.pv*.035,-2.6,2.6);this.travel=0;this.events.push({type:'hit',x:this.x,z:this.z,perfect,combo:this.combo});if(this.combo%4===0){this.chorus=2;this.lights+=2;this.events.push({type:'chorus',x:this.x,z:this.z})}this.lights=Math.min(this.court.need,this.lights);
   }else{this.misses++;this.combo=0;this.phase='rest';this.wait=1.05;this.events.push({type:'miss',x:this.x,z:3.3});}
  }
  if(this.phase==='outgoing'&&this.z<=-2.8){this.z=-2.8;if(Math.abs(this.x-this.bell)<.65){this.lights=Math.min(this.court.need,this.lights+1);this.events.push({type:'bell',x:this.bell,z:-2.8})}if(this.lights>=this.court.need){this.mode='won';this.phase='rest';this.events.push({type:'won',x:0,z:0})}else{this.phase='rest';this.wait=.47;this.events.push({type:'return',x:this.x,z:this.z})}}
 }
 snapshot(){const s={};for(const k of Object.keys(this))if(!['court','events','trail'].includes(k))s[k]=this[k];return s}
 static restore(s){if(!s||!Number.isInteger(s.index)||s.index<0||s.index>5)throw Error('Invalid court');const g=new Game(s.index);for(const k of Object.keys(g.snapshot())){if(typeof s[k]!==typeof g[k])throw Error('Invalid '+k);if(typeof s[k]==='number'&&!Number.isFinite(s[k]))throw Error('Invalid '+k);g[k]=s[k]}
  if(!['playing','won'].includes(g.mode)||!['incoming','outgoing','rest'].includes(g.phase)||Math.abs(g.paddle)>2.5||Math.abs(g.target)>2.5||Math.abs(g.x)>2.8||Math.abs(g.z)>3.5||Math.abs(g.vx)>8||Math.abs(g.vz)>8||g.lights<0||g.lights>g.court.need||g.hits<0||g.misses<0||g.time<0||g.combo<0||g.combo>g.hits||g.bestCombo<g.combo||g.perfects>g.hits||g.sequence<0||g.wait< -1||g.wait>2||g.mode==='won'&&g.lights!==g.court.need)throw Error('Invalid state');return g}
}
const api={Game,COURTS,clamp,rng};if(typeof module!=='undefined')module.exports=api;else root.RallyCore=api;
})(typeof window!=='undefined'?window:globalThis);

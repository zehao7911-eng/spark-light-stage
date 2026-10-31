export class Sound{
 constructor(){this.on=true;this.ctx=null;this.active=false;this.timer=null;this.step=0}
 async start(){if(!this.on)return;try{if(!this.ctx){let C=window.AudioContext||window.webkitAudioContext;if(!C)return;this.ctx=new C();this.master=this.ctx.createGain();this.master.gain.value=.13;this.master.connect(this.ctx.destination)}await this.ctx.resume();this.active=true;if(!this.timer)this.timer=setInterval(()=>{if(!this.active)return;let notes=[262,0,330,392,330,0,294,0,220,0,294,349,294,0,262,0],f=notes[this.step++%notes.length];if(f)this.note(f,.12,'triangle',.09);if(this.step%4===1)this.note(this.step%8===1?131:110,.25,'sine',.08)},230)}catch{}}
 stop(){clearInterval(this.timer);this.timer=null;this.active=false;this.ctx?.suspend().catch(()=>{})}
 note(f,d=.1,type='sine',v=.2,delay=0,end=f){if(!this.active||!this.on||!this.ctx)return;let t=this.ctx.currentTime+delay,o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,end),t+d);g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g).connect(this.master);o.start(t);o.stop(t+d+.03)}
 pop(n,large){this.note(400+n*30,.14,'triangle',.4,0,150);for(let i=0;i<(large?4:2);i++)this.note(600+i*120,.11,'sine',.16,.06+i*.035);if(large)this.note(95,.25,'triangle',.45,.05,40)}
 win(){[392,523,659,784].forEach((f,i)=>this.note(f,.25,'triangle',.25,i*.1))}
}

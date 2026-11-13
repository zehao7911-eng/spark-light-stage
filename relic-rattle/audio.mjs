export class Audio{
 constructor(){this.ctx=null;this.on=true;this.voices=new Set();this.timer=null;this.n=0}
 async wake(){if(!this.on)return;try{this.ctx??=new(window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')await this.ctx.resume()}catch{}}
 note(f,d=.15,v=.035,type='sine',delay=0){if(!this.on||!this.ctx||this.ctx.state!=='running'||this.voices.size>18)return;let a=this.ctx.createOscillator(),g=this.ctx.createGain(),t=this.ctx.currentTime+delay;a.type=type;a.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+d);a.connect(g);g.connect(this.ctx.destination);a.start(t);a.stop(t+d+.01);this.voices.add(a);a.onended=()=>{this.voices.delete(a);a.disconnect();g.disconnect()}}
 fx(e){if(e.type==='hit'){this.note(120+Math.random()*50,.09,.065,'triangle');this.note(560,.055,.023)}else if(e.type==='break'){this.note(260+(e.combo%6)*70,.19,.05,'triangle');this.note(1300+Math.random()*300,.045,.02)}else if(e.type==='blast'){this.note(60,.35,.12,'triangle');this.note(380,.16,.035)}else if(e.type==='hurt')this.note(75,.25,.08,'sawtooth');else if(e.type==='win')[262,330,392,523].forEach((f,i)=>this.note(f,.4,.04,'triangle',i*.1));else if(e.type==='heal')this.note(660,.4,.035);else if(e.type==='deflect')this.note(900,.15,.025)}
 music(){if(this.timer||!this.on)return;let seq=[147,0,220,0,196,0,262,220,147,0,175,0,196,0,294,220];this.timer=setInterval(()=>{let f=seq[this.n++%seq.length];if(f)this.note(f,.35,.011,'triangle')},380)}
 pause(){clearInterval(this.timer);this.timer=null;this.ctx?.suspend().catch(()=>{})}
 resume(){this.wake().then(()=>this.music())}
}

export class Sound{
 constructor(){this.ctx=null;this.on=true;this.timer=null;this.tick=0;this.nodes=new Set()}
 async wake(){if(!this.on)return;try{this.ctx??=new (window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')await this.ctx.resume()}catch{}}
 note(f,d=.16,v=.06,type='sine',delay=0){if(!this.on||!this.ctx||this.ctx.state!=='running'||this.nodes.size>16)return;let a=this.ctx.createOscillator(),g=this.ctx.createGain(),t=this.ctx.currentTime+delay;a.type=type;a.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);a.connect(g);g.connect(this.ctx.destination);a.start(t);a.stop(t+d+.02);this.nodes.add(a);a.onended=()=>{this.nodes.delete(a);a.disconnect();g.disconnect()}}
 fx(type){if(type==='launch'||type==='perfectLaunch'){this.note(105,.25,.12,'triangle');this.note(680,.12,.04,'sine',.03)}else if(type==='perfect'){[392,587,784].forEach((n,i)=>this.note(n,.3,.065,'triangle',i*.055))}else if(type==='boost'){this.note(370,.1,.06,'triangle');this.note(510,.16,.04,'sine',.05)}else if(type==='ring'){this.note(1047,.16,.04);this.note(1568,.23,.025,'sine',.06)}else if(type==='land')this.note(95,.13,.09,'triangle');else if(type==='finish'){[262,330,392,523].forEach((n,i)=>this.note(n,.32,.055,'triangle',i*.09))}else this.note(480,.09,.045)}
 music(){if(this.timer||!this.on)return;let notes=[262,330,392,330,294,349,440,349,247,294,392,294,262,330,523,392];this.timer=setInterval(()=>{this.note(notes[this.tick++%notes.length],.32,.012,'triangle')},420)}
 pause(){clearInterval(this.timer);this.timer=null;this.ctx?.suspend().catch(()=>{})}
 async resume(){await this.wake();this.music()}
}

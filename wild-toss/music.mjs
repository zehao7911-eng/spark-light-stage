// Original synthesized score: "Little Wild Adventure", 112 BPM, 32 bars.
// No sampled recordings or external music assets.
export async function composeBGM(){
 const rate=22050,beat=60/112,bars=32,duration=bars*4*beat,length=Math.round(duration*rate),tail=rate*2;
 const Offline=window.OfflineAudioContext||window.webkitOfflineAudioContext;
 const ctx=new Offline(2,length+tail,rate),bus=ctx.createGain();bus.gain.value=.7;bus.connect(ctx.destination);
 let seed=17831;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 const noise=ctx.createBuffer(1,rate,rate);const data=noise.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=random()*2-1;
 const freq=m=>440*Math.pow(2,(m-69)/12);
 function tone(m,start,dur,volume,type='sine',pan=0,attack=.007){const o=ctx.createOscillator(),g=ctx.createGain(),p=ctx.createStereoPanner();o.type=type;o.frequency.value=freq(m);p.pan.value=pan;g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(volume,start+attack);g.gain.exponentialRampToValueAtTime(.0001,start+dur);o.connect(g).connect(p).connect(bus);o.start(start);o.stop(start+dur+.01)}
 function pluck(m,t,v,pan){tone(m,t,.62,v,'sine',pan);tone(m+12,t,.18,v*.28,'sine',pan);tone(m+19,t,.11,v*.075,'sine',pan);tone(m,t+beat*.75,.42,v*.13,'sine',-pan)}
 function hiss(t,dur,vol,cut){const n=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain();n.buffer=noise;f.type='highpass';f.frequency.value=cut;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);n.connect(f).connect(g).connect(bus);n.start(t);n.stop(t+dur)}
 function kick(t,v){const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.setValueAtTime(135,t);o.frequency.exponentialRampToValueAtTime(46,t+.14);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.28);o.connect(g).connect(bus);o.start(t);o.stop(t+.3)}
 const chords=[[48,52,55,59],[45,48,52,55],[41,45,48,52],[43,47,50,55]];
 const melodies=[
 [76,-1,79,81,79,-1,76,74],[72,-1,76,79,76,74,72,-1],[69,72,-1,76,74,-1,72,69],[71,-1,74,79,77,74,71,-1],
 [79,76,-1,72,74,76,79,-1],[81,-1,79,76,72,-1,76,79],[77,76,74,-1,72,69,72,-1],[74,-1,71,67,71,74,76,74]
 ];
 for(let bar=0;bar<bars;bar++){const t=bar*4*beat,chord=chords[bar%4],section=Math.floor(bar/8),melody=melodies[bar%8];
  for(let j=0;j<chord.length;j++){tone(chord[j],t,4*beat+.4,.025,'sine',(j-1.5)*.28,.18);for(const offset of [0,1.5,3])pluck(chord[j]+12,t+offset*beat+j*.014,.027,(j-1.5)*.2)}
  for(const k of [0,1.5,2,3.5]){tone(chord[0]-12+(k===3.5?7:0),t+k*beat,.34,.14,'sine',0);tone(chord[0],t+k*beat,.14,.016,'triangle',0)}
  if(section!==2||bar%8>=4){kick(t,.24);kick(t+beat*2,.19);if(bar%4===3)kick(t+beat*2.75,.11);for(const k of [1,3]){hiss(t+k*beat,.12,.075,1600);tone(50,t+k*beat,.07,.028,'triangle')}for(let k=0;k<8;k++)hiss(t+k*beat/2,.035,k%2?.024:.016,6500)}
  if(section!==2||bar%2===0)for(let k=0;k<8;k++)if(melody[k]>=0){const note=melody[k]+(section===3&&bar%4===2?12:0);pluck(note,t+(k/2+.04*(k%2))*beat,.115,k%2?.22:-.22)}
  if(section===1||section===3)for(let k=0;k<4;k++)pluck(chord[k]+24,t+(k+.75)*beat,.035,-.35);
 }
 const rendered=await ctx.startRendering(),channels=[];let peak=0;
 for(let c=0;c<2;c++){const raw=rendered.getChannelData(c),out=new Float32Array(length);out.set(raw.subarray(0,length));for(let i=0;i<tail;i++)out[i]+=raw[length+i];for(let i=0;i<length;i++)peak=Math.max(peak,Math.abs(out[i]));channels.push(out)}
 const scale=.8/Math.max(.8,peak);for(const out of channels)for(let i=0;i<length;i++)out[i]*=scale;
 return{channels,sampleRate:rate,duration:length/rate,title:'Little Wild Adventure',bpm:112};
}

export function createMusic({context,enabled,phase}){
 let unlocked=false,pending=null,source=null,gain=null,ac=null,target=-1,destroyed=false,duration=0,error=null;
 async function ensure(){if(destroyed||error||!unlocked||!enabled()||document.hidden)return;ac=context();ac.resume().catch(()=>{});if(source||pending)return;
  pending=fetch('assets/Little-Wild-Adventure.mp3').then(r=>{if(!r.ok)throw Error('Music unavailable');return r.arrayBuffer()}).then(b=>ac.decodeAudioData(b)).then(buffer=>{if(destroyed)return;source=ac.createBufferSource();source.buffer=buffer;source.loop=true;source.loopEnd=Math.min(buffer.duration,68.5714285714);gain=ac.createGain();gain.gain.value=0;source.connect(gain).connect(ac.destination);duration=source.loopEnd;source.start();sync()}).catch(e=>{error=String(e);}).finally(()=>{pending=null});
 }
 function sync(){if(destroyed)return;if(!source){ensure();return}const next=!enabled()||document.hidden?0:phase()==='reveal'?.08:phase()==='train'?.18:phase()==='flight'?.3:.25;if(next!==target){target=next;gain.gain.cancelScheduledValues(ac.currentTime);gain.gain.setTargetAtTime(next,ac.currentTime,next===0?.025:.2)}if(next>0&&ac.state==='suspended')ac.resume().catch(()=>{})}
 function unlock(){unlocked=true;ensure();sync()}
 function visibility(){sync();if(document.hidden)ac?.suspend().catch(()=>{});else if(unlocked&&enabled())ensure()}
 function stop(){destroyed=true;try{source?.stop()}catch{}source?.disconnect();gain?.disconnect();source=null;target=0;removeEventListener('pointerdown',unlock,true);removeEventListener('keydown',unlock,true);document.removeEventListener('visibilitychange',visibility)}
 addEventListener('pointerdown',unlock,true);addEventListener('keydown',unlock,true);document.addEventListener('visibilitychange',visibility);
 return{sync,stop,get state(){return{unlocked,ready:!!source,duration,volume:target,context:ac?.state||'none',error}}};
}


/* Original synthesis for Tiny Tape Club. No samples or external music. */
(()=>{
let ctx,master,compressor,clock,nextTime=0,nextStep=0,token=0,started=false,latest=null,timers=new Set(),voices=new Set();
const frequencies=[[70,150,5000],[523.251,659.255,783.991],[65.406,82.407,97.999],[261.626,329.628,391.995]];
function patch(ac,dest,track,note,when,volume=.8,registry=null){
 if(!note)return;const f=frequencies[track][note-1], nodes=[];
 const amp=ac.createGain();amp.connect(dest);nodes.push(amp);
 const duration=track===0?(note===1?.32:.16):(track===1?1.1:track===2?.38:1.45);
 amp.gain.setValueAtTime(.0001,when);amp.gain.exponentialRampToValueAtTime(Math.max(.001,volume*(track===0?.22:track===1?.12:track===2?.2:.075)),when+.008);amp.gain.exponentialRampToValueAtTime(.0001,when+duration);
 function osc(type,hz,mult=1){const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(hz,when);g.gain.value=mult;o.connect(g);g.connect(amp);o.start(when);o.stop(when+duration+.03);nodes.push(o,g);return o}
 if(track===0){
  if(note===1){let o=osc('sine',150);o.frequency.exponentialRampToValueAtTime(46,when+.22)}
  else {const len=Math.ceil(ac.sampleRate*duration),b=ac.createBuffer(1,len,ac.sampleRate),data=b.getChannelData(0);let seed=90210+note;for(let i=0;i<len;i++){seed=(seed*1664525+1013904223)>>>0;data[i]=(seed/2147483648-1)}const n=ac.createBufferSource(),filter=ac.createBiquadFilter();n.buffer=b;filter.type=note===3?'highpass':'bandpass';filter.frequency.value=note===3?6500:1600;filter.Q.value=.8;n.connect(filter);filter.connect(amp);n.start(when);n.stop(when+duration);nodes.push(n,filter);if(note===2)osc('triangle',180,.35)}
 }else if(track===1){osc('sine',f,1);osc('sine',f*2.008,.3);osc('sine',f*3.98,.08)}
 else if(track===2){const o=osc('triangle',f,.8);o.frequency.exponentialRampToValueAtTime(f*.997,when+.3);osc('sine',f,.8)}
 else {osc('sine',f,.8);osc('sine',f*1.5,.3);osc('sine',f*2,.25)}
 const entry={nodes,stop(){for(const n of nodes){try{if(n.stop)n.stop();n.disconnect()}catch{}}}};
 if(registry){registry.add(entry);setTimeout(()=>{entry.stop();registry.delete(entry)},Math.max(50,(when-ac.currentTime+duration+.12)*1000))}
 return entry;
}
function ensure(){if(!ctx){ctx=new(window.AudioContext||window.webkitAudioContext)();master=ctx.createGain();master.gain.value=.65;compressor=ctx.createDynamicsCompressor();compressor.threshold.value=-13;compressor.ratio.value=5;compressor.connect(master);master.connect(ctx.destination)}if(ctx.state==='suspended')ctx.resume().catch(()=>{});return ctx}
function halt(){started=false;token++;clearInterval(clock);for(const t of timers)clearTimeout(t);timers.clear();for(const v of voices)v.stop();voices.clear();if(ctx)ctx.suspend().catch(()=>{})}
function scheduler(){if(!latest||!started||!ctx||ctx.state!=='running')return;let rounds=0;while(nextTime<ctx.currentTime+.10&&rounds++<4){const step=nextStep,at=nextTime,revision=token;const s=latest;if(s.sound)for(let t=0;t<s.unlocked;t++){if(!s.tracks[t])patch(ctx,compressor,t,Number(s.patterns[t][step]),at,Number(s.gains[t]),voices)}if(s.finale&&s.sound&&step%2===1)patch(ctx,compressor,0,3,at,.25,voices);const timer=setTimeout(()=>{timers.delete(timer);if(revision===token&&started&&window.tAction)window.tAction('pulse:'+step)},Math.max(0,(at-ctx.currentTime)*1000));timers.add(timer);nextStep=(nextStep+1)%8;nextTime+=30/s.bpm}if(nextTime<ctx.currentTime-.3)nextTime=ctx.currentTime+.04}
window.TapeAudio={
 ensure,
 update(s){latest=s;if(ctx)master.gain.setTargetAtTime(s.sound?.65:0,ctx.currentTime,.025);const run=s.playing&&!s.paused&&!document.hidden;if(run&&!started&&ctx){ensure();started=true;token++;nextStep=(s.beat+1)%8;nextTime=ctx.currentTime+.06;clock=setInterval(scheduler,25);scheduler()}else if(!run&&started)halt()},
 preview(t,n){if(!latest?.sound||latest?.paused)return;ensure();if(voices.size<96)patch(ctx,compressor,t,n,ctx.currentTime+.005,.75,voices)},
 halt,
 async wav(s){
  const loop=8*30/s.bpm,seconds=loop*4+1.7,sr=44100,offline=new OfflineAudioContext(2,Math.ceil(seconds*sr),sr),mix=offline.createDynamicsCompressor();mix.threshold.value=-13;mix.ratio.value=5;const volume=offline.createGain();volume.gain.value=.65;mix.connect(volume);volume.connect(offline.destination);
  let count=0;for(let repeat=0;repeat<4;repeat++)for(let b=0;b<8;b++)for(let t=0;t<s.unlocked;t++)if(!s.tracks[t]&&Number(s.patterns[t][b])){patch(offline,mix,t,Number(s.patterns[t][b]),repeat*loop+b*30/s.bpm,Number(s.gains[t]));count++}if(!count)throw Error('Add a few notes first.');
  if(s.finale)for(let repeat=0;repeat<4;repeat++)for(let b=1;b<8;b+=2)patch(offline,mix,0,3,repeat*loop+b*30/s.bpm,.25);
  const buffer=await offline.startRendering(),length=buffer.length,bytes=new ArrayBuffer(44+length*4),v=new DataView(bytes);const text=(o,t)=>{for(let i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i))};text(0,'RIFF');v.setUint32(4,bytes.byteLength-8,true);text(8,'WAVE');text(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,2,true);v.setUint32(24,sr,true);v.setUint32(28,sr*4,true);v.setUint16(32,4,true);v.setUint16(34,16,true);text(36,'data');v.setUint32(40,length*4,true);for(let i=0;i<length;i++)for(let c=0;c<2;c++){const n=Math.max(-1,Math.min(1,buffer.getChannelData(c)[i]));v.setInt16(44+(i*2+c)*2,n<0?n*32768:n*32767,true)}return new Blob([bytes],{type:'audio/wav'});
 },stats(){return{voices:voices.size,pending:timers.size,started,context:ctx?.state||'none'}}
};window.tPreview=(t,n)=>window.TapeAudio.preview(t,n);
})();

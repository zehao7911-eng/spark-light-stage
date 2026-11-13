// Optional host adapter. Core boot never awaits this object.
export class HostBridge{
 constructor(env,callbacks={}){this.env=env;this.cb=callbacks;this.sdk=null;this.dead=false;this.started=false;this.stops=[];this.pending=new Set();this.done=new Set();this.tries={};this.available={};this.timer=null;this.saveBusy=false;this.saveQueued=null;this.loaded=new WeakSet();}
 safe(name,...args){try{const f=this.sdk?.[name];if(typeof f==='function')Promise.resolve(f.apply(this.sdk,args)).catch(()=>{});}catch{}}
 startRun(){this.started=true;this.safe('gameStart');}
 endRun(){if(!this.started)return;this.started=false;this.safe('gameOver');}
 async discover(){if(this.dead)return;const sdk=this.env.neonlib;if(!sdk||typeof sdk!=='object')return;if(sdk!==this.sdk){for(const f of this.stops.splice(0))try{f();}catch{}this.sdk=sdk;this.done.clear();this.tries={};this.available={};this.cb.status?.(this.available);}
 if(!this.loaded.has(sdk)){this.loaded.add(sdk);if(typeof sdk.loadUserGameState==='function')Promise.resolve().then(()=>sdk.loadUserGameState()).then(v=>{if(!this.dead&&sdk===this.sdk&&v&&v.game==='counter-club'&&v.version===1)this.cb.load?.(v);}).catch(()=>{});if(typeof sdk.getGameViewport==='function')Promise.resolve().then(()=>sdk.getGameViewport()).then(v=>{if(!this.dead&&sdk===this.sdk&&Number.isFinite(v?.width)&&Number.isFinite(v?.height))this.cb.viewport?.(v);}).catch(()=>{});}
 for(const [method,reward]of [['onLike','gold'],['onComment','confetti']]){if(typeof sdk[method]!=='function'||this.done.has(method)||this.pending.has(method)||(this.tries[method]||0)>=2)continue;this.pending.add(method);this.tries[method]=(this.tries[method]||0)+1;const token=sdk;
 const callback=event=>{if(this.dead||this.sdk!==token)return;if(method==='onLike'&&event?.status!==true)return;if(!event||typeof event.project_id!=='string')return;this.cb.reward?.(reward,event.project_id);};
 Promise.resolve().then(()=>sdk[method](callback)).then(r=>{const stop=r?.data?.unsubscribe;if(this.dead||this.sdk!==token){if(r?.code===0&&typeof stop==='function')stop();return;}if(r?.code===0){this.done.add(method);this.available[reward]=true;if(typeof stop==='function')this.stops.push(stop);}else if(r?.code!==-2)this.tries[method]=2;this.cb.status?.({...this.available});}).catch(()=>{}).finally(()=>this.pending.delete(method));}
 }
 poll(){if(this.dead)return;this.discover();this.timer=this.env.setTimeout(()=>this.poll(),2000);}
 save(state){this.saveQueued=state;this.flush();}
 async flush(){if(this.dead||this.saveBusy||!this.saveQueued||typeof this.sdk?.saveUserGameState!=='function')return;this.saveBusy=true;const v=this.saveQueued;this.saveQueued=null;try{const r=await this.sdk.saveUserGameState(v);this.cb.saved?.(r?.code===0);}catch{}finally{this.saveBusy=false;if(this.saveQueued)this.flush();}}
 stop(){this.dead=true;this.env.clearTimeout?.(this.timer);for(const f of this.stops.splice(0))try{f();}catch{}}
}


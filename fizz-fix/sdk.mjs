// Optional platform bridge. Core boot, rendering and input never await this module.
export function bridge({host=()=>globalThis.neonlib,read,write,changed=()=>{},schedule=setTimeout,cancel=clearTimeout,timeout=5000}){
 let alive=true,epoch=0,timers=new Set(),entries=new Map(),sdk=null,started=false,ended=false;
 let support={like:false,comment:false},cloudBase={},cloudReady=false,dirty=false,queue=Promise.resolve();
 const later=(fn,ms)=>{let t=schedule(()=>{timers.delete(t);fn();},ms);timers.add(t);return t;};
 const safeStop=fn=>{try{fn?.();}catch{}};
 function call(name){try{const o=host();if(typeof o?.[name]==='function')Promise.resolve(o[name]()).catch(()=>{});}catch{}}
 function save(){dirty=true;if(!alive||!cloudReady||typeof sdk?.saveUserGameState!=='function')return;dirty=false;
  const snapshot={...cloudBase,game:'fizz-fix',v:1,profile:JSON.parse(JSON.stringify(read()))};
  const destination=sdk;
  queue=queue.then(()=>alive&&sdk===destination?Promise.resolve(destination.saveUserGameState(snapshot)):null).catch(()=>{});
 }
 function reward(kind,event){if(!alive||!event||typeof event!=='object'||typeof event.project_id!=='string'||(kind==='like'&&event.status!==true))return;
  let p=read();if(p.rewards[kind])return;p.rewards[kind]=true;write(p);changed({type:'reward',kind});save();
 }
 function reg(kind,name,attempt=0){if(!alive||entries.has(kind)||typeof sdk?.[name]!=='function')return;
  const gen=epoch;let entry={live:false,expired:false,stop:null};entries.set(kind,entry);
  let timer=later(()=>{if(!alive||gen!==epoch)return;entry.expired=true;if(entries.get(kind)===entry)entries.delete(kind);support[kind]=false;changed({type:'support',...support});if(attempt<1)later(()=>reg(kind,name,attempt+1),1000);},timeout);
  const callback=e=>{if(alive&&gen===epoch&&entry.live&&!entry.expired)reward(kind,e);};
  const done=r=>{cancel(timer);timers.delete(timer);let stop=r?.code===0&&typeof r?.data?.unsubscribe==='function'?r.data.unsubscribe:null;
   if(!alive||gen!==epoch||entry.expired){safeStop(stop);return;}
   if(r?.code!==0){entries.delete(kind);if(r?.code===-2&&attempt<1)later(()=>reg(kind,name,attempt+1),1000);return;}
   entry.live=true;entry.stop=stop;support[kind]=true;changed({type:'support',...support});
  };
  try{Promise.resolve(sdk[name](callback)).then(done,()=>done(null));}catch{done(null);}
 }
 function connect(){if(!alive)return;const h=host();if(!h||typeof h!=='object')return;
  if(sdk&&sdk!==h){epoch++;for(const e of entries.values()){e.expired=true;safeStop(e.stop);}entries.clear();support={like:false,comment:false};cloudReady=false;}
  if(sdk!==h){sdk=h;
   if(typeof sdk.loadUserGameState==='function'){
    let resolved=false;const gen=epoch;
    later(()=>{if(alive&&gen===epoch&&!resolved){resolved=true;cloudReady=false;}},timeout);
    try{Promise.resolve(sdk.loadUserGameState()).then(raw=>{if(resolved||!alive||gen!==epoch)return;resolved=true;
     if(raw&&typeof raw==='object'&&raw.game==='fizz-fix'&&raw.v===1&&raw.profile){cloudBase=raw;write(raw.profile,true);changed({type:'cloud'});}
     cloudReady=!!(raw&&typeof raw==='object'&&((raw.game==='fizz-fix'&&raw.v===1&&raw.profile)||Object.keys(raw).length===0));if(dirty&&cloudReady)save();
    },()=>{if(gen===epoch){resolved=true;cloudReady=false;}});}catch{resolved=true;cloudReady=false;}
   }else cloudReady=false;
  }
  reg('like','onLike');reg('comment','onComment');
 }
 function probe(n=0){connect();if(alive&&n<8)later(()=>probe(n+1),1500);}
 probe();
 return {save,connect,support:()=>({...support}),prepare(){started=false;ended=false;},start(){if(started&&!ended)return;started=true;ended=false;call('gameStart');},end(){if(!started||ended)return;ended=true;call('gameOver');},
  stop(){if(!alive)return;alive=false;epoch++;for(let t of timers)cancel(t);timers.clear();for(let e of entries.values()){e.expired=true;safeStop(e.stop);}entries.clear();support={like:false,comment:false};},
  viewport(){try{let v=host()?.getGameViewport?.();if(v&&Number.isFinite(v.width)&&Number.isFinite(v.height)&&v.width>0&&v.height>0)return {width:v.width,height:v.height,density:Number.isFinite(v.density)?v.density:1};}catch{}return null;}
 };
}

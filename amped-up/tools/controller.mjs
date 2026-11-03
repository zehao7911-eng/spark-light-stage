import * as C from '../core.mjs';
// Uses only the public shield action and observed state; waits through real cooldown.
export function play(act,kit=0,lap=0){let s=C.create(act,kit,lap),events=[];for(let i=0;i<20000&&!['win','lose'].includes(s.phase);i++){
 if(!s.holding&&s.lock<=0)events.push(...C.shield(s,true));
 if(s.holding&&((C.safeWindow(s)&&s.energy>=1.8)||s.heat>.77))events.push(...C.shield(s,false));
 events.push(...C.advance(s,1/60));
 }return {s,events};}

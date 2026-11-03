import * as C from '../core.mjs';
export function play(room,kit=0,lap=0,easy=true){let s=C.create(room,kit,lap,easy),events=[];C.look(s,C.ROOMS[room].order[0]);for(let n=0;n<12000&&!['win','lose'].includes(s.phase);n++){
 let active=s.actors.filter(e=>e.mode==='active').sort((a,b)=>a.d-b.d),current=active.find(e=>C.watched(s,e)&&e.focus>.03);
 if(s.strain>.63&&!current)C.blink(s);
 let target=current||active[0];if(target)C.look(s,target.lane);
 events.push(...C.advance(s,1/60));
 }return {s,events};}

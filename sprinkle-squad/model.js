(function(g){'use strict';const levels=[
{name:'Bakery Lane',time:65,theme:0,fires:[[-2.5,-2.8],[0,-2.8]]},
{name:'Market Morning',time:65,theme:0,fires:[[-2.5,-2.8],[0,-2.8],[2.5,-2.8]]},
{name:'The Workshop',time:70,theme:1,fires:[[-2.5,-2.8],[0,-2.8],[2.5,-2.8],[-1.25,-5.4]]},
{name:'Lantern Square',time:75,theme:1,fires:[[-2.5,-2.8],[0,-2.8],[2.5,-2.8],[-1.25,-5.4],[1.25,-5.4]]},
{name:'Harbor Sunset',time:75,theme:2,fires:[[-2.5,-2.8],[0,-2.8],[2.5,-2.8],[-1.25,-5.4],[1.25,-5.4]]},
{name:'Festival Finale',time:80,theme:2,fires:[[-2.5,-2.8],[0,-2.8],[2.5,-2.8],[-1.25,-5.4],[1.25,-5.4],[0,.1]]}];
function create(l){if(!levels[l])throw Error('Bad level');return {level:l,fire:levels[l].fires.map(([x,z],id)=>({id,x,z,heat:100,done:false})),water:100,seconds:levels[l].time,aim:null,spraying:false,score:0,dry:0,ended:false,won:false,events:[]};}
function aim(s,id,on){if(s.ended)return;s.spraying=!!on;s.aim=Number.isInteger(id)?id:null;}
function tick(s,dt){if(s.ended)return;dt=Math.min(.05,Math.max(0,dt));s.seconds=Math.max(0,s.seconds-dt);let target=s.fire.find(f=>f.id===s.aim&&!f.done);if(s.spraying&&target&&s.water>0){let used=Math.min(s.water,22*dt);s.water-=used;target.heat=Math.max(0,target.heat-used*2.5);if(s.water<=0){s.dry++;s.spraying=false;s.events.push({type:'dry'});}if(target.heat<=0){target.done=true;s.score+=200;s.events.push({type:'out',id:target.id});}}else if(!s.spraying){s.water=Math.min(100,s.water+24*dt)}if(s.fire.every(f=>f.done)){s.ended=true;s.won=true;s.spraying=false;s.events.push({type:'win'})}else if(s.seconds<=0){s.ended=true;s.spraying=false;s.events.push({type:'lose'})}}
g.SprinkleModel={levels,create,aim,tick};})(typeof window==='undefined'?globalThis:window);

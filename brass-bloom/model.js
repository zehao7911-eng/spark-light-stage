(function(g){'use strict';const count=l=>Math.min(4,2+Math.floor(l/3)),wrap=a=>((a+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;
function create(level){return{level,angles:Array.from({length:count(level)},(_,i)=>(i%2?-1:1)*(.8+((level*17+i*11)%19)/10)),locked:0,moves:0,won:false};}
function turn(s,delta){if(!s.won&&Number.isFinite(delta)){s.angles[s.locked]=wrap(s.angles[s.locked]+delta);}}
function release(s){if(s.won)return false;s.moves++;if(Math.abs(s.angles[s.locked])>.16)return false;s.angles[s.locked]=0;s.locked++;s.won=s.locked===s.angles.length;return true;}
g.BloomModel={create,turn,release,wrap};})(typeof window==='undefined'?globalThis:window);

'use strict';
const LanternPuzzle=(()=>{
 function make(level,bank){const intro=38,count=bank.length-intro,index=level<=bank.length?level-1:intro+(level-bank.length-1)%count,src=bank[index],cycle=level<=bank.length?0:1+Math.floor((level-bank.length-1)/count),mirror=cycle%2;
  const transform=i=>mirror?Math.floor(i/src.n)*src.n+(src.n-1-i%src.n):i;return{n:src.n,start:transform(src.start),end:transform(src.end),edges:src.edges.map(e=>e.map(transform)),lights:src.lights.map(transform),stars:src.stars.map(transform),route:src.route.map(transform),level};
 }
 function adjacent(b,a,z){return b.edges.some(e=>e[0]===a&&e[1]===z||e[1]===a&&e[0]===z)}
 function extend(b,path,i){if(i===path.at(-1))return{path,changed:false};if(path.length>1&&i===path.at(-2))return{path:path.slice(0,-1),changed:true,undo:true};if(path.includes(i)||!adjacent(b,path.at(-1),i))return{path,changed:false};return{path:path.concat(i),changed:true,undo:false}}
 function stats(b,path){return{lights:b.lights.filter(i=>path.includes(i)).length,stars:b.stars.filter(i=>path.includes(i)).length,home:path.at(-1)===b.end&&b.lights.every(i=>path.includes(i))}}
 function solve(b,prefix=[b.start],allStars=true){if(!prefix.length||prefix[0]!==b.start||new Set(prefix).size!==prefix.length||prefix.some((v,k)=>k&&!adjacent(b,prefix[k-1],v)))return null;const graph=Array.from({length:b.n*b.n},()=>[]);b.edges.forEach(([a,z])=>{graph[a].push(z);graph[z].push(a)});const targets=b.lights.concat(allStars?b.stars:[]),visited=new Set(prefix),path=prefix.slice(),failed=new Set();let budget=65000;
  function search(i,mask){if(--budget<0)return null;const missing=targets.filter(v=>!visited.has(v));if(i===b.end&&!missing.length)return path.slice();if(i===b.end)return null;const key=i+':'+mask;if(failed.has(key))return null;
   // Prune routes that have already cut off a required lantern or the house.
   const reachable=new Set([i]),queue=[i];while(queue.length){for(const z of graph[queue.pop()])if(!reachable.has(z)&&!visited.has(z)){reachable.add(z);queue.push(z)}}if([b.end,...missing].some(z=>!reachable.has(z)))return null;
   const next=graph[i].filter(z=>!visited.has(z)).sort((a,z)=>Number(missing.includes(z))-Number(missing.includes(a))||graph[a].length-graph[z].length);for(const z of next){visited.add(z);path.push(z);const answer=search(z,mask|(1n<<BigInt(z)));if(answer)return answer;path.pop();visited.delete(z)}failed.add(key);return null;
  }const answer=search(prefix.at(-1),prefix.reduce((m,v)=>m|(1n<<BigInt(v)),0n));if(answer)return answer;if(prefix.every((v,k)=>b.route[k]===v))return b.route.slice();return null;
 }return{make,adjacent,extend,stats,solve};
})();

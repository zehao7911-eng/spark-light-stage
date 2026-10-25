export const districts=['Copper Court','Mothlight Canal','Violet Rooftops','The Glass Arcade','Moonbell Square','Aurora Terrace'];
export const gifts=['Copper Weathercock','Paper Kites','Moonflower Boxes','Clockwork Moths','Bell Tower','Aurora Lantern'];
function make(index){let seed=(index+1)*61357;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};let n=index<1?2:index<12?3:4,tiles=Array.from({length:n},()=>Array(n).fill('_'));let start={row:0,column:0},pos={...start},path=[],len=Math.min(18,3+Math.floor(index*.55));if(index>=6){tiles[n-1][0]='x';if(n===4&&index>=18)tiles[1][2]='x';}
 let previous=-1;for(let i=0;i<len;i++){let options=[[1,0],[0,1],[-1,0],[0,-1]].map(([r,c])=>({row:pos.row+r,column:pos.column+c})).filter(p=>tiles[p.row]?.[p.column]&&tiles[p.row][p.column]!=='x');let fresh=options.filter(p=>p.row*n+p.column!==previous);if(fresh.length)options=fresh;let next=options[Math.floor(rnd()*options.length)];previous=pos.row*n+pos.column;pos=next;path.push({...pos});}
 for(let p of path)tiles[p.row][p.column]=tiles[p.row][p.column]==='_'?'0':'_';
 // Derive the first solution prefix, avoiding already-solved starts and trailing moves.
 if(tiles.every(row=>row.every(t=>t!=='0'))){let p=path.pop();tiles[p.row][p.column]='0';}
 let copy=tiles.map(r=>r.slice()),end=path.length;for(let i=0;i<path.length;i++){let p=path[i];copy[p.row][p.column]=copy[p.row][p.column]==='_'?'0':'_';if(copy.every(r=>r.every(t=>t!=='0'))){end=i+1;break;}}
 path=path.slice(0,end);return{tiles,playerPosition:start,maxMoves:path.length,solution:path,name:districts[Math.floor(index/6)%6],district:Math.floor(index/6)%6};}
const levels=Array.from({length:36},(_,i)=>make(i));export default levels;


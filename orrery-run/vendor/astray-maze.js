/* Adapted from wwwtyro/Astray maze.js. Public domain / Unlicense.
 * Original: https://github.com/wwwtyro/Astray
 * Changes: seeded random source, lexical locals, row-major output, input guard.
 * No upstream images, legacy libraries or gameplay code are bundled. */
(function(root){'use strict';
function astrayMaze(dimension,seed=1){if(!Number.isInteger(dimension)||dimension<5||dimension>15||dimension%2===0)throw Error('Odd maze dimension required');let state=seed>>>0,random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296},field=Array.from({length:dimension},()=>Array(dimension).fill(true));
 function iterate(x,y){field[x][y]=false;while(true){let directions=[];if(x>1&&field[x-2][y])directions.push([-1,0]);if(x<dimension-2&&field[x+2][y])directions.push([1,0]);if(y>1&&field[x][y-2])directions.push([0,-1]);if(y<dimension-2&&field[x][y+2])directions.push([0,1]);if(!directions.length)return;let dir=directions[Math.floor(random()*directions.length)];field[x+dir[0]][y+dir[1]]=false;iterate(x+dir[0]*2,y+dir[1]*2)}}
 iterate(1,1);return Array.from({length:dimension},(_,y)=>Array.from({length:dimension},(_,x)=>field[x][y]?'#':'.').join(''));
}
root.AstrayMaze=astrayMaze;if(typeof module!=='undefined'&&module.exports)module.exports=astrayMaze;
})(typeof window!=='undefined'?window:globalThis);

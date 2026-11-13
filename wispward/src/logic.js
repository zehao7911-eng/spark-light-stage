// A visible-information constraint solver. No hidden-cell truth is consulted by deduce().
export function around(x,y,w,h){const out=[];for(let yy=Math.max(0,y-1);yy<=Math.min(h-1,y+1);yy++)for(let xx=Math.max(0,x-1);xx<=Math.min(w-1,x+1);xx++)if(xx!==x||yy!==y)out.push(yy*w+xx);return out;}
export function deduce(grid,known,marks){const h=grid.length,w=grid[0].length;const safe=new Set(),mines=new Set(),constraints=[];
 for(const id of known){const x=id%w,y=Math.floor(id/w),c=grid[y][x];if(c.hasMine)continue;const ns=around(x,y,w,h),left=ns.filter(i=>!known.has(i)&&!marks.has(i));const n=c.touchingMines-ns.filter(i=>marks.has(i)).length;if(!left.length||n<0||n>left.length)continue;
  if(n===0)left.forEach(i=>safe.add(i));else if(n===left.length)left.forEach(i=>mines.add(i));else constraints.push({ids:new Set(left),n});
 }
 for(const a of constraints)for(const b of constraints){if(a===b||a.ids.size>=b.ids.size)continue;if([...a.ids].every(i=>b.ids.has(i))){const diff=[...b.ids].filter(i=>!a.ids.has(i)),n=b.n-a.n;if(n===0)diff.forEach(i=>safe.add(i));else if(n===diff.length)diff.forEach(i=>mines.add(i));}}
 return {safe,mines};
}
export function prove(grid,start){const h=grid.length,w=grid[0].length;const known=new Set(),marks=new Set();
 function open(ids){let changes=0;const queue=[...ids];for(let k=0;k<queue.length;k++){const id=queue[k];if(known.has(id))continue;const x=id%w,y=Math.floor(id/w),c=grid[y][x];if(c.hasMine)return -1;known.add(id);changes++;if(c.touchingMines===0)around(x,y,w,h).forEach(i=>{if(!known.has(i)&&!marks.has(i))queue.push(i);});}return changes;}
 open([start]);const opening=known.size;let loops=0;while(loops++<w*h){const next=deduce(grid,known,marks);let changes=0;for(const i of next.mines)if(!marks.has(i)){marks.add(i);changes++;}const opened=open(next.safe);if(opened<0)return {solved:false,opening};changes+=opened;if(!changes)break;}
 return {solved:known.size===grid.flat().filter(c=>!c.hasMine).length,opening};
}

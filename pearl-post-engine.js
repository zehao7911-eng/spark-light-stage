const PearlPuzzle=(()=>{
  const DIRS=[[0,-1],[1,0],[0,1],[-1,0]];
  function move(b,input,d){
    const p=input.slice(),[dx,dy]=DIRS[d],events=[];
    const order=p.map((v,i)=>i).filter(i=>p[i]>=0).sort((a,c)=>{const va=p[a],vc=p[c];return (vc%b.n)*dx+Math.floor(vc/b.n)*dy-(va%b.n)*dx-Math.floor(va/b.n)*dy});
    for(const i of order){const from=p[i],path=[from];let at=from,captured=false;
      for(let step=0;step<b.n;step++){
        const x=at%b.n+dx,y=Math.floor(at/b.n)+dy,next=y*b.n+x;
        if(x<0||y<0||x>=b.n||y>=b.n||b.walls.includes(next)||p.some((v,k)=>k!==i&&v===next))break;
        at=next;p[i]=at;path.push(at);
        if(i>0&&at===b.goals[i-1]){p[i]=-1;captured=true;break}
      }
      if(path.length>1)events.push({i,from,to:at,path,captured});
    }
    return {p,events,changed:events.length>0,won:p.slice(1).every(v=>v<0)};
  }
  function solve(b,start=b.start,cap=18000){
    if(start.slice(1).every(v=>v<0))return[];
    const queue=[{p:start.slice(),parent:-1,d:-1}],seen=new Set([start.join(',')]);let h=0;
    while(h<queue.length&&queue.length<cap){const node=queue[h];
      for(let d=0;d<4;d++){const m=move(b,node.p,d);if(!m.changed)continue;const key=m.p.join(',');if(seen.has(key))continue;seen.add(key);const index=queue.length;queue.push({p:m.p,parent:h,d});
        if(m.won){const path=[];let k=index;while(queue[k].parent>=0){path.push(queue[k].d);k=queue[k].parent}return path.reverse()}}
      h++;
    }return null;
  }
  function transformCell(v,n,turn,mirror){if(v<0)return v;let x=v%n,y=Math.floor(v/n);if(mirror)x=n-1-x;for(let i=0;i<turn;i++){let z=x;x=n-1-y;y=z}return y*n+x}
  function make(level,bank){
    const group=level<4?0:level<14?1:level%8===0?0:level%4===0?1:2,items=bank.filter(v=>v.goals.length===group+1),idx=level<4?level-1:((level*47+Math.floor(level/11)*13)%items.length),base=items[idx%items.length];
    const turn=level<4?0:(Math.floor(level/3)%4),mirror=level<4?false:Math.floor(level/7)%2===1,cell=v=>transformCell(v,base.n,turn,mirror);
    return {n:base.n,walls:base.walls.map(cell),goals:base.goals.map(cell),start:base.start.map(cell),par:base.par,level};
  }
  return{DIRS,move,solve,make,transformCell};
})();

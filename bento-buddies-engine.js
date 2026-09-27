'use strict';
const BentoPuzzle=(()=>{
  function make(level,bank){
    const src=bank[(level-1)%bank.length],cycle=Math.floor((level-1)/bank.length),mx=cycle%2,my=Math.floor(cycle/2)%2;
    const pieces=src.parts.map((part,i)=>{let cells=part.map(([x,y])=>[mx?src.w-1-x:x,my?src.h-1-y:y]);const x=Math.min(...cells.map(c=>c[0])),y=Math.min(...cells.map(c=>c[1]));cells=cells.map(c=>[c[0]-x,c[1]-y]).sort((a,b)=>a[1]-b[1]||a[0]-b[0]);return{cells,home:[x,y],kind:(i+level-1)%6}});
    return{w:src.w,h:src.h,pieces,level};
  }
  function fits(b,positions,i,x,y){
    if(!Number.isInteger(x)||!Number.isInteger(y))return false;
    const occupied=new Set();positions.forEach((p,j)=>{if(p&&j!==i)b.pieces[j].cells.forEach(c=>occupied.add((p[1]+c[1])*b.w+p[0]+c[0]))});
    return b.pieces[i].cells.every(([cx,cy])=>x+cx>=0&&y+cy>=0&&x+cx<b.w&&y+cy<b.h&&!occupied.has((y+cy)*b.w+x+cx));
  }
  function solve(b,positions=Array(b.pieces.length).fill(null)){
    const pos=positions.map(p=>p&&p.slice());for(let i=0;i<pos.length;i++)if(pos[i]&&!fits(b,pos,i,...pos[i]))return null;
    let budget=100000;
    function search(){if(--budget<0)return null;let best=-1,options=null;
      for(let i=0;i<pos.length;i++)if(!pos[i]){const piece=b.pieces[i],pw=Math.max(...piece.cells.map(c=>c[0]))+1,ph=Math.max(...piece.cells.map(c=>c[1]))+1,candidates=[];for(let y=0;y<=b.h-ph;y++)for(let x=0;x<=b.w-pw;x++)if(fits(b,pos,i,x,y))candidates.push([x,y]);if(!candidates.length)return null;if(!options||candidates.length<options.length){best=i;options=candidates}}
      if(best<0)return pos.map(p=>p.slice());for(const p of options){pos[best]=p;const answer=search();if(answer)return answer}pos[best]=null;return null;
    }return search();
  }
  function complete(b,pos){return pos.every(Boolean)&&pos.every((p,i)=>fits(b,pos,i,...p))}
  return{make,fits,solve,complete};
})();

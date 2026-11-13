(function(root){'use strict';
const TRACKS=[
 {name:'First Light',bpm:90,bars:6,key:0,venue:0,tag:'Find your pulse',motif:[0,4,7,11,7,4,2,7]},
 {name:'Velvet Circuit',bpm:96,bars:8,key:2,venue:0,tag:'Follow the echoes',motif:[0,3,7,10,7,5,3,2]},
 {name:'Glass Current',bpm:100,bars:8,key:5,venue:1,tag:'Let it ring',motif:[0,7,12,9,7,4,2,4]},
 {name:'Ultraviolet',bpm:104,bars:8,key:7,venue:1,tag:'Two hands, one groove',motif:[0,3,5,10,7,5,3,7]},
 {name:'Solar Stereo',bpm:108,bars:10,key:9,venue:2,tag:'Ride the long waves',motif:[0,4,7,9,12,9,7,4]},
 {name:'Prism Riot',bpm:112,bars:12,key:0,venue:2,tag:'Bring the whole room alive',motif:[0,7,10,12,15,12,10,7]}
];
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function chart(id,remix=0){const d=TRACKS[id],spb=60/d.bpm,notes=[];let seed=(remix*9301+id*473+87)>>>0;const rnd=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
 for(let bar=0;bar<d.bars;bar++){
  let beats=id===0?[0,1,2,3] : id===1?[0,1,2,2.5,3] : id===2?[0,1,2,3] : id===3?[0,.5,1.5,2,3] : id===4?[0,1,2,2.5,3] : [0,.5,1,2,2.5,3];
  if(id===0&&bar<2)beats=[0,2];
  for(let j=0;j<beats.length;j++){
   let lane=id===0? (bar<2?bar%3:(bar+j)%3) : (bar*2+j+(bar%2?1:0))%3;
   if(remix){lane=(lane+Math.floor(rnd()*3))%3;let now=(4+bar*4+beats[j])*spb;for(let k=0;k<3;k++){let candidate=(lane+k)%3;if(!notes.some(n=>n.lane===candidate&&now-n.at<n.length+.08)){lane=candidate;break;}}}
   let length=id>=2&&beats[j]===0&&bar%2===1?spb*.75:0;
   notes.push({at:(4+bar*4+beats[j])*spb,lane,length});
   if(id>=3&&beats[j]===2&&bar%2===0)notes.push({at:(4+bar*4+beats[j])*spb,lane:(lane+1)%3,length:0});
  }
 }
 return notes.sort((a,b)=>a.at-b.at||a.lane-b.lane).map((n,i)=>({...n,id:i,state:0,q:0,credit:0,auto:false}));
}
class Session{
 constructor(id=0,remix=0,wide=true){this.id=clamp(id|0,0,5);this.remix=Math.max(0,remix|0);this.wide=!!wide;this.notes=chart(this.id,this.remix);this.t=0;this.phase='ready';this.combo=0;this.maxCombo=0;this.perfect=0;this.good=0;this.missed=0;this.extra=0;this.held=[false,false,false];this.events=[];this.duration=(4+TRACKS[this.id].bars*4+2)*60/TRACKS[this.id].bpm;}
 begin(){if(this.phase!=='ready'&&this.phase!=='paused')return false;this.phase='playing';return true;}
 event(type,n,q=0){this.events.push({type,lane:n?.lane??-1,id:n?.id??-1,q,delta:n?.delta||0,combo:this.combo});}
 get window(){return this.wide?.235:.16;}
 advance(to){if(this.phase!=='playing'||!Number.isFinite(to))return;this.t=clamp(Math.max(this.t,to),0,this.duration);
  for(const n of this.notes){if(n.state===0&&this.t>n.at+this.window+.15){n.state=3;this.combo=0;this.missed++;this.event('miss',n);}
   if(n.state===1&&this.t>=n.at+n.length){if(this.held[n.lane]||n.auto)this.finish(n,n.q);else this.breakHold(n);}}
  if(this.t>=this.duration){this.phase='result';this.held.fill(false);this.event('finish');}
 }
 press(lane,offset=0){if(this.phase!=='playing'||lane<0||lane>2)return false;if(this.held[lane])return false;this.held[lane]=true;
  const t=this.t+offset;let n=this.notes.find(n=>n.lane===lane&&n.state===0&&Math.abs(n.at-t)<=this.window);
  if(!n){if(this.t>this.notes[0].at-this.window&&this.t<this.notes.at(-1).at+this.window){this.extra++;this.combo=0;this.event('empty',{lane});}return false;}
  const error=Math.abs(n.at-t),q=error<=.105?1:error<=.17?.78:.55;n.q=q;n.delta=t-n.at;
  if(n.length){n.state=1;n.credit=q*.55;this.event('hold',n,q);}else this.finish(n,q);return true;
 }
 finish(n,q){if(n.state===2||n.state===3)return;n.state=2;n.credit=q;this.combo++;this.maxCombo=Math.max(this.maxCombo,this.combo);if(q===1)this.perfect++;else this.good++;this.event('hit',n,q);}
 breakHold(n){if(n.state!==1)return;n.state=3;this.missed++;this.combo=0;this.event('break',n,n.credit);}
 release(lane){if(lane<0||lane>2)return;this.held[lane]=false;if(this.phase!=='playing')return;for(const n of this.notes)if(n.lane===lane&&n.state===1){if(this.t>=n.at+n.length-.13)this.finish(n,n.q);else this.breakHold(n);}}
 pause(){if(this.phase!=='playing')return false;this.phase='paused';this.suspendHolds();return true;}
 suspendHolds(){this.held.fill(false);for(const n of this.notes)if(n.state===1)n.auto=true;}
 get accuracy(){return clamp(this.notes.reduce((s,n)=>s+n.credit,0)/(this.notes.length+this.extra*.75),0,1);}
 get score(){return Math.round(this.notes.reduce((s,n)=>s+n.credit*100,0)+this.maxCombo*8);}
 get stars(){if(this.phase!=='result')return 0;return this.accuracy>=.90?3:this.accuracy>=.67?2:this.accuracy>=.35?1:0;}
 drain(){return this.events.splice(0);}
 snapshot(){return {version:1,id:this.id,remix:this.remix,wide:this.wide,t:this.t,phase:this.phase,combo:this.combo,maxCombo:this.maxCombo,perfect:this.perfect,good:this.good,missed:this.missed,extra:this.extra,notes:this.notes.map(({state,q,credit,auto})=>({state,q,credit,auto}))};}
 static restore(s){try{if(!s||s.version!==1||!Number.isInteger(s.id)||s.id<0||s.id>5||!Number.isInteger(s.remix)||s.remix<0||s.remix>100000)return null;let g=new Session(s.id,s.remix,s.wide);if(!Array.isArray(s.notes)||s.notes.length!==g.notes.length||!['ready','playing','paused','result'].includes(s.phase)||!Number.isFinite(s.t)||s.t<0||s.t>g.duration)return null;
  for(let i=0;i<g.notes.length;i++){let v=s.notes[i];if(!v||![0,1,2,3].includes(v.state)||!Number.isFinite(v.q)||v.q<0||v.q>1||!Number.isFinite(v.credit)||v.credit<0||v.credit>1)return null;Object.assign(g.notes[i],v);}
  for(const k of ['combo','maxCombo','perfect','good','missed','extra']){if(!Number.isInteger(s[k])||s[k]<0||s[k]>100000)return null;g[k]=s[k];}
  g.t=s.t;g.phase=s.phase==='playing'?'paused':s.phase;g.suspendHolds();return g;
 }catch{return null;}}
}
function profile(raw={}){let p={best:Array(6).fill(0),scores:Array(6).fill(0),accuracy:Array(6).fill(0),skin:0,sound:true,reduced:false,wide:true,offset:0,remixBest:0};if(!raw||typeof raw!=='object')return p;for(let i=0;i<6;i++){p.best[i]=clamp(raw.best?.[i]|0,0,3);p.scores[i]=clamp(raw.scores?.[i]|0,0,100000);p.accuracy[i]=clamp(Number(raw.accuracy?.[i])||0,0,1);}for(const k of ['sound','reduced','wide'])if(typeof raw[k]==='boolean')p[k]=raw[k];p.offset=clamp(Number(raw.offset)||0,-.15,.15);p.remixBest=clamp(raw.remixBest|0,0,100000);let stars=p.best.reduce((a,b)=>a+b,0),s=clamp(raw.skin|0,0,3);p.skin=stars>=[0,4,9,14][s]?s:0;return p;}
function unlock(p,id){return id===0||p.best[id-1]>0;}
function award(p,g){if(g.phase!=='result')return false;if(g.remix){p.remixBest=Math.max(p.remixBest,g.score);return false;}let old=p.best[g.id];p.best[g.id]=Math.max(old,g.stars);p.scores[g.id]=Math.max(p.scores[g.id],g.score);p.accuracy[g.id]=Math.max(p.accuracy[g.id],g.accuracy);return p.best[g.id]>old;}
root.PR={TRACKS,chart,Session,profile,unlock,award,clamp};
})(typeof globalThis!=='undefined'?globalThis:window);

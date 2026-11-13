/* CROWNGLASS — capture-only, shape-changing chess puzzles. Original rules engine. */
(function(g){'use strict';
const TYPES=['N','R','B','Q','K'],NAMES={N:'KNIGHT',R:'ROOK',B:'BISHOP',Q:'QUEEN',K:'KING'},GLYPHS={N:'♘',R:'♖',B:'♗',Q:'♕',K:'♔'};
const clone=o=>JSON.parse(JSON.stringify(o)),clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const key=p=>p.x+','+p.y,inside=p=>p&&Number.isInteger(p.x)&&Number.isInteger(p.y)&&p.x>=0&&p.x<6&&p.y>=0&&p.y<6;
function legal(p,e,enemies,blocks=[]){if(!p||!e||!inside(p)||!inside(e))return false;let dx=e.x-p.x,dy=e.y-p.y,ax=Math.abs(dx),ay=Math.abs(dy);if(!dx&&!dy)return false;
 const yes=p.kind==='N'?ax*ay===2:p.kind==='R'?!dx||!dy:p.kind==='B'?ax===ay:p.kind==='Q'?(!dx||!dy||ax===ay):p.kind==='K'?Math.max(ax,ay)===1:false;
 if(!yes)return false;if(p.kind==='N'||p.kind==='K')return true;let x=p.x+Math.sign(dx),y=p.y+Math.sign(dy);while(x!==e.x||y!==e.y){if(enemies.some(o=>o.x===x&&o.y===y)||blocks.some(o=>o.x===x&&o.y===y))return false;x+=Math.sign(dx);y+=Math.sign(dy);}return true;
}
function solve(player,enemies,blocks=[],limit=150000){let visits=0,memo=new Set();
 function dfs(p,es){if(!es.length)return[];let k=p.kind+key(p)+'|'+es.map(e=>e.id).sort((a,b)=>a-b).join(',');if(memo.has(k)||++visits>limit)return null;for(let e of es)if(legal(p,e,es,blocks)){let rest=es.filter(o=>o.id!==e.id),r=dfs({...e},rest);if(r)return[e.id,...r];}memo.add(k);return null;}
 return dfs(player,enemies);
}
function random(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
function generate(seed,count=6,start='N',blockCount=0){let rand=random(seed);for(let attempt=0;attempt<4000;attempt++){
 let player={kind:start,x:Math.floor(rand()*6),y:Math.floor(rand()*6)},p=clone(player),es=[],used=new Set([key(p)]);let valid=true;
 for(let i=0;i<count;i++){let options=[];for(let y=0;y<6;y++)for(let x=0;x<6;x++){let e={id:i,x,y,kind:TYPES[Math.floor(rand()*TYPES.length)]};if(!used.has(key(e))&&legal(p,e,[]))options.push(e);}if(!options.length){valid=false;break;}let e=options[Math.floor(rand()*options.length)];es.push(e);used.add(key(e));p=clone(e);}
 if(!valid)continue;const blocks=[];for(let i=0;i<blockCount;i++){let choices=[];for(let y=0;y<6;y++)for(let x=0;x<6;x++)if(!used.has(key({x,y})))choices.push({x,y});if(choices.length){let b=choices[Math.floor(rand()*choices.length)];blocks.push(b);used.add(key(b));}}
 if(count>=4&&es.filter(e=>legal(player,e,es,blocks)).length<2)continue;
 if(solve(player,es,blocks))return{player,enemies:es,blocks,seed};
 }throw Error('Could not generate a solvable chamber');}
function fresh(){return{v:1,stars:Array(12).fill(0),skin:0,sound:true,active:null};}
function clean(o){let s=fresh();if(!o||o.v!==1)return s;for(let i=0;i<12;i++){let n=Number(o.stars?.[i]);s.stars[i]=Number.isFinite(n)?clamp(n|0,0,3):0;}s.skin=Number.isInteger(o.skin)?clamp(o.skin,0,3):0;s.sound=o.sound!==false;if(o.active&&typeof o.active==='object')s.active=clone(o.active);return s;}
const unlock=s=>{let n=1;while(n<12&&s.stars[n-1])n++;return n;},skins=s=>{let n=s.stars.reduce((a,b)=>a+b,0);return 1+(n>=6?1:0)+(n>=18?1:0)+(n>=30?1:0);};
class Game{
 constructor(level=0,layout=null){this.level=clamp(level|0,0,11);this.layout=clone(layout||g.CG_LEVELS[this.level]);this.player=clone(this.layout.player);this.enemies=clone(this.layout.enemies);this.blocks=clone(this.layout.blocks||[]);this.total=this.enemies.length;this.history=[];this.moves=0;this.usedHint=false;this.usedUndo=false;this.anim=null;this.finished=false;this.events=[];this.t=0;this.hintId=null;}
 options(){return this.finished||this.anim?[]:this.enemies.filter(e=>legal(this.player,e,this.enemies,this.blocks));}
 board(){return{player:clone(this.player),enemies:clone(this.enemies),moves:this.moves};}
 capture(id){if(this.finished||this.anim)return false;let e=this.enemies.find(e=>e.id===id);if(!e||!legal(this.player,e,this.enemies,this.blocks))return false;this.history.push(this.board());let from=clone(this.player);this.enemies=this.enemies.filter(o=>o.id!==id);this.player={x:e.x,y:e.y,kind:e.kind};this.moves++;this.hintId=null;this.anim={from,to:clone(this.player),victim:clone(e),age:0,impact:false,shift:false};this.events.push({type:'move',from,to:clone(this.player)});return true;}
 tick(dt){if(this.finished||!Number.isFinite(dt)||dt<=0)return;dt=Math.min(.05,dt);this.t+=dt;if(this.anim){const a=this.anim;a.age+=dt;if(!a.impact&&a.age>=.5){a.impact=true;this.events.push({type:'impact',to:clone(a.to),kind:a.from.kind,count:this.moves});}if(!a.shift&&a.age>=.67){a.shift=true;this.events.push({type:'shift',kind:a.to.kind,to:clone(a.to)});}if(a.age>=1.08){this.anim=null;if(!this.enemies.length)this.finish();else if(!this.options().length)this.events.push({type:'blocked'});}}else if(!this.enemies.length)this.finish();}
 finish(){if(this.finished)return;this.finished=true;this.stars=1+(!this.usedHint?1:0)+(!this.usedUndo?1:0);this.events.push({type:'finish',stars:this.stars});}
 undo(){if(this.finished||this.anim||!this.history.length)return false;let b=this.history.pop();this.player=b.player;this.enemies=b.enemies;this.moves=b.moves;this.usedUndo=true;this.hintId=null;this.events.push({type:'undo'});return true;}
 hint(){if(this.finished||this.anim)return null;let route=solve(this.player,this.enemies,this.blocks);if(!route||!route.length)return null;this.usedHint=true;this.hintId=route[0];this.events.push({type:'hint',id:this.hintId});return this.hintId;}
 drain(){return this.events.splice(0);}
 snapshot(){return{level:this.level,player:clone(this.player),enemies:clone(this.enemies),history:clone(this.history),moves:this.moves,usedHint:this.usedHint,usedUndo:this.usedUndo};}
 static restore(s){if(!s||!Number.isInteger(s.level)||s.level<0||s.level>=12)return null;let m=new Game(s.level),known=m.layout.enemies;
 function valid(b){if(!b||!inside(b.player)||!TYPES.includes(b.player.kind)||!Array.isArray(b.enemies)||b.enemies.length>m.total)return false;let occupied=new Set([key(b.player)]),ids=new Set();for(let e of b.enemies){if(!inside(e)||occupied.has(key(e))||ids.has(e.id)||!known.some(k=>k.id===e.id&&k.x===e.x&&k.y===e.y&&k.kind===e.kind))return false;occupied.add(key(e));ids.add(e.id);}let start=m.layout.player,canonical=b.moves===0?b.player.kind===start.kind&&key(b.player)===key(start):known.some(e=>e.kind===b.player.kind&&key(e)===key(b.player)&&!ids.has(e.id));return canonical&&Number.isInteger(b.moves)&&b.moves===m.total-b.enemies.length;}
 if(!valid(s)||!Array.isArray(s.history)||s.history.length!==s.moves||s.history.some((b,i)=>!valid(b)||b.moves!==i))return null;
 for(let i=0;i<s.history.length;i++){let a=s.history[i],b=i+1<s.history.length?s.history[i+1]:s,removed=a.enemies.filter(e=>!b.enemies.some(o=>o.id===e.id));if(removed.length!==1||!legal(a.player,removed[0],a.enemies,m.blocks)||b.player.kind!==removed[0].kind||key(b.player)!==key(removed[0]))return null;}
 m.player=clone(s.player);m.enemies=clone(s.enemies);m.moves=s.moves;m.history=clone(s.history);m.usedHint=s.usedHint===true;m.usedUndo=s.usedUndo===true;return m;
 }
 commit(profile){if(!this.finished)return null;let s=clean(profile);s.stars[this.level]=Math.max(s.stars[this.level],this.stars);s.active=null;return s;}
}
g.CG={TYPES,NAMES,GLYPHS,legal,solve,generate,Game,fresh,clean,unlock,skins,clone,inside};
})(typeof window==='undefined'?globalThis:window);

(function(root){'use strict';
const T=32, W=1024, H=512, clamp=(v,a,b)=>Math.max(a,Math.min(b,v)), overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
const names=['First feathers','Packing room','Switch kitchen','Chain reaction','Rolling stock','High roost','Cold storage','The great hatch'];
function layout(n){
 let tiles=[{x:0,y:-32,w:W,h:32},{x:0,y:448,w:W,h:64},{x:-32,y:-96,w:32,h:608},{x:W,y:-96,w:32,h:608}], crates=[],gems=[],enemies=[],tnt=[],switches=[],gates=[],belts=[];
 const ledge=(x,y,w=128)=>tiles.push({x,y,w,h:448-y});
 let heights=[[384,352,384],[352,320,352],[384,320,352],[352,352,320],[352,320,352],[352,288,224],[384,320,288],[352,288,288]][n];let xs=[[224,480,832],[192,448,832],[192,448,832],[192,544,864],[256,512,864],[192,416,800],[192,544,832],[224,512,864]][n];
 ledge(xs[0],heights[0],96);ledge(xs[1],heights[1],128);ledge(xs[2],heights[2],128);if(n===5)ledge(640,352,64);
 for(let i=0;i<3;i++)gems.push({x:xs[i]+(i===2?32:56),y:heights[i]-52,taken:false});
 if(n===1||n===3||n===6||n===7){let x=n===1?320:n===6?416:n===7?416:352;for(let col=0;col<(n===3?4:2);col++)for(let row=0;row<(n===6?4:3);row++)crates.push({x:x+col*32,y:416-row*32,w:32,h:32,broken:false});}
 if(n===2||n===5||n===7){switches.push({x:n===5?720:n===7?688:640,y:410,on:false});if(n===7)switches.push({x:368,y:426,on:false});gates.push({x:n===7?784:752,y:0,w:24,h:448,open:false});}
 if(n===3||n===7)for(let i=0;i<3;i++)tnt.push({x:(n===7?384:352)+i*40,y:432,dead:false});
 if(n===4||n===7)belts.push({x:352,y:448,w:384,h:12,dir:n===4?-1:1});
 if(n>=1)enemies.push({x:680,y:420,w:28,h:28,vx:60+n*5,vy:0,min:660,max:716,dead:false,ground:false});
 if(n>=4)enemies.push({x:130,y:420,w:28,h:28,vx:-65,vy:0,min:64,max:190,dead:false,ground:false});
 return {tiles,crates,gems,enemies,tnt,switches,gates,belts,chick:{x:xs[1]+56,y:heights[1]-18,saved:false},exit:{x:xs[2]+72,y:heights[2]-48,w:42,h:48},spawn:{x:72,y:420},heights,xs};
}
function fresh(n=0,profile){return{v:1,n:clamp(n|0,0,7),time:0,mode:'play',p:{x:72,y:420,w:28,h:28,vx:0,vy:0,dir:1,ground:true,inv:1,squash:0},level:layout(clamp(n|0,0,7)),bombs:[],fx:[],events:[],cool:0,kcool:0,deaths:0,laid:0,kicked:0,combo:0,comboTime:0,bestCombo:0,score:0,medal:0,profile:profile||{best:Array(8).fill(0),unlocked:0,coat:0,times:Array(8).fill(0)},checkpoint:false,checkX:72,checkY:420,shake:0,flash:0,nextId:1};}
function emit(s,type,x,y,value){s.events.push({type,x,y,value});}
function solids(s,bombs=true,exclude){return [...s.level.tiles,...s.level.crates.filter(c=>!c.broken),...s.level.gates.filter(g=>!g.open),...(bombs?s.bombs.filter(b=>b!==exclude&&!b.dead):[])];}
function motion(s,a,dt,incBombs,exclude){a.ground=false;let old=a.x;a.x+=a.vx*dt;for(let b of solids(s,a===s.p?false:incBombs,exclude))if(overlap(a,b)){a.x=a.vx>0?b.x-a.w:b.x+b.w;a.vx=0;}
 a.vy=Math.min(600,a.vy+980*dt);let oy=a.y;a.y+=a.vy*dt;for(let b of solids(s,incBombs,exclude))if(overlap(a,b)){if(a.vy>=0&&oy+a.h<=b.y+5){a.y=b.y-a.h;a.vy=0;a.ground=true;}else if(a.vy<0){a.y=b.y+b.h;a.vy=0;}}
 return a.x-old;
}
function lay(s){let p=s.p;if(s.mode!=='play'||s.cool>0||!p.ground||s.bombs.length>=20)return false;let b={id:s.nextId++,x:p.x,y:p.y+p.h-28,w:28,h:28,vx:0,vy:0,fuse:4.5,age:0,ground:true,dead:false};let raised={...p,y:p.y-28};if(solids(s).some(o=>overlap(raised,o)))return false;p.y-=28;p.vy=0;p.ground=true;p.squash=.16;s.bombs.push(b);s.laid++;s.cool=.22;emit(s,'lay',p.x+13,p.y+28);return true;}
function kick(s){if(s.mode!=='play'||s.kcool>0)return false;let p=s.p,cx=p.x+13,cy=p.y+14;let near=s.bombs.filter(b=>!b.dead&&Math.abs(b.y+14-cy)<40&&Math.abs(b.x+14-cx)<62).sort((a,b)=>Math.abs(a.x+14-cx)-Math.abs(b.x+14-cx))[0];
 if(!near){near={id:s.nextId++,x:p.dir>0?p.x+p.w+5:p.x-33,y:p.y,w:28,h:28,vx:0,vy:0,fuse:2.3,age:0,ground:false,dead:false};if(solids(s).some(o=>overlap(near,o))||s.bombs.length>=20)return false;s.bombs.push(near);s.laid++;}near.vx=310*p.dir;near.vy=-85;near.fuse=Math.min(near.fuse,2.3);s.kcool=.34;s.kicked++;p.squash=.2;emit(s,'kick',near.x+14,near.y+14);return true;}
function blocked(s,x,y,tx,ty){for(let r of s.level.tiles){if(r.h>=64&&r.y>=448)continue;for(let i=1;i<=6;i++){let q={x:x+(tx-x)*i/6,y:y+(ty-y)*i/6,w:1,h:1};if(overlap(q,r))return true;}}return false;}
function hurt(s){if(s.p.inv>0||s.mode!=='play')return;s.deaths++;emit(s,'hurt',s.p.x+13,s.p.y+14);s.p.x=s.checkX;s.p.y=s.checkY;s.p.vx=s.p.vy=0;s.p.inv=1.5;s.bombs=[];s.shake=.3;}
function explode(s,b){if(b.dead)return;b.dead=true;let x=b.x+14,y=b.y+14;emit(s,'boom',x,y);s.shake=Math.max(s.shake,.23);s.flash=.08;
 const near=(tx,ty,r=79)=>Math.hypot(tx-x,ty-y)<r&&!blocked(s,x,y,tx,ty);
 for(let o of s.level.crates)if(!o.broken&&near(o.x+16,o.y+16)){o.broken=true;s.score+=10;emit(s,'crate',o.x+16,o.y+16);s.combo++;}
 for(let e of s.level.enemies)if(!e.dead&&near(e.x+14,e.y+14,84)){e.dead=true;s.score+=50;s.combo++;emit(s,'enemy',e.x+14,e.y+14);}
 for(let t of s.level.tnt)if(!t.dead&&near(t.x,t.y,94)){t.dead=true;s.bombs.push({id:s.nextId++,x:t.x-14,y:t.y-14,w:28,h:28,fuse:.13,age:0,vx:0,vy:0,dead:false,ground:true,tnt:true});}
 for(let o of s.level.switches)if(!o.on&&near(o.x,o.y,88)){o.on=true;if(s.level.switches.every(v=>v.on))s.level.gates.forEach(g=>g.open=true);emit(s,'switch',o.x,o.y);s.score+=100;}
 for(let o of s.bombs)if(o!==b&&!o.dead&&near(o.x+14,o.y+14,84))o.fuse=Math.min(o.fuse,.12);
 s.bestCombo=Math.max(s.bestCombo,s.combo);s.comboTime=1.2;if(s.p.inv<=0&&near(s.p.x+13,s.p.y+14,70))hurt(s);
}
function step(s,dt,input={}){s.events=[];if(s.mode!=='play')return;s.time+=dt;s.cool=Math.max(0,s.cool-dt);s.kcool=Math.max(0,s.kcool-dt);s.shake=Math.max(0,s.shake-dt);s.flash=Math.max(0,s.flash-dt);s.comboTime-=dt;if(s.comboTime<=0)s.combo=0;let p=s.p;p.inv=Math.max(0,p.inv-dt);p.squash=Math.max(0,p.squash-dt);
 if(input.lay)lay(s);if(input.kick)kick(s);let d=(input.right?1:0)-(input.left?1:0);if(d)p.dir=d;p.vx=d*168;for(let belt of s.level.belts)if(p.ground&&p.y+p.h>=belt.y-2&&p.x+p.w>belt.x&&p.x<belt.x+belt.w)p.vx+=belt.dir*55;
 motion(s,p,dt,true);p.x=clamp(p.x,0,W-p.w);if(p.y>H+64)hurt(s);
 for(let b of s.bombs){if(b.dead)continue;b.age+=dt;b.fuse-=dt;let vx=b.vx;motion(s,b,dt,true,b);if(vx&&b.vx===0){b.vx=-vx*.55;emit(s,'bounce',b.x+14,b.y+14);}if(b.ground)b.vx*=Math.pow(.992,dt*60);for(let belt of s.level.belts)if(b.ground&&b.y+b.h>=belt.y-2&&b.x>belt.x&&b.x<belt.x+belt.w){let bx=b.x;b.x+=belt.dir*65*dt;if(solids(s,true,b).some(o=>overlap(b,o)))b.x=bx;}if(b.fuse<=0)explode(s,b);}
 s.bombs=s.bombs.filter(b=>!b.dead&&b.y<H+100);
 for(let e of s.level.enemies){if(e.dead)continue;let vx=e.vx;motion(s,e,dt,false);if(e.vx===0||e.x<e.min||e.x>e.max)e.vx=e.x<e.min?Math.abs(vx):e.x>e.max?-Math.abs(vx):-vx;if(overlap(p,e))hurt(s);}
 for(let g of s.level.gems)if(!g.taken&&Math.hypot(p.x+13-g.x,p.y+14-g.y)<29){g.taken=true;s.score+=100;emit(s,'gem',g.x,g.y);}
 let c=s.level.chick;if(!c.saved&&Math.hypot(p.x+13-c.x,p.y+14-c.y)<31){c.saved=true;emit(s,'chick',c.x,c.y);s.score+=250;s.checkpoint=true;s.checkX=s.level.xs[1]+22;s.checkY=s.level.heights[1]-28;}
 if(c.saved&&overlap(p,s.level.exit)){s.mode='win';let count=s.level.gems.filter(g=>g.taken).length;s.medal=1+(count===3?1:0)+(s.deaths===0?1:0);s.profile.times=s.profile.times||Array(8).fill(0);s.profile.times[s.n]=s.profile.times[s.n]?Math.min(s.profile.times[s.n],s.time):s.time;s.profile.best[s.n]=Math.max(s.medal,s.profile.best[s.n]||0);s.profile.unlocked=Math.max(s.profile.unlocked,Math.min(7,s.n+1));s.bombs=[];emit(s,'win',p.x,p.y);}
}
function restore(o){try{if(!o||o.v!==1||!Number.isInteger(o.n)||o.n<0||o.n>7)throw 0;let s=fresh(o.n);if(!o.p||![o.p.x,o.p.y,o.p.vx,o.p.vy,o.time].every(Number.isFinite)||!Array.isArray(o.bombs)||o.bombs.length>20)throw 0;if(o.p.x<0||o.p.x>W||o.p.y< -300||o.p.y>H+100)throw 0;for(let k of ['tiles','crates','gems','enemies','tnt','switches','gates','belts'])if(!Array.isArray(o.level[k])||o.level[k].length!==s.level[k].length)throw 0;for(let b of o.bombs)if(![b.x,b.y,b.vx,b.vy,b.fuse].every(Number.isFinite))throw 0;
 if(!o.profile||!Array.isArray(o.profile.best)||o.profile.best.length!==8||o.profile.best.some(v=>!Number.isInteger(v)||v<0||v>3))throw 0;if(!Number.isInteger(o.profile.unlocked)||o.profile.unlocked<0||o.profile.unlocked>7||![0,1,2].includes(o.profile.coat)||!['play','win'].includes(o.mode))throw 0;
 if(![o.cool,o.kcool,o.deaths,o.score,o.checkX,o.checkY,o.nextId].every(Number.isFinite)||o.deaths<0||o.p.w!==28||o.p.h!==28)throw 0;
 if(JSON.stringify(o.level.tiles)!==JSON.stringify(s.level.tiles)||JSON.stringify(o.level.xs)!==JSON.stringify(s.level.xs))throw 0;
 for(let e of o.level.enemies)if(![e.x,e.y,e.vx,e.vy].every(Number.isFinite))throw 0;
 let q=JSON.parse(JSON.stringify(o));q.profile.times=q.profile.times||Array(8).fill(0);if(q.profile.times.length!==8||q.profile.times.some(t=>!Number.isFinite(t)||t<0))throw 0;q.fx=[];q.events=[];return q;}catch{return fresh();}}
 const api={T,W,H,names,layout,fresh,step,lay,kick,restore,overlap};if(typeof module!=='undefined')module.exports=api;root.FuseEngine=api;
})(typeof window!=='undefined'?window:globalThis);





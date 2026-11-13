import assert from'node:assert/strict';
import fs from'node:fs';
import{fresh,launch,step,predict,snapshot,restore,undo,stars,score,LEVELS,W,H,R}from'./core.js';
let checks=0;const ok=(v,m)=>{assert.ok(v,m);checks++;};const equal=(a,b)=>{assert.deepEqual(a,b);checks++;};
const routes=JSON.parse(fs.readFileSync(new URL('./routes.json',import.meta.url)));
function finish(s){for(let k=0;k<2400&&s.moving;k++){step(s,1/180);ok(Number.isFinite(s.x+s.y+s.vx+s.vy),'finite');ok(s.x>=R-.01&&s.x<=W-R+.01&&s.y>=R-.01&&s.y<=H-R+.01,'bounds');s.events=[];}ok(!s.moving,'settles');}
for(const a of routes){const s=fresh(a.i);for(const move of a.route){let before=snapshot(s),pr=predict(s,move.dx,move.dy);equal(snapshot(s),before);ok(launch(s,move.dx,move.dy),'launch');ok(!launch(s,30,30),'no double shot');finish(s);equal(snapshot(s),snapshot(pr.end));}ok(s.won&&s.fish===7,'all fish clear '+a.i);equal(stars(s),3);ok(s.shots<=LEVELS[a.i].par,'fair par');const won=snapshot(s);ok(!launch(s,20,20),'terminal input');step(s,1/60);equal(snapshot(s),won);ok(score(s)>=600,'reward');equal(snapshot(restore(snapshot(s))),snapshot(s));}
let s=fresh();ok(!launch(s,0,0));ok(!launch(s,NaN,3));ok(!launch(s,5,0));equal(s.shots,0);ok(launch(s,0,-56));for(let k=0;k<110;k++)step(s,1/180);const mid=snapshot(s),r=restore(mid);equal(snapshot(r),mid);finish(s);finish(r);equal(snapshot(s),snapshot(r));ok(s.won&&s.fish===7);ok(undo(s));equal(snapshot(s),snapshot(fresh()));ok(!undo(s));
for(let i=0;i<12;i++){s=fresh(i);launch(s,77,0);finish(s);ok(s.banks>0,'wall rebound');let prev=snapshot(s);ok(undo(s));equal(s.shots,0);equal(s.fish,0);}
for(const x of[null,{}, {i:50},{...mid,x:-30},{...mid,vx:Infinity},{...mid,fish:99},{...mid,shots:-1}])equal(snapshot(restore(x)),snapshot(fresh()));
// Snow absorbs momentum; terrain response must change the actual endpoint.
s=fresh(2);s.x=205;s.y=220;let slow=predict(s,0,-30).end;let bare=fresh(0);bare.x=205;bare.y=220;let fast=predict(bare,0,-30).end;ok(slow.y>fast.y+5,'snow friction');
// An icebox must reflect the moving seal, rather than allowing a pass-through.
s=fresh(1);s.x=136;s.y=240;launch(s,0,-70);finish(s);ok(s.banks>0&&s.y>184,'solid icebox');
console.log(JSON.stringify({checks,courses:routes.length,all_three_star:true,restoration:true,collision:true,preview_exact:true}));

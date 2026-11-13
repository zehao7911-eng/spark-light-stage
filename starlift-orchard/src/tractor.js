// Adapted actual TR BEAM update physics, ABA Games, MIT. Original upstream/trbeam.js.
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function stepUfo(ufo,pressed,difficulty=1,target=null,width=0){
 ufo.angle+=Math.sqrt(difficulty)*.03;
 const auto=Math.sin(ufo.angle)*40+50;
 ufo.pos.x=target===null?auto:ufo.pos.x+(clamp(target,9,91)-ufo.pos.x)*.12;
 if(pressed)ufo.trLength=clamp(ufo.trLength+difficulty*2,0,82);else ufo.trLength*=1-clamp(Math.sqrt(difficulty),1,3)*.2;
 ufo.beamWidth=7+width;
}
export function stepBodies(balls,ufo,difficulty=1,pull=1){
 let events=[];
 for(let b of balls){
  if(b.pos.y>99){b.vel.y-=Math.sqrt(difficulty);b.vel.x*=.5;b.vel.y*=.5;}
  else if(b.pos.x<0||b.pos.x>99){b.vel.x*=.1;b.vel.y*=.1;}
  else{b.vel.x*=.9;b.vel.y*=.9;if(b.isRed)b.vel.y*=.9;}
  b.vel.y+=Math.sqrt(difficulty)*.1;b.pos.x+=b.vel.x;b.pos.y+=b.vel.y;
  // Original pair separation, preserving mass/radius response.
  for(let ab of balls){if(ab===b)continue;let dx=b.pos.x-ab.pos.x,dy=b.pos.y-ab.pos.y,dist=Math.hypot(dx,dy),d=dist-ab.radius-b.radius;if(d<0){let a=dist<1e-8?(b.id>ab.id?0:Math.PI):Math.atan2(dy,dx),force=-d/Math.sqrt(b.radius);b.vel.x+=Math.cos(a)*force;b.vel.y+=Math.sin(a)*force;}}
  const dx=ufo.pos.x-b.pos.x,dy=ufo.pos.y-b.pos.y;
  if(Math.hypot(dx,dy)<b.radius+3.2){events.push({type:b.isRed?'bump':'catch',body:b});b.dead=true;continue;}
  const inBeam=ufo.trLength>2&&b.pos.y>ufo.pos.y+2&&b.pos.y<ufo.pos.y+5+ufo.trLength+b.radius&&Math.abs(dx)<ufo.beamWidth+b.radius*.4;
  if(inBeam){let angle=Math.atan2(dy,dx),force=Math.sqrt(difficulty)/Math.sqrt(b.radius)*pull;b.vel.x+=Math.cos(angle)*force;b.vel.y+=Math.sin(angle)*force;b.vel.x+=dx*clamp(Math.sqrt(difficulty),1,5)*.01;b.isBeamed=true;}
  else if(b.isBeamed){b.vel.y*=.1;b.vel.x*=5;b.isBeamed=false;events.push({type:'fling',body:b});}
  if(b.isRed&&!b.isBeamed&&(b.pos.x<b.radius||b.pos.x>99-b.radius)){b.isRed=false;b.kind='star';events.push({type:'purify',body:b});}
  // Original upper airlock conversion: a missed falling catch becomes a burr.
  else if(!b.isRed&&!b.isBeamed&&b.pos.x>=10&&b.pos.x<=90&&b.pos.y>=12+b.radius&&b.pos.y<=17+b.radius&&b.vel.y>0){b.isRed=true;b.kind='burr';events.push({type:'spoil',body:b});}
  if(b.pos.x<-20||b.pos.x>120)b.dead=true;
 }
 return{balls:balls.filter(b=>!b.dead),events};
}

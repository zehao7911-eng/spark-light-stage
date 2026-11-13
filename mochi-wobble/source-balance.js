/* BALANCE by ABA Games, Copyright 2021 ABA Games, MIT.
 * Ported from docs/balance/main.js at cfb39d2f988feb5918eb83697145b5a35adabf58.
 * Original in upstream/balance.js. Fixed60Hz, source units retained.
 * Renderer/collision removed; source inertia, unstable pole and score/growth retained.
 */
export function stepPillar(p,target,wind,difficulty=1){
 const o=target-p.x;
 if(Math.abs(o)<99)p.vx+=o*.005;
 p.vx-=wind;p.vx*=.95;p.x+=p.vx*difficulty;
 p.angleVel-=p.vx*.002;
 p.angleVel+=p.angle*.0001*p.length;
 p.angleVel*=1-.1*Math.sqrt(difficulty);
 p.angle+=p.angleVel*difficulty;
 return {x:p.x+Math.sin(p.angle)*p.length,y:90-Math.cos(p.angle)*p.length};
}
export function stepCoin(c,wind){c.vx+=wind/2;c.x+=c.vx;c.y+=c.vy;c.vy+=.03;c.vx*=.98;c.vy*=.98;}
export function grow(p,perfect){let score=0;for(let i=0;i<(perfect?3:1);i++){score+=Math.ceil(p.length);if(p.length<64)p.length++;}return score;}
export function breakPillar(p){p.length/=2;p.angleVel*=-.5;if(p.length>=20)p.angle/=2;}

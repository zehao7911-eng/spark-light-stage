// Adapted from Chen Shmilovich's Classic-8-Ball-Pool (2019), MIT.
// Original TypeScript snapshots and exact provenance are in upstream/ and source-manifest.json.
import {Vector2} from './vector2.js';
export {Vector2};
export const R=13,BOUNDS={left:52,right:368,top:80,bottom:620};
export const POCKETS=[{x:52,y:80},{x:368,y:80},{x:44,y:350},{x:376,y:350},{x:52,y:620},{x:368,y:620}];
export class Ball{
 constructor(position,id=0){this._position=Vector2.copy(position);this._velocity=Vector2.zero;this._moving=false;this._visible=true;this.id=id;this.roll=0;this.rails=0}
 get position(){return Vector2.copy(this._position)} set position(v){this._position=v}
 get velocity(){return Vector2.copy(this._velocity)} set velocity(v){this._velocity=v;this._moving=v.length>0}
 get moving(){return this._moving} get visible(){return this._visible}
 shoot(power,angle){this._velocity=new Vector2(power*Math.cos(angle),power*Math.sin(angle));this._moving=true}
 show(position){this._position=Vector2.copy(position);this._velocity=Vector2.zero;this._visible=true;this._moving=false}
 hide(){this._velocity=Vector2.zero;this._moving=false;this._visible=false}
 update(dt){if(this._moving){this._velocity.multBy(Math.pow(1-.018,60*dt));this._position.addTo(this._velocity.mult(dt));this.roll+=this._velocity.length*dt/R;if(this._velocity.length<3){this._velocity=Vector2.zero;this._moving=false}}}
}
export function collide(first,second){
 if(!first.visible||!second.visible)return false;
 let n=first.position.subtract(second.position),dist=n.length;
 if(dist>R*2)return false;
 // Original source divides by dist. A deterministic zero-distance fallback prevents NaN.
 if(dist<1e-8){n=new Vector2(first.id<=second.id?1:-1,0);dist=1e-8}
 const un=n.mult(1/n.length),mtd=un.mult(R*2-dist);
 first.position=first.position.add(mtd.mult(.5));second.position=second.position.subtract(mtd.mult(.5));
 // Do not exchange momentum again once overlapping balls are already separating.
 if(first.velocity.subtract(second.velocity).dot(un)>=0)return false;
 const ut=new Vector2(-un.y,un.x),v1n=un.dot(first.velocity),v1t=ut.dot(first.velocity),v2n=un.dot(second.velocity),v2t=ut.dot(second.velocity);
 const v1nTag=un.mult(v2n),v1tTag=ut.mult(v1t),v2nTag=un.mult(v1n),v2tTag=ut.mult(v2t);
 first.velocity=v1nTag.add(v1tTag).mult(1-.018);second.velocity=v2nTag.add(v2tTag).mult(1-.018);return true;
}
export function cushion(ball){if(!ball.visible||!ball.moving)return false;const p=ball.position,v=ball.velocity;let x=p.x,y=p.y,vx=v.x,vy=v.y,hit=false;const mouth=Math.abs(y-350)<32;
 if((x-R<=BOUNDS.left&&!mouth)||x<38){x=BOUNDS.left+R;vx=Math.abs(vx);hit=true}else if((x+R>=BOUNDS.right&&!mouth)||x>382){x=BOUNDS.right-R;vx=-Math.abs(vx);hit=true}
 if(y-R<=BOUNDS.top){y=BOUNDS.top+R;vy=Math.abs(vy);hit=true}else if(y+R>=BOUNDS.bottom){y=BOUNDS.bottom-R;vy=-Math.abs(vy);hit=true}
 if(hit){ball.position=new Vector2(x,y);ball.velocity=new Vector2(vx,vy).mult(1-.018);ball.rails++}return hit;
}
export function pocket(position){return POCKETS.findIndex(p=>position.distFrom(p)<=26)}
// New fixed round cushions share the source normal/tangent projection principle.
export function bumper(ball,o){if(!ball.visible||!ball.moving)return false;const n=ball.position.subtract(o),d=n.length,rad=R+o.r;if(d>=rad)return false;const un=d>1e-8?n.mult(1/d):new Vector2(1,0);ball.position=new Vector2(o.x,o.y).add(un.mult(rad+.01));const v=ball.velocity,approach=v.dot(un);if(approach>=0)return false;ball.velocity=v.subtract(un.mult(2*approach)).mult(.94);ball.rails++;return true}

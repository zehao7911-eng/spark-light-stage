// MIT Matous Skala2018, adapted from actual js/Bomb.js in html5-bombergirl.
// Rendering hooks replaced by a world bridge; fuse now uses seconds, not measured FPS.
export class SourceBomb{
 constructor(world,position,strength=2,id=0,primed=false){this.world=world;this.position={...position};this.strength=strength;this.id=id;this.timer=0;this.timerMax=primed?9999:2.2;this.exploded=false;this.primed=primed;this.fires=[]}
 getDangerPositions(){
  var positions=[];positions.push(this.position);
  for(var i=0;i<4;i++){
   var dirX,dirY;
   if(i===0){dirX=1;dirY=0}else if(i===1){dirX=-1;dirY=0}else if(i===2){dirX=0;dirY=1}else{dirX=0;dirY=-1}
   for(var j=1;j<=this.strength;j++){
    var explode=true,last=false;
    var position={x:this.position.x+j*dirX,y:this.position.y+j*dirY};
    var material=this.world.getTileMaterial(position);
    if(material==='wall'){explode=false;last=true}else if(material==='wood'){explode=true;last=true}
    if(explode)positions.push(position);
    if(last)break;
   }
  }return positions;
 }
 update(dt){if(this.exploded)return;this.timer+=dt;if(this.timer>=this.timerMax)this.explode()}
 explode(){if(this.exploded)return;this.exploded=true;this.world.onBlast(this);
  var positions=this.getDangerPositions();
  for(var i=0;i<positions.length;i++){
   var position=positions[i];this.world.fire(position,this);
   var material=this.world.getTileMaterial(position);
   if(material==='wood')this.world.removeTile(position,this);
   else if(material==='grass')for(var j=0;j<this.world.bombs.length;j++){var bomb=this.world.bombs[j];if(!bomb.exploded&&bomb.position.x===position.x&&bomb.position.y===position.y)bomb.explode()}
  }
  this.world.removeBomb(this);
 }
}
// Adapted from actual Player.detectBombCollision: owner can exit a newly planted bomb.
export function detectBombCollision(bombs,position,escapeBomb){for(var i=0;i<bombs.length;i++){var bomb=bombs[i];if(!bomb.exploded&&bomb.position.x===position.x&&bomb.position.y===position.y){if(bomb.id===escapeBomb)return false;return true}}return false}
// Bot cardinal-neighbor filtering retained as an independently callable source routine.
export function possibleTargets(position,canWalk){var targets=[];for(var i=0;i<4;i++){var dx=0,dy=0;if(i===0)dx=1;else if(i===1)dx=-1;else if(i===2)dy=1;else dy=-1;var p={x:position.x+dx,y:position.y+dy};if(canWalk(p))targets.push(p)}return targets}

/* Beatrix by Cong (2014), MIT. Adapted from scripts/beat.js and
 * GameState.moveBeatAndHitDrums in scripts/main.js. Original copies in upstream/.
 * Sprite coordinates replaced with data. Fixes source's repeated y-bound check.
 */
export const DIRS=[{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}];
export class Beat {
 constructor(grid,dir,size=5){this.grid={...grid};this.vel={...DIRS[dir]};this.size=size;this.alive=true;}
 updateBeat(){
  this.grid.x+=this.vel.x;this.grid.y+=this.vel.y;
  if(this.grid.x<0||this.grid.x>=this.size||this.grid.y<0||this.grid.y>=this.size)this.alive=false;
 }
}
export function hitDrums(beat,drums){
 const hits=[];
 for(const drum of drums){
  // Source grid collision and bounce-direction replacement, renderer independent.
  if(drum.x===beat.grid.x&&drum.y===beat.grid.y){
   hits.push(drum);
   if(drum.bounceDir!==null&&drum.bounceDir!==undefined)beat.vel={...DIRS[drum.bounceDir]};
  }
 }
 return hits;
}

/* Casmo / Mathieu, Tower Defense (2014), MIT. Actual source methods adapted for a deterministic standalone simulation. See LICENSE-TOWER-DEFENSE.txt and upstream snapshots. */
export const inRange = function(posA, posB, maxDistance, returnRange) {

        if (returnRange == null) {
            returnRange = false;
        }

        // Real distance: var distance = Math.sqrt( Math.pow(posA.x - posB.x, 2) + Math.pow(posA.y - posB.y, 2) + Math.pow(posA.z - posB.z, 2) );
        var distance = Math.pow(posA.x - posB.x, 2) + Math.pow(posA.y - posB.y, 2) + Math.pow(posA.z - posB.z, 2);
        maxDistance = Math.pow(maxDistance, 2);
        if (distance <= maxDistance) {
            if (returnRange == true) {
                return distance;
            }
            return true;
        }
        return false;

    };
export class SourceTower {
 constructor(world,pad,type){this.world=world;this.pad=pad;this.type=type;this.level=1;this.object={position:{x:pad.x,y:0,z:pad.z}};this.shootingTargetIndex=-1;this.lastShot=-10000;this.recoil=0;this.angle=0;}
 update(dt){this.recoil=Math.max(0,this.recoil-dt*5);if(this.lastShot+this.stats.speed<this.world.time*1000)this.shoot();}
 shoot(){this.lastShot=this.world.time*1000;let w=this.world;
 // Retained target-index validation and reacquisition from TowerDefense.Tower.shoot.
 if(!w.objects[this.shootingTargetIndex]||w.objects[this.shootingTargetIndex].dead||!inRange(w.objects[this.shootingTargetIndex].object.position,this.object.position,this.stats.range))this.shootingTargetIndex=w.findEnemyInRage(this.object.position,this.stats.range);
 if(w.objects[this.shootingTargetIndex]){const target=w.objects[this.shootingTargetIndex];if(target.dead)return;const bullet=new SourceBullet(w,this,this.shootingTargetIndex);w.bullets.push(bullet);this.angle=Math.atan2(target.object.position.x-this.pad.x,target.object.position.z-this.pad.z);this.recoil=1;w.events.push({type:'shot',tower:this});}}
 get stats(){const b=this.world.types[this.type];return{range:b.range+(this.level-1)*.18,speed:b.interval*1000*(1-(this.level-1)*.09),damage:b.damage*Math.pow(1.6,this.level-1)};}
}
export class SourceBullet {
 constructor(world,tower,targetIndex){this.world=world;this.type=tower.type;this.level=tower.level;this.damage=tower.stats.damage;this.targetIndex=targetIndex;this.object={position:{...tower.object.position}};this.start={...this.object.position};this.lastMovement={x:0,y:0,z:0};this.life=3;this.dead=false;this.travel=0;this.distance=Math.hypot(world.objects[targetIndex].object.position.x-this.start.x,world.objects[targetIndex].object.position.z-this.start.z);}
 update(dt){if(this.dead)return;this.life-=dt;if(this.life<=0){this.dead=true;return}let target=this.world.objects[this.targetIndex];if(!target||target.dead){this.dead=true;return;}
 if(inRange(target.object.position,this.object.position,.18,false)){this.world.impact(this,target);this.dead=true;return;}
 // Actual L1 homing movement calculation from TowerDefense.Bullet.update, converted from frame units to elapsed seconds.
 var moveXOrg=this.object.position.x-target.object.position.x,moveYOrg=this.object.position.y-target.object.position.y,moveZOrg=this.object.position.z-target.object.position.z;
 var moveX=Math.abs(moveXOrg),moveY=Math.abs(moveYOrg),moveZ=Math.abs(moveZOrg);var one=100/(moveX+moveY+moveZ),speed=Math.min(this.type===2?4.8:7.5,(moveX+moveY+moveZ)/dt)*dt/100;
 moveX=one*moveXOrg*speed;moveY=one*moveYOrg*speed;moveZ=one*moveZOrg*speed;this.lastMovement={x:moveX,y:moveY,z:moveZ};this.object.position.x-=moveX;this.object.position.y-=moveY;this.object.position.z-=moveZ;this.travel+=Math.hypot(moveX,moveZ);}
}
export class SourceEnemy {
 constructor(world,id,kind,hp,speed){this.world=world;this.id=id;this.kind=kind;this.object={position:{x:world.path[0].x,y:0,z:world.path[0].z}};this.stats={hp,resources:kind===3?35:kind===2?13:kind===1?8:7,score:kind===3?500:50,speed};this.maxHp=hp;this.progress=0;this.dead=false;this.slow=0;this.hit=0;}
 removeHealth(health){if(this.dead)return;this.stats.hp-=health;this.hit=.18;if(this.stats.hp<=0){this.world.stats.score+=this.stats.score;this.world.stats.resources+=this.stats.resources;this.dead=true;this.world.kills++;this.world.bell=Math.min(1,this.world.bell+.12);this.world.events.push({type:'kill',enemy:this});}}
 update(dt){if(this.dead)return;this.hit=Math.max(0,this.hit-dt);this.slow=Math.max(0,this.slow-dt);this.progress+=this.stats.speed*dt*(this.slow>0?.48:1);if(this.progress>=this.world.length){this.dead=true;this.world.hearts-=this.kind===3?3:1;this.world.events.push({type:'leak',enemy:this});return;}const p=this.world.sample(this.progress);this.object.position.x=p.x;this.object.position.z=p.z;this.angle=p.angle;}
}

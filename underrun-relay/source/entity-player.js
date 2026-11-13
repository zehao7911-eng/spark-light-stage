/* New mobile control/aim logic built on UNDERRUN's original player entity. */
class entity_player_t extends entity_t {
 _init(){this._bob=this._last_shot=this._frame=0;this._last_damage=1;this.h=relay.maxHealth();this._angle=-Math.PI/2;}
 _update(){if(relay.state!=='play')return;let t=this,move=relay.move(),speed=relay.dashTime>0?450:135;t.ax=move.x*speed;t.az=move.z*speed;
 let target=relay.findEnemy(t),angle=t._angle;if(target){angle=Math.atan2(target.z-t.z,target.x-t.x);}else if(Math.abs(move.x)+Math.abs(move.z)>.1)angle=Math.atan2(move.z,move.x);t._angle=angle;t.s=18+((angle/Math.PI*4+10.5)%8)|0;t._bob+=time_elapsed*1.75*(Math.abs(t.vx)+Math.abs(t.vz));t.y=Math.sin(t._bob)*.25;t._last_damage-=time_elapsed;t._last_shot-=time_elapsed;
 if(target&&t._last_shot<=0){audio_play(audio_sfx_shoot);new entity_plasma_t(t.x,0,t.z,0,26,angle);if(relay.perks.includes(0))new entity_plasma_t(t.x,0,t.z,0,26,angle+.12);t._last_shot=relay.perks.includes(1)?.15:.13;relay.muzzle=.065;}
 super._update();}
 _render(){this._frame++;if(this._last_damage<=0||this._frame%6<4)super._render();push_light(this.x,4,this.z+6,1,.55,.2,.04);if(relay.muzzle>0)push_light(this.x+Math.cos(this._angle)*6,6,this.z+Math.sin(this._angle)*6,1.8,.7,.2,.013);}
 _receive_damage(from,amount){if(this._dead||this._last_damage>0||relay.dashTime>0)return;audio_play(audio_sfx_hurt);this.h-=amount;this._last_damage=1.4;relay.hurtFlash=.4;camera_shake=2;relay.stats.hits++;if(navigator.vibrate)navigator.vibrate(30);if(this.h<=0)this._kill();}
 _kill(){if(this._dead)return;super._kill();relay.failRun();}
}

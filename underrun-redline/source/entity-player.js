/* Modified UNDERRUN player, MIT Dominic Szablewski 2018. Analog movement, assisted aim, Redline damage and dash. */
class entity_player_t extends entity_t{
 _init(){this._bob=this._last_shot=0;this._last_damage=1.5;this._angle=-Math.PI/2;this.h=6;}
 _update(){var t=this,m=breach.move(),dash=breach.dashTime>0,speed=dash?620:180;t.ax=m.x*speed;t.az=m.z*speed;var target=breach.target(t);if(target)t._angle=Math.atan2(target.z-t.z,target.x-t.x);else if(Math.hypot(m.x,m.z)>.1)t._angle=Math.atan2(m.z,m.x);t.s=18+(((t._angle/Math.PI*4+10.5)%8)|0);t._bob+=time_elapsed*1.75*(Math.abs(t.vx)+Math.abs(t.vz));t.y=Math.sin(t._bob)*.25;t._last_damage-=time_elapsed;t._last_shot-=time_elapsed;
 if(target&&t._last_shot<=0){let spread=breach.upgrades[0],count=spread?3:1;for(let i=0;i<count;i++)new entity_plasma_t(t.x,0,t.z,0,26,t._angle+(i-(count-1)/2)*.13);t._last_shot=Math.max(.075,.16-breach.upgrades[1]*.02);breach.muzzle=.055;audio_play('shoot');}super._update();}
 _render(){if(breach.hurt<=0||Math.floor(breach.clock*16)%2===0)super._render();push_light(this.x,5,this.z+4,.6,.95,1.2,.045);}
 _receive_damage(from,amount){if(this._dead||breach.done>=breach.total||this._last_damage>0||breach.dashTime>0)return;super._receive_damage(from,amount);this._last_damage=1.4;breach.hits++;breach.combo=0;breach.hurt=.45;camera_shake=2;breach.float('ARMOR −1',this.x,this.z,'#ff8377');audio_play('hurt');}
 _kill(){if(this._dead)return;super._kill();breach.lose();}
}

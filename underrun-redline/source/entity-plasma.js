/* UNDERRUN projectile, MIT. Redline: bounded lifetime, impact callback and power upgrades. */
class entity_plasma_t extends entity_t{
 _init(angle){this.vx=Math.cos(angle)*180;this.vz=Math.sin(angle)*180;this._life=.9;}
 _update(){this._life-=time_elapsed;if(this._life<=0)this._kill();super._update();}
 _render(){super._render();push_light(this.x,4,this.z+6,1.3,.65,.2,.06);}
 _did_collide(){this._kill();}
 _check(other){if(this._dead||other._dead)return;if(other instanceof entity_spider_t||other instanceof entity_sentry_t){other._receive_damage(this,1+breach.upgrades[2]);breach.impact(other);this._kill();}}
}

/* UNDERRUN terminal geometry/rendering retained; new proximity upload/checkpoint rules. */
class entity_cpu_t extends entity_t {
 _init(){this._animation_time=0;this.charge=0;this.active=true;}
 _update(){if(!this.active||this.h!==5||relay.state!=='play')return;let d=Math.hypot(this.x-entity_player.x,this.z-entity_player.z);this.charge=Math.max(0,Math.min(1,this.charge+time_elapsed*(d<14?1.15:-.8)));if(this.charge>=1){this.h=10;cpus_rebooted++;relay.repair(this);}}
 _render(){this._animation_time+=time_elapsed;push_block(this.x,this.z,4,17);let intensity=this.h===5?.035+Math.sin(this._animation_time*5)*.004:.045;push_light(this.x+4,5,this.z+10,this.h===5?.15:.15,this.h===5?.65:.7,this.h===5?1:.5,intensity);}
}

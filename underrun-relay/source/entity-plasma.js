
class entity_plasma_t extends entity_t {
	_init(angle) {
		this._life=1.35;var speed = 150;
		this.vx = _math.cos(angle) * speed;
		this.vz = _math.sin(angle) * speed;
	}

    _update(){this._life-=time_elapsed;if(this._life<=0)this._kill();super._update();}
	_render() {
		super._render();
		push_light(this.x, 4, this.z + 6, 0.9, 0.2, 0.1, 0.04);
	}

	_did_collide() {
		this._kill();
	}

	_check(other) {
		if(this._dead||other._dead)return;
		if (other instanceof(entity_spider_t) || other instanceof(entity_sentry_t)) {
			audio_play(audio_sfx_hit);
			other._receive_damage(this,relay.perks.includes(1)?2:1);relay.onHit(other);
			this._kill();
		}
	}
}

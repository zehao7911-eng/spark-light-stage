
class entity_health_t extends entity_t {
	_check(other) {
		if (other instanceof(entity_player_t) && other.h < relay.maxHealth()) {
			this._kill();
			other.h = Math.min(relay.maxHealth(),other.h+1);
			audio_play(audio_sfx_pickup);
		}
	}
}

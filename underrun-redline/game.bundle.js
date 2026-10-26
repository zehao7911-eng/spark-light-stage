/* UNDERRUN REDLINE. Engine and original art (c) Dominic Szablewski 2018, MIT. See LICENSE-UNDERRUN.md. */

/* FILE: source/game.js */
/* UNDERRUN (c) 2018 Dominic Szablewski, MIT. Redline: original map decoding and world construction adapted for compact arenas. */
var udef,_math=Math,_document=document,_temp,keys={37:0,38:0,39:0,40:0},key_up=38,key_down=40,key_left=37,key_right=39,time_elapsed=1/60,time_last=0,level_width=64,level_height=64,level_data=new Uint8Array(4096),current_level=1,entity_player,entities=[],entities_to_kill=[];
function load_image(name,callback){var im=new Image(),timeout=setTimeout(()=>breach.error('Asset loading timed out.'),12000);im.onload=function(){clearTimeout(timeout);callback.call(im)};im.onerror=function(){clearTimeout(timeout);breach.error('An arena asset could not load.')};im.src='m/'+name+'.png';}
function load_level(id,callback){random_seed(0xBADC0DE1+id);load_image('l'+id,function(){entities=[];entities_to_kill=[];level_data.fill(8);num_verts=num_lights=0;var cv=_document.createElement('canvas');cv.width=cv.height=64;var ct=cv.getContext('2d');ct.drawImage(this,0,0);var data=ct.getImageData(0,0,64,64).data;
 for(var y=0,index=0;y<64;y++)for(var x=0;x<64;x++,index++){var key=((data[index*4]>>4)<<8)+((data[index*4+1]>>4)<<4)+(data[index*4+2]>>4);if(!key)continue;var tile=level_data[index]=key===0x888?(random_int(0,5)<4?8:random_int(8,17)):array_rand([1,1,1,1,3,2,5,5,5,7,6]);if(tile>7)push_block(x*8,y*8,4,tile-1);else push_floor(x*8,y*8,tile-1);if(key===0x0f0)entity_player=new entity_player_t(x*8,0,y*8,5,18);}
 level_num_verts=num_verts;camera_x=-entity_player.x;camera_y=0;camera_z=-entity_player.z;camera_shake=0;callback&&callback();});}

;

/* FILE: source/random.js */
var rand_high, rand_low;

function random_int(min, max) {
	rand_high = ((rand_high << 16) + (rand_high >> 16) + rand_low) & 0xffffffff;
	rand_low = (rand_low + rand_high) & 0xffffffff;
	var n = (rand_high >>> 0) / 0xffffffff;
	return (min + n * (max-min+1))|0;
}

function random_seed(seed) {
	rand_high = seed || 0xBADC0FFE;
	rand_low = seed ^ 0x49616E42;
}

function array_rand(array) {
	return array[random_int(0, array.length-1)];
}


;

/* FILE: source/renderer.js */
/* UNDERRUN MIT renderer, adapted responsive projection and bounded buffers. */
var
	gl = c.getContext('webgl') || c.getContext('experimental-webgl'),
	vertex_buffer,
	shader_program,

	texture_size = 1024,
	tile_size = 16,
	tile_fraction = tile_size / texture_size,
	px_nudge = 0.5 / texture_size,
	
	max_verts = 1024 * 64,
	num_verts = 0,
	level_num_verts,
	buffer_data = new Float32Array(max_verts*8), // allow 64k verts, 8 properties per vert

	light_uniform,
	max_lights = 12,
	num_lights = 0,
	light_data = new Float32Array(max_lights*7), // 32 lights, 7 properties per light


	camera_x = 0, camera_y = 0, camera_z = 0, camera_shake = 0,
	camera_uniform, projection_uniform, palette_uniform,	

	shader_attribute_vec = 'attribute vec',
	shader_varying = 
		'precision highp float;' +
		'varying vec3 vl;' +
		'varying vec2 vuv;',
	shader_uniform = 'uniform ',
	shader_const_mat4 = "const mat4 ",

	vertex_shader = 
		shader_varying + 
		shader_attribute_vec + "3 p;" +
		shader_attribute_vec + "2 uv;" +
		shader_attribute_vec + "3 n;" +
		shader_uniform + "vec3 cam;" + shader_uniform + "vec2 projection;" +
		shader_uniform + "float l[7*"+max_lights+"];" +
		shader_const_mat4 + "v=mat4(1,0,0,0,0,.707,.707,0,0,-.707,.707,0,0,-22.627,-22.627,1);" + // view
		shader_const_mat4 + "r=mat4(.977,0,0,0,0,1.303,0,0,0,0,-1,-1,0,0,-2,0);"+ // projection
		"void main(void){" +
			"vl=vec3(0.48,0.50,0.60);" + // ambient color
			"for(int i=0; i<"+max_lights+"; i++) {"+
				"vec3 lp=vec3(l[i*7],l[i*7+1],l[i*7+2]);" + // light position
				"vl+=vec3(l[i*7+3],l[i*7+4],l[i*7+5])" + // light color *
					"*max(dot(n,normalize(lp-p)),0.)" + // diffuse *
					"*(1./(l[i*7+6]*(" + // attentuation *
						"length(lp-p)" + // distance
					")));" + 
			"}" +
			"vuv=uv;" +
			"gl_Position=r*v*(vec4(p+cam,1.));gl_Position.x*=projection.x;gl_Position.y*=projection.y;" +
		"}",

	fragment_shader =
		shader_varying + 
		shader_uniform + "sampler2D s;" + shader_uniform + "vec3 tint;" +
		"void main(void){" +
			"vec4 t=texture2D(s,vuv);" +
			"if(t.a<.8)" + // 1) discard alpha
				"discard;" + 
			"if(t.r>0.95&&t.g>0.25&&t.b==0.0)" + // 2) red glowing spider eyes
				"gl_FragColor=t;" +
			"else{" +  // 3) calculate color with lights and fog
				"gl_FragColor=t*vec4(vl*tint,1.);" +
				"gl_FragColor.rgb*=smoothstep(" +
					"150.,20.," + // fog far, near
					"gl_FragCoord.z/gl_FragCoord.w" + // fog depth
				");" +
			"}" +
			"gl_FragColor.rgb=floor(gl_FragColor.rgb*12.35)/12.35;" + // reduce colors to ~256
		"}";


function renderer_init() {

	vertex_buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, buffer_data, gl.DYNAMIC_DRAW);

	shader_program = gl.createProgram();
	gl.attachShader(shader_program, compile_shader(gl.VERTEX_SHADER, vertex_shader));
	gl.attachShader(shader_program, compile_shader(gl.FRAGMENT_SHADER, fragment_shader));
	gl.linkProgram(shader_program);
	gl.useProgram(shader_program);if(!gl.getProgramParameter(shader_program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(shader_program));

	palette_uniform=gl.getUniformLocation(shader_program,"tint");
	camera_uniform = gl.getUniformLocation(shader_program, "cam");
    projection_uniform=gl.getUniformLocation(shader_program,"projection");
	light_uniform = gl.getUniformLocation(shader_program, "l");

	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	gl.viewport(0,0,c.width,c.height);

	enable_vertex_attrib('p', 3, 8, 0);
	enable_vertex_attrib('uv', 2, 8, 3);
	enable_vertex_attrib('n', 3, 8, 5);
}

function renderer_bind_image(image) {
	var texture_2d = gl.TEXTURE_2D;
	gl.bindTexture(texture_2d, gl.createTexture());
	gl.texImage2D(texture_2d, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.texParameteri(texture_2d, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(texture_2d, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(texture_2d, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(texture_2d, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}

function renderer_prepare_frame() {
	num_verts = level_num_verts;
	num_lights = 0;

	// reset all lights
	light_data.fill(1);
}

function renderer_end_frame() {
	var palette=[[1.05,.95,.9],[.77,1.08,1.2],[1.15,.82,1.05]][(current_level||1)-1];gl.uniform3fv(palette_uniform,palette);
	var aspect=c.width/c.height,vertical=Math.min(1.303,1.6*aspect);gl.uniform2f(projection_uniform,(vertical/aspect)/.977,vertical/1.303);
	gl.uniform3f(camera_uniform, camera_x, camera_y - 10, camera_z-30);
	gl.uniform1fv(light_uniform, light_data);

	gl.clearColor(0,0,0,1);
	gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

	gl.bufferSubData(gl.ARRAY_BUFFER,0,buffer_data.subarray(0,num_verts*8));
	gl.drawArrays(gl.TRIANGLES, 0, num_verts);
};

function push_quad(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, nx, ny, nz, tile) {
	if(num_verts+6>max_verts)return;
	var u = tile * tile_fraction + px_nudge;
	buffer_data.set([
		x1, y1, z1, u, 0, nx, ny, nz,
		x2, y2, z2, u + tile_fraction - px_nudge, 0, nx, ny, nz,
		x3, y3, z3, u, 1, nx, ny, nz,
		x2, y2, z2, u + tile_fraction - px_nudge, 0, nx, ny, nz,
		x3, y3, z3, u, 1, nx, ny, nz,
		x4, y4, z4, u + tile_fraction - px_nudge, 1, nx, ny, nz
	], num_verts * 8);
	num_verts += 6;
};

function push_sprite(x, y, z, tile) {
	// Only push sprites near to the camera
	if (
		_math.abs(-x - camera_x) < 128 && 
		_math.abs(-z - camera_z) < 128
	) {
		var tilt = 3+(camera_z + z)/12; // tilt sprite when closer to camera
		push_quad(x, y + 6, z, x + 6, y + 6, z, x, y, z + tilt, x + 6, y, z + tilt, 0, 0, 1, tile);
	}
}

function push_floor(x, z, tile) {
	push_quad(x, 0, z, x + 8, 0, z, x, 0, z + 8, x + 8, 0, z + 8, 0,1,0, tile);
};

function push_block(x, z, tile_top, tile_sites) {
	// tall blocks for certain tiles
	var y = ~[8, 9, 17].indexOf(tile_sites) ? 16 : 8;

	push_quad(x, y, z, x + 8, y, z, x, y, z + 8, x + 8, y, z + 8, 0, 1, 0, tile_top); // top
	push_quad(x + 8, y, z, x + 8, y, z + 8, x + 8, 0, z, x + 8, 0, z + 8, 1, 0, 0, tile_sites); // right
	push_quad(x, y, z + 8, x + 8, y, z + 8, x, 0, z + 8, x + 8, 0, z + 8, 0, 0, 1, tile_sites); // front
	push_quad(x, y, z, x, y, z + 8, x, 0, z, x, 0, z + 8, -1, 0, 0, tile_sites); // left
};

function push_light(x, y, z, r, g, b, falloff) {
	// Only push lights near to the camera
	var max_light_distance = (128 + 1/falloff); // cheap ass approximation
	if (
		num_lights < max_lights &&
		_math.abs(-x - camera_x) < max_light_distance &&
		_math.abs(-z - camera_z) < max_light_distance
	) {
		light_data.set([x, y, z, r, g, b, falloff], num_lights*7);
		num_lights++;
	}
}

function compile_shader(shader_type, shader_source) {
	var shader = gl.createShader(shader_type);
	gl.shaderSource(shader, shader_source);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));
	return shader;
};

function enable_vertex_attrib(attrib_name, count, vertex_size, offset) {
	var location = gl.getAttribLocation(shader_program, attrib_name);
	gl.enableVertexAttribArray(location);
	gl.vertexAttribPointer(location, count, gl.FLOAT, false, vertex_size * 4, offset * 4);
};

;

/* FILE: source/entity.js */

class entity_t {
	constructor(x, y, z, friction, sprite, init_param) {
		var t = this;
		t.x = x; t.y = y; t.z = z;
		t.vx = t.vy = t.vz = t.ax = t.ay = t.az = 0;
		t.f = friction;
		t.s = sprite;
		t.h = 5;

		t._init(init_param);
		entities.push(t);
	}

	// separate _init() method, because "constructor" cannot be uglyfied
	_init(init_param) {}

	_update() {
		var t = this,
			last_x = t.x, last_z = t.z;

		// velocity
		t.vx += t.ax * time_elapsed - t.vx * _math.min(t.f * time_elapsed, 1);
		t.vy += t.ay * time_elapsed - t.vy * _math.min(t.f * time_elapsed, 1);
		t.vz += t.az * time_elapsed - t.vz * _math.min(t.f * time_elapsed, 1);
		
		// position
		t.x += t.vx * time_elapsed;
		t.y += t.vy * time_elapsed;
		t.z += t.vz * time_elapsed;

		// check wall collissions, horizontal
		if (t._collides(t.x, last_z)) {
			t._did_collide(t.x, t.y);
			t.x = last_x;
			t.vx = 0;
		}

		// check wall collissions, vertical
		if (t._collides(t.x, t.z)) {
			t._did_collide(t.x, t.y);
			t.z = last_z;
			t.vz = 0;
		}
	}

	_collides(x, z) {
		if(x<8||z<8||x>500||z>500)return true;
		return level_data[(x >> 3) + (z >> 3) * level_width] > 7 || // top left
			level_data[((x + 6) >> 3) + (z >> 3) * level_width] > 7 || // top right
			level_data[((x + 6) >> 3) + ((z+4) >> 3) * level_width] > 7 || // bottom right
			level_data[(x >> 3) + ((z+4) >> 3) * level_width] > 7; // bottom left
	}

	_spawn_particles(amount) {
		for (var i = 0; i < amount && entities.length<200; i++) {
			var particle = new entity_particle_t(this.x, 0, this.z, 1, 30);
			particle.vx = (_math.random() - 0.5) * 128;
			particle.vy = _math.random() * 96;
			particle.vz = (_math.random() - 0.5) * 128;
		}
	}

	// collision against static walls
	_did_collide() {} 

	// collision against other entities
	_check(other) {}

	_receive_damage(from, amount) {
		if(this._dead)return;
		this.h -= amount;
		if (this.h <= 0) {
			this._kill();
		}
	}

	_kill() {
		if (!this._dead) {
			this._dead = true;
			entities_to_kill.push(this);
		}
	}

	_render() { // render
		var t = this;
		push_sprite(t.x-1, t.y, t.z, t.s);
	}
}

;

/* FILE: source/entity-player.js */
/* Modified UNDERRUN player, MIT Dominic Szablewski 2018. Analog movement, assisted aim, Redline damage and dash. */
class entity_player_t extends entity_t{
 _init(){this._bob=this._last_shot=0;this._last_damage=1.5;this._angle=-Math.PI/2;this.h=6;}
 _update(){var t=this,m=breach.move(),dash=breach.dashTime>0,speed=dash?620:180;t.ax=m.x*speed;t.az=m.z*speed;var target=breach.target(t);if(target)t._angle=Math.atan2(target.z-t.z,target.x-t.x);else if(Math.hypot(m.x,m.z)>.1)t._angle=Math.atan2(m.z,m.x);t.s=18+(((t._angle/Math.PI*4+10.5)%8)|0);t._bob+=time_elapsed*1.75*(Math.abs(t.vx)+Math.abs(t.vz));t.y=Math.sin(t._bob)*.25;t._last_damage-=time_elapsed;t._last_shot-=time_elapsed;
 if(target&&t._last_shot<=0){let spread=breach.upgrades[0],count=spread?3:1;for(let i=0;i<count;i++)new entity_plasma_t(t.x,0,t.z,0,26,t._angle+(i-(count-1)/2)*.13);t._last_shot=Math.max(.075,.16-breach.upgrades[1]*.02);breach.muzzle=.055;audio_play('shoot');}super._update();}
 _render(){if(breach.hurt<=0||Math.floor(breach.clock*16)%2===0)super._render();push_light(this.x,5,this.z+4,.6,.95,1.2,.045);}
 _receive_damage(from,amount){if(this._dead||breach.done>=breach.total||this._last_damage>0||breach.dashTime>0)return;super._receive_damage(from,amount);this._last_damage=1.4;breach.hits++;breach.combo=0;breach.hurt=.45;camera_shake=2;breach.float('ARMOR −1',this.x,this.z,'#ff8377');audio_play('hurt');}
 _kill(){if(this._dead)return;super._kill();breach.lose();}
}

;

/* FILE: source/entity-plasma.js */
/* UNDERRUN projectile, MIT. Redline: bounded lifetime, impact callback and power upgrades. */
class entity_plasma_t extends entity_t{
 _init(angle){this.vx=Math.cos(angle)*180;this.vz=Math.sin(angle)*180;this._life=.9;}
 _update(){this._life-=time_elapsed;if(this._life<=0)this._kill();super._update();}
 _render(){super._render();push_light(this.x,4,this.z+6,1.3,.65,.2,.06);}
 _did_collide(){this._kill();}
 _check(other){if(this._dead||other._dead)return;if(other instanceof entity_spider_t||other instanceof entity_sentry_t){other._receive_damage(this,1+breach.upgrades[2]);breach.impact(other);this._kill();}}
}

;

/* FILE: source/entity-spider.js */

class entity_spider_t extends entity_t {
	_init() {
		this._animation_time = 0;
		this._select_target_counter = 0;
		this._target_x = this.x;
		this._target_z = this.z;
	}
	
	_update() {
		var t = this,
			txd = t.x - t._target_x,
			tzd = t.z - t._target_z,
			xd = t.x - entity_player.x,
			zd = t.z - entity_player.z,
			dist = _math.sqrt(xd * xd + zd * zd);

		t._select_target_counter -= time_elapsed;

		// select new target after a while
		if (t._select_target_counter < 0 && dist < 200) {
			t._select_target_counter = _math.random() * 0.5 + 0.3;
			t._target_x = entity_player.x;
			t._target_z = entity_player.z;
		}
		
		var next=breach.steer(this);if(next){txd=this.x-next.x;tzd=this.z-next.z;}
		// set velocity towards target
		t.ax = _math.abs(txd) > 2 ? (txd > 0 ? -160 : 160) : 0;
		t.az = _math.abs(tzd) > 2 ? (tzd > 0 ? -160 : 160) : 0;

		super._update();
		this._animation_time += time_elapsed;
		this.s = 27 + ((this._animation_time*15)|0)%3;
	}

	_receive_damage(from, amount) {
		super._receive_damage(from, amount);
		this.vx = (from.vx||0)*.38;
		this.vz = (from.vz||0)*.38;
		this._spawn_particles(5);
	}

	_check(other) {
		// slightly bounce off from other spiders to separate them
		if (other instanceof entity_spider_t) {
			var 
				axis = (_math.abs(other.x - this.x) > _math.abs(other.z - this.z)
					? 'x' 
					: 'z'),
				amount = this[axis] > other[axis] ? 0.6 : -0.6;

			this['v'+axis] += amount;
			other['v'+axis] -= amount;
		}

		// hurt player
		else if (other instanceof entity_player_t) {
			this.vx *= -1.5;
			this.vz *= -1.5;
			other._receive_damage(this, 1);
		}
	}

	_kill() {
        if(this._dead)return;
		super._kill();
        breach.killed(this);
		new entity_explosion_t(this.x, 0, this.z, 0, 26);
		camera_shake = 1;
		audio_play(audio_sfx_explode);
	}
}

;

/* FILE: source/entity-sentry.js */

class entity_sentry_t extends entity_t {
	_init() {
		this._select_target_counter = 0;
		this._target_x = this.x;
		this._target_z = this.z;
		this.h = 9;
	}
	
	_update() {
		var t = this,
			txd = t.x - t._target_x,
			tzd = t.z - t._target_z,
			xd = t.x - entity_player.x,
			zd = t.z - entity_player.z,
			dist = _math.sqrt(xd * xd + zd * zd);

		t._select_target_counter -= time_elapsed;

		// select new target after a while
		if (t._select_target_counter < 0) {
			if (dist < 200) {
				t._select_target_counter = _math.random() * 0.5 + 0.3;
				t._target_x = entity_player.x;
				t._target_z = entity_player.z;
			}
			if (dist < 48) {
				var angle = _math.atan2(
					entity_player.z - this.z,
					entity_player.x - this.x
				);
				new entity_sentry_plasma_t(t.x, 0, t.z, 0, 26, angle + _math.random() * 0.2 - 0.11);
			}
		}
		
		var next=breach.steer(this);if(next){txd=this.x-next.x;tzd=this.z-next.z;}
		// set velocity towards target
		if (dist > 24) {
			t.ax = _math.abs(txd) > 2 ? (txd > 0 ? -48 : 48) : 0;
			t.az = _math.abs(tzd) > 2 ? (tzd > 0 ? -48 : 48) : 0;
		} else {
			t.ax = t.az = 0;
		}

		super._update();
	}

	_receive_damage(from, amount) {
		super._receive_damage(from, amount);
		this.vx = from.vx * 0.1;
		this.vz = from.vz * 0.1;
		this._spawn_particles(3);
	}

	_kill() {
        if(this._dead)return;
		super._kill();
        breach.killed(this);
		new entity_explosion_t(this.x, 0, this.z, 0, 26);
		camera_shake = 3;
		audio_play(audio_sfx_explode);
	}
}

class entity_sentry_plasma_t extends entity_t {
 _update(){this._life-=time_elapsed;if(this._life<=0)this._kill();super._update();}
	_init(angle) {
		this._life=2.5;var speed = 42;
		this.vx = _math.cos(angle) * speed;
		this.vz = _math.sin(angle) * speed;
	}

	_render() {
		super._render();
		push_light(this.x, 4, this.z + 6, 1.5, 0.2, 0.1, 0.04);
	}

	_did_collide() {
		this._kill();
	}

	_check(other) {
		if (!this._dead && other instanceof(entity_player_t)) {
			other._receive_damage(this, 1);
			this._kill();
		}
	}
}

;

/* FILE: source/entity-particle.js */

class entity_particle_t extends entity_t {
	_init() {
		this._lifetime = 3;
	}

	_update() {
		this.ay = -320;

		if (this.y < 0) {
			this.y = 0;
			this.vy = -this.vy * 0.96;
		}
		super._update();
		this._lifetime -= time_elapsed;
		if (this._lifetime < 0) {
			this._kill();
		}
	}
}

;

/* FILE: source/entity-explosion.js */

class entity_explosion_t extends entity_t {
	_init() {
		this._lifetime = 1;
	}

	_update() {
		super._update();
		this._lifetime -= time_elapsed;
		if (this._lifetime < 0) {
			this._kill();
		}
	}

	_render() {
		push_light(this.x, 4, this.z + 6, 1,0.7,0.3, Math.max(.012,0.08*(1-this._lifetime)));
	}
}

;

/* FILE: redline.js */
/* REDLINE adaptation of UNDERRUN. Original engine/art/AI: Dominic Szablewski, MIT. New wave loop, mobile controller, UI and audio. */
const $=s=>document.querySelector(s),fx=$('#fx'),fg=fx.getContext('2d'),sectorNames=['THE FOUNDRY','CRYO VAULT','REACTOR NINE'];
let profile={best:0,cleared:0,sound:false,run:null};try{const p=JSON.parse(localStorage.getItem('underrun-redline-v1'));if(p&&Number.isSafeInteger(p.best)&&p.best>=0&&p.best<1e10&&Number.isInteger(p.cleared)&&p.cleared>=0&&p.cleared<10000)profile={...profile,best:p.best,cleared:p.cleared,sound:p.sound===true,run:p.run};}catch{}
let ac=null,voices=new Set(),lastTone=0;function wake(){if(!ac){try{ac=new(window.AudioContext||window.webkitAudioContext)()}catch{}}if(ac&&breach.sound&&!document.hidden)ac.resume().catch(()=>{});}
function silence(){for(const v of voices){try{v.stop()}catch{}}voices.clear();ac?.suspend().catch(()=>{});}
function audio_play(kind){if(!ac||!breach.sound||document.hidden||breach.state!=='play'||voices.size>16)return;const t=ac.currentTime;if(kind==='shoot'&&t-lastTone<.075)return;if(kind==='shoot')lastTone=t;const f={shoot:450,hit:240,explode:100,hurt:180,dash:650,nova:70,clear:660}[kind]||320;const o=ac.createOscillator(),g=ac.createGain();o.type=['shoot','nova','hurt'].includes(kind)?'sawtooth':'triangle';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(kind==='clear'?980:Math.max(35,f*.25),t+.18);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(kind==='shoot'?.025:kind==='nova'?.11:.065,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+(kind==='nova'?.5:.23));o.connect(g).connect(ac.destination);voices.add(o);o.onended=()=>voices.delete(o);o.start(t);o.stop(t+.55);}
var audio_sfx_explode='explode',audio_sfx_hit='hit';
const perks=[{n:'FORK SHOT',d:'Three bolts. A wider sweep.',s:'⋔',max:1},{n:'RAPID COIL',d:'Fire faster. Less time between hits.',s:'ϟ',max:4},{n:'HEAVY IMPACT',d:'Each bolt hits harder.',s:'✦',max:3},{n:'EXTRA ARMOR',d:'Two more armor cells.',s:'▰',max:3},{n:'HOTTER OVERDRIVE',d:'Larger, stronger automatic blasts.',s:'◎',max:3}];
function enemy(e){return e instanceof entity_spider_t||e instanceof entity_sentry_t;}
function lineClear(x,z,tx,tz){const steps=Math.ceil(Math.hypot(tx-x,tz-z)/2);for(let i=1;i<steps;i++){let gx=Math.floor((x+(tx-x)*i/steps+3)/8),gz=Math.floor((z+(tz-z)*i/steps+2)/8);if(level_data[gz*64+gx]>7)return false;}return true;}
var breach={state:'loading',ready:false,sound:profile.sound,wave:1,score:0,kills:0,hits:0,upgrades:[0,0,0,0,0],clock:0,waveTime:0,started:false,total:6,spawned:0,done:0,combo:0,comboTimer:0,charge:0,novaPending:false,novaLock:0,spawnTimer:0,spawnQueue:[],joy:{x:0,z:0},lastMove:{x:0,z:-1},dashVector:{x:0,z:-1},dashTime:0,dashCooldown:0,hurt:0,muzzle:0,hitstop:0,clearDelay:0,sparks:[],floats:[],rings:[],shoutUntil:0,redraw:true,checkpoint:null,flow:null,flowAt:0,peak:0,
 maxHealth(){return 6+2*this.upgrades[3]},
 move(){let x=this.joy.x+(keys[39]?1:0)-(keys[37]?1:0),z=this.joy.z+(keys[40]?1:0)-(keys[38]?1:0),d=Math.hypot(x,z);if(d>1){x/=d;z/=d}if(d>.1)this.lastMove={x:x/(Math.hypot(x,z)||1),z:z/(Math.hypot(x,z)||1)};return this.dashTime>0?this.dashVector:{x,z}},
 target(p){let found=null,best=90*90;for(const e of entities){if(!e._dead&&enemy(e)){let d=(e.x-p.x)**2+(e.z-p.z)**2;const q=project(e.x+3,4,e.z);if(d<best&&q.x>15&&q.x<innerWidth-15&&q.y>Math.max(innerHeight*.21,150)&&q.y<innerHeight*.84&&lineClear(p.x,p.z,e.x,e.z)){best=d;found=e}}}return found;},
 buildFlow(){const x=Math.floor((entity_player.x+3)/8),z=Math.floor((entity_player.z+2)/8),dist=new Int16Array(4096);dist.fill(-1);let q=[z*64+x];dist[q[0]]=0;for(let i=0;i<q.length;i++){let at=q[i],ax=at%64,az=at>>6;for(const [dx,dz] of [[0,-1],[1,0],[0,1],[-1,0]]){let nx=ax+dx,nz=az+dz,n=nz*64+nx;if(nx<1||nx>62||nz<1||nz>62||dist[n]>=0||level_data[n]>7)continue;dist[n]=dist[at]+1;q.push(n)}}this.flow=dist;},
 steer(e){if(lineClear(e.x,e.z,entity_player.x,entity_player.z))return entity_player;const x=Math.floor((e.x+3)/8),z=Math.floor((e.z+2)/8);if(!this.flow)return null;let best=this.flow[z*64+x],found=null;for(const [dx,dz] of [[0,-1],[1,0],[0,1],[-1,0]]){let nx=x+dx,nz=z+dz,n=this.flow[nz*64+nx];if(n>=0&&(best<0||n<best)){best=n;found={x:nx*8+.5,z:nz*8+.5}}}return found;},
 spark(e,n=6){for(let i=0;i<n&&this.sparks.length<90;i++){let a=Math.random()*Math.PI*2,v=10+Math.random()*25;this.sparks.push({x:e.x+3,z:e.z+2,y:3,vx:Math.cos(a)*v,vz:Math.sin(a)*v,vy:15+Math.random()*20,life:.3+Math.random()*.18});}},
 impact(e){this.spark(e);e._flash=.1;this.hitstop=Math.max(this.hitstop,.018);this.float('−'+(1+this.upgrades[2]),e.x,e.z-2,'#ffe7b3',.42);camera_shake=Math.max(camera_shake,.25);audio_play('hit');},
 float(text,x,z,color='#ffd296',life=.8){if(this.floats.length>35)this.floats.shift();this.floats.push({text,x,z,color,life,max:life});},
 killed(e){this.spark(e,12);this.kills++;this.done++;this.combo=this.comboTimer>0?this.combo+1:1;this.comboTimer=3.5;const mult=Math.min(5,1+Math.floor(this.combo/4)),points=(e instanceof entity_sentry_t?150:60)*mult;this.score+=points;this.float('+'+points,e.x,e.z);this.charge++;if(this.charge>=6){this.charge=0;this.novaPending=true}this.rings.push({x:e.x,z:e.z,r:2,life:.35,max:.35,color:'#ffc27a'});if(this.rings.length>20)this.rings.shift();this.hitstop=Math.max(this.hitstop,.045);if(e._volatile){for(const other of entities.slice()){if(!other._dead&&other!==e&&enemy(other)&&Math.hypot(other.x-e.x,other.z-e.z)<23){other._receive_damage({vx:0,vz:0},5+this.upgrades[2]);}}this.float('CHAIN!',e.x,e.z,'#aff3ed');}if(navigator.vibrate)navigator.vibrate(8);},
 spawn(){let candidates=[];for(let z=24;z<40;z++)for(let x=25;x<41;x++){if(level_data[z*64+x]>7)continue;let px=x*8,pz=z*8,d=Math.hypot(px-entity_player.x,pz-entity_player.z);const screen=project(px+3,0,pz+2);if(d>=22&&d<=38&&screen.x>30&&screen.x<innerWidth-30&&screen.y>Math.max(innerHeight*.26,155)&&screen.y<innerHeight*.73&&lineClear(entity_player.x,entity_player.z,px,pz))candidates.push({x:px,z:pz});}if(!candidates.length)return false;let p=candidates[Math.floor(Math.random()*candidates.length)],kind=(this.wave>=2&&this.spawned%4===3)?'sentry':'spider',volatile=this.wave>=3&&this.spawned%5===4;this.spawnQueue.push({...p,kind,volatile,time:.85,max:.85});this.spawned++;return true;},
 detonate(){this.novaPending=false;this.novaLock=.8;this.rings.push({x:entity_player.x,z:entity_player.z,r:1,life:.7,max:.7,color:'#92eff0',nova:true});shout('OVERDRIVE',1.1);camera_shake=3;audio_play('nova');const radius=52+this.upgrades[4]*10;for(const e of entities.slice()){if(e._dead)continue;if(enemy(e)&&Math.hypot(e.x-entity_player.x,e.z-entity_player.z)<radius)e._receive_damage({vx:0,vz:0},5+this.upgrades[4]*3);if(e instanceof entity_sentry_plasma_t)e._kill();}entity_player._last_damage=Math.max(.4,entity_player._last_damage);},
 begin(run){if(this.state==='loading'&&this.ready)return;this.wave=run?.wave||1;this.score=run?.score||0;this.kills=run?.kills||0;this.upgrades=run?.upgrades?.slice()||[0,0,0,0,0];this.charge=run?.charge||0;this.checkpoint={wave:this.wave,score:this.score,kills:this.kills,upgrades:this.upgrades.slice(),charge:this.charge};profile.run=this.checkpoint;persist();this.loadWave();},
 loadWave(){setState('loading');modal('ENTERING ARENA','LINKING…','<p>Bringing the local arena online.</p>',[]);current_level=Math.floor((this.wave-1)/3)%3+1;this.ready=false;load_level(current_level,()=>{this.ready=true;this.total=Math.min(32,4+this.wave*2);this.spawned=this.done=this.hits=0;this.combo=0;this.comboTimer=0;this.waveTime=0;this.dashTime=this.dashCooldown=this.hitstop=this.novaLock=0;this.novaPending=false;this.spawnQueue=[];this.started=false;this.spawnTimer=.15;this.clearDelay=0;this.sparks=[];this.floats=[];this.rings=[];this.hurt=0;this.flowAt=0;entity_player.h=this.maxHealth();this.peak=0;setState('play');shout('DRAG TO MOVE',1.3);for(let i=0;i<Math.min(5,2+Math.floor(this.wave/2));i++)this.spawn();this.render();});},
 finish(){if(this.state!=='play')return;entity_player.h=this.maxHealth();this.score+=250+Math.max(0,3-this.hits)*100;profile.best=Math.max(profile.best,this.score);profile.cleared=Math.max(profile.cleared,this.wave);let stars=1+(this.hits===0?1:0)+(this.waveTime<55?1:0);let next={wave:this.wave+1,score:this.score,kills:this.kills,upgrades:this.upgrades.slice(),charge:this.charge};profile.run=next;persist();setState('reward');shout('');modal('WAVE '+String(this.wave).padStart(2,'0')+' / CLEAR',this.wave===9?'STATION SAFE':'NICE WORK.',`<div class="stars">${'✦'.repeat(stars)}${'◇'.repeat(3-stars)}</div><div class="stats"><span><b>${this.score}</b><small>SCORE</small></span><span><b>${Math.round(this.waveTime)}s</b><small>CLEAR TIME</small></span></div><p>${this.wave===9?'Station secured. Armor restored.':'Armor restored. Take one upgrade.'}</p>`,[]);if(this.wave===9){$('#body').innerHTML+='<p>Nine waves cleared. Endless mode unlocked.</p>';button('CONTINUE · ENDLESS',()=>this.begin(next),true);button('BACK TO TITLE',title);return;}let choices=perks.map((p,i)=>i).filter(i=>this.upgrades[i]<perks[i].max);for(let k=choices.length-1;k>0;k--){let j=Math.floor(Math.random()*(k+1));[choices[k],choices[j]]=[choices[j],choices[k]];}if(!choices.length){button('NEXT WAVE ↗',()=>this.begin(next),true);return;}next.reward=choices.slice(0,3);profile.run=next;persist();for(const i of choices.slice(0,3)){const p=perks[i],b=button('',()=>{next.upgrades[i]++;this.begin(next)});b.className='perk';b.innerHTML=`<span class="symbol">${p.s}</span><b>${p.n}${this.upgrades[i]?' '+(this.upgrades[i]+1):''}</b><small>${p.d}</small>`;}},
 lose(){if(this.state!=='play')return;profile.best=Math.max(profile.best,this.score);profile.run=this.checkpoint;persist();setState('lost');modal('WAVE '+String(this.wave).padStart(2,'0'),'SUIT OFFLINE',`<p>Same wave. Keep your upgrades.<br>A fresh suit is ready.</p><div class="stats"><span><b>${this.done}/${this.total}</b><small>THREATS CLEARED</small></span><span><b>${this.score}</b><small>SCORE</small></span></div>`,[{text:'RETRY THIS WAVE ↗',fn:()=>this.begin(this.checkpoint),primary:true},{text:'BACK TO TITLE',fn:title}]);},
 error(msg){setState('error');modal('CONNECTION INTERRUPTED','TRY AGAIN',`<p>${msg}</p>`,[{text:'RELOAD',fn:()=>location.reload(),primary:true}]);},
 render(){if(!this.ready||!entity_player||!gl)return;renderer_prepare_frame();push_light(entity_player.x,6,entity_player.z,1,.7,.5,.04);for(const p of [[208,192],[304,192],[208,304],[304,304]])push_light(p[0],5,p[1],current_level===1?.8:.2,current_level===2?.7:.3,current_level===3?.8:.5,.07);for(const e of entities){if(e._dead)continue;if(e._flash>0)push_light(e.x,4,e.z,1.7,1.7,1.7,.04);if(e._volatile&&enemy(e))push_light(e.x,3,e.z,1,.3,.1,.06);e._render();}renderer_end_frame();drawFX();updateHUD();this.redraw=false;}
};
function simulate(dt){if(breach.state!=='play')return;if(!breach.started){const m=breach.move();if(Math.hypot(m.x,m.z)<.05)return;breach.started=true;shout('WAVE '+String(breach.wave).padStart(2,'0'),1.3);}time_elapsed=dt;breach.clock+=dt;breach.waveTime+=dt;breach.comboTimer-=dt;if(breach.comboTimer<=0)breach.combo=0;breach.dashTime=Math.max(0,breach.dashTime-dt);breach.dashCooldown=Math.max(0,breach.dashCooldown-dt);breach.novaLock=Math.max(0,breach.novaLock-dt);breach.hurt=Math.max(0,breach.hurt-dt);breach.muzzle=Math.max(0,breach.muzzle-dt);breach.flowAt-=dt;if(breach.flowAt<=0){breach.buildFlow();breach.flowAt=.25;}
 for(const p of breach.spawnQueue){p.time-=dt;if(p.time<=0&&!p.spawned){p.spawned=true;const e=p.kind==='sentry'?new entity_sentry_t(p.x,0,p.z,5,32):new entity_spider_t(p.x,0,p.z,5,27);e.h=p.kind==='sentry'?9+Math.floor(breach.wave/3):3+Math.floor((breach.wave-1)/4);e._max=e.h;e._volatile=p.volatile;}}
 breach.spawnQueue=breach.spawnQueue.filter(p=>!p.spawned);breach.spawnTimer-=dt;const alive=entities.filter(e=>!e._dead&&enemy(e)).length;if(breach.spawnTimer<=0&&breach.spawned<breach.total&&alive+breach.spawnQueue.length<Math.min(10,4+Math.floor(breach.wave/2))){breach.spawn();if(breach.wave>=3&&breach.spawned<breach.total)breach.spawn();breach.spawnTimer=Math.max(.65,1.3-breach.wave*.035);}
 if(breach.dashTime>0){for(const e of entities.slice()){if(!e._dead&&enemy(e)&&e._dashSerial!==breach.dashSerial&&Math.hypot(e.x-entity_player.x,e.z-entity_player.z)<14){e._dashSerial=breach.dashSerial;e._receive_damage({vx:breach.dashVector.x*70,vz:breach.dashVector.z*70},5+breach.upgrades[2]);breach.impact(e);}}}
 for(let i=0;i<entities.length;i++){const e=entities[i];if(e._dead)continue;e._flash=Math.max(0,(e._flash||0)-dt);e._update();if(breach.state!=='play')break;if(e instanceof entity_particle_t||e instanceof entity_explosion_t)continue;for(let j=i+1;j<entities.length;j++){const b=entities[j];if(e._dead||b._dead||b instanceof entity_particle_t||b instanceof entity_explosion_t)continue;if(e.x<b.x+7&&e.x+7>b.x&&e.z<b.z+6&&e.z+6>b.z){e._check(b);if(!b._dead)b._check(e);}}}
 entities=entities.filter(e=>!e._dead);entities_to_kill=[];breach.peak=Math.max(breach.peak,entities.length);if(breach.novaPending&&breach.novaLock<=0&&breach.state==='play')breach.detonate();for(const s of breach.sparks){s.life-=dt;s.x+=s.vx*dt;s.z+=s.vz*dt;s.y+=s.vy*dt;s.vy-=90*dt;}breach.sparks=breach.sparks.filter(s=>s.life>0);for(const f of breach.floats)f.life-=dt;breach.floats=breach.floats.filter(f=>f.life>0);for(const r of breach.rings){r.life-=dt;r.r+=dt*(r.nova?100:30);}breach.rings=breach.rings.filter(r=>r.life>0);camera_x+=(-entity_player.x-camera_x)*Math.min(1,dt*10);camera_y+=(0-camera_y)*Math.min(1,dt*10);camera_z+=(-entity_player.z-camera_z)*Math.min(1,dt*10);camera_shake*=Math.pow(.9,dt*60);camera_x+=camera_shake*(Math.random()-.5);camera_z+=camera_shake*(Math.random()-.5);if(breach.shoutUntil&&breach.clock>breach.shoutUntil)shout('');if(breach.done>=breach.total&&breach.state==='play'){breach.clearDelay+=dt;if(breach.clearDelay>.85)breach.finish();}}
function project(x,y,z){const aspect=c.width/c.height,v=Math.min(1.303,1.6*aspect),yy=y+camera_y-10,zz=z+camera_z-30,vy=.707*yy-.707*zz-22.627,vz=.707*yy+.707*zz-22.627;return{x:(1+(v/aspect)*(x+camera_x)/(-vz))*innerWidth/2,y:(1-v*vy/(-vz))*innerHeight/2,scale:innerHeight*v/(2*-vz)};}
function drawFX(){fg.clearRect(0,0,fx.width,fx.height);for(const s of breach.sparks){const q=project(s.x,s.y,s.z);fg.globalAlpha=Math.min(1,s.life*5);fg.fillStyle=s.life>.25?'#fff1b9':'#ff9a4a';fg.fillRect(q.x,q.y,2.4,2.4);}fg.globalAlpha=1;for(const p of breach.spawnQueue){let q=project(p.x+3,0,p.z+2),r=(5+Math.sin(breach.clock*18))*q.scale;fg.strokeStyle='#ff9278';fg.lineWidth=2;fg.beginPath();fg.ellipse(q.x,q.y,Math.abs(r),Math.abs(r*.45),0,0,Math.PI*2);fg.stroke();fg.globalAlpha=.7;fg.fillStyle='#ffb89e';fg.font='bold 14px monospace';fg.textAlign='center';fg.fillText('!',q.x,q.y-13);fg.globalAlpha=1;}for(const r of breach.rings){const q=project(r.x+3,0,r.z+2);fg.strokeStyle=r.color;fg.lineWidth=r.nova?4:2;fg.globalAlpha=r.life/r.max;fg.beginPath();fg.ellipse(q.x,q.y,Math.max(1,r.r*q.scale),Math.max(1,r.r*q.scale*.55),0,0,Math.PI*2);fg.stroke();}fg.globalAlpha=1;for(const e of entities){if(!enemy(e)||e._dead||e.h>=e._max)continue;const q=project(e.x+3,8,e.z);fg.fillStyle='#0b192bcc';fg.fillRect(q.x-12,q.y-7,24,3);fg.fillStyle=e._volatile?'#ffb969':'#a7e6db';fg.fillRect(q.x-12,q.y-7,24*Math.max(0,e.h/e._max),3);}for(const f of breach.floats){const q=project(f.x+3,8,f.z);fg.globalAlpha=Math.min(1,f.life/.2);fg.fillStyle=f.color;fg.font=(f.text.length>4?'bold 13px':'bold 16px')+' ui-monospace,monospace';fg.textAlign='center';fg.shadowColor='#061c25';fg.shadowBlur=3;fg.fillText(f.text,q.x,q.y-(1-f.life/f.max)*32);}fg.shadowBlur=0;fg.globalAlpha=1;if(breach.hurt){fg.fillStyle=`rgba(255,70,40,${breach.hurt*.28})`;fg.fillRect(0,0,fx.width,fx.height);}if(breach.muzzle){let q=project(entity_player.x+3,4,entity_player.z);const g=fg.createRadialGradient(q.x,q.y,0,q.x,q.y,35);g.addColorStop(0,'#ffe5a866');g.addColorStop(1,'#ffc16d00');fg.fillStyle=g;fg.fillRect(q.x-35,q.y-35,70,70);}}
function updateHUD(){const b=breach;$('#sector').textContent=sectorNames[current_level-1];$('#wave').textContent='WAVE '+String(b.wave).padStart(2,'0');$('#left').textContent=Math.max(0,b.total-b.done)+' LEFT';$('#score').textContent=String(b.score).padStart(5,'0');$('#hp').textContent='▰'.repeat(Math.max(0,entity_player.h))+'▱'.repeat(Math.max(0,b.maxHealth()-entity_player.h));$('#hp').setAttribute('aria-label',entity_player.h+' of '+b.maxHealth()+' armor');$('#wavebar').style.width=(b.done/b.total*100)+'%';$('#energy').style.width=b.charge/6*100+'%';$('#dashfill').style.height=b.dashCooldown/1.8*100+'%';$('#dashnote').textContent=b.dashCooldown>0?b.dashCooldown.toFixed(1)+'s':'READY';$('#dash').disabled=b.dashCooldown>0;$('#combo').textContent=b.combo>=2?b.combo+' CHAIN':'';$('#sound').setAttribute('aria-pressed',String(b.sound));}
function persist(){profile.sound=breach.sound;try{localStorage.setItem('underrun-redline-v1',JSON.stringify(profile))}catch{}}
function validRun(r){return r&&Number.isInteger(r.wave)&&r.wave>=1&&r.wave<=999&&Number.isSafeInteger(r.score)&&r.score>=0&&r.score<1e10&&Number.isSafeInteger(r.kills)&&r.kills>=0&&Array.isArray(r.upgrades)&&r.upgrades.length===5&&r.upgrades.every((n,i)=>Number.isInteger(n)&&n>=0&&n<=perks[i].max)&&Number.isInteger(r.charge)&&r.charge>=0&&r.charge<6;}
function clearInput(){keys={37:0,38:0,39:0,40:0};breach.joy={x:0,z:0};stickId=null;$('#knob').style.transform='translate(-50%,-50%)';}
function setState(s){breach.state=s;document.body.dataset.state=s;$('#hud').hidden=!['play','pause','reward','lost'].includes(s);$('#controls').hidden=s!=='play';$('#modal').hidden=s==='play';clearInput();if(s!=='play')silence();else wake();breach.redraw=true;}
function modal(eyebrow,title,body,actions=[]){$('#eyebrow').textContent=eyebrow;$('#title').textContent=title;$('#body').innerHTML=body;$('#actions').innerHTML='';for(const a of actions)button(a.text,a.fn,a.primary);}
function button(text,fn,primary=false){const b=document.createElement('button');b.textContent=text;b.className=primary?'primary':'';b.onclick=()=>{wake();fn()};$('#actions').appendChild(b);return b;}
function title(){setState('menu');const resume=validRun(profile.run);modal('UNDERRUN / COMPLETE SOURCE REMIX','REDLINE','<p class="subtitle">Move. Dodge. Clear the room.</p><div class="icons"><span>↔<small>MOVE</small></span><span>✦<small>AUTO FIRE</small></span><span>↗<small>DASH</small></span></div><p>Best '+profile.best+' · '+profile.cleared+' waves cleared</p>',[{text:resume?(Array.isArray(profile.run.reward)?'CHOOSE YOUR UPGRADE':'RESUME · WAVE '+profile.run.wave):'DEPLOY ↗',fn:()=>resume?resumeRun():breach.begin(null),primary:true},...(resume?[{text:'NEW RUN',fn:()=>breach.begin(null)}]:[]),{text:'CONTROLS',fn:help}]);}
function resumeRun(){const r=profile.run;if(Array.isArray(r.reward)&&r.reward.length&&r.reward.length<=3&&r.reward.every(i=>Number.isInteger(i)&&i>=0&&i<perks.length&&r.upgrades[i]<perks[i].max)){setState('reward');modal('WAVE '+(r.wave-1)+' / CLEAR','UPGRADE READY','<p>Your cleared wave and upgrade are saved.<br>Pick one and keep going.</p>',[]);for(const i of r.reward){const p=perks[i],b=button('',()=>{const next={...r,upgrades:r.upgrades.slice()};next.upgrades[i]++;breach.begin(next)});b.className='perk';b.innerHTML=`<span class="symbol">${p.s}</span><b>${p.n}</b><small>${p.d}</small>`;}}else breach.begin(r);}
function help(){setState('help');modal('ONE STICK. ONE BUTTON.','KEEP MOVING','<p>Drag the stick, or drag anywhere on the arena.<br>Your weapon aims and fires automatically.</p><p>DASH through enemies to smash them.<br>Every six defeats trigger an automatic OVERDRIVE.</p><p>Clear the wave. Pick one upgrade. Go again.<br>Keyboard: WASD / arrows · Space dash · Esc pause.</p>',[{text:'BACK',fn:()=>{if(breach.ready&&breach.checkpoint){setState('pause');pausePanel()}else title()},primary:true}]);}
function pausePanel(){modal('TAKE A BREATHER','PAUSED','<p>Your current wave is paused.<br>Reload resumes at the start of this wave.</p>',[{text:'CONTINUE',fn:()=>setState('play'),primary:true},{text:'RESTART WAVE',fn:()=>breach.begin(breach.checkpoint)},{text:'CONTROLS',fn:help},{text:'BACK TO TITLE',fn:title}]);}
function pause(){if(breach.state!=='play')return;setState('pause');pausePanel();}
function dash(){if(breach.state!=='play'||breach.dashCooldown>0)return;breach.dashTime=.24;breach.dashSerial=(breach.dashSerial||0)+1;breach.dashCooldown=1.8;breach.dashVector={...breach.lastMove};breach.rings.push({x:entity_player.x,z:entity_player.z,r:2,life:.25,max:.25,color:'#9de7ed'});audio_play('dash');}
function shout(text,seconds=1.2){$('#shout').textContent=text;$('#shout').classList.toggle('show',!!text);breach.shoutUntil=text?breach.clock+seconds:0;}
let stickId=null,origin=null;function joy(e){let dx=e.clientX-origin.x,dz=e.clientY-origin.y,len=Math.hypot(dx,dz);breach.joy={x:len>5?dx/Math.max(33,len):0,z:len>5?dz/Math.max(33,len):0};$('#knob').style.transform=`translate(calc(-50% + ${dx/Math.max(1,len/30)}px),calc(-50% + ${dz/Math.max(1,len/30)}px))`;}
for(const el of [$('#stick'),c]){el.addEventListener('pointerdown',e=>{if(breach.state!=='play'||stickId!==null)return;e.preventDefault();wake();stickId=e.pointerId;const r=$('#stick').getBoundingClientRect();origin=el===c?{x:e.clientX,y:e.clientY}:{x:r.left+r.width/2,y:r.top+r.height/2};el.setPointerCapture(e.pointerId);joy(e);});el.addEventListener('pointermove',e=>{if(stickId===e.pointerId)joy(e)});for(const t of ['pointerup','pointercancel','lostpointercapture'])el.addEventListener(t,e=>{if(stickId===e.pointerId)clearInput()});}
$('#dash').onclick=dash;$('#pause').onclick=pause;$('#brand').onclick=e=>{e.preventDefault();pause()};$('#sound').onclick=()=>{breach.sound=!breach.sound;if(breach.sound){wake();audio_play('clear')}else silence();$('#sound').setAttribute('aria-pressed',String(breach.sound));persist();};
window.addEventListener('keydown',e=>{if(e.key==='Escape'){if(breach.state==='play')pause();else if(breach.state==='pause')setState('play');return;}const conv={a:37,w:38,d:39,s:40,ArrowLeft:37,ArrowUp:38,ArrowRight:39,ArrowDown:40},key=conv[e.key];if(breach.state!=='play')return;if(key){keys[key]=1;e.preventDefault();wake()}if(e.key===' '){e.preventDefault();if(!e.repeat)dash();}});window.addEventListener('keyup',e=>{const key={a:37,w:38,d:39,s:40,ArrowLeft:37,ArrowUp:38,ArrowRight:39,ArrowDown:40}[e.key];if(key)keys[key]=0;});window.addEventListener('blur',()=>{clearInput();pause();silence()});document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInput();pause();silence();}});window.addEventListener('pagehide',persist);
function resize(){let h=Math.min(480,Math.max(240,Math.round(innerHeight*.7))),w=Math.round(h*innerWidth/innerHeight);if(w>800){w=800;h=Math.round(w*innerHeight/innerWidth)}c.width=w;c.height=h;fx.width=innerWidth;fx.height=innerHeight;if(gl)gl.viewport(0,0,w,h);clearInput();breach.redraw=true;}
window.addEventListener('resize',resize);c.addEventListener('webglcontextlost',e=>{e.preventDefault();breach.error('Graphics context interrupted. Reload to reconnect.');});
let last=0,acc=0,draw=0;function loop(now){requestAnimationFrame(loop);let dt=Math.min(.12,(now-(last||now))/1000);last=now;if(document.hidden)return;if(breach.state==='play'){if(breach.hitstop>0){breach.hitstop=Math.max(0,breach.hitstop-dt);dt=0;}acc+=dt;let n=0;while(acc>=1/60&&n++<8&&breach.state==='play'){simulate(1/60);acc-=1/60;}draw+=dt;if(draw>=1/40||breach.redraw){draw%=1/40;breach.render();}}else{acc=0;if(breach.redraw)breach.render();}}
function boot(){try{if(!gl)throw Error('WebGL unavailable');renderer_init();resize();load_image('q2',function(){renderer_bind_image(this);load_level(1,()=>{breach.ready=true;entity_player.h=6;breach.render();title();requestAnimationFrame(loop);});});}catch(e){breach.error('WebGL could not start on this browser.');}}
boot();

;

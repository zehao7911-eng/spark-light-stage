// MIT Daniel Hough2013; original adaptation credits in LICENSE-SKIFREE.txt
(async()=>{'use strict';
// Source: engine-1026a/constants.js
// Skier physics
const SKIER_STANDARD_SPEED = 5;
const SKIER_BOOST_MULTIPLIER = 2;
const SKIER_TURN_EASE_CYCLES = 4;
const SKIER_DEAD_ZONE_X = 8;
const SKIER_DIRECTION_THRESHOLD_SHARP = 70;
const SKIER_BOOST_DURATION_MS = 2000;
const SKIER_BOOST_COOLDOWN_MS = 10000;
const SKIER_OUCH_DURATION_MS = 600;
const SKIER_CRASH_RECOVERY_MS = 1500;
const SKIER_JUMP_DURATION_MS = 1000;
const SKIER_JUMP_SPEED_BONUS = 2;
const SKIER_TRICK_INTERVAL_MS = 300;

// Monster physics
const MONSTER_STANDARD_SPEED = 6;
const MONSTER_EATING_INTERVAL_MS = 300;
const MONSTER_EATING_STAGES = 6;

// Snowboarder physics
const SNOWBOARDER_STANDARD_SPEED = 3;

// Ski lift
const SKI_LIFT_STANDARD_SPEED = 6;

// Game world
const PIXELS_PER_METRE = 18;
const MONSTER_DISTANCE_THRESHOLD = 2000;

// Source: engine-1026a/guid.js
// Creates a random ID string
function guid() {
    var S4 = function () {
        return Math.floor(
                Math.random() * 0x10000 /* 65536 */
            ).toString(16);
    };

    return (
            S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4()
        );
}



const GUID=guid;

// Source: engine-1026a/sprite.js
class Sprite {
	constructor(data) {
		this._hittableObjects = {};
		this._zIndexesOccupied = [0];
		this._trackedSpriteToMoveToward = undefined;

		this.direction = undefined;
		this.mapPosition = [0, 0, 0];
		this.id = GUID();
		this.canvasX = 0;
		this.canvasY = 0;
		this.canvasZ = 0;
		this.height = 0;
		this.speed = 0;
		this.data = data || { parts: {} };
		this.movingToward = [0, 0];
		this.metresDownTheMountain = 0;
		this.movingWithConviction = false;
		this.deleted = false;

		if (!this.data.parts) {
			this.data.parts = {};
		}

		const heights = Object.values(this.data.parts).map(p => p[3]);
		this.maxHeight = heights.length ? Math.max(...heights) : undefined;
		this.isMoving = true;

		if (data && data.id) {
			this.id = data.id;
		}

		if (data && data.zIndexesOccupied) {
			this._zIndexesOccupied = data.zIndexesOccupied;
		}
	}

	_incrementX(amount) {
		this.canvasX += parseFloat(amount);
	}

	_incrementY(amount) {
		this.canvasY += parseFloat(amount);
	}

	_getHitBox(forZIndex) {
		if (this.data.hitBoxes && this.data.hitBoxes[forZIndex]) {
			return this.data.hitBoxes[forZIndex];
		}
	}

	_roundHalf(num) {
		return Math.round(num * 2) / 2;
	}

	// dt is a frame-time multiplier (1.0 = one target frame of 20ms).
	// Multiply all movement by dt so speed stays consistent across frame rates.
	_move(dt = 1) {
		if (!this.isMoving) {
			return;
		}

		var currentX = this.mapPosition[0];
		var currentY = this.mapPosition[1];

		if (typeof this.direction !== 'undefined') {
			var d = this.direction - 90;
			if (d < 0) d = 360 + d;
			currentX += this._roundHalf(this.speed * dt * Math.cos(d * (Math.PI / 180)));
			currentY += this._roundHalf(this.speed * dt * Math.sin(d * (Math.PI / 180)));
		} else {
			if (typeof this.movingToward[0] !== 'undefined') {
				if (currentX > this.movingToward[0]) {
					currentX -= Math.min(this.getSpeedX() * dt, Math.abs(currentX - this.movingToward[0]));
				} else if (currentX < this.movingToward[0]) {
					currentX += Math.min(this.getSpeedX() * dt, Math.abs(currentX - this.movingToward[0]));
				}
			}

			if (typeof this.movingToward[1] !== 'undefined') {
				if (currentY > this.movingToward[1]) {
					currentY -= Math.min(this.getSpeedY() * dt, Math.abs(currentY - this.movingToward[1]));
				} else if (currentY < this.movingToward[1]) {
					currentY += Math.min(this.getSpeedY() * dt, Math.abs(currentY - this.movingToward[1]));
				}
			}
		}

		this.setMapPosition(currentX, currentY);
	}

	draw(dCtx, spriteFrame) {
		var fr = this.data.parts[spriteFrame];
		this.height = fr[3];
		this.width = fr[2];

		var newCanvasPosition = dCtx.mapPositionToCanvasPosition(this.mapPosition);
		this.setCanvasPosition(newCanvasPosition[0], newCanvasPosition[1]);

		dCtx.drawImage(dCtx.getLoadedImage(this.data.$imageFile), fr[0], fr[1], fr[2], fr[3], this.canvasX, this.canvasY, fr[2], fr[3]);
	}

	setMapPosition(x, y, z) {
		if (typeof x === 'undefined') x = this.mapPosition[0];
		if (typeof y === 'undefined') y = this.mapPosition[1];
		if (typeof z === 'undefined') {
			z = this.mapPosition[2];
		} else {
			this._zIndexesOccupied = [z];
		}
		this.mapPosition = [x, y, z];
	}

	setCanvasPosition(cx, cy) {
		if (cx) {
			if (typeof cx === 'string' && (cx[0] === '+' || cx[0] === '-')) this._incrementX(cx);
			else this.canvasX = cx;
		}
		if (cy) {
			if (typeof cy === 'string' && (cy[0] === '+' || cy[0] === '-')) this._incrementY(cy);
			else this.canvasY = cy;
		}
	}

	getCanvasPositionX() { return this.canvasX; }
	getCanvasPositionY() { return this.canvasY; }

	getLeftHitBoxEdge(zIndex) {
		zIndex = zIndex || 0;
		var lhbe = this.getCanvasPositionX();
		if (this._getHitBox(zIndex)) lhbe += this._getHitBox(zIndex)[0];
		return lhbe;
	}

	getTopHitBoxEdge(zIndex) {
		zIndex = zIndex || 0;
		var thbe = this.getCanvasPositionY();
		if (this._getHitBox(zIndex)) thbe += this._getHitBox(zIndex)[1];
		return thbe;
	}

	getRightHitBoxEdge(zIndex) {
		zIndex = zIndex || 0;
		if (this._getHitBox(zIndex)) return this.canvasX + this._getHitBox(zIndex)[2];
		return this.canvasX + this.width;
	}

	getBottomHitBoxEdge(zIndex) {
		zIndex = zIndex || 0;
		if (this._getHitBox(zIndex)) return this.canvasY + this._getHitBox(zIndex)[3];
		return this.canvasY + this.height;
	}

	getPositionInFrontOf() {
		return [this.canvasX, this.canvasY + this.height];
	}

	setSpeed(s) {
		this.speed = s;
		this.speedX = s;
		this.speedY = s;
	}

	incrementSpeedBy(s) {
		this.speed += s;
	}

	getSpeed() { return this.speed; }
	getSpeedX() { return this.speed; }
	getSpeedY() { return this.speed; }

	setHeight(h) { this.height = h; }
	setWidth(w) { this.width = w; }
	getMaxHeight() { return this.maxHeight; }

	checkHittableObjects() {
		Object.keys(this._hittableObjects).forEach(k => {
			var objectData = this._hittableObjects[k];
			if (objectData.object.deleted) {
				delete this._hittableObjects[k];
			} else {
				if (objectData.object.hits(this)) {
					objectData.callbacks.forEach(callback => callback(this, objectData.object));
				}
			}
		});
	}

	cycle(dt = 1) {
		this.checkHittableObjects();

		if (this._trackedSpriteToMoveToward) {
			this.setMapPositionTarget(
				this._trackedSpriteToMoveToward.mapPosition[0],
				this._trackedSpriteToMoveToward.mapPosition[1],
				true
			);
		}

		this._move(dt);
	}

	setMapPositionTarget(x, y, override) {
		if (override) {
			this.movingWithConviction = false;
		}

		if (!this.movingWithConviction) {
			if (typeof x === 'undefined') x = this.movingToward[0];
			if (typeof y === 'undefined') y = this.movingToward[1];
			this.movingToward = [x, y];
			this.movingWithConviction = false;
		}
	}

	setDirection(angle) {
		if (angle >= 360) angle = 360 - angle;
		this.direction = angle;
		this.movingToward = undefined;
	}

	resetDirection() {
		this.direction = undefined;
	}

	setMapPositionTargetWithConviction(cx, cy) {
		this.setMapPositionTarget(cx, cy);
		this.movingWithConviction = true;
	}

	follow(sprite) {
		this._trackedSpriteToMoveToward = sprite;
	}

	stopFollowing() {
		this._trackedSpriteToMoveToward = false;
	}

	onHitting(objectToHit, callback) {
		if (this._hittableObjects[objectToHit.id]) {
			return this._hittableObjects[objectToHit.id].callbacks.push(callback);
		}
		this._hittableObjects[objectToHit.id] = {
			object: objectToHit,
			callbacks: [callback]
		};
	}

	deleteOnNextCycle() {
		this.deleted = true;
	}

	occupiesZIndex(z) {
		return this._zIndexesOccupied.indexOf(z) >= 0;
	}

	hits(other) {
		var verticalIntersect = false;
		var horizontalIntersect = false;
		var z = this.mapPosition[2];

		if (other.getTopHitBoxEdge(z) <= this.getBottomHitBoxEdge(z) && other.getBottomHitBoxEdge(z) >= this.getBottomHitBoxEdge(z)) {
			verticalIntersect = true;
		}
		if (other.getTopHitBoxEdge(z) <= this.getTopHitBoxEdge(z) && other.getBottomHitBoxEdge(z) >= this.getTopHitBoxEdge(z)) {
			verticalIntersect = true;
		}
		if (other.getLeftHitBoxEdge(z) <= this.getRightHitBoxEdge(z) && other.getRightHitBoxEdge(z) >= this.getRightHitBoxEdge(z)) {
			horizontalIntersect = true;
		}
		if (other.getLeftHitBoxEdge(z) <= this.getLeftHitBoxEdge(z) && other.getRightHitBoxEdge(z) >= this.getLeftHitBoxEdge(z)) {
			horizontalIntersect = true;
		}

		return verticalIntersect && horizontalIntersect;
	}

	isAboveOnCanvas(cy) {
		return (this.canvasY + this.height) < cy;
	}

	isBelowOnCanvas(cy) {
		return this.canvasY > cy;
	}

	static createObjects(spriteInfoArray, opts) {
		if (!Array.isArray(spriteInfoArray)) spriteInfoArray = [spriteInfoArray];
		opts = Object.assign({ rateModifier: 0, dropRate: 1, position: [0, 0] }, opts);

		function createOne(spriteInfo) {
			var position = opts.position;
			if (Math.floor(Math.random() * (101 + opts.rateModifier)) <= spriteInfo.dropRate) {
				var sprite = new Sprite(spriteInfo.sprite);
				sprite.setSpeed(0);

				if (typeof position === 'function') {
					position = position();
				}

				sprite.setMapPosition(position[0], position[1]);

				if (spriteInfo.sprite.hitBehaviour && spriteInfo.sprite.hitBehaviour.skier && opts.player) {
					sprite.onHitting(opts.player, spriteInfo.sprite.hitBehaviour.skier);
				}

				return sprite;
			}
		}

		return spriteInfoArray.map(createOne).filter(x => x !== undefined);
	}
}



// Source: engine-1026a/skier.js
if (typeof navigator !== 'undefined') {
	navigator.vibrate = navigator.vibrate ||
		navigator.webkitVibrate ||
		navigator.mozVibrate ||
		navigator.msVibrate;
} else {
	globalThis.navigator = { vibrate: false };
}

const DISCRETE_DIRECTIONS = {
	west:   270,
	wsWest: 240,
	sWest:  195,
	south:  180,
	sEast:  165,
	esEast: 120,
	east:   90
};

class Skier extends Sprite {
	constructor(data) {
		super(data);

		this._cancelableStateTimeout = null;
		this._cancelableStateInterval = null;
		this._canSpeedBoost = true;
		this._obstaclesHit = [];
		this._pixelsTravelled = 0;
		this._standardSpeed = SKIER_STANDARD_SPEED;
		this._turnEaseCycles = SKIER_TURN_EASE_CYCLES;
		this._speedX = 0;
		this._speedXFactor = 0;
		this._speedY = 0;
		this._speedYFactor = 1;
		this._trickStep = 0;

		this.isMoving = true;
		this.hasBeenHit = false;
		this.isOuching = false;
		this.isJumping = false;
		this.isPerformingTrick = false;
		this.onHitObstacleCb = function() {};

		this.setSpeed(this._standardSpeed);
	}

	_setNormal() {
		this.setSpeed(this._standardSpeed);
		this.isMoving = true;
		this.hasBeenHit = false;
		this.isOuching = false;
		this.isJumping = false;
		this.isPerformingTrick = false;
		if (this._cancelableStateInterval) clearInterval(this._cancelableStateInterval);
		this.setMapPosition(undefined, undefined, 0);
	}

	_setOuching() {
		this.isMoving = false;
		this.hasBeenHit = true;
		this.isOuching = true;
		this.isJumping = false;
		this.isPerformingTrick = false;
		if (this._cancelableStateInterval) clearInterval(this._cancelableStateInterval);
		this.setMapPosition(undefined, undefined, 0);
	}

	_setCrashed() {
		this.isMoving = false;
		this.hasBeenHit = true;
		this.isOuching = false;
		this.isJumping = false;
		this.isPerformingTrick = false;
		if (this._cancelableStateInterval) clearInterval(this._cancelableStateInterval);
		this.setMapPosition(undefined, undefined, 0);
	}

	_setJumping() {
		var currentSpeed = this.getSpeed();
		this.setSpeed(currentSpeed + SKIER_JUMP_SPEED_BONUS);
		this.setSpeedY(currentSpeed + SKIER_JUMP_SPEED_BONUS);
		this.isMoving = true;
		this.hasBeenHit = false;
		this.isJumping = true;
		this.setMapPosition(undefined, undefined, 1);
	}

	_getDiscreteDirection() {
		if (this.direction) {
			if (this.direction <= 90) return 'east';
			if (this.direction > 90 && this.direction < 150) return 'esEast';
			if (this.direction >= 150 && this.direction < 180) return 'sEast';
			if (this.direction === 180) return 'south';
			if (this.direction > 180 && this.direction <= 210) return 'sWest';
			if (this.direction > 210 && this.direction < 270) return 'wsWest';
			if (this.direction >= 270) return 'west';
			return 'south';
		}

		var xDiff = this.movingToward[0] - this.mapPosition[0];
		var yDiff = this.movingToward[1] - this.mapPosition[1];

		if (yDiff <= 0) {
			return xDiff > 0 ? 'east' : 'west';
		}

		if (xDiff > SKIER_DIRECTION_THRESHOLD_SHARP) return 'esEast';
		if (xDiff > SKIER_DEAD_ZONE_X) return 'sEast';
		if (xDiff < -SKIER_DIRECTION_THRESHOLD_SHARP) return 'wsWest';
		if (xDiff < -SKIER_DEAD_ZONE_X) return 'sWest';

		return 'south';
	}

	_setDiscreteDirection(d) {
		if (DISCRETE_DIRECTIONS[d]) {
			this.setDirection(DISCRETE_DIRECTIONS[d]);
		}
		this.isMoving = (d !== 'west' && d !== 'east');
	}

	_getBeingEatenSprite() { return 'blank'; }
	_getJumpingSprite() { return 'jumping'; }

	_getTrickSprite() {
		if (this._trickStep === 0) return 'jumping';
		if (this._trickStep === 1) return 'somersault1';
		return 'somersault2';
	}

	_easeSpeedToTargetUsingFactor(sp, targetSpeed, f) {
		if (f === 0 || f === 1) return targetSpeed;
		if (sp < targetSpeed) sp += this.getSpeed() * (f / this._turnEaseCycles);
		if (sp > targetSpeed) sp -= this.getSpeed() * (f / this._turnEaseCycles);
		return sp;
	}

	stop() {
		if (this.isJumping) return;
		if (this.direction > 180) {
			this._setDiscreteDirection('west');
		} else {
			this._setDiscreteDirection('east');
		}
	}

	turnEast() {
		if (this.hasBeenHit) return;
		switch (this._getDiscreteDirection()) {
			case 'west':   this._setDiscreteDirection('wsWest'); break;
			case 'wsWest': this._setDiscreteDirection('sWest'); break;
			case 'sWest':  this._setDiscreteDirection('south'); break;
			case 'south':  this._setDiscreteDirection('sEast'); break;
			case 'sEast':  this._setDiscreteDirection('esEast'); break;
			case 'esEast': this._setDiscreteDirection('east'); break;
			default:       this._setDiscreteDirection('south'); break;
		}
	}

	turnWest() {
		if (this.hasBeenHit) return;
		switch (this._getDiscreteDirection()) {
			case 'east':   this._setDiscreteDirection('esEast'); break;
			case 'esEast': this._setDiscreteDirection('sEast'); break;
			case 'sEast':  this._setDiscreteDirection('south'); break;
			case 'south':  this._setDiscreteDirection('sWest'); break;
			case 'sWest':  this._setDiscreteDirection('wsWest'); break;
			case 'wsWest': this._setDiscreteDirection('west'); break;
			default:       this._setDiscreteDirection('south'); break;
		}
	}

	stepWest() {
		if (this.hasBeenHit) return;
		this.mapPosition[0] -= this.speed * 2;
	}

	stepEast() {
		if (this.hasBeenHit) return;
		this.mapPosition[0] += this.speed * 2;
	}

	setMapPositionTarget(x, y) {
		if (this.hasBeenHit) return;
		if (Math.abs(this.mapPosition[0] - x) <= SKIER_DEAD_ZONE_X) {
			x = this.mapPosition[0];
		}
		this.movingToward = [x, y];
	}

	startMovingIfPossible() {
		if (!this.hasBeenHit && !this.isBeingEaten) {
			this.isMoving = true;
		}
	}

	setTurnEaseCycles(c) {
		this._turnEaseCycles = c;
	}

	getPixelsTravelledDownMountain() {
		return this._pixelsTravelled;
	}

	getStandardSpeed() {
		return this._standardSpeed;
	}

	resetSpeed() {
		this.setSpeed(this._standardSpeed);
	}

	setSpeedY(sy) {
		this._speedY = sy;
	}

	getSpeedX() {
		var dir = this._getDiscreteDirection();

		if (dir === 'esEast' || dir === 'wsWest') {
			this._speedXFactor = 0.5;
			this._speedX = this._easeSpeedToTargetUsingFactor(this._speedX, this.getSpeed() * 0.5, 0.5);
			return this._speedX;
		}

		if (dir === 'sEast' || dir === 'sWest') {
			this._speedXFactor = 0.33;
			this._speedX = this._easeSpeedToTargetUsingFactor(this._speedX, this.getSpeed() * 0.33, 0.33);
			return this._speedX;
		}

		this._speedX = this._easeSpeedToTargetUsingFactor(this._speedX, 0, this._speedXFactor);
		return this._speedX;
	}

	getSpeedY() {
		var dir = this._getDiscreteDirection();

		if (this.isJumping) return this._speedY;

		if (dir === 'esEast' || dir === 'wsWest') {
			this._speedYFactor = 0.6;
			this._speedY = this._easeSpeedToTargetUsingFactor(this._speedY, this.getSpeed() * 0.6, 0.6);
			return this._speedY;
		}

		if (dir === 'sEast' || dir === 'sWest') {
			this._speedYFactor = 0.85;
			this._speedY = this._easeSpeedToTargetUsingFactor(this._speedY, this.getSpeed() * 0.85, 0.85);
			return this._speedY;
		}

		if (dir === 'east' || dir === 'west') {
			this._speedYFactor = 1;
			this._speedY = 0;
			return this._speedY;
		}

		// south
		this._speedY = this._easeSpeedToTargetUsingFactor(this._speedY, this.getSpeed(), this._speedYFactor);
		return this._speedY;
	}

	cycle(dt = 1) {
		if (this.getSpeedX() <= 0 && this.getSpeedY() <= 0) {
			this.isMoving = false;
		}
		if (this.isMoving) {
			this._pixelsTravelled += this.speed * dt;
		}
		if (this.isJumping) {
			this.setMapPositionTarget(undefined, this.mapPosition[1] + this.getSpeed() * dt);
		}
		super.cycle(dt);
		this.checkHittableObjects();
	}

	draw(dContext) {
		const spritePartToUse = () => {
			if (this.isBeingEaten) return this._getBeingEatenSprite();
			if (this.isJumping) {
				return this.isPerformingTrick ? this._getTrickSprite() : this._getJumpingSprite();
			}
			if (this.isOuching) return 'ouch';
			if (this.hasBeenHit) return 'hit';
			return this._getDiscreteDirection();
		};

		return super.draw(dContext, spritePartToUse());
	}

	hits(obs) {
		if (this._obstaclesHit.indexOf(obs.id) !== -1) return false;
		if (!obs.occupiesZIndex(this.mapPosition[2])) return false;
		return super.hits(obs);
	}

	speedBoost() {
		var originalSpeed = this.speed;
		if (this._canSpeedBoost) {
			this._canSpeedBoost = false;
			this.setSpeed(this.speed * SKIER_BOOST_MULTIPLIER);
			setTimeout(() => {
				this.setSpeed(originalSpeed);
				setTimeout(() => {
					this._canSpeedBoost = true;
				}, SKIER_BOOST_COOLDOWN_MS);
			}, SKIER_BOOST_DURATION_MS);
		}
	}

	attemptTrick() {
		if (this.isJumping) {
			this.isPerformingTrick = true;
			this._cancelableStateInterval = setInterval(() => {
				this._trickStep = this._trickStep >= 2 ? 0 : this._trickStep + 1;
			}, SKIER_TRICK_INTERVAL_MS);
		}
	}

	hasHitObstacle(obs) {
		this._setOuching();

		if (navigator.vibrate) {
			navigator.vibrate(500);
		}

		this._obstaclesHit.push(obs.id);
		this.resetSpeed();
		this.onHitObstacleCb(obs);

		if (this._cancelableStateTimeout) clearTimeout(this._cancelableStateTimeout);
		this._cancelableStateTimeout = setTimeout(() => {
			this._setCrashed();
			this._cancelableStateTimeout = setTimeout(() => this._setNormal(), SKIER_CRASH_RECOVERY_MS - SKIER_OUCH_DURATION_MS);
		}, SKIER_OUCH_DURATION_MS);
	}

	hasHitJump() {
		if (!this.isMoving) return;
		this._setJumping();

		if (this._cancelableStateTimeout) clearTimeout(this._cancelableStateTimeout);
		this._cancelableStateTimeout = setTimeout(() => this._setNormal(), SKIER_JUMP_DURATION_MS);
	}

	isEatenBy(monster, whenEaten) {
		this.hasHitObstacle(monster);
		monster.startEating(whenEaten);
		this._obstaclesHit.push(monster.id);
		this.isMoving = false;
		this.isBeingEaten = true;
	}

	reset() {
		this._obstaclesHit = [];
		this._pixelsTravelled = 0;
		this.isMoving = true;
		this.isJumping = false;
		this.hasBeenHit = false;
		this.isOuching = false;
		this._canSpeedBoost = true;
	}

	setHitObstacleCb(fn) {
		this.onHitObstacleCb = fn || function() {};
	}
}



// Source: engine-1026a/monster.js
class Monster extends Sprite {
	constructor(data) {
		super(data);
		this._spriteVersion = 1;
		this._eatingStage = 0;

		this.isEating = false;
		this.isFull = false;
		this.setSpeed(MONSTER_STANDARD_SPEED);
	}

	draw(dContext) {
		const spritePartToUse = () => {
			var xDiff = this.movingToward[0] - this.canvasX;

			if (this.isEating) {
				return 'eating' + this._eatingStage;
			}

			if (this._spriteVersion + 0.1 > 2) {
				this._spriteVersion = 0.1;
			} else {
				this._spriteVersion += 0.1;
			}

			return xDiff >= 0
				? 'sEast' + Math.ceil(this._spriteVersion)
				: 'sWest' + Math.ceil(this._spriteVersion);
		};

		return super.draw(dContext, spritePartToUse());
	}

	startEating(whenDone) {
		this._eatingStage += 1;
		this.isEating = true;
		this.isMoving = false;
		if (this._eatingStage < MONSTER_EATING_STAGES) {
			setTimeout(() => this.startEating(whenDone), MONSTER_EATING_INTERVAL_MS);
		} else {
			this._eatingStage = 0;
			this.isEating = false;
			this.isMoving = true;
			whenDone();
		}
	}
}



// Source: engine-1026a/snowboarder.js
class Snowboarder extends Sprite {
	constructor(data) {
		super(data);
		this._standardSpeed = SNOWBOARDER_STANDARD_SPEED;
		this._camera = null; // set by Game.addMovingObject before first cycle
		this.setSpeed(this._standardSpeed);
	}

	_getDirection() {
		var xDiff = this.movingToward[0] - this.mapPosition[0];
		return xDiff > 0 ? 'sEast' : 'sWest';
	}

	cycle(dt = 1) {
		if (Math.floor(Math.random() * 11) === 1) {
			this.setMapPositionTarget(this._camera.getRandomlyInTheCentreOfMap());
			this.setSpeed(this._standardSpeed + Math.floor(Math.random() * 3) - 1);
		}
		this.setMapPositionTarget(undefined, this._camera.getMapBelowViewport() + 600);
		super.cycle(dt);
	}

	draw(dContext) {
		return super.draw(dContext, this._getDirection());
	}
}



// Source: engine-1026a/spriteArray.js
class SpriteArray extends Array {
	constructor() {
		super();
		this.pushHandlers = [];
	}

	onPush(f, retroactive) {
		this.pushHandlers.push(f);
		if (retroactive) {
			this.forEach(f);
		}
	}

	push(obj) {
		super.push(obj);
		this.pushHandlers.forEach(handler => handler(obj));
	}

	cull() { for(let i=this.length-1;i>=0;i--)if(!this[i]||this[i].deleted)this.splice(i,1); }
}


// Source: engine-1026a/game.js
// One target frame at the legacy 50 fps rate.
// All speed values in the game are expressed in "pixels per 20 ms", so we
// normalise every rAF delta against this constant to keep movement consistent
// across different display refresh rates.
const TARGET_FRAME_MS = 20;

class Game {
	constructor(camera, player) {
		this._camera = camera;
		this._player = player;
		this._staticObjects = new SpriteArray();
		this._movingObjects = new SpriteArray();
		this._uiElements = new SpriteArray();
		this._mouseX = camera.getCentreOfViewport();
		this._mouseY = 0;
		this._paused = false;
		this._beforeCycleCallbacks = [];
		this._afterCycleCallbacks = [];
		this._rafId = null;
		this._lastTimestamp = null;

		player.setMapPosition(0, 0);
		player.setMapPositionTarget(0, -10);
		camera.followSprite(player);
	}

	// ─── Object management ────────────────────────────────────────────────────

	addStaticObject(sprite) {
		this._staticObjects.push(sprite);
	}

	addStaticObjects(sprites) {
		sprites.forEach(this.addStaticObject.bind(this));
	}

	addMovingObject(movingObject, movingObjectType) {
		// Give the entity a camera reference so it can query viewport dimensions
		// during its own cycle() without needing it passed as a parameter.
		movingObject._camera = this._camera;

		if (movingObjectType) {
			this._staticObjects.onPush(obj => {
				if (obj.data && obj.data.hitBehaviour[movingObjectType]) {
					obj.onHitting(movingObject, obj.data.hitBehaviour[movingObjectType]);
				}
			}, true);
		}
		this._movingObjects.push(movingObject);
	}

	addUIElement(element) {
		this._uiElements.push(element);
	}

	// ─── Callbacks ────────────────────────────────────────────────────────────

	beforeCycle(callback) {
		this._beforeCycleCallbacks.push(callback);
	}

	afterCycle(callback) {
		this._afterCycleCallbacks.push(callback);
	}

	// ─── Input ────────────────────────────────────────────────────────────────

	setMouseX(x) { this._mouseX = x; }
	setMouseY(y) { this._mouseY = y; }

	// ─── Game loop ────────────────────────────────────────────────────────────

	_tick(timestamp) {
		if (this._lastTimestamp === null) {
			this._lastTimestamp = timestamp;
		}

		// Cap the delta at 100 ms so a long tab-switch doesn't send sprites
		// flying across the mountain on the first frame back.
		const elapsed = Math.min(timestamp - this._lastTimestamp, 100);
		const dt = elapsed / TARGET_FRAME_MS;
		this._lastTimestamp = timestamp;

		this.cycle(dt);
		this.draw();

		this._rafId = requestAnimationFrame(ts => this._tick(ts));
	}

	start() {
		if (this._rafId) return;
		this._lastTimestamp = null;
		this._rafId = requestAnimationFrame(ts => this._tick(ts));
	}

	pause() {
		this._paused = true;
		if (this._rafId) {
			cancelAnimationFrame(this._rafId);
			this._rafId = null;
		}
	}

	isPaused() { return this._paused; }

	reset() {
		this._paused = false;
		this._staticObjects = new SpriteArray();
		this._movingObjects = new SpriteArray();
		this._mouseX = this._camera.getCentreOfViewport();
		this._mouseY = 0;
		this._player.reset();
		this._player.setMapPosition(0, 0, 0);
		this._lastTimestamp = null;
		this.start();
	}

	// ─── Per-frame logic and rendering ────────────────────────────────────────

	cycle(dt = 1) {
		this._beforeCycleCallbacks.forEach(c => c());

		var mouseMapPosition = this._camera.canvasPositionToMapPosition([this._mouseX, this._mouseY]);

		if (!this._player.isJumping) {
			this._player.setMapPositionTarget(mouseMapPosition[0], mouseMapPosition[1]);
		}

		this._player.cycle(dt);

		this._movingObjects.forEach(obj => obj.cycle(dt));

		this._staticObjects.cull();
		this._staticObjects.forEach(obj => {
			if (obj.cycle) obj.cycle(dt);
		});

		this._uiElements.forEach(obj => {
			if (obj.cycle) obj.cycle(dt);
		});

		this._afterCycleCallbacks.forEach(c => c());
	}

	draw() {
		// clearRect in logical coordinates; the scale(dpr, dpr) transform applied
		// on the context maps these to the full physical backing store.
		this._camera.clearRect(0, 0, this._camera.logicalWidth(), this._camera.logicalHeight());

		this._player.draw(this._camera);

		this._movingObjects.forEach(obj => obj.draw(this._camera));

		this._staticObjects.forEach(obj => {
			if (obj.draw) obj.draw(this._camera, 'main');
		});

		this._uiElements.forEach(obj => {
			if (obj.draw) obj.draw(this._camera, 'main');
		});
	}
}



// Source: engine-1026a/camera.js
class Camera {
	constructor(ctx) {
		this._ctx = ctx;
		this._images = {};
		this._centralSprite = null;
	}

	// Logical (CSS) dimensions — independent of devicePixelRatio.
	// All game coordinate calculations must use these so that world coordinates
	// stay in logical pixels regardless of the backing-store scale.
	logicalWidth() {
		const styleWidth = this._ctx.canvas.style.width;
		return styleWidth ? parseFloat(styleWidth) : this._ctx.canvas.width;
	}

	logicalHeight() {
		const styleHeight = this._ctx.canvas.style.height;
		return styleHeight ? parseFloat(styleHeight) : this._ctx.canvas.height;
	}

	storeLoadedImage(key, image) {
		this._images[key] = image;
	}

	getLoadedImage(key) {
		return this._images[key];
	}

	followSprite(sprite) {
		this._centralSprite = sprite;
	}

	getCentralPosition() {
		return {
			map: this._centralSprite.mapPosition,
			canvas: [
				Math.round(this.logicalWidth() * 0.5),
				Math.round(this.logicalHeight() * 0.5),
				0
			]
		};
	}

	mapPositionToCanvasPosition(position) {
		var central = this.getCentralPosition();
		var mapDifferenceX = central.map[0] - position[0];
		var mapDifferenceY = central.map[1] - position[1];
		return [central.canvas[0] - mapDifferenceX, central.canvas[1] - mapDifferenceY];
	}

	canvasPositionToMapPosition(position) {
		var central = this.getCentralPosition();
		var mapDifferenceX = central.canvas[0] - position[0];
		var mapDifferenceY = central.canvas[1] - position[1];
		return [central.map[0] - mapDifferenceX, central.map[1] - mapDifferenceY];
	}

	getCentreOfViewport() {
		return Math.floor(this.logicalWidth() / 2);
	}

	getMiddleOfViewport() {
		return Math.floor(this.logicalHeight() / 2);
	}

	getBelowViewport() {
		return Math.floor(this.logicalHeight());
	}

	getMapBelowViewport() {
		var below = this.getBelowViewport();
		return this.canvasPositionToMapPosition([0, below])[1];
	}

	getAboveViewport() {
		return 0 - Math.floor(this.logicalHeight() / 4);
	}

	getTopOfViewport() {
		return this.canvasPositionToMapPosition([0, 0])[1];
	}

	getRandomlyInTheCentreOfCanvas(buffer) {
		var min = 0;
		var max = this.logicalWidth();
		if (buffer) {
			min -= buffer;
			max += buffer;
		}
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	getRandomlyInTheCentreOfMap(buffer) {
		var random = this.getRandomlyInTheCentreOfCanvas(buffer);
		return this.canvasPositionToMapPosition([random, 0])[0];
	}

	getRandomMapPositionBelowViewport() {
		var xCanvas = this.getRandomlyInTheCentreOfCanvas();
		var yCanvas = this.getBelowViewport();
		return this.canvasPositionToMapPosition([xCanvas, yCanvas]);
	}

	getRandomMapPositionAboveViewport() {
		var xCanvas = this.getRandomlyInTheCentreOfCanvas();
		var yCanvas = this.getAboveViewport();
		return this.canvasPositionToMapPosition([xCanvas, yCanvas]);
	}

	// Returns a proxy that forwards unknown property access to the underlying
	// CanvasRenderingContext2D, so callers can use native canvas API methods
	// (drawImage, fillText, measureText, clearRect, font, canvas, etc.) directly.
	static create(ctx) {
		const camera = new Camera(ctx);
		return new Proxy(camera, {
			get(target, prop) {
				if (prop in target) {
					const val = target[prop];
					return typeof val === 'function' ? val.bind(target) : val;
				}
				const ctxVal = ctx[prop];
				if (typeof ctxVal === 'function') return ctxVal.bind(ctx);
				return ctxVal;
			},
			set(target, prop, value) {
				if (prop in target) {
					target[prop] = value;
				} else {
					ctx[prop] = value;
				}
				return true;
			}
		});
	}
}



// Source: run.js
const VERSION='alpine-1026a',clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const COURSES=[['First Snow',3600,0,5,0],['Pine Parade',4800,0,7,0],['Little Air',5400,0,7,1],['Sunset Switchbacks',6000,1,8,1],['Cocoa Crossing',6800,1,8,2],['Yeti Playdate',7500,1,9,3],['Aurora Alley',8200,2,10,3],['The Alpine Ribbon',9000,2,11,4]].map(([name,length,theme,gates,mode])=>({name,length,theme,gates,mode}));
function course(n){return COURSES[n]||{name:'Expedition '+(n-7),length:9000+Math.min(10,n-7)*600,theme:n%3,gates:12,mode:4}}
const parts={south:[0,0,60,80]},playerData={id:'player',parts,hitBoxes:{0:[-13,-16,13,7],1:[-13,-16,13,7]}};
const DATA={tree:{parts,hitBoxes:{0:[-25,-12,25,12],1:[-25,-12,25,12]},zIndexesOccupied:[0,1]},rock:{parts,hitBoxes:{0:[-26,-10,26,10]}},ramp:{parts,hitBoxes:{0:[-45,-18,45,18]}},cocoa:{parts,hitBoxes:{0:[-25,-18,25,18],1:[-30,-25,30,25]},zIndexesOccupied:[0,1]}};
for(const d of Object.values(DATA))d.hitBehaviour={};
class SnowSkier extends Skier{
 constructor(run){super(playerData);this.run=run;this.air=0;this.airMax=.95;this.crash=0;this.safe=1;this.jumpCD=0;this.boost=0;this.boostCD=0;this._standardSpeed=5;this.setTurnEaseCycles(4)}
 hasHitObstacle(obs){if(this.safe>0||this.run.ended)return;this._setOuching();this.crash=.85;this.safe=2.1;this._obstaclesHit.push(obs.id);this.run.hp--;this.run.crashes++;this.run.chain=0;this.run.events.push({type:'crash',x:this.mapPosition[0],y:this.mapPosition[1]});if(this.run.hp<=0)this.run.finish(false)}
 hasHitJump(){if(this.crash>0||this.air>0||this.jumpCD>0||this.run.ended)return false;this._setJumping();this.air=this.airMax;this.jumpCD=1.8;this.run.jumps++;this.run.events.push({type:'jump',x:this.mapPosition[0],y:this.mapPosition[1]});return true}
 speedBoost(){if(this.boostCD>0||this.run.ended)return false;this.boost=1.3;this.boostCD=4;this.run.events.push({type:'boost',x:this.mapPosition[0],y:this.mapPosition[1]});return true}
 attemptTrick(){if(this.air>0)this.isPerformingTrick=true}
 cycle(dt=1){let sec=dt/50;this.safe=Math.max(0,this.safe-sec);this.jumpCD=Math.max(0,this.jumpCD-sec);this.boostCD=Math.max(0,this.boostCD-sec);this.boost=Math.max(0,this.boost-sec);if(this.crash>0){this.crash=Math.max(0,this.crash-sec);if(this.crash===0)this._setNormal()}if(this.air>0){this.air=Math.max(0,this.air-sec);this._trickStep=Math.floor((this.airMax-this.air)*7)%3;if(this.air===0){this._setNormal();this.run.score+=30;this.run.events.push({type:'land',x:this.mapPosition[0],y:this.mapPosition[1]})}}this.setSpeed(5*(this.boost>0?1.6:1)+(this.air>0?2:0));super.cycle(dt)}
}
class Run{
 constructor(level=0,seed=Date.now(),skin=0){this.v=1;this.level=level;this.seed=seed>>>0;this.initialSeed=seed>>>0;this.skin=skin;this.time=0;this.hp=3;this.score=0;this.chain=0;this.bestChain=0;this.passed=0;this.missed=0;this.crashes=0;this.jumps=0;this.near=0;this.cocoa=0;this.won=false;this.ended=false;this.events=[];this.rows=[];this.gates=[];this.trails=[];this.player=new SnowSkier(this);let ctx={canvas:{width:600,height:900,style:{}}};this.camera=Camera.create(ctx);this.game=new Game(this.camera,this.player);this.player.setMapPosition(300,0,0);this.player.setMapPositionTarget(300,600);this.camera.getCentralPosition=()=>({map:[300,this.player.mapPosition[1],0],canvas:[300,260,0]});this.makeWorld();this.sync();}
 random(){this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296}
 add(type,x,y,extra={}){let desc={type,x,y,id:type+'-'+this.rows.length,used:false,near:false,...extra};let o=new Sprite({...DATA[type],id:desc.id});o.kind=type;o.desc=desc;o.setMapPosition(x,y);o.setSpeed(0);o.width=60;o.height=80;o.onHitting(this.player,()=>{if(desc.used||o.deleted)return;if(type==='cocoa'){desc.used=true;o.deleted=true;this.cocoa++;this.score+=120;this.hp=Math.min(3,this.hp+1);this.events.push({type:'cocoa',x,y})}else if(type==='ramp'){if(this.player.hasHitJump()){desc.used=true}}else this.player.hasHitObstacle(o)});this.rows.push(desc);this.game.addStaticObject(o);return o}
 makeWorld(){let c=course(this.level),centers=[300];for(let i=1;i<c.gates;i++)centers.push(clamp(centers[i-1]+(this.random()-.5)*(this.level?230:140),150,450));if(this.level===0)centers=[300,200,400,220,380];for(let i=0;i<c.gates;i++){let y=360+i*(c.length-750)/(c.gates-1),x=centers[i];this.gates.push({x,y,w:this.level<2?170:145,done:false,passed:false});if(i>0){let side=(centers[i+1]??300)>x?-1:1;this.add(i%3===0?'rock':'tree',clamp(x+side*(140+this.random()*75),70,530),y+150,{tall:i%2===0});if(c.mode>=1&&i%2===1)this.add('ramp',x,y+245);if(c.mode>=2&&i%3===0)this.add('cocoa',x,y-140)}}for(let y=-200;y<c.length+700;y+=180){this.rows.push({type:'decor',x:20+this.random()*40,y,id:'decor-'+y});this.rows.push({type:'decor',x:540+this.random()*40,y:y+60,id:'decor-r-'+y})}if(c.mode>=3){this.yeti=new Monster({id:'yeti',parts,zIndexesOccupied:[0,1],hitBoxes:{0:[-23,-20,23,15],1:[-23,-20,23,15]}});this.yeti.setMapPosition(300,-500);this.yeti.setSpeed(4.7);this.yeti.follow(this.player);this.yeti.width=70;this.yeti.height=90;this.yeti.onHitting(this.player,()=>{if(this.player.safe===0){this.player.hasHitObstacle(this.yeti);this.yeti.setMapPosition(this.player.mapPosition[0],this.player.mapPosition[1]-400)}});this.game.addMovingObject(this.yeti,'monster')}
 }
 sync(){for(const o of [...this.game._staticObjects,...this.game._movingObjects,this.player]){o.canvasX=o.mapPosition[0];o.canvasY=o.mapPosition[1];o.width=60;o.height=80}}
 step(sec=1/60,input={}){if(this.ended)return;sec=clamp(sec,0,.05);this.time+=sec;let p=this.player,c=course(this.level);if(input.jump)p.hasHitJump();if(input.boost)p.speedBoost();this.game.setMouseX(clamp(input.x??p.mapPosition[0],40,560));this.game.setMouseY(850);if(c.mode>=4&&p.air===0)p.mapPosition[0]+=Math.sin(this.time*.8)*14*sec;this.sync();if(p.crash===0)p.startMovingIfPossible();this.game.cycle(sec*50);p.mapPosition[0]=clamp(p.mapPosition[0],40,560);this.sync();if(this.ended)return;for(const g of this.gates)if(!g.done&&p.mapPosition[1]>=g.y){g.done=true;g.passed=Math.abs(p.mapPosition[0]-g.x)<g.w/2;if(g.passed){this.passed++;this.chain++;this.bestChain=Math.max(this.bestChain,this.chain);this.score+=100+Math.min(5,this.chain)*25;this.events.push({type:'gate',x:g.x,y:g.y,chain:this.chain});if(this.chain%3===0)p.speedBoost()}else{this.missed++;this.chain=0;this.events.push({type:'miss',x:g.x,y:g.y})}}
 for(const r of this.rows)if(!r.near&&['tree','rock'].includes(r.type)&&p.mapPosition[1]>r.y+35){r.near=true;let d=Math.abs(p.mapPosition[0]-r.x);if(d>40&&d<80){this.near++;this.score+=60;this.events.push({type:'near',x:p.mapPosition[0],y:p.mapPosition[1]})}}
 if(p.isMoving&&p.air===0){this.trails.push({x:p.mapPosition[0],y:p.mapPosition[1],dx:p.getSpeedX()*(p.movingToward?.[0]<p.mapPosition[0]?-1:1)});if(this.trails.length>150)this.trails.shift()}if(p.mapPosition[1]>=c.length)this.finish(true);this.events=this.events.slice(-80)}
 finish(won){if(this.ended)return;this.ended=true;this.won=won;if(won&&this.player.air>0){this.player.air=0;this.player._setNormal();this.score+=30;this.events.push({type:'land',x:this.player.mapPosition[0],y:this.player.mapPosition[1]})}if(won)this.score+=500+this.hp*100;this.events.push({type:won?'win':'loss'})}
 drain(){let e=this.events;this.events=[];return e}
 stars(){return this.won?1+Number(this.passed>=Math.ceil(this.gates.length*.75))+Number(this.crashes===0):0}
 snapshot(){let p=this.player;const fields=['mapPosition','movingToward','isMoving','hasBeenHit','isOuching','isJumping','isPerformingTrick','air','crash','safe','jumpCD','boost','boostCD','_speedX','_speedXFactor','_speedY','_speedYFactor','_pixelsTravelled','_trickStep','_obstaclesHit'];return {v:1,level:this.level,seed:this.initialSeed??this.seed,skin:this.skin,time:this.time,hp:this.hp,score:this.score,chain:this.chain,bestChain:this.bestChain,passed:this.passed,missed:this.missed,crashes:this.crashes,jumps:this.jumps,near:this.near,cocoa:this.cocoa,won:this.won,ended:this.ended,gates:this.gates,rows:this.rows.map(r=>({id:r.id,used:r.used,near:r.near})),player:Object.fromEntries(fields.map(k=>[k,p[k]])),yeti:this.yeti?{position:this.yeti.mapPosition}:null}}
 static restore(d){try{if(typeof d==='string')d=JSON.parse(d);d=structuredClone(d);if(d.v!==1||!Number.isInteger(d.level)||d.level<0||d.level>1000||!Number.isFinite(d.seed)||!d.player||!Array.isArray(d.player.mapPosition)||!d.player.mapPosition.every(Number.isFinite)||!['time','hp','score','chain','bestChain','passed','missed','crashes','jumps','near','cocoa'].every(k=>Number.isFinite(d[k]))||d.hp<0||d.hp>3||d.rows?.length>220||!Array.isArray(d.gates)||d.gates.length>12)return null;let r=new Run(d.level,d.seed,d.skin);for(const k of ['time','hp','score','chain','bestChain','passed','missed','crashes','jumps','near','cocoa','won','ended'])r[k]=d[k];Object.assign(r.player,d.player);for(const a of d.rows){let b=r.rows.find(q=>q.id===a.id);if(b){b.used=a.used;b.near=a.near;let o=r.game._staticObjects.find(q=>q.id===a.id);if(o&&b.type==='cocoa'&&a.used)o.deleted=true}}r.gates=d.gates;if(r.yeti&&d.yeti)r.yeti.setMapPosition(...d.yeti.position);r.sync();return r}catch{return null}}
}
function create(n=0,seed=1234,skin=0){let r=new Run(n,seed,skin);r.initialSeed=seed>>>0;return r}
function reward(profile,r){if(!r.won)return;if(r.level<8){profile.best[r.level]=Math.max(profile.best[r.level],r.stars());profile.scores[r.level]=Math.max(profile.scores[r.level],r.score);profile.unlocked=Math.max(profile.unlocked,Math.min(8,r.level+1))}else profile.expedition=Math.max(profile.expedition||0,r.level-7)}

// Source: art.js
class Art{
 constructor(canvas,atlas,frames,vista){this.vista=vista;this.g=canvas.getContext('2d');this.atlas=atlas;this.frames=frames;this.t=0;this.fx=[];this.words=[];this.shake=0;this.land=0}
 sprite(i,x,y,h,angle=0,flip=false){const g=this.g,r=this.frames[i],k=h/r[3];g.save();g.translate(x,y);g.rotate(angle);if(flip)g.scale(-1,1);g.drawImage(this.atlas,...r,-r[2]*k/2,-h,r[2]*k,h);g.restore()}
 event(e){let n=e.type==='crash'?25:e.type==='land'?20:12;for(let i=0;i<n;i++){let a=Math.random()*6.28,v=25+Math.random()*100;this.fx.push({x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,life:.4+Math.random()*.5,r:2+Math.random()*4,c:e.type==='gate'?'#ffe5a1':'#fffaf0'})}const labels={gate:e.chain>1?'PERFECT ×'+e.chain:'NICE LINE!',near:'SO CLOSE! +60',cocoa:'COZY! +120',land:'SOFT LANDING',crash:'POOF!',boost:'SWISH!'};if(labels[e.type]){let lane=this.words.length%3;this.words.push({text:labels[e.type],x:e.x,y:e.y-110-lane*30,t:0,life:1})}if(e.type==='crash')this.shake=.22;if(e.type==='land')this.land=.25;this.fx=this.fx.slice(-150);this.words=this.words.slice(-5)}
 draw(r,dt){let g=this.g,p=r.player,theme=course(r.level).theme,t=this.t+=dt,py=p.mapPosition[1],project=(x,y)=>[x,y-py+260];this.land=Math.max(0,this.land-dt);g.clearRect(0,0,600,900);g.save();if(this.shake>0){this.shake-=dt;g.translate(Math.sin(t*91)*3,Math.cos(t*71)*2)}let snow=g.createLinearGradient(0,0,600,900);snow.addColorStop(0,['#d3e5ed','#e1d8ec','#8aacc9'][theme]);snow.addColorStop(1,['#fff8eb','#fff0e5','#dbe7ed'][theme]);g.fillStyle=snow;g.fillRect(0,0,600,900);
 // Distant three-layer alpine silhouette; camera parallax is deliberately slower than the piste.
 g.save();g.globalAlpha=.8;for(let layer=0;layer<3;layer++){let base=55+layer*36;g.fillStyle=[['#98b9c9','#b4d0d9','#cde1e5'],['#a797b8','#c2b2cc','#d5ccde'],['#284d70','#426f91','#6a94b1']][theme][layer];g.beginPath();g.moveTo(0,base+50);for(let x=-40;x<670;x+=40){let h=Math.sin(x*.021+layer)*24+Math.sin(x*.058+layer)*12;g.lineTo(x,base+h)}g.lineTo(600,base+100);g.lineTo(0,base+100);g.fill()}g.restore();if(this.vista){g.save();g.globalAlpha=theme===2?.55:.88;if(theme===1)g.filter="sepia(.15) hue-rotate(330deg)";g.drawImage(this.vista,0,-65,600,345);g.restore();let fade=g.createLinearGradient(0,130,0,290);fade.addColorStop(0,"rgba(228,238,235,0)");fade.addColorStop(1,["#e6eeee","#eee5ec","#9fb9d0"][theme]);g.fillStyle=fade;g.fillRect(0,130,600,160)}if(theme===2){let aurora=g.createLinearGradient(0,0,600,150);aurora.addColorStop(0,'#91efbd00');aurora.addColorStop(.5,'#91efbd55');aurora.addColorStop(1,'#afa3ef00');g.fillStyle=aurora;g.fillRect(0,0,600,150)}
 // Gentle contours, snow sparkles and directional groomer marks move with the real world.
 for(let i=0;i<20;i++){let y=((i*95-py*.65)%980+980)%980;g.strokeStyle=theme===2?'#f8ffff20':'#a8c1cf22';g.lineWidth=2;g.beginPath();g.ellipse(110+(i*177)%440,y,80,9,-.13,0,7);g.stroke()}
 g.strokeStyle=['#6f9caf65','#3eafac77','#b194d988','#d9a65488'][r.skin]||'#6f9caf45';g.lineWidth=2;for(let i=1;i<r.trails.length;i++){let a=r.trails[i-1],b=r.trails[i];if(Math.abs(b.x-a.x)>60)continue;for(let side of [-7,7]){let aa=project(a.x+side,a.y),bb=project(b.x+side,b.y);g.beginPath();g.moveTo(...aa);g.lineTo(...bb);g.stroke()}}
 for(const gate of r.gates){let [x,y]=project(gate.x,gate.y);if(y< -80||y>980)continue;let color=gate.done?(gate.passed?'#4ca6a3':'#a5a8b4'):'#d2695a';g.strokeStyle=color;g.lineWidth=3;g.setLineDash([7,8]);g.beginPath();g.moveTo(x-gate.w/2,y);g.lineTo(x+gate.w/2,y);g.stroke();g.setLineDash([]);this.sprite(14,x-gate.w/2,y+18,82);this.sprite(14,x+gate.w/2,y+18,82,0,true);if(!gate.done){g.fillStyle='#fff7d3aa';g.beginPath();g.ellipse(x,y,21,8,0,0,7);g.fill()}}
 let finishY=course(r.level).length-py+260;if(finishY<1000){g.fillStyle='#be6f65';g.fillRect(80,finishY,440,12);for(let x=80;x<520;x+=20){g.fillStyle=(x/20)%2?'#f8f3d9':'#456f82';g.fillRect(x,finishY,20,12)}g.font='bold 25px Georgia';g.textAlign='center';g.fillStyle='#325268';g.fillText('COCOA LODGE',300,finishY-18);this.sprite(12,500,finishY+90,190)}
 const objects=[];for(const a of r.rows){if(a.used&&a.type==='cocoa')continue;let [x,y]=project(a.x,a.y);if(y< -230||y>1100)continue;objects.push({y,draw:()=>{this.shadow(x,y, a.type==='decor'?32:24);if(a.type==='decor')this.sprite(a.id.includes('-r-')?9:8,x,y+12,155+(a.y%3)*12);else if(a.type==='tree')this.sprite(a.tall?9:8,x,y+12,a.tall?155:123);else if(a.type==='rock')this.sprite(10,x,y+10,68);else if(a.type==='ramp')this.sprite(11,x,y+12,72);else if(a.type==='cocoa'){g.save();g.shadowBlur=15;g.shadowColor='#ffcf92';this.sprite(15,x,y+8+Math.sin(t*4)*4,49);g.restore()}}})}
 if(r.yeti){let q=r.yeti.mapPosition,[x,y]=project(q[0],q[1]);if(y> -100&&y<1000)objects.push({y,draw:()=>{this.shadow(x,y,27);this.sprite(13,x,y+8,100+Math.sin(t*9)*3)}})}
 let [x,y]=project(p.mapPosition[0],p.mapPosition[1]),air=p.air>0?Math.sin(p.air/p.airMax*Math.PI)*72:0;objects.push({y:y+10,draw:()=>{this.shadow(x,y,25-air*.09);let lean=p.movingToward?.[0]-p.mapPosition[0],i=r.won?7:p.crash>0?6:p.air>0?(p.isPerformingTrick?5:4):p.boost>0?3:lean< -10?1:lean>10?2:0;let angle=p.air>0&&p.isPerformingTrick?(1-p.air/p.airMax)*6.28:0;if(p.safe>0&&r.crashes>0)g.globalAlpha=.65+Math.sin(t*20)*.25;this.sprite(i,x,y+17-air,109*(1-.12*Math.sin(this.land/.25*Math.PI)),angle);g.globalAlpha=1;if(Math.abs(lean)>25&&p.air===0&&p.isMoving){for(let j=0;j<6;j++){g.fillStyle='#fffdf0aa';g.beginPath();g.arc(x-(lean>0?1:-1)*(17+j*4),y+9+j*4,3+j*.5,0,7);g.fill()}}}});objects.sort((a,b)=>a.y-b.y);objects.forEach(o=>o.draw());
 for(const f of this.fx){f.t+=dt;if(f.t>=f.life)continue;f.x+=f.vx*dt;f.y+=f.vy*dt;let [x,y]=project(f.x,f.y);g.globalAlpha=1-f.t/f.life;g.fillStyle=f.c;g.beginPath();g.arc(x,y,f.r*(1-f.t/f.life),0,7);g.fill();g.globalAlpha=1}for(const w of this.words){w.t+=dt;if(w.t>=w.life)continue;let [x,y]=project(w.x,w.y);g.save();g.globalAlpha=Math.min(1,(w.life-w.t)*3);g.textAlign='center';g.font='bold 20px Georgia';g.strokeStyle='#42536c';g.lineWidth=4;g.strokeText(w.text,x,y-w.t*14);g.fillStyle='#fff1be';g.fillText(w.text,x,y-w.t*14);g.restore()}this.fx=this.fx.filter(f=>f.t<f.life);this.words=this.words.filter(w=>w.t<w.life);g.restore()}
 shadow(x,y,r){let g=this.g;g.fillStyle='#294b7140';g.beginPath();g.ellipse(x+9,y+7,r,r*.30,-.2,0,7);g.fill()}
}

// Source: game.js
const $=id=>document.getElementById(id),STORE='alpine-swish-1026a';let active=false;let profile={best:Array(8).fill(0),scores:Array(8).fill(0),unlocked:0,skin:0,expedition:0,sound:false},r,art,paused=true,targetX=300,held=0,keys=new Set(),last=0,acc=0,saveClock=0,toastLeft=0,audio=null,voices=0;
try{let d=JSON.parse(localStorage.getItem(STORE));if(d?.profile?.best?.length===8&&d.profile.scores?.length===8){profile={...profile,...d.profile};profile.best=profile.best.map(x=>clamp(Number(x)||0,0,3));profile.unlocked=clamp(profile.unlocked|0,0,8);profile.skin=clamp(profile.skin|0,0,3);r=Run.restore(d.run)}}catch{}r||=create(0,Date.now(),profile.skin);targetX=r.player.mapPosition[0];active=r.time>0;
function save(){try{localStorage.setItem(STORE,JSON.stringify({profile,run:r.snapshot()}))}catch{}}
function tone(f,d=.13,type='sine',vol=.06){if(!profile.sound||paused||voices>=12)return;try{audio||=new(window.AudioContext||window.webkitAudioContext)();audio.resume();let o=audio.createOscillator(),v=audio.createGain();o.type=type;o.frequency.setValueAtTime(f,audio.currentTime);o.frequency.exponentialRampToValueAtTime(Math.max(40,f*.7),audio.currentTime+d);v.gain.setValueAtTime(vol,audio.currentTime);v.gain.exponentialRampToValueAtTime(.001,audio.currentTime+d);o.connect(v).connect(audio.destination);o.start();o.stop(audio.currentTime+d);voices++;o.onended=()=>voices--}catch{}}
function toast(t,sec=3){$('toast').textContent=t;$('toast').style.opacity=1;toastLeft=sec}
function clearInput(){held=0;keys.clear();targetX=r.player.mapPosition[0]}
function modal(html){paused=true;clearInput();$('panel').innerHTML=html;$('overlay').hidden=false;audio?.suspend();save()}
function resume(){clearInput();paused=false;$('overlay').hidden=true;last=performance.now();acc=0;tone(720)}
function start(n){active=false;r=create(n,Date.now(),profile.skin);art.fx=[];art.words=[];resume();targetX=300;toast('Touch the snow to start. Follow the flags!',5);save()}
function map(){const stars=profile.best.reduce((a,b)=>a+b,0);modal('<small>THE COCOA LODGE TRAILBOOK</small><h1>Pick a little adventure.</h1><p>'+stars+' / 24 stars · '+profile.expedition+' expeditions</p><div class="trails">'+COURSES.map((c,i)=>'<button data-course="'+i+'" '+(i>profile.unlocked?'disabled':'')+'>'+(i+1)+' · '+c.name+'<small>'+Math.round(c.length/18)+'m · '+'★'.repeat(profile.best[i])+'☆'.repeat(3-profile.best[i])+'</small></button>').join('')+'</div>'+(profile.unlocked===8?'<button id="expedition" class="primary">Fresh expedition →</button>':'')+'<h2>Trail ribbons</h2><div class="skins">'+['Snow','Seafoam · 6★','Lilac · 12★','Honey · 18★'].map((t,i)=>'<button data-skin="'+i+'" class="'+(profile.skin===i?'selected':'')+'" '+(stars<i*6?'disabled':'')+'>'+t+'</button>').join('')+'</div><button id="back">Back to the slope</button><button id="credits">Credits</button>');document.querySelectorAll('[data-course]').forEach(b=>b.onclick=()=>start(+b.dataset.course));document.querySelectorAll('[data-skin]').forEach(b=>b.onclick=()=>{profile.skin=+b.dataset.skin;save();map()});if($('expedition'))$('expedition').onclick=()=>start(8+profile.expedition);$('back').onclick=()=>r.ended?start(r.level):resume();$('credits').onclick=()=>{modal('<h1>A fresh mountain.</h1><p>Built on the actual <a href="https://github.com/basicallydan/skifree.js" target="_blank" rel="noopener">SkiFree.js</a> engine.<br>MIT · Daniel Hough, 2013.<br>Original new alpine artwork and synthesized sounds.<br>Original game sprites and analytics are excluded.</p><button id="return">Trailbook</button>');$('return').onclick=map}}
function results(){modal('<small>'+course(r.level).name.toUpperCase()+'</small><h1>'+(r.won?'Cocoa is waiting!':'A soft landing. Try again?')+'</h1><div class="stars">'+(r.won?'★'.repeat(r.stars())+'☆'.repeat(3-r.stars()):'❄')+'</div><div class="stats"><span>'+r.passed+' / '+r.gates.length+' flags</span><span>'+r.score+' points</span><span>'+r.jumps+' jumps</span></div><p>'+(r.won?'Finish · Catch 75% of flags · No tumbles.<br>Three little goals. One lovely run.':'Steer around the trees. Jump over low rocks.<br>There is always another snowy morning.')+'</p>'+(r.won?'<button id="next" class="primary">'+(r.level>=7?'Next expedition →':'Next slope →')+'</button>':'')+'<button id="retry">Try again</button><button id="trail">Trailbook</button>');if($('next'))$('next').onclick=()=>start(r.level+1);$('retry').onclick=()=>start(r.level);$('trail').onclick=map}
function events(){for(const e of r.drain()){if(['gate','jump','land','near','crash','cocoa','boost'].includes(e.type))art.event(e);if(e.type==='gate'){tone(600+Math.min(5,e.chain)*110,.15,'triangle');if(e.chain>1)toast('A lovely line! ×'+e.chain,1.6)}if(e.type==='jump')tone(430,.1);if(e.type==='land')tone(180,.16,'triangle',.04);if(e.type==='crash'){tone(95,.23,'triangle',.1);toast('Poof! Back on your skis.',2)}if(e.type==='boost'){tone(1200,.25);toast('SWISH! Three flags. A little speed!',2)}if(e.type==='cocoa'){tone(970,.25);toast('Warm cocoa. One heart back!',2)}if(e.type==='win'||e.type==='loss'){if(r.won)reward(profile,r);save();clearInput();let done=r;setTimeout(()=>{if(r===done&&r.ended)results()},800)}}}
function pause(){if(paused)return;modal('<small>SNOW CAN WAIT</small><h1>A little breather.</h1><p>Drag left or right to steer.<br>Jump over low obstacles. Follow the flags.</p><button id="continue" class="primary">Continue</button><button id="restart">Restart</button><button id="trail">Trailbook</button>');$('continue').onclick=resume;$('restart').onclick=()=>start(r.level);$('trail').onclick=map}
$('pause').onclick=pause;$('map').onclick=map;$('sound').onclick=()=>{profile.sound=!profile.sound;$('sound').style.opacity=profile.sound?1:.4;if(profile.sound)tone(880);else audio?.suspend();save()};$('sound').style.opacity=profile.sound?1:.4;
function engage(){if(!active){active=true;toast('Follow the flags. Find your line!',3)}}
function jump(){if(!paused){engage();r.player.hasHitJump();r.player.attemptTrick();events()}}$('jump').onpointerdown=e=>{e.preventDefault();jump()};let pointer=null;
function steer(e){engage();let q=$('stage').getBoundingClientRect();targetX=clamp((e.clientX-q.x)/q.width*600,40,560)}$('stage').onpointerdown=e=>{if(paused)return;e.preventDefault();pointer=e.pointerId;e.currentTarget.setPointerCapture(e.pointerId);steer(e)};$('stage').onpointermove=e=>{if(e.pointerId===pointer&&!paused)steer(e)};$('stage').onpointerup=()=>pointer=null;$('stage').onpointercancel=()=>{pointer=null;clearInput()};
for(const [id,dir] of [['left',-1],['right',1]]){$(id).onpointerdown=e=>{if(paused)return;e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);held=dir;engage()};$(id).onpointerup=$(id).onpointercancel=()=>{held=0;targetX=r.player.mapPosition[0]}}
window.addEventListener('keydown',e=>{let k=e.key.toLowerCase();if(!paused&&['arrowleft','arrowright','a','d',' '].includes(k)){e.preventDefault();keys.add(k);engage();if(e.code==='Space'&&!e.repeat)jump()}if(e.key==='Escape')pause()});window.addEventListener('keyup',e=>{keys.delete(e.key.toLowerCase());targetX=r.player.mapPosition[0]});window.addEventListener('blur',()=>{clearInput();pause()});document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});window.addEventListener('pagehide',save);
function frame(now){let dt=Math.min(1,(now-last)/1000||0);last=now;if(!paused&&active){acc+=dt;let i=0;while(acc>=1/60&&i++<60){let dir=held+(keys.has('arrowright')||keys.has('d')?1:0)-(keys.has('arrowleft')||keys.has('a')?1:0);r.step(1/60,{x:dir?dir>0?560:40:targetX});acc-=1/60}events();saveClock+=dt;if(saveClock>1.5){save();saveClock=0}toastLeft-=dt;if(toastLeft<0)$('toast').style.opacity=0}art.draw(r,paused?0:dt);$('name').textContent=course(r.level).name;$('hp').textContent='♥ '.repeat(r.hp)+'♡ '.repeat(3-r.hp);$('distance').textContent=Math.min(Math.round(r.player.mapPosition[1]/18),Math.round(course(r.level).length/18))+' / '+Math.round(course(r.level).length/18)+'m';$('score').textContent=r.score.toLocaleString();document.querySelector('#progress i').style.width=Math.min(100,r.player.mapPosition[1]/course(r.level).length*100)+'%';$('jumpLabel').textContent=r.player.jumpCD>0?r.player.jumpCD.toFixed(1)+'s':'JUMP';requestAnimationFrame(frame)}
try{let atlas=new Image(),vista=new Image();atlas.src='./assets/atlas-1026a.webp';vista.src='./assets/vista-1026a.webp';await Promise.race([Promise.all([atlas.decode(),vista.decode()]),new Promise((_,fail)=>setTimeout(()=>fail(Error('Art load timeout')),35000))]);let frames=[[40, 15, 218, 290], [342, 37, 249, 255], [662, 40, 255, 255], [1011, 64, 200, 242], [27, 330, 257, 249], [367, 332, 222, 260], [643, 402, 293, 208], [987, 329, 241, 285], [37, 665, 244, 257], [356, 639, 229, 294], [661, 750, 244, 173], [947, 675, 287, 252], [21, 951, 292, 277], [368, 957, 258, 268], [707, 943, 199, 278], [999, 972, 235, 242]];art=new Art($('stage'),atlas,frames,vista);requestAnimationFrame(frame);if(r.ended)map();else{modal('<small>FRESH SNOW. LITTLE ADVENTURES.</small><div class="badge">❄</div><h1>Alpine Swish</h1><p>Drag to steer. Follow the flags.<br>A little jump makes a big smile.</p><button id="begin" class="primary">'+(r.time>0?'Continue the run':'Let it snow!')+'</button><button id="trail">Trailbook</button>');$('begin').onclick=()=>{resume();toast(r.time>0?'Follow the flags. Find your line!':'Touch the snow to start. Drag to steer!',5)};$('trail').onclick=map}}catch(e){modal('<h1>A little snow delay.</h1><p>The artwork could not load.<br>Check your connection and try again.</p><button onclick="location.reload()">Try again</button>');console.error(e)}

})().catch(e=>console.error(e));

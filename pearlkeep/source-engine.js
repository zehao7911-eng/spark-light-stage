/* Adapted from Orbium, GPL-2.0. Full original code and license in upstream/. */
const orbium = {loader:{},width:500,height:500};

(function (orbium, undefined) {
  orbium.Util = {};

  orbium.Util.withinRect = function (xchk, ychk, xpos, ypos, width, height) {
    if (xchk >= xpos && xchk <= xpos + width) {
      if (ychk >= ypos && ychk <= ypos + height) {
        return true;
      }
    }

    return false;
  };

  orbium.Util.addArrayElement = function (array, element) {
    array.push(element);
  };

  orbium.Util.setArrayElement = function (idx, array, element) {
    array[idx] = element;
  };

  orbium.Util.removeArrayElement = function (array, element) {
    for (var i = 0, j = array.length; i < j; i++) {
      if (array[i] === element) {
        array.splice(i, 1);
        return;
      }
    }
  };

  orbium.Util.generateRandomIndex = function (max) {
    var rand = Math.random();

    for (var i = 0; i < max; i++) {
      if (rand < (i + 1) / (max + 1)) {
        return i;
      }
    }

    return max;
  };

  orbium.Util.generateUniqeString = function () {
    var allowed = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "abcdefghijklmnopqrstuvwxyz";

    var chars = allowed.split("");

    var arr = [];

    for (var i = 0; i < 6; i++) {
      arr[i] = chars[0 | Math.random() * chars.length];
    }

    return arr.join("");
  };

  orbium.Util.attachListener = function (element, event, func) {
    element.addEventListener(event, func, true);
  };

  orbium.Util.detachListener = function (element, event, func) {
    element.removeEventListener(event, func, true);
  };

  orbium.Util.getRequestParameter = function (name) {
    function getRequestParameters() {
      var result = {};
      var url = window.location.href;
      var parameters = url.slice(url.indexOf("?") + 1).split("&");

      for (var i = 0, j = parameters.length; i < j; i++) {
        var parameter = parameters[i].split("=");

        result[parameter[0]] = parameter[1];
      }

      return result;
    }

    return getRequestParameters()[name];
  };
})(orbium);

(function (orbium, undefined) {
  orbium.Sprite = function () {
    this.xpos = null;
    this.ypos = null;
    this.width = null;
    this.height = null;

    orbium.Sprite.prototype.construct = function (images, xpos, ypos, width, height) {
      this.xpos = xpos;
      this.ypos = ypos;
      this.width = width;
      this.height = height;

      this.images = [];

      for (var i = 0, j = images.length; i < j; i++) {
        this.setImage(i, images[i]);
      }

      this.dirty = true;
    };

    orbium.Sprite.prototype.destruct = function () {
      var len = this.images.length;

      for (var i = 0; i < len; i++) {
        this.setImage(i, null);
      }
    };

    orbium.Sprite.prototype.setImage = function (idx, image) {
      if (image !== null) {
        this.images[idx] = orbium.loader[image];
      } else {
        this.images[idx] = null;
      }
    };

    orbium.Sprite.prototype.invalidate = function () {
      this.dirty = true;
    };

    var lastEntry = function (idx, arr) {
      var last = true;

      for (var i = idx + 1, j = arr.length; i < j; i++) {
        if (arr[i] !== undefined && arr[i] !== null) {
          last = false;
          break;
        }
      }

      return last;
    };

    orbium.Sprite.prototype.update = function (dt) {
      // Default implementation does nothing
    };

    orbium.Sprite.prototype.draw = function (idx) {
      if (this.dirty) {
        if (this.images[idx] !== undefined &&
          this.images[idx] !== null) {
          orbium.ctx.drawImage(
            this.images[idx],
            Math.round(this.xpos),
            Math.round(this.ypos),
            this.width, this.height);
        }

        if (lastEntry(idx, this.images)) {
          this.dirty = false;
        }
      }
    };
  };
})(orbium);

(function (orbium, undefined) {
  orbium.Tile = function () {
    this.count = null;
    this.xnr = null;
    this.ynr = null;

    this.variant = null;

    this.inducesSink = null;
    this.inducesPaths = null;

    this.hasPaths = null;

    orbium.Tile.prototype.construct = function (images, count, xnr, ynr) {
      this.count = count;
      this.xnr = xnr;
      this.ynr = ynr;

      this.inducesSink = false;
      this.inducesPaths = [false, false, false, false];

      this.hasPaths = [false, false, false, false];

      var xpos = orbium.Tile.size * this.xnr;
      var ypos = orbium.Tile.size * this.ynr + orbium.Bar.height;

      orbium.Sprite.prototype.construct.call(this, images, xpos, ypos, orbium.Tile.size, orbium.Tile.size);
    };

    orbium.Tile.prototype.setBase = function (baseName) {
      if (baseName !== undefined) {
        // Should tile have top path?
        var idx = this.count-orbium.Machine.horizTiles;
        this.hasPaths[0] = !!(idx >= 0 &&
          idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
          orbium.machine.tiles[idx].inducesPaths[0] &&
          this.variant !== 1 &&
          orbium.machine.tiles[idx].variant !== 1);

        // Should tile have right path?
        idx = this.count + 1;
        this.hasPaths[1] = !!(idx >= 0 &&
          idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
          (this.count + 1) % orbium.Machine.horizTiles !== 0 &&
          orbium.machine.tiles[idx].inducesPaths[1] &&
          this.variant !== 0 &&
           orbium.machine.tiles[idx].variant !== 0);

        // Should tile have bottom path?
        idx = this.count + orbium.Machine.horizTiles;
        this.hasPaths[2] = !!(idx >= 0 &&
          idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
          orbium.machine.tiles[idx].inducesPaths[2] &&
          this.variant !== 1 &&
          orbium.machine.tiles[idx].variant !== 1);

        // Should tile have left path?
        idx = this.count - 1;
        this.hasPaths[3] = !!(idx >= 0 &&
          idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
          this.count % orbium.Machine.horizTiles !== 0 &&
          orbium.machine.tiles[idx].inducesPaths[3] &&
          this.variant !== 0 &&
          orbium.machine.tiles[idx].variant !== 0);

        // First row rotators
        if (this.count < orbium.Machine.horizTiles &&
          this instanceof orbium.Rotator) {
          this.hasPaths[0] = true;
        }

        var frame = 0;

        if (this.hasPaths[0] && !this.hasPaths[1] &&
          !this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 0;
        } else if (!this.hasPaths[0] && this.hasPaths[1] &&
          !this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 1;
        } else if (!this.hasPaths[0] && !this.hasPaths[1] &&
          this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 2;
        } else if (!this.hasPaths[0] && !this.hasPaths[1] &&
          !this.hasPaths[2] && this.hasPaths[3]) {
          frame = 3;
        } else if (this.hasPaths[0] && this.hasPaths[1] &&
          !this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 4;
        } else if (!this.hasPaths[0] && this.hasPaths[1] &&
          this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 5;
        } else if (!this.hasPaths[0] && !this.hasPaths[1] &&
          this.hasPaths[2] && this.hasPaths[3]) {
          frame = 6;
        } else if (this.hasPaths[0] && !this.hasPaths[1] &&
          !this.hasPaths[2] && this.hasPaths[3]) {
          frame = 7;
        } else if (this.hasPaths[0] && this.hasPaths[1] &&
          this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 8;
        } else if (!this.hasPaths[0] && this.hasPaths[1] &&
          this.hasPaths[2] && this.hasPaths[3]) {
          frame = 9;
        } else if (this.hasPaths[0] && !this.hasPaths[1] &&
          this.hasPaths[2] && this.hasPaths[3]) {
          frame = 10;
        } else if (this.hasPaths[0] && this.hasPaths[1] &&
          !this.hasPaths[2] && this.hasPaths[3]) {
          frame = 11;
        } else if (this.hasPaths[0] && !this.hasPaths[1] &&
          this.hasPaths[2] && !this.hasPaths[3]) {
          frame = 12;
        } else if (!this.hasPaths[0] && this.hasPaths[1] &&
          !this.hasPaths[2] && this.hasPaths[3]) {
          frame = 13;
        } else if (this.hasPaths[0] && this.hasPaths[1] &&
          this.hasPaths[2] && this.hasPaths[3]) {
          frame = 14;
        }

        if (this.broken) {
          frame += 15;
        }

        this.setImage(0, baseName + frame);

        this.invalidate();
      }
    };

    orbium.Tile.prototype.influence = function (marble) {
      // Default implementation does nothing
    };
  };

  orbium.Tile.prototype = new orbium.Sprite();
  orbium.Tile.prototype.constructor = orbium.Tile;
})(orbium);

(function (orbium, undefined) {
  orbium.Dockee = function (parent, pos, color, frame) {
    this.parent = null;
    this.pos = null;
    this.color = null;
    this.frame = null;

    this.construct = function () {
      this.parent = parent;
      this.pos = pos;
      this.color = color;
      this.frame = frame;

      this.place();

      var f = this.color * 12 + this.frame;
      var images = ["marble" + f];
      orbium.Sprite.prototype.construct.call(this, images, this.xpos, this.ypos, orbium.Marble.size, orbium.Marble.size);
    };

    this.destruct = function () {
      orbium.Sprite.prototype.destruct.call(this);
    };

    this.place = function () {
      var offset = this.pos + this.parent.orientation;
      if (offset > 6) {
        offset = 0;
      }

      var o1 = 0.3450;
      var o2 = 0.0382;
      var o3 = 0.6520;

      if (offset === 0 || offset === 4) {
        this.xpos = Math.round(this.parent.xpos + orbium.Tile.size * o1);
        this.ypos = Math.round(this.parent.ypos + orbium.Tile.size * o2);
      } else if (offset === 1 || offset === 5) {
        this.xpos = Math.round(this.parent.xpos + orbium.Tile.size * o3);
        this.ypos = Math.round(this.parent.ypos + orbium.Tile.size * o1);
      } else if (offset === 2 || offset === 6) {
        this.xpos = Math.round(this.parent.xpos + orbium.Tile.size * o1);
        this.ypos = Math.round(this.parent.ypos + orbium.Tile.size * o3);
      } else if (offset === 3) {
        this.xpos = Math.round(this.parent.xpos + orbium.Tile.size * o2);
        this.ypos = Math.round(this.parent.ypos + orbium.Tile.size * o1);
      }
    };

    this.judder = function (stage) {
      var xamount, yamount;

      var offset = this.pos + this.parent.orientation;
      if (offset > 6) {
        offset = 0;
      }

      if (offset === 0 || offset === 4) {
        if (stage === 0) {
          xamount = Math.round(orbium.Tile.size * 0.120);
          yamount = Math.round(orbium.Tile.size * 0.025);
        } else if (stage === 1) {
          xamount = Math.round(orbium.Tile.size * 0.090);
          yamount = Math.round(orbium.Tile.size * 0.065);
        } else if (stage === 2) {
          xamount = Math.round(orbium.Tile.size * 0.070);
          yamount = Math.round(orbium.Tile.size * 0.105);
        }
      }

      if (offset === 1 || offset === 5) {
        if (stage === 0) {
          xamount = Math.round(orbium.Tile.size * 0.025);
          yamount = Math.round(orbium.Tile.size * 0.115);
        } else if (stage === 1) {
          xamount = Math.round(orbium.Tile.size * 0.065);
          yamount = Math.round(orbium.Tile.size * 0.100);
        } else if (stage === 2) {
          xamount = Math.round(orbium.Tile.size * 0.100);
          yamount = Math.round(orbium.Tile.size * 0.065);
        }
      }

      if (offset === 2 || offset === 6) {
        if (stage === 0) {
          xamount = Math.round(orbium.Tile.size * 0.115);
          yamount = Math.round(orbium.Tile.size * 0.025);
        } else if (stage === 1) {
          xamount = Math.round(orbium.Tile.size * 0.100);
          yamount = Math.round(orbium.Tile.size * 0.065);
        } else if (stage === 2) {
          xamount = Math.round(orbium.Tile.size * 0.065);
          yamount = Math.round(orbium.Tile.size * 0.110);
        }
      }

      if (offset === 3) {
        if (stage === 0) {
          xamount = Math.round(orbium.Tile.size * 0.020);
          yamount = Math.round(orbium.Tile.size * 0.115);
        } else if (stage === 1) {
          xamount = Math.round(orbium.Tile.size * 0.065);
          yamount = Math.round(orbium.Tile.size * 0.100);
        } else if (stage === 2) {
          xamount = Math.round(orbium.Tile.size * 0.100);
          yamount = Math.round(orbium.Tile.size * 0.065);
        }
      }

      if (offset === 0 || offset === 4) {
        this.xpos -= xamount;
        this.ypos += yamount;
      } else if (offset === 1 || offset === 5) {
        this.xpos -= xamount;
        this.ypos -= yamount;
      } else if (offset === 2 || offset === 6) {
        this.xpos += xamount;
        this.ypos -= yamount;
      } else if (offset === 3) {
        this.xpos += xamount;
        this.ypos += yamount;
      }
    };

    this.withinTrigger = function (xcheck, ycheck) {
      var xpos = null;
      var ypos = null;
      var width = null;
      var height = null;

      var offset = this.pos + this.parent.orientation;
      if (offset > 6) {
        offset = 0;
      }

      if (offset === 0 || offset === 4) {
        xpos = this.xpos - orbium.Marble.size / 2;
        ypos = this.ypos - orbium.Marble.size * 1.2;
        width = orbium.Marble.size * 2;
        height = orbium.Marble.size * 1.2;
      } else if (offset === 1 || offset === 5) {
        xpos = this.xpos + orbium.Marble.size;
        ypos = this.ypos - orbium.Marble.size / 2;
        width = orbium.Marble.size * 1.2;
        height = orbium.Marble.size * 2;
      } else if (offset === 2 || offset === 6) {
        xpos = this.xpos - orbium.Marble.size / 2;
        ypos = this.ypos + orbium.Marble.size;
        width = orbium.Marble.size * 2;
        height = orbium.Marble.size * 1.2;
      } else if (offset === 3) {
        xpos = this.xpos - orbium.Marble.size * 1.2;
        ypos = this.ypos - orbium.Marble.size / 2;
        width = orbium.Marble.size * 1.2;
        height = orbium.Marble.size * 2;
      }

      return (orbium.Util.withinRect(xcheck, ycheck, xpos, ypos, width, height) ||
        orbium.Util.withinRect(xcheck, ycheck, this.xpos, this.ypos, orbium.Marble.size, orbium.Marble.size));
    };

    this.getState = function () {
      return {
        pos: this.pos, xpos:this.xpos, ypos:this.ypos,
        color: this.color,
        frame: this.frame
      };
    };

    this.construct.apply(this, arguments);
  };

  orbium.Dockee.prototype = new orbium.Sprite();
  orbium.Dockee.prototype.constructor = orbium.Dockee;
})(orbium);

(function (orbium, undefined) {
  orbium.Marble = function (xpos, ypos, color, frame, direction, fresh) {
    this.color = null;
    this.frame = null;
    this.direction = null;
    this.fresh = null;
		this.lastDockTry = null;
		this.lastTeleportDest = null;
    this.stale = null;

    this.framec = null;

    this.construct = function () {
      if (xpos === undefined) {
        xpos = orbium.width;
      }

      if (ypos === undefined) {
        ypos = orbium.Bar.height / 2 - orbium.Marble.size / 2;
      }

      this.color = color;
      if (this.color === undefined) {
        this.color = orbium.machine.nextColor;
      }

      this.frame = frame;
      if (this.frame === undefined) {
        this.frame = orbium.Util.generateRandomIndex(5);
      }

      if (direction === undefined) {
        this.direction = 3;
      } else {
        this.direction = direction;
      }

      this.fresh = !!(fresh === undefined || fresh);

      this.lastDockTry = null;
      this.lastTeleportDest = null;

      this.stale = false;

      var f = this.color * 12 + this.frame;
      var images = ["marble" + f];
      orbium.Sprite.prototype.construct.call(this, images, xpos, ypos, orbium.Marble.size, orbium.Marble.size);

      this.framec = 99;
      this.animate();
    };

    this.destruct = function () {
      orbium.Sprite.prototype.destruct.call(this);
    };

    this.bounce = function () {
      if (this.direction === 0) {
        this.direction = 2;
      } else if (this.direction === 1) {
        this.direction = 3;
      } else if (this.direction === 2) {
        this.direction = 0;
      } else if (this.direction === 3) {
        this.direction = 1;
      }

			this.lastDockTry = null;
			this.lastTeleportDest = null;
    };

    this.animate = function () {
      // Animate the marble every 6th frame
      if (this.framec > 6) {
        if (this.direction === 0) {
          this.frame--;

          if (this.frame < 6) {
            this.frame = 11;
          }
        } else if (this.direction === 1) {
          this.frame++;

          if (this.frame > 5) {
            this.frame = 0;
          }
        } else if (this.direction === 2) {
          this.frame++;

          if (this.frame > 11) {
            this.frame = 6;
          }
        } else if (this.direction === 3) {
          this.frame--;

          if (this.frame < 0) {
            this.frame = 5;
          }
        }

        var f = this.color * 12 + this.frame;

        this.setImage(0, "marble" + f);

        this.framec = 0;
      }

      this.invalidate();
    };

    this.update = function (dt) {
      // Guard against marble coming outside of the screen, should
      // never happen
      if (this.xpos < 0) {
        this.direction = 1;
				this.lastDockTry = null;
      } else if (this.xpos > orbium.width - orbium.Marble.size) {
        this.direction = 3;
				this.lastDockTry = null;
      } else if (this.ypos < 0) {
        this.direction = 2;
				this.lastDockTry = null;
      } else if (this.ypos > orbium.height - orbium.Marble.size) {
        this.direction = 0;
				this.lastDockTry = null;
      }

      // Move the marble
      if (this.direction === 0) {
        this.ypos -= orbium.Marble.speed * dt;
      } else if (this.direction === 1) {
        this.xpos += orbium.Marble.speed * dt;
      } else if (this.direction === 2) {
        this.ypos += orbium.Marble.speed * dt;
      } else if (this.direction === 3) {
        this.xpos -= orbium.Marble.speed * dt;
      }

      this.animate();

      this.framec += orbium.Marble.speed * dt;
    };

    this.getState = function () {
      return {
        xpos: this.xpos,
        ypos: this.ypos,
        color: this.color,
        frame: this.frame,
        direction: this.direction,
        fresh: this.fresh, framec:this.framec
      };
    };

    this.construct.apply(this, arguments);
  };

  orbium.Marble.prototype = new orbium.Sprite();
  orbium.Marble.prototype.constructor = orbium.Marble;
})(orbium);

(function (orbium, undefined) {
  orbium.Rotator = function (count, xnr, ynr) {
    this.orientation = null;
    this.broken = null;

    var dockees = null;
    var judderc = null;
    var blockc = null;
    var fullc = null;
    var stage = null;

    this.construct = function () {
      this.orientation = orbium.Util.generateRandomIndex(3);
      this.broken = false;

      dockees = [];
      judderc = -1;
      blockc = -1;
      fullc = -1;
      stage = 0;

      var offset = getOffsetFromOrientation();

      orbium.Tile.prototype.construct.call(this, ["rotatile14",
        "rotator" + offset], count, xnr, ynr);

      this.inducesSink = true;
      this.inducesPaths = [true, true, true, true];
    };

    this.destruct = function () {
      for (var i = 0, j = dockees.length; i < j; i++) {
        dockees[i].destruct();
      }
      dockees.length = 0;

      orbium.Tile.prototype.destruct.call(this);
    };

    this.setBase = function () {
      orbium.Tile.prototype.setBase.call(this, "rotatile");
    };

    this.invalidate = function () {
      orbium.Tile.prototype.invalidate.call(this);

      for (var i = 0, j = dockees.length; i < j; i++) {
        dockees[i].invalidate();
      }
    };

    var slotFree = function (pos) {
      for (var i = 0, j = dockees.length; i < j; i++) {
        if (dockees[i].pos === pos) {
          return false;
        }
      }

      return true;
    };

    var pattern = function () {
      var pat = [];

      for (var i = 0, j = dockees.length; i < j; i++) {
        var dockee = dockees[i];

        if (that.orientation === 0) {
          if (dockee.pos === 0) {
            pat[0] = dockee.color;
          } else if (dockee.pos === 1) {
            pat[1] = dockee.color;
          } else if (dockee.pos === 2) {
            pat[2] = dockee.color;
          } else if (dockee.pos === 3) {
            pat[3] = dockee.color;
          }
        } else if (that.orientation === 1) {
          if (dockee.pos === 0) {
            pat[1] = dockee.color;
          } else if (dockee.pos === 1) {
            pat[2] = dockee.color;
          } else if (dockee.pos === 2) {
            pat[3] = dockee.color;
          } else if (dockee.pos === 3) {
            pat[0] = dockee.color;
          }
        } else if (that.orientation === 2) {
          if (dockee.pos === 0) {
            pat[2] = dockee.color;
          } else if (dockee.pos === 1) {
            pat[3] = dockee.color;
          } else if (dockee.pos === 2) {
            pat[0] = dockee.color;
          } else if (dockee.pos === 3) {
            pat[1] = dockee.color;
          }
        } else if (that.orientation === 3) {
          if (dockee.pos === 0) {
            pat[3] = dockee.color;
          } else if (dockee.pos === 1) {
            pat[0] = dockee.color;
          } else if (dockee.pos === 2) {
            pat[1] = dockee.color;
          } else if (dockee.pos === 3) {
            pat[2] = dockee.color;
          }
        }
      }

      return pat;
    };

    var dockMarble = function (dir, color, frame, fresh) {
      if (blockc !== -1) {
        if (!fresh) {
          if (orbium.player !== undefined) {
            orbium.player.play("clank");
          }
        }

        return false;
      }

      var pos = 0;
      if (dir === 0 && that.orientation === 0) {
        pos = 2;
      } else if (dir === 0 && that.orientation === 1) {
        pos = 1;
      } else if (dir === 0 && that.orientation === 2) {
        pos = 0;
      } else if (dir === 0 && that.orientation === 3) {
        pos = 3;
      }

      if (dir === 1 && that.orientation === 0) {
        pos = 3;
      } else if (dir === 1 && that.orientation === 1) {
        pos = 2;
      } else if (dir === 1 && that.orientation === 2) {
        pos = 1;
      } else if (dir === 1 && that.orientation === 3) {
        pos = 0;
      }

      if (dir === 2 && that.orientation === 0) {
        pos = 0;
      } else if (dir === 2 && that.orientation === 1) {
        pos = 3;
      } else if (dir === 2 && that.orientation === 2) {
        pos = 2;
      } else if (dir === 2 && that.orientation === 3) {
        pos = 1;
      }

      if (dir === 3 && that.orientation === 0) {
        pos = 1;
      } else if (dir === 3 && that.orientation === 1) {
        pos = 0;
      } else if (dir === 3 && that.orientation === 2) {
        pos = 3;
      } else if (dir === 3 && that.orientation === 3) {
        pos = 2;
      }

      if (!slotFree(pos)) {
        if (!fresh) {
          if (orbium.player !== undefined) {
            orbium.player.play("bounce");
          }
        }

        return false;
      }

      var dockee = new orbium.Dockee(that, pos, color, frame);
      orbium.Util.addArrayElement(dockees, dockee);

      if (orbium.player !== undefined) {
        orbium.player.play("dock");
      }

      return true;
    };

    this.triggerRotate = function (xtap, ytap) {
      if (orbium.Util.withinRect(
        xtap,
        ytap,
        this.xpos,
        this.ypos,
        orbium.Tile.size,
        orbium.Tile.size)) {
        this.rotate(true);
      }
    };

    this.rotate = function (send) {
      if (judderc === -1 && fullc === -1) {
        if (orbium.client !== undefined && send) {
          orbium.client.send({rotate: this.count});
        }

        if (orbium.player !== undefined) {
          orbium.player.play("rotate");
        }

        judderc = 0;
        blockc = 0;
      }
    };

    var explode = function () {
      orbium.player.play("explode");

      orbium.machine.onMatch(that, dockees[0].color);
      that.broken = true;
      fullc = 0;
    };

    var countSame = function () {
      var same = 0;

      var sameColor = dockees[0].color;

      for (var i = 0, j = dockees.length; i < j; i++) {
        if (dockees[i].color === sameColor) {
          same++;
        }
      }

      return same;
    };

    this.checkFull = function () {
      var again = false;

      // Only bother to check if not exploding and 4 is docked
      if (fullc === -1 && dockees.length === 4) {
        if (orbium.machine.matcher !== null &&
          orbium.machine.matcher.active()) {
          if (orbium.machine.matcher.matches(pattern())) {
            explode();

            again = true;
          }
        } else {
          if (countSame() === 4) {
            if (orbium.machine.sequencer !== null &&
              orbium.machine.sequencer.active()) {
              var matchColor = dockees[0].color;

              if (orbium.machine.sequencer.matches(matchColor)) {
                orbium.machine.sequencer.advance();

                explode();

                again = true;
              }
            } else {
              explode();

              again = true;
            }
          }
        }
      }

      return again;
    };

    this.triggerLaunchPosition = function (xtap, ytap) {
      var launched = false;

      for (var i = 0, j = dockees.length; i < j; i++) {
        var dockee = dockees[i];

        if (dockee !== undefined && dockee.withinTrigger(xtap, ytap)) {
          launched = this.launchPosition(dockee.pos);
        }
      }

      return launched;
    };

    this.triggerLaunchDirection = function (xtap, ytap, dir) {
      if (orbium.Util.withinRect(
        xtap,
        ytap,
        this.xpos,
        this.ypos,
        orbium.Tile.size,
        orbium.Tile.size)) {
        return this.launchDirection(dir, true);
      }

      return false;
    };

    this.launchPosition = function (pos) {
      var dir = pos + this.orientation;
      if (dir === 4) {
        dir = 0;
      } else if (dir === 5) {
        dir = 1
      } else if (dir === 6) {
        dir = 2;
      }

      return this.launchDirection(dir, true);
    };

    this.launchDirection = function (dir, send) {
      if (judderc !== -1) {
        return false;
      }

      var proceed = false;

      if (dir === 0 && this.hasPaths[0] &&
        this.count >= orbium.Machine.horizTiles) {
        proceed = true;
      }

      if (dir === 1 && this.hasPaths[1]) {
        proceed = true;
      }

      if (dir === 2 && this.hasPaths[2]) {
        proceed = true;
      }

      if (dir === 3 && this.hasPaths[3]) {
        proceed = true;
      }

      // We cant launch
      if (!proceed) {
        return false;
      }

      var pos = -1;

      if (this.orientation === 0) {
        if (dir === 0) {
          pos = 0;
        } else if (dir === 1) {
          pos = 1;
        } else if (dir === 2) {
          pos = 2;
        } else if (dir === 3) {
          pos = 3;
        }
      }

      if (this.orientation === 3) {
        if (dir === 0) {
          pos = 1;
        } else if (dir === 1) {
          pos = 2;
        } else if (dir === 2) {
          pos = 3;
        } else if (dir === 3) {
          pos = 0;
        }
      }

      if (this.orientation === 2) {
        if (dir === 0) {
          pos = 2;
        } else if (dir === 1) {
          pos = 3;
        } else if (dir === 2) {
          pos = 0;
        } else if (dir === 3) {
          pos = 1;
        }
      }

      if (this.orientation === 1) {
        if (dir === 0) {
          pos = 3;
        } else if (dir === 1) {
          pos = 0;
        } else if (dir === 2) {
          pos = 1;
        } else if (dir === 3) {
          pos = 2;
        }
      }

      // Find dockee at pos
      var dockee = null;
      for (var i = 0, j = dockees.length; i < j; i++) {
        if (dockees[i].pos === pos) {
          dockee = dockees[i];
        }
      }

      // No dockee to launch
      if (dockee === null) {
        return false;
      }

      if (orbium.machine.counter.isLaunchAllowed()) {
        if (orbium.client !== undefined && send) {
          orbium.client.send({launch: this.count, dir: dir});
        }

        dockee.destruct();
        orbium.Util.removeArrayElement(dockees, dockee);

        var marble = new orbium.Marble(
          dockee.xpos,
          dockee.ypos,
          dockee.color,
          dockee.frame,
          dir,
          false);

        orbium.Util.addArrayElement(orbium.machine.marbles, marble);
      }

      orbium.machine.counter.countActiveMarbles();

      return true;
    };

    this.influence = function (marble) {
      if (marble.fresh) {
        if (marble.lastDockTry !== this &&
          orbium.Util.withinRect(
            marble.xpos + orbium.Marble.size / 2,
            marble.ypos + orbium.Marble.size / 2,
            this.xpos + orbium.Tile.size / 2 - orbium.Marble.size / 4,
            this.ypos - orbium.Bar.height,
            orbium.Marble.size / 2,
            orbium.Bar.height)) {
          var falldown = dockMarble(2, marble.color,
            marble.frame, true);

          if (falldown) {
            marble.fresh = false;
            marble.stale = true;

            this.invalidate();

            orbium.machine.checkRotatorsFull();

            orbium.machine.lane.resetTimer();
            orbium.machine.lane.injectMarble();
          } else {
            marble.lastDockTry = this;
          }
        }
      } else {
        var within = false;

        var offset1 = orbium.Tile.size / 2 - orbium.Marble.size / 2;
        var offset2 = orbium.Tile.size - orbium.Marble.size -
          orbium.Marble.size / 6;

        if (marble.direction === 0) {
          if (orbium.Util.withinRect(
            marble.xpos + orbium.Marble.size / 2,
            marble.ypos,
            this.xpos + offset1,
            this.ypos + offset2,
            orbium.Marble.size,
            orbium.Marble.size)) {
            within = true;
          }
        } else if (marble.direction === 1) {
          if (orbium.Util.withinRect(
            marble.xpos + orbium.Marble.size,
            marble.ypos + orbium.Marble.size / 2,
            this.xpos + orbium.Marble.size / 6,
            this.ypos + offset1,
            orbium.Marble.size,
            orbium.Marble.size)) {
            within = true;
          }
        } else if (marble.direction === 2) {
          if (orbium.Util.withinRect(
            marble.xpos + orbium.Marble.size / 2,
            marble.ypos + orbium.Marble.size,
            this.xpos + offset1,
            this.ypos + orbium.Marble.size / 6,
            orbium.Marble.size,
            orbium.Marble.size)) {
            within = true;
          }
        } else if (marble.direction === 3) {
          if (orbium.Util.withinRect(
            marble.xpos,
            marble.ypos + orbium.Marble.size / 2,
            this.xpos + offset2,
            this.ypos + offset1,
            orbium.Marble.size,
            orbium.Marble.size)) {
            within = true;
          }
        }

        // Check if marble should dock or bounce
        if (within) {
          var success = dockMarble(marble.direction, marble.color,
            marble.frame, false);

          if (success) {
            marble.stale = true;

            // If direction is left we need to invalidate
            // tile rightof this rotator
            if (marble.direction === 3) {
              var idx = this.count + 1;
              if (orbium.machine.tiles[idx] !== undefined) {
                orbium.machine.tiles[idx].invalidate();
              }
            }

            // If direction is up we need to invalidate
            // tile below this rotator
            if (marble.direction === 0) {
              var idz = this.count + orbium.Machine.horizTiles;
              if (orbium.machine.tiles[idz] !== undefined) {
                orbium.machine.tiles[idz].invalidate();
              }
            }

            orbium.machine.checkRotatorsFull();
          } else {
            marble.bounce();
          }
        }
      }
    };

    this.view = function () { return dockees.map(function(d) {return {pos:d.pos,color:d.color,x:d.xpos,y:d.ypos};}); };
    this.busy = function () {return judderc !== -1 || fullc !== -1 || blockc !== -1;};
    this.animState = function () {return {judderc:judderc,blockc:blockc,fullc:fullc,stage:stage,broken:this.broken};};
    this.restoreAnim = function(a) {judderc=a.judderc;blockc=a.blockc;fullc=a.fullc;stage=a.stage;this.broken=a.broken;};
    this.getState = function () {
      var state = {
        count: this.count,
        orientation: this.orientation
      };

      if (dockees.length > 0) {
        state.dockees = [];

        for (var i = 0, j = dockees.length; i < j; i++) {
          var dockeeState = dockees[i].getState();

          orbium.Util.addArrayElement(state.dockees, dockeeState);
        }
      }

      return state;
    };

    this.setState = function (state) {
      this.orientation = state.orientation;

      this.setImage(1, "rotator" + getOffsetFromOrientation());

      for (var i = 0, j = dockees.length; i < j; i++) {
        dockees[i].destruct();
      }
      dockees.length = 0;

      if (state.dockees !== undefined) {
        for (i = 0, j = state.dockees.length; i < j; i++) {
          var prevDockee = state.dockees[i];

          var dockee = new orbium.Dockee(this, prevDockee.pos, prevDockee.color, prevDockee.frame);

          if (prevDockee.xpos !== undefined) {dockee.xpos=prevDockee.xpos;dockee.ypos=prevDockee.ypos;}
          orbium.Util.addArrayElement(dockees, dockee);
        }
      }

      this.invalidate();
    };

    var getOffsetFromOrientation = function () {
      var offset = 0;

      if (that.orientation === 0) {
        offset = 0;
      } else if (that.orientation === 3) {
        offset = 4;
      } else if (that.orientation === 2) {
        offset = 8;
      } else if (that.orientation === 1) {
        offset = 12;
      }

      return offset;
    };

    this.update = function (dt) {
      var frame = 0;
      var offset = 0;

      if (judderc !== -1 || fullc !== -1) {
        offset = getOffsetFromOrientation();
      }

      if (judderc === 0 && stage === 0) {
        frame = offset + stage + 1;
        if (this.broken) {
          frame += 16;
        }
        this.setImage(1, "rotator" + frame);

        stage = 1;

        for (var i = 0, j = dockees.length; i < j; i++) {
          dockees[i].judder(0);
        }
        this.invalidate();
      }

      if (judderc > 2 && stage === 1) {
        frame = offset + stage + 1;
        if (this.broken) {
          frame += 16;
        }
        this.setImage(1, "rotator" + frame);

        stage = 2;

        for (i = 0, j = dockees.length; i < j; i++) {
          dockees[i].judder(1);
        }
        this.invalidate();
      }

      if (judderc > 4 && stage === 2) {
        frame = offset + stage + 1;
        if (this.broken) {
          frame += 16;
        }
        this.setImage(1, "rotator" + frame);

        stage = 3;

        for (i = 0, j = dockees.length; i < j; i++) {
          dockees[i].judder(2);
        }
        this.invalidate();
      }

      if (judderc > 6 && stage === 3) {
        frame = offset + stage + 1;
        if (frame === 16) {
          frame = 0;
        }
        if (this.broken) {
          frame += 16;
        }
        this.setImage(1, "rotator" + frame);

        stage = 0;

        if (this.orientation > 0) {
          this.orientation--;
        } else {
          this.orientation = 3;
        }

        for (i = 0, j = dockees.length; i < j; i++) {
          dockees[i].place();
        }

        // If matcher is present check for full tiles on rotate
        if (orbium.machine.matcher !== null) {
          orbium.machine.checkRotatorsFull();
        }

        judderc = -1;
        this.invalidate();
      }

      if (blockc > 12) {
        blockc = -1;
      }

      if (fullc > 2 && stage === 0) {
        for (i = 0, j = dockees.length; i < j; i++) {
          dockees[i].destruct();
        }
        dockees.length = 0;
        this.setImage(2, "explosion0");
        stage = 1;
        this.invalidate();
      } else if (fullc > 4 && stage === 1) {
        this.setImage(2, "explosion1");
        stage = 2;
        this.invalidate();
      } else if (fullc > 6 && stage === 2) {
        this.setImage(2, "explosion2");
        stage = 3;
        this.invalidate();
      } else if (fullc > 8 && stage === 3) {
        this.setImage(2, "explosion3");
        stage = 4;
        this.invalidate();
      } else if (fullc > 10 && stage === 4) {
        fullc = -1;
        this.setBase("rotatile");
        frame = offset + 16;
        this.setImage(1, "rotator" + frame);
        this.setImage(2, null);

        stage = 0;
        this.invalidate();

        orbium.machine.checkLevelComplete();
      }

      if (judderc !== -1) {
        judderc += orbium.Rotator.speed * dt;
      }

      if (blockc !== -1) {
        blockc += orbium.Rotator.speed * dt;
      }

      if (fullc !== -1) {
        fullc += orbium.Rotator.speed * dt;
      }
    };

    this.draw = function (idx) {
      if (idx === 0) {
        orbium.Tile.prototype.draw.call(this, 0);
      } else if (idx === 1) {
        orbium.Tile.prototype.draw.call(this, 1);
      } else if (idx === 2) {
        for (var i = 0, j = dockees.length; i < j; i++) {
          dockees[i].draw(0);
        }

        orbium.Tile.prototype.draw.call(this, 2);
      }
    };

    var that = this; this.construct.apply(this, arguments);
  };

  orbium.Rotator.prototype = new orbium.Tile();
  orbium.Rotator.prototype.constructor = orbium.Rotator;
})(orbium);

orbium.Tile.size=250;orbium.Bar={height:0};orbium.Marble.size=77;orbium.Marble.speed=660;orbium.Rotator.speed=56;orbium.Machine={horizTiles:2,vertTiles:2};
export {orbium};

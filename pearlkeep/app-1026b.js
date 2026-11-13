/* Pearlkeep. Source adaptations licensed GPL-2.0; see LICENSE.txt and SOURCE.md. */
(()=>{
"use strict";
const FRAMES=[[64, 57, 223, 220], [369, 56, 221, 221], [669, 56, 221, 221], [978, 56, 220, 221], [42, 319, 272, 270], [341, 319, 268, 270], [655, 312, 253, 282], [959, 339, 255, 239], [59, 624, 236, 274], [340, 624, 290, 275], [668, 626, 243, 273], [974, 624, 240, 272], [75, 935, 239, 268], [345, 965, 284, 209], [671, 935, 242, 259], [959, 935, 267, 258]];
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

const EMPTY=-1;
const NAMES=['A Little Gift','Sea Glass','Moon Drops','The Pearl Exchange','Golden Hour','Tidal Treasures','Velvet Evening','The Grand Keepsake'];
const TITLES=['Coral','Sea glass','Moonstone','Honey'];
function rng(seed){let s=seed>>>0;return ()=>{s=(s+0x6D2B79F5)>>>0;let t=Math.imul(s^s>>>15,1|s);t^=t+Math.imul(t^t>>>7,61|t);return ((t^t>>>14)>>>0)/4294967296;};}
function neighbor(i,d){let x=i%2,y=i>>1;return d===0?(y?i-2:-1):d===1?(x?-1:i+1):d===2?(y?-1:i+2):(x?i-1:-1);}
const copy=x=>JSON.parse(JSON.stringify(x));
function rotateGrid(a,i){const b=copy(a);b[i]=[a[i][1],a[i][2],a[i][3],a[i][0]];return b;}
function transferGrid(a,i,d){let j=neighbor(i,d),op=(d+2)%4;if(j<0||a[i][d]<0||a[j][op]>=0)return null;const b=copy(a);b[j][op]=b[i][d];b[i][d]=-1;return b;}
function normalize(a){return a.map(row=>row.every(c=>c>=0&&c===row[0])?[-1,-1,-1,-1]:row.slice());}
function makePuzzle(level=0,seed=341,attempt=0){
 if(level===0)return {active:[0,1],grid:[[0,-1,0,0],[-1,-1,-1,0],[-1,-1,-1,-1],[-1,-1,-1,-1]],guide:[{kind:'send',i:1,d:3}],par:1,groups:1};
 const active=level===1?[0,1,2]:[0,1,2,3],groups=active.length-1;
 const rand=rng(seed+level*21973+attempt*91393);let grid=Array.from({length:4},()=>[-1,-1,-1,-1]),history=[];
 const colors=level<3?[0,1,2]:[level%4,(level+1)%4,(level+2)%4];
 for(let k=0;k<groups;k++)grid[active[k]]=Array(4).fill(colors[k]);
 const rounds=level===1?16:24+Math.min(level,12)*4;
 for(let k=0;k<rounds;k++){
  const available=[];
  for(const i of active)for(let d=0;d<4;d++){const j=neighbor(i,d);if(active.includes(j)&&grid[i][d]>=0&&grid[j][(d+2)%4]<0)available.push({kind:'send',i,d});}
  // Rotation opens new routes; do not spend the whole scramble spinning.
  let action=available.length&&rand()<.76?available[Math.floor(rand()*available.length)]:{kind:'rotate',i:active[Math.floor(rand()*active.length)]};
  if(action.kind==='rotate'){grid=rotateGrid(grid,action.i);history.push(action);}else{grid=transferGrid(grid,action.i,action.d);history.push(action);}
 }
 // Inverting the actual legal scramble guarantees a route. Cleared whole colors
 // can be omitted from the reverse route without affecting any other color.
 let guide=[];
 for(const a of history.reverse())if(a.kind==='rotate')for(let j=0;j<3;j++)guide.push({...a});else guide.push({kind:'send',i:neighbor(a.i,a.d),d:(a.d+2)%4});
 // Reduce adjacent inverse rotations and simulate the guide with automatic clears.
 const reduced=[];for(const a of guide){const tail=reduced.slice(-3);if(a.kind==='rotate'&&tail.length===3&&tail.every(x=>x.kind==='rotate'&&x.i===a.i))reduced.splice(-3);else reduced.push(a);}
 let sim=normalize(grid),real=[];
 for(const a of reduced){if(a.kind==='rotate'){if(sim[a.i].some(c=>c>=0)){sim=rotateGrid(sim,a.i);real.push(a);}}else{const b=transferGrid(sim,a.i,a.d);if(b){sim=normalize(b);real.push(a);}}}
 if(sim.flat().some(c=>c>=0))throw Error('Invalid generated reverse route');
 // Remove repeated states (including moving the same pearl out and back) so
 // the optional route teaches purposeful moves rather than the scramble history.
 let route=[],states=[normalize(grid)];
 for(const a of real){const current=states.at(-1),next=normalize(a.kind==='rotate'?rotateGrid(current,a.i):transferGrid(current,a.i,a.d));const seen=states.findIndex(b=>JSON.stringify(b)===JSON.stringify(next));if(seen>=0){route=route.slice(0,seen);states=states.slice(0,seen+1);}else{route.push(a);states.push(next);}}
 if(attempt<100&&(grid.some(row=>row[0]>=0&&row.every(c=>c===row[0]))||route.length<Math.min(3+level,10)))return makePuzzle(level,seed,attempt+1);
 return {active,grid,guide:route,par:route.length,groups};
}
class Session{
 constructor(level=0,seed=341,saved=null){if(!Number.isInteger(level)||level<0||level>1000||!Number.isInteger(seed)||seed<0||seed>4294967295)throw Error('Invalid puzzle');this.level=level;this.seed=seed;this.puzzle=makePuzzle(level,seed);this.moves=0;this.groups=0;this.collection=[];this.score=0;this.undos=0;this.helped=false;this.status='playing';this.t=0;this.events=[];this.history=[];this.guideIndex=0;this.guided=false;
  this.bind();this.tiles=Array.from({length:4},(_,i)=>new orbium.Rotator(i,i%2,i>>1));this.marbles=[];this.matcher=null;this.sequencer=null;this.counter={isLaunchAllowed:()=>true,countActiveMarbles:()=>{}};
  this.tiles.forEach((t,i)=>{t.hasPaths=Array.from({length:4},(_,d)=>this.puzzle.active.includes(i)&&this.puzzle.active.includes(neighbor(i,d)));this.setWorldSlots(t,this.puzzle.grid[i]);});
  if(saved)this.restore(saved);else this.checkRotatorsFull();
 }
 bind(){orbium.machine=this;orbium.player={play:()=>{}};}
 setWorldSlots(tile,slots){tile.setState({count:tile.count,orientation:0,dockees:slots.map((c,p)=>c<0?null:{pos:p,color:c,frame:0}).filter(Boolean)});}
 slots(i){const t=this.tiles[i],a=[-1,-1,-1,-1];for(const d of t.view())a[(d.pos+t.orientation)%4]=d.color;return a;}
 allSlots(){return this.tiles.map((_,i)=>this.slots(i));}
 busy(){return this.marbles.length>0||this.tiles.some(t=>t.busy());}
 onMatch(tile,color){this.groups++;this.collection.push(color);this.score+=400+this.groups*100;this.events.push({type:'match',i:tile.count,color,groups:this.groups});}
 checkRotatorsFull(){this.bind();for(const t of this.tiles)t.checkFull();}
 checkLevelComplete(){if(this.status==='playing'&&!this.busy()&&this.tiles.every(t=>!t.view().length)){this.status='won';this.events.push({type:'win'});}}
 act(action){
  if(this.status!=='playing'||this.busy()||!this.puzzle.active.includes(action.i))return false;
  this.bind();const t=this.tiles[action.i];
  if(action.kind==='send'){
   const j=neighbor(action.i,action.d);if(!this.puzzle.active.includes(j)||this.slots(action.i)[action.d]<0||this.slots(j)[(action.d+2)%4]>=0)return false;
  }else if(action.kind!=='rotate'||!t.view().length)return false;
  const previous=this.snapshot(false);this.history.push(previous);if(this.history.length>80)this.history.shift();this.moves++;
  if(action.kind==='rotate')t.rotate(false);else if(!t.launchDirection(action.d,false))throw Error('Source rejected validated transfer');
  this.events.push({type:action.kind,i:action.i,d:action.d});return true;
 }
 step(dt){if(this.status!=='playing')return;this.bind();this.t+=dt;for(const t of this.tiles)t.update(dt);
  for(const m of this.marbles){m.update(dt);for(const t of this.tiles)if(!m.stale)t.influence(m);}
  this.marbles=this.marbles.filter(m=>!m.stale);this.checkLevelComplete();
 }
 stars(){return this.status==='won'?1+(this.undos===0&&!this.helped?1:0)+(this.moves<=this.puzzle.par+4?1:0):0;}
 snapshot(withHistory=true){return copy({v:1,level:this.level,seed:this.seed,moves:this.moves,groups:this.groups,collection:this.collection,score:this.score,undos:this.undos,helped:this.helped,status:this.status,t:this.t,guideIndex:this.guideIndex,guided:this.guided,tiles:this.tiles.map(t=>({state:t.getState(),anim:t.animState()})),marbles:this.marbles.map(m=>m.getState()),history:withHistory?this.history:[]});}
 restore(s){if(!s||s.v!==1||s.level!==this.level||s.seed!==this.seed||!Array.isArray(s.tiles)||s.tiles.length!==4)throw Error('Invalid save');this.bind();
  for(const key of ['moves','groups','score','undos','t','guideIndex'])if(!Number.isFinite(s[key])||s[key]<0)throw Error('Invalid counters');
  if(!['playing','won'].includes(s.status)||s.moves>100000||s.groups>3)throw Error('Invalid progress');
  for(const row of s.tiles){if(![0,1,2,3].includes(row.state.orientation))throw Error('Invalid rotation');const ps=new Set();for(const d of row.state.dockees||[]){if(![0,1,2,3].includes(d.pos)||ps.has(d.pos)||![0,1,2,3].includes(d.color))throw Error('Invalid pearl');ps.add(d.pos);}for(const key of ['judderc','blockc','fullc','stage'])if(!Number.isFinite(row.anim[key])||row.anim[key]<-1||row.anim[key]>1000)throw Error('Invalid animation');}
  if(!Array.isArray(s.marbles)||s.marbles.length>1)throw Error('Invalid flight');for(const m of s.marbles)if(!Number.isFinite(m.xpos)||!Number.isFinite(m.ypos)||![0,1,2,3].includes(m.direction)||![0,1,2,3].includes(m.color))throw Error('Invalid moving pearl');
  if(!Array.isArray(s.collection)||s.collection.length!==s.groups||s.collection.some(c=>![0,1,2,3].includes(c)))throw Error('Invalid collection');this.collection=s.collection.slice();
  for(const key of ['moves','groups','score','undos','helped','status','t','guideIndex','guided'])this[key]=s[key];
  s.tiles.forEach((row,i)=>{this.tiles[i].setState(row.state);this.tiles[i].restoreAnim(row.anim);});this.marbles=s.marbles.map(m=>{const a=new orbium.Marble(m.xpos,m.ypos,m.color,m.frame,m.direction,false);a.frame=m.frame;a.framec=m.framec;return a;});this.history=Array.isArray(s.history)?s.history.slice(-80):[];this.events=[];
 }
 undo(){if(this.busy()||!this.history.length||this.status!=='playing')return false;const stack=this.history.slice(),s=stack.pop(),count=this.undos+1;try{this.restore(s);}catch{this.history=[];return false;}this.history=stack;this.undos=count;this.guided=false;this.events.push({type:'undo'});return true;}
 startGuide(){const undos=this.undos;const fresh=new Session(this.level,this.seed);this.restore(fresh.snapshot());this.undos=undos;this.helped=true;this.guided=true;this.guideIndex=0;}
 nextGuide(){if(!this.guided||this.busy()||this.status!=='playing')return null;const plan=this.puzzle.guide;while(this.guideIndex<plan.length){const a=plan[this.guideIndex];if(a.kind==='send'&&this.slots(a.i)[a.d]<0){this.guideIndex++;continue;}return a;}return null;}
 guideAct(action){const guide=this.nextGuide();if(guide&&(guide.kind!==action.kind||guide.i!==action.i||(guide.kind==='send'&&guide.d!==action.d)))return false;const ok=this.act(action);if(ok&&guide)this.guideIndex++;return ok;}
}
function profile(raw){const p={stars:Array(8).fill(0),best:Array(8).fill(0),mute:true,skin:0,expedition:0};try{if(!raw||!Array.isArray(raw.stars)||raw.stars.length!==8)return p;p.stars=raw.stars.map(n=>Number.isInteger(n)?Math.max(0,Math.min(3,n)):0);p.best=p.best.map((_,i)=>Math.max(0,Math.min(1e8,Number(raw.best?.[i])||0)));p.mute=raw.mute!==false;p.skin=[0,1,2].includes(raw.skin)?raw.skin:0;p.expedition=Math.max(0,Math.min(999,raw.expedition|0));}catch{}return p;}
function award(p,s){if(s.status!=='won')return;const i=s.level;if(i<8){p.stars[i]=Math.max(p.stars[i],s.stars());p.best[i]=Math.max(p.best[i],s.score);}else p.expedition=Math.max(p.expedition,i-7);}

const COLORS=['#f49a9a','#8ccab5','#bbb0df','#efd18c'];
class Art{
 constructor(canvas,frames){this.c=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.frames=frames;this.atlas=new Image();this.fx=[];this.flights=[];this.words=[];this.visual=new Map();this.t=0;this.reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;}
 async load(){this.atlas.src='assets/atlas-1026b.webp';await this.atlas.decode();this.back=document.createElement('canvas');this.back.width=600;this.back.height=900;const keep=this.ctx;this.ctx=this.back.getContext('2d');this.background();this.ctx=keep;}
 sprite(n,x,y,w,h,rot=0){const c=this.ctx,f=this.frames[n];if(!f)return;const scale=Math.min(w/f[2],h/f[3]),dw=f[2]*scale,dh=f[3]*scale;c.save();c.translate(x,y);c.rotate(rot);c.drawImage(this.atlas,...f,-dw/2,-dh/2,dw,dh);c.restore();}
 rr(x,y,w,h,r,fill,stroke){const c=this.ctx;c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
 circle(x,y,r,fill,stroke){const c=this.ctx;c.beginPath();c.arc(x,y,r,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
 text(s,x,y,size=18,color='#eadab4',font='Georgia'){const c=this.ctx;c.fillStyle=color;c.textAlign='center';c.textBaseline='middle';c.font=`${size}px ${font}`;c.fillText(s,x,y);}
 background(){const c=this.ctx;let g=c.createLinearGradient(0,0,600,900);g.addColorStop(0,'#80583d');g.addColorStop(.5,'#b98b5e');g.addColorStop(1,'#83593e');c.fillStyle=g;c.fillRect(0,0,600,900);
  for(let k=0;k<75;k++){c.beginPath();c.strokeStyle=k%3?'#4f311c12':'#f8db991b';c.lineWidth=k%7===0?2:1;for(let y=0;y<=900;y+=12){let x=k*8+Math.sin(y*.012+k*3)*5+Math.sin(y*.003+k)*12;y?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}
  for(let y=125;y<900;y+=260){c.strokeStyle='#452d2538';c.lineWidth=3;c.beginPath();c.moveTo(0,y);c.lineTo(600,y);c.stroke();c.strokeStyle='#ffe0ab26';c.lineWidth=1;c.beginPath();c.moveTo(0,y+3);c.lineTo(600,y+3);c.stroke();}
  // Embossed leather work mat, with a quiet, readable central play area.
  c.shadowColor='#291a2066';c.shadowBlur=16;c.shadowOffsetY=9;this.rr(24,145,552,570,32,'#315d5c');c.shadowBlur=0;c.shadowOffsetY=0;
  g=c.createLinearGradient(24,145,550,720);g.addColorStop(0,'#56817a');g.addColorStop(1,'#24494c');this.rr(28,147,544,560,29,g,'#c8ab7088');c.setLineDash([3,7]);c.lineWidth=1;this.rr(37,157,526,540,22,null,'#d9c69570');c.setLineDash([]);
  // Gentle top light, stationery, natural props and ivory tool labels.
  c.save();c.translate(132,80);c.rotate(-.1);c.shadowBlur=7;c.shadowColor='#26180e55';this.rr(-91,-44,182,88,10,'#eadcbc','#b29d73');c.shadowBlur=0;for(let n=0;n<4;n++){c.strokeStyle='#84978b40';c.beginPath();c.moveTo(-66,-13+n*14);c.lineTo(64,-13+n*14);c.stroke();}c.restore();
  this.sprite(12,48,79,90,130);this.sprite(14,544,91,90,117);this.sprite(13,70,816,125,100);this.sprite(15,516,817,136,132,-.3);
  this.rr(180,859,240,26,12,'#6c5035','#d8bc7c88');this.text('THE LITTLE PEARL WORKSHOP',300,872,10,'#e8d7ad','sans-serif');
 }
 event(e,s){if(e.type==='match'){
   const x=50+(e.i%2)*250+125,y=175+(e.i>>1)*250+125;
   for(let k=0;k<4;k++)this.flights.push({x:x+Math.cos(k*Math.PI/2)*76,y:y+Math.sin(k*Math.PI/2)*76,color:e.color,t:0,delay:k*.07});
   for(let k=0;k<(this.reduce?9:32);k++){const a=Math.PI*2*k/32;this.fx.push({x,y,vx:Math.cos(a)*(35+k%7*15),vy:Math.sin(a)*(35+k%9*12),t:0,life:.7+k%5*.08,color:COLORS[e.color],size:2+k%4});}
   this.words.push({x,y,t:0,text:e.groups>1?'Another little treasure!':'A perfect little set!'});
  }else if(e.type==='send'||e.type==='rotate'){this.words=this.words.filter(w=>w.t<.5);}
  this.fx=this.fx.slice(-140);this.flights=this.flights.slice(-16);this.words=this.words.slice(-2);
 }
 update(dt){this.t+=dt;for(const f of this.fx){f.t+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=80*dt;}this.fx=this.fx.filter(f=>f.t<f.life);for(const f of this.flights)f.t+=dt;this.flights=this.flights.filter(f=>f.t<1.15+f.delay);for(const w of this.words)w.t+=dt;this.words=this.words.filter(w=>w.t<1.6);}
 draw(s,p,guide){const c=this.ctx;c.drawImage(this.back,0,0);let tint=p.skin===1?'#b993c31b':p.skin===2?'#a1e0bf16':null;if(tint){c.fillStyle=tint;c.fillRect(0,0,600,900);}
  // Mascot reacts to the actual match, and shares the exact cover/icon identity.
  const delighted=this.words.length>0,pose=delighted?9:s.busy()?10:8;this.sprite(pose,410,76+(this.reduce?0:Math.sin(this.t*1.7)*2),142,151);
  this.text('FOUR OF A KIND',152,69,13,'#526e61','sans-serif');const recipes=[...new Set(s.puzzle.grid.flat().filter(c=>c>=0))];for(let n=0;n<recipes.length;n++)this.sprite(recipes[n],108+n*43,101,30,30);
  for(let i=0;i<4;i++){const x=50+i%2*250,y=175+(i>>1)*250,active=s.puzzle.active.includes(i);if(!active){c.globalAlpha=.22;this.sprite(4,x+125,y+125,226,226);c.globalAlpha=1;this.sprite(i===2?13:15,x+125,y+125,135,135,i===2?.2:-.2);continue;}
   c.save();c.shadowColor='#102a2e66';c.shadowBlur=13;c.shadowOffsetY=9;this.circle(x+125,y+125,112,'#ead9b7');c.restore();this.sprite(p.skin===2?5:4,x+125,y+125,238,238);
   for(let d=0;d<4;d++){const px=x+125+[0,77,0,-77][d],py=y+125+[-77,0,77,0][d];this.circle(px,py,35,'#bfa88044','#b39a6c55');this.circle(px,py+2,28,'#ad9f8d1c');}
   const empty=s.tiles[i].view().length===0;
   this.circle(x+125,y+129,33,empty?'#b8c4ae':'#2d6463','#a98850');this.circle(x+125,y+125,32,empty?'#c6ceb6':'#3b7470','#e5d7ad');this.text(empty?'✧':'↶',x+125,y+123,33,empty?'#8a9b81':'#f5e3ba');
   for(const d of s.tiles[i].view()){
    const key=i+':'+d.pos;let pos=this.visual.get(key);const dest={x:50+d.x+38.5,y:175+d.y+38.5};if(!pos||s.moves===0||this.reduce){pos={...dest};this.visual.set(key,pos);}else {pos.x+=(dest.x-pos.x)*.62;pos.y+=(dest.y-pos.y)*.62;}
    c.save();c.shadowColor='#503b3655';c.shadowBlur=5;c.shadowOffsetY=4;this.sprite(d.color,pos.x,pos.y,75,75);c.restore();
    const worldDir=(d.pos+s.tiles[i].orientation)%4,j=neighbor(i,worldDir);if(!s.busy()&&s.puzzle.active.includes(j)&&s.slots(j)[(worldDir+2)%4]<0){
     const a=worldDir*Math.PI/2-Math.PI/2;const ax=dest.x+Math.cos(a)*39,ay=dest.y+Math.sin(a)*39;c.save();c.translate(ax,ay);c.rotate(a);c.fillStyle='#fff0c9';c.shadowColor='#264347';c.shadowBlur=2;c.beginPath();c.moveTo(9,0);c.lineTo(-2,-5);c.lineTo(-2,5);c.fill();c.restore();
    }
   }
  }
  for(const m of s.marbles){const x=50+m.xpos+38.5,y=175+m.ypos+38.5;c.save();c.shadowBlur=9;c.shadowColor='#ffe3a299';this.sprite(m.color,x,y,77,77,(m.frame%6)*.015);c.restore();}
  if(guide&&!s.busy()){
   const x=50+guide.i%2*250+125+(guide.kind==='send'?[0,77,0,-77][guide.d]:0),y=175+(guide.i>>1)*250+125+(guide.kind==='send'?[-77,0,77,0][guide.d]:0);
   const pulse=this.reduce?0:Math.sin(this.t*4)*3;c.lineWidth=3;this.circle(x,y,guide.kind==='send'?43+pulse:39+pulse,null,'#fff5c2');this.circle(x,y,guide.kind==='send'?48+pulse:44+pulse,null,'#f5cf7d66');this.text('↓',x,y-66,31,'#fff3bf');
  }
  this.sprite(this.flights.length||s.groups?6:7,300,787,164,150);
  if(s.groups)for(let k=0;k<s.groups;k++)this.sprite(s.collection[k],275+k*24,797,23,23);
  for(const f of this.flights){if(f.t<f.delay)continue;const t=Math.min(1,(f.t-f.delay)/.85),e=1-(1-t)**3,x=f.x+(300-f.x)*e,y=f.y+(786-f.y)*e-Math.sin(t*Math.PI)*105;this.sprite(f.color,x,y,58*(1-t*.55),58*(1-t*.55),t*.5);}
  for(const f of this.fx){c.globalAlpha=1-f.t/f.life;this.circle(f.x,f.y,f.size,f.color);c.globalAlpha=1;}
  for(const w of this.words){c.globalAlpha=Math.min(1,(1.6-w.t)*2);c.shadowColor='#102f3d';c.shadowBlur=5;this.text(w.text,w.x,w.y-60-Math.min(w.t,.8)*18,20,'#fff0c8');c.shadowBlur=0;c.globalAlpha=1;}
 }
 reset(){this.fx=[];this.words=[];this.flights=[];this.visual.clear();}
}

const $=id=>document.getElementById(id),DIRECTIONS=['up','right','down','left'];
const KEY='pearlkeep-1026b',read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null');}catch{return null;}};
let stored=read(),p=profile(stored?.profile),s=null,art,mode='home',last=0,acc=0,paint=0,resultTime=0,controlKey='',selected=0,toastTime=0,previousFocus=null;
const audio={ctx:null,voices:0,async wake(){if(p.mute)return;try{this.ctx??=new (window.AudioContext||window.webkitAudioContext)();if(this.ctx.state==='suspended')await this.ctx.resume();}catch{}},stop(){this.ctx?.suspend().catch(()=>{});},note(freq,duration=.13,delay=0,volume=.035){if(p.mute||mode!=='playing'||!this.ctx||this.ctx.state!=='running'||this.voices>=12)return;const c=this.ctx,o=c.createOscillator(),g=c.createGain(),at=c.currentTime+delay;this.voices++;o.type='sine';o.frequency.setValueAtTime(freq,at);g.gain.setValueAtTime(.001,at);g.gain.exponentialRampToValueAtTime(volume,at+.01);g.gain.exponentialRampToValueAtTime(.001,at+duration);o.connect(g);g.connect(c.destination);o.start(at);o.stop(at+duration+.02);o.onended=()=>{this.voices--;o.disconnect();g.disconnect();};},play(type,color=0){if(type==='match'){[0,4,7,12].forEach((n,i)=>this.note(261.6*2**((n+color*2)/12),.3,i*.065,.045));}else if(type==='send')this.note(660,.15);else if(type==='rotate'){this.note(330,.08);this.note(440,.1,.035);}else if(type==='win')[523,659,784,1047].forEach((f,i)=>this.note(f,.4,i*.09));}};
function save(){try{localStorage.setItem(KEY,JSON.stringify({profile:p,active:s?.snapshot()||stored?.active||null}));}catch{}}
function total(){return p.stars.reduce((a,b)=>a+b,0);}
function unlocked(i){return i===0||i<8&&p.stars[i-1]>0||i>=8&&p.stars.every(n=>n>0);}
function soundUI(){$('sound').textContent=p.mute?'♪':'♫';$('sound').setAttribute('aria-label',p.mute?'Turn sound on':'Turn sound off');}
function message(text){$('toast').textContent=text;$('toast').classList.add('show');toastTime=2;}
function modal(html){mode='paused';audio.stop();previousFocus=document.activeElement;$('panelBody').innerHTML=html;$('overlay').hidden=false;for(const el of [document.querySelector('header'),$('play'),$('home')])el.inert=true;requestAnimationFrame(()=>$('panelBody').querySelector('button')?.focus());save();}
function dismiss(){for(const el of [document.querySelector('header'),$('play'),$('home')])el.inert=false;$('overlay').hidden=true;mode=s?'playing':'home';previousFocus?.focus();if(s)audio.wake();last=performance.now();acc=0;}
function button(id,fn){$(id).onclick=fn;}
function pause(){if(mode!=='playing'||!s)return;modal(`<div class="eyebrow">A LITTLE BREATHER</div><h2 id="panelTitle">Pearls can wait.</h2><p>Turn the middle. Send a pearl.<br>Four matching pearls make a treasure.</p><button id="continue" class="primary">Continue</button><button id="rules">How to play</button><button id="mapFromPause">Keepsake book</button>`);button('continue',dismiss);button('rules',help);button('mapFromPause',book);}
function help(){modal(`<div class="eyebrow">THE LITTLE PEARL WORKSHOP</div><h2 id="panelTitle">Three little things.</h2><p>↶ Tap the middle to turn a dish.<br>➜ Tap a pearl with an arrow to send it to the next dish.<br>✦ Bring four matching pearls into one dish.</p><p class="subtle">No timer. Undo any settled move.<br>Keyboard: 1–4 select a dish, Space turns it,<br>arrow keys send a pearl. Escape pauses.</p><button id="backHelp" class="primary">Got it</button>`);button('backHelp',dismiss);}
function begin(i,seed=341,snapshot=null){if(!unlocked(i))return;toastTime=0;$('toast').classList.remove('show');try{s=new Session(i,seed,snapshot);}catch{s=new Session(i,seed);message('A fresh start. Your keepsakes are safe.');}art.reset();selected=0;resultTime=0;controlKey='';$('home').hidden=true;$('play').hidden=false;dismiss();mode='playing';$('chapter').textContent=i<8?NAMES[i]:`Keepsake ${i-7}`;hud();controls();draw();save();if(s.status==='won')result();}
function action(a){if(mode!=='playing'||!s)return;audio.wake();if(s.guided&&!s.nextGuide()&&s.busy())return;if(s.guideAct(a)){selected=a.i;controlKey='';drain();hud();controls();save();}else if(!s.busy())message(s.guided?'Follow the little glow.':'Turn the dish to find a free path.');}
function drain(){for(const e of s.events.splice(0)){art.event(e,s);audio.play(e.type,e.color);if(e.type==='match'){message(s.groups===s.puzzle.groups?'The keepsake is complete!':'Four of a kind!');if(navigator.vibrate&&!art.reduce)navigator.vibrate([15,35,15]);}if(e.type==='win'){award(p,s);save();resultTime=.9;}}}
function hud(){$('goal').textContent=`✧ ${s.groups} / ${s.puzzle.groups}`;$('moves').textContent=`${s.moves} ${s.moves===1?'turn':'turns'}`;$('message').textContent=s.guided?'Follow the little glow.':s.level===0&&s.moves===0?'Send the glowing pearl →':'Four of a kind. A little treasure.';$('undo').disabled=s.busy()||!s.history.length||s.status!=='playing';$('guide').disabled=s.busy()||s.status!=='playing';$('tip').textContent=s.guided?'Follow the glowing pearl or middle':'Tap a pearl to send it';}
function controls(){const key=JSON.stringify([s.allSlots(),s.busy(),s.status,s.moves,s.guided,s.guideIndex]);if(key===controlKey)return;controlKey=key;const frag=document.createDocumentFragment();
 const suggested=s.nextGuide()||(s.level===0&&s.moves===0?s.puzzle.guide[0]:null);
 for(const i of s.puzzle.active){const x=50+i%2*250+125,y=175+(i>>1)*250+125;const add=(label,a,px,py,enabled)=>{const b=document.createElement('button');b.className='target';b.setAttribute('aria-label',label);b.style.cssText=`left:${px/6}%;top:${py/9}%;width:15%;height:10%`;const isSuggested=suggested&&a.i===suggested.i&&a.kind===suggested.kind&&(a.kind!=='send'||a.d===suggested.d);if(isSuggested){b.dataset.suggested='true';b.setAttribute('aria-description','Suggested next move');}b.disabled=!enabled||s.busy()||s.status!=='playing'||s.guided&&!isSuggested;b.onclick=()=>action(a);frag.append(b);};
  add(`Turn dish ${i+1}`,{kind:'rotate',i},x,y,s.tiles[i].view().length>0);
  s.slots(i).forEach((color,d)=>{if(color<0)return;const j=neighbor(i,d),available=s.puzzle.active.includes(j)&&s.slots(j)[(d+2)%4]<0;add(`Send ${TITLES[color].toLowerCase()} ${DIRECTIONS[d]} from dish ${i+1}`,{kind:'send',i,d},x+[0,77,0,-77][d],y+[-77,0,77,0][d],available);});
 }
 $('targets').replaceChildren(frag);
}
function result(){award(p,s);save();modal(`<div class="eyebrow">${s.level<8?NAMES[s.level].toUpperCase():'A NEW KEEPSAKE'}</div><h2 id="panelTitle">A little treasure.</h2><div class="stars">${'★'.repeat(s.stars())}${'☆'.repeat(3-s.stars())}</div><p>${s.groups} ${s.groups===1?'set':'sets'} · ${s.moves} ${s.moves===1?'turn':'turns'} · ${s.score} points</p><p class="subtle">Finish · No undo or guide · Within ${s.puzzle.par+4} turns</p>${[6,15].includes(total())?'<p>A new dish finish is ready in your book.</p>':''}<button id="next" class="primary">Next keepsake →</button><button id="again">Try another route</button><button id="resultBook">Keepsake book</button>`);button('next',()=>begin(Math.min(1000,s.level+1),s.level>=7?341+(s.level+1)*8731:341));button('again',()=>begin(s.level,s.seed));button('resultBook',book);}
function book(){const stars=total();modal(`<div class="eyebrow">${stars} / 24 LITTLE STARS</div><h2 id="panelTitle">The keepsake book.</h2><div class="map-grid">${NAMES.map((n,i)=>`<button data-level="${i}" ${unlocked(i)?'':'disabled'}>${i+1}. ${n}<small>${p.stars[i]?'★'.repeat(p.stars[i])+'☆'.repeat(3-p.stars[i]):unlocked(i)?'A fresh little puzzle':'Locked'}</small></button>`).join('')}</div><div class="skins">${['Ivory','Velvet · 6★','Sea glass · 15★'].map((n,i)=>`<button data-skin="${i}" class="${p.skin===i?'selected':''}" ${stars<[0,6,15][i]?'disabled':''}>${n}</button>`).join('')}</div>${p.stars.every(n=>n>0)?'<button id="remix">Fresh keepsake ✧</button>':''}<button id="backBook" class="primary">${s?'Back to workshop':'Close book'}</button>`);
 $('panelBody').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{const i=+b.dataset.level;if(s&&s.status==='playing'&&s.moves>0)confirmPanel('Start another keepsake?','Your completed treasures stay in the book.',()=>begin(i));else begin(i);});$('panelBody').querySelectorAll('[data-skin]').forEach(b=>b.onclick=()=>{p.skin=+b.dataset.skin;save();draw();book();});if($('remix'))button('remix',()=>begin(8+p.expedition,341+(8+p.expedition)*8731));button('backBook',()=>{if(s?.status==='won')result();else dismiss();});}
function confirmPanel(title,text,fn){modal(`<div class="eyebrow">THE LITTLE WORKSHOP</div><h2 id="panelTitle">${title}</h2><p>${text}</p><button id="confirm" class="primary">Yes, let's do it</button><button id="cancel">Keep playing</button>`);button('confirm',fn);button('cancel',dismiss);}
function draw(){if(s)art.draw(s,p,s.nextGuide()||(s.level===0&&s.moves===0?s.puzzle.guide[0]:null));}
function frame(now){const dt=Math.min(.08,(now-last)/1000||0);last=now;if(mode==='playing'&&s){acc+=dt;let steps=0;while(acc>=1/120&&steps++<12){s.step(1/120);art.update(1/120);acc-=1/120;}drain();hud();controls();if(toastTime>0){toastTime-=dt;if(toastTime<=0)$('toast').classList.remove('show');}if(resultTime>0){resultTime-=dt;if(resultTime<=0)result();}paint+=dt;if(paint>=1/40){draw();paint=0;}}requestAnimationFrame(frame);}
async function init(){try{art=new Art($('stage'),FRAMES);await Promise.race([art.load(),new Promise((_,reject)=>setTimeout(()=>reject(Error('Image load timeout')),30000))]);$('loading').hidden=true;soundUI();if(stored?.active){$('resume').hidden=false;}button('start',()=>{const i=p.stars.findIndex(n=>!n);begin(i<0?8+p.expedition:i,i<0?341+(8+p.expedition)*8731:341);});button('resume',()=>{const a=stored?.active;if(a&&Number.isInteger(a.level)&&a.level>=0&&a.level<=1000)begin(a.level,a.seed,a);else begin(0);if(s.status==='playing')pause();});button('sound',async()=>{p.mute=!p.mute;soundUI();if(p.mute)audio.stop();else{await audio.wake();audio.note(523);}save();});button('pause',pause);button('book',book);button('undo',()=>{if(mode==='playing'&&s.undo()){art.reset();controlKey='';message('A fresh little chance.');hud();controls();draw();save();}});button('guide',()=>confirmPanel('A gentle guide?','This restarts the puzzle and lights up a safe route. You can still earn two stars.',()=>{s.startGuide();art.reset();controlKey='';dismiss();hud();controls();draw();save();}));
 document.addEventListener('keydown',e=>{if(e.key==='Tab'&&!$('overlay').hidden){const all=[...$('panelBody').querySelectorAll('button:not(:disabled)')];if(!all.length)return;if(e.shiftKey&&document.activeElement===all[0]){e.preventDefault();all.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===all.at(-1)){e.preventDefault();all[0].focus();}return;}if(e.key==='Escape'){e.preventDefault();if(mode==='playing')pause();else if(!$('overlay').hidden&&s?.status==='playing')dismiss();return;}if(mode!=='playing'||!s)return;if(['1','2','3','4'].includes(e.key)){selected=+e.key-1;message(`Dish ${selected+1}`);}const dirs={ArrowUp:0,ArrowRight:1,ArrowDown:2,ArrowLeft:3};if(e.key in dirs){e.preventDefault();action({kind:'send',i:selected,d:dirs[e.key]});}if(e.code==='Space'&&!e.repeat){e.preventDefault();action({kind:'rotate',i:selected});}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){pause();audio.stop();save();}});window.addEventListener('blur',()=>{pause();audio.stop();save();});window.addEventListener('pagehide',save);requestAnimationFrame(frame);
 }catch(e){$('loading').querySelector('p').textContent='The pearls need another moment. Please try again.';$('reload').hidden=false;button('reload',()=>location.reload());console.error(e);}}
init();

})();

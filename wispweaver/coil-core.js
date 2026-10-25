/* Adapted from Coil, Copyright (C) 2011 Hakim El Hattab, MIT.
Actual retained code: Point, Region, line intersection, trail intersection scanner.
See LICENSE-COIL.txt. New API returns intersections instead of using global player state. */
function Point( x, y ) {
	this.x = x || 0; 
	this.y = y || 0;
}

Point.prototype.distanceTo = function(p) {
	var dx = p.x-this.x;
	var dy = p.y-this.y;
	return Math.sqrt(dx*dx + dy*dy);
};

Point.prototype.clonePosition = function() {
	return { x: this.x, y: this.y };
};

Point.prototype.interpolate = function( x, y, amp ) {
	this.x += ( x - this.x ) * amp;
	this.y += ( y - this.y ) * amp;
};

/**
 * Defines of a rectangular region.
 */
function Region() {
	this.left = 999999; 
	this.top = 999999; 
	this.right = 0; 
	this.bottom = 0;
}

Region.prototype.reset = function() {
	this.left = 999999; 
	this.top = 999999; 
	this.right = 0; 
	this.bottom = 0; 
};

Region.prototype.inflate = function( x, y ) {
	this.left = Math.min(this.left, x);
	this.top = Math.min(this.top, y);
	this.right = Math.max(this.right, x);
	this.bottom = Math.max(this.bottom, y);
};

Region.prototype.expand = function( x, y ) {
	this.left -= x;
	this.top -= y;
	this.right += x;
	this.bottom += y;
};

Region.prototype.contains = function( x, y ) {
	return x > this.left && x < this.right && y > this.top && y < this.bottom;
};

Region.prototype.size = function() {
	return ( ( this.right - this.left ) + ( this.bottom - this.top ) ) / 2;
};

Region.prototype.center = function() {
	return new Point( this.left + (this.right - this.left) / 2, this.top + (this.bottom - this.top) / 2 );
};

Region.prototype.toRectangle = function() {
	return { x: this.left, y: this.top, width: this.right - this.left, height: this.bottom - this.top };
};



	function findLineIntersection( p1, p2, p3, p4 ) {
		var s1 = {
			x: p2.x - p1.x,
			y: p2.y - p1.y
		}
		
		var s2 = {
			x: p4.x - p3.x,
			y: p4.y - p3.y
		}
		
		var s = (-s1.y * (p1.x - p3.x) + s1.x * (p1.y - p3.y)) / (-s2.x * s1.y + s1.x * s2.y);
    	var t = ( s2.x * (p1.y - p3.y) - s2.y * (p1.x - p3.x)) / (-s2.x * s1.y + s1.x * s2.y);
		
		if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
			return {
				x: p1.x + ( t * s1.x ),
				y: p1.y + ( t * s1.y )
			};
		}
		
		return null;
	}
	
	function findIntersections(trail) {
		var i = trail.length;
		
		var candidates = [];
		
		while( i-- ) {
			var j = trail.length;
			
			var p1 = trail[i];
			var p2 = trail[i+1];
			
			while( j-- ) {
				
				if ( Math.abs(i-j) > 1 ) {
					var p3 = trail[j];
					var p4 = trail[j + 1];
					
					if (p1 && p2 && p3 && p4) {
						var intersection = findLineIntersection(p1, p2, p3, p4);
						if ( intersection ) {
							candidates.push( [ Math.min(i,j), Math.max(i,j), intersection ] );
						}
					}
				}
				
			}
		}
		
		var intersections = [];
		
		// Remove duplicates
		while( candidates.length ) {
			var i = intersections.length;
			
			var candidate = candidates.pop();
			
			while( i-- ) {
				if( candidate && intersections[i] && candidate[0] === intersections[i][0] && candidate[1] === intersections[i][1] ) {
					candidate = null;
				}
			}
			
			if( candidate ) {
				intersections.push(candidate);
			}
		}
	 return intersections;
	}

// New geometric containment replaces the original full-canvas pixel readback.
function contains(poly,p){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a.y>p.y)!=(b.y>p.y))&&(p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x))yes=!yes;}return yes;}
function closedLoop(trail,tolerance=0){if(trail.length<5)return null;const crossings=findIntersections(trail).filter(ix=>ix[1]-ix[0]>3).sort((a,b)=>(b[1]-b[0])-(a[1]-a[0]));let points;
if(crossings.length){const ix=crossings[0];points=[ix[2],...trail.slice(ix[0]+1,ix[1]+1),ix[2]];}
else if(tolerance&&trail[0].distanceTo(trail[trail.length-1])<tolerance){points=[...trail,trail[0]];}else return null;
let area=0;for(let i=0;i<points.length-1;i++)area+=points[i].x*points[i+1].y-points[i+1].x*points[i].y;if(Math.abs(area)<850)return null;const bounds=new Region();for(const p of points)bounds.inflate(p.x,p.y);return {points,bounds,area:Math.abs(area)/2};}
export {Point,Region,findLineIntersection,findIntersections,contains,closedLoop};

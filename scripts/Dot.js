"use strict";
// Dot module
var Dot = (function() {
	var DOT_SIZE = 10;
	
	// Creates a new dots that bounces around the screen
	function Dot(x, y, velX, velY, shape) {
		this.x = x;
		this.y = y;
		var spd = Math.sqrt(velX * velX + velY * velY);
		this.velX = velX / spd;
		this.velY = velY / spd;
		this.size = DOT_SIZE;
		shape.call(this);
	}
	
	// Updates the state of the dot for every delta time
	Dot.prototype.update = function(dt) {
		this.x += dt * this.velX * dotSpeed;
		this.y += dt * this.velY * dotSpeed;
	};
	
	// Bounces the dot, reflecting the velocity about a given axis normal to the collision
	Dot.prototype.bounce = function(axisX, axisY) {
		var dotVelAxis = this.velX * axisX + this.velY * axisY;
		var ySolns = quadratic(axisX * axisX + axisY * axisY, -2 * axisY * dotVelAxis, dotVelAxis * dotVelAxis - (this.velX * this.velX + this.velY * this.velY) * axisX * axisX);
		switch(ySolns.length) {
			case 1:
				this.velX *= -1;
				this.velY *= -1;
				break;
			case 2:
				var xSolns = ySolns.map(function(y) {
					return (dotVelAxis - axisY * y) / axisX;
				});
				if(dist(xSolns[0], ySolns[0], this.velX, this.velY) < dist(xSolns[1], ySolns[1], this.velX, this.velY)) {
					this.velX = -xSolns[1];
					this.velY = -ySolns[1];
				} else {
					this.velX = -xSolns[0];
					this.velY = -ySolns[0];
				}
		}
	};
	
	return Dot;
})();
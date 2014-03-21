"use strict";
// Dot module
var Dot = (function() {
	var DOT_SIZE = 10;
	
	// Creates a new dots that bounces around the screen
	function Dot(x, y, velX, velY, shape) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.size = DOT_SIZE;
		shape.call(this);
	}
	
	// Updates the state of the dot for every delta time
	Dot.prototype.update = function(dt) {
		this.x += dt * this.velX;
		this.y += dt * this.velY;
	};
	
	// Reverses the direction of the dot's motion
	Dot.prototype.reverse = function() {
		this.velX *= -1;
		this.velY *= -1;
	};
	
	return Dot;
})();
"use strict";
// Bumper module
var Bumper = (function() {
	// Creates a new bumper that dots can bounce off of
	function Bumper(x, y, shape) {
		this.x = x;
		this.y = y;
		this.isGrowing = true;
		this.size = 0;
		shape.call(this);
	}
	
	// Makes the bumper grow
	function grow(dt) {
		this.size += dt * 100;
	}
	
	// Makes the bumper pulsate in the desired pattern
	function pulsate(dt) {
	}
	
	// Updates the state of the bumper every delta time
	Bumper.prototype.update = function(dt) {
		(this.isGrowing ? grow : pulsate).call(this, dt);
	};
	
	// Stops the initial growth of the bumper so that it starts its regular pulsating instead
	Bumper.prototype.stopGrowth = function() {
		this.isGrowing = false;
	};
	
	return Bumper;
})();
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
	function pulsate(dt, drawingCanvas) {
		var pixel = drawingCanvas.getPixelAt(this.x, this.y);
		var selected, other;
		switch(colorFilter) {
			case "red":
				selected = pixel.red;
				other = (pixel.green + pixel.blue) / 2;
				break;
			case "green":
				selected = pixel.green;
				other = (pixel.red + pixel.blue) / 2;
				break;
			case "blue":
				selected = pixel.blue;
				other = (pixel.red + pixel.green) / 2;
				break;
			default:
		}
		this.sinusoidalInput += dt * Math.PI * (1 + (selected - other) / 512);
		this.size = (this.maxSize * 3 + this.maxSize * Math.cos(this.sinusoidalInput)) / 4;
	}
	
	// Updates the state of the bumper every delta time
	Bumper.prototype.update = function(dt, drawingCanvas) {
		(this.isGrowing ? grow : pulsate).call(this, dt, drawingCanvas);
	};
	
	// Stops the initial growth of the bumper so that it starts its regular pulsating instead
	Bumper.prototype.stopGrowth = function() {
		this.isGrowing = false;
		this.maxSize = this.size;
		this.sinusoidalInput = 0;
	};
	
	return Bumper;
})();
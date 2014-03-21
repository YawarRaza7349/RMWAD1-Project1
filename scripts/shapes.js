"use strict";
// Function that should be called/applied in order to add circle functionality to an object
function applyCircle() {
	// Translate the shape-agnostic "size" into a more circle-specific mesaurement
	this.getRadius = function() {
		return this.size / 2;
	}
	// Draws the circle on the canvas (styles are applied external to this method)
	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.getRadius(), 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	};
	// Determine whether this shape collides with the parameter
	this.collide = function(shape) {
		return shape.collideCircle(this);
	};
	// Determine whether this shape collides with a given circle
	this.collideCircle = function(shape) {
		return dist(this.x, this.y, shape.x, shape.y) < this.getRadius() + shape.getRadius();
	};
	// Nudge this shape off of any it is colliding
	this.nudge = function(shape) {
		shape.nudgeCircle(this);
	};
	// Nudge a circle off of this shape
	this.nudgeCircle = function(shape) {
		var centerDist = dist(this.x, this.y, shape.x, shape.y);
		var desiredDist = shape.getRadius() + this.getRadius();
		var diffX = (shape.x - this.x) * desiredDist / centerDist;
		var diffY = (shape.y - this.y) * desiredDist / centerDist;
		shape.x = this.x + diffX;
		shape.y = this.y + diffY;
	};
	// Bounces a circle off given wall measurements if it collides with those walls
	this.bounceWalls = function(minX, minY, maxX, maxY) {
		if(this.x - this.getRadius() < minX) {
			this.x = minX + this.getRadius();
			this.velX *= -1;
		}
		if(this.x + this.getRadius() > maxX) {
			this.x = maxX - this.getRadius();
			this.velX *= -1;
		}
		if(this.y - this.getRadius() < minY) {
			this.y = minY + this.getRadius();
			this.velY *= -1;
		}
		if(this.y + this.getRadius() > maxY) {
			this.y = maxY - this.getRadius();
			this.velY *= -1;
		}
	};
}
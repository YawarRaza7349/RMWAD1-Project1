function applyCircle() {
	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size/2, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	};
	this.collide = function(shape) {
		shape.collideCircle(this);
	};
	this.collideCircle = function(shape) {
		return 2 * dist(this.x, this.y, shape.x, shape.y) < this.size + shape.size;
	};
}
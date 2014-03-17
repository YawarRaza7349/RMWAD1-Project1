function applyCircle() {
	this.draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size/2, 0, 2 * Math.PI);
		ctx.fill();
	};
}
var Dot = (function() {
	var DOT_SIZE = 10;
	
	function Dot(x, y, velX, velY, shape) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
		this.size = DOT_SIZE;
		shape.call(this);
	}
	
	Dot.prototype.update = function(dt) {
		this.x += dt * this.velX;
		this.y += dt * this.velY;
	};
	
	Dot.prototype.reverse = function() {
		this.velX *= -1;
		this.velY *= -1;
	};
	
	return Dot;
})();
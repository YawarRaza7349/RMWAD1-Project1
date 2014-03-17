var Bumper = (function() {
	function Bumper(x, y, shape) {
		this.x = x;
		this.y = y;
		this.isGrowing = true;
		this.size = 0;
		shape.call(this); // adds function draw(ctx);
	}
	
	function grow(dt) {
		this.size += dt * 100;
	}

	function pulsate(dt) {
	}

	Bumper.prototype.update = function(dt) {
		(this.isGrowing ? grow : pulsate).call(this, dt);
	};
	
	Bumper.prototype.stopGrowth = function() {
		this.isGrowing = false;
	};
	
	return Bumper;
})();
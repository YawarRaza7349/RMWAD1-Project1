"use strict";
// Returns the distance between two given points
function dist(x1, y1, x2, y2) {
	var dx = x2 - x1;
	var dy = y2 - y1;
	return Math.sqrt(dx * dx + dy * dy);
}

// Namespace for canvas-related code
(function() {
	var canvas, ctx, bumpers, dots, time, mouseHeld, pmouseX, pmouseY, mouseX, mouseY, drawingBuffer, DRAWING_WIDTH, SIMULATION_WIDTH, CANVAS_HEIGHT;
	
	// Gets all objects in the scene that can collide with other objects
	function getCollidables() {
		return [].concat(bumpers, dots);
	}
	
	// Initialize state and event listeners, and kicks off game loop
	function init() {
		var INIT_NUM_DOTS = 20;
		canvas = document.querySelector("canvas");
		ctx = canvas.getContext("2d");
		bumpers = [];
		dots = [];
		drawingBuffer = null;
		mouseHeld = false;
		DRAWING_WIDTH = canvas.width / 2;
		SIMULATION_WIDTH = canvas.width / 2;
		CANVAS_HEIGHT = canvas.height;
		for(var i = 0; i < INIT_NUM_DOTS; ++i) {
			dots.push(new Dot(Math.random() * SIMULATION_WIDTH + DRAWING_WIDTH, Math.random() * CANVAS_HEIGHT, Math.random() * 50, Math.random() * 50, applyCircle));
		}
		canvas.addEventListener("mousedown", mouseDown);
		canvas.addEventListener("mouseup", mouseUp);
		canvas.addEventListener("mousemove", mouseMove);
		time = Date.now();
		window.requestAnimationFrame(loop);
	}
	
	// Main game loop that runs every frame (as determined by Canvas)
	function loop() {
		var prevTime = time;
		time = Date.now();
		var dt = (time - prevTime) / 1000;
		ctx.fillStyle = "black";
		ctx.fillRect(DRAWING_WIDTH, 0, SIMULATION_WIDTH, CANVAS_HEIGHT);
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		
		// Updates bumpers
		bumpers.forEach(function(b) {
			b.update(dt);
			if(getCollidables().some(function(c) {
				return c !== b && c.collide(b);
			})) {
				b.stopGrowth();
			}
		});
		
		// Updates dots
		dots.forEach(function(d) {
			d.update(dt);
		});
		
		// Dot-bumper collisions
		dots.forEach(function(d) {
			bumpers.some(function(b) {
				if(d.collide(b)) {
					d.nudge(b);
					d.reverse(); // TODO: Change me later to accurate non-shitty physics
					return true;
				}
				return false;
			});
		});
		
		// Dot-boundary collisions
		dots.forEach(function(d) {
			d.bounceWalls(DRAWING_WIDTH, 0, DRAWING_WIDTH + SIMULATION_WIDTH, CANVAS_HEIGHT);
		});
		
		// Pastes a selected image to the canvas
		if(imageToPaste) {
			var imageObjectToPaste = document.createElement("img");
			imageObjectToPaste.addEventListener("load", function() {
				switch(imgSetting) {
					case "keep":
						ctx.drawImage(imageObjectToPaste, 0, 0, Math.min(imageObjectToPaste.width, DRAWING_WIDTH), Math.min(imageObjectToPaste.height, CANVAS_HEIGHT), 0, 0, Math.min(imageObjectToPaste.width, DRAWING_WIDTH), Math.min(imageObjectToPaste.height, CANVAS_HEIGHT));
						break;
					case "ratio":
						var multiplier = Math.min(DRAWING_WIDTH / imageObjectToPaste.width, CANVAS_HEIGHT / imageObjectToPaste.height);
						ctx.drawImage(imageObjectToPaste, 0, 0, imageObjectToPaste . width * multiplier, imageObjectToPaste.height * multiplier);
						break;
					case "stretch":
						ctx.drawImage(imageObjectToPaste, 0, 0, DRAWING_WIDTH, CANVAS_HEIGHT);
						break;
				}
				window.URL.revokeObjectURL(imageToPaste);
				imageToPaste = null;
			});
			imageObjectToPaste.src = imageToPaste;
		}
		
		// Draws bumpers
		bumpers.forEach(function(b) {
			b.draw(ctx);
		});
		
		// Draws dots
		dots.forEach(function(d) {
			d.draw(ctx);
		});
		window.requestAnimationFrame(loop);
	}
	
	// Draws on the drawing side of the canvas
	function drawOnCanvas() {
		if(mouseHeld && pmouseX < DRAWING_WIDTH && mouseX < DRAWING_WIDTH) {
			var diffX = mouseX - pmouseX;
			var diffY = mouseY - pmouseY;
			var maxDiff = Math.max(Math.abs(diffX), Math.abs(diffY));
			var dx = diffX / maxDiff;
			var dy = diffY / maxDiff;
			ctx.save();
			ctx.fillStyle = colorStr;
			for(var i = 0; i < maxDiff; ++i) {
				ctx.beginPath();
				ctx.arc(pmouseX + dx * i, pmouseY + dy * i, strokeWidth / 2, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.restore();
		}
	}
	
	// Event handler for the mouse down action
	function mouseDown(e) {
		mouseHeld = true;
		if(mouseX > DRAWING_WIDTH) {
			bumpers.push(new Bumper(mouseX, mouseY, applyCircle));
		}
	}
	
	// Event handler for the mouse up action
	function mouseUp(e) {
		mouseHeld = false;
		bumpers.forEach(function(b) {
			b.stopGrowth();
		});
	}
	
	// Event handler for the mouse move action
	function mouseMove(e) {
		pmouseX = mouseX;
		pmouseY = mouseY;
		mouseX = e.clientX - canvas.offsetLeft;
		mouseY = e.clientY - canvas.offsetTop;
		drawOnCanvas();
	}
	
	window.addEventListener("load", init);
})();
"use strict";
var color, colorStr, strokeWidth, imageToPaste, imgSetting;

// Namespace for HTML control-related code
(function() {
	// Initializes all controls
	function init() {
		color = {
			toString: function() {
				return "rgba(" + ["red", "green", "blue"].map(function(colorComp) {
					return color[colorComp];
				}).concat(color.alpha / 255).join(", ") + ")";
			}
		};
		
		// Slider control-numeric label synchronization
		Array.prototype.forEach.call(document.querySelectorAll("tr"), function(row) {
			var slider = row.querySelector("input[type=range]");
			function sliderChanged() {
				row.querySelector("td:nth-child(3)").innerHTML = slider.value;
			}
			if(slider) {
				slider.addEventListener("input", sliderChanged);
				sliderChanged();
			}
		});
		
		// Listeners to update selected color when a color slider is changed
		["red", "green", "blue", "alpha"].forEach(function(colorComp) {
			var slider = document.querySelector("tr#" + colorComp + " input");
			function colorChanged() {
				color[colorComp] = slider.value;
				colorStr = color.toString();
			}
			slider.addEventListener("change", colorChanged);
			color[colorComp] = slider.value;
		});
		colorStr = color.toString();
		
		// Listener to update drawing stroke width
		var strokeWidthInput = document.querySelector("tr#strokeWidth input");
		function strokeWidthChanged() {
			strokeWidth = parseInt(strokeWidthInput.value);
		}
		strokeWidthInput.addEventListener("change", strokeWidthChanged);
		strokeWidthChanged();
		
		// Listener to paste an external image to the drawing canvas
		imageToPaste = null;
		var imageInput = document.querySelector("tr#importImage input");
		imageInput.addEventListener("change", function() {
			imageToPaste = window.URL.createObjectURL(imageInput.files[0]);
			imgSetting = document.querySelector("tr#importImage option:checked").id;
		});
	}
	
	window.addEventListener("load", init);
})();
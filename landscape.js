
function getTanDeg(deg) {
   var rad = deg * Math.PI/180;
   return Math.tan(rad);
}
step = 0;
globCenterX = 100;
globCenterY = 100;
globXAngle = 40;
globYAngle = 40;
globWidth = 400;
globHeight = 400;

function Building(centerX, centerY, xAngle, yAngle, width, height) {
	this.centerX = centerX;
	this.centerY = centerY;
	this.xAngle = xAngle;
	this.yAngle = yAngle;
	this.width = width;
	this.height = height;
	this.draw = function(context, request) {
		
	};

}

function Line (startX, startY, endX, endY) {
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	this.draw = function(context, request) {
		context.beginPath();
		console.log("DRAW");
		context.moveTo(this.startX, this.startY);
		console.log(this.startX);
		console.log(this.startY);
		step += 0.005;
		if (step > 1) step = 1;
		var newX = this.startX + (this.endX - this.startX) * step;
		var newY = this.startY + (this.endY - this.startY) * step;
		context.lineTo(newX, newY);
		context.stroke();
		if (Math.abs(newX) >= Math.abs(this.endX) && Math.abs(newY) >= Math.abs(this.endY)) {
			//now trigger the next using Backbone Events
			step = 0;
		}
	};
}

function animateWrapper(centerX, centerY, xAngle, yAngle, width, height) {

	var line = new Line(centerX, centerY, centerX, centerY - height);
	var canvas = document.getElementById("drawing");
	var context = canvas.getContext('2d');
	console.log("REQUEST");
	animate();
	console.log(request);
	function animate() {
		console.log("ANIMATE CALLED");
		var request = requestAnimationFrame(animate);
		line.draw(context, request);
	}
}

function animatedDrawLine(startX, startY, endX, endY) {


}

function drawLine(startX, startY, endX, endY, context, request) {
	context.beginPath();
	context.moveTo(startX, startY);
	step += 0.005;
	// if (step > 1) step = 1;
	var newX = startX + (endX - startX) * step;
	var newY = startY + (endY - startY) * step;
	context.lineTo(newX, newY);
	context.stroke();
	if (Math.abs(newX) >= Math.abs(endX) && Math.abs(newY) >= Math.abs(endY)) {
		cancelAnimationFrame(request);
		step = 0;
	}
}


function drawBuilding(centerX, centerY, xAngle, yAngle, width, height) {
	var canvas = document.getElementById("drawing");
	var context = canvas.getContext('2d');
	context.beginPath();
	context.moveTo(centerX, centerY);
	//draw center line
	context.lineTo(centerX, centerY - height);
	//draw upper right line
	var yToDrawTo = (centerY - height) - ((width/2) * getTanDeg(xAngle));
	var topFaceHeight = yToDrawTo;
	context.lineTo(centerX + width/2, yToDrawTo);
	context.lineTo(centerX + width/2, yToDrawTo + height);
	context.lineTo(centerX, centerY);

	yToDrawTo = centerY - ((width/2) * getTanDeg(xAngle));
	console.log(yToDrawTo);

	context.lineTo(centerX - width/2, yToDrawTo);
	context.lineTo(centerX - width/2, yToDrawTo - height);
	context.lineTo(centerX, centerY - height);
	context.moveTo(centerX - width/2, yToDrawTo - height);
	var topFaceHeight = getTanDeg(xAngle) * (width/2);
	context.lineTo(centerX, centerY  - height -  topFaceHeight * 2);
	yToDrawTo = (centerY - height) - ((width/2) * getTanDeg(xAngle));
	context.lineTo(centerX + width/2, yToDrawTo);
	context.stroke();

}
$(document).ready(function(){
	animateWrapper(100, 100, 40, 40, 400, 400);
});
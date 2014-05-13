
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

function Building(centerX, centerY, xAngle, yAngle, width, height, context) {
	this.centerX = centerX;
	this.centerY = centerY;
	this.xAngle = xAngle;
	this.yAngle = yAngle;
	this.width = width;
	this.height = height;
	this.lines = [];
	this.context = context;
	var line1 = new Line(centerX, centerY, centerX, centerY - height);
	var yToDrawTo = (centerY - height) - ((width/2) * getTanDeg(xAngle));
	var line2 = new Line(centerX, centerY - height, centerX + width/2, yToDrawTo);
	var line3 = new Line(centerX + width/2, yToDrawTo, centerX + width/2, yToDrawTo + height);
	var line4 = new Line(centerX + width/2, yToDrawTo + height, centerX, centerY);
	yToDrawTo = centerY - ((width/2) * getTanDeg(xAngle));
	var line5 = new Line(centerX, centerY,centerX - width/2, yToDrawTo);
	var line6 = new Line(centerX - width/2, yToDrawTo, centerX - width/2, yToDrawTo - height);
	var line7 = new Line(centerX - width/2, yToDrawTo - height, centerX, centerY - height);
	var topFaceHeight = getTanDeg(xAngle) * (width/2);
	var line8 = new Line(centerX - width/2, yToDrawTo - height, centerX, centerY - height - topFaceHeight*2);
	yToDrawTo = (centerY - height) - ((width/2) * getTanDeg(xAngle));
	var line9 = new Line(centerX, centerY - height - topFaceHeight*2, centerX + width/2, yToDrawTo);

	this.lines.push(line1);
	this.lines.push(line2);
	this.lines.push(line3);
	this.lines.push(line4);
	this.lines.push(line5);
	this.lines.push(line6);
	this.lines.push(line7);
	this.lines.push(line8);
	this.lines.push(line9);

	this.draw = function(context, request) {
		for(var i = 0; i < this.lines.length; i++){
			this.lines[i].draw(this.context);
		}
	};

	this.addWindows = function(nWindows) {
		var heightPerWindow = this.height/nWindows;
		for(var i = 0; i < )
	}
}

function Line (startX, startY, endX, endY) {
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	this.draw = function(context, request) {
		context.beginPath();
		context.moveTo(this.startX, this.startY);
		step += 0.0005;
		if (step > 1) step = 1;

		var newX = this.startX + (this.endX - this.startX) * step;
		var newY = this.startY + (this.endY - this.startY) * step;
		context.lineTo(newX, newY);
		context.stroke();
		if (Math.abs(newX) >= Math.abs(this.endX) && Math.abs(newY) >= Math.abs(this.endY)) {
			// cancelAnimationFrame(request);
			//now trigger the next using Backbone Events
		}
	};
}

function animateWrapper(centerX, centerY, xAngle, yAngle, width, height) {
	var yToDrawTo = (centerY - height) - ((width/2) * getTanDeg(xAngle));
	console.log("CENTER X");
	console.log(centerX);
	console.log("CENTER Y - height");
	console.log(centerY - height);
	console.log("CENTER X + WIDTH /2");
	console.log(centerX + width/2);
	console.log("Y to draw to");
	console.log(yToDrawTo);
	var line = new Line(centerX, centerY - height, centerX + width/2, yToDrawTo);
	var canvas = document.getElementById("drawing");
	var context = canvas.getContext('2d');

	var building = new Building(centerX, centerY, xAngle, yAngle, width, height, context);
	animate();

	function animate() {	
		// line.draw(context, request);
		requestAnimationFrame(animate);
		building.draw();
	};


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
	animateWrapper(600, 800, 20, 20, 400, 400);
});

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
		var yToDrawToLeft = centerY - ((width/2) * getTanDeg(xAngle));
		var yToDrawToRight = (centerY - height) - ((width/2) * getTanDeg(xAngle));
		var windowLines = [];
	var line4 = new Line(centerX + width/2, yToDrawTo + height, centerX, centerY);

		for(var i = 0; i < nWindows; i++){
			var windowLineLeft = new Line(centerX, centerY - heightPerWindow*i, centerX - width/2, yToDrawToLeft - heightPerWindow*i);
			windowLines.push(windowLineLeft);
			var windowLineRight = new Line(centerX + width/2, yToDrawToRight + heightPerWindow*i, centerX, centerY - height +  heightPerWindow*i);
			windowLines.push(windowLineRight);
		};
		for (var i = 0; i < windowLines.length; i++) {
			windowLines[i].draw(this.context);
		}

	}
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random()*(max - min +1) + min);
}

function Bush(centerX, centerY, radius) {
	this.centerX = centerX;
	this.centerY = centerY;
	this.radius = radius;
	this.draw = function(context) {
		var leftMostX = randomIntFromInterval(centerX - radius/2 - 2, centerX - radius/2 + 2);
		var rightMostX = randomIntFromInterval(centerX + radius/2 - 2, centerX + radius/2 - 2);
		var topMostY = randomIntFromInterval(centerY - radius/2 - 2, centerY - radius/2 + 2);
		context.stroke();
	}
}

function CurvedLine (points, maxDistanceFromCenter) {
	// this.startX = startX;
	// this.startY = startY;
	// this.endX = endX;
	// this.endY = endY;
	this.points = points;
	// this.maxDistanceFromCenter = maxDistanceFromCenter;
	this.draw = function(context, request) {
		context.beginPath();
		//change this to animatedCurve
		context.animatedCurve(this.points, 0.5, 20, false);
		context.stroke();
		context.closePath();
	};
}


function Line (startX, startY, endX, endY, strokeColor, width) {
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
	this.strokeColor = strokeColor;
	this.width = width;

	this.draw = function(context, request) {
		context.beginPath();
		context.moveTo(this.startX, this.startY);
		step += 0.0005;
		if (step > 1) step = 1;

		var newX = this.startX + (this.endX - this.startX) * step;
		var newY = this.startY + (this.endY - this.startY) * step;
		context.lineTo(newX, newY);

		if (typeof this.strokeColor !== undefined) {
			context.strokeStyle = this.strokeColor;
		} 
		if (typeof this.width !== undefined) {
			context.lineWidth = this.width;
		}
		context.stroke();

		if (Math.abs(newX) >= Math.abs(this.endX) && Math.abs(newY) >= Math.abs(this.endY)) {
			// cancelAnimationFrame(request);
			//now trigger the next using Backbone Events
		}
	};
}

function animateWrapper(centerX, centerY, xAngle, yAngle, width, height) {
	var yToDrawTo = (centerY - height) - ((width/2) * getTanDeg(xAngle));
	var line = new Line(centerX, centerY - height, centerX + width/2, yToDrawTo);
	var canvas = document.getElementById("drawing");
	var context = canvas.getContext('2d');

	//var building = new Building(centerX, centerY, xAngle, yAngle, width, height, context);
	animate();

	function animate() {	
		requestAnimationFrame(animate);
		building.draw();
		building.addWindows(20, "#d3d3d3", 2);
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

function G(topLeftX, topLeftY, topRightX, topRightY, context) {
	this.context = context;
	this.lines = [];
	var topLine = new CurvedLine()
	this.lines.push(topLine);
	this.draw = function(context, request) {
		for(var i = 0; i < this.lines.length; i++){
			this.lines[i].draw(context);
		}
	};


}
$(document).ready(function(){
	//animateWrapper(600, 800, 20, 20, 400, 400);
	var curvedLine = new CurvedLine([100,100, 120, 80, 140, 85]);
	var g = new G(150, 100, 200, 225);
	var canvas = document.getElementById("drawing");
	var context = canvas.getContext('2d');
	//g.draw(context);

	var topGRight = new CurvedLine([140, 85, 180, 100]);


	// context.curve([120, 80, 140, 90], 0, 20, false);
	// context.stroke();
	context.curve([100, 100, 140, 80], 0, 20, false);
	context.stroke();
	context.curve([140, 80, 160, 90], 0.2, 20, false);


	context.stroke();
	context.curve([140, 80, 126, 115, 120, 150], 0.5, 20, false);
	context.stroke();
	context.curve([120, 150, 100, 165], 0, 20, false);
	context.stroke();
	context.curve([100, 160, 100, 140], 0, 20, false);
	context.curve([100, 140, 85, 185, 95, 185], 0.4, 20, false);
	context.stroke();
	context.curve([95, 185, 93, 180], 0, 20, false);
	context.moveTo(100, 100);
	context.curve([100, 100, 100, 120], 0, 20, false);
	context.stroke();
	context.curve([100,120, 50, 170, 60, 220, 100, 190], 0.7, 20, false);
	context.stroke();
	context.curve([100, 190, 102, 215], 0, 20, false);
	context.stroke();
	context.curve([102, 215, 120, 220], 0, 20, false);
	context.stroke();
	context.curve([120, 220, 110, 170], 0, 20, false);
	context.stroke();
	context.curve([110, 170, 93, 180], 0, 20, false);
	context.stroke();

	context.moveTo(160, 90);
	context.curve([160, 90, 145, 120], 0, 20, false);
	context.stroke();

	context.moveTo(115, 200);
	context.curve([115, 200, 125, 202], 0, 20, false);
	context.stroke();
	context.curve([125, 202, 120, 175], 0, 20, false);
	context.stroke();
	context.curve([120, 175, 125, 180], 0, 20, false);
	context.stroke();

	context.curve([125, 180, 145, 170, 155, 175, 140, 200, 130, 240], 0.5, false);
	context.stroke();


	context.curve([130, 240, 155, 230], 0, false);
	context.stroke();

	context.curve([155, 230, 158, 210, 180, 155, 135, 162], 0.5, false);
	context.stroke();

	context.curve([135, 162, 180, 140, 180, 100, 130, 130], 0.9, false);
	context.stroke();

	context.moveTo(140, 150);
	context.curve([140, 150, 155, 140, 155, 130], 0.5, 20,  true);
	context.stroke();

	// context.moveTo(120,150);
	// context.curve([120, 150, 100, 100], 0, 20, false);
	// context.stroke();

		// var height = this.endY - this.startY;
		// context.animatedCurve([this.startX, this.startY,this.startX - maxDistanceFromCenter, this.startY + height/2, this.endX, this.endY], 0.5, 20, false);
		// context.stroke();



});
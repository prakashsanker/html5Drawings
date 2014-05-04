
function getTanDeg(deg) {
   var rad = deg * Math.PI/180;
   return Math.tan(rad);
}
var step = 0;
var globCenterX = 0;
var globCenterY = 0;
var globXAngle = 0;
var globYAngle = 0;
var globWidth = 0;
var globHeight = 0;

function animateWrapper(centerX, centerY, xAngle, yAngle, width, height) {
	var request = requestAnimationFrame(animate);
//	drawBuilding(centerX, centerY, xAngle, yAngle, width, height);
	var canvas = document.getElementById("drawing");
	var context = canvas.getContext('2d');
	function animate (centerX, centerY, xAngle, width, height) {
		drawLine(centerX,centerY, centerX, centerY - height, context, request);
	}



	// context.moveTo(centerX, centerY);
	// var yToDrawTo = (centerY - height) - ((width/2) * getTanDeg(xAngle));
	// drawLine(centerX, centerY - height, centerX + width/2, yToDrawTo, context, request);
	//drawLine(0,0, 100, 100, context, request);
}

function drawLine(startX, startY, endX, endY, context, request) {
	context.beginPath();
	context.moveTo(startX, startY);
	step += 0.05;
	console.log("STEP");
	console.log(step);
	// if (step > 1) step = 1;
	var newX = startX + (endX - startX) * step;
	var newY = startY + (endY - startY) * step;
	context.lineTo(newX, newY);
	context.stroke();
	console.log("startX");
	console.log(startX);
	console.log("START Y");
	console.log(startY);

	console.log("NEW X");
	console.log(newX);
	console.log("END X");
	console.log(endX);
	console.log("NEW Y");
	console.log(newY);
	console.log("END Y");
	console.log(endY);
	console.log("=====");
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
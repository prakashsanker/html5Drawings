/*!	Curve extension for canvas 2.1
 *	Epistemex (c) 2013-2014
 *	License: MIT
*/

/**
 * Draws a cardinal spline through given point array. Points must be arranged
 * as: [x1, y1, x2, y2, ..., xn, yn]. It adds the points to the current path.
 *
 * The method continues previous path of the context. If you don't want that
 * then you need to use moveTo() with the first point from the input array.
 *
 * The points for the cardinal spline are returned as a new array.
 *
 * @param {Array} points - point array
 * @param {Number} [tension=0.5] - tension. Typically between [0.0, 1.0] but can be exceeded
 * @param {Number} [numOfSeg=20] - number of segments between two points (line resolution)
 * @param {Boolean} [close=false] - Close the ends making the line continuous
 * @returns {Array} New array with the calculated points that was added to the path
 */
CanvasRenderingContext2D.prototype.animatedCurve = function(points, tension, numOfSeg, close) {
	var points = CanvasRenderingContext2D.prototype.curve(points, tension, numOfSeg, close);
	var i = 0;
	var that = this;
	console.log("POINTS");
	console.log(points);
	animateCurve();
	function animateCurve() {
		var request = requestAnimationFrame(animateCurve);
		console.log("ANIMATE CALLED");
		console.log(points[i]);
		console.log(points[i+1]);
		console.log("=====");
		that.lineTo(points[i], points[i+1]);
		if ( i > points.length - 2){
			cancelAnimationFrame(request);
		}
		i = i + 2;
		that.stroke();
	}

}


CanvasRenderingContext2D.prototype.curve = function(points, tension, numOfSeg, close) {

	'use strict';

	// options or defaults
	tension = (typeof tension === 'number') ? tension : 0.5;
	numOfSeg = numOfSeg ? numOfSeg : 20;

	var pts,					// clone point array
		res = [],
		l = points.length, i,
		cache = [];

	pts = points.slice(0);		// TODO check if pre-push then concat is faster instead of slice and unshift

	if (close) {
		pts.unshift(points[l - 1]); // insert end point as first point
		pts.unshift(points[l - 2]);
		pts.push(points[0], points[1]); // first point as last point
	}
	else {
		pts.unshift(points[1]);	// copy 1. point and insert at beginning
		pts.unshift(points[0]);
		pts.push(points[l - 2], points[l - 1]);	// duplicate end-points
	}

	// cache inner-loop calculations as they are based on t alone
	cache.push([1, 0, 0, 0]);

	for (i = 1; i < numOfSeg; i++) {

		var st = i / numOfSeg,
			st2 = st * st,
			st3 = st2 * st,
			st23 = st3 * 2,
			st32 = st2 * 3;

		cache.push([
			st23 - st32 + 1,	// c1
			st32 - st23,		// c2
			st3 - 2 * st2 + st,	// c3
			st3 - st2			// c4
		]);
	}

	cache.push([0, 1, 0, 0]);

	// calc. points
	parse(pts, cache);

	if (close) {
		//l = points.length;
		pts = [];
		pts.push(points[l - 4], points[l - 3], points[l - 2], points[l - 1]); // second last and last
		pts.push(points[0], points[1], points[2], points[3]); // first and second
		parse(pts, cache);
	}

	function parse(pts, cache) {

		for (var i = 2; i <= l; i += 2) {

			var pt1 = pts[i],
				pt2 = pts[i+1],
				pt3 = pts[i+2],
				pt4 = pts[i+3],

				t1x = (pt3 - pts[i-2]) * tension,
				t1y = (pt4 - pts[i-1]) * tension,
				t2x = (pts[i+4] - pt1) * tension,
				t2y = (pts[i+5] - pt2) * tension;

			for (var t = 0; t <= numOfSeg; t++) {

				var c = cache[t];

				res.push(c[0] * pt1 + c[1] * pt3 + c[2] * t1x + c[3] * t2x,
						 c[0] * pt2 + c[1] * pt4 + c[2] * t1y + c[3] * t2y);
			}
		}
	}

	// add lines to path
	// for(i = 0, l = res.length; i < l; i += 2)
	// 	this.lineTo(res[i], res[i+1]);

	return res;
};

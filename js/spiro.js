var spiro = (function($) {

    var centerx;

    var centery;

    function drawSquare(ctx, x, y, len) {
	ctx.moveTo(x, y);
	ctx.beginPath();
	ctx.lineTo(x + len, y);
	ctx.lineTo(x + len, y - len);
	ctx.lineTo(x, y - len);
	ctx.lineTo(x, y);
	ctx.closePath();
	ctx.stroke();
    }

    function drawTriangle(ctx, x, y, len) {
	ctx.moveTo(x, y);
	ctx.beginPath();
	ctx.lineTo(x + len, y);
	ctx.lineTo(x + (len / 2), y - len);;
	ctx.lineTo(x, y);
	ctx.closePath();
	ctx.stroke();
    }

    function drawCircle(ctx, x, y, r) {
	ctx.beginPath();
	ctx.arc(x + (r/2), y, r, 0, 2*Math.PI);
	ctx.closePath();
	ctx.stroke();
    }

    function drawOval(ctx, x, y, len) {
	// https://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
	var w = len;
	var h = 20 + (len * .10);
	var kappa = .5522848;
	var ox = (w / 2) * kappa; // control point offset horizontal
	var oy = (h / 2) * kappa; // control point offset vertical
	var xe = x + w;           // x-end
	var ye = y + h;           // y-end
	var xm = x + w / 2;       // x-middle
	var ym = y + h / 2;       // y-middle

	ctx.beginPath();
	ctx.moveTo(x, ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	//ctx.closePath(); // not used correctly, see comments (use to close off open path)
	ctx.stroke();
    }

    var shapes = { "Square" : drawSquare,
		   "Triangle" : drawTriangle,
		   "Circle" : drawCircle,
		   "Oval" : drawOval };

    function draw(e) {

	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	
	var length = parseInt($("#length").val());
	var iterations = parseInt($("#iterations").val());
	var color = $("#color").val();
	var angle = parseInt($("#angle").val());
	var width = parseInt($("#width").val());
	var shape = $("#shape").val();

	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.translate(centerx, centery);
	for (var i = 0; i <  iterations; i++) {
	    shapes[shape](ctx, 0, 0, length);
	    ctx.rotate(angle*Math.PI/180);
	}
	ctx.setTransform(1, 0, 0, 1, 0, 0);

    }

    function clear(e) {
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    var m = {};

    m.setup = function() {

	$("#draw").click(draw);
	$("#clear").click(clear);

	$(".ui-content").height($.mobile.getScreenHeight());

	var canvasHolder = $("#canvasHolder");
	var canvas = $("#canvas")[0];

	canvas.width = canvasHolder.width();
	canvas.height = canvasHolder.height();

	centerx = canvas.width / 2;
	centery = canvas.height / 2;

	clear();
    };

    return m;

})(jQuery);

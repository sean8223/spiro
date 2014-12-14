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

    var shapes = { "Square" : drawSquare,
		   "Triangle" : drawTriangle,
		   "Circle" : drawCircle };

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

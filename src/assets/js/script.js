
$(document).ready(function () {

	

	var dragging = true;

	var owlElementID = "#owl-main";

	

	function fadeInReset() {

		if (!dragging) {

			$(owlElementID + " .caption .fadeIn-1, " + owlElementID + " .caption .fadeIn-2, " + owlElementID + " .caption .fadeIn-3").stop().delay(800).animate({ opacity: 0 }, { duration: 400, easing: "easeInCubic" });

		}

		else {

			$(owlElementID + " .caption .fadeIn-1, " + owlElementID + " .caption .fadeIn-2, " + owlElementID + " .caption .fadeIn-3").css({ opacity: 0 });

		}

	}

	

	function fadeInDownReset() {

		if (!dragging) {

			$(owlElementID + " .caption .fadeInDown-1, " + owlElementID + " .caption .fadeInDown-2, " + owlElementID + " .caption .fadeInDown-3").stop().delay(800).animate({ opacity: 0, top: "-15px" }, { duration: 400, easing: "easeInCubic" });

		}

		else {

			$(owlElementID + " .caption .fadeInDown-1, " + owlElementID + " .caption .fadeInDown-2, " + owlElementID + " .caption .fadeInDown-3").css({ opacity: 0, top: "-15px" });

		}

	}

	

	function fadeInUpReset() {

		if (!dragging) {

			$(owlElementID + " .caption .fadeInUp-1, " + owlElementID + " .caption .fadeInUp-2, " + owlElementID + " .caption .fadeInUp-3").stop().delay(800).animate({ opacity: 0, top: "15px" }, { duration: 400, easing: "easeInCubic" });

		}

		else {

			$(owlElementID + " .caption .fadeInUp-1, " + owlElementID + " .caption .fadeInUp-2, " + owlElementID + " .caption .fadeInUp-3").css({ opacity: 0, top: "15px" });

		}

	}

	

	function fadeInLeftReset() {

		if (!dragging) {

			$(owlElementID + " .caption .fadeInLeft-1, " + owlElementID + " .caption .fadeInLeft-2, " + owlElementID + " .caption .fadeInLeft-3").stop().delay(800).animate({ opacity: 0, left: "15px" }, { duration: 400, easing: "easeInCubic" });

		}

		else {

			$(owlElementID + " .caption .fadeInLeft-1, " + owlElementID + " .caption .fadeInLeft-2, " + owlElementID + " .caption .fadeInLeft-3").css({ opacity: 0, left: "15px" });

		}

	}

	

	function fadeInRightReset() {

		if (!dragging) {

			$(owlElementID + " .caption .fadeInRight-1, " + owlElementID + " .caption .fadeInRight-2, " + owlElementID + " .caption .fadeInRight-3").stop().delay(800).animate({ opacity: 0, left: "-15px" }, { duration: 400, easing: "easeInCubic" });

		}

		else {

			$(owlElementID + " .caption .fadeInRight-1, " + owlElementID + " .caption .fadeInRight-2, " + owlElementID + " .caption .fadeInRight-3").css({ opacity: 0, left: "-15px" });

		}

	}

	

	function fadeIn() {

		$(owlElementID + " .active .caption .fadeIn-1").stop().delay(500).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });

		$(owlElementID + " .active .caption .fadeIn-2").stop().delay(700).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });

		$(owlElementID + " .active .caption .fadeIn-3").stop().delay(1000).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });

	}

	

	function fadeInDown() {

		$(owlElementID + " .active .caption .fadeInDown-1").stop().delay(500).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });

		$(owlElementID + " .active .caption .fadeInDown-2").stop().delay(700).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });

		$(owlElementID + " .active .caption .fadeInDown-3").stop().delay(1000).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });

	}

	

	function fadeInUp() {

		$(owlElementID + " .active .caption .fadeInUp-1").stop().delay(500).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });

		$(owlElementID + " .active .caption .fadeInUp-2").stop().delay(700).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });

		$(owlElementID + " .active .caption .fadeInUp-3").stop().delay(1000).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });

	}

	

	function fadeInLeft() {

		$(owlElementID + " .active .caption .fadeInLeft-1").stop().delay(500).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });

		$(owlElementID + " .active .caption .fadeInLeft-2").stop().delay(700).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });

		$(owlElementID + " .active .caption .fadeInLeft-3").stop().delay(1000).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });

	}

	

	function fadeInRight() {

		$(owlElementID + " .active .caption .fadeInRight-1").stop().delay(500).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });

		$(owlElementID + " .active .caption .fadeInRight-2").stop().delay(700).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });

		$(owlElementID + " .active .caption .fadeInRight-3").stop().delay(1000).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });

	}

	

	$(owlElementID).owlCarousel({

		

		autoPlay: 6000,

		stopOnHover: false,

        navigation: true,

		pagination: true,

		singleItem: true,

		addClassActive: true,

        transitionStyle: "backSlide",

        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],



    	afterInit: function() {

        	fadeIn();

        	fadeInDown();

        	fadeInUp();

        	fadeInLeft();

        	fadeInRight();

    	},

		

    	afterMove: function() {

        	fadeIn();

			fadeInDown();

        	fadeInUp();

        	fadeInLeft();

        	fadeInRight();

    	},

		

    	afterUpdate: function() {

        	fadeIn();

			fadeInDown();

        	fadeInUp();

        	fadeInLeft();

        	fadeInRight();

    	},

		

    	startDragging: function() {

			dragging = true;

    	},

		

    	afterAction: function() {

        	fadeInReset();

			fadeInDownReset();

			fadeInUpReset();

        	fadeInLeftReset();

        	fadeInRightReset();

			dragging = false;

    	}

		

    });

	

	if ($(owlElementID).hasClass("owl-one-item")) {

		$(owlElementID + ".owl-one-item").data('owlCarousel').destroy();

	}

	

	$(owlElementID + ".owl-one-item").owlCarousel({

		singleItem: true,

		navigation: false,

		pagination: false

	});

	

	$('#transitionType li a').click(function () {

		

		$('#transitionType li a').removeClass('active');

		$(this).addClass('active');

		

		var newValue = $(this).attr('data-transition-type');

		

		$(owlElementID).data("owlCarousel").transitionTypes(newValue);

		$(owlElementID).trigger("owl.next");

		

		return false;

		

	});

	



	

	$(".slider-next").click(function () {

		owl.trigger('owl.next');

	})

	

	$(".slider-prev").click(function () {

		owl.trigger('owl.prev');

	})

    

    

























// button-fluid







$(function() {

	// Vars

	var pointsA = [],

		pointsB = [],

		$canvas = null,

		canvas = null,

		context = null,

		vars = null,

		points = 8,

		viscosity = 20,

		mouseDist = 70,

		damping = 0.05,

		showIndicators = false;

		mouseX = 0,

		mouseY = 0,

		relMouseX = 0,

		relMouseY = 0,

		mouseLastX = 0,

		mouseLastY = 0,

		mouseDirectionX = 0,

		mouseDirectionY = 0,

		mouseSpeedX = 0,

		mouseSpeedY = 0;



	/**

	 * Get mouse direction

	 */

	function mouseDirection(e) {

		if (mouseX < e.pageX)

			mouseDirectionX = 1;

		else if (mouseX > e.pageX)

			mouseDirectionX = -1;

		else

			mouseDirectionX = 0;



		if (mouseY < e.pageY)

			mouseDirectionY = 1;

		else if (mouseY > e.pageY)

			mouseDirectionY = -1;

		else

			mouseDirectionY = 0;



		mouseX = e.pageX;

		mouseY = e.pageY;



		relMouseX = (mouseX - $canvas.offset().left);

		relMouseY = (mouseY - $canvas.offset().top);

	}

	$(document).on('mousemove', mouseDirection);



	/**

	 * Get mouse speed

	 */

	function mouseSpeed() {

		mouseSpeedX = mouseX - mouseLastX;

		mouseSpeedY = mouseY - mouseLastY;



		mouseLastX = mouseX;

		mouseLastY = mouseY;



		setTimeout(mouseSpeed, 30);

	}

	mouseSpeed();



	/**

	 * Init button

	 */

	function initButton() {

		// Get button

		var button = $('.btn-liquid');

		var buttonWidth = button.width();

		var buttonHeight = button.height();



		// Create canvas

		$canvas = $('<canvas><canvas>');

		button.append($canvas);



		canvas = $canvas.get(0);

		canvas.width = buttonWidth+100;

		canvas.height = buttonHeight+100;

		context = canvas.getContext('2d');



		// Add points



		var x = buttonHeight/2;

		for(var j = 1; j < points; j++) {

			addPoints((x+((buttonWidth-buttonHeight)/points)*j), 0);

		}

		addPoints(buttonWidth-buttonHeight/5, 0);

		addPoints(buttonWidth+buttonHeight/10, buttonHeight/2);

		addPoints(buttonWidth-buttonHeight/5, buttonHeight);

		for(var j = points-1; j > 0; j--) {

			addPoints((x+((buttonWidth-buttonHeight)/points)*j), buttonHeight);

		}

		addPoints(buttonHeight/5, buttonHeight);



		addPoints(-buttonHeight/10, buttonHeight/2);

		addPoints(buttonHeight/5, 0);

		// addPoints(x, 0);

		// addPoints(0, buttonHeight/2);



		// addPoints(0, buttonHeight/2);

		// addPoints(buttonHeight/4, 0);



		// Start render

		renderCanvas();

	}



	/**

	 * Add points

	 */

	function addPoints(x, y) {

		pointsA.push(new Point(x, y, 1));

		pointsB.push(new Point(x, y, 2));

	}



	/**

	 * Point

	 */

	function Point(x, y, level) {

	  this.x = this.ix = 50+x;

	  this.y = this.iy = 50+y;

	  this.vx = 0;

	  this.vy = 0;

	  this.cx1 = 0;

	  this.cy1 = 0;

	  this.cx2 = 0;

	  this.cy2 = 0;

	  this.level = level;

	}



	Point.prototype.move = function() {

		this.vx += (this.ix - this.x) / (viscosity*this.level);

		this.vy += (this.iy - this.y) / (viscosity*this.level);



		var dx = this.ix - relMouseX,

			dy = this.iy - relMouseY;

		var relDist = (1-Math.sqrt((dx * dx) + (dy * dy))/mouseDist);



		// Move x

		if ((mouseDirectionX > 0 && relMouseX > this.x) || (mouseDirectionX < 0 && relMouseX < this.x)) {

			if (relDist > 0 && relDist < 1) {

				this.vx = (mouseSpeedX / 4) * relDist;

			}

		}

		this.vx *= (1 - damping);

		this.x += this.vx;



		// Move y

		if ((mouseDirectionY > 0 && relMouseY > this.y) || (mouseDirectionY < 0 && relMouseY < this.y)) {

			if (relDist > 0 && relDist < 1) {

				this.vy = (mouseSpeedY / 4) * relDist;

			}

		}

		this.vy *= (1 - damping);

		this.y += this.vy;

	};





	/**

	 * Render canvas

	 */

	function renderCanvas() {

		// rAF

		rafClass = requestAnimationFrame(renderCanvas);



		// Clear scene

		context.clearRect(0, 0, $canvas.width(), $canvas.height());

		context.fillStyle = 'rgba(0, 0, 0, 0)';

		context.fillRect(0, 0, $canvas.width(), $canvas.height());



		// Move points

		for (var i = 0; i <= pointsA.length - 1; i++) {

			pointsA[i].move();

			pointsB[i].move();

		}



		// Create dynamic gradient

		var gradientX = Math.min(Math.max(mouseX - $canvas.offset().left, 0), $canvas.width());

		var gradientY = Math.min(Math.max(mouseY - $canvas.offset().top, 0), $canvas.height());

		var distance = Math.sqrt(Math.pow(gradientX - $canvas.width()/2, 2) + Math.pow(gradientY - $canvas.height()/2, 2)) / Math.sqrt(Math.pow($canvas.width()/2, 2) + Math.pow($canvas.height()/2, 2));



		//var gradient = context.createRadialGradient(gradientX, gradientY, 300+(300*distance), gradientX, gradientY, 0);

		//gradient.addColorStop(0, '#ffa200');

		//gradient.addColorStop(1, '#ffb535');



		// Draw shapes

		var groups = [pointsA, pointsB]



		for (var j = 0; j <= 1; j++) {

			var points = groups[j];



			if (j == 0) {

				// Background style

				//context.fillStyle = '#ff7200';

			} else {

				// Foreground style

			//	context.fillStyle = gradient;

			}



			context.beginPath();

			context.moveTo(points[0].x, points[0].y);



			for (var i = 0; i < points.length; i++) {

				var p = points[i];

				var nextP = points[i + 1];

				var val = 30*0.552284749831;



				if (nextP != undefined) {

				



						p.cx1 = (p.x+nextP.x)/2;

						p.cy1 = (p.y+nextP.y)/2;

						p.cx2 = (p.x+nextP.x)/2;

						p.cy2 = (p.y+nextP.y)/2;



						context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);

					// 	continue;

					// }



					// context.bezierCurveTo(p.cx1, p.cy1, p.cx2, p.cy2, nextP.x, nextP.y);

				} else {

                nextP = points[0];

						p.cx1 = (p.x+nextP.x)/2;

						p.cy1 = (p.y+nextP.y)/2;



						context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);

				}

			}



			// context.closePath();

			context.fill();

		}



		if (showIndicators) {

			// Draw points

			context.fillStyle = '#000';

			context.beginPath();

			for (var i = 0; i < pointsA.length; i++) {

				var p = pointsA[i];



				context.rect(p.x - 1, p.y - 1, 2, 2);

			}

			context.fill();



			// Draw controls

			context.fillStyle = '#f00';

			context.beginPath();

			for (var i = 0; i < pointsA.length; i++) {

				var p = pointsA[i];



				context.rect(p.cx1 - 1, p.cy1 - 1, 2, 2);

				context.rect(p.cx2 - 1, p.cy2 - 1, 2, 2);

			}

			context.fill();

		}

	}



	// Init

	initButton();

});

































    

});


























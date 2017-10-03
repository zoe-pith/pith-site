$(document).ready(function () {
	if($(window).width() > 590) {

		var scroll_length = 525;
		var arrow_fade_speed = 300;
		// 0 - left arrow visible, 1 - right arrow visible
		var visible_arrow = true;
		var swap_arrow_left = function() {
			$("#arrow").animate({opacity: 0}, arrow_fade_speed, function() {
				$("#arrow").css({"right": "auto", "left": "10px", "border-left": "none", "border-right": "15px solid black"});
				$("#arrow").animate({opacity: 1}, arrow_fade_speed, function() {
					$("#arrow").off();
					$("#arrow").click(left_handler);
				});
			});
			visible_arrow = false;
		}

		var swap_arrow_right = function() {
			$("#arrow").animate({opacity: 0}, arrow_fade_speed, function() {
				$("#arrow").css({"left": "auto", "right": "10px", "border-right": "none", "border-left": "15px solid black"});
				$("#arrow").animate({opacity: 1}, arrow_fade_speed, function() {
					$("#arrow").off();
					$("#arrow").click(right_handler);
				});
			});
			visible_arrow = true;
		}

		var right_handler = function() {
			$("#content").animate({
		      scrollLeft: scroll_length
		  }, 1600, "easeOutCubic", function() {
			});

		}

		var left_handler = function() {
			$("#content").animate({
		      scrollLeft: 0
		  }, 1600, "easeOutCubic", function() {
			});
		}

		$("#content").scroll(function() {
			if($("#content").scrollLeft() == $("#content").prop("scrollWidth") - 850 && visible_arrow) {
				swap_arrow_left();
			} else if($("#content").scrollLeft() == 0 && !visible_arrow) {
				swap_arrow_right();
			}
		});

		$("#arrow").click(function() {
			right_handler();
		});
	}
});

var border_val;
var scroll_offset;
var arrow_fade_speed = 300;
// 0 - left arrow visible, 1 - right arrow visible. Necessary to avoid swaps being called by momentum scrolling.
var visible_arrow = true;
var scroll_length;

$(document).ready(function () {
	if($(window).width() > 590) {

		set_up_vars();

		$("#content").scroll(function() {

			// Swaps arrow if scroll reaches the end and right arrow showing.
			if($("#content").scrollLeft() == $("#content").prop("scrollWidth") - scroll_offset && visible_arrow) {
				move_arrow_to_left();
			// Swaps arrow if scroll returns to start and left arrow is showing.
			} else if($("#content").scrollLeft() == 0 && !visible_arrow) {
				move_arrow_to_right();
			}
		});

		// Scrolls when clicked.
		$("#arrow-right").click(function() {
			right_handler();
		});
	}
});

function set_up_vars() {
	if($(window).width() < 960) {
		border_val = "15px solid black";
		scroll_offset = $(window).width();
		$(".arrow").css({"position":"absolute", "top": "calc(50% - 7px)"});
		$("#arrow-right").css({"left": "calc(100% - 50px)","border-right": "none", "border-left": border_val, "opacity": "1"});
		$("#arrow-left").css({"left": "10px", "border-left": "none", "border-right": border_val});
	} else {
		border_val = "15px solid white";
		scroll_offset = 850;
		$("#arrow-right").css({"border-right": "none", "border-left": border_val, "opacity": "1"});
		$("#arrow-left").css({"border-left": "none", "border-right": border_val});
	}
	scroll_length = $("#content").prop("scrollWidth") - scroll_offset;
}

function left_handler() {
	$("#content").animate({
			scrollLeft: 0
	}, 1600, "easeOutCubic", function() {
	});
}

function right_handler() {
	$("#content").animate({
			scrollLeft: scroll_length
	}, 1600, "easeOutCubic", function() {
	});
}

function move_arrow_to_left() {
	$("#arrow-right").animate({opacity: 0}, arrow_fade_speed, function() {
		$("#arrow-left").animate({opacity: 1}, arrow_fade_speed, function() {
			$("#arrow-right").off();
			$("#arrow-left").click(left_handler);
		});
	});
	visible_arrow = false;
}

function move_arrow_to_right() {
	$("#arrow-left").animate({opacity: 0}, arrow_fade_speed, function() {
		$("#arrow-right").animate({opacity: 1}, arrow_fade_speed, function() {
			$("#arrow-left").off();
			$("#arrow-right").click(right_handler);
		});
	});
	visible_arrow = true;
}

var border_val;
var scroll_offset;
var arrow_fade_speed = 300;
// 0 - left arrow visible, 1 - right arrow visible. Necessary to avoid swaps being called by momentum scrolling.
var visible_arrow = true;
var scroll_length;
var shrunk = 1;
$(document).ready(function () {
	if($(window).width() > 590) {

		adjust_responsive_arrows(true);
		$(window).resize(function() {
			adjust_responsive_arrows();
		});
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

function adjust_responsive_arrows(first_try) {
	if(first_try) {
		$("#arrow-right").css({"opacity":"1"});
	}

	if($(window).width() < 960 && $(window).width() >= 850 && shrunk != 960) {
		scroll_offset = $(window).width();
		border_val = "15px solid black";
		$(".arrow").css({"position":"absolute", "top": "calc(50% - 15px)"});
		$("#arrow-right").css({"left": "calc(100% - 50px - ((100% - 850px) / 2 ))","border-right": "none", "border-left": border_val});
		$("#arrow-left").css({"left": "calc(10px + ((100% - 850px) / 2 ))", "border-left": "none", "border-right": border_val});
		shrunk = 960;
	} else if($(window).width() < 850 && shrunk != 850) {
		scroll_offset = $(window).width();
		border_val = "15px solid black";
		$(".arrow").css({"position":"absolute", "top": "calc(50% - 15px)"});
		$("#arrow-right").css({"left": "calc(100% - 50px)","border-right": "none", "border-left": border_val});
		$("#arrow-left").css({"left": "10px", "border-left": "none", "border-right": border_val});
		shrunk = 850;
	} else if($(window).width() >= 960 && shrunk != 0){
		border_val = "15px solid white";
		scroll_offset = 850;
		$(".arrow").css({"position":"inherit", "top": "325px", "left": "auto", "right": "auto"});
		$("#arrow-right").css({"border-right": "none", "border-left": border_val});
		$("#arrow-left").css({"border-left": "none", "border-right": border_val});
		shrunk = 0;
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
	$("#arrow-right").css({"cursor":"auto"});
	$("#arrow-left").css({"cursor":"pointer"});
	$("#arrow-right").animate({opacity: 0}, arrow_fade_speed, function() {
		$("#arrow-left").animate({opacity: 1}, arrow_fade_speed, function() {
			$("#arrow-right").off();
			$("#arrow-left").click(left_handler);
		});
	});
	visible_arrow = false;
}

function move_arrow_to_right() {
	$("#arrow-right").css({"cursor":"pointer"});
	$("#arrow-left").css({"cursor":"auto"});
	$("#arrow-left").animate({opacity: 0}, arrow_fade_speed, function() {
		$("#arrow-right").animate({opacity: 1}, arrow_fade_speed, function() {
			$("#arrow-left").off();
			$("#arrow-right").click(right_handler);
		});
	});
	visible_arrow = true;
}

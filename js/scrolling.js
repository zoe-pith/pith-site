var arrow_colour;
var scroll_amount;
var arrow_fade_speed = 300;
// 0 - left arrow visible, 1 - right arrow visible. Necessary to avoid swaps being called by momentum scrolling.
var which_arrow_is_visible = 1;
var scroll_length;
var current_responsive_state = 1;

$(document).ready(function () {
	if($(window).width() > 590) {

		// Set up for initial window size.
		adjust_responsive_arrows(true);

		$(window).resize(function() {
			// Checks if styling needs to be changed depending on window width.
			adjust_responsive_arrows();
		});

		$("#content").scroll(function() {
			// Swaps arrow if scroll reaches the end and right arrow showing.
			if($("#content").scrollLeft() == $("#content").prop("scrollWidth") - scroll_amount && which_arrow_is_visible) {
				swap_arrows("left");
			// Swaps arrow if scroll returns to start and left arrow is showing.
			} else if($("#content").scrollLeft() == 0 && !which_arrow_is_visible) {
				swap_arrows("right");
			}
		});

		// Scrolls when clicked.
		$("#arrow-right").click(function() {
			arrow_click_handler("right");
		});
	}
});

function adjust_responsive_arrows(first_try) {
	if(first_try) {
		$("#arrow-right").css({"opacity":"1"});
	}
	// If window is thin enough to switch to inner arrows but still has letterboxing.
	if($(window).width() < 960 && $(window).width() >= 850 && current_responsive_state != 960) {

		scroll_amount = 850;
		arrow_colour = "black";
		$(".arrow").css({"position":"absolute", "top": "calc(50% - 20px)"});
		$("#arrow-right").css({"left": "calc(100% - 50px - ((100% - 850px) / 2 ))","border-right": "none", "border-left": "20px solid "+ arrow_colour});
		$("#arrow-left").css({"left": "calc(10px + ((100% - 850px) / 2 ))", "border-left": "none", "border-right": "20px solid "+ arrow_colour});
		current_responsive_state = 960;

	// Window thin enough to not have black sidebars.
	} else if($(window).width() < 850 && current_responsive_state != 850) {

		scroll_amount = $(window).width();
		arrow_colour = "black";
		$(".arrow").css({"position":"absolute", "top": "calc(50% - 20px)"});
		$("#arrow-right").css({"left": "calc(100% - 50px)","border-right": "none", "border-left": "20px solid "+ arrow_colour});
		$("#arrow-left").css({"left": "10px", "border-left": "none", "border-right": "20px solid "+ arrow_colour});
		current_responsive_state = 850;

	// Window wide enough for white arrows.
	} else if($(window).width() >= 960 && current_responsive_state != 0){

		arrow_colour = "white";
		scroll_amount = 850;
		$(".arrow").css({"position":"inherit", "top": "330px", "left": "auto", "right": "auto"});
		$("#arrow-right").css({"border-right": "none", "border-left": "20px solid "+ arrow_colour});
		$("#arrow-left").css({"border-left": "none", "border-right": "20px solid "+ arrow_colour});
		current_responsive_state = 0;
	}
	// Sets proper scroll length, depending on window size.
	scroll_length = $("#content").prop("scrollWidth") - scroll_amount;
}

// Scrolls when arrow is clicked
function arrow_click_handler(visible) {
	$("#content").animate({
			scrollLeft: visible == "right" ? scroll_length : 0
	}, 1600, "easeOutCubic", function() {
	});
}

// Visually and logically swaps arrows.
function swap_arrows(visible) {
	hidden = visible == "right" ? "left" : "right";
	$("#arrow-" + hidden).css({"cursor":"auto"});
	$("#arrow-" + visible).css({"cursor":"pointer"});
	$("#arrow-" + hidden).animate({opacity: 0}, arrow_fade_speed, function() {
		$("#arrow-" + visible).animate({opacity: 1}, arrow_fade_speed, function() {
			$("#arrow-" + hidden).off();
			$("#arrow-" + visible).click(function(){arrow_click_handler(visible)});
		});
	});
	which_arrow_is_visible = visible == "right" ? 1 : 0;
}

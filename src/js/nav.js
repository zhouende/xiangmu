$(function() {
	var bol = true;
	$("#imgRight").on("click", function() {
		if (bol) {
			$("#lastUl").slideDown();
		} else {
			$("#lastUl").slideUp();
		}
		bol = !bol;
		var widthTimer = setInterval(function() {
			if ($(window).width() >= 830) {
				$("#lastUl").hide();
				clearInterval(widthTimer);
			}
		}, 10);
		console.log(bol);
	})
	
})
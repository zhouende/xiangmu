$(function() {
	$(".footerWrap img").hover(function() {
		var src = $(this).attr("src");
		var a = src.split(".");
		var src1 = a.join("_h.");
		$(this).attr("src", src1);
	}, function() {
		var src = $(this).attr("src");
		var a = src.split(".");
		var b = a[0];
		var k = b.slice(0, b.length-2);
		a[0] = k;
		var src1 = a.join(".");
		$(this).attr("src", src1);
	})
})
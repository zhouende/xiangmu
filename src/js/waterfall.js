$(function() {

	var picNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79];
	//随机函数
	function randFn(min, max) {
		return parseInt(Math.random() * (max - min + 1) + min);
	}
	//将picNum中的数字打乱
	(function upSetpicNum() {
		for (var i = 0; i < 100; i++) {
			var numone = randFn(0, 78);
			var numtwo = randFn(0, 78);
			var temp = picNum[numone];
			picNum[numone] = picNum[numtwo];
			picNum[numtwo] = temp;
		}
	})();

	//获取所有的ul
	var uls = $("#waterfall ul");
	var imgArr = [];
	for (var j = 0; j < picNum.length; j++) {
		var li = $("<li></li>");
		var img = $("<img/>");
		img.attr("src", "img/rendering/" + picNum[j] + "-.jpg");
		li.append(img);
		imgArr.push(li);
		var count = 0;
		img.load(function() {
			count++;
			var minindex = getMinUl();
			uls.eq(minindex).append($(this).parent());

			//添加hover
			$("#waterfall ul li").hover(function() {
				$(this).css({
					opacity: 0.5,
				})
			}, function() {
				$(this).css({
					opacity: 1,
				})
			});
			$("#waterfall").on("click", function(e) {
					$("#waterfall div").hide();
					e.stopPropagation();
				})
				//添加点击属性
			$("#waterfall ul img").on("click", function(e) {
				var i = $(this).attr("src");
				$("#waterfall div").show();
				$("#waterfall div img").attr("src", i);
				e.stopPropagation();
			})
//			console.log(count);
			if(count >= picNum.length) {
				var uls1 = uls.eq(0).height();
				var uls2 = uls.eq(1).height();
				var uls3 = uls.eq(2).height();
				var uls4 = uls.eq(3).height();
//				console.log(uls1);
				console.log(uls1);
				console.log(uls2);
				console.log(uls3);
				console.log(uls4);
				var uls1S = uls1 - uls2;
//				var uls2S = uls3 - uls4;
				console.log(uls1S);
//				console.log(uls2S);
				if(uls1S > 0) {
					uls.eq(3).css({
						marginTop: -uls1S,
					})
				}
				if(uls1S < 0) {
					uls.eq(2).css({
						marginTop: uls1S,
					})
				}
			}
//			var timer = setInterval(function() {
//				if ($(window).width() <= 500) {
//					var ulsone = uls.eq(0).height();
//					var ulstwo = uls.eq(1).height();
//					uls.eq(2).css({
//						position: "absolute",
//						left: "1%",
//						top: ulsone,
//					})
//					uls.eq(3).css({
//						position: "absolute",
//						right: "1%",
//						top: ulstwo,
//					})
//					clearInterval(timer);
//				}
//			}, 20);

		})
	}
	//判断最短的ul
	function getMinUl() {
		var minuls = uls.eq(0).height();
		var minindex = 0;
		for (var k = 0; k < uls.length; k++) {
			if (minuls > uls.eq(k).height()) {
				minuls = uls.eq(k).height();
				minindex = k;
			}
		}
		return minindex;
	}
})
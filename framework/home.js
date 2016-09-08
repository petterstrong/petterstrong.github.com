(function($){
	$(document).ready(function(){
		// 个人介绍
		console.info('     # # #    \n  #        #\n #          #\n#   *    *   #\n#     $      #\n #          #\n  #  %%%   #\n   #      #\n    @  @ @ ');

		console.log("hey,man\n欢迎来到彼得·张的博客，很希望能一起交流，分享技术\n%c联系方式：jokemigo@163.com",'color: #f03');
		$("#logo").on("click",function(){
			$.ajax({
				url:'https://api.thinkpage.cn/v3/weather/now.json?key=p7crmvka1l2alhbo&location=beijing&language=zh-Hans&unit=c',
				type:'get',
				// callback:'showWeather',
				dataType:'jsonp',
				success:function(data){
					console.log(data);
				}
			})
		})
	})
})(jQuery)
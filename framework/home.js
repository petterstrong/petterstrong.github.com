(function($){
	$(document).ready(function(){
		// 个人介绍
		console.info('     # # #    \n  #        #\n #          #\n#   *    *   #\n#     $      #\n #          #\n  #  %%%   #\n   #      #\n    @  @ @ ');

		console.log("hey,man\n欢迎来到彼得·张的博客，很希望能一起交流，分享技术\n%c联系方式：jokemigo@163.com",'color: #f03');
		$.ajax({
			url:'http://api.jirengu.com/weather.php',
			type:'get',
			// callback:'showWeather',
			dataType:'jsonp',
			success:function(data){
				var datas=data.results[0].weather_data[0],
					shtml='',
					arr=['晴','多云','晴间多云','大部多云','阴','阵雨','雷阵雨','雷阵雨伴有冰雹','小雨','中雨','大雨','暴雨','大暴雨','特大暴雨','冻雨','雨夹雪','阵雪','小雪','中雪','大雪','暴雪','浮尘','扬沙','沙尘暴','强沙尘暴','雾','霾','风','大风','飓风','热带风暴','龙卷风','冷','热','未知'];
				console.log(data,datas);
				$(".home_weather_location").html(data.results[0].currentCity);
				$(".weather_info").html(datas.weather+' '+datas.wind);
				$(".weather_tips").html(data.results[0].index[0].tipt+" "+data.results[0].index[0].zs);
				for(var j=0,len=arr.length;j<len;j++){
					if(datas.weather==arr[j]){
						$(".home_weather_img").attr("src","/assets/weather/"+j+".png");
					}
				}

				
			}
		})
	})
})(jQuery)
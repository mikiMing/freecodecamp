var timer=null;
function hasClass(ele,cls){
	return ele.className.match(new RegExp("(\\s|^)"+cls+"($|\\s)"));
}
function getByClass(cls,parent){
	parent=parent?parent:document;
	var elements=parent.getElementsByTagName("*"),
		result=[];
	for(var i=0;i<elements.length;i++){
		if(hasClass(elements[i],cls)){
			result.push(elements[i]);
		}
	}
	return result;
}
function addEvent(ele,type,handler){
	if(ele.addEventListener){
		ele.addEventListener(type,handler,false);
	}else if(ele.attachEvent){
		ele.attachEvent("on"+type,handler);
	}else{
		ele["on"+type]=handler;
	}
}
function createScript(url){
	var script=document.createElement("script");
	script.type="text/javascript";
	script.src=url;
	document.getElementsByTagName("body")[0].appendChild(script);
}
function showData(result){
	//如果没有结果，就提示输入的城市名错误
	//改变HTML中的数据
	if(!result.result){
		alert("输入的城市名错误，请重新输入！");
	}else{
		var city=getByClass("city"),
			weather=getByClass("wea_weather")[0],
			future_wea=getByClass("future_wea")[0].getElementsByTagName("ul")[0],
			//获得wea_info的标签
			wea_img=weather.getElementsByTagName("img")[0],
			temperature=weather.getElementsByTagName("em")[0],
			wea_def=weather.getElementsByTagName("b")[0],
			humidity=document.getElementById("humidity"),
			wind=document.getElementById("wind"),
			//获得future_wea的标签
			week=getByClass("week",future_wea),
			date=getByClass("date",future_wea),
			weaImg=getByClass("weaImg",future_wea),
			weaTem=getByClass("weaTem",future_wea),
			wea=getByClass("wea",future_wea),
			weaWind=getByClass("weaWind",future_wea),
			//获得live_index的标签
			live_item=getByClass("live_item")[0].getElementsByTagName("ul")[0],
			uv=live_item.getElementsByTagName("p")[0],
			wash=live_item.getElementsByTagName("p")[1],
			dress=live_item.getElementsByTagName("p")[2],
			exercise=live_item.getElementsByTagName("p")[3],
			hospital=live_item.getElementsByTagName("p")[4],
			air=live_item.getElementsByTagName("p")[5],
			//获得聚合数据里天气预报的一些数据
			data=result.result,
			realtime=data.data.realtime,
			life=data.data.life,
			weather=data.data.weather,
			imgId=realtime.weather.img;
		city[0].innerHTML=city[1].innerHTML=realtime.city_name;
		//更改wea_info标签的内容
		temperature.innerHTML=realtime.weather.temperature+"℃";
		wea_def.innerHTML=realtime.weather.info;
		humidity.innerHTML="湿度"+realtime.weather.humidity+"%";
		wind.innerHTML=realtime.wind.direct+realtime.wind.power;
		//更改wea_info中的图片
		var imgUrl=showImg(imgId);
		wea_img.src=imgUrl;
		//更改future_wea标签的内容
		for(var i=0;i<5;i++){
			week[i].innerHTML="周"+weather[i].week;
			var newArr=weather[i].date.split("-");
			date[i].innerHTML=newArr[1]+"月"+newArr[2]+"日";
			var future_url=showImg(weather[i].info.day[0]);
			weaImg[i].src=future_url;
			weaTem[i].innerHTML=weather[i].info.night[2]+"~"+weather[i].info.day[2];
			wea[i].innerHTML=weather[i].info.day[1];
			weaWind[i].innerHTML=weather[i].info.day[3]+weather[i].info.day[4];
		}
		//更改live_index标签的内容
		uv.innerHTML=life.info.ziwaixian[0];
		wash.innerHTML=life.info.xiche[0];
		dress.innerHTML=life.info.chuanyi[0];
		exercise.innerHTML=life.info.yundong[0];
		hospital.innerHTML=life.info.ganmao[0];
		air.innerHTML=life.info.kongtiao[0];
	}
}
function showImg(imgId){
	var imgUrl="images/";
	switch(imgId){
		case "0":
			imgUrl+="00.png";
			break;
		case "1":
			imgUrl+="01.png";
			break;
		case "2":
			imgUrl+="02.png";
			break;
		case "3":
		case "4":
			imgUrl+="04.png";
			break;
		case "5":
			imgUrl+="05.png";
			break;
		case "6":
			imgUrl+="06.png";
			break;
		case "7":
			imgUrl+="07.png";
			break;
		case "8":
		case "21":
			imgUrl+="08.png";
			break;
		case "22":
		case "9":
			imgUrl+="09.png";
			break;
		case "10":
		case "23":
			imgUrl+="10.png";
			break;
		case "11":
		case "12":
		case "24":
		case "25":
			imgUrl+="12.png";
			break;
		case "13":
		case "14":
			imgUrl+="14.png";
			break;
		case "15":
		case "26":
			imgUrl+="15.png";
			break;
		case "16":
		case "27":
			imgUrl+="16.png";
			break;
		case "17":
		case "28":
			imgUrl+="17.png";
			break;
		case "18":
		case "29":
		case "33":
			imgUrl+="18.png";
			break;
		case "20":
		case "31":
			imgUrl+="20.png";
			break;
		case "28":
			imgUrl+="28.png";
			break;
		default:
			imgUrl+="29.png";
			break;
	}
	return imgUrl;
}
function showInput(){
	//指明地址的框要消失
	//input输入框出现
	//关闭按钮出现
	//点击关闭按钮会进行反向动作，即地址框出现，input框消失
	//输入文字后按Enter键会更换文字内容
	var city_search=getByClass("city_search")[0],
		address=city_search.getElementsByTagName("p")[0],
		search_btn=document.getElementById("search_btn"),
		input=city_search.getElementsByTagName("input")[0],
		search_close=document.getElementById("search_close"),
		cityName="";
	animate(address,input);
	addEvent(input,"keyup",function(event){
		event=event||window.event;
		var keycode=event.which||event.keyCode;
		if(keycode==13&&input.value){
			var url="http://op.juhe.cn/onebox/weather/query?cityname="+input.value+"&key=a9b1e15e19789facd15976408deccedb&callback=showData";
			createScript(url);
			input.value="";
		}
	});
	search_close.style.display="block";
	addEvent(search_close,"click",function(){
		animate(input,address);
		search_close.style.display="none";
	});
}
    function animate(show,hide){
	var sWidth=show.offsetWidth,
		hWidth=0;
	clearInterval(timer);
	timer=setInterval(function(){
		show.style.width=sWidth+"px";
		hide.style.width=hWidth+"px";
		sWidth-=10;
		hWidth+=10;
		if(sWidth<0){
			clearInterval(timer);
		}
	},30);
}
window.onload=function(){
	var cityName=remote_ip_info.city,
		search_btn=document.getElementById("search_btn");
	var url="http://op.juhe.cn/onebox/weather/query?cityname="+cityName+"&key=a9b1e15e19789facd15976408deccedb&callback=showData";
	createScript(url);
	addEvent(search_btn,"click",showInput);
}
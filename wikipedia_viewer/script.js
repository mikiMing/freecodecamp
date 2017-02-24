$(document).ready(function(){
	var search=$("#search"),
		search_btn=$("#search_btn"),
		input=$("input"),
		closed=$(".closed"),
		result=$("#result ul");
	closed.on("click",function(){
		input.val("");
		search_btn.toggleClass("open");
		result.html("");
		search.addClass("fullHeight");
	});
	search_btn.submit(function(){
		return false;
	});
	input.on("keyup",function(event){
		event=event||window.event;
		event.stopPropagation();
		var keyCode=event.keyCode||event.which;
		if(keyCode==13){
			search.removeClass("fullHeight")
			$.ajax({
				type:"GET",
				url:"http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+input.val(),
				dataType:"jsonp",
				jsonp:"callback",
				success:function(data){
					var pages=data.query.pages;
					for(var id in pages){
						var aLink=$("<a target='_blank'></a>"),
							item=$("<li></li>"),
							title=$("<h4></h4>"),
							extract=$("<p></p>");
						item.append(title);
						item.append(extract);
						aLink.append(item);
						result.append(aLink);
						aLink.attr("href","https://en.wikipedia.org/?curid="+id);
						title.html(pages[id].title);
						extract.html(pages[id].extract);
					}
				},
				error:function(jqxhr){
					alert("发生错误!"+jqxhr.status);
				}
			});
		}
	});
});
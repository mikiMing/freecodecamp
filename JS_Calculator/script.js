$(document).ready(function(){
	$("input").val("");
	var calc="",
		ans="";
	$("button").click(function(){
		var input=$(".text");
		var text=$(this).attr("value");
		switch(text){
			case "AC":
				input.val("");
				calc="";
				break;
			case "CE":
				calc=input.val().slice(0,-1);
				input.val(calc);
				break;
			case "Ans":
				calc+=ans;
				input.val(calc);
				break;
			case "=":
				var result=eval(calc);
				calc=result;
				ans=result;
				input.val(result);
				break;
			default:
				calc+=text;
				input.val(calc);
		}
	});
});
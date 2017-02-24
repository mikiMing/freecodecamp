$(document).ready(function(){
	$("#myModal").modal({
		backdrop:"static",
		keyboard:false
	});
	/*UI绘制*/
	var chessboard=$("#chessBoard")[0];
	var flag=true;//标志位，若为true，则画叉；若为false，则画圈
	var over=false;
	var chess=[];//存放的是每个位置的状态（0-空，1-我，2-计算机）
	var player="";
	//获取用户的选择
	$(".modal-footer").click(function(event){
		event=event||window.event;
		if(event.target.nodeName=="BUTTON"){
			$("#myModal").modal("hide");
			player=event.target.innerHTML;
			if(player=="X"){
				flag=true;
			}else{
				flag=false;
			}
		}
	});
	if(chessboard.getContext){
		var context=chessboard.getContext("2d");
		//绘制棋盘
		context.beginPath();
		context.strokeStyle="#FFFFAA";
		for(var i=1;i<3;i++){
			context.moveTo(10,i*140);
			context.lineTo(410,i*140);
			context.stroke();
			context.moveTo(i*140,10);
			context.lineTo(i*140,410);
			context.stroke();
		}
		//绘制X O
		var drawChess=function(i,j,flag){
			context.strokeStyle="#FFFFAA";
			context.lineWidth=2;
			if(flag){
				context.beginPath();
				context.moveTo(i*140+45,j*140+45);
				context.lineTo((i+1)*140-45,(j+1)*140-45);
				context.stroke();
				context.moveTo((i+1)*140-45,j*140+45);
				context.lineTo(i*140+45,(j+1)*140-45);
				context.stroke();
			}else{
				context.beginPath();
				context.arc(i*140+70,j*140+70,25,0,2*Math.PI);
				context.closePath();
				context.stroke();
			}
		}
		//初始化棋盘,使得棋盘每个位置都为空
		for(var i=0;i<3;i++){
			chess[i]=[];
			for(var j=0;j<3;j++){
				chess[i][j]=0;
			}
		}
		//棋盘点击事件
		$("#chessBoard").click(function(event){
			event=event||window.event;
			var x=Math.floor(event.offsetX/140);
			var y=Math.floor(event.offsetY/140);
			drawChess(x,y,flag);
			chess[x][y]=1;
			flag=!flag;
		});
		//计算机AI
	}
});
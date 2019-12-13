/*
* @Author: lenovo
* @Date:   2019-12-10 12:25:20
* @Last Modified by:   lenovo
* @Last Modified time: 2019-12-13 12:10:35
*/

function getStyle(obj, attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			} else {
				return getComputedStyle(obj)[attr];
			}
		}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}

var tip=document.getElementById("tip");
var inp=document.getElementById("inp");
window.onload=function(){
	var roll=function(){
		var a=10;
		var num = getStyle(tip,"left");
		tip.style.left=parseInt(num) - a+"px";
		if(num == "-310px"){
			tip.style.left = 870 + "px";
		}
	}
	setInterval(roll,200);
}
var slider=document.getElementById("slider");
var slide=document.getElementById("slide");
var left=document.getElementById("left");
var right=document.getElementById("right");
var index=1;
var navli=document.getElementById("nav").children;
var isMoving=false;
function next(){
	if(isMoving){
		return;
	}
	isMoving=true;
	index++;
	change();
	animate(slider,{left:-1200*index},function(){
		if(index===6){
			slider.style.left="-1200px";
			index=0;
		}
		isMoving=false;
	});
}
function pre(){
	if(isMoving){
		return;
	}
	isMoving=true;
	index--;
	change();
	animate(slider,{left:-1200*index},function(){
		if(index===0){
			slider.style.left="-6000px";
			index=6;
		}
		isMoving=false;
	});
}
var timer=setInterval(next,3000);
box.onmouseover=function(){
	animate(left,{opacity:30})
	animate(right,{opacity:30})
	clearInterval(timer);
} 
box.onmouseout=function(){
	animate(left,{opacity:0})
	animate(right,{opacity:0})
	timer=setInterval(next,3000);
}
right.onclick=next;
left.onclick=pre;

for(var i=0;i<navli.length;i++){
	navli[i].idx=i;
	navli[i].onclick=function(){
		index=this.idx+1;
		change();
		animate(slider,{left:-1200*(index)})
	}
}
function change(){
	for(var i=0;i<navli.length;i++){
		navli[i].className="";
	}
	if(index===6){
		navli[0].className="active";
	}
	else if(index===0){
		navli[4].className="active";
	}else{
		navli[index-1].className="active";
	}
}		
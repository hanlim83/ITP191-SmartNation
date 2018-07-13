var usertype = localStorage.getItem("user");
var a = document.getElementById("tbr");
var welcome = document.getElementById("welcome");
var show1 = document.getElementById("standard");
var show2 = document.getElementById("socialWorker");
var show3 = document.getElementById("children");
var show4 = document.getElementById("elderly");
var userarray = ["Social Worker","Children","Elderly"];

function firstTime(){
	var user = localStorage.getItem('user');
	var userCheck = false;
	welcome.style.display="none";
	show2.style.display="none";
	show3.style.display="none";
	show4.style.display="none";
	for ( i = 0; i < userarray.length; i++){
		if (user == userarray[i]){
			userCheck = true;
		}
	}
	if (userCheck==false){
		welcome.style.display="none";
		show2.style.display="none";
		show3.style.display="none";
		show4.style.display="none";
	}
	else if(userCheck==true){
    tbr.parentNode.removeChild(tbr);
	welcome.style.display="block";
	var usertype = localStorage.getItem("user");
	relevantInfo();
	}
}

function user(value){
	usertype= value;
	userCheck= true;
    tbr.parentNode.removeChild(tbr);
	welcome.style.display="block";
	localStorage.user=usertype;
	relevantInfo();
}

function relevantInfo(){
	if (usertype=="Social Worker"){
	show1.style.display="none";
	show2.style.display="block";
	console.log(usertype);
	console.log("1");
	}
	else if (usertype=="Children"){
	show1.style.display="none";
	show3.style.display="block";
	console.log(usertype);
	console.log("2");
	}
	else if (usertype=="Elderly"){
	show1.style.display="none";
	show4.style.display="block";
	console.log(usertype);
	console.log("3");
	}
}

function changeUser(){
	localStorage.removeItem("user");
	location.reload();
}
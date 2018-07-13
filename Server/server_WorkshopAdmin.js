var user=["govt","samsung","nyp"];
var passWord=["govtisgood","samsungisgood","nypisgood"];
var loginFailed = document.getElementById("loginFailed");
var loggedOut = document.getElementById("loggedOut");
var textBox = document.getElementById("textBox");

function hiddenStuff(){
	var logInCheck = sessionStorage.getItem("logIn");
	loginFailed.style.display="none";
	loggedOut.style.display="none";
	if (logInCheck==1){
		userform.style.display="none";
		loginFailed.style.display="none";
	}
	else{
	textBox.style.display="none";
	}
}

function logIn(username,passphrase){
	var username=username;
	var passphrase=passphrase;
	for (i=0;i<user.length;i++){
		if (username==user[i] && passphrase==passWord[i])
			var valid=true;
		}
		
	if (valid==true){
			console.log("logged in!!!");
			userform.style.display="none";
			textBox.style.display="block";
			sessionStorage.logIn=1;
			loginFailed.style.display="none";
			document.getElementById("user").value="";
			document.getElementById("passphrase").value="";
			}
			else{
			loginFailed.style.display="block";
		}
}

function checkBlank(){
	var title = document.getElementById("title").value;
	var startDate = document.getElementById("startDate").value;
	var endDate = document.getElementById("endDate").value;
	var description = document.getElementById("description").value;
	var url = document.getElementById("url").value;
	if(title=="" || startDate=="" || endDate=="" || description=="" || url==""){
		alert("Fill up all fills!");
	}
	else{
		storageWorkshops();
	}
}

function endDay(){
	EndToday= document.getElementById("startDate").value;
	document.getElementById("endDate").setAttribute("min", EndToday);
}

function storageWorkshops(){
	var title = document.getElementById("title").value;
	var startDate = document.getElementById("startDate").value;
	var endDate = document.getElementById("endDate").value;
	var description = document.getElementById("description").value;
	var url = document.getElementById("url").value;
	if (localStorage["title"]) {
	titleArr=JSON.parse(localStorage["title"]);
	}
	else {
	titleArr=[]; // no existing, create new array
	}
	if (localStorage["startDate"]) {
	startDateArr=JSON.parse(localStorage["startDate"]);
	}
	else {
	startDateArr=[]; // no existing, create new array
	}
	if (localStorage["endDate"]) {
	endDateArr=JSON.parse(localStorage["endDate"]);
	}
	else {
	endDateArr=[]; // no existing, create new array
	}
	if (localStorage["description"]) {
	descriptionArr=JSON.parse(localStorage["description"]);
	}
	else {
	descriptionArr=[]; // no existing, create new array
	}
	if (localStorage["url"]) {
	urlArr=JSON.parse(localStorage["url"]);
	}
	else {
	urlArr=[]; // no existing, create new array
	}
	localStorage.title=titleArr;
	localStorage.startDate=startDateArr;
	localStorage.endDate=endDateArr;
	localStorage.description=descriptionArr;
	localStorage.url=urlArr;
	titleArr.push(title);
	localStorage["title"] = JSON.stringify(titleArr);
	startDateArr.push(startDate);
	localStorage["startDate"] = JSON.stringify(startDateArr);
	endDateArr.push(endDate);
	localStorage["endDate"] = JSON.stringify(endDateArr);
	descriptionArr.push(description);
	localStorage["description"] = JSON.stringify(descriptionArr);
	urlArr.push(url);
	localStorage["url"] = JSON.stringify(urlArr);
	alert("New workshop submitted succesfully");
}

function logOut(){
	sessionStorage.logIn=0;
	userform.style.display="block";
	textBox.style.display="none";
	loggedOut.style.display="block";
	setInterval(function(){location.reload()}, 10000);
	sessionStorage.clear();
}

/*Encryption from here*/

function encryption(userform){
	var username=document.getElementById("user").value;
	var passphrase=document.getElementById("passphrase").value;
	var i;
	for (i=0; i<username.length; i++){
		username = username.split('');
		var charReplace=username[i];
			switch(charReplace) {
		case "q":
			var charReplace = "1";
			break;
		case "w":
			var charReplace = "2";
			break;
		case "e":
			var charReplace = "3";
			break;
		case "r":
			var charReplace = "4";
			break;
		case "t":
			var charReplace = "5";
			break;
		case "y":
			var charReplace = "6";
			break;
		case "u":
			var charReplace = "7";
			break;
		case "i":
			var charReplace = "8";
			break;
		case "o":
			var charReplace = "9";
			break;
		case "p":
			var charReplace = "0";
			break;
		case "a":
			var charReplace = "q";
			break;
		case "s":
			var charReplace = "w";
			break;
		case "d":
			var charReplace = "e";
			break;
		case "f":
			var charReplace = "r";
			break;
		case "g":
			var charReplace = "t";
			break;
		case "h":
			var charReplace = "y";
			break;
		case "j":
			var charReplace = "u";
			break;
		case "k":
			var charReplace = "i";
			break;
		case "l":
			var charReplace = "o";
			break;
		case "z":
			var charReplace = "a";
			break;
		case "x":
			var charReplace = "s";
			break;
		case "c":
			var charReplace = "d";
			break;
		case "v":
			var charReplace = "f";
			break;
		case "b":
			var charReplace = "g";
			break;
		case "n":
			var charReplace = "h";
			break;
		case "m":
			var charReplace = "j";
			break;
		case "1":
			var charReplace = "z";
			break;
		case "2":
			var charReplace = "x";
			break;
		case "3":
			var charReplace = "c";
			break;
		case "4":
			var charReplace = "v";
			break;
		case "5":
			var charReplace = "b";
			break;
		case "6":
			var charReplace = "n";
			break;
		case "7":
			var charReplace = "m";
			break;
		case "8":
			var charReplace = ",";
			break;
		case "9":
			var charReplace = ".";
			break;
		case "0":
			var charReplace = "/";
			break;
		case "@":
			var charReplace = "[";
			break;
		case ".":
			var charReplace = "]";
			break;
		default:
			break;
		}
		username[i] = charReplace;
		username = username.join('');
		console.log(username);
	}
		for (i=0; i<passphrase.length; i++){
		passphrase = passphrase.split('');
		var charReplace=passphrase[i];
			switch(charReplace) {
		case "q":
			var charReplace = "1";
			break;
		case "w":
			var charReplace = "2";
			break;
		case "e":
			var charReplace = "3";
			break;
		case "r":
			var charReplace = "4";
			break;
		case "t":
			var charReplace = "5";
			break;
		case "y":
			var charReplace = "6";
			break;
		case "u":
			var charReplace = "7";
			break;
		case "i":
			var charReplace = "8";
			break;
		case "o":
			var charReplace = "9";
			break;
		case "p":
			var charReplace = "0";
			break;
		case "a":
			var charReplace = "q";
			break;
		case "s":
			var charReplace = "w";
			break;
		case "d":
			var charReplace = "e";
			break;
		case "f":
			var charReplace = "r";
			break;
		case "g":
			var charReplace = "t";
			break;
		case "h":
			var charReplace = "y";
			break;
		case "j":
			var charReplace = "u";
			break;
		case "k":
			var charReplace = "i";
			break;
		case "l":
			var charReplace = "o";
			break;
		case "z":
			var charReplace = "a";
			break;
		case "x":
			var charReplace = "s";
			break;
		case "c":
			var charReplace = "d";
			break;
		case "v":
			var charReplace = "f";
			break;
		case "b":
			var charReplace = "g";
			break;
		case "n":
			var charReplace = "h";
			break;
		case "m":
			var charReplace = "j";
			break;
		case "1":
			var charReplace = "z";
			break;
		case "2":
			var charReplace = "x";
			break;
		case "3":
			var charReplace = "c";
			break;
		case "4":
			var charReplace = "v";
			break;
		case "5":
			var charReplace = "b";
			break;
		case "6":
			var charReplace = "n";
			break;
		case "7":
			var charReplace = "m";
			break;
		case "8":
			var charReplace = ",";
			break;
		case "9":
			var charReplace = ".";
			break;
		case "0":
			var charReplace = "/";
			break;
		case "@":
			var charReplace = "[";
			break;
		case ".":
			var charReplace = "]";
			break;
		default:
			break;
		}
		passphrase[i] = charReplace;
		passphrase = passphrase.join('');
		console.log(passphrase);
	}
	decryption(username,passphrase);
}

function decryption(username,passphrase){
	var username=username;
	var passphrase=passphrase;
	var i;
	for (i=0; i<username.length; i++){
		username = username.split('');
		var charReplace=username[i];
			switch(charReplace) {
		case "1":
			var charReplace = "q";
			break;
		case "2":
			var charReplace = "w";
			break;
		case "3":
			var charReplace = "e";
			break;
		case "4":
			var charReplace = "r";
			break;
		case "5":
			var charReplace = "t";
			break;
		case "6":
			var charReplace = "y";
			break;
		case "7":
			var charReplace = "u";
			break;
		case "8":
			var charReplace = "i";
			break;
		case "9":
			var charReplace = "o";
			break;
		case "0":
			var charReplace = "p";
			break;
		case "q":
			var charReplace = "a";
			break;
		case "w":
			var charReplace = "s";
			break;
		case "e":
			var charReplace = "d";
			break;
		case "r":
			var charReplace = "f";
			break;
		case "t":
			var charReplace = "g";
			break;
		case "y":
			var charReplace = "h";
			break;
		case "u":
			var charReplace = "j";
			break;
		case "i":
			var charReplace = "k";
			break;
		case "o":
			var charReplace = "l";
			break;
		case "a":
			var charReplace = "z";
			break;
		case "s":
			var charReplace = "x";
			break;
		case "d":
			var charReplace = "c";
			break;
		case "f":
			var charReplace = "v";
			break;
		case "g":
			var charReplace = "b";
			break;
		case "h":
			var charReplace = "n";
			break;
		case "j":
			var charReplace = "m";
			break;
		case "z":
			var charReplace = "1";
			break;
		case "x":
			var charReplace = "2";
			break;
		case "c":
			var charReplace = "3";
			break;
		case "v":
			var charReplace = "4";
			break;
		case "b":
			var charReplace = "5";
			break;
		case "n":
			var charReplace = "6";
			break;
		case "m":
			var charReplace = "7";
			break;
		case ",":
			var charReplace = "8";
			break;
		case ".":
			var charReplace = "9";
			break;
		case "/":
			var charReplace = "0";
			break;
		case "[":
			var charReplace = "@";
			break;
		case ".":
			var charReplace = "]";
			break;
		default:
			break;
		}
		username[i] = charReplace;
		username = username.join('');
		console.log(username);
	}
		for (i=0; i<passphrase.length; i++){
		passphrase = passphrase.split('');
		var charReplace=passphrase[i];
			switch(charReplace) {
		case "1":
			var charReplace = "q";
			break;
		case "2":
			var charReplace = "w";
			break;
		case "3":
			var charReplace = "e";
			break;
		case "4":
			var charReplace = "r";
			break;
		case "5":
			var charReplace = "t";
			break;
		case "6":
			var charReplace = "y";
			break;
		case "7":
			var charReplace = "u";
			break;
		case "8":
			var charReplace = "i";
			break;
		case "9":
			var charReplace = "o";
			break;
		case "0":
			var charReplace = "p";
			break;
		case "q":
			var charReplace = "a";
			break;
		case "w":
			var charReplace = "s";
			break;
		case "e":
			var charReplace = "d";
			break;
		case "r":
			var charReplace = "f";
			break;
		case "t":
			var charReplace = "g";
			break;
		case "y":
			var charReplace = "h";
			break;
		case "u":
			var charReplace = "j";
			break;
		case "i":
			var charReplace = "k";
			break;
		case "o":
			var charReplace = "l";
			break;
		case "a":
			var charReplace = "z";
			break;
		case "s":
			var charReplace = "x";
			break;
		case "d":
			var charReplace = "c";
			break;
		case "f":
			var charReplace = "v";
			break;
		case "g":
			var charReplace = "b";
			break;
		case "h":
			var charReplace = "n";
			break;
		case "j":
			var charReplace = "m";
			break;
		case "z":
			var charReplace = "1";
			break;
		case "x":
			var charReplace = "2";
			break;
		case "c":
			var charReplace = "3";
			break;
		case "v":
			var charReplace = "4";
			break;
		case "b":
			var charReplace = "5";
			break;
		case "n":
			var charReplace = "6";
			break;
		case "m":
			var charReplace = "7";
			break;
		case ",":
			var charReplace = "8";
			break;
		case ".":
			var charReplace = "9";
			break;
		case "/":
			var charReplace = "0";
			break;
		case "[":
			var charReplace = "@";
			break;
		case ".":
			var charReplace = "]";
			break;
		default:
			break;
		}
		passphrase[i] = charReplace;
		passphrase = passphrase.join('');
		console.log(passphrase);
	}
	logIn(username,passphrase);
}
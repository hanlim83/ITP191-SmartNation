//Intial GLOBAL Variables, DO NOT TOUCH
var login = document.getElementById("Login");
var portalInterface = document.getElementById("PortalInterface");
var authfailed = document.getElementById("authfailedMsg");
var logout = document.getElementById("logoutMsg");
var sessionfailed = document.getElementById("sessionerrorMsg");
var timestampdisplay = document.getElementsByClassName("timestamp");
var FeedbackReceived = document.getElementById("receivedFeedback");
var FAQReceived = document.getElementById("receivedFAQ");
var InterestReceived = document.getElementById("receivedInterest");
var LoadedProfile;
var Database;
var blockaccess;
sessionStorage.setItem("NorunA",0);
sessionStorage.setItem("NorunB",0);
sessionStorage.setItem("NorunC",0);
var d = new Date();
//User Array Databases, DO NOT TOUCH
function Database() {
	if (localStorage["AdminDatabase"]){
			Database = JSON.parse(localStorage["AdminDatabase"]);
		}
		else {
			Database = [
//{"AccountID":"","Name":"","Password":""},
{"UserID":"Example","Name":"Example User","Password":"SITisTHEbest"},
{"UserID":"hanlim17","Name":"Hansen Lim","Password":"SITisTHEbest"},
{"UserID":"hugoxyz","Name":"Hugo Chia","Password":"SITisTHEbest"},
{"UserID":"ShaoQi17","Name":"Koh Shao Qi","Password":"SITisTHEbest"},
{"UserID":"ZhiSheng17","Name":"Zhi Sheng","Password":"SITisTHEbest"}
];
		}
}
//Server Authentication Functions
function checklogin() {
var loginVar = sessionStorage.getItem('login');
var errorflag = sessionStorage.getItem('sessionerror');
var authflag = sessionStorage.getItem('autherror');
var logoutflag = sessionStorage.getItem('logout');
var usercheck;
if (loginVar == '1') {
login.style.display = "none";
var user = sessionStorage.getItem('userID');
for (i = 0; i<Database.length; i++){
	var tempt = Database[i];
	if ( user == tempt["UserID"] ){
usercheck = "true";
Userprofiling(tempt["UserID"]);
  }
}
if (usercheck != "true") {
	errorLogout();
}
}
else if (errorflag == '1'){
	sessionfailed.style.display = "block";
	sessionStorage.clear();
}
else if (authflag == '1'){
	authfailed.style.display="block";
	sessionStorage.clear();
}
else if (logoutflag == '1'){
	logout.style.display="block";
	sessionStorage.clear();
}
}
function validatelogin(userID,userpasspharse){
	var userID = userID;
	var password = userpasspharse;
for (i = 0; i<Database.length; i++){
	var tempt = Database[i]; 
	if ( userID == tempt["UserID"] && password == tempt["Password"] ){
		sessionStorage.setItem('userID', tempt["UserID"]);
		sessionStorage.setItem('login', '1');
  }
}
var loginVar = sessionStorage.getItem('login');
if (loginVar != 1) {
	sessionStorage.setItem('autherror', '1');
}
location.reload();
  }
function Logout() {
	sessionStorage.clear();
	sessionStorage.setItem('logout', '1');
	location.reload();
}
function errorLogout() {
	sessionStorage.clear();
	sessionStorage.setItem('sessionerror', '1');
	location.reload();
}
// Server Portal Interface functions
function Userprofiling (UserProfile) {
	for (var i = 0; i < Database.length; i++) {
		var tempt = Database[i];
		if (UserProfile == tempt["UserID"]) {
			LoadedProfile = tempt;
		}
	}
		if (sessionStorage.getItem("currentpage") !== null){
			var LandingPage = sessionStorage.getItem('currentpage');
			RedirectPage(LandingPage);
		}
		else {
			var LandingPage = "Overview";
			RedirectPage(LandingPage);
		}
		document.body.style.backgroundColor = "white";
		if (localStorage["Feedback"]){
		 var FeedbackBank = JSON.parse(localStorage["Feedback"]);
		 var FeedbackCount = 0;
	for (var i=0; i<FeedbackBank.length; i++){
		var FeedbackCount = FeedbackCount + 1;
	}
	receivedFeedback.innerText = FeedbackCount;
		}
		else {
			receivedFeedback.innerText = 0;
		}
		if (localStorage["FAQ"]){
		 var FAQBank = JSON.parse(localStorage["FAQ"]);
		 var FAQCount = 0;
	for (var i=0; i<FAQBank.length; i++){
		var FAQCount = FAQCount + 1;
	}
	receivedFAQ.innerText = FAQCount;
		}
		else {
			receivedFAQ.innerText = 0;
		}
		if (localStorage["interests"]){
		 var InterestBank = JSON.parse(localStorage["interests"]);
		 var InterestCount = 0;
	for (var i=0; i<InterestBank.length; i++){
		var InterestCount = InterestCount + 1;
	}
	receivedInterest.innerText = InterestCount;
		}
		else {
			receivedInterest.innerText = 0;
		}
		portalInterface.style.display="block";
	console.log(UserProfile+"'s profile is loaded");
}
function RedirectPage (LandingPage) {
	var destinationPageID = $("#"+LandingPage).attr("id");
	    var destinationpage = document.getElementById(destinationPageID);
		addActive(destinationPageID);
		functionCaller(destinationPageID);
	    destinationpage.style.display="block";
	    sessionStorage.setItem('currentpage', destinationPageID);
}
function removeActive () {
	var currentpage = sessionStorage.getItem('currentpage');
	switch(currentpage) {
    case 'Overview':
        var List = "list1";
        break;
    case 'FeedbackData':
        var List = "list2";
        break;
	case 'FAQData':
        var List = "list3";
        break;
	case 'BetaTestingData':
        var List = "list4";
        break;
	case 'UpdateProfile':
        var List = "list5";
        break;
    default:
		break;
}
$("#"+List).removeClass("active");
}
function addActive (destinationPageID) {
	switch(destinationPageID) {
     case 'Overview':
        var List = "list1";
        break;
    case 'FeedbackData':
        var List = "list2";
        break;
	case 'FAQData':
        var List = "list3";
        break;
	case 'BetaTestingData':
        var List = "list4";
        break;
	case 'UpdateProfile':
        var List = "list5";
        break;
    default:
		break;
}
$("#"+List).addClass("active");
}

function SwitchPage (destinationPage) {
	switch(destinationPage) {
    case 'Overview':
        var destinationPage = "Overview";
        break;
    case 'Feedback Form Data':
        var destinationPage = "FeedbackData";
        break;
	case 'FAQ Data':
        var destinationPage = "FAQData";
        break;
	case 'Beta Form Data':
        var destinationPage = "BetaTestingData";
        break;
	case 'Update Profile':
        var destinationPage = "UpdateProfile";
        break;
    default:
         var destinationPage = "404";
		break;
}
	var currentpageID = sessionStorage.getItem('currentpage');
	currentpageID = $("#"+currentpageID).attr("id");
	var currentpage = document.getElementById(currentpageID);
	var destinationPageID = $("#"+destinationPage).attr("id");
	var destinationpage = document.getElementById(destinationPageID);
	removeActive();
	currentpage.style.display="none";
	addActive(destinationPageID);
	destinationpage.style.display="block";
	sessionStorage.setItem('currentpage', destinationPageID);
	functionCaller(destinationPageID);
}
//Dashboard per-page Functions
function functionCaller(destinationPageID) {
		switch(destinationPageID) {
    case 'Overview':
        timestampGenerator();
		break;
    case 'FeedbackData':
		timestampGenerator();
		DisplayFeedback();
        break;
	case 'FAQData':
        timestampGenerator();
		DisplayFAQ();
        break;
	case 'BetaTestingData':
        timestampGenerator();
		DisplayInterest();
        break;
	case 'UpdateProfile':
        GetProfile();
        break;
    default:
		errorLogout();
		break;
}
}
function timestampGenerator() {
for (var i = 0; i < timestampdisplay.length; i++) {
    timestampdisplay[i].innerText = d.toDateString();
    }
}
function DisplayFeedback() {
	 if (localStorage["Feedback"]){
		 var FeedbackBank = JSON.parse(localStorage["Feedback"]);
	$("#FeedbackTable > tbody").empty();
	for (var i=0; i<FeedbackBank.length; i++){
			var TempBank = FeedbackBank[i];
			$("#FeedbackTable tbody").append(
        "<tr>"
            +"<td>"+TempBank["Name"]+"</td>"
			+"<td>"+TempBank["Email"]+"</td>"
			+"<td>"+TempBank["Feedback"]+"</td>"
			+"<td>"+TempBank["Timestamp"]+"</td>"
        +"</tr>" );
	}
	if (sessionStorage.getItem("NorunA") === null ||sessionStorage.getItem("NorunA") == 0 ) {
	$('#FeedbackTable').DataTable( {
    responsive: true,
	dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
} );
sessionStorage.setItem("NorunA",1);
	}
}
    else {
		$("#FeedbackTable > tbody").empty();
		$("#FeedbackTable tbody").append(
        "<tr>"
			+"<td colspan = '3'>"+"No Feedback Form Data!"+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
        +"</tr>" );
	}
}
function DisplayInterest() {
	 if (localStorage["interests"]){
		 var InterestBank = JSON.parse(localStorage["interests"]);
	$("#BetaTestingTable > tbody").empty();
	for (var i=0; i<InterestBank.length; i++){
			var TempBank = InterestBank[i]
			$("#BetaTestingTable tbody").append(
        "<tr>"
			+"<td>"+TempBank["name"]+"</td>"
            +"<td>"+TempBank["gender"]+"</td>"
			+"<td>"+TempBank["email"]+"</td>"
			+"<td>"+TempBank["contact"]+"</td>"
			+"<td>"+TempBank["comments"]+"</td>"
        +"</tr>" );
	}
	if (sessionStorage.getItem("NorunB") === null ||sessionStorage.getItem("NorunB") == 0 ) {
	$('#BetaTestingTable').DataTable( {
    responsive: true,
	dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
} );
	sessionStorage.setItem("NorunB",1);
}
}
    else {
		$("#BetaTestingTable > tbody").empty();
		$("#BetaTestingTable tbody").append(
        "<tr>"
			+"<td colspan = '4'>"+"No Interests Form Data!"+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
        +"</tr>" );
	}
}
function DisplayFAQ() {
	 if (localStorage["FAQ"]){
		 var FAQBank = JSON.parse(localStorage["FAQ"]);
	$("#FAQTable > tbody").empty();
	for (var i=0; i<FAQBank.length; i++){
			var TempBank = FAQBank[i]
			var counter = i;
			$("#FAQTable tbody").append(
        "<tr>"
			+"<td>"+counter+"</td>"
			+"<td>"+TempBank["qns"]+"</td>"
        +"</tr>" );
	}
	if (sessionStorage.getItem("NorunC") === null ||sessionStorage.getItem("NorunC") == 0 ) {
	$('#FAQTable').DataTable( {
    //responsive: true,
	dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
} );
	sessionStorage.setItem("NorunC",1);
}
}
    else {
		$("#FAQTable > tbody").empty();
		$("#FAQTable tbody").append(
        "<tr>"
			+"<td colspan = '2'>"+"No FAQ Data!"+"</td>"
			+"<td>"+""+"</td>"
        +"</tr>" );
	}
}
function GetProfile () {
	var successFlag = document.getElementById("UpdateSuccess");
	var mismatchFlag = document.getElementById("PasswordMismatch");
	successFlag.style.display="none";
	mismatchFlag.style.display="none";
	var AccountID = LoadedProfile["UserID"];
	var CURRENTname = LoadedProfile["Name"];
	$("#AccountID").val(AccountID);
	$("#UserName").val(CURRENTname); 
	$("#UserOldPassword").val("V^7xHf"); 
	$("#UserNewPassword").val("4X$X#6q&2ryj4A4Q"); 
	$("#UserCfmPassword").val("2@pdM-4_$Mv=%eCp"); 
}
function UpdateProfile () {
	var successFlag = document.getElementById("UpdateSuccess");
	var mismatchFlag = document.getElementById("PasswordMismatch");
	var oldpwd = document.getElementById("UserOldPassword").value;
	var newpwd = document.getElementById("UserNewPassword").value;
	var cfmpwd = document.getElementById("UserCfmPassword").value;
	var CURRENTpwd = LoadedProfile["Password"];
	if (CURRENTpwd == oldpwd && newpwd == cfmpwd) {
		LoadedProfile["Password"] = cfmpwd;
		var UserProfile = sessionStorage.getItem('userID');
		for (i = 0; i < Database.length; i++){
			var tempt = Database[i];
			if (UserProfile == tempt["UserID"]) {
				Database[i] = LoadedProfile;
				localStorage["AdminDatabase"] = JSON.stringify(Database);
			}
		}
		mismatchFlag.style.display="none";
		successFlag.style.display="block";
	}
	else if (CURRENTpwd != oldpwd || newpwd != cfmpwd){
		successFlag.style.display="none";
		mismatchFlag.style.display="block";
	}
	else {
		location.reload();
	}
}
//------------------------------------------------CRYPTO------------------------------------------------------------------------------------
function encryption(){
	var userID=document.getElementById("inputID").value;
	var userpasspharse=document.getElementById("inputPassword").value;
	var i;
	for (i=0; i<userID.length; i++){
		userID = userID.split('');
		var charReplace=userID[i];
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
		userID[i] = charReplace;
		userID = userID.join('');
		console.log(userID);
	}
		for (i=0; i<userpasspharse.length; i++){
		userpasspharse = userpasspharse.split('');
		var charReplace=userpasspharse[i];
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
		userpasspharse[i] = charReplace;
		userpasspharse = userpasspharse.join('');
		console.log(userpasspharse);
	}
	decryption(userID,userpasspharse);
}

function decryption(userID,userpasspharse){
	var userID=userID;
	var userpasspharse=userpasspharse;
	var i;
	for (i=0; i<userID.length; i++){
		userID = userID.split('');
		var charReplace=userID[i];
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
			case "]":
			var charReplace = ".";
			break;
		default:
			break;
		}
		userID[i] = charReplace;
		userID = userID.join('');
		console.log(userID);
	}
		for (i=0; i<userpasspharse.length; i++){
		userpasspharse = userpasspharse.split('');
		var charReplace=userpasspharse[i];
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
		case "]":
			var charReplace = ".";
			break;
		default:
			break;
		}
		userpasspharse[i] = charReplace;
		userpasspharse = userpasspharse.join('');
		console.log(userpasspharse);
	}
	validatelogin(userID,userpasspharse);
}
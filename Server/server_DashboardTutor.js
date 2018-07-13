//Intial GLOBAL Variables, DO NOT TOUCH
var acchelp = document.getElementById("AccountHelp");
var login = document.getElementById("Login");
var dashboardInterface = document.getElementById("dashboardinterface");
var authfailed = document.getElementById("authfailedMsg");
var logout = document.getElementById("logoutMsg");
var sessionfailed = document.getElementById("sessionerrorMsg");
var buttonreturnlogin = document.getElementById("returnLogin");
var userdisplay = document.getElementsByClassName("UserName");
var timestampdisplay = document.getElementsByClassName("timestamp");
var receivedrequestdisplay = document.getElementsByClassName("receivedRequests");
var acceptedrequestdisplay = document.getElementsByClassName("acceptedRequests");
var backtomain = document.getElementById("backtomain");
var dashboardBar = document.getElementById("DashboardBar");
var logoutButton = document.getElementById("logout");
var helpButton = document.getElementById("help");
var userFlag = document.getElementById("userFlag");
var LoadedProfile;
var blockaccess;
var helpactive;
var counter;
var Database;
var d = new Date();
sessionStorage.setItem("NorunA",0);
sessionStorage.setItem("NorunB",0);
//User Array Databases, DO NOT TOUCH
function Database() {
	if (localStorage["UserDatabase"]){
			Database = JSON.parse(localStorage["UserDatabase"]);
		}
		else {
			Database = [
//{"AccountID":"","Name":"","Email":"","Password":"","Phone":"","RequestsReceived":"0","RequestsAccepted":"0"},
{"AccountID":"Example","Name":"Example User","Email":"example@sit.nyp.edu.sg","Password":"SITisTHEbest","Phone":"65501600","RequestsReceived":"0","RequestsAccepted":"0"},
{"AccountID":"Tutor1","Name":"Jonathan Tan","Email":"16123S@mymail.nyp.edu.sg","Password":"jonathanpassword","Phone":"12345678","RequestsReceived":"0","RequestsAccepted":"0"},
{"AccountID":"Tutor2","Name":"Marrianne Clarke","Email":"maryClarke@gmail.com","Password":"marypassword","Phone":"87654321","RequestsReceived":"0","RequestsAccepted":"0"},
{"AccountID":"Tutor3","Name":"Sarah Sidle","Email":"Sidle789@outlook.sg","Password":"passwordsidle","Phone":"12348765","RequestsReceived":"0","RequestsAccepted":"0"},
{"AccountID":"Tutor4","Name":"Keith Cheng","Email":"Keith-Cheng@yahoo.com","Password":"passwordkeith","Phone":"56784321","RequestsReceived":"0","RequestsAccepted":"0"}
];
		}
}
/*
var userEmailArray = ["tutor@sit.nyp.edu.sg","tutor@nyp.edu.sg","tutor@example.com","tutor@example.sg"];
var userPasswordArray = ["strongpassword","weakpassword","password1","1password"];
var userNameArray = ["Tutor1","Tutor2","Tutor3","Tutor4"];
var Tutor1ProfileObj = {"contactNumber":"12345678","RequestsReceived":"1","RequestedAccepted":"0"};
var Tutor2ProfileObj = {"contactNumber":"87654321","RequestsReceived":"0","RequestedAccepted":"0"};
var Tutor3ProfileObj = {"contactNumber":"12348765","RequestsReceived":"10","RequestedAccepted":"10"};
var Tutor4ProfileObj = {"contactNumber":"56784321","RequestsReceived":"10","RequestedAccepted":"0"};
*/
//Server Authentication Functions
function checklogin() {
var loginVar = sessionStorage.getItem('login');
var errorflag = sessionStorage.getItem('sessionerror');
var authflag = sessionStorage.getItem('autherror');
var logoutflag = sessionStorage.getItem('logout');
var usercheck;
if (loginVar == '1') {
backtomain.style.display = "none";
login.style.display = "none";
var user = sessionStorage.getItem('userID');
for (i = 0; i<Database.length; i++){
	var tempt = Database[i];
	if ( user == tempt["AccountID"] ){
usercheck = "true";
tutorprofiling(tempt["AccountID"]);
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
function validatelogin(useremail,userpasspharse){
	var useremail = useremail;
	var password = userpasspharse;
for (i = 0; i<Database.length; i++){
	var tempt = Database[i]; 
	if ( useremail == tempt["Email"] && password == tempt["Password"] ){
		sessionStorage.setItem('userID', tempt["AccountID"]);
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
// Server Dashboard Login and Help Functions
function accounthelp() {
login.style.display="none";
acchelp.style.display="block";
dashboardInterface.style.display="block";
buttonreturnlogin.style.display="block";
}
function dashboardhelp() {
var currentpageID = sessionStorage.getItem('currentpage');
currentpageID = $("#"+currentpageID).attr("id");
var currentpage = document.getElementById(currentpageID);
removeActive();
currentpage.style.display="none";
acchelp.style.display="block";
buttonreturnlogin.style.display="none";
helpactive = '1';
}
function backtologin() {
buttonreturnlogin.style.display="none";
acchelp.style.display="none";
dashboardInterface.style.display="none";
login.style.display="block";
}
// Server Dashboard Interface functions
function tutorprofiling (UserProfile) {
	for (var i = 0; i < Database.length; i++) {
		var tempt = Database[i];
		if (UserProfile == tempt["AccountID"]) {
			LoadedProfile = tempt;
		}
	}
		if (sessionStorage.getItem("currentpage") !== null){
			var LandingPage = sessionStorage.getItem('currentpage');
			RedirectPage(LandingPage);
		}
		else {
			var LandingPage = "dashboardOverview";
			RedirectPage(LandingPage);
		}
		dashboardBar.style.display="block";
		helpButton.style.display="block";
		logoutButton.style.display="block";
		userFlag.style.display="block";
		RequestCounterUpdate();
		for (var i = 0; i < userdisplay.length; i++) {
    userdisplay[i].innerText = LoadedProfile["Name"];
    };
        for (var i = 0; i < receivedrequestdisplay.length; i++) {
    receivedrequestdisplay[i].innerText = LoadedProfile["RequestsReceived"];
    };
        for (var i = 0; i < acceptedrequestdisplay.length; i++) {
    acceptedrequestdisplay[i].innerText = LoadedProfile["RequestsAccepted"];
    };
		dashboardinterface.style.display="block";
		DisableRequests();
	console.log(UserProfile+"'s profile is loaded");
}
function DisableRequests () {
	var requests = LoadedProfile["RequestsReceived"];
	if (requests == "0") {
	alert("You have received "+requests+" requests. You will not be able to access eServices under the Tutor-Requests Section. All other eServices are still availiable.");
	$('#list2').addClass("disabled");
	$('#list3').addClass("disabled");
	$('#list4').addClass("disabled");
	blockaccess = "1";
}
}
function RequestCounterUpdate () {
	var CounterReceived = 0;
	var CounterAccepted = 0;
	if (localStorage["TutorConsultation"]){
		 var RequestBank = JSON.parse(localStorage["TutorConsultation"]);
	for (var i=0; i<RequestBank.length; i++){
			var TempBank = RequestBank[i]
			if (TempBank["Tutorchoice"] == LoadedProfile["Name"]) {
			CounterReceived = CounterReceived + 1;
		}
		if (TempBank["Tutorchoice"] == LoadedProfile["Name"] && TempBank["RequestStatus"] == "Accepted") {
			CounterAccepted = CounterAccepted + 1;
		}
	}
}
LoadedProfile["RequestsReceived"] = CounterReceived;
	LoadedProfile["RequestsAccepted"] = CounterAccepted;
	var UserProfile = LoadedProfile["AccountID"];
	for (i = 0; i < Database.length; i++) {
		var tempt = Database[i];
		if (UserProfile == tempt["AccountID"]) {
			Database[i] = LoadedProfile;
			localStorage["UserDatabase"] = JSON.stringify(Database);
		}
	}
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
    case 'dashboardOverview':
        var List = "list1";
        break;
    case 'dashboardViewRequests':
        var List = "list2";
        break;
	case 'dashboardRespondRequests':
        var List = "list3";
        break;
	case 'dashboardExportRequests':
        var List = "list4";
        break;
	case 'dashboardViewCalendar':
        var List = "list5";
        break;
	case 'dashboardUpdateProfile':
        var List = "list6";
        break;
    default:
		break;
}
$("#"+List).removeClass("active");
}
function addActive (destinationPageID) {
	switch(destinationPageID) {
    case 'dashboardOverview':
        var List = "list1";
        break;
    case 'dashboardViewRequests':
        var List = "list2";
        break;
	case 'dashboardRespondRequests':
        var List = "list3";
        break;
	case 'dashboardExportRequests':
        var List = "list4";
        break;
	case 'dashboardViewCalendar':
        var List = "list5";
        break;
	case 'dashboardUpdateProfile':
        var List = "list6";
        break;
    default:
		break;
}
$("#"+List).addClass("active");
}

function SwitchPage (destinationPage) {
	if (blockaccess == "1") {
		switch(destinationPage) {
    case 'dashboardOverview':
        var destinationPage = "dashboardOverview";
        break;
    case 'View Requests':
        var destinationPage = sessionStorage.getItem('currentpage');
        break;
	case 'Respond to Requests':
        var destinationPage = sessionStorage.getItem('currentpage');
        break;
	case 'Export Requests':
        var destinationPage = sessionStorage.getItem('currentpage');
        break;
	case 'Calendar':
        var destinationPage = "dashboardViewCalendar";
        break;
	case 'Update Profile':
        var destinationPage = "dashboardUpdateProfile";
        break;
    default:
         var destinationPage = "dashboard404";
		break;
}
	var currentpageID = sessionStorage.getItem('currentpage');
	currentpageID = $("#"+currentpageID).attr("id");
	var currentpage = document.getElementById(currentpageID);
	var destinationPageID = $("#"+destinationPage).attr("id");
	var destinationpage = document.getElementById(destinationPageID);
	if (helpactive == '1') {
		acchelp.style.display="none";
		removeActive();
	addActive(destinationPageID);
	functionCaller(destinationPageID);
	destinationpage.style.display="block";
	sessionStorage.setItem('currentpage', destinationPageID);
	helpactive = '0';
	}
	else {
	removeActive();
	currentpage.style.display="none";
	addActive(destinationPageID);
	functionCaller(destinationPageID);
	destinationpage.style.display="block";
	sessionStorage.setItem('currentpage', destinationPageID);
	}
	}
	else {
	switch(destinationPage) {
    case 'dashboardOverview':
        var destinationPage = "dashboardOverview";
        break;
    case 'View Requests':
        var destinationPage = "dashboardViewRequests";
        break;
	case 'Respond to Requests':
        var destinationPage = "dashboardRespondRequests";
        break;
	case 'Export Requests':
        var destinationPage = "dashboardExportRequests";
        break;
	case 'Calendar':
        var destinationPage = "dashboardViewCalendar";
        break;
	case 'Update Profile':
        var destinationPage = "dashboardUpdateProfile";
        break;
    default:
         var destinationPage = "dashboard404";
		break;
}
	var currentpageID = sessionStorage.getItem('currentpage');
	currentpageID = $("#"+currentpageID).attr("id");
	var currentpage = document.getElementById(currentpageID);
	var destinationPageID = $("#"+destinationPage).attr("id");
	var destinationpage = document.getElementById(destinationPageID);
	if (helpactive == '1') {
		acchelp.style.display="none";
		removeActive();
	addActive(destinationPageID);
	functionCaller(destinationPageID);
	destinationpage.style.display="block";
	sessionStorage.setItem('currentpage', destinationPageID);
	helpactive = '0';
	}
	else {
	removeActive();
	currentpage.style.display="none";
	addActive(destinationPageID);
	functionCaller(destinationPageID);
	destinationpage.style.display="block";
	sessionStorage.setItem('currentpage', destinationPageID);
	}
}
}
//Dashboard per-page Functions
function functionCaller(destinationPageID) {
		switch(destinationPageID) {
    case 'dashboardOverview':
        timestampGenerator();
		break;
    case 'dashboardViewRequests':
		timestampGenerator();
		DisplayRequests();
        break;
	case 'dashboardRespondRequests':
        PopulateUserName();
        break;
	case 'dashboardExportRequests':
        timestampGenerator();
		ExportRequests();
        break;
	case 'dashboardViewCalendar':
        
        break;
	case 'dashboardUpdateProfile':
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
function DisplayRequests() {
	var Today = new Date();
var Day = Today.getDate();
var Month = Today.getMonth()+1; //January is 0!
var Year = Today.getFullYear();
 if(Day<10){
        Day='0'+Day
    } 
    if(Month<10){
        Month='0'+Month
    } 
Today = Year+'-'+Month+'-'+Day;
	 if (localStorage["TutorConsultation"]){
		 var RequestBank = JSON.parse(localStorage["TutorConsultation"]);
	$("#RequestsTable > tbody").empty();
	for (var i=0; i<RequestBank.length; i++){
			var TempBank = RequestBank[i]
			if ( TempBank["Tutorchoice"] == LoadedProfile["Name"]) {
				if (TempBank["apptdate"] >= Today) {
			$("#RequestsTable tbody").append(
        "<tr onclick='RedirecttoResponse("+TempBank["RequestNumber"]+")'>"
            +"<td>"+TempBank["RequestNumber"]+"</td>"
            +"<td>"+TempBank["Name"]+"</td>"
			+"<td>"+TempBank["Email"]+"</td>"
			+"<td>"+TempBank["Phone"]+"</td>"
			+"<td>"+TempBank["apptdate"]+"</td>"
			+"<td>"+TempBank["appttime"]+"</td>"
			+"<td>"+TempBank["apptduration"]+"</td>"
			+"<td>"+TempBank["RequestStatus"]+"</td>"
        +"</tr>" );
				}
			}
	}
}
    else {
		$("#RequestsTable > tbody").empty();
		$("#RequestsTable tbody").append(
        "<tr>"
			+"<td colspan = '7'>"+"Retrieval of Requests Failed!"+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
        +"</tr>" );
	}
	if (sessionStorage.getItem("NorunA") === null ||sessionStorage.getItem("NorunA") == 0 ) {
	$('#RequestsTable').DataTable( {
    responsive: true
} );
sessionStorage.setItem("NorunA",1);
	}
}
function RedirecttoResponse (RequestID) {
	SwitchPage ("Respond to Requests");
	var Autofill = document.getElementById("RequestNumber");
	Autofill.value = RequestID;
	GetRequestDetails ();
}
function ExportRequests() {
	 if (localStorage["TutorConsultation"]){
		 var RequestBank = JSON.parse(localStorage["TutorConsultation"]);
	$("#ERequestsTable > tbody").empty();
	for (var i=0; i<RequestBank.length; i++){
			var TempBank = RequestBank[i]
			if ( TempBank["Tutorchoice"] == LoadedProfile["Name"]) {
			$("#ERequestsTable tbody").append(
        "<tr>"
			+"<td>"+TempBank["RequestNumber"]+"</td>"
            +"<td>"+TempBank["Name"]+"</td>"
			+"<td>"+TempBank["apptdate"]+"</td>"
			+"<td>"+TempBank["appttime"]+"</td>"
			+"<td>"+TempBank["apptduration"]+"</td>"
			+"<td>"+TempBank["Concern"]+"</td>"
			+"<td>"+TempBank["RequestStatus"]+"</td>"
        +"</tr>" );
		}
	}
}
    else {
		$("#ERequestsTable > tbody").empty();
		$("#ERequestsTable tbody").append(
        "<tr>"
			+"<td colspan = '6'>"+"Retrieval of Requests Failed!"+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
			+"<td>"+""+"</td>"
        +"</tr>" );
	}
	if (sessionStorage.getItem("NorunB") === null ||sessionStorage.getItem("NorunB") == 0 ) {
	$('#ERequestsTable').DataTable( {
    responsive: true,
	dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
} );
	sessionStorage.setItem("NorunB",1);
}
}
function GetRequestConcern () {
	var RequestNumber = document.getElementById("requestnumber").value;
	if (localStorage["TutorConsultation"]){
		 var RequestBank = JSON.parse(localStorage["TutorConsultation"]);
		 for ( i = 0; i < RequestBank.length; i++) {
			 var tempt = RequestBank[i];
			 if (tempt["RequestNumber"] == RequestNumber) {
				 var Concern = tempt["Concern"];
		 $("#DisplayConcerns").val(Concern);
			 }
		 }
	}
}
function PopulateUserName () {
	var UserName = LoadedProfile["Name"];
	$("#TutorName").val(UserName);
}
function RePopulateForm () {
	$("#RequestNumber").val("");
	$("#TuteeName").val("");
	$("#TuteePhone").val("");
	$("#TuteeEmail").val("");
	$("#TutorChoice").val("");
	$("#ConsultationDate").val("");
	$("#ConsultationTime").val("");
	$("#ConsultationDuration").val("");
	$("#TuteeConcerns").val("");
	$("#CurrentRequestStatus").val("");
	$("#NewRequestStatus").val("");
	$("#UserPassword").val("");
	var successFlag = document.getElementById("ResponseSuccess");
	var failedFlag = document.getElementById("ResponseFailed");
	successFlag.style.display = "none";
	failedFlag.style.display = "none";
}
function GetRequestDetails () {
	var RequestNumber = document.getElementById("RequestNumber").value;
	if (localStorage["TutorConsultation"]){
		 var RequestBank = JSON.parse(localStorage["TutorConsultation"]);
		 for ( i = 0; i < RequestBank.length; i++){
			 var tempt = RequestBank[i];
			 if (tempt["RequestNumber"] == RequestNumber) {
				 var Name = tempt["Name"];
		 var Phone = tempt["Phone"];
		 var Email = tempt["Email"];
		 var Choice = tempt["Tutorchoice"];
		 var ADate = tempt["apptdate"];
		 var ATime = tempt["appttime"];
		 var ADuration = tempt["apptduration"];
		 var Concern = tempt["Concern"];
		 var Status = tempt["RequestStatus"];
		 $("#TuteeName").val(Name);
		 $("#TuteePhone").val(Phone);
		 $("#TuteeEmail").val(Email);
		 $("#TutorChoice").val(Choice);
		 $("#ConsultationDate").val(ADate);
		 $("#ConsultationTime").val(ATime);
		 $("#ConsultationDuration").val(ADuration);
		 $("#TuteeConcerns").val(Concern);
		 $("#CurrentRequestStatus").val(Status);
			 }
		 }
	}
}
function UpdateResponse() {
	var RequestNumber = document.getElementById("RequestNumber").value;
	var RequestBank = JSON.parse(localStorage["TutorConsultation"]);
	for (i = 0; i<RequestBank.length; i++) {
		 var temp = RequestBank[i];
		if (RequestNumber == temp["RequestNumber"]){
			var Tempt = temp;
			var counter = i;
		}
	}
	var user = LoadedProfile["Name"];
	var VerifyPassword = document.getElementById("UserPassword").value;
	var OldStatus = document.getElementById("CurrentRequestStatus").value;
	var NewStatus = document.getElementById("NewRequestStatus").value;
	var Tutorchoice = document.getElementById("TutorChoice").value;
	var successFlag = document.getElementById("ResponseSuccess");
	var failedFlag = document.getElementById("ResponseFailed");
	if (user == Tutorchoice && OldStatus !== NewStatus && VerifyPassword == LoadedProfile["Password"]) {
		Tempt["RequestStatus"] = NewStatus;
		RequestBank[counter] = Tempt;
		localStorage["TutorConsultation"] = JSON.stringify(RequestBank);
		successFlag.style.display = "block";
		failedFlag.style.display = "none";
		RequestCounterUpdate();
	}
	else {
		successFlag.style.display = "none";
		failedFlag.style.display = "block";
	}
}
function CalNewWindow() {
window.open("https://calendar.google.com/calendar/embed?title=Tutor%20Calendar&showTitle=0&showPrint=0&showTabs=0&showCalendars=0&wkst=2&bgcolor=%23FFFFFF&src=smartnationnyp%40gmail.com&color=%231B887A&src=en.singapore%23holiday%40group.v.calendar.google.com&color=%23125A12&ctz=Asia%2FSingapore");
}
function GetProfile () {
	var successFlag = document.getElementById("UpdateSuccess");
	var mismatchFlag = document.getElementById("PasswordMismatch");
	successFlag.style.display="none";
	mismatchFlag.style.display="none";
	var AccountID = LoadedProfile["AccountID"];
	var CURRENTname = LoadedProfile["Name"];
	var CURRENTemail = LoadedProfile["Email"];
	var CURRENTphone = LoadedProfile["Phone"];
	$("#AccountID").val(AccountID);
	$("#UserName").val(CURRENTname); 
	$("#UserEmail").val(CURRENTemail); 
	$("#UserPhone").val(CURRENTphone); 
	$("#UserOldPassword").val("V^7xHf"); 
	$("#UserNewPassword").val("4X$X#6q&2ryj4A4Q"); 
	$("#UserCfmPassword").val("2@pdM-4_$Mv=%eCp"); 
}
function UpdateProfile () {
	var successFlag = document.getElementById("UpdateSuccess");
	var mismatchFlag = document.getElementById("PasswordMismatch");
	var NEWemail = document.getElementById("UserEmail").value;
	var NEWphone = document.getElementById("UserPhone").value;
	var oldpwd = document.getElementById("UserOldPassword").value;
	var newpwd = document.getElementById("UserNewPassword").value;
	var cfmpwd = document.getElementById("UserCfmPassword").value;
	var CURRENTpwd = LoadedProfile["Password"];
	if (CURRENTpwd == oldpwd && newpwd == cfmpwd) {
		LoadedProfile["Phone"] = NEWphone;
		LoadedProfile["Email"] = NEWemail;
		LoadedProfile["Password"] = cfmpwd;
		var UserProfile = sessionStorage.getItem('userID');
		for (i = 0; i < Database.length; i++){
			var tempt = Database[i];
			if (UserProfile == tempt["AccountID"]) {
				Database[i] = LoadedProfile;
				localStorage["UserDatabase"] = JSON.stringify(Database);
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
	var useremail=document.getElementById("inputEmail").value;
	var userpasspharse=document.getElementById("inputPassword").value;
	var i;
	for (i=0; i<useremail.length; i++){
		useremail = useremail.split('');
		var charReplace=useremail[i];
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
		useremail[i] = charReplace;
		useremail = useremail.join('');
		console.log(useremail);
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
	decryption(useremail,userpasspharse);
}

function decryption(useremail,userpasspharse){
	var useremail=useremail;
	var userpasspharse=userpasspharse;
	var i;
	for (i=0; i<useremail.length; i++){
		useremail = useremail.split('');
		var charReplace=useremail[i];
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
		useremail[i] = charReplace;
		useremail = useremail.join('');
		console.log(useremail);
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
	validatelogin(useremail,userpasspharse);
}
//Intial GLOBAL Variables, DO NOT TOUCH
var LandingPage = document.getElementById("LandingPage");
var dashboardInterface = document.getElementById("dashboardinterface");
var AuthRequestNumber = document.getElementById("dashboardRequestNumber");
var AuthInfo = document.getElementById("dashboardInfo");
var DisplayRequest = document.getElementById("dashboardDisplayRequest");
var ConsultationDatabase;
var RequestedRequestNumber;
//User Array Databases, DO NOT TOUCH
function Database() {
	if (localStorage["TutorConsultation"]){
			ConsultationDatabase = JSON.parse(localStorage["TutorConsultation"]);
		}
		else {
			ConsultationDatabase = [
{"RequestNumber":"513341","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Jonathan Tan","apptdate":"2017-08-05","appttime":"16:40","apptduration":"1 hour","Concern":"This is an example of a Pending Request.","RequestStatus":"Pending"},
{"RequestNumber":"685868","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Jonathan Tan","apptdate":"2017-08-05","appttime":"12:40","apptduration":"1 hour","Concern":"This is an example of an Accepted Request.","RequestStatus":"Accepted"},
{"RequestNumber":"618112","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Jonathan Tan","apptdate":"2017-08-05","appttime":"20:40","apptduration":"1 hour","Concern":"This is an example of a Rejected Request.","RequestStatus":"Rejected"},
{"RequestNumber":"893384","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Marrianne Clarke","apptdate":"2017-08-06","appttime":"15:30","apptduration":"1 hour","Concern":"This is an example of a Pending Request.","RequestStatus":"Pending"},
{"RequestNumber":"641310","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Marrianne Clarke","apptdate":"2017-08-06","appttime":"11:30","apptduration":"1 hour","Concern":"This is an example of an Accepted Request.","RequestStatus":"Accepted"},
{"RequestNumber":"558958","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Marrianne Clarke","apptdate":"2017-08-06","appttime":"19:30","apptduration":"1 hour","Concern":"This is an example of a Rejected Request.","RequestStatus":"Rejected"},
{"RequestNumber":"248686","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Sarah Sidle","apptdate":"2017-08-07","appttime":"14:20","apptduration":"1 hour","Concern":"This is an example of a Pending Request.","RequestStatus":"Pending"},
{"RequestNumber":"349941","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Sarah Sidle","apptdate":"2017-08-07","appttime":"10:20","apptduration":"1 hour","Concern":"This is an example of an Accepted Request.","RequestStatus":"Accepted"},
{"RequestNumber":"520113","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Sarah Sidle","apptdate":"2017-08-07","appttime":"18:20","apptduration":"1 hour","Concern":"This is an example of a Rejected Request.","RequestStatus":"Rejected"},
{"RequestNumber":"666946","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Keith Cheng","apptdate":"2017-08-08","appttime":"13:10","apptduration":"1 hour","Concern":"This is an example of a Pending Request.","RequestStatus":"Pending"},
{"RequestNumber":"585385","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Keith Cheng","apptdate":"2017-08-08","appttime":"09:10","apptduration":"1 hour","Concern":"This is an example of an Accepted Request.","RequestStatus":"Accepted"},
{"RequestNumber":"251114","Name":"Somebody","Email":"somebody@example.com","Phone":"12345678","Tutorchoice":"Keith Cheng","apptdate":"2017-08-08","appttime":"17:10","apptduration":"1 hour","Concern":"This is an example of a Rejected Request.","RequestStatus":"Rejected"}
];
		}
}
// Server Dashboard Interface functions
function DirectRN () {
	LandingPage.style.display = "none";
	dashboardInterface.style.display = "block";
	AuthRequestNumber.style.display = "block";
}
function DirectInfo () {
	LandingPage.style.display = "none";
	dashboardInterface.style.display = "block";
	AuthInfo.style.display = "block";
}
function CheckRequestNumber () {
	if (sessionStorage.getItem("AlertActive") == 1) {
		$("#Requestalert").alert("close");
	}
	var RequestNumber = document.getElementById("RequestNumber").value;
	sessionStorage.setItem("errorflag",1);
		 for ( i = 0; i < ConsultationDatabase.length; i++){
			 var tempt = ConsultationDatabase[i];
			 if (tempt["RequestNumber"] == RequestNumber) {
		 var cfmRN = tempt["RequestNumber"];
		 var Choice = tempt["Tutorchoice"];
		 var CDate = new Date(tempt["apptdate"]);
		 var ADate = CDate.toDateString();
		 var ATime = tempt["appttime"];
		 var ADuration = tempt["apptduration"];
		 var Status = tempt["RequestStatus"];
		 sessionStorage.setItem("errorflag",0);
		 $("#DisplayRequestNumber").text(cfmRN);
		 $("#DisplayRequestStatus").text(Status);
		 $("#DisplayTutorChoice").text(Choice);
		 $("#DisplayConsultationDate").text(ADate);
		 $("#DisplayConsultationTime").text(ATime);
		 $("#DisplayConsultationDuration").text(ADuration);
		 dashboardRequestNumber.style.display = "none";
		 dashboardDisplayRequest.style.display = "block";
			 }
		 }
		 if (sessionStorage.getItem("errorflag")== 1) {
			 //alert("No request found based on provided request number! Please double check and try again!");
			 $('#alertRequest').append(
        '<div id="Requestalert" class="alert alert-warning alert-dismissable fade in">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button>' + "No request found based on provided request number! Please double check and try again!" + '</div>');
			sessionStorage.setItem("AlertActive",1);
		 }
	}
function CheckInformation () {
	if (sessionStorage.getItem("AlertActive") == 1) {
		$("#Infoalert").alert("close");
	}
	var TutorChoiceSelect = document.getElementById("TutorChoice");
	var Tutorchoice = TutorChoiceSelect.options[TutorChoiceSelect.selectedIndex].text;
	var apptdate = document.getElementById("ConsultationDate").value;
	var appttime = document.getElementById("ConsultationTime").value;
	var ConsultationDurationSelect = document.getElementById("ConsultationDuration");
	var apptduration = ConsultationDurationSelect.options[ConsultationDurationSelect.selectedIndex].text;
	sessionStorage.setItem("errorflag",1);
		 for ( i = 0; i < ConsultationDatabase.length; i++){
			 var tempt = ConsultationDatabase[i];
			 if (tempt["Tutorchoice"] == Tutorchoice && tempt["apptdate"] == apptdate && tempt["appttime"] == appttime && tempt["apptduration"] == apptduration ) {
		 var cfmRN = tempt["RequestNumber"];
		 var Choice = tempt["Tutorchoice"];
		 var CDate = new Date(tempt["apptdate"]);
		 var ADate = CDate.toDateString();
		 var ATime = tempt["appttime"];
		 var ADuration = tempt["apptduration"];
		 var Status = tempt["RequestStatus"];
		 sessionStorage.setItem("errorflag",0);
		 $("#DisplayRequestNumber").text(cfmRN);
		 $("#DisplayRequestStatus").text(Status);
		 $("#DisplayTutorChoice").text(Choice);
		 $("#DisplayConsultationDate").text(ADate);
		 $("#DisplayConsultationTime").text(ATime);
		 $("#DisplayConsultationDuration").text(ADuration);
		 dashboardInfo.style.display = "none";
		 dashboardDisplayRequest.style.display = "block";
			 }
		 }
		 if (sessionStorage.getItem("errorflag")== 1) {
			 //alert("No request found based on provided information! Please double check and try again!");
			 $('#alertInfo').append(
        '<div id="Infoalert" class="alert alert-warning alert-dismissable fade in">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button>' + "No request found based on provided information! Please double check and try again!" + '</div>');
			sessionStorage.setItem("AlertActive",1);
		 }
}
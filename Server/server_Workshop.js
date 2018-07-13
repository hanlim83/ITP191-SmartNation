var i;
function newWorkshops(){
	pastTab.style.display="none";
	if(localStorage["description"]){
		var retrieveData1 = localStorage.getItem("title");
		var titleArr=JSON.parse(retrieveData1);
		
		var retrieveData2 = localStorage.getItem("startDate");
		var startDateArr=JSON.parse(retrieveData2);
		
		var retrieveData3 = localStorage.getItem("endDate");
		var endDateArr=JSON.parse(retrieveData3);
		
		var retrieveData4 = localStorage.getItem("description");
		var descriptionArr=JSON.parse(retrieveData4);
		
		var retrieveData5 = localStorage.getItem("url");
		var urlArr=JSON.parse(retrieveData5);
	}
	for (i=titleArr.length-1; i>=0; i--){
		var divWorkshop=document.createElement("div");
		divWorkshop.id ="div"+i;
		divWorkshop.classList.add("jumbotron");
		var header=document.createElement("h1");
		header.innerText=titleArr[i];
		divWorkshop.appendChild(header);
		var circleButton=document.createElement("a");
		circleButton.classList.add("arrow");
		circleButton.href=urlArr[i];
		circleButton.target="_blank";
		header.appendChild(circleButton);
		
		var durationStrong=document.createElement("p");
		durationStrong.innerText=stringDuration(startDateArr[i])+" - "+stringDuration(endDateArr[i]);
		//durationStrong.innerText=stringDuration(endDateArr[i]);
		durationStrong.style.fontWeight="bold";
		divWorkshop.appendChild(durationStrong);
		
		var node=document.createElement("p");
		node.innerText=descriptionArr[i];
		divWorkshop.appendChild(node);
		var jumbotron=divWorkshop;
		document.getElementById("newWorkshops").appendChild(jumbotron);
	}
}

function stringDuration(startDate){
	console.log(startDate);
	var strStartDate=startDate;
	strStartDate = strStartDate.split('');
	strStartDate[0] = startDate[8];
	strStartDate = strStartDate.join('');
	
	strStartDate = strStartDate.split('');
	strStartDate[1] = startDate[9];
	strStartDate = strStartDate.join('');
	
	strStartDate = strStartDate.split('');
	strStartDate[2] = " ";
	strStartDate = strStartDate.join('');
	
	var monthNum=startDate[5]+startDate[6];
	console.log(monthNum);
	
		switch(monthNum) {
    case "01":
        var month = "Jan";
        break;
    case "02":
        var month = "Feb";
        break;
	case "03":
        var month = "Mar";
        break;
	case "04":
        var month = "Apr";
        break;
	case "05":
        var month = "May";
        break;
	case "06":
        var month = "Jun";
        break;
	case "07":
        var month = "Jul";
        break;
	case "08":
        var month = "Aug";
        break;
	case "09":
        var month = "Sep";
        break;
	case "10":
        var month = "Oct";
        break;
	case "11":
        var month = "Nov";
        break;
	case "12":
        var month = "Dec";
        break;
    default:
		break;
	}
	strStartDate = strStartDate.split('');
	strStartDate[3] = month;
	strStartDate = strStartDate.join('');
	
	strStartDate = strStartDate.split('');
	strStartDate[6] = " ";
	strStartDate = strStartDate.join('');
	
	strStartDate = strStartDate.split('');
	strStartDate[7] = startDate[0];
	strStartDate = strStartDate.join('');
	
	strStartDate = strStartDate.split('');
	strStartDate[8] = startDate[1];
	strStartDate = strStartDate.join('');
		
	strStartDate = strStartDate.split('');
	strStartDate[9] = startDate[2];
	strStartDate = strStartDate.join('');
	
	strStartDate = strStartDate.split('');
	strStartDate[10] = startDate[3];
	strStartDate = strStartDate.join('');
	
	strStartDate = strStartDate.split('');
	strStartDate[11] = "";
	strStartDate = strStartDate.join('');
	console.log(strStartDate);
	return strStartDate;
}

function stringDuration(endDate){
	console.log(endDate);
	var strEndDate=endDate;
	strEndDate = strEndDate.split('');
	strEndDate[0] = endDate[8];
	strEndDate = strEndDate.join('');
	
	strEndDate = strEndDate.split('');
	strEndDate[1] = endDate[9];
	strEndDate = strEndDate.join('');
	
	strEndDate = strEndDate.split('');
	strEndDate[2] = " ";
	strEndDate = strEndDate.join('');
	
	var monthNum=endDate[5]+endDate[6];
	console.log(monthNum);
	
		switch(monthNum) {
    case "01":
        var month = "Jan";
        break;
    case "02":
        var month = "Feb";
        break;
	case "03":
        var month = "Mar";
        break;
	case "04":
        var month = "Apr";
        break;
	case "05":
        var month = "May";
        break;
	case "06":
        var month = "Jun";
        break;
	case "07":
        var month = "Jul";
        break;
	case "08":
        var month = "Aug";
        break;
	case "09":
        var month = "Sep";
        break;
	case "10":
        var month = "Oct";
        break;
	case "11":
        var month = "Nov";
        break;
	case "12":
        var month = "Dec";
        break;
    default:
		break;
	}
	strEndDate = strEndDate.split('');
	strEndDate[3] = month;
	strEndDate = strEndDate.join('');
	
	strEndDate = strEndDate.split('');
	strEndDate[6] = " ";
	strEndDate = strEndDate.join('');
	
	strEndDate = strEndDate.split('');
	strEndDate[7] = endDate[0];
	strEndDate = strEndDate.join('');
	
	strEndDate = strEndDate.split('');
	strEndDate[8] = endDate[1];
	strEndDate = strEndDate.join('');
		
	strEndDate = strEndDate.split('');
	strEndDate[9] = endDate[2];
	strEndDate = strEndDate.join('');
	
	strEndDate = strEndDate.split('');
	strEndDate[10] = endDate[3];
	strEndDate = strEndDate.join('');
	
	strEndDate = strEndDate.split('');
	strEndDate[11] = "";
	strEndDate = strEndDate.join('');
	console.log(strEndDate);
	return strEndDate;
}

function activeButtonCurrent(){
	pastEvents.classList.remove("active");
	currentEvents.classList.add("active");
	currentTab.style.display="block";
	currentTab.style.transition="2s";
	pastTab.style.display="none";
}
function activeButtonPast(){
	currentEvents.classList.remove("active");
	pastEvents.classList.add("active");
	currentTab.style.display="none";
	pastTab.style.display="block";
}
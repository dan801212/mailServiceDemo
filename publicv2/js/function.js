var LOCALHOST = "http://localhost:3000/inboxMail"


function getMail(){
	var url = buildURL();

	$.ajax({
		type: "GET",
		url: LOCALHOST + url,
		contentType: "application/json",
		dataType: "json",
		success: function (response) {
			// console.log(response[0]);
			showMailBlock(response);
		},
		error: function(response) {
			console.log(response);
		}
	});
}

function buildURL(){
	var url = "?";
	if(document.getElementById("folderCheckbox").checked){
		if(document.getElementById("folderText").value.length > 0)
			url += "folder=" + document.getElementById("folderText").value + "&";
	}
	if(document.getElementById("fromCheckbox").checked){
		if(document.getElementById("fromText").value.length > 0)
			url += "from=" + document.getElementById("fromText").value + "&";
	}
	if(document.getElementById("toCheckbox").checked){
		if(document.getElementById("toText").value.length > 0)
			url += "to=" + document.getElementById("toText").value + "&";
	}
	if(document.getElementById("subjectCheckbox").checked){
		if(document.getElementById("subjectText").value.length > 0)
			url += "subject=" + document.getElementById("subjectText").value + "&";
	}
	if(document.getElementById("contentCheckbox").checked){
		if(document.getElementById("contentText").value.length > 0)
			url += "content=" + document.getElementById("contentText").value + "&";
	}

	
	console.log(url);
	return url;
}

function showMailBlock(allMailData){
	//clear block view
	var panelDiv = document.getElementById("panelDiv")
	panelDiv.innerHTML = "";

	$.each(allMailData, function(index, value) {
    	createBlock(value);
	}); 

}

function createBlock(mailData){
	var panelDiv = document.getElementById("panelDiv")
	var html = panelDiv.innerHTML;
	html += '<div class="panel panel-info panel-custom"><div class="panel-heading">'+mailData.subject+ '</div><div class="panel-body">';

	html += "<p>";
	html += "<b>From: " + mailData.from[0].address + "</b><br>";
	html += "To: " + mailData.to[0].address + "<br>";
	html += mailData.date + "<br><br>";
	html += mailData.text + "<br>";
	html += "</p>";
	
	html += "</div></div>";
	panelDiv.innerHTML = html;
}
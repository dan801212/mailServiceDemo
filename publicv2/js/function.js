var LOCALHOST = "http://localhost:3000/"


function getMail(file){
	console.log("in")
	$.ajax({
		type: "GET",
		url: LOCALHOST + "inboxMail",
		contentType: "application/json",
		dataType: "json",
		success: function (response) {
			console.log(response[0]);
		},
		error: function(response) {
			console.log(response);
		}
	});
}
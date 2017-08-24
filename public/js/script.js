/**
 * Created by Yang on 2017/8/22.
 */
var jsonData='[{"id": ["2dsd","sd"]},{"id":2}]';//example
function addTableRow(jsonNum) {//jsonNum indicates index of email
    var Table = document.getElementById("mail_list");
    NewRow = Table.insertRow();
    NewCell1 = NewRow.insertCell();
    NewCell2 = NewRow.insertCell();
    NewCell3 = NewRow.insertCell();
    //alert(jsonData[jsonNum].headers.From);
    //NewCell1.width = "30%";
    //NewCell2.width = "40%";
    //NewCell3.width = "30%";
    NewCell1.innerHTML = "<span onclick='refreshSingleView("+jsonNum+")'>" + jsonData[jsonNum].headers.From + "</sapn>";
    NewCell2.innerHTML = "<span onclick='refreshSingleView("+jsonNum+")'>" + jsonData[jsonNum].headers.Subject + "</span>";
    NewCell3.innerHTML = "<span onclick='refreshSingleView("+jsonNum+")'>" + jsonData[jsonNum].headers.Date + "</span>";
    //var date = new Date();
    //date=Date.parse(jsonData[jsonNum].headers.Date);
    //alert(date.getDay);

}
function changeOfIllegels(str){
    str = str.replace(/>/,"&gt;");
    str = str.replace(/</,"&lt;");
    return str;
}
function refreshView(){
    //todo refresh data form server
    //..
    document.getElementById("mail_list").innerHTML="";
    refreshSingleView(0);
    for(i=0;i<jsonData.length;i++){
        addTableRow(i);
    }
}
function refreshSingleView(jsonNum){

    document.getElementById("name_from_view").innerHTML = changeOfIllegels(jsonData[jsonNum].headers.From);
    document.getElementById("name_to_view").innerHTML = changeOfIllegels(jsonData[jsonNum].headers.To);
    document.getElementById("subject_view").innerHTML = changeOfIllegels(jsonData[jsonNum].headers.Subject);
    //todo complete all elements of email relying on given json(#jsonData)
    //..

}
function httpRequest(type, data) {
    //type: "GET" "POST" "DELETE" "PUT" "TRACE" "HEAD" "OPTIONS"
    //todo url
    var url = "";
    if (type == "GET") {
        $.ajax({
            type: type,
            url: url,
            contentType: "application/json",
            async: false,//for updating jsonData
            dataType: "json", //type of return value
            success: function (response) {

            }
        });
    }
    else if (type == "POST") {
        $.ajax({
            type: type,
            url: url,
            contentType: "application/json",
            //async: false,
            dataType: "json", //type of return value
            data: JSON.stringify(data),
            success: function (response) {

            }
        });
    }
}
function localFileReader(){
    //todo request file from server & replace following local files
    //..httpRequest("GET","");

    var file = document.getElementById("file").files[0];
     var fileReader = new FileReader();
    var jsonStr="";
    //var json;
    fileReader.readAsText(file);
    fileReader.onload = function(){
        jsonStr=this.result;
        document.getElementById("Tshow").innerHTML = "<p>"+jsonStr+"</p>";
        jsonData = JSON.parse(jsonStr);
        //alert(jsonData[0].headers.From);
        //alert(json[1].id);


    }
}

function encapsulatedJson(){
    var to = document.getElementById("address_compose").value;
    var subject = document.getElementById("subject_compose").value;
    var contentHtml = document.getElementById('editor').innerHTML;
    //todo complete given json
    //..
    var json = {

    }
    httpRequest("POST",json);
}
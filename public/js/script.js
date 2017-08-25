/**
 * Created by Yang on 2017/8/22.
 */
var jsonData='[{"id": ["2dsd","sd"]},{"id":2}]';//example
var address_user,name_user;
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
    NewCell1.innerHTML = "<span onclick='refreshSingleView("+jsonNum+")'>" + jsonData[jsonNum].headers.from + "</sapn>";
    NewCell2.innerHTML = "<span onclick='refreshSingleView("+jsonNum+")'>" + jsonData[jsonNum].headers.subject + "</span>";
    NewCell3.innerHTML = "<span onclick='refreshSingleView("+jsonNum+")'>" + jsonData[jsonNum].headers.date + "</span>";

    //var date=Date.parse(jsonData[jsonNum].headers.date);
    //alert(date.getDay);

}
function changeOfIllegels(str){
    str = str.replace(/>/,"&gt;");
    str = str.replace(/</,"&lt;");
    return str;
}
function refreshView(){
    //todo refresh data form server
    //..localFileReader();
    document.getElementById("mail_list").innerHTML="";
    refreshSingleView(0);
    for(i=0;i<jsonData.length;i++){
        addTableRow(i);
    }
}
function refreshSingleView(jsonNum){
    //alert(jsonData[jsonNum].headers.from)
    document.getElementById("name_from_view").innerHTML = changeOfIllegels(jsonData[jsonNum].headers.from);
    document.getElementById("name_to_view").innerHTML = changeOfIllegels(jsonData[jsonNum].headers.to);
    document.getElementById("subject_view").innerHTML = changeOfIllegels(jsonData[jsonNum].headers.subject);
    document.getElementById("mail_body").innerHTML = jsonData[jsonNum].text;

}
function httpRequest(type, data) {
    //type: "GET" "POST" "DELETE" "PUT" "TRACE" "HEAD" "OPTIONS"
    //todo url of host address
    var url = "";
    if (type == "GET") {
        url = url + data;
        $.ajax({
            type: type,
            url: url,
            contentType: "application/json",
            async: false,//for updating jsonData
            dataType: "json", //type of return value
            success: function (response) {
                jsonData = response;
            }
        });
    }
    else if (type == "POST") {
        //todo url
        //url = "";
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
        //alert(jsonData[0].subject);
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
            "text": contentHtml,
            "headers": {
                "received": [
                    to
                ],
                "domainkey-signature": "a=rsa-sha1; q=dns; c=nofws; s=beta; d=gmail.com; h=received:message-id:date:organization:user-agent:x-accept-language:mime-version:to:subject:content-type:content-transfer-encoding:from; b=gpm3voIwDPQkrBmM4F9oBT+6XWW7XBakt9ho/9ZjgUrJ6/Wm/Wult6WESAKMRh474zN3xNOysqMoVP2MoVzgRLEuzbMvmnp+GDdNVJwOqJa7cPC7bUs9v+QUZH1fi+kOtZG7vT2AZrSYymR5Q7pUOL13C5LI1eyjTz0XDLn9Xbo=",
                "return-path": "<ashinpan@gmail.com>",
                "message-id": "<41FE7D90.3050509@gmail.com>",
                "date": Date.getData(),
                "organization": "World",
                "user-agent": "Mozilla Thunderbird 1.0 (Windows/20041206)",
                "x-accept-language": "en-us, en",
                "mime-version": "1.0",
                "to": to,
                "content-type": "text/plain; charset=ISO-8859-1; format=flowed",
                "content-transfer-encoding": "7bit",
                "from": user_address,
                "x-mailman-approved-at": "",
                "subject": subject,
                "x-beenthere": "",
                "x-mailman-version": "1.0",
                "precedence": "list",
                "list-id": "",
                "list-unsubscribe": "",
                "list-archive": "",
                "list-post": "",
                "list-help": "",
                "list-subscribe": "",
                "x-list-received-date": ""
            },
            "subject": subject,
            "messageId": "",
            "priority": "normal",
            "from": [
                {
                    "address": address_user,
                    "name": name_user
                }
            ],
            "to": [
                {
                    "address": to,
                    "name": to
                }
            ],
            "date": Date.getData(),
            "receivedDate": ""


    };
    httpRequest("POST",json);
}
function usrID(){
    name_user = document.getElementById("username").value;
    location.href = "index.html";
}
/**
 * Created by Yang on 2017/8/22.
 */
function AddTableRow(firstE,secondE,thirdE) {
    var Table = document.getElementById("mail_list");
    NewRow = Table.insertRow();
    NewCell1 = NewRow.insertCell();
    NewCell2 = NewRow.insertCell();
    NewCell3 = NewRow.insertCell();
    NewCell1.innerHTML = "<a href='#'>"+firstE+"</a>";
    NewCell2.innerHTML = "<a href='#'>"+secondE+"</a>";
    NewCell3.innerHTML = "<a href='#'>"+thirdE+"</a>";

}

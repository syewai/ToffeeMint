/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function approveLc() {
    //retrieve ref num;
    var refNum = getQueryVariable("refNum");
    //set status to "acknowledged"
    var status = "acknowledged";
    var contentObj = {
        Content: {
            status: status // to change to variable refNum
                    //mode: "BC"
        }
    };
    var content = JSON.stringify(contentObj);
    //update new status to bc
    $.ajax({
        type: 'GET',
        url: 'http://localhost:9001/lc/setStatus?refNum=' + refNum + '&status=' + content,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            //redirect to homepage
            //window.location.replace("/SMUtBank_TradeFinance/exporter/exporter.html");

        }

    });
}

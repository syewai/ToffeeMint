/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var apiUrlBC = getApiUrlBC();
var apiUrl = getApiUrl();

function getStatus(userId, PIN, OTP, refNum, callback) {
    
    var headerObj = {
        Header: {
            serviceName: "getStatus",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            referenceNumber: refNum,
            mode: "BC"
        }
    };
    var content = JSON.stringify(contentObj);
    $.ajax({
            async: false,
            url: apiUrlBC + "getStatus?Header=" + header + "&refNum=" + refNum,
            //dataType: "json",
            success: callback
        });
 
}

function setStatus(userId, PIN, OTP, refNum, status, callback) {

    var headerObj = {
        Header: {
            serviceName: "setStatus",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);
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
        url: apiUrlBC + 'setStatus?refNum=' + refNum + '&status=' + status,
        dataType: 'json',
        success: callback

    });
}


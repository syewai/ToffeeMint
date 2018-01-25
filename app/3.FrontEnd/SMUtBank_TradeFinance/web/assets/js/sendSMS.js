/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function sendSMS(action) {
    /* Step 1 - Get userid and userpin - stored in a session*/
    var userSession = sessionStorage.getItem('user');
    var user = $.parseJSON(userSession);
    var username = user.username;
    var pin = user.password;
    var usertype = user.usertype;
    
    

    /* Step 2 - Get mobile number - call get customer details service --> "cellphone"*/
    
    

    /*Step 3 - get action(e.g. approveLc)*/
    
    
    /*Step 4 - Get sender and bank
     user will be sender, get its userid and its bank id*/
    

    /*Step 5 - Get receiver's id and its bank id*/
    
    
    /*Step 6 - Fill in sms content
     * E.g. Sender has approved your LC (ref num - XXXXXX)*/

    var message = "";
    /*Step 7 - Call sendSMS web service*/
    var serviceName = "sendSMS";
    var userID = document.getElementById("userID").value;
    setUserID(userID);
    var PIN = document.getElementById("PIN").value;
    setUserID(PIN);

    var mobileNumber = doucment.getElementById();

    // set request parameters
    var headerObj = {
        Header: {
            serviceName: serviceName,
            userID: userID,
            PIN: PIN,
            OTP: OTP
        }
    };
    var contentObj = {
        Content: {
            mobileNumber: mobileNumber,
            message: message
        }
    };
    var header = JSON.stringify(headerObj);
    var content = JSON.stringify(contentObj);

    // setup http request
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp === null) {
        alert("Browser does not support HTTP request.");
        return;
    }
    xmlHttp.open("POST", getApiURL() + "?Header=" + header + "&Content=" + content, true);
    xmlHttp.timeout = 5000;

    // setup http event handlers
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            responseObj = JSON.parse(xmlHttp.responseText);
            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;
            if (globalErrorID === "010041") {
                showOTPModal();
                return;
            } else if (globalErrorID !== "010000") {
                showErrorModal(serviceRespHeader.ErrorDetails);
                return;
            }
        }
    };
    xmlHttp.ontimeout = function (e) {
        showErrorModal("Timeout invoking API.");
        return;
    };

}


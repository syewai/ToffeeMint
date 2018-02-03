/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var network = {};

network.lastVerificationID = "";

/*function doESB(callback, tagRoot, tagList, payload, extras, isAsync, verificationID) {
    if(verificationID != null) {
        network.lastVerificationID = verificationID;
        setTimeout(function() {network.lastVerificationID = "";}, 10000);
    }
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response;
            try {
                response = JSON.parse(xmlhttp.responseText);
            } catch(e) {
                console.log("Error parsing response from IBS");
                system.login.start();
                return;
            }
            if(response.status === "ok") {
                if(response.esbStatus === "Unknown, field not found") {
                    console.log("Service is currently unavaliable");
                } else if(response.esbStatus === "Service Verification: Missing verification parameters") {
                    //run 2fa verification
                    var transactionDetails = {
                            "callback" : callback,
                            "tagRoot" : tagRoot,
                            "tagList" : tagList,
                            "payload" : payload,
                            "extras" : extras,
                            "isAsync" : isAsync
                    };
                    verify.buildDiaglog(transactionDetails);
                } else if(response.esbStatus.indexOf("Service Verification") !== -1) {
                    response.status = "2FA verification failed, please try again or contact bank staff";
                    callback(response, extras);
                } else {
                    callback(response, extras);
                }
            } else {
                console.log("IBS internal error: " + response.status);
                system.login.start();
            }
        }
    };

    xmlhttp.open("POST", "../SMUtBank_IBS/ajaxESBService.action", isAsync);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
    xmlhttp.send('jsonRequest=' + encodeURIComponent(payload) + '&tagRoot=' + tagRoot + '&tagList=' + tagList + '&verificationID=' + network.lastVerificationID + '&channel=' + system.channelName);
};*/

/*function doIBS (callback, path, payload, extras, isAsync) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            //
            console.log("esb"+response.status);
            if(response.status === "ok") {
                callback(response, extras);
            } else {
                alert("Network error, unable to contact tBank IBS");
            }
        }
    };

    xmlhttp.open("POST", getIbsUrl() + path, isAsync);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('jsonRequest=' + payload + '&channel=' + getChannelName());
};*/

function doIBS(path,payload,callback){

    $.ajax({
        async: false,
        contentType: 'application/x-www-form-urlencoded',
        type: 'POST',
        url: getIbsUrl() + path+"?jsonRequest="+payload + '&channel=' + getChannelName(),
        dataType: 'json',
        success: callback  //fatal error!!
    });
}


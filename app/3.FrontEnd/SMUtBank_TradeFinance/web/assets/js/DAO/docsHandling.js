/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var apiUrl = getApiUrl();
var apiUrlBC = getApiUrlBC();
var apiEvents = getApiEvents();

async function uploadBOL(userId, PIN, OTP, refNum, billOfLadingURL, callback) {//importer

    var headerObj = {
        Header: {
            //serviceName: "modifyLetterOfCredit",
            serviceName: "uploadBillOfLading",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            referenceNumber: refNum,
            billOfLadingURL: billOfLadingURL,
            mode: "BC"
        }
    };
    var content = JSON.stringify(contentObj);
    
    let result;
    try {
        result = await $.ajax({
            type: "POST",
            url: apiUrl +
                "?Header=" +
                header +
                "&" +
                "Content=" +
                content +
                "&" +
                "ConsumerID=TF",
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

/*function getBOLUrl(userId, PIN, OTP, refNum, callback) {//importer

    var headerObj = {
        Header: {
            //serviceName: "modifyLetterOfCredit",
            serviceName: "getBillOfLadingURL",
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
        //async: false,
        type: 'POST',
        url: apiUrl+"?Header="+header+"&"+ "Content="+content+"&"+ "ConsumerID=TF",
        //type: 'GET',
        //url: apiUrlBC + "modifyContract?Header="+header+"&refNum=" + refNum + "&contract=" + content,
        dataType: 'json',
        success: callback

    });
}*/


async function getBOLUrl(userId, PIN, OTP, refNum, callback) {
    var headerObj = {
        Header: {
            //serviceName: "modifyLetterOfCredit",
            serviceName: "getBillOfLadingURL",
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
   
    let result;
    try {
        result = await $.ajax({
            url: apiUrl+"?Header="+header+"&"+ "Content="+content+"&"+ "ConsumerID=TF",
            type: 'POST',
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

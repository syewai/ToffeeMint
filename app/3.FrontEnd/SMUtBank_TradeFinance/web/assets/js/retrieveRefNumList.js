/* 
 * This script is used to retrive ref num list
 */
function returnRefNumList() {
    //for testing purpose
    if (true) {
        var apiURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway';
        //get refNum List
        //var apiURL = 'http://localhost:9001/lc/getContract';
        var headerObj = {
            Header: {
                serviceName: "getLetterOfCreditRefNumList",
                userID: "kinetic1",
                PIN: "123456",
                OTP: "999999"
            }
        };
        var header = JSON.stringify(headerObj);
        //var refNum = "00001";
        var contentObj = {
            Content: {
                importerID: "kinetic1"
            }

        };
        var content = JSON.stringify(contentObj);

        if (true) {

            var xmlHttp = new XMLHttpRequest();              //setup new http req
            if (xmlHttp === null) {
                alert("Browser does not support HTTP request."); //check for browser thingy
            }

            //xmlHttp.open("POST", apiURL + "?Header=" + header + "&ConsumerID=TF", true);
            xmlHttp.open("POST", apiURL + "?Header=" + header + "&Content=" + content + "&ConsumerID=TF", true);
            //xmlHttp.open("GET", apiURL + "?refNum="+refNum, true);
            // console.log(apiURL+"?Header="+header+"&Content="+content+"&ConsumerID=TF");
            xmlHttp.timeout = 5000;

            // setup http event handlers
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                    console.log(xmlHttp.responseText);
                    responseObj = JSON.parse(xmlHttp.responseText);

                    // globalErrorID = responseObj.Content.ServiceRespHeader.GlobalErrorID;
                    //when the gateway is ready 
                    // console.log(JSON.stringify(responseObj.Content.ServiceResponse["Trade_LC_Read-Response"].LC_record.LC_ID) );
                    if (true) {

                        var refNumList = responseObj.RefNumList.RefNum;
                        /* refNumList.sort(function (a, b) {
                         return compareStrings(a, b);
                         });*/
                        refNumList = refNumList.reverse();
                        return refNumList;
                        //sessionStorage.setItem('refNumList', JSON.stringify(refNumList));
                        //return refNumList;

                    }
                }
            };
            xmlHttp.ontimeout = function (e) {
                alert("Timeout retrieving document type list.");
                callback();
            };

            xmlHttp.send();

        }
    }
}

function loadRefNumList() {
    // set request parameters
    var apiUrl = 'http://smu.tbankonline.com/SMUtBank_API/Gateway';
    var headerObj = {
        Header: {
            serviceName: "getLetterOfCreditRefNumList",
            userID: "kinetic1",
            PIN: "123456",
            OTP: "999999"
        }
    };
    var header = JSON.stringify(headerObj);
    //var refNum = "00001";
    var contentObj = {
        Content: {
            importerID: "kinetic1"
        }

    };
    var content = JSON.stringify(contentObj);
    // setup http request
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp === null) {
        alert("Browser does not support HTTP request.");
        return;
    }
    xmlHttp.open("POST", apiUrl + "?Header=" + header + "&Content=" + content + "&ConsumerID=TF", true);
    xmlHttp.timeout = 5000;

    // setup http event handlers
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {

            responseObj = JSON.parse(xmlHttp.responseText);
            /*serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
             console.log("Header"+serviceRespHeader );
             globalErrorID = serviceRespHeader.GlobalErrorID;
             if (globalErrorID === "010000") {*/
            var refNums = responseObj.RefNumList.RefNum;

            if (refNums.length > 0) {
                return refNums;
            } else {
                alert("Error retrieving document type list.");
            }
            callback();
        }
    };
    xmlHttp.ontimeout = function (e) {
        alert("Timeout retrieving document type list.");
        callback();
    };

    // send the http request
    xmlHttp.send();
}

function getRefNumListAjax(callback) {
    var apiUrl = 'http://smu.tbankonline.com/SMUtBank_API/Gateway';
    var headerObj = {
        Header: {
            serviceName: "getLetterOfCreditRefNumList",
            userID: "kinetic1",
            PIN: "123456",
            OTP: "999999"
        }
    };
    var header = JSON.stringify(headerObj);
    //var refNum = "00001";
    var contentObj = {
        Content: {
            importerID: "kinetic1"
        }

    };
    var content = JSON.stringify(contentObj);
    $.ajax({
        async: false,
        type: 'GET',
        url: apiUrl + '?Header=' + header + '&Content=' + content,
        dataType: 'json',
        success: callback

    });

}






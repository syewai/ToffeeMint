/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function loadProductTypes() {
    // set request parameters
    var apiUrl = 'http://smu.tbankonline.com/SMUtBank_API/Gateway';
    var headerObj = {
        Header: {
            serviceName: "getProductTypes",
            userID: "",
            PIN: "",
            OTP: ""
        }
    };
    var header = JSON.stringify(headerObj);

    // setup http request
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp === null) {
        alert("Browser does not support HTTP request.");
        return;
    }
    xmlHttp.open("POST", apiUrl + "?Header=" + header, true);
    xmlHttp.timeout = 5000;

    // setup http event handlers
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            responseObj = JSON.parse(xmlHttp.responseText);
            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;
            if (globalErrorID === "010000") {
                var productTypes = responseObj.Content.ServiceResponse.ProductList.Product;
                return productTypes;
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


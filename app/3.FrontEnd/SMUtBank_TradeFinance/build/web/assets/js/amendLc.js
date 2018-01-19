/* 
 * This function will be handling data input/amendments from users, set status to requested to amend, redirecting to homepage
 * involved pagess - amendLcContent_1_1.html, modifyLcDetailsContent.html
 */

function amendLc(serviceName, parameter) {
    //retrive all data input
    //amendLc();
    var refNum = getQueryVariable("refNum");
    var amendments = {};

    $("input").each(function () {
        //elements.push(this.value);
        //console.log(this.name);
        if (this.value === "") {
            this.value = this.placeholder;
        }
        amendments[this.name] = this.value;
        //elements.push(this.value);
    });


    var headerObj = {
        Header: {
            serviceName: "amendLetterOfCredit",
            userID: "kinetic1",
            PIN: "123456",
            /*userID: "toffeemint",
             PIN: "toffeemint123",*/
            OTP: "999999"
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: amendments
    };
    var content = JSON.stringify(contentObj);
    // console.log(content);                             

    //var apiURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway' ;
    // var testURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway?Header={"Header":{"PIN":"123456","OTP":"999999","serviceName":"getLetterOfCreditRefNumList","userID":"kinetic1"}}&ConsumerID=TF';

    var apiURL = "http://localhost:9001/lc/"+serviceName;
    // console.log("heeey");
    var xmlHttp = new XMLHttpRequest();              //setup new http req
    if (xmlHttp === null) {
        alert("Browser does not support HTTP request."); //check for browser thingy
    }
    //var refNum = "";
//                xmlHttp.open("POST", apiURL+"?Header="+header+"&Content="+content+"&ConsumerID=TF", true);

    xmlHttp.open("GET", apiURL + "?refNum=" + refNum + "&"+parameter+"=" + content, true);
    xmlHttp.timeout = 5000;

    // setup http event handlers
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            // console.log(xmlHttp.responseText);
            responseObj = JSON.parse(xmlHttp.responseText);
            // serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            // globalErrorID = serviceRespHeader.GlobalErrorID;
            //refNum = responseObj.Content.ServiceResponse["LC_Details"].ref_num;
            console.log(refNum);
            //var refNumListOnBc = [];
            
            // callback();
        }
    };
    xmlHttp.ontimeout = function (e) {
        alert("Timeout retrieving document type list.");
        callback();
    };

    xmlHttp.send();
    //set status to "requested to amend"
    
    //redirect



}

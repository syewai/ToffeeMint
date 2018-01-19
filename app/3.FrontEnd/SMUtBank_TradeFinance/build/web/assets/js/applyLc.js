function applyLc() {

                var importerAccount = "2365";
                var exporterAccount = document.getElementById("exporterId").value;
                var expiryDate = document.getElementById("expiryDate").value;
                var confirmed = "false";
                var revocable = "false";
                var availableBy = "TERM";
                var termDays = "90";
                var amount = document.getElementById("amount").value;
                var currency = "SGD";
                var applicableRules = "none";
                var partialShipments = "false";
                var shipDestination = "London";
                var shipDate = "2017-12-12";
                var shipPeriod = "90 Days";
                var goodsDescription = document.getElementById("goodsDesc").value;
                var docsRequired = "none" ;
                var additionalConditions = document.getElementById("additonalConditions").value;
                var senderToReceiverInfo = "none";
                var mode = "BC";
               
                //applicationFormValidation();
                var headerObj = {
                    Header: {
                        serviceName: "applyLetterOfCredit",
                        userID: "kinetic1",
                        PIN: "123456",
                        OTP: "999999"
                    }
                };
                var header = JSON.stringify(headerObj);

                var contentObj = {
                    Content: {
                        importerAccount: importerAccount, 
                        exporterAccount: exporterAccount,
                        expiryDate: expiryDate,
                        confirmed: confirmed,
                        revocable: revocable,
                        availableBy: availableBy,
                        termDays: termDays,
                        amount: amount,
                        currency: currency,
                        applicableRules: applicableRules,
                        partialShipments: partialShipments,
                        shipDestination: shipDestination,
                        shipDate: shipDate,
                        shipPeriod: shipPeriod,
                        goodsDescription: goodsDescription,
                        docsRequired: docsRequired,
                        additionalConditions: additionalConditions,
                        senderToReceiverInfo: senderToReceiverInfo,
                        mode: mode
                    }
                };
                var content = JSON.stringify(contentObj);   
                // console.log(content);                             

                var apiURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway' ;
                // var testURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway?Header={"Header":{"PIN":"123456","OTP":"999999","serviceName":"getLetterOfCreditRefNumList","userID":"kinetic1"}}&ConsumerID=TF';

                    // console.log("heeey");
                var xmlHttp = new XMLHttpRequest();              //setup new http req
                if (xmlHttp === null){
                    alert("Browser does not support HTTP request."); //check for browser thingy
                }
                var refNum = "";
                xmlHttp.open("POST", apiURL+"?Header="+header+"&Content="+content+"&ConsumerID=TF", true);
                xmlHttp.timeout = 5000;

                // setup http event handlers
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                        // console.log(xmlHttp.responseText);
                        responseObj = JSON.parse(xmlHttp.responseText);
                        // serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                        // globalErrorID = serviceRespHeader.GlobalErrorID;
                        refNum = responseObj.Content.ServiceResponse["LC_Details"].ref_num;
                        console.log(refNum);
                        //window.location = "/SMUtBank_TradeFinance/importer/importer.html";
                        
            
                        // callback();
                    }
                };
                xmlHttp.ontimeout = function (e) {
                    alert ("Timeout retrieving document type list.");
                    callback();
                };      

                xmlHttp.send();

}

function applyLcBc(refNumber) {

    //$(document).ready(function() {
            //$("#create_button_bc").click(function(){
             //for (var i = 0; i <=1; i++){
                //applicationFormValidation();
                var refNum = parseInt(refNumber); 
                //refNum += 1;
               
                var importerAccount = "2365";
                var exporterAccount = document.getElementById("exporterId").value;
                var expiryDate = document.getElementById("expiryDate").value;
                var confirmed = "false";
                var revocable = "false";
                var availableBy = "TERM";
                var termDays = "90";
                var amount = document.getElementById("amount").value;
                var currency = "SGD";
                var applicableRules = "none";
                var partialShipments = "false";
                var shipDestination = "London";
                var shipDate = "2017-12-12";
                var shipPeriod = "90 Days";
                var goodsDescription = document.getElementById("goodsDesc").value;
                var docsRequired = "none" ;
                var additionalConditions = document.getElementById("additonalConditions").value;
                var senderToReceiverInfo = "none";
                var mode = "BC";
                
                var headerObj = {
                    Header: {
                        serviceName: "applyLetterOfCredit",
                        userID: "kinetic1",
                        PIN: "123456",
                        /*userID: "toffeemint",
                        PIN: "toffeemint123",*/
                        OTP: "999999"
                    }
                };
                var header = JSON.stringify(headerObj);

                var contentObj = {
                    Content: {
                        importerAccount: importerAccount, 
                        exporterAccount: exporterAccount,
                        expiryDate: expiryDate,
                        confirmed: confirmed,
                        revocable: revocable,
                        availableBy: availableBy,
                        termDays: termDays,
                        amount: amount,
                        currency: currency,
                        applicableRules: applicableRules,
                        partialShipments: partialShipments,
                        shipDestination: shipDestination,
                        shipDate: shipDate,
                        shipPeriod: shipPeriod,
                        goodsDescription: goodsDescription,
                        docsRequired: docsRequired,
                        additionalConditions: additionalConditions,
                        senderToReceiverInfo: senderToReceiverInfo,
                        mode: mode
                    }
                };
                var content = JSON.stringify(contentObj);   
                // console.log(content);                             

                //var apiURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway' ;
                // var testURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway?Header={"Header":{"PIN":"123456","OTP":"999999","serviceName":"getLetterOfCreditRefNumList","userID":"kinetic1"}}&ConsumerID=TF';
                
                var apiURL = "http://localhost:9001/lc/createContract";
                    // console.log("heeey");
                var xmlHttp = new XMLHttpRequest();              //setup new http req
                if (xmlHttp === null){
                    alert("Browser does not support HTTP request."); //check for browser thingy
                }
                //var refNum = "";
//                xmlHttp.open("POST", apiURL+"?Header="+header+"&Content="+content+"&ConsumerID=TF", true);
                
                xmlHttp.open("GET", apiURL+"?refNum="+refNum+"&contract="+content, true);
                xmlHttp.timeout = 5000;

                // setup http event handlers
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                        // console.log(xmlHttp.responseText);
                        responseObj = JSON.parse(xmlHttp.responseText);
                        // serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                        // globalErrorID = serviceRespHeader.GlobalErrorID;
                        //refNum = responseObj.Content.ServiceResponse["LC_Details"].ref_num;
                        console.log(refNum);
                        //var refNumListOnBc = [];
                        
                        
                        window.location.replace("/SMUtBank_TradeFinance/importer/importer.html");
                        
                        // callback();
                    }
                };
                xmlHttp.ontimeout = function (e) {
                    alert ("Timeout retrieving document type list.");
                    callback();
                };      

                xmlHttp.send();

            //}


            //});
        //});
}
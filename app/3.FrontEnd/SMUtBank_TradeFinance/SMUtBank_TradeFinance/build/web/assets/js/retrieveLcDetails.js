/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 function retrieveLc(){

            var refNum = getQueryVariable("refNum");
            var refNumInt = parseInt(refNum);
            var LC_ID = "";
            var exporter_ID = "";
            var exporter_account_num = "";

            var goods_description = "";
            var amount = "";
            var expiry_date = "";
            var additional_conditions = "";

            if(refNum !== "" ){
                //var apiURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway';
                var apiURL = 'http://localhost:9001/lc/getContract';
                // var testURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway?Header={"Header":{"PIN":"123456","OTP":"999999","serviceName":"getLetterOfCreditRefNumList","userID":"kinetic1"}}&ConsumerID=TF';
                // var role = document.getElementByID("role").value;

                var headerObj = {
                    Header: {
                        serviceName: "getLetterOfCredit",
                        userID: "kinetic1",
                        PIN: "123456",
                        OTP: "999999"
                    }
                };
                var header = JSON.stringify(headerObj);

                var contentObj = {
                    Content: {
                        referenceNumber: refNum, // to change to variable refNum
                        mode: "BC"
                    }
                };
                var content = JSON.stringify(contentObj);

                if (true){

                    var xmlHttp = new XMLHttpRequest();              //setup new http req
                    if (xmlHttp === null){
                        alert("Browser does not support HTTP request."); //check for browser thingy
                    }

                    //xmlHttp.open("POST", apiURL+"?Header="+header+"&Content="+content+"&ConsumerID=TF", true);
                    xmlHttp.open("GET", apiURL+"?refNum="+refNumInt+"&ConsumerID=TF", true);
                    // xmlHttp.open("POST", testURL, true);
                    // console.log(apiURL+"?Header="+header+"&Content="+content+"&ConsumerID=TF");
                    xmlHttp.timeout = 5000;

                    // setup http event handlers
                    xmlHttp.onreadystatechange = function() {
                        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                            // console.log(xmlHttp.responseText);
                            responseObj = JSON.parse(xmlHttp.responseText);
                            // globalErrorID = responseObj.Content.ServiceRespHeader.GlobalErrorID;
                            //when the gateway is ready 
                            // console.log(JSON.stringify(responseObj.Content.ServiceResponse.LC_Details.LC_record.LC_ID) );
                            if (true){
                                 //fields = responseObj.Content.ServiceResponse.LC_Details.LC_record;
                                 fields = responseObj.Content;
                                 console.log(fields);
                                    /*var headerVariables = ["ref_num","status","creation_datetime"];
                                    var refNum = fields[headerVariables[0]];
                                    var status = fields[headerVariables[1]];
                                    var dateSubmitted = fields[headerVariables[2]];
                                    $('#refNum').html(refNum);
                                    $('#status').html(status);
                                    $('#dateSubmitted').html(dateSubmitted);*/
                                    for (var i in fields) {

                                        var isCounted = false;
                                        /*for (var j in headerVariables){

                                            if (i === headerVariables[j]){
                                                isCounted = true;
                                            }
                                        }*/
                                        if(!isCounted){

                                            var lcDetailsHTML = "<label class='col-lg-2 control-label lc-label'>" + i + "</label>";
                                            lcDetailsHTML += "<div class='col-lg-10 font-bold' id='lcValue'><p id='" + i + "'></p>"+fields[i];
                                            lcDetailsHTML += "</div><input style='display:none' id='input' type='text' name ="+i+" data-required='true' placeholder='"+fields[i]+"'>";
                                            
                                            $("#lcDetails").append("<div class='form-group lc-form'>" + lcDetailsHTML + "</div>");
                                            $("#lcDetails").append("<div class='line line-dashed line-lg pull-in'></div>");

                                        }
                                    }
                                    
                                
                            }
                            else {
                                
                            }

                        }
                    };
                    xmlHttp.ontimeout = function (e) {
                        alert ("Timeout retrieving document type list.");
                        callback();
                    };      

                    xmlHttp.send();

                }
            }
}


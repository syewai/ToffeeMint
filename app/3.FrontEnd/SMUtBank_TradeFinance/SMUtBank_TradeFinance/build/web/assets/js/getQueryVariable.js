function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      } 
      alert('Query Variable ' + variable + ' not found');
    }

            var refNum = getQueryVariable("refNum");
            var LC_ID = "";
            var exporter_ID = "";
            var exporter_account_num = "";

            var goods_description = "";
            var amount = "";
            var expiry_date = "";
            var additional_conditions = "";

            if(refNum !== "" ){
                var apiURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway';
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

                    xmlHttp.open("POST", apiURL+"?Header="+header+"&Content="+content+"&ConsumerID=TF", true);
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
                                exporter_ID = responseObj.Content.ServiceResponse.LC_Details.LC_record.exporter_ID;
                                exporter_account_num = responseObj.Content.ServiceResponse.LC_Details.LC_record.exporter_account_num;
                                goods_description = responseObj.Content.ServiceResponse.LC_Details.LC_record.goods_description;
                                amount = responseObj.Content.ServiceResponse.LC_Details.LC_record.amount;
                                expiry_date = responseObj.Content.ServiceResponse.LC_Details.LC_record.expiry_date;
                                additional_conditions = responseObj.Content.ServiceResponse.LC_Details.LC_record.additional_conditions;

                                $('#exporter_ID').html(exporter_ID);
                                $('#exporter_account_num').html(exporter_account_num);
                                $('#goods_description').html(goods_description);
                                $('#expiry_date').html(expiry_date);
                                $('#additional_conditions').html(additional_conditions);
                                $('#amount').html(amount);
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


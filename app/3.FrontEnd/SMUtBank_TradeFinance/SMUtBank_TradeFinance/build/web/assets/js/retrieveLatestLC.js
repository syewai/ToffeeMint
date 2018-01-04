function compareStrings(a, b) {
                  // Assuming you want case-insensitive comparison
                a = a.toLowerCase();
                b = b.toLowerCase();

                return (a < b) ? -1 : (a > b) ? 1 : 0;
            }
function operationAndUrlAssigned(status){
    //this function is to map the operation and url to coresponding status
    var operationMatches = {"submitted": ["view lc","lcDetails"], "issued": ["view lc","lcDetails"], "rejected": ["modify","modifyLcDetails"],"advised":"", "accepted":"","requested to amend":["modify","modifyLcDetails"]}; 
    return operationMatches[status];
    
}

function buttonAssigned(status) { // this method is to assign button color (by adding class name to the button element) based on status 
    var element, name, arr;
    element = document.getElementById("lcDetails");
    if (status === "rejected" || status === "requested to amend"){ 
        name = "btn-danger";  
    } else {
        name = "btn-primary";
    }
    arr = element.className.split(" ");
    if (arr.indexOf(name) == -1) {
          element.className += " " + name;
    }
       
}

            if(true){
                var apiURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway';
                // var testURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway?Header={"Header":{"PIN":"123456","OTP":"999999","serviceName":"getLetterOfCreditRefNumList","userID":"kinetic1"}}&ConsumerID=TF';

                // var role = document.getElementByID("role").value;

                var headerObj = {
                    Header: {
                        serviceName: "getLetterOfCreditRefNumList",
                        userID: "kinetic1",
                        PIN: "123456",
                        OTP: "999999"
                    }
                };
                var header = JSON.stringify(headerObj);

                if (true){

                    var xmlHttp = new XMLHttpRequest();              //setup new http req
                    if (xmlHttp === null){
                        alert("Browser does not support HTTP request."); //check for browser thingy
                    }

                    xmlHttp.open("POST", apiURL+"?Header="+header+"&ConsumerID=TF", true);
                    // console.log(apiURL+"?Header="+header+"&Content="+content+"&ConsumerID=TF");
                    xmlHttp.timeout = 5000;

                    // setup http event handlers
                    xmlHttp.onreadystatechange = function() {
                        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                            console.log(xmlHttp.responseText);
                            responseObj = JSON.parse(xmlHttp.responseText);

                            // globalErrorID = responseObj.Content.ServiceRespHeader.GlobalErrorID;
                            //when the gateway is ready 
                            // console.log(JSON.stringify(responseObj.Content.ServiceResponse["Trade_LC_Read-Response"].LC_record.LC_ID) );
                            if (true){
                                var refNumList = responseObj.RefNumList.RefNum;
                                refNumList.sort(function(a, b) {
                                  return compareStrings(a, b);
                                })
                                refNumList = refNumList.reverse();
                                for (i = 0; i < 5; i++) {
                                    //call websrevice and get lc details for each ref number 
                                    var refNum = refNumList[i];
                                    var link = "localhost:9001/lc/getContract?refNum="+refNum;
                                    $.getJSON(link).done(function(data){
                                        //get adv bank as 2nd col 
                                    //get date submitted as 3rd col
                                    //get status as 4th col
                                        
                                        
                                        var operationAndUrl = operationAndUrlAssigned(data.status);
                                        var operation = operationAndUrl[0];
                                        var url = operationAndUrl[1];
                                        var href = "/SMUtBank_TradeFinance/importer/"+url+".html?refNum="+refNum;
                                        var button = "<a type='button' id='lcDetails' class='btn btn-s-md' href='"+href+"'>"+operation+"</a> ";
                                        button = buttonAssigned(data.status);
                                        var trHTML = '<tr><td>' + data.refNum + '</td><td>' + data.exporterAccount + '</td><td>' + data.dateSubmitted + '</td><td>' + data.status + '</td><td>' + button + '</td></tr>';
                                        $('#latestLCs').append(trHTML);
                                      });
                    
                                    //

                                }
                                
                                
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
            

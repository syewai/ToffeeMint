function compareStrings(a, b) {
                  // Assuming you want case-insensitive comparison
                a = a.toLowerCase();
                b = b.toLowerCase();

                return (a < b) ? -1 : (a > b) ? 1 : 0;
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
                                console.log(refNumList);
                                $('#0').html(refNumList[0]);
                                $('#1').html(refNumList[1]);
                                $('#2').html(refNumList[2]);
                                $('#3').html(refNumList[3]);
                                $('#4').html(refNumList[4]);


                                $('#button1').click(function(e) {  
                                    var inputvalue = $("#input").val();
                                    window.location.replace("/SMUtBank_TradeFinance/lcDetails.html?refNum="
                                        +refNumList[0]
                                        );

                                });

                                $('#button2').click(function(e) {  
                                    var inputvalue = $("#input").val();
                                    window.location.replace("/SMUtBank_TradeFinance/lcDetails.html?refNum="
                                        +refNumList[1]
                                        );

                                });


                                $('#button3').click(function(e) {  
                                    var inputvalue = $("#input").val();
                                    window.location.replace("/SMUtBank_TradeFinance/lcDetails.html?refNum="
                                        +refNumList[2]
                                        );

                                });


                                $('#button4').click(function(e) {  
                                    var inputvalue = $("#input").val();
                                    window.location.replace("/SMUtBank_TradeFinance/lcDetails.html?refNum="
                                        +refNumList[3]
                                        );

                                });

                                $('#button5').click(function(e) {  
                                    var inputvalue = $("#input").val();
                                    window.location.replace("/SMUtBank_TradeFinance/lcDetails.html?refNum="
                                        +refNumList[4]
                                        );

                                });

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

/*This script is used 
 * 
 * 1. In homepage, to retreive latest 5 LCs from blockchain. (Calling Alan's API --> Get ref num list)
 * 2. Map Status with its corresponding Operation and page while clicking the button. (e.g. if status = "Requested to amend", 
 *     -->  operation = "modify", redirecting page = "modifyLcDetails.html")
 * 3. Map button color with specific status --> (Rejected OR requested to amend --> red color button --> "btn-danger")
 * 4. Extract 1) Ref num, 2) Advising bank(not stored yet), 3) Date Submitted, 4)Status 5) Assigned Button and Operation as table columns,
 * write data in homepage table
 * 
 * */

function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}
function operationAndUrlAssigned(status) {
    //this function is to map the operation and url to coresponding status
    var operationMatches = {"pending": ["view lc", "lcDetails"], "issued": ["view lc", "lcDetails"], "rejected": ["modify", "modifyLcDetails"], "advised": "", "accepted": "", "requested to amend": ["modify", "modifyLcDetails"]};
    return operationMatches[status];

}

function totalLcs(){
    
}
function buttonAssigned(status) { // this method is to assign button color (by adding class name to the button element) based on status 
    //var element, name, arr;
    //element = document.getElementById("lcDetails");
    var name ="btn-primary";
    var text = "text-primary";
    if (status === "rejected" || status === "requested to amend") {
        name = "btn-danger";
        text = "text-danger";
    } 
    return [name,text];
    /*$(".btn").addClass(name);
    $(".status").addClass(text);*/
    //return [name, text];
    
    //var d = document.getElementById("lcDetails");
    //d.className += " "+name;

}
//this function is to put lc that requires action(rejected/requested to amend) at the top of the list
function rearrangePosition(e) {

}

/*function retrieveLcs(num) {
    
    //for testing purpose
    if (true) {
        //var refNum = 00000000;
        var refNumList = [];
        if(sessionStorage.getItem('refNumListOnBC') !== null){
            var refNumString = sessionStorage.getItem('refNumListOnBC');
            var refNumJson = $.parseJSON(refNumString);
            //var latestRefNum = refNumJson[0];
            //refNum = parseInt(latestRefNum);
            for (var x in refNumJson){
                refNumList.push(refNumJson[x]);
            }
           
        }
        console.log("ref num list");
        console.log(sessionStorage.getItem('refNumListOnBC'));
        console.log(refNumList);
        if (refNumList.length !== 0){
            if (refNumList.length < num){
                num = refNumList.length;
            }
            console.log("done");
            for (i = 0; i < num; i++) {
                var refNum = refNumList[i];
            //var apiURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway';
                var apiURL = 'http://localhost:9001/lc/getContract';
                var headerObj = {
                    Header: {
                        serviceName: "getLetterOfCredit",
                        userID: "kinetic1",
                        PIN: "123456",
                        OTP: "999999"
                    }
                };
                var header = JSON.stringify(headerObj);
                //var refNum = "00001";

                if (true) {
                    var xmlHttp = new XMLHttpRequest();              //setup new http req
                    if (xmlHttp === null) {
                        alert("Browser does not support HTTP request."); //check for browser thingy
                    }

                    //xmlHttp.open("POST", apiURL + "?Header=" + header + "&ConsumerID=TF", true);
                    xmlHttp.open("GET", apiURL + "?refNum="+refNum, true);
                    // console.log(apiURL+"?Header="+header+"&Content="+content+"&ConsumerID=TF");
                    xmlHttp.timeout = 5000;
                     // setup http event handlers
                    xmlHttp.onreadystatechange = function () {
                        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                            console.log(xmlHttp.responseText);
                            responseObj = JSON.parse(xmlHttp.responseText);
                            if (true) {
                                var statusLink = "http://localhost:9001/lc/getStatus?refNum="+refNum;
                                console.log(responseObj);
                                //get exporter;
                                var exporter = responseObj.Content.exporterAccount;
                                console.log(exporter);
                                //get date submiited;
                                var expiryDate = responseObj.Content.expiryDate;
                                console.log(expiryDate);
                                //  status
                                var status = "pending";
                                $.ajax({
                                    type: 'GET',
                                    url: statusLink,
                                    dataType: 'json',
                                    success: function(data){
                                        console.log(data);  
                                    }
                                    
                                });
                                //console.log(status);
                                //write in html
                                    var operationAndUrl = operationAndUrlAssigned(status);
                                    //var operationAndUrl = "";
                                    //get operation 
                                    var operation = operationAndUrl[0];
                                    //var operation="";
                                    //get url
                                    var url = operationAndUrl[1];
                                    //var url="";


                                    var button = "<a type='button' id='"+url+"' class='pages btn btn-s-md' href='"+url+".html?refNum="+refNum+"'>" + operation.charAt(0).toUpperCase() + operation.slice(1) + "</a> ";

                                    var trHTML = "<tr><td class='refNum'>" + refNum + '</td><td>' + exporter + '</td><td>'+expiryDate+'</td><td class="status font-bold">' + status.charAt(0).toUpperCase() + status.slice(1) + '</td><td>' + button + '</td></tr>';
                                    $('#latestLCs').append(trHTML);
                                    $("td").css("text-align","center");
                                    $("th").css("text-align","center");
                                    buttonAssigned(status);
                                //

                            }
                            console.log("testing");

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

    }
    
}*/

function retrieveLcsBC(num) {
    returnRefNumList();
    var temp = sessionStorage.getItem('refNumList');
    var viewName = $.parseJSON(temp);
    //var refNum = viewName[0];
    var lcDetails = {};
    console.log(viewName);
    var items = [];
    var statusList = ["pending","requested to modify","issued","rejected"];
    for (i = 0; i < num; i++) {
        //call web service to get lc details for each ref number 
        
        var refNum = viewName[i];
        
        var refNumInt = parseInt(refNum);
        
        var getContractLink = "http://localhost:9001/lc/getContract?refNum=" + refNumInt;
        var getStatusLink = "http://localhost:9001/lc/getStatus?refNum=" + refNumInt;
        var status = statusList[i];
        console.log(status);
        /*$.get(getStatusLink).done(function (data) {
            status = data;
            //retreive json string
            
        });*/
        var $refNumInt = refNumInt; 
        console.log($refNumInt);
        var refList = [];
        refList.push($refNumInt);
        $.getJSON(getContractLink).done(function (data) {
              console.log(refList);
              var $row = $('<tr></tr>');
              console.log(status);
              //var status = data.Content.status;
              var exporterAcct = data.Content.exporterAccount;
              var expiryDate = data.Content.expiryDate;
              var operationAndUrl = operationAndUrlAssigned(status);
              console.log(operationAndUrl);
                            //get operation 
              var operation = operationAndUrl[0];
              console.log(operation);
                            //get url
              var url = operationAndUrl[1];
              var href = "/SMUtBank_TradeFinance/importer/" + url + ".html?refNum=" + refNumInt;
              var $button = $("<a type='button' id='lcDetails' class='btn btn-s-md' href='" + href + "'>" + operation + "</a> ");
              $button.addClass(buttonAssigned(status)[0]);
              
              var $refNumCell = $('<td></td>');
              $refNumCell.append($refNumInt);
              $row.append($refNumCell);
              
              var $exporterAcctCell = $('<td>'+exporterAcct+'</td>');
              $row.append($exporterAcctCell);
              var $expiryDateCell = $('<td>'+expiryDate+'</td>');
              $row.append($expiryDateCell);

              var $statusCell = $('<td id="status" class="font-bold">'+status+'</td>');
              $statusCell.addClass(buttonAssigned(status)[1]);
              $row.append($statusCell);
              
              var $buttonCell = $('<td></td>');
              $buttonCell.append($button);
              $row.append($buttonCell);
              
              $('#latestLCs').append($row);
               
                //var trHTML = "<tr><td>" + refNumInt + "</td><td>" + exporterAcct + "</td><td>" + expiryDate + "</td><td id='status' class='font-bold'>" + status+ "</td><td>" + button + "</td></tr>";*/
               
                //var name = buttonAssigned(status);
                //$('#latestLCs').append(items);
               
                
             });

        /*var status = "";
        $.get(getStatusLink).done(function (data) {
            status = data;
            //retreive json string
            
        });*/
        
        
     }
}


/*function retrieveLcs(num) {
    if (true) {
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

        xmlHttp.open("POST", apiURL + "?Header=" + header + "&Content="+content+"&ConsumerID=TF", true);
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
                    refNumList.sort(function (a, b) {
                        return compareStrings(a, b);
                    });
                    refNumList = refNumList.reverse();
                    //take top 5 ref nums
                    for (i = 0; i < num; i++) {
                        //call web service to get lc details for each ref number 
                        var refNum = refNumList[i];
                        var getContractLink = "http://localhost:9001/lc/getContract?refNum=" + refNum;
                        //var getStatusLink = "http://localhost:9001/lc/getStatus?refNum=" + refNum;
                        //retreive json string
                        $.getJSON(getContractLink).done(function (data) {
                            //call operation and url assigned to Assign operation and url, based on status.
                            var operationAndUrl = operationAndUrlAssigned(data.status);
                            //get operation 
                            var operation = operationAndUrl[0];
                            //get url
                            var url = operationAndUrl[1];
                            //var href = "/SMUtBank_TradeFinance/importer/" + url + ".html?refNum=" + refNum;
                            
                            var button = "<a type='button' id='lcDetails' class='btn btn-s-md' href='" + href + "'>" + operation + "</a> ";
                            button = buttonAssigned(data.status);
                            var trHTML = '<tr><td>' + refNum + '</td><td>' + data.exporterAccount + '</td><td>' + data.dateSubmitted + '</td><td>' + data.status + '</td><td>' + button + '</td></tr>';
                            $('#latestLCs').append(trHTML);
                        });

                    }

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
    
    
}*/

//main function --> retrieve latest 5 ref nums
/*
if (true) {
    //var apiURL = 'http://smu.tbankonline.com/SMUtBank_API/Gateway';
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

    if (true) {

        var xmlHttp = new XMLHttpRequest();              //setup new http req
        if (xmlHttp === null) {
            alert("Browser does not support HTTP request."); //check for browser thingy
        }

        xmlHttp.open("POST", apiURL + "?Header=" + header + "&ConsumerID=TF", true);
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
                    refNumList.sort(function (a, b) {
                        return compareStrings(a, b);
                    })
                    refNumList = refNumList.reverse();
                    //take top 5 ref nums
                    for (i = 0; i < 5; i++) {
                        //call web service to get lc details for each ref number 
                        var refNum = refNumList[i];
                        var link = "localhost:9001/lc/getContract?refNum=" + refNum;
                        //retreive json string
                        $.getJSON(link).done(function (data) {
                            //call operation and url assigned to Assign operation and url, based on status.
                            var operationAndUrl = operationAndUrlAssigned(data.status);
                            //get operation 
                            var operation = operationAndUrl[0];
                            //get url
                            var url = operationAndUrl[1];
                            var href = "/SMUtBank_TradeFinance/importer/" + url + ".html?refNum=" + refNum;
                            
                            var button = "<a type='button' id='lcDetails' class='btn btn-s-md' href='" + href + "'>" + operation + "</a> ";
                            button = buttonAssigned(data.status);
                            var trHTML = '<tr><td>' + refNum + '</td><td>' + data.exporterAccount + '</td><td>' + data.dateSubmitted + '</td><td>' + data.status + '</td><td>' + button + '</td></tr>';
                            $('#latestLCs').append(trHTML);
                        });

                        //

                    }

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

*/



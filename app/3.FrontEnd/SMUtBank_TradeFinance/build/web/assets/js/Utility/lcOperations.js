
var getUserItem = sessionStorage.getItem('user');
var user = $.parseJSON(getUserItem);
var userId = "kinetic1";
var PIN = "123456";
var OTP = "999999";
var usertype = user.usertype;
//this function handle the ui logic of apply lc page
function applyLcOperation() {
    console.log("try variable usertype");
    console.log(usertype);
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
    var shipDestination = document.getElementById("country").value;
    ;
    var shipDate = document.getElementById("expiryDate").value; // for testing purpose, Remember to change it!!
    var shipPeriod = "90 Days";
    var goodsDescription = document.getElementById("goodsDesc").value;
    var docsRequired = "none";
    var additionalConditions = document.getElementById("additonalConditions").value;
    var senderToReceiverInfo = "none";
    var mode = "BC";
    var lc = {
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
    };
    //Apply lc by using Alan's API(without refNum)
    applyLcApi(userId, PIN, OTP, lc, function (data) { //calling this method from assets/js/DAO/lcHandling.js
        console.log(data);
    });
    //Apply Lc by using blockchain
    //1. Get the first refNum in the ref num list -  only used for block chain
    var refNum;
    getRefNumList(//calling this method from assets/js/DAO/lcHandling.js
            userId, PIN, OTP, function (refNumList) {
                refNum = refNumList.RefNumList.RefNum[0];
            });
    console.log(refNum);
    var refNumber = parseInt(refNum);
    //2. Call applyLc method to apply lc
    applyLc(userId, PIN, OTP, refNumber, lc, function (data) { //calling this method from assets/js/DAO/lcHandling.js
        console.log(data);
    });
    //After completing both applying lc from Alan's API and bc, page will be redirected to homepage.
    window.location.replace("/SMUtBank_TradeFinance/importer/importer.html");
}

//this function handles ui logic of homepage
function homeOperation() {
    var refNumberList;
    getRefNumList(//calling this method from assets/js/DAO/lcHandling.js
            userId, PIN, OTP, function (refNumList) {
                refNumberList = refNumList.RefNumList.RefNum;
            });
    console.log(refNumberList);
    var numOfRows = 5;
    for (var i = 0; i < numOfRows; i++) {
//call web service to get lc details for each ref number 

        var refNum = refNumberList[i];
        var refNumInt = parseInt(refNum);
        //get status of the ref num
        //getStatus(userId, PIN, OTP, refNum, callback)
        var status = "";
        getStatus(userId, PIN, OTP, refNumInt, function (data) {
            status = data;
        });
        if (status !== "") {
//get contract of the ref num
            var exporterAcct = "";
            var expiryDate = "";
            getLcDetails(userId, PIN, OTP, refNumInt, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
                if (contract !== "") {
                    exporterAcct = contract.Content.exporterAccount;
                    expiryDate = contract.Content.expiryDate;
                }

            });
            //get operation of the status
            var operations = operationMatch(status, usertype); //calling this method from utility/operationMatch.js

            var operation = operations[0];
            var url = operations[1];
            var $row = $('<tr></tr>');
            var href = "/SMUtBank_TradeFinance/" + usertype + "/" + url + ".html?action=" + url + "&refNum=" + refNumInt;
            var $button = $("<a type='button' id='lcDetails' class='btn btn-s-md' href='" + href + "'>" + operation + "</a> ");
            $button.addClass(buttonAssigned(status)[0]);
            var $refNumCell = $('<td></td>');
            $refNumCell.append(refNumInt);
            $row.append($refNumCell);
            var $exporterAcctCell = $('<td>' + exporterAcct + '</td>');
            $row.append($exporterAcctCell);
            var $expiryDateCell = $('<td>' + expiryDate + '</td>');
            $row.append($expiryDateCell);
            var $statusCell = $('<td id="status" class="font-bold">' + status + '</td>');
            $statusCell.addClass(buttonAssigned(status)[1]);
            $row.append($statusCell);
            var $buttonCell = $('<td></td>');
            $buttonCell.append($button);
            $row.append($buttonCell);
            $('#latestLCs').append($row);
        }


    }
}

//this function handles ui logic of homepage
function shipperHomeOperation(lcToBePrinted) {
    if (lcToBePrinted.length > 0) {
        for (var i in lcToBePrinted) {
            
            var url = lcToBePrinted[i]["url"];
            var operation = lcToBePrinted[i]["operation"];
            var refNum = lcToBePrinted[i]["refNum"];
            var status=lcToBePrinted[i]["status"];
            var country=lcToBePrinted[i]["country"];
            var shipDate=lcToBePrinted[i]["shipDate"];
            var exporterAcct=lcToBePrinted[i]["exporter"];
            
            var $row = $('<tr></tr>');
            var href = "/SMUtBank_TradeFinance/" + usertype + "/" + url + ".html?action=" + url + "&refNum=" + refNum;
            var $button = $("<a type='button' id='lcDetails' class='btn btn-s-md' href='" + href + "'>" + operation + "</a> ");
            $button.addClass(buttonAssigned(status)[0]);
            
            var $refNumCell = $('<td></td>');
            $refNumCell.append(refNum);
            $row.append($refNumCell);
            
            var $countryCell = $('<td>' + country + '</td>');
            $row.append($countryCell);

            var $exporterAcctCell = $('<td>' + exporterAcct + '</td>');
            $row.append($exporterAcctCell);
            
            var $shipDateCell = $('<td>' + shipDate + '</td>');
            $row.append($shipDateCell);
            
            var $statusCell = $('<td id="status" class="font-bold">' + status + '</td>');
            $statusCell.addClass(buttonAssigned(status)[1]);
            
            $row.append($statusCell);
            var $buttonCell = $('<td></td>');
            $buttonCell.append($button);
            $row.append($buttonCell);
            $('#latestLCs').append($row);
        }


    } else {
        $('#latestLCs').append("<tr><td class='font-bold' style='text-align:center' colspan='6'>No Results found</td></tr>");
    }

}



function emptyShipperHome(){
    $('#latestLCs').empty();
}


function getAllLcDetailsShipper() {
    var refNumberList;
    getRefNumList(//calling this method from assets/js/DAO/lcHandling.js
            userId, PIN, OTP, function (refNumList) {
                refNumberList = refNumList.RefNumList.RefNum;
            });
    console.log(refNumberList);
    var numOfRows = refNumberList.length;
    var allLcDetails = [];
    for (var i = 0; i < numOfRows; i++) {
//call web service to get lc details for each ref number 

        var refNum = refNumberList[i];
        var refNumInt = parseInt(refNum);
        //get status of the ref num
        //getStatus(userId, PIN, OTP, refNum, callback)
        var status = "";
        getStatus(userId, PIN, OTP, refNumInt, function (data) {
            status = data;
        });
        var availableStatus = ["shipped to carrier", "documents uploaded", "bg requested", "documents issued", "payment advised", "documents accepted", "bol verifed", "item colleccted"];
        var statusIncluded = $.inArray(status,availableStatus);
        
        if (status !== "" && statusIncluded !== -1) {
//get contract of the ref num
            var country = "";
            var exporterAcct = "";
            var shipDate = "";
            getLcDetails(userId, PIN, OTP, refNumInt, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
                if (contract !== "") {
                    exporterAcct = contract.Content.exporterAccount;
                    shipDate = contract.Content.shipDate;
                    country = contract.Content.shipDestination;
                }

            });
            //get operation of the status
            var operations = operationMatch(status, usertype); //calling this method from utility/operationMatch.js

            var operation = operations[0];
            var url = operations[1];
            var lcObject = {
                refNum: refNumInt,
                country: country,
                exporter: exporterAcct,
                shipDate: shipDate,
                status: status,
                operation: operation,
                url: url
            };
            allLcDetails[i] = lcObject;
        }
    }
    return allLcDetails;
}

//this function handles ui logic of view lc details
function lcDetailsOperation() {

    var refNum = getQueryVariable("refNum");
    var refNumInt = parseInt(refNum);
    getLcDetails(userId, PIN, OTP, refNumInt, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
        var fields = contract.Content;
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
            if (!isCounted) {

                var lcDetailsHTML = "<label class='col-lg-2 control-label lc-label'>" + i + "</label>";
                lcDetailsHTML += "<div class='col-lg-10 font-bold' id='lcValue'><p id='" + i + "'></p>" + fields[i];
                lcDetailsHTML += "</div><input style='display:none' id='input' type='text' name =" + i + " data-required='true' placeholder='" + fields[i] + "'>";
                $("#lcDetails").append("<div class='form-group lc-form'>" + lcDetailsHTML + "</div>");
                $("#lcDetails").append("<div class='line line-dashed line-lg pull-in'></div>");
            }
        }

        var url = getQueryVariable("action");
        if (usertype === "exporter" && url === "approveLc") {
            approveLcButton();
            $("#approveButton").click(function () {
                var status = "acknowledged";
                setStatus(userId, PIN, OTP, refNum, status, function (data) {
                    console.log(data);
                    window.location.replace("/SMUtBank_TradeFinance/exporter/exporter.html");
                });
            });
            $("#amendButton").click(function () {

                window.location.replace("/SMUtBank_TradeFinance/exporter/amendLcDetails.html?refNum=" + refNumInt);
            });
        } else {
            viewLcButton(usertype);
        }

    });
}


//this function handles ui logic of view lc details
function amendLcOperation() {

    var refNum = getQueryVariable("refNum");
    var refNumInt = parseInt(refNum);
    getLcDetails(userId, PIN, OTP, refNumInt, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
        var fields = contract.Content;
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
            if (!isCounted) {

                var lcDetailsHTML = "<label class='col-lg-2 control-label lc-label'>" + i + "</label>";
                lcDetailsHTML += "<div class='col-lg-10 font-bold' id='lcValue'></div>";
                var input = "<input id='" + i + "' type='text' name =" + i + " data-required='true' placeholder='" + fields[i] + "'>";
                lcDetailsHTML += input;
                $("#lcDetails").append("<div class='form-group lc-form'>" + lcDetailsHTML + "</div>");
                $("#lcDetails").append("<div class='line line-dashed line-lg pull-in'></div>");
            }
        }
    });
    amendLcButton();
    $("#amendButton").click(function () {
//amendLc("amendLC","amendments");
//setStatus("requested to amend");

        var amendments = {};
        $("input").each(function () {

            if (this.value === "") {
                this.value = this.placeholder;
            }
            amendments[this.name] = this.value;
        });
        amendLc(userId, PIN, OTP, refNumInt, amendments, function (amendments) {
            console.log(amendments);
        });
        var status = "requested to amend";
        setStatus(userId, PIN, OTP, refNumInt, status, function (data) {
            console.log(data);
            window.location.replace("/SMUtBank_TradeFinance/exporter/exporter.html");
        });
    });
}

function modifyLcOperation() {

    var refNum = getQueryVariable("refNum");
    var refNumInt = parseInt(refNum);
    if (refNum !== "") {

        var amendments = null;
        var originalLc = null;
        //get original contract, store in amendments variable
        getLcDetails(userId, PIN, OTP, refNum, function (data) {
            originalLc = data.Content;
        });
        //get amended lc
        getLcAmendments(userId, PIN, OTP, refNum, function (data) {
            amendments = data.Content;
        });
        console.log(amendments);
        console.log(originalLc);
        if (amendments !== null && originalLc !== null) {
            for (var field in amendments) {
                var originalValue = originalLc[field];
                var amendedValue = amendments[field];
                var isCounted = false;
                /*for (var j in headerVariables){
                 
                 if (i === headerVariables[j]){
                 isCounted = true;
                 }
                 }*/
                if (!isCounted) {
                    var inputId = "#" + field;
                    var lcDetailsHTML = "<label class='col-lg-2 control-label lc-label'>" + field + "</label>";
                    lcDetailsHTML += "<div class='col-lg-10 font-bold' id='lcValue'></div>";
                    var input = "<input id='" + field + "' type='text' name =" + field + " data-required='true' placeholder='" + amendedValue + "'>";
                    lcDetailsHTML += input;
                    $("#lcDetails").append("<div class='form-group lc-form'>" + lcDetailsHTML + "</div>");
                    $("#lcDetails").append("<div class='line line-dashed line-lg pull-in'></div>");
                    if (originalValue !== amendedValue) {
                        console.log(field);
                        console.log(originalValue !== amendedValue);
                        //highlight fields
                        $(inputId).addClass("btn-danger");
                    } else {
                        $(inputId).attr('disabled', true);
                    }

                }
            }
            modifyLcButton();
            $("#modifyButton").click(function () {
//amendLc("modifyContract","contract");

                var modification = {};
                $("input").each(function () {

                    if (this.value === "") {
                        this.value = this.placeholder;
                    }
                    modification[this.name] = this.value;
                });
                modifyLc(userId, PIN, OTP, refNum, modification, function (data) {
                    console.log(data);
                });
                var status = "pending";
                setStatus(userId, PIN, OTP, refNumInt, status, function (data) {
                    console.log(data);
                    window.location.replace("/SMUtBank_TradeFinance/importer/importer.html");
                });
            });
            $("#cancelButton").click(function () {
                window.location.replace("/SMUtBank_TradeFinance/importer/importer.html");
            });
        }


    }




}


function totalLcs() {

}
function buttonAssigned(status) { // this method is to assign button color (by adding class name to the button element) based on status 
//var element, name, arr;
//element = document.getElementById("lcDetails");
    var name = "btn-primary";
    var text = "text-primary";
    if (status === "rejected" || status === "requested to amend") {
        name = "btn-danger";
        text = "text-danger";
    }
    return [name, text];
}

function operationMatch(status, usertype) {
    var operation = "view lc";
    var url = "lcDetails";
    if (usertype === "importer") {

        if (status === "rejected" || status === "requested to amend") {
            url = "modifyLcDetails";
            operation = "modify lc";
        }

    } else if (usertype === "exporter") {
        if (status === "advised") {
            url = "approveLc";
            operation = "approve lc";
        } else if (status === "acknowledged") {
            url = "shipGoods";
            operation = "ship goods";
        }
    } else if (usertype === "shipper") {
        if (status === "shipped to carrier") {
            url = "submitBol";
            operation = "submit bol"
        } else {
            url = "view contract";
            operation = "view contract";
        }
    }
    return [operation, url];
}















var getUserItem = sessionStorage.getItem('user');
var user = $.parseJSON(getUserItem);
var userId = user.userID;
var PIN = user.PIN;
var OTP = user.OTP;
var usertype = user.usertype;

//this function handle the ui logic of apply lc page
function applyLcOperation() {
    var exporterDetails = getExporterDetails();
    if (exporterDetails.length > 0) {
        for (var i in exporterDetails) {
            option = "<option value='" + exporterDetails.customerId + "'>" + exporterDetails.userId + "</option>"
        }
    }
    var account;
    getCustomerAccounts(userId, PIN, OTP, function (accounts) { //get currency and importer account

        account = accounts.Content.ServiceResponse.AccountList.account[0];
        if (account == null) {
            account = accounts.Content.ServiceResponse.AccountList.account;
        }
        console.log(account);

    });
    var errorMsg;
    var globalErrorID;
    var importerAccount = account.accountID;
    console.log(importerAccount);
    var exporterAccount = document.getElementById("exporterAcct").value;
    console.log("exporterAcct");
    console.log(exporterAccount);
    var expiryDate = document.getElementById("expiryDate").value;
    var confirmed = "false";
    var revocable = "false";
    var availableBy = "TERM";
    var termDays = "90";
    var amount = document.getElementById("amount").value;
    var currency = account.currency; //getCustomerAccounts
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

    var validateLcApplication = lcApplicationForm(userId, PIN, OTP, lc);
    console.log(validateLcApplication);
    if (validateLcApplication !== undefined) {
        if (validateLcApplication.hasOwnProperty("errorMsg")) {
            var errorMsg = validateLcApplication.errorMsg;
            console.log("error");
            console.log(errorMsg);
            $("#authError").html(errorMsg);
        } else if (validateLcApplication.hasOwnProperty("success")) {
            $("#authError").html("lc application submitted");
            console.log("success");
            console.log(validateLcApplication);
            //After completing both applying lc from Alan's API and bc, page will be redirected to homepage.
            window.location.replace("/SMUtBank_TradeFinance/importer/importer.html");
        }
    }
}

//this function handles ui logic of homepage
function homeOperation() {

    var refNumberList = [];
    var refNumberListValidation = validateGetRefNumList(userId, PIN, OTP);
    console.log(refNumberList);
    if (refNumberListValidation !== undefined) {
        if (refNumberListValidation.hasOwnProperty("errorMsg")) {
            var errorMsg = refNumberListValidation.errorMsg;
            console.log("error");
            console.log(errorMsg);
            $("#authError").html(errorMsg);
        } else if (refNumberListValidation.hasOwnProperty("success")) {
            refNumberList = refNumberListValidation.success;
            console.log(refNumberList);
        }
    }
    var numOfRows = 5;
    for (var i = 0; i < numOfRows; i++) {
//call web service to get lc details for each ref number 

        var refNum = refNumberList[i];
        //var refNumInt = parseInt(refNum);
        //get status of the ref num
        //getStatus(userId, PIN, OTP, refNum, callback)


        var lc = {};
        //if (status !== "") {
//get contract of the ref num
        var exporterAcct = "";
        var importerAcct = "";
        var expiryDate = "";
        var status = "";
        var globalErrorId = "";
        getLcDetails(userId, PIN, OTP, refNum, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
            globalErrorId = contract.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
            console.log(globalErrorId);
            if (globalErrorId === "010000") {
                importerAcct = contract.Content.ServiceResponse.LC_Details.LC_record.importer_account_num;
                exporterAcct = contract.Content.ServiceResponse.LC_Details.LC_record.exporter_account_num;
                expiryDate = contract.Content.ServiceResponse.LC_Details.LC_record.expiry_date;
                status = contract.Content.ServiceResponse.LC_Details.LC_record.status;
                lc = contract.Content.ServiceResponse.LC_Details.LC_record;
            }

        });
        lc = JSON.stringify(lc);
        console.log(lc);
        //get operation of the status
        var operations = operationMatch(status, usertype); //calling this method from utility/operationMatch.js

        var operation = operations[0];
        var url = operations[1];
        var $row = $('<tr></tr>');
        var href = "/SMUtBank_TradeFinance/" + usertype + "/" + url + ".html?action=" + url + "&refNum=" + refNum;
        //var $button = $("<a type='button' id='lcDetails' class='btn btn-s-md' href='" + href + "'>" + operation + "</a> ");
        var $button = $("<button type='button'  class='btn btn-primary lcDetails' data-action= '" + operation + "' data-toggle='modal' data-target='#lcDetailsModal' data-lc='" + lc + "'  data-status='" + status + "' data-refnum='" + refNum + "'>" + operation + "</button>");
        $button.addClass(buttonAssigned(status)[0]);
        var $refNumCell = $('<td></td>');
        $refNumCell.append(refNum);
        $row.append($refNumCell);

        if (usertype === "importer") {
            var $exporterAcctCell = $('<td>' + exporterAcct + '</td>');
            $row.append($exporterAcctCell);
        } else {
            var $importerAcctCell = $('<td>' + importerAcct + '</td>');
            $row.append($importerAcctCell);
        }
        var $expiryDateCell = $('<td>' + expiryDate + '</td>');
        $row.append($expiryDateCell);
        var $statusCell = $('<td id="status" class="font-bold">' + status + '</td>');
        $statusCell.addClass(buttonAssigned(status)[1]);
        $row.append($statusCell);
        var $buttonCell = $('<td></td>');
        $buttonCell.append($button);
        $row.append($buttonCell);
        $('#latestLCs').append($row);
        //}

    }

}

function getAllLcDetails() {
    var refNumberList = [];
    var refNumberListValidation = validateGetRefNumList(userId, PIN, OTP);
    console.log(refNumberList);
    if (refNumberListValidation !== undefined) {
        if (refNumberListValidation.hasOwnProperty("success")) {
            refNumberList = refNumberListValidation.success;
            console.log(refNumberList);
        }
    }
    var numOfRows = refNumberList.length;
    var allLcDetails = [];
    for (var i = 0; i < numOfRows; i++) {
//call web service to get lc details for each ref number 
        var refNum = refNumberList[i];
        //var refNumInt = parseInt(refNum);
        //get status of the ref num
        //getStatus(userId, PIN, OTP, refNum, callback)
        var status = "";
        getStatus(userId, PIN, OTP, refNum, function (data) {
            status = data;
        });

//get contract of the ref num
        var country = "";
        var exporterAcct = "";
        var shipDate = "";
        var lcDetails = {};
        getLcDetails(userId, PIN, OTP, refNum, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
            if (contract !== "") {
                lcDetails = contract.Content;
            }

        });

        var lcObject = {
            refNum: refNum,
            lcDetails: lcDetails,
            status: status
        };
        allLcDetails[i] = lcObject;
    }
    return allLcDetails;
}

//this function handles ui logic of homepage
function shipperHomeOperation(lcToBePrinted) {
    if (lcToBePrinted.length > 0) {
        for (var i in lcToBePrinted) {

            var url = lcToBePrinted[i]["url"];
            var operation = lcToBePrinted[i]["operation"];
            var refNum = lcToBePrinted[i]["refNum"];
            var status = lcToBePrinted[i]["status"];
            var country = lcToBePrinted[i]["country"];
            var shipDate = lcToBePrinted[i]["shipDate"];
            var exporterAcct = lcToBePrinted[i]["exporter"];

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



function emptyShipperHome() {
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

        //get status of the ref num
        //getStatus(userId, PIN, OTP, refNum, callback)
        var status = "";
        getStatus(userId, PIN, OTP, refNum, function (data) {
            status = data;
        });
        var availableStatus = ["shipped to carrier", "documents uploaded", "bg requested", "documents issued", "payment advised", "documents accepted", "bol verifed", "item colleccted"];
        var statusIncluded = $.inArray(status, availableStatus);

        if (status !== "" && statusIncluded !== -1) {
//get contract of the ref num
            var country = "";
            var exporterAcct = "";
            var shipDate = "";
            getLcDetails(userId, PIN, OTP, refNum, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
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
                refNum: refNum,
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

    getLcDetails(userId, PIN, OTP, refNum, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
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

                window.location.replace("/SMUtBank_TradeFinance/exporter/amendLcDetails.html?refNum=" + refNum);
            });
        } else {
            viewLcButton(usertype);
        }

    });
}


//this function handles ui logic of view lc details
function amendLcOperation() {

    var refNum = getQueryVariable("refNum");
    //var refNumInt = parseInt(refNum);
    getLcDetails(userId, PIN, OTP, refNum, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
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
        amendLc(userId, PIN, OTP, refNum, amendments, function (amendments) {
            console.log(amendments);
        });
        var status = "requested to amend";
        setStatus(userId, PIN, OTP, refNum, status, function (data) {
            console.log(data);
            window.location.replace("/SMUtBank_TradeFinance/exporter/exporter.html");
        });
    });
}

function modifyLcOperation() {

    var refNum = getQueryVariable("refNum");
    //var refNumInt = parseInt(refNum);
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
                var statusDetails = "";
                updateStatus(userId, PIN, OTP, refNum, statusDetails, function (data) {
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
    //var lowerStatus = status.toLowerCase();
    var operation = "view lc";
    var url = "lcDetails";
    if (usertype === "importer") {

        if (status.toLowerCase() === "requested to amend") {
            url = "modifyLcDetails";
            operation = "modify lc";
        }

    } else if (usertype === "exporter") {
        if (status.toLowerCase() === "pending") {
            url = "approveLc";
            operation = "approve lc";
        } else if (status.toLowerCase() === "acknowledged") {
            url = "shipGoods";
            operation = "ship goods";
        }
    } else if (usertype === "shipper") {
        if (status.toLowerCase() === "shipped to carrier") {
            url = "submitBol";
            operation = "submit bol"
        } else {
            url = "view contract";
            operation = "view contract";
        }
    }
    return [operation, url];
}


function showLcDetailsModal() {
    //if user clicks the button -

    $('#lcDetailsModal').modal('show');
}

function loadLcDetailsModal() {
    //$(document).ready(function () {
    $('#lcDetailsModal').on('show.bs.modal', function (event) { // id of the modal with event
        var button = $(event.relatedTarget) // Button that triggered the modal
        var refNum = button.data('refnum') // Extract info from data-* attributes
        var status = button.data('status')
        var action = button.data('action')
        //var productname = button.data('productname')
        var fields = button.data('lc') //convert string to json string
        var fieldsFromUser = ["exporterAccount", "expiryDate", "amount", "goodsDescription", "additionalConditions"];
        var allLcHTML = ""
        for (var i in fields) {
            var lcDetailsHTML = "";
            lcDetailsHTML = "<label class='col-lg-4 control-label lc-label' id=''>" + i + "</label>"
            lcDetailsHTML += "<div class='col-lg-4 font-bold' id='lcValue'><p id='" + i + "'></p>" + fields[i] + "</div>"
            //lcDetailsHTML += "<label class='col-lg-3 control-label lc-label'>" + i + "</label>"
            //lcDetailsHTML += "<div class='col-lg-3 font-bold' id='lcValue'><p id='" + i + "'></p>" + fields[i]+"</div>"


            //lcDetailsHTML += "</div><input style='display:none' id='input' type='text' name =" + i + " data-required='true' placeholder='" + fields[i] + "'>"
            //$("#lcDetails").append("<div class='form-group lc-form'>" + lcDetailsHTML + "</div>");
            //$("#lcDetails").append("<div class='line line-dashed line-lg pull-in'></div>");
            allLcHTML += "<div class='form-group lc-form'>" + lcDetailsHTML + "</div>"
            allLcHTML += "<div class='line line-dashed line-lg pull-in'></div>"
        }
        var buttons = ""
        if (usertype === "exporter" && action === "approve lc") {
            buttons += "<div class='form-group lc-form'>"
            buttons += "<div class='col-lg-4 '><button type='submit' class='btn btn-primary btn-lg' id='approveButton'><i class='fa fa-check'></i>  Approve</button></div>"
            buttons += "<div class='col-lg-4 '><button type='submit' class='btn btn-danger btn-lg' id='amendButton'>Request to amend</button></div>"
            buttons += "<div class='col-lg-4 '><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div>"
            buttons += "</div>"
            
        }

        // Update the modal's content.
        var modal = $(this)
        modal.find('.modal-body section header div div div p#refNum').text(refNum);
        modal.find('.modal-body #status').text(status);
        modal.find('.modal-body #lcDetails').html(allLcHTML)
        modal.find('.modal-footer #lcButtons').html(buttons)
        
        //modal.find('.modal-footer #lcButtons' ).html(buttons)
        //$(
        // And if you wish to pass the productid to modal's 'Yes' button for further processing
        //modal.find('button.btn-danger').val(productid)
    });
    //});

}

function getExporterDetails() {
    // get all exporter details of current importer
    //var exporterList = ["0000000915","0000000914"];
    var expoterList = ["toffeemint1", "toffeemint2"]; //user ids

    var allUserCredentials = [
        {userId: "toffeemint1", customerId: "0000000914", bankId: "1", accountId: "0000002473"},
        {userId: "toffeemint2", customerId: "0000000915", bankId: "1", accountId: "0000002480"}
        /* {userId: "toffeemint3", customerId: "0000000915", bankId: "", accountId: ""},
         {userId: "toffeemint4", customerId: "0000000915", bankId: "", accountId: ""}*/
    ];
    console.log(allUserCredentials);
    var exporterCredentials = [];
    for (var i = 0; i < allUserCredentials.length; i++) {
        var oneCredential = allUserCredentials[i];
        console.log(oneCredential["userId"]);
        if (oneCredential["userId"] !== userId) {
            exporterCredentials.push(oneCredential);
        }
    }
    console.log(exporterCredentials);

    return exporterCredentials;

}











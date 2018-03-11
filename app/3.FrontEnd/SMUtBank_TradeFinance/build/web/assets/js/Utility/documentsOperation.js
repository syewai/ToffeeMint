/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*var getUserItem = sessionStorage.getItem('user');
var user = $.parseJSON(getUserItem);
var userId = user.userID;
var PIN = user.PIN;
var OTP = user.OTP;
var usertype = user.usertype;*/
var userId = sessionStorage.userID;
var PIN = sessionStorage.PIN;
var OTP = sessionStorage.OTP;

async function uploadBol() {
    // get lc details, prefilled 4 lc fields
    var refNum = getQueryVariable("refNum");
    var importerAccount = ""; //no change
    var exporterAccount = ""; //no change
    var expiryDate = "";
    var expiryPlace = "";
    var confirmed = "";
    var revocable = "";
    var availableBy = "";
    var termDays = "";
    var amount = "";
    var currency = ""; //no change
    var applicableRules = "";
    var partialShipments = "";
    var shipDestination = "";
    var shipDate = "";
    var shipPeriod = "";
    var goodsDescription = "";
    var docsRequired = "";
    var additionalConditions = "";
    var senderToReceiverInfo = "";
    var mode = "BC"; //no change

    var errorMsg;
    var globalErrorID;
    /*Part 1 - call getLcDetails to prefilled amendments*/
    const lcDetails = await getLcDetails(userId, PIN, OTP, refNum); //calling this method from  assets/js/DAO/lcHandling.js
    var globalErrorId =
        lcDetails.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
    var fields = {};
    if (globalErrorId === "010000") {
        fields = lcDetails.Content.ServiceResponse.LC_Details.LC_record;

        for (var field in fields) {
            var fieldCamel = attributeMapping(field);
            var fieldValue = fields[field];
            $("#" + fieldCamel).attr("placeholder", fieldValue);

        }

        importerAccount = fields.importer_account_num; //no change
        //console.log(importerAccount);
        exporterAccount = fields.exporter_account_num; //no change
        expiryDate = fields.expiry_date; //no change
        expiryPlace = fields.expiry_place;
        confirmed = fields.confirmed;
        revocable = fields.revocable;
        availableBy = fields.available_by;
        termDays = fields.term_days;
        amount = fields.amount;
        currency = fields.currency; //no change
        applicableRules = fields.applicable_rules;
        partialShipments = fields.partial_shipments;
        shipDestination = fields.ship_destination;
        shipDate = fields.ship_date;
        shipPeriod = fields.ship_period;
        goodsDescription = fields.goods_description;
        docsRequired = fields.docs_required;
        additionalConditions = fields.additional_conditions;
        senderToReceiverInfo = fields.sender_to_receiver_info;

    }

    /* getLcDetails(userId, PIN, OTP, refNum, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
         var globalErrorId = contract.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
         //console.log(globalErrorId);
         var fields = {};
         if (globalErrorId === "010000") {
             fields = contract.Content.ServiceResponse.LC_Details.LC_record;

             for (var field in fields) {
                 var fieldCamel = attributeMapping(field);
                 var fieldValue = fields[field];
                 $("#" + fieldCamel).attr("placeholder", fieldValue);

             }

             importerAccount = fields.importer_account_num; //no change
             //console.log(importerAccount);
             exporterAccount = fields.exporter_account_num; //no change
             expiryDate = fields.expiry_date; //no change
             expiryPlace = fields.expiry_place;
             confirmed = fields.confirmed;
             revocable = fields.revocable;
             availableBy = fields.available_by;
             termDays = fields.term_days;
             amount = fields.amount;
             currency = fields.currency; //no change
             applicableRules = fields.applicable_rules;
             partialShipments = fields.partial_shipments;
             shipDestination = fields.ship_destination;
             shipDate = fields.ship_date;
             shipPeriod = fields.ship_period;
             goodsDescription = fields.goods_description;
             docsRequired = fields.docs_required;
             additionalConditions = fields.additional_conditions;
             senderToReceiverInfo = fields.sender_to_receiver_info;

         }
     });*/
    var bolLink = "http://bit.ly/2BPThUM";
    var cooLink = "http://bit.ly/2smTvi9";
    var insuranceLink = "http://bit.ly/2CaYEcP";
    $("#bolLink").attr("placeholder", bolLink);
    $("#cooLink").attr("placeholder", cooLink);
    $("#insuranceLink").attr("placeholder", insuranceLink);

    /*var bolText = "BOL - " + refNum+".pdf";
     var cooText = "Cert of Origin - " + refNum+".pdf";
     var insuranceText = "Insurance - " + refNum+".pdf";
     $("#bolLink").html(bolText);
     $("#cooLink").html(cooText);
     $("#insuranceLink").html(insuranceText);*/

    $("#uploadDocsButton").click(function() {
        //upload bol
        var globalErrorId = "";
        var bolLink = document.getElementById("bolLink").value;
        if (bolLink === "") {
            bolLink = document.getElementById("bolLink").placeholder;
        }
        var cooLink = document.getElementById("cooLink").value;
        if (cooLink === "") {
            cooLink = document.getElementById("cooLink").placeholder;
        }
        var insuranceLink = document.getElementById("insuranceLink").value;
        if (insuranceLink === "") {
            insuranceLink = document.getElementById("insuranceLink").placeholder;
        }

        var links = {
            BillOfLading: bolLink,
            CertOfOrigin: cooLink,
            Insurance: insuranceLink

        };

        var linksJson = JSON.stringify(links);
        processUploadBol(userId, PIN, OTP, refNum, linksJson);


    });
    $("#cancelButton").click(function() {
        window.location.replace("/SMUtBank_TradeFinance/" + sessionStorage.usertype + "/" + sessionStorage.usertype + ".html");
    });
    //
}

async function processUploadBol(userId, PIN, OTP, refNum, linksJson) {
    const uploadBol = await uploadBOL(userId, PIN, OTP, refNum, linksJson);
    var globalErrorId = uploadBol.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
    if (globalErrorId === "010000") {
        processUpdateStatus(userId, PIN, OTP, refNum, "documents uploaded", "");
    }
}
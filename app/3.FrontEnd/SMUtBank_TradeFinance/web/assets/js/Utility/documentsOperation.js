/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var getUserItem = sessionStorage.getItem('user');
var user = $.parseJSON(getUserItem);
var userId = user.userID;
var PIN = user.PIN;
var OTP = user.OTP;
var usertype = user.usertype;

function uploadBol() {
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


    getLcDetails(userId, PIN, OTP, refNum, function (contract) {//calling this method from  assets/js/DAO/lcHandling.js
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
    });
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

    $("#uploadDocsButton").click(function () {
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
            bolLink: bolLink,
            cooLink: cooLink,
            insuranceLink: insuranceLink

        };

        var linksJson = JSON.stringify(links);

        uploadBOL(userId, PIN, OTP, refNum, linksJson, function (data) {
            //console.log(data);
            globalErrorId = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
            //console.log(globalErrorId);
        });
        if (globalErrorId === "010000") {

            //update status to documents uploaded
            updateStatus(userId, PIN, OTP, refNum, "documents uploaded", "", function (data) {
                var globalErrorID = data.Content.Trade_LCStatus_Update_BCResponse.ServiceRespHeader.GlobalErrorID;
                if (globalErrorID === "010000") {
                    //console.log("docs uploaded");
                    //console.log(data);
                    //After ,page will be redirected to homepage.
                    window.location.replace("/SMUtBank_TradeFinance/"+usertype+"/"+usertype+".html");
                }
            });



            /*docsRequired = "Cert of Origin" + "\n" + cooLink + "\n\n"
             + "Insurance" + "\n" + insuranceLink;
             
             var lc = {
             referenceNumber: refNum,
             importerAccount: importerAccount,
             exporterAccount: exporterAccount,
             expiryDate: expiryDate,
             expiryplace: expiryPlace,
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
             //console.log(lc);
             
             var validateLcApplication = lcModificationForm(userId, PIN, OTP, lc);
             //console.log(validateLcApplication);
             if (validateLcApplication !== undefined) {
             if (validateLcApplication.hasOwnProperty("errorMsg")) {
             var errorMsg = validateLcApplication.errorMsg;
             //console.log("error");
             //console.log(errorMsg);
             $("#authError").html(errorMsg);
             
             } else if (validateLcApplication.hasOwnProperty("success")) {
             //update status to "docuements uploaded"
             updateStatus(userId, PIN, OTP, refNum, "documents uploaded", "", function (data) {
             if (globalErrorID === "010000") {
             //console.log("docs uploaded");
             //console.log(data);
             //After completing both applying lc from Alan's API and bc, page will be redirected to homepage.
             // window.location.replace("/SMUtBank_TradeFinance/"+usertype+"/"+usertype+".html");
             }
             });
             
             
             }
             }*/

        }

    });
    $("#cancelButton").click(function () {
        window.location.replace("/SMUtBank_TradeFinance/" + usertype + "/" + usertype + ".html");
    });
    //
}

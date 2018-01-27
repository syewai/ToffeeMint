/* 
 * This script stores all lc handling logic (exposing web service)
 */

var apiUrl = 'http://smu.tbankonline.com/SMUtBank_API/Gateway';
var apiUrlBC = 'http://localhost:9001/lc/';

function LetterOfCredits(importerAccount,
        exporterAccount,
        expiryDate,
        confirmed, revocable,
        availableBy,
        termDays,
        amount,
        currency,
        applicableRules,
        partialShipments,
        shipDestination,
        shipDate,
        shipPeriod,
        goodsDescription,
        docsRequired,
        additionalConditions,
        senderToReceiverInfo,
        mode)
{
    this.importerAccount = importerAccount,
            this.exporterAccount = exporterAccount,
            this.expiryDate = expiryDate,
            this.confirmed = confirmed,
            this.revocable = revocable,
            this.availableBy = availableBy,
            this.termDays = termDays,
            this.amount = amount,
            this.currency = currency,
            this.applicableRules = applicableRules,
            this.partialShipments = partialShipments,
            this.shipDestination = shipDestination,
            this.shipDate = shipDate,
            this.shipPeriod = shipPeriod,
            this.goodsDescription = goodsDescription,
            this.docsRequired = docsRequired,
            this.additionalConditions = additionalConditions,
            this.senderToReceiverInfo = senderToReceiverInfo,
            this.mode = mode
}

function applyLc(userId, PIN, OTP, refNum, lc, callback) {
    /*var importerAccount = lc.importerAccount;
    var exporterAccount = lc.exporterAccount;
    var expiryDate = lc.expiryDate;
    var confirmed = lc.confirmed;
    var revocable = lc.revocable;
    var availableBy = lc.availableBy;
    var termDays = lc.termDays;
    var amount = lc.amount;
    var currency = lc.currency;
    var applicableRules = lc.applicableRules;
    var partialShipments = lc.partialShipments;
    var shipDestination = lc.shipDestination;
    var shipDate = lc.shipDate;
    var shipPeriod = lc.shipPeriod;
    var goodsDescription = lc.goodsDescription;
    var docsRequired = lc.docsRequired;
    var additionalConditions = lc.additionalConditions;
    var senderToReceiverInfo = lc.senderToReceiverInfo;
    var mode = lc.mode;*/

    var headerObj = {
        Header: {
            serviceName: "applyLetterOfCredit",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: lc
    };
    var content = JSON.stringify(contentObj);
    $.ajax({
        async: false,
        type: 'GET',
        url: apiUrlBC + 'createContract?Header=' + header + '&refNum=' + refNum + '&contract=' + content,
        dataType: 'json',
        success: callback

    });

}

function amendLc(userId, PIN, OTP, refNum, amendments, callback) { //exporter
    /*UI Logic*/

    var refNum = getQueryVariable("refNum");
    var amendments = {};

    $("input").each(function () {
        //elements.push(this.value);
        //console.log(this.name);
        if (this.value === "") {
            this.value = this.placeholder;
        }
        amendments[this.name] = this.value;

    });

//calling web service
    var headerObj = {
        Header: {
            serviceName: "amendLetterOfCredit",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: amendments
    };
    var content = JSON.stringify(contentObj);

    $.ajax({
        async: false,
        type: 'GET',
        url: apiUrlBC + "amendLC?Header=" + header + "&refNum=" + refNum + "&amendments=" + content,
        dataType: 'json',
        success: callback

    });



}

function modifyLc(userId, PIN, OTP, refNum, contract, callback) {//importer

    var headerObj = {
        Header: {
            serviceName: "modifyLetterOfCredit",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: contract
    };
    var content = JSON.stringify(contentObj);
    
    $.ajax({
        async: false,
        type: 'GET',
        url: apiUrlBC + "modifyContract?Header="+header+"&refNum=" + refNum + "&contract=" + content,
        dataType: 'json',
        success: callback

    });
}

function getLcDetails(userId, PIN, OTP, refNum, callback) {
    
    var headerObj = {
        Header: {
            serviceName: "getLetterOfCredit",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            referenceNumber: refNum,
            mode: "BC"
        }
    };
    var content = JSON.stringify(contentObj);
    
    $.ajax({
        async: false,
        type: 'GET',
        url: apiUrlBC + "getContract?Header="+header+"&refNum=" + refNum,
        dataType: 'json',
        success: callback

    });

}

function getRefNumList(userId, PIN, OTP, callback) {

    var headerObj = {
        Header: {
            serviceName: "getLetterOfCreditRefNumList",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            importerID: "kinetic1"
        }

    };
    var content = JSON.stringify(contentObj);
    $.ajax({
        async: false,
        type: 'GET',
        url: apiUrl + '?Header=' + header + '&Content=' + content,
        dataType: 'json',
        success: callback

    });

}

function deleteLc() {

}


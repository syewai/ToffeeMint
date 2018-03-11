/* 
 * This script stores all lc handling logic (exposing web service)
 */

//calling getApiUrl() and getApiUrlBC() from assets/js/DAO/apiUrl.js
var apiUrl = getApiUrl();
var apiUrlBC = getApiUrlBC();
var apiEvents = getApiEvents();

function LetterOfCredits(
    importerAccount,
    exporterAccount,
    expiryDate,
    confirmed,
    revocable,
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
    mode
) {
    (this.importerAccount = importerAccount),
    (this.exporterAccount = exporterAccount),
    (this.expiryDate = expiryDate),
    (this.confirmed = confirmed),
    (this.revocable = revocable),
    (this.availableBy = availableBy),
    (this.termDays = termDays),
    (this.amount = amount),
    (this.currency = currency),
    (this.applicableRules = applicableRules),
    (this.partialShipments = partialShipments),
    (this.shipDestination = shipDestination),
    (this.shipDate = shipDate),
    (this.shipPeriod = shipPeriod),
    (this.goodsDescription = goodsDescription),
    (this.docsRequired = docsRequired),
    (this.additionalConditions = additionalConditions),
    (this.senderToReceiverInfo = senderToReceiverInfo),
    (this.mode = mode);
}

async function applyLcApi(userId, PIN, OTP, lc, callback) {
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
    let result;
    try {
        result = await $.ajax({
            url: apiUrl + "?Header=" + header + "&Content=" + content + "&ConsumerID=TF",
            type: "POST",
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function amendLc(userId, PIN, OTP, lc, callback) {
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
        Content: lc
    };
    var content = JSON.stringify(contentObj);
    let result;
    try {
        result = await $.ajax({
            url: apiUrl + "?Header=" + header + "&Content=" + content + "&ConsumerID=TF",
            type: "POST",
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getLcAmendments(userId, PIN, OTP, refNum, callback) {

    var headerObj = {
        Header: {
            //serviceName: "getAmendments",
            serviceName: "getLetterOfCreditAmendment",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        referenceNumber: refNum,
        mode: "BC"
    };
    var content = JSON.stringify(contentObj);

    let result;
    try {
        result = await $.ajax({
            url: apiUrl + "?Header=" + header + "&Content=" + content + "&ConsumerID=TF",
            type: "POST",
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function modifyLc(userId, PIN, OTP, contract, callback) {
    //importer

    var headerObj = {
        Header: {
            //serviceName: "modifyLetterOfCredit",
            serviceName: "updateLetterOfCredit",
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

    let result;
    try {
        result = await $.ajax({
            url: apiUrl + "?Header=" + header + "&Content=" + content + "&ConsumerID=TF",
            type: "POST",
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getLcDetails(userId, PIN, OTP, refNum, args) {
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
    let result;
    try {
        result = await $.ajax({
            type: "POST",
            url: apiUrl +
                "?Header=" +
                header +
                "&" +
                "Content=" +
                content +
                "&" +
                "ConsumerID=TF",
            data: args
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}
// async function returns a promise

async function getRefNumListAsync(userId, PIN, OTP, args) {
    var headerObj = {
        Header: {
            serviceName: "getLetterOfCreditRefNumList",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    let result;
    try {
        result = await $.ajax({
            url: apiUrl + "?Header=" + header + "&ConsumerID=TF",
            type: "GET",
            data: args
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}


function deleteLc() {}

function getAllCountries() {
    var countries = ["Norway", "UK", "China", "Japan", "USA"];
    return countries;
}

function getBlockchainReceipt(userId, PIN, OTP, refNum, callback) {
    $.ajax({
        async: false,
        type: "GET",
        url: apiEvents + "LCCreated?refNum=" + refNum,
        dataType: "json",
        success: callback
    });
}

async function getAllBlockchainReceipt(userId, PIN, OTP, callback) {
    let result;
    try {
        result = await $.ajax({
            url: apiEvents + "LCModified?refNum",
            type: "GET",
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getAllBlockchainReceiptHash(userId, PIN, OTP, callback) {
    let result;
    try {
        result = await $.ajax({
            url: apiEvents + "LCCreatedHash?refNum",
            type: "GET",
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getLcsShipper(callback) {
    let result;
    try {
        result = await $.ajax({
            url: '../assets/js/data/datagrid.json',
            type: "GET",
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}
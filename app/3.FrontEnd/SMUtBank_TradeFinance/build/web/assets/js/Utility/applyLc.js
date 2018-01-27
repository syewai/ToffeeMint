

function applyLc() {
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
    var shipDestination = "London";
    var shipDate = "2017-12-12";
    var shipPeriod = "90 Days";
    var goodsDescription = document.getElementById("goodsDesc").value;
    var docsRequired = "none";
    var additionalConditions = document.getElementById("additonalConditions").value;
    var senderToReceiverInfo = "none";
    var mode = "BC";
    
    var lc = new LetterOfCredit(importerAccount,
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
        mode);
        
        
    //get user credentials from session

    var userId = "kinetic1";
    var PIN = "123456";
    var OTP = "999999";
    var usertype = xxx;
    
    //Get the first refNum in the ref num list is only used for block chain
    var refNum;
    getRefNumList(
            userId, PIN, OTP, function (refNumList) {
                refNum = refNumList.RefNumList.RefNum;
            });
    console.log(refNum);
    applyLc(userId, PIN, OTP, refNum, lc, callback);
}
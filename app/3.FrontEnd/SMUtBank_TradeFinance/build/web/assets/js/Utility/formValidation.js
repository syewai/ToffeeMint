function lcApplicationForm(userId, PIN, OTP, lc) {
    var globalErrorID = "";
    var errorMsg = "";
    var lcDetails = {};
    //Apply lc by using Alan's API(without refNum)
    applyLcApi(userId, PIN, OTP, lc, function (data) { //calling this method from assets/js/DAO/lcHandling.js
        errorMsg = data.Content.ServiceResponse.ServiceRespHeader.ErrorText;
        globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
        if (globalErrorID === "010000") {
            lcDetails = data.Content.ServiceResponse.LC_Details;
        }

    });
    if (globalErrorID !== "") {
        if (globalErrorID === "010041") {//OTP expiry error - request new otp

            buildSMSOTP();
            //call notification to send sms
            console.log(errorMsg);
            return {errorMsg: errorMsg};

        } else if (globalErrorID !== "010000") { //Other errors - display error message, 

            console.log(errorMsg);
            return {errorMsg: errorMsg};

        } else {//submit lc application --> for now get ref num and upload lc to bc

            console.log(lcDetails);

            /*This portion indicates the process of lc submission to bc*/

            //1. Get the first refNum in the ref num list -  only used for block chain

            // var refNum = lcDetails.ref_num;
            // var refNumber = parseInt(refNum);
            //2. Call applyLc method to apply lc
            // applyLc(userId, PIN, OTP, refNumber, lc, function (data) { //calling this method from assets/js/DAO/lcHandling.js
            //   console.log(data);
            //});
            /*End of lc submission on bc*/
            return  {success: lcDetails};
        }

    }
    return {};

}

function validateGetRefNumList(userId, PIN, OTP) {
    var globalErrorID = "";
    var errorMsg = "";
    var refNumberList = [];
    getRefNumList(userId, PIN, OTP, function (data) {//calling this method from assets/js/DAO/lcHandling.js
        if (data.hasOwnProperty("Content")) {
            errorMsg = data.Content.ServiceResponse.ServiceRespHeader.ErrorText;
            globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
        } else {
            if (data.RefNumList !== null) {
                refNumberList = data.RefNumList.RefNum;
            }
        }

    });
    if (globalErrorID !== "") {
        if (globalErrorID === "010041") {//OTP expiry error - request new otp

            buildSMSOTP();
            //call notification to send sms
            console.log(errorMsg);
            return {errorMsg: errorMsg};

        } else if (globalErrorID !== "010000") { //Other errors - display error message, 

            console.log(errorMsg);
            return {errorMsg: errorMsg};
        }
    }
    return {success: refNumberList};

}

function lcAmendmentForm(userId, PIN, OTP, lc) {
    var globalErrorID = "";
    var errorMsg = "";
    var amendmentsDetails = {};
    //var lcDetails = {};
    amendLc(userId, PIN, OTP, lc, function (amendments) {
        errorMsg = amendments.Content.ServiceResponse.ServiceRespHeader.ErrorText;
        globalErrorID = amendments.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
        if (globalErrorID === "010000") {
            //lcDetails = amendments.Content.ServiceResponse.LC_Details;
            amendmentsDetails = amendments;
        }

    });

    if (globalErrorID !== "") {
        if (globalErrorID === "010041") {//OTP expiry error - request new otp

            buildSMSOTP();
            //call notification to send sms
            console.log(errorMsg);
            return {errorMsg: errorMsg};

        } else if (globalErrorID !== "010000") { //Other errors - display error message, 

            console.log(errorMsg);
            return {errorMsg: errorMsg};

        } else {//submit lc application --> for now get ref num and upload lc to bc

            console.log(amendmentsDetails);
            return  {success: amendmentsDetails};
        }

    }
    return {};

}

function lcModificationForm(userId, PIN, OTP, lc) {
    var globalErrorID = "";
    var errorMsg = "";
    var modifiedDetails = {};
    //var lcDetails = {};
    modifyLc(userId, PIN, OTP, lc.referenceNumber, lc, function (modification) {
        console.log(modification);
        errorMsg = modification.Content.Trade_LC_Update_BCResponse.ServiceRespHeader.ErrorText;
        globalErrorID = modification.Content.Trade_LC_Update_BCResponse.ServiceRespHeader.GlobalErrorID;
        if (globalErrorID === "010000") {
            //lcDetails = amendments.Content.ServiceResponse.LC_Details;
           
            /*updateStatus(userId, PIN, OTP, lc.referenceNumber, "acknowledged", "", function (data) {
                if (globalErrorID === "010000") {
                     modifiedDetails = modification;
                }
            });*/
        }

    });

    if (globalErrorID !== "") {
        if (globalErrorID === "010041") {//OTP expiry error - request new otp

            buildSMSOTP();
            //call notification to send sms
            console.log(errorMsg);
            return {errorMsg: errorMsg};

        } else if (globalErrorID !== "010000") { //Other errors - display error message, 

            console.log(errorMsg);
            return {errorMsg: errorMsg};

        } else {//submit lc application --> for now get ref num and upload lc to bc

            console.log(modifiedDetails);
            return  {success: modifiedDetails};
        }

    }
    return {};

}
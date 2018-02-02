

function loginAuthentication() {

    var userId = document.getElementById("userID").value;
    var PIN = document.getElementById("PIN").value;
    var usertype = document.getElementById("usertype").value;

    if (!(userId.length > 0)) {

        return {errorMsg: "Username cannot be blank"};
    }
    if (!(/^\d+$/.test(PIN) && PIN.length >= 4)) {

        return {errorMsg: "Password must be numeric and not blank"};
    }
    if (!(usertype.length > 0)) {

        return {errorMsg: "Usertype cannot be blank"};
    }
    var isAdmin = checkAdmin(userId, PIN, usertype);
    if (isAdmin.hasOwnProperty("roleError")) {
        return {errorMsg: isAdmin.roleError};
    }
    var globalErrorID = "";
    var errorMsg = "";
    var data = "";
    getCustomerDeatils(userId, PIN, getDefaultOTP(), function (data) {
        //get error id to check existance of the user
        errorMsg = data.Content.ServiceResponse.ServiceRespHeader.ErrorDetails;
        globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
        if (globalErrorID !== "") {
            if (globalErrorID === "010041") {//OTP expiry error - request new otp 

                //call notification to send sms
                console.log("expiredOTP");

            } else if (globalErrorID !== "010000") { //Other errors - display error message and redirect to login page

                //showErrorModal();
                console.log(errorMsg);
                return {errorMsg: errorMsg};

            } else {  //if there is no error, retrieve user's phone number
                //var phoneNum = getPhoneNumber(userId, PIN, getDefaultOTP());
                var cellPhoneNumber = "";
                var countryCode = data.Content.ServiceResponse.CDMCustomer.cellphone.countryCode;
                var phoneNumber = data.Content.ServiceResponse.CDMCustomer.cellphone.phoneNumber;
                cellPhoneNumber = countryCode + phoneNumber;
                //console.log(phoneNum);
                return {userID: userId, PIN: PIN, usertype: usertype, phoneNumber: cellPhoneNumber};
            }
        }

    });
    return {};
}

function sendOTPSMS(messageInfo) {
    var loginCredentials = loginAuthentication();
    if (loginCredentials.hasOwnProperty("userID")) {
        $('#showOTPModal').modal('show');

        var userId = loginCredentials['userID'];
        var PIN = loginCredentials["PIN"];
        var OTP = loginCredentials["OTP"];
        var usertype = loginCredentials["usertype"];
        var phoneNum = loginCredentials["phoneNumber"];
        //generate OTP??????

        var errorMsg = "";
        var smsError = "";
        sendSMS(userId, PIN, getDefaultOTP(), messageInfo, function (smsNotification) { //sendOTP
            console.log(smsNotification);
            errorMsg = smsNotification.Content.ServiceResponse.ServiceRespHeader.ErrorDetails;
            smsError = smsNotification.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
            if (smsError !== "") {
                if (smsError === "010041") {//OTP expiry error - request new otp 

                    //call notification to send sms
                    console.log("expiredOTP");
                    return {errorMsg: "OTP has been sent"};

                } else if (smsError !== "010000") { //Other errors - display error message and redirect to login page

                    //showErrorModal();
                    console.log(smsError);
                    return {errorMsg: errorMsg};

                } else {
                    return {userID: userId, PIN: PIN, usertype: usertype, phoneNumber: phoneNum, OTP: OTP};
                }
            }
        });


    } else {
        return loginCredentials;
    }
}


function OTPAuthentication(otpInfo) {

    var otp = sendOTPSMS(otpInfo);
    if (!otp.hasOwnProperty("errorMsg")) {
        var userId = otp['userID'];
        var PIN = otp["PIN"];
        var usertype = otp["usertype"];
        //by clicking login button, otp will be retrieved.
        $("#loginBtn").click(function () {
            var OTP = document.getElementById("OTP").value;
            var globalErrorID = "";
            var errorMsg = "";
            
            //pass in the new otp to authenticate user info
            getCustomerDeatils(userId, PIN, OTP, function (data) {
                //get error id to check existance of the user
                errorMsg = data.Content.ServiceResponse.ServiceRespHeader.ErrorDetails;
                globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
                if (globalErrorID !== "") {
                    if (globalErrorID === "010041") {//OTP expiry error - request new otp 

                        //call notification to send sms
                        

                    } else if (globalErrorID !== "010000") { //Other errors - display error message and redirect to login page

                        //showErrorModal();

                        return;

                    } else { //if user authentication successful, store userid,pin and otp in a session, load role selector 

                        //after user has selected an role,redirect to homepage

                        //console.log(username + password + usertype);
                        var user = new User(userId, PIN, OTP, usertype);
                        sessionStorage.setItem('user', JSON.stringify(user));
                        window.location.replace("/SMUtBank_TradeFinance/" + usertype + "/" + usertype + ".html");
                    }

                }


            });
        });

    } else {
        return otp;
    }


}




var userId = document.getElementById("userID").value;
var PIN = document.getElementById("PIN").value;
var usertype = document.getElementById("usertype").value;
var OTP = "";

function createSMSOTP() {
    userId = document.getElementById("userID").value;
    PIN = document.getElementById("PIN").value;
    usertype = document.getElementById("usertype").value;
    if (!(userId.length > 0)) {

        return {errorMsg: "Username cannot be blank"};
    }
    if (!(/^\d+$/.test(PIN) && PIN.length >= 4)) {

        return {errorMsg: "Password must be numeric and not blank"};
    }
    if (!(usertype.length > 0)) {

        return {errorMsg: "Usertype cannot be blank"};
    }
    var isAdmin = checkAdmin(userId, PIN, usertype); //this method is calling from userHandling
    if (isAdmin.hasOwnProperty("roleError")) {
        return {errorMsg: isAdmin.roleError};
    }

    authenticateCustomerDetails(userId, PIN, OTP, usertype, function(data){
        
        //get error id to check existance of the user
        errorMsg = data.Content.ServiceResponse.ServiceRespHeader.ErrorDetails;
        globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
              if (globalErrorID !== "") {
            if (globalErrorID === "010041") {//OTP expiry error - request new otp 
                buildSMSOTP();
                //call notification to send sms
                console.log(errorMsg);
                return {errorMsg: errorMsg};

            } else if (globalErrorID !== "010000") { //Other errors - display error message and redirect to login page

                console.log(errorMsg);
                return  {errorMsg: errorMsg};

            } else {
                //if user authentication successful, store userid,pin and otp in a session, load role selector 
                //console.log(username + password + usertype);
                var user = new User(userId, PIN, OTP, usertype);
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.replace("/SMUtBank_TradeFinance/" + usertype + "/" + usertype + ".html");

                //console.log(phoneNum);
                // return {userID: userId, PIN: PIN, usertype: usertype, phoneNumber: cellPhoneNumber};
            }
        }
        
    
    }); //parse in an empty OTP to activate sms otp

}

function authenticateCustomerDetails(userId, PIN, OTP, usertype, callback) {
    var globalErrorID = "";
    var errorMsg = "";
    var dataReturned = {};
    getCustomerDeatils(userId, PIN, OTP, callback);
  
    
}

function authenticateSMSOTP() {

    OTP = document.getElementById("OTP").value;
    console.log(OTP);
    if (!(/^\d+$/.test(OTP) && OTP.length === 6)) {
        return {errorMsg: "OTP must be numeric and 6 digits long"};
    }
    authenticateCustomerDetails(userId, PIN, OTP, usertype, function(data){
        
        //get error id to check existance of the user
        errorMsg = data.Content.ServiceResponse.ServiceRespHeader.ErrorDetails;
        globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
              if (globalErrorID !== "") {
            if (globalErrorID === "010041") {//OTP expiry error - request new otp 
                buildSMSOTP();
                //call notification to send sms
                console.log(errorMsg)
                return {errorMsg: errorMsg};

            } else if (globalErrorID !== "010000") { //Other errors - display error message and redirect to login page

                console.log(errorMsg);
                return  {errorMsg: errorMsg};

            } else {
                //if user authentication successful, store userid,pin and otp in a session, load role selector 
                //console.log(username + password + usertype);
                var user = new User(userId, PIN, OTP, usertype);
                sessionStorage.setItem('user', JSON.stringify(user));
                window.location.replace("/SMUtBank_TradeFinance/" + usertype + "/" + usertype + ".html");

                //console.log(phoneNum);
                // return {userID: userId, PIN: PIN, usertype: usertype, phoneNumber: cellPhoneNumber};
            }
        }
        
    
    }); //update otp to the new otp, and authenticate otp by using authenticateCustomerDetails

}

function doSMSOTP() {
    var getTempItem = sessionStorage.getItem('temp_credentials');
    var temp = $.parseJSON(getTempItem);
    var userId = temp.userID;
    var PIN = temp.PIN;
    var usertype = temp.usertype;
    var OTP = document.getElementById("OTP").value;
    console.log(OTP);
    if (!(/^\d+$/.test(OTP) && OTP.length === 6)) {
        return {errorMsg: "OTP must be numeric and 6 digits long"};
    }
    if (OTP === getDefaultOTP()) {
        var user = new User(userId, PIN, OTP, usertype);
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.replace("/SMUtBank_TradeFinance/" + usertype + "/" + usertype + ".html");
    }
    var error = {};
    var payload = '{SecondFactor:"' + OTP + '"}';
    doIBS("ribOTPAuth.action", payload, function (data) {
        if (data.status === "ok" && data.esbStatus === "Authenticated") {
            console.log("im correct");
            var user = new User(userId, PIN, OTP, usertype);
            sessionStorage.setItem('user', JSON.stringify(user));
            window.location.replace("/SMUtBank_TradeFinance/" + usertype + "/" + usertype + ".html");
        } else {
            error = {errorMsg: data.esbStatus};
        }
    });
    return error;
}

function buildSMSOTP() {
    $('#showOTPModal').modal('show');
}

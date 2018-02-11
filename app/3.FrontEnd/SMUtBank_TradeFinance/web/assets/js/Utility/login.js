var getUserItem = sessionStorage.getItem('user');
var getAdminItem = sessionStorage.getItem('admin');
var user = $.parseJSON(getUserItem);
var admin = $.parseJSON(getAdminItem);
var userId = "";
var PIN = "";
var usertype = "";
var customerID = "";
var OTP = "";
if (user !== null) {
    userId = user.userID;
    PIN = user.PIN;
    OTP = user.OTP;
}
if (admin !== null) {
    userId = admin.userID;
    PIN = admin.PIN;
    OTP = admin.OTP;
}
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
    var globalErrorID = "";
    var errorMsg = "";
    getCustomerDeatils(userId, PIN, OTP, function (data) {
        //console.log(data);
        //get error id to check existance of the user
        errorMsg = data.Content.ServiceResponse.ServiceRespHeader.ErrorText;
        globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
        if (globalErrorID === "010000") {
            customerID = data.Content.ServiceResponse.CDMCustomer.customer.customerID;
        }

    });  //parse in an empty OTP to activate sms otp
    if (globalErrorID !== "") {
        if (globalErrorID === "010041") {//OTP expiry error - request new otp 
            buildSMSOTP();

        } else if (globalErrorID !== "010000") { //Other errors - display error message and redirect to login page

            //console.log(errorMsg);
            return  {errorMsg: errorMsg};

        } else {
            //if user authentication successful, store userid,pin and otp in a session, load role selector 
            ////console.log(username + password + usertype);

            var user = new User(userId, PIN, OTP, usertype, customerID);

            if (usertype === "shipper") {
                sessionStorage.setItem('admin', JSON.stringify(user));
            } else {
                sessionStorage.setItem('user', JSON.stringify(user));
            }
            window.location.replace("/SMUtBank_TradeFinance/" + usertype + "/" + usertype + ".html");

            ////console.log(phoneNum);
            // return {userID: userId, PIN: PIN, usertype: usertype, phoneNumber: cellPhoneNumber};
        }
    }


}


function authenticateSMSOTP() {

    OTP = document.getElementById("OTP").value;
    //console.log(OTP);
    if (!(/^\d+$/.test(OTP) && OTP.length === 6)) {
        return {errorMsg: "OTP must be numeric and 6 digits long"};
    }
    var globalErrorID = "";
    var errorMsg = "";
    getCustomerDeatils(userId, PIN, OTP, function (data) {
        //console.log(data);
        //get error id to check existance of the user
        errorMsg = data.Content.ServiceResponse.ServiceRespHeader.ErrorText;
        globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
        if (globalErrorID === "010000") {
            customerID = data.Content.ServiceResponse.CDMCustomer.customer.customerID;
        }

    });   //parse in an empty OTP to activate sms otp

    if (globalErrorID !== "") {
        if (globalErrorID !== "010000") {//OTP expiry error - request new otp 
            buildSMSOTP();

        } else {
            //if user authentication successful, store userid,pin and otp in a session, load role selector 
            ////console.log(username + password + usertype);

            var user = new User(userId, PIN, OTP, usertype, customerID);

            if (usertype === "shipper") {
                sessionStorage.setItem('admin', JSON.stringify(user));
            } else {
                sessionStorage.setItem('user', JSON.stringify(user));
            }
            window.location.replace("/SMUtBank_TradeFinance/" + usertype + "/" + usertype + ".html");

        }
    }
}



function buildSMSOTP() {
    $('#showOTPModal').modal('show');
}



/* 
 * This script stores all user handling logic (exposing web service)
 */

//calling getApiUrl() and getApiUrlBC() from assets/js/DAO/apiUrl.js
var apiUrl = getApiUrl();
var apiUrlBC = getApiUrlBC();

function User(userID, PIN, OTP, usertype) {
    this.userID = userID;
    this.PIN = PIN;
    this.OTP = OTP;
    this.usertype = usertype;
}

function User(userID, PIN, OTP, usertype, customerID) {
    this.userID = userID;
    this.PIN = PIN;
    this.OTP = OTP;
    this.usertype = usertype;
    this.customerID = customerID;
}
function getCustomerDeatils(userId, PIN, OTP, callback) { //get address(state, country, city), get customer type(retail/corporate), get phone num, get bank id 

    var headerObj = {
        Header: {
            serviceName: "getCustomerDetails",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    $.ajax({
        async: false,
        type: 'POST',
        url: apiUrl + '?Header=' + header,
        dataType: 'json',
        success: callback

    });

}
function getCustomerAccounts(userId, PIN, OTP, callback) { //get acct id, get currency

    var headerObj = {
        Header: {
            serviceName: "getCustomerAccounts",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    $.ajax({
        async: false,
        type: 'POST',
        url: apiUrl + '?Header=' + header,
        dataType: 'json',
        success: callback

    });

}

function protectUser() {
    var getUserItem = sessionStorage.getItem('user');
    var user = $.parseJSON(getUserItem);
    var errorMsg = "";
    if (user === null) {
        //redirect to login
        var error = {errorMsg: "No such user"};
        sessionStorage.setItem('error', JSON.stringify(error));
        window.location.replace("/SMUtBank_TradeFinance/");
    }
    var userId = user.userID;
    var PIN = user.PIN;
    var OTP = user.OTP;
    var usertype = user.usertype;
    var globalErrorID = "";
    var errorMsg = "";
    //passing username, pin,otp to call login web service
    getCustomerDeatils(userId, PIN, OTP, function (data) {
        //get error id to check existance of the user
        errorMsg = data.Content.ServiceResponse.ServiceRespHeader.ErrorDetails;
        globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;


    });
    if (globalErrorID === "") {
        var error = {errorMsg: "No such user"};
        sessionStorage.setItem('error', JSON.stringify(error));
        window.location.replace("/SMUtBank_TradeFinance/");
    } else {
        if (globalErrorID === "010041") {//OTP expiry error - request new otp 

            buildSMSOTP(); // 
            $("#login_button").click(function () {

                var otp = authenticateSMSOTP();
                //console.log(otp);
                if (otp !== undefined) {
                    if (otp.hasOwnProperty("errorMsg")) {
                        $("#authError").html(otp.errorMsg);
                    }

                }
            });

        } else if (globalErrorID !== "010000") { //Other errors - display error message and redirect to login page

            var error = {errorMsg: "No such user"};
            sessionStorage.setItem('error', JSON.stringify(error));
            window.location.replace("/SMUtBank_TradeFinance/");
        }
    }
}

function protectAdmin() {
    var getAdminItem = sessionStorage.getItem('admin');
    var admin = $.parseJSON(getAdminItem);
    var errorMsg = "";
    if (admin === null) {
        //redirect to login
        var error = {errorMsg: "No such user"};
        sessionStorage.setItem('error', JSON.stringify(error));
        window.location.replace("/SMUtBank_TradeFinance/");
    }
    var userId = admin.userID;
    var PIN = admin.PIN;
    var OTP = admin.OTP;
    var usertype = admin.usertype;
    var globalErrorID = "";
    var errorMsg = "";

    //passing username, pin,otp to call login web service
    getCustomerDeatils(userId, PIN, OTP, function (data) {
        //get error id to check existance of the user
        errorMsg = data.Content.ServiceResponse.ServiceRespHeader.ErrorDetails;
        globalErrorID = data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;


    });
    if (globalErrorID === "") {
        var error = {errorMsg: "No such user"};
        sessionStorage.setItem('error', JSON.stringify(error));
        window.location.replace("/SMUtBank_TradeFinance/");
    } else {
        if (globalErrorID === "010041") {//OTP expiry error - request new otp 

            buildSMSOTP(); // 
            $("#login_button").click(function () {

                var otp = authenticateSMSOTP();
                //console.log(otp);
                if (otp !== undefined) {
                    if (otp.hasOwnProperty("errorMsg")) {
                        $("#authError").html(otp.errorMsg);
                    }
                }
            });

        } else if (globalErrorID !== "010000") { //Other errors - display error message and redirect to login page

            var error = {errorMsg: "No such user"};
            sessionStorage.setItem('error', JSON.stringify(error));
            window.location.replace("/SMUtBank_TradeFinance/");
        }

    }
}


function checkAdmin(userId, PIN, usertype) {

    if (userId === "toffeemintadmin" && PIN === "123456") {
        if (usertype === "shipper") {
            return {"admin": true};
        } else {
            return {"roleError": "You are not an " + usertype};
        }
    } else {
        if (usertype === "shipper") {
            return {"roleError": "You are not a shipper"};
        } else {
            return {"admin": false};
        }
    }
}
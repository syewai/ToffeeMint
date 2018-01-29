function loginAuthentication() {
    //by clicking login with OTP button, a pop-up will be prompted.
    //user id and pin will be transferred to this page
    var userId = document.getElementById("userID").value;
    var PIN = document.getElementById("PIN").value;
    
    //by clicking login button, otp will be retrieved.
    
    var OTP = document.getElementById("OTP").value;
    var globalErrorID = "";
    var errorMsg = "";
    //passing username, pin,otp to call login web service
    login(userId, PIN, OTP, function (data) {
        //get error id to check existance of the user
        globalErrorID = data.serviceRespHeader.GlobalErrorID;
        errorMsg = data.serviceRespHeader.ErrorDetails;
    });
    if (globalErrorID !== "") {
        if (globalErrorID === "010041") {//OTP expiry error - request new otp 

            //call notification to send sms


        } else if (globalErrorID !== "010000") { //Other errors - display error message and redirect to login page

            //showErrorModal();

            return;

        } else { //if user authentication successful, store userid,pin and otp in a session, load role selector 
            
            //after user has selected an role,redirect to homepage

            function User(username, password, usertype) {
                this.username = username;
                this.password = password;
                this.usertype = usertype;
            }
            console.log(username + password + usertype);
            var user = new User(username, password, usertype);
            sessionStorage.setItem('user', JSON.stringify(user));
            window.location.replace("/SMUtBank_TradeFinance/" + usertype + "/" + usertype + ".html");
        }


    }

}



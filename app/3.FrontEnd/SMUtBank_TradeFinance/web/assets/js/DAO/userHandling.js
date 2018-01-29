

/* 
 * This script stores all user handling logic (exposing web service)
 */

//calling getApiUrl() and getApiUrlBC() from assets/js/DAO/apiUrl.js
var apiUrl = getApiUrl();
var apiUrlBC = getApiUrlBC();


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
        url: apiUrl +'?Header=' + header,
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
        url: apiUrl +'?Header=' + header,
        dataType: 'json',
        success: callback

    });

}





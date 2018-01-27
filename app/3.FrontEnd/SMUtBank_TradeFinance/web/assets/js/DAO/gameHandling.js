/* 
 * 
 */

//calling getApiUrl() and getApiUrlBC() from assets/js/Utility/apiUrl.js
var apiUrl = getApiUrl();
var apiUrlBC = getApiUrlBC();

function getGameQuestion(questionId, callback) {

    var headerObj = {
        Header: {
            serviceName: "getGameQuestion",
            userID: "",
            PIN: "",
            OTP: ""
        }
    };

    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            questionID: questionId
        }
    };
    var content = JSON.stringify(contentObj);
    $.ajax({
        async: false,
        type: 'POST',
        url:  apiUrl+"?Header="+header+"&Content="+content,
        dataType: 'json',
        success: callback
    });

}

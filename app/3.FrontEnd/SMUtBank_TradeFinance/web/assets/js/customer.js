/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//Customer details

$(document).ready(function () {
        
        // init user credentials
        document.getElementById("userID").value = getUserID();
        document.getElementById("PIN").value = getPIN();

        /*----------------------------------------
         * [Send] button clicked
         */
        $("#Send").click(function (event) {
            (function() {

                // set service header values
                var serviceName = "getCustomerDetails";
                var userID = document.getElementById("userID").value;
                setUserID(userID);
                var PIN = document.getElementById("PIN").value;
                setPIN(PIN);
                
                // disable Send button
                document.getElementById("Send").disabled = true;

                // set request parameters
                var headerObj = {
                    Header: {
                        serviceName: serviceName,
                        userID: userID,
                        PIN: PIN,
                        OTP: OTP
                    }
                };
                var header = JSON.stringify(headerObj);

                // setup http request
                var xmlHttp = new XMLHttpRequest();
                if (xmlHttp === null){
                    alert("Browser does not support HTTP request.");
                    return;
                }
                xmlHttp.open("POST", getApiURL()+"?Header="+header, true);
                xmlHttp.timeout = 5000;

                // setup http event handlers
                xmlHttp.onreadystatechange = function() {
                    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                        responseObj = JSON.parse(xmlHttp.responseText);
                        serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
                        globalErrorID = serviceRespHeader.GlobalErrorID;
                        if (globalErrorID === "010041"){
                            showOTPModal();
                            return;
                        }
                        else if (globalErrorID !== "010000"){
                            showErrorModal(serviceRespHeader.ErrorDetails);
                            return;
                        }
                        
                        //get data
                         
                        customerID = CDMCustomer.customer.customerID;
                        session.setAttribute(customerId,customerId);
                        
                        givenName = CDMCustomer.givenName;
                        session.setAttribute(givenName,givenName);
                        
                        address = responseObj.Content.ServiceResponse.CDMCustomer.address;
                        session.setAttribute(address,address);
                        
                        country = address.country;
                        session.setAttribute(country,country);
                        
                        profile = responseObj.Content.ServiceResponse.CDMCustomer.profile;
                        session.setAttribute(profile,profile);
                        
                        bankID = profile.bankID;
                        session.setAttribute(bankID,bankID);
                        
                        customerType = profile.customerType;
                        session.setAttribute(customerType,customerType);
                        
                        AccountList = responseObj.Content.ServiceResponse.AccountList;
                        account = AccountList.account;
                        session.setAttribute(account,account);
                        
                        var recordCount = getRecordCount(AccountList);
                        session.setAttribute(recordCount,recordCount);

                        // enable Send button
                        document.getElementById("Send").disabled = false;
                    }
                };
                xmlHttp.ontimeout = function (e) {
                    showErrorModal("Timeout invoking API.");
                    return;
                };					

                // send the http request
                xmlHttp.send();

            })();
        });
    

    });
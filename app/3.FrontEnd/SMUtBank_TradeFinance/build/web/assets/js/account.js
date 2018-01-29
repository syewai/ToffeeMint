/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
                var serviceName = "getDepositAccountDetails";
                var userID = document.getElementById("userID").value;
                setUserID(userID);
                var PIN = document.getElementById("PIN").value;
                setPIN(PIN);
                
                // get and validate form values
                var accountID = document.getElementById("accountID").value;
                if (accountID === ""){
                    showErrorModal("Account ID cannot be blank.");
                    return;  
                }
                
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
                var contentObj = {
                    Content: {
                        accountID: accountID
                    }
                };
                var header = JSON.stringify(headerObj);
                var content = JSON.stringify(contentObj);

                // setup http request
                var xmlHttp = new XMLHttpRequest();
                if (xmlHttp === null){
                    alert("Browser does not support HTTP request.");
                    return;
                }
                xmlHttp.open("POST", getApiURL()+"?Header="+header+"&Content="+content, true);
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
                        
                        // get data
                        
                        LendingAccount = responseObj.Content.ServiceResponse.LendingAccount;
                        session.setAttribute(LendingAccount,LendingAccount);
                        
                        product = responseObj.Content.ServiceResponse.LendingAccount.product;
                        session.setAttribute(product,product);
                        
                        productName = product.productName;
                        session.setAttribute(productName,productName);
                        
                        balance = depositAccount.balance;
                        session.setAttribute(balance,balance);
                        
                        applicationID = loanaccount.applicationID;
                        session.setAttribute(applicationID,applicationID);
                        
                        currentStatus = LendingAccount.currentStatus;
                        session.setAttribute(currentStatus,currentStatus);
                        
                        currency = depositAccount.currency;
                        session.setAtrribute(currency,currency);
                        
                        maintenancehistory = responseObj.Content.ServiceResponse.LendingAccount.maintenancehistory;
                        session.setAttribute(maintencehistory,maintenancehistory);
                        
                        customerID = depositAccount.customerID;
                        session.setAttribute(customerID,customerID);
                        
                        productID = product.productID;
                        session.setAttribute(productID,proudctID);
                        
                        productName = product.productName;
                        session.setAttribute(productName,productName);
                        
                        transaction_Detail = CDMTransactionDetail.transaction_Detail;
                        session.setAttribute(transaction_Detail,transaction_Detail);
                        
                        var recordCount = getRecordCount(CDMTransactionDetail);
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

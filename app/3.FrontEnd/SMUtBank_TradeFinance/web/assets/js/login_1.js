/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function login() {
    //calling authentication service

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    //var usertype = document.getElementById("usertype").value;
    if (username.trim() === "" || password.trim() === "") {
        //showErrorModal("Please fill in both username and password to login.");
        $("div#authError").html("Please fill in all fields");
    } else {
        // send json to servlet
        $.ajax({
            url: 'UserServlet',
            type: 'POST',
            dataType: 'json',
            data: $('#signInForm').serialize(),
            success: function (data) {
                if (data.success) {
                    function User(username, password, usertype) {
                        this.username = username;
                        this.password = password;
                        this.usertype = usertype;
                    }
                    console.log(username + password + usertype);
                    var user = new User(username, password, usertype);
                    sessionStorage.setItem('user', JSON.stringify(user));
                    window.location.replace("/SMUtBank_TradeFinance/" + usertype + "/" + usertype + ".html");
                    /*if (usertype === "importer"){
                     window.location.replace("/SMUtBank_TradeFinance/importer/importer.html"); 
                     console.log("Importer")
                     } else if (usertype === "exporter"){
                     window.location.replace("/SMUtBank_TradeFinance/exporter/exporter.html");  
                     } else if (usertype === "issuingBank"){
                     window.location.replace("/SMUtBank_TradeFinance/issuingBank/issuingBank.html");  
                     } else if (usertype === "advisingBank"){
                     window.location.replace("/SMUtBank_TradeFinance/advisingBank/advisingBank.html");  
                     } else {
                     console.log("Shipper!")
                     } */
                } else {
                    //showErrorModal("Username and password does not match.");
                    $("div#authError").html("Username and password does not match.");
                    return;
                }
            },
            error: function (xhr, status, error) {
                alert(xhr.error);
            }
        });
    }
}

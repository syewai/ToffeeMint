var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
         
         var username = GetURLParameter("username");
         var password = GetURLParameter("password");
         var type = GetURLParameter("account");
         //window.location.href = "/SMUtBank_TradeFinance/importer/home.html";
         alert(username+" "+password+" "+type);
         /*
          if (username != "" && password != "" && type != ""){
              if (username == "kineticl" && password == "123456"){
                  if (type == "1"){ //importer?
                        window.location.href = "/SMUtBank_TradeFinance/importer/home.html";
                        //window.location.replace("/SMUtBank_TradeFinance/importer/home.html");
                    } else if (type=="2"){
                        window.location.href = "/SMUtBank_TradeFinance/exporter/home.html";
                        //window.location.replace("/SMUtBank_TradeFinance/exporter/home.html");
                    } else if (type=="3"){
                        window.location = "/SMUtBank_TradeFinance/issuingBank/home.html";
                    } else{
                        window.location = "/SMUtBank_TradeFinance/advisingBank/home.html" ;     
                    }
                  
              } else {
                  document.getElementById("authError").innerHTML="incorrect userid/pwd";
              }   
          }*/
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function retrieveLcAmendments() {
    var refNum = getQueryVariable("refNum");

    if (refNum !== "") {
        var getContractLink = "http://localhost:9001/lc/getContract?refNum=" + refNum;
        var getAmendmentsLink = "http://localhost:9001/lc/getAmendments?refNum=" + refNum;
        var amendments = null;
        var originalLc = null;

        $.ajax({
            async: false,
            url: getContractLink,
            dataType: "json",
            success: function (data) {
                originalLc = data.Content;
            }
        });

        $.ajax({
            async: false,
            url: getAmendmentsLink,
            dataType: "json",
            success: function (data) {
                //console.log(status);
                amendments = data.Content;
            }
        });
        console.log(amendments);
        console.log(originalLc);
        if (amendments !== null && originalLc !== null) {
            for (var field in amendments) {
                var originalValue = originalLc[field];
                var amendedValue = amendments[field];
                var isCounted = false;
                /*for (var j in headerVariables){
                 
                 if (i === headerVariables[j]){
                 isCounted = true;
                 }
                 }*/
                if (!isCounted) {
                    var inputId = "#"+field;
                    var lcDetailsHTML = "<label class='col-lg-2 control-label lc-label'>" + field + "</label>";
                    lcDetailsHTML += "<div class='col-lg-10 font-bold' id='lcValue'></div>";
                    var input = "<input id='" + field + "' type='text' name =" + field + " data-required='true' placeholder='" + amendedValue + "'>";
                    lcDetailsHTML += input;
                    /*var inputId= "'"+i+"'";
                     var inputValue= "'"+fields[i]+"'";
                     if (input.getElementById(inputId).value === ""){
                     $(input).attr("value",inputValue);
                     }*/

                    $("#lcDetails").append("<div class='form-group lc-form'>" + lcDetailsHTML + "</div>");
                    $("#lcDetails").append("<div class='line line-dashed line-lg pull-in'></div>");
                    if (originalValue !== amendedValue){
                        console.log(field);
                        console.log(originalValue !== amendedValue);
                        //highlight fields
                        $(inputId).addClass("btn-danger"); 
                    } else {
                       $(inputId).attr('disabled', true);
                    }

                }
            }

        }


    }


}


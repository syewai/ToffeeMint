/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var apiUrl = getApiUrl();
var apiUrlBC = getApiUrlBC();
var apiEvents = getApiEvents();

async function uploadBOL(userId, PIN, OTP, refNum, billOfLadingURL, callback) { //shipper

    var headerObj = {
        Header: {
            //serviceName: "modifyLetterOfCredit",
            serviceName: "uploadBillOfLading",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            referenceNumber: refNum,
            billOfLadingURL: billOfLadingURL,
            mode: "BC"
        }
    };
    var content = JSON.stringify(contentObj);

    let result;
    try {
        result = await $.ajax({
            type: "POST",
            url: apiUrl +
                "?Header=" +
                header +
                "&" +
                "Content=" +
                content +
                "&" +
                "ConsumerID=TF",
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function getBOLUrl(userId, PIN, OTP, refNum, callback) {
    var headerObj = {
        Header: {
            //serviceName: "modifyLetterOfCredit",
            serviceName: "getBillOfLadingURL",
            userID: userId,
            PIN: PIN,
            OTP: OTP
        }
    };
    var header = JSON.stringify(headerObj);

    var contentObj = {
        Content: {
            referenceNumber: refNum,
            mode: "BC"
        }
    };
    var content = JSON.stringify(contentObj);

    let result;
    try {
        result = await $.ajax({
            url: apiUrl + "?Header=" + header + "&" + "Content=" + content + "&" + "ConsumerID=TF",
            type: 'POST',
            data: callback
        });

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function verifyCode(refNum, code) {
    //verify the url provided by importer and url submiited by shipper 
    //after verification succeed, update status to "goods collected"
    //const readyToCollect = await getReadyToCollectLcsShipper();
    const linkFromShipper = await getBOLUrl(userId, PIN, OTP, refNum);
    //var linkObj = JSON.parse(linkFromShipper);
    var links = "";
    var globalErrorId = linkFromShipper.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID;
    if (globalErrorId === "010000") {
        links = linkFromShipper.Content.ServiceResponse.BOL_Details.BOL_record_output.BOL_Link;

        links = JSON.parse(links);
        console.log("verifying");
        console.log(links);

        var bol = links.BillOfLading;
        if (bol === code) {

            return true;


        }
        return false;
    }

    return false;
}

async function verifyQrCodeUI(refNum, code) {
    const result = await verifyCode(refNum, code);
    if (result) {
        var verified = "<div class='btn btn-primary btn-lg' width=100 height=100><i class='fa fa-check'></i> QR Code Verfified !</div>";
        verified += "<p class='font-bold h4 font-bold m-t text-primary'> Customer can collect goods </p>"
        $("#scannerFrame").html(verified);


    } else {
        var verified = "<div class='btn btn-danger btn-lg' width=100 height=100><i class='fa fa-times'></i> Invalid QR Code!</div>";
        verified += "<p class='font-bold h4 font-bold m-t text-danger'>Please scan again </p>"
        $("#scannerFrame").html(verified);
    }

    console.log(result);
}

function readImage() {
    var filesSelected = document.getElementById("filePicker").files; //$('#')[0].files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64

            var result = srcData.split(",");
            document.getElementById("base64textarea").value = result[1];
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

function loadTable() {
    // form values
    var filename = encodeURIComponent($("#filePicker").val().replace("C:\\fakepath\\", ""));
    var partyID = sessionStorage.customerID;
    var documentType = $("#documentType").val();
    var MyBinaryData = $("#base64textarea").val();

    // set request parameters
    var parameters = {
        Filename: filename,
        PartyID: partyID,
        DocumentType: documentType,
        MyBinaryData: MyBinaryData
    };
    parameters = JSON.stringify(parameters);

    // send json to servlet
    $.ajax({
            type: "POST",
            url: "/SMUtBank_CMS/Document?type=store",
            contentType: "application/json",
            dataType: "json",
            data: parameters,
            timeout: 60000,
            beforeSend: function() {
                startTime = new Date().getTime();
                timer = setInterval(function() { updateElapsedTime(); }, 1000);
                $("#elapsedTime").html("<h4>Elapsed Time: 00:00</h4>");
                $('#loadingModal').modal('show');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                showErrorModal("Error invoking service.");
            }
        })
        // receive json response from servlet
        .done(function(response) {
            $('#loadingModal').modal('hide');
            clearInterval(timer);
            if (response.globalErrorId === "010000") { // success code
                $("#document_table_main").show();
                showParameters(response.document);
                document.getElementById("Store").disabled = false;
            } else {
                $("#document_table_main").hide();
                showErrorModal(response.errorText);
            }
        });
}

/* -------------------------------
 * populate table
 */
function showParameters(document) {
    var htmlcode = "";
    htmlcode += "<tr>";
    htmlcode += "<th>Filename</th>";
    htmlcode += "<th>Version</th>";
    htmlcode += "<th>Document Type</th>";
    htmlcode += "<th>Date Uploaded</th>";
    htmlcode += "<th>File Size</th>";
    htmlcode += "<th>Link</th>";
    htmlcode += "</tr>";
    htmlcode += "<tr>";
    htmlcode += "<td id='filename'>" + document.filename + "</td>";
    htmlcode += "<td id='version'>" + document.version + "</td>";
    htmlcode += "<td id='document_type_id'>" + $("#documentType option:selected").text(); + "</td>";
    htmlcode += "<td id='date_uploaded'>" + document.date_uploaded + "</td>";
    htmlcode += "<td id='size'>" + document.size + "</td>";
    htmlcode += "<td id='url'><a class='docLink btn btn-xs btn-primary' href='" + document.url + "' target='_blank'><span class='glyphicon glyphicon-download' aria-hidden='true'></span> Download</a> <button id='deleteDocument' type='button' class='btn btn-xs btn-danger' name=''><span class='glyphicon glyphicon-trash' aria-hidden='true'></span> Delete</button></td>";
    htmlcode += "</tr>";
    $("#document_table").html(htmlcode);
}

/* -------------------------------
 * delete document
 */
function doDelete() {

    // form values
    var filename = encodeURIComponent($("#filename").text().trim());
    var partyID = $("#partyID").val();
    var documentType = $("#documentType").val();
    var version = $("#version").text().trim();

    // set request parameters
    var parameters = {
        Filename: filename,
        PartyID: partyID,
        DocumentType: documentType,
        Version: version
    };
    parameters = JSON.stringify(parameters);

    // send json to servlet
    $.ajax({
            type: "POST",
            url: "/SMUtBank_CMS/Document?type=delete",
            contentType: "application/json",
            dataType: "json",
            data: parameters,
            timeout: 5000,
            error: function(jqXHR, textStatus, errorThrown) {
                showErrorModal("Error invoking service.");
            }
        })
        // receive json response from servlet
        .done(function(response) {
            if (response.globalErrorId === "010000") { // success code
                showSuccessModal("Document deleted successfully.");
                $("#document_table_main").hide();
            } else {
                showErrorModal(response.errorText);
            }
        });
}
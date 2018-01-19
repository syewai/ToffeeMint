/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var operationObj = {
        Pending: {
            status: "pending",
            importer: "view lc",
            exporter: "view lc",
            issuingBank: "view lc",
            advising: "view lc",
        },
        Issued: {
            status: "issued",
            importer: "view lc",
            exporter: "view lc",
            issuingBank: "view lc",
            advising: "view lc",
        },
        Advised: {
            status: "advised",
            importer: "view lc",
            exporter: "approve lc",
            issuingBank: "view lc",
            advising: "view lc",
        },
        Rejected: {
            status: "rejected",
            importer: "modify lc",
            exporter: "view lc",
            issuingBank: "view lc",
            advising: "view lc",
        },
        Acknowledged: {
            status: "acknowledged",
            importer: "view lc",
            exporter: "ship goods",
            issuingBank: "view lc",
            advising: "view lc",
        }
    };
    var operation = JSON.stringify(operationObj);
function operationAndUrlAssigned(status) {
    //this function is to map the operation and url to coresponding status
    
    //var operationMatches = {"pending": ["view lc", "lcDetails"], "issued": ["view lc", "lcDetails"], "rejected": ["modify", "modifyLcDetails"], "advised": "", "accepted": "", "requested to amend": ["modify", "modifyLcDetails"]};
    return operationMatches[status];

}

function operationAndStatusMapping(status,role){
    
}

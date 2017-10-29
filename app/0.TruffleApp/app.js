//Import JSON libraries
const app = require('express')();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 9001;

//Import web3 & truffle libraries
const Web3 = require('web3'),
contract = require("truffle-contract"),
path = require('path')
LetterOfCreditJSON = require(path.join(__dirname, 'build/contracts/LetterOfCredit.json'));


const web3 = new Web3.providers.HttpProvider("http://localhost:8545"),
filePath = path.join(__dirname, 'build/contracts/LetterOfCredit.json');


const LetterOfCredit = contract(LetterOfCreditJSON);
LetterOfCredit.setProvider(web3);

// const testcon = '{"LC_ID":"0000000003","ref_num":"0000000003","creation_datetime":"2015-06-07 15:21:42","status":"Pending","status_details":"","importer_ID":"0000000206","exporter_ID":"0000000222","importer_account_num":"0000000000","exporter_account_num":"0000000000","expiry_date":"2018-07-15","expiry_place":"London","confirmed":"NULL","revocable":"0","available_by":"0","term_days":"90","amount":"1000000","currency":"GBP","applicable_rules":"?","partial_shipments":"0","ship_destination":"Singapore","ship_date":"2018-07-01","ship_period":"90 days","goods_description":"?","docs_required":"?","additional_conditions":"?","sender_to_receiver_info":"?","issuing_bank_id":"ISS000012","advising_bank_id":"AD00015"}';

//Account variables
const account = '0x3706e862f718cc2206f8339e289108294736d8c4';
const gasLimit = 100000000000;

//Starting JSON
app.use(bodyParser.json());

app.listen(PORT, function () {
    console.log("app listening on port: " + PORT);
})


//endpoints

app.get('/lc/createContract/', function(req, res){
    const lcID = req.param("lc_id");    
    const contract = req.param("contract");   

    createLetterOfCredit(lcID ,contract).then(function(result) {
        res.status(200).send(result);
        console.log(result);
    });
})

app.get('/lc/getContract/', function (req, res) {
    const lcID =  req.param("lc_id");  

    getLetterOfCredit(lcID).then(function(result) {
        res.status(200).send(result);
        console.log(result);
    });
})

app.get('/lc/modifyContract', function (req, res) {
    const lcID = req.param("lc_id");
    const contract = req.param("contract");

    modifyLetterOfCredit(lcID, contract).then(function(result) {
        res.status(200).send(result);
        console.log(result);
    });
})

app.get('/lc/getStatus', function (req, res) {
    const lcID = req.param("lc_id");

    getLCStatus(lcID).then(function(result) {
        res.status(200).send(result);
        console.log(result);
    })
})

app.get('/lc/setStatus', function (req, res) {
    const lcID = req.param("lc_id");
    const stat = req.param("status");

    setLCStatus(lcID, stat).then(function(result) {
        res.status(200).send(result);
        console.log(result);
    });
})




//contract functions exposed

function createLetterOfCredit(lc_id, contract) {
    return new Promise(function(resolve, reject) {
        LetterOfCredit.deployed().then(function(instance) {
            return instance.createLC(lc_id, contract, {from: account, gas: gasLimit });
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log("Error" + error);
            reject(error);
        });  
    })
    
}


function getLetterOfCredit(lcID) {
    return new Promise(function(resolve, reject) {
        LetterOfCredit.deployed().then(function (instance) {
            return instance.getLC.call(lcID)
        }).then(function(result) {              
            resolve(result);
        }).catch(function(error) {
                console.log("Error" + error);
                reject(error);
        });
    })     
}


function modifyLetterOfCredit(lc_id, contract) {
    return new Promise(function(resolve, reject) {
        LetterOfCredit.deployed().then(function(instance) {
            return instance.modifyLC(lc_id, contract, {from: account, gas: gasLimit})
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log("Error" + error);
            reject(error);
        });  
    })
}

function getLCStatus(lc_id) {
    return new Promise(function(resolve, reject) {
        LetterOfCredit.deployed().then(function(instance) {
            return instance.getStatus.call(lc_id)
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log("Error" + error);
            reject(error);
        });
    })
}

function setLCStatus(lc_id, stat) {
    return new Promise(function(resolve, reject) {
        LetterOfCredit.deployed().then(function(instance) {
            return instance.setStatus(lc_id, stat, {from: account, gas: gasLimit})
        }).then(function(result) {
                resolve(result);
        }).catch(function(error) {
            console.log("Error" + error);
            reject(error);
        });
    })
}






/////EVENTS/////

//endpoints
app.get('/lc/events', function (req, res) {
    statusChangeListener().then(function(event) {
        res.status(200).send(event);
    })
})



//event endpoints exposed
function LCCreationListener() {
    LetterOfCredit.deployed().then(function(instance) {
        instance.LCCreated({}, {fromBlock: 0, toBlock: 'latest'}).watch(function(error, event) {
            console.log(event);
        })
    });
}

function LCModifyListener() {
    LetterOfCredit.deployed().then(function(instance) {
        instance.LCModified().watch(function(error, event) {
            console.log(event);
        })
    });
}

function statusChangeListener() {
    return new Promise(function(resolve, reject) {
        LetterOfCredit.deployed().then(function(instance) {
            instance.StatusChanged({}, {fromBlock: 0, toBlock: 'latest'}).watch(function(error, event) {
                console.log(event);
                resolve(event);
            })
        }); 
    })
}


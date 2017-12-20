pragma solidity ^0.4.11;

contract LetterOfCredit {

	//struct 
	struct Docs {
		string billOfExchange;
		string billOfLading;
		bool initialized;
	}

	//contract mappings
	mapping (string => string) contracts;
	mapping (string => string) status; 
	mapping (string => Docs) documents;
	mapping (string => string) amendments; 



	//events
	event LCCreated(string refNum, string contractValues);
	event LCModified(string refNum, string contractValues);
	event StatusChanged(string refNum, string contractStatus);
	event DocumentsModified(string refNum, string contractDocuments);
	event AmendmentsMade(string refNum, string amendJSON);
	// event amendContract(string refNum, string amendmentReq);



	//adding new lc
	function createLC(string refNum, string contractJson) returns(bool set) {
		contracts[refNum] = contractJson;
		status[refNum] = "pending";
		LCCreated(refNum, contractJson);
		return true;
	} 

	//modifying lc
	function modifyLC(string refNum, string contractJson ) returns(bool set) {
		contracts[refNum] = contractJson;
		LCModified(refNum, contractJson);
		return true;
	}

	//set lc status
	function setStatus(string refNum, string stat ) returns(bool changed) {
		status[refNum] = stat;
		StatusChanged(refNum, stat);
		return true;
	}

	//get lc
	function getLC(string refNum) returns(string) {
		return contracts[refNum];
	}

	//get lc status
	function getStatus(string refNum) returns(string) {
		return status[refNum]; 
	}

	//get Amendments
	function getAmendments(string refNum) returns(string) {
		return amendments[refNum];
	}

	//set Amendments
	function amendLC(string refNum, string amendmentReq) returns(bool changed) {
		amendments[refNum] = amendmentReq;
		AmendmentsMade(refNum, amendmentReq);
		return true;
	}

	//get Bill of Exchange
	function getBOE(string refNum) returns(string) {
		return documents[refNum].billOfExchange;
	}

	//set Bill of Exchange
	function setBOE(string refNum, string BOEHash) returns(bool set) {
		documents[refNum].billOfExchange = BOEHash;
		return true;
	}
	
	//get Bill of Lading
	function getBOL(string refNum) returns(string) {
		return documents[refNum].billOfLading;
	}

	//set Bill of Lading
	function setBOL(string refNum, string BOLHash) returns(bool set) {
		documents[refNum].billOfLading = BOLHash;
		return true;
	}
}

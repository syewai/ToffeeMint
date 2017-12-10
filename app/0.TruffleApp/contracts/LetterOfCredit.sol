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

	//events
	event LCCreated(string contractID, string contractValues);
	event LCModified(string contractID, string contractValues);
	event StatusChanged(string contractID, string contractStatus);
	event DocumentsModified(string contractID, string contractDocuments);

	//adding new lc
	function createLC(string contractID, string contractJson) returns(bool set) {
		contracts[contractID] = contractJson;
		status[contractID] = "pending";
		LCCreated(contractID, contractJson);
		return true;
	} 

	//modifying lc
	function modifyLC(string contractID, string contractJson ) returns(bool set) {
		contracts[contractID] = contractJson;
		LCModified(contractID, contractJson);
		return true;
	}

	//set lc status
	function setStatus(string contractID, string stat ) returns(bool changed) {
		status[contractID] = stat;
		StatusChanged(contractID, stat);
		return true;
	}

	//get lc
	function getLC(string contractID) returns(string) {
		return contracts[contractID];
	}

	//get lc status
	function getStatus(string contractID) returns(string) {
		return status[contractID]; 
	}




	//get Bill of Exchange
	function getBOE(string contractID) returns(string) {
		return documents[contractID].billOfExchange;
	}

	//set Bill of Exchange
	function setBOE(string contractID, string BOEHash) returns(bool set) {
		documents[contractID].billOfExchange = BOEHash;
		return true;
	}

	//get Bill of Lading
	function getBOL(string contractID) returns(string) {
		return documents[contractID].billOfLading;
	}

	//set Bill of Lading
	function setBOL(string contractID, string BOLHash) returns(bool set) {
		documents[contractID].billOfLading = BOLHash;
		return true;
	}
}

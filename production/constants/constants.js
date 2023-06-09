export const CONTRACT_ADDRESS = "ADDRESS HERE";
export const BASE_GAS_LIMIT = 70000;
export const HISTORY_BLOCK_BUFFER = 4980;
export const CHAIN_ID = 97;
export const SYMBOL = "TBNB";
export const CONTRACT_ABI = [{
    "inputs": [],
    "stateMutability": "payable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "player",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint8",
        "name": "gameResult",
        "type": "uint8"
    }, {
        "indexed": false,
        "internalType": "string",
        "name": "details",
        "type": "string"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "betAmount",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "winAmount",
        "type": "uint256"
    }],
    "name": "GamePlayed",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "recieved",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "currentBalance",
        "type": "uint256"
    }],
    "name": "RefillEvent",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "uint256",
        "name": "withrowed",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "currentBalance",
        "type": "uint256"
    }],
    "name": "WithdrawnEvent",
    "type": "event"
}, {
    "inputs": [],
    "name": "Paper",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "Refill",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "Rock",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "Scissors",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "minBet",
    "outputs": [{
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}];
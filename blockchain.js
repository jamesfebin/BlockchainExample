const SHA256 = require("crypto-js/sha256");
const cryptico = require('cryptico');

class Transaction {
    constructor(fromAddress, toAddress, amount){
      this.fromAddress = fromAddress;
      this.toAddress = toAddress;
      this.amount = amount;
    }
}

class Blockchain {
 	constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block(Date.parse("2017-01-01"), [], "0");
    }

		generatePassphrase() {
			  function s4() {
			    return Math.floor((1 + Math.random()) * 0x10000)
			      .toString(16)
			      .substring(1);
			   }
			   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}

		generateKeys(){
				var RSAKey = cryptico.generateRSAKey(this.generatePassphrase(), 1024);
				var publicKey = cryptico.publicKeyString(RSAKey);
				var publicKeyID = cryptico.publicKeyID(publicKey);
				return {"RSAKey":RSAKey,"publicKey":publicKey,"publicKeyID":publicKeyID}
		}

}



class Block {
       constructor(timestamp, transactions, previousHash = '') {
       this.previousHash = previousHash;
       this.transactions = transactions;
       this.timestamp = timestamp;
       this.hash = this.calculateHash();
       this.nonce = 0;
    }

		calculateHash() {
	    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
	  }

		mineBlock(difficulty) {
	    while (Array(difficulty + 1).join("0") !== this.hash.substring(0, difficulty)) {
	             this.nonce++;
	             this.hash = this.calculateHash();
	    }
	    console.log("A NEW BLOCK GOT MINED");
	  }
	}

blockchain = new Blockchain();
console.log(blockchain.generateKeys());

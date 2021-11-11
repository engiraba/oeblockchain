
import { hashCode } from "./hascode";

export class Block {

    previousHash = {};
    blockHash = {};
    transactions : string[] = [];
    contens = {};
  
    constructor(previousHash : {}, transactions : string[]) {
  
      this.previousHash = previousHash;
      this.transactions = transactions;
  
      this.contens = {transactions, previousHash};
      this.blockHash = hashCode(this.contens);
  
    }

    public getBlockHash() {

        return this.blockHash;

    }

    public getTransactions() {

        return this.transactions;

    }

    public getPreviousHash() {

        return this.previousHash;

    }
  
  }
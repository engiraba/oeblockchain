
import { hashCode } from "./hascode";

export class Block {
    previousHash = {};
    blockHash = {};
    transactions : string[] = [];
    timestamp: Date;

    constructor(previousHash : {}, transactions : string[]) {
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.timestamp = new Date;
        this.blockHash = hashCode(this.transactions);
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

export interface Blockchain {
    blockchain: Block[];
}

export interface AppState  {
    blocks: any;
}
import { Component, OnInit } from '@angular/core';
import { Block } from '../../block';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'oeblockchain';
  hashingTimer = 0;
  blockchain : Block[] = [];
  genesisTransactions = ["x bought 20 tokens from q"];
  hash : any;
  genesisBlock : Block = new Block(0, this.genesisTransactions);
  block : any;
  previousBlock : string = "";

  generateBlock(block? : any){
    this.hashingTimer = 3;
    let countDown = setInterval(() => {
      this.hashingTimer = this.hashingTimer - 1;
      if(this.hashingTimer === 0) {
        clearInterval(countDown)
        let lastBlock = this.blockchain[this.blockchain.length - 1];
        let newChain : string[] = lastBlock.getTransactions();
        let newTransaction : string = this.generateTransaction();
        this.hash ? newChain.push(this.hash) : newChain.push(newTransaction);
        let newBlock = new Block(this.block, newChain);
        this.blockchain.push(newBlock);
        this.block = this.blockchain[this.blockchain.length - 1].getBlockHash();
      }
    }, 1000)
    
  }

  randomIntFromInterval(min : number, max : number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  generateTransaction() : string {

    let a = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    let b = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    let actionList = [
      "sold",
      "bought"
    ];
    var action = actionList[Math.floor(Math.random()*actionList.length)];
    let rndInt = this.randomIntFromInterval(1, 100);
    let toOrFrom = '';
    action == 'Sold' ? toOrFrom = ' to ' : toOrFrom = ' from ';
    return a + ' ' + action + ' ' + rndInt + ' tokens' + toOrFrom + b;

  }


  onSubmit(form : any)  {
    this.generateBlock();
    this.hash = '';
  }

  ngOnInit() {
    this.blockchain = [new Block(0, this.genesisTransactions)];
    this.block = this.blockchain[0].getBlockHash();
  }

}

import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Block } from './block';
import { hashCode } from './hascode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'oeblockchain';
  blockchain : Block[] = [];
  genesisTransactions = ["x  q"];
  hash : any;
  genesisBlock : Block = new Block(0, this.genesisTransactions);
  block : any;
  previousBlock : string = "";

  generateBlock(block? : any){

    let lastBlock = this.blockchain[this.blockchain.length - 1];
    let newChain : string[] = lastBlock.getTransactions();
    newChain.push('test');
    let newBlock = new Block(this.block, newChain);
    this.blockchain.push(newBlock);
    this.block = this.blockchain[this.blockchain.length - 1].getBlockHash();
    
  }

  onSubmit(form : any)  {

    alert('submited');

  }

  ngOnInit() {
    this.blockchain = [new Block(0, this.genesisTransactions)];
    // this.block = hashCode(this.blockchain[0].toString());
    this.block = this.blockchain[0].getBlockHash();


  }

}

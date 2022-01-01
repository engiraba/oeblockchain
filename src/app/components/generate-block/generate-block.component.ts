import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, Block } from 'src/app/block.model';
import * as BlockActions from '../../block.actions';

@Component({
  selector: 'app-generate-block',
  templateUrl: './generate-block.component.html',
  styleUrls: ['./generate-block.component.scss']
})
export class GenerateBlockComponent implements OnInit {
  hashingTimer = 0;
  blockchain : Block[] = [];
  genesisTransactions: string[] = [];
  hash : any = '';
  block : any;
  previousBlock : string = "";

  // from store
  blocks$: Observable<any>;
  blockchainstore: any;

  // Store initialization
  constructor(private store : Store<AppState>) {
    this.blocks$ = this.store.select('blocks');
  }

 // Generate the first block of the chain on init
 ngOnInit() {
  this.blockchain = [new Block(0, [ this.generateTransaction() ])];
  this.store.dispatch(new BlockActions.GetNewBlock(this.blockchain[0]))
  this.block = this.blockchain[0].getBlockHash();
  this.blocks$.subscribe(o => {
    this.blockchainstore = o;
  })
}

// Generate the next block 
onSubmit(form : any)  {
  this.generateBlock(); 
}

generateBlock(block? : any){
  this.hashingTimer = 3;
  let countDown = setInterval(() => {
    this.hashingTimer = this.hashingTimer - 1;
    if(this.hashingTimer === 0) {
      clearInterval(countDown)
      let lastBlock = this.blockchain[0];
      let newChain : string[] = lastBlock.getTransactions();
      let newTransaction : string = this.generateTransaction();
      this.hash ?
        newChain = [this.hash, ...newChain] : 
        newChain = [newTransaction.toString(), ...newChain];
      let newBlock = new Block(this.block, newChain);
      this.blockchain.unshift(newBlock);
      this.block = this.blockchain[0].getBlockHash();
      this.store.dispatch(new BlockActions.GetNewBlock(newBlock))
      this.hash = '';
    }
  }, 1000)

}

randomIntFromInterval(min : number, max : number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// TODO temporary mock transactions
generateTransaction() : string {
  let a = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5).toUpperCase();
  let b = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5).toUpperCase();
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
}

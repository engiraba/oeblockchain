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
    
    blockchain : Block[] = [];
    block : any;

    status = {
      autoHashing : false,
      hashing : false,
      hashingTimer: 0,
      hash : ''
    }
    

    // from store
    blocks$: Observable<any>;
    blockchainstore: any;

    // Store initialization
    constructor(private store : Store<AppState>) {
      this.blocks$ = this.store.select('blocks');
    }

  // Generate the first block of the chain on init
  ngOnInit() {    
    this.blocks$.subscribe(o => {
      this.blockchainstore = o;
      if (!o.blockchain.length) {
        this.blockchain = [new Block(0, [ this.generateTransaction() ])];
        this.store.dispatch(new BlockActions.GetNewBlock(this.blockchain[0]))
        this.block = this.blockchain[0].getBlockHash();        
      } else {
        this.status = o.status;
      }
    })
  }

  // Change hashing status
  updateHashingStatus(type: string, newValue: any) {
    switch (type) {
      case 'hash':
        this.status = {...this.status, hash: newValue};
        break;       
      case 'autoHashing':
        this.status = {...this.status, autoHashing: newValue};
        break;       
      case 'hashingTimer':
        this.status = {...this.status, hashingTimer: newValue};
        break;      
      case 'hashing':
        this.status = {...this.status, hashing: newValue};
        break;
    }
    this.store.dispatch(new BlockActions.UpdateStatus(this.status))
  }

  // Generate the next block 
  onSubmit()  {
    (this.status.autoHashing || this.status.hashing) ? '' : this.generateBlock(); 
  }

  autoGenerate(block? : any) {
    this.updateHashingStatus('autoHashing', !this.status.autoHashing);
    this.doGenerateNewBlocks();  
  }

  doGenerateNewBlocks() {
    this.status.autoHashing ? this.generateBlock() : '';
  }

  generateBlock(block? : any){
    this.updateHashingStatus('hashingTimer', Math.round(3 + (this.blockchainstore.blockchain.length * 0.45)));
    this.status.hashingTimer > 20000 ? 
    this.updateHashingStatus('hashingTimer', 20000) : 
    this.updateHashingStatus('hashingTimer', this.status.hashingTimer);
    this.status.hash ? 
    this.updateHashingStatus('hashing', false) : 
    this.updateHashingStatus('hashing', true);
    let countDown = setInterval(() => {
      this.updateHashingStatus('hashingTimer', this.status.hashingTimer - 1);
      if(this.status.hashingTimer === 0) {
        clearInterval(countDown)
        
        let lastBlock = this.blockchainstore.blockchain[0];
        let newChain : string[] = lastBlock.getTransactions();
        let newTransaction : string = this.generateTransaction();

        (this.status.hash && (!this.status.autoHashing || this.status.hashing)) ?
        newChain = [this.status.hash, ...newChain] : 
        newChain = [newTransaction.toString(), ...newChain];

        let newBlock = new Block(this.block, newChain);

        this.blockchain.unshift(newBlock);
        this.block = this.blockchain[0].getBlockHash();
        this.store.dispatch(new BlockActions.GetNewBlock(newBlock));
        (this.status.hash && (this.status.autoHashing || this.status.hashing)) ? 
        this.updateHashingStatus('hash', this.status.hash) : 
        this.updateHashingStatus('hash', '');
        this.updateHashingStatus('hashing', false);
        this.status.autoHashing ? this.doGenerateNewBlocks() : '';   
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

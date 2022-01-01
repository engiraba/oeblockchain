import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/block.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @Input() limit = 100;

  //from store
  blocks$: Observable<any>;
  blockchainstore: any;

  // Store initialization
  constructor(private store : Store<AppState>) {
    this.blocks$ = this.store.select('blocks');
  }

  ngOnInit(): void {
    this.blocks$.subscribe(o => {
      this.blockchainstore = o;
    })
  }

}

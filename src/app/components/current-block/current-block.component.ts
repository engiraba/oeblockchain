import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, Block } from '../../block.model';

@Component({
  selector: 'app-current-block',
  templateUrl: './current-block.component.html',
  styleUrls: ['./current-block.component.scss']
})
export class CurrentBlockComponent implements OnInit {

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

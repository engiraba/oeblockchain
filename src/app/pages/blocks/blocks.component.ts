import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

interface AppState  {
  blocks: any;
}

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {
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

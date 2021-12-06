import { Component, OnInit } from '@angular/core';
import { Block } from '../../block';

@Component({
  selector: 'app-current-block',
  templateUrl: './current-block.component.html',
  styleUrls: ['./current-block.component.scss']
})
export class CurrentBlockComponent implements OnInit {
  block=0;

  constructor() { }

  ngOnInit(): void {
  }

}

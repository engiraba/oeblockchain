import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBlockComponent } from './current-block.component';

describe('CurrentBlockComponent', () => {
  let component: CurrentBlockComponent;
  let fixture: ComponentFixture<CurrentBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionViewComponent } from './auction-view.component';

describe('AuctionViewComponent', () => {
  let component: AuctionViewComponent;
  let fixture: ComponentFixture<AuctionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

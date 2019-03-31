import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionAdminComponent } from './auction-admin.component';

describe('AuctionAdminComponent', () => {
  let component: AuctionAdminComponent;
  let fixture: ComponentFixture<AuctionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

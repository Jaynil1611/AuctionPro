import { TestBed } from '@angular/core/testing';

import { AuctionService } from './auction.service';

describe('AuctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuctionService = TestBed.get(AuctionService);
    expect(service).toBeTruthy();
  });
});

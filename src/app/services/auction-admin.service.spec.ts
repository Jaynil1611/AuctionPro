import { TestBed } from '@angular/core/testing';

import { AuctionAdminService } from './auction-admin.service';

describe('AuctionAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuctionAdminService = TestBed.get(AuctionAdminService);
    expect(service).toBeTruthy();
  });
});

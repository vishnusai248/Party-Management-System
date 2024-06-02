import { TestBed } from '@angular/core/testing';

import { PartyserviceService } from './partyservice.service';

describe('PartyserviceService', () => {
  let service: PartyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

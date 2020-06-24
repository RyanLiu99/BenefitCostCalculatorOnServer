import { TestBed } from '@angular/core/testing';

import { CostCalculateOnserverService } from './cost-calculate-onserver.service';

describe('CostCalculateOnserverService', () => {
  let service: CostCalculateOnserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostCalculateOnserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

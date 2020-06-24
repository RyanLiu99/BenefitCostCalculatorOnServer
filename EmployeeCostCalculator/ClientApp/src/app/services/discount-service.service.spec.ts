import { TestBed } from '@angular/core/testing';
import { DiscountService } from './discount-service';

describe('DiscountServiceService', () => {
  let service: DiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply discount when name start A', () => {
    let result = service.applyDiscount('Austen', 100)
    expect(result).toBe(90);
  });

  it('should not apply discount when name not start A', () => {
    let result = service.applyDiscount('Ryan', 100)
    expect(result).toBe(100);
  });


});

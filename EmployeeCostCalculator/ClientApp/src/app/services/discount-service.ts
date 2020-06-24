import { Injectable } from '@angular/core';
import { DiscountRule } from '../models/discount-rule';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private readonly discountRules: DiscountRule[];

  constructor() {
    this.discountRules = [
      new DiscountRule(
        name => name.toLocaleLowerCase().startsWith('a'), 0.1)
    ];
  }

  //TODO: better use Person so can apply other rules
  public applyDiscount(name: string, cost: number): number {
    let result = cost;
    this.discountRules.forEach(r => {
      result = r.applyDiscount(name, result);
    });
    return result;
  }
}

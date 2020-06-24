import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';
import { DiscountService } from './discount-service';
import { CostConfiguration } from './cost-configuration';
import { ICostCalculateService } from './ICostCalculateService';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'any'
})
export class CostCalculateService implements ICostCalculateService {

  constructor(private discountService: DiscountService) {
  }

  calculatePayCheckCost(emp: Employee): Observable<number> {
    const annualCost = this.calculateAnnualCost(emp);
    return of(Math.round(annualCost * 100 / 26) / 100);
  }

  private calculateAnnualCost(emp: Employee): number {
    let employeeCost = this.discountService.applyDiscount(emp.name,
      CostConfiguration.employeeAnnualCost);

    let dependents = emp.children?.length ? [...emp.children] : [];
    const hasSpouse = !!emp.spouseName?.trim();
    if (hasSpouse) {
      dependents.push(emp.spouseName);
    }

    let dependentsCost = this.calculateDependentsAnnualCost(dependents);
    return employeeCost + dependentsCost;
  }

  private calculateDependentsAnnualCost(dependents: string[]): number {
    return dependents.map(d => this.calculateDependentAnnualCost(d))
      .reduce((p, c) => p + c, 0);
  }

  private calculateDependentAnnualCost(name: string): number {
    return this.discountService.applyDiscount(name, CostConfiguration.dependentAnnualCost);
  }
}

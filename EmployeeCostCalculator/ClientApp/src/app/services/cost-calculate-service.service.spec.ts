import { TestBed } from '@angular/core/testing';
import { CostCalculateService } from './cost-calculate-service';
import { Employee } from '../models/Employee';

describe('CostCa', () => {
  let service: CostCalculateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostCalculateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apply discount when employee name start with A', () => {
    const emp = new Employee(1, "Austen");
    let result = service.calculatePayCheckCost(emp);
    expect(result).toBe(Math.round(90000 / 26) / 100);
  });


  it('should NOT apply discount when employee name not start with A', () => {
    const emp = new Employee(1, "Ryan");
    let result = service.calculatePayCheckCost(emp);
    expect(result).toBe(Math.round(100000 / 26) / 100);
  });

  it('should apply spouse discount when spouse name starts with A', () => {
    const emp = new Employee(1, "Ryan");
    emp.spouseName = "Allen";
    let result = service.calculatePayCheckCost(emp);
    let expected = Math.round((1000 + 450) * 100 / 26) / 100;
    expect(result).toBe(expected);
  });

  it('should calculate cost correctly when both spouse children included', () => {
    const emp = new Employee(1, "Ryan");
    emp.spouseName = "wife";
    emp.children = ["C1", "A2"];
    let result = service.calculatePayCheckCost(emp);
    let expected = Math.round((1000 + 500 + 500 + 450) * 100 / 26) / 100;
    expect(result).toBe(expected);
  });
});

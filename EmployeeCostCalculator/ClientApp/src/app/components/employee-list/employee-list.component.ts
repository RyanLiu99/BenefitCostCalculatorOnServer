import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { CostCalculateOnserverService } from 'src/app/services/cost-calculate-onserver.service';
//import { CostCalculateService } from 'src/app/services/cost-calculate-service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[];
  addEmpErrorMsg: string;
  private empSubscription: Subscription;
  constructor(
    private employeeService: EmployeeService,
    private costCalculateService: CostCalculateOnserverService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngOnDestroy(): void {
    this.empSubscription?.unsubscribe();
  }

  removeEmployee(employee: Employee) {
    this.employeeService.removeEmployee(employee).then(
      (removed) => {
        if (!!removed) {
          this.loadEmployees()
        }
      }
    )
  }

  calculateCost(emp: Employee) {
    let subscription = this.costCalculateService.calculatePayCheckCost(emp).subscribe(cost =>{
      emp.cost = cost;
    },  undefined, () => {subscription?.unsubscribe()});
  }

  private loadEmployees() {
    this.empSubscription = this.employeeService.getEmployees().subscribe(
      employees => {
        this.employees = employees;
      }
    )
  }
}

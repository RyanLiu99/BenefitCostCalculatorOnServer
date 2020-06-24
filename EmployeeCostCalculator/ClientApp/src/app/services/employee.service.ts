import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';
import { Observable, of } from 'rxjs';
import { CollectionUtilities } from './collection-utilities';

@Injectable({
  providedIn: 'root'
})

//TODO: define an interface
export class EmployeeService {

  private employees: Employee[];

  constructor() {
    this.populateMockData();
  }

  public submitEmployee(employee: Employee): Promise<string> {
    if (!employee) {
      //TODO: better way to do error handling
      return Promise.reject("Employee is not provided when attempt to remove it");
    }

    if (!employee.id) { //add new employee
      return this.addEmployee(employee);
    } else {
      return this.updateEmployee(employee)
    }
  }

  private addEmployee(employee: Employee): Promise<string> {
    if (!!this.employees.find(e => this.isSameEmployee(employee, e))) {
      return Promise.reject(`Employee ${employee.toString()} already exists!`);
    } else {
      this.employees.push(employee);
      employee.id = this.employees.length; //hack. and employee Id starts with 1.
      return Promise.resolve("Employee added.");
    }
  }

  private updateEmployee(employee: Employee): Promise<string> {
    let existingEmployee = this.employees.find(emp => emp.id === employee.id);
    if (!existingEmployee) {
      return Promise.reject(`Employee with Id ${employee.id} does not exist.`); //TODO: not show ID to end user
    } else {
      this.employees[employee.id - 1] = employee; //hack.. should update serve
      return Promise.resolve("Employee updated.");
    }
  }

  //fake initial data
  public getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  public getEmployee(empId: number): Promise<Employee> {
    let employees = this.employees.filter(e => e.id === empId);

    if (employees.length === 1) {
      return Promise.resolve(employees[0]);
    } else if (employees.length === 0) {
      return Promise.reject(`Employee with Id ${empId} does not exist!`);
    } else {
      return Promise.reject(`Error!! There are multiple employees with Id ${empId}!`);
    }
  }

  //fake server logic
  public removeEmployee(employee: Employee): Promise<number> {
    let removed = CollectionUtilities.removeItemsByFilter(this.employees,
      emp => this.isSameEmployee(emp, employee));
    return Promise.resolve(removed);
  }

  //fake logic
  private isSameEmployee(employee1: Employee, employee2: Employee): boolean {
    return employee1.name?.toLowerCase() == employee2.name?.toLowerCase();
  }

  private populateMockData() {
    const emp1 = new Employee(1, "Ryan Liu");
    emp1.spouseName = "Fei";
    emp1.children = ["Tom Liu", "Drew Liu"];

    const emp2 = new Employee(2, "Thomas Kai");
    this.employees = [
      emp1, emp2
    ];
  }
}

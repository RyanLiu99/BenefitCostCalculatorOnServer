import { CostConfiguration } from '../services/cost-configuration';

export class Employee {
  public spouseName: string;
  public children: string[] =[];

  //TODO: create view model and move those properties to it
  public cost: number;
  public get balance(): number{
    if(isNaN(this.cost)) return null;
    return CostConfiguration.paycheckSalary - this.cost;
  }
  constructor(
    public id: number, // id should be immutable
    public name: string,
  ) {
  }

  public get childrenNames() {
    if (!this.children || this.children.length === 0) {
      return '';
    }
    return this.children.toString();
  }

}

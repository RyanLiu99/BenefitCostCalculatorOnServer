import { Employee } from "../models/Employee";
import { Observable } from 'rxjs';

export interface ICostCalculateService {
  calculatePayCheckCost(emp: Employee): Observable<number>
}

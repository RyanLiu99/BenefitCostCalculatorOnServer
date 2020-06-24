import { Injectable, Inject } from '@angular/core';
import { ICostCalculateService } from './ICostCalculateService';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CostCalculateOnserverService implements ICostCalculateService {

  constructor(private http: HttpClient,
     @Inject('BASE_URL') private baseUrl: string) {

  }
  calculatePayCheckCost(emp: Employee): Observable<number> {
    console.debug(emp);
    let cost = this.http.post<number>(this.baseUrl + 'CalculateCost', emp);
    console.debug(cost);
    return cost;
  }
}

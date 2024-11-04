import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../contracts/Employee.contract';

@Injectable({
  providedIn: 'root'
})
export class AssigntesterserviceService {
  private apiUrl = 'http://localhost:8080/organisation/projectManagerlogin/home';
  constructor(private http: HttpClient) {}

  assignProjectToTester(projectId: number, employees: Employee[]): Observable<string> {
    const url = `${this.apiUrl}/assignToTester/${projectId}`;
    return this.http.post<string>(url, employees, { responseType: 'text' as 'json' });
  }
}

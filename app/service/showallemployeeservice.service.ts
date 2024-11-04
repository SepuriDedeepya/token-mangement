import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../contracts/Employee.contract';


@Injectable({
  providedIn: 'root'
})
export class ShowallemployeeserviceService {

  private baseUrl = 'http://localhost:8080/organisation/projectManagerlogin/home/showAllEmployee'; // Replace with your backend server URL

  constructor(private http: HttpClient) {}

  showAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }
}

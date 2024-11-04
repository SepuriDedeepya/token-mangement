import { Injectable } from '@angular/core';
import { Project } from '../contracts/Project.contract';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../contracts/Employee.contract';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {
  private apiUrl = 'http://localhost:8080/organisation/projectManagerlogin/home/registerEmployee'; 
  constructor(private http: HttpClient) {}

  registerEmployee(dto:Employee): Observable<any> {
    return this.http.post(this.apiUrl, dto,{responseType:'text'});
  }
}

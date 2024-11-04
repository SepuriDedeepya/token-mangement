import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../contracts/Project.contract';
import { Employee } from '../contracts/Employee.contract';

@Injectable({
  providedIn: 'root'
})
export class AssignprojserviceService {

  private baseUrl = 'http://localhost:8080/organisation/projectManagerlogin/home'; // Replace with your backend server URL

  constructor(private http: HttpClient) {}

  assignProject(proj:number, emp: Employee[]): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(proj,emp);
    
    return this.http.post<any>(`${this.baseUrl}/assignProject/${proj}`,emp );
  }
}

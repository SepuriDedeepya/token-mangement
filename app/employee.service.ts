// src/app/services/developer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tester } from './models/tester.model';
import { Developer } from './models/developer.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/tester/home/getAvailableDevelopers'; // Update this to your actual endpoint

  constructor(private http: HttpClient) { }

  getDevelopers(projectId: number): Observable<Developer[]> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<Developer[]>(`${this.apiUrl}`, { params });
  }
  


 private getTesterProfileUrl = 'http://localhost:8080/tester/home/getTesterProfile';
  getProfile(empName: string , empPass: string): Observable<Tester> {
    const params = new HttpParams()
      .set('empName', empName)
      .set('empPass', empPass);

    return this.http.get<Tester>(this.getTesterProfileUrl, { params });
  }

}


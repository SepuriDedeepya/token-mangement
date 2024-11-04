import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organisation } from '../contracts/Organisation.contract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteprojectserviceService {
  private apiUrl = 'http://localhost:8080/organisation/projectManagerlogin/home';

  constructor(private http: HttpClient) {}

  deleteProject(id: number): Observable<string> {
    const url = `${this.apiUrl}/deleteproject/${id}`;
    return this.http.delete(url, { responseType: 'text' });
}

  deleteEmployee(id: number): Observable<string> {
    const urle = `${this.apiUrl}/deleteemployee/${id}`;
    return this.http.delete(urle, { responseType: 'text' });
  }
}

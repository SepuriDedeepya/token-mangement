import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organisation } from '../contracts/Organisation.contract';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Showprojectmanagerservice {

  private apiUrl = 'http://localhost:8080/organisation/projectManagerlogin/home/getProjectmanagerDetails';

  constructor(private http: HttpClient) {}

  getProjectManagerDetails(): Observable<Organisation> {
    return this.http.get<Organisation>(this.apiUrl);
  }
}

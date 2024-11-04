import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../contracts/Project.contract';

@Injectable({
  providedIn: 'root'
})
export class ShowallprojectserviceService {

  private baseUrl = 'http://localhost:8080/organisation/projectManagerlogin/home/showAllProject'; // Replace with the actual base URL of your backend

  constructor(private http: HttpClient) {}

  showAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8080/tester/home/getProjectsOfTester'; // Update the URL to match your backend

  constructor(private http: HttpClient) {}

  getProjects(testerId: number | null): Observable<Project[]> {
    if (testerId === null) {
      throw new Error('Tester ID must be provided.');
    }

    const params = new HttpParams().set('testerId', testerId);

    return this.http.get<Project[]>(this.apiUrl, { params });
  }

}

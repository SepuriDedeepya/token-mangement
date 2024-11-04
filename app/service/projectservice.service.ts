import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../contracts/Project.contract';

@Injectable({
  providedIn: 'root'
})
export class ProjectserviceService {

  private apiUrl = 'http://localhost:8080/organisation/projectManagerlogin/home/registerProject'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  registerProject(dto:Project): Observable<any> {
    return this.http.post(this.apiUrl, dto,{responseType:'text'});
  }
}

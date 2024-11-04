import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tester } from './models/tester.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/organisation';
  constructor(private http:HttpClient) { }
  
   // project manager login service
   public ProjectManagerLogin(projectManagerName:string,projectManagerPassword:string):Observable<string>{
    let params = new HttpParams()
    .set('projectManagerName', projectManagerName)
    .set('projectManagerPassword', projectManagerPassword);
    return this.http.post<string>(this.apiUrl+'/projectManagerlogin',{},{params, responseType: 'text' as 'json'});
  }

  //developer login
  public DeveloperLogin(employeeName:string,employeePassword:string):Observable<string>{
    let params = new HttpParams()
    .set('employeeName', employeeName)
    .set('employeePassword', employeePassword);
    return this.http.post<string>(this.apiUrl+'/developerlogin',{},{params, responseType: 'text' as 'json'});
  }
 //tester login
 public TesterLogin(employeeName:string,employeePassword:string):Observable<Tester>{
  let params = new HttpParams()
  .set('employeeName', employeeName)
  .set('employeePassword', employeePassword);
  return this.http.post<Tester>(this.apiUrl+'/testerlogin',{},{params, responseType: 'text' as 'json'});
}


}

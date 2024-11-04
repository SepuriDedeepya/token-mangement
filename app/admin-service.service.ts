import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {
  private apiUrl = 'http://localhost:6009/admin/login';
  constructor(private http:HttpClient) { }

  public Login(admin_name:string,admin_password:string):Observable<string>{
    let params = new HttpParams()
    .set('admin_name', admin_name)
    .set('admin_password', admin_password);
    return this.http.post<string>(this.apiUrl,{},{params, responseType: 'text' as 'json'});
  }
}

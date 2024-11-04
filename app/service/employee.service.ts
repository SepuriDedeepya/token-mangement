import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeLoginDTO } from '../contracts/employee-login-dto.model'; 
import { EmployeeDetailsDTO } from '../contracts/employee-details-dto.model';
import { ProjectAtLoginDTO } from '../contracts/projects-details-dto.model'; 
import { TicketDTO } from '../contracts/ticket-details-dto.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  

  constructor(private http: HttpClient) {}
  private getHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  // Method to get employee details
  getEmployeeDetails(login: { employeeName: string, employeePassword: string }): Observable<EmployeeDetailsDTO> {
    
    return this.http.post<EmployeeDetailsDTO>('http://localhost:8080/organisation/developerlogin/Home/getEmployeeDetails', login,this.getHeaders());
  }
  
  getProjectsForEmployee(loginData: { employeeName: string; employeePassword: string }): Observable<ProjectAtLoginDTO> {
    return this.http.post<ProjectAtLoginDTO>('http://localhost:8080/organisation/developerlogin/Home/projects', loginData,this.getHeaders());
  }

  getTicketsForEmployee(loginData: EmployeeLoginDTO): Observable<TicketDTO[]> {
    return this.http.post<TicketDTO[]>('http://localhost:8080/organisation/developerlogin/Home/Tickets', loginData,this.getHeaders());
  }

  updateProjectStatus(employeeId: number,selectedStatus:number): Observable<any> {
    // Assuming your API endpoint for updating status is similar to this
    console.log("empid "+employeeId);
    console.log("count "+selectedStatus);
    const params = new HttpParams()
    .set('employeeId', employeeId)
    .set('selectedStatus', selectedStatus);
    return this.http.put('http://localhost:8080/organisation/developerlogin/Home/update-project-status', null, { params: params, ...this.getHeaders() });
  }
  updateTicketStatus(ticket: TicketDTO): Observable<any> {
    return this.http.put('http://localhost:8080/organisation/developerlogin/Home/update-ticket-status', ticket,this.getHeaders());
  }

  getCompletedTickets(loginData: { employeeName: string; employeePassword: string; }): Observable<TicketDTO[]> {
    return this.http.post<TicketDTO[]>('http://localhost:8080/organisation/developerlogin/Home/completed',loginData,this.getHeaders());
  }
  // // Method to update the project status
  // updateProjectStatus(projectId: number, status: number): Observable<any> {
  //   const payload = { projectId, status }; // Create payload based on your backend expectations
  //   return this.http.put('http://localhost:4041/Developer/Home/projectUpdate', payload); // Adjust endpoint as needed
  // }

  // updateProjectStatus(projectId: number, action: number): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/project/${projectId}/status`, { action });
  // }
}


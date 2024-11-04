// src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './models/ticket.model';
@Injectable({
  providedIn: 'root'
})
export class TicketService {





  private apiUrl = 'http://localhost:8080/tester/home/showAllAvailableTickets'; // Update this to your actual endpoint

  constructor(private http: HttpClient) { }




  getTickets(projectId:number): Observable<Ticket[]> {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<Ticket[]>(this.apiUrl, { params });

  }



  private allTicketsUrl = 'http://localhost:8080/tester/home/getAllTickets';
  getAllTickets(): Observable<Ticket[]> {
   
    return this.http.get<Ticket[]>(this.allTicketsUrl);

  }


  private assignTicketsUrl = 'http://localhost:8080/tester/home/assignTicket';

 // asssiging tickets
 assignTicketTo(ticketId: number, employeeId:number,projectId:number): Observable<any> {
  console.log("TICKET ID"+ticketId);
  console.log("DEV ID"+employeeId);
  console.log("PROJ ID"+projectId);

  // Create HttpParams and append parameters
  let params = new HttpParams()
    .set('ticketId', ticketId)
    .set('employeeId', employeeId)
    .set('projectId',projectId);


  const headers = new HttpHeaders({
    'Content-Type': 'application/json' // This can be omitted for GET requests
  });

  return this.http.post(this.assignTicketsUrl, null, { headers, params });

}


  private createTicketUrl = 'http://localhost:8080/tester/home/registerTicket';
  createTicket(ticketData: Ticket,projectId:number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let params = new HttpParams().set('projectId', projectId.toString());
    console.log(ticketData);
    
   
    return this.http.post<any>(this.createTicketUrl, ticketData, { headers, params });
  }

  private deleteTicketUrl='http://localhost:8080/tester/home/deleteTicketById';
  deleteTicket(ticketId: number): Observable<void> {
    const options = {
      params: { ticketId: ticketId } // Use request parameter
    };
    
    return this.http.delete<void>(this.deleteTicketUrl, options);
  }
  


}

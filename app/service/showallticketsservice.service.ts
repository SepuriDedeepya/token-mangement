import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../contracts/Ticket.contact';

@Injectable({
  providedIn: 'root'
})
export class ShowallticketsserviceService {

  private baseUrl = 'http://localhost:8080/organisation/projectManagerlogin/home/showAllTicket'; // Replace with your backend server URL

  constructor(private http: HttpClient) {}

  showAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl);
  }
}

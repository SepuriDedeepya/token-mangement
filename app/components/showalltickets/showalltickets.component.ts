import { Component, OnInit } from '@angular/core';
import { ShowallticketsserviceService } from '../../service/showallticketsservice.service';
import { Ticket } from '../../contracts/Ticket.contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showalltickets',
  templateUrl: './showalltickets.component.html',
  styleUrls: ['./showalltickets.component.css']
})
export class ShowallticketsComponent  implements OnInit {
  tickets: Ticket[] = [];
  errorMessage = '';

  constructor(private showAllTicketsService: ShowallticketsserviceService,private router: Router) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.showAllTicketsService.showAllTickets()
      .subscribe(
        (data: Ticket[]) => {
          this.tickets = data;
        },
        error => {
          this.errorMessage = 'Failed to load tickets.';
          console.error(error);
        }
      );
  }
  goToProjectManager() {
    this.router.navigate(['/projectmanager']);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-createticket',
  templateUrl: './createticket.component.html',
  styleUrls: ['./createticket.component.css']
})
export class CreateticketComponent {
  ticketName: string = '';
  ticketDescription: string = '';

  onSubmit(): void {
    console.log({ ticketName: this.ticketName, ticketDescription: this.ticketDescription });
    // Handle form submission, e.g., call a service to save the ticket
  }
}
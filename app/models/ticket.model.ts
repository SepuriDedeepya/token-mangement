// src/app/models/ticket.model.ts
export interface Ticket {
    ticketId: number;
    ticketName: string;
    ticketDescription: string;
    ticketAssignTo?: string; // Optional
    ticketCreatedDate?: string; // Optional, assuming it's a date string
    ticketUpdatedDate?: string; // Optional
    ticketEstimatedTime?: number; // Optional
    showTicket?: boolean; // Optional
    status?: number; // Optional
    selectedDeveloper:number | null;
  }
  
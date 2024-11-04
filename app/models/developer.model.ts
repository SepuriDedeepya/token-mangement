import { Ticket } from "./ticket.model";

export interface Developer{
      employeeId:number;

employeeName:number;

employeeDesignation:number;

employeePassword:number;

 employeePhoneno:number;

employeeEmail:string;

isEmployeeAvailable:boolean;
tickets:Ticket[]; 
}
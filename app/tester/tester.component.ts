import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { TicketService } from '../ticket.service';
import { Ticket } from '../models/ticket.model';
import { Developer } from '../models/developer.model';
import { Project } from '../models/project.model';
import { ProjectService } from '../project.service';
import { Tester } from '../models/tester.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css']
})
export class TesterComponent implements OnInit {
  
  id=0;
  isSideMenuOpen = false; // State to track side menu visibility
  createTicketForm: FormGroup; // Form group for creating a ticket
  isCreatingTicket = false; // State to track ticket creation form visibility
  isAssigningTicket = false;
  isManagingTicket=false;
  isShowingProjects=false;
  showProfile=true;
  testerId:number=0;
  pId:number=0;
  devId:number=0;
 
   




  // Options for the dropdown
 
  tickets: Ticket[] = [];
  developers:string[]=[];
  developer:any;
  developerrs:Developer[]=[];
  projects: Project[] = [];
  employeeData: any;
  public empName:string | null='';
  public empPass:string | null='';
  public tester:Tester={
    employeeId: 0,
  employeeName: "",
  employeeDesignation: "",
  employeePassword: "",
  employeePhoneno: 0, // Consider using a string if phone numbers can have leading zeros
  employeeEmail: "",
  isEmployeeAvailable: false


};


    

    constructor(private  router:Router,private fb: FormBuilder, private developerService: EmployeeService, private ticketService: TicketService,private projectService: ProjectService) {
      // Initialize the form
      this.createTicketForm = this.fb.group({
        ticketName: ['', Validators.required], // Ticket name field
        ticketDescription: ['', Validators.required], // Ticket description field
        ticketCategory: ['', Validators.required], // Dropdown selection
        developer: ['', Validators.required] 
      });
      
    }

  // Method to toggle the side menu
  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
    this.isCreatingTicket = false; 
    this.isAssigningTicket=false;
    this.isManagingTicket=false;
    this.showProfile=!this.showProfile;
    this.isShowingProjects=false;
  }

  openCreateTicketForm(): void {
    this.isCreatingTicket = true;
    this.showProfile=false;
    this.isAssigningTicket = false; // Close assigning ticket form
  }

  openAssignTicketForm(): void {
    this.isAssigningTicket = true;
    this.loadProjects(this.testerId);
    this.showProfile=false;
    this.isCreatingTicket = false; // Close creating ticket form
    }

   
    ngOnInit(): void {
      this.loadProjects(this.testerId);
      this.fetchTickets();
      this.fetchAllTickets();
      this.showProfile=true;
      this.empName = sessionStorage.getItem('empName');
      this.empPass = sessionStorage.getItem('empPass');
     
  
      if (!this.empName || !this.empPass) {
        console.error('Employee name or password not found in sessionStorage.');
        return; 
      }
  
      this.createTicketForm = this.fb.group({
        ticketName: ['', Validators.required],
        ticketDescription: ['', Validators.required],
      });
  
      this.developerService.getProfile(this.empName, this.empPass).subscribe(
        (data) => {
          this.employeeData = data;
          this.testerId=this.employeeData.employeeId;
          console.log(this.employeeData);
          sessionStorage.setItem("testerId",this.employeeData.testerId);
        },
        (error) => {
          console.error('Error fetching employee data:', error);
          if (error.status === 401) {
            console.error('Unauthorized access - check credentials.');
          } else if (error.status === 404) {
            console.error('Employee not found.');
          } else {
            console.error('Unexpected error:', error);
          }
        }
      );      
      
      //  this.loadProjects(this.tester.employeeId);
      
      this.createTicketForm = this.fb.group({
        ticketName: ['', Validators.required],
        ticketDescription: ['', Validators.required],
      });
     
    }


   


    loadProjects(testerId: number | null): void {
      this.projectService.getProjects(testerId).subscribe(
        (data: Project[]) => {
          this.projects = data; // Assuming the data is an array of projects
          console.log('Projects fetched:', this.projects);
    
          if (this.projects.length > 0) { // Check if projects array is not empty
             const projId: number = this.projects.at(0)?.projectId || 0;
            sessionStorage.setItem("projId",JSON.stringify(projId));
            
            if (projId) { // Check if projId is valid
              this.developerService.getDevelopers(projId).subscribe(
                (devData: Developer[]) => {
                  this.developerrs = devData; // Set the developers list
                  console.log('Developers fetched:', this.developerrs);
                },
                (error) => {
                  console.error('Error fetching developers:', error);
                }
              );
            } else {
              console.error('Project ID is undefined or invalid');
            }
          } else {
            console.error('No projects found');
          }
        },
        (error) => {
          console.error('Error fetching projects:', error);
        }
      );
    }
    


  

  // Method to handle admin actions
  handleAdminAction(action: string): void {
    switch (action) {
      case 'show':
        // this.openCreateTicketForm()
        this.isManagingTicket=false;
        this.isCreatingTicket = false;
        this.isAssigningTicket = false;
        this.isShowingProjects=!this.isShowingProjects;
         this.loadProjects(this.testerId);
        break;
      case 'assign':
        this.openAssignTicketForm(); 
        this.fetchTickets();
        this.isManagingTicket=false;
        this.isShowingProjects=false;
        break;
      case 'manage':
        this.fetchAllTickets();
        this.isCreatingTicket = false;
        this.isAssigningTicket = false;
        this.isManagingTicket=true;
        this.isShowingProjects=false;
        break;
      default:
        console.log('Unknown action');
    }
  }

  fetchTickets(): void {
    const projIdString = sessionStorage.getItem("projId");
    const projId=projIdString ? Number(JSON.parse(projIdString)) : -1;
    this.ticketService.getTickets(projId).subscribe(
      (data: Ticket[]) => {
        this.tickets = data; // Set the tickets list
        console.log('Fetched tickets:', this.tickets);
      },
      (error: any) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }

  fetchAllTickets(): void {
    this.ticketService.getAllTickets().subscribe(
      (data: Ticket[]) => {
        this.tickets = data; // Set the tickets list
        console.log('Fetched tickets:', this.tickets);
      },
      (error: any) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }

  openCreationForm(projectId:number)
  {
    this.isShowingProjects=false;
    this.openCreateTicketForm();
    this.pId=projectId;
  }


  // Method to submit the create ticket form
  onSubmit(): void {
    if (this.createTicketForm.valid) {
      const ticketData = this.createTicketForm.value;

      this.ticketService.createTicket(ticketData,this.pId).subscribe(
        response => {
          window.alert("Ticket  generated successfully!");
          this.createTicketForm.reset();
        },
        error => {
          
          this.createTicketForm.reset();
        }
      );
    } else {
      
    }
  }

  assignTicket(ticketId: number,eeid:number): void {
    const devIdd:number =eeid;
  

    const projIdString = sessionStorage.getItem("projId");
    const projId=projIdString ? Number(JSON.parse(projIdString)) : -1;
    
    this.ticketService.assignTicketTo(ticketId,devIdd,projId).subscribe(
      response => {
        window.alert("Ticket Assigned to "+devIdd);
        this.createTicketForm.reset();
        this.fetchTickets();
      },
      error => {
        window.alert("Ticket Assigned to "+devIdd);
        this.fetchTickets();
      }
    );
    // Here you can also access the selected developer from the corresponding dropdown
  }

  logout() {
    console.log("logout clicked")
    sessionStorage.removeItem('empName');
    sessionStorage.removeItem('empPass');
    sessionStorage.removeItem('projId');
    this.router.navigate(['']); 
  }

  deleteTicket(ticketId: number) {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(ticketId).subscribe(() => {
        // Remove the deleted ticket from the local array
        this.tickets = this.tickets.filter(ticket => ticket.ticketId !== ticketId);
      });
    }
  }

  
}



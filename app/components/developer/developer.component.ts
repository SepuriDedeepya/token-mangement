import { Component, OnInit } from '@angular/core';

import { TicketDTO } from '../../contracts/ticket-details-dto.model';
import { ProjectAtLoginDTO } from '../../contracts/projects-details-dto.model';
import { EmployeeDetailsDTO } from '../../contracts/employee-details-dto.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { EmployeeLoginDTO } from '../../contracts/employee-login-dto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit {
  public empName:string |null ='';
  public empPassword:string | null='';
  employeeLoginData:EmployeeLoginDTO={
    employeeName:"",
    employeePassword:""
  }
  employeeDetails!: EmployeeDetailsDTO;
  assignedProject: ProjectAtLoginDTO | null = null;
  assignedTickets: TicketDTO[] = []; 
  completedTickets: TicketDTO[] = [];
  startedProcessingTickets: TicketDTO[] = [];
  errorMessage: string = '';
  isMenuOpen: boolean = false;
  isAssignedProjects: boolean = false;
  isAssignedTickets: boolean = false;
  isCompletedTickets: boolean = false;
  isModalOpen: boolean = false;
  showModal: boolean = false;
  estimatedDaysInput: number | null = null;
  currentTicket: TicketDTO | null = null;
  
  selectedStatus: number=-1;
  statusKeys: { [key: number]: string } = {
    1: 'ASSIGNED',
    2: 'PROCESSING',
    3: 'COMPLETED'
  };

  Status: { [key: number]: string } = {
    3: 'STARTED',
    4: 'PROCESSING',
    5: 'COMPLETED'
  };

  constructor(private employeeService: EmployeeService,private router:Router) {}

  ngOnInit(): void {
    // this.employeeLoginData = this.sharedService.getEmployeeLoginData();
    this.empName=sessionStorage.getItem('empName');
    this.empPassword=sessionStorage.getItem('empPassword');
    
    if (this.empName || this.empPassword) {
      // console.log("Here i am with name"+this.empName);
      this.employeeLoginData.employeeName = this.empName ?? ''; 
      this.employeeLoginData.employeePassword = this.empPassword ?? ''; 
      this.getEmployeeDetails();
    
    } else {
      this.errorMessage = "No login data available";
    }
    
  }

  getEmployeeDetails(): void {   
    if (this.employeeLoginData) {
   
      this.employeeService.getEmployeeDetails(this.employeeLoginData).subscribe(
        (data: EmployeeDetailsDTO) => {
        if (data) {
          this.employeeDetails = data;
          this.errorMessage = '';
          console.log(this.employeeDetails);
        } else {
          this.errorMessage = 'No details found for this employee.';
          console.log('Received data is null or undefined');
        }
        },
        (error) => {
          
          console.error('Error fetching employee details:', error);
          this.errorMessage = 'Invalid credentials. Please try again.';        
        }
      );
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  showAssignedProjects(): void {
    this.isAssignedProjects = true;
    this.isAssignedTickets = false;
    this.isCompletedTickets = false;
    if (this.employeeLoginData) {
      this.employeeService.getProjectsForEmployee(this.employeeLoginData).subscribe(
        (data) => {
          this.assignedProject = data;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error fetching assigned project:', error);
          this.errorMessage = 'Could not fetch assigned project.';
          this.assignedProject = null;
        }
      );
    } else {
      this.errorMessage = "No login data available";
    }
  }

  getFilteredStatusOptions(): { key: number, value: string }[] {
    const currentAction = +(this.assignedProject?.action || 1);
    const availableStatusOptions: { key: number, value: string }[] = [];

    for (const key in this.statusKeys) {
      if (+key >= currentAction) {
        availableStatusOptions.push({ key: +key, value: this.statusKeys[+key] });
      }
    }

    return availableStatusOptions;
  }

  updateProjectStatus(employeeId: number,selectedStatus:number): void {
    this.getFilteredStatusOptions();
    this.employeeService.updateProjectStatus(employeeId,selectedStatus).subscribe(
      (response) => {
        console.log('Project status updated:', response);
      },
      (error) => {
        console.error('Error updating project status:', error);
      }
    );
  }

  showAssignedTickets(): void {
    this.isAssignedProjects = false;
    this.isAssignedTickets = true;
    this.isCompletedTickets = false;
    if (this.employeeLoginData) {
      this.employeeService.getTicketsForEmployee(this.employeeLoginData).subscribe(
        (data) => {
          this.assignedTickets = data.filter(ticket => ticket.status === 3 || ticket.status === 2 || ticket.status===4);
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error fetching assigned tickets:', error);
          this.errorMessage = 'Could not fetch assigned tickets.';
        }
      );
    } else {
      this.errorMessage = "No login data available";
    }
  }

  onStatusChange(ticket: TicketDTO): void {
    if (ticket.status == 4) { 
      this.currentTicket = ticket;
      this.showModal = true;
    }
  }

  saveEstimatedDays(): void {
    if (this.currentTicket && this.estimatedDaysInput !== null) {
      console.log("----------");
      this.currentTicket.ticketEstimatedTime = this.estimatedDaysInput;
      this.updateTicketStatus(this.currentTicket);
      this.closeModal();
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.estimatedDaysInput = null;
    this.currentTicket = null;
  }

  getFilteredStatusOption(currentStatus: number): { key: number, value: string }[] {
    const availableStatusOptions: { key: number, value: string }[] = [];

    for (const key in this.Status) {
      if (+key >= currentStatus) {
        availableStatusOptions.push({ key: +key, value: this.Status[+key] });
      }
    }

    return availableStatusOptions;
  }

  updateTicketStatus(ticket: TicketDTO): void {
    this.employeeService.updateTicketStatus(ticket).subscribe(
      response => {
        console.log('Ticket status updated:', response);
      },
      error => {
        console.error('Error updating ticket status:', error);
      }
    );
  }

  showCompletedTickets(): void {
    this.isAssignedProjects = false;
    this.isAssignedTickets = false;
    this.isCompletedTickets = true;
    if (this.employeeLoginData) {
      this.employeeService.getCompletedTickets(this.employeeLoginData).subscribe(
        (data: TicketDTO[]) => {
          this.completedTickets = data;
        },
        (error) => {
          console.error('Error fetching completed tickets:', error);
        }
      );
    } else {
      this.errorMessage = "No login data available";
    }
  }
  logout(){
    this.router.navigate(['/home']);
  }
}










































// import { Component, OnInit } from '@angular/core';
// import { SharedService } from '../../services/shared.service';
// import { TicketDTO } from '../../contracts/ticket-details-dto.model';
// import { ProjectAtLoginDTO } from '../../contracts/projects-details-dto.model';
// import { EmployeeDetailsDTO } from '../../contracts/employee-details-dto.model';
// import { EmployeeLoginDTO } from '../../contracts/employee-login-dto.model';
// import { EmployeeService } from '../../services/employee.service';

// @Component({
//   selector: 'app-developer',
//   templateUrl: './developer.component.html',
//   styleUrls: ['./developer.component.css']
// })
// export class DeveloperComponent 
// {
//   // employeeName: string = '';
//   // employeePassword: string = '';
//   employeeDetails:EmployeeDetailsDTO | null =null;
//   assignedProject: ProjectAtLoginDTO | null = null;
//   assignedTickets: TicketDTO[] = []; 
//   completedTickets: TicketDTO[] = [];
//   startedProcessingTickets: TicketDTO[] = [];
//   errorMessage: string = '';
//   isMenuOpen: boolean = false;
//   isAssignedProjects:boolean=false;
//   isAssignedTickets:boolean=false;
//   isCompletedTickets:boolean=false;
//   isModalOpen: boolean = false;
//   //selectedTicket: TicketDTO | null = null;
//   showModal: boolean = false;
//   estimatedDaysInput: number | null = null;
//   currentTicket: TicketDTO | null = null;

//   statusKeys: { [key: number]: string } = {
//     1: 'ASSIGNED',
//     2: 'PROCESSING',
//     3: 'COMPLETED'
//   };

//   Status: {[key: number]: string} = {3: 'STARTED', 4: 'PROCESSING', 5: 'COMPLETED'};//created,assigned,
//   employeeLoginData:EmployeeLoginDTO | null=null;
//   constructor(private employeeService: EmployeeService,private sharedService: SharedService) {}

//   ngOnInit(): void {
//     // this.sharedService.employeeLoginData$.subscribe(data => {
//     //   this.employeeLoginData = data;
//     //   if (this.employeeLoginData) {
//     //     this.employeeName = this.employeeLoginData.employeeName;
//     //     this.employeePassword = this.employeeLoginData.employeePassword;
//     //   }
     
//     // });
  
//     this.login(); 
//   }
    

//   // Method to log in and fetch employee details
//   login(): void {
//     // const loginData: EmployeeLoginDTO = {
//     //   employeeName: this.employeeName,
//     //   employeePassword: this.employeePassword
//     // };
//     const loginData= this.sharedService.getEmployeeLoginData();
//     if(loginData){
//     this.employeeService.getEmployeeDetails(loginData).subscribe(
//       (data:EmployeeDetailsDTO) => {
//         this.employeeDetails = data;
//         this.errorMessage = '';
//       },
//       (error) => {
//         console.error('Error fetching employee details:', error);
//         this.errorMessage = 'Invalid credentials. Please try again.';
//         this.employeeDetails = null; // Clear employee details on error
//       }
//     );
//   }
//   else{
//     this.errorMessage="no login data available";
//   }
//   }
//   toggleMenu(): void {
//     this.isMenuOpen = !this.isMenuOpen;
   
//     // this.isProjectOpen=false;
//   }

//   showAssignedProjects(): void 
//   {
//     this.isAssignedProjects=true;
//     this.isAssignedTickets=false;
//     this.isCompletedTickets=false;
//     const loginData = this.sharedService.getEmployeeLoginData();
//     if(loginData){
//     this.employeeService.getProjectsForEmployee(loginData).subscribe(
    
//       (data) => {
//         this.assignedProject = data;
//         this.errorMessage = '';
//       },
//       (error) => {
//         console.error('Error fetching assigned project:', error);
//         this.errorMessage = 'Could not fetch assigned project.';
//         this.assignedProject = null;
//       }
//     );
//   }else
//   {
//     this.errorMessage="no login data available";
//   }
//   }
  
//   // onStatusChange(project: ProjectAtLoginDTO): void {
//   //   // Optional: Add any logic to handle status change if needed
//   //   console.log('Action changed to:', project.action);
//   // }
//   getFilteredStatusOptions(): { key: number, value: string }[] {
//     const currentAction = +(this.assignedProject?.action || 1);
//     const availableStatusOptions: { key: number, value: string }[] = [];
  
//     // Loop through statusMap and add eligible statuses to availableStatusOptions
//     for (const key in this.statusKeys) {
//       if (+key >= currentAction) {
//         availableStatusOptions.push({ key: +key, value: this.statusKeys[+key] });
//       }
//     }
    
//     return availableStatusOptions;
//   }

//   updateProjectStatus(project: ProjectAtLoginDTO): void {
//     // Call the service to update the project status
//     this.employeeService.updateProjectStatus(project).subscribe(
//       (response) => {
//         console.log('Project status updated:', response);
//       },
//       (error) => {
//         console.error('Error updating project status:', error);
//       }
//     );
//   }
//   showAssignedTickets(): void 
//   {
//     this.isAssignedProjects=false;
//     this.isAssignedTickets=true;
//     this.isCompletedTickets=false;
//     const loginData =this.sharedService.getEmployeeLoginData();
//     if(loginData){

//     this.employeeService.getTicketsForEmployee(loginData).subscribe(
//         (data) => {
//           // Filter tickets to show only those with 'STARTED' (1) or 'PROCESSING' (2) status
//           this.assignedTickets = data.filter(
//             ticket => ticket.status === 3 || ticket.status === 4
//           );
//           this.errorMessage = '';
//           // ticket.ticketUpdatedDate = new Date();
//         },
//         (error) => {
//           console.error('Error fetching assigned tickets:', error);
//           this.errorMessage = 'Could not fetch assigned tickets.';
//         }
//       );
//     }else{
//       this.errorMessage="no login data available";
//     }
//   }
//   onStatusChange(ticket: TicketDTO): void {
//     console.log("entering...");
//     if (ticket.status == 4) { 
//       console.log("status...");
//       // Assuming '2' corresponds to Processing
//       this.currentTicket = ticket;
//       this.showModal = true;
//     }
//   }
//   saveEstimatedDays(): void {
//     if (this.currentTicket && this.estimatedDaysInput !== null) {
//       console.log("----------");
//       this.currentTicket.ticketEstimatedTime = this.estimatedDaysInput;
//       this.updateTicketStatus(this.currentTicket);
//       this.closeModal();
//     }
//   }

//   closeModal(): void {
//     this.showModal = false;
//     this.estimatedDaysInput = null;
//     this.currentTicket = null;
//   }
//   getFilteredStatusOption(currentStatus: number): { key: number, value: string }[] {
//     const availableStatusOptions: { key: number, value: string }[] = [];
    
//     // Loop through statusMap and filter based on currentStatus
//     for (const key in this.Status) {
//       if (+key >= currentStatus) {
//         availableStatusOptions.push({ key: +key, value: this.Status[+key] });
//       }
//     }

//     return availableStatusOptions;
//   }
//   updateTicketStatus(ticket: TicketDTO): void {
//     console.log(ticket.ticketUpdatedDate);
//    // ticket.ticketUpdatedDate = new Date();
//     // Check if the status is changing from STARTED to PROCESSING
//     // if (ticket.status===3||ticket.status===4) { // 2 corresponds to 'PROCESSING'
//     //   const estimatedDays = prompt("Please enter estimated days for processing:", "0");
//     //   if (estimatedDays !== null && !isNaN(+estimatedDays)) {
//     //     ticket.ticketEstimatedTime = +estimatedDays; // Convert to number
//     //   } else {
//     //     alert("Invalid input for estimated days.");
//     //     return; // Exit if the input is invalid
//     //   }
//     // }

//     // Set the updated date to the current date
//    // ticket.ticketUpdatedDate = new Date();

//     this.employeeService.updateTicketStatus(ticket).subscribe(
//       response => {
//         console.log('Ticket status updated:', response);
//       },
//       error => {
//         console.error('Error updating ticket status:', error);
//       }
//     );
//   }

//   showCompletedTickets(): void 
//   {
//     this.isAssignedProjects=false;
//     this.isAssignedTickets=false;
//     this.isCompletedTickets=true;
//     const loginData = this.sharedService.getEmployeeLoginData();
//     if(loginData){

//     this.employeeService.getCompletedTickets(loginData).subscribe(
//       (data: TicketDTO[]) => {
//         this.completedTickets = data;
//       },
//       (error) => {
//         console.error('Error fetching completed tickets:', error);
//       }
//     );
//   }else{
//     this.errorMessage="no login data available";
//   }
//   }  

//   logout(): void {
  
//   }
// }
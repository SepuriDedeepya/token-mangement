import { Component } from '@angular/core';

import { EmployeeserviceService } from '../../service/employeeservice.service';
import { Router } from '@angular/router';
import { Employee } from '../../contracts/Employee.contract';

@Component({
  selector: 'app-createemployee',
  templateUrl: './createemployee.component.html',
  styleUrls: ['./createemployee.component.css']
})
export class CreateemployeeComponent {
  submitted = false;
  responseMessage: string | null = null;
  
  

  constructor(private employeeService: EmployeeserviceService,private router: Router) {}

  onSubmit(form:Employee) {


      // Call the service to register the project
      this.employeeService.registerEmployee(form).subscribe({
        next: (response) => {
          this.responseMessage = response;
          console.log(this.responseMessage);
          this.responseMessage = "Employee registered successfully!";
          this.goToProjectManager(); 
        },
        error: (error) => {
          this.responseMessage = 'Error: ' + (error.error || 'Server error');
        }
      });
    }
    goToProjectManager() {
      this.router.navigate(['/projectmanager']);
    }
}

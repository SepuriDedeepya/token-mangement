import { Component, OnInit } from '@angular/core';
import { Employee } from '../../contracts/Employee.contract';
import { ShowallemployeeserviceService } from '../../service/showallemployeeservice.service';
import { Router } from '@angular/router';
import { DeleteprojectserviceService } from 'src/app/service/deleteprojectservice.service';

@Component({
  selector: 'app-showallemployee',
  templateUrl: './showallemployee.component.html',
  styleUrls: ['./showallemployee.component.css']
})
export class ShowallemployeeComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage = '';
  responsemsg:string| null=null;

  constructor(private showAllEmployeeService: ShowallemployeeserviceService,private router: Router,private deleteprojectserviceService:DeleteprojectserviceService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.showAllEmployeeService.showAllEmployees()
      .subscribe(
        (data: Employee[]) => {
          this.employees = data;
        },
        error => {
          this.errorMessage = 'Failed to load employees.';
          console.error(error);
        }
      );
  }
  goToProjectManager() {
    this.router.navigate(['/projectmanager']);
  }
  deleteEmployee(id: number): void {
    this.deleteprojectserviceService.deleteEmployee(id).subscribe(
      (response:string) => {
        console.log('Employee deleted:', response);
        this.responsemsg=response;
        this.loadEmployees();
      },
      (error) => {
        console.error('Error deleting employee:', error);
        this.responsemsg="error";
      }
    );
  }
}

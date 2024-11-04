import { Component, OnInit } from '@angular/core';
import { Project } from '../../contracts/Project.contract';
import { ShowallprojectserviceService } from '../../service/showallprojectservice.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/contracts/Employee.contract';
import { DeleteprojectserviceService } from 'src/app/service/deleteprojectservice.service';
import { ShowallemployeeserviceService } from 'src/app/service/showallemployeeservice.service';
import { AssigntesterserviceService } from 'src/app/service/assigntesterservice.service';

@Component({
  selector: 'app-showallproject',
  templateUrl: './showallproject.component.html',
  styleUrls: ['./showallproject.component.css']
})
export class ShowallprojectComponent implements OnInit {
  projects: Project[] = [];
  errorMessage = '';
  responsemsg:string|null=null;
  allEmployees:Employee[] = [];
  selectedEmployees:Employee[] = [];
  responseMessage:string| null=null;
  constructor(private showAllProjectService: ShowallprojectserviceService,private router: Router,private deleteprojectserviceService:DeleteprojectserviceService,private showAllEmployeeService: ShowallemployeeserviceService,private assigntesterservice:AssigntesterserviceService) {}

  ngOnInit(): void {
    this.loadProjects();
   
  }

  loadProjects() {
    this.showAllEmployeeService.showAllEmployees().subscribe(data=>{
      for(let d of data){
        if((d.isEmployeeAvailable==true)&&  (d.employeeDesignation=="tester")){
          this.allEmployees.push(d);
        }
      }
    });
    this.showAllProjectService.showAllProjects().subscribe(
        (data: Project[]) => {
          this.projects = data;
        },
        error => {
          this.errorMessage = 'Failed to load projects.';
          console.error(error);
        }
      );
  }
  goToProjectManager() {
    this.router.navigate(['/projectmanager']);
  }

  DeleteProject(id: number): void {
    this.deleteprojectserviceService.deleteProject(id).subscribe(
        (response: string) => {
            console.log('Project deleted successfully:', response);
            this.responsemsg = response;
            this.loadProjects();
        },
        (error) => {
            console.error('Error deleting project:', error);
            this.responsemsg = error.error || "Unexpected error occurred";
            this.loadProjects();
        }
    );
}

onEmployeeSelect(event: any, employee: Employee): void {
  if (event.target.checked) {
    this.selectedEmployees.push(employee);
  } else {
    this.selectedEmployees = this.selectedEmployees.filter(e => e.employeeId !== employee.employeeId);
  }
}

AssignProject(projectId: number, employees: Employee[]){
    this.assigntesterservice.assignProjectToTester(projectId, employees).subscribe(
      (response) => {
        this.responseMessage = response;
        console.log('Project assignment successful:', response);
        this.goToProjectManager();
      },
      (error) => {
        console.error('Error assigning project:', error);
        this.responseMessage = "Failed to assign project";
      }
    );
  }
}

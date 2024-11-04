import { Component } from '@angular/core';
import { AssignprojserviceService } from '../../service/assignprojservice.service';
import { Project } from '../../contracts/Project.contract';
import { Employee } from '../../contracts/Employee.contract';
import { Router } from '@angular/router';
import { ShowallemployeeserviceService } from '../../service/showallemployeeservice.service';
import { ShowallprojectserviceService } from '../../service/showallprojectservice.service';

@Component({
  selector: 'app-assignproject',
  templateUrl: './assignproject.component.html',
  styleUrls: ['./assignproject.component.css']
})
export class AssignprojectComponent {
  project: Project = { projectId: 0, projectName: '', projectDescription: '',isProjectAvailable:true,creationDate:new Date};
  employees: Employee[] = [{ employeeId: 0, employeeName: '',employeeDesignation:'' ,employeePassword:'',employeePhoneno:0,employeeEmail:'',isEmployeeAvailable:false}]; // Modify Employee model as needed
  successMessage = '';
  errorMessage = '';
  allEmployees:Employee[] = [];
  allProject:Project[]=[];
  selectedEmployees:Employee[] = [];
  isDropdownOpen = false;
  selectedProjectId:number=0;
  


  constructor(private assignProjService: AssignprojserviceService,private router: Router,private showAllEmployeeService: ShowallemployeeserviceService,private showallprojectservice:ShowallprojectserviceService) {}
  ngOnInit(){
    this.showAllEmployeeService.showAllEmployees().subscribe(data=>{
      for(let d of data){
        if((d.isEmployeeAvailable==true) && (d.employeeDesignation=="developer")){
          this.allEmployees.push(d);
        }
      }
    });
    this.showallprojectservice.showAllProjects().subscribe(data=>{
     for(let d of data){
      if(d.isProjectAvailable==true){
        this.allProject.push(d);
      }
     }
    })
  }
  onSubmit(frm:any) {
    console.log(frm);
    console.log(this.selectedEmployees);
   
    this.assignProjService.assignProject(this.selectedProjectId, this.selectedEmployees)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Project assigned successfully!';
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Failed to assign project.';
          this.successMessage = '';
          console.error(error);
        }
      });
  }

  addEmployee() {
    this.employees.push({ employeeId: 0, employeeName: '',employeeDesignation:'' ,employeePassword:'',employeePhoneno:0,employeeEmail:'',isEmployeeAvailable:false}); // Adjust according to Employee model
  }
  goToProjectManager() {
    this.router.navigate(['/projectmanager']);
  }


// onEmployeeSelectionChange(Employee employee, isChecked: boolean) {
//   if (isChecked) {
//       this.selectedEmployees.push(employee);
//   } else {
//       this.selectedEmployees = this.selectedEmployees.filter(emp => emp.employeeId !== employee.employeeId);
//   }
// }
toggleDropdown(): void {
  this.isDropdownOpen = !this.isDropdownOpen;
}

onEmployeeSelect(event: any, employee: Employee): void {
  if (event.target.checked) {
    this.selectedEmployees.push(employee);
  } else {
    this.selectedEmployees = this.selectedEmployees.filter(e => e.employeeId !== employee.employeeId);
  }
}
}

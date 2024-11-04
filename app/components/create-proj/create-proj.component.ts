import { Component } from '@angular/core';
import { Project } from '../../contracts/Project.contract';
import { ProjectserviceService } from '../../service/projectservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-proj',
  templateUrl: './create-proj.component.html',
  styleUrls: ['./create-proj.component.css']
})
export class CreateProjComponent {

  submitted = false;
  responseMessage: string | null = null;
  
  

  constructor(private projectService: ProjectserviceService,private router: Router) {}

  onSubmit(form: any) {


      // Call the service to register the project
      this.projectService.registerProject(form).subscribe({
        next: (response) => {
          this.responseMessage = response;
          console.log(this.responseMessage);
          this.responseMessage = "Project registered successfully!";
          this.goToProjectManager();
        },
        error: (error) => {
          this.responseMessage = 'Error: ' + ( 'Server error');
        }
      });
    }
    goToProjectManager() {
      this.router.navigate(['/projectmanager']);
    }
}

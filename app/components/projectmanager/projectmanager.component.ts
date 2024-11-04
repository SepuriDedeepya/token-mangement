import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Showprojectmanagerservice } from '../../service/showprojectmanagerservice.service';
import { Organisation } from '../../contracts/Organisation.contract';

@Component({
  selector: 'app-projectmanager',
  templateUrl: './projectmanager.component.html',
  styleUrls: ['./projectmanager.component.css']
})
export class ProjectmanagerComponent {
  Manager = {
    name: 'John Doe',
    id: 'PM001',
    password: 'password123' 
    
    // Do not expose passwords like this in a real app
  };
  constructor(private router: Router,private ShowprojectmanagerService: Showprojectmanagerservice) {}
  isSideMenuOpen = false;
  isButtonVisible=true;
  projectManager: Organisation|null=null;
  ngOnInit(): void {
    this.ShowprojectmanagerService.getProjectManagerDetails().subscribe(
      (data) => {
        this.projectManager = data;
      },
      (error) => {
        console.error('Error fetching project manager details', error);
      }
    );
  } 


    GoToCreateProject() {
      console.log("Hi project");
      this.router.navigate(['details']);
    }
    GoToCreateEmployee() {
      console.log("Hi employee");
      this.router.navigate(['employee']);
    }
    GoToShowEmployee() {
      console.log("Hi showemployee");
      this.router.navigate(['showemployee']);
    }
    GoToShowProject() {
      console.log("Hi showemployee");
      this.router.navigate(['showproject']);
    }
    GoToShowTicket() {
      console.log("Hi ticket");
      this.router.navigate(['showticket']);
    }
    GoToAssignProject() {
      console.log("Hi assignproj");
      this.router.navigate(['assignproject']);
    }
    GoTologout() {
      // Perform any logout actions here, like clearing tokens or redirecting to the login page
      this.router.navigate(['/home']); // Redirect to login or home page
    }
  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  toggleButton(){
    this.isButtonVisible=this.isButtonVisible=false
  }
  }


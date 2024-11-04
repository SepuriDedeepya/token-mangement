import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pmlogin',
  templateUrl: './pmlogin.component.html',
  styleUrls: ['./pmlogin.component.css']
})
export class PmloginComponent {
  projectManagerName: string = '';
  projectManagerPassword: string = '';
  loginMessage: string = '';
  passwordVisible: boolean = false; 
  success: boolean = false;
 
  

  constructor(private ser:LoginService,private router:Router ) {}
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  onLogin(): void {
    this.ser.ProjectManagerLogin(this.projectManagerName, this.projectManagerPassword).subscribe(
      response => {
       
        this.loginMessage = 'Welcome to Profile ' + this.projectManagerName;
        this.success = true; 
        this.router.navigate(['/projectmanager']);
      },
      error => {
     
        this.loginMessage = 'Login failed. Please try again.';
        this.success = false; 
      }
    );
  }
  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
 
 
}

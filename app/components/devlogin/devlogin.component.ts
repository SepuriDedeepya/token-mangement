import { Component } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { EmployeeLoginDTO } from '../../contracts/employee-login-dto.model';


@Component({
  selector: 'app-devlogin',
  templateUrl: './devlogin.component.html',
  styleUrls: ['./devlogin.component.css']
})
export class DevloginComponent {
  employeeName:string='';
  employeePassword:string='';
  loginMessage: string = '';
  passwordVisible: boolean = false; 
  success: boolean = false;
  EmployeeLoginData:EmployeeLoginDTO={
    employeeName: '',
    employeePassword:''
  };
  developer:EmployeeLoginDTO | undefined;
  constructor(private ser: LoginService,private router:Router) {}
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  onLogin(): void{
    this.ser.DeveloperLogin(this.employeeName, this.employeePassword).subscribe(
     ( response :EmployeeLoginDTO)=> {
      this.developer=response;
      sessionStorage.setItem('empName',this.employeeName);
      sessionStorage.setItem('empPassword',this.employeePassword);
        // this.sharedService.setEmployeeLoginData(response); 
        // this.loginMessage = 'Welcome to Profile ' + this.employeeName;
        this.success = true; 
        this.router.navigate(['/developer']);
        
      },
      (error:any) => {
     
        this.loginMessage = 'Login failed. Please try again.';
        this.success = false; 
      
      }
    );
  }
  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
 
}

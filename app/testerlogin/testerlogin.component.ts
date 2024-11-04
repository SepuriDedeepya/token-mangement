import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Tester } from '../models/tester.model';
import { TesterComponent } from '../tester/tester.component';

@Component({
  selector: 'app-testerlogin',
  templateUrl: './testerlogin.component.html',
  styleUrls: ['./testerlogin.component.css']
})


export class TesterloginComponent {
  employeeName:string='';
  employeePassword:string='';
  loginMessage: string = '';
  passwordVisible: boolean = false; 
  success: boolean = false;
  tester:Tester | undefined;
  testerComponent: any;
  
  private defaultTester: Tester = {
    employeeId:0,         // Set default values as necessary
    employeeName: '',
    employeeDesignation: '',
    employeePassword: '',
    employeePhoneno: 0,
    employeeEmail: '',
    isEmployeeAvailable: false,
  };
  

  constructor(private ser: LoginService,private router:Router) {}
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  onLogin(): void {
    this.ser.TesterLogin(this.employeeName, this.employeePassword).subscribe(
      (      response: Tester) => {
         this.tester=response;
         sessionStorage.setItem('empName',this.employeeName);
         sessionStorage.setItem('empPass',this.employeePassword);
        this.success = true; 
        // this.testerComponent.getTesterData(response);
        // this.sharedService.setTester(this.tester); 
          this.router.navigate(['/tester']);
        //path after the login 
      },
      (      error: any) => {     
        this.loginMessage = 'Login failed. Please try again.';
        this.success = false; 
        //nothing stay in same page
      }
    );
  }
  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
}

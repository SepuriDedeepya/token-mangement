import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeLoginDTO } from '../contracts/employee-login-dto.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

 // constructor() { }
  // private employeeLoginDataSubject: BehaviorSubject<EmployeeLoginDTO | null> = new BehaviorSubject<EmployeeLoginDTO | null>(null);
  // public employeeLoginData$: Observable<EmployeeLoginDTO | null> = this.employeeLoginDataSubject.asObservable();

  // setEmployeeLoginData(data: EmployeeLoginDTO): void {
  //   this.employeeLoginDataSubject.next(data);
  // }

  // getEmployeeLoginData(): EmployeeLoginDTO | null {
  //   return this.employeeLoginDataSubject.getValue();
  // }



  private employeeLoginData: any;

  setEmployeeLoginData(data: any) {
    this.employeeLoginData = data;
  }

  getEmployeeLoginData() {
    return this.employeeLoginData;
  }
}

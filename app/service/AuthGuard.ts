import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sharedService: SharedService, private router: Router) {}

  canActivate(): boolean {
    if (this.sharedService.getEmployeeLoginData()) {
      return true;
    } else {
      this.router.navigate(['/devlogin']);
      return false;
    }
  }
}

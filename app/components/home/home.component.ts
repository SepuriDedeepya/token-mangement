import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}
  menuVisible = false; // Initial state of the menu

  toggleMenu() {
    this.menuVisible = !this.menuVisible; // Toggle menu visibility
  }

  ngOnInit(): void {
    this.router.navigate(['/home']);
  }

}

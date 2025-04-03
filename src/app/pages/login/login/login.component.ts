import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userName = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.userName || !this.password) {
      alert('Please enter a username and password');
      return;
    }

    // In a real app, you'd verify credentials with a server first
    this.authService.login(this.userName);

    // Optionally navigate to your home or dashboard
    this.router.navigate(['/crm/clients/view-clients']);
  }
}

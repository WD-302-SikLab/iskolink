// Made with <3 by Jimwel L. Valdez (jimvdz). Copyright (c) 2025. All rights reserved.

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private meta: Meta, private title: Title) {
    this.title.setTitle('Admin Login — ADS-HAUSC');
    this.meta.updateTag({ name: 'description', content: 'Secure login for ADS-HAUSC administrators. Access the admin dashboard with your credentials.' });
  }

  async ngOnInit(): Promise<void> {
    // Check if the admin is already logged in
    if (await this.authService.isLoggedIn()) {
      this.router.navigate(['/admin-dashboard']); // Redirect to dashboard if logged in
    }

    else {
      this.authService.logout();
    }
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/admin-dashboard']);
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }
}
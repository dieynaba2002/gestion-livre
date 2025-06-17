import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigate(['/accueil']);
        },
        error: (err) => {
          console.error('Erreur de connexion', err);
          alert('Identifiants invalides');
        },
      });
  }
}

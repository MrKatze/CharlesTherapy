import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // Simulación de autenticación
    setTimeout(() => {
      if (this.email === 'admin@example.com' && this.password === 'password') {
        alert('Inicio de sesión exitoso');
        window.location.href = '/';
      } else {
        this.errorMessage = 'Credenciales inválidas.';
      }
      this.loading = false;
    }, 1000);
  }

  redirectToRegister() {
    this.router.navigate(['/registro']);
  }
}

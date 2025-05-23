import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service'; // Importar el servicio

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

  constructor(private router: Router, private usuariosService: UsuariosService) {} // Inyectar el servicio

  onSubmit() {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    // Usar el servicio para autenticar
    this.usuariosService.login(this.email, this.password).subscribe({
      next: (response) => {
        alert('Inicio de sesión exitoso');
        window.location.href = '/';
      },
      error: (error) => {
        this.errorMessage = 'Credenciales inválidas.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  redirectToRegister() {
    this.router.navigate(['/registro']);
  }
}

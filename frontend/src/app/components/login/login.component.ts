import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private router: Router, private usuariosService: UsuariosService) {}

  onSubmit() {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }
    this.loading = true;
    this.usuariosService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Aquí puedes guardar el token o id de usuario si tu backend lo retorna
        // localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'Credenciales incorrectas o error de servidor.';
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
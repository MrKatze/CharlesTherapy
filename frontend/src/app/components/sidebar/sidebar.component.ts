import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  estadoAnimo: string = 'neutral';
  colorClase: string = 'sidebar-neutral';
  rol: string = '';
  constructor(private router: Router) {}

  // Utilidad para verificar si localStorage está disponible
  isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  ngOnInit() {
    // Solo acceder a localStorage si está disponible
    if (this.isLocalStorageAvailable()) {
      const usuarioStr = localStorage.getItem('usuario');
      this.rol = usuarioStr ? JSON.parse(usuarioStr).rol : 'paciente';
    } else {
      this.rol = 'paciente';
    }
    console.log('Rol del usuario:', this.rol);
    this.colorClase = this.getColorClass(this.estadoAnimo);
  }

  getColorClass(estado: string): string {
    switch (estado) {
      case 'feliz': return 'sidebar-feliz';
      case 'triste': return 'sidebar-triste';
      case 'ansioso': return 'sidebar-ansioso';
      case 'enojado': return 'sidebar-enojado';
      case 'neutral':
      default: return 'sidebar-neutral';
    }
  }

  cerrarSesion(): void {
    localStorage.clear(); // O localStorage.removeItem('usuario');
    this.router.navigate(['/login']); // Cambia '/login' por tu ruta de inicio de sesión
  }
}

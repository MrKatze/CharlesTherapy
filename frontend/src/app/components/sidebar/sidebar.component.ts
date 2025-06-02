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
  rol:string = ''
  constructor(private router: Router) {}

  ngOnInit() {
    // Leer el estado de ánimo del localStorage (simulado)
    // Comentado porque localStorage no está definido en algunos entornos
    /*
    const perfil = localStorage.getItem('perfilPsicometrico');
    if (perfil) {
      try {
        const perfilObj = JSON.parse(perfil);
        this.estadoAnimo = perfilObj.estadoAnimo || 'neutral';
      } catch {
        this.estadoAnimo = 'neutral';
      }
    }
    */

    // Explicación:
    // El acceso a localStorage está comentado porque no está disponible en todos los entornos (por ejemplo, SSR o pruebas unitarias).
    // Procedimiento para completar esta funcionalidad:
    // 1. Verificar si localStorage está disponible antes de usarlo.
    // 2. Crear un servicio para encapsular el acceso a localStorage y manejar entornos donde no esté disponible.
    // 3. Mockear localStorage en pruebas unitarias para evitar errores.
    // 4. Usar almacenamiento alternativo (como un objeto en memoria) en entornos donde localStorage no esté disponible.
    this.rol = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario') || '{}').rol : 'paciente';
    
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

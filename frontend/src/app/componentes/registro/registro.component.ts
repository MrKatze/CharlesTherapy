import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  imports: [],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  onSubmit() {
    console.log('Formulario enviado');
    // Aquí puedes agregar la lógica para manejar el registro
  }
}

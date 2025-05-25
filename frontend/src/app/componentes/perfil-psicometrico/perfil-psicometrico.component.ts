import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import OpenAI from 'openai';

@Component({
  selector: 'app-perfil-psicometrico',
  imports: [CommonModule],
  templateUrl: './perfil-psicometrico.component.html',
  styleUrls: ['./perfil-psicometrico.component.css']
})
export class PerfilPsicometricoComponent {
  paciente = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    estadisticas: {
      depresion: 60,
      estres: 39,
      ansiedad: 70
    }
  };

  // Convertimos a lista para usar *ngFor
  estadisticasList = [
    { nombre: 'Depresión', valor: this.paciente.estadisticas.depresion },
    { nombre: 'Estrés', valor: this.paciente.estadisticas.estres },
    { nombre: 'Ansiedad', valor: this.paciente.estadisticas.ansiedad }
  ];

  // Escala fija de 100%
  getWidth(valor: number): number {
    return Math.round((valor / 100) * 100);
  }

  getColor(valor: number): string {
    if (valor >= 70) return 'alto';
    if (valor >= 40) return 'medio';
    return 'bajo';
  }

  // --- OpenAI ---
  recomendacion: string = '';
  loading: boolean = false;

  private openai = new OpenAI({
    apiKey: '',
    dangerouslyAllowBrowser: true
  });

  async obtenerRecomendacion() {
    this.loading = true;
    this.recomendacion = 'Obteniendo recomendación...';

    const { depresion, estres, ansiedad } = this.paciente.estadisticas;

    const prompt = `Soy un sistema de apoyo psicométrico. 
El paciente tiene los siguientes puntajes: 
Ansiedad: ${ansiedad}, 
Estrés: ${estres}, 
Depresión: ${depresion}. 
¿Qué tipo de especialista psicológico o de salud mental recomendarías para este perfil? Responde de forma breve y profesional.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: prompt }]
      });

      this.recomendacion = completion.choices[0].message?.content || 'No se pudo obtener recomendación.';
    } catch (error) {
      this.recomendacion = 'Ocurrió un error al obtener la recomendación.';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}

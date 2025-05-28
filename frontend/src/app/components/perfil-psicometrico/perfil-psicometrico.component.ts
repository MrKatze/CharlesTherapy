import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotModalComponent } from '../chatbot-modal/chatbot-modal.component';
import OpenAI from 'openai';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-perfil-psicometrico',
  standalone: true,
  imports: [CommonModule, ChatbotModalComponent, SidebarComponent],
  templateUrl: './perfil-psicometrico.component.html',
  styleUrls: ['./perfil-psicometrico.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
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

  // --- Chatbot modal ---
  showChatModal = false;
  messages: {role: string, content: string, animatedContent?: string}[] = [
    {role: 'assistant', content: 'Hola, ¿en qué puedo ayudarte con tu perfil psicométrico?'}
  ];
  userInput = '';
  loadingChat = false;

  openChat() {
    this.showChatModal = true;
  }

  closeChat() {
    this.showChatModal = false;
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;
    this.loadingChat = true;
    const userMessage = this.userInput;
    this.messages.push({role: 'user', content: userMessage});
    this.userInput = '';
    setTimeout(() => {
      const botResponse = 'Esta es una respuesta simulada para el perfil psicométrico.';
      const animatedMsg = {role: 'assistant', content: botResponse, animatedContent: ''};
      this.messages.push(animatedMsg);
      this.animateBotMessage(animatedMsg, botResponse);
      this.loadingChat = false;
    }, 1000);
  }

  async animateBotMessage(msg: any, fullText: string) {
    const words = fullText.split(' ');
    msg.animatedContent = '';
    for (let i = 0; i < words.length; i++) {
      msg.animatedContent += (i > 0 ? ' ' : '') + words[i];
      await new Promise(res => setTimeout(res, 400));
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import OpenAI from 'openai';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatbotModalComponent } from '../chatbot-modal/chatbot-modal.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, ChatbotModalComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  // Datos de ejemplo para el mini perfil
  usuario = {
    nombre: 'Nombre Usuario',
    edad: 25,
    objetivo: 'Mejorar mi bienestar emocional'
  };

  // Estado del resumen semanal
  tieneResumenSemanal = false; // Cambia a true para simular que hay resumen

  // Estado de la cita en turno (null si no hay cita)
  citaEnTurno: { fecha: string, hora: string, motivo: string } | null = null; // Cambia a un objeto para simular cita

  showChatModal = false;
  messages: {role: string, content: string, animatedContent?: string}[] = [
    {role: 'assistant', content: 'Hola, como puedo ayudarte (?)'}
  ];
  userInput = '';
  loading = false;

  // Configuración de OpenAI (usa tu API key aquí)
  private openai = new OpenAI({
    apiKey: '', // Reemplaza con tu API key
    dangerouslyAllowBrowser: true  // Necesario para usar en frontend
  });

  openChat() {
    this.showChatModal = true;
  }

  closeChat() {
    this.showChatModal = false;
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    this.loading = true;
    const userMessage = this.userInput;
    this.messages.push({role: 'user', content: userMessage});
    this.userInput = '';

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: this.messages.map(m => ({role: m.role, content: m.content})) as any,
      });

      let botResponse = completion.choices[0].message?.content || '';
      // Eliminar <think>...</think> si existe
      botResponse = botResponse.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      // Agregar mensaje con animación
      const animatedMsg = {role: 'assistant', content: botResponse, animatedContent: ''};
      this.messages.push(animatedMsg);
      await this.animateBotMessage(animatedMsg, botResponse);
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      this.messages.push({role: 'assistant', content: 'Sorry, I encountered an error.'});
    } finally {
      this.loading = false;
    }
  }

  async animateBotMessage(msg: any, fullText: string) {
    // Animar palabra por palabra
    const words = fullText.split(' ');
    msg.animatedContent = '';
    for (let i = 0; i < words.length; i++) {
      msg.animatedContent += (i > 0 ? ' ' : '') + words[i];
      await new Promise(res => setTimeout(res, 400));
    }
  }

  abrirModalCita() {
    // Aquí se implementará la lógica para abrir el modal de agendar cita
    alert('Abrir modal para agendar cita (por implementar)');
  }
}
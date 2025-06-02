import { Component, inject } from '@angular/core';
import { ChatbotModalComponent } from '../chatbot-modal/chatbot-modal.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { OpenAIService } from '../../../services/openai.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, ChatbotModalComponent, SidebarComponent],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  showChatModal = false;
  messages: {role: string, content: string, animatedContent?: string}[] = [
    {role: 'assistant', content: 'Hola, ¿en qué puedo ayudarte con tu historial?'}
  ];
  userInput = '';
  loading = false;

  // Simulación de historial de sesiones (puedes reemplazar por datos reales)
  sesiones = [
    { fecha: '2024-05-01', descripcion: 'Me sentí mejor después de la charla.' },
    { fecha: '2024-05-08', descripcion: 'Hablamos sobre mis metas personales.' },
    { fecha: '2024-05-15', descripcion: 'Identifiqué nuevos retos.' }
  ];

  // Contactos ficticios para la barra lateral
  contactos = [
    { nombre: 'Ana Martínez', inicial: 'A', foto: '' },
    { nombre: 'Carlos López', inicial: 'C', foto: '' },
    { nombre: 'Beatriz Gómez', inicial: 'B', foto: '' },
    { nombre: 'David Torres', inicial: 'D', foto: '' },
    { nombre: 'Elena Ruiz', inicial: 'E', foto: '' }
  ];

  private openaiService = inject(OpenAIService);
  private openai = this.openaiService.getClient();

  openChat() {
    this.showChatModal = true;
  }

  closeChat = () => {
    this.showChatModal = false;
  };

  sendMessage = async () => {
    if (!this.userInput.trim()) return;
    this.loading = true;
    const userMessage = this.userInput;
    this.messages.push({role: 'user', content: userMessage});
    this.userInput = '';
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: this.messages.map(m => ({ role: m.role, content: m.content })) as any,
      });
      let botResponse = completion.choices[0].message?.content || '';
      botResponse = botResponse.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      const animatedMsg = {role: 'assistant', content: botResponse, animatedContent: ''};
      this.messages.push(animatedMsg);
      await this.animateBotMessage(animatedMsg, botResponse);
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      this.messages.push({role: 'assistant', content: 'Lo siento, hubo un error al contactar a OpenAI.'});
    } finally {
      this.loading = false;
    }
  };

  async animateBotMessage(msg: any, fullText: string) {
    const words = fullText.split(' ');
    msg.animatedContent = '';
    for (let i = 0; i < words.length; i++) {
      msg.animatedContent += (i > 0 ? ' ' : '') + words[i];
      await new Promise(res => setTimeout(res, 400));
    }
  }
}

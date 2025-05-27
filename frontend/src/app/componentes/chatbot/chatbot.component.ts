import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { OpenAIService } from '../../services/openai.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: {role: string, content: string, animatedContent?: string}[] = [
    {role: 'assistant', content: 'Hola, ¿en qué puedo ayudarte?'}
  ];
  userInput = '';
  loading = false;
  private openaiService = inject(OpenAIService);
  private openai = this.openaiService.getClient();

  closeChat() {
    // Navegación o lógica para salir del chat (puedes implementar router.navigate)
    window.history.back();
  }

  async sendMessage() {
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

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import OpenAI from 'openai';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-principal',
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  messages: {role: string, content: string}[] = [
    {role: 'assistant', content: 'Hola, como puedo ayudarte (?)'}
  ];
  userInput = '';
  loading = false;

  // Configuración de OpenAI (usa tu API key aquí)
  private openai = new OpenAI({
    apiKey: '',  // Reemplaza con tu API key
    dangerouslyAllowBrowser: true  // Necesario para usar en frontend
  });

  async sendMessage() {
    if (!this.userInput.trim()) return;

    this.loading = true;
    const userMessage = this.userInput;
    this.messages.push({role: 'user', content: userMessage});
    this.userInput = '';

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: this.messages as any,
      });

      const botResponse = completion.choices[0].message?.content;
      if (botResponse) {
        this.messages.push({role: 'assistant', content: botResponse});
      }
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      this.messages.push({role: 'assistant', content: 'Sorry, I encountered an error.'});
    } finally {
      this.loading = false;
    }
  }
}
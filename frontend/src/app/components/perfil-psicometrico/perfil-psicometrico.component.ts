import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotModalComponent } from '../chatbot-modal/chatbot-modal.component';
import OpenAI from 'openai';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { BigFiveQuestion, BigFiveResult } from '../../../models/bigfive.model';
import { BigFiveService } from '../../../services/bigfive.service';
import { UsuariosService } from '../../../services/usuarios.service';


@Component({
  selector: 'app-perfil-psicometrico',
  standalone: true,
  imports: [CommonModule, ChatbotModalComponent, SidebarComponent],
  templateUrl: './perfil-psicometrico.component.html',
  styleUrls: ['./perfil-psicometrico.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})


export class PerfilPsicometricoComponent implements OnInit {
  paciente = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
  };

  bigFiveTraits = [
    { key: 'neuroticismo', label: 'Neuroticismo' },
    { key: 'extraversion', label: 'Extraversión' },
    { key: 'apertura', label: 'Apertura' },
    { key: 'amabilidad', label: 'Amabilidad' },
    { key: 'responsabilidad', label: 'Responsabilidad' }
  ];
  // Resultados del Big Five
  constructor(private bigFiveService: BigFiveService, private usuariosService: UsuariosService) { }

  bigFiveResult: any = null;
  especialistas: any[] = []; // Lista de especialistas

  ngOnInit() {
  const usuarioStr = localStorage.getItem('usuario');
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

  if (!usuario || !usuario.id_usuario) {
    console.error('Usuario no encontrado en localStorage');
    return;
  }

  // 🔄 Asigna datos al paciente desde el localStorage
  this.paciente.nombre = usuario.usuario || 'Desconocido';
  this.paciente.email = usuario.correo || '---';
  //console.log('Datos del paciente:', this.paciente);
  // 🔄 Obtiene el ID del usuario

  const id_usuario = Number(usuario.id_usuario);
  //console.log('ID de usuario:', id_usuario);

  interface BigFiveApiResult {
    neuroticismo: string | number;
    extraversion: string | number;
    apertura: string | number;
    amabilidad: string | number;
    responsabilidad: string | number;
    [key: string]: any;
  }

  interface BigFiveApiResponse {
    length: number;
    [index: number]: BigFiveApiResult;
  }

  this.bigFiveService.getResultsByUser(id_usuario).subscribe({
    next: (resultados: BigFiveApiResponse) => {
      if (resultados.length > 0) {
        const r: BigFiveApiResult = resultados[resultados.length - 1];
        this.bigFiveResult = {
          neuroticismo: Number(r.neuroticismo),
          extraversion: Number(r.extraversion),
          apertura: Number(r.apertura),
          amabilidad: Number(r.amabilidad),
          responsabilidad: Number(r.responsabilidad)
        };
      }
    },
    error: (err: any) => {
      console.error('Error al obtener resultados Big Five:', err);
    }
  });
}


  getTraitValue(traitKey: string): number {
    const val = (this.bigFiveResult as any)?.[traitKey];
    return typeof val === 'number' && !isNaN(val) ? val : 0;
  }

  getWidth(valor: number, max: number = 5): number {
    return Math.round((valor / max) * 100);
  }

  getColor(valor: number): string {
    if (valor < 1.6) return 'bajo';         // Verde
    if (valor < 3.3) return 'medio';        // Amarillo
    return 'alto';                          // Rojo
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

    const { neuroticismo, extraversion, apertura, amabilidad, responsabilidad } = this.bigFiveResult;

    const prompt = `Soy un sistema de apoyo psicométrico. 
                    El paciente tiene los siguientes puntajes: 
                    Neuroticismo: ${neuroticismo}, 
                    Extraversion: ${extraversion}, 
                    Apertura: ${apertura},
                    Amabilidad: ${amabilidad},
                    Responsabilidad: ${responsabilidad}.
                    Basado en estos resultados, 
                  ¿Qué tipo de especialista psicológico o de salud mental recomendarías para este perfil? Responde de forma breve y profesional.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: prompt }]
      });

      this.recomendacion = completion.choices[0].message?.content || 'No se pudo obtener recomendación.';
      const especialidad = this.recomendacion.toLowerCase(); // Convertir a minúsculas para buscar
      this.obtenerEspecialistas(especialidad); // Buscar especialistas
    } catch (error) {
      this.recomendacion = 'Ocurrió un error al obtener la recomendación.';
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  obtenerEspecialistas(especialidad: string) {
    this.usuariosService.getEspecialistasByEspecialidad(especialidad).subscribe({
      next: (especialistas) => {
        this.especialistas = especialistas;
      },
      error: (err) => {
        console.error('Error al obtener especialistas:', err);
        this.especialistas = [];
      }
    });
  }

  // --- Chatbot modal ---
  showChatModal = false;
  messages: { role: string, content: string, animatedContent?: string }[] = [
    { role: 'assistant', content: 'Hola, ¿en qué puedo ayudarte con tu perfil psicométrico?' }
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
    this.messages.push({ role: 'user', content: userMessage });
    this.userInput = '';
    setTimeout(() => {
      const botResponse = 'Esta es una respuesta simulada para el perfil psicométrico.';
      const animatedMsg = { role: 'assistant', content: botResponse, animatedContent: '' };
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

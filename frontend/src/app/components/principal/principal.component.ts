import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import OpenAI from 'openai';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatbotModalComponent } from '../chatbot-modal/chatbot-modal.component';
import { Router } from '@angular/router';
import { SesionChatService } from '../../services/sesion-chat.service';
import { ResumenService } from '../../services/resumen.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, ChatbotModalComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  // Datos de ejemplo para el mini perfil
  usuario: any = {};

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
  openai = new OpenAI({
    apiKey: '', // Reemplaza con tu API key
    dangerouslyAllowBrowser: true  // Necesario para usar en frontend
  });

  showBigFiveModal = false;

  // Lógica de sesión de chat
  chatSesionId: number | null = null;
  chatSesionGuardada = true;

  // Estado del resumen diario
  resumenDiario: string | null = null;
  generandoResumen = false;

  // Estado para mostrar/ocultar el resumen
  mostrarResumen: boolean = false;

  constructor(private router: Router, private sesionChatService: SesionChatService, private resumenService: ResumenService) {
    // Prevenir navegación si hay sesión de chat sin guardar
    window.addEventListener('beforeunload', (event) => {
      if (!this.chatSesionGuardada && this.showChatModal) {
        event.preventDefault();
        event.returnValue = '';
      }
    });
  }

  ngOnInit() {
    const usuarioStr = localStorage.getItem('usuario');

    if (!usuarioStr) {
      console.warn('No hay datos de usuario en el localStorage');
      return;
    }

    try {
      this.usuario = JSON.parse(usuarioStr);
      console.log('Usuario cargado:', this.usuario);

      // Mostrar modal si no ha completado el test Big Five
      this.showBigFiveModal = !this.usuario.bigFive;

    } catch (error) {
      console.error('Error al parsear datos del usuario:', error);
    }
  }


  // Iniciar sesión solo en memoria
  iniciarSesionChat() {
    this.messages = [
      {role: 'assistant', content: 'Hola, como puedo ayudarte (?)'}
    ];
    this.chatSesionId = null;
    this.chatSesionGuardada = false;
  }

  // Guardar sesión al cerrar
  guardarSesionChat() {
    if (!this.usuario?.id_usuario) return;
    this.sesionChatService.crearSesion({
      id_usuario: this.usuario.id_usuario,
      contenido: JSON.stringify(this.messages)
    }).subscribe({
      next: (resp) => {
        this.chatSesionId = resp.id_sesion;
        this.chatSesionGuardada = true;
        alert('Sesión de chat guardada.');
      }
    });
  }

  closeChat() {
    if (!this.chatSesionGuardada && confirm('¿Deseas guardar la sesión de chat antes de salir?')) {
      this.guardarSesionChat();
    }
    this.showChatModal = false;
    this.chatSesionId = null;
    this.chatSesionGuardada = true;
    this.messages = [
      {role: 'assistant', content: 'Hola, como puedo ayudarte (?)'}
    ];
    this.userInput = '';
  }

  // Bloquear navegación por sidebar si hay sesión sin guardar
  canNavigate(): boolean {
    if (!this.chatSesionGuardada && this.showChatModal) {
      alert('Tienes una sesión de chat sin guardar. Por favor, guárdala o descártala antes de salir.');
      return false;
    }
    return true;
  }

  // Llama a esto al abrir el modal
  openChat() {
    this.iniciarSesionChat();
    this.showChatModal = true;
  }

  // Llama a esto cada vez que se envía un mensaje
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
      botResponse = botResponse.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      const animatedMsg = {role: 'assistant', content: botResponse, animatedContent: ''};
      this.messages.push(animatedMsg);
      await this.animateBotMessage(animatedMsg, botResponse);
      this.chatSesionGuardada = false;
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

  abrirBigFiveModal() {
    this.showBigFiveModal = true;
  }

  onBigFiveCompleted() {
    // Actualizar el usuario y ocultar el modal
    this.usuario.bigFive = true;
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    this.showBigFiveModal = false;
    // (Opcional) Aquí podrías llamar a un servicio para actualizar el usuario en backend si lo deseas
  }

  irAPerfilPsicometrico() {
    this.router.navigate(['/perfilPsicometrico']); // Corrige la ruta a la que navega el botón
  }

  irABigFiveTest() {
    this.router.navigate(['/bigfive']); // Corrige la ruta a la que navega el botón
  }

  async generarDailyResume() {
    if (!this.usuario?.id_usuario) return;
    const id_usuario = this.usuario.id_usuario;
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    const fechaHoy = `${yyyy}-${mm}-${dd}`;
    this.generandoResumen = true;
    // Usar el nuevo método que consulta sesiones por usuario y fecha directamente
    this.sesionChatService.obtenerSesionesPorUsuarioYFecha(id_usuario, fechaHoy).subscribe({
      next: async (sesiones: any[]) => {
        const contenido = sesiones.map(s => s.contenido).join('\n');
        if (!contenido) {
          alert('No hay sesiones de chat para resumir hoy.');
          this.generandoResumen = false;
          return;
        }
        // Prompt personalizado
        const prompt = `ELABORA UN RESUMEN DE NO MÁS DE 400 PALABRAS DE LOS SIGUIENTES MENSAJES:\n${contenido}`;
        let resumen = '';
        try {
          const completion = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }]
          });
          resumen = completion.choices[0].message?.content || '';
        } catch (error) {
          alert('Error al generar el resumen con IA.');
          this.generandoResumen = false;
          return;
        }
        this.resumenService.crearResumen({ id_usuario, fecha: fechaHoy, contenido, resumen }).subscribe({
          next: () => {
            this.resumenDiario = resumen;
            this.tieneResumenSemanal = true;
            this.generandoResumen = false;
            alert('Resumen diario guardado exitosamente.');
          },
          error: () => {
            alert('Error al guardar el resumen diario.');
            this.generandoResumen = false;
          }
        });
      },
      error: () => {
        alert('Error al obtener las sesiones de chat.');
        this.generandoResumen = false;
      }
    });
  }

  toggleResumen() {
    this.mostrarResumen = !this.mostrarResumen;
  }
}
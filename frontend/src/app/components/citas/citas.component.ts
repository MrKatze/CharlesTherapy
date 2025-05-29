import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitaModel, CitasService } from '../../../services/cita.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';

// Importaciones de FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';


@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [FormsModule, CommonModule, FullCalendarModule, SidebarComponent, HttpClientModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  providers: [CitasService]
})


export class CitasComponent implements OnInit {

  //Variables
  fecha: Date = new Date();
  paciente_id = 4;
  cita_predefinida = {
    fecha: new Date(),
    paciente_id: 0,
    especialidad_id: this.paciente_id,
    estado: 'pendiente',
    id_cita: 0,
    descripcion: ''
  };
  cita: CitaModel = this.cita_predefinida

  new_cita: CitaModel = this.cita_predefinida


  horasDisponibles: string[] = [
    '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00',
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locales:[esLocale],
    locale:'es',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    editable: true,
    selectable: true,
    selectMirror: true,
    slotDuration: '01:00:00',       // Cambia el tamaño del "bloque" visible a 1 hora
    slotLabelInterval: '01:00',     // Etiquetas del lado izquierdo cada 1 hora
    selectOverlap: false,
  };
  events: EventInput[] = [];
  mostrarModal: boolean = false;
  fechaModal = new Date();
  horaModal = new Date().toUTCString();
  citasDelDia = []
  //Fin Variables

  constructor(private citasServices: CitasService) { }

  ngOnInit() {
    this.obtenerCitas();
  }
  
  obtenerCitas(){
    this.citasServices.getCitasByEspecialistaId(this.cita.especialidad_id).subscribe({
      next:(response)=>{
        this.calendarOptions.events = response.map(aux=>this.estilosCitas(aux.estado,aux.descripcion,aux.fecha,aux.id_cita))
      }
    })
  }


  agendarCita() {
      this.mostrarModal = false
    
  }
  actualizarCita(){

  }

  handleDateClick(arg: any) {
    // console.log(this.calendarOptions.eventContent?.toString())
    const fechaSeleccionada = arg.dateStr; // Formato: '2025-05-28'

    console.log(fechaSeleccionada)

  }

  handleEventClick(arg: any) {
    const event = arg.event;
    // this.mostrarModal=true
    if (confirm(`¿Deseas eliminar la cita de ${event.extendedProps.id_cita}?`)) {
      event.remove();
      this.events = this.events.filter(e => e !== event);
    }
  }

  

 estilosCitas(estado: string, descripcion: string, fecha: Date, id:number) {
    switch (estado) {
      case 'cancelada':
        return {
          title: descripcion,
          start: fecha,
          textColor: "#ffffff",
          color: "#dc3545",
          extendedProps:{
            id_cita: id
          }
        };
      case 'terminada':
        return {
          title: descripcion,
          start: fecha,
          textColor: "#ffffff",
          color: "#007bff",
          extendedProps:{
            id_cita: id
          }
        }
      case 'proxima':
        return {
          title: descripcion,
          start: fecha,
          textColor: "#ffffff",
          color: "#28a745",
          extendedProps:{
            id_cita: id
          }
        }
      case 'en confirmacion':
        return {
          title: descripcion,
          start: fecha,
          textColor: "#000000",
          color: "#ffc107",
          extendedProps:{
            id_cita: id
          }
        }
      default:
        return {
          title: descripcion,
          start: fecha,
          extendedProps:{
            id_cita: id
          }
        }
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitaModel } from '../../../services/cita.service';

// Importaciones de FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [FormsModule, CommonModule,  FullCalendarModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  fecha: Date = new Date();
  cita: CitaModel = {
    fecha: new Date(),
    hora: '',
    paciente_id: 0,
    especialidad_id: 0,
    estado: 'pendiente',
    id_cita: 0,
  };

  horasDisponibles: string[] = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    editable: true,
    selectable: true
  };

  events: EventInput[] = [];

  ngOnInit() {
    this.calendarOptions.events = this.events;
  }

  agendarCita() {
    if (this.validarCita()) {
      const nuevaCita = {
        start: this.obtenerFechaCompleta(),
      };
      
      this.events.push(nuevaCita);
      this.calendarOptions.events = [...this.events];
      this.limpiarFormulario();
    }
  }

  obtenerFechaCompleta(): Date {
    const [hours, minutes] = this.cita.hora.split(':').map(Number);
    const fecha = new Date(this.cita.fecha);
    fecha.setHours(hours, minutes);
    return fecha;
  }

  handleDateClick(arg: any) {
    this.cita.fecha = new Date(arg.dateStr);
    this.fecha = new Date(arg.dateStr);

  }

  handleEventClick(arg: any) {
    const event = arg.event;
    if (confirm(`¿Deseas eliminar la cita de ${event.extendedProps.paciente}?`)) {
      event.remove();
      this.events = this.events.filter(e => e !== event);
    }
  }

  validarCita(): boolean {
    if (!this.cita.hora) {
      alert('Por favor seleccione una hora');
      return false;
    }
    return true;
  }

  limpiarFormulario() {
    this.cita = {
      fecha: new Date(),
      hora: '',
      paciente_id: 0,
      especialidad_id: 0,
      estado: 'pendiente',
      id_cita: 0,
    };
  }
}


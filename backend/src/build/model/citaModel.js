"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitaModel = void 0;
class CitaModel {
    constructor(id_cita, fecha, hora, paciente_id, terapeuta_id, estado) {
        this.id_cita = id_cita;
        this.fecha = fecha;
        this.hora = hora;
        this.paciente_id = paciente_id;
        this.terapeuta_id = terapeuta_id;
        this.estado = estado;
    }
}
exports.CitaModel = CitaModel;

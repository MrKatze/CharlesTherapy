import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CitasService {
    private apiUrl = `${environment.apiUrl}/citas`;

    constructor(private http: HttpClient) { }

    getCitas(): Observable<CitaModel[]> {
        return this.http.get<CitaModel[]>(this.apiUrl);
    }
    getCitaById(id: number): Observable<CitaModel> {
        return this.http.get<CitaModel>(`${this.apiUrl}/${id}`);
    }
    createCita(cita: CitaModel): Observable<CitaModel> {
        return this.http.post<CitaModel>(this.apiUrl, cita);
    }
    updateCita(id: number, cita: CitaModel): Observable<CitaModel> {
        return this.http.put<CitaModel>(`${this.apiUrl}/${id}`, cita);
    }
    deleteCita(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    getCitasByPacienteId(pacienteId: number): Observable<CitaModel[]> {
        return this.http.get<CitaModel[]>(`${this.apiUrl}/paciente/${pacienteId}`);
    }
    getCitasByEspecialistaId(especialistaId: number): Observable<CitaModel[]> {
        return this.http.get<CitaModel[]>(`${this.apiUrl}/especialista/${especialistaId}`);
    }

}


export interface CitaModel {
    id_cita: number;
    paciente_id: number;
    especialidad_id: number;
    fecha: Date;
    hora: string;
    estado: string;
}

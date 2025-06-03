import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResumenService {
  private apiUrl = environment.apiUrl + '/resumen';
  constructor(private http: HttpClient) {}

  crearResumen(data: { id_usuario: number, fecha: string, contenido: string, resumen: string }) {
    // Usar apiUrl absoluto para evitar problemas de proxy/base
    return this.http.post(this.apiUrl, data);
  }

  obtenerResumenPorFecha(id_usuario: number, fecha: string) {
    return this.http.get(this.apiUrl, { params: { id_usuario, fecha } });
  }
}

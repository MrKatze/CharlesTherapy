// Servicio centralizado para OpenAI
// Coloca tu API Key en la variable apiKey de este archivo

import { Injectable } from '@angular/core';
import OpenAI from 'openai';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  // <--- AQUÍ COLOCA TU API KEY DE OPENAI
  private apiKey = ''; // Reemplaza por tu API Key real

  private openai = new OpenAI({
    apiKey: this.apiKey,
    dangerouslyAllowBrowser: true
  });

  getClient() {
    return this.openai;
  }
}

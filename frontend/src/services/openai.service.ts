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

  async obtenerRecomendacionEspecialista(bigFive: {
    neuroticismo: number;
    extraversion: number;
    apertura: number;
    amabilidad: number;
    responsabilidad: number;
  }): Promise<string> {
    const prompt = `Soy un sistema de apoyo psicométrico.\nEl paciente tiene los siguientes puntajes:\nNeuroticismo: ${bigFive.neuroticismo},\nExtraversion: ${bigFive.extraversion},\nApertura: ${bigFive.apertura},\nAmabilidad: ${bigFive.amabilidad},\nResponsabilidad: ${bigFive.responsabilidad}.\nBasado en estos resultados, ¿Qué tipo de especialista psicológico o de salud mental recomendarías para este perfil? Responde de forma breve y profesional.`;
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });
    return completion.choices[0].message?.content || '';
  }

  async obtenerTipoEspecialista(bigFive: {
    neuroticismo: number;
    extraversion: number;
    apertura: number;
    amabilidad: number;
    responsabilidad: number;
  }, especialidades: string[]): Promise<string> {
    const prompt = `Eres un sistema de recomendación psicométrica.\nEl paciente tiene los puntajes Big Five:\nNeuroticismo: ${bigFive.neuroticismo},\nExtraversion: ${bigFive.extraversion},\nApertura: ${bigFive.apertura},\nAmabilidad: ${bigFive.amabilidad},\nResponsabilidad: ${bigFive.responsabilidad}.\nDe acuerdo a estos resultados, responde únicamente con el tipo de especialista más adecuado de la siguiente lista (sin explicación, solo el nombre exacto de la especialidad):\n${especialidades.map(e => `- ${e}`).join('\n')}`;
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });
    return completion.choices[0].message?.content?.trim() || '';
  }
}

export interface BigFiveResult {
  id_usuario: number;
  neuroticismo: number;
  extraversión: number;
  apertura: number;
  amabilidad: number;
  responsabilidad: number;
}

export interface BigFiveQuestion {
  text: string;
  trait: 'neuroticismo' | 'extraversión' | 'apertura' | 'amabilidad' | 'responsabilidad';
  section: number;
}

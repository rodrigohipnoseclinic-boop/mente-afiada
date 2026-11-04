/** Nível editorial da pergunta: 1 = fácil, 5 = difícil. */
export type NivelPergunta = 1 | 2 | 3 | 4 | 5;

/**
 * Dificuldade das perguntas curadas.
 * A redação pode variar, mas a fonte de cada item continua registrada em
 * `PERGUNTAS`; este mapa serve apenas para montar progressões suaves.
 */
const DIFICULDADE: Record<string, NivelPergunta> = {
  // Neurociências
  "q-neu-1": 3,
  "q-neu-2": 2,
  "q-neu-3": 1,
  "q-neu-4": 1,
  "q-neu-5": 2,
  "q-neu-6": 4,
  "q-neu-7": 2,
  "q-neu-8": 2,
  "q-tri-neu-1": 2,
  "q-tri-neu-2": 3,
  "q-tri-neu-3": 1,
  "q-tri-neu-4": 1,
  "q-tri-neu-5": 5,

  // Neurofisiologia
  "q-fis-1": 2,
  "q-fis-2": 3,
  "q-fis-3": 3,
  "q-fis-4": 1,
  "q-fis-5": 2,
  "q-fis-6": 4,
  "q-fis-7": 1,
  "q-fis-8": 5,
  "q-tri-fis-1": 2,
  "q-tri-fis-2": 2,
  "q-tri-fis-3": 2,
  "q-tri-fis-4": 1,
  "q-tri-fis-5": 4,

  // Hipnose clínica
  "q-hip-1": 4,
  "q-hip-2": 3,
  "q-hip-3": 1,
  "q-hip-4": 3,
  "q-hip-5": 5,
  "q-hip-6": 2,
  "q-hip-7": 3,
  "q-hip-8": 4,
  "q-tri-hip-1": 3,
  "q-tri-hip-2": 2,
  "q-tri-hip-3": 2,
  "q-tri-hip-4": 4,
  "q-tri-hip-5": 5,

  // Comportamento humano
  "q-com-1": 3,
  "q-com-2": 4,
  "q-com-3": 4,
  "q-com-4": 1,
  "q-com-5": 4,
  "q-com-6": 3,
  "q-com-7": 5,
  "q-com-8": 5,
  "q-tri-com-1": 1,
  "q-tri-com-2": 3,
  "q-tri-com-3": 2,
  "q-tri-com-4": 1,
  "q-tri-com-5": 4,
};

export const dificuldadeDaPergunta = (id: string): NivelPergunta =>
  DIFICULDADE[id] ?? 3;

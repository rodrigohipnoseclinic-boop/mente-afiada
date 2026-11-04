import { PERGUNTAS } from "./perguntas";
import type { Pergunta } from "./tipos";
import { embaralhar, mulberry32 } from "../jogo/rng";

export type NivelPergunta = 1 | 2 | 3 | 4 | 5;

export interface PerguntaMilhao extends Pergunta {
  /** 1 = mais fácil, 5 = mais difícil. */
  nivel: NivelPergunta;
}

/**
 * Dificuldade editorial das perguntas já verificadas.
 * Nada aqui foi inventado: todas as perguntas e fontes vêm de `PERGUNTAS`.
 */
const DIFICULDADE: Record<string, NivelPergunta> = {
  "q-neu-1": 3,
  "q-neu-2": 2,
  "q-neu-3": 1,
  "q-neu-4": 1,
  "q-neu-5": 2,
  "q-neu-6": 4,
  "q-neu-7": 2,
  "q-neu-8": 2,

  "q-fis-1": 2,
  "q-fis-2": 3,
  "q-fis-3": 3,
  "q-fis-4": 1,
  "q-fis-5": 2,
  "q-fis-6": 4,
  "q-fis-7": 1,
  "q-fis-8": 5,

  "q-hip-1": 4,
  "q-hip-2": 3,
  "q-hip-3": 1,
  "q-hip-4": 3,
  "q-hip-5": 5,
  "q-hip-6": 2,
  "q-hip-7": 3,
  "q-hip-8": 4,

  "q-com-1": 3,
  "q-com-2": 4,
  "q-com-3": 4,
  "q-com-4": 1,
  "q-com-5": 4,
  "q-com-6": 3,
  "q-com-7": 5,
  "q-com-8": 5,
};

export const PERGUNTAS_MILHAO: PerguntaMilhao[] = PERGUNTAS.flatMap((pergunta) => {
  const nivel = DIFICULDADE[pergunta.id];
  return nivel ? [{ ...pergunta, nivel }] : [];
});

export const ESCADA_MILHAO = [
  100,
  250,
  500,
  1_000,
  2_500,
  5_000,
  10_000,
  25_000,
  50_000,
  1_000_000,
] as const;

export function montarPartida(semente: number): PerguntaMilhao[] {
  const rand = mulberry32(semente);
  const partida: PerguntaMilhao[] = [];

  for (const nivel of [1, 2, 3, 4, 5] as const) {
    const opcoes = PERGUNTAS_MILHAO.filter((p) => p.nivel === nivel);
    partida.push(...embaralhar(opcoes, rand).slice(0, 2));
  }

  return partida;
}

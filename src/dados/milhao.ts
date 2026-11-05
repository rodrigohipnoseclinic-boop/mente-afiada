import { PERGUNTAS_JOGO } from "./banco";
import type { Pergunta } from "./tipos";
import { embaralhar, mulberry32 } from "../jogo/rng";
import { dificuldadeDaPergunta, type NivelPergunta } from "./dificuldade";

export type { NivelPergunta };

export interface PerguntaMilhao extends Pergunta {
  /** 1 = mais fácil, 5 = mais difícil. */
  nivel: NivelPergunta;
}

export const PERGUNTAS_MILHAO: PerguntaMilhao[] = PERGUNTAS_JOGO.map((pergunta) => ({
  ...pergunta,
  nivel: dificuldadeDaPergunta(pergunta.id),
}));

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

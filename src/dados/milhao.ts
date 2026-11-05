import { PERGUNTAS_JOGO } from "./banco";
import type { Pergunta } from "./tipos";
import { hashSemente } from "../jogo/rng";
import { selecionarPerguntas, type ContextoJogo } from "../jogo/selecao";
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

/**
 * Monta a partida em escada: 2 perguntas por degrau, do fácil ao difícil.
 *
 * O seletor compartilhado cuida de três coisas ao mesmo tempo:
 * - nunca repete o que o jogador já viu enquanto houver pergunta nova;
 * - alterna as quatro trilhas dentro de cada degrau;
 * - acumula `evitar` para a partida inteira não repetir pergunta.
 */
export function montarPartida(
  semente: number = Date.now(),
  contexto: ContextoJogo = {}
): PerguntaMilhao[] {
  const partida: PerguntaMilhao[] = [];
  const evitar: string[] = [];

  for (const nivel of [1, 2, 3, 4, 5] as const) {
    const escolhidas = selecionarPerguntas(PERGUNTAS_JOGO, 2, {
      ...contexto,
      semente: hashSemente("milhao", semente, nivel),
      dificuldade: [nivel],
      evitar,
    });

    for (const pergunta of escolhidas) {
      partida.push({ ...pergunta, nivel: dificuldadeDaPergunta(pergunta.id) });
      evitar.push(pergunta.id);
    }
  }

  // Se algum degrau precisou de pergunta fora da faixa, reordena para a
  // escada continuar subindo de dificuldade.
  return partida.sort((a, b) => a.nivel - b.nivel);
}

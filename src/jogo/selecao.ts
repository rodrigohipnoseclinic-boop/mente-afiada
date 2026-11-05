import { dificuldadeDaPergunta } from "../dados/dificuldade";
import type { Pergunta, TrilhaId } from "../dados/tipos";
import { embaralhar, mulberry32 } from "./rng";

export const ORDEM_TRILHAS: TrilhaId[] = [
  "neurociencias",
  "neurofisiologia",
  "hipnose",
  "comportamento",
  "psicanalise",
];

/** Estado que vem do progresso salvo do jogador. */
export interface ContextoJogo {
  /** IDs já vistos, do mais antigo para o mais recente. */
  vistas?: readonly string[];
  /** Domínio de 0 a 3 por pergunta. */
  masteries?: Record<string, number>;
}

export interface OpcoesSelecao extends ContextoJogo {
  semente?: number;
  /** Faixa de dificuldade desejada (1 a 5). */
  dificuldade?: readonly number[];
  trilhas?: readonly TrilhaId[];
  /** IDs que não podem entrar nesta seleção (ex.: já usados na mesma sessão). */
  evitar?: readonly string[];
}

/** Posição de cada ID no histórico. Quanto menor, mais tempo sem aparecer. */
export function indiceDeVistas(vistas: readonly string[] = []) {
  const mapa = new Map<string, number>();
  vistas.forEach((id, i) => mapa.set(id, i));
  return mapa;
}

/** -1 = nunca vista. Assim "nunca vista" vem antes de qualquer vista. */
export const pesoDeRecencia = (id: string, vistas: Map<string, number>) =>
  vistas.has(id) ? vistas.get(id)! : -1;

/**
 * Escolhe perguntas equilibrando três coisas:
 *
 * 1. prioridade para o que o jogador ainda não viu (ou viu há mais tempo);
 * 2. alternância entre as trilhas, para o conteúdo não virar um só tema;
 * 3. proximidade da dificuldade pedida e mastery mais baixo primeiro.
 *
 * O resultado sai em ordem crescente de dificuldade.
 */
export function selecionarPerguntas(
  banco: readonly Pergunta[],
  quantidade: number,
  opcoes: OpcoesSelecao = {}
): Pergunta[] {
  const vistas = indiceDeVistas(opcoes.vistas);
  const masteries = opcoes.masteries ?? {};
  const evitar = new Set(opcoes.evitar ?? []);
  const trilhas = opcoes.trilhas ?? ORDEM_TRILHAS;
  const alvo = opcoes.dificuldade?.length
    ? Math.round(
        opcoes.dificuldade.reduce((soma, n) => soma + n, 0) /
          opcoes.dificuldade.length
      )
    : 3;

  const disponiveis = banco.filter(
    (p) =>
      p.confianca !== "baixa" &&
      !evitar.has(p.id) &&
      trilhas.includes(p.trilha)
  );

  // Regra de ouro: pergunta nunca vista vem antes de qualquer repetição,
  // mesmo que esteja um degrau acima ou abaixo da faixa da fase. A faixa
  // volta a mandar assim que não houver mais material novo.
  const nuncaVistas = disponiveis.filter((p) => !vistas.has(p.id));
  const base = nuncaVistas.length > 0 ? nuncaVistas : disponiveis;

  const naFaixa = opcoes.dificuldade?.length
    ? base.filter((p) =>
        opcoes.dificuldade!.includes(dificuldadeDaPergunta(p.id))
      )
    : base;
  const pool = naFaixa.length >= quantidade ? naFaixa : base;

  const comparar = (a: Pergunta, b: Pergunta) => {
    const recenciaA = pesoDeRecencia(a.id, vistas);
    const recenciaB = pesoDeRecencia(b.id, vistas);
    if (recenciaA !== recenciaB) return recenciaA - recenciaB;

    const masteryA = masteries[a.id] ?? 0;
    const masteryB = masteries[b.id] ?? 0;
    if (masteryA !== masteryB) return masteryA - masteryB;

    const distanciaA = Math.abs(dificuldadeDaPergunta(a.id) - alvo);
    const distanciaB = Math.abs(dificuldadeDaPergunta(b.id) - alvo);
    if (distanciaA !== distanciaB) return distanciaA - distanciaB;

    return a.id.localeCompare(b.id);
  };

  const rand = mulberry32(opcoes.semente ?? 1);
  const filas = embaralhar(
    trilhas
      .map((trilha) => pool.filter((p) => p.trilha === trilha).sort(comparar))
      .filter((fila) => fila.length > 0),
    rand
  );

  // Uma pergunta de cada trilha por rodada: garante mistura de temas.
  const escolhidas: Pergunta[] = [];
  while (escolhidas.length < quantidade) {
    let avancou = false;
    for (const fila of filas) {
      const proxima = fila.shift();
      if (!proxima) continue;
      escolhidas.push(proxima);
      avancou = true;
      if (escolhidas.length >= quantidade) break;
    }
    if (!avancou) break;
  }

  return escolhidas.sort(
    (a, b) =>
      dificuldadeDaPergunta(a.id) - dificuldadeDaPergunta(b.id) ||
      a.id.localeCompare(b.id)
  );
}

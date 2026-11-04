import type { Grade } from "./gerador-grade";
import { gerarGrade } from "./gerador-grade";
import { embaralhar, hashSemente, mulberry32 } from "./rng";
import { normalizar } from "./normalizar";
import { TERMOS, termosDaTrilha } from "../dados/termos";
import { PERGUNTAS } from "../dados/perguntas";
import type { Pergunta, Termo, TrilhaId } from "../dados/tipos";

export const ORDEM_TRILHAS: TrilhaId[] = [
  "neurociencias",
  "neurofisiologia",
  "hipnose",
  "comportamento",
];

export interface Nivel {
  numero: number;
  trilha: TrilhaId;
  grade: Grade;
  /** Termos efetivamente colocados na grade, na ordem em que aparecem. */
  termos: Termo[];
  perguntas: Pergunta[];
}

/** 6x6 → 10x10 conforme o nível sobe. */
export function tamanhoDaGrade(nivel: number): number {
  if (nivel <= 8) return 6;
  if (nivel <= 20) return 7;
  if (nivel <= 40) return 8;
  if (nivel <= 70) return 9;
  return 10;
}

export function trilhaDoNivel(nivel: number): TrilhaId {
  return ORDEM_TRILHAS[(Math.max(1, nivel) - 1) % ORDEM_TRILHAS.length];
}

export function quantasPalavras(nivel: number, tamanho: number): number {
  if (tamanho <= 6) return 4;
  if (tamanho <= 7) return 5;
  if (tamanho <= 8) return 6;
  if (nivel <= 90) return 7;
  return 8;
}

/**
 * Monta o nível inteiro de forma determinística:
 * mesmo número de nível → mesma grade, mesmos termos, mesmas perguntas.
 */
export function montarNivel(numero: number): Nivel {
  const trilha = trilhaDoNivel(numero);
  const tamanho = tamanhoDaGrade(numero);
  const rand = mulberry32(hashSemente("nivel", numero, trilha));
  const disponiveis = termosDaTrilha(trilha).filter(
    (t) => t.chave.length >= 3 && t.chave.length <= tamanho
  );

  const alvo = Math.min(quantasPalavras(numero, tamanho), disponiveis.length);
  const sorteados = embaralhar(disponiveis, rand).slice(0, alvo);
  const grade = gerarGrade(
    sorteados.map((t) => t.termo),
    tamanho,
    hashSemente("grade", numero)
  );

  // A grade pode recusar uma palavra; mantemos só as que realmente entraram.
  const termos = grade.palavras
    .map((p) => sorteados.find((t) => t.chave === p.chave))
    .filter((t): t is Termo => Boolean(t));

  const perguntas = montarPerguntas(numero, trilha, termos, rand);
  return { numero, trilha, grade, termos, perguntas };
}

function montarPerguntas(
  numero: number,
  trilha: TrilhaId,
  termos: Termo[],
  rand: () => number
): Pergunta[] {
  const curadas = embaralhar(
    PERGUNTAS.filter((p) => p.trilha === trilha && p.confianca !== "baixa"),
    rand
  );
  const geradas = embaralhar(termos, rand).map((t) =>
    perguntaDeDefinicao(t, trilha)
  );

  const todas = [...curadas, ...geradas];
  const unicas: Pergunta[] = [];
  const vistos = new Set<string>();
  for (const p of todas) {
    if (vistos.has(p.id)) continue;
    vistos.add(p.id);
    unicas.push(p);
  }

  // 2 curadas + 1 de definição quando houver material; senão completa como der.
  const escolhidas: Pergunta[] = [];
  const curadasUnicas = unicas.filter((p) => !p.gerada);
  const geradasUnicas = unicas.filter((p) => p.gerada);

  for (const p of curadasUnicas.slice(0, 2)) escolhidas.push(p);
  for (const p of geradasUnicas) {
    if (escolhidas.length >= 3) break;
    escolhidas.push(p);
  }
  for (const p of curadasUnicas.slice(2)) {
    if (escolhidas.length >= 3) break;
    escolhidas.push(p);
  }

  return embaralhar(escolhidas.slice(0, 3), mulberry32(hashSemente("quiz", numero)));
}

/** Gera uma pergunta de definição com distratores da mesma trilha. */
export function perguntaDeDefinicao(termo: Termo, trilha: TrilhaId): Pergunta {
  const universo = TERMOS.filter(
    (t) => t.trilha === trilha && t.id !== termo.id && t.confianca !== "baixa"
  );
  const rand = mulberry32(hashSemente("def", termo.id));
  const distratores = embaralhar(universo, rand).slice(0, 3);
  const opcoes = embaralhar([termo.definicao, ...distratores.map((t) => t.definicao)], rand);

  return {
    id: `def-${termo.id}`,
    trilha,
    enunciado: `O que melhor define “${termo.termo}”?`,
    opcoes,
    correta: opcoes.indexOf(termo.definicao),
    explicacao: `${termo.termo}: ${termo.definicao}`,
    fonte: termo.fonte,
    confianca: termo.confianca,
    gerada: true,
  };
}

export const chaveDoNivel = (nivel: number) =>
  `${trilhaDoNivel(nivel)}-${String(nivel).padStart(3, "0")}`;

export { normalizar };

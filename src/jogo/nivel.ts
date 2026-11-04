import type { Grade } from "./gerador-grade";
import { gerarGrade } from "./gerador-grade";
import { embaralhar, hashSemente, mulberry32 } from "./rng";
import { normalizar } from "./normalizar";
import { TERMOS, termosDaTrilha } from "../dados/termos";
import { PERGUNTAS } from "../dados/perguntas";
import { dificuldadeDaPergunta } from "../dados/dificuldade";
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

/** Grade cresce aos poucos: 6×6 → 10×10 em faixas mais suaves. */
export function tamanhoDaGrade(nivel: number): number {
  if (nivel <= 3) return 6;
  if (nivel <= 8) return 7;
  if (nivel <= 15) return 8;
  if (nivel <= 25) return 9;
  return 10;
}

/** Faixas de dificuldade usadas para escolher perguntas gradualmente. */
const faixaDeDificuldade = (numero: number): number[] => {
  if (numero <= 3) return [1, 2];
  if (numero <= 8) return [1, 2, 3];
  if (numero <= 15) return [2, 3, 4];
  if (numero <= 25) return [3, 4];
  return [4, 5];
};

const dificuldadeNumerica = (p: Pergunta): number =>
  p.gerada
    ? p.explicacao.length > 160
      ? 4
      : p.explicacao.length > 120
        ? 3
        : 2
    : dificuldadeDaPergunta(p.id);

export function trilhaDoNivel(nivel: number): TrilhaId {
  return ORDEM_TRILHAS[(Math.max(1, nivel) - 1) % ORDEM_TRILHAS.length];
}

/** Começa folgado e aumenta gradualmente com o tamanho da grade. */
export function quantasPalavras(tamanho: number): number {
  if (tamanho <= 6) return 3;
  if (tamanho <= 7) return 4;
  if (tamanho <= 8) return 5;
  if (tamanho <= 9) return 6;
  return 7;
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

  const alvo = Math.min(quantasPalavras(tamanho), disponiveis.length);
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
  const curadasTodas = PERGUNTAS.filter(
    (p) => p.confianca !== "baixa"
  );
  const faixa = faixaDeDificuldade(numero);
  const permitidas = curadasTodas.filter((p) =>
    faixa.includes(dificuldadeDaPergunta(p.id))
  );
  const ordenadas = [...(permitidas.length >= 4 ? permitidas : curadasTodas)].sort(
    (a, b) => dificuldadeDaPergunta(a.id) - dificuldadeDaPergunta(b.id) || a.id.localeCompare(b.id)
  );
  // Percorre o banco em sequência para não repetir as mesmas perguntas
  // nas trilhas enquanto ainda houver material não usado.
  const ocorrencia = Math.floor((numero - 1) / ORDEM_TRILHAS.length);
  const inicio = ordenadas.length > 0 ? (ocorrencia * 2) % ordenadas.length : 0;
  const selecionadas = ordenadas.length > 0
    ? [ordenadas[inicio], ordenadas[(inicio + 1) % ordenadas.length]]
    : [];

  const geradas = embaralhar(termos, rand).map((t) =>
    perguntaDeDefinicao(t, trilha)
  );
  const todas = [...selecionadas, ...geradas, ...ordenadas];
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

  return escolhidas
    .slice(0, 3)
    .sort((a, b) => dificuldadeNumerica(a) - dificuldadeNumerica(b));
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

import type { Grade } from "./gerador-grade";
import { gerarGrade } from "./gerador-grade";
import { embaralhar, hashSemente, mulberry32 } from "./rng";
import { normalizar } from "./normalizar";
import { TERMOS_JOGO, PERGUNTAS_JOGO, termosDaTrilha } from "../dados/banco";
import {
  indiceDeVistas,
  pesoDeRecencia,
  selecionarPerguntas,
  type ContextoJogo,
} from "./selecao";
import { dificuldadeDaPergunta } from "../dados/dificuldade";
import type { Pergunta, Termo, TrilhaId } from "../dados/tipos";

export const ORDEM_TRILHAS: TrilhaId[] = [
  "neurociencias",
  "neurofisiologia",
  "hipnose",
  "comportamento",
  "psicanalise",
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
export function montarNivel(numero: number, contexto: ContextoJogo = {}): Nivel {
  const trilha = trilhaDoNivel(numero);
  const tamanho = tamanhoDaGrade(numero);
  const rand = mulberry32(hashSemente("nivel", numero, trilha));
  const cabe = (t: Termo) => t.chave.length >= 3 && t.chave.length <= tamanho;

  // As trilhas têm poucos termos curtos (6×6 precisa de palavras de até 6
  // letras). Começa pelos termos da trilha do nível e completa com os das
  // outras, para a grade nunca nascer vazia. Mesma lógica das perguntas,
  // que já são sorteadas do banco inteiro.
  const proprios = embaralhar(termosDaTrilha(trilha).filter(cabe), rand);
  const emprestados = embaralhar(
    TERMOS_JOGO.filter((t) => t.trilha !== trilha && cabe(t)),
    rand
  );
  const disponiveis = [...proprios, ...emprestados];

  const alvo = Math.min(quantasPalavras(tamanho), disponiveis.length);
  const sementeGrade = hashSemente("grade", numero);
  const tentar = (quantos: number) =>
    gerarGrade(
      disponiveis.slice(0, Math.min(disponiveis.length, quantos)).map((t) => t.termo),
      tamanho,
      sementeGrade
    );

  // Primeiro com o alvo exato; se a grade recusar alguma palavra, tenta com
  // folga de 2 candidatos para o nível não encolher.
  let grade = tentar(alvo);
  if (grade.palavras.length < alvo) grade = tentar(alvo + 2);

  // A grade pode recusar uma palavra; mantemos só as que realmente entraram.
  const termos = grade.palavras
    .map((p) => disponiveis.find((t) => t.chave === p.chave))
    .filter((t): t is Termo => Boolean(t));

  const perguntas = montarPerguntas(numero, trilha, termos, contexto);
  return { numero, trilha, grade, termos, perguntas };
}

function montarPerguntas(
  numero: number,
  trilha: TrilhaId,
  termos: Termo[],
  contexto: ContextoJogo
): Pergunta[] {
  const faixa = faixaDeDificuldade(numero);
  const semente = hashSemente("perguntas", numero, trilha);

  // 2 curadas do banco inteiro: alterna trilhas, prioriza as nunca vistas e
  // respeita a faixa de dificuldade da fase.
  const escolhidas = selecionarPerguntas(PERGUNTAS_JOGO, 2, {
    ...contexto,
    semente,
    dificuldade: faixa,
  });

  // 1 pergunta de definição amarra o quiz ao caça-palavras. Prefere um termo
  // cuja definição ainda não foi perguntada.
  const vistas = indiceDeVistas(contexto.vistas);
  const termo = [...termos].sort((a, b) => {
    const pesoA = pesoDeRecencia(`def-${a.id}`, vistas);
    const pesoB = pesoDeRecencia(`def-${b.id}`, vistas);
    if (pesoA !== pesoB) return pesoA - pesoB;
    return a.id.localeCompare(b.id);
  })[0];

  if (termo) escolhidas.push(perguntaDeDefinicao(termo, termo.trilha));

  // Se o banco estiver curto para a faixa, completa sem repetir o que já entrou.
  if (escolhidas.length < 3) {
    escolhidas.push(
      ...selecionarPerguntas(PERGUNTAS_JOGO, 3 - escolhidas.length, {
        ...contexto,
        semente: semente + 1,
        dificuldade: faixa,
        evitar: escolhidas.map((p) => p.id),
      })
    );
  }

  return escolhidas
    .slice(0, 3)
    .sort((a, b) => dificuldadeNumerica(a) - dificuldadeNumerica(b));
}

/** Gera uma pergunta de definição com distratores da mesma trilha. */
export function perguntaDeDefinicao(termo: Termo, trilha: TrilhaId): Pergunta {
  const universo = TERMOS_JOGO.filter(
    (t) => t.trilha === trilha && t.id !== termo.id
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

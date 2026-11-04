import { embaralhar, mulberry32 } from "./rng";
import { normalizar } from "./normalizar";

export interface Celula {
  linha: number;
  coluna: number;
}

export interface PalavraNaGrade {
  /** Texto exibido na lista, com acentos. */
  termo: string;
  /** Forma usada na grade: A-Z, sem acento nem espaço. */
  chave: string;
  /** Caminho completo da palavra dentro da grade. */
  caminho: Celula[];
}

export interface Grade {
  tamanho: number;
  /** Matriz de letras A-Z. */
  celulas: string[][];
  palavras: PalavraNaGrade[];
}

/** 8 direções: horizontal, vertical e as duas diagonais, nos dois sentidos. */
const DIRECOES: Array<[number, number]> = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

/**
 * Letras com a frequência aproximada do português.
 * Repetir letras comuns deixa a grade com "cara" de texto, não de alfabeto.
 */
const ALFABETO_PT =
  "AAAAAAAAAABCDEEEEEEEEFGHIIIIIIIJLMNOOOOOOPQRRRRRRSSSSSSTUUUUVWXYZ";

const chave = (c: Celula) => `${c.linha}:${c.coluna}`;

/**
 * Gera uma grade determinística.
 * A mesma semente e as mesmas palavras produzem sempre a mesma grade.
 */
export function gerarGrade(
  termos: string[],
  tamanho: number,
  semente: number
): Grade {
  const rand = mulberry32(semente);

  const celulas: Array<Array<string | null>> = Array.from(
    { length: tamanho },
    () => Array<string | null>(tamanho).fill(null)
  );
  const colocadas: PalavraNaGrade[] = [];

  const candidatas = embaralhar(
    termos.map((termo) => ({ termo, chave: normalizar(termo) })),
    rand
  )
    .filter((t) => t.chave.length >= 3 && t.chave.length <= tamanho)
    .sort((a, b) => b.chave.length - a.chave.length);

  for (const candidata of candidatas) {
    const melhor = tentarColocar(candidata.chave, tamanho, rand, celulas);
    if (!melhor) continue;

    melhor.caminho.forEach((c, i) => {
      celulas[c.linha][c.coluna] = candidata.chave[i];
    });

    colocadas.push({
      termo: candidata.termo,
      chave: candidata.chave,
      caminho: melhor.caminho,
    });
  }

  // Preenche o restante com letras plausíveis de português.
  for (let l = 0; l < tamanho; l++) {
    for (let c = 0; c < tamanho; c++) {
      if (celulas[l][c] === null) {
        celulas[l][c] =
          ALFABETO_PT[Math.floor(rand() * ALFABETO_PT.length)] ?? "A";
      }
    }
  }

  return {
    tamanho,
    celulas: celulas as string[][],
    palavras: colocadas.sort((a, b) => a.chave.localeCompare(b.chave)),
  };
}

interface Tentativa {
  caminho: Celula[];
  sobreposicoes: number;
}

/**
 * Tenta encaixar uma palavra. Prefere posições que cruzam letras já escritas,
 * para a grade parecer um caça-palavras de verdade.
 */
function tentarColocar(
  palavra: string,
  tamanho: number,
  rand: () => number,
  celulas: Array<Array<string | null>>
): Tentativa | null {
  const opcoes: Tentativa[] = [];
  const tentativas = 160;

  for (let t = 0; t < tentativas; t++) {
    const [dl, dc] = DIRECOES[Math.floor(rand() * DIRECOES.length)];
    const spanL = (palavra.length - 1) * dl;
    const spanC = (palavra.length - 1) * dc;

    let linhaMin = 0;
    let linhaMax = tamanho - 1;
    let colunaMin = 0;
    let colunaMax = tamanho - 1;

    if (spanL > 0) linhaMax = tamanho - 1 - spanL;
    else linhaMin = -spanL;
    if (spanC > 0) colunaMax = tamanho - 1 - spanC;
    else colunaMin = -spanC;

    if (linhaMin > linhaMax || colunaMin > colunaMax) continue;

    const linha =
      linhaMin + Math.floor(rand() * (linhaMax - linhaMin + 1));
    const coluna =
      colunaMin + Math.floor(rand() * (colunaMax - colunaMin + 1));

    const caminho: Celula[] = [];
    let sobreposicoes = 0;
    let valida = true;

    for (let i = 0; i < palavra.length; i++) {
      const l = linha + i * dl;
      const c = coluna + i * dc;
      if (l < 0 || l >= tamanho || c < 0 || c >= tamanho) {
        valida = false;
        break;
      }
      const atual = celulas[l][c];
      if (atual !== null && atual !== palavra[i]) {
        valida = false;
        break;
      }
      if (atual === palavra[i]) sobreposicoes++;
      caminho.push({ linha: l, coluna: c });
    }

    if (valida) opcoes.push({ caminho, sobreposicoes });
  }

  if (opcoes.length === 0) return null;

  // Entre as opções válidas, sorteia uma das que mais cruzam letras.
  const maxSobreposicoes = Math.max(...opcoes.map((o) => o.sobreposicoes));
  const melhores = opcoes.filter((o) => o.sobreposicoes === maxSobreposicoes);
  return melhores[Math.floor(rand() * melhores.length)];
}

export const chaveCelula = chave;

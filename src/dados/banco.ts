import { PERGUNTAS } from "./perguntas";
import { PERGUNTAS_BOWLBY } from "./perguntas-bowlbys";
import { TERMOS } from "./termos";
import { TERMOS_BOWLBY } from "./bowlby";
import type { Pergunta, Termo, TrilhaId } from "./tipos";

/**
 * Banco único usado pelo jogo.
 *
 * Regra do projeto: item com `confianca: "baixa"` não entra.
 *
 * Os lotes `termos-tri2.ts` e `perguntas-tri2.ts` NÃO entram aqui de propósito:
 * o arquivo de termos tem entradas truncadas ("Cascata Neurol", "Potencial de"),
 * definições em inglês e um erro de fisiologia (o simpático descrito como
 * parassimpático). Antes de religar esse lote, ele precisa ser reescrito e
 * conferido contra `conteudo/extraido/glossario-tri-limpo.txt`.
 */

/** Mantém o primeiro item de cada chave, na ordem em que aparecem. */
function unicosPor<T>(itens: T[], chave: (item: T) => string): T[] {
  const vistos = new Set<string>();
  const saida: T[] = [];
  for (const item of itens) {
    const k = chave(item);
    if (vistos.has(k)) continue;
    vistos.add(k);
    saida.push(item);
  }
  return saida;
}

export const TERMOS_JOGO: Termo[] = unicosPor(
  [...TERMOS, ...TERMOS_BOWLBY].filter((t) => t.confianca !== "baixa"),
  (t) => `${t.trilha}|${t.chave}`
);

export const PERGUNTAS_JOGO: Pergunta[] = unicosPor(
  [...PERGUNTAS, ...PERGUNTAS_BOWLBY].filter((p) => p.confianca !== "baixa"),
  (p) => `${p.id}|${p.enunciado.trim().toLowerCase()}`
);

export const termosDaTrilha = (trilha: TrilhaId) =>
  TERMOS_JOGO.filter((t) => t.trilha === trilha);

import { useState } from "react";
import { Jogo } from "./Jogo";
import { Revisao } from "./Revisao";
import type { ContextoJogo } from "../jogo/selecao";
import type { ResultadoNivel, ResultadoTreino } from "../jogo/progresso";

interface Props {
  numero: number;
  contexto?: ContextoJogo;
  onSair: () => void;
  onConcluir: (resultado: ResultadoNivel) => void;
}

type Etapa =
  | { fase: "caca" }
  | { fase: "desafios"; base: ResultadoNivel; contexto: ContextoJogo };

/**
 * Uma rodada contínua: caça-palavras + quiz e, sem voltar ao menu, os
 * desafios variados (associação, lacuna, mito ou verdade e ordenação).
 *
 * As duas partes compartilham o mesmo histórico: o que foi respondido na
 * primeira não aparece na segunda.
 */
export function Jornada({ numero, contexto, onSair, onConcluir }: Props) {
  const [etapa, setEtapa] = useState<Etapa>({ fase: "caca" });

  if (etapa.fase === "caca") {
    return (
      <Jogo
        numero={numero}
        contexto={contexto}
        rotuloFinal="Ir aos desafios"
        onSair={onSair}
        onConcluir={(base) =>
          setEtapa({
            fase: "desafios",
            base,
            contexto: {
              ...contexto,
              vistas: [
                ...(contexto?.vistas ?? []),
                ...(base.perguntasIds ?? []),
              ],
            },
          })
        }
      />
    );
  }

  const juntar = (desafios: ResultadoTreino): ResultadoNivel => ({
    ...etapa.base,
    xp: etapa.base.xp + desafios.xp,
    perguntas: etapa.base.perguntas + desafios.tarefas,
    acertosPrimeira:
      etapa.base.acertosPrimeira + desafios.acertosPrimeira,
    erros: etapa.base.erros + desafios.erros,
    perfeito: etapa.base.perfeito && desafios.erros === 0,
    perguntasIds: [
      ...(etapa.base.perguntasIds ?? []),
      ...(desafios.perguntasIds ?? []),
    ],
  });

  return (
    <Revisao
      contexto={etapa.contexto}
      semResumo
      onSair={onSair}
      onConcluir={(desafios) => onConcluir(juntar(desafios))}
    />
  );
}

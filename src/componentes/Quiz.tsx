import { useMemo, useState } from "react";
import type { Pergunta } from "../dados/tipos";

interface Props {
  pergunta: Pergunta;
  indice: number;
  total: number;
  onConcluir: (acertouDePrimeira: boolean) => void;
  /** Texto do botão na última pergunta. */
  rotuloFinal?: string;
}

const LETRAS = ["A", "B", "C", "D", "E", "F"];

export function Quiz({ pergunta, indice, total, onConcluir, rotuloFinal }: Props) {
  const [erradas, setErradas] = useState<number[]>([]);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [finalizada, setFinalizada] = useState(false);

  const letras = useMemo(() => LETRAS, []);
  const tentativa = erradas.length + 1;
  const hasUnicaTentativaErrada = erradas.length === 1 && !finalizada;
  const acertou = finalizada && escolha === pergunta.correta;

  const responder = (i: number) => {
    if (finalizada || erradas.includes(i)) return;

    if (i === pergunta.correta) {
      setEscolha(i);
      setFinalizada(true);
      return;
    }

    const novasErradas = [...erradas, i];
    setErradas(novasErradas);

    if (novasErradas.length >= 2) {
      setEscolha(i);
      setFinalizada(true);
      return;
    }

    setEscolha(null);
  };

  return (
    <div className="quiz">
      <div className="quiz-topo">
        <span className="etiqueta">
          Pergunta {indice + 1} de {total}
        </span>
        <div className="pontos" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={`ponto ${i < indice ? "feito" : ""} ${
                i === indice ? "atual" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <h2 className="enunciado">{pergunta.enunciado}</h2>

      {hasUnicaTentativaErrada && (
        <div className="aviso-erro" role="status">
          Ainda não. Você tem mais uma tentativa.
        </div>
      )}

      <div className="opcoes">
        {pergunta.opcoes.map((opcao, i) => {
          const errada = erradas.includes(i);
          const certa = finalizada && i === pergunta.correta;
          const erradaFinal = finalizada && i === escolha && i !== pergunta.correta;
          return (
            <button
              key={i}
              type="button"
              className={`opcao ${certa ? "certa" : ""} ${
                errada || erradaFinal ? "errada" : ""
              }`}
              onClick={() => responder(i)}
              disabled={finalizada || errada}
            >
              <span className="letra">{letras[i]}</span>
              <span className="texto">{opcao}</span>
              {certa && <span className="marca">✓</span>}
              {(errada || erradaFinal) && <span className="marca">✕</span>}
            </button>
          );
        })}
      </div>

      {finalizada && (
        <div className={`explicacao ${acertou ? "ok" : "erro"}`}>
          <strong>
            {acertou
              ? tentativa === 1
                ? "Isso mesmo!"
                : "Correto na segunda tentativa!"
              : "Você errou as duas tentativas."}
          </strong>
          <p>{pergunta.explicacao}</p>
          <p className="fonte-linha">
            Fonte: {pergunta.fonte.titulo} — {pergunta.fonte.instituicao} (
            {pergunta.fonte.ano})
          </p>
          <button
            type="button"
            className={`botao bloco ${acertou ? "primario" : "secundario"}`}
            onClick={() => onConcluir(tentativa === 1)}
          >
            {indice + 1 >= total ? (rotuloFinal ?? "Ver resultado") : "Continuar"}
          </button>
        </div>
      )}
    </div>
  );
}

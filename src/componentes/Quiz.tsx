import { useMemo, useState } from "react";
import type { Pergunta } from "../dados/tipos";

interface Props {
  pergunta: Pergunta;
  indice: number;
  total: number;
  onConcluir: (acertouDePrimeira: boolean) => void;
}

export function Quiz({ pergunta, indice, total, onConcluir }: Props) {
  const [escolha, setEscolha] = useState<number | null>(null);
  const [tentativa, setTentativa] = useState(1);

  const letras = useMemo(() => ["A", "B", "C", "D", "E", "F"], []);
  const respondida = escolha !== null;
  const acertou = escolha === pergunta.correta;

  const responder = (i: number) => {
    if (respondida) return;
    setEscolha(i);
  };

  const tentarDeNovo = () => {
    setEscolha(null);
    setTentativa((t) => t + 1);
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

      <div className="opcoes">
        {pergunta.opcoes.map((opcao, i) => {
          const certa = respondida && i === pergunta.correta;
          const errada = respondida && i === escolha && !acertou;
          return (
            <button
              key={i}
              type="button"
              className={`opcao ${certa ? "certa" : ""} ${errada ? "errada" : ""}`}
              onClick={() => responder(i)}
              disabled={respondida}
            >
              <span className="letra">{letras[i]}</span>
              <span className="texto">{opcao}</span>
              {certa && <span className="marca">✓</span>}
              {errada && <span className="marca">✕</span>}
            </button>
          );
        })}
      </div>

      {respondida && (
        <div className={`explicacao ${acertou ? "ok" : "erro"}`}>
          <strong>{acertou ? "Isso mesmo!" : "A resposta certa está em verde."}</strong>
          <p>{pergunta.explicacao}</p>
          <p className="fonte-linha">
            Fonte: {pergunta.fonte.titulo} — {pergunta.fonte.instituicao} (
            {pergunta.fonte.ano})
          </p>
          {acertou ? (
            <button
              type="button"
              className="botao primario bloco"
              onClick={() => onConcluir(tentativa === 1)}
            >
              {indice + 1 >= total ? "Ver resultado" : "Continuar"}
            </button>
          ) : (
            <button type="button" className="botao secundario bloco" onClick={tentarDeNovo}>
              Tentar de novo
            </button>
          )}
        </div>
      )}
    </div>
  );
}

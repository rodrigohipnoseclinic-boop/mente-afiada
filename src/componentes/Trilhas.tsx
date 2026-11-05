import { useState } from "react";
import { Topo } from "./Topo";
import { TRILHAS } from "../dados/trilhas";
import { termosDaTrilha } from "../dados/banco";
import type { Progresso } from "../jogo/progresso";
import type { TrilhaId } from "../dados/tipos";

export function Trilhas({ progresso }: { progresso: Progresso }) {
  const [aberta, setAberta] = useState<TrilhaId | null>(null);

  return (
    <div className="tela">
      <Topo progresso={progresso} />
      <main className="conteudo">
        <h1 className="titulo-tela">Trilhas</h1>
        <p className="subtitulo">
          Quatro áreas se alternam a cada nível. Toque para ver os termos já
          disponíveis.
        </p>

        {TRILHAS.map((trilha) => {
          const termos = termosDaTrilha(trilha.id);
          const feitos = progresso.trilhas[trilha.id] ?? 0;
          const expandida = aberta === trilha.id;
          return (
            <section
              key={trilha.id}
              className={`cartao trilha ${expandida ? "aberta" : ""}`}
              style={{ borderLeftColor: trilha.cor }}
            >
              <button
                type="button"
                className="trilha-cabecalho"
                onClick={() => setAberta(expandida ? null : trilha.id)}
                aria-expanded={expandida}
              >
                <span className="trilha-emoji" aria-hidden="true">
                  {trilha.emoji}
                </span>
                <span className="trilha-texto">
                  <strong>{trilha.nome}</strong>
                  <small>{trilha.descricao}</small>
                  <small className="fraco">
                    {feitos} nível{feitos === 1 ? "" : "s"} concluído
                    {feitos === 1 ? "" : "s"} · {termos.length} termos
                  </small>
                </span>
                <span className="seta">{expandida ? "▾" : "▸"}</span>
              </button>

              {expandida && (
                <ul className="lista-termos">
                  {termos.map((termo) => (
                    <li key={termo.id}>
                      <strong>{termo.termo}</strong>
                      <p>{termo.definicao}</p>
                      <span className="fonte-linha">
                        {termo.fonte.instituicao} · {termo.fonte.ano}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}

        <p className="nota">
          Todo termo e toda pergunta do app têm fonte declarada. Conteúdo com
          confiança baixa fica fora do jogo até ser conferido.
        </p>
      </main>
    </div>
  );
}

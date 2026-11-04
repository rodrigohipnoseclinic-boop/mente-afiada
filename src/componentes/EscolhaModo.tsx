import { Topo } from "./Topo";
import type { Progresso } from "../jogo/progresso";
export type ModoJogo = "classico" | "milhao" | "revisao";

interface Props {
  progresso: Progresso;
  onEscolher: (modo: ModoJogo) => void;
  onVoltar: () => void;
}

export function EscolhaModo({ progresso, onEscolher, onVoltar }: Props) {
  return (
    <div className="tela escolha">
      <Topo progresso={progresso} />
      <main className="conteudo escolha-conteudo">
        <button type="button" className="botao texto voltar" onClick={onVoltar}>
          ← Voltar
        </button>
        <span className="etiqueta etiqueta-dourada">Escolha como quer jogar</span>
        <h1>O que vamos treinar hoje?</h1>
        <p className="subtitulo">
          Sessões curtas, feedback claro e progresso diário.
        </p>

        <div className="escolha-grid">
          <button type="button" className="modo-card modo-card-classico" onClick={() => onEscolher("classico")}>
            <span className="modo-emoji" aria-hidden="true">🧩</span>
            <div>
              <strong>Jogo clássico</strong>
              <small>Caça-palavras + 3 perguntas. Ideal para manter a ofensiva diária.</small>
            </div>
            <span className="modo-seta" aria-hidden="true">→</span>
          </button>

          <button type="button" className="modo-card modo-card-milhao" onClick={() => onEscolher("milhao")}>
            <span className="modo-emoji" aria-hidden="true">🎯</span>
            <div>
              <strong>Modo Milhão</strong>
              <small>10 perguntas em dificuldade crescente, com 50/50, plateia e pular.</small>
            </div>
            <span className="modo-seta" aria-hidden="true">→</span>
          </button>

          <button type="button" className="modo-card modo-card-revisao" onClick={() => onEscolher("revisao")}>
            <span className="modo-emoji" aria-hidden="true">🧠</span>
            <div>
              <strong>Treino variado</strong>
              <small>Associação, lacunas, mito ou verdade e ordenação em uma sessão curta.</small>
            </div>
            <span className="modo-seta" aria-hidden="true">→</span>
          </button>
        </div>

        <p className="escolha-aviso">
          O Modo Milhão é uma experiência inspirada em jogos de perguntas de TV, com conteúdo original e prêmios fictícios.
        </p>
      </main>
    </div>
  );
}

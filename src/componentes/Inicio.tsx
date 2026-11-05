import { Topo } from "./Topo";
import { trilhaPorId } from "../dados/trilhas";
import { proximoNivel, nivelDoJogador, progressoDoNivel } from "../jogo/progresso";
import type { Progresso } from "../jogo/progresso";
import { tamanhoDaGrade, trilhaDoNivel } from "../jogo/nivel";
import type { Aba } from "./BarraInferior";

interface Props {
  progresso: Progresso;
  onJogar: () => void;
  onIr: (aba: Aba) => void;
}

const dia = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const diaMes = String(d.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${diaMes}`;
};

export function Inicio({ progresso, onJogar, onIr }: Props) {
  const nivel = proximoNivel(progresso);
  const trilha = trilhaPorId(trilhaDoNivel(nivel));
  const tamanho = tamanhoDaGrade(nivel);
  const jogador = nivelDoJogador(progresso.xp);
  const avanco = progressoDoNivel(progresso.xp);
  const precisao =
    progresso.perguntas > 0
      ? Math.round((progresso.acertosPrimeira / progresso.perguntas) * 100)
      : 0;

  const ultimos7 = Array.from({ length: 7 }, (_, i) => {
    const chave = dia(6 - i);
    return { chave, ativo: Boolean(progresso.dias[chave]) };
  });

  return (
    <div className="tela">
      <Topo progresso={progresso} />
      <main className="conteudo">
        <section className="cartao hero" style={{ borderColor: trilha.cor }}>
          <span className="hero-trilha" style={{ color: trilha.cor }}>
            {trilha.emoji} {trilha.nome}
          </span>
          <h1>Rodada {nivel}</h1>
          <p className="hero-sub">
            {tamanho}×{tamanho} · caça-palavras + quiz + desafios variados
          </p>

          <div className="hero-ofensiva">
            <span className="chama">🔥</span>
            <div>
              <strong>
                {progresso.ofensiva === 0
                  ? "Comece sua ofensiva"
                  : `${progresso.ofensiva} dia${progresso.ofensiva > 1 ? "s" : ""} seguidos`}
              </strong>
              <div className="dias">
                {ultimos7.map((d) => (
                  <span
                    key={d.chave}
                    className={`dia ${d.ativo ? "ativo" : ""}`}
                    title={d.chave}
                  />
                ))}
              </div>
            </div>
          </div>

          <button type="button" className="botao primario bloco grande" onClick={onJogar}>
            {progresso.ultimoNivel === 0 ? "Começar" : "Continuar"}
          </button>
        </section>

        <div className="mini-cards">
          <button type="button" className="mini-card" onClick={() => onIr("estatisticas")}>
            <span className="mini-icone">🎯</span>
            <strong>{precisao}%</strong>
            <small>precisão</small>
          </button>
          <button type="button" className="mini-card" onClick={() => onIr("estatisticas")}>
            <span className="mini-icone">📚</span>
            <strong>{progresso.niveisConcluidos}</strong>
            <small>níveis</small>
          </button>
          <button type="button" className="mini-card" onClick={() => onIr("conquistas")}>
            <span className="mini-icone">🏅</span>
            <strong>{progresso.conquistas.length}</strong>
            <small>prêmios</small>
          </button>
        </div>

        <section className="cartao">
          <div className="nivel-jogador">
            <div>
              <h3>Nível {jogador}</h3>
              <p className="fraco">
                {progresso.xp} XP no total
              </p>
            </div>
            <span className="xp-restante">
              {Math.max(0, jogador ** 2 * 40 - progresso.xp)} XP para o próximo
            </span>
          </div>
          <div className="barra">
            <div className="barra-preenchida" style={{ width: `${avanco * 100}%` }} />
          </div>
        </section>

        <section className="cartao suave">
          <h3>Como funciona</h3>
          <ul className="lista-simples">
            <li>Uma rodada junta caça-palavras, quiz, associação, lacunas e mito ou verdade.</li>
            <li>O conteúdo vem das cinco trilhas e evita repetir o que você já viu.</li>
            <li>A dificuldade sobe do básico ao clínico conforme você avança.</li>
            <li>Errar não tira nada: o app explica e deixa tentar de novo.</li>
          </ul>
          <button type="button" className="botao texto" onClick={() => onIr("trilhas")}>
            Ver as cinco trilhas →
          </button>
        </section>
      </main>
    </div>
  );
}

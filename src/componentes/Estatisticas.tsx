import { Topo } from "./Topo";
import { TRILHAS } from "../dados/trilhas";
import { nivelDoJogador } from "../jogo/progresso";
import type { Progresso } from "../jogo/progresso";

const DIAS_CURTOS = ["D", "S", "T", "Q", "Q", "S", "S"];

export function Estatisticas({ progresso }: { progresso: Progresso }) {
  const ultimos14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const chave = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    return {
      chave,
      xp: progresso.dias[chave] ?? 0,
      letra: DIAS_CURTOS[d.getDay()],
    };
  });
  const maximo = Math.max(10, ...ultimos14.map((d) => d.xp));

  const precisao =
    progresso.perguntas > 0
      ? Math.round((progresso.acertosPrimeira / progresso.perguntas) * 100)
      : 0;
  const totalNiveis = Object.values(progresso.trilhas).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="tela">
      <Topo progresso={progresso} />
      <main className="conteudo">
        <h1 className="titulo-tela">Progresso</h1>
        <p className="subtitulo">
          Nível de jogador {nivelDoJogador(progresso.xp)} · {progresso.xp} XP
        </p>

        <div className="mini-cards">
          <div className="mini-card">
            <span className="mini-icone">🔥</span>
            <strong>{progresso.ofensiva}</strong>
            <small>ofensiva</small>
          </div>
          <div className="mini-card">
            <span className="mini-icone">🏔️</span>
            <strong>{progresso.recorde}</strong>
            <small>recorde</small>
          </div>
          <div className="mini-card">
            <span className="mini-icone">✅</span>
            <strong>{progresso.niveisConcluidos}</strong>
            <small>níveis</small>
          </div>
        </div>

        <section className="cartao">
          <h3>Últimos 14 dias</h3>
          <div className="grafico">
            {ultimos14.map((d) => (
              <div key={d.chave} className="coluna" title={`${d.chave}: ${d.xp} XP`}>
                <div className="coluna-area">
                  <div
                    className={`coluna-barra ${d.xp > 0 ? "cheia" : ""}`}
                    style={{ height: `${Math.max(4, (d.xp / maximo) * 100)}%` }}
                  />
                </div>
                <span className="coluna-rotulo">{d.letra}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="cartao">
          <h3>Perguntas</h3>
          <div className="linha-dado">
            <span>Respondidas</span>
            <strong>{progresso.perguntas}</strong>
          </div>
          <div className="linha-dado">
            <span>Acertos de primeira</span>
            <strong>{progresso.acertosPrimeira}</strong>
          </div>
          <div className="linha-dado">
            <span>Tentativas que precisaram de ajuda</span>
            <strong>{progresso.erros}</strong>
          </div>
          <div className="linha-dado">
            <span>Precisão de primeira</span>
            <strong>{precisao}%</strong>
          </div>
          <div className="barra">
            <div className="barra-preenchida" style={{ width: `${precisao}%` }} />
          </div>
        </section>

        <section className="cartao">
          <h3>Níveis por trilha</h3>
          {TRILHAS.map((t) => {
            const feitos = progresso.trilhas[t.id] ?? 0;
            const pct = totalNiveis > 0 ? (feitos / totalNiveis) * 100 : 0;
            return (
              <div key={t.id} className="linha-trilha">
                <span>
                  {t.emoji} {t.nome}
                </span>
                <span className="fraco">{feitos}</span>
                <div className="barra fina">
                  <div
                    className="barra-preenchida"
                    style={{ width: `${pct}%`, background: t.cor }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        <section className="cartao suave">
          <h3>Palavras encontradas</h3>
          <p className="numero-grande">{progresso.palavras}</p>
          <p className="fraco">
            Cada palavra encontrada vale 5 XP. Cada acerto de primeira, 10 XP.
          </p>
        </section>
      </main>
    </div>
  );
}

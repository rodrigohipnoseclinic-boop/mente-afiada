import { Topo } from "./Topo";
import { CONQUISTAS } from "../jogo/conquistas";
import type { Progresso } from "../jogo/progresso";

export function Conquistas({ progresso }: { progresso: Progresso }) {
  const abertas = CONQUISTAS.filter((c) =>
    progresso.conquistas.includes(c.id)
  ).length;

  return (
    <div className="tela">
      <Topo progresso={progresso} />
      <main className="conteudo">
        <h1 className="titulo-tela">Prêmios</h1>
        <p className="subtitulo">
          {abertas} de {CONQUISTAS.length} desbloqueados.
        </p>

        <div className="grade-conquistas">
          {CONQUISTAS.map((c) => {
            const valor = Math.min(c.valor(progresso), c.meta);
            const aberta = progresso.conquistas.includes(c.id);
            const pct = Math.round((valor / c.meta) * 100);
            return (
              <article
                key={c.id}
                className={`conquista ${aberta ? "aberta" : "bloqueada"}`}
              >
                <span className="conquista-emoji" aria-hidden="true">
                  {aberta ? c.emoji : "🔒"}
                </span>
                <strong>{c.nome}</strong>
                <small>{c.descricao}</small>
                {!aberta && (
                  <>
                    <div className="barra fina">
                      <div
                        className="barra-preenchida"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="fraco pequeno">
                      {valor} / {c.meta}
                    </span>
                  </>
                )}
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

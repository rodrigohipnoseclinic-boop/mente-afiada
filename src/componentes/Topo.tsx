import type { Progresso } from "../jogo/progresso";

export function Topo({ progresso }: { progresso: Progresso }) {
  return (
    <header className="topo">
      <div className="marca">
        <span className="marca-icone" aria-hidden="true">
          🧠
        </span>
        <span>Mente Afiada</span>
      </div>
      <div className="pildoras">
        <span className="pildora fogo" title="Ofensiva de dias">
          🔥 {progresso.ofensiva}
        </span>
        <span className="pildora xp" title="Experiência acumulada">
          ⚡ {progresso.xp}
        </span>
      </div>
    </header>
  );
}

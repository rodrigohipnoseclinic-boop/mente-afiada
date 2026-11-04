export type Aba = "inicio" | "trilhas" | "conquistas" | "estatisticas" | "ajustes";

const ITENS: Array<{ id: Aba; rotulo: string; icone: string }> = [
  { id: "inicio", rotulo: "Início", icone: "🏠" },
  { id: "trilhas", rotulo: "Trilhas", icone: "🧭" },
  { id: "conquistas", rotulo: "Prêmios", icone: "🏅" },
  { id: "estatisticas", rotulo: "Progresso", icone: "📊" },
  { id: "ajustes", rotulo: "Ajustes", icone: "⚙️" },
];

interface Props {
  atual: Aba;
  onIr: (aba: Aba) => void;
}

export function BarraInferior({ atual, onIr }: Props) {
  return (
    <nav className="barra-inferior" aria-label="Navegação principal">
      {ITENS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`aba ${atual === item.id ? "ativa" : ""}`}
          onClick={() => onIr(item.id)}
          aria-current={atual === item.id ? "page" : undefined}
        >
          <span className="aba-icone" aria-hidden="true">
            {item.icone}
          </span>
          <span>{item.rotulo}</span>
        </button>
      ))}
    </nav>
  );
}

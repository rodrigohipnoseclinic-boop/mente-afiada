import type { TrilhaId } from "../dados/tipos";

export interface Progresso {
  versao: 1;
  xp: number;
  niveisConcluidos: number;
  ultimoNivel: number;
  ofensiva: number;
  recorde: number;
  ultimoDia: string | null;
  /** XP por dia (chave YYYY-MM-DD), usado no gráfico das estatísticas. */
  dias: Record<string, number>;
  trilhas: Record<TrilhaId, number>;
  palavras: number;
  perguntas: number;
  acertosPrimeira: number;
  erros: number;
  perfeitos: number;
  conquistas: string[];
  criadoEm: string;
  lembrete: boolean;
  hora: string;
}

export interface ResultadoNivel {
  numero: number;
  trilha: TrilhaId;
  xp: number;
  palavras: number;
  perguntas: number;
  acertosPrimeira: number;
  erros: number;
  perfeito: boolean;
}

const CHAVE = "mente-afiada:progresso:v1";

export const hojeLocal = (d = new Date()): string => {
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
};

const criarTrilhas = (): Record<TrilhaId, number> => ({
  neurociencias: 0,
  neurofisiologia: 0,
  hipnose: 0,
  comportamento: 0,
});

export function estadoInicial(): Progresso {
  return {
    versao: 1,
    xp: 0,
    niveisConcluidos: 0,
    ultimoNivel: 0,
    ofensiva: 0,
    recorde: 0,
    ultimoDia: null,
    dias: {},
    trilhas: criarTrilhas(),
    palavras: 0,
    perguntas: 0,
    acertosPrimeira: 0,
    erros: 0,
    perfeitos: 0,
    conquistas: [],
    criadoEm: hojeLocal(),
    lembrete: false,
    hora: "19:00",
  };
}

export function carregar(): Progresso {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (!bruto) return estadoInicial();
    return normalizarEstado(JSON.parse(bruto));
  } catch {
    return estadoInicial();
  }
}

export function salvar(p: Progresso): void {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(p));
  } catch {
    // Modo privado ou cota cheia: o app continua funcionando em memória.
  }
}

/** Protege contra backup antigo, campo faltando ou JSON adulterado. */
export function normalizarEstado(bruto: unknown): Progresso {
  const base = estadoInicial();
  if (!bruto || typeof bruto !== "object") return base;
  const p = bruto as Partial<Progresso>;
  const num = (v: unknown, padrao = 0) =>
    typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : padrao;

  return {
    versao: 1,
    xp: num(p.xp),
    niveisConcluidos: num(p.niveisConcluidos),
    ultimoNivel: num(p.ultimoNivel),
    ofensiva: num(p.ofensiva),
    recorde: num(p.recorde),
    ultimoDia: typeof p.ultimoDia === "string" ? p.ultimoDia : null,
    dias:
      p.dias && typeof p.dias === "object"
        ? Object.fromEntries(
            Object.entries(p.dias)
              .filter(([, v]) => typeof v === "number" && Number.isFinite(v))
              .slice(-120)
          )
        : {},
    trilhas: { ...base.trilhas, ...(p.trilhas ?? {}) },
    palavras: num(p.palavras),
    perguntas: num(p.perguntas),
    acertosPrimeira: num(p.acertosPrimeira),
    erros: num(p.erros),
    perfeitos: num(p.perfeitos),
    conquistas: Array.isArray(p.conquistas)
      ? p.conquistas.filter((c): c is string => typeof c === "string")
      : [],
    criadoEm: typeof p.criadoEm === "string" ? p.criadoEm : base.criadoEm,
    lembrete: Boolean(p.lembrete),
    hora: typeof p.hora === "string" ? p.hora : "19:00",
  };
}

export function registrarNivel(
  atual: Progresso,
  resultado: ResultadoNivel
): Progresso {
  const hoje = hojeLocal();
  const ontem = hojeLocal(new Date(Date.now() - 86400000));

  let ofensiva = atual.ofensiva;
  if (atual.ultimoDia !== hoje) {
    ofensiva = atual.ultimoDia === ontem ? atual.ofensiva + 1 : 1;
  }
  if (ofensiva < 1) ofensiva = 1;

  return {
    ...atual,
    xp: atual.xp + resultado.xp,
    niveisConcluidos: atual.niveisConcluidos + 1,
    ultimoNivel: Math.max(atual.ultimoNivel, resultado.numero),
    ofensiva,
    recorde: Math.max(atual.recorde, ofensiva),
    ultimoDia: hoje,
    dias: { ...atual.dias, [hoje]: (atual.dias[hoje] ?? 0) + resultado.xp },
    trilhas: {
      ...atual.trilhas,
      [resultado.trilha]: (atual.trilhas[resultado.trilha] ?? 0) + 1,
    },
    palavras: atual.palavras + resultado.palavras,
    perguntas: atual.perguntas + resultado.perguntas,
    acertosPrimeira: atual.acertosPrimeira + resultado.acertosPrimeira,
    erros: atual.erros + resultado.erros,
    perfeitos: atual.perfeitos + (resultado.perfeito ? 1 : 0),
  };
}

export function nivelDoJogador(xp: number): number {
  return 1 + Math.floor(Math.sqrt(Math.max(0, xp) / 40));
}

/** Quanto falta (0 a 1) para o próximo nível de jogador. */
export function progressoDoNivel(xp: number): number {
  const nivel = nivelDoJogador(xp);
  const inicio = (nivel - 1) ** 2 * 40;
  const fim = nivel ** 2 * 40;
  return Math.min(1, Math.max(0, (xp - inicio) / (fim - inicio)));
}

export const proximoNivel = (p: Progresso) => p.ultimoNivel + 1;

export function exportar(p: Progresso): string {
  return JSON.stringify(
    { app: "Mente Afiada", exportadoEm: new Date().toISOString(), progresso: p },
    null,
    2
  );
}

export function importar(texto: string): Progresso {
  const dados = JSON.parse(texto);
  const bruto =
    dados && typeof dados === "object" && "progresso" in dados
      ? (dados as { progresso: unknown }).progresso
      : dados;
  return normalizarEstado(bruto);
}

export function limpar(): void {
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    // sem localStorage, nada a limpar
  }
}

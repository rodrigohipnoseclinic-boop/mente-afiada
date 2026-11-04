import type { Progresso } from "./progresso";

export interface Conquista {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  /** Quanto o jogador já tem nessa métrica. */
  valor: (p: Progresso) => number;
  meta: number;
}

export const CONQUISTAS: Conquista[] = [
  {
    id: "primeiro-passo",
    nome: "Primeiro passo",
    descricao: "Conclua o primeiro nível.",
    emoji: "🌱",
    valor: (p) => p.niveisConcluidos,
    meta: 1,
  },
  {
    id: "aprendiz",
    nome: "Aprendiz",
    descricao: "Conclua 5 níveis.",
    emoji: "📘",
    valor: (p) => p.niveisConcluidos,
    meta: 5,
  },
  {
    id: "constante",
    nome: "Constante",
    descricao: "Conclua 20 níveis.",
    emoji: "🔁",
    valor: (p) => p.niveisConcluidos,
    meta: 20,
  },
  {
    id: "veterano",
    nome: "Veterano",
    descricao: "Conclua 50 níveis.",
    emoji: "🎖️",
    valor: (p) => p.niveisConcluidos,
    meta: 50,
  },
  {
    id: "mestre",
    nome: "Mestre",
    descricao: "Conclua 100 níveis.",
    emoji: "🏆",
    valor: (p) => p.niveisConcluidos,
    meta: 100,
  },
  {
    id: "lenda",
    nome: "Lenda",
    descricao: "Conclua 250 níveis.",
    emoji: "👑",
    valor: (p) => p.niveisConcluidos,
    meta: 250,
  },
  {
    id: "chama-3",
    nome: "Chama acesa",
    descricao: "Mantenha uma ofensiva de 3 dias.",
    emoji: "🔥",
    valor: (p) => p.recorde,
    meta: 3,
  },
  {
    id: "chama-7",
    nome: "Semana firme",
    descricao: "Mantenha uma ofensiva de 7 dias.",
    emoji: "🕯️",
    valor: (p) => p.recorde,
    meta: 7,
  },
  {
    id: "chama-30",
    nome: "Hábito",
    descricao: "Mantenha uma ofensiva de 30 dias.",
    emoji: "🌋",
    valor: (p) => p.recorde,
    meta: 30,
  },
  {
    id: "chama-100",
    nome: "Inabalável",
    descricao: "Mantenha uma ofensiva de 100 dias.",
    emoji: "💎",
    valor: (p) => p.recorde,
    meta: 100,
  },
  {
    id: "xp-100",
    nome: "Centelha",
    descricao: "Acumule 100 XP.",
    emoji: "✨",
    valor: (p) => p.xp,
    meta: 100,
  },
  {
    id: "xp-500",
    nome: "Faísca",
    descricao: "Acumule 500 XP.",
    emoji: "⚡",
    valor: (p) => p.xp,
    meta: 500,
  },
  {
    id: "xp-2000",
    nome: "Tempestade",
    descricao: "Acumule 2.000 XP.",
    emoji: "🌩️",
    valor: (p) => p.xp,
    meta: 2000,
  },
  {
    id: "xp-5000",
    nome: "Supernova",
    descricao: "Acumule 5.000 XP.",
    emoji: "🌟",
    valor: (p) => p.xp,
    meta: 5000,
  },
  {
    id: "palavras-100",
    nome: "Caçador",
    descricao: "Encontre 100 palavras na grade.",
    emoji: "🔎",
    valor: (p) => p.palavras,
    meta: 100,
  },
  {
    id: "palavras-500",
    nome: "Detetive",
    descricao: "Encontre 500 palavras na grade.",
    emoji: "🕵️",
    valor: (p) => p.palavras,
    meta: 500,
  },
  {
    id: "palavras-1000",
    nome: "Olho clínico",
    descricao: "Encontre 1.000 palavras na grade.",
    emoji: "👁️",
    valor: (p) => p.palavras,
    meta: 1000,
  },
  {
    id: "explorador",
    nome: "Explorador",
    descricao: "Conclua ao menos um nível em cada trilha.",
    emoji: "🧭",
    valor: (p) =>
      Math.min(
        p.trilhas.neurociencias,
        p.trilhas.neurofisiologia,
        p.trilhas.hipnose,
        p.trilhas.comportamento
      ),
    meta: 1,
  },
  {
    id: "perfeccionista",
    nome: "Perfeccionista",
    descricao: "Feche 10 níveis acertando tudo de primeira.",
    emoji: "🎯",
    valor: (p) => p.perfeitos,
    meta: 10,
  },
  {
    id: "preciso",
    nome: "Precisão cirúrgica",
    descricao: "Acerte 90% das perguntas de primeira, com 50 respondidas.",
    emoji: "🧪",
    valor: (p) =>
      p.perguntas >= 50 ? Math.floor((p.acertosPrimeira / p.perguntas) * 100) : 0,
    meta: 90,
  },
];

export const conquistaPorId = (id: string) =>
  CONQUISTAS.find((c) => c.id === id);

export const estaDesbloqueada = (p: Progresso, c: Conquista) =>
  p.conquistas.includes(c.id) || c.valor(p) >= c.meta;

/** Retorna os ids desbloqueados agora, já marcados no progresso. */
export function verificarConquistas(p: Progresso): {
  progresso: Progresso;
  novas: Conquista[];
} {
  const novas: Conquista[] = [];
  for (const c of CONQUISTAS) {
    if (p.conquistas.includes(c.id)) continue;
    if (c.valor(p) >= c.meta) novas.push(c);
  }
  if (novas.length === 0) return { progresso: p, novas };

  return {
    progresso: {
      ...p,
      conquistas: [...p.conquistas, ...novas.map((c) => c.id)],
    },
    novas,
  };
}

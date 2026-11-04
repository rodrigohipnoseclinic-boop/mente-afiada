import type { Trilha } from "./tipos";

export const TRILHAS: Trilha[] = [
  {
    id: "neurociencias",
    nome: "Neurociências",
    curto: "Neuro",
    descricao:
      "Neurônios, sinapses, neurotransmissores e as grandes estruturas do cérebro.",
    emoji: "🧠",
    cor: "#1cb0f6",
  },
  {
    id: "neurofisiologia",
    nome: "Neurofisiologia",
    curto: "Fisiologia",
    descricao:
      "Potencial de ação, membrana, mielina, reflexos e o sistema nervoso autônomo.",
    emoji: "⚡",
    cor: "#ffc800",
  },
  {
    id: "hipnose",
    nome: "Hipnose Clínica",
    curto: "Hipnose",
    descricao:
      "Transe, indução, sugestão e o que a evidência científica realmente mostra.",
    emoji: "🌀",
    cor: "#ce82ff",
  },
  {
    id: "comportamento",
    nome: "Comportamento Humano",
    curto: "Comportamento",
    descricao:
      "Condicionamento, reforço, vieses, emoções e os conceitos da TRI.",
    emoji: "🤝",
    cor: "#58cc02",
  },
];

export const trilhaPorId = (id: string) =>
  TRILHAS.find((t) => t.id === id) ?? TRILHAS[0];

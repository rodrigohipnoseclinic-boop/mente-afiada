export type TrilhaId =
  | "neurociencias"
  | "neurofisiologia"
  | "hipnose"
  | "comportamento"
  | "psicanalise";

export interface Fonte {
  titulo: string;
  instituicao: string;
  url: string;
  ano: number;
}

export interface Trilha {
  id: TrilhaId;
  nome: string;
  curto: string;
  descricao: string;
  emoji: string;
  cor: string;
}

export interface Termo {
  id: string;
  /** Forma exibida, com acentos. */
  termo: string;
  /** Forma para a grade: A-Z, sem acento nem espaço. */
  chave: string;
  /** Micro-aula de 1 a 2 frases. */
  definicao: string;
  trilha: TrilhaId;
  fonte: Fonte;
  confianca: "alta" | "media" | "baixa";
}

export interface Pergunta {
  id: string;
  trilha: TrilhaId;
  enunciado: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
  fonte: Fonte;
  confianca: "alta" | "media" | "baixa";
  /** Quando true, a pergunta foi gerada a partir de um termo do próprio banco. */
  gerada?: boolean;
  /** Nível de domínio interno (não persiste nas perguntas, é calculado pelo sistema). */
  nivelMastery?: number; // 0=nova, 1=aprendendo, 2=dominada, 3=consolidadas
}

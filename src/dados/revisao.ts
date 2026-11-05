import { TERMOS_JOGO } from "./banco";
import type { Termo, TrilhaId } from "./tipos";
import { embaralhar, hashSemente, mulberry32 } from "../jogo/rng";
import { normalizar } from "../jogo/normalizar";

const GLOSSARIO = {
  titulo: "Glossário TRI",
  instituicao: "Material próprio TRI",
  url: "conteudo/extraido/glossario-tri.txt",
  ano: 2025,
};
const TRI_PRINCIPIOS = {
  titulo: "Os Dez Princípios TRI",
  instituicao: "Material próprio TRI",
  url: "conteudo/extraido/principios-da-tri-pdf.txt",
  ano: 2025,
};
const TRI_MANUAL = {
  titulo: "Manual de Terapia de Reintegração Implícita 2025",
  instituicao: "Material próprio TRI",
  url: "conteudo/extraido/manual-de-terapia-de-reintegracao-implicita-2025-docx.txt",
  ano: 2025,
};
const APA = {
  titulo: "Definition and Description of Hypnosis",
  instituicao: "APA Division 30",
  url: "https://www.apadivisions.org/division-30/about",
  ano: 2014,
};
const NOBA_MEMORIA = {
  titulo: "Memory (Encoding, Storage, Retrieval)",
  instituicao: "Noba Project (McDermott & Roediger)",
  url: "https://nobaproject.com/modules/memory-encoding-storage-retrieval",
  ano: 2026,
};
const A_AND_P = {
  titulo: "Anatomy and Physiology 2e, cap. 12–13",
  instituicao: "OpenStax",
  url: "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-introduction",
  ano: 2022,
};

export type TarefaRevisao =
  | AssociacaoTarefa
  | LacunaTarefa
  | MitoTarefa
  | OrdenarTarefa;

export interface AssociacaoTarefa {
  tipo: "associar";
  id: string;
  trilha: TrilhaId;
  fonte: typeof GLOSSARIO | typeof TRI_PRINCIPIOS;
  confianca: "alta" | "media";
  pares: Array<Pick<Termo, "id" | "termo" | "definicao">>;
}

export interface LacunaTarefa {
  tipo: "lacuna";
  id: string;
  trilha: TrilhaId;
  fonte: Termo["fonte"];
  confianca: "alta" | "media";
  enunciado: string;
  resposta: string;
  explicacao: string;
}

export interface MitoTarefa {
  tipo: "mito";
  id: string;
  trilha: TrilhaId;
  fonte: typeof GLOSSARIO | typeof TRI_PRINCIPIOS | typeof TRI_MANUAL | typeof APA;
  confianca: "alta" | "media";
  afirmacao: string;
  verdade: boolean;
  explicacao: string;
}

export interface OrdenarTarefa {
  tipo: "ordenar";
  id: string;
  trilha: TrilhaId;
  fonte: typeof GLOSSARIO | typeof NOBA_MEMORIA | typeof A_AND_P;
  confianca: "alta" | "media";
  enunciado: string;
  etapas: string[];
  explicacao: string;
}

const escaparRegExp = (valor: string) =>
  valor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const termosTri = () =>
  TERMOS_JOGO.filter(
    (t) =>
      t.fonte.instituicao === "Material próprio TRI" && t.confianca !== "baixa"
  );

const daFonte = (t: Termo, titulo: string) => t.fonte.titulo === titulo;

const montarAssociacao = (
  semente: number,
  fonteTitulo: "Glossário TRI" | "Os Dez Princípios TRI"
): AssociacaoTarefa | null => {
  const rand = mulberry32(semente);
  const universo = embaralhar(
    termosTri().filter(
      (t) => daFonte(t, fonteTitulo) && t.definicao.length <= 135
    ),
    rand
  );
  const pares = universo.slice(0, 4).map((t) => ({
    id: t.id,
    termo: t.termo,
    definicao: t.definicao,
  }));
  if (pares.length < 4) return null;
  return {
    tipo: "associar",
    id: `assoc-${normalizar(fonteTitulo).replace(/\s+/g, "-")}`,
    trilha: pares[0] ? "comportamento" : "comportamento",
    fonte: fonteTitulo === "Glossário TRI" ? GLOSSARIO : TRI_PRINCIPIOS,
    confianca: fonteTitulo === "Glossário TRI" ? "alta" : "alta",
    pares,
  };
};

const montarLacunas = (semente: number): LacunaTarefa[] => {
  const rand = mulberry32(semente);
  return embaralhar(termosTri(), rand)
    .slice(0, 2)
    .map((t) => {
      const termo = escaparRegExp(t.termo);
      const temTermoNaDefinicao = new RegExp(termo, "i").test(t.definicao);
      const enunciado = temTermoNaDefinicao
        ? t.definicao.replace(new RegExp(termo, "gi"), "______")
        : `Na TRI, ______ refere-se a: ${t.definicao}`;
      return {
        tipo: "lacuna",
        id: `lacuna-${t.id}`,
        trilha: t.trilha,
        fonte: t.fonte,
        confianca: t.confianca as "alta" | "media",
        enunciado,
        resposta: t.termo,
        explicacao: `${t.termo}: ${t.definicao}`,
      };
    });
};

const MITOS: MitoTarefa[] = [
  {
    tipo: "mito",
    id: "mito-tri-1",
    trilha: "hipnose",
    fonte: GLOSSARIO,
    confianca: "alta",
    afirmacao: "A TRI depende de transe profundo e de sugestão para funcionar.",
    verdade: false,
    explicacao: "A TRI usa foco e observação; não é uma técnica de reprogramação ou sugestão pós-hipnótica.",
  },
  {
    tipo: "mito",
    id: "mito-tri-2",
    trilha: "hipnose",
    fonte: GLOSSARIO,
    confianca: "alta",
    afirmacao: "Na TRI, o trabalho foca o funcionamento presente, não uma regressão obrigatória ao passado.",
    verdade: true,
    explicacao: "O objetivo é perceber como a resposta funciona hoje, sem exigir reviver o passado.",
  },
  {
    tipo: "mito",
    id: "mito-neu-1",
    trilha: "neurociencias",
    fonte: GLOSSARIO,
    confianca: "alta",
    afirmacao: "Memória implícita exige recuperação consciente para influenciar o comportamento.",
    verdade: false,
    explicacao: "A memória implícita aparece no fazer e no reagir, sem recordação consciente.",
  },
  {
    tipo: "mito",
    id: "mito-com-1",
    trilha: "comportamento",
    fonte: GLOSSARIO,
    confianca: "alta",
    afirmacao: "Gambiarra emocional é uma solução que resolve a causa do desconforto.",
    verdade: false,
    explicacao: "É um alívio rápido que mascara a causa, sem resolver o conflito subjacente.",
  },
  {
    tipo: "mito",
    id: "mito-fis-1",
    trilha: "neurofisiologia",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
    afirmacao: "“O corpo é o palco” significa que postura e reações somáticas expressam padrões emocionais.",
    verdade: true,
    explicacao: "Na TRI, o corpo manifesta sistemas representacionais de forma visível.",
  },
  {
    tipo: "mito",
    id: "mito-hip-1",
    trilha: "hipnose",
    fonte: TRI_MANUAL,
    confianca: "media",
    afirmacao: "Revelação é o momento em que tensões e associações implícitas se tornam perceptíveis.",
    verdade: true,
    explicacao: "Revelação não exige uma interpretação única; é a percepção mais clara do implícito.",
  },
  {
    tipo: "mito",
    id: "mito-com-2",
    trilha: "comportamento",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
    afirmacao: "Narrativa coerente é uma mentira elaborada para evitar a terapia.",
    verdade: false,
    explicacao: "É a história interna que organiza experiências e dá sentido à vida.",
  },
  {
    tipo: "mito",
    id: "mito-hip-2",
    trilha: "hipnose",
    fonte: APA,
    confianca: "alta",
    afirmacao: "Hipnose envolve atenção focada e capacidade ampliada de responder à sugestão.",
    verdade: true,
    explicacao: "Esta é a definição oficial da APA Division 30 (2014).",
  },
  {
    tipo: "mito",
    id: "mito-hip-3",
    trilha: "hipnose",
    fonte: APA,
    confianca: "alta",
    afirmacao: "Hipnose é o mesmo que sono.",
    verdade: false,
    explicacao: "A APA descreve hipnose como estado de consciência, não como sono.",
  },
  {
    tipo: "mito",
    id: "mito-hip-4",
    trilha: "hipnose",
    fonte: APA,
    confianca: "alta",
    afirmacao: "Pessoa hipnotizável é necessariamente crédula ou fraca de caráter.",
    verdade: false,
    explicacao: "Hipnotizabilidade é a capacidade de responder a sugestões; não é sinônimo de credulidade.",
  },
  {
    tipo: "mito",
    id: "mito-neu-2",
    trilha: "neurociencias",
    fonte: GLOSSARIO,
    confianca: "alta",
    afirmacao: "Memória declarativa é acessível conscientemente.",
    verdade: true,
    explicacao: "Memória declarativa (explícita) pode ser lembrada e descrita conscientemente.",
  },
  {
    tipo: "mito",
    id: "mito-tri-3",
    trilha: "hipnose",
    fonte: GLOSSARIO,
    confianca: "alta",
    afirmacao: "TRI exige reviver traumas passados para fazer efeito.",
    verdade: false,
    explicacao: "A TRI trabalha o funcionamento presente, sem obrigar o cliente a reviver o passado.",
  },
];

const ORDENS: OrdenarTarefa[] = [
  {
    tipo: "ordenar",
    id: "ordem-memoria",
    trilha: "neurociencias",
    fonte: NOBA_MEMORIA,
    confianca: "alta",
    enunciado: "Ordene as etapas básicas da memória:",
    etapas: ["Experiência", "Codificação", "Armazenamento", "Recuperação"],
    explicacao: "A memória passa por codificar, guardar e recuperar a informação.",
  },
  {
    tipo: "ordenar",
    id: "ordem-reflexo",
    trilha: "neurofisiologia",
    fonte: A_AND_P,
    confianca: "alta",
    enunciado: "Ordene o caminho de um reflexo simples:",
    etapas: ["Receptor", "Neurônio sensorial", "Integração na medula", "Neurônio motor", "Resposta muscular"],
    explicacao: "O sinal chega pela via sensorial, é integrado e retorna pela via motora.",
  },
  {
    tipo: "ordenar",
    id: "ordem-evitativo",
    trilha: "comportamento",
    fonte: GLOSSARIO,
    confianca: "alta",
    enunciado: "Ordene como se consolida o padrão evitativo:",
    etapas: ["Desconforto", "Alívio imediato", "Reforço positivo", "Padrão evitativo consolidado"],
    explicacao: "O alívio reforça a evitação e transforma a reação em padrão.",
  },
  {
    tipo: "ordenar",
    id: "ordem-marcador",
    trilha: "neurociencias",
    fonte: GLOSSARIO,
    confianca: "media",
    enunciado: "Ordene a sequência do marcador somático:",
    etapas: ["Estímulo", "Estado corporal", "Sinal automático", "Escolha ou ação"],
    explicacao: "O corpo sinaliza opções antes de a decisão ficar totalmente consciente.",
  },
];

/** Monta uma sessão curta com as quatro modalidades selecionadas. */
export function montarSessao(semente = Date.now()): TarefaRevisao[] {
  const rand = mulberry32(semente);
  const associacaoGloss = montarAssociacao(hashSemente("revisao", semente, "gloss"), "Glossário TRI");
  const associacaoPrin = montarAssociacao(hashSemente("revisao", semente, "prin"), "Os Dez Princípios TRI");
  const lacunas = montarLacunas(hashSemente("revisao", semente, "lacunas"));
  const mitos = embaralhar(MITOS, rand).slice(0, 3);
  const ordenar = embaralhar(ORDENS, rand).slice(0, 1);

  return embaralhar(
    [associacaoGloss, associacaoPrin, ...lacunas, ...mitos, ...ordenar].filter(
      (t): t is TarefaRevisao => Boolean(t)
    ),
    rand
  );
}

/** Normaliza respostas digitadas para comparar ignorando acento, caixa e pontuação. */
export const respostaNormalizada = (valor: string) => normalizar(valor);

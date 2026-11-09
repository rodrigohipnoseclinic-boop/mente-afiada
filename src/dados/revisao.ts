import { TERMOS_JOGO } from "./banco";
import type { Termo, TrilhaId } from "./tipos";
import { embaralhar, hashSemente, mulberry32 } from "../jogo/rng";
import { normalizar } from "../jogo/normalizar";
import {
  indiceDeVistas,
  pesoDeRecencia,
  type ContextoJogo,
} from "../jogo/selecao";

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
const APA_DICIONARIO = {
  titulo: "APA Dictionary of Psychology",
  instituicao: "American Psychological Association",
  url: "https://dictionary.apa.org/",
  ano: 2026,
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
  fonte: Termo["fonte"];
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
  fonte: Termo["fonte"];
  confianca: "alta" | "media";
  afirmacao: string;
  verdade: boolean;
  explicacao: string;
}

export interface OrdenarTarefa {
  tipo: "ordenar";
  id: string;
  trilha: TrilhaId;
  fonte: Termo["fonte"];
  confianca: "alta" | "media";
  enunciado: string;
  etapas: string[];
  explicacao: string;
}

/**
 * Ordem das dinâmicas na sessão. Vai do reconhecimento (associar) para a
 * recordação (lacuna), o julgamento (mito) e a reconstrução de um processo
 * (ordenar) — a progressão de dificuldade pedida.
 */
const PESO_DINAMICA: Record<TarefaRevisao["tipo"], number> = {
  associar: 1,
  lacuna: 2,
  mito: 3,
  ordenar: 4,
};

/** Fontes usadas na segunda associação, uma por trilha. */
const FONTES_MISTAS: Array<{ titulo: string; trilha: TrilhaId }> = [
  { titulo: "Brain Basics", trilha: "neurociencias" },
  { titulo: "Anatomy and Physiology 2e, cap. 12–13", trilha: "neurofisiologia" },
  { titulo: "Definition and Description of Hypnosis", trilha: "hipnose" },
  { titulo: "Conditioning and Learning", trilha: "comportamento" },
  { titulo: "APA Dictionary of Psychology", trilha: "psicanalise" },
];

const escaparRegExp = (valor: string) =>
  valor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const slug = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** -1 quando o termo nunca apareceu em nenhuma dinâmica. */
const pesoDoTermo = (termo: Termo, vistas: Map<string, number>): number => {
  const pesos = ["assoc", "lacuna", "def"]
    .map((prefixo) => vistas.get(`${prefixo}-${termo.id}`))
    .filter((valor): valor is number => valor !== undefined);
  return pesos.length > 0 ? Math.min(...pesos) : -1;
};

/** Embaralha para variar a sessão e depois coloca os nunca vistos na frente. */
const ordenarTermos = (
  termos: Termo[],
  vistas: Map<string, number>,
  rand: () => number
): Termo[] =>
  embaralhar(termos, rand).sort(
    (a, b) => pesoDoTermo(a, vistas) - pesoDoTermo(b, vistas)
  );

const montarAssociacao = (
  fonte: { titulo: string; trilha?: TrilhaId },
  semente: number,
  contexto: ContextoJogo,
  usados: Set<string>
): AssociacaoTarefa | null => {
  const vistas = indiceDeVistas(contexto.vistas);
  const rand = mulberry32(semente);
  const candidatos = ordenarTermos(
    TERMOS_JOGO.filter(
      (t) =>
        t.fonte.titulo === fonte.titulo &&
        (!fonte.trilha || t.trilha === fonte.trilha) &&
        t.definicao.length <= 140 &&
        !usados.has(t.id)
    ),
    vistas,
    rand
  ).slice(0, 4);

  if (candidatos.length < 4) return null;
  for (const t of candidatos) usados.add(t.id);

  return {
    tipo: "associar",
    id: `assoc-${slug(fonte.titulo)}`,
    trilha: candidatos[0].trilha,
    fonte: candidatos[0].fonte,
    confianca: candidatos.every((t) => t.confianca === "alta")
      ? "alta"
      : "media",
    pares: candidatos.map((t) => ({
      id: t.id,
      termo: t.termo,
      definicao: t.definicao,
    })),
  };
};

const montarLacuna = (termo: Termo): LacunaTarefa => {
  const termoRegex = escaparRegExp(termo.termo);
  // Só troca a palavra inteira: sem isso, "Id" viraria "____eias" dentro de
  // "ideias" e "Ego" cortaria "superego".
  const palavraInteira = new RegExp(
    `(^|[^\\p{L}])(${termoRegex})(?=$|[^\\p{L}])`,
    "giu"
  );
  const temTermoNaDefinicao = new RegExp(
    `(^|[^\\p{L}])${termoRegex}(?=$|[^\\p{L}])`,
    "iu"
  ).test(termo.definicao);
  const enunciado = temTermoNaDefinicao
    ? termo.definicao.replace(palavraInteira, "$1______")
    : `Complete o conceito: ${termo.definicao}`;

  return {
    tipo: "lacuna",
    id: `lacuna-${termo.id}`,
    trilha: termo.trilha,
    fonte: termo.fonte,
    confianca: termo.confianca as "alta" | "media",
    enunciado,
    resposta: termo.termo,
    explicacao: `${termo.termo}: ${termo.definicao}`,
  };
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
  {
    tipo: "mito",
    id: "mito-psi-1",
    trilha: "psicanalise",
    fonte: APA_DICIONARIO,
    confianca: "alta",
    afirmacao: "Para a psicanálise, sonhos, atos falhos e sintomas podem expressar conteúdos inconscientes.",
    verdade: true,
    explicacao: "Essas formações são tratadas como manifestações disfarçadas de desejos e conflitos inconscientes.",
  },
  {
    tipo: "mito",
    id: "mito-psi-2",
    trilha: "psicanalise",
    fonte: APA_DICIONARIO,
    confianca: "alta",
    afirmacao: "Transferência é apenas uma técnica de persuasão usada pelo terapeuta.",
    verdade: false,
    explicacao: "Transferência é o deslocamento de padrões afetivos antigos para o terapeuta, não uma técnica de persuasão.",
  },
  {
    tipo: "mito",
    id: "mito-psi-3",
    trilha: "psicanalise",
    fonte: APA_DICIONARIO,
    confianca: "alta",
    afirmacao: "Mecanismos de defesa são estratégias automáticas do ego para reduzir angústia.",
    verdade: true,
    explicacao: "Eles protegem o eu de conteúdos que ameaçam produzir angústia, em geral fora da consciência.",
  },
  {
    tipo: "mito",
    id: "mito-psi-4",
    trilha: "psicanalise",
    fonte: APA_DICIONARIO,
    confianca: "alta",
    afirmacao: "Todo conteúdo inconsciente é lembrado de forma direta, sem resistência.",
    verdade: false,
    explicacao: "A resistência se opõe justamente ao acesso consciente desse material.",
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
  {
    tipo: "ordenar",
    id: "ordem-sonho",
    trilha: "psicanalise",
    fonte: APA_DICIONARIO,
    confianca: "alta",
    enunciado: "Ordene o percurso de formação do sonho:",
    etapas: ["Conteúdo latente", "Trabalho do sonho", "Conteúdo manifesto"],
    explicacao: "O trabalho do sonho transforma o conteúdo latente (desejos e conflitos) no conteúdo manifesto, a cena lembrada.",
  },
];

/** Distribui as escolhas entre trilhas antes de repetir uma mesma trilha. */
const escolherPorTrilha = <T extends { id: string; trilha: TrilhaId }>(
  itens: T[],
  quantidade: number,
  vistas: Map<string, number>
): T[] => {
  const porAntiguidade = (a: T, b: T) =>
    pesoDeRecencia(a.id, vistas) - pesoDeRecencia(b.id, vistas) ||
    a.id.localeCompare(b.id);

  // Alterna as trilhas dentro de um grupo, sem repetir a mesma trilha antes
  // de passar por todas as que ainda têm itens.
  const rodada = (lista: T[], limite: number): T[] => {
    const filas = new Map<TrilhaId, T[]>();
    for (const item of [...lista].sort(porAntiguidade)) {
      const fila = filas.get(item.trilha) ?? [];
      fila.push(item);
      filas.set(item.trilha, fila);
    }

    const saida: T[] = [];
    while (saida.length < limite) {
      let avancou = false;
      for (const fila of filas.values()) {
        const item = fila.shift();
        if (!item) continue;
        saida.push(item);
        avancou = true;
        if (saida.length >= limite) break;
      }
      if (!avancou) break;
    }
    return saida;
  };

  // Primeiro esgota o que nunca foi visto, em qualquer trilha. Só depois
  // volta aos mais antigos.
  const naoVistas = itens.filter(
    (item) => pesoDeRecencia(item.id, vistas) < 0
  );
  const escolhidos = rodada(naoVistas, quantidade);
  if (escolhidos.length < quantidade) {
    const antigos = itens.filter((item) => !escolhidos.includes(item));
    escolhidos.push(...rodada(antigos, quantidade - escolhidos.length));
  }
  return escolhidos;
};

/**
 * Sessão curta com as quatro dinâmicas, conteúdo das cinco trilhas e
 * progressão do reconhecimento à reconstrução de processos.
 */
export function montarSessao(
  semente = Date.now(),
  contexto: ContextoJogo = {}
): TarefaRevisao[] {
  const rand = mulberry32(semente);
  const vistas = indiceDeVistas(contexto.vistas);
  const usados = new Set<string>();

  // Prefere uma fonte que ainda tenha 4 termos nunca vistos; se todas
  // estiverem esgotadas, usa a que voltou há mais tempo.
  const fontesNovas = embaralhar(FONTES_MISTAS, rand).filter(
    (fonte) =>
      TERMOS_JOGO.filter(
        (t) =>
          t.fonte.titulo === fonte.titulo &&
          t.definicao.length <= 140 &&
          !usados.has(t.id) &&
          pesoDoTermo(t, vistas) < 0
      ).length >= 4
  );
  const fonteMista = fontesNovas[0] ?? embaralhar(FONTES_MISTAS, rand)[0];

  const associacoes = [
    montarAssociacao(
      { titulo: "Glossário TRI" },
      hashSemente("revisao", semente, "assoc-tri"),
      contexto,
      usados
    ),
    montarAssociacao(
      fonteMista,
      hashSemente("revisao", semente, "assoc-mista"),
      contexto,
      usados
    ),
  ].filter((t): t is AssociacaoTarefa => Boolean(t));

  // Uma lacuna de TRI e uma de outra trilha: mistura dentro da dinâmica.
  const tri = ordenarTermos(
    TERMOS_JOGO.filter(
      (t) =>
        t.fonte.instituicao === "Material próprio TRI" && !usados.has(t.id)
    ),
    vistas,
    rand
  )[0];

  const lacunas: LacunaTarefa[] = [];
  if (tri) {
    usados.add(tri.id);
    lacunas.push(montarLacuna(tri));
  }

  const outra = ordenarTermos(
    TERMOS_JOGO.filter(
      (t) =>
        t.fonte.instituicao !== "Material próprio TRI" &&
        t.id !== tri?.id &&
        t.trilha !== tri?.trilha &&
        !usados.has(t.id)
    ),
    vistas,
    rand
  )[0] ?? ordenarTermos(
    TERMOS_JOGO.filter(
      (t) =>
        t.fonte.instituicao !== "Material próprio TRI" && !usados.has(t.id)
    ),
    vistas,
    rand
  )[0];

  if (outra) {
    usados.add(outra.id);
    lacunas.push(montarLacuna(outra));
  }

  const mitos = escolherPorTrilha(MITOS, 3, vistas);
  const ordenar = escolherPorTrilha(ORDENS, 1, vistas);

  return [...associacoes, ...lacunas, ...mitos, ...ordenar].sort(
    (a, b) =>
      PESO_DINAMICA[a.tipo] - PESO_DINAMICA[b.tipo] ||
      a.id.localeCompare(b.id)
  );
}

/**
 * IDs para o histórico de não repetição. A associação conta cada termo como
 * visto, e não só a tarefa inteira.
 */
export function idsDaTarefa(tarefa: TarefaRevisao): string[] {
  return tarefa.tipo === "associar"
    ? tarefa.pares.map((par) => `assoc-${par.id}`)
    : [tarefa.id];
}

/** Normaliza respostas digitadas para comparar ignorando acento, caixa e pontuação. */
export const respostaNormalizada = (valor: string) => normalizar(valor);

/** Distância de edição (inserir, apagar ou trocar uma letra). */
function distancia(a: string, b: string): number {
  const anterior = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let diagonal = anterior[0];
    anterior[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const guardado = anterior[j];
      anterior[j] = Math.min(
        anterior[j] + 1,
        anterior[j - 1] + 1,
        diagonal + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      diagonal = guardado;
    }
  }
  return anterior[b.length];
}

/**
 * Aceita a resposta exata ou com um erro de digitação, mas só em palavras
 * de 6 letras ou mais: em termos curtos (Ego, Id) uma letra a mais ou a
 * menos já muda o conceito.
 */
export function respostaAceita(digitada: string, correta: string): boolean {
  const a = respostaNormalizada(digitada);
  const b = respostaNormalizada(correta);
  if (!a) return false;
  if (a === b) return true;
  return b.length >= 6 && distancia(a, b) <= 1;
}

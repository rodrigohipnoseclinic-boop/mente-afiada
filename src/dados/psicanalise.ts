import type { Fonte, Pergunta, Termo } from "./tipos";

function gerarChave(termo: string): string {
  return termo
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-Z]/g, "");
}

/** Cada verbete tem endereço próprio no dicionário da APA. */
const APA = (verbete: string): Fonte => ({
  titulo: "APA Dictionary of Psychology",
  instituicao: "American Psychological Association",
  url: `https://dictionary.apa.org/${verbete}`,
  ano: 2026,
});

type Linha = [string, string, string, string, "alta" | "media"];

/**
 * Termos centrais da tradição psicanalítica.
 * As definições ficam curtas de propósito: entram na associação, na lacuna e
 * na pergunta de definição, além do caça-palavras quando cabem na grade.
 */
const LINHAS: Linha[] = [
  [
    "psi-inconsciente",
    "Inconsciente",
    "Parte da vida mental fora da consciência que influencia pensamentos, sentimentos e ações.",
    "unconscious",
    "alta",
  ],
  [
    "psi-id",
    "Id",
    "Instância psíquica das pulsões, que busca satisfação imediata sem considerar a realidade.",
    "id",
    "alta",
  ],
  [
    "psi-ego",
    "Ego",
    "Instância que media as demandas do id, do superego e da realidade para organizar a ação.",
    "ego",
    "alta",
  ],
  [
    "psi-superego",
    "Superego",
    "Instância das normas e ideais internalizados, que avalia o eu e pode gerar culpa.",
    "superego",
    "alta",
  ],
  [
    "psi-libido",
    "Libido",
    "Energia psíquica associada às pulsões sexuais e à busca de prazer.",
    "libido",
    "alta",
  ],
  [
    "psi-pulsao",
    "Pulsão",
    "Força que impulsiona o organismo em direção a uma satisfação, na fronteira entre corpo e psiquismo.",
    "drive",
    "alta",
  ],
  [
    "psi-recalque",
    "Recalque",
    "Mecanismo que mantém fora da consciência ideias e impulsos intoleráveis, geradores de angústia.",
    "repression",
    "alta",
  ],
  [
    "psi-resistencia",
    "Resistência",
    "Oposição, muitas vezes inconsciente, a acessar conteúdos e conflitos reprimidos na análise.",
    "resistance",
    "alta",
  ],
  [
    "psi-transferencia",
    "Transferência",
    "Deslocamento de sentimentos e padrões de relações antigas para o terapeuta ou outra pessoa.",
    "transference",
    "alta",
  ],
  [
    "psi-contratransferencia",
    "Contratransferência",
    "Reações emocionais do terapeuta despertadas pelo paciente e pela relação analítica.",
    "countertransference",
    "alta",
  ],
  [
    "psi-livre-associacao",
    "Livre associação",
    "Técnica de falar sem censura o que vier à mente, para acessar conteúdos inconscientes.",
    "free-association",
    "alta",
  ],
  [
    "psi-ato-falho",
    "Ato falho",
    "Lapso de fala, memória ou ação que revela um desejo ou conflito inconsciente.",
    "parapraxis",
    "alta",
  ],
  [
    "psi-sonho",
    "Sonho",
    "Produção mental do sono que expressa, de forma disfarçada, desejos e conflitos.",
    "dream",
    "alta",
  ],
  [
    "psi-trabalho-sonho",
    "Trabalho do sonho",
    "Operações que transformam o conteúdo latente em conteúdo manifesto do sonho.",
    "dream-work",
    "alta",
  ],
  [
    "psi-condensacao",
    "Condensação",
    "Mecanismo do sonho que funde várias ideias ou imagens em uma única representação.",
    "condensation",
    "alta",
  ],
  [
    "psi-deslocamento",
    "Deslocamento",
    "Mecanismo em que a carga emocional passa de uma ideia para outra, geralmente substituta.",
    "displacement",
    "alta",
  ],
  [
    "psi-projecao",
    "Projeção",
    "Mecanismo de defesa que atribui a outra pessoa impulsos ou sentimentos próprios inaceitáveis.",
    "projection",
    "alta",
  ],
  [
    "psi-negacao",
    "Negação",
    "Mecanismo de defesa que recusa reconhecer um fato ou sentimento doloroso.",
    "denial",
    "alta",
  ],
  [
    "psi-sublimacao",
    "Sublimação",
    "Mecanismo de defesa que canaliza pulsões para atividades socialmente valorizadas.",
    "sublimation",
    "alta",
  ],
  [
    "psi-fixacao",
    "Fixação",
    "Permanência de vínculos e modos de satisfação de uma fase anterior do desenvolvimento.",
    "fixation",
    "alta",
  ],
  [
    "psi-catexia",
    "Catexia",
    "Investimento de energia psíquica em uma pessoa, objeto, ideia ou parte do corpo.",
    "cathexis",
    "alta",
  ],
  [
    "psi-complexo-edipo",
    "Complexo de Édipo",
    "Conjunto de desejos e conflitos infantis em relação aos pais, central na teoria freudiana.",
    "oedipus-complex",
    "alta",
  ],
  [
    "psi-compulsao-repeticao",
    "Compulsão à repetição",
    "Tendência a repetir experiências dolorosas em vez de recordá-las e elaborá-las.",
    "repetition-compulsion",
    "alta",
  ],
  [
    "psi-elaboracao",
    "Elaboração",
    "Trabalho repetido de integrar uma interpretação e superar resistências na análise.",
    "working-through",
    "alta",
  ],
  [
    "psi-insight",
    "Insight",
    "Compreensão consciente e repentina de uma conexão antes inconsciente.",
    "insight",
    "alta",
  ],
  [
    "psi-catarse",
    "Catarse",
    "Liberação de tensão emocional ligada à lembrança de um conflito ou experiência.",
    "catharsis",
    "alta",
  ],
  [
    "psi-mecanismo-defesa",
    "Mecanismo de defesa",
    "Estratégia automática do ego para reduzir angústia e proteger o psiquismo.",
    "defense-mechanism",
    "alta",
  ],
  [
    "psi-narcisismo",
    "Narcisismo",
    "Investimento da energia psíquica no próprio eu, em vez de em objetos externos.",
    "narcissism",
    "alta",
  ],
  [
    "psi-ansiedade",
    "Ansiedade",
    "Sinal de perigo interno que mobiliza defesas contra conflitos inconscientes.",
    "anxiety",
    "alta",
  ],
  [
    "psi-racionalizacao",
    "Racionalização",
    "Criação de justificativas aparentemente lógicas para encobrir motivos inaceitáveis.",
    "rationalization",
    "alta",
  ],
  [
    "psi-identificacao",
    "Identificação",
    "Processo de incorporar traços, valores ou condutas de outra pessoa ao próprio eu.",
    "identification",
    "alta",
  ],
  [
    "psi-ambivalencia",
    "Ambivalência",
    "Coexistência de sentimentos opostos, como amor e ódio, em relação à mesma pessoa.",
    "ambivalence",
    "alta",
  ],
];

export const TERMOS_PSICANALISE: Termo[] = LINHAS.map(
  ([id, termo, definicao, verbete, confianca]) => ({
    id,
    termo,
    definicao,
    trilha: "psicanalise",
    chave: gerarChave(termo),
    fonte: APA(verbete),
    confianca,
  })
);

export const PERGUNTAS_PSICANALISE: Pergunta[] = [
  {
    id: "q-psi-1",
    trilha: "psicanalise",
    enunciado:
      "Na teoria freudiana, qual instância busca satisfação imediata das pulsões, sem considerar a realidade?",
    opcoes: ["Superego", "Ego", "Id", "Ideal do eu"],
    correta: 2,
    explicacao:
      "O id funciona pelo princípio do prazer: busca descarregar a tensão e obter satisfação sem esperar pelas condições da realidade.",
    fonte: APA("id"),
    confianca: "alta",
  },
  {
    id: "q-psi-2",
    trilha: "psicanalise",
    enunciado:
      "Qual mecanismo mantém fora da consciência ideias e impulsos que gerariam angústia?",
    opcoes: ["Projeção", "Recalque", "Sublimação", "Racionalização"],
    correta: 1,
    explicacao:
      "O recalque (repressão) afasta da consciência o conteúdo intolerável. Não é o mesmo que negação: o conteúdo continua ativo, mas inacessível.",
    fonte: APA("repression"),
    confianca: "alta",
  },
  {
    id: "q-psi-3",
    trilha: "psicanalise",
    enunciado: "O que é transferência na clínica psicanalítica?",
    opcoes: [
      "Mudar a sessão para outro horário",
      "Deslocar para o terapeuta sentimentos ligados a relações antigas",
      "Copiar técnicas de outro terapeuta",
      "Trocar a teoria pela prática",
    ],
    correta: 1,
    explicacao:
      "Na transferência, padrões afetivos de figuras importantes do passado são revividos na relação com o terapeuta e com outras pessoas.",
    fonte: APA("transference"),
    confianca: "alta",
  },
  {
    id: "q-psi-4",
    trilha: "psicanalise",
    enunciado:
      "Qual técnica pede que o paciente diga o que vier à mente, sem censura?",
    opcoes: ["Livre associação", "Hipnose regressiva", "Teste projetivo", "Terapia cognitiva"],
    correta: 0,
    explicacao:
      "A livre associação busca deixar emergir o material inconsciente sem o filtro da seleção consciente.",
    fonte: APA("free-association"),
    confianca: "alta",
  },
  {
    id: "q-psi-5",
    trilha: "psicanalise",
    enunciado: "Um ato falho, na leitura psicanalítica, é...",
    opcoes: [
      "Um erro sem significado",
      "Uma falha motora de origem neurológica",
      "Uma manifestação de desejo ou conflito inconsciente",
      "Uma mentira deliberada",
    ],
    correta: 2,
    explicacao:
      "O ato falho (parapraxia) é um lapso de fala, memória ou ação que deixa escapar um conteúdo inconsciente.",
    fonte: APA("parapraxis"),
    confianca: "alta",
  },
  {
    id: "q-psi-6",
    trilha: "psicanalise",
    enunciado: "No trabalho do sonho, o que é condensação?",
    opcoes: [
      "Adiar o sonho para o fim da noite",
      "Fundir várias ideias ou imagens em uma só representação",
      "Transformar o sonho em pesadelo",
      "Repetir o mesmo sonho todas as noites",
    ],
    correta: 1,
    explicacao:
      "A condensação combina diferentes ideias, pessoas ou imagens em um único elemento do sonho manifesto.",
    fonte: APA("condensation"),
    confianca: "alta",
  },
  {
    id: "q-psi-7",
    trilha: "psicanalise",
    enunciado:
      "Qual mecanismo atribui a outra pessoa impulsos ou sentimentos próprios inaceitáveis?",
    opcoes: ["Negação", "Projeção", "Fixação", "Catarse"],
    correta: 1,
    explicacao:
      "Na projeção, o conteúdo próprio rejeitado é percebido como se pertencesse ao outro.",
    fonte: APA("projection"),
    confianca: "alta",
  },
  {
    id: "q-psi-8",
    trilha: "psicanalise",
    enunciado: "O que diferencia a contratransferência da transferência?",
    opcoes: [
      "É a resposta emocional do terapeuta ao paciente",
      "É a transferência do paciente para o supervisor",
      "É o mesmo fenômeno com outro nome",
      "É a recusa do paciente em associar",
    ],
    correta: 0,
    explicacao:
      "A contratransferência reúne as reações inconscientes do terapeuta ao paciente; a transferência parte do paciente.",
    fonte: APA("countertransference"),
    confianca: "alta",
  },
  {
    id: "q-psi-9",
    trilha: "psicanalise",
    enunciado: "Na metapsicologia freudiana, catexia designa...",
    opcoes: [
      "A retirada total de investimento afetivo",
      "O investimento de energia psíquica em um objeto ou ideia",
      "A soma das pulsões de morte",
      "A censura exercida pelo superego",
    ],
    correta: 1,
    explicacao:
      "Catexia é o investimento de energia psíquica em uma pessoa, objeto, ideia ou parte do corpo.",
    fonte: APA("cathexis"),
    confianca: "alta",
  },
  {
    id: "q-psi-10",
    trilha: "psicanalise",
    enunciado:
      "Qual conceito descreve a tendência a repetir experiências dolorosas em vez de recordá-las?",
    opcoes: ["Compulsão à repetição", "Elaboração", "Insight", "Sublimação"],
    correta: 0,
    explicacao:
      "Na compulsão à repetição, a pessoa reencena o conflito em vez de elaborá-lo pela lembrança e pela fala.",
    fonte: APA("repetition-compulsion"),
    confianca: "alta",
  },
  {
    id: "q-psi-11",
    trilha: "psicanalise",
    enunciado: "No modelo estrutural, qual é a função principal do superego?",
    opcoes: [
      "Garantir a satisfação imediata",
      "Regular a motricidade voluntária",
      "Internalizar normas e ideais, avaliando o eu",
      "Armazenar memórias declarativas",
    ],
    correta: 2,
    explicacao:
      "O superego interioriza proibições e ideais culturais e compara o eu com esse modelo, podendo produzir culpa.",
    fonte: APA("superego"),
    confianca: "alta",
  },
  {
    id: "q-psi-12",
    trilha: "psicanalise",
    enunciado: "O conceito de elaboração (working-through) descreve...",
    opcoes: [
      "A interpretação única que cura de imediato",
      "O trabalho repetido de integrar uma interpretação e superar resistências",
      "A transcrição do sonho para o papel",
      "A passagem do id ao superego na infância",
    ],
    correta: 1,
    explicacao:
      "Elaborar é retomar e integrar uma interpretação ao longo do tempo, vencendo as resistências que se reorganizam.",
    fonte: APA("working-through"),
    confianca: "alta",
  },
  {
    id: "q-psi-13",
    trilha: "psicanalise",
    enunciado: "Sublimação é...",
    opcoes: [
      "Transformar impulsos em atividades socialmente valorizadas",
      "Negar um fato evidente",
      "Atribuir ao outro o próprio desejo",
      "Voltar a uma fase anterior do desenvolvimento",
    ],
    correta: 0,
    explicacao:
      "A sublimação redireciona a energia pulsional para metas aceitas socialmente, como trabalho e criação.",
    fonte: APA("sublimation"),
    confianca: "alta",
  },
  {
    id: "q-psi-14",
    trilha: "psicanalise",
    enunciado: "Fixação, em psicanálise, refere-se a...",
    opcoes: [
      "Uma certeza consciente e racional",
      "A permanência em um modo de satisfação de uma fase anterior",
      "Um sintoma neurológico de perda motora",
      "A recusa de ir à terapia",
    ],
    correta: 1,
    explicacao:
      "A fixação mantém um vínculo persistente com modos de satisfação e objetos de uma fase anterior do desenvolvimento.",
    fonte: APA("fixation"),
    confianca: "alta",
  },
  {
    id: "q-psi-15",
    trilha: "psicanalise",
    enunciado: "O que são mecanismos de defesa, no modelo psicanalítico?",
    opcoes: [
      "Estratégias automáticas do ego para reduzir angústia",
      "Técnicas conscientes de memorização",
      "Etapas do desenvolvimento motor",
      "Formas de condicionamento operante",
    ],
    correta: 0,
    explicacao:
      "As defesas protegem o eu de conteúdos e conflitos que ameaçam produzir angústia, geralmente fora da consciência.",
    fonte: APA("defense-mechanism"),
    confianca: "alta",
  },
  {
    id: "q-psi-16",
    trilha: "psicanalise",
    enunciado: "Para a psicanálise, o sonho é...",
    opcoes: [
      "Uma produção mental que expressa desejos e conflitos de forma disfarçada",
      "Um ruído aleatório sem relação com a vida psíquica",
      "Uma memória exata do dia anterior",
      "Um sintoma neurológico degenerativo",
    ],
    correta: 0,
    explicacao:
      "O sonho realiza, de modo disfarçado, desejos e conflitos; o trabalho do sonho transforma o conteúdo latente em manifesto.",
    fonte: APA("dream"),
    confianca: "alta",
  },
];

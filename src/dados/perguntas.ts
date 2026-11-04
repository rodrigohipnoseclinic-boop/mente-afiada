import type { Pergunta } from "./tipos";

const APA = {
  titulo: "Definition and Description of Hypnosis",
  instituicao: "APA Division 30",
  url: "https://www.apadivisions.org/division-30/about",
  ano: 2014,
};
const NINDS = {
  titulo: "Brain Basics",
  instituicao: "NINDS / NIH",
  url: "https://www.ninds.nih.gov/health-information/public-education/brain-basics",
  ano: 2026,
};
const NOBA_APRENDIZAGEM = {
  titulo: "Conditioning and Learning",
  instituicao: "Noba Project (M. Bouton)",
  url: "https://nobaproject.com/modules/conditioning-and-learning",
  ano: 2026,
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
const GLOSSARIO = {
  titulo: "Glossário TRI",
  instituicao: "Material próprio TRI",
  url: "conteudo/extraido/glossario-tri.txt",
  ano: 2025,
};
const BRJP = {
  titulo: "Eficácia da hipnose no manejo da dor não procedimental",
  instituicao: "Brazilian Journal of Pain (BrJP)",
  url: "https://doi.org/10.5935/2595-0118.20210045",
  ano: 2021,
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

export const PERGUNTAS: Pergunta[] = [
  // ───────────────────────── Neurociências ─────────────────────────
  {
    id: "q-neu-1",
    trilha: "neurociencias",
    enunciado: "Qual estrutura está mais diretamente associada à formação de novas memórias declarativas?",
    opcoes: ["Cerebelo", "Hipocampo", "Tálamo", "Bulbo"],
    correta: 1,
    explicacao:
      "O hipocampo, no lobo temporal, é peça-chave na consolidação de memórias declarativas — aquelas que podemos verbalizar.",
    fonte: NOBA_MEMORIA,
    confianca: "alta",
  },
  {
    id: "q-neu-2",
    trilha: "neurociencias",
    enunciado: "Por que a bainha de mielina acelera a condução do impulso nervoso?",
    opcoes: [
      "Porque aumenta o diâmetro do corpo celular",
      "Porque produz neurotransmissores extras",
      "Porque isola o axônio e permite a condução saltatória",
      "Porque impede a entrada de sódio na célula",
    ],
    correta: 2,
    explicacao:
      "A mielina isola o axônio; o impulso salta de um nodo ao outro, o que torna a condução muito mais rápida.",
    fonte: A_AND_P,
    confianca: "alta",
  },
  {
    id: "q-neu-3",
    trilha: "neurociencias",
    enunciado: "Qual é a função principal dos dendritos?",
    opcoes: [
      "Conduzir o impulso para longe do corpo celular",
      "Produzir mielina",
      "Receber os sinais que chegam ao neurônio",
      "Liberar neurotransmissores no músculo",
    ],
    correta: 2,
    explicacao:
      "Os dendritos são os prolongamentos ramificados que captam a informação que chega à célula.",
    fonte: NINDS,
    confianca: "alta",
  },
  {
    id: "q-neu-4",
    trilha: "neurociencias",
    enunciado: "O sistema nervoso central é formado por:",
    opcoes: [
      "Encéfalo e medula espinal",
      "Nervos e gânglios",
      "Somático e autônomo",
      "Simpático e parassimpático",
    ],
    correta: 0,
    explicacao:
      "A divisão anatômica coloca encéfalo e medula espinal no sistema nervoso central; o resto é periférico.",
    fonte: NINDS,
    confianca: "alta",
  },
  {
    id: "q-neu-5",
    trilha: "neurociencias",
    enunciado: "A amígdala tem papel central no processamento de qual aspecto?",
    opcoes: [
      "Equilíbrio e postura",
      "Emoções, sobretudo o medo",
      "Visão de cores",
      "Produção de insulina",
    ],
    correta: 1,
    explicacao:
      "A amígdala integra respostas emocionais e está especialmente ligada ao medo e à detecção de ameaça.",
    fonte: NINDS,
    confianca: "alta",
  },
  {
    id: "q-neu-6",
    trilha: "neurociencias",
    enunciado: "Neuroplasticidade é a capacidade do sistema nervoso de:",
    opcoes: [
      "Produzir novos neurônios apenas na infância",
      "Reorganizar conexões e mudar com a experiência",
      "Manter-se idêntico ao longo da vida",
      "Transmitir impulsos sem gastar energia",
    ],
    correta: 1,
    explicacao:
      "Plasticidade é mudança estrutural e funcional guiada pela experiência — não é um reservatório fixo.",
    fonte: NINDS,
    confianca: "alta",
  },
  {
    id: "q-neu-7",
    trilha: "neurociencias",
    enunciado: "As células gliais são melhor descritas como:",
    opcoes: [
      "As principais condutoras do potencial de ação",
      "Células de suporte que nutrem e isolam os neurônios",
      "Células musculares modificadas",
      "Receptores sensoriais da pele",
    ],
    correta: 1,
    explicacao:
      "A glia dá suporte: nutre, isola e protege. Quem conduz o impulso principal é o neurônio.",
    fonte: NINDS,
    confianca: "alta",
  },
  {
    id: "q-neu-8",
    trilha: "neurociencias",
    enunciado: "O cerebelo está mais diretamente relacionado a:",
    opcoes: [
      "Linguagem abstrata",
      "Coordenação motora, equilíbrio e postura",
      "Regulação da fome",
      "Memória episódica",
    ],
    correta: 1,
    explicacao:
      "O cerebelo ajusta a precisão do movimento e sustenta equilíbrio e postura.",
    fonte: NINDS,
    confianca: "alta",
  },

  // ───────────────────────── Neurofisiologia ─────────────────────────
  {
    id: "q-fis-1",
    trilha: "neurofisiologia",
    enunciado: "O que a bomba de sódio-potássio faz?",
    opcoes: [
      "Transporta sódio para fora e potássio para dentro, gastando ATP",
      "Transporta sódio para dentro e potássio para fora, sem gastar energia",
      "Produz neurotransmissores no terminal axônico",
      "Forma a bainha de mielina",
    ],
    correta: 0,
    explicacao:
      "É um transporte ativo: gasta ATP para manter o gradiente que sustenta o potencial de repouso.",
    fonte: A_AND_P,
    confianca: "alta",
  },
  {
    id: "q-fis-2",
    trilha: "neurofisiologia",
    enunciado: "Um potencial de ação é desencadeado quando:",
    opcoes: [
      "A célula perde toda a sua mielina",
      "A despolarização atinge o limiar de excitabilidade",
      "O potássio sai da célula em repouso",
      "Ocorre liberação de GABA",
    ],
    correta: 1,
    explicacao:
      "Ao cruzar o limiar, abrem-se canais de sódio dependentes de voltagem e o impulso se propaga.",
    fonte: A_AND_P,
    confianca: "alta",
  },
  {
    id: "q-fis-3",
    trilha: "neurofisiologia",
    enunciado: "O período refratário absoluto significa que o neurônio:",
    opcoes: [
      "Dispara dois potenciais ao mesmo tempo",
      "Não consegue disparar outro potencial de ação naquele instante",
      "Perde a bainha de mielina",
      "Fica permanentemente inativo",
    ],
    correta: 1,
    explicacao:
      "Durante o período absoluto não há novo disparo; no relativo, é preciso um estímulo maior.",
    fonte: A_AND_P,
    confianca: "alta",
  },
  {
    id: "q-fis-4",
    trilha: "neurofisiologia",
    enunciado: "O sistema simpático prepara o corpo para:",
    opcoes: [
      "Repouso e digestão",
      "Luta ou fuga",
      "Sono profundo",
      "Crescimento ósseo",
    ],
    correta: 1,
    explicacao:
      "O simpático mobiliza energia: acelera o coração, dilata pupilas e desvia sangue para os músculos.",
    fonte: NINDS,
    confianca: "alta",
  },
  {
    id: "q-fis-5",
    trilha: "neurofisiologia",
    enunciado: "A repolarização consiste em:",
    opcoes: [
      "Tornar o interior da célula mais positivo",
      "Retornar ao potencial de repouso após a despolarização",
      "Liberar neurotransmissores",
      "Aumentar a espessura da mielina",
    ],
    correta: 1,
    explicacao:
      "Após o pico do potencial de ação, a célula restaura suas cargas e volta ao repouso.",
    fonte: A_AND_P,
    confianca: "alta",
  },
  {
    id: "q-fis-6",
    trilha: "neurofisiologia",
    enunciado: "Na condução saltatória, o impulso:",
    opcoes: [
      "Percorre o axônio em linha reta, sem interrupção",
      "Salta entre os nodos do axônio mielinizado",
      "Volta ao corpo celular antes de seguir",
      "Depende apenas de sinais químicos",
    ],
    correta: 1,
    explicacao:
      "O impulso 'pula' de nodo em nodo, o que aumenta bastante a velocidade de condução.",
    fonte: A_AND_P,
    confianca: "alta",
  },
  {
    id: "q-fis-7",
    trilha: "neurofisiologia",
    enunciado: "O sistema parassimpático está mais associado a:",
    opcoes: [
      "Aceleração do coração e alerta máximo",
      "Repouso, digestão e recuperação",
      "Contração muscular explosiva",
      "Dilatação da pupila",
    ],
    correta: 1,
    explicacao:
      "É o ramo do repouso: favorece digestão, reduz frequência cardíaca e recupera energia.",
    fonte: NINDS,
    confianca: "alta",
  },
  {
    id: "q-fis-8",
    trilha: "neurofisiologia",
    enunciado: "A entrada de cálcio no terminal do axônio serve para:",
    opcoes: [
      "Formar mielina",
      "Desencadear a liberação de neurotransmissores",
      "Manter o potencial de repouso",
      "Inibir o impulso nervoso",
    ],
    correta: 1,
    explicacao:
      "A chegada do impulso abre canais de cálcio; o cálcio faz as vesículas liberarem neurotransmissores.",
    fonte: A_AND_P,
    confianca: "media",
  },

  // ───────────────────────── Hipnose clínica ─────────────────────────
  {
    id: "q-hip-1",
    trilha: "hipnose",
    enunciado: "Segundo a definição oficial da APA Division 30 (2014), hipnose é:",
    opcoes: [
      "Um sono profundo induzido por sugestão",
      "Um estado de consciência com atenção focada e redução da consciência periférica, com maior resposta à sugestão",
      "Uma técnica de reprogramação mental que controla a vontade",
      "Um estado em que a pessoa perde a consciência do que acontece",
    ],
    correta: 1,
    explicacao:
      "A definição foi elaborada para ser concisa e ateórica: atenção focada, menor consciência periférica e maior resposta à sugestão.",
    fonte: APA,
    confianca: "alta",
  },
  {
    id: "q-hip-2",
    trilha: "hipnose",
    enunciado: "Indução hipnótica é definida como:",
    opcoes: [
      "A capacidade de ser hipnotizado",
      "Um procedimento concebido para induzir a hipnose",
      "O tratamento de um transtorno psicológico",
      "Uma sugestão dada após o transe",
    ],
    correta: 1,
    explicacao:
      "É o procedimento, não o estado nem a capacidade: esta é a distinção entre indução, hipnotizabilidade e hipnoterapia.",
    fonte: APA,
    confianca: "alta",
  },
  {
    id: "q-hip-3",
    trilha: "hipnose",
    enunciado: "Qual destas afirmações sobre hipnose é FALSA?",
    opcoes: [
      "A pessoa pode sair do transe quando quiser",
      "A hipnose é uma habilidade que pode ser aprendida",
      "A pessoa fica presa no transe e não consegue sair",
      "Pessoas hipnotizáveis não são necessariamente crédulas",
    ],
    correta: 2,
    explicacao:
      "Ninguém fica preso no transe. Essa é uma das crenças que a APA Division 30 desmonta no material de orientação ao público.",
    fonte: APA,
    confianca: "alta",
  },
  {
    id: "q-hip-4",
    trilha: "hipnose",
    enunciado: "Sugestão pós-hipnótica é:",
    opcoes: [
      "Uma sugestão dada antes da indução",
      "Uma sugestão dada durante a hipnose para produzir efeito depois",
      "O nome técnico da hipnotizabilidade",
      "Uma técnica de auto-hipnose",
    ],
    correta: 1,
    explicacao:
      "O efeito é programado durante o transe, mas acontece depois, já fora dele.",
    fonte: APA,
    confianca: "alta",
  },
  {
    id: "q-hip-5",
    trilha: "hipnose",
    enunciado: "O que a evidência atual indica sobre hipnose e dor crônica?",
    opcoes: [
      "Que cura definitivamente a dor crônica",
      "Que o efeito é pequeno a moderado e os estudos divergem entre si",
      "Que não há nenhum estudo sobre o tema",
      "Que funciona apenas em quem acredita cegamente",
    ],
    correta: 1,
    explicacao:
      "Revisões sistemáticas apontam alívio, mas as conclusões variam: algumas encontram efeito pequeno, outras nenhum efeito sobre dor crônica. É um tema em aberto.",
    fonte: BRJP,
    confianca: "alta",
  },
  {
    id: "q-hip-6",
    trilha: "hipnose",
    enunciado: "Auto-hipnose é:",
    opcoes: [
      "Hipnose aplicada por dois terapeutas",
      "Uso da hipnose sem terapeuta, por autoindução",
      "Hipnose feita durante o sono",
      "Uma forma de anestesia geral",
    ],
    correta: 1,
    explicacao:
      "É a pessoa conduzindo o próprio processo, com autoindução e autossugestão.",
    fonte: APA,
    confianca: "alta",
  },
  {
    id: "q-hip-7",
    trilha: "hipnose",
    enunciado: "No contexto clínico, rapport é:",
    opcoes: [
      "O relatório final da sessão",
      "A relação de confiança e sintonia entre terapeuta e cliente",
      "O nível de sonolência do paciente",
      "Uma escala de dor",
    ],
    correta: 1,
    explicacao:
      "Rapport é o vínculo que sustenta o processo terapêutico e a própria resposta à sugestão.",
    fonte: BRJP,
    confianca: "media",
  },
  {
    id: "q-hip-8",
    trilha: "hipnose",
    enunciado: "Hipnotizabilidade é definida como:",
    opcoes: [
      "A habilidade do terapeuta de convencer o cliente",
      "A capacidade de vivenciar alterações sugeridas durante a hipnose",
      "A profundidade do sono alcançada",
      "O tempo que o transe dura",
    ],
    correta: 1,
    explicacao:
      "É uma característica da pessoa: quanto ela consegue experienciar as alterações sugeridas.",
    fonte: APA,
    confianca: "alta",
  },

  // ───────────────────────── Comportamento humano ─────────────────────────
  {
    id: "q-com-1",
    trilha: "comportamento",
    enunciado: "No condicionamento clássico, o que acontece?",
    opcoes: [
      "O comportamento é moldado por suas consequências",
      "Um estímulo neutro passa a evocar resposta por associação a outro estímulo",
      "A pessoa aprende observando outra",
      "O comportamento desaparece por falta de reforço",
    ],
    correta: 1,
    explicacao:
      "É aprendizagem por associação entre estímulos — o modelo dos experimentos de Pavlov.",
    fonte: NOBA_APRENDIZAGEM,
    confianca: "alta",
  },
  {
    id: "q-com-2",
    trilha: "comportamento",
    enunciado: "Reforço negativo é:",
    opcoes: [
      "Apresentar algo desagradável para reduzir um comportamento",
      "Remover algo desagradável, aumentando a chance de o comportamento se repetir",
      "Elogiar alguém depois de uma ação",
      "Ignorar um comportamento indesejado",
    ],
    correta: 1,
    explicacao:
      "'Negativo' refere-se à remoção de um estímulo, não a algo ruim. E o efeito é aumentar o comportamento.",
    fonte: NOBA_APRENDIZAGEM,
    confianca: "alta",
  },
  {
    id: "q-com-3",
    trilha: "comportamento",
    enunciado: "Extinção, no condicionamento, é:",
    opcoes: [
      "Aumento da resposta com o tempo",
      "Diminuição da resposta aprendida quando o reforço deixa de ocorrer",
      "Aprendizagem de um novo comportamento por observação",
      "Punição física",
    ],
    correta: 1,
    explicacao:
      "Sem reforço, a resposta enfraquece — mas pode reaparecer espontaneamente depois.",
    fonte: NOBA_APRENDIZAGEM,
    confianca: "alta",
  },
  {
    id: "q-com-4",
    trilha: "comportamento",
    enunciado: "Punição tende a:",
    opcoes: [
      "Aumentar a frequência do comportamento",
      "Reduzir a frequência do comportamento",
      "Não ter efeito sobre o comportamento",
      "Eliminar a memória do evento",
    ],
    correta: 1,
    explicacao:
      "Punição reduz a probabilidade do comportamento; reforço a aumenta. São funções opostas.",
    fonte: NOBA_APRENDIZAGEM,
    confianca: "alta",
  },
  {
    id: "q-com-5",
    trilha: "comportamento",
    enunciado: "Viés de confirmação é a tendência a:",
    opcoes: [
      "Lembrar melhor de informações neutras",
      "Buscar e valorizar informações que confirmam o que já se acredita",
      "Mudar de opinião com facilidade",
      "Confiar mais em quem discorda",
    ],
    correta: 1,
    explicacao:
      "Filtramos o mundo a favor das crenças que já temos, o que dificulta corrigir enganos.",
    fonte: NOBA_APRENDIZAGEM,
    confianca: "media",
  },
  {
    id: "q-com-6",
    trilha: "comportamento",
    enunciado: "Memória declarativa é aquela que:",
    opcoes: [
      "Não pode ser verbalizada",
      "Diz respeito a fatos e eventos, e pode ser verbalizada",
      "Controla apenas habilidades motoras",
      "Dura no máximo alguns segundos",
    ],
    correta: 1,
    explicacao:
      "Declarativa é a memória do que se pode contar: fatos e episódios. Habilidades ficam na memória procedural.",
    fonte: NOBA_MEMORIA,
    confianca: "alta",
  },
  {
    id: "q-com-7",
    trilha: "comportamento",
    enunciado: "Na TRI, comportamento evitativo é entendido como:",
    opcoes: [
      "Uma estratégia sempre saudável de autocuidado",
      "Um conjunto de ações que afasta o contato com o que gera desconforto",
      "A capacidade de enfrentar o conflito de frente",
      "Um sintoma exclusivamente genético",
    ],
    correta: 1,
    explicacao:
      "A TRI descreve a evitação como 'gambiarra emocional': alivia agora, mas mantém o conflito intacto.",
    fonte: GLOSSARIO,
    confianca: "alta",
  },
  {
    id: "q-com-8",
    trilha: "comportamento",
    enunciado: "Na TRI, acoplamento descreve:",
    opcoes: [
      "A união de duas pessoas em um relacionamento",
      "A interação entre o sistema nervoso do indivíduo e o ambiente que o cerca",
      "A fusão de dois neurônios",
      "O tempo de duração de uma sessão",
    ],
    correta: 1,
    explicacao:
      "A TRI parte da ideia do cérebro social: o sistema nervoso se acopla continuamente aos sistemas ao seu redor, podendo reforçar ou desgastar a pessoa.",
    fonte: GLOSSARIO,
    confianca: "alta",
  },
  // ───────────────────────── TRI — Neurociências ─────────────────────────
  {
    id: "q-tri-neu-1",
    trilha: "neurociencias",
    enunciado: "O que propõe a teoria econômica do encéfalo na TRI?",
    opcoes: [
      "Que o cérebro busca novidade a qualquer custo",
      "Que automatismos economizam energia e sustentam respostas rápidas",
      "Que toda reação emocional é um bloqueio inconsciente",
      "Que a memória funciona como uma gravação perfeita",
    ],
    correta: 1,
    explicacao:
      "A TRI vê padrões automáticos como adaptações econômicas, não como falhas a eliminar.",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
  },
  {
    id: "q-tri-neu-2",
    trilha: "neurociencias",
    enunciado: "Segundo a TRI, qual papel dos gânglios da base é destacado?",
    opcoes: [
      "Consolidar hábitos e reduzir a demanda do córtex pré-frontal",
      "Produzir hormônios do estresse",
      "Processar exclusivamente a visão",
      "Regular apenas a temperatura corporal",
    ],
    correta: 0,
    explicacao:
      "A teoria econômica associa os gânglios da base à automatização de respostas habituais.",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
  },
  {
    id: "q-tri-neu-3",
    trilha: "neurociencias",
    enunciado: "Memória implícita é aquela que:",
    opcoes: [
      "Só aparece em testes de vocabulário",
      "Exige recordação consciente e verbal",
      "Se expressa em respostas e hábitos sem lembrança consciente",
      "É sempre falsa",
    ],
    correta: 2,
    explicacao:
      "A memória implícita aparece no fazer e no reagir, não necessariamente na fala sobre o que se lembra.",
    fonte: GLOSSARIO,
    confianca: "alta",
  },
  {
    id: "q-tri-neu-4",
    trilha: "neurociencias",
    enunciado: "Na TRI, Processos Adaptativos são:",
    opcoes: [
      "Respostas aleatórias sem função",
      "Padrões consolidados para se ajustar ao meio e economizar recursos",
      "Sintomas que sempre indicam doença",
      "Técnicas de memorização para provas",
    ],
    correta: 1,
    explicacao:
      "O primeiro princípio TRI descreve adaptação e economia como base do funcionamento nervoso.",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
  },
  {
    id: "q-tri-neu-5",
    trilha: "neurociencias",
    enunciado: "O que é um engrama?",
    opcoes: [
      "Uma emoção sem expressão corporal",
      "Uma alteração neural que sustenta uma memória",
      "Um tipo de sintoma físico",
      "Um teste neurológico",
    ],
    correta: 1,
    explicacao:
      "O engrama é o substrato neural de uma memória; quando reativado, pode disparar respostas automáticas.",
    fonte: TRI_MANUAL,
    confianca: "media",
  },
  // ───────────────────────── TRI — Neurofisiologia ─────────────────────────
  {
    id: "q-tri-fis-1",
    trilha: "neurofisiologia",
    enunciado: "Cargas afetivas, na TRI, são:",
    opcoes: [
      "Experiências emocionais acumuladas que moldam respostas",
      "Apenas traumas reconhecidos pelo cliente",
      "Hormônios liberados em situações de perigo",
      "Exercícios de respiração",
    ],
    correta: 0,
    explicacao:
      "As cargas afetivas são a memória emocional que influencia reações presentes.",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
  },
  {
    id: "q-tri-fis-2",
    trilha: "neurofisiologia",
    enunciado: "Tensões afetivas surgem quando:",
    opcoes: [
      "O corpo está completamente relaxado",
      "As cargas internas entram em conflito com demandas do presente",
      "A pessoa dorme bem",
      "Não há memória emocional",
    ],
    correta: 1,
    explicacao:
      "A TRI descreve tensão como choque entre o que está acumulado e o que a situação exige.",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
  },
  {
    id: "q-tri-fis-3",
    trilha: "neurofisiologia",
    enunciado: "“O corpo é o palco” significa que:",
    opcoes: [
      "O corpo é apenas uma máquina sem relação com emoções",
      "Postura e reações somáticas expressam padrões emocionais",
      "Emoções só existem na linguagem",
      "O corpo deve ser ignorado no processo",
    ],
    correta: 1,
    explicacao:
      "Na TRI, o corpo manifesta de forma visível sistemas representacionais e padrões automáticos.",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
  },
  {
    id: "q-tri-fis-4",
    trilha: "neurofisiologia",
    enunciado: "Movimentos de adaptação são:",
    opcoes: [
      "Ações que restauram equilíbrio interno",
      "Movimentos exclusivamente esportivos",
      "Reações sem função adaptativa",
      "Conflitos que nunca se resolvem",
    ],
    correta: 0,
    explicacao:
      "São as respostas geradas pelo sistema para lidar com tensões e ajustar o organismo ao contexto.",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
  },
  {
    id: "q-tri-fis-5",
    trilha: "neurofisiologia",
    enunciado: "A demanda emocional, na TRI, pode ser entendida como:",
    opcoes: [
      "Uma exigência externa de aprovação",
      "Uma força interna que busca experiências emocionais conhecidas",
      "Um sintoma exclusivo de ansiedade",
      "Uma técnica de respiração",
    ],
    correta: 1,
    explicacao:
      "A demanda emocional direciona a repetição de cenários compatíveis com cargas já internalizadas.",
    fonte: TRI_MANUAL,
    confianca: "media",
  },
  // ───────────────────────── TRI — Hipnose clínica ─────────────────────────
  {
    id: "q-tri-hip-1",
    trilha: "hipnose",
    enunciado: "TRI e hipnose, na visão da TRI, diferem porque:",
    opcoes: [
      "A TRI depende de transe mais profundo",
      "A TRI não se baseia em sugestão ou reprogramação",
      "A hipnose nunca usa foco",
      "A TRI exige regressão ao passado",
    ],
    correta: 1,
    explicacao:
      "A TRI pode usar foco consciente, mas não é um braço da hipnoterapia nem técnica de sugestão.",
    fonte: GLOSSARIO,
    confianca: "alta",
  },
  {
    id: "q-tri-hip-2",
    trilha: "hipnose",
    enunciado: "Na TRI, focalização ativa significa:",
    opcoes: [
      "Suspender o controle cognitivo",
      "Dirigir atenção consciente à experiência presente",
      "Dormir profundamente durante a sessão",
      "Aceitar sugestões sem questionar",
    ],
    correta: 1,
    explicacao:
      "O foco ajuda a perceber emoções e reações com clareza; não é transe hipnótico.",
    fonte: GLOSSARIO,
    confianca: "alta",
  },
  {
    id: "q-tri-hip-3",
    trilha: "hipnose",
    enunciado: "A TRI trabalha com o passado principalmente para:",
    opcoes: [
      "Reviver cada evento traumático",
      "Provar que o passado causou tudo",
      "Compreender respostas atuais, sem exigir regressão",
      "Eliminar memórias",
    ],
    correta: 2,
    explicacao:
      "O foco é o funcionamento presente, não a reconstrução ou correção de uma história.",
    fonte: GLOSSARIO,
    confianca: "alta",
  },
  {
    id: "q-tri-hip-4",
    trilha: "hipnose",
    enunciado: "Revelação, na TRI, é:",
    opcoes: [
      "Descobrir uma verdade oculta e definitiva",
      "Trazer tensões implícitas para a consciência",
      "Receber uma sugestão pós-hipnótica",
      "Esquecer conflitos antigos",
    ],
    correta: 1,
    explicacao:
      "É o tornar-se perceptível do que estava implícito; não exige uma interpretação única.",
    fonte: TRI_MANUAL,
    confianca: "media",
  },
  {
    id: "q-tri-hip-5",
    trilha: "hipnose",
    enunciado: "Catarse reelaborativa significa:",
    opcoes: [
      "Apenas desabafar para aliviar",
      "Expressar e integrar conteúdos afetivos no processo",
      "Hipnotizar profundamente o cliente",
      "Evitar qualquer emoção",
    ],
    correta: 1,
    explicacao:
      "Na TRI, catarse é parte da reintegração, não um fim em si mesma.",
    fonte: TRI_MANUAL,
    confianca: "media",
  },
  // ───────────────────────── TRI — Comportamento humano ─────────────────────────
  {
    id: "q-tri-com-1",
    trilha: "comportamento",
    enunciado: "Gambiarra emocional é:",
    opcoes: [
      "Uma solução temporária que mascara a causa do desconforto",
      "Um hábito sempre saudável",
      "Uma técnica de estudo",
      "Uma forma de eliminar emoções",
    ],
    correta: 0,
    explicacao:
      "O alívio imediato não resolve o conflito; apenas mantém o ciclo de evitação.",
    fonte: GLOSSARIO,
    confianca: "alta",
  },
  {
    id: "q-tri-com-2",
    trilha: "comportamento",
    enunciado: "O princípio do cérebro amoral diz que o encéfalo:",
    opcoes: [
      "Julga moralmente cada ato",
      "Organiza padrões sem emitir juízo moral",
      "Impede decisões erradas",
      "É sempre consciente",
    ],
    correta: 1,
    explicacao:
      "O cérebro organiza informações; moralidade não é uma função do processamento neural.",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
  },
  {
    id: "q-tri-com-3",
    trilha: "comportamento",
    enunciado: "“Problema não é o problema” significa:",
    opcoes: [
      "Problemas nunca importam",
      "É preciso olhar a dinâmica subjacente ao sintoma",
      "Sintomas são sempre físicos",
      "O cliente deve evitar falar do problema",
    ],
    correta: 1,
    explicacao:
      "A TRI procura o padrão que mantém a dificuldade, não apenas o enunciado aparente.",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
  },
  {
    id: "q-tri-com-4",
    trilha: "comportamento",
    enunciado: "Narrativa coerente é:",
    opcoes: [
      "Uma história lógica que organiza experiências para a vida social",
      "Uma mentira contada pelo cliente",
      "Um diagnóstico médico",
      "Um teste de memória",
    ],
    correta: 0,
    explicacao:
      "As histórias internas dão sentido às vivências e permitem agir no mundo.",
    fonte: TRI_PRINCIPIOS,
    confianca: "alta",
  },
  {
    id: "q-tri-com-5",
    trilha: "comportamento",
    enunciado: "Construtivismo, na TRI, implica que:",
    opcoes: [
      "Existe uma única verdade objetiva para o cliente",
      "Cada pessoa constrói sua realidade a partir das relações",
      "A terapia deve corrigir percepções do cliente",
      "O passado determina tudo",
    ],
    correta: 1,
    explicacao:
      "A TRI trabalha o modo como a pessoa constrói e mantém sua visão do mundo.",
    fonte: GLOSSARIO,
    confianca: "alta",
  },
];

export const perguntasDaTrilha = (trilha: string) =>
  PERGUNTAS.filter((p) => p.trilha === trilha);

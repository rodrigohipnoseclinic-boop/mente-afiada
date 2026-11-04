import type { Fonte, Termo, TrilhaId } from "./tipos";
import { normalizar } from "../jogo/normalizar";

const f = (titulo: string, instituicao: string, url: string, ano: number): Fonte => ({
  titulo,
  instituicao,
  url,
  ano,
});

const NINDS = f(
  "Brain Basics",
  "NINDS / NIH",
  "https://www.ninds.nih.gov/health-information/public-education/brain-basics",
  2026
);
const NOBA_NEURONIOS = f(
  "Neurons",
  "Noba Project (S. Furtak)",
  "https://nobaproject.com/modules/neurons",
  2026
);
const NOBA_CEREBRO = f(
  "The Brain",
  "Noba Project (Beck & Tapia)",
  "https://nobaproject.com/modules/the-brain",
  2026
);
const NOBA_MEMORIA = f(
  "Memory (Encoding, Storage, Retrieval)",
  "Noba Project (McDermott & Roediger)",
  "https://nobaproject.com/modules/memory-encoding-storage-retrieval",
  2026
);
const NOBA_CONDICIONAMENTO = f(
  "Conditioning and Learning",
  "Noba Project (M. Bouton)",
  "https://nobaproject.com/modules/conditioning-and-learning",
  2026
);
const NOBA_AFETIVA = f(
  "Affective Neuroscience",
  "Noba Project (Harmon-Jones)",
  "https://nobaproject.com/modules/affective-neuroscience",
  2026
);
const A_AND_P = f(
  "Anatomy and Physiology 2e, cap. 12–13",
  "OpenStax",
  "https://openstax.org/books/anatomy-and-physiology-2e/pages/12-introduction",
  2022
);
const APA_HIPNOSE = f(
  "Definition and Description of Hypnosis",
  "APA Division 30",
  "https://www.apadivisions.org/division-30/about",
  2014
);
const GLOSSARIO_TRI = f(
  "Glossário TRI",
  "Material próprio TRI",
  "conteudo/extraido/glossario-tri.txt",
  2025
);
const TRI_PRINCIPIOS = f(
  "Os Dez Princípios TRI",
  "Material próprio TRI",
  "conteudo/extraido/principios-da-tri-pdf.txt",
  2025
);
const TRI_MANUAL = f(
  "Manual de Terapia de Reintegração Implícita 2025",
  "Material próprio TRI",
  "conteudo/extraido/manual-de-terapia-de-reintegracao-implicita-2025-docx.txt",
  2025
);
const BRJP_HIPNOSE = f(
  "Eficácia da hipnose no manejo da dor não procedimental",
  "Brazilian Journal of Pain (BrJP)",
  "https://doi.org/10.5935/2595-0118.20210045",
  2021
);

type Linha = [string, string, string, TrilhaId, Fonte, ("alta" | "media" | "baixa")?];

const linhas: Linha[] = [
  // ───────────────────────── Neurociências ─────────────────────────
  ["neu-neuronio", "Neurônio", "Célula do sistema nervoso especializada em receber, processar e transmitir informação por sinais elétricos e químicos.", "neurociencias", NINDS],
  ["neu-sinapse", "Sinapse", "Ponto de contato funcional entre dois neurônios, ou entre neurônio e célula-alvo, onde o sinal é transmitido.", "neurociencias", A_AND_P],
  ["neu-dendrito", "Dendrito", "Prolongamento ramificado do neurônio que recebe os sinais que chegam à célula.", "neurociencias", NINDS],
  ["neu-axonio", "Axônio", "Prolongamento único do neurônio que conduz o impulso elétrico para longe do corpo celular.", "neurociencias", NINDS],
  ["neu-mielina", "Bainha de mielina", "Camada lipídica produzida por células gliais que envolve o axônio e acelera a condução do impulso.", "neurociencias", A_AND_P],
  ["neu-glia", "Célula glial", "Célula de suporte do sistema nervoso: nutre, isola e protege os neurônios.", "neurociencias", NOBA_NEURONIOS],
  ["neu-cortex", "Córtex cerebral", "Camada externa enrugada do cérebro, ligada à percepção, ao movimento voluntário, à linguagem e ao raciocínio.", "neurociencias", NINDS],
  ["neu-hipocampo", "Hipocampo", "Estrutura do lobo temporal associada à formação de novas memórias declarativas.", "neurociencias", NOBA_MEMORIA],
  ["neu-amigdala", "Amígdala", "Estrutura profunda do lobo temporal associada ao processamento de emoções, sobretudo ao medo.", "neurociencias", NOBA_AFETIVA],
  ["neu-cerebelo", "Cerebelo", "Estrutura na base do crânio que coordena equilíbrio, postura e precisão dos movimentos.", "neurociencias", NINDS],
  ["neu-talamo", "Tálamo", "Estação de retransmissão que recebe sinais sensoriais e os encaminha ao córtex.", "neurociencias", A_AND_P],
  ["neu-hipotalamo", "Hipotálamo", "Região que regula temperatura, fome, sede e sono, e faz a ponte entre sistema nervoso e endócrino.", "neurociencias", A_AND_P],
  ["neu-plasticidade", "Neuroplasticidade", "Capacidade do sistema nervoso de reorganizar conexões e mudar com a experiência.", "neurociencias", NOBA_CEREBRO],
  ["neu-snc", "Sistema nervoso central", "Conjunto formado pelo encéfalo e pela medula espinal.", "neurociencias", NINDS],
  ["neu-snp", "Sistema nervoso periférico", "Nervos e gânglios que conectam o sistema nervoso central ao resto do corpo.", "neurociencias", NINDS],
  ["neu-encefalo", "Encéfalo", "Parte do sistema nervoso central contida no crânio, que inclui cérebro, cerebelo e tronco encefálico.", "neurociencias", NINDS],
  ["neu-tronco", "Tronco encefálico", "Região que liga o encéfalo à medula e controla funções vitais como respiração e batimentos.", "neurociencias", NINDS],
  ["neu-neurotransmissor", "Neurotransmissor", "Substância química liberada na sinapse que leva informação de uma célula nervosa a outra.", "neurociencias", A_AND_P],

  // ───────────────────────── Neurofisiologia ─────────────────────────
  ["fis-repouso", "Potencial de repouso", "Diferença de carga elétrica entre o interior e o exterior da membrana do neurônio em repouso.", "neurofisiologia", A_AND_P],
  ["fis-bomba", "Bomba de sódio-potássio", "Proteína de membrana que gasta ATP para levar sódio para fora e potássio para dentro da célula.", "neurofisiologia", A_AND_P],
  ["fis-despolarizacao", "Despolarização", "Redução da diferença de potencial da membrana, deixando o interior menos negativo.", "neurofisiologia", A_AND_P],
  ["fis-repolarizacao", "Repolarização", "Retorno do potencial de membrana ao valor de repouso após a despolarização.", "neurofisiologia", A_AND_P],
  ["fis-acao", "Potencial de ação", "Impulso elétrico que se propaga pelo axônio quando a despolarização ultrapassa o limiar.", "neurofisiologia", A_AND_P],
  ["fis-limiar", "Limiar de excitabilidade", "Nível mínimo de estímulo necessário para disparar um potencial de ação.", "neurofisiologia", A_AND_P],
  ["fis-refratario", "Período refratário", "Intervalo em que o neurônio não dispara outro potencial de ação, ou precisa de estímulo maior.", "neurofisiologia", A_AND_P],
  ["fis-excitacao", "Excitação neuronal", "Aumento da probabilidade de a célula pós-sináptica disparar um potencial de ação.", "neurofisiologia", A_AND_P],
  ["fis-inibicao", "Inibição neuronal", "Redução da probabilidade de a célula pós-sináptica disparar um potencial de ação.", "neurofisiologia", A_AND_P],
  ["fis-autonomo", "Sistema nervoso autônomo", "Divisão que controla funções involuntárias, como batimentos cardíacos e digestão.", "neurofisiologia", A_AND_P],
  ["fis-simpatico", "Sistema simpático", "Divisão do autônomo ligada à mobilização de energia: a resposta de luta ou fuga.", "neurofisiologia", A_AND_P],
  ["fis-parassimpatico", "Sistema parassimpático", "Divisão do autônomo ligada ao repouso, à digestão e à recuperação.", "neurofisiologia", A_AND_P],
  ["fis-reflexo", "Arco reflexo", "Circuito que gera resposta motora automática sem depender diretamente da consciência.", "neurofisiologia", A_AND_P],
  ["fis-saltatoria", "Condução saltatória", "Propagação do impulso que salta entre os nodos do axônio mielinizado, tornando a condução mais rápida.", "neurofisiologia", A_AND_P],
  ["fis-calcio", "Cálcio", "Íon cuja entrada no terminal do axônio é essencial para a liberação de neurotransmissores.", "neurofisiologia", A_AND_P],
  ["fis-homeostase", "Homeostase", "Conjunto de ajustes que mantém o meio interno estável apesar das variações externas.", "neurofisiologia", NINDS],
  ["fis-gaba", "GABA", "Principal neurotransmissor inibitório do sistema nervoso central.", "neurofisiologia", A_AND_P, "media"],
  ["fis-glutamato", "Glutamato", "Principal neurotransmissor excitatório do sistema nervoso central.", "neurofisiologia", A_AND_P, "media"],

  // ───────────────────────── Hipnose clínica ─────────────────────────
  ["hip-hipnose", "Hipnose", "Estado de consciência que envolve atenção focada e redução da consciência periférica, com maior capacidade de resposta à sugestão.", "hipnose", APA_HIPNOSE],
  ["hip-inducao", "Indução hipnótica", "Procedimento concebido para induzir a hipnose.", "hipnose", APA_HIPNOSE],
  ["hip-hipnotizabilidade", "Hipnotizabilidade", "Capacidade de vivenciar alterações sugeridas em fisiologia, sensações, emoções ou comportamento durante a hipnose.", "hipnose", APA_HIPNOSE],
  ["hip-hipnoterapia", "Hipnoterapia", "Uso da hipnose no tratamento de um transtorno ou problema médico ou psicológico.", "hipnose", APA_HIPNOSE],
  ["hip-transe", "Transe", "Estado de atenção concentrada e absorção, com estreitamento do foco consciente.", "hipnose", APA_HIPNOSE, "media"],
  ["hip-sugestao", "Sugestão", "Proposição que orienta a experiência subjetiva durante a hipnose.", "hipnose", APA_HIPNOSE],
  ["hip-pos-hipnotica", "Sugestão pós-hipnótica", "Sugestão dada durante a hipnose para produzir efeito depois, fora do transe.", "hipnose", APA_HIPNOSE],
  ["hip-auto", "Auto-hipnose", "Uso da hipnose sem terapeuta, baseado em autoindução e autossugestão.", "hipnose", APA_HIPNOSE],
  ["hip-dissociacao", "Dissociação", "Separação temporária entre processos mentais que normalmente ocorrem juntos, como sensação e memória.", "hipnose", APA_HIPNOSE, "media"],
  ["hip-catalepsia", "Catalepsia", "Enrijecimento muscular sugerido, em que o membro se sustenta sem apoio consciente.", "hipnose", APA_HIPNOSE, "media"],
  ["hip-rapport", "Rapport", "Relação de confiança e sintonia entre terapeuta e cliente, que sustenta o processo.", "hipnose", BRJP_HIPNOSE, "media"],
  ["hip-atencao", "Atenção seletiva", "Redirecionamento do foco atencional para um estímulo específico, típico da indução.", "hipnose", APA_HIPNOSE],
  ["hip-imaginacao", "Imaginação guiada", "Uso de imagens sugeridas para construir a experiência durante o transe.", "hipnose", APA_HIPNOSE],
  ["hip-mito", "Mito da dominação", "Ideia falsa de que a hipnose permite controlar a vontade de outra pessoa.", "hipnose", APA_HIPNOSE],
  ["hip-evidencia", "Evidência em hipnose", "Revisões sistemáticas mostram alívio de dor com efeito pequeno a moderado, e os resultados divergem entre estudos.", "hipnose", BRJP_HIPNOSE, "alta"],
  ["hip-absorcao", "Absorção", "Envolvimento profundo da atenção em uma experiência, deixando o entorno em segundo plano.", "hipnose", APA_HIPNOSE, "media"],

  // ───────────────────────── Comportamento humano ─────────────────────────
  ["com-classico", "Condicionamento clássico", "Aprendizagem em que um estímulo neutro passa a evocar resposta por ser associado a um estímulo que já a produzia.", "comportamento", NOBA_CONDICIONAMENTO],
  ["com-operante", "Condicionamento operante", "Aprendizagem em que o comportamento é moldado pelas consequências que se seguem a ele.", "comportamento", NOBA_CONDICIONAMENTO],
  ["com-reforco-pos", "Reforço positivo", "Consequência que aumenta a chance de o comportamento se repetir, pela adição de algo agradável.", "comportamento", NOBA_CONDICIONAMENTO],
  ["com-reforco-neg", "Reforço negativo", "Consequência que aumenta a chance de o comportamento se repetir, pela remoção de algo desagradável.", "comportamento", NOBA_CONDICIONAMENTO],
  ["com-punicao", "Punição", "Consequência que reduz a chance de o comportamento se repetir.", "comportamento", NOBA_CONDICIONAMENTO],
  ["com-extincao", "Extinção", "Diminuição gradual de uma resposta aprendida quando o reforço deixa de ocorrer.", "comportamento", NOBA_CONDICIONAMENTO],
  ["com-habituacao", "Habituação", "Redução da resposta a um estímulo repetido e não significativo.", "comportamento", NOBA_CONDICIONAMENTO],
  ["com-vies", "Viés de confirmação", "Tendência a buscar e valorizar informações que confirmam o que já se acredita.", "comportamento", NOBA_CONDICIONAMENTO, "media"],
  ["com-marcador", "Marcador somático", "Sinal corporal afetivo que influencia a decisão antes do raciocínio consciente.", "comportamento", GLOSSARIO_TRI, "media"],
  ["com-declarativa", "Memória declarativa", "Memória sobre fatos e eventos, que pode ser verbalizada.", "comportamento", NOBA_MEMORIA],
  ["com-evitatico", "Comportamento evitativo", "Conjunto de ações que afasta o contato com estímulos que geram desconforto.", "comportamento", GLOSSARIO_TRI],
  ["com-acoplamento", "Acoplamento", "Interação entre o sistema nervoso do indivíduo e o ambiente que o cerca, que pode reforçá-lo ou desgastá-lo.", "comportamento", GLOSSARIO_TRI],
  ["com-introjecao", "Introjeção", "Incorporação de valores, vozes ou modos de outra pessoa para dentro de si.", "comportamento", GLOSSARIO_TRI],
  ["com-triade", "Tríade cognitiva", "Modelo com três campos de crenças negativas: sobre si, sobre o mundo e sobre o futuro.", "comportamento", GLOSSARIO_TRI, "media"],
  ["com-script", "Script de atuação", "Padrão repetido de comportamento que a pessoa representa nos diferentes contextos.", "comportamento", TRI_PRINCIPIOS],
  ["com-representacional", "Sistemas representacionais", "Modos pelos quais a pessoa interpreta, organiza e responde às experiências.", "comportamento", GLOSSARIO_TRI],
  ["com-autoridade", "Falácia da autoridade", "Erro de tomar uma afirmação como verdadeira apenas porque quem a diz tem prestígio.", "comportamento", GLOSSARIO_TRI],
  ["com-euismo", "Euísmo", "Na TRI, forma de egoísmo em que a própria perspectiva é tomada como medida de tudo.", "comportamento", GLOSSARIO_TRI],
  ["com-integracao", "Reintegração implícita", "Processo de reconectar experiências dissociadas, em vez de apenas suprimir o sintoma.", "comportamento", TRI_PRINCIPIOS],
  ["com-decifrar", "Decodificar", "Na TRI, traduzir o que o corpo e o comportamento expressam em significado compreensível.", "comportamento", GLOSSARIO_TRI, "media"],

  // ───────────────────────── TRI — Neurociências ─────────────────────────
  ["tri-cerebro-social", "Cérebro social", "Ideia de que o sistema nervoso se constrói e se regula na interação constante com pessoas, grupos e ambientes.", "neurociencias", GLOSSARIO_TRI],
  ["tri-engrama", "Engrama", "Conjunto de alterações neurais que sustenta uma memória e pode ser reativado por pistas semelhantes.", "neurociencias", TRI_MANUAL, "media"],
  ["tri-ganglios-base", "Gânglios da base", "Estruturas envolvidas na consolidação de hábitos e respostas repetitivas, reduzindo a demanda do córtex pré-frontal.", "neurociencias", TRI_PRINCIPIOS],
  ["tri-memoria-emocional", "Memória emocional", "Vivências afetivas armazenadas que influenciam reações atuais de forma muitas vezes automática.", "neurociencias", GLOSSARIO_TRI],
  ["tri-memoria-implicita", "Memória implícita", "Memória expressa em respostas e hábitos, sem recordação consciente do aprendizado.", "neurociencias", GLOSSARIO_TRI],
  ["tri-memoria-explicita", "Memória explícita", "Memória que pode ser lembrada e descrita conscientemente.", "neurociencias", GLOSSARIO_TRI],
  ["tri-memoria-reconstruida", "Memória reconstruída", "Lembrança reorganizada no presente, não uma cópia intacta do acontecimento.", "neurociencias", GLOSSARIO_TRI, "media"],
  ["tri-neurogenese", "Neurogênese", "Formação de novos neurônios; uma base biológica para a plasticidade.", "neurociencias", GLOSSARIO_TRI, "media"],
  ["tri-fluxo-eu", "Fluxo de eu", "Visão do eu como processo em transformação, formado nas relações e adaptações, não como essência fixa.", "neurociencias", GLOSSARIO_TRI, "media"],
  ["tri-monismo", "Monismo", "Perspectiva de que mente e corpo são aspectos de um mesmo processo, não substâncias separadas.", "neurociencias", GLOSSARIO_TRI, "media"],

  // ───────────────────────── TRI — Neurofisiologia ─────────────────────────
  ["tri-processos-adaptativos", "Processos Adaptativos", "Padrões que o sistema nervoso consolida para se ajustar ao meio e economizar recursos.", "neurofisiologia", TRI_PRINCIPIOS],
  ["tri-teoria-economica", "Teoria econômica do encéfalo", "Proposta de que o cérebro favorece automatismos para reduzir gasto energético.", "neurofisiologia", TRI_PRINCIPIOS],
  ["tri-economia-energetica", "Economia energética", "Princípio de responder com o menor custo possível, reutilizando padrões bem-sucedidos.", "neurofisiologia", TRI_PRINCIPIOS],
  ["tri-inibicao-adaptativa", "Inibição adaptativa", "Capacidade de regular ou suprimir impulsos para ajustar a resposta ao contexto.", "neurofisiologia", TRI_PRINCIPIOS, "media"],
  ["tri-cargas-afetivas", "Cargas afetivas", "Experiências emocionais acumuladas que moldam padrões de resposta.", "neurofisiologia", TRI_PRINCIPIOS],
  ["tri-tensoes-afetivas", "Tensões afetivas", "Estado de conflito entre cargas internas e demandas do presente.", "neurofisiologia", TRI_PRINCIPIOS],
  ["tri-movimentos-adaptacao", "Movimentos de adaptação", "Ações e respostas geradas para restabelecer o equilíbrio interno.", "neurofisiologia", TRI_PRINCIPIOS],
  ["tri-corpo-palco", "Corpo como palco", "Princípio de que corpo e postura expressam padrões emocionais automatizados.", "neurofisiologia", TRI_PRINCIPIOS],
  ["tri-interocepção", "Interocepção", "Percepção de sinais internos do corpo, útil para reconhecer padrões antes que virem ação.", "neurofisiologia", TRI_MANUAL, "media"],
  ["tri-demanda-emocional", "Demanda emocional", "Força interna que direciona a busca ou repetição de experiências emocionais conhecidas.", "neurofisiologia", TRI_MANUAL, "media"],

  // ───────────────────────── TRI — Hipnose clínica ─────────────────────────
  ["tri-nao-hipnose", "TRI não é hipnose", "A TRI usa foco e observação; não depende de transe, sugestão ou reprogramação.", "hipnose", GLOSSARIO_TRI],
  ["tri-focalizacao-ativa", "Focalização ativa", "Atenção consciente dirigida à experiência presente, sem suspender o controle cognitivo.", "hipnose", GLOSSARIO_TRI],
  ["tri-sem-regressao", "Trabalho no presente", "A TRI observa como a reação funciona hoje, sem exigir reviver ou corrigir o passado.", "hipnose", GLOSSARIO_TRI],
  ["tri-sem-reprogramacao", "Sem reprogramação", "A mudança vem de perceber e organizar respostas, não de instalar sugestões.", "hipnose", GLOSSARIO_TRI],
  ["tri-revelacao", "Revelação", "Momento em que tensões e associações implícitas se tornam perceptíveis.", "hipnose", TRI_MANUAL, "media"],
  ["tri-compreensao", "Compreensão", "Percepção mais clara de como respostas atuais geram sofrimento.", "hipnose", GLOSSARIO_TRI],
  ["tri-reeducacao", "Reeducação", "Aprendizagem de responder ao desconforto diretamente, sem gambiarras emocionais.", "hipnose", GLOSSARIO_TRI, "media"],
  ["tri-catarse-reelaborativa", "Catarse reelaborativa", "Expressão e integração de conteúdos afetivos na sessão; não é apenas desabafo.", "hipnose", TRI_MANUAL, "media"],
  ["tri-imagetica", "Imagética", "Uso de imagens para acessar e trabalhar experiências e emoções.", "hipnose", TRI_MANUAL, "media"],
  ["tri-triangulacao", "Triangulação", "Procedimento para observar e trabalhar partes conflitantes do funcionamento emocional.", "hipnose", TRI_MANUAL, "media"],

  // ───────────────────────── TRI — Comportamento humano ─────────────────────────
  ["tri-gambiarra", "Gambiarra emocional", "Alívio rápido que mascara a causa do desconforto sem resolver o conflito.", "comportamento", GLOSSARIO_TRI],
  ["tri-supressao", "Supressão emocional", "Escolha de empurrar emoções para debaixo do tapete, mantendo a carga afetiva.", "comportamento", GLOSSARIO_TRI],
  ["tri-cerebro-amoral", "Cérebro amoral", "O encéfalo não julga certo e errado; organiza padrões conforme aprendizados.", "comportamento", TRI_PRINCIPIOS],
  ["tri-sacrificio-iguais", "Sacrifício por amor aos iguais", "Tendência a alinhar-se ao grupo, muitas vezes em detrimento das necessidades próprias.", "comportamento", TRI_PRINCIPIOS, "media"],
  ["tri-narrativa", "Narrativa coerente", "História interna que dá sentido às vivências e as organiza logicamente.", "comportamento", TRI_PRINCIPIOS],
  ["tri-construtivismo", "Construtivismo", "Visão de que cada pessoa constrói sua realidade a partir de interações e experiência.", "comportamento", GLOSSARIO_TRI],
  ["tri-paradoxo", "Paradoxo da TRI", "Abordagem vista como complexa na teoria e simples na prática.", "comportamento", GLOSSARIO_TRI, "media"],
  ["tri-problema-nao-problema", "Problema não é o problema", "Foco na dinâmica subjacente ao sintoma, não apenas no problema declarado.", "comportamento", TRI_PRINCIPIOS],
  ["tri-falacia-causalidade", "Falácia correlação-causalidade", "Erro de tomar um evento passado como causa direta do comportamento atual.", "comportamento", GLOSSARIO_TRI, "media"],
  ["tri-processo-mediativo", "Processo mediativo", "Papel de observar e mediar conflitos internos de modo consciente.", "comportamento", TRI_PRINCIPIOS, "media"],
];

export const TERMOS: Termo[] = linhas.map(([id, termo, definicao, trilha, fonte, confianca]) => ({
  id,
  termo,
  chave: normalizar(termo),
  definicao,
  trilha,
  fonte,
  confianca: confianca ?? "alta",
})).filter((t) => t.chave.length > 0);

export const termosDaTrilha = (trilha: TrilhaId) =>
  TERMOS.filter((t) => t.trilha === trilha);

# Fontes Confiáveis — Mente Afiada

> Regra do projeto: **nenhuma pergunta entra no app sem uma fonte verificável.**
> Se não dá para apontar o parágrafo, a pergunta não existe.

Verificado em: 03/11/2026.

---

## 1. Regras anti-alucinação (valem para todo o conteúdo)

1. **Nada de memória.** Toda afirmação vem de um trecho lido de uma fonte listada aqui.
2. **Citação obrigatória.** Cada pergunta carrega `fonte` (título, instituição, URL, ano).
3. **Número é número.** Estatística, tamanho de efeito, ano e DOI são copiados exatamente
   como aparecem na fonte — nunca arredondados "de cabeça".
4. **Conflito é conteúdo.** Quando estudos discordam, a pergunta mostra a discordância.
   (Existe um caso real disso em hipnose e dor — ver seção 4.)
5. **Zero invenção de referência.** Nenhum autor, ano ou DOI é escrito sem conferência.
6. **Grau de confiança.** Cada item recebe `alta`, `media` ou `baixa`.
   Item `baixa` **não entra no jogo** até ser confirmado.
7. **Fonte primária vence.** Se o PDF do Dr. Rodrigo divergir de um site, vale o PDF —
   e a divergência é anotada.

### Formato de cada pergunta no banco

```json
{
  "id": "hip-001",
  "trilha": "hipnose-clinica",
  "pergunta": "Segundo a definição oficial da APA Division 30 (2014), hipnose é...",
  "opcoes": ["...", "...", "...", "..."],
  "correta": 1,
  "explicacao": "A definição foi publicada em 2014 e revisada em Elkins et al. (2015).",
  "fonte": {
    "titulo": "Definition and Description of Hypnosis",
    "instituicao": "APA Division 30",
    "url": "https://www.apadivisions.org/division-30/about",
    "ano": 2014
  },
  "confianca": "alta"
}
```

---

## 2. Fonte primária: seu próprio material

Estes são a **base de estudo pessoal** e têm prioridade sobre qualquer site.

| Arquivo | Onde está |
|---|---|
| Manual TRI (Terapia de Reintegração Implícita).pdf | `G:\Meu Drive\TerapiaTRI\` |
| Princípios da TRI - Linguagem e Terminologia TRI.pdf | `G:\Meu Drive\TerapiaTRI\` |
| Manual de Terapia De Reintegração Implícita 2025.docx | `G:\Meu Drive\TerapiaTRI\` |
| Apostila Definitiva TRI.pdf | `G:\Meu Drive\TerapiaTRI\` |
| TRI - Terapia de Reintegração Implícita.pdf | `G:\Meu Drive\TerapiaTRI\` |
| Relatos de Casos Clínicos (completo).pdf | `G:\Meu Drive\TerapiaTRI\` |
| Introdução a Terapia de Reintegração Implícita.pdf | `G:\Meu Drive\` |
| Principios da TRI.pdf | `G:\Outros computadores\...\Área de Trabalho\` |
| Glossário TRI.rtf (58 MB — provável tesouro de termos) | `G:\Outros computadores\...\Área de Trabalho\` |
| Apostila Rodrigo.docx | `G:\Outros computadores\...\Área de Trabalho\` |
| Apostila completa final rev2019.pdf | `G:\Outros computadores\...\Área de Trabalho\` |
| ScriptsHipnose.docx | `G:\Outros computadores\...\Área de Trabalho\` |
| Curso de auto regulação emocional.docx | `G:\Meu Drive\` |

> ⚠️ **Atenção de direitos:** *Como são criadas as emoções* (Lisa Feldman Barrett),
> *A voz na sua cabeça* (Ethan Kross) e o curso de hipnose clínica (Lucas Naves)
> são obras protegidas. Servem como **leitura e conferência**, não como texto copiado
> para dentro do app. Conceito e fato não têm dono; frase tem.

---

## 3. Neurociências e Neurofisiologia

### 3.1 NINDS / NIH — *Brain Basics* ✅ verificado ao vivo

- **Instituição:** National Institute of Neurological Disorders and Stroke (EUA)
- **URL:** https://www.ninds.nih.gov/health-information/public-education/brain-basics
- **Licença:** domínio público ("All NINDS-prepared information is in the public domain
  and may be freely copied. Credit to the NINDS")
- **Cobre:** anatomia geral do cérebro, neurônios e circuitos neurais, sono,
  AVC, genes e cérebro.
- **Páginas internas úteis:**
  - *Know Your Brain* — introdução ao cérebro para não especialistas
  - *Life and Death of a Neuron* — como o neurônio nasce, funciona e morre
  - *Understanding Sleep* — neurofisiologia do sono
- **Por que é confiável:** órgão do governo americano, revisado, sem interesse comercial.
- **Uso no app:** trilha Neurociências e Neurofisiologia, níveis básicos.

### 3.2 Noba Project — módulos de psicologia biológica ✅ verificado ao vivo

- **Instituição:** Diener Education Fund
- **URL:** https://nobaproject.com/browse-content
- **Licença:** CC BY-NC-SA 4.0
- **Módulos relevantes (título + autor, como aparecem no site):**
  - *The Brain* — Diane Beck e Evelina Tapia
  - *The Nervous System* — Aneeq Ahmad
  - *Neurons* — Sharon Furtak
  - *The Brain and Nervous System* — Robert Biswas-Diener
  - *Affective Neuroscience* — Eddie Harmon-Jones e Cindy Harmon-Jones
  - *Psychopharmacology* — Susan Barron
- **Por que é confiável:** escrito por professores universitários, revisado por pares,
  usado em universidades.
- **Uso no app:** trilha Neurociências, níveis intermediários.

### 3.3 OpenStax — *Anatomy and Physiology 2e* ✅ verificado

- **Instituição:** Rice University
- **URL:** https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction
- **Licença:** CC BY-NC-SA 4.0
- **Capítulos relevantes:** 12 (tecido nervoso), 13 (anatomia do SN),
  14 (sistema somático), 15 (autônomo), 16 (exame neurológico).
- **Uso:** **apenas como conferência factual.** Não copiamos o texto — escrevemos
  perguntas originais em português e citamos a seção como referência.
  (A própria OpenStax pede autorização para incorporar o conteúdo em modelos de IA;
  por isso o uso é de verificação, não de reprodução.)

### 3.4 Revista Neurociências (UNIFESP) ✅ verificado

- **Instituição:** Universidade Federal de São Paulo
- **URL:** https://periodicos.unifesp.br/index.php/neurociencias
- **Licença:** CC BY 4.0
- **Artigos confirmados:**
  - *Doença de Parkinson: uma perspectiva neurofisiológica* (2021)
    DOI 10.34024/rnc.2021.v29.12669
  - *Fisiologia do envelhecimento: da plasticidade às consequências cognitivas* (2021)
    DOI 10.34024/rnc.2021.v29.12447
- **Por que é confiável:** periódico universitário brasileiro, revisão por pares,
  acesso aberto, texto em português.
- **Uso no app:** trilha Neurofisiologia, níveis avançados, em PT-BR.

### 3.5 SciELO / PePSIC — artigos brasileiros revisados por pares ⚠️ parcial

- **URL:** https://www.scielo.br · https://pepsic.bvsalud.org
- **Licença:** varia por artigo (muitos CC BY)
- **Confirmados pela busca:**
  - *A Pesquisa em Neuropsicologia: Desenvolvimento Histórico, Questões Teóricas
    e Metodológicas* — Simone Cagnin (2010)
  - *Aspectos da relação cérebro-comportamento* — Rodrigues & Ciasca (2010)
  - *Neurociência e aprendizagem* — Raquel Lima Silva Costa (2023),
    DOI 10.1590/S1413-24782023280010
- **Ressalva:** a busca retornou o conteúdo, mas o acesso direto pelo meu navegador
  deu timeout no momento da checagem. Os artigos existem; a estabilidade do servidor
  é que oscila. **Antes de virar pergunta, cada artigo é aberto e lido.**

---

## 4. Hipnose Clínica

Esta é a trilha com **maior risco de pseudociência**. A regra aqui é dura:
só entra o que tem definição oficial ou revisão sistemática.

### 4.1 APA Division 30 — definição oficial ✅ verificado ao vivo (texto exato)

- **Instituição:** American Psychological Association, Society of Psychological Hypnosis
- **URL:** https://www.apadivisions.org/division-30/about
- **Licença:** conteúdo institucional; citação curta com atribuição
- **Texto oficial (2014), copiado literalmente:**
  - **Hipnose:** "A state of consciousness involving focused attention and reduced
    peripheral awareness characterized by an enhanced capacity for response to suggestion."
  - **Indução hipnótica:** "A procedure designed to induce hypnosis."
  - **Hipnotizabilidade:** "An individual's ability to experience suggested alterations
    in physiology, sensations, emotions, thoughts or behavior during hypnosis."
  - **Hipnoterapia:** "The use of hypnosis in the treatment of a medical or
    psychological disorder or concern."
- **Publicação de referência:** Elkins, Barabasz, Council & Spiegel (2015),
  *International Journal of Clinical and Experimental Hypnosis*, 63(1), 1–9.
- **Uso no app:** nível 1 da trilha Hipnose — a base de tudo.
- **Bônus:** a mesma página derruba 4 mitos clássicos (hipnose não é "domínio da mente",
  não é sono, ninguém fica preso no transe, pessoa sugestionável ≠ crédula).

### 4.2 APA Dictionary of Psychology ✅ verificado

- **URL:** https://dictionary.apa.org/hypnosis
- **Uso:** definições curtas de termos (hipnoterapia, sugestão pós-hipnótica,
  auto-hipnose, heterohipnose, estado alterado de consciência).

### 4.3 Revisões sistemáticas e meta-análises (PubMed) ✅ verificado

Aqui está o ponto mais importante do projeto: **as meta-análises discordam entre si.**
Um app honesto mostra isso em vez de escolher a versão mais bonita.

| Estudo | Revista / ano | PMID | Conclusão declarada |
|---|---|---|---|
| Milling et al. | Int J Clin Exp Hypn, 2021 | 34038322 | Efeito médio (d ≈ 0,60) na dor clínica |
| Thompson et al. | Neurosci Biobehav Rev, 2019 | 30790634 | Analgesia em dor experimental (g = 0,54–0,76) |
| Langlois et al. | Neurosci Biobehav Rev, 2022 | 35192910 | Redução moderada em dor musculoesquelética/neuropática (g ≈ −0,42) |
| Jones et al. | Pain Reports, 2024 | 39263007 | Efeito adicional **pequeno** como adjuvante; certeza da evidência **muito baixa** |
| Yerzhan et al. | J Clin Med, 2025 | 40649035 | Reduz dor **aguda**; **não** reduziu dor crônica (g = 0,07, p = 0,518) |
| Yim & Derbyshire | Eur J Pain, 2026 | 42682265 | Reduções **modestas**, sem superioridade clara sobre TCC/relaxamento |

- **Como usar:** perguntas do tipo *"O que a evidência atual mostra sobre X?"*
  com a resposta referenciada ao estudo e ano. E níveis de "controvérsia",
  onde a resposta certa é reconhecer que os estudos divergem.
- **Uso no app:** trilha Hipnose, níveis avançados.

### 4.4 Cochrane Library ✅ verificado

- **Revisão:** *Complementary and alternative therapies for pain management in labour*
- **Autores:** Smith CA, Collins CT, Cyna AM, Crowther CA
- **Referência:** Cochrane Database of Systematic Reviews 2006, Issue 4, Art. No. CD003521
- **Achado citado:** mulheres que aprenderam auto-hipnose tiveram menor necessidade
  de analgesia farmacológica (RR 0,53; IC 95% 0,36–0,79; 5 ensaios, 749 mulheres).
- **Uso no app:** nível de hipnose e dor no parto.

### 4.5 BrJP — Brazilian Journal of Pain ✅ verificado via busca

- **Artigo:** *Eficácia da hipnose no manejo da dor não procedimental: revisão sistemática*
- **Referência:** BrJP 4(3), jul–set 2021, DOI 10.5935/2595-0118.20210045
- **Licença:** acesso aberto
- **Por que importa:** é a ponte em português entre a evidência internacional e a
  prática brasileira. Menciona o uso de hipnose no Hospital das Clínicas da FMUSP
  desde 1995.
- **Ressalva:** acesso direto deu timeout na checagem; conteúdo confirmado pela busca.

### 4.6 SciELO — hipnose em português ✅ verificado via busca

- *Fenomenologia, Hipnose e Dor Crônica: Passos para Uma Compreensão Clínica* —
  Mauricio da Silva Neubern (2014), Estud. pesqui. psicol. 14(1)
- *Aplicações atuais da hipnose clínica na América Latina: uma revisão sistemática* —
  Castañeda & Krikorian (2018), DOI 10.12804/revistas.urosario.edu.co/apl/a.5488
- *Hipnose, imobilidade tônica e eletroencefalograma* — Cortez & Silva, J Bras Psiquiatr
- **Uso no app:** contextualização brasileira e latino-americana.

### 4.7 ⚠️ Ponto em aberto (não virou pergunta ainda)

Há menção, na literatura brasileira, de que a hipnose teria sido incluída nas
Práticas Integrativas e Complementares (PICS) do SUS. **Isso ainda não foi conferido
em fonte oficial.** Antes de virar pergunta no app, precisa ser confirmado em
portaria do Ministério da Saúde. Marcado como `confianca: baixa` até lá.

---

## 5. Comportamento Humano

### 5.1 OpenStax — *Psychology 2e* ✅ verificado

- **URL:** https://openstax.org/books/psychology-2e/pages/1-introduction
- **Licença:** CC BY-NC-SA 4.0
- **Capítulos relevantes:**
  - 3 — Biopsychology
  - 4 — States of Consciousness
  - 6 — Learning (condicionamento clássico, operante, observacional)
  - 8 — Memory (codificação, armazenamento, recuperação)
  - 10 — Motivation and Emotion
  - 11 — Personality
  - 14 — Stress, Lifestyle, and Health
  - 15 — Psychological Disorders
  - 16 — Therapy and Treatment
- **Uso:** conferência factual; perguntas originais em português.

### 5.2 Noba — módulos de comportamento ✅ verificado ao vivo

- **Módulos relevantes:**
  - *Conditioning and Learning* — Mark E. Bouton
  - *Memory (Encoding, Storage, Retrieval)* — Kathleen B. McDermott e Henry L. Roediger III
  - *Forgetting and Amnesia* — Nicole Dudukovic e Brice Kuhl
  - *Judgment and Decision Making* — Max H. Bazerman
  - *Self-Regulation and Conscientiousness* — Roy F. Baumeister
  - *Emotional Intelligence* — Brackett, Delaney e Salovey
  - *Therapeutic Orientations* — Boettcher, Hofmann e Wu
  - *Social Cognition and Attitudes* — Hess e Pickett
  - *Persuasion: So Easily Fooled* — Robert V. Levine
- **Uso no app:** trilha Comportamento Humano, do básico ao avançado.

---

## 6. O que eu deliberadamente NÃO vou usar

| Tipo de fonte | Por quê |
|---|---|
| Sites de autoajuda, blogs de "coach", Instagram, YouTube sem fonte | Sem revisão, alto risco de erro |
| Conteúdo de "hipnose quântica", "leis universais", "neurociência do sucesso" | Pseudociência com vocabulário científico |
| Wikipedia (direto) | Serve como mapa para achar a fonte real, nunca como fonte final |
| Resumos de IA de terceiros | Não são verificáveis por definição |
| Livros didáticos pagos (Guyton, Kandel) | Não posso citar o trecho sem acesso; se você tiver o PDF, aí sim |
| Textos de obras protegidas (Feldman Barrett, Kross, Naves) | Conceito pode, frase não |

---

## 7. Como isso vira pergunta

```
Fonte confiável
   ↓
Trecho lido e citado (seção + URL)
   ↓
Conceito isolado → 1 termo para o caça-palavras
   ↓
Micro-aula de 2 linhas (escrita original)
   ↓
4 alternativas (3 distratores do mesmo campo semântico)
   ↓
confianca = alta?  →  entra no app
confianca = baixa? →  vai para "pendências" e não entra
```

---

## 8. Próximo passo

1. Copiar os PDFs de `G:\Meu Drive\TerapiaTRI` para o projeto e extrair o texto.
2. Abrir o *Glossário TRI* (58 MB) — provável mina de termos técnicos.
3. Montar a planilha de revisão: termo · definição · fonte · confiança.
4. Só então gerar as perguntas com citação.

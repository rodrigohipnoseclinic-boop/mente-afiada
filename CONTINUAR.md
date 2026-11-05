# CONTINUAR — Mente Afiada

> Documento de passagem de bastão. Se você é outro assistente (Claude, etc.) ou o
> Rodrigo voltando dias depois: **leia este arquivo inteiro antes de escrever código.**
>
> Última atualização: **04/11/2026**> Pasta do projeto: `C:\Users\Admin\Documents\MenteAfiada`

---

## 1. O que é o projeto

**Mente Afiada** é um PWA de memorização clínica, em português, inspirado no modelo de caça-palavras com cruzadinha, adaptado com conteúdo TRI e psicológico.
Cada nível é um **desafio de letras embaralhadas** com objetivo de formar palavras técnicas da TRI (Terapia de Reintegração Implícita) e termos de psicologia. Tem níveis progressivos de dificuldade, recompensa em XP e colecionamento de masteries, ofensiva diária e estatísticas detalhadas.

O conteúdo vem de dois lugares:

1. **Material próprio** do Rodrigo (Terapia de Reintegração Implícita, hipnose
   clínica, neurociências) — já extraído.
2. **Fontes abertas verificadas** na internet — catalogadas em
   `conteudo/FONTES-CONFIAVEIS.md`.

**Regra absoluta do projeto:** nenhuma pergunta entra no app sem fonte verificável.
Item com confiança baixa não entra.

---

## 2. Decisões travadas (não reabrir sem pedir)

| Item | Decisão |
|---|---|
| Nome | Mente Afiada |
| Plataforma | PWA instalável (não é app de loja) |
| Funcionamento | 100% offline, sem login, sem custo mensal |
| Idioma | Português (Brasil) |
| Público | Uso pessoal do Rodrigo |
| Visual | Claro e moderno, estilo Duolingo |
| Mecânica | Caça-palavras + quiz alternados **no mesmo nível** |
| Nível | 1 caça-palavras + 3 perguntas (~2 min) |
| Vidas | **Sem vidas.** Jogo livre |
| Erro | Sem punição: acende a resposta certa + micro-aula, e deixa tentar de novo |
| Streak | 1 nível concluído por dia mantém a ofensiva |
| Dificuldade | Grade 6x6 → 10x10 conforme sobe de nível |
| Extras v1 | Micro-aula, estatísticas, backup do progresso, lembrete diário |
| Escopo | 300+ níveis desde o começo |
| Trilhas | Neurociências · Neurofisiologia · Hipnose Clínica · Comportamento Humano |

Especificação detalhada (telas, regras, arquitetura, critérios de pronto):
**`ESPECIFICACAO.md`** — na raiz do projeto.

---

## 3. Estado atual — o que está pronto e o que NÃO está

### ✅ Pronto

- Definição do produto fechada (duas rodadas de perguntas com o Rodrigo).
- Especificação escrita (`ESPECIFICACAO.md`).
- **Extração de conteúdo concluída:** 564.713 palavras de texto limpo,
  em 15 arquivos, dentro de `conteudo/extraido/`.
- Fontes da internet verificadas e catalogadas (`conteudo/FONTES-CONFIAVEIS.md`).
- Material original copiado do Google Drive para dentro do projeto (18 arquivos, ~105 MB).
- Scripts de extração funcionando e reexecutáveis.
- **Primeiro app funcional implementado** (Vite + React + TypeScript + PWA):
  - telas de início, trilhas, caça-palavras, quiz, resultado, conquistas,
    estatísticas e ajustes;
  - gerador de caça-palavras determinístico;
  - 112 termos e 52 perguntas curadas (incluindo TRI a partir dos materiais próprios); +15 termos e 13 perguntas sobre **Teoria do Apego (John Bowlby)**;
  - progresso em `localStorage`;
  - ícones PWA criados em `public/`;
  - `npm.cmd run build` passa;
  - teste no navegador (preview) sem erros de console no carregamento inicial;
  - **Escolha de modo**: Jogo clássico, Modo Milhão ou **Treino variado**;
  - **Modo Milhão**: 10 perguntas em dificuldade crescente, 50/50,
    plateia ilustrativa e pular; escada fictícia; XP sem avançar o nível
    principal nem a ofensiva; duas tentativas por pergunta;
  - **Quiz clássico e Modo Milhão**: duas tentativas antes de revelar a
    resposta; a primeira tentativa correta conta como acerto de primeira;
  - **Treino variado**: associação de pares, completar lacunas, mito ou
    verdade e ordenação de etapas, em uma sessão curta; fontes da TRI e do
    material próprio aparecem em cada cartão;
  - **Anti-repetição**: perguntas clássicas avançam pelo banco por faixa de
    dificuldade, e o Modo Milhão usa todo o banco (inclui o lote TRI); níveis
    subsequentes evitam usar os mesmos termos e perguntas dos últimos 20 níveis
    jogados (via `perguntasVistas` no `localStorage`); se o banco se esgotar, o
    app avisa sem quebrar. **Sistema de Mastery**: cada pergunta tem um nível de
    domínio (0 a 3) no `localStorage`. Master 0-1 reaparecem com frequência
    para reforço; master 3 aparece esporadicamente, otimizando a fixação do
    conteúdo ao longo do tempo.
  - **Perguntas sortidas**: perguntas são sorteadas do banco completo (todas as
    trilhas), sem restrição de tema. O jogador não precisa escolher uma trilha;
    as perguntas são sorteadas aleatoriamente de todas as 400+ perguntas
    disponíveis, proporcionando maior variedade e desafio.
  - **Primeiro lote TRI**: 40 termos e 20 perguntas inéditas, distribuídos
    entre as quatro trilhas, com fonte local dos materiais TRI.

### ❌ Não concluído / não validado

- **Ainda não atingimos a meta de 50% TRI.** Com o primeiro lote, o banco
  ficou em **112 termos / 52 perguntas**. Com o lote Bowlby (+15 termos e +13 perguntas),
  o total é **127 termos / 65 perguntas**. A parcela TRI é aproximadamente
  **45% dos termos e 42% das perguntas**; falta um segundo lote para chegar
- • Mecânica de Jogo: Conecte letras em círculos para formar palavras válidas e preencher o formato de palavras cruzadas.
- • Níveis: Mais de 900 fases offline que aumentam de dificuldade progressivamente.
  a 50% de forma consistente.
- Conteúdo ainda insuficiente para 300+ níveis.
- O app ainda não foi testado em celular real nem como PWA instalado.
- A partida completa do Modo Milhão e o **Treino variado** não foram jogados
  de ponta a ponta no navegador; o build de produção passa, mas a experiência
  no celular ainda precisa de validação.

---

## 4. Mapa de arquivos

```
C:\Users\Admin\Documents\MenteAfiada\
├─ ESPECIFICACAO.md              ← o produto (telas, regras, arquitetura)
├─ CONTINUAR.md                  ← este arquivo
├─ package.json                  ← deps: pdf-parse, mammoth, React, Vite
├─ vite.config.ts                ← build + PWA
├─ index.html                    ← entrada do app
├─ public\                       ← ícones do PWA
├─ src\                          ← app (componentes, dados e lógica do jogo)
├─ node_modules\
├─ scripts\
│  ├─ sonda-conteudo.mjs         ← diagnostica se PDF é texto ou escaneado
│  ├─ extrair-tudo.mjs           ← extrai PDF/DOCX/RTF → conteudo/extraido/*.txt
│  ├─ rtf-limpar.mjs             ← parser RTF robusto (ver seção 6)
│  └─ sonda-resultado.json       ← saída do diagnóstico
└─ conteudo\
   ├─ FONTES-CONFIAVEIS.md       ← bibliografia verificada + regras anti-alucinação
   ├─ LEIA-ME.txt
   ├─ terapiatri\                ← 11 arquivos originais do Drive
   ├─ materiais-extra\           ← 7 arquivos (glossário, apostilas, hipnose)
   └─ extraido\                  ← 15 .txt prontos para uso + _indice.json
```

---

## 5. Ambiente desta máquina (importante)

| Item | Situação |
|---|---|
| Node | v26.13.0 ✅ |
| npm | 11.20.0 — **PowerShell bloqueia `npm` por Execution Policy** |
| Como rodar npm | Use `npm.cmd` (ex.: `npm.cmd install`) ou `cmd /c "npm ..."` |
| Python | ❌ não instalado |
| Microsoft Word (COM) | ❌ não registrado (WPS Office presente, mas sem COM) |
| Google Drive | montado em **`G:`** (DriveFS) |
| Shell | PowerShell no Windows. Evite `&&`; use `;` |

---

## 6. Conteúdo extraído — inventário real

Local: `conteudo/extraido/`

| Arquivo .txt | Palavras | Serve para |
|---|---|---|
| `como-sao-criadas-as-emocoes-lisa-feldman-pdf.txt` | 185.060 | Comportamento humano, emoções, teoria da emoção construída |
| `a-voz-na-sua-cabeca-ethan-kross-2-pdf.txt` | 69.987 | Diálogo interno, comportamento |
| `apostila-definitiva-tri-pdf.txt` | 53.181 | **Núcleo da TRI** |
| `scriptshipnose-docx.txt` | 47.026 | Hipnose clínica — scripts por tema |
| `relatos-de-casos-clinicos-completo-1-pdf.txt` | 40.789 | Casos clínicos TRI |
| `apostila-completa-final-rev20192-pdf.txt` | 38.709 | Curso de hipnose (Academia da Hipnose) |
| `tri-terapia-de-reintegracao-implicita-pdf.txt` | 30.464 | Fundamentos da TRI |
| `pdfcoffee-com-curso-de-hipnose-clinica-lucas-naves...txt` | 29.316 | Hipnose clínica |
| `glossario-tri.txt` | 22.659 | **Glossário TRI — termo + definição prontos** |
| `apostila-rodrigo-docx.txt` | 14.535 | Cérebro social |
| `principios-da-tri-pdf.txt` | 12.919 | Os Dez Princípios TRI |
| `introducao-a-terapia-de-reintegracao-implicita-pdf.txt` | 11.842 | Introdução |
| `manual-de-terapia-de-reintegracao-implicita-2025-docx.txt` | 4.555 | Manual resumido |
| `manual-tri-terapia-de-reintegracao-implicita-pdf.txt` | 3.664 | Manual curto |
| `principios-da-tri-linguagem-e-terminologia-tri-pdf.txt` | 7 | ⚠️ **PDF escaneado — inútil. Precisa de OCR** |

**Total real: 564.713 palavras.**

### O arquivo de ouro

`glossario-tri.txt` tem **22.659 palavras em formato termo → definição**.
É a mina mais direta para gerar os níveis da trilha TRI. Comece por ele.

Exemplo real do arquivo:

```
Acoplamento
Na TRI o termo "acoplamento" faz referência à interação do sistema nervoso
do indivíduo e o sistema ou ambiente que o cerca. Essa ideia é essencial na
TRI, fundamentada na hipótese do ~ cérebro social ~ ...
```

> Nota: o glossário usa `~` como marcação de itálico do RTF. A versão limpa
> está em `conteudo/extraido/glossario-tri-limpo.txt`; a original foi preservada
> para conferência.

### Como reextrair tudo

```powershell
cd C:\Users\Admin\Documents\MenteAfiada
node scripts/extrair-tudo.mjs
node scripts/rtf-limpar.mjs "conteudo\materiais-extra\Glossario tri.rtf" "conteudo\extraido\glossario-tri.txt"
```

**Cuidado:** `extrair-tudo.mjs` usa um `desRtf` simples que **quebra o glossário**
(gera 59 MB de lixo). O glossário deve ser processado **sempre** com
`rtf-limpar.mjs`. Se for unificar, copie a lógica de `rtf-limpar.mjs` para lá.

### Bug do parser RTF (já corrigido — não reintroduza)

Grupos aninhados como `{\*\panose ...}` dentro de `{\fonttbl ...}` resetavam o
alvo de "ignorar" e a tabela de fontes vazava para o texto. A correção:

```js
// Só define o alvo se ainda NÃO estamos ignorando
if (!ignorando && (palavra.startsWith("*") || DESTINOS.has(palavra.toLowerCase()))) {
  ignorando = true;
  ignorarAte = profundidade;
}
```

O arquivo de 61 MB tem **45 imagens embutidas (`\pict`)** — é por isso que é
grande; o texto real é pequeno.

---

## 7. Fontes da internet — resumo

Detalhe completo em **`conteudo/FONTES-CONFIAVEIS.md`**. Verificadas ao vivo:

| Fonte | Licença | Uso |
|---|---|---|
| NINDS / NIH — Brain Basics | domínio público | Neurociências, neurofisiologia |
| APA Division 30 — definição de hipnose | citação com atribuição | Base da trilha Hipnose |
| Noba Project (105 módulos) | CC BY-NC-SA | Neurociências, comportamento |
| OpenStax A&P 2e + Psychology 2e | CC BY-NC-SA | **Só conferência factual**, não copiar |
| Revista Neurociências (UNIFESP) | CC BY 4.0 | Neurofisiologia em PT-BR |
| SciELO / PePSIC | varia | Artigos brasileiros |
| PubMed (6 meta-análises de hipnose) | fatos/abstract | Trilha Hipnose avançada |
| Cochrane CD003521 | revisão | Hipnose e dor no parto |

### Dois pontos de honestidade que o app deve respeitar

1. **As meta-análises de hipnose se contradizem.** Milling (2021) acha efeito
   médio; Yerzhan (2025) diz que **não** reduz dor crônica (g = 0,07; p = 0,518);
   Jones (2024) diz que a certeza da evidência é muito baixa. O app deve **ensinar
   a controvérsia**, com um tipo de nível "o que a evidência diz hoje".
2. **Pendência marcada:** a suposta inclusão da hipnose nas PICS do SUS aparece
   na literatura brasileira, mas **não foi confirmada em portaria oficial**.
   Está com `confianca: baixa` e **não pode virar pergunta** até conferência no
   site do Ministério da Saúde.

### Direitos autorais

*Como são criadas as emoções* (Feldman Barrett), *A voz na sua cabeça* (Kross) e
o curso de hipnose clínica (Lucas Naves) são obras protegidas. Servem como
**leitura e conferência**, nunca como texto copiado para dentro do app.
Conceito e fato não têm dono; frase tem.

---

## 8. Próximos passos, em ordem

### Sprint 1 — Motor do jogo (implementado, falta validação)

1. Vite + React + TypeScript configurados.
2. Tailwind **não** foi usado; estilos estão em `src/styles.css`.
   PWA configurado com `vite-plugin-pwa`.
3. Gerador de caça-palavras determinístico implementado (`src/jogo/gerador-grade.ts`),
   8 direções, grade 6×6 → 10×10.
4. Tela de jogo implementada com pointer events (arrastar).
5. Quiz com 4 alternativas + micro-aula/explicação ao errar.
6. XP, streak, conquistas e `localStorage` implementados.
7. Build de produção passa; preview testado no navegador sem erros de console.
8. **Modo Milhão implementado:** escolha entre Jogo clássico e Milhão, 10 perguntas
   em dificuldade crescente, escada fictícia de prêmios, ajudas 50/50, plateia e pular,
   e registro de XP sem avançar a ofensiva. Build de produção passa.

**Falta:** testar no celular pela rede local e instalar como PWA; ampliar o
banco de termos para que os níveis iniciais tenham 4 palavras.

### Sprint 2 — Pipeline de conteúdo

**Já feito (04/11/2026):** primeiro lote TRI com 40 termos e 20 perguntas
originais, distribuído nas quatro trilhas, com fontes locais dos materiais
próprios. O banco total agora está em **162 termos / 96 perguntas** (incluindo o
lote Bowlby de +15 termos e +13 perguntas e o lote TRI2 de +35 termos e +31 perguntas).

**Próximo:** segundo lote TRI para atingir a meta de 50% do conteúdo.

1. Limpar o `~` do glossário. ✅ Feito em 04/11/2026 (`glossario-tri-limpo.txt`).
2. Extrair pares **termo → definição** do `glossario-tri.txt` para o banco TypeScript.
3. Gerar mais perguntas TRI, sempre com `fonte` preenchida.
4. Conferir que cada nível tem solução válida.
5. Ampliar o banco de termos curtos para as fases 6×6.

**Critério de pronto:** 300 níveis válidos, nenhum sem solução no caça-palavras.

### Sprint 3 — Polimento

Estatísticas, backup export/import, lembrete diário, modo escuro, ícone e
manifest, teste de instalação na tela inicial.

---

## 9. Formato de dados combinado

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

`confianca` aceita `alta` | `media` | `baixa`. **`baixa` não entra no jogo.**

---

## 10. Pendências e riscos

| # | Pendência | Impacto |
|---|---|---|
| 1 | Meta de 50% TRI ainda não atingida (162 termos / 96 perguntas; TRI ~ 45% dos termos e ~ 42% das perguntas, + Bowlby + TRI2) | Alto — lote seguinte deve focar TRI |
| 2 | Níveis 6×6 nas primeiras fases só têm 2 palavras disponíveis | Médio — amplia o banco de termos curtos |
| 3 | PDF "Princípios da TRI — Linguagem e Terminologia" é escaneado | Baixo — é 1 página; dá para digitar à mão |
| 4 | `~` de itálico no glossário | ✅ Resolvido — versão limpa gerada, original preservado |
| 5 | Hipnose nas PICS do SUS não confirmada | Médio — não pode virar pergunta |
| 6 | Alterações recentes foram commitadas em 04/11/2026; revisar antes de publicar | Médio |
| 7 | App ainda não testado em celular real/PWA instalado | Médio — critério de pronto do Sprint 1 |
| 8 | Licença do OpenStax pede autorização para uso em IA | Baixo — usamos só como conferência |
| 9 | Textos extraídos foram desrastreados e ignorados; o histórico antigo ainda os contém | Alto antes de publicar/compartilhar — não fazer push sem revisar o histórico |

---

## 11. Prompt sugerido para retomar

> Estou retomando o projeto **Mente Afiada** em
> `C:\Users\Admin\Documents\MenteAfiada`.
> Leia `CONTINUAR.md`, `ESPECIFICACAO.md` e `conteudo/FONTES-CONFIAVEIS.md`.
> O conteúdo já foi extraído para `conteudo/extraido/` (564 mil palavras).
> O app já funciona (Jogo clássico e Modo Milhão); o próximo passo é
> ampliar o conteúdo TRI até a meta de 50% e testar no celular como PWA.
> Atenção: no PowerShell use `npm.cmd`, não `npm`.

---

## 12. Comandos úteis

```powershell
cd C:\Users\Admin\Documents\MenteAfiada

# diagnóstico dos PDFs
node scripts/sonda-conteudo.mjs

# reextrair conteúdo
node scripts/extrair-tudo.mjs

# glossário (sempre por este script)
node scripts/rtf-limpar.mjs "conteudo\materiais-extra\Glossario tri.rtf" "conteudo\extraido\glossario-tri.txt"

# build de produção
npm.cmd run build

# preview do build
npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort

# estado do git
git status
```

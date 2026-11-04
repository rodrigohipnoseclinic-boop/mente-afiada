# CONTINUAR — Mente Afiada

> Documento de passagem de bastão. Se você é outro assistente (Claude, etc.) ou o
> Rodrigo voltando dias depois: **leia este arquivo inteiro antes de escrever código.**
>
> Última atualização: **04/11/2026**
> Pasta do projeto: `C:\Users\Admin\Documents\MenteAfiada`

---

## 1. O que é o projeto

**Mente Afiada** é um PWA de memorização clínica, em português, inspirado no
*Bible Word Puzzle* (Oak). Cada nível é um **caça-palavras de termos técnicos**
seguido de **3 perguntas** sobre o mesmo tema. Tem níveis infinitos, ofensiva
diária, conquistas e estatísticas.

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
- `git init` feito. **Nenhum commit ainda.**

### ❌ Não começou

- **Nenhuma linha do app foi escrita.** Não existe Vite, React, Tailwind, PWA,
  nem tela nenhuma. Só a especificação.
- Nenhuma pergunta foi gerada.
- Nenhum termo foi curado no formato do banco.
- Nenhum nível existe.

---

## 4. Mapa de arquivos

```
C:\Users\Admin\Documents\MenteAfiada\
├─ ESPECIFICACAO.md              ← o produto (telas, regras, arquitetura)
├─ CONTINUAR.md                  ← este arquivo
├─ package.json                  ← deps: pdf-parse, mammoth
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

> Nota: o glossário usa `~` como marcação de itálico do RTF. Limpar isso
> (`~ texto ~` → `texto`) é uma tarefa pequena e pendente.

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

### Sprint 1 — Motor do jogo (não depende de conteúdo novo)

1. `npm.cmd create vite@latest . -- --template react-ts` (na pasta do projeto)
2. Tailwind CSS + `vite-plugin-pwa`
3. Gerador de caça-palavras determinístico (`src/jogo/gerador-grade.ts`)
   - semente = número do nível → mesmo nível sempre
   - 8 direções, grade 6x6 → 10x10
   - função pura, testável em Node
4. Tela de jogo: arrastar o dedo (pointer events, não mouse only), validação
   ao soltar, destaque das letras
5. Quiz com 4 alternativas + micro-aula ao errar
6. XP, streak, conquistas, `localStorage`
7. Rodar com `npm.cmd run dev` e testar no celular pela rede local

**Critério de pronto:** jogar 3 níveis seguidos no celular sem travar, offline
depois da primeira carga.

### Sprint 2 — Pipeline de conteúdo

1. Limpar o `~` do glossário.
2. Extrair pares **termo → definição** do `glossario-tri.txt` para
   `src/dados/palavras.json`.
3. Gerar as micro-aulas a partir das definições (2–3 linhas, originais).
4. Gerar 4–6 perguntas por termo, sempre com `fonte` preenchida.
5. Montar a planilha de revisão para o Rodrigo aprovar/descartar.
6. Compilar para `src/dados/perguntas.json`.

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
| 1 | App não começou | Alto — é o entregável principal |
| 2 | PDF "Princípios da TRI — Linguagem e Terminologia" é escaneado | Baixo — é 1 página; dá para digitar à mão |
| 3 | `~` de itálico no glossário | Baixo — limpeza simples |
| 4 | Hipnose nas PICS do SUS não confirmada | Médio — não pode virar pergunta |
| 5 | Nenhum commit no git | Médio — risco de perder trabalho |
| 6 | Licença do OpenStax pede autorização para uso em IA | Baixo — usamos só como conferência |
| 7 | 300 níveis exigem ~1.500 termos e ~900 perguntas curadas | Alto — é o maior esforço do projeto |

---

## 11. Prompt sugerido para retomar

> Estou retomando o projeto **Mente Afiada** em
> `C:\Users\Admin\Documents\MenteAfiada`.
> Leia `CONTINUAR.md`, `ESPECIFICACAO.md` e `conteudo/FONTES-CONFIAVEIS.md`.
> O conteúdo já foi extraído para `conteudo/extraido/` (564 mil palavras).
> O app ainda não começou. Quero seguir pelo **Sprint 1** do CONTINUAR.md:
> montar o motor do jogo com Vite + React + TypeScript + Tailwind + PWA,
> começando pelo gerador de caça-palavras determinístico.
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

# estado do git
git status
```

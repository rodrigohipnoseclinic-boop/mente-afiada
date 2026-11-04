# Mente Afiada — Especificação do Produto

> Jogo de memorização clínica estilo *Bible Word Puzzle* (Oak), construído a partir
> dos materiais da pasta **terapiaTRI + neurociências, neurofisiologia, hipnose clínica e comportamento humano**.

---

## 1. Resumo em uma frase

Um PWA offline, em português, com visual claro e moderno, onde cada nível é um
**caça-palavras de termos técnicos** seguido de **3 perguntas** sobre o mesmo tema —
com níveis infinitos, ofensiva diária, conquistas e estatísticas, para manter o
conhecimento clínico sempre afiado.

---

## 2. Decisões travadas

| Item | Decisão |
|---|---|
| Nome | **Mente Afiada** |
| Plataforma | **PWA instalável** (abre no navegador, instala na tela inicial) |
| Funcionamento | **100% offline**, zero custo mensal, sem login |
| Idioma | **Português (Brasil)** |
| Público | **Uso pessoal** (um único usuário) |
| Visual | **Claro e moderno, estilo Duolingo** |
| Mecânica | **Caça-palavras + quiz alternados no mesmo nível** |
| Estrutura do nível | **1 caça-palavras + 3 perguntas** (~2 min) |
| Vidas | **Sem vidas** — jogo livre |
| Erro | **Sem punição**: mostra a explicação e permite tentar de novo |
| Streak | **1 nível concluído por dia** mantém a ofensiva |
| Dificuldade | **Grade 6x6 → 10x10** conforme sobe de nível |
| Extras na v1 | Micro-aula ao acertar, estatísticas, backup do progresso, lembrete diário |
| Escopo inicial | **300+ níveis** desde o começo |
| Local | `C:\Users\Admin\Documents\MenteAfiada` (projeto novo, separado da Central de Agendamentos) |

---

## 3. Os quatro pilares de conteúdo

Os níveis são organizados em quatro trilhas, cada uma com sub-temas:

1. **Neurociências** — neurônios, sinapses, neurotransmissores, plasticidade, sistemas.
2. **Neurofisiologia** — potencial de ação, bomba de sódio-potássio, mielina, reflexos.
3. **Hipnose Clínica** — transe, indução, sugestão, estados alterados, aplicações.
4. **Comportamento Humano** — condicionamento, reforço, vieses, emoções, hábitos.

Cada sub-tema gera uma família de níveis (ex.: *Neurotransmissores I, II, III…*).

---

## 4. Anatomia de um nível

```
NÍVEL 42 — "Neurotransmissores II"          [trilha: Neurociências]
┌─────────────────────────────────────────┐
│  1. CAÇA-PALAVRAS  (grade 8x8)          │
│     Encontre 5 termos:                   │
│     DOPAMINA · SEROTONINA · GABA ·       │
│     GLUTAMATO · ACETILCOLINA             │
│     [arrastar o dedo ligando as letras]  │
├─────────────────────────────────────────┤
│  2. PERGUNTA 1 de 3                      │
│     Qual neurotransmissor está ligado    │
│     ao sistema de recompensa?            │
│     ○ GABA  ○ Dopamina  ○ Glutamato  ○ … │
│     → se errar: cartão de micro-aula     │
├─────────────────────────────────────────┤
│  3. PERGUNTA 2 de 3                      │
│  4. PERGUNTA 3 de 3                      │
├─────────────────────────────────────────┤
│  RESULTADO: +120 XP · streak +1          │
│  Conquista desbloqueada: "Sinapse Mestre"│
└─────────────────────────────────────────┘
```

### Regras do caça-palavras
- Grade quadrada, **6x6 no início → 10x10 nos níveis altos**.
- Palavras em 8 direções (horizontal, vertical, diagonal, e invertidas a partir do nível 5).
- Arrastar o dedo sobre as letras; ao soltar, valida.
- Acerto: letras ficam destacadas com animação e som sutil.
- Erro no caça-palavras: **não penaliza**, só não marca a palavra.
- Botão de dica: revela a primeira letra de uma palavra (custa XP, nunca bloqueia).

### Regras do quiz
- 3 perguntas de múltipla escolha, 4 alternativas.
- Ao errar: alternativa fica vermelha, a correta acende em verde e aparece o
  **cartão de micro-aula** (2 a 3 linhas explicando o conceito).
- A pergunta volta no fim do nível se foi errada (reforço imediato).
- Distratores sempre plausíveis e do mesmo campo semântico.

---

## 5. Progressão

### XP e nível de jogador
- Caça-palavras concluído: **+40 XP** (+10 por palavra rara).
- Pergunta certa de primeira: **+30 XP**; acertou depois de errar: **+10 XP**.
- Nível perfeito (sem erro nenhum): **bônus +50 XP**.
- Curva de nível de jogador crescente, com títulos:
  *Curioso → Estudante → Praticante → Analista → Especialista → Mestre → Referência.*

### Níveis infinitos
- Os níveis são **gerados deterministicamente** a partir do número do nível
  (mesma semente = mesmo nível, sempre). Isso permite "infinito" sem banco gigante.
- Ao esgotar o conteúdo curado, o gerador recombina palavras e perguntas do tema
  com dificuldade crescente, sem repetir em sequência.
- A dificuldade sobe por faixas: 6x6 → 7x7 → 8x8 → 9x9 → 10x10.

### Ofensiva (streak)
- **Concluir 1 nível por dia** mantém a ofensiva.
- Calendário de ofensiva visível na tela inicial.
- Escudo de ofensiva: 1 falta perdoada por semana (para não punir imprevistos).
- Recorde pessoal destacado.

### Conquistas
Categorias com níveis bronze/prata/ouro:
- **Ofensiva**: 3, 7, 30, 100, 365 dias seguidos.
- **Volume**: 10, 50, 100, 300, 1000 níveis concluídos.
- **Precisão**: 10, 25, 50 níveis perfeitos.
- **Trilha**: dominar cada um dos quatro pilares.
- **Velocidade**: resolver um caça-palavras em menos de 60s.
- **Curiosidade**: jogar 7 dias seguidos em trilhas diferentes.

---

## 6. Telas

1. **Início** — saudação, ofensiva, XP, botão "Continuar nível X", atalho para trilhas.
2. **Trilhas** — 4 cards (Neurociências, Neurofisiologia, Hipnose, Comportamento) com % de domínio.
3. **Jogo** — caça-palavras + quiz no mesmo fluxo, barra de progresso no topo.
4. **Resultado** — XP ganho, streak, conquistas desbloqueadas, botão "Próximo nível".
5. **Conquistas** — galeria com bloqueadas em silhueta.
6. **Estatísticas** — acerto por trilha, palavras que mais erra, evolução semanal, tempo médio.
7. **Ajustes** — tema claro/escuro, som, vibração, horário do lembrete, backup/restauração.

Navegação por barra inferior: **Início · Trilhas · Conquistas · Estatísticas**.

---

## 7. Arquitetura técnica

```
MenteAfiada/
├─ conteudo/                 ← você joga os PDFs aqui
├─ src/
│  ├─ app/                   ← rotas e layout
│  ├─ jogo/
│  │  ├─ gerador-grade.ts    ← gera o caça-palavras (semente = nº do nível)
│  │  ├─ nivel.ts            ← monta nível: palavras + 3 perguntas
│  │  └─ pontuacao.ts        ← XP, streak, conquistas
│  ├─ dados/
│  │  ├─ temas.json          ← 4 pilares e sub-temas
│  │  ├─ palavras.json       ← termos + definição + micro-aula
│  │  └─ perguntas.json      ← pergunta, 4 opções, correta, explicação
│  ├─ componentes/
│  └─ estilos/
├─ public/                   ← ícones, manifest do PWA
└─ scripts/
   └─ importar-pdfs.ts       ← extrai texto dos PDFs e monta candidatos
```

- **Stack**: Vite + React + TypeScript + Tailwind CSS.
- **PWA**: `vite-plugin-pwa` com service worker — funciona offline após a 1ª visita.
- **Persistência**: `localStorage` + exportação/importação de um arquivo `.json`.
- **Sem backend, sem banco, sem custo.**
- **Sem dependência de IA em tempo de execução** — o conteúdo é pré-gerado no build.

---

## 8. Pipeline do conteúdo (como chegamos a 300+ níveis)

1. **Extração** — ler os PDFs de `conteudo/` e extrair o texto (OCR se forem digitalizados).
2. **Curadoria de termos** — identificar termos técnicos relevantes por tema, com definição curta.
3. **Micro-aulas** — gerar explicação de 2 a 3 linhas para cada termo.
4. **Perguntas** — gerar 4 a 6 perguntas por termo/tema, com distratores plausíveis.
5. **Revisão sua** — uma planilha simples para aprovar, corrigir ou descartar.
6. **Compilação** — gerar os JSONs finais e conferir que cada nível tem solução válida.

Meta: **300+ níveis**, o que implica algo como **1.500 palavras** e **900 perguntas** curadas.

---

## 9. Critérios de "pronto"

- [ ] Instala no celular pela tela inicial e abre offline.
- [ ] 300 níveis jogáveis, sem nível travado ou sem solução.
- [ ] Caça-palavras funciona no toque (arrastar), em 6x6 até 10x10.
- [ ] Quiz com micro-aula ao errar e reforço no fim do nível.
- [ ] Streak, XP, conquistas e estatísticas persistindo entre sessões.
- [ ] Backup exporta e restaura o progresso.
- [ ] Lembrete diário funcionando.
- [ ] Interface 100% em português, responsiva de 360px a tablet.

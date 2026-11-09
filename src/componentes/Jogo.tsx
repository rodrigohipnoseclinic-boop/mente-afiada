import { useMemo, useState } from "react";
import { CacaPalavras } from "./CacaPalavras";
import { Quiz } from "./Quiz";
import { montarNivel } from "../jogo/nivel";
import { tocar } from "../jogo/sons";
import type { ContextoJogo } from "../jogo/selecao";
import type { ResultadoNivel } from "../jogo/progresso";
import { trilhaPorId } from "../dados/trilhas";
import type { Termo } from "../dados/tipos";
import type { Celula } from "../jogo/gerador-grade";

interface Props {
  numero: number;
  contexto?: ContextoJogo;
  onSair: () => void;
  onConcluir: (resultado: ResultadoNivel) => void;
  /** Texto do botão na última pergunta do quiz. */
  rotuloFinal?: string;
}

type Fase = "grade" | "quiz";

export function Jogo({
  numero,
  contexto,
  onSair,
  onConcluir,
  rotuloFinal,
}: Props) {
  const vistas = contexto?.vistas;
  const masteries = contexto?.masteries;
  const nivel = useMemo(
    () => montarNivel(numero, { vistas, masteries }),
    [numero, vistas, masteries]
  );
  const trilha = trilhaPorId(nivel.trilha);

  const [fase, setFase] = useState<Fase>("grade");
  const [encontradas, setEncontradas] = useState<string[]>([]);
  const [dialogo, setDialogo] = useState<Termo | null>(null);
  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [dica, setDica] = useState<Celula | null>(null);
  const [dicasUsadas, setDicasUsadas] = useState(0);
  const dicasRestantes = 2 - dicasUsadas;

  const totalPalavras = nivel.grade.palavras.length;
  const achouTudo = encontradas.length >= totalPalavras;

  const encontrar = (chave: string) => {
    if (encontradas.includes(chave)) return;
    tocar("palavra", encontradas.length);
    setEncontradas((antes) => [...antes, chave]);
    const termo = nivel.termos.find((t) => t.chave === chave);
    if (termo) setDialogo(termo);
  };

  const pedirDica = () => {
    if (dicasRestantes <= 0) return;
    const alvo = nivel.grade.palavras.find((p) => !encontradas.includes(p.chave));
    if (!alvo) return;
    tocar("toque", 6);
    setDicasUsadas((n) => n + 1);
    setDica(alvo.caminho[0]);
    window.setTimeout(() => setDica(null), 2500);
  };

  const concluirPergunta = (acertouDePrimeira: boolean) => {
    const novosAcertos = acertos + (acertouDePrimeira ? 1 : 0);
    const novosErros = erros + (acertouDePrimeira ? 0 : 1);
    setAcertos(novosAcertos);
    setErros(novosErros);

    if (indice + 1 >= nivel.perguntas.length) {
      const perfeito = novosErros === 0;
      onConcluir({
        numero,
        trilha: nivel.trilha,
        xp: encontradas.length * 5 + novosAcertos * 10 + (perfeito ? 15 : 0),
        palavras: encontradas.length,
        perguntas: nivel.perguntas.length,
        acertosPrimeira: novosAcertos,
        erros: novosErros,
        perfeito,
        perguntasIds: nivel.perguntas.map((p) => p.id),
      });
      return;
    }
    setIndice((i) => i + 1);
  };

  const pergunta = nivel.perguntas[indice];

  return (
    <div className="tela jogo">
      <header className="topo-jogo">
        <button type="button" className="icone-botao" onClick={onSair} aria-label="Sair do nível">
          ✕
        </button>
        <div className="jogo-titulo">
          <strong>Rodada {numero}</strong>
          <span className="trilha-mini" style={{ color: trilha.cor }}>
            {trilha.emoji} {trilha.nome}
          </span>
        </div>
        <span className="contador">
          {fase === "grade" ? `${encontradas.length}/${totalPalavras}` : `${indice + 1}/3`}
        </span>
      </header>

      {fase === "grade" && (
        <>
          <div className="instrucao">
            <strong>Encontre as {totalPalavras} palavras</strong>
            <span>Arraste o dedo sobre as letras.</span>
          </div>

          <CacaPalavras
            grade={nivel.grade}
            encontradas={encontradas}
            onEncontrar={encontrar}
            dica={dica}
          />

          <div className="lista-palavras">
            {nivel.grade.palavras.map((p) => {
              const achou = encontradas.includes(p.chave);
              const termo = nivel.termos.find((t) => t.chave === p.chave);
              return (
                <button
                  key={p.chave}
                  type="button"
                  className={`palavra ${achou ? "achada" : ""}`}
                  onClick={() => termo && setDialogo(termo)}
                >
                  {achou ? "✓ " : ""}
                  {p.termo}
                </button>
              );
            })}
          </div>

          {dialogo && (
            <div className="micro-aula">
              <button
                type="button"
                className="fechar"
                onClick={() => setDialogo(null)}
                aria-label="Fechar micro-aula"
              >
                ✕
              </button>
              <span className="micro-tag">Micro-aula</span>
              <strong>{dialogo.termo}</strong>
              <p>{dialogo.definicao}</p>
              <span className="fonte-linha">
                {dialogo.fonte.instituicao} · {dialogo.fonte.ano}
              </span>
            </div>
          )}

          <div className="rodape-jogo">
            {!achouTudo && (
              <button
                type="button"
                className="botao texto bloco"
                onClick={pedirDica}
                disabled={dicasRestantes <= 0}
              >
                💡 Dica: mostrar onde começa uma palavra ({dicasRestantes})
              </button>
            )}
            <button
              type="button"
              className="botao primario bloco"
              disabled={!achouTudo}
              onClick={() => setFase("quiz")}
            >
              {achouTudo
                ? "Ir para as perguntas"
                : `Faltam ${totalPalavras - encontradas.length} palavra(s)`}
            </button>
          </div>
        </>
      )}

      {fase === "quiz" && pergunta && (
        <Quiz
          key={pergunta.id}
          pergunta={pergunta}
          indice={indice}
          total={nivel.perguntas.length}
          onConcluir={concluirPergunta}
          rotuloFinal={rotuloFinal}
        />
      )}
    </div>
  );
}

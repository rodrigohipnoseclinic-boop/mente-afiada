import { useMemo, useState } from "react";
import { CacaPalavras } from "./CacaPalavras";
import { Quiz } from "./Quiz";
import { montarNivel } from "../jogo/nivel";
import type { ResultadoNivel } from "../jogo/progresso";
import { trilhaPorId } from "../dados/trilhas";
import type { Termo } from "../dados/tipos";

interface Props {
  numero: number;
  onSair: () => void;
  onConcluir: (resultado: ResultadoNivel) => void;
}

type Fase = "grade" | "quiz";

export function Jogo({ numero, onSair, onConcluir }: Props) {
  const nivel = useMemo(() => montarNivel(numero), [numero]);
  const trilha = trilhaPorId(nivel.trilha);

  const [fase, setFase] = useState<Fase>("grade");
  const [encontradas, setEncontradas] = useState<string[]>([]);
  const [dialogo, setDialogo] = useState<Termo | null>(null);
  const [indice, setIndice] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);

  const totalPalavras = nivel.grade.palavras.length;
  const achouTudo = encontradas.length >= totalPalavras;

  const encontrar = (chave: string) => {
    if (encontradas.includes(chave)) return;
    setEncontradas((antes) => [...antes, chave]);
    const termo = nivel.termos.find((t) => t.chave === chave);
    if (termo) setDialogo(termo);
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
          <strong>Nível {numero}</strong>
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
        />
      )}
    </div>
  );
}

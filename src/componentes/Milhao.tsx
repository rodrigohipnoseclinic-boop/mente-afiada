import { useState } from "react";
import {
  ESCADA_MILHAO,
  PERGUNTAS_MILHAO,
  montarPartida,
  type PerguntaMilhao,
} from "../dados/milhao";
import type { ResultadoMilhao } from "../jogo/progresso";
import { embaralhar } from "../jogo/rng";
import { selecionarPerguntas, type ContextoJogo } from "../jogo/selecao";

interface Props {
  onSair: () => void;
  onConcluir: (resultado: ResultadoMilhao) => void;
  contexto?: ContextoJogo;
}

type Resultado = "venceu" | "errou";

const formatarPontos = (valor: number) => valor.toLocaleString("pt-BR");

const distribuirPlateia = (correta: number): number[] => {
  const pesos = [0, 0, 0, 0];
  pesos[correta] = 55 + Math.floor(Math.random() * 25);
  const restante = 100 - pesos[correta];
  const erradas = [0, 1, 2, 3].filter((i) => i !== correta);
  const pesosErradas = embaralhar([0.2, 0.3, 0.5], Math.random);
  erradas.forEach((indice, i) => {
    pesos[indice] =
      i === erradas.length - 1
        ? restante - pesos[erradas[0]] - pesos[erradas[1]]
        : Math.round(restante * pesosErradas[i]);
  });
  return pesos;
};

export function Milhao({ onSair, onConcluir, contexto }: Props) {
  const [partida, setPartida] = useState<PerguntaMilhao[]>(() =>
    montarPartida(Date.now(), contexto)
  );
  const [indice, setIndice] = useState(0);
  const [erradas, setErradas] = useState<number[]>([]);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [finalizada, setFinalizada] = useState(false);
  const [eliminadas, setEliminadas] = useState<number[]>([]);
  const [usouCorte, setUsouCorte] = useState(false);
  const [usouPlateia, setUsouPlateia] = useState(false);
  const [usouPular, setUsouPular] = useState(false);
  const [plateia, setPlateia] = useState<number[] | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [acertosPrimeira, setAcertosPrimeira] = useState(0);
  const [erros, setErros] = useState(0);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const pergunta = partida[indice];
  const respondida = finalizada;
  const avisoErro = erradas.length === 1 && !finalizada;
  const acertou = respondida && escolha === pergunta.correta;
  const premioAtual = indice > 0 ? ESCADA_MILHAO[indice - 1] : 0;
  const premioFinal =
    resultado === "venceu"
      ? ESCADA_MILHAO[ESCADA_MILHAO.length - 1]
      : acertos > 0
        ? ESCADA_MILHAO[acertos - 1]
        : 0;
  const xpGanho = acertos * 10 + (resultado === "venceu" ? 30 : 0);

  const responder = (indiceOpcao: number) => {
    if (respondida || resultado || eliminadas.includes(indiceOpcao)) return;

    if (indiceOpcao === pergunta.correta) {
      const primeira = erradas.length === 0;
      setEscolha(indiceOpcao);
      setFinalizada(true);
      setAcertos((atual) => atual + 1);
      if (primeira) setAcertosPrimeira((atual) => atual + 1);
      return;
    }

    const novasErradas = [...erradas, indiceOpcao];
    setErradas(novasErradas);
    setErros((atual) => atual + 1);
    setEscolha(indiceOpcao);

    if (novasErradas.length >= 2) {
      setFinalizada(true);
      return;
    }

    setEscolha(null);
  };

  const avancar = () => {
    if (!finalizada || resultado) return;

    if (indice + 1 >= partida.length) {
      setResultado(acertou ? "venceu" : "errou");
      return;
    }

    if (!acertou) {
      setResultado("errou");
      return;
    }

    setIndice((atual) => atual + 1);
    setErradas([]);
    setEscolha(null);
    setFinalizada(false);
    setEliminadas([]);
    setPlateia(null);
  };

  const usarCorte = () => {
    if (usouCorte || respondida) return;
    const erradasAtuais = embaralhar(
      pergunta.opcoes.map((_, i) => i).filter((i) => i !== pergunta.correta),
      Math.random
    );
    setEliminadas(erradasAtuais.slice(0, 2));
    setUsouCorte(true);
  };

  const usarPlateia = () => {
    if (usouPlateia || respondida) return;
    setPlateia(distribuirPlateia(pergunta.correta));
    setUsouPlateia(true);
  };

  const usarPular = () => {
    if (usouPular || respondida) return;
    const idsAtuais = partida.map((p) => p.id);

    // Troca por outra pergunta do mesmo degrau, priorizando as nunca vistas
    // e sem repetir nenhuma das que já estão na partida.
    const [escolhida] = selecionarPerguntas(PERGUNTAS_MILHAO, 1, {
      ...contexto,
      semente: Date.now(),
      dificuldade: [pergunta.nivel],
      evitar: idsAtuais,
    });
    const substituta = PERGUNTAS_MILHAO.find((p) => p.id === escolhida?.id);
    if (!substituta) return;

    setPartida((atual) =>
      atual.map((p, i) => (i === indice ? substituta : p))
    );
    setErradas([]);
    setEscolha(null);
    setFinalizada(false);
    setEliminadas([]);
    setPlateia(null);
    setUsouPular(true);
  };

  const concluir = () => {
    onConcluir({
      xp: xpGanho,
      perguntas: partida.length,
      acertosPrimeira,
      erros,
      venceu: resultado === "venceu",
      perguntasIds: partida.map((p) => p.id),
    });
  };

  if (resultado) {
    const venceu = resultado === "venceu";
    return (
      <div className="tela milhao">
        <main className="conteudo milhao-conteudo">
          <div className="milhao-emblema" aria-hidden="true">
            {venceu ? "🏆" : "💡"}
          </div>
          <p className="etiqueta etiqueta-dourada">Modo Milhão</p>
          <h1>{venceu ? "Você chegou ao topo!" : "Fim de jogo"}</h1>
          <p className="subtitulo">
            {venceu
              ? "Você respondeu as 10 perguntas e levou a escada inteira."
              : `Você acertou ${acertos} de ${partida.length} antes do erro.`}
          </p>

          <section className="cartao destaque milhao-resumo">
            <div className="xp-ganho">
              <span>{formatarPontos(venceu ? ESCADA_MILHAO[ESCADA_MILHAO.length - 1] : premioFinal)}</span>
              <small>pontos fictícios</small>
            </div>
            <div className="resumo-linhas">
              <div className="linha-dado">
                <span>Acertos</span>
                <strong>{acertos} de {partida.length}</strong>
              </div>
              <div className="linha-dado">
                <span>Acertos de primeira</span>
                <strong>{acertosPrimeira}</strong>
              </div>
              <div className="linha-dado">
                <span>XP ganho</span>
                <strong>⚡ {xpGanho}</strong>
              </div>
              <div className="linha-dado">
                <span>Erros</span>
                <strong>{erros}</strong>
              </div>
            </div>
            {!venceu && (
              <p className="milhao-feedback">
                A resposta certa era <strong>{String.fromCharCode(65 + pergunta.correta)}</strong>. {pergunta.explicacao}
              </p>
            )}
            <p className="fonte-linha">
              Fonte: {pergunta.fonte.titulo} — {pergunta.fonte.instituicao} ({pergunta.fonte.ano})
            </p>
          </section>

          <div className="acoes-resultado">
            <button type="button" className="botao primario bloco grande" onClick={concluir}>
              Voltar ao início
            </button>
            <p className="milhao-aviso">Prêmios são fictícios e servem apenas para progressão no app.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="tela milhao">
      <header className="topo-jogo milhao-topo">
        <button type="button" className="icone-botao" onClick={onSair} aria-label="Sair do Modo Milhão">
          ✕
        </button>
        <div className="jogo-titulo">
          <strong>Modo Milhão</strong>
          <span className="trilha-mini">Formato inspirado em perguntas de TV</span>
        </div>
        <span className="contador">{indice + 1}/{partida.length}</span>
      </header>

      <main className="conteudo milhao-conteudo">
        <div className="milhao-placar">
          <span>Degrau {indice + 1}</span>
          <strong>{premioAtual > 0 ? `${formatarPontos(premioAtual)} pontos` : "Comece a subir"}</strong>
        </div>

        {avisoErro && (
          <div className="aviso-erro" role="status">
            Ainda não. Você tem mais uma tentativa.
          </div>
        )}

        <div className="milhao-ajudas" aria-label="Ajudas disponíveis">
          <button type="button" className="ajuda" onClick={usarCorte} disabled={usouCorte || respondida}>
            50/50
            <small>{usouCorte ? "Usada" : "Eliminar 2"}</small>
          </button>
          <button type="button" className="ajuda" onClick={usarPlateia} disabled={usouPlateia || respondida}>
            👥
            <small>{usouPlateia ? "Usada" : "Plateia"}</small>
          </button>
          <button type="button" className="ajuda" onClick={usarPular} disabled={usouPular || respondida}>
            ↷
            <small>{usouPular ? "Usada" : "Pular"}</small>
          </button>
        </div>

        {plateia && (
          <div className="plateia" aria-live="polite">
            <div className="plateia-topo">
              <strong>Votação ilustrativa da plateia</strong>
              <span>Não é dado real</span>
            </div>
            <div className="plateia-barras">
              {plateia.map((valor, i) => (
                <div className="plateia-linha" key={i}>
                  <span>{String.fromCharCode(65 + i)}</span>
                  <div className="plateia-trilho"><div style={{ width: `${valor}%` }} /></div>
                  <strong>{valor}%</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        <section className="cartao milhao-pergunta">
          <span className="etiqueta etiqueta-dourada">Pergunta {indice + 1} de {partida.length}</span>
          <h1>{pergunta.enunciado}</h1>

          <div className="opcoes milhao-opcoes">
            {pergunta.opcoes.map((opcao, i) => {
              const eliminada = eliminadas.includes(i);
              const errada = erradas.includes(i);
              const certa = finalizada && i === pergunta.correta;
              return (
                <button
                  key={i}
                  type="button"
                  className={`opcao ${certa ? "certa" : ""} ${errada ? "errada" : ""} ${eliminada ? "eliminada" : ""}`}
                  onClick={() => responder(i)}
                  disabled={finalizada || eliminada || errada}
                  aria-label={eliminada ? `Alternativa ${String.fromCharCode(65 + i)} eliminada` : undefined}
                >
                  <span className="letra">{eliminada ? "—" : String.fromCharCode(65 + i)}</span>
                  <span className="texto">{opcao}</span>
                  {certa && <span className="marca">✓</span>}
                  {errada && <span className="marca">✕</span>}
                </button>
              );
            })}
          </div>

          {respondida && (
            <div className={`explicacao ${acertou ? "ok" : "erro"}`}>
              <strong>
                {acertou
                  ? erradas.length === 0
                    ? "Isso mesmo!"
                    : "Correto na segunda tentativa!"
                  : "Você errou as duas tentativas."}
              </strong>
              <p>{pergunta.explicacao}</p>
              <p className="fonte-linha">
                Fonte: {pergunta.fonte.titulo} — {pergunta.fonte.instituicao} ({pergunta.fonte.ano})
              </p>
              <button
                type="button"
                className={`botao bloco ${acertou ? "primario" : "secundario"}`}
                onClick={avancar}
              >
                {acertou
                  ? indice + 1 >= partida.length
                    ? "Ver resultado"
                    : "Subir um degrau"
                  : "Ver resultado"}
              </button>
            </div>
          )}
        </section>

        <ol className="escada-milhao" aria-label="Escada de prêmios">
          {ESCADA_MILHAO.map((valor, i) => {
            const alcancado = i < acertos;
            const atual = i === indice;
            return (
              <li key={valor} className={`${alcancado ? "alcancado" : ""} ${atual ? "atual" : ""}`}>
                <span>{i + 1}</span>
                <small>{formatarPontos(valor)}</small>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

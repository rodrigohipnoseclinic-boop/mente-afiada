import { useEffect } from "react";
import { tocar } from "../jogo/sons";
import type { Conquista } from "../jogo/conquistas";
import type { Progresso, ResultadoNivel } from "../jogo/progresso";

interface Props {
  resultado: ResultadoNivel;
  progresso: Progresso;
  novas: Conquista[];
  onProximo: () => void;
  onInicio: () => void;
}

export function Resultado({
  resultado,
  progresso,
  novas,
  onProximo,
  onInicio,
}: Props) {
  const acertos = resultado.acertosPrimeira;
  const total = resultado.perguntas;

  useEffect(() => {
    tocar("conclusao");
    if (novas.length === 0) return;
    const espera = window.setTimeout(() => tocar("premio"), 900);
    return () => window.clearTimeout(espera);
    // toca uma vez ao mostrar o resultado
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tela resultado">
      <main className="conteudo resultado-conteudo">
        <div className="foguete" aria-hidden="true">
          {resultado.perfeito ? "🏆" : "🎉"}
        </div>
        <h1>Rodada {resultado.numero} concluída</h1>
        <p className="subtitulo">
          🧩 Caça-palavras, quiz e desafios · 5 trilhas
        </p>

        <section className="cartao destaque">
          <div className="xp-ganho">
            <span>+{resultado.xp}</span>
            <small>XP</small>
          </div>
          <div className="resumo-linhas">
            <div className="linha-dado">
              <span>Palavras encontradas</span>
              <strong>{resultado.palavras}</strong>
            </div>
            <div className="linha-dado">
              <span>Acertos de primeira</span>
              <strong>
                {acertos} de {total}
              </strong>
            </div>
            <div className="linha-dado">
              <span>Ofensiva</span>
              <strong>🔥 {progresso.ofensiva}</strong>
            </div>
            <div className="linha-dado">
              <span>XP total</span>
              <strong>⚡ {progresso.xp}</strong>
            </div>
          </div>
          {resultado.perfeito && (
            <p className="selo">Rodada perfeita: bônus de 15 XP.</p>
          )}
        </section>

        {novas.length > 0 && (
          <section className="cartao premios-novos">
            <h3>Prêmio desbloqueado</h3>
            {novas.map((c) => (
              <div key={c.id} className="premio-novo">
                <span aria-hidden="true">{c.emoji}</span>
                <div>
                  <strong>{c.nome}</strong>
                  <small>{c.descricao}</small>
                </div>
              </div>
            ))}
          </section>
        )}

        <div className="acoes-resultado">
          <button type="button" className="botao primario bloco grande" onClick={onProximo}>
            Próxima rodada
          </button>
          <button type="button" className="botao texto" onClick={onInicio}>
            Voltar ao início
          </button>
        </div>
      </main>
    </div>
  );
}

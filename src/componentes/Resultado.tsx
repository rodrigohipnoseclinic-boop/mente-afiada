import type { Conquista } from "../jogo/conquistas";
import type { Progresso, ResultadoNivel } from "../jogo/progresso";
import { trilhaPorId } from "../dados/trilhas";

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
  const trilha = trilhaPorId(resultado.trilha);
  const acertos = resultado.acertosPrimeira;
  const total = resultado.perguntas;

  return (
    <div className="tela resultado">
      <main className="conteudo resultado-conteudo">
        <div className="foguete" aria-hidden="true">
          {resultado.perfeito ? "🏆" : "🎉"}
        </div>
        <h1>Nível {resultado.numero} concluído</h1>
        <p className="subtitulo" style={{ color: trilha.cor }}>
          {trilha.emoji} {trilha.nome}
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
            <p className="selo">Nível perfeito: bônus de 15 XP.</p>
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
            Próximo nível
          </button>
          <button type="button" className="botao texto" onClick={onInicio}>
            Voltar ao início
          </button>
        </div>
      </main>
    </div>
  );
}

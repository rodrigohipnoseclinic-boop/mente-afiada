import { useRef, useState } from "react";
import {
  montarSessao,
  respostaNormalizada,
  type AssociacaoTarefa,
  type LacunaTarefa,
  type MitoTarefa,
  type OrdenarTarefa,
  type TarefaRevisao,
} from "../dados/revisao";
import { embaralhar } from "../jogo/rng";
import type { ResultadoTreino } from "../jogo/progresso";

interface Props {
  onSair: () => void;
  onConcluir: (resultado: ResultadoTreino) => void;
}

export function Revisao({ onSair, onConcluir }: Props) {
  const [sessao] = useState<TarefaRevisao[]>(() => montarSessao(Date.now()));
  const [indice, setIndice] = useState(0);
  const [fim, setFim] = useState(false);
  const stats = useRef({ primeira: 0, erros: 0 });

  const tarefa = sessao[indice];
  const total = sessao.length;

  const finalizarTarefa = (erros: number) => {
    if (erros === 0) stats.current.primeira += 1;
    stats.current.erros += erros;
    if (indice + 1 >= total) {
      setFim(true);
      return;
    }
    setIndice((atual) => atual + 1);
  };

  if (fim) {
    const perfeito = stats.current.erros === 0;
    const xp = total * 10 + (perfeito ? 20 : 0);
    return (
      <div className="tela revisao">
        <header className="topo-jogo">
          <span />
          <div className="jogo-titulo"><strong>Treino variado</strong><span className="trilha-mini">Resumo</span></div>
          <span />
        </header>
        <main className="conteudo revisao-conteudo">
          <div className="milhao-emblema" aria-hidden="true">{perfeito ? "🏆" : "🧠"}</div>
          <h1>{perfeito ? "Sessão impecável!" : "Boa sessão!"}</h1>
          <p className="subtitulo">Você praticou associação, lacunas, mito ou verdade e ordenação.</p>
          <section className="cartao destaque milhao-resumo">
            <div className="xp-ganho"><span>+{xp}</span><small>XP</small></div>
            <div className="resumo-linhas">
              <div className="linha-dado"><span>Tarefas</span><strong>{total}</strong></div>
              <div className="linha-dado"><span>Sem erro</span><strong>{stats.current.primeira}</strong></div>
              <div className="linha-dado"><span>Erros</span><strong>{stats.current.erros}</strong></div>
            </div>
          </section>
          <button
            type="button"
            className="botao primario bloco grande"
            onClick={() =>
              onConcluir({
                xp,
                tarefas: total,
                acertosPrimeira: stats.current.primeira,
                erros: stats.current.erros,
              })
            }
          >
            Voltar ao início
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="tela revisao">
      <header className="topo-jogo">
        <button type="button" className="icone-botao" onClick={onSair} aria-label="Sair do treino">✕</button>
        <div className="jogo-titulo"><strong>Treino variado</strong><span className="trilha-mini">Associação · lacuna · mito · ordem</span></div>
        <span className="contador">{indice + 1}/{total}</span>
      </header>
      <main className="conteudo revisao-conteudo">
        {tarefa.tipo === "associar" && <Associacao tarefa={tarefa} onFinalizar={finalizarTarefa} />}
        {tarefa.tipo === "lacuna" && <Lacuna tarefa={tarefa} onFinalizar={finalizarTarefa} />}
        {tarefa.tipo === "mito" && <Mito tarefa={tarefa} onFinalizar={finalizarTarefa} />}
        {tarefa.tipo === "ordenar" && <Ordenar tarefa={tarefa} onFinalizar={finalizarTarefa} />}
      </main>
    </div>
  );
}

function Associacao({ tarefa, onFinalizar }: { tarefa: AssociacaoTarefa; onFinalizar: (erros: number) => void }) {
  const [ordemDefs] = useState(() => embaralhar(tarefa.pares.map((_, i) => i), Math.random));
  const [escolhidoTermo, setEscolhidoTermo] = useState<number | null>(null);
  const [escolhidoDef, setEscolhidoDef] = useState<number | null>(null);
  const [acertos, setAcertos] = useState<number[]>([]);
  const [erros, setErros] = useState(0);

  const completo = acertos.length === tarefa.pares.length;

  const escolherTermo = (i: number) => {
    if (acertos.includes(i) || completo) return;
    setEscolhidoTermo(i === escolhidoTermo ? null : i);
  };

  const escolherDef = (i: number) => {
    if (completo) return;
    if (acertos.includes(tarefa.pares[i] ? i : -1)) return;
    const novo = i === escolhidoDef ? null : i;
    setEscolhidoDef(novo);
    if (escolhidoTermo === null || novo === null) return;
    if (escolhidoTermo === novo) {
      setAcertos((atual) => [...atual, escolhidoTermo]);
      setEscolhidoTermo(null);
      setEscolhidoDef(null);
    } else {
      setErros((atual) => atual + 1);
      setEscolhidoTermo(null);
      setEscolhidoDef(null);
    }
  };

  return (
    <section className="cartao revisao-tarefa">
      <span className="etiqueta etiqueta-dourada">Associar pares</span>
      <h1>Ligue cada termo à sua definição</h1>
      <p className="fonte-linha">Fonte: {tarefa.fonte.titulo} — {tarefa.fonte.instituicao} ({tarefa.fonte.ano})</p>
      <div className="associacao-grid">
        <div className="associacao-coluna">
          {tarefa.pares.map((par, i) => {
            const done = acertos.includes(i);
            return (
              <button key={par.id} type="button" className={`associacao-item ${done ? "done" : ""} ${escolhidoTermo === i ? "selecionado" : ""}`}
                onClick={() => escolherTermo(i)} disabled={done}>
                {done ? "✓ " : ""}{par.termo}
              </button>
            );
          })}
        </div>
        <div className="associacao-coluna">
          {ordemDefs.map((i) => {
            const done = acertos.includes(i);
            return (
              <button key={tarefa.pares[i].id} type="button" className={`associacao-item definicao ${done ? "done" : ""} ${escolhidoDef === i ? "selecionado" : ""}`}
                onClick={() => escolherDef(i)} disabled={done}>
                {tarefa.pares[i].definicao}
              </button>
            );
          })}
        </div>
      </div>
      {completo && (
        <div className="explicacao ok">
          <strong>Pares ligados.</strong>
          <p>Você acertou {tarefa.pares.length} de {tarefa.pares.length}.</p>
          <button type="button" className="botao primario bloco" onClick={() => onFinalizar(erros)}>Continuar</button>
        </div>
      )}
    </section>
  );
}

function Lacuna({ tarefa, onFinalizar }: { tarefa: LacunaTarefa; onFinalizar: (erros: number) => void }) {
  const [valor, setValor] = useState("");
  const [erros, setErros] = useState(0);
  const [resolvida, setResolvida] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const verificar = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (resolvida) return;
    if (respostaNormalizada(valor) === respostaNormalizada(tarefa.resposta)) {
      setResolvida(true);
      setMensagem("Isso mesmo.");
      return;
    }
    setErros((atual) => atual + 1);
    setMensagem("Ainda não. Revise a lacuna ou use “Ver resposta”.");
  };

  const revelar = () => {
    setResolvida(true);
    setErros((atual) => atual + 1);
    setMensagem(`Resposta: ${tarefa.resposta}`);
  };

  return (
    <section className="cartao revisao-tarefa">
      <span className="etiqueta etiqueta-dourada">Completar lacuna</span>
      <h1>Complete o conceito</h1>
      <p className="revisao-texto">{tarefa.enunciado}</p>
      <form className="lacuna-form" onSubmit={verificar}>
        <input
          type="text"
          className="lacuna-input"
          value={valor}
          onChange={(e) => { setValor(e.target.value); setMensagem(""); }}
          placeholder="Digite o termo"
          autoComplete="off"
          disabled={resolvida}
          aria-label="Resposta da lacuna"
        />
        {mensagem && <p className="revisao-mensagem">{mensagem}</p>}
        {!resolvida ? (
          <div className="revisao-acoes">
            <button type="submit" className="botao primario">Verificar</button>
            <button type="button" className="botao texto" onClick={revelar}>Ver resposta</button>
          </div>
        ) : (
          <div className="explicacao ok">
            <strong>{tarefa.resposta}</strong>
            <p>{tarefa.explicacao}</p>
            <p className="fonte-linha">Fonte: {tarefa.fonte.titulo} — {tarefa.fonte.instituicao} ({tarefa.fonte.ano})</p>
            <button type="button" className="botao primario bloco" onClick={() => onFinalizar(erros)}>Continuar</button>
          </div>
        )}
      </form>
    </section>
  );
}

function Mito({ tarefa, onFinalizar }: { tarefa: MitoTarefa; onFinalizar: (erros: number) => void }) {
  const [escolha, setEscolha] = useState<boolean | null>(null);
  const [erros, setErros] = useState(0);
  const [resolvida, setResolvida] = useState(false);

  const responder = (valor: boolean) => {
    if (resolvida) return;
    if (valor === tarefa.verdade) {
      setEscolha(valor);
      setResolvida(true);
      return;
    }
    setEscolha(valor);
    setErros((atual) => atual + 1);
  };

  return (
    <section className="cartao revisao-tarefa">
      <span className="etiqueta etiqueta-dourada">Mito ou verdade</span>
      <h1>Esta afirmação é mito ou verdade?</h1>
      <p className="revisao-texto">{tarefa.afirmacao}</p>
      <div className="mito-botoes">
        <button type="button" className={`botao mito ${escolha === false && !resolvida ? "erro" : ""} ${resolvida && tarefa.verdade === false ? "certo" : ""}`} onClick={() => responder(false)} disabled={resolvida}>Mito</button>
        <button type="button" className={`botao verdade ${escolha === true && !resolvida ? "erro" : ""} ${resolvida && tarefa.verdade === true ? "certo" : ""}`} onClick={() => responder(true)} disabled={resolvida}>Verdade</button>
      </div>
      {resolvida && (
        <div className="explicacao ok">
          <strong>{tarefa.verdade ? "Verdade" : "Mito"}.</strong>
          <p>{tarefa.explicacao}</p>
          <p className="fonte-linha">Fonte: {tarefa.fonte.titulo} — {tarefa.fonte.instituicao} ({tarefa.fonte.ano})</p>
          <button type="button" className="botao primario bloco" onClick={() => onFinalizar(erros)}>Continuar</button>
        </div>
      )}
    </section>
  );
}

function Ordenar({ tarefa, onFinalizar }: { tarefa: OrdenarTarefa; onFinalizar: (erros: number) => void }) {
  const [ordem, setOrdem] = useState<number[]>([]);
  const [erros, setErros] = useState(0);
  const [resolvida, setResolvida] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const restantes = tarefa.etapas.map((_, i) => i).filter((i) => !ordem.includes(i));

  const escolher = (i: number) => {
    if (resolvida) return;
    setOrdem((atual) => [...atual, i]);
    setMensagem("");
  };

  const desfazer = () => {
    if (resolvida) return;
    setOrdem((atual) => atual.slice(0, -1));
  };

  const reiniciar = () => {
    if (resolvida) return;
    setOrdem([]);
    setMensagem("");
  };

  const verificar = () => {
    if (ordem.length !== tarefa.etapas.length || resolvida) return;
    const certa = ordem.every((etapa, i) => etapa === i);
    if (certa) {
      setResolvida(true);
      setMensagem("Ordem correta.");
      return;
    }
    setErros((atual) => atual + 1);
    setMensagem("Ainda não está na ordem. Ajuste e tente de novo.");
  };

  return (
    <section className="cartao revisao-tarefa">
      <span className="etiqueta etiqueta-dourada">Ordenar etapas</span>
      <h1>{tarefa.enunciado}</h1>
      <ol className="ordenar-lista" aria-label="Etapas escolhidas">
        {ordem.map((i) => (
          <li key={i}>{tarefa.etapas[i]}</li>
        ))}
        {ordem.length === 0 && <li className="ordenar-vazio">Toque nas etapas na ordem correta.</li>}
      </ol>
      <div className="ordenar-opcoes">
        {restantes.map((i) => (
          <button key={i} type="button" className="botao secundario" onClick={() => escolher(i)}>
            {tarefa.etapas[i]}
          </button>
        ))}
      </div>
      {mensagem && <p className="revisao-mensagem">{mensagem}</p>}
      <div className="revisao-acoes">
        <button type="button" className="botao texto" onClick={desfazer} disabled={ordem.length === 0 || resolvida}>Desfazer</button>
        <button type="button" className="botao texto" onClick={reiniciar} disabled={ordem.length === 0 || resolvida}>Recomeçar</button>
        {!resolvida ? (
          <button type="button" className="botao primario" onClick={verificar} disabled={ordem.length !== tarefa.etapas.length}>Verificar</button>
        ) : (
          <button type="button" className="botao primario" onClick={() => onFinalizar(erros)}>Continuar</button>
        )}
      </div>
      {resolvida && (
        <div className="explicacao ok">
          <strong>Ordem correta.</strong>
          <p>{tarefa.explicacao}</p>
          <p className="fonte-linha">Fonte: {tarefa.fonte.titulo} — {tarefa.fonte.instituicao} ({tarefa.fonte.ano})</p>
        </div>
      )}
    </section>
  );
}

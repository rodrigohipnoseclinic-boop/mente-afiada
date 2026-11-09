import { useEffect, useState } from "react";
import { Inicio } from "./componentes/Inicio";
import { Jornada } from "./componentes/Jornada";
import { Trilhas } from "./componentes/Trilhas";
import { Conquistas } from "./componentes/Conquistas";
import { Estatisticas } from "./componentes/Estatisticas";
import { Ajustes } from "./componentes/Ajustes";
import { BarraInferior, type Aba } from "./componentes/BarraInferior";
import { Resultado } from "./componentes/Resultado";
import {
  carregar,
  salvar,
  limpar,
  estadoInicial,
  registrarNivel,
  proximoNivel,
  type Progresso,
  type ResultadoNivel,
} from "./jogo/progresso";
import { verificarConquistas, type Conquista } from "./jogo/conquistas";
import { verificarLembrete } from "./jogo/lembrete";
import { tocar } from "./jogo/sons";

export default function App() {
  const [progresso, setProgresso] = useState<Progresso>(() => carregar());
  const [aba, setAba] = useState<Aba>("inicio");
  const [modo, setModo] = useState<"jornada" | null>(null);
  const [resultado, setResultado] = useState<{
    dados: ResultadoNivel;
    novas: Conquista[];
  } | null>(null);

  useEffect(() => {
    salvar(progresso);
  }, [progresso]);

  // Som de "avançar" nos botões de continuar/próxima/começar, sem mexer em cada tela.
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const botao = (e.target as HTMLElement | null)?.closest("button");
      if (!botao || botao.disabled) return;
      if (/^(Continuar|Próxima|Ir para|Ir aos|Começar|Ver resultado|Voltar ao)/i.test(botao.innerText.trim())) {
        tocar("avancar");
      }
    };
    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, []);

  useEffect(() => {
    verificarLembrete(progresso);
    // Só na abertura do app.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [aba, modo, resultado]);

  const concluirNivel = (dados: ResultadoNivel) => {
    const comNivel = registrarNivel(progresso, dados);
    const { progresso: comPremios, novas } = verificarConquistas(comNivel);
    setProgresso(comPremios);
    setResultado({ dados, novas });
    setModo(null);
  };

  const comecar = () => {
    setResultado(null);
    setAba("inicio");
    setModo("jornada");
  };

  const contextoJogo = {
    vistas: progresso.perguntasVistas,
    masteries: progresso.masteries,
  };

  const reiniciar = () => {
    limpar();
    setProgresso(estadoInicial());
    setResultado(null);
    setAba("inicio");
    setModo(null);
  };

  if (modo === "jornada") {
    return (
      <div className="app">
        <Jornada
          numero={proximoNivel(progresso)}
          contexto={contextoJogo}
          onSair={() => setModo(null)}
          onConcluir={concluirNivel}
        />
      </div>
    );
  }

  if (resultado) {
    return (
      <div className="app">
        <Resultado
          resultado={resultado.dados}
          progresso={progresso}
          novas={resultado.novas}
          onProximo={() => {
            setResultado(null);
            setModo("jornada");
          }}
          onInicio={() => {
            setResultado(null);
            setAba("inicio");
          }}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {aba === "inicio" && (
        <Inicio progresso={progresso} onJogar={comecar} onIr={setAba} />
      )}
      {aba === "trilhas" && <Trilhas progresso={progresso} />}
      {aba === "conquistas" && <Conquistas progresso={progresso} />}
      {aba === "estatisticas" && <Estatisticas progresso={progresso} />}
      {aba === "ajustes" && (
        <Ajustes
          progresso={progresso}
          onAtualizar={setProgresso}
          onReset={reiniciar}
        />
      )}
      <BarraInferior atual={aba} onIr={setAba} />
    </div>
  );
}

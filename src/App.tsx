import { useEffect, useState } from "react";
import { Inicio } from "./componentes/Inicio";
import { EscolhaModo, type ModoJogo } from "./componentes/EscolhaModo";
import { Milhao } from "./componentes/Milhao";
import { Trilhas } from "./componentes/Trilhas";
import { Conquistas } from "./componentes/Conquistas";
import { Estatisticas } from "./componentes/Estatisticas";
import { Ajustes } from "./componentes/Ajustes";
import { BarraInferior, type Aba } from "./componentes/BarraInferior";
import { Jogo } from "./componentes/Jogo";
import { Resultado } from "./componentes/Resultado";
import {
  carregar,
  salvar,
  limpar,
  estadoInicial,
  registrarNivel,
  registrarMilhao,
  proximoNivel,
  type Progresso,
  type ResultadoNivel,
} from "./jogo/progresso";
import { verificarConquistas, type Conquista } from "./jogo/conquistas";
import { verificarLembrete } from "./jogo/lembrete";

export default function App() {
  const [progresso, setProgresso] = useState<Progresso>(() => carregar());
  const [aba, setAba] = useState<Aba>("inicio");
  const [modo, setModo] = useState<"escolha" | ModoJogo | null>(null);
  const [resultado, setResultado] = useState<{
    dados: ResultadoNivel;
    novas: Conquista[];
  } | null>(null);

  useEffect(() => {
    salvar(progresso);
  }, [progresso]);

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

  const concluirMilhao = (dados: Parameters<typeof registrarMilhao>[1]) => {
    setProgresso((atual) => registrarMilhao(atual, dados));
    setModo(null);
    setAba("inicio");
  };

  const comecar = () => {
    setResultado(null);
    setAba("inicio");
    setModo("escolha");
  };

  const reiniciar = () => {
    limpar();
    setProgresso(estadoInicial());
    setResultado(null);
    setAba("inicio");
    setModo(null);
  };

  if (modo === "escolha") {
    return (
      <div className="app">
        <EscolhaModo
          progresso={progresso}
          onEscolher={setModo}
          onVoltar={() => setModo(null)}
        />
      </div>
    );
  }

  if (modo === "classico") {
    return (
      <div className="app">
        <Jogo
          numero={proximoNivel(progresso)}
          onSair={() => setModo(null)}
          onConcluir={concluirNivel}
        />
      </div>
    );
  }

  if (modo === "milhao") {
    return (
      <div className="app">
        <Milhao onSair={() => setModo(null)} onConcluir={concluirMilhao} />
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
            setModo("classico");
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

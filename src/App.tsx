import { useEffect, useState } from "react";
import { Inicio } from "./componentes/Inicio";
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
  proximoNivel,
  type Progresso,
  type ResultadoNivel,
} from "./jogo/progresso";
import { verificarConquistas, type Conquista } from "./jogo/conquistas";
import { verificarLembrete } from "./jogo/lembrete";

export default function App() {
  const [progresso, setProgresso] = useState<Progresso>(() => carregar());
  const [aba, setAba] = useState<Aba>("inicio");
  const [jogando, setJogando] = useState(false);
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
  }, [aba, jogando, resultado]);

  const concluirNivel = (dados: ResultadoNivel) => {
    const comNivel = registrarNivel(progresso, dados);
    const { progresso: comPremios, novas } = verificarConquistas(comNivel);
    setProgresso(comPremios);
    setResultado({ dados, novas });
    setJogando(false);
  };

  const comecar = () => {
    setResultado(null);
    setAba("inicio");
    setJogando(true);
  };

  const reiniciar = () => {
    limpar();
    setProgresso(estadoInicial());
    setResultado(null);
    setAba("inicio");
    setJogando(false);
  };

  if (jogando) {
    return (
      <div className="app">
        <Jogo
          numero={proximoNivel(progresso)}
          onSair={() => setJogando(false)}
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
            setJogando(true);
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

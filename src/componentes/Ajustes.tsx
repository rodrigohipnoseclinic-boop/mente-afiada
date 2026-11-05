import { useRef, useState } from "react";
import { Topo } from "./Topo";
import {
  exportar,
  importar,
  type Progresso,
} from "../jogo/progresso";
import {
  pedirPermissao,
  permissaoAtual,
  testarLembrete,
} from "../jogo/lembrete";
import { CONQUISTAS } from "../jogo/conquistas";
import { TERMOS_JOGO, PERGUNTAS_JOGO } from "../dados/banco";

interface Props {
  progresso: Progresso;
  onAtualizar: (p: Progresso) => void;
  onReset: () => void;
}

export function Ajustes({ progresso, onAtualizar, onReset }: Props) {
  const arquivoRef = useRef<HTMLInputElement>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);

  const alternarLembrete = async () => {
    if (progresso.lembrete) {
      onAtualizar({ ...progresso, lembrete: false });
      setMensagem("Lembrete desligado.");
      return;
    }
    const ok = await pedirPermissao();
    if (!ok) {
      setMensagem(
        "O navegador não liberou as notificações. No iPhone, instale o app na tela de início primeiro."
      );
      return;
    }
    onAtualizar({ ...progresso, lembrete: true });
    setMensagem("Lembrete ligado. Ele aparece quando você abre o app depois do horário.");
  };

  const baixarBackup = () => {
    const blob = new Blob([exportar(progresso)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const data = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `mente-afiada-backup-${data}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMensagem("Backup baixado.");
  };

  const lerArquivo = async (arquivo: File) => {
    try {
      const texto = await arquivo.text();
      const novo = importar(texto);
      onAtualizar(novo);
      setMensagem("Progresso restaurado do backup.");
    } catch {
      setMensagem("Arquivo inválido. Use um backup exportado pelo próprio app.");
    }
  };

  const apagar = () => {
    if (
      window.confirm(
        "Apagar todo o progresso? XP, ofensiva, prêmios e histórico serão perdidos."
      )
    ) {
      onReset();
      setMensagem("Progresso apagado. Começando do zero.");
    }
  };

  const permissao = permissaoAtual();

  return (
    <div className="tela">
      <Topo progresso={progresso} />
      <main className="conteudo">
        <h1 className="titulo-tela">Ajustes</h1>

        {mensagem && <div className="aviso">{mensagem}</div>}

        <section className="cartao">
          <h3>Lembrete diário</h3>
          <p className="fraco">
            Um toque por dia para não perder a ofensiva. O aviso é local: não
            passa por servidor e não custa nada.
          </p>

          <label className="linha-controle">
            <span>Ativar lembrete</span>
            <button
              type="button"
              className={`interruptor ${progresso.lembrete ? "ligado" : ""}`}
              onClick={alternarLembrete}
              aria-pressed={progresso.lembrete}
            >
              <span className="bolinha" />
            </button>
          </label>

          <label className="linha-controle">
            <span>Horário</span>
            <input
              type="time"
              value={progresso.hora}
              onChange={(e) =>
                onAtualizar({ ...progresso, hora: e.target.value || "19:00" })
              }
              disabled={!progresso.lembrete}
            />
          </label>

          <div className="linha-controle">
            <span className="fraco pequeno">
              Permissão do navegador: {permissao}
            </span>
            {progresso.lembrete && (
              <button type="button" className="botao texto" onClick={testarLembrete}>
                Testar
              </button>
            )}
          </div>
        </section>

        <section className="cartao">
          <h3>Backup do progresso</h3>
          <p className="fraco">
            O jogo guarda tudo no próprio aparelho. Exporte de vez em quando
            para não perder o histórico ao trocar de celular.
          </p>
          <div className="dupla">
            <button type="button" className="botao secundario" onClick={baixarBackup}>
              Exportar
            </button>
            <button
              type="button"
              className="botao secundario"
              onClick={() => arquivoRef.current?.click()}
            >
              Importar
            </button>
          </div>
          <input
            ref={arquivoRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const arquivo = e.target.files?.[0];
              if (arquivo) void lerArquivo(arquivo);
              e.target.value = "";
            }}
          />
        </section>

        <section className="cartao">
          <h3>Sobre o conteúdo</h3>
          <div className="linha-dado">
            <span>Termos</span>
            <strong>{TERMOS_JOGO.length}</strong>
          </div>
          <div className="linha-dado">
            <span>Perguntas curadas</span>
            <strong>{PERGUNTAS_JOGO.length}</strong>
          </div>
          <div className="linha-dado">
            <span>Prêmios</span>
            <strong>{CONQUISTAS.length}</strong>
          </div>
          <p className="fraco pequeno">
            Toda pergunta traz instituição, obra e ano. Conteúdo com confiança
            baixa não entra no jogo. As revisões sobre hipnose divergem entre si
            e o app mostra isso em vez de esconder.
          </p>
        </section>

        <section className="cartao">
          <h3>Apagar progresso</h3>
          <button type="button" className="botao perigo bloco" onClick={apagar}>
            Apagar tudo
          </button>
        </section>

        <p className="nota">
          Mente Afiada · versão 0.1 · feito para uso pessoal. Funciona offline
          depois da primeira carga.
        </p>
      </main>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import type { Celula, Grade } from "../jogo/gerador-grade";

interface Props {
  grade: Grade;
  encontradas: string[];
  onEncontrar: (chave: string) => void;
}

const chaveCelula = (c: Celula) => `${c.linha}:${c.coluna}`;

function caminhoEntre(a: Celula, b: Celula): Celula[] | null {
  const dl = Math.sign(b.linha - a.linha);
  const dc = Math.sign(b.coluna - a.coluna);
  const distL = Math.abs(b.linha - a.linha);
  const distC = Math.abs(b.coluna - a.coluna);
  if (!(distL === 0 || distC === 0 || distL === distC)) return null;

  const passos = Math.max(distL, distC);
  const saida: Celula[] = [];
  for (let i = 0; i <= passos; i++) {
    saida.push({ linha: a.linha + i * dl, coluna: a.coluna + i * dc });
  }
  return saida;
}

function mesmoCaminho(a: Celula[], b: Celula[]): boolean {
  return (
    a.length === b.length &&
    a.every((c, i) => c.linha === b[i].linha && c.coluna === b[i].coluna)
  );
}

export function CacaPalavras({ grade, encontradas, onEncontrar }: Props) {
  const [inicio, setInicio] = useState<Celula | null>(null);
  const [caminho, setCaminho] = useState<Celula[]>([]);
  const [erro, setErro] = useState(false);
  const caminhoRef = useRef<Celula[]>([]);

  const encontradasSet = useMemo(() => new Set(encontradas), [encontradas]);

  const celulasEncontradas = useMemo(() => {
    const set = new Set<string>();
    for (const p of grade.palavras) {
      if (!encontradasSet.has(p.chave)) continue;
      for (const c of p.caminho) set.add(chaveCelula(c));
    }
    return set;
  }, [grade, encontradasSet]);

  const celulaSelecionada = useMemo(
    () => new Set(caminho.map(chaveCelula)),
    [caminho]
  );

  const celulaDoPonto = (x: number, y: number): Celula | null => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    const alvo = el?.closest<HTMLElement>("[data-linha]");
    if (!alvo) return null;
    const linha = Number(alvo.dataset.linha);
    const coluna = Number(alvo.dataset.coluna);
    if (Number.isNaN(linha) || Number.isNaN(coluna)) return null;
    return { linha, coluna };
  };

  const validar = (trajeto: Celula[]) => {
    if (trajeto.length < 2) return;
    const alvo = grade.palavras.find(
      (p) =>
        mesmoCaminho(p.caminho, trajeto) ||
        mesmoCaminho(p.caminho, [...trajeto].reverse())
    );

    if (alvo && !encontradasSet.has(alvo.chave)) {
      onEncontrar(alvo.chave);
      return;
    }
    if (!alvo) {
      setErro(true);
      window.setTimeout(() => setErro(false), 320);
    }
  };

  // Arraste: acompanha o dedo/mouse e fecha a seleção ao soltar.
  useEffect(() => {
    if (!inicio) return;

    const mover = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.buttons === 0) return;
      const c = celulaDoPonto(e.clientX, e.clientY);
      if (!c) return;
      const trajeto = caminhoEntre(inicio, c);
      if (!trajeto) return;
      caminhoRef.current = trajeto;
      setCaminho(trajeto);
    };

    const soltar = (e: PointerEvent) => {
      const c = celulaDoPonto(e.clientX, e.clientY);
      if (c) {
        const trajeto = caminhoEntre(inicio, c);
        if (trajeto) {
          caminhoRef.current = trajeto;
          setCaminho(trajeto);
        }
      }
      const trajeto = caminhoRef.current;
      if (trajeto.length > 1) {
        validar(trajeto);
        setInicio(null);
        setCaminho([]);
        caminhoRef.current = [];
      }
      // Toque simples (sem arrastar) mantém a âncora para o segundo toque.
    };

    window.addEventListener("pointermove", mover, { passive: false });
    window.addEventListener("pointerup", soltar);
    window.addEventListener("pointercancel", soltar);
    return () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", soltar);
      window.removeEventListener("pointercancel", soltar);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inicio, encontradasSet]);

  const aoPressionar = (c: Celula) => (e: React.PointerEvent) => {
    e.preventDefault();
    if (encontradasSet.size === grade.palavras.length) return;

    if (inicio) {
      const trajeto = caminhoEntre(inicio, c);
      if (trajeto && trajeto.length > 1) {
        caminhoRef.current = trajeto;
        setCaminho(trajeto);
        validar(trajeto);
        setInicio(null);
        setCaminho([]);
        caminhoRef.current = [];
        return;
      }
    }

    setInicio(c);
    setCaminho([c]);
    caminhoRef.current = [c];
  };

  const tamanho = grade.tamanho;

  return (
    <div
      className={`grade-caca ${erro ? "tremer" : ""}`}
      style={{
        gridTemplateColumns: `repeat(${tamanho}, 1fr)`,
        ["--tamanho" as string]: tamanho,
      }}
      aria-label="Caça-palavras"
    >
      {grade.celulas.map((linha, l) =>
        linha.map((letra, c) => {
          const id = `${l}:${c}`;
          const achada = celulasEncontradas.has(id);
          const selecionada = celulaSelecionada.has(id);
          return (
            <button
              key={id}
              type="button"
              className={`celula ${achada ? "achada" : ""} ${
                selecionada ? "selecionada" : ""
              }`}
              data-linha={l}
              data-coluna={c}
              onPointerDown={aoPressionar({ linha: l, coluna: c })}
              onContextMenu={(e) => e.preventDefault()}
              tabIndex={-1}
              aria-label={`Letra ${letra}, linha ${l + 1}, coluna ${c + 1}`}
            >
              {letra}
            </button>
          );
        })
      )}
    </div>
  );
}

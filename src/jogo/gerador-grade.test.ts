import { describe, expect, it } from "vitest";
import { gerarGrade } from "./gerador-grade";
import { montarNivel } from "./nivel";
import { TERMOS_JOGO } from "../dados/banco";

describe("gerarGrade", () => {
  it("é determinística para a mesma semente", () => {
    const a = gerarGrade(["Neurônio", "Sinapse", "Axônio"], 8, 3);
    const b = gerarGrade(["Neurônio", "Sinapse", "Axônio"], 8, 3);
    expect(a.celulas).toEqual(b.celulas);
  });

  it("escreve cada palavra colocada nas células do caminho", () => {
    const grade = gerarGrade(["Neurônio", "Sinapse", "Axônio"], 8, 11);
    for (const p of grade.palavras) {
      const lida = p.caminho.map((c) => grade.celulas[c.linha][c.coluna]).join("");
      expect(lida).toBe(p.chave);
    }
  });
});

describe("montarNivel", () => {
  it("monta 3 perguntas e uma grade com palavras para vários níveis", () => {
    for (let n = 1; n <= 30; n++) {
      const nivel = montarNivel(n);
      expect(nivel.perguntas).toHaveLength(3);
      expect(nivel.grade.palavras.length).toBeGreaterThan(0);
    }
  });

  it("as perguntas de definição usam distratores da mesma trilha do termo", () => {
    for (let n = 1; n <= 30; n++) {
      const nivel = montarNivel(n);
      for (const p of nivel.perguntas.filter((q) => q.gerada)) {
        expect(new Set(p.opcoes).size).toBe(p.opcoes.length);
        const trilhaDe = (definicao: string) =>
          TERMOS_JOGO.find((t) => t.definicao === definicao)?.trilha;
        const certa = trilhaDe(p.opcoes[p.correta]);
        for (const opcao of p.opcoes) expect(trilhaDe(opcao)).toBe(certa);
      }
    }
  });
});

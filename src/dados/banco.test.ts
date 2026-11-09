import { describe, expect, it } from "vitest";
import { PERGUNTAS_JOGO, TERMOS_JOGO } from "./banco";

describe("banco do jogo", () => {
  it("não inclui itens de confiança baixa", () => {
    expect(TERMOS_JOGO.every((t) => t.confianca !== "baixa")).toBe(true);
    expect(PERGUNTAS_JOGO.every((p) => p.confianca !== "baixa")).toBe(true);
  });

  it("não repete termo na mesma trilha", () => {
    const chaves = TERMOS_JOGO.map((t) => `${t.trilha}|${t.chave}`);
    expect(new Set(chaves).size).toBe(chaves.length);
  });

  it("toda pergunta tem a resposta certa dentro das opções", () => {
    for (const p of PERGUNTAS_JOGO) {
      expect(p.correta).toBeGreaterThanOrEqual(0);
      expect(p.correta).toBeLessThan(p.opcoes.length);
    }
  });

  it("a teoria do apego (Bowlby) está em Comportamento, não em Neurociências", () => {
    const apego = TERMOS_JOGO.filter((t) => t.id.startsWith("tri-apego"));
    expect(apego.length).toBeGreaterThan(0);
    expect(apego.every((t) => t.trilha === "comportamento")).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import { PERGUNTAS_JOGO } from "../dados/banco";
import { selecionarPerguntas } from "./selecao";

describe("selecionarPerguntas", () => {
  it("devolve a quantidade pedida, sem repetir pergunta", () => {
    const escolhidas = selecionarPerguntas(PERGUNTAS_JOGO, 5, { semente: 7 });
    expect(escolhidas).toHaveLength(5);
    expect(new Set(escolhidas.map((p) => p.id)).size).toBe(5);
  });

  it("é determinística para a mesma semente", () => {
    const a = selecionarPerguntas(PERGUNTAS_JOGO, 6, { semente: 42 });
    const b = selecionarPerguntas(PERGUNTAS_JOGO, 6, { semente: 42 });
    expect(a.map((p) => p.id)).toEqual(b.map((p) => p.id));
  });

  it("prefere perguntas nunca vistas", () => {
    const vistas = PERGUNTAS_JOGO.slice(0, PERGUNTAS_JOGO.length - 4).map((p) => p.id);
    const escolhidas = selecionarPerguntas(PERGUNTAS_JOGO, 4, { vistas });
    for (const p of escolhidas) expect(vistas).not.toContain(p.id);
  });

  it("respeita a lista de IDs a evitar", () => {
    const evitar = PERGUNTAS_JOGO.slice(0, 10).map((p) => p.id);
    const escolhidas = selecionarPerguntas(PERGUNTAS_JOGO, 8, { evitar });
    for (const p of escolhidas) expect(evitar).not.toContain(p.id);
  });
});

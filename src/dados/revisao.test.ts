import { describe, expect, it } from "vitest";
import { respostaAceita } from "./revisao";

describe("respostaAceita", () => {
  it("aceita resposta exata, ignorando maiúscula, acento e espaços", () => {
    expect(respostaAceita("  catexia ", "Catexia")).toBe(true);
    expect(respostaAceita("AXONIO", "Axônio")).toBe(true);
  });

  it("aceita um erro de digitação em palavras de 6 letras ou mais", () => {
    expect(respostaAceita("Catexa", "Catexia")).toBe(true);
    expect(respostaAceita("Catexiaa", "Catexia")).toBe(true);
    expect(respostaAceita("Catexxa", "Catexia")).toBe(true);
  });

  it("não aceita erro em palavras curtas nem dois erros", () => {
    expect(respostaAceita("Ed", "Ego")).toBe(false);
    expect(respostaAceita("Id", "Ego")).toBe(false);
    expect(respostaAceita("Cate", "Catexia")).toBe(false);
  });

  it("recusa resposta vazia", () => {
    expect(respostaAceita("   ", "Catexia")).toBe(false);
  });
});

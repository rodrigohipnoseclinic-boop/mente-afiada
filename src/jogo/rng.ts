export function mulberry32(semente: number): () => number {
  let a = semente >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Semente estável a partir de texto e/ou números (FNV-1a). */
export function hashSemente(...partes: Array<string | number>): number {
  let h = 2166136261;
  for (const parte of partes) {
    const s = String(parte);
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
  }
  return h >>> 0;
}

export function embaralhar<T>(lista: T[], rand: () => number): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function escolher<T>(lista: T[], rand: () => number): T {
  return lista[Math.floor(rand() * lista.length)];
}

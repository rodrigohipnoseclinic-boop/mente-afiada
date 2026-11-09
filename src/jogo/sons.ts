/**
 * Efeitos sonoros sintetizados com Web Audio: nenhum arquivo para baixar,
 * funciona offline e pesa quase nada. O som só começa depois do primeiro
 * toque (regra dos navegadores) e respeita o interruptor em Ajustes.
 */

export type Som =
  | "toque" // letra tocada no caça-palavras
  | "palavra" // palavra encontrada
  | "acerto" // resposta certa
  | "erro" // resposta errada
  | "avancar" // botão de continuar
  | "conclusao" // rodada concluída
  | "premio"; // conquista desbloqueada

const CHAVE = "mente-afiada:som:v1";
const VOLUME = 0.22;

let ligado = lerPreferencia();
let contexto: AudioContext | null = null;
let mestre: GainNode | null = null;

function lerPreferencia(): boolean {
  try {
    return localStorage.getItem(CHAVE) !== "off";
  } catch {
    return true;
  }
}

export const somLigado = () => ligado;

export function definirSom(valor: boolean): void {
  ligado = valor;
  try {
    localStorage.setItem(CHAVE, valor ? "on" : "off");
  } catch {
    // sem armazenamento: vale só nesta sessão
  }
  if (valor) tocar("acerto");
}

/** Frequência de uma nota a partir do Lá 440 Hz. `semitons` 0 = Lá4. */
const nota = (semitons: number) => 440 * 2 ** (semitons / 12);

/**
 * No iPhone o som sai mudo se o aparelho estiver no silencioso e se o áudio
 * não for "liberado" por um toque. Dois truques: declarar a sessão de áudio
 * como "playback" (iOS 16.4+) e tocar um trecho mudo em loop num <audio>.
 */
let liberado = false;
function liberar(): void {
  if (liberado) return;
  liberado = true;
  try {
    const sessao = (navigator as unknown as { audioSession?: { type: string } })
      .audioSession;
    if (sessao) sessao.type = "playback";
  } catch {
    // navegador sem Audio Session API
  }
  const p = preparar();
  if (p) {
    try {
      const silencio = p.ctx.createBuffer(1, 1, 22050);
      const fonte = p.ctx.createBufferSource();
      fonte.buffer = silencio;
      fonte.connect(p.ctx.destination);
      fonte.start(0);
    } catch {
      // segue sem o buffer mudo
    }
  }
  try {
    const amostras = 800;
    const bytes = new Uint8Array(44 + amostras * 2);
    const v = new DataView(bytes.buffer);
    const texto = (pos: number, s: string) =>
      [...s].forEach((ch, i) => v.setUint8(pos + i, ch.charCodeAt(0)));
    texto(0, "RIFF");
    v.setUint32(4, 36 + amostras * 2, true);
    texto(8, "WAVE");
    texto(12, "fmt ");
    v.setUint32(16, 16, true);
    v.setUint16(20, 1, true);
    v.setUint16(22, 1, true);
    v.setUint32(24, 8000, true);
    v.setUint32(28, 16000, true);
    v.setUint16(32, 2, true);
    v.setUint16(34, 16, true);
    texto(36, "data");
    v.setUint32(40, amostras * 2, true);
    const audio = new Audio(
      URL.createObjectURL(new Blob([bytes], { type: "audio/wav" }))
    );
    audio.loop = true;
    audio.volume = 0.01;
    audio.setAttribute("playsinline", "");
    void audio.play().catch(() => undefined);
  } catch {
    // sem <audio>: o Web Audio ainda funciona fora do modo silencioso
  }
}

if (typeof window !== "undefined") {
  const aoPrimeiroToque = () => {
    liberar();
    for (const tipo of ["pointerdown", "touchend", "click", "keydown"]) {
      window.removeEventListener(tipo, aoPrimeiroToque, true);
    }
  };
  for (const tipo of ["pointerdown", "touchend", "click", "keydown"]) {
    window.addEventListener(tipo, aoPrimeiroToque, true);
  }
}

function preparar(): { ctx: AudioContext; saida: GainNode } | null {
  if (typeof window === "undefined") return null;
  try {
    if (!contexto) {
      const Classe =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Classe) return null;
      contexto = new Classe();
      mestre = contexto.createGain();
      mestre.gain.value = VOLUME;
      mestre.connect(contexto.destination);
    }
    if (contexto.state === "suspended") void contexto.resume();
    return mestre ? { ctx: contexto, saida: mestre } : null;
  } catch {
    return null;
  }
}

interface Voz {
  freq: number;
  inicio: number;
  duracao: number;
  tipo?: OscillatorType;
  volume?: number;
  /** Se informado, a frequência desliza até este valor. */
  ate?: number;
}

function voz(ctx: AudioContext, saida: GainNode, v: Voz): void {
  const t0 = ctx.currentTime + v.inicio;
  const osc = ctx.createOscillator();
  const ganho = ctx.createGain();
  osc.type = v.tipo ?? "sine";
  osc.frequency.setValueAtTime(v.freq, t0);
  if (v.ate) osc.frequency.exponentialRampToValueAtTime(v.ate, t0 + v.duracao);

  const pico = v.volume ?? 0.6;
  ganho.gain.setValueAtTime(0.0001, t0);
  ganho.gain.exponentialRampToValueAtTime(pico, t0 + 0.012);
  ganho.gain.exponentialRampToValueAtTime(0.0001, t0 + v.duracao);

  osc.connect(ganho).connect(saida);
  osc.start(t0);
  osc.stop(t0 + v.duracao + 0.03);
}

function vibrar(padrao: number | number[]): void {
  try {
    navigator.vibrate?.(padrao);
  } catch {
    // aparelho sem vibração
  }
}

/**
 * Toca um efeito. `intensidade` sobe o tom: use o tamanho do trecho marcado
 * ou o número de palavras já achadas, para o som "subir" junto com o jogador.
 */
export function tocar(som: Som, intensidade = 0): void {
  if (!ligado) return;
  const p = preparar();
  if (!p) return;
  const { ctx, saida } = p;
  const sobe = Math.min(Math.max(intensidade, 0), 12);

  switch (som) {
    case "toque":
      voz(ctx, saida, {
        freq: nota(3 + sobe * 2),
        inicio: 0,
        duracao: 0.07,
        tipo: "triangle",
        volume: 0.28,
      });
      break;

    case "palavra":
      // Três notas rápidas subindo (dó-mi-sol), cada palavra um pouco mais agudo.
      [0, 4, 7].forEach((deg, i) =>
        voz(ctx, saida, {
          freq: nota(3 + deg + sobe),
          inicio: i * 0.075,
          duracao: 0.22,
          tipo: "triangle",
          volume: 0.5,
        })
      );
      voz(ctx, saida, {
        freq: nota(15 + sobe),
        inicio: 0.2,
        duracao: 0.3,
        volume: 0.22,
      });
      vibrar(18);
      break;

    case "acerto":
      [0, 4, 7, 12].forEach((deg, i) =>
        voz(ctx, saida, {
          freq: nota(3 + deg),
          inicio: i * 0.07,
          duracao: 0.26,
          tipo: "triangle",
          volume: 0.5,
        })
      );
      vibrar(15);
      break;

    case "erro":
      // Duas notas descendo, graves e macias: avisa sem punir.
      voz(ctx, saida, {
        freq: nota(-9),
        ate: nota(-14),
        inicio: 0,
        duracao: 0.2,
        tipo: "sine",
        volume: 0.6,
      });
      voz(ctx, saida, {
        freq: nota(-14),
        ate: nota(-19),
        inicio: 0.13,
        duracao: 0.28,
        tipo: "sine",
        volume: 0.5,
      });
      vibrar([40, 40, 40]);
      break;

    case "avancar":
      voz(ctx, saida, {
        freq: nota(10),
        ate: nota(14),
        inicio: 0,
        duracao: 0.09,
        tipo: "triangle",
        volume: 0.3,
      });
      break;

    case "conclusao":
      // Fanfarra curta: dó-mi-sol-dó agudo, com acorde final.
      [0, 4, 7, 12].forEach((deg, i) =>
        voz(ctx, saida, {
          freq: nota(3 + deg),
          inicio: i * 0.11,
          duracao: 0.3,
          tipo: "triangle",
          volume: 0.55,
        })
      );
      [12, 16, 19, 24].forEach((deg) =>
        voz(ctx, saida, {
          freq: nota(3 + deg),
          inicio: 0.5,
          duracao: 0.7,
          volume: 0.26,
        })
      );
      vibrar([30, 40, 60]);
      break;

    case "premio":
      // Brilho: notas altas em sequência rápida.
      [12, 16, 19, 24, 28, 31].forEach((deg, i) =>
        voz(ctx, saida, {
          freq: nota(3 + deg),
          inicio: i * 0.06,
          duracao: 0.35,
          volume: 0.32,
        })
      );
      vibrar([20, 30, 20, 30, 60]);
      break;
  }
}

import type { Progresso } from "./progresso";
import { hojeLocal } from "./progresso";

const CHAVE_ENVIADO = "mente-afiada:lembrete-enviado";

export const suportaLembrete = () =>
  typeof window !== "undefined" && "Notification" in window;

export async function pedirPermissao(): Promise<boolean> {
  if (!suportaLembrete()) return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const resultado = await Notification.requestPermission();
  return resultado === "granted";
}

export function permissaoAtual(): NotificationPermission | "indisponivel" {
  if (!suportaLembrete()) return "indisponivel";
  return Notification.permission;
}

function minutosDoDia(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

/** Chamado ao abrir o app: avisa uma vez por dia, se o nível ainda não foi feito. */
export function verificarLembrete(p: Progresso): void {
  if (!p.lembrete || !suportaLembrete()) return;
  if (Notification.permission !== "granted") return;

  const hoje = hojeLocal();
  if (p.ultimoDia === hoje) return;
  if (localStorage.getItem(CHAVE_ENVIADO) === hoje) return;

  const agora = new Date();
  if (agora.getHours() * 60 + agora.getMinutes() < minutosDoDia(p.hora)) return;

  try {
    new Notification("Mente Afiada", {
      body: "Seu nível de hoje está esperando. Cinco minutos mantêm a ofensiva.",
      icon: "./icone-192.png",
      tag: "lembrete-diario",
    });
    localStorage.setItem(CHAVE_ENVIADO, hoje);
  } catch {
    // Alguns navegadores exigem o service worker; sem drama, o app segue.
  }
}

export function testarLembrete(): void {
  if (!suportaLembrete() || Notification.permission !== "granted") return;
  try {
    new Notification("Mente Afiada", {
      body: "É assim que o lembrete vai aparecer.",
      icon: "./icone-192.png",
      tag: "teste",
    });
  } catch {
    // ignora
  }
}

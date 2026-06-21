import { KEYS, read, write, type InstallPromptState } from "./storage";

export function registerServiceWorker(): void {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  if (!import.meta.env.PROD) return;
  const host = window.location.hostname;
  const isPreview =
    host.startsWith("id-preview--") ||
    host.startsWith("preview--") ||
    host.endsWith(".lovableproject.com") ||
    host.endsWith(".lovableproject-dev.com") ||
    host.endsWith(".beta.lovable.dev");
  if (isPreview) return;
  if (window.top !== window.self) return;
  navigator.serviceWorker.register("/service-worker.js").catch(() => {});
}

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia?.("(display-mode: standalone)").matches === true ||
    nav.standalone === true
  );
}

export function getInstallState(): InstallPromptState {
  return read<InstallPromptState>(KEYS.installPromptState, {});
}

export function setInstallState(patch: Partial<InstallPromptState>): InstallPromptState {
  const next = { ...getInstallState(), ...patch };
  write(KEYS.installPromptState, next);
  return next;
}
import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import { KEYS, read } from "@/lib/storage";
import { getInstallState, isStandalone, setInstallState } from "@/lib/pwa";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [eligible, setEligible] = useState(false);

  // 1. Unconditionally capture the browser's install prompt event
  useEffect(() => {
    if (isStandalone()) return;

    const onBIP = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
    };

    const onInstalled = () => {
      setInstallState({ installed: true });
      setEvt(null);
      setEligible(false);
    };

    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // 2. Determine if the user is eligible to see the custom UI
  useEffect(() => {
    const state = getInstallState();
    
    // Hide if already installed or previously dismissed
    if (state.installed || state.dismissedAt) {
      setEligible(false);
      return;
    }

    // Only show if they have completed at least one challenge
    const completed = read<unknown[]>(KEYS.completedChallenges, []);
    setEligible(completed.length >= 1);
    
  }, []); // Note: If challenge completion happens without a page reload, 
          // you may need to update this check via a context or custom event.

  // 3. Only render if they are eligible AND the browser has fired the event
  if (!eligible || !evt) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-elegant)]">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Install Speak Sphere</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Add to your home screen for one-tap daily practice.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={async () => {
                await evt.prompt();
                const choice = await evt.userChoice;
                if (choice.outcome === "accepted") {
                  setInstallState({ installed: true });
                } else {
                  setInstallState({ dismissedAt: new Date().toISOString() });
                }
                setEvt(null);
                setEligible(false);
              }}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
            >
              Install
            </button>
            <button
              onClick={() => {
                setInstallState({ dismissedAt: new Date().toISOString() });
                setEligible(false);
              }}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          aria-label="Dismiss"
          onClick={() => {
            setInstallState({ dismissedAt: new Date().toISOString() });
            setEligible(false);
          }}
          className="rounded-md p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
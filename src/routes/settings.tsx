import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Download, Upload, Trash2, FileText, Info, Shield } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { exportAll, importAll, resetAll } from "@/lib/storage";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Speak Sphere" },
      { name: "description", content: "Export, import, or reset your local Speak Sphere progress." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);

  function doExport() {
    const json = exportAll();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "speaksphere-progress.json";
    a.click();
    URL.revokeObjectURL(url);
    setMsg("Exported.");
  }

  function doImport(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const ok = importAll(String(reader.result || ""));
      setMsg(ok ? "Imported. Reload to see updates." : "Couldn't read that file.");
    };
    reader.readAsText(file);
  }

  function doReset() {
    if (!window.confirm("Reset all progress? This cannot be undone.")) return;
    resetAll();
    setMsg("All progress cleared.");
  }

  return (
    <AppShell title="Settings">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">Speak Sphere </p>

      <section className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        <Row
          icon={Download}
          title="Export progress"
          subtitle="Download a JSON backup of your streak, scores, reflections, and settings."
          action={<button onClick={doExport} className="text-sm font-semibold text-primary">Export</button>}
        />
        <Row
          icon={Upload}
          title="Import progress"
          subtitle="Restore from a previously exported JSON file."
          action={
            <>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) doImport(f);
                }}
              />
              <button onClick={() => fileRef.current?.click()} className="text-sm font-semibold text-primary">Import</button>
            </>
          }
        />
        <Row
          icon={Trash2}
          title="Reset progress"
          subtitle="Clear everything stored on this device."
          action={<button onClick={doReset} className="text-sm font-semibold text-destructive">Reset</button>}
        />
      </section>

      {msg ? (
        <div className="mt-4 rounded-xl border border-border bg-secondary px-4 py-3 text-sm">{msg}</div>
      ) : null}

      <section className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
        <RowLink icon={Shield} title="Privacy policy" to="/privacy" />
        <RowLink icon={FileText} title="Terms of use" to="/terms" />
        <RowLink icon={Info} title="About Speak Sphere" to="/" />
      </section>
    </AppShell>
  );
}

function Row({ icon: Icon, title, subtitle, action }: { icon: typeof Download; title: string; subtitle: string; action: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 p-4">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      {action}
    </div>
  );
}

function RowLink({ icon: Icon, title, to }: { icon: typeof Download; title: string; to: "/privacy" | "/terms" | "/" }) {
  return (
    <Link to={to} className="flex items-center gap-4 p-4">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1 text-sm font-semibold">{title}</div>
      <span className="text-muted-foreground">→</span>
    </Link>
  );
}
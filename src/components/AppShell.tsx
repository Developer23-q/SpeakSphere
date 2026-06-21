import { Link, useLocation } from "@tanstack/react-router";
import { Home, BarChart3, Radio, Settings, Mic } from "lucide-react";
import type { ReactNode } from "react";
import { InstallPrompt } from "./InstallPrompt";

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/live", label: "Live", icon: Radio },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link to="/home" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
            <span className="grid h-8 w-8 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-hero)" }}>
              <Mic className="h-4 w-4" />
            </span>
            Speak Sphere
          </Link>
          {title ? (
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
          ) : null}
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-6">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur">
        <ul className="mx-auto flex max-w-3xl items-stretch justify-between px-2">
          {tabs.map((t) => {
            const active = pathname === t.to || pathname.startsWith(t.to + "/");
            const Icon = t.icon;
            return (
              <li key={t.to} className="flex-1">
                <Link
                  to={t.to}
                  className={`flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Icon className={`h-5 w-5 ${active ? "stroke-[2.4]" : ""}`} />
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <InstallPrompt />
    </div>
  );
}
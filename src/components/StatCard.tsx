import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xl font-bold text-foreground">{value}</div>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
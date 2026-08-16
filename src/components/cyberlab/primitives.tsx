import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Panel({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <section
      className={cn("panel animate-rise relative overflow-hidden", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </section>
  );
}

export function PanelHeader({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
      <h2 className="font-display text-[15px] font-bold tracking-wide text-foreground">{title}</h2>
      {action ? (
        <button
          type="button"
          onClick={onAction}
          className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-cyan transition-all hover:bg-primary/25 hover:shadow-[var(--shadow-neon)]"
        >
          {action}
        </button>
      ) : null}
    </header>
  );
}

export function Dot({ tone = "emerald", pulse = true }: { tone?: string; pulse?: boolean }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse ? (
        <span
          className="animate-ping-slow absolute inset-0 rounded-full"
          style={{ background: `var(--${tone})` }}
        />
      ) : null}
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ background: `var(--${tone})` }}
      />
    </span>
  );
}

export function Tag({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
      style={{
        color: `var(--${tone})`,
        background: `color-mix(in oklab, var(--${tone}) 16%, transparent)`,
        border: `1px solid color-mix(in oklab, var(--${tone}) 40%, transparent)`,
      }}
    >
      {label}
    </span>
  );
}

export function Spark({ tone, up = true }: { tone: string; up?: boolean }) {
  const pts = up
    ? "0,26 14,22 26,25 40,16 54,19 68,10 82,12 96,2"
    : "0,6 14,12 26,9 40,17 54,13 68,21 82,18 96,27";
  return (
    <svg viewBox="0 0 96 30" className="h-8 w-24 overflow-visible">
      <polyline
        points={pts}
        fill="none"
        stroke={`var(--${tone})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 6px var(--${tone}))` }}
        strokeDasharray="240"
        strokeDashoffset="240"
      >
        <animate attributeName="stroke-dashoffset" from="240" to="0" dur="1.4s" fill="freeze" />
      </polyline>
    </svg>
  );
}

export function Meter({ value, tone = "primary" }: { value: number; tone?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/70">
      <div
        className="h-full rounded-full transition-[width] duration-1000 ease-out"
        style={{
          width: `${value}%`,
          background: `linear-gradient(90deg, color-mix(in oklab, var(--${tone}) 60%, var(--violet)), var(--${tone}))`,
          boxShadow: `0 0 12px color-mix(in oklab, var(--${tone}) 70%, transparent)`,
        }}
      />
    </div>
  );
}

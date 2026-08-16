import { useEffect, useState } from "react";
import { AlertTriangle, Cog, MonitorCheck, ShieldCheck, TrendingDown, TrendingUp } from "lucide-react";
import { Spark } from "./primitives";

const STATS = [
  {
    label: "Menaces détectées",
    value: 12,
    delta: "-20%",
    up: false,
    since: "vs. dernière heure",
    tone: "primary",
    Icon: ShieldCheck,
  },
  {
    label: "Actifs surveillés",
    value: 247,
    delta: "+3%",
    up: true,
    since: "vs. hier",
    tone: "emerald",
    Icon: MonitorCheck,
  },
  {
    label: "Vulnérabilités critiques",
    value: 4,
    delta: "-50%",
    up: false,
    since: "vs. dernière heure",
    tone: "danger",
    Icon: AlertTriangle,
  },
  {
    label: "Jobs en cours",
    value: 8,
    delta: "+12%",
    up: true,
    since: "vs. dernière heure",
    tone: "violet",
    Icon: Cog,
  },
];

function useCount(target: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const loop = (t: number) => {
      const p = Math.min((t - start) / 1100, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return n;
}

function StatCard({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  const n = useCount(stat.value);
  const Trend = stat.up ? TrendingUp : TrendingDown;
  return (
    <article
      className="panel animate-rise group relative p-4 transition-transform duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px 120px at 50% 0%, color-mix(in oklab, var(--${stat.tone}) 22%, transparent), transparent)`,
        }}
      />
      <div className="relative flex items-start gap-3">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border"
          style={{
            borderColor: `color-mix(in oklab, var(--${stat.tone}) 45%, transparent)`,
            background: `color-mix(in oklab, var(--${stat.tone}) 14%, transparent)`,
            boxShadow: `0 0 20px -6px var(--${stat.tone})`,
          }}
        >
          <stat.Icon className="h-6 w-6" style={{ color: `var(--${stat.tone})` }} />
        </span>
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-sm font-bold"
            style={{ color: `var(--${stat.tone})` }}
          >
            {stat.label}
          </p>
          <div className="mt-1 flex items-end justify-between gap-2">
            <div>
              <p className="font-display text-4xl font-black leading-none tabular-nums neon-text">
                {n}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">{stat.since}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Spark tone={stat.tone} up={stat.up} />
              <span
                className="inline-flex items-center gap-1 text-xs font-bold"
                style={{ color: `var(--${stat.up ? "emerald" : "danger"})` }}
              >
                <Trend className="h-3.5 w-3.5" />
                {stat.delta}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((s, i) => (
        <StatCard key={s.label} stat={s} index={i} />
      ))}
    </div>
  );
}

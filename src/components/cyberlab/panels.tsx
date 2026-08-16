import {
  Activity,
  BrainCircuit,
  Box,
  Cog,
  ChevronRight,
  CircleCheck,
  Database,
  Layers,
  Plus,
  Rocket,
  Server,
  ShieldAlert,
  Sparkle,
  Terminal,
} from "lucide-react";
import { Dot, Meter, Panel, PanelHeader, Tag } from "./primitives";

const PATHS = [
  { n: 1, label: "Internet → DMZ → Serveur Web", score: "9.8", tag: "Critique", tone: "danger" },
  { n: 2, label: "Poste Utilisateur → Réseau Interne", score: "8.4", tag: "Élevé", tone: "amber" },
  { n: 3, label: "Cloud → API → Base de données", score: "7.2", tag: "Moyen", tone: "cyan" },
  { n: 4, label: "Réseau Wi-Fi → Segment Admin", score: "5.6", tag: "Faible", tone: "emerald" },
];

export function AttackPaths() {
  return (
    <Panel delay={200}>
      <PanelHeader title="Attack Paths – Top Risques" action="Voir tout" />
      <ul className="divide-y divide-border/50">
        {PATHS.map((p) => (
          <li
            key={p.n}
            className="group flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/40"
          >
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black"
              style={{
                color: `var(--${p.tone})`,
                background: `color-mix(in oklab, var(--${p.tone}) 18%, transparent)`,
                border: `1px solid color-mix(in oklab, var(--${p.tone}) 45%, transparent)`,
              }}
            >
              {p.n}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{p.label}</span>
              <span className="block text-xs text-muted-foreground">Score: {p.score}</span>
            </span>
            <Tag label={p.tag} tone={p.tone} />
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const ACTIVITY = [
  {
    title: "Nouvel asset détecté",
    sub: "Kali-3 (192.168.1.45)",
    time: "14:28",
    tone: "emerald",
    Icon: Plus,
  },
  {
    title: "Vulnérabilité critique identifiée",
    sub: "CVE-2024-12345 - Apache",
    time: "14:24",
    tone: "danger",
    Icon: ShieldAlert,
  },
  {
    title: "Job d'analyse terminé",
    sub: "Scan réseau - 247 actifs",
    time: "14:20",
    tone: "cyan",
    Icon: CircleCheck,
  },
  {
    title: "Plugin exécuté",
    sub: "myplugin - Reconnaissance OSINT",
    time: "14:18",
    tone: "violet",
    Icon: Box,
  },
];

export function SocLite() {
  return (
    <Panel delay={240}>
      <PanelHeader title="SOC Lite – Activité récente" action="Voir tout" />
      <ul className="relative px-4 py-3">
        <span className="absolute bottom-8 left-[34px] top-8 w-px bg-border" />
        {ACTIVITY.map((a) => (
          <li key={a.title} className="relative flex items-start gap-3 py-2.5">
            <span
              className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg border"
              style={{
                borderColor: `color-mix(in oklab, var(--${a.tone}) 45%, transparent)`,
                background: `color-mix(in oklab, var(--${a.tone}) 16%, transparent)`,
              }}
            >
              <a.Icon className="h-4.5 w-4.5" style={{ color: `var(--${a.tone})` }} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{a.title}</span>
              <span className="block truncate text-xs" style={{ color: `var(--${a.tone})` }}>
                {a.sub}
              </span>
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">{a.time}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const AGENTS = [
  { name: "cyberlab-kali-1", state: "Actif", tone: "emerald", load: 32 },
  { name: "cyberlab-kali-2", state: "Actif", tone: "emerald", load: 58 },
  { name: "cyberlab-kali-3", state: "Maintenance", tone: "amber", load: 12 },
  { name: "cyberlab-kali-4", state: "Actif", tone: "emerald", load: 45 },
];

export function Agents() {
  return (
    <Panel delay={280}>
      <PanelHeader title="Multi-Kali – État des Agents" action="Voir tout" />
      <ul className="px-4 py-2">
        {AGENTS.map((a) => (
          <li key={a.name} className="flex items-center gap-3 py-2.5">
            <Dot tone={a.tone} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold">{a.name}</span>
              <span className="block text-xs text-muted-foreground">Agent Kali</span>
            </span>
            <span className="text-xs font-semibold" style={{ color: `var(--${a.tone})` }}>
              {a.state}
            </span>
            <span className="w-40 shrink-0">
              <span className="mb-1 block text-[11px] text-muted-foreground">
                Charge: {a.load}%
              </span>
              <Meter value={a.load} tone={a.tone} />
            </span>
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-2 border-t border-border/60 px-4 py-3 text-xs text-muted-foreground">
        <Sparkle className="h-4 w-4 text-cyan" />
        Sélection intelligente des agents selon la charge et les capacités
      </p>
    </Panel>
  );
}

const TOOLS = [
  { name: "nmap", pct: 92 },
  { name: "masscan", pct: 78 },
  { name: "shodan", pct: 65 },
  { name: "echotest", pct: 54 },
  { name: "myplugin (OSINT)", pct: 42 },
];

export function Tools() {
  return (
    <Panel delay={320}>
      <PanelHeader title="Outils & Plugins" action="Voir tout" />
      <div className="grid grid-cols-3 gap-2 px-4 py-3">
        {[
          { label: "Outils curatés", value: "31", Icon: Terminal, tone: "cyan" },
          { label: "Plugins actifs", value: "12", Icon: Layers, tone: "violet" },
          { label: "Nouveaux", value: "3", Icon: Rocket, tone: "primary" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-panel-2/60 p-2.5 text-center transition-transform hover:-translate-y-0.5"
          >
            <s.Icon className="mx-auto h-4 w-4" style={{ color: `var(--${s.tone})` }} />
            <p className="mt-1 text-[11px] text-muted-foreground">{s.label}</p>
            <p className="font-display text-lg font-black">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="px-4 pb-4">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">Top outils utilisés</p>
        <ul className="flex flex-col gap-2.5">
          {TOOLS.map((t) => (
            <li key={t.name} className="flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-xs text-muted-foreground">{t.name}</span>
              <Meter value={t.pct} tone="primary" />
              <span className="w-9 shrink-0 text-right text-xs font-bold tabular-nums">
                {t.pct}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

const SERVICES = [
  { name: "API", Icon: Server },
  { name: "Frontend", Icon: Activity },
  { name: "Worker", Icon: Cog },
  { name: "PostgreSQL", Icon: Database },
  { name: "Redis", Icon: Layers },
  { name: "Agents Kali", Icon: Terminal },
];

export function SystemState() {
  const pct = 99.9;
  const r = 46;
  const c = Math.PI * r * 1.5;
  return (
    <Panel delay={360}>
      <PanelHeader title="État du système" action="Voir détails" />
      <div className="flex items-center gap-4 px-4 py-3">
        <ul className="flex-1 space-y-1.5">
          {SERVICES.map((s) => (
            <li key={s.name} className="flex items-center gap-2 text-sm">
              <s.Icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="flex-1 text-muted-foreground">{s.name}</span>
              <Dot tone="emerald" pulse={false} />
              <span className="text-xs font-semibold text-emerald">Healthy</span>
            </li>
          ))}
        </ul>
        <div className="relative grid h-32 w-32 shrink-0 place-items-center">
          <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-[135deg]">
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="var(--secondary)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${c} 999`}
            />
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="var(--emerald)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${(c * pct) / 100} 999`}
              style={{ filter: "drop-shadow(0 0 8px var(--emerald))" }}
            >
              <animate
                attributeName="stroke-dasharray"
                from={`0 999`}
                to={`${(c * pct) / 100} 999`}
                dur="1.4s"
                fill="freeze"
              />
            </circle>
          </svg>
          <div className="text-center">
            <p className="font-display text-xl font-black text-emerald">{pct}%</p>
            <p className="text-[11px] text-muted-foreground">Uptime</p>
            <p className="text-[11px] text-muted-foreground">7j 12h 34m</p>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function AiInsights() {
  return (
    <Panel delay={400}>
      <PanelHeader title="Analyses IA – Insights Cyber" action="Voir tout" />
      <div className="flex items-center gap-4 p-4">
        <div className="animate-float grid h-24 w-24 shrink-0 place-items-center rounded-2xl border border-violet/40 bg-violet/10">
          <BrainCircuit className="h-12 w-12 text-violet" />
        </div>
        <div>
          <p className="text-sm leading-snug text-muted-foreground">
            L'IA CyberLab analyse actuellement <strong className="text-foreground">247</strong>{" "}
            événements de sécurité et identifie{" "}
            <strong className="text-foreground">3 menaces</strong> potentielles à fort potentiel.
          </p>
          <button
            type="button"
            className="mt-3 rounded-lg px-3.5 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
            style={{ background: "var(--grad-violet)", boxShadow: "var(--shadow-neon)" }}
          >
            Voir l'analyse détaillée
          </button>
        </div>
      </div>
    </Panel>
  );
}

const NEWS = [
  {
    n: 1,
    title: "Nouvelles techniques d'attaque sur les API OAuth",
    time: "Il y a 12 min",
    tag: "Tendance",
    tone: "cyan",
  },
  {
    n: 2,
    title: "CVE-2024-12345 - Vulnérabilité critique Apache",
    time: "Il y a 1h",
    tag: "Critique",
    tone: "danger",
  },
  {
    n: 3,
    title: "Guide : Sécurisation des environnements Kali",
    time: "Il y a 3h",
    tag: "Conseil",
    tone: "emerald",
  },
  {
    n: 4,
    title: "Bilan mensuel des menaces cyber",
    time: "Il y a 1j",
    tag: "Rapport",
    tone: "violet",
  },
];

export function NewsFeed() {
  return (
    <Panel delay={440}>
      <PanelHeader title="Flux d'actualités sécurité" action="Voir tout" />
      <ul className="divide-y divide-border/50">
        {NEWS.map((n) => (
          <li
            key={n.n}
            className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/40"
          >
            <span className="w-4 text-xs font-black text-muted-foreground">{n.n}</span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{n.title}</span>
            <span className="hidden text-xs text-muted-foreground sm:block">{n.time}</span>
            <Tag label={n.tag} tone={n.tone} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

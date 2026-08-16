import { useState } from "react";
import {
  LayoutDashboard,
  Globe2,
  GitBranch,
  MonitorSmartphone,
  ShieldAlert,
  Bot,
  Puzzle,
  Radar,
  FileBarChart2,
  Plug,
  Settings,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Carte des menaces", icon: Globe2 },
  { label: "Attack Paths", icon: GitBranch },
  { label: "Assets", icon: MonitorSmartphone },
  { label: "Vulnérabilités", icon: ShieldAlert },
  { label: "Jobs & Agents", icon: Bot },
  { label: "Plugins", icon: Puzzle },
  { label: "SOC Lite", icon: Radar },
  { label: "Rapports", icon: FileBarChart2 },
  { label: "Intégrations", icon: Plug },
  { label: "Paramètres", icon: Settings },
];

export function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="hidden w-[248px] shrink-0 flex-col gap-4 p-3 lg:flex">
      <nav className="panel animate-rise p-2.5">
        <ul className="flex flex-col gap-1">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isActive = active === item.label;
            return (
              <li key={item.label} className="animate-rise" style={{ animationDelay: `${i * 35}ms` }}>
                <button
                  type="button"
                  onClick={() => setActive(item.label)}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:translate-x-1 hover:text-foreground",
                  )}
                  style={
                    isActive
                      ? {
                          background: "var(--grad-cyan)",
                          boxShadow: "var(--shadow-neon)",
                        }
                      : undefined
                  }
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="panel animate-rise relative flex flex-col items-center gap-3 p-5 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-40 grid-lines" />
        <div className="animate-float relative grid h-20 w-20 place-items-center rounded-2xl border border-violet/40 bg-violet/10">
          <BrainCircuit className="h-10 w-10 text-violet" />
          <span className="animate-ping-slow absolute inset-0 rounded-2xl border border-violet/50" />
        </div>
        <h3 className="font-display text-base font-bold text-cyan neon-text">IA CyberLab</h3>
        <p className="text-sm leading-tight text-muted-foreground">
          Votre assistant intelligent en sécurité
        </p>
        <button
          type="button"
          className="relative w-full overflow-hidden rounded-lg px-4 py-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
          style={{ background: "var(--grad-violet)", boxShadow: "var(--shadow-neon)" }}
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Lancer l'analyse IA
          </span>
        </button>
      </div>
    </aside>
  );
}

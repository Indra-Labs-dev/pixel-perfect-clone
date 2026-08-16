import { useEffect, useState } from "react";
import { Bell, ChevronDown, Clock, Search, ShieldHalf, UserRound } from "lucide-react";
import { Dot } from "./primitives";

export function TopBar() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("fr-FR", { hour12: false, timeZone: "Europe/Paris" }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center gap-4 border-b border-border/70 bg-background/70 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ background: "var(--grad-cyan)", boxShadow: "var(--shadow-neon)" }}
        >
          <ShieldHalf className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <p className="font-display text-2xl font-black leading-none tracking-wide text-cyan neon-text">
            CyberLab
          </p>
          <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground">
            Think · Detect · Respond
          </p>
        </div>
      </div>

      <div className="relative order-last w-full md:order-none md:w-auto md:flex-1 md:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Rechercher une menace, un actif, une alerte..."
          className="h-11 w-full rounded-xl border border-border bg-panel-2/80 pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/70 focus:shadow-[var(--shadow-neon)]"
        />
      </div>

      <div className="ml-auto flex items-center gap-5">
        <div className="hidden items-center gap-2 text-sm font-semibold text-muted-foreground sm:flex">
          <Dot tone="emerald" />
          Système opérationnel
        </div>
        <div className="hidden items-center gap-2 text-sm font-semibold text-foreground sm:flex">
          <Clock className="h-4 w-4 text-cyan" />
          <span className="tabular-nums">{time}</span>
          <span className="text-muted-foreground">(UTC+1)</span>
        </div>
        <button type="button" className="relative rounded-lg p-2 transition-colors hover:bg-secondary">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span
            className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold text-primary-foreground"
            style={{ background: "var(--danger)" }}
          >
            7
          </span>
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-border bg-panel-2/70 px-2 py-1.5 transition-colors hover:border-primary/50"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan/40 bg-cyan/10">
            <UserRound className="h-5 w-5 text-cyan" />
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-bold">Admin CyberLab</span>
            <span className="block text-xs text-muted-foreground">Expert SOC</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}

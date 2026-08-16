import { useMemo, useState } from "react";
import { Panel } from "./primitives";
import { cn } from "@/lib/utils";

const CONTINENTS: [number, number][][] = [
  [
    [140, 80],
    [250, 70],
    [300, 110],
    [280, 150],
    [230, 190],
    [200, 232],
    [170, 200],
    [150, 150],
    [120, 110],
  ],
  [
    [250, 250],
    [300, 240],
    [322, 292],
    [300, 360],
    [270, 412],
    [250, 370],
    [240, 300],
  ],
  [
    [468, 88],
    [546, 84],
    [562, 122],
    [520, 152],
    [480, 142],
    [458, 116],
  ],
  [
    [470, 180],
    [560, 174],
    [592, 232],
    [560, 320],
    [520, 372],
    [490, 320],
    [468, 250],
  ],
  [
    [570, 70],
    [762, 58],
    [832, 112],
    [800, 170],
    [720, 202],
    [640, 190],
    [590, 150],
    [564, 110],
  ],
  [
    [658, 190],
    [702, 190],
    [690, 244],
    [664, 232],
  ],
  [
    [750, 228],
    [822, 240],
    [832, 266],
    [758, 262],
  ],
  [
    [790, 300],
    [872, 298],
    [882, 350],
    [820, 376],
    [788, 340],
  ],
];

function inside(x: number, y: number, poly: [number, number][]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i] as [number, number];
    const [xj, yj] = poly[j] as [number, number];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }

  return hit;
}

const ARCS = [
  { d: "M 290 175 Q 430 60 560 130", tone: "danger" },
  { d: "M 560 130 Q 660 40 800 130", tone: "amber" },
  { d: "M 290 175 Q 420 300 560 230", tone: "cyan" },
  { d: "M 560 230 Q 700 320 840 250", tone: "violet" },
  { d: "M 300 340 Q 430 420 560 330", tone: "danger" },
];

const NODES = [
  { x: 290, y: 175, tone: "danger" },
  { x: 560, y: 130, tone: "danger" },
  { x: 800, y: 130, tone: "amber" },
  { x: 400, y: 210, tone: "amber" },
  { x: 640, y: 200, tone: "cyan" },
  { x: 840, y: 250, tone: "violet" },
  { x: 300, y: 340, tone: "cyan" },
  { x: 520, y: 300, tone: "violet" },
];

const TABS = ["Monde", "Réseau", "Assets", "Kali"];

const LEGEND = [
  { label: "Attaques actives", tone: "danger" },
  { label: "Activité suspecte", tone: "amber" },
  { label: "Scan réseau", tone: "cyan" },
  { label: "Tendance IA", tone: "violet" },
];

export function ThreatMap() {
  const [tab, setTab] = useState("Monde");

  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let y = 50; y < 430; y += 7) {
      for (let x = 100; x < 900; x += 7) {
        if (CONTINENTS.some((p) => inside(x, y, p))) out.push({ x, y });
      }
    }
    return out;
  }, []);

  return (
    <Panel className="p-4" delay={120}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-[15px] font-bold tracking-wide">
          Carte des menaces en temps réel
        </h2>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-panel-2/70 p-1">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-bold transition-all",
                tab === t
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              style={
                tab === t
                  ? { background: "var(--grad-cyan)", boxShadow: "var(--shadow-neon)" }
                  : undefined
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border/70 bg-panel-2/60">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div
          className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-16"
          style={{
            background:
              "linear-gradient(180deg, transparent, color-mix(in oklab, var(--cyan) 14%, transparent), transparent)",
          }}
        />
        <svg viewBox="0 0 1000 470" className="relative w-full">
          <g fill="color-mix(in oklab, var(--cyan) 55%, transparent)">
            {dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="1.5" />
            ))}
          </g>

          {ARCS.map((a, i) => (
            <g key={i}>
              <path
                d={a.d}
                fill="none"
                stroke={`var(--${a.tone})`}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.75"
                strokeDasharray="12 10"
                className="animate-dash"
                style={{ filter: `drop-shadow(0 0 6px var(--${a.tone}))` }}
              />
              <circle r="4" fill={`var(--${a.tone})`}>
                <animateMotion dur={`${3 + i * 0.6}s`} repeatCount="indefinite" path={a.d} />
              </circle>
            </g>
          ))}

          {NODES.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="4" fill={`var(--${n.tone})`}>
                <animate
                  attributeName="opacity"
                  values="1;0.35;1"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={n.x} cy={n.y} r="4" fill="none" stroke={`var(--${n.tone})`}>
                <animate attributeName="r" values="4;18" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </svg>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 pb-4 pt-1">
          {LEGEND.map((l) => (
            <span key={l.label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  background: `var(--${l.tone})`,
                  boxShadow: `0 0 10px var(--${l.tone})`,
                }}
              />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </Panel>
  );
}
